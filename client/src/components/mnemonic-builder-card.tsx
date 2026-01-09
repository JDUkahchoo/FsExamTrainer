import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Lightbulb, Save, Trash2, Sparkles } from 'lucide-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import type { Flashcard, FlashcardMnemonic } from '@shared/schema';
import { getDomainConfig } from '@/lib/domains';

interface MnemonicBuilderCardProps {
  card: Omit<Flashcard, 'id'>;
  cardId: string;
  onComplete: () => void;
}

const BUILT_IN_MNEMONICS: Record<string, string> = {
  'Radians → Degrees': 'Radians are "Raw" - multiply by 180/π to make them "Degree-licious"',
  'Degrees → Radians': 'Degrees need to be "π-ed" - multiply by π/180',
  'Arc Length Formula': 's = rθ → "Some Really Thick" arc (s, r, theta)',
  'Latitude (Traverse)': 'LAT = Distance × COS (LATitude goes COS-wise North/South)',
  'Departure (Traverse)': 'DEP = Distance × SIN (DEPart SINging East/West)',
  'Slope (% grade)': 'Rise over Run × 100 = "Running uphill 100 times"',
  'Chord Length': '2r×sin(Δ/2) → "Two Really Strong" chord',
  'Area by Coordinates': 'Cross-multiply coordinates → "X marks the spot, Y not?"',
  'Relative Precision Ratio': 'Perimeter/Misclosure → "How far we walked vs. how lost we got"',
  'Error Propagation Rule': 'Errors add in quadrature → "Errors square up like boxers"',
};

export function MnemonicBuilderCard({ card, cardId, onComplete }: MnemonicBuilderCardProps) {
  const [mnemonic, setMnemonic] = useState('');
  const [isFlipped, setIsFlipped] = useState(false);

  const { data: existingMnemonic } = useQuery<FlashcardMnemonic | null>({
    queryKey: ['/api/flashcards/mnemonics', cardId],
    queryFn: async () => {
      const res = await fetch(`/api/flashcards/mnemonics/${encodeURIComponent(cardId)}`, { credentials: 'include' });
      if (!res.ok) return null;
      return res.json();
    },
  });

  useEffect(() => {
    if (existingMnemonic) {
      setMnemonic(existingMnemonic.mnemonic);
    }
  }, [existingMnemonic]);

  const saveMnemonicMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest('POST', '/api/flashcards/mnemonics', {
        flashcardId: cardId,
        mnemonic,
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/flashcards/mnemonics'] });
      queryClient.invalidateQueries({ queryKey: ['/api/flashcards/mnemonics', cardId] });
    },
  });

  const deleteMnemonicMutation = useMutation({
    mutationFn: async () => {
      await apiRequest('DELETE', `/api/flashcards/mnemonics/${encodeURIComponent(cardId)}`);
    },
    onSuccess: () => {
      setMnemonic('');
      queryClient.invalidateQueries({ queryKey: ['/api/flashcards/mnemonics'] });
      queryClient.invalidateQueries({ queryKey: ['/api/flashcards/mnemonics', cardId] });
    },
  });

  const domainConfig = getDomainConfig(card.domain);
  const Icon = domainConfig.icon;
  const builtInMnemonic = BUILT_IN_MNEMONICS[card.front];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-yellow-500" />
          <span className="font-semibold">Mnemonic Builder</span>
        </div>
        <Badge variant="outline" className="text-xs">
          Create memory tricks
        </Badge>
      </div>

      <Card 
        className={`p-6 ${domainConfig.bgColor} border-t-4 ${domainConfig.borderColor} cursor-pointer`}
        onClick={() => setIsFlipped(!isFlipped)}
        data-testid="card-flashcard-mnemonic"
      >
        <div className="flex items-center justify-between mb-4">
          <Badge variant="outline" className={`${domainConfig.textColor} border-transparent`}>
            <Icon className="w-3 h-3 mr-1" />
            {card.domain}
          </Badge>
          <span className="text-xs text-muted-foreground">
            Click to flip
          </span>
        </div>

        <div className="min-h-[150px] flex flex-col justify-center">
          {!isFlipped ? (
            <p className="text-xl font-semibold text-foreground text-center whitespace-pre-line">
              {card.front}
            </p>
          ) : (
            <p className="text-lg text-foreground text-center whitespace-pre-line font-mono">
              {card.back}
            </p>
          )}
        </div>
      </Card>

      {builtInMnemonic && (
        <Card className="p-4 bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800">
          <div className="flex items-start gap-2">
            <Sparkles className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-1">
                Suggested Mnemonic
              </p>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                {builtInMnemonic}
              </p>
            </div>
          </div>
        </Card>
      )}

      <Card className="p-4">
        <p className="text-sm font-medium mb-2">Your Memory Trick</p>
        <Textarea
          value={mnemonic}
          onChange={(e) => setMnemonic(e.target.value)}
          placeholder="Create your own mnemonic, acronym, rhyme, or visual association..."
          className="min-h-[100px] resize-none mb-3"
          data-testid="textarea-mnemonic"
        />
        
        <div className="flex gap-2">
          <Button
            onClick={() => saveMnemonicMutation.mutate()}
            disabled={mnemonic.trim().length === 0 || saveMnemonicMutation.isPending}
            className="flex-1"
            data-testid="button-save-mnemonic"
          >
            <Save className="w-4 h-4 mr-2" />
            {saveMnemonicMutation.isPending ? 'Saving...' : 'Save Mnemonic'}
          </Button>
          
          {existingMnemonic && (
            <Button
              onClick={() => deleteMnemonicMutation.mutate()}
              variant="outline"
              size="icon"
              disabled={deleteMnemonicMutation.isPending}
              data-testid="button-delete-mnemonic"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>
      </Card>

      <div className="flex justify-end">
        <Button onClick={onComplete} variant="outline" data-testid="button-next-card">
          Next Card
        </Button>
      </div>

      <Card className="p-3 bg-muted">
        <p className="text-xs text-muted-foreground text-center">
          <strong>Tip:</strong> The best mnemonics are personal, silly, or visual. Make it memorable!
        </p>
      </Card>
    </div>
  );
}
