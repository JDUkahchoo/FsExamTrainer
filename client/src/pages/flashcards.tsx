import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { RotateCcw, Shuffle, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { getDomainConfig } from '@/lib/domains';
import { FLASHCARDS } from '@shared/data/flashcards';
import { getFlashcardMastery, saveFlashcardMastery } from '@/lib/localStorage';
import { DOMAINS } from '@shared/schema';
import type { Domain } from '@shared/schema';

export default function FlashcardsPage() {
  const [selectedDomain, setSelectedDomain] = useState<Domain | 'all'>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredCards, setMasteredCards] = useState<Set<number>>(() => getFlashcardMastery());
  const [shuffledIndices, setShuffledIndices] = useState<number[]>([]);

  // Save mastered cards to localStorage
  useEffect(() => {
    saveFlashcardMastery(masteredCards);
  }, [masteredCards]);

  const filteredCards = selectedDomain === 'all'
    ? FLASHCARDS
    : FLASHCARDS.filter(card => card.domain === selectedDomain);

  useEffect(() => {
    setShuffledIndices(filteredCards.map((_, i) => i));
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [selectedDomain, filteredCards.length]);

  const currentCard = filteredCards[shuffledIndices[currentIndex]];
  const totalCards = filteredCards.length;
  const masteredCount = Array.from(masteredCards).filter(i => 
    shuffledIndices.includes(i) && filteredCards[shuffledIndices.indexOf(i)]
  ).length;

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
    setMasteredCards(prev => {
      const next = new Set(prev);
      if (next.has(cardIndex)) {
        next.delete(cardIndex);
      } else {
        next.add(cardIndex);
      }
      return next;
    });
  };

  const handleReset = () => {
    const newMastered = new Set<number>();
    setMasteredCards(newMastered);
    saveFlashcardMastery(newMastered);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const domainConfig = getDomainConfig(currentCard.domain);
  const Icon = domainConfig.icon;
  const isMastered = masteredCards.has(shuffledIndices[currentIndex]);
  const progress = totalCards > 0 ? ((currentIndex + 1) / totalCards) * 100 : 0;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-4" data-testid="heading-flashcards">Flashcards</h1>
        <div className="flex flex-wrap items-center gap-4 mb-4">
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
