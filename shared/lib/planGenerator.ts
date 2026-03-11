import { STUDY_PLAN, PS_STUDY_PLAN } from '../data/studyPlan';
import { generateWeekContent, generateWeekTitle, generatePSWeekTitle } from '../data/domainContent';
import type { WeekPlan, Domain, FSDomain, PSDomain, StudyMode } from '../schema';

export interface PlanGeneratorConfig {
  examDate: Date | null;
  planType: StudyMode;
  weeklyHours: number;
  pretestScores: Record<number, number>;
  examTrack: 'fs' | 'ps';
}

export interface AdaptivePlanMeta {
  totalWeeks: number;
  examDate: Date | null;
  isAdaptive: boolean;
  weeklyHours: number;
  planType: StudyMode;
}

const FS_DOMAIN_NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7];
const PS_DOMAIN_NUMBERS = [1, 2, 3, 4, 5];

const FS_DOMAIN_LABELS: Record<number, FSDomain> = {
  0: 'Math & Basic Science',
  1: 'Field Data Acquisition',
  2: 'Mapping, GIS, and CAD',
  3: 'Boundary Law & PLSS',
  4: 'Surveying Principles',
  5: 'Survey Computations & Applications',
  6: 'Professional Practice',
  7: 'Applied Mathematics & Statistics',
};

const PS_DOMAIN_LABELS: Record<number, PSDomain> = {
  1: 'Legal Principles',
  2: 'Professional Survey Practices',
  3: 'Standards and Specifications',
  4: 'Business Practices',
  5: 'Areas of Practice',
};

function weeksBetween(from: Date, to: Date): number {
  return Math.round((to.getTime() - from.getTime()) / (7 * 24 * 60 * 60 * 1000));
}

function domainWeight(domainNum: number, pretestScores: Record<number, number>, planType: StudyMode): number {
  if (planType !== 'result-driven') return 1;
  const score = pretestScores[domainNum] ?? 50;
  if (score < 40) return 3;
  if (score < 60) return 2;
  if (score < 80) return 1.5;
  return 1;
}

function makeWeekTitle(domainNums: number[], phase: string, examTrack: 'fs' | 'ps'): string {
  if (phase === 'integration') return 'Practice Exam & Cross-Domain Integration';
  if (phase === 'sprint') return 'Final Sprint — Weak Areas & Formula Review';
  if (phase === 'review') {
    const labels = domainNums.map(n => examTrack === 'ps' ? PS_DOMAIN_LABELS[n] : FS_DOMAIN_LABELS[n]).filter(Boolean);
    return `Review: ${labels.slice(0, 2).join(' & ')}${labels.length > 2 ? ' +more' : ''}`;
  }
  return examTrack === 'ps'
    ? generatePSWeekTitle(domainNums)
    : generateWeekTitle(domainNums);
}

function makeWeekContent(domainNums: number[], phase: string, examTrack: 'fs' | 'ps') {
  if (phase === 'integration') {
    return {
      read: ['NCEES FS/PS Reference Handbook — full review', 'Personal notes from weakest domain'],
      focus: ['Timed 60-question mixed practice exam', 'Cross-domain problem identification', 'Time management strategy (1.5 min/question)'],
      apply: ['Full-length practice exam under timed conditions', 'Review every incorrect answer with explanation'],
      reinforce: ['Flashcards: lowest-retention cards from all domains', 'Formula quick-reference — every domain'],
    };
  }
  if (phase === 'sprint') {
    return {
      read: ['Formula Quick-Reference — all 65+ formulas', 'Weak-area notes from your study log'],
      focus: ['Rapid-fire formula recall', 'Common exam traps and misconceptions', 'Test-day checklist (calculator, ID, arrival time)'],
      apply: ['Weak-area 15-question focused drill', '10 timed problems from hardest domain'],
      reinforce: ['All "at-risk" flashcards from spaced repetition queue', 'Sleep, exercise, and mental preparation'],
    };
  }
  if (phase === 'review') {
    const base = generateWeekContent(domainNums, examTrack);
    return {
      read: base.read.slice(0, 2).map(r => `[Review] ${r}`),
      focus: ['Re-test yourself on key formulas from this domain', 'Identify anything that still feels uncertain'],
      apply: ['10-question targeted quiz on this domain', 'Re-work any problems you previously got wrong'],
      reinforce: base.reinforce.slice(0, 3),
    };
  }
  return generateWeekContent(domainNums, examTrack);
}

function groupSourcePlanByDomain(plan: WeekPlan[], examTrack: 'fs' | 'ps'): Map<string, WeekPlan[]> {
  const groups = new Map<string, WeekPlan[]>();
  const lastWeeks: WeekPlan[] = [];

  plan.forEach(w => {
    const title = w.title.toLowerCase();
    if (title.includes('final') || title.includes('simulation') || title.includes('exam simulation')) {
      lastWeeks.push(w);
      return;
    }
    const key = w.domains.join('|');
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(w);
  });

  if (lastWeeks.length > 0) groups.set('__final__', lastWeeks);
  return groups;
}

