import { useEffect } from 'react';
import { Link, useSearch } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BookOpen, CheckCircle2, ChevronRight, Lock } from 'lucide-react';
import { useExamTrack } from '@/contexts/exam-track-context';
import { getDomainConfig } from '@/lib/domains';

interface Lesson {
  id: string;
  title: string;
  domain: string;
  domainNumber: number;
  orderIndex: number;
  difficulty: string;
  estimatedMinutes: number;
  examTrack: string;
}

interface LessonProgress {
  lessonId: string;
  completed: boolean;
}

export default function LessonsPage() {
  const { examTrack, domains, examName } = useExamTrack();
  const searchString = useSearch();
  const targetDomain = new URLSearchParams(searchString).get('domain');

  const { data: lessons = [], isLoading } = useQuery<Lesson[]>({
    queryKey: ['/api/lessons', examTrack],
    queryFn: async () => {
      const res = await fetch(`/api/lessons?examTrack=${examTrack}`);
      if (!res.ok) throw new Error('Failed to fetch lessons');
      return res.json();
    }
  });

  const { data: progress = [] } = useQuery<LessonProgress[]>({
    queryKey: ['/api/lessons/progress', examTrack],
    queryFn: async () => {
      const res = await fetch(`/api/lessons/progress?examTrack=${examTrack}`);
      if (!res.ok) throw new Error('Failed to fetch progress');
      return res.json();
    }
  });

  const completedLessonIds = new Set(progress.filter(p => p.completed).map(p => p.lessonId));
  
  const lessonsByDomain = domains.map(domain => {
    const domainLessons = lessons.filter(l => l.domainNumber === domain.number);
    const completedCount = domainLessons.filter(l => completedLessonIds.has(l.id)).length;
    return {
      domain,
      lessons: domainLessons,
      completedCount,
      totalCount: domainLessons.length,
    };
  }).filter(d => d.lessons.length > 0);

  const totalCompleted = completedLessonIds.size;
  const totalLessons = lessons.length;
  const progressPercent = totalLessons > 0 ? Math.round((totalCompleted / totalLessons) * 100) : 0;

  useEffect(() => {
    if (!targetDomain || lessons.length === 0) return;
    const id = `domain-section-${targetDomain.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '')}`;
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [targetDomain, lessons]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">Loading lessons...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" data-testid="lessons-title">{examName} Lessons</h1>
        <p className="text-muted-foreground mb-4">
          Browse all lessons organized by domain. Complete each lesson to build your knowledge.
        </p>
        
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Overall Progress</span>
              <span className="text-sm text-muted-foreground">{totalCompleted} / {totalLessons} lessons</span>
            </div>
            <Progress value={progressPercent} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1">{progressPercent}% complete</p>
          </CardContent>
        </Card>

        <div className="flex items-start gap-3 rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/40 px-4 py-3 mb-2" data-testid="banner-study-plan-tip">
          <BookOpen className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
          <p className="text-sm text-blue-700 dark:text-blue-300">
            <span className="font-semibold">Tip:</span> Lessons are organised into weekly sessions in your{' '}
            <Link href={`/app/${examTrack}/study-plan`} className="underline underline-offset-2 hover:text-blue-900 dark:hover:text-blue-100">
              Study Plan
            </Link>
            . Follow the plan for a structured, week-by-week path — or browse any lesson below.
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {lessonsByDomain.map(({ domain, lessons, completedCount, totalCount }) => {
          const domainConfig = getDomainConfig(domain.name);
          const domainProgress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
          const sectionId = `domain-section-${domain.name.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '')}`;
          const isHighlighted = targetDomain === domain.name;
          
          return (
            <div
              key={domain.number}
              id={sectionId}
              className={`space-y-4 scroll-mt-6 rounded-lg transition-colors duration-700 ${isHighlighted ? 'ring-2 ring-primary/40 p-3' : ''}`}
            >
              <div className="flex items-center gap-3">
                <div 
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${domainConfig.bgColor}`}
                >
                  {domainConfig.icon && (
                    <domainConfig.icon 
                      className={`h-5 w-5 ${domainConfig.textColor}`}
                    />
                  )}
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">Domain {domain.number}: {domain.name}</h2>
                  <div className="flex items-center gap-2">
                    <Progress value={domainProgress} className="h-1 flex-1 max-w-32" />
                    <span className="text-xs text-muted-foreground">{completedCount}/{totalCount}</span>
                  </div>
                </div>
              </div>

              <div className="grid gap-3">
                {lessons.map((lesson, index) => {
                  const isCompleted = completedLessonIds.has(lesson.id);
                  
                  return (
                    <Link key={lesson.id} href={`/app/${examTrack}/lesson/${lesson.id}`}>
                      <Card 
                        className={`hover-elevate cursor-pointer transition-all ${
                          isCompleted ? 'border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-950/30' : ''
                        }`}
                        data-testid={`lesson-card-${lesson.id}`}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center gap-4">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                              isCompleted 
                                ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300' 
                                : 'bg-muted text-muted-foreground'
                            }`}>
                              {isCompleted ? (
                                <CheckCircle2 className="h-4 w-4" />
                              ) : (
                                index + 1
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium truncate">{lesson.title}</h3>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline" className="text-xs">
                                  {lesson.difficulty}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  ~{lesson.estimatedMinutes} min
                                </span>
                              </div>
                            </div>
                            <ChevronRight className="h-5 w-5 text-muted-foreground" />
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
    </div>
  );
}
