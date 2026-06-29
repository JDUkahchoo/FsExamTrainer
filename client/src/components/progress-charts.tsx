import { Card } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import {
  LineChart,
  Line,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import { TrendingUp, Radar as RadarIcon, BarChart3, CalendarClock } from 'lucide-react';
import type { QuizSession, PracticeExam } from '@shared/schema';

type DomainMasteryItem = {
  domainNumber: number;
  domain: string;
  quizAccuracy: number;
  overallProgress: number;
};

const pct = (correct: number, total: number) =>
  total > 0 ? Math.round((correct / total) * 100) : 0;

const formatDate = (d: Date | string) =>
  new Date(d).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });

const shortLabel = (domain: string, domainNumber: number) => {
  const first = domain.split(/[\s&,]+/)[0];
  return `${domainNumber}. ${first}`;
};

function ChartCard({
  title,
  description,
  icon: Icon,
  children,
  testId,
}: {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  testId: string;
}) {
  return (
    <Card className="p-4" data-testid={testId}>
      <div className="flex items-start gap-3 mb-4">
        <div className="rounded-md bg-primary/10 p-2">
          <Icon className="h-4 w-4 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground text-sm">{title}</h3>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
      {children}
    </Card>
  );
}

function EmptyChart({ message }: { message: string }) {
  return (
    <div className="flex h-[220px] items-center justify-center text-center">
      <p className="text-sm text-muted-foreground max-w-xs">{message}</p>
    </div>
  );
}

export function ScoreTrendChart({
  quizSessions,
  examHistory,
}: {
  quizSessions: QuizSession[];
  examHistory: PracticeExam[];
}) {
  const points = [
    ...(quizSessions || []).map((s) => ({
      t: new Date(s.completedAt).getTime(),
      label: formatDate(s.completedAt),
      quiz: pct(s.correctAnswers, s.totalQuestions),
    })),
    ...(examHistory || []).map((e) => ({
      t: new Date(e.completedAt).getTime(),
      label: formatDate(e.completedAt),
      exam: pct(e.correctAnswers, e.totalQuestions),
    })),
  ].sort((a, b) => a.t - b.t);

  const config = {
    quiz: { label: 'Quiz accuracy', color: 'hsl(var(--chart-1))' },
    exam: { label: 'Exam score', color: 'hsl(var(--chart-3))' },
  } satisfies ChartConfig;

  return (
    <ChartCard
      title="Score Trend Over Time"
      description="Your quiz accuracy and practice exam scores as they change over time."
      icon={TrendingUp}
      testId="chart-score-trend"
    >
      {points.length === 0 ? (
        <EmptyChart message="Take a quiz or practice exam to start seeing your score trend here." />
      ) : (
        <ChartContainer config={config} className="h-[240px] w-full">
          <LineChart data={points} margin={{ left: 4, right: 12, top: 8, bottom: 4 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={24}
            />
            <YAxis
              domain={[0, 100]}
              tickLine={false}
              axisLine={false}
              width={32}
              tickFormatter={(v) => `${v}%`}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              dataKey="quiz"
              type="monotone"
              stroke="var(--color-quiz)"
              strokeWidth={2}
              dot={false}
              connectNulls
            />
            <Line
              dataKey="exam"
              type="monotone"
              stroke="var(--color-exam)"
              strokeWidth={2}
              dot={{ r: 3 }}
              connectNulls
            />
          </LineChart>
        </ChartContainer>
      )}
    </ChartCard>
  );
}

export function DomainMasteryRadar({ domainMastery }: { domainMastery: DomainMasteryItem[] }) {
  const data = (domainMastery || []).map((d) => ({
    domain: shortLabel(d.domain, d.domainNumber),
    fullName: d.domain,
    mastery: d.overallProgress,
  }));

  const config = {
    mastery: { label: 'Mastery', color: 'hsl(var(--chart-1))' },
  } satisfies ChartConfig;

  return (
    <ChartCard
      title="Domain Mastery"
      description="Your weighted mastery across every exam domain at a glance."
      icon={RadarIcon}
      testId="chart-domain-radar"
    >
      {data.length === 0 ? (
        <EmptyChart message="Complete lessons and quizzes to map your mastery across domains." />
      ) : (
        <ChartContainer config={config} className="mx-auto aspect-square max-h-[280px]">
          <RadarChart data={data}>
            <ChartTooltip
              content={
                <ChartTooltipContent
                  labelKey="mastery"
                  formatter={(value, _name, item) => (
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground">{item?.payload?.fullName}</span>
                      <span className="font-mono font-medium">{value}% mastery</span>
                    </div>
                  )}
                />
              }
            />
            <PolarGrid />
            <PolarAngleAxis dataKey="domain" tick={{ fontSize: 11 }} />
            <Radar
              dataKey="mastery"
              fill="var(--color-mastery)"
              fillOpacity={0.5}
              stroke="var(--color-mastery)"
              strokeWidth={2}
            />
          </RadarChart>
        </ChartContainer>
      )}
    </ChartCard>
  );
}

export function DomainAccuracyBar({ domainMastery }: { domainMastery: DomainMasteryItem[] }) {
  const data = (domainMastery || [])
    .map((d) => ({
      domain: shortLabel(d.domain, d.domainNumber),
      fullName: d.domain,
      accuracy: d.quizAccuracy,
    }))
    .sort((a, b) => a.accuracy - b.accuracy);

  const config = {
    accuracy: { label: 'Quiz accuracy', color: 'hsl(var(--chart-2))' },
  } satisfies ChartConfig;

  return (
    <ChartCard
      title="Quiz Accuracy by Domain"
      description="Domains ranked weakest to strongest, so you know where to focus."
      icon={BarChart3}
      testId="chart-domain-accuracy"
    >
      {data.length === 0 ? (
        <EmptyChart message="Answer quiz questions to compare your accuracy across domains." />
      ) : (
        <ChartContainer config={config} className="h-[280px] w-full">
          <BarChart data={data} layout="vertical" margin={{ left: 8, right: 16 }}>
            <CartesianGrid horizontal={false} strokeDasharray="3 3" />
            <XAxis type="number" domain={[0, 100]} tickFormatter={(v) => `${v}%`} tickLine={false} axisLine={false} />
            <YAxis
              type="category"
              dataKey="domain"
              width={92}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11 }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value, _name, item) => (
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground">{item?.payload?.fullName}</span>
                      <span className="font-mono font-medium">{value}% accuracy</span>
                    </div>
                  )}
                />
              }
            />
            <Bar dataKey="accuracy" fill="var(--color-accuracy)" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ChartContainer>
      )}
    </ChartCard>
  );
}

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const HOUR_LABELS = ['12a', '3a', '6a', '9a', '12p', '3p', '6p', '9p'];

