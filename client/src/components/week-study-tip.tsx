import { Link } from 'wouter';
import { Brain, Clock, BookOpen, Repeat2, Pencil, Star, Target, Lightbulb, CheckSquare, Dumbbell, Timer, Moon, Sun, TrendingUp, Zap, BarChart2 } from 'lucide-react';

interface Tip {
  icon: typeof Brain;
  title: string;
  text: string;
  tab: 'memory' | 'exam' | 'strategies';
  linkLabel: string;
}

const TIPS: Tip[] = [
  {
    icon: Repeat2,
    title: 'Spaced Repetition: 1–3–7–14–30',
    text: 'After learning new concepts today, schedule reviews on days 3, 7, 14, and 30. Each review should be a quick recall test with your notes closed. Tracking this schedule prevents the forgetting curve from wiping out your progress.',
    tab: 'memory',
    linkLabel: 'Spaced Repetition details',
  },
  {
    icon: Brain,
    title: 'Active Recall Beats Re-Reading',
    text: 'Close your textbook and write down everything you remember from the chapter before checking. This retrieval practice is far more effective than re-reading and builds the kind of recall speed you\'ll need on exam day.',
    tab: 'strategies',
    linkLabel: 'Active Recall strategies',
  },
  {
    icon: Pencil,
    title: 'Triad Drill: Concept → Application → Check',
    text: 'For each formula this week: state it aloud, work a practice problem, then verify your units and signs. This three-step drill converts passive recognition into reliable working memory. Aim for 3 triad cycles per core formula.',
    tab: 'memory',
    linkLabel: 'Triad Drill method',
  },
  {
    icon: Moon,
    title: 'Nightly Brain-Dump',
    text: 'At the end of each study session, close everything and list 10 items you recall from today. Then reopen your notes and fill in the gaps. This 5-minute habit converts short-term exposure into long-term storage overnight.',
    tab: 'strategies',
    linkLabel: 'Nightly Routine details',
  },
  {
    icon: BookOpen,
    title: 'Feynman Technique',
    text: 'Pick one concept per session and explain it in plain English as if teaching a first-year tech. Where you stumble is exactly where your understanding is shallow. Write a simplified 2-sentence version in your notes as a "recall hook."',
    tab: 'memory',
    linkLabel: 'Feynman Technique guide',
  },
  {
    icon: Target,
    title: 'Chunking for Dense Material',
    text: 'Group related items into mini-sets of 3–5 before studying them. Example: for leveling, chunk "BS → HI → FS" as a single unit. Chunked information is easier to retrieve under time pressure than a long itemized list.',
    tab: 'memory',
    linkLabel: 'Chunking examples',
  },
  {
    icon: Timer,
    title: 'Pomodoro for Focus Sessions',
    text: 'Work in 25-minute focused blocks, then take a 5-minute break. After four blocks, take a longer 20-minute break. This rhythm prevents mental fatigue and keeps your concentration sharp across multi-hour study sessions.',
    tab: 'strategies',
    linkLabel: 'Study Strategies tab',
  },
  {
    icon: Star,
    title: 'Mnemonic Anchors for Key Rules',
    text: '"Sine South, Cosine East" — use phrase-anchors like this to lock in traverse component rules. Create your own mnemonics for the 3–4 formulas you keep forgetting; your brain retains personalized associations better than generic ones.',
    tab: 'memory',
    linkLabel: 'Mnemonic examples',
  },
  {
    icon: CheckSquare,
    title: 'Mark Cards by Confidence, Not Correctness',
    text: 'When reviewing flashcards, tag each one as Easy / Hesitant / Hard instead of just right/wrong. Prioritize "Hesitant" cards in your next session — these are the ones most likely to slip on exam day under time pressure.',
    tab: 'strategies',
    linkLabel: 'Flashcard rotation guide',
  },
  {
    icon: Dumbbell,
    title: 'Active Recall Under Time Pressure',
    text: 'Set a 30-second timer per flashcard. Read the question and answer aloud before time runs out, then mark if you hesitated. By mid-plan, aim to recall core formulas within 20 seconds — the same speed you\'ll need in the exam.',
    tab: 'strategies',
    linkLabel: 'Timed Recall details',
  },
  {
    icon: TrendingUp,
    title: 'Weekly Retention Audit',
    text: 'At the start of each week, spend 10 minutes reviewing last week\'s topics without looking at notes. Track how many key points you can recall. This surfaces forgotten material before it compounds into larger gaps.',
    tab: 'strategies',
    linkLabel: 'Retention Audit guide',
  },
  {
    icon: Sun,
    title: 'Morning Formula Writing',
    text: 'Each morning, write 5 key formulas from memory before opening any notes or apps. This daily warm-up builds procedural fluency and reveals which formulas still need reinforcement. Keep a list of which ones you consistently miss.',
    tab: 'strategies',
    linkLabel: 'Daily Routine details',
  },
  {
    icon: Lightbulb,
    title: 'Exam-Day: First Pass Strategy',
    text: 'On exam day, do a fast first pass — answer what you know instantly and mark harder questions for return. This guarantees you don\'t run out of time on questions you can answer. Never spend more than 2 minutes on a single question before moving on.',
    tab: 'exam',
    linkLabel: 'Exam Mindset guide',
  },
  {
    icon: BarChart2,
    title: 'Reference Handbook Navigation',
    text: 'Tab your NCEES Reference Handbook by section before exam day. Knowing exactly where to find each table and formula is as important as knowing the formula itself. Practice locating 5 random items in the handbook each week.',
    tab: 'exam',
    linkLabel: 'Exam Prep checklist',
  },
  {
    icon: Zap,
    title: 'Interleaved Practice Beats Block Study',
    text: 'Instead of studying one topic for an hour, alternate between two or three topics in the same session. Interleaving feels harder but produces better long-term retention and mirrors the mixed-question format of the actual exam.',
    tab: 'strategies',
    linkLabel: 'Study Strategies tab',
  },
  {
    icon: Clock,
    title: 'Exam Break Reset',
    text: 'During the exam break, stand up, stretch, and hydrate — do not review your answers. Mental reset is the goal. Your brain consolidates information during these rest windows, so a calm break often improves second-half performance.',
    tab: 'exam',
    linkLabel: 'Break & Mindset guide',
  },
];

