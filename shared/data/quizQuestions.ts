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

  // EXPANDED POOL: Now ~200+ questions total
  // Coverage: All 8 NCEES domains with SRM Topics 2, 3, 4, 5 content
  // Includes word problems and practical applications
];
