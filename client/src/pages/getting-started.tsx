import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, TrendingUp, BookOpen, Zap, AlertCircle, CheckCircle2, Brain, ClipboardCheck, GraduationCap, FileText, BarChart3, BookMarked, Lightbulb } from "lucide-react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import type { UserPreferences, User } from "@shared/schema";
import { EXAM_TRACKS, US_STATES, type ExamTrack } from "@shared/schema";
import { StudyCoachBriefing } from "@/components/study-coach-briefing";
import { DailyQuestsPanel } from "@/components/daily-quests-panel";
import { ReviewAlerts } from "@/components/review-alerts";
import { WeeklyLeaderboard } from "@/components/weekly-leaderboard";
import { ForgettingCurveChart } from "@/components/forgetting-curve-chart";
import { ExamSelector } from "@/components/exam-selector";

export default function GettingStarted() {
  const [, setLocation] = useLocation();
  const { data: preferences } = useQuery<UserPreferences>({
    queryKey: ['/api/preferences'],
  });
  
  const { data: user } = useQuery<User>({
    queryKey: ['/api/auth/user'],
  });
  
  const isLoggedIn = !!user;

  const strategies = [
    {
      id: 'standard',
      name: 'Standard Mode',
      icon: BookOpen,
      color: 'bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800',
      description: 'Balanced approach covering all domains evenly',
      timeline: '16 weeks',
      weeklyCommitment: '6-8 hours/week',
      dailyCommitment: '~1 hour/day',
      benefits: [
        'Structured weekly schedule',
        'All 7 domains covered equally',
        'Best for consistent learners',
        'READ → FOCUS → APPLY → REINFORCE framework'
      ],
      bestFor: 'Students with flexible schedules',
      pace: 'Steady & Balanced',
      recommended: !preferences?.studyMode || preferences.studyMode === 'standard'
    },
    {
      id: 'result-driven',
      name: 'Result-Driven Mode',
      icon: TrendingUp,
      color: 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800',
      description: 'Prioritizes weak domains identified in your pretest',
      timeline: '16 weeks',
      weeklyCommitment: '7-9 hours/week',
      dailyCommitment: '~1.5 hours/day',
      benefits: [
        'Custom domain prioritization',
        'Weak areas get more focus',
        'Data-driven approach',
        'Improves overall pass rate faster'
      ],
      bestFor: 'Students with specific weak areas',
      pace: 'Intensive & Targeted',
      recommended: preferences?.studyMode === 'result-driven'
    },
    {
      id: 'working-professional',
      name: 'Working Professional',
      icon: Clock,
      color: 'bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800',
      description: 'Optimized for busy schedules with manageable daily loads',
      timeline: '16 weeks',
      weeklyCommitment: '9-11 hours/week',
      dailyCommitment: '~1hr M-F + 2-3hrs weekends',
      benefits: [
        '3 lessons/week max',
        'Round-robin domain cycling',
        'Perfect for full-time work',
        'Flexible weekend study'
      ],
      bestFor: 'Working professionals',
      pace: 'Flexible & Manageable',
      recommended: preferences?.studyMode === 'working-professional'
    },
    {
      id: 'custom',
      name: 'Custom Plan',
      icon: Zap,
      color: 'bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800',
      description: 'Build your own timeline and select specific domains',
      timeline: '8-16 weeks',
      weeklyCommitment: 'Your choice',
      dailyCommitment: 'Your choice',
      benefits: [
        'Complete control over timeline',
        'Select domains to prioritize',
        'Adjust based on progress',
        'Maximum flexibility'
      ],
      bestFor: 'Self-directed learners',
      pace: 'Fully Customizable',
      recommended: preferences?.studyMode === 'custom'
    }
  ];

  const currentExamTrack = (preferences?.preferredExamTrack as string) || 'fs';
  
  const getExamLink = (path: string) => `/app/${currentExamTrack}${path}`;
  
  const tools = [
    {
      icon: BookOpen,
      name: 'Study Plan',
      description: 'Your weekly roadmap with interactive lessons following the READ → FOCUS → APPLY → REINFORCE framework. Track your progress week by week.',
      link: getExamLink('/study-plan')
    },
    {
      icon: Brain,
      name: 'Practice Quiz',
      description: 'Test your knowledge with domain-specific or exam-style quizzes. Get instant feedback and detailed explanations for every question.',
      link: getExamLink('/quiz')
    },
    {
      icon: ClipboardCheck,
      name: 'Flashcards',
      description: 'Master key concepts with spaced repetition. Two decks to choose from with flip animations and mastery tracking.',
      link: getExamLink('/flashcards')
    },
    {
      icon: GraduationCap,
      name: 'Practice Exam',
      description: 'Full 110-question exam simulator with timer, realistic conditions, and detailed score breakdown by domain.',
      link: getExamLink('/exam')
    },
    {
      icon: FileText,
      name: 'Study Notes',
      description: 'Rich text editor for taking notes each week. Auto-saves and syncs with your study plan for easy reference.',
      link: getExamLink('/notes')
    },
    {
      icon: BarChart3,
      name: 'Progress Dashboard',
      description: 'Track your improvement over time with visual analytics, study streaks, achievements, and domain mastery insights.',
      link: getExamLink('/progress')
    },
    {
      icon: BookMarked,
      name: 'Resources',
      description: 'Access formula sheets, memory techniques, and professional references to support your studying.',
      link: getExamLink('/resources')
    }
  ];

  const quickTips = [
    {
      title: 'Start with the Pretest',
      description: 'Take the diagnostic pretest first to identify your weak areas. This helps personalize your study path.',
      action: 'Take Pretest'
    },
    {
      title: 'Choose Your Study Mode',
      description: 'Select a study mode below that matches your schedule and learning style. You can always change it later.',
      action: 'Choose Mode'
    },
    {
      title: 'Follow the Weekly Schedule',
      description: 'Complete each week\'s lessons, quizzes, and notes to stay on track. Consistency is key to success.',
      action: 'Start Week 1'
    },
    {
      title: 'Review Weak Domains',
      description: 'Use Practice Quiz and your Progress Dashboard to identify weak areas. Focus extra time there.',
      action: 'Check Progress'
    }
  ];

  return (
    <div className="space-y-8 max-w-7xl p-6">
      {/* Welcome Section */}
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-bold">Getting Started with the FS Exam Study Guide</h1>
            {preferences?.stateCode && (
              <Badge variant="outline" className="text-sm">
                {US_STATES.find(s => s.code === preferences.stateCode)?.name || preferences.stateCode}
              </Badge>
            )}
          </div>
          <p className="text-lg text-muted-foreground">
            Your complete preparation system for the NCEES Fundamentals of Surveying (FS) exam. Follow this guide to get the most out of your study journey.
          </p>
        </div>
      </div>

      {/* Exam Selection - Only shown when logged in */}
      {isLoggedIn && (
        <Card className="p-6">
          <ExamSelector />
        </Card>
      )}

      {/* Study Dashboard - Only shown when logged in */}
      {isLoggedIn && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Your Study Dashboard</h2>
            <Badge variant="outline">Personalized for you</Badge>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-1">
              <StudyCoachBriefing />
            </div>
            <div className="lg:col-span-1">
              <DailyQuestsPanel />
            </div>
            <div className="lg:col-span-1">
              <ReviewAlerts />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <WeeklyLeaderboard compact />
            <ForgettingCurveChart compact />
          </div>
        </div>
      )}

      {/* Quick Tips */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Quick Start (4 Steps)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickTips.map((tip, i) => (
            <Card key={i} className="p-4 space-y-3 hover-elevate">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary font-semibold">
                  {i + 1}
                </div>
                <div className="flex-1 space-y-2">
                  <h3 className="font-semibold">{tip.title}</h3>
                  <p className="text-sm text-muted-foreground">{tip.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Tools Overview */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Your Study Tools</h2>
        <p className="text-muted-foreground">
          Each tool is designed to support different parts of your learning journey. Use them together for maximum effectiveness.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tools.map((tool, i) => {
            const Icon = tool.icon;
            return (
              <Card key={i} className="p-4 space-y-3 flex flex-col hover-elevate">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h3 className="font-semibold">{tool.name}</h3>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground flex-1">{tool.description}</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setLocation(tool.link)}
                  data-testid={`button-open-${tool.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  Open {tool.name}
                </Button>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Study Strategy */}
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Choose Your Study Mode</h2>
          <p className="text-muted-foreground">
            Select the strategy that best fits your schedule and learning goals. Your choice affects how lessons are distributed across 16 weeks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {strategies.map((strategy) => {
            const StrategyIcon = strategy.icon;
            return (
              <Card
                key={strategy.id}
                className={`p-6 space-y-4 border-2 cursor-pointer transition-all hover-elevate ${
                  strategy.recommended
                    ? strategy.color + ' ring-2 ring-primary'
                    : 'border-border'
                }`}
                data-testid={`card-strategy-${strategy.id}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <StrategyIcon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-bold text-lg">{strategy.name}</h3>
                  </div>
                  {strategy.recommended && (
                    <Badge variant="default" data-testid={`badge-recommended-${strategy.id}`}>
                      Current
                    </Badge>
                  )}
                </div>

                <p className="text-sm text-muted-foreground">{strategy.description}</p>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="font-medium">{strategy.weeklyCommitment}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="font-medium">Daily: {strategy.dailyCommitment}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-semibold text-muted-foreground">KEY BENEFITS</p>
                  <ul className="space-y-1">
                    {strategy.benefits.map((benefit, i) => (
                      <li key={i} className="text-sm flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-1 pt-2 border-t border-border">
                  <p className="text-xs font-semibold text-muted-foreground">BEST FOR</p>
                  <p className="text-sm">{strategy.bestFor}</p>
                </div>

                <Button
                  onClick={() => setLocation('/study-plan')}
                  className="w-full"
                  variant={strategy.recommended ? "default" : "outline"}
                  data-testid={`button-select-${strategy.id}`}
                >
                  {strategy.recommended ? 'Current Mode' : 'Select Mode'}
                </Button>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Study Tips */}
      <div className="space-y-4 bg-accent/5 border border-border rounded-lg p-6">
        <div className="flex gap-3">
          <Lightbulb className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
          <div className="space-y-3">
            <h3 className="font-bold text-lg">Tips for Success</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• <span className="font-medium text-foreground">Consistency matters</span> - Study a little bit each day rather than cramming</li>
              <li>• <span className="font-medium text-foreground">Mix your tools</span> - Combine lessons, quizzes, and flashcards for better retention</li>
              <li>• <span className="font-medium text-foreground">Track progress</span> - Check your Progress Dashboard weekly to stay motivated</li>
              <li>• <span className="font-medium text-foreground">Focus on weak areas</span> - Use Result-Driven mode or manually focus extra time where needed</li>
              <li>• <span className="font-medium text-foreground">Take the practice exam</span> - Use it as a final check before the real exam</li>
              <li>• <span className="font-medium text-foreground">Adjust as needed</span> - Your study mode can be changed anytime if your situation changes</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="space-y-4 bg-primary/10 border border-primary/20 rounded-lg p-6 text-center space-y-4">
        <h3 className="font-bold text-lg">Ready to Get Started?</h3>
        <p className="text-muted-foreground">
          Choose a study mode above and head to your Study Plan to begin. Your journey to passing the FS exam starts here!
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Button onClick={() => setLocation('/pretest')} data-testid="button-take-pretest">
            Take Diagnostic Pretest
          </Button>
          <Button onClick={() => setLocation('/study-plan')} variant="outline" data-testid="button-start-study-plan">
            Go to Study Plan
          </Button>
        </div>
      </div>
    </div>
  );
}
