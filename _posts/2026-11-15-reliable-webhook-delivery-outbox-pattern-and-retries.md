---
layout: post
title: "Building Reliable Webhook Delivery Systems"
h1: "Building Reliable Webhook Delivery Systems: The Transactional Outbox Pattern and Exponential Backoff"
description: "An engineering blueprint for guaranteeing reliable event notifications, handling downstream timeouts, and preventing message loss in distributed..."
date: 2026-11-15
topic: software
tags: ["distributed-systems", "cloud-architecture", "api-security", "devops"]
image: "/assets/images/topics/software-card.png"
---
## Quick answer

Write the webhook event and the business state change in one database transaction, then let a separate worker deliver it. That is the transactional outbox pattern, and it removes the dual-write gap where a crash between "save" and "send" loses a notification. Delivery should be at-least-once with exponential backoff, jitter, and a dead-letter state. Receivers must deduplicate using an event ID, and you should sign every payload with HMAC-SHA256.

## 1. The Distributed Webhook Failure Problem

In B2B SaaS platforms, CPaaS engines, and fintech systems, emitting webhooks to notify client endpoints of asynchronous events (e.g., payment completed, SMS delivered) is mission-critical. However, relying on a standard HTTP `POST` request inside your core application flow introduces severe failure modes:

* **Network Partitions:** If the client's endpoint is down or returning a `504 Gateway Timeout`, your main database transaction may block or fail.
* **Dual-Write Inconsistencies:** If you save a state change in your PostgreSQL database and immediately trigger an external HTTP call, a crash between the two actions results in lost notifications.

There is a third problem: timeouts are ambiguous. A timeout does not tell you whether the receiver processed the event. Retrying may duplicate it; not retrying may lose it. The only honest contract you can offer is at-least-once delivery, with deduplication handled by the receiver.

## 2. Core architecture: the transactional outbox pattern

To solve dual-write inconsistencies, systems use the **Transactional Outbox Pattern**. Instead of calling external APIs directly inside business logic, events are written to an `outbox` table within the **exact same database transaction** as the state change. A separate background worker polls the outbox table and dispatches payloads reliably.

The flow is:

1. Business logic begins a transaction.
2. It updates the domain tables (for example, `message.status = 'delivered'`).
3. It inserts an outbox row describing the event to publish.
4. It commits. Both changes succeed or both fail.
5. A worker claims due rows, sends HTTP requests, and records outcomes.
6. Failed attempts are rescheduled; exhausted attempts go to a dead-letter state.

Because the outbox row is ordinary data, it participates in backups, replication, and audit queries. That is a major operational advantage over an in-memory queue.

## 3. Database schema design for outbox queues

```sql
CREATE TABLE webhook_outbox (
    id BIGSERIAL PRIMARY KEY,
    tenant_id UUID NOT NULL,
    event_type VARCHAR(100) NOT NULL,
    target_url TEXT NOT NULL,
    payload JSONB NOT NULL,
    status VARCHAR(32) DEFAULT 'PENDING', -- PENDING, PROCESSING, COMPLETED, FAILED
    attempt_count INT DEFAULT 0,
    max_attempts INT DEFAULT 5,
    next_retry_at_epoch BIGINT NOT NULL,
    created_at_epoch BIGINT NOT NULL
);

-- Index for background worker polling performance
CREATE INDEX idx_outbox_polling ON webhook_outbox (status, next_retry_at_epoch) WHERE status = 'PENDING';

```

Consider adding `event_id UUID UNIQUE` for receiver deduplication, `last_response_code`, `last_error`, and a `signed_at_epoch` column. If you support multiple endpoints per tenant, replace `target_url` with an endpoint ID and resolve the URL at send time — that way a customer can rotate a URL without rewriting historical events.

Index design depends on volume. The partial index above works well while the pending set is small. At larger scale, keep completed rows in a separate archive table so the hot index stays selective. The partitioning and BRIN ideas in [high-throughput log analytics]({{ '/2026/11/08/high-throughput-log-analytics-and-postgresql-indexing-strategies/' | relative_url }}) are useful here.

