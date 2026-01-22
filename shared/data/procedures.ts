export interface ProcedureStep {
  step: number;
  action: string;
  detail?: string;
}

export interface ExamTrap {
  fieldPractice: string;
  correctAnswer: string;
  explanation: string;
}

export interface Procedure {
  id: string;
  title: string;
  category: 'corner-restoration' | 'evidence-hierarchy' | 'traverse-leveling' | 'alta-standards' | 'legal-descriptions' | 'field-procedures' | 'office-procedures';
  examTrack: 'fs' | 'ps' | 'both';
  description: string;
  steps: ProcedureStep[];
  keyPoints: string[];
  examTrap?: ExamTrap;
  reference?: string;
}

export interface GlossaryTerm {
  term: string;
  definition: string;
  category: string;
  examTrack: 'fs' | 'ps' | 'both';
}

export const PROCEDURE_CATEGORIES = [
  { id: 'corner-restoration', name: 'Corner Restoration', icon: 'MapPin', description: 'Proper methods for restoring lost and obliterated corners per the Manual of Surveying Instructions' },
  { id: 'evidence-hierarchy', name: 'Evidence Hierarchy', icon: 'Scale', description: 'What evidence controls when there are conflicts in boundary determination' },
  { id: 'traverse-leveling', name: 'Traverse & Leveling', icon: 'Ruler', description: 'Correct adjustment methods and when to use each' },
  { id: 'alta-standards', name: 'ALTA/NSPS Standards', icon: 'FileCheck', description: 'Current standards, tolerances, and requirements' },
  { id: 'legal-descriptions', name: 'Legal Descriptions', icon: 'FileText', description: 'Interpretation rules, senior/junior rights, and common issues' },
  { id: 'field-procedures', name: 'Field Procedures', icon: 'Compass', description: 'Proper field methods as tested on the exam' },
  { id: 'office-procedures', name: 'Office Procedures', icon: 'Calculator', description: 'Computation and analysis methods' },
] as const;

