---
layout: post
title: "High-Throughput Log Analytics"
h1: "High-Throughput Log Analytics and PostgreSQL Indexing Strategies"
description: "An architectural guide on optimizing log ingestion pipelines using Unix Epoch integer partitioning, BRIN indexes, and dynamic table partitioning in PostgreSQL."
date: 2026-11-08
topic: software
tags: ["cloud-architecture", "data-engineering", "database-design", "devops"]
image: "/assets/images/topics/software-card.png"
---
## Quick answer

Treat logs as an append-only time-series stream, not as ordinary transactional rows. Store time in one documented representation, partition by time so old data can be dropped cheaply, use BRIN indexes for sequential time ranges and B-tree indexes for point lookups, and keep the active working set small. Before choosing any index, write down the three queries you actually run — most log performance problems come from indexing for hypothetical questions.

## 1. The Challenge of Log-Heavy Workloads

High-volume API gateways, transaction ledgers, and CPaaS delivery platforms produce millions of log rows daily. Standard relational queries over massive `TIMESTAMP WITH TIME ZONE` columns often suffer from write amplification, bloated B-tree index sizes, and degraded search performance under concurrent workloads.

The deeper problem is shape. Log rows arrive in time order, are almost never updated, and are queried in narrow time windows with a tenant or event-type filter. That is a very different access pattern from a user table, yet teams often apply the same indexing habits. The payoff for matching design to shape is usually lower storage, cheaper writes, and predictable query plans.

## 2. Ingestion pipeline: where to spend effort first

A practical pipeline has five stages:

| Stage | Responsibility | Common mistake |
| :--- | :--- | :--- |
| Emit | Services write structured events with request and tenant IDs | Free-text messages that cannot be queried |
| Buffer | Queue absorbs bursts and decouples producers from the database | Writing synchronously on the hot path |
| Batch insert | Writer groups rows into multi-row inserts | One insert per event |
| Store | Partitioned append-only tables with selective indexes | Indexing every column "just in case" |
| Query and roll up | Dashboards read pre-aggregated summaries for long ranges | Scanning raw events for every chart |

If your ingestion path sits behind serverless functions, database connections are often the first bottleneck; the pooling guidance in [resilient multi-tenant serverless architectures]({{ '/2026/11/04/building-resilient-multi-tenant-serverless-architectures/' | relative_url }}) applies here. If events carry money, the same timestamp discipline matters in [fintech billing ledgers]({{ '/2026/11/05/designing-multi-tier-fintech-billing-ledgers-and-wallet-architectures/' | relative_url }}).

## 3. Integer timestamps vs. standard timestamps

Storing event execution times as `BIGINT` Unix Epoch timestamps (seconds or milliseconds) can provide distinct advantages for large-scale analytical ledgers:

| Storage Metric | Standard SQL `TIMESTAMPTZ` | Unix Epoch `BIGINT` | Performance Benefit |
| :--- | :--- | :--- | :--- |
| **Storage Footprint** | 8 Bytes | 8 Bytes | Equivalent memory allocation. |
| **Index Traversal** | Complex timezone parsing | Native CPU integer comparison | Faster arithmetic range comparisons (`>=` and `<=`). |
| **Serialization Overhead** | ISO 8601 string parsing | Raw numeric payload | Reduced JSON serialization overhead in microservices. |

Important caveat: an epoch integer carries no timezone or calendar semantics. If you choose it, document the unit, always derive values in UTC, and convert at the presentation boundary. Mixed seconds-and-milliseconds columns are a common and painful source of wrong results. If your team relies heavily on date functions, window functions over calendar intervals, or client libraries that expect `TIMESTAMPTZ`, the ergonomic cost may outweigh the benefit — measure with your own queries rather than assuming.

## 4. BRIN indexes vs. traditional B-tree indexes

For append-only log tables where events are written in sequential order, standard B-tree indexes can consume large amounts of storage.

**Block Range Indexes (BRIN)** summarize data across physical disk page ranges instead of indexing every individual row.

```sql
-- Create a high-throughput audit log table
CREATE TABLE event_logs (
    id BIGSERIAL,
    tenant_id BIGINT NOT NULL,
    event_type VARCHAR(64) NOT NULL,
    created_at_epoch BIGINT NOT NULL,
    payload JSONB
) PARTITION BY RANGE (created_at_epoch);

-- Implement a compact BRIN index on the epoch timestamp
CREATE INDEX idx_event_logs_epoch_brin 
ON event_logs USING brin (created_at_epoch) 
WITH (pages_per_range = 128);

```

### Key advantages of BRIN for time-series

* **Index size reduction:** typically far smaller than a corresponding B-tree index because it stores page-range summaries rather than one entry per row.
* **Write throughput:** minimal insertion penalty because the index updates as page ranges fill.
* **Good fit for range scans:** queries such as "all events in the last hour" can skip whole page ranges.

The trade-off is that BRIN is lossy: PostgreSQL may recheck rows, and it works best when physical write order correlates with the indexed value. Random inserts, heavy updates, or frequent `VACUUM FULL`-style reorganization weaken that correlation. Always validate with `EXPLAIN (ANALYZE, BUFFERS)` on realistic data volumes.

