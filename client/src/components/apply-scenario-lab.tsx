import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { Dumbbell, ChevronDown, Timer, Play, CheckCircle2, Star, Clock, MapPin, Calculator, Loader2, Zap } from 'lucide-react';
import type { ApplyChallengeAttempt } from '@shared/schema';
import { XP_AWARDS } from '@shared/schema';
import { useToast } from '@/hooks/use-toast';

interface ApplyScenarioLabProps {
  week: number;
  colorClass?: string;
  examTrack?: string;
}

interface FieldProblem {
  id: string;
  scenario: string;
  question: string;
  solution: string;
  rubric: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  domain: string;
  timeLimit: number;
}

const SAMPLE_PROBLEMS: FieldProblem[] = [
  {
    id: 'fp-1',
    scenario: 'You are surveying a rectangular lot for a residential property. The client needs the total area calculated for a building permit application.',
    question: 'A rectangular lot measures 125.50 feet along the front and 200.25 feet along the side. Calculate the area in square feet and convert to acres (1 acre = 43,560 sq ft).',
    solution: 'Area = 125.50 × 200.25 = 25,131.375 sq ft\nAcres = 25,131.375 ÷ 43,560 = 0.577 acres',
    rubric: [
      'Correctly multiplied length × width',
      'Used proper units (sq ft)',
      'Converted to acres accurately',
      'Showed work clearly'
    ],
    difficulty: 'easy',
    domain: 'Survey Computations & Applications',
    timeLimit: 120
  },
  {
    id: 'fp-2',
    scenario: 'During a boundary survey, you need to calculate the bearing from one monument to another using coordinate data.',
    question: 'Point A has coordinates N 1250.00, E 500.00. Point B has coordinates N 1375.50, E 625.75. Calculate the bearing from A to B.',
    solution: 'ΔN = 1375.50 - 1250.00 = 125.50\nΔE = 625.75 - 500.00 = 125.75\ntan(bearing) = ΔE/ΔN = 125.75/125.50 = 1.00199\nBearing angle = arctan(1.00199) = 45.06°\nBearing = N 45°03\'36" E',
    rubric: [
      'Correctly calculated ΔN and ΔE',
      'Applied correct tangent formula',
      'Converted to degrees-minutes-seconds',
      'Identified correct quadrant bearing'
    ],
    difficulty: 'medium',
    domain: 'Survey Computations & Applications',
    timeLimit: 180
  },
  {
    id: 'fp-3',
    scenario: 'You are establishing a new control point and need to verify the elevation using differential leveling.',
    question: 'Starting from BM "Alpha" (Elev. 512.45 ft), you take a backsight reading of 4.32 ft. After moving the rod to the unknown point, the foresight reading is 2.18 ft. What is the elevation of the new point?',
    solution: 'HI = BM Elev + BS = 512.45 + 4.32 = 516.77 ft\nNew Point Elev = HI - FS = 516.77 - 2.18 = 514.59 ft',
    rubric: [
      'Correctly added BS to BM elevation',
      'Properly calculated Height of Instrument',
      'Subtracted FS from HI correctly',
      'Final answer is accurate'
    ],
    difficulty: 'easy',
    domain: 'Field Data Acquisition',
    timeLimit: 90
  }
];

