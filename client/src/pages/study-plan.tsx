import { useState, useMemo } from 'react';
import { useLocation } from 'wouter';
import { ChevronDown, ChevronRight, CheckCircle2, BookOpen, Target, Dumbbell, BrainCircuit, Loader2, Plus, Trash2, AlertCircle, Calendar, Edit2, Clock, Crown, XCircle, Play, ExternalLink, Layers, Construction } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getDomainConfig } from '@/lib/domains';
import { STUDY_PLAN, PS_STUDY_PLAN } from '@shared/data/studyPlan';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { useActivityLogger } from '@/hooks/use-activity-logger';
import { parseTimeToMinutes, formatMinutes } from '@/lib/time-utils';
import { DOMAINS } from '@shared/schema';
import type { WeekPlan, WeekProgress, CustomWeek, Domain, UserPreferences, PretestResult, DailyLog } from '@shared/schema';
import { getWeeklyLessonsByMode, generateCustomWeekPlans } from '@/lib/study-plan-logic';
import { CustomPlanBuilder } from '@/components/custom-plan-builder';
import { ReadCheckpoint } from '@/components/read-checkpoint';
import { FocusWeaknessScanner } from '@/components/focus-weakness-scanner';
import { ApplyScenarioLab } from '@/components/apply-scenario-lab';
import { ReinforceRetentionBooster } from '@/components/reinforce-retention-booster';
import { 
  getESWeeklyChapters, 
  getSRMWeeklyChapters,
  getChaptersForLessons 
} from '@shared/data/referenceManualMappings';
import { solvedProblemsTopics, type SolvedProblemsTopic } from '@shared/data/solved-problems-reference';
import { useExamTrack } from '@/contexts/exam-track-context';
import { FileText } from 'lucide-react';

