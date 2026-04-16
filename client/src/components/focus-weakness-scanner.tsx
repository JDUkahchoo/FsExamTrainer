import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useQuery } from '@tanstack/react-query';
import { Target, Flame, AlertTriangle, ChevronDown, TrendingUp, TrendingDown, Minus, CheckCircle2 } from 'lucide-react';
import { MicroDrillModal } from './micro-drill-modal';
import type { QuizResult, Domain, DOMAINS } from '@shared/schema';

interface FocusWeaknessScannerProps {
  week: number;
  domains?: string[];
  colorClass?: string;
  examTrack?: string;
  checklistItems?: string[];
  completedSet?: Set<string>;
  autoSet?: Set<string>;
  onToggle?: (index: number) => void;
}

const DOMAIN_COLORS: Record<string, string> = {
  'Math & Basic Science': 'bg-blue-500',
  'Field Data Acquisition': 'bg-green-500',
  'Mapping, GIS, and CAD': 'bg-purple-500',
  'Boundary Law & PLSS': 'bg-orange-500',
  'Surveying Principles': 'bg-cyan-500',
  'Survey Computations & Applications': 'bg-pink-500',
  'Professional Practice': 'bg-yellow-500',
  'Applied Mathematics & Statistics': 'bg-indigo-500',
};

