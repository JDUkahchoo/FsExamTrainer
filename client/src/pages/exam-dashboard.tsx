import { useParams, Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Brain, ClipboardCheck, GraduationCap, BarChart3, Flame, Target, Trophy } from 'lucide-react';
import { useExamTrack } from '@/contexts/exam-track-context';
import { EXAM_TRACKS } from '@shared/schema';

interface StudyStats {
  lessonsCompleted: number;
  totalLessons: number;
  flashcardsReviewed: number;
  quizzesTaken: number;
  currentStreak: number;
  totalXp: number;
}

export default function ExamDashboard() {
  const params = useParams<{ examTrack: string }>();
  const examTrack = params.examTrack || 'fs';
  const { examName, lessonCount, domainCount } = useExamTrack();
  const examInfo = EXAM_TRACKS.find(t => t.id === examTrack);

  const { data: stats } = useQuery<StudyStats>({
    queryKey: ['/api/study-stats', examTrack],
  });

  const { data: lessonsProgress } = useQuery<{ completed: number; total: number }>({
    queryKey: ['/api/lessons/progress', examTrack],
  });

  const completedLessons = lessonsProgress?.completed || 0;
  const progressPercent = lessonCount > 0 ? Math.round((completedLessons / lessonCount) * 100) : 0;

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

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8">
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

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
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
      </div>

      <div className="mb-8">
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
              <Link href={`/app/${examTrack}/resources`}>
                <Button variant="outline" className="w-full mt-4" data-testid="button-view-resources">
                  View Study Resources
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
