import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  buildActiveLists,
  MANIFEST_PATH,
  type Manifest,
} from "./flashcard-id-manifest-helpers";

// ---------------------------------------------------------------------------
// Guard against silent review-id drift.
//
// Saved review items (SM-2 reviews, mastery records, deep links) encode a
// flashcard as <deckPrefix><index> into the deck's ACTIVE list:
//   comp-card-<n> → COMPREHENSIVE_FLASHCARDS[n]
//   card-<n>      → FLASHCARDS filtered to (!examTrack || examTrack === track)
// If cards are inserted, removed, or reordered in shared/data, every stored id
// silently repoints to a different card. This test snapshots a per-index
// checksum of each active list so any such drift fails CI loudly and ids can
// be migrated deliberately.
//
// If this test fails because you INTENTIONALLY changed deck data:
//   1. Understand that existing saved reviews reference cards by position.
//      Appending new cards at the END of a deck is always safe. Inserting,
//      removing, or reordering cards shifts every id after the change point —
//      stored reviews must be migrated (or accepted as repointed) first.
//   2. Regenerate the manifest:
//        npx tsx server/__tests__/regenerate-flashcard-manifest.ts
//   3. Commit the updated flashcard-id-manifest.json alongside the data change.
// ---------------------------------------------------------------------------

test("flashcard deck order matches the committed id manifest (no silent review-id drift)", () => {
  let manifest: Manifest;
  try {
    manifest = JSON.parse(readFileSync(MANIFEST_PATH, "utf8"));
  } catch {
    assert.fail(
      `Missing or unreadable ${MANIFEST_PATH}. Regenerate it with:\n` +
        `  npx tsx server/__tests__/regenerate-flashcard-manifest.ts`,
    );
  }

  const current = buildActiveLists();

  // Every list we know about must be present in the manifest, and vice versa.
  assert.deepEqual(
    Object.keys(current).sort(),
    Object.keys(manifest).sort(),
    "deck/track list keys changed — regenerate the manifest (see header comment) " +
      "and audit stored review ids for the added/removed list",
  );

  for (const [key, expected] of Object.entries(manifest)) {
    const actual = current[key];
    const shared = Math.min(expected.length, actual.length);
    let firstDrift = -1;
    for (let i = 0; i < shared; i++) {
      if (expected[i] !== actual[i]) {
        firstDrift = i;
        break;
      }
    }

    if (firstDrift >= 0) {
      assert.fail(
        `Deck "${key}" drifted at index ${firstDrift}: the card at that position changed.\n` +
          `Every saved review id "${key === "comprehensive" ? "comp-card-" : "card-"}${firstDrift}" ` +
          `and beyond now points at a DIFFERENT card.\n` +
          `If this reorder/insert/removal is intentional, migrate stored review ids first, then\n` +
          `regenerate the manifest: npx tsx server/__tests__/regenerate-flashcard-manifest.ts`,
      );
    }

    if (actual.length < expected.length) {
      assert.fail(
        `Deck "${key}" shrank from ${expected.length} to ${actual.length} cards.\n` +
          `Saved review ids for the removed tail now point at nothing (or will repoint if cards\n` +
          `are re-added). Migrate/clean up stored review ids, then regenerate the manifest.`,
      );
    }

    // Growth at the end is safe: existing indices are untouched. Still require
    // a manifest refresh so the snapshot stays current.
    if (actual.length > expected.length) {
      assert.fail(
        `Deck "${key}" grew from ${expected.length} to ${actual.length} cards (appended at the end).\n` +
          `Existing review ids are safe, but the manifest is stale. Regenerate it:\n` +
          `  npx tsx server/__tests__/regenerate-flashcard-manifest.ts`,
      );
    }
  }
});
