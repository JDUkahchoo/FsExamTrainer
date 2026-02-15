import { useState, useMemo, useCallback, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { getDomainConfig } from '@/lib/domains';
import { CheckCircle2, XCircle, Trophy, RotateCcw, ArrowRight } from 'lucide-react';
import type { Flashcard, Domain } from '@shared/schema';

interface ChallengeCard {
  index: number;
  card: Flashcard;
  cardId: string;
}

interface FlashcardChallengeModeProps {
  cards: Flashcard[];
  activeFlashcards: Flashcard[];
  selectedDeck: 'original' | 'comprehensive';
  onCardMatched: (cardId: string) => void;
  onSessionComplete: (stats: { correct: number; incorrect: number; total: number }) => void;
}

function extractTerm(card: Flashcard): string {
  return card.front;
}

function extractDefinition(card: Flashcard): string {
  const lines = card.back.split('\n');
  const firstLine = lines[0].trim();
  if (firstLine.length > 15) {
    return firstLine;
  }
  return lines.slice(0, 3).join('\n').trim();
}

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function FlashcardChallengeMode({
  cards,
  activeFlashcards,
  selectedDeck,
  onCardMatched,
  onSessionComplete,
}: FlashcardChallengeModeProps) {
  const BATCH_SIZE = 8;

  const challengeCards = useMemo(() => {
    const eligible = cards.filter(c => c.front.length <= 80);
    const selected = shuffleArray(eligible).slice(0, Math.min(eligible.length, BATCH_SIZE));
    const deckPrefix = selectedDeck === 'comprehensive' ? 'comp-card-' : 'card-';
    return selected.map(card => {
      const stableIndex = activeFlashcards.findIndex(
        af => af.front === card.front && af.domain === card.domain
      );
      return {
        index: stableIndex,
        card,
        cardId: `${deckPrefix}${stableIndex}`,
      } as ChallengeCard;
    }).filter(cc => cc.index >= 0);
  }, [cards, activeFlashcards, selectedDeck]);

  const [currentDefIndex, setCurrentDefIndex] = useState(0);
  const [matchedIds, setMatchedIds] = useState<Set<string>>(new Set());
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [feedbackState, setFeedbackState] = useState<{ termId: string; correct: boolean } | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [wrongTermId, setWrongTermId] = useState<string | null>(null);

  const shuffledTermOrder = useMemo(() => {
    return shuffleArray(challengeCards.map(c => c.cardId));
  }, [challengeCards]);

  const unmatchedTerms = useMemo(() => {
    return shuffledTermOrder.filter(id => !matchedIds.has(id));
  }, [shuffledTermOrder, matchedIds]);

  const matchedTerms = useMemo(() => {
    return shuffledTermOrder.filter(id => matchedIds.has(id));
  }, [shuffledTermOrder, matchedIds]);

  const currentDef = useMemo(() => {
    const unmatched = challengeCards.filter(c => !matchedIds.has(c.cardId));
    if (unmatched.length === 0) return null;
    return unmatched[currentDefIndex % unmatched.length];
  }, [challengeCards, matchedIds, currentDefIndex]);

  const getCardById = useCallback((cardId: string) => {
    return challengeCards.find(c => c.cardId === cardId);
  }, [challengeCards]);

  useEffect(() => {
    if (matchedIds.size === challengeCards.length && challengeCards.length > 0 && !isComplete) {
      setIsComplete(true);
      onSessionComplete({
        correct: matchedIds.size,
        incorrect: incorrectCount,
        total: totalAttempts,
      });
    }
  }, [matchedIds.size, challengeCards.length, incorrectCount, totalAttempts, isComplete, onSessionComplete]);

  const handleTermClick = useCallback((termId: string) => {
    if (feedbackState || !currentDef || matchedIds.has(termId)) return;

    setTotalAttempts(prev => prev + 1);

    if (termId === currentDef.cardId) {
      setFeedbackState({ termId, correct: true });
      onCardMatched(termId);

      setTimeout(() => {
        setMatchedIds(prev => {
          const next = new Set(prev);
          next.add(termId);
          return next;
        });
        setFeedbackState(null);
        setCurrentDefIndex(0);
      }, 600);
    } else {
      setIncorrectCount(prev => prev + 1);
      setFeedbackState({ termId, correct: false });
      setWrongTermId(termId);

      setTimeout(() => {
        setFeedbackState(null);
        setWrongTermId(null);
      }, 800);
    }
  }, [feedbackState, currentDef, matchedIds, onCardMatched]);

  const handleRestart = useCallback(() => {
    setCurrentDefIndex(0);
    setMatchedIds(new Set());
    setIncorrectCount(0);
    setFeedbackState(null);
    setIsComplete(false);
    setTotalAttempts(0);
    setWrongTermId(null);
  }, []);

  if (challengeCards.length < 3) {
    return (
      <Card className="p-8 text-center">
        <h3 className="text-lg font-semibold mb-2">Not Enough Cards</h3>
        <p className="text-muted-foreground">
          Challenge Mode needs at least 3 cards in the selected domain. Try selecting "All Domains" or a domain with more flashcards.
        </p>
      </Card>
    );
  }

  if (isComplete) {
    const accuracy = totalAttempts > 0 ? Math.round((challengeCards.length / totalAttempts) * 100) : 100;
    return (
      <Card className="p-8 text-center">
        <Trophy className="w-12 h-12 mx-auto mb-4 text-yellow-500" />
        <h3 className="text-2xl font-bold mb-2">Challenge Complete!</h3>
        <div className="flex justify-center gap-6 mb-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">{challengeCards.length}</p>
            <p className="text-sm text-muted-foreground">Matched</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-red-500">{incorrectCount}</p>
            <p className="text-sm text-muted-foreground">Wrong Attempts</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-foreground">{accuracy}%</p>
            <p className="text-sm text-muted-foreground">Accuracy</p>
          </div>
        </div>
        <Button onClick={handleRestart} data-testid="button-restart-challenge">
          <RotateCcw className="w-4 h-4 mr-2" />
          Play Again
        </Button>
      </Card>
    );
  }

  const progressPercent = (matchedIds.size / challengeCards.length) * 100;
  const domainConfig = currentDef ? getDomainConfig(currentDef.card.domain) : null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="text-xs">
            {matchedIds.size} / {challengeCards.length} matched
          </Badge>
          {incorrectCount > 0 && (
            <Badge variant="outline" className="text-xs text-red-500 border-red-200 dark:border-red-800">
              {incorrectCount} miss{incorrectCount !== 1 ? 'es' : ''}
            </Badge>
          )}
        </div>
        <Button variant="outline" size="sm" onClick={handleRestart} data-testid="button-reset-challenge">
          <RotateCcw className="w-3 h-3 mr-1" />
          Restart
        </Button>
      </div>

      <Progress value={progressPercent} className="h-2" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-3">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Definition</p>
          {currentDef && domainConfig && (
            <Card
              className={`p-6 min-h-[200px] flex flex-col justify-center border-t-4 ${domainConfig.borderColor} ${domainConfig.bgColor}`}
              data-testid="card-challenge-definition"
            >
              <Badge variant="outline" className={`mb-3 self-start ${domainConfig.textColor} border-transparent text-xs`}>
                {currentDef.card.domain}
              </Badge>
              <p className="text-lg leading-relaxed whitespace-pre-line text-foreground">
                {extractDefinition(currentDef.card)}
              </p>
              <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                <ArrowRight className="w-4 h-4" />
                <span>Select the matching term</span>
              </div>
            </Card>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Term Bank</p>
            <div className="flex flex-wrap gap-2 min-h-[80px] p-3 rounded-md border border-dashed border-muted-foreground/30">
              {unmatchedTerms.length === 0 ? (
                <p className="text-sm text-muted-foreground w-full text-center py-4">All terms matched!</p>
              ) : (
                unmatchedTerms.map(termId => {
                  const cc = getCardById(termId);
                  if (!cc) return null;
                  const isWrong = wrongTermId === termId && feedbackState && !feedbackState.correct;
                  const isCorrectFeedback = feedbackState?.termId === termId && feedbackState.correct;

                  return (
                    <Button
                      key={termId}
                      variant="outline"
                      size="sm"
                      onClick={() => handleTermClick(termId)}
                      disabled={!!feedbackState}
                      className={`transition-all duration-200 ${
                        isCorrectFeedback
                          ? 'bg-green-100 dark:bg-green-900/40 border-green-500 text-green-700 dark:text-green-300'
                          : isWrong
                          ? 'bg-red-100 dark:bg-red-900/40 border-red-500 text-red-700 dark:text-red-300 animate-shake'
                          : ''
                      }`}
                      data-testid={`button-term-${termId}`}
                    >
                      {isCorrectFeedback && <CheckCircle2 className="w-3 h-3 mr-1" />}
                      {isWrong && <XCircle className="w-3 h-3 mr-1" />}
                      {extractTerm(cc.card)}
                    </Button>
                  );
                })
              )}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">
              Matched ({matchedTerms.length})
            </p>
            <div className="flex flex-wrap gap-2 min-h-[80px] p-3 rounded-md border border-dashed border-green-500/30 bg-green-50/50 dark:bg-green-950/20">
              {matchedTerms.length === 0 ? (
                <p className="text-sm text-muted-foreground w-full text-center py-4">Correctly matched terms appear here</p>
              ) : (
                matchedTerms.map(termId => {
                  const cc = getCardById(termId);
                  if (!cc) return null;
                  return (
                    <Badge
                      key={termId}
                      variant="outline"
                      className="bg-green-100 dark:bg-green-900/40 border-green-300 dark:border-green-700 text-green-800 dark:text-green-200"
                      data-testid={`badge-matched-${termId}`}
                    >
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      {extractTerm(cc.card)}
                    </Badge>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
