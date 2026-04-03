import { useState, useEffect } from "react";
import { useSearch } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Book, Brain, Calculator, CheckCircle, Clock, Target, GraduationCap, BookOpen, FileText } from "lucide-react";

const VALID_TABS = ['formulas', 'memory', 'exam', 'strategies', 'problems', 'math', 'reference'] as const;
type TabValue = typeof VALID_TABS[number];

function parseTabParam(search: string): TabValue {
  const params = new URLSearchParams(search.startsWith('?') ? search.slice(1) : search);
  const tab = params.get('tab') as TabValue | null;
  return tab && VALID_TABS.includes(tab) ? tab : 'formulas';
}

export default function Resources() {
  const search = useSearch();
  const [activeTab, setActiveTab] = useState<TabValue>(() => parseTabParam(search));

  useEffect(() => {
    const next = parseTabParam(search);
    setActiveTab(next);
  }, [search]);

  return (
    <div className="h-full flex flex-col">
      <div className="border-b p-6">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <Book className="w-8 h-8 text-primary" />
          Study Resources & Formula Sheets
        </h1>
        <p className="text-muted-foreground">
          Essential formulas, memory techniques, and exam strategies from the FS Exam Mastery System
        </p>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-6">
          <Tabs value={activeTab} onValueChange={v => setActiveTab(v as TabValue)} className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-1 mb-6 h-auto">
              <TabsTrigger value="formulas" data-testid="tab-formulas" className="flex-col sm:flex-row py-2 sm:py-3">
                <Calculator className="w-4 h-4 sm:mr-2" />
                <span className="text-xs sm:text-sm">Formulas</span>
              </TabsTrigger>
              <TabsTrigger value="memory" data-testid="tab-memory" className="flex-col sm:flex-row py-2 sm:py-3">
                <Brain className="w-4 h-4 sm:mr-2" />
                <span className="text-xs sm:text-sm">Memory</span>
              </TabsTrigger>
              <TabsTrigger value="exam" data-testid="tab-exam" className="flex-col sm:flex-row py-2 sm:py-3">
                <Clock className="w-4 h-4 sm:mr-2" />
                <span className="text-xs sm:text-sm">Exam Day</span>
              </TabsTrigger>
              <TabsTrigger value="strategies" data-testid="tab-strategies" className="flex-col sm:flex-row py-2 sm:py-3">
                <Target className="w-4 h-4 sm:mr-2" />
                <span className="text-xs sm:text-sm">Strategies</span>
              </TabsTrigger>
              <TabsTrigger value="problems" data-testid="tab-problems" className="flex-col sm:flex-row py-2 sm:py-3">
                <GraduationCap className="w-4 h-4 sm:mr-2" />
                <span className="text-xs sm:text-sm">Problems</span>
              </TabsTrigger>
              <TabsTrigger value="math" data-testid="tab-math" className="flex-col sm:flex-row py-2 sm:py-3">
                <BookOpen className="w-4 h-4 sm:mr-2" />
                <span className="text-xs sm:text-sm">Math Review</span>
              </TabsTrigger>
              <TabsTrigger value="reference" data-testid="tab-reference" className="flex-col sm:flex-row py-2 sm:py-3">
                <FileText className="w-4 h-4 sm:mr-2" />
                <span className="text-xs sm:text-sm">Reference</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="formulas" data-testid="content-formulas">
              <div className="space-y-6">
                {/* Mathematics & Trigonometry */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[hsl(var(--domain-math))]" />
                      Mathematics & Trigonometry
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 font-mono text-sm">
                      <FormulaRow formula="s = rθ" description="Arc length (θ in radians)" />
                      <FormulaRow formula="A = ½r²θ" description="Area of sector (θ in radians)" />
                      <FormulaRow formula="A = ½Σ(xᵢyᵢ₊₁ – xᵢ₊₁yᵢ)" description="Area by coordinates" />
                      <FormulaRow formula="tan θ = opposite/adjacent" description="Basic trig ratio" />
                      <FormulaRow formula="Lat = D cos θ, Dep = D sin θ" description="Traverse latitude & departure" />
                      <FormulaRow formula="ΣLat = 0, ΣDep = 0" description="Traverse closure condition" />
                      <FormulaRow formula="E = √(ΣΔLat² + ΣΔDep²)" description="Linear misclosure" />
                      <FormulaRow formula="Precision = Perimeter / Misclosure" description="Traverse accuracy" />
                    </div>
                  </CardContent>
                </Card>

                {/* Leveling & Vertical Curves */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[hsl(var(--domain-field))]" />
                      Leveling & Vertical Curves
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 font-mono text-sm">
                      <FormulaRow formula="HI = BS + BM" description="Height of instrument" />
                      <FormulaRow formula="Elev = HI – FS" description="Forward elevation" />
                      <FormulaRow formula="Tolerance = 0.02√K ft" description="Differential leveling (K in miles)" />
                      <FormulaRow formula="y = (g₁x/100) + ((g₂–g₁)x²/200L)" description="Vertical curve offset" />
                      <FormulaRow formula="r = (g₂ – g₁) / L" description="Grade change rate" />
                    </div>
                  </CardContent>
                </Card>

                {/* Curves & COGO */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[hsl(var(--domain-plane))]" />
                      Curves & Coordinate Geometry
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 font-mono text-sm">
                      <FormulaRow formula="R = 5729.58 / D" description="Radius (1° curve = 5729.58 ft)" />
                      <FormulaRow formula="L = (πRΔ) / 180" description="Arc length" />
                      <FormulaRow formula="E = R(sec(Δ/2) – 1)" description="External distance" />
                      <FormulaRow formula="T = R tan(Δ/2)" description="Tangent length" />
                      <FormulaRow formula="M = R(1 – cos(Δ/2))" description="Middle ordinate" />
                      <FormulaRow formula="LC = 2R sin(Δ/2)" description="Long chord" />
                    </div>
                  </CardContent>
                </Card>

                {/* Error & Statistics */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[hsl(var(--domain-math))]" />
                      Error Analysis & Statistics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 font-mono text-sm">
                      <FormulaRow formula="Mean = Σx / n" description="Average" />
                      <FormulaRow formula="σ = √(Σ(x–x̄)²/(n–1))" description="Standard deviation" />
                      <FormulaRow formula="P.E. = ± 0.6745σ" description="Probable error (50% confidence)" />
                      <FormulaRow formula="σ_total = √(σ₁² + σ₂² + ...)" description="Error propagation" />
                    </div>
                  </CardContent>
                </Card>

                {/* Constants & Conversions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Constants & Conversions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <h4 className="font-semibold mb-2">Angular</h4>
                        <ul className="space-y-1 font-mono text-xs">
                          <li>1 radian = 57.2958°</li>
                          <li>1 gon = 0.9°</li>
                          <li>π ≈ 3.14159265</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Linear</h4>
                        <ul className="space-y-1 font-mono text-xs">
                          <li>1 ft = 0.3048 m</li>
                          <li>1 mi = 5280 ft = 1.609 km</li>
                          <li>1 chain = 66 ft = 100 links</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Area</h4>
                        <ul className="space-y-1 font-mono text-xs">
                          <li>1 acre = 43,560 ft²</li>
                          <li>1 acre = 4046.856 m²</li>
                          <li>1 section = 640 acres</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Correction Factors</h4>
                        <ul className="space-y-1 font-mono text-xs">
                          <li>Curvature ≈ 0.0785 × D² (ft, D in mi)</li>
                          <li>Refraction ≈ –0.0112 × D²</li>
                          <li>Combined C&R ≈ 0.0675 × D²</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="memory" data-testid="content-memory">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Spaced Repetition Cycle</CardTitle>
                    <CardDescription>Review intervals for long-term retention</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <MemoryStep day="Day 1" action="Learn the concept/formula" />
                      <MemoryStep day="Day 3" action="Quick recall test – no notes" />
                      <MemoryStep day="Day 7" action="Revisit mistakes; rewrite from memory" />
                      <MemoryStep day="Day 14" action="Mix with older material" />
                      <MemoryStep day="Day 30" action="Final retention test – simulate timed recall" />
                    </div>
                    <div className="mt-4 p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        💡 <strong>Pro Tip:</strong> Use a notebook column or digital tag labeled "1–3–7–14–30" to track which flashcards you've reviewed at each interval.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Triad Drill Method</CardTitle>
                    <CardDescription>Concept → Application → Check</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold mb-1">1. Concept</h4>
                        <p className="text-sm text-muted-foreground">State the formula or definition aloud</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">2. Application</h4>
                        <p className="text-sm text-muted-foreground">Work a problem using it (even a made-up one)</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">3. Check</h4>
                        <p className="text-sm text-muted-foreground">Confirm units/direction/signs are correct</p>
                      </div>
                      <div className="mt-4 p-3 bg-primary/10 rounded border-l-4 border-primary">
                        <p className="text-sm">
                          <strong>Example:</strong> Law of Cosines → solve traverse leg → verify with reverse azimuth
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Feynman Technique</CardTitle>
                    <CardDescription>Teach to learn</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex gap-2">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>Explain the concept in plain English, as if teaching a first-year tech</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>If you stumble, reread and re-explain until it's smooth</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>Write your simplified version in the margin — that's your "recall hook"</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Chunking & Color Cues</CardTitle>
                    <CardDescription>Group related items into mini-sets of 3-5</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex gap-2 items-start">
                        <div className="w-3 h-3 rounded-full bg-[hsl(var(--domain-plane))] flex-shrink-0 mt-1" />
                        <div>
                          <strong>Traverse:</strong> Latitude, Departure, Adjustment
                        </div>
                      </div>
                      <div className="flex gap-2 items-start">
                        <div className="w-3 h-3 rounded-full bg-[hsl(var(--domain-field))] flex-shrink-0 mt-1" />
                        <div>
                          <strong>Leveling:</strong> BS, HI, FS
                        </div>
                      </div>
                      <div className="flex gap-2 items-start">
                        <div className="w-3 h-3 rounded-full bg-[hsl(var(--domain-plane))] flex-shrink-0 mt-1" />
                        <div>
                          <strong>Curves:</strong> Tangent, External, Mid-ordinate
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Mnemonic Examples</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li><strong>"Sine South Cosine East"</strong> – Remember traverse components</li>
                      <li><strong>"Error never zero, just small"</strong> – Accuracy vs precision</li>
                      <li><strong>"Lost corner → proportionate method"</strong> – Boundary law</li>
                      <li><strong>"Monument over course over distance"</strong> – Order of evidence</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="exam" data-testid="content-exam">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Preparation Checklist</CardTitle>
                    <CardDescription>What to bring on exam day</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <ExamItem item="Valid ID + NCEES Exam Authorization" />
                      <ExamItem item="HP-35s Calculator + backup TI-36X Pro" />
                      <ExamItem item="Printed NCEES Reference Handbook (v2.5)" />
                      <ExamItem item="Two mechanical pencils + eraser" />
                      <ExamItem item="Watch (non-smart)" />
                      <ExamItem item="Water + snack" />
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Exam Mindset</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">1. Breathe and pace</h4>
                        <p className="text-sm text-muted-foreground">
                          First pass = easy questions, mark hard ones for later
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">2. Skip time-traps</h4>
                        <p className="text-sm text-muted-foreground">
                          If a problem takes &gt; 2 minutes, move on and return later
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">3. Use reference book strategically</h4>
                        <p className="text-sm text-muted-foreground">
                          Tab each section beforehand for quick access
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">4. Trust your training</h4>
                        <p className="text-sm text-muted-foreground">
                          Your study plan mirrors the real exam's flow
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>During Break</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex gap-2">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>Stand up, stretch, hydrate</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>Don't review answers during the break — reset your mind</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Post-Exam Reflection</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex gap-2">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>Record topics that felt strong vs uncertain</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>Begin planning for RPLS path immediately after results</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="strategies" data-testid="content-strategies">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Daily Routine</CardTitle>
                    <CardDescription>Move from recognition to recall</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex gap-2">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>Write 5 key formulas each morning from memory</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>Recite definitions aloud once per week</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>Mark flashcards as "Mastered" after three correct recalls</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Weekly Flashcard Rotation</CardTitle>
                    <CardDescription>Focus on different domains each day</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[hsl(var(--domain-math))]" />
                        <span><strong>Monday:</strong> Math & Trig</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[hsl(var(--domain-field))]" />
                        <span><strong>Tuesday:</strong> Leveling & Field</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[hsl(var(--domain-plane))]" />
                        <span><strong>Wednesday:</strong> Traverse & COGO</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[hsl(var(--domain-boundary))]" />
                        <span><strong>Thursday:</strong> Boundary & Law</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[hsl(var(--domain-geodesy))]" />
                        <span><strong>Friday:</strong> GPS & Mapping</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[hsl(var(--domain-professional))]" />
                        <span><strong>Saturday:</strong> Ethics & Safety</span>
                      </div>
                      <div className="flex items-center gap-2 col-span-2">
                        <div className="w-3 h-3 rounded-full bg-muted-foreground" />
                        <span><strong>Sunday:</strong> Review (missed cards only)</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Active Recall Under Time Pressure</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-sm text-muted-foreground">
                        Use a 30-second timer for each flashcard
                      </p>
                      <ul className="space-y-2 text-sm">
                        <li className="flex gap-2">
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>Read a question → answer aloud within the countdown</span>
                        </li>
                        <li className="flex gap-2">
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>Mark if you hesitated</span>
                        </li>
                        <li className="flex gap-2">
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>By Week 8: answer 70% of core formulas within 20 seconds</span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Nightly Brain-Dump Routine</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-3">
                      Each night, close your book and list 10 items you can recall from the day. Then reopen and fill in what you missed.
                    </p>
                    <div className="p-3 bg-muted rounded">
                      <p className="text-sm text-muted-foreground">
                        This "brain-dump" turns short-term memory into long-term storage.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Weekly Retention Audit</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-3">At the end of each study week:</p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex gap-2">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>Choose 10 random flashcards from different domains</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>If you miss more than 3, revisit that week's notes</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>Log your retention score in your study notes</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="problems" data-testid="content-problems">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Surveying Solved Problems by Domain</CardTitle>
                  <CardDescription>
                    17 comprehensive topics from PPI's Surveying Solved Problems organized by the 7 NCEES exam domains
                  </CardDescription>
                </CardHeader>
              </Card>

              <div className="space-y-6">
                {/* Domain 1: Math & Basic Science */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[hsl(var(--domain-math))]" />
                      Domain 1: Math & Basic Science
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <ProblemTopic topic="I: Surveying Mathematics" pages="Problems 1-1 to 1-25, Solutions 1-25" />
                      <ProblemTopic topic="II: Advanced Mathematics" pages="Problems 2-1 to 2-11, Solutions 2-11" />
                      <ProblemTopic topic="XVII: Basic Sciences" pages="Problems 17-1 to 17-5, Solutions 17-5" />
                    </ul>
                  </CardContent>
                </Card>

                {/* Domain 2: Field Data Acquisition */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[hsl(var(--domain-field))]" />
                      Domain 2: Field Data Acquisition
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <ProblemTopic topic="VI: Surveying Instruments and Procedures" pages="Problems 6-1 to 6-20, Solutions 6-20" />
                      <ProblemTopic topic="XIII: Hydrography" pages="Problems 13-1 to 13-8, Solutions 13-8" />
                    </ul>
                  </CardContent>
                </Card>

                {/* Domain 3: Plane Survey Computations */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[hsl(var(--domain-plane))]" />
                      Domain 3: Plane Survey Computations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <ProblemTopic topic="VII: Legal Descriptions" pages="Problems 7-1 to 7-13, Solutions 7-13" />
                      <ProblemTopic topic="X: Plats and Mapping" pages="Problems 10-1 to 10-9, Solutions 10-9" />
                    </ul>
                  </CardContent>
                </Card>

                {/* Domain 4: Mapping, GIS, and CAD */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[hsl(var(--domain-mapping))]" />
                      Domain 4: Mapping, GIS, and CAD
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <ProblemTopic topic="VIII: Photogrammetry" pages="Problems 8-1 to 8-13, Solutions 8-13" />
                      <ProblemTopic topic="XIV: Geographic Information System (GIS)" pages="Problems 14-1 to 14-5, Solutions 14-5" />
                      <ProblemTopic topic="XVI: Computer Operations" pages="Problems 16-1 to 16-4, Solutions 16-4" />
                    </ul>
                  </CardContent>
                </Card>

                {/* Domain 5: Boundary Law & PLSS */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[hsl(var(--domain-boundary))]" />
                      Domain 5: Boundary Law & PLSS
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <ProblemTopic topic="III: Land Boundary Law" pages="Problems 3-1 to 3-29, Solutions 3-29" />
                      <ProblemTopic topic="V: Public Land Surveying System" pages="Problems 5-1 to 5-30, Solutions 5-30" />
                    </ul>
                  </CardContent>
                </Card>

                {/* Domain 6: Geodesy, GPS, Astronomy */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[hsl(var(--domain-geodesy))]" />
                      Domain 6: Geodesy, GPS, Astronomy
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <ProblemTopic topic="IV: Surveying Astronomy" pages="Problems 4-1 to 4-14, Solutions 4-14" />
                      <ProblemTopic topic="IX: Geodetic and Control Surveys" pages="Problems 9-1 to 9-17, Solutions 9-17" />
                      <ProblemTopic topic="XI: Global Positioning System (GPS)" pages="Problems 11-1 to 11-6, Solutions 11-6" />
                    </ul>
                  </CardContent>
                </Card>

                {/* Domain 7: Professional Practice */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[hsl(var(--domain-professional))]" />
                      Domain 7: Professional Practice
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <ProblemTopic topic="XII: Project Management" pages="Problems 12-1 to 12-11, Solutions 12-11" />
                      <ProblemTopic topic="XV: Written Communication" pages="Problems 15-1 to 15-5, Solutions 15-5" />
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-muted/50">
                  <CardContent className="pt-6">
                    <p className="text-sm text-muted-foreground">
                      <strong>Note:</strong> Surveying Solved Problems (PPI) provides step-by-step solutions to representative exam-style questions. 
                      Use this resource alongside the practice quizzes and exams to reinforce problem-solving skills in each domain.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="math" data-testid="content-math">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Math for Surveyors Review</CardTitle>
                  <CardDescription>
                    Comprehensive mathematics reference covering 15 essential topics for surveying calculations
                  </CardDescription>
                </CardHeader>
              </Card>

              <div className="space-y-6">
                {/* Trigonometry Fundamentals */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[hsl(var(--domain-math))]" />
                      Trigonometry Fundamentals
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <MathTopic topic="1. The Right Triangle" description="SOH-CAH-TOA, trigonometric functions, solving for unknowns" />
                      <MathTopic topic="2. Oblique Triangles" description="Triangles without right angles, multiple solution scenarios" />
                      <MathTopic topic="5. Law of Sines" description="Solving triangles using ratio of sides to angles" />
                      <MathTopic topic="8. Law of Cosines" description="Finding unknown sides and angles in any triangle" />
                    </ul>
                  </CardContent>
                </Card>

                {/* Azimuth & Bearing Systems */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[hsl(var(--domain-plane))]" />
                      Azimuth & Bearing Systems
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <MathTopic topic="3. Azimuths, Angles, & Bearings" description="Conversions between quadrant bearings and azimuths" />
                      <MathTopic topic="6. Bearing-Bearing Intersections" description="Finding point locations using two bearing lines" />
                      <MathTopic topic="7. Bearing-Distance Intersections" description="Solving intersections with mixed bearing and distance data" />
                      <MathTopic topic="9. Distance-Distance Intersections" description="Locating points from two known distance measurements" />
                    </ul>
                  </CardContent>
                </Card>

                {/* Coordinate Geometry */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[hsl(var(--domain-plane))]" />
                      Coordinate Geometry (COGO)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <MathTopic topic="4. Coordinate Geometry" description="Northing/Easting calculations, inverse and forward computations" />
                      <MathTopic topic="11. The Compass Rule" description="Traverse adjustment, distributing error proportionally" />
                    </ul>
                  </CardContent>
                </Card>

                {/* Curves & Vertical Control */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[hsl(var(--domain-plane))]" />
                      Curves & Vertical Control
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <MathTopic topic="12. Horizontal Curves" description="Radius, tangent, external, chord calculations" />
                      <MathTopic topic="13. Grades and Slopes" description="Percent grade, rise/run calculations" />
                      <MathTopic topic="14. Intersection of Two Grades" description="Finding PI points and elevations" />
                      <MathTopic topic="15. Vertical Curves" description="Parabolic curves, grade changes, offsets" />
                    </ul>
                  </CardContent>
                </Card>

                {/* Advanced Topics */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[hsl(var(--domain-math))]" />
                      Advanced Calculations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <MathTopic topic="10. Interpolation" description="Finding intermediate values, linear and proportional methods" />
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-muted/50">
                  <CardContent className="pt-6">
                    <p className="text-sm text-muted-foreground mb-3">
                      <strong>How to Use This Resource:</strong>
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex gap-2">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>Start with right triangles and work through oblique triangles before tackling COGO</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>Master bearing/azimuth conversions early - they appear in every domain</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>Practice coordinate geometry calculations until they become automatic</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>Review curve formulas alongside the formula sheet for reinforcement</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="reference" data-testid="content-reference">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Professional Reference Materials</CardTitle>
                  <CardDescription>
                    Safety standards, professional practice guidelines, and technical specifications for surveying practice
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-lg">
                    <p className="text-sm text-amber-900 dark:text-amber-200">
                      <strong>Note:</strong> These are professional reference materials for surveying practice. 
                      While not directly tested on the FS exam, they provide valuable context for professional practice and ethics questions.
                      The TSPS Manual and ALTA standards are Texas-specific but exemplify national best practices.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-6">
                {/* Safety Handbook */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[hsl(var(--domain-professional))]" />
                      TSPS Safety Handbook (2021)
                    </CardTitle>
                    <CardDescription>Comprehensive field and office safety guidelines</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <h4 className="font-semibold text-sm">Key Sections:</h4>
                      <ul className="space-y-2">
                        <RefTopic topic="General Safety Guidelines" description="Situational awareness, horseplay prevention, reporting procedures" />
                        <RefTopic topic="Field Safety" description="Traffic control, utility locates, railroad crossings, water operations" />
                        <RefTopic topic="Environmental Hazards" description="Snakes, insects, poisonous plants, temperature extremes" />
                        <RefTopic topic="Equipment Safety" description="Hand tools, power tools, vehicles, ATVs/UTVs" />
                        <RefTopic topic="Emergency Procedures" description="First aid, CPR, allergic reactions, calling 911" />
                        <RefTopic topic="PPE Requirements" description="Eye protection, hard hats, visibility vests, footwear" />
                      </ul>
                      <div className="mt-4 p-3 bg-muted rounded">
                        <p className="text-sm text-muted-foreground">
                          Emphasizes the shared responsibility of employers, supervisors, and employees for maintaining safe work environments.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* TSPS Manual of Practice */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[hsl(var(--domain-professional))]" />
                      TSPS Manual of Practice (2021)
                    </CardTitle>
                    <CardDescription>Standards for land surveying in Texas</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <h4 className="font-semibold text-sm">11 Survey Categories:</h4>
                      <div className="grid grid-cols-2 gap-3">
                        <RefTopic topic="1A: Land Title Survey" description="For title insurance, ALTA standards" />
                        <RefTopic topic="1B: Standard Land Survey" description="Boundary surveys not for title insurance" />
                        <RefTopic topic="2: Route Survey" description="Linear projects, ROW definition" />
                        <RefTopic topic="5: Construction Survey" description="Staking, as-built documentation" />
                        <RefTopic topic="6: Topographic Survey" description="Contours, features, elevations" />
                        <RefTopic topic="7: Horizontal Control" description="Coordinate network establishment" />
                        <RefTopic topic="8: Vertical Control" description="Benchmark networks" />
                        <RefTopic topic="9: Investigative Survey" description="Research and field investigation" />
                        <RefTopic topic="10: GIS Products" description="Survey-grade GIS deliverables" />
                        <RefTopic topic="11: 3D Control Survey" description="Three-dimensional networks" />
                      </div>
                      <div className="mt-4 p-3 bg-muted rounded">
                        <p className="text-sm text-muted-foreground">
                          <strong>Key Concepts:</strong> Standard of care, boundary determination (footsteps doctrine, dignity of calls), 
                          measurement tolerances, and professional responsibilities.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* ALTA Table A */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[hsl(var(--domain-boundary))]" />
                      ALTA/NSPS Table A (2026)
                    </CardTitle>
                    <CardDescription>Optional survey responsibilities for land title surveys</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <h4 className="font-semibold text-sm">20 Standard Optional Items (+ Item 21 for custom):</h4>
                      <ul className="space-y-2 text-sm">
                        <RefTopic topic="Item 1: Monuments" description="Placement at boundary corners" />
                        <RefTopic topic="Item 2: Addresses" description="Street addresses if available" />
                        <RefTopic topic="Item 3: Flood Zones" description="FEMA classification and mapping" />
                        <RefTopic topic="Item 4: Gross Land Area" description="Acreage calculations" />
                        <RefTopic topic="Item 5: Vertical Relief" description="Contours and topography" />
                        <RefTopic topic="Item 6: Zoning" description="Classification, setbacks, height/floor area restrictions, parking" />
                        <RefTopic topic="Item 7: Building Dimensions" description="Exterior dimensions, square footage, and measured height" />
                        <RefTopic topic="Item 8: Substantial Features" description="Parking lots, billboards, signs, pools, landscaping, refuse areas" />
                        <RefTopic topic="Item 9: Parking Spaces" description="Number and type of identifiable parking spaces and striping" />
                        <RefTopic topic="Item 11: Underground Utilities" description="Location evidence from plans/markings and utility locate requests" />
                        <RefTopic topic="Item 15: Imagery (NEW)" description="Features shown using imagery with client agreement and disclosure" />
                        <RefTopic topic="Item 20: Encroachment Summary Table (NEW)" description="Summary table of encroachments and conditions on plat" />
                      </ul>
                      <div className="mt-4 p-3 bg-muted rounded">
                        <p className="text-sm text-muted-foreground">
                          Table A items are negotiated between surveyor and client. Each selected item adds specific deliverables to the base ALTA survey requirements.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Minimum Standards */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[hsl(var(--domain-professional))]" />
                      Texas Minimum Standards
                    </CardTitle>
                    <CardDescription>TBPELS rules for professional practice</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-sm text-muted-foreground">
                        Texas Board of Professional Engineers and Land Surveyors (TBPELS) establishes mandatory minimum 
                        standards for professional surveying practice in Texas.
                      </p>
                      <h4 className="font-semibold text-sm">Key Requirements:</h4>
                      <ul className="space-y-2">
                        <RefTopic topic="Professional Seal" description="Proper application and responsibility" />
                        <RefTopic topic="Boundary Surveys" description="Research, fieldwork, and documentation requirements" />
                        <RefTopic topic="Monumentation" description="Setting and referencing boundary markers" />
                        <RefTopic topic="Plat Requirements" description="Content, format, and filing standards" />
                        <RefTopic topic="Record Research" description="Extent and documentation of title research" />
                        <RefTopic topic="Measurement Standards" description="Accuracy requirements and error tolerances" />
                      </ul>
                      <div className="mt-4 p-3 bg-muted rounded">
                        <p className="text-sm text-muted-foreground">
                          <strong>Relationship to TSPS Manual:</strong> TBPELS rules are mandatory law. 
                          The TSPS Manual of Practice prescribes more stringent voluntary standards building on these legal minimums.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900">
                  <CardContent className="pt-6">
                    <h4 className="font-semibold text-sm mb-3">Study Approach for Professional Practice Questions:</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex gap-2">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>Focus on ethics, standard of care, and professional responsibilities</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>Understand boundary law principles (monuments over measurements, dignity of calls)</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>Know basic safety requirements and field procedures</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>While Texas-specific, these materials exemplify national professional standards</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </ScrollArea>
    </div>
  );
}

function ProblemTopic({ topic, pages }: { topic: string; pages: string }) {
  return (
    <li className="flex justify-between items-start gap-4 text-sm">
      <span className="font-medium">{topic}</span>
      <span className="text-muted-foreground text-right flex-shrink-0">{pages}</span>
    </li>
  );
}

function MathTopic({ topic, description }: { topic: string; description: string }) {
  return (
    <li className="flex flex-col gap-1 text-sm">
      <span className="font-medium">{topic}</span>
      <span className="text-muted-foreground">{description}</span>
    </li>
  );
}

function RefTopic({ topic, description }: { topic: string; description: string }) {
  return (
    <li className="flex flex-col gap-1 text-sm">
      <span className="font-medium">{topic}</span>
      <span className="text-muted-foreground text-xs">{description}</span>
    </li>
  );
}

function FormulaRow({ formula, description }: { formula: string; description: string }) {
  return (
    <div className="flex justify-between items-start gap-4 pb-2 border-b last:border-0">
      <code className="text-primary flex-shrink-0">{formula}</code>
      <span className="text-muted-foreground text-right">{description}</span>
    </div>
  );
}

function MemoryStep({ day, action }: { day: string; action: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-20 flex-shrink-0 font-semibold text-sm">{day}</div>
      <div className="flex-1 text-sm text-muted-foreground">{action}</div>
    </div>
  );
}

function ExamItem({ item }: { item: string }) {
  return (
    <li className="flex gap-2 items-start">
      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" data-testid="check-icon" />
      <span className="text-sm">{item}</span>
    </li>
  );
}
