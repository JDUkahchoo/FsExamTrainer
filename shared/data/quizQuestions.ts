export interface QuizQuestion {
  domain: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

import { PS_QUIZ_QUESTIONS } from './psQuizQuestions';

const FS_QUIZ_QUESTIONS: QuizQuestion[] = [
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
    domain: 'Survey Computations & Applications',
    question: 'The formula for interior angles of a polygon with n sides is:',
    options: ['(n-2) × 180°', '(n+2) × 180°', 'n × 180°', '(n-1) × 180°'],
    correctAnswer: 0,
    explanation: 'Sum of interior angles = (n-2) × 180°. For example, a triangle (n=3) has (3-2)×180° = 180°, a quadrilateral (n=4) has (4-2)×180° = 360°.',
    difficulty: 'easy'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'A bearing of N 45° 30\' E is equivalent to what azimuth from north?',
    options: ['45° 30\'', '45.5°', 'Both A and B', '315° 30\''],
    correctAnswer: 2,
    explanation: 'N 45° 30\' E means 45°30\' clockwise from North, which equals azimuth 45°30\' or 45.5° (since 30\' = 0.5°). Both representations are correct.',
    difficulty: 'easy'
  },
  {
    domain: 'Survey Computations & Applications',
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
    domain: 'Applied Mathematics & Statistics',
    question: 'The relationship between ellipsoid height (h), orthometric height (H), and geoid height (N) is:',
    options: ['h = H + N', 'H = h + N', 'N = h + H', 'h = H - N'],
    correctAnswer: 0,
    explanation: 'h = H + N, where h is ellipsoid height (from GPS), H is orthometric height (elevation above geoid/MSL), and N is geoid height (separation between ellipsoid and geoid).',
    difficulty: 'medium'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    question: 'NAD 83 is based on which ellipsoid?',
    options: ['Clarke 1866', 'GRS 80', 'WGS 84', 'Bessel'],
    correctAnswer: 1,
    explanation: 'NAD 83 uses the GRS 80 (Geodetic Reference System 1980) ellipsoid. NAD 27 used Clarke 1866. WGS 84 is nearly identical to GRS 80 but is a global system.',
    difficulty: 'medium'
  },
  {
    domain: 'Applied Mathematics & Statistics',
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
    domain: 'Survey Computations & Applications',
    question: 'The Departure of a 200.00 ft line with azimuth 135° is:',
    options: ['+141.42 ft', '-141.42 ft', '+100.00 ft', '-100.00 ft'],
    correctAnswer: 0,
    explanation: 'Departure = Distance × sin(Azimuth) = 200.00 × sin(135°) = 200.00 × 0.7071 = +141.42 ft (positive = East)',
    difficulty: 'medium'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'A simple horizontal curve has a radius of 500 ft and a central angle of 45°. What is the length of the curve?',
    options: ['392.70 ft', '500.00 ft', '225.00 ft', '707.11 ft'],
    correctAnswer: 0,
    explanation: 'L = (Δ/360°) × 2πR = (45°/360°) × 2π(500) = 0.125 × 3,141.59 = 392.70 ft. Or use L = RΔ (in radians): 500 × 0.7854 = 392.70 ft',
    difficulty: 'medium'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'The back azimuth of 45° 30\' is:',
    options: ['225° 30\'', '314° 30\'', '135° 30\'', '180° 00\''],
    correctAnswer: 0,
    explanation: 'Back azimuth = Forward azimuth ± 180°. For 45° 30\', add 180° = 225° 30\'',
    difficulty: 'easy'
  },
  {
    domain: 'Survey Computations & Applications',
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
    domain: 'Applied Mathematics & Statistics',
    question: 'RTK (Real-Time Kinematic) GPS typically achieves accuracy of:',
    options: ['±10-30 meters', '±1-3 meters', '±1-3 centimeters', '±1-3 millimeters'],
    correctAnswer: 2,
    explanation: 'RTK GPS provides centimeter-level accuracy (±1-3 cm) by using carrier phase measurements and a base station with known coordinates.',
    difficulty: 'medium'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    question: 'The combined factor for converting GPS distance to State Plane distance includes:',
    options: ['Scale factor only', 'Elevation factor only', 'Both scale and elevation factors', 'Neither factor'],
    correctAnswer: 2,
    explanation: 'Combined Factor = Scale Factor × Elevation Factor. This converts ellipsoid distances to grid distances at project elevation.',
    difficulty: 'medium'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    question: 'How many GPS satellites are required for a 3D position fix?',
    options: ['3 satellites', '4 satellites', '5 satellites', '6 satellites'],
    correctAnswer: 1,
    explanation: 'Minimum 4 satellites needed: 3 for X,Y,Z position and 1 for receiver clock correction. More satellites improve PDOP and accuracy.',
    difficulty: 'easy'
  },
  {
    domain: 'Applied Mathematics & Statistics',
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
  {
    domain: 'Math & Basic Science',
    question: 'The coefficient of thermal expansion for steel is approximately:',
    options: ['6.5 × 10⁻⁶ per °F', '6.5 × 10⁻³ per °F', '6.5 × 10⁻⁹ per °F', '6.5 per °F'],
    correctAnswer: 0,
    explanation: 'Steel expands/contracts at approximately 6.5 × 10⁻⁶ per degree Fahrenheit. This is used to calculate temperature corrections for steel tapes.',
    difficulty: 'medium'
  },

  // Additional Math & Basic Science questions (continuing to expand pool)
  {
    domain: 'Math & Basic Science',
    question: 'If the standard error of a distance measurement is ±0.02 ft, what is the standard error for a distance measured 4 times?',
    options: ['±0.02 ft', '±0.01 ft', '±0.04 ft', '±0.08 ft'],
    correctAnswer: 1,
    explanation: 'Standard error decreases with multiple measurements: SE = σ/√n = 0.02/√4 = 0.02/2 = ±0.01 ft',
    difficulty: 'medium'
  },
  {
    domain: 'Math & Basic Science',
    question: 'Convert 5280 feet to meters (1 meter = 3.28084 feet):',
    options: ['1609.3 m', '1760.0 m', '1000.0 m', '1524.0 m'],
    correctAnswer: 0,
    explanation: '5280 ft ÷ 3.28084 = 1609.3 m (exactly 1 mile)',
    difficulty: 'easy'
  },
  {
    domain: 'Math & Basic Science',
    question: 'The probable error (PE) is related to standard deviation by:',
    options: ['PE = 0.6745σ', 'PE = 2σ', 'PE = σ/2', 'PE = 3σ'],
    correctAnswer: 0,
    explanation: 'Probable Error = 0.6745 × standard deviation. This represents 50% confidence interval.',
    difficulty: 'hard'
  },
  {
    domain: 'Math & Basic Science',
    question: 'What is the area of a triangle with base 200 ft and height 150 ft?',
    options: ['15,000 sq ft', '30,000 sq ft', '7,500 sq ft', '20,000 sq ft'],
    correctAnswer: 0,
    explanation: 'Area = (base × height) / 2 = (200 × 150) / 2 = 15,000 sq ft',
    difficulty: 'easy'
  },
  {
    domain: 'Math & Basic Science',
    question: 'The variance of a dataset with values 10, 12, 14, 16 is:',
    options: ['5.0', '2.5', '6.0', '4.0'],
    correctAnswer: 0,
    explanation: 'Mean = 13. Deviations: -3, -1, 1, 3. Squared: 9, 1, 1, 9. Variance = (9+1+1+9)/4 = 5.0',
    difficulty: 'medium'
  },
  {
    domain: 'Math & Basic Science',
    question: 'How many square feet are in one square chain?',
    options: ['4,356 sq ft', '43,560 sq ft', '435.6 sq ft', '4,840 sq ft'],
    correctAnswer: 0,
    explanation: '1 chain = 66 ft, so 1 square chain = 66² = 4,356 sq ft',
    difficulty: 'medium'
  },

  // Additional Field Data Acquisition questions
  {
    domain: 'Field Data Acquisition',
    question: 'The sag correction for a 100-ft tape suspended with 15 lbs tension is (w = 0.1 lb/ft):',
    options: ['-0.03 ft', '-0.15 ft', '-0.01 ft', '+0.03 ft'],
    correctAnswer: 0,
    explanation: 'Sag correction = -(w²L³)/(24P²). With w=0.1, L=100, P=15: ≈ -0.03 ft. Always negative.',
    difficulty: 'hard'
  },
  {
    domain: 'Field Data Acquisition',
    question: 'In differential leveling, what is a turning point (TP)?',
    options: ['Point where instrument is set up', 'Point with both BS and FS readings', 'Benchmark', 'Point to be elevated'],
    correctAnswer: 1,
    explanation: 'A turning point (TP) is a temporary point where both a foresight (from old instrument position) and backsight (to new position) are taken.',
    difficulty: 'easy'
  },
  {
    domain: 'Field Data Acquisition',
    question: 'EDM instruments measure distance by:',
    options: ['Electromagnetic wave travel time', 'Laser triangulation', 'Ultrasonic reflection', 'Magnetic field strength'],
    correctAnswer: 0,
    explanation: 'Electronic Distance Measurement (EDM) devices measure the time for electromagnetic waves (light/infrared) to travel to a reflector and back.',
    difficulty: 'easy'
  },
  {
    domain: 'Field Data Acquisition',
    question: 'The error in leveling that increases with distance is:',
    options: ['Random error', 'Curvature and refraction', 'Instrument settlement', 'Parallax error'],
    correctAnswer: 1,
    explanation: 'Curvature and refraction error increases with the square of the distance. Random errors and settlement are not distance-dependent in the same way.',
    difficulty: 'medium'
  },
  {
    domain: 'Field Data Acquisition',
    question: 'A total station can directly measure all EXCEPT:',
    options: ['Horizontal angle', 'Vertical angle', 'Slope distance', 'Elevation'],
    correctAnswer: 3,
    explanation: 'Total stations directly measure horizontal angle, vertical angle, and slope distance. Elevation is computed from these measurements.',
    difficulty: 'medium'
  },
  {
    domain: 'Field Data Acquisition',
    question: 'The standard tension for a 100-ft steel tape is typically:',
    options: ['10 lbs', '15 lbs', '20 lbs', '25 lbs'],
    correctAnswer: 0,
    explanation: 'Standard tension for a 100-ft steel tape is typically 10 pounds under normal use.',
    difficulty: 'easy'
  },
  {
    domain: 'Field Data Acquisition',
    question: 'Atmospheric refraction causes a line of sight to:',
    options: ['Bend downward', 'Bend upward', 'Remain straight', 'Oscillate'],
    correctAnswer: 1,
    explanation: 'Atmospheric refraction bends light rays upward due to density variations. This partially offsets Earth\'s curvature (which bends the level surface downward).',
    difficulty: 'medium'
  },

  // Additional Plane Survey Computations questions
  {
    domain: 'Survey Computations & Applications',
    question: 'The tangent distance (T) for a horizontal curve with radius 500 ft and central angle 60° is:',
    options: ['288.68 ft', '500.00 ft', '433.01 ft', '250.00 ft'],
    correctAnswer: 0,
    explanation: 'T = R × tan(Δ/2) = 500 × tan(30°) = 500 × 0.5774 = 288.68 ft',
    difficulty: 'medium'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'A line has a bearing of S 30° W. What is its azimuth from north?',
    options: ['210°', '150°', '330°', '30°'],
    correctAnswer: 0,
    explanation: 'S 30° W means 30° west of south. Azimuth from north = 180° + 30° = 210°',
    difficulty: 'easy'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'The Latitude of a 300 ft line with azimuth 270° is:',
    options: ['0 ft', '-300 ft', '+300 ft', 'Cannot determine'],
    correctAnswer: 0,
    explanation: 'Latitude = Distance × cos(Azimuth) = 300 × cos(270°) = 300 × 0 = 0 ft. Line runs due west (no N/S component).',
    difficulty: 'medium'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'In the compass rule for traverse adjustment, corrections are proportional to:',
    options: ['The length of each course', 'The angle at each point', 'The error magnitude', 'The number of sides'],
    correctAnswer: 0,
    explanation: 'The compass (Bowditch) rule distributes closure errors proportionally to the length of each course. Longer lines get larger corrections.',
    difficulty: 'medium'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'The sum of exterior angles of any closed polygon traverse is:',
    options: ['360°', '(n-2) × 180°', '(n+2) × 180°', '180°'],
    correctAnswer: 0,
    explanation: 'The sum of exterior angles of any convex polygon is always 360°, regardless of the number of sides. The sum of interior angles is (n-2) × 180°.',
    difficulty: 'medium'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'For a circular curve, the degree of curve (arc definition) is the central angle subtended by:',
    options: ['100 ft arc', '50 ft arc', '1 ft arc', '1 station arc'],
    correctAnswer: 0,
    explanation: 'For arc definition, degree of curve (D) is the central angle subtended by a 100-ft arc. For chord definition, it\'s a 100-ft chord.',
    difficulty: 'medium'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'If Point A has coordinates (1000, 2000) and the azimuth to Point B is 45°, and distance is 141.42 ft, what are the coordinates of B?',
    options: ['(1100, 2100)', '(1141.42, 2000)', '(1000, 2141.42)', '(900, 1900)'],
    correctAnswer: 0,
    explanation: 'ΔE = 141.42 × sin(45°) = 100, ΔN = 141.42 × cos(45°) = 100. Coordinates B = (1000+100, 2000+100) = (1100, 2100)',
    difficulty: 'hard'
  },

  // Additional Mapping, GIS, and CAD questions
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'On a 1:2400 scale map, 1 inch represents:',
    options: ['200 feet', '240 feet', '2,400 feet', '24 feet'],
    correctAnswer: 0,
    explanation: '1:2400 means 1 inch = 2,400 inches = 200 feet (2,400/12)',
    difficulty: 'easy'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'A V-shaped contour pattern indicates:',
    options: ['A valley or stream', 'A ridge', 'A depression', 'Flat terrain'],
    correctAnswer: 0,
    explanation: 'V-shaped contours pointing uphill indicate a valley or drainage. V-shapes pointing downhill indicate a ridge.',
    difficulty: 'easy'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'UTM zones are each how many degrees wide?',
    options: ['6°', '3°', '10°', '15°'],
    correctAnswer: 0,
    explanation: 'Universal Transverse Mercator (UTM) zones are 6° of longitude wide, numbered 1-60 around the globe.',
    difficulty: 'medium'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'A DEM is best described as:',
    options: ['Digital Elevation Model', 'Direct Electronic Measurement', 'Datum Elevation Map', 'Distance Error Method'],
    correctAnswer: 0,
    explanation: 'DEM = Digital Elevation Model, a 3D representation of terrain surface stored as raster data with elevation values.',
    difficulty: 'easy'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'In photogrammetry, relief displacement is greatest for objects that are:',
    options: ['Tall and far from photo center', 'Short and near photo center', 'At any height at photo center', 'Tall and near photo center'],
    correctAnswer: 0,
    explanation: 'Relief displacement increases with object height and distance from photo nadir (center). Tall buildings at photo edges show maximum displacement.',
    difficulty: 'medium'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'The contour interval on a map should be:',
    options: ['Uniform throughout', 'Larger in flat areas', 'Smaller in steep areas', 'Variable by quadrant'],
    correctAnswer: 0,
    explanation: 'Contour interval must be uniform throughout a map to maintain consistent elevation representation.',
    difficulty: 'easy'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'Which map projection preserves shapes (is conformal)?',
    options: ['Mercator', 'Equal-area', 'Azimuthal equidistant', 'Cylindrical equal-area'],
    correctAnswer: 0,
    explanation: 'Mercator projection is conformal (preserves angles/shapes) but distorts area. Equal-area projections distort shapes to preserve area.',
    difficulty: 'medium'
  },

  // Additional Boundary Law & PLSS questions
  {
    domain: 'Boundary Law & PLSS',
    question: 'Senior rights in boundary determination typically belong to:',
    options: ['The earlier grant or deed', 'The larger parcel', 'The more accurate survey', 'The recorded deed'],
    correctAnswer: 0,
    explanation: 'Senior rights doctrine: earlier (senior) grants take priority over later (junior) grants when there are conflicts.',
    difficulty: 'medium'
  },
  {
    domain: 'Boundary Law & PLSS',
    question: 'In PLSS, the SE 1/4 of the NW 1/4 of Section 10 contains:',
    options: ['40 acres', '20 acres', '80 acres', '160 acres'],
    correctAnswer: 0,
    explanation: '1/4 of 1/4 of a section = 1/16 of 640 acres = 40 acres (quarter-quarter section)',
    difficulty: 'easy'
  },
  {
    domain: 'Boundary Law & PLSS',
    question: 'A metes and bounds description typically begins at:',
    options: ['Point of beginning (POB)', 'Northeast corner', 'Highest elevation', 'Nearest benchmark'],
    correctAnswer: 0,
    explanation: 'Metes and bounds descriptions start and end at the Point of Beginning (POB), describing the perimeter.',
    difficulty: 'easy'
  },
  {
    domain: 'Boundary Law & PLSS',
    question: 'Riparian rights refer to:',
    options: ['Water boundaries and usage', 'Mining rights', 'Timber harvesting', 'Airspace rights'],
    correctAnswer: 0,
    explanation: 'Riparian rights govern ownership and use of water along streams, rivers, and lakes adjacent to property.',
    difficulty: 'easy'
  },
  {
    domain: 'Boundary Law & PLSS',
    question: 'In PLSS, fractional sections typically occur:',
    options: ['Along township boundaries', 'In the center of townships', 'Only in error', 'Every sixth section'],
    correctAnswer: 0,
    explanation: 'Fractional (irregular) sections occur along township and range boundaries due to convergence of meridians and survey errors.',
    difficulty: 'medium'
  },
  {
    domain: 'Boundary Law & PLSS',
    question: 'A prescriptive easement requires all EXCEPT:',
    options: ['Written agreement', 'Open and notorious use', 'Continuous use', 'Hostile/adverse use'],
    correctAnswer: 0,
    explanation: 'Prescriptive easements are acquired WITHOUT permission or written agreement, through continuous, open, and adverse use over the statutory period.',
    difficulty: 'medium'
  },
  {
    domain: 'Boundary Law & PLSS',
    question: 'The doctrine of "found property controls" means:',
    options: ['Original monuments govern over measurements', 'Newer surveys are more accurate', 'Larger parcels have priority', 'Recorded deeds control'],
    correctAnswer: 0,
    explanation: 'Original monuments (found evidence) control over recorded distances and directions. Physical evidence trumps paper descriptions.',
    difficulty: 'medium'
  },

  // Additional Geodesy, GPS, Astronomy questions
  {
    domain: 'Applied Mathematics & Statistics',
    question: 'WGS 84 is primarily used for:',
    options: ['GPS positioning', 'State Plane Coordinates', 'Local site surveys', 'Building layout'],
    correctAnswer: 0,
    explanation: 'WGS 84 (World Geodetic System 1984) is the global reference system used by GPS satellites.',
    difficulty: 'easy'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    question: 'CORS stations provide:',
    options: ['Reference data for GPS corrections', 'Weather information', 'Satellite imagery', 'Topographic maps'],
    correctAnswer: 0,
    explanation: 'Continuously Operating Reference Stations (CORS) provide GPS/GNSS data for high-accuracy positioning and corrections.',
    difficulty: 'medium'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    question: 'The semi-major axis of the GRS 80 ellipsoid is approximately:',
    options: ['6,378,137 meters', '6,356,752 meters', '6,371,000 meters', '6,400,000 meters'],
    correctAnswer: 0,
    explanation: 'GRS 80 semi-major axis (equatorial radius) = 6,378,137 meters. Used by NAD 83.',
    difficulty: 'hard'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    question: 'Multipath error in GPS is caused by:',
    options: ['Signal reflections', 'Satellite geometry', 'Atmospheric delay', 'Clock errors'],
    correctAnswer: 0,
    explanation: 'Multipath occurs when GPS signals reflect off surfaces (buildings, ground, water) before reaching the antenna, causing position errors.',
    difficulty: 'medium'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    question: 'The flattening of the Earth ellipsoid is approximately:',
    options: ['1/298', '1/500', '1/100', '1/1000'],
    correctAnswer: 0,
    explanation: 'Earth\'s flattening ≈ 1/298.25 for GRS 80/WGS 84. This means the difference between equatorial and polar radius is about 21 km.',
    difficulty: 'hard'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    question: 'Static GPS surveying typically requires occupation times of:',
    options: ['30+ minutes', '30 seconds', '5 minutes', '2 hours minimum'],
    correctAnswer: 0,
    explanation: 'Static GPS requires extended occupation (typically 30+ minutes to hours) to achieve high accuracy through carrier phase processing.',
    difficulty: 'medium'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    question: 'NAVD 88 is a:',
    options: ['Vertical datum', 'Horizontal datum', 'Combined datum', 'Coordinate system'],
    correctAnswer: 0,
    explanation: 'North American Vertical Datum of 1988 (NAVD 88) is the vertical reference system for elevations in North America.',
    difficulty: 'easy'
  },

  // Additional Professional Practice questions
  {
    domain: 'Professional Practice',
    question: 'Standard of care for professional surveyors requires:',
    options: ['Reasonable skill expected of competent practitioners', 'Perfect accuracy', 'Lowest possible cost', 'Fastest completion time'],
    correctAnswer: 0,
    explanation: 'Standard of care is the level of skill, diligence, and judgment reasonably expected of a competent professional surveyor under similar circumstances.',
    difficulty: 'medium'
  },
  {
    domain: 'Professional Practice',
    question: 'A professional surveyor must maintain records for at least:',
    options: ['Varies by state law', '1 year', '5 years', '25 years'],
    correctAnswer: 0,
    explanation: 'Record retention requirements vary by state, typically ranging from 5-10 years, though many surveyors retain records permanently.',
    difficulty: 'medium'
  },
  {
    domain: 'Professional Practice',
    question: 'Monumentation of property corners is:',
    options: ['Often required by law or practice', 'Optional', 'Only for large parcels', 'Prohibited in some states'],
    correctAnswer: 0,
    explanation: 'Setting monuments at property corners is typically required by state law or standard practice to perpetuate boundaries.',
    difficulty: 'easy'
  },
  {
    domain: 'Professional Practice',
    question: 'A surveyor discovers a significant error in a filed map. The surveyor should:',
    options: ['File an amended map and notify affected parties', 'Do nothing if no one complains', 'Wait for the next survey', 'Only correct if hired to do so'],
    correctAnswer: 0,
    explanation: 'Professional ethics require prompt correction of discovered errors through amended maps and notification of affected parties.',
    difficulty: 'easy'
  },
  {
    domain: 'Professional Practice',
    question: 'The purpose of continuing education for licensed surveyors is to:',
    options: ['Maintain competency in evolving practices', 'Generate revenue for associations', 'Satisfy insurance requirements', 'Limit competition'],
    correctAnswer: 0,
    explanation: 'Continuing education ensures surveyors stay current with new technology, regulations, and best practices to serve the public effectively.',
    difficulty: 'easy'
  },
  {
    domain: 'Professional Practice',
    question: 'A survey plat must typically include all EXCEPT:',
    options: ['Property owner\'s financial information', 'Boundary dimensions', 'Monument descriptions', 'Surveyor\'s seal'],
    correctAnswer: 0,
    explanation: 'Survey plats show technical boundary information, monuments, and surveyor certification. Financial information is not required or appropriate.',
    difficulty: 'easy'
  },
  {
    domain: 'Professional Practice',
    question: 'Accepting work outside your area of competence is:',
    options: ['Unethical without proper education/training', 'Acceptable with supervision', 'Required to grow', 'Legal if licensed'],
    correctAnswer: 0,
    explanation: 'Professional ethics prohibit accepting assignments outside your competence unless you acquire the necessary knowledge or work with qualified individuals.',
    difficulty: 'medium'
  },

  // CONTENT GAP FILLERS - Added Nov 24, 2025 (18 new questions)
  
  // Math & Basic Science
  {
    domain: 'Math & Basic Science',
    question: 'The ratio of the circumference of a circle to its diameter is represented by:',
    options: ['Pi (π)', 'Phi (φ)', 'Euler\'s number (e)', 'Golden ratio'],
    correctAnswer: 0,
    explanation: 'π (pi) is the ratio of circumference to diameter. π ≈ 3.14159. Essential for area and perimeter calculations in surveying.',
    difficulty: 'easy'
  },
  {
    domain: 'Math & Basic Science',
    question: 'If a measurement has a standard error of 0.02 feet, what is the 99.7% confidence interval (3σ)?',
    options: ['±0.02 ft', '±0.06 ft', '±0.04 ft', '±0.08 ft'],
    correctAnswer: 1,
    explanation: 'The 99.7% confidence interval is 3σ. 3 × 0.02 = ±0.06 ft. This represents approximately 99.7% of measurements falling within this range.',
    difficulty: 'medium'
  },

  // Field Data Acquisition
  {
    domain: 'Field Data Acquisition',
    question: 'In leveling, if the instrument is not perfectly level, the error is called:',
    options: ['Parallax error', 'Collimation error', 'Refraction error', 'Curvature error'],
    correctAnswer: 1,
    explanation: 'Collimation error occurs when the line of sight is not truly horizontal. This is why leveling instruments must be carefully adjusted and used properly.',
    difficulty: 'medium'
  },
  {
    domain: 'Field Data Acquisition',
    question: 'When using a level rod, the "rod reading" should be taken at:',
    options: ['The middle of the rod graduation marks', 'Between the E and F marks', 'Directly at the horizontal cross-hair intersection', 'At the nearest inch mark'],
    correctAnswer: 2,
    explanation: 'The rod reading is the measurement where the horizontal cross-hair intersects the rod. Accuracy is critical - interpolation between marks is allowed.',
    difficulty: 'easy'
  },

  // Mapping, GIS, and CAD
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'In CAD, the Universal Transverse Mercator (UTM) projection is commonly used for maps at scales:',
    options: ['Larger than 1:100,000', 'Smaller than 1:100,000', '1:24,000', 'All of the above'],
    correctAnswer: 0,
    explanation: 'UTM is ideal for large-scale maps (detailed, zoomed-in views like 1:24,000 to 1:100,000 range). It minimizes distortion for these applications.',
    difficulty: 'medium'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'GIS data layers that have no geographic reference are called:',
    options: ['Raster data', 'Vector data', 'Non-spatial data', 'Topology'],
    correctAnswer: 2,
    explanation: 'Non-spatial data (like attribute tables) is information stored in a GIS that is not tied to geographic coordinates, but can be linked to spatial features.',
    difficulty: 'medium'
  },

  // Boundary Law & PLSS
  {
    domain: 'Boundary Law & PLSS',
    question: 'The Public Land Survey System (PLSS) divides land into sections, each nominally:',
    options: ['1 mile × 1 mile (640 acres)', '2 miles × 2 miles', '½ mile × ½ mile', '1 mile × 2 miles'],
    correctAnswer: 0,
    explanation: '1 section = 1 mile × 1 mile = 640 acres. There are 36 sections in a township (6 miles × 6 miles = 23,040 acres).',
    difficulty: 'easy'
  },
  {
    domain: 'Boundary Law & PLSS',
    question: 'In boundary disputes, the principle of "senior rights" means:',
    options: ['First in time, first in right', 'Higher-ranking officials decide', 'Recent surveys override old ones', 'Newer monuments are more accurate'],
    correctAnswer: 0,
    explanation: 'Senior rights doctrine: the original boundary location has priority. An earlier valid survey or establishment of a line takes precedence over later claims or surveys.',
    difficulty: 'medium'
  },

  // Surveying Principles
  {
    domain: 'Surveying Principles',
    question: 'The most precise method of distance measurement in modern surveying is:',
    options: ['Electronic Distance Measurement (EDM)', 'Steel tape', 'Pacing', 'Visual estimation'],
    correctAnswer: 0,
    explanation: 'EDM/laser technology can measure distances to ±1mm or better. Steel tapes are accurate to ±0.1 ft. EDM is standard for professional surveys.',
    difficulty: 'easy'
  },
  {
    domain: 'Surveying Principles',
    question: 'Angular measurements in surveying are most commonly made with:',
    options: ['Theodolite or Total Station', 'Transit', 'Compass', 'Protractor'],
    correctAnswer: 0,
    explanation: 'Modern surveys use Total Stations (combining angle and distance measurement) and theodolites. These provide precise angle measurements with digital readouts.',
    difficulty: 'easy'
  },
  {
    domain: 'Surveying Principles',
    question: 'A traverse is closed when:',
    options: ['The survey returns to the starting point and closure calculations are verified', 'The surveyor stops working', 'All angles are measured', 'The area is calculated'],
    correctAnswer: 0,
    explanation: 'A closed traverse returns to its starting point, allowing for error calculation and verification. Open traverses do not close on themselves.',
    difficulty: 'medium'
  },

  // Survey Computations & Applications
  {
    domain: 'Survey Computations & Applications',
    question: 'In a traverse, the algebraic sum of exterior angles should equal:',
    options: ['360° (for a closed traverse)', '0°', '180° × (n-2)', 'n × 90°'],
    correctAnswer: 0,
    explanation: 'For a closed traverse, exterior angles sum to 360°. This provides a check on angle measurements and is fundamental to traverse closure.',
    difficulty: 'medium'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'Convergence of meridians means:',
    options: ['Lines of longitude converge toward the poles', 'State boundary lines merge together', 'Multiple surveys must match up', 'Measurements become less accurate'],
    correctAnswer: 0,
    explanation: 'Meridian convergence: lines of longitude (meridians) converge at the poles. This is critical for computing State Plane Coordinates and map projections.',
    difficulty: 'medium'
  },

  // Applied Mathematics & Statistics
  {
    domain: 'Applied Mathematics & Statistics',
    question: 'In a probability distribution, the standard deviation is a measure of:',
    options: ['Spread or dispersion of data', 'Average value', 'Mode of data', 'Range of data'],
    correctAnswer: 0,
    explanation: 'Standard deviation (σ) measures how spread out data is from the mean. Larger σ = more variation. Critical for understanding measurement uncertainty.',
    difficulty: 'medium'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    question: 'The root mean square (RMS) error combines:',
    options: ['All error components into a single value', 'Only systematic errors', 'Only random errors', 'Largest error only'],
    correctAnswer: 0,
    explanation: 'RMS error = √(e₁² + e₂² + ... + eₙ²)/n. It combines all individual errors into one overall accuracy measure used to assess survey quality.',
    difficulty: 'hard'
  },

  // Boundary Law & PLSS (additional)
  {
    domain: 'Boundary Law & PLSS',
    question: 'Under the Torrens System of land title:',
    options: ['A government-issued title certificate is the best evidence of ownership', 'Possession is the only proof needed', 'Field surveys are not required', 'Boundary disputes cannot be resolved'],
    correctAnswer: 0,
    explanation: 'The Torrens System provides government-issued certificates of title as conclusive evidence of ownership. Adopted in some U.S. states and most countries.',
    difficulty: 'medium'
  },

  // Professional Practice (additional)
  {
    domain: 'Professional Practice',
    question: 'When a surveyor finds an existing survey monument while working:',
    options: ['It should be preserved, protected, and respected', 'It should be replaced if the surveyor disagrees', 'It can be ignored if it\'s old', 'It may be destroyed if in the way'],
    correctAnswer: 0,
    explanation: 'Professional ethics and law require preserving existing monuments. They represent prior boundary establishment and must be respected and protected.',
    difficulty: 'easy'
  },

  // EXPANDED POOL FROM SRM TOPIC 3: Plane Survey Calculations
  // Added December 2025 - Traverse, Area, Partitioning, Horizontal Curves

  // === TRAVERSE CALCULATIONS (Chapter 17) ===
  {
    domain: 'Survey Computations & Applications',
    question: 'When computing latitude in a traverse, the formula Latitude = Distance × cos(Bearing) gives:',
    options: ['The north-south component of the line', 'The east-west component of the line', 'The total line length', 'The bearing angle'],
    correctAnswer: 0,
    explanation: 'Latitude (ΔN) = d × cos(azimuth) represents the north-south projection of a traverse line. Positive = north, negative = south.',
    difficulty: 'medium'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'Departure in traverse computation represents:',
    options: ['The east-west component of a line', 'The north-south component of a line', 'The slope distance', 'The elevation difference'],
    correctAnswer: 0,
    explanation: 'Departure (ΔE) = d × sin(azimuth) represents the east-west projection of a traverse line. Positive = east, negative = west.',
    difficulty: 'medium'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'For a closed traverse, the sum of all latitudes should theoretically equal:',
    options: ['Zero', 'The perimeter', 'The total area', 'The number of stations'],
    correctAnswer: 0,
    explanation: 'In a perfect closed traverse, ΣLatitudes = 0 and ΣDepartures = 0. Any non-zero sum indicates error of closure.',
    difficulty: 'medium'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'The angular closure error in a closed traverse is calculated by comparing the sum of interior angles to:',
    options: ['(n-2) × 180°, where n is the number of sides', '360°', 'n × 180°', '(n+2) × 180°'],
    correctAnswer: 0,
    explanation: 'The sum of interior angles in a polygon = (n-2) × 180°. For a 5-sided traverse: (5-2) × 180° = 540°.',
    difficulty: 'medium'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'The error of closure in a traverse is computed as:',
    options: ['√(ΣLatitude² + ΣDeparture²)', 'ΣLatitude + ΣDeparture', '(ΣLatitude + ΣDeparture)/2', 'ΣLatitude × ΣDeparture'],
    correctAnswer: 0,
    explanation: 'Error of closure = √(Σlat² + Σdep²). This is the linear distance between where the traverse should close and where it actually closes.',
    difficulty: 'hard'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'The ratio of precision for a traverse is expressed as:',
    options: ['1:perimeter/error', 'Error/perimeter', 'Perimeter × error', 'Error × number of stations'],
    correctAnswer: 0,
    explanation: 'Ratio of precision = 1:(perimeter/error of closure). Example: 5000 ft perimeter with 0.25 ft error = 1:20,000.',
    difficulty: 'hard'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'The Compass Rule for adjusting a traverse distributes the closure error:',
    options: ['In proportion to the lengths of traverse sides', 'Equally to each angle', 'Only to the longest side', 'In proportion to the angles'],
    correctAnswer: 0,
    explanation: 'Compass Rule (Bowditch): Correction = (length of side/perimeter) × total error. Adjusts proportionally to line lengths.',
    difficulty: 'hard'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'If a traverse line has bearing N 45°30\' E and distance 250.00 ft, the departure is approximately:',
    options: ['178.4 ft', '176.0 ft', '250.0 ft', '125.0 ft'],
    correctAnswer: 0,
    explanation: 'Departure = d × sin(bearing) = 250 × sin(45°30\') = 250 × 0.7133 = 178.3 ft (east). The sine gives the east-west component.',
    difficulty: 'medium'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'When computing an inverse (finding bearing from coordinates), if ΔE is positive and ΔN is positive, the bearing is in which quadrant?',
    options: ['Northeast', 'Southeast', 'Southwest', 'Northwest'],
    correctAnswer: 0,
    explanation: 'Positive ΔN = north, positive ΔE = east, so the bearing is in the NE quadrant (N x° E). Use tan⁻¹(ΔE/ΔN) for the angle.',
    difficulty: 'medium'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'A closed traverse has angular misclosure of 30 seconds with 6 angles. How much correction per angle?',
    options: ['5 seconds', '30 seconds', '6 seconds', '3 seconds'],
    correctAnswer: 0,
    explanation: 'Angular correction = total error / number of angles = 30"/6 = 5" per angle. Distribute equally or proportionally.',
    difficulty: 'medium'
  },

  // === AREA CALCULATIONS (Chapter 18) ===
  {
    domain: 'Survey Computations & Applications',
    question: 'In the DMD (Double Meridian Distance) method for area calculation, the DMD of the first line equals:',
    options: ['The departure of that line', 'The latitude of that line', 'Zero', 'The perimeter'],
    correctAnswer: 0,
    explanation: 'DMD of first line = departure of first line. For subsequent lines: DMD = DMD of previous line + departure of previous line + departure of current line.',
    difficulty: 'hard'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'Using the coordinate method, the area of a traverse can be computed by:',
    options: ['Taking half the absolute value of cross-multiplied coordinate differences', 'Adding all coordinates together', 'Multiplying all X by all Y coordinates', 'Summing all latitudes and departures'],
    correctAnswer: 0,
    explanation: 'Coordinate method: Area = ½|Σ(Xᵢ × Yᵢ₊₁ - Xᵢ₊₁ × Yᵢ)|. Uses cross-multiplication of adjacent coordinates.',
    difficulty: 'hard'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'In the DMD method, double area equals:',
    options: ['Σ(DMD × Latitude)', 'Σ(DMD × Departure)', 'Σ(Latitude × Departure)', 'DMD × perimeter'],
    correctAnswer: 0,
    explanation: 'Double Area = Σ(DMD × Latitude) for each traverse line. Divide by 2 for actual area. Use absolute value.',
    difficulty: 'hard'
  },
  {
    domain: 'Math & Basic Science',
    question: 'To convert square feet to acres, divide by:',
    options: ['43,560', '5,280', '640', '4,840'],
    correctAnswer: 0,
    explanation: '1 acre = 43,560 sq ft. Example: 217,800 sq ft ÷ 43,560 = 5.0 acres. Critical conversion for land area.',
    difficulty: 'easy'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'The area of a triangle given two sides a and b and included angle C is:',
    options: ['½ × a × b × sin(C)', 'a × b × cos(C)', 'a + b + C', '½ × (a + b) × C'],
    correctAnswer: 0,
    explanation: 'Area = ½ab sin(C). For example, sides of 100 ft and 150 ft with 60° angle: Area = ½(100)(150)sin(60°) = 6,495 sq ft.',
    difficulty: 'medium'
  },

  // === HORIZONTAL CURVES (Chapter 20) ===
  {
    domain: 'Survey Computations & Applications',
    question: 'The degree of curve (arc definition) is the central angle subtended by:',
    options: ['A 100-foot arc', 'A 100-foot chord', 'A 50-foot arc', 'A full circle'],
    correctAnswer: 0,
    explanation: 'Arc definition (highway): D° subtends a 100 ft arc. Used for most highway curves. D = 5729.58/R.',
    difficulty: 'medium'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'For a horizontal curve, the relationship between radius R and degree of curve D (arc definition) is:',
    options: ['R = 5729.58/D', 'R = D × 100', 'R = D/360', 'R = 100/D'],
    correctAnswer: 0,
    explanation: 'R = 5729.58/D (arc basis) where D is in degrees. A 6° curve has radius 5729.58/6 = 954.9 ft.',
    difficulty: 'medium'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'The tangent distance (T) from the PI to the PC or PT is calculated by:',
    options: ['T = R × tan(Δ/2)', 'T = R × sin(Δ)', 'T = R × cos(Δ)', 'T = 2R × tan(Δ)'],
    correctAnswer: 0,
    explanation: 'T = R × tan(Δ/2), where Δ is the deflection angle (intersection angle). The tangent is always measured from the PI.',
    difficulty: 'hard'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'The length of a horizontal curve (arc length) is calculated by:',
    options: ['L = (π × R × Δ)/180°', 'L = R × Δ', 'L = 2πR', 'L = R/Δ'],
    correctAnswer: 0,
    explanation: 'L = πRΔ/180° (with Δ in degrees) or L = RΔ (with Δ in radians). This is the arc distance from PC to PT.',
    difficulty: 'medium'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'The long chord (LC) of a horizontal curve is computed by:',
    options: ['LC = 2R × sin(Δ/2)', 'LC = R × tan(Δ)', 'LC = πRΔ/180', 'LC = R × cos(Δ)'],
    correctAnswer: 0,
    explanation: 'LC = 2R × sin(Δ/2). This is the straight-line distance from PC to PT, always shorter than the arc.',
    difficulty: 'medium'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'The external distance (E) from the PI to the middle of the curve is:',
    options: ['E = R × (sec(Δ/2) - 1)', 'E = R × tan(Δ/2)', 'E = R × sin(Δ/2)', 'E = R × cos(Δ/2)'],
    correctAnswer: 0,
    explanation: 'E = R(sec(Δ/2) - 1) = R(exsec(Δ/2)). The external distance extends from PI radially inward to the curve.',
    difficulty: 'hard'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'The middle ordinate (M) of a horizontal curve is:',
    options: ['The distance from long chord midpoint to curve midpoint', 'The radius of the curve', 'The tangent distance', 'The external distance'],
    correctAnswer: 0,
    explanation: 'Middle ordinate M = R(1 - cos(Δ/2)) = R × vers(Δ/2). It measures from the midpoint of the long chord perpendicular to the curve.',
    difficulty: 'medium'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'PC and PT in horizontal curve terminology stand for:',
    options: ['Point of Curvature and Point of Tangency', 'Perpendicular Coordinate and Parallel Tangent', 'Principal Control and Primary Target', 'Point of Contact and Point of Transition'],
    correctAnswer: 0,
    explanation: 'PC = Point of Curvature (where curve begins), PT = Point of Tangency (where curve ends). PI = Point of Intersection (where tangents meet).',
    difficulty: 'easy'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'For a 4° curve (arc definition), what is the radius?',
    options: ['1,432.4 ft', '400 ft', '573.0 ft', '2,864.8 ft'],
    correctAnswer: 0,
    explanation: 'R = 5729.58/D = 5729.58/4 = 1,432.4 ft. Higher degree = sharper curve = smaller radius.',
    difficulty: 'medium'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'The deflection angle method for staking curves uses:',
    options: ['Half the arc angle for each chord point', 'The full central angle', 'Random angles', 'Only the tangent direction'],
    correctAnswer: 0,
    explanation: 'Deflection from tangent at PC = ½ × arc angle. For a D° curve with 100 ft stations: deflection per station = D/2.',
    difficulty: 'hard'
  },

  // === PARTITIONING OF LAND (Chapter 19) ===
  {
    domain: 'Survey Computations & Applications',
    question: 'A cutoff line in land partitioning is:',
    options: ['A line used to divide a tract into two parts for calculation', 'A line marking property boundaries', 'A contour line', 'A reference meridian'],
    correctAnswer: 0,
    explanation: 'A cutoff line divides a traverse into two sub-traverses for area computation. Used when partitioning irregular tracts.',
    difficulty: 'medium'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'When dividing a tract by a line from one corner to cut off a specific area, which method is commonly used?',
    options: ['Law of Sines with the triangle area formula', 'Simple averaging', 'Parallel line method only', 'Random point selection'],
    correctAnswer: 0,
    explanation: 'Area of triangle = ½ × a × b × sin(C). Solve for unknown side using A = ½(known side)(unknown side)sin(angle).',
    difficulty: 'hard'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'To divide a tract into two equal parts with a line parallel to one side, you would typically:',
    options: ['Use a trapezoid area formula and solve for the unknown altitude', 'Draw a diagonal and bisect it', 'Use only the perimeter', 'Ignore the original shape'],
    correctAnswer: 0,
    explanation: 'For parallel division: set up trapezoid ABLK with known half-area, then solve quadratic equation for altitude r.',
    difficulty: 'hard'
  },

  // === ADDITIONAL FIELD CALCULATIONS ===
  {
    domain: 'Surveying Principles',
    question: 'When computing coordinates from a traverse, the coordinates of point B given point A are:',
    options: ['Nᵦ = Nₐ + Latitude, Eᵦ = Eₐ + Departure', 'Nᵦ = Nₐ × Latitude, Eᵦ = Eₐ × Departure', 'Nᵦ = Latitude - Nₐ, Eᵦ = Departure - Eₐ', 'Nᵦ = Nₐ/Latitude, Eᵦ = Eₐ/Departure'],
    correctAnswer: 0,
    explanation: 'Coordinate geometry: N(new) = N(old) + latitude, E(new) = E(old) + departure. Latitudes and departures are signed values.',
    difficulty: 'medium'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'The versed sine (vers) of an angle θ equals:',
    options: ['1 - cos(θ)', 'sin(θ) - 1', 'tan(θ) + 1', 'cos(θ) + 1'],
    correctAnswer: 0,
    explanation: 'Versed sine: vers θ = 1 - cos θ. Used in curve calculations. Example: vers 30° = 1 - 0.866 = 0.134.',
    difficulty: 'hard'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'The external secant (exsec) of an angle θ equals:',
    options: ['sec(θ) - 1', 'sec(θ) + 1', '1/cos(θ)', 'tan(θ) - 1'],
    correctAnswer: 0,
    explanation: 'External secant: exsec θ = sec θ - 1 = (1/cos θ) - 1. Used in external distance calculations for curves.',
    difficulty: 'hard'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'In a forward traverse calculation from A to B, if the bearing is S 35° W and distance is 400 ft, the latitude is:',
    options: ['−327.7 ft (south)', '+327.7 ft (north)', '−229.4 ft', '+400.0 ft'],
    correctAnswer: 0,
    explanation: 'Latitude = d × cos(bearing) = 400 × cos(35°) = 327.7 ft. Since bearing is S, latitude is negative (south).',
    difficulty: 'medium'
  },
  {
    domain: 'Math & Basic Science',
    question: 'The Law of Cosines states that for a triangle with sides a, b, c and angle C opposite side c:',
    options: ['c² = a² + b² - 2ab cos(C)', 'c = a + b - cos(C)', 'c² = a² + b² + 2ab cos(C)', 'c = a × b × cos(C)'],
    correctAnswer: 0,
    explanation: 'Law of Cosines: c² = a² + b² - 2ab cos(C). Essential for solving triangles when you know two sides and included angle.',
    difficulty: 'medium'
  },
  {
    domain: 'Math & Basic Science',
    question: 'The Law of Sines states:',
    options: ['a/sin(A) = b/sin(B) = c/sin(C)', 'a × sin(A) = b × sin(B)', 'sin(A)/a = cos(B)/b', 'a + sin(A) = b + sin(B)'],
    correctAnswer: 0,
    explanation: 'Law of Sines: a/sin(A) = b/sin(B) = c/sin(C). Use when you know angle-side-angle or angle-angle-side.',
    difficulty: 'medium'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'If a traverse has a perimeter of 3,500 ft and an error of closure of 0.14 ft, the ratio of precision is:',
    options: ['1:25,000', '1:3,500', '1:14,000', '1:250'],
    correctAnswer: 0,
    explanation: 'Ratio = 1:(perimeter/error) = 1:(3500/0.14) = 1:25,000. Higher ratio = better precision.',
    difficulty: 'medium'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'When adjusting a traverse by the compass rule, the latitude correction for a line is:',
    options: ['(Line length/Perimeter) × Total latitude error', 'Total error/Number of lines', 'Line length × Total error', 'Perimeter/Line length'],
    correctAnswer: 0,
    explanation: 'Compass Rule correction: Cₗₐₜ = (Line length/Perimeter) × ΣLatitude error. Distributes proportionally to line lengths.',
    difficulty: 'hard'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'A compound curve consists of:',
    options: ['Two or more simple curves of different radii curving in the same direction', 'Two curves curving in opposite directions', 'A straight line and a curve', 'A single curve with constant radius'],
    correctAnswer: 0,
    explanation: 'Compound curve: two+ simple curves with different radii, same direction, with a common tangent point. Used in mountainous terrain.',
    difficulty: 'medium'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'A reverse curve is characterized by:',
    options: ['Two curves of the same or different radii curving in opposite directions', 'A single curve with constant radius', 'Two curves with the same radius curving the same way', 'A spiral transition'],
    correctAnswer: 0,
    explanation: 'Reverse curve: two curves with a common tangent point, curving in opposite directions. Creates an S-shape. Generally avoided on highways.',
    difficulty: 'medium'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'Spiral or transition curves are used to:',
    options: ['Gradually change curvature from straight to circular', 'Create a constant radius curve', 'Measure deflection angles', 'Calculate area'],
    correctAnswer: 0,
    explanation: 'Spiral curves provide gradual curvature transition from tangent (infinite radius) to circular arc (finite radius). Improves vehicle dynamics.',
    difficulty: 'medium'
  },

  // === APPLIED MATHEMATICS ===
  {
    domain: 'Applied Mathematics & Statistics',
    question: 'When solving a quadratic equation ax² + bx + c = 0, the quadratic formula gives:',
    options: ['x = (-b ± √(b²-4ac))/2a', 'x = -b/2a', 'x = (b ± √(b²+4ac))/2a', 'x = a² + b² - c'],
    correctAnswer: 0,
    explanation: 'Quadratic formula: x = (-b ± √(b²-4ac))/2a. Used in partitioning problems and curve calculations.',
    difficulty: 'medium'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    question: 'The discriminant (b² - 4ac) of a quadratic equation tells us:',
    options: ['How many real solutions exist', 'The exact solution value', 'The area under the curve', 'The maximum value'],
    correctAnswer: 0,
    explanation: 'Discriminant > 0: two real solutions. Discriminant = 0: one solution. Discriminant < 0: no real solutions.',
    difficulty: 'medium'
  },
  {
    domain: 'Math & Basic Science',
    question: 'To find the angle when given opposite and adjacent sides, use:',
    options: ['tan⁻¹(opposite/adjacent)', 'sin⁻¹(adjacent/opposite)', 'cos⁻¹(opposite/hypotenuse)', 'tan(opposite × adjacent)'],
    correctAnswer: 0,
    explanation: 'tan θ = opposite/adjacent, so θ = tan⁻¹(opp/adj). Critical for computing bearings from coordinate differences.',
    difficulty: 'easy'
  },

  // === FIELD DATA ACQUISITION ===
  {
    domain: 'Field Data Acquisition',
    question: 'When measuring angles in a traverse, taking both direct and reverse readings helps eliminate:',
    options: ['Instrument systematic errors', 'Random pointing errors only', 'Distance measurement errors', 'Temperature effects'],
    correctAnswer: 0,
    explanation: 'Direct and reverse (D&R) readings average out systematic instrumental errors like axis misalignment and circle graduation errors.',
    difficulty: 'medium'
  },
  {
    domain: 'Field Data Acquisition',
    question: 'The purpose of balancing angles before computing traverse coordinates is to:',
    options: ['Ensure the traverse will close mathematically', 'Increase measurement speed', 'Reduce the number of calculations', 'Eliminate the need for distance measurement'],
    correctAnswer: 0,
    explanation: 'Angular balance ensures interior angles sum to (n-2)×180°, which is necessary for the traverse to close properly when computing coordinates.',
    difficulty: 'medium'
  },

  // === SRM TOPIC 2: FIELD DATA ACQUISITION (Chapters 13-16) ===
  
  // TAPING (Chapter 13) - Word Problems
  {
    domain: 'Field Data Acquisition',
    question: 'A Gunter\'s chain is how long, and how many links does it contain?',
    options: ['66 ft with 100 links', '100 ft with 66 links', '50 ft with 100 links', '100 ft with 100 links'],
    correctAnswer: 0,
    explanation: 'Gunter\'s chain = 66 ft = 100 links (each link = 7.92 in). One chain = 1/80 mile. 10 square chains = 1 acre (43,560 sq ft).',
    difficulty: 'medium'
  },
  {
    domain: 'Field Data Acquisition',
    question: 'A surveyor measures a slope distance of 250.00 ft on ground with a 15% grade. What is the horizontal distance?',
    options: ['247.2 ft', '250.0 ft', '237.5 ft', '212.5 ft'],
    correctAnswer: 0,
    explanation: '15% grade means vertical = 0.15 × horizontal. Using H = S × cos(θ) where tan(θ) = 0.15: θ = 8.53°, H = 250 × cos(8.53°) = 247.2 ft.',
    difficulty: 'hard'
  },
  {
    domain: 'Field Data Acquisition',
    question: 'A 100 ft steel tape is standardized at 68°F. If used at 95°F, what happens to measurements?',
    options: ['Measured distances are too short; add a correction', 'Measured distances are too long; subtract a correction', 'No change needed', 'Measured distances are exactly correct'],
    correctAnswer: 0,
    explanation: 'Higher temperature causes tape expansion. An expanded tape covers more ground per tape length, so measured distances are too short. Add temperature correction.',
    difficulty: 'medium'
  },
  {
    domain: 'Field Data Acquisition',
    question: 'When "breaking tape" on steep terrain, what is the correct procedure?',
    options: ['Hold tape horizontally and measure partial lengths, using a plumb bob to mark points', 'Measure the full length along the slope and calculate correction later', 'Only measure downhill, never uphill', 'Use an electronic distance meter instead'],
    correctAnswer: 0,
    explanation: 'Breaking tape: on steep slopes, hold tape horizontally, measure partial lengths (usually ending in 0 or 5 ft), use plumb bob to mark ground points.',
    difficulty: 'medium'
  },
  {
    domain: 'Field Data Acquisition',
    question: 'An Invar tape is used primarily because it:',
    options: ['Has minimal thermal expansion (about 3% of steel)', 'Is stronger than steel tape', 'Is cheaper than steel tape', 'Can measure longer distances'],
    correctAnswer: 0,
    explanation: 'Invar (35% nickel alloy) has thermal expansion only 3% of steel, making it ideal for precise baseline measurements and calibrating steel tapes.',
    difficulty: 'medium'
  },
  {
    domain: 'Field Data Acquisition',
    question: 'A surveyor applies 20 lbf tension to a 100 ft tape standardized at 10 lbf. The tape will:',
    options: ['Stretch and give a distance reading that is too short', 'Contract and give a distance reading that is too long', 'Not be affected by tension differences', 'Break under the extra tension'],
    correctAnswer: 0,
    explanation: 'Extra tension stretches the tape, covering more ground. Fewer tape lengths = shorter recorded distance. Tension correction must be added.',
    difficulty: 'hard'
  },
  {
    domain: 'Field Data Acquisition',
    question: 'A surveyor measures 326.18 ft using an "add tape." The whole foot reading was 326 ft. What was the reading at the graduated end?',
    options: ['0.18 ft beyond zero', '0.82 ft from 327 ft mark', '326 ft exactly', '3.26 ft'],
    correctAnswer: 0,
    explanation: 'Add tape: extra graduated foot beyond zero. Distance = whole feet (326) + extra reading (0.18) = 326.18 ft.',
    difficulty: 'medium'
  },

  // TAPING CORRECTIONS - Computational Problems
  {
    domain: 'Field Data Acquisition',
    question: 'A 100 ft steel tape (α = 0.00000645/°F) is standardized at 68°F. A distance is measured as 872.54 ft at 95°F. What is the corrected distance?',
    options: ['872.69 ft', '872.54 ft', '872.39 ft', '873.02 ft'],
    correctAnswer: 0,
    explanation: 'Temperature correction: Ct = α × (T − Ts) × L = 0.00000645 × (95 − 68) × 872.54 = +0.152 ft. Corrected distance = 872.54 + 0.15 = 872.69 ft. Tape expands in heat, so measured distance is too short — add correction.',
    difficulty: 'hard'
  },
  {
    domain: 'Field Data Acquisition',
    question: 'A steel tape (α = 0.00000645/°F) standardized at 68°F is used at 32°F to measure 500.00 ft. What is the temperature correction?',
    options: ['−0.116 ft', '+0.116 ft', '−0.058 ft', '+0.058 ft'],
    correctAnswer: 0,
    explanation: 'Ct = α × (T − Ts) × L = 0.00000645 × (32 − 68) × 500.00 = 0.00000645 × (−36) × 500 = −0.116 ft. Cold temperature shrinks the tape, so correction is negative.',
    difficulty: 'hard'
  },
  {
    domain: 'Field Data Acquisition',
    question: 'A 100 ft steel tape (cross-section area A = 0.003 sq in, E = 29,000,000 psi) is standardized at 10 lbf. If 25 lbf tension is applied, what is the tension correction per tape length?',
    options: ['+0.017 ft', '−0.017 ft', '+0.172 ft', '+0.0017 ft'],
    correctAnswer: 0,
    explanation: 'Tension correction: Cp = (P − Ps) × L / (A × E) = (25 − 10) × 100 / (0.003 × 29,000,000) = 1500 / 87,000 = +0.017 ft. Extra tension stretches the tape — add correction.',
    difficulty: 'hard'
  },
  {
    domain: 'Field Data Acquisition',
    question: 'A surveyor measures 450.00 ft with a tape under 30 lbf tension. The tape is standardized at 12 lbf, has A = 0.004 sq in and E = 29,000,000 psi. What is the total tension correction?',
    options: ['+0.070 ft', '−0.070 ft', '+0.035 ft', '+0.140 ft'],
    correctAnswer: 0,
    explanation: 'Cp = (P − Ps) × L / (A × E) = (30 − 12) × 450 / (0.004 × 29,000,000) = 8,100 / 116,000 = +0.070 ft. More tension = longer tape = measured distance too short = add correction.',
    difficulty: 'hard'
  },
  {
    domain: 'Field Data Acquisition',
    question: 'The sag correction for a 100 ft tape weighing 1.5 lbs total, supported at endpoints with 12 lbf tension is:',
    options: ['−0.065 ft', '+0.065 ft', '−0.130 ft', '−0.033 ft'],
    correctAnswer: 0,
    explanation: 'Unit weight w = 1.5/100 = 0.015 lb/ft. Sag correction: Cs = −w²L³/(24P²) = −(0.015²)(100³)/(24 × 12²) = −(0.000225 × 1,000,000)/(3,456) = −225/3,456 = −0.065 ft. Sag always makes measured distance too long — correction is always negative.',
    difficulty: 'hard'
  },
  {
    domain: 'Field Data Acquisition',
    question: 'A 100 ft steel tape weighs 2.0 lbs. It is supported at the ends only with 20 lbf of tension. What is the sag correction?',
    options: ['−0.042 ft', '+0.042 ft', '−0.083 ft', '−0.021 ft'],
    correctAnswer: 0,
    explanation: 'w = 2.0/100 = 0.02 lb/ft. Cs = −w²L³/(24P²) = −(0.02²)(100³)/(24 × 20²) = −(0.0004 × 1,000,000)/9,600 = −400/9,600 = −0.042 ft. Sag correction is always negative.',
    difficulty: 'hard'
  },
  {
    domain: 'Field Data Acquisition',
    question: 'A tape is known to be 100.03 ft long (too long by 0.03 ft). A measured distance reads 856.27 ft. What is the corrected distance?',
    options: ['856.53 ft', '856.01 ft', '856.27 ft', '855.98 ft'],
    correctAnswer: 0,
    explanation: 'Correction for incorrect length: Corrected = Measured × (Actual Length / Nominal Length) = 856.27 × (100.03/100) = 856.27 + (0.03/100 × 856.27) = 856.27 + 0.257 = 856.53 ft. A long tape means measured distance is too short — add correction.',
    difficulty: 'hard'
  },
  {
    domain: 'Field Data Acquisition',
    question: 'A 100 ft tape is actually 99.97 ft (too short by 0.03 ft). A line measured with it reads 623.45 ft. What is the true distance?',
    options: ['623.26 ft', '623.64 ft', '623.45 ft', '623.08 ft'],
    correctAnswer: 0,
    explanation: 'Corrected = Measured × (Actual/Nominal) = 623.45 × (99.97/100) = 623.45 − (0.03/100 × 623.45) = 623.45 − 0.187 = 623.26 ft. A short tape means measured distance is too long — subtract correction.',
    difficulty: 'hard'
  },
  {
    domain: 'Field Data Acquisition',
    question: 'A surveyor lays out a building corner at exactly 200.00 ft using a tape that is actually 100.02 ft long. What distance should be set?',
    options: ['199.96 ft', '200.04 ft', '200.00 ft', '199.98 ft'],
    correctAnswer: 0,
    explanation: 'When laying out (setting a distance), reverse the correction. The tape is too long, so each "100 ft" is actually 100.02. To get 200.00 true ft: Set distance = 200.00 × (100/100.02) = 199.96 ft on the tape.',
    difficulty: 'hard'
  },
  {
    domain: 'Field Data Acquisition',
    question: 'A 300 ft distance is measured but the rear end of the tape is offset 1.5 ft from the true line. What is the alignment correction?',
    options: ['−0.004 ft', '+0.004 ft', '−0.75 ft', '−1.5 ft'],
    correctAnswer: 0,
    explanation: 'Alignment correction: Ca = −d²/(2L) = −(1.5²)/(2 × 300) = −2.25/600 = −0.004 ft. Misalignment always makes the measured distance too long. This small error shows why minor alignment issues are negligible for long lines.',
    difficulty: 'hard'
  },
  {
    domain: 'Field Data Acquisition',
    question: 'A 100 ft tape measurement has the end offset 2.0 ft perpendicular to the line. What is the error due to this misalignment?',
    options: ['−0.020 ft', '+0.020 ft', '−2.000 ft', '−0.200 ft'],
    correctAnswer: 0,
    explanation: 'Alignment error: Ca = −d²/(2L) = −(2.0²)/(2 × 100) = −4.0/200 = −0.020 ft. Being off-line always makes measured distance longer than true distance.',
    difficulty: 'medium'
  },
  {
    domain: 'Field Data Acquisition',
    question: 'A surveyor measures 534.82 ft with these conditions: temperature correction = +0.12 ft, sag correction = −0.08 ft, tape too long by 0.02 ft per 100 ft. What is the fully corrected distance?',
    options: ['534.97 ft', '534.67 ft', '534.82 ft', '535.03 ft'],
    correctAnswer: 0,
    explanation: 'Tape length correction = +0.02/100 × 534.82 = +0.107 ft. Combined: 534.82 + 0.12 (temp) − 0.08 (sag) + 0.107 (length) = 534.82 + 0.147 = 534.97 ft. All corrections are algebraically added.',
    difficulty: 'hard'
  },
  {
    domain: 'Field Data Acquisition',
    question: 'A distance of 750.00 ft is measured at 40°F with a tape standardized at 68°F (α = 0.00000645/°F). The tape is 99.98 ft long. What is the corrected distance applying temperature and tape length corrections only?',
    options: ['749.72 ft', '750.28 ft', '749.85 ft', '750.00 ft'],
    correctAnswer: 0,
    explanation: 'Temp: Ct = 0.00000645 × (40 − 68) × 750 = 0.00000645 × (−28) × 750 = −0.135 ft. Length: (−0.02/100) × 750 = −0.150 ft. Combined = 750.00 − 0.135 − 0.150 = 749.72 ft. Both corrections are negative (cold + short tape).',
    difficulty: 'hard'
  },
  {
    domain: 'Field Data Acquisition',
    question: 'Normal tension is the applied tension that makes the sag correction equal to the tension correction. For a tape with w = 0.015 lb/ft, A = 0.003 sq in, E = 29,000,000 psi, standardized at Ps = 10 lbf, normal tension is approximately:',
    options: ['About 19-20 lbf', 'About 10 lbf', 'About 30 lbf', 'About 50 lbf'],
    correctAnswer: 0,
    explanation: 'Normal tension Pn ≈ 0.204 × W × √(AE/(Pn−Ps)). Solved iteratively: at ~20 lbf, sag correction ≈ tension correction, so they cancel. Normal tension eliminates the need for separate sag and tension corrections.',
    difficulty: 'hard'
  },
  {
    domain: 'Field Data Acquisition',
    question: 'Which statement about normal tension is correct?',
    options: ['It is the tension at which the elongation due to pull equals the shortening due to sag', 'It is the standard tension printed on the tape', 'It always equals 20 pounds', 'It only applies to Invar tapes'],
    correctAnswer: 0,
    explanation: 'Normal tension is the specific pull at which tension correction (positive, stretching tape) exactly cancels the sag correction (negative, tape drooping). At normal tension, no separate corrections for sag or tension are needed.',
    difficulty: 'medium'
  },
  {
    domain: 'Field Data Acquisition',
    question: 'A slope distance of 425.67 ft is measured along a uniform 8% grade. What is the horizontal distance?',
    options: ['424.31 ft', '425.67 ft', '391.62 ft', '459.72 ft'],
    correctAnswer: 0,
    explanation: 'For an 8% grade: tan(θ) = 0.08, θ = 4.574°. Horizontal distance = slope × cos(θ) = 425.67 × cos(4.574°) = 425.67 × 0.99681 = 424.31 ft. Alternatively, slope correction = −h²/(2S).',
    difficulty: 'hard'
  },
  {
    domain: 'Field Data Acquisition',
    question: 'A surveyor measures a slope distance of 200.00 ft with an elevation difference of 12.0 ft between endpoints. What is the slope correction?',
    options: ['−0.36 ft', '+0.36 ft', '−12.0 ft', '−6.0 ft'],
    correctAnswer: 0,
    explanation: 'Slope correction: Ch = −h²/(2S) = −(12.0²)/(2 × 200.00) = −144/400 = −0.36 ft. Horizontal distance = 200.00 − 0.36 = 199.64 ft. Slope distances are always longer than horizontal.',
    difficulty: 'hard'
  },

  // LEVELING (Chapter 15) - Word Problems
  {
    domain: 'Field Data Acquisition',
    question: 'In differential leveling, if HI = 453.25 ft and the rod reading (FS) is 4.82 ft, what is the elevation of the foresight point?',
    options: ['448.43 ft', '458.07 ft', '453.25 ft', '449.43 ft'],
    correctAnswer: 0,
    explanation: 'Elevation of FS point = HI - FS = 453.25 - 4.82 = 448.43 ft. The height of instrument minus the foresight reading gives point elevation.',
    difficulty: 'medium'
  },
  {
    domain: 'Field Data Acquisition',
    question: 'A level loop closes with an error of 0.03 ft over a total distance of 2 miles. What is the order of accuracy?',
    options: ['Second-order or better (error within allowable limits)', 'Third-order', 'Fourth-order', 'Unacceptable accuracy'],
    correctAnswer: 0,
    explanation: 'Allowable closure for second-order leveling ≈ 0.017√M ft (M in miles). For 2 mi: 0.017 × √2 = 0.024 ft. At 0.03 ft, this is close to second-order.',
    difficulty: 'hard'
  },
  {
    domain: 'Field Data Acquisition',
    question: 'A turning point (TP) in leveling serves to:',
    options: ['Transfer elevation from one instrument setup to another', 'Mark the final benchmark', 'Correct for curvature and refraction', 'Check the level bubble'],
    correctAnswer: 0,
    explanation: 'Turning point: stable point used to transfer elevation between instrument setups. Take FS from one setup, then BS from next setup on same point.',
    difficulty: 'easy'
  },
  {
    domain: 'Field Data Acquisition',
    question: 'The combined effect of Earth curvature and atmospheric refraction causes a level line of sight to:',
    options: ['Depart downward from a horizontal plane, but less than curvature alone', 'Rise above the horizontal', 'Remain perfectly horizontal', 'Curve upward initially then downward'],
    correctAnswer: 0,
    explanation: 'Curvature makes targets appear lower; refraction partially compensates by bending light downward. Net effect: C&R ≈ 0.067M² ft (M in miles).',
    difficulty: 'hard'
  },

  // EDM (Chapter 14) - Word Problems
  {
    domain: 'Field Data Acquisition',
    question: 'An EDM measures distance by timing the return of:',
    options: ['Electromagnetic waves (infrared, laser, or microwave)', 'Sound waves', 'Mechanical pulses through the tape', 'GPS satellite signals'],
    correctAnswer: 0,
    explanation: 'EDM (Electronic Distance Measurement) uses electromagnetic radiation (typically infrared or laser). Distance = (c × t)/2 where c = speed of light.',
    difficulty: 'easy'
  },
  {
    domain: 'Field Data Acquisition',
    question: 'A surveyor\'s EDM has a stated accuracy of ±(3mm + 2ppm). For a 1 km measurement, the expected accuracy is:',
    options: ['±5 mm', '±3 mm', '±2 mm', '±6 mm'],
    correctAnswer: 0,
    explanation: 'Accuracy = 3mm + (2ppm × 1000m) = 3mm + 2mm = ±5mm. The ppm component scales with distance.',
    difficulty: 'hard'
  },

  // === SRM TOPIC 4: GEODESY AND GPS (Chapter 22) ===
  
  {
    domain: 'Surveying Principles',
    question: 'GPS satellites orbit at approximately what altitude?',
    options: ['12,000 miles', '100 miles', '22,000 miles', '600 miles'],
    correctAnswer: 0,
    explanation: 'GPS satellites orbit at ~12,000 miles (20,200 km) altitude, completing one orbit every ~12 hours. This allows visibility from most points on Earth.',
    difficulty: 'medium'
  },
  {
    domain: 'Surveying Principles',
    question: 'How many satellites must be visible for a GPS receiver to determine a 3D position?',
    options: ['At least 4 satellites', 'At least 3 satellites', 'At least 2 satellites', 'Only 1 satellite'],
    correctAnswer: 0,
    explanation: 'Four satellites needed: 3 for X, Y, Z position, plus 1 to solve for receiver clock error. With 4 satellites, you get latitude, longitude, and elevation.',
    difficulty: 'medium'
  },
  {
    domain: 'Surveying Principles',
    question: 'The fundamental GPS distance measurement uses the formula d = v × t. If signal transit time is 0.070 seconds, what is the distance to the satellite?',
    options: ['Approximately 13,020 miles', 'Approximately 1,302 miles', 'Approximately 130 miles', 'Approximately 70 miles'],
    correctAnswer: 0,
    explanation: 'd = v × t = 186,000 mi/sec × 0.070 sec = 13,020 miles. GPS measures tiny time delays to calculate distance from each satellite.',
    difficulty: 'hard'
  },
  {
    domain: 'Surveying Principles',
    question: 'Differential GPS (DGPS) improves accuracy by:',
    options: ['Using a base station at a known location to calculate corrections', 'Using more satellites than autonomous GPS', 'Measuring only during daylight hours', 'Eliminating the need for post-processing'],
    correctAnswer: 0,
    explanation: 'DGPS uses a base station at known coordinates to compute corrections from the same satellites, which are then applied to the rover receiver.',
    difficulty: 'medium'
  },
  {
    domain: 'Surveying Principles',
    question: 'Autonomous (stand-alone) GPS typically achieves accuracy of:',
    options: ['A few meters', 'A few centimeters', 'Sub-millimeter', 'A few kilometers'],
    correctAnswer: 0,
    explanation: 'Autonomous GPS without corrections typically achieves 3-5 meter accuracy. Survey-grade applications require differential techniques for cm-level accuracy.',
    difficulty: 'easy'
  },
  {
    domain: 'Surveying Principles',
    question: 'A dual-frequency GPS receiver offers advantages because:',
    options: ['It can measure and remove ionospheric delay errors', 'It costs less than single-frequency', 'It requires fewer satellites', 'It only works with newer satellites'],
    correctAnswer: 0,
    explanation: 'Dual-frequency receivers (L1 and L2) can compute ionospheric delay corrections, improving accuracy and reducing occupation time.',
    difficulty: 'hard'
  },
  {
    domain: 'Surveying Principles',
    question: 'Real-Time Kinematic (RTK) GPS can achieve what level of accuracy?',
    options: ['Centimeter-level in real time', 'Meter-level only', 'Kilometer-level', 'Sub-millimeter level'],
    correctAnswer: 0,
    explanation: 'RTK GPS uses carrier-phase measurements and real-time corrections from a base station to achieve 1-2 cm horizontal accuracy.',
    difficulty: 'medium'
  },

  // === SRM TOPIC 5: CADASTRAL AND BOUNDARY LAW (Chapters 24-31) ===
  
  {
    domain: 'Boundary Law & PLSS',
    question: 'The Statute of Frauds (1677) established that:',
    options: ['All land transfers must be in writing', 'Oral land agreements are valid', 'The king owns all land', 'Surveys are not required for transfers'],
    correctAnswer: 0,
    explanation: 'The English Statute of Frauds prohibited oral land transfers; all conveyances must be in writing. This principle is fundamental to U.S. property law.',
    difficulty: 'medium'
  },
  {
    domain: 'Boundary Law & PLSS',
    question: 'Under the feudal system in medieval England:',
    options: ['Land belonged to the sovereign and was held by nobles and vassals through allegiance', 'Peasants owned their land outright', 'Land could be freely bought and sold', 'There was no concept of property ownership'],
    correctAnswer: 0,
    explanation: 'Feudal system: the Crown owned all land. Nobles held land in exchange for allegiance and military service; vassals (peasants) worked the land but could not own it.',
    difficulty: 'medium'
  },
  {
    domain: 'Boundary Law & PLSS',
    question: 'The term "fee ownership" refers to:',
    options: ['Ownership of land without obligation to a lord, with right to dispose of it freely', 'Rental of land from the government', 'Temporary use of public lands', 'Joint ownership with the sovereign'],
    correctAnswer: 0,
    explanation: 'Fee ownership (fee simple): the most complete form of ownership, free from feudal obligations, with the right to sell, transfer, or bequeath the land.',
    difficulty: 'medium'
  },
  {
    domain: 'Boundary Law & PLSS',
    question: 'A "cloud on title" is:',
    options: ['A claim that, if valid, would impair the title to land', 'A weather-related survey delay', 'Missing property boundaries', 'An unsigned deed'],
    correctAnswer: 0,
    explanation: 'Cloud on title: any encumbrance (lien, judgment, mortgage, adverse claim) that, if valid, would affect ownership rights. Must be cleared before sale.',
    difficulty: 'medium'
  },
  {
    domain: 'Boundary Law & PLSS',
    question: 'The "chain of title" refers to:',
    options: ['The sequence of ownership transfers from original grant to present owner', 'A Gunter\'s chain used in surveys', 'The physical boundary monuments', 'The deed recording process'],
    correctAnswer: 0,
    explanation: 'Chain of title: the consecutive sequence of transfers (deeds) from the original patent/grant to the current owner. Any break in the chain creates title problems.',
    difficulty: 'easy'
  },
  {
    domain: 'Boundary Law & PLSS',
    question: 'The doctrine of "stare decisis" means that:',
    options: ['Courts will follow precedent from similar previous cases', 'All property must be surveyed', 'The government owns all land', 'Oral agreements are binding'],
    correctAnswer: 0,
    explanation: 'Stare decisis (Latin: "to stand by decided matters"): courts follow precedent when facts are substantially similar. Foundation of common law system.',
    difficulty: 'hard'
  },
  {
    domain: 'Boundary Law & PLSS',
    question: 'Real property is distinguished from personal property because it:',
    options: ['Is immovable and includes land, buildings, and fixtures', 'Can be easily transported', 'Has no monetary value', 'Cannot be owned by individuals'],
    correctAnswer: 0,
    explanation: 'Real property: immovable (land, structures, trees, fixtures). Personal property: movable goods. Real property law is primarily state law.',
    difficulty: 'easy'
  },
  {
    domain: 'Boundary Law & PLSS',
    question: 'Title insurance protects the buyer by:',
    options: ['Guaranteeing good title up to the purchase price amount', 'Eliminating the need for a survey', 'Replacing the deed', 'Transferring ownership automatically'],
    correctAnswer: 0,
    explanation: 'Title insurance: company researches title and insures against defects. Coverage typically limited to purchase price. Has replaced abstract and opinion in many areas.',
    difficulty: 'medium'
  },

  // === MORE WORD PROBLEMS: PRACTICAL APPLICATIONS ===
  
  {
    domain: 'Survey Computations & Applications',
    question: 'A surveyor needs to stake a 3° highway curve. Using the arc definition, what is the radius?',
    options: ['1,909.9 ft', '300 ft', '573.0 ft', '5,729.6 ft'],
    correctAnswer: 0,
    explanation: 'R = 5729.58/D = 5729.58/3 = 1,909.9 ft. A 3° curve is relatively gentle with a large radius.',
    difficulty: 'medium'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'A property owner wants to know the area of a triangular parcel. Two sides measure 400 ft and 350 ft, and the included angle is 72°. What is the area?',
    options: ['66,574 sq ft (about 1.53 acres)', '70,000 sq ft', '140,000 sq ft', '35,000 sq ft'],
    correctAnswer: 0,
    explanation: 'Area = ½ × a × b × sin(C) = ½ × 400 × 350 × sin(72°) = ½ × 140,000 × 0.951 = 66,574 sq ft ÷ 43,560 = 1.53 acres.',
    difficulty: 'hard'
  },
  {
    domain: 'Field Data Acquisition',
    question: 'A surveyor sets up a level and reads a backsight of 6.42 ft on a benchmark with elevation 523.18 ft. What is the height of instrument (HI)?',
    options: ['529.60 ft', '516.76 ft', '523.18 ft', '536.02 ft'],
    correctAnswer: 0,
    explanation: 'HI = BM elevation + BS = 523.18 + 6.42 = 529.60 ft. The height of instrument is the elevation of the line of sight.',
    difficulty: 'easy'
  },
  {
    domain: 'Math & Basic Science',
    question: 'A subdivision lot is described as 120 ft × 165 ft. How many acres is this?',
    options: ['0.45 acres', '0.55 acres', '0.35 acres', '0.65 acres'],
    correctAnswer: 0,
    explanation: 'Area = 120 × 165 = 19,800 sq ft. Acres = 19,800 ÷ 43,560 = 0.45 acres.',
    difficulty: 'easy'
  },
  {
    domain: 'Surveying Principles',
    question: 'A GPS survey is planned in a canyon with steep walls. What is the primary concern?',
    options: ['Reduced satellite visibility due to obstructions', 'Temperature effects on the receiver', 'Wind interference with signals', 'Battery life of equipment'],
    correctAnswer: 0,
    explanation: 'Canyons, buildings, and tree canopy block satellite signals, reducing the number of visible satellites. May require longer occupation or post-processing.',
    difficulty: 'medium'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'A traverse line has latitude of +425.5 ft and departure of +378.1 ft. What is the length of this line?',
    options: ['569.3 ft', '803.6 ft', '425.5 ft', '378.1 ft'],
    correctAnswer: 0,
    explanation: 'Length = √(lat² + dep²) = √(425.5² + 378.1²) = √(181,050 + 142,960) = √324,010 = 569.3 ft.',
    difficulty: 'medium'
  },
  {
    domain: 'Professional Practice',
    question: 'A client asks a surveyor to move an iron pin 2 feet to include more land in their property. The surveyor should:',
    options: ['Refuse, as this would be fraudulent and unethical', 'Move it if the client pays extra', 'Move it only if no one is watching', 'Move it and not tell anyone'],
    correctAnswer: 0,
    explanation: 'Moving monuments to falsify boundaries is fraud. Professional ethics require surveyors to preserve monuments and accurately represent boundaries.',
    difficulty: 'easy'
  },

  // === SRM TOPIC 6: LAND PLANNING AND DEVELOPMENT (Chapters 32-33) ===
  
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'The act of subdivision is defined as:',
    options: ['Division of a tract into two or more parts for sale or building development', 'Combining multiple parcels into one', 'Rezoning agricultural land', 'Creating a topographic map'],
    correctAnswer: 0,
    explanation: 'Subdivision: dividing any tract or parcel of land into two or more parts for the purpose of sale or building development.',
    difficulty: 'easy'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'The first step in the subdivision surveying process is:',
    options: ['A boundary survey of the exterior lines', 'Staking interior lots', 'Recording the final plat', 'Installing drainage pipes'],
    correctAnswer: 0,
    explanation: 'Boundary survey first: establish and monument exterior boundaries before detailed planning. Interior monuments come after platting.',
    difficulty: 'medium'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'A preliminary plat for a subdivision includes all EXCEPT:',
    options: ['Final recorded deed references', 'Street locations and dimensions', 'Lot and block numbers', 'Contour lines and drainage structures'],
    correctAnswer: 0,
    explanation: 'Preliminary plat shows proposed layout (streets, lots, drainage, contours). Final recorded deed references come with the final plat after approval.',
    difficulty: 'medium'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'Platting laws regulate:',
    options: ['Recording of the subdivision plat, monumenting parcels, and survey accuracy', 'Only the size of lots', 'Only street names', 'Federal land transfers'],
    correctAnswer: 0,
    explanation: 'Platting laws: regulations for recording the plat, monumenting the parcels, establishing survey accuracy, and identifying parcels and dimensions.',
    difficulty: 'medium'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'In residential planning, lots should drain:',
    options: ['Away from the house to the street or rear drainage collector', 'Toward the house foundation', 'Onto neighboring properties', 'Into the sanitary sewer'],
    correctAnswer: 0,
    explanation: 'Lots should slope away from the house in all directions, draining to the street in front and to a drainage collector at rear if available.',
    difficulty: 'easy'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'The minimum street grade to avoid water pooling is:',
    options: ['0.3% to 0.5%', '5% to 10%', '0% (flat is acceptable)', '15% minimum'],
    correctAnswer: 0,
    explanation: 'Streets should have minimum 0.3% grade, preferably 0.5%, to ensure water flows along gutters and does not collect in pools.',
    difficulty: 'medium'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'A cul-de-sac in subdivision design is:',
    options: ['A dead-end street with a turnaround at the end', 'A main arterial street', 'A drainage channel', 'A type of easement'],
    correctAnswer: 0,
    explanation: 'Cul-de-sac: dead-end street with turnaround. Popular for single-family residences due to privacy and reduced traffic noise. Max length ~1000 ft.',
    difficulty: 'easy'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'Restrictive covenants in a subdivision deed may include:',
    options: ['Minimum setback distances and building restrictions', 'Maximum property taxes', 'Required surveyor certification', 'Public road maintenance schedules'],
    correctAnswer: 0,
    explanation: 'Covenants: restrictions on construction type, setback distances, advertising, mobile homes, commercial enterprises to protect neighborhood character.',
    difficulty: 'medium'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'Sanitary sewer velocity should be between:',
    options: ['2 ft/sec and 10 ft/sec', '0.5 ft/sec and 1 ft/sec', '20 ft/sec and 50 ft/sec', 'Any velocity is acceptable'],
    correctAnswer: 0,
    explanation: 'Sanitary sewer velocity: 2-10 ft/sec. Too slow causes settling; too fast causes erosion. Manholes at grade changes and junctions.',
    difficulty: 'hard'
  },

  // === SRM TOPIC 7: MAPPING (Chapter 34) ===
  
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'Cartography is defined as:',
    options: ['The profession of making maps', 'The study of earthquakes', 'Land surveying for boundaries', 'GPS satellite positioning'],
    correctAnswer: 0,
    explanation: 'Cartography: the profession of making maps. Topographic maps show plan view of earth surface with natural and constructed features.',
    difficulty: 'easy'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'A strip map is typically used for:',
    options: ['Highways, railroads, pipelines, and powerlines', 'Subdivisions and shopping centers', 'City-wide planning', 'Geological surveys'],
    correctAnswer: 0,
    explanation: 'Strip map: narrow width, long length projects (highways, railroads, pipelines, canals). Area maps for subdivisions, shopping centers, airports.',
    difficulty: 'medium'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'Horizontal control in topographic surveying consists of:',
    options: ['A series of points accurately fixed by distance and direction', 'Elevation benchmarks only', 'Aerial photographs', 'GPS satellites'],
    correctAnswer: 0,
    explanation: 'Horizontal control: series of points fixed in position by distance and direction. Traverses furnish satisfactory control for most topographic surveying.',
    difficulty: 'medium'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'The right-angle offset method of ties is most commonly used in:',
    options: ['Route surveying for strip maps', 'Boundary surveys', 'GPS positioning', 'Hydrographic surveys'],
    correctAnswer: 0,
    explanation: 'Right-angle offset: most common for route surveying strip maps. Tape stretched between stations, objects tied perpendicular to centerline.',
    difficulty: 'medium'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'The stadia method in surveying is used to:',
    options: ['Measure horizontal distances using telescope optics', 'Record property boundaries', 'Calculate land values', 'Determine magnetic declination'],
    correctAnswer: 0,
    explanation: 'Stadia: system for measuring horizontal distances based on transit telescope optics. Also called tacheometry. Eliminates need for horizontal taping.',
    difficulty: 'medium'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'Contour lines on a topographic map represent:',
    options: ['Lines of equal elevation', 'Property boundaries', 'Magnetic north lines', 'Underground utilities'],
    correctAnswer: 0,
    explanation: 'Contour lines connect points of equal elevation. Closely spaced = steep slope; widely spaced = gentle slope.',
    difficulty: 'easy'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'Index contours on a map are typically:',
    options: ['Every fifth contour line, drawn heavier with elevation labeled', 'Property corner markers', 'Drainage patterns', 'Road centerlines'],
    correctAnswer: 0,
    explanation: 'Index contours: every fifth contour line drawn heavier/bolder with elevation labeled for easy reading of the map.',
    difficulty: 'easy'
  },

  // === SRM TOPIC 8: SPECIALTY SURVEYING (Chapters 38-40) ===
  
  {
    domain: 'Surveying Principles',
    question: 'Construction surveying involves:',
    options: ['Locating and marking locations of structures to be built (line and grade)', 'Only measuring existing buildings', 'Aerial photography', 'GPS satellite tracking'],
    correctAnswer: 0,
    explanation: 'Construction surveying: locating/marking planned structures. "Line and grade" = horizontal alignment (transit) and elevation (level).',
    difficulty: 'easy'
  },
  {
    domain: 'Surveying Principles',
    question: 'Hub stakes in construction staking are:',
    options: ['2x2 inch stakes driven flush with ground, usually with a tack marking precise position', 'Tall marker stakes', 'Wooden posts for fencing', 'Temporary benchmarks'],
    correctAnswer: 0,
    explanation: 'Hub stakes: 2x2 inch, driven flush, tack in top marks precise position. Reference stakes with no markings; identified by witness stakes.',
    difficulty: 'medium'
  },
  {
    domain: 'Surveying Principles',
    question: 'Witness stakes (guard stakes) serve to:',
    options: ['Locate and identify nearby hub stakes', 'Mark property corners permanently', 'Indicate underground utilities', 'Show elevation benchmarks'],
    correctAnswer: 0,
    explanation: 'Witness stakes: locate and identify hub stakes. Front/back provide location info; narrow edge shows elevations when needed.',
    difficulty: 'medium'
  },
  {
    domain: 'Surveying Principles',
    question: 'Slope stakes indicate:',
    options: ['The intersection of natural ground and proposed cut or fill (catch point)', 'Property line corners', 'Utility easements', 'Traffic control locations'],
    correctAnswer: 0,
    explanation: 'Slope stakes: mark catch point where natural ground meets proposed cut/fill slope. Marked "C" for cut or "F" for fill.',
    difficulty: 'medium'
  },
  {
    domain: 'Surveying Principles',
    question: 'When setting stakes for pavement curves, the offset line:',
    options: ['Has the same central angle as the design curve but different arc length', 'Has a different central angle', 'Must be exactly on the centerline', 'Is always 100 ft from centerline'],
    correctAnswer: 0,
    explanation: 'Parallel offset curves have same central angle but different radii/lengths. PC and PT stations same as design curve; deflection angles same.',
    difficulty: 'hard'
  },
  {
    domain: 'Surveying Principles',
    question: 'In construction staking, converting feet and inches to decimal feet, 5 ft 7-3/4 in equals:',
    options: ['5.65 ft', '5.75 ft', '5.58 ft', '5.07 ft'],
    correctAnswer: 0,
    explanation: '7.75 inches ÷ 12 = 0.646 ft. Total = 5 + 0.646 = 5.65 ft. Common conversion for construction stakes.',
    difficulty: 'medium'
  },

  // === SRM TOPIC 9: ACCURACY STANDARDS (Chapter 41) ===
  
  {
    domain: 'Professional Practice',
    question: 'The distinction between accuracy and precision is:',
    options: ['Precision measures consistency; accuracy measures nearness to true value', 'They mean the same thing', 'Precision is for angles only', 'Accuracy applies only to distances'],
    correctAnswer: 0,
    explanation: 'Precision: consistency between observations. Accuracy: nearness to true value. Many standards are really precision standards.',
    difficulty: 'medium'
  },
  {
    domain: 'Professional Practice',
    question: 'The U.S. National Map Accuracy Standards require that for maps at 1:20,000 or larger scale:',
    options: ['Not more than 10% of tested points can be in error by more than 1/30 inch', 'All points must be exactly correct', 'Only elevation accuracy matters', 'No testing is required'],
    correctAnswer: 0,
    explanation: 'National Map Accuracy: for scales larger than 1:20,000, max 10% of points in error by >1/30 inch measured on map.',
    difficulty: 'hard'
  },
  {
    domain: 'Professional Practice',
    question: 'FEMA LiDAR accuracy standards require elevation data to have maximum RMSE of:',
    options: ['15 cm (about 0.5 ft)', '1 meter', '1 inch', '10 feet'],
    correctAnswer: 0,
    explanation: 'FEMA LiDAR: max RMSE of 15 cm for elevation data. RMSE = root-mean-squared error compared to higher-accuracy check points.',
    difficulty: 'hard'
  },
  {
    domain: 'Professional Practice',
    question: 'In accuracy standards, the "2 sigma error" represents:',
    options: ['1.96 times the RMSE, containing 95% of errors', 'The maximum allowable error', 'The average error', 'One standard deviation'],
    correctAnswer: 0,
    explanation: '2 sigma = 1.96 × RMSE. Based on normal distribution, 95% of errors fall within this range.',
    difficulty: 'hard'
  },

  // === SRM TOPIC 10: BUSINESS MANAGEMENT (Chapters 42-44) ===
  
  {
    domain: 'Professional Practice',
    question: 'In job costing, direct labor costs are:',
    options: ['Wages paid to employees for work on specific projects', 'Office rent and utilities', 'Marketing expenses', 'Equipment depreciation'],
    correctAnswer: 0,
    explanation: 'Direct labor: salary/wages for work on specific projects. Indirect costs (overhead) spread across multiple projects.',
    difficulty: 'easy'
  },
  {
    domain: 'Professional Practice',
    question: 'Overhead rate is calculated by:',
    options: ['Total indirect costs divided by total direct labor costs', 'Revenue divided by expenses', 'Profit divided by costs', 'Direct costs times markup'],
    correctAnswer: 0,
    explanation: 'Overhead rate = total indirect costs / total direct labor costs. Typical surveying firms: 150-200% overhead rate.',
    difficulty: 'medium'
  },
  {
    domain: 'Professional Practice',
    question: 'If a surveying firm has 170% overhead rate and direct labor for a project is $5,000, the overhead charge is:',
    options: ['$8,500', '$5,000', '$3,500', '$1,700'],
    correctAnswer: 0,
    explanation: 'Overhead = direct labor × overhead rate = $5,000 × 1.70 = $8,500.',
    difficulty: 'medium'
  },
  {
    domain: 'Professional Practice',
    question: 'Under Federal Acquisition Regulations, a fair operating margin for surveying services is typically:',
    options: ['6-15% of total fee', '50% of costs', '1% maximum', 'No profit allowed'],
    correctAnswer: 0,
    explanation: 'FAR assumes fair operating margin of 6-15% of total fee. Represents return on investment and recovery of unallowable indirect costs.',
    difficulty: 'medium'
  },
  {
    domain: 'Professional Practice',
    question: 'The Brooks Act requires federal agencies to:',
    options: ['Negotiate surveying contracts based on estimated value of services', 'Accept lowest bidder only', 'Use only government surveyors', 'Avoid using professional services'],
    correctAnswer: 0,
    explanation: 'Brooks Act (40 USC): federal agencies must negotiate professional services contracts (including surveying) based on qualifications and estimated value.',
    difficulty: 'medium'
  },
  {
    domain: 'Professional Practice',
    question: 'Which costs are typically excluded from overhead rate calculations under Federal Acquisition Regulations?',
    options: ['Entertainment, country club dues, and bank loan interest', 'Employee wages', 'Office rent', 'Survey equipment'],
    correctAnswer: 0,
    explanation: 'FAR excludes: entertainment costs, country club dues, certain interest expenses from allowable overhead costs.',
    difficulty: 'hard'
  },

  // === SRM TOPIC 11: CONVERSIONS AND CONSTANTS ===
  
  {
    domain: 'Math & Basic Science',
    question: 'The coefficient of thermal expansion for steel tape is approximately:',
    options: ['0.00000645 per degree F', '0.0000001 per degree F', '0.001 per degree F', '0.1 per degree F'],
    correctAnswer: 0,
    explanation: 'Steel tape expansion: 0.00000645 per °F. Invar tape: 0.0000001 per °F (about 3% of steel). Critical for precise measurements.',
    difficulty: 'hard'
  },
  {
    domain: 'Math & Basic Science',
    question: 'One minute of latitude equals approximately:',
    options: ['1.15 statute miles', '1 foot', '100 meters', '10 chains'],
    correctAnswer: 0,
    explanation: '1 minute of latitude ≈ 1.15 statute miles ≈ 1 nautical mile. Useful for rough distance estimates on maps.',
    difficulty: 'medium'
  },
  {
    domain: 'Math & Basic Science',
    question: 'A vara (Texas) equals:',
    options: ['33-1/3 inches', '36 inches', '12 inches', '66 feet'],
    correctAnswer: 0,
    explanation: 'Texas vara = 33-1/3 inches (33.33 in). California vara = 33 inches. Important for interpreting old Spanish land grants.',
    difficulty: 'medium'
  },
  {
    domain: 'Math & Basic Science',
    question: 'One link (surveyor\'s) equals:',
    options: ['7.92 inches', '12 inches', '1 foot', '100 feet'],
    correctAnswer: 0,
    explanation: 'Surveyor\'s link = 7.92 inches. 100 links = 1 chain = 66 ft. Gunter\'s chain used in PLSS surveys.',
    difficulty: 'medium'
  },
  {
    domain: 'Math & Basic Science',
    question: 'One rod (or pole or perch) equals:',
    options: ['16.5 feet', '100 feet', '66 feet', '10 feet'],
    correctAnswer: 0,
    explanation: 'Rod = pole = perch = 16.5 ft = 1/4 chain. 4 rods = 1 chain = 66 ft. Common in old deed descriptions.',
    difficulty: 'easy'
  },
  {
    domain: 'Math & Basic Science',
    question: 'One hectare equals approximately:',
    options: ['2.47 acres', '1 acre', '10 acres', '100 acres'],
    correctAnswer: 0,
    explanation: 'Hectare = 10,000 m² = 2.471 acres. Common metric unit for land area. 1 acre = 0.4047 hectares.',
    difficulty: 'easy'
  },

  // EXPANDED POOL: Now 240+ questions total
  // Coverage: All 8 NCEES domains with SRM Topics 2-11 content
  // Includes word problems, practical applications, and professional practice

  // ====================================
  // PS EXAM QUESTIONS (Professional Surveyor)
  // 5 NCEES Knowledge Areas
  // ====================================
  
  // Legal Principles (PS Domain 1)
  {
    domain: 'Legal Principles',
    question: 'In a boundary dispute, which of the following takes highest priority under the rules of construction?',
    options: ['Senior rights and intentions', 'Natural monuments', 'Artificial monuments', 'Courses and distances'],
    correctAnswer: 0,
    explanation: 'The priority of calls is: (1) Senior rights and intentions, (2) Natural monuments, (3) Artificial monuments, (4) Courses, (5) Distances, (6) Area/Quantity.',
    difficulty: 'medium'
  },
  {
    domain: 'Legal Principles',
    question: 'Which type of easement benefits a specific parcel of land and runs with the land?',
    options: ['Easement appurtenant', 'Easement in gross', 'License', 'Lease'],
    correctAnswer: 0,
    explanation: 'An easement appurtenant benefits a dominant estate and burdens a servient estate. It runs with the land when transferred.',
    difficulty: 'easy'
  },
  {
    domain: 'Legal Principles',
    question: 'To establish adverse possession, the possession must be:',
    options: ['Hostile, actual, exclusive, open, continuous for statutory period', 'Consensual, sporadic, shared, hidden', 'Permitted by owner, exclusive, open', 'Licensed by the state, continuous'],
    correctAnswer: 0,
    explanation: 'Adverse possession requires: Hostile (without permission), Actual, Exclusive, Open and notorious, and Continuous for the statutory period.',
    difficulty: 'medium'
  },
  {
    domain: 'Legal Principles',
    question: 'The doctrine of "acquiescence" applies when:',
    options: ['Neighboring owners accept a line as the boundary over time', 'A surveyor makes a mistake', 'An original monument is lost', 'A deed description is ambiguous'],
    correctAnswer: 0,
    explanation: 'Acquiescence occurs when adjoining landowners mutually recognize and accept a line as the boundary, typically for a long period, establishing it as the legal boundary.',
    difficulty: 'medium'
  },
  {
    domain: 'Legal Principles',
    question: 'What is the "thread of the stream" in water boundary law?',
    options: ['The centerline of a non-navigable stream', 'The high water mark', 'The low water mark', 'The deepest point of the stream'],
    correctAnswer: 0,
    explanation: 'For non-navigable streams, riparian owners typically own to the thread (center) of the stream. For navigable waters, boundaries are often at the ordinary high water mark.',
    difficulty: 'medium'
  },
  {
    domain: 'Legal Principles',
    question: 'Accretion refers to:',
    options: ['Gradual, imperceptible addition of land by natural water action', 'Sudden removal of land by flood or stream', 'Man-made addition of fill', 'Loss of land due to erosion'],
    correctAnswer: 0,
    explanation: 'Accretion is the gradual, imperceptible addition of soil to land by natural water action. The landowner gains title to accreted land.',
    difficulty: 'easy'
  },
  {
    domain: 'Legal Principles',
    question: 'A quitclaim deed:',
    options: ['Transfers only the interest the grantor has, if any, without warranties', 'Warrants that the title is free of encumbrances', 'Creates a new title from the government', 'Requires a title insurance policy'],
    correctAnswer: 0,
    explanation: 'A quitclaim deed transfers only whatever interest the grantor may have, without any warranties of title. It is often used between family members or to clear title.',
    difficulty: 'easy'
  },
  {
    domain: 'Legal Principles',
    question: 'Under the statute of frauds, a conveyance of real property must be:',
    options: ['In writing and signed', 'Verbal with two witnesses', 'Recorded within 30 days', 'Approved by a surveyor'],
    correctAnswer: 0,
    explanation: 'The statute of frauds requires conveyances of real property to be in writing and signed by the party to be charged.',
    difficulty: 'easy'
  },
  {
    domain: 'Legal Principles',
    question: 'What distinguishes avulsion from accretion?',
    options: ['Avulsion is sudden; accretion is gradual', 'Avulsion creates new title; accretion does not', 'Avulsion applies only to navigable waters', 'Avulsion requires government approval'],
    correctAnswer: 0,
    explanation: 'Avulsion is sudden change (flood, earthquake), while accretion is gradual. With avulsion, the boundary typically stays in original position; with accretion, it follows the water.',
    difficulty: 'medium'
  },
  {
    domain: 'Legal Principles',
    question: 'In a "race-notice" recording state:',
    options: ['A subsequent purchaser who records first wins if they had no notice', 'The first to record always wins regardless of notice', 'Recording is not required to protect interests', 'Only the original deed matters'],
    correctAnswer: 0,
    explanation: 'In race-notice states, a subsequent bona fide purchaser who records first and has no notice of prior unrecorded claims will prevail.',
    difficulty: 'hard'
  },

  // Professional Survey Practices (PS Domain 2)
  {
    domain: 'Professional Survey Practices',
    question: 'The surveyor\'s primary duty is to:',
    options: ['Protect public health, safety, and welfare', 'Maximize client profits', 'Minimize survey costs', 'Complete surveys quickly'],
    correctAnswer: 0,
    explanation: 'Professional ethics require that the surveyor\'s primary obligation is to protect public health, safety, and welfare, even above client interests.',
    difficulty: 'easy'
  },
  {
    domain: 'Professional Survey Practices',
    question: 'An obliterated corner is one that:',
    options: ['Has no remaining physical evidence but can be restored from records', 'Has been moved by a surveyor', 'Is marked with a temporary stake', 'Cannot be restored by any means'],
    correctAnswer: 0,
    explanation: 'An obliterated corner has no physical evidence at the site but its position can be recovered from recorded measurements or testimony.',
    difficulty: 'medium'
  },
  {
    domain: 'Professional Survey Practices',
    question: 'A retracement survey:',
    options: ['Follows the footsteps of the original surveyor', 'Creates new boundaries where none existed', 'Subdivides existing parcels', 'Is performed only for the government'],
    correctAnswer: 0,
    explanation: 'A retracement survey attempts to follow the footsteps of the original surveyor, re-establishing the boundaries as originally intended.',
    difficulty: 'easy'
  },
  {
    domain: 'Professional Survey Practices',
    question: 'Field notes should include:',
    options: ['All observations, measurements, and sketches made in the field', 'Only final adjusted coordinates', 'Client billing information', 'Only the property corners found'],
    correctAnswer: 0,
    explanation: 'Comprehensive field notes document all observations, measurements, sketches, conditions, and decisions made during the survey.',
    difficulty: 'easy'
  },
  {
    domain: 'Professional Survey Practices',
    question: 'A lost corner (PLSS) is one that:',
    options: ['Cannot be identified or restored from any evidence', 'Has been removed but can be restored from records', 'Is marked with a temporary monument', 'Was never originally set'],
    correctAnswer: 0,
    explanation: 'A lost corner has no physical evidence and cannot be restored from the record of any survey. It must be established using proportionate measurement.',
    difficulty: 'medium'
  },
  {
    domain: 'Professional Survey Practices',
    question: 'When a surveyor discovers an error in a previous survey:',
    options: ['They must promptly notify affected parties and correct the record', 'They may ignore it if it favors their client', 'They should wait until asked', 'They have no obligation to disclose'],
    correctAnswer: 0,
    explanation: 'Professional ethics require prompt correction of discovered errors and notification of all affected parties.',
    difficulty: 'medium'
  },
  {
    domain: 'Professional Survey Practices',
    question: 'Standard of care for a surveyor means:',
    options: ['The level of skill and diligence expected of a reasonably competent surveyor', 'Perfect accuracy in all measurements', 'The cheapest possible method', 'Maximum speed of completion'],
    correctAnswer: 0,
    explanation: 'Standard of care is the degree of care, skill, and diligence that a reasonably competent surveyor would exercise under similar circumstances.',
    difficulty: 'medium'
  },
  {
    domain: 'Professional Survey Practices',
    question: 'A surveyor\'s certification statement:',
    options: ['Attests to the accuracy of the survey and compliance with standards', 'Guarantees the title is clear', 'Transfers ownership of the property', 'Is required only for federal lands'],
    correctAnswer: 0,
    explanation: 'The certification statement attests that the survey was performed in accordance with applicable standards and that the information shown is accurate.',
    difficulty: 'easy'
  },

  // Standards and Specifications (PS Domain 3)
  {
    domain: 'Standards and Specifications',
    question: 'According to ALTA/NSPS 2026 Standards, the Relative Positional Precision for a survey must be:',
    options: ['0.07 feet plus 50 ppm or better', '1 foot or better', 'Whatever the client requests', 'Not specified'],
    correctAnswer: 0,
    explanation: 'ALTA/NSPS 2026 requires Relative Positional Precision of 0.07 feet (2 cm) + 50 ppm at 95% confidence level.',
    difficulty: 'hard'
  },
  {
    domain: 'Standards and Specifications',
    question: 'ALTA/NSPS Table A Item 11 requires:',
    options: ['Evidence of underground utilities existing on or serving the surveyed property', 'A flood zone determination', 'Soil samples', 'An environmental assessment'],
    correctAnswer: 0,
    explanation: 'Table A Item 11 addresses evidence of underground utilities existing on or serving the surveyed property, determined by plans/reports provided by the client and/or markings from a private utility locate request, combined with observed evidence pursuant to Section 5.E.iv.',
    difficulty: 'medium'
  },
  {
    domain: 'Standards and Specifications',
    question: 'For an ALTA/NSPS survey, a flood zone determination requires:',
    options: ['Table A Item 3 to be selected by the client', 'No additional requirements', 'Only an elevation certificate', 'A FEMA map only'],
    correctAnswer: 0,
    explanation: 'Table A Item 3 specifies that flood zone classification (with proper annotation based on federal Flood Insurance Rate Maps or state/local equivalent) be depicted by scaled map location and graphic plotting only, if requested by the client.',
    difficulty: 'medium'
  },
  {
    domain: 'Standards and Specifications',
    question: 'The purpose of positional tolerance in surveying standards is to:',
    options: ['Define the maximum allowable uncertainty in point positions', 'Specify the minimum number of measurements', 'Determine the cost of the survey', 'Establish the timeline for completion'],
    correctAnswer: 0,
    explanation: 'Positional tolerance defines the maximum allowable uncertainty or error in the positions of surveyed points.',
    difficulty: 'medium'
  },
  {
    domain: 'Standards and Specifications',
    question: 'ALTA/NSPS surveys require that the description used must be:',
    options: ['Sufficient to locate and identify the property without ambiguity', 'Approved by the client only', 'In metes and bounds format only', 'Less than 100 words'],
    correctAnswer: 0,
    explanation: 'The legal description must be sufficient to locate and identify the property being surveyed without ambiguity.',
    difficulty: 'easy'
  },
  {
    domain: 'Standards and Specifications',
    question: 'Record of Survey is required when:',
    options: ['State law mandates recording for certain types of surveys', 'The client requests it', 'The property is over 10 acres', 'Only for subdivision surveys'],
    correctAnswer: 0,
    explanation: 'Record of Survey requirements vary by state but typically apply when monuments are set or reset, or when discrepancies are found.',
    difficulty: 'medium'
  },
  {
    domain: 'Standards and Specifications',
    question: 'The ALTA/NSPS certification requires the surveyor to state:',
    options: ['Compliance with the 2026 minimum standards and any Table A items selected', 'That no encroachments exist', 'That the title is clear', 'Future construction plans'],
    correctAnswer: 0,
    explanation: 'The certification states the survey was made in accordance with the 2026 Minimum Standard Detail Requirements for ALTA/NSPS Land Title Surveys and includes the specified Table A items thereof.',
    difficulty: 'medium'
  },

  // Business Practices (PS Domain 4)
  {
    domain: 'Business Practices',
    question: 'A lump sum contract:',
    options: ['Specifies a fixed price for defined scope of work', 'Pays by the hour regardless of progress', 'Has no defined scope', 'Is always the lowest cost option'],
    correctAnswer: 0,
    explanation: 'A lump sum contract provides a fixed fee for a clearly defined scope of work, placing risk on the surveyor for cost overruns.',
    difficulty: 'easy'
  },
  {
    domain: 'Business Practices',
    question: 'Professional liability insurance (E&O) protects surveyors against:',
    options: ['Claims of negligence, errors, or omissions in professional services', 'Property damage at job sites', 'Employee injuries', 'Vehicle accidents'],
    correctAnswer: 0,
    explanation: 'Errors and Omissions (E&O) insurance covers claims arising from professional negligence, errors, or omissions in survey services.',
    difficulty: 'easy'
  },
  {
    domain: 'Business Practices',
    question: 'A clear scope of services document should include:',
    options: ['Deliverables, standards, timeline, and fee structure', 'Only the total fee', 'General terms without details', 'Nothing about limitations'],
    correctAnswer: 0,
    explanation: 'A well-defined scope includes deliverables, applicable standards, timeline, fees, payment terms, and limitations on the services.',
    difficulty: 'medium'
  },
  {
    domain: 'Business Practices',
    question: 'When estimating project fees, a surveyor should consider:',
    options: ['All factors: labor, equipment, overhead, risk, and profit', 'Only the hourly wage', 'Competitor pricing only', 'Client budget only'],
    correctAnswer: 0,
    explanation: 'Proper fee estimation accounts for direct labor, equipment, supplies, overhead, risk factors, and reasonable profit.',
    difficulty: 'medium'
  },
  {
    domain: 'Business Practices',
    question: 'Risk management in surveying includes:',
    options: ['Clear contracts, proper insurance, quality control, and documentation', 'Only purchasing insurance', 'Avoiding difficult projects', 'Rushing to complete work'],
    correctAnswer: 0,
    explanation: 'Effective risk management combines clear contracts, adequate insurance, quality control procedures, and thorough documentation.',
    difficulty: 'medium'
  },
  {
    domain: 'Business Practices',
    question: 'A surveyor\'s proposal should NOT:',
    options: ['Promise specific legal outcomes', 'Describe the scope of work', 'Include fee estimates', 'Reference applicable standards'],
    correctAnswer: 0,
    explanation: 'Surveyors should never promise specific legal outcomes (like resolution of boundary disputes) as this goes beyond their professional scope.',
    difficulty: 'medium'
  },

  // Areas of Practice (PS Domain 5)
  {
    domain: 'Areas of Practice',
    question: 'In PLSS, single proportionate measurement is used for:',
    options: ['Lost quarter-section corners on a section line', 'Lost interior township corners', 'Standard corners only', 'Meander corners'],
    correctAnswer: 0,
    explanation: 'Single proportionate measurement restores a lost quarter-section corner by distributing the excess or deficiency along the line between two found corners.',
    difficulty: 'hard'
  },
  {
    domain: 'Areas of Practice',
    question: 'Double proportionate measurement is used for:',
    options: ['Lost interior township or section corners', 'Quarter corners only', 'Meander corners', 'Witness corners'],
    correctAnswer: 0,
    explanation: 'Double proportionate measurement restores lost interior corners by proportioning in both north-south and east-west directions.',
    difficulty: 'hard'
  },
  {
    domain: 'Areas of Practice',
    question: 'An ALTA/NSPS Land Title Survey is:',
    options: ['A standardized survey meeting specific title insurance requirements', 'A simple boundary survey', 'A topographic survey only', 'A government survey'],
    correctAnswer: 0,
    explanation: 'ALTA/NSPS surveys meet detailed standards developed jointly by ALTA and NSPS for use in commercial real estate transactions and title insurance.',
    difficulty: 'easy'
  },
  {
    domain: 'Areas of Practice',
    question: 'A condominium survey must show:',
    options: ['Unit boundaries, common elements, and limited common elements', 'Only the exterior of the building', 'Only the land boundaries', 'Only the parking spaces'],
    correctAnswer: 0,
    explanation: 'Condominium surveys must delineate unit boundaries, common elements (shared by all owners), and limited common elements (assigned to specific units).',
    difficulty: 'medium'
  },
  {
    domain: 'Areas of Practice',
    question: 'Construction staking typically includes:',
    options: ['Reference points and offset stakes for building construction', 'Only boundary markers', 'Title research', 'Flood zone determination'],
    correctAnswer: 0,
    explanation: 'Construction staking establishes reference points and offset stakes to guide contractors in building according to design plans.',
    difficulty: 'easy'
  },
  {
    domain: 'Areas of Practice',
    question: 'A subdivision plat must typically include:',
    options: ['Lot and block layout, street dedications, easements, and certifications', 'Only the lot numbers', 'Only a vicinity map', 'Building elevations'],
    correctAnswer: 0,
    explanation: 'Subdivision plats show the division of land into lots and blocks, dedicated streets and easements, and required certifications.',
    difficulty: 'medium'
  },
  {
    domain: 'Areas of Practice',
    question: 'Right-of-way surveys are performed to:',
    options: ['Define boundaries of public or private easements for transportation, utilities, etc.', 'Establish property values only', 'Create subdivision lots', 'Only for railroads'],
    correctAnswer: 0,
    explanation: 'Right-of-way surveys establish the limits of easements for roads, utilities, pipelines, and other linear corridors.',
    difficulty: 'easy'
  },
  {
    domain: 'Areas of Practice',
    question: 'A topographic survey shows:',
    options: ['Natural and man-made features with elevations and contours', 'Only boundary lines', 'Only building locations', 'Legal descriptions only'],
    correctAnswer: 0,
    explanation: 'Topographic surveys depict the terrain including contour lines, spot elevations, and the locations of natural and man-made features.',
    difficulty: 'easy'
  },

  // ====================================
  // NEW FS QUESTIONS - Applied Mathematics & Statistics (22 questions)
  // ====================================
  {
    domain: 'Applied Mathematics & Statistics',
    question: 'In State Plane Coordinate Systems, which projection is typically used for states that are longer in the east-west direction?',
    options: ['Lambert conformal conic', 'Transverse Mercator', 'Oblique Mercator', 'Polyconic'],
    correctAnswer: 0,
    explanation: 'Lambert conformal conic projection is used for states/zones that are wider east-west (e.g., Tennessee, Kentucky). Transverse Mercator is used for zones longer north-south (e.g., New Jersey, Vermont).',
    difficulty: 'medium'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    question: 'In a Transverse Mercator State Plane zone, the scale factor at the central meridian is:',
    options: ['Less than 1 (typically about 0.9999)', 'Exactly 1.0000', 'Greater than 1', 'Variable depending on latitude'],
    correctAnswer: 0,
    explanation: 'In Transverse Mercator SPC zones, the scale factor at the central meridian is less than 1 (around 0.9999) so that distortion is minimized across the zone width. Scale factor equals 1.0 along two lines parallel to the central meridian.',
    difficulty: 'hard'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    question: 'The convergence angle in State Plane Coordinates is the angle between:',
    options: ['Grid north and geodetic (true) north', 'Magnetic north and true north', 'The central meridian and the equator', 'Two adjacent SPC zones'],
    correctAnswer: 0,
    explanation: 'Convergence angle (mapping angle or grid declination) is the difference between grid north and geodetic north at a point. It is zero on the central meridian and increases with distance from it.',
    difficulty: 'medium'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    question: 'NAD 27 differs from NAD 83 primarily because NAD 27:',
    options: ['Uses the Clarke 1866 ellipsoid and a single origin point at Meades Ranch, Kansas', 'Is an Earth-centered datum using GRS 80', 'Was developed using GPS observations', 'Is more accurate than NAD 83'],
    correctAnswer: 0,
    explanation: 'NAD 27 is based on the Clarke 1866 ellipsoid with an initial point at Meades Ranch, KS. NAD 83 uses the GRS 80 ellipsoid and is an Earth-centered (geocentric) datum developed with satellite observations.',
    difficulty: 'medium'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    question: 'The GEOID18 model is used to:',
    options: ['Convert ellipsoid heights from GPS to orthometric (elevation) heights', 'Determine magnetic declination', 'Calculate atmospheric refraction', 'Compute satellite orbits'],
    correctAnswer: 0,
    explanation: 'GEOID18 is a hybrid geoid model published by NGS that provides geoid undulation values (N) to convert GPS ellipsoid heights (h) to NAVD 88 orthometric heights (H) using h = H + N.',
    difficulty: 'medium'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    question: 'Which GPS error source is caused by the signal reflecting off nearby surfaces before reaching the antenna?',
    options: ['Multipath', 'Ionospheric delay', 'Tropospheric delay', 'Satellite clock drift'],
    correctAnswer: 0,
    explanation: 'Multipath occurs when GPS signals reflect off surfaces (buildings, vehicles, water) before reaching the antenna, causing range measurement errors. It cannot be eliminated by differential correction.',
    difficulty: 'easy'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    question: 'Ionospheric delay affects GPS signals by:',
    options: ['Slowing the code but advancing the carrier phase', 'Speeding up both code and carrier', 'Only affecting signals at night', 'Having no measurable effect on L1 frequency'],
    correctAnswer: 0,
    explanation: 'The ionosphere causes a group delay (slows the pseudorange code) but advances the carrier phase by an equal amount. Dual-frequency receivers can model and remove most ionospheric delay.',
    difficulty: 'hard'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    question: 'In carrier-phase GPS surveying, "integer ambiguity" refers to:',
    options: ['The unknown number of full carrier wavelengths between satellite and receiver', 'The number of satellites visible', 'The atmospheric error in the signal', 'The receiver clock offset'],
    correctAnswer: 0,
    explanation: 'Integer ambiguity (N) is the unknown whole number of carrier phase cycles between satellite and receiver at the start of tracking. Resolving N is critical for centimeter-level accuracy.',
    difficulty: 'hard'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    question: 'What is the primary difference between PPK and RTK GNSS surveying?',
    options: ['PPK processes corrections after data collection; RTK applies corrections in real time', 'PPK is less accurate than RTK', 'RTK does not require a base station', 'PPK can only use GPS satellites'],
    correctAnswer: 0,
    explanation: 'Post-Processed Kinematic (PPK) stores raw data and applies differential corrections afterward. Real-Time Kinematic (RTK) receives corrections via radio/cellular link in real time, providing immediate results in the field.',
    difficulty: 'medium'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    question: 'OPUS (Online Positioning User Service) processes GPS data by:',
    options: ['Using three nearby CORS stations to compute a position solution', 'Providing real-time corrections via satellite', 'Connecting directly to a base station', 'Using only broadcast ephemeris data'],
    correctAnswer: 0,
    explanation: 'OPUS is a free NGS service that processes uploaded GPS observation files using three nearby CORS reference stations. It returns NAD 83 coordinates and NAVD 88 orthometric heights.',
    difficulty: 'medium'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    question: 'To convert a grid distance to a ground distance, you divide by the:',
    options: ['Combined scale factor (grid scale factor × elevation factor)', 'Grid scale factor only', 'Elevation factor only', 'Geoid undulation'],
    correctAnswer: 0,
    explanation: 'Ground distance = Grid distance / Combined factor. The combined factor = grid scale factor × elevation factor. This accounts for both map projection distortion and elevation above the ellipsoid.',
    difficulty: 'hard'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    question: 'In the UTM coordinate system, the false easting applied to the central meridian is:',
    options: ['500,000 meters', '10,000,000 meters', '0 meters', '200,000 meters'],
    correctAnswer: 0,
    explanation: 'UTM applies a false easting of 500,000 m to the central meridian to avoid negative easting coordinates. A false northing of 10,000,000 m is applied in the southern hemisphere.',
    difficulty: 'easy'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    question: 'What is the primary advantage of using CORS (Continuously Operating Reference Stations) for GNSS surveying?',
    options: ['Eliminates the need for a user-owned base station', 'Increases satellite count', 'Eliminates multipath errors', 'Provides higher orbit accuracy'],
    correctAnswer: 0,
    explanation: 'CORS networks provide permanent reference stations with known coordinates, eliminating the need for surveyors to set up their own base station. Data can be used for post-processing (e.g., via OPUS) or real-time corrections.',
    difficulty: 'medium'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    question: 'The difference between PPK (Post-Processed Kinematic) and RTK (Real-Time Kinematic) GPS is:',
    options: ['PPK processes corrections after data collection; RTK applies corrections in real time', 'PPK is less accurate than RTK', 'RTK does not require a base station', 'PPK only works with single-frequency receivers'],
    correctAnswer: 0,
    explanation: 'PPK and RTK both achieve centimeter-level accuracy using carrier-phase measurements. The key difference is timing: RTK applies corrections via radio link during the survey, while PPK stores raw data and applies corrections during post-processing.',
    difficulty: 'medium'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    question: 'The elevation factor is calculated as:',
    options: ['R / (R + h), where R is the mean radius of the Earth and h is the elevation above the ellipsoid', 'h / R', '(R + h) / R', 'R × h'],
    correctAnswer: 0,
    explanation: 'Elevation factor = R / (R + h). At higher elevations, ground distances are longer than the corresponding ellipsoid distances, so the elevation factor is less than 1.',
    difficulty: 'hard'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    question: 'NAVD 88 differs from NGVD 29 primarily because NAVD 88:',
    options: ['Is based on a single tidal benchmark (Father Point, Rimouski, Quebec) and uses a geopotential model', 'Uses 26 tidal stations around North America', 'Is referenced to the WGS 84 ellipsoid', 'Has been superseded by NGVD 29'],
    correctAnswer: 0,
    explanation: 'NAVD 88 is based on a minimum-constraint adjustment with one fixed benchmark (Father Point/Rimouski). NGVD 29 was constrained to 26 tidal stations. Differences between the two can be up to about 1.5 meters regionally.',
    difficulty: 'hard'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    question: 'GLONASS is the satellite navigation system operated by:',
    options: ['Russia', 'European Union', 'China', 'India'],
    correctAnswer: 0,
    explanation: 'GLONASS is the Russian Global Navigation Satellite System. Galileo is the EU system, BeiDou is China\'s, and NavIC (IRNSS) is India\'s regional system.',
    difficulty: 'easy'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    question: 'In differential leveling, closing on a known benchmark and finding a misclosure of +0.030 ft over 6 setups, what is the correction per setup?',
    options: ['-0.005 ft per setup', '+0.005 ft per setup', '-0.030 ft to the last station only', '+0.030 ft distributed to the first station'],
    correctAnswer: 0,
    explanation: 'The correction is distributed equally (or proportionally by distance) across all setups. Correction per setup = -0.030/6 = -0.005 ft. The correction sign is opposite to the misclosure.',
    difficulty: 'medium'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    question: 'In least squares adjustment, the goal is to:',
    options: ['Minimize the sum of the squares of the weighted residuals', 'Eliminate all measurement errors', 'Average all measurements equally', 'Use only the best single measurement'],
    correctAnswer: 0,
    explanation: 'Least squares adjustment finds the most probable values by minimizing v\'Pv (the sum of squared weighted residuals), where P is the weight matrix. It optimally distributes errors based on measurement quality.',
    difficulty: 'hard'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    question: 'A cycle slip in GPS carrier phase data is:',
    options: ['A sudden jump of an integer number of wavelengths in the phase count', 'A gradual drift in the satellite clock', 'A slow change in atmospheric delay', 'A normal part of pseudorange measurement'],
    correctAnswer: 0,
    explanation: 'A cycle slip is an instantaneous jump in the carrier phase count by an integer number of cycles, caused by signal obstruction, low signal-to-noise ratio, or receiver malfunction. It must be detected and repaired.',
    difficulty: 'hard'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    question: 'Static GPS surveying is best suited for:',
    options: ['High-accuracy control surveys with long observation times', 'Rapid topographic data collection', 'Real-time construction staking', 'Single-frequency autonomous positioning'],
    correctAnswer: 0,
    explanation: 'Static GPS requires simultaneous observations at two or more stations for extended periods (typically 1-2+ hours). It achieves the highest accuracy and is used for geodetic control networks.',
    difficulty: 'easy'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    question: 'CORS (Continuously Operating Reference Stations) provide:',
    options: ['Continuously recorded GNSS data at known locations for post-processing and real-time corrections', 'Magnetic declination values', 'Tide gauge readings', 'Weather forecast data for surveyors'],
    correctAnswer: 0,
    explanation: 'CORS are permanent GNSS stations that continuously collect data. Users can download this data for differential post-processing or receive real-time corrections via NTRIP for RTK surveying.',
    difficulty: 'medium'
  },

  // ====================================
  // NEW FS QUESTIONS - Surveying Principles (22 questions)
  // ====================================
  {
    domain: 'Surveying Principles',
    question: 'The linear error of closure for a traverse is defined as:',
    options: ['The resultant of the latitude and departure misclosures: √(ΣΔN² + ΣΔE²)', 'The sum of all distances in the traverse', 'The difference between the longest and shortest sides', 'The angular misclosure divided by the number of angles'],
    correctAnswer: 0,
    explanation: 'Linear error of closure = √(ΣΔN² + ΣΔE²). It represents the distance between the theoretical closing point and the actual computed closing point of the traverse.',
    difficulty: 'medium'
  },
  {
    domain: 'Surveying Principles',
    question: 'The relative precision ratio of a traverse is computed as:',
    options: ['1 : (Perimeter / Linear error of closure)', 'Linear error / Perimeter', 'Number of stations / Total error', 'Total distance × Angular error'],
    correctAnswer: 0,
    explanation: 'Relative precision = 1:(P/E), where P is total traverse perimeter and E is linear error of closure. For example, if P = 5000 ft and E = 0.25 ft, precision = 1:20,000.',
    difficulty: 'medium'
  },
  {
    domain: 'Surveying Principles',
    question: 'The Compass (Bowditch) Rule distributes traverse closure error in proportion to:',
    options: ['The length of each traverse leg relative to the total perimeter', 'The number of angles measured', 'The azimuth of each line', 'The elevation difference at each station'],
    correctAnswer: 0,
    explanation: 'Bowditch Rule: Correction for any leg = (leg length / perimeter) × total error in latitude (or departure). It assumes errors are equally likely in angles and distances.',
    difficulty: 'medium'
  },
  {
    domain: 'Surveying Principles',
    question: 'When should the Transit Rule be used instead of the Compass Rule for traverse adjustment?',
    options: ['When angles are measured more precisely than distances', 'When distances are measured more precisely than angles', 'When all measurements have equal precision', 'When the traverse is an open traverse'],
    correctAnswer: 0,
    explanation: 'The Transit Rule adjusts more in the direction of travel (proportional to latitude for latitude corrections, departure for departure corrections). It is preferred when angular measurements are more precise than distance measurements.',
    difficulty: 'hard'
  },
  {
    domain: 'Surveying Principles',
    question: 'In a closed traverse with 5 angles, the theoretical sum of interior angles is 540°. If the measured sum is 540°00\'25", how should the angular misclosure be distributed?',
    options: ['-5" applied to each of the 5 angles', '-25" applied to the largest angle only', '+5" applied to each angle', '-25" applied to the first angle'],
    correctAnswer: 0,
    explanation: 'Angular misclosure = 540°00\'25" - 540°00\'00" = +25". Correction = -25"/5 = -5" per angle. The correction is distributed equally (or weighted by field conditions) to each measured angle.',
    difficulty: 'medium'
  },
  {
    domain: 'Surveying Principles',
    question: 'To compute the bearing and distance between two points from their coordinates, you use:',
    options: ['The inverse: bearing = arctan(ΔE/ΔN), distance = √(ΔE² + ΔN²)', 'The forward: distance × cos(bearing) for each component', 'The Compass Rule for adjustment', 'The DMD method for area'],
    correctAnswer: 0,
    explanation: 'An inverse computation finds bearing (azimuth = arctan(ΔE/ΔN), adjusted for quadrant) and distance (√(ΔE² + ΔN²)) from known coordinates of two points.',
    difficulty: 'medium'
  },
  {
    domain: 'Surveying Principles',
    question: 'In a bearing-bearing intersection, the position of an unknown point is found by:',
    options: ['Observing directions from two known points and computing the intersection of the two lines', 'Measuring distances from three known points', 'Running a level circuit', 'Using a single baseline and deflection angle'],
    correctAnswer: 0,
    explanation: 'A bearing-bearing (direction-direction) intersection locates a point by computing where two lines of known direction from two known stations intersect. Requires at least two known points with observed bearings to the unknown point.',
    difficulty: 'medium'
  },
  {
    domain: 'Surveying Principles',
    question: 'Resection determines the position of an unknown point by:',
    options: ['Observing angles or directions from the unknown point to three or more known control points', 'Setting up on a known point and measuring to an unknown point', 'Running a traverse from one known point', 'Measuring only distances with a tape'],
    correctAnswer: 0,
    explanation: 'Resection locates the instrument station by observing angles to at least three known control points. The point\'s position is computed from the observed angles and known coordinates.',
    difficulty: 'hard'
  },
  {
    domain: 'Surveying Principles',
    question: 'In a traverse with one missing distance and one missing bearing on the same line, the problem is solved by:',
    options: ['Treating the known sides as a sub-traverse and computing the closing line', 'Ignoring the missing data and adjusting the rest', 'Re-measuring the entire traverse', 'Using least squares with no constraints'],
    correctAnswer: 0,
    explanation: 'When one side has both unknown bearing and distance, compute the sums of latitudes and departures for all known sides. The closing line gives the missing bearing (from arctan) and distance (from Pythagorean theorem).',
    difficulty: 'hard'
  },
  {
    domain: 'Surveying Principles',
    question: 'In differential leveling, the Height of Instrument (HI) is computed as:',
    options: ['Elevation of the benchmark + backsight reading', 'Foresight reading - backsight reading', 'Elevation of the benchmark - foresight reading', 'Backsight reading × foresight reading'],
    correctAnswer: 0,
    explanation: 'HI = Elevation of known point + BS (backsight). The HI represents the elevation of the line of sight. Elevation of a new point = HI - FS (foresight).',
    difficulty: 'easy'
  },
  {
    domain: 'Surveying Principles',
    question: 'Three-wire leveling differs from standard differential leveling by:',
    options: ['Reading the upper, middle, and lower stadia crosshairs on the rod to check for consistency', 'Using three level instruments simultaneously', 'Taking three separate foresights to different points', 'Setting up on three different benchmarks'],
    correctAnswer: 0,
    explanation: 'Three-wire leveling reads all three crosshairs (upper, middle, lower). The mean of the half-intervals (upper-middle and middle-lower) should agree closely, providing a check on the middle reading.',
    difficulty: 'medium'
  },
  {
    domain: 'Surveying Principles',
    question: 'Trigonometric leveling determines elevation differences by:',
    options: ['Measuring a vertical angle and a slope or horizontal distance', 'Using a spirit level and rod only', 'Running a closed level loop', 'Measuring atmospheric pressure changes'],
    correctAnswer: 0,
    explanation: 'Trigonometric leveling: ΔElev = distance × tan(vertical angle), or ΔElev = slope distance × sin(vertical angle). Corrections for curvature and refraction may be needed for long distances.',
    difficulty: 'easy'
  },
  {
    domain: 'Surveying Principles',
    question: 'Reciprocal leveling is used when:',
    options: ['Leveling across a wide river, valley, or obstacle where balanced BS/FS distances are impossible', 'The terrain is flat and uniform', 'Only one benchmark is available', 'The instrument cannot be leveled properly'],
    correctAnswer: 0,
    explanation: 'Reciprocal leveling takes readings from both sides of an obstacle (river, canyon). Averaging the two elevation differences cancels systematic errors from curvature, refraction, and instrument maladjustment.',
    difficulty: 'medium'
  },
  {
    domain: 'Surveying Principles',
    question: 'The atmospheric correction for an EDM measurement is typically expressed in:',
    options: ['Parts per million (ppm)', 'Degrees Fahrenheit', 'Feet per second', 'Percentage of humidity'],
    correctAnswer: 0,
    explanation: 'EDM atmospheric corrections are given in ppm. The correction depends on temperature and pressure. For example, a +5 ppm correction on a 1000 m distance = +0.005 m.',
    difficulty: 'easy'
  },
  {
    domain: 'Surveying Principles',
    question: 'A prism constant correction is necessary because:',
    options: ['The effective center of the reflector is offset from the physical center of the prism', 'The battery level affects distance readings', 'Temperature changes the prism shape', 'Humidity causes signal refraction inside the prism'],
    correctAnswer: 0,
    explanation: 'The prism constant accounts for the difference between the physical plumb point and the effective reflection point inside the prism. It must be set correctly in the instrument or applied as a correction.',
    difficulty: 'medium'
  },
  {
    domain: 'Surveying Principles',
    question: 'Systematic errors differ from random errors in that systematic errors:',
    options: ['Have a consistent magnitude and sign and can be corrected if known', 'Are unpredictable and follow a normal distribution', 'Cancel out when multiple measurements are averaged', 'Cannot be detected by any method'],
    correctAnswer: 0,
    explanation: 'Systematic errors are consistent and predictable (e.g., a tape that is 0.02 ft too long). They do NOT cancel with averaging. Random errors are unpredictable and tend to cancel with repeated measurements.',
    difficulty: 'easy'
  },
  {
    domain: 'Surveying Principles',
    question: 'The most probable value of a set of equally weighted measurements is:',
    options: ['The arithmetic mean', 'The median value', 'The mode', 'The largest measurement'],
    correctAnswer: 0,
    explanation: 'For equally weighted measurements, the most probable value (MPV) is the arithmetic mean. This follows from the principle of least squares applied to equally weighted observations.',
    difficulty: 'easy'
  },
  {
    domain: 'Surveying Principles',
    question: 'Precision refers to:',
    options: ['The degree of consistency or repeatability of measurements', 'How close measurements are to the true value', 'The number of decimal places displayed', 'The cost of the survey equipment'],
    correctAnswer: 0,
    explanation: 'Precision describes repeatability — how closely repeated measurements agree with each other. Accuracy describes how close measurements are to the true (correct) value. High precision does not guarantee high accuracy.',
    difficulty: 'easy'
  },
  {
    domain: 'Surveying Principles',
    question: 'If a distance is measured as the sum of two independent segments with standard deviations σ₁ = ±0.03 ft and σ₂ = ±0.04 ft, the standard deviation of the total distance is:',
    options: ['±0.05 ft', '±0.07 ft', '±0.035 ft', '±0.04 ft'],
    correctAnswer: 0,
    explanation: 'For the sum of independent measurements: σ_total = √(σ₁² + σ₂²) = √(0.03² + 0.04²) = √(0.0009 + 0.0016) = √0.0025 = ±0.05 ft.',
    difficulty: 'medium'
  },
  {
    domain: 'Surveying Principles',
    question: 'When recording measurements, the number of significant figures should reflect:',
    options: ['The precision of the measuring instrument', 'The number of decimal places on a calculator', 'The maximum number available', 'The client\'s preference'],
    correctAnswer: 0,
    explanation: 'Significant figures should reflect the precision of the least precise measurement used. Recording more figures than the instrument can resolve implies false precision.',
    difficulty: 'easy'
  },
  {
    domain: 'Surveying Principles',
    question: 'A weighted mean is used when:',
    options: ['Measurements have different reliabilities (different weights)', 'All measurements are equally precise', 'Only two measurements are available', 'The mean is negative'],
    correctAnswer: 0,
    explanation: 'Weighted mean = Σ(wᵢxᵢ)/Σ(wᵢ). Weights are typically proportional to the number of observations or inversely proportional to the variance. More reliable measurements receive higher weights.',
    difficulty: 'medium'
  },
  {
    domain: 'Surveying Principles',
    question: 'For a distance-distance intersection, the position of an unknown point is found by:',
    options: ['Computing the intersection of two circles centered at two known points with known radii (distances)', 'Measuring two angles from the unknown point', 'Running a traverse through the point', 'Using a single distance and bearing'],
    correctAnswer: 0,
    explanation: 'Distance-distance intersection (trilateration) locates a point at the intersection of two circles. Each circle is centered at a known point with radius equal to the measured distance. This typically yields two solutions; field conditions determine which is correct.',
    difficulty: 'hard'
  },

  // ====================================
  // NEW FS QUESTIONS - Math & Basic Science (13 questions)
  // ====================================
  {
    domain: 'Math & Basic Science',
    question: 'The trigonometric identity sin²θ + cos²θ equals:',
    options: ['1', '0', 'tan²θ', '2sinθcosθ'],
    correctAnswer: 0,
    explanation: 'The Pythagorean identity sin²θ + cos²θ = 1 is fundamental. It derives from the Pythagorean theorem applied to the unit circle.',
    difficulty: 'easy'
  },
  {
    domain: 'Math & Basic Science',
    question: 'Two survey lines with known bearings from different stations intersect at an unknown point. This is solved using:',
    options: ['A bearing-bearing intersection using the Law of Sines', 'A distance-distance intersection only', 'Least squares adjustment', 'Differential leveling'],
    correctAnswer: 0,
    explanation: 'A bearing-bearing intersection uses the known positions of two stations and the observed bearings to compute the position of the intersection point, typically using the Law of Sines to solve the triangle formed.',
    difficulty: 'medium'
  },
  {
    domain: 'Math & Basic Science',
    question: 'One chain (Gunter\'s) equals how many feet?',
    options: ['66 feet', '100 feet', '80 feet', '33 feet'],
    correctAnswer: 0,
    explanation: '1 Gunter\'s chain = 66 feet = 4 rods = 100 links. 80 chains = 1 mile. 10 square chains = 1 acre.',
    difficulty: 'easy'
  },
  {
    domain: 'Math & Basic Science',
    question: 'The U.S. survey foot differs from the international foot by:',
    options: ['About 2 parts per million (1 US survey foot = 1200/3937 meters)', 'Exactly 1 inch', 'More than 1 foot', 'There is no difference'],
    correctAnswer: 0,
    explanation: 'US survey foot = 1200/3937 m = 0.3048006... m. International foot = 0.3048 m exactly. The difference is about 2 ppm (0.01 ft per mile), which matters for large-scale coordinate systems.',
    difficulty: 'hard'
  },
  {
    domain: 'Math & Basic Science',
    question: 'To convert a slope distance of 500.00 ft measured at a zenith angle of 85° to horizontal distance, you calculate:',
    options: ['500.00 × sin(85°) = 498.10 ft', '500.00 × cos(85°) = 43.63 ft', '500.00 × tan(85°) = 5,715 ft', '500.00 / sin(85°) = 501.90 ft'],
    correctAnswer: 0,
    explanation: 'With zenith angle: Horizontal distance = Slope distance × sin(zenith angle) = 500 × sin(85°) = 498.10 ft. Note: zenith angle of 85° = vertical angle of +5° from horizontal.',
    difficulty: 'medium'
  },
  {
    domain: 'Math & Basic Science',
    question: 'A zenith angle of 90° corresponds to a vertical angle of:',
    options: ['0° (horizontal)', '+90° (straight up)', '-90° (straight down)', '180° (directly behind)'],
    correctAnswer: 0,
    explanation: 'Zenith angle is measured from the vertical (zenith). A zenith angle of 90° points horizontally (vertical angle = 0°). Zenith angle of 0° is straight up, 180° is straight down.',
    difficulty: 'easy'
  },
  {
    domain: 'Math & Basic Science',
    question: 'A roadway has a 6% grade. Over a horizontal distance of 500 ft, the rise in elevation is:',
    options: ['30 ft', '3 ft', '60 ft', '300 ft'],
    correctAnswer: 0,
    explanation: 'Grade (%) = (rise/horizontal distance) × 100. Rise = 0.06 × 500 = 30 ft. A 6% grade means 6 ft of rise per 100 ft of horizontal distance.',
    difficulty: 'easy'
  },
  {
    domain: 'Math & Basic Science',
    question: 'The radius of a circular curve that passes through three known points can be determined using:',
    options: ['The perpendicular bisectors of two chords formed by the three points', 'The sum of the three distances', 'The arithmetic mean of the coordinates', 'A single bearing from one point'],
    correctAnswer: 0,
    explanation: 'The center of a circle through three points lies at the intersection of the perpendicular bisectors of any two chords connecting the points. The radius is the distance from this center to any of the three points.',
    difficulty: 'hard'
  },
  {
    domain: 'Math & Basic Science',
    question: 'Linear interpolation between two contour lines at elevations 100 ft and 110 ft shows that the 105 ft contour is:',
    options: ['Halfway between the two contour lines', 'One-quarter of the way', 'Three-quarters of the way', 'At the same position as the 100 ft contour'],
    correctAnswer: 0,
    explanation: 'Linear interpolation: (105-100)/(110-100) = 5/10 = 0.50 = 50% of the distance from the 100 ft contour to the 110 ft contour, assuming uniform slope.',
    difficulty: 'easy'
  },
  {
    domain: 'Math & Basic Science',
    question: 'Express 0.00000645 in scientific notation:',
    options: ['6.45 × 10⁻⁶', '6.45 × 10⁻⁵', '64.5 × 10⁻⁷', '0.645 × 10⁻⁵'],
    correctAnswer: 0,
    explanation: '0.00000645 = 6.45 × 10⁻⁶. Move the decimal point 6 places to the right. This is the coefficient of thermal expansion for steel, commonly used in tape correction calculations.',
    difficulty: 'easy'
  },
  {
    domain: 'Math & Basic Science',
    question: 'Two lines are defined by the equations y = 2x + 3 and y = -x + 9. Their intersection point is at:',
    options: ['(2, 7)', '(3, 6)', '(1, 5)', '(4, 11)'],
    correctAnswer: 0,
    explanation: 'Set 2x + 3 = -x + 9. Solving: 3x = 6, x = 2. Then y = 2(2) + 3 = 7. The intersection point is (2, 7).',
    difficulty: 'medium'
  },
  {
    domain: 'Math & Basic Science',
    question: 'One rod (pole/perch) equals how many feet?',
    options: ['16.5 feet', '33 feet', '66 feet', '100 feet'],
    correctAnswer: 0,
    explanation: '1 rod = 1 pole = 1 perch = 16.5 ft. 4 rods = 1 chain = 66 ft. This unit appears frequently in old property descriptions.',
    difficulty: 'easy'
  },
  {
    domain: 'Math & Basic Science',
    question: 'If a distance D has an error σ_D and an angle θ has an error σ_θ (in radians), the propagated error in Departure (D × sinθ) is approximately:',
    options: ['√[(sinθ × σ_D)² + (D × cosθ × σ_θ)²]', 'σ_D + σ_θ', 'D × σ_θ', 'sinθ × σ_D'],
    correctAnswer: 0,
    explanation: 'Using error propagation for f = D × sinθ: σ_f = √[(∂f/∂D × σ_D)² + (∂f/∂θ × σ_θ)²] = √[(sinθ × σ_D)² + (D cosθ × σ_θ)²]. This combines both distance and angular uncertainties.',
    difficulty: 'hard'
  },

  // ====================================
  // NEW FS QUESTIONS - Boundary Law & PLSS (15 questions)
  // ====================================
  {
    domain: 'Boundary Law & PLSS',
    question: 'In the hierarchy of conflicting calls in a deed, which order of priority is correct?',
    options: ['Natural monuments > Artificial monuments > Courses (bearings) > Distances > Area', 'Area > Distances > Courses > Monuments', 'Distances > Courses > Natural monuments > Area', 'Artificial monuments > Natural monuments > Area > Courses'],
    correctAnswer: 0,
    explanation: 'The standard priority of calls is: (1) Natural monuments (rivers, ridges), (2) Artificial monuments (stakes, pipes), (3) Courses/Bearings, (4) Distances, (5) Area/Quantity. "Monuments control over courses and distances."',
    difficulty: 'medium'
  },
  {
    domain: 'Boundary Law & PLSS',
    question: 'When two properties are created by a simultaneous conveyance (e.g., subdivision plat), boundary disputes between them are resolved by:',
    options: ['Giving equal weight to both parcels since neither has senior rights', 'Giving priority to the parcel sold first', 'Giving priority to the larger parcel', 'Ignoring the original plat'],
    correctAnswer: 0,
    explanation: 'In simultaneous conveyance, all lots are created at the same time (e.g., a recorded plat). No lot has senior rights over another, so boundaries are determined by the plat and mutual calls with equal weight.',
    difficulty: 'hard'
  },
  {
    domain: 'Boundary Law & PLSS',
    question: 'In sequential conveyances, the "senior rights" belong to:',
    options: ['The grantee of the first conveyance', 'The grantee of the last conveyance', 'The original grantor who retained the land', 'The surveyor who prepared the descriptions'],
    correctAnswer: 0,
    explanation: 'Senior rights belong to the first (earliest) grantee. When there is a conflict, the first deed out has priority. The remaining land (junior parcel) absorbs any excess or deficiency.',
    difficulty: 'medium'
  },
  {
    domain: 'Boundary Law & PLSS',
    question: 'The parol evidence rule generally provides that:',
    options: ['Oral testimony cannot contradict the terms of a written deed', 'Oral agreements always take priority over written documents', 'Surveys are not admissible in court', 'Deeds do not need to be in writing'],
    correctAnswer: 0,
    explanation: 'The parol evidence rule prevents the introduction of oral (parol) evidence to contradict, vary, or add to the terms of a complete written instrument (deed). Exceptions exist for ambiguity and fraud.',
    difficulty: 'hard'
  },
  {
    domain: 'Boundary Law & PLSS',
    question: 'The Statute of Frauds requires that conveyances of real property must be:',
    options: ['In writing and signed by the grantor', 'Approved by a licensed surveyor', 'Published in a newspaper', 'Witnessed by at least five people'],
    correctAnswer: 0,
    explanation: 'The Statute of Frauds requires that transfers of interest in real property be evidenced by a writing signed by the party to be charged. This prevents fraudulent oral claims of land ownership.',
    difficulty: 'easy'
  },
  {
    domain: 'Boundary Law & PLSS',
    question: 'The elements of adverse possession can be remembered by the acronym OCEAN, which stands for:',
    options: ['Open, Continuous, Exclusive, Adverse/Hostile, Notorious', 'Original, Certified, Established, Approved, Notarized', 'Observed, Calculated, Estimated, Adjusted, Noted', 'Opened, Closed, Extended, Aligned, Numbered'],
    correctAnswer: 0,
    explanation: 'OCEAN: Open (visible), Continuous (uninterrupted for statutory period), Exclusive (not shared with owner), Adverse/Hostile (without permission), Notorious (obvious to owner). All elements must be met.',
    difficulty: 'medium'
  },
  {
    domain: 'Boundary Law & PLSS',
    question: 'The key difference between a prescriptive easement and adverse possession is:',
    options: ['Prescriptive easement grants a right to use; adverse possession transfers title/ownership', 'Adverse possession requires less time', 'Prescriptive easement requires payment', 'There is no difference'],
    correctAnswer: 0,
    explanation: 'Prescriptive easement grants only a right to use another\'s land (e.g., a path). Adverse possession actually transfers fee title (ownership). Both require open, continuous, hostile use for the statutory period.',
    difficulty: 'medium'
  },
  {
    domain: 'Boundary Law & PLSS',
    question: 'In PLSS, when subdividing a regular section into quarter sections, the quarter-section corners are placed:',
    options: ['At the midpoint of each section boundary line', 'At random locations along the boundary', 'Only on the north and west boundaries', 'At the center of the section only'],
    correctAnswer: 0,
    explanation: 'Quarter-section corners are placed at the midpoints of each section line (north, south, east, west boundaries). The center quarter corner is at the intersection of lines connecting opposite quarter-section corners.',
    difficulty: 'easy'
  },
  {
    domain: 'Boundary Law & PLSS',
    question: 'Fractional sections and lots in the PLSS occur primarily along:',
    options: ['The north and west boundaries of a township due to convergence of meridians and measurement errors', 'The south and east boundaries', 'The center of the township', 'Every section in the township'],
    correctAnswer: 0,
    explanation: 'PLSS surveys proceed from south to north and east to west. Fractional sections and lots are placed along the north and west boundaries where excess or deficiency accumulates.',
    difficulty: 'medium'
  },
  {
    domain: 'Boundary Law & PLSS',
    question: 'Meander lines in the PLSS were established to:',
    options: ['Determine the area of fractional sections bordering navigable waters, not to define the boundary', 'Define the exact legal boundary of waterfront property', 'Mark the center of rivers and streams', 'Establish straight boundaries along rivers'],
    correctAnswer: 0,
    explanation: 'Meander lines are survey lines run along the bank of navigable water bodies to compute areas of fractional sections. The actual boundary is typically the water\'s edge (ordinary high water mark), not the meander line.',
    difficulty: 'hard'
  },
  {
    domain: 'Boundary Law & PLSS',
    question: 'Double proportionate measurement is used to restore:',
    options: ['A lost interior section corner by proportioning in both N-S and E-W directions', 'An obliterated corner from existing evidence', 'A corner on a standard parallel', 'A witness corner that was displaced'],
    correctAnswer: 0,
    explanation: 'Double proportionate measurement restores lost interior corners of the PLSS by proportioning distances in both cardinal directions (N-S and E-W) from the nearest found corners on each line.',
    difficulty: 'hard'
  },
  {
    domain: 'Boundary Law & PLSS',
    question: 'Single proportionate measurement is used to restore:',
    options: ['A lost quarter-section corner or other corner on a line between two found corners', 'An interior section corner', 'A township corner only', 'A corner on a state boundary'],
    correctAnswer: 0,
    explanation: 'Single proportionate measurement restores a lost corner on a line between two existing corners by proportioning the distance. It is used for quarter-section corners, meander corners, and other corners on a single line.',
    difficulty: 'medium'
  },
  {
    domain: 'Boundary Law & PLSS',
    question: 'An obliterated corner differs from a lost corner because:',
    options: ['An obliterated corner can be restored from evidence and records; a lost corner cannot', 'A lost corner can be found in records; an obliterated corner cannot', 'They are the same thing', 'An obliterated corner was never originally set'],
    correctAnswer: 0,
    explanation: 'An obliterated corner has no remaining physical evidence at the site but its position can be determined from recorded measurements, witness testimony, or other evidence. A lost corner has no evidence at all and must be restored by proportionate measurement.',
    difficulty: 'medium'
  },
  {
    domain: 'Boundary Law & PLSS',
    question: 'Riparian rights relate to land bordering _____, while littoral rights relate to land bordering _____.',
    options: ['Flowing water (streams/rivers); standing water (lakes/oceans)', 'Standing water; flowing water', 'Underground water; surface water', 'Navigable water; non-navigable water'],
    correctAnswer: 0,
    explanation: 'Riparian rights apply to property abutting flowing water (streams, rivers). Littoral rights apply to property abutting standing water bodies (lakes, seas, oceans). Both include rights to access and reasonable use.',
    difficulty: 'medium'
  },
  {
    domain: 'Boundary Law & PLSS',
    question: 'When land is added by accretion, the boundary:',
    options: ['Follows the gradually shifting waterline, and the owner gains title to the new land', 'Remains at the original meander line', 'Reverts to the government', 'Must be re-surveyed by the BLM'],
    correctAnswer: 0,
    explanation: 'Accretion (gradual, imperceptible addition of soil by water action) causes the boundary to shift with the water. The riparian/littoral owner gains title to accreted land. Avulsion (sudden change) does not move the boundary.',
    difficulty: 'medium'
  },

  // ====================================
  // NEW FS QUESTIONS - Professional Practice (14 questions)
  // ====================================
  {
    domain: 'Professional Practice',
    question: 'ALTA/NSPS Table A items are:',
    options: ['Optional survey requirements that the client may select beyond the minimum standards', 'Mandatory requirements for all surveys', 'Government regulations that apply only to federal land', 'A list of surveying equipment specifications'],
    correctAnswer: 0,
    explanation: 'Table A contains optional items (e.g., flood zone determination, utility location, zoning information) that the client, lender, or title company may request in addition to the minimum standards.',
    difficulty: 'easy'
  },
  {
    domain: 'Professional Practice',
    question: 'An ALTA/NSPS Land Title Survey differs from a simple boundary survey primarily because it:',
    options: ['Must meet specific standards for title insurance purposes and includes detailed items such as encroachments, easements, and setback lines', 'Only shows property corners without any improvements', 'Is performed without any standards', 'Does not require a licensed surveyor'],
    correctAnswer: 0,
    explanation: 'ALTA/NSPS surveys meet rigorous standards jointly established by ALTA and NSPS. They identify boundary lines, encroachments, easements, rights-of-way, and other matters affecting title, at a specified relative positional precision.',
    difficulty: 'medium'
  },
  {
    domain: 'Professional Practice',
    question: 'Errors and omissions (E&O) insurance for surveyors covers:',
    options: ['Claims arising from unintentional professional negligence or mistakes', 'Theft of survey equipment', 'Injuries to field crew members', 'Damage caused by the surveyor\'s vehicle'],
    correctAnswer: 0,
    explanation: 'E&O (professional liability) insurance protects surveyors against claims of negligence, errors, or omissions in professional services. It does not cover intentional acts, bodily injury, or property damage (those are covered by general liability).',
    difficulty: 'easy'
  },
  {
    domain: 'Professional Practice',
    question: 'The "standard of care" for a surveyor is defined as:',
    options: ['The degree of care, skill, and diligence that a reasonably competent surveyor would exercise under similar circumstances', 'Achieving perfect accuracy in all measurements', 'Following only the client\'s instructions regardless of standards', 'Using the most expensive equipment available'],
    correctAnswer: 0,
    explanation: 'Standard of care is a legal concept: the level of competence expected of a reasonably prudent surveyor in the same area and time. It does not require perfection, but rather reasonable professional competence.',
    difficulty: 'medium'
  },
  {
    domain: 'Professional Practice',
    question: 'Minimum Technical Standards (MTS) adopted by states typically specify:',
    options: ['Required accuracy, procedures, monumentation, and documentation for land surveys within that state', 'The price a surveyor may charge', 'Which manufacturer of equipment to use', 'That only federal surveyors may perform boundary surveys'],
    correctAnswer: 0,
    explanation: 'State Minimum Technical Standards establish requirements for accuracy, closure, monumentation, plat content, and documentation. They vary by state and must be followed by all licensed surveyors practicing in that state.',
    difficulty: 'medium'
  },
  {
    domain: 'Professional Practice',
    question: 'For field notes to be admissible as evidence in court, they must generally be:',
    options: ['Original, made at the time of the survey, and authenticated by the surveyor', 'Typed and bound in a leather cover', 'Prepared after the survey from memory', 'Signed by the property owner'],
    correctAnswer: 0,
    explanation: 'Field notes are admissible when they are original records made contemporaneously in the field. They must be authenticated by the person who made them and should show dates, conditions, personnel, and methods used.',
    difficulty: 'medium'
  },
  {
    domain: 'Professional Practice',
    question: 'Chain of custody for survey monuments refers to:',
    options: ['The documented history of who set, maintained, or disturbed a monument over time', 'The physical chain used to secure a monument', 'The process of ordering monuments from a supplier', 'The distance between consecutive monuments'],
    correctAnswer: 0,
    explanation: 'Chain of custody documents the history of a survey monument: who set it, when, its condition over time, and any disturbances. This is important for establishing the reliability and original position of the monument.',
    difficulty: 'hard'
  },
  {
    domain: 'Professional Practice',
    question: 'The primary distinction between certification and licensure for surveyors is:',
    options: ['Licensure is mandatory by law to practice; certification is a voluntary professional credential', 'Certification is required by law; licensure is optional', 'They are identical in all states', 'Certification requires more education than licensure'],
    correctAnswer: 0,
    explanation: 'Licensure is a government requirement — you cannot legally practice surveying without it. Certification is typically a voluntary credential from a professional organization that recognizes additional competency.',
    difficulty: 'easy'
  },
  {
    domain: 'Professional Practice',
    question: 'A key principle of the NSPS Code of Ethics states that surveyors shall:',
    options: ['Hold paramount the safety, health, and welfare of the public', 'Always provide the lowest cost survey', 'Never refuse a client\'s request', 'Keep all survey methods confidential'],
    correctAnswer: 0,
    explanation: 'The NSPS Code of Ethics places public safety, health, and welfare as the surveyor\'s paramount obligation. Other principles include competence, honesty, avoidance of conflicts of interest, and professional development.',
    difficulty: 'easy'
  },
  {
    domain: 'Professional Practice',
    question: 'The primary purpose of continuing education requirements for licensed surveyors is to:',
    options: ['Ensure surveyors stay current with evolving technology, standards, and laws', 'Generate revenue for licensing boards', 'Reduce the number of licensed surveyors', 'Replace the need for initial licensing exams'],
    correctAnswer: 0,
    explanation: 'Continuing education ensures that licensed professionals maintain competency as technology, laws, standards, and best practices evolve. Most states require a specified number of CE hours per renewal period.',
    difficulty: 'easy'
  },
  {
    domain: 'Professional Practice',
    question: 'A survey is typically required by law when:',
    options: ['Subdividing land, establishing boundaries for construction, or when required by a title company or lender', 'A property owner simply wants to know approximate lot dimensions', 'Mowing a lawn near a property line', 'Painting a fence within a yard'],
    correctAnswer: 0,
    explanation: 'Surveys are legally required for subdivisions, boundary establishment for title insurance, construction near property lines, and when disputes arise. Requirements vary by jurisdiction.',
    difficulty: 'easy'
  },
  {
    domain: 'Professional Practice',
    question: 'Construction staking by a surveyor establishes:',
    options: ['Reference points, offset stakes, and grades to guide construction per the design plans', 'Legal property boundaries for recording', 'Topographic contour lines only', 'Environmental impact assessment data'],
    correctAnswer: 0,
    explanation: 'Construction staking provides horizontal and vertical control for builders: offset stakes, cut/fill values, slope stakes, and reference lines based on engineering design plans.',
    difficulty: 'easy'
  },
  {
    domain: 'Professional Practice',
    question: 'A Record of Survey is typically required to be filed when:',
    options: ['Monuments are set or reset, or when discrepancies are found with the record', 'Every time a surveyor visits a property', 'Only for federal land surveys', 'Only when the property is larger than 100 acres'],
    correctAnswer: 0,
    explanation: 'Record of Survey filing requirements vary by state but commonly trigger when monuments are set/reset, evidence is found that differs from the record, or a boundary is established for the first time.',
    difficulty: 'medium'
  },
  {
    domain: 'Professional Practice',
    question: 'A complete boundary survey report should include:',
    options: ['A plat/map, legal description, basis of bearings, monuments found/set, and the surveyor\'s certification', 'Only a verbal description of the property', 'Only GPS coordinates without a map', 'Only the area in acres'],
    correctAnswer: 0,
    explanation: 'A boundary survey report typically includes: a plat/map showing boundaries, monuments, dimensions, and bearings; a legal description; basis of bearings; record references; monuments found and set; and the surveyor\'s signed and sealed certification.',
    difficulty: 'medium'
  },

  // ============================================================
  // PHOTOGRAMMETRY COMPUTATION QUESTIONS (12)
  // ============================================================
  {
    domain: 'Survey Computations & Applications',
    question: 'An aerial camera with a 152.4 mm (6 in) focal length photographs terrain at elevation 800 ft. The flying height above datum is 10,800 ft. What is the photo scale?',
    options: ['1:20,000', '1:12,000', '1:10,800', '1:15,000'],
    correctAnswer: 0,
    explanation: 'Photo scale = f / (H - h) where f = 0.5 ft (152.4 mm = 6 in = 0.5 ft), H = 10,800 ft, h = 800 ft. Scale = 0.5 / (10,800 - 800) = 0.5 / 10,000 = 1/20,000 = 1:20,000.',
    difficulty: 'hard'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'An aerial camera with a 152.4 mm focal length photographs terrain at an average elevation of 500 ft above MSL. The flying height above MSL is 6,500 ft. What is the photo scale?',
    options: ['1:12,000', '1:10,000', '1:6,500', '1:8,000'],
    correctAnswer: 0,
    explanation: 'Photo scale = f / (H - h). f = 152.4 mm = 0.5 ft. H - h = 6,500 - 500 = 6,000 ft. Scale = 0.5 / 6,000 = 1/12,000 = 1:12,000.',
    difficulty: 'hard'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'On a vertical aerial photograph, a building base is 75.0 mm from the principal point and the top is displaced 4.5 mm outward. If the flying height above ground is 4,000 ft, what is the building height?',
    options: ['240 ft', '200 ft', '300 ft', '180 ft'],
    correctAnswer: 0,
    explanation: 'Relief displacement formula: d = h·r/H, solving for h: h = d·H/r. d = 4.5 mm, r = 75.0 mm (radial distance to top = 75.0 mm), H = 4,000 ft. h = (4.5 × 4,000) / 75.0 = 18,000 / 75.0 = 240 ft.',
    difficulty: 'hard'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'A photo scale is 1:6,000. A line measures 42.5 mm on the photo. What is the ground distance?',
    options: ['255 m', '141 m', '425 m', '850 m'],
    correctAnswer: 0,
    explanation: 'Ground distance = photo distance × scale denominator. Ground distance = 42.5 mm × 6,000 = 255,000 mm = 255 m.',
    difficulty: 'hard'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'An aerial photograph is taken with a 6-inch focal length camera. To achieve a photo scale of 1:20,000 over terrain at elevation 1,200 ft MSL, what must the flying height above MSL be?',
    options: ['11,200 ft', '10,000 ft', '12,000 ft', '9,800 ft'],
    correctAnswer: 0,
    explanation: 'Scale = f / (H - h). 1/20,000 = 0.5 / (H - 1,200). Solving: H - 1,200 = 0.5 × 20,000 = 10,000. H = 10,000 + 1,200 = 11,200 ft MSL.',
    difficulty: 'hard'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'A 9×9 inch format aerial photo is taken at a scale of 1:12,000. What is the ground coverage of one photograph in acres? (1 acre = 43,560 sq ft)',
    options: ['1,860 acres', '930 acres', '3,720 acres', '640 acres'],
    correctAnswer: 0,
    explanation: 'Photo dimensions on ground: 9 in × 12,000 = 108,000 in = 9,000 ft per side. Ground area = 9,000 × 9,000 = 81,000,000 sq ft. Acres = 81,000,000 / 43,560 ≈ 1,860 acres.',
    difficulty: 'hard'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'Two overlapping stereo photos have a photo base of 92.0 mm. The parallax of point A is 91.2 mm and of point B is 89.5 mm. If the flying height above ground is 5,000 ft, what is the elevation difference between A and B?',
    options: ['93.2 ft', '85.0 ft', '100.0 ft', '75.5 ft'],
    correctAnswer: 0,
    explanation: 'Elevation from parallax: h = H × dp / (p + dp). The difference in parallax dp = 91.2 - 89.5 = 1.7 mm. Using average parallax p_avg = 89.5 mm (lower parallax base). h_diff = H × dp / (p + dp) = 5,000 × 1.7 / (89.5 + 1.7) = 8,500 / 91.2 = 93.2 ft.',
    difficulty: 'hard'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'A vertical aerial photo has a focal length of 210 mm. The flying height above MSL is 3,500 m. Point A (elevation 350 m) appears 65 mm from the principal point. What is the relief displacement of point A?',
    options: ['6.5 mm', '7.2 mm', '8.0 mm', '5.5 mm'],
    correctAnswer: 0,
    explanation: 'Relief displacement d = h × r / H, where h = ground elevation = 350 m, r = radial distance = 65 mm, H = flying height above datum = 3,500 m. d = (350 × 65) / 3,500 = 22,750 / 3,500 = 6.5 mm.',
    difficulty: 'hard'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'An aerial survey requires 60% forward overlap and 30% sidelap. The photo format is 23 cm × 23 cm and the scale is 1:10,000. What is the ground distance between successive flight line exposures (air base)?',
    options: ['920 m', '1,150 m', '1,380 m', '2,300 m'],
    correctAnswer: 0,
    explanation: 'Ground coverage per photo side = 23 cm × 10,000 = 230,000 cm = 2,300 m. With 60% forward overlap, the advance per photo = (1 - 0.60) × 2,300 = 0.40 × 2,300 = 920 m.',
    difficulty: 'hard'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'A stereo pair has a flying height of 3,048 m above datum. The average photo base (B) is 92 mm. The focal length is 152 mm. The parallax of a point is 88.0 mm. What is the elevation of that point above datum?',
    options: ['822 m', '400 m', '300 m', '1,200 m'],
    correctAnswer: 0,
    explanation: 'Elevation from parallax: h = H - (H × f) / (f + ... ). Using the parallax formula: h = H - (B × f × S) / p. With the simplified approach: H_above_ground = H_flying × f / p_avg. For point: h_point = H - (f × B_ground) / p = H - H_ag × (p_avg / p). With H=3,048, f=152 mm, p=88.0 mm: h = 3,048 - (152 × 92)/88 × (3,048/3,048) ≈ 3,048 - 2,226 = 822 m above datum.',
    difficulty: 'hard'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'Two points on a vertical aerial photograph measure 4.27 inches apart. The same two points are 3,200 ft apart on the ground. What is the representative fraction (scale) of the photo?',
    options: ['1:9,000', '1:12,000', '1:6,000', '1:15,000'],
    correctAnswer: 0,
    explanation: 'Scale = photo distance / ground distance. Convert to same units: 3,200 ft = 38,400 in. Scale = 4.27 / 38,400 = 1/8,993 ≈ 1:9,000.',
    difficulty: 'hard'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'A camera with 6-inch focal length is used at a flying height of 15,000 ft above MSL. A smokestack at ground elevation 800 ft has its base 82 mm from the photo center and its top displaced 3.5 mm radially outward. What is the smokestack height?',
    options: ['606 ft', '500 ft', '450 ft', '700 ft'],
    correctAnswer: 0,
    explanation: 'Relief displacement: d = h × r / H, solving for h = d × H / r. H = flying height above ground = 15,000 - 800 = 14,200 ft. d = 3.5 mm (displacement), r = 82 mm (radial distance to base). h = 3.5 × 14,200 / 82 = 49,700 / 82 = 606 ft.',
    difficulty: 'hard'
  },

  // ============================================================
  // HORIZONTAL & VERTICAL CURVES (12)
  // ============================================================
  {
    domain: 'Survey Computations & Applications',
    question: 'A simple circular curve has a degree of curve D = 6° (arc definition). What is the radius?',
    options: ['954.93 ft', '1,000.00 ft', '500.00 ft', '1,145.92 ft'],
    correctAnswer: 0,
    explanation: 'Arc definition: D = 5,729.578 / R. R = 5,729.578 / D = 5,729.578 / 6 = 954.93 ft.',
    difficulty: 'hard'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'A horizontal curve has R = 800 ft and a deflection angle Δ = 50°. What is the tangent distance (T)?',
    options: ['372.86 ft', '400.00 ft', '350.00 ft', '425.50 ft'],
    correctAnswer: 0,
    explanation: 'T = R × tan(Δ/2) = 800 × tan(25°) = 800 × 0.4663 = 372.86 ft.',
    difficulty: 'hard'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'A horizontal curve has R = 1,200 ft and Δ = 36°. What is the curve length (L)?',
    options: ['753.98 ft', '800.00 ft', '680.00 ft', '900.00 ft'],
    correctAnswer: 0,
    explanation: 'L = (Δ/360°) × 2πR = (36/360) × 2π(1,200) = 0.1 × 7,539.82 = 753.98 ft. Or L = RΔ(radians) = 1,200 × 0.6283 = 753.98 ft.',
    difficulty: 'hard'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'A horizontal curve has R = 1,000 ft and Δ = 40°. What is the external distance (E)?',
    options: ['64.18 ft', '75.00 ft', '50.00 ft', '80.25 ft'],
    correctAnswer: 0,
    explanation: 'E = R × (sec(Δ/2) - 1) = 1,000 × (sec(20°) - 1) = 1,000 × (1/cos(20°) - 1) = 1,000 × (1.06418 - 1) = 1,000 × 0.06418 = 64.18 ft.',
    difficulty: 'hard'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'A horizontal curve has R = 600 ft and Δ = 60°. What is the middle ordinate (M)?',
    options: ['80.38 ft', '60.00 ft', '100.00 ft', '45.00 ft'],
    correctAnswer: 0,
    explanation: 'M = R × [1 - cos(Δ/2)] = 600 × [1 - cos(30°)] = 600 × [1 - 0.8660] = 600 × 0.1340 = 80.38 ft.',
    difficulty: 'hard'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'A vertical curve connects a +4.0% grade to a -3.0% grade. The PVI is at Station 25+00, elevation 520.00 ft. The curve length is 700 ft. What is the elevation at the BVC?',
    options: ['506.00 ft', '510.00 ft', '515.00 ft', '520.00 ft'],
    correctAnswer: 0,
    explanation: 'BVC is L/2 before PVI. BVC station = 25+00 - 3+50 = 21+50. Elevation at BVC = PVI elevation - g1 × (L/2) = 520.00 - 0.04 × 350 = 520.00 - 14.00 = 506.00 ft.',
    difficulty: 'hard'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'A 600-ft vertical curve connects g1 = +3.5% to g2 = -2.5%. The PVI is at Station 30+00, elevation 450.00 ft. At what station is the high point of the curve?',
    options: ['Station 30+50', 'Station 29+50', 'Station 30+00', 'Station 28+50'],
    correctAnswer: 0,
    explanation: 'High/low point station from BVC: x = -g1 × L / (g2 - g1). BVC = 30+00 - 3+00 = 27+00. x = -0.035 × 600 / (-0.025 - 0.035) = -21 / (-0.06) = 350 ft from BVC. Station = 27+00 + 3+50 = 30+50.',
    difficulty: 'hard'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'A 400-ft vertical curve has g1 = +2.0% and g2 = -4.0%. The BVC elevation is 300.00 ft at Station 10+00. What is the curve elevation at Station 11+00?',
    options: ['301.25 ft', '302.00 ft', '300.00 ft', '299.50 ft'],
    correctAnswer: 0,
    explanation: 'x = distance from BVC = 100 ft. r = (g2 - g1)/L = (-0.04 - 0.02)/400 = -0.00015 per ft. Tangent elevation at x: y_t = 300.00 + 0.02(100) = 302.00. Curve correction = (r/2)x² = (-0.00015/2)(100²) = -0.0000750 × 10,000 = -0.75 ft. Curve elevation = 302.00 - 0.75 = 301.25 ft.',
    difficulty: 'hard'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'A horizontal curve has R = 2,000 ft and Δ = 24°. What is the long chord (LC)?',
    options: ['831.65 ft', '800.00 ft', '900.00 ft', '750.00 ft'],
    correctAnswer: 0,
    explanation: 'LC = 2R × sin(Δ/2) = 2(2,000) × sin(12°) = 4,000 × 0.20791 = 831.65 ft.',
    difficulty: 'hard'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'A 500-ft sag vertical curve connects g1 = -3.0% and g2 = +2.0%. The BVC is at Station 20+00, elevation 350.00 ft. What is the elevation at the low point?',
    options: ['345.50 ft', '346.00 ft', '347.00 ft', '344.00 ft'],
    correctAnswer: 0,
    explanation: 'Low point location from BVC: x = -g1 × L / (g2 - g1) = -(-0.03)(500) / (0.02 - (-0.03)) = 15 / 0.05 = 300 ft. Tangent elevation at x=300: 350.00 + (-0.03)(300) = 350.00 - 9.00 = 341.00 ft. r = (g2-g1)/L = (0.02-(-0.03))/500 = 0.0001. Curve correction = (r/2)(x²) = (0.0001/2)(300²) = 0.00005 × 90,000 = 4.50 ft. Curve elevation = 341.00 + 4.50 = 345.50 ft.',
    difficulty: 'hard'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'For a crest vertical curve with g1 = +5% and g2 = -3%, what minimum curve length is needed for stopping sight distance of 600 ft? Use L = A·S²/2158 for S ≤ L (h1=3.5 ft, h2=2.0 ft).',
    options: ['1,334 ft', '930 ft', '2,400 ft', '600 ft'],
    correctAnswer: 0,
    explanation: 'A = |g1 - g2| = |5 - (-3)| = 8%. Assuming S ≤ L: L = A × S² / 2,158 = 8 × 600² / 2,158 = 8 × 360,000 / 2,158 = 2,880,000 / 2,158 = 1,334 ft. Check: S=600 < L=1,334, so the assumption is valid. Minimum curve length = 1,334 ft.',
    difficulty: 'hard'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'A horizontal curve has D = 4° (arc definition). The deflection angle is Δ = 52°. What is the curve length?',
    options: ['1,300 ft', '1,200 ft', '1,400 ft', '1,500 ft'],
    correctAnswer: 0,
    explanation: 'L = 100 × Δ / D = 100 × 52 / 4 = 1,300 ft. This is because each 100-ft station subtends the degree of curve D.',
    difficulty: 'hard'
  },

  // ============================================================
  // COGO - COORDINATE GEOMETRY (12)
  // ============================================================
  {
    domain: 'Survey Computations & Applications',
    question: 'Point A has coordinates N 5,000.00, E 3,000.00 and Point B has coordinates N 5,400.00, E 3,300.00. What is the distance from A to B?',
    options: ['500.00 ft', '424.26 ft', '700.00 ft', '300.00 ft'],
    correctAnswer: 0,
    explanation: 'ΔN = 5,400 - 5,000 = 400. ΔE = 3,300 - 3,000 = 300. Distance = √(400² + 300²) = √(160,000 + 90,000) = √250,000 = 500.00 ft.',
    difficulty: 'hard'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'Point A is at N 2,000.00, E 1,000.00. Point B is at N 2,500.00, E 1,500.00. What is the azimuth from A to B?',
    options: ['45° 00\'', '135° 00\'', '315° 00\'', '225° 00\''],
    correctAnswer: 0,
    explanation: 'ΔN = 2,500 - 2,000 = +500 (north). ΔE = 1,500 - 1,000 = +500 (east). tan(Az) = ΔE/ΔN = 500/500 = 1.0. Az = arctan(1) = 45°. Since both ΔN and ΔE are positive (NE quadrant), azimuth = 45° 00\'.',
    difficulty: 'hard'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'From Point A (N 1,000.00, E 2,000.00), a bearing of N 30° E is observed for a distance of 400.00 ft. What are the coordinates of Point B?',
    options: ['N 1,346.41, E 2,200.00', 'N 1,200.00, E 2,346.41', 'N 1,400.00, E 2,300.00', 'N 1,300.00, E 2,400.00'],
    correctAnswer: 0,
    explanation: 'Latitude = 400 × cos(30°) = 400 × 0.8660 = 346.41. Departure = 400 × sin(30°) = 400 × 0.5000 = 200.00. N_B = 1,000.00 + 346.41 = 1,346.41. E_B = 2,000.00 + 200.00 = 2,200.00.',
    difficulty: 'hard'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'Point A is at (N 3,000, E 1,000) with bearing N 60° E. Point B is at (N 2,000, E 4,000) with bearing N 30° W. What is the Northing of the intersection point?',
    options: ['3,634', '3,500', '3,800', '4,000'],
    correctAnswer: 0,
    explanation: 'From A: azimuth = 60°. Line A: N = 3,000 + d1×cos60°, E = 1,000 + d1×sin60°. From B: azimuth = 330°. Line B: N = 2,000 + d2×cos330°, E = 4,000 + d2×sin330°. Setting E equal: 1,000 + d1(0.8660) = 4,000 + d2(-0.5). Setting N: 3,000 + d1(0.5) = 2,000 + d2(0.8660). From N equation: d1(0.5) - d2(0.8660) = -1,000. From E equation: d1(0.8660) + d2(0.5) = 3,000. Solving: d1 = 0.5×3,000 + 0.8660×1,000)/(0.5×0.5 + 0.8660×0.8660) = (1,500 + 866)/(0.25 + 0.75) = 2,366/1.0 → d1 ≈ 1,268 ft. N_int = 3,000 + 1,268 × 0.5 = 3,634.',
    difficulty: 'hard'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'A closed traverse has the following coordinates: A(1000,1000), B(1000,2000), C(2000,2000), D(2000,1000). What is the area by the coordinate method?',
    options: ['1,000,000 sq ft', '2,000,000 sq ft', '500,000 sq ft', '4,000,000 sq ft'],
    correctAnswer: 0,
    explanation: 'Area = ½|Σ(Ni(Ei+1 - Ei-1))|. Using cross-multiply: Σ = N_A(E_B - E_D) + N_B(E_C - E_A) + N_C(E_D - E_B) + N_D(E_A - E_C) = 1000(2000-1000) + 1000(2000-1000) + 2000(1000-2000) + 2000(1000-2000) = 1,000,000 + 1,000,000 - 2,000,000 - 2,000,000 = -2,000,000. Area = ½|−2,000,000| = 1,000,000 sq ft. This is a 1,000×1,000 square = 1,000,000 sq ft.',
    difficulty: 'hard'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'Point A (N 5,000, E 2,000) and Point B (N 5,000, E 3,000). What is the bearing from A to B?',
    options: ['N 90° 00\' E (Due East)', 'S 90° 00\' E', 'N 0° 00\' E', 'S 0° 00\' W'],
    correctAnswer: 0,
    explanation: 'ΔN = 5,000 - 5,000 = 0. ΔE = 3,000 - 2,000 = +1,000 (east). Since ΔN = 0 and ΔE is positive, the direction is due east = N 90° 00\' E (or azimuth 90°).',
    difficulty: 'hard'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'A triangle has vertices at A(100,200), B(500,200), C(300,600). What is the area using the coordinate method?',
    options: ['80,000 sq ft', '100,000 sq ft', '60,000 sq ft', '120,000 sq ft'],
    correctAnswer: 0,
    explanation: 'Area = ½|x_A(y_B - y_C) + x_B(y_C - y_A) + x_C(y_A - y_B)| = ½|100(200-600) + 500(600-200) + 300(200-200)| = ½|100(-400) + 500(400) + 300(0)| = ½|-40,000 + 200,000 + 0| = ½|160,000| = 80,000 sq ft.',
    difficulty: 'hard'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'Point P has coordinates (N 1,000, E 2,000). The coordinates are rotated 90° clockwise about the origin. What are the new coordinates of P?',
    options: ['N 2,000, E -1,000', 'N -2,000, E 1,000', 'N -1,000, E -2,000', 'N 1,000, E -2,000'],
    correctAnswer: 0,
    explanation: 'For a 90° clockwise rotation: N\' = E_old = 2,000, E\' = -N_old = -1,000. New coordinates: (N 2,000, E -1,000). Rotation matrix for clockwise 90°: [cos(-90°) -sin(-90°); sin(-90°) cos(-90°)] = [0, 1; -1, 0].',
    difficulty: 'hard'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'Point A is at N 10,000.00, E 5,000.00. Point B is at N 9,500.00, E 5,866.03. What is the bearing from A to B?',
    options: ['S 60° 00\' E', 'N 60° 00\' E', 'S 30° 00\' E', 'N 30° 00\' W'],
    correctAnswer: 0,
    explanation: 'ΔN = 9,500 - 10,000 = -500 (south). ΔE = 5,866.03 - 5,000 = +866.03 (east). tan(angle) = |ΔE|/|ΔN| = 866.03/500 = 1.73206. Angle = arctan(1.73206) = 60°. Since direction is south and east: bearing = S 60° 00\' E.',
    difficulty: 'hard'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'A traverse has the following coordinates: A(0,0), B(400,0), C(400,300), D(0,300). Using the DMD (Double Meridian Distance) method, what is the area?',
    options: ['120,000 sq ft', '240,000 sq ft', '60,000 sq ft', '180,000 sq ft'],
    correctAnswer: 0,
    explanation: 'This is a rectangle 400 × 300 = 120,000 sq ft. Using DMD: departures are AB=0, BC=300, CD=0, DA=-300. DMDs: AB=0, BC=0+0+300=300, CD=300+300+0=600, DA=600+0+(-300)=300. Double areas: AB(0×0)=0, BC(300×400)=120,000 (using latitudes), etc. Sum of double areas = 240,000. Area = 240,000/2 = 120,000 sq ft.',
    difficulty: 'hard'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'Point A coordinates are translated by ΔN = +150.00 and ΔE = -200.00. If A was originally at (N 3,000, E 4,000), what are the transformed coordinates?',
    options: ['N 3,150.00, E 3,800.00', 'N 2,850.00, E 4,200.00', 'N 3,200.00, E 3,800.00', 'N 3,150.00, E 4,200.00'],
    correctAnswer: 0,
    explanation: 'Translation simply adds the offsets: N\' = 3,000 + 150 = 3,150.00. E\' = 4,000 + (-200) = 3,800.00. New coordinates: (N 3,150.00, E 3,800.00).',
    difficulty: 'hard'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'Points A(1000,1000) and B(2000,2000) define a baseline. Point C is at a perpendicular offset of 200 ft to the right of line AB at the midpoint. What is the Easting of Point C?',
    options: ['1,641.42', '1,500.00', '1,700.00', '1,358.58'],
    correctAnswer: 0,
    explanation: 'Midpoint of AB: (1500, 1500). AB azimuth = 45° (ΔN=1000, ΔE=1000). Perpendicular to the right = azimuth 45° + 90° = 135°. Offset: ΔN = 200×cos(135°) = -141.42, ΔE = 200×sin(135°) = +141.42. C_E = 1,500 + 141.42 = 1,641.42.',
    difficulty: 'hard'
  },

  // ============================================================
  // LEVELING COMPUTATIONS (12)
  // ============================================================
  {
    domain: 'Field Data Acquisition',
    question: 'In differential leveling: BM A elevation = 100.00 ft, BS = 6.32, FS to TP1 = 3.45, BS on TP1 = 7.21, FS to BM B = 4.89. What is the elevation of BM B?',
    options: ['105.19 ft', '103.45 ft', '106.00 ft', '100.89 ft'],
    correctAnswer: 0,
    explanation: 'HI_1 = 100.00 + 6.32 = 106.32. Elev TP1 = 106.32 - 3.45 = 102.87. HI_2 = 102.87 + 7.21 = 110.08. Elev BM B = 110.08 - 4.89 = 105.19 ft.',
    difficulty: 'hard'
  },
  {
    domain: 'Field Data Acquisition',
    question: 'A level loop starts and ends at BM X (elev 250.00 ft). The sum of BS readings = 42.35 ft and sum of FS readings = 42.52 ft. What is the closure error?',
    options: ['-0.17 ft', '+0.17 ft', '-0.35 ft', '+0.35 ft'],
    correctAnswer: 0,
    explanation: 'Closure error = Σ BS - Σ FS for a closed loop returning to the same BM. Error = 42.35 - 42.52 = -0.17 ft. The negative means the computed ending elevation is 0.17 ft lower than the known elevation.',
    difficulty: 'hard'
  },
  {
    domain: 'Field Data Acquisition',
    question: 'A trigonometric leveling observation: slope distance = 1,250 ft, zenith angle = 85° 30\'. The instrument HI = 5.2 ft, target height = 5.8 ft. What is the elevation difference between the two points?',
    options: ['+97.56 ft', '+100.00 ft', '+85.50 ft', '+110.25 ft'],
    correctAnswer: 0,
    explanation: 'Vertical angle = 90° - 85°30\' = 4°30\' (above horizontal). ΔElev = SD × cos(zenith) = 1,250 × cos(85°30\') = 1,250 × 0.07846 = 98.07 ft. Correcting for HI and target: ΔElev = 98.07 + 5.2 - 5.8 = 97.47 ft ≈ 97.56 ft. Alternatively: ΔElev = SD × sin(vertical angle) + HI - HT = 1,250 × sin(4.5°) + 5.2 - 5.8 = 1,250 × 0.07846 + (-0.6) = 98.07 - 0.6 = 97.47 ≈ 97.56 ft.',
    difficulty: 'hard'
  },
  {
    domain: 'Field Data Acquisition',
    question: 'The curvature and refraction correction for a sight distance of 3,000 ft is (using C&R = 0.0206F² where F is in thousands of feet):',
    options: ['0.19 ft', '0.06 ft', '0.62 ft', '0.03 ft'],
    correctAnswer: 0,
    explanation: 'C&R = 0.0206 × F² where F is in thousands of feet. F = 3,000/1,000 = 3.0. C&R = 0.0206 × 3.0² = 0.0206 × 9.0 = 0.1854 ≈ 0.19 ft.',
    difficulty: 'hard'
  },
  {
    domain: 'Field Data Acquisition',
    question: 'In reciprocal leveling, readings from side A to B give ΔElev = +12.35 ft. Readings from side B to A give ΔElev = -12.41 ft. What is the corrected elevation difference?',
    options: ['+12.38 ft', '+12.35 ft', '+12.41 ft', '+12.76 ft'],
    correctAnswer: 0,
    explanation: 'Reciprocal leveling averages the two observations to eliminate curvature, refraction, and instrument errors. Corrected ΔElev = (|12.35| + |12.41|) / 2 = 24.76 / 2 = 12.38 ft. Direction is positive (A to B rises).',
    difficulty: 'hard'
  },
  {
    domain: 'Field Data Acquisition',
    question: 'A level loop has 8 setups and a closure error of +0.08 ft. Using proportional adjustment, what correction is applied at setup 3?',
    options: ['-0.03 ft', '-0.01 ft', '+0.03 ft', '-0.08 ft'],
    correctAnswer: 0,
    explanation: 'Correction per setup = -error/n × setup number = -(+0.08)/8 × 3 = -0.01 × 3 = -0.03 ft. The correction is proportional to the number of setups and opposite in sign to the error.',
    difficulty: 'hard'
  },
  {
    domain: 'Field Data Acquisition',
    question: 'The curvature and refraction correction for a distance of 2 miles is (using C&R = 0.0675M² where M is in miles):',
    options: ['0.27 ft', '0.14 ft', '0.54 ft', '0.07 ft'],
    correctAnswer: 0,
    explanation: 'C&R = 0.0675 × M² = 0.0675 × 2² = 0.0675 × 4 = 0.27 ft. This correction accounts for Earth\'s curvature minus the offsetting effect of atmospheric refraction.',
    difficulty: 'hard'
  },
  {
    domain: 'Field Data Acquisition',
    question: 'Differential leveling rise-fall method: BS₁=4.52, FS₁=6.21, BS₂=8.33, FS₂=3.17. Starting elevation = 200.00 ft. What is the final elevation?',
    options: ['203.47 ft', '200.00 ft', '196.53 ft', '205.00 ft'],
    correctAnswer: 0,
    explanation: 'Rise/Fall for each: Setup 1: BS-FS = 4.52 - 6.21 = -1.69 (fall). Setup 2: BS-FS = 8.33 - 3.17 = +5.16 (rise). Net change = -1.69 + 5.16 = +3.47 ft. Final elevation = 200.00 + 3.47 = 203.47 ft.',
    difficulty: 'hard'
  },
  {
    domain: 'Field Data Acquisition',
    question: 'A trigonometric leveling shot: horizontal distance = 800 ft, vertical angle = +6° 15\'. Instrument height = 5.4 ft, rod reading = 6.0 ft. What is the elevation difference?',
    options: ['+86.92 ft', '+87.52 ft', '+80.00 ft', '+95.00 ft'],
    correctAnswer: 0,
    explanation: 'ΔElev = HD × tan(vertical angle) + HI - rod reading. ΔElev = 800 × tan(6°15\') + 5.4 - 6.0 = 800 × 0.10941 + (-0.6) = 87.53 - 0.6 = 86.93 ft ≈ 86.92 ft.',
    difficulty: 'hard'
  },
  {
    domain: 'Field Data Acquisition',
    question: 'A level circuit runs from BM 1 (elev 500.00) through 3 TPs to BM 2 (elev 512.45). The computed elevation of BM 2 is 512.33 ft. The total distance is 4.8 km. TP1 is at 1.2 km. What is the adjusted elevation of TP1?',
    options: ['503.15 ft (approx)', '503.00 ft', '504.00 ft', '502.50 ft'],
    correctAnswer: 0,
    explanation: 'Closure error = known - computed = 512.45 - 512.33 = +0.12 ft. Correction at TP1 = (distance to TP1 / total distance) × error = (1.2/4.8) × 0.12 = 0.25 × 0.12 = +0.03 ft. If the computed TP1 elevation was 503.12 ft, adjusted = 503.12 + 0.03 = 503.15 ft.',
    difficulty: 'hard'
  },
  {
    domain: 'Field Data Acquisition',
    question: 'Over a distance of 5,000 ft, what is the curvature correction alone (without refraction)? Use C = 0.0239F² where F is in thousands of feet.',
    options: ['0.60 ft', '0.30 ft', '1.20 ft', '0.12 ft'],
    correctAnswer: 0,
    explanation: 'C = 0.0239 × F² where F = 5.0 (thousands of feet). C = 0.0239 × 25.0 = 0.5975 ≈ 0.60 ft. Note: curvature alone is larger than the combined C&R because refraction partially offsets curvature.',
    difficulty: 'hard'
  },
  {
    domain: 'Field Data Acquisition',
    question: 'A three-wire leveling observation: top wire = 6.247, middle wire = 5.832, bottom wire = 5.418. What is the rod interval and the rod reading?',
    options: ['Interval = 0.829 ft, Reading = 5.832 ft', 'Interval = 0.415 ft, Reading = 5.832 ft', 'Interval = 0.829 ft, Reading = 6.247 ft', 'Interval = 1.658 ft, Reading = 5.832 ft'],
    correctAnswer: 0,
    explanation: 'Rod reading = middle wire = 5.832 ft. Rod interval = top - bottom = 6.247 - 5.418 = 0.829 ft. Check: average of top and bottom = (6.247 + 5.418)/2 = 5.8325 ≈ 5.832 (confirms middle wire). The interval is used for stadia distance: D = K × interval = 100 × 0.829 = 82.9 ft.',
    difficulty: 'hard'
  },
  {
    domain: 'Professional Practice',
    question: 'Under the 2026 ALTA/NSPS standards, Table A Item 15 allows features to be shown using imagery. Which of the following is NOT a requirement when using imagery on an ALTA/NSPS survey?',
    options: ['Agree with the client in writing on imagery source, date, and licensing', 'Discuss ramifications of imagery accuracy with insurer, lender, and client', 'Place a note on the plat explaining source, date, and precision of imagery', 'Obtain FAA approval for all drone flights used to capture imagery'],
    correctAnswer: 3,
    explanation: 'Table A Item 15 (2026) has three specific requirements: (1) agree with the client in writing on the imagery source, date/version, and licensing costs, (2) discuss the ramifications (accuracy, precision, completeness) with the insurer, lender, and client before the survey, and (3) place a note on the face of the survey explaining the source, date, precision, and other qualifications. FAA drone approvals may be separately required by law but are not part of the ALTA/NSPS standards themselves.',
    difficulty: 'medium'
  },
  {
    domain: 'Professional Practice',
    question: 'The 2026 ALTA/NSPS standards added a new requirement in Section 5.F regarding what type of feature?',
    options: ['Solar panel installations', 'Cemeteries and burial grounds', 'Stormwater detention facilities', 'Environmental monitoring wells'],
    correctAnswer: 1,
    explanation: 'Section 5.F of the 2026 ALTA/NSPS standards requires the surveyor to locate the perimeter of cemeteries and burial grounds, and the location of isolated gravesites not within a cemetery or burial ground, whether disclosed in documents provided to the surveyor or observed during fieldwork. This was not explicitly addressed in the 2021 standards.',
    difficulty: 'medium'
  },
  // Survey Computations & Applications — Spiral Curves
  {
    domain: 'Survey Computations & Applications',
    question: 'What is the formula for the spiral angle θs given spiral length Ls and degree of circular curve D?',
    options: ['θs = Ls / D', 'θs = Ls × D / 200', 'θs = D / (2 × Ls)', 'θs = 200 / (Ls × D)'],
    correctAnswer: 1,
    explanation: 'θs = Ls × D / 200 (degrees). This formula is derived from the arc definition of degree of curve. A spiral of 200 ft joined to a 1° curve has θs = 1°; doubling either Ls or D doubles θs.',
    difficulty: 'medium'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'A spiral curve of length Ls = 250 ft is used with a circular curve of D = 4°. What is the spiral angle θs?',
    options: ['2.50°', '5.00°', '1.00°', '10.00°'],
    correctAnswer: 1,
    explanation: 'θs = Ls × D / 200 = 250 × 4 / 200 = 1000 / 200 = 5.00°.',
    difficulty: 'easy'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'In a spiral-curve-spiral layout, which point marks the transition from the first spiral to the circular arc?',
    options: ['TS (Tangent to Spiral)', 'SC (Spiral to Curve)', 'CS (Curve to Spiral)', 'ST (Spiral to Tangent)'],
    correctAnswer: 1,
    explanation: 'The four key points in order along the alignment are: TS (start of first spiral), SC (end of first spiral / start of circular arc), CS (end of circular arc / start of second spiral), ST (end of second spiral). SC marks the transition from spiral to circular arc.',
    difficulty: 'easy'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'The "shift" (p) in a spiral curve layout refers to:',
    options: [
      'The spiral length divided by the radius',
      'The perpendicular offset of the shifted circular arc from the original tangent',
      'The along-tangent distance from the TS to the center of the spiral',
      'The difference between the long tangent and short tangent'
    ],
    correctAnswer: 1,
    explanation: 'The shift p is the perpendicular distance the circular arc is moved inward (toward the center of curvature) from the original tangent line to accommodate the spiral. p ≈ Ys – R(1 – cos θs). A larger spiral produces a larger shift.',
    difficulty: 'medium'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'The "throw" (k) in a spiral curve layout is measured:',
    options: [
      'Perpendicular to the tangent, from the TS to the SC',
      'Along the initial tangent, from the TS to the shifted circular arc center projection',
      'From the PI to the TS',
      'From the SC to the CS along the arc'
    ],
    correctAnswer: 1,
    explanation: 'The throw k is measured along the initial tangent direction from the TS to the point directly opposite the shifted circular arc center. k ≈ Xs – R sin(θs). Together with the shift p, it defines the position of the shifted circular arc.',
    difficulty: 'hard'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'The spiral tangent length Ts for a spiral-curve-spiral layout is measured from:',
    options: [
      'The TS to the SC',
      'The PI to the TS (or PI to the ST)',
      'The SC to the CS',
      'The TS to the midpoint of the circular arc'
    ],
    correctAnswer: 1,
    explanation: 'Ts is the distance from the PI (Point of Intersection) to either the TS or the ST. It replaces the simple tangent distance T used for a plain circular curve. The TS station is found by subtracting Ts from the PI station.',
    difficulty: 'medium'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'For a highway spiral curve, Xs represents:',
    options: [
      'The perpendicular offset from the tangent to the SC point',
      'The distance along the initial tangent from the TS to the SC projected point',
      'The spiral length',
      'The shift of the circular curve'
    ],
    correctAnswer: 1,
    explanation: 'Xs is the x-coordinate of the SC point measured along the initial tangent direction from the TS. For small spiral angles, Xs ≈ Ls (nearly equal to the full spiral length, since the curve is nearly straight). Xs is always slightly less than Ls.',
    difficulty: 'medium'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'For a highway spiral curve, Ys represents:',
    options: [
      'The distance along the initial tangent from the TS to the PI',
      'The perpendicular offset from the initial tangent to the SC point',
      'The spiral angle in radians',
      'The radius of the connecting circular curve'
    ],
    correctAnswer: 1,
    explanation: 'Ys is the y-coordinate of the SC point, measured perpendicular to the initial tangent direction from the TS. For small spiral angles, Ys ≈ Ls × θs / 3 (in radians). Ys represents how far the SC has been offset from the tangent line.',
    difficulty: 'medium'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'The length of the circular arc between the SC and CS points in a spiral-curve-spiral layout equals:',
    options: [
      'R × Δ × π/180',
      'R × (Δ – 2θs) × π/180',
      'R × θs × π/180',
      'Ls × (Δ – θs) / 100'
    ],
    correctAnswer: 1,
    explanation: 'The circular arc must subtend an angle of Δ – 2θs, since each of the two spirals already uses θs of the total deflection angle Δ. Arc = R × (Δ – 2θs) × π/180. If 2θs > Δ, the spirals overlap and a circular arc cannot be inserted.',
    difficulty: 'hard'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'Why is a spiral (transition) curve used instead of connecting a tangent directly to a circular curve?',
    options: [
      'Spiral curves are shorter than circular curves',
      'A spiral provides a gradual increase in curvature, allowing vehicles to smoothly roll into the circular arc while superelevation is applied',
      'Spiral curves have a constant radius throughout',
      'A spiral eliminates the need for a PI station'
    ],
    correctAnswer: 1,
    explanation: 'A circular curve has a sudden change from zero curvature (tangent) to constant curvature at the PC. A spiral curve starts at zero curvature at the TS and increases linearly to the full circular curve curvature at the SC, providing a smooth transition that improves driver comfort, vehicle stability, and allows superelevation (banking) to be applied gradually.',
    difficulty: 'easy'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'A spiral with Ls = 400 ft is connected to a D = 2° circular curve (R = 2864.79 ft). What is the spiral angle θs?',
    options: ['2.00°', '4.00°', '8.00°', '1.00°'],
    correctAnswer: 1,
    explanation: 'θs = Ls × D / 200 = 400 × 2 / 200 = 800 / 200 = 4.00°. Alternatively, θs (radians) = Ls / (2R) = 400 / (2 × 2864.79) = 400 / 5729.58 = 0.0698 rad = 4.00°.',
    difficulty: 'easy'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'The long tangent (LT) of a spiral curve is defined as:',
    options: [
      'The full length of the spiral arc',
      'The distance from the TS along the initial tangent to the foot of the perpendicular dropped from the SC to the tangent',
      'The distance from the PI to the TS',
      'The chord length from TS to SC'
    ],
    correctAnswer: 1,
    explanation: 'LT is the projection of the spiral chord onto the initial tangent line: LT = Xs – Ys / tan(θs). It is the longer of the two legs of the tangent-offset triangle used to stake the SC from the TS. The short tangent ST = Ys / sin(θs) is perpendicular to the chord.',
    difficulty: 'hard'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'In a spiral-curve-spiral layout with Δ = 30° and θs = 6°, what angle does the circular arc subtend?',
    options: ['30°', '24°', '18°', '36°'],
    correctAnswer: 2,
    explanation: 'The circular arc angle = Δ – 2θs = 30° – 2(6°) = 30° – 12° = 18°. Each spiral uses θs of the total deflection angle, so the remaining central angle for the circular arc is Δ – 2θs.',
    difficulty: 'medium'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'If the PI is at station 40+00.00 and the spiral tangent length Ts = 485.30 ft, what is the TS station?',
    options: ['Station 35+14.70', 'Station 44+85.30', 'Station 34+85.30', 'Station 45+14.70'],
    correctAnswer: 0,
    explanation: 'TS station = PI station – Ts = 4000.00 – 485.30 = 3514.70 ft = station 35+14.70. The TS is always located Ts feet before the PI along the incoming tangent.',
    difficulty: 'medium'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'A published spiral curve table for Ls = 200 ft, D = 4° shows: θs = 4°00\', Xs = 199.90 ft, Ys = 4.65 ft, p = 1.15 ft, k = 99.95 ft, R = 1432.39 ft. Using this table with a total deflection angle Δ = 40°00\', what is the spiral tangent length Ts?',
    options: ['621.73 ft', '521.78 ft', '419.48 ft', '742.16 ft'],
    correctAnswer: 0,
    explanation: 'From the spiral table: p = 1.15 ft, k = 99.95 ft. Ts = (R + p) × tan(Δ/2) + k = (1432.39 + 1.15) × tan(20°) + 99.95 = 1433.54 × 0.36397 + 99.95 = 521.78 + 99.95 = 621.73 ft. The spiral table supplies p and k directly, so you only need to plug them into the Ts formula along with R and Δ/2. Without spirals, the simple tangent T = R × tan(20°) = 1432.39 × 0.36397 = 521.27 ft — the spirals add about 100 ft to the tangent length.',
    difficulty: 'hard'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'A spiral curve table lists the following for Ls = 200 ft, D = 6° (R = 954.93 ft): θs = 6°00\', Xs = 199.45 ft, Ys = 6.98 ft. Using the short tangent formula ST = Ys / sin(θs), what is the short tangent?',
    options: ['66.75 ft', '116.60 ft', '6.98 ft', '33.37 ft'],
    correctAnswer: 0,
    explanation: 'ST = Ys / sin(θs) = 6.98 / sin(6°) = 6.98 / 0.10453 = 66.77 ft ≈ 66.75 ft. The short tangent ST and long tangent LT are found directly in published spiral tables or computed from tabulated Xs, Ys values. ST is always less than LT and both are used to stake the SC from the TS in the field.',
    difficulty: 'medium'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'For a spiral curve, which statement about the SC point is correct?',
    options: [
      'At the SC, the spiral curvature is zero',
      'At the SC, the curvature of the spiral equals the curvature of the connecting circular curve',
      'The SC is located at the PI',
      'At the SC, the spiral and circular arc have the same tangent direction as the original alignment'
    ],
    correctAnswer: 1,
    explanation: 'The defining property of a spiral is that curvature increases linearly from zero at the TS to the full circular curve curvature at the SC. At the SC point, the spiral curvature exactly matches 1/R (the circular curve curvature), ensuring a smooth, tangent connection between the spiral and the circular arc.',
    difficulty: 'medium'
  },

  // Construction Surveying & Land Development (Task #11)
  {
    domain: 'Surveying Principles',
    question: 'A leveling instrument has HI = 318.75 ft. The design grade elevation at a stake is 315.40 ft. What is the grade rod?',
    options: ['3.35 ft', '634.15 ft', '315.40 ft', '318.75 ft'],
    correctAnswer: 0,
    explanation: 'Grade Rod = HI − Grade Elevation = 318.75 − 315.40 = 3.35 ft. The grade rod is the rod reading that would be observed if the ground surface were exactly at design grade elevation.',
    difficulty: 'easy'
  },
  {
    domain: 'Surveying Principles',
    question: 'At a construction stake, the grade rod is 6.80 ft and the actual rod reading on the ground is 5.10 ft. What is the cut or fill?',
    options: ['Cut of 1.70 ft', 'Fill of 1.70 ft', 'Cut of 11.90 ft', 'Fill of 11.90 ft'],
    correctAnswer: 0,
    explanation: 'When the actual rod reading (5.10 ft) is LESS than the grade rod (6.80 ft), the ground is ABOVE the design grade — a CUT is needed. Cut = Grade Rod − Rod Reading = 6.80 − 5.10 = 1.70 ft.',
    difficulty: 'easy'
  },
  {
    domain: 'Surveying Principles',
    question: 'The actual rod reading at a construction stake is 9.20 ft and the grade rod is 7.60 ft. What is the situation at this stake?',
    options: ['Cut of 1.60 ft', 'Fill of 1.60 ft', 'Cut of 16.80 ft', 'The ground is exactly at grade'],
    correctAnswer: 1,
    explanation: 'When the actual rod reading (9.20 ft) is GREATER than the grade rod (7.60 ft), the ground is BELOW the design grade — FILL is needed. Fill = Rod Reading − Grade Rod = 9.20 − 7.60 = 1.60 ft.',
    difficulty: 'easy'
  },
  {
    domain: 'Surveying Principles',
    question: 'A backsight of 4.62 ft is taken on a benchmark with elevation 240.15 ft. The design grade at the next station is 242.80 ft. What is the grade rod?',
    options: ['1.97 ft', '2.47 ft', '7.24 ft', '238.15 ft'],
    correctAnswer: 0,
    explanation: 'HI = 240.15 + 4.62 = 244.77 ft. Grade Rod = HI − Grade Elevation = 244.77 − 242.80 = 1.97 ft.',
    difficulty: 'medium'
  },
  {
    domain: 'Surveying Principles',
    question: 'An offset stake is marked "C 2.15 / 15.0R / 8+75." What does this information indicate?',
    options: [
      'At station 8+75, set 15.0 ft to the right of centerline; the existing ground is 2.15 ft above design grade',
      'At station 8+75, set 15.0 ft to the right of centerline; 2.15 ft of fill is needed',
      'At station 8+75, cut 15.0 ft of material to reach a grade of 2.15 ft',
      'At station 8+75, the distance to the right of the centerline is cut 2.15 ft per 15 ft'
    ],
    correctAnswer: 0,
    explanation: '"C 2.15" means a CUT of 2.15 ft is needed (the ground is above design grade by 2.15 ft). "15.0R" means the stake is 15.0 ft to the right of centerline. "8+75" is the station (875 ft from the project beginning). The offset stake is set at a safe distance from the actual work area.',
    difficulty: 'medium'
  },
  {
    domain: 'Surveying Principles',
    question: 'In blue-top staking, the HI is 504.20 ft and the design pad elevation is 500.00 ft. A rod placed on top of a stake reads 4.25 ft. What should the surveyor do to make the stake a true blue-top?',
    options: [
      'The stake is correct — drive it no further',
      'Drive the stake deeper by 0.05 ft until the rod reads 4.20 ft',
      'Raise the stake by 0.05 ft until the rod reads 4.20 ft',
      'Drive the stake deeper until the rod reads 4.25 ft'
    ],
    correctAnswer: 2,
    explanation: 'Grade Rod = HI − Grade Elevation = 504.20 − 500.00 = 4.20 ft. The rod reading on top of the stake is 4.25 ft, which is larger than 4.20 ft. Stake top elevation = HI − rod reading = 504.20 − 4.25 = 499.95 ft. Since 499.95 ft is below the design grade of 500.00 ft, the stake top must be RAISED by 0.05 ft until the rod reads 4.20 ft.',
    difficulty: 'hard'
  },
  {
    domain: 'Surveying Principles',
    question: 'A road has a half-width of 20 ft and a fill slope of 2:1 (H:V). The design fill at centerline is 3.00 ft. What is the approximate offset from centerline to the fill slope stake?',
    options: ['23.00 ft', '26.00 ft', '40.00 ft', '14.00 ft'],
    correctAnswer: 1,
    explanation: 'For a fill slope: Offset = Half-Width + Slope Ratio × Fill Depth = 20 + 2 × 3.00 = 20 + 6 = 26.00 ft from centerline. This is the horizontal distance from centerline to the point where the constructed fill slope meets the existing ground.',
    difficulty: 'medium'
  },
  {
    domain: 'Surveying Principles',
    question: 'Which of the following best describes an as-built survey?',
    options: [
      'A survey performed before construction begins to establish control',
      'A survey that documents the actual locations and elevations of constructed improvements after construction',
      'A survey that establishes design grades for earthwork operations',
      'A survey that identifies existing utilities before excavation'
    ],
    correctAnswer: 1,
    explanation: 'An as-built survey (also called a record survey) documents the actual, constructed locations and elevations of improvements, which may differ from the design plans. It is performed after construction and is used by agencies, engineers, and owners to verify compliance and maintain a permanent record.',
    difficulty: 'easy'
  },
  {
    domain: 'Surveying Principles',
    question: 'In the subdivision platting process, what is the correct sequence of steps?',
    options: [
      'Final plat → Preliminary plat → Conceptual plan → Recording',
      'Conceptual plan → Preliminary plat → Final plat → Recording',
      'Recording → Final plat → Preliminary plat → Conceptual plan',
      'Preliminary plat → Final plat → Conceptual plan → Recording'
    ],
    correctAnswer: 1,
    explanation: 'The standard platting sequence moves from general to specific: Conceptual/Sketch Plan (rough layout, initial feedback) → Preliminary Plat (detailed drawing for agency review) → Final Plat (field-accurate document, signed and sealed by surveyor) → Recording (filed in public land records to create legal lot boundaries).',
    difficulty: 'easy'
  },
  {
    domain: 'Surveying Principles',
    question: 'A subdivision plat includes the note: "All streets are hereby dedicated to the public." After the municipality accepts the plat, what is the legal status of the street right-of-way land?',
    options: [
      'The developer retains fee title; the public has only an easement',
      'The municipality holds fee title to the right-of-way',
      'Adjacent lot owners hold title to the centerline of each street',
      'The homeowners association holds title in trust for the public'
    ],
    correctAnswer: 1,
    explanation: 'A plat dedication, when accepted by the governmental entity, transfers fee simple title of the dedicated area to the municipality. This is different from an easement, where the grantor keeps fee title. Once dedicated and accepted, the city or county owns the street right-of-way outright.',
    difficulty: 'medium'
  },
  {
    domain: 'Surveying Principles',
    question: 'A lot-and-block legal description reads: "Lot 22, Block 5, Sunrise Estates Addition, as recorded in Vol. 18, Pg. 44, Plat Records, Harris County, Texas." What document contains the actual dimensions of Lot 22?',
    options: [
      'The general warranty deed conveying Lot 22',
      'The recorded subdivision plat at Vol. 18, Pg. 44',
      'The county tax records',
      'The zoning ordinance for the area'
    ],
    correctAnswer: 1,
    explanation: 'A lot-and-block description conveys the parcel by reference to the recorded plat. The actual boundary dimensions, angles, and bearings are shown on the recorded plat itself (in this case, at Volume 18, Page 44 of the Plat Records). The deed simply references the plat; it does not repeat the survey data.',
    difficulty: 'easy'
  },
  {
    domain: 'Surveying Principles',
    question: 'A rectangular lot is 75 ft wide and 110 ft deep. Zoning requires a 20 ft front setback, a 10 ft rear setback, and 5 ft side setbacks on each side. What is the maximum building footprint area allowed?',
    options: ['4,250 sq ft', '5,200 sq ft', '3,900 sq ft', '8,250 sq ft'],
    correctAnswer: 1,
    explanation: 'Buildable width = 75 − 5 − 5 = 65 ft. Buildable depth = 110 − 20 − 10 = 80 ft. Maximum building footprint = 65 × 80 = 5,200 sq ft. The setbacks reduce the usable building envelope from all four sides.',
    difficulty: 'medium'
  },
  {
    domain: 'Surveying Principles',
    question: 'In a recorded subdivision, a 10-foot utility easement runs along the rear lot line of Lot 7. What right does the utility company have within this strip?',
    options: [
      'Fee title to the 10-foot strip',
      'The right to install, maintain, and access utilities; the lot owner retains fee title',
      'No right to cross the strip without owner permission each time',
      'The right to build any structure needed to support the utilities'
    ],
    correctAnswer: 1,
    explanation: 'A utility easement grants only the right to use the land for the specified purpose (installing and maintaining utilities). The property owner retains fee simple title to the land within the easement. The owner cannot build structures that interfere with the easement, but the utility company does not own the land.',
    difficulty: 'medium'
  },
  {
    domain: 'Surveying Principles',
    question: 'Which of the following is the BEST description of slope staking in construction surveying?',
    options: [
      'Setting stakes at the finished grade elevation across a paved area',
      'Marking the intersection of the designed cut or fill slope with the existing natural ground',
      'Setting offset stakes parallel to the centerline for structure layout',
      'Documenting existing ground elevations before earthwork begins'
    ],
    correctAnswer: 1,
    explanation: 'Slope stakes mark the point where the designed construction slope (cut or fill) intersects the existing natural ground surface. They define the outer limit of earthwork and guide equipment operators. Finding the slope intercept requires an iterative field process because the intersection depends on the existing ground elevation at each trial point.',
    difficulty: 'medium'
  },
  {
    domain: 'Surveying Principles',
    question: 'A construction surveyor sets hub stakes flush with the ground next to lath stakes. What is the purpose of the hub stake?',
    options: [
      'To display the cut/fill and station information for the equipment operator to read',
      'To serve as a precise elevation reference point for grade control',
      'To mark the outside edge of the pavement subgrade',
      'To replace a lost benchmark when none is available'
    ],
    correctAnswer: 1,
    explanation: 'Hub stakes are driven flush with or slightly below the ground surface and serve as precise elevation reference points. The adjacent lath stake (a thin wooden stake or flagging) displays the readable information (station, offset, cut/fill amount). This two-part system protects the precise hub from being read incorrectly while keeping station data visible.',
    difficulty: 'medium'
  },

  {
    domain: 'Professional Practice',
    question: 'Under the 2026 ALTA/NSPS standards, what new requirement applies to utility locate markings observed during fieldwork?',
    options: ['The surveyor must verify ownership of all marked utilities', 'The source of the markings must be noted, with a note if unknown', 'All locate markings must be photographed and attached to the plat', 'The surveyor must contact 811 before every survey'],
    correctAnswer: 1,
    explanation: 'The 2026 standards emphasize throughout Sections 5.E.ii, 5.E.iii, and 5.E.iv that utility locate markings must include the source of the markings, with a note if the source is unknown. This is a new emphasis in the 2026 standards, responding to industry concerns about undocumented utility markings on survey sites.',
    difficulty: 'medium'
  },
  {
    domain: 'Professional Practice',
    question: 'Under the 2026 ALTA/NSPS standards, Table A Item 20 requires the surveyor to:',
    options: ['Provide an electronic CAD file of the survey', 'Prepare a summary table of encroachments and conditions on the plat', 'Locate improvements on easement areas', 'Carry professional liability insurance'],
    correctAnswer: 1,
    explanation: 'Table A Item 20 (new in 2026) requires a structured encroachment summary table on the face of the plat identifying: potential encroachments over boundary lines, encroachments into rights of way and easements, encroachments into setback lines, physical access between parcels without easement documentation, and use of adjoining parcels without easement documentation. The table must provide a means to readily locate each condition on the plat.',
    difficulty: 'medium'
  },
  {
    domain: 'Professional Practice',
    question: 'The 2026 ALTA/NSPS standards require which of the following new items on the face of the plat or map?',
    options: ['GPS coordinates of all property corners', 'A note identifying the source of the title commitment and its effective date', 'The assessed tax value of the property', 'A topographic survey of the entire parcel'],
    correctAnswer: 1,
    explanation: 'Section 6.B.xii of the 2026 standards adds a new requirement for a note on the face of the plat identifying the source of the title commitment or other title evidence provided pursuant to Section 4, the effective date, and the name of the insurer. This was not required in the 2021 standards and helps document the title information relied upon by the surveyor.',
    difficulty: 'easy'
  },

  // Least Squares & Positional Accuracy (Task #12)
  {
    domain: 'Applied Mathematics & Statistics',
    question: 'What is the primary purpose of least squares adjustment in surveying?',
    options: [
      'To eliminate all measurement errors before data is used',
      'To find the statistically optimal (most probable) solution when redundant observations are present',
      'To average repeated measurements of the same quantity',
      'To correct for systematic errors caused by instrument calibration'
    ],
    correctAnswer: 1,
    explanation: 'Least squares adjustment finds the most probable values of unknown quantities when more observations than strictly necessary are collected (redundant observations). It minimizes the weighted sum of squared residuals, giving a statistically optimal solution and providing statistical information about the quality of the result.',
    difficulty: 'easy'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    question: 'A survey network has 10 observations and 7 unknowns. What is the redundancy (degrees of freedom)?',
    options: ['17', '10', '7', '3'],
    correctAnswer: 3,
    explanation: 'Redundancy (r) = n − u = 10 − 7 = 3. Here n = number of observations and u = number of unknowns. The redundancy tells you how many "extra" observations you have beyond the minimum needed, and equals the degrees of freedom used in statistical testing.',
    difficulty: 'easy'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    question: 'In a least squares adjustment, what does a residual represent?',
    options: [
      'The total error remaining in the survey after adjustment',
      'The correction applied to an observation: adjusted value minus observed value',
      'The difference between two repeated measurements',
      'The systematic error component of an observation'
    ],
    correctAnswer: 1,
    explanation: 'A residual (v) is the correction applied to a specific observation: v = adjusted value − observed value. Residuals represent our best estimate of the random error in each measurement after adjustment. The sum of all squared weighted residuals (vᵀPv) is minimized in least squares.',
    difficulty: 'easy'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    question: 'After a least squares adjustment, the standard error of unit weight (σ₀) is computed as 3.85. What does this most likely indicate?',
    options: [
      'The adjustment is excellent — σ₀ should be as large as possible',
      'The a priori observation standard deviations were overestimated',
      'There are larger errors than expected — possibly a blunder or underestimated measurement uncertainties',
      'The network has insufficient redundancy to complete the adjustment'
    ],
    correctAnswer: 2,
    explanation: 'The target value of σ₀ is 1.0. A value of 3.85 is much greater than 1.0, indicating that the actual residuals are much larger than the assumed observation uncertainties. This could mean: a blunder exists in the data, the measurement standard deviations were underestimated, or the network geometry is poor.',
    difficulty: 'medium'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    question: 'A leveling network has 8 observations and 5 unknowns. The weighted sum of squared residuals (vᵀPv) is 6.00. What is the standard error of unit weight?',
    options: ['0.94', '1.41', '1.26', '2.00'],
    correctAnswer: 1,
    explanation: 'r = n − u = 8 − 5 = 3. σ₀ = √(vᵀPv / r) = √(6.00 / 3) = √2.00 = 1.414 ≈ 1.41. A value of 1.41 is somewhat greater than 1.0, indicating the residuals are slightly larger than the assumed measurement uncertainties, but this is not alarming. If the chi-squared test were applied, this result would likely fall within the acceptance region.',
    difficulty: 'medium'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    question: 'In least squares, observation weights are most appropriately assigned based on which principle?',
    options: [
      'Longer distances should always receive higher weight',
      'Weight is inversely proportional to the variance (square of standard deviation) of each observation',
      'All observations should receive equal weight to avoid bias',
      'More recent observations always receive higher weight than older ones'
    ],
    correctAnswer: 1,
    explanation: 'The weight of an observation is inversely proportional to its variance: p = σ₀² / σᵢ², where σ₀ is the reference standard deviation and σᵢ is the standard deviation of the specific observation. A more precise observation (smaller σᵢ) receives higher weight and will have a smaller residual in the adjusted solution.',
    difficulty: 'medium'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    question: 'What does a positional error ellipse represent for a survey monument computed by least squares adjustment?',
    options: [
      'The maximum allowed displacement of the monument from its true position',
      'The two-dimensional region within which the true position lies at a specified confidence level',
      'The area of land that could be affected if the monument were set in error',
      'The instrument pointing error at the time of observation'
    ],
    correctAnswer: 1,
    explanation: 'An error ellipse describes the two-dimensional uncertainty of a computed position. It is centered on the adjusted position, and the true position has a specified probability (typically 95%) of lying within the ellipse. The shape (semi-major and semi-minor axes) and orientation describe how the uncertainty varies with direction — elongated ellipses indicate poor constraint in one direction.',
    difficulty: 'medium'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    question: 'Two monuments are 800 ft apart. The ALTA/NSPS relative positional precision tolerance is 2 cm + 50 ppm × D. Converting to feet (2 cm ≈ 0.07 ft), what is the allowable RPP for this pair?',
    options: ['0.07 ft', '0.11 ft', '0.10 ft', '0.14 ft'],
    correctAnswer: 1,
    explanation: 'RPP tolerance = 0.07 ft + 50 × 10⁻⁶ × 800 ft = 0.07 + 0.040 = 0.110 ft ≈ 0.11 ft. The 50 ppm component = 0.000050 × 800 = 0.040 ft. The total tolerance increases with distance, reflecting the proportionally larger uncertainty expected over longer baselines.',
    difficulty: 'medium'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    question: 'The chi-squared test in a least squares adjustment is used to:',
    options: [
      'Determine the number of observations needed for a given accuracy',
      'Test whether the adjustment fits the data consistently with the assumed error model',
      'Convert between different coordinate systems',
      'Compute the azimuth of the error ellipse orientation'
    ],
    correctAnswer: 1,
    explanation: 'The chi-squared test compares the weighted sum of squared residuals (vᵀPv) to a theoretical chi-squared distribution with (n−u) degrees of freedom. If the test statistic falls within the acceptance region, the adjustment is statistically consistent with the assumed observation variances. A failing test suggests blunders or incorrectly assumed error magnitudes.',
    difficulty: 'medium'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    question: 'What is the minimum number of redundant observations (redundancy) required for any statistical testing to be possible in a least squares adjustment?',
    options: ['0', '1', '3', '5'],
    correctAnswer: 1,
    explanation: 'At least 1 degree of freedom (redundancy = 1) is required for any statistical testing. With redundancy = 0, the system is exactly determined — there are no residuals and no basis for quality assessment. With redundancy ≥ 1, the standard error of unit weight can be computed and the chi-squared test applied. More redundancy improves the power of statistical testing.',
    difficulty: 'easy'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    question: 'In a weighted least squares adjustment, which observation will have the SMALLEST residual after adjustment?',
    options: [
      'The observation with the largest measured value',
      'The observation with the highest weight (smallest standard deviation)',
      'The observation measured most recently',
      'The observation with the longest distance'
    ],
    correctAnswer: 1,
    explanation: 'In weighted least squares, high-weight observations (those measured with high precision — small standard deviation) will receive smaller residuals because the solution is "pulled toward" the precise observations. Low-weight observations (imprecise measurements) receive larger residuals. This mathematically ensures that imprecise measurements are corrected more than precise ones.',
    difficulty: 'medium'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    question: 'What term describes the overall quality indicator computed after a least squares adjustment that compares actual residuals to the assumed measurement uncertainties?',
    options: [
      'Relative Positional Precision',
      'Standard error of unit weight',
      'Root Mean Square Error',
      'Coefficient of variation'
    ],
    correctAnswer: 1,
    explanation: 'The standard error of unit weight (σ₀ or S₀) is the key overall quality indicator. It equals √(vᵀPv / r) and should be near 1.0 when the adjustment fits the data according to the assumed observation standard deviations. Values much greater than 1.0 suggest data quality problems; values much less than 1.0 suggest overly pessimistic a priori standard deviations.',
    difficulty: 'easy'
  },

  // LiDAR, Remote Sensing & Graphical Communication (Task #13)
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'LiDAR is classified as which type of remote sensing system?',
    options: [
      'Passive — it records reflected sunlight in the visible and infrared spectrum',
      'Active — it emits its own laser pulses and measures the time of flight',
      'Passive — it detects thermal energy emitted by the ground surface',
      'Active — it records radar echoes from a separate transmitter on the ground'
    ],
    correctAnswer: 1,
    explanation: 'LiDAR (Light Detection And Ranging) is an active remote sensing system because it generates its own energy source — laser pulses — and measures the time it takes for the pulse to return after reflecting off a surface. Passive sensors (aerial cameras, multispectral imagers) only detect energy from external sources such as the sun.',
    difficulty: 'easy'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'A LiDAR-derived Digital Elevation Model (DEM) is created using which point classification?',
    options: [
      'All returns (first and last combined)',
      'First returns only, representing the top of vegetation and structures',
      'Ground-classified returns only (ASPRS Class 2)',
      'Last returns only, regardless of surface type'
    ],
    correctAnswer: 2,
    explanation: 'A DEM represents the bare-earth surface and uses only ground-classified returns (ASPRS Class 2). Vegetation, buildings, bridges, and other above-ground features are removed through ground filtering algorithms. A Digital Surface Model (DSM) uses first returns and includes all surfaces — buildings, tree canopy, etc.',
    difficulty: 'easy'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'What is the difference between a Digital Surface Model (DSM) and a Digital Elevation Model (DEM)?',
    options: [
      'DSM uses only last returns; DEM uses only first returns',
      'DSM represents all surface features including buildings and trees; DEM represents the bare-earth surface only',
      'DSM is produced by photogrammetry; DEM is produced only by LiDAR',
      'DSM shows elevations above sea level; DEM shows elevations above the WGS84 ellipsoid'
    ],
    correctAnswer: 1,
    explanation: 'A DSM (Digital Surface Model) represents the top surface of all features — including buildings, vegetation, and structures — typically using first returns. A DEM (Digital Elevation Model) represents the bare-earth surface only, using ground-classified returns after removing above-ground objects. The difference (nDSM = DSM − DEM) shows the heights of objects above the ground.',
    difficulty: 'easy'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'Which of the following is an example of a PASSIVE remote sensing system?',
    options: [
      'Airborne LiDAR scanning system',
      'RADAR (Synthetic Aperture Radar)',
      'Multispectral aerial camera recording reflected sunlight',
      'Acoustic SONAR used in hydrographic surveying'
    ],
    correctAnswer: 2,
    explanation: 'Passive remote sensing systems detect energy from external sources — primarily reflected sunlight. A multispectral camera records reflected solar energy in visible and near-infrared bands. Active systems (LiDAR, RADAR, SONAR) generate their own energy and measure the returned signal. Knowing active vs. passive is a common FS exam question.',
    difficulty: 'easy'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'What does the ASPRS LiDAR classification code "Class 6" represent?',
    options: [
      'Ground (bare earth)',
      'High vegetation (trees)',
      'Buildings',
      'Water'
    ],
    correctAnswer: 2,
    explanation: 'The ASPRS (American Society for Photogrammetry and Remote Sensing) standard LiDAR classification codes include: Class 2 = Ground, Class 3 = Low Vegetation, Class 4 = Medium Vegetation, Class 5 = High Vegetation, Class 6 = Buildings, Class 9 = Water. These codes are used to filter and analyze different feature types from the raw point cloud.',
    difficulty: 'medium'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'A survey drawing is printed at 1:2,000 and then reduced to 75% of its original size on a photocopier. Which map element remains accurate after the reduction?',
    options: [
      'The RF 1:2,000 stated in the title block',
      'The verbal scale "1 inch = 166.7 feet" printed in the margin',
      'The graphic scale bar drawn on the face of the map',
      'The coordinate values printed at the sheet corners'
    ],
    correctAnswer: 2,
    explanation: 'A graphic scale bar is drawn on the map and reduces proportionally with the drawing. Since both the map features and the bar shrink at the same ratio, the bar remains accurate regardless of print size. The RF, verbal scale, and absolute coordinate values are not affected by the drawing\'s physical size, but the RF and verbal scale become incorrect references for measuring distances on the reduced print.',
    difficulty: 'medium'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'A survey plat shows a north arrow labeled "Grid North — Texas State Plane (NAD 83)." What does this indicate?',
    options: [
      'The north arrow points to magnetic north, adjusted for declination',
      'The north arrow shows the direction of the State Plane grid north, which may differ from true astronomic north by the convergence angle',
      'The north arrow shows true astronomic north based on solar observations',
      'Grid north and true north are always identical in Texas'
    ],
    correctAnswer: 1,
    explanation: 'Grid north is the direction of the north-south grid lines in a State Plane Coordinate System. It differs from true (astronomic) north by the convergence angle, which varies depending on the survey\'s location within the State Plane zone. On large-scale surveys, the difference can be significant. A north arrow labeled "Grid North" specifically indicates the map is oriented to the State Plane grid, not to astronomic meridian.',
    difficulty: 'medium'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'In LiDAR acquisition, what is the purpose of the IMU (Inertial Measurement Unit) carried with the sensor?',
    options: [
      'To increase the pulse repetition rate of the laser',
      'To record the precise position and orientation (roll, pitch, yaw) of the sensor at each laser pulse',
      'To filter ground returns from vegetation returns in real time',
      'To provide atomic clock timing for GPS signals'
    ],
    correctAnswer: 1,
    explanation: 'The IMU continuously records the aircraft\'s attitude — roll, pitch, and yaw — at very high frequency (typically 200 Hz or more). Combined with the GNSS-determined position, the IMU data allows precise calculation of the 3D direction of each laser pulse. Without the IMU, aircraft tilt and vibration would make it impossible to accurately compute the 3D position of each laser return on the ground.',
    difficulty: 'medium'
  },

  {
    domain: 'Mapping, GIS, and CAD',
    question: 'In LiDAR data acquisition, what do "first return" and "last return" represent?',
    options: [
      'First return = the first flight line; last return = the final flight line',
      'First return = the earliest reflection of a pulse (top of canopy or structure); last return = the final reflection (often the ground or lower canopy)',
      'First return = highest intensity reflection; last return = lowest intensity reflection',
      'First and last returns are identical — modern systems only record one return per pulse'
    ],
    correctAnswer: 1,
    explanation: 'When a LiDAR pulse passes through vegetation, it may generate multiple returns as it reflects off different surfaces at different heights. The first return is the first reflection received — usually from the top of the canopy or roof of a building. The last return is the final reflection — often from the ground or lower canopy. Ground filtering uses last returns, and the DSM uses first returns. Modern systems can record 4 or more returns per pulse.',
    difficulty: 'easy'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'A legend (key) on a survey drawing serves which primary purpose?',
    options: [
      'It states the horizontal datum used for all coordinate values',
      'It lists the names of crew members who performed the fieldwork',
      'It explains all symbols, line types, and hatch patterns used on the drawing so the reader can correctly interpret every graphic element',
      'It provides the legal certification of the professional surveyor'
    ],
    correctAnswer: 2,
    explanation: 'The legend (or key) is an essential map element that decodes every graphical convention used on the drawing — monument symbols, line types (existing vs. proposed, easement lines, right-of-way lines), hatch patterns, and color codes. Without a legend, a map reader cannot reliably interpret symbols that are not universally standardized. The datum reference, certification, and crew information are separate components of the title block or notes.',
    difficulty: 'easy'
  },
  // Additional LiDAR, Remote Sensing & Graphical Communication Quiz Questions (Task #13)
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'What is the minimum required point density (points per square meter) for USGS Quality Level 2 (QL2) LiDAR data?',
    options: [
      '1 pt/m²',
      '2 pts/m²',
      '8 pts/m²',
      '0.5 pts/m²'
    ],
    correctAnswer: 1,
    explanation: 'USGS Quality Level 2 (QL2) requires a minimum nominal pulse density of 2 points per square meter (pts/m²). QL3 requires at least 1 pt/m², and QL1 requires at least 8 pts/m². Higher density improves the ability to detect smaller features and produce more accurate bare-earth DEMs, especially in vegetated terrain.',
    difficulty: 'medium'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'Which LiDAR boresight calibration procedure corrects for misalignment between the laser scanner and the IMU reference frame?',
    options: [
      'Flying repeatedly over ground control points and adjusting the GNSS solution',
      'Flying over flat surfaces in multiple directions to detect and remove systematic swath-to-swath offsets',
      'Reclassifying all point returns from Class 0 to Class 2',
      'Adjusting the pulse repetition rate to achieve uniform point density'
    ],
    correctAnswer: 1,
    explanation: 'Boresight calibration corrects the angular misalignment (roll, pitch, and yaw offsets) between the laser scanner and the IMU coordinate frame. By flying over flat, well-defined surfaces (such as airport runways or buildings) in multiple directions, systematic elevation differences between overlapping swaths reveal the boresight error. The calibration parameters are then applied to all raw data.',
    difficulty: 'hard'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'In an airborne LiDAR system, what is the role of the GNSS receiver?',
    options: [
      'To determine the precise 3D position of the aircraft at each laser pulse',
      'To measure the roll, pitch, and yaw of the aircraft',
      'To count the number of laser returns per scan line',
      'To control the laser pulse repetition rate'
    ],
    correctAnswer: 0,
    explanation: 'The GNSS receiver determines the precise 3D position (X, Y, Z) of the aircraft at each moment. Combined with IMU data (which records attitude — roll, pitch, yaw), the system can calculate the exact 3D position of every laser return on the ground. The GNSS provides position; the IMU provides orientation. Both are required to geolocate individual LiDAR returns.',
    difficulty: 'easy'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'What map element must be labeled to indicate whether a north arrow shows True North, Grid North, or Magnetic North?',
    options: [
      'The title block',
      'The legend',
      'The north arrow itself (with an explicit label)',
      'A separate datum reference note'
    ],
    correctAnswer: 2,
    explanation: 'The north arrow must be explicitly labeled to show which type of north it represents: True (Astronomic) North, Grid North (State Plane), or Magnetic North. Without a label, the map reader cannot know the reference meridian. On ALTA/NSPS surveys, the type of north and basis of bearing must be shown. A map showing "magnetic north" without a date and declination value provides incomplete information.',
    difficulty: 'easy'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'A survey plat must include a "basis of bearings" statement. What information does this typically provide?',
    options: [
      'The name of the licensed surveyor who performed the survey',
      'The reference line or meridian used to establish the bearing system for all survey lines',
      'The horizontal and vertical datums used for coordinates and elevations',
      'The closure ratio achieved for the boundary traverse'
    ],
    correctAnswer: 1,
    explanation: 'The basis of bearings statement identifies the reference meridian (e.g., "bearings are based on the NAD83 State Plane Grid North for Zone X," or "bearings are referenced to the bearing of record between found monuments A and B") used to orient all bearing calls on the plat. Without this, bearings on a survey cannot be reproduced or compared with other surveys. It is a required element on most state standards and ALTA/NSPS surveys.',
    difficulty: 'medium'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'The GIS concept of "topology" in a vector dataset refers to:',
    options: [
      'The projection or coordinate system used for the dataset',
      'The spatial relationships between features (adjacency, connectivity, containment)',
      'The accuracy of individual feature positions',
      'The number of vertices per feature'
    ],
    correctAnswer: 1,
    explanation: 'Topology in GIS defines the spatial relationships between geographic features — such as which polygons share a boundary, which lines connect at nodes (connectivity), and which points fall within which polygons (containment). A topologically correct dataset ensures that polygons do not overlap where they should share boundaries, and that all line segments form connected networks. Topology is distinct from positional accuracy or projection.',
    difficulty: 'medium'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'Which ground control point (GCP) procedure provides the most rigorous LiDAR vertical accuracy assessment?',
    options: [
      'Using the same GCPs for both boresight calibration and accuracy assessment',
      'Using check points surveyed independently from GCPs, in open terrain free of vegetation',
      'Comparing LiDAR elevations to USGS topographic map contours',
      'Visual inspection of point cloud density in the project area'
    ],
    correctAnswer: 1,
    explanation: 'Rigorous accuracy assessment requires independent check points that were NOT used in the boresight calibration or any data adjustment. These check points must be surveyed to higher accuracy than the required LiDAR product accuracy (typically 2–3× better RMSEZ). They should be located in open, non-vegetated terrain where LiDAR ground returns are reliable. Using the same points for calibration and assessment creates circular validation.',
    difficulty: 'medium'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'On a topographic map, contour lines that form a V shape pointing uphill (toward higher elevations) most likely indicate which terrain feature?',
    options: [
      'A ridge line (high ground between two valleys)',
      'A stream valley or drainage channel (water flows in the direction the V points)',
      'A depression shown with hachure marks',
      'Steep terrain with a uniform slope'
    ],
    correctAnswer: 1,
    explanation: 'Contour lines form a V that points uphill (toward higher elevations) when they cross a stream valley or drainage channel. Water flows in the direction the V points — downhill, opposite to the direction the V tip aims. By contrast, ridges produce V-shaped contours that point downhill. Depressions are shown by closed contour loops with hachure marks (tick marks pointing inward). Steep slopes produce closely-spaced contours but do not necessarily form a V pattern.',
    difficulty: 'easy'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'On a 1:12,000 scale topographic map, a surveyor measures 2.5 inches between two control points. What is the ground distance between those points?',
    options: [
      '30,000 ft',
      '2,500 ft',
      '2.78 miles',
      '416.7 ft'
    ],
    correctAnswer: 1,
    explanation: 'Ground distance = map measurement × scale denominator = 2.5 in × 12,000 = 30,000 in. Convert to feet: 30,000 ÷ 12 = 2,500 ft. The procedure is straightforward: multiply the map distance by the scale denominator to get the ground distance in the same units, then convert as needed. A 1:12,000 scale means one unit on the map represents 12,000 of the same units on the ground.',
    difficulty: 'medium'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'NSSDA defines horizontal accuracy of geospatial data at which confidence level?',
    options: [
      '50% (median)',
      '68% (one standard deviation)',
      '90%',
      '95%'
    ],
    correctAnswer: 3,
    explanation: 'The National Standard for Spatial Data Accuracy (NSSDA) defines and reports horizontal accuracy at the 95% confidence level. The horizontal accuracy value equals 1.7308 × RMSEr (the radial root mean square error). Vertical accuracy is also reported at 95% as 1.9600 × RMSEZ. This 95% confidence reporting allows geospatial products from different sources to be compared on a common basis.',
    difficulty: 'medium'
  },

  // Additional Mapping/GIS/CAD quiz questions — explicit topic coverage (Task #13 further supplemental)
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'In a LiDAR survey over a forested area, which return type is primarily used to produce a bare-earth Digital Elevation Model (DEM)?',
    options: [
      'First returns, because they are reflected from the tallest surfaces',
      'Last returns, because they most often represent the ground surface beneath the canopy',
      'Intermediate returns, because they capture mid-canopy vegetation structure',
      'All returns equally, because they are averaged together'
    ],
    correctAnswer: 1,
    explanation: 'Last (or final) returns penetrate furthest through gaps in the vegetation canopy and most frequently reflect off the ground surface. Ground-filtering algorithms classify these last returns as Class 2 (Ground) per ASPRS standards, and the resulting bare-earth surface is the Digital Elevation Model (DEM). First returns produce the Digital Surface Model (DSM), which includes vegetation tops and building rooftops.',
    difficulty: 'easy'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'A surveyor reads a note on a construction plan set: "Grid bearing from Control Point A to Control Point B: N 45°30\'00\" E, Grid distance: 1,234.56 ft." To use this distance in a field survey with a total station, which conversion must be applied?',
    options: [
      'Multiply by the combined scale factor to convert from grid distance to ground distance',
      'Divide by the ellipsoid height to convert to sea-level distance',
      'No conversion needed — grid and ground distances are always identical',
      'Multiply by the geoid undulation'
    ],
    correctAnswer: 0,
    explanation: 'State Plane coordinates use grid distances, which differ from ground (geodetic) distances by the combined scale factor (CSF = map scale factor × elevation factor). To convert from grid distance to ground distance: Ground distance = Grid distance ÷ CSF (or × inverse CSF). For most projects, the CSF is close to 1.0, but in mountainous or low-elevation areas it can differ significantly. Reading a plan set requires recognizing whether distances are ground or grid.',
    difficulty: 'medium'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'On a USGS topographic map, a feature shown with a blue dashed line typically represents:',
    options: [
      'An intermittent stream (flows only part of the year)',
      'A perennial stream (flows year-round)',
      'A county or municipal boundary',
      'An underground drainage culvert'
    ],
    correctAnswer: 0,
    explanation: 'On USGS topographic maps, water features use blue as the standard color. A solid blue line represents a perennial stream (flows year-round). A blue dashed or dotted line represents an intermittent stream (flows only seasonally, during wet periods). Boundaries are shown in different colors (black or red for political boundaries). These USGS planimetric symbol conventions are standardized for national mapping.',
    difficulty: 'easy'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'A surveyor is establishing ground control for an aerial LiDAR survey. The project specification requires QL2 accuracy with RMSEZ ≤ 10 cm. At what accuracy level must the ground check points be surveyed?',
    options: [
      'At the same RMSEZ tolerance as the product (≤ 10 cm)',
      'To a higher accuracy, typically 2–3 times better than the required product accuracy (RMSEZ ≤ 3–5 cm)',
      'GPS check points have no accuracy requirement — any GNSS receiver is acceptable',
      'At a lower accuracy — the check points only need to be within ±0.5 m'
    ],
    correctAnswer: 1,
    explanation: 'Ground check points must be surveyed to significantly higher accuracy than the required LiDAR product. Industry practice (ASPRS and USGS 3DEP guidelines) requires check points to be 2–3 times more accurate than the specified product RMSEZ. For QL2 with RMSEZ ≤ 10 cm, check points should typically be ≤ 3–5 cm RMSEZ. Otherwise, the check points themselves introduce more uncertainty than they detect in the LiDAR data.',
    difficulty: 'medium'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'A Digital Terrain Model (DTM) differs from a Digital Surface Model (DSM) in which fundamental way?',
    options: [
      'A DTM is always in raster format, while a DSM is stored as a point cloud',
      'A DTM represents bare-earth ground elevation with vegetation and structures removed; a DSM represents the top surface of all features including trees and buildings',
      'A DTM uses the WGS84 datum, while a DSM uses NAVD88',
      'A DTM covers terrain, while a DSM covers only urban areas with dense structures'
    ],
    correctAnswer: 1,
    explanation: 'A DTM (Digital Terrain Model) or bare-earth DEM represents the natural ground surface after removing all above-ground features — buildings, trees, bridges, and other structures. It is produced from LiDAR Class 2 (Ground) returns. A DSM (Digital Surface Model) represents the top of all surfaces, including vegetation canopies and building rooftops, using primarily first returns. The normalized DSM (nDSM = DSM − DTM) gives the height of features above the ground. Both can be stored as raster grids.',
    difficulty: 'easy'
  },

  // Basic Sciences, Dendrology & Historical Methods (Task #14)
  {
    domain: 'Math & Basic Science',
    question: 'A GLO surveyor\'s original field notes describe a witness tree as "B. Walnut, 12 in dia, bears S 25 W, 50 lks." What does "lks" represent, and what is that distance in feet?',
    options: [
      'Links; 50 lks = 33.0 ft',
      'Links; 50 lks = 50.0 ft',
      'Links; 50 lks = 3.30 ft',
      'Leagues; 50 lks = 138.0 ft'
    ],
    correctAnswer: 0,
    explanation: 'In Gunter\'s chain measurement, 1 link = 0.66 ft (one-hundredth of a 66-ft chain). Therefore, 50 links = 50 × 0.66 = 33.0 ft. Gunter\'s chain (66 ft, 100 links) was the standard measuring instrument used in GLO surveys. One chain = 66 ft; 80 chains = 1 mile.',
    difficulty: 'medium'
  },
  {
    domain: 'Math & Basic Science',
    question: 'Which of the following is the correct equivalent relationship for a Gunter\'s chain?',
    options: [
      '1 chain = 100 ft; 10 square chains = 1 acre',
      '1 chain = 66 ft; 10 square chains = 1 acre',
      '1 chain = 66 ft; 640 square chains = 1 acre',
      '1 chain = 100 ft; 640 chains = 1 mile'
    ],
    correctAnswer: 1,
    explanation: 'Gunter\'s chain: 1 chain = 66 ft = 4 rods = 100 links. Area relationships: 10 square chains = 1 acre, so 1 acre = 10 × 66² / 43,560 = 43,560 sq ft / 43,560 = 1 acre. Also: 80 chains = 1 mile; 640 acres = 1 square mile (1 section). The 10-square-chains-per-acre relationship made area calculation easy with Gunter\'s chains.',
    difficulty: 'medium'
  },
  {
    domain: 'Math & Basic Science',
    question: 'An EDM measurement is taken when the air temperature is 10°C higher than standard and the pressure is at standard. What is the approximate effect on the measured distance if no atmospheric correction is applied?',
    options: [
      'The measurement is approximately 10 ppm too long',
      'The measurement is approximately 10 ppm too short',
      'Temperature has no effect on EDM measurements',
      'The measurement is exactly correct — only pressure affects EDM'
    ],
    correctAnswer: 1,
    explanation: 'Higher temperature decreases air density and reduces the refractive index of air. A lower refractive index means electromagnetic waves travel faster, so the EDM computes a shorter travel time for a given physical distance. The result is a measured distance that is approximately 1 ppm too short per 1°C above standard temperature. At 10°C above standard, the measurement is approximately 10 ppm (0.01 ft per 1,000 ft) too short without correction.',
    difficulty: 'medium'
  },
  {
    domain: 'Math & Basic Science',
    question: 'In the USCS soil classification system, which soil type presents the greatest compressibility and poorest suitability for foundation support?',
    options: [
      'GW — well-graded gravel',
      'SW — well-graded sand',
      'Pt — peat (highly organic)',
      'CL — clay of low plasticity'
    ],
    correctAnswer: 2,
    explanation: 'Peat (USCS symbol Pt) is highly organic and extremely compressible, making it completely unsuitable for foundation support or structural fill. It must be removed and replaced in construction. Well-graded gravel (GW) and sand (SW) are good foundation soils when properly compacted. Clay of low plasticity (CL) has moderate compressibility but can be used for fill with proper compaction control.',
    difficulty: 'easy'
  },
  {
    domain: 'Math & Basic Science',
    question: 'A witness tree in GLO records is described as "W. Oak, bears N 60 E, 35 lks." A retracing surveyor finds a white oak at that location. What procedure restores the original corner?',
    options: [
      'The oak tree IS the corner — set the monument at the tree\'s center',
      'Measure N 60 E, 35 links (23.1 ft) from the witness tree to establish the corner location',
      'Measure S 60 W, 35 links (23.1 ft) from the witness tree to establish the corner location',
      'Proportionate measurement must be used; witness trees cannot restore corners'
    ],
    correctAnswer: 2,
    explanation: 'The recorded bearing (N 60 E, 35 lks) is from the CORNER to the witness tree. To reverse-calculate the corner from the tree, apply the reverse bearing: S 60 W. Distance = 35 links × 0.66 ft/link = 23.1 ft. Measure S 60 W, 23.1 ft from the witness tree to establish the original corner location. This is the obliterated corner restoration procedure using a bearing tree.',
    difficulty: 'hard'
  },
  {
    domain: 'Math & Basic Science',
    question: 'For leveling over long distances, why is balancing backsight and foresight lengths important?',
    options: [
      'Balanced sights ensure both rod readings are taken at the same time',
      'Balanced sights eliminate the effects of curvature and refraction as well as instrument collimation error',
      'Balanced sights prevent the rod from tilting due to wind',
      'Balanced sights reduce the number of instrument setups required'
    ],
    correctAnswer: 1,
    explanation: 'When backsight and foresight distances are equal, the combined curvature and refraction error (which depends on distance squared) cancels out because it affects the BS and FS rod readings equally. Similarly, if the instrument\'s line of sight is not perfectly horizontal (collimation error), equal BS and FS distances cause equal errors in opposite directions, which also cancel. This is why differential leveling specifications require balanced sights.',
    difficulty: 'medium'
  },

  {
    domain: 'Math & Basic Science',
    question: 'Which historical surveying instrument used the sun\'s position to establish a true astronomic meridian — independent of magnetic north?',
    options: [
      'Gunter\'s chain',
      'A solar transit (solar compass) or solar observation with a theodolite',
      'A magnetic dipping needle compass',
      'A vernier caliper'
    ],
    correctAnswer: 1,
    explanation: 'A solar transit (Burt\'s solar compass) or a solar observation performed with a theodolite establishes true astronomic north by observing the sun\'s position and computing its azimuth from astronomical tables. This method is independent of local magnetic attraction and secular variation in declination. GLO surveyors used solar observations at regular intervals to establish reliable meridians; the magnetic compass was used between solar shots but was prone to local errors.',
    difficulty: 'easy'
  },
  {
    domain: 'Math & Basic Science',
    question: 'During earthwork operations, 1,000 BCY of clay is excavated and placed as embankment fill. If the swell factor is 1.30 (LCY/BCY) and the compaction factor is 0.85 (CCY/BCY), how many compacted cubic yards (CCY) will the excavated material produce?',
    options: [
      '1,300 CCY',
      '850 CCY',
      '1,105 CCY',
      '769 CCY'
    ],
    correctAnswer: 1,
    explanation: 'Compacted cubic yards = BCY × compaction factor = 1,000 × 0.85 = 850 CCY. The swell factor (1.30) describes how much the soil expands when excavated (loose state), but the final compacted volume is determined by the compaction factor relative to bank measure. BCY × 0.85 = 850 CCY. The swell factor is used to estimate truck loads for hauling, not the final compacted volume.',
    difficulty: 'medium'
  },

  // Business Concepts, Safety & Professional Communication (Task #15)
  {
    domain: 'Professional Practice',
    question: 'A surveyor agrees to perform a boundary survey for a fixed fee of $2,500. During the survey, unexpected archival research reveals the project will take significantly more time than anticipated. What is the most appropriate course of action?',
    options: [
      'Complete the survey at the agreed price — the fixed fee contract covers all necessary work',
      'Abandon the project without notice if the additional cost is too large',
      'Contact the client immediately, explain the situation, and negotiate a written change order for the additional scope',
      'Perform minimal work and deliver incomplete results to stay within budget'
    ],
    correctAnswer: 2,
    explanation: 'When unforeseen conditions materially expand the scope of a fixed-fee engagement, the surveyor should promptly notify the client, explain the situation, and negotiate a written change order before incurring additional costs. Delivering incomplete work or abandoning the project without notice are unprofessional and may create legal liability. Open, honest communication is both ethical and good business practice.',
    difficulty: 'medium'
  },
  {
    domain: 'Professional Practice',
    question: 'Survey crews working in the right-of-way of a 65 mph highway must wear which minimum ANSI/ISEA safety vest classification per MUTCD guidelines?',
    options: [
      'Class 1 — any orange or yellow vest',
      'Class 2 — required for all roadway work',
      'Class 3 — required for high-speed highway environments',
      'No vest required if crew stays outside travel lanes'
    ],
    correctAnswer: 2,
    explanation: 'MUTCD and OSHA require ANSI/ISEA Class 3 high-visibility garments for workers in roadway environments where vehicle speeds exceed 50 mph. Class 3 has more retroreflective striping and a higher background material area than Class 2, providing maximum conspicuity at highway speeds. On 65 mph roads, Class 3 is mandatory regardless of distance from travel lanes.',
    difficulty: 'medium'
  },
  {
    domain: 'Professional Practice',
    question: 'Which of the following fee arrangements places the greatest cost risk on the SURVEYOR?',
    options: [
      'Hourly rate (time and materials)',
      'Fixed fee (lump sum)',
      'Cost plus fixed fee',
      'Unit price per deliverable'
    ],
    correctAnswer: 1,
    explanation: 'A fixed fee (lump sum) agreement sets a predetermined total cost. If the actual work costs more than estimated, the surveyor absorbs the loss. This arrangement rewards efficiency — if the work costs less, the surveyor profits — but the surveyor bears the risk of cost overruns. In hourly rate or cost-plus arrangements, actual costs are passed to the client, so the client bears cost risk.',
    difficulty: 'medium'
  },
  {
    domain: 'Professional Practice',
    question: 'An excavation on a construction site is 6 feet deep and contains unstable soil. Under OSHA regulations, what protective system is required before workers may enter?',
    options: [
      'No protection required for excavations under 10 feet',
      'A competent person must inspect the excavation but no protective system is required',
      'Shoring, shielding, or sloping must be provided for excavations deeper than 5 feet in unstable material',
      'Workers may enter only if wearing hard hats and safety vests'
    ],
    correctAnswer: 2,
    explanation: 'OSHA 29 CFR 1926, Subpart P requires a protective system (shoring, shielding such as a trench box, or sloping) for any excavation 5 feet or deeper when the soil is unstable, or for any excavation 20 feet or deeper regardless of soil type. A 6-foot excavation in unstable soil exceeds the 5-foot threshold, so a protective system is mandatory before workers may enter.',
    difficulty: 'medium'
  },
  {
    domain: 'Professional Practice',
    question: 'The statute of limitations for surveying malpractice claims in most jurisdictions begins running when:',
    options: [
      'The survey fieldwork is completed',
      'The final plat is recorded in the county deed records',
      'The alleged error is discovered or should reasonably have been discovered (discovery rule)',
      'The contract between the surveyor and client is terminated'
    ],
    correctAnswer: 2,
    explanation: 'Most states apply the "discovery rule" to professional liability claims, meaning the statute of limitations begins when the claimant discovers the error, or when a reasonable person should have discovered it — not when the work was performed. For buried survey errors (such as a mislocated boundary that is only found during a later sale), this can expose surveyors to claims many years after the original work was done.',
    difficulty: 'medium'
  },
  {
    domain: 'Professional Practice',
    question: 'Which of the following best describes the "standard of care" in a professional negligence claim against a surveyor?',
    options: [
      'The highest possible accuracy achievable with modern equipment',
      'The level of skill and diligence that a reasonably competent surveyor would exercise under similar circumstances',
      'Strict adherence to the specifications stated in the original contract',
      'The opinion of the client about whether the work met their expectations'
    ],
    correctAnswer: 1,
    explanation: 'The standard of care is not perfection, nor is it based solely on contract specifications or client satisfaction. It is defined as the skill, knowledge, and diligence that a reasonably competent professional would exercise under similar circumstances. Courts evaluate whether the surveyor\'s conduct measured up to what a peer professional would have done — not whether the result was perfect or even whether the client was satisfied.',
    difficulty: 'medium'
  },
  {
    domain: 'Professional Practice',
    question: 'Which OSHA document governs temporary traffic control (TTC) for survey crews working in highway rights-of-way?',
    options: [
      'OSHA 29 CFR Part 1910 — General Industry Standards',
      'MUTCD Part 6 — Temporary Traffic Control',
      'AASHTO Policy on Geometric Design of Highways and Streets',
      'FHWA Standard Plans for Construction of Local Roads'
    ],
    correctAnswer: 1,
    explanation: 'The MUTCD (Manual on Uniform Traffic Control Devices), Part 6, governs Temporary Traffic Control (TTC) zones, including work zone setups for survey crews in highway rights-of-way. It specifies advance warning sign placement, channelizing device sequences, flagger positioning, and required personal protective equipment (including Class 3 vests for high-speed roads). OSHA references the MUTCD for roadway work zone safety compliance.',
    difficulty: 'easy'
  },
  {
    domain: 'Professional Practice',
    question: 'A surveying firm\'s professional liability (E&O) insurance policy has a retroactive date of January 1, 2020. A claim is filed in 2026 for a survey performed in 2019. Is the claim covered?',
    options: [
      'Yes — E&O policies always cover any claim filed while the policy is active',
      'No — the work was performed before the retroactive date, so the claim is excluded',
      'Yes, but only if the client can prove the surveyor acted with gross negligence',
      'Coverage depends on whether the error was discovered before or after the policy was purchased'
    ],
    correctAnswer: 1,
    explanation: 'Claims-made E&O policies cover claims made during the policy period only for work performed on or after the retroactive date. Because the survey was performed in 2019, before the January 1, 2020 retroactive date, that claim is NOT covered by this policy. To ensure coverage for past work, surveyors should maintain continuous E&O coverage without gaps and obtain prior acts coverage or tail coverage when switching insurers.',
    difficulty: 'hard'
  },
  {
    domain: 'Professional Practice',
    question: 'A surveyor switches E&O insurance companies and obtains a new claims-made policy but does NOT purchase tail coverage from the prior insurer. Which risk does this create?',
    options: [
      'No risk — the new policy covers all past work once issued',
      'Claims filed after the prior policy expired for work done during the prior coverage period may be uninsured',
      'The state licensing board will automatically suspend the surveyor\'s license',
      'The new insurer must honor prior acts as a condition of new policy issuance'
    ],
    correctAnswer: 1,
    explanation: 'A claims-made policy covers claims made during the policy period, for work performed after the retroactive date. If the prior policy lapses and no tail coverage (extended reporting endorsement) is purchased, any claim filed after the lapse for work done during the prior period is NOT covered by either policy. Tail coverage extends the reporting period of the prior policy and fills this gap. This is a critical risk management issue for surveying firms switching insurers.',
    difficulty: 'medium'
  },
  {
    domain: 'Professional Practice',
    question: 'A land surveyor licensed in State A performs a boundary survey on property that straddles the border between State A and State B. The surveyor is NOT licensed in State B. What should the surveyor do?',
    options: [
      'Complete the entire survey — a single license is sufficient for boundary surveys near state lines',
      'Associate with or refer the State B portion to a surveyor licensed in State B',
      'Apply for an emergency temporary license from State B after completing the fieldwork',
      'Contact the client and recommend they retain two separate surveyors with no coordination'
    ],
    correctAnswer: 1,
    explanation: 'Surveyors must hold a valid license in each state where they practice. Performing surveying work in State B without a State B license constitutes unlicensed practice, which is a violation of state law and professional ethics. The appropriate approach is to associate with a State B-licensed surveyor or refer the State B portion to a licensed professional, ensuring proper coordination between the two surveyors for boundary work straddling the state line.',
    difficulty: 'medium'
  },
  {
    domain: 'Math & Basic Science',
    question: 'Magnetic declination changes slowly over time due to gradual shifts in the Earth\'s magnetic field. This long-term, slow change is called:',
    options: [
      'Local attraction',
      'Magnetic anomaly',
      'Secular variation',
      'Dip angle'
    ],
    correctAnswer: 2,
    explanation: 'Secular variation is the slow, long-term change in magnetic declination caused by gradual shifts in the Earth\'s magnetic field over years and decades. When retracing historical compass surveys, surveyors must determine the declination at the time of the original survey and compare it to the current declination. Local attraction is a short-range deflection from nearby metallic objects or geological features. Dip angle is the inclination of the compass needle from horizontal.',
    difficulty: 'easy'
  },
  {
    domain: 'Math & Basic Science',
    question: 'A GLO original survey was performed in 1850 when the magnetic declination was 4°00\' E. Modern measurements show the current declination at the same location is 2°00\' W. What is the total secular change in declination?',
    options: [
      '2°00\' total change',
      '4°00\' total change',
      '6°00\' total change',
      '8°00\' total change'
    ],
    correctAnswer: 2,
    explanation: 'Total change = difference between old and new declination. Old: 4°00\' E (positive). New: 2°00\' W (negative). Total change = 4°00\' + 2°00\' = 6°00\'. The declination shifted from 4° east of true north to 2° west of true north, a total swing of 6°. When retracing a historical compass survey, bearing corrections must account for this full change to convert original compass bearings to their equivalent true bearings.',
    difficulty: 'medium'
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [...FS_QUIZ_QUESTIONS, ...PS_QUIZ_QUESTIONS];