export function FocusWeaknessScanner({ week, domains, colorClass = "text-primary", examTrack = "fs", checklistItems = [], completedSet = new Set(), autoSet = new Set(), onToggle }: FocusWeaknessScannerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showDrillModal, setShowDrillModal] = useState(false);

  const { data: recentMisses = [], isLoading: missesLoading } = useQuery<QuizResult[]>({
    queryKey: ['/api/focus/recent-misses', examTrack, { limit: 10 }],
    queryFn: async () => {
      const res = await fetch(`/api/focus/recent-misses?limit=10&examTrack=${examTrack}`);
      if (!res.ok) throw new Error("Failed to fetch recent misses");
      return res.json();
    },
  });

  const { data: domainStats = [], isLoading: statsLoading } = useQuery<{ domain: string; total: number; correct: number; accuracy: number }[]>({
    queryKey: ['/api/focus/domain-stats', examTrack],
    queryFn: async () => {
      const res = await fetch(`/api/focus/domain-stats?examTrack=${examTrack}`);
      if (!res.ok) throw new Error("Failed to fetch domain stats");
      return res.json();
    },
  });

  const { data: streak = { current: 0, best: 0 }, isLoading: streakLoading } = useQuery<{ current: number; best: number }>({
    queryKey: ['/api/focus/streak', examTrack],
    queryFn: async () => {
      const res = await fetch(`/api/focus/streak?examTrack=${examTrack}`);
      if (!res.ok) throw new Error("Failed to fetch streak");
      return res.json();
    },
  });

  const isLoading = missesLoading || statsLoading || streakLoading;

  const hasData = domainStats.length > 0;

  // Split stats into "this week's domains" and "other domains"
  const thisWeekStats = domains && domains.length > 0
    ? [...domainStats].filter(d => domains.includes(d.domain)).sort((a, b) => a.accuracy - b.accuracy)
    : [];
  const otherStats = domains && domains.length > 0
    ? [...domainStats].filter(d => !domains.includes(d.domain)).sort((a, b) => a.accuracy - b.accuracy)
    : [...domainStats].sort((a, b) => a.accuracy - b.accuracy);

  // For the heatmap, show week's domains first, then others
  const sortedStats = [...thisWeekStats, ...otherStats];

  // Weak domains to drill: prefer this week's if weak, otherwise fall back to overall
  const weekDomainsMissing = thisWeekStats.filter(d => d.accuracy < 70);
  const allWeakSorted = [...domainStats].sort((a, b) => a.accuracy - b.accuracy).slice(0, 3).filter(d => d.accuracy < 70);
  const weakestDomains = weekDomainsMissing.length > 0 ? weekDomainsMissing : allWeakSorted;

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 80) return 'text-green-600 dark:text-green-400';
    if (accuracy >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getAccuracyBgColor = (accuracy: number) => {
    if (accuracy >= 80) return 'bg-green-500';
    if (accuracy >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getTrendIcon = (accuracy: number) => {
    if (accuracy >= 80) return <TrendingUp className="w-3 h-3" />;
    if (accuracy >= 60) return <Minus className="w-3 h-3" />;
    return <TrendingDown className="w-3 h-3" />;
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card className="border-l-4 border-l-amber-500">
        <CollapsibleTrigger asChild>
          <CardHeader className="flex flex-row items-center justify-between gap-2 cursor-pointer hover-elevate pb-2">
            <div className="flex items-center gap-2">
              <Target className={`w-5 h-5 ${colorClass}`} />
              <CardTitle className="text-base font-semibold">FOCUS Weakness Scanner</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              {streak.current > 0 && (
                <Badge variant="secondary" className="gap-1">
                  <Flame className="w-3 h-3 text-orange-500" />
                  {streak.current}
                </Badge>
              )}
              <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </div>
          </CardHeader>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <CardContent className="space-y-4">
            {isLoading ? (
              <div className="text-sm text-muted-foreground">Loading weakness analysis...</div>
            ) : !hasData ? (
              <div className="text-sm text-muted-foreground p-4 bg-muted/30 rounded-md">
                <AlertTriangle className="w-4 h-4 inline mr-2" />
                No quiz data yet. Complete some quizzes to see your weakness analysis.
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-2">
                    <Flame className="w-5 h-5 text-orange-500" />
                    <span className="text-sm font-medium">Streak:</span>
                    <span className="text-lg font-bold">{streak.current}</span>
                    <span className="text-xs text-muted-foreground">(best: {streak.best})</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {domainStats.reduce((sum, d) => sum + d.total, 0)} questions answered
                  </Badge>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    Domain Heatmap
                  </h4>

                  {thisWeekStats.length > 0 && (
                    <div className="space-y-1.5">
                      <p className="text-xs font-semibold text-primary uppercase tracking-wider">This Week's Domains</p>
                      <div className="grid grid-cols-2 gap-2">
                        {thisWeekStats.map((stat) => (
                          <div
                            key={stat.domain}
                            data-testid={`domain-stat-${stat.domain.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                            className="p-2 rounded-md border border-primary/20 bg-primary/5 space-y-1"
                          >
                            <div className="flex items-center gap-1">
                              <div className={`w-2 h-2 rounded-full ${DOMAIN_COLORS[stat.domain] || 'bg-gray-500'}`} />
                              <span className="text-xs font-medium truncate" title={stat.domain}>
                                {stat.domain.split(' ').slice(0, 3).join(' ')}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Progress value={stat.accuracy} className="h-1.5 flex-1" />
                              <span className={`text-xs font-bold ${getAccuracyColor(stat.accuracy)}`}>{stat.accuracy}%</span>
                            </div>
                            <div className="text-xs text-muted-foreground">{stat.correct}/{stat.total} correct</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {otherStats.length > 0 && (
                    <div className="space-y-1.5">
                      {thisWeekStats.length > 0 && (
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">All Domains</p>
                      )}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {otherStats.map((stat) => (
                          <div
                            key={stat.domain}
                            data-testid={`domain-stat-${stat.domain.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                            className="p-2 rounded-md bg-muted/30 space-y-1"
                          >
                            <div className="flex items-center gap-1">
                              <div className={`w-2 h-2 rounded-full ${DOMAIN_COLORS[stat.domain] || 'bg-gray-500'}`} />
                              <span className="text-xs font-medium truncate" title={stat.domain}>
                                {stat.domain.split(' ').slice(0, 2).join(' ')}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Progress value={stat.accuracy} className="h-1.5 flex-1" />
                              <span className={`text-xs font-bold ${getAccuracyColor(stat.accuracy)}`}>{stat.accuracy}%</span>
                            </div>
                            <div className="text-xs text-muted-foreground">{stat.correct}/{stat.total} correct</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {weakestDomains.length > 0 && weakestDomains[0].accuracy < 70 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium flex items-center gap-2">
                      <Target className="w-4 h-4 text-red-500" />
                      Focus Areas (Below 70%)
                    </h4>
                    <div className="space-y-2">
                      {weakestDomains
                        .filter(d => d.accuracy < 70)
                        .map((domain) => (
                          <div
                            key={domain.domain}
                            className="flex items-center justify-between p-2 rounded-md bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800"
                          >
                            <div className="flex items-center gap-2">
                              <div className={`w-3 h-3 rounded-full ${getAccuracyBgColor(domain.accuracy)}`} />
                              <span className="text-sm font-medium">{domain.domain}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className={`text-sm font-bold ${getAccuracyColor(domain.accuracy)}`}>
                                {domain.accuracy}%
                              </span>
                              {getTrendIcon(domain.accuracy)}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {recentMisses.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Recent Misses ({recentMisses.length})</h4>
                    <div className="space-y-1 max-h-40 overflow-y-auto">
                      {recentMisses.slice(0, 5).map((miss, index) => (
                        <div
                          key={miss.id || index}
                          data-testid={`recent-miss-${index}`}
                          className="flex items-center justify-between p-2 rounded-md bg-muted/30 text-sm"
                        >
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${DOMAIN_COLORS[miss.domain] || 'bg-gray-500'}`} />
                            <span className="text-muted-foreground truncate max-w-[200px]">
                              {miss.domain}
                            </span>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            Q{miss.questionId?.split('-').pop() || '?'}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-2">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    data-testid="button-start-micro-drill"
                    disabled={!hasData}
                    onClick={() => setShowDrillModal(true)}
                  >
                    <Target className="w-4 h-4 mr-2" />
                    Start 10-Question Micro-Drill
                  </Button>
                </div>

                <MicroDrillModal 
                  open={showDrillModal}
                  onOpenChange={setShowDrillModal}
                  focusDomains={weakestDomains.filter(d => d.accuracy < 70).map(d => d.domain)}
                  examTrack={examTrack}
                />
              </>
            )}

            {checklistItems.length > 0 && (
              <div className="pt-3 border-t border-border/50 mt-2">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Focus Tasks</p>
                  <Badge variant="secondary" className="text-xs">
                    {checklistItems.filter((_, i) => completedSet.has(`focus-${i}`) || autoSet.has(`focus-${i}`)).length}/{checklistItems.length}
                  </Badge>
                </div>
                <div className="space-y-1.5">
                  {checklistItems.map((item, i) => {
                    const key = `focus-${i}`;
                    const isAuto = autoSet.has(key);
                    const isDone = completedSet.has(key) || isAuto;
                    return (
                      <div key={key} className="flex items-start gap-2">
                        <Checkbox
                          checked={isDone}
                          onCheckedChange={() => onToggle?.(i)}
                          disabled={isAuto}
                          className="mt-0.5 shrink-0"
                          data-testid={`checkbox-focus-pillar-${i}`}
                        />
                        <span className={`text-sm leading-snug flex-1 ${isDone ? 'line-through text-muted-foreground' : ''}`}>
                          {item}
                        </span>
                        {isAuto && (
                          <Badge variant="outline" className="text-xs shrink-0 text-muted-foreground">auto</Badge>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}
