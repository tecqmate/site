---
layout: post
title: "PostgreSQL Indexing for API Workloads: B-tree, GIN and BRIN with EXPLAIN Examples"
description: "A practical guide to choosing PostgreSQL indexes for typical API queries: filters with sorting and pagination, JSONB, text search and large time-based tables. Includes how to read EXPLAIN, composite index order, partial and covering indexes, safe index creation and a maintenance checklist."
date: 2026-12-19
tags: ["postgresql", "database-indexing", "btree", "gin", "brin", "explain-analyze", "api-performance", "backend", "programming"]
topic: programming
read_mins: 10
audience: "Backend developers and small teams running APIs on PostgreSQL who want faster queries without guessing which indexes to add"
---

An API endpoint is slow, someone suggests "add an index", and a few indexes later the endpoint is still slow and the writes are slower too. Indexing works when you match the index to the **query**, and check the result with **EXPLAIN**.

This guide covers the three index types that handle most API workloads (B-tree, GIN and BRIN), how to read a query plan, and how to create and maintain indexes safely. The plan snippets below are **simplified illustrations of the node types you will see**. Your costs, row counts and timings will differ, so run EXPLAIN on your own data.

## Quick answer

- Use **B-tree** (the default) for equality, ranges and sorting, which covers most API filters.
- Use **GIN** for `jsonb` containment, arrays and full-text search.
- Use **BRIN** for very large, append-only tables where values follow the physical order of the rows, such as timestamps in a log table.
- Design composite indexes for **your real query**: equality columns first, then the sort or range column.
- Check with `EXPLAIN (ANALYZE, BUFFERS)`, create indexes with `CONCURRENTLY` on live systems, and remove indexes you do not use.

## Find the slow queries first

Do not index by guesswork. Find out which queries cost the most:

- Enable the `pg_stat_statements` extension, and sort by total time and by mean time.
- Use your application's slow-query log or tracing to link queries to endpoints.
- Check that the slow queries run often enough to matter. A rare report is a different problem from an endpoint called a thousand times a minute.

## How to read EXPLAIN

```sql
EXPLAIN (ANALYZE, BUFFERS)
SELECT id, status, created_at
FROM orders
WHERE tenant_id = 42 AND status = 'open'
ORDER BY created_at DESC
LIMIT 20;
```

`EXPLAIN` shows the plan the planner chooses. Adding `ANALYZE` **actually runs the query** and reports real timings, so wrap `INSERT`, `UPDATE` and `DELETE` statements in a transaction that you roll back. `BUFFERS` shows how much data was read.

Common node types:

| Node | What it means | Usually good or bad? |
| --- | --- | --- |
| Seq Scan | Reads the whole table | Fine for small tables or when most rows are needed. Often a problem on large tables with selective filters |
| Index Scan | Walks the index and fetches rows from the table | Good for selective queries |
| Index Only Scan | Answers from the index without touching the table (when possible) | Best case |
| Bitmap Index Scan and Bitmap Heap Scan | Collects matching locations first, then reads the table in order | Good for medium selectivity and for combining indexes |
| Sort | Sorts rows in memory or on disk | A warning sign when the query has `ORDER BY ... LIMIT`, and an index could return rows already ordered |

What to look for in the output:

- **Estimated rows against actual rows.** A big gap means the planner has poor statistics. Run `ANALYZE` on the table.
- **"Rows Removed by Filter"** with a large number means the query reads many rows only to discard them. A better index may help.
- **Buffers read** gives a rough sense of how much work the query did.
- **"Heap Fetches"** on an Index Only Scan means the table still had to be visited. Vacuuming keeps the visibility map up to date.
- In PostgreSQL 18, `EXPLAIN ANALYZE` also reports **index searches**, which shows how many times an index scan had to descend the index.

## B-tree: the workhorse

B-tree indexes support `=`, `<`, `>`, `BETWEEN`, `IN`, prefix `LIKE 'abc%'` (in some setups) and `ORDER BY`. A primary key already gets one. Add more for the filters that your API uses.

### Example: a list endpoint with filter, sort and limit

The query above filters on two columns and sorts by a third. Without an index, a plan looks like this:

```
Limit
  -> Sort  (Sort Key: created_at DESC)
       -> Seq Scan on orders
            Filter: (tenant_id = 42 AND status = 'open')
            Rows Removed by Filter: <very large>
```

