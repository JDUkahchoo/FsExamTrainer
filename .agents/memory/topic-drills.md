---
name: Topic worked-solution drills
description: How the configurable per-topic computation drill works and its question-filtering constraints
---

# Topic worked-solution drills

A single configurable drill renders any computation topic tagged via `QuizQuestion.topic`. Each topic is a config entry in a central drill-topics registry (id/slug, topic string, domain, examTracks, nav label, icon, copy). The generic route is `/app/:track/topic-drill/:topicId`; the legacy `/app/fs/state-plane-drill` route is kept as a backward-compatible alias and renders the same component.

**Filter by `topic` ONLY, not `topic` + `domain`.**
**Why:** A single topic can span multiple domains — e.g. Photogrammetry questions live in both "Survey Computations & Applications" and "Mapping, GIS, and CAD". Filtering on a single domain silently drops the off-domain questions (would lose 5 of 12 photogrammetry questions). Topic tags exist only in the FS pool (PS/TX pools have no `topic` tags), so topic-only filtering is still exam-track-safe.
**How to apply:** When adding a new drill topic, just tag questions with `topic` and add a registry entry. The config's `domain` is only the label used for the per-session save (`/api/quiz/sessions`); per-question results still record each question's own domain.

To add a topic to the nav for a track, set its `examTracks` in the registry — the sidebar builds drill items from the registry filtered by current track.

Registry entries may set an optional `readingId` pointing at a reading module id; when present, the drill component renders "review the reading" links (intro card, per-question solution card, results screen) to `/app/:track/readings/:readingId`. Keep the reading id track-prefixed (`fs-*`) and matching an existing module in the combined readings list.
