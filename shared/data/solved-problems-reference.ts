export interface SolvedProblemsTopic {
  id: string;
  topicNumber: string;
  title: string;
  problemPages: string;
  solutionPages: string;
  nceesDomainsFS: number[];
  nceesDomainsPS: number[];
  description: string;
  keyTopics: string[];
}

export const solvedProblemsBook = {
  title: "Surveying Solved Problems",
  author: "Jan Van Sickle, PLS",
  publisher: "PPI (Professional Publications, Inc.)",
  edition: "5th Edition",
  isbn: "978-1591264538",
  description: "A comprehensive collection of solved surveying problems covering all major topics tested on the FS and PS exams. Each topic includes practice problems with detailed step-by-step solutions."
};

export const solvedProblemsTopics: SolvedProblemsTopic[] = [
  {
    id: "sp-topic-1",
    topicNumber: "I",
    title: "Surveying Mathematics",
    problemPages: "1-1",
    solutionPages: "1-25",
    nceesDomainsFS: [1],
    nceesDomainsPS: [1],
    description: "Fundamental mathematical concepts used in surveying calculations including trigonometry, geometry, and algebraic problem solving.",
    keyTopics: ["Trigonometry", "Geometry", "Unit conversions", "Coordinate calculations", "Angular measurements"]
  },
  {
    id: "sp-topic-2",
    topicNumber: "II",
    title: "Advanced Mathematics",
    problemPages: "2-1",
    solutionPages: "2-11",
    nceesDomainsFS: [1],
    nceesDomainsPS: [1],
    description: "Advanced mathematical applications including calculus concepts, statistics, and complex geometric calculations.",
    keyTopics: ["Calculus applications", "Statistics", "Error analysis", "Least squares", "Matrix operations"]
  },
  {
    id: "sp-topic-3",
    topicNumber: "III",
    title: "Land Boundary Law",
    problemPages: "3-1",
    solutionPages: "3-29",
    nceesDomainsFS: [4],
    nceesDomainsPS: [2],
    description: "Legal principles governing land boundaries, property rights, and the interpretation of deeds and legal documents.",
    keyTopics: ["Deed interpretation", "Priority of calls", "Riparian rights", "Adverse possession", "Easements", "Evidence hierarchy"]
  },
  {
    id: "sp-topic-4",
    topicNumber: "IV",
    title: "Surveying Astronomy",
    problemPages: "4-1",
    solutionPages: "4-14",
    nceesDomainsFS: [2],
    nceesDomainsPS: [1],
    description: "Astronomical observations for determining azimuth and position, including solar and stellar observations.",
    keyTopics: ["Solar observations", "Polaris observations", "Azimuth determination", "Time conversions", "Ephemeris data"]
  },
  {
    id: "sp-topic-5",
    topicNumber: "V",
    title: "Public Land Surveying System",
    problemPages: "5-1",
    solutionPages: "5-30",
    nceesDomainsFS: [4],
    nceesDomainsPS: [2],
    description: "The rectangular survey system used in the United States, including township/range/section descriptions and corner restoration procedures.",
    keyTopics: ["Township/Range/Section", "Corner restoration", "Proportionate measurement", "BLM Manual procedures", "Meander lines", "Subdivision of sections"]
  },
  {
    id: "sp-topic-6",
    topicNumber: "VI",
    title: "Surveying Instruments and Procedures",
    problemPages: "6-1",
    solutionPages: "6-20",
    nceesDomainsFS: [5],
    nceesDomainsPS: [1],
    description: "Field surveying instruments, their calibration, operation, and standard surveying procedures.",
    keyTopics: ["Total stations", "Levels", "EDM", "Instrument adjustments", "Field procedures", "Error sources"]
  },
  {
    id: "sp-topic-7",
    topicNumber: "VII",
    title: "Legal Descriptions",
    problemPages: "7-1",
    solutionPages: "7-13",
    nceesDomainsFS: [4],
    nceesDomainsPS: [2],
    description: "Writing and interpreting legal descriptions of property including metes and bounds, PLSS, and lot/block descriptions.",
    keyTopics: ["Metes and bounds", "PLSS descriptions", "Lot and block", "Description ambiguities", "Senior/junior rights"]
  },
  {
    id: "sp-topic-8",
    topicNumber: "VIII",
    title: "Photogrammetry",
    problemPages: "8-1",
    solutionPages: "8-13",
    nceesDomainsFS: [2],
    nceesDomainsPS: [1],
    description: "Aerial photography and photogrammetric mapping principles, including scale, relief displacement, and flight planning.",
    keyTopics: ["Photo scale", "Relief displacement", "Parallax", "Flight planning", "Orthophotos", "Stereo viewing"]
  },
  {
    id: "sp-topic-9",
    topicNumber: "IX",
    title: "Geodetic and Control Surveys",
    problemPages: "9-1",
    solutionPages: "9-17",
    nceesDomainsFS: [3],
    nceesDomainsPS: [3],
    description: "Geodetic concepts including datums, projections, and control survey procedures.",
    keyTopics: ["Geodetic datums", "Map projections", "State plane coordinates", "Geoid/ellipsoid", "Control networks", "NGS data sheets"]
  },
  {
    id: "sp-topic-10",
    topicNumber: "X",
    title: "Plats and Mapping",
    problemPages: "10-1",
    solutionPages: "10-9",
    nceesDomainsFS: [2],
    nceesDomainsPS: [1],
    description: "Survey plat preparation, mapping standards, and cartographic principles.",
    keyTopics: ["Plat requirements", "Map scales", "Contour mapping", "Drafting standards", "Recording requirements"]
  },
  {
    id: "sp-topic-11",
    topicNumber: "XI",
    title: "Global Positioning System (GPS)",
    problemPages: "11-1",
    solutionPages: "11-6",
    nceesDomainsFS: [5],
    nceesDomainsPS: [1],
    description: "GPS/GNSS surveying principles, equipment, and procedures for positioning.",
    keyTopics: ["GPS principles", "RTK surveying", "Static surveying", "GNSS errors", "Coordinate transformations", "OPUS"]
  },
  {
    id: "sp-topic-12",
    topicNumber: "XII",
    title: "Project Management",
    problemPages: "12-1",
    solutionPages: "12-11",
    nceesDomainsFS: [7],
    nceesDomainsPS: [1],
    description: "Survey project planning, cost estimation, scheduling, and management principles.",
    keyTopics: ["Project planning", "Cost estimation", "Scheduling", "Quality control", "Client relations", "Contract management"]
  },
  {
    id: "sp-topic-13",
    topicNumber: "XIII",
    title: "Hydrography",
    problemPages: "13-1",
    solutionPages: "13-8",
    nceesDomainsFS: [2],
    nceesDomainsPS: [1],
    description: "Hydrographic surveying for water body mapping, depth measurements, and tidal datums.",
    keyTopics: ["Bathymetric surveys", "Tidal datums", "Sounding methods", "Water boundaries", "Riparian/littoral rights"]
  },
  {
    id: "sp-topic-14",
    topicNumber: "XIV",
    title: "Geographic Information System (GIS)",
    problemPages: "14-1",
    solutionPages: "14-5",
    nceesDomainsFS: [6],
    nceesDomainsPS: [5],
    description: "GIS concepts, data structures, and applications in surveying and mapping.",
    keyTopics: ["Spatial data", "Vector/raster data", "Attribute tables", "Coordinate systems", "Data accuracy"]
  },
  {
    id: "sp-topic-15",
    topicNumber: "XV",
    title: "Written Communication",
    problemPages: "15-1",
    solutionPages: "15-5",
    nceesDomainsFS: [7],
    nceesDomainsPS: [1],
    description: "Technical writing and communication skills for surveying professionals.",
    keyTopics: ["Report writing", "Technical documentation", "Client communication", "Expert testimony"]
  },
  {
    id: "sp-topic-16",
    topicNumber: "XVI",
    title: "Computer Operations",
    problemPages: "16-1",
    solutionPages: "16-4",
    nceesDomainsFS: [6],
    nceesDomainsPS: [5],
    description: "Computer applications in surveying including CADD, data processing, and software tools.",
    keyTopics: ["CADD software", "Data processing", "File formats", "Software applications"]
  }
];

export function getTopicsByDomain(domain: number, examTrack: 'fs' | 'ps' = 'fs'): SolvedProblemsTopic[] {
  return solvedProblemsTopics.filter(topic => {
    const domains = examTrack === 'fs' ? topic.nceesDomainsFS : topic.nceesDomainsPS;
    return domains.includes(domain);
  });
}

export function getTopicById(id: string): SolvedProblemsTopic | undefined {
  return solvedProblemsTopics.find(topic => topic.id === id);
}
