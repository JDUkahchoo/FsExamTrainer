import { useState, useEffect, useRef, useCallback } from 'react';
import { useSearch } from 'wouter';
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
import { FlashcardModeSelector, type FlashcardMode } from '@/components/flashcard-mode-selector';
import { TriadDrillCard } from '@/components/triad-drill-card';
import { FeynmanModeCard } from '@/components/feynman-mode-card';
import { MnemonicBuilderCard } from '@/components/mnemonic-builder-card';
import { useToast } from '@/hooks/use-toast';

type FlashcardDeck = 'original' | 'comprehensive';

interface SessionStats {
  cardsReviewed: number;
  masteryRatings: number[];
  domainsReviewed: Record<string, number>;
  startTime: number;
}

export default function FlashcardsPage() {
  const searchString = useSearch();
  const urlParams = new URLSearchParams(searchString);
  const domainsFromUrl = urlParams.get('domains');
  
  const [selectedDeck, setSelectedDeck] = useState<FlashcardDeck>('comprehensive');
  const [selectedDomain, setSelectedDomain] = useState<Domain | 'all'>('all');
  const [selectedDomains, setSelectedDomains] = useState<Domain[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [shuffledIndices, setShuffledIndices] = useState<number[]>([]);
  const [studyMode, setStudyMode] = useState<FlashcardMode>('quick');
  const { logActivity } = useActivityLogger();
  const { toast } = useToast();

  // Session tracking state
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const sessionStatsRef = useRef<SessionStats>({
    cardsReviewed: 0,
    masteryRatings: [],
    domainsReviewed: {},
    startTime: Date.now()
  });

  // Start session mutation
  const startSessionMutation = useMutation({
    mutationFn: () => apiRequest('POST', '/api/flashcards/sessions/start'),
    onSuccess: (data: any) => {
      setCurrentSessionId(data.id);
      sessionStatsRef.current = {
        cardsReviewed: 0,
        masteryRatings: [],
        domainsReviewed: {},
        startTime: Date.now()
      };
    }
  });

  // Complete session mutation
  const completeSessionMutation = useMutation({
    mutationFn: (sessionId: string) => {
      const stats = sessionStatsRef.current;
      const avgMastery = stats.masteryRatings.length > 0
        ? stats.masteryRatings.reduce((a, b) => a + b, 0) / stats.masteryRatings.length
        : 0;
      const timeSpent = Math.floor((Date.now() - stats.startTime) / 1000);
      
      return apiRequest('POST', `/api/flashcards/sessions/${sessionId}/complete`, {
        cardsReviewed: stats.cardsReviewed,
        avgMasteryRating: avgMastery,
        domainBreakdown: stats.domainsReviewed,
        timeSpentSeconds: timeSpent
      });
    },
    onSuccess: (data: any) => {
      setCurrentSessionId(null);
      queryClient.invalidateQueries({ queryKey: ['/api/flashcards/sessions'] });
      queryClient.invalidateQueries({ queryKey: ['/api/flashcards/sessions/today'] });
      queryClient.invalidateQueries({ queryKey: ['/api/xp'] });
      queryClient.invalidateQueries({ queryKey: ['/api/auth/user'] });
      
      if (data.xpAwarded) {
        toast({
          title: "Session Complete!",
          description: `You earned ${data.xpAmount} XP for this review session.`,
        });
      }
    }
  });

  // Start session when entering Quick Review mode
  useEffect(() => {
    if (studyMode === 'quick' && !currentSessionId && !startSessionMutation.isPending) {
      startSessionMutation.mutate();
    }
  }, [studyMode]);

  // Complete session when leaving page or changing modes
  const completeCurrentSession = useCallback(() => {
    if (currentSessionId && sessionStatsRef.current.cardsReviewed > 0) {
      completeSessionMutation.mutate(currentSessionId);
    }
  }, [currentSessionId]);

  useEffect(() => {
    // Handle mode change - complete session when leaving quick review
    if (studyMode !== 'quick' && currentSessionId) {
      completeCurrentSession();
    }
  }, [studyMode, currentSessionId, completeCurrentSession]);

  // Complete session on page unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (currentSessionId && sessionStatsRef.current.cardsReviewed > 0) {
        // Use sendBeacon for reliable completion on page close
        const stats = sessionStatsRef.current;
        const avgMastery = stats.masteryRatings.length > 0
          ? stats.masteryRatings.reduce((a, b) => a + b, 0) / stats.masteryRatings.length
          : 0;
        const timeSpent = Math.floor((Date.now() - stats.startTime) / 1000);
        
        navigator.sendBeacon(
          `/api/flashcards/sessions/${currentSessionId}/complete`,
          JSON.stringify({
            cardsReviewed: stats.cardsReviewed,
            avgMasteryRating: avgMastery,
            domainBreakdown: stats.domainsReviewed,
            timeSpentSeconds: timeSpent
          })
        );
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      // Also complete session on component unmount
      if (currentSessionId && sessionStatsRef.current.cardsReviewed > 0) {
        completeCurrentSession();
      }
    };
  }, [currentSessionId, completeCurrentSession]);

  const { data: masteryData } = useQuery<FlashcardMastery[]>({
    queryKey: ['/api/flashcards/mastery']
  });

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

  const masteredCards = new Set((masteryData || []).filter(m => m.masteryLevel >= 4).map(m => m.flashcardId));

  useEffect(() => {
    if (domainsFromUrl) {
      const domains = domainsFromUrl.split(',').filter(d => DOMAINS.includes(d as Domain)) as Domain[];
      if (domains.length > 0) {
        setSelectedDomains(domains);
        if (domains.length === 1) {
          setSelectedDomain(domains[0]);
        }
      }
    }
  }, [domainsFromUrl]);

  const activeFlashcards = selectedDeck === 'comprehensive' ? COMPREHENSIVE_FLASHCARDS : FLASHCARDS;

  const filteredCards = selectedDomains.length > 0
    ? activeFlashcards.filter(card => selectedDomains.includes(card.domain as Domain))
    : selectedDomain === 'all'
      ? activeFlashcards
      : activeFlashcards.filter(card => card.domain === selectedDomain);

  useEffect(() => {
    setShuffledIndices(filteredCards.map((_, i) => i));
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [selectedDomain, selectedDomains.length, selectedDeck, filteredCards.length]);

  const currentCard = filteredCards[shuffledIndices[currentIndex]];
  const totalCards = filteredCards.length;
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
    const stableIndex = activeFlashcards.indexOf(card);
    const deckPrefix = selectedDeck === 'comprehensive' ? 'comp-card-' : 'card-';
    const cardId = `${deckPrefix}${stableIndex}`;
    const wasMastered = masteredCards.has(cardId);
    const newMasteryLevel = wasMastered ? 2 : 5;
    
    // Track session stats
    if (currentSessionId) {
      sessionStatsRef.current.cardsReviewed += 1;
      sessionStatsRef.current.masteryRatings.push(newMasteryLevel);
      const domain = card.domain;
      sessionStatsRef.current.domainsReviewed[domain] = 
        (sessionStatsRef.current.domainsReviewed[domain] || 0) + 1;
    }
    
    saveMasteryMutation.mutate({
      flashcardId: cardId,
      masteryLevel: newMasteryLevel,
      lastReviewed: new Date()
    });
  };

  const handleReset = async () => {
    try {
      await apiRequest('DELETE', '/api/flashcards/mastery');
      queryClient.invalidateQueries({ queryKey: ['/api/flashcards/mastery'] });
      queryClient.invalidateQueries({ queryKey: ['/api/flashcards/stats'] });
      queryClient.invalidateQueries({ queryKey: ['/api/progress/stats'] });
      queryClient.invalidateQueries({ queryKey: ['/api/progress/overall'] });
      setCurrentIndex(0);
      setIsFlipped(false);
    } catch (error) {
      console.error('Failed to reset flashcard mastery:', error);
    }
  };

  const domainConfig = getDomainConfig(currentCard.domain);
  const Icon = domainConfig.icon;
  const stableIndex = activeFlashcards.indexOf(currentCard);
  const deckPrefix = selectedDeck === 'comprehensive' ? 'comp-card-' : 'card-';
  const currentCardId = `${deckPrefix}${stableIndex}`;
  const isMastered = masteredCards.has(currentCardId);
  const progress = totalCards > 0 ? ((currentIndex + 1) / totalCards) * 100 : 0;

  const renderQuickReviewMode = () => (
    <>
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
    </>
  );

  const renderEnhancedMode = () => {
    const handleModeComplete = () => {
      if (currentIndex < totalCards - 1) {
        setCurrentIndex(currentIndex + 1);
        setIsFlipped(false);
      }
    };

    return (
      <div className="mb-6">
        {studyMode === 'triad' && (
          <TriadDrillCard
            card={currentCard}
            cardId={currentCardId}
            onComplete={handleModeComplete}
          />
        )}
        {studyMode === 'feynman' && (
          <FeynmanModeCard
            card={currentCard}
            cardId={currentCardId}
            onComplete={handleModeComplete}
          />
        )}
        {studyMode === 'mnemonic' && (
          <MnemonicBuilderCard
            card={currentCard}
            cardId={currentCardId}
            onComplete={handleModeComplete}
          />
        )}

        <div className="flex items-center justify-between mt-4">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            data-testid="button-previous-enhanced"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          
          <span className="text-sm text-muted-foreground">
            Card {currentIndex + 1} of {totalCards}
          </span>

          <Button
            onClick={handleNext}
            disabled={currentIndex === totalCards - 1}
            data-testid="button-next-enhanced"
          >
            Skip
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-4" data-testid="heading-flashcards">Flashcards</h1>
        
        <div className="mb-4">
          <FlashcardModeSelector mode={studyMode} onModeChange={setStudyMode} />
        </div>

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

          <Select value={selectedDomain} onValueChange={(value) => {
            setSelectedDomain(value as Domain | 'all');
            setSelectedDomains([]);
          }}>
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

          {selectedDomains.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-muted-foreground">Study Plan Filter:</span>
              {selectedDomains.map(domain => {
                const config = getDomainConfig(domain);
                return (
                  <Badge key={domain} variant="outline" className={`${config.bgColor} ${config.textColor} border-transparent text-xs`}>
                    {domain}
                  </Badge>
                );
              })}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedDomains([]);
                  setSelectedDomain('all');
                }}
                className="text-xs"
                data-testid="button-clear-domains"
              >
                <RotateCcw className="w-3 h-3 mr-1" />
                Clear
              </Button>
            </div>
          )}

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

      {studyMode === 'quick' ? renderQuickReviewMode() : renderEnhancedMode()}
    </div>
  );
}
