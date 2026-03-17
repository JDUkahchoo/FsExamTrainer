import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import { useParams } from "wouter";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  XCircle,
  BookMarked,
  CircleDot,
  Lightbulb,
  Trophy,
  Loader2,
  AlertTriangle,
  Star,
  ListOrdered,
} from "lucide-react";
import { useExamTrack } from "@/contexts/exam-track-context";
import { STUDY_READINGS } from "@shared/data/studyReadings";
import type {
  ReadingSection,
} from "@shared/schema";
import { getDomainConfig } from "@/lib/domains";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";

function ConceptSection({
  section,
  completed,
  onMarkRead,
}: {
  section: ReadingSection;
  completed: boolean;
  onMarkRead: () => void;
}) {
  return (
    <Card className="hover-elevate" data-testid={`section-concept-${section.id}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 flex-wrap">
          <BookOpen className="h-5 w-5 text-muted-foreground" />
          {section.title}
          {completed && <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm leading-relaxed whitespace-pre-line">
          {section.content}
        </div>
        {!completed && (
          <Button
            variant="outline"
            size="sm"
            onClick={onMarkRead}
            data-testid={`button-mark-read-${section.id}`}
          >
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Mark as read
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

function FormulaSection({
  section,
  completed,
  onMarkRead,
}: {
  section: ReadingSection;
  completed: boolean;
  onMarkRead: () => void;
}) {
  const formula = section.formula!;
  return (
    <Card
      className="hover-elevate border-blue-200 dark:border-blue-800 bg-blue-50/30 dark:bg-blue-950/20"
      data-testid={`section-formula-${section.id}`}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2 flex-wrap">
          <CircleDot className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          {section.title}
          {completed && <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          className="bg-muted rounded-md p-4 font-mono text-base leading-relaxed"
          data-testid={`formula-expression-${section.id}`}
        >
          {formula.expression}
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">Variables:</p>
          <ul className="space-y-1">
            {formula.variables.map((v, i) => (
              <li key={i} className="text-sm flex items-start gap-2">
                <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs shrink-0">
                  {v.symbol}
                </code>
                <span className="text-muted-foreground">{v.description}</span>
              </li>
            ))}
          </ul>
        </div>

        <Alert>
          <Lightbulb className="h-4 w-4" />
          <AlertDescription className="text-sm">
            <span className="font-medium">When to use: </span>
            {formula.whenToUse}
          </AlertDescription>
        </Alert>

        {!completed && (
          <Button
            variant="outline"
            size="sm"
            onClick={onMarkRead}
            data-testid={`button-mark-read-${section.id}`}
          >
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Mark as read
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

function WorkedExampleSection({
  section,
  completed,
  onMarkRead,
}: {
  section: ReadingSection;
  completed: boolean;
  onMarkRead: () => void;
}) {
  const example = section.workedExample!;
  return (
    <Card className="hover-elevate" data-testid={`section-worked-example-${section.id}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 flex-wrap">
          <Lightbulb className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          {section.title}
          {completed && <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm leading-relaxed">
          <span className="font-medium">Problem: </span>
          {example.problem}
        </div>

        <div className="space-y-3">
          {example.steps.map((s) => (
            <div key={s.step} className="flex gap-3">
              <div className="flex items-center justify-center h-6 w-6 rounded-full bg-muted text-xs font-medium shrink-0 mt-0.5">
                {s.step}
              </div>
              <div className="space-y-1 min-w-0">
                <p className="text-sm">{s.description}</p>
                {s.calculation && (
                  <code className="block text-sm font-mono bg-muted rounded-md px-3 py-2">
                    {s.calculation}
                  </code>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-md p-3">
          <p className="text-sm font-medium text-green-800 dark:text-green-300">
            {example.answer}
          </p>
        </div>

        {!completed && (
          <Button
            variant="outline"
            size="sm"
            onClick={onMarkRead}
            data-testid={`button-mark-read-${section.id}`}
          >
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Mark as read
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

function KnowledgeCheckSection({
  section,
  completed,
  onMarkRead,
}: {
  section: ReadingSection;
  completed: boolean;
  onMarkRead: () => void;
}) {
  const check = section.knowledgeCheck!;
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const isCorrect = checked && selectedIndex === check.correctIndex;
  const isIncorrect = checked && selectedIndex !== check.correctIndex;

  const handleCheck = () => {
    if (selectedIndex === null) return;
    setChecked(true);
    if (selectedIndex === check.correctIndex) {
      onMarkRead();
    }
  };

  const handleRetry = () => {
    setSelectedIndex(null);
    setChecked(false);
  };

  return (
    <Card
      className={`hover-elevate ${
        isCorrect
          ? "border-green-400 dark:border-green-600"
          : isIncorrect
          ? "border-red-400 dark:border-red-600"
          : ""
      }`}
      data-testid={`section-knowledge-check-${section.id}`}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2 flex-wrap">
          <CircleDot className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          {section.title || "Knowledge Check"}
          {completed && <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm font-medium">{check.question}</p>

        <div className="space-y-2">
          {check.options.map((option, i) => {
            let borderClass = "border-2 border-border";
            if (checked && i === check.correctIndex) {
              borderClass = "border-2 border-green-500 dark:border-green-400 bg-green-50/50 dark:bg-green-950/30";
            } else if (checked && i === selectedIndex && i !== check.correctIndex) {
              borderClass = "border-2 border-red-500 dark:border-red-400 bg-red-50/50 dark:bg-red-950/30";
            } else if (!checked && i === selectedIndex) {
              borderClass = "border-2 border-primary";
            }

            return (
              <button
                key={i}
                type="button"
                className={`w-full text-left rounded-md p-3 text-sm transition-colors ${borderClass} ${
                  checked ? "cursor-default" : "cursor-pointer"
                }`}
                onClick={() => !checked && setSelectedIndex(i)}
                disabled={checked}
                data-testid={`option-${section.id}-${i}`}
              >
                <span className="font-mono text-xs text-muted-foreground mr-2">
                  {String.fromCharCode(65 + i)}.
                </span>
                {option}
              </button>
            );
          })}
        </div>

        {!checked && (
          <Button
            onClick={handleCheck}
            disabled={selectedIndex === null}
            data-testid={`button-check-${section.id}`}
          >
            Check Answer
          </Button>
        )}

        {checked && (
          <Alert
            className={
              isCorrect
                ? "border-green-300 dark:border-green-700"
                : "border-red-300 dark:border-red-700"
            }
          >
            {isCorrect ? (
              <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
            ) : (
              <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
            )}
            <AlertDescription className="text-sm">
              <span className="font-medium">
                {isCorrect ? "Correct! " : "Incorrect. "}
              </span>
              {check.explanation}
            </AlertDescription>
          </Alert>
        )}

        {isIncorrect && (
          <Button variant="outline" size="sm" onClick={handleRetry} data-testid={`button-retry-${section.id}`}>
            Try Again
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

function FurtherReadingSection({
  section,
  completed,
  onMarkRead,
}: {
  section: ReadingSection;
  completed: boolean;
  onMarkRead: () => void;
}) {
  const refs = section.furtherReading!;
  return (
    <Card
      className="bg-muted/30"
      data-testid={`section-further-reading-${section.id}`}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2 flex-wrap text-base">
          <BookMarked className="h-5 w-5 text-muted-foreground" />
          For More Depth
          {completed && <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {refs.map((ref, i) => (
          <div key={i} className="flex items-start gap-3 text-sm">
            <BookOpen className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
            <div>
              <p className="font-medium">{ref.book}</p>
              <p className="text-muted-foreground">
                {ref.chapter} — {ref.topic}
              </p>
            </div>
          </div>
        ))}
        {!completed && (
          <Button
            variant="outline"
            size="sm"
            onClick={onMarkRead}
            data-testid={`button-mark-read-${section.id}`}
          >
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Mark as read
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

function CommonMistakesSection({
  section,
  completed,
  onMarkRead,
}: {
  section: ReadingSection;
  completed: boolean;
  onMarkRead: () => void;
}) {
  const mistakes = section.commonMistakes ?? [];
  return (
    <Card
      className="hover-elevate border-orange-200 dark:border-orange-800 bg-orange-50/30 dark:bg-orange-950/20"
      data-testid={`section-common-mistakes-${section.id}`}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2 flex-wrap">
          <AlertTriangle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
          {section.title || "Common Mistakes"}
          {completed && <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ul className="space-y-2">
          {mistakes.map((mistake, i) => (
            <li key={i} className="flex items-start gap-3 text-sm">
              <span className="flex-shrink-0 mt-0.5 h-5 w-5 rounded-full bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300 flex items-center justify-center text-xs font-bold">
                !
              </span>
              <span>{mistake}</span>
            </li>
          ))}
        </ul>
        {!completed && (
          <Button
            variant="outline"
            size="sm"
            onClick={onMarkRead}
            data-testid={`button-mark-read-${section.id}`}
          >
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Mark as read
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

function ExamTipsSection({
  section,
  completed,
  onMarkRead,
}: {
  section: ReadingSection;
  completed: boolean;
  onMarkRead: () => void;
}) {
  const tips = section.examTips ?? [];
  return (
    <Card
      className="hover-elevate border-yellow-200 dark:border-yellow-800 bg-yellow-50/30 dark:bg-yellow-950/20"
      data-testid={`section-exam-tips-${section.id}`}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2 flex-wrap">
          <Star className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
          {section.title || "Exam Tips"}
          {completed && <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ul className="space-y-2">
          {tips.map((tip, i) => (
            <li key={i} className="flex items-start gap-3 text-sm">
              <Lightbulb className="h-4 w-4 text-yellow-600 dark:text-yellow-400 mt-0.5 shrink-0" />
              <span>{tip}</span>
            </li>
          ))}
        </ul>
        {!completed && (
          <Button
            variant="outline"
            size="sm"
            onClick={onMarkRead}
            data-testid={`button-mark-read-${section.id}`}
          >
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Mark as read
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

function ProcedureSection({
  section,
  completed,
  onMarkRead,
}: {
  section: ReadingSection;
  completed: boolean;
  onMarkRead: () => void;
}) {
  const steps = section.procedureSteps ?? [];
  return (
    <Card
      className="hover-elevate border-teal-200 dark:border-teal-800 bg-teal-50/30 dark:bg-teal-950/20"
      data-testid={`section-procedure-${section.id}`}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2 flex-wrap">
          <ListOrdered className="h-5 w-5 text-teal-600 dark:text-teal-400" />
          {section.title || "Step-by-Step Procedure"}
          {completed && <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ol className="space-y-3">
          {steps.map((s) => (
            <li key={s.step} className="flex gap-3">
              <div className="flex-shrink-0 h-7 w-7 rounded-full bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300 flex items-center justify-center text-xs font-bold mt-0.5">
                {s.step}
              </div>
              <div className="space-y-0.5 min-w-0">
                <p className="text-sm font-medium">{s.action}</p>
                {s.detail && (
                  <p className="text-sm text-muted-foreground">{s.detail}</p>
                )}
              </div>
            </li>
          ))}
        </ol>
        {!completed && (
          <Button
            variant="outline"
            size="sm"
            onClick={onMarkRead}
            data-testid={`button-mark-read-${section.id}`}
          >
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Mark as read
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

export default function StudyReadingPage() {
  const params = useParams<{ id: string }>();
  const { examTrack } = useExamTrack();
  const readingId = params.id;

  const urlParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const fromStudyPlan = urlParams.get('from') === 'study-plan';
  const returnWeek = urlParams.get('week');
  const backPath = fromStudyPlan && returnWeek
    ? `/app/${examTrack}/study-plan?week=${returnWeek}`
    : `/app/${examTrack}/readings`;
  const backLabel = fromStudyPlan ? 'Back to Study Plan' : 'Back to Readings';

  const reading = STUDY_READINGS.find((r) => r.id === readingId);

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const { data: progressData, isLoading: progressLoading } = useQuery<Array<{ sectionId: string }>>({
    queryKey: ['/api/study-reading-progress', readingId],
    enabled: !!readingId,
  });

  const completedSections = useMemo(() => {
    const set = new Set<string>();
    if (progressData) {
      for (const p of progressData) {
        set.add(p.sectionId);
      }
    }
    return set;
  }, [progressData]);

  const markSectionMutation = useMutation({
    mutationFn: async (sectionId: string) => {
      await apiRequest("POST", `/api/study-reading-progress/${readingId}/section/${sectionId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/study-reading-progress', readingId] });
      queryClient.invalidateQueries({ queryKey: ['/api/study-reading-progress'] });
      queryClient.invalidateQueries({ queryKey: ['/api/user/xp'] });
      queryClient.invalidateQueries({ queryKey: ['/api/progress/domain-mastery'] });
    },
  });

  const markSectionRead = useCallback(
    (sectionId: string) => {
      markSectionMutation.mutate(sectionId);
    },
    [markSectionMutation]
  );

  const scrollToSection = useCallback((index: number) => {
    setActiveSectionIndex(index);
    sectionRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);

  if (!reading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Card className="max-w-md">
          <CardContent className="pt-6 space-y-4">
            <p className="text-center text-muted-foreground" data-testid="text-not-found">
              Reading not found.
            </p>
            <Link href={backPath}>
              <Button className="w-full" data-testid="button-back-to-readings">
                <ArrowLeft className="h-4 w-4 mr-2" />
                {backLabel}
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const sections = reading.sections;
  const completedCount = completedSections.size;
  const totalSections = sections.length;
  const progressPercent =
    totalSections > 0 ? Math.round((completedCount / totalSections) * 100) : 0;
  const allCompleted = completedCount === totalSections;

  const domainConfig = getDomainConfig(reading.domain);

  const renderSection = (section: ReadingSection, index: number) => {
    const isCompleted = completedSections.has(section.id);
    const handleMarkRead = () => markSectionRead(section.id);

    switch (section.type) {
      case "concept":
        return (
          <ConceptSection
            section={section}
            completed={isCompleted}
            onMarkRead={handleMarkRead}
          />
        );
      case "formula":
        return (
          <FormulaSection
            section={section}
            completed={isCompleted}
            onMarkRead={handleMarkRead}
          />
        );
      case "worked_example":
        return (
          <WorkedExampleSection
            section={section}
            completed={isCompleted}
            onMarkRead={handleMarkRead}
          />
        );
      case "knowledge_check":
        return (
          <KnowledgeCheckSection
            section={section}
            completed={isCompleted}
            onMarkRead={handleMarkRead}
          />
        );
      case "further_reading":
        return (
          <FurtherReadingSection
            section={section}
            completed={isCompleted}
            onMarkRead={handleMarkRead}
          />
        );
      case "common_mistakes":
        return (
          <CommonMistakesSection
            section={section}
            completed={isCompleted}
            onMarkRead={handleMarkRead}
          />
        );
      case "exam_tips":
        return (
          <ExamTipsSection
            section={section}
            completed={isCompleted}
            onMarkRead={handleMarkRead}
          />
        );
      case "procedure":
        return (
          <ProcedureSection
            section={section}
            completed={isCompleted}
            onMarkRead={handleMarkRead}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <div className="mb-6 space-y-4">
        <Link href={backPath}>
          <Button variant="ghost" size="sm" data-testid="button-back-to-readings">
            <ArrowLeft className="h-4 w-4 mr-2" />
            {backLabel}
          </Button>
        </Link>

        <div className="space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge
              variant="outline"
              className={`${domainConfig.bgColor} ${domainConfig.textColor}`}
              data-testid="badge-domain"
            >
              {reading.domain}
            </Badge>
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              {reading.estimatedMinutes} min
            </span>
          </div>
          <h1 className="text-2xl font-bold" data-testid="text-reading-title">
            {reading.title}
          </h1>
          <p className="text-muted-foreground text-sm">{reading.description}</p>
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {completedCount} / {totalSections} sections completed
            </span>
            <span className="text-muted-foreground">{progressPercent}%</span>
          </div>
          <Progress value={progressPercent} className="h-2" data-testid="progress-sections" />
        </div>
      </div>

      <div className="space-y-6">
        {sections.map((section, index) => (
          <div
            key={section.id}
            ref={(el) => {
              sectionRefs.current[index] = el;
            }}
          >
            {renderSection(section, index)}
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between gap-4">
        <Button
          variant="outline"
          onClick={() => scrollToSection(Math.max(0, activeSectionIndex - 1))}
          disabled={activeSectionIndex === 0}
          data-testid="button-previous-section"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous Section
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            scrollToSection(Math.min(sections.length - 1, activeSectionIndex + 1))
          }
          disabled={activeSectionIndex === sections.length - 1}
          data-testid="button-next-section"
        >
          Next Section
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>

      {allCompleted && (
        <Card className="mt-8 border-green-300 dark:border-green-700 bg-green-50/50 dark:bg-green-950/20" data-testid="card-completion-summary">
          <CardContent className="pt-6 text-center space-y-3">
            <Trophy className="h-10 w-10 text-green-600 dark:text-green-400 mx-auto" />
            <h2 className="text-lg font-semibold">Reading Complete</h2>
            <p className="text-sm text-muted-foreground">
              You have completed all {totalSections} sections of this reading.
            </p>
            <Link href={backPath}>
              <Button data-testid="button-back-after-complete">
                <ArrowLeft className="h-4 w-4 mr-2" />
                {backLabel}
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
