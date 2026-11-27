---
layout: post
title: "Blue/Green vs Canary Deployments: A Decision Matrix and Rollback Runbook"
description: "Blue/green and canary releases both reduce deployment risk, but in different ways. Compare them side by side, see which fits your team, how to handle database changes, and follow a step-by-step rollback runbook."
date: 2026-12-22
tags: ["deployment", "blue-green", "canary", "devops", "rollback", "ci-cd", "release-engineering", "programming"]
topic: programming
read_mins: 9
audience: "Developers, DevOps engineers and small teams who deploy web services and want safer releases and faster rollbacks"
---

Deploying straight onto production and hoping for the best works until the day it does not. Blue/green and canary releases are the two most common ways to reduce that risk. Both let you ship a new version without taking everything down, and both give you a way back if something goes wrong.

They solve the problem differently, and the right choice depends on your traffic, your tooling and how much risk a bad release can cause. This guide compares them, shows a decision matrix and gives you a rollback runbook you can adapt. For the wider picture of rolling updates and Kubernetes readiness probes, see our guide on [zero-downtime deployments]({{ '/2026/11/16/zero-downtime-deployments-blue-green-and-canary/' | relative_url }}).

## Quick answer

- Choose **blue/green** when you want a **fast, clean switch** and an **instant rollback**, you can afford a second full environment during the release, and you can test the new version well before it takes traffic.
- Choose **canary** when you want to **expose a new version to a small share of real users first**, watch the results, and only then widen the release. It needs good monitoring.
- Many teams combine them: deploy to a green environment, then shift traffic to it gradually.
- Whichever you choose, **database changes must be backward compatible**, or rollback will not be safe.

## How blue/green works

You keep two production-like environments, called blue and green. One is live. You deploy the new version to the idle one, test it, then switch traffic over in one step, usually at a load balancer, router or DNS layer.

1. Blue is live and serves all traffic.
2. Deploy the new version to green.
3. Run smoke tests and health checks against green.
4. Switch traffic from blue to green.
5. Keep blue running for a while. If green has a problem, switch back.

**Strengths:** a quick cutover, an instant rollback by switching back, and a chance to test the new version in a production-like environment before users see it.

**Costs and risks:** you need capacity for two environments during the release. The switch exposes **all users at once**, so a bug that your tests missed hits everyone. Shared resources, such as the database, are not duplicated, so they need extra care.

## How canary works

You release the new version to a small share of traffic first, watch it, and increase the share if it looks healthy. The name comes from the canary in the coal mine: a small, early warning.

1. The stable version serves most traffic.
2. Deploy the new version next to it, and send a small share (for example, 1 to 5 percent) to it.
3. Compare error rates, latency and business metrics between the two versions.
4. If healthy, raise the share in stages. If not, set it back to zero.
5. When it reaches 100 percent, retire the old version.

**Strengths:** limited impact if something is wrong, real-world validation, and a gradual path from small to full release.

**Costs and risks:** it needs **good observability** and clear thresholds. Without them, a canary is just a slower deployment. Mixed versions are live at the same time, so your app and database must handle both. Small canaries can also have too little traffic to show problems quickly.

## Side-by-side comparison

| Factor | Blue/green | Canary |
| --- | --- | --- |
| Traffic switch | All at once | Gradual |
| Blast radius of a bad release | Everyone, until you switch back | A small share, at first |
| Rollback speed | Very fast: switch back | Fast: set the share to zero |
| Extra infrastructure | A second full environment during release | A few extra instances, but two versions run at once |
| Needs strong monitoring | Helpful | Essential |
| Testing before real users | In the idle environment | On a small share of real users |
| Two versions live at once | Briefly, if at all | Yes, for the whole rollout |
| Fits well with | Stateless services and clear cutovers | High-traffic services and risky changes |
| Complexity | Moderate | Higher, with traffic routing and analysis |

## Decision matrix

| Your situation | Often a good fit |
| --- | --- |
| Small team, simple stack, needs an easy and fast rollback | Blue/green |
| Can run two environments, and wants a clean switch | Blue/green |
| High traffic, and wants real-user validation before full rollout | Canary |
| Risky change (new algorithm, pricing or checkout logic) | Canary, with business metrics |
| Limited monitoring and no automated checks | Blue/green, and improve monitoring first |
| Limited budget for duplicate infrastructure | Canary, or rolling updates |
| Needs zero downtime with a complex database change | Either, with expand and contract migrations |
| Mature platform with feature flags and traffic routing | Canary, plus flags for finer control |

A third option is a **rolling update**, which replaces instances in small batches. It is simpler and uses little extra capacity, but rollback is slower, since you must roll forward or roll back through the same process.

## What must be true before either approach works

1. **Health checks.** The platform must know whether a new instance is ready, so that it does not send it traffic early.
2. **Observability.** You need error rates, latency, saturation (CPU, memory, queue depth) and at least one business metric, such as successful checkouts.
3. **Automated tests and smoke tests** that run against the new version before it takes traffic.
4. **Backward-compatible database changes.** The old and new versions must both work with the schema during the release and during a rollback.
5. **Version-tolerant APIs and messages.** Other services, queues and clients should handle both versions.
6. **A clear owner** who decides to roll forward or back.

## The database problem

The database is where most failed rollbacks come from. If the new version changes the schema in a way the old version cannot handle, switching back breaks the application.

Use the **expand and contract** pattern:

1. **Expand:** add new columns or tables in a way that the old version ignores. Do not rename or drop anything yet.
2. **Deploy** the new version, which can use the new structure and still works with the old.
3. **Migrate data** in the background if needed.
4. **Contract:** only in a later release, after you are sure you will not roll back, remove the old columns or code paths.