## 4. Background worker with exponential backoff

When a webhook delivery fails due to a network timeout or a `5xx` response, the worker must not hammer the target server continuously. It should calculate an **exponential backoff interval with jitter** to prevent thundering herd problems on recovering servers.

### Simplified processing snippet

```javascript
const axios = require('axios');
const { Pool } = require('pg');
const pool = new Pool();

async function processWebhookOutbox() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Fetch batch of pending webhooks ready for delivery
    const now = Math.floor(Date.now() / 1000);
    const result = await client.query(
      `SELECT id, target_url, payload, attempt_count, max_attempts 
       FROM webhook_outbox 
       WHERE status = 'PENDING' AND next_retry_at_epoch <= $1 
       LIMIT 50 FOR UPDATE SKIP LOCKED`,
      [now]
    );

    for (const row of result.rows) {
      try {
        // Dispatch webhook with cryptographic signature header
        await axios.post(row.target_url, row.payload, {
          timeout: 5000,
          headers: { 'X-TecqMate-Signature': generateSignature(row.payload) }
        });

        // Mark as completed
        await client.query(`UPDATE webhook_outbox SET status = 'COMPLETED' WHERE id = $1`, [row.id]);
      } catch (err) {
        const nextAttempt = row.attempt_count + 1;
        if (nextAttempt >= row.max_attempts) {
          // Move to dead-letter state after max retries
          await client.query(`UPDATE webhook_outbox SET status = 'FAILED', attempt_count = $1 WHERE id = $2`, [nextAttempt, row.id]);
        } else {
          // Calculate exponential backoff: 2^attempt * 10 seconds + random jitter
          const backoffSeconds = Math.pow(2, nextAttempt) * 10 + Math.floor(Math.random() * 5);
          const nextRetry = now + backoffSeconds;
          
          await client.query(
            `UPDATE webhook_outbox SET attempt_count = $1, next_retry_at_epoch = $2 WHERE id = $3`,
            [nextAttempt, nextRetry, row.id]
          );
        }
      }
    }

    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Outbox worker cycle error:', error.message);
  } finally {
    client.release();
  }
}

```

This snippet illustrates the core idea: `FOR UPDATE SKIP LOCKED` lets multiple workers safely claim different rows, and each failure reschedules the event. **It is simplified.** In production, do not hold a database transaction open while making network calls — a slow endpoint holds locks and delays every other worker. Use three short transactions instead:

1. **Claim:** update a batch of due rows to `PROCESSING`, set a `locked_until_epoch` lease, and commit. Use `SKIP LOCKED` so workers do not collide.
2. **Dispatch:** perform the HTTP call outside any transaction, with connect and total timeouts.
3. **Settle:** in a short transaction, mark `COMPLETED`, or increment the attempt count and set the next retry time. On `429`, honor `Retry-After`.

Add a reaper that returns `PROCESSING` rows to `PENDING` when a worker crashes and the lease expires. Without it, an event can be stuck forever.

### Which responses deserve a retry?

| Outcome | Action |
| :--- | :--- |
| `2xx` | Mark completed |
| `408`, `429`, `5xx`, timeout | Reschedule with backoff and jitter |
| `400`, `401`, `403`, `404`, `422` | Stop retrying; alert the tenant about configuration |
| Unexpected redirect | Decide explicitly; many receivers do not expect redirects |

## 5. Polling vs. CDC vs. a managed queue

| Approach | Strength | Cost | When to choose |
| :--- | :--- | :--- | :--- |
| Poll outbox table | Simple, no extra infrastructure | Polling latency and database load | Small to medium volume, straightforward operations |
| Change data capture | Near-real-time, low polling cost | More moving parts to operate | High volume, existing replication pipeline |
| Managed queue after commit | Mature delivery semantics | Dual-write risk returns unless fed from outbox | When a queue service is already standard |

A hybrid is common: the outbox remains the durable source of truth, and a relay publishes rows into a queue for workers to consume. For the broader dispatcher design — signatures, event envelopes, ordering, and concurrency — see [enterprise webhook architecture]({{ '/api-security/business-automation/messaging/architecture/2026/11/06/enterprise-webhook-architecture-and-reliable-delivery-pipelines/' | relative_url }}).

