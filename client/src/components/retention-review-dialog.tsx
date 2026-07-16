import { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, CheckCircle, RefreshCw, Sparkles, Trophy } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import type { RetentionReview, UserPreferences } from '@shared/schema';
import { XP_AWARDS } from '@shared/schema';
import { RetentionSessionCard } from '@/components/retention-session-card';
import { getDailySessionCap } from '@/components/reinforce-retention-booster';

// Minimum number of cards we try to show per session. When fewer items are
// actually due, we "top up" with the soonest-upcoming (not yet due) concepts
// so the pop-up never opens nearly empty.
const MIN_SESSION_SIZE = 5;

interface RetentionReviewDialogProps {
  examTrack: string;
  open: boolean;
  onClose: () => void;
}

export function RetentionReviewDialog({ examTrack, open, onClose }: RetentionReviewDialogProps) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [sessionCards, setSessionCards] = useState<RetentionReview[]>([]);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [sessionDone, setSessionDone] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [activeRating, setActiveRating] = useState<number | null>(null);
  const [ratingCounts, setRatingCounts] = useState<Record<number, number>>({});

  const { data: preferences } = useQuery<UserPreferences>({
    queryKey: ['/api/preferences', examTrack],
    enabled: open,
  });

  // All currently-due retention items for the active track (no week filter)
  const { data: dueReviews = [], isLoading: dueLoading, isFetching: dueFetching, refetch: refetchDue } = useQuery<RetentionReview[]>({
    queryKey: ['/api/retention/due', 'all', examTrack],
    queryFn: async () => {
      const res = await fetch(`/api/retention/due?examTrack=${examTrack}`, { credentials: 'include' });
      if (!res.ok) throw new Error('Failed to fetch due reviews');
      return res.json();
    },
    enabled: open,
    staleTime: 0,
    refetchOnMount: 'always',
  });

  // All retention items for the track — used to top up with upcoming concepts
  const { data: allReviews = [], isLoading: allLoading, isFetching: allFetching, refetch: refetchAll } = useQuery<RetentionReview[]>({
    queryKey: ['/api/retention/reviews', 'all', examTrack],
    queryFn: async () => {
      const res = await fetch(`/api/retention/reviews?examTrack=${examTrack}`, { credentials: 'include' });
      if (!res.ok) throw new Error('Failed to fetch reviews');
      return res.json();
    },
    enabled: open,
    staleTime: 0,
    refetchOnMount: 'always',
  });

  // Wait for the in-flight refetch too (not just first load) so a session can
  // never be started from stale cached data.
  const isLoading = dueLoading || allLoading || ((dueFetching || allFetching) && !sessionStarted);
  const dailyCap = getDailySessionCap(preferences?.studyMode ?? undefined, preferences?.examDate ?? null, 1);

  const buildSession = useCallback((): RetentionReview[] => {
    // Due items first: lowest mastery, then most overdue
    const due = [...dueReviews].sort((a, b) => {
      if (a.masteryLevel !== b.masteryLevel) return a.masteryLevel - b.masteryLevel;
      const aTime = a.nextReviewAt ? new Date(a.nextReviewAt).getTime() : 0;
      const bTime = b.nextReviewAt ? new Date(b.nextReviewAt).getTime() : 0;
      return aTime - bTime;
    });

    let batch = due.slice(0, dailyCap);

    // Top up with soonest-upcoming (not yet due) concepts when few are due
    if (batch.length < MIN_SESSION_SIZE) {
      const dueIds = new Set(due.map(r => r.id));
      const upcoming = allReviews
        .filter(r => !dueIds.has(r.id))
        .sort((a, b) => {
          const aTime = a.nextReviewAt ? new Date(a.nextReviewAt).getTime() : Infinity;
          const bTime = b.nextReviewAt ? new Date(b.nextReviewAt).getTime() : Infinity;
          return aTime - bTime;
        });
      batch = [...batch, ...upcoming.slice(0, MIN_SESSION_SIZE - batch.length)];
    }

    return batch;
  }, [dueReviews, allReviews, dailyCap]);

  const startSession = useCallback(() => {
    const batch = buildSession();
    if (batch.length === 0) return;
    setSessionCards(batch);
    setCurrentIndex(0);
    setIsFlipped(false);
    setActiveRating(null);
    setRatingCounts({});
    setSessionDone(false);
    setSessionStarted(true);
  }, [buildSession]);

  const updateReviewMutation = useMutation({
    mutationFn: async ({ id, quality }: { id: string; quality: number }) => {
      const response = await apiRequest('PATCH', `/api/retention/reviews/${id}`, { quality });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const err = new Error(errorData.error || `Failed to update review (${response.status})`) as Error & { status?: number };
        err.status = response.status;
        throw err;
      }
      return response.json();
    },
    onError: (error: Error & { status?: number }) => {
      if (error.status === 403 || error.status === 404) {
        toast({
          title: 'Card skipped',
          description: "That card isn't available anymore, so we skipped it.",
        });
        return;
      }
      toast({
        title: 'Review Failed',
        description: error.message || 'Could not save your rating. Please try again.',
        variant: 'destructive',
      });
    },
  });

  const awardXpMutation = useMutation({
    mutationFn: async (data: { amount: number; reason: string; activityKey: string }) => {
      const res = await apiRequest('POST', '/api/xp/award', data);
      return res.json() as Promise<{ awarded: boolean }>;
    },
    onSuccess: (data) => {
      if (data.awarded) {
        queryClient.invalidateQueries({ queryKey: ['/api/xp'] });
      }
    },
  });

  const invalidateRetentionData = useCallback(async () => {
    await Promise.all([
      queryClient.invalidateQueries({ predicate: (q) => Array.isArray(q.queryKey) && (q.queryKey[0] === '/api/retention/due' || q.queryKey[0] === '/api/retention/reviews' || q.queryKey[0] === '/api/retention/stats') }),
      queryClient.invalidateQueries({ queryKey: ['/api/xp'] }),
      queryClient.invalidateQueries({ queryKey: ['/api/progress/overall', examTrack] }),
      queryClient.invalidateQueries({ queryKey: ['/api/progress/domain-mastery'] }),
      queryClient.invalidateQueries({ predicate: (q) => Array.isArray(q.queryKey) && q.queryKey[0] === '/api/daily-quests' }),
    ]);
  }, [queryClient, examTrack]);

  const handleRate = useCallback(async (quality: number) => {
    if (currentIndex >= sessionCards.length) return;
    const review = sessionCards[currentIndex];
    setActiveRating(quality);
    try {
      await updateReviewMutation.mutateAsync({ id: review.id, quality });
      awardXpMutation.mutate({
        amount: XP_AWARDS.REINFORCE_REVIEW,
        reason: 'Retention card reviewed',
        activityKey: `reinforce:review:${review.id}`,
      });
      setRatingCounts(prev => ({ ...prev, [quality]: (prev[quality] || 0) + 1 }));

      const isLast = currentIndex >= sessionCards.length - 1;
      if (!isLast) {
        setCurrentIndex(prev => prev + 1);
        setIsFlipped(false);
      } else {
        setSessionDone(true);
        await invalidateRetentionData();
      }
    } catch (err) {
      // Toasts are handled by the mutation's onError. If this card no longer
      // exists (or belongs to stale cached data), drop it and move on instead
      // of blocking the whole session.
      const status = (err as { status?: number })?.status;
      if (status === 403 || status === 404) {
        const remaining = sessionCards.filter((_, i) => i !== currentIndex);
        setSessionCards(remaining);
        setIsFlipped(false);
        if (remaining.length === 0 || currentIndex >= remaining.length) {
          const ratedAny = Object.values(ratingCounts).some(c => c > 0);
          if (remaining.length > 0 || ratedAny) {
            setSessionDone(true);
          } else {
            // Nothing valid left and nothing rated — back to the preview with fresh data
            setSessionStarted(false);
            setCurrentIndex(0);
          }
          await invalidateRetentionData();
        }
      }
    } finally {
      setActiveRating(null);
    }
  }, [currentIndex, sessionCards, ratingCounts, updateReviewMutation, awardXpMutation, invalidateRetentionData]);

  const handleClose = () => {
    // If the user rated any cards but closed before finishing, still refresh
    // dependent caches so counters/quests don't go stale.
    const ratedAny = Object.values(ratingCounts).some(c => c > 0);
    if (ratedAny && !sessionDone) {
      invalidateRetentionData();
    }
    setSessionStarted(false);
    setSessionDone(false);
    setSessionCards([]);
    setCurrentIndex(0);
    setIsFlipped(false);
    onClose();
  };

  const handleReviewMore = async () => {
    setSessionStarted(false);
    setSessionDone(false);
    setSessionCards([]);
    await Promise.all([refetchDue(), refetchAll()]);
  };

  const dueCount = dueReviews.length;
  const previewBatch = !sessionStarted && !isLoading ? buildSession() : [];
  const remembered = (ratingCounts[3] || 0) + (ratingCounts[5] || 0);
  const struggled = (ratingCounts[1] || 0) + (ratingCounts[2] || 0);

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) handleClose(); }}>
      <DialogContent className="max-w-lg" data-testid="dialog-retention-review">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            Quick Memory Refresher
          </DialogTitle>
          <DialogDescription>
            A short spaced-repetition session pulling together everything that's ready for review right now — the mix changes every time you open it.
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center gap-2 py-8 justify-center text-muted-foreground">
            <RefreshCw className="h-4 w-4 animate-spin" />
            <span>Checking what's ready for review...</span>
          </div>
        ) : sessionDone ? (
          <div className="space-y-4 py-2" data-testid="retention-session-summary">
            <div className="text-center">
              <Trophy className="h-10 w-10 mx-auto text-yellow-500 mb-2" />
              <p className="font-semibold text-lg">Session complete!</p>
              <p className="text-sm text-muted-foreground">
                You reviewed {sessionCards.length} concept{sessionCards.length !== 1 ? 's' : ''} and earned {XP_AWARDS.REINFORCE_REVIEW * sessionCards.length} XP.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 rounded-md bg-green-50 dark:bg-green-950/40">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400" data-testid="text-summary-remembered">{remembered}</div>
                <div className="text-xs text-muted-foreground">Remembered well</div>
              </div>
              <div className="text-center p-3 rounded-md bg-orange-50 dark:bg-orange-950/40">
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400" data-testid="text-summary-struggled">{struggled}</div>
                <div className="text-xs text-muted-foreground">Need more practice</div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              Concepts you struggled with will come back sooner. Check back later — this refresher is different every visit.
            </p>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={handleReviewMore} data-testid="button-review-more">
                <RefreshCw className="h-4 w-4 mr-2" />
                Review More
              </Button>
              <Button className="flex-1" onClick={handleClose} data-testid="button-close-summary">
                Done
              </Button>
            </div>
          </div>
        ) : sessionStarted && sessionCards.length > 0 ? (
          <div className="space-y-4">
            <Progress value={(currentIndex / sessionCards.length) * 100} className="h-2" />
            <RetentionSessionCard
              card={sessionCards[currentIndex]}
              index={currentIndex}
              total={sessionCards.length}
              isFlipped={isFlipped}
              onFlip={() => setIsFlipped(f => !f)}
              onRate={handleRate}
              activeRating={activeRating}
            />
          </div>
        ) : previewBatch.length === 0 ? (
          <div className="text-center py-6 space-y-2" data-testid="retention-empty-state">
            <CheckCircle className="h-10 w-10 mx-auto text-green-500" />
            <p className="font-medium">You're all caught up!</p>
            <p className="text-sm text-muted-foreground">
              Nothing needs reviewing right now. Keep working through your study plan — new concepts will appear here as weeks add them.
            </p>
            <Button variant="outline" onClick={handleClose} className="mt-2" data-testid="button-close-empty">
              Close
            </Button>
          </div>
        ) : (
          <div className="space-y-4 py-1">
            <div className="flex items-center justify-between p-3 rounded-md bg-purple-50 dark:bg-purple-950/30">
              <div className="flex items-center gap-2 text-sm">
                <Sparkles className="h-4 w-4 text-purple-600 dark:text-purple-400 shrink-0" />
                <span>
                  {dueCount > 0
                    ? `${dueCount} concept${dueCount !== 1 ? 's are' : ' is'} due for review`
                    : 'Nothing is overdue — here\'s a quick head-start on upcoming concepts'}
                </span>
              </div>
              <Badge variant="outline" className="shrink-0 text-purple-600 dark:text-purple-400 border-purple-300 dark:border-purple-700">
                {previewBatch.length} cards
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              This is a temporary refresher, not fixed content — the cards you see change each visit based on what your memory needs most.
              {dueCount > dailyCap && ` Showing the ${dailyCap} most urgent of ${dueCount} due — the rest carry over.`}
            </p>
            <Button className="w-full" onClick={startSession} data-testid="button-start-global-review">
              <Brain className="h-4 w-4 mr-2" />
              Start Review ({previewBatch.length} cards)
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
