import { useState, useCallback, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, Eye, ClipboardCheck, RotateCcw } from 'lucide-react';
import type { Procedure } from '@shared/data/procedures';

/**
 * Blank definitions per procedure.
 * Each entry maps a procedure id to an array of step blank specs.
 * `stepIndex` is 0-based into procedure.steps.
 * `blanks` are exact substrings of the step's `action` text (case-insensitive match).
 */
const BLANK_DEFS: Record<string, Array<{ stepIndex: number; blanks: string[] }>> = {
  'single-proportion': [
    { stepIndex: 0, blanks: ['existing corners', 'same line'] },
    { stepIndex: 2, blanks: ['record distances'] },
    { stepIndex: 3, blanks: ['proportion'] },
    { stepIndex: 4, blanks: ['measured distance'] },
  ],
  'double-proportion': [
    { stepIndex: 0, blanks: ['four controlling corners'] },
    { stepIndex: 2, blanks: ['single proportion', 'BOTH lines'] },
    { stepIndex: 3, blanks: ['intersection point'] },
    { stepIndex: 5, blanks: ['restored corner'] },
  ],
  'lost-vs-obliterated': [
    { stepIndex: 1, blanks: ['accessories'] },
    { stepIndex: 3, blanks: ['Obliterated'] },
    { stepIndex: 4, blanks: ['Lost'] },
    { stepIndex: 5, blanks: ['thoroughly'] },
  ],
  'evidence-hierarchy-general': [
    { stepIndex: 0, blanks: ['Original monuments'] },
    { stepIndex: 1, blanks: ['Natural monuments'] },
    { stepIndex: 4, blanks: ['Courses and distances'] },
    { stepIndex: 5, blanks: ['Area'] },
  ],
  'senior-junior-rights': [
    { stepIndex: 1, blanks: ['senior grant', 'first in time'] },
    { stepIndex: 2, blanks: ['senior tract'] },
    { stepIndex: 4, blanks: ['senior grantee'] },
  ],
  'compass-rule-adjustment': [
    { stepIndex: 0, blanks: ['latitudes and departures'] },
    { stepIndex: 2, blanks: ['closure error'] },
    { stepIndex: 3, blanks: ['traverse length'] },
    { stepIndex: 4, blanks: ['correction'] },
  ],
  'differential-leveling': [
    { stepIndex: 1, blanks: ['backsight', 'BS'] },
    { stepIndex: 2, blanks: ['Height of Instrument'] },
    { stepIndex: 4, blanks: ['new elevation'] },
  ],
  'alta-positional-tolerance': [
    { stepIndex: 0, blanks: ['Relative Positional Precision'] },
    { stepIndex: 2, blanks: ['0.07 feet'] },
    { stepIndex: 4, blanks: ['Table A'] },
  ],
  'riparian-boundaries': [
    { stepIndex: 0, blanks: ['water body type'] },
    { stepIndex: 2, blanks: ['Meander lines'] },
    { stepIndex: 3, blanks: ['accretion'] },
    { stepIndex: 4, blanks: ['avulsion'] },
  ],
  'bearing-tree-procedure': [
    { stepIndex: 0, blanks: ['prescribed distance'] },
    { stepIndex: 1, blanks: ['Blaze'] },
    { stepIndex: 2, blanks: ['Scribe'] },
    { stepIndex: 4, blanks: ['bearing'] },
  ],
  'closure-check': [
    { stepIndex: 0, blanks: ['interior angles'] },
    { stepIndex: 1, blanks: ['angular misclosure'] },
    { stepIndex: 4, blanks: ['linear closure'] },
    { stepIndex: 5, blanks: ['ratio'] },
  ],
  'grid-vs-ground': [
    { stepIndex: 0, blanks: ['combined scale factor'] },
    { stepIndex: 2, blanks: ['elevation factor'] },
    { stepIndex: 3, blanks: ['Ground distance'] },
    { stepIndex: 4, blanks: ['Combined factor'] },
  ],
};

