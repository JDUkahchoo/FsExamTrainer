import { NCEES_DOMAINS, getAllDomains, type DomainNumber } from "@shared/domains";
import type { StudyMode } from "@shared/schema";

// Lesson type matching backend
interface Lesson {
  id: string;
  domainNumber: number;
  domain: string;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  suggestedWeek: number | null;
  estimatedMinutes: number;
}

// Pretest result for domain scoring
interface DomainScore {
  domainNumber: number;
  correct: number;
  total: number;
  percentage: number;
}

/**
 * Standard Mode: Distributes all 7 domains evenly across 16 weeks
 * Uses suggestedWeek from lessons as baseline
 */
export function getStandardModeWeeklyLessons(allLessons: Lesson[]): Map<number, Lesson[]> {
  const weeklyLessons = new Map<number, Lesson[]>();
  
  // Initialize all 16 weeks
  for (let week = 1; week <= 16; week++) {
    weeklyLessons.set(week, []);
  }
  
  // Distribute lessons based on suggestedWeek
  for (const lesson of allLessons) {
    const week = lesson.suggestedWeek || 1; // Default to week 1 if null
    const clampedWeek = Math.max(1, Math.min(16, week)); // Ensure 1-16
    weeklyLessons.get(clampedWeek)!.push(lesson);
  }
  
  // Sort lessons within each week by difficulty (easy first)
  const difficultyOrder = { easy: 1, medium: 2, hard: 3 };
  weeklyLessons.forEach((lessons) => {
    lessons.sort((a, b) => {
      const diffA = difficultyOrder[a.difficulty];
      const diffB = difficultyOrder[b.difficulty];
      if (diffA !== diffB) return diffA - diffB;
      return a.title.localeCompare(b.title);
    });
  });
  
  return weeklyLessons;
}

/**
 * Result-Driven Mode: Prioritizes domains where user scored poorly on pretest
 * Places difficult domain lessons earlier in the study plan
 */
export function getResultDrivenModeWeeklyLessons(
  allLessons: Lesson[],
  domainScores: DomainScore[]
): Map<number, Lesson[]> {
  const weeklyLessons = new Map<number, Lesson[]>();
  
  // Initialize all 16 weeks
  for (let week = 1; week <= 16; week++) {
    weeklyLessons.set(week, []);
  }
  
  // Calculate domain priorities (lower score = higher priority)
  const domainPriorities = new Map<number, number>();
  domainScores.forEach((score) => {
    domainPriorities.set(score.domainNumber, score.percentage);
  });
  
  // Group lessons by domain
  const lessonsByDomain = new Map<number, Lesson[]>();
  allLessons.forEach((lesson) => {
    if (!lessonsByDomain.has(lesson.domainNumber)) {
      lessonsByDomain.set(lesson.domainNumber, []);
    }
    lessonsByDomain.get(lesson.domainNumber)!.push(lesson);
  });
  
  // Sort domains by priority (weak domains first)
  const sortedDomains = Array.from(lessonsByDomain.keys()).sort((a, b) => {
    const scoreA = domainPriorities.get(a) ?? 50; // Default to 50% if no score
    const scoreB = domainPriorities.get(b) ?? 50;
    return scoreA - scoreB; // Lower score first
  });
  
  // Distribute lessons across 16 weeks, prioritizing weak domains
  let currentWeek = 1;
  const lessonsPerWeek = Math.ceil(allLessons.length / 16);
  
  for (const domainNum of sortedDomains) {
    const domainLessons = lessonsByDomain.get(domainNum)!;
    
    // Sort by difficulty (easy first to build confidence)
    const difficultyOrder = { easy: 1, medium: 2, hard: 3 };
    domainLessons.sort((a, b) => {
      const diffA = difficultyOrder[a.difficulty];
      const diffB = difficultyOrder[b.difficulty];
      if (diffA !== diffB) return diffA - diffB;
      return a.title.localeCompare(b.title);
    });
    
    // Distribute this domain's lessons across available weeks
    for (const lesson of domainLessons) {
      weeklyLessons.get(currentWeek)!.push(lesson);
      
      // Move to next week if current week is full
      if (weeklyLessons.get(currentWeek)!.length >= lessonsPerWeek) {
        currentWeek = Math.min(16, currentWeek + 1);
      }
    }
  }
  
  return weeklyLessons;
}

