import { useState, useMemo } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LayersIcon, RotateCcw, ExternalLink, ChevronRight } from 'lucide-react';
import { COMPREHENSIVE_FLASHCARDS } from '@shared/data/flashcardsComprehensive';
import { PS_FLASHCARDS } from '@shared/data/ps-flashcards';

interface FlashcardWeekPreviewProps {
  week: number;
  domains: string[];
  examTrack: string;
}

// Normalize domain name differences between schema and flashcard data
function normalizeDomain(domain: string): string {
  return domain.replace('Standards and Specifications', 'Standards & Specifications');
}

function seededShuffle<T>(arr: T[], seed: number): T[] {
  const a = [...arr];
  let s = seed;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    const j = Math.abs(s) % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function FlashcardWeekPreview({ week, domains, examTrack }: FlashcardWeekPreviewProps) {
  const [flipped, setFlipped] = useState<Record<number, boolean>>({});

  const { matchedCards, totalCount, domainsParam } = useMemo(() => {
    const pool = examTrack === 'ps' ? PS_FLASHCARDS : COMPREHENSIVE_FLASHCARDS;
    const normalizedDomains = domains.map(normalizeDomain);
    const matched = pool.filter(card => normalizedDomains.includes(normalizeDomain(card.domain as string)));
    const shuffled = seededShuffle(matched, week * 31337);
    const domainsParam = encodeURIComponent(domains.join(','));
    return { matchedCards: shuffled.slice(0, 3), totalCount: matched.length, domainsParam };
  }, [domains, examTrack, week]);

  if (totalCount === 0) return null;

  const toggleFlip = (idx: number) => {
    setFlipped(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const resetAll = () => setFlipped({});

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400 font-semibold uppercase text-sm tracking-wider">
          <LayersIcon className="w-4 h-4" />
          Flashcards
          <Badge variant="outline" className="border-yellow-400 text-yellow-600 dark:text-yellow-400 text-xs font-normal normal-case tracking-normal">
            {totalCount} cards
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          {Object.values(flipped).some(Boolean) && (
            <button
              onClick={resetAll}
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
              data-testid={`button-flashcard-reset-${week}`}
            >
              <RotateCcw className="h-3 w-3" />
              Reset
            </button>
          )}
          <Link href={`/app/${examTrack}/flashcards?domains=${domainsParam}`}>
            <Button
              size="sm"
              variant="outline"
              className="text-xs gap-1 border-yellow-400 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20"
              data-testid={`button-study-flashcards-${week}`}
            >
              <ExternalLink className="w-3 h-3" />
              Study All {totalCount}
            </Button>
          </Link>
        </div>
      </div>

      {/* Preview cards */}
      <div className="space-y-2">
        {matchedCards.map((card, idx) => (
          <button
            key={idx}
            onClick={() => toggleFlip(idx)}
            className={`w-full text-left rounded-lg border transition-all duration-200 overflow-hidden group ${
              flipped[idx]
                ? 'border-yellow-400 dark:border-yellow-600 bg-yellow-50 dark:bg-yellow-900/20'
                : 'border-border bg-muted/30 hover:border-yellow-300 dark:hover:border-yellow-700 hover:bg-muted/60'
            }`}
            data-testid={`flashcard-preview-${week}-${idx}`}
          >
            <div className="px-3 py-2.5">
              {!flipped[idx] ? (
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">Term</p>
                    <p className="text-sm font-medium text-foreground leading-snug">{card.term}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 group-hover:text-yellow-500 transition-colors" />
                </div>
              ) : (
                <div>
                  <p className="text-xs text-yellow-600 dark:text-yellow-400 mb-0.5 font-medium">Definition</p>
                  <p className="text-sm text-foreground leading-snug whitespace-pre-line">{card.back}</p>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      <p className="text-xs text-muted-foreground text-center">
        Tap a card to reveal · {totalCount - 3 > 0 ? `+${totalCount - 3} more in full deck` : 'Showing all preview cards'}
      </p>
    </div>
  );
}
