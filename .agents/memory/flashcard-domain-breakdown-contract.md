---
name: Flashcard session domainBreakdown contract
description: The flashcard session domainBreakdown payload/jsonb has no type enforcement; keep client emit and server reader shapes in sync.
---

# Flashcard session `domainBreakdown` contract

The flashcard review session `domainBreakdown` (jsonb column + the
`/api/flashcards/sessions/:id/complete` request body) is documented as
`{ [domain]: { reviewed, avgRating } }`, but nothing enforces it at compile
time (jsonb is untyped, and the client builds the payload independently).

**Why:** A regression once shipped where the client sent a plain count map
(`Record<string, number>`) while server logic and study-plan readers expected
`{ reviewed, avgRating }`. Anything keyed off `.reviewed`/`.avgRating` silently
read `undefined` and no-opped (e.g. per-session review auto-clear never fired).
It was only caught in code review, not by the type checker.

**How to apply:** When touching flashcard session completion (client emit OR
server/study-plan consumers), confirm both ends agree on the object shape. Any
consumer that reads from stored breakdowns should tolerate BOTH the object
shape and legacy numeric counts (older rows/clients persist numbers). The
client builds the object shape via a `toDomainBreakdown()` helper applied on
both the normal mutation and the `sendBeacon` unload path — keep both paths
converting, not just one.
