---
layout: post
title: "Fintech Billing Ledger Architecture"
h1: "Designing Multi-Tier Fintech Billing Ledgers and Real-Time Wallet Architectures"
description: "An architectural guide to structuring double-entry ledger schemas, parent-child credit delegation, atomic transaction queues, and automated fee reconciliation."
date: 2026-11-05
topic: software
tags: ["fintech-payments", "billing-ledgers", "api-security", "architecture"]
image: "/assets/images/topics/software-card.png"
---
## Quick answer

Use an append-only, double-entry ledger as the source of truth and treat the wallet balance as a derived, cached view of it. Hierarchical accounts (`SysAdmin` → `Admin` → `Reseller` → `Client`) should express credit delegation and markup rules, not shared mutable balances. Every billable event becomes a balanced pair of entries inside one database transaction, guarded by an idempotency key so a network retry cannot debit twice. If you remember one rule: never fix a wrong balance by editing history — post a compensating entry.

## 1. Overview of Multi-Tier Ledgers

Enterprise CPaaS and fintech platforms frequently require hierarchical account structures—spanning `SysAdmin`, `Admin`, `Reseller`, and `Client` tiers. Managing credit allocations, transaction markups, and wallet balances across these tiers demands immutable, double-entry ledger design to avoid financial drift under concurrent traffic.

The hierarchy usually exists for two reasons. First, a parent funds or limits what a child can spend. Second, a parent earns a margin on what a child resells. Both are accounting relationships, so they should be represented as journal entries rather than as ad hoc updates to a `balance` column. When a reseller sends a message for a client, you may need to record the client's usage, the reseller's markup, and the platform's fee as separate, explainable movements.

## 2. Relational schema blueprint

To prevent data corruption during balance updates, billing schemas separate user accounts from transaction history using an append-only ledger pattern.

### Account hierarchy (`accounts` table)

* `id` (`BIGINT`, PK)
* `parent_id` (`BIGINT`, Nullable FK)
* `role` (`VARCHAR`: `sysadmin`, `admin`, `reseller`, `client`)
* `credit_limit` (`DECIMAL(14,4)`)
* `status` (`ENUM`: `active`, `suspended`, `blacklisted`)

### Immutable transaction log (`ledger_entries` table)

* `id` (`BIGINT`, PK)
* `account_id` (`BIGINT`, FK)
* `reference_id` (`UUID`)
* `amount` (`DECIMAL(14,4)`) — Positive for credits, negative for debits
* `balance_after` (`DECIMAL(14,4)`)
* `created_at_epoch` (`BIGINT`) — Unix timestamp integer format for rapid log querying

A production design normally adds a few fields: a `transaction_id` grouping the debit and credit legs, a `currency` code, an `entry_type`, an `idempotency_key`, and a `description` or `metadata` block. Keep `balance_after` as a convenience for audits, but do not use it as the authority for the next balance; recompute from entries when in doubt.

**Use exact numeric types.** `DECIMAL(14,4)` or a minor-unit `BIGINT` avoids floating-point rounding surprises. If you store minor units (for example, cents), document that everywhere and format only at the presentation layer.

## 3. Double-entry in practice

Double-entry means every value movement has at least two legs whose amounts sum to zero. An illustrative top-up of 100 units by a parent to a child:

| Leg | Account | Amount | Meaning |
| :--- | :--- | :--- | :--- |
| 1 | Parent wallet | -100.0000 | Parent grants credit |
| 2 | Child wallet | +100.0000 | Child receives spendable credit |

An illustrative billable event of 0.025 units where the platform charges the reseller:

| Leg | Account | Amount | Meaning |
| :--- | :--- | :--- | :--- |
| 1 | Reseller wallet | -0.0250 | Cost of the billable event |
| 2 | Platform revenue | +0.0250 | Platform earns the charge |

If the reseller adds a markup, add a third leg rather than hiding the margin in a report. The point is not accounting theory; it is that every question from a customer can be answered by reading entries. All figures here are illustrative and do not represent any real pricing.

## 4. Parent-child credit delegation

Two models are common:

| Model | How it works | Advantage | Constraint |
| :--- | :--- | :--- | :--- |
| Explicit allocation | Parent moves credit into child wallet via journal entries | Clear balances and simple spend checks | Requires top-up workflow and low-balance alerts |
| Credit ceiling | Parent sets a limit; child spends against it | Less operational overhead | Needs careful authorization logic and shared exposure rules |
| Hybrid | Child has a wallet plus a parent-backed ceiling | Flexibility for growing reseller networks | Most complex to reason about and audit |

Whichever you choose, enforce the rule at write time in the database, not only in the API layer. A suspended parent should not be able to keep generating spendable credit for children through a cached authorization decision.

## 5. Concurrency and API security rules

### Atomic balance debits

When a downstream API service processes a billable event (e.g., sending an outbound SMS or dispatching a webhook notification), wallet deductions must occur inside an isolated SQL transaction using `SELECT ... FOR UPDATE` or optimistic concurrency checks:

```sql
BEGIN;
SELECT balance FROM wallets WHERE account_id = 104 FOR UPDATE;

-- Validate sufficient funds
UPDATE wallets 
SET balance = balance - 0.025, updated_at = EXTRACT(EPOCH FROM NOW()) 
WHERE account_id = 104 AND balance >= 0.025;

INSERT INTO ledger_entries (account_id, reference_id, amount, balance_after, created_at_epoch)
VALUES (104, '3f2b1a9e-...', -0.025, 149.975, EXTRACT(EPOCH FROM NOW()));
COMMIT;
```

