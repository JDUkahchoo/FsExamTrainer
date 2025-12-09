export interface ExamQuestion {
  domain: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export const EXAM_QUESTIONS: ExamQuestion[] = [
  // Math & Basic Science - Easy
  {
    domain: 'Math & Basic Science',
    question: 'Convert 2.5 miles to feet.',
    options: ['13,200 ft', '12,500 ft', '15,840 ft', '10,560 ft'],
    correctAnswer: 0,
    explanation: '2.5 miles × 5,280 ft/mile = 13,200 ft. Always remember: 1 mile = 5,280 feet.',
    difficulty: 'easy'
  },
  {
    domain: 'Math & Basic Science',
    question: 'What is the area of a triangle with base 50 ft and height 30 ft?',
    options: ['750 sq ft', '1,500 sq ft', '800 sq ft', '1,000 sq ft'],
    correctAnswer: 0,
    explanation: 'Area = (1/2) × base × height = (1/2) × 50 × 30 = 750 sq ft.',
    difficulty: 'easy'
  },
  {
    domain: 'Math & Basic Science',
    question: 'How many square meters are in one hectare?',
    options: ['10,000 sq m', '1,000 sq m', '100,000 sq m', '5,000 sq m'],
    correctAnswer: 0,
    explanation: '1 hectare = 10,000 square meters. This is a common metric conversion in surveying.',
    difficulty: 'easy'
  },
  {
    domain: 'Math & Basic Science',
    question: 'What is 1 chain equal to in feet?',
    options: ['66 ft', '100 ft', '50 ft', '80 ft'],
    correctAnswer: 0,
    explanation: '1 chain = 66 feet = 100 links. This is fundamental in the Public Land Survey System.',
    difficulty: 'easy'
  },
  {
    domain: 'Math & Basic Science',
    question: 'A rectangular lot is 120 ft × 200 ft. What is its area in acres?',
    options: ['0.55 acres', '0.45 acres', '0.65 acres', '0.75 acres'],
    correctAnswer: 0,
    explanation: 'Area = 120 × 200 = 24,000 sq ft. Convert: 24,000 ÷ 43,560 = 0.55 acres.',
    difficulty: 'easy'
  },

  // Math & Basic Science - Medium
  {
    domain: 'Math & Basic Science',
    question: 'The probable error (PE) relates to standard deviation (σ) by what factor?',
    options: ['PE = 0.6745σ', 'PE = σ', 'PE = 2σ', 'PE = 0.5σ'],
    correctAnswer: 0,
    explanation: 'Probable Error = 0.6745 × standard deviation. This represents 50% confidence level.',
    difficulty: 'medium'
  },
  {
    domain: 'Math & Basic Science',
    question: 'If a slope is 5%, what is the horizontal distance for a 10 ft vertical rise?',
    options: ['200 ft', '150 ft', '250 ft', '100 ft'],
    correctAnswer: 0,
    explanation: '5% slope means 5 ft rise per 100 ft horizontal. For 10 ft rise: 10 ÷ 0.05 = 200 ft horizontal.',
    difficulty: 'medium'
  },
  {
    domain: 'Math & Basic Science',
    question: 'What is the sine of 30 degrees?',
    options: ['0.5', '0.707', '0.866', '0.577'],
    correctAnswer: 0,
    explanation: 'sin(30°) = 0.5. Common trigonometric values: sin(30°)=0.5, sin(45°)=0.707, sin(60°)=0.866.',
    difficulty: 'medium'
  },
  {
    domain: 'Math & Basic Science',
    question: 'Convert 45° to radians.',
    options: ['π/4', 'π/2', 'π/3', 'π/6'],
    correctAnswer: 0,
    explanation: 'Radians = degrees × (π/180). 45° × (π/180) = π/4 ≈ 0.785 radians.',
    difficulty: 'medium'
  },
  {
    domain: 'Math & Basic Science',
    question: 'Error of closure in a traverse is 0.15 ft with total perimeter of 1,500 ft. What is the relative precision?',
    options: ['1:10,000', '1:15,000', '1:5,000', '1:20,000'],
    correctAnswer: 0,
    explanation: 'Relative Precision = 1 / (perimeter / closure) = 1 / (1,500 / 0.15) = 1:10,000.',
    difficulty: 'medium'
  },

  // Math & Basic Science - Hard
  {
    domain: 'Math & Basic Science',
    question: 'The standard error of the mean for 16 measurements with σ = 0.08 ft is:',
    options: ['0.02 ft', '0.04 ft', '0.08 ft', '0.01 ft'],
    correctAnswer: 0,
    explanation: 'Standard Error of Mean = σ / √n = 0.08 / √16 = 0.08 / 4 = 0.02 ft.',
    difficulty: 'hard'
  },
  {
    domain: 'Math & Basic Science',
    question: 'What is the 90% confidence interval multiplier (k) for normal distribution?',
    options: ['1.645', '1.960', '2.576', '1.282'],
    correctAnswer: 0,
    explanation: '90% CI uses k = 1.645. Common values: 68% = 1σ, 95% = 1.96σ, 99% = 2.58σ, 90% = 1.645σ.',
    difficulty: 'hard'
  },
  {
    domain: 'Math & Basic Science',
    question: 'Propagation of random errors for a sum (A + B) where σ_A = 0.03 and σ_B = 0.04:',
    options: ['0.05', '0.07', '0.035', '0.05'],
    correctAnswer: 0,
    explanation: 'For sum/difference: σ_result = √(σ_A² + σ_B²) = √(0.03² + 0.04²) = √0.0025 = 0.05.',
    difficulty: 'hard'
  },
  {
    domain: 'Math & Basic Science',
    question: 'The area of a sector with radius 100 ft and central angle 60° is:',
    options: ['5,236 sq ft', '4,500 sq ft', '6,000 sq ft', '5,500 sq ft'],
    correctAnswer: 0,
    explanation: 'Area = (θ/360°) × πr² = (60/360) × π × 100² = (1/6) × 31,416 = 5,236 sq ft.',
    difficulty: 'hard'
  },
  {
    domain: 'Math & Basic Science',
    question: 'Chi-square test at 95% confidence with 5 degrees of freedom requires chi-square value of:',
    options: ['11.07', '9.49', '12.83', '15.09'],
    correctAnswer: 0,
    explanation: 'For 5 df at 95% confidence, critical chi-square = 11.07. Used for goodness-of-fit testing.',
    difficulty: 'hard'
  },

  // Field Data Acquisition - Easy
  {
    domain: 'Field Data Acquisition',
    question: 'What is the purpose of a benchmark (BM) in leveling?',
    options: ['Reference point with known elevation', 'Temporary turning point', 'Property corner marker', 'Angle measurement point'],
    correctAnswer: 0,
    explanation: 'A benchmark is a permanent reference point with a known, established elevation used as a starting point for leveling work.',
    difficulty: 'easy'
  },
  {
    domain: 'Field Data Acquisition',
    question: 'In a total station, what does "prism constant" refer to?',
    options: ['Offset distance from prism center to reflecting surface', 'Atmospheric correction factor', 'Battery voltage level', 'Angle precision setting'],
    correctAnswer: 0,
    explanation: 'Prism constant is the offset from the prism center to the actual reflecting surface, typically -30mm for survey prisms.',
    difficulty: 'easy'
  },
  {
    domain: 'Field Data Acquisition',
    question: 'EDM stands for:',
    options: ['Electronic Distance Measurement', 'Elevation Data Manager', 'Electronic Data Module', 'External Distance Meter'],
    correctAnswer: 0,
    explanation: 'EDM = Electronic Distance Measurement. Used in total stations to measure distances electronically.',
    difficulty: 'easy'
  },
  {
    domain: 'Field Data Acquisition',
    question: 'The most accurate method of differential leveling requires:',
    options: ['Equal backsight and foresight distances', 'Long backsights and short foresights', 'Short backsights and long foresights', 'Random sight distances'],
    correctAnswer: 0,
    explanation: 'Equal BS and FS distances minimize errors from curvature, refraction, and instrument collimation.',
    difficulty: 'easy'
  },
  {
    domain: 'Field Data Acquisition',
    question: 'A turning point (TP) in leveling is:',
    options: ['A temporary point to continue the level circuit', 'A permanent benchmark', 'The highest elevation point', 'The starting elevation'],
    correctAnswer: 0,
    explanation: 'A turning point is a temporary stable point used to transfer elevation when the rod must be moved forward.',
    difficulty: 'easy'
  },

  // Field Data Acquisition - Medium
  {
    domain: 'Field Data Acquisition',
    question: 'For a steel tape at 50°F (standardized at 68°F), coefficient of expansion 0.00000645/°F, measuring 200 ft:',
    options: ['-0.023 ft', '+0.023 ft', '-0.046 ft', '+0.046 ft'],
    correctAnswer: 0,
    explanation: 'Temp correction = (coef) × (T₂-T₁) × L = 0.00000645 × (50-68) × 200 = -0.023 ft. Tape is shorter, add correction.',
    difficulty: 'medium'
  },
  {
    domain: 'Field Data Acquisition',
    question: 'Sag correction for a 100 ft tape with 12 lbs tension and weight 2 lbs:',
    options: ['-0.014 ft', '+0.014 ft', '-0.028 ft', '+0.028 ft'],
    correctAnswer: 0,
    explanation: 'Sag = -W²L / (24P²) where W=weight, L=length, P=tension. Always negative (tape forms catenary).',
    difficulty: 'medium'
  },
  {
    domain: 'Field Data Acquisition',
    question: 'Reciprocal leveling is used to:',
    options: ['Eliminate collimation error across obstacles', 'Measure horizontal angles', 'Determine instrument height', 'Calculate area'],
    correctAnswer: 0,
    explanation: 'Reciprocal leveling eliminates collimation and refraction errors by reading from both ends of the line.',
    difficulty: 'medium'
  },
  {
    domain: 'Field Data Acquisition',
    question: 'The three-wire leveling method uses:',
    options: ['Top, middle, and bottom crosshairs', 'Three separate rod readings', 'Three different instruments', 'Three benchmark checks'],
    correctAnswer: 0,
    explanation: 'Three-wire method reads the top (stadia), middle (horizontal), and bottom (stadia) crosshairs to improve accuracy.',
    difficulty: 'medium'
  },
  {
    domain: 'Field Data Acquisition',
    question: 'What causes parallax in an optical instrument?',
    options: ['Crosshairs and image not in same focal plane', 'Temperature variation', 'Magnetic declination', 'Earth curvature'],
    correctAnswer: 0,
    explanation: 'Parallax occurs when the crosshairs and target image are not focused on the same plane. Eliminate by proper focusing.',
    difficulty: 'medium'
  },

  // Field Data Acquisition - Hard
  {
    domain: 'Field Data Acquisition',
    question: 'Combined correction for temperature (+30°F), tension (+5 lbs standard), and sag for 300 ft measurement is approximately:',
    options: ['Calculate each separately and sum algebraically', 'Use average of the three', 'Only apply largest correction', 'Ignore if under 1 ft total'],
    correctAnswer: 0,
    explanation: 'All systematic errors (temp, tension, sag) must be calculated individually and summed algebraically for total correction.',
    difficulty: 'hard'
  },
  {
    domain: 'Field Data Acquisition',
    question: 'Stadia interval factor (K) for most instruments is:',
    options: ['100', '50', '200', '150'],
    correctAnswer: 0,
    explanation: 'K = 100 for most surveying instruments. Horizontal Distance = K × Stadia Interval × cos²(zenith angle).',
    difficulty: 'hard'
  },
  {
    domain: 'Field Data Acquisition',
    question: 'The index error in a vertical angle is caused by:',
    options: ['Vertical circle not reading zero when level', 'Horizontal circle misalignment', 'EDM calibration drift', 'Atmospheric refraction'],
    correctAnswer: 0,
    explanation: 'Index error occurs when the vertical circle doesn\'t read 0° (or 90°) when the telescope is level. Correct by averaging FL and FR readings.',
    difficulty: 'hard'
  },
  {
    domain: 'Field Data Acquisition',
    question: 'PPM (parts per million) correction in EDM accounts for:',
    options: ['Atmospheric conditions (temp and pressure)', 'Instrument drift', 'Operator error', 'Magnetic interference'],
    correctAnswer: 0,
    explanation: 'PPM correction adjusts EDM measurements for atmospheric refraction caused by temperature and pressure variations.',
    difficulty: 'hard'
  },
  {
    domain: 'Field Data Acquisition',
    question: 'For precise leveling, the allowable misclosure (in feet) for a double-run level circuit is typically:',
    options: ['0.05√K (K in km)', '0.1√K', '0.02√M (M in miles)', '0.01√M'],
    correctAnswer: 0,
    explanation: 'First-order leveling: 0.05√K where K is distance in kilometers. Second-order: 0.07√K. Third-order: 0.1√K.',
    difficulty: 'hard'
  },

  // Plane Survey Computations - Easy
  {
    domain: 'Survey Computations & Applications',
    question: 'An azimuth of 270° is equivalent to what bearing?',
    options: ['Due West (N 90° W or S 90° W)', 'Due East', 'Due North', 'Due South'],
    correctAnswer: 0,
    explanation: 'Azimuth 270° points west. Bearing: Due West or N 90° W or S 90° W (all equivalent for cardinal direction).',
    difficulty: 'easy'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'The bearing S 30° E is equivalent to what back bearing?',
    options: ['N 30° W', 'N 30° E', 'S 30° W', 'S 60° W'],
    correctAnswer: 0,
    explanation: 'Back bearing reverses quadrant and keeps angle: S 30° E ↔ N 30° W (add/subtract 180° to azimuth).',
    difficulty: 'easy'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'In coordinate geometry, Latitude refers to:',
    options: ['North-South (Y) component', 'East-West (X) component', 'Elevation (Z) component', 'Angular position'],
    correctAnswer: 0,
    explanation: 'Latitude = North-South component (ΔY). Departure = East-West component (ΔX). Not geographic latitude/longitude.',
    difficulty: 'easy'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'A closed traverse should have sum of interior angles equal to:',
    options: ['(n-2) × 180°', 'n × 180°', '(n+2) × 180°', '360°'],
    correctAnswer: 0,
    explanation: 'For n-sided polygon: Σ interior angles = (n-2) × 180°. Example: pentagon (n=5) = 540°.',
    difficulty: 'easy'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'Departure (ΔX) is calculated as:',
    options: ['Distance × sin(azimuth)', 'Distance × cos(azimuth)', 'Distance × tan(azimuth)', 'Distance × sec(azimuth)'],
    correctAnswer: 0,
    explanation: 'Departure (ΔX) = Distance × sin(Az). Latitude (ΔY) = Distance × cos(Az). Remember: "Lat-Co, Dep-Sin".',
    difficulty: 'easy'
  },

  // Plane Survey Computations - Medium
  {
    domain: 'Survey Computations & Applications',
    question: 'Compass rule adjustment distributes error proportional to:',
    options: ['Length of each course', 'Latitude of each course', 'Departure of each course', 'Angle at each vertex'],
    correctAnswer: 0,
    explanation: 'Compass (Bowditch) rule: Correction ∝ course length / total perimeter. Assumes errors proportional to distance.',
    difficulty: 'medium'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'Area by coordinates (DMD method): If ΣN·Dep - ΣS·Dep = +12,000, area is:',
    options: ['6,000 sq ft', '12,000 sq ft', '24,000 sq ft', '3,000 sq ft'],
    correctAnswer: 0,
    explanation: 'Area = |ΣN·Dep - ΣS·Dep| / 2 = 12,000 / 2 = 6,000 sq ft. DMD = Double Meridian Distance method.',
    difficulty: 'medium'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'Degree of curve (D) for a 5° curve with 100 ft arc definition:',
    options: ['5°', '2.5°', '10°', '1.25°'],
    correctAnswer: 0,
    explanation: 'Arc definition: D = central angle for 100 ft arc. A 5° curve has 5° central angle per 100 ft of arc.',
    difficulty: 'medium'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'For a curve with R = 1,000 ft and D = 5°44\', the curve length for Δ = 28°40\' is:',
    options: ['500 ft', '400 ft', '600 ft', '450 ft'],
    correctAnswer: 0,
    explanation: 'L = (Δ/D) × 100 = (28°40\'/5°44\') × 100 ≈ 5 × 100 = 500 ft. Or L = RΔ (in radians).',
    difficulty: 'medium'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'Transit rule adjustment is preferred when:',
    options: ['Angles measured more precisely than distances', 'Distances measured more precisely than angles', 'All measurements equally precise', 'Traversing urban areas'],
    correctAnswer: 0,
    explanation: 'Transit rule: use when angles are more reliable. Compass rule: use when distances are more reliable.',
    difficulty: 'medium'
  },

  // Plane Survey Computations - Hard
  {
    domain: 'Survey Computations & Applications',
    question: 'Spiral curve length (Ls) for a 60 mph highway with R=1,200 ft and superelevation rate 0.06:',
    options: ['Use Ls = 3.15V³/(RC) formula', 'Ls = 100 ft minimum', 'Ls = R/2', 'No spiral needed'],
    correctAnswer: 0,
    explanation: 'Ls = 3.15V³/(RC) where V=speed, R=radius, C=rate of change. Spirals provide gradual transition.',
    difficulty: 'hard'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'For coordinate transformation (rotation), new coordinates X\',Y\' from X,Y with angle θ:',
    options: ['X\'=X·cosθ - Y·sinθ, Y\'=X·sinθ + Y·cosθ', 'X\'=X·sinθ + Y·cosθ, Y\'=X·cosθ - Y·sinθ', 'X\'=X+θ, Y\'=Y+θ', 'X\'=X/cosθ, Y\'=Y/sinθ'],
    correctAnswer: 0,
    explanation: 'Rotation matrix: X\' = X·cosθ - Y·sinθ, Y\' = X·sinθ + Y·cosθ. Used for coordinate system rotation.',
    difficulty: 'hard'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'External distance (E) for a curve with R=800 ft and Δ=40°:',
    options: ['57.4 ft', '50.0 ft', '65.2 ft', '42.8 ft'],
    correctAnswer: 0,
    explanation: 'E = R(1/cos(Δ/2) - 1) = 800(1/cos20° - 1) = 800(1.064 - 1) ≈ 51.2 ft. Or use E=R(sec(Δ/2)-1).',
    difficulty: 'hard'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'Three-point resection requires solving:',
    options: ['Non-linear simultaneous equations', 'Simple proportion', 'Linear regression', 'Chi-square test'],
    correctAnswer: 0,
    explanation: 'Three-point resection (Pothenot\'s problem) requires iterative solution of non-linear equations to find unknown position.',
    difficulty: 'hard'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'For a reverse curve, the total deflection angle is:',
    options: ['Δ₁ + Δ₂', 'Δ₁ - Δ₂', '|Δ₁ - Δ₂|', '(Δ₁ + Δ₂)/2'],
    correctAnswer: 0,
    explanation: 'Reverse curve: curves bend in opposite directions. Total deflection = Δ₁ + Δ₂ (both are additive).',
    difficulty: 'hard'
  },

  // Mapping, GIS, and CAD - Easy
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'Contour lines connect points of equal:',
    options: ['Elevation', 'Distance', 'Latitude', 'Longitude'],
    correctAnswer: 0,
    explanation: 'Contour lines (isolines) connect points of equal elevation on a topographic map.',
    difficulty: 'easy'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'Contour lines never:',
    options: ['Cross each other (except overhangs)', 'Form closed loops', 'Show valleys', 'Indicate ridges'],
    correctAnswer: 0,
    explanation: 'Contour lines never cross (each point has one elevation), except rare cases like overhanging cliffs.',
    difficulty: 'easy'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'In GIS, raster data is composed of:',
    options: ['Grid cells (pixels)', 'Vector points and lines', 'Text attributes', 'Survey monuments'],
    correctAnswer: 0,
    explanation: 'Raster = grid of cells/pixels (like aerial photos). Vector = points, lines, polygons (like property boundaries).',
    difficulty: 'easy'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'Scale 1:24,000 means 1 inch on map equals:',
    options: ['24,000 inches (2,000 ft) on ground', '24,000 feet on ground', '24,000 miles on ground', '24,000 meters on ground'],
    correctAnswer: 0,
    explanation: '1:24,000 scale means 1 map unit = 24,000 ground units. 1 inch map = 24,000 inches = 2,000 ft ground.',
    difficulty: 'easy'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'The most common USGS topographic map scale is:',
    options: ['1:24,000 (7.5-minute quad)', '1:12,000', '1:50,000', '1:100,000'],
    correctAnswer: 0,
    explanation: '1:24,000 scale (7.5-minute quadrangle) is the standard USGS topo map. 1 inch ≈ 2,000 feet.',
    difficulty: 'easy'
  },

  // Mapping, GIS, and CAD - Medium
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'Photogrammetry primarily uses:',
    options: ['Stereoscopic (overlapping) aerial photos', 'Single vertical photos', 'Satellite radar', 'Ground-based cameras only'],
    correctAnswer: 0,
    explanation: 'Photogrammetry uses overlapping aerial photos (typically 60% forward, 30% side) to create 3D stereo models.',
    difficulty: 'medium'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'Relief displacement on aerial photo causes tall objects to appear:',
    options: ['Leaning away from photo center (radially outward)', 'Leaning toward photo center', 'Perfectly vertical', 'Compressed'],
    correctAnswer: 0,
    explanation: 'Relief displacement: tall objects lean radially outward from photo principal point. Amount ∝ height and distance from center.',
    difficulty: 'medium'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'In a GIS, topology defines:',
    options: ['Spatial relationships between features', 'Color schemes for maps', 'Coordinate systems', 'File formats'],
    correctAnswer: 0,
    explanation: 'Topology defines spatial relationships: connectivity, adjacency, containment. Ensures data integrity (no gaps/overlaps).',
    difficulty: 'medium'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'DEM stands for:',
    options: ['Digital Elevation Model', 'Data Entry Module', 'Distance Elevation Measurement', 'Datum Estimation Method'],
    correctAnswer: 0,
    explanation: 'DEM = Digital Elevation Model. Raster grid of elevation values. Used for terrain analysis, contours, slopes.',
    difficulty: 'medium'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'Map projection distorts at least one of these properties:',
    options: ['Area, distance, direction, or shape', 'Color only', 'Text labels only', 'Coordinate values only'],
    correctAnswer: 0,
    explanation: 'No projection preserves all properties (Tissot\'s Indicatrix). Trade-offs: conformal (shape), equal-area, equidistant.',
    difficulty: 'medium'
  },

  // Mapping, GIS, and CAD - Hard
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'The UTM zone width at the equator is:',
    options: ['6° of longitude', '3° of longitude', '10° of longitude', '15° of longitude'],
    correctAnswer: 0,
    explanation: 'UTM (Universal Transverse Mercator) divides Earth into 6°-wide zones (numbered 1-60). Each uses Transverse Mercator projection.',
    difficulty: 'hard'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'Photo scale at elevation h above datum with camera focal length f and flying height H:',
    options: ['S = f / (H - h)', 'S = f / H', 'S = (H - h) / f', 'S = H / f'],
    correctAnswer: 0,
    explanation: 'Photo scale = f / (H - h) where f=focal length, H=flying height AGL, h=ground elevation. Scale varies with terrain.',
    difficulty: 'hard'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'State Plane Coordinate systems use which two projection types?',
    options: ['Transverse Mercator and Lambert Conformal Conic', 'UTM and Geographic', 'Albers and Sinusoidal', 'Mercator and Robinson'],
    correctAnswer: 0,
    explanation: 'SPC uses TM (for N-S states) and LCC (for E-W states). Designed for minimal distortion within each state/zone.',
    difficulty: 'hard'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'Orthophoto differs from aerial photo by:',
    options: ['Corrected for relief displacement and tilt', 'Taken at higher altitude only', 'Uses different camera only', 'Black and white only'],
    correctAnswer: 0,
    explanation: 'Orthophoto (orthophotograph) is corrected for terrain relief and camera tilt, giving uniform scale like a map.',
    difficulty: 'hard'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'LiDAR (Light Detection and Ranging) produces:',
    options: ['High-density 3D point clouds', '2D contour maps only', 'Property boundary vectors', 'Magnetic field data'],
    correctAnswer: 0,
    explanation: 'LiDAR uses laser pulses to create dense 3D point clouds. Can penetrate vegetation for bare-earth DEMs.',
    difficulty: 'hard'
  },

  // Boundary Law & PLSS - Easy
  {
    domain: 'Boundary Law & PLSS',
    question: 'In the PLSS, a township is:',
    options: ['6 miles × 6 miles', '1 mile × 1 mile', '12 miles × 12 miles', '24 miles × 24 miles'],
    correctAnswer: 0,
    explanation: 'Township = 6 mi × 6 mi = 36 sections. Each section = 1 mi × 1 mi = 640 acres.',
    difficulty: 'easy'
  },
  {
    domain: 'Boundary Law & PLSS',
    question: 'One section contains how many acres?',
    options: ['640 acres', '320 acres', '160 acres', '1,280 acres'],
    correctAnswer: 0,
    explanation: '1 section = 1 mi² = 640 acres. Quarter section = 160 acres. Half section = 320 acres.',
    difficulty: 'easy'
  },
  {
    domain: 'Boundary Law & PLSS',
    question: 'The phrase "calls for monuments control over courses and distances" means:',
    options: ['Physical markers take precedence over measurements', 'Measurements are more reliable than markers', 'Both are equally important', 'Neither is reliable'],
    correctAnswer: 0,
    explanation: 'Monument rule: found original monuments control the boundary, even if measurements differ from deed.',
    difficulty: 'easy'
  },
  {
    domain: 'Boundary Law & PLSS',
    question: 'Adverse possession requires all EXCEPT:',
    options: ['Written permission from owner', 'Open and notorious use', 'Continuous use for statutory period', 'Hostile (without permission)'],
    correctAnswer: 0,
    explanation: 'Adverse possession requires: open, notorious, continuous, exclusive, hostile use for statutory period. NOT with permission.',
    difficulty: 'easy'
  },
  {
    domain: 'Boundary Law & PLSS',
    question: 'In PLSS, which section number is in the NE corner of a township?',
    options: ['Section 1', 'Section 6', 'Section 36', 'Section 31'],
    correctAnswer: 0,
    explanation: 'Sections numbered starting at NE corner: Sec 1 (NE), then west to Sec 6, snake down to Sec 36 (SE corner).',
    difficulty: 'easy'
  },

  // Boundary Law & PLSS - Medium
  {
    domain: 'Boundary Law & PLSS',
    question: 'In the hierarchy of deed calls, which typically controls first?',
    options: ['Natural monuments', 'Artificial monuments', 'Courses and distances', 'Area (acreage)'],
    correctAnswer: 0,
    explanation: 'Hierarchy: 1) Natural monuments, 2) Artificial monuments, 3) Adjoining boundaries, 4) Courses/distances, 5) Area.',
    difficulty: 'medium'
  },
  {
    domain: 'Boundary Law & PLSS',
    question: 'A "meander line" in PLSS:',
    options: ['Approximates shoreline, not a boundary', 'Defines exact water boundary', 'Marks township lines only', 'Is a range line'],
    correctAnswer: 0,
    explanation: 'Meander lines approximate navigable water bodies for mapping/area calculation. Actual boundary is at the water.',
    difficulty: 'medium'
  },
  {
    domain: 'Boundary Law & PLSS',
    question: 'The doctrine of "riparian rights" applies to:',
    options: ['Watercourse boundaries', 'Mountain boundaries', 'Road boundaries', 'Railroad boundaries'],
    correctAnswer: 0,
    explanation: 'Riparian rights: property owner rights to water access/use along streams, rivers, lakes. Littoral = coastal waters.',
    difficulty: 'medium'
  },
  {
    domain: 'Boundary Law & PLSS',
    question: 'Accretion differs from avulsion by:',
    options: ['Gradual vs. sudden land addition', 'Water vs. land boundaries', 'Public vs. private land', 'Urban vs. rural areas'],
    correctAnswer: 0,
    explanation: 'Accretion = gradual deposit (boundary moves). Avulsion = sudden change (boundary stays). Reliction = water recedes.',
    difficulty: 'medium'
  },
  {
    domain: 'Boundary Law & PLSS',
    question: '"Senior rights" in boundary disputes refers to:',
    options: ['Earlier deed/patent prevails', 'Older surveyor prevails', 'Longer occupation prevails', 'Higher elevation prevails'],
    correctAnswer: 0,
    explanation: 'Senior rights: first in time, first in right. The original conveyance/patent takes precedence over later surveys.',
    difficulty: 'medium'
  },

  // Boundary Law & PLSS - Hard
  {
    domain: 'Boundary Law & PLSS',
    question: 'In PLSS original surveys, which corners were set first?',
    options: ['Township corners, then section corners', 'Section corners, then quarter corners', 'All corners simultaneously', 'Quarter corners first'],
    correctAnswer: 0,
    explanation: 'PLSS order: 1) Township exteriors, 2) Section lines, 3) Quarter section corners (later subdivision).',
    difficulty: 'hard'
  },
  {
    domain: 'Boundary Law & PLSS',
    question: 'The principle of "retracement vs. resurvey":',
    options: ['Retracement follows original, resurvey creates new', 'Both create new boundaries', 'Both follow original exactly', 'No legal difference'],
    correctAnswer: 0,
    explanation: 'Retracement: recover original survey. Resurvey: establish new boundaries (rare, requires authority). Usually retrace.',
    difficulty: 'hard'
  },
  {
    domain: 'Boundary Law & PLSS',
    question: 'Easement by prescription requires:',
    options: ['Open, continuous, adverse use for statutory period', 'Written agreement only', 'Recorded deed only', 'Verbal permission only'],
    correctAnswer: 0,
    explanation: 'Prescriptive easement: like adverse possession but for access rights. Requires open, continuous, hostile use.',
    difficulty: 'hard'
  },
  {
    domain: 'Boundary Law & PLSS',
    question: 'The "parol evidence rule" in boundary disputes:',
    options: ['Prevents contradicting written deed with oral testimony', 'Requires witness testimony', 'Invalidates old deeds', 'Applies to surveyors only'],
    correctAnswer: 0,
    explanation: 'Parol evidence rule: oral/extrinsic evidence cannot contradict clear written deed terms. Exceptions: ambiguity, fraud.',
    difficulty: 'hard'
  },
  {
    domain: 'Boundary Law & PLSS',
    question: 'A "lost corner" in PLSS is restored by:',
    options: ['Proportionate measurement from found corners', 'Arbitrary placement', 'GPS coordinates only', 'Oldest survey notes'],
    correctAnswer: 0,
    explanation: 'Lost corner restoration uses proportionate measurement (single/double proportion) from nearest found corners per BLM Manual.',
    difficulty: 'hard'
  },

  // Geodesy, GPS, Astronomy - Easy
  {
    domain: 'Applied Mathematics & Statistics',
    question: 'GPS stands for:',
    options: ['Global Positioning System', 'Geodetic Positioning Service', 'Ground Position Sensor', 'Geometric Position System'],
    correctAnswer: 0,
    explanation: 'GPS = Global Positioning System (US). Other GNSS: GLONASS (Russia), Galileo (EU), BeiDou (China).',
    difficulty: 'easy'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    question: 'The reference ellipsoid used in NAD83 and WGS84 is:',
    options: ['GRS80 (very similar for both)', 'Clarke 1866', 'Bessel 1841', 'Hayford'],
    correctAnswer: 0,
    explanation: 'NAD83 uses GRS80 ellipsoid. WGS84 uses WGS84 ellipsoid (nearly identical to GRS80, <1cm difference).',
    difficulty: 'easy'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    question: 'Geoid is best described as:',
    options: ['Equipotential surface (mean sea level extended)', 'Mathematical ellipsoid', 'Topographic surface', 'Magnetic field'],
    correctAnswer: 0,
    explanation: 'Geoid = gravity equipotential surface approximating mean sea level. Orthometric height = elevation above geoid.',
    difficulty: 'easy'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    question: 'GPS requires a minimum of how many satellites for 3D position?',
    options: ['4 satellites', '3 satellites', '5 satellites', '6 satellites'],
    correctAnswer: 0,
    explanation: '4 satellites minimum: 3 for X,Y,Z position + 1 for receiver clock bias. More satellites improve accuracy (GDOP).',
    difficulty: 'easy'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    question: 'Ellipsoid height (h) differs from orthometric height (H) by:',
    options: ['Geoid height (N): h = H + N', 'Datum shift', 'Scale factor', 'Convergence angle'],
    correctAnswer: 0,
    explanation: 'h (ellipsoid) = H (orthometric/MSL) + N (geoid height). Geoid undulates ±100m relative to ellipsoid.',
    difficulty: 'easy'
  },

  // Geodesy, GPS, Astronomy - Medium
  {
    domain: 'Applied Mathematics & Statistics',
    question: 'RTK GPS provides:',
    options: ['Centimeter accuracy in real-time', 'Meter-level accuracy only', 'Sub-millimeter accuracy always', 'Works without base station'],
    correctAnswer: 0,
    explanation: 'RTK (Real-Time Kinematic) uses base station corrections for cm-level accuracy in real time. Requires radio/cell link.',
    difficulty: 'medium'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    question: 'PDOP (Position Dilution of Precision) indicates:',
    options: ['Satellite geometry quality (lower is better)', 'Accuracy of measurement (higher is better)', 'Number of satellites', 'Receiver quality'],
    correctAnswer: 0,
    explanation: 'DOP measures satellite geometry. Low DOP = good geometry = better accuracy. PDOP<4 is good, >6 is poor.',
    difficulty: 'medium'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    question: 'The primary GPS frequency L1 is:',
    options: ['1575.42 MHz', '1227.60 MHz', '2400 MHz', '915 MHz'],
    correctAnswer: 0,
    explanation: 'GPS L1 = 1575.42 MHz (C/A code). L2 = 1227.60 MHz. L5 = 1176.45 MHz (newer civilian frequency).',
    difficulty: 'medium'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    question: 'Multipath error in GPS is caused by:',
    options: ['Signal reflection from surfaces', 'Satellite geometry', 'Ionospheric delay', 'Tropospheric delay'],
    correctAnswer: 0,
    explanation: 'Multipath: signals bounce off buildings, ground, vehicles. Mitigate with good antenna placement and choke rings.',
    difficulty: 'medium'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    question: 'The geoid model used in the US (NAVD88 heights) is currently:',
    options: ['GEOID18 (or newer)', 'GEOID96', 'WGS84', 'NAD27'],
    correctAnswer: 0,
    explanation: 'GEOID18 (2019) is current hybrid geoid model for CONUS. Converts between NAD83 ellipsoid and NAVD88 orthometric heights.',
    difficulty: 'medium'
  },

  // Geodesy, GPS, Astronomy - Hard
  {
    domain: 'Applied Mathematics & Statistics',
    question: 'Atmospheric delay in GPS signals is caused by:',
    options: ['Both ionosphere and troposphere', 'Ionosphere only', 'Troposphere only', 'Magnetosphere only'],
    correctAnswer: 0,
    explanation: 'Ionospheric delay (dispersive, correctable with dual-frequency) + tropospheric delay (wet/dry, modeled). Both slow signals.',
    difficulty: 'hard'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    question: 'CORS network provides:',
    options: ['Continuously Operating Reference Stations for post-processing', 'Portable base stations only', 'Satellite tracking only', 'Weather data only'],
    correctAnswer: 0,
    explanation: 'CORS (NGS): permanent GPS base stations providing data for post-processing, PPP, and network RTK solutions.',
    difficulty: 'hard'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    question: 'The difference between NAD27 and NAD83 horizontal datums can be:',
    options: ['100+ meters in some areas', 'Always <1 meter', 'Exactly zero', 'Only vertical, no horizontal'],
    correctAnswer: 0,
    explanation: 'NAD27→NAD83 shift varies regionally: typically 10-100m, up to 160m in some areas. Requires datum transformation.',
    difficulty: 'hard'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    question: 'Integer ambiguity resolution in carrier-phase GPS refers to:',
    options: ['Determining whole-number carrier wavelengths', 'Rounding coordinates to integers', 'Satellite selection algorithm', 'Coordinate system conversion'],
    correctAnswer: 0,
    explanation: 'Carrier-phase ambiguity: unknown integer number of wavelengths from satellite to receiver. Resolving enables cm accuracy.',
    difficulty: 'hard'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    question: 'PPP (Precise Point Positioning) differs from differential GPS by:',
    options: ['Uses precise satellite orbits/clocks, no local base needed', 'Requires local base station', 'Lower accuracy than DGPS', 'Works offline only'],
    correctAnswer: 0,
    explanation: 'PPP uses precise ephemeris and clock corrections from global network. No local base needed. Convergence time: 15-30 min for cm.',
    difficulty: 'hard'
  },

  // Professional Practice - Easy
  {
    domain: 'Professional Practice',
    question: 'The primary purpose of professional licensing for surveyors is to:',
    options: ['Protect the public', 'Increase surveyor income', 'Limit competition', 'Simplify regulations'],
    correctAnswer: 0,
    explanation: 'Licensing protects public health, safety, and welfare by ensuring minimum competency standards.',
    difficulty: 'easy'
  },
  {
    domain: 'Professional Practice',
    question: 'Continuing education requirements for PLS license serve to:',
    options: ['Keep skills current with technology and law changes', 'Generate revenue for associations', 'Make licensing harder', 'Replace initial exam'],
    correctAnswer: 0,
    explanation: 'CE/PDH requirements ensure licensed professionals stay current with technology, regulations, and best practices.',
    difficulty: 'easy'
  },
  {
    domain: 'Professional Practice',
    question: 'A surveyor discovers an error in a recorded survey. The proper action is:',
    options: ['File an amended/corrected survey immediately', 'Ignore if minor', 'Wait for someone to complain', 'Notify only the client'],
    correctAnswer: 0,
    explanation: 'Ethics require filing amended survey to correct errors affecting public record. Notify affected parties and recording office.',
    difficulty: 'easy'
  },
  {
    domain: 'Professional Practice',
    question: 'Professional liability insurance (E&O) for surveyors covers:',
    options: ['Negligence and errors in professional work', 'Criminal acts', 'Intentional fraud', 'Personal injuries on site'],
    correctAnswer: 0,
    explanation: 'E&O (Errors & Omissions) covers professional negligence. Does NOT cover fraud, criminal acts, or general liability.',
    difficulty: 'easy'
  },
  {
    domain: 'Professional Practice',
    question: 'When can a surveyor use another surveyor\'s field notes?',
    options: ['With permission or if part of public record', 'Anytime they want', 'Never under any circumstances', 'Only if that surveyor is deceased'],
    correctAnswer: 0,
    explanation: 'Field notes are professional work product. Use only with permission or if filed as public record.',
    difficulty: 'easy'
  },

  // Professional Practice - Medium
  {
    domain: 'Professional Practice',
    question: 'A client asks you to move a property corner to give them more land. You should:',
    options: ['Refuse - this is professional misconduct', 'Do it if they pay extra', 'Do it if neighbor agrees', 'Move it slightly only'],
    correctAnswer: 0,
    explanation: 'Moving corners to benefit a client is fraud and professional misconduct. Surveyors find boundaries, not create them.',
    difficulty: 'medium'
  },
  {
    domain: 'Professional Practice',
    question: 'Statute of limitations for surveying malpractice typically begins:',
    options: ['When error is discovered or should have been', 'When survey was performed', 'When surveyor retires', 'Never expires'],
    correctAnswer: 0,
    explanation: 'Most states: clock starts when error discovered or reasonably should have been discovered (discovery rule).',
    difficulty: 'medium'
  },
  {
    domain: 'Professional Practice',
    question: 'Standard of care for professional surveyors is:',
    options: ['What a reasonable, competent surveyor would do', 'Absolute perfection', 'Whatever client requests', 'Minimum legal requirement only'],
    correctAnswer: 0,
    explanation: 'Standard of care: reasonable professional competence under the circumstances, not perfection. Based on peer practices.',
    difficulty: 'medium'
  },
  {
    domain: 'Professional Practice',
    question: 'A "sealed" survey plat means:',
    options: ['Stamped/signed by licensed surveyor', 'Stored in sealed envelope', 'Protected from water damage', 'Registered with insurance'],
    correctAnswer: 0,
    explanation: 'Sealed = bearing the stamp/seal and signature of licensed professional surveyor taking responsibility.',
    difficulty: 'medium'
  },
  {
    domain: 'Professional Practice',
    question: 'Which document is NOT typically required for subdivision approval?',
    options: ['Surveyor\'s personal tax returns', 'Boundary survey plat', 'Legal descriptions', 'Engineering drawings'],
    correctAnswer: 0,
    explanation: 'Subdivision requires: survey plat, legal descriptions, engineering plans, environmental review. Not personal financial docs.',
    difficulty: 'medium'
  },

  // Professional Practice - Hard
  {
    domain: 'Professional Practice',
    question: 'When expert witness testimony in court, a surveyor should:',
    options: ['State opinions based on evidence, remain impartial', 'Always favor the hiring party', 'Guarantee absolute certainty', 'Avoid technical terms entirely'],
    correctAnswer: 0,
    explanation: 'Expert witness duty is to the court/truth, not hiring party. Present facts and professional opinions objectively.',
    difficulty: 'hard'
  },
  {
    domain: 'Professional Practice',
    question: 'Privity of contract means:',
    options: ['Direct contractual relationship exists', 'Survey is private/confidential', 'Property is private land', 'Surveyor has privacy rights'],
    correctAnswer: 0,
    explanation: 'Privity: direct contract relationship. Third parties (non-clients) typically cannot sue for breach absent privity.',
    difficulty: 'hard'
  },
  {
    domain: 'Professional Practice',
    question: 'Vicarious liability in surveying means:',
    options: ['Employer liable for employee negligence', 'Surveyor liable for client actions', 'Personal liability only', 'No liability for anyone'],
    correctAnswer: 0,
    explanation: 'Vicarious liability: employer/principal liable for employee/agent acts within scope of employment (respondeat superior).',
    difficulty: 'hard'
  },
  {
    domain: 'Professional Practice',
    question: 'A conflict of interest exists when:',
    options: ['Professional judgment could be compromised by personal interests', 'Working in same area as another surveyor', 'Charging competitive fees', 'Using standard equipment'],
    correctAnswer: 0,
    explanation: 'Conflict of interest: personal interests (financial, relationships) may impair professional judgment. Disclose or decline.',
    difficulty: 'hard'
  },
  {
    domain: 'Professional Practice',
    question: 'The doctrine of "respondeat superior" holds:',
    options: ['Employer liable for employee acts in scope of work', 'Senior surveyor always right', 'Highest bidder wins contract', 'State regulations supersede federal'],
    correctAnswer: 0,
    explanation: 'Respondeat superior ("let the master answer"): employer liable for employee torts committed within employment scope.',
    difficulty: 'hard'
  },

  // Additional Math & Basic Science
  {
    domain: 'Math & Basic Science',
    question: 'The coefficient of thermal expansion for steel is approximately:',
    options: ['0.0000065 per °F', '0.000065 per °F', '0.00065 per °F', '0.0065 per °F'],
    correctAnswer: 0,
    explanation: 'Steel: α = 0.0000065 per °F (or 0.0000116 per °C). Critical for tape corrections.',
    difficulty: 'medium'
  },
  {
    domain: 'Math & Basic Science',
    question: 'Convert 150 gradians to degrees.',
    options: ['135°', '150°', '165°', '120°'],
    correctAnswer: 0,
    explanation: 'Degrees = gradians × 0.9. 150 grads × 0.9 = 135°. Full circle = 400 grads = 360°.',
    difficulty: 'easy'
  },
  {
    domain: 'Math & Basic Science',
    question: 'The weight of 1 cubic foot of water is approximately:',
    options: ['62.4 lbs', '50.0 lbs', '75.0 lbs', '100.0 lbs'],
    correctAnswer: 0,
    explanation: '1 ft³ water ≈ 62.4 lbs. 1 gallon ≈ 8.34 lbs. Important for fluid mechanics.',
    difficulty: 'easy'
  },
  {
    domain: 'Math & Basic Science',
    question: 'If the sum of angles in a pentagon should be 540°, but measured sum is 540°15\', the angular misclosure is:',
    options: ['+15\'', '-15\'', '+270\'', 'No error'],
    correctAnswer: 0,
    explanation: 'Misclosure = measured - theoretical = 540°15\' - 540° = +15\' (excess). Distribute correction.',
    difficulty: 'medium'
  },
  {
    domain: 'Math & Basic Science',
    question: 'A circular curve has Degree of Curve D=8° (arc definition). What is the radius?',
    options: ['716.2 ft', '800.0 ft', '650.0 ft', '900.0 ft'],
    correctAnswer: 0,
    explanation: 'R = 5729.58/D = 5729.58/8 = 716.2 ft. For arc definition, R = 5729.58/D.',
    difficulty: 'hard'
  },

  // Additional Field Data Acquisition
  {
    domain: 'Field Data Acquisition',
    question: 'A level instrument 100 ft from rod reads 5.25 ft. At 300 ft, same elevation reads:',
    options: ['Slightly higher due to curvature and refraction', '5.25 ft exactly', 'Slightly lower', 'Impossible to read'],
    correctAnswer: 0,
    explanation: 'Curvature & refraction cause sag in line of sight. Longer distance = more sag. Reading appears higher.',
    difficulty: 'medium'
  },
  {
    domain: 'Field Data Acquisition',
    question: 'For accurate EDM work, meteorological correction requires measuring:',
    options: ['Temperature and pressure', 'Temperature only', 'Humidity only', 'Wind speed only'],
    correctAnswer: 0,
    explanation: 'EDM atmospheric correction needs temp & pressure to calculate refractive index. Some also use humidity.',
    difficulty: 'medium'
  },
  {
    domain: 'Field Data Acquisition',
    question: 'Peg test is used to determine:',
    options: ['Level instrument collimation error', 'EDM constant', 'Prism offset', 'Magnetic declination'],
    correctAnswer: 0,
    explanation: 'Peg test (two-peg test): determines and eliminates level collimation error by reciprocal setups.',
    difficulty: 'medium'
  },
  {
    domain: 'Field Data Acquisition',
    question: 'The stadia method measures distance by:',
    options: ['Reading interval between stadia hairs on rod', 'Electronic pulse timing', 'Triangulation', 'Magnetic induction'],
    correctAnswer: 0,
    explanation: 'Stadia: optical method using stadia hairs. Distance = K × interval × cos²(angle), where K typically = 100.',
    difficulty: 'easy'
  },
  {
    domain: 'Field Data Acquisition',
    question: 'Vertical angle accuracy improves with:',
    options: ['Averaging face-left and face-right readings', 'Reading only once', 'Using longest sight distance', 'Ignoring atmospheric effects'],
    correctAnswer: 0,
    explanation: 'Face-left/face-right (direct/reverse) averages eliminate index error and other instrumental errors.',
    difficulty: 'medium'
  },

  // Additional Plane Survey Computations
  {
    domain: 'Survey Computations & Applications',
    question: 'For area calculation by coordinates, if going clockwise the calculated area will be:',
    options: ['Negative', 'Positive', 'Zero', 'Undefined'],
    correctAnswer: 0,
    explanation: 'Coordinate area formula: counterclockwise = positive, clockwise = negative. Take absolute value for final area.',
    difficulty: 'medium'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'Middle ordinate (M) of a curve relates to External (E) by:',
    options: ['M < E (M is shorter)', 'M > E', 'M = E', 'No relationship'],
    correctAnswer: 0,
    explanation: 'M = R(1 - cos(Δ/2)), E = R(sec(Δ/2) - 1). M is always less than E for same curve.',
    difficulty: 'hard'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'A compound curve consists of:',
    options: ['Two or more simple curves with different radii', 'One curve with varying radius', 'Two parallel curves', 'A curve and a spiral'],
    correctAnswer: 0,
    explanation: 'Compound curve: multiple simple curves (different radii) meeting at common tangent point (PCC).',
    difficulty: 'medium'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'The tangent distance (T) of a curve with R=1000 ft and Δ=30° is approximately:',
    options: ['268 ft', '300 ft', '250 ft', '200 ft'],
    correctAnswer: 0,
    explanation: 'T = R·tan(Δ/2) = 1000·tan(15°) = 1000 × 0.2679 = 267.9 ft.',
    difficulty: 'medium'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'Chord length (C) for a curve equals:',
    options: ['2R·sin(Δ/2)', 'R·Δ', '2R·tan(Δ/2)', 'R·sin(Δ)'],
    correctAnswer: 0,
    explanation: 'Long chord C = 2R·sin(Δ/2). Arc length L = RΔ (radians) or (πRΔ)/180 (degrees).',
    difficulty: 'medium'
  },

  // Additional Mapping, GIS, and CAD
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'Contour interval on a 1:24,000 USGS quad map is typically:',
    options: ['10 ft or 20 ft', '5 ft', '50 ft', '100 ft'],
    correctAnswer: 0,
    explanation: '1:24,000 scale: typically 10 ft interval (flat terrain) or 20 ft (mountainous). 1:62,500 uses 20/40 ft.',
    difficulty: 'medium'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'Index contours (darker lines) typically occur every:',
    options: ['5th contour line', '10th contour', 'Every line', '2nd line'],
    correctAnswer: 0,
    explanation: 'Index contours: every 5th line is bold/labeled for readability. Ex: 10ft interval → index every 50ft.',
    difficulty: 'easy'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'Buffer analysis in GIS creates:',
    options: ['Zone of specified distance around features', 'Random point pattern', 'Elevation model', 'Attribute table'],
    correctAnswer: 0,
    explanation: 'Buffer: creates polygon zones at specified distance from point/line/polygon. Used for proximity analysis.',
    difficulty: 'medium'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'The representative fraction (RF) 1:12,000 means:',
    options: ['1 unit on map = 12,000 units on ground', '1 foot = 12,000 inches', 'Map is 1/12,000 actual size', 'Both A and C'],
    correctAnswer: 3,
    explanation: 'RF is dimensionless ratio. 1:12,000 means any map unit = 12,000 same ground units. Map is 1/12,000 scale.',
    difficulty: 'easy'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'Spatial resolution in remote sensing refers to:',
    options: ['Smallest feature detectable (pixel size)', 'Frequency of image collection', 'Number of spectral bands', 'Data file size'],
    correctAnswer: 0,
    explanation: 'Spatial resolution = pixel/ground sample distance. Ex: 30m Landsat, 10m Sentinel, 0.3m aerial.',
    difficulty: 'medium'
  },

  // Additional Boundary Law & PLSS
  {
    domain: 'Boundary Law & PLSS',
    question: 'Government Lot in PLSS refers to:',
    options: ['Fractional subdivision due to irregular boundaries', 'Federal building site', 'Public park land', 'Township office location'],
    correctAnswer: 0,
    explanation: 'Government Lot: irregular parcel along township/section boundaries (water, prior claims). Numbered, not regular sections.',
    difficulty: 'medium'
  },
  {
    domain: 'Boundary Law & PLSS',
    question: 'The NW¼ of the SE¼ of Section 10 contains approximately:',
    options: ['40 acres', '160 acres', '80 acres', '20 acres'],
    correctAnswer: 0,
    explanation: 'Section = 640 ac. ¼ section = 160 ac. ¼ of ¼ = 40 acres. Aliquot subdivision.',
    difficulty: 'easy'
  },
  {
    domain: 'Boundary Law & PLSS',
    question: 'Which takes precedence in boundary location?',
    options: ['Original monuments over recorded distances', 'Recorded distances over monuments', 'Most recent survey', 'GPS coordinates'],
    correctAnswer: 0,
    explanation: 'Hierarchy: 1) Natural monuments, 2) Artificial monuments, 3) Adjoiner, 4) Course/distance, 5) Area.',
    difficulty: 'medium'
  },
  {
    domain: 'Boundary Law & PLSS',
    question: 'Correction lines (standard parallels) in PLSS occur every:',
    options: ['24 miles (every 4 townships)', '6 miles', '12 miles', '36 miles'],
    correctAnswer: 0,
    explanation: 'Standard parallels: every 24 miles north (4 townships) to correct for meridian convergence.',
    difficulty: 'medium'
  },
  {
    domain: 'Boundary Law & PLSS',
    question: 'Prescriptive easement requires continuous use for:',
    options: ['Statutory period (varies by state, often 10-20 years)', '1 year', '30 days', '50 years always'],
    correctAnswer: 0,
    explanation: 'Prescriptive easement period varies by state: typically 10-20 years of open, continuous, hostile use.',
    difficulty: 'medium'
  },

  // Additional Geodesy, GPS, Astronomy
  {
    domain: 'Applied Mathematics & Statistics',
    question: 'GPS satellite orbit altitude is approximately:',
    options: ['20,200 km', '10,000 km', '36,000 km (GEO)', '400 km (ISS)'],
    correctAnswer: 0,
    explanation: 'GPS: ~20,200 km altitude, ~12-hour orbital period. 24+ satellites in 6 orbital planes.',
    difficulty: 'medium'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    question: 'WAAS (Wide Area Augmentation System) provides:',
    options: ['Differential GPS corrections via geostationary satellites', 'Satellite tracking', 'Weather data only', 'Internet connectivity'],
    correctAnswer: 0,
    explanation: 'WAAS: FAA DGPS system using GEO satellites. Improves GPS to ~1-2m accuracy for aviation/surveying.',
    difficulty: 'medium'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    question: 'The semi-major axis of WGS84 ellipsoid is:',
    options: ['6,378,137 m', '6,356,752 m', '6,400,000 m', '6,300,000 m'],
    correctAnswer: 0,
    explanation: 'WGS84 ellipsoid: a (semi-major) = 6,378,137m, b (semi-minor) = 6,356,752m. Flattening f = 1/298.257.',
    difficulty: 'hard'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    question: 'The convergence angle between grid north and geodetic north is called:',
    options: ['Mapping angle (θ)', 'Declination', 'Azimuth', 'Bearing'],
    correctAnswer: 0,
    explanation: 'Mapping angle (convergence): angle between grid north (map projection) and geodetic north (meridian).',
    difficulty: 'hard'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    question: 'Static GPS surveying typically requires observation time of:',
    options: ['30 min to several hours depending on baseline', '5 minutes', '24 hours always', '1 minute RTK'],
    correctAnswer: 0,
    explanation: 'Static GPS: longer = better. Short baseline (<10km): 30-60 min. Long baseline: hours. For highest accuracy.',
    difficulty: 'medium'
  },

  // Additional Professional Practice
  {
    domain: 'Professional Practice',
    question: 'In most states, a PLS license allows practice of:',
    options: ['Land surveying within that state only', 'Nationwide surveying', 'Civil engineering also', 'Architecture also'],
    correctAnswer: 0,
    explanation: 'PLS license is state-specific. Multi-state practice requires reciprocity or separate licenses. Comity may apply.',
    difficulty: 'easy'
  },
  {
    domain: 'Professional Practice',
    question: 'Minimum liability insurance for surveyors is typically:',
    options: ['Varies by state/client requirement (often $1M)', 'Not required anywhere', 'Always $10M', '$100K maximum'],
    correctAnswer: 0,
    explanation: 'E&O insurance requirements vary. Common: $1M per occurrence. Some states/clients require higher limits.',
    difficulty: 'medium'
  },
  {
    domain: 'Professional Practice',
    question: 'A surveyor should retain field notes and records for:',
    options: ['Permanently or per state regulations (often 10+ years)', '1 year only', 'Until project completion', 'No requirement'],
    correctAnswer: 0,
    explanation: 'Most states require permanent retention or minimum 10-20 years. Records may be needed for future surveys/disputes.',
    difficulty: 'medium'
  },
  {
    domain: 'Professional Practice',
    question: 'Professional engineering (PE) license differs from PLS by:',
    options: ['PE covers design/analysis, PLS covers measurement/boundaries', 'No difference', 'PE is harder', 'PLS includes engineering'],
    correctAnswer: 0,
    explanation: 'PE: engineering design, calculations, structures. PLS: land measurement, boundaries, property law. Separate scopes.',
    difficulty: 'easy'
  },
  {
    domain: 'Professional Practice',
    question: 'Negligence in surveying requires proving all EXCEPT:',
    options: ['Criminal intent', 'Duty of care existed', 'Breach of duty occurred', 'Damages resulted'],
    correctAnswer: 0,
    explanation: 'Negligence requires: 1) Duty, 2) Breach, 3) Causation, 4) Damages. No criminal intent needed (that\'s fraud).',
    difficulty: 'hard'
  },

  // Final additional questions for diversity
  {
    domain: 'Math & Basic Science',
    question: 'The formula for slope gradient is:',
    options: ['Rise / Run', 'Run / Rise', 'Rise × Run', 'Rise + Run'],
    correctAnswer: 0,
    explanation: 'Slope = Rise/Run. Example: 5 ft rise over 100 ft run = 0.05 or 5% grade.',
    difficulty: 'easy'
  },
  {
    domain: 'Field Data Acquisition',
    question: 'Double-centering in angle measurement:',
    options: ['Averages FL and FR to eliminate errors', 'Doubles the angle value', 'Uses two instruments', 'Measures twice only'],
    correctAnswer: 0,
    explanation: 'Double-center (face-left/face-right): averages readings to cancel instrumental errors (index, collimation).',
    difficulty: 'medium'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'Azimuth from north to a line bearing S 45° W is:',
    options: ['225°', '135°', '315°', '45°'],
    correctAnswer: 0,
    explanation: 'S 45° W: Start at south (180°), add 45° west = 180° + 45° = 225° azimuth from north.',
    difficulty: 'easy'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'Slope (in percent) on a map with 20 ft contour interval and 100 ft horizontal spacing is:',
    options: ['20%', '10%', '5%', '40%'],
    correctAnswer: 0,
    explanation: 'Slope % = (vertical/horizontal) × 100 = (20/100) × 100 = 20%.',
    difficulty: 'easy'
  },
  {
    domain: 'Boundary Law & PLSS',
    question: 'Fee simple estate means:',
    options: ['Absolute ownership of land', 'Temporary lease', 'Easement only', 'Life estate'],
    correctAnswer: 0,
    explanation: 'Fee simple: highest form of ownership. Complete rights to use, sell, or transfer property.',
    difficulty: 'easy'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    question: 'Dilution of Precision (DOP) values indicate:',
    options: ['Satellite geometry effect on accuracy', 'Signal strength', 'Number of satellites', 'Receiver quality'],
    correctAnswer: 0,
    explanation: 'DOP: geometric strength. Low DOP (1-3) = excellent. High DOP (>6) = poor satellite geometry.',
    difficulty: 'medium'
  },
  {
    domain: 'Professional Practice',
    question: 'The term "prima facie evidence" in court means:',
    options: ['Evidence sufficient until contradicted', 'Absolute proof', 'Weak evidence', 'Hearsay evidence'],
    correctAnswer: 0,
    explanation: 'Prima facie: evidence accepted as fact unless rebutted. Survey plats often carry prima facie weight.',
    difficulty: 'hard'
  },
  {
    domain: 'Math & Basic Science',
    question: 'Random error differs from systematic error by:',
    options: ['Random errors follow probability distribution, systematic are constant', 'Random errors are larger', 'No difference', 'Random errors can be eliminated'],
    correctAnswer: 0,
    explanation: 'Random: unpredictable, follow normal distribution, reduced by averaging. Systematic: constant bias, require correction.',
    difficulty: 'medium'
  },
  {
    domain: 'Field Data Acquisition',
    question: 'The purpose of a tribrach is to:',
    options: ['Level and center instrument over point', 'Measure angles', 'Store equipment', 'Protect from weather'],
    correctAnswer: 0,
    explanation: 'Tribrach: mounting platform with leveling screws and optical plummet for precise centering over point.',
    difficulty: 'easy'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'Point of Curvature (PC) in horizontal curves is:',
    options: ['Where curve begins (tangent meets curve)', 'Midpoint of curve', 'Where curve ends', 'Center of curve radius'],
    correctAnswer: 0,
    explanation: 'PC (Point of Curvature): beginning of curve. PT (Point of Tangency): end of curve. PI: Point of Intersection.',
    difficulty: 'easy'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'Vector data in GIS consists of:',
    options: ['Points, lines, and polygons', 'Pixels only', 'Elevation values', 'Satellite imagery'],
    correctAnswer: 0,
    explanation: 'Vector: geometric features (points, lines, polygons) with attributes. Raster: grid cells with values.',
    difficulty: 'easy'
  },
  {
    domain: 'Boundary Law & PLSS',
    question: 'A "quit claim deed" transfers:',
    options: ['Whatever interest grantor has, no warranties', 'Guaranteed clear title', 'Government land only', 'Temporary easement'],
    correctAnswer: 0,
    explanation: 'Quit claim: transfers grantor\'s interest without warranty. Warranty deed guarantees clear title.',
    difficulty: 'medium'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    question: 'GLONASS is:',
    options: ['Russian GNSS satellite system', 'European GPS', 'Chinese navigation', 'US military GPS'],
    correctAnswer: 0,
    explanation: 'GLONASS: Russian global navigation system. Others: GPS (US), Galileo (EU), BeiDou (China).',
    difficulty: 'easy'
  },
  {
    domain: 'Professional Practice',
    question: 'Chain of custody for survey evidence requires:',
    options: ['Documented control of evidence from collection to court', 'Using steel chains only', 'Multiple surveyors', 'GPS tracking'],
    correctAnswer: 0,
    explanation: 'Chain of custody: documented trail showing evidence handling. Critical for legal proceedings.',
    difficulty: 'medium'
  },

  // === SRM TOPIC 3: TRAVERSE & HORIZONTAL CURVES (Dec 2025) ===
  {
    domain: 'Survey Computations & Applications',
    question: 'A traverse has perimeter 4,200 ft and error of closure 0.21 ft. The ratio of precision is:',
    options: ['1:20,000', '1:4,200', '1:2,100', '1:200'],
    correctAnswer: 0,
    explanation: 'Ratio = 1:(perimeter/error) = 1:(4200/0.21) = 1:20,000. First-order accuracy requires better than 1:25,000.',
    difficulty: 'medium'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'For a highway curve with R = 1,000 ft and deflection angle Δ = 24°, the tangent distance T is:',
    options: ['213.5 ft', '418.9 ft', '500.0 ft', '1,000.0 ft'],
    correctAnswer: 0,
    explanation: 'T = R × tan(Δ/2) = 1000 × tan(12°) = 1000 × 0.2126 = 212.6 ft ≈ 213.5 ft.',
    difficulty: 'hard'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'The Compass Rule adjusts traverse closure by:',
    options: ['Distributing error proportional to line lengths', 'Distributing error equally to all angles', 'Applying all correction to longest line', 'Ignoring the error'],
    correctAnswer: 0,
    explanation: 'Compass (Bowditch) Rule: correction = (line length/perimeter) × total error. Most common adjustment method.',
    difficulty: 'medium'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'Using the coordinate method, area of a traverse equals:',
    options: ['Half the absolute value of cross-multiplied coordinates', 'Sum of all latitudes', 'Product of perimeter and closure', 'Average of DMD values'],
    correctAnswer: 0,
    explanation: 'Coordinate formula: Area = ½|Σ(Xi × Yi+1 - Xi+1 × Yi)|. Systematic cross-multiplication of adjacent points.',
    difficulty: 'hard'
  },
  {
    domain: 'Survey Computations & Applications',
    question: 'A 6° curve (arc definition) has a radius of:',
    options: ['954.9 ft', '600 ft', '1,200 ft', '5,729.6 ft'],
    correctAnswer: 0,
    explanation: 'R = 5729.58/D = 5729.58/6 = 954.9 ft. Higher degree = sharper curve = smaller radius.',
    difficulty: 'medium'
  },

  // === SRM TOPIC 2: FIELD DATA ACQUISITION (Dec 2025) ===
  {
    domain: 'Field Data Acquisition',
    question: 'A steel tape standardized at 68°F is used at 32°F. The measured distance will be:',
    options: ['Too long; subtract correction', 'Too short; add correction', 'Exactly correct', 'Unpredictable'],
    correctAnswer: 0,
    explanation: 'Cold contracts tape. A shorter tape requires more tape lengths, giving a reading that is too long. Subtract correction.',
    difficulty: 'medium'
  },
  {
    domain: 'Field Data Acquisition',
    question: 'EDM accuracy of ±(2mm + 3ppm) means for 2 km the error is:',
    options: ['±8 mm', '±2 mm', '±3 mm', '±5 mm'],
    correctAnswer: 0,
    explanation: 'Error = 2mm + (3ppm × 2000m) = 2mm + 6mm = ±8mm. The ppm term dominates at longer distances.',
    difficulty: 'hard'
  },
  {
    domain: 'Field Data Acquisition',
    question: 'In leveling, HI = 502.45 ft and rod reading = 3.67 ft. Elevation of the point is:',
    options: ['498.78 ft', '506.12 ft', '502.45 ft', '499.78 ft'],
    correctAnswer: 0,
    explanation: 'Elevation = HI - rod reading = 502.45 - 3.67 = 498.78 ft.',
    difficulty: 'easy'
  },

  // === SRM TOPIC 4: GPS SURVEYING (Dec 2025) ===
  {
    domain: 'Surveying Principles',
    question: 'The minimum number of GPS satellites needed for 3D positioning is:',
    options: ['4 (3 for position + 1 for clock)', '3', '2', '6'],
    correctAnswer: 0,
    explanation: 'Four satellites needed: three for X, Y, Z coordinates; fourth to solve receiver clock error.',
    difficulty: 'medium'
  },
  {
    domain: 'Surveying Principles',
    question: 'RTK GPS achieves centimeter accuracy by:',
    options: ['Using carrier-phase measurements with real-time corrections', 'Simply using more satellites', 'Averaging many point solutions', 'Using only military GPS signals'],
    correctAnswer: 0,
    explanation: 'RTK uses carrier-phase (not code-phase) measurements plus real-time corrections from a base station for cm-level accuracy.',
    difficulty: 'hard'
  },

  // === SRM TOPIC 5: BOUNDARY LAW (Dec 2025) ===
  {
    domain: 'Boundary Law & PLSS',
    question: 'The chain of title is:',
    options: ['Sequence of ownership transfers from original grant to present', 'A Gunter\'s chain for surveys', 'The deed registration process', 'A surveyor\'s field procedure'],
    correctAnswer: 0,
    explanation: 'Chain of title: consecutive ownership history. Any gap or defect in the chain creates title problems.',
    difficulty: 'easy'
  },
  {
    domain: 'Boundary Law & PLSS',
    question: 'Title insurance protects against:',
    options: ['Defects in title up to the insured amount', 'Physical damage to property', 'Survey errors only', 'All future claims regardless of amount'],
    correctAnswer: 0,
    explanation: 'Title insurance covers title defects discovered after purchase, typically limited to the purchase price.',
    difficulty: 'medium'
  },

  // === WORD PROBLEM ADDITIONS (Dec 2025) ===
  {
    domain: 'Survey Computations & Applications',
    question: 'A parcel has sides of 200 ft and 300 ft with an included angle of 60°. What is the area?',
    options: ['25,981 sq ft (0.60 acres)', '60,000 sq ft', '30,000 sq ft', '15,000 sq ft'],
    correctAnswer: 0,
    explanation: 'Area = ½ × a × b × sin(C) = ½ × 200 × 300 × sin(60°) = ½ × 60,000 × 0.866 = 25,981 sq ft ÷ 43,560 = 0.60 acres.',
    difficulty: 'hard'
  },
  {
    domain: 'Math & Basic Science',
    question: 'A lot measures 132 ft × 330 ft. The area in acres is:',
    options: ['1.0 acre', '0.5 acre', '1.5 acres', '2.0 acres'],
    correctAnswer: 0,
    explanation: 'Area = 132 × 330 = 43,560 sq ft = exactly 1.0 acre. These are common PLSS-related dimensions.',
    difficulty: 'easy'
  },
  {
    domain: 'Field Data Acquisition',
    question: 'A slope distance of 500 ft is measured on a 10% grade. The horizontal distance is:',
    options: ['497.5 ft', '500.0 ft', '450.0 ft', '495.0 ft'],
    correctAnswer: 0,
    explanation: '10% grade: tan(θ) = 0.10, θ = 5.71°. H = 500 × cos(5.71°) = 500 × 0.995 = 497.5 ft.',
    difficulty: 'medium'
  },

  // === SRM TOPIC 6: LAND PLANNING & DEVELOPMENT (Dec 2025) ===
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'A subdivision is legally defined as:',
    options: ['Division of a tract into two or more parts for sale or development', 'A single parcel with no divisions', 'A government land survey', 'A topographic map'],
    correctAnswer: 0,
    explanation: 'Subdivision: dividing any tract into two or more parts for sale or building development.',
    difficulty: 'easy'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'The first step in subdivision surveying is:',
    options: ['Boundary survey of exterior lines', 'Recording the final plat', 'Installing utilities', 'Staking interior lots'],
    correctAnswer: 0,
    explanation: 'Boundary survey first: establish and monument exterior boundaries before interior work.',
    difficulty: 'medium'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'Minimum street grade to prevent water pooling is:',
    options: ['0.3% to 0.5%', '5% to 10%', '0% (flat)', '15% minimum'],
    correctAnswer: 0,
    explanation: 'Streets need minimum 0.3-0.5% grade for proper drainage along gutters.',
    difficulty: 'medium'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'A cul-de-sac is:',
    options: ['A dead-end street with turnaround', 'A main highway', 'An underground utility', 'A drainage structure'],
    correctAnswer: 0,
    explanation: 'Cul-de-sac: dead-end street with turnaround, popular for residential privacy. Max ~1000 ft.',
    difficulty: 'easy'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'Sanitary sewer design velocity should be:',
    options: ['2-10 ft/sec', '0.1-0.5 ft/sec', '20-50 ft/sec', 'Any velocity'],
    correctAnswer: 0,
    explanation: 'Sanitary sewer: 2-10 ft/sec. Too slow = settling; too fast = erosion.',
    difficulty: 'hard'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'Residential lots should drain:',
    options: ['Away from house to street or rear collector', 'Toward foundation', 'Onto neighboring lots', 'Into sanitary sewer'],
    correctAnswer: 0,
    explanation: 'Lots slope away from house in all directions - to street in front, rear collector if available.',
    difficulty: 'easy'
  },

  // === SRM TOPIC 7: MAPPING (Dec 2025) ===
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'A strip map is typically used for:',
    options: ['Highways, railroads, and pipelines', 'Shopping centers', 'City planning', 'Subdivision layouts'],
    correctAnswer: 0,
    explanation: 'Strip map: narrow/long projects (highways, railroads, pipelines). Area maps for subdivisions.',
    difficulty: 'medium'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'Index contours are:',
    options: ['Every fifth line, heavier, with elevation labeled', 'Property corners', 'Underground utilities', 'Road centerlines'],
    correctAnswer: 0,
    explanation: 'Index contours: every fifth contour, drawn heavier/bolder with elevation labeled.',
    difficulty: 'easy'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'The stadia method measures:',
    options: ['Horizontal distance using telescope optics', 'Angles only', 'Property values', 'Magnetic declination'],
    correctAnswer: 0,
    explanation: 'Stadia (tacheometry): measures horizontal distances using transit telescope optics.',
    difficulty: 'medium'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    question: 'Closely spaced contour lines indicate:',
    options: ['Steep slope', 'Gentle slope', 'Flat terrain', 'Water bodies'],
    correctAnswer: 0,
    explanation: 'Close contours = steep slope; wide spacing = gentle slope.',
    difficulty: 'easy'
  },

  // === SRM TOPIC 8: CONSTRUCTION SURVEYING (Dec 2025) ===
  {
    domain: 'Surveying Principles',
    question: '"Line and grade" in construction surveying refers to:',
    options: ['Horizontal alignment and elevation', 'Property corners', 'GPS coordinates', 'Magnetic bearings'],
    correctAnswer: 0,
    explanation: 'Line = horizontal alignment (transit); grade = elevation (level). Core construction surveying.',
    difficulty: 'medium'
  },
  {
    domain: 'Surveying Principles',
    question: 'Hub stakes are typically:',
    options: ['2x2 inch, driven flush, with tack marking precise position', 'Tall marker posts', 'Metal pins', 'Concrete monuments'],
    correctAnswer: 0,
    explanation: 'Hub stakes: 2x2 inch wood, driven flush, tack in top marks exact position.',
    difficulty: 'medium'
  },
  {
    domain: 'Surveying Principles',
    question: 'Witness stakes serve to:',
    options: ['Locate and identify nearby hub stakes', 'Mark property corners permanently', 'Show utility locations', 'Indicate benchmarks'],
    correctAnswer: 0,
    explanation: 'Witness (guard) stakes: locate/identify hub stakes with written information.',
    difficulty: 'medium'
  },
  {
    domain: 'Surveying Principles',
    question: 'Slope stakes mark:',
    options: ['Where natural ground meets proposed cut/fill (catch point)', 'Property corners', 'Utility easements', 'Traffic control'],
    correctAnswer: 0,
    explanation: 'Slope stakes: catch point where natural ground intersects proposed slope. Marked C (cut) or F (fill).',
    difficulty: 'medium'
  },
  {
    domain: 'Math & Basic Science',
    question: 'Convert 5 ft 9-1/2 in to decimal feet:',
    options: ['5.79 ft', '5.95 ft', '5.50 ft', '5.09 ft'],
    correctAnswer: 0,
    explanation: '9.5 in ÷ 12 = 0.792 ft. Total = 5 + 0.792 = 5.79 ft.',
    difficulty: 'easy'
  },

  // === SRM TOPIC 9: ACCURACY STANDARDS (Dec 2025) ===
  {
    domain: 'Professional Practice',
    question: 'The difference between accuracy and precision is:',
    options: ['Precision = consistency; accuracy = nearness to true value', 'They are identical', 'Precision is for angles only', 'Accuracy is for distances only'],
    correctAnswer: 0,
    explanation: 'Precision: consistency/repeatability. Accuracy: closeness to true value.',
    difficulty: 'medium'
  },
  {
    domain: 'Professional Practice',
    question: 'FEMA LiDAR elevation accuracy requires RMSE of:',
    options: ['15 cm maximum', '1 meter', '1 inch', '10 feet'],
    correctAnswer: 0,
    explanation: 'FEMA LiDAR: max RMSE of 15 cm (about 0.5 ft) for elevation data.',
    difficulty: 'hard'
  },
  {
    domain: 'Professional Practice',
    question: 'National Map Accuracy Standards for maps 1:20,000 or larger require:',
    options: ['Max 10% of points in error by more than 1/30 inch', '100% perfect accuracy', 'Only vertical accuracy', 'No testing required'],
    correctAnswer: 0,
    explanation: 'NMAS: no more than 10% of tested points can exceed 1/30 inch error on the map.',
    difficulty: 'hard'
  },
  {
    domain: 'Professional Practice',
    question: 'In statistics, 2-sigma error represents:',
    options: ['1.96 × RMSE, containing 95% of errors', 'Maximum error', 'Average error', 'One standard deviation'],
    correctAnswer: 0,
    explanation: '2-sigma = 1.96 × RMSE. 95% of errors fall within this range (normal distribution).',
    difficulty: 'hard'
  },

  // === SRM TOPIC 10: BUSINESS MANAGEMENT (Dec 2025) ===
  {
    domain: 'Professional Practice',
    question: 'Overhead rate is calculated as:',
    options: ['Total indirect costs ÷ total direct labor costs', 'Revenue ÷ expenses', 'Profit ÷ costs', 'Direct costs × markup'],
    correctAnswer: 0,
    explanation: 'Overhead rate = indirect costs / direct labor. Typical surveying: 150-200%.',
    difficulty: 'medium'
  },
  {
    domain: 'Professional Practice',
    question: 'A firm has 180% overhead. Direct labor is $4,000. The overhead charge is:',
    options: ['$7,200', '$4,000', '$2,222', '$1,800'],
    correctAnswer: 0,
    explanation: 'Overhead = $4,000 × 1.80 = $7,200.',
    difficulty: 'medium'
  },
  {
    domain: 'Professional Practice',
    question: 'The Brooks Act requires federal agencies to:',
    options: ['Negotiate professional services based on qualifications and value', 'Accept lowest bidder only', 'Use only government surveyors', 'Avoid professional services'],
    correctAnswer: 0,
    explanation: 'Brooks Act (40 USC): federal agencies select A/E services based on qualifications, then negotiate fee.',
    difficulty: 'medium'
  },
  {
    domain: 'Professional Practice',
    question: 'FAR typically allows operating margin of:',
    options: ['6-15% of total fee', '50% of costs', '1% maximum', 'No profit allowed'],
    correctAnswer: 0,
    explanation: 'Federal Acquisition Regulations: fair margin 6-15% for return on investment.',
    difficulty: 'medium'
  },
  {
    domain: 'Professional Practice',
    question: 'Which costs are typically excluded from overhead under FAR?',
    options: ['Entertainment, country club dues, certain interest', 'Employee wages', 'Office rent', 'Survey equipment'],
    correctAnswer: 0,
    explanation: 'FAR excludes entertainment, country club dues, and certain interest from allowable overhead.',
    difficulty: 'hard'
  },

  // === SRM TOPIC 11: CONVERSIONS (Dec 2025) ===
  {
    domain: 'Math & Basic Science',
    question: 'Steel tape thermal expansion coefficient is approximately:',
    options: ['0.00000645 per °F', '0.0000001 per °F', '0.001 per °F', '0.1 per °F'],
    correctAnswer: 0,
    explanation: 'Steel: 0.00000645 per °F. Invar: about 0.0000001 per °F (much less expansion).',
    difficulty: 'hard'
  },
  {
    domain: 'Math & Basic Science',
    question: 'One minute of latitude equals approximately:',
    options: ['1.15 statute miles', '1 foot', '100 meters', '10 chains'],
    correctAnswer: 0,
    explanation: '1 minute of latitude ≈ 1.15 statute miles ≈ 1 nautical mile.',
    difficulty: 'medium'
  },
  {
    domain: 'Math & Basic Science',
    question: 'A Texas vara equals:',
    options: ['33-1/3 inches', '36 inches', '12 inches', '66 feet'],
    correctAnswer: 0,
    explanation: 'Texas vara = 33.33 inches. California vara = 33 inches. Important for Spanish land grants.',
    difficulty: 'medium'
  },
  {
    domain: 'Math & Basic Science',
    question: 'One rod (pole or perch) equals:',
    options: ['16.5 feet', '100 feet', '66 feet', '10 feet'],
    correctAnswer: 0,
    explanation: 'Rod = pole = perch = 16.5 ft = 1/4 chain. Common in old deed descriptions.',
    difficulty: 'easy'
  },
  {
    domain: 'Math & Basic Science',
    question: 'One surveyor\'s link equals:',
    options: ['7.92 inches', '12 inches', '1 foot', '100 feet'],
    correctAnswer: 0,
    explanation: 'Surveyor\'s link = 7.92 inches. 100 links = 1 chain = 66 ft.',
    difficulty: 'medium'
  },
  {
    domain: 'Math & Basic Science',
    question: 'One hectare equals approximately:',
    options: ['2.47 acres', '1 acre', '10 acres', '100 acres'],
    correctAnswer: 0,
    explanation: 'Hectare = 10,000 m² = 2.471 acres. 1 acre = 0.4047 hectares.',
    difficulty: 'easy'
  },
];
