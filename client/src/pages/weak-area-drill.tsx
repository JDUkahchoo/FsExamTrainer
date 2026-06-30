import { useState, useMemo } from 'react';
import { Link } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Target, AlertTriangle, CheckCircle2, XCircle, ArrowRight, RotateCcw, Trophy, Zap, TrendingUp, TrendingDown, BarChart3, Plane, BookOpen } from 'lucide-react';
import { getDomainConfig } from '@/lib/domains';
import { QUIZ_QUESTIONS } from '@shared/data/quizQuestions';
import { useMutation, useQuery } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { FS_DOMAINS, PS_DOMAINS } from '@shared/schema';
import type { Domain } from '@shared/schema';
import { useExamTrack } from '@/contexts/exam-track-context';
import { shuffleQuestionOptions } from '@/lib/shuffleOptions';
import { useActivityLogger } from '@/hooks/use-activity-logger';

type DrillState = 'analysis' | 'active' | 'complete';
type DrillMode = 'weak' | 'photogrammetry';

const PHOTOGRAMMETRY_TOPIC = 'Photogrammetry';
const PHOTOGRAMMETRY_READING_ID = 'fs-d2-photogrammetry';

function parseSolutionSteps(explanation: string): string[] {
  const parts = explanation
    .split(/(?=Step\s*\d+\s*[—:\-])/i)
    .map(s => s.trim())
    .filter(Boolean);
  const stepCount = parts.filter(p => /^Step\s*\d+/i.test(p)).length;
  if (stepCount < 2) {
    return [explanation.trim()];
  }
  return parts;
}

interface DomainStat {
  domain: string;
  answered: number;
  correct: number;
  accuracy: number;
}

interface QuizStatsResponse {
  totalAnswered: number;
  totalCorrect: number;
  accuracy: number;
  domainStats: Record<string, { answered: number; correct: number; accuracy: number }>;
}

