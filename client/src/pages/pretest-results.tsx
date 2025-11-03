import { useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, AlertTriangle, TrendingUp, BookOpen, Target } from 'lucide-react';
import { getDomainConfig } from '@/lib/domains';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useLocation } from 'wouter';
import type { Domain, PretestResult } from '@shared/schema';

export default function PretestResultsPage() {
  const [, setLocation] = useLocation();

  // Fetch latest pretest result
  const { data: pretestResult, isLoading, isError, error } = useQuery<PretestResult>({
    queryKey: ['/api/pretest/latest'],
  });

  // Mutation to update user preferences (study mode)
  const updatePreferencesMutation = useMutation({
    mutationFn: (data: { studyMode: string }) =>
      apiRequest('PUT', '/api/preferences', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/preferences'] });
    }
  });

  const handleChooseStandard = async () => {
    await updatePreferencesMutation.mutateAsync({ studyMode: 'standard' });
    setLocation('/study-plan');
  };

  const handleChoosePersonalized = async () => {
    await updatePreferencesMutation.mutateAsync({ studyMode: 'personalized' });
    setLocation('/study-plan');
  };

  const handleChooseSelfDirected = async () => {
    await updatePreferencesMutation.mutateAsync({ studyMode: 'self-directed' });
    setLocation('/resources');
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="p-8">
          <p>Loading results...</p>
        </Card>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="p-8">
          <Alert variant="destructive" className="mb-4">
            <AlertTriangle className="w-4 h-4" />
            <AlertDescription>
              Failed to load pretest results. {error?.message || 'Please try again later.'}
            </AlertDescription>
          </Alert>
          <Button onClick={() => setLocation('/pretest')} data-testid="button-retake-pretest">
            Retake Diagnostic Test
          </Button>
        </Card>
      </div>
    );
  }

  if (!pretestResult) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="p-8">
          <p>No pretest results found. Please take the pretest first.</p>
          <Button onClick={() => setLocation('/pretest')} className="mt-4" data-testid="button-take-pretest">
            Take Diagnostic Test
          </Button>
        </Card>
      </div>
    );
  }

  const domainScores = pretestResult.domainScores as Record<Domain, { correct: number; total: number }>;
  const overallScore = Math.round((pretestResult.totalCorrect / pretestResult.totalQuestions) * 100);

  // Sort domains by performance (weakest first)
  const sortedDomains = Object.entries(domainScores)
    .sort(([, a], [, b]) => {
      const percentA = (a.correct / a.total) * 100;
      const percentB = (b.correct / b.total) * 100;
      return percentA - percentB;
    });

  // Identify strengths (>=75%) and weaknesses (<60%)
  const strengths = sortedDomains.filter(([, scores]) => (scores.correct / scores.total) * 100 >= 75);
  const weaknesses = sortedDomains.filter(([, scores]) => (scores.correct / scores.total) * 100 < 60);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Overall Score */}
      <Card className="p-8 mb-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-4 rounded-lg bg-primary/10">
            <Target className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold" data-testid="text-results-title">Diagnostic Results</h1>
            <p className="text-muted-foreground">Your personalized learning path awaits</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-card rounded-lg border">
            <div className="text-4xl font-bold text-primary mb-1" data-testid="text-overall-score">{overallScore}%</div>
            <div className="text-sm text-muted-foreground">Overall Score</div>
          </div>
          <div className="text-center p-4 bg-card rounded-lg border">
            <div className="text-4xl font-bold mb-1">{pretestResult.totalCorrect}/{pretestResult.totalQuestions}</div>
            <div className="text-sm text-muted-foreground">Correct Answers</div>
          </div>
          <div className="text-center p-4 bg-card rounded-lg border">
            <div className="text-4xl font-bold mb-1">{Object.keys(domainScores).length}</div>
            <div className="text-sm text-muted-foreground">Domains Assessed</div>
          </div>
        </div>

        {overallScore >= 70 && (
          <Alert className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
            <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
            <AlertDescription className="text-green-800 dark:text-green-200">
              Great job! You have a strong foundation. We'll create a personalized plan to strengthen your weaker areas.
            </AlertDescription>
          </Alert>
        )}
        {overallScore >= 50 && overallScore < 70 && (
          <Alert>
            <TrendingUp className="w-4 h-4" />
            <AlertDescription>
              Solid start! You have good knowledge in some areas. Let's focus your study time on domains that need more attention.
            </AlertDescription>
          </Alert>
        )}
        {overallScore < 50 && (
          <Alert>
            <BookOpen className="w-4 h-4" />
            <AlertDescription>
              Don't worry - everyone starts somewhere! We'll create a comprehensive study plan to build your knowledge systematically.
            </AlertDescription>
          </Alert>
        )}
      </Card>

      {/* Domain Breakdown */}
      <Card className="p-8 mb-6">
        <h2 className="text-2xl font-bold mb-4">Domain Performance</h2>
        <div className="space-y-4">
          {sortedDomains.map(([domain, scores]) => {
            const domainConfig = getDomainConfig(domain as Domain);
            const percent = Math.round((scores.correct / scores.total) * 100);
            
            return (
              <div key={domain} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge className={`${domainConfig.bgColor} ${domainConfig.textColor} ${domainConfig.borderColor}`}>
                      {domainConfig.name}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {scores.correct} / {scores.total} correct
                    </span>
                  </div>
                  <span className="font-semibold" data-testid={`text-domain-score-${domain}`}>
                    {percent}%
                  </span>
                </div>
                <Progress 
                  value={percent} 
                  className="h-2"
                />
              </div>
            );
          })}
        </div>
      </Card>

      {/* Strengths and Weaknesses */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Strengths */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
            <h3 className="text-xl font-bold">Strengths</h3>
          </div>
          {strengths.length > 0 ? (
            <ul className="space-y-2">
              {strengths.map(([domain, scores]) => {
                const domainConfig = getDomainConfig(domain as Domain);
                const percent = Math.round((scores.correct / scores.total) * 100);
                return (
                  <li key={domain} className="flex items-center justify-between">
                    <span className={domainConfig.textColor}>{domainConfig.name}</span>
                    <span className="text-sm font-semibold">{percent}%</span>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">
              Keep practicing! Strengths will develop as you study.
            </p>
          )}
        </Card>

        {/* Focus Areas */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            <h3 className="text-xl font-bold">Focus Areas</h3>
          </div>
          {weaknesses.length > 0 ? (
            <ul className="space-y-2">
              {weaknesses.map(([domain, scores]) => {
                const domainConfig = getDomainConfig(domain as Domain);
                const percent = Math.round((scores.correct / scores.total) * 100);
                return (
                  <li key={domain} className="flex items-center justify-between">
                    <span className={domainConfig.textColor}>{domainConfig.name}</span>
                    <span className="text-sm font-semibold">{percent}%</span>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">
              Great! You have a solid foundation across all domains.
            </p>
          )}
        </Card>
      </div>

      {/* Study Mode Selection */}
      <Card className="p-8">
        <h2 className="text-2xl font-bold mb-4">Choose Your Study Path</h2>
        <p className="text-muted-foreground mb-6">
          Based on your results, here are three study approaches. Choose the one that fits your learning style:
        </p>

        <div className="grid md:grid-cols-3 gap-4">
          {/* Standard 16-week */}
          <Card className="p-6 hover-elevate cursor-pointer" onClick={handleChooseStandard}>
            <h3 className="font-bold text-lg mb-2">Standard Plan</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Follow the structured 16-week program covering all domains systematically.
            </p>
            <Button className="w-full" variant="outline" data-testid="button-choose-standard">
              Choose Standard
            </Button>
          </Card>

          {/* Personalized */}
          <Card className="p-6 hover-elevate cursor-pointer border-primary" onClick={handleChoosePersonalized}>
            <Badge className="mb-2">Recommended</Badge>
            <h3 className="font-bold text-lg mb-2">Personalized Plan</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Custom week order prioritizing your weaker domains first, based on diagnostic results.
            </p>
            <Button className="w-full" data-testid="button-choose-personalized">
              Choose Personalized
            </Button>
          </Card>

          {/* Self-Directed */}
          <Card className="p-6 hover-elevate cursor-pointer" onClick={handleChooseSelfDirected}>
            <h3 className="font-bold text-lg mb-2">Self-Directed</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Skip the study plan. Access quizzes, flashcards, and resources at your own pace.
            </p>
            <Button className="w-full" variant="outline" data-testid="button-choose-self-directed">
              Choose Self-Directed
            </Button>
          </Card>
        </div>
      </Card>
    </div>
  );
}