export const PROCEDURES: Procedure[] = [
  {
    id: 'single-proportion',
    title: 'Single Proportionate Measurement',
    category: 'corner-restoration',
    examTrack: 'both',
    description: 'Used to restore a lost corner on a line between two existing corners. The position is determined by proportioning the record distance to the measured distance.',
    steps: [
      { step: 1, action: 'Identify the two nearest existing corners on the same line', detail: 'These must be original or properly restored corners' },
      { step: 2, action: 'Measure the distance between the existing corners', detail: 'Use appropriate methods for terrain and accuracy requirements' },
      { step: 3, action: 'Obtain the record distances from the original plat/notes', detail: 'Record distance from first corner to lost corner, and total record distance' },
      { step: 4, action: 'Calculate the proportion', detail: 'Ratio = Record distance to lost corner / Total record distance' },
      { step: 5, action: 'Apply proportion to measured distance', detail: 'New position = First corner + (Ratio × Measured distance)' },
      { step: 6, action: 'Set the corner monument at calculated position' },
    ],
    keyPoints: [
      'Used for corners on a straight line only',
      'Both existing corners must be on the same line as the lost corner',
      'Original monuments always control over record measurements',
      'Cannot be used for corners at intersection of two lines',
    ],
    examTrap: {
      fieldPractice: 'Many surveyors just measure from one corner using the record distance',
      correctAnswer: 'Must proportion between TWO existing corners using ratio of record to measured distance',
      explanation: 'Original surveys had errors. Single proportion distributes those errors evenly rather than accumulating them at one end.',
    },
    reference: 'Manual of Surveying Instructions 2009, Section 5-28',
  },
  {
    id: 'double-proportion',
    title: 'Double Proportionate Measurement',
    category: 'corner-restoration',
    examTrack: 'both',
    description: 'Used to restore a lost interior corner that lies at the intersection of two lines. First proportion north-south, then east-west, or determine a mean point.',
    steps: [
      { step: 1, action: 'Identify the four controlling corners', detail: 'North, South, East, and West of the lost corner on the cardinal lines' },
      { step: 2, action: 'Run lines between opposite pairs of corners', detail: 'Connect N-S corners and E-W corners' },
      { step: 3, action: 'Calculate single proportion on BOTH lines', detail: 'Apply single proportion method to each line independently' },
      { step: 4, action: 'Determine the intersection point', detail: 'Where proportioned N-S line crosses proportioned E-W line' },
      { step: 5, action: 'If lines do not intersect, calculate mean position', detail: 'Mean of the two closest points on each line' },
      { step: 6, action: 'Monument the restored corner' },
    ],
    keyPoints: [
      'Used only for interior corners (section corners, quarter corners at intersections)',
      'Requires four controlling corners in cardinal directions',
      'Each direction is proportioned independently',
      'Latitudinal (E-W) and longitudinal (N-S) controls work together',
      'Standard corners and closing corners have different rules',
    ],
    examTrap: {
      fieldPractice: 'Some surveyors proportion from just 2 corners or use just one direction',
      correctAnswer: 'Must proportion in BOTH cardinal directions using 4 controlling corners',
      explanation: 'Interior corners define the intersection of two lines. Both must be restored to find the true intersection.',
    },
    reference: 'Manual of Surveying Instructions 2009, Section 5-31',
  },
  {
    id: 'lost-vs-obliterated',
    title: 'Lost Corner vs. Obliterated Corner',
    category: 'corner-restoration',
    examTrack: 'both',
    description: 'Critical distinction: Obliterated corners can be restored from evidence. Lost corners require proportionate measurement. The method depends entirely on available evidence.',
    steps: [
      { step: 1, action: 'Search for the original monument', detail: 'Check for remains of stone, post, pipe, or other marker' },
      { step: 2, action: 'Search for accessories (bearing trees, pits, mounds)', detail: 'Check field notes for descriptions and distances' },
      { step: 3, action: 'Interview landowners and research records', detail: 'Look for fence corners, occupation lines, prior surveys' },
      { step: 4, action: 'If ANY evidence found → Obliterated', detail: 'Restore from the evidence, not proportion' },
      { step: 5, action: 'If NO evidence found → Lost', detail: 'Must use proportionate measurement methods' },
      { step: 6, action: 'Document thoroughly for either case' },
    ],
    keyPoints: [
      'OBLITERATED: Position can be determined from traces, evidence, or testimony',
      'LOST: Position cannot be determined from any evidence whatsoever',
      'Evidence of position controls over proportionate measurement',
      'A badly deteriorated monument is NOT lost if evidence remains',
      'Must exhaust search for evidence before declaring corner lost',
    ],
    examTrap: {
      fieldPractice: 'Declaring a corner "lost" because the monument is gone',
      correctAnswer: 'Corner is only lost if NO evidence of its position exists',
      explanation: 'A rotted wooden post with visible hole, bearing tree stump, or even reliable testimony makes the corner obliterated, not lost. Proportionate measurement is the last resort.',
    },
    reference: 'Manual of Surveying Instructions 2009, Section 5-20 through 5-23',
  },
  {
    id: 'evidence-hierarchy-general',
    title: 'Boundary Evidence Hierarchy',
    category: 'evidence-hierarchy',
    examTrack: 'both',
    description: 'When resolving boundary conflicts, evidence is weighted in a specific order. Understanding this hierarchy is essential for exam success.',
    steps: [
      { step: 1, action: 'Original monuments set by the original surveyor', detail: 'Highest priority - actual physical markers placed during original survey' },
      { step: 2, action: 'Natural monuments called for in the description', detail: 'Rivers, trees, rocks specifically mentioned in deed or plat' },
      { step: 3, action: 'Artificial monuments referenced', detail: 'Iron pipes, stones, stakes set by others and referenced' },
      { step: 4, action: 'Adjoining boundaries/adjoiners', detail: 'Boundaries of adjacent properties that are established' },
      { step: 5, action: 'Courses and distances', detail: 'Bearings and distances stated in the description' },
      { step: 6, action: 'Area/quantity', detail: 'Acreage is the least reliable and yields to all other elements' },
    ],
    keyPoints: [
      'Monuments control over courses and distances',
      'Natural monuments generally control over artificial ones',
      'Area is the LEAST controlling element',
      'The intent of the parties is the ultimate guide',
      'This hierarchy applies unless intent clearly indicates otherwise',
    ],
    examTrap: {
      fieldPractice: 'Computing boundary from courses and distances, ignoring found monuments',
      correctAnswer: 'Original monuments control over measurements - must honor found monuments even if they disagree with record distances',
      explanation: 'The original surveyor\'s monuments define the boundary that was actually conveyed. Record measurements may contain errors.',
    },
    reference: 'Brown\'s Boundary Control and Legal Principles, Chapter 2',
  },
  {
    id: 'senior-junior-rights',
    title: 'Senior and Junior Rights',
    category: 'legal-descriptions',
    examTrack: 'both',
    description: 'When overlapping claims exist, the first (senior) conveyance generally controls. Understanding the priority of rights is critical for boundary disputes.',
    steps: [
      { step: 1, action: 'Determine the chronological order of conveyances', detail: 'Which deed was recorded first?' },
      { step: 2, action: 'Identify the senior grant (first in time)', detail: 'This deed gets priority - "first in time, first in right"' },
      { step: 3, action: 'Locate the boundaries of the senior tract', detail: 'Using monuments, descriptions, and evidence' },
      { step: 4, action: 'The junior grant gets remainder after senior is satisfied', detail: 'Junior tract boundaries are limited by senior tract' },
      { step: 5, action: 'Area of overlap belongs to senior grantee', detail: 'Junior grantee cannot take from senior grant' },
    ],
    keyPoints: [
      'First recorded deed is typically senior (check jurisdiction)',
      'Senior grant is surveyed first and in full',
      'Junior grant boundaries defer to senior at overlaps',
      'Unwritten rights (adverse possession, prescriptive easements) can affect this',
      'Recording acts may modify priority in some states',
    ],
    examTrap: {
      fieldPractice: 'Treating all adjoining deeds as equal and splitting differences',
      correctAnswer: 'Senior rights control - locate senior tract first, junior tract gets what remains',
      explanation: 'The grantor can only convey what they own. After the senior grant, they no longer own the overlapping area.',
    },
    reference: 'Brown\'s Boundary Control, Chapter 11',
  },
  {
    id: 'compass-rule-adjustment',
    title: 'Compass Rule (Bowditch) Adjustment',
    category: 'traverse-leveling',
    examTrack: 'fs',
    description: 'The most common traverse adjustment method for the FS exam. Distributes error proportionally based on distance.',
    steps: [
      { step: 1, action: 'Calculate latitudes and departures for each course', detail: 'Lat = D×cos(Az), Dep = D×sin(Az)' },
      { step: 2, action: 'Sum latitudes and departures', detail: 'For closed traverse, sums should be zero' },
      { step: 3, action: 'Compute closure error', detail: 'Error in Lat = ΣLat, Error in Dep = ΣDep' },
      { step: 4, action: 'Calculate total traverse length', detail: 'Sum of all course distances' },
      { step: 5, action: 'Apply correction to each course', detail: 'Lat correction = -(ΣLat × course length / total length)' },
      { step: 6, action: 'Repeat for departures with same formula' },
    ],
    keyPoints: [
      'Assumes angular and distance measurements are equally reliable',
      'Most commonly used method in practice and on exams',
      'Correction proportional to LENGTH of each course',
      'Transit rule corrects based on lat/dep magnitude instead',
      'Use when angles and distances are measured with equal precision',
    ],
    examTrap: {
      fieldPractice: 'Applying equal corrections to all courses regardless of length',
      correctAnswer: 'Longer courses get proportionally larger corrections - based on their share of total traverse length',
      explanation: 'Errors accumulate with distance. A 500-foot course should absorb more correction than a 50-foot course.',
    },
    reference: 'Elementary Surveying, Chapter 10',
  },
  {
    id: 'differential-leveling',
    title: 'Differential Leveling Procedure',
    category: 'traverse-leveling',
    examTrack: 'fs',
    description: 'Proper procedure for running levels between benchmarks. The exam tests both procedure and computation.',
    steps: [
      { step: 1, action: 'Set up level at turning point location', detail: 'Equidistant from BS and FS points when possible' },
      { step: 2, action: 'Take backsight (BS) to known elevation point', detail: 'Read and record rod reading' },
      { step: 3, action: 'Calculate Height of Instrument (HI)', detail: 'HI = Known Elev + BS reading' },
      { step: 4, action: 'Take foresight (FS) to turning point or target', detail: 'Read and record rod reading' },
      { step: 5, action: 'Calculate new elevation', detail: 'New Elev = HI - FS reading' },
      { step: 6, action: 'Move to next setup and repeat', detail: 'Previous FS becomes new BS point' },
    ],
    keyPoints: [
      'BS is PLUS (adds to elevation for HI)',
      'FS is MINUS (subtracts from HI for elevation)',
      'Σ BS - Σ FS = Elevation change (should match known difference)',
      'Balance BS and FS distances to minimize curvature/refraction error',
      'Three-wire leveling provides check on each reading',
    ],
    examTrap: {
      fieldPractice: 'Adding or subtracting rod readings incorrectly based on whether going uphill or downhill',
      correctAnswer: 'BS is ALWAYS added to elevation. FS is ALWAYS subtracted from HI. The readings themselves reflect elevation differences.',
      explanation: 'The procedure never changes. Whether going up or down, BS readings will be smaller when going uphill (more rod visible) and FS readings will be larger.',
    },
    reference: 'Elementary Surveying, Chapter 4',
  },
  {
    id: 'alta-positional-tolerance',
    title: 'ALTA/NSPS Positional Tolerance',
    category: 'alta-standards',
    examTrack: 'both',
    description: 'Current ALTA/NSPS standards require relative positional precision be disclosed. Understanding the tolerance formula is tested on the PS exam.',
    steps: [
      { step: 1, action: 'Calculate Relative Positional Precision (RPP)', detail: 'RPP = 0.07 feet + 50 ppm' },
      { step: 2, action: 'For a given distance, compute allowable error', detail: 'Error = 0.07 + (distance in feet × 0.00005)' },
      { step: 3, action: 'At 1000 feet, RPP = 0.07 + 0.05 = 0.12 feet', detail: 'Maximum allowable positional uncertainty' },
      { step: 4, action: 'Report actual achieved precision if better', detail: 'Surveyor must meet OR exceed minimum' },
      { step: 5, action: 'Table A items are optional unless specifically requested', detail: 'Client negotiates which items apply' },
    ],
    keyPoints: [
      'Current standard: 2021 ALTA/NSPS Standards',
      'RPP = 0.07 ft + 50 ppm (parts per million of measured distance)',
      'This is RELATIVE precision (between any two points on survey)',
      'Table A items are negotiable additions to the base survey',
      'Must be performed by or under supervision of licensed surveyor',
    ],
    examTrap: {
      fieldPractice: 'Using old standards or fixed closure ratios like 1:10,000',
      correctAnswer: 'Current standard uses Relative Positional Precision formula: 0.07 ft + 50 ppm',
      explanation: 'The standard changed from closure ratios to RPP. For a 2000-foot perimeter, allowable RPP = 0.07 + 0.10 = 0.17 feet.',
    },
    reference: '2021 ALTA/NSPS Standards',
  },
  {
    id: 'riparian-boundaries',
    title: 'Riparian Boundary Rules',
    category: 'legal-descriptions',
    examTrack: 'both',
    description: 'Boundaries along water follow specific rules that differ from upland boundaries. Meander lines are NOT boundaries.',
    steps: [
      { step: 1, action: 'Identify the water body type', detail: 'Navigable vs non-navigable, tidal vs non-tidal' },
      { step: 2, action: 'Determine the boundary line', detail: 'Usually ordinary high water mark or thread of stream' },
      { step: 3, action: 'Meander lines are for area computation only', detail: 'They do NOT define the boundary' },
      { step: 4, action: 'Gradual changes (accretion/reliction) move boundary', detail: 'Owner gains or loses land gradually' },
      { step: 5, action: 'Sudden changes (avulsion) do NOT move boundary', detail: 'Original boundary location is maintained' },
    ],
    keyPoints: [
      'MEANDER LINES ARE NOT BOUNDARIES - water\'s edge is the boundary',
      'Accretion: gradual buildup of soil by water action - belongs to riparian owner',
      'Reliction: gradual withdrawal of water - exposed land goes to riparian owner',
      'Avulsion: sudden change in water course - boundary does NOT change',
      'Navigable waters often have state ownership below high water',
    ],
    examTrap: {
      fieldPractice: 'Using the meander line shown on the plat as the property boundary',
      correctAnswer: 'The water\'s edge (at ordinary high water) is the boundary. Meander lines approximate the bank for area calculation only.',
      explanation: 'Patents to waterfront property convey to the water, not to the meander line. As water moves, so does the boundary (unless avulsion).',
    },
    reference: 'Manual of Surveying Instructions 2009, Chapter 7',
  },
  {
    id: 'bearing-tree-procedure',
    title: 'Bearing Tree Procedure',
    category: 'field-procedures',
    examTrack: 'both',
    description: 'Bearing trees are witness objects that help locate corner positions. The exam tests proper recording and use.',
    steps: [
      { step: 1, action: 'Select suitable trees within prescribed distance', detail: 'Usually within 5 chains (330 ft) of corner' },
      { step: 2, action: 'Blaze the tree on side facing corner', detail: 'Cut smooth surface at convenient height' },
      { step: 3, action: 'Scribe required information', detail: 'Typically BT, section number, township, range' },
      { step: 4, action: 'Measure distance to corner', detail: 'Horizontal distance, link precision' },
      { step: 5, action: 'Determine bearing from corner to tree', detail: 'Magnetic bearing at time of survey' },
      { step: 6, action: 'Record species, diameter, and markings in notes' },
    ],
    keyPoints: [
      'Bearing is FROM corner TO tree (not tree to corner)',
      'Distance measured in links (1 link = 0.66 feet)',
      'Trees are accessories, not the corner itself',
      'Multiple bearing trees provide redundancy',
      'Species and diameter aid in identification',
    ],
    examTrap: {
      fieldPractice: 'Recording bearing from tree to corner',
      correctAnswer: 'Bearing is recorded FROM the corner TO the bearing tree',
      explanation: 'Original field notes read "Oak 10" dia bears N45°E 50 links distant." This means from the corner, go N45°E for 50 links to reach the tree.',
    },
    reference: 'Manual of Surveying Instructions 2009, Section 4-25',
  },
  {
    id: 'closure-check',
    title: 'Angular and Linear Closure',
    category: 'field-procedures',
    examTrack: 'fs',
    description: 'Checking closure on a traverse determines if the survey meets accuracy requirements. Different standards apply to different survey types.',
    steps: [
      { step: 1, action: 'Sum interior angles of traverse', detail: 'Should equal (n-2)×180° where n = number of sides' },
      { step: 2, action: 'Calculate angular misclosure', detail: 'Measured sum minus theoretical sum' },
      { step: 3, action: 'Compare to allowable angular closure', detail: 'Typically K√n where K depends on survey class' },
      { step: 4, action: 'Compute latitudes and departures', detail: 'From adjusted angles and measured distances' },
      { step: 5, action: 'Calculate linear closure', detail: 'Error = √(ΣLat² + ΣDep²)' },
      { step: 6, action: 'Express as ratio: 1:(Perimeter/Error)' },
    ],
    keyPoints: [
      'Interior angles: (n-2)×180° for n-sided polygon',
      'First-order traverse: 1" per station angular closure',
      'Second-order: 2" to 3" per station',
      'Third-order: 5" to 10" per station',
      'Linear closure expressed as ratio (1:10,000 means 0.1 ft per 1000 ft)',
    ],
    examTrap: {
      fieldPractice: 'Using exterior angles without adjusting the formula',
      correctAnswer: 'Exterior angles sum to (n+2)×180°. Most formulas assume interior angles.',
      explanation: 'The exam may ask about either. Interior: (n-2)×180°. Exterior: (n+2)×180°. Be sure you know which you\'re working with.',
    },
    reference: 'Elementary Surveying, Chapter 9',
  },
  {
    id: 'grid-vs-ground',
    title: 'Grid Distance vs. Ground Distance',
    category: 'office-procedures',
    examTrack: 'fs',
    description: 'Converting between State Plane Coordinate (grid) distances and actual ground distances is a common exam topic.',
    steps: [
      { step: 1, action: 'Obtain the combined scale factor', detail: 'Grid scale factor × elevation factor' },
      { step: 2, action: 'Grid scale factor from SPCS tables/software', detail: 'Based on position within projection zone' },
      { step: 3, action: 'Elevation factor = R / (R + h)', detail: 'R = earth radius, h = elevation above ellipsoid' },
      { step: 4, action: 'Ground distance = Grid distance / Combined factor', detail: 'Ground is usually longer than grid' },
      { step: 5, action: 'Or: Grid distance = Ground distance × Combined factor' },
    ],
    keyPoints: [
      'Grid distances are projected onto the state plane',
      'Ground distances are what you actually measure in the field',
      'Combined factor usually < 1, so grid < ground',
      'At projection origin, grid scale factor = 1 (no distortion)',
      'Higher elevations have smaller elevation factors',
    ],
    examTrap: {
      fieldPractice: 'Forgetting to apply elevation factor when well above or below sea level',
      correctAnswer: 'Must apply BOTH grid scale factor AND elevation factor for accurate conversion',
      explanation: 'At 1000 ft elevation, the elevation factor alone causes about 0.05 ft per 1000 ft difference. Omitting it fails precision requirements.',
    },
    reference: 'NGS State Plane Coordinate System',
  },
];

