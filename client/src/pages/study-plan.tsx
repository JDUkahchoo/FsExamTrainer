import { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, CheckCircle2, BookOpen, Target, Dumbbell, BrainCircuit } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { getDomainConfig } from '@/lib/domains';
import { STUDY_PLAN } from '@shared/data/studyPlan';
import { getWeekProgress, saveWeekProgress } from '@/lib/localStorage';
import type { WeekPlan } from '@shared/schema';

export default function StudyPlanPage() {
  const [expandedWeek, setExpandedWeek] = useState<number | null>(1);
  const [completedItems, setCompletedItems] = useState<Record<string, Set<string>>>(() => getWeekProgress());

  // Save to localStorage whenever completedItems changes
  useEffect(() => {
    saveWeekProgress(completedItems);
  }, [completedItems]);

  const toggleItem = (week: number, itemId: string) => {
    setCompletedItems(prev => {
      const weekKey = `week-${week}`;
      const current = prev[weekKey] || new Set();
      const next = new Set(current);
      if (next.has(itemId)) {
        next.delete(itemId);
      } else {
        next.add(itemId);
      }
      return { ...prev, [weekKey]: next };
    });
  };

  const calculateWeekProgress = (week: number, plan: WeekPlan) => {
    const weekKey = `week-${week}`;
    const completed = completedItems[weekKey] || new Set();
    const total = plan.read.length + plan.focus.length + plan.apply.length + plan.reinforce.length;
    return Math.round((completed.size / total) * 100) || 0;
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2" data-testid="heading-study-plan">
          16-Week FS Exam Study Plan
        </h1>
        <p className="text-muted-foreground">
          Follow the READ → FOCUS → APPLY → REINFORCE framework weekly to master all 7 NCEES domains.
        </p>
      </div>

      <div className="space-y-4">
        {STUDY_PLAN.map((plan) => {
          const progress = calculateWeekProgress(plan.week, plan);
          const isExpanded = expandedWeek === plan.week;
          
          return (
            <Card key={plan.week} className="overflow-hidden hover:shadow-md transition-shadow" data-testid={`card-week-${plan.week}`}>
              <button
                onClick={() => setExpandedWeek(isExpanded ? null : plan.week)}
                className="w-full p-6 flex items-center justify-between text-left border-l-4 hover-elevate"
                style={{ borderLeftColor: isExpanded ? 'hsl(var(--primary))' : 'hsl(var(--border))' }}
                data-testid={`button-week-${plan.week}`}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-bold text-muted-foreground text-sm uppercase tracking-wider">
                      Week {plan.week}
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
        {items.map((item, i) => {
          const itemId = `${prefix}-${i}`;
          const isChecked = completed.has(itemId);
          return (
            <label
              key={i}
              className="flex items-start gap-3 p-3 rounded-md border border-border cursor-pointer transition-all hover-elevate group"
              data-testid={`checkbox-${prefix}-${i}`}
            >
              <Checkbox
                checked={isChecked}
                onCheckedChange={() => onToggle(i)}
                className="mt-0.5"
              />
              <span className={`text-sm leading-relaxed ${isChecked ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
                {item}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
