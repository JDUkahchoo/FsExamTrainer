import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Ruler, CheckCircle2, XCircle, ArrowRight, Trophy, Zap, BarChart3, ListChecks, RotateCcw } from 'lucide-react';
import { getDomainConfig } from '@/lib/domains';
import { QUIZ_QUESTIONS } from '@shared/data/quizQuestions';
import { useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useExamTrack } from '@/contexts/exam-track-context';
import { shuffleQuestionOptions } from '@/lib/shuffleOptions';
import { useActivityLogger } from '@/hooks/use-activity-logger';

type DrillState = 'intro' | 'active' | 'complete';

const SPC_TOPIC = 'State Plane';
const SPC_DOMAIN = 'Applied Mathematics & Statistics';

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

export default function StatePlaneDrillPage() {
  const { examTrack } = useExamTrack();
  const { logActivity } = useActivityLogger();

  const [drillState, setDrillState] = useState<DrillState>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showSolution, setShowSolution] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<Record<number, { selected: number; correct: boolean }>>({});
  const [drillQuestions, setDrillQuestions] = useState<Array<typeof QUIZ_QUESTIONS[0] & { id: string }>>([]);
  const [shuffledOptionsMap, setShuffledOptionsMap] = useState<Record<number, { options: string[]; correctIndex: number }>>({});

  const spcQuestions = useMemo(
    () => QUIZ_QUESTIONS.filter(q => q.topic === SPC_TOPIC && q.domain === SPC_DOMAIN),
    []
  );

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

  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const handleStartDrill = () => {
    const selected = shuffleArray(spcQuestions);
    const questionsWithIds = selected.map(q => ({
      ...q,
      id: `spc-${QUIZ_QUESTIONS.indexOf(q)}`
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

    setShuffledOptionsMap(optionsMap);
    setDrillQuestions(questionsWithIds);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowSolution(false);
    setAnsweredQuestions({});
    setDrillState('active');
  };

  const currentQuestion = drillQuestions[currentQuestionIndex];
  const totalQuestions = drillQuestions.length;
  const answeredCount = Object.keys(answeredQuestions).length;
  const correctCount = Object.values(answeredQuestions).filter(a => a.correct).length;

  const handleAnswerSelect = (answerIndex: number) => {
    if (showSolution) return;
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
    setShowSolution(true);

    saveResultMutation.mutate({
      questionId: `spc-drill-q-${currentQuestionIndex}-${Date.now()}`,
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
        setShowSolution(true);
      } else {
        setSelectedAnswer(null);
        setShowSolution(false);
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
      domain: SPC_DOMAIN,
      examTrack,
      totalQuestions: drillQuestions.length,
      correctAnswers: finalCorrectCount,
      timeSpentSeconds: 0
    });

    setDrillState('complete');
  };

  const handleRestart = () => {
    setDrillState('intro');
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowSolution(false);
    setAnsweredQuestions({});
    setDrillQuestions([]);
  };

  if (drillState === 'intro') {
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <Ruler className="w-7 h-7 text-primary" />
          <h1 className="text-3xl font-bold text-foreground" data-testid="heading-spc-drill">
            State Plane Computation Drill
          </h1>
        </div>
        <p className="text-muted-foreground mb-6">
          A focused workout on the numeric State Plane problems — combined factor (CF = SF × EF),
          elevation factor, and grid-to-ground conversions — with the full worked solution shown
          after every answer.
        </p>

        <Card className="p-6">
          <div className="text-center space-y-4">
            <Zap className="w-12 h-12 mx-auto text-primary" />
            <h2 className="text-xl font-semibold">Ready to Drill?</h2>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              {spcQuestions.length} State Plane computation question{spcQuestions.length !== 1 ? 's' : ''} from the
              Applied Mathematics &amp; Statistics domain. After each answer you'll see a step-by-step
              solution, and a summary at the end shows exactly which problems you got right and which to revisit.
            </p>
            <Button
              size="lg"
              onClick={handleStartDrill}
              disabled={spcQuestions.length === 0}
              data-testid="button-start-spc-drill"
            >
              <Ruler className="w-4 h-4 mr-2" />
              Start Drill
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (drillState === 'active' && currentQuestion) {
    const shuffledData = shuffledOptionsMap[currentQuestionIndex];
    const options = shuffledData?.options ?? currentQuestion.options;
    const correctIndex = shuffledData?.correctIndex ?? currentQuestion.correctAnswer;
    const config = getDomainConfig(currentQuestion.domain);
    const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
    const solutionSteps = showSolution ? parseSolutionSteps(currentQuestion.explanation) : [];
    const isAnsweredCorrect = answeredQuestions[currentQuestionIndex]?.correct;

    return (
      <div className="p-8 max-w-4xl mx-auto">
        <div className="flex items-center justify-between gap-4 flex-wrap mb-6">
          <div className="flex items-center gap-3">
            <Ruler className="w-5 h-5 text-primary" />
            <h1 className="text-xl font-bold text-foreground" data-testid="heading-spc-active">State Plane Computation Drill</h1>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="border-primary/40 text-primary">State Plane</Badge>
            <Badge variant="secondary">
              {currentQuestionIndex + 1} / {totalQuestions}
            </Badge>
          </div>
        </div>

        <Progress
          value={((currentQuestionIndex + 1) / totalQuestions) * 100}
          className="mb-6 h-2"
          data-testid="progress-spc-drill"
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
                const isAnswered = showSolution;

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
                      <span className="text-sm font-mono">{option}</span>
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

            {showSolution && (
              <div className="mt-6 rounded-md border border-muted bg-muted/40 p-4" data-testid="solution-card">
                <div className="flex items-center gap-2 mb-3">
                  {isAnsweredCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                  )}
                  <p className="text-sm font-semibold">
                    {isAnsweredCorrect ? 'Correct!' : 'Not quite — here is the worked solution'}
                  </p>
                </div>
                <ol className="space-y-2">
                  {solutionSteps.map((step, i) => (
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
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="text-sm text-muted-foreground">
            {correctCount} / {answeredCount} correct
          </div>
          <div className="flex items-center gap-2">
            {!showSolution ? (
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

    const skillBreakdown = (() => {
      const map: Record<string, { total: number; correct: number }> = {};
      drillQuestions.forEach((q, idx) => {
        const skill = q.skill || 'Other State Plane computations';
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
        <h1 className="text-3xl font-bold text-foreground mb-6" data-testid="heading-spc-results">
          State Plane Drill Results
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
                  State Plane computations mastered!
                </Badge>
              ) : drillAccuracy >= 60 ? (
                <Badge variant="secondary" className="text-yellow-600 dark:text-yellow-400">
                  Good progress — review the misses below
                </Badge>
              ) : (
                <Badge variant="secondary" className="text-red-600 dark:text-red-400">
                  Keep drilling CF, EF, and grid-to-ground
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center gap-2 pb-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg">Computation Steps — Right vs. Missed</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">
              How you performed on each State Plane computation step.
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

        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center gap-2 pb-2">
            <ListChecks className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg">Problem-by-Problem Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {drillQuestions.map((q, idx) => {
                const result = answeredQuestions[idx];
                const correct = result?.correct;
                return (
                  <div
                    key={q.id}
                    data-testid={`result-row-${idx}`}
                    className={`flex items-start gap-3 rounded-md border p-3 ${
                      correct
                        ? 'border-green-500/40 bg-green-50/50 dark:bg-green-950/20'
                        : 'border-red-500/40 bg-red-50/50 dark:bg-red-950/20'
                    }`}
                  >
                    {correct ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    )}
                    <div className="min-w-0">
                      <p className="text-sm font-medium">{q.question}</p>
                      <p className={`text-xs font-semibold mt-1 ${correct ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        {correct ? 'Got it right' : 'Missed — revisit this computation'}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center gap-2 pb-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg">Keep Going</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button onClick={handleStartDrill} data-testid="button-retry-drill">
                <RotateCcw className="w-4 h-4 mr-2" />
                Drill Again
              </Button>
              <Button variant="outline" onClick={handleRestart} data-testid="button-back-intro">
                Back to Overview
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
}