The `WHERE balance >= cost` guard is as important as the lock: it turns a logic error into zero affected rows instead of a negative balance. Check the row count, roll back, and return a clear insufficient-funds result. If you expect extreme contention, compare this pessimistic approach with optimistic concurrency (a version column and `WHERE version = expected_version`) using realistic load tests.

### Edge rate-limiting and idempotency

To prevent accidental double-debits caused by network retries:

1.  Every API request requires a unique `X-Idempotency-Key` header.
2.  Edge workers check Redis cache for cached responses matching the idempotency key before re-executing ledger writes.

The edge check is a fast filter, not the final authority. Also persist the idempotency key in the database with a unique constraint on `(account_id, idempotency_key)` and store the original response. If two requests race, one wins the insert and the other returns the recorded result. Our [idempotency keys and double-charge prevention guide]({{ '/2026/11/14/fintech-idempotency-keys-and-preventing-double-charges/' | relative_url }}) goes deeper on key scope, retention, and replay semantics. For the edge layer itself, see [distributed rate limiting]({{ '/2026/11/07/distributed-rate-limiting-and-api-security-at-the-edge/' | relative_url }}).

## 6. Reconciliation and audit workflow

A ledger is only trustworthy if you regularly compare it with external reality.

1. **Import provider or bank records** into a staging table with a unique external reference.
2. **Match** each external record to a transaction or journal ID. Flag unmatched items.
3. **Explain differences** with fee, refund, chargeback, or timing entries — never by editing history.
4. **Run a balance proof:** sum entries per account and compare with the cached wallet balance.
5. **Review and sign off** exceptions with an owner and timestamp.
6. **Retain** the audit trail according to your legal and contractual obligations; ask a qualified professional about the exact requirements in your jurisdiction.

Schedule this daily at minimum for active billing systems, and alert on any unmatched item rather than only on large amounts. Small mismatches are usually the earliest sign of a retry or mapping bug.

## 7. Decision table: ledger approach

| Situation | Approach | Why |
| :--- | :--- | :--- |
| Simple prepaid credits, one account type | Append-only entries plus derived balance | Low complexity, still auditable |
| Resellers, markups, refunds, disputes | Full double-entry with journal IDs | Explains every leg and margin |
| Very high write volume | Batch billable events into periodic journals | Reduces row count while preserving traceability |
| Multiple currencies | Store currency per entry and avoid implicit conversion | Prevents silent FX drift |
| Regulatory reporting needs | Immutable entries with explicit correction entries | Maintains a defensible audit trail |

## 8. Implementation checklist

- [ ] Use exact numeric or minor-unit integer amounts everywhere.
- [ ] Give every journal a stable ID and group balanced legs under it.
- [ ] Add unique constraints for idempotency keys.
- [ ] Wrap balance check, wallet update, and entry insert in one transaction.
- [ ] Treat the wallet table as a cache; rebuild it from entries if needed.
- [ ] Record currency, timestamp unit, and event source on each entry.
- [ ] Never `UPDATE` or `DELETE` a posted entry; post reversals instead.
- [ ] Enforce tenant and hierarchy authorization in the database layer too; see [PostgreSQL RLS]({{ '/2026/11/11/multi-tenant-database-isolation-postgresql-rls/' | relative_url }}).
- [ ] Automate daily reconciliation with an exception queue.
- [ ] Alert on negative balances, unmatched provider rows, and idempotency collisions.
- [ ] Test concurrent debits, partial failures, and replayed requests in CI.

## 9. Failure modes and mitigations

| Failure mode | Symptom | Mitigation |
| :--- | :--- | :--- |
| Duplicate debit | Customer charged twice for one event | Persisted idempotency key with unique constraint |
| Lost update | Two concurrent events overwrite a balance | Row lock or optimistic version check |
| Floating-point drift | Balances differ by tiny fractions | `DECIMAL` or minor-unit integers |
| Silent currency mix | Totals stop making sense | Currency on every entry, no implicit conversion |
| Edited history | Audit cannot explain old balance | Append-only tables and reversal entries |
| Reconciliation blind spot | Provider fees never explained | Stage provider reports and match every row |
| Notification loss | Billable event recorded but customer never told | Durable outbox, described in [reliable webhook delivery][webhook-outbox] |

[webhook-outbox]: {{ '/2026/11/15/reliable-webhook-delivery-outbox-pattern-and-retries/' | relative_url }}

## 10. FAQ

**Do we really need double-entry for a simple wallet?** It is useful as soon as money moves between parties or you must explain a balance to someone else. A single-account ledger can work briefly, but corrections become ambiguous quickly.

**Can we rebuild a wallet from ledger entries?** That is the goal. Store entries as the authority and make the wallet table a materialized view or cache that can be recomputed during an incident.

**How long should we keep idempotency keys?** At least as long as a client might realistically retry with the same key, and in line with your retention obligations. Document the window in your API contract.

**Should we lock the parent when a child spends?** Only if your credit model makes the parent directly liable in real time. With explicit allocations, the child's own wallet is the spend boundary.

## 11. Next steps

1. Write down every money movement as a journal with legs before writing schema.
2. Decide numeric representation and timestamp units, then document them.
3. Add the idempotency constraint and concurrency test first; build features on top.
4. Schedule reconciliation and an exception review from day one.
5. Read the linked guides on idempotency, isolation, and reliable delivery before implementation begins.