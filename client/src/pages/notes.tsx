import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Save } from 'lucide-react';
import { STUDY_PLAN } from '@shared/data/studyPlan';
import { getStudyNotes, saveStudyNote } from '@/lib/localStorage';
import { useToast } from '@/hooks/use-toast';

export default function NotesPage() {
  const [selectedWeek, setSelectedWeek] = useState<number>(1);
  const [notes, setNotes] = useState<Record<number, string>>(() => getStudyNotes());
  const { toast } = useToast();

  const currentWeekPlan = STUDY_PLAN.find(plan => plan.week === selectedWeek);
  const currentNotes = notes[selectedWeek] || '';

  const handleSaveNotes = () => {
    saveStudyNote(selectedWeek, currentNotes);
    toast({
      title: 'Notes saved',
      description: `Your notes for Week ${selectedWeek} have been saved.`,
    });
  };

  const handleNotesChange = (value: string) => {
    setNotes(prev => ({ ...prev, [selectedWeek]: value }));
  };

  // Auto-save on change with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentNotes !== (getStudyNotes()[selectedWeek] || '')) {
        saveStudyNote(selectedWeek, currentNotes);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [currentNotes, selectedWeek]);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-4" data-testid="heading-notes">Study Notes</h1>
        <p className="text-muted-foreground mb-4">
          Take notes for each week of your study plan. Your notes are saved automatically.
        </p>

        <Select
          value={selectedWeek.toString()}
          onValueChange={(value) => setSelectedWeek(parseInt(value))}
        >
          <SelectTrigger className="w-full md:w-96" data-testid="select-week">
            <SelectValue placeholder="Select week" />
          </SelectTrigger>
          <SelectContent>
            {STUDY_PLAN.map(plan => (
              <SelectItem key={plan.week} value={plan.week.toString()}>
                Week {plan.week}: {plan.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Notes editor */}
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-foreground">
              Week {selectedWeek}: {currentWeekPlan?.title}
            </h2>
            <Button onClick={handleSaveNotes} size="sm" data-testid="button-save">
              <Save className="w-4 h-4 mr-2" />
              Save Notes
            </Button>
          </div>
          
          <Textarea
            value={currentNotes}
            onChange={(e) => handleNotesChange(e.target.value)}
            placeholder="Start taking notes... You can include key concepts, formulas, practice problems, questions, or anything else you want to remember."
            className="min-h-[500px] font-mono text-sm resize-none"
            data-testid="textarea-notes"
          />

          <div className="mt-4 text-sm text-muted-foreground">
            {currentNotes.length} characters
          </div>
        </Card>

        {/* Week overview sidebar */}
        <Card className="p-6 h-fit">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Week Overview
          </h3>
          
          {currentWeekPlan && (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-primary mb-2 uppercase tracking-wider">READ</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {currentWeekPlan.read.map((item, i) => (
                    <li key={i} className="leading-relaxed">• {item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-domain-computations-fg mb-2 uppercase tracking-wider">FOCUS</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {currentWeekPlan.focus.map((item, i) => (
                    <li key={i} className="leading-relaxed">• {item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-domain-boundary-fg mb-2 uppercase tracking-wider">APPLY</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {currentWeekPlan.apply.map((item, i) => (
                    <li key={i} className="leading-relaxed">• {item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-domain-field-fg mb-2 uppercase tracking-wider">REINFORCE</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {currentWeekPlan.reinforce.map((item, i) => (
                    <li key={i} className="leading-relaxed">• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Other weeks with notes */}
      <Card className="mt-6 p-6">
        <h3 className="font-semibold text-foreground mb-4">Your Notes Progress</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
          {STUDY_PLAN.map(plan => {
            const hasNotes = notes[plan.week] && notes[plan.week].length > 0;
            return (
              <button
                key={plan.week}
                onClick={() => setSelectedWeek(plan.week)}
                className={`
                  p-3 rounded-lg border-2 text-center transition-all hover-elevate
                  ${selectedWeek === plan.week ? 'border-primary bg-primary/5' : 'border-border'}
                  ${hasNotes ? 'bg-success/5' : ''}
                `}
                data-testid={`button-week-${plan.week}`}
              >
                <div className="text-lg font-bold text-foreground">W{plan.week}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {hasNotes ? `${notes[plan.week].length} chars` : 'No notes'}
                </div>
              </button>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
