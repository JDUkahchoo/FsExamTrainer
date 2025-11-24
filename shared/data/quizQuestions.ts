export interface QuizQuestion {
  domain: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
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
    question: 'The exterior angle of a closed traverse equals:',
    options: ['(n+2) × 180°', '(n-2) × 180°', 'n × 360°', '(n+2) × 360°'],
    correctAnswer: 0,
    explanation: 'Sum of exterior angles = (n+2) × 180°, where n is the number of sides.',
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

  // EXPANDED POOL: Now ~117 questions total
  // This provides excellent variety for 50-question random quizzes with comprehensive domain coverage
  // Further expansion to ~350 questions can be done incrementally as needed
];
