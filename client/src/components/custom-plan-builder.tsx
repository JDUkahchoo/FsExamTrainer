import { useState, useEffect } from 'react';
import { Check, Info } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Alert,
  AlertDescription,
} from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { getAllDomains } from '@shared/domains';

interface CustomPlanBuilderProps {
  onSave: (weeklyDomains: Record<string, number[]>, timeline: number) => Promise<void>;
  currentWeeklyDomains?: Record<string, number[]>;
  currentTimeline?: number;
  trigger?: React.ReactNode;
}

export function CustomPlanBuilder({ 
  onSave, 
  currentWeeklyDomains = {}, 
  currentTimeline = 12,
  trigger 
}: CustomPlanBuilderProps) {
  const [open, setOpen] = useState(false);
  const [weeklyDomains, setWeeklyDomains] = useState<Record<string, number[]>>(currentWeeklyDomains);
  const [timeline, setTimeline] = useState(currentTimeline);
  const [isSaving, setIsSaving] = useState(false);

  const allDomains = getAllDomains();

  useEffect(() => {
    if (open) {
      setWeeklyDomains(currentWeeklyDomains);
      setTimeline(currentTimeline);
    }
  }, [open, currentWeeklyDomains, currentTimeline]);

  const toggleDomainForWeek = (week: number, domainNum: number) => {
    setWeeklyDomains(prev => {
      const weekKey = week.toString();
      const currentDomains = prev[weekKey] || [];
      
      if (currentDomains.includes(domainNum)) {
        // Remove domain from this week
        const updated = currentDomains.filter(d => d !== domainNum);
        if (updated.length === 0) {
          const { [weekKey]: _, ...rest } = prev;
          return rest;
        }
        return { ...prev, [weekKey]: updated };
      } else {
        // Add domain to this week
        return { ...prev, [weekKey]: [...currentDomains, domainNum] };
      }
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(weeklyDomains, timeline);
      setOpen(false);
    } catch (error) {
      console.error('Failed to save custom plan:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const totalAssignedWeeks = Object.keys(weeklyDomains).length;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" data-testid="button-open-custom-plan-builder">
            Create Custom Study Plan
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Build Your Custom Study Plan</DialogTitle>
          <DialogDescription>
            Select which domains you want to focus on and set your study timeline. 
            Priority domains will be scheduled earlier in your study plan.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Timeline Selection */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Study Timeline: {timeline} weeks</Label>
            <Slider
              value={[timeline]}
              onValueChange={(value) => setTimeline(value[0])}
              min={8}
              max={16}
              step={1}
              className="w-full"
              data-testid="slider-timeline"
            />
            <p className="text-sm text-muted-foreground">
              Choose between 8-16 weeks based on your exam date and available study time.
            </p>
          </div>

          {/* Week-by-Week Domain Assignment Grid */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Assign Domains to Each Week</Label>
            <p className="text-sm text-muted-foreground">
              Select which domains you want to study each week. You can choose multiple domains per week.
            </p>
            
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
              {Array.from({ length: timeline }, (_, i) => i + 1).map((week) => {
                const weekKey = week.toString();
                const selectedDomainsForWeek = weeklyDomains[weekKey] || [];
                
                return (
                  <Card key={week} className="p-4">
                    <div className="space-y-3">
                      <Label className="font-semibold">Week {week}</Label>
                      <div className="grid grid-cols-1 gap-2">
                        {allDomains
                          .filter(d => d.number !== 0) // Exclude Domain 0
                          .map((domain) => {
                            const isSelected = selectedDomainsForWeek.includes(domain.number);
                            return (
                              <div
                                key={domain.number}
                                className="flex items-center gap-2 hover-elevate p-2 rounded-md"
                              >
                                <Checkbox
                                  id={`week-${week}-domain-${domain.number}`}
                                  checked={isSelected}
                                  onCheckedChange={() => toggleDomainForWeek(week, domain.number)}
                                  data-testid={`checkbox-week-${week}-domain-${domain.number}`}
                                />
                                <label
                                  htmlFor={`week-${week}-domain-${domain.number}`}
                                  className="text-sm cursor-pointer flex-1"
                                >
                                  Domain {domain.number}: {domain.name}
                                </label>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Info Alert */}
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              {totalAssignedWeeks === 0 ? (
                <span>Select domains for at least one week to create a custom study plan. Domain 0 (Math Foundations) will be distributed throughout the plan as needed.</span>
              ) : (
                <span>
                  You've assigned domains to {totalAssignedWeeks} week{totalAssignedWeeks > 1 ? 's' : ''}. 
                  Lessons for selected domains will be distributed across your chosen weeks.
                </span>
              )}
            </AlertDescription>
          </Alert>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isSaving}
              data-testid="button-cancel"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={totalAssignedWeeks === 0 || isSaving}
              data-testid="button-save-custom-plan"
            >
              {isSaving ? 'Saving...' : 'Save & Generate Plan'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
