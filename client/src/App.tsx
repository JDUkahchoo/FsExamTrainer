import { ReactNode, ComponentType, useEffect, useCallback } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient, setSessionExpiredCallback, isSessionExpiredRedirectSuppressed } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { WelcomeDialog } from "@/components/welcome-dialog";
import { ExamTrackProvider } from "@/contexts/exam-track-context";
import { ExamLayout } from "@/components/exam-layout";
import { ErrorBoundary } from "@/components/error-boundary";
import { useAuth } from "@/hooks/useAuth";
import Landing from "@/pages/landing";
import GettingStartedPage from "@/pages/getting-started";
import FeedbackPage from "@/pages/feedback";
import TestimonialsPage from "@/pages/testimonials";
import PrivacyPolicyPage from "@/pages/privacy-policy";
import DisclaimerPage from "@/pages/disclaimer";
import NotFound from "@/pages/not-found";

import ExamDashboard from "@/pages/exam-dashboard";
import StudyPlan from "@/pages/study-plan";
import LessonsPage from "@/pages/lessons";
import PracticeQuizPage from "@/pages/practice-quiz";
import FlashcardsPage from "@/pages/flashcards";
import PracticeExamPage from "@/pages/practice-exam";
import NotesPage from "@/pages/notes";
import ProgressPage from "@/pages/progress";
import ResourcesPage from "@/pages/resources";
import PretestPage from "@/pages/pretest";
import PretestResultsPage from "@/pages/pretest-results";
import LessonPage from "@/pages/lesson";
import ReferenceCompanionPage from "@/pages/reference-companion";
import SettingsPage from "@/pages/settings";
import ProceduresPage from "@/pages/procedures";
import FormulaReferencePage from "@/pages/formula-reference";
import StudyReadingsPage from "@/pages/study-readings";
import StudyReadingPage from "@/pages/study-reading";
import WeakAreaDrillPage from "@/pages/weak-area-drill";
import ScientificCalculatorPage from "@/pages/scientific-calculator";

function ExamPage({ children, examTrack }: { children: ReactNode; examTrack: 'fs' | 'ps' | 'tx' }) {
  return (
    <ExamLayout examTrack={examTrack}>
      <ExamTrackProvider examTrackOverride={examTrack}>
        {children}
      </ExamTrackProvider>
    </ExamLayout>
  );
}

function withExamTrack(Component: ComponentType<any>, examTrack: 'fs' | 'ps' | 'tx') {
  return function WrappedComponent(props: any) {
    return (
      <ExamPage examTrack={examTrack}>
        <Component {...props} />
      </ExamPage>
    );
  };
}

