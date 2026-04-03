import { useState, useMemo } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LayersIcon, ChevronLeft, ChevronRight, ExternalLink, Sun, Sunset, Moon } from 'lucide-react';
import { COMPREHENSIVE_FLASHCARDS } from '@shared/data/flashcardsComprehensive';
import { PS_FLASHCARDS } from '@shared/data/ps-flashcards';

const SESSION_SIZE = 15; // cards per session slot
const WEEK_SLOT_SIZE = SESSION_SIZE * 3; // 45 cards per week occurrence per domain

interface WeekEntry {
  week: number;
  domains: string[];
}

interface FlashcardWeekPreviewProps {
  week: number;
  domains: string[];
  examTrack: string;
  allWeeks: WeekEntry[];
}

interface Session {
  label: string;
  icon: typeof Sun;
  cards: Card[];
}

interface Card {
  front: string;
  back: string;
  domain: string;
}

function normalizeDomain(domain: string): string {
  return domain.replace('Standards and Specifications', 'Standards & Specifications');
}

/** Deterministic shuffle keyed on a string (domain name) for stable slicing across weeks */
function domainSeededShuffle<T>(arr: T[], seed: string): T[] {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 16777619) >>> 0;
  }
  const a = [...arr];
  let s = h;
  for (let i = a.length - 1; i > 0; i--) {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    const j = s % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Split a card's back text into definition and optional example */
function parseBack(back: string): { definition: string; example: string | null } {
  const exampleMatch = back.match(/\n\nExample:/i);
  if (exampleMatch && exampleMatch.index !== undefined) {
    const definition = back.slice(0, exampleMatch.index).trim();
    const example = back.slice(exampleMatch.index + 2).trim();
    return { definition, example };
  }
  return { definition: back.trim(), example: null };
}

const SESSION_META: Array<{ label: string; icon: typeof Sun }> = [
  { label: 'Morning', icon: Sun },
  { label: 'Afternoon', icon: Sunset },
  { label: 'Evening', icon: Moon },
];

function CardNavigator({ cards, weekKey }: { cards: Card[]; weekKey: string }) {
  const [index, setIndex] = useState(0);
  const total = cards.length;
  const card = cards[Math.min(index, total - 1)];
  const { definition, example } = parseBack(card.back);

  const prev = () => setIndex(i => (i - 1 + total) % total);
  const next = () => setIndex(i => (i + 1) % total);

  return (
    <div className="space-y-2">
      {/* Card */}
      <div
        className="rounded-lg border border-yellow-300 dark:border-yellow-700 bg-yellow-50/40 dark:bg-yellow-900/10 divide-y divide-yellow-200 dark:divide-yellow-800"
        data-testid={`flashcard-card-${weekKey}`}
      >
        {/* Term */}
        <div className="px-4 py-3">
          <p className="text-xs text-yellow-600 dark:text-yellow-500 font-semibold uppercase tracking-wide mb-0.5">
            Term
          </p>
          <p className="text-sm font-semibold text-foreground leading-snug">{card.front}</p>
        </div>

        {/* Definition */}
        <div className="px-4 py-3">
          <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide mb-0.5">
            Definition
          </p>
          <p className="text-sm text-foreground leading-snug whitespace-pre-line">{definition}</p>
        </div>

        {/* Example — only rendered when present */}
        {example && (
          <div className="px-4 py-3 bg-yellow-100/50 dark:bg-yellow-900/20 rounded-b-lg">
            <p className="text-xs text-yellow-700 dark:text-yellow-400 font-semibold uppercase tracking-wide mb-0.5">
              Example
            </p>
            <p className="text-sm text-foreground leading-snug whitespace-pre-line">
              {example.replace(/^Example:\s*/i, '')}
            </p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between gap-2">
        <button
          onClick={prev}
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded hover:bg-muted"
          data-testid={`button-flashcard-prev-${weekKey}`}
        >
          <ChevronLeft className="h-4 w-4" />
          Prev
        </button>

        <span className="text-xs text-muted-foreground tabular-nums">
          {index + 1} / {total}
        </span>

        <button
          onClick={next}
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded hover:bg-muted"
          data-testid={`button-flashcard-next-${weekKey}`}
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export function FlashcardWeekPreview({ week, domains, examTrack, allWeeks }: FlashcardWeekPreviewProps) {
  const [activeSession, setActiveSession] = useState(0);

  const { sessions, domainsParam, totalCards } = useMemo(() => {
    const pool = examTrack === 'ps' ? PS_FLASHCARDS : COMPREHENSIVE_FLASHCARDS;
    const normalizedDomains = domains.map(normalizeDomain);

    // For each domain in this week, compute which occurrence this week is
    // and get the corresponding card slice (up to WEEK_SLOT_SIZE per domain).
    const domainSlices: Card[][] = [];

    for (const domain of normalizedDomains) {
      const domainCards = pool.filter(
        c => normalizeDomain(c.domain as string) === domain
      ) as Card[];
      if (domainCards.length === 0) continue;

      // Stable shuffle keyed on domain name so slice positions are consistent
      const shuffled = domainSeededShuffle(domainCards, domain);

      // Find sorted list of weeks that include this domain
      const weeksWithDomain = allWeeks
        .filter(w => w.domains.map(normalizeDomain).includes(domain))
        .sort((a, b) => a.week - b.week);

      const occurrenceIdx = weeksWithDomain.findIndex(w => w.week === week);
      if (occurrenceIdx === -1) continue; // current week not in list (shouldn't happen)

      // Each occurrence gets a non-overlapping slice of up to WEEK_SLOT_SIZE cards
      const start = occurrenceIdx * WEEK_SLOT_SIZE;
      const slice = shuffled.slice(start, start + WEEK_SLOT_SIZE);
      if (slice.length > 0) domainSlices.push(slice);
    }

    // Round-robin interleave slices so all domains are represented fairly when
    // multiple domains share a week (prevents earlier domains crowding out later ones).
    const weekCards: Card[] = [];
    if (domainSlices.length <= 1) {
      weekCards.push(...(domainSlices[0] ?? []));
    } else {
      const indices = domainSlices.map(() => 0);
      while (weekCards.length < WEEK_SLOT_SIZE) {
        let added = 0;
        for (let d = 0; d < domainSlices.length && weekCards.length < WEEK_SLOT_SIZE; d++) {
          if (indices[d] < domainSlices[d].length) {
            weekCards.push(domainSlices[d][indices[d]++]);
            added++;
          }
        }
        if (added === 0) break; // all domain slices exhausted
      }
    }

    // Split into Morning / Afternoon / Evening sessions of up to SESSION_SIZE each
    const rawSessions = SESSION_META.map((meta, i) => ({
      label: meta.label,
      icon: meta.icon,
      cards: weekCards.slice(i * SESSION_SIZE, (i + 1) * SESSION_SIZE),
    })).filter(s => s.cards.length > 0);

    const domainsParam = encodeURIComponent(domains.join(','));
    return { sessions: rawSessions, domainsParam, totalCards: weekCards.length };
  }, [week, domains, examTrack, allWeeks]);

  if (sessions.length === 0) return null;

  // Clamp activeSession index in case it's out of range after domain changes
  const safeSession = Math.min(activeSession, sessions.length - 1);
  const currentSession = sessions[safeSession];
  const Icon = currentSession.icon;

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
            {totalCards} cards this week
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

      {/* Session tabs — only render tabs that have cards */}
      {sessions.length > 1 && (
        <div className="flex gap-1 rounded-lg bg-yellow-100/60 dark:bg-yellow-900/20 p-1" data-testid={`flashcard-session-tabs-${week}`}>
          {sessions.map((session, i) => {
            const TabIcon = session.icon;
            const isActive = i === safeSession;
            return (
              <button
                key={session.label}
                onClick={() => setActiveSession(i)}
                className={[
                  'flex-1 flex items-center justify-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-medium transition-colors',
                  isActive
                    ? 'bg-white dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300 shadow-sm'
                    : 'text-yellow-600 dark:text-yellow-500 hover:text-yellow-700 dark:hover:text-yellow-300',
                ].join(' ')}
                data-testid={`tab-session-${session.label.toLowerCase()}-${week}`}
              >
                <TabIcon className="w-3 h-3" />
                {session.label}
                <span className="text-yellow-500 dark:text-yellow-600">
                  ({session.cards.length})
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Single-session label when there's only one session */}
      {sessions.length === 1 && (
        <div className="flex items-center gap-1.5 text-xs text-yellow-600 dark:text-yellow-400" data-testid={`flashcard-session-label-${week}`}>
          <Icon className="w-3.5 h-3.5" />
          <span className="font-medium">{currentSession.label} session</span>
          <span className="text-yellow-500">({currentSession.cards.length} cards)</span>
        </div>
      )}

      {/* Card navigator for the active session */}
      <CardNavigator
        key={`${week}-${safeSession}`}
        cards={currentSession.cards}
        weekKey={`${week}-${currentSession.label.toLowerCase()}`}
      />

      <p className="text-xs text-muted-foreground text-center">
        Challenge · Triad · Feynman · Mnemonic modes available in the Flashcard tab
      </p>
    </div>
  );
}
