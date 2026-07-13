// Pure helpers for the flashcard deep-link (?card=<cardId>) flow.
//
// A review itemId encodes the deck plus a stable index into that deck's
// active card list: "comp-card-<n>" for the comprehensive deck and
// "card-<n>" for the original (exam-filtered) deck. These helpers are kept
// free of app imports so they can be unit-tested directly.

export type FlashcardDeck = 'original' | 'comprehensive';

const DECK_PREFIXES: Record<FlashcardDeck, string> = {
  comprehensive: 'comp-card-',
  original: 'card-',
};

// Build the stable cardId for a card at `index` within a deck's active list.
export function buildCardId(deck: FlashcardDeck, index: number): string {
  return `${DECK_PREFIXES[deck]}${index}`;
}

// Parse a review itemId (e.g. "comp-card-42" / "card-7") back to its deck +
// index. Returns null for anything that can't round-trip through buildCardId
// (unknown prefix, non-numeric or negative index, trailing junk).
export function parseCardId(cardId: string): { deck: FlashcardDeck; index: number } | null {
  // Check the comprehensive prefix first: "comp-card-" would otherwise never
  // match if "card-" were tested with a looser rule.
  for (const deck of ['comprehensive', 'original'] as const) {
    const prefix = DECK_PREFIXES[deck];
    if (cardId.startsWith(prefix)) {
      const raw = cardId.slice(prefix.length);
      if (!/^\d+$/.test(raw)) return null;
      const n = parseInt(raw, 10);
      return Number.isNaN(n) ? null : { deck, index: n };
    }
  }
  return null;
}

export type DeepLinkResolution = {
  // Index into filteredCards to position the viewer at (0 on any fallback).
  targetIndex: number;
  // 'positioned': found the exact card — clear the pending deep-link.
  // 'invalid': the id can't be parsed — clear the pending deep-link, land on 0.
  // 'unresolved': valid id but not locatable in the current deck/filter state
  //               (deck mismatch, out-of-range index, filtered out) — keep the
  //               deep-link pending so a later deck/filter change can retry.
  status: 'positioned' | 'invalid' | 'unresolved';
};

// Given the pending deep-linked cardId and the current deck state, work out
// where to position the card viewer. `activeFlashcards` is the deck's full
// active list (the list the cardId's index refers to); `filteredCards` is the
// currently displayed subset of it.
export function resolveDeepLinkPosition<T>(
  cardId: string,
  selectedDeck: FlashcardDeck,
  activeFlashcards: readonly T[],
  filteredCards: readonly T[],
): DeepLinkResolution {
  const parsed = parseCardId(cardId);
  if (!parsed) {
    return { targetIndex: 0, status: 'invalid' };
  }
  if (parsed.deck !== selectedDeck) {
    return { targetIndex: 0, status: 'unresolved' };
  }
  const card = activeFlashcards[parsed.index];
  const pos = card !== undefined ? filteredCards.indexOf(card) : -1;
  if (pos >= 0) {
    return { targetIndex: pos, status: 'positioned' };
  }
  return { targetIndex: 0, status: 'unresolved' };
}
