import { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, Timer, RefreshCw, CheckCircle, XCircle, AlertTriangle, Sparkles, Zap, Loader2 } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';
import type { RetentionReview } from '@shared/schema';
import { DOMAINS, XP_AWARDS } from '@shared/schema';
import { useToast } from '@/hooks/use-toast';

interface RetentionStats {
  totalReviews: number;
  dueToday: number;
  averageMastery: number;
  retentionScore: number;
}

interface ReinforceRetentionBoosterProps {
  week: number;
}

const SAMPLE_CONCEPTS = [
  {
    id: 'bearing-azimuth',
    type: 'formula' as const,
    text: 'Bearing to Azimuth: If bearing is NE quadrant, Azimuth = Bearing. If SE, Az = 180 - Bearing.',
    domain: 4,
  },
  {
    id: 'closure-ratio',
    type: 'formula' as const,
    text: 'Closure Ratio = Linear Error of Closure / Total Distance Traversed. Express as 1:N format.',
    domain: 5,
  },
  {
    id: 'rod-reading',
    type: 'procedure' as const,
    text: 'HI = BS + Elevation of BM. Elevation of point = HI - FS (foresight reading).',
    domain: 1,
  },
  {
    id: 'coordinate-area',
    type: 'formula' as const,
    text: 'Double Area by Coordinates: 2A = Σ(Xn × Yn+1) - Σ(Yn × Xn+1). Divide by 2 for actual area.',
    domain: 5,
  },
];

