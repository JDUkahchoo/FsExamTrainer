import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useQuery } from '@tanstack/react-query';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Clock, 
  Target, 
  AlertTriangle,
  CheckCircle,
  Brain,
  Calendar,
  Zap,
  BarChart3,
  Loader2
} from 'lucide-react';
import { getDomainConfig } from '@/lib/domains';
import type { Domain } from '@shared/schema';

interface AnalyticsData {
  learningVelocity: Array<{
    domain: string;
    domainNumber: number;
    weeklyImprovement: number;
    currentAccuracy: number;
    previousAccuracy: number;
    trend: 'improving' | 'stable' | 'declining';
  }>;
  timeInvestmentROI: Array<{
    domain: string;
    domainNumber: number;
    timeSpentMinutes: number;
    accuracyGain: number;
    roi: number;
  }>;
  weaknessPredictions: Array<{
    domain: string;
    domainNumber: number;
    predictedStruggle: boolean;
    reason: string;
    confidence: number;
  }>;
  studyPatterns: {
    mostActiveDay: string;
    mostActiveHour: number;
    averageSessionMinutes: number;
    totalStudyHours: number;
  };
  progressTrajectory: {
    currentScore: number;
    predictedExamScore: number;
    daysUntilReady: number;
    onTrack: boolean;
  };
}