/**
 * Custom Mode: User creates their own plan based on manual domain priorities
 * Distributes lessons based on prioritized domains (similar to Result-Driven but user-specified)
 */
export function getCustomModeWeeklyLessons(
  allLessons: Lesson[],
  priorityDomains?: number[], // Array of domain numbers in priority order, e.g., [3, 5, 4, 1] means focus on domains 3,5,4,1
  timeline: number = 12 // Number of weeks (8-16)
): Map<number, Lesson[]> {
  const weeklyLessons = new Map<number, Lesson[]>();
  
  // Initialize weeks based on timeline
  for (let week = 1; week <= timeline; week++) {
    weeklyLessons.set(week, []);
  }
  
  // If no priorities specified, return empty plan (user manually adds lessons)
  if (!priorityDomains || priorityDomains.length === 0) {
    return weeklyLessons;
  }
  
  // Group lessons by domain
  const lessonsByDomain = new Map<number, Lesson[]>();
  allLessons.forEach((lesson) => {
    if (!lessonsByDomain.has(lesson.domainNumber)) {
      lessonsByDomain.set(lesson.domainNumber, []);
    }
    lessonsByDomain.get(lesson.domainNumber)!.push(lesson);
  });
  
  // Organize domains: priority domains first, then others
  const prioritySet = new Set(priorityDomains);
  const otherDomains = Array.from(lessonsByDomain.keys()).filter(d => !prioritySet.has(d));
  const orderedDomains = [...priorityDomains, ...otherDomains];
  
  // Distribute lessons across weeks
  let currentWeek = 1;
  const lessonsPerWeek = Math.ceil(allLessons.length / timeline);
  
  for (const domainNum of orderedDomains) {
    const domainLessons = lessonsByDomain.get(domainNum);
    if (!domainLessons) continue;
    
    // Sort by difficulty (easy first)
    const difficultyOrder = { easy: 1, medium: 2, hard: 3 };
    domainLessons.sort((a, b) => {
      const diffA = difficultyOrder[a.difficulty];
      const diffB = difficultyOrder[b.difficulty];
      if (diffA !== diffB) return diffA - diffB;
      return a.title.localeCompare(b.title);
    });
    
    // Distribute this domain's lessons across available weeks
    for (const lesson of domainLessons) {
      weeklyLessons.get(currentWeek)!.push(lesson);
      
      // Move to next week if current week is full
      if (weeklyLessons.get(currentWeek)!.length >= lessonsPerWeek) {
        currentWeek = Math.min(timeline, currentWeek + 1);
      }
    }
  }
  
  return weeklyLessons;
}

/**
 * Get weekly lessons based on study mode
 */
export function getWeeklyLessonsByMode(
  mode: StudyMode,
  allLessons: Lesson[],
  domainScores?: DomainScore[],
  customPriorities?: number[], // For custom mode: array of domain numbers in priority order
  customTimeline?: number // For custom mode: number of weeks (8-16)
): Map<number, Lesson[]> {
  switch (mode) {
    case 'standard':
      return getStandardModeWeeklyLessons(allLessons);
    
    case 'result-driven':
      if (!domainScores || domainScores.length === 0) {
        // Fall back to standard mode if no pretest scores available
        return getStandardModeWeeklyLessons(allLessons);
      }
      return getResultDrivenModeWeeklyLessons(allLessons, domainScores);
    
    case 'custom':
      return getCustomModeWeeklyLessons(allLessons, customPriorities, customTimeline);
    
    default:
      return getStandardModeWeeklyLessons(allLessons);
  }
}
