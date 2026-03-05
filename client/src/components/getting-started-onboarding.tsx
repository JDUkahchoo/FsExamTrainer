import { useState, useEffect } from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import type { UserPreferences } from '@shared/schema';
import { BookOpen, TrendingUp, Target, Zap, Clock, BarChart3, CheckCircle2, ArrowRight, Calendar } from 'lucide-react';

type Step = 'welcome' | 'study-modes' | 'pretest-guide' | 'exam-target' | 'dashboard' | 'features';
const STEPS: Step[] = ['welcome', 'study-modes', 'pretest-guide', 'exam-target', 'dashboard', 'features'];

export function GettingStartedOnboarding() {
  const [step, setStep] = useState<Step>('welcome');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMode, setSelectedMode] = useState<string | null>(null);
  const [examDateValue, setExamDateValue] = useState('');
  const [weeklyHours, setWeeklyHours] = useState<number | null>(null);

  const { data: preferences, isLoading } = useQuery<UserPreferences>({
    queryKey: ['/api/preferences'],
    refetchOnMount: 'always',
    staleTime: 0
  });

  const updatePreferencesMutation = useMutation({
    mutationFn: (data: Partial<UserPreferences>) =>
      apiRequest('PATCH', '/api/preferences', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/preferences'] });
    }
  });

  useEffect(() => {
    if (!isLoading && preferences && !preferences.hasSeenWelcome) {
      setIsOpen(true);
      if (preferences.studyMode) setSelectedMode(preferences.studyMode);
    }
  }, [preferences, isLoading]);

  const handleNext = () => {
    const currentIndex = STEPS.indexOf(step);
    if (currentIndex < STEPS.length - 1) {
      setStep(STEPS[currentIndex + 1]);
    }
  };

  const handlePrev = () => {
    const currentIndex = STEPS.indexOf(step);
    if (currentIndex > 0) {
      setStep(STEPS[currentIndex - 1]);
    }
  };

  const handleSelectMode = (mode: string) => {
    setSelectedMode(mode);
    updatePreferencesMutation.mutate({ studyMode: mode });
  };

  const handleComplete = async () => {
    const updates: Partial<UserPreferences> = { hasSeenWelcome: true };
    if (examDateValue) {
      updates.examDate = new Date(examDateValue) as any;
    }
    if (weeklyHours !== null) {
      updates.weeklyHoursGoal = weeklyHours;
    }
    await updatePreferencesMutation.mutateAsync(updates);
    setIsOpen(false);
  };

  const handleSkip = async () => {
    await updatePreferencesMutation.mutateAsync({ hasSeenWelcome: true });
    setIsOpen(false);
  };

  if (isLoading) return null;

  const stepNum = STEPS.indexOf(step) + 1;
  const totalSteps = STEPS.length;

  const modeOptions = [
    { id: 'standard', label: 'Standard', desc: '16 weeks, ~8 hrs/week. Balanced coverage of all domains.' },
    { id: 'result-driven', label: 'Result-Driven', desc: 'Targets your weakest areas from the pretest first.' },
    { id: 'working-professional', label: 'Working Professional', desc: '~1hr/day M-F + weekends. Built for busy schedules.' },
    { id: 'custom', label: 'Custom Plan', desc: 'You set the timeline and domain priorities.' },
  ];

  const hoursOptions = [
    { label: '5-6 hrs/week', value: 5 },
    { label: '8-10 hrs/week', value: 9 },
    { label: '12-15 hrs/week', value: 13 },
    { label: '20+ hrs/week', value: 20 },
  ];

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <AlertDialogHeader>
          <div className="flex items-center justify-between mb-4">
            <AlertDialogTitle className="text-2xl">Getting Started</AlertDialogTitle>
            <Badge variant="outline">{stepNum}/{totalSteps}</Badge>
          </div>
          <div className="w-full bg-muted rounded-full h-1 mt-2">
            <div
              className="bg-primary h-1 rounded-full transition-all duration-300"
              style={{ width: `${(stepNum / totalSteps) * 100}%` }}
            />
          </div>
        </AlertDialogHeader>

        <div className="py-6 space-y-4">
          {step === 'welcome' && (
            <>
              <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-lg">
                <div className="p-3 bg-primary/20 rounded-lg">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">Welcome to Your Exam Journey</div>
                  <div className="text-sm text-muted-foreground">Your comprehensive study guide for the FS and PS surveying exams</div>
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-muted-foreground">
                  This short tour will help you get set up in about 2 minutes. We'll cover:
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex gap-2 items-start">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Choose the study mode that fits your schedule</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Set your exam date and study hours goal</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Take the diagnostic pretest for personalized recommendations</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Tour the dashboard and key study tools</span>
                  </li>
                </ul>
              </div>
            </>
          )}

          {step === 'study-modes' && (
            <>
              <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-lg">
                <div className="p-3 bg-primary/20 rounded-lg">
                  <Zap className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">Choose Your Study Mode</div>
                  <div className="text-sm text-muted-foreground">Pick the approach that matches your schedule. You can change it anytime in Settings.</div>
                </div>
              </div>
              <div className="space-y-2">
                {modeOptions.map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectMode(opt.id)}
                    className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                      selectedMode === opt.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border bg-muted hover:border-primary/50'
                    }`}
                    data-testid={`button-mode-${opt.id}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-semibold text-sm">{opt.label}</div>
                      {selectedMode === opt.id && <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />}
                    </div>
                    <div className="text-sm text-muted-foreground mt-0.5">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 'pretest-guide' && (
            <>
              <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-lg">
                <div className="p-3 bg-primary/20 rounded-lg">
                  <BarChart3 className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">Diagnostic Pretest</div>
                  <div className="text-sm text-muted-foreground">Get personalized recommendations</div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="font-semibold mb-2 flex items-center gap-2">
                    <Target className="w-4 h-4 text-primary" />
                    What You'll Learn
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Your current knowledge level in each of the 7 domains</li>
                    <li>• Specific areas where you're strong and where you need focus</li>
                    <li>• Domain-by-domain accuracy percentage</li>
                  </ul>
                </div>
                <div>
                  <div className="font-semibold mb-2 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    Time & Format
                  </div>
                  <p className="text-sm text-muted-foreground">28 questions across all domains • Approximately 20-25 minutes • Same format as the real exam</p>
                </div>
                <div className="p-3 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg">
                  <p className="text-sm text-amber-900 dark:text-amber-100">
                    💡 <strong>Tip:</strong> You can always retake the pretest later from the Progress dashboard to measure improvement.
                  </p>
                </div>
              </div>
            </>
          )}

          {step === 'exam-target' && (
            <>
              <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-lg">
                <div className="p-3 bg-primary/20 rounded-lg">
                  <Calendar className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">Set Your Exam Target</div>
                  <div className="text-sm text-muted-foreground">Help us keep you on track toward your exam date</div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="onboarding-exam-date">When is your exam? (optional)</Label>
                  <Input
                    id="onboarding-exam-date"
                    type="date"
                    value={examDateValue}
                    onChange={(e) => setExamDateValue(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    data-testid="input-onboarding-exam-date"
                  />
                  <p className="text-xs text-muted-foreground">Your dashboard will show a countdown once set.</p>
                </div>
                <div className="space-y-3">
                  <Label>How many hours per week can you study?</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {hoursOptions.map(opt => (
                      <button
                        key={opt.value}
                        onClick={() => setWeeklyHours(opt.value)}
                        className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                          weeklyHours === opt.value
                            ? 'border-primary bg-primary/5 text-primary'
                            : 'border-border hover:border-primary/50'
                        }`}
                        data-testid={`button-hours-${opt.value}`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {step === 'dashboard' && (
            <>
              <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-lg">
                <div className="p-3 bg-primary/20 rounded-lg">
                  <TrendingUp className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">Progress Dashboard</div>
                  <div className="text-sm text-muted-foreground">Track your learning journey</div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-muted rounded-lg">
                  <div className="font-semibold text-sm mb-1">Study Plan</div>
                  <div className="text-sm text-muted-foreground">Your weekly schedule with READ → FOCUS → APPLY → REINFORCE framework. Check off activities as you complete them.</div>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <div className="font-semibold text-sm mb-1">Progress Tab</div>
                  <div className="text-sm text-muted-foreground">View overall progress, domain mastery scores, study streaks, and achievement badges.</div>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <div className="font-semibold text-sm mb-1">Quick Stats</div>
                  <div className="text-sm text-muted-foreground">Your current pass rate estimate, domains that need focus, and time spent studying.</div>
                </div>
              </div>
            </>
          )}

          {step === 'features' && (
            <>
              <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-lg">
                <div className="p-3 bg-primary/20 rounded-lg">
                  <BookOpen className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">Key Features</div>
                  <div className="text-sm text-muted-foreground">Tools to accelerate your exam prep</div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg h-fit">
                    <BookOpen className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">Interactive Lessons</div>
                    <div className="text-sm text-muted-foreground">132 Duolingo-style lessons covering all domains</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg h-fit">
                    <Target className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">Practice Quizzes</div>
                    <div className="text-sm text-muted-foreground">822 questions with detailed explanations and 4-step problem-solving guidance</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg h-fit">
                    <Zap className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">Full Practice Exam</div>
                    <div className="text-sm text-muted-foreground">110-question timed exam with domain breakdown</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg h-fit">
                    <TrendingUp className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">Flashcards, Notes & PDF Export</div>
                    <div className="text-sm text-muted-foreground">Spaced repetition flashcards, rich note-taking, and downloadable PDF exports for offline study</div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <AlertDialogFooter className="flex justify-between gap-2">
          <div className="flex gap-2">
            {step !== 'welcome' && (
              <Button variant="outline" onClick={handlePrev} data-testid="button-onboarding-prev">
                Back
              </Button>
            )}
            <Button variant="outline" onClick={handleSkip} data-testid="button-onboarding-skip">
              Skip Tour
            </Button>
          </div>
          <div>
            {step === 'features' ? (
              <Button onClick={handleComplete} data-testid="button-onboarding-complete">
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={handleNext} data-testid="button-onboarding-next">
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
