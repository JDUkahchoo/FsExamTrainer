// Stable content identity for study-plan weeks.
//
// week_progress and week_memory_health rows historically pointed at an absolute week
// number, but a plan resize (e.g. moving the exam date) reshuffles which topics land in
// which week number. A domain key identifies a week by WHAT it covers instead of WHERE
// it sits: the sorted set of domain names plus an occurrence index (the same domain set
// can appear multiple times in long plans, e.g. the 24-month pathway or review weeks).
//
// Keys are computed client-side from the currently generated plan and stored alongside
// progress rows, so that after a resize each row can be re-attached to whichever week
// now covers the same content.

export interface WeekLike {
  week: number;
  domains: readonly string[];
}

/** Normalized identity of a week's domain set (order-independent). */
export function domainSetKey(domains: readonly string[]): string {
  const cleaned = (domains || []).map(d => String(d).trim()).filter(Boolean).sort();
  return cleaned.length > 0 ? cleaned.join('|') : '~generic';
}

/**
 * Compute a stable domain key for every week in a plan.
 * Key format: `<sorted domains joined by |>#<occurrence>` where occurrence counts
 * repeats of the same domain set in ascending week order (1-based).
 */
export function computeWeekKeys(weeks: readonly WeekLike[]): Map<number, string> {
  const sorted = [...weeks].sort((a, b) => a.week - b.week);
  const occurrence = new Map<string, number>();
  const result = new Map<number, string>();
  for (const w of sorted) {
    const setKey = domainSetKey(w.domains);
    const n = (occurrence.get(setKey) || 0) + 1;
    occurrence.set(setKey, n);
    result.set(w.week, `${setKey}#${n}`);
  }
  return result;
}

/** Compare two domain lists as sets (normalized). */
export function sameDomainSet(a: readonly string[], b: readonly string[]): boolean {
  return domainSetKey(a) === domainSetKey(b);
}