## 6. Production best practices

1. **Cryptographic Signatures:** Always sign webhook payloads using HMAC-SHA256 (e.g., `X-Signature: sha256=...`) so recipient clients can cryptographically verify that requests originated from your platform and haven't been tampered with. Sign the exact bytes you transmit and include a timestamp to limit replay.
2. **Idempotency on the receiving end:** Remind your B2B clients in your documentation that webhooks can occasionally be delivered more than once due to network retries, so their ingestion endpoints must be idempotent. Publish a stable event ID and recommend a unique constraint on it. See [idempotency keys and double-charge prevention]({{ '/2026/11/14/fintech-idempotency-keys-and-preventing-double-charges/' | relative_url }}).
3. **Dead-Letter Monitoring:** Expose internal monitoring dashboards or alerts for webhooks entering the `FAILED` state after maximum retry exhaustion.
4. **Bound concurrency:** Limit attempts per tenant so one broken endpoint cannot occupy every worker.
5. **Log every attempt:** Store status code, response snippet, and duration; this is what support will ask for.
6. **Provide a resend control:** A safe UI or API that creates a new outbox row with a fresh event ID is invaluable during incidents.
7. **Make replacement events explicit:** If a payload must be corrected, emit a new versioned event rather than mutating a historical one.

## 7. Implementation checklist

- [ ] Write outbox rows inside the same transaction as the domain change.
- [ ] Add a unique event ID for receiver-side deduplication.
- [ ] Use `FOR UPDATE SKIP LOCKED` and short claim/dispatch/settle transactions.
- [ ] Add a lease and reaper for crashed workers.
- [ ] Implement backoff with jitter and honor `Retry-After`.
- [ ] Classify response codes into retryable and permanent.
- [ ] Set connect and total timeouts on every outbound call.
- [ ] Sign raw payload bytes with HMAC-SHA256 and support secret rotation.
- [ ] Cap concurrency per tenant and globally.
- [ ] Archive completed rows to keep the hot index small.
- [ ] Alert on DLQ growth, oldest pending age, and worker lag.
- [ ] Document the at-least-once contract and receiver obligations.

## 8. Failure modes and mitigations

| Failure mode | Symptom | Mitigation |
| :--- | :--- | :--- |
| Dual-write gap | State saved, notification missing | Outbox row in the same transaction |
| Lost claim | Rows stuck in `PROCESSING` | Lease plus reaper |
| Duplicate delivery | Receiver creates duplicate records | Event ID and receiver idempotency |
| Retry thundering herd | Receiver hammered on recovery | Jittered backoff and per-tenant caps |
| Long-held locks | All workers slow when one endpoint hangs | Dispatch outside the transaction |
| Permanent failure ignored | DLQ grows unnoticed | Alerting and tenant-facing diagnostics |
| Payload drift | Receiver cannot parse older events | Versioned schema and explicit compatibility rules |

## 9. FAQ

**Does the outbox guarantee exactly-once delivery?** No. It guarantees the event is recorded with the state change. Delivery remains at-least-once, so receivers must deduplicate.

**Why not just use a queue in the request path?** Publishing to a queue and committing your database change are still two operations. If the queue publish succeeds and the commit fails, you emit an event for something that never happened. The outbox collapses the two into one commit.

**How often should the worker poll?** Often enough to meet your latency expectations, with a batch size that keeps each cycle short. Measure query time and adjust; there is no universal interval.

**Can we keep events forever in the outbox?** Usually not necessary. Archive completed rows and keep an audit trail according to your retention obligations.

## 10. Next steps

1. Identify one event type and move it to the outbox pattern end to end.
2. Add the claim lease and reaper before increasing worker count.
3. Publish a receiver contract covering signatures, event IDs, and retries.
4. Build the DLQ dashboard and resend workflow early.
5. Review the linked guides on webhook architecture, idempotency, and log storage for the surrounding system.