import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Clock, CheckCircle2, XCircle, PlayCircle, RotateCcw } from 'lucide-react';
import { getDomainConfig } from '@/lib/domains';
import { EXAM_QUESTIONS } from '@shared/data/examQuestions';
import { useMutation, useQuery } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useActivityLogger } from '@/hooks/use-activity-logger';
import type { Domain, ExamDraft } from '@shared/schema';

const EXAM_DURATION_MINUTES = 360; // 6 hours = 360 minutes
const TOTAL_QUESTIONS = 110;

type ExamState = 'setup' | 'active' | 'completed';

export default function PracticeExamPage() {
  const [examState, setExamState] = useState<ExamState>('setup');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeRemaining, setTimeRemaining] = useState(EXAM_DURATION_MINUTES * 60); // in seconds
  const [examQuestions, setExamQuestions] = useState<Array<typeof EXAM_QUESTIONS[0] & { id: string }>>([]);
  const [showResumeDialog, setShowResumeDialog] = useState(false);
  const { logActivity } = useActivityLogger();

  // Query to detect existing draft on page load
  const { data: draftData, isLoading: isDraftLoading } = useQuery<ExamDraft | null>({
    queryKey: ['/api/exam/draft'],
    queryFn: async () => {
      const response = await fetch('/api/exam/draft');
      if (!response.ok) return null;
      return response.json();
    }
  });

  // Mutation to save draft
  const saveDraftMutation = useMutation({
    mutationFn: (draft: { questionIds: string[]; currentQuestionIndex: number; userAnswers: Record<number, number>; timeSpentMinutes: number }) =>
      apiRequest('POST', '/api/exam/draft', draft),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/exam/draft'] });
    }
  });

  // Mutation to delete draft
  const deleteDraftMutation = useMutation({
    mutationFn: () => apiRequest('DELETE', '/api/exam/draft', {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/exam/draft'] });
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

  // Helper function to save draft
  const saveDraft = (indexOverride?: number) => {
    if (examState === 'active' && examQuestions.length > 0) {
      // Convert elapsed seconds to minutes for storage
      const elapsedSeconds = EXAM_DURATION_MINUTES * 60 - timeRemaining;
      const timeSpentMinutes = Math.floor(elapsedSeconds / 60);

      // Save draft with stable question IDs
      saveDraftMutation.mutate({
        questionIds: examQuestions.map(q => q.id),
        currentQuestionIndex: indexOverride !== undefined ? indexOverride : currentQuestionIndex,
        userAnswers: answers,
        timeSpentMinutes
      });
    }
  };

  const handleResumeDraft = () => {
    if (!draftData) return;

    // Create a map of ID -> question from original array for efficient lookup
    const questionMap = new Map(
      EXAM_QUESTIONS.map((q, i) => [`exam-${i}`, q])
    );

    // Reconstruct exam questions from stable question IDs
    const reconstructedQuestions = draftData.questionIds.map(id => {
      const question = questionMap.get(id);
      if (!question) {
        console.error(`Question ${id} not found in EXAM_QUESTIONS`);
        return null;
      }
      return { ...question, id };
    }).filter(Boolean) as Array<typeof EXAM_QUESTIONS[0] & { id: string }>;

    // Restore state
    setExamQuestions(reconstructedQuestions);
    setCurrentQuestionIndex(draftData.currentQuestionIndex);
    setAnswers(draftData.userAnswers as Record<number, number>);
    
    // Convert minutes back to seconds for timer
    const elapsedSeconds = draftData.timeSpentMinutes * 60;
    setTimeRemaining(EXAM_DURATION_MINUTES * 60 - elapsedSeconds);
    
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

  // Generate exam questions when starting
  const startExam = () => {
    // Shuffle and select 110 questions from exam pool
    const shuffled = [...EXAM_QUESTIONS].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, Math.min(TOTAL_QUESTIONS, shuffled.length));
    
    // Add stable IDs based on original array position
    const questionsWithIds = selected.map(q => ({
      ...q,
      id: `exam-${EXAM_QUESTIONS.indexOf(q)}`
    }));
    
    setExamQuestions(questionsWithIds);
    setExamState('active');
    setAnswers({});
    setCurrentQuestionIndex(0);
    setTimeRemaining(EXAM_DURATION_MINUTES * 60);
  };

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    setAnswers(prev => ({ ...prev, [questionIndex]: answerIndex }));
    // Auto-save draft when user selects an answer
    setTimeout(() => saveDraft(), 100);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < examQuestions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      // Auto-save draft when user moves to next question (use nextIndex to avoid stale closure)
      setTimeout(() => saveDraft(nextIndex), 100);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmitExam = () => {
    // Delete the draft before saving exam
    deleteDraftMutation.mutate();
    
    setExamState('completed');
    
    // Calculate and save exam results
    const results = calculateResults();
    const timeSpentMinutes = Math.floor((EXAM_DURATION_MINUTES * 60 - timeRemaining) / 60);
    
    saveExamMutation.mutate({
      totalQuestions: results.total,
      correctAnswers: results.correct,
      timeSpentMinutes,
      domainScores: results.domainScores,
      questionResults: results.questionResults
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
    const domainScores: Record<Domain, { correct: number; total: number }> = {} as any;
    const questionResults: Array<{
      questionId: string;
      domain: string;
      questionText: string;
      selectedAnswer: number;
      correctAnswer: number;
      isCorrect: boolean;
      explanation: string;
    }> = [];

    examQuestions.forEach((question, index) => {
      const domain = question.domain as Domain;
      if (!domainScores[domain]) {
        domainScores[domain] = { correct: 0, total: 0 };
      }
      domainScores[domain].total++;

      const userAnswer = answers[index];
      const isCorrect = userAnswer === question.correctAnswer;

      if (isCorrect) {
        correct++;
        domainScores[domain].correct++;
      }

      // Save individual question result
      questionResults.push({
        questionId: question.id,
        domain: question.domain,
        questionText: question.question,
        selectedAnswer: userAnswer !== undefined ? userAnswer : -1,
        correctAnswer: question.correctAnswer,
        isCorrect,
        explanation: question.explanation
      });
    });

    return { correct, total: examQuestions.length, domainScores, questionResults };
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

        <div className="p-8 max-w-4xl mx-auto">
          <Card className="p-12 text-center">
            <div className="flex justify-center mb-6">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <PlayCircle className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4" data-testid="heading-practice-exam">
              FS Practice Exam
            </h1>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              This practice exam simulates the actual FS exam with {TOTAL_QUESTIONS} questions across all 7 domains. 
              You'll have {EXAM_DURATION_MINUTES / 60} hours to complete it. The timer will start immediately when you begin.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 max-w-2xl mx-auto">
              <Card className="p-4 bg-muted">
                <p className="text-2xl font-bold text-foreground">{TOTAL_QUESTIONS}</p>
                <p className="text-sm text-muted-foreground">Questions</p>
              </Card>
              <Card className="p-4 bg-muted">
                <p className="text-2xl font-bold text-foreground">{EXAM_DURATION_MINUTES / 60}h</p>
                <p className="text-sm text-muted-foreground">Time Limit</p>
              </Card>
              <Card className="p-4 bg-muted">
                <p className="text-2xl font-bold text-foreground">7</p>
                <p className="text-sm text-muted-foreground">Domains</p>
              </Card>
            </div>

            <Button size="lg" onClick={startExam} data-testid="button-start-exam">
              <PlayCircle className="w-5 h-5 mr-2" />
              Start Practice Exam
            </Button>
          </Card>
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

          <div className="flex gap-3">
            <Button onClick={startExam} className="flex-1" data-testid="button-retake">
              <RotateCcw className="w-4 h-4 mr-2" />
              Retake Exam
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
        <Card className="p-6 mb-6">
          {currentQuestion && (
            <>
              <div className="mb-4">
                <Badge variant="outline" className={`${getDomainConfig(currentQuestion.domain as Domain).bgColor} ${getDomainConfig(currentQuestion.domain as Domain).textColor} border-transparent`}>
                  {currentQuestion.domain}
                </Badge>
              </div>

              <h2 className="text-xl font-semibold text-foreground mb-6 leading-relaxed">
                {currentQuestion.question}
              </h2>

              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => {
                  const isSelected = answers[currentQuestionIndex] === index;
                  
                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(currentQuestionIndex, index)}
                      className={`
                        w-full p-4 rounded-lg border-2 text-left transition-all hover-elevate
                        ${isSelected ? 'border-primary bg-primary/5' : 'border-border'}
                      `}
                      data-testid={`option-${index}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`
                          flex h-8 w-8 items-center justify-center rounded-full border-2 font-semibold text-sm
                          ${isSelected ? 'border-primary text-primary bg-primary/10' : 'border-border text-muted-foreground'}
                        `}>
                          {String.fromCharCode(65 + index)}
                        </span>
                        <span className="flex-1 text-foreground">{option}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
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
