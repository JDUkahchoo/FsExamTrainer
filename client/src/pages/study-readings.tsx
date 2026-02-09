import { useMemo } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollText, Clock, BookOpen, ArrowRight, CheckCircle2 } from "lucide-react";
import { useExamTrack } from "@/contexts/exam-track-context";
import { STUDY_READINGS } from "@shared/data/studyReadings";
import { getDomainConfig } from "@/lib/domains";
import { useQuery } from "@tanstack/react-query";

export default function StudyReadingsPage() {
  const { examTrack, examName } = useExamTrack();

  const { data: allProgress } = useQuery<Array<{ readingId: string; sectionId: string }>>({
    queryKey: ['/api/study-reading-progress'],
  });

  const progressByReading = useMemo(() => {
    const map: Record<string, Set<string>> = {};
    if (allProgress) {
      for (const p of allProgress) {
        if (!map[p.readingId]) map[p.readingId] = new Set();
        map[p.readingId].add(p.sectionId);
      }
    }
    return map;
  }, [allProgress]);

  const readings = STUDY_READINGS.filter(r => r.examTrack === examTrack);

  const readingsByDomain = readings.reduce<Record<number, typeof readings>>((acc, reading) => {
    if (!acc[reading.domainNumber]) {
      acc[reading.domainNumber] = [];
    }
    acc[reading.domainNumber].push(reading);
    return acc;
  }, {});

  const sortedDomainNumbers = Object.keys(readingsByDomain)
    .map(Number)
    .sort((a, b) => a - b);

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2" data-testid="text-readings-title">
          {examName} Study Readings
        </h1>
        <p className="text-muted-foreground">
          Interactive readings that teach the core material. Each reading covers key concepts with explanations,
          formulas, worked examples, and knowledge checks.
        </p>
      </div>

      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <ScrollText className="w-4 h-4" />
        <span>{readings.length} readings available</span>
        <span className="text-border">|</span>
        <Clock className="w-4 h-4" />
        <span>{readings.reduce((sum, r) => sum + r.estimatedMinutes, 0)} min total</span>
      </div>

      {sortedDomainNumbers.length === 0 && (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground" data-testid="text-no-readings">
              No study readings available for this exam track yet. Check back soon!
            </p>
          </CardContent>
        </Card>
      )}

      {sortedDomainNumbers.map(domainNumber => {
        const domainReadings = readingsByDomain[domainNumber];
        const domainName = domainReadings[0].domain;
        const config = getDomainConfig(domainName);

        return (
          <div key={domainNumber} className="space-y-3" data-testid={`domain-group-${domainNumber}`}>
            <div className="flex items-center gap-3 flex-wrap">
              <Badge
                variant="secondary"
                className={`border ${config.bgColor} ${config.textColor} ${config.borderColor}`}
              >
                Domain {domainNumber}
              </Badge>
              <h2 className="text-lg font-semibold">{domainName}</h2>
            </div>

            <div className="grid gap-3">
              {domainReadings.map(reading => {
                const completedSet = progressByReading[reading.id];
                const completedCount = completedSet ? completedSet.size : 0;
                const totalSections = reading.sections.length;
                const pct = totalSections > 0 ? Math.round((completedCount / totalSections) * 100) : 0;
                const isComplete = completedCount === totalSections;

                return (
                  <Link key={reading.id} href={`/app/${examTrack}/readings/${reading.id}`}>
                    <Card className="hover-elevate cursor-pointer" data-testid={`card-reading-${reading.id}`}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0 space-y-1.5">
                            <div className="flex items-center gap-2 flex-wrap">
                              <BookOpen className="w-4 h-4 text-muted-foreground shrink-0" />
                              <h3 className="font-medium" data-testid={`text-reading-title-${reading.id}`}>
                                {reading.title}
                              </h3>
                              {isComplete && (
                                <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400 shrink-0" />
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {reading.description}
                            </p>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                ~{reading.estimatedMinutes} min
                              </span>
                              <span>{reading.sections.length} sections</span>
                              {completedCount > 0 && (
                                <span>{completedCount}/{totalSections} done</span>
                              )}
                            </div>
                            {completedCount > 0 && (
                              <Progress value={pct} className="h-1.5" data-testid={`progress-reading-${reading.id}`} />
                            )}
                          </div>
                          <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0 mt-1" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
