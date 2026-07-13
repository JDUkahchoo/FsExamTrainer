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

## Per-track streaks: every daily-activity write needs an explicit track
`logDailyActivity(userId, type, examTrack?)` falls back to `preferredExamTrack` when no track is passed. That fallback is wrong for streak attribution because the active request track can differ from the user's preferred track.
**Why:** streaks/daily activity are stored per `(userId, date, examTrack)`; an unscoped write credits the wrong track and corrupts the per-track streak.
**How to apply:** at EVERY `logDailyActivity` call site resolve the track from the request/owning record (route `examTrack`, `lesson.examTrack`, or the review session's `examTrack`) and pass it explicitly — never rely on the preference fallback for streak-sensitive endpoints.

## Flashcard mastery upsert must key on (userId, flashcardId, examTrack)
`card-N` flashcard ids are positional within the track-FILTERED card array, so the same `card-N` refers to different cards in FS vs PS — ids are NOT globally unique.
**Why:** upserting mastery by `(userId, flashcardId)` alone collides FS/PS rows and overwrites the wrong card's mastery.
**How to apply:** resolve existing mastery rows via `getFlashcardMastery(userId, flashcardId, examTrack)` and always persist `examTrack`. TX/FS share the FS quiz domain set (no `TX_DOMAINS`), so `tx` resolving to `FS_DOMAINS` for quiz-result filtering is intentional, not leakage.

## Plan settings live per track in exam_track_settings
Plan fields (examDate, studyMode, customWeeklyDomains, customTimeline, weeklyHoursGoal, baseDaysPerWeek) live in `exam_track_settings` keyed `(userId, examTrack)`; account-wide fields (timezone, preferredExamTrack, stateCode, reminders, onboarding flags, currentCycle) stay on `user_preferences`, whose legacy plan columns are FROZEN (kept only as the one-time migration source — do not read or write them for plan logic).
**Why:** a single shared examDate/studyMode leaked FS settings into PS/TX views.
**How to apply:** read merged prefs via `GET /api/preferences/:track` (client queryKey `['/api/preferences', examTrack]`); PATCH/PUT plan fields must include `examTrack` in the body or they land on the preferred track. Server-side plan logic must read `storage.getExamTrackSettings(userId, examTrack)` (legacy prefs only as fallback). Migration is lazy: first preferences read/write seeds legacy plan columns into the preferred track when the user has zero track rows.

## /api/progress/analytics is NOT exam-track scoped
`getPersonalAnalytics(userId)` (storage.ts) takes no examTrack and loads ALL of a user's quiz/exam data across tracks; the route `/api/progress/analytics` passes no track. `PersonalAnalyticsDashboard` consumes it unscoped (pre-existing).
**How to apply:** For any per-track Progress visualization, derive from already-track-scoped endpoints (`/api/quiz/sessions?examTrack=`, `/api/exams?examTrack=`) — e.g. the study-activity heatmap builds its day×hour matrix client-side from those props — instead of `/api/progress/analytics`, or FS data leaks into the PS view.
