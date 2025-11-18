import { useState } from 'react';
import { Check, GripVertical, Info } from 'lucide-react';
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
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { NCEES_DOMAINS, getAllDomains } from '@shared/domains';

interface CustomPlanBuilderProps {
  onSave: (priorities: number[], timeline: number) => Promise<void>;
  currentPriorities?: number[];
  currentTimeline?: number;
  trigger?: React.ReactNode;
}

export function CustomPlanBuilder({ 
  onSave, 
  currentPriorities = [], 
  currentTimeline = 12,
  trigger 
}: CustomPlanBuilderProps) {
  const [open, setOpen] = useState(false);
  const [selectedDomains, setSelectedDomains] = useState<number[]>(currentPriorities);
  const [timeline, setTimeline] = useState(currentTimeline);
  const [isSaving, setIsSaving] = useState(false);

  const allDomains = getAllDomains();

  const toggleDomain = (domainNum: number) => {
    setSelectedDomains(prev => {
      if (prev.includes(domainNum)) {
        return prev.filter(d => d !== domainNum);
      } else {
        return [...prev, domainNum];
      }
    });
  };

  const moveDomainUp = (index: number) => {
    if (index === 0) return;
    const newPriorities = [...selectedDomains];
    [newPriorities[index - 1], newPriorities[index]] = [newPriorities[index], newPriorities[index - 1]];
    setSelectedDomains(newPriorities);
  };

  const moveDomainDown = (index: number) => {
    if (index === selectedDomains.length - 1) return;
    const newPriorities = [...selectedDomains];
    [newPriorities[index], newPriorities[index + 1]] = [newPriorities[index + 1], newPriorities[index]];
    setSelectedDomains(newPriorities);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(selectedDomains, timeline);
      setOpen(false);
    } catch (error) {
      console.error('Failed to save custom plan:', error);
    } finally {
      setIsSaving(false);
    }
  };

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

          {/* Domain Selection */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Select Priority Domains</Label>
            <p className="text-sm text-muted-foreground">
              Click to select domains you want to prioritize. Selected domains will appear first in your study plan.
            </p>
            
            <div className="grid gap-2">
              {allDomains
                .filter(d => d.number !== 0) // Exclude Domain 0 (Math Foundations) from priority selection
                .map((domain) => {
                  const isSelected = selectedDomains.includes(domain.number);
                  return (
                    <Card
                      key={domain.number}
                      className={`p-3 cursor-pointer transition-colors ${
                        isSelected ? 'bg-primary/10 border-primary' : 'hover-elevate'
                      }`}
                      onClick={() => toggleDomain(domain.number)}
                      data-testid={`card-domain-${domain.number}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                          isSelected ? 'bg-primary border-primary' : 'border-muted-foreground'
                        }`}>
                          {isSelected && <Check className="w-4 h-4 text-primary-foreground" />}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">Domain {domain.number}: {domain.name}</div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
            </div>
          </div>

          {/* Priority Order */}
          {selectedDomains.length > 0 && (
            <div className="space-y-3">
              <Label className="text-base font-semibold">Priority Order</Label>
              <p className="text-sm text-muted-foreground">
                Drag to reorder. Top domains will be scheduled earlier.
              </p>
              
              <div className="space-y-2">
                {selectedDomains.map((domainNum, index) => {
                  const domain = allDomains.find(d => d.number === domainNum);
                  if (!domain) return null;
                  
                  return (
                    <Card key={domainNum} className="p-3">
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-4 w-4 p-0"
                            onClick={() => moveDomainUp(index)}
                            disabled={index === 0}
                            data-testid={`button-move-up-${domainNum}`}
                          >
                            <GripVertical className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-4 w-4 p-0"
                            onClick={() => moveDomainDown(index)}
                            disabled={index === selectedDomains.length - 1}
                            data-testid={`button-move-down-${domainNum}`}
                          >
                            <GripVertical className="h-3 w-3" />
                          </Button>
                        </div>
                        <Badge variant="secondary">{index + 1}</Badge>
                        <div className="flex-1">
                          <div className="font-medium">Domain {domain.number}: {domain.name}</div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {/* Info Alert */}
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              {selectedDomains.length === 0 ? (
                <span>Select at least one domain to create a custom study plan. Your selected domains will be prioritized in the early weeks.</span>
              ) : (
                <span>
                  Your custom plan will focus on {selectedDomains.length} domain{selectedDomains.length > 1 ? 's' : ''} over {timeline} weeks. 
                  Domain 0 (Math Foundations) will be distributed throughout the plan as needed.
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
              disabled={selectedDomains.length === 0 || isSaving}
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
