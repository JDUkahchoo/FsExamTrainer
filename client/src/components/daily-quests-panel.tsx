import { useQuery } from '@tanstack/react-query';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Target, BookOpen, Brain, Dumbbell, Loader2, Sparkles } from 'lucide-react';
import { useExamTrack } from '@/contexts/exam-track-context';
import type { DailyQuest } from '@shared/schema';

const questIcons: Record<string, any> = {
  complete_flashcards: Brain,
  complete_lesson: BookOpen,
  complete_quiz: Target,
  complete_all_pillars: Dumbbell,
  study_time: Target,
  review_weak_domain: Sparkles
};

export function DailyQuestsPanel() {
  const { examTrack } = useExamTrack();
  const { data: quests = [], isLoading, isError } = useQuery<DailyQuest[]>({
    queryKey: ['/api/daily-quests', examTrack],
    queryFn: async () => {
      const res = await fetch(`/api/daily-quests?examTrack=${examTrack}`, {
        credentials: 'include',
      });
      if (!res.ok) throw new Error(`${res.status}: Failed to fetch quests`);
      return res.json();
    },
    retry: 1,
    retryDelay: 2000,
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

  if (isError) {
    return (
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <Target className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Daily Quests</h3>
        </div>
        <p className="text-sm text-muted-foreground text-center py-4">
          Could not load quests. Please refresh the page or log in again.
        </p>
      </Card>
    );
  }

  const completedCount = quests.filter(q => q.isCompleted).length;
  const totalXP = quests.reduce((sum, q) => sum + (q.isCompleted ? q.xpReward : 0), 0);
  const potentialXP = quests.reduce((sum, q) => sum + q.xpReward, 0);

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Daily Quests</h3>
        </div>
        <Badge variant={completedCount === quests.length ? "default" : "secondary"}>
          {completedCount}/{quests.length} Complete
        </Badge>
      </div>

      {quests.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-4">
          No quests available today. Check back tomorrow!
        </p>
      ) : (
        <div className="space-y-3">
          {quests.map((quest) => {
            const Icon = questIcons[quest.questType] || Target;
            const progress = (quest.currentCount / quest.targetCount) * 100;
            
            return (
              <div 
                key={quest.id} 
                className={`p-3 rounded-lg border ${quest.isCompleted ? 'bg-primary/5 border-primary/20' : 'bg-muted/30'}`}
                data-testid={`quest-${quest.questType}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-md ${quest.isCompleted ? 'bg-primary/10' : 'bg-muted'}`}>
                    {quest.isCompleted ? (
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    ) : (
                      <Icon className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`font-medium text-sm ${quest.isCompleted ? 'line-through text-muted-foreground' : ''}`}>
                        {quest.title}
                      </span>
                      <Badge variant="outline" className="text-xs shrink-0">
                        +{quest.xpReward} XP
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {quest.description}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <Progress value={progress} className="h-1.5 flex-1" />
                      <span className="text-xs text-muted-foreground">
                        {quest.currentCount}/{quest.targetCount}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-4 pt-3 border-t flex items-center justify-between text-sm">
        <span className="text-muted-foreground">XP Earned Today</span>
        <span className="font-semibold text-primary">{totalXP} / {potentialXP} XP</span>
      </div>
    </Card>
  );
}
