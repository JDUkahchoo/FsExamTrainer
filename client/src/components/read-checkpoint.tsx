import { useState, useEffect, useRef } from 'react';
import { BookOpen, ChevronDown, ChevronUp, MessageSquare, Star, Check, Loader2, ArrowRight, ScrollText, CalendarDays, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
import { computeDaysPerWeek, computeDailySchedule, type DaySchedule } from '@/lib/daily-schedule';
import { FS_WEEK_TO_READING_IDS, PS_WEEK_TO_READING_IDS } from '@/lib/week-reading-map';

function getWeekToReadingIds(examTrack: string): Record<number, string[]> {
  return examTrack === 'ps' ? PS_WEEK_TO_READING_IDS : FS_WEEK_TO_READING_IDS;
}

interface ReadCheckpointProps {
  week: number;
  chapters: string[];
  colorClass?: string;
  examTrack?: string;
  examDate?: Date | string | null;
  totalWeeks?: number;
}

export function ReadCheckpoint({
  week,
  chapters,
  colorClass = "text-foreground",
  examTrack = "fs",
  examDate,
  totalWeeks,
}: ReadCheckpointProps) {
  const [expandedChapter, setExpandedChapter] = useState<number | null>(null);
  const [localNotes, setLocalNotes] = useState<Record<number, string>>({});
  const [localRatings, setLocalRatings] = useState<Record<number, number>>({});
  const [collapsedDays, setCollapsedDays] = useState<Set<number>>(new Set());
  const { toast } = useToast();
  const hasInitialized = useRef(false);

  const { data: readingProgress = [], isLoading } = useQuery<ReadingProgress[]>({
    queryKey: ['/api/reading-progress', week, examTrack],
    queryFn: async () => {
      const res = await fetch(`/api/reading-progress/${week}?examTrack=${examTrack}`);
      if (!res.ok) throw new Error("Failed to fetch reading progress");
      return res.json();
    },
  });

  useEffect(() => {
    hasInitialized.current = false;
    setLocalNotes({});
    setLocalRatings({});
    setCollapsedDays(new Set());
  }, [week]);

  useEffect(() => {
    if (isLoading || hasInitialized.current) return;
    if (readingProgress.length === 0) {
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
      queryClient.invalidateQueries({ queryKey: ['/api/reading-progress', week, examTrack] });
      queryClient.invalidateQueries({ queryKey: ['/api/reading-progress', examTrack] });
      queryClient.invalidateQueries({ queryKey: ['/api/progress/domain-mastery'] });
      if (data.isNewCompletion) {
        queryClient.invalidateQueries({ queryKey: ['/api/xp'] });
        queryClient.invalidateQueries({ queryKey: ['/api/progress/overall', examTrack] });
        toast({ title: `+${XP_AWARDS.READ_CHECKPOINT} XP`, description: "Reading completed!" });
      }
    },
  });

  const getProgress = (index: number) => readingProgress.find(p => p.chapterIndex === index);
  const isItemDone = (chapterIndex: number) => getProgress(chapterIndex)?.completed ?? false;

  const handleToggle = (chapterIndex: number) => {
    const current = getProgress(chapterIndex);
    saveProgressMutation.mutate({
      chapterIndex,
      completed: !(current?.completed ?? false),
      confidenceRating: localRatings[chapterIndex],
      takeawayNote: localNotes[chapterIndex],
    });
  };

  const handleRatingChange = (chapterIndex: number, rating: number) => {
    setLocalRatings(prev => ({ ...prev, [chapterIndex]: rating }));
    const current = getProgress(chapterIndex);
    saveProgressMutation.mutate({
      chapterIndex,
      completed: current?.completed || false,
      confidenceRating: rating,
      takeawayNote: localNotes[chapterIndex],
    });
  };

  const handleNoteSave = (chapterIndex: number) => {
    const current = getProgress(chapterIndex);
    saveProgressMutation.mutate({
      chapterIndex,
      completed: current?.completed || false,
      confidenceRating: localRatings[chapterIndex],
      takeawayNote: localNotes[chapterIndex],
    });
    toast({ title: "Takeaway saved", description: "Your key insight has been recorded." });
  };

  const toggleDayCollapsed = (dayNumber: number) => {
    setCollapsedDays(prev => {
      const next = new Set(prev);
      if (next.has(dayNumber)) next.delete(dayNumber);
      else next.add(dayNumber);
      return next;
    });
  };

  // Build interactive readings for this week
  const weekToReadingMap = getWeekToReadingIds(examTrack);
  const readingIds = weekToReadingMap[week] || [];
  const weekReadings = readingIds
    .map(id => STUDY_READINGS.find(r => r.id === id))
    .filter(Boolean) as NonNullable<typeof STUDY_READINGS[0]>[];

  // Interactive readings use chapterIndex = chapters.length + their index
  // This is additive — existing chapter indices (0..chapters.length-1) are unchanged
  const interactiveOffset = chapters.length;

  const daysPerWeek = computeDaysPerWeek(examDate, week, totalWeeks);
  const daySchedule: DaySchedule[] = computeDailySchedule(
    weekReadings.map(r => ({ id: r.id, title: r.title, estimatedMinutes: r.estimatedMinutes })),
    chapters,
    daysPerWeek,
    interactiveOffset
  );

  // Overall progress: all items (chapters + interactive readings)
  const totalItems = chapters.length + weekReadings.length;
  const completedItems = readingProgress.filter(p => p.completed).length;
  const progressPercent = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;

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
    <div className="space-y-3" data-testid={`read-checkpoint-week-${week}`}>
      {/* Header */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className={`flex items-center gap-2 ${colorClass} font-semibold uppercase text-sm tracking-wider`}>
          <BookOpen className="w-4 h-4" />
          READ — Daily Schedule
        </div>
        <div className="flex items-center gap-2">
          {totalItems > 0 && (
            <Badge variant="secondary" className="text-xs">
              {completedItems}/{totalItems} done
            </Badge>
          )}
          {avgConfidence > 0 && (
            <Badge variant="outline" className="text-xs flex items-center gap-1">
              <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
              {avgConfidence.toFixed(1)} avg
            </Badge>
          )}
          {daysPerWeek !== 5 && (
            <Badge variant="outline" className="text-xs flex items-center gap-1">
              <CalendarDays className="w-3 h-3" />
              {daysPerWeek}-day week
            </Badge>
          )}
        </div>
      </div>

      {totalItems > 0 && <Progress value={progressPercent} className="h-1.5" />}

      {daySchedule.length === 0 && (
        <p className="text-sm text-muted-foreground italic">No readings scheduled for this week.</p>
      )}

      {/* Day-by-day layout */}
      <div className="space-y-3">
        {daySchedule.map(day => {
          const dayAllDone = day.items.length > 0 && day.items.every(item => isItemDone(item.chapterIndex));
          const isDayCollapsed = collapsedDays.has(day.dayNumber);
          const dayDoneCount = day.items.filter(item => isItemDone(item.chapterIndex)).length;

          return (
            <div
              key={day.dayNumber}
              className={`rounded-lg border ${dayAllDone ? 'border-primary/30 bg-primary/5' : 'border-border bg-background'}`}
              data-testid={`day-block-week-${week}-day-${day.dayNumber}`}
            >
              {/* Day header — toggle collapse */}
              <button
                className="w-full flex items-center justify-between px-3 py-2.5 text-left"
                onClick={() => toggleDayCollapsed(day.dayNumber)}
                data-testid={`button-toggle-day-${week}-${day.dayNumber}`}
              >
                <div className="flex items-center gap-2">
                  {dayAllDone ? (
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  ) : (
                    <CalendarDays className="w-4 h-4 text-muted-foreground shrink-0" />
                  )}
                  <span className={`text-sm font-semibold ${dayAllDone ? 'text-primary' : 'text-foreground'}`}>
                    Day {day.dayNumber}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {dayDoneCount}/{day.items.length} {day.items.length === 1 ? 'item' : 'items'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {dayAllDone && (
                    <Badge variant="secondary" className="text-xs text-primary bg-primary/10">
                      Complete
                    </Badge>
                  )}
                  {isDayCollapsed ? (
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <ChevronUp className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>
              </button>

              {/* Day items */}
              {!isDayCollapsed && (
                <div className="px-3 pb-3 space-y-2 border-t border-border/50">
                  <div className="pt-2 space-y-2">
                    {day.items.map(item => {
                      const itemDone = isItemDone(item.chapterIndex);

                      if (item.type === 'interactive') {
                        return (
                          <div
                            key={item.id}
                            className={`rounded-md border ${itemDone ? 'border-primary/20 bg-primary/5' : 'border-border bg-muted/20'}`}
                            data-testid={`interactive-item-week-${week}-${item.id}`}
                          >
                            <div className="flex items-center gap-2 p-2">
                              <Checkbox
                                checked={itemDone}
                                onCheckedChange={() => handleToggle(item.chapterIndex)}
                                className="shrink-0"
                                data-testid={`checkbox-interactive-${week}-${item.chapterIndex}`}
                              />
                              <Link
                                href={`/app/${examTrack}/readings/${item.id}?from=study-plan&week=${week}`}
                                className="flex items-center gap-2 flex-1 min-w-0 no-underline text-foreground group"
                                data-testid={`link-reading-${item.id}`}
                              >
                                <ScrollText className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                                <div className="flex-1 min-w-0">
                                  <div className={`text-sm truncate font-medium group-hover:underline ${itemDone ? 'line-through text-muted-foreground' : ''}`}>
                                    {item.title}
                                  </div>
                                  <div className="text-xs text-muted-foreground">Interactive Reading</div>
                                </div>
                                <Badge variant="outline" className="text-xs shrink-0">
                                  ~{item.estimatedMinutes} min
                                </Badge>
                                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                              </Link>
                            </div>
                          </div>
                        );
                      }

                      // Chapter item
                      const { chapterIndex } = item;
                      const isExpanded = expandedChapter === chapterIndex;
                      const rating = localRatings[chapterIndex] || getProgress(chapterIndex)?.confidenceRating || 0;

                      return (
                        <Collapsible
                          key={`chapter-${chapterIndex}`}
                          open={isExpanded}
                          onOpenChange={() => setExpandedChapter(isExpanded ? null : chapterIndex)}
                        >
                          <div className={`rounded-md border ${itemDone ? 'bg-muted/30 border-primary/20' : 'bg-background'}`}>
                            <div className="flex items-start gap-3 p-3">
                              <Checkbox
                                checked={itemDone}
                                onCheckedChange={() => handleToggle(chapterIndex)}
                                className="mt-0.5"
                                data-testid={`checkbox-read-${week}-${chapterIndex}`}
                              />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2">
                                  <span className={`text-sm ${itemDone ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                                    {item.text}
                                  </span>
                                  <CollapsibleTrigger asChild>
                                    <Button variant="ghost" size="sm" className="shrink-0" data-testid={`button-expand-${week}-${chapterIndex}`}>
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
                                        onClick={() => handleRatingChange(chapterIndex, star)}
                                        className="p-1 hover:scale-110 transition-transform"
                                        data-testid={`button-rating-${week}-${chapterIndex}-${star}`}
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
                                    value={localNotes[chapterIndex] || ''}
                                    onChange={(e) => setLocalNotes(prev => ({ ...prev, [chapterIndex]: e.target.value }))}
                                    className="min-h-[60px] text-sm"
                                    data-testid={`textarea-takeaway-${week}-${chapterIndex}`}
                                  />
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleNoteSave(chapterIndex)}
                                    disabled={saveProgressMutation.isPending}
                                    className="mt-2"
                                    data-testid={`button-save-takeaway-${week}-${chapterIndex}`}
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
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
