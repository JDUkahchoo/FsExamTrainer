import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Brain, AlertTriangle, Clock, TrendingDown, CheckCircle } from "lucide-react";
import { useExamTrack } from '@/contexts/exam-track-context';

interface ForgettingCurveItem {
  itemId: string;
  itemTitle: string;
  domain: string | null;
  daysSinceReview: number;
  retentionPercent: number;
  nextReviewIn: number;
  easeFactor: number;
  reviewCount: number;
}

interface ForgettingCurveData {
  items: ForgettingCurveItem[];
  summary: {
    avgRetention: number;
    itemsDue: number;
    itemsAtRisk: number;
  };
}

export function ForgettingCurveChart({ compact = false, onItemClick }: { compact?: boolean; onItemClick?: (item: ForgettingCurveItem) => void }) {
  const { examTrack } = useExamTrack();
  const { data, isLoading } = useQuery<ForgettingCurveData>({
    queryKey: [`/api/forgetting-curve?examTrack=${examTrack}`],
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-500" />
            Memory Retention
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-32 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (!data || data.items.length === 0) {
    return (
      <Card data-testid="card-forgetting-curve">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-500" />
            Memory Retention
          </CardTitle>
          <CardDescription>Track how well you remember concepts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6 text-muted-foreground">
            <Brain className="w-10 h-10 mx-auto mb-2 opacity-50" />
            <p>No review data yet</p>
            <p className="text-sm">Complete flashcards or lessons to build your memory curve</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const { summary, items } = data;
  const displayItems = compact ? items.slice(0, 5) : items.slice(0, 10);

  const getRetentionColor = (percent: number) => {
    if (percent >= 80) return 'text-green-600 dark:text-green-400';
    if (percent >= 50) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getRetentionBg = (percent: number) => {
    if (percent >= 80) return 'bg-green-500';
    if (percent >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getRetentionBadge = (percent: number) => {
    if (percent >= 80) return { label: 'Strong', variant: 'default' as const, className: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' };
    if (percent >= 50) return { label: 'Fading', variant: 'outline' as const, className: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' };
    return { label: 'At Risk', variant: 'destructive' as const, className: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' };
  };

  return (
    <Card data-testid="card-forgetting-curve">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-500" />
              Memory Retention
            </CardTitle>
            <CardDescription>How well you're remembering concepts</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-3 rounded-lg bg-muted/50">
            <div className={`text-2xl font-bold ${getRetentionColor(summary.avgRetention)}`}>
              {summary.avgRetention}%
            </div>
            <p className="text-xs text-muted-foreground">Avg Retention</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-muted/50">
            <div className="text-2xl font-bold text-primary flex items-center justify-center gap-1">
              <Clock className="w-4 h-4" />
              {summary.itemsDue}
            </div>
            <p className="text-xs text-muted-foreground">Due Now</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-muted/50">
            <div className="text-2xl font-bold text-red-500 flex items-center justify-center gap-1">
              <AlertTriangle className="w-4 h-4" />
              {summary.itemsAtRisk}
            </div>
            <p className="text-xs text-muted-foreground">At Risk</p>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <TrendingDown className="w-4 h-4 text-muted-foreground" />
            Concepts Needing Attention
          </h4>
          
          {displayItems.map((item) => {
            const badge = getRetentionBadge(item.retentionPercent);
            return (
              <div 
                key={item.itemId}
                className="flex items-center gap-3 p-2 rounded-lg border bg-card"
                data-testid={`retention-item-${item.itemId}`}
              >
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{item.itemTitle}</p>
                  <div className="flex items-center gap-2 mt-1">
                    {item.domain && (
                      <span className="text-xs text-muted-foreground">{item.domain}</span>
                    )}
                    <span className="text-xs text-muted-foreground">
                      {item.daysSinceReview === 0 ? 'Today' : `${item.daysSinceReview}d ago`}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-16">
                    <Progress 
                      value={item.retentionPercent} 
                      className="h-2"
                    />
                  </div>
                  <Badge variant={badge.variant} className={`text-xs ${badge.className}`}>
                    {item.retentionPercent}%
                  </Badge>
                </div>

                {item.nextReviewIn <= 0 ? (
                  <Badge variant="outline" className="text-xs bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400">
                    <Clock className="w-3 h-3 mr-1" />
                    Due
                  </Badge>
                ) : (
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    in {item.nextReviewIn}d
                  </span>
                )}

                {onItemClick && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs px-2 h-7"
                    onClick={() => onItemClick(item)}
                    data-testid={`button-retention-review-${item.itemId}`}
                  >
                    Review
                  </Button>
                )}
              </div>
            );
          })}
        </div>

        {items.length > displayItems.length && (
          <p className="text-xs text-center text-muted-foreground">
            +{items.length - displayItems.length} more items tracked
          </p>
        )}
      </CardContent>
    </Card>
  );
}
