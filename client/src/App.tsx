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

function ExamRoutes() {
  return (
    <ExamLayout>
      <ExamTrackProvider>
        <Switch>
          <Route path="/app/:examTrack/dashboard" component={ExamDashboard} />
          <Route path="/app/:examTrack/study-plan" component={StudyPlan} />
          <Route path="/app/:examTrack/lessons" component={LessonsPage} />
          <Route path="/app/:examTrack/quiz" component={PracticeQuizPage} />
          <Route path="/app/:examTrack/flashcards" component={FlashcardsPage} />
          <Route path="/app/:examTrack/exam" component={PracticeExamPage} />
          <Route path="/app/:examTrack/notes" component={NotesPage} />
          <Route path="/app/:examTrack/progress" component={ProgressPage} />
          <Route path="/app/:examTrack/resources" component={ResourcesPage} />
          <Route path="/app/:examTrack/reference-companion" component={ReferenceCompanionPage} />
          <Route path="/app/:examTrack/pretest" component={PretestPage} />
          <Route path="/app/:examTrack/pretest/results" component={PretestResultsPage} />
          <Route path="/app/:examTrack/lesson/:id" component={LessonPage} />
          <Route path="/app/:examTrack/settings" component={SettingsPage} />
          <Route component={NotFound} />
        </Switch>
      </ExamTrackProvider>
    </ExamLayout>
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

  return (
    <Switch>
      {!isAuthenticated ? (
        <Route path="/" component={Landing} />
      ) : (
        <>
          <Route path="/" component={GettingStartedPage} />
          <Route path="/getting-started" component={GettingStartedPage} />
          <Route path="/feedback" component={FeedbackPage} />
          <Route path="/testimonials" component={TestimonialsPage} />
          <Route path="/privacy" component={PrivacyPolicyPage} />
          <Route path="/disclaimer" component={DisclaimerPage} />
          <Route path="/app/:examTrack/:rest*" component={ExamRoutes} />
        </>
      )}
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
