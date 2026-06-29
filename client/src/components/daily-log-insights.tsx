import { useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Flame, CalendarCheck, Clock, Sparkles } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { formatMinutes } from '@/lib/time-utils';
import {
  parseISO,
  startOfWeek,
  endOfWeek,
  startOfDay,
  isWithinInterval,
  isToday,
  subDays,
} from 'date-fns';
import type { DailyLog, QuizSession, PracticeExam, Domain } from '@shared/schema';

// Weekly summary + logging-streak strip shown at the top of the Daily Logs tab.
export function DailyLogSummary() {
  const { data: logs } = useQuery<DailyLog[]>({
    queryKey: ['/api/daily-logs'],
  });

  const summary = useMemo(() => {
    if (!logs || logs.length === 0) return null;

    const now = new Date();
    const weekStart = startOfWeek(now, { weekStartsOn: 0 });
    const weekEnd = endOfWeek(now, { weekStartsOn: 0 });

    const parsed = logs.map((l) => ({ log: l, day: startOfDay(parseISO(l.date.toString())) }));

    const thisWeek = parsed.filter((p) =>
      isWithinInterval(p.day, { start: weekStart, end: weekEnd })
    );
    const daysLoggedThisWeek = new Set(thisWeek.map((p) => p.day.getTime())).size;
    const minutesThisWeek = thisWeek.reduce((sum, p) => sum + (p.log.timeSpent || 0), 0);

    // Logging streak: consecutive days (ending today or yesterday) that have a log.
    const dayKeys = new Set(parsed.map((p) => p.day.getTime()));
    let streak = 0;
    let cursor = startOfDay(now);
    if (!dayKeys.has(cursor.getTime())) {
      cursor = startOfDay(subDays(now, 1)); // allow streak if logged yesterday
    }
    while (dayKeys.has(cursor.getTime())) {
      streak++;
      cursor = startOfDay(subDays(cursor, 1));
    }

    return { daysLoggedThisWeek, minutesThisWeek, streak };
  }, [logs]);

  if (!summary) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3" data-testid="daily-log-summary">
      <Card className="p-4 flex items-center gap-3">
        <div className="rounded-md bg-survey-orange/15 p-2">
          <Flame className="h-5 w-5 text-survey-orange" />
        </div>
        <div>
          <p className="text-2xl font-semibold text-foreground leading-none" data-testid="text-logging-streak">
            {summary.streak}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            day{summary.streak === 1 ? '' : 's'} logging streak
          </p>
        </div>
      </Card>

      <Card className="p-4 flex items-center gap-3">
        <div className="rounded-md bg-primary/15 p-2">
          <CalendarCheck className="h-5 w-5 text-primary" />
        </div>
        <div>
          <p className="text-2xl font-semibold text-foreground leading-none" data-testid="text-days-logged-week">
            {summary.daysLoggedThisWeek}
            <span className="text-base text-muted-foreground font-normal"> / 7</span>
          </p>
          <p className="text-xs text-muted-foreground mt-1">days logged this week</p>
        </div>
      </Card>

      <Card className="p-4 flex items-center gap-3">
        <div className="rounded-md bg-brass/15 p-2">
          <Clock className="h-5 w-5 text-brass" />
        </div>
        <div>
          <p className="text-2xl font-semibold text-foreground leading-none" data-testid="text-time-logged-week">
            {summary.minutesThisWeek > 0 ? formatMinutes(summary.minutesThisWeek) : '0m'}
          </p>
          <p className="text-xs text-muted-foreground mt-1">studied this week</p>
        </div>
      </Card>
    </div>
  );
}

export interface TodayPrefill {
  activities: string;
  timeSpent?: number;
  domain?: Domain;
}

interface FlashcardTodaySession {
  cardsReviewed: number | null;
  timeSpentSeconds: number | null;
  examTrack: string;
}