export default function WeakAreaDrillPage() {
  const { examTrack } = useExamTrack();
  const availableDomains = examTrack === 'ps' ? PS_DOMAINS : FS_DOMAINS;
  const { logActivity } = useActivityLogger();

  const [drillState, setDrillState] = useState<DrillState>('analysis');
  const [drillMode, setDrillMode] = useState<DrillMode>('weak');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<Record<number, { selected: number; correct: boolean }>>({});
  const [drillQuestions, setDrillQuestions] = useState<Array<typeof QUIZ_QUESTIONS[0] & { id: string }>>([]);
  const [shuffledOptionsMap, setShuffledOptionsMap] = useState<Record<number, { options: string[]; correctIndex: number }>>({});
  const [weakDomains, setWeakDomains] = useState<DomainStat[]>([]);

  const { data: statsData, isLoading: statsLoading } = useQuery<QuizStatsResponse>({
    queryKey: ['/api/quiz/stats', examTrack],
    queryFn: async () => {
      const res = await fetch(`/api/quiz/stats?examTrack=${examTrack}`);
      if (!res.ok) throw new Error('Failed to fetch quiz stats');
      return res.json();
    },
  });

  const saveResultMutation = useMutation({
    mutationFn: (result: { questionId: string; domain: string; selectedAnswer: number; isCorrect: boolean }) =>
      apiRequest('POST', '/api/quiz/results', result),
    retry: 2,
    retryDelay: 1000,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/quiz/results'] });
      queryClient.invalidateQueries({ queryKey: ['/api/quiz/stats'] });
      queryClient.invalidateQueries({ queryKey: ['/api/progress/domain-mastery'] });
    }
  });

  const saveSessionMutation = useMutation({
    mutationFn: (session: { domain: string; examTrack: string; totalQuestions: number; correctAnswers: number; timeSpentSeconds: number }) =>
      apiRequest('POST', '/api/quiz/sessions', session),
    retry: 2,
    retryDelay: 1000,
    onSuccess: () => {
      logActivity('quiz_completion');
      queryClient.invalidateQueries({ queryKey: ['/api/quiz/sessions'] });
      queryClient.invalidateQueries({ queryKey: ['/api/quiz/stats'] });
      queryClient.invalidateQueries({ queryKey: ['/api/progress/stats'] });
      queryClient.invalidateQueries({ queryKey: ['/api/progress/overall'] });
      queryClient.invalidateQueries({ queryKey: ['/api/progress/domain-mastery'] });
    }
  });

  const domainStatsList = useMemo((): DomainStat[] => {
    if (!statsData?.domainStats) return [];
    return Object.entries(statsData.domainStats)
      .filter(([domain]) => (availableDomains as readonly string[]).includes(domain))
      .map(([domain, stats]) => ({
        domain,
        answered: stats.answered,
        correct: stats.correct,
        accuracy: Math.round(stats.accuracy * 100) / 100,
      }))
      .sort((a, b) => a.accuracy - b.accuracy);
  }, [statsData, availableDomains]);

  const identifiedWeakDomains = useMemo((): DomainStat[] => {
    if (domainStatsList.length === 0) return [];
    return domainStatsList.filter(d => d.answered >= 1).slice(0, 3);
  }, [domainStatsList]);

  const hasEnoughData = domainStatsList.some(d => d.answered >= 1);

  const photogrammetryQuestions = useMemo(
    () => QUIZ_QUESTIONS.filter(q => q.topic === PHOTOGRAMMETRY_TOPIC),
    []
  );

  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const beginDrill = (
    selected: Array<typeof QUIZ_QUESTIONS[0]>,
    idPrefix: string,
    mode: DrillMode
  ) => {
    const questionsWithIds = selected.map(q => ({
      ...q,
      id: `${idPrefix}-${QUIZ_QUESTIONS.indexOf(q)}`
    }));

    const seedBase = Date.now();
    const optionsMap: Record<number, { options: string[]; correctIndex: number }> = {};
    questionsWithIds.forEach((q, index) => {
      const s = shuffleQuestionOptions(q, seedBase + index);
      optionsMap[index] = {
        options: s.shuffledOptions,
        correctIndex: s.shuffledCorrectIndex
      };
    });

    setDrillMode(mode);
    setShuffledOptionsMap(optionsMap);
    setDrillQuestions(questionsWithIds);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setAnsweredQuestions({});
    setDrillState('active');
  };

  const handleStartDrill = () => {
    const weak = identifiedWeakDomains;
    setWeakDomains(weak);

    const weakDomainNames = weak.map(d => d.domain);
    const examQuestions = QUIZ_QUESTIONS.filter(q =>
      (availableDomains as readonly string[]).includes(q.domain)
    );
    const filtered = examQuestions.filter(q => weakDomainNames.includes(q.domain));
    const selected = shuffleArray(filtered).slice(0, 15);

    beginDrill(selected, 'drill', 'weak');
  };

  const handleStartPhotogrammetryDrill = () => {
    setWeakDomains([]);
    const selected = shuffleArray(photogrammetryQuestions);
    beginDrill(selected, 'photo-drill', 'photogrammetry');
  };

  const currentQuestion = drillQuestions[currentQuestionIndex];
  const totalQuestions = drillQuestions.length;
  const answeredCount = Object.keys(answeredQuestions).length;
  const correctCount = Object.values(answeredQuestions).filter(a => a.correct).length;

  const handleAnswerSelect = (answerIndex: number) => {
    if (showExplanation) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null || answeredQuestions[currentQuestionIndex]) return;

    const shuffledData = shuffledOptionsMap[currentQuestionIndex];
    const correctIndex = shuffledData?.correctIndex ?? currentQuestion.correctAnswer;
    const isCorrect = selectedAnswer === correctIndex;

    setAnsweredQuestions(prev => ({
      ...prev,
      [currentQuestionIndex]: { selected: selectedAnswer, correct: isCorrect }
    }));
    setShowExplanation(true);

    saveResultMutation.mutate({
      questionId: `drill-q-${currentQuestionIndex}-${Date.now()}`,
      domain: currentQuestion.domain,
      selectedAnswer,
      isCorrect
    });
  };

  const handleNext = () => {
    if (selectedAnswer !== null && !answeredQuestions[currentQuestionIndex]) {
      handleSubmit();
    }

    if (currentQuestionIndex < totalQuestions - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      const existingAnswer = answeredQuestions[nextIndex];
      if (existingAnswer) {
        setSelectedAnswer(existingAnswer.selected);
        setShowExplanation(true);
      } else {
        setSelectedAnswer(null);
        setShowExplanation(false);
      }
    }
  };

  const handleFinishDrill = () => {
    if (selectedAnswer !== null && !answeredQuestions[currentQuestionIndex]) {
      handleSubmit();
    }

    const finalCorrectCount = selectedAnswer !== null && !answeredQuestions[currentQuestionIndex]
      ? (() => {
          const sd = shuffledOptionsMap[currentQuestionIndex];
          const ci = sd?.correctIndex ?? currentQuestion?.correctAnswer;
          return selectedAnswer === ci ? correctCount + 1 : correctCount;
        })()
      : correctCount;

    saveSessionMutation.mutate({
      domain: drillMode === 'photogrammetry' ? 'Mapping, GIS, and CAD' : 'all',
      examTrack,
      totalQuestions: drillQuestions.length,
      correctAnswers: finalCorrectCount,
      timeSpentSeconds: 0
    });

    setDrillState('complete');
  };

  const handleRestart = () => {
    setDrillState('analysis');
    setDrillMode('weak');
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setAnsweredQuestions({});
    setDrillQuestions([]);
    queryClient.invalidateQueries({ queryKey: ['/api/quiz/stats', examTrack] });
  };

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 80) return 'text-green-600 dark:text-green-400';
    if (accuracy >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getAccuracyBgColor = (accuracy: number) => {
    if (accuracy >= 80) return 'bg-green-500';
    if (accuracy >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const drillDomainBreakdown = useMemo(() => {
    if (drillState !== 'complete' || drillQuestions.length === 0) return [];
    const breakdown: Record<string, { total: number; correct: number }> = {};
    drillQuestions.forEach((q, idx) => {
      if (!breakdown[q.domain]) breakdown[q.domain] = { total: 0, correct: 0 };
      breakdown[q.domain].total++;
      if (answeredQuestions[idx]?.correct) breakdown[q.domain].correct++;
    });
    return Object.entries(breakdown).map(([domain, stats]) => ({
      domain,
      total: stats.total,
      correct: stats.correct,
      accuracy: stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0,
    }));
  }, [drillState, drillQuestions, answeredQuestions]);

  if (drillState === 'analysis') {
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-6" data-testid="heading-weak-area-drill">
          Weak Area Drill
        </h1>

        <div className="space-y-6">
        {statsLoading ? (
          <Card className="p-8">
            <div className="text-center text-muted-foreground">Loading your performance data...</div>
          </Card>
        ) : !hasEnoughData ? (
          <Card className="p-8">
            <div className="text-center space-y-4">
              <AlertTriangle className="w-16 h-16 mx-auto text-muted-foreground" />
              <h2 className="text-xl font-semibold" data-testid="text-no-data">Not Enough Data</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Complete some practice quizzes first so we can identify your weak areas. We need quiz results to analyze your performance.
              </p>
            </div>
          </Card>
        ) : (
          <div className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center gap-2 pb-2">
                <Target className="w-5 h-5 text-primary" />
                <CardTitle className="text-lg">Weakness Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Based on your quiz performance, these are your weakest domains. The drill will focus on these areas.
                </p>

                <div className="space-y-3">
                  {identifiedWeakDomains.map((stat, index) => {
                    const config = getDomainConfig(stat.domain);
                    return (
                      <div
                        key={stat.domain}
                        data-testid={`weak-domain-${index}`}
                        className="flex items-center gap-3 p-3 rounded-md bg-muted/30"
                      >
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <div className={`w-3 h-3 rounded-full flex-shrink-0 ${getAccuracyBgColor(stat.accuracy)}`} />
                          <Badge variant="outline" className={`${config.bgColor} ${config.textColor} border-transparent text-xs`}>
                            {stat.domain}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3 flex-shrink-0">
                          <Progress value={stat.accuracy} className="w-24 h-2" />
                          <span className={`text-sm font-bold min-w-[3rem] text-right ${getAccuracyColor(stat.accuracy)}`}>
                            {Math.round(stat.accuracy)}%
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground flex-shrink-0">
                          {stat.correct}/{stat.answered}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {domainStatsList.length > identifiedWeakDomains.length && (
                  <div className="pt-2">
                    <p className="text-xs text-muted-foreground mb-2">Other domains:</p>
                    <div className="flex flex-wrap gap-2">
                      {domainStatsList.slice(3).map(stat => {
                        const config = getDomainConfig(stat.domain);
                        return (
                          <div key={stat.domain} className="flex items-center gap-1.5">
                            <Badge variant="outline" className={`${config.bgColor} ${config.textColor} border-transparent text-xs`}>
                              {stat.domain.split(' ').slice(0, 2).join(' ')}
                            </Badge>
                            <span className={`text-xs font-medium ${getAccuracyColor(stat.accuracy)}`}>
                              {Math.round(stat.accuracy)}%
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="p-6">
              <div className="text-center space-y-4">
                <Zap className="w-12 h-12 mx-auto text-primary" />
                <h2 className="text-xl font-semibold">Ready to Drill?</h2>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  A focused 15-question quiz targeting your {identifiedWeakDomains.length} weakest domain{identifiedWeakDomains.length !== 1 ? 's' : ''}.
                  Questions are drawn from: {identifiedWeakDomains.map(d => d.domain).join(', ')}.
                </p>
                <Button
                  size="lg"
                  onClick={handleStartDrill}
                  data-testid="button-start-drill"
                >
                  <Target className="w-4 h-4 mr-2" />
                  Start Drill
                </Button>
              </div>
            </Card>
          </div>
        )}

        {examTrack === 'fs' && photogrammetryQuestions.length > 0 && (
          <Card data-testid="card-photogrammetry-drill">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Plane className="w-5 h-5 text-primary" />
                <CardTitle className="text-lg">Targeted Drill Set: Photogrammetry Computations</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Photogrammetry is a high-stakes FS Domain 2 topic with several formula chains. This focused
                set drills all three computation types, with a step-by-step worked solution after every answer.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="font-mono text-xs">Photo Scale — S = f/(H−h)</Badge>
                <Badge variant="outline" className="font-mono text-xs">Relief Displacement — d = rh/H</Badge>
                <Badge variant="outline" className="font-mono text-xs">Flight Planning — N = strip/B + 1</Badge>
              </div>
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Button
                  onClick={handleStartPhotogrammetryDrill}
                  data-testid="button-start-photogrammetry-drill"
                >
                  <Plane className="w-4 h-4 mr-2" />
                  Start Photogrammetry Drill ({photogrammetryQuestions.length} questions)
                </Button>
                <Link href={`/app/${examTrack}/readings/${PHOTOGRAMMETRY_READING_ID}`}>
                  <Button variant="outline" data-testid="link-photogrammetry-reading">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Review the Reading
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
        </div>
      </div>
    );
  }

  if (drillState === 'active' && currentQuestion) {
    const shuffledData = shuffledOptionsMap[currentQuestionIndex];
    const options = shuffledData?.options ?? currentQuestion.options;
    const correctIndex = shuffledData?.correctIndex ?? currentQuestion.correctAnswer;
    const config = getDomainConfig(currentQuestion.domain);
    const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

    return (
      <div className="p-8 max-w-4xl mx-auto">
        <div className="flex items-center justify-between gap-4 flex-wrap mb-6">
          <div className="flex items-center gap-3">
            {drillMode === 'photogrammetry' ? <Plane className="w-5 h-5 text-primary" /> : <Target className="w-5 h-5 text-primary" />}
            <h1 className="text-xl font-bold text-foreground" data-testid="heading-drill-active">
              {drillMode === 'photogrammetry' ? 'Photogrammetry Drill' : 'Weak Area Drill'}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className={`${config.bgColor} ${config.textColor} border-transparent`}>
              {currentQuestion.domain}
            </Badge>
            <Badge variant="secondary">
              {currentQuestionIndex + 1} / {totalQuestions}
            </Badge>
          </div>
        </div>

        <Progress
          value={((currentQuestionIndex + 1) / totalQuestions) * 100}
          className="mb-6 h-2"
          data-testid="progress-drill"
        />

        <Card className="mb-6">
          <CardContent className="pt-6">
            <p className="text-lg font-medium mb-6" data-testid="text-question">
              {currentQuestion.question}
            </p>

            <div className="space-y-3">
              {options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrectOption = index === correctIndex;
                const isAnswered = showExplanation;

                let optionClass = 'p-4 rounded-md border cursor-pointer transition-colors ';
                if (isAnswered) {
                  if (isCorrectOption) {
                    optionClass += 'border-green-500 bg-green-50 dark:bg-green-950/30';
                  } else if (isSelected && !isCorrectOption) {
                    optionClass += 'border-red-500 bg-red-50 dark:bg-red-950/30';
                  } else {
                    optionClass += 'border-muted opacity-60';
                  }
                } else {
                  optionClass += isSelected
                    ? 'border-primary bg-primary/5'
                    : 'border-muted hover-elevate';
                }

                return (
                  <div
                    key={index}
                    data-testid={`option-${index}`}
                    className={optionClass}
                    onClick={() => handleAnswerSelect(index)}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold border ${
                        isAnswered && isCorrectOption
                          ? 'bg-green-500 text-white border-green-500'
                          : isAnswered && isSelected && !isCorrectOption
                          ? 'bg-red-500 text-white border-red-500'
                          : isSelected
                          ? 'border-primary text-primary'
                          : 'border-muted-foreground/30 text-muted-foreground'
                      }`}>
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="text-sm">{option}</span>
                      {isAnswered && isCorrectOption && (
                        <CheckCircle2 className="w-5 h-5 text-green-500 ml-auto flex-shrink-0" />
                      )}
                      {isAnswered && isSelected && !isCorrectOption && (
                        <XCircle className="w-5 h-5 text-red-500 ml-auto flex-shrink-0" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {showExplanation && drillMode === 'photogrammetry' ? (
              <div className="mt-6 rounded-md border border-muted bg-muted/40 p-4" data-testid="explanation-card">
                <div className="flex items-center gap-2 mb-3">
                  {answeredQuestions[currentQuestionIndex]?.correct ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                  )}
                  <p className="text-sm font-semibold">
                    {answeredQuestions[currentQuestionIndex]?.correct ? 'Correct!' : 'Not quite — here is the worked solution'}
                  </p>
                  {currentQuestion.skill && (
                    <Badge variant="outline" className="font-mono text-[11px] ml-auto">{currentQuestion.skill}</Badge>
                  )}
                </div>
                <ol className="space-y-2">
                  {parseSolutionSteps(currentQuestion.explanation).map((step, i) => (
                    <li
                      key={i}
                      className="flex gap-3 text-sm text-foreground/90"
                      data-testid={`solution-step-${i}`}
                    >
                      <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary/15 text-[11px] font-bold text-primary">
                        {i + 1}
                      </span>
                      <span className="font-mono leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
                <Link
                  href={`/app/${examTrack}/readings/${PHOTOGRAMMETRY_READING_ID}`}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                  data-testid="link-reading-from-explanation"
                >
                  <BookOpen className="w-4 h-4" />
                  Review this in the Photogrammetry reading
                </Link>
              </div>
            ) : showExplanation ? (
              <div className="mt-6 p-4 rounded-md bg-muted/50 border border-muted" data-testid="explanation-card">
                <div className="flex items-start gap-2">
                  {answeredQuestions[currentQuestionIndex]?.correct ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className="text-sm font-medium mb-1">
                      {answeredQuestions[currentQuestionIndex]?.correct ? 'Correct!' : 'Incorrect'}
                    </p>
                    <p className="text-sm text-muted-foreground">{currentQuestion.explanation}</p>
                  </div>
                </div>
              </div>
            ) : null}
          </CardContent>
        </Card>

        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="text-sm text-muted-foreground">
            {correctCount} / {answeredCount} correct
          </div>
          <div className="flex items-center gap-2">
            {!showExplanation ? (
              <Button
                onClick={handleSubmit}
                disabled={selectedAnswer === null}
                data-testid="button-submit-answer"
              >
                Check Answer
              </Button>
            ) : isLastQuestion ? (
              <Button onClick={handleFinishDrill} data-testid="button-finish-drill">
                <Trophy className="w-4 h-4 mr-2" />
                Finish Drill
              </Button>
            ) : (
              <Button onClick={handleNext} data-testid="button-next-question">
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (drillState === 'complete') {
    const totalAnswered = Object.keys(answeredQuestions).length;
    const totalCorrect = Object.values(answeredQuestions).filter(a => a.correct).length;
    const drillAccuracy = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;
    const isPhoto = drillMode === 'photogrammetry';

    const skillBreakdown = (() => {
      const map: Record<string, { total: number; correct: number }> = {};
      drillQuestions.forEach((q, idx) => {
        const skill = q.skill || 'Other photogrammetry';
        if (!map[skill]) map[skill] = { total: 0, correct: 0 };
        map[skill].total++;
        if (answeredQuestions[idx]?.correct) map[skill].correct++;
      });
      return Object.entries(map)
        .map(([skill, s]) => ({ skill, ...s }))
        .sort((a, b) => a.correct / a.total - b.correct / b.total);
    })();

    return (
      <div className="p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-6" data-testid="heading-drill-results">
          {isPhoto ? 'Photogrammetry Drill Results' : 'Drill Results'}
        </h1>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <Trophy className={`w-16 h-16 mx-auto ${drillAccuracy >= 70 ? 'text-yellow-500' : 'text-muted-foreground'}`} />
              <div>
                <p className="text-4xl font-bold" data-testid="text-drill-score">{drillAccuracy}%</p>
                <p className="text-muted-foreground">
                  {totalCorrect} of {totalAnswered} correct
                </p>
              </div>
              {drillAccuracy >= 80 ? (
                <Badge variant="secondary" className="text-green-600 dark:text-green-400">
                  Excellent improvement!
                </Badge>
              ) : drillAccuracy >= 60 ? (
                <Badge variant="secondary" className="text-yellow-600 dark:text-yellow-400">
                  Good progress, keep drilling!
                </Badge>
              ) : (
                <Badge variant="secondary" className="text-red-600 dark:text-red-400">
                  Keep practicing these areas
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {isPhoto && (
          <Card className="mb-6">
            <CardHeader className="flex flex-row items-center gap-2 pb-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              <CardTitle className="text-lg">Formula Type — Right vs. Missed</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                How you performed on each photogrammetry computation type.
              </p>
              <div className="space-y-2">
                {skillBreakdown.map(({ skill, total, correct }) => {
                  const mastered = correct === total;
                  return (
                    <div
                      key={skill}
                      data-testid={`skill-row-${skill}`}
                      className={`flex items-center justify-between gap-3 rounded-md border p-3 ${
                        mastered
                          ? 'border-green-500/40 bg-green-50/50 dark:bg-green-950/20'
                          : 'border-amber-500/40 bg-amber-50/50 dark:bg-amber-950/20'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        {mastered ? (
                          <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                        ) : (
                          <XCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
                        )}
                        <span className="text-sm font-medium font-mono truncate">{skill}</span>
                      </div>
                      <span
                        className={`text-sm font-semibold flex-shrink-0 ${
                          mastered ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'
                        }`}
                        data-testid={`skill-score-${skill}`}
                      >
                        {correct}/{total} {mastered ? 'mastered' : 'review'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center gap-2 pb-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg">Domain Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {drillDomainBreakdown.map(stat => {
                const config = getDomainConfig(stat.domain);
                const beforeStat = weakDomains.find(d => d.domain === stat.domain);
                const beforeAccuracy = beforeStat ? Math.round(beforeStat.accuracy) : null;
                const improved = beforeAccuracy !== null && stat.accuracy > beforeAccuracy;
                const declined = beforeAccuracy !== null && stat.accuracy < beforeAccuracy;

                return (
                  <div key={stat.domain} className="space-y-2" data-testid={`result-domain-${stat.domain.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}>
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <Badge variant="outline" className={`${config.bgColor} ${config.textColor} border-transparent text-xs`}>
                        {stat.domain}
                      </Badge>
                      <div className="flex items-center gap-2">
                        {beforeAccuracy !== null && (
                          <span className="text-xs text-muted-foreground">
                            Before: {beforeAccuracy}%
                          </span>
                        )}
                        {improved && <TrendingUp className="w-3 h-3 text-green-500" />}
                        {declined && <TrendingDown className="w-3 h-3 text-red-500" />}
                        <span className={`text-sm font-bold ${getAccuracyColor(stat.accuracy)}`}>
                          {stat.accuracy}%
                        </span>
                      </div>
                    </div>
                    <Progress value={stat.accuracy} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      {stat.correct} / {stat.total} correct in this drill
                    </p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center justify-center gap-3 flex-wrap">
          <Button variant="outline" onClick={handleRestart} data-testid="button-new-analysis">
            <RotateCcw className="w-4 h-4 mr-2" />
            {isPhoto ? 'Back to Overview' : 'New Analysis'}
          </Button>
          {isPhoto ? (
            <>
              <Button onClick={handleStartPhotogrammetryDrill} data-testid="button-drill-again">
                <Plane className="w-4 h-4 mr-2" />
                Drill Again
              </Button>
              <Link href={`/app/${examTrack}/readings/${PHOTOGRAMMETRY_READING_ID}`}>
                <Button variant="outline" data-testid="link-photogrammetry-reading-results">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Review the Reading
                </Button>
              </Link>
            </>
          ) : (
            <Button onClick={handleStartDrill} data-testid="button-drill-again">
              <Target className="w-4 h-4 mr-2" />
              Drill Again
            </Button>
          )}
        </div>
      </div>
    );
  }

  return null;
}
