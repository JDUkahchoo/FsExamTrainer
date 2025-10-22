import type { QuizQuestion } from '../schema';

export const QUIZ_QUESTIONS: Omit<QuizQuestion, 'id'>[] = [
  // Math & Basic Science
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
  
  // Field Data Acquisition
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
    question: 'For differential leveling, if the backsight (BS) = 5.23 ft and foresight (FS) = 2.18 ft, what is the change in elevation?',
    options: ['+3.05 ft (rise)', '-3.05 ft (fall)', '+7.41 ft', '-7.41 ft'],
    correctAnswer: 0,
    explanation: 'Change in elevation = BS - FS = 5.23 - 2.18 = +3.05 ft. Positive means a rise in elevation from the first point to the second.',
    difficulty: 'easy'
  },
  {
    domain: 'Field Data Acquisition',
    question: 'The combined effect of curvature and refraction over 1 mile is approximately:',
    options: ['+0.57 ft', '-0.67 ft', '+0.67 ft', '-0.57 ft'],
    correctAnswer: 1,
    explanation: 'Curvature lowers the line of sight, refraction raises it. Combined effect ≈ -0.67 ft per mile (curvature effect is larger). Use the formula: C&R = -0.667M² (in feet, M in miles).',
    difficulty: 'hard'
  },

  // Plane Survey Computations
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
    explanation: 'N 45° 30\' E means 45°30\' clockwise from North, which equals azimuth 45°30\' or 45.5° (since 30\' = 0.5°). Both representations are correct.',
    difficulty: 'easy'
  },
  {
    domain: 'Plane Survey Computations',
    question: 'In traverse calculations, Latitude is calculated as:',
    options: ['Distance × sin(Azimuth)', 'Distance × cos(Azimuth)', 'Distance × tan(Azimuth)', 'Distance / cos(Azimuth)'],
    correctAnswer: 1,
    explanation: 'Latitude = Distance × cos(Azimuth). Departure = Distance × sin(Azimuth). Remember: Latitude relates to North/South (cosine), Departure to East/West (sine).',
    difficulty: 'medium'
  },

  // Mapping, GIS, and CAD
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'In photogrammetry, the scale of a vertical aerial photo is calculated as:',
    options: ['f / H', 'f / (H - h)', 'H / f', '(H - h) / f'],
    correctAnswer: 1,
    explanation: 'Scale = f / (H - h), where f = focal length, H = flying height above datum, h = ground elevation. For flat terrain at datum, it simplifies to f/H.',
    difficulty: 'medium'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'Contour lines never cross except in the case of:',
    options: ['Steep slopes', 'Overhanging cliffs', 'Valley bottoms', 'Ridge tops'],
    correctAnswer: 1,
    explanation: 'Contour lines represent points of equal elevation and normally cannot cross. The only exception is an overhanging cliff where one elevation can exist above another at the same horizontal position.',
    difficulty: 'medium'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'Which data model uses cells or pixels to represent geographic features?',
    options: ['Vector', 'Raster', 'CAD', 'Topology'],
    correctAnswer: 1,
    explanation: 'Raster data models use a grid of cells/pixels (like satellite imagery or DEMs). Vector models use points, lines, and polygons to represent discrete features.',
    difficulty: 'easy'
  },

  // Boundary Law & PLSS
  {
    domain: 'Boundary Law & PLSS',
    question: 'In the order of conflicting calls in a deed, which typically controls?',
    options: ['Distance', 'Direction', 'Natural monuments', 'Area'],
    correctAnswer: 2,
    explanation: 'General hierarchy: Natural monuments > Artificial monuments > Bearings/Directions > Distances > Area. "Monuments control over measurements."',
    difficulty: 'medium'
  },
  {
    domain: 'Boundary Law & PLSS',
    question: 'A standard PLSS township is nominally:',
    options: ['6 miles × 6 miles', '5 miles × 5 miles', '1 mile × 1 mile', '36 miles × 36 miles'],
    correctAnswer: 0,
    explanation: 'A township is nominally 6 miles × 6 miles, containing 36 sections. Each section is nominally 1 mile × 1 mile (640 acres).',
    difficulty: 'easy'
  },
  {
    domain: 'Boundary Law & PLSS',
    question: 'Sections in a township are numbered starting from:',
    options: ['Northwest corner, proceeding east', 'Northeast corner, proceeding west', 'Southwest corner, proceeding north', 'Southeast corner, proceeding west'],
    correctAnswer: 1,
    explanation: 'PLSS sections are numbered starting at the northeast corner (Section 1), proceeding west to Section 6, then back east for Section 7-12, and so on in a serpentine pattern, ending at Section 36 in the southeast corner.',
    difficulty: 'medium'
  },

  // Geodesy, GPS, Astronomy
  {
    domain: 'Geodesy, GPS, Astronomy',
    question: 'The relationship between ellipsoid height (h), orthometric height (H), and geoid height (N) is:',
    options: ['h = H + N', 'H = h + N', 'N = h + H', 'h = H - N'],
    correctAnswer: 0,
    explanation: 'h = H + N, where h is ellipsoid height (from GPS), H is orthometric height (elevation above geoid/MSL), and N is geoid height (separation between ellipsoid and geoid).',
    difficulty: 'medium'
  },
  {
    domain: 'Geodesy, GPS, Astronomy',
    question: 'NAD 83 is based on which ellipsoid?',
    options: ['Clarke 1866', 'GRS 80', 'WGS 84', 'Bessel'],
    correctAnswer: 1,
    explanation: 'NAD 83 uses the GRS 80 (Geodetic Reference System 1980) ellipsoid. NAD 27 used Clarke 1866. WGS 84 is nearly identical to GRS 80 but is a global system.',
    difficulty: 'medium'
  },
  {
    domain: 'Geodesy, GPS, Astronomy',
    question: 'PDOP (Position Dilution of Precision) indicates:',
    options: ['GPS signal strength', 'Satellite geometry quality', 'Atmospheric interference', 'Receiver accuracy'],
    correctAnswer: 1,
    explanation: 'PDOP measures the geometric strength of the satellite configuration. Lower PDOP (< 6) indicates better satellite geometry and more accurate positioning. Poor geometry (high PDOP) degrades position accuracy.',
    difficulty: 'medium'
  },

  // Professional Practice
  {
    domain: 'Professional Practice',
    question: 'According to the NCEES Model Rules, a surveyor\'s paramount responsibility is to:',
    options: ['The client', 'The employer', 'The public health, safety, and welfare', 'Professional accuracy'],
    correctAnswer: 2,
    explanation: 'The paramount obligation is to the public health, safety, and welfare. This overrides obligations to clients, employers, or other parties.',
    difficulty: 'easy'
  },
  {
    domain: 'Professional Practice',
    question: 'Which type of deed provides the greatest protection to the buyer?',
    options: ['Quitclaim deed', 'Warranty deed', 'Grant deed', 'Bargain and sale deed'],
    correctAnswer: 1,
    explanation: 'A warranty deed (general warranty deed) provides the most protection, as the seller guarantees clear title and will defend against all claims. A quitclaim deed provides no warranties.',
    difficulty: 'easy'
  },
  {
    domain: 'Professional Practice',
    question: 'An easement that benefits a particular parcel of land is called:',
    options: ['Easement in gross', 'Easement appurtenant', 'Prescriptive easement', 'Easement by necessity'],
    correctAnswer: 1,
    explanation: 'An easement appurtenant benefits a specific parcel (dominant estate) and runs with the land. An easement in gross benefits an individual or entity, not a particular parcel.',
    difficulty: 'medium'
  },
];
