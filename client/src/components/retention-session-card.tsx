import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Timer, CheckCircle, XCircle, AlertTriangle, Loader2 } from 'lucide-react';
import type { RetentionReview } from '@shared/schema';

export function getMasteryLabel(level: number): string {
  const labels = ['New', 'Learning', 'Reviewing', 'Familiar', 'Proficient', 'Mastered'];
  return labels[Math.min(level, 5)] || 'New';
}

interface RetentionSessionCardProps {
  card: RetentionReview;
  index: number;
  total: number;
  isFlipped: boolean;
  onFlip: () => void;
  onRate: (quality: number) => void;
  activeRating: number | null;
}

// Shared flip-card + 4-point recall rating UI used by both the per-week
// Retention Booster card and the consolidated review dialog.
export function RetentionSessionCard({ card, index, total, isFlipped, onFlip, onRate, activeRating }: RetentionSessionCardProps) {
  return (
    <>
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span data-testid="text-session-progress">Card {index + 1} of {total}</span>
        <Badge variant="secondary" className="text-xs">
          {getMasteryLabel(card.masteryLevel)}
        </Badge>
      </div>

      <div
        className="min-h-[120px] p-4 rounded-lg border bg-card cursor-pointer transition-all hover-elevate"
        onClick={onFlip}
        data-testid="card-concept-flip"
      >
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline" className="text-xs">
            {card.conceptType}
          </Badge>
          <Badge variant="outline" className="text-xs">
            Domain {card.domain}
          </Badge>
        </div>
        <p className="text-sm leading-relaxed">
          {card.conceptText}
        </p>
        {!isFlipped && (
          <p className="text-xs text-muted-foreground mt-3 text-center">
            Click to reveal, then rate your recall
          </p>
        )}
      </div>

      {isFlipped && (
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground text-center">How well did you remember?</p>
          <div className="grid grid-cols-4 gap-2">
            <Button
              size="sm"
              variant="outline"
              className="flex-col h-auto py-2 border-red-300 dark:border-red-700 text-red-600 dark:text-red-400"
              onClick={() => onRate(1)}
              disabled={activeRating !== null}
              data-testid="button-rating-forgot"
            >
              {activeRating === 1 ? (
                <Loader2 className="h-4 w-4 mb-1 animate-spin" />
              ) : (
                <XCircle className="h-4 w-4 mb-1" />
              )}
              <span className="text-xs">Forgot</span>
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="flex-col h-auto py-2 border-orange-300 dark:border-orange-700 text-orange-600 dark:text-orange-400"
              onClick={() => onRate(2)}
              disabled={activeRating !== null}
              data-testid="button-rating-hard"
            >
              {activeRating === 2 ? (
                <Loader2 className="h-4 w-4 mb-1 animate-spin" />
              ) : (
                <AlertTriangle className="h-4 w-4 mb-1" />
              )}
              <span className="text-xs">Hard</span>
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="flex-col h-auto py-2 border-yellow-300 dark:border-yellow-700 text-yellow-600 dark:text-yellow-400"
              onClick={() => onRate(3)}
              disabled={activeRating !== null}
              data-testid="button-rating-good"
            >
              {activeRating === 3 ? (
                <Loader2 className="h-4 w-4 mb-1 animate-spin" />
              ) : (
                <Timer className="h-4 w-4 mb-1" />
              )}
              <span className="text-xs">Good</span>
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="flex-col h-auto py-2 border-green-300 dark:border-green-700 text-green-600 dark:text-green-400"
              onClick={() => onRate(5)}
              disabled={activeRating !== null}
              data-testid="button-rating-easy"
            >
              {activeRating === 5 ? (
                <Loader2 className="h-4 w-4 mb-1 animate-spin" />
              ) : (
                <CheckCircle className="h-4 w-4 mb-1" />
              )}
              <span className="text-xs">Easy</span>
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