Create an index that matches the query:

```sql
CREATE INDEX CONCURRENTLY idx_orders_tenant_status_created
ON orders (tenant_id, status, created_at DESC);
```

Now the planner can walk the index in order and stop after 20 rows:

```
Limit
  -> Index Scan using idx_orders_tenant_status_created on orders
       Index Cond: (tenant_id = 42 AND status = 'open')
```

The `Sort` node has disappeared, and the query reads only the rows it needs.

### The column-order rule

For a composite B-tree index:

1. Put columns used with **equality** (`=`) first.
2. Then the column used for **range filters or sorting**.
3. Do not add columns "just in case". Every extra column makes the index bigger.

An index on `(tenant_id, status, created_at)` serves queries on `tenant_id`, on `tenant_id` and `status`, and on all three. It does not help a query that filters only on `status`, with one exception that is new:

PostgreSQL 18 added **skip scan** for multicolumn B-tree indexes, which can use an index in more cases when there is no equality condition on the leading columns but there is a condition on a later column. The PostgreSQL project notes that it mainly helps when the skipped column has few distinct values. Treat it as a bonus, not a design rule. Build indexes for your main queries, and test on your version.

### Partial indexes

If your API mostly queries a small subset, index only that subset:

```sql
CREATE INDEX CONCURRENTLY idx_orders_open_created
ON orders (tenant_id, created_at DESC)
WHERE status = 'open';
```

A partial index is smaller and cheaper to maintain. The query must include a condition that matches the index's `WHERE` clause for the planner to use it.

### Covering indexes

Add columns with `INCLUDE` so that the index can answer the query without visiting the table:

```sql
CREATE INDEX CONCURRENTLY idx_orders_lookup
ON orders (tenant_id, created_at DESC)
INCLUDE (status, total);
```

This can enable Index Only Scans, but it makes the index bigger. Use it for hot, narrow queries.

### Expression indexes

Searching with a function on the column defeats a normal index:

```sql
-- This cannot use an index on email:
SELECT * FROM users WHERE lower(email) = 'a@example.com';

-- Create an index on the expression instead:
CREATE INDEX CONCURRENTLY idx_users_email_lower ON users (lower(email));
```

## GIN: jsonb, arrays and text search

GIN indexes are built for values that contain many items, such as a `jsonb` document, an array or a text-search vector.

### jsonb containment

```sql
CREATE INDEX CONCURRENTLY idx_events_payload
ON events USING gin (payload jsonb_path_ops);

SELECT id FROM events WHERE payload @> '{"type": "refund"}';
```

- The default operator class (`jsonb_ops`) supports more operators, such as key-existence checks, but makes a bigger index.
- `jsonb_path_ops` is smaller and faster for containment (`@>`) queries, but supports fewer operators.
- If you always filter on one JSON key, an expression B-tree on `(payload ->> 'type')` can be smaller and faster than a GIN index.

### Full-text search and fuzzy matching

- Store a `tsvector` column (or use an expression) and index it with GIN for full-text search.
- For `ILIKE '%term%'` or typo-tolerant search, the `pg_trgm` extension with a GIN (or GiST) trigram index can help where a normal B-tree cannot.

### What to know about GIN

- Writes are more expensive than with B-tree, because one row can touch many index entries.
- PostgreSQL 18 allows GIN indexes to be built in parallel, which helps with large builds.
- Use it where read speed matters more than write speed.

## BRIN: huge, ordered, append-only tables

A BRIN (block range) index stores a summary for each range of table pages. It is tiny, and cheap to maintain, but it only works well when the indexed values correlate with the physical order of rows.

```sql
CREATE INDEX CONCURRENTLY idx_logs_created_brin
ON logs USING brin (created_at);
```

Good fit: an append-only log, event or metrics table, queried by time range, with timestamps that grow as rows are inserted.

Check correlation first:

```sql
SELECT attname, correlation
FROM pg_stats
WHERE tablename = 'logs' AND attname = 'created_at';
```

A value close to 1 (or -1) suggests that BRIN will work. A value near 0 means rows are scattered, and BRIN will not help. BRIN is not for selective lookups of one row. Use B-tree for those.

## Pagination: offset or keyset?

