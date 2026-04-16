import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { Dumbbell, ChevronDown, Timer, Play, CheckCircle2, Star, Clock, MapPin, Calculator, Loader2, Zap } from 'lucide-react';
import type { ApplyChallengeAttempt } from '@shared/schema';
import { XP_AWARDS } from '@shared/schema';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';

interface ApplyScenarioLabProps {
  week: number;
  domains?: string[];
  colorClass?: string;
  examTrack?: string;
  checklistItems?: string[];
  completedSet?: Set<string>;
  autoSet?: Set<string>;
  onToggle?: (index: number) => void;
  onChallengeComplete?: () => void;
}

interface FieldProblem {
  id: string;
  scenario: string;
  question: string;
  solution: string;
  rubric: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  domain: string;
  timeLimit: number;
}

const ALL_PROBLEMS: FieldProblem[] = [
  // ── Math & Basic Science ──────────────────────────────────────────────────
  {
    id: 'fp-mbs-1',
    scenario: 'A field crew measured a distance of 1,842.60 ft using a steel tape. The temperature during measurement was 95°F. The standard calibration temperature is 68°F and the coefficient of thermal expansion for steel is 0.00000645/°F.',
    question: 'What is the temperature correction to apply, and what is the corrected distance?',
    solution: 'ΔT = 95 - 68 = 27°F\nCorrection = 0.00000645 × 27 × 1842.60 = +0.321 ft\nCorrected distance = 1,842.60 + 0.321 = 1,842.921 ft',
    rubric: ['Calculated temperature difference correctly', 'Applied coefficient correctly', 'Multiplied by the measured distance', 'Added correction (positive because tape expanded)'],
    difficulty: 'medium',
    domain: 'Math & Basic Science',
    timeLimit: 150
  },
  {
    id: 'fp-mbs-2',
    scenario: 'You have measured the same distance three times: 356.24, 356.31, and 356.18 ft.',
    question: 'Calculate the mean distance and the standard deviation of the measurements. What does the standard deviation tell you about measurement reliability?',
    solution: 'Mean = (356.24 + 356.31 + 356.18) / 3 = 356.243 ft\nDeviations: -0.003, +0.067, -0.063\nVariance = (0.003² + 0.067² + 0.063²) / (3-1) = (0.000009 + 0.004489 + 0.003969) / 2 = 0.004234\nSD = √0.004234 = 0.065 ft\nA smaller SD indicates higher precision.',
    rubric: ['Computed the mean correctly', 'Calculated deviations from mean', 'Applied (n-1) denominator for sample SD', 'Interpreted SD in context of precision'],
    difficulty: 'medium',
    domain: 'Math & Basic Science',
    timeLimit: 180
  },
  {
    id: 'fp-mbs-3',
    scenario: 'You need to convert a slope measurement to a horizontal distance.',
    question: 'A total station measures a slope distance of 482.60 ft at a vertical angle of +3°24\'00". Calculate the horizontal distance and the difference in elevation.',
    solution: 'Horizontal distance = 482.60 × cos(3°24\') = 482.60 × 0.998238 = 481.75 ft\nVertical distance = 482.60 × sin(3°24\') = 482.60 × 0.059391 = 28.66 ft',
    rubric: ['Converted DMS to decimal degrees correctly', 'Used cosine for horizontal distance', 'Used sine for vertical distance', 'Rounded to appropriate precision'],
    difficulty: 'easy',
    domain: 'Math & Basic Science',
    timeLimit: 120
  },
  // ── Field Data Acquisition ────────────────────────────────────────────────
  {
    id: 'fp-fda-1',
    scenario: 'You are establishing a new control point and need to verify the elevation using differential leveling.',
    question: 'Starting from BM "Alpha" (Elev. 512.45 ft), you take a backsight reading of 4.32 ft. After moving the rod to the unknown point, the foresight reading is 2.18 ft. What is the elevation of the new point?',
    solution: 'HI = BM Elev + BS = 512.45 + 4.32 = 516.77 ft\nNew Point Elev = HI - FS = 516.77 - 2.18 = 514.59 ft',
    rubric: ['Correctly added BS to BM elevation', 'Properly calculated Height of Instrument', 'Subtracted FS from HI correctly', 'Final answer is accurate'],
    difficulty: 'easy',
    domain: 'Field Data Acquisition',
    timeLimit: 90
  },
  {
    id: 'fp-fda-2',
    scenario: 'You are running a level loop from BM-1, through BM-2, BM-3, and back to BM-1.',
    question: 'Your field notes show the following HI/FS summations: ΣBS = 42.810 ft and ΣFS = 42.743 ft. BM-1 elevation is 100.000 ft. What is the loop misclosure, and is it within an allowable error of 0.05√K ft (where K is the distance in miles, estimated at 1.5 miles)?',
    solution: 'Misclosure = ΣBS - ΣFS = 42.810 - 42.743 = +0.067 ft\nAllowable error = 0.05 × √1.5 = 0.05 × 1.225 = 0.061 ft\n0.067 > 0.061 — the loop FAILS the tolerance and must be re-run.',
    rubric: ['Correctly computed misclosure as ΣBS - ΣFS', 'Applied the allowable error formula', 'Compared misclosure to allowable limit', 'Stated correct pass/fail conclusion'],
    difficulty: 'medium',
    domain: 'Field Data Acquisition',
    timeLimit: 150
  },
  {
    id: 'fp-fda-3',
    scenario: 'During GNSS observations, you review your post-processing OPUS report.',
    question: 'The report shows a horizontal precision of 0.015 m and a vertical precision of 0.042 m. The PDOP at the time of observation was 3.8. Are these results acceptable for second-order horizontal control? (Second-order requires horizontal uncertainty ≤ 0.020 m and PDOP ≤ 4.0)',
    solution: 'Horizontal precision 0.015 m ≤ 0.020 m — PASSES\nPDOP 3.8 ≤ 4.0 — PASSES\nVertical precision 0.042 m — acceptable for second-order vertical as well.\nConclusion: Results meet second-order horizontal control requirements.',
    rubric: ['Evaluated horizontal precision against threshold', 'Evaluated PDOP against limit', 'Identified vertical precision separately', 'Stated overall acceptance conclusion'],
    difficulty: 'medium',
    domain: 'Field Data Acquisition',
    timeLimit: 120
  },
  // ── Mapping, GIS, and CAD ─────────────────────────────────────────────────
  {
    id: 'fp-gis-1',
    scenario: 'You are planning an aerial photogrammetry mission to produce a map at a scale of 1:2400.',
    question: 'The camera has a focal length of 6 inches (0.5 ft). What flying height above ground is required to achieve the desired map scale?',
    solution: 'Scale = f / H\n1/2400 = 0.5 / H\nH = 0.5 × 2400 = 1,200 ft above ground level',
    rubric: ['Set up scale equation correctly', 'Substituted focal length in consistent units', 'Solved for flying height', 'Stated units (ft AGL)'],
    difficulty: 'easy',
    domain: 'Mapping, GIS, and CAD',
    timeLimit: 90
  },
  {
    id: 'fp-gis-2',
    scenario: 'A building 80 ft tall appears on an aerial photograph taken at a flying height of 3,200 ft above the base of the building. The building top is located 2.4 inches from the principal point.',
    question: 'Calculate the relief displacement of the building top on the photograph.',
    solution: 'Relief displacement d = (h × r) / H\nd = (80 × 2.4) / 3200 = 192 / 3200 = 0.060 inches',
    rubric: ['Identified the correct relief displacement formula', 'Substituted values correctly', 'Calculated numerator (h × r)', 'Divided by flying height to get displacement'],
    difficulty: 'medium',
    domain: 'Mapping, GIS, and CAD',
    timeLimit: 120
  },
  {
    id: 'fp-gis-3',
    scenario: 'You are creating a topographic map and need to interpolate a contour line between two spot elevations.',
    question: 'Point A (elevation 423.6 ft) and Point B (elevation 436.2 ft) are 80 ft apart on the ground. Where along the line A-B does the 430-ft contour cross? (Measure from A.)',
    solution: 'Elevation difference = 436.2 - 423.6 = 12.6 ft\nElevation needed above A = 430.0 - 423.6 = 6.4 ft\nDistance = (6.4 / 12.6) × 80 = 0.5079 × 80 = 40.6 ft from A',
    rubric: ['Computed total elevation difference', 'Computed partial elevation needed from A', 'Applied linear interpolation ratio', 'Multiplied ratio by distance to get position'],
    difficulty: 'easy',
    domain: 'Mapping, GIS, and CAD',
    timeLimit: 120
  },
  // ── Boundary Law & PLSS ───────────────────────────────────────────────────
  {
    id: 'fp-bl-1',
    scenario: 'You are retracing an old deed that contains conflicting calls. The deed calls for a line to run "N 45°00\'00" E, 330 feet to a found iron pin." The computed position from prior calls places the pin 18 feet north of where you found it.',
    question: 'Applying standard rules for resolving conflicting deed calls, which call controls — distance or monument — and how would you proceed?',
    solution: 'Under the hierarchy of conflicting deed calls, senior rights then calls for monuments take precedence over calls for distance. The found iron pin (monument) controls over the stated distance of 330 ft. The retracement line should terminate at the found monument, and the discrepancy of 18 ft is noted in the survey report as the distance error.',
    rubric: ['Stated the controlling priority (monument over distance)', 'Applied the correct hierarchy rule', 'Identified the found pin as the controlling monument', 'Noted documentation of the discrepancy'],
    difficulty: 'medium',
    domain: 'Boundary Law & PLSS',
    timeLimit: 150
  },
  {
    id: 'fp-bl-2',
    scenario: 'A PLSS legal description reads: "The NE¼ of the SW¼ of Section 14, T3N, R2W."',
    question: 'Calculate the theoretical acreage of this parcel and describe its location within the section.',
    solution: 'A quarter-section = 160 acres\nThe SW¼ = 160 acres\nThe NE¼ of the SW¼ = 160 / 4 = 40 acres\nLocation: This parcel occupies the northeast quarter of the southwest quarter of Section 14. It is centrally located in the section, bounded on the north by the SW¼-NW¼, on the east by the SE¼-SW¼ and NW¼-SE¼ corner.',
    rubric: ['Correctly identified two levels of quarter subdivision', 'Calculated 40 acres correctly', 'Described the interior location in the section', 'Noted the adjoining parcels or relative position'],
    difficulty: 'easy',
    domain: 'Boundary Law & PLSS',
    timeLimit: 120
  },
  {
    id: 'fp-bl-3',
    scenario: 'A client\'s property is adjacent to a non-navigable stream. The stream channel has gradually shifted 25 feet toward the client\'s land over 30 years, adding new dry land.',
    question: 'Does the client own the newly formed land? Identify the applicable riparian doctrine and explain.',
    solution: 'Yes. The new land was formed by accretion (gradual, imperceptible deposit of sediment). Under the doctrine of accretion, the riparian owner (owner of land adjacent to the water) acquires title to the gradually added land. The boundary moves with the gradual change in the thread or bank. If the change had been sudden and perceptible (avulsion), the boundary would NOT move and the original channel location would remain the boundary.',
    rubric: ['Identified the process as accretion (not avulsion)', 'Applied the correct riparian doctrine', 'Stated that the client acquires the new land', 'Contrasted with avulsion where boundary does not move'],
    difficulty: 'hard',
    domain: 'Boundary Law & PLSS',
    timeLimit: 180
  },
  // ── Surveying Principles ──────────────────────────────────────────────────
  {
    id: 'fp-sp-1',
    scenario: 'You have run a closed traverse with five sides. The interior angles measured are: 105°12\'30", 87°43\'10", 132°08\'50", 98°55\'20", and 116°02\'45".',
    question: 'What is the angular misclosure of the traverse, and what is the allowable precision for a 5-sided traverse?',
    solution: 'Sum of interior angles for a polygon = (n-2) × 180° = (5-2) × 180° = 540°00\'00"\nMeasured sum = 105°12\'30" + 87°43\'10" + 132°08\'50" + 98°55\'20" + 116°02\'45" = 540°02\'35"\nMisclosure = 540°02\'35" - 540°00\'00" = +02\'35" (155 seconds)\nTypical allowable = 1\' per station × √n = 1\' × √5 = 2\'14" (134"). This exceeds the limit — re-measurement is needed.',
    rubric: ['Calculated required sum (n-2)×180', 'Summed measured angles correctly', 'Computed misclosure', 'Compared to allowable precision limit'],
    difficulty: 'medium',
    domain: 'Surveying Principles',
    timeLimit: 180
  },
  {
    id: 'fp-sp-2',
    scenario: 'A simple horizontal curve connects two tangents that deflect 24°30\'00" (the central angle Δ = 24°30\').',
    question: 'For a curve with a radius of 800 ft, calculate the tangent length (T), arc length (L), and the chord length (C).',
    solution: 'T = R × tan(Δ/2) = 800 × tan(12°15\') = 800 × 0.21728 = 173.82 ft\nL = R × Δ (in radians) = 800 × (24.5 × π/180) = 800 × 0.42761 = 342.09 ft\nC = 2R × sin(Δ/2) = 2 × 800 × sin(12°15\') = 1600 × 0.21218 = 339.49 ft',
    rubric: ['Used correct T = R·tan(Δ/2) formula', 'Converted Δ to radians for arc length', 'Used C = 2R·sin(Δ/2) for chord', 'Rounded to hundredths'],
    difficulty: 'medium',
    domain: 'Surveying Principles',
    timeLimit: 180
  },
  {
    id: 'fp-sp-3',
    scenario: 'A vertical curve connects a +2.5% grade to a -1.0% grade. The length of the curve is 400 ft and the PVI is at station 25+00 with an elevation of 152.40 ft.',
    question: 'Calculate the elevation of the PVC, the PVT, and locate the high point of the curve.',
    solution: 'g1 = +2.5%, g2 = -1.0%, L = 400 ft (4 stations)\nPVC station = 25+00 - 200 ft = 23+00; PVC elev = 152.40 - 2.5% × 200 = 152.40 - 5.00 = 147.40 ft\nPVT station = 25+00 + 200 ft = 27+00; PVT elev = 152.40 - 1.0% × 200 = 152.40 - 2.00 = 150.40 ft\nHigh point: x = -g1 × L / (g2 - g1) = -2.5 × 400 / (-1.0 - 2.5) = 1000 / 3.5 = 285.7 ft from PVC\nHigh point station = 23+00 + 285.7 = 25+85.7',
    rubric: ['Located PVC and PVT correctly', 'Computed PVC and PVT elevations', 'Applied high-point formula x = -g1·L/(g2-g1)', 'Computed high-point station from PVC'],
    difficulty: 'hard',
    domain: 'Surveying Principles',
    timeLimit: 210
  },
  // ── Survey Computations & Applications ───────────────────────────────────
  {
    id: 'fp-sca-1',
    scenario: 'You are surveying a rectangular lot for a residential property. The client needs the total area calculated for a building permit application.',
    question: 'A rectangular lot measures 125.50 feet along the front and 200.25 feet along the side. Calculate the area in square feet and convert to acres (1 acre = 43,560 sq ft).',
    solution: 'Area = 125.50 × 200.25 = 25,131.375 sq ft\nAcres = 25,131.375 ÷ 43,560 = 0.577 acres',
    rubric: ['Correctly multiplied length × width', 'Used proper units (sq ft)', 'Converted to acres accurately', 'Showed work clearly'],
    difficulty: 'easy',
    domain: 'Survey Computations & Applications',
    timeLimit: 120
  },
  {
    id: 'fp-sca-2',
    scenario: 'During a boundary survey, you need to calculate the bearing from one monument to another using coordinate data.',
    question: 'Point A has coordinates N 1250.00, E 500.00. Point B has coordinates N 1375.50, E 625.75. Calculate the bearing from A to B.',
    solution: 'ΔN = 1375.50 - 1250.00 = 125.50\nΔE = 625.75 - 500.00 = 125.75\ntan(bearing) = ΔE/ΔN = 125.75/125.50 = 1.00199\nBearing angle = arctan(1.00199) = 45.06°\nBearing = N 45°03\'36" E',
    rubric: ['Correctly calculated ΔN and ΔE', 'Applied correct tangent formula', 'Converted to degrees-minutes-seconds', 'Identified correct quadrant bearing'],
    difficulty: 'medium',
    domain: 'Survey Computations & Applications',
    timeLimit: 180
  },
  {
    id: 'fp-sca-3',
    scenario: 'A closed traverse has the following coordinate departures and latitudes after adjustment: A(0,0), B(320.0, 140.0), C(420.0, -80.0), D(100.0, -200.0).',
    question: 'Calculate the area enclosed by the traverse using the coordinate (shoelace) method.',
    solution: 'Area = ½ |Σ(xᵢ × yᵢ₊₁ - xᵢ₊₁ × yᵢ)|\n= ½ |(0×140-320×0) + (320×(-80)-420×140) + (420×(-200)-100×(-80)) + (100×0-0×(-200))|\n= ½ |(0) + (-25600-58800) + (-84000+8000) + (0)|\n= ½ |-160400| = 80,200 sq ft = 1.841 acres',
    rubric: ['Set up shoelace formula correctly', 'Computed each cross-product term', 'Summed and took absolute value', 'Divided by 2 and converted to acres'],
    difficulty: 'hard',
    domain: 'Survey Computations & Applications',
    timeLimit: 210
  },
  // ── Professional Practice ─────────────────────────────────────────────────
  {
    id: 'fp-pp-1',
    scenario: 'A licensed surveyor stamps and signs a plat prepared by a technician. Later it is discovered that a boundary line on the plat is incorrectly located by 35 feet due to an error in the field data the technician provided.',
    question: 'Who bears professional and legal responsibility for the error? What standard of care applies?',
    solution: 'The licensed surveyor bears full professional and legal responsibility. By signing and sealing the plat, the surveyor certified it as their professional work product. The standard of care requires a surveyor to exercise the degree of care, skill, and judgment ordinarily exercised by competent surveyors in the same locality. Reliance on a technician does not transfer responsibility — the surveyor must review and verify all work before certification.',
    rubric: ['Identified the licensed surveyor as responsible', 'Explained that signing/sealing transfers responsibility', 'Defined the standard of care correctly', 'Noted that delegation does not excuse the sealing surveyor'],
    difficulty: 'medium',
    domain: 'Professional Practice',
    timeLimit: 150
  },
  {
    id: 'fp-pp-2',
    scenario: 'A client asks you to locate a fence line as the boundary, ignoring an older original monument that does not match the fence.',
    question: 'What are your professional obligations? How should you handle this ethically and legally?',
    solution: 'A surveyor\'s duty is to locate the legal boundary, not the fence. The surveyor must: (1) inform the client that the fence and legal boundary are different; (2) locate the boundary based on original monuments and legal record evidence; (3) not misrepresent the boundary location to suit the client\'s preference. Knowingly portraying the fence as the legal boundary would constitute professional misconduct and potential fraud. If the client insists, the surveyor should withdraw from the project.',
    rubric: ['Distinguished between fence and legal boundary', 'Identified duty to locate legal boundary from records and monuments', 'Noted obligation to inform the client of the discrepancy', 'Stated that complying with the client\'s request would be misconduct'],
    difficulty: 'hard',
    domain: 'Professional Practice',
    timeLimit: 180
  },
  // ── Applied Mathematics & Statistics ──────────────────────────────────────
  {
    id: 'fp-ams-1',
    scenario: 'You have measured an angle four times: 47°12\'08", 47°12\'14", 47°12\'10", 47°12\'12".',
    question: 'Calculate the most probable value (mean), the standard deviation of a single observation, and the standard error of the mean.',
    solution: 'Mean = (8+14+10+12) / 4 = 44/4 = 11 → 47°12\'11"\nDeviations: -3, +3, -1, +1 (in arc-seconds)\nVariance = (9+9+1+1)/(4-1) = 20/3 = 6.667\nSD (single obs) = √6.667 = 2.58 arc-sec\nSE of mean = SD / √n = 2.58 / √4 = 1.29 arc-sec',
    rubric: ['Computed mean correctly', 'Used (n-1) for sample variance', 'Computed SD of a single observation', 'Divided SD by √n for standard error of the mean'],
    difficulty: 'medium',
    domain: 'Applied Mathematics & Statistics',
    timeLimit: 180
  },
  {
    id: 'fp-ams-2',
    scenario: 'A distance is computed as the sum of two independently measured segments: d₁ = 342.15 ± 0.03 ft and d₂ = 218.70 ± 0.04 ft.',
    question: 'What is the total distance and its propagated standard error?',
    solution: 'Total distance = 342.15 + 218.70 = 560.85 ft\nPropagated error = √(0.03² + 0.04²) = √(0.0009 + 0.0016) = √0.0025 = 0.05 ft\nResult: 560.85 ± 0.05 ft',
    rubric: ['Added distances correctly', 'Applied error propagation formula for sums', 'Summed variances (squares of errors)', 'Took square root of summed variances'],
    difficulty: 'easy',
    domain: 'Applied Mathematics & Statistics',
    timeLimit: 120
  }
];