/** Represents one blank slot in a rendered step */
interface BlankSlot {
  globalIdx: number; // unique index across all blanks in the procedure
  answer: string;    // correct answer (preserves original case)
}

/** A fragment of the rendered step action — either plain text or a blank */
type Fragment =
  | { kind: 'text'; text: string }
  | { kind: 'blank'; slot: BlankSlot };

/** Build all blank slots and per-step fragments from procedure + defs */
function buildSlots(procedure: Procedure): {
  slots: BlankSlot[];
  stepFragments: Array<Fragment[]>; // per step (parallel to procedure.steps)
} {
  const defs = BLANK_DEFS[procedure.id] ?? [];
  const stepMap = new Map<number, string[]>();
  for (const { stepIndex, blanks } of defs) {
    stepMap.set(stepIndex, blanks);
  }

  const slots: BlankSlot[] = [];
  const stepFragments: Array<Fragment[]> = procedure.steps.map((step, sIdx) => {
    const blanks = stepMap.get(sIdx) ?? [];
    let text = step.action;
    const fragments: Fragment[] = [];

    // For each blank, split the remaining text at the first case-insensitive match
    let remaining = text;
    for (const blankWord of blanks) {
      const re = new RegExp(blankWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
      const match = re.exec(remaining);
      if (!match) {
        // Blank not found in text — skip
        continue;
      }
      // Push text before the match
      if (match.index > 0) {
        fragments.push({ kind: 'text', text: remaining.slice(0, match.index) });
      }
      // Create a blank slot with the original-case match as the answer
      const slot: BlankSlot = { globalIdx: slots.length, answer: match[0] };
      slots.push(slot);
      fragments.push({ kind: 'blank', slot });
      remaining = remaining.slice(match.index + match[0].length);
    }
    if (remaining.length > 0) {
      fragments.push({ kind: 'text', text: remaining });
    }
    // If no blanks defined for this step, just emit the whole text
    if (fragments.length === 0) {
      fragments.push({ kind: 'text', text: step.action });
    }
    return fragments;
  });

  return { slots, stepFragments };
}

function isCorrect(userAnswer: string, correctAnswer: string): boolean {
  return userAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase();
}

interface ProcedurePracticeModeProps {
  procedure: Procedure;
  onBack: () => void;
}

export function ProcedurePracticeMode({ procedure, onBack }: ProcedurePracticeModeProps) {
  const { slots, stepFragments } = useMemo(() => buildSlots(procedure), [procedure]);

  const [answers, setAnswers] = useState<Record<number, string>>(() =>
    Object.fromEntries(slots.map(s => [s.globalIdx, '']))
  );
  const [phase, setPhase] = useState<'input' | 'checked' | 'revealed'>('input');

  const setAnswer = useCallback((idx: number, value: string) => {
    setAnswers(prev => ({ ...prev, [idx]: value }));
  }, []);

  const handleCheck = () => setPhase('checked');

  const handleReveal = () => {
    setAnswers(Object.fromEntries(slots.map(s => [s.globalIdx, s.answer])));
    setPhase('revealed');
  };

  const handleReset = () => {
    setAnswers(Object.fromEntries(slots.map(s => [s.globalIdx, ''])));
    setPhase('input');
  };

  const score = useMemo(() => {
    if (phase === 'input') return null;
    const correct = slots.filter(s => isCorrect(answers[s.globalIdx] ?? '', s.answer)).length;
    return { correct, total: slots.length };
  }, [phase, slots, answers]);

  if (slots.length === 0) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground italic">
          No practice blanks defined for this procedure yet.
        </p>
        <Button size="sm" variant="outline" onClick={onBack} data-testid={`button-back-reading-${procedure.id}`}>
          Back to Reading
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-5" data-testid={`practice-mode-${procedure.id}`}>
      {/* Steps */}
      <div>
        <h4 className="font-medium mb-3 text-sm flex items-center gap-2">
          <ClipboardCheck className="h-4 w-4 text-primary" />
          Fill in the blanks — key terms are missing from each step
        </h4>
        <ol className="list-none space-y-3 ml-1">
          {procedure.steps.map((step, sIdx) => {
            const fragments = stepFragments[sIdx];
            return (
              <li key={sIdx} className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-sm flex items-center justify-center font-medium">
                  {step.step}
                </span>
                <p className="text-sm leading-relaxed flex-1 flex flex-wrap items-baseline gap-0.5">
                  {fragments.map((frag, fIdx) => {
                    if (frag.kind === 'text') {
                      return <span key={fIdx}>{frag.text}</span>;
                    }
                    const { slot } = frag;
                    const userVal = answers[slot.globalIdx] ?? '';
                    const correct = isCorrect(userVal, slot.answer);

                    if (phase === 'checked' || phase === 'revealed') {
                      return (
                        <span
                          key={fIdx}
                          className={[
                            'inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-xs font-semibold',
                            correct
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                              : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
                          ].join(' ')}
                          data-testid={`blank-result-${procedure.id}-${slot.globalIdx}`}
                        >
                          {correct
                            ? <CheckCircle2 className="h-3 w-3" />
                            : <XCircle className="h-3 w-3" />}
                          {correct ? userVal : (
                            <>
                              <span className="line-through opacity-60">{userVal || '—'}</span>
                              <span className="ml-0.5">{slot.answer}</span>
                            </>
                          )}
                        </span>
                      );
                    }

                    // input phase
                    return (
                      <input
                        key={fIdx}
                        type="text"
                        value={userVal}
                        onChange={e => setAnswer(slot.globalIdx, e.target.value)}
                        placeholder="___"
                        style={{ width: `${Math.max(slot.answer.length + 2, 8)}ch` }}
                        className="inline-block border-b-2 border-primary/60 bg-primary/5 rounded-sm px-1 py-0 text-sm font-medium text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary"
                        data-testid={`blank-input-${procedure.id}-${slot.globalIdx}`}
                        onKeyDown={e => { if (e.key === 'Enter') handleCheck(); }}
                      />
                    );
                  })}
                </p>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Score summary */}
      {score !== null && (
        <div
          className={[
            'rounded-lg border px-4 py-3 flex items-center gap-3 text-sm font-medium',
            score.correct === score.total
              ? 'border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300'
              : score.correct >= Math.ceil(score.total * 0.7)
              ? 'border-yellow-300 dark:border-yellow-700 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300'
              : 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300',
          ].join(' ')}
          data-testid={`practice-score-${procedure.id}`}
        >
          {score.correct === score.total
            ? <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
            : <XCircle className="h-4 w-4 flex-shrink-0" />}
          <span>
            {score.correct} of {score.total} correct
            {score.correct === score.total && ' — Perfect!'}
          </span>
          <Badge
            variant="outline"
            className="ml-auto text-xs"
          >
            {Math.round((score.correct / score.total) * 100)}%
          </Badge>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex flex-wrap gap-2">
        {phase === 'input' && (
          <>
            <Button
              size="sm"
              onClick={handleCheck}
              data-testid={`button-check-answers-${procedure.id}`}
            >
              <ClipboardCheck className="h-4 w-4 mr-1" />
              Check Answers
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleReveal}
              data-testid={`button-reveal-all-${procedure.id}`}
            >
              <Eye className="h-4 w-4 mr-1" />
              Reveal All
            </Button>
          </>
        )}
        {(phase === 'checked' || phase === 'revealed') && (
          <Button
            size="sm"
            variant="outline"
            onClick={handleReset}
            data-testid={`button-try-again-${procedure.id}`}
          >
            <RotateCcw className="h-4 w-4 mr-1" />
            Try Again
          </Button>
        )}
        <Button
          size="sm"
          variant="ghost"
          onClick={onBack}
          data-testid={`button-back-reading-${procedure.id}`}
          className="text-muted-foreground"
        >
          Back to Reading
        </Button>
      </div>
    </div>
  );
}
