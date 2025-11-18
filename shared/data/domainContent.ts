import type { DomainNumber } from '../domains';

// Domain-specific study content for generating custom weekly plans
// Each domain includes recommended resources and activities for READ, FOCUS, APPLY, and REINFORCE phases

interface DomainContent {
  read: string[];
  focus: string[];
  apply: string[];
  reinforce: string[];
}

export const DOMAIN_CONTENT: Record<DomainNumber, DomainContent> = {
  0: {
    // Math & Science Foundations
    read: [
      "Surveyor Ref Manual (SRM) Ch. 1 (Algebra/Trig basics)",
      "Review fundamental math operations and calculator usage",
      "NCEES Handbook: Math & Stats formulas section"
    ],
    focus: [
      "Algebraic manipulations and equation solving",
      "Trigonometric functions and identities",
      "Basic calculus concepts (derivatives, integrals)",
      "Scientific notation and significant figures"
    ],
    apply: [
      "SRM Ch. 1 practice problems",
      "Calculator drills for trig functions",
      "Unit conversion exercises"
    ],
    reinforce: [
      "Flashcards: Trig identities and formulas",
      "Daily calculator practice (5 min)",
      "Memorize: Common angle values (30°, 45°, 60°)"
    ]
  },
  1: {
    // Surveying Processes and Methods
    read: [
      "Elementary Surveying (ES15) Ch. 4 (Leveling Theory), Ch. 5 (Leveling Practice)",
      "ES15 Ch. 6 (Distance), Ch. 7 (Angles/Directions), Ch. 8 (Total Stations)",
      "SRM Ch. 3 (Distance), Ch. 4 (Leveling), Ch. 5 (Angles/Directions)"
    ],
    focus: [
      "Differential leveling notes & reductions (HI/Turning Point method)",
      "Curvature & Refraction corrections",
      "EDM characteristics and systematic errors (ppm)",
      "Taping corrections (temp, sag, tension, slope)",
      "Converting between Azimuths and Bearings",
      "Total Station instrument errors (collimation, trunnion axis)"
    ],
    apply: [
      "Reduce a full page of differential leveling notes",
      "Calculate 3 taping correction problems from SRM",
      "Solve 5 bearing-to-azimuth conversion problems",
      "Identify and correct Total Station systematic errors"
    ],
    reinforce: [
      "Quiz: When to add/subtract curvature & refraction?",
      "Practice: EDM ppm calculation without a calculator",
      "Flashcards: Taping correction formulas",
      "Drill: Rapid bearing-to-azimuth conversion (< 30 sec each)"
    ]
  },
  2: {
    // Mapping Processes and Methods
    read: [
      "ES15 Ch. 16 (Mapping & CAD)",
      "ES15 Ch. 27 (Photogrammetry), Ch. 28 (GIS)",
      "SRM Ch. 9 (Photogrammetry & Remote Sensing)"
    ],
    focus: [
      "Contour characteristics and interpolation methods",
      "Photogrammetry scale calculations (focal length / flying height)",
      "Relief displacement in aerial photos",
      "Raster vs Vector data structures in GIS",
      "Metadata standards and accuracy requirements",
      "Map projections and coordinate systems"
    ],
    apply: [
      "Calculate flying height required for specific photo scale",
      "Draw contours from a grid of spot elevations",
      "Interpret aerial photos for planning measurements",
      "GIS data layer analysis exercises"
    ],
    reinforce: [
      "Flashcards: Standard USGS map scales",
      "Memorize: Photo scale formula S = f / (H - h)",
      "Quiz: Relief displacement direction",
      "Practice: Contour interpolation drills"
    ]
  },
  3: {
    // Boundary Law and Real Property Principles
    read: [
      "ES15 Ch. 20 (Boundary Surveys), Ch. 21 (Water Boundaries)",
      "SRM Ch. 11 (Boundary Law)",
      "Brown's Boundary Control (selected chapters if available)",
      "Relevant state-specific boundary law (e.g., Texas Natural Resources Code)"
    ],
    focus: [
      "Order of conflicting title elements (Rights > Seniority > Monuments > ...)",
      "Types of deeds (Warranty, Quitclaim, Bargain & Sale)",
      "Easements (types, creation, termination)",
      "Adverse possession elements and requirements",
      "Navigable vs Non-navigable streams (legal definitions)",
      "Riparian vs Littoral rights",
      "Accretion, Reliction, Avulsion, Erosion definitions"
    ],
    apply: [
      "Case studies: Determine seniority in simulated block overlap",
      "Write legal descriptions for simple lots",
      "Determine boundary line for gradual vs sudden stream course change",
      "Analyze deed descriptions for ambiguities"
    ],
    reinforce: [
      "Mnemonic: 'Call for monuments' hierarchy",
      "Flashcards: Definitions of prescription, dedication, eminent domain",
      "Flashcards: Water boundary terminology",
      "Key concept: The 'thread' of the stream vs bank"
    ]
  },
  4: {
    // Surveying Principles
    read: [
      "ES15 Ch. 1 (Introduction), Ch. 2 (Units & Significant Figures), Ch. 3 (Theory of Errors)",
      "ES15 Ch. 22 (PLSS), BLM Manual (2009): Ch. 1-3 (Basics), Ch. 5 (Restoration)",
      "SRM Ch. 12 (PLSS)"
    ],
    focus: [
      "Significant figures & rounding standards",
      "Error propagation formulas (sum, product, series)",
      "Standard deviation vs. standard error of the mean",
      "Unit conversions (survey foot vs international foot)",
      "Initial points, Principal Meridians, Baselines",
      "Township/Range/Section numbering (standard vs correction)",
      "Subdivision of sections (aliquot parts)",
      "Lost vs. Obliterated corners definition",
      "Single & Double proportionate measurement rules"
    ],
    apply: [
      "SRM Ch. 2 practice problems (focus on error ellipses)",
      "Sketch a full township with section numbering from memory",
      "Calculate acreage of complex aliquot parts (e.g., N1/2 of SE1/4 of NE1/4)",
      "Solve a double proportion problem for a lost interior township corner"
    ],
    reinforce: [
      "Flashcards: Standard deviation formula, error propagation rules",
      "Memorize: 1 acre = 43,560 sq ft, 1 ch = 66 ft",
      "Drill: Rapid section corner identification",
      "Memorize: Nominal township size (6x6 miles)",
      "Flowchart: Decision tree for Lost vs Obliterated corners"
    ]
  },
  5: {
    // Survey Computations and Computer Applications
    read: [
      "ES15 Ch. 9 (Traverse), Ch. 10 (Traverse Computations)",
      "ES15 Ch. 12 (Area), Ch. 26 (Volumes)",
      "ES15 Ch. 24 (Horizontal Curves), Ch. 25 (Vertical Curves)",
      "SRM Ch. 6 (Traverse), Ch. 8 (Areas/Volumes), Ch. 10 (Curves)"
    ],
    focus: [
      "Latitude and Departure calculations",
      "Compass Rule (Bowditch) adjustment",
      "Coordinate geometry (inversing, intersection of lines)",
      "Area by coordinates method and DMD (Double Meridian Distance)",
      "Average end area vs. Prismoidal formula",
      "Borrow pit volume calculations",
      "Horizontal curve elements (PC, PT, PI, LC, R, D, T, E, M)",
      "Degree of curve definition (arc vs chord)",
      "Vertical curve high/low point calculation"
    ],
    apply: [
      "Complete full traverse adjustment by hand (Compass rule)",
      "Calculate area of a 5-sided polygon using coordinates",
      "Calculate earthwork volume for a 3-station roadway section",
      "Compute all elements for a horizontal curve given Delta and R",
      "Find station and elevation of a vertical curve high point"
    ],
    reinforce: [
      "Review: Standard traverse closure ratios (1:5000, etc.)",
      "Memorize: Lat/Dep formulas (Dist*Cos(Az), Dist*Sin(Az))",
      "Flashcards: Prismoidal formula, DMD rules",
      "Memorize: Standard curve formulas for T, L, LC, E, M",
      "Draw and label a full curve diagram from memory"
    ]
  },
  6: {
    // Business Concepts
    read: [
      "SRM Ch. 13 (Business & Professional Practice)",
      "NCEES FS Handbook (Ethics section)",
      "State-specific professional practice acts (e.g., TSPS Code of Ethics)",
      "Professional liability and insurance basics"
    ],
    focus: [
      "Project management fundamentals (scheduling, budgeting)",
      "Contract types (lump sum, cost-plus, time & materials)",
      "Professional liability and standard of care",
      "Ethics scenarios and professional conduct",
      "Client relations and communication",
      "Quality assurance and quality control (QA/QC)",
      "Business structure (sole proprietorship, LLC, corporation)"
    ],
    apply: [
      "Review sample ethics scenarios from NCEES",
      "Calculate project budget for sample survey job",
      "Analyze contract terms for risk allocation",
      "Develop QA/QC checklist for field survey"
    ],
    reinforce: [
      "Flashcards: Contract terminology",
      "Review: Professional ethics case studies",
      "Memorize: Elements of professional standard of care",
      "Quiz: Identify ethical violations in scenarios"
    ]
  },
  7: {
    // Applied Mathematics and Statistics
    read: [
      "SRM Ch. 2 (Statistics & Error Analysis)",
      "SRM Ch. 7 (Geodesy - mathematical components)",
      "ES15 Ch. 19 (Geodetic models & computations)",
      "NOAA NOS NGS publications (Introduction to Geodesy)"
    ],
    focus: [
      "Statistical analysis of survey measurements",
      "Confidence intervals and hypothesis testing",
      "Least squares adjustment principles",
      "Weight of observations",
      "Ellipsoid vs. Geoid vs. Topographic surface",
      "Geoid heights and separation (N = h - H)",
      "Datums: NAD27, NAD83, NAVD88, NGVD29",
      "State Plane Coordinate systems (Lambert vs Transverse Mercator)",
      "GNSS error sources and mitigation (Multipath, PDOP/GDOP)"
    ],
    apply: [
      "Calculate weighted mean and standard deviation for repeated measurements",
      "Perform simple least squares adjustment",
      "Convert Orthometric height to Ellipsoid height using Geoid height",
      "Identify appropriate State Plane zone and projection for project",
      "Interpret OPUS report and assess solution quality"
    ],
    reinforce: [
      "Flashcards: Datum definitions and years of adjustment",
      "Concept Map: Relationship between H, h, and N",
      "Practice: Statistical calculations without calculator",
      "Acronyms: SV, DOP, RINEX, RTK, VRS, CORS",
      "Memorize: Formula for combining standard deviations"
    ]
  }
};

