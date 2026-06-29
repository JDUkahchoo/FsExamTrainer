import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
  CalendarDays,
  Compass,
  Ruler,
  Satellite,
  ArrowRight,
  ScrollText,
} from "lucide-react";

const heritage = [
  { icon: Ruler, label: "Chain & transit", detail: "The original instruments of the trade" },
  { icon: ScrollText, label: "GLO & PLSS", detail: "Field books, plats, and the public land survey" },
  { icon: Compass, label: "Boundary craft", detail: "Monuments, bearings, and the rule of law" },
];

const future = [
  { icon: Satellite, label: "GNSS & RTK", detail: "Centimeter positioning from orbit" },
  { icon: Layers, label: "LiDAR & point clouds", detail: "Reality captured, point by point" },
  { icon: BarChart3, label: "GIS & geospatial", detail: "Where surveying becomes engineering" },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-fieldbook border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
        <div className="container relative mx-auto px-4 py-20 md:py-28">
          <div className="max-w-3xl mx-auto text-center">
            <div
              className="label-coord inline-flex items-center gap-2 rounded-full border border-brass/40 bg-card/80 px-4 py-1.5 text-xs text-brass-foreground"
              data-testid="badge-coord"
            >
              <Compass className="h-3.5 w-3.5" />
              NCEES FS · PS · TX EXAM PREP
            </div>

            <h1
              className="font-display text-5xl md:text-6xl font-bold tracking-tight text-foreground mt-6 mb-5"
              data-testid="heading-landing"
            >
              Master the Fundamentals of Surveying
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-4 max-w-2xl mx-auto leading-relaxed">
              An adaptive study guide for the NCEES FS and PS exams — rooted in the
              craft's heritage and built for its geospatial future.
            </p>
            <p className="text-base text-muted-foreground mb-9 max-w-2xl mx-auto leading-relaxed">
              Whether you have 8 weeks or 2 years, it adapts to your exam date, study pace, and
              weak areas — with personalized plans, 800+ practice questions, spaced-repetition
              flashcards, and full-length exam simulations.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                size="lg"
                onClick={() => (window.location.href = "/api/login")}
                className="text-base px-8 py-6 bg-survey text-zinc-950 border border-survey hover-elevate active-elevate-2"
                data-testid="button-login"
              >
                Start Studying Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <span className="label-coord text-xs text-muted-foreground">
                Free · Sync across devices
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Heritage → Future Narrative */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl font-bold mb-2">Where the industry started — and where it's headed</h2>
            <p className="text-muted-foreground text-sm max-w-2xl mx-auto">
              One discipline, two eras. This guide carries you across both, so you understand the
              fundamentals and the modern geospatial tools that build on them.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-stretch gap-6">
            {/* Heritage column */}
            <Card className="p-6 border-l-4 border-l-brass">
              <p className="label-coord text-xs text-brass-foreground mb-4">The Heritage</p>
              <div className="space-y-4">
                {heritage.map((item) => (
                  <div key={item.label} className="flex items-start gap-3" data-testid={`heritage-${item.label}`}>
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md bg-brass/15 text-brass-foreground">
                      <item.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Connector */}
            <div className="hidden md:flex flex-col items-center justify-center px-2">
              <div className="h-full w-px rule-brass border-l border-dashed" />
              <div className="my-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <ArrowRight className="h-5 w-5" />
              </div>
              <div className="h-full w-px border-l border-dashed border-primary/40" />
            </div>

            {/* Future column */}
            <Card className="relative overflow-hidden p-6 border-l-4 border-l-primary">
              <div className="absolute inset-0 bg-pointcloud opacity-60 pointer-events-none" />
              <div className="relative">
                <p className="label-coord text-xs text-primary mb-4">The Geospatial Future</p>
                <div className="space-y-4">
                  {future.map((item) => (
                    <div key={item.label} className="flex items-start gap-3" data-testid={`future-${item.label}`}>
                      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md bg-primary/15 text-primary">
                        <item.icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{item.label}</p>
                        <p className="text-xs text-muted-foreground">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Study Plan Modes Highlight */}
      <div className="container mx-auto px-4 pb-4">
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="font-display text-2xl font-bold text-center mb-2">Study on Your Terms</h2>
          <p className="text-muted-foreground text-center mb-6 text-sm">
            Choose the plan that fits your life — switch modes any time.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { label: "Standard", detail: "16 weeks · ~8 hrs/week", icon: CalendarDays },
              { label: "Working Professional", detail: "Flexible · ~4–6 hrs/week", icon: Clock },
              { label: "Result-Driven", detail: "Intensive · ~12+ hrs/week", icon: Target },
              { label: "Long-Term Pathway", detail: "Up to 24 months · 4 phases", icon: Compass },
            ].map((mode) => (
              <div
                key={mode.label}
                className="flex flex-col items-center text-center p-4 bg-card rounded-lg border border-card-border gap-1.5 hover-elevate"
                data-testid={`mode-${mode.label}`}
              >
                <mode.icon className="h-6 w-6 text-primary mb-1" />
                <span className="font-semibold text-sm">{mode.label}</span>
                <span className="text-xs text-muted-foreground">{mode.detail}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            { icon: CalendarDays, tint: "primary", title: "Adaptive Study Plans", body: "Plans adapt to your exam date and pretest scores — prioritizing your weak domains first across all study modes." },
            { icon: Brain, tint: "success", title: "800+ Practice Questions", body: "Domain quizzes, mixed exams, weak-area drills, and full 110-question practice exams across all NCEES domains." },
            { icon: Target, tint: "instrument", title: "Spaced Repetition Flashcards", body: "Hundreds of flashcards using the SM-2 algorithm to surface the cards you're most likely to forget before exam day." },
            { icon: Clock, tint: "brass", title: "Full Exam Simulator", body: "Timed full-length exams with domain breakdowns, score analysis, and detailed explanations for every question." },
            { icon: BarChart3, tint: "primary", title: "Progress & Analytics", body: "Track streaks, domain mastery, quiz accuracy, forgetting-curve health, and predicted weak areas over time." },
            { icon: Zap, tint: "survey", title: "Gamified Learning", body: "XP system, ranks, daily quests, streaks, and a leaderboard to keep your study momentum going week after week." },
            { icon: BookOpen, tint: "primary", title: "60+ Interactive Readings", body: "In-depth study readings with embedded formulas, worked examples, knowledge checks, and textbook cross-references." },
            { icon: Layers, tint: "success", title: "FS, PS & TX Exam Tracks", body: "Separate, isolated tracks for Fundamentals, Professional, and Texas surveying exams with tailored content." },
            { icon: Award, tint: "brass", title: "Synced Across Devices", body: "All progress, notes, quiz history, and flashcard schedules automatically saved and available anywhere you study." },
          ].map((f) => (
            <Card key={f.title} className="p-6 hover-elevate" data-testid={`feature-${f.title}`}>
              <div
                className={
                  f.tint === "primary"
                    ? "flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4"
                    : f.tint === "success"
                    ? "flex h-12 w-12 items-center justify-center rounded-lg bg-success/10 text-success mb-4"
                    : f.tint === "brass"
                    ? "flex h-12 w-12 items-center justify-center rounded-lg bg-brass/15 text-brass-foreground mb-4"
                    : f.tint === "survey"
                    ? "flex h-12 w-12 items-center justify-center rounded-lg bg-survey/15 text-survey mb-4"
                    : "flex h-12 w-12 items-center justify-center rounded-lg bg-instrument/10 text-instrument mb-4"
                }
              >
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.body}</p>
            </Card>
          ))}
        </div>

        {/* Domains Covered */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-center mb-2">All NCEES FS Domains Covered</h2>
          <p className="text-center text-muted-foreground mb-8 text-sm">
            Complete content coverage — no domain left behind.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Math & Basic Science",
              "Field Data Acquisition & Reduction",
              "Mapping, GIS, and CAD",
              "Boundary Law & PLSS",
              "Surveying Principles",
              "Survey Computations & Applications",
              "Professional Practice",
              "Basic Sciences & Historical Methods",
            ].map((domain) => (
              <div
                key={domain}
                className="flex items-center gap-3 p-4 bg-card rounded-lg border border-card-border"
                data-testid={`domain-${domain}`}
              >
                <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0" />
                <span className="font-medium text-sm">{domain}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 mb-8 text-center">
          <Card className="relative overflow-hidden p-8 max-w-2xl mx-auto border-primary/30">
            <div className="absolute inset-0 bg-pointcloud opacity-40 pointer-events-none" />
            <div className="relative">
              <h3 className="font-display text-2xl font-bold mb-3">Ready to set your benchmark?</h3>
              <p className="text-muted-foreground text-sm mb-6 max-w-md mx-auto">
                Study at your own pace, on your own schedule — this guide works around your life,
                not the other way around.
              </p>
              <Button
                size="lg"
                onClick={() => (window.location.href = "/api/login")}
                className="bg-survey text-zinc-950 border border-survey hover-elevate active-elevate-2"
                data-testid="button-login-cta"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