interface WeekStudyTipProps {
  week: number;
  examTrack: string;
}

export function WeekStudyTip({ week, examTrack }: WeekStudyTipProps) {
  const tip = TIPS[(week - 1) % TIPS.length];
  const Icon = tip.icon;

  const resourcesPath = `/app/${examTrack}/resources?tab=${tip.tab}`;

  return (
    <div
      className="rounded-lg border border-violet-200 dark:border-violet-800 bg-violet-50/50 dark:bg-violet-950/20 p-4 space-y-2"
      data-testid={`week-study-tip-${week}`}
    >
      {/* Header */}
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-7 h-7 rounded-full bg-violet-100 dark:bg-violet-900/40 flex-shrink-0">
          <Icon className="w-4 h-4 text-violet-600 dark:text-violet-400" />
        </div>
        <div>
          <p className="text-xs font-semibold text-violet-600 dark:text-violet-400 uppercase tracking-wider leading-none">
            This Week's Study Strategy
          </p>
          <p className="text-sm font-semibold text-foreground leading-tight mt-0.5">
            {tip.title}
          </p>
        </div>
      </div>

      {/* Tip text */}
      <p className="text-sm text-muted-foreground leading-relaxed pl-9">
        {tip.text}
      </p>

      {/* Deep-link to Resources */}
      <div className="pl-9">
        <Link href={resourcesPath}>
          <span
            className="text-xs font-medium text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 hover:underline cursor-pointer transition-colors"
            data-testid={`link-study-tip-resources-${week}`}
          >
            {tip.linkLabel} →
          </span>
        </Link>
      </div>
    </div>
  );
}
