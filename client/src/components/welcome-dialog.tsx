import { useState, useEffect } from 'react';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Target, BookOpen, TrendingUp } from 'lucide-react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useLocation } from 'wouter';
import type { UserPreferences } from '@shared/schema';

export function WelcomeDialog() {
  const [, setLocation] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // Fetch user preferences
  const { data: preferences, isLoading } = useQuery<UserPreferences>({
    queryKey: ['/api/preferences'],
  });

  // Mutation to update preferences
  const updatePreferencesMutation = useMutation({
    mutationFn: (data: Partial<UserPreferences>) =>
      apiRequest('PUT', '/api/preferences', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/preferences'] });
    }
  });

  // Show welcome dialog if user hasn't seen it and hasn't completed pretest
  useEffect(() => {
    if (preferences && !preferences.hasSeenWelcome && !preferences.hasCompletedPretest) {
      setIsOpen(true);
    }
  }, [preferences]);

  const handleTakePretest = async () => {
    await updatePreferencesMutation.mutateAsync({ hasSeenWelcome: true });
    setIsOpen(false);
    setLocation('/pretest');
  };

  const handleSkip = async () => {
    await updatePreferencesMutation.mutateAsync({ 
      hasSeenWelcome: true,
      studyMode: 'standard'
    });
    setIsOpen(false);
  };

  if (isLoading) {
    return null;
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="max-w-2xl">
        <AlertDialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 rounded-lg bg-primary/10">
              <Target className="w-8 h-8 text-primary" />
            </div>
            <div>
              <AlertDialogTitle className="text-2xl">Welcome to the FS Exam Study Guide!</AlertDialogTitle>
              <AlertDialogDescription>
                Your personalized path to becoming a licensed surveyor
              </AlertDialogDescription>
            </div>
          </div>
        </AlertDialogHeader>

        <div className="space-y-4 py-4">
          <p className="text-muted-foreground">
            To give you the best learning experience, we recommend starting with a quick diagnostic test. 
            This helps us understand your current knowledge level and create a study plan tailored to your needs.
          </p>

          <div className="grid gap-3 p-4 bg-muted rounded-lg">
            <div className="flex items-start gap-3">
              <Target className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <div className="font-semibold mb-1">Take the Diagnostic Pretest</div>
                <div className="text-sm text-muted-foreground">
                  28 questions covering all 7 NCEES domains (~20 minutes)
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <div className="font-semibold mb-1">Get Personalized Recommendations</div>
                <div className="text-sm text-muted-foreground">
                  See your strengths and focus areas with detailed performance analysis
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <div className="font-semibold mb-1">Choose Your Study Path</div>
                <div className="text-sm text-muted-foreground">
                  Select from Standard, Personalized, or Self-Directed learning approaches
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
            <Badge variant="outline">Optional</Badge>
            <span className="text-sm text-blue-800 dark:text-blue-200">
              You can always take the pretest later from the Progress dashboard
            </span>
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel 
            onClick={handleSkip}
            data-testid="button-skip-welcome"
          >
            Skip for Now
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleTakePretest}
            data-testid="button-take-pretest-welcome"
          >
            Take Diagnostic Test
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
