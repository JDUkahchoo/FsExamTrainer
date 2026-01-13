import { useQuery } from '@tanstack/react-query';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, Clock, BookOpen, Brain, CheckCircle, AlertTriangle, Loader2 } from 'lucide-react';
import { useExamTrack } from '@/contexts/exam-track-context';
import type { ReviewSchedule } from '@shared/schema';
import { formatDistanceToNow } from 'date-fns';

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
                  
                  return (
                    <div 
                      key={review.id}
                      className="flex items-center justify-between p-2 rounded-lg bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800"
                      data-testid={`review-due-${review.itemId}`}
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4 text-orange-600" />
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
                        {overdue && (
                          <span className="text-xs text-orange-600">
                            {formatDistanceToNow(new Date(review.nextReviewAt))} overdue
                          </span>
                        )}
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => onReviewClick?.(review)}
                          data-testid={`button-review-${review.itemId}`}
                        >
                          Review
                        </Button>
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

      <div className="mt-4 pt-3 border-t">
        <p className="text-xs text-muted-foreground text-center">
          Reviewing at the optimal time improves long-term retention by up to 50%
        </p>
      </div>
    </Card>
  );
}
