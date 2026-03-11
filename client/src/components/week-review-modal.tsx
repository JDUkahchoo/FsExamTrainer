import { useState, useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle2, XCircle, ChevronRight, Brain, RefreshCw, Star } from 'lucide-react';
import { QUIZ_QUESTIONS } from '@shared/data/quizQuestions';
import { PS_QUIZ_QUESTIONS } from '@shared/data/psQuizQuestions';

interface Props {
  weekNumber: number;
  weekTitle: string;
  domains: string[];
  examTrack: string;
  open: boolean;
  onClose: () => void;
}

type ReviewStep = 'intro' | 'quiz' | 'complete';

const REVIEW_COUNT = 5;

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
}

export function WeekReviewModal({ weekNumber, weekTitle, domains, examTrack, open, onClose }: Props) {
  const { toast } = useToast();
  const [step, setStep] = useState<ReviewStep>('intro');
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [answers, setAnswers] = useState<boolean[]>([]);

  const questions = useMemo(() => {
    const pool = examTrack === 'ps' ? PS_QUIZ_QUESTIONS : QUIZ_QUESTIONS;
    const domainSet = new Set(domains.map(d => d.toLowerCase()));
    const filtered = pool.filter(q => domainSet.has(q.domain.toLowerCase()));
    const source = filtered.length >= REVIEW_COUNT ? filtered : pool;

    const rand = seededRandom(weekNumber * 31 + domains.length * 7 + Date.now() % 100);
    const shuffled = [...source].sort(() => rand() - 0.5);
    return shuffled.slice(0, REVIEW_COUNT);
  }, [weekNumber, domains, examTrack]);

  const reviewMutation = useMutation({
    mutationFn: () => apiRequest('POST', `/api/plan/week-review/${weekNumber}`, { examTrack }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/plan/memory-health', examTrack] });
      toast({ title: '+10 XP', description: 'Review session complete — memory health restored!' });
    },
  });

  const q = questions[currentQ];
  const correct = answers.filter(Boolean).length;
  const total = questions.length;
  const accuracyPct = total > 0 ? Math.round((correct / total) * 100) : 0;

  function handleAnswer(idx: number) {
    if (showFeedback || !q) return;
    setSelected(idx);
    setShowFeedback(true);
    const isCorrect = idx === q.correctAnswer;
    setAnswers(prev => [...prev, isCorrect]);
  }

  function handleNext() {
    setSelected(null);
    setShowFeedback(false);
    if (currentQ + 1 >= questions.length) {
      setStep('complete');
      reviewMutation.mutate();
    } else {
      setCurrentQ(prev => prev + 1);
    }
  }

  function handleClose() {
    setStep('intro');
    setCurrentQ(0);
    setSelected(null);
    setShowFeedback(false);
    setAnswers([]);
    onClose();
  }

  const nextReviewDays = Math.round(14 * Math.pow(2, (reviewMutation.data as any)?.reviewCount ?? 1));

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-500" />
            Memory Refresh — Week {weekNumber}
          </DialogTitle>
          <DialogDescription>{weekTitle}</DialogDescription>
        </DialogHeader>

        {step === 'intro' && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              This week's content is starting to fade. A quick 5-question review resets the forgetting clock
              and keeps everything sharp heading into your exam.
            </p>
            {domains.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {domains.map(d => (
                  <Badge key={d} variant="secondary">{d}</Badge>
                ))}
              </div>
            )}
            <div className="flex items-center gap-3 text-sm text-muted-foreground bg-muted/50 rounded-lg p-3">
              <RefreshCw className="h-4 w-4 shrink-0 text-purple-500" />
              <span>5 questions · ~5 min · <span className="font-medium text-foreground">+10 XP</span> on completion</span>
            </div>
            <Button className="w-full" onClick={() => setStep('quiz')} disabled={questions.length === 0}>
              Start Review
            </Button>
          </div>
        )}

        {step === 'quiz' && q && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Question {currentQ + 1} of {total}</span>
              <span>{answers.filter(Boolean).length} correct so far</span>
            </div>
            <Progress value={(currentQ / total) * 100} className="h-1.5" />

            <p className="font-medium text-sm leading-relaxed">{q.question}</p>

            <div className="space-y-2">
              {q.options.map((opt, idx) => {
                let extra = '';
                if (showFeedback) {
                  if (idx === q.correctAnswer) extra = 'border-green-500 bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300';
                  else if (idx === selected) extra = 'border-red-400 bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300';
                  else extra = 'opacity-50';
                } else if (idx === selected) {
                  extra = 'border-primary bg-primary/5';
                }
                return (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    className={`w-full text-left p-3 rounded-lg border text-sm transition-all ${extra} ${!showFeedback ? 'hover:border-primary hover:bg-primary/5 cursor-pointer' : 'cursor-default'}`}
                  >
                    <span className="font-medium text-xs mr-2 text-muted-foreground">{String.fromCharCode(65 + idx)}.</span>
                    {opt}
                  </button>
                );
              })}
            </div>

            {showFeedback && (
              <div className={`rounded-lg p-3 text-sm border ${selected === q.correctAnswer ? 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800'}`}>
                <p className="font-medium mb-1 flex items-center gap-1.5">
                  {selected === q.correctAnswer
                    ? <><CheckCircle2 className="h-4 w-4 text-green-600" /> Correct!</>
                    : <><XCircle className="h-4 w-4 text-red-500" /> Not quite</>
                  }
                </p>
                {(q as any).explanation && (
                  <p className="text-muted-foreground leading-relaxed">{(q as any).explanation}</p>
                )}
              </div>
            )}

            {showFeedback && (
              <Button className="w-full" onClick={handleNext}>
                {currentQ + 1 >= total ? 'Finish Review' : 'Next Question'}
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            )}
          </div>
        )}

        {step === 'complete' && (
          <div className="space-y-4 text-center py-2">
            <div className="text-5xl">
              {accuracyPct >= 80 ? '🎯' : accuracyPct >= 60 ? '👍' : '💪'}
            </div>
            <div>
              <p className="text-xl font-bold">{correct}/{total} correct</p>
              <p className="text-sm text-muted-foreground mt-1">{accuracyPct}% accuracy</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 space-y-1.5">
              <p className="text-sm font-medium flex items-center justify-center gap-2">
                <Star className="h-4 w-4 text-yellow-500" />
                Memory health restored for Week {weekNumber}
              </p>
              <p className="text-xs text-muted-foreground">
                Next recommended review in{' '}
                <span className="font-medium text-foreground">~{nextReviewDays} days</span>
              </p>
            </div>
            <Button className="w-full" onClick={handleClose}>Done</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
