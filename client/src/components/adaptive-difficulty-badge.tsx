import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { TrendingUp, TrendingDown, Minus, Zap } from "lucide-react";

type DifficultyLevel = 'easy' | 'medium' | 'hard';

interface DifficultySettings {
  id: string;
  domain: string;
  currentDifficulty: DifficultyLevel;
  consecutiveCorrect: number;
  consecutiveIncorrect: number;
  totalAttempts: number;
  correctAttempts: number;
}

export function AdaptiveDifficultyBadge({ domain }: { domain: string }) {
  const { data: settings } = useQuery<DifficultySettings[]>({
    queryKey: ['/api/difficulty'],
  });

  const domainSettings = settings?.find(s => s.domain === domain);
  const difficulty = domainSettings?.currentDifficulty || 'medium';

  const getDifficultyColor = (diff: DifficultyLevel) => {
    switch (diff) {
      case 'easy': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'medium': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'hard': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
    }
  };

  const getDifficultyIcon = (diff: DifficultyLevel) => {
    switch (diff) {
      case 'easy': return <TrendingDown className="w-3 h-3 mr-1" />;
      case 'medium': return <Minus className="w-3 h-3 mr-1" />;
      case 'hard': return <TrendingUp className="w-3 h-3 mr-1" />;
    }
  };

  const accuracy = domainSettings 
    ? Math.round((domainSettings.correctAttempts / Math.max(1, domainSettings.totalAttempts)) * 100)
    : 0;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Badge 
          variant="outline" 
          className={`${getDifficultyColor(difficulty)} flex items-center gap-1`}
          data-testid={`badge-difficulty-${domain}`}
        >
          <Zap className="w-3 h-3" />
          {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
        </Badge>
      </TooltipTrigger>
      <TooltipContent>
        <div className="text-sm">
          <p className="font-medium">Adaptive Difficulty: {difficulty}</p>
          {domainSettings && (
            <>
              <p className="text-muted-foreground">
                Accuracy: {accuracy}% ({domainSettings.correctAttempts}/{domainSettings.totalAttempts})
              </p>
              <p className="text-muted-foreground text-xs mt-1">
                {domainSettings.consecutiveCorrect > 0 && `${domainSettings.consecutiveCorrect} correct in a row`}
                {domainSettings.consecutiveIncorrect > 0 && `${domainSettings.consecutiveIncorrect} incorrect in a row`}
              </p>
            </>
          )}
          <p className="text-xs text-muted-foreground mt-1">
            Questions adjust based on your performance
          </p>
        </div>
      </TooltipContent>
    </Tooltip>
  );
}

export function DifficultyIndicator({ 
  difficulty, 
  showLabel = true 
}: { 
  difficulty: DifficultyLevel; 
  showLabel?: boolean;
}) {
  const getDifficultyColor = (diff: DifficultyLevel) => {
    switch (diff) {
      case 'easy': return 'text-green-600 dark:text-green-400';
      case 'medium': return 'text-yellow-600 dark:text-yellow-400';
      case 'hard': return 'text-red-600 dark:text-red-400';
    }
  };

  const getDifficultyBg = (diff: DifficultyLevel) => {
    switch (diff) {
      case 'easy': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'hard': return 'bg-red-500';
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${getDifficultyBg(difficulty)}`} />
      {showLabel && (
        <span className={`text-xs font-medium ${getDifficultyColor(difficulty)}`}>
          {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
        </span>
      )}
    </div>
  );
}
