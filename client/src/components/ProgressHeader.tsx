import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Award, 
  Flame, 
  Target, 
  BookOpen, 
  Brain, 
  Trophy,
  CheckCircle2,
  Star,
  TrendingUp,
  Zap
} from "lucide-react";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { getSurveyorRank } from "@shared/schema";

interface ProgressData {
  overallProgress: number;
  weeksCompleted: number;
  totalWeeks: number;
  quizAccuracy: number;
  flashcardMasteryPercent: number;
  currentStreak: number;
  longestStreak: number;
}

interface Achievement {
  id: string;
  achievementType: string;
  earnedAt: string;
}

const ACHIEVEMENT_INFO: Record<string, { icon: any; label: string; description: string }> = {
  week_1_complete: { 
    icon: CheckCircle2, 
    label: "First Steps", 
    description: "Complete Week 1" 
  },
  week_8_complete: { 
    icon: TrendingUp, 
    label: "Halfway There", 
    description: "Complete Week 8" 
  },
  all_weeks_complete: { 
    icon: Trophy, 
    label: "Core Complete", 
    description: "Complete all 16 core weeks" 
  },
  quiz_master: { 
    icon: Brain, 
    label: "Quiz Master", 
    description: "85%+ accuracy with 50+ questions" 
  },
  perfect_quiz: { 
    icon: Star, 
    label: "Perfect Score", 
    description: "100% on a quiz session" 
  },
  flashcard_champion: { 
    icon: BookOpen, 
    label: "Card Champion", 
    description: "Master 50+ flashcards" 
  },
  practice_exam_pro: { 
    icon: Award, 
    label: "Exam Ready", 
    description: "Complete a practice exam" 
  },
  streak_7_days: { 
    icon: Flame, 
    label: "Week Warrior", 
    description: "7-day study streak" 
  },
  streak_14_days: { 
    icon: Flame, 
    label: "Fortnight Focus", 
    description: "14-day study streak" 
  },
  streak_30_days: { 
    icon: Flame, 
    label: "Monthly Master", 
    description: "30-day study streak" 
  }
};

