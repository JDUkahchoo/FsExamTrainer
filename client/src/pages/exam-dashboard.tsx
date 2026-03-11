import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, Brain, ClipboardCheck, GraduationCap, BarChart3, Flame, Target, Trophy,
  Clock, TrendingUp, Zap, CheckCircle2, Lightbulb, FileText, BookMarked, CalendarDays,
  RefreshCw, Activity
} from 'lucide-react';
import { WeekReviewModal } from '@/components/week-review-modal';
import { useExamTrack } from '@/contexts/exam-track-context';
import { EXAM_TRACKS } from '@shared/schema';
import { StudyCoachBriefing } from '@/components/study-coach-briefing';
import { DailyQuestsPanel } from '@/components/daily-quests-panel';
import { ReviewAlerts } from '@/components/review-alerts';
import { WeeklyLeaderboard } from '@/components/weekly-leaderboard';
import { ForgettingCurveChart } from '@/components/forgetting-curve-chart';
import type { UserPreferences } from '@shared/schema';

interface StudyStats {
  lessonsCompleted: number;
  totalLessons: number;
  flashcardsReviewed: number;
  quizzesTaken: number;
  currentStreak: number;
  totalXp: number;
}

export default function ExamDashboard() {
  const [, setLocation] = useLocation();
  const { examTrack, examName, lessonCount, domainCount } = useExamTrack();
  const examInfo = EXAM_TRACKS.find(t => t.id === examTrack);

  const { data: stats } = useQuery<StudyStats>({
    queryKey: ['/api/study-stats', examTrack],
    queryFn: async () => {
      const res = await fetch(`/api/study-stats?examTrack=${examTrack}`);
      if (!res.ok) throw new Error('Failed to fetch stats');
      return res.json();
    }
  });

  const { data: lessonsProgress } = useQuery<{ completed: number; total: number }>({
    queryKey: ['/api/lessons/progress-summary', examTrack],
    queryFn: async () => {
      const res = await fetch(`/api/lessons/progress-summary?examTrack=${examTrack}`);
      if (!res.ok) throw new Error('Failed to fetch progress');
      return res.json();
    }
  });

  const { data: preferences } = useQuery<UserPreferences>({
    queryKey: ['/api/preferences'],
  });

  const [reviewWeekInfo, setReviewWeekInfo] = useState<{ week: number; title: string; domains: string[] } | null>(null);

  const { data: memoryHealth } = useQuery<Array<{
    weekNumber: number; domains: string[]; health: number; status: 'fresh' | 'fading' | 'stale';
    completedAt: string; lastReviewedAt: string | null; reviewCount: number;
  }>>({
    queryKey: ['/api/plan/memory-health', examTrack],
    queryFn: async () => {
      const res = await fetch(`/api/plan/memory-health?examTrack=${examTrack}`);
      if (!res.ok) throw new Error('Failed');
      return res.json();
    }
  });

  const completedLessons = lessonsProgress?.completed || 0;
  const progressPercent = lessonCount > 0 ? Math.round((completedLessons / lessonCount) * 100) : 0;

  const daysUntilExam = (() => {
    if (!preferences?.examDate) return null;
    const examDate = new Date(preferences.examDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    examDate.setHours(0, 0, 0, 0);
    const diff = Math.ceil((examDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : null;
  })();

  const quickActions = [
    { 
      label: 'Continue Studying', 
      href: `/app/${examTrack}/study-plan`, 
      icon: BookOpen, 
      description: 'Resume your study plan',
      testId: 'action-study-plan'
    },
    { 
      label: 'Practice Quiz', 
      href: `/app/${examTrack}/quiz`, 
      icon: Brain, 
      description: 'Test your knowledge',
      testId: 'action-quiz'
    },
    { 
      label: 'Flashcards', 
      href: `/app/${examTrack}/flashcards`, 
      icon: ClipboardCheck, 
      description: 'Review key concepts',
      testId: 'action-flashcards'
    },
    { 
      label: 'Practice Exam', 
      href: `/app/${examTrack}/exam`, 
      icon: GraduationCap, 
      description: 'Simulate the real exam',
      testId: 'action-exam'
    },
  ];

  const strategies = [
    {
      id: 'standard',
      name: 'Standard Mode',
      icon: BookOpen,
      color: 'bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800',
      description: 'Balanced approach covering all domains evenly',
      timeline: '16 weeks',
      weeklyCommitment: '6-8 hours/week',
      dailyCommitment: '~1 hour/day',
      benefits: [
        'Structured weekly schedule',
        'All domains covered equally',
        'Best for consistent learners',
        'READ → FOCUS → APPLY → REINFORCE framework'
      ],
      bestFor: 'Students with flexible schedules',
      recommended: !preferences?.studyMode || preferences.studyMode === 'standard'
    },
    {
      id: 'result-driven',
      name: 'Result-Driven Mode',
      icon: TrendingUp,
      color: 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800',
      description: 'Prioritizes weak domains identified in your pretest',
      timeline: '16 weeks',
      weeklyCommitment: '7-9 hours/week',
      dailyCommitment: '~1.5 hours/day',
      benefits: [
        'Custom domain prioritization',
        'Weak areas get more focus',
        'Data-driven approach',
        'Improves overall pass rate faster'
      ],
      bestFor: 'Students with specific weak areas',
      recommended: preferences?.studyMode === 'result-driven'
    },
    {
      id: 'working-professional',
      name: 'Working Professional',
      icon: Clock,
      color: 'bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800',
      description: 'Optimized for busy schedules with manageable daily loads',
      timeline: '16 weeks',
      weeklyCommitment: '9-11 hours/week',
      dailyCommitment: '~1hr M-F + 2-3hrs weekends',
      benefits: [
        '3 lessons/week max',
        'Round-robin domain cycling',
        'Perfect for full-time work',
        'Flexible weekend study'
      ],
      bestFor: 'Working professionals',
      recommended: preferences?.studyMode === 'working-professional'
    },
    {
      id: 'custom',
      name: 'Custom Plan',
      icon: Zap,
      color: 'bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800',
      description: 'Build your own timeline and select specific domains',
      timeline: '8-16 weeks',
      weeklyCommitment: 'Your choice',
      dailyCommitment: 'Your choice',
      benefits: [
        'Complete control over timeline',
        'Select domains to prioritize',
        'Adjust based on progress',
        'Maximum flexibility'
      ],
      bestFor: 'Self-directed learners',
      recommended: preferences?.studyMode === 'custom'
    }
  ];

  const tools = [
    {
      icon: BookOpen,
      name: 'Study Plan',
      description: 'Your weekly roadmap with interactive lessons following the READ → FOCUS → APPLY → REINFORCE framework.',
      link: `/app/${examTrack}/study-plan`
    },
    {
      icon: Brain,
      name: 'Practice Quiz',
      description: 'Test your knowledge with domain-specific or exam-style quizzes with instant feedback.',
      link: `/app/${examTrack}/quiz`
    },
    {
      icon: ClipboardCheck,
      name: 'Flashcards',
      description: 'Master key concepts with spaced repetition and multiple study modes.',
      link: `/app/${examTrack}/flashcards`
    },
    {
      icon: GraduationCap,
      name: 'Practice Exam',
      description: 'Full exam simulator with timer and detailed score breakdown by domain.',
      link: `/app/${examTrack}/exam`
    },
    {
      icon: FileText,
      name: 'Study Notes',
      description: 'Rich text editor for taking notes each week with auto-save.',
      link: `/app/${examTrack}/notes`
    },
    {
      icon: BarChart3,
      name: 'Progress Dashboard',
      description: 'Track improvement with visual analytics and domain mastery insights.',
      link: `/app/${examTrack}/progress`
    },
    ...(examTrack === 'fs' ? [{
      icon: BookMarked,
      name: 'Resources',
      description: 'Access formula sheets, memory techniques, and professional references.',
      link: `/app/${examTrack}/resources`
    }] : [])
  ];

  const quickTips = [
    {
      title: 'Start with the Pretest',
      description: 'Take the diagnostic pretest first to identify your weak areas.',
      step: 1
    },
    {
      title: 'Choose Your Study Mode',
      description: 'Select a study mode that matches your schedule and learning style.',
      step: 2
    },
    {
      title: 'Follow the Weekly Schedule',
      description: 'Complete each week\'s lessons, quizzes, and notes to stay on track.',
      step: 3
    },
    {
      title: 'Review Weak Domains',
      description: 'Use Practice Quiz and Progress Dashboard to identify and focus on weak areas.',
      step: 4
    }
  ];

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <GraduationCap className="h-7 w-7" />
          </div>
          <div>
            <h1 className="text-3xl font-bold" data-testid="dashboard-title">{examName} Dashboard</h1>
            <p className="text-muted-foreground">{examInfo?.description || 'Your personalized study hub'}</p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4" data-testid="dashboard-tabs">
          <TabsTrigger value="overview" data-testid="tab-overview">Overview</TabsTrigger>
          <TabsTrigger value="coaching" data-testid="tab-coaching">AI Coaching</TabsTrigger>
          <TabsTrigger value="tools" data-testid="tab-tools">Study Tools</TabsTrigger>
          <TabsTrigger value="planner" data-testid="tab-planner">Planner</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card data-testid="stat-lessons">
              <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Lessons Progress</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{completedLessons}/{lessonCount}</div>
                <Progress value={progressPercent} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-1">{progressPercent}% complete</p>
              </CardContent>
            </Card>

            <Card data-testid="stat-domains">
              <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Domains</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{domainCount}</div>
                <p className="text-xs text-muted-foreground mt-1">Knowledge areas to master</p>
              </CardContent>
            </Card>

            <Card data-testid="stat-streak">
              <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Study Streak</CardTitle>
                <Flame className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.currentStreak || 0} days</div>
                <p className="text-xs text-muted-foreground mt-1">Keep it going!</p>
              </CardContent>
            </Card>

            <Card data-testid="stat-xp">
              <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total XP</CardTitle>
                <Trophy className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.totalXp || 0}</div>
                <p className="text-xs text-muted-foreground mt-1">Experience earned</p>
              </CardContent>
            </Card>

            <Card data-testid="stat-exam-countdown" className={daysUntilExam !== null && daysUntilExam <= 30 ? 'border-orange-400 dark:border-orange-600' : ''}>
              <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Days Until Exam</CardTitle>
                <CalendarDays className={`h-4 w-4 ${daysUntilExam !== null && daysUntilExam <= 30 ? 'text-orange-500' : 'text-muted-foreground'}`} />
              </CardHeader>
              <CardContent>
                {daysUntilExam !== null ? (
                  <>
                    <div className={`text-2xl font-bold ${daysUntilExam <= 30 ? 'text-orange-600 dark:text-orange-400' : ''}`}>
                      {daysUntilExam} days
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {daysUntilExam <= 7 ? 'Final push — you got this!' : daysUntilExam <= 30 ? 'Getting close — stay consistent' : 'Stay on track with your plan'}
                    </p>
                  </>
                ) : (
                  <>
                    <div className="text-2xl font-bold text-muted-foreground">—</div>
                    <Link href={`/app/${examTrack}/settings`}>
                      <p className="text-xs text-primary mt-1 hover:underline cursor-pointer">Set exam date →</p>
                    </Link>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {quickActions.map((action) => (
                <Link key={action.href} href={action.href}>
                  <Card className="hover-elevate cursor-pointer h-full" data-testid={action.testId}>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <action.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <CardTitle className="text-base">{action.label}</CardTitle>
                          <CardDescription className="text-xs">{action.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card data-testid="card-progress-overview">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Progress Overview
                </CardTitle>
                <CardDescription>Your learning journey at a glance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Overall Progress</span>
                      <span className="text-muted-foreground">{progressPercent}%</span>
                    </div>
                    <Progress value={progressPercent} />
                  </div>
                  <Link href={`/app/${examTrack}/progress`}>
                    <Button variant="outline" className="w-full mt-4" data-testid="button-view-progress">
                      View Detailed Progress
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card data-testid="card-exam-info">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Exam Information
                </CardTitle>
                <CardDescription>About the {examName}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Exam Type</span>
                    <Badge variant="secondary">{examTrack.toUpperCase()}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Total Lessons</span>
                    <span className="font-medium">{lessonCount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Knowledge Domains</span>
                    <span className="font-medium">{domainCount}</span>
                  </div>
                  {examTrack === 'fs' && (
                    <Link href={`/app/${examTrack}/resources`}>
                      <Button variant="outline" className="w-full mt-4" data-testid="button-view-resources">
                        View Study Resources
                      </Button>
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="coaching" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">AI Study Coaching</h2>
              <p className="text-muted-foreground">Personalized guidance, quests, and review optimization</p>
            </div>
            <Badge variant="outline">Personalized for you</Badge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-1">
              <StudyCoachBriefing />
            </div>
            <div className="lg:col-span-1">
              <DailyQuestsPanel />
            </div>
            <div className="lg:col-span-1">
              <ReviewAlerts />
            </div>
          </div>

          {memoryHealth && memoryHealth.length > 0 && (
            <Card data-testid="card-plan-health">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  Study Plan Health
                </CardTitle>
                <CardDescription>Memory retention across completed weeks (Ebbinghaus spaced review)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 flex-wrap">
                  {(() => {
                    const fresh = memoryHealth.filter(h => h.status === 'fresh').length;
                    const fading = memoryHealth.filter(h => h.status === 'fading').length;
                    const stale = memoryHealth.filter(h => h.status === 'stale').length;
                    return (
                      <>
                        <div className="flex items-center gap-1.5 bg-green-50 dark:bg-green-950 rounded-lg px-3 py-1.5" data-testid="stat-plan-health-fresh">
                          <div className="w-2 h-2 rounded-full bg-green-500" />
                          <span className="text-sm font-medium text-green-700 dark:text-green-300">{fresh} Fresh</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-yellow-50 dark:bg-yellow-950 rounded-lg px-3 py-1.5" data-testid="stat-plan-health-fading">
                          <div className="w-2 h-2 rounded-full bg-yellow-500" />
                          <span className="text-sm font-medium text-yellow-700 dark:text-yellow-300">{fading} Fading</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-red-50 dark:bg-red-950 rounded-lg px-3 py-1.5" data-testid="stat-plan-health-stale">
                          <div className="w-2 h-2 rounded-full bg-red-500" />
                          <span className="text-sm font-medium text-red-700 dark:text-red-300">{stale} Stale</span>
                        </div>
                        {daysUntilExam && (
                          <div className="ml-auto flex items-center gap-1.5 text-sm text-muted-foreground">
                            <CalendarDays className="h-4 w-4" />
                            {daysUntilExam} days to exam
                          </div>
                        )}
                      </>
                    );
                  })()}
                </div>

                {memoryHealth.filter(h => h.status !== 'fresh').length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Weeks needing review:</p>
                    {memoryHealth
                      .filter(h => h.status !== 'fresh')
                      .sort((a, b) => a.health - b.health)
                      .slice(0, 3)
                      .map(h => (
                        <div
                          key={h.weekNumber}
                          className={`flex items-center gap-3 rounded-lg p-3 ${h.status === 'stale' ? 'bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900' : 'bg-yellow-50 dark:bg-yellow-950/50 border border-yellow-200 dark:border-yellow-900'}`}
                          data-testid={`plan-health-row-${h.weekNumber}`}
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className={`text-sm font-semibold ${h.status === 'stale' ? 'text-red-700 dark:text-red-300' : 'text-yellow-700 dark:text-yellow-300'}`}>
                                Week {h.weekNumber}
                              </span>
                              <Badge variant="outline" className={`text-xs ${h.status === 'stale' ? 'border-red-400 text-red-600 dark:text-red-400' : 'border-yellow-400 text-yellow-600 dark:text-yellow-400'}`}>
                                {h.health}% memory
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground mt-0.5 truncate">
                              {h.domains.slice(0, 2).join(' · ')}{h.domains.length > 2 ? ` +${h.domains.length - 2}` : ''}
                            </p>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            className={`shrink-0 text-xs gap-1 ${h.status === 'stale' ? 'border-red-400 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20' : 'border-yellow-400 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20'}`}
                            onClick={() => setReviewWeekInfo({ week: h.weekNumber, title: `Week ${h.weekNumber}`, domains: h.domains })}
                            data-testid={`button-review-health-week-${h.weekNumber}`}
                          >
                            <RefreshCw className="h-3 w-3" />
                            {h.status === 'stale' ? 'Review Now' : 'Review'}
                          </Button>
                        </div>
                      ))
                    }
                  </div>
                )}

                {memoryHealth.filter(h => h.status !== 'fresh').length === 0 && (
                  <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950 rounded-lg px-3 py-2">
                    <CheckCircle2 className="h-4 w-4" />
                    All completed weeks are in great shape — keep it up!
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <WeeklyLeaderboard compact />
            <ForgettingCurveChart compact />
          </div>

          {reviewWeekInfo && (
            <WeekReviewModal
              weekNumber={reviewWeekInfo.week}
              weekTitle={reviewWeekInfo.title}
              domains={reviewWeekInfo.domains}
              examTrack={examTrack}
              open={!!reviewWeekInfo}
              onClose={() => setReviewWeekInfo(null)}
            />
          )}
        </TabsContent>

        <TabsContent value="tools" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Your Study Tools</h2>
            <p className="text-muted-foreground">
              Each tool is designed to support different parts of your learning journey. Use them together for maximum effectiveness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tools.map((tool, i) => {
              const Icon = tool.icon;
              return (
                <Card key={i} className="p-4 space-y-3 flex flex-col hover-elevate" data-testid={`tool-card-${tool.name.toLowerCase().replace(/\s+/g, '-')}`}>
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <h3 className="font-semibold">{tool.name}</h3>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground flex-1">{tool.description}</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setLocation(tool.link)}
                    data-testid={`button-open-${tool.name.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    Open {tool.name}
                  </Button>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="planner" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Quick Start (4 Steps)</h2>
            <p className="text-muted-foreground">Follow these steps to get started on your exam preparation journey.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickTips.map((tip) => (
              <Card key={tip.step} className="p-4 space-y-3 hover-elevate" data-testid={`quick-tip-${tip.step}`}>
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-semibold">
                    {tip.step}
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="font-semibold">{tip.title}</h3>
                    <p className="text-sm text-muted-foreground">{tip.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Choose Your Study Mode</h2>
            <p className="text-muted-foreground">
              Select the strategy that best fits your schedule and learning goals.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {strategies.map((strategy) => {
                const StrategyIcon = strategy.icon;
                return (
                  <Card
                    key={strategy.id}
                    className={`p-6 space-y-4 border-2 cursor-pointer transition-all hover-elevate ${
                      strategy.recommended
                        ? strategy.color + ' ring-2 ring-primary'
                        : 'border-border'
                    }`}
                    data-testid={`card-strategy-${strategy.id}`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                          <StrategyIcon className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="font-bold text-lg">{strategy.name}</h3>
                      </div>
                      {strategy.recommended && (
                        <Badge variant="default" data-testid={`badge-recommended-${strategy.id}`}>
                          Current
                        </Badge>
                      )}
                    </div>

                    <p className="text-sm text-muted-foreground">{strategy.description}</p>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-primary" />
                        <span className="font-medium">{strategy.weeklyCommitment}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="font-medium">Daily: {strategy.dailyCommitment}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-muted-foreground">KEY BENEFITS</p>
                      <ul className="space-y-1">
                        {strategy.benefits.map((benefit, i) => (
                          <li key={i} className="text-sm flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-1 pt-2 border-t border-border">
                      <p className="text-xs font-semibold text-muted-foreground">BEST FOR</p>
                      <p className="text-sm">{strategy.bestFor}</p>
                    </div>

                    <Button
                      onClick={() => setLocation(`/app/${examTrack}/study-plan`)}
                      className="w-full"
                      variant={strategy.recommended ? "default" : "outline"}
                      data-testid={`button-select-${strategy.id}`}
                    >
                      {strategy.recommended ? 'Current Mode' : 'Select Mode'}
                    </Button>
                  </Card>
                );
              })}
            </div>
          </div>

          <div className="space-y-4 bg-accent/5 border border-border rounded-lg p-6">
            <div className="flex gap-3">
              <Lightbulb className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
              <div className="space-y-3">
                <h3 className="font-bold text-lg">Tips for Success</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><span className="font-medium text-foreground">Consistency matters</span> - Study a little bit each day rather than cramming</li>
                  <li><span className="font-medium text-foreground">Mix your tools</span> - Combine lessons, quizzes, and flashcards for better retention</li>
                  <li><span className="font-medium text-foreground">Track progress</span> - Check your Progress Dashboard weekly to stay motivated</li>
                  <li><span className="font-medium text-foreground">Focus on weak areas</span> - Use Result-Driven mode or manually focus extra time where needed</li>
                  <li><span className="font-medium text-foreground">Take the practice exam</span> - Use it as a final check before the real exam</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-4 bg-primary/10 border border-primary/20 rounded-lg p-6 text-center">
            <h3 className="font-bold text-lg">Ready to Get Started?</h3>
            <p className="text-muted-foreground">
              Choose a study mode above and head to your Study Plan to begin. Your journey to passing the {examName} starts here!
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Button onClick={() => setLocation(`/app/${examTrack}/pretest`)} data-testid="button-take-pretest">
                Take Diagnostic Pretest
              </Button>
              <Button onClick={() => setLocation(`/app/${examTrack}/study-plan`)} variant="outline" data-testid="button-start-study-plan">
                Go to Study Plan
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
