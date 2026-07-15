// Regenerates flashcard-id-manifest.json — the checksum snapshot that guards
// saved review ids against silent deck reordering.
//
// ONLY run this after confirming that any insert/remove/reorder of flashcard
// data has been accounted for (stored review ids migrated or accepted).
// Appending cards at the end of a deck is always safe.
//
// Usage: npx tsx server/__tests__/regenerate-flashcard-manifest.ts
import { writeFileSync } from "node:fs";
import { buildActiveLists, MANIFEST_PATH } from "./flashcard-id-manifest-helpers";

const lists = buildActiveLists();
writeFileSync(MANIFEST_PATH, JSON.stringify(lists, null, 2) + "\n");

for (const [key, hashes] of Object.entries(lists)) {
  console.log(`${key}: ${hashes.length} cards`);
}
console.log(`Wrote ${MANIFEST_PATH}`);
