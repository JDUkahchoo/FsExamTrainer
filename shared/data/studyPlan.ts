import type { WeekPlan, PSDomain } from '../schema';

// FS Exam Study Plan (16 weeks)
export const STUDY_PLAN: WeekPlan[] = [
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
    domains: ['Field Data Acquisition', 'Surveying Principles'],
    read: ["ES15 Ch. 7 (Angles/Directions), Ch. 8 (Total Stations)", "SRM Ch. 5 (Angles/Directions)"],
    focus: ["Converting between Azimuths and Bearings", "Magnetic declination adjustments over time", "Interior/Exterior angle sums for polygons", "Total Station instrument errors (collimation, trunnion axis)"],
    apply: ["Solve 5 closed-traverse interior angle problems", "NCEES Handbook: Locate magnetic declination charts/formulas"],
    reinforce: ["Flashcards: Angle sum formula (n-2)*180", "Drill: Rapid bearing-to-azimuth conversion"]
  },
  {
    week: 4,
    title: "Traverse Computations & Coordinate Geometry",
    domains: ['Surveying Principles'],
    read: ["ES15 Ch. 9 (Traverse), Ch. 10 (Traverse Comp)", "SRM Ch. 6 (Traverse)"],
    focus: ["Latitude and Departure calculations", "Compass Rule (Bowditch) adjustment", "Coordinate geometry (inversing, intersection of lines)", "Area by coordinates method"],
    apply: ["Complete full traverse adjustment by hand (Compass rule)", "Calculate area of a 5-sided polygon using coordinates"],
    reinforce: ["Review: Standard traverse closure ratios (1:5000, etc.)", "Memorize: Lat/Dep formulas (Dist*Cos(Az), Dist*Sin(Az))"]
  },
  {
    week: 5,
    title: "Areas, Volumes, and Route Surveying Basics",
    domains: ['Surveying Principles'],
    read: ["ES15 Ch. 12 (Area), Ch. 26 (Volumes)", "SRM Ch. 8 (Areas/Volumes)"],
    focus: ["Average end area vs. Prismoidal formula", "Borrow pit volume calculations", "Area by DMD (Double Meridian Distance)"],
    apply: ["Calculate earthwork volume for a 3-station roadway section", "Solve an area problem with a curved boundary (Simpson's rule)"],
    reinforce: ["Flashcards: Prismoidal formula, DMD rules", "Concept check: When is average end area NOT sufficient?"]
  },
  {
    week: 6,
    title: "Horizontal & Vertical Curves",
    domains: ['Surveying Principles'],
    read: ["ES15 Ch. 24 (Horizontal Curves), Ch. 25 (Vertical Curves)", "SRM Ch. 10 (Curves)"],
    focus: ["Horizontal curve elements (PC, PT, PI, LC, R, D, T, E, M)", "Degree of curve definition (arc vs chord)", "Vertical curve high/low point calculation", "Sight distance on vertical curves"],
    apply: ["Compute all elements for a generic horizontal curve given Delta and R", "Find station and elevation of a vertical curve high point"],
    reinforce: ["Memorize: Standard formulas for T, L, LC, E, M", "Draw and label a full curve diagram from memory"]
  },
  {
    week: 7,
    title: "Geodesy Fundamentals",
    domains: ['Applied Mathematics & Statistics'],
    read: ["ES15 Ch. 19 (Geodetic models)", "SRM Ch. 7 (Geodesy)", "NOAA NOS NGS 0005 (Introduction)"],
    focus: ["Ellipsoid vs. Geoid vs. Topographic surface", "Geoid heights and separation (N)", "Datums: NAD27, NAD83, NAVD88, NGVD29", "State Plane Coordinate concepts (Lambert vs Transverse Mercator)"],
    apply: ["Convert Orthometric height to Ellipsoid height using Geoid height", "Identify which projection Texas uses primarily (Lambert)"],
    reinforce: ["Flashcards: Datum definitions and year of adjustments", "Concept Map: Relationship between H, h, and N"]
  },
  {
    week: 8,
    title: "GNSS/GPS & Satellite Surveying",
    domains: ['Applied Mathematics & Statistics'],
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
    domains: ['Math & Basic Science', 'Surveying Principles', 'Boundary Law & PLSS'],
    read: ["Re-read highlighted sections of ES15/SRM for weakest 2 domains"],
    focus: ["Review error logs from previous 14 weeks of practice problems", "Deep dive into hardest concepts (usually Geodesy or complex PLSS for most)"],
    apply: ["Take 2 timed mini-exams (50 questions each) focused on weak areas", "Practice using ONLY the NCEES Handbook for formulas"],
    reinforce: ["Re-do missed flashcards", "Teach a complex concept to someone else (or empty chair)"]
  },
  {
    week: 16,
    title: "Final Simulations & Exam Prep",
    domains: ['Math & Basic Science', 'Field Data Acquisition', 'Surveying Principles', 'Mapping, GIS, and CAD', 'Boundary Law & PLSS', 'Applied Mathematics & Statistics', 'Professional Practice'],
    read: ["NCEES Examinee Guide (Test day rules)"],
    focus: ["Test-taking strategy (triage questions, time management)", "Packing for exam day (approved calculator, ID)"],
    apply: ["Full NCEES Practice Exam (Timed, 5.5 hours simulated split)", "Analyze results and do final spot review"],
    reinforce: ["Rest and mental preparation", "Light review of formula sheet only"]
  },
];

