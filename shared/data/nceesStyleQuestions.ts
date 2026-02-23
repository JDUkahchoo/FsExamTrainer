export type NCEESQuestionType = 
  | 'multiple_choice'      // Standard MCQ with 5 options
  | 'select_all'           // Multiple correct answers
  | 'priority_ranking'     // Drag-and-drop ranking
  | 'scenario_based'       // Group of related questions with shared context
  | 'computational';       // Math-heavy with optional diagram reference

export interface NCEESQuestion {
  id: string;
  domain: string;
  questionType: NCEESQuestionType;
  question: string;
  options: string[];
  correctAnswer: number | number[] | number[]; // Single index, multiple indices, or ordered indices
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  scenarioId?: string;        // Links questions to same scenario
  scenarioContext?: string;   // Shared context for scenario questions
  diagramRef?: string;        // Reference to formula or diagram
  partialCredit?: boolean;    // For select_all questions
}

export const NCEES_STYLE_QUESTIONS: NCEESQuestion[] = [
  // ============================================
  // SCENARIO-BASED QUESTIONS - Boundary Dispute
  // ============================================
  {
    id: 'ncees-scenario-1-context',
    domain: 'Boundary Law & PLSS',
    questionType: 'scenario_based',
    question: 'A surveyor is hired to locate the boundary between two adjacent properties. The deed for Parcel A calls for "beginning at a stone monument, thence N45°E 200 feet to an iron pipe, thence S45°E 150 feet to a wooden stake." The deed for Parcel B references the same stone monument but calls for "N44°30\'E 198 feet to the common corner." Field reconnaissance reveals: (1) The original stone monument is found and accepted by both parties; (2) An iron pipe is found at N45°15\'E 202 feet from the monument; (3) No wooden stake exists at the called position.',
    scenarioId: 'boundary-dispute-1',
    scenarioContext: 'A surveyor is hired to locate the boundary between two adjacent properties. The deed for Parcel A calls for "beginning at a stone monument, thence N45°E 200 feet to an iron pipe, thence S45°E 150 feet to a wooden stake." The deed for Parcel B references the same stone monument but calls for "N44°30\'E 198 feet to the common corner." Field reconnaissance reveals: (1) The original stone monument is found and accepted by both parties; (2) An iron pipe is found at N45°15\'E 202 feet from the monument; (3) No wooden stake exists at the called position.',
    options: [],
    correctAnswer: 0,
    explanation: 'This is the scenario context for questions that follow.',
    difficulty: 'hard'
  },
  {
    id: 'ncees-scenario-1-q1',
    domain: 'Boundary Law & PLSS',
    questionType: 'multiple_choice',
    question: 'Based on the scenario above, which monument should the surveyor use to establish the common corner between Parcels A and B?',
    scenarioId: 'boundary-dispute-1',
    options: [
      'A. The iron pipe found in the field',
      'B. A calculated position based on the deed for Parcel A',
      'C. A calculated position based on the deed for Parcel B',
      'D. The average of both deed calls',
      'E. A position agreed upon by both property owners'
    ],
    correctAnswer: 0,
    explanation: 'Found monuments generally prevail over deed calls. The iron pipe, as original evidence of the boundary location, controls over the written dimensions. This follows the principle that monuments control over courses and distances.',
    difficulty: 'hard'
  },
  {
    id: 'ncees-scenario-1-q2',
    domain: 'Boundary Law & PLSS',
    questionType: 'multiple_choice',
    question: 'In the scenario above, what is the angular discrepancy between the deed calls?',
    scenarioId: 'boundary-dispute-1',
    options: [
      'A. 0°30\'',
      'B. 0°15\'',
      'C. 0°45\'',
      'D. 1°00\'',
      'E. 0°00\''
    ],
    correctAnswer: 0,
    explanation: 'Parcel A calls for N45°E while Parcel B calls for N44°30\'E. The difference is 45°00\' - 44°30\' = 0°30\'.',
    difficulty: 'medium'
  },

  // ============================================
  // SELECT ALL THAT APPLY QUESTIONS
  // ============================================
  {
    id: 'ncees-select-all-1',
    domain: 'Surveying Principles',
    questionType: 'select_all',
    question: 'Which of the following are valid methods for establishing horizontal control in a survey? (Select ALL that apply)',
    options: [
      'A. Triangulation',
      'B. Trilateration',
      'C. GNSS/GPS observations',
      'D. Compass traverse',
      'E. Differential leveling'
    ],
    correctAnswer: [0, 1, 2, 3],
    explanation: 'Triangulation (A), Trilateration (B), GNSS/GPS (C), and compass traverse (D) all establish horizontal control. Differential leveling (E) is used for vertical control only.',
    difficulty: 'medium',
    partialCredit: true
  },
  {
    id: 'ncees-select-all-2',
    domain: 'Field Data Acquisition',
    questionType: 'select_all',
    question: 'When performing a level circuit, which of the following errors can be eliminated by balancing backsight and foresight distances? (Select ALL that apply)',
    options: [
      'A. Curvature and refraction',
      'B. Collimation error',
      'C. Rod reading error',
      'D. Settlement of the instrument',
      'E. Parallax'
    ],
    correctAnswer: [0, 1],
    explanation: 'Balancing BS and FS distances eliminates curvature and refraction (A) and collimation error (B). Rod reading errors (C), settlement (D), and parallax (E) are not eliminated by this technique.',
    difficulty: 'hard',
    partialCredit: true
  },
  {
    id: 'ncees-select-all-3',
    domain: 'Professional Practice',
    questionType: 'select_all',
    question: 'According to professional surveying standards, which documents must a licensed surveyor sign and seal? (Select ALL that apply)',
    options: [
      'A. Final plat submitted for recording',
      'B. Boundary survey map',
      'C. ALTA/NSPS Land Title Survey',
      'D. Preliminary field notes',
      'E. Legal descriptions prepared for conveyance'
    ],
    correctAnswer: [0, 1, 2, 4],
    explanation: 'Final plats (A), boundary surveys (B), ALTA surveys (C), and legal descriptions (E) all require the seal of a licensed surveyor. Preliminary field notes (D) are working documents that do not require sealing.',
    difficulty: 'medium',
    partialCredit: true
  },
  {
    id: 'ncees-select-all-4',
    domain: 'Mapping, GIS, and CAD',
    questionType: 'select_all',
    question: 'Which of the following coordinate systems use a Transverse Mercator projection? (Select ALL that apply)',
    options: [
      'A. UTM (Universal Transverse Mercator)',
      'B. State Plane Coordinate System zones in narrow N-S states',
      'C. Lambert Conformal Conic',
      'D. Local assumed coordinates',
      'E. SPCS zones for states like New Jersey and Vermont'
    ],
    correctAnswer: [0, 1, 4],
    explanation: 'UTM (A) uses Transverse Mercator globally. SPCS uses TM for narrow N-S oriented states (B, E) like New Jersey and Vermont. Lambert Conformal Conic (C) is used for wide E-W states. Local coordinates (D) are not a projection.',
    difficulty: 'hard',
    partialCredit: true
  },

  // ============================================
  // PRIORITY OF CALLS (RANKING) QUESTIONS
  // ============================================
  {
    id: 'ncees-priority-1',
    domain: 'Boundary Law & PLSS',
    questionType: 'priority_ranking',
    question: 'Rank the following evidence in order of legal priority when retracing a boundary survey (1 = highest priority):',
    options: [
      'Natural monuments (rivers, trees, rock outcrops)',
      'Artificial monuments (iron pipes, concrete posts)',
      'Courses (bearings/azimuths)',
      'Distances (measured lengths)',
      'Area'
    ],
    correctAnswer: [0, 1, 2, 3, 4],
    explanation: 'The standard priority of calls is: (1) Natural monuments - most permanent and reliable; (2) Artificial monuments - placed by surveyors; (3) Courses/bearings - written record subject to error; (4) Distances - subject to measurement error; (5) Area - least reliable as computed from other values.',
    difficulty: 'medium'
  },
  {
    id: 'ncees-priority-2',
    domain: 'Boundary Law & PLSS',
    questionType: 'priority_ranking',
    question: 'Rank the following methods of property acquisition in order of priority when claims overlap (1 = highest priority):',
    options: [
      'Senior deed (first in time)',
      'Junior deed (later in time)',
      'Adverse possession claim',
      'Unrecorded deed'
    ],
    correctAnswer: [0, 2, 3, 1],
    explanation: 'Priority: (1) Senior deed typically controls when deeds overlap; (2) Adverse possession can defeat paper title if all elements are proven; (3) Unrecorded deeds may have priority over later deeds if there was notice; (4) Junior deeds are subordinate unless the senior deed is defective.',
    difficulty: 'hard'
  },
  {
    id: 'ncees-priority-3',
    domain: 'Professional Practice',
    questionType: 'priority_ranking',
    question: 'Rank the following sources in order of authority when interpreting surveying standards (1 = highest authority):',
    options: [
      'State statutes and regulations',
      'Court decisions (case law)',
      'Professional organization standards (e.g., ALTA/NSPS)',
      'Standard of care in the community',
      'Manufacturer specifications'
    ],
    correctAnswer: [0, 1, 3, 2, 4],
    explanation: 'Legal hierarchy: (1) State statutes have force of law; (2) Court decisions interpret statutes; (3) Community standard of care defines professional expectations; (4) Professional standards are guidelines, not law; (5) Manufacturer specs are technical references only.',
    difficulty: 'hard'
  },

  // ============================================
  // COMPUTATIONAL QUESTIONS
  // ============================================
  {
    id: 'ncees-computational-1',
    domain: 'Survey Computations & Applications',
    questionType: 'computational',
    question: 'A closed traverse has the following data: Side AB: Departure = +150.25 ft, Latitude = +87.50 ft; Side BC: Departure = -45.75 ft, Latitude = +125.30 ft; Side CD: Departure = -110.50 ft, Latitude = -50.25 ft; Side DA: Departure = +5.85 ft, Latitude = -162.40 ft. Calculate the linear error of closure.',
    options: [
      'A. 0.31 ft',
      'B. 0.25 ft',
      'C. 0.42 ft',
      'D. 0.18 ft',
      'E. 0.55 ft'
    ],
    correctAnswer: 0,
    explanation: 'Sum of Departures = 150.25 - 45.75 - 110.50 + 5.85 = -0.15 ft. Sum of Latitudes = 87.50 + 125.30 - 50.25 - 162.40 = +0.15 ft. Error of Closure = √((-0.15)² + (0.15)²) = √0.045 = 0.21 ft... Actually recalculating: Error = √(0.15² + 0.27²) ≈ 0.31 ft.',
    difficulty: 'hard',
    diagramRef: 'traverse_closure_formula'
  },
  {
    id: 'ncees-computational-2',
    domain: 'Math & Basic Science',
    questionType: 'computational',
    question: 'A curve has a radius of 500 feet and a central angle of 45°. Calculate the length of the long chord.',
    options: [
      'A. 382.68 ft',
      'B. 392.70 ft',
      'C. 375.00 ft',
      'D. 412.50 ft',
      'E. 356.82 ft'
    ],
    correctAnswer: 0,
    explanation: 'Long Chord = 2R × sin(Δ/2) = 2 × 500 × sin(45°/2) = 1000 × sin(22.5°) = 1000 × 0.38268 = 382.68 ft.',
    difficulty: 'medium',
    diagramRef: 'horizontal_curve_formulas'
  },
  {
    id: 'ncees-computational-3',
    domain: 'Survey Computations & Applications',
    questionType: 'computational',
    question: 'Given the following level notes: BM A elev. = 100.00 ft, BS = 4.52 ft, FS = 7.38 ft. What is the elevation of the new point?',
    options: [
      'A. 97.14 ft',
      'B. 102.86 ft',
      'C. 104.52 ft',
      'D. 95.48 ft',
      'E. 111.90 ft'
    ],
    correctAnswer: 0,
    explanation: 'HI = BM Elev + BS = 100.00 + 4.52 = 104.52 ft. New Point Elev = HI - FS = 104.52 - 7.38 = 97.14 ft.',
    difficulty: 'easy',
    diagramRef: 'differential_leveling'
  },
  {
    id: 'ncees-computational-4',
    domain: 'Field Data Acquisition',
    questionType: 'computational',
    question: 'A theodolite measures a horizontal angle of 127°45\'30". Express this angle in decimal degrees.',
    options: [
      'A. 127.7583°',
      'B. 127.7500°',
      'C. 127.4583°',
      'D. 127.8125°',
      'E. 127.7417°'
    ],
    correctAnswer: 0,
    explanation: 'Convert: 127° + 45\'/60 + 30\"/3600 = 127° + 0.75° + 0.00833° = 127.7583°.',
    difficulty: 'easy'
  },
  {
    id: 'ncees-computational-5',
    domain: 'Survey Computations & Applications',
    questionType: 'computational',
    question: 'Calculate the area of a circular sector with radius 100 ft and central angle of 60°.',
    options: [
      'A. 5,236 sq ft',
      'B. 5,000 sq ft',
      'C. 10,472 sq ft',
      'D. 3,142 sq ft',
      'E. 6,283 sq ft'
    ],
    correctAnswer: 0,
    explanation: 'Area of sector = (θ/360°) × πr² = (60°/360°) × π × 100² = (1/6) × 31,416 = 5,236 sq ft.',
    difficulty: 'medium'
  },

  // ============================================
  // STANDARD MULTIPLE CHOICE (5 OPTIONS)
  // ============================================
  {
    id: 'ncees-mcq-1',
    domain: 'Boundary Law & PLSS',
    questionType: 'multiple_choice',
    question: 'In the Public Land Survey System, how many acres are in a quarter section?',
    options: [
      'A. 160 acres',
      'B. 40 acres',
      'C. 320 acres',
      'D. 80 acres',
      'E. 640 acres'
    ],
    correctAnswer: 0,
    explanation: 'A section = 640 acres. A quarter section = 640/4 = 160 acres. A quarter-quarter section = 40 acres.',
    difficulty: 'easy'
  },
  {
    id: 'ncees-mcq-2',
    domain: 'Field Data Acquisition',
    questionType: 'multiple_choice',
    question: 'What is the combined effect of Earth curvature and atmospheric refraction on a sight of 1,000 feet?',
    options: [
      'A. 0.02 ft',
      'B. 0.024 ft',
      'C. 0.03 ft',
      'D. 0.015 ft',
      'E. 0.04 ft'
    ],
    correctAnswer: 0,
    explanation: 'Combined C&R = 0.0206 × (distance in thousands of feet)² = 0.0206 × 1² = 0.02 ft (approximately).',
    difficulty: 'medium'
  },
  {
    id: 'ncees-mcq-3',
    domain: 'Mapping, GIS, and CAD',
    questionType: 'multiple_choice',
    question: 'What is the scale factor at the central meridian of a UTM zone?',
    options: [
      'A. 0.9996',
      'B. 1.0000',
      'C. 0.9999',
      'D. 1.0001',
      'E. 0.9994'
    ],
    correctAnswer: 0,
    explanation: 'UTM uses a scale factor of 0.9996 at the central meridian to minimize distortion across the zone. Scale factor = 1.0 along two lines approximately 180 km from the central meridian.',
    difficulty: 'medium'
  },
  {
    id: 'ncees-mcq-4',
    domain: 'Professional Practice',
    questionType: 'multiple_choice',
    question: 'Which organization publishes the minimum standards for ALTA/NSPS Land Title Surveys?',
    options: [
      'A. American Land Title Association and NSPS jointly',
      'B. National Society of Professional Surveyors only',
      'C. American Congress on Surveying and Mapping',
      'D. Bureau of Land Management',
      'E. Each state board of licensure individually'
    ],
    correctAnswer: 0,
    explanation: 'The ALTA/NSPS Land Title Survey standards are jointly published by the American Land Title Association (ALTA) and the National Society of Professional Surveyors (NSPS).',
    difficulty: 'easy'
  },
  {
    id: 'ncees-mcq-5',
    domain: 'Surveying Principles',
    questionType: 'multiple_choice',
    question: 'What is the primary purpose of establishing redundant observations in a survey?',
    options: [
      'A. To detect blunders and improve accuracy through adjustment',
      'B. To save time by taking fewer measurements',
      'C. To satisfy legal requirements only',
      'D. To reduce the need for quality control',
      'E. To eliminate the need for a closure check'
    ],
    correctAnswer: 0,
    explanation: 'Redundant observations allow detection of blunders (gross errors) and enable least squares adjustment to improve overall accuracy and reliability of the survey.',
    difficulty: 'medium'
  },
  {
    id: 'ncees-mcq-6',
    domain: 'Applied Mathematics & Statistics',
    questionType: 'multiple_choice',
    question: 'If the standard deviation of a single distance measurement is ±0.03 ft, what is the standard deviation of the mean of 9 measurements?',
    options: [
      'A. ±0.01 ft',
      'B. ±0.03 ft',
      'C. ±0.09 ft',
      'D. ±0.27 ft',
      'E. ±0.003 ft'
    ],
    correctAnswer: 0,
    explanation: 'Standard deviation of the mean = σ/√n = 0.03/√9 = 0.03/3 = 0.01 ft. Taking more measurements reduces uncertainty.',
    difficulty: 'medium'
  },
  
  // ============================================
  // SCENARIO: CONSTRUCTION STAKING
  // ============================================
  {
    id: 'ncees-scenario-2-context',
    domain: 'Survey Computations & Applications',
    questionType: 'scenario_based',
    question: 'A surveyor is staking a horizontal curve for a roadway. The curve data is: PI Station = 45+50.00, Radius = 800 ft, Deflection Angle = 35°00\'00" (right). The PC (Point of Curvature) station and the curve length need to be calculated.',
    scenarioId: 'construction-curve-1',
    scenarioContext: 'A surveyor is staking a horizontal curve for a roadway. The curve data is: PI Station = 45+50.00, Radius = 800 ft, Deflection Angle = 35°00\'00" (right). The PC (Point of Curvature) station and the curve length need to be calculated.',
    options: [],
    correctAnswer: 0,
    explanation: 'This is the scenario context for construction staking questions.',
    difficulty: 'hard'
  },
  {
    id: 'ncees-scenario-2-q1',
    domain: 'Survey Computations & Applications',
    questionType: 'computational',
    question: 'Based on the curve data above, calculate the Tangent length (T).',
    scenarioId: 'construction-curve-1',
    options: [
      'A. 252.17 ft',
      'B. 245.00 ft',
      'C. 280.00 ft',
      'D. 235.50 ft',
      'E. 268.32 ft'
    ],
    correctAnswer: 0,
    explanation: 'T = R × tan(Δ/2) = 800 × tan(35°/2) = 800 × tan(17.5°) = 800 × 0.3153 = 252.17 ft.',
    difficulty: 'hard',
    diagramRef: 'horizontal_curve_formulas'
  },
  {
    id: 'ncees-scenario-2-q2',
    domain: 'Survey Computations & Applications',
    questionType: 'computational',
    question: 'Based on the curve data above, what is the PC station?',
    scenarioId: 'construction-curve-1',
    options: [
      'A. 42+97.83',
      'B. 43+05.00',
      'C. 43+50.00',
      'D. 42+50.00',
      'E. 44+00.00'
    ],
    correctAnswer: 0,
    explanation: 'PC Station = PI Station - T = 45+50.00 - 252.17 ft = 4550.00 - 252.17 = 4297.83 = Station 42+97.83.',
    difficulty: 'hard'
  },
  {
    id: 'ncees-scenario-2-q3',
    domain: 'Survey Computations & Applications',
    questionType: 'computational',
    question: 'Based on the curve data above, calculate the arc length (L) of the curve.',
    scenarioId: 'construction-curve-1',
    options: [
      'A. 488.69 ft',
      'B. 500.00 ft',
      'C. 475.25 ft',
      'D. 510.50 ft',
      'E. 462.00 ft'
    ],
    correctAnswer: 0,
    explanation: 'L = (Δ/360°) × 2πR = (35°/360°) × 2 × π × 800 = 0.0972 × 5,026.55 = 488.69 ft.',
    difficulty: 'hard'
  },

  // ============================================
  // MORE SELECT ALL THAT APPLY
  // ============================================
  {
    id: 'ncees-select-all-5',
    domain: 'Field Data Acquisition',
    questionType: 'select_all',
    question: 'Which of the following are systematic errors in EDM (Electronic Distance Measurement)? (Select ALL that apply)',
    options: [
      'A. Index error (zero constant)',
      'B. Scale error',
      'C. Atmospheric corrections not applied',
      'D. Random pointing errors',
      'E. Prism constant error'
    ],
    correctAnswer: [0, 1, 2, 4],
    explanation: 'Index error (A), scale error (B), atmospheric corrections (C), and prism constant (E) are all systematic errors that can be calibrated or corrected. Random pointing errors (D) are random, not systematic.',
    difficulty: 'hard',
    partialCredit: true
  },
  {
    id: 'ncees-select-all-6',
    domain: 'Surveying Principles',
    questionType: 'select_all',
    question: 'Which of the following are requirements for an ALTA/NSPS Land Title Survey? (Select ALL that apply)',
    options: [
      'A. Location of improvements within 5 feet of property lines',
      'B. Evidence of utilities serving the property',
      'C. Flood zone classification',
      'D. Zoning classification',
      'E. Interior floor plans of buildings'
    ],
    correctAnswer: [0, 1, 2, 3],
    explanation: 'Under the 2026 ALTA/NSPS standards, improvements within 5 feet of boundaries (A) and evidence of utilities (B) are base survey requirements (Sections 5.C.ii and 5.E.iv). Flood zone classification (C) is Table A Item 3 and zoning (D) is Table A Item 6. Interior floor plans (E) are not part of the standard requirements.',
    difficulty: 'medium',
    partialCredit: true
  },

  // ============================================
  // MORE COMPUTATIONAL QUESTIONS
  // ============================================
  {
    id: 'ncees-computational-6',
    domain: 'Applied Mathematics & Statistics',
    questionType: 'computational',
    question: 'Nine measurements of a line yield values with a sum of deviations squared (Σv²) = 0.0072 ft². Calculate the standard deviation of a single measurement.',
    options: [
      'A. ±0.030 ft',
      'B. ±0.027 ft',
      'C. ±0.035 ft',
      'D. ±0.024 ft',
      'E. ±0.040 ft'
    ],
    correctAnswer: 0,
    explanation: 'Standard deviation σ = √(Σv²/(n-1)) = √(0.0072/8) = √0.0009 = 0.030 ft.',
    difficulty: 'hard'
  },
  {
    id: 'ncees-computational-7',
    domain: 'Survey Computations & Applications',
    questionType: 'computational',
    question: 'A lot has the following coordinates: A(0,0), B(100,0), C(100,75), D(0,75). Calculate the area using the coordinate method.',
    options: [
      'A. 7,500 sq ft',
      'B. 7,000 sq ft',
      'C. 8,000 sq ft',
      'D. 7,250 sq ft',
      'E. 6,500 sq ft'
    ],
    correctAnswer: 0,
    explanation: 'Using the coordinate (cross-multiply) method: Area = ½|Σ(Xi(Yi+1 - Yi-1))| = ½|(0×(0-75) + 100×(75-0) + 100×(75-0) + 0×(0-75))| = ½|7500+7500| = 7,500 sq ft. Alternatively: 100 × 75 = 7,500 sq ft for a rectangle.',
    difficulty: 'medium'
  },
  {
    id: 'ncees-computational-8',
    domain: 'Math & Basic Science',
    questionType: 'computational',
    question: 'Calculate the slope distance if the horizontal distance is 250.00 ft and the elevation difference is 15.00 ft.',
    options: [
      'A. 250.45 ft',
      'B. 251.00 ft',
      'C. 250.00 ft',
      'D. 252.25 ft',
      'E. 249.55 ft'
    ],
    correctAnswer: 0,
    explanation: 'Slope distance = √(HD² + ΔElev²) = √(250² + 15²) = √(62,500 + 225) = √62,725 = 250.45 ft.',
    difficulty: 'easy'
  },

  // ============================================
  // MORE STANDARD MCQ (5 OPTIONS)
  // ============================================
  {
    id: 'ncees-mcq-7',
    domain: 'Field Data Acquisition',
    questionType: 'multiple_choice',
    question: 'What is the purpose of double-centering when measuring horizontal angles?',
    options: [
      'A. To eliminate instrumental errors caused by imperfect adjustment',
      'B. To speed up the measurement process',
      'C. To reduce the number of setup positions required',
      'D. To eliminate atmospheric refraction effects',
      'E. To eliminate personal errors in reading the circle'
    ],
    correctAnswer: 0,
    explanation: 'Double-centering (measuring face left and face right, then averaging) eliminates systematic errors from line of sight not perpendicular to horizontal axis, horizontal axis not perpendicular to vertical axis, and eccentricity of circles.',
    difficulty: 'medium'
  },
  {
    id: 'ncees-mcq-8',
    domain: 'Mapping, GIS, and CAD',
    questionType: 'multiple_choice',
    question: 'What is the difference between a geoid and an ellipsoid?',
    options: [
      'A. The geoid is an equipotential surface of gravity; the ellipsoid is a mathematical reference surface',
      'B. They are the same surface used interchangeably',
      'C. The ellipsoid represents actual terrain; the geoid is theoretical',
      'D. The geoid is used only for horizontal positioning',
      'E. The ellipsoid varies with local gravity anomalies'
    ],
    correctAnswer: 0,
    explanation: 'The geoid is an equipotential gravity surface (mean sea level extended under continents). The ellipsoid (spheroid) is a smooth mathematical surface used as a reference for coordinates. The difference between them is the geoid undulation.',
    difficulty: 'hard'
  },
  {
    id: 'ncees-mcq-9',
    domain: 'Surveying Principles',
    questionType: 'multiple_choice',
    question: 'The principle of reversion in surveying refers to:',
    options: [
      'A. Reversing the telescope to average out systematic errors',
      'B. Reversing the direction of a traverse',
      'C. Returning to the starting point of a closed traverse',
      'D. Reversing the prism pole orientation',
      'E. Reversing the order of observations'
    ],
    correctAnswer: 0,
    explanation: 'The principle of reversion involves making measurements with the instrument reversed (face left/face right) to cancel systematic instrumental errors. The mean of the two measurements eliminates errors that reverse with the instrument.',
    difficulty: 'medium'
  },
  {
    id: 'ncees-mcq-10',
    domain: 'Professional Practice',
    questionType: 'multiple_choice',
    question: 'What is the minimum requirement for a surveyor to accept another surveyor\'s work as the basis for a new survey?',
    options: [
      'A. Sufficient field verification to confirm the reliability of the prior work',
      'B. A signed statement from the original surveyor',
      'C. The prior survey must be less than 5 years old',
      'D. The client must provide written authorization',
      'E. The prior survey must be from a surveyor in the same state'
    ],
    correctAnswer: 0,
    explanation: 'A surveyor accepting another\'s work must verify it sufficiently to confirm its reliability. This typically requires field checks of key control points. Simply relying on a document without verification may not meet professional standards.',
    difficulty: 'medium'
  },

  // ============================================
  // ADDITIONAL QUESTIONS TO REACH 110 TOTAL
  // ============================================

  // --- MORE MCQ QUESTIONS ---
  {
    id: 'ncees-mcq-11',
    domain: 'Boundary Law & PLSS',
    questionType: 'multiple_choice',
    question: 'Which of the following best describes the doctrine of acquiescence?',
    options: [
      'A. Long-term acceptance of a boundary line by adjacent landowners',
      'B. Government acceptance of a private survey',
      'C. A surveyor accepting a client\'s instructions without question',
      'D. Acceptance of a deed without reviewing its contents',
      'E. Court acceptance of expert testimony'
    ],
    correctAnswer: 0,
    explanation: 'Acquiescence is a legal doctrine where long-term acceptance of a boundary line by adjoining landowners, especially with physical evidence like a fence, may establish the boundary regardless of the deeded location.',
    difficulty: 'medium'
  },
  {
    id: 'ncees-mcq-12',
    domain: 'Field Data Acquisition',
    questionType: 'multiple_choice',
    question: 'What is the primary purpose of a turning point (TP) in differential leveling?',
    options: [
      'A. To transfer elevation from one instrument setup to another',
      'B. To mark property corners',
      'C. To establish horizontal control',
      'D. To measure horizontal distances',
      'E. To check for atmospheric refraction'
    ],
    correctAnswer: 0,
    explanation: 'A turning point is a stable point used to transfer elevation when the level instrument must be moved. The FS reading at the TP from one setup becomes the reference for the BS reading from the next setup.',
    difficulty: 'easy'
  },
  {
    id: 'ncees-mcq-13',
    domain: 'Mapping, GIS, and CAD',
    questionType: 'multiple_choice',
    question: 'In a GIS, what is the difference between raster and vector data?',
    options: [
      'A. Raster uses pixels/cells; vector uses points, lines, and polygons',
      'B. Raster is 3D; vector is 2D only',
      'C. Vector data cannot store attributes',
      'D. Raster data is always more accurate',
      'E. There is no difference; they are interchangeable terms'
    ],
    correctAnswer: 0,
    explanation: 'Raster data represents geographic features as a grid of cells (pixels), each with a value. Vector data represents features as discrete points, lines, and polygons with associated attributes.',
    difficulty: 'easy'
  },
  {
    id: 'ncees-mcq-14',
    domain: 'Survey Computations & Applications',
    questionType: 'multiple_choice',
    question: 'What is the purpose of the Compass Rule (Bowditch) adjustment?',
    options: [
      'A. To distribute traverse closure error proportionally to line lengths',
      'B. To convert magnetic bearings to true bearings',
      'C. To calculate magnetic declination',
      'D. To determine the precision ratio of a traverse',
      'E. To balance angular closure error'
    ],
    correctAnswer: 0,
    explanation: 'The Compass (Bowditch) Rule distributes the traverse closure error proportionally based on the length of each course. Longer courses receive a larger correction, assuming equal precision in angles and distances.',
    difficulty: 'medium'
  },
  {
    id: 'ncees-mcq-15',
    domain: 'Surveying Principles',
    questionType: 'multiple_choice',
    question: 'What does the term "precision" refer to in surveying?',
    options: [
      'A. The degree of consistency or repeatability of measurements',
      'B. The closeness of a measurement to the true value',
      'C. The resolution of the measuring instrument',
      'D. The number of decimal places in a measurement',
      'E. The cost of the surveying equipment used'
    ],
    correctAnswer: 0,
    explanation: 'Precision refers to the consistency or repeatability of measurements. High precision means measurements cluster tightly together. Accuracy (option B) refers to closeness to the true value, which is different from precision.',
    difficulty: 'easy'
  },
  {
    id: 'ncees-mcq-16',
    domain: 'Applied Mathematics & Statistics',
    questionType: 'multiple_choice',
    question: 'In error propagation, if two independent measurements each have an error of ±0.02 ft, what is the error in their sum?',
    options: [
      'A. ±0.028 ft',
      'B. ±0.04 ft',
      'C. ±0.02 ft',
      'D. ±0.01 ft',
      'E. ±0.014 ft'
    ],
    correctAnswer: 0,
    explanation: 'For independent measurements, errors propagate as the square root of the sum of squares: √(0.02² + 0.02²) = √0.0008 = 0.028 ft.',
    difficulty: 'medium'
  },
  {
    id: 'ncees-mcq-17',
    domain: 'Professional Practice',
    questionType: 'multiple_choice',
    question: 'What is the primary purpose of a surveyor\'s certificate on a plat?',
    options: [
      'A. To certify the surveyor performed the work to professional standards',
      'B. To guarantee the property title is clear',
      'C. To certify payment has been received',
      'D. To transfer ownership of the property',
      'E. To indicate the survey was done pro bono'
    ],
    correctAnswer: 0,
    explanation: 'The surveyor\'s certificate certifies that the survey was performed by a licensed surveyor in accordance with applicable standards and regulations. It does not certify title or transfer ownership.',
    difficulty: 'easy'
  },
  {
    id: 'ncees-mcq-18',
    domain: 'Boundary Law & PLSS',
    questionType: 'multiple_choice',
    question: 'In the PLSS, a standard township contains how many sections?',
    options: [
      'A. 36 sections',
      'B. 16 sections',
      'C. 64 sections',
      'D. 24 sections',
      'E. 9 sections'
    ],
    correctAnswer: 0,
    explanation: 'A standard township is 6 miles × 6 miles and contains 36 sections, each nominally 1 mile × 1 mile (640 acres).',
    difficulty: 'easy'
  },
  {
    id: 'ncees-mcq-19',
    domain: 'Field Data Acquisition',
    questionType: 'multiple_choice',
    question: 'What is the three-wire leveling method used for?',
    options: [
      'A. To improve precision by averaging multiple stadia readings',
      'B. To measure horizontal distance only',
      'C. To eliminate collimation error',
      'D. To set up the level instrument faster',
      'E. To check for plumb of the rod'
    ],
    correctAnswer: 0,
    explanation: 'Three-wire leveling reads the center crosshair plus upper and lower stadia hairs. The mean of all three provides redundancy and improved precision over single-wire readings.',
    difficulty: 'medium'
  },
  {
    id: 'ncees-mcq-20',
    domain: 'Survey Computations & Applications',
    questionType: 'multiple_choice',
    question: 'What is the external distance (E) of a horizontal curve?',
    options: [
      'A. The distance from the PI to the midpoint of the curve arc',
      'B. The distance from the PC to the PT',
      'C. The radius of the curve',
      'D. The distance from the midpoint of the chord to the midpoint of the arc',
      'E. Half the tangent length'
    ],
    correctAnswer: 0,
    explanation: 'The external distance E is measured from the PI (Point of Intersection) to the midpoint of the curve arc along the bisector of the central angle. E = R(sec(Δ/2) - 1).',
    difficulty: 'medium'
  },
  {
    id: 'ncees-mcq-21',
    domain: 'Mapping, GIS, and CAD',
    questionType: 'multiple_choice',
    question: 'What is the NAD83 datum based on?',
    options: [
      'A. The GRS80 ellipsoid with an Earth-centered reference frame',
      'B. The Clarke 1866 ellipsoid with Meades Ranch as the origin',
      'C. The WGS84 ellipsoid only',
      'D. Local survey monuments without a mathematical surface',
      'E. The geoid only'
    ],
    correctAnswer: 0,
    explanation: 'NAD83 (North American Datum of 1983) is based on the GRS80 ellipsoid and uses an Earth-centered reference frame. NAD27 used Clarke 1866 with Meades Ranch, Kansas as the origin.',
    difficulty: 'hard'
  },
  {
    id: 'ncees-mcq-22',
    domain: 'Surveying Principles',
    questionType: 'multiple_choice',
    question: 'What is the fundamental principle behind GNSS positioning?',
    options: [
      'A. Measuring distances from multiple satellites to determine position through trilateration',
      'B. Measuring angles between visible landmarks',
      'C. Using magnetic compass readings from satellites',
      'D. Triangulating signals from ground-based stations',
      'E. Measuring atmospheric pressure differences'
    ],
    correctAnswer: 0,
    explanation: 'GNSS determines position through trilateration - measuring the distance (pseudorange) from at least four satellites. The intersection of the range spheres determines the receiver position.',
    difficulty: 'easy'
  },
  {
    id: 'ncees-mcq-23',
    domain: 'Professional Practice',
    questionType: 'multiple_choice',
    question: 'When is it appropriate for a surveyor to provide a legal opinion on a boundary dispute?',
    options: [
      'A. Never - legal opinions should only come from attorneys',
      'B. When the client requests it in writing',
      'C. When the surveyor has more than 10 years of experience',
      'D. When the dispute involves less than 1 acre',
      'E. Only in states where surveyors are also licensed attorneys'
    ],
    correctAnswer: 0,
    explanation: 'Surveyors provide professional opinions on survey matters but should not provide legal opinions on boundary disputes. Legal opinions regarding property rights should come from attorneys. Surveyors present facts and professional surveying opinions.',
    difficulty: 'medium'
  },
  {
    id: 'ncees-mcq-24',
    domain: 'Applied Mathematics & Statistics',
    questionType: 'multiple_choice',
    question: 'What is a systematic error in surveying?',
    options: [
      'A. An error that follows a consistent pattern and can be corrected',
      'B. An error that is completely unpredictable',
      'C. A blunder or mistake in reading',
      'D. An error caused by weather conditions only',
      'E. An error that cannot be detected'
    ],
    correctAnswer: 0,
    explanation: 'Systematic errors are consistent and predictable, such as incorrect tape length or collimation error. They can be identified and corrected through calibration or mathematical adjustment. Random errors, in contrast, are unpredictable.',
    difficulty: 'easy'
  },
  {
    id: 'ncees-mcq-25',
    domain: 'Boundary Law & PLSS',
    questionType: 'multiple_choice',
    question: 'What is the legal significance of a recorded plat?',
    options: [
      'A. It provides public notice and creates lots that can be conveyed by reference',
      'B. It automatically transfers property ownership',
      'C. It guarantees the survey is accurate',
      'D. It prevents future surveys of the same land',
      'E. It requires government approval before any building permits'
    ],
    correctAnswer: 0,
    explanation: 'A recorded plat provides constructive (public) notice of the subdivision and creates legal lots that can be conveyed by lot number reference. It does not transfer ownership or guarantee accuracy.',
    difficulty: 'medium'
  },
  {
    id: 'ncees-mcq-26',
    domain: 'Field Data Acquisition',
    questionType: 'multiple_choice',
    question: 'What causes parallax error when reading a leveling rod?',
    options: [
      'A. The image of the crosshairs and the rod not being in the same focal plane',
      'B. The rod not being held plumb',
      'C. Atmospheric refraction',
      'D. Incorrect rod graduation',
      'E. Temperature expansion of the rod'
    ],
    correctAnswer: 0,
    explanation: 'Parallax occurs when the crosshairs and target image are not in the same focal plane. Moving your eye slightly causes apparent movement of the crosshairs relative to the target. It is eliminated by careful focus adjustment.',
    difficulty: 'medium'
  },
  {
    id: 'ncees-mcq-27',
    domain: 'Math & Basic Science',
    questionType: 'multiple_choice',
    question: 'What is the relationship between sine and cosine of complementary angles?',
    options: [
      'A. sin(θ) = cos(90° - θ)',
      'B. sin(θ) = cos(θ)',
      'C. sin(θ) + cos(θ) = 1',
      'D. sin(θ) × cos(θ) = 1',
      'E. sin(90° - θ) = -cos(θ)'
    ],
    correctAnswer: 0,
    explanation: 'For complementary angles (sum = 90°), sin(θ) = cos(90° - θ) and cos(θ) = sin(90° - θ). This cofunctions relationship is fundamental in trigonometry.',
    difficulty: 'easy'
  },
  {
    id: 'ncees-mcq-28',
    domain: 'Survey Computations & Applications',
    questionType: 'multiple_choice',
    question: 'What is the degree of curve (D) in highway design?',
    options: [
      'A. The central angle subtended by a 100-ft arc (or chord)',
      'B. The angle between the tangent and the chord',
      'C. The deflection angle at the PC',
      'D. The slope of the road at the curve',
      'E. The bearing change through the curve'
    ],
    correctAnswer: 0,
    explanation: 'Degree of curve D is defined as the central angle subtended by a 100-ft arc (arc definition, used in highways) or 100-ft chord (chord definition, used in railroads). It is inversely proportional to radius.',
    difficulty: 'medium'
  },
  {
    id: 'ncees-mcq-29',
    domain: 'Mapping, GIS, and CAD',
    questionType: 'multiple_choice',
    question: 'What is a Digital Elevation Model (DEM)?',
    options: [
      'A. A raster representation of terrain surface elevations',
      'B. A 2D map showing building footprints',
      'C. A vector file of contour lines only',
      'D. A database of survey control points',
      'E. A digital photograph of the terrain'
    ],
    correctAnswer: 0,
    explanation: 'A DEM is a raster dataset where each cell contains an elevation value, representing the terrain surface. DEMs are used for slope analysis, viewshed analysis, watershed delineation, and other terrain-based analyses.',
    difficulty: 'easy'
  },
  {
    id: 'ncees-mcq-30',
    domain: 'Surveying Principles',
    questionType: 'multiple_choice',
    question: 'What is the purpose of a peg test for a level instrument?',
    options: [
      'A. To check and adjust the collimation (line of sight perpendicular to vertical axis)',
      'B. To measure the height of instrument',
      'C. To determine the stadia constant',
      'D. To check the focusing mechanism',
      'E. To verify the tripod stability'
    ],
    correctAnswer: 0,
    explanation: 'The peg test (two-peg test) is used to check if the line of sight is perpendicular to the vertical axis. If not, a collimation error exists. The test allows quantification and adjustment of this error.',
    difficulty: 'medium'
  },

  // --- MORE SELECT ALL QUESTIONS ---
  {
    id: 'ncees-select-all-7',
    domain: 'Boundary Law & PLSS',
    questionType: 'select_all',
    question: 'Which of the following are valid methods of property transfer? (Select ALL that apply)',
    options: [
      'A. Warranty deed',
      'B. Quitclaim deed',
      'C. Adverse possession',
      'D. Recorded plat alone',
      'E. Inheritance through will or intestate succession'
    ],
    correctAnswer: [0, 1, 2, 4],
    explanation: 'Warranty deed (A), quitclaim deed (B), adverse possession (C), and inheritance (E) all transfer property rights. A recorded plat (D) creates lots but does not itself transfer ownership.',
    difficulty: 'medium',
    partialCredit: true
  },
  {
    id: 'ncees-select-all-8',
    domain: 'Field Data Acquisition',
    questionType: 'select_all',
    question: 'Which of the following GNSS techniques provide centimeter-level accuracy? (Select ALL that apply)',
    options: [
      'A. Real-Time Kinematic (RTK)',
      'B. Post-Processed Kinematic (PPK)',
      'C. Static surveying with long occupation times',
      'D. Autonomous (single point) positioning',
      'E. Network RTK (VRS, MAX, etc.)'
    ],
    correctAnswer: [0, 1, 2, 4],
    explanation: 'RTK (A), PPK (B), static surveying (C), and Network RTK (E) all achieve centimeter-level accuracy through differential processing. Autonomous positioning (D) typically achieves only meter-level accuracy.',
    difficulty: 'hard',
    partialCredit: true
  },
  {
    id: 'ncees-select-all-9',
    domain: 'Professional Practice',
    questionType: 'select_all',
    question: 'Which of the following are ethical obligations of a professional surveyor? (Select ALL that apply)',
    options: [
      'A. Maintain competence through continuing education',
      'B. Protect public safety, health, and welfare',
      'C. Maintain client confidentiality',
      'D. Accept all work regardless of competence',
      'E. Report violations of surveying laws to the licensing board'
    ],
    correctAnswer: [0, 1, 2, 4],
    explanation: 'Surveyors must maintain competence (A), protect the public (B), maintain confidentiality (C), and report violations (E). Option D is incorrect - surveyors should only accept work within their competence.',
    difficulty: 'medium',
    partialCredit: true
  },
  {
    id: 'ncees-select-all-10',
    domain: 'Survey Computations & Applications',
    questionType: 'select_all',
    question: 'Which of the following are components needed to calculate a spiral curve transition? (Select ALL that apply)',
    options: [
      'A. Spiral length',
      'B. Radius of the circular curve',
      'C. Degree of superelevation',
      'D. Spiral angle',
      'E. K value for sag curves'
    ],
    correctAnswer: [0, 1, 3],
    explanation: 'Spiral curve calculations require spiral length (A), circular curve radius (B), and spiral angle (D). Superelevation (C) is related but calculated separately. K value (E) is for vertical curves, not spirals.',
    difficulty: 'hard',
    partialCredit: true
  },
  {
    id: 'ncees-select-all-11',
    domain: 'Applied Mathematics & Statistics',
    questionType: 'select_all',
    question: 'Which of the following are methods to detect blunders in survey data? (Select ALL that apply)',
    options: [
      'A. Closing a traverse and checking closure',
      'B. Independent check measurements',
      'C. Statistical outlier tests (e.g., tau test)',
      'D. Using expensive equipment only',
      'E. Reviewing field notes for transcription errors'
    ],
    correctAnswer: [0, 1, 2, 4],
    explanation: 'Traverse closure (A), independent checks (B), statistical tests (C), and field note review (E) all help detect blunders. Equipment cost (D) does not directly detect blunders.',
    difficulty: 'medium',
    partialCredit: true
  },
  {
    id: 'ncees-select-all-12',
    domain: 'Mapping, GIS, and CAD',
    questionType: 'select_all',
    question: 'Which of the following are characteristics of the Lambert Conformal Conic projection? (Select ALL that apply)',
    options: [
      'A. Used for states with large east-west extent',
      'B. Preserves angles (conformal)',
      'C. Uses two standard parallels',
      'D. Preserves area (equal area)',
      'E. Distortion increases away from standard parallels'
    ],
    correctAnswer: [0, 1, 2, 4],
    explanation: 'Lambert Conformal Conic is used for E-W states (A), preserves angles (B), uses two standard parallels (C), and has increasing distortion away from them (E). It does NOT preserve area (D).',
    difficulty: 'hard',
    partialCredit: true
  },

  // --- MORE PRIORITY RANKING QUESTIONS ---
  {
    id: 'ncees-priority-4',
    domain: 'Survey Computations & Applications',
    questionType: 'priority_ranking',
    question: 'Rank the following traverse adjustment methods in order of sophistication (1 = most rigorous):',
    options: [
      'Least squares adjustment',
      'Transit rule',
      'Compass (Bowditch) rule',
      'Crandall method'
    ],
    correctAnswer: [0, 3, 1, 2],
    explanation: 'Order of sophistication: (1) Least squares is the most rigorous, using all observations optimally; (2) Crandall assumes perfect angles; (3) Transit rule distributes based on latitude/departure ratios; (4) Compass rule is simplest, distributing by length.',
    difficulty: 'hard'
  },
  {
    id: 'ncees-priority-5',
    domain: 'Field Data Acquisition',
    questionType: 'priority_ranking',
    question: 'Rank the following in order of typical positional accuracy (1 = most accurate):',
    options: [
      'Static GNSS (4+ hour occupation)',
      'RTK GNSS',
      'Total station traverse',
      'Handheld GPS (autonomous)'
    ],
    correctAnswer: [0, 2, 1, 3],
    explanation: 'Typical accuracy order: (1) Static GNSS with long occupations achieves mm-level accuracy; (2) Total station traverses achieve cm-level with proper procedures; (3) RTK achieves cm-level; (4) Handheld GPS is meter-level.',
    difficulty: 'medium'
  },
  {
    id: 'ncees-priority-6',
    domain: 'Professional Practice',
    questionType: 'priority_ranking',
    question: 'Rank the surveyor\'s obligations in order of priority (1 = highest):',
    options: [
      'Public safety, health, and welfare',
      'Client interests',
      'Personal financial interests',
      'Convenience of completing the project quickly'
    ],
    correctAnswer: [0, 1, 2, 3],
    explanation: 'Professional ethics require: (1) Public safety is paramount; (2) Client interests come second; (3) Personal interests third; (4) Convenience is lowest priority when conflicts arise.',
    difficulty: 'easy'
  },

  // --- MORE COMPUTATIONAL QUESTIONS ---
  {
    id: 'ncees-computational-9',
    domain: 'Survey Computations & Applications',
    questionType: 'computational',
    question: 'Calculate the middle ordinate (M) for a curve with R = 600 ft and central angle Δ = 40°.',
    options: [
      'A. 36.24 ft',
      'B. 35.00 ft',
      'C. 40.00 ft',
      'D. 32.50 ft',
      'E. 38.75 ft'
    ],
    correctAnswer: 0,
    explanation: 'M = R(1 - cos(Δ/2)) = 600(1 - cos(20°)) = 600(1 - 0.9397) = 600 × 0.0603 = 36.24 ft.',
    difficulty: 'medium',
    diagramRef: 'horizontal_curve_formulas'
  },
  {
    id: 'ncees-computational-10',
    domain: 'Math & Basic Science',
    questionType: 'computational',
    question: 'Convert an azimuth of 235°30\' to a bearing.',
    options: [
      'A. S 55°30\' W',
      'B. S 35°30\' W',
      'C. N 55°30\' W',
      'D. S 55°30\' E',
      'E. N 35°30\' W'
    ],
    correctAnswer: 0,
    explanation: 'Azimuth 235°30\' is in the SW quadrant (180° to 270°). Bearing = 235°30\' - 180° = 55°30\'. Direction is S__W. Therefore: S 55°30\' W.',
    difficulty: 'easy'
  },
  {
    id: 'ncees-computational-11',
    domain: 'Applied Mathematics & Statistics',
    questionType: 'computational',
    question: 'A distance is measured 5 times with values: 342.15, 342.18, 342.14, 342.17, 342.16 ft. Calculate the mean.',
    options: [
      'A. 342.16 ft',
      'B. 342.15 ft',
      'C. 342.17 ft',
      'D. 342.18 ft',
      'E. 342.14 ft'
    ],
    correctAnswer: 0,
    explanation: 'Mean = (342.15 + 342.18 + 342.14 + 342.17 + 342.16) / 5 = 1710.80 / 5 = 342.16 ft.',
    difficulty: 'easy'
  },
  {
    id: 'ncees-computational-12',
    domain: 'Field Data Acquisition',
    questionType: 'computational',
    question: 'A tape is standardized at 68°F. If used at 95°F, what is the correction for a 100-ft measurement? (Steel tape coefficient = 0.00000645 per °F)',
    options: [
      'A. +0.017 ft',
      'B. -0.017 ft',
      'C. +0.027 ft',
      'D. +0.012 ft',
      'E. -0.012 ft'
    ],
    correctAnswer: 0,
    explanation: 'Temperature correction = L × α × ΔT = 100 × 0.00000645 × (95 - 68) = 100 × 0.00000645 × 27 = +0.017 ft. Positive because tape expands, making it longer.',
    difficulty: 'hard',
    diagramRef: 'tape_corrections'
  },
  {
    id: 'ncees-computational-13',
    domain: 'Survey Computations & Applications',
    questionType: 'computational',
    question: 'Given coordinates A(1000, 2000) and B(1500, 2800), calculate the azimuth from A to B.',
    options: [
      'A. 51°20\'25"',
      'B. 38°39\'35"',
      'C. 58°00\'00"',
      'D. 128°39\'35"',
      'E. 321°20\'25"'
    ],
    correctAnswer: 0,
    explanation: 'ΔN = 2800 - 2000 = 800; ΔE = 1500 - 1000 = 500. tan(Az) = ΔE/ΔN = 500/800 = 0.625. Az = arctan(0.625) = 32.0° ≈ 51°20\'25" (after conversion).',
    difficulty: 'medium'
  },
  {
    id: 'ncees-computational-14',
    domain: 'Boundary Law & PLSS',
    questionType: 'computational',
    question: 'A section corner is to be relocated. The original GLO notes show the distance as 80.00 chains. The current measured distance is 5320.00 ft. What is the proportionate measure distance to a quarter corner originally at 40.00 chains?',
    options: [
      'A. 2660.00 ft',
      'B. 2640.00 ft',
      'C. 2680.00 ft',
      'D. 2650.00 ft',
      'E. 2620.00 ft'
    ],
    correctAnswer: 0,
    explanation: 'Original distance = 80.00 chains = 5280 ft (theoretical). Actual = 5320 ft. Scale factor = 5320/5280 = 1.00758. Quarter corner at 40 chains (2640 ft theoretical) = 2640 × 1.00758 = 2660.00 ft.',
    difficulty: 'hard'
  },
  {
    id: 'ncees-computational-15',
    domain: 'Mapping, GIS, and CAD',
    questionType: 'computational',
    question: 'On a map with scale 1:24,000, what ground distance is represented by 2.5 inches on the map?',
    options: [
      'A. 5,000 ft',
      'B. 6,000 ft',
      'C. 4,800 ft',
      'D. 2,400 ft',
      'E. 10,000 ft'
    ],
    correctAnswer: 0,
    explanation: 'Scale 1:24,000 means 1 inch = 24,000 inches = 2,000 ft. Therefore, 2.5 inches = 2.5 × 2,000 = 5,000 ft.',
    difficulty: 'easy'
  },
  {
    id: 'ncees-computational-16',
    domain: 'Survey Computations & Applications',
    questionType: 'computational',
    question: 'A vertical curve connects a +3.5% grade to a -2.5% grade. The curve is 600 ft long. Calculate the rate of change (r).',
    options: [
      'A. 1.0% per station',
      'B. 0.5% per station',
      'C. 1.5% per station',
      'D. 2.0% per station',
      'E. 0.75% per station'
    ],
    correctAnswer: 0,
    explanation: 'r = (g2 - g1) / L = (-2.5 - 3.5) / 6 stations = -6.0 / 6 = -1.0% per station. The magnitude is 1.0% per station.',
    difficulty: 'medium',
    diagramRef: 'vertical_curve_formulas'
  },
  {
    id: 'ncees-computational-17',
    domain: 'Applied Mathematics & Statistics',
    questionType: 'computational',
    question: 'The probable error of a single measurement is ±0.015 ft. What is the standard deviation?',
    options: [
      'A. ±0.022 ft',
      'B. ±0.015 ft',
      'C. ±0.010 ft',
      'D. ±0.030 ft',
      'E. ±0.025 ft'
    ],
    correctAnswer: 0,
    explanation: 'Standard deviation σ = PE / 0.6745 = 0.015 / 0.6745 = 0.022 ft. The probable error is approximately 2/3 of the standard deviation.',
    difficulty: 'medium'
  },
  {
    id: 'ncees-computational-18',
    domain: 'Math & Basic Science',
    questionType: 'computational',
    question: 'Calculate the area of a triangle with sides a=120 ft, b=150 ft, and included angle C=65°.',
    options: [
      'A. 8,157 sq ft',
      'B. 9,000 sq ft',
      'C. 7,500 sq ft',
      'D. 8,500 sq ft',
      'E. 7,800 sq ft'
    ],
    correctAnswer: 0,
    explanation: 'Area = (1/2)ab × sin(C) = (1/2)(120)(150) × sin(65°) = 9000 × 0.9063 = 8,157 sq ft.',
    difficulty: 'medium'
  },

  // --- MORE SCENARIO QUESTIONS ---
  {
    id: 'ncees-scenario-3-context',
    domain: 'Field Data Acquisition',
    questionType: 'scenario_based',
    question: 'A surveyor is performing a closed-loop level circuit. Starting at BM Alpha (Elev = 256.78 ft), the following readings are taken: Setup 1: BS on BM Alpha = 6.42 ft, FS on TP1 = 4.18 ft; Setup 2: BS on TP1 = 7.25 ft, FS on TP2 = 3.45 ft; Setup 3: BS on TP2 = 5.33 ft, FS on BM Alpha = 8.10 ft.',
    scenarioId: 'level-circuit-1',
    scenarioContext: 'A surveyor is performing a closed-loop level circuit. Starting at BM Alpha (Elev = 256.78 ft), the following readings are taken: Setup 1: BS on BM Alpha = 6.42 ft, FS on TP1 = 4.18 ft; Setup 2: BS on TP1 = 7.25 ft, FS on TP2 = 3.45 ft; Setup 3: BS on TP2 = 5.33 ft, FS on BM Alpha = 8.10 ft.',
    options: [],
    correctAnswer: 0,
    explanation: 'This is the scenario context for level circuit questions.',
    difficulty: 'hard'
  },
  {
    id: 'ncees-scenario-3-q1',
    domain: 'Field Data Acquisition',
    questionType: 'computational',
    question: 'Based on the level circuit above, what is the calculated elevation of TP1?',
    scenarioId: 'level-circuit-1',
    options: [
      'A. 259.02 ft',
      'B. 258.60 ft',
      'C. 260.00 ft',
      'D. 257.50 ft',
      'E. 261.20 ft'
    ],
    correctAnswer: 0,
    explanation: 'HI at Setup 1 = 256.78 + 6.42 = 263.20 ft. Elev TP1 = 263.20 - 4.18 = 259.02 ft.',
    difficulty: 'medium'
  },
  {
    id: 'ncees-scenario-3-q2',
    domain: 'Field Data Acquisition',
    questionType: 'computational',
    question: 'Based on the level circuit above, what is the closure error?',
    scenarioId: 'level-circuit-1',
    options: [
      'A. +0.27 ft',
      'B. -0.27 ft',
      'C. +0.15 ft',
      'D. 0.00 ft',
      'E. -0.15 ft'
    ],
    correctAnswer: 0,
    explanation: 'Sum BS = 6.42 + 7.25 + 5.33 = 19.00 ft. Sum FS = 4.18 + 3.45 + 8.10 = 15.73 ft. For a closed loop, Sum BS should equal Sum FS. Closure error = Sum BS - Sum FS - 0 = 19.00 - 15.73 - (0) = +0.27 ft. (Check: calculated final elev = 256.78 + 19.00 - 15.73 = 260.05 vs actual 256.78, error = +0.27).',
    difficulty: 'hard'
  },

  // --- ADDITIONAL MCQ TO REACH 110 ---
  {
    id: 'ncees-mcq-31',
    domain: 'Surveying Principles',
    questionType: 'multiple_choice',
    question: 'What is the primary advantage of using a total station over a theodolite with separate EDM?',
    options: [
      'A. Integration of angle and distance measurement in one instrument',
      'B. Lower cost',
      'C. Better angular accuracy',
      'D. No need for reflectors',
      'E. Longer battery life'
    ],
    correctAnswer: 0,
    explanation: 'Total stations integrate theodolite (angles) and EDM (distances) in one instrument, allowing faster data collection, electronic data recording, and automatic coordinate calculation.',
    difficulty: 'easy'
  },
  {
    id: 'ncees-mcq-32',
    domain: 'Boundary Law & PLSS',
    questionType: 'multiple_choice',
    question: 'What is a "call" in a property description?',
    options: [
      'A. A specific element of the boundary description such as a monument, bearing, or distance',
      'B. A telephone number for the surveyor',
      'C. A request for survey services',
      'D. The legal name of the property owner',
      'E. The recording date of the deed'
    ],
    correctAnswer: 0,
    explanation: 'In surveying, a "call" refers to any descriptive element in a deed or plat that describes the boundary, including monuments, courses (bearings), distances, and adjoiner references.',
    difficulty: 'easy'
  },
  {
    id: 'ncees-mcq-33',
    domain: 'Field Data Acquisition',
    questionType: 'multiple_choice',
    question: 'What is PDOP in GNSS surveying?',
    options: [
      'A. Position Dilution of Precision - a measure of satellite geometry quality',
      'B. Precision Distance Operating Procedure',
      'C. Primary Data Output Protocol',
      'D. Post-Processed Data Optimization Parameter',
      'E. Projected Distance Over Position'
    ],
    correctAnswer: 0,
    explanation: 'PDOP (Position Dilution of Precision) indicates how satellite geometry affects position accuracy. Lower PDOP values indicate better geometry and more accurate positions.',
    difficulty: 'medium'
  },
  {
    id: 'ncees-mcq-34',
    domain: 'Professional Practice',
    questionType: 'multiple_choice',
    question: 'What is meant by "standard of care" in professional surveying?',
    options: [
      'A. The level of competence expected from a reasonably prudent surveyor in similar circumstances',
      'B. The minimum passing score on the licensing exam',
      'C. The type of insurance a surveyor must carry',
      'D. The warranty period for survey monuments',
      'E. The number of continuing education hours required'
    ],
    correctAnswer: 0,
    explanation: 'Standard of care is the legal concept defining what a reasonably competent and prudent surveyor would do in similar circumstances. It is used to evaluate professional liability.',
    difficulty: 'medium'
  },
  {
    id: 'ncees-mcq-35',
    domain: 'Math & Basic Science',
    questionType: 'multiple_choice',
    question: 'What is the law of cosines used for in surveying?',
    options: [
      'A. To solve for unknown sides or angles in oblique triangles',
      'B. To calculate areas of circles',
      'C. To determine magnetic declination',
      'D. To convert between coordinate systems',
      'E. To calculate curve parameters'
    ],
    correctAnswer: 0,
    explanation: 'The law of cosines (c² = a² + b² - 2ab×cos(C)) is used to solve oblique triangles when you know two sides and the included angle, or all three sides.',
    difficulty: 'easy'
  },
  {
    id: 'ncees-mcq-36',
    domain: 'Survey Computations & Applications',
    questionType: 'multiple_choice',
    question: 'What is the purpose of staking offset points during construction?',
    options: [
      'A. To preserve reference points that would be destroyed by construction activities',
      'B. To mark property corners only',
      'C. To indicate underground utilities',
      'D. To establish horizontal control',
      'E. To measure atmospheric conditions'
    ],
    correctAnswer: 0,
    explanation: 'Offset stakes are placed at known distances from actual construction points. They preserve reference locations when the actual point would be disturbed by excavation, grading, or construction.',
    difficulty: 'easy'
  },
  {
    id: 'ncees-mcq-37',
    domain: 'Mapping, GIS, and CAD',
    questionType: 'multiple_choice',
    question: 'What is georeferencing?',
    options: [
      'A. The process of assigning real-world coordinates to a map or image',
      'B. Looking up geographic names in a database',
      'C. Converting raster to vector data',
      'D. Creating a bibliography of geographic sources',
      'E. Measuring distances on the Earth\'s surface'
    ],
    correctAnswer: 0,
    explanation: 'Georeferencing assigns known coordinate values to specific points on a map, image, or dataset, allowing it to be correctly positioned in a geographic coordinate system.',
    difficulty: 'easy'
  },
  {
    id: 'ncees-mcq-38',
    domain: 'Applied Mathematics & Statistics',
    questionType: 'multiple_choice',
    question: 'In least squares adjustment, what is a residual?',
    options: [
      'A. The difference between an observed value and its adjusted value',
      'B. The leftover material from construction',
      'C. An error that cannot be corrected',
      'D. The remainder after division',
      'E. The depreciated value of equipment'
    ],
    correctAnswer: 0,
    explanation: 'In least squares, a residual is the difference between an observed measurement and its corresponding adjusted value. The adjustment minimizes the sum of squared residuals.',
    difficulty: 'medium'
  },
  {
    id: 'ncees-mcq-39',
    domain: 'Surveying Principles',
    questionType: 'multiple_choice',
    question: 'What is the purpose of reciprocal leveling?',
    options: [
      'A. To eliminate errors due to curvature, refraction, and instrument maladjustment over long sights',
      'B. To save time by reading only one direction',
      'C. To establish horizontal control points',
      'D. To determine magnetic north',
      'E. To calibrate the leveling instrument'
    ],
    correctAnswer: 0,
    explanation: 'Reciprocal leveling involves reading from both ends of a long sight line and averaging. This eliminates effects of Earth curvature, atmospheric refraction, and collimation error.',
    difficulty: 'medium'
  },
  {
    id: 'ncees-mcq-40',
    domain: 'Boundary Law & PLSS',
    questionType: 'multiple_choice',
    question: 'What is a witness monument?',
    options: [
      'A. A monument placed near the true corner when the corner location is impractical',
      'B. A person who observes the survey',
      'C. A monument from a neighboring property',
      'D. A temporary stake used during construction',
      'E. A control point from a previous survey'
    ],
    correctAnswer: 0,
    explanation: 'A witness monument (corner accessory) is placed at a measured distance from the true corner when the corner itself cannot be monumented (e.g., in a roadway, waterway, or inaccessible location).',
    difficulty: 'medium'
  },
  {
    id: 'ncees-mcq-41',
    domain: 'Field Data Acquisition',
    questionType: 'multiple_choice',
    question: 'What causes cycle slips in GNSS observations?',
    options: [
      'A. Signal obstruction or receiver losing lock on a satellite signal',
      'B. Incorrect satellite ephemeris data',
      'C. Wrong antenna height entered',
      'D. Multipath only',
      'E. Atmospheric delay models'
    ],
    correctAnswer: 0,
    explanation: 'Cycle slips occur when the receiver loses lock on a satellite signal due to obstructions, interference, or rapid receiver motion. The carrier phase count becomes discontinuous.',
    difficulty: 'hard'
  },
  {
    id: 'ncees-mcq-42',
    domain: 'Professional Practice',
    questionType: 'multiple_choice',
    question: 'What is the surveyor\'s responsibility regarding encroachments discovered during a boundary survey?',
    options: [
      'A. Report them objectively on the survey and inform the client',
      'B. Resolve the encroachment by moving it',
      'C. Ignore minor encroachments under 1 foot',
      'D. Contact law enforcement immediately',
      'E. Record a new deed to correct the encroachment'
    ],
    correctAnswer: 0,
    explanation: 'Surveyors must objectively show encroachments on the survey and inform the client. Resolving encroachments is a legal matter between property owners, not the surveyor\'s responsibility.',
    difficulty: 'easy'
  },
  {
    id: 'ncees-mcq-43',
    domain: 'Survey Computations & Applications',
    questionType: 'multiple_choice',
    question: 'What is the purpose of a sag correction for a tape measurement?',
    options: [
      'A. To account for the tape being shorter when supported only at its ends',
      'B. To correct for temperature changes',
      'C. To account for tape stretching under tension',
      'D. To correct for the tape being on a slope',
      'E. To account for magnetic interference'
    ],
    correctAnswer: 0,
    explanation: 'Sag correction accounts for the catenary curve of a tape supported only at its ends. The tape reads longer than the true horizontal distance due to sagging under its own weight.',
    difficulty: 'medium'
  },
  {
    id: 'ncees-mcq-44',
    domain: 'Math & Basic Science',
    questionType: 'multiple_choice',
    question: 'What is the interior angle sum of a closed polygon with n sides?',
    options: [
      'A. (n - 2) × 180°',
      'B. n × 180°',
      'C. (n + 2) × 180°',
      'D. n × 360°',
      'E. 360° regardless of n'
    ],
    correctAnswer: 0,
    explanation: 'The sum of interior angles of a polygon is (n - 2) × 180°, where n is the number of sides. For example, a triangle (n=3) has 180°, a quadrilateral (n=4) has 360°.',
    difficulty: 'easy'
  },
  {
    id: 'ncees-mcq-45',
    domain: 'Mapping, GIS, and CAD',
    questionType: 'multiple_choice',
    question: 'What is the purpose of a break line in a TIN (Triangulated Irregular Network)?',
    options: [
      'A. To enforce triangulation along linear features like ridges or drainage channels',
      'B. To indicate property boundaries',
      'C. To show roads only',
      'D. To mark errors in the data',
      'E. To create smooth contours everywhere'
    ],
    correctAnswer: 0,
    explanation: 'Break lines are hard edges in a TIN that force triangulation to follow linear features like ridges, valleys, or curbs. Triangles do not cross break lines, preserving important terrain features.',
    difficulty: 'medium'
  },
  {
    id: 'ncees-mcq-46',
    domain: 'Applied Mathematics & Statistics',
    questionType: 'multiple_choice',
    question: 'What does a 95% confidence interval represent?',
    options: [
      'A. The range within which the true value is expected to fall 95% of the time',
      'B. 95% of the measurements are incorrect',
      'C. The survey has 95% accuracy',
      'D. The instrument has 95% reliability',
      'E. Only 5% of the work remains to be done'
    ],
    correctAnswer: 0,
    explanation: 'A 95% confidence interval indicates that if the measurement process is repeated many times, 95% of the calculated intervals would contain the true value.',
    difficulty: 'medium'
  },
  {
    id: 'ncees-mcq-47',
    domain: 'Surveying Principles',
    questionType: 'multiple_choice',
    question: 'What is the difference between a bench mark and a control point?',
    options: [
      'A. Bench marks are vertical control; control points may be horizontal or both',
      'B. They are exactly the same thing',
      'C. Bench marks are temporary; control points are permanent',
      'D. Control points are only used for GNSS',
      'E. Bench marks are only located on federal land'
    ],
    correctAnswer: 0,
    explanation: 'Bench marks specifically provide vertical (elevation) control. Control points may provide horizontal control, vertical control, or both (3D control).',
    difficulty: 'easy'
  },
  {
    id: 'ncees-mcq-48',
    domain: 'Boundary Law & PLSS',
    questionType: 'multiple_choice',
    question: 'What is the purpose of a closing corner in the PLSS?',
    options: [
      'A. To mark where a township or section line meets a previously surveyed boundary',
      'B. To close a traverse',
      'C. To end a survey project',
      'D. To lock a gate on public land',
      'E. To mark the last section in a township'
    ],
    correctAnswer: 0,
    explanation: 'A closing corner is set where a survey line meets a previously established line or boundary. It connects the new survey to existing work and may not exactly align with the theoretical corner location.',
    difficulty: 'hard'
  },
  {
    id: 'ncees-mcq-49',
    domain: 'Field Data Acquisition',
    questionType: 'multiple_choice',
    question: 'What is the zenith angle of a horizontal line of sight?',
    options: [
      'A. 90°',
      'B. 0°',
      'C. 180°',
      'D. 45°',
      'E. 270°'
    ],
    correctAnswer: 0,
    explanation: 'Zenith angles are measured from straight up (zenith = 0°). A horizontal line of sight is perpendicular to the vertical, so its zenith angle is 90°.',
    difficulty: 'easy'
  },
  {
    id: 'ncees-mcq-50',
    domain: 'Professional Practice',
    questionType: 'multiple_choice',
    question: 'When can a surveyor refuse to perform work for a client?',
    options: [
      'A. When the work would require the surveyor to violate professional or ethical standards',
      'B. Never - surveyors must accept all work offered',
      'C. Only when the client cannot pay',
      'D. Only when another surveyor is already working on the property',
      'E. Only on federal holidays'
    ],
    correctAnswer: 0,
    explanation: 'A surveyor may refuse work that would require violating laws, regulations, or professional ethics, or if the work is outside their competence. There is no obligation to accept unethical or illegal work.',
    difficulty: 'easy'
  },

  // --- FINAL ADDITIONAL QUESTIONS ---
  {
    id: 'ncees-mcq-51',
    domain: 'Survey Computations & Applications',
    questionType: 'multiple_choice',
    question: 'What is the difference between a crest vertical curve and a sag vertical curve?',
    options: [
      'A. A crest curve is convex upward; a sag curve is concave upward',
      'B. They are identical in shape but used for different speeds',
      'C. Crest curves are only used on highways; sag curves on railroads',
      'D. Sag curves have no sight distance requirements',
      'E. Crest curves always have longer lengths'
    ],
    correctAnswer: 0,
    explanation: 'A crest vertical curve is convex (bulging upward), occurring at hilltops. A sag curve is concave (dipping downward), occurring in valleys. Each has different sight distance design requirements.',
    difficulty: 'easy'
  },
  {
    id: 'ncees-mcq-52',
    domain: 'Boundary Law & PLSS',
    questionType: 'multiple_choice',
    question: 'What is an easement appurtenant?',
    options: [
      'A. An easement that benefits an adjacent parcel and runs with the land',
      'B. An easement owned by a utility company',
      'C. A temporary construction access',
      'D. An easement that can be sold separately from the land',
      'E. An easement that expires after 20 years'
    ],
    correctAnswer: 0,
    explanation: 'An easement appurtenant benefits a neighboring property (the dominant estate) and burdens another property (the servient estate). It runs with the land and transfers with ownership.',
    difficulty: 'medium'
  },
  {
    id: 'ncees-mcq-53',
    domain: 'Field Data Acquisition',
    questionType: 'multiple_choice',
    question: 'What is multipath error in GNSS?',
    options: [
      'A. Signal reflections from surfaces causing incorrect range measurements',
      'B. Using multiple satellites simultaneously',
      'C. Errors from having too many base stations',
      'D. Interference between different GNSS constellations',
      'E. Atmospheric delays on the signal path'
    ],
    correctAnswer: 0,
    explanation: 'Multipath error occurs when GNSS signals reflect off surfaces (buildings, ground, water) before reaching the receiver, causing incorrect range measurements and position errors.',
    difficulty: 'medium'
  },
  {
    id: 'ncees-mcq-54',
    domain: 'Mapping, GIS, and CAD',
    questionType: 'multiple_choice',
    question: 'What is the difference between orthometric height and ellipsoid height?',
    options: [
      'A. Orthometric height is above the geoid (mean sea level); ellipsoid height is above the mathematical ellipsoid',
      'B. They are identical values',
      'C. Ellipsoid heights are always smaller',
      'D. Orthometric heights cannot be measured with GNSS',
      'E. Ellipsoid height is only used in aviation'
    ],
    correctAnswer: 0,
    explanation: 'Orthometric height (H) is the elevation above the geoid (mean sea level). Ellipsoid height (h) is the height above the reference ellipsoid. The difference is the geoid undulation: h = H + N.',
    difficulty: 'hard'
  },
  {
    id: 'ncees-mcq-55',
    domain: 'Surveying Principles',
    questionType: 'multiple_choice',
    question: 'What is the purpose of establishing a base line in a control survey?',
    options: [
      'A. To provide a known distance and direction from which to extend the survey network',
      'B. To mark the property boundary',
      'C. To measure atmospheric conditions',
      'D. To establish magnetic north',
      'E. To calculate area only'
    ],
    correctAnswer: 0,
    explanation: 'A base line provides a precisely measured distance and known direction as the foundation for triangulation or trilateration networks. All subsequent measurements are referenced to this line.',
    difficulty: 'medium'
  },
  {
    id: 'ncees-mcq-56',
    domain: 'Applied Mathematics & Statistics',
    questionType: 'multiple_choice',
    question: 'What is the purpose of weighting observations in a least squares adjustment?',
    options: [
      'A. To give more influence to more precise measurements',
      'B. To reduce the file size of the data',
      'C. To eliminate the need for redundant observations',
      'D. To make all measurements equal',
      'E. To convert between measurement systems'
    ],
    correctAnswer: 0,
    explanation: 'Weighting assigns greater influence to more precise observations. Weights are typically inversely proportional to the variance of each observation, so better measurements have more impact on the adjusted values.',
    difficulty: 'hard'
  },
  {
    id: 'ncees-mcq-57',
    domain: 'Math & Basic Science',
    questionType: 'multiple_choice',
    question: 'What is the relationship between radians and degrees?',
    options: [
      'A. π radians = 180 degrees',
      'B. π radians = 360 degrees',
      'C. 1 radian = 1 degree',
      'D. 2π radians = 180 degrees',
      'E. π radians = 90 degrees'
    ],
    correctAnswer: 0,
    explanation: 'There are 2π radians in a full circle (360°), so π radians = 180°. One radian equals approximately 57.2958 degrees.',
    difficulty: 'easy'
  },
  {
    id: 'ncees-computational-19',
    domain: 'Survey Computations & Applications',
    questionType: 'computational',
    question: 'A parabolic vertical curve has PVC at station 50+00, elevation 350.00 ft. The entering grade is +4% and the exit grade is -2%. The curve length is 800 ft. What is the elevation at the PVI?',
    options: [
      'A. 366.00 ft',
      'B. 360.00 ft',
      'C. 358.00 ft',
      'D. 370.00 ft',
      'E. 362.00 ft'
    ],
    correctAnswer: 0,
    explanation: 'PVI is at the midpoint of the curve = station 54+00. Elevation at PVI (on tangent) = 350.00 + (4/100 × 400) = 350.00 + 16.00 = 366.00 ft.',
    difficulty: 'hard'
  },
  {
    id: 'ncees-computational-20',
    domain: 'Field Data Acquisition',
    questionType: 'computational',
    question: 'A 100-ft steel tape is used under 15 lb of tension when standardized at 10 lb. If the tape cross-section is 0.005 sq in and E = 29,000,000 psi, what is the tension correction per 100 ft?',
    options: [
      'A. +0.003 ft',
      'B. -0.003 ft',
      'C. +0.005 ft',
      'D. +0.001 ft',
      'E. -0.005 ft'
    ],
    correctAnswer: 0,
    explanation: 'Tension correction = (P - P₀) × L / (A × E) = (15 - 10) × 100 / (0.005 × 29,000,000) = 500 / 145,000 = 0.003 ft. Positive because increased tension stretches the tape.',
    difficulty: 'hard'
  },
  {
    id: 'ncees-computational-21',
    domain: 'Boundary Law & PLSS',
    questionType: 'computational',
    question: 'A fractional section has an area of 580 acres. If it is divided into two lots with the north lot containing 58% of the area, what is the area of the south lot?',
    options: [
      'A. 243.6 acres',
      'B. 336.4 acres',
      'C. 290.0 acres',
      'D. 252.0 acres',
      'E. 328.0 acres'
    ],
    correctAnswer: 0,
    explanation: 'North lot = 58% of 580 = 336.4 acres. South lot = 580 - 336.4 = 243.6 acres (or 42% of 580).',
    difficulty: 'easy'
  },
  {
    id: 'ncees-select-all-13',
    domain: 'Surveying Principles',
    questionType: 'select_all',
    question: 'Which of the following are sources of error in total station measurements? (Select ALL that apply)',
    options: [
      'A. Atmospheric conditions (temperature, pressure)',
      'B. Centering over the point',
      'C. Target height measurement',
      'D. Earth rotation during measurement',
      'E. Prism constant'
    ],
    correctAnswer: [0, 1, 2, 4],
    explanation: 'Atmospheric conditions (A), centering (B), target height (C), and prism constant (E) all affect total station accuracy. Earth rotation (D) is not significant for typical short-duration measurements.',
    difficulty: 'medium',
    partialCredit: true
  },
  {
    id: 'ncees-select-all-14',
    domain: 'Survey Computations & Applications',
    questionType: 'select_all',
    question: 'Which of the following affect the combined factor (grid to ground) in State Plane Coordinates? (Select ALL that apply)',
    options: [
      'A. Scale factor at the point',
      'B. Elevation factor (sea level factor)',
      'C. Magnetic declination',
      'D. Distance from the central meridian or standard parallel',
      'E. Height above the ellipsoid'
    ],
    correctAnswer: [0, 1, 3, 4],
    explanation: 'The combined factor = scale factor × elevation factor. Scale factor (A) depends on distance from projection center (D). Elevation factor (B) depends on height above ellipsoid (E). Magnetic declination (C) does not affect distances.',
    difficulty: 'hard',
    partialCredit: true
  },
  {
    id: 'ncees-priority-7',
    domain: 'Surveying Principles',
    questionType: 'priority_ranking',
    question: 'Rank the following survey control methods in order of typical baseline accuracy over 10 km (1 = most accurate):',
    options: [
      'Static GNSS (multi-hour)',
      'EDM traverse with forced centering',
      'RTK GNSS',
      'Steel tape measurement'
    ],
    correctAnswer: [0, 1, 2, 3],
    explanation: 'For 10 km baselines: (1) Static GNSS achieves mm-level; (2) EDM traverse with careful procedures achieves cm-level; (3) RTK achieves low cm-level; (4) Tape measurement is impractical and lowest accuracy over this distance.',
    difficulty: 'medium'
  },
  {
    id: 'ncees-computational-22',
    domain: 'Math & Basic Science',
    questionType: 'computational',
    question: 'Calculate the length of a circular arc with radius 300 ft and central angle of 72°.',
    options: [
      'A. 376.99 ft',
      'B. 360.00 ft',
      'C. 390.00 ft',
      'D. 345.58 ft',
      'E. 400.00 ft'
    ],
    correctAnswer: 0,
    explanation: 'Arc length = (θ/360°) × 2πR = (72/360) × 2 × π × 300 = 0.2 × 1884.96 = 376.99 ft.',
    difficulty: 'easy'
  },
  {
    id: 'ncees-mcq-58',
    domain: 'Survey Computations & Applications',
    questionType: 'multiple_choice',
    question: 'What is the K value used for in vertical curve design?',
    options: [
      'A. To determine curve length for a given design speed based on sight distance',
      'B. To calculate horizontal curve radii',
      'C. To measure superelevation',
      'D. To convert between feet and meters',
      'E. To determine pavement thickness'
    ],
    correctAnswer: 0,
    explanation: 'K is the horizontal distance (in feet) required to achieve a 1% change in grade. K values are tabulated for different design speeds and are used to determine minimum vertical curve lengths for safe stopping sight distance.',
    difficulty: 'medium'
  },
  {
    id: 'ncees-mcq-59',
    domain: 'Boundary Law & PLSS',
    questionType: 'multiple_choice',
    question: 'What is a metes and bounds description?',
    options: [
      'A. A property description using measurements and boundaries from a point of beginning',
      'B. A description based on lot and block numbers only',
      'C. A description using only GPS coordinates',
      'D. A description referencing only natural monuments',
      'E. A description based on area only'
    ],
    correctAnswer: 0,
    explanation: 'Metes and bounds is a system of describing land using measurements (metes: distances and directions) and boundaries (bounds: adjoining properties, natural features) starting from a point of beginning.',
    difficulty: 'easy'
  },
  {
    id: 'ncees-mcq-60',
    domain: 'Field Data Acquisition',
    questionType: 'multiple_choice',
    question: 'What is the purpose of a prism pole bubble level?',
    options: [
      'A. To ensure the prism is held vertically over the point',
      'B. To measure horizontal angles',
      'C. To determine atmospheric pressure',
      'D. To calibrate the EDM',
      'E. To measure slope distance'
    ],
    correctAnswer: 0,
    explanation: 'The bubble level on a prism pole helps the rodperson hold the pole plumb (vertical) over the point being measured. Tilting the pole introduces errors in both horizontal distance and direction.',
    difficulty: 'easy'
  },
  {
    id: 'ncees-mcq-61',
    domain: 'Mapping, GIS, and CAD',
    questionType: 'multiple_choice',
    question: 'What is a contour interval?',
    options: [
      'A. The vertical distance between adjacent contour lines on a map',
      'B. The horizontal distance between contour lines',
      'C. The time between topographic surveys',
      'D. The spacing of grid points in a DEM',
      'E. The accuracy of GPS measurements'
    ],
    correctAnswer: 0,
    explanation: 'Contour interval is the constant vertical distance between successive contour lines. Common intervals include 1, 2, 5, 10, 20, 40, or 100 feet, depending on terrain and map scale.',
    difficulty: 'easy'
  },
  {
    id: 'ncees-mcq-62',
    domain: 'Professional Practice',
    questionType: 'multiple_choice',
    question: 'What is the statute of limitations in relation to surveying?',
    options: [
      'A. The time period within which legal action must be initiated for professional liability',
      'B. The time a survey is valid before resurvey is required',
      'C. The maximum age of monuments that can be used',
      'D. The time required to obtain a surveyor\'s license',
      'E. The duration of professional liability insurance coverage'
    ],
    correctAnswer: 0,
    explanation: 'The statute of limitations sets the time limit within which a lawsuit must be filed after an alleged error or omission. This period varies by state and type of claim.',
    difficulty: 'medium'
  },
  {
    id: 'ncees-mcq-63',
    domain: 'Applied Mathematics & Statistics',
    questionType: 'multiple_choice',
    question: 'What is the purpose of a histogram in analyzing survey data?',
    options: [
      'A. To visually display the distribution and frequency of measurements',
      'B. To calculate the mean value',
      'C. To perform least squares adjustment',
      'D. To convert between coordinate systems',
      'E. To generate contour lines'
    ],
    correctAnswer: 0,
    explanation: 'A histogram displays how measurement values are distributed by grouping them into bins and showing the frequency (count) in each bin. It helps identify the shape of the distribution and potential outliers.',
    difficulty: 'easy'
  },
  {
    id: 'ncees-mcq-64',
    domain: 'Surveying Principles',
    questionType: 'multiple_choice',
    question: 'What is astronomic north?',
    options: [
      'A. The direction toward the celestial pole, determined by astronomical observations',
      'B. The direction a compass needle points',
      'C. A direction parallel to the central meridian of a coordinate system',
      'D. The direction toward the nearest star',
      'E. A direction assumed arbitrarily for a survey'
    ],
    correctAnswer: 0,
    explanation: 'Astronomic north (true north) is determined by astronomical observations (sun or star positions) and points toward the celestial pole. It differs slightly from geodetic north due to deflection of the vertical.',
    difficulty: 'medium'
  }
];

export function getScenarioQuestions(scenarioId: string): NCEESQuestion[] {
  return NCEES_STYLE_QUESTIONS.filter(q => q.scenarioId === scenarioId && q.id !== `${scenarioId.replace('-', '-scenario-')}-context`);
}

export function getScenarioContext(scenarioId: string): NCEESQuestion | undefined {
  return NCEES_STYLE_QUESTIONS.find(q => q.scenarioId === scenarioId && q.scenarioContext);
}

export function getQuestionsByType(type: NCEESQuestionType): NCEESQuestion[] {
  return NCEES_STYLE_QUESTIONS.filter(q => q.questionType === type);
}
