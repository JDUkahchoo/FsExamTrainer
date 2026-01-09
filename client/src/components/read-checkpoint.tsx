import { useState, useEffect, useRef } from 'react';
import { BookOpen, ChevronDown, ChevronUp, MessageSquare, Star, Check, Loader2, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import type { ReadingProgress } from '@shared/schema';
import { XP_AWARDS } from '@shared/schema';

interface ReadCheckpointProps {
  week: number;
  chapters: string[];
  colorClass?: string;
}

export function ReadCheckpoint({ week, chapters, colorClass = "text-primary" }: ReadCheckpointProps) {
  const [expandedChapter, setExpandedChapter] = useState<number | null>(null);
  const [localNotes, setLocalNotes] = useState<Record<number, string>>({});
  const [localRatings, setLocalRatings] = useState<Record<number, number>>({});
  const { toast } = useToast();
  const lastSyncedWeek = useRef<number | null>(null);
  const hasInitialized = useRef(false);

  const { data: readingProgress = [], isLoading } = useQuery<ReadingProgress[]>({
    queryKey: [`/api/reading-progress/${week}`],
  });

  // Reset local state when week changes
  useEffect(() => {
    lastSyncedWeek.current = null;
    hasInitialized.current = false;
    setLocalNotes({});
    setLocalRatings({});
  }, [week]);

  // Sync local state from server data only once after initial load per week
  useEffect(() => {
    if (isLoading || hasInitialized.current) return;
    if (readingProgress.length === 0 && !isLoading) {
      hasInitialized.current = true;
      return;
    }
    
    const notes: Record<number, string> = {};
    const ratings: Record<number, number> = {};
    readingProgress.forEach(p => {
      if (p.takeawayNote) notes[p.chapterIndex] = p.takeawayNote;
      if (p.confidenceRating) ratings[p.chapterIndex] = p.confidenceRating;
    });
    setLocalNotes(notes);
    setLocalRatings(ratings);
    hasInitialized.current = true;
  }, [isLoading, readingProgress]);

  const saveProgressMutation = useMutation({
    mutationFn: async (data: { chapterIndex: number; completed: boolean; confidenceRating?: number; takeawayNote?: string }) => {
      return apiRequest('POST', '/api/reading-progress', {
        week,
        chapterIndex: data.chapterIndex,
        completed: data.completed,
        confidenceRating: data.confidenceRating,
        takeawayNote: data.takeawayNote,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/reading-progress/${week}`] });
      queryClient.invalidateQueries({ queryKey: ['/api/reading-progress'] });
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

  const getChapterProgress = (index: number) => {
    return readingProgress.find(p => p.chapterIndex === index);
  };

  const handleToggleComplete = (index: number) => {
    const current = getChapterProgress(index);
    const wasCompleted = current?.completed ?? false;
    const newCompleted = !wasCompleted;
    
    saveProgressMutation.mutate({
      chapterIndex: index,
      completed: newCompleted,
      confidenceRating: localRatings[index],
      takeawayNote: localNotes[index],
    });
    
    // Award XP with backend idempotency (activity key prevents duplicate awards)
    if (newCompleted) {
      awardXpMutation.mutate({ 
        amount: XP_AWARDS.READ_CHECKPOINT, 
        reason: 'Chapter checkpoint completed',
        activityKey: `read:week${week}:chapter${index}`
      }, {
        onSuccess: (data) => {
          if (data.awarded) {
            toast({ 
              title: `+${XP_AWARDS.READ_CHECKPOINT} XP`, 
              description: "Chapter checkpoint completed!" 
            });
          }
        }
      });
    }
  };

  const handleRatingChange = (index: number, rating: number) => {
    setLocalRatings(prev => ({ ...prev, [index]: rating }));
    const current = getChapterProgress(index);
    saveProgressMutation.mutate({
      chapterIndex: index,
      completed: current?.completed || false,
      confidenceRating: rating,
      takeawayNote: localNotes[index],
    });
  };

  const handleNoteSave = (index: number) => {
    const current = getChapterProgress(index);
    saveProgressMutation.mutate({
      chapterIndex: index,
      completed: current?.completed || false,
      confidenceRating: localRatings[index],
      takeawayNote: localNotes[index],
    });
    toast({ title: "Takeaway saved", description: "Your key insight has been recorded." });
  };

  const completedCount = readingProgress.filter(p => p.completed).length;
  const progressPercent = chapters.length > 0 ? (completedCount / chapters.length) * 100 : 0;
  const ratedProgress = readingProgress.filter(p => p.confidenceRating && p.confidenceRating > 0);
  const avgConfidence = ratedProgress.length > 0 
    ? ratedProgress.reduce((acc, p) => acc + (p.confidenceRating || 0), 0) / ratedProgress.length 
    : 0;

  if (isLoading) {
    return (
      <div className="space-y-3">
        <div className={`flex items-center gap-2 ${colorClass} font-semibold uppercase text-sm tracking-wider`}>
          <BookOpen className="w-4 h-4" />
          READ
        </div>
        <div className="flex items-center justify-center p-4">
          <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className={`flex items-center gap-2 ${colorClass} font-semibold uppercase text-sm tracking-wider`}>
          <BookOpen className="w-4 h-4" />
          READ - Comprehension Checkpoint
        </div>
        <div className="flex items-center gap-2">
          {completedCount > 0 && (
            <Badge variant="secondary" className="text-xs">
              {completedCount}/{chapters.length} read
            </Badge>
          )}
          {avgConfidence > 0 && (
            <Badge variant="outline" className="text-xs flex items-center gap-1">
              <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
              {avgConfidence.toFixed(1)} avg
            </Badge>
          )}
        </div>
      </div>

      <Progress value={progressPercent} className="h-1.5" />

      <div className="space-y-2">
        {chapters.map((chapter, index) => {
          const progress = getChapterProgress(index);
          const isExpanded = expandedChapter === index;
          const isCompleted = progress?.completed || false;
          const rating = localRatings[index] || progress?.confidenceRating || 0;

          return (
            <Collapsible
              key={index}
              open={isExpanded}
              onOpenChange={() => setExpandedChapter(isExpanded ? null : index)}
            >
              <div className={`rounded-md border ${isCompleted ? 'bg-muted/30 border-primary/20' : 'bg-background'}`}>
                <div className="flex items-start gap-3 p-3">
                  <Checkbox
                    checked={isCompleted}
                    onCheckedChange={() => handleToggleComplete(index)}
                    className="mt-0.5"
                    data-testid={`checkbox-read-${week}-${index}`}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-sm ${isCompleted ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                        {chapter}
                      </span>
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="sm" className="shrink-0" data-testid={`button-expand-${week}-${index}`}>
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </Button>
                      </CollapsibleTrigger>
                    </div>
                    
                    {rating > 0 && !isExpanded && (
                      <div className="flex items-center gap-1 mt-1">
                        {[1, 2, 3, 4, 5].map(star => (
                          <Star
                            key={star}
                            className={`w-3 h-3 ${star <= rating ? 'fill-yellow-500 text-yellow-500' : 'text-muted-foreground/30'}`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <CollapsibleContent>
                  <div className="px-3 pb-3 pt-0 space-y-3 border-t border-border/50">
                    <div className="pt-3">
                      <label className="text-xs font-medium text-muted-foreground mb-2 block">
                        How confident do you feel about this material?
                      </label>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map(star => (
                          <button
                            key={star}
                            onClick={() => handleRatingChange(index, star)}
                            className="p-1 hover:scale-110 transition-transform"
                            data-testid={`button-rating-${week}-${index}-${star}`}
                          >
                            <Star
                              className={`w-5 h-5 ${star <= rating ? 'fill-yellow-500 text-yellow-500' : 'text-muted-foreground/40 hover:text-yellow-400'}`}
                            />
                          </button>
                        ))}
                        <span className="text-xs text-muted-foreground ml-2">
                          {rating === 0 && "Rate your understanding"}
                          {rating === 1 && "Need to re-read"}
                          {rating === 2 && "Somewhat confused"}
                          {rating === 3 && "Decent understanding"}
                          {rating === 4 && "Good grasp"}
                          {rating === 5 && "Fully confident"}
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
                        <MessageSquare className="w-3 h-3" />
                        Key Takeaway
                      </label>
                      <Textarea
                        placeholder="What's the most important concept you learned from this chapter?"
                        value={localNotes[index] || ''}
                        onChange={(e) => setLocalNotes(prev => ({ ...prev, [index]: e.target.value }))}
                        className="min-h-[60px] text-sm"
                        data-testid={`textarea-takeaway-${week}-${index}`}
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleNoteSave(index)}
                        disabled={saveProgressMutation.isPending}
                        className="mt-2"
                        data-testid={`button-save-takeaway-${week}-${index}`}
                      >
                        {saveProgressMutation.isPending ? (
                          <Loader2 className="w-3 h-3 animate-spin mr-1" />
                        ) : (
                          <Check className="w-3 h-3 mr-1" />
                        )}
                        Save Takeaway
                      </Button>
                    </div>
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>
          );
        })}
      </div>
    </div>
  );
}
