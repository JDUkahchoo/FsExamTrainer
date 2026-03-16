import { useState, useMemo } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LayersIcon, ChevronLeft, ChevronRight, ExternalLink, RotateCcw } from 'lucide-react';
import { COMPREHENSIVE_FLASHCARDS } from '@shared/data/flashcardsComprehensive';
import { PS_FLASHCARDS } from '@shared/data/ps-flashcards';

interface FlashcardWeekPreviewProps {
  week: number;
  domains: string[];
  examTrack: string;
}

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
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const { cards, domainsParam } = useMemo(() => {
    const pool = examTrack === 'ps' ? PS_FLASHCARDS : COMPREHENSIVE_FLASHCARDS;
    const normalizedDomains = domains.map(normalizeDomain);
    const matched = pool.filter(card =>
      normalizedDomains.includes(normalizeDomain(card.domain as string))
    );
    const shuffled = seededShuffle(matched, week * 31337);
    const domainsParam = encodeURIComponent(domains.join(','));
    return { cards: shuffled, domainsParam };
  }, [domains, examTrack, week]);

  if (cards.length === 0) return null;

  const total = cards.length;
  const card = cards[index];

  const goTo = (nextIndex: number) => {
    setIndex(nextIndex);
    setRevealed(false);
  };

  const prev = () => goTo((index - 1 + total) % total);
  const next = () => goTo((index + 1) % total);

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400 font-semibold uppercase text-sm tracking-wider">
          <LayersIcon className="w-4 h-4" />
          Flashcards
          <Badge
            variant="outline"
            className="border-yellow-400 text-yellow-600 dark:text-yellow-400 text-xs font-normal normal-case tracking-normal"
          >
            {total} cards
          </Badge>
        </div>
        <Link href={`/app/${examTrack}/flashcards?domains=${domainsParam}`}>
          <Button
            size="sm"
            variant="outline"
            className="text-xs gap-1 border-yellow-400 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20"
            data-testid={`button-study-flashcards-${week}`}
          >
            <ExternalLink className="w-3 h-3" />
            Full Flashcard Tab
          </Button>
        </Link>
      </div>

      {/* Card */}
      <button
        onClick={() => setRevealed(r => !r)}
        className={`w-full text-left rounded-lg border transition-all duration-200 min-h-[80px] ${
          revealed
            ? 'border-yellow-400 dark:border-yellow-600 bg-yellow-50 dark:bg-yellow-900/20'
            : 'border-border bg-muted/30 hover:border-yellow-300 dark:hover:border-yellow-700 hover:bg-muted/50'
        }`}
        data-testid={`flashcard-card-${week}`}
      >
        <div className="px-4 py-3">
          {!revealed ? (
            <div>
              <p className="text-xs text-muted-foreground mb-1">Term — tap to reveal</p>
              <p className="text-sm font-medium text-foreground leading-snug">{card.term}</p>
            </div>
          ) : (
            <div>
              <p className="text-xs text-yellow-600 dark:text-yellow-400 font-medium mb-1">
                Definition — tap to hide
              </p>
              <p className="text-sm text-foreground leading-snug whitespace-pre-line">{card.back}</p>
            </div>
          )}
        </div>
      </button>

      {/* Navigation */}
      <div className="flex items-center justify-between gap-2">
        <button
          onClick={prev}
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded hover:bg-muted"
          data-testid={`button-flashcard-prev-${week}`}
        >
          <ChevronLeft className="h-4 w-4" />
          Prev
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground tabular-nums">
            {index + 1} of {total}
          </span>
          {revealed && (
            <button
              onClick={() => setRevealed(false)}
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
              data-testid={`button-flashcard-flip-${week}`}
            >
              <RotateCcw className="h-3 w-3" />
            </button>
          )}
        </div>

        <button
          onClick={next}
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded hover:bg-muted"
          data-testid={`button-flashcard-next-${week}`}
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <p className="text-xs text-muted-foreground text-center">
        Challenge · Triad · Feynman · Mnemonic modes available in the Flashcard tab
      </p>
    </div>
  );
}
