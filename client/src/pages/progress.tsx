import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, Target, Brain, Calendar, TrendingUp, Award, Loader2, Clock, CheckCircle, FileText, GraduationCap, BookOpen, Settings } from 'lucide-react';
import { getDomainConfig } from '@/lib/domains';
import { useQuery } from '@tanstack/react-query';
import { DOMAINS } from '@shared/schema';
import type { Domain, QuizSession, PracticeExam, UserPreferences } from '@shared/schema';
import ProgressHeader from '@/components/ProgressHeader';
import { Link } from 'wouter';

export default function ProgressPage() {
  const { data: stats, isLoading } = useQuery<{
    totalStudyDays: number;
    currentStreak: number;
    longestStreak: number;
    weeksCompleted: number;
    questionsAnswered: number;
    questionsCorrect: number;
    flashcardsReviewed: number;
    flashcardsMastered: number;
    practiceExamsTaken: number;
    lastExamScore: number;
  }>({ 
    queryKey: ['/api/progress/stats'],
    refetchOnMount: 'always'
  });

  const { data: quizStats } = useQuery<{
    totalAnswered: number;
    totalCorrect: number;
    accuracy: number;
    domainStats: Record<string, { answered: number; correct: number; accuracy: number }>;
  }>({ 
    queryKey: ['/api/quiz/stats'],
    refetchOnMount: 'always'
  });

  const { data: quizSessions } = useQuery<QuizSession[]>({
    queryKey: ['/api/quiz/sessions'],
    refetchOnMount: 'always'
  });

  const { data: examHistory } = useQuery<PracticeExam[]>({
    queryKey: ['/api/exams'],
    refetchOnMount: 'always'
  });

  const { data: preferences } = useQuery<UserPreferences>({
    queryKey: ['/api/preferences'],
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const overallAccuracy = stats && stats.questionsAnswered > 0
    ? Math.round((stats.questionsCorrect / stats.questionsAnswered) * 100)
    : 0;

  const flashcardMastery = stats && stats.flashcardsReviewed > 0
    ? Math.round((stats.flashcardsMastered / stats.flashcardsReviewed) * 100)
    : 0;

  const domainProgress = quizStats?.domainStats || {};

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2" data-testid="heading-progress">Your Progress</h1>
        <p className="text-muted-foreground">
          Track your study progress, streaks, and performance across all domains.
        </p>
      </div>

      {/* Gamification Header */}
      <div className="mb-8">
        <ProgressHeader />
      </div>

      {/* Study Mode Section */}
      {preferences && (
        <Card className="p-6 mb-8">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4 flex-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 shrink-0">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-foreground">Study Mode</h3>
                  <Badge variant="outline" data-testid="badge-study-mode">
                    {preferences.studyMode === 'standard' && 'Standard Plan'}
                    {preferences.studyMode === 'personalized' && 'Personalized'}
                    {preferences.studyMode === 'self-directed' && 'Self-Directed'}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {preferences.studyMode === 'standard' && 'Following the comprehensive 16-week structured study plan'}
                  {preferences.studyMode === 'personalized' && 'Custom plan tailored to your diagnostic pretest results'}
                  {preferences.studyMode === 'self-directed' && 'Study at your own pace with access to all resources'}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2 shrink-0">
              <Link href="/pretest">
                <Button variant="outline" size="sm" data-testid="button-retake-pretest">
                  <Target className="h-4 w-4 mr-2" />
                  {preferences.hasCompletedPretest ? 'Retake Pretest' : 'Take Pretest'}
                </Button>
              </Link>
              {preferences.hasCompletedPretest && (
                <Link href="/pretest-results">
                  <Button variant="ghost" size="sm" data-testid="button-view-results">
                    <Settings className="h-4 w-4 mr-2" />
                    View Results
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </Card>
      )}

      {/* Overall Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-3xl font-bold text-foreground" data-testid="stat-streak">{stats?.currentStreak || 0}</p>
              <p className="text-sm text-muted-foreground">Day Streak</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success/10">
              <Target className="h-6 w-6 text-success" />
            </div>
            <div>
              <p className="text-3xl font-bold text-foreground" data-testid="stat-accuracy">{overallAccuracy}%</p>
              <p className="text-sm text-muted-foreground">Quiz Accuracy</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-domain-computations/10">
              <Brain className="h-6 w-6 text-domain-computations-fg" />
            </div>
            <div>
              <p className="text-3xl font-bold text-foreground" data-testid="stat-mastery">{flashcardMastery}%</p>
              <p className="text-sm text-muted-foreground">Cards Mastered</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-domain-boundary/10">
              <Award className="h-6 w-6 text-domain-boundary-fg" />
            </div>
            <div>
              <p className="text-3xl font-bold text-foreground" data-testid="stat-weeks">{stats?.weeksCompleted || 0}</p>
              <p className="text-sm text-muted-foreground">Weeks Completed</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Tabbed Interface */}
      <Tabs defaultValue="quiz" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="quiz" className="flex items-center gap-2" data-testid="tab-quiz-history">
            <FileText className="h-4 w-4" />
            Quiz History
          </TabsTrigger>
          <TabsTrigger value="exam" className="flex items-center gap-2" data-testid="tab-exam-history">
            <GraduationCap className="h-4 w-4" />
            Exam History
          </TabsTrigger>
          <TabsTrigger value="domain" className="flex items-center gap-2" data-testid="tab-domain-mastery">
            <BarChart3 className="h-4 w-4" />
            Domain Mastery
          </TabsTrigger>
        </TabsList>

        {/* Quiz History Tab */}
        <TabsContent value="quiz" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <FileText className="h-5 w-5" />
              All Quiz Sessions
            </h2>
            {quizSessions && quizSessions.length > 0 ? (
              <div className="space-y-3">
                {quizSessions.map((session, index) => {
                  const accuracy = session.totalQuestions > 0 
                    ? (session.correctAnswers / session.totalQuestions) * 100 
                    : 0;
                  const passed = accuracy >= 70;
                  const date = new Date(session.completedAt);
                  const formattedDate = date.toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit'
                  });
                  const minutes = Math.floor(session.timeSpentSeconds / 60);
                  const seconds = session.timeSpentSeconds % 60;

                  return (
                    <div 
                      key={session.id} 
                      className="flex items-center justify-between p-4 rounded-lg border border-border hover-elevate"
                      data-testid={`quiz-session-${index}`}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge variant="outline" className="text-sm">
                            {session.domain === 'all' ? 'All Domains' : session.domain}
                          </Badge>
                          <span className="text-sm text-muted-foreground">{formattedDate}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-muted-foreground">
                            {session.correctAnswers}/{session.totalQuestions} correct
                          </span>
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {minutes}m {seconds}s
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge 
                          variant={passed ? "default" : "secondary"}
                          className="min-w-[60px] justify-center"
                        >
                          {Math.round(accuracy)}%
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">
                No quiz sessions yet. Start practicing to track your progress!
              </p>
            )}
          </Card>
        </TabsContent>

        {/* Exam History Tab */}
        <TabsContent value="exam" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Practice Exam Results
            </h2>
            {examHistory && examHistory.length > 0 ? (
              <div className="space-y-3">
                {examHistory.map((exam, index) => {
                  const accuracy = exam.totalQuestions > 0 
                    ? (exam.correctAnswers / exam.totalQuestions) * 100 
                    : 0;
                  const passed = accuracy >= 70;
                  const date = new Date(exam.completedAt);
                  const formattedDate = date.toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit'
                  });

                  return (
                    <div 
                      key={exam.id} 
                      className="p-4 rounded-lg border border-border hover-elevate"
                      data-testid={`exam-${index}`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className="text-sm">
                            Practice Exam
                          </Badge>
                          <span className="text-sm text-muted-foreground">{formattedDate}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-muted-foreground">
                            {exam.correctAnswers}/{exam.totalQuestions} correct
                          </span>
                          <Badge 
                            variant={passed ? "default" : "secondary"}
                            className="min-w-[60px] justify-center"
                          >
                            {Math.round(accuracy)}%
                          </Badge>
                        </div>
                      </div>
                      
                      {/* Domain Breakdown */}
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-3">
                        {Object.entries(exam.domainScores as Record<string, {correct: number, total: number}>).map(([domain, scores]) => {
                          const domainAccuracy = scores.total > 0 ? (scores.correct / scores.total) * 100 : 0;
                          return (
                            <div key={domain} className="text-xs p-2 rounded bg-muted/50">
                              <div className="font-medium truncate" title={domain}>{domain}</div>
                              <div className="text-muted-foreground">{scores.correct}/{scores.total} ({Math.round(domainAccuracy)}%)</div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">
                No practice exams completed yet. Take a full 110-question exam to assess your readiness!
              </p>
            )}
          </Card>
        </TabsContent>

        {/* Domain Mastery Tab */}
        <TabsContent value="domain" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Performance by Domain
            </h2>
            <div className="space-y-6">
              {DOMAINS.map((domain) => {
                const config = getDomainConfig(domain as Domain);
                const domainData = domainProgress[domain] || { answered: 0, correct: 0, accuracy: 0 };
                const accuracy = domainData.accuracy;

                return (
                  <div key={domain} className="space-y-3" data-testid={`domain-${domain.toLowerCase().replace(/\s+/g, '-')}`}>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${config.bgColor}`} />
                        <span className="font-semibold text-foreground">{domain}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge
                          variant={accuracy >= 80 ? "default" : accuracy >= 60 ? "secondary" : "destructive"}
                          className="min-w-[60px] justify-center"
                        >
                          {Math.round(accuracy)}%
                        </Badge>
                      </div>
                    </div>
                    <Progress value={accuracy} className="h-2" />
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{domainData.answered} questions answered</span>
                      <span>{domainData.correct} correct</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Recommendations */}
      {stats && stats.questionsAnswered > 0 && (
        <Card className="p-6 mt-6 bg-primary/5 border-primary/20">
          <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Target className="h-5 w-5" />
            Personalized Recommendations
          </h2>
          <div className="space-y-2">
            {overallAccuracy < 70 && (
              <p className="text-sm text-muted-foreground">
                • Your overall accuracy is {overallAccuracy}%. Focus on reviewing explanations after each quiz.
              </p>
            )}
            {flashcardMastery < 50 && stats.flashcardsReviewed > 0 && (
              <p className="text-sm text-muted-foreground">
                • Review flashcards daily to improve your mastery percentage.
              </p>
            )}
            {(stats.practiceExamsTaken || 0) === 0 && (stats.weeksCompleted || 0) >= 4 && (
              <p className="text-sm text-muted-foreground">
                • You've completed {stats.weeksCompleted} weeks! Consider taking a practice exam to assess your readiness.
              </p>
            )}
            {Object.entries(domainProgress).some(([_, data]) => data.accuracy < 60 && data.answered >= 3) && (
              <p className="text-sm text-muted-foreground">
                • Focus on domains where your accuracy is below 60% for better exam preparation.
              </p>
            )}
            {stats.currentStreak === 0 && stats.questionsAnswered > 0 && (
              <p className="text-sm text-muted-foreground">
                • Build a study streak by practicing daily for consistent progress.
              </p>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}