export const BLM_GLOSSARY_TERMS: GlossaryTerm[] = [
  { term: 'Accretion', definition: 'The gradual and imperceptible addition of soil by natural water action. The deposit itself is called alluvion. The riparian owner gains title to accreted lands.', category: 'Riparian', examTrack: 'both' },
  { term: 'Acquiescence', definition: 'Tacit consent by an adjoining owner to what might be an encroachment, through failure to raise objection. May establish boundary by agreement over time.', category: 'Boundary Law', examTrack: 'both' },
  { term: 'Adverse Possession', definition: 'A method of acquiring title to land by possession for a statutory period under certain conditions: open, notorious, hostile, continuous, and under claim of right.', category: 'Boundary Law', examTrack: 'both' },
  { term: 'Aliquot Parts', definition: 'Legal subdivisions of a section that can be described by halving (half-section, quarter-section, quarter-quarter, etc.). Standard divisions of the rectangular survey system.', category: 'PLSS', examTrack: 'both' },
  { term: 'Avulsion', definition: 'A sudden change in the course of a stream or river. Unlike accretion/reliction, avulsion does NOT change property boundaries.', category: 'Riparian', examTrack: 'both' },
  { term: 'Bearing Tree', definition: 'A tree used as an accessory to a corner, marked with appropriate survey data. Bearing is measured FROM corner TO tree.', category: 'Monuments', examTrack: 'both' },
  { term: 'Bona Fide Rights', definition: 'Rights held in good faith without notice of defects. A bona fide purchaser takes title free of defects unknown to them.', category: 'Boundary Law', examTrack: 'both' },
  { term: 'Chain', definition: 'A unit of length equal to 66 feet, 100 links, or 4 rods. 80 chains = 1 mile. 10 square chains = 1 acre.', category: 'Measurements', examTrack: 'both' },
  { term: 'Closing Corner', definition: 'A corner set where a survey line intersects a previously established line. Set at the actual point of intersection on the existing line.', category: 'PLSS', examTrack: 'both' },
  { term: 'Collateral Evidence', definition: 'Evidence that supports or corroborates a corner position but is not the corner itself: fences along record lines, occupation boundaries, local testimony.', category: 'Evidence', examTrack: 'both' },
  { term: 'Color of Title', definition: 'A document that appears to pass title but is actually defective. May support adverse possession claims in many jurisdictions.', category: 'Boundary Law', examTrack: 'ps' },
  { term: 'Control Corner', definition: 'An existing corner used to control the position of a lost corner being restored by proportionate measurement.', category: 'PLSS', examTrack: 'both' },
  { term: 'Dependent Resurvey', definition: 'A retracement and reestablishment of lines of the original survey. Identifies original corners and reestablishes lost corners by proportionate methods.', category: 'PLSS', examTrack: 'both' },
  { term: 'Double Proportionate Measurement', definition: 'Method used to restore lost interior corners at the intersection of two lines, proportioning in both cardinal directions using four control corners.', category: 'PLSS', examTrack: 'both' },
  { term: 'Easement', definition: 'A right to use the land of another for a specific purpose (access, utilities, etc.). Does not transfer ownership.', category: 'Boundary Law', examTrack: 'both' },
  { term: 'Encroachment', definition: 'An unauthorized extension of a building, structure, or improvement onto another\'s land.', category: 'Boundary Law', examTrack: 'both' },
  { term: 'Existent Corner', definition: 'A corner whose position can be identified by verifying the physical evidence of the original monument or its accessories.', category: 'PLSS', examTrack: 'both' },
  { term: 'Field Notes', definition: 'The official written record of a survey, describing courses, distances, corners, monuments, and topography encountered.', category: 'Survey Records', examTrack: 'both' },
  { term: 'Government Lot', definition: 'A fractional subdivision of a section, typically along water or survey boundaries, assigned a lot number rather than aliquot description.', category: 'PLSS', examTrack: 'both' },
  { term: 'Grant', definition: 'A transfer of property or property rights from one party (grantor) to another (grantee).', category: 'Boundary Law', examTrack: 'both' },
  { term: 'Independent Resurvey', definition: 'A resurvey that creates new boundaries and subdivisions, ignoring the original survey lines. Rare and requires statutory authority.', category: 'PLSS', examTrack: 'ps' },
  { term: 'Junior Rights', definition: 'Rights that are subordinate to earlier (senior) rights. In overlap situations, junior grants must yield to senior grants.', category: 'Boundary Law', examTrack: 'both' },
  { term: 'Link', definition: 'A unit of length equal to 7.92 inches or 0.66 feet. 100 links = 1 chain. Used for precision in historical surveys.', category: 'Measurements', examTrack: 'both' },
  { term: 'Lost Corner', definition: 'A corner whose position cannot be determined from any physical evidence or reliable testimony. Must be restored by proportionate measurement.', category: 'PLSS', examTrack: 'both' },
  { term: 'Meander Corner', definition: 'A corner set on the bank of a navigable body of water at the intersection with a section or township line.', category: 'PLSS', examTrack: 'both' },
  { term: 'Meander Line', definition: 'A traverse along the margin of a permanent body of water for the purpose of defining the sinuosities of the bank and computing the area. NOT a boundary line.', category: 'PLSS', examTrack: 'both' },
  { term: 'Monument', definition: 'A physical object or marker that defines a corner or point. May be natural (rock, tree) or artificial (post, pipe, stone).', category: 'Monuments', examTrack: 'both' },
  { term: 'Obliterated Corner', definition: 'A corner where the physical monument is gone but whose position can be determined from accessories, traces, or reliable testimony.', category: 'PLSS', examTrack: 'both' },
  { term: 'Original Survey', definition: 'The first survey of an area that created the legal boundaries and subdivisions. Its monuments and lines are controlling.', category: 'PLSS', examTrack: 'both' },
  { term: 'Parol Evidence', definition: 'Oral testimony about the location of boundaries or monuments. Generally inadmissible to contradict written documents but may explain ambiguities.', category: 'Evidence', examTrack: 'ps' },
  { term: 'Patent', definition: 'The government document that transfers title from the United States to the first private owner.', category: 'PLSS', examTrack: 'both' },
  { term: 'Plat', definition: 'An official map of a survey showing boundaries, lots, corners, measurements, and other relevant details.', category: 'Survey Records', examTrack: 'both' },
  { term: 'Privity', definition: 'A successive relationship between parties that allows rights to be transferred. Privity of estate allows tacking for adverse possession.', category: 'Boundary Law', examTrack: 'ps' },
  { term: 'Proportionate Measurement', definition: 'A method of restoring lost corners by distributing measurement discrepancies proportionally, used when no physical evidence of the original corner exists.', category: 'PLSS', examTrack: 'both' },
  { term: 'Quarter Corner', definition: 'A corner midway between section corners, set to divide section lines into half-mile segments.', category: 'PLSS', examTrack: 'both' },
  { term: 'Reliction', definition: 'The gradual recession of water that uncovers new land. Like accretion, the riparian owner gains title to the exposed land.', category: 'Riparian', examTrack: 'both' },
  { term: 'Retracement', definition: 'A survey that follows in the footsteps of the original surveyor, attempting to identify the original monuments and lines.', category: 'Survey Types', examTrack: 'both' },
  { term: 'Riparian Rights', definition: 'Rights associated with ownership of land bordering water. Include access to water, use of water, and ownership of accreted/relicted lands.', category: 'Riparian', examTrack: 'both' },
  { term: 'Rod', definition: 'A unit of length equal to 16.5 feet, 1/4 chain, or 25 links. Also called a pole or perch.', category: 'Measurements', examTrack: 'both' },
  { term: 'Section', definition: 'A unit of land approximately 1 mile square, containing approximately 640 acres, numbered 1-36 within a township.', category: 'PLSS', examTrack: 'both' },
  { term: 'Senior Rights', definition: 'Rights that take priority due to earlier establishment. First in time, first in right. Senior grants control over junior grants.', category: 'Boundary Law', examTrack: 'both' },
  { term: 'Single Proportionate Measurement', definition: 'Method to restore a lost corner on a line between two existing corners. Position determined by proportioning record distance to measured distance.', category: 'PLSS', examTrack: 'both' },
  { term: 'Standard Parallel', definition: 'An east-west line run at regular intervals (typically 24 miles) to limit the convergence of meridians. Also called correction line.', category: 'PLSS', examTrack: 'both' },
  { term: 'Tacking', definition: 'Adding together successive periods of possession by different owners in privity to meet the statutory period for adverse possession.', category: 'Boundary Law', examTrack: 'ps' },
  { term: 'Thread of Stream', definition: 'The center line of a non-navigable stream, often the boundary between riparian owners on opposite banks.', category: 'Riparian', examTrack: 'both' },
  { term: 'Township', definition: 'A unit of land approximately 6 miles square, containing 36 sections, identified by township and range numbers.', category: 'PLSS', examTrack: 'both' },
  { term: 'Witness Corner', definition: 'A monumented point near a corner that cannot be monumented at its true position (e.g., in water or on rock). Set on a surveyed line leading to the true corner.', category: 'Monuments', examTrack: 'both' },
];
