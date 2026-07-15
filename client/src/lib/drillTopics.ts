import { Ruler, Plane, Spline, Compass, type LucideIcon } from 'lucide-react';

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
  /** Study reading module this drill links back to (route: /app/:track/readings/:readingId). */
  readingId?: string;
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
    readingId: 'fs-d7-state-plane',
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
    readingId: 'fs-d2-photogrammetry',
  },
  {
    id: 'curves',
    topic: 'Curves',
    domain: 'Survey Computations & Applications',
    examTracks: ['fs'],
    navLabel: 'Curves Drill',
    icon: Spline,
    title: 'Curve Computation Drill',
    badgeLabel: 'Curves',
    description:
      'A focused workout on horizontal and vertical curve problems — radius from degree of curve, tangent distance, curve length, external distance, middle ordinate, long chord, and vertical curve elevations — with the full worked solution shown after every answer.',
    skillFallback: 'Other curve computations',
    keepDrillingHint: 'curve elements (T, L, E, M, LC) and vertical curve elevations',
    readingId: 'fs-d3-curves-comp',
  },
  {
    id: 'cogo',
    topic: 'COGO',
    domain: 'Survey Computations & Applications',
    examTracks: ['fs'],
    navLabel: 'COGO Drill',
    icon: Compass,
    title: 'COGO Computation Drill',
    badgeLabel: 'COGO',
    description:
      'A focused workout on coordinate geometry problems — inverses (distance and direction from coordinates), forward/radiation computations, bearing-bearing intersections, area by coordinates, and coordinate transformations — with the full worked solution shown after every answer.',
    skillFallback: 'Other COGO computations',
    keepDrillingHint: 'inverses, radiation, intersections, and area by coordinates',
    readingId: 'fs-d3-cogo-comp',
  },
];

export function getDrillTopic(id: string | undefined): DrillTopic | undefined {
  if (!id) return undefined;
  return DRILL_TOPICS.find((t) => t.id === id);
}

export function getDrillTopicsForTrack(track: string): DrillTopic[] {
  return DRILL_TOPICS.filter((t) => t.examTracks.includes(track as DrillExamTrack));
}
