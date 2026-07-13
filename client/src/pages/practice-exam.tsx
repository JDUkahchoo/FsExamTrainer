import { useState, useEffect, useMemo, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Clock, CheckCircle2, XCircle, PlayCircle, RotateCcw, Layers, FileText, ListChecks, ArrowUpDown, Calculator } from 'lucide-react';
import { getDomainConfig } from '@/lib/domains';
import { EXAM_QUESTIONS } from '@shared/data/examQuestions';
import { TX_EXAM_QUESTIONS } from '@shared/data/txExamQuestions';
import { QUIZ_QUESTIONS } from '@shared/data/quizQuestions';
import { NCEES_STYLE_QUESTIONS, getScenarioContext, type NCEESQuestion } from '@shared/data/nceesStyleQuestions';
import { SelectAllQuestion, PriorityRankingQuestion, ScenarioContext, ComputationalBadge, getQuestionTypeName } from '@/components/ncees-question-types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useActivityLogger } from '@/hooks/use-activity-logger';
import type { Domain, ExamDraft } from '@shared/schema';
import { PS_DOMAINS, FS_DOMAINS } from '@shared/schema';
import { useExamTrack } from '@/contexts/exam-track-context';
import { createExamShuffledOptionsMap, reconstructExamSession } from '@/lib/session-resume';
import { getVariedQuizQuestions, getSessionSeed } from '@shared/data/quizVariationSystem';

const FS_EXAM_DURATION_MINUTES = 360; // 6 hours = 360 minutes
const PS_EXAM_DURATION_MINUTES = 300; // 5 hours = 300 minutes
const TX_EXAM_DURATION_MINUTES = 120; // Texas state-specific exam
const FS_TOTAL_QUESTIONS = 110;
const PS_TOTAL_QUESTIONS = 60; // PS exam has fewer questions
const TX_TOTAL_QUESTIONS = 20; // Texas state-specific exam
const NCEES_TOTAL_QUESTIONS = 110; // Match actual NCEES FS exam format

type ExamState = 'setup' | 'active' | 'completed';
type ExamMode = 'standard' | 'ncees-style';

// Extended answer type to support different question formats
type ExtendedAnswer = number | number[];

// Shape persisted to the exam draft so any mode (standard or NCEES-style) can be rebuilt
type ExamDraftPayload = {
  questionIds: string[];
  currentQuestionIndex: number;
  userAnswers: Record<number, ExtendedAnswer>;
  timeSpentMinutes: number;
  timeSpentSeconds: number;
  examMode: ExamMode;
  examTrack: string;
  shuffleSeed: number;
};

// Get PS exam questions from quiz questions pool
const PS_EXAM_QUESTIONS = QUIZ_QUESTIONS.filter(q => 
  (PS_DOMAINS as readonly string[]).includes(q.domain)
);

