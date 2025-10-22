import React, { useState } from 'react';
import { 
  BookOpen, 
  CheckCircle2, 
  Circle, 
  Target, 
  BrainCircuit, 
  Dumbbell, 
  Map, 
  Ruler, 
  Scale, 
  Globe2, 
  Briefcase, 
  Calculator, 
  FileText,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Bookmark,
  Lightbulb,
  Library,
  CalendarCheck,
  PieChart
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for tailwind merging
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Types & Data Structures ---

type Domain = 
  | 'Math & Basic Science'
  | 'Field Data Acquisition'
  | 'Plane Survey Computations'
  | 'Mapping, GIS, and CAD'
  | 'Boundary Law & PLSS'
  | 'Geodesy, GPS, Astronomy'
  | 'Professional Practice';

type WeekPlan = {
  week: number;
  title: string;
  domains: Domain[];
  read: string[];
  focus: string[];
  apply: string[];
  reinforce: string[];
};

const FS_DOMAINS: Record<Domain, { color: string, icon: React.ElementType }> = {
  'Math & Basic Science': { color: 'bg-blue-100 text-blue-800', icon: Calculator },
  'Field Data Acquisition': { color: 'bg-green-100 text-green-800', icon: Map },
  'Plane Survey Computations': { color: 'bg-indigo-100 text-indigo-800', icon: Ruler },
  'Mapping, GIS, and CAD': { color: 'bg-purple-100 text-purple-800', icon: Globe2 },
  'Boundary Law & PLSS': { color: 'bg-amber-100 text-amber-800', icon: Scale },
  'Geodesy, GPS, Astronomy': { color: 'bg-rose-100 text-rose-800', icon: Target },
  'Professional Practice': { color: 'bg-slate-100 text-slate-800', icon: Briefcase },
};

const STUDY_PLAN: WeekPlan[] = [
  {
    week: 1,
    title: "Math Foundation & Statistics",
    domains: ['Math & Basic Science'],
    read: ["Elementary Surveying (ES15) Ch. 1 (Intro), Ch. 2 (Units), Ch. 3 (Theory of Errors)", "Surveyor Ref Manual (SRM) Ch. 1 (Algebra/Trig), Ch. 2 (Stats)"],
    focus: ["Significant figures & rounding standard", "Error propagation formulas (sum, product, series)", "Standard deviation vs. standard error of the mean", "Unit conversions (survey foot vs international foot)"],
    apply: ["SRM Ch. 2 practice problems (focus on error ellipses)", "NCEES Handbook: Locate Math & Stats formulas"],
    reinforce: ["Flashcards: standard deviation formula, error propagation rules", "Memorize: 1 acre = 43,560 sq ft, 1 ch = 66 ft"]
  },
  {
    week: 2,
    title: "Distance Measurement & Leveling Basics",
    domains: ['Field Data Acquisition'],
    read: ["ES15 Ch. 4 (Leveling Theory), Ch. 5 (Leveling Practice), Ch. 6 (Distance)", "SRM Ch. 3 (Distance), Ch. 4 (Leveling)"],
    focus: ["Differential leveling notes & reductions (HI/Turning Point)", "Curvature & Refraction corrections", "EDM characteristics and errors (ppm)", "Taping corrections (temp, sag, tension)"],
    apply: ["Reduce a full page of differential leveling notes", "Calculate 3 taping correction problems from SRM"],
    reinforce: ["Quiz: When to add/subtract curvature & refraction?", "Practice: EDM ppm calculation without a calculator"]
  },
  {
    week: 3,
    title: "Angles, Azimuths, and Bearings",
    domains: ['Field Data Acquisition', 'Plane Survey Computations'],
    read: ["ES15 Ch. 7 (Angles/Directions), Ch. 8 (Total Stations)", "SRM Ch. 5 (Angles/Directions)"],
    focus: ["Converting between Azimuths and Bearings", "Magnetic declination adjustments over time", "Interior/Exterior angle sums for polygons", "Total Station instrument errors (collimation, trunnion axis)"],
    apply: ["Solve 5 closed-traverse interior angle problems", "NCEES Handbook: Locate magnetic declination charts/formulas"],
    reinforce: ["Flashcards: Angle sum formula (n-2)*180", "Drill: Rapid bearing-to-azimuth conversion"]
  },
  {
    week: 4,
    title: "Traverse Computations & Coordinate Geometry",
    domains: ['Plane Survey Computations'],
    read: ["ES15 Ch. 9 (Traverse), Ch. 10 (Traverse Comp)", "SRM Ch. 6 (Traverse)"],
    focus: ["Latitude and Departure calculations", "Compass Rule (Bowditch) adjustment", "Coordinate geometry (inversing, intersection of lines)", "Area by coordinates method"],
    apply: ["Complete full traverse adjustment by hand (Compass rule)", "Calculate area of a 5-sided polygon using coordinates"],
    reinforce: ["Review: Standard traverse closure ratios (1:5000, etc.)", "Memorize: Lat/Dep formulas (Dist*Cos(Az), Dist*Sin(Az))"]
  },
  {
    week: 5,
    title: "Areas, Volumes, and Route Surveying Basics",
    domains: ['Plane Survey Computations'],
    read: ["ES15 Ch. 12 (Area), Ch. 26 (Volumes)", "SRM Ch. 8 (Areas/Volumes)"],
    focus: ["Average end area vs. Prismoidal formula", "Borrow pit volume calculations", "Area by DMD (Double Meridian Distance)"],
    apply: ["Calculate earthwork volume for a 3-station roadway section", "Solve an area problem with a curved boundary (Simpson's rule)"],
    reinforce: ["Flashcards: Prismoidal formula, DMD rules", "Concept check: When is average end area NOT sufficient?"]
  },
  {
    week: 6,
    title: "Horizontal & Vertical Curves",
    domains: ['Plane Survey Computations'],
    read: ["ES15 Ch. 24 (Horizontal Curves), Ch. 25 (Vertical Curves)", "SRM Ch. 10 (Curves)"],
    focus: ["Horizontal curve elements (PC, PT, PI, LC, R, D, T, E, M)", "Degree of curve definition (arc vs chord)", "Vertical curve high/low point calculation", "Sight distance on vertical curves"],
    apply: ["Compute all elements for a generic horizontal curve given Delta and R", "Find station and elevation of a vertical curve high point"],
    reinforce: ["Memorize: Standard formulas for T, L, LC, E, M", "Draw and label a full curve diagram from memory"]
  },
  {
    week: 7,
    title: "Geodesy Fundamentals",
    domains: ['Geodesy, GPS, Astronomy'],
    read: ["ES15 Ch. 19 (Geodetic models)", "SRM Ch. 7 (Geodesy)", "NOAA NOS NGS 0005 (Introduction)"],
    focus: ["Ellipsoid vs. Geoid vs. Topographic surface", "Geoid heights and separation (N)", "Datums: NAD27, NAD83, NAVD88, NGVD29", "State Plane Coordinate concepts (Lambert vs Transverse Mercator)"],
    apply: ["Convert Orthometric height to Ellipsoid height using Geoid height", "Identify which projection Texas uses primarily (Lambert)"],
    reinforce: ["Flashcards: Datum definitions and year of adjustments", "Concept Map: Relationship between H, h, and N"]
  },
  {
    week: 8,
    title: "GNSS/GPS & Satellite Surveying",
    domains: ['Geodesy, GPS, Astronomy'],
    read: ["ES15 Ch. 13 (Global Navigation Satellite Systems), Ch. 14 (GNSS Surveys)", "SRM Ch. 7 (GPS section)"],
    focus: ["GNSS error sources (Multipath, PDOP/GDOP, Ionosphere)", "RTK vs. Static methods", "CORS networks (OPUS)", "Survey grades of GPS receivers"],
    apply: ["Interpret an OPUS report (simulated or real)", "Calculate best times for observation based on a DOP chart"],
    reinforce: ["Acronyms: SV, DOP, RINEX, RTK, VRS", "Quiz: What conditions cause high multipath?"]
  },
  {
    week: 9,
    title: "Mapping, CAD, GIS & Photogrammetry",
    domains: ['Mapping, GIS, and CAD'],
    read: ["ES15 Ch. 16 (Mapping), Ch. 27 (Photogrammetry), Ch. 28 (GIS)", "SRM Ch. 9 (Photogrammetry)"],
    focus: ["Contour characteristics and interpolation", "Photogrammetry scale calculations (focal length/flying height)", "Relief displacement in aerial photos", "Raster vs Vector data in GIS", "Metadata standards"],
    apply: ["Calculate flying height required for a specific photo scale", "Draw contours from a grid of spot elevations"],
    reinforce: ["Flashcards: Map scales (standard USGS scales)", "Memorize: Scale = f / (H-h)"]
  },
  {
    week: 10,
    title: "Boundary Law Principles (Part 1)",
    domains: ['Boundary Law & PLSS'],
    read: ["ES15 Ch. 20 (Boundary Surveys)", "SRM Ch. 11 (Boundary Law)", "Brown's Boundary Control (if available, selected chapters)"],
    focus: ["Order of conflicting title elements (Rights > Seniority > Monuments > ...)", "Types of deeds (Warranty, Quitclaim)", "Easements (types, creation, termination)", "Adverse possession elements"],
    apply: ["Case studies: Determine seniority in a simulated block overlap", "Write legal descriptions for simple lots"],
    reinforce: ["Mnemonic: 'Call for monuments' hierarchy", "Flashcards: Definitions of prescription, dedication, eminent domain"]
  },
  {
    week: 11,
    title: "Public Land Survey System (PLSS)",
    domains: ['Boundary Law & PLSS'],
    read: ["ES15 Ch. 22 (PLSS)", "SRM Ch. 12 (PLSS)", "BLM Manual (2009): Ch. 1-3 (Basics)"],
    focus: ["Initial points, Principal Meridians, Baselines", "Township/Range/Section numbering (standard vs correction)", "Subdivision of sections (aliquot parts)", "Corners: Standard, Closing, Meander"],
    apply: ["Sketch a full township with section numbering from memory", "Calculate acreage of complex aliquot parts (e.g., N1/2 of SE1/4 of NE1/4...)"],
    reinforce: ["Drill: Rapid identification of section corners vs quarter corners", "Memorize: Nominal township size (6x6 miles)"]
  },
  {
    week: 12,
    title: "PLSS: Restoration of Lost Corners",
    domains: ['Boundary Law & PLSS'],
    read: ["BLM Manual (2009): Ch. 5 (Restoration of Lost Corners)", "BLM Manual: Ch. 7 (Resurveys)"],
    focus: ["Lost vs. Obliterated corners definition", "Single proportionate measurement rules", "Double proportionate measurement rules", "Grant Boundary adjustment methods"],
    apply: ["Solve a double proportion problem for a lost interior township corner", "Solve a single proportion for a lost quarter corner"],
    reinforce: ["Flowchart: Decision tree for Lost vs Obliterated", "Quiz: When do you NOT use proportionate measurement?"]
  },
  {
    week: 13,
    title: "Water Boundaries & Texas Specifics",
    domains: ['Boundary Law & PLSS', 'Professional Practice'],
    read: ["ES15 Ch. 21 (Water Boundaries)", "TSPS Manual of Practice (Selected sections on standards)", "Texas Natural Resources Code (relevant water sections)"],
    focus: ["Navigable vs Non-navigable streams (legal definitions)", "Riparian vs Littoral rights", "Accretion, Reliction, Avulsion, Erosion", "Gradient Boundary method (Texas specific note)"],
    apply: ["Determine boundary line for a gradual vs sudden change in stream course", "Review TSPS Category 1A survey standards"],
    reinforce: ["Flashcards: Water terminology definitions", "Key concept: The 'thread' of the stream vs bank"]
  },
  {
    week: 14,
    title: "Professional Practice, Ethics & Business",
    domains: ['Professional Practice'],
    read: ["NCEES FS Handbook (Ethics section)", "SRM Ch. 13 (Business/Prof)", "TSPS Code of Ethics"],
    focus: ["NCEES Model Rules of Professional Conduct", "Determine canons of ethics (public welfare paramount)", "Contracts basics for surveyors", "ALTA/NSPS Land Title Survey standards (basics)"],
    apply: ["Ethics case studies (what would you do scenarios)", "Identify ethical violations in hypothetical scenarios"],
    reinforce: ["Review: NCEES Rules of Professional Conduct", "Memorize: The paramount responsibility of the surveyor (Public Health, Safety, Welfare)"]
  },
  {
    week: 15,
    title: "Weak Area Review & Targeted Practice",
    domains: ['Math & Basic Science', 'Plane Survey Computations', 'Boundary Law & PLSS'],
    read: ["Re-read highlighted sections of ES15/SRM for weakest 2 domains"],
    focus: ["Review error logs from previous 14 weeks of practice problems", "Deep dive into hardest concepts (usually Geodesy or complex PLSS for most)"],
    apply: ["Take 2 timed mini-exams (50 questions each) focused on weak areas", "Practice using ONLY the NCEES Handbook for formulas"],
    reinforce: ["Re-do missed flashcards", "Teach a complex concept to someone else (or empty chair)"]
  },
  {
    week: 16,
    title: "Final Simulations & Exam Prep",
    domains: ['Math & Basic Science', 'Field Data Acquisition', 'Plane Survey Computations', 'Mapping, GIS, and CAD', 'Boundary Law & PLSS', 'Geodesy, GPS, Astronomy', 'Professional Practice'],
    read: ["NCEES Examinee Guide (Test day rules)"],
    focus: ["Test-taking strategy (triage questions, time management)", "Packing for exam day (approved calculator, ID)"],
    apply: ["Full NCEES Practice Exam (Timed, 5.5 hours simulated split)", "Analyze results and do final spot review"],
    reinforce: ["Rest and mental preparation", "Light review of formula sheet only"]
  },
];

// --- Components ---

const Checkbox = ({ label, checked, onChange }: { label: string, checked: boolean, onChange: () => void }) => (
  <div 
    onClick={onChange}
    className={cn(
      "flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all hover:bg-slate-50",
      checked ? "bg-slate-50 border-slate-300" : "bg-white border-slate-200"
    )}
  >
    <div className={cn(
      "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors",
      checked ? "border-blue-600 bg-blue-600 text-white" : "border-slate-400 bg-white"
    )}>
      {checked && <CheckCircle2 className="h-3.5 w-3.5" />}
    </div>
    <span className={cn("text-sm leading-tight", checked ? "text-slate-500 line-through" : "text-slate-800")}>
      {label}
    </span>
  </div>
);

const DomainBadge = ({ domain }: { domain: Domain }) => {
  const config = FS_DOMAINS[domain];
  const Icon = config.icon;
  return (
    <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium", config.color)}>
      <Icon className="w-3.5 h-3.5" />
      {domain}
    </span>
  );
};

const WeekCard = ({ plan, isExpanded, onToggle }: { plan: WeekPlan, isExpanded: boolean, onToggle: () => void }) => {
  // Simulated local state for checkboxes (would be persistent in real app)
  const [completed, setCompleted] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    const next = new Set(completed);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setCompleted(next);
  };

  const totalItems = plan.read.length + plan.focus.length + plan.apply.length + plan.reinforce.length;
  const progress = Math.round((completed.size / totalItems) * 100) || 0;

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm mb-4 transition-all hover:shadow-md">
      <div 
        className={cn("p-4 cursor-pointer flex items-center justify-between border-l-4", isExpanded ? "bg-slate-50 border-l-blue-600" : "border-l-slate-300")}
        onClick={onToggle}
      >
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="font-bold text-slate-500 text-sm uppercase tracking-wider">Week {plan.week}</span>
            {progress === 100 ? 
              <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-medium flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> Complete</span> :
              <span className="text-xs text-slate-500 font-medium">{progress}% done</span>
            }
          </div>
          <h3 className="text-lg font-semibold text-slate-900">{plan.title}</h3>
          <div className="flex flex-wrap gap-2 mt-3">
            {plan.domains.map(d => <DomainBadge key={d} domain={d} />)}
          </div>
        </div>
        <div className="ml-4 text-slate-400">
          {isExpanded ? <ChevronDown /> : <ChevronRight />}
        </div>
      </div>

      {isExpanded && (
        <div className="p-6 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-6 bg-white">
          {/* READ */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-blue-700 font-semibold uppercase text-sm tracking-wider">
              <BookOpen className="w-4 h-4" /> READ
            </div>
            <div className="space-y-2">
              {plan.read.map((item, i) => (
                <Checkbox 
                  key={`read-${i}`} 
                  label={item} 
                  checked={completed.has(`read-${i}`)} 
                  onChange={() => toggleItem(`read-${i}`)}
                />
              ))}
            </div>
          </div>

          {/* FOCUS */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-indigo-700 font-semibold uppercase text-sm tracking-wider">
              <Target className="w-4 h-4" /> FOCUS
            </div>
            <div className="space-y-2">
              {plan.focus.map((item, i) => (
                <Checkbox 
                  key={`focus-${i}`} 
                  label={item} 
                  checked={completed.has(`focus-${i}`)} 
                  onChange={() => toggleItem(`focus-${i}`)}
                />
              ))}
            </div>
          </div>

          {/* APPLY */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-amber-700 font-semibold uppercase text-sm tracking-wider">
              <Dumbbell className="w-4 h-4" /> APPLY
            </div>
            <div className="space-y-2">
              {plan.apply.map((item, i) => (
                <Checkbox 
                  key={`apply-${i}`} 
                  label={item} 
                  checked={completed.has(`apply-${i}`)} 
                  onChange={() => toggleItem(`apply-${i}`)}
                />
              ))}
            </div>
          </div>

          {/* REINFORCE */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-emerald-700 font-semibold uppercase text-sm tracking-wider">
              <BrainCircuit className="w-4 h-4" /> REINFORCE
            </div>
            <div className="space-y-2">
              {plan.reinforce.map((item, i) => (
                <Checkbox 
                  key={`reinforce-${i}`} 
                  label={item} 
                  checked={completed.has(`reinforce-${i}`)} 
                  onChange={() => toggleItem(`reinforce-${i}`)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const AppendixView = ({ id, title, children }: { id: string, title: string, children: React.ReactNode }) => (
  <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
    <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
      <h2 className="text-xl font-bold text-slate-900">Appendix {id}: {title}</h2>
    </div>
    <div className="p-6 prose prose-slate max-w-none">
      {children}
    </div>
  </div>
);

export default function StudyGuideApp() {
  const [activeView, setActiveView] = useState('schedule');
  const [expandedWeek, setExpandedWeek] = useState<number | null>(1);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const NavItem = ({ id, icon: Icon, label }: { id: string, icon: React.ElementType, label: string }) => (
    <button
      onClick={() => { setActiveView(id); setMobileMenuOpen(false); }}
      className={cn(
        "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
        activeView === id 
          ? "bg-blue-50 text-blue-700" 
          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
      )}
    >
      <Icon className="w-4 h-4" />
      {label}
    </button>
  );

  const renderContent = () => {
    switch (activeView) {
      case 'schedule':
        return (
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">16-Week FS Exam Roadmap</h1>
              <p className="text-slate-600">Follow the READ → FOCUS → APPLY → REINFORCE framework weekly to master all 7 NCEES domains.</p>
            </div>
            <div className="space-y-4">
              {STUDY_PLAN.map(plan => (
                <WeekCard 
                  key={plan.week} 
                  plan={plan} 
                  isExpanded={expandedWeek === plan.week} 
                  onToggle={() => setExpandedWeek(expandedWeek === plan.week ? null : plan.week)}
                />
              ))}
            </div>
          </div>
        );
      case 'domains':
        return (
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-slate-900 mb-6">Domain Correlation Map</h1>
            <div className="grid grid-cols-1 gap-6">
              {(Object.keys(FS_DOMAINS) as Domain[]).map(domain => (
                <div key={domain} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                  <div className={cn("px-4 py-3 border-b border-slate-100 flex items-center gap-3", FS_DOMAINS[domain].color)}>
                    {React.createElement(FS_DOMAINS[domain].icon, { className: "w-5 h-5" })}
                    <h3 className="font-bold">{domain}</h3>
                  </div>
                  <div className="p-4 bg-slate-50">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Covered in Weeks:</h4>
                    <div className="flex flex-wrap gap-2">
                      {STUDY_PLAN.filter(p => p.domains.includes(domain)).map(p => (
                        <button 
                          key={p.week} 
                          onClick={() => { setActiveView('schedule'); setExpandedWeek(p.week); }}
                          className="px-3 py-1 bg-white border border-slate-300 rounded-md text-sm font-medium text-slate-700 hover:border-blue-500 hover:text-blue-600"
                        >
                          Week {p.week}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'app-a':
        return (
          <AppendixView id="A" title="General Knowledge & Concepts">
            <h3>Safety (Crucial for Field domains)</h3>
            <ul>
              <li><strong>Poison Ivy/Oak:</strong> "Leaves of three, let it be." Wash with Tecnu or cold water immediately.</li>
              <li><strong>Traffic Safety:</strong> MUTCD standards for cones/signs. Always wear ANSI Class 2 or 3 vests near roads.</li>
              <li><strong>Snakes (Texas):</strong> Rattlesnakes, Copperheads, Cottonmouths, Coral Snakes ("Red touch yellow, kill a fellow").</li>
            </ul>
            <h3>Grammar & Writing (for Professional Practice)</h3>
            <ul>
              <li>Survey reports must be clear and concise. Avoid jargon when writing for clients.</li>
              <li>Legal descriptions: Use proper punctuation; a semicolon often denotes the end of a specific call.</li>
            </ul>
          </AppendixView>
        );
      case 'app-c':
        return (
          <AppendixView id="C" title="Formula & Constants Sheet (Quick Ref)">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-2">Constants</h4>
                <ul className="space-y-1 text-sm text-slate-700 font-mono">
                  <li>1 acre = 43,560 sq ft</li>
                  <li>1 mile = 5,280 ft = 80 chains</li>
                  <li>1 chain = 66 ft = 100 links</li>
                  <li>1 rod/pole/perch = 16.5 ft</li>
                  <li>pi ≈ 3.14159265</li>
                  <li>1 radian ≈ 57.2958 degrees</li>
                </ul>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-2">Key Formulas (Memorize)</h4>
                <ul className="space-y-1 text-sm text-slate-700">
                  <li><strong>Pythagorean:</strong> a² + b² = c²</li>
                  <li><strong>Lat/Dep:</strong> Lat = D*cos(Az), Dep = D*sin(Az)</li>
                  <li><strong>Angle Sum:</strong> (n-2) * 180°</li>
                  <li><strong>Compass Rule:</strong> Adj = -(Total Error)*(Dist/Total Dist)</li>
                  <li><strong>Leveling:</strong> HI = Elev + BS; New Elev = HI - FS</li>
                </ul>
              </div>
            </div>
            <p className="mt-4 text-sm text-slate-500">*Always use the NCEES Handbook during practice to build familiarity with its specific layout.</p>
          </AppendixView>
        );
      case 'app-d':
        return (
          <AppendixView id="D" title="Flashcard Development Guide">
            <p>Don't just buy flashcards, <strong>make them</strong>. The act of writing helps retention.</p>
            <h3>High-Yield Topics for Cards:</h3>
            <ul>
              <li><strong>Definitions:</strong> Metes & bounds, easement appurtenant, estoppel, laches.</li>
              <li><strong>Standard values:</strong> Prism constants (if generic), standard atmospheric pressure (1013.25 hPa).</li>
              <li><strong>PLSS Diagrams:</strong> Draw a blank township and number it quickly.</li>
              <li><strong>Equipment Errors:</strong> Collimation (correct by double centering), Parallax (focus eyepiece).</li>
            </ul>
            <h3>Spaced Repetition System (SRS):</h3>
            <p>Review new cards daily. If correct, move to "every 3 days" pile. If correct again, "weekly" pile. Any miss goes back to "daily".</p>
          </AppendixView>
        );
      case 'app-f':
        return (
          <AppendixView id="F" title="Reference Source List">
             <ul className="space-y-2">
              <li className="flex flex-col">
                <span className="font-semibold">NCEES FS Reference Handbook (v2.5 or current)</span>
                <span className="text-sm text-slate-600">The only reference allowed in the exam room. Know it cold.</span>
              </li>
              <li className="flex flex-col">
                <span className="font-semibold">Elementary Surveying, 15th Ed (Ghilani)</span>
                <span className="text-sm text-slate-600">Primary textbook for theory and deep dives.</span>
              </li>
              <li className="flex flex-col">
                <span className="font-semibold">Surveyor Reference Manual (Cole)</span>
                <span className="text-sm text-slate-600">Concise review and excellent hard practice problems.</span>
              </li>
              <li className="flex flex-col">
                <span className="font-semibold">BLM Manual of Surveying Instructions (2009)</span>
                <span className="text-sm text-slate-600">The bible for PLSS. Free PDF available from BLM.</span>
              </li>
              <li className="flex flex-col">
                <span className="font-semibold">TSPS Manual of Practice</span>
                <span className="text-sm text-slate-600">For Texas-specific standards and professional ethics context.</span>
              </li>
            </ul>
          </AppendixView>
        );
      default:
        return <div className="p-8 text-center text-slate-500">Select a section from the menu.</div>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row font-sans text-slate-900">
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b border-slate-200 p-4 flex items-center justify-between sticky top-0 z-20">
        <span className="font-bold text-lg text-blue-900 flex items-center gap-2">
          <Globe2 className="w-6 h-6 text-blue-600" />
          FS Master Guide
        </span>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 bg-slate-100 rounded-md">
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-10 w-64 bg-white border-r border-slate-200 transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0",
        mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6 border-b border-slate-100 hidden md:flex items-center gap-2">
          <Globe2 className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="font-extrabold text-xl text-slate-900 leading-none">FS EXAM</h1>
            <span className="text-xs font-bold text-blue-600 tracking-widest">TEXAS PREP</span>
          </div>
        </div>
        
        <div className="py-4 overflow-y-auto h-full">
          <div className="px-4 mb-6">
            <h2 className="px-3 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Core Study</h2>
            <div className="space-y-1">
              <NavItem id="schedule" icon={CalendarCheck} label="Weekly Schedule" />
              <NavItem id="domains" icon={PieChart} label="Domain Map" />
            </div>
          </div>

          <div className="px-4 mb-6">
            <h2 className="px-3 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Appendices</h2>
            <div className="space-y-1">
              <NavItem id="app-a" icon={Lightbulb} label="A: General Knowledge" />
              <NavItem id="app-c" icon={Calculator} label="C: Formulas & Constants" />
              <NavItem id="app-d" icon={Library} label="D: Flashcard Guide" />
              <NavItem id="app-f" icon={Bookmark} label="F: Reference List" />
            </div>
          </div>
          
          <div className="px-6 mt-8">
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
              <h4 className="font-bold text-blue-900 mb-1 flex items-center gap-2">
                <Target className="w-4 h-4" /> Daily Goal
              </h4>
              <p className="text-sm text-blue-800 mb-2">Aim for 4 hours today. Mix reading with active problem solving.</p>
              <div className="w-full bg-blue-200 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto h-screen">
        <div className="p-4 md:p-8 lg:p-12 max-w-6xl mx-auto">
          {renderContent()}
        </div>
      </div>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-0 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}