Other state to think about: user sessions, caches, long-running jobs, messages in queues and files in shared storage. Check that both versions can read what the other wrote.

## Traffic shifting: simple examples

A blue/green switch in Kubernetes can be as small as changing a Service selector. Rolling back means changing it back:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: web
spec:
  selector:
    app: web
    version: green   # change to blue to roll back
  ports:
    - port: 80
      targetPort: 8080
```

A basic weighted canary at a reverse proxy can look like this, with about 5 percent of requests going to the new instance:

```
upstream app {
    server 10.0.0.10:8080 weight=95;   # stable version
    server 10.0.0.11:8080 weight=5;    # canary
}
```

This sends a share of requests, not of users, so one user can see both versions. For consistent user experience, use sticky routing or route by a user or cookie value. Service meshes, ingress controllers, load balancers and feature flag tools offer more refined control.

## Canary stages and what to watch

A typical progression is an example, not a rule:

| Stage | Share of traffic | Hold time | Decision |
| --- | --- | --- | --- |
| 1 | 1 to 5% | Long enough to see meaningful traffic | Continue if errors and latency match the stable version |
| 2 | 10 to 25% | Hold, and check business metrics | Continue if no regression |
| 3 | 50% | Hold, and check saturation | Continue if healthy |
| 4 | 100% | Watch closely, then retire the old version | Done |

Decide the **thresholds before** you deploy, for example: "roll back if the error rate is more than X above baseline, or p95 latency rises by Y." Avoid deciding under pressure.

Metrics to compare between versions:

- Error rate (5xx and application errors)
- Latency (p50, p95 and p99)
- Saturation (CPU, memory, connections, queue depth)
- Business signals (conversion, payment success, sign-ups)
- Logs and alerts that are new in the canary

## Rollback runbook

Adapt this to your own stack, and rehearse it.

### 1. Triggers

Roll back (or stop the rollout) when any of these happen:

- Error rate or latency passes your agreed threshold
- A critical user flow fails
- Data corruption or incorrect results appear
- On-call cannot explain the issue within a set time (for example, 10 minutes)

### 2. Decide and announce

- The **release owner** (or on-call lead) makes the call. Do not wait for consensus.
- Post in the incident channel: "Rolling back release X at HH:MM."

### 3. Execute

**Blue/green**
1. Switch traffic back to the previous environment (load balancer, route or selector).
2. Confirm health checks pass and traffic is flowing.
3. Keep the failed environment running but idle, so you can investigate.

**Canary**
1. Set the canary share to 0 percent, or disable its route.
2. Confirm the stable version handles all traffic.
3. Scale down or pause the canary instances.

**Feature flags**
- If the change is behind a flag, turn the flag off first. It is often the fastest step.

### 4. Check the data

- Look for data written by the new version that the old one cannot read.
- Check queues, caches and background jobs.
- If you ran a destructive migration, follow your data recovery plan.

### 5. Verify and communicate

- Run smoke tests against production.
- Watch metrics return to normal.
- Tell stakeholders what happened and what users may have seen.

### 6. Review afterwards

- Write a short blameless review: what happened, why tests or checks missed it, and what will change.
- Add the missing test, alert or threshold.
- Record how long the rollback took, to improve it.

## Release safety checklist

- ✅ Health checks and smoke tests run before a new version takes traffic
- ✅ Error, latency, saturation and one business metric are monitored
- ✅ Rollback thresholds are agreed before deploying
- ✅ Database changes are backward compatible (expand and contract)
- ✅ The previous version stays available until the release is confirmed healthy
- ✅ A named owner can decide to roll back without waiting
- ✅ The rollback steps are written down and have been rehearsed
- ✅ Feature flags exist for risky changes
- ✅ Queues, caches and sessions work with both versions
- ✅ A post-release review is planned

## Common mistakes

- **Dropping or renaming columns in the same release** as the code that stops using them.
- **A canary without metrics,** or without thresholds agreed in advance.
- **Canaries too small or too short** to show anything.
- **Rolling back the code but not the data.**
- **Switching blue/green with no warm-up,** so the new environment faces cold caches and slow starts.
- **Deleting the old environment too early.**
- **Never practising rollback.** The first time should not be during an outage.

## FAQ

**Is blue/green or canary better?**
Neither is always better. Blue/green is simpler and gives an instant switch back. Canary gives earlier feedback from real users with less exposure, but needs better monitoring.

**Can I use both?**
Yes. A common approach is to deploy to a green environment, then shift traffic gradually, with the blue environment kept as a fast fallback.

**What about a small team with one server?**
Start with simple steps: automated deployment, health checks, a quick rollback script and backward-compatible migrations. Add blue/green or canary as your traffic and tooling grow.

**How long should I keep the old version running?**
Until you are confident the new one is healthy, often several hours to a day or longer, depending on traffic patterns and risk. Keep it longer for releases with data changes.

**Where do feature flags fit?**
Flags let you separate deploying code from turning on a feature. They reduce risk, and give you a fast rollback for individual features, but they also need cleanup so that old flags do not pile up.

## Sources and further reading

- Martin Fowler, [BlueGreenDeployment](https://martinfowler.com/bliki/BlueGreenDeployment.html)
- Martin Fowler, [CanaryRelease](https://martinfowler.com/bliki/CanaryRelease.html)
- The documentation for your platform's deployment and traffic-routing features, such as your load balancer, ingress controller or service mesh

*This guide is for general information. Tooling and best practices differ by platform and team. Test deployment and rollback procedures in a safe environment before relying on them in production.*
