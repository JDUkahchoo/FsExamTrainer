import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  HelpCircle, 
  BookOpen, 
  Ruler, 
  ThumbsUp, 
  ChevronRight, 
  ChevronDown,
  CheckCircle2,
  Send
} from 'lucide-react';

interface ProblemSolvingLoopProps {
  onConfirmSubmit: () => void;
  isVisible: boolean;
  questionDomain?: string;
}

interface StepState {
  expanded: boolean;
  note: string;
  confirmed: boolean;
}

const STEPS = [
  {
    id: 'understand',
    number: 1,
    title: 'What is the problem asking?',
    description: 'Identify knowns, unknowns, and what the question wants you to find.',
    prompts: [
      'What values or data are given?',
      'What am I solving for?',
      'Are there any constraints or conditions?',
    ],
    icon: HelpCircle,
  },
  {
    id: 'formula',
    number: 2,
    title: 'Which formula or concept applies?',
    description: 'Select the right equation, principle, or method before calculating.',
    prompts: [
      'Which formula connects the knowns to the unknown?',
      'Is there a standard procedure for this type of problem?',
      'Do I need to convert or rearrange anything first?',
    ],
    icon: BookOpen,
  },
  {
    id: 'units',
    number: 3,
    title: 'Check the units',
    description: 'Verify unit consistency. Many exam errors come from unit mismatches.',
    prompts: [
      'Are all measurements in the same unit system?',
      'Survey feet vs. international feet?',
      'Degrees vs. radians? Acres vs. sq ft?',
    ],
    icon: Ruler,
  },
  {
    id: 'sense',
    number: 4,
    title: 'Does the answer make sense?',
    description: 'Sanity-check your result before committing to an answer.',
    prompts: [
      'Is the magnitude reasonable for this type of problem?',
      'Does the sign (positive/negative) make sense?',
      'Can I eliminate any obviously wrong options?',
    ],
    icon: ThumbsUp,
  },
];

export function ProblemSolvingLoop({ onConfirmSubmit, isVisible }: ProblemSolvingLoopProps) {
  const [steps, setSteps] = useState<Record<string, StepState>>(() => {
    const initial: Record<string, StepState> = {};
    STEPS.forEach(step => {
      initial[step.id] = { expanded: false, note: '', confirmed: false };
    });
    return initial;
  });

  const [collapsed, setCollapsed] = useState(false);

  if (!isVisible) return null;

  const confirmedCount = Object.values(steps).filter(s => s.confirmed).length;
  const allConfirmed = confirmedCount === STEPS.length;

  const toggleStep = (stepId: string) => {
    setSteps(prev => ({
      ...prev,
      [stepId]: { ...prev[stepId], expanded: !prev[stepId].expanded },
    }));
  };

  const confirmStep = (stepId: string) => {
    setSteps(prev => ({
      ...prev,
      [stepId]: { ...prev[stepId], confirmed: true, expanded: false },
    }));
  };

  const updateNote = (stepId: string, note: string) => {
    setSteps(prev => ({
      ...prev,
      [stepId]: { ...prev[stepId], note },
    }));
  };

  return (
    <Card className="p-4 mb-6 border-primary/30 bg-primary/5" data-testid="card-problem-solving-loop">
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="w-full flex items-center justify-between gap-2"
        data-testid="button-toggle-loop"
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            {STEPS.map((step) => {
              const isConfirmed = steps[step.id].confirmed;
              return (
                <div
                  key={step.id}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    isConfirmed ? 'bg-success' : 'bg-border'
                  }`}
                />
              );
            })}
          </div>
          <span className="text-sm font-semibold text-foreground">
            Problem-Solving Checklist
          </span>
          <Badge variant="secondary" className="text-xs">
            {confirmedCount}/{STEPS.length}
          </Badge>
        </div>
        {collapsed ? (
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        )}
      </button>

      {!collapsed && (
        <div className="mt-4 space-y-2">
          {STEPS.map((step) => {
            const state = steps[step.id];
            const StepIcon = step.icon;

            return (
              <div
                key={step.id}
                className={`rounded-lg border transition-colors ${
                  state.confirmed
                    ? 'border-success/30 bg-success/5'
                    : 'border-border bg-background'
                }`}
                data-testid={`step-${step.id}`}
              >
                <button
                  onClick={() => toggleStep(step.id)}
                  className="w-full flex items-center gap-3 p-3 text-left"
                  data-testid={`button-step-${step.id}`}
                >
                  <div className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${
                    state.confirmed
                      ? 'bg-success text-success-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {state.confirmed ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      step.number
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <StepIcon className={`w-4 h-4 ${state.confirmed ? 'text-success' : 'text-muted-foreground'}`} />
                      <span className={`text-sm font-medium ${state.confirmed ? 'text-success line-through' : 'text-foreground'}`}>
                        {step.title}
                      </span>
                    </div>
                  </div>
                  {!state.confirmed && (
                    state.expanded ? (
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    )
                  )}
                </button>

                {state.expanded && !state.confirmed && (
                  <div className="px-3 pb-3 space-y-3">
                    <p className="text-xs text-muted-foreground pl-10">
                      {step.description}
                    </p>
                    <div className="pl-10 space-y-1.5">
                      {step.prompts.map((prompt, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <span className="text-primary mt-0.5">&#8226;</span>
                          <span>{prompt}</span>
                        </div>
                      ))}
                    </div>
                    <div className="pl-10">
                      <Textarea
                        placeholder="Quick notes (optional)..."
                        value={state.note}
                        onChange={(e) => updateNote(step.id, e.target.value)}
                        className="text-xs min-h-[48px] resize-none"
                        data-testid={`textarea-${step.id}`}
                      />
                    </div>
                    <div className="pl-10">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          confirmStep(step.id);
                        }}
                        data-testid={`button-confirm-${step.id}`}
                      >
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Done
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          <div className="pt-2">
            <Button
              onClick={onConfirmSubmit}
              className="w-full"
              disabled={!allConfirmed}
              data-testid="button-confirm-submit"
            >
              <Send className="w-4 h-4 mr-2" />
              {allConfirmed ? 'Submit Answer' : `Complete all ${STEPS.length} steps first`}
            </Button>
            {!allConfirmed && (
              <p className="text-xs text-muted-foreground text-center mt-2">
                Work through each step to build strong exam-day habits
              </p>
            )}
          </div>
        </div>
      )}
    </Card>
  );
}
