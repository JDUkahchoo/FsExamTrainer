// FS → PS carry-over steering.
//
// When a user finishes the FS track (or simply has meaningful FS history) and
// moves on to the PS exam, we can use their FS domain mastery as a stand-in
// for a PS pretest: PS domains that build on weak FS areas get prioritized in
// the recommended plan ordering, exactly the way pretest scores already do.

// PS domain number → FS domain numbers it builds on.
// FS domains: 0 Math & Basic Science, 1 Field Data Acquisition,
// 2 Mapping/GIS/CAD, 3 Boundary Law & PLSS, 4 Surveying Principles,
// 5 Survey Computations & Applications, 6 Professional Practice,
// 7 Applied Mathematics & Statistics.
// PS domains: 1 Legal Principles, 2 Professional Survey Practices,
// 3 Standards and Specifications, 4 Business Practices, 5 Areas of Practice.
export const FS_TO_PS_DOMAIN_MAP: Record<number, number[]> = {
  1: [3, 6],       // Legal Principles ← Boundary Law & PLSS, Professional Practice
  2: [1, 4, 5],    // Professional Survey Practices ← Field Data, Principles, Computations
  3: [2, 4],       // Standards & Specifications ← Mapping/GIS/CAD, Surveying Principles
  4: [6],          // Business Practices ← Professional Practice
  5: [1, 2, 3],    // Areas of Practice ← Field Data, Mapping, Boundary Law
};

export interface FsDomainMasteryLike {
  domainNumber: number;
  currentScore: number;
  questionsAnswered: number;
  lessonsCompleted: number;
  overallProgress: number;
}

/**
 * Returns true when the FS mastery rows show real study activity —
 * enough signal to steer a PS plan. A fresh PS-only user has none.
 */
export function hasFsHistory(fsMastery: FsDomainMasteryLike[]): boolean {
  return fsMastery.some(
    (d) => d.questionsAnswered > 0 || d.lessonsCompleted > 0 || d.overallProgress > 0
  );
}

/**
 * Converts FS domain mastery into pseudo pretest scores for PS domains
 * (0–100, lower = weaker = prioritized earlier by the plan generator).
 *
 * Each PS domain's score is the average `currentScore` of the FS domains it
 * builds on, considering only FS domains with actual activity. PS domains
 * whose mapped FS domains have no data are omitted, so the generator falls
 * back to its neutral default (50) for them.
 */
export function computeFsCarryoverScores(
  fsMastery: FsDomainMasteryLike[]
): Record<number, number> {
  const activeScores = new Map<number, number>();
  for (const d of fsMastery) {
    if (d.questionsAnswered > 0 || d.lessonsCompleted > 0 || d.overallProgress > 0) {
      activeScores.set(d.domainNumber, d.currentScore);
    }
  }

  const carryover: Record<number, number> = {};
  for (const [psDomain, fsDomains] of Object.entries(FS_TO_PS_DOMAIN_MAP)) {
    const scores = fsDomains
      .filter((n) => activeScores.has(n))
      .map((n) => activeScores.get(n)!);
    if (scores.length > 0) {
      const avg = scores.reduce((s, v) => s + v, 0) / scores.length;
      carryover[Number(psDomain)] = Math.round(Math.max(0, Math.min(100, avg)));
    }
  }
  return carryover;
}
