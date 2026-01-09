import { useQuery } from '@tanstack/react-query';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bot, Target, TrendingUp, Lightbulb, Clock, AlertCircle, Loader2 } from 'lucide-react';
import type { ReviewSchedule } from '@shared/schema';

interface StudyCoachBriefing {
  greeting: string;
  focusRecommendation: string;
  progressInsight: string;
  motivationalMessage: string;
  todaysPriorities: string[];
  dueReviews: ReviewSchedule[];
}

export function StudyCoachBriefing() {
  const { data: briefing, isLoading, error } = useQuery<StudyCoachBriefing>({
    queryKey: ['/api/study-coach/briefing']
  });

  if (isLoading) {
    return (
      <Card className="p-4">
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      </Card>
    );
  }

  if (error || !briefing) {
    return (
      <Card className="p-4">
        <div className="flex items-center gap-2 text-muted-foreground">
          <AlertCircle className="h-5 w-5" />
          <span>Unable to load study coach briefing</span>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4 bg-gradient-to-br from-primary/5 to-transparent">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-full bg-primary/10">
          <Bot className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold">AI Study Coach</h3>
          <p className="text-sm text-muted-foreground">{briefing.greeting}! Here's your daily briefing.</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="p-3 rounded-lg bg-background border">
          <div className="flex items-start gap-2">
            <Target className="h-4 w-4 text-orange-500 mt-0.5 shrink-0" />
            <div>
              <span className="text-xs font-medium text-orange-500 uppercase tracking-wide">Focus Today</span>
              <p className="text-sm mt-0.5">{briefing.focusRecommendation}</p>
            </div>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-background border">
          <div className="flex items-start gap-2">
            <TrendingUp className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
            <div>
              <span className="text-xs font-medium text-green-500 uppercase tracking-wide">Progress Insight</span>
              <p className="text-sm mt-0.5">{briefing.progressInsight}</p>
            </div>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-background border">
          <div className="flex items-start gap-2">
            <Lightbulb className="h-4 w-4 text-yellow-500 mt-0.5 shrink-0" />
            <div>
              <span className="text-xs font-medium text-yellow-500 uppercase tracking-wide">Motivation</span>
              <p className="text-sm mt-0.5">{briefing.motivationalMessage}</p>
            </div>
          </div>
        </div>

        {briefing.todaysPriorities.length > 0 && (
          <div className="pt-2">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Today's Priorities</span>
            </div>
            <ul className="space-y-1.5">
              {briefing.todaysPriorities.map((priority, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <span className="text-primary">•</span>
                  <span>{priority}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {briefing.dueReviews.length > 0 && (
          <div className="pt-2 border-t">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Spaced Repetition Due</span>
              <Badge variant="secondary">{briefing.dueReviews.length} items</Badge>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {briefing.dueReviews.slice(0, 5).map((review) => (
                <Badge key={review.id} variant="outline" className="text-xs">
                  {review.itemTitle}
                </Badge>
              ))}
              {briefing.dueReviews.length > 5 && (
                <Badge variant="outline" className="text-xs">
                  +{briefing.dueReviews.length - 5} more
                </Badge>
              )}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
