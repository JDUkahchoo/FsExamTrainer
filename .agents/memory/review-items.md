---
name: Spaced-repetition review items
description: itemId conventions for reviewSchedule rows and how the review card / deep-linking work
---

# Review items (reviewSchedule table)

## itemId conventions (set in server/routes.ts createOrUpdateReviewItem call sites)
- lessons → itemType `lesson`, itemId `lesson:<lessonId>`
- flashcards → itemType `flashcard`, itemId is the raw `cardId`
- quiz domain reviews → itemType `concept`, itemId `quiz-domain:<domain>` (no single-item page → only a domain-level fallback exists)
- readings do NOT create review items

## Drift guard for positional cardIds
A committed checksum manifest (per-index sha1 of domain+front for each active deck list) fails CI on any insert/remove/reorder of flashcard deck data. Appending at deck END is the only safe edit; anything else requires migrating stored review ids, then regenerating the manifest via the regenerate script next to the tests. **Why:** cardIds are positional — reorders silently repoint every saved review/mastery/deep link.

## Flashcard cardId encoding
`cardId = <deckPrefix><stableIndex>` where deckPrefix is `comp-card-` (comprehensive deck) or `card-` (original deck), and stableIndex = index of the card in the FULL active deck (`activeFlashcards.indexOf(card)`), NOT the filtered/visible list. With domain `all`, filtered == active so the position equals stableIndex. Deep-linking parses this back to deck + index (see `parseCardId` in flashcards.tsx and `?card=` handling).

## Deep-linking from the dashboard review/retention buttons
`navigateToReviewItem` in exam-dashboard.tsx: lesson → `/app/<track>/lesson/<id>`, flashcard → `/app/<track>/flashcards?card=<cardId>`, everything else falls back to the domain-filtered area page.

## Weekly fresh-slate
- `/api/reviews/due` returns `{items, done, remaining, target}` (NOT an array) — only reviews that came due THIS week (Monday-local 00:00 → now). `getWeeklyReviewSlate` + `getLocalWeekStart` in storage.ts.
- **Why:** prior-week overdue items must NOT pile up in the "Optimal Review Timing" card; they're cleared from the list but their rows + retention math stay intact so the forgetting curve keeps decaying.
- `getDueReviews` (full overdue list) is intentionally left for the AI coach briefing only.
- The card's "Coming Up" list must filter to `nextReviewAt > now` or past-due leftovers leak back in via getUpcomingReviews (which includes now-24h).