export default function ProgressHeader() {
  const { toast } = useToast();
  const [previousAchievementCount, setPreviousAchievementCount] = useState<number | null>(null);

  const { data: progressData } = useQuery<ProgressData>({
    queryKey: ["/api/progress/overall"],
  });

  const { data: achievements = [] } = useQuery<Achievement[]>({
    queryKey: ["/api/achievements"],
  });

  const { data: xpData } = useQuery<{ xp: number; level: number }>({
    queryKey: ["/api/xp"],
  });

  const checkAchievementsMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/achievements/check", { 
        method: "POST",
        credentials: "include"
      });
      if (!response.ok) throw new Error("Failed to check achievements");
      return await response.json();
    },
    onSuccess: (newAchievements: Achievement[]) => {
      queryClient.invalidateQueries({ queryKey: ["/api/achievements"] });
      
      // Show toast for each new achievement
      newAchievements.forEach((achievement) => {
        const info = ACHIEVEMENT_INFO[achievement.achievementType];
        if (info) {
          toast({
            title: "🏆 Achievement Unlocked!",
            description: `${info.label}: ${info.description}`,
            duration: 5000,
          });
        }
      });
    }
  });

  // Check for achievements whenever progress data changes
  useEffect(() => {
    if (progressData) {
      checkAchievementsMutation.mutate();
    }
  }, [progressData?.overallProgress, progressData?.weeksCompleted]);

  // Track achievement count to show new badges
  useEffect(() => {
    if (previousAchievementCount === null) {
      setPreviousAchievementCount(achievements.length);
    } else if (achievements.length > previousAchievementCount) {
      setPreviousAchievementCount(achievements.length);
    }
  }, [achievements.length, previousAchievementCount]);

  const progress = progressData?.overallProgress || 0;
  const currentStreak = progressData?.currentStreak || 0;
  const longestStreak = progressData?.longestStreak || 0;
  
  // Calculate surveyor rank from XP
  const userXp = xpData?.xp ?? 0;
  const rankInfo = getSurveyorRank(userXp);

  // Calculate circle properties
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <Card className="p-6">
      <div className="flex flex-col gap-6">
        {/* Top Section: Progress Ring and Stats */}
        <div className="flex items-center gap-8 flex-wrap">
          {/* Circular Progress Ring */}
          <div className="relative flex items-center justify-center" data-testid="progress-ring-container">
            <svg className="transform -rotate-90" width="160" height="160">
              {/* Background circle */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke="hsl(var(--muted))"
                strokeWidth="12"
                fill="none"
              />
              {/* Progress circle */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke="hsl(var(--primary))"
                strokeWidth="12"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                className="transition-all duration-500 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold" data-testid="text-progress-percent">{progress}%</span>
              <span className="text-sm text-muted-foreground">Complete</span>
            </div>
          </div>

          {/* Progress Breakdown */}
          <div className="flex-1 min-w-[200px] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium">Weeks Completed</span>
              </div>
              <span className="text-sm font-bold" data-testid="text-weeks-completed">
                {progressData?.weeksCompleted || 0} / {progressData?.totalWeeks || 16}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium">Quiz Accuracy</span>
              </div>
              <span className="text-sm font-bold" data-testid="text-quiz-accuracy">
                {progressData?.quizAccuracy || 0}%
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-purple-500" />
                <span className="text-sm font-medium">Flashcard Mastery</span>
              </div>
              <span className="text-sm font-bold" data-testid="text-flashcard-mastery">
                {progressData?.flashcardMasteryPercent || 0}%
              </span>
            </div>
          </div>

          {/* Study Streak */}
          <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-muted/50">
            <div className="flex items-center gap-2">
              <Flame className={`w-6 h-6 ${currentStreak > 0 ? 'text-orange-500' : 'text-muted-foreground'}`} />
              <span className="text-2xl font-bold" data-testid="text-current-streak">{currentStreak}</span>
            </div>
            <span className="text-xs text-muted-foreground">Day Streak</span>
            {longestStreak > 0 && (
              <span className="text-xs text-muted-foreground">
                Best: {longestStreak} days
              </span>
            )}
          </div>

          {/* XP & Rank Display */}
          <div className="flex flex-col gap-2 p-4 rounded-lg bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30 min-w-[160px]">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500" />
              <span className="text-sm font-semibold text-amber-700 dark:text-amber-400" data-testid="text-surveyor-rank">
                {rankInfo.name}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-amber-600 dark:text-amber-300" data-testid="text-xp-total">
                {userXp.toLocaleString()}
              </span>
              <span className="text-xs text-amber-600/70 dark:text-amber-400/70">XP</span>
            </div>
            <Progress 
              value={rankInfo.progress} 
              className="h-2"
            />
            <div className="text-xs text-muted-foreground text-center">
              {rankInfo.nextLevelXp ? (
                <span>Level {rankInfo.level} ({rankInfo.nextLevelXp - userXp} XP to next)</span>
              ) : (
                <span>Max Level Achieved</span>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Section: Achievements */}
        {achievements.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-yellow-500" />
              <h3 className="text-sm font-semibold">Achievements</h3>
              <Badge variant="secondary" className="text-xs" data-testid="badge-achievement-count">
                {achievements.length} / 10
              </Badge>
            </div>
            <div className="flex gap-3 flex-wrap">
              {achievements.map((achievement) => {
                const info = ACHIEVEMENT_INFO[achievement.achievementType];
                if (!info) return null;
                const Icon = info.icon;
                
                return (
                  <div
                    key={achievement.id}
                    className="flex flex-col items-center gap-1 p-3 rounded-lg bg-muted/50 hover-elevate active-elevate-2 min-w-[80px]"
                    title={info.description}
                    data-testid={`achievement-${achievement.achievementType}`}
                  >
                    <Icon className="w-5 h-5 text-primary" />
                    <span className="text-xs font-medium text-center leading-tight">
                      {info.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Motivational Message */}
        {progressData && (
          <div className="text-center text-sm text-muted-foreground">
            {progress < 25 && "Great start! Keep building momentum. 🎯"}
            {progress >= 25 && progress < 50 && "You're making solid progress! Stay consistent. 📚"}
            {progress >= 50 && progress < 75 && "Halfway there! You're doing great. 💪"}
            {progress >= 75 && progress < 100 && "Almost there! Finish strong. 🚀"}
            {progress === 100 && "Outstanding! You've completed your study plan. 🏆"}
          </div>
        )}
      </div>
    </Card>
  );
}