function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Switch>
        <Route path="/" component={Landing} />
        <Route component={NotFound} />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/" component={GettingStartedPage} />
      <Route path="/getting-started" component={GettingStartedPage} />
      <Route path="/feedback" component={FeedbackPage} />
      <Route path="/testimonials" component={TestimonialsPage} />
      <Route path="/privacy" component={PrivacyPolicyPage} />
      <Route path="/disclaimer" component={DisclaimerPage} />
      
      <Route path="/app/fs/dashboard" component={withExamTrack(ExamDashboard, 'fs')} />
      <Route path="/app/fs/study-plan" component={withExamTrack(StudyPlan, 'fs')} />
      <Route path="/app/fs/lessons" component={withExamTrack(LessonsPage, 'fs')} />
      <Route path="/app/fs/lesson/:id" component={withExamTrack(LessonPage, 'fs')} />
      <Route path="/app/fs/readings" component={withExamTrack(StudyReadingsPage, 'fs')} />
      <Route path="/app/fs/readings/:id" component={withExamTrack(StudyReadingPage, 'fs')} />
      <Route path="/app/fs/quiz" component={withExamTrack(PracticeQuizPage, 'fs')} />
      <Route path="/app/fs/drill" component={withExamTrack(WeakAreaDrillPage, 'fs')} />
      <Route path="/app/fs/flashcards" component={withExamTrack(FlashcardsPage, 'fs')} />
      <Route path="/app/fs/exam" component={withExamTrack(PracticeExamPage, 'fs')} />
      <Route path="/app/fs/notes" component={withExamTrack(NotesPage, 'fs')} />
      <Route path="/app/fs/progress" component={withExamTrack(ProgressPage, 'fs')} />
      <Route path="/app/fs/resources" component={withExamTrack(ResourcesPage, 'fs')} />
      <Route path="/app/fs/reference-companion" component={withExamTrack(ReferenceCompanionPage, 'fs')} />
      <Route path="/app/fs/procedures" component={withExamTrack(ProceduresPage, 'fs')} />
      <Route path="/app/fs/formulas" component={withExamTrack(FormulaReferencePage, 'fs')} />
      <Route path="/app/fs/calculators/scientific" component={withExamTrack(ScientificCalculatorPage, 'fs')} />
      <Route path="/app/fs/pretest" component={withExamTrack(PretestPage, 'fs')} />
      <Route path="/app/fs/pretest/results" component={withExamTrack(PretestResultsPage, 'fs')} />
      <Route path="/app/fs/settings" component={withExamTrack(SettingsPage, 'fs')} />
      <Route path="/app/fs/testimonials" component={withExamTrack(TestimonialsPage, 'fs')} />
      <Route path="/app/fs/feedback" component={withExamTrack(FeedbackPage, 'fs')} />
      <Route path="/app/fs/privacy" component={withExamTrack(PrivacyPolicyPage, 'fs')} />
      <Route path="/app/fs/disclaimer" component={withExamTrack(DisclaimerPage, 'fs')} />
      
      <Route path="/app/ps/dashboard" component={withExamTrack(ExamDashboard, 'ps')} />
      <Route path="/app/ps/study-plan" component={withExamTrack(StudyPlan, 'ps')} />
      <Route path="/app/ps/lessons" component={withExamTrack(LessonsPage, 'ps')} />
      <Route path="/app/ps/lesson/:id" component={withExamTrack(LessonPage, 'ps')} />
      <Route path="/app/ps/readings" component={withExamTrack(StudyReadingsPage, 'ps')} />
      <Route path="/app/ps/readings/:id" component={withExamTrack(StudyReadingPage, 'ps')} />
      <Route path="/app/ps/quiz" component={withExamTrack(PracticeQuizPage, 'ps')} />
      <Route path="/app/ps/drill" component={withExamTrack(WeakAreaDrillPage, 'ps')} />
      <Route path="/app/ps/flashcards" component={withExamTrack(FlashcardsPage, 'ps')} />
      <Route path="/app/ps/exam" component={withExamTrack(PracticeExamPage, 'ps')} />
      <Route path="/app/ps/notes" component={withExamTrack(NotesPage, 'ps')} />
      <Route path="/app/ps/progress" component={withExamTrack(ProgressPage, 'ps')} />
      <Route path="/app/ps/resources" component={withExamTrack(ResourcesPage, 'ps')} />
      <Route path="/app/ps/reference-companion" component={withExamTrack(ReferenceCompanionPage, 'ps')} />
      <Route path="/app/ps/procedures" component={withExamTrack(ProceduresPage, 'ps')} />
      <Route path="/app/ps/formulas" component={withExamTrack(FormulaReferencePage, 'ps')} />
      <Route path="/app/ps/calculators/scientific" component={withExamTrack(ScientificCalculatorPage, 'ps')} />
      <Route path="/app/ps/pretest" component={withExamTrack(PretestPage, 'ps')} />
      <Route path="/app/ps/pretest/results" component={withExamTrack(PretestResultsPage, 'ps')} />
      <Route path="/app/ps/settings" component={withExamTrack(SettingsPage, 'ps')} />
      <Route path="/app/ps/testimonials" component={withExamTrack(TestimonialsPage, 'ps')} />
      <Route path="/app/ps/feedback" component={withExamTrack(FeedbackPage, 'ps')} />
      <Route path="/app/ps/privacy" component={withExamTrack(PrivacyPolicyPage, 'ps')} />
      <Route path="/app/ps/disclaimer" component={withExamTrack(DisclaimerPage, 'ps')} />

      {/* Texas State-Specific track (no Lessons — built around NCEES domains) */}
      <Route path="/app/tx/dashboard" component={withExamTrack(ExamDashboard, 'tx')} />
      <Route path="/app/tx/study-plan" component={withExamTrack(StudyPlan, 'tx')} />
      <Route path="/app/tx/readings" component={withExamTrack(StudyReadingsPage, 'tx')} />
      <Route path="/app/tx/readings/:id" component={withExamTrack(StudyReadingPage, 'tx')} />
      <Route path="/app/tx/quiz" component={withExamTrack(PracticeQuizPage, 'tx')} />
      <Route path="/app/tx/drill" component={withExamTrack(WeakAreaDrillPage, 'tx')} />
      <Route path="/app/tx/flashcards" component={withExamTrack(FlashcardsPage, 'tx')} />
      <Route path="/app/tx/exam" component={withExamTrack(PracticeExamPage, 'tx')} />
      <Route path="/app/tx/notes" component={withExamTrack(NotesPage, 'tx')} />
      <Route path="/app/tx/progress" component={withExamTrack(ProgressPage, 'tx')} />
      <Route path="/app/tx/reference-companion" component={withExamTrack(ReferenceCompanionPage, 'tx')} />
      <Route path="/app/tx/procedures" component={withExamTrack(ProceduresPage, 'tx')} />
      <Route path="/app/tx/formulas" component={withExamTrack(FormulaReferencePage, 'tx')} />
      <Route path="/app/tx/calculators/scientific" component={withExamTrack(ScientificCalculatorPage, 'tx')} />
      <Route path="/app/tx/settings" component={withExamTrack(SettingsPage, 'tx')} />
      <Route path="/app/tx/testimonials" component={withExamTrack(TestimonialsPage, 'tx')} />
      <Route path="/app/tx/feedback" component={withExamTrack(FeedbackPage, 'tx')} />
      <Route path="/app/tx/privacy" component={withExamTrack(PrivacyPolicyPage, 'tx')} />
      <Route path="/app/tx/disclaimer" component={withExamTrack(DisclaimerPage, 'tx')} />
      
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppContent />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

