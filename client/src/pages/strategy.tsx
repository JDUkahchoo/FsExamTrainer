import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, TrendingUp, BookOpen, Zap, AlertCircle, CheckCircle2 } from "lucide-react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useExamTrack } from "@/contexts/exam-track-context";
import type { UserPreferences } from "@shared/schema";

export default function Strategy() {
  const [, setLocation] = useLocation();
  const { examTrack } = useExamTrack();
  const { data: preferences } = useQuery<UserPreferences>({
    queryKey: ['/api/preferences'],
  });

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

  return (
    <div className="p-6 space-y-8 max-w-7xl">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Study Strategy Guide</h1>
        <p className="text-muted-foreground">
          Choose the study mode that best fits your learning style and schedule
        </p>
      </div>

      {/* Quick Comparison Table */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Quick Comparison</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-2 font-semibold">Mode</th>
                <th className="text-left py-2 px-2 font-semibold">Timeline</th>
                <th className="text-left py-2 px-2 font-semibold">Weekly Hours</th>
                <th className="text-left py-2 px-2 font-semibold">Best For</th>
              </tr>
            </thead>
            <tbody>
              {strategies.map((strategy) => (
                <tr key={strategy.id} className="border-b hover:bg-muted/50">
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-2">
                      <strategy.icon className="w-4 h-4" />
                      <span className="font-medium">{strategy.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-2">{strategy.timeline}</td>
                  <td className="py-3 px-2">{strategy.weeklyCommitment}</td>
                  <td className="py-3 px-2 text-muted-foreground">{strategy.bestFor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Detailed Strategy Cards */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Detailed Overview</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {strategies.map((strategy) => (
            <Card key={strategy.id} className={`p-6 border-2 transition-all ${strategy.color}`}>
              {strategy.recommended && (
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="default" className="bg-green-600">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Your Current Mode
                  </Badge>
                </div>
              )}
              
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2 rounded-lg bg-white dark:bg-slate-900">
                  <strategy.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{strategy.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{strategy.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4 p-3 bg-white dark:bg-slate-900 rounded-lg">
                <div>
                  <div className="text-xs text-muted-foreground font-semibold">Timeline</div>
                  <div className="font-semibold">{strategy.timeline}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground font-semibold">Weekly</div>
                  <div className="font-semibold">{strategy.weeklyCommitment}</div>
                </div>
                <div className="col-span-2">
                  <div className="text-xs text-muted-foreground font-semibold">Daily</div>
                  <div className="font-semibold">{strategy.dailyCommitment}</div>
                </div>
              </div>

              <div className="mb-4">
                <div className="text-sm font-semibold mb-2">What You Get:</div>
                <ul className="space-y-1">
                  {strategy.benefits.map((benefit, i) => (
                    <li key={i} className="flex gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-semibold text-muted-foreground">Pace: {strategy.pace}</div>
                <Button 
                  className="w-full" 
                  variant={strategy.recommended ? "secondary" : "default"}
                  onClick={() => setLocation(`/app/${examTrack}/study-plan`)}
                >
                  {strategy.recommended ? 'View Your Plan' : 'Choose This Mode'}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <Card className="p-6 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold mb-2">How to Choose</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <strong>Take the pretest first</strong> - This helps identify your weak areas and unlocks Result-Driven recommendations
              </li>
              <li>
                <strong>Match to your schedule</strong> - Working full-time? Choose Working Professional. Flexible? Try Standard or Result-Driven.
              </li>
              <li>
                <strong>You can always switch</strong> - Change modes anytime from the Study Plan page based on your progress
              </li>
              <li>
                <strong>Custom mode gives maximum control</strong> - Design your own timeline and focus areas for the ultimate personalized approach
              </li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Next Steps */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-6">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <BookOpen className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Not Sure Yet?</h3>
              <p className="text-sm text-muted-foreground mb-3">Take the diagnostic pretest to get personalized recommendations based on your current knowledge.</p>
              <Button variant="outline" size="sm" onClick={() => setLocation(`/app/${examTrack}/pretest`)}>
                Take Pretest
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Ready to Start?</h3>
              <p className="text-sm text-muted-foreground mb-3">Jump into your study plan and begin with the READ phase of this week's lessons.</p>
              <Button size="sm" onClick={() => setLocation(`/app/${examTrack}/study-plan`)}>
                Go to Study Plan
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
