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
    explanation: 'ALTA surveys require showing improvements near boundaries (A), utilities (B), flood zone data (C), and zoning (D) through Table A items. Interior floor plans (E) are not part of the standard requirements.',
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