export function ApplyScenarioLab({ week, colorClass = "text-primary", examTrack = "fs" }: ApplyScenarioLabProps) {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [activeChallenge, setActiveChallenge] = useState<FieldProblem | null>(null);
  const [activeAttemptId, setActiveAttemptId] = useState<string | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [selfGrade, setSelfGrade] = useState<number[]>([]);
  const [startTime, setStartTime] = useState<Date | null>(null);

  const { data: attempts = [], isLoading } = useQuery<ApplyChallengeAttempt[]>({
    queryKey: ['/api/apply/attempts', week, examTrack],
    queryFn: async () => {
      const res = await fetch(`/api/apply/attempts?week=${week}&examTrack=${examTrack}`);
      if (!res.ok) throw new Error("Failed to fetch attempts");
      return res.json();
    },
  });

  const createAttemptMutation = useMutation({
    mutationFn: async (data: { week: number; challengeId: string; challengeType: string; examTrack: string }) => {
      const response = await apiRequest('POST', '/api/apply/attempts', data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/apply/attempts', week, examTrack] });
      queryClient.invalidateQueries({ queryKey: ['/api/apply/attempts', examTrack] });
      queryClient.invalidateQueries({ queryKey: ['/api/progress/overall', examTrack] });
      queryClient.invalidateQueries({ queryKey: ['/api/progress/domain-mastery'] });
    },
  });

  const updateAttemptMutation = useMutation({
    mutationFn: async ({ id, ...data }: { id: string; elapsedSeconds?: number; selfGrade?: number; maxGrade?: number; userAnswer?: string }) => {
      const response = await apiRequest('PATCH', `/api/apply/attempts/${id}`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/apply/attempts', week, examTrack] });
      queryClient.invalidateQueries({ queryKey: ['/api/apply/attempts', examTrack] });
    },
  });

  const awardXpMutation = useMutation({
    mutationFn: async (data: { amount: number; reason: string; activityKey: string }) => {
      const res = await apiRequest('POST', '/api/xp/award', data);
      return res.json() as Promise<{ xp: number; level: number; leveledUp: boolean; awarded: boolean; reason: string }>;
    },
    onSuccess: (data) => {
      if (data.awarded) {
        queryClient.invalidateQueries({ queryKey: ['/api/xp'] });
      }
    },
  });

  const completedChallengeIds = attempts
    .filter(a => a.completedAt !== null)
    .map(a => a.challengeId);

  const startChallenge = useCallback(async (problem: FieldProblem) => {
    setActiveChallenge(problem);
    setTimeRemaining(problem.timeLimit);
    setIsTimerActive(true);
    setShowSolution(false);
    setUserAnswer('');
    setSelfGrade([]);
    setStartTime(new Date());

    try {
      const data = await createAttemptMutation.mutateAsync({
        week,
        challengeId: problem.id,
        challengeType: 'field_problem',
        examTrack,
      });
      setActiveAttemptId(data.id);
    } catch (error) {
      console.error('Failed to create attempt:', error);
    }
  }, [week, createAttemptMutation]);

  const stopTimer = useCallback(() => {
    setIsTimerActive(false);
  }, []);

  const revealSolution = useCallback(() => {
    stopTimer();
    setShowSolution(true);
  }, [stopTimer]);

  const toggleRubricItem = useCallback((index: number) => {
    setSelfGrade(prev => {
      if (prev.includes(index)) {
        return prev.filter(i => i !== index);
      }
      return [...prev, index];
    });
  }, []);

  const submitSelfGrade = useCallback(async () => {
    if (activeChallenge && activeAttemptId && startTime) {
      const elapsedSeconds = Math.floor((new Date().getTime() - startTime.getTime()) / 1000);
      
      try {
        await updateAttemptMutation.mutateAsync({
          id: activeAttemptId,
          elapsedSeconds,
          selfGrade: selfGrade.length,
          maxGrade: activeChallenge.rubric.length,
          userAnswer,
        });
        
        // Award XP with backend idempotency (activity key prevents duplicate awards)
        awardXpMutation.mutate({ 
          amount: XP_AWARDS.APPLY_CHALLENGE, 
          reason: 'Scenario challenge completed',
          activityKey: `apply:challenge:${activeChallenge.id}`
        }, {
          onSuccess: (data) => {
            if (data.awarded) {
              toast({ 
                title: `+${XP_AWARDS.APPLY_CHALLENGE} XP`, 
                description: "Challenge graded!" 
              });
            }
          }
        });
      } catch (error) {
        console.error('Failed to update attempt:', error);
      }

      setActiveChallenge(null);
      setActiveAttemptId(null);
      setShowSolution(false);
      setUserAnswer('');
      setSelfGrade([]);
      setStartTime(null);
    }
  }, [activeChallenge, activeAttemptId, startTime, selfGrade, userAnswer, updateAttemptMutation, awardXpMutation, toast]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setIsTimerActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timeRemaining]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500/20 text-green-600 dark:text-green-400';
      case 'medium': return 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400';
      case 'hard': return 'bg-red-500/20 text-red-600 dark:text-red-400';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const completedCount = completedChallengeIds.length;

  return (
    <>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <Card className="border-l-4 border-l-emerald-500">
          <CollapsibleTrigger asChild>
            <CardHeader className="flex flex-row items-center justify-between gap-2 cursor-pointer hover-elevate pb-2">
              <div className="flex items-center gap-2">
                <Dumbbell className={`w-5 h-5 ${colorClass}`} />
                <CardTitle className="text-base font-semibold">APPLY Scenario Lab</CardTitle>
              </div>
              <div className="flex items-center gap-2">
                {completedCount > 0 && (
                  <Badge variant="secondary" className="gap-1">
                    <CheckCircle2 className="w-3 h-3 text-green-500" />
                    {completedCount}/{SAMPLE_PROBLEMS.length}
                  </Badge>
                )}
                <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </div>
            </CardHeader>
          </CollapsibleTrigger>

          <CollapsibleContent>
            <CardContent className="space-y-4">
              <div className="text-sm text-muted-foreground">
                Practice real-world surveying scenarios with timed challenges. Work through the problem, then self-grade your solution.
              </div>

              {isLoading ? (
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-emerald-500" />
                      Field Problems
                    </h4>
                    <div className="space-y-2">
                      {SAMPLE_PROBLEMS.map((problem) => {
                        const isCompleted = completedChallengeIds.includes(problem.id);
                        const attemptData = attempts.find(a => a.challengeId === problem.id && a.completedAt);
                        return (
                          <div
                            key={problem.id}
                            data-testid={`field-problem-${problem.id}`}
                            className={`flex items-center justify-between p-3 rounded-md border ${
                              isCompleted 
                                ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800' 
                                : 'bg-muted/30 border-border'
                            }`}
                          >
                            <div className="flex-1 mr-4">
                              <div className="flex items-center gap-2 mb-1">
                                <Badge variant="outline" className={`text-xs ${getDifficultyColor(problem.difficulty)}`}>
                                  {problem.difficulty}
                                </Badge>
                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {formatTime(problem.timeLimit)}
                                </span>
                                {attemptData && (
                                  <span className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                                    <Star className="w-3 h-3 fill-current" />
                                    {attemptData.selfGrade}/{attemptData.maxGrade}
                                  </span>
                                )}
                              </div>
                              <p className="text-sm line-clamp-2">{problem.scenario}</p>
                            </div>
                            <Button
                              size="sm"
                              variant={isCompleted ? "outline" : "default"}
                              onClick={() => startChallenge(problem)}
                              disabled={createAttemptMutation.isPending}
                              data-testid={`button-start-problem-${problem.id}`}
                            >
                              {createAttemptMutation.isPending ? (
                                <Loader2 className="w-3 h-3 animate-spin" />
                              ) : isCompleted ? (
                                <>
                                  <Play className="w-3 h-3 mr-1" />
                                  Retry
                                </>
                              ) : (
                                <>
                                  <Play className="w-3 h-3 mr-1" />
                                  Start
                                </>
                              )}
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {completedCount > 0 && (
                    <div className="pt-2">
                      <Progress 
                        value={(completedCount / SAMPLE_PROBLEMS.length) * 100} 
                        className="h-2"
                      />
                      <p className="text-xs text-muted-foreground mt-1 text-center">
                        {completedCount} of {SAMPLE_PROBLEMS.length} challenges completed
                      </p>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      <Dialog open={!!activeChallenge} onOpenChange={(open) => !open && setActiveChallenge(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {activeChallenge && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  Field Problem Challenge
                </DialogTitle>
                <DialogDescription>
                  {activeChallenge.domain}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-md">
                  <Badge variant="outline" className={getDifficultyColor(activeChallenge.difficulty)}>
                    {activeChallenge.difficulty}
                  </Badge>
                  <div className={`flex items-center gap-2 font-mono text-lg ${
                    timeRemaining <= 30 && timeRemaining > 0 ? 'text-red-500' : ''
                  }`}>
                    <Timer className="w-5 h-5" />
                    {formatTime(timeRemaining)}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Scenario:</h4>
                  <p className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-md">
                    {activeChallenge.scenario}
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Question:</h4>
                  <p className="text-sm font-medium">
                    {activeChallenge.question}
                  </p>
                </div>

                {!showSolution ? (
                  <>
                    <div className="space-y-2">
                      <h4 className="font-medium">Your Answer:</h4>
                      <Textarea
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        placeholder="Show your work and final answer..."
                        className="min-h-[100px]"
                        data-testid="textarea-user-answer"
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={revealSolution}
                        className="flex-1"
                        data-testid="button-reveal-solution"
                      >
                        Reveal Solution
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-2">
                      <h4 className="font-medium text-green-600 dark:text-green-400">Solution:</h4>
                      <pre className="text-sm bg-green-50 dark:bg-green-950/20 p-3 rounded-md whitespace-pre-wrap font-mono">
                        {activeChallenge.solution}
                      </pre>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium">Self-Grade Rubric:</h4>
                      <p className="text-xs text-muted-foreground">Check off the criteria you met in your answer:</p>
                      <div className="space-y-2">
                        {activeChallenge.rubric.map((item, index) => (
                          <div
                            key={index}
                            className={`flex items-center gap-3 p-2 rounded-md cursor-pointer ${
                              selfGrade.includes(index) 
                                ? 'bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800'
                                : 'bg-muted/30 border border-transparent'
                            }`}
                            onClick={() => toggleRubricItem(index)}
                            data-testid={`rubric-item-${index}`}
                          >
                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                              selfGrade.includes(index)
                                ? 'bg-green-500 border-green-500 text-white'
                                : 'border-muted-foreground'
                            }`}>
                              {selfGrade.includes(index) && <CheckCircle2 className="w-3 h-3" />}
                            </div>
                            <span className="text-sm">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Your Score:</span>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: activeChallenge.rubric.length }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < selfGrade.length 
                                  ? 'text-yellow-500 fill-yellow-500' 
                                  : 'text-muted-foreground'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          ({selfGrade.length}/{activeChallenge.rubric.length})
                        </span>
                      </div>
                      <Button
                        onClick={submitSelfGrade}
                        disabled={updateAttemptMutation.isPending}
                        data-testid="button-submit-self-grade"
                      >
                        {updateAttemptMutation.isPending ? (
                          <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        ) : null}
                        Complete Challenge
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