export function ApplyScenarioLab({ week, domains, colorClass = "text-primary", examTrack = "fs", checklistItems = [], completedSet = new Set(), autoSet = new Set(), onToggle, onChallengeComplete }: ApplyScenarioLabProps) {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  // Filter problems to those matching this week's domains; fall back to all if no match
  const SAMPLE_PROBLEMS: FieldProblem[] = (() => {
    if (!domains || domains.length === 0) return ALL_PROBLEMS;
    const filtered = ALL_PROBLEMS.filter(p => domains.includes(p.domain));
    return filtered.length > 0 ? filtered : ALL_PROBLEMS;
  })();
  const [activeChallenge, setActiveChallenge] = useState<FieldProblem | null>(null);
  const [activeAttemptId, setActiveAttemptId] = useState<string | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [selfGrade, setSelfGrade] = useState<number[]>([]);
  const [startTime, setStartTime] = useState<Date | null>(null);

  const { data: attempts = [], isLoading } = useQuery<ApplyChallengeAttempt[]>({
    queryKey: ['/api/apply/attempts', week, examTrack],
    queryFn: async () => {
      const res = await fetch(`/api/apply/attempts?week=${week}&examTrack=${examTrack}`);
      if (!res.ok) throw new Error("Failed to fetch attempts");
      return res.json();
    },
  });

  const createAttemptMutation = useMutation({
    mutationFn: async (data: { week: number; challengeId: string; challengeType: string; examTrack: string }) => {
      const response = await apiRequest('POST', '/api/apply/attempts', data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/apply/attempts', week, examTrack] });
      queryClient.invalidateQueries({ queryKey: ['/api/apply/attempts', examTrack] });
      queryClient.invalidateQueries({ queryKey: ['/api/progress/overall', examTrack] });
      queryClient.invalidateQueries({ queryKey: ['/api/progress/domain-mastery'] });
    },
  });

  const updateAttemptMutation = useMutation({
    mutationFn: async ({ id, ...data }: { id: string; elapsedSeconds?: number; selfGrade?: number; maxGrade?: number; userAnswer?: string }) => {
      const response = await apiRequest('PATCH', `/api/apply/attempts/${id}`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/apply/attempts', week, examTrack] });
      queryClient.invalidateQueries({ queryKey: ['/api/apply/attempts', examTrack] });
    },
  });

  const questProgressMutation = useMutation({
    mutationFn: (data: { questType: string; increment: number; examTrack: string; pillar: string }) =>
      apiRequest('POST', '/api/daily-quests/progress', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ predicate: (query) =>
        Array.isArray(query.queryKey) && query.queryKey[0] === '/api/daily-quests'
      });
    }
  });

  const awardXpMutation = useMutation({
    mutationFn: async (data: { amount: number; reason: string; activityKey: string }) => {
      const res = await apiRequest('POST', '/api/xp/award', data);
      return res.json() as Promise<{ xp: number; level: number; leveledUp: boolean; awarded: boolean; reason: string }>;
    },
    onSuccess: (data) => {
      if (data.awarded) {
        queryClient.invalidateQueries({ queryKey: ['/api/xp'] });
      }
    },
  });

  const completedChallengeIds = attempts
    .filter(a => a.completedAt !== null)
    .map(a => a.challengeId);

  const startChallenge = useCallback(async (problem: FieldProblem) => {
    setActiveChallenge(problem);
    setTimeRemaining(problem.timeLimit);
    setIsTimerActive(true);
    setShowSolution(false);
    setUserAnswer('');
    setSelfGrade([]);
    setStartTime(new Date());

    try {
      const data = await createAttemptMutation.mutateAsync({
        week,
        challengeId: problem.id,
        challengeType: 'field_problem',
        examTrack,
      });
      setActiveAttemptId(data.id);
    } catch (error) {
      console.error('Failed to create attempt:', error);
    }
  }, [week, createAttemptMutation]);

  const stopTimer = useCallback(() => {
    setIsTimerActive(false);
  }, []);

  const revealSolution = useCallback(() => {
    stopTimer();
    setShowSolution(true);
  }, [stopTimer]);

  const toggleRubricItem = useCallback((index: number) => {
    setSelfGrade(prev => {
      if (prev.includes(index)) {
        return prev.filter(i => i !== index);
      }
      return [...prev, index];
    });
  }, []);

  const submitSelfGrade = useCallback(async () => {
    if (activeChallenge && activeAttemptId && startTime) {
      const elapsedSeconds = Math.floor((new Date().getTime() - startTime.getTime()) / 1000);
      
      try {
        await updateAttemptMutation.mutateAsync({
          id: activeAttemptId,
          elapsedSeconds,
          selfGrade: selfGrade.length,
          maxGrade: activeChallenge.rubric.length,
          userAnswer,
        });
        
        // Count as a quiz completion for the daily quest (apply pillar)
        questProgressMutation.mutate({
          questType: 'complete_quiz',
          increment: 1,
          examTrack,
          pillar: 'apply',
        });

        // Award XP with backend idempotency (activity key prevents duplicate awards)
        awardXpMutation.mutate({ 
          amount: XP_AWARDS.APPLY_CHALLENGE, 
          reason: 'Scenario challenge completed',
          activityKey: `apply:challenge:${activeChallenge.id}`
        }, {
          onSuccess: (data) => {
            if (data.awarded) {
              toast({ 
                title: `+${XP_AWARDS.APPLY_CHALLENGE} XP`, 
                description: "Challenge graded!" 
              });
            }
          }
        });

        onChallengeComplete?.();
      } catch (error) {
        console.error('Failed to update attempt:', error);
      }

      setActiveChallenge(null);
      setActiveAttemptId(null);
      setShowSolution(false);
      setUserAnswer('');
      setSelfGrade([]);
      setStartTime(null);
    }
  }, [activeChallenge, activeAttemptId, startTime, selfGrade, userAnswer, updateAttemptMutation, questProgressMutation, awardXpMutation, toast, examTrack, onChallengeComplete]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setIsTimerActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timeRemaining]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500/20 text-green-600 dark:text-green-400';
      case 'medium': return 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400';
      case 'hard': return 'bg-red-500/20 text-red-600 dark:text-red-400';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const completedCount = completedChallengeIds.length;

  return (
    <>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <Card className="border-l-4 border-l-emerald-500">
          <CollapsibleTrigger asChild>
            <CardHeader className="flex flex-row items-center justify-between gap-2 cursor-pointer hover-elevate pb-2">
              <div className="flex items-center gap-2">
                <Dumbbell className={`w-5 h-5 ${colorClass}`} />
                <CardTitle className="text-base font-semibold">APPLY Scenario Lab</CardTitle>
              </div>
              <div className="flex items-center gap-2">
                {completedCount > 0 && (
                  <Badge variant="secondary" className="gap-1">
                    <CheckCircle2 className="w-3 h-3 text-green-500" />
                    {completedCount}/{SAMPLE_PROBLEMS.length}
                  </Badge>
                )}
                <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </div>
            </CardHeader>
          </CollapsibleTrigger>

          <CollapsibleContent>
            <CardContent className="space-y-4">
              <div className="text-sm text-muted-foreground">
                Practice real-world surveying scenarios with timed challenges. Work through the problem, then self-grade your solution.
              </div>

              {isLoading ? (
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-emerald-500" />
                      Field Problems
                    </h4>
                    <div className="space-y-2">
                      {SAMPLE_PROBLEMS.map((problem) => {
                        const isCompleted = completedChallengeIds.includes(problem.id);
                        const attemptData = attempts.find(a => a.challengeId === problem.id && a.completedAt);
                        return (
                          <div
                            key={problem.id}
                            data-testid={`field-problem-${problem.id}`}
                            className={`flex items-center justify-between p-3 rounded-md border ${
                              isCompleted 
                                ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800' 
                                : 'bg-muted/30 border-border'
                            }`}
                          >
                            <div className="flex-1 mr-4">
                              <div className="flex items-center gap-2 mb-1">
                                <Badge variant="outline" className={`text-xs ${getDifficultyColor(problem.difficulty)}`}>
                                  {problem.difficulty}
                                </Badge>
                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {formatTime(problem.timeLimit)}
                                </span>
                                {attemptData && (
                                  <span className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                                    <Star className="w-3 h-3 fill-current" />
                                    {attemptData.selfGrade}/{attemptData.maxGrade}
                                  </span>
                                )}
                              </div>
                              <p className="text-sm line-clamp-2">{problem.scenario}</p>
                            </div>
                            <Button
                              size="sm"
                              variant={isCompleted ? "outline" : "default"}
                              onClick={() => startChallenge(problem)}
                              disabled={createAttemptMutation.isPending}
                              data-testid={`button-start-problem-${problem.id}`}
                            >
                              {createAttemptMutation.isPending ? (
                                <Loader2 className="w-3 h-3 animate-spin" />
                              ) : isCompleted ? (
                                <>
                                  <Play className="w-3 h-3 mr-1" />
                                  Retry
                                </>
                              ) : (
                                <>
                                  <Play className="w-3 h-3 mr-1" />
                                  Start
                                </>
                              )}
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {completedCount > 0 && (
                    <div className="pt-2">
                      <Progress 
                        value={(completedCount / SAMPLE_PROBLEMS.length) * 100} 
                        className="h-2"
                      />
                      <p className="text-xs text-muted-foreground mt-1 text-center">
                        {completedCount} of {SAMPLE_PROBLEMS.length} challenges completed
                      </p>
                    </div>
                  )}
                </>
              )}

              {checklistItems.length > 0 && (
                <div className="pt-3 border-t border-border/50 mt-2">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Apply Tasks</p>
                    <Badge variant="secondary" className="text-xs">
                      {checklistItems.filter((_, i) => completedSet.has(`apply-${i}`) || autoSet.has(`apply-${i}`)).length}/{checklistItems.length}
                    </Badge>
                  </div>
                  <div className="space-y-1.5">
                    {checklistItems.map((item, i) => {
                      const key = `apply-${i}`;
                      const isAuto = autoSet.has(key);
                      const isDone = completedSet.has(key) || isAuto;
                      return (
                        <div key={key} className="flex items-start gap-2">
                          <Checkbox
                            checked={isDone}
                            onCheckedChange={() => onToggle?.(i)}
                            disabled={isAuto}
                            className="mt-0.5 shrink-0"
                            data-testid={`checkbox-apply-pillar-${i}`}
                          />
                          <span className={`text-sm leading-snug flex-1 ${isDone ? 'line-through text-muted-foreground' : ''}`}>
                            {item}
                          </span>
                          {isAuto && (
                            <Badge variant="outline" className="text-xs shrink-0 text-muted-foreground">auto</Badge>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      <Dialog open={!!activeChallenge} onOpenChange={(open) => !open && setActiveChallenge(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {activeChallenge && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  Field Problem Challenge
                </DialogTitle>
                <DialogDescription>
                  {activeChallenge.domain}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-md">
                  <Badge variant="outline" className={getDifficultyColor(activeChallenge.difficulty)}>
                    {activeChallenge.difficulty}
                  </Badge>
                  <div className={`flex items-center gap-2 font-mono text-lg ${
                    timeRemaining <= 30 && timeRemaining > 0 ? 'text-red-500' : ''
                  }`}>
                    <Timer className="w-5 h-5" />
                    {formatTime(timeRemaining)}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Scenario:</h4>
                  <p className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-md">
                    {activeChallenge.scenario}
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Question:</h4>
                  <p className="text-sm font-medium">
                    {activeChallenge.question}
                  </p>
                </div>

                {!showSolution ? (
                  <>
                    <div className="space-y-2">
                      <h4 className="font-medium">Your Answer:</h4>
                      <Textarea
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        placeholder="Show your work and final answer..."
                        className="min-h-[100px]"
                        data-testid="textarea-user-answer"
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={revealSolution}
                        className="flex-1"
                        data-testid="button-reveal-solution"
                      >
                        Reveal Solution
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-2">
                      <h4 className="font-medium text-green-600 dark:text-green-400">Solution:</h4>
                      <pre className="text-sm bg-green-50 dark:bg-green-950/20 p-3 rounded-md whitespace-pre-wrap font-mono">
                        {activeChallenge.solution}
                      </pre>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium">Self-Grade Rubric:</h4>
                      <p className="text-xs text-muted-foreground">Check off the criteria you met in your answer:</p>
                      <div className="space-y-2">
                        {activeChallenge.rubric.map((item, index) => (
                          <div
                            key={index}
                            className={`flex items-center gap-3 p-2 rounded-md cursor-pointer ${
                              selfGrade.includes(index) 
                                ? 'bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800'
                                : 'bg-muted/30 border border-transparent'
                            }`}
                            onClick={() => toggleRubricItem(index)}
                            data-testid={`rubric-item-${index}`}
                          >
                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                              selfGrade.includes(index)
                                ? 'bg-green-500 border-green-500 text-white'
                                : 'border-muted-foreground'
                            }`}>
                              {selfGrade.includes(index) && <CheckCircle2 className="w-3 h-3" />}
                            </div>
                            <span className="text-sm">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Your Score:</span>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: activeChallenge.rubric.length }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < selfGrade.length 
                                  ? 'text-yellow-500 fill-yellow-500' 
                                  : 'text-muted-foreground'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          ({selfGrade.length}/{activeChallenge.rubric.length})
                        </span>
                      </div>
                      <Button
                        onClick={submitSelfGrade}
                        disabled={updateAttemptMutation.isPending}
                        data-testid="button-submit-self-grade"
                      >
                        {updateAttemptMutation.isPending ? (
                          <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        ) : null}
                        Complete Challenge
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
