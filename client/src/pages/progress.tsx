import { useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BarChart3, Target, Brain, Calendar, TrendingUp, Award } from 'lucide-react';
import { getDomainConfig } from '@/lib/domains';
import { getWeekProgress, getQuizResults, getFlashcardMastery, getPracticeExams } from '@/lib/localStorage';
import { DOMAINS } from '@shared/schema';
import type { Domain } from '@shared/schema';

export default function ProgressPage() {
  // Calculate real stats from localStorage
  const stats = useMemo(() => {
    const weekProgress = getWeekProgress();
    const quizResults = getQuizResults();
    const flashcardMastery = getFlashcardMastery();
    const practiceExams = getPracticeExams();

    // Weeks completed
    const weeksCompleted = Object.keys(weekProgress).length;

    // Quiz stats
    const questionsAnswered = quizResults.length;
    const questionsCorrect = quizResults.filter(r => r.isCorrect).length;

    // Flashcard stats
    const flashcardsReviewed = flashcardMastery.size;
    const flashcardsMastered = flashcardMastery.size; // All in set are considered mastered

    // Practice exams
    const practiceExamsTaken = practiceExams.length;
    const lastExam = practiceExams[practiceExams.length - 1];
    const lastExamScore = lastExam
      ? Math.round((lastExam.correctAnswers / lastExam.totalQuestions) * 100)
      : 0;

    // Domain-specific stats
    const domainProgress: Record<string, { questionsAnswered: number; questionsCorrect: number; cardsReviewed: number }> = {};
    
    quizResults.forEach(result => {
      if (!domainProgress[result.domain]) {
        domainProgress[result.domain] = { questionsAnswered: 0, questionsCorrect: 0, cardsReviewed: 0 };
      }
      domainProgress[result.domain].questionsAnswered++;
      if (result.isCorrect) {
        domainProgress[result.domain].questionsCorrect++;
      }
    });

    // Ensure all domains have entries
    DOMAINS.forEach(domain => {
      if (!domainProgress[domain]) {
        domainProgress[domain] = { questionsAnswered: 0, questionsCorrect: 0, cardsReviewed: 0 };
      }
    });

    return {
      totalStudyDays: weeksCompleted * 7, // Approximate
      currentStreak: weeksCompleted > 0 ? Math.min(weeksCompleted, 7) : 0,
      longestStreak: weeksCompleted * 2, // Approximate
      weeksCompleted,
      questionsAnswered,
      questionsCorrect,
      flashcardsReviewed,
      flashcardsMastered,
      practiceExamsTaken,
      lastExamScore,
      domainProgress
    };
  }, []);

  const mockStats = stats;
  const mockDomainProgress = stats.domainProgress as Record<Domain, { questionsAnswered: number; questionsCorrect: number; cardsReviewed: number }>;

  const overallAccuracy = mockStats.questionsAnswered > 0
    ? Math.round((mockStats.questionsCorrect / mockStats.questionsAnswered) * 100)
    : 0;

  const flashcardMastery = mockStats.flashcardsReviewed > 0
    ? Math.round((mockStats.flashcardsMastered / mockStats.flashcardsReviewed) * 100)
    : 0;

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
              <p className="text-3xl font-bold text-foreground">{mockStats.currentStreak}</p>
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
              <p className="text-3xl font-bold text-foreground">{overallAccuracy}%</p>
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
              <p className="text-3xl font-bold text-foreground">{flashcardMastery}%</p>
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
              <p className="text-3xl font-bold text-foreground">{mockStats.lastExamScore}%</p>
              <p className="text-sm text-muted-foreground">Last Exam</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Study Activity */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Study Activity
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Total Study Days</span>
              <span className="text-lg font-semibold text-foreground">{mockStats.totalStudyDays}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Longest Streak</span>
              <span className="text-lg font-semibold text-foreground">{mockStats.longestStreak} days</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Weeks Completed</span>
              <span className="text-lg font-semibold text-foreground">{mockStats.weeksCompleted}/16</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Questions Answered</span>
              <span className="text-lg font-semibold text-foreground">{mockStats.questionsAnswered}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Flashcards Reviewed</span>
              <span className="text-lg font-semibold text-foreground">{mockStats.flashcardsReviewed}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Practice Exams Taken</span>
              <span className="text-lg font-semibold text-foreground">{mockStats.practiceExamsTaken}</span>
            </div>
          </div>
        </Card>

        {/* Overall Performance */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Overall Performance
          </h2>
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Quiz Accuracy</span>
                <span className="text-sm font-semibold text-foreground">{overallAccuracy}%</span>
              </div>
              <Progress value={overallAccuracy} className="h-3" />
              <p className="text-xs text-muted-foreground mt-1">
                {mockStats.questionsCorrect} correct out of {mockStats.questionsAnswered} answered
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Flashcard Mastery</span>
                <span className="text-sm font-semibold text-foreground">{flashcardMastery}%</span>
              </div>
              <Progress value={flashcardMastery} className="h-3" />
              <p className="text-xs text-muted-foreground mt-1">
                {mockStats.flashcardsMastered} mastered out of {mockStats.flashcardsReviewed} reviewed
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Study Plan Progress</span>
                <span className="text-sm font-semibold text-foreground">{Math.round((mockStats.weeksCompleted / 16) * 100)}%</span>
              </div>
              <Progress value={(mockStats.weeksCompleted / 16) * 100} className="h-3" />
              <p className="text-xs text-muted-foreground mt-1">
                {mockStats.weeksCompleted} weeks completed out of 16
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Domain Mastery */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-foreground mb-6">Domain Mastery</h2>
        <div className="space-y-4">
          {DOMAINS.map(domain => {
            const stats = mockDomainProgress[domain];
            const accuracy = stats.questionsAnswered > 0
              ? Math.round((stats.questionsCorrect / stats.questionsAnswered) * 100)
              : 0;
            const domainConfig = getDomainConfig(domain);
            const Icon = domainConfig.icon;

            return (
              <div key={domain} className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className={`${domainConfig.bgColor} ${domainConfig.textColor} border-transparent`}>
                    <Icon className="w-3 h-3 mr-1" />
                    {domain}
                  </Badge>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span>{stats.questionsAnswered} questions</span>
                    <span>{stats.cardsReviewed} cards</span>
                    <span className="font-semibold text-foreground">{accuracy}%</span>
                  </div>
                </div>
                <Progress value={accuracy} className="h-2" />
              </div>
            );
          })}
        </div>
      </Card>

      {/* Recommendations */}
      <Card className="mt-6 p-6 bg-primary/5 border-primary/20">
        <h3 className="font-semibold text-foreground mb-3">Recommendations</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            <span>Focus on <strong className="text-foreground">Geodesy, GPS, Astronomy</strong> - only 4 questions answered. Review Week 7-8 materials.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            <span>Great progress on study streak! Keep it up to maintain consistency.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            <span>Consider taking another practice exam to track improvement.</span>
          </li>
        </ul>
      </Card>
    </div>
  );
}