function AppContent() {
  const { isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const handleSessionExpired = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
    // If a page has suppressed the redirect (e.g. active quiz), only show the
    // toast — the page is responsible for its own re-auth prompt.
    if (isSessionExpiredRedirectSuppressed()) {
      toast({
        title: "Session expired",
        description: "Your session expired. Please re-authenticate to continue saving progress.",
        variant: "destructive",
        duration: 8000,
      });
      return;
    }
    toast({
      title: "Session expired",
      description: "Your login session has expired. Please log in again to continue.",
      variant: "destructive",
      duration: 8000,
    });
    setTimeout(() => {
      setLocation("/api/login");
    }, 2000);
  }, [toast, setLocation]);

  useEffect(() => {
    setSessionExpiredCallback(handleSessionExpired);
  }, [handleSessionExpired]);

  useEffect(() => {
    if (sessionStorage.getItem('_fc_cov_cleaned')) return;
    const staleKeys: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('fc-coverage-celebrated:')) {
        staleKeys.push(key);
      }
    }
    staleKeys.forEach(k => localStorage.removeItem(k));
    sessionStorage.setItem('_fc_cov_cleaned', '1');
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Router />;
  }

  return (
    <>
      <WelcomeDialog />
      <ErrorBoundary>
        <Router />
      </ErrorBoundary>
    </>
  );
}
