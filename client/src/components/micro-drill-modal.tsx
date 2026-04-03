import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { CheckCircle2, XCircle, Target, Zap, Trophy, ArrowRight } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { QUIZ_QUESTIONS } from '@shared/data/quizQuestions';
import { getVariedQuizQuestions, getSessionSeed } from '@shared/data/quizVariationSystem';
import type { Domain } from '@shared/schema';

interface MicroDrillModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  focusDomains: string[];
  examTrack?: string;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  domain: string;
}

type DrillState = 'ready' | 'active' | 'completed';

const DRILL_QUESTION_COUNT = 10;

export function MicroDrillModal({ open, onOpenChange, focusDomains, examTrack = 'fs' }: MicroDrillModalProps) {
  const [drillState, setDrillState] = useState<DrillState>('ready');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [results, setResults] = useState<{ correct: boolean; domain: string }[]>([]);

  const currentQuestion = questions[currentIndex];
  const correctCount = results.filter(r => r.correct).length;
  const accuracy = results.length > 0 ? Math.round((correctCount / results.length) * 100) : 0;

  const saveResultMutation = useMutation({
    mutationFn: (result: { questionId: string; domain: string; selectedAnswer: number; isCorrect: boolean }) =>
      apiRequest('POST', '/api/quiz/results', result),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/quiz/results'] });
      queryClient.invalidateQueries({ queryKey: ['/api/quiz/stats'] });
      queryClient.invalidateQueries({ queryKey: ['/api/focus/domain-stats'] });
      queryClient.invalidateQueries({ queryKey: ['/api/focus/recent-misses'] });
      queryClient.invalidateQueries({ queryKey: ['/api/progress/domain-mastery'] });
      queryClient.invalidateQueries({ predicate: (query) => 
        Array.isArray(query.queryKey) && query.queryKey[0] === '/api/daily-quests'
      });
    }
  });

  const questProgressMutation = useMutation({
    mutationFn: (data: { questType: string; increment: number; examTrack: string; pillar: string }) =>
      apiRequest('POST', '/api/daily-quests/progress', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ predicate: (query) =>
        Array.isArray(query.queryKey) && query.queryKey[0] === '/api/daily-quests'
      });
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

  const initializeDrill = () => {
    let priorityQuestions = QUIZ_QUESTIONS;
    
    if (focusDomains.length > 0) {
      priorityQuestions = QUIZ_QUESTIONS.filter(q => 
        focusDomains.includes(q.domain)
      );
    }
    
    const shuffledPriority = shuffleArray(priorityQuestions);
    let selected = shuffledPriority.slice(0, DRILL_QUESTION_COUNT);
    
    if (selected.length < DRILL_QUESTION_COUNT) {
      const remainingCount = DRILL_QUESTION_COUNT - selected.length;
      const usedIds = new Set(selected.map((_, i) => QUIZ_QUESTIONS.indexOf(priorityQuestions[i])));
      const otherQuestions = shuffleArray(
        QUIZ_QUESTIONS.filter((_, i) => !usedIds.has(i))
      );
      selected = [...selected, ...otherQuestions.slice(0, remainingCount)];
    }

    const questionsWithIds = selected.map(q => ({
      ...q,
      id: `quiz-${QUIZ_QUESTIONS.indexOf(q)}`
    }));

    const variedQuestions = getVariedQuizQuestions(questionsWithIds, getSessionSeed());

    setQuestions(variedQuestions);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setResults([]);
    setDrillState('active');
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showFeedback) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null || !currentQuestion) return;

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    setShowFeedback(true);
    setResults([...results, { correct: isCorrect, domain: currentQuestion.domain }]);

    saveResultMutation.mutate({
      questionId: currentQuestion.id,
      domain: currentQuestion.domain,
      selectedAnswer,
      isCorrect
    });
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setDrillState('completed');
      questProgressMutation.mutate({
        questType: 'complete_quiz',
        increment: 1,
        examTrack,
        pillar: 'focus',
      });
    }
  };

  const handleClose = () => {
    setDrillState('ready');
    setQuestions([]);
    setResults([]);
    onOpenChange(false);
  };

  const handleRestart = () => {
    initializeDrill();
  };

  useEffect(() => {
    if (!open) {
      setDrillState('ready');
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-amber-500" />
            {drillState === 'ready' && 'Micro-Drill'}
            {drillState === 'active' && `Question ${currentIndex + 1} of ${questions.length}`}
            {drillState === 'completed' && 'Drill Complete!'}
          </DialogTitle>
        </DialogHeader>

        {drillState === 'ready' && (
          <div className="space-y-4">
            <div className="text-center py-4">
              <Zap className="w-12 h-12 mx-auto text-amber-500 mb-3" />
              <h3 className="text-lg font-semibold mb-2">Quick 10-Question Drill</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Practice questions from your weak areas to boost retention.
              </p>
              {focusDomains.length > 0 && (
                <div className="flex flex-wrap gap-1 justify-center mb-4">
                  {focusDomains.slice(0, 3).map(domain => (
                    <Badge key={domain} variant="secondary" className="text-xs">
                      {domain.split(' ').slice(0, 2).join(' ')}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
            <Button 
              className="w-full" 
              onClick={initializeDrill}
              data-testid="button-start-drill"
            >
              <Target className="w-4 h-4 mr-2" />
              Start Drill
            </Button>
          </div>
        )}

        {drillState === 'active' && currentQuestion && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Progress value={((currentIndex + 1) / questions.length) * 100} className="flex-1 h-2" />
              <Badge variant="outline" className="text-xs whitespace-nowrap">
                {correctCount}/{results.length} correct
              </Badge>
            </div>

            <Badge variant="secondary" className="text-xs">
              {currentQuestion.domain}
            </Badge>

            <p className="text-sm font-medium leading-relaxed">
              {currentQuestion.question}
            </p>

            <div className="space-y-2">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === currentQuestion.correctAnswer;
                const showCorrect = showFeedback && isCorrect;
                const showIncorrect = showFeedback && isSelected && !isCorrect;

                return (
                  <Card
                    key={index}
                    data-testid={`option-${index}`}
                    className={`p-3 cursor-pointer transition-all ${
                      isSelected && !showFeedback ? 'ring-2 ring-primary' : ''
                    } ${showCorrect ? 'bg-green-50 dark:bg-green-950/30 border-green-500' : ''} 
                    ${showIncorrect ? 'bg-red-50 dark:bg-red-950/30 border-red-500' : ''}
                    ${!showFeedback ? 'hover-elevate' : ''}`}
                    onClick={() => handleAnswerSelect(index)}
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-xs font-medium text-muted-foreground mt-0.5">
                        {String.fromCharCode(65 + index)}.
                      </span>
                      <span className="text-sm flex-1">{option}</span>
                      {showCorrect && <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />}
                      {showIncorrect && <XCircle className="w-4 h-4 text-red-600 flex-shrink-0" />}
                    </div>
                  </Card>
                );
              })}
            </div>

            {showFeedback && (
              <div className={`p-3 rounded-md text-sm ${
                results[results.length - 1]?.correct 
                  ? 'bg-green-50 dark:bg-green-950/30 text-green-800 dark:text-green-200' 
                  : 'bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-200'
              }`}>
                <p className="font-medium mb-1">
                  {results[results.length - 1]?.correct ? 'Correct!' : 'Incorrect'}
                </p>
                <p className="text-xs opacity-90">{currentQuestion.explanation}</p>
              </div>
            )}

            <div className="flex gap-2">
              {!showFeedback ? (
                <Button 
                  className="w-full" 
                  onClick={handleSubmit}
                  disabled={selectedAnswer === null}
                  data-testid="button-submit-answer"
                >
                  Submit Answer
                </Button>
              ) : (
                <Button 
                  className="w-full" 
                  onClick={handleNext}
                  data-testid="button-next-question"
                >
                  {currentIndex < questions.length - 1 ? (
                    <>Next <ArrowRight className="w-4 h-4 ml-1" /></>
                  ) : (
                    <>See Results <Trophy className="w-4 h-4 ml-1" /></>
                  )}
                </Button>
              )}
            </div>
          </div>
        )}

        {drillState === 'completed' && (
          <div className="space-y-4 text-center py-4">
            <Trophy className={`w-16 h-16 mx-auto ${accuracy >= 70 ? 'text-yellow-500' : 'text-muted-foreground'}`} />
            
            <div>
              <h3 className="text-2xl font-bold">{correctCount}/{results.length}</h3>
              <p className="text-muted-foreground">Questions Correct</p>
            </div>

            <div className="flex justify-center">
              <Badge 
                variant={accuracy >= 80 ? 'default' : accuracy >= 60 ? 'secondary' : 'destructive'}
                className="text-lg px-4 py-1"
              >
                {accuracy}% Accuracy
              </Badge>
            </div>

            {accuracy >= 80 && (
              <p className="text-sm text-green-600 dark:text-green-400">
                Excellent work! Keep it up!
              </p>
            )}
            {accuracy >= 60 && accuracy < 80 && (
              <p className="text-sm text-amber-600 dark:text-amber-400">
                Good progress! A bit more practice will help.
              </p>
            )}
            {accuracy < 60 && (
              <p className="text-sm text-red-600 dark:text-red-400">
                Keep practicing these areas - you'll improve!
              </p>
            )}

            <div className="flex gap-2 pt-2">
              <Button variant="outline" className="flex-1" onClick={handleClose}>
                Done
              </Button>
              <Button className="flex-1" onClick={handleRestart}>
                <Target className="w-4 h-4 mr-2" />
                Drill Again
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