// Card that summarizes what the app already tracked today and offers to pre-fill the log.
export function TodayActivityPrefill({
  examTrack,
  onPrefill,
}: {
  examTrack: string;
  onPrefill: (data: TodayPrefill) => void;
}) {
  const { data: quizSessions } = useQuery<QuizSession[]>({
    queryKey: ['/api/quiz/sessions', examTrack],
    queryFn: async () => {
      const res = await fetch(`/api/quiz/sessions?examTrack=${examTrack}`);
      if (!res.ok) throw new Error('Failed to fetch quiz sessions');
      return res.json();
    },
  });

  const { data: exams } = useQuery<PracticeExam[]>({
    queryKey: ['/api/exams', examTrack],
    queryFn: async () => {
      const res = await fetch(`/api/exams?examTrack=${examTrack}`);
      if (!res.ok) throw new Error('Failed to fetch exams');
      return res.json();
    },
  });

  const { data: flashToday } = useQuery<FlashcardTodaySession[]>({
    queryKey: ['/api/flashcards/sessions/today'],
  });

  const suggestion = useMemo(() => {
    const todayQuizzes = (quizSessions || []).filter(
      (s) => s.completedAt && isToday(new Date(s.completedAt))
    );
    const todayExams = (exams || []).filter(
      (e) => e.completedAt && isToday(new Date(e.completedAt))
    );
    const todayFlash = (flashToday || []).filter(
      (f) => f.examTrack === examTrack && (f.cardsReviewed || 0) > 0
    );

    if (todayQuizzes.length === 0 && todayExams.length === 0 && todayFlash.length === 0) {
      return null;
    }

    const lines: string[] = [];
    let totalMinutes = 0;

    if (todayQuizzes.length > 0) {
      const totalQ = todayQuizzes.reduce((s, q) => s + q.totalQuestions, 0);
      const correct = todayQuizzes.reduce((s, q) => s + q.correctAnswers, 0);
      const secs = todayQuizzes.reduce((s, q) => s + q.timeSpentSeconds, 0);
      totalMinutes += Math.round(secs / 60);
      const pct = totalQ > 0 ? Math.round((correct / totalQ) * 100) : 0;
      lines.push(
        `Completed ${todayQuizzes.length} practice quiz${todayQuizzes.length > 1 ? 'zes' : ''} (${totalQ} questions, ${pct}% correct)`
      );
    }

    if (todayExams.length > 0) {
      const totalQ = todayExams.reduce((s, e) => s + e.totalQuestions, 0);
      const correct = todayExams.reduce((s, e) => s + e.correctAnswers, 0);
      const mins = todayExams.reduce((s, e) => s + e.timeSpentMinutes, 0);
      totalMinutes += mins;
      const pct = totalQ > 0 ? Math.round((correct / totalQ) * 100) : 0;
      lines.push(
        `Took ${todayExams.length} practice exam${todayExams.length > 1 ? 's' : ''} (${totalQ} questions, ${pct}% correct)`
      );
    }

    if (todayFlash.length > 0) {
      const cards = todayFlash.reduce((s, f) => s + (f.cardsReviewed || 0), 0);
      const secs = todayFlash.reduce((s, f) => s + (f.timeSpentSeconds || 0), 0);
      totalMinutes += Math.round(secs / 60);
      lines.push(`Reviewed ${cards} flashcard${cards > 1 ? 's' : ''}`);
    }

    // Suggest the dominant (most-practiced) domain across today's quizzes.
    // Ties resolve to no suggestion so we never guess between equally-studied domains.
    const domainCounts = new Map<string, number>();
    for (const q of todayQuizzes) {
      const d = q.domain;
      if (!d || d === 'all' || d === 'mixed') continue;
      domainCounts.set(d, (domainCounts.get(d) || 0) + 1);
    }
    let domain: Domain | undefined;
    let topCount = 0;
    let tied = false;
    for (const [d, count] of Array.from(domainCounts.entries())) {
      if (count > topCount) {
        topCount = count;
        domain = d as Domain;
        tied = false;
      } else if (count === topCount) {
        tied = true;
      }
    }
    if (tied) domain = undefined;

    return {
      lines,
      activities: lines.map((l) => `• ${l}`).join('\n'),
      timeSpent: totalMinutes > 0 ? totalMinutes : undefined,
      domain,
    };
  }, [quizSessions, exams, flashToday]);

  if (!suggestion) return null;

  return (
    <Card className="p-4 border-primary/30 bg-primary/5" data-testid="today-activity-prefill">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-2">
            <Sparkles className="h-4 w-4 text-primary" />
            Today's tracked activity
          </h3>
          <ul className="space-y-1">
            {suggestion.lines.map((line, i) => (
              <li key={i} className="text-sm text-muted-foreground" data-testid={`text-today-activity-${i}`}>
                • {line}
              </li>
            ))}
          </ul>
        </div>
        <Button
          type="button"
          size="sm"
          onClick={() =>
            onPrefill({
              activities: suggestion.activities,
              timeSpent: suggestion.timeSpent,
              domain: suggestion.domain,
            })
          }
          data-testid="button-prefill-from-today"
        >
          <Sparkles className="h-4 w-4 mr-2" />
          Pre-fill log from today
        </Button>
      </div>
    </Card>
  );
}
