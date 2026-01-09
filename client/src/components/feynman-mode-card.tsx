import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { BookOpen, Star, Check } from 'lucide-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import type { Flashcard, FlashcardFeynmanScore } from '@shared/schema';
import { getDomainConfig } from '@/lib/domains';

interface FeynmanModeCardProps {
  card: Omit<Flashcard, 'id'>;
  cardId: string;
  onComplete: () => void;
}

export function FeynmanModeCard({ card, cardId, onComplete }: FeynmanModeCardProps) {
  const [step, setStep] = useState<'question' | 'answer' | 'explain'>('question');
  const [explanation, setExplanation] = useState('');
  const [clarityRating, setClarityRating] = useState(3);

  const { data: existingScore } = useQuery<FlashcardFeynmanScore | null>({
    queryKey: ['/api/flashcards/feynman', cardId],
    queryFn: async () => {
      const res = await fetch(`/api/flashcards/feynman/${encodeURIComponent(cardId)}`, { credentials: 'include' });
      if (!res.ok) return null;
      return res.json();
    },
  });

  useEffect(() => {
    if (existingScore) {
      setExplanation(existingScore.explanation);
      setClarityRating(existingScore.clarityRating);
    }
  }, [existingScore]);

  const saveScoreMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest('POST', '/api/flashcards/feynman', {
        flashcardId: cardId,
        explanation,
        clarityRating,
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/flashcards/feynman'] });
      queryClient.invalidateQueries({ queryKey: ['/api/flashcards/feynman', cardId] });
      onComplete();
    },
  });

  const domainConfig = getDomainConfig(card.domain);
  const Icon = domainConfig.icon;

  const handleSubmit = () => {
    if (explanation.trim().length > 0) {
      saveScoreMutation.mutate();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          <span className="font-semibold">Feynman Technique</span>
        </div>
        <Badge variant="outline" className="text-xs">
          Explain it simply
        </Badge>
      </div>

      <Card className={`p-6 ${domainConfig.bgColor} border-t-4 ${domainConfig.borderColor}`}>
        <div className="flex items-center justify-between mb-4">
          <Badge variant="outline" className={`${domainConfig.textColor} border-transparent`}>
            <Icon className="w-3 h-3 mr-1" />
            {card.domain}
          </Badge>
        </div>

        {step === 'question' && (
          <div className="min-h-[200px] flex flex-col justify-center">
            <p className="text-xl font-semibold text-foreground text-center whitespace-pre-line mb-6">
              {card.front}
            </p>
            <Button 
              onClick={() => setStep('answer')} 
              className="w-full"
              data-testid="button-show-answer"
            >
              Show Answer
            </Button>
          </div>
        )}

        {step === 'answer' && (
          <div className="space-y-4">
            <div className="min-h-[150px] flex flex-col justify-center">
              <p className="text-lg text-foreground text-center whitespace-pre-line font-mono">
                {card.back}
              </p>
            </div>
            <Button 
              onClick={() => setStep('explain')} 
              className="w-full"
              data-testid="button-explain-it"
            >
              Now Explain It
            </Button>
          </div>
        )}

        {step === 'explain' && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground text-center">
              Explain this concept as if teaching a complete beginner. Use simple words and examples.
            </p>
            
            <Textarea
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              placeholder="In my own words, this concept means..."
              className="min-h-[120px] resize-none"
              data-testid="textarea-explanation"
            />

            <div className="space-y-2">
              <p className="text-sm font-medium text-center">
                How clearly could you explain this to someone else?
              </p>
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <Button
                    key={rating}
                    variant={clarityRating === rating ? 'default' : 'outline'}
                    size="icon"
                    onClick={() => setClarityRating(rating)}
                    data-testid={`button-rating-${rating}`}
                  >
                    <Star className={`w-4 h-4 ${clarityRating >= rating ? 'fill-current' : ''}`} />
                  </Button>
                ))}
              </div>
              <div className="flex justify-between text-xs text-muted-foreground px-2">
                <span>Confused</span>
                <span>Crystal Clear</span>
              </div>
            </div>

            <Button 
              onClick={handleSubmit}
              disabled={explanation.trim().length === 0 || saveScoreMutation.isPending}
              className="w-full"
              data-testid="button-save-explanation"
            >
              <Check className="w-4 h-4 mr-2" />
              {saveScoreMutation.isPending ? 'Saving...' : 'Save & Continue'}
            </Button>
          </div>
        )}
      </Card>

      <Card className="p-3 bg-muted">
        <p className="text-xs text-muted-foreground text-center">
          <strong>Feynman Technique:</strong> If you can't explain it simply, you don't understand it well enough.
        </p>
      </Card>
    </div>
  );
}
