import { NCEES_DOMAINS, getAllDomains, type DomainNumber } from "@shared/domains";
import type { StudyMode, WeekPlan } from "@shared/schema";

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
 * Custom Mode: User creates their own plan with week-by-week domain assignments
 * Distributes lessons based on manual week-to-domain mappings
 */
export function getCustomModeWeeklyLessons(
  allLessons: Lesson[],
  weeklyDomainAssignments?: Record<string, number[]>, // e.g., { "1": [1, 2], "2": [3, 5], "3": [1, 4] }
  timeline: number = 12 // Number of weeks (8-16)
): Map<number, Lesson[]> {
  const weeklyLessons = new Map<number, Lesson[]>();
  
  // Initialize weeks based on timeline
  for (let week = 1; week <= timeline; week++) {
    weeklyLessons.set(week, []);
  }
  
  // If no assignments specified, return empty plan
  if (!weeklyDomainAssignments || Object.keys(weeklyDomainAssignments).length === 0) {
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
  
  // Sort lessons by difficulty within each domain (easy first)
  const difficultyOrder = { easy: 1, medium: 2, hard: 3 };
  lessonsByDomain.forEach((lessons) => {
    lessons.sort((a, b) => {
      const diffA = difficultyOrder[a.difficulty];
      const diffB = difficultyOrder[b.difficulty];
      if (diffA !== diffB) return diffA - diffB;
      return a.title.localeCompare(b.title);
    });
  });
  
  // First, build a map of which weeks each domain is assigned to
  const domainToWeeks = new Map<number, number[]>();
  for (let week = 1; week <= timeline; week++) {
    const weekKey = week.toString();
    const assignedDomains = weeklyDomainAssignments[weekKey] || [];
    
    for (const domainNum of assignedDomains) {
      if (!domainToWeeks.has(domainNum)) {
        domainToWeeks.set(domainNum, []);
      }
      domainToWeeks.get(domainNum)!.push(week);
    }
  }
  
  // Now distribute each domain's lessons across all weeks that selected it
  // Only lessons for explicitly selected domains will be included in the plan
  domainToWeeks.forEach((weeks, domainNum) => {
    const domainLessons = lessonsByDomain.get(domainNum) || [];
    
    // Round-robin distribute lessons across the weeks that want this domain
    domainLessons.forEach((lesson, lessonIndex) => {
      const targetWeek = weeks[lessonIndex % weeks.length];
      weeklyLessons.get(targetWeek)!.push(lesson);
    });
  });
  
  return weeklyLessons;
}

/**
 * Get weekly lessons based on study mode
 */
export function getWeeklyLessonsByMode(
  mode: StudyMode,
  allLessons: Lesson[],
  domainScores?: DomainScore[],
  customWeeklyDomains?: Record<string, number[]>, // For custom mode: week-to-domains mapping, e.g., { "1": [1, 2], "2": [3, 5] }
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
      return getCustomModeWeeklyLessons(allLessons, customWeeklyDomains, customTimeline);
    
    default:
      return getStandardModeWeeklyLessons(allLessons);
  }
}

/**
 * Generate dynamic week plans with READ/FOCUS/APPLY/REINFORCE content based on custom domain selections
 */
export function generateCustomWeekPlans(
  customWeeklyDomains: Record<string, number[]>,
  customTimeline: number
): WeekPlan[] {
  const weekPlans: WeekPlan[] = [];
  
  // Import domain content generation functions
  const { generateWeekTitle, generateWeekContent } = require('@shared/data/domainContent');
  const { getDomainName } = require('@shared/domains');
  
  for (let week = 1; week <= customTimeline; week++) {
    const weekKey = week.toString();
    const domainNumbers = customWeeklyDomains[weekKey] || [];
    
    // Skip weeks with no domain assignments
    if (domainNumbers.length === 0) continue;
    
    // Generate content based on selected domains
    const content = generateWeekContent(domainNumbers);
    const title = generateWeekTitle(domainNumbers);
    
    // Map domain numbers to domain names for the WeekPlan structure
    const domains = domainNumbers.map(num => getDomainName(num as any));
    
    weekPlans.push({
      week,
      title,
      domains: domains as any[],
      read: content.read,
      focus: content.focus,
      apply: content.apply,
      reinforce: content.reinforce
    });
  }
  
  return weekPlans;
}
