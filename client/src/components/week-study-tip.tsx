import { Link } from 'wouter';
import { Brain, Clock, BookOpen, Repeat2, Pencil, Star, Target, Lightbulb, CheckSquare, Dumbbell, Timer, Moon, Sun, TrendingUp, Zap, BarChart2 } from 'lucide-react';

interface Tip {
  icon: typeof Brain;
  title: string;
  text: string;
  tab: 'memory' | 'exam' | 'strategies';
}

/**
 * All 16 tips are derived strictly from content already present in the
 * Resources page (Memory / Exam / Strategies tabs). No new techniques and
 * no domain-specific examples are introduced.
 */
const TIPS: Tip[] = [
  {
    icon: Repeat2,
    title: 'Spaced Repetition: 1–3–7–14–30',
    text: 'After learning a concept today, schedule review sessions on days 3, 7, 14, and 30. Each review should be a closed-book recall test. This graduated spacing fights the forgetting curve and builds durable long-term memory.',
    tab: 'memory',
  },
  {
    icon: Star,
    title: 'Track Your Spaced Repetition',
    text: 'Use a notebook column or digital tag labeled "1–3–7–14–30" to track which flashcards you have reviewed at each interval. Cards that clear all five checkpoints can be moved to a "Mastered" pile.',
    tab: 'memory',
  },
  {
    icon: Pencil,
    title: 'Triad Drill: Concept → Application → Check',
    text: 'For each key concept this week: state it aloud (Concept), work a practice problem using it (Application), then confirm your units and signs are correct (Check). Three cycles of this drill convert recognition into working recall.',
    tab: 'memory',
  },
  {
    icon: BookOpen,
    title: 'Feynman Technique',
    text: 'Explain a concept in plain English, as if teaching a first-year tech. Where you stumble is exactly where your understanding is thin. Write a simplified 2-sentence version in the margin — that becomes your personal recall hook.',
    tab: 'memory',
  },
  {
    icon: Lightbulb,
    title: 'Chunking: Group Related Items',
    text: 'Before studying a dense topic, break it into mini-sets of 3–5 related items and learn each set as a single chunk. Chunked information is much easier to retrieve under time pressure than a long undifferentiated list.',
    tab: 'memory',
  },
  {
    icon: Target,
    title: 'Exam First-Pass Strategy',
    text: 'On exam day, do a fast first pass — answer what you know immediately and mark harder questions for a second pass. This ensures you never run out of time on questions you could answer. Never spend more than 2 minutes on a single problem before moving on.',
    tab: 'exam',
  },
  {
    icon: Clock,
    title: 'Skip Time-Traps',
    text: 'If a problem takes more than 2 minutes, move on and return later. Time-traps cost you points on questions you could have answered. Trust your marks and revisit flagged problems during any remaining time.',
    tab: 'exam',
  },
  {
    icon: Zap,
    title: 'Reference Book Navigation',
    text: 'Tab each section of your reference book beforehand for quick access during the exam. Knowing exactly where to find each table or formula is just as important as knowing the formula itself.',
    tab: 'exam',
  },
  {
    icon: Moon,
    title: 'Exam Break: Reset, Don\'t Review',
    text: 'During the exam break, stand up, stretch, and hydrate. Do not review your answers — your goal is a mental reset, not more analysis. A calm break often improves second-half performance.',
    tab: 'exam',
  },
  {
    icon: Sun,
    title: 'Daily Recall Habit',
    text: 'Write 5 key items from memory each morning before opening any notes. Recite definitions aloud once per week. Mark a flashcard as "Mastered" only after you recall it correctly on three separate occasions.',
    tab: 'strategies',
  },
  {
    icon: CheckSquare,
    title: 'Mark Cards by Confidence',
    text: 'After three correct, unprompted recalls of a flashcard, mark it "Mastered" and rotate it to a lower-frequency review pile. This frees up study time for the cards you still need — and gives you an accurate picture of genuine mastery.',
    tab: 'strategies',
  },
  {
    icon: Dumbbell,
    title: 'Active Recall Under Time Pressure',
    text: 'Use a 30-second timer for each flashcard. Read the question and answer aloud within the countdown, then mark whether you hesitated. By mid-plan, aim to recall core material within 20 seconds — the speed you\'ll need on exam day.',
    tab: 'strategies',
  },
  {
    icon: TrendingUp,
    title: 'Nightly Brain-Dump',
    text: 'At the end of each study session, close everything and list 10 items you recall from today. Then reopen your notes and fill in what you missed. This short habit converts short-term exposure into long-term storage.',
    tab: 'strategies',
  },
  {
    icon: BarChart2,
    title: 'Weekly Retention Audit',
    text: 'At the end of each study week, pull 10 random flashcards from different topics and test yourself. If you miss more than 3, revisit that week\'s notes before moving on. Log your retention score to track improvement over time.',
    tab: 'strategies',
  },
  {
    icon: Brain,
    title: 'Weekly Flashcard Rotation',
    text: 'Focus your daily flashcard sessions on a different subject area each day of the week instead of studying every topic every day. This interleaved approach mirrors the mixed-question format of the real exam.',
    tab: 'strategies',
  },
  {
    icon: TrendingUp,
    title: 'Post-Exam Reflection',
    text: 'After each practice exam or quiz, record which topics felt strong and which felt uncertain. Use that list to adjust your next week\'s focus. Honest self-assessment is more valuable than simply logging your score.',
    tab: 'exam',
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

      {/* Standardized deep-link to Resources */}
      <div className="pl-9">
        <Link href={resourcesPath}>
          <span
            className="text-xs font-medium text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 hover:underline cursor-pointer transition-colors"
            data-testid={`link-study-tip-resources-${week}`}
          >
            More in Resources →
          </span>
        </Link>
      </div>
    </div>
  );
}
