import { Ruler, Plane, type LucideIcon } from 'lucide-react';

export type DrillExamTrack = 'fs' | 'ps' | 'tx';

export interface DrillTopic {
  /** URL slug + question-id prefix (e.g. "state-plane"). */
  id: string;
  /** Must match `QuizQuestion.topic` exactly. */
  topic: string;
  /** Domain the tagged questions belong to (used for session/result saves). */
  domain: string;
  /** Which exam tracks expose this drill. */
  examTracks: DrillExamTrack[];
  /** Sidebar label. */
  navLabel: string;
  /** Icon for nav + drill pages. */
  icon: LucideIcon;
  /** Heading shown on intro/active/results. */
  title: string;
  /** Short badge label shown during the active drill. */
  badgeLabel: string;
  /** Intro paragraph describing what the drill covers. */
  description: string;
  /** Fallback grouping label for questions without a `skill`. */
  skillFallback: string;
  /** Short hint listing the computations to keep practicing (low-score badge). */
  keepDrillingHint: string;
}

export const DRILL_TOPICS: DrillTopic[] = [
  {
    id: 'state-plane',
    topic: 'State Plane',
    domain: 'Applied Mathematics & Statistics',
    examTracks: ['fs'],
    navLabel: 'State Plane Drill',
    icon: Ruler,
    title: 'State Plane Computation Drill',
    badgeLabel: 'State Plane',
    description:
      'A focused workout on the numeric State Plane problems — combined factor (CF = SF × EF), elevation factor, and grid-to-ground conversions — with the full worked solution shown after every answer.',
    skillFallback: 'Other State Plane computations',
    keepDrillingHint: 'CF, EF, and grid-to-ground',
  },
  {
    id: 'photogrammetry',
    topic: 'Photogrammetry',
    domain: 'Survey Computations & Applications',
    examTracks: ['fs'],
    navLabel: 'Photogrammetry Drill',
    icon: Plane,
    title: 'Photogrammetry Computation Drill',
    badgeLabel: 'Photogrammetry',
    description:
      'A focused workout on the numeric photogrammetry problems — photo scale (S = f/(H−h)), relief displacement (d = rh/H), and flight planning — with the full worked solution shown after every answer.',
    skillFallback: 'Other photogrammetry computations',
    keepDrillingHint: 'photo scale, relief displacement, and flight planning',
  },
];

export function getDrillTopic(id: string | undefined): DrillTopic | undefined {
  if (!id) return undefined;
  return DRILL_TOPICS.find((t) => t.id === id);
}

export function getDrillTopicsForTrack(track: string): DrillTopic[] {
  return DRILL_TOPICS.filter((t) => t.examTracks.includes(track as DrillExamTrack));
}
