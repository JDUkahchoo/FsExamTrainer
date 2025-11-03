import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Clock, CheckCircle2, Target } from 'lucide-react';
import { getDomainConfig } from '@/lib/domains';
import { PRETEST_QUESTIONS } from '@shared/data/pretestQuestions';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useLocation } from 'wouter';
import type { Domain } from '@shared/schema';

export default function PretestPage() {
  const [, setLocation] = useLocation();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeElapsed, setTimeElapsed] = useState(0); // in seconds
  const [testStarted, setTestStarted] = useState(false);

  // Timer
  useEffect(() => {
    if (!testStarted) return;

    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [testStarted]);

  // Mutation to save pretest results
  const savePretestMutation = useMutation({
    mutationFn: async (data: { 
      domainScores: any; 
      totalCorrect: number; 
      totalQuestions: number;
      questionResults: Array<{
        questionId: string;
        domain: string;
        questionText: string;
        selectedAnswer: number;
        correctAnswer: number;
        isCorrect: boolean;
        explanation: string;
      }>;
    }) =>
      apiRequest('POST', '/api/pretest/results', data),
    onSuccess: () => {
      // Navigate to results page
      setLocation('/pretest/results');
    }
  });

  const handleStartTest = () => {
    setTestStarted(true);
  };

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    setAnswers(prev => ({ ...prev, [questionIndex]: answerIndex }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < PRETEST_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmitTest = () => {
    // Calculate results
    const domainScores: Record<Domain, { correct: number; total: number }> = {} as any;
    let totalCorrect = 0;
    const questionResults: Array<{
      questionId: string;
      domain: string;
      questionText: string;
      selectedAnswer: number;
      correctAnswer: number;
      isCorrect: boolean;
      explanation: string;
    }> = [];

    PRETEST_QUESTIONS.forEach((question, index) => {
      const domain = question.domain as Domain;
      if (!domainScores[domain]) {
        domainScores[domain] = { correct: 0, total: 0 };
      }
      domainScores[domain].total++;

      const userAnswer = answers[index];
      const isCorrect = userAnswer === question.correctAnswer;
      
      if (isCorrect) {
        domainScores[domain].correct++;
        totalCorrect++;
      }

      // Save individual question result (use -1 for unanswered)
      questionResults.push({
        questionId: `pretest-q${index}`,
        domain: question.domain,
        questionText: question.question,
        selectedAnswer: userAnswer !== undefined ? userAnswer : -1,
        correctAnswer: question.correctAnswer,
        isCorrect,
        explanation: question.explanation
      });
    });

    // Save results
    savePretestMutation.mutate({
      domainScores,
      totalCorrect,
      totalQuestions: PRETEST_QUESTIONS.length,
      questionResults
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${String(secs).padStart(2, '0')}`;
  };

  const currentQuestion = PRETEST_QUESTIONS[currentQuestionIndex];
  const domainConfig = currentQuestion ? getDomainConfig(currentQuestion.domain as Domain) : null;
  const answeredCount = Object.keys(answers).length;
  const progressPercent = (answeredCount / PRETEST_QUESTIONS.length) * 100;

  // Setup screen
  if (!testStarted) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Card className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-lg bg-primary/10">
              <Target className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold" data-testid="text-pretest-title">Diagnostic Pretest</h1>
              <p className="text-muted-foreground">Identify your strengths and areas to focus on</p>
            </div>
          </div>

          <Alert className="mb-6">
            <AlertDescription>
              This 28-question diagnostic test will help us understand your current knowledge level across all 7 NCEES domains. 
              Your results will be used to create a personalized study plan tailored to your needs.
            </AlertDescription>
          </Alert>

          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span>28 questions covering all 7 surveying domains</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-primary" />
              <span>No time limit - take your time and do your best</span>
            </div>
            <div className="flex items-center gap-3">
              <Target className="w-5 h-5 text-primary" />
              <span>Results will generate personalized study recommendations</span>
            </div>
          </div>

          <Button 
            onClick={handleStartTest} 
            size="lg" 
            className="w-full"
            data-testid="button-start-pretest"
          >
            Start Diagnostic Test
          </Button>
        </Card>
      </div>
    );
  }

  // Test in progress
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header with progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <Badge variant="outline" data-testid="text-question-number">
              Question {currentQuestionIndex + 1} of {PRETEST_QUESTIONS.length}
            </Badge>
            {domainConfig && (
              <Badge className={`${domainConfig.bgColor} ${domainConfig.textColor} ${domainConfig.borderColor}`}>
                {domainConfig.name}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span data-testid="text-timer">{formatTime(timeElapsed)}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Progress value={progressPercent} className="flex-1" />
          <span className="text-sm text-muted-foreground whitespace-nowrap" data-testid="text-progress">
            {answeredCount} / {PRETEST_QUESTIONS.length} answered
          </span>
        </div>
      </div>

      {/* Question Card */}
      <Card className="p-8 mb-6">
        <div className="mb-6">
          <p className="text-lg leading-relaxed" data-testid="text-question">
            {currentQuestion.question}
          </p>
        </div>

        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(currentQuestionIndex, index)}
              className={`w-full p-4 text-left rounded-lg border-2 transition-all hover-elevate active-elevate-2 ${
                answers[currentQuestionIndex] === index
                  ? 'border-primary bg-primary/5'
                  : 'border-border'
              }`}
              data-testid={`button-option-${index}`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  answers[currentQuestionIndex] === index
                    ? 'border-primary bg-primary'
                    : 'border-border'
                }`}>
                  {answers[currentQuestionIndex] === index && (
                    <div className="w-2 h-2 rounded-full bg-white" />
                  )}
                </div>
                <span>{option}</span>
              </div>
            </button>
          ))}
        </div>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          onClick={handlePreviousQuestion}
          variant="outline"
          disabled={currentQuestionIndex === 0}
          data-testid="button-previous"
        >
          Previous
        </Button>

        {currentQuestionIndex < PRETEST_QUESTIONS.length - 1 ? (
          <Button
            onClick={handleNextQuestion}
            data-testid="button-next"
          >
            Next Question
          </Button>
        ) : (
          <Button
            onClick={handleSubmitTest}
            disabled={answeredCount < PRETEST_QUESTIONS.length || savePretestMutation.isPending}
            data-testid="button-submit"
          >
            {savePretestMutation.isPending ? 'Submitting...' : 'Submit Test'}
          </Button>
        )}
      </div>

      {/* Warning if not all answered */}
      {currentQuestionIndex === PRETEST_QUESTIONS.length - 1 && answeredCount < PRETEST_QUESTIONS.length && (
        <Alert className="mt-4">
          <AlertDescription>
            Please answer all {PRETEST_QUESTIONS.length} questions before submitting.
            You have {PRETEST_QUESTIONS.length - answeredCount} unanswered question{PRETEST_QUESTIONS.length - answeredCount !== 1 ? 's' : ''}.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
