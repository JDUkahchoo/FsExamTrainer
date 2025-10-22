import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Book, Brain, Calculator, CheckCircle, Clock, Target } from "lucide-react";

export default function Resources() {
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
          <Tabs defaultValue="formulas" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="formulas" data-testid="tab-formulas">
                <Calculator className="w-4 h-4 mr-2" />
                Formula Sheet
              </TabsTrigger>
              <TabsTrigger value="memory" data-testid="tab-memory">
                <Brain className="w-4 h-4 mr-2" />
                Memory Techniques
              </TabsTrigger>
              <TabsTrigger value="exam" data-testid="tab-exam">
                <Clock className="w-4 h-4 mr-2" />
                Exam Day
              </TabsTrigger>
              <TabsTrigger value="strategies" data-testid="tab-strategies">
                <Target className="w-4 h-4 mr-2" />
                Study Strategies
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
          </Tabs>
        </div>
      </ScrollArea>
    </div>
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