// PS Exam Study Plan (12 weeks - faster pace for experienced professionals)
export const PS_STUDY_PLAN: WeekPlan[] = [
  {
    week: 1,
    title: "Legal Foundations & Boundary Principles",
    domains: ['Legal Principles'] as PSDomain[],
    read: ["Brown's Boundary Control Ch. 1-3 (Introduction to Boundary Law)", "State-specific property law statutes overview", "ALTA/NSPS 2021 Standards (Introduction)"],
    focus: ["Hierarchy of title elements (rights, seniority, monuments, measurements)", "Types of deeds and their legal implications", "Statute of frauds requirements", "Recording acts and priority systems"],
    apply: ["Analyze sample deed descriptions for legal sufficiency", "Case study: Identify hierarchy conflicts in overlapping claims"],
    reinforce: ["Flashcards: Legal terminology definitions", "Mnemonic: Order of conflicting title elements"]
  },
  {
    week: 2,
    title: "Easements, Boundaries by Agreement & Adverse Possession",
    domains: ['Legal Principles'] as PSDomain[],
    read: ["Brown's Boundary Control Ch. 4-6", "State adverse possession statutes", "Common law boundary doctrines"],
    focus: ["Easement types: appurtenant, in gross, prescriptive", "Easement creation and termination methods", "Elements of adverse possession", "Boundary by agreement, acquiescence, and estoppel"],
    apply: ["Determine if easement requirements are satisfied in scenarios", "Analyze adverse possession claims for completeness"],
    reinforce: ["Flashcards: Easement terminology", "Quiz: Elements required for adverse possession by state"]
  },
  {
    week: 3,
    title: "Water Boundaries & Riparian Rights",
    domains: ['Legal Principles'] as PSDomain[],
    read: ["Brown's Boundary Control (Water boundaries chapter)", "State riparian/littoral law references", "Federal navigable waters jurisdiction"],
    focus: ["Navigable vs non-navigable stream definitions", "Riparian vs littoral rights distinctions", "Accretion, reliction, avulsion, erosion", "Thread of stream vs bank boundaries"],
    apply: ["Determine boundary changes for gradual vs sudden stream changes", "Case study: Analyze navigability determination"],
    reinforce: ["Flashcards: Water boundary terminology", "Diagram: Riparian rights vs littoral rights"]
  },
  {
    week: 4,
    title: "Professional Ethics & Standard of Care",
    domains: ['Professional Survey Practices'] as PSDomain[],
    read: ["NCEES Model Rules of Professional Conduct", "State licensing board rules", "Professional liability case law summaries"],
    focus: ["Surveyor's standard of care definition", "Professional ethics requirements", "Duty to public vs duty to client", "Conflicts of interest identification"],
    apply: ["Ethics scenario analysis and decision-making", "Identify ethical violations in hypothetical situations"],
    reinforce: ["Review: NCEES ethics case studies", "Memorize: Paramount responsibilities (public health, safety, welfare)"]
  },
  {
    week: 5,
    title: "Survey Practice & Documentation",
    domains: ['Professional Survey Practices'] as PSDomain[],
    read: ["State plat requirements", "Field note documentation standards", "Survey certification requirements"],
    focus: ["Survey plat requirements and certifications", "Field note best practices", "Corners: original, obliterated, lost definitions", "Retracement survey principles"],
    apply: ["Review and critique sample survey plats for compliance", "Document proper field notes for a boundary retracement"],
    reinforce: ["Flashcards: Corner restoration procedures", "Checklist: Plat certification requirements"]
  },
  {
    week: 6,
    title: "ALTA/NSPS Standards Mastery",
    domains: ['Standards and Specifications'] as PSDomain[],
    read: ["ALTA/NSPS 2021 Minimum Standard Detail Requirements (complete)", "Table A optional items detailed review", "Certification and disclaimer language"],
    focus: ["ALTA/NSPS Table A items (all 20)", "Positional tolerance calculations", "Relative positional precision requirements", "Certification language requirements"],
    apply: ["Prepare an ALTA/NSPS compliant survey checklist", "Calculate positional tolerance for sample surveys"],
    reinforce: ["Flashcards: Table A items 1-20", "Memorize: Standard certification language"]
  },
  {
    week: 7,
    title: "State & Federal Standards",
    domains: ['Standards and Specifications'] as PSDomain[],
    read: ["State minimum technical standards", "Federal specifications (FGDC, NGS)", "Industry accuracy standards (ASPRS)"],
    focus: ["State-specific accuracy requirements", "Monument specifications by survey type", "Record of survey requirements", "Accuracy classifications and tolerances"],
    apply: ["Compare state standards to ALTA/NSPS requirements", "Evaluate equipment calibration compliance"],
    reinforce: ["Review: State minimum standards summary", "Quiz: Monument type requirements"]
  },
  {
    week: 8,
    title: "Business & Contract Management",
    domains: ['Business Practices'] as PSDomain[],
    read: ["Survey business management fundamentals", "Contract law basics for professionals", "Risk management guides"],
    focus: ["Contract types for survey services", "Proposal preparation and fee estimation", "Scope of services documentation", "Professional liability insurance (E&O)"],
    apply: ["Draft a comprehensive scope of services document", "Develop a fee proposal for a boundary survey"],
    reinforce: ["Flashcards: Contract terminology", "Review: Fee estimation methodologies"]
  },
  {
    week: 9,
    title: "PLSS Restoration & Subdivision",
    domains: ['Areas of Practice'] as PSDomain[],
    read: ["BLM Manual of Surveying Instructions 2009 (Ch. 5-7)", "State subdivision laws", "Platting requirements"],
    focus: ["PLSS section subdivision rules", "Single and double proportionate measurement", "Lost vs obliterated corner restoration", "Subdivision plat requirements"],
    apply: ["Perform section corner restoration calculation", "Prepare subdivision plat checklist"],
    reinforce: ["Drill: Corner restoration decision tree", "Flashcards: PLSS subdivision rules"]
  },
  {
    week: 10,
    title: "Specialized Survey Types",
    domains: ['Areas of Practice'] as PSDomain[],
    read: ["Condominium survey requirements", "Construction staking procedures", "Right-of-way survey standards"],
    focus: ["Condominium surveys and documentation", "Construction and stake-out surveys", "Right-of-way and easement surveys", "Topographic survey specifications"],
    apply: ["Design construction control layout for a building", "Prepare condominium survey documentation"],
    reinforce: ["Checklists: Survey type requirements", "Review: Common staking calculations"]
  },
  {
    week: 11,
    title: "Weak Area Review & Case Studies",
    domains: ['Legal Principles', 'Professional Survey Practices', 'Areas of Practice'] as PSDomain[],
    read: ["Re-read highlighted sections from weakest domains", "Additional case law for boundary disputes"],
    focus: ["Review error logs from previous weeks", "Deep dive into complex scenarios", "Boundary dispute resolution procedures"],
    apply: ["Take timed mini-exam focused on weak areas (50 questions)", "Analyze complex boundary dispute scenarios"],
    reinforce: ["Re-do missed flashcards", "Teach a complex concept to someone else"]
  },
  {
    week: 12,
    title: "Final Exam Simulation & Preparation",
    domains: ['Legal Principles', 'Professional Survey Practices', 'Standards and Specifications', 'Business Practices', 'Areas of Practice'] as PSDomain[],
    read: ["NCEES Examinee Guide (Test day rules)", "Final review of state-specific requirements"],
    focus: ["Test-taking strategy (triage questions, time management)", "Packing for exam day (approved calculator, ID)", "Mental preparation techniques"],
    apply: ["Full PS Practice Exam (Timed, 6 hours)", "Analyze results and do final spot review"],
    reinforce: ["Rest and mental preparation", "Light review of key formulas and definitions"]
  }
];
