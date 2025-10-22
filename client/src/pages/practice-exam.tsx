import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Clock, CheckCircle2, XCircle, PlayCircle, RotateCcw } from 'lucide-react';
import { getDomainConfig } from '@/lib/domains';
import { QUIZ_QUESTIONS } from '@shared/data/quizQuestions';
import { savePracticeExam } from '@/lib/localStorage';
import type { Domain } from '@shared/schema';

const EXAM_DURATION_MINUTES = 360; // 6 hours = 360 minutes
const TOTAL_QUESTIONS = 110;

export default function PracticeExamPage() {
  const [examStarted, setExamStarted] = useState(false);
  const [examCompleted, setExamCompleted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeRemaining, setTimeRemaining] = useState(EXAM_DURATION_MINUTES * 60); // in seconds
  const [examQuestions, setExamQuestions] = useState<typeof QUIZ_QUESTIONS>([]);

  // Generate exam questions when starting
  const startExam = () => {
    // Shuffle and select 110 questions
    const shuffled = [...QUIZ_QUESTIONS].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, Math.min(TOTAL_QUESTIONS, shuffled.length));
    setExamQuestions(selected);
    setExamStarted(true);
    setExamCompleted(false);
    setAnswers({});
    setCurrentQuestionIndex(0);
    setTimeRemaining(EXAM_DURATION_MINUTES * 60);
  };

  // Timer countdown
  useEffect(() => {
    if (!examStarted || examCompleted) return;

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
  }, [examStarted, examCompleted]);

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    setAnswers(prev => ({ ...prev, [questionIndex]: answerIndex }));
  };

  const handleSubmitExam = () => {
    setExamCompleted(true);
    
    // Calculate and save exam results
    const results = calculateResults();
    const timeSpent = Math.floor((EXAM_DURATION_MINUTES * 60 - timeRemaining) / 60);
    
    savePracticeExam({
      totalQuestions: results.total,
      correctAnswers: results.correct,
      timeSpentMinutes: timeSpent,
      domainScores: results.domainScores as any,
      completedAt: new Date().toISOString()
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

    examQuestions.forEach((question, index) => {
      const domain = question.domain as Domain;
      if (!domainScores[domain]) {
        domainScores[domain] = { correct: 0, total: 0 };
      }
      domainScores[domain].total++;

      if (answers[index] === question.correctAnswer) {
        correct++;
        domainScores[domain].correct++;
      }
    });

    return { correct, total: examQuestions.length, domainScores };
  };

  // Start screen
  if (!examStarted) {
    return (
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
    );
  }

  // Results screen
  if (examCompleted) {
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
            onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
            disabled={currentQuestionIndex === 0}
            data-testid="button-previous"
          >
            Previous
          </Button>
          
          {currentQuestionIndex < examQuestions.length - 1 ? (
            <Button
              onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
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