| Query pattern | Prefer | Why |
| :--- | :--- | :--- |
| Time range over recently written rows | BRIN on epoch column | Sequential physical order, compact index |
| Single event by ID | B-tree on ID | Exact match needs precise lookup |
| All events for a tenant in a time range | Composite B-tree or tenant BRIN plus time pruning | Depends on tenant count and physical clustering |
| Count events by type over months | Rollup table or materialized view | Avoid scanning raw rows repeatedly |
| Full-text search in payload | Dedicated search index | PostgreSQL GIN has different trade-offs |

## 5. Range partitioning by epoch intervals

Partitioning parent tables by epoch ranges keeps active working sets manageable and makes retention a metadata-only operation.

```sql
-- Create a monthly partition for November 2026 (Epoch range)
-- Nov 01 2026 00:00:00 GMT -> 1793491200
-- Dec 01 2026 00:00:00 GMT -> 1796083200

CREATE TABLE event_logs_2026_11 PARTITION OF event_logs
    FOR VALUES FROM (1793491200) TO (1796083200);

```

Verify those boundary values against your own calendar calculation before using them; the important idea is the pattern, not the literal numbers. Choose a partition granularity that balances two costs: too small and you manage hundreds of objects, too large and retention and pruning become coarse. Monthly partitions are a common starting point for event data; daily partitions suit very high-volume tables.

Partitioning also helps query planning. If every dashboard query includes a time predicate, PostgreSQL can skip partitions entirely. If queries omit time predicates, partitioning adds overhead without benefit — this is why query auditing must come first.

## 6. Retention, rollups, and cost control

1. **Define retention per event class.** Security audit events often need longer retention than debug logs, and legal requirements vary by jurisdiction — ask a qualified professional for your context.
2. **Drop partitions instead of deleting rows.** `DROP TABLE event_logs_2026_11` avoids the bloat and vacuum pressure caused by a large `DELETE`.
3. **Create rollups before you need them.** Store hourly counts by tenant and event type; dashboards for "last 90 days" should read the rollup, not raw events.
4. **Separate hot and cold storage.** Keep recent partitions on fast storage and move older ones to cheaper tiers if your platform supports it.
5. **Keep payloads bounded.** A huge `JSONB` payload slows inserts and inflates indexes. Store a summary in columns and large blobs elsewhere.
6. **Avoid updates.** Corrections should be new events with a relation to the original; updating rows undermines BRIN correlation and auditability.

## 7. Implementation checklist

- [ ] Write down the unit and timezone rule for every timestamp column.
- [ ] Identify the top three query shapes before creating indexes.
- [ ] Partition by time with a documented granularity and creation job.
- [ ] Add BRIN for sequential time ranges; add B-tree only for proven point lookups.
- [ ] Batch inserts on the write path and cap per-tenant ingestion rate.
- [ ] Keep event IDs and tenant IDs on every row for traceability.
- [ ] Build rollup tables for long-range dashboards.
- [ ] Automate partition creation and retention drops with alerts on failure.
- [ ] Validate plans with `EXPLAIN (ANALYZE, BUFFERS)` after loading representative data.
- [ ] Monitor index size, insert latency, and slow queries over time.
- [ ] Enforce tenant isolation for log reads; see [PostgreSQL RLS]({{ '/2026/11/11/multi-tenant-database-isolation-postgresql-rls/' | relative_url }}).

## 8. Failure modes and mitigations

| Failure mode | Symptom | Mitigation |
| :--- | :--- | :--- |
| Mixed timestamp units | Impossible date ranges, wrong dashboards | One unit, validated at ingest, documented in schema |
| BRIN on unordered data | Queries scan more blocks than expected | Preserve append order; test correlation and plans |
| Over-indexing | Slow inserts and large storage growth | Remove unused indexes; review with query stats |
| Partition miss | Queries scan every partition | Require a time predicate in query templates |
| Retention job failure | Storage grows without bound | Alert on missing partitions and failed drops |
| Unbounded JSON payloads | Write latency and bloat | Field limits and external blob storage |
| Tenant data leakage | One tenant queries another's logs | Row-level isolation and negative tests |

## 9. FAQ

**Should we always prefer `BIGINT` over `TIMESTAMPTZ`?** No. Integer epochs are efficient for arithmetic-heavy range scans and JSON transport, but they lose calendar semantics. Choose based on your query patterns and team conventions.

**How many partitions is too many?** There is no universal number. Watch planning time and maintenance overhead as counts grow, and adjust granularity rather than adding partitions indefinitely.

**Does BRIN replace B-tree entirely?** Rarely. BRIN is excellent for ordered time ranges; exact lookups by ID or reference still need a B-tree.

**Can we update a log row to correct it?** Prefer appending a correction event. It preserves history and keeps physical ordering intact.

## 10. Next steps

1. List your actual log queries with their filters and time ranges.
2. Pick timestamp representation and partition granularity, and write both down.
3. Prototype with representative data volume before committing to indexes.
4. Add rollups and retention automation early; both are harder after growth.
5. Review the linked guides on serverless pooling, ledgers, and RLS for adjacent design decisions.
