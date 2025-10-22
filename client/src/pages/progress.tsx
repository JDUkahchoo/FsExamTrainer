import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BarChart3, Target, Brain, Calendar, TrendingUp, Award, Loader2, Clock, CheckCircle } from 'lucide-react';
import { getDomainConfig } from '@/lib/domains';
import { useQuery } from '@tanstack/react-query';
import { DOMAINS } from '@shared/schema';
import type { Domain, QuizSession } from '@shared/schema';

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
  }>({ queryKey: ['/api/progress/stats'] });

  const { data: quizStats } = useQuery<{
    totalAnswered: number;
    totalCorrect: number;
    accuracy: number;
    domainStats: Record<string, { answered: number; correct: number; accuracy: number }>;
  }>({ queryKey: ['/api/quiz/stats'] });

  const { data: quizSessions } = useQuery<QuizSession[]>({
    queryKey: ['/api/quiz/sessions']
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

      {/* Detailed Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Study Activity
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Total Study Days</span>
              <span className="text-lg font-semibold text-foreground">{stats?.totalStudyDays || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Current Streak</span>
              <span className="text-lg font-semibold text-foreground">{stats?.currentStreak || 0} days</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Longest Streak</span>
              <span className="text-lg font-semibold text-foreground">{stats?.longestStreak || 0} days</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Weeks Completed</span>
              <span className="text-lg font-semibold text-foreground">{stats?.weeksCompleted || 0} / 16</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Performance Overview
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Questions Answered</span>
              <span className="text-lg font-semibold text-foreground">{stats?.questionsAnswered || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Correct Answers</span>
              <span className="text-lg font-semibold text-success">{stats?.questionsCorrect || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Flashcards Reviewed</span>
              <span className="text-lg font-semibold text-foreground">{stats?.flashcardsReviewed || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Practice Exams Taken</span>
              <span className="text-lg font-semibold text-foreground">{stats?.practiceExamsTaken || 0}</span>
            </div>
            {(stats?.practiceExamsTaken || 0) > 0 && (
              <div className="flex justify-between items-center pt-2 border-t border-border">
                <span className="text-sm text-muted-foreground">Last Exam Score</span>
                <span className="text-lg font-semibold text-primary">{stats?.lastExamScore || 0}%</span>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Domain Performance */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-foreground mb-6">Domain Performance</h2>
        <div className="space-y-6">
          {DOMAINS.map((domain) => {
            const config = getDomainConfig(domain as Domain);
            const domainData = domainProgress[domain] || { answered: 0, correct: 0, accuracy: 0 };
            const accuracy = domainData.accuracy;

            return (
              <div key={domain} className="space-y-2" data-testid={`domain-${domain.toLowerCase().replace(/\s+/g, '-')}`}>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${config.bgColor}`} />
                    <span className="font-medium text-foreground">{domain}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">
                      {domainData.answered} questions
                    </span>
                    <Badge
                      variant={accuracy >= 80 ? "default" : accuracy >= 60 ? "secondary" : "destructive"}
                      className="min-w-[60px] justify-center"
                    >
                      {Math.round(accuracy)}%
                    </Badge>
                  </div>
                </div>
                <Progress value={accuracy} className="h-2" />
              </div>
            );
          })}
        </div>
      </Card>

      {/* Quiz Session History */}
      {quizSessions && quizSessions.length > 0 && (
        <Card className="p-6 mt-6">
          <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Recent Quiz Sessions
          </h2>
          <div className="space-y-4">
            {quizSessions.slice(0, 10).map((session, index) => {
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
                  className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                  data-testid={`session-${index}`}
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
        </Card>
      )}

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