export function ReinforceRetentionBooster({ week }: ReinforceRetentionBoosterProps) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionActive, setSessionActive] = useState(false);
  const [reviewedCardIds, setReviewedCardIds] = useState<Set<string>>(new Set());
  const [sessionCards, setSessionCards] = useState<RetentionReview[]>([]);
  const [activeRating, setActiveRating] = useState<number | null>(null);

  const { data: stats, isLoading: statsLoading } = useQuery<RetentionStats>({
    queryKey: ['/api/retention/stats', week],
    queryFn: async () => {
      const res = await fetch(`/api/retention/stats?week=${week}`, { credentials: 'include' });
      if (!res.ok) throw new Error('Failed to fetch stats');
      return res.json();
    },
  });

  const { data: dueReviews = [], isLoading: reviewsLoading, refetch: refetchDue } = useQuery<RetentionReview[]>({
    queryKey: ['/api/retention/due', week],
    queryFn: async () => {
      const res = await fetch(`/api/retention/due?week=${week}`, { credentials: 'include' });
      if (!res.ok) throw new Error('Failed to fetch due reviews');
      return res.json();
    },
  });

  const { data: weekReviews = [] } = useQuery<RetentionReview[]>({
    queryKey: ['/api/retention/reviews', week],
    queryFn: async () => {
      const res = await fetch(`/api/retention/reviews?week=${week}`, { credentials: 'include' });
      if (!res.ok) throw new Error('Failed to fetch reviews');
      return res.json();
    },
  });

  const createReviewMutation = useMutation({
    mutationFn: async (data: { week: number; conceptId: string; conceptType: string; conceptText: string; domain: number }) => {
      const response = await apiRequest('POST', '/api/retention/reviews', data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/retention/stats', week] });
      queryClient.invalidateQueries({ queryKey: ['/api/retention/due', week] });
      queryClient.invalidateQueries({ queryKey: ['/api/retention/reviews', week] });
    },
  });

  const updateReviewMutation = useMutation({
    mutationFn: async ({ id, quality }: { id: string; quality: number }) => {
      const response = await apiRequest('PATCH', `/api/retention/reviews/${id}`, { quality });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Failed to update review (${response.status})`);
      }
      return response.json();
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['/api/retention/stats', week] });
      await queryClient.invalidateQueries({ queryKey: ['/api/retention/due', week] });
      await queryClient.invalidateQueries({ queryKey: ['/api/retention/reviews', week] });
      await queryClient.invalidateQueries({ queryKey: ['/api/xp'] });
    },
    onError: (error: Error) => {
      toast({
        title: 'Review Failed',
        description: error.message || 'Could not save your rating. Please try again.',
        variant: 'destructive',
      });
    },
  });

  const initializeReviews = useCallback(async () => {
    for (const concept of SAMPLE_CONCEPTS) {
      const exists = weekReviews.some(r => r.conceptId === concept.id);
      if (!exists) {
        await createReviewMutation.mutateAsync({
          week,
          conceptId: concept.id,
          conceptType: concept.type,
          conceptText: concept.text,
          domain: concept.domain,
        });
      }
    }
    await refetchDue();
  }, [week, weekReviews, createReviewMutation, refetchDue]);

  const startSession = useCallback(async () => {
    // Refetch to ensure we have fresh data
    const { data: freshReviews } = await refetchDue();
    const reviewsToUse = freshReviews || dueReviews;
    
    if (!reviewsToUse || reviewsToUse.length === 0) {
      toast({
        title: 'No reviews available',
        description: 'Please add concepts first or check back later.',
        variant: 'destructive',
      });
      return;
    }
    
    console.log('[Retention] Starting session with reviews:', reviewsToUse.map(r => ({ id: r.id, conceptId: r.conceptId })));
    
    setSessionCards([...reviewsToUse]);
    setReviewedCardIds(new Set());
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setSessionActive(true);
  }, [dueReviews, refetchDue, toast]);

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

  const handleQualityRating = useCallback(async (quality: number) => {
    if (sessionCards.length > 0 && currentCardIndex < sessionCards.length) {
      const review = sessionCards[currentCardIndex];
      
      // Validate review has a proper ID before proceeding
      if (!review.id || typeof review.id !== 'string' || review.id.length < 10) {
        console.error('[Retention] Invalid review ID:', review.id, review);
        toast({
          title: 'Review Error',
          description: 'Invalid review data. Please restart the session.',
          variant: 'destructive',
        });
        setSessionActive(false);
        return;
      }
      
      console.log('[Retention] Rating card:', { id: review.id, conceptId: review.conceptId, quality });
      setActiveRating(quality);
      
      try {
        await updateReviewMutation.mutateAsync({ id: review.id, quality });
        
        // Award XP with backend idempotency (activity key prevents duplicate awards)
        awardXpMutation.mutate({ 
          amount: XP_AWARDS.REINFORCE_REVIEW, 
          reason: 'Retention card reviewed',
          activityKey: `reinforce:review:${review.id}`
        });
        
        setReviewedCardIds(prev => { const newSet = new Set(prev); newSet.add(review.id); return newSet; });
        
        const isLastCard = currentCardIndex >= sessionCards.length - 1;
        
        if (!isLastCard) {
          setCurrentCardIndex(prev => prev + 1);
          setIsFlipped(false);
        } else {
          toast({ 
            title: `+${XP_AWARDS.REINFORCE_REVIEW * sessionCards.length} XP`, 
            description: `Session complete! ${sessionCards.length} cards reviewed.` 
          });
          setSessionActive(false);
          setSessionCards([]);
          setReviewedCardIds(new Set());
          setCurrentCardIndex(0);
        }
      } catch (error) {
        // Error toast is handled by mutation onError
        console.error('Rating submission failed:', error);
      } finally {
        setActiveRating(null);
      }
    }
  }, [sessionCards, currentCardIndex, updateReviewMutation, awardXpMutation, toast]);

  const getDecayColor = (score: number): string => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    if (score >= 40) return 'text-orange-500';
    return 'text-red-500';
  };

  const getDecayBgColor = (score: number): string => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    if (score >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getMasteryLabel = (level: number): string => {
    const labels = ['New', 'Learning', 'Reviewing', 'Familiar', 'Proficient', 'Mastered'];
    return labels[Math.min(level, 5)] || 'New';
  };

  if (statsLoading || reviewsLoading) {
    return (
      <Card className="border-purple-200 dark:border-purple-800">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <RefreshCw className="h-4 w-4 animate-spin" />
            <span>Loading retention data...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  const retentionScore = stats?.retentionScore ?? 100;
  const dueCount = stats?.dueToday ?? 0;
  const totalReviews = stats?.totalReviews ?? 0;
  const avgMastery = stats?.averageMastery ?? 0;

  return (
    <Card className="border-purple-200 dark:border-purple-800 bg-purple-50/50 dark:bg-purple-950/20">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            <CardTitle className="text-lg">Retention Booster</CardTitle>
          </div>
          <Badge variant="outline" className="text-purple-600 dark:text-purple-400 border-purple-300 dark:border-purple-700">
            {dueCount} due
          </Badge>
        </div>
        <CardDescription>
          Spaced repetition to reinforce key concepts
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-2 rounded-md bg-background/50">
            <div className={`text-2xl font-bold ${getDecayColor(retentionScore)}`}>
              {retentionScore}%
            </div>
            <div className="text-xs text-muted-foreground">Retention</div>
          </div>
          <div className="text-center p-2 rounded-md bg-background/50">
            <div className="text-2xl font-bold">{totalReviews}</div>
            <div className="text-xs text-muted-foreground">Cards</div>
          </div>
          <div className="text-center p-2 rounded-md bg-background/50">
            <div className="text-2xl font-bold">{avgMastery.toFixed(1)}</div>
            <div className="text-xs text-muted-foreground">Avg Level</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Decay Meter</span>
            <span className={getDecayColor(retentionScore)}>
              {retentionScore >= 80 ? 'Strong' : retentionScore >= 60 ? 'Fading' : retentionScore >= 40 ? 'Weak' : 'Critical'}
            </span>
          </div>
          <Progress 
            value={retentionScore} 
            className="h-3"
            style={{ 
              ['--progress-background' as string]: retentionScore >= 80 ? 'rgb(34 197 94)' : 
                retentionScore >= 60 ? 'rgb(234 179 8)' : 
                retentionScore >= 40 ? 'rgb(249 115 22)' : 'rgb(239 68 68)'
            }}
          />
        </div>

        {!sessionActive ? (
          <div className="space-y-3">
            {dueCount > 0 ? (
              <>
                <div className="flex items-center gap-2 p-3 rounded-md bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="text-sm">{dueCount} concept{dueCount > 1 ? 's' : ''} need review</span>
                </div>
                <Button 
                  onClick={startSession}
                  className="w-full"
                  data-testid="button-start-review"
                >
                  <Brain className="h-4 w-4 mr-2" />
                  Start Review Session
                </Button>
              </>
            ) : totalReviews === 0 ? (
              <Button 
                onClick={initializeReviews}
                className="w-full"
                variant="outline"
                disabled={createReviewMutation.isPending}
                data-testid="button-add-concepts"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                {createReviewMutation.isPending ? 'Adding concepts...' : 'Add Week Concepts'}
              </Button>
            ) : (
              <div className="flex items-center gap-2 p-3 rounded-md bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm">All caught up! Check back later.</span>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {sessionCards.length > 0 && currentCardIndex < sessionCards.length ? (
              <>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Card {currentCardIndex + 1} of {sessionCards.length}</span>
                  <Badge variant="secondary" className="text-xs">
                    {getMasteryLabel(sessionCards[currentCardIndex].masteryLevel)}
                  </Badge>
                </div>

                <div 
                  className="min-h-[120px] p-4 rounded-lg border bg-card cursor-pointer transition-all hover-elevate"
                  onClick={() => setIsFlipped(!isFlipped)}
                  data-testid="card-concept-flip"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs">
                      {sessionCards[currentCardIndex].conceptType}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Domain {sessionCards[currentCardIndex].domain}
                    </Badge>
                  </div>
                  <p className="text-sm leading-relaxed">
                    {sessionCards[currentCardIndex].conceptText}
                  </p>
                  {!isFlipped && (
                    <p className="text-xs text-muted-foreground mt-3 text-center">
                      Click to reveal, then rate your recall
                    </p>
                  )}
                </div>

                {isFlipped && (
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground text-center">How well did you remember?</p>
                    <div className="grid grid-cols-4 gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-col h-auto py-2 border-red-300 dark:border-red-700 text-red-600 dark:text-red-400"
                        onClick={() => handleQualityRating(1)}
                        disabled={activeRating !== null}
                        data-testid="button-rating-forgot"
                      >
                        {activeRating === 1 ? (
                          <Loader2 className="h-4 w-4 mb-1 animate-spin" />
                        ) : (
                          <XCircle className="h-4 w-4 mb-1" />
                        )}
                        <span className="text-xs">Forgot</span>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-col h-auto py-2 border-orange-300 dark:border-orange-700 text-orange-600 dark:text-orange-400"
                        onClick={() => handleQualityRating(2)}
                        disabled={activeRating !== null}
                        data-testid="button-rating-hard"
                      >
                        {activeRating === 2 ? (
                          <Loader2 className="h-4 w-4 mb-1 animate-spin" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 mb-1" />
                        )}
                        <span className="text-xs">Hard</span>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-col h-auto py-2 border-yellow-300 dark:border-yellow-700 text-yellow-600 dark:text-yellow-400"
                        onClick={() => handleQualityRating(3)}
                        disabled={activeRating !== null}
                        data-testid="button-rating-good"
                      >
                        {activeRating === 3 ? (
                          <Loader2 className="h-4 w-4 mb-1 animate-spin" />
                        ) : (
                          <Timer className="h-4 w-4 mb-1" />
                        )}
                        <span className="text-xs">Good</span>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-col h-auto py-2 border-green-300 dark:border-green-700 text-green-600 dark:text-green-400"
                        onClick={() => handleQualityRating(5)}
                        disabled={activeRating !== null}
                        data-testid="button-rating-easy"
                      >
                        {activeRating === 5 ? (
                          <Loader2 className="h-4 w-4 mb-1 animate-spin" />
                        ) : (
                          <CheckCircle className="h-4 w-4 mb-1" />
                        )}
                        <span className="text-xs">Easy</span>
                      </Button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-4">
                <CheckCircle className="h-8 w-8 mx-auto text-green-500 mb-2" />
                <p className="text-sm font-medium">Session Complete!</p>
                <p className="text-xs text-muted-foreground">Great job reinforcing your knowledge.</p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="mt-2"
                  onClick={() => setSessionActive(false)}
                  data-testid="button-finish-session"
                >
                  Done
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
