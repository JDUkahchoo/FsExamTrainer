import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Calendar, Edit, Trash2, FileText, Loader2 } from 'lucide-react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { DailyLogForm } from './daily-log-form';
import type { DailyLog } from '@shared/schema';
import { format, parseISO, startOfWeek, endOfWeek, isWithinInterval } from 'date-fns';

export function DailyLogList() {
  const { toast } = useToast();
  const [editingLog, setEditingLog] = useState<DailyLog | null>(null);
  const [deletingLogId, setDeletingLogId] = useState<string | null>(null);

  const { data: logs, isLoading } = useQuery<DailyLog[]>({
    queryKey: ['/api/daily-logs'],
    refetchOnMount: 'always',
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiRequest('DELETE', `/api/daily-logs/${id}`, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/daily-logs'] });
      toast({
        title: "Log deleted",
        description: "Your daily log has been removed.",
      });
      setDeletingLogId(null);
    },
  });

  if (isLoading) {
    return (
      <Card className="p-8 flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </Card>
    );
  }

  if (!logs || logs.length === 0) {
    return (
      <Card className="p-8 text-center">
        <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">No daily logs yet</h3>
        <p className="text-sm text-muted-foreground">
          Start tracking your daily study activities above!
        </p>
      </Card>
    );
  }

  // Group logs by week
  const groupedByWeek = logs.reduce((acc, log) => {
    const logDate = parseISO(log.date.toString());
    const weekStart = startOfWeek(logDate, { weekStartsOn: 0 }); // Sunday
    const weekKey = format(weekStart, 'yyyy-MM-dd');
    
    if (!acc[weekKey]) {
      acc[weekKey] = {
        weekStart,
        logs: [],
      };
    }
    
    acc[weekKey].logs.push(log);
    return acc;
  }, {} as Record<string, { weekStart: Date; logs: DailyLog[] }>);

  const sortedWeeks = Object.values(groupedByWeek).sort(
    (a, b) => b.weekStart.getTime() - a.weekStart.getTime()
  );

  if (editingLog) {
    return (
      <DailyLogForm
        initialData={{
          id: editingLog.id,
          date: new Date(editingLog.date),
          activities: editingLog.activities,
          notes: editingLog.notes || '',
          weekNumber: editingLog.weekNumber || undefined,
        }}
        onSuccess={() => setEditingLog(null)}
        onCancel={() => setEditingLog(null)}
      />
    );
  }

  return (
    <>
      <div className="space-y-6">
        {sortedWeeks.map(({ weekStart, logs: weekLogs }) => {
          const weekEnd = endOfWeek(weekStart, { weekStartsOn: 0 });
          
          return (
            <div key={format(weekStart, 'yyyy-MM-dd')}>
              <h4 className="text-sm font-semibold text-muted-foreground mb-3">
                Week of {format(weekStart, 'MMM d')} - {format(weekEnd, 'MMM d, yyyy')}
              </h4>
              
              <div className="space-y-3">
                {weekLogs
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .map((log) => (
                    <Card key={log.id} className="p-4 hover-elevate" data-testid={`log-card-${log.id}`}>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="h-4 w-4" />
                              <span data-testid={`log-date-${log.id}`}>
                                {format(parseISO(log.date.toString()), 'EEEE, MMMM d, yyyy')}
                              </span>
                            </div>
                            {log.weekNumber && (
                              <Badge variant="outline" data-testid={`log-week-${log.id}`}>
                                Week {log.weekNumber}
                              </Badge>
                            )}
                          </div>
                          
                          <div className="mb-3">
                            <h5 className="text-sm font-semibold text-foreground mb-1">Activities</h5>
                            <p className="text-sm text-foreground whitespace-pre-wrap" data-testid={`log-activities-${log.id}`}>
                              {log.activities}
                            </p>
                          </div>
                          
                          {log.notes && (
                            <div>
                              <h5 className="text-sm font-semibold text-foreground mb-1">Notes</h5>
                              <p className="text-sm text-muted-foreground whitespace-pre-wrap" data-testid={`log-notes-${log.id}`}>
                                {log.notes}
                              </p>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex gap-2 shrink-0">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setEditingLog(log)}
                            data-testid={`button-edit-${log.id}`}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setDeletingLogId(log.id)}
                            data-testid={`button-delete-${log.id}`}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
              </div>
            </div>
          );
        })}
      </div>

      <AlertDialog open={!!deletingLogId} onOpenChange={() => setDeletingLogId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Daily Log?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your daily log entry.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="button-cancel-delete">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deletingLogId && deleteMutation.mutate(deletingLogId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              data-testid="button-confirm-delete"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
