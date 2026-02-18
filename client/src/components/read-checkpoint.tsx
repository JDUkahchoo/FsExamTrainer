import { useState, useEffect, useRef } from 'react';
import { BookOpen, ChevronDown, ChevronUp, MessageSquare, Star, Check, Loader2, Zap, ArrowRight, ScrollText } from 'lucide-react';
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
import { Link } from 'wouter';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import type { ReadingProgress } from '@shared/schema';
import { XP_AWARDS } from '@shared/schema';
import { STUDY_READINGS } from '@shared/data/studyReadings';

const FS_WEEK_TO_READING_IDS: Record<number, string[]> = {
  1: ['fs-d0-trig', 'fs-d0-cogo', 'fs-d0-units'],
  2: ['fs-d1-leveling', 'fs-d1-topo'],
  3: ['fs-d1-angles', 'fs-d1-construction'],
  4: ['fs-d2-traverse', 'fs-d2-alta'],
  5: ['fs-d2-areas', 'fs-d1-uas'],
  6: ['fs-d2-curves'],
  7: ['fs-d3-geodesy', 'fs-d4-advgeo'],
  8: ['fs-d3-gnss', 'fs-d4-historical'],
  9: ['fs-d4-mapping', 'fs-d6-project'],
  10: ['fs-d5-boundary', 'fs-d5-easements'],
  11: ['fs-d5-plss', 'fs-d5-conveyances'],
  12: ['fs-d5-corners', 'fs-d5-commonlaw', 'fs-d5-sources'],
  13: ['fs-d6-ethics', 'fs-d6-liability'],
  14: ['fs-d7-errorprop', 'fs-d7-leastsquares', 'fs-d7-hypothesis'],
  15: ['fs-std-alta', 'fs-std-fema', 'fs-std-fgcs', 'fs-std-nsps'],
};

const PS_WEEK_TO_READING_IDS: Record<number, string[]> = {
  1: ['ps-d1-evidence', 'ps-d1-deeds'],
  2: ['ps-d1-easements', 'ps-d1-adverse'],
  3: ['ps-d1-water'],
  4: ['ps-d2-standard-care', 'ps-d2-documentation'],
  5: ['ps-d2-reports', 'ps-d2-expert'],
  6: ['ps-d3-alta', 'ps-d3-fema'],
  7: ['ps-d3-accuracy', 'ps-d3-mts'],
  8: ['ps-d4-entities', 'ps-d4-contracts', 'ps-d4-risk'],
  9: ['ps-d5-boundary', 'ps-d5-construction'],
  10: ['ps-d5-subdivision', 'ps-d5-geodetic'],
  11: ['ps-d1-evidence', 'ps-d2-standard-care', 'ps-d5-boundary'],
  12: ['ps-d3-alta', 'ps-d4-risk', 'ps-d5-construction'],
};

function getWeekToReadingIds(examTrack: string): Record<number, string[]> {
  return examTrack === 'ps' ? PS_WEEK_TO_READING_IDS : FS_WEEK_TO_READING_IDS;
}

interface ReadCheckpointProps {
  week: number;
  chapters: string[];
  colorClass?: string;
  examTrack?: string;
}

export function ReadCheckpoint({ week, chapters, colorClass = "text-foreground", examTrack = "fs" }: ReadCheckpointProps) {
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
      const res = await apiRequest('POST', '/api/reading-progress', {
        week,
        chapterIndex: data.chapterIndex,
        completed: data.completed,
        confidenceRating: data.confidenceRating,
        takeawayNote: data.takeawayNote,
        examTrack,
      });
      return res.json() as Promise<{ isNewCompletion: boolean }>;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [`/api/reading-progress/${week}`] });
      queryClient.invalidateQueries({ queryKey: ['/api/reading-progress'] });
      // Show XP toast only for NEW completions (backend handles the actual XP award)
      if (data.isNewCompletion) {
        queryClient.invalidateQueries({ queryKey: ['/api/xp'] });
        toast({ 
          title: `+${XP_AWARDS.READ_CHECKPOINT} XP`, 
          description: "Chapter checkpoint completed!" 
        });
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
    
    // Backend handles XP awarding and quest progress, returns isNewCompletion flag
    saveProgressMutation.mutate({
      chapterIndex: index,
      completed: newCompleted,
      confidenceRating: localRatings[index],
      takeawayNote: localNotes[index],
    });
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

      {(() => {
        const weekToReadingMap = getWeekToReadingIds(examTrack);
        const readingIds = weekToReadingMap[week] || [];
        const weekReadings = readingIds
          .map(id => STUDY_READINGS.find(r => r.id === id))
          .filter(Boolean);

        if (weekReadings.length === 0) return null;

        return (
          <div className="space-y-1.5" data-testid={`study-readings-week-${week}`}>
            <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <ScrollText className="w-3.5 h-3.5" />
              Interactive Study Readings
            </div>
            {weekReadings.map(reading => (
              <Link key={reading!.id} href={`/app/${examTrack}/readings/${reading!.id}`}>
                <a
                  className="flex items-center gap-2 rounded-md border p-2 text-sm hover-elevate cursor-pointer no-underline text-foreground"
                  data-testid={`link-reading-${reading!.id}`}
                >
                  <BookOpen className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                  <span className="flex-1 min-w-0 truncate">{reading!.title}</span>
                  <Badge variant="outline" className="text-xs shrink-0">
                    ~{reading!.estimatedMinutes} min
                  </Badge>
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                </a>
              </Link>
            ))}
          </div>
        );
      })()}

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
