import { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'wouter';
import { ChevronDown, ChevronRight, CheckCircle2, BookOpen, Target, Dumbbell, BrainCircuit, Loader2, Plus, Trash2, AlertCircle, Calendar, Edit2, Clock, Crown, XCircle, Play, ExternalLink, Layers, Construction, Brain, RefreshCw, Flame, Trophy } from 'lucide-react';
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { getDomainConfig } from '@/lib/domains';
import { STUDY_PLAN, PS_STUDY_PLAN } from '@shared/data/studyPlan';
import { generateStudyPlan, generateLongTermPlan, getLongTermPhaseInfo } from '@shared/lib/planGenerator';
import { WeekReviewModal } from '@/components/week-review-modal';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { useActivityLogger } from '@/hooks/use-activity-logger';
import { parseTimeToMinutes, formatMinutes } from '@/lib/time-utils';
import { DOMAINS } from '@shared/schema';
import type { WeekPlan, WeekProgress, CustomWeek, Domain, UserPreferences, PretestResult, DailyLog, ReadingProgress, ApplyChallengeAttempt } from '@shared/schema';
import { getWeeklyLessonsByMode, generateCustomWeekPlans } from '@/lib/study-plan-logic';
import { CustomPlanBuilder } from '@/components/custom-plan-builder';
import { ReadCheckpoint } from '@/components/read-checkpoint';
import { FocusWeaknessScanner } from '@/components/focus-weakness-scanner';
import { ApplyScenarioLab } from '@/components/apply-scenario-lab';
import { ReinforceRetentionBooster } from '@/components/reinforce-retention-booster';
import { FlashcardWeekPreview } from '@/components/flashcard-week-preview';
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
  const urlParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const weekFromUrl = urlParams.get('week');
  const parsedWeek = weekFromUrl ? parseInt(weekFromUrl, 10) : null;
  const savedWeek = typeof window !== 'undefined' ? parseInt(localStorage.getItem(`studyPlan_expandedWeek_${examTrack}`) || '', 10) : NaN;
  const initialWeek = parsedWeek && !isNaN(parsedWeek) ? parsedWeek : (!isNaN(savedWeek) ? savedWeek : 1);
  const [expandedWeek, setExpandedWeek] = useState<number | null>(initialWeek);
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
  const [reviewWeekInfo, setReviewWeekInfo] = useState<{ week: number; title: string; domains: string[] } | null>(null);
  const { toast } = useToast();
  const { logActivity } = useActivityLogger();

  useEffect(() => {
    if (expandedWeek !== null) {
      localStorage.setItem(`studyPlan_expandedWeek_${examTrack}`, String(expandedWeek));
    }
  }, [expandedWeek, examTrack]);


  // Use appropriate study plan based on exam track
  const baseStudyPlan = examTrack === 'ps' ? PS_STUDY_PLAN : STUDY_PLAN;

  // Fetch all week progress from database
  const { data: weekProgressData, isLoading } = useQuery<WeekProgress[]>({
    queryKey: ['/api/progress/weeks', examTrack],
    queryFn: async () => {
      const res = await fetch(`/api/progress/weeks?examTrack=${examTrack}`);
      if (!res.ok) throw new Error("Failed to fetch week progress");
      return res.json();
    },
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

  // Fetch all reading progress for auto-marking
  const { data: allReadingProgress = [] } = useQuery<ReadingProgress[]>({
    queryKey: ['/api/reading-progress', examTrack],
    queryFn: async () => {
      const res = await fetch(`/api/reading-progress?examTrack=${examTrack}`);
      if (!res.ok) throw new Error("Failed to fetch reading progress");
      return res.json();
    },
  });

  // Fetch all apply attempts for auto-marking
  const { data: allApplyAttempts = [] } = useQuery<ApplyChallengeAttempt[]>({
    queryKey: ['/api/apply/attempts', examTrack],
    queryFn: async () => {
      const res = await fetch(`/api/apply/attempts?examTrack=${examTrack}`);
      if (!res.ok) throw new Error("Failed to fetch apply attempts");
      return res.json();
    },
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
    queryKey: ['/api/progress/overall', examTrack],
    queryFn: async () => {
      const res = await fetch(`/api/progress/overall?examTrack=${examTrack}`);
      if (!res.ok) throw new Error("Failed to fetch progress");
      return res.json();
    },
  });

  // Fetch week memory health records
  const { data: memoryHealthData = [] } = useQuery<Array<{
    weekNumber: number;
    completedAt: string;
    lastReviewedAt: string | null;
    reviewCount: number;
    health: number;
    status: 'fresh' | 'fading' | 'stale';
    domains: string[];
  }>>({
    queryKey: ['/api/plan/memory-health', examTrack],
    queryFn: async () => {
      const res = await fetch(`/api/plan/memory-health?examTrack=${examTrack}`);
      if (!res.ok) return [];
      return res.json();
    },
    refetchInterval: 5 * 60 * 1000,
  });

  const memoryHealthMap = useMemo(() => {
    const map = new Map<number, typeof memoryHealthData[0]>();
    memoryHealthData.forEach(r => map.set(r.weekNumber, r));
    return map;
  }, [memoryHealthData]);

  // Mutation to record week completion
  const weekCompleteMutation = useMutation({
    mutationFn: ({ weekNumber, domains }: { weekNumber: number; domains: string[] }) =>
      apiRequest('POST', `/api/plan/week-complete/${weekNumber}`, { examTrack, domains }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/plan/memory-health', examTrack] });
    },
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

  // Auto-detect completed items from activity data (reading progress, apply attempts, etc.)
  const autoCompletedItems = useMemo(() => {
    const result: Record<string, Set<string>> = {};

    // Auto-mark READ items from reading progress (chapterIndex maps to plan.read index)
    allReadingProgress.forEach(rp => {
      if (rp.completed) {
        const weekKey = `week-${rp.week}`;
        if (!result[weekKey]) result[weekKey] = new Set();
        result[weekKey].add(`read-${rp.chapterIndex}`);
      }
    });

    // Auto-mark APPLY items when completed apply attempts exist for a week
    const applyByWeek = new Map<number, number>();
    allApplyAttempts.forEach(attempt => {
      if (attempt.week && attempt.completedAt) {
        applyByWeek.set(attempt.week, (applyByWeek.get(attempt.week) || 0) + 1);
      }
    });
    applyByWeek.forEach((count, week) => {
      const weekKey = `week-${week}`;
      if (!result[weekKey]) result[weekKey] = new Set();
      const plan = baseStudyPlan.find(p => p.week === week);
      if (plan) {
        const applyItemCount = plan.apply.length;
        const itemsToMark = Math.min(count, applyItemCount);
        for (let i = 0; i < itemsToMark; i++) {
          result[weekKey].add(`apply-${i}`);
        }
      }
    });

    return result;
  }, [allReadingProgress, allApplyAttempts, baseStudyPlan]);

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
        examTrack,
        readCompleted,
        focusCompleted,
        applyCompleted,
        reinforceCompleted
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/progress/weeks', examTrack] });
      queryClient.invalidateQueries({ queryKey: ['/api/progress/stats'] });
      queryClient.invalidateQueries({ queryKey: ['/api/progress/overall', examTrack] });
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
      queryClient.invalidateQueries({ queryKey: ['/api/progress/overall', examTrack] });
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
      queryClient.invalidateQueries({ queryKey: ['/api/progress/weeks', examTrack] });
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
      queryClient.invalidateQueries({ queryKey: ['/api/progress/weeks', examTrack] });
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
    const manualCompleted = completedItems[weekKey] || new Set();
    const autoCompleted = autoCompletedItems[weekKey] || new Set();
    const merged = new Set([...manualCompleted, ...autoCompleted]);

    // Count completed items per checklist category (matching what the user sees)
    let readDone = 0, focusDone = 0, applyDone = 0, reinforceDone = 0;
    merged.forEach(item => {
      if (item.startsWith('read-')) readDone++;
      else if (item.startsWith('focus-')) focusDone++;
      else if (item.startsWith('apply-')) applyDone++;
      else if (item.startsWith('reinforce-')) reinforceDone++;
    });

    // Cap each category to the plan's count to avoid over-counting
    const totalCompleted =
      Math.min(readDone, plan.read.length) +
      Math.min(focusDone, plan.focus.length) +
      Math.min(applyDone, plan.apply.length) +
      Math.min(reinforceDone, plan.reinforce.length);

    // Denominator matches the checklist shown to the user
    const trackableTotal = plan.read.length + plan.focus.length + plan.apply.length + plan.reinforce.length;

    return trackableTotal > 0 ? Math.round((totalCompleted / trackableTotal) * 100) : 0;
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

  // Generate dynamic weekly content based on study mode + adaptive plan generator
  // MUST be before early return to maintain consistent hook order
  const { allWeeks, adaptiveMeta } = useMemo(() => {
    let baseWeeks: WeekPlan[];
    
    let studyMode = (preferences?.studyMode || 'standard') as import('@shared/schema').StudyMode;
    if (studyMode === 'long-term' && examTrack !== 'fs') studyMode = 'standard';
    const examDate = preferences?.examDate ? new Date(preferences.examDate) : null;
    const weeklyHours = preferences?.weeklyHoursGoal || 9;

    const pretestScoresMap: Record<number, number> = {};
    domainScores.forEach(ds => { pretestScoresMap[ds.domainNumber] = ds.percentage; });

    if (studyMode === 'long-term') {
      const { plan, meta } = generateLongTermPlan({
        examDate: null,
        planType: 'long-term',
        weeklyHours,
        pretestScores: pretestScoresMap,
        examTrack: 'fs',
      });
      baseWeeks = plan;
      return { allWeeks: [...baseWeeks, ...customWeeks.map(cw => ({ week: cw.weekNumber, title: cw.title, domains: cw.domain ? [cw.domain as Domain] : [], read: cw.readItems || [], focus: cw.focusItems || [], apply: cw.applyItems || [], reinforce: cw.reinforceItems || [], isCustom: true as const, customId: cw.id }))], adaptiveMeta: meta };
    }

    if (studyMode === 'custom' && 
        preferences?.customWeeklyDomains && 
        typeof preferences.customWeeklyDomains === 'object' && 
        Object.keys(preferences.customWeeklyDomains).length > 0) {
      baseWeeks = generateCustomWeekPlans(
        preferences.customWeeklyDomains as Record<number, number[]>,
        preferences.customTimeline || (examTrack === 'ps' ? 12 : 16),
        examTrack as 'fs' | 'ps'
      );
      const meta = { totalWeeks: baseWeeks.length, examDate, isAdaptive: false, weeklyHours, planType: studyMode };
      return { allWeeks: [...baseWeeks, ...customWeeks.map(cw => ({ week: cw.weekNumber, title: cw.title, domains: cw.domain ? [cw.domain as Domain] : [], read: cw.readItems || [], focus: cw.focusItems || [], apply: cw.applyItems || [], reinforce: cw.reinforceItems || [], isCustom: true as const, customId: cw.id }))], adaptiveMeta: meta };
    }

    if (examDate && examDate > new Date()) {
      const { plan, meta } = generateStudyPlan({
        examDate,
        planType: studyMode,
        weeklyHours,
        pretestScores: pretestScoresMap,
        examTrack: examTrack as 'fs' | 'ps',
      });
      baseWeeks = plan;
      return { allWeeks: [...baseWeeks, ...customWeeks.map(cw => ({ week: cw.weekNumber, title: cw.title, domains: cw.domain ? [cw.domain as Domain] : [], read: cw.readItems || [], focus: cw.focusItems || [], apply: cw.applyItems || [], reinforce: cw.reinforceItems || [], isCustom: true as const, customId: cw.id }))], adaptiveMeta: meta };
    }

    const { plan: fixedPlan, meta } = generateStudyPlan({
      examDate: null,
      planType: studyMode,
      weeklyHours,
      pretestScores: pretestScoresMap,
      examTrack: examTrack as 'fs' | 'ps',
    });
    baseWeeks = fixedPlan;
    return { allWeeks: [...baseWeeks, ...customWeeks.map(cw => ({ week: cw.weekNumber, title: cw.title, domains: cw.domain ? [cw.domain as Domain] : [], read: cw.readItems || [], focus: cw.focusItems || [], apply: cw.applyItems || [], reinforce: cw.reinforceItems || [], isCustom: true as const, customId: cw.id }))], adaptiveMeta: meta };
  }, [preferences?.studyMode, preferences?.customWeeklyDomains, preferences?.customTimeline, preferences?.examDate, preferences?.weeklyHoursGoal, customWeeks, examTrack, baseStudyPlan, domainScores]);

  // Auto-record week completions when they hit 100% for the first time
  // NOTE: placed here — after allWeeks, memoryHealthMap, weekCompleteMutation are all declared
  useEffect(() => {
    if (!weekProgressData || weekCompleteMutation.isPending) return;
    allWeeks.forEach(plan => {
      const progress = weekProgressData.find(wp => wp.week === plan.week && wp.examTrack === examTrack);
      if (progress && progress.percentage === 100 && !memoryHealthMap.has(plan.week)) {
        weekCompleteMutation.mutate({ weekNumber: plan.week, domains: plan.domains as string[] });
      }
    });
  }, [weekProgressData, memoryHealthMap]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  // Calculate actual timeline based on study mode
  const defaultWeeks = examTrack === 'ps' ? 12 : 16;
  const domainCount = examTrack === 'ps' ? 5 : 8;
  const actualTimeline = preferences?.studyMode === 'custom' && preferences?.customTimeline
    ? preferences.customTimeline + customWeeks.length
    : defaultWeeks + customWeeks.length;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8 flex items-start justify-between gap-4">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-foreground mb-2" data-testid="heading-study-plan">
            {adaptiveMeta.planType === 'long-term'
              ? `24-Month ${examName} Study Pathway`
              : `${adaptiveMeta.totalWeeks}-Week ${examName} Study Plan`}
          </h1>
          <p className="text-muted-foreground">
            {adaptiveMeta.planType === 'long-term'
              ? `${adaptiveMeta.totalWeeks} weeks across 4 phases — sustainable long-term preparation for all ${domainCount} NCEES domains.`
              : `Follow the READ → FOCUS → APPLY → REINFORCE framework weekly to master all ${domainCount} NCEES domains.`}
          </p>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            {adaptiveMeta.isAdaptive && (
              <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 border-purple-200 dark:border-purple-800">
                <Brain className="w-3 h-3 mr-1" />
                Adaptive Plan
              </Badge>
            )}
            {adaptiveMeta.planType === 'long-term' ? (() => {
              const activeWeek = allWeeks.find(w => calculateWeekProgress(w.week, w) < 100)?.week || 1;
              const activePhase = getLongTermPhaseInfo(activeWeek, 'longTermPhases' in adaptiveMeta ? adaptiveMeta.longTermPhases : undefined);
              const activeMonth = Math.ceil(activeWeek / 4);
              return (
                <>
                  <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800">
                    <Calendar className="w-3 h-3 mr-1" />
                    24-Month Pathway
                  </Badge>
                  <Badge variant="outline" className="border-emerald-300 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20" data-testid="badge-long-term-progress">
                    {activePhase ? `Phase ${activePhase.phase}: ${activePhase.phaseName}` : 'Foundation'} · Month {activeMonth} of 24
                  </Badge>
                </>
              );
            })() : preferences?.studyMode === 'custom' && preferences?.customWeeklyDomains && typeof preferences.customWeeklyDomains === 'object' && Object.keys(preferences.customWeeklyDomains).length > 0 ? (
              <Badge variant="secondary">Custom Plan Active</Badge>
            ) : preferences?.studyMode === 'result-driven' ? (
              <Badge variant="secondary">Result-Driven Plan Active</Badge>
            ) : preferences?.studyMode === 'working-professional' ? (
              <Badge variant="secondary">Working Professional Schedule</Badge>
            ) : null}
            {(preferences?.studyMode === 'standard' || preferences?.studyMode === 'working-professional') && domainScores.length > 0 && (
              <Badge variant="outline" className="border-blue-300 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20">
                <Brain className="w-3 h-3 mr-1" />
                Adapted from your pretest
              </Badge>
            )}
            {adaptiveMeta.examDate && (() => {
              const daysLeft = Math.ceil((adaptiveMeta.examDate!.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
              const weeksLeft = Math.ceil(daysLeft / 7);
              return daysLeft > 0 ? (
                <Badge variant="outline" className="border-orange-300 text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20">
                  <Flame className="w-3 h-3 mr-1" />
                  {daysLeft} days to exam · {weeksLeft} weeks left
                </Badge>
              ) : null;
            })()}
          </div>
          
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
                {examTrack === 'fs' && (
                  <SelectItem value="long-term">Long-Term (24-Mo)</SelectItem>
                )}
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
        {allWeeks.map((plan, idx) => {
          const progress = calculateWeekProgress(plan.week, plan);
          const isExpanded = expandedWeek === plan.week;

          const ltPhases = 'longTermPhases' in adaptiveMeta ? adaptiveMeta.longTermPhases : undefined;
          const phaseInfo = adaptiveMeta.planType === 'long-term' ? getLongTermPhaseInfo(plan.week, ltPhases) : null;
          const prevPhaseInfo = idx > 0 && adaptiveMeta.planType === 'long-term' ? getLongTermPhaseInfo(allWeeks[idx - 1].week, ltPhases) : null;
          const showPhaseHeader = phaseInfo && (!prevPhaseInfo || phaseInfo.phase !== prevPhaseInfo.phase);
          const isMilestoneWeek = adaptiveMeta.planType === 'long-term' && adaptiveMeta.milestoneWeeks?.includes(plan.week);
          const isCheckpointWeek = adaptiveMeta.planType === 'long-term' && adaptiveMeta.checkpointWeeks?.includes(plan.week) && phaseInfo && (phaseInfo.phase === 1 || phaseInfo.phase === 2);

          const phaseColors: Record<number, string> = {
            1: 'from-blue-500 to-blue-600',
            2: 'from-purple-500 to-purple-600',
            3: 'from-amber-500 to-amber-600',
            4: 'from-red-500 to-red-600',
          };

          return (
            <div key={plan.week}>
              {showPhaseHeader && phaseInfo && (
                <div className={`mb-4 mt-6 rounded-xl bg-gradient-to-r ${phaseColors[phaseInfo.phase] || 'from-gray-500 to-gray-600'} p-4 text-white shadow-lg`} data-testid={`phase-header-${phaseInfo.phase}`}>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold">Phase {phaseInfo.phase}</span>
                    <span className="text-lg font-medium opacity-90">{phaseInfo.phaseName}</span>
                  </div>
                  <p className="text-sm mt-1 opacity-80">
                    {phaseInfo.phase === 1 && 'Build your foundation — one domain at a time with deep practice.'}
                    {phaseInfo.phase === 2 && 'Second pass — advanced problems and formula speed drills.'}
                    {phaseInfo.phase === 3 && 'Cross-domain integration — mixed practice and connecting concepts.'}
                    {phaseInfo.phase === 4 && 'Exam sprint — full-length practice tests and final review.'}
                  </p>
                </div>
              )}
              {isMilestoneWeek && (
                <div className="mb-3 flex items-center gap-3 rounded-lg border-2 border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/20 p-3" data-testid={`milestone-${plan.week}`}>
                  <Trophy className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  <span className="font-semibold text-amber-800 dark:text-amber-300">Milestone: Take a Full Practice Exam</span>
                  <a href={`/app/${examTrack}/practice-exam`} className="ml-auto text-sm font-medium text-amber-600 dark:text-amber-400 underline hover:no-underline" data-testid={`link-milestone-exam-${plan.week}`}>
                    Go to Practice Exam →
                  </a>
                </div>
              )}
              {isCheckpointWeek && !isMilestoneWeek && (
                <div className="mb-3 flex items-center gap-2 rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 p-2 text-sm" data-testid={`checkpoint-${plan.week}`}>
                  <CheckCircle2 className="w-4 h-4 text-blue-500" />
                  <span className="text-blue-700 dark:text-blue-300">Domain checkpoint — review quiz recommended before moving on</span>
                </div>
              )}
            <Card className="overflow-hidden hover:shadow-md transition-shadow" data-testid={`card-week-${plan.week}`}>
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
                      {phaseInfo && (
                        <span className="text-xs text-muted-foreground">Month {phaseInfo.monthNumber} · {phaseInfo.phaseName}</span>
                      )}
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
                  <div className="mt-4 space-y-2">
                    <Progress value={progress} className="h-2" />
                    {(() => {
                      const health = memoryHealthMap.get(plan.week);
                      if (!health) return null;
                      const healthColor = health.status === 'fresh' ? 'bg-green-500' : health.status === 'fading' ? 'bg-yellow-500' : 'bg-red-500';
                      const healthBg = health.status === 'fresh' ? 'bg-green-100 dark:bg-green-950' : health.status === 'fading' ? 'bg-yellow-100 dark:bg-yellow-950' : 'bg-red-100 dark:bg-red-950';
                      const healthText = health.status === 'fresh' ? 'text-green-700 dark:text-green-300' : health.status === 'fading' ? 'text-yellow-700 dark:text-yellow-300' : 'text-red-700 dark:text-red-300';
                      return (
                        <div className={`flex items-center gap-2 rounded-md px-2 py-1 ${healthBg}`}>
                          <div className="flex-1 flex items-center gap-2">
                            <Brain className={`h-3 w-3 ${healthText}`} />
                            <div className="flex-1 bg-muted rounded-full h-1.5 overflow-hidden">
                              <div className={`h-full ${healthColor} transition-all`} style={{ width: `${health.health}%` }} />
                            </div>
                            <span className={`text-xs font-medium ${healthText}`}>{health.health}% memory</span>
                          </div>
                          {health.status !== 'fresh' && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setReviewWeekInfo({ week: plan.week, title: plan.title, domains: plan.domains as string[] });
                              }}
                              className={`text-xs font-medium px-2 py-0.5 rounded border ${health.status === 'stale' ? 'border-red-400 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 animate-pulse' : 'border-yellow-400 text-yellow-700 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20'}`}
                              data-testid={`button-review-week-${plan.week}`}
                            >
                              <RefreshCw className="h-3 w-3 inline mr-1" />
                              {health.status === 'stale' ? 'Review Now' : 'Review'}
                            </button>
                          )}
                        </div>
                      );
                    })()}
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
                    domains={plan.domains as string[]}
                    colorClass="text-domain-computations-fg"
                    examTrack={examTrack}
                  />
                  <ApplyScenarioLab
                    week={plan.week}
                    domains={plan.domains as string[]}
                    colorClass="text-domain-boundary-fg"
                    examTrack={examTrack}
                  />
                  <ReinforceRetentionBooster
                    week={plan.week}
                    domains={plan.domains as string[]}
                    examTrack={examTrack}
                    studyMode={preferences?.studyMode}
                    examDate={preferences?.examDate}
                  />
                  <FlashcardWeekPreview
                    week={plan.week}
                    domains={plan.domains as string[]}
                    examTrack={examTrack}
                  />

                  {isCheckpointWeek && plan.domains.length > 0 && (
                    <div className="md:col-span-2 mt-2 p-3 rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 flex items-center gap-3" data-testid={`checkpoint-cta-${plan.week}`}>
                      <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0" />
                      <div className="flex-1">
                        <span className="font-semibold text-blue-800 dark:text-blue-300 text-sm">Domain Checkpoint Quiz</span>
                        <p className="text-xs text-blue-600 dark:text-blue-400 mt-0.5">Test your knowledge before moving to the next domain.</p>
                      </div>
                      <a href={`/app/${examTrack}/quiz?domain=${encodeURIComponent(plan.domains[0])}`} className="px-3 py-1.5 text-sm font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors" data-testid={`link-checkpoint-quiz-${plan.week}`}>
                        Take Quiz →
                      </a>
                    </div>
                  )}

                  {phaseInfo?.phase === 3 && (
                    <div className="md:col-span-2 mt-2 p-3 rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 flex items-center gap-3" data-testid={`mixed-quiz-cta-${plan.week}`}>
                      <Layers className="w-5 h-5 text-amber-500 flex-shrink-0" />
                      <div className="flex-1">
                        <span className="font-semibold text-amber-800 dark:text-amber-300 text-sm">Cross-Domain Mixed Quiz</span>
                        <p className="text-xs text-amber-600 dark:text-amber-400 mt-0.5">Practice connecting concepts across all domains.</p>
                      </div>
                      <a href={`/app/${examTrack}/quiz`} className="px-3 py-1.5 text-sm font-medium rounded-md bg-amber-600 text-white hover:bg-amber-700 transition-colors" data-testid={`link-mixed-quiz-${plan.week}`}>
                        Mixed Quiz →
                      </a>
                    </div>
                  )}

                  {/* Study Checklist Section - shows items with auto/manual completion */}
                  {(() => {
                    const weekKey = `week-${plan.week}`;
                    const manualItems = completedItems[weekKey] || new Set();
                    const autoItems = autoCompletedItems[weekKey] || new Set();
                    const mergedItems = new Set([...manualItems, ...autoItems]);
                    const handleToggle = (prefix: string) => (index: number) => {
                      toggleItem(plan.week, `${prefix}-${index}`);
                    };
                    return (
                      <div className="md:col-span-2 mt-4 pt-4 border-t border-border">
                        <Collapsible>
                          <CollapsibleTrigger className="w-full flex items-center justify-between p-3 rounded-lg hover-elevate active-elevate-2" data-testid={`button-checklist-${plan.week}`}>
                            <div className="flex items-center gap-2 text-foreground font-semibold uppercase text-sm tracking-wider">
                              <CheckCircle2 className="w-4 h-4" />
                              Study Checklist ({mergedItems.size}/{plan.read.length + plan.focus.length + plan.apply.length + plan.reinforce.length})
                            </div>
                            <ChevronDown className="h-4 w-4" />
                          </CollapsibleTrigger>
                          <CollapsibleContent className="mt-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <ChecklistSection
                                title="Read"
                                icon={BookOpen}
                                items={plan.read}
                                completed={mergedItems}
                                onToggle={handleToggle('read')}
                                prefix="read"
                                colorClass="text-foreground"
                              />
                              <ChecklistSection
                                title="Focus"
                                icon={Target}
                                items={plan.focus}
                                completed={mergedItems}
                                onToggle={handleToggle('focus')}
                                prefix="focus"
                                colorClass="text-domain-computations-fg"
                              />
                              <ChecklistSection
                                title="Apply"
                                icon={Dumbbell}
                                items={plan.apply}
                                completed={mergedItems}
                                onToggle={handleToggle('apply')}
                                prefix="apply"
                                colorClass="text-domain-boundary-fg"
                              />
                              <ChecklistSection
                                title="Reinforce"
                                icon={BrainCircuit}
                                items={plan.reinforce}
                                completed={mergedItems}
                                onToggle={handleToggle('reinforce')}
                                prefix="reinforce"
                                colorClass="text-primary"
                              />
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      </div>
                    );
                  })()}

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
                                  onClick={() => navigate(`/app/${examTrack}/lesson/${lesson.id}?from=study-plan&week=${plan.week}`)}
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
            </div>
          );
        })}
      </div>

      {reviewWeekInfo && (
        <WeekReviewModal
          weekNumber={reviewWeekInfo.week}
          weekTitle={reviewWeekInfo.title}
          domains={reviewWeekInfo.domains}
          examTrack={examTrack}
          open={!!reviewWeekInfo}
          onClose={() => setReviewWeekInfo(null)}
        />
      )}
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
