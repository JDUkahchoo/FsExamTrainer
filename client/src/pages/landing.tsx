import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Brain, 
  Target, 
  Award, 
  BarChart3, 
  Clock,
  CheckCircle2,
  Layers,
  Zap,
  CalendarDays
} from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <Badge className="mb-4" variant="outline">
            NCEES FS & PS Exam Preparation
          </Badge>
          <h1 className="text-5xl font-bold text-foreground mb-6" data-testid="heading-landing">
            Master the Fundamentals of Surveying Exam
          </h1>
          <p className="text-xl text-muted-foreground mb-4 max-w-2xl mx-auto">
            A comprehensive, adaptive study guide for the NCEES FS and PS exams — built around your schedule, not a fixed timeline.
          </p>
          <p className="text-base text-muted-foreground mb-8 max-w-2xl mx-auto">
            Whether you have 8 weeks or 2 years, the guide adapts to your exam date, study pace, and weak areas with personalized plans, 800+ practice questions, spaced repetition flashcards, and full-length exam simulations.
          </p>
          <Button 
            size="lg" 
            onClick={() => window.location.href = '/api/login'}
            className="text-lg px-8 py-6"
            data-testid="button-login"
          >
            Start Studying Now
          </Button>
        </div>

        {/* Study Plan Modes Highlight */}
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-2xl font-bold text-center mb-2">Study on Your Terms</h2>
          <p className="text-muted-foreground text-center mb-6 text-sm">Choose the plan that fits your life — switch modes any time.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { label: 'Standard', detail: '16 weeks · ~8 hrs/week', icon: '📅' },
              { label: 'Working Professional', detail: 'Flexible · ~4–6 hrs/week', icon: '💼' },
              { label: 'Result-Driven', detail: 'Intensive · ~12+ hrs/week', icon: '🎯' },
              { label: 'Long-Term Pathway', detail: 'Up to 24 months · 4 phases', icon: '🗺️' },
            ].map((mode) => (
              <div key={mode.label} className="flex flex-col items-center text-center p-4 bg-card rounded-lg border border-border gap-1">
                <span className="text-2xl mb-1">{mode.icon}</span>
                <span className="font-semibold text-sm">{mode.label}</span>
                <span className="text-xs text-muted-foreground">{mode.detail}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
              <CalendarDays className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Adaptive Study Plans</h3>
            <p className="text-muted-foreground">
              Plans adapt to your exam date and pretest scores — prioritizing your weak domains first across all study modes.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success/10 mb-4">
              <Brain className="h-6 w-6 text-success" />
            </div>
            <h3 className="text-xl font-semibold mb-2">800+ Practice Questions</h3>
            <p className="text-muted-foreground">
              Domain quizzes, mixed exams, weak-area drills, and full 110-question practice exams across all NCEES domains.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-domain-computations/10 mb-4">
              <Target className="h-6 w-6 text-domain-computations-fg" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Spaced Repetition Flashcards</h3>
            <p className="text-muted-foreground">
              Hundreds of flashcards using the SM-2 algorithm to surface the cards you're most likely to forget before exam day.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-domain-boundary/10 mb-4">
              <Clock className="h-6 w-6 text-domain-boundary-fg" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Full Exam Simulator</h3>
            <p className="text-muted-foreground">
              Timed full-length exams with domain breakdowns, score analysis, and detailed explanations for every question.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-domain-field/10 mb-4">
              <BarChart3 className="h-6 w-6 text-domain-field-fg" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Progress & Analytics</h3>
            <p className="text-muted-foreground">
              Track streaks, domain mastery, quiz accuracy, forgetting curve health, and predicted weak areas over time.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-domain-geodesy/10 mb-4">
              <Zap className="h-6 w-6 text-domain-geodesy-fg" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Gamified Learning</h3>
            <p className="text-muted-foreground">
              XP system, ranks, daily quests, streaks, and a leaderboard to keep your study momentum going week after week.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">60+ Interactive Readings</h3>
            <p className="text-muted-foreground">
              In-depth study readings with embedded formulas, worked examples, knowledge checks, and textbook cross-references.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success/10 mb-4">
              <Layers className="h-6 w-6 text-success" />
            </div>
            <h3 className="text-xl font-semibold mb-2">FS & PS Exam Tracks</h3>
            <p className="text-muted-foreground">
              Separate, isolated tracks for both the Fundamentals of Surveying and Professional Surveying exams with tailored content.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-domain-geodesy/10 mb-4">
              <Award className="h-6 w-6 text-domain-geodesy-fg" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Synced Across Devices</h3>
            <p className="text-muted-foreground">
              All progress, notes, quiz history, and flashcard schedules automatically saved and available anywhere you study.
            </p>
          </Card>
        </div>

        {/* Domains Covered */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-2">All NCEES FS Domains Covered</h2>
          <p className="text-center text-muted-foreground mb-8 text-sm">Complete content coverage — no domain left behind.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'Math & Basic Science',
              'Field Data Acquisition & Reduction',
              'Mapping, GIS, and CAD',
              'Boundary Law & PLSS',
              'Surveying Principles',
              'Survey Computations & Applications',
              'Professional Practice',
              'Basic Sciences & Historical Methods',
            ].map((domain) => (
              <div key={domain} className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border">
                <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0" />
                <span className="font-medium">{domain}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Card className="p-8 bg-primary/5 border-primary/20 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Ready to Start Your FS Exam Preparation?</h3>
            <p className="text-muted-foreground mb-6">
              Study at your own pace, on your own schedule — this guide works around your life, not the other way around.
            </p>
            <Button 
              size="lg" 
              onClick={() => window.location.href = '/api/login'}
              data-testid="button-login-cta"
            >
              Get Started Free
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
