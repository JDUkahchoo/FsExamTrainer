---
name: Draft columns are int32 — bound client-generated seeds
description: Quiz/exam draft saves silently break if any integer field exceeds int32; timestamps as seeds are the trap.
---

Any client value persisted into a Postgres `integer` column (e.g. `shuffle_seed` on quiz/exam drafts) must fit int32 (≤ 2,147,483,647). `Date.now()` (~1.75e12) does not.

**Why:** Shuffle seeds were generated with raw `Date.now()`; drizzle-zod's `createInsertSchema` enforces the int32 max, so every POST to the draft endpoints returned 400 "Invalid draft data" — resume-on-leave was silently broken for all quizzes and exams while the UI kept working.

**How to apply:** When generating seeds or other numeric values on the client that get saved to an integer column, bound them (e.g. `Date.now() % 2147483647`). If a draft/snapshot payload shape changes, keep its schema-guard tests in sync so a silent 400 can't reappear.

E2e tip: the TX exam track is short enough to reach the Submit button in a browser test; the FS tracks are not.
