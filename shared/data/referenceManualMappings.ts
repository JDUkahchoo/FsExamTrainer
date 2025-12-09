// Reference Manual Companion - Maps lessons to textbook chapters
// Copyright Notice: This file contains only page/chapter references, not copyrighted content

export interface BookReference {
  bookId: string;
  bookTitle: string;
  bookAuthor: string;
  edition: string;
  chapter: number;
  chapterTitle: string;
  pageRange?: string; // e.g., "1-15"
  topics?: string[]; // Key topics covered
}

export interface LessonMapping {
  lessonId: string; // e.g., "d0-lesson-01"
  domainNumber: number;
  lessonTitle: string;
  references: BookReference[];
}

// Book definitions
export const REFERENCE_BOOKS = {
  SRM: {
    id: "SRM",
    title: "Surveyor Reference Manual",
    author: "George M. Cole, PhD, PE, PLS",
    edition: "7th Edition",
    publisher: "PPI / Kaplan",
  },
  ES: {
    id: "ES", 
    title: "Elementary Surveying",
    author: "Charles D. Ghilani & Paul R. Wolf",
    edition: "15th Edition",
    publisher: "Pearson",
  }
} as const;

// Topic structure from Surveyor Reference Manual
export const SRM_TOPICS = {
  I: {
    name: "Mathematics Basics",
    chapters: [
      { number: 1, title: "Algebra" },
      { number: 2, title: "Basic Geometry" },
      { number: 3, title: "Dimensional Equations" },
      { number: 4, title: "Systems of Units" },
      { number: 5, title: "Perimeter and Circumference" },
      { number: 6, title: "Area" },
      { number: 7, title: "Volume" },
      { number: 8, title: "Trigonometry" },
      { number: 9, title: "Rectangular Coordinate System" },
      { number: 10, title: "Analytical Geometry" },
      { number: 11, title: "Statistics of Measurements" },
      { number: 12, title: "Introduction to Calculus" },
    ]
  },
  II: {
    name: "Field Data Acquisition",
    chapters: [
      { number: 13, title: "Taping" },
      { number: 14, title: "Electronic Distance Measurement" },
      { number: 15, title: "Leveling" },
      { number: 16, title: "Compass Survey" },
    ]
  },
  III: {
    name: "Plane Survey Calculations",
    chapters: [
      { number: 17, title: "Traverses" },
      { number: 18, title: "Traverse Adjustment" },
      { number: 19, title: "Partitioning of Land" },
      { number: 20, title: "Horizontal Curves" },
      { number: 21, title: "Vertical Alignment" },
    ]
  },
  IV: {
    name: "Geodesy and Survey Astronomy",
    chapters: [
      { number: 22, title: "Global Positioning System" },
      { number: 23, title: "Map Projections and Plane Coordinate Systems" },
    ]
  },
  V: {
    name: "Cadastral and Boundary Law",
    chapters: [
      { number: 24, title: "History and Origins of Title" },
      { number: 25, title: "Transfer of Ownership" },
      { number: 26, title: "Water Boundaries" },
      { number: 27, title: "Riparian and Littoral Rights" },
      { number: 28, title: "Public Land Survey System" },
      { number: 29, title: "Restoration of Public Land Survey Corners" },
      { number: 30, title: "Land Descriptions" },
      { number: 31, title: "Colonial History and the United States Legal System" },
    ]
  },
  VI: {
    name: "Land Planning and Development",
    chapters: [
      { number: 32, title: "Subdivisions" },
      { number: 33, title: "Residential Planning" },
    ]
  },
  VII: {
    name: "Mapping",
    chapters: [
      { number: 34, title: "Topographic Surveying and Mapping" },
      { number: 35, title: "Geographic Information Systems" },
      { number: 36, title: "Aerial Mapping" },
      { number: 37, title: "Laser Scanning" },
    ]
  },
  VIII: {
    name: "Specialty Surveying Areas",
    chapters: [
      { number: 38, title: "Construction Staking" },
      { number: 39, title: "Earthwork" },
      { number: 40, title: "Hydrographic Surveying" },
    ]
  },
  IX: {
    name: "Computer Operations and Programming",
    chapters: [
      { number: 41, title: "Accuracy Standards" },
    ]
  },
  X: {
    name: "Business Management Practices",
    chapters: [
      { number: 42, title: "Job Costing" },
      { number: 43, title: "Economic Analysis" },
      { number: 44, title: "Ethics for Surveyors" },
    ]
  },
  XI: {
    name: "Support Material",
    chapters: [
      { number: 0, title: "Appendices" },
    ]
  }
} as const;

