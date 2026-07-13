import { test } from "node:test";
import assert from "node:assert/strict";
import {
  buildCardId,
  parseCardId,
  resolveDeepLinkPosition,
  type FlashcardDeck,
} from "../../client/src/lib/flashcard-deeplink";
import { FLASHCARDS } from "../../shared/data/flashcards";
import { COMPREHENSIVE_FLASHCARDS } from "../../shared/data/flashcardsComprehensive";

// Mirror the page's active-list construction (flashcards.tsx):
// - comprehensive deck uses the full comprehensive list
// - original deck is filtered to cards without an examTrack or matching it
function activeCardsFor(deck: FlashcardDeck, examTrack: string) {
  if (deck === "comprehensive") return COMPREHENSIVE_FLASHCARDS;
  return FLASHCARDS.filter((c) => !c.examTrack || c.examTrack === examTrack);
}

// ---------------------------------------------------------------------------
// parseCardId / buildCardId round-trips
// ---------------------------------------------------------------------------

test("parseCardId round-trips buildCardId for both deck prefixes", () => {
  const decks: FlashcardDeck[] = ["original", "comprehensive"];
  for (const deck of decks) {
    for (const index of [0, 1, 7, 42, 490]) {
      const id = buildCardId(deck, index);
      const parsed = parseCardId(id);
      assert.ok(parsed, `expected ${id} to parse`);
      assert.equal(parsed.deck, deck, `deck for ${id}`);
      assert.equal(parsed.index, index, `index for ${id}`);
    }
  }
});

test("parseCardId maps prefixes to the right deck", () => {
  assert.deepEqual(parseCardId("comp-card-42"), { deck: "comprehensive", index: 42 });
  assert.deepEqual(parseCardId("card-7"), { deck: "original", index: 7 });
});

test("parseCardId rejects ids that don't round-trip", () => {
  const badIds = [
    "", // empty
    "lesson:abc", // different itemId family
    "quiz-domain:Geodesy", // different itemId family
    "card-", // missing index
    "comp-card-", // missing index
    "card-abc", // non-numeric
    "card--1", // negative
    "comp-card-1.5", // non-integer
    "card-3x", // trailing junk
    "CARD-3", // wrong case
    "xcard-3", // wrong prefix
  ];
  for (const id of badIds) {
    assert.equal(parseCardId(id), null, `expected ${JSON.stringify(id)} to be rejected`);
  }
});

// ---------------------------------------------------------------------------
// Deep-link positioning — both decks, real card data
// ---------------------------------------------------------------------------

test("positions to the exact card in the comprehensive deck (unfiltered)", () => {
  const active = activeCardsFor("comprehensive", "fs");
  assert.ok(active.length > 50, "comprehensive deck should have cards");
  for (const index of [0, 5, active.length - 1]) {
    const res = resolveDeepLinkPosition(buildCardId("comprehensive", index), "comprehensive", active, active);
    assert.equal(res.status, "positioned");
    assert.equal(res.targetIndex, index);
  }
});

test("positions to the exact card in the original deck (unfiltered, FS-filtered active list)", () => {
  const active = activeCardsFor("original", "fs");
  assert.ok(active.length > 10, "original FS deck should have cards");
  for (const index of [0, 3, active.length - 1]) {
    const res = resolveDeepLinkPosition(buildCardId("original", index), "original", active, active);
    assert.equal(res.status, "positioned");
    assert.equal(res.targetIndex, index);
  }
});

test("positions correctly when a domain filter reorders the visible list", () => {
  const active = activeCardsFor("comprehensive", "fs");
  // Pick a real domain and a card inside it that is not the domain's first card.
  const domain = active[10].domain;
  const filtered = active.filter((c) => c.domain === domain);
  assert.ok(filtered.length >= 2, "need at least two cards in the chosen domain");
  const targetCard = filtered[filtered.length - 1];
  const stableIndex = active.indexOf(targetCard);
  const res = resolveDeepLinkPosition(buildCardId("comprehensive", stableIndex), "comprehensive", active, filtered);
  assert.equal(res.status, "positioned");
  assert.equal(res.targetIndex, filtered.length - 1);
  assert.equal(filtered[res.targetIndex], targetCard, "must land on the exact card");
});

// ---------------------------------------------------------------------------
// Graceful fallbacks — never a wrong card, always index 0 + explicit status
// ---------------------------------------------------------------------------

test("falls back to first card when the id is unparseable (and stops retrying)", () => {
  const active = activeCardsFor("comprehensive", "fs");
  const res = resolveDeepLinkPosition("not-a-card-id", "comprehensive", active, active);
  assert.equal(res.status, "invalid");
  assert.equal(res.targetIndex, 0);
});

test("falls back to first card when the index is out of range (stays pending)", () => {
  const active = activeCardsFor("comprehensive", "fs");
  const res = resolveDeepLinkPosition(
    buildCardId("comprehensive", active.length + 1000),
    "comprehensive",
    active,
    active,
  );
  assert.equal(res.status, "unresolved");
  assert.equal(res.targetIndex, 0);
});

test("stays pending on deck mismatch so a deck switch can retry", () => {
  // The page's deep-link effect switches selectedDeck to the parsed deck; until
  // that state lands, resolution must not clear the pending id or move the index.
  const active = activeCardsFor("original", "fs");
  const res = resolveDeepLinkPosition(buildCardId("comprehensive", 3), "original", active, active);
  assert.equal(res.status, "unresolved");
  assert.equal(res.targetIndex, 0);

  // After the deck switch takes effect the same id resolves.
  const compActive = activeCardsFor("comprehensive", "fs");
  const retry = resolveDeepLinkPosition(buildCardId("comprehensive", 3), "comprehensive", compActive, compActive);
  assert.equal(retry.status, "positioned");
  assert.equal(retry.targetIndex, 3);
});

test("stays pending when the target card is filtered out of view", () => {
  const active = activeCardsFor("comprehensive", "fs");
  const domain = active[0].domain;
  const otherCardIndex = active.findIndex((c) => c.domain !== domain);
  assert.ok(otherCardIndex >= 0, "deck should span multiple domains");
  const filtered = active.filter((c) => c.domain === domain);
  const res = resolveDeepLinkPosition(buildCardId("comprehensive", otherCardIndex), "comprehensive", active, filtered);
  assert.equal(res.status, "unresolved");
  assert.equal(res.targetIndex, 0);
});