function mergeWeeks(weeks: WeekPlan[], targetWeekNum: number): WeekPlan {
  return {
    week: targetWeekNum,
    title: weeks.length === 1 ? weeks[0].title : `${weeks[0].title} & ${weeks[weeks.length - 1].title}`,
    domains: Array.from(new Set(weeks.flatMap(w => w.domains))),
    read: Array.from(new Set(weeks.flatMap(w => w.read))).slice(0, 4),
    focus: Array.from(new Set(weeks.flatMap(w => w.focus))).slice(0, 6),
    apply: Array.from(new Set(weeks.flatMap(w => w.apply))).slice(0, 4),
    reinforce: Array.from(new Set(weeks.flatMap(w => w.reinforce))).slice(0, 4),
  };
}

export function calcWeekHealth(
  completedAt: Date,
  lastReviewedAt: Date | null,
  reviewCount: number
): number {
  const refDate = lastReviewedAt ?? completedAt;
  const daysSince = (Date.now() - refDate.getTime()) / (1000 * 60 * 60 * 24);
  const stability = 14 * Math.pow(2, reviewCount);
  return Math.max(0, Math.round(Math.exp(-daysSince / stability) * 100));
}

export function getHealthStatus(health: number): 'fresh' | 'fading' | 'stale' {
  if (health >= 80) return 'fresh';
  if (health >= 50) return 'fading';
  return 'stale';
}

