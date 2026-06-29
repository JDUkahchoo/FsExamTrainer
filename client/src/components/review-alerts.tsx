import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Bell, Clock, BookOpen, Brain, CheckCircle, Loader2 } from 'lucide-react';
import { useExamTrack } from '@/contexts/exam-track-context';
import type { ReviewSchedule } from '@shared/schema';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'wouter';
import { apiRequest, queryClient } from '@/lib/queryClient';

const itemTypeIcons: Record<string, any> = {
  flashcard: Brain,
  concept: BookOpen,
  lesson: BookOpen
};

interface WeeklyReviewSlate {
  items: ReviewSchedule[];
  done: number;
  remaining: number;
  target: number;
}

interface ReviewAlertsProps {
  onReviewClick?: (review: ReviewSchedule) => void;
}

export function ReviewAlerts({ onReviewClick }: ReviewAlertsProps) {
  const { examTrack } = useExamTrack();
  const [markedIds, setMarkedIds] = useState<Set<string>>(new Set());

  const { data: slate, isLoading } = useQuery<WeeklyReviewSlate>({
    queryKey: ['/api/reviews/due', examTrack],
    queryFn: async () => {
      const res = await fetch(`/api/reviews/due?examTrack=${examTrack}`);
      if (!res.ok) throw new Error('Failed to fetch due reviews');
      return res.json();
    }
  });

  const { data: upcomingReviews = [] } = useQuery<ReviewSchedule[]>({
    queryKey: ['/api/reviews/upcoming', examTrack],
    queryFn: async () => {
      const res = await fetch(`/api/reviews/upcoming?examTrack=${examTrack}`);
      if (!res.ok) throw new Error('Failed to fetch upcoming reviews');
      return res.json();
    }
  });

  const markDoneMutation = useMutation({
    mutationFn: async (reviewId: string) => {
      return apiRequest('PATCH', `/api/reviews/${reviewId}`, { quality: 3 });
    },
    onSuccess: (_data, reviewId) => {
      setMarkedIds(prev => new Set(prev).add(reviewId));
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ['/api/reviews/due', examTrack] });
        queryClient.invalidateQueries({ queryKey: ['/api/reviews/upcoming', examTrack] });
        setMarkedIds(prev => {
          const next = new Set(prev);
          next.delete(reviewId);
          return next;
        });
      }, 1500);
    }
  });

  if (isLoading) {
    return (
      <Card className="p-4">
        <div className="flex items-center justify-center py-6">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      </Card>
    );
  }

  const dueReviews = slate?.items ?? [];
  const done = slate?.done ?? 0;
  const target = slate?.target ?? 0;
  const remaining = slate?.remaining ?? dueReviews.length;
  const progressPct = target > 0 ? Math.round((done / target) * 100) : 0;

  const hasDue = remaining > 0;
  const now = Date.now();
  const upcomingNonDue = upcomingReviews
    // Only genuinely future items — never resurface prior-week/past-due leftovers
    .filter(r => new Date(r.nextReviewAt).getTime() > now)
    .filter(r => !dueReviews.find(d => d.id === r.id))
    .slice(0, 3);

  // Nothing scheduled at all this week
  const nothingThisWeek = target === 0 && upcomingNonDue.length === 0;

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Bell className={`h-5 w-5 ${hasDue ? 'text-primary' : 'text-muted-foreground'}`} />
          <h3 className="font-semibold">Optimal Review Timing</h3>
        </div>
        {target > 0 && (
          <span className="text-xs text-muted-foreground" data-testid="text-review-progress">
            {done} of {target} done
          </span>
        )}
      </div>

      {nothingThisWeek ? (
        <div className="text-center py-6">
          <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">All caught up! No reviews this week.</p>
          <p className="text-xs text-muted-foreground mt-1">
            Keep studying and new review items will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {target > 0 && (
            <div className="space-y-1.5">
              <p className="text-sm font-medium" data-testid="text-weekly-goal">
                {hasDue
                  ? `This week: refresh ${remaining} ${remaining === 1 ? 'area' : 'areas'}`
                  : `You've refreshed everything this week 🎉`}
              </p>
              <Progress value={progressPct} className="h-2" data-testid="progress-weekly-review" />
            </div>
          )}

          {hasDue && (
            <div className="space-y-2">
              {dueReviews.slice(0, 5).map((review) => {
                const Icon = itemTypeIcons[review.itemType] || BookOpen;
                const isMarked = markedIds.has(review.id);
                const isPending = markDoneMutation.isPending && markDoneMutation.variables === review.id;

                return (
                  <div
                    key={review.id}
                    className={`flex items-start gap-2 p-2 rounded-lg border transition-opacity ${
                      isMarked
                        ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800 opacity-70'
                        : 'bg-muted/30 border-border'
                    }`}
                    data-testid={`review-due-${review.itemId}`}
                  >
                    <Icon className={`h-4 w-4 mt-0.5 shrink-0 ${isMarked ? 'text-green-600' : 'text-muted-foreground'}`} />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium leading-snug">{review.itemTitle}</div>
                      {review.domain && (
                        <div className="text-xs text-muted-foreground">{review.domain}</div>
                      )}
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      {isMarked ? (
                        <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" />
                          Marked!
                        </span>
                      ) : (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onReviewClick?.(review)}
                            data-testid={`button-review-${review.itemId}`}
                          >
                            Review
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-xs text-green-700 dark:text-green-400 hover:text-green-800 hover:bg-green-50 dark:hover:bg-green-950/30 px-2"
                            onClick={() => markDoneMutation.mutate(review.id)}
                            disabled={isPending}
                            data-testid={`button-mark-done-${review.itemId}`}
                          >
                            {isPending ? (
                              <Loader2 className="h-3 w-3 animate-spin" />
                            ) : (
                              <>
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Mark Done
                              </>
                            )}
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
              {remaining > 5 && (
                <p className="text-xs text-center text-muted-foreground">
                  +{remaining - 5} more to refresh this week
                </p>
              )}
            </div>
          )}

          {upcomingNonDue.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium text-muted-foreground">Coming Up</span>
              </div>
              <div className="space-y-1.5">
                {upcomingNonDue.map((review) => {
                  const Icon = itemTypeIcons[review.itemType] || BookOpen;

                  return (
                    <div
                      key={review.id}
                      className="flex items-center justify-between p-2 rounded-lg bg-muted/30"
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{review.itemTitle}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        in {formatDistanceToNow(new Date(review.nextReviewAt))}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="mt-4 pt-3 border-t flex items-center justify-between gap-2">
        <p className="text-xs text-muted-foreground">
          Reviewing at the optimal time improves long-term retention by up to 50%
        </p>
        <Link
          href="/app/fs/readings/fs-strategy-spaced-rep"
          className="text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground whitespace-nowrap"
        >
          Learn the science →
        </Link>
      </div>
    </Card>
  );
}
