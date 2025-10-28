export interface PretestQuestion {
  domain: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export const PRETEST_QUESTIONS: PretestQuestion[] = [
  // Math & Basic Science (4 questions)
  {
    domain: 'Math & Basic Science',
    question: 'What is 1 acre equal to in square feet?',
    options: ['43,560 sq ft', '40,000 sq ft', '50,000 sq ft', '45,000 sq ft'],
    correctAnswer: 0,
    explanation: '1 acre = 43,560 square feet. This is a fundamental conversion that appears frequently on the FS exam.',
    difficulty: 'easy'
  },
  {
    domain: 'Math & Basic Science',
    question: 'The standard deviation of a sample is 0.05 ft. What is the 95% confidence interval (approx. 2σ)?',
    options: ['±0.05 ft', '±0.10 ft', '±0.15 ft', '±0.025 ft'],
    correctAnswer: 1,
    explanation: 'The 95% confidence interval is approximately ±2σ (two standard deviations). 2 × 0.05 ft = ±0.10 ft.',
    difficulty: 'medium'
  },
  {
    domain: 'Math & Basic Science',
    question: 'If you measure a distance 4 times and get: 100.01, 100.03, 99.99, 100.02 ft, what is the mean?',
    options: ['100.00 ft', '100.01 ft', '100.02 ft', '100.03 ft'],
    correctAnswer: 1,
    explanation: 'Mean = (100.01 + 100.03 + 99.99 + 100.02) / 4 = 400.05 / 4 = 100.0125 ft, which rounds to 100.01 ft.',
    difficulty: 'easy'
  },
  {
    domain: 'Math & Basic Science',
    question: 'What type of error can be minimized through repeated measurements and averaging?',
    options: ['Systematic errors', 'Random errors', 'Blunders', 'Instrumental errors'],
    correctAnswer: 1,
    explanation: 'Random errors can be reduced through repeated measurements and averaging. Systematic errors require correction formulas, and blunders must be detected and eliminated.',
    difficulty: 'medium'
  },

  // Field Data Acquisition (4 questions)
  {
    domain: 'Field Data Acquisition',
    question: 'For differential leveling, if the backsight (BS) = 5.23 ft and foresight (FS) = 2.18 ft, what is the change in elevation?',
    options: ['+3.05 ft (rise)', '-3.05 ft (fall)', '+7.41 ft', '-7.41 ft'],
    correctAnswer: 0,
    explanation: 'Change in elevation = BS - FS = 5.23 - 2.18 = +3.05 ft. Positive means a rise in elevation from the first point to the second.',
    difficulty: 'easy'
  },
  {
    domain: 'Field Data Acquisition',
    question: 'A steel tape is standardized at 68°F and 10 lbs tension. If used at 95°F with the same tension, the measured distance will be:',
    options: ['Too long', 'Too short', 'Correct', 'Cannot determine'],
    correctAnswer: 1,
    explanation: 'Higher temperature causes the tape to expand, making it longer than standard. When you measure with an expanded tape, you record fewer tape lengths, thus the measured distance is too short. You must ADD a temperature correction.',
    difficulty: 'medium'
  },
  {
    domain: 'Field Data Acquisition',
    question: 'The combined effect of curvature and refraction over 1 mile is approximately:',
    options: ['+0.57 ft', '-0.67 ft', '+0.67 ft', '-0.57 ft'],
    correctAnswer: 1,
    explanation: 'Curvature lowers the line of sight, refraction raises it. Combined effect ≈ -0.67 ft per mile (curvature effect is larger). Use the formula: C&R = -0.667M² (in feet, M in miles).',
    difficulty: 'hard'
  },
  {
    domain: 'Field Data Acquisition',
    question: 'What is the primary purpose of a level loop closure?',
    options: ['To check for systematic errors', 'To check for random errors', 'To verify the accuracy of measurements', 'To calibrate the instrument'],
    correctAnswer: 2,
    explanation: 'Level loop closure verifies measurement accuracy by checking if returning to the starting point yields the same elevation. Acceptable misclosure is typically within √(distance in miles) × 0.05 ft.',
    difficulty: 'medium'
  },

  // Plane Survey Computations (4 questions)
  {
    domain: 'Plane Survey Computations',
    question: 'The formula for interior angles of a polygon with n sides is:',
    options: ['(n-2) × 180°', '(n+2) × 180°', 'n × 180°', '(n-1) × 180°'],
    correctAnswer: 0,
    explanation: 'Sum of interior angles = (n-2) × 180°. For example, a triangle (n=3) has (3-2)×180° = 180°, a quadrilateral (n=4) has (4-2)×180° = 360°.',
    difficulty: 'easy'
  },
  {
    domain: 'Plane Survey Computations',
    question: 'A bearing of N 45° 30\' E is equivalent to what azimuth from north?',
    options: ['45° 30\'', '45.5°', 'Both A and B', '315° 30\''],
    correctAnswer: 2,
    explanation: 'N 45° 30\' E = 45° 30\' azimuth from north = 45.5° (since 30 minutes = 0.5 degrees). Both forms are correct.',
    difficulty: 'easy'
  },
  {
    domain: 'Plane Survey Computations',
    question: 'In a closed traverse, the sum of north departures = +124.5 ft and south departures = -122.8 ft. The closure in the north direction is:',
    options: ['+1.7 ft', '-1.7 ft', '+247.3 ft', '0.0 ft'],
    correctAnswer: 0,
    explanation: 'Closure in north = sum of all N departures (north minus south) = +124.5 + (-122.8) = +1.7 ft. This represents the error to be distributed in traverse adjustment.',
    difficulty: 'medium'
  },
  {
    domain: 'Plane Survey Computations',
    question: 'For a circular curve, if the radius (R) = 500 ft and the central angle (Δ) = 30°, what is the length of the curve (L)?',
    options: ['261.8 ft', '523.6 ft', '150.0 ft', '785.4 ft'],
    correctAnswer: 0,
    explanation: 'Curve length L = (Δ/360°) × 2πR = (30/360) × 2π(500) = (1/12) × 3,141.6 = 261.8 ft. Or use L = RΔ where Δ is in radians: L = 500 × 0.5236 = 261.8 ft.',
    difficulty: 'hard'
  },

  // Mapping, GIS, and CAD (4 questions)
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'A contour line is:',
    options: ['A line connecting points of equal elevation', 'A line showing property boundaries', 'A line showing magnetic declination', 'A line perpendicular to the slope'],
    correctAnswer: 0,
    explanation: 'Contour lines connect points of equal elevation. They never cross (except at vertical cliffs) and are perpendicular to the direction of steepest slope.',
    difficulty: 'easy'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'If a map scale is 1:2400, one inch on the map represents how many feet on the ground?',
    options: ['200 feet', '2400 feet', '2400 inches', '24 feet'],
    correctAnswer: 0,
    explanation: '1:2400 means 1 unit on the map = 2400 units on the ground. 1 inch on map = 2400 inches on ground = 2400/12 = 200 feet on ground.',
    difficulty: 'medium'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'In GIS, raster data is best described as:',
    options: ['Grid cells with values', 'Points, lines, and polygons', 'Tabular attribute data', 'Three-dimensional surfaces'],
    correctAnswer: 0,
    explanation: 'Raster data consists of a grid of cells (pixels), each with a value representing information (elevation, temperature, etc.). Vector data uses points, lines, and polygons.',
    difficulty: 'medium'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'The relief displacement of vertical features on aerial photos increases with:',
    options: ['Greater distance from photo center', 'Higher camera elevation', 'Larger focal length', 'Smaller scale'],
    correctAnswer: 0,
    explanation: 'Relief displacement increases with distance from the photo principal point (center). Tall objects lean outward from the center. Relief also increases with lower flying height and taller objects.',
    difficulty: 'hard'
  },

  // Boundary Law & PLSS (4 questions)
  {
    domain: 'Boundary Law & PLSS',
    question: 'In the Public Land Survey System (PLSS), a township is:',
    options: ['6 miles × 6 miles', '1 mile × 1 mile', '24 miles × 24 miles', '36 miles × 36 miles'],
    correctAnswer: 0,
    explanation: 'A township in PLSS is 6 miles × 6 miles, containing 36 sections. Each section is 1 mile × 1 mile (640 acres).',
    difficulty: 'easy'
  },
  {
    domain: 'Boundary Law & PLSS',
    question: 'In boundary law, which principle generally takes precedence?',
    options: ['Natural monuments over measured distances', 'Measured distances over bearings', 'Bearings over natural monuments', 'Area over all other elements'],
    correctAnswer: 0,
    explanation: 'The general order of precedence (highest to lowest): 1) Natural monuments, 2) Artificial monuments, 3) Bearings/directions, 4) Distances, 5) Area. "The best evidence controls."',
    difficulty: 'medium'
  },
  {
    domain: 'Boundary Law & PLSS',
    question: 'A section of land typically contains how many acres?',
    options: ['40 acres', '160 acres', '320 acres', '640 acres'],
    correctAnswer: 3,
    explanation: 'A section is 1 mile × 1 mile = 5,280 ft × 5,280 ft = 27,878,400 sq ft ÷ 43,560 sq ft/acre = 640 acres.',
    difficulty: 'easy'
  },
  {
    domain: 'Boundary Law & PLSS',
    question: 'In PLSS, excess or deficiency in township measurements is typically placed in:',
    options: ['Northern and western tiers', 'Southern and eastern tiers', 'Center sections', 'Evenly distributed'],
    correctAnswer: 0,
    explanation: 'Due to convergence of meridians and surveying errors, excess or deficiency is placed in the northern and western tiers of sections within a township.',
    difficulty: 'hard'
  },

  // Geodesy, GPS, Astronomy (4 questions)
  {
    domain: 'Geodesy, GPS, Astronomy',
    question: 'The geoid is best described as:',
    options: ['A mathematical ellipsoid', 'A surface of constant gravity potential', 'The Earth\'s actual physical surface', 'A coordinate system'],
    correctAnswer: 1,
    explanation: 'The geoid is an equipotential surface of Earth\'s gravity field that approximates mean sea level. It\'s irregular due to variations in Earth\'s density and mass distribution.',
    difficulty: 'medium'
  },
  {
    domain: 'Geodesy, GPS, Astronomy',
    question: 'How many GPS satellites are required for a 3D position fix?',
    options: ['3 satellites', '4 satellites', '5 satellites', '6 satellites'],
    correctAnswer: 1,
    explanation: '4 satellites are needed: 3 for position (X, Y, Z coordinates) and 1 to solve for the receiver clock bias. More satellites improve accuracy through redundancy.',
    difficulty: 'easy'
  },
  {
    domain: 'Geodesy, GPS, Astronomy',
    question: 'The most commonly used geodetic datum in North America (as of 2020s) is:',
    options: ['NAD27', 'NAD83', 'WGS84', 'ITRF'],
    correctAnswer: 1,
    explanation: 'NAD83 (North American Datum of 1983) is the standard horizontal datum for North America. WGS84 is used globally for GPS. NAD27 is obsolete.',
    difficulty: 'easy'
  },
  {
    domain: 'Geodesy, GPS, Astronomy',
    question: 'The deflection of the vertical is the angle between:',
    options: ['True north and magnetic north', 'The geoid and ellipsoid normals', 'Grid north and true north', 'The horizon and zenith'],
    correctAnswer: 1,
    explanation: 'Deflection of the vertical is the angle between the direction of gravity (perpendicular to the geoid) and the ellipsoid normal (perpendicular to the reference ellipsoid).',
    difficulty: 'hard'
  },

  // Professional Practice (4 questions)
  {
    domain: 'Professional Practice',
    question: 'According to professional surveying ethics, which is most important?',
    options: ['Client satisfaction', 'Public welfare', 'Profit maximization', 'Faster completion'],
    correctAnswer: 1,
    explanation: 'Professional surveyors hold paramount the safety, health, and welfare of the public. This is the first fundamental canon of professional ethics.',
    difficulty: 'easy'
  },
  {
    domain: 'Professional Practice',
    question: 'A surveyor discovers a significant error in their previously filed survey. What should they do?',
    options: ['Ignore it if no one noticed', 'Correct it and notify affected parties', 'Wait for the client to complain', 'Blame the field crew'],
    correctAnswer: 1,
    explanation: 'Professional ethics require surveyors to promptly correct errors, notify affected parties, and file corrected documents. Integrity and honesty are fundamental professional obligations.',
    difficulty: 'medium'
  },
  {
    domain: 'Professional Practice',
    question: 'Standard surveying error management includes all EXCEPT:',
    options: ['Identifying potential errors', 'Quantifying error magnitudes', 'Eliminating all random errors', 'Applying systematic corrections'],
    correctAnswer: 2,
    explanation: 'Random errors cannot be completely eliminated—only minimized through proper procedures and averaging. Systematic errors can be corrected, and blunders must be detected and removed.',
    difficulty: 'medium'
  },
  {
    domain: 'Professional Practice',
    question: 'In most states, who can legally perform boundary surveys?',
    options: ['Any surveyor', 'Civil engineers', 'Licensed/Professional Land Surveyors only', 'Property owners themselves'],
    correctAnswer: 2,
    explanation: 'Boundary surveys establish property rights and must be performed by licensed Professional Land Surveyors (PLS/RLS) who have met education, experience, and examination requirements.',
    difficulty: 'easy'
  }
];