// Lesson to Book Chapter Mappings
// Domain 0: Math & Science Foundations → SRM Topic I (Mathematics Basics)
export const LESSON_MAPPINGS: LessonMapping[] = [
  // ========== DOMAIN 0: Math & Science Foundations ==========
  {
    lessonId: "d0-lesson-01",
    domainNumber: 0,
    lessonTitle: "Basic Arithmetic and Order of Operations",
    references: [
      {
        bookId: "SRM",
        bookTitle: "Surveyor Reference Manual",
        bookAuthor: "George M. Cole",
        edition: "7th Edition",
        chapter: 1,
        chapterTitle: "Algebra",
        topics: ["Order of operations", "PEMDAS", "Basic arithmetic"]
      }
    ]
  },
  {
    lessonId: "d0-lesson-02",
    domainNumber: 0,
    lessonTitle: "Fractions and Decimals",
    references: [
      {
        bookId: "SRM",
        bookTitle: "Surveyor Reference Manual",
        bookAuthor: "George M. Cole",
        edition: "7th Edition",
        chapter: 1,
        chapterTitle: "Algebra",
        topics: ["Fractions", "Decimals", "Conversions"]
      },
      {
        bookId: "SRM",
        bookTitle: "Surveyor Reference Manual",
        bookAuthor: "George M. Cole",
        edition: "7th Edition",
        chapter: 0,
        chapterTitle: "Appendices",
        topics: ["Appendix A: Conversion Factors", "Unit conversions", "Measurement equivalents"]
      }
    ]
  },
  {
    lessonId: "d0-lesson-03",
    domainNumber: 0,
    lessonTitle: "Percentages and Ratios",
    references: [
      {
        bookId: "SRM",
        bookTitle: "Surveyor Reference Manual",
        bookAuthor: "George M. Cole",
        edition: "7th Edition",
        chapter: 1,
        chapterTitle: "Algebra",
        topics: ["Percentages", "Ratios", "Proportions"]
      },
      {
        bookId: "SRM",
        bookTitle: "Surveyor Reference Manual",
        bookAuthor: "George M. Cole",
        edition: "7th Edition",
        chapter: 0,
        chapterTitle: "Appendices",
        topics: ["Appendix A: Conversion Factors", "Scale ratios", "Mensuration formulas"]
      }
    ]
  },
  {
    lessonId: "d0-lesson-04",
    domainNumber: 0,
    lessonTitle: "Exponents and Radicals",
    references: [
      {
        bookId: "SRM",
        bookTitle: "Surveyor Reference Manual",
        bookAuthor: "George M. Cole",
        edition: "7th Edition",
        chapter: 1,
        chapterTitle: "Algebra",
        topics: ["Exponents", "Square roots", "Radicals", "Scientific notation"]
      }
    ]
  },
  {
    lessonId: "d0-lesson-05",
    domainNumber: 0,
    lessonTitle: "Right Triangle Basics",
    references: [
      {
        bookId: "SRM",
        bookTitle: "Surveyor Reference Manual",
        bookAuthor: "George M. Cole",
        edition: "7th Edition",
        chapter: 2,
        chapterTitle: "Basic Geometry",
        topics: ["Right triangles", "Pythagorean theorem"]
      },
      {
        bookId: "SRM",
        bookTitle: "Surveyor Reference Manual",
        bookAuthor: "George M. Cole",
        edition: "7th Edition",
        chapter: 8,
        chapterTitle: "Trigonometry",
        topics: ["Right triangle trigonometry"]
      }
    ]
  },
  {
    lessonId: "d0-lesson-06",
    domainNumber: 0,
    lessonTitle: "Angle Measurement Systems",
    references: [
      {
        bookId: "SRM",
        bookTitle: "Surveyor Reference Manual",
        bookAuthor: "George M. Cole",
        edition: "7th Edition",
        chapter: 8,
        chapterTitle: "Trigonometry",
        topics: ["Degrees", "Minutes", "Seconds", "Decimal degrees", "Angle conversions"]
      }
    ]
  },
  {
    lessonId: "d0-lesson-07",
    domainNumber: 0,
    lessonTitle: "Basic Geometry Shapes",
    references: [
      {
        bookId: "SRM",
        bookTitle: "Surveyor Reference Manual",
        bookAuthor: "George M. Cole",
        edition: "7th Edition",
        chapter: 2,
        chapterTitle: "Basic Geometry",
        topics: ["Shapes", "Properties"]
      },
      {
        bookId: "SRM",
        bookTitle: "Surveyor Reference Manual",
        bookAuthor: "George M. Cole",
        edition: "7th Edition",
        chapter: 5,
        chapterTitle: "Perimeter and Circumference",
        topics: ["Perimeter formulas"]
      },
      {
        bookId: "SRM",
        bookTitle: "Surveyor Reference Manual",
        bookAuthor: "George M. Cole",
        edition: "7th Edition",
        chapter: 6,
        chapterTitle: "Area",
        topics: ["Area formulas"]
      }
    ]
  },
  {
    lessonId: "d0-lesson-08",
    domainNumber: 0,
    lessonTitle: "Linear Equations and Graphing",
    references: [
      {
        bookId: "SRM",
        bookTitle: "Surveyor Reference Manual",
        bookAuthor: "George M. Cole",
        edition: "7th Edition",
        chapter: 9,
        chapterTitle: "Rectangular Coordinate System",
        topics: ["Coordinates", "Graphing"]
      },
      {
        bookId: "SRM",
        bookTitle: "Surveyor Reference Manual",
        bookAuthor: "George M. Cole",
        edition: "7th Edition",
        chapter: 10,
        chapterTitle: "Analytical Geometry",
        topics: ["Linear equations", "Slope-intercept form", "Line equations"]
      }
    ]
  },
  {
    lessonId: "d0-lesson-09",
    domainNumber: 0,
    lessonTitle: "Scientific Calculator Operations",
    references: [
      {
        bookId: "SRM",
        bookTitle: "Surveyor Reference Manual",
        bookAuthor: "George M. Cole",
        edition: "7th Edition",
        chapter: 8,
        chapterTitle: "Trigonometry",
        topics: ["Calculator functions", "Trig functions"]
      }
    ]
  },
  {
    lessonId: "d0-lesson-10",
    domainNumber: 0,
    lessonTitle: "Significant Figures and Rounding",
    references: [
      {
        bookId: "SRM",
        bookTitle: "Surveyor Reference Manual",
        bookAuthor: "George M. Cole",
        edition: "7th Edition",
        chapter: 11,
        chapterTitle: "Statistics of Measurements",
        topics: ["Significant figures", "Rounding", "Precision", "Accuracy"]
      }
    ]
  },

  // ========== DOMAIN 1: Surveying Processes and Methods ==========
  {
    lessonId: "d1-lesson-01",
    domainNumber: 1,
    lessonTitle: "Total Station Setup and Operation",
    references: [
      {
        bookId: "SRM",
        bookTitle: "Surveyor Reference Manual",
        bookAuthor: "George M. Cole",
        edition: "7th Edition",
        chapter: 14,
        chapterTitle: "Electronic Distance Measurement",
        topics: ["Total stations", "EDM", "Setup procedures"]
      }
    ]
  },
  {
    lessonId: "d1-lesson-02",
    domainNumber: 1,
    lessonTitle: "Differential Leveling Procedures",
    references: [
      {
        bookId: "SRM",
        bookTitle: "Surveyor Reference Manual",
        bookAuthor: "George M. Cole",
        edition: "7th Edition",
        chapter: 15,
        chapterTitle: "Leveling",
        topics: ["Differential leveling", "Benchmarks", "HI method", "Turning points"]
      }
    ]
  },
  {
    lessonId: "d1-lesson-03",
    domainNumber: 1,
    lessonTitle: "GPS/GNSS Fundamentals",
    references: [
      {
        bookId: "SRM",
        bookTitle: "Surveyor Reference Manual",
        bookAuthor: "George M. Cole",
        edition: "7th Edition",
        chapter: 22,
        chapterTitle: "Global Positioning System",
        topics: ["GPS", "GNSS", "Satellite positioning"]
      }
    ]
  },
  {
    lessonId: "d1-lesson-04",
    domainNumber: 1,
    lessonTitle: "Distance Measurement Methods",
    references: [
      {
        bookId: "SRM",
        bookTitle: "Surveyor Reference Manual",
        bookAuthor: "George M. Cole",
        edition: "7th Edition",
        chapter: 13,
        chapterTitle: "Taping",
        topics: ["Tape measurements", "Corrections"]
      },
      {
        bookId: "SRM",
        bookTitle: "Surveyor Reference Manual",
        bookAuthor: "George M. Cole",
        edition: "7th Edition",
        chapter: 14,
        chapterTitle: "Electronic Distance Measurement",
        topics: ["EDM", "Electronic measurement"]
      }
    ]
  },
  {
    lessonId: "d1-lesson-05",
    domainNumber: 1,
    lessonTitle: "Angle Measurement Techniques",
    references: [
      {
        bookId: "SRM",
        bookTitle: "Surveyor Reference Manual",
        bookAuthor: "George M. Cole",
        edition: "7th Edition",
        chapter: 16,
        chapterTitle: "Compass Survey",
        topics: ["Angle measurement", "Bearings", "Azimuths"]
      }
    ]
  },
  {
    lessonId: "d1-lesson-06",
    domainNumber: 1,
    lessonTitle: "Field Notes and Documentation",
    references: [
      {
        bookId: "SRM",
        bookTitle: "Surveyor Reference Manual",
        bookAuthor: "George M. Cole",
        edition: "7th Edition",
        chapter: 17,
        chapterTitle: "Traverses",
        topics: ["Field notes", "Documentation", "Data recording"]
      }
    ]
  },
  {
    lessonId: "d1-lesson-07",
    domainNumber: 1,
    lessonTitle: "Error Sources and Corrections",
    references: [
      {
        bookId: "SRM",
        bookTitle: "Surveyor Reference Manual",
        bookAuthor: "George M. Cole",
        edition: "7th Edition",
        chapter: 11,
        chapterTitle: "Statistics of Measurements",
        topics: ["Error analysis", "Systematic errors", "Random errors"]
      },
      {
        bookId: "SRM",
        bookTitle: "Surveyor Reference Manual",
        bookAuthor: "George M. Cole",
        edition: "7th Edition",
        chapter: 13,
        chapterTitle: "Taping",
        topics: ["Tape corrections", "Temperature", "Sag", "Tension"]
      }
    ]
  },

  // ========== DOMAIN 2: Mapping Processes and Methods ==========
  {
    lessonId: "d2-lesson-01",
    domainNumber: 2,
    lessonTitle: "Topographic Map Reading",
    references: [
      {
        bookId: "SRM",
        bookTitle: "Surveyor Reference Manual",
        bookAuthor: "George M. Cole",
        edition: "7th Edition",
        chapter: 34,
        chapterTitle: "Topographic Surveying and Mapping",
        topics: ["Contours", "Map symbols", "Map reading"]
      }
    ]
  },
  {
    lessonId: "d2-lesson-02",
    domainNumber: 2,
    lessonTitle: "Contour Lines and Elevation",
    references: [
      {
        bookId: "SRM",
        bookTitle: "Surveyor Reference Manual",
        bookAuthor: "George M. Cole",
        edition: "7th Edition",
        chapter: 34,
        chapterTitle: "Topographic Surveying and Mapping",
        topics: ["Contour lines", "Contour intervals", "Interpolation"]
      }
    ]
  },
  {
    lessonId: "d2-lesson-03",
    domainNumber: 2,
    lessonTitle: "CAD and Digital Mapping",
    references: [
      {
        bookId: "SRM",
        bookTitle: "Surveyor Reference Manual",
        bookAuthor: "George M. Cole",
        edition: "7th Edition",
        chapter: 35,
        chapterTitle: "Geographic Information Systems",
        topics: ["CAD", "Digital mapping", "Data layers"]
      }
    ]
  },
  {
    lessonId: "d2-lesson-04",
    domainNumber: 2,
    lessonTitle: "GIS Fundamentals",
    references: [
      {
        bookId: "SRM",
        bookTitle: "Surveyor Reference Manual",
        bookAuthor: "George M. Cole",
        edition: "7th Edition",
        chapter: 35,
        chapterTitle: "Geographic Information Systems",
        topics: ["GIS concepts", "Spatial data", "Analysis"]
      }
    ]
  },
  {
    lessonId: "d2-lesson-05",
    domainNumber: 2,
    lessonTitle: "Map Scales and Coordinate Systems",
    references: [
      {
        bookId: "SRM",
        bookTitle: "Surveyor Reference Manual",
        bookAuthor: "George M. Cole",
        edition: "7th Edition",
        chapter: 23,
        chapterTitle: "Map Projections and Plane Coordinate Systems",
        topics: ["Map scales", "State plane coordinates", "Projections"]
      }
    ]
  },
  {
    lessonId: "d2-lesson-06",
    domainNumber: 2,
    lessonTitle: "Aerial and Photogrammetry Basics",
    references: [
      {
        bookId: "SRM",
        bookTitle: "Surveyor Reference Manual",
        bookAuthor: "George M. Cole",
        edition: "7th Edition",
        chapter: 36,
        chapterTitle: "Aerial Mapping",
        topics: ["Photogrammetry", "Aerial photography", "Orthophotos"]
      }
    ]
  },
  {
    lessonId: "d2-lesson-07",
    domainNumber: 2,
    lessonTitle: "LiDAR and Remote Sensing",
    references: [
      {
        bookId: "SRM",
        bookTitle: "Surveyor Reference Manual",
        bookAuthor: "George M. Cole",
        edition: "7th Edition",
        chapter: 37,
        chapterTitle: "Laser Scanning",
        topics: ["LiDAR", "Point clouds", "3D scanning"]
      }
    ]
  },

  // ========== DOMAIN 3: Boundary Law and Real Property Principles ==========
  {
    lessonId: "d3-lesson-01",
    domainNumber: 3,
    lessonTitle: "Property Ownership Basics",
    references: [
      {
        bookId: "SRM",
        bookTitle: "Surveyor Reference Manual",
        bookAuthor: "George M. Cole",
        edition: "7th Edition",
        chapter: 24,
        chapterTitle: "History and Origins of Title",
        topics: ["Property ownership", "Title history"]
      },
      {
        bookId: "SRM",
        bookTitle: "Surveyor Reference Manual",
        bookAuthor: "George M. Cole",
        edition: "7th Edition",
        chapter: 25,
        chapterTitle: "Transfer of Ownership",
        topics: ["Deeds", "Conveyances"]
      }
    ]
  },
  {
    lessonId: "d3-lesson-02",
    domainNumber: 3,
    lessonTitle: "Metes and Bounds Descriptions",
    references: [
      {
        bookId: "SRM",
        bookTitle: "Surveyor Reference Manual",
        bookAuthor: "George M. Cole",
        edition: "7th Edition",
        chapter: 30,
        chapterTitle: "Land Descriptions",
        topics: ["Metes and bounds", "Bearings", "Distances", "Calls"]
      }
    ]
  },
  {
    lessonId: "d3-lesson-03",
    domainNumber: 3,
    lessonTitle: "Public Land Survey System (PLSS)",
    references: [
      {
        bookId: "SRM",
        bookTitle: "Surveyor Reference Manual",
        bookAuthor: "George M. Cole",
        edition: "7th Edition",
        chapter: 28,
        chapterTitle: "Public Land Survey System",
        topics: ["PLSS", "Townships", "Ranges", "Sections"]
      },
      {
        bookId: "SRM",
        bookTitle: "Surveyor Reference Manual",
        bookAuthor: "George M. Cole",
        edition: "7th Edition",
        chapter: 29,
        chapterTitle: "Restoration of Public Land Survey Corners",
        topics: ["Corner restoration", "Monument recovery"]
      }
    ]
  },
  {
    lessonId: "d3-lesson-04",
    domainNumber: 3,
    lessonTitle: "Easements and Rights-of-Way",
    references: [
      {
        bookId: "SRM",
        bookTitle: "Surveyor Reference Manual",
        bookAuthor: "George M. Cole",
        edition: "7th Edition",
        chapter: 25,
        chapterTitle: "Transfer of Ownership",
        topics: ["Easements", "Rights-of-way", "Encumbrances"]
      }
    ]
  },
  {
    lessonId: "d3-lesson-05",
    domainNumber: 3,
    lessonTitle: "Water Rights and Boundaries",
    references: [
      {
        bookId: "SRM",
        bookTitle: "Surveyor Reference Manual",
        bookAuthor: "George M. Cole",
        edition: "7th Edition",
        chapter: 26,
        chapterTitle: "Water Boundaries",
        topics: ["Water boundaries", "Accretion", "Avulsion"]
      },
      {
        bookId: "SRM",
        bookTitle: "Surveyor Reference Manual",
        bookAuthor: "George M. Cole",
        edition: "7th Edition",
        chapter: 27,
        chapterTitle: "Riparian and Littoral Rights",
        topics: ["Riparian rights", "Littoral rights"]
      }
    ]
  },
  {
    lessonId: "d3-lesson-06",
    domainNumber: 3,
    lessonTitle: "Adverse Possession and Boundaries",
    references: [
      {
        bookId: "SRM",
        bookTitle: "Surveyor Reference Manual",
        bookAuthor: "George M. Cole",
        edition: "7th Edition",
        chapter: 24,
        chapterTitle: "History and Origins of Title",
        topics: ["Adverse possession", "Prescriptive rights"]
      }
    ]
  },
  {
    lessonId: "d3-lesson-07",
    domainNumber: 3,
    lessonTitle: "Deed Interpretation",
    references: [
      {
        bookId: "SRM",
        bookTitle: "Surveyor Reference Manual",
        bookAuthor: "George M. Cole",
        edition: "7th Edition",
        chapter: 30,
        chapterTitle: "Land Descriptions",
        topics: ["Deed interpretation", "Legal descriptions"]
      },
      {
        bookId: "SRM",
        bookTitle: "Surveyor Reference Manual",
        bookAuthor: "George M. Cole",
        edition: "7th Edition",
        chapter: 32,
        chapterTitle: "Subdivisions",
        topics: ["Subdivision plats", "Lot descriptions", "Block layouts"]
      }
    ]
  },

  // ========== DOMAIN 4: Surveying Principles ==========
  {
    lessonId: "d4-lesson-01",
    domainNumber: 4,
    lessonTitle: "Types of Surveys",
    references: [
      {
        bookId: "SRM",
        bookTitle: "Surveyor Reference Manual",
        bookAuthor: "George M. Cole",
        edition: "7th Edition",
        chapter: 17,
        chapterTitle: "Traverses",
        topics: ["Survey types", "Control surveys", "Boundary surveys"]
      }
    ]
  },
  {
    lessonId: "d4-lesson-02",
    domainNumber: 4,
    lessonTitle: "Horizontal Control Methods",
    references: [
      {
        bookId: "SRM",
        bookTitle: "Surveyor Reference Manual",
        bookAuthor: "George M. Cole",
        edition: "7th Edition",
        chapter: 17,
        chapterTitle: "Traverses",
        topics: ["Horizontal control", "Traverse networks"]
      },
      {
        bookId: "SRM",
        bookTitle: "Surveyor Reference Manual",
        bookAuthor: "George M. Cole",
        edition: "7th Edition",
        chapter: 18,
        chapterTitle: "Traverse Adjustment",
        topics: ["Adjustment methods", "Compass rule", "Transit rule"]
      }
    ]
  },
  {
    lessonId: "d4-lesson-03",
    domainNumber: 4,
    lessonTitle: "Vertical Control and Benchmarks",
    references: [
      {
        bookId: "SRM",
        bookTitle: "Surveyor Reference Manual",
        bookAuthor: "George M. Cole",
        edition: "7th Edition",
        chapter: 15,
        chapterTitle: "Leveling",
        topics: ["Vertical control", "Benchmarks", "Datum"]
      }
    ]
  },
  {
    lessonId: "d4-lesson-04",
    domainNumber: 4,
    lessonTitle: "Traverse Basics",
    references: [
      {
        bookId: "SRM",
        bookTitle: "Surveyor Reference Manual",
        bookAuthor: "George M. Cole",
        edition: "7th Edition",
        chapter: 17,
        chapterTitle: "Traverses",
        topics: ["Open traverse", "Closed traverse", "Loop traverse"]
      }
    ]
  },
  {
    lessonId: "d4-lesson-05",
    domainNumber: 4,
    lessonTitle: "Bearing and Azimuth Systems",
    references: [
      {
        bookId: "SRM",
        bookTitle: "Surveyor Reference Manual",
        bookAuthor: "George M. Cole",
        edition: "7th Edition",
        chapter: 16,
        chapterTitle: "Compass Survey",
        topics: ["Bearings", "Azimuths", "Direction systems"]
      }
    ]
  },
  {
    lessonId: "d4-lesson-06",
    domainNumber: 4,
    lessonTitle: "Precision and Accuracy",
    references: [
      {
        bookId: "SRM",
        bookTitle: "Surveyor Reference Manual",
        bookAuthor: "George M. Cole",
        edition: "7th Edition",
        chapter: 11,
        chapterTitle: "Statistics of Measurements",
        topics: ["Precision", "Accuracy", "Error propagation"]
      },
      {
        bookId: "SRM",
        bookTitle: "Surveyor Reference Manual",
        bookAuthor: "George M. Cole",
        edition: "7th Edition",
        chapter: 41,
        chapterTitle: "Accuracy Standards",
        topics: ["Standards", "Classifications"]
      }
    ]
  },
  {
    lessonId: "d4-lesson-07",
    domainNumber: 4,
    lessonTitle: "Coordinate Geometry Fundamentals",
    references: [
      {
        bookId: "SRM",
        bookTitle: "Surveyor Reference Manual",
        bookAuthor: "George M. Cole",
        edition: "7th Edition",
        chapter: 9,
        chapterTitle: "Rectangular Coordinate System",
        topics: ["Coordinate systems", "Cartesian coordinates"]
      },
      {
        bookId: "SRM",
        bookTitle: "Surveyor Reference Manual",
        bookAuthor: "George M. Cole",
        edition: "7th Edition",
        chapter: 10,
        chapterTitle: "Analytical Geometry",
        topics: ["COGO", "Coordinate geometry"]
      }
    ]
  },

  // ========== DOMAIN 5: Survey Computations and Computer Applications ==========
  {
    lessonId: "d5-lesson-01",
    domainNumber: 5,
    lessonTitle: "Traverse Computations",
    references: [
      {
        bookId: "SRM",
        bookTitle: "Surveyor Reference Manual",
        bookAuthor: "George M. Cole",
        edition: "7th Edition",
        chapter: 17,
        chapterTitle: "Traverses",
        topics: ["Latitudes", "Departures", "Closure"]
      },
      {
        bookId: "SRM",
        bookTitle: "Surveyor Reference Manual",
        bookAuthor: "George M. Cole",
        edition: "7th Edition",
        chapter: 18,
        chapterTitle: "Traverse Adjustment",
        topics: ["Adjustment calculations", "Error distribution"]
      }
    ]
  },
  {
    lessonId: "d5-lesson-02",
    domainNumber: 5,
    lessonTitle: "Area Calculations",
    references: [
      {
        bookId: "SRM",
        bookTitle: "Surveyor Reference Manual",
        bookAuthor: "George M. Cole",
        edition: "7th Edition",
        chapter: 6,
        chapterTitle: "Area",
        topics: ["Area formulas", "Coordinate method"]
      },
      {
        bookId: "SRM",
        bookTitle: "Surveyor Reference Manual",
        bookAuthor: "George M. Cole",
        edition: "7th Edition",
        chapter: 19,
        chapterTitle: "Partitioning of Land",
        topics: ["Area computations", "Land division"]
      }
    ]
  },
  {
    lessonId: "d5-lesson-03",
    domainNumber: 5,
    lessonTitle: "Horizontal Curve Calculations",
    references: [
      {
        bookId: "SRM",
        bookTitle: "Surveyor Reference Manual",
        bookAuthor: "George M. Cole",
        edition: "7th Edition",
        chapter: 20,
        chapterTitle: "Horizontal Curves",
        topics: ["Circular curves", "Curve elements", "Staking"]
      }
    ]
  },
  {
    lessonId: "d5-lesson-04",
    domainNumber: 5,
    lessonTitle: "Vertical Curve Calculations",
    references: [
      {
        bookId: "SRM",
        bookTitle: "Surveyor Reference Manual",
        bookAuthor: "George M. Cole",
        edition: "7th Edition",
        chapter: 21,
        chapterTitle: "Vertical Alignment",
        topics: ["Vertical curves", "Grade calculations", "High/low points"]
      }
    ]
  },
  {
    lessonId: "d5-lesson-05",
    domainNumber: 5,
    lessonTitle: "Earthwork Volume Calculations",
    references: [
      {
        bookId: "SRM",
        bookTitle: "Surveyor Reference Manual",
        bookAuthor: "George M. Cole",
        edition: "7th Edition",
        chapter: 7,
        chapterTitle: "Volume",
        topics: ["Volume formulas"]
      },
      {
        bookId: "SRM",
        bookTitle: "Surveyor Reference Manual",
        bookAuthor: "George M. Cole",
        edition: "7th Edition",
        chapter: 39,
        chapterTitle: "Earthwork",
        topics: ["Cut and fill", "Mass diagrams", "Earthwork volumes"]
      }
    ]
  },
  {
    lessonId: "d5-lesson-06",
    domainNumber: 5,
    lessonTitle: "Coordinate Transformations",
    references: [
      {
        bookId: "SRM",
        bookTitle: "Surveyor Reference Manual",
        bookAuthor: "George M. Cole",
        edition: "7th Edition",
        chapter: 10,
        chapterTitle: "Analytical Geometry",
        topics: ["Coordinate transformations", "Rotations", "Translations"]
      },
      {
        bookId: "SRM",
        bookTitle: "Surveyor Reference Manual",
        bookAuthor: "George M. Cole",
        edition: "7th Edition",
        chapter: 23,
        chapterTitle: "Map Projections and Plane Coordinate Systems",
        topics: ["Grid to ground", "Scale factors"]
      }
    ]
  },
  {
    lessonId: "d5-lesson-07",
    domainNumber: 5,
    lessonTitle: "Least Squares Adjustment Basics",
    references: [
      {
        bookId: "SRM",
        bookTitle: "Surveyor Reference Manual",
        bookAuthor: "George M. Cole",
        edition: "7th Edition",
        chapter: 11,
        chapterTitle: "Statistics of Measurements",
        topics: ["Least squares", "Adjustment theory"]
      },
      {
        bookId: "SRM",
        bookTitle: "Surveyor Reference Manual",
        bookAuthor: "George M. Cole",
        edition: "7th Edition",
        chapter: 18,
        chapterTitle: "Traverse Adjustment",
        topics: ["Adjustment methods"]
      }
    ]
  },
  {
    lessonId: "d5-lesson-08",
    domainNumber: 5,
    lessonTitle: "Least Squares Adjustment Concepts",
    references: [
      {
        bookId: "SRM",
        bookTitle: "Surveyor Reference Manual",
        bookAuthor: "George M. Cole",
        edition: "7th Edition",
        chapter: 11,
        chapterTitle: "Statistics of Measurements",
        topics: ["Least squares principles", "Weighted observations", "Residuals"]
      },
      {
        bookId: "SRM",
        bookTitle: "Surveyor Reference Manual",
        bookAuthor: "George M. Cole",
        edition: "7th Edition",
        chapter: 17,
        chapterTitle: "Traverses",
        topics: ["Traverse adjustment", "Angular closure"]
      }
    ]
  },
  {
    lessonId: "d5-lesson-09",
    domainNumber: 5,
    lessonTitle: "Spreadsheet Applications in Surveying",
    references: [
      {
        bookId: "SRM",
        bookTitle: "Surveyor Reference Manual",
        bookAuthor: "George M. Cole",
        edition: "7th Edition",
        chapter: 41,
        chapterTitle: "Accuracy Standards",
        topics: ["Data processing", "Computational tools", "Quality verification"]
      }
    ]
  },
  {
    lessonId: "d5-lesson-10",
    domainNumber: 5,
    lessonTitle: "Survey Data Collectors and Processing",
    references: [
      {
        bookId: "SRM",
        bookTitle: "Surveyor Reference Manual",
        bookAuthor: "George M. Cole",
        edition: "7th Edition",
        chapter: 41,
        chapterTitle: "Accuracy Standards",
        topics: ["Data collection", "Field-to-finish", "Processing workflows"]
      }
    ]
  },
  {
    lessonId: "d5-lesson-11",
    domainNumber: 5,
    lessonTitle: "Error Propagation in Computations",
    references: [
      {
        bookId: "SRM",
        bookTitle: "Surveyor Reference Manual",
        bookAuthor: "George M. Cole",
        edition: "7th Edition",
        chapter: 11,
        chapterTitle: "Statistics of Measurements",
        topics: ["Error propagation", "Combined uncertainties", "Precision analysis"]
      }
    ]
  },
  {
    lessonId: "d5-lesson-12",
    domainNumber: 5,
    lessonTitle: "Programming and Automation",
    references: [
      {
        bookId: "SRM",
        bookTitle: "Surveyor Reference Manual",
        bookAuthor: "George M. Cole",
        edition: "7th Edition",
        chapter: 41,
        chapterTitle: "Accuracy Standards",
        topics: ["Automation", "Scripting", "Quality control processes"]
      }
    ]
  },

  // ========== DOMAIN 6: Business Concepts ==========
  {
    lessonId: "d6-lesson-01",
    domainNumber: 6,
    lessonTitle: "Professional Ethics and Standards",
    references: [
      {
        bookId: "SRM",
        bookTitle: "Surveyor Reference Manual",
        bookAuthor: "George M. Cole",
        edition: "7th Edition",
        chapter: 44,
        chapterTitle: "Ethics for Surveyors",
        topics: ["Professional ethics", "Standards of practice"]
      }
    ]
  },
  {
    lessonId: "d6-lesson-02",
    domainNumber: 6,
    lessonTitle: "Project Cost Estimation",
    references: [
      {
        bookId: "SRM",
        bookTitle: "Surveyor Reference Manual",
        bookAuthor: "George M. Cole",
        edition: "7th Edition",
        chapter: 42,
        chapterTitle: "Job Costing",
        topics: ["Cost estimation", "Budgeting", "Billing"]
      }
    ]
  },
  {
    lessonId: "d6-lesson-03",
    domainNumber: 6,
    lessonTitle: "Contract Documents and Specifications",
    references: [
      {
        bookId: "SRM",
        bookTitle: "Surveyor Reference Manual",
        bookAuthor: "George M. Cole",
        edition: "7th Edition",
        chapter: 38,
        chapterTitle: "Construction Staking",
        topics: ["Plans", "Specifications", "Contracts"]
      },
      {
        bookId: "SRM",
        bookTitle: "Surveyor Reference Manual",
        bookAuthor: "George M. Cole",
        edition: "7th Edition",
        chapter: 33,
        chapterTitle: "Residential Planning",
        topics: ["Development planning", "Site layouts", "Project specifications"]
      }
    ]
  },
  {
    lessonId: "d6-lesson-04",
    domainNumber: 6,
    lessonTitle: "Quality Control and Documentation",
    references: [
      {
        bookId: "SRM",
        bookTitle: "Surveyor Reference Manual",
        bookAuthor: "George M. Cole",
        edition: "7th Edition",
        chapter: 41,
        chapterTitle: "Accuracy Standards",
        topics: ["Quality control", "Standards compliance"]
      }
    ]
  },
  {
    lessonId: "d6-lesson-05",
    domainNumber: 6,
    lessonTitle: "Licensure and Legal Responsibilities",
    references: [
      {
        bookId: "SRM",
        bookTitle: "Surveyor Reference Manual",
        bookAuthor: "George M. Cole",
        edition: "7th Edition",
        chapter: 44,
        chapterTitle: "Ethics for Surveyors",
        topics: ["Licensure", "Legal liability", "Professional responsibility"]
      }
    ]
  },
  {
    lessonId: "d6-lesson-06",
    domainNumber: 6,
    lessonTitle: "Risk Management",
    references: [
      {
        bookId: "SRM",
        bookTitle: "Surveyor Reference Manual",
        bookAuthor: "George M. Cole",
        edition: "7th Edition",
        chapter: 43,
        chapterTitle: "Economic Analysis",
        topics: ["Risk assessment", "Insurance", "Liability"]
      }
    ]
  },

  // ========== DOMAIN 7: Applied Mathematics and Statistics ==========
  {
    lessonId: "d7-lesson-01",
    domainNumber: 7,
    lessonTitle: "Trigonometric Functions",
    references: [
      {
        bookId: "SRM",
        bookTitle: "Surveyor Reference Manual",
        bookAuthor: "George M. Cole",
        edition: "7th Edition",
        chapter: 8,
        chapterTitle: "Trigonometry",
        topics: ["Sine", "Cosine", "Tangent", "Inverse functions"]
      }
    ]
  },
  {
    lessonId: "d7-lesson-02",
    domainNumber: 7,
    lessonTitle: "Law of Sines and Cosines",
    references: [
      {
        bookId: "SRM",
        bookTitle: "Surveyor Reference Manual",
        bookAuthor: "George M. Cole",
        edition: "7th Edition",
        chapter: 8,
        chapterTitle: "Trigonometry",
        topics: ["Law of sines", "Law of cosines", "Oblique triangles"]
      }
    ]
  },
  {
    lessonId: "d7-lesson-03",
    domainNumber: 7,
    lessonTitle: "Statistical Measures",
    references: [
      {
        bookId: "SRM",
        bookTitle: "Surveyor Reference Manual",
        bookAuthor: "George M. Cole",
        edition: "7th Edition",
        chapter: 11,
        chapterTitle: "Statistics of Measurements",
        topics: ["Mean", "Standard deviation", "Variance"]
      }
    ]
  },
  {
    lessonId: "d7-lesson-04",
    domainNumber: 7,
    lessonTitle: "Error Propagation",
    references: [
      {
        bookId: "SRM",
        bookTitle: "Surveyor Reference Manual",
        bookAuthor: "George M. Cole",
        edition: "7th Edition",
        chapter: 11,
        chapterTitle: "Statistics of Measurements",
        topics: ["Error propagation", "Combined errors", "Uncertainty"]
      }
    ]
  },
  {
    lessonId: "d7-lesson-05",
    domainNumber: 7,
    lessonTitle: "Probability Concepts",
    references: [
      {
        bookId: "SRM",
        bookTitle: "Surveyor Reference Manual",
        bookAuthor: "George M. Cole",
        edition: "7th Edition",
        chapter: 11,
        chapterTitle: "Statistics of Measurements",
        topics: ["Probability", "Normal distribution", "Confidence intervals"]
      }
    ]
  },
  {
    lessonId: "d7-lesson-06",
    domainNumber: 7,
    lessonTitle: "Matrix Operations",
    references: [
      {
        bookId: "SRM",
        bookTitle: "Surveyor Reference Manual",
        bookAuthor: "George M. Cole",
        edition: "7th Edition",
        chapter: 1,
        chapterTitle: "Algebra",
        topics: ["Matrices", "Matrix operations"]
      },
      {
        bookId: "SRM",
        bookTitle: "Surveyor Reference Manual",
        bookAuthor: "George M. Cole",
        edition: "7th Edition",
        chapter: 12,
        chapterTitle: "Introduction to Calculus",
        topics: ["Advanced mathematics"]
      }
    ]
  },
  {
    lessonId: "d7-lesson-07",
    domainNumber: 7,
    lessonTitle: "Differential Calculus Basics",
    references: [
      {
        bookId: "SRM",
        bookTitle: "Surveyor Reference Manual",
        bookAuthor: "George M. Cole",
        edition: "7th Edition",
        chapter: 12,
        chapterTitle: "Introduction to Calculus",
        topics: ["Derivatives", "Rates of change", "Slopes"]
      }
    ]
  },
  {
    lessonId: "d7-lesson-08",
    domainNumber: 7,
    lessonTitle: "Integral Calculus Basics",
    references: [
      {
        bookId: "SRM",
        bookTitle: "Surveyor Reference Manual",
        bookAuthor: "George M. Cole",
        edition: "7th Edition",
        chapter: 12,
        chapterTitle: "Introduction to Calculus",
        topics: ["Integrals", "Areas under curves", "Applications"]
      }
    ]
  },
  {
    lessonId: "d7-lesson-09",
    domainNumber: 7,
    lessonTitle: "Regression Analysis",
    references: [
      {
        bookId: "SRM",
        bookTitle: "Surveyor Reference Manual",
        bookAuthor: "George M. Cole",
        edition: "7th Edition",
        chapter: 11,
        chapterTitle: "Statistics of Measurements",
        topics: ["Linear regression", "Curve fitting", "Correlation"]
      }
    ]
  },
  {
    lessonId: "d7-lesson-10",
    domainNumber: 7,
    lessonTitle: "Advanced Coordinate Geometry",
    references: [
      {
        bookId: "SRM",
        bookTitle: "Surveyor Reference Manual",
        bookAuthor: "George M. Cole",
        edition: "7th Edition",
        chapter: 10,
        chapterTitle: "Analytical Geometry",
        topics: ["Conic sections", "Transformations", "Advanced COGO"]
      }
    ]
  },
  {
    lessonId: "d7-lesson-11",
    domainNumber: 7,
    lessonTitle: "Regression and Correlation",
    references: [
      {
        bookId: "SRM",
        bookTitle: "Surveyor Reference Manual",
        bookAuthor: "George M. Cole",
        edition: "7th Edition",
        chapter: 11,
        chapterTitle: "Statistics of Measurements",
        topics: ["Regression analysis", "Correlation coefficients", "Curve fitting"]
      }
    ]
  },
  {
    lessonId: "d7-lesson-12",
    domainNumber: 7,
    lessonTitle: "Numerical Methods and Interpolation",
    references: [
      {
        bookId: "SRM",
        bookTitle: "Surveyor Reference Manual",
        bookAuthor: "George M. Cole",
        edition: "7th Edition",
        chapter: 12,
        chapterTitle: "Introduction to Calculus",
        topics: ["Interpolation", "Numerical integration", "Iterative methods"]
      }
    ]
  }
];

