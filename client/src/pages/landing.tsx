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
  CheckCircle2
} from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <Badge className="mb-4" variant="outline">
            NCEES FS Exam Preparation
          </Badge>
          <h1 className="text-5xl font-bold text-foreground mb-6" data-testid="heading-landing">
            Master the Fundamentals of Surveying Exam
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Your comprehensive study guide for the FS exam. Track progress, practice questions, 
            master flashcards, and simulate the full exam experience.
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

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">16-Week Study Plan</h3>
            <p className="text-muted-foreground">
              Structured weekly schedule covering all 7 NCEES domains with READ → FOCUS → APPLY → REINFORCE framework.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success/10 mb-4">
              <Brain className="h-6 w-6 text-success" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Practice Quizzes</h3>
            <p className="text-muted-foreground">
              25+ questions across all domains with instant feedback and detailed explanations.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-domain-computations/10 mb-4">
              <Target className="h-6 w-6 text-domain-computations-fg" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Flashcard System</h3>
            <p className="text-muted-foreground">
              50+ flashcards with spaced repetition tracking for formulas, definitions, and key concepts.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-domain-boundary/10 mb-4">
              <Clock className="h-6 w-6 text-domain-boundary-fg" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Practice Exam Simulator</h3>
            <p className="text-muted-foreground">
              Full 110-question exam with 6-hour timer, domain breakdown, and detailed score analysis.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-domain-field/10 mb-4">
              <BarChart3 className="h-6 w-6 text-domain-field-fg" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Progress Dashboard</h3>
            <p className="text-muted-foreground">
              Track your study streaks, quiz accuracy, flashcard mastery, and domain-specific performance.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-domain-geodesy/10 mb-4">
              <Award className="h-6 w-6 text-domain-geodesy-fg" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Cloud Sync</h3>
            <p className="text-muted-foreground">
              All your progress, notes, and quiz results automatically saved and synced across devices.
            </p>
          </Card>
        </div>

        {/* Domains Covered */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">All 7 NCEES Domains Covered</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'Math & Basic Science',
              'Field Data Acquisition',
              'Plane Survey Computations',
              'Mapping, GIS, and CAD',
              'Boundary Law & PLSS',
              'Geodesy, GPS, Astronomy',
              'Professional Practice'
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
              Join thousands of surveying students preparing for their professional license.
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
