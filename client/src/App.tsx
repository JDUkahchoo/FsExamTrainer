import { ReactNode, ComponentType } from "react";
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
import ProceduresPage from "@/pages/procedures";
import StudyReadingsPage from "@/pages/study-readings";
import StudyReadingPage from "@/pages/study-reading";

function ExamPage({ children, examTrack }: { children: ReactNode; examTrack: 'fs' | 'ps' }) {
  return (
    <ExamLayout examTrack={examTrack}>
      <ExamTrackProvider examTrackOverride={examTrack}>
        {children}
      </ExamTrackProvider>
    </ExamLayout>
  );
}

function withExamTrack(Component: ComponentType<any>, examTrack: 'fs' | 'ps') {
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
      <Route path="/app/fs/flashcards" component={withExamTrack(FlashcardsPage, 'fs')} />
      <Route path="/app/fs/exam" component={withExamTrack(PracticeExamPage, 'fs')} />
      <Route path="/app/fs/notes" component={withExamTrack(NotesPage, 'fs')} />
      <Route path="/app/fs/progress" component={withExamTrack(ProgressPage, 'fs')} />
      <Route path="/app/fs/resources" component={withExamTrack(ResourcesPage, 'fs')} />
      <Route path="/app/fs/reference-companion" component={withExamTrack(ReferenceCompanionPage, 'fs')} />
      <Route path="/app/fs/procedures" component={withExamTrack(ProceduresPage, 'fs')} />
      <Route path="/app/fs/pretest" component={withExamTrack(PretestPage, 'fs')} />
      <Route path="/app/fs/pretest/results" component={withExamTrack(PretestResultsPage, 'fs')} />
      <Route path="/app/fs/settings" component={withExamTrack(SettingsPage, 'fs')} />
      
      <Route path="/app/ps/dashboard" component={withExamTrack(ExamDashboard, 'ps')} />
      <Route path="/app/ps/study-plan" component={withExamTrack(StudyPlan, 'ps')} />
      <Route path="/app/ps/lessons" component={withExamTrack(LessonsPage, 'ps')} />
      <Route path="/app/ps/lesson/:id" component={withExamTrack(LessonPage, 'ps')} />
      <Route path="/app/ps/readings" component={withExamTrack(StudyReadingsPage, 'ps')} />
      <Route path="/app/ps/readings/:id" component={withExamTrack(StudyReadingPage, 'ps')} />
      <Route path="/app/ps/quiz" component={withExamTrack(PracticeQuizPage, 'ps')} />
      <Route path="/app/ps/flashcards" component={withExamTrack(FlashcardsPage, 'ps')} />
      <Route path="/app/ps/exam" component={withExamTrack(PracticeExamPage, 'ps')} />
      <Route path="/app/ps/notes" component={withExamTrack(NotesPage, 'ps')} />
      <Route path="/app/ps/progress" component={withExamTrack(ProgressPage, 'ps')} />
      <Route path="/app/ps/resources" component={withExamTrack(ResourcesPage, 'ps')} />
      <Route path="/app/ps/reference-companion" component={withExamTrack(ReferenceCompanionPage, 'ps')} />
      <Route path="/app/ps/procedures" component={withExamTrack(ProceduresPage, 'ps')} />
      <Route path="/app/ps/pretest" component={withExamTrack(PretestPage, 'ps')} />
      <Route path="/app/ps/pretest/results" component={withExamTrack(PretestResultsPage, 'ps')} />
      <Route path="/app/ps/settings" component={withExamTrack(SettingsPage, 'ps')} />
      
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
