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

  // Additional Math & Basic Science questions
  {
    domain: 'Math & Basic Science',
    question: 'What is the error of closure for a traverse with ΣLat = +0.08 ft and ΣDep = -0.06 ft?',
    options: ['0.10 ft', '0.14 ft', '0.02 ft', '0.08 ft'],
    correctAnswer: 0,
    explanation: 'Error of closure = √((ΣLat)² + (ΣDep)²) = √(0.08² + 0.06²) = √(0.0064 + 0.0036) = √0.01 = 0.10 ft.',
    difficulty: 'medium'
  },
  {
    domain: 'Math & Basic Science',
    question: 'Convert 25° 30\' 45" to decimal degrees:',
    options: ['25.5125°', '25.3045°', '25.512°', '25.51°'],
    correctAnswer: 0,
    explanation: '25° + (30/60)° + (45/3600)° = 25° + 0.5° + 0.0125° = 25.5125°',
    difficulty: 'easy'
  },
  {
    domain: 'Math & Basic Science',
    question: 'The relative precision of a traverse with perimeter 2,400 ft and error of closure 0.12 ft is:',
    options: ['1:20,000', '1:2,000', '1:200', '1:12,000'],
    correctAnswer: 0,
    explanation: 'Relative precision = Perimeter / Error = 2,400 / 0.12 = 20,000 = 1:20,000',
    difficulty: 'medium'
  },
  {
    domain: 'Math & Basic Science',
    question: 'What is 1 hectare equal to in square meters?',
    options: ['10,000 m²', '1,000 m²', '100,000 m²', '43,560 m²'],
    correctAnswer: 0,
    explanation: '1 hectare = 10,000 m² = 2.471 acres. Hectare is commonly used in metric land measurements.',
    difficulty: 'easy'
  },

  // Additional Field Data Acquisition questions
  {
    domain: 'Field Data Acquisition',
    question: 'The ppm (parts per million) correction for a 500 ft distance measured with a +3 ppm systematic error is:',
    options: ['+0.0015 ft', '+0.015 ft', '+0.15 ft', '+1.5 ft'],
    correctAnswer: 0,
    explanation: 'Correction = Distance × (ppm/1,000,000) = 500 × (3/1,000,000) = 500 × 0.000003 = 0.0015 ft',
    difficulty: 'medium'
  },
  {
    domain: 'Field Data Acquisition',
    question: 'When using a total station, if the prism constant is +30mm and you measure 150.000m, the corrected distance is:',
    options: ['150.030m', '149.970m', '150.000m', '150.300m'],
    correctAnswer: 0,
    explanation: 'A positive prism constant means the measurement is too short. Add the constant: 150.000m + 0.030m = 150.030m',
    difficulty: 'medium'
  },
  {
    domain: 'Field Data Acquisition',
    question: 'In differential leveling, if HI (Height of Instrument) = 542.83 ft and FS (Foresight) = 4.21 ft, what is the elevation of the point?',
    options: ['538.62 ft', '547.04 ft', '542.83 ft', '546.62 ft'],
    correctAnswer: 0,
    explanation: 'Elevation = HI - FS = 542.83 - 4.21 = 538.62 ft',
    difficulty: 'easy'
  },
  {
    domain: 'Field Data Acquisition',
    question: 'Systematic errors in surveying can be:',
    options: ['Eliminated by careful work', 'Reduced by averaging', 'Corrected if the magnitude is known', 'Distributed by least squares'],
    correctAnswer: 2,
    explanation: 'Systematic errors have a consistent magnitude and sign. They can be corrected if known (e.g., temperature, tape standardization). Random errors are reduced by averaging.',
    difficulty: 'medium'
  },

  // Additional Plane Survey Computations questions
  {
    domain: 'Plane Survey Computations',
    question: 'The Departure of a 200.00 ft line with azimuth 135° is:',
    options: ['+141.42 ft', '-141.42 ft', '+100.00 ft', '-100.00 ft'],
    correctAnswer: 0,
    explanation: 'Departure = Distance × sin(Azimuth) = 200.00 × sin(135°) = 200.00 × 0.7071 = +141.42 ft (positive = East)',
    difficulty: 'medium'
  },
  {
    domain: 'Plane Survey Computations',
    question: 'A simple horizontal curve has a radius of 500 ft and a central angle of 45°. What is the length of the curve?',
    options: ['392.70 ft', '500.00 ft', '225.00 ft', '707.11 ft'],
    correctAnswer: 0,
    explanation: 'L = (Δ/360°) × 2πR = (45°/360°) × 2π(500) = 0.125 × 3,141.59 = 392.70 ft. Or use L = RΔ (in radians): 500 × 0.7854 = 392.70 ft',
    difficulty: 'medium'
  },
  {
    domain: 'Plane Survey Computations',
    question: 'The back azimuth of 45° 30\' is:',
    options: ['225° 30\'', '314° 30\'', '135° 30\'', '180° 00\''],
    correctAnswer: 0,
    explanation: 'Back azimuth = Forward azimuth ± 180°. For 45° 30\', add 180° = 225° 30\'',
    difficulty: 'easy'
  },
  {
    domain: 'Plane Survey Computations',
    question: 'In coordinate geometry, if Point A is at (1000, 2000) and Point B is at (1300, 2400), the distance AB is:',
    options: ['500.00 ft', '424.26 ft', '700.00 ft', '360.56 ft'],
    correctAnswer: 0,
    explanation: 'Distance = √[(ΔE)² + (ΔN)²] = √[(1300-1000)² + (2400-2000)²] = √[(300)² + (400)²] = √(90,000 + 160,000) = √250,000 = 500.00 ft',
    difficulty: 'medium'
  },

  // Additional Mapping, GIS, and CAD questions
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'A map with a scale of 1:24,000 shows 2.5 inches between two points. The actual ground distance is:',
    options: ['5,000 ft', '60,000 ft', '6,000 ft', '50,000 ft'],
    correctAnswer: 0,
    explanation: 'Ground distance = Map distance × Scale = 2.5 in × 24,000 = 60,000 inches = 5,000 feet (60,000/12)',
    difficulty: 'medium'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'In GIS, topology refers to:',
    options: ['Elevation data', 'Spatial relationships between features', 'Coordinate systems', 'Image resolution'],
    correctAnswer: 1,
    explanation: 'Topology describes spatial relationships: connectivity, adjacency, and containment between geographic features (e.g., which parcels are adjacent).',
    difficulty: 'medium'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'Contour interval is best defined as:',
    options: ['Distance between contour lines on the map', 'Vertical distance between adjacent contour lines', 'Horizontal spacing of points', 'Scale of the map'],
    correctAnswer: 1,
    explanation: 'Contour interval is the vertical elevation difference between adjacent contour lines, not the horizontal distance on the map.',
    difficulty: 'easy'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'What is the ground resolution of a digital image if the pixel size is 0.5m and the scale is 1:5000?',
    options: ['0.5m', '2.5m', '0.1m', '1.0m'],
    correctAnswer: 0,
    explanation: 'Ground resolution equals the pixel size when measured on the ground. A 0.5m pixel represents 0.5m on the ground.',
    difficulty: 'medium'
  },

  // Additional Boundary Law & PLSS questions
  {
    domain: 'Boundary Law & PLSS',
    question: 'In PLSS, a section contains how many acres?',
    options: ['640 acres', '160 acres', '320 acres', '40 acres'],
    correctAnswer: 0,
    explanation: 'A section is 1 mile × 1 mile = 640 acres. A quarter section = 160 acres, quarter-quarter section = 40 acres.',
    difficulty: 'easy'
  },
  {
    domain: 'Boundary Law & PLSS',
    question: 'Which type of evidence is considered LEAST reliable in boundary determination?',
    options: ['Natural monuments', 'Original survey notes', 'Oral testimony', 'Recorded deeds'],
    correctAnswer: 2,
    explanation: 'Hierarchy: Physical evidence (monuments) > Written evidence (deeds, surveys) > Oral testimony. Oral testimony is subjective and subject to memory errors.',
    difficulty: 'medium'
  },
  {
    domain: 'Boundary Law & PLSS',
    question: 'Adverse possession requires all EXCEPT:',
    options: ['Continuous use', 'Open and notorious', 'Payment of taxes', 'Hostile claim'],
    correctAnswer: 2,
    explanation: 'Requirements vary by state, but generally: continuous, exclusive, open/notorious, hostile/adverse, and for statutory period. Payment of taxes is required in some states but not all.',
    difficulty: 'hard'
  },
  {
    domain: 'Boundary Law & PLSS',
    question: 'In PLSS, correction lines are established every:',
    options: ['24 miles north', '6 miles north', '12 miles north', '36 miles north'],
    correctAnswer: 0,
    explanation: 'Standard parallels (correction lines) are established every 24 miles north and south of the baseline to correct for Earth\'s curvature.',
    difficulty: 'medium'
  },

  // Additional Geodesy, GPS, Astronomy questions
  {
    domain: 'Geodesy, GPS, Astronomy',
    question: 'RTK (Real-Time Kinematic) GPS typically achieves accuracy of:',
    options: ['±10-30 meters', '±1-3 meters', '±1-3 centimeters', '±1-3 millimeters'],
    correctAnswer: 2,
    explanation: 'RTK GPS provides centimeter-level accuracy (±1-3 cm) by using carrier phase measurements and a base station with known coordinates.',
    difficulty: 'medium'
  },
  {
    domain: 'Geodesy, GPS, Astronomy',
    question: 'The combined factor for converting GPS distance to State Plane distance includes:',
    options: ['Scale factor only', 'Elevation factor only', 'Both scale and elevation factors', 'Neither factor'],
    correctAnswer: 2,
    explanation: 'Combined Factor = Scale Factor × Elevation Factor. This converts ellipsoid distances to grid distances at project elevation.',
    difficulty: 'medium'
  },
  {
    domain: 'Geodesy, GPS, Astronomy',
    question: 'How many GPS satellites are required for a 3D position fix?',
    options: ['3 satellites', '4 satellites', '5 satellites', '6 satellites'],
    correctAnswer: 1,
    explanation: 'Minimum 4 satellites needed: 3 for X,Y,Z position and 1 for receiver clock correction. More satellites improve PDOP and accuracy.',
    difficulty: 'easy'
  },
  {
    domain: 'Geodesy, GPS, Astronomy',
    question: 'The geoid is best described as:',
    options: ['A perfect sphere', 'An ellipsoid', 'An equipotential surface', 'A cylindrical projection'],
    correctAnswer: 2,
    explanation: 'The geoid is an equipotential surface of Earth\'s gravity field that closely approximates mean sea level. It\'s irregular due to mass distribution.',
    difficulty: 'medium'
  },

  // Additional Professional Practice questions
  {
    domain: 'Professional Practice',
    question: 'Professional liability insurance for surveyors typically covers:',
    options: ['Intentional misconduct', 'Errors and omissions', 'Criminal acts', 'Fraudulent behavior'],
    correctAnswer: 1,
    explanation: 'E&O (Errors and Omissions) insurance covers unintentional professional mistakes. It does NOT cover intentional wrongdoing, fraud, or criminal acts.',
    difficulty: 'easy'
  },
  {
    domain: 'Professional Practice',
    question: 'A surveyor discovers an error in a previously filed survey. The ethical action is to:',
    options: ['Ignore it if no one noticed', 'Correct it and notify affected parties', 'Wait for the client to discover it', 'Blame the field crew'],
    correctAnswer: 1,
    explanation: 'Professional ethics require prompt correction of errors and notification of affected parties. Public safety and welfare come first.',
    difficulty: 'easy'
  },
  {
    domain: 'Professional Practice',
    question: 'Chain of title refers to:',
    options: ['Surveying equipment', 'Historical ownership sequence', 'Legal description format', 'Boundary monumentation'],
    correctAnswer: 1,
    explanation: 'Chain of title is the chronological sequence of ownership transfers for a property, traced through deeds and public records.',
    difficulty: 'easy'
  },
  {
    domain: 'Professional Practice',
    question: 'A surveyor may NOT perform work in a state without:',
    options: ['A business license', 'Professional liability insurance', 'A valid license/registration in that state', 'Continuing education credits'],
    correctAnswer: 2,
    explanation: 'Surveying licensure is state-specific. You must be licensed/registered in each state where you practice surveying.',
    difficulty: 'easy'
  },

  // TOTAL: 50 questions (7 domains × 7 questions + 1 extra)
  // Domain distribution: Math(7), Field(7), Computations(7), Mapping(7), Boundary(7), Geodesy(7), Professional(8)
];
