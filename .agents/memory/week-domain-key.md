---
name: Week records follow content via domainKey
description: Study-plan week progress/completion records carry a stable domainKey; all week-number-scoped mutations must be content-aware.
---

Week progress and week memory-health rows carry a nullable `domainKey` (sorted domains joined `|` + `#occurrence`, empty set → `~generic`; helpers in `shared/lib/weekKey.ts`). When the plan resizes, records follow their content, not their week number, and two records can *transiently share one week number*.

**Why:** Exam-date changes reshuffle topics across week numbers; keying by week number alone caused completed weeks to detach from their topics, and the unique index on (user, track, weekNumber) had to be dropped.

**How to apply:** Any server operation scoped by weekNumber (restart, review, delete, upsert) must accept an optional `domainKey` and target the keyed row first, falling back to legacy null-key rows at that week only. Never mass-update/delete by weekNumber alone — it can hit the wrong topic's record. Client resolves keys via `planWeekKeys` / `weekAttachment` memos in study-plan.tsx; migration is lazy (client re-stamps stale rows; no SQL backfill).
