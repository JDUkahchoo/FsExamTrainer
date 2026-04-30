import { useState, useEffect, useMemo } from "react";
import { useParams, useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { ArrowLeft, ArrowRight, CheckCircle2, XCircle, Trophy, BookOpen, History, Eye } from "lucide-react";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { getAllLessonReferences, type BookReference } from "@shared/data/referenceManualMappings";
import { useExamTrack } from "@/contexts/exam-track-context";
import { shuffleQuestionOptions } from "@/lib/shuffleOptions";

type QuestionType = "multiple_choice" | "fill_in_blank" | "drag_drop";

interface LessonQuestion {
  id: string;
  lessonId: string;
  questionType: QuestionType;
  questionText: string;
  options?: any;
  orderIndex: number;
  points: number;
}

interface Lesson {
  id: string;
  week: number;
  domain: string;
  title: string;
  description: string;
  content: string;
  practicalProblem?: string;
  orderIndex: number;
  estimatedMinutes: number;
}

interface LessonData {
  lesson: Lesson;
  questions: LessonQuestion[];
}

interface QuestionResult {
  questionId: string;
  questionText?: string;
  questionType?: string;
  options?: any;
  userAnswer: any;
  correctAnswer: any;
  isCorrect: boolean;
  explanation: string;
  points: number;
}

interface SubmitResponse {
  progress: any;
  results: QuestionResult[];
  passed: boolean;
  score: number;
  totalPoints: number;
  percentage: number;
}

export default function LessonPage() {
  const params = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const { examTrack } = useExamTrack();
  const lessonId = params.id;

  const urlParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const fromStudyPlan = urlParams.get('from') === 'study-plan';
  const returnWeek = urlParams.get('week');
  const backPath = fromStudyPlan && returnWeek
    ? `/app/${examTrack}/study-plan?week=${returnWeek}`
    : `/app/${examTrack}/lessons`;
  const backLabel = fromStudyPlan ? 'Back to Study Plan' : 'Back to Lessons';

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<QuestionResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [showLastAttempt, setShowLastAttempt] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());

  const { data: allLessonProgress = [] } = useQuery<any[]>({
    queryKey: ["/api/lessons/progress", examTrack],
    queryFn: async () => {
      const res = await fetch(`/api/lessons/progress?examTrack=${examTrack}`);
      if (!res.ok) throw new Error("Failed to fetch progress");
      return res.json();
    },
  });
  const storedProgress = allLessonProgress.find((p: any) => p.lessonId === lessonId);
  const storedResults = storedProgress?.questionResults as QuestionResult[] | null | undefined;
  const storedPercentage = storedProgress?.score != null && storedProgress?.totalPoints
    ? Math.round((storedProgress.score / storedProgress.totalPoints) * 100)
    : null;

  useEffect(() => {
    if (showResults) {
      const mainEl = document.querySelector('main');
      if (mainEl) {
        mainEl.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, [showResults]);

  const { data: lessonData, isLoading } = useQuery<LessonData>({
    queryKey: ["/api/lessons", lessonId],
    enabled: !!lessonId,
  });

  // Compute shuffled options for multiple choice questions
  // Map from question id to { shuffledOptions, shuffledToOriginal }
  const shuffledOptionsMap = useMemo(() => {
    if (!lessonData?.questions) return {};
    
    const map: Record<string, { options: string[]; shuffledToOriginal: number[] }> = {};
    
    lessonData.questions.forEach((q, qIndex) => {
      if (q.questionType === 'multiple_choice' && Array.isArray(q.options)) {
        // Use question id + index as seed for consistent shuffling
        const seed = q.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) + qIndex;
        
        // Create a fake question object for shuffling
        const fakeQuestion = { options: q.options as string[], correctAnswer: 0 };
        const shuffled = shuffleQuestionOptions(fakeQuestion, seed);
        
        // Create reverse mapping: shuffled index -> original index
        const shuffledToOriginal: number[] = [];
        shuffled.originalToShuffledMap.forEach((shuffledIdx, originalIdx) => {
          shuffledToOriginal[shuffledIdx] = originalIdx;
        });
        
        map[q.id] = {
          options: shuffled.shuffledOptions,
          shuffledToOriginal
        };
      }
    });
    
    return map;
  }, [lessonData?.questions]);

  const submitMutation = useMutation({
    mutationFn: async (data: { answers: Record<string, any>; questionIds: string[]; timeSpentSeconds: number }) => {
      console.log('[Lesson Submit] Sending data to server:', {
        lessonId,
        answerCount: Object.keys(data.answers).length,
        answerKeys: Object.keys(data.answers),
        answers: data.answers,
        questionIds: data.questionIds,
        timeSpent: data.timeSpentSeconds,
      });
      const response = await apiRequest('POST', `/api/lessons/${lessonId}/submit`, data);
      const result = await response.json() as SubmitResponse;
      console.log('[Lesson Submit] Response from server:', result);
      return result;
    },
    onSuccess: (data) => {
      setResults(data.results);
      setShowResults(true);
      queryClient.invalidateQueries({ queryKey: ["/api/lessons/progress"] });
      queryClient.invalidateQueries({ queryKey: ["/api/progress/stats"] });
      queryClient.invalidateQueries({ queryKey: ['/api/progress/domain-mastery'] });
      queryClient.invalidateQueries({ predicate: (query) => 
        Array.isArray(query.queryKey) && query.queryKey[0] === '/api/daily-quests'
      });
      
      if (data.passed) {
        toast({
          title: "Lesson Complete! 🎉",
          description: `You scored ${data.percentage}% and passed this lesson!`,
        });
      } else {
        toast({
          title: "Keep Practicing",
          description: `You scored ${data.percentage}%. You need 70% to pass. Try again!`,
          variant: "destructive",
        });
      }
    },
    onError: (error: any) => {
      toast({
        title: "Submission Failed",
        description: error.message || "Failed to submit lesson. Please try again.",
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center space-y-4">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto" />
          <p className="text-muted-foreground">Loading lesson...</p>
        </div>
      </div>
    );
  }

  if (!lessonData) {
    return (
      <div className="flex items-center justify-center h-full">
        <Card className="max-w-md">
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">Lesson not found</p>
            <Button
              className="mt-4 w-full"
              onClick={() => navigate(backPath)}
              data-testid="button-back-to-study-plan"
            >
              {backLabel}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { lesson, questions } = lessonData;

  // Handle lessons with no questions yet
  if (!questions || questions.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle>{lesson.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">{lesson.description}</p>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm">
                <strong>Coming Soon!</strong> This lesson is currently being developed. 
                Interactive questions will be available soon.
              </p>
              <p className="text-sm mt-2 text-muted-foreground">
                {lesson.content}
              </p>
            </div>
            <Button
              className="w-full"
              onClick={() => navigate(backPath)}
              data-testid="button-back-to-study-plan"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {backLabel}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  // Get shuffled options for current question if available
  const currentShuffledData = shuffledOptionsMap[currentQuestion?.id];

  const handleAnswer = (value: any) => {
    setAnswers({ ...answers, [currentQuestion.id]: value });
  };

  // For multiple choice with shuffled options, map shuffled index to original index
  const handleMultipleChoiceAnswer = (shuffledIndex: number) => {
    const originalIndex = currentShuffledData?.shuffledToOriginal?.[shuffledIndex] ?? shuffledIndex;
    setAnswers({ ...answers, [currentQuestion.id]: originalIndex });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    // Validate all answers are properly set before submission
    const validAnswers: Record<string, any> = {};
    let isValid = true;
    
    questions.forEach((q) => {
      const answer = answers[q.id];
      
      // Validate answer exists and is valid
      if (answer === undefined || answer === null) {
        console.warn(`Question ${q.id} has no answer`);
        isValid = false;
      } else if (typeof answer === 'string' && answer.trim() === '') {
        console.warn(`Question ${q.id} has empty string answer`);
        isValid = false;
      } else {
        // Answer is valid - store it
        validAnswers[q.id] = answer;
      }
    });
    
    if (!isValid) {
      toast({
        title: "Incomplete Answers",
        description: "Please answer all questions before submitting.",
        variant: "destructive",
      });
      return;
    }
    
    const timeSpentSeconds = Math.floor((Date.now() - startTime) / 1000);
    const questionIds = questions.map(q => q.id);
    console.log(`Submitting ${Object.keys(validAnswers).length} answers:`, validAnswers);
    submitMutation.mutate({ answers: validAnswers, questionIds, timeSpentSeconds });
    setSubmitted(true);
  };

  const canProceed = answers[currentQuestion?.id] !== undefined && answers[currentQuestion?.id] !== null && (
    typeof answers[currentQuestion?.id] === 'number' ? true : answers[currentQuestion?.id] !== ""
  );
  const allAnswered = questions.every((q) => answers[q.id] !== undefined && answers[q.id] !== null && (
    typeof answers[q.id] === 'number' ? true : answers[q.id] !== ""
  ));

  if (showLastAttempt && storedResults && storedResults.length > 0 && lessonData) {
    const { lesson } = lessonData;
    const correctCount = storedResults.filter(r => r.isCorrect).length;
    const missedResults = storedResults.filter(r => !r.isCorrect);
    const correctResults = storedResults.filter(r => r.isCorrect);

    const formatStoredAnswer = (answer: any, questionType?: string, options?: any): string => {
      if (answer === undefined || answer === null) return "No answer provided";
      if (questionType === 'multiple_choice') {
        const optionsArray = Array.isArray(options) ? options : (typeof options === 'string' ? (() => { try { return JSON.parse(options); } catch { return []; } })() : []);
        if (optionsArray.length > 0) {
          const idx = parseInt(String(answer), 10);
          if (!isNaN(idx) && idx >= 0 && idx < optionsArray.length) return optionsArray[idx];
        }
        return `Option ${answer}`;
      }
      if (questionType === 'drag_drop') return Array.isArray(answer) ? answer.join(', ') : String(answer);
      return String(answer);
    };

    return (
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <History className="h-5 w-5 text-muted-foreground" />
              <div>
                <CardTitle>Last Attempt Review</CardTitle>
                <p className="text-sm text-muted-foreground mt-0.5">{lesson.title}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-3 gap-4 text-center p-4 rounded-lg bg-muted/50">
              <div>
                <p className="text-2xl font-bold">{storedPercentage}%</p>
                <p className="text-sm text-muted-foreground">Score</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">{correctCount}</p>
                <p className="text-sm text-muted-foreground">Correct</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">{missedResults.length}</p>
                <p className="text-sm text-muted-foreground">Missed</p>
              </div>
            </div>

            {missedResults.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-semibold text-red-600 dark:text-red-400 flex items-center gap-2">
                  <XCircle className="h-4 w-4" /> Missed Questions ({missedResults.length})
                </h3>
                {missedResults.map((result, i) => (
                  <Card key={result.questionId} className="border-red-200 dark:border-red-800">
                    <CardContent className="pt-4 space-y-2">
                      <p className="text-sm font-medium">{result.questionText || `Question ${i + 1}`}</p>
                      <div className="space-y-1 text-sm">
                        <p>
                          <span className="font-medium">Your answer: </span>
                          <span className="text-red-600 dark:text-red-400">{formatStoredAnswer(result.userAnswer, result.questionType, result.options)}</span>
                        </p>
                        <p>
                          <span className="font-medium">Correct answer: </span>
                          <span className="text-green-600 dark:text-green-400">{formatStoredAnswer(result.correctAnswer, result.questionType, result.options)}</span>
                        </p>
                      </div>
                      {result.explanation && (
                        <p className="text-sm text-muted-foreground p-2 bg-muted rounded-md">{result.explanation}</p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {correctResults.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-semibold text-green-600 dark:text-green-400 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" /> Correct ({correctResults.length})
                </h3>
                {correctResults.map((result, i) => (
                  <div key={result.questionId} className="flex items-start gap-2 text-sm p-3 rounded-md bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800">
                    <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{result.questionText || `Question ${i + 1}`}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setShowLastAttempt(false)} className="flex-1" data-testid="button-back-from-last-attempt">
                <ArrowLeft className="h-4 w-4 mr-2" /> Take Lesson
              </Button>
              <Button variant="outline" onClick={() => navigate(backPath)} className="flex-1" data-testid="button-back-to-list-from-last-attempt">
                {backLabel}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {submitMutation.data?.passed ? (
                <>
                  <Trophy className="h-6 w-6 text-yellow-500" />
                  Lesson Complete!
                </>
              ) : (
                <>
                  <XCircle className="h-6 w-6 text-destructive" />
                  Keep Practicing
                </>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold">{submitMutation.data?.percentage}%</p>
                <p className="text-sm text-muted-foreground">Score</p>
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {submitMutation.data?.score}/{submitMutation.data?.totalPoints}
                </p>
                <p className="text-sm text-muted-foreground">Points</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{results.filter((r) => r.isCorrect).length}</p>
                <p className="text-sm text-muted-foreground">Correct</p>
              </div>
            </div>

            {(() => {
              const formatAnswer = (answer: any, questionType?: string, options?: any) => {
                try {
                  if (answer === undefined || answer === null) return "No answer provided";
                  if (questionType === 'multiple_choice') {
                    const optionsArray = Array.isArray(options)
                      ? options
                      : typeof options === 'string'
                        ? (() => { try { return JSON.parse(options); } catch { return []; } })()
                        : [];
                    if (optionsArray.length > 0) {
                      const answerIndex = parseInt(String(answer), 10);
                      if (!isNaN(answerIndex) && answerIndex >= 0 && answerIndex < optionsArray.length) {
                        return optionsArray[answerIndex];
                      }
                    }
                    return `Option ${answer}`;
                  }
                  if (questionType === 'drag_drop') {
                    return Array.isArray(answer) ? answer.join(', ') : String(answer);
                  }
                  return String(answer);
                } catch {
                  return String(answer ?? 'No answer provided');
                }
              };

              const missedResults = results.filter((r) => !r.isCorrect);
              const correctResults = results.filter((r) => r.isCorrect);

              const indexById = new Map<string, number>();
              results.forEach((r, i) => indexById.set(r.questionId, i));

              const getOriginalIndex = (result: QuestionResult) => {
                const idx = indexById.get(result.questionId);
                return idx === undefined ? -1 : idx;
              };

              const getQuestionData = (result: QuestionResult, fallbackIndex: number) => {
                const fallback = fallbackIndex >= 0 ? questions[fallbackIndex] : undefined;
                return {
                  text: result.questionText ?? fallback?.questionText ?? "Question",
                  type: (result.questionType ?? fallback?.questionType) as string | undefined,
                  options: result.options ?? fallback?.options,
                };
              };

              const formatQuestionLabel = (originalIndex: number) =>
                originalIndex >= 0 ? `Question ${originalIndex + 1}` : "Question";

              return (
                <div className="space-y-6">
                  {missedResults.length > 0 && (
                    <div className="space-y-3" data-testid="section-missed-questions">
                      <h3 className="font-semibold flex items-center gap-2">
                        <XCircle className="h-5 w-5 text-red-500" />
                        Missed Questions ({missedResults.length})
                      </h3>
                      {missedResults.map((result) => {
                        const originalIndex = getOriginalIndex(result);
                        const q = getQuestionData(result, originalIndex);
                        return (
                          <Card key={result.questionId} className="border-red-500">
                            <CardContent className="pt-6 space-y-2">
                              <div className="flex items-start gap-2">
                                <XCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                                <div className="flex-1">
                                  <p className="font-medium">{formatQuestionLabel(originalIndex)}</p>
                                  <p className="text-sm text-muted-foreground mt-1">{q.text}</p>
                                  <div className="mt-2 space-y-1">
                                    <p className="text-sm">
                                      <span className="font-medium">Your answer:</span>{" "}
                                      <span className="text-red-500">{formatAnswer(result.userAnswer, q.type, q.options)}</span>
                                    </p>
                                    <p className="text-sm">
                                      <span className="font-medium">Correct answer:</span>{" "}
                                      <span className="text-green-500">{formatAnswer(result.correctAnswer, q.type, q.options)}</span>
                                    </p>
                                  </div>
                                  {result.explanation && (
                                    <p className="text-sm text-muted-foreground mt-2 p-3 bg-muted rounded-md">
                                      {result.explanation}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  )}

                  {correctResults.length > 0 && (
                    <div className="space-y-3" data-testid="section-correct-questions">
                      <h3 className="font-semibold flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        Correct ({correctResults.length})
                      </h3>
                      {correctResults.map((result) => {
                        const originalIndex = getOriginalIndex(result);
                        const q = getQuestionData(result, originalIndex);
                        return (
                          <Card key={result.questionId} className="border-green-500">
                            <CardContent className="pt-6 space-y-2">
                              <div className="flex items-start gap-2">
                                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                                <div className="flex-1">
                                  <p className="font-medium">{formatQuestionLabel(originalIndex)}</p>
                                  <p className="text-sm text-muted-foreground mt-1">{q.text}</p>
                                  <p className="text-sm mt-2">
                                    <span className="font-medium">Your answer:</span>{" "}
                                    <span className="text-green-600 dark:text-green-500">{formatAnswer(result.userAnswer, q.type, q.options)}</span>
                                  </p>
                                  {result.explanation && (
                                    <p className="text-sm text-muted-foreground mt-2 p-3 bg-muted rounded-md">
                                      {result.explanation}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })()}

            <div className="flex gap-4">
              {!submitMutation.data?.passed && (
                <Button
                  onClick={() => {
                    setAnswers({});
                    setCurrentQuestionIndex(0);
                    setSubmitted(false);
                    setShowResults(false);
                    setResults([]);
                    setStartTime(Date.now()); // Reset timer for retry
                  }}
                  className="flex-1"
                  data-testid="button-retry-lesson"
                >
                  Try Again
                </Button>
              )}
              <Button
                onClick={() => navigate(backPath)}
                variant={submitMutation.data?.passed ? "default" : "outline"}
                className="flex-1"
                data-testid="button-back-to-study-plan-from-results"
              >
                {backLabel}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Link href={`/app/${examTrack}/lessons`}>
            <Button variant="ghost" size="sm" data-testid="button-back-to-study-plan-header">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <div className="text-right">
            <p className="text-sm font-medium">{lesson.domain}</p>
            <p className="text-xs text-muted-foreground">Week {lesson.week}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">{lesson.title}</span>
            <span className="text-muted-foreground">
              {currentQuestionIndex + 1} / {questions.length}
            </span>
          </div>
          <Progress value={progress} data-testid="progress-lesson" />
        </div>

        {/* Last Attempt Banner — shows when user has a previous attempt stored */}
        {storedResults && storedResults.length > 0 && storedPercentage !== null && (
          <div className="flex items-center justify-between gap-3 px-4 py-2.5 rounded-lg border border-border bg-muted/40">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <History className="h-4 w-4 shrink-0" />
              <span>Last attempt: <span className="font-semibold text-foreground">{storedPercentage}%</span> — {storedResults.filter(r => r.isCorrect).length}/{storedResults.length} correct</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowLastAttempt(true)}
              className="text-xs gap-1 shrink-0"
              data-testid="button-review-last-attempt"
            >
              <Eye className="h-3.5 w-3.5" />
              Review
            </Button>
          </div>
        )}

        {/* Lesson Content Card */}
        <Card>
          <CardHeader>
            <CardTitle>{lesson.title}</CardTitle>
            <p className="text-sm text-muted-foreground">{lesson.description}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-base leading-relaxed" data-testid="text-lesson-content">
                {lesson.content}
              </p>
            </div>
            
            {lesson.practicalProblem && (
              <div className="mt-4 p-4 border rounded-lg bg-muted/50">
                <h3 className="font-semibold text-sm mb-2">Real-World Application</h3>
                <p className="text-sm leading-relaxed text-muted-foreground" data-testid="text-practical-problem">
                  {lesson.practicalProblem}
                </p>
              </div>
            )}
            
            {/* See Also: Reference Manuals */}
            {lessonId && getAllLessonReferences(lessonId).length > 0 && (
              <div className="mt-4 p-4 border rounded-lg bg-primary/5">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="h-4 w-4 text-primary" />
                  <h3 className="font-semibold text-sm">See Also: Reference Manuals</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {getAllLessonReferences(lessonId).map((ref: BookReference, idx: number) => (
                    <Badge 
                      key={idx} 
                      variant="outline" 
                      className="text-xs whitespace-normal"
                      data-testid={`badge-reference-${idx}`}
                    >
                      {ref.bookId === "SRM" ? "SRM" : "ES"} Ch. {ref.chapter}: {ref.chapterTitle}
                    </Badge>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  For deeper understanding, review these chapters in your reference manual or Elementary Surveying textbook.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Question Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Question {currentQuestionIndex + 1}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-lg" data-testid={`text-question-${currentQuestionIndex}`}>
              {currentQuestion.questionText}
            </p>

            {/* Multiple Choice */}
            {currentQuestion.questionType === "multiple_choice" && currentQuestion.options && (
              <div className="space-y-3">
                {(() => {
                  // Use shuffled options if available, otherwise use original
                  const displayOptions = currentShuffledData?.options ?? (currentQuestion.options as string[]);
                  const storedAnswer = answers[currentQuestion.id];
                  
                  return displayOptions.map((option, shuffledIndex) => {
                    // Map stored original answer back to shuffled index for display
                    const originalIndex = currentShuffledData?.shuffledToOriginal?.[shuffledIndex] ?? shuffledIndex;
                    const isSelected = storedAnswer === originalIndex;
                    
                    return (
                      <Button
                        key={shuffledIndex}
                        variant={isSelected ? "default" : "outline"}
                        className="w-full justify-start text-left h-auto py-3 px-4"
                        onClick={() => handleMultipleChoiceAnswer(shuffledIndex)}
                        data-testid={`button-option-${shuffledIndex}`}
                      >
                        <span className="font-medium mr-3">{String.fromCharCode(65 + shuffledIndex)}.</span>
                        {option}
                      </Button>
                    );
                  });
                })()}
              </div>
            )}

            {/* Fill in the Blank */}
            {currentQuestion.questionType === "fill_in_blank" && (
              <Input
                placeholder="Type your answer..."
                value={answers[currentQuestion.id] || ""}
                onChange={(e) => handleAnswer(e.target.value)}
                data-testid="input-fill-in-blank"
              />
            )}

            {/* Drag and Drop - Simple version for now */}
            {currentQuestion.questionType === "drag_drop" && currentQuestion.options && (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">Arrange the items in the correct order:</p>
                {(Array.isArray(currentQuestion.options) 
                  ? currentQuestion.options 
                  : (currentQuestion.options as { items: string[] })?.items || []
                ).map((item: string, index: number) => (
                  <div
                    key={index}
                    className="p-3 border rounded-md bg-card hover-elevate cursor-move"
                    data-testid={`drag-item-${index}`}
                  >
                    {item}
                  </div>
                ))}
                <p className="text-xs text-muted-foreground italic">
                  Drag-and-drop functionality coming soon. For now, this lesson requires the full feature.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between gap-4">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            data-testid="button-previous-question"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          {currentQuestionIndex < questions.length - 1 ? (
            <Button
              onClick={handleNext}
              disabled={!canProceed}
              data-testid="button-next-question"
            >
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!allAnswered || submitted}
              data-testid="button-submit-lesson"
            >
              {submitMutation.isPending ? "Submitting..." : "Submit Lesson"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