export default function StudyPlan() {
  const [, navigate] = useLocation();
  const { examTrack, examName, domains: examDomains } = useExamTrack();
  const [expandedWeek, setExpandedWeek] = useState<number | null>(1);
  const [expandedDailyLogs, setExpandedDailyLogs] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newWeekTitle, setNewWeekTitle] = useState('');
  const [newWeekDomain, setNewWeekDomain] = useState<Domain | ''>('');
  const [readActivities, setReadActivities] = useState('');
  const [focusActivities, setFocusActivities] = useState('');
  const [applyActivities, setApplyActivities] = useState('');
  const [reinforceActivities, setReinforceActivities] = useState('');
  const [newDailyActivity, setNewDailyActivity] = useState('');
  const [newTimeSpent, setNewTimeSpent] = useState('');
  const [newDomain, setNewDomain] = useState<Domain | ''>('');
  const [editingLogId, setEditingLogId] = useState<string | null>(null);
  const { toast } = useToast();
  const { logActivity } = useActivityLogger();

  // Use appropriate study plan based on exam track
  const baseStudyPlan = examTrack === 'ps' ? PS_STUDY_PLAN : STUDY_PLAN;

  // Fetch all week progress from database
  const { data: weekProgressData, isLoading } = useQuery<WeekProgress[]>({
    queryKey: ['/api/progress/weeks']
  });

  // Fetch custom weeks
  const { data: customWeeks = [] } = useQuery<CustomWeek[]>({
    queryKey: ['/api/custom-weeks']
  });

  // Fetch user preferences
  const { data: preferences } = useQuery<UserPreferences>({
    queryKey: ['/api/preferences'],
  });

  // Fetch latest pretest results
  const { data: pretestResult } = useQuery<PretestResult>({
    queryKey: ['/api/pretest/latest'],
    enabled: preferences?.hasCompletedPretest === true,
  });

  // Fetch daily logs
  const { data: dailyLogs = [] } = useQuery<DailyLog[]>({
    queryKey: ['/api/daily-logs']
  });

  // Fetch lesson progress - use staleTime: 0 to always refetch when component mounts
  // This ensures lesson completion status is fresh when returning from lessons
  const { data: lessonProgressData = [] } = useQuery<any[]>({
    queryKey: ['/api/lessons/progress', examTrack],
    queryFn: async () => {
      const res = await fetch(`/api/lessons/progress?examTrack=${examTrack}`);
      if (!res.ok) throw new Error('Failed to fetch progress');
      return res.json();
    },
    staleTime: 0,
    refetchOnMount: 'always',
  });

  // Fetch ALL lessons for study plan distribution
  const { data: allLessons = [] } = useQuery<any[]>({
    queryKey: ['/api/lessons', examTrack],
    queryFn: async () => {
      const res = await fetch(`/api/lessons?examTrack=${examTrack}`);
      if (!res.ok) throw new Error('Failed to fetch lessons');
      return res.json();
    }
  });

  // Fetch overall progress for the progress indicator
  const { data: overallProgressData } = useQuery<{
    overallProgress: number;
    weeksCompleted: number;
    totalWeeks: number;
    quizAccuracy: number;
    flashcardsMastered: number;
    currentStreak: number;
  }>({
    queryKey: ['/api/progress/overall']
  });

  // Identify weak domains from pretest results (accuracy < 60%)
  const weakDomains = useMemo(() => {
    if (!pretestResult?.domainScores) return new Set<Domain>();
    
    const weak = new Set<Domain>();
    Object.entries(pretestResult.domainScores).forEach(([domain, score]) => {
      if (typeof score === 'object' && 'accuracy' in score && score.accuracy < 60) {
        weak.add(domain as Domain);
      }
    });
    return weak;
  }, [pretestResult]);

  // Convert pretest results to domain scores for study plan logic
  const domainScores = useMemo(() => {
    if (!pretestResult?.domainScores) return [];
    
    // domainScores is stored as: { "1": { correct: number, total: number, accuracy: number }, ... }
    const scores = pretestResult.domainScores as Record<string, { correct: number; total: number; accuracy: number }>;
    
    // Convert to array format expected by study plan logic
    return Object.entries(scores).map(([domainNumStr, stats]) => {
      const domainNumber = parseInt(domainNumStr);
      return {
        domainNumber,
        correct: stats.correct,
        total: stats.total,
        percentage: stats.accuracy
      };
    });
  }, [pretestResult]);

  // Memoize custom plan builder props to prevent unnecessary re-renders
  // Use a stable empty object reference to avoid triggering useEffect in CustomPlanBuilder
  const EMPTY_WEEKLY_DOMAINS = useMemo(() => ({}), []);
  
  const currentCustomWeeklyDomains = useMemo(() => {
    if (!preferences?.customWeeklyDomains) return EMPTY_WEEKLY_DOMAINS;
    return preferences.customWeeklyDomains as Record<string, number[]>;
  }, [preferences?.customWeeklyDomains, EMPTY_WEEKLY_DOMAINS]);

  const currentCustomTimeline = useMemo(() => {
    return preferences?.customTimeline || 12;
  }, [preferences?.customTimeline]);

  // Organize lessons by week based on study mode
  const weeklyLessonsMap = useMemo(() => {
    const studyMode = (preferences?.studyMode || 'standard') as import('@shared/schema').StudyMode;
    const customWeeklyDomains = preferences?.customWeeklyDomains as Record<string, number[]> | undefined;
    const customTimeline = preferences?.customTimeline || 12;
    return getWeeklyLessonsByMode(studyMode, allLessons, domainScores, customWeeklyDomains, customTimeline);
  }, [preferences?.studyMode, preferences?.customWeeklyDomains, preferences?.customTimeline, allLessons, domainScores]);

  // Check if a week covers any weak domains
  const coversWeakDomain = (domains: Domain[]) => {
    return domains.some(d => weakDomains.has(d));
  };

  // Get solved problems for a week's domains
  const getSolvedProblemsForDomains = (domains: Domain[]): SolvedProblemsTopic[] => {
    // FS domain name to number mapping (based on NCEES_FS_DOMAINS)
    const fsDomainToNumber: Record<string, number> = {
      'Math & Basic Science': 0,
      'Field Data Acquisition': 1,
      'Mapping, GIS, and CAD': 2,
      'Boundary Law & PLSS': 3,
      'Surveying Principles': 4,
      'Survey Computations & Applications': 5,
      'Professional Practice': 6,
      'Applied Mathematics & Statistics': 7,
    };
    
    // PS domain name to number mapping (based on NCEES_PS_DOMAINS)
    const psDomainToNumber: Record<string, number> = {
      'Legal Principles': 1,
      'Professional Survey Practices': 2,
      'Standards and Specifications': 3,
      'Business Practices': 4,
      'Areas of Practice': 5,
    };
    
    const domainMapping = examTrack === 'ps' ? psDomainToNumber : fsDomainToNumber;
    const domainNumbers = domains.map(d => domainMapping[d]).filter(n => n !== undefined);
    
    const uniqueTopics = new Map<string, SolvedProblemsTopic>();
    
    solvedProblemsTopics.forEach(topic => {
      const topicDomains = examTrack === 'fs' ? topic.nceesDomainsFS : topic.nceesDomainsPS;
      if (topicDomains.some(d => domainNumbers.includes(d))) {
        uniqueTopics.set(topic.id, topic);
      }
    });
    
    return Array.from(uniqueTopics.values());
  };

  // Convert database format to UI format (Set-based)
  const completedItems = useMemo(() => {
    if (!weekProgressData) return {};
    
    const result: Record<string, Set<string>> = {};
    weekProgressData.forEach(wp => {
      const weekKey = `week-${wp.week}`;
      const items = new Set<string>();
      
      wp.readCompleted.forEach((i) => items.add(`read-${i}`));
      wp.focusCompleted.forEach((i) => items.add(`focus-${i}`));
      wp.applyCompleted.forEach((i) => items.add(`apply-${i}`));
      wp.reinforceCompleted.forEach((i) => items.add(`reinforce-${i}`));
      
      result[weekKey] = items;
    });
    
    return result;
  }, [weekProgressData]);

  // Mutation to save week progress
  const saveProgressMutation = useMutation({
    mutationFn: async ({ week, completed }: { week: number; completed: Set<string> }) => {
      // Convert Set back to database format
      const readCompleted: number[] = [];
      const focusCompleted: number[] = [];
      const applyCompleted: number[] = [];
      const reinforceCompleted: number[] = [];
      
      completed.forEach(item => {
        const match = item.match(/^(read|focus|apply|reinforce)-(\d+)$/);
        if (match) {
          const [, category, index] = match;
          const idx = parseInt(index);
          if (category === 'read') readCompleted.push(idx);
          else if (category === 'focus') focusCompleted.push(idx);
          else if (category === 'apply') applyCompleted.push(idx);
          else if (category === 'reinforce') reinforceCompleted.push(idx);
        }
      });
      
      return apiRequest('POST', '/api/progress/weeks', {
        week,
        readCompleted,
        focusCompleted,
        applyCompleted,
        reinforceCompleted
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/progress/weeks'] });
      queryClient.invalidateQueries({ queryKey: ['/api/progress/stats'] });
      queryClient.invalidateQueries({ queryKey: ['/api/progress/overall'] });
    }
  });

  // Mutation to create custom week
  const createCustomWeekMutation = useMutation({
    mutationFn: async (data: {
      weekNumber: number;
      title: string;
      domain?: string;
      readItems: string[];
      focusItems: string[];
      applyItems: string[];
      reinforceItems: string[];
    }) => {
      return apiRequest('POST', '/api/custom-weeks', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/custom-weeks'] });
      queryClient.invalidateQueries({ queryKey: ['/api/progress/overall'] });
      setIsDialogOpen(false);
      resetForm();
      toast({
        title: "Custom week added",
        description: "Your custom study week has been added successfully.",
      });
    }
  });

  // Mutation to delete custom week
  const deleteCustomWeekMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest('DELETE', `/api/custom-weeks/${id}`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/custom-weeks'] });
      queryClient.invalidateQueries({ queryKey: ['/api/progress/overall'] });
      toast({
        title: "Custom week deleted",
        description: "The custom study week has been removed.",
      });
    }
  });

  // Mutation to save study mode preference
  const setStudyModeMutation = useMutation({
    mutationFn: async (mode: import('@shared/schema').StudyMode) => {
      return apiRequest('PATCH', '/api/preferences', { studyMode: mode });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/preferences'] });
    }
  });

  // Mutation to save custom study plan preferences
  const saveCustomPlanMutation = useMutation({
    mutationFn: async ({ weeklyDomains, timeline }: { weeklyDomains: Record<string, number[]>; timeline: number }) => {
      return apiRequest('PATCH', '/api/preferences', {
        studyMode: 'custom',
        customWeeklyDomains: weeklyDomains,
        customTimeline: timeline
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/preferences'] });
      toast({
        title: "Custom study plan saved",
        description: "Your personalized study plan has been generated successfully.",
      });
    }
  });

  // Mutations for daily logs
  const createDailyLogMutation = useMutation({
    mutationFn: async (data: { date: string; activities: string; weekNumber: number; timeSpent?: number; domain?: string }) => {
      return apiRequest('POST', '/api/daily-logs', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/daily-logs'] });
      queryClient.invalidateQueries({ queryKey: ['/api/progress/stats'] });
      queryClient.invalidateQueries({ queryKey: ['/api/progress/weeks'] });
      setNewDailyActivity('');
      setNewTimeSpent('');
      setNewDomain('');
      toast({
        title: "Daily log added",
        description: "Your daily activity has been recorded.",
      });
    }
  });

  const updateDailyLogMutation = useMutation({
    mutationFn: async ({ id, activities, timeSpent, domain }: { id: string; activities: string; timeSpent?: number; domain?: string }) => {
      return apiRequest('PUT', `/api/daily-logs/${id}`, { activities, timeSpent, domain });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/daily-logs'] });
      setEditingLogId(null);
      setNewDailyActivity('');
      setNewTimeSpent('');
      setNewDomain('');
      toast({
        title: "Daily log updated",
        description: "Your daily activity has been updated.",
      });
    }
  });

  const deleteDailyLogMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest('DELETE', `/api/daily-logs/${id}`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/daily-logs'] });
      queryClient.invalidateQueries({ queryKey: ['/api/progress/stats'] });
      queryClient.invalidateQueries({ queryKey: ['/api/progress/weeks'] });
      toast({
        title: "Daily log deleted",
        description: "Your daily activity has been removed.",
      });
    }
  });

  // Group daily logs by week
  const dailyLogsByWeek = useMemo(() => {
    const grouped: Record<number, DailyLog[]> = {};
    dailyLogs.forEach(log => {
      if (log.weekNumber) {
        if (!grouped[log.weekNumber]) {
          grouped[log.weekNumber] = [];
        }
        grouped[log.weekNumber].push(log);
      }
    });
    // Sort logs within each week by date (descending)
    Object.keys(grouped).forEach(week => {
      grouped[parseInt(week)].sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    });
    return grouped;
  }, [dailyLogs]);

  const resetForm = () => {
    setNewWeekTitle('');
    setNewWeekDomain('');
    setReadActivities('');
    setFocusActivities('');
    setApplyActivities('');
    setReinforceActivities('');
  };

  const handleCreateCustomWeek = () => {
    if (!newWeekTitle || !newWeekDomain) {
      toast({
        title: "Missing information",
        description: "Please provide a title and select a domain.",
        variant: "destructive",
      });
      return;
    }

    const weekNumber = 17 + customWeeks.length;
    const read = readActivities.split('\n').filter(s => s.trim());
    const focus = focusActivities.split('\n').filter(s => s.trim());
    const apply = applyActivities.split('\n').filter(s => s.trim());
    const reinforce = reinforceActivities.split('\n').filter(s => s.trim());

    createCustomWeekMutation.mutate({
      weekNumber,
      title: newWeekTitle,
      domain: newWeekDomain,
      readItems: read,
      focusItems: focus,
      applyItems: apply,
      reinforceItems: reinforce,
    });
  };

  const toggleItem = (week: number, itemId: string) => {
    const weekKey = `week-${week}`;
    const current = completedItems[weekKey] || new Set();
    const next = new Set(current);
    
    const wasChecked = next.has(itemId);
    if (wasChecked) {
      next.delete(itemId);
    } else {
      next.add(itemId);
      // Log activity when checking off an item
      logActivity('week_progress');
    }
    
    // Save to database
    saveProgressMutation.mutate({ week, completed: next });
  };

  const calculateWeekProgress = (week: number, plan: WeekPlan) => {
    const weekKey = `week-${week}`;
    const completed = completedItems[weekKey] || new Set();
    const dailyLogsForWeek = dailyLogsByWeek[week] || [];
    const checklistTotal = plan.read.length + plan.focus.length + plan.apply.length + plan.reinforce.length;
    
    // Each daily log counts as 1 unit, add to completed count
    const totalCompleted = completed.size + dailyLogsForWeek.length;
    const total = checklistTotal + dailyLogsForWeek.length;
    
    return total > 0 ? Math.round((totalCompleted / total) * 100) : 0;
  };

  const handleAddDailyLog = (weekNumber: number) => {
    if (!newDailyActivity.trim()) {
      toast({
        title: "Missing activity",
        description: "Please enter what you studied today.",
        variant: "destructive",
      });
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    const timeMinutes = parseTimeToMinutes(newTimeSpent);
    
    createDailyLogMutation.mutate({
      date: today,
      activities: newDailyActivity,
      weekNumber,
      timeSpent: timeMinutes || undefined,
      domain: newDomain || undefined
    });
  };

  const handleUpdateDailyLog = (id: string) => {
    if (!newDailyActivity.trim()) return;
    const timeMinutes = parseTimeToMinutes(newTimeSpent);
    updateDailyLogMutation.mutate({ 
      id, 
      activities: newDailyActivity,
      timeSpent: timeMinutes || undefined,
      domain: newDomain || undefined
    });
  };

  // Generate dynamic weekly content based on study mode
  // MUST be before early return to maintain consistent hook order
  const allWeeks: Array<WeekPlan & { isCustom?: boolean; customId?: string }> = useMemo(() => {
    let baseWeeks: WeekPlan[];
    
    // Determine base weeks based on study mode
    if (preferences?.studyMode === 'custom' && 
        preferences?.customWeeklyDomains && 
        typeof preferences.customWeeklyDomains === 'object' && 
        Object.keys(preferences.customWeeklyDomains).length > 0) {
      // Custom mode: Generate weeks based on user's selected domains and timeline
      baseWeeks = generateCustomWeekPlans(
        preferences.customWeeklyDomains as Record<number, number[]>,
        preferences.customTimeline || (examTrack === 'ps' ? 12 : 16),
        examTrack as 'fs' | 'ps'
      );
    } else {
      // Standard/Result-Driven mode: Use default plan based on exam track
      baseWeeks = baseStudyPlan;
    }
    
    // Merge base weeks with manually added custom weeks
    return [
      ...baseWeeks,
      ...customWeeks.map(cw => ({
        week: cw.weekNumber,
        title: cw.title,
        domains: cw.domain ? [cw.domain as Domain] : [],
        read: cw.readItems || [],
        focus: cw.focusItems || [],
        apply: cw.applyItems || [],
        reinforce: cw.reinforceItems || [],
        isCustom: true,
        customId: cw.id
      }))
    ];
  }, [preferences?.studyMode, preferences?.customWeeklyDomains, preferences?.customTimeline, customWeeks, examTrack, baseStudyPlan]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  // Calculate actual timeline based on study mode
  const defaultWeeks = examTrack === 'ps' ? 12 : 16;
  const domainCount = examTrack === 'ps' ? 5 : 7;
  const actualTimeline = preferences?.studyMode === 'custom' && preferences?.customTimeline
    ? preferences.customTimeline + customWeeks.length
    : defaultWeeks + customWeeks.length;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2" data-testid="heading-study-plan">
            {actualTimeline}-Week {examName} Study Plan
          </h1>
          <p className="text-muted-foreground">
            Follow the READ → FOCUS → APPLY → REINFORCE framework weekly to master all {domainCount} NCEES domains.
          </p>
          {preferences?.studyMode === 'custom' && 
           preferences?.customWeeklyDomains && 
           typeof preferences.customWeeklyDomains === 'object' && 
           Object.keys(preferences.customWeeklyDomains).length > 0 ? (
            <Badge variant="secondary" className="mt-2">
              Custom Plan Active
            </Badge>
          ) : preferences?.studyMode === 'result-driven' ? (
            <Badge variant="secondary" className="mt-2">
              Result-Driven Plan Active
            </Badge>
          ) : preferences?.studyMode === 'working-professional' ? (
            <Badge variant="secondary" className="mt-2">
              Working Professional Schedule
            </Badge>
          ) : null}
          
          {/* Overall Progress Indicator */}
          {overallProgressData && (
            <div className="mt-4 p-4 rounded-lg border border-border bg-muted/30">
              <div className="flex items-center justify-between gap-4 mb-2">
                <span className="text-sm font-medium text-foreground">Overall Progress</span>
                <span className="text-lg font-bold text-primary" data-testid="text-overall-progress">
                  {overallProgressData.overallProgress}%
                </span>
              </div>
              <Progress value={overallProgressData.overallProgress} className="h-2 mb-3" />
              <div className="grid grid-cols-3 gap-3 text-center">
                <div>
                  <div className="text-lg font-semibold text-foreground" data-testid="text-weeks-completed">
                    {overallProgressData.weeksCompleted}/{overallProgressData.totalWeeks}
                  </div>
                  <div className="text-xs text-muted-foreground">Weeks</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-foreground" data-testid="text-quiz-accuracy">
                    {overallProgressData.quizAccuracy}%
                  </div>
                  <div className="text-xs text-muted-foreground">Quiz Accuracy</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-foreground" data-testid="text-current-streak">
                    {overallProgressData.currentStreak}
                  </div>
                  <div className="text-xs text-muted-foreground">Day Streak</div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Select value={preferences?.studyMode || 'standard'} onValueChange={(val) => {
              setStudyModeMutation.mutate(val as import('@shared/schema').StudyMode);
            }}>
              <SelectTrigger className="w-52" data-testid="select-study-mode">
                <SelectValue placeholder="Select study mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Standard Mode</SelectItem>
                <SelectItem value="result-driven">Result-Driven Mode</SelectItem>
                <SelectItem value="working-professional">Working Professional</SelectItem>
                <SelectItem value="custom">Custom Plan</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <CustomPlanBuilder 
            onSave={async (weeklyDomains, timeline) => {
              await saveCustomPlanMutation.mutateAsync({ weeklyDomains, timeline });
            }}
            currentWeeklyDomains={currentCustomWeeklyDomains}
            currentTimeline={currentCustomTimeline}
          />
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                data-testid="button-add-custom-week"
              >
                <Plus className="w-4 h-4" />
                Add Custom Week
              </Button>
            </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add Custom Study Week</DialogTitle>
              <DialogDescription>
                Create a custom study week to extend your study plan beyond the core 16 weeks.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label htmlFor="title">Week Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Advanced Traverse Calculations Review"
                  value={newWeekTitle}
                  onChange={(e) => setNewWeekTitle(e.target.value)}
                  data-testid="input-custom-week-title"
                />
              </div>
              
              <div>
                <Label htmlFor="domain">Primary Domain</Label>
                <Select value={newWeekDomain} onValueChange={(v) => setNewWeekDomain(v as Domain)}>
                  <SelectTrigger id="domain" data-testid="select-custom-week-domain">
                    <SelectValue placeholder="Select a domain" />
                  </SelectTrigger>
                  <SelectContent>
                    {DOMAINS.map(domain => (
                      <SelectItem key={domain} value={domain}>
                        {domain}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="read">READ Activities (one per line)</Label>
                <Textarea
                  id="read"
                  placeholder="e.g., Review Chapter 5 in surveying textbook"
                  value={readActivities}
                  onChange={(e) => setReadActivities(e.target.value)}
                  rows={3}
                  data-testid="textarea-read-activities"
                />
              </div>

              <div>
                <Label htmlFor="focus">FOCUS Activities (one per line)</Label>
                <Textarea
                  id="focus"
                  placeholder="e.g., Practice 10 coordinate geometry problems"
                  value={focusActivities}
                  onChange={(e) => setFocusActivities(e.target.value)}
                  rows={3}
                  data-testid="textarea-focus-activities"
                />
              </div>

              <div>
                <Label htmlFor="apply">APPLY Activities (one per line)</Label>
                <Textarea
                  id="apply"
                  placeholder="e.g., Complete practice quiz on selected domain"
                  value={applyActivities}
                  onChange={(e) => setApplyActivities(e.target.value)}
                  rows={3}
                  data-testid="textarea-apply-activities"
                />
              </div>

              <div>
                <Label htmlFor="reinforce">REINFORCE Activities (one per line)</Label>
                <Textarea
                  id="reinforce"
                  placeholder="e.g., Review flashcards for this domain"
                  value={reinforceActivities}
                  onChange={(e) => setReinforceActivities(e.target.value)}
                  rows={3}
                  data-testid="textarea-reinforce-activities"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                  data-testid="button-cancel-custom-week"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleCreateCustomWeek}
                  disabled={createCustomWeekMutation.isPending}
                  data-testid="button-save-custom-week"
                >
                  {createCustomWeekMutation.isPending ? 'Creating...' : 'Create Week'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        </div>
      </div>

      {/* Personalized Recommendations Banner */}
      {preferences?.studyMode === 'personalized' && weakDomains.size > 0 && (
        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Personalized Study Recommendations</AlertTitle>
          <AlertDescription>
            Based on your diagnostic pretest, we recommend focusing extra attention on these areas: 
            <strong className="ml-1">
              {Array.from(weakDomains).join(', ')}
            </strong>.
            Weeks highlighting these domains are marked with a "Focus Area" badge below.
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
        {allWeeks.map((plan) => {
          const progress = calculateWeekProgress(plan.week, plan);
          const isExpanded = expandedWeek === plan.week;
          
          return (
            <Card key={plan.week} className="overflow-hidden hover:shadow-md transition-shadow" data-testid={`card-week-${plan.week}`}>
              <div className="relative">
                {plan.isCustom && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (plan.customId && confirm('Are you sure you want to delete this custom week?')) {
                        deleteCustomWeekMutation.mutate(plan.customId);
                      }
                    }}
                    className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-destructive/10 text-destructive hover-elevate active-elevate-2"
                    title="Delete custom week"
                    data-testid={`button-delete-week-${plan.week}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => setExpandedWeek(isExpanded ? null : plan.week)}
                  className="w-full p-6 flex items-center justify-between text-left border-l-4 hover-elevate"
                  style={{ borderLeftColor: isExpanded ? 'hsl(var(--primary))' : 'hsl(var(--border))' }}
                  data-testid={`button-week-${plan.week}`}
                >
                  <div className="flex-1 pr-8">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-bold text-muted-foreground text-sm uppercase tracking-wider">
                        Week {plan.week}{plan.isCustom && ' (Custom)'}
                      </span>
                    {progress === 100 ? (
                      <Badge variant="outline" className="bg-success/10 text-success border-success" data-testid={`badge-complete-${plan.week}`}>
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Complete
                      </Badge>
                    ) : (
                      <span className="text-xs text-muted-foreground font-medium">
                        {progress}% done
                      </span>
                    )}
                    {preferences?.studyMode === 'personalized' && coversWeakDomain(plan.domains) && (
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary" data-testid={`badge-focus-area-${plan.week}`}>
                        <Target className="w-3 h-3 mr-1" />
                        Focus Area
                      </Badge>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">{plan.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {plan.domains.map(domain => {
                      const config = getDomainConfig(domain);
                      const Icon = config.icon;
                      return (
                        <Badge
                          key={domain}
                          variant="outline"
                          className={`${config.bgColor} ${config.textColor} border-transparent`}
                        >
                          <Icon className="w-3 h-3 mr-1" />
                          {domain}
                        </Badge>
                      );
                    })}
                  </div>
                  <div className="mt-4">
                    <Progress value={progress} className="h-2" />
                  </div>
                </div>
                <div className="ml-4 text-muted-foreground">
                  {isExpanded ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                </div>
              </button>
              </div>

              {isExpanded && (
                <div className="p-6 border-t border-border grid grid-cols-1 md:grid-cols-2 gap-6 bg-card">
                  <ReadCheckpoint
                    week={plan.week}
                    chapters={plan.read}
                    colorClass="text-foreground"
                    examTrack={examTrack}
                  />
                  <FocusWeaknessScanner
                    week={plan.week}
                    colorClass="text-domain-computations-fg"
                  />
                  <ApplyScenarioLab
                    week={plan.week}
                    colorClass="text-domain-boundary-fg"
                  />
                  <ReinforceRetentionBooster
                    week={plan.week}
                    domains={plan.domains as string[]}
                  />

                  {/* Interactive Lessons Section */}
                  {(() => {
                    const currentWeekLessons = weeklyLessonsMap.get(plan.week) || [];
                    return currentWeekLessons.length > 0 && (
                      <div className="md:col-span-2 mt-4 pt-4 border-t border-border">
                        <div className="flex items-center gap-2 text-primary font-semibold uppercase text-sm tracking-wider mb-4">
                          <BookOpen className="w-4 h-4" />
                          Interactive Lessons ({currentWeekLessons.length})
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {currentWeekLessons.map((lesson: any) => {
                          const progress = lessonProgressData.find((p: any) => p.lessonId === lesson.id);
                          const isCompleted = progress?.completed || false;
                          const hasAttempted = !!progress;
                          const percentage = progress ? Math.round((progress.score / progress.totalPoints) * 100) : 0;
                          
                          // Determine lesson status tier
                          const isMastered = hasAttempted && percentage >= 90;
                          const isPassed = hasAttempted && percentage >= 70 && percentage < 90;
                          const isFailed = hasAttempted && percentage < 70;
                          
                          // Status-based styling
                          let cardBgClass = "";
                          let statusIcon = null;
                          let statusLabel = "";
                          
                          if (isMastered) {
                            cardBgClass = "bg-amber-50 dark:bg-amber-950/30 border-amber-400/50";
                            statusIcon = <Crown className="h-5 w-5 text-amber-500 flex-shrink-0" data-testid={`icon-lesson-mastered-${lesson.id}`} />;
                            statusLabel = "Mastered";
                          } else if (isPassed) {
                            cardBgClass = "bg-green-50 dark:bg-green-950/30 border-green-500/50";
                            statusIcon = <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" data-testid={`icon-lesson-passed-${lesson.id}`} />;
                            statusLabel = "Passed";
                          } else if (isFailed) {
                            cardBgClass = "bg-red-50 dark:bg-red-950/30 border-red-400/50";
                            statusIcon = <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" data-testid={`icon-lesson-failed-${lesson.id}`} />;
                            statusLabel = "Retry Needed";
                          }

                          return (
                            <Card key={lesson.id} className={cardBgClass}>
                              <div className="p-4 space-y-3">
                                <div className="flex items-start justify-between gap-2">
                                  <div className="flex-1">
                                    <h4 className="font-medium text-sm">{lesson.title}</h4>
                                    <p className="text-xs text-muted-foreground mt-1">{lesson.description}</p>
                                  </div>
                                  {statusIcon}
                                </div>
                                
                                <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
                                  <span>{lesson.estimatedMinutes} min</span>
                                  <div className="flex items-center gap-2">
                                    {hasAttempted && (
                                      <span className={`font-medium ${isMastered ? 'text-amber-600 dark:text-amber-400' : isPassed ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                        {percentage}%
                                      </span>
                                    )}
                                    {statusLabel && (
                                      <Badge 
                                        variant="outline" 
                                        className={`text-xs py-0 ${isMastered ? 'border-amber-400 text-amber-600 dark:text-amber-400' : isPassed ? 'border-green-500 text-green-600 dark:text-green-400' : 'border-red-400 text-red-600 dark:text-red-400'}`}
                                      >
                                        {statusLabel}
                                      </Badge>
                                    )}
                                  </div>
                                </div>

                                <Button
                                  size="sm"
                                  className="w-full"
                                  variant={isMastered || isPassed ? "outline" : "default"}
                                  onClick={() => navigate(`/app/${examTrack}/lesson/${lesson.id}`)}
                                  data-testid={`button-lesson-${lesson.id}`}
                                >
                                  {isMastered ? 'Review Lesson' : isPassed ? 'Improve Score' : isFailed ? 'Retry Lesson' : 'Start Lesson'}
                                </Button>
                              </div>
                            </Card>
                          );
                          })}
                        </div>
                      </div>
                    );
                  })()}
                  
                  {/* Textbook Chapters Section */}
                  {(() => {
                    const studyMode = preferences?.studyMode || 'standard';
                    const isCustomMode = studyMode === 'custom';
                    const currentWeekLessons = weeklyLessonsMap.get(plan.week) || [];
                    
                    let srmChapters: { chapter: number; title: string }[] = [];
                    let esChapters: { chapter: number; title: string }[] = [];
                    
                    if (isCustomMode && currentWeekLessons.length > 0) {
                      const lessonIds = currentWeekLessons.map((l: any) => l.id);
                      srmChapters = getChaptersForLessons(lessonIds, "SRM");
                      esChapters = getChaptersForLessons(lessonIds, "ES");
                    } else if (!isCustomMode) {
                      srmChapters = getSRMWeeklyChapters(studyMode, plan.week);
                      esChapters = getESWeeklyChapters(studyMode, plan.week);
                    }
                    
                    const solvedProblems = getSolvedProblemsForDomains(plan.domains);
                    const hasChapters = srmChapters.length > 0 || esChapters.length > 0;
                    const hasResources = hasChapters || solvedProblems.length > 0;
                    
                    return hasResources && (
                      <div className="md:col-span-2 mt-4 pt-4 border-t border-border">
                        <div className="flex items-center gap-2 text-primary font-semibold uppercase text-sm tracking-wider mb-4">
                          <BookOpen className="w-4 h-4" />
                          Recommended Study Resources
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {srmChapters.length > 0 && (
                            <div className="p-4 rounded-lg border border-border bg-muted/30">
                              <div className="text-sm font-medium mb-2 text-foreground">Surveyor Reference Manual</div>
                              <div className="flex flex-wrap gap-2">
                                {srmChapters.map((ch) => (
                                  <Badge 
                                    key={`srm-${ch.chapter}`} 
                                    variant="outline"
                                    className="text-xs cursor-pointer hover-elevate"
                                    onClick={() => navigate(`/app/${examTrack}/reference-companion`)}
                                    data-testid={`badge-srm-ch-${ch.chapter}`}
                                  >
                                    Ch. {ch.chapter}: {ch.title}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                          {esChapters.length > 0 && (
                            <div className="p-4 rounded-lg border border-border bg-muted/30">
                              <div className="text-sm font-medium mb-2 text-foreground">Elementary Surveying (15th Ed)</div>
                              <div className="flex flex-wrap gap-2">
                                {esChapters.map((ch) => (
                                  <Badge 
                                    key={`es-${ch.chapter}`} 
                                    variant="outline"
                                    className="text-xs cursor-pointer hover-elevate"
                                    onClick={() => navigate(`/app/${examTrack}/reference-companion`)}
                                    data-testid={`badge-es-ch-${ch.chapter}`}
                                  >
                                    Ch. {ch.chapter}: {ch.title}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                          {solvedProblems.length > 0 && (
                            <div className="p-4 rounded-lg border border-border bg-muted/30 md:col-span-2">
                              <div className="flex items-center gap-2 mb-2">
                                <FileText className="w-4 h-4 text-muted-foreground" />
                                <div className="text-sm font-medium text-foreground">Surveying Solved Problems (5th Ed)</div>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {solvedProblems.slice(0, 6).map((topic) => (
                                  <Badge 
                                    key={topic.id} 
                                    variant="outline"
                                    className="text-xs cursor-pointer hover-elevate"
                                    onClick={() => navigate(`/app/${examTrack}/reference-companion`)}
                                    data-testid={`badge-ssp-${topic.id}`}
                                  >
                                    {topic.topicNumber}. {topic.title}
                                  </Badge>
                                ))}
                                {solvedProblems.length > 6 && (
                                  <Badge 
                                    variant="secondary"
                                    className="text-xs cursor-pointer hover-elevate"
                                    onClick={() => navigate(`/app/${examTrack}/reference-companion`)}
                                    data-testid="badge-ssp-more"
                                  >
                                    +{solvedProblems.length - 6} more
                                  </Badge>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground mt-2">
                                Practice problems with step-by-step solutions
                              </p>
                            </div>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          Click any resource to view the Reference Companion for more details.
                        </p>
                      </div>
                    );
                  })()}
                  
                  {/* Daily Logs Section */}
                  <div className="md:col-span-2 mt-4 pt-4 border-t border-border">
                    <button
                      onClick={() => setExpandedDailyLogs(expandedDailyLogs === plan.week ? null : plan.week)}
                      className="w-full flex items-center justify-between p-3 rounded-lg hover-elevate active-elevate-2"
                      data-testid={`button-daily-logs-${plan.week}`}
                    >
                      <div className="flex items-center gap-2 text-domain-field-fg font-semibold uppercase text-sm tracking-wider">
                        <Calendar className="w-4 h-4" />
                        Daily Study Logs ({(dailyLogsByWeek[plan.week] || []).length})
                      </div>
                      {expandedDailyLogs === plan.week ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    </button>
                    
                    {expandedDailyLogs === plan.week && (
                      <div className="mt-4 space-y-4">
                        {/* Add new log form */}
                        <div className="p-4 rounded-lg border border-border bg-muted/30 space-y-3">
                          <div>
                            <Label htmlFor={`daily-activity-${plan.week}`} className="text-sm font-medium mb-2 block">
                              What did you study today?
                            </Label>
                            <Input
                              id={`daily-activity-${plan.week}`}
                              placeholder="e.g., Read chapter 1 of Elementary Surveying 15th edition"
                              value={newDailyActivity}
                              onChange={(e) => setNewDailyActivity(e.target.value)}
                              onKeyPress={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                  handleAddDailyLog(plan.week);
                                }
                              }}
                              data-testid={`input-daily-activity-${plan.week}`}
                            />
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                              <Label htmlFor={`time-spent-${plan.week}`} className="text-sm font-medium mb-2 block">
                                Time Spent <span className="text-muted-foreground font-normal">(optional)</span>
                              </Label>
                              <Input
                                id={`time-spent-${plan.week}`}
                                placeholder="e.g., 30 min, 2h, 1.5 hours"
                                value={newTimeSpent}
                                onChange={(e) => setNewTimeSpent(e.target.value)}
                                data-testid={`input-time-spent-${plan.week}`}
                              />
                            </div>
                            
                            <div>
                              <Label htmlFor={`domain-${plan.week}`} className="text-sm font-medium mb-2 block">
                                Domain <span className="text-muted-foreground font-normal">(optional)</span>
                              </Label>
                              <Select value={newDomain || undefined} onValueChange={(val) => setNewDomain(val as Domain)}>
                                <SelectTrigger data-testid={`select-domain-${plan.week}`}>
                                  <SelectValue placeholder="Select domain (optional)" />
                                </SelectTrigger>
                                <SelectContent>
                                  {DOMAINS.map((d) => (
                                    <SelectItem key={d} value={d}>{d}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              {newDomain && (
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setNewDomain('')}
                                  className="h-auto py-1 px-2 text-xs mt-1"
                                >
                                  Clear selection
                                </Button>
                              )}
                            </div>
                          </div>

                          <Button
                            onClick={() => handleAddDailyLog(plan.week)}
                            disabled={createDailyLogMutation.isPending}
                            className="w-full"
                            data-testid={`button-add-log-${plan.week}`}
                          >
                            <Plus className="w-4 h-4 mr-1" />
                            {createDailyLogMutation.isPending ? 'Adding...' : 'Add Log'}
                          </Button>
                        </div>

                        {/* Weekly summary stats */}
                        {(dailyLogsByWeek[plan.week] || []).length > 0 && (
                          <div className="p-3 rounded-lg bg-muted/50 border border-border">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Days Logged:</span>
                              <span className="font-medium">{(dailyLogsByWeek[plan.week] || []).length}</span>
                            </div>
                            {(() => {
                              const totalMinutes = (dailyLogsByWeek[plan.week] || []).reduce((sum, log) => 
                                sum + (log.timeSpent || 0), 0
                              );
                              return totalMinutes > 0 && (
                                <div className="flex items-center justify-between text-sm mt-1">
                                  <span className="text-muted-foreground">Total Time:</span>
                                  <span className="font-medium">{formatMinutes(totalMinutes)}</span>
                                </div>
                              );
                            })()}
                          </div>
                        )}

                        {/* Display existing logs */}
                        <div className="space-y-2">
                          {(dailyLogsByWeek[plan.week] || []).map(log => {
                            const logDate = new Date(log.date);
                            const dayOfWeek = logDate.toLocaleDateString('en-US', { weekday: 'short' });
                            const formattedDate = logDate.toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric'
                            });
                            const isEditing = editingLogId === log.id;
                            const domainConfig = log.domain ? getDomainConfig(log.domain as Domain) : null;

                            return (
                              <div 
                                key={log.id} 
                                className="p-3 rounded-lg border border-border bg-card flex items-start gap-3 group"
                                data-testid={`daily-log-${log.id}`}
                              >
                                <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                  {isEditing ? (
                                    <div className="space-y-2">
                                      <Input
                                        value={newDailyActivity}
                                        onChange={(e) => setNewDailyActivity(e.target.value)}
                                        placeholder="Activity"
                                        autoFocus
                                        data-testid={`input-edit-log-${log.id}`}
                                      />
                                      <div className="grid grid-cols-2 gap-2">
                                        <Input
                                          value={newTimeSpent}
                                          onChange={(e) => setNewTimeSpent(e.target.value)}
                                          placeholder="Time (e.g., 30 min)"
                                          data-testid={`input-edit-time-${log.id}`}
                                        />
                                        <div>
                                          <Select value={newDomain || undefined} onValueChange={(val) => setNewDomain(val as Domain)}>
                                            <SelectTrigger data-testid={`select-edit-domain-${log.id}`}>
                                              <SelectValue placeholder="Domain" />
                                            </SelectTrigger>
                                            <SelectContent>
                                              {DOMAINS.map((d) => (
                                                <SelectItem key={d} value={d}>{d}</SelectItem>
                                              ))}
                                            </SelectContent>
                                          </Select>
                                          {newDomain && (
                                            <Button
                                              type="button"
                                              variant="ghost"
                                              size="sm"
                                              onClick={() => setNewDomain('')}
                                              className="h-auto py-0.5 px-2 text-xs mt-0.5"
                                            >
                                              Clear
                                            </Button>
                                          )}
                                        </div>
                                      </div>
                                      <div className="flex gap-2">
                                        <Button size="sm" onClick={() => handleUpdateDailyLog(log.id)} data-testid={`button-save-edit-${log.id}`}>
                                          Save
                                        </Button>
                                        <Button
                                          size="sm"
                                          variant="outline"
                                          onClick={() => {
                                            setEditingLogId(null);
                                            setNewDailyActivity('');
                                            setNewTimeSpent('');
                                            setNewDomain('');
                                          }}
                                          data-testid={`button-cancel-edit-${log.id}`}
                                        >
                                          Cancel
                                        </Button>
                                      </div>
                                    </div>
                                  ) : (
                                    <>
                                      <p className="text-sm text-foreground font-medium">{log.activities}</p>
                                      <div className="flex flex-wrap items-center gap-2 mt-1.5">
                                        <span className="text-xs text-muted-foreground">
                                          {dayOfWeek}, {formattedDate}
                                        </span>
                                        {log.timeSpent && (
                                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                            <Clock className="w-3 h-3" />
                                            <span>{formatMinutes(log.timeSpent)}</span>
                                          </div>
                                        )}
                                        {domainConfig && (
                                          <Badge 
                                            variant="outline" 
                                            className={`text-xs ${domainConfig.borderColor} ${domainConfig.textColor}`}
                                          >
                                            {log.domain}
                                          </Badge>
                                        )}
                                      </div>
                                    </>
                                  )}
                                </div>
                                {!isEditing && (
                                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button
                                      size="icon"
                                      variant="ghost"
                                      className="h-7 w-7"
                                      onClick={() => {
                                        setEditingLogId(log.id);
                                        setNewDailyActivity(log.activities);
                                        setNewTimeSpent(log.timeSpent ? formatMinutes(log.timeSpent) : '');
                                        setNewDomain((log.domain as Domain) || '');
                                      }}
                                      data-testid={`button-edit-log-${log.id}`}
                                    >
                                      <Edit2 className="w-3 h-3" />
                                    </Button>
                                    <Button
                                      size="icon"
                                      variant="ghost"
                                      className="h-7 w-7 text-destructive"
                                      onClick={() => {
                                        if (confirm('Delete this daily log?')) {
                                          deleteDailyLogMutation.mutate(log.id);
                                        }
                                      }}
                                      data-testid={`button-delete-log-${log.id}`}
                                    >
                                      <Trash2 className="w-3 h-3" />
                                    </Button>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                          {(dailyLogsByWeek[plan.week] || []).length === 0 && (
                            <p className="text-sm text-muted-foreground text-center py-4">
                              No daily logs yet for this week. Add your first entry above!
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function ChecklistSection({
  title,
  icon: Icon,
  items,
  completed,
  onToggle,
  prefix,
  colorClass,
  action
}: {
  title: string;
  icon: typeof BookOpen;
  items: string[];
  completed: Set<string>;
  onToggle: (index: number) => void;
  prefix: string;
  colorClass: string;
  action?: {
    label: string;
    icon: typeof BookOpen;
    onClick: () => void;
    testId: string;
  };
}) {
  return (
    <div className="space-y-3">
      <div className={`flex items-center justify-between gap-2`}>
        <div className={`flex items-center gap-2 ${colorClass} font-semibold uppercase text-sm tracking-wider`}>
          <Icon className="w-4 h-4" />
          {title}
        </div>
        {action && (
          <Button
            size="sm"
            variant="outline"
            onClick={action.onClick}
            className="text-xs gap-1"
            data-testid={action.testId}
          >
            <action.icon className="w-3 h-3" />
            {action.label}
          </Button>
        )}
      </div>
      <div className="space-y-2">
        {items.map((item, index) => {
          const itemId = `${prefix}-${index}`;
          const isChecked = completed.has(itemId);
          return (
            <div key={itemId} className="flex items-start gap-3 group">
              <Checkbox
                id={itemId}
                checked={isChecked}
                onCheckedChange={() => onToggle(index)}
                className="mt-0.5 flex-shrink-0"
                data-testid={`checkbox-${itemId}`}
              />
              <label
                htmlFor={itemId}
                className={`text-sm cursor-pointer flex-1 leading-relaxed ${
                  isChecked ? 'text-muted-foreground line-through' : 'text-foreground'
                }`}
              >
                {item}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
