import type { WeekPlan } from '../schema';

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
