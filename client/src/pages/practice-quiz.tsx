import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle2, XCircle, RotateCcw, Lightbulb } from 'lucide-react';
import { getDomainConfig } from '@/lib/domains';
import { QUIZ_QUESTIONS } from '@shared/data/quizQuestions';
import { useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { DOMAINS } from '@shared/schema';
import type { Domain } from '@shared/schema';

export default function PracticeQuizPage() {
  const [selectedDomain, setSelectedDomain] = useState<Domain | 'all'>('all');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<Record<number, { selected: number; correct: boolean }>>({});

  const filteredQuestions = selectedDomain === 'all'
    ? QUIZ_QUESTIONS
    : QUIZ_QUESTIONS.filter(q => q.domain === selectedDomain);

  const currentQuestion = filteredQuestions[currentQuestionIndex];
  const totalQuestions = filteredQuestions.length;
  const answeredCount = Object.keys(answeredQuestions).length;
  const correctCount = Object.values(answeredQuestions).filter(a => a.correct).length;

  if (!currentQuestion) {
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <Card className="p-12 text-center">
          <h2 className="text-2xl font-bold mb-4">No Questions Available</h2>
          <p className="text-muted-foreground mb-6">
            Please select a different domain or check back later.
          </p>
        </Card>
      </div>
    );
  }

  const handleAnswerSelect = (answerIndex: number) => {
    if (showExplanation) return;
    setSelectedAnswer(answerIndex);
  };

  // Mutation to save quiz result
  const saveResultMutation = useMutation({
    mutationFn: (result: { questionId: string; domain: string; selectedAnswer: number; isCorrect: boolean; completedAt: Date }) =>
      apiRequest('POST', '/api/quiz/results', result),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/quiz/results'] });
      queryClient.invalidateQueries({ queryKey: ['/api/quiz/stats'] });
      queryClient.invalidateQueries({ queryKey: ['/api/progress/stats'] });
    }
  });

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    setAnsweredQuestions({
      ...answeredQuestions,
      [currentQuestionIndex]: { selected: selectedAnswer, correct: isCorrect }
    });
    setShowExplanation(true);

    // Save quiz result to database
    saveResultMutation.mutate({
      questionId: `q-${currentQuestionIndex}`,
      domain: currentQuestion.domain,
      selectedAnswer,
      isCorrect,
      completedAt: new Date()
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setAnsweredQuestions({});
  };

  const domainConfig = getDomainConfig(currentQuestion.domain);
  const Icon = domainConfig.icon;
  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-4" data-testid="heading-practice-quiz">Practice Quiz</h1>
        <div className="flex flex-wrap items-center gap-4">
          <Select value={selectedDomain} onValueChange={(value) => {
            setSelectedDomain(value as Domain | 'all');
            setCurrentQuestionIndex(0);
            setSelectedAnswer(null);
            setShowExplanation(false);
            setAnsweredQuestions({});
          }}>
            <SelectTrigger className="w-64" data-testid="select-domain">
              <SelectValue placeholder="Select domain" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Domains</SelectItem>
              {DOMAINS.map(domain => (
                <SelectItem key={domain} value={domain}>{domain}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <div className="flex gap-4 text-sm text-muted-foreground">
            <span>Progress: {answeredCount}/{totalQuestions}</span>
            <span>Correct: {correctCount}/{answeredCount || 0}</span>
            {answeredCount > 0 && (
              <span className="font-medium">
                Accuracy: {Math.round((correctCount / answeredCount) * 100)}%
              </span>
            )}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="ml-auto"
            data-testid="button-reset"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>
      </div>

      <Card className="p-6 mb-6" data-testid="card-question">
        <div className="mb-4 flex items-center justify-between">
          <Badge variant="outline" className={`${domainConfig.bgColor} ${domainConfig.textColor} border-transparent`}>
            <Icon className="w-3 h-3 mr-1" />
            {currentQuestion.domain}
          </Badge>
          <span className="text-sm text-muted-foreground">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </span>
        </div>

        <h2 className="text-xl font-semibold text-foreground mb-6 leading-relaxed">
          {currentQuestion.question}
        </h2>

        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrectAnswer = index === currentQuestion.correctAnswer;
            const showCorrectIndicator = showExplanation && isCorrectAnswer;
            const showIncorrectIndicator = showExplanation && isSelected && !isCorrect;

            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showExplanation}
                className={`
                  w-full p-4 rounded-lg border-2 text-left transition-all hover-elevate
                  ${isSelected && !showExplanation ? 'border-primary bg-primary/5' : 'border-border'}
                  ${showCorrectIndicator ? 'border-success bg-success/10' : ''}
                  ${showIncorrectIndicator ? 'border-destructive bg-destructive/10' : ''}
                  ${showExplanation ? 'cursor-default' : 'cursor-pointer'}
                `}
                data-testid={`option-${index}`}
              >
                <div className="flex items-center gap-3">
                  <span className={`
                    flex h-8 w-8 items-center justify-center rounded-full border-2 font-semibold text-sm
                    ${isSelected && !showExplanation ? 'border-primary text-primary bg-primary/10' : 'border-border text-muted-foreground'}
                    ${showCorrectIndicator ? 'border-success text-success bg-success/20' : ''}
                    ${showIncorrectIndicator ? 'border-destructive text-destructive bg-destructive/20' : ''}
                  `}>
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="flex-1 text-foreground">{option}</span>
                  {showCorrectIndicator && <CheckCircle2 className="w-5 h-5 text-success" />}
                  {showIncorrectIndicator && <XCircle className="w-5 h-5 text-destructive" />}
                </div>
              </button>
            );
          })}
        </div>

        {!showExplanation && (
          <Button
            onClick={handleSubmit}
            disabled={selectedAnswer === null}
            className="w-full mt-6"
            data-testid="button-submit"
          >
            Submit Answer
          </Button>
        )}
      </Card>

      {showExplanation && (
        <Alert className={`mb-6 ${isCorrect ? 'border-success bg-success/10' : 'border-destructive bg-destructive/10'}`} data-testid="alert-explanation">
          <Lightbulb className={`h-4 w-4 ${isCorrect ? 'text-success' : 'text-destructive'}`} />
          <AlertDescription className="mt-2">
            <p className={`font-semibold mb-2 ${isCorrect ? 'text-success' : 'text-destructive'}`}>
              {isCorrect ? 'Correct!' : 'Incorrect'}
            </p>
            <p className="text-foreground leading-relaxed whitespace-pre-line">
              {currentQuestion.explanation}
            </p>
          </AlertDescription>
        </Alert>
      )}

      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          data-testid="button-previous"
        >
          Previous
        </Button>
        <Button
          onClick={handleNext}
          disabled={currentQuestionIndex === totalQuestions - 1}
          className="ml-auto"
          data-testid="button-next"
        >
          Next Question
        </Button>
      </div>
    </div>
  );
}