export function PersonalAnalyticsDashboard() {
  const { data: analytics, isLoading } = useQuery<AnalyticsData>({
    queryKey: ['/api/progress/analytics'],
    refetchOnMount: 'always'
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No analytics data available yet. Start studying to see your progress!
      </div>
    );
  }

  const formatHour = (hour: number) => {
    if (hour === 0) return '12 AM';
    if (hour < 12) return `${hour} AM`;
    if (hour === 12) return '12 PM';
    return `${hour - 12} PM`;
  };

  const TrendIcon = ({ trend }: { trend: 'improving' | 'stable' | 'declining' }) => {
    if (trend === 'improving') return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (trend === 'declining') return <TrendingDown className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-muted-foreground" />;
  };

  return (
    <div className="space-y-6">
      <Card className="p-6" data-testid="card-trajectory">
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-lg">Progress Trajectory</h3>
          <Badge 
            variant={analytics.progressTrajectory.onTrack ? "default" : "destructive"}
            className="ml-auto"
          >
            {analytics.progressTrajectory.onTrack ? 'On Track' : 'Needs Attention'}
          </Badge>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-3xl font-bold text-foreground">{analytics.progressTrajectory.currentScore}%</p>
            <p className="text-sm text-muted-foreground">Current Score</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-primary">{analytics.progressTrajectory.predictedExamScore}%</p>
            <p className="text-sm text-muted-foreground">Predicted Exam Score</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-foreground">
              {analytics.progressTrajectory.daysUntilReady === 0 
                ? 'Ready!' 
                : `${analytics.progressTrajectory.daysUntilReady}d`}
            </p>
            <p className="text-sm text-muted-foreground">Est. Days to 70%</p>
          </div>
          <div className="text-center">
            <div className={`text-3xl ${analytics.progressTrajectory.onTrack ? 'text-green-500' : 'text-amber-500'}`}>
              {analytics.progressTrajectory.onTrack ? <CheckCircle className="w-8 h-8 mx-auto" /> : <AlertTriangle className="w-8 h-8 mx-auto" />}
            </div>
            <p className="text-sm text-muted-foreground">Status</p>
          </div>
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6" data-testid="card-learning-velocity">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-yellow-500" />
            <h3 className="font-semibold">Learning Velocity</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            How fast you're improving in each domain (week over week)
          </p>
          
          <div className="space-y-3">
            {analytics.learningVelocity.map((domain) => {
              const config = getDomainConfig(domain.domain as Domain);
              return (
                <div key={domain.domainNumber} className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded flex items-center justify-center ${config.bgColor}`}>
                    <span className={`text-xs font-bold ${config.textColor}`}>{domain.domainNumber}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm truncate">{domain.domain}</span>
                      <div className="flex items-center gap-2">
                        <TrendIcon trend={domain.trend} />
                        <span className={`text-sm font-medium ${
                          domain.weeklyImprovement > 0 ? 'text-green-500' : 
                          domain.weeklyImprovement < 0 ? 'text-red-500' : 'text-muted-foreground'
                        }`}>
                          {domain.weeklyImprovement > 0 ? '+' : ''}{domain.weeklyImprovement}%
                        </span>
                      </div>
                    </div>
                    <Progress value={domain.currentAccuracy} className="h-1.5 mt-1" />
                    <p className="text-xs text-muted-foreground mt-0.5">{domain.currentAccuracy}% current</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="p-6" data-testid="card-time-roi">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-blue-500" />
            <h3 className="font-semibold">Time Investment ROI</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Accuracy gain per hour spent studying each domain
          </p>
          
          <div className="space-y-3">
            {analytics.timeInvestmentROI
              .filter(d => d.timeSpentMinutes > 0)
              .sort((a, b) => b.roi - a.roi)
              .map((domain) => {
                const config = getDomainConfig(domain.domain as Domain);
                const hours = Math.round(domain.timeSpentMinutes / 60 * 10) / 10;
                return (
                  <div key={domain.domainNumber} className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded flex items-center justify-center ${config.bgColor}`}>
                      <span className={`text-xs font-bold ${config.textColor}`}>{domain.domainNumber}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm truncate">{domain.domain}</span>
                        <Badge variant="outline" className="text-xs">
                          {domain.roi > 0 ? '+' : ''}{domain.roi}%/hr
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {hours}h spent, {domain.accuracyGain > 0 ? '+' : ''}{domain.accuracyGain}% improvement
                      </p>
                    </div>
                  </div>
                );
              })}
            {analytics.timeInvestmentROI.filter(d => d.timeSpentMinutes > 0).length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">
                Complete some lessons to see ROI data
              </p>
            )}
          </div>
        </Card>
      </div>

      <Card className="p-6" data-testid="card-weakness-predictions">
        <div className="flex items-center gap-2 mb-4">
          <Brain className="w-5 h-5 text-purple-500" />
          <h3 className="font-semibold">Weakness Predictions</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Based on your patterns, here's where you might struggle on the exam
        </p>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {analytics.weaknessPredictions.map((prediction) => {
            const config = getDomainConfig(prediction.domain as Domain);
            return (
              <div 
                key={prediction.domainNumber}
                className={`p-3 rounded-lg border ${prediction.predictedStruggle ? 'border-amber-500/50 bg-amber-500/5' : 'border-green-500/50 bg-green-500/5'}`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-5 h-5 rounded flex items-center justify-center ${config.bgColor}`}>
                    <span className={`text-xs font-bold ${config.textColor}`}>{prediction.domainNumber}</span>
                  </div>
                  <span className="text-sm font-medium truncate">{prediction.domain}</span>
                </div>
                <div className="flex items-center gap-2">
                  {prediction.predictedStruggle ? (
                    <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  ) : (
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  )}
                  <p className="text-xs text-muted-foreground">{prediction.reason}</p>
                </div>
                {prediction.predictedStruggle && prediction.confidence > 0 && (
                  <div className="mt-2">
                    <Progress value={prediction.confidence} className="h-1" />
                    <p className="text-xs text-muted-foreground mt-0.5">{prediction.confidence}% confidence</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>

      <Card className="p-6" data-testid="card-study-patterns">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-emerald-500" />
          <h3 className="font-semibold">Study Patterns</h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 rounded-lg bg-muted/50">
            <BarChart3 className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
            <p className="text-lg font-semibold">{analytics.studyPatterns.mostActiveDay}</p>
            <p className="text-xs text-muted-foreground">Most Active Day</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-muted/50">
            <Clock className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
            <p className="text-lg font-semibold">{formatHour(analytics.studyPatterns.mostActiveHour)}</p>
            <p className="text-xs text-muted-foreground">Peak Study Hour</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-muted/50">
            <Zap className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
            <p className="text-lg font-semibold">{analytics.studyPatterns.averageSessionMinutes}m</p>
            <p className="text-xs text-muted-foreground">Avg Session Length</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-muted/50">
            <Target className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
            <p className="text-lg font-semibold">{analytics.studyPatterns.totalStudyHours}h</p>
            <p className="text-xs text-muted-foreground">Total Study Time</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
