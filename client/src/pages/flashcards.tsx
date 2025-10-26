import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { RotateCcw, Shuffle, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { getDomainConfig } from '@/lib/domains';
import { FLASHCARDS } from '@shared/data/flashcards';
import { COMPREHENSIVE_FLASHCARDS } from '@shared/data/flashcardsComprehensive';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useActivityLogger } from '@/hooks/use-activity-logger';
import { DOMAINS } from '@shared/schema';
import type { Domain, FlashcardMastery } from '@shared/schema';

type FlashcardDeck = 'original' | 'comprehensive';

export default function FlashcardsPage() {
  const [selectedDeck, setSelectedDeck] = useState<FlashcardDeck>('comprehensive');
  const [selectedDomain, setSelectedDomain] = useState<Domain | 'all'>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [shuffledIndices, setShuffledIndices] = useState<number[]>([]);
  const { logActivity } = useActivityLogger();

  // Fetch flashcard mastery from database
  const { data: masteryData } = useQuery<FlashcardMastery[]>({
    queryKey: ['/api/flashcards/mastery']
  });

  // Mutation to save flashcard mastery
  const saveMasteryMutation = useMutation({
    mutationFn: (mastery: { flashcardId: string; masteryLevel: number; lastReviewed: Date }) =>
      apiRequest('POST', '/api/flashcards/mastery', mastery),
    onSuccess: () => {
      logActivity('flashcard_review');
      queryClient.invalidateQueries({ queryKey: ['/api/flashcards/mastery'] });
      queryClient.invalidateQueries({ queryKey: ['/api/flashcards/stats'] });
      queryClient.invalidateQueries({ queryKey: ['/api/progress/stats'] });
      queryClient.invalidateQueries({ queryKey: ['/api/progress/overall'] });
    }
  });

  // Convert database mastery to Set
  const masteredCards = new Set((masteryData || []).filter(m => m.masteryLevel >= 4).map(m => m.flashcardId));

  // Select the active deck
  const activeFlashcards = selectedDeck === 'comprehensive' ? COMPREHENSIVE_FLASHCARDS : FLASHCARDS;

  const filteredCards = selectedDomain === 'all'
    ? activeFlashcards
    : activeFlashcards.filter(card => card.domain === selectedDomain);

  useEffect(() => {
    setShuffledIndices(filteredCards.map((_, i) => i));
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [selectedDomain, selectedDeck, filteredCards.length]);

  const currentCard = filteredCards[shuffledIndices[currentIndex]];
  const totalCards = filteredCards.length;
  // Count how many of the currently filtered cards are mastered
  const masteredCount = filteredCards.filter(card => {
    const stableIndex = activeFlashcards.indexOf(card);
    const deckPrefix = selectedDeck === 'comprehensive' ? 'comp-card-' : 'card-';
    const cardId = `${deckPrefix}${stableIndex}`;
    return masteredCards.has(cardId);
  }).length;

  if (!currentCard) {
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <Card className="p-12 text-center">
          <h2 className="text-2xl font-bold mb-4">No Flashcards Available</h2>
          <p className="text-muted-foreground mb-6">
            Please select a different domain or check back later.
          </p>
        </Card>
      </div>
    );
  }

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    if (currentIndex < totalCards - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleShuffle = () => {
    const indices = filteredCards.map((_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    setShuffledIndices(indices);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const handleToggleMastered = () => {
    const cardIndex = shuffledIndices[currentIndex];
    const card = filteredCards[cardIndex];
    // Use stable ID based on position in active deck array
    const stableIndex = activeFlashcards.indexOf(card);
    const deckPrefix = selectedDeck === 'comprehensive' ? 'comp-card-' : 'card-';
    const cardId = `${deckPrefix}${stableIndex}`;
    const wasMastered = masteredCards.has(cardId);
    const newMasteryLevel = wasMastered ? 2 : 5; // 5 = mastered, 2 = reviewed but not mastered
    
    saveMasteryMutation.mutate({
      flashcardId: cardId,
      masteryLevel: newMasteryLevel,
      lastReviewed: new Date()
    });
  };

  const handleReset = async () => {
    // Delete all flashcard mastery
    await apiRequest('DELETE', '/api/flashcards/mastery', {});
    queryClient.invalidateQueries({ queryKey: ['/api/flashcards/mastery'] });
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const domainConfig = getDomainConfig(currentCard.domain);
  const Icon = domainConfig.icon;
  // Use stable ID based on position in active deck array
  const stableIndex = activeFlashcards.indexOf(currentCard);
  const deckPrefix = selectedDeck === 'comprehensive' ? 'comp-card-' : 'card-';
  const currentCardId = `${deckPrefix}${stableIndex}`;
  const isMastered = masteredCards.has(currentCardId);
  const progress = totalCards > 0 ? ((currentIndex + 1) / totalCards) * 100 : 0;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-4" data-testid="heading-flashcards">Flashcards</h1>
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <Select value={selectedDeck} onValueChange={(value) => setSelectedDeck(value as FlashcardDeck)}>
            <SelectTrigger className="w-64" data-testid="select-deck">
              <SelectValue placeholder="Select deck" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="comprehensive">Comprehensive (350 cards)</SelectItem>
              <SelectItem value="original">Original (50 cards)</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedDomain} onValueChange={(value) => setSelectedDomain(value as Domain | 'all')}>
            <SelectTrigger className="w-64" data-testid="select-domain">
              <SelectValue placeholder="Select domain" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Domains</SelectItem>
              {DOMAINS.map(domain => (
                <SelectItem key={domain} value={domain}>{domain}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex gap-4 text-sm text-muted-foreground">
            <span>Card {currentIndex + 1} of {totalCards}</span>
            <span>Mastered: {masteredCount}/{totalCards}</span>
          </div>

          <div className="ml-auto flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleShuffle}
              data-testid="button-shuffle"
            >
              <Shuffle className="w-4 h-4 mr-2" />
              Shuffle
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              data-testid="button-reset"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>
        
        <Progress value={progress} className="h-2" />
      </div>

      <div className="relative mb-6" style={{ perspective: '1000px' }}>
        <div
          onClick={handleFlip}
          className={`relative w-full cursor-pointer transition-transform duration-600`}
          style={{
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            minHeight: '400px'
          }}
          data-testid="card-flashcard"
        >
          {/* Front of card */}
          <Card
            className={`absolute inset-0 p-8 flex flex-col justify-center items-center text-center ${domainConfig.bgColor} border-t-4 ${domainConfig.borderColor}`}
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden'
            }}
          >
            <Badge variant="outline" className={`mb-6 ${domainConfig.textColor} border-transparent`}>
              <Icon className="w-3 h-3 mr-1" />
              {currentCard.domain}
            </Badge>
            <p className="text-2xl font-semibold text-foreground leading-relaxed whitespace-pre-line">
              {currentCard.front}
            </p>
            <p className="text-sm text-muted-foreground mt-8">Click to flip</p>
          </Card>

          {/* Back of card */}
          <Card
            className="absolute inset-0 p-8 flex flex-col justify-center items-center text-center bg-card border-t-4 border-primary"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)'
            }}
          >
            <p className="text-lg text-foreground leading-relaxed whitespace-pre-line font-mono">
              {currentCard.back}
            </p>
            <p className="text-sm text-muted-foreground mt-8">Click to flip back</p>
          </Card>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          data-testid="button-previous"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>

        <Button
          variant={isMastered ? 'default' : 'outline'}
          onClick={handleToggleMastered}
          className="flex-1"
          data-testid="button-mastered"
        >
          <Star className={`w-4 h-4 mr-2 ${isMastered ? 'fill-current' : ''}`} />
          {isMastered ? 'Mastered' : 'Mark as Mastered'}
        </Button>

        <Button
          onClick={handleNext}
          disabled={currentIndex === totalCards - 1}
          data-testid="button-next"
        >
          Next
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      <Card className="p-4 bg-muted">
        <p className="text-sm text-muted-foreground text-center">
          <strong>Tip:</strong> Review mastered cards periodically using spaced repetition for better retention.
          Categories: {currentCard.category}
        </p>
      </Card>
    </div>
  );
}
