---
layout: post
title: "Distributed Rate Limiting"
h1: "Distributed Rate Limiting and API Security Patterns at the Edge"
description: "An architectural deep-dive into implementing token bucket algorithms, sliding window counters in Redis, and DDoS mitigation strategies at the API gateway layer."
date: 2026-11-07
topic: software
tags: ["cloud-architecture", "api-security", "devops", "business-automation"]
image: "/assets/images/topics/software-card.png"
---
## Quick answer

Rate limiting belongs at more than one layer. Use the edge to reject obvious abuse cheaply, a distributed store to share counters across instances, and origin-side checks for business-critical operations. Pick the algorithm from the behavior you want: token bucket for controlled bursts, leaky bucket for smoothing, sliding window for strict accounting. Always return clear `429` responses with retry guidance, and decide in advance whether each endpoint fails open or closed when the counter store is unavailable.

## 1. The Need for Edge-Level Rate Limiting

In modern distributed systems, allowing unthrottled API requests to reach backend application servers exposes infrastructure to resource exhaustion, database lock contention, and malicious credential stuffing attacks. Moving rate-limiting decisions to edge gateways—such as Cloudflare Workers, NGINX, or Envoy proxies—shields upstream services while enforcing tiered limits across multi-tenant clients.

The edge is the right first checkpoint because it is close to the user and cheap relative to an application instance. It can discard a request before a database connection is opened or a webhook is queued. But it is not the only checkpoint: a client that finds an alternate route, or a bug that bypasses the edge, still reaches your origin. Defense in depth means the origin applies its own limits with a smaller, safety-oriented budget.

## 2. Rate-limiting algorithms compared

Choosing the right throttling pattern depends on performance requirements and accuracy tolerances:

| Algorithm | Memory Overhead | Precision | Best Used For |
| :--- | :--- | :--- | :--- |
| **Fixed Window Counter** | Extremely Low | Low (Prone to boundary traffic spikes) | Basic public API endpoints and soft throttling. |
| **Leaky Bucket** | Low | High (Smooths out bursts to constant rate) | Asynchronous queueing (e.g., outbound SMS/email dispatch). |
| **Token Bucket** | Medium | High (Allows controlled short bursts) | General REST/GraphQL API rate limiting per account tier. |
| **Sliding Window Log** | High | Absolute | Strict financial or high-security authentication endpoints. |

Two refinements are worth knowing. A **sliding window counter** — the approach implemented below — stores timestamps in a sorted set and is more accurate than a fixed window without the full memory cost of a perfect log. A **token bucket** refills over time and allows a bounded burst, which usually feels better to API consumers than a hard wall at the window boundary.

GraphQL deserves special treatment: count fields or estimated complexity, not just HTTP requests. A single query can be cheap or extremely expensive, so request counting alone can miss resource abuse.

## 3. Where to enforce each limit

| Layer | Typical check | Failure behavior | Why |
| :--- | :--- | :--- | :--- |
| CDN / network | IP reputation, request size, TLS fingerprint | Challenge or block | Stops volumetric abuse before application logic |
| Edge worker | API key presence, tenant tier, short-window limits | Reject or degrade | Cheap, close to the caller |
| API gateway | Per-route budgets, auth-aware quotas | `429` with headers | Consistent policy across services |
| Origin service | Critical-operation limits, concurrency caps | Reject or queue | Protects database and paid downstream calls |

The limits should be coordinated. A practical approach is a generous edge limit, a tighter gateway limit, and very tight origin limits on expensive operations such as payment capture or message dispatch.

## 4. Choosing the counter key

A rate limit is only as good as its identity. Common keys:

| Key | Use for | Watch-out |
| :--- | :--- | :--- |
| IP address | Anonymous or public endpoints | Shared NAT and proxies group many users together |
| API key | Partner integrations | Keys can be leaked; pair with rotation and monitoring |
| Tenant ID | Multi-tenant quotas | Needs a trusted mapping from credential to tenant |
| Tenant + endpoint | Per-resource budgets | More keys, more memory; group endpoints deliberately |
| User ID | Login and OTP endpoints | Attackers rotate users; combine with IP checks |
| Credential + IP | Authentication abuse | Better than either alone, with privacy considerations |

Never construct the key from an unverified request header. A client-supplied `X-Tenant-ID` is a claim, not an identity. Resolve it from a validated token or gateway mapping, as described in [multi-tenant serverless architecture]({{ '/2026/11/04/building-resilient-multi-tenant-serverless-architectures/' | relative_url }}).

## 5. Implementing sliding window counters with Redis

To enforce globally synchronized rate limits across multiple edge worker instances without race conditions, atomic Redis operations (using Lua scripts or pipeline execution) are recommended.

### Atomic Lua script execution

When a request arrives at the edge worker, the client's API key or IP address is checked against a rolling timestamp bucket in Redis:

```lua
-- Key: rate_limit:tenant_id:endpoint
-- ARGV[1]: Current Unix Timestamp (Epoch seconds)
-- ARGV[2]: Window Size (e.g., 60 seconds)
-- ARGV[3]: Maximum allowed requests per window

local key = KEYS[1]
local now = tonumber(ARGV[1])
local window = tonumber(ARGV[2])
local limit = tonumber(ARGV[3])
local clearBefore = now - window

-- Remove timestamps older than the current window
redis.call('ZREMRANGEBYSCORE', key, 0, clearBefore)

-- Count remaining requests in window
local currentRequests = redis.call('ZCARD', key)

if currentRequests < limit then
    -- Add current request timestamp
    redis.call('ZADD', key, now, now)
    redis.call('EXPIRE', key, window)
    return 1 -- Allowed
else
    return 0 -- Rate limit exceeded
end

```

