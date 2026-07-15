// Shared helpers for the flashcard review-id drift guard.
//
// Saved review items encode a flashcard as <deckPrefix><index> into the
// deck's ACTIVE list (see client/src/pages/flashcards.tsx):
//   comp-card-<n> → COMPREHENSIVE_FLASHCARDS[n]
//   card-<n>      → FLASHCARDS filtered to (!examTrack || examTrack === track)
// These helpers snapshot a per-index checksum of each active list so a
// committed manifest can detect any insert/remove/reorder of deck data.
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { FLASHCARDS } from "../../shared/data/flashcards";
import { COMPREHENSIVE_FLASHCARDS } from "../../shared/data/flashcardsComprehensive";

export type Manifest = Record<string, string[]>;

export const MANIFEST_PATH = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "flashcard-id-manifest.json",
);

export function cardFingerprint(card: { domain: string; front: string }): string {
  return createHash("sha1")
    .update(`${card.domain}\u0000${card.front}`)
    .digest("hex")
    .slice(0, 12);
}

// Mirrors the active-list construction in client/src/pages/flashcards.tsx.
export function buildActiveLists(): Manifest {
  const lists: Manifest = {
    comprehensive: COMPREHENSIVE_FLASHCARDS.map(cardFingerprint),
  };
  const tracks = new Set<string>(
    FLASHCARDS.map((c) => c.examTrack).filter((t): t is string => !!t),
  );
  for (const track of Array.from(tracks).sort()) {
    lists[`original:${track}`] = FLASHCARDS.filter(
      (c) => !c.examTrack || c.examTrack === track,
    ).map(cardFingerprint);
  }
  return lists;
}