export function StudyActivityHeatmap({
  quizSessions,
  examHistory,
}: {
  quizSessions: QuizSession[];
  examHistory: PracticeExam[];
}) {
  const lookup = new Map<string, number>();
  let max = 0;
  const addEvent = (when: Date | string | null | undefined) => {
    if (!when) return;
    const d = new Date(when);
    if (isNaN(d.getTime())) return;
    const key = `${d.getDay()}-${d.getHours()}`;
    const next = (lookup.get(key) || 0) + 1;
    lookup.set(key, next);
    if (next > max) max = next;
  };
  (quizSessions || []).forEach((s) => addEvent(s.completedAt));
  (examHistory || []).forEach((e) => addEvent(e.completedAt));

  const formatHour = (h: number) => {
    const period = h < 12 ? 'a' : 'p';
    const hr = h % 12 === 0 ? 12 : h % 12;
    return `${hr}${period}`;
  };

  return (
    <ChartCard
      title="Study Activity by Day & Hour"
      description="When you tend to study. Darker squares mean more sessions completed then."
      icon={CalendarClock}
      testId="chart-study-heatmap"
    >
      {max === 0 ? (
        <EmptyChart message="Complete a few quizzes or exams to reveal your study habits by day and time." />
      ) : (
        <div className="overflow-x-auto">
          <div className="min-w-[520px]">
            <div className="flex flex-col gap-1">
              {DAY_LABELS.map((dayLabel, day) => (
                <div key={day} className="flex items-center gap-1">
                  <span className="w-8 shrink-0 text-[11px] text-muted-foreground">{dayLabel}</span>
                  <div className="flex gap-1">
                    {Array.from({ length: 24 }, (_, hour) => {
                      const count = lookup.get(`${day}-${hour}`) || 0;
                      const intensity = count === 0 ? 0 : 0.2 + (count / max) * 0.8;
                      return (
                        <div
                          key={hour}
                          className="h-4 w-4 rounded-sm border border-border/40"
                          style={{
                            backgroundColor:
                              count === 0 ? 'hsl(var(--muted))' : `hsl(var(--chart-1) / ${intensity})`,
                          }}
                          title={`${dayLabel} ${formatHour(hour)} — ${count} session${count === 1 ? '' : 's'}`}
                          data-testid={`heatmap-cell-${day}-${hour}`}
                        />
                      );
                    })}
                  </div>
                </div>
              ))}
              <div className="flex items-center gap-1 pl-9 pt-1">
                {HOUR_LABELS.map((label, i) => (
                  <span key={i} className="w-[76px] text-[10px] text-muted-foreground">
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </ChartCard>
  );
}