The script is atomic, so concurrent workers cannot both read the same count and decide to admit. A few production notes:

- Use a unique member per request (timestamp plus a random suffix) if requests can share the same second; otherwise `ZADD` overwrites them.
- Keep the Redis cluster regionally close to the edge location, or accept that each region will hold its own counters. Cross-region consistency has a latency cost.
- Set memory limits and eviction policy deliberately — losing counters during a burst changes your enforcement behavior.
- For very high-volume endpoints, prefer an approximate algorithm with fewer stored entries; the sorted-set log grows with request count.

## 6. Standard HTTP gateway response headers

When throttling a request (returning HTTP Status `429 Too Many Requests`), the API gateway should supply clear headers so client SDKs know when it is safe to retry:

```http
HTTP/1.1 429 Too Many Requests
Content-Type: application/json
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1730980000
Retry-After: 42

{
  "error": "rate_limit_exceeded",
  "message": "API request limit reached. Retry after 42 seconds."
}

```

Send the same `X-RateLimit-*` headers on successful responses too, so well-behaved clients can slow down before they are rejected. Use UTC epoch seconds consistently, and make the error body machine-readable. Document that clients should honor `Retry-After` and add jitter to avoid synchronized retries.

## 7. Fail-open vs. fail-closed decision table

| Endpoint class | If the counter store is down | Rationale |
| :--- | :--- | :--- |
| Public content feed | Fail open | Availability matters more than perfect accounting |
| Authenticated read API | Fail open with a local fallback limit | Avoid a total outage; keep a coarse safety cap |
| Login, OTP, password reset | Fail closed or apply strict local caps | Credential attacks are high impact |
| Payment and billing writes | Fail closed | Double execution is worse than a rejected request |
| Webhook ingestion | Degrade to origin-side limits | Preserve delivery while protecting the database |

A local fallback — for example, a small in-process counter with a much lower budget — is often better than a binary choice. It keeps basic protection alive during a Redis outage without pretending you have global accuracy.

## 8. Bot mitigation and WAF integration

Pair rate limiting with edge Web Application Firewalls (WAF) to inspect TLS fingerprints, challenge suspicious automated traffic, and apply geographic or reputation-based rules before evaluating application logic. Useful layers include:

- Request-size and header-count limits to reject malformed traffic cheaply.
- Challenge pages or proof-of-work for suspicious clients, applied narrowly to avoid harming real users.
- Separate budgets for authenticated and anonymous traffic.
- Alerts on a sudden shift in key distribution — one key suddenly dominating often signals a leak.
- Correlation with [zero-trust service mesh patterns]({{ '/2026/11/09/zero-trust-architecture-mtls-and-service-mesh-security/' | relative_url }}) for service-to-service calls.
- Consistent limits for LLM and AI endpoints, where a single request can be costly; see [securing LLM APIs]({{ '/2026/11/17/securing-llm-apis-prompt-injection-defense-and-rate-limiting/' | relative_url }}).

## 9. Implementation checklist

* **Fail-open vs. fail-closed:** Determine this per endpoint, and document the fallback behavior.
* **Tiered API keys:** Enforce different token capacity limits based on account roles (`free`, `pro`, `enterprise`).
* **Bot mitigation & WAF integration:** Pair edge limits with challenges and reputation checks.
* Choose a stable key derived from verified identity, not a client header.
* Return `429` with `Retry-After` and rate-limit headers on both success and rejection.
* Add per-tenant fairness so one customer cannot consume the whole counter store.
* Test boundary conditions: window rollover, clock skew, and Redis restart.
* Alert on counter-store latency, rejected-request ratio, and key-count growth.
* Document quotas publicly so integrators can design around them.

## 10. Failure modes and mitigations

| Failure mode | Symptom | Mitigation |
| :--- | :--- | :--- |
| Boundary spike | Traffic doubles at window rollover | Sliding window or token bucket |
| Duplicate members | Sorted-set count undercounts same-second requests | Unique member IDs |
| Cache eviction | Limits silently reset | Explicit eviction policy and monitoring |
| Clock skew | Inconsistent windows across regions | Single time source, documented epoch unit |
| NAT collisions | Many users share one IP budget | Prefer API key or user identity where possible |
| Overly strict limits | Legitimate customers get `429` | Tiered quotas plus headroom and clear diagnostics |
| Retry synchronization | Clients retry at the same moment | `Retry-After` plus client-side jitter |

## 11. FAQ

**Is rate limiting the same as DDoS protection?** No. Rate limiting enforces policy per identity; volumetric attacks are handled by network-layer filtering and caching. You need both.

**Should limits be per user or per tenant?** Often both. Tenant quotas control commercial commitments; user or key limits contain a compromised credential.

**What happens to requests that exceed the limit?** Usually immediate `429` with guidance. For asynchronous workloads, queueing with a leaky bucket can be friendlier, provided the queue is bounded.

**Do we need a distributed store if we have one edge region?** Maybe not yet. A single-instance counter is simpler; move to Redis when you run multiple instances or regions and need shared accounting.

## 12. Next steps

1. Inventory your endpoints and classify them by sensitivity and cost.
2. Choose an algorithm and key for each class; write the policy down.
3. Implement the atomic counter, headers, and fallback behavior together.
4. Add dashboards for rejections, store latency, and per-tenant usage.
5. Review the linked guides on edge tenancy, zero trust, and LLM API security for adjacent controls.

