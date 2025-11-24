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
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import type { UserPreferences } from '@shared/schema';
import { BookOpen, TrendingUp, Target, Zap, Clock, BarChart3, CheckCircle2, ArrowRight } from 'lucide-react';

type Step = 'welcome' | 'study-modes' | 'pretest-guide' | 'dashboard' | 'features';

export function GettingStartedOnboarding() {
  const [step, setStep] = useState<Step>('welcome');
  const [isOpen, setIsOpen] = useState(false);

  const { data: preferences, isLoading } = useQuery<UserPreferences>({
    queryKey: ['/api/preferences'],
    refetchOnMount: 'always',
    staleTime: 0
  });

  const updatePreferencesMutation = useMutation({
    mutationFn: (data: Partial<UserPreferences>) =>
      apiRequest('PUT', '/api/preferences', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/preferences'] });
    }
  });

  // Show onboarding if user hasn't seen it yet
  useEffect(() => {
    if (!isLoading && preferences && !preferences.hasSeenWelcome) {
      setIsOpen(true);
    }
  }, [preferences, isLoading]);

  const handleNext = () => {
    const steps: Step[] = ['welcome', 'study-modes', 'pretest-guide', 'dashboard', 'features'];
    const currentIndex = steps.indexOf(step);
    if (currentIndex < steps.length - 1) {
      setStep(steps[currentIndex + 1]);
    }
  };

  const handlePrev = () => {
    const steps: Step[] = ['welcome', 'study-modes', 'pretest-guide', 'dashboard', 'features'];
    const currentIndex = steps.indexOf(step);
    if (currentIndex > 0) {
      setStep(steps[currentIndex - 1]);
    }
  };

  const handleComplete = async () => {
    await updatePreferencesMutation.mutateAsync({ hasSeenWelcome: true });
    setIsOpen(false);
  };

  const handleSkip = async () => {
    await updatePreferencesMutation.mutateAsync({ hasSeenWelcome: true });
    setIsOpen(false);
  };

  if (isLoading) return null;

  const stepNum = ['welcome', 'study-modes', 'pretest-guide', 'dashboard', 'features'].indexOf(step) + 1;
  const totalSteps = 5;

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
                  <div className="font-semibold">Welcome to Your FS Exam Journey</div>
                  <div className="text-sm text-muted-foreground">Master the Fundamentals of Surveying exam with our comprehensive study guide</div>
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-muted-foreground">
                  This interactive guide will help you understand how to use the app effectively. We'll cover:
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex gap-2 items-start">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>4 flexible study modes tailored to your schedule</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>How to take the diagnostic pretest and get personalized recommendations</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Navigate your dashboard and track progress</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Key features to accelerate your exam prep</span>
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
                  <div className="font-semibold">4 Flexible Study Modes</div>
                  <div className="text-sm text-muted-foreground">Choose what works best for your schedule</div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-muted rounded-lg">
                  <div className="font-semibold text-sm mb-1">Standard Mode</div>
                  <div className="text-sm text-muted-foreground">Balanced 16-week plan covering all 7 domains evenly. Best for: Structured learners with flexible schedules.</div>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <div className="font-semibold text-sm mb-1">Result-Driven Mode</div>
                  <div className="text-sm text-muted-foreground">Prioritizes weak domains from your pretest. Best for: Targeting specific knowledge gaps.</div>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <div className="font-semibold text-sm mb-1">Working Professional</div>
                  <div className="text-sm text-muted-foreground">Optimized for busy schedules (~1hr/day M-F + 2-3hrs weekends). Best for: Full-time professionals with limited study time.</div>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <div className="font-semibold text-sm mb-1">Custom Plan</div>
                  <div className="text-sm text-muted-foreground">Create your own timeline (8-16 weeks) and select domains. Best for: Complete control over study path.</div>
                </div>
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
                    💡 <strong>Tip:</strong> You can always retake the pretest later from the Progress dashboard if you want to measure improvement.
                  </p>
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
                    <div className="text-sm text-muted-foreground">68 Duolingo-style lessons covering all 7 domains</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg h-fit">
                    <Target className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">Practice Quizzes</div>
                    <div className="text-sm text-muted-foreground">116+ questions with detailed explanations</div>
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
                    <div className="font-semibold text-sm">Flashcards & Notes</div>
                    <div className="text-sm text-muted-foreground">50+ flashcards + rich text note-taking</div>
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
