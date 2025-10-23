import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle2, XCircle, RotateCcw, Lightbulb, Clock, Play, Trophy } from 'lucide-react';
import { getDomainConfig } from '@/lib/domains';
import { QUIZ_QUESTIONS } from '@shared/data/quizQuestions';
import { useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { DOMAINS } from '@shared/schema';
import type { Domain } from '@shared/schema';

type QuizState = 'setup' | 'active' | 'completed';

export default function PracticeQuizPage() {
  const [quizState, setQuizState] = useState<QuizState>('setup');
  const [selectedDomain, setSelectedDomain] = useState<Domain | 'all'>('all');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<Record<number, { selected: number; correct: boolean }>>({});
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [quizQuestions, setQuizQuestions] = useState<typeof QUIZ_QUESTIONS>([]);

  // Mutation to save individual quiz result (for stats/analytics)
  const saveResultMutation = useMutation({
    mutationFn: (result: { questionId: string; domain: string; selectedAnswer: number; isCorrect: boolean }) =>
      apiRequest('POST', '/api/quiz/results', result),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/quiz/results'] });
      queryClient.invalidateQueries({ queryKey: ['/api/quiz/stats'] });
    }
  });

  // Timer effect
  useEffect(() => {
    if (quizState !== 'active' || !startTime) return;
    
    const interval = setInterval(() => {
      setElapsedSeconds(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [quizState, startTime]);

  // Shuffle array helper
  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const totalQuestions = quizQuestions.length;
  const answeredCount = Object.keys(answeredQuestions).length;
  const correctCount = Object.values(answeredQuestions).filter(a => a.correct).length;

  // Mutation to save quiz session
  const saveSessionMutation = useMutation({
    mutationFn: (session: { domain: string; totalQuestions: number; correctAnswers: number; timeSpentSeconds: number }) =>
      apiRequest('POST', '/api/quiz/sessions', session),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/quiz/sessions'] });
      queryClient.invalidateQueries({ queryKey: ['/api/quiz/stats'] });
      queryClient.invalidateQueries({ queryKey: ['/api/progress/stats'] });
    }
  });

  const handleStartQuiz = () => {
    // Prepare quiz questions based on selected domain
    let questionsForQuiz: typeof QUIZ_QUESTIONS;
    
    if (selectedDomain === 'all') {
      // Mixed exam mode: randomly select 50 questions from all domains and shuffle
      const shuffled = shuffleArray(QUIZ_QUESTIONS);
      questionsForQuiz = shuffled.slice(0, 50);
    } else {
      // Domain-specific practice: show all questions from selected domain
      questionsForQuiz = QUIZ_QUESTIONS.filter(q => q.domain === selectedDomain);
    }
    
    setQuizQuestions(questionsForQuiz);
    setQuizState('active');
    setStartTime(Date.now());
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setAnsweredQuestions({});
    setElapsedSeconds(0);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showExplanation) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    
    // Prevent duplicate submissions for already answered questions
    if (answeredQuestions[currentQuestionIndex]) {
      return;
    }
    
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    setAnsweredQuestions({
      ...answeredQuestions,
      [currentQuestionIndex]: { selected: selectedAnswer, correct: isCorrect }
    });
    setShowExplanation(true);

    // Save individual question result for stats/analytics (only once per question)
    saveResultMutation.mutate({
      questionId: `q-${currentQuestionIndex}-${Date.now()}`,
      domain: currentQuestion.domain,
      selectedAnswer,
      isCorrect
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      
      // If the next question was already answered, restore its state
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

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      const prevIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(prevIndex);
      
      // If the previous question was already answered, restore its state
      const existingAnswer = answeredQuestions[prevIndex];
      if (existingAnswer) {
        setSelectedAnswer(existingAnswer.selected);
        setShowExplanation(true);
      } else {
        setSelectedAnswer(null);
        setShowExplanation(false);
      }
    }
  };

  const handleFinishQuiz = () => {
    // Save the complete quiz session
    // totalQuestions = actual quiz length (e.g., 50 for mixed exam)
    // answeredCount = how many questions were actually answered
    saveSessionMutation.mutate({
      domain: selectedDomain,
      totalQuestions: quizQuestions.length,
      correctAnswers: correctCount,
      timeSpentSeconds: elapsedSeconds
    });
    setQuizState('completed');
  };

  const handleRestart = () => {
    setQuizState('setup');
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setAnsweredQuestions({});
    setStartTime(null);
    setElapsedSeconds(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Setup screen
  if (quizState === 'setup') {
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-6" data-testid="heading-practice-quiz">Practice Quiz</h1>
        
        <Card className="p-8">
          <div className="text-center mb-8">
            <Play className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h2 className="text-2xl font-bold mb-2">Start a Practice Quiz</h2>
            <p className="text-muted-foreground">
              Answer questions to test your knowledge. Your session will be saved when you finish.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Select Domain</label>
              <Select value={selectedDomain} onValueChange={(value) => setSelectedDomain(value as Domain | 'all')}>
                <SelectTrigger className="w-full" data-testid="select-domain">
                  <SelectValue placeholder="Select domain" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Domains - Mixed Exam (50 questions)</SelectItem>
                  {DOMAINS.map(domain => {
                    const count = QUIZ_QUESTIONS.filter(q => q.domain === domain).length;
                    return (
                      <SelectItem key={domain} value={domain}>
                        {domain} ({count} questions)
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg">
              {selectedDomain === 'all' ? (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-foreground">
                    📝 Mixed Exam Mode
                  </p>
                  <p className="text-sm text-muted-foreground">
                    You'll answer <strong className="text-foreground">50 randomly selected questions</strong> from all 7 domains. 
                    This simulates the real exam experience with mixed topics.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-foreground">
                    📚 Domain Practice Mode
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Practice all <strong className="text-foreground">
                      {QUIZ_QUESTIONS.filter(q => q.domain === selectedDomain).length} questions
                    </strong> from the {selectedDomain} domain.
                  </p>
                </div>
              )}
            </div>

            <Button
              onClick={handleStartQuiz}
              className="w-full"
              size="lg"
              data-testid="button-start-quiz"
            >
              <Play className="w-5 h-5 mr-2" />
              Start Quiz
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // Completion screen
  if (quizState === 'completed') {
    const accuracy = answeredCount > 0 ? (correctCount / answeredCount) * 100 : 0;
    const passed = accuracy >= 70;

    return (
      <div className="p-8 max-w-4xl mx-auto">
        <Card className="p-8">
          <div className="text-center mb-8">
            <Trophy className={`w-16 h-16 mx-auto mb-4 ${passed ? 'text-success' : 'text-muted-foreground'}`} />
            <h2 className="text-3xl font-bold mb-2">Quiz Complete!</h2>
            <p className="text-muted-foreground">
              {passed ? 'Great job! You passed this quiz.' : 'Keep practicing to improve your score.'}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-muted/50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-primary">{answeredCount}</div>
              <div className="text-sm text-muted-foreground">Questions</div>
            </div>
            <div className="bg-muted/50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-success">{correctCount}</div>
              <div className="text-sm text-muted-foreground">Correct</div>
            </div>
            <div className="bg-muted/50 p-4 rounded-lg text-center">
              <div className={`text-2xl font-bold ${passed ? 'text-success' : 'text-destructive'}`}>
                {Math.round(accuracy)}%
              </div>
              <div className="text-sm text-muted-foreground">Accuracy</div>
            </div>
            <div className="bg-muted/50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-foreground">{formatTime(elapsedSeconds)}</div>
              <div className="text-sm text-muted-foreground">Time</div>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              onClick={handleRestart}
              className="w-full"
              size="lg"
              data-testid="button-restart"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Start New Quiz
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // Active quiz screen
  if (!currentQuestion) {
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <Card className="p-12 text-center">
          <h2 className="text-2xl font-bold mb-4">No Questions Available</h2>
          <p className="text-muted-foreground mb-6">
            Please select a different domain or check back later.
          </p>
          <Button onClick={handleRestart} data-testid="button-back">
            Back to Setup
          </Button>
        </Card>
      </div>
    );
  }

  const domainConfig = getDomainConfig(currentQuestion.domain);
  const Icon = domainConfig.icon;
  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-foreground" data-testid="heading-practice-quiz">Practice Quiz</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-muted-foreground" data-testid="text-timer">
              <Clock className="w-4 h-4" />
              <span className="font-mono text-lg">{formatTime(elapsedSeconds)}</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
          <Badge variant="outline" className="text-sm">
            {selectedDomain === 'all' ? 'All Domains' : selectedDomain}
          </Badge>
          
          <div className="flex gap-4 text-sm text-muted-foreground">
            <span data-testid="text-progress">Progress: {answeredCount}/{totalQuestions}</span>
            <span data-testid="text-correct">Correct: {correctCount}/{answeredCount || 0}</span>
            {answeredCount > 0 && (
              <span className="font-medium" data-testid="text-accuracy">
                Accuracy: {Math.round((correctCount / answeredCount) * 100)}%
              </span>
            )}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleFinishQuiz}
            className="ml-auto"
            data-testid="button-finish"
          >
            <Trophy className="w-4 h-4 mr-2" />
            Finish Quiz
          </Button>
        </div>
      </div>

      <Card className="p-6 mb-6" data-testid="card-question">
        <div className="mb-4 flex items-center justify-between">
          <Badge variant="outline" className={`${domainConfig.bgColor} ${domainConfig.textColor} border-transparent`}>
            <Icon className="w-3 h-3 mr-1" />
            {currentQuestion.domain}
          </Badge>
          <span className="text-sm text-muted-foreground" data-testid="text-question-number">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </span>
        </div>

        <h2 className="text-xl font-semibold text-foreground mb-6 leading-relaxed">
          {currentQuestion.question}
        </h2>

        <div className="space-y-3">
          {currentQuestion.options.map((option: string, index: number) => {
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
