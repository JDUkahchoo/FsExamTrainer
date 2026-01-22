import { useState, useMemo } from 'react';
import { ExamLayout } from '@/components/exam-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useExamTrack } from '@/contexts/exam-track-context';
import { 
  PROCEDURES, 
  PROCEDURE_CATEGORIES, 
  BLM_GLOSSARY_TERMS,
  type Procedure,
  type GlossaryTerm 
} from '@shared/data/procedures';
import { 
  Search, 
  MapPin, 
  Scale, 
  Ruler, 
  FileCheck, 
  FileText, 
  Compass, 
  Calculator,
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Lightbulb
} from 'lucide-react';

const categoryIcons: Record<string, typeof MapPin> = {
  'corner-restoration': MapPin,
  'evidence-hierarchy': Scale,
  'traverse-leveling': Ruler,
  'alta-standards': FileCheck,
  'legal-descriptions': FileText,
  'field-procedures': Compass,
  'office-procedures': Calculator,
};

function ProcedureCard({ procedure }: { procedure: Procedure }) {
  const Icon = categoryIcons[procedure.category] || BookOpen;
  
  return (
    <Card className="mb-4" data-testid={`procedure-card-${procedure.id}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <Icon className="h-5 w-5 text-muted-foreground" />
            <CardTitle className="text-lg">{procedure.title}</CardTitle>
          </div>
          <div className="flex gap-1">
            <Badge variant="outline">
              {procedure.examTrack === 'both' ? 'FS & PS' : procedure.examTrack.toUpperCase()}
            </Badge>
          </div>
        </div>
        <CardDescription>{procedure.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-medium mb-2 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
            Step-by-Step Procedure
          </h4>
          <ol className="list-none space-y-2 ml-1">
            {procedure.steps.map((step, idx) => (
              <li key={idx} className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-sm flex items-center justify-center font-medium">
                  {step.step}
                </span>
                <div>
                  <p className="font-medium text-sm">{step.action}</p>
                  {step.detail && (
                    <p className="text-sm text-muted-foreground">{step.detail}</p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div>
          <h4 className="font-medium mb-2 flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
            Key Points to Remember
          </h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
            {procedure.keyPoints.map((point, idx) => (
              <li key={idx}>{point}</li>
            ))}
          </ul>
        </div>

        {procedure.examTrap && (
          <Alert className="border-amber-500/50 bg-amber-50 dark:bg-amber-950/20">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            <AlertTitle className="text-amber-700 dark:text-amber-400">Exam Trap</AlertTitle>
            <AlertDescription>
              <div className="space-y-2 mt-2">
                <div className="flex items-start gap-2">
                  <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-red-700 dark:text-red-400">Field Practice: </span>
                    <span className="text-muted-foreground">{procedure.examTrap.fieldPractice}</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-green-700 dark:text-green-400">Correct Answer: </span>
                    <span className="text-muted-foreground">{procedure.examTrap.correctAnswer}</span>
                  </div>
                </div>
                <div className="flex items-start gap-2 mt-2 pt-2 border-t border-amber-200 dark:border-amber-800">
                  <ArrowRight className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-amber-800 dark:text-amber-300">{procedure.examTrap.explanation}</p>
                </div>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {procedure.reference && (
          <p className="text-xs text-muted-foreground italic">
            Reference: {procedure.reference}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

function GlossaryCard({ term }: { term: GlossaryTerm }) {
  return (
    <Card className="mb-2" data-testid={`glossary-term-${term.term.toLowerCase().replace(/\s+/g, '-')}`}>
      <CardHeader className="py-3 pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base">{term.term}</CardTitle>
          <div className="flex gap-1">
            <Badge variant="secondary" className="text-xs">{term.category}</Badge>
            <Badge variant="outline" className="text-xs">
              {term.examTrack === 'both' ? 'FS & PS' : term.examTrack.toUpperCase()}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground">{term.definition}</p>
      </CardContent>
    </Card>
  );
}

export default function ProceduresPage() {
  const { examTrack } = useExamTrack();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<string>('procedures');

  const filteredProcedures = useMemo(() => {
    return PROCEDURES.filter(p => {
      const matchesTrack = p.examTrack === 'both' || p.examTrack === examTrack;
      const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
      const matchesSearch = searchQuery === '' || 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.keyPoints.some(kp => kp.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesTrack && matchesCategory && matchesSearch;
    });
  }, [examTrack, selectedCategory, searchQuery]);

  const filteredGlossary = useMemo(() => {
    return BLM_GLOSSARY_TERMS.filter(t => {
      const matchesTrack = t.examTrack === 'both' || t.examTrack === examTrack;
      const matchesSearch = searchQuery === '' ||
        t.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.definition.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTrack && matchesSearch;
    });
  }, [examTrack, searchQuery]);

  const groupedGlossary = useMemo(() => {
    const groups: Record<string, GlossaryTerm[]> = {};
    filteredGlossary.forEach(term => {
      const firstLetter = term.term[0].toUpperCase();
      if (!groups[firstLetter]) {
        groups[firstLetter] = [];
      }
      groups[firstLetter].push(term);
    });
    return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b));
  }, [filteredGlossary]);

  const proceduresWithTraps = PROCEDURES.filter(p => 
    p.examTrap && (p.examTrack === 'both' || p.examTrack === examTrack)
  );

  return (
    <ExamLayout>
      <div className="container max-w-5xl py-6 px-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2" data-testid="text-page-title">Procedures & Standards</h1>
          <p className="text-muted-foreground" data-testid="text-page-description">
            The "textbook" way to do things on the exam. Learn the correct procedures that NCEES expects, 
            not just what works in the field.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search procedures and terms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              data-testid="input-search-procedures"
            />
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="procedures" data-testid="tab-procedures">
              Procedures ({filteredProcedures.length})
            </TabsTrigger>
            <TabsTrigger value="exam-traps" data-testid="tab-exam-traps">
              Exam Traps ({proceduresWithTraps.length})
            </TabsTrigger>
            <TabsTrigger value="glossary" data-testid="tab-glossary">
              BLM Glossary ({filteredGlossary.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="procedures">
            <div className="flex flex-wrap gap-2 mb-4">
              <Button
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory('all')}
                data-testid="button-category-all"
              >
                All
              </Button>
              {PROCEDURE_CATEGORIES.map(cat => {
                const Icon = categoryIcons[cat.id];
                const count = PROCEDURES.filter(p => 
                  p.category === cat.id && (p.examTrack === 'both' || p.examTrack === examTrack)
                ).length;
                if (count === 0) return null;
                return (
                  <Button
                    key={cat.id}
                    variant={selectedCategory === cat.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(cat.id)}
                    className="gap-1"
                    data-testid={`button-category-${cat.id}`}
                  >
                    <Icon className="h-3 w-3" />
                    {cat.name} ({count})
                  </Button>
                );
              })}
            </div>

            {selectedCategory !== 'all' && (
              <Alert className="mb-4">
                <BookOpen className="h-4 w-4" />
                <AlertDescription>
                  {PROCEDURE_CATEGORIES.find(c => c.id === selectedCategory)?.description}
                </AlertDescription>
              </Alert>
            )}

            <ScrollArea className="h-[calc(100vh-350px)]">
              {filteredProcedures.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No procedures found matching your search.
                </div>
              ) : (
                filteredProcedures.map(procedure => (
                  <ProcedureCard key={procedure.id} procedure={procedure} />
                ))
              )}
            </ScrollArea>
          </TabsContent>

          <TabsContent value="exam-traps">
            <Alert className="mb-4 border-amber-500/50 bg-amber-50 dark:bg-amber-950/20">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <AlertTitle>Common Exam Traps</AlertTitle>
              <AlertDescription>
                These are situations where what surveyors do in the field differs from the correct exam answer. 
                Study these carefully to avoid losing easy points.
              </AlertDescription>
            </Alert>

            <ScrollArea className="h-[calc(100vh-400px)]">
              {proceduresWithTraps.map(procedure => (
                <ProcedureCard key={procedure.id} procedure={procedure} />
              ))}
            </ScrollArea>
          </TabsContent>

          <TabsContent value="glossary">
            <div className="mb-4 flex flex-wrap gap-1" data-testid="glossary-letter-index">
              {groupedGlossary.map(([letter]) => (
                <Button
                  key={letter}
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    document.getElementById(`glossary-${letter}`)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  data-testid={`button-glossary-letter-${letter}`}
                >
                  {letter}
                </Button>
              ))}
            </div>

            <ScrollArea className="h-[calc(100vh-400px)]">
              <Accordion type="multiple" className="w-full">
                {groupedGlossary.map(([letter, terms]) => (
                  <AccordionItem key={letter} value={letter} id={`glossary-${letter}`} data-testid={`glossary-group-${letter}`}>
                    <AccordionTrigger className="text-lg font-bold" data-testid={`button-glossary-expand-${letter}`}>
                      {letter} <Badge variant="secondary" className="ml-2" data-testid={`badge-glossary-count-${letter}`}>{terms.length}</Badge>
                    </AccordionTrigger>
                    <AccordionContent>
                      {terms.map(term => (
                        <GlossaryCard key={term.term} term={term} />
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    </ExamLayout>
  );
}
