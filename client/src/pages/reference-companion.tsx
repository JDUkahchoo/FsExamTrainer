import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  BookOpen, 
  ChevronRight, 
  BookMarked, 
  GraduationCap,
  Link2,
  ExternalLink,
  Search,
  Layers
} from "lucide-react";
import { useLocation } from "wouter";
import { 
  REFERENCE_BOOKS, 
  SRM_TOPICS, 
  LESSON_MAPPINGS, 
  getBookChapters,
  getLessonsByDomain,
  ES_CHAPTERS,
  ES_LESSON_MAPPINGS,
  type LessonMapping 
} from "@shared/data/referenceManualMappings";
import { NCEES_DOMAINS } from "@shared/domains";

const DOMAIN_COLORS: Record<number, string> = {
  0: "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200",
  1: "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200",
  2: "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200",
  3: "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200",
  4: "bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-200",
  5: "bg-rose-100 dark:bg-rose-900/30 text-rose-800 dark:text-rose-200",
  6: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-200",
  7: "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200"
};

export default function ReferenceCompanion() {
  const [, setLocation] = useLocation();
  const [selectedBook, setSelectedBook] = useState<string>("SRM");
  const [viewMode, setViewMode] = useState<"by-chapter" | "by-domain">("by-chapter");

  const book = REFERENCE_BOOKS[selectedBook as keyof typeof REFERENCE_BOOKS];
  const chapters = getBookChapters(selectedBook);

  const renderChapterView = () => {
    if (selectedBook === "ES") {
      return renderESChapterView();
    }
    return (
      <div className="space-y-4">
        {Object.entries(SRM_TOPICS).map(([topicKey, topic]) => (
          <Card key={topicKey} className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="outline" className="font-mono text-xs">
                Topic {topicKey}
              </Badge>
              <h3 className="font-semibold text-foreground">{topic.name}</h3>
            </div>
            <div className="space-y-2">
              {topic.chapters.map((chapter) => {
                const linkedLessons = LESSON_MAPPINGS.filter(m => 
                  m.references.some(ref => ref.bookId === "SRM" && ref.chapter === chapter.number)
                );
                
                return (
                  <div 
                    key={chapter.number} 
                    className="flex items-start gap-3 p-3 rounded-md bg-muted/50 hover-elevate"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">{chapter.number}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm text-foreground">{chapter.title}</div>
                      {linkedLessons.length > 0 ? (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {linkedLessons.map((lesson) => (
                            <Badge 
                              key={lesson.lessonId}
                              variant="secondary" 
                              className={`text-xs cursor-pointer ${DOMAIN_COLORS[lesson.domainNumber]}`}
                              onClick={() => setLocation(`/lesson/${lesson.lessonId}`)}
                              data-testid={`link-lesson-${lesson.lessonId}`}
                            >
                              {lesson.lessonTitle.length > 25 
                                ? lesson.lessonTitle.substring(0, 25) + "..." 
                                : lesson.lessonTitle}
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground mt-1 block">
                          No linked lessons yet
                        </span>
                      )}
                    </div>
                    <div className="flex-shrink-0 text-xs text-muted-foreground">
                      {linkedLessons.length} lesson{linkedLessons.length !== 1 ? "s" : ""}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        ))}
      </div>
    );
  };

  const renderESChapterView = () => {
    const esChapterGroups = [
      { name: "Fundamentals", chapters: [1, 2, 3] },
      { name: "Field Measurements", chapters: [4, 5, 6, 7, 8] },
      { name: "Traverse & Coordinates", chapters: [9, 10, 11, 12] },
      { name: "GNSS & Adjustments", chapters: [13, 14, 15, 16] },
      { name: "Mapping", chapters: [17, 18, 19, 20] },
      { name: "Boundary & Land Surveys", chapters: [21, 22] },
      { name: "Construction & Curves", chapters: [23, 24, 25, 26] },
      { name: "Advanced Topics", chapters: [27, 28] }
    ];

    return (
      <div className="space-y-4">
        {esChapterGroups.map((group) => (
          <Card key={group.name} className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="outline" className="font-mono text-xs">
                {group.name}
              </Badge>
            </div>
            <div className="space-y-2">
              {group.chapters.map((chapterNum) => {
                const chapter = ES_CHAPTERS[chapterNum];
                if (!chapter) return null;
                
                const linkedLessonIds = Object.entries(ES_LESSON_MAPPINGS)
                  .filter(([_, mapping]) => mapping.chapters.includes(chapterNum))
                  .map(([lessonId]) => lessonId);
                
                const linkedLessons = LESSON_MAPPINGS.filter(m => 
                  linkedLessonIds.includes(m.lessonId)
                );
                
                return (
                  <div 
                    key={chapterNum} 
                    className="flex items-start gap-3 p-3 rounded-md bg-muted/50 hover-elevate"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">{chapterNum}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm text-foreground">{chapter.title}</div>
                      <div className="text-xs text-muted-foreground">p. {chapter.pageStart}+</div>
                      {linkedLessons.length > 0 ? (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {linkedLessons.map((lesson) => (
                            <Badge 
                              key={lesson.lessonId}
                              variant="secondary" 
                              className={`text-xs cursor-pointer ${DOMAIN_COLORS[lesson.domainNumber]}`}
                              onClick={() => setLocation(`/lesson/${lesson.lessonId}`)}
                              data-testid={`link-es-lesson-${lesson.lessonId}`}
                            >
                              {lesson.lessonTitle.length > 25 
                                ? lesson.lessonTitle.substring(0, 25) + "..." 
                                : lesson.lessonTitle}
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground mt-1 block">
                          No linked lessons yet
                        </span>
                      )}
                    </div>
                    <div className="flex-shrink-0 text-xs text-muted-foreground">
                      {linkedLessons.length} lesson{linkedLessons.length !== 1 ? "s" : ""}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        ))}
      </div>
    );
  };

  const renderDomainView = () => {
    return (
      <div className="space-y-4">
        {Object.entries(NCEES_DOMAINS).map(([domainNum, domainName]) => {
          const domainNumber = parseInt(domainNum);
          const lessons = getLessonsByDomain(domainNumber);
          
          return (
            <Card key={domainNumber} className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Badge className={DOMAIN_COLORS[domainNumber]}>
                  Domain {domainNumber}
                </Badge>
                <h3 className="font-semibold text-foreground">{domainName}</h3>
                <span className="text-sm text-muted-foreground ml-auto">
                  {lessons.length} lessons
                </span>
              </div>
              <div className="space-y-2">
                {lessons.map((lesson) => {
                  const esMapping = ES_LESSON_MAPPINGS[lesson.lessonId];
                  const displayRefs = selectedBook === "ES" && esMapping
                    ? esMapping.chapters.map(chNum => {
                        const ch = ES_CHAPTERS[chNum];
                        return ch ? { chapter: chNum, chapterTitle: ch.title } : null;
                      }).filter(Boolean) as { chapter: number; chapterTitle: string }[]
                    : lesson.references;
                  
                  return (
                    <div 
                      key={lesson.lessonId}
                      className="flex items-start gap-3 p-3 rounded-md bg-muted/50 hover-elevate cursor-pointer"
                      onClick={() => setLocation(`/lesson/${lesson.lessonId}`)}
                      data-testid={`card-lesson-${lesson.lessonId}`}
                    >
                      <BookOpen className="w-4 h-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm text-foreground">{lesson.lessonTitle}</div>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {displayRefs.map((ref, idx) => (
                            <Badge 
                              key={idx}
                              variant="outline"
                              className="text-xs"
                            >
                              Ch. {ref.chapter}: {ref.chapterTitle}
                            </Badge>
                          ))}
                          {selectedBook === "ES" && esMapping?.studyTips && (
                            <Badge variant="secondary" className="text-xs">
                              {esMapping.studyTips}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    </div>
                  );
                })}
              </div>
            </Card>
          );
        })}
      </div>
    );
  };

  const totalLessons = LESSON_MAPPINGS.length;
  const esLessonsWithMappings = Object.keys(ES_LESSON_MAPPINGS).length;
  const totalChapters = selectedBook === "ES" ? Object.keys(ES_CHAPTERS).length : chapters.length;
  const lessonsWithReferences = selectedBook === "ES" 
    ? esLessonsWithMappings 
    : LESSON_MAPPINGS.filter(m => m.references.length > 0).length;

  return (
    <div className="container max-w-5xl mx-auto py-6 px-4 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <BookMarked className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Reference Manual Companion</h1>
        </div>
        <p className="text-muted-foreground">
          Navigate between your study lessons and textbook chapters. Click any lesson to start studying.
        </p>
      </div>

      {/* Book Selector */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-16 bg-primary/10 rounded flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">{book.title}</h2>
              <p className="text-sm text-muted-foreground">{book.author}</p>
              <Badge variant="outline" className="mt-1 text-xs">{book.edition}</Badge>
            </div>
          </div>
          <div className="sm:ml-auto flex flex-wrap gap-2">
            <Button
              variant={selectedBook === "SRM" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedBook("SRM")}
              data-testid="button-select-srm"
            >
              Surveyor Reference Manual
            </Button>
            <Button
              variant={selectedBook === "ES" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedBook("ES")}
              data-testid="button-select-es"
            >
              Elementary Surveying
            </Button>
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-foreground">{totalLessons}</div>
          <div className="text-sm text-muted-foreground">Lessons Mapped</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-foreground">{totalChapters}</div>
          <div className="text-sm text-muted-foreground">Chapters Linked</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-foreground">8</div>
          <div className="text-sm text-muted-foreground">NCEES Domains</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-primary">{Math.round((lessonsWithReferences / totalLessons) * 100)}%</div>
          <div className="text-sm text-muted-foreground">Coverage</div>
        </Card>
      </div>

      {/* View Toggle */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">View by:</span>
        <Button
          variant={viewMode === "by-chapter" ? "default" : "outline"}
          size="sm"
          onClick={() => setViewMode("by-chapter")}
          data-testid="button-view-chapter"
        >
          <Layers className="w-4 h-4 mr-1" />
          Book Chapters
        </Button>
        <Button
          variant={viewMode === "by-domain" ? "default" : "outline"}
          size="sm"
          onClick={() => setViewMode("by-domain")}
          data-testid="button-view-domain"
        >
          <Search className="w-4 h-4 mr-1" />
          NCEES Domains
        </Button>
      </div>

      {/* Content */}
      <ScrollArea className="h-[calc(100vh-450px)] min-h-[400px]">
        {viewMode === "by-chapter" ? renderChapterView() : renderDomainView()}
      </ScrollArea>

      {/* Footer Note */}
      <Card className="p-4 bg-muted/30">
        <div className="flex items-start gap-3">
          <Link2 className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-foreground font-medium">How to Use This Companion</p>
            <p className="text-sm text-muted-foreground mt-1">
              Each lesson is linked to relevant chapters in your reference manual. Use this to study in parallel - 
              complete a lesson, then review the corresponding chapter for deeper understanding. 
              This is especially helpful for topics you find challenging.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
