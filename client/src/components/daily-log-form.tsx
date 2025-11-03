import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Plus, X } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { parseTimeToMinutes, formatMinutes } from '@/lib/time-utils';
import { DOMAINS } from '@shared/schema';
import type { InsertDailyLog, Domain } from '@shared/schema';

interface DailyLogFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  initialData?: {
    id?: string;
    date?: Date;
    activities?: string;
    notes?: string;
    weekNumber?: number;
    timeSpent?: number;
    domain?: string;
  };
}

export function DailyLogForm({ onSuccess, onCancel, initialData }: DailyLogFormProps) {
  const { toast } = useToast();
  const [date, setDate] = useState(
    initialData?.date 
      ? new Date(initialData.date).toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0]
  );
  const [activities, setActivities] = useState(initialData?.activities || '');
  const [notes, setNotes] = useState(initialData?.notes || '');
  const [weekNumber, setWeekNumber] = useState<string>(
    initialData?.weekNumber?.toString() || ''
  );
  const [timeSpent, setTimeSpent] = useState<string>(
    initialData?.timeSpent ? formatMinutes(initialData.timeSpent) : ''
  );
  const [domain, setDomain] = useState<Domain | ''>(
    (initialData?.domain as Domain) || ''
  );

  const createMutation = useMutation({
    mutationFn: (data: Omit<InsertDailyLog, 'userId'>) =>
      apiRequest('POST', '/api/daily-logs', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/daily-logs'] });
      queryClient.invalidateQueries({ queryKey: ['/api/progress/stats'] });
      toast({
        title: "Daily log saved",
        description: "Your daily activities have been recorded.",
      });
      setActivities('');
      setNotes('');
      setWeekNumber('');
      setTimeSpent('');
      setDomain('');
      setDate(new Date().toISOString().split('T')[0]);
      onSuccess?.();
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: { id: string; updates: Partial<InsertDailyLog> }) =>
      apiRequest('PUT', `/api/daily-logs/${data.id}`, data.updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/daily-logs'] });
      toast({
        title: "Daily log updated",
        description: "Your changes have been saved.",
      });
      onSuccess?.();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!activities.trim()) {
      toast({
        title: "Activities required",
        description: "Please describe what you studied today.",
        variant: "destructive",
      });
      return;
    }

    const timeMinutes = parseTimeToMinutes(timeSpent);
    
    // Create date in local timezone by appending time component
    const localDate = new Date(date + 'T12:00:00');
    
    const logData = {
      date: localDate,
      activities: activities.trim(),
      notes: notes.trim() || undefined,
      weekNumber: weekNumber ? parseInt(weekNumber) : undefined,
      timeSpent: timeMinutes || undefined,
      domain: domain || undefined,
    };

    if (initialData?.id) {
      updateMutation.mutate({ id: initialData.id, updates: logData });
    } else {
      createMutation.mutate(logData);
    }
  };

  const isLoading = createMutation.isPending || updateMutation.isPending;

  return (
    <Card className="p-4 md:p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            {initialData?.id ? 'Edit Daily Log' : 'Log Today\'s Study Activities'}
          </h3>
          {onCancel && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={onCancel}
              data-testid="button-cancel-log"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
            data-testid="input-log-date"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="activities">
            What did you study today? <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="activities"
            value={activities}
            onChange={(e) => setActivities(e.target.value)}
            placeholder="e.g., Reviewed Week 3 material, completed 10 practice quiz questions, studied boundary law flashcards..."
            className="min-h-[100px] resize-y"
            data-testid="input-log-activities"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Additional Notes (optional)</Label>
          <Textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any thoughts, struggles, or breakthroughs?"
            className="min-h-[80px] resize-y"
            data-testid="input-log-notes"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="timeSpent">Time Spent (optional)</Label>
            <Input
              id="timeSpent"
              type="text"
              value={timeSpent}
              onChange={(e) => setTimeSpent(e.target.value)}
              placeholder="e.g., 30 min, 2h, 1.5 hours"
              data-testid="input-log-time"
            />
            <p className="text-xs text-muted-foreground">
              Format: 30 min, 2h, 1.5 hours, etc.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="domain">Domain (optional)</Label>
            <Select value={domain || undefined} onValueChange={(val) => setDomain(val as Domain)}>
              <SelectTrigger data-testid="select-log-domain">
                <SelectValue placeholder="Select domain (optional)" />
              </SelectTrigger>
              <SelectContent>
                {DOMAINS.map((d) => (
                  <SelectItem key={d} value={d}>{d}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {domain && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setDomain('')}
                className="h-auto py-1 px-2 text-xs"
              >
                Clear selection
              </Button>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="weekNumber">Study Week (optional)</Label>
          <Input
            id="weekNumber"
            type="number"
            min="1"
            max="16"
            value={weekNumber}
            onChange={(e) => setWeekNumber(e.target.value)}
            placeholder="e.g., 3"
            data-testid="input-log-week"
          />
          <p className="text-xs text-muted-foreground">
            Link this log to a specific study week (1-16)
          </p>
        </div>

        <div className="flex gap-2 justify-end">
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isLoading}
              data-testid="button-cancel-form"
            >
              Cancel
            </Button>
          )}
          <Button
            type="submit"
            disabled={isLoading}
            data-testid="button-save-log"
          >
            <Plus className="h-4 w-4 mr-2" />
            {isLoading ? 'Saving...' : initialData?.id ? 'Update Log' : 'Save Daily Log'}
          </Button>
        </div>
      </form>
    </Card>
  );
}
