import { ReactNode } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { WelcomeDialog } from "@/components/welcome-dialog";
import { ExamTrackProvider } from "@/contexts/exam-track-context";
import { ExamLayout } from "@/components/exam-layout";
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

function ExamPage({ children, examTrack }: { children: ReactNode; examTrack: 'fs' | 'ps' }) {
  return (
    <ExamLayout>
      <ExamTrackProvider examTrackOverride={examTrack}>
        {children}
      </ExamTrackProvider>
    </ExamLayout>
  );
}

function ExamRoutes({ examTrack }: { examTrack: string }) {
  const track = (examTrack === 'ps' ? 'ps' : 'fs') as 'fs' | 'ps';
  return (
    <ExamPage examTrack={track}>
      <Switch>
        <Route path="/dashboard" component={ExamDashboard} />
        <Route path="/study-plan" component={StudyPlan} />
        <Route path="/lessons" component={LessonsPage} />
        <Route path="/lesson/:id" component={LessonPage} />
        <Route path="/quiz" component={PracticeQuizPage} />
        <Route path="/flashcards" component={FlashcardsPage} />
        <Route path="/exam" component={PracticeExamPage} />
        <Route path="/notes" component={NotesPage} />
        <Route path="/progress" component={ProgressPage} />
        <Route path="/resources" component={ResourcesPage} />
        <Route path="/reference-companion" component={ReferenceCompanionPage} />
        <Route path="/pretest" component={PretestPage} />
        <Route path="/pretest/results" component={PretestResultsPage} />
        <Route path="/settings" component={SettingsPage} />
        <Route component={NotFound} />
      </Switch>
    </ExamPage>
  );
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
      <Route path="/app/:examTrack" nest>
        {(params) => <ExamRoutes examTrack={params.examTrack || 'fs'} />}
      </Route>
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
      <Router />
    </>
  );
}
