import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, Clock, BookOpen, Brain, CheckCircle, AlertTriangle, Loader2 } from 'lucide-react';
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

interface ReviewAlertsProps {
  onReviewClick?: (review: ReviewSchedule) => void;
}

export function ReviewAlerts({ onReviewClick }: ReviewAlertsProps) {
  const { examTrack } = useExamTrack();
  const [markedIds, setMarkedIds] = useState<Set<string>>(new Set());

  const { data: dueReviews = [], isLoading } = useQuery<ReviewSchedule[]>({
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
      return apiRequest('PATCH', `/api/retention/reviews/${reviewId}`, { quality: 3 });
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

  const hasDue = dueReviews.length > 0;
  const upcomingNonDue = upcomingReviews.filter(
    r => !dueReviews.find(d => d.id === r.id)
  ).slice(0, 3);

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Bell className={`h-5 w-5 ${hasDue ? 'text-orange-500' : 'text-muted-foreground'}`} />
          <h3 className="font-semibold">Optimal Review Timing</h3>
        </div>
        {hasDue && (
          <Badge variant="destructive" className="animate-pulse">
            {dueReviews.length} Due Now
          </Badge>
        )}
      </div>

      {dueReviews.length === 0 && upcomingNonDue.length === 0 ? (
        <div className="text-center py-6">
          <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">All caught up! No reviews due.</p>
          <p className="text-xs text-muted-foreground mt-1">
            Keep studying and new review items will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {hasDue && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <AlertTriangle className="h-4 w-4 text-orange-500" />
                <span className="font-medium text-orange-500">Review Now for Maximum Retention</span>
              </div>
              <div className="space-y-2">
                {dueReviews.slice(0, 5).map((review) => {
                  const Icon = itemTypeIcons[review.itemType] || BookOpen;
                  const overdue = new Date(review.nextReviewAt) < new Date();
                  const isMarked = markedIds.has(review.id);
                  const isPending = markDoneMutation.isPending && markDoneMutation.variables === review.id;

                  return (
                    <div
                      key={review.id}
                      className={`flex items-center justify-between p-2 rounded-lg border transition-opacity ${
                        isMarked
                          ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800 opacity-70'
                          : 'bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-800'
                      }`}
                      data-testid={`review-due-${review.itemId}`}
                    >
                      <div className="flex items-center gap-2">
                        <Icon className={`h-4 w-4 ${isMarked ? 'text-green-600' : 'text-orange-600'}`} />
                        <div>
                          <span className="text-sm font-medium">{review.itemTitle}</span>
                          {review.domain && (
                            <span className="text-xs text-muted-foreground ml-2">
                              ({review.domain})
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {overdue && !isMarked && (
                          <span className="text-xs text-orange-600">
                            {formatDistanceToNow(new Date(review.nextReviewAt))} overdue
                          </span>
                        )}
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
                              className="text-xs text-green-700 dark:text-green-400 hover:text-green-800 hover:bg-green-50 dark:hover:bg-green-950/30"
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
                {dueReviews.length > 5 && (
                  <p className="text-xs text-center text-muted-foreground">
                    +{dueReviews.length - 5} more items due for review
                  </p>
                )}
              </div>
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
          href={`/app/${examTrack}/readings/fs-strategy-spaced-rep`}
          className="text-xs text-primary underline underline-offset-2 hover:opacity-80 whitespace-nowrap"
        >
          Learn the science →
        </Link>
      </div>
    </Card>
  );
}
