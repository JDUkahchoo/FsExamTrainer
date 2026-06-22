---
name: Exam track scoping
description: How the study-guide app isolates FS / PS / TX exam tracks across data pools and pages, and the leakage traps to avoid.
---

# Multi-exam track scoping

The app supports multiple exam tracks (`'fs' | 'ps' | 'tx'`). Adding a track touches both a skeleton layer and a content-wiring layer.

## Scoping mechanisms (they differ by data type)
- **Flashcards** and **Readings** carry an `examTrack` field and are filtered by it. New cards/readings MUST set `examTrack`.
- **Quiz questions** and **Exam questions** have NO `examTrack` field. They are scoped purely by their `domain` string matching the track's domain names (e.g. `TX_DOMAINS` in `shared/domains.ts`). Get a track's domain name list from the `useExamTrack()` context `domains` (a `DomainInfo[]` with `.name`), not from `DOMAINS` in `shared/schema.ts`.

**Why:** `DOMAINS`/`type Domain` in `shared/schema.ts` is FS+PS only. Validating anything against it silently rejects TX domain names.
**How to apply:** when filtering/validating by domain on a page that must support all tracks, validate against `examDomains` from context, never against the schema `DOMAINS` constant.

## Routes are hardcoded per track
`client/src/App.tsx` lists every route explicitly per track (`/app/fs/*`, `/app/ps/*`, `/app/tx/*`) via `withExamTrack(Component, track)`. A new track needs its full route block; there is no `:examTrack` param wildcard. A 404 in a screenshot of `/app/<track>/...` is usually just the unauthenticated public router (Landing + NotFound), not a missing route — check auth.

## Leakage traps found in practice
- **Flashcard "comprehensive" deck is FS-only** (`COMPREHENSIVE_FLASHCARDS`). The deck default and a corrective effect must force `'original'` for any non-FS track (`examTrack !== 'fs'`), covering stale persisted `deck: 'comprehensive'` from localStorage. Guarding only `=== 'ps'` leaks FS cards into other tracks.
- **Flashcard URL deep-link** (`?domains=...`) must validate against context `examDomains`, else TX/other-track domains get filtered out and prefiltering breaks.

## Combined pools
`shared/data/flashcards.ts`, `quizQuestions.ts`, `studyReadings.ts` each spread per-track arrays into one combined export consumed app-wide; per-track files (e.g. `txFlashcards.ts`, `txQuizQuestions.ts`, `txExamQuestions.ts`, `studyReadingsTx.ts`, `TX_STUDY_PLAN` in `studyPlan.ts`) hold the content.