// Helper functions
export function getLessonReferences(lessonId: string): BookReference[] {
  const mapping = LESSON_MAPPINGS.find(m => m.lessonId === lessonId);
  return mapping?.references || [];
}

export function getLessonsByChapter(bookId: string, chapter: number): LessonMapping[] {
  return LESSON_MAPPINGS.filter(m => 
    m.references.some(ref => ref.bookId === bookId && ref.chapter === chapter)
  );
}

export function getLessonsByDomain(domainNumber: number): LessonMapping[] {
  return LESSON_MAPPINGS.filter(m => m.domainNumber === domainNumber);
}

export function getBookChapters(bookId: string): { chapter: number; title: string; lessonCount: number }[] {
  const chaptersMap = new Map<number, { title: string; count: number }>();
  
  LESSON_MAPPINGS.forEach(mapping => {
    mapping.references.forEach(ref => {
      if (ref.bookId === bookId) {
        if (!chaptersMap.has(ref.chapter)) {
          chaptersMap.set(ref.chapter, { title: ref.chapterTitle, count: 0 });
        }
        chaptersMap.get(ref.chapter)!.count++;
      }
    });
  });
  
  return Array.from(chaptersMap.entries())
    .map(([chapter, data]) => ({
      chapter,
      title: data.title,
      lessonCount: data.count
    }))
    .sort((a, b) => a.chapter - b.chapter);
}