`OFFSET 100000` makes PostgreSQL read and discard 100,000 rows before it returns the next page. For deep pages, use **keyset pagination** with a matching index:

```sql
SELECT id, created_at
FROM orders
WHERE tenant_id = 42
  AND (created_at, id) < ($1, $2)
ORDER BY created_at DESC, id DESC
LIMIT 20;
```

An index on `(tenant_id, created_at DESC, id DESC)` lets each page start where the last one ended.

## Creating and changing indexes safely

- Use `CREATE INDEX CONCURRENTLY` on live tables. A normal `CREATE INDEX` blocks writes while it builds.
- `CONCURRENTLY` cannot run inside a transaction block. If it fails, it can leave an **invalid** index behind, so check and drop it.
- Index builds take time and extra I/O. Run them when load is low, and test on a copy first.
- Run `ANALYZE` on the table after a large data change so that the planner has fresh statistics.
- Use `DROP INDEX CONCURRENTLY` to remove indexes without blocking.

## Index costs and maintenance

Every index costs something:

- **Slower writes.** Each insert, update and delete must maintain every index.
- **More storage and memory.**
- **More vacuum work.**

Review regularly:

- Look at `pg_stat_user_indexes` for indexes with very few scans (`idx_scan`). Check across a full business cycle, and on read replicas too, before you drop anything.
- Look for duplicate or overlapping indexes. An index on `(a, b)` can often replace one on just `(a)`.
- Watch for bloat on heavily updated tables, and keep autovacuum healthy.

## Index review checklist

- ✅ You identified the slow queries with real data, not guesses
- ✅ You ran `EXPLAIN (ANALYZE, BUFFERS)` before and after the change
- ✅ Composite indexes put equality columns before range or sort columns
- ✅ Partial or covering indexes are used only for hot queries
- ✅ GIN is used for jsonb, arrays or full-text, not for plain filters
- ✅ BRIN is used only for large, ordered, append-only tables
- ✅ Indexes on live tables are created with `CONCURRENTLY`
- ✅ Statistics are fresh (`ANALYZE`), and autovacuum is working
- ✅ Unused and duplicate indexes are reviewed and removed
- ✅ The cost to write speed was considered

## Common mistakes

- **Indexing every column.** Most of those indexes will never be used, and all of them slow writes.
- **A function on the column** (`lower(email)`, `date(created_at)`) without a matching expression index.
- **Comparing mismatched types,** which can prevent index use.
- **Indexing low-selectivity columns alone,** such as a boolean flag that is true for half of the table.
- **Index order that does not match `ORDER BY`,** which leaves a Sort node.
- **Leading wildcard searches** (`LIKE '%term'`) with a plain B-tree.
- **Deep `OFFSET` pagination** on large tables.
- **Trusting one `EXPLAIN` run** on a small test table. Plans change with data size.

## FAQ

**How many indexes is too many?**
There is no fixed number. Keep the ones that serve real queries, and measure the cost to writes on busy tables.

**Does the planner always use my index?**
No. If a query needs a large share of the table, a sequential scan can be cheaper. The planner chooses by estimated cost, so fresh statistics matter.

**B-tree or hash for equality lookups?**
B-tree handles equality, ranges and sorting, and is usually the best choice. Hash indexes support equality only, and rarely beat a B-tree in practice.

**Should I use GIN or a B-tree expression index for jsonb?**
If you query one known key, an expression B-tree is often smaller and faster. For flexible containment queries over many keys, GIN is the better fit.

**Can I test index ideas without touching production?**
Yes. Restore a recent copy into a test database, create the index there, and compare plans. Some teams use extensions that test "hypothetical" indexes without building them.

## Sources and further reading

- PostgreSQL documentation, [Indexes](https://www.postgresql.org/docs/current/indexes.html)
- PostgreSQL documentation, [Using EXPLAIN](https://www.postgresql.org/docs/current/using-explain.html)
- PostgreSQL 18 release notes, [Release 18](https://www.postgresql.org/docs/current/release-18.html)
- PostgreSQL feature matrix, [Skip scan on multicolumn B-tree indexes](https://www.postgresql.org/about/featurematrix/detail/skip-scan-on-multicolumn-b-tree-indexes/)

*The EXPLAIN snippets above are simplified to show node types, not real measurements. Behaviour differs by PostgreSQL version, data and configuration, so test every change on your own system before you rely on it.*
