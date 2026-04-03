import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useSearch } from 'wouter';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle2, XCircle, RotateCcw, Lightbulb, Clock, Play, Trophy, Construction } from 'lucide-react';
import { getDomainConfig } from '@/lib/domains';
import { QUIZ_QUESTIONS } from '@shared/data/quizQuestions';
import { useMutation, useQuery } from '@tanstack/react-query';
import { apiRequest, queryClient, suppressSessionExpiredRedirect, enableSessionExpiredRedirect } from '@/lib/queryClient';
import { useActivityLogger } from '@/hooks/use-activity-logger';
import { DOMAINS, FS_DOMAINS, PS_DOMAINS } from '@shared/schema';
import type { Domain, QuizDraft } from '@shared/schema';
import { useExamTrack } from '@/contexts/exam-track-context';
import { shuffleQuestionOptions, type ShuffledQuestion } from '@/lib/shuffleOptions';
import { ProblemSolvingLoop } from '@/components/problem-solving-loop';
import { getVariedQuizQuestions, getSessionSeed, incrementDailySessionCount } from '@shared/data/quizVariationSystem';

type QuizState = 'setup' | 'active' | 'completed';

export default function PracticeQuizPage() {
  const searchString = useSearch();
  const urlParams = new URLSearchParams(searchString);
  const domainsFromUrl = urlParams.get('domains');
  const { examTrack, examName, domains: examDomains } = useExamTrack();
  
  // Get appropriate domains based on exam track
  const availableDomains = examTrack === 'ps' ? PS_DOMAINS : FS_DOMAINS;
  
  const ACTIVE_SESSION_KEY = `quiz-active-session-${examTrack}`;
  
  const getActiveSession = (): string | null => {
    try { return sessionStorage.getItem(ACTIVE_SESSION_KEY); } catch { return null; }
  };
  const setActiveSession = (id: string) => {
    try { sessionStorage.setItem(ACTIVE_SESSION_KEY, id); } catch {}
  };
  const clearActiveSession = () => {
    try { sessionStorage.removeItem(ACTIVE_SESSION_KEY); } catch {}
  };

  const [quizState, setQuizState] = useState<QuizState>('setup');
  const [selectedDomain, setSelectedDomain] = useState<Domain | 'all'>('all');
  const [selectedDomains, setSelectedDomains] = useState<Domain[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<Record<number, { selected: number; correct: boolean }>>({});
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [quizQuestions, setQuizQuestions] = useState<Array<typeof QUIZ_QUESTIONS[0] & { id: string }>>([]);
  const [shuffledOptionsMap, setShuffledOptionsMap] = useState<Record<number, { options: string[]; correctIndex: number }>>({});
  const [showResumeDialog, setShowResumeDialog] = useState(false);
  const [quizSessionId, setQuizSessionId] = useState<string | null>(null);
  const [shuffleSeedBase, setShuffleSeedBase] = useState<number>(0);
  const { logActivity } = useActivityLogger();
  const resumeInProgressRef = useRef(false);
  // Refs for pause-aware elapsed time (tab visibility tracking)
  const hiddenSinceRef = useRef<number | null>(null);
  const accumulatedHiddenMsRef = useRef<number>(0);
  const [draftSaveWarning, setDraftSaveWarning] = useState(false);
  // Auth-expiry: true when a quiz API call returns 401 mid-session
  const [authExpired, setAuthExpired] = useState(false);

  const { data: draftData, isLoading: isDraftLoading } = useQuery<QuizDraft | null>({
    queryKey: ['/api/quiz/draft', examTrack],
    queryFn: async () => {
      const response = await fetch(`/api/quiz/draft?examTrack=${examTrack}`);
      if (!response.ok) return null;
      return response.json();
    },
    enabled: quizState === 'setup',
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });

  // Helper: determine whether a mutation error was caused by an expired session
  const handleMutationError = (err: unknown, isAuthSensitive = true) => {
    const msg = err instanceof Error ? err.message : String(err);
    if (isAuthSensitive && msg.startsWith('401')) {
      setAuthExpired(true);
    } else {
      setDraftSaveWarning(true);
    }
  };

  const saveDraftMutation = useMutation({
    mutationFn: (draft: { domain: string; examTrack: string; sessionId: string; questionIds: string[]; currentQuestionIndex: number; userAnswers: Record<number, number>; timeSpentSeconds: number; shuffleSeed: number }) =>
      apiRequest('POST', '/api/quiz/draft', draft),
    retry: 2,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 8000),
    onSuccess: () => setDraftSaveWarning(false),
    onError: (err) => handleMutationError(err),
  });

  const deleteDraftMutation = useMutation({
    mutationFn: () => apiRequest('DELETE', `/api/quiz/draft?examTrack=${examTrack}`, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/quiz/draft', examTrack] });
    },
    onError: (err) => handleMutationError(err),
  });

  // Mutation to save individual quiz result (for stats/analytics) with retry
  const saveResultMutation = useMutation({
    mutationFn: (result: { questionId: string; domain: string; selectedAnswer: number; isCorrect: boolean }) =>
      apiRequest('POST', '/api/quiz/results', result),
    retry: 2,
    retryDelay: 1000,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/quiz/results'] });
      queryClient.invalidateQueries({ queryKey: ['/api/quiz/stats'] });
      queryClient.invalidateQueries({ queryKey: ['/api/progress/domain-mastery'] });
    },
    onError: (err) => handleMutationError(err),
  });

  useEffect(() => {
    if (!draftData || quizState !== 'setup' || isDraftLoading || resumeInProgressRef.current) return;
    
    const activeId = getActiveSession();
    if (activeId && draftData.sessionId === activeId) {
      resumeInProgressRef.current = true;
      handleResumeDraft();
    } else {
      if (activeId) clearActiveSession();
      setShowResumeDialog(true);
    }
  }, [draftData, quizState, isDraftLoading]);

  // While the quiz is active, suppress the global auth-expiry redirect so we can
  // show our own in-quiz re-auth prompt without losing the user's answers.
  useEffect(() => {
    if (quizState === 'active') {
      suppressSessionExpiredRedirect();
    } else {
      enableSessionExpiredRedirect();
    }
    return () => enableSessionExpiredRedirect();
  }, [quizState]);

  // Pause-aware timer: track time spent with tab hidden so elapsed = active time only
  useEffect(() => {
    if (quizState !== 'active') return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        hiddenSinceRef.current = Date.now();
      } else if (hiddenSinceRef.current !== null) {
        accumulatedHiddenMsRef.current += Date.now() - hiddenSinceRef.current;
        hiddenSinceRef.current = null;
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [quizState]);

  // Timer effect: counts only active (non-hidden) time
  useEffect(() => {
    if (quizState !== 'active' || !startTime) return;

    const interval = setInterval(() => {
      const hiddenNow = hiddenSinceRef.current !== null
        ? Date.now() - hiddenSinceRef.current
        : 0;
      const activeMs = Date.now() - startTime - accumulatedHiddenMsRef.current - hiddenNow;
      setElapsedSeconds(Math.max(0, Math.floor(activeMs / 1000)));
    }, 1000);

    return () => clearInterval(interval);
  }, [quizState, startTime]);

  // Initialize domains from URL parameters
  useEffect(() => {
    if (domainsFromUrl && quizState === 'setup') {
      const domains = domainsFromUrl.split(',').filter(d => (availableDomains as readonly string[]).includes(d)) as Domain[];
      if (domains.length > 0) {
        setSelectedDomains(domains);
        if (domains.length === 1) {
          setSelectedDomain(domains[0]);
        } else {
          setSelectedDomain('all');
        }
      }
    }
  }, [domainsFromUrl, quizState]);

  const saveDraft = (indexOverride?: number) => {
    if (quizState === 'active' && quizQuestions.length > 0 && quizSessionId) {
      const userAnswers: Record<number, number> = {};
      Object.entries(answeredQuestions).forEach(([index, answer]) => {
        userAnswers[parseInt(index)] = answer.selected;
      });

      saveDraftMutation.mutate({
        domain: selectedDomain,
        examTrack,
        sessionId: quizSessionId,
        questionIds: quizQuestions.map(q => q.id),
        currentQuestionIndex: indexOverride !== undefined ? indexOverride : currentQuestionIndex,
        userAnswers,
        timeSpentSeconds: elapsedSeconds,
        shuffleSeed: shuffleSeedBase
      });
    }
  };

  // Shuffle array helper
  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const totalQuestions = quizQuestions.length;
  const answeredCount = Object.keys(answeredQuestions).length;
  const correctCount = Object.values(answeredQuestions).filter(a => a.correct).length;

  // Mutation to save quiz session with retry on auth failure
  const saveSessionMutation = useMutation({
    mutationFn: (session: { domain: string; examTrack: string; totalQuestions: number; correctAnswers: number; timeSpentSeconds: number }) =>
      apiRequest('POST', '/api/quiz/sessions', session),
    retry: 2,
    retryDelay: 1000,
    onSuccess: () => {
      logActivity('quiz_completion');
      queryClient.invalidateQueries({ queryKey: ['/api/quiz/sessions'] });
      queryClient.invalidateQueries({ queryKey: ['/api/quiz/stats'] });
      queryClient.invalidateQueries({ queryKey: ['/api/progress/stats'] });
      queryClient.invalidateQueries({ queryKey: ['/api/progress/overall'] });
      queryClient.invalidateQueries({ queryKey: ['/api/progress/domain-mastery'] });
      queryClient.invalidateQueries({ predicate: (query) => 
        Array.isArray(query.queryKey) && query.queryKey[0] === '/api/daily-quests'
      });
    },
    onError: (err) => handleMutationError(err),
  });

  const handleResumeDraft = () => {
    if (!draftData) return;

    // Create a map of ID -> question from original array for efficient lookup
    const questionMap = new Map(
      QUIZ_QUESTIONS.map((q, i) => [`quiz-${i}`, q])
    );

    // Reconstruct quiz questions from stable question IDs
    const reconstructedQuestions = draftData.questionIds.map(id => {
      const question = questionMap.get(id);
      if (!question) {
        console.error(`Question ${id} not found in QUIZ_QUESTIONS`);
        return null;
      }
      return { ...question, id };
    }).filter(Boolean) as Array<typeof QUIZ_QUESTIONS[0] & { id: string }>;

    // Use the saved shuffle seed from the draft to reproduce the exact same option ordering
    const savedSeed = draftData.shuffleSeed || 0;
    setShuffleSeedBase(savedSeed);
    const shuffledMap: Record<number, { options: string[]; correctIndex: number }> = {};
    reconstructedQuestions.forEach((q, index) => {
      const shuffled = shuffleQuestionOptions(q, savedSeed + index);
      shuffledMap[index] = {
        options: shuffled.shuffledOptions,
        correctIndex: shuffled.shuffledCorrectIndex
      };
    });

    // Reconstruct answered questions using shuffled correct indices
    const reconstructedAnswers: Record<number, { selected: number; correct: boolean }> = {};
    Object.entries(draftData.userAnswers as Record<string, number>).forEach(([indexStr, selectedAnswer]) => {
      const index = parseInt(indexStr);
      const question = reconstructedQuestions[index];
      const shuffledData = shuffledMap[index];
      if (question && shuffledData) {
        reconstructedAnswers[index] = {
          selected: selectedAnswer,
          correct: selectedAnswer === shuffledData.correctIndex
        };
      }
    });

    // Restore state
    setShuffledOptionsMap(shuffledMap);
    setQuizQuestions(reconstructedQuestions);
    setSelectedDomain(draftData.domain as Domain | 'all');
    setCurrentQuestionIndex(draftData.currentQuestionIndex);
    setAnsweredQuestions(reconstructedAnswers);
    setElapsedSeconds(draftData.timeSpentSeconds);
    
    // Check if current question was already answered
    const currentAnswer = reconstructedAnswers[draftData.currentQuestionIndex];
    if (currentAnswer) {
      setSelectedAnswer(currentAnswer.selected);
      setShowExplanation(true);
    } else {
      setSelectedAnswer(null);
      setShowExplanation(false);
    }

    // Reset pause-tracking refs for the resumed session
    hiddenSinceRef.current = null;
    accumulatedHiddenMsRef.current = 0;
    setDraftSaveWarning(false);

    const resumedSessionId = draftData.sessionId || crypto.randomUUID();
    setQuizSessionId(resumedSessionId);
    setActiveSession(resumedSessionId);
    setStartTime(Date.now() - (draftData.timeSpentSeconds * 1000));
    setQuizState('active');
    setShowResumeDialog(false);

    deleteDraftMutation.mutate();
  };

  const handleStartFresh = () => {
    // Delete the draft
    deleteDraftMutation.mutate();
    setShowResumeDialog(false);
  };

  const handleStartQuiz = () => {
    // Prepare quiz questions based on selected domain(s)
    let questionsForQuiz: typeof QUIZ_QUESTIONS;
    
    // Filter questions to only those matching current exam track domains
    const examQuestions = QUIZ_QUESTIONS.filter(q => 
      (availableDomains as readonly string[]).includes(q.domain)
    );
    
    if (selectedDomains.length > 0) {
      // Multi-domain mode from URL: filter by selected domains
      const filtered = examQuestions.filter(q => selectedDomains.includes(q.domain as Domain));
      questionsForQuiz = shuffleArray(filtered).slice(0, Math.min(50, filtered.length));
    } else if (selectedDomain === 'all') {
      // Mixed exam mode: randomly select 50 questions from all exam-specific domains and shuffle
      const shuffled = shuffleArray(examQuestions);
      questionsForQuiz = shuffled.slice(0, Math.min(50, shuffled.length));
    } else {
      // Domain-specific practice: randomly select up to 20 questions, rotating each session
      const filtered = examQuestions.filter(q => q.domain === selectedDomain);
      questionsForQuiz = shuffleArray(filtered).slice(0, Math.min(20, filtered.length));
    }
    
    const questionsWithIds = questionsForQuiz.map(q => ({
      ...q,
      id: `quiz-${QUIZ_QUESTIONS.indexOf(q)}`
    }));
    
    // Increment the within-day counter so this session gets a unique variation
    incrementDailySessionCount();
    const sessionSeed = getSessionSeed();
    const variedQuestions = getVariedQuizQuestions(questionsWithIds, sessionSeed);
    
    const shuffledMap: Record<number, { options: string[]; correctIndex: number }> = {};
    const seedBase = Date.now();
    setShuffleSeedBase(seedBase);
    variedQuestions.forEach((q, index) => {
      const shuffled = shuffleQuestionOptions(q, seedBase + index);
      shuffledMap[index] = {
        options: shuffled.shuffledOptions,
        correctIndex: shuffled.shuffledCorrectIndex
      };
    });
    
    // Reset pause-tracking refs for this new session
    hiddenSinceRef.current = null;
    accumulatedHiddenMsRef.current = 0;
    setDraftSaveWarning(false);

    const newSessionId = crypto.randomUUID();
    setQuizSessionId(newSessionId);
    setActiveSession(newSessionId);
    setShuffledOptionsMap(shuffledMap);
    setQuizQuestions(variedQuestions);
    setQuizState('active');
    setStartTime(Date.now());
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setAnsweredQuestions({});
    setElapsedSeconds(0);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showExplanation) return;
    setSelectedAnswer(answerIndex);
    // Auto-save draft when user selects an answer
    setTimeout(() => saveDraft(), 100);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    
    // Prevent duplicate submissions for already answered questions
    if (answeredQuestions[currentQuestionIndex]) {
      return;
    }
    
    // Use shuffled correct index for comparison
    const shuffledData = shuffledOptionsMap[currentQuestionIndex];
    const correctIndex = shuffledData?.correctIndex ?? currentQuestion.correctAnswer;
    const isCorrect = selectedAnswer === correctIndex;
    setAnsweredQuestions({
      ...answeredQuestions,
      [currentQuestionIndex]: { selected: selectedAnswer, correct: isCorrect }
    });
    setShowExplanation(true);

    // Save individual question result for stats/analytics (only once per question)
    saveResultMutation.mutate({
      questionId: `q-${currentQuestionIndex}-${Date.now()}`,
      domain: currentQuestion.domain,
      selectedAnswer,
      isCorrect
    });
  };

  const handleNext = () => {
    if (selectedAnswer !== null && !answeredQuestions[currentQuestionIndex]) {
      handleSubmit();
    }
    
    if (currentQuestionIndex < totalQuestions - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      const existingAnswer = answeredQuestions[nextIndex];
      if (existingAnswer) {
        setSelectedAnswer(existingAnswer.selected);
        setShowExplanation(true);
      } else {
        setSelectedAnswer(null);
        setShowExplanation(false);
      }
      
      setTimeout(() => saveDraft(nextIndex), 100);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      const prevIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(prevIndex);
      const existingAnswer = answeredQuestions[prevIndex];
      if (existingAnswer) {
        setSelectedAnswer(existingAnswer.selected);
        setShowExplanation(true);
      } else {
        setSelectedAnswer(null);
        setShowExplanation(false);
      }
    }
  };

  const handleFinishQuiz = () => {
    // Auto-submit current answer if one is selected but not yet submitted
    if (selectedAnswer !== null && !answeredQuestions[currentQuestionIndex]) {
      handleSubmit();
    }
    
    // Calculate final counts (need to account for potentially just-submitted answer)
    const finalAnsweredCount = selectedAnswer !== null && !answeredQuestions[currentQuestionIndex] 
      ? Object.keys(answeredQuestions).length + 1 
      : Object.keys(answeredQuestions).length;
    
    // Use shuffled correct index for final calculation
    const currentShuffledData = shuffledOptionsMap[currentQuestionIndex];
    const currentCorrectIndex = currentShuffledData?.correctIndex ?? currentQuestion?.correctAnswer;
    const finalCorrectCount = selectedAnswer !== null && !answeredQuestions[currentQuestionIndex]
      ? (selectedAnswer === currentCorrectIndex ? correctCount + 1 : correctCount)
      : correctCount;
    
    clearActiveSession();
    deleteDraftMutation.mutate();
    
    // Save the complete quiz session
    saveSessionMutation.mutate({
      domain: selectedDomain,
      examTrack,
      totalQuestions: quizQuestions.length,
      correctAnswers: finalCorrectCount,
      timeSpentSeconds: elapsedSeconds
    });
    setQuizState('completed');
  };

  const handleRestart = () => {
    clearActiveSession();
    resumeInProgressRef.current = false;
    setQuizSessionId(null);
    setQuizState('setup');
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setAnsweredQuestions({});
    setStartTime(null);
    setElapsedSeconds(0);
    queryClient.invalidateQueries({ queryKey: ['/api/quiz/draft', examTrack] });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Setup screen
  if (quizState === 'setup') {
    return (
      <>
        <AlertDialog open={showResumeDialog} onOpenChange={setShowResumeDialog}>
          <AlertDialogContent data-testid="dialog-resume-quiz">
            <AlertDialogHeader>
              <AlertDialogTitle>Resume Previous Quiz?</AlertDialogTitle>
              <AlertDialogDescription>
                You have an unfinished {draftData?.domain === 'all' ? 'mixed' : draftData?.domain} quiz with {draftData?.questionIds?.length || 0} questions ({Object.keys(draftData?.userAnswers || {}).length} answered). Would you like to continue where you left off?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={handleStartFresh} data-testid="button-start-fresh">
                Start Fresh
              </AlertDialogCancel>
              <AlertDialogAction onClick={handleResumeDraft} data-testid="button-resume">
                Resume
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <div className="p-8 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-6" data-testid="heading-practice-quiz">Practice Quiz</h1>
          
          <Card className="p-8">
          <div className="text-center mb-8">
            <Play className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h2 className="text-2xl font-bold mb-2">Start a Practice Quiz</h2>
            <p className="text-muted-foreground">
              Answer questions to test your knowledge. Your session will be saved when you finish.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Select Domain</label>
              <Select value={selectedDomain} onValueChange={(value) => {
                setSelectedDomain(value as Domain | 'all');
                setSelectedDomains([]); // Clear URL-based multi-domain filter when user manually selects
              }}>
                <SelectTrigger className="w-full" data-testid="select-domain">
                  <SelectValue placeholder="Select domain" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Domains - Mixed Exam (up to 50 questions)</SelectItem>
                  {availableDomains.map(domain => {
                    const count = QUIZ_QUESTIONS.filter(q => q.domain === domain).length;
                    return (
                      <SelectItem key={domain} value={domain}>
                        {domain} ({count} questions)
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg">
              {selectedDomains.length > 0 ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <p className="text-sm font-medium text-foreground">
                      Study Plan Focus Mode
                    </p>
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
                      Clear Filter
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {selectedDomains.map(domain => {
                      const config = getDomainConfig(domain);
                      return (
                        <Badge key={domain} variant="outline" className={`${config.bgColor} ${config.textColor} border-transparent text-xs`}>
                          {domain}
                        </Badge>
                      );
                    })}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Practice <strong className="text-foreground">
                      {QUIZ_QUESTIONS.filter(q => selectedDomains.includes(q.domain as Domain) && (availableDomains as readonly string[]).includes(q.domain)).length} questions
                    </strong> from your study plan's focus domains.
                  </p>
                </div>
              ) : selectedDomain === 'all' ? (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-foreground">
                    Mixed Exam Mode
                  </p>
                  <p className="text-sm text-muted-foreground">
                    You'll answer <strong className="text-foreground">50 randomly selected questions</strong> from all 7 domains. 
                    This simulates the real exam experience with mixed topics.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-foreground">
                    Domain Practice Mode
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Practice all <strong className="text-foreground">
                      {QUIZ_QUESTIONS.filter(q => q.domain === selectedDomain && (availableDomains as readonly string[]).includes(q.domain)).length} questions
                    </strong> from the {selectedDomain} domain.
                  </p>
                </div>
              )}
            </div>

            <Button
              onClick={handleStartQuiz}
              className="w-full"
              size="lg"
              data-testid="button-start-quiz"
            >
              <Play className="w-5 h-5 mr-2" />
              Start Quiz
            </Button>
          </div>
        </Card>
        </div>
      </>
    );
  }

  // Completion screen
  if (quizState === 'completed') {
    const accuracy = answeredCount > 0 ? (correctCount / answeredCount) * 100 : 0;
    const passed = accuracy >= 70;

    return (
      <div className="p-8 max-w-4xl mx-auto">
        <Card className="p-8">
          <div className="text-center mb-8">
            <Trophy className={`w-16 h-16 mx-auto mb-4 ${passed ? 'text-success' : 'text-muted-foreground'}`} />
            <h2 className="text-3xl font-bold mb-2">Quiz Complete!</h2>
            <p className="text-muted-foreground">
              {passed ? 'Great job! You passed this quiz.' : 'Keep practicing to improve your score.'}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-muted/50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-primary">{answeredCount}</div>
              <div className="text-sm text-muted-foreground">Questions</div>
            </div>
            <div className="bg-muted/50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-success">{correctCount}</div>
              <div className="text-sm text-muted-foreground">Correct</div>
            </div>
            <div className="bg-muted/50 p-4 rounded-lg text-center">
              <div className={`text-2xl font-bold ${passed ? 'text-success' : 'text-destructive'}`}>
                {Math.round(accuracy)}%
              </div>
              <div className="text-sm text-muted-foreground">Accuracy</div>
            </div>
            <div className="bg-muted/50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-foreground">{formatTime(elapsedSeconds)}</div>
              <div className="text-sm text-muted-foreground">Time</div>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              onClick={handleRestart}
              className="w-full"
              size="lg"
              data-testid="button-restart"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Start New Quiz
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // Active quiz screen
  if (!currentQuestion) {
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <Card className="p-12 text-center">
          <h2 className="text-2xl font-bold mb-4">No Questions Available</h2>
          <p className="text-muted-foreground mb-6">
            Please select a different domain or check back later.
          </p>
          <Button onClick={handleRestart} data-testid="button-back">
            Back to Setup
          </Button>
        </Card>
      </div>
    );
  }

  const domainConfig = getDomainConfig(currentQuestion.domain as Domain);
  const Icon = domainConfig.icon;
  const shuffledData = shuffledOptionsMap[currentQuestionIndex];
  const displayOptions = shuffledData?.options ?? currentQuestion.options;
  const correctAnswerIndex = shuffledData?.correctIndex ?? currentQuestion.correctAnswer;
  const isCorrect = selectedAnswer === correctAnswerIndex;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {authExpired && (
        <Alert className="mb-4 border-red-400 bg-red-50 dark:bg-red-950/30" data-testid="alert-auth-expired">
          <AlertDescription className="text-red-800 dark:text-red-200">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <span className="flex-1">
                <strong>Session expired.</strong> Your answers are still here — open a new tab to log in again, then return to finish your quiz.
              </span>
              <div className="flex items-center gap-2 shrink-0">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-red-400 text-red-800 dark:text-red-200 hover:bg-red-100 dark:hover:bg-red-900/40"
                  onClick={() => window.open('/api/login', '_blank', 'noopener')}
                  data-testid="button-reauth"
                >
                  Log in again
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-800 dark:text-red-200"
                  onClick={() => setAuthExpired(false)}
                  data-testid="button-dismiss-auth-expired"
                >
                  Dismiss
                </Button>
              </div>
            </div>
          </AlertDescription>
        </Alert>
      )}
      {draftSaveWarning && !authExpired && (
        <Alert className="mb-4 border-yellow-400 bg-yellow-50 dark:bg-yellow-950/30" data-testid="alert-draft-save-warning">
          <AlertDescription className="text-yellow-800 dark:text-yellow-200 flex items-center justify-between">
            <span>Progress auto-save failed. Your answers are safe in this tab — avoid closing it until the quiz is complete.</span>
            <Button variant="ghost" size="sm" className="ml-4 text-yellow-800 dark:text-yellow-200" onClick={() => setDraftSaveWarning(false)}>Dismiss</Button>
          </AlertDescription>
        </Alert>
      )}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-foreground" data-testid="heading-practice-quiz">Practice Quiz</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-muted-foreground" data-testid="text-timer">
              <Clock className="w-4 h-4" />
              <span className="font-mono text-lg">{formatTime(elapsedSeconds)}</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
          <Badge variant="outline" className="text-sm">
            {selectedDomain === 'all' ? 'All Domains' : selectedDomain}
          </Badge>
          
          <div className="flex gap-4 text-sm text-muted-foreground">
            <span data-testid="text-progress">Progress: {answeredCount}/{totalQuestions}</span>
            <span data-testid="text-correct">Correct: {correctCount}/{answeredCount || 0}</span>
            {answeredCount > 0 && (
              <span className="font-medium" data-testid="text-accuracy">
                Accuracy: {Math.round((correctCount / answeredCount) * 100)}%
              </span>
            )}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleFinishQuiz}
            className="ml-auto"
            data-testid="button-finish"
          >
            <Trophy className="w-4 h-4 mr-2" />
            Finish Quiz
          </Button>
        </div>
      </div>

      <Card className="p-6 mb-6" data-testid="card-question">
        <div className="mb-4 flex items-center justify-between">
          <Badge variant="outline" className={`${domainConfig.bgColor} ${domainConfig.textColor} border-transparent`}>
            <Icon className="w-3 h-3 mr-1" />
            {currentQuestion.domain}
          </Badge>
          <span className="text-sm text-muted-foreground" data-testid="text-question-number">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </span>
        </div>

        <h2 className="text-xl font-semibold text-foreground mb-6 leading-relaxed">
          {currentQuestion.question}
        </h2>

        <div className="space-y-3">
          {displayOptions.map((option: string, index: number) => {
            const isSelected = selectedAnswer === index;
            const isCorrectAnswer = index === correctAnswerIndex;
            const showCorrectIndicator = showExplanation && isCorrectAnswer;
            const showIncorrectIndicator = showExplanation && isSelected && !isCorrect;

            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showExplanation}
                className={`
                  w-full p-4 rounded-lg border-2 text-left transition-all hover-elevate
                  ${isSelected && !showExplanation ? 'border-primary bg-primary/5' : 'border-border'}
                  ${showCorrectIndicator ? 'border-success bg-success/10' : ''}
                  ${showIncorrectIndicator ? 'border-destructive bg-destructive/10' : ''}
                  ${showExplanation ? 'cursor-default' : 'cursor-pointer'}
                `}
                data-testid={`option-${index}`}
              >
                <div className="flex items-center gap-3">
                  <span className={`
                    flex h-8 w-8 items-center justify-center rounded-full border-2 font-semibold text-sm
                    ${isSelected && !showExplanation ? 'border-primary text-primary bg-primary/10' : 'border-border text-muted-foreground'}
                    ${showCorrectIndicator ? 'border-success text-success bg-success/20' : ''}
                    ${showIncorrectIndicator ? 'border-destructive text-destructive bg-destructive/20' : ''}
                  `}>
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="flex-1 text-foreground">{option}</span>
                  {showCorrectIndicator && <CheckCircle2 className="w-5 h-5 text-success" />}
                  {showIncorrectIndicator && <XCircle className="w-5 h-5 text-destructive" />}
                </div>
              </button>
            );
          })}
        </div>

        {!showExplanation && (
          <div className="mt-6">
            <ProblemSolvingLoop
              key={`loop-${currentQuestionIndex}`}
              isVisible={!answeredQuestions[currentQuestionIndex]}
            />
            <Button
              onClick={() => {
                if (selectedAnswer === null || answeredQuestions[currentQuestionIndex]) return;
                handleSubmit();
              }}
              disabled={selectedAnswer === null || saveResultMutation.isPending || !!answeredQuestions[currentQuestionIndex]}
              className="w-full"
              data-testid="button-submit"
            >
              Submit Answer
            </Button>
          </div>
        )}
      </Card>

      {showExplanation && (
        <Alert className={`mb-6 ${isCorrect ? 'border-success bg-success/10' : 'border-destructive bg-destructive/10'}`} data-testid="alert-explanation">
          <Lightbulb className={`h-4 w-4 ${isCorrect ? 'text-success' : 'text-destructive'}`} />
          <AlertDescription className="mt-2">
            <p className={`font-semibold mb-2 ${isCorrect ? 'text-success' : 'text-destructive'}`}>
              {isCorrect ? 'Correct!' : 'Incorrect'}
            </p>
            <p className="text-foreground leading-relaxed whitespace-pre-line">
              {currentQuestion.explanation}
            </p>
          </AlertDescription>
        </Alert>
      )}

      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          data-testid="button-previous"
        >
          Previous
        </Button>
        <Button
          onClick={handleNext}
          disabled={currentQuestionIndex === totalQuestions - 1}
          className="ml-auto"
          data-testid="button-next"
        >
          Next Question
        </Button>
      </div>
    </div>
  );
}
