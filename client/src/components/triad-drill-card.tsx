import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, Circle, ChevronRight } from 'lucide-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import type { Flashcard, FlashcardTriadProgress } from '@shared/schema';
import { getDomainConfig } from '@/lib/domains';

type TriadPhase = 'recall' | 'apply' | 'reverse';

interface TriadDrillCardProps {
  card: Omit<Flashcard, 'id'>;
  cardId: string;
  onComplete: () => void;
}

const PHASE_CONFIG = {
  recall: {
    title: 'Recall',
    prompt: 'What is the answer to this concept?',
    description: 'Test your raw memory'
  },
  apply: {
    title: 'Apply', 
    prompt: 'How would you use this in a real surveying scenario?',
    description: 'Think through practical application'
  },
  reverse: {
    title: 'Reverse',
    prompt: 'Given the answer, what was the question?',
    description: 'Strengthen reverse associations'
  }
};

export function TriadDrillCard({ card, cardId, onComplete }: TriadDrillCardProps) {
  const [currentPhase, setCurrentPhase] = useState<TriadPhase>('recall');
  const [isRevealed, setIsRevealed] = useState(false);
  const [completedPhases, setCompletedPhases] = useState<Set<TriadPhase>>(new Set());

  const { data: progress } = useQuery<FlashcardTriadProgress | null>({
    queryKey: ['/api/flashcards/triad', cardId],
    queryFn: async () => {
      const res = await fetch(`/api/flashcards/triad/${encodeURIComponent(cardId)}`, { credentials: 'include' });
      if (!res.ok) return null;
      return res.json();
    },
  });

  useEffect(() => {
    if (progress) {
      const completed = new Set<TriadPhase>();
      if (progress.recallComplete) completed.add('recall');
      if (progress.applyComplete) completed.add('apply');
      if (progress.reverseComplete) completed.add('reverse');
      setCompletedPhases(completed);
      
      if (!progress.recallComplete) setCurrentPhase('recall');
      else if (!progress.applyComplete) setCurrentPhase('apply');
      else if (!progress.reverseComplete) setCurrentPhase('reverse');
    }
  }, [progress]);

  const updateProgressMutation = useMutation({
    mutationFn: async (phase: TriadPhase) => {
      const res = await apiRequest('POST', '/api/flashcards/triad', {
        flashcardId: cardId,
        [`${phase}Complete`]: true,
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/flashcards/triad'] });
      queryClient.invalidateQueries({ queryKey: ['/api/flashcards/triad', cardId] });
    },
  });

  const handlePhaseComplete = () => {
    const newCompleted = new Set(completedPhases);
    newCompleted.add(currentPhase);
    setCompletedPhases(newCompleted);
    
    updateProgressMutation.mutate(currentPhase);
    
    if (newCompleted.size === 3) {
      onComplete();
    } else {
      setIsRevealed(false);
      if (currentPhase === 'recall') setCurrentPhase('apply');
      else if (currentPhase === 'apply') setCurrentPhase('reverse');
    }
  };

  const domainConfig = getDomainConfig(card.domain);
  const Icon = domainConfig.icon;
  const phaseConfig = PHASE_CONFIG[currentPhase];
  const progressPercent = (completedPhases.size / 3) * 100;

  const getDisplayContent = () => {
    if (currentPhase === 'reverse') {
      return { front: card.back, back: card.front };
    }
    return { front: card.front, back: card.back };
  };

  const displayContent = getDisplayContent();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {(['recall', 'apply', 'reverse'] as TriadPhase[]).map((phase) => (
            <div key={phase} className="flex items-center gap-1">
              {completedPhases.has(phase) ? (
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              ) : phase === currentPhase ? (
                <Circle className="w-5 h-5 text-primary fill-primary/20" />
              ) : (
                <Circle className="w-5 h-5 text-muted-foreground" />
              )}
              <span className={`text-sm ${phase === currentPhase ? 'font-semibold' : 'text-muted-foreground'}`}>
                {PHASE_CONFIG[phase].title}
              </span>
            </div>
          ))}
        </div>
        <Badge variant="outline" className="text-xs">
          {completedPhases.size}/3 Complete
        </Badge>
      </div>

      <Progress value={progressPercent} className="h-2" />

      <Card className={`p-6 ${domainConfig.bgColor} border-t-4 ${domainConfig.borderColor}`}>
        <div className="flex items-center justify-between mb-4">
          <Badge variant="outline" className={`${domainConfig.textColor} border-transparent`}>
            <Icon className="w-3 h-3 mr-1" />
            {card.domain}
          </Badge>
          <Badge variant="secondary" className="text-xs">
            {phaseConfig.title} Phase
          </Badge>
        </div>

        <p className="text-sm text-muted-foreground mb-2">{phaseConfig.prompt}</p>
        
        <div className="min-h-[200px] flex flex-col justify-center">
          <p className="text-xl font-semibold text-foreground text-center whitespace-pre-line">
            {displayContent.front}
          </p>
        </div>

        {!isRevealed ? (
          <Button 
            onClick={() => setIsRevealed(true)} 
            className="w-full mt-4"
            data-testid="button-reveal-answer"
          >
            Reveal Answer
          </Button>
        ) : (
          <div className="mt-4 space-y-4">
            <Card className="p-4 bg-card">
              <p className="text-lg text-foreground text-center whitespace-pre-line font-mono">
                {displayContent.back}
              </p>
            </Card>
            
            <div className="flex gap-2">
              <Button 
                onClick={() => setIsRevealed(false)} 
                variant="outline" 
                className="flex-1"
                data-testid="button-try-again"
              >
                Try Again
              </Button>
              <Button 
                onClick={handlePhaseComplete} 
                className="flex-1"
                data-testid="button-got-it"
              >
                Got It
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        )}
      </Card>

      <p className="text-sm text-muted-foreground text-center">
        {phaseConfig.description}
      </p>
    </div>
  );
}
