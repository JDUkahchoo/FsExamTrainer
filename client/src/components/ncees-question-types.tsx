import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { GripVertical, FileText, Calculator, ListChecks, ArrowUpDown, AlertCircle } from 'lucide-react';
import type { NCEESQuestion, NCEESQuestionType } from '@shared/data/nceesStyleQuestions';

interface SelectAllQuestionProps {
  question: NCEESQuestion;
  selectedAnswers: number[];
  onAnswerChange: (answers: number[]) => void;
  showFeedback?: boolean;
  isCorrect?: boolean;
}

export function SelectAllQuestion({ 
  question, 
  selectedAnswers, 
  onAnswerChange,
  showFeedback,
  isCorrect
}: SelectAllQuestionProps) {
  const correctAnswers = question.correctAnswer as number[];
  
  const handleToggle = (index: number) => {
    if (showFeedback) return;
    
    if (selectedAnswers.includes(index)) {
      onAnswerChange(selectedAnswers.filter(i => i !== index));
    } else {
      onAnswerChange([...selectedAnswers, index]);
    }
  };

  const getOptionStatus = (index: number) => {
    if (!showFeedback) return 'default';
    const isSelected = selectedAnswers.includes(index);
    const shouldBeSelected = correctAnswers.includes(index);
    
    if (isSelected && shouldBeSelected) return 'correct';
    if (isSelected && !shouldBeSelected) return 'incorrect';
    if (!isSelected && shouldBeSelected) return 'missed';
    return 'default';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Badge variant="outline" className="text-xs">
          <ListChecks className="w-3 h-3 mr-1" />
          Select All That Apply
        </Badge>
        {question.partialCredit && (
          <Badge variant="secondary" className="text-xs">Partial Credit</Badge>
        )}
      </div>
      
      <div className="space-y-3">
        {question.options.map((option, index) => {
          const status = getOptionStatus(index);
          return (
            <div
              key={index}
              onClick={() => handleToggle(index)}
              className={cn(
                "flex items-start gap-3 p-4 rounded-md border cursor-pointer transition-colors",
                !showFeedback && "hover-elevate",
                selectedAnswers.includes(index) && !showFeedback && "bg-primary/10 border-primary",
                status === 'correct' && "bg-green-500/20 border-green-500",
                status === 'incorrect' && "bg-red-500/20 border-red-500",
                status === 'missed' && "bg-yellow-500/20 border-yellow-500",
                showFeedback && "cursor-default"
              )}
              data-testid={`select-all-option-${index}`}
            >
              <Checkbox
                checked={selectedAnswers.includes(index)}
                disabled={showFeedback}
                className="mt-0.5"
              />
              <span className={cn(
                "flex-1",
                status === 'correct' && "text-green-700 dark:text-green-400",
                status === 'incorrect' && "text-red-700 dark:text-red-400",
                status === 'missed' && "text-yellow-700 dark:text-yellow-400"
              )}>
                {option}
              </span>
              {showFeedback && status === 'missed' && (
                <Badge variant="outline" className="text-yellow-600 border-yellow-600 text-xs">
                  Should select
                </Badge>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface PriorityRankingQuestionProps {
  question: NCEESQuestion;
  rankedOrder: number[];
  onOrderChange: (order: number[]) => void;
  showFeedback?: boolean;
}

export function PriorityRankingQuestion({ 
  question, 
  rankedOrder, 
  onOrderChange,
  showFeedback
}: PriorityRankingQuestionProps) {
  const correctOrder = question.correctAnswer as number[];
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  
  useEffect(() => {
    if (rankedOrder.length === 0) {
      onOrderChange(question.options.map((_, i) => i));
    }
  }, [question.options.length]);

  const handleDragStart = (index: number) => {
    if (showFeedback) return;
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (showFeedback || draggedIndex === null || draggedIndex === index) return;
    
    const newOrder = [...rankedOrder];
    const draggedItem = newOrder[draggedIndex];
    newOrder.splice(draggedIndex, 1);
    newOrder.splice(index, 0, draggedItem);
    
    setDraggedIndex(index);
    onOrderChange(newOrder);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const moveItem = (fromIndex: number, direction: 'up' | 'down') => {
    if (showFeedback) return;
    const toIndex = direction === 'up' ? fromIndex - 1 : fromIndex + 1;
    if (toIndex < 0 || toIndex >= rankedOrder.length) return;
    
    const newOrder = [...rankedOrder];
    [newOrder[fromIndex], newOrder[toIndex]] = [newOrder[toIndex], newOrder[fromIndex]];
    onOrderChange(newOrder);
  };

  const getPositionStatus = (displayIndex: number) => {
    if (!showFeedback) return 'default';
    const itemAtPosition = rankedOrder[displayIndex];
    const shouldBeAtPosition = correctOrder[displayIndex];
    return itemAtPosition === shouldBeAtPosition ? 'correct' : 'incorrect';
  };

  const displayOrder = rankedOrder.length > 0 ? rankedOrder : question.options.map((_, i) => i);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Badge variant="outline" className="text-xs">
          <ArrowUpDown className="w-3 h-3 mr-1" />
          Priority Ranking
        </Badge>
        <span className="text-sm text-muted-foreground">
          Drag items or use arrows to rank (1 = highest priority)
        </span>
      </div>
      
      <div className="space-y-2">
        {displayOrder.map((optionIndex, displayIndex) => {
          const status = getPositionStatus(displayIndex);
          return (
            <div
              key={optionIndex}
              draggable={!showFeedback}
              onDragStart={() => handleDragStart(displayIndex)}
              onDragOver={(e) => handleDragOver(e, displayIndex)}
              onDragEnd={handleDragEnd}
              className={cn(
                "flex items-center gap-3 p-4 rounded-md border transition-colors",
                !showFeedback && "cursor-grab active:cursor-grabbing",
                draggedIndex === displayIndex && "opacity-50",
                status === 'correct' && "bg-green-500/20 border-green-500",
                status === 'incorrect' && "bg-red-500/20 border-red-500"
              )}
              data-testid={`priority-item-${displayIndex}`}
            >
              <div className="flex items-center gap-2">
                {!showFeedback && (
                  <GripVertical className="w-4 h-4 text-muted-foreground" />
                )}
                <Badge 
                  variant={status === 'correct' ? 'default' : status === 'incorrect' ? 'destructive' : 'secondary'}
                  className="w-6 h-6 flex items-center justify-center p-0"
                >
                  {displayIndex + 1}
                </Badge>
              </div>
              <span className="flex-1">{question.options[optionIndex]}</span>
              {!showFeedback && (
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => moveItem(displayIndex, 'up')}
                    disabled={displayIndex === 0}
                    className="p-1 hover:bg-muted rounded disabled:opacity-30"
                    data-testid={`move-up-${displayIndex}`}
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 15l-6-6-6 6" />
                    </svg>
                  </button>
                  <button
                    onClick={() => moveItem(displayIndex, 'down')}
                    disabled={displayIndex === displayOrder.length - 1}
                    className="p-1 hover:bg-muted rounded disabled:opacity-30"
                    data-testid={`move-down-${displayIndex}`}
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                </div>
              )}
              {showFeedback && status === 'incorrect' && (
                <Badge variant="outline" className="text-xs">
                  Should be #{correctOrder.indexOf(optionIndex) + 1}
                </Badge>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface ScenarioContextProps {
  context: string;
  scenarioId: string;
  questionNumber?: number;
  totalQuestions?: number;
}

export function ScenarioContext({ 
  context, 
  scenarioId,
  questionNumber,
  totalQuestions
}: ScenarioContextProps) {
  return (
    <Card className="p-4 mb-6 bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
      <div className="flex items-start gap-3">
        <FileText className="w-5 h-5 mt-0.5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="outline" className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-700">
              Scenario-Based Questions
            </Badge>
            {questionNumber && totalQuestions && (
              <span className="text-sm text-muted-foreground">
                Question {questionNumber} of {totalQuestions} in this scenario
              </span>
            )}
          </div>
          <p className="text-sm leading-relaxed text-foreground">{context}</p>
        </div>
      </div>
    </Card>
  );
}

interface ComputationalBadgeProps {
  diagramRef?: string;
}

export function ComputationalBadge({ diagramRef }: ComputationalBadgeProps) {
  return (
    <div className="flex items-center gap-2 mb-2">
      <Badge variant="outline" className="text-xs">
        <Calculator className="w-3 h-3 mr-1" />
        Computational
      </Badge>
      {diagramRef && (
        <Badge variant="secondary" className="text-xs">
          Reference: {diagramRef.replace(/_/g, ' ')}
        </Badge>
      )}
    </div>
  );
}

export function getQuestionTypeIcon(type: NCEESQuestionType) {
  switch (type) {
    case 'select_all':
      return <ListChecks className="w-4 h-4" />;
    case 'priority_ranking':
      return <ArrowUpDown className="w-4 h-4" />;
    case 'scenario_based':
      return <FileText className="w-4 h-4" />;
    case 'computational':
      return <Calculator className="w-4 h-4" />;
    default:
      return null;
  }
}

export function getQuestionTypeName(type: NCEESQuestionType): string {
  switch (type) {
    case 'select_all':
      return 'Select All That Apply';
    case 'priority_ranking':
      return 'Priority Ranking';
    case 'scenario_based':
      return 'Scenario-Based';
    case 'computational':
      return 'Computational';
    case 'multiple_choice':
      return 'Multiple Choice';
    default:
      return 'Unknown';
  }
}
