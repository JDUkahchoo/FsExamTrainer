import { useState, useMemo } from 'react';
import { ChevronDown, ChevronRight, CheckCircle2, BookOpen, Target, Dumbbell, BrainCircuit, Loader2, Plus, Trash2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
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
import { STUDY_PLAN } from '@shared/data/studyPlan';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { useActivityLogger } from '@/hooks/use-activity-logger';
import { DOMAINS } from '@shared/schema';
import type { WeekPlan, WeekProgress, CustomWeek, Domain } from '@shared/schema';

export default function StudyPlanPage() {
  const [expandedWeek, setExpandedWeek] = useState<number | null>(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newWeekTitle, setNewWeekTitle] = useState('');
  const [newWeekDomain, setNewWeekDomain] = useState<Domain | ''>('');
  const [readActivities, setReadActivities] = useState('');
  const [focusActivities, setFocusActivities] = useState('');
  const [applyActivities, setApplyActivities] = useState('');
  const [reinforceActivities, setReinforceActivities] = useState('');
  const { toast } = useToast();
  const { logActivity } = useActivityLogger();

  // Fetch all week progress from database
  const { data: weekProgressData, isLoading } = useQuery<WeekProgress[]>({
    queryKey: ['/api/progress/weeks']
  });

  // Fetch custom weeks
  const { data: customWeeks = [] } = useQuery<CustomWeek[]>({
    queryKey: ['/api/custom-weeks']
  });

  // Convert database format to UI format (Set-based)
  const completedItems = useMemo(() => {
    if (!weekProgressData) return {};
    
    const result: Record<string, Set<string>> = {};
    weekProgressData.forEach(wp => {
      const weekKey = `week-${wp.week}`;
      const items = new Set<string>();
      
      wp.readCompleted.forEach((i: number) => items.add(`read-${i}`));
      wp.focusCompleted.forEach((i: number) => items.add(`focus-${i}`));
      wp.applyCompleted.forEach((i: number) => items.add(`apply-${i}`));
      wp.reinforceCompleted.forEach((i: number) => items.add(`reinforce-${i}`));
      
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
    const total = plan.read.length + plan.focus.length + plan.apply.length + plan.reinforce.length;
    return Math.round((completed.size / total) * 100) || 0;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  // Convert custom weeks to WeekPlan format
  const allWeeks: Array<WeekPlan & { isCustom?: boolean; customId?: string }> = [
    ...STUDY_PLAN,
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

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2" data-testid="heading-study-plan">
            {customWeeks.length > 0 ? `${16 + customWeeks.length}-Week FS Exam Study Plan` : '16-Week FS Exam Study Plan'}
          </h1>
          <p className="text-muted-foreground">
            Follow the READ → FOCUS → APPLY → REINFORCE framework weekly to master all 7 NCEES domains.
          </p>
        </div>
        
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
                  <ChecklistSection
                    title="READ"
                    icon={BookOpen}
                    items={plan.read}
                    completed={completedItems[`week-${plan.week}`] || new Set()}
                    onToggle={(i) => toggleItem(plan.week, `read-${i}`)}
                    prefix="read"
                    colorClass="text-primary"
                  />
                  <ChecklistSection
                    title="FOCUS"
                    icon={Target}
                    items={plan.focus}
                    completed={completedItems[`week-${plan.week}`] || new Set()}
                    onToggle={(i) => toggleItem(plan.week, `focus-${i}`)}
                    prefix="focus"
                    colorClass="text-domain-computations-fg"
                  />
                  <ChecklistSection
                    title="APPLY"
                    icon={Dumbbell}
                    items={plan.apply}
                    completed={completedItems[`week-${plan.week}`] || new Set()}
                    onToggle={(i) => toggleItem(plan.week, `apply-${i}`)}
                    prefix="apply"
                    colorClass="text-domain-boundary-fg"
                  />
                  <ChecklistSection
                    title="REINFORCE"
                    icon={BrainCircuit}
                    items={plan.reinforce}
                    completed={completedItems[`week-${plan.week}`] || new Set()}
                    onToggle={(i) => toggleItem(plan.week, `reinforce-${i}`)}
                    prefix="reinforce"
                    colorClass="text-domain-field-fg"
                  />
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
  colorClass
}: {
  title: string;
  icon: typeof BookOpen;
  items: string[];
  completed: Set<string>;
  onToggle: (index: number) => void;
  prefix: string;
  colorClass: string;
}) {
  return (
    <div className="space-y-3">
      <div className={`flex items-center gap-2 ${colorClass} font-semibold uppercase text-sm tracking-wider`}>
        <Icon className="w-4 h-4" />
        {title}
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
