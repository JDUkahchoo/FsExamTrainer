import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  HelpCircle, 
  BookOpen, 
  Ruler, 
  ThumbsUp, 
  ChevronRight, 
  ChevronDown,
  CheckCircle2,
  Lightbulb
} from 'lucide-react';

interface ProblemSolvingLoopProps {
  isVisible: boolean;
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
    description: 'Verify unit consistency — many exam errors come from unit mismatches.',
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

export function ProblemSolvingLoop({ isVisible }: ProblemSolvingLoopProps) {
  const [expanded, setExpanded] = useState(false);
  const [steps, setSteps] = useState<Record<string, StepState>>(() => {
    const initial: Record<string, StepState> = {};
    STEPS.forEach(step => {
      initial[step.id] = { expanded: false, note: '', confirmed: false };
    });
    return initial;
  });

  if (!isVisible) return null;

  const confirmedCount = Object.values(steps).filter(s => s.confirmed).length;

  const toggleStep = (stepId: string) => {
    setSteps(prev => ({
      ...prev,
      [stepId]: { ...prev[stepId], expanded: !prev[stepId].expanded },
    }));
  };

  const confirmStep = (stepId: string) => {
    setSteps(prev => ({
      ...prev,
      [stepId]: { ...prev[stepId], confirmed: !prev[stepId].confirmed, expanded: false },
    }));
  };

  const updateNote = (stepId: string, note: string) => {
    setSteps(prev => ({
      ...prev,
      [stepId]: { ...prev[stepId], note },
    }));
  };

  return (
    <div className="mb-4" data-testid="card-problem-solving-loop">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 text-sm text-muted-foreground hover-elevate rounded-md px-2 py-1.5 transition-colors"
        data-testid="button-toggle-loop"
      >
        <Lightbulb className="w-4 h-4" />
        <span>Stuck? Try the 4-step breakdown</span>
        {confirmedCount > 0 && (
          <span className="text-xs text-success">({confirmedCount}/4)</span>
        )}
        {expanded ? (
          <ChevronDown className="w-3.5 h-3.5" />
        ) : (
          <ChevronRight className="w-3.5 h-3.5" />
        )}
      </button>

      {expanded && (
        <div className="mt-2 space-y-1.5 pl-2 border-l-2 border-border ml-2">
          {STEPS.map((step) => {
            const state = steps[step.id];
            const StepIcon = step.icon;

            return (
              <div key={step.id} data-testid={`step-${step.id}`}>
                <button
                  onClick={() => state.confirmed ? confirmStep(step.id) : toggleStep(step.id)}
                  className="w-full flex items-center gap-2.5 py-1.5 px-2 text-left rounded-md hover-elevate transition-colors"
                  data-testid={`button-step-${step.id}`}
                >
                  <div className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold shrink-0 ${
                    state.confirmed
                      ? 'bg-success text-success-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {state.confirmed ? (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    ) : (
                      step.number
                    )}
                  </div>
                  <StepIcon className={`w-3.5 h-3.5 shrink-0 ${state.confirmed ? 'text-success' : 'text-muted-foreground'}`} />
                  <span className={`text-sm ${state.confirmed ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
                    {step.title}
                  </span>
                </button>

                {state.expanded && !state.confirmed && (
                  <div className="ml-11 pb-2 space-y-2">
                    <p className="text-xs text-muted-foreground">
                      {step.description}
                    </p>
                    <div className="space-y-1">
                      {step.prompts.map((prompt, i) => (
                        <div key={i} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                          <span className="mt-0.5">&#8226;</span>
                          <span>{prompt}</span>
                        </div>
                      ))}
                    </div>
                    <Textarea
                      placeholder="Quick notes (optional)..."
                      value={state.note}
                      onChange={(e) => updateNote(step.id, e.target.value)}
                      className="text-xs min-h-[40px] resize-none"
                      data-testid={`textarea-${step.id}`}
                    />
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
                      Got it
                    </Button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