// Helper function to generate week title based on selected domains
export function generateWeekTitle(domainNumbers: number[]): string {
  if (domainNumbers.length === 0) return "Custom Study Week";
  if (domainNumbers.length === 1) {
    const domainNames: Record<number, string> = {
      0: "Math & Science Foundations",
      1: "Surveying Processes & Methods",
      2: "Mapping Processes & Methods",
      3: "Boundary Law & Real Property",
      4: "Surveying Principles",
      5: "Survey Computations",
      6: "Business Concepts",
      7: "Applied Mathematics & Statistics"
    };
    return domainNames[domainNumbers[0]] || "Custom Study Week";
  }
  return `Multi-Domain Focus (${domainNumbers.length} domains)`;
}

// Generate combined content for multiple domains
export function generateWeekContent(domainNumbers: number[]): DomainContent {
  const combined: DomainContent = {
    read: [],
    focus: [],
    apply: [],
    reinforce: []
  };

  // Collect content from all selected domains
  domainNumbers.forEach(domainNum => {
    const content = DOMAIN_CONTENT[domainNum as DomainNumber];
    if (content) {
      combined.read.push(...content.read);
      combined.focus.push(...content.focus);
      combined.apply.push(...content.apply);
      combined.reinforce.push(...content.reinforce);
    }
  });

  return combined;
}
