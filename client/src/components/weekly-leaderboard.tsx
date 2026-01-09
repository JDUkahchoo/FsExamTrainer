import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Trophy, Medal, Award, Crown, Star, TrendingUp } from "lucide-react";

interface LeaderboardEntry {
  rank: number;
  userId: string;
  displayName: string;
  profileImageUrl: string | null;
  weeklyXp: number;
  level: number;
  rankName: string;
}

interface UserRank {
  rank: number | null;
  weeklyXp: number;
}

export function WeeklyLeaderboard({ compact = false }: { compact?: boolean }) {
  const { data: leaderboard, isLoading } = useQuery<LeaderboardEntry[]>({
    queryKey: ['/api/leaderboard/weekly'],
  });

  const { data: myRank } = useQuery<UserRank>({
    queryKey: ['/api/leaderboard/my-rank'],
  });

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-5 h-5 text-yellow-500" />;
      case 2: return <Medal className="w-5 h-5 text-gray-400" />;
      case 3: return <Award className="w-5 h-5 text-amber-600" />;
      default: return <span className="w-5 text-center font-bold text-muted-foreground">{rank}</span>;
    }
  };

  const getRankBg = (rank: number) => {
    switch (rank) {
      case 1: return 'bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 border-yellow-200 dark:border-yellow-800';
      case 2: return 'bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-900/20 dark:to-slate-900/20 border-gray-200 dark:border-gray-700';
      case 3: return 'bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-amber-200 dark:border-amber-800';
      default: return '';
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            Weekly Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[1, 2, 3].map(i => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </CardContent>
      </Card>
    );
  }

  const displayEntries = compact ? leaderboard?.slice(0, 5) : leaderboard?.slice(0, 10);

  return (
    <Card data-testid="card-weekly-leaderboard">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              Weekly Leaderboard
            </CardTitle>
            <CardDescription>Top learners this week</CardDescription>
          </div>
          {myRank?.rank && (
            <Badge variant="outline" className="flex items-center gap-1">
              <Star className="w-3 h-3" />
              Your Rank: #{myRank.rank}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {!displayEntries || displayEntries.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <TrendingUp className="w-10 h-10 mx-auto mb-2 opacity-50" />
            <p>No activity this week yet</p>
            <p className="text-sm">Start studying to appear on the leaderboard!</p>
          </div>
        ) : (
          <div className="space-y-2">
            {displayEntries.map((entry) => (
              <div
                key={entry.userId}
                className={`flex items-center gap-3 p-2 rounded-lg border ${getRankBg(entry.rank)}`}
                data-testid={`leaderboard-entry-${entry.rank}`}
              >
                <div className="w-6 flex justify-center">
                  {getRankIcon(entry.rank)}
                </div>
                
                <Avatar className="w-8 h-8">
                  <AvatarImage src={entry.profileImageUrl || undefined} />
                  <AvatarFallback className="text-xs">
                    {entry.displayName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate text-sm">{entry.displayName}</p>
                  <p className="text-xs text-muted-foreground">{entry.rankName}</p>
                </div>

                <div className="text-right">
                  <p className="font-bold text-primary">{entry.weeklyXp.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">XP</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {myRank && myRank.rank && myRank.rank > 10 && (
          <div className="mt-4 pt-3 border-t">
            <div className="flex items-center gap-3 p-2 bg-primary/5 rounded-lg">
              <div className="w-6 flex justify-center">
                <span className="font-bold text-muted-foreground">#{myRank.rank}</span>
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">You</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-primary">{myRank.weeklyXp.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">XP</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
