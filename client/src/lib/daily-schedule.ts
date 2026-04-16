export type ScheduleItem =
  | { type: 'interactive'; id: string; title: string; estimatedMinutes: number; chapterIndex: number }
  | { type: 'chapter'; text: string; chapterIndex: number };

export type DaySchedule = {
  dayNumber: number;
  items: ScheduleItem[];
};

/**
 * Compute the number of active study days per week based on:
 * 1. Plan position (weekNumber relative to totalWeeks) — last weeks are sprint weeks
 * 2. Exam date proximity
 * 3. Default of 5 days
 */
export function computeDaysPerWeek(
  examDate?: Date | string | null,
  weekNumber?: number,
  totalWeeks?: number
): number {
  // Plan-position compression: last 1 week = 7 days, approaching final = 6 days
  if (weekNumber && totalWeeks) {
    const weeksRemaining = totalWeeks - weekNumber;
    if (weeksRemaining <= 0) return 7;
    if (weeksRemaining <= 2) return 6;
  }

  // Exam-date compression
  if (examDate) {
    const now = new Date();
    const exam = new Date(examDate);
    const daysRemaining = Math.ceil((exam.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    if (daysRemaining <= 21) return 7;
    if (daysRemaining <= 56) return 6;
  }

  return 5;
}

/**
 * Distribute reading items across day buckets.
 * Interactive readings are placed first (earlier days), chapters follow.
 * chapterIndex for interactive items = chaptersLength + their index in the week's reading list.
 */
export function computeDailySchedule(
  interactiveItems: { id: string; title: string; estimatedMinutes: number }[],
  chapters: string[],
  daysPerWeek: number,
  chaptersOffset: number
): DaySchedule[] {
  const allItems: ScheduleItem[] = [
    ...interactiveItems.map((r, i) => ({
      type: 'interactive' as const,
      id: r.id,
      title: r.title,
      estimatedMinutes: r.estimatedMinutes,
      chapterIndex: chaptersOffset + i,
    })),
    ...chapters.map((text, i) => ({
      type: 'chapter' as const,
      text,
      chapterIndex: i,
    })),
  ];

  if (allItems.length === 0) return [];

  // Small workloads (1–2 items) stay in a single day regardless of daysPerWeek
  const activeDays = allItems.length <= 2 ? 1 : Math.min(daysPerWeek, allItems.length);
  const days: DaySchedule[] = [];
  const baseCount = Math.floor(allItems.length / activeDays);
  const extra = allItems.length % activeDays;

  let idx = 0;
  for (let d = 0; d < activeDays; d++) {
    const count = baseCount + (d < extra ? 1 : 0);
    days.push({ dayNumber: d + 1, items: allItems.slice(idx, idx + count) });
    idx += count;
  }

  return days;
}