export function generateStudyPlan(config: PlanGeneratorConfig): { plan: WeekPlan[]; meta: AdaptivePlanMeta } {
  const { examDate, planType, weeklyHours, pretestScores, examTrack } = config;
  const sourcePlan = examTrack === 'ps' ? PS_STUDY_PLAN : STUDY_PLAN;
  const domainNums = examTrack === 'ps' ? PS_DOMAIN_NUMBERS : FS_DOMAIN_NUMBERS;

  if (!examDate) {
    if (planType === 'custom') {
      return {
        plan: sourcePlan,
        meta: { totalWeeks: sourcePlan.length, examDate: null, isAdaptive: false, weeklyHours, planType },
      };
    }
    return {
      plan: sourcePlan,
      meta: { totalWeeks: sourcePlan.length, examDate: null, isAdaptive: false, weeklyHours, planType },
    };
  }

  const today = new Date();
  const available = Math.max(4, weeksBetween(today, examDate));
  const defaultCount = sourcePlan.length;

  const domainGroups = groupSourcePlanByDomain(sourcePlan, examTrack);
  const finalWeeks = domainGroups.get('__final__') || [];
  domainGroups.delete('__final__');

  const contentWeeks = available - Math.min(finalWeeks.length, 2);

  const sortedGroupKeys = Array.from(domainGroups.keys()).sort((a, b) => {
    if (planType !== 'result-driven') return 0;
    const domainsA = domainGroups.get(a)![0].domains;
    const domainsB = domainGroups.get(b)![0].domains;
    const scoreA = domainsA.map(d => {
      const num = Object.entries(examTrack === 'ps' ? PS_DOMAIN_LABELS : FS_DOMAIN_LABELS).find(([, v]) => v === d)?.[0];
      return num ? (pretestScores[+num] ?? 50) : 50;
    }).reduce((s, v) => s + v, 0) / domainsA.length;
    const scoreB = domainsB.map(d => {
      const num = Object.entries(examTrack === 'ps' ? PS_DOMAIN_LABELS : FS_DOMAIN_LABELS).find(([, v]) => v === d)?.[0];
      return num ? (pretestScores[+num] ?? 50) : 50;
    }).reduce((s, v) => s + v, 0) / domainsB.length;
    return scoreA - scoreB;
  });

  const totalSourceContent = sortedGroupKeys.reduce((sum, k) => sum + domainGroups.get(k)!.length, 0);

  const plan: WeekPlan[] = [];
  let weekNum = 1;

  if (available <= Math.ceil(defaultCount * 0.6)) {
    const ratio = contentWeeks / totalSourceContent;
    let allSourceWeeks: WeekPlan[] = [];
    for (const key of sortedGroupKeys) {
      allSourceWeeks = allSourceWeeks.concat(domainGroups.get(key)!);
    }
    const chunkSize = Math.ceil(allSourceWeeks.length / contentWeeks);
    for (let i = 0; i < allSourceWeeks.length && weekNum <= contentWeeks; i += chunkSize) {
      const chunk = allSourceWeeks.slice(i, i + chunkSize);
      plan.push(mergeWeeks(chunk, weekNum));
      weekNum++;
    }
  } else if (available <= Math.ceil(defaultCount * 1.4)) {
    for (const key of sortedGroupKeys) {
      const groupWeeks = domainGroups.get(key)!;
      for (const w of groupWeeks) {
        if (weekNum > contentWeeks) break;
        plan.push({ ...w, week: weekNum });
        weekNum++;
      }
    }

    while (weekNum <= contentWeeks) {
      const weakDomains = domainNums
        .sort((a, b) => (pretestScores[a] ?? 50) - (pretestScores[b] ?? 50))
        .slice(0, 2);
      const content = makeWeekContent(weakDomains, 'review', examTrack);
      plan.push({
        week: weekNum,
        title: makeWeekTitle(weakDomains, 'review', examTrack),
        domains: weakDomains.map(n => (examTrack === 'ps' ? PS_DOMAIN_LABELS[n] : FS_DOMAIN_LABELS[n]) as Domain).filter(Boolean),
        ...content,
      });
      weekNum++;
    }
  } else {
    const weights = domainNums.map(n => ({ num: n, w: domainWeight(n, pretestScores, planType) }));
    const totalWeight = weights.reduce((s, d) => s + d.w, 0);
    const integrationWeeks = Math.max(2, Math.round(available * 0.15));
    const sprintWeeks = Math.max(1, Math.round(available * 0.07));
    const studyWeeks = available - integrationWeeks - sprintWeeks;

    const domainSlots: { num: number; count: number }[] = weights.map(({ num, w }) => ({
      num,
      count: Math.max(1, Math.round((w / totalWeight) * studyWeeks)),
    }));

    const totalSlots = domainSlots.reduce((s, d) => s + d.count, 0);
    const diff = studyWeeks - totalSlots;
    if (diff > 0 && domainSlots.length > 0) domainSlots[0].count += diff;

    if (planType === 'result-driven') {
      domainSlots.sort((a, b) => (pretestScores[a.num] ?? 50) - (pretestScores[b.num] ?? 50));
    }

    const sourceByDomainNum = new Map<number, WeekPlan[]>();
    for (const key of sortedGroupKeys) {
      const grp = domainGroups.get(key)!;
      const w0 = grp[0];
      const domainLabel = w0.domains[0];
      const num = Object.entries(examTrack === 'ps' ? PS_DOMAIN_LABELS : FS_DOMAIN_LABELS).find(([, v]) => v === domainLabel)?.[0];
      if (num) {
        sourceByDomainNum.set(+num, grp);
      }
    }

    for (const { num, count } of domainSlots) {
      const sourceWeeks = sourceByDomainNum.get(num) || [];
      for (let i = 0; i < count; i++) {
        const sourceW = sourceWeeks[i % Math.max(1, sourceWeeks.length)];
        if (i === 0 && sourceW) {
          plan.push({ ...sourceW, week: weekNum });
        } else {
          const content = i === 0
            ? makeWeekContent([num], 'study', examTrack)
            : makeWeekContent([num], 'review', examTrack);
          const phase = i === 0 ? 'study' : 'review';
          plan.push({
            week: weekNum,
            title: i === 0
              ? makeWeekTitle([num], 'study', examTrack)
              : `Deep Dive: ${examTrack === 'ps' ? PS_DOMAIN_LABELS[num] : FS_DOMAIN_LABELS[num]}`,
            domains: [(examTrack === 'ps' ? PS_DOMAIN_LABELS[num] : FS_DOMAIN_LABELS[num]) as Domain].filter(Boolean),
            ...content,
          });
        }
        weekNum++;
      }
    }

    for (let i = 0; i < integrationWeeks; i++) {
      const content = makeWeekContent(domainNums, 'integration', examTrack);
      plan.push({
        week: weekNum,
        title: i === 0 ? 'Practice Exam & Cross-Domain Integration' : `Integration Review ${i + 1}`,
        domains: [],
        ...content,
      });
      weekNum++;
    }

    for (let i = 0; i < sprintWeeks; i++) {
      const weakDomains = domainNums
        .sort((a, b) => (pretestScores[a] ?? 50) - (pretestScores[b] ?? 50))
        .slice(0, 3);
      const content = makeWeekContent(weakDomains, 'sprint', examTrack);
      plan.push({
        week: weekNum,
        title: 'Final Sprint — Weak Areas & Formula Review',
        domains: weakDomains.map(n => (examTrack === 'ps' ? PS_DOMAIN_LABELS[n] : FS_DOMAIN_LABELS[n]) as Domain).filter(Boolean),
        ...content,
      });
      weekNum++;
    }
  }

  if (finalWeeks.length > 0 && plan.length < available) {
    const finalW = finalWeeks[0];
    plan.push({ ...finalW, week: weekNum });
  } else {
    const sprint = makeWeekContent(domainNums.slice(0, 3), 'sprint', examTrack);
    plan.push({
      week: weekNum,
      title: 'Final Exam Simulation & Preparation',
      domains: [],
      ...sprint,
    });
  }

  return {
    plan,
    meta: {
      totalWeeks: plan.length,
      examDate,
      isAdaptive: true,
      weeklyHours,
      planType,
    },
  };
}