export default function PracticeExamPage() {
  const { examTrack, examName } = useExamTrack();
  
  // Calculate exam parameters based on exam track
  const EXAM_DURATION_MINUTES = examTrack === 'ps' ? PS_EXAM_DURATION_MINUTES : examTrack === 'tx' ? TX_EXAM_DURATION_MINUTES : FS_EXAM_DURATION_MINUTES;
  const TOTAL_QUESTIONS = examTrack === 'ps' ? PS_TOTAL_QUESTIONS : examTrack === 'tx' ? TX_TOTAL_QUESTIONS : FS_TOTAL_QUESTIONS;
  const availableExamQuestions = examTrack === 'ps' ? PS_EXAM_QUESTIONS : examTrack === 'tx' ? TX_EXAM_QUESTIONS : EXAM_QUESTIONS;
  
  const [examState, setExamState] = useState<ExamState>('setup');
  const [examMode, setExamMode] = useState<ExamMode>('standard');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, ExtendedAnswer>>({});
  const [timeRemaining, setTimeRemaining] = useState(EXAM_DURATION_MINUTES * 60); // in seconds
  const [examQuestions, setExamQuestions] = useState<Array<(typeof EXAM_QUESTIONS[0] & { id: string }) | NCEESQuestion>>([]);
  const [shuffledOptionsMap, setShuffledOptionsMap] = useState<Record<number, { options: string[]; shuffledToOriginal: number[] }>>({});
  const [showResumeDialog, setShowResumeDialog] = useState(false);
  const [shuffleSeedBase, setShuffleSeedBase] = useState<number>(0);
  const { logActivity } = useActivityLogger();

  // Always-fresh snapshot of the draft payload so leave-time saves never use a stale closure.
  const draftSnapshotRef = useRef<ExamDraftPayload | null>(null);

  // Query to detect existing draft on page load (track-scoped)
  const { data: draftData, isLoading: isDraftLoading } = useQuery<ExamDraft | null>({
    queryKey: ['/api/exam/draft', examTrack],
    queryFn: async () => {
      const response = await fetch(`/api/exam/draft?examTrack=${examTrack}`);
      if (!response.ok) return null;
      return response.json();
    }
  });

  // Mutation to save draft
  const saveDraftMutation = useMutation({
    mutationFn: ({ beaconFallback, ...draft }: ExamDraftPayload & { beaconFallback?: boolean }) =>
      apiRequest('POST', beaconFallback ? '/api/exam/draft?beaconFallback=1' : '/api/exam/draft', draft),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/exam/draft', examTrack] });
    }
  });

  // Mutation to delete draft
  const deleteDraftMutation = useMutation({
    mutationFn: () => apiRequest('DELETE', `/api/exam/draft?examTrack=${examTrack}`, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/exam/draft', examTrack] });
    }
  });

  // Mutation to save practice exam
  const saveExamMutation = useMutation({
    mutationFn: (exam: { 
      totalQuestions: number; 
      correctAnswers: number; 
      timeSpentMinutes: number; 
      domainScores: any;
      questionResults?: Array<{
        questionId: string;
        domain: string;
        questionText: string;
        selectedAnswer: number;
        correctAnswer: number;
        isCorrect: boolean;
        explanation: string;
      }>;
    }) =>
      apiRequest('POST', '/api/exams', exam),
    onSuccess: () => {
      logActivity('exam_completion');
      queryClient.invalidateQueries({ queryKey: ['/api/exams'] });
      queryClient.invalidateQueries({ queryKey: ['/api/exams/latest'] });
      queryClient.invalidateQueries({ queryKey: ['/api/progress/stats'] });
      queryClient.invalidateQueries({ queryKey: ['/api/progress/overall'] });
      queryClient.invalidateQueries({ queryKey: ['/api/progress/domain-mastery'] });
    }
  });

  // Show resume dialog when draft is detected
  useEffect(() => {
    if (draftData && examState === 'setup' && !isDraftLoading) {
      setShowResumeDialog(true);
    }
  }, [draftData, examState, isDraftLoading]);

  // Timer countdown
  useEffect(() => {
    if (examState !== 'active') return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [examState]);

  // Keep a fresh snapshot of everything needed to rebuild the in-progress exam,
  // so leave-time saves never rely on a stale closure. Covers ALL modes.
  useEffect(() => {
    if (examState !== 'active' || examQuestions.length === 0) {
      draftSnapshotRef.current = null;
      return;
    }
    const elapsedSeconds = Math.max(0, EXAM_DURATION_MINUTES * 60 - timeRemaining);
    draftSnapshotRef.current = {
      questionIds: examQuestions.map(q => q.id),
      currentQuestionIndex,
      userAnswers: answers,
      timeSpentMinutes: Math.floor(elapsedSeconds / 60),
      timeSpentSeconds: elapsedSeconds,
      examMode,
      examTrack,
      shuffleSeed: shuffleSeedBase,
    };
  }, [examState, examQuestions, currentQuestionIndex, answers, timeRemaining, examMode, examTrack, shuffleSeedBase, EXAM_DURATION_MINUTES]);

  // Save the current draft (all modes) using the freshest snapshot.
  // `beaconFallback` marks saves that ran because navigator.sendBeacon failed,
  // so the server can log how often leave-time beacons are failing.
  const saveDraft = (beaconFallback = false) => {
    if (draftSnapshotRef.current) {
      saveDraftMutation.mutate({ ...draftSnapshotRef.current, beaconFallback });
    }
  };

  // Best-effort synchronous save for page-teardown events (tab hidden, unload, unmount).
  const flushDraft = () => {
    const payload = draftSnapshotRef.current;
    if (!payload) return;
    try {
      const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
      const ok = navigator.sendBeacon(`/api/exam/draft?examTrack=${examTrack}`, blob);
      if (!ok) {
        console.warn('[beacon-fallback] sendBeacon rejected exam draft; falling back to fetch save');
        saveDraft(true);
      }
    } catch (err) {
      console.warn('[beacon-fallback] sendBeacon threw for exam draft; falling back to fetch save', err);
      saveDraft(true);
    }
  };

  // Persist a draft whenever the user leaves an in-progress exam (tab switch,
  // page unload, or navigating away/unmount) — not just when answering.
  useEffect(() => {
    if (examState !== 'active') return;
    const onVisibility = () => { if (document.visibilityState === 'hidden') flushDraft(); };
    const onPageHide = () => flushDraft();
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('pagehide', onPageHide);
    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pagehide', onPageHide);
      flushDraft();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [examState]);

  const handleResumeDraft = () => {
    if (!draftData) return;

    // Rebuild the session exactly as it was saved (shared, tested logic):
    // same questions/mode, same seeded option ordering, restored answers
    // (numbers and select-all / priority-ranking arrays), and remaining time.
    const restored = reconstructExamSession(
      draftData,
      {
        examQuestions: EXAM_QUESTIONS,
        quizQuestions: QUIZ_QUESTIONS,
        txExamQuestions: TX_EXAM_QUESTIONS,
        nceesQuestions: NCEES_STYLE_QUESTIONS,
      },
      EXAM_DURATION_MINUTES,
    );

    // Restore state
    setShuffleSeedBase(restored.shuffleSeed);
    setExamMode(restored.examMode as ExamMode);
    setShuffledOptionsMap(restored.shuffledOptionsMap);
    setExamQuestions(restored.questions as Array<(typeof EXAM_QUESTIONS[0] & { id: string }) | NCEESQuestion>);
    setCurrentQuestionIndex(restored.currentQuestionIndex);
    setAnswers(restored.answers as Record<number, ExtendedAnswer>);
    setTimeRemaining(restored.timeRemaining);

    setExamState('active');
    setShowResumeDialog(false);

    // Delete the draft since we're resuming
    deleteDraftMutation.mutate();
  };

  const handleStartFresh = () => {
    // Delete the draft
    deleteDraftMutation.mutate();
    setShowResumeDialog(false);
  };

  // Helper to create shuffled options map for a set of questions
  // (shared, tested logic — only standard MCQs are shuffled).
  const createShuffledOptionsMap = (questions: Array<any>, seedBase: number) =>
    createExamShuffledOptionsMap(questions, seedBase);

  // Generate exam questions when starting
  const startExam = (mode: ExamMode = 'standard') => {
    setExamMode(mode);
    // Keep the seed within int32 range — the draft column is a 32-bit integer,
    // so a raw Date.now() would fail validation and silently break resume saves.
    const seedBase = Date.now() % 2147483647;
    setShuffleSeedBase(seedBase);
    
    if (mode === 'standard') {
      const questionPool = examTrack === 'ps' ? PS_EXAM_QUESTIONS : examTrack === 'tx' ? TX_EXAM_QUESTIONS : EXAM_QUESTIONS;
      const shuffled = [...questionPool].sort(() => Math.random() - 0.5);
      const selected = shuffled.slice(0, Math.min(TOTAL_QUESTIONS, shuffled.length));
      
      const questionsWithIds = selected.map(q => ({
        ...q,
        id: examTrack === 'ps' 
          ? `quiz-${QUIZ_QUESTIONS.indexOf(q)}`
          : examTrack === 'tx'
            ? `tx-exam-${TX_EXAM_QUESTIONS.indexOf(q)}`
            : `exam-${EXAM_QUESTIONS.indexOf(q)}`
      }));
      
      const variedQuestions = examTrack === 'ps' 
        ? getVariedQuizQuestions(questionsWithIds, getSessionSeed())
        : questionsWithIds;
      
      setExamQuestions(variedQuestions);
      setShuffledOptionsMap(createShuffledOptionsMap(variedQuestions, seedBase));
    } else {
      if (examTrack === 'ps') {
        const shuffled = [...PS_EXAM_QUESTIONS].sort(() => Math.random() - 0.5);
        const selected = shuffled.slice(0, Math.min(TOTAL_QUESTIONS, shuffled.length));
        const questionsWithIds = selected.map(q => ({
          ...q,
          id: `quiz-${QUIZ_QUESTIONS.indexOf(q)}`
        }));
        const variedQuestions = getVariedQuizQuestions(questionsWithIds, getSessionSeed());
        setExamQuestions(variedQuestions);
        setShuffledOptionsMap(createShuffledOptionsMap(variedQuestions, seedBase));
      } else {
        // NCEES-style exam for FS - use questions with alternative item types
        // Filter out scenario context questions (they're displayed with their related questions)
        const actualQuestions = NCEES_STYLE_QUESTIONS.filter(
          q => !(q.questionType === 'scenario_based' && q.scenarioContext && q.options.length === 0)
        );
        
        // Shuffle and select questions
        const shuffled = [...actualQuestions].sort(() => Math.random() - 0.5);
        const selected = shuffled.slice(0, Math.min(NCEES_TOTAL_QUESTIONS, shuffled.length));
        
        setExamQuestions(selected);
        setShuffledOptionsMap(createShuffledOptionsMap(selected, seedBase));
      }
    }
    
    setExamState('active');
    setAnswers({});
    setCurrentQuestionIndex(0);
    setTimeRemaining(EXAM_DURATION_MINUTES * 60);

    // Save a draft immediately so an interruption before the first answer still resumes.
    setTimeout(() => saveDraft(), 300);
  };
  
  // Check if current question is NCEES-style
  const isNCEESQuestion = (q: any): q is NCEESQuestion => {
    return 'questionType' in q;
  };

  const handleAnswerSelect = (questionIndex: number, shuffledAnswerIndex: number) => {
    // Map shuffled index back to original index
    const shuffledData = shuffledOptionsMap[questionIndex];
    const originalIndex = shuffledData?.shuffledToOriginal?.[shuffledAnswerIndex] ?? shuffledAnswerIndex;
    setAnswers(prev => ({ ...prev, [questionIndex]: originalIndex }));
    // Auto-save draft when user selects an answer
    setTimeout(() => saveDraft(), 100);
  };
  
  // Handle select-all question answers
  const handleSelectAllAnswer = (questionIndex: number, selectedIndices: number[]) => {
    setAnswers(prev => ({ ...prev, [questionIndex]: selectedIndices }));
    setTimeout(() => saveDraft(), 100);
  };
  
  // Handle priority ranking answers
  const handlePriorityRankingAnswer = (questionIndex: number, orderedIndices: number[]) => {
    setAnswers(prev => ({ ...prev, [questionIndex]: orderedIndices }));
    setTimeout(() => saveDraft(), 100);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < examQuestions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      // Auto-save draft when user moves to next question (snapshot ref is fresh post-render)
      setTimeout(() => saveDraft(), 100);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmitExam = () => {
    // Clear the snapshot first so the unmount/leave flush can't re-create a deleted draft
    draftSnapshotRef.current = null;
    // Delete the draft before saving exam
    deleteDraftMutation.mutate();
    
    setExamState('completed');
    
    // Calculate and save exam results
    const results = calculateResults();
    const timeSpentMinutes = Math.floor((EXAM_DURATION_MINUTES * 60 - timeRemaining) / 60);
    
    // Convert extended question results to compatible format for storage
    const compatibleResults = results.questionResults.map(qr => ({
      questionId: qr.questionId,
      domain: qr.domain,
      questionText: qr.questionText,
      selectedAnswer: Array.isArray(qr.selectedAnswer) ? qr.selectedAnswer[0] ?? -1 : qr.selectedAnswer,
      correctAnswer: Array.isArray(qr.correctAnswer) ? qr.correctAnswer[0] ?? -1 : qr.correctAnswer,
      isCorrect: qr.isCorrect,
      explanation: qr.explanation
    }));
    
    saveExamMutation.mutate({
      totalQuestions: results.total,
      correctAnswers: results.correct,
      timeSpentMinutes,
      domainScores: results.domainScores,
      questionResults: compatibleResults
    });
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const calculateResults = () => {
    let correct = 0;
    let totalPoints = 0;
    const domainScores: Record<Domain, { correct: number; total: number }> = {} as any;
    const questionTypeScores: Record<string, { correct: number; total: number }> = {};
    const questionResults: Array<{
      questionId: string;
      domain: string;
      questionText: string;
      selectedAnswer: number | number[];
      correctAnswer: number | number[];
      isCorrect: boolean;
      explanation: string;
      questionType?: string;
      partialScore?: number;
    }> = [];

    examQuestions.forEach((question, index) => {
      const domain = question.domain as Domain;
      if (!domainScores[domain]) {
        domainScores[domain] = { correct: 0, total: 0 };
      }
      domainScores[domain].total++;

      const userAnswer = answers[index];
      let isCorrect = false;
      let partialScore = 0;
      
      // Determine question type and calculate score
      if (isNCEESQuestion(question)) {
        const qType = question.questionType;
        if (!questionTypeScores[qType]) {
          questionTypeScores[qType] = { correct: 0, total: 0 };
        }
        questionTypeScores[qType].total++;
        
        if (qType === 'select_all') {
          // Select all that apply - partial credit scoring
          const correctAnswers = question.correctAnswer as number[];
          const userAnswers = (userAnswer as number[]) || [];
          
          if (question.partialCredit) {
            // Partial credit: points for correct selections, minus points for incorrect
            let correctSelections = 0;
            let incorrectSelections = 0;
            
            userAnswers.forEach(a => {
              if (correctAnswers.includes(a)) {
                correctSelections++;
              } else {
                incorrectSelections++;
              }
            });
            
            const missedSelections = correctAnswers.filter(a => !userAnswers.includes(a)).length;
            partialScore = Math.max(0, (correctSelections - incorrectSelections - missedSelections * 0.5) / correctAnswers.length);
            isCorrect = partialScore >= 0.5;
          } else {
            // All or nothing
            isCorrect = correctAnswers.length === userAnswers.length && 
                       correctAnswers.every(a => userAnswers.includes(a));
            partialScore = isCorrect ? 1 : 0;
          }
        } else if (qType === 'priority_ranking') {
          // Priority ranking - check if order matches exactly
          const correctOrder = question.correctAnswer as number[];
          const userOrder = (userAnswer as number[]) || [];
          
          // Count how many positions are correct
          let correctPositions = 0;
          correctOrder.forEach((correctIdx, pos) => {
            if (userOrder[pos] === correctIdx) {
              correctPositions++;
            }
          });
          
          partialScore = correctPositions / correctOrder.length;
          isCorrect = partialScore === 1;
        } else {
          // Standard MCQ or computational
          isCorrect = userAnswer === question.correctAnswer;
          partialScore = isCorrect ? 1 : 0;
        }
        
        if (isCorrect || partialScore >= 0.5) {
          questionTypeScores[qType].correct++;
        }
        
        totalPoints += partialScore;
      } else {
        // Standard exam question
        isCorrect = userAnswer === question.correctAnswer;
        partialScore = isCorrect ? 1 : 0;
        totalPoints += partialScore;
      }

      if (isCorrect) {
        correct++;
        domainScores[domain].correct++;
      }

      // Save individual question result
      const qId = isNCEESQuestion(question) ? question.id : (question as any).id;
      questionResults.push({
        questionId: qId,
        domain: question.domain,
        questionText: question.question,
        selectedAnswer: userAnswer !== undefined ? userAnswer : -1,
        correctAnswer: question.correctAnswer,
        isCorrect,
        explanation: question.explanation,
        questionType: isNCEESQuestion(question) ? question.questionType : 'multiple_choice',
        partialScore
      });
    });

    return { 
      correct, 
      total: examQuestions.length, 
      domainScores, 
      questionResults, 
      questionTypeScores,
      totalPoints,
      isNCEESStyle: examMode === 'ncees-style'
    };
  };

  // Setup screen
  if (examState === 'setup') {
    return (
      <>
        <AlertDialog open={showResumeDialog} onOpenChange={setShowResumeDialog}>
          <AlertDialogContent data-testid="dialog-resume-exam">
            <AlertDialogHeader>
              <AlertDialogTitle>Resume Previous Exam?</AlertDialogTitle>
              <AlertDialogDescription>
                You have an unfinished practice exam from a previous session. Would you like to continue where you left off?
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

        <div className="p-8 max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-8 text-center" data-testid="heading-practice-exam">
            {examTrack === 'ps' ? 'PS' : 'FS'} Practice Exam
          </h1>
          
          <div className={`grid gap-6 mb-8 ${examTrack === 'ps' ? 'grid-cols-1 max-w-xl mx-auto' : 'grid-cols-1 md:grid-cols-2'}`}>
            {/* Standard Exam Option */}
            <Card 
              className={`p-6 cursor-pointer transition-all hover-elevate ${examMode === 'standard' ? 'ring-2 ring-primary' : ''}`}
              onClick={() => setExamMode('standard')}
              data-testid="card-standard-exam"
            >
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <PlayCircle className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-foreground mb-2">Standard Exam</h2>
                  <p className="text-sm text-muted-foreground mb-4">
                    Traditional multiple-choice format with {TOTAL_QUESTIONS} questions. Classic practice exam experience.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">{TOTAL_QUESTIONS} Questions</Badge>
                    <Badge variant="secondary">{EXAM_DURATION_MINUTES / 60}h Time Limit</Badge>
                    <Badge variant="secondary">MCQ Only</Badge>
                  </div>
                </div>
              </div>
            </Card>
            
            {/* NCEES-Style Exam Option - Only show for FS exam */}
            {examTrack !== 'ps' && (
              <Card 
                className={`p-6 cursor-pointer transition-all hover-elevate ${examMode === 'ncees-style' ? 'ring-2 ring-primary' : ''}`}
                onClick={() => setExamMode('ncees-style')}
                data-testid="card-ncees-exam"
              >
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                    <Layers className="h-6 w-6 text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h2 className="text-xl font-semibold text-foreground">NCEES-Style Exam</h2>
                      <Badge className="bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/30">New</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Mirrors actual NCEES format with alternative item types: scenarios, select-all, priority ranking, and computational questions.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">{NCEES_TOTAL_QUESTIONS} Questions</Badge>
                      <Badge variant="secondary">{EXAM_DURATION_MINUTES / 60}h Time Limit</Badge>
                      <Badge variant="outline" className="text-xs">
                        <FileText className="w-3 h-3 mr-1" />
                        Scenarios
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        <ListChecks className="w-3 h-3 mr-1" />
                        Select All
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        <ArrowUpDown className="w-3 h-3 mr-1" />
                        Ranking
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        <Calculator className="w-3 h-3 mr-1" />
                        Computational
                      </Badge>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
          
          {/* Exam Info Summary */}
          <Card className="p-6 mb-6 bg-muted/50">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {examMode === 'standard' ? TOTAL_QUESTIONS : NCEES_TOTAL_QUESTIONS}
                </p>
                <p className="text-sm text-muted-foreground">Questions</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{EXAM_DURATION_MINUTES / 60}h</p>
                <p className="text-sm text-muted-foreground">Time Limit</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{examTrack === 'ps' ? '5' : '7'}</p>
                <p className="text-sm text-muted-foreground">Domains</p>
              </div>
            </div>
          </Card>

          <div className="text-center">
            <Button size="lg" onClick={() => startExam(examMode)} data-testid="button-start-exam">
              <PlayCircle className="w-5 h-5 mr-2" />
              Start {examMode === 'ncees-style' ? 'NCEES-Style' : 'Standard'} Exam
            </Button>
          </div>
        </div>
      </>
    );
  }

  // Results screen
  if (examState === 'completed') {
    const results = calculateResults();
    const percentage = Math.round((results.correct / results.total) * 100);
    const passed = percentage >= 70;
    const timeSpent = EXAM_DURATION_MINUTES * 60 - timeRemaining;

    return (
      <div className="p-8 max-w-4xl mx-auto">
        <Card className="p-8">
          <div className="text-center mb-8">
            <div className={`inline-flex h-16 w-16 items-center justify-center rounded-full mb-4 ${passed ? 'bg-success/10' : 'bg-destructive/10'}`}>
              {passed ? (
                <CheckCircle2 className="h-8 w-8 text-success" />
              ) : (
                <XCircle className="h-8 w-8 text-destructive" />
              )}
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-2">Exam Complete!</h2>
            <p className={`text-xl font-semibold ${passed ? 'text-success' : 'text-destructive'}`}>
              {passed ? 'Passing Score' : 'Keep Practicing'}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="p-4 text-center bg-muted">
              <p className="text-3xl font-bold text-foreground">{percentage}%</p>
              <p className="text-sm text-muted-foreground">Score</p>
            </Card>
            <Card className="p-4 text-center bg-muted">
              <p className="text-3xl font-bold text-foreground">{results.correct}/{results.total}</p>
              <p className="text-sm text-muted-foreground">Correct</p>
            </Card>
            <Card className="p-4 text-center bg-muted">
              <p className="text-3xl font-bold text-foreground">{formatTime(timeSpent)}</p>
              <p className="text-sm text-muted-foreground">Time Spent</p>
            </Card>
            <Card className="p-4 text-center bg-muted">
              <p className="text-3xl font-bold text-foreground">{Object.keys(results.domainScores).length}</p>
              <p className="text-sm text-muted-foreground">Domains</p>
            </Card>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-foreground mb-4">Domain Breakdown</h3>
            <div className="space-y-3">
              {Object.entries(results.domainScores).map(([domain, scores]) => {
                const domainConfig = getDomainConfig(domain as Domain);
                const Icon = domainConfig.icon;
                const domainPercentage = Math.round((scores.correct / scores.total) * 100);
                
                return (
                  <div key={domain} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className={`${domainConfig.bgColor} ${domainConfig.textColor} border-transparent`}>
                        <Icon className="w-3 h-3 mr-1" />
                        {domain}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {scores.correct}/{scores.total} ({domainPercentage}%)
                      </span>
                    </div>
                    <Progress value={domainPercentage} className="h-2" />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Question Type Breakdown for NCEES-Style */}
          {results.isNCEESStyle && Object.keys(results.questionTypeScores).length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-foreground mb-4">Question Type Breakdown</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {Object.entries(results.questionTypeScores).map(([qType, scores]) => {
                  const typePercentage = Math.round((scores.correct / scores.total) * 100);
                  return (
                    <Card key={qType} className="p-3 text-center bg-muted">
                      <p className="text-lg font-bold text-foreground">{typePercentage}%</p>
                      <p className="text-xs text-muted-foreground">
                        {getQuestionTypeName(qType as any)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {scores.correct}/{scores.total}
                      </p>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <Button onClick={() => startExam(examMode)} className="flex-1" data-testid="button-retake">
              <RotateCcw className="w-4 h-4 mr-2" />
              Retake {examMode === 'ncees-style' ? 'NCEES-Style' : 'Standard'} Exam
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // Exam in progress
  const currentQuestion = examQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / examQuestions.length) * 100;
  const answeredCount = Object.keys(answers).length;
  const isLowTime = timeRemaining < 600; // Less than 10 minutes

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-foreground">
              Question {currentQuestionIndex + 1} / {examQuestions.length}
            </span>
            <Progress value={progress} className="w-48 h-2" />
            <span className="text-sm text-muted-foreground">
              {answeredCount} answered
            </span>
          </div>
          <div className={`flex items-center gap-2 ${isLowTime ? 'text-destructive animate-pulse' : 'text-foreground'}`}>
            <Clock className="w-4 h-4" />
            <span className="font-mono font-semibold">{formatTime(timeRemaining)}</span>
          </div>
        </div>
      </div>

      {/* Question content */}
      <div className="p-8 max-w-4xl mx-auto">
        {/* Scenario context for scenario-based questions */}
        {currentQuestion && isNCEESQuestion(currentQuestion) && currentQuestion.scenarioId && (
          (() => {
            const scenarioCtx = getScenarioContext(currentQuestion.scenarioId);
            if (scenarioCtx?.scenarioContext) {
              return (
                <ScenarioContext 
                  context={scenarioCtx.scenarioContext}
                  scenarioId={currentQuestion.scenarioId}
                />
              );
            }
            return null;
          })()
        )}
        
        <Card className="p-6 mb-6">
          {currentQuestion && (
            <>
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <Badge variant="outline" className={`${getDomainConfig(currentQuestion.domain as Domain).bgColor} ${getDomainConfig(currentQuestion.domain as Domain).textColor} border-transparent`}>
                  {currentQuestion.domain}
                </Badge>
                {isNCEESQuestion(currentQuestion) && currentQuestion.questionType !== 'multiple_choice' && (
                  <Badge variant="secondary" className="text-xs">
                    {getQuestionTypeName(currentQuestion.questionType)}
                  </Badge>
                )}
              </div>

              {/* Computational badge */}
              {isNCEESQuestion(currentQuestion) && currentQuestion.questionType === 'computational' && (
                <ComputationalBadge diagramRef={currentQuestion.diagramRef} />
              )}

              <h2 className="text-xl font-semibold text-foreground mb-6 leading-relaxed">
                {currentQuestion.question}
              </h2>

              {/* Render based on question type */}
              {isNCEESQuestion(currentQuestion) && currentQuestion.questionType === 'select_all' ? (
                <SelectAllQuestion
                  question={currentQuestion}
                  selectedAnswers={(answers[currentQuestionIndex] as number[]) || []}
                  onAnswerChange={(selected) => handleSelectAllAnswer(currentQuestionIndex, selected)}
                />
              ) : isNCEESQuestion(currentQuestion) && currentQuestion.questionType === 'priority_ranking' ? (
                <PriorityRankingQuestion
                  question={currentQuestion}
                  rankedOrder={(answers[currentQuestionIndex] as number[]) || []}
                  onOrderChange={(order) => handlePriorityRankingAnswer(currentQuestionIndex, order)}
                />
              ) : (
                /* Standard MCQ options */
                <div className="space-y-3">
                  {(() => {
                    // Use shuffled options if available
                    const shuffledData = shuffledOptionsMap[currentQuestionIndex];
                    const displayOptions = shuffledData?.options ?? currentQuestion.options;
                    const storedAnswer = answers[currentQuestionIndex];
                    
                    return displayOptions.map((option, shuffledIndex) => {
                      // Map stored original answer back to shuffled index for display
                      const originalIndex = shuffledData?.shuffledToOriginal?.[shuffledIndex] ?? shuffledIndex;
                      const isSelected = storedAnswer === originalIndex;
                      
                      return (
                        <button
                          key={shuffledIndex}
                          onClick={() => handleAnswerSelect(currentQuestionIndex, shuffledIndex)}
                          className={`
                            w-full p-4 rounded-lg border-2 text-left transition-all hover-elevate
                            ${isSelected ? 'border-primary bg-primary/5' : 'border-border'}
                          `}
                          data-testid={`option-${shuffledIndex}`}
                        >
                          <div className="flex items-center gap-3">
                            <span className={`
                              flex h-8 w-8 items-center justify-center rounded-full border-2 font-semibold text-sm
                              ${isSelected ? 'border-primary text-primary bg-primary/10' : 'border-border text-muted-foreground'}
                            `}>
                              {String.fromCharCode(65 + shuffledIndex)}
                            </span>
                            <span className="flex-1 text-foreground">{option}</span>
                          </div>
                        </button>
                      );
                    });
                  })()}
                </div>
              )}
            </>
          )}
        </Card>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
            data-testid="button-previous"
          >
            Previous
          </Button>
          
          {currentQuestionIndex < examQuestions.length - 1 ? (
            <Button
              onClick={handleNextQuestion}
              className="ml-auto"
              data-testid="button-next"
            >
              Next Question
            </Button>
          ) : (
            <Button
              onClick={handleSubmitExam}
              className="ml-auto"
              variant="default"
              data-testid="button-submit-exam"
            >
              Submit Exam
            </Button>
          )}
        </div>

        {answeredCount < examQuestions.length && (
          <Alert className="mt-6">
            <AlertDescription>
              You have answered {answeredCount} out of {examQuestions.length} questions. 
              Make sure to answer all questions before submitting.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}
