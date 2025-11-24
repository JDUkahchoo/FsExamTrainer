import { useState, useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { ArrowLeft, ArrowRight, CheckCircle2, XCircle, Trophy } from "lucide-react";
import { Link } from "wouter";

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
  const [, params] = useRoute("/lesson/:id");
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const lessonId = params?.id;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<QuestionResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());

  const { data: lessonData, isLoading } = useQuery<LessonData>({
    queryKey: ["/api/lessons", lessonId],
    enabled: !!lessonId,
  });

  const submitMutation = useMutation({
    mutationFn: async (data: { answers: Record<string, any>; timeSpentSeconds: number }) => {
      const response = await apiRequest('POST', `/api/lessons/${lessonId}/submit`, data);
      return await response.json() as SubmitResponse;
    },
    onSuccess: (data) => {
      setResults(data.results);
      setShowResults(true);
      queryClient.invalidateQueries({ queryKey: ["/api/lessons/progress"] });
      queryClient.invalidateQueries({ queryKey: ["/api/progress/stats"] });
      
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
              onClick={() => navigate("/study-plan")}
              data-testid="button-back-to-study-plan"
            >
              Back to Study Plan
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
              onClick={() => navigate("/study-plan")}
              data-testid="button-back-to-study-plan"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Study Plan
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleAnswer = (value: any) => {
    setAnswers({ ...answers, [currentQuestion.id]: value });
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
    const timeSpentSeconds = Math.floor((Date.now() - startTime) / 1000);
    submitMutation.mutate({ answers, timeSpentSeconds });
    setSubmitted(true);
  };

  const canProceed = answers[currentQuestion?.id] !== undefined && answers[currentQuestion?.id] !== "";
  const allAnswered = questions.every((q) => answers[q.id] !== undefined && answers[q.id] !== "");

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

            <div className="space-y-4">
              <h3 className="font-semibold">Question Review</h3>
              {results.map((result, index) => {
                const question = questions[index];
                
                // Helper function to format answer based on question type
                const formatAnswer = (answer: any, questionType: QuestionType, options?: any) => {
                  try {
                    if (questionType === 'multiple_choice') {
                      // Ensure options is an array (handle if it's a string or undefined)
                      const optionsArray = Array.isArray(options) 
                        ? options 
                        : typeof options === 'string' 
                          ? JSON.parse(options)
                          : [];
                      
                      if (optionsArray.length > 0 && answer !== undefined && answer !== null) {
                        const answerIndex = parseInt(String(answer), 10);
                        if (!isNaN(answerIndex) && answerIndex < optionsArray.length) {
                          return optionsArray[answerIndex];
                        }
                      }
                      return `Option ${answer}`;
                    } else if (questionType === 'fill_in_blank') {
                      return String(answer || '');
                    } else if (questionType === 'drag_drop') {
                      return Array.isArray(answer) ? answer.join(', ') : String(answer || '');
                    }
                    return String(answer || '');
                  } catch (error) {
                    console.error('Error formatting answer:', error);
                    return String(answer || '');
                  }
                };

                return (
                  <Card key={result.questionId} className={result.isCorrect ? "border-green-500" : "border-red-500"}>
                    <CardContent className="pt-6 space-y-2">
                      <div className="flex items-start gap-2">
                        {result.isCorrect ? (
                          <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                        )}
                        <div className="flex-1">
                          <p className="font-medium">Question {index + 1}</p>
                          <p className="text-sm text-muted-foreground mt-1">{question.questionText}</p>
                          
                          {!result.isCorrect && (
                            <div className="mt-2 space-y-1">
                              <p className="text-sm">
                                <span className="font-medium">Your answer:</span>{" "}
                                <span className="text-red-500">{formatAnswer(result.userAnswer, question.questionType, question.options)}</span>
                              </p>
                              <p className="text-sm">
                                <span className="font-medium">Correct answer:</span>{" "}
                                <span className="text-green-500">{formatAnswer(result.correctAnswer, question.questionType, question.options)}</span>
                              </p>
                            </div>
                          )}
                          
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
                onClick={() => navigate("/study-plan")}
                variant={submitMutation.data?.passed ? "default" : "outline"}
                className="flex-1"
                data-testid="button-back-to-study-plan-from-results"
              >
                Back to Study Plan
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
          <Link href="/study-plan">
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
                {Array.isArray(currentQuestion.options) && (currentQuestion.options as string[]).map((option, index) => (
                  <Button
                    key={index}
                    variant={answers[currentQuestion.id] === index ? "default" : "outline"}
                    className="w-full justify-start text-left h-auto py-3 px-4"
                    onClick={() => handleAnswer(index)}
                    data-testid={`button-option-${index}`}
                  >
                    <span className="font-medium mr-3">{String.fromCharCode(65 + index)}.</span>
                    {option}
                  </Button>
                ))}
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
