import type { Flashcard } from '../schema';

export const COMPREHENSIVE_FLASHCARDS: Omit<Flashcard, 'id'>[] = [
  // Domain 1: Mathematics & Basic Science (1-50)
  {
    domain: 'Math & Basic Science',
    front: 'Radians → Degrees',
    back: 'Multiply radians × (180 / π)\n\nExample: 2 radians = 2 × 57.2958° ≈ 114.59°',
    category: 'formula'
  },
  {
    domain: 'Math & Basic Science',
    front: 'Degrees → Radians',
    back: 'Multiply degrees × (π / 180)\n\nExample: 90° = 90 × (π/180) = π/2 radians',
    category: 'formula'
  },
  {
    domain: 'Math & Basic Science',
    front: 'Arc Length Formula',
    back: 's = r × θ (θ in radians)\n\nWhere:\n• s = arc length\n• r = radius\n• θ = central angle in radians',
    category: 'formula'
  },
  {
    domain: 'Math & Basic Science',
    front: 'Chord Length',
    back: 'C = 2 × r × sin(Δ / 2)\n\nWhere:\n• C = chord length\n• r = radius\n• Δ = central angle',
    category: 'formula'
  },
  {
    domain: 'Math & Basic Science',
    front: 'Slope (% grade)',
    back: '(Δh / L) × 100\n\nWhere:\n• Δh = height difference\n• L = horizontal distance\n\nExample: 5 ft rise over 100 ft = 5%',
    category: 'formula'
  },
  {
    domain: 'Math & Basic Science',
    front: 'Azimuth ↔ Bearing Conversion',
    back: 'Quadrant-based:\n• NE: Bearing = Az\n• SE: Bearing = 180° – Az\n• SW: Bearing = Az – 180°\n• NW: Bearing = 360° – Az',
    category: 'formula'
  },
  {
    domain: 'Math & Basic Science',
    front: 'Latitude (Traverse)',
    back: 'Lat = D × cos(θ)\n\nWhere:\n• D = distance\n• θ = azimuth or bearing\n\nPositive = North, Negative = South',
    category: 'formula'
  },
  {
    domain: 'Math & Basic Science',
    front: 'Departure (Traverse)',
    back: 'Dep = D × sin(θ)\n\nWhere:\n• D = distance\n• θ = azimuth or bearing\n\nPositive = East, Negative = West',
    category: 'formula'
  },
  {
    domain: 'Math & Basic Science',
    front: 'Rectangular Coordinates (X,Y)',
    back: 'Add/subtract latitudes & departures from known point:\n\nX₂ = X₁ + Departure\nY₂ = Y₁ + Latitude\n\n(Easting, Northing)',
    category: 'formula'
  },
  {
    domain: 'Math & Basic Science',
    front: 'Distance from Coordinates',
    back: 'D = √[(ΔX)² + (ΔY)²]\n\nPythagorean theorem applied to coordinate differences',
    category: 'formula'
  },
  {
    domain: 'Math & Basic Science',
    front: 'Area by Coordinates',
    back: 'A = ½ Σ(xᵢyᵢ₊₁ – xᵢ₊₁yᵢ)\n\nDMD (Double Meridian Distance) method\nOr coordinate product method',
    category: 'formula'
  },
  {
    domain: 'Math & Basic Science',
    front: 'Mean Angle Error per Observation',
    back: '√(Σe² / n)\n\nWhere:\n• e = individual errors\n• n = number of observations',
    category: 'formula'
  },
  {
    domain: 'Math & Basic Science',
    front: 'Relative Precision Ratio',
    back: 'Perimeter / Misclosure\n\nExample: 5000 ft / 0.50 ft = 1:10,000\n\nHigher ratio = better precision',
    category: 'formula'
  },
  {
    domain: 'Math & Basic Science',
    front: 'Error Propagation Rule',
    back: 'σ_total = √(σ₁² + σ₂² + … + σₙ²)\n\nErrors add in quadrature (root-sum-square)',
    category: 'formula'
  },
  {
    domain: 'Math & Basic Science',
    front: 'Weighted Mean',
    back: 'Σ(wx) / Σw\n\nWhere:\n• w = weight of each observation\n• x = observation value',
    category: 'formula'
  },
  {
    domain: 'Math & Basic Science',
    front: 'Standard Deviation',
    back: 'σ = √(Σ(x – x̄)² / (n–1))\n\nWhere:\n• x̄ = mean\n• n = sample size\n\nUse n-1 for sample SD',
    category: 'formula'
  },
  {
    domain: 'Math & Basic Science',
    front: 'Probable Error (P.E.)',
    back: 'P.E. = 0.6745 × σ\n\nRepresents 50% confidence level\n\n95% confidence ≈ ±2σ',
    category: 'formula'
  },
  {
    domain: 'Math & Basic Science',
    front: 'Linear Error of Closure',
    back: 'E = √(ΣΔLat² + ΣΔDep²)\n\nMisclosure in traverse computations',
    category: 'formula'
  },
  {
    domain: 'Math & Basic Science',
    front: 'Curvature Correction (ft)',
    back: '0.667 × D² / R\n\nApprox: 0.0785 × D² (D in miles)\n\nAlways negative (lowers line of sight)',
    category: 'formula'
  },
  {
    domain: 'Math & Basic Science',
    front: 'Refraction Correction (ft)',
    back: '–0.0112 × D² (D in miles)\n\nRaises apparent line of sight\n\nCombined C&R ≈ 0.0675 × D²',
    category: 'formula'
  },
  {
    domain: 'Math & Basic Science',
    front: 'Sum of Interior Angles (n-gon)',
    back: '(n – 2) × 180°\n\nWhere n = number of sides\n\nExample: Pentagon = (5-2) × 180° = 540°',
    category: 'formula'
  },
  {
    domain: 'Math & Basic Science',
    front: 'Sum of Exterior Angles',
    back: '360°\n\nAlways 360° for any closed polygon',
    category: 'definition'
  },
  {
    domain: 'Math & Basic Science',
    front: 'Circle Circumference',
    back: 'C = 2πr = πd\n\nWhere:\n• r = radius\n• d = diameter',
    category: 'formula'
  },
  {
    domain: 'Math & Basic Science',
    front: 'Sector Area',
    back: 'A = ½ r² θ (θ in radians)\n\nOr: A = (θ/360°) × πr² (θ in degrees)',
    category: 'formula'
  },
  {
    domain: 'Math & Basic Science',
    front: 'Parallax Equation',
    back: 'p = B / H\n\nWhere:\n• B = air base (photo spacing)\n• H = flying height',
    category: 'formula'
  },
  {
    domain: 'Math & Basic Science',
    front: 'Azimuth of Back Sight',
    back: 'Az_back = Az_forward + 180°\n\n(± 360° as needed to keep 0–360°)',
    category: 'formula'
  },
  {
    domain: 'Math & Basic Science',
    front: 'Magnetic Declination Correction',
    back: 'True Az = Mag Az ± Declination\n\n+ for East declination\n– for West declination',
    category: 'formula'
  },
  {
    domain: 'Math & Basic Science',
    front: 'Spherical Excess (E)',
    back: 'E = (Area / r²) × (180 / π)\n\nUsed for large-area triangulation',
    category: 'formula'
  },
  {
    domain: 'Math & Basic Science',
    front: 'Ellipsoid Flattening (f)',
    back: 'f = (a – b) / a\n\nWhere:\n• a = semi-major axis\n• b = semi-minor axis\n\nEarth f ≈ 1/298.257',
    category: 'formula'
  },
  {
    domain: 'Math & Basic Science',
    front: 'Radius of Curvature in Meridian (M)',
    back: 'M = a(1 – e²) / (1 – e² sin²φ)^(3/2)\n\nUsed in geodetic computations',
    category: 'formula'
  },
  {
    domain: 'Math & Basic Science',
    front: 'Chord Bearing Adjustment',
    back: 'Δ / 2 each side of central angle\n\nDeflection angle = Δ/2 from tangent',
    category: 'concept'
  },
  {
    domain: 'Math & Basic Science',
    front: 'Angular Misclosure Allowance',
    back: '±(30″ × √n)\n\nWhere n = number of angles\n\nExample: 4 angles → ±60″',
    category: 'formula'
  },
  {
    domain: 'Math & Basic Science',
    front: 'Traverse Precision Target',
    back: '1:10,000 to 1:20,000 (typical FS goal)\n\nUrban: 1:10,000+\nRural: 1:5,000 acceptable',
    category: 'concept'
  },
  {
    domain: 'Math & Basic Science',
    front: 'Temperature Correction (Length)',
    back: 'ΔL = L × α × ΔT\n\nWhere:\n• α = thermal expansion coef.\n• ΔT = temp change from standard\n\nSteel α ≈ 0.00000645/°F',
    category: 'formula'
  },
  {
    domain: 'Math & Basic Science',
    front: 'Tension Correction (Tape)',
    back: 'ΔL = (L × (P – P₀)) / (A × E)\n\nWhere:\n• P = applied tension\n• P₀ = standard tension\n• A = cross-sectional area\n• E = modulus of elasticity',
    category: 'formula'
  },
  {
    domain: 'Math & Basic Science',
    front: 'Sag Correction',
    back: 'ΔL = (w² × L³) / (24 × P²)\n\nWhere:\n• w = weight per unit length\n• L = unsupported length\n• P = tension\n\nAlways negative',
    category: 'formula'
  },
  {
    domain: 'Math & Basic Science',
    front: 'Catenary Length Approximation',
    back: 'L ≈ c + (w² c³ / 24 T²)\n\nWhere:\n• c = chord length\n• w = weight\n• T = tension',
    category: 'formula'
  },
  {
    domain: 'Math & Basic Science',
    front: 'Compass Rule (Bowditch)',
    back: 'Adjust lat & dep ∝ length / perimeter\n\nCorrection = (Line Length / Total Length) × Misclosure\n\nMost common method',
    category: 'formula'
  },
  {
    domain: 'Math & Basic Science',
    front: 'Transit Rule',
    back: 'Adjust lat & dep ∝ departure / Σdeparture\n\nUsed when angles more precise than distances',
    category: 'formula'
  },
  {
    domain: 'Math & Basic Science',
    front: 'Crandall Rule',
    back: 'Iterative traverse adjustment using angular and linear closure\n\nMost rigorous method',
    category: 'concept'
  },
  {
    domain: 'Math & Basic Science',
    front: 'Triangle Area (Heron\'s Formula)',
    back: 'A = √[s(s–a)(s–b)(s–c)]\n\nWhere s = ½(a + b + c)\n\ns = semi-perimeter',
    category: 'formula'
  },
  {
    domain: 'Math & Basic Science',
    front: 'Logarithmic Identity',
    back: 'log(ab) = log a + log b\nlog(a/b) = log a – log b\nlog(aⁿ) = n log a',
    category: 'formula'
  },
  {
    domain: 'Math & Basic Science',
    front: 'HP-35s Memory Tip',
    back: 'Use REGS for traverse storage:\nX = Latitude\nY = Departure\n\nStore/recall with STO/RCL',
    category: 'concept'
  },
  {
    domain: 'Math & Basic Science',
    front: 'Angle Reduction to Seconds',
    back: 'DMS → Total Seconds\n\n(D × 3600) + (M × 60) + S\n\nExample: 45°30\'15" = 163,815"',
    category: 'formula'
  },
  {
    domain: 'Math & Basic Science',
    front: 'Angle Conversion to Decimal Degrees',
    back: 'D + (M / 60) + (S / 3600)\n\nExample: 45°30\'30" = 45.5083°',
    category: 'formula'
  },
  {
    domain: 'Math & Basic Science',
    front: 'Vertical Exaggeration (Ratio)',
    back: 'VE = HS / VS\n\nWhere:\n• HS = Horizontal Scale\n• VS = Vertical Scale',
    category: 'formula'
  },
  {
    domain: 'Math & Basic Science',
    front: 'Area Conversion',
    back: '1 acre = 43,560 ft² = 4046.856 m²\n1 hectare = 10,000 m² = 2.471 acres',
    category: 'definition'
  },
  {
    domain: 'Math & Basic Science',
    front: 'Length Conversion',
    back: '1 ft = 0.3048 m\n1 mi = 5280 ft = 1.609 km\n1 chain = 66 ft = 100 links\n1 rod = 16.5 ft',
    category: 'definition'
  },
  {
    domain: 'Math & Basic Science',
    front: 'Volume Prism Formula',
    back: 'V = A_avg × h\n\nWhere:\n• A_avg = average cross-sectional area\n• h = height/length',
    category: 'formula'
  },
  {
    domain: 'Math & Basic Science',
    front: 'Weight of Water (ft³)',
    back: '62.4 lb/ft³\n\nUseful for hydrology and hydraulics calculations',
    category: 'definition'
  },

  // Domain 2: Field Data Acquisition & Reduction (51-100)
  {
    domain: 'Field Data Acquisition',
    front: 'Level Loop Misclosure',
    back: 'ΣBS – ΣFS = ΔElevation\n\nShould equal known elevation difference\nIf not → misclosure exists',
    category: 'formula'
  },
  {
    domain: 'Field Data Acquisition',
    front: 'Allowable Level Misclosure',
    back: '0.02√K ft\n\nWhere K = distance in miles\n\nExample: 2 miles → ±0.028 ft',
    category: 'formula'
  },
  {
    domain: 'Field Data Acquisition',
    front: 'Curvature Correction (Leveling)',
    back: '0.574 × D² ft (D in miles)\n\nOr: 0.0785 × D² (approx)',
    category: 'formula'
  },
  {
    domain: 'Field Data Acquisition',
    front: 'Combined Curvature & Refraction',
    back: '0.0675 × D² ft (approx)\n\nCurvature (0.0785) – Refraction (0.0112)',
    category: 'formula'
  },
  {
    domain: 'Field Data Acquisition',
    front: 'Differential Leveling Adjustment',
    back: 'Distribute closure proportionally by sight length\n\nOr equally per setup if distances unknown',
    category: 'concept'
  },
  {
    domain: 'Field Data Acquisition',
    front: 'Reciprocal Leveling',
    back: 'Δh = ½[(BS₁ – FS₁) + (BS₂ – FS₂)]\n\nEliminates collimation and curvature errors',
    category: 'formula'
  },
  {
    domain: 'Field Data Acquisition',
    front: 'Trig Leveling Formula',
    back: 'Δh = S × sin(α) ± (h_i – h_t)\n\nWhere:\n• S = slope distance\n• α = vertical angle\n• h_i = instrument height\n• h_t = target height',
    category: 'formula'
  },
  {
    domain: 'Field Data Acquisition',
    front: 'Horizontal Distance from Slope',
    back: 'H = S × cos(α)\n\nWhere:\n• S = slope distance\n• α = vertical angle',
    category: 'formula'
  },
  {
    domain: 'Field Data Acquisition',
    front: 'Collimation Error (Level)',
    back: 'e = (BS – FS) / d\n\nError per unit distance\nCan be calibrated out',
    category: 'formula'
  },
  {
    domain: 'Field Data Acquisition',
    front: 'Height of Instrument (HI)',
    back: 'HI = Elevation + BS\n\nBacksight added to known elevation',
    category: 'formula'
  },
  {
    domain: 'Field Data Acquisition',
    front: 'Elevation of Point (E.P.)',
    back: 'E.P. = HI – FS\n\nForesight subtracted from HI',
    category: 'formula'
  },
  {
    domain: 'Field Data Acquisition',
    front: 'Profile Leveling',
    back: 'Record BS, multiple IS, FS\n\nCompute elevations sequentially\nUsed for route surveys',
    category: 'concept'
  },
  {
    domain: 'Field Data Acquisition',
    front: 'Parallax in Leveling',
    back: 'Prevented by:\n1. Focus objective on rod\n2. Focus eyepiece for crosshairs\n3. Eliminate apparent movement',
    category: 'concept'
  },
  {
    domain: 'Field Data Acquisition',
    front: 'EDM Constant Error',
    back: 'Systematic; fixed offset\n\nInstrument + prism constant\nTypically ±30mm',
    category: 'definition'
  },
  {
    domain: 'Field Data Acquisition',
    front: 'EDM Proportional Error',
    back: 'Varies with distance\n\nppm correction\n\n1 ppm = 1 mm per km',
    category: 'definition'
  },
  {
    domain: 'Field Data Acquisition',
    front: 'PPM Conversion',
    back: '1 ppm = 1 mm per km = 0.000001 × D\n\nExample: 5 ppm @ 1000m = 5mm error',
    category: 'formula'
  },
  {
    domain: 'Field Data Acquisition',
    front: 'Mean Sea Level Reference',
    back: 'Zero elevation datum (geoid reference)\n\nNAVD88 in North America',
    category: 'definition'
  },
  {
    domain: 'Field Data Acquisition',
    front: 'Benchmark (BM)',
    back: 'Permanent elevation reference point\n\nMarked with stamped disk or monument',
    category: 'definition'
  },
  {
    domain: 'Field Data Acquisition',
    front: 'Turning Point (TP)',
    back: 'Temporary point for transferring HI\n\nMust be stable during both BS and FS readings',
    category: 'definition'
  },
  {
    domain: 'Field Data Acquisition',
    front: 'Foresight (FS)',
    back: 'Reading on a point of known or desired elevation\n\nEnds a setup',
    category: 'definition'
  },
  {
    domain: 'Field Data Acquisition',
    front: 'Backsight (BS)',
    back: 'Reading on known elevation to determine HI\n\nStarts a setup',
    category: 'definition'
  },
  {
    domain: 'Field Data Acquisition',
    front: 'Intermediate Sight (IS)',
    back: 'Reading between BS and FS\n\nUsed for profiles\nDoesn\'t change HI',
    category: 'definition'
  },
  {
    domain: 'Field Data Acquisition',
    front: 'Check Leveling',
    back: 'Re-run in opposite direction to check closure\n\nGood practice for quality control',
    category: 'concept'
  },
  {
    domain: 'Field Data Acquisition',
    front: 'Three-Wire Leveling',
    back: 'Elev = HI – (average of top, mid, bottom crosshairs)\n\nIncreases accuracy',
    category: 'formula'
  },
  {
    domain: 'Field Data Acquisition',
    front: 'Stadia Constant Formula',
    back: 'D = (k × s) + c\n\nWhere:\n• k ≈ 100 (stadia interval factor)\n• s = rod interval\n• c = 0 (modern instruments)',
    category: 'formula'
  },
  {
    domain: 'Field Data Acquisition',
    front: 'Horizontal Distance (Stadia)',
    back: 'D = (k × s) × cos²(α)\n\nWhere α = vertical angle',
    category: 'formula'
  },
  {
    domain: 'Field Data Acquisition',
    front: 'Vertical Distance (Stadia)',
    back: 'V = (k × s × sin(2α)) / 2',
    category: 'formula'
  },
  {
    domain: 'Field Data Acquisition',
    front: 'Magnetic Azimuth',
    back: 'Angle clockwise from Magnetic North\n\n0° to 360°',
    category: 'definition'
  },
  {
    domain: 'Field Data Acquisition',
    front: 'True Azimuth',
    back: 'Magnetic Azimuth ± Declination\n\n+ East declination\n– West declination',
    category: 'formula'
  },
  {
    domain: 'Field Data Acquisition',
    front: 'Grid Azimuth',
    back: 'True Az ± Convergence Angle\n\nUsed in State Plane systems',
    category: 'formula'
  },
  {
    domain: 'Field Data Acquisition',
    front: 'Convergence Angle',
    back: 'γ = (λ – λ₀) × sin φ\n\nWhere:\n• λ = point longitude\n• λ₀ = central meridian\n• φ = latitude',
    category: 'formula'
  },
  {
    domain: 'Field Data Acquisition',
    front: 'Mean Sea Level Distance',
    back: 'Horizontal ground distance adjusted for elevation\n\nUsed in geodetic work',
    category: 'definition'
  },
  {
    domain: 'Field Data Acquisition',
    front: 'Ground Distance to Grid Distance',
    back: 'Grid = Ground × Scale Factor × Elevation Factor\n\nOr: Grid = Ground × Combined Factor',
    category: 'formula'
  },
  {
    domain: 'Field Data Acquisition',
    front: 'Elevation Factor (m)',
    back: 'm = R / (R + h)\n\nWhere:\n• R = Earth radius (≈20,906,000 ft)\n• h = average elevation',
    category: 'formula'
  },
  {
    domain: 'Field Data Acquisition',
    front: 'Combined Factor (k)',
    back: 'k = m × k₀\n\nWhere:\n• m = elevation factor\n• k₀ = grid scale factor',
    category: 'formula'
  },
  {
    domain: 'Field Data Acquisition',
    front: 'Observed Bearing',
    back: 'Measured angle between two points using total station\n\nN/S component + E/W component',
    category: 'definition'
  },
  {
    domain: 'Field Data Acquisition',
    front: 'Zenith Angle (Z)',
    back: '0° = directly up\n90° = horizontal\n180° = directly down',
    category: 'definition'
  },
  {
    domain: 'Field Data Acquisition',
    front: 'Vertical Angle (α)',
    back: 'α = 90° – Z\n\nRelation to zenith angle\n\nPositive = up, Negative = down',
    category: 'formula'
  },
  {
    domain: 'Field Data Acquisition',
    front: 'Horizontal Circle Reading',
    back: 'Clockwise readings increase from 0°–360°\n\nConvention in surveying',
    category: 'concept'
  },
  {
    domain: 'Field Data Acquisition',
    front: 'Angle Measurement Methods',
    back: '• Repetition – measure multiple times\n• Reiteration – different starting points\n• Direction method – from reference',
    category: 'concept'
  },
  {
    domain: 'Field Data Acquisition',
    front: 'Repetition Method Advantage',
    back: 'Reduces random error by averaging\n\nDivide total by number of repetitions',
    category: 'concept'
  },
  {
    domain: 'Field Data Acquisition',
    front: 'Face Left / Face Right',
    back: 'Used to eliminate collimation and index errors\n\nAverage the two readings',
    category: 'concept'
  },
  {
    domain: 'Field Data Acquisition',
    front: 'Centering Error',
    back: 'Occurs from improper setup over point\n\nUse optical plummet or laser plumb',
    category: 'concept'
  },
  {
    domain: 'Field Data Acquisition',
    front: 'Level Tube Sensitivity',
    back: 'S = r × θ\n\nWhere:\n• r = radius of curvature\n• θ = angle in radians\n\nSmaller bubble = more sensitive',
    category: 'formula'
  },
  {
    domain: 'Field Data Acquisition',
    front: 'Precision in Field Notes',
    back: 'Record all readings to significant precision\n\nUsually to 0.01 ft or 1mm',
    category: 'concept'
  },
  {
    domain: 'Field Data Acquisition',
    front: 'Blunder Check',
    back: 'Compare forward and backward azimuth differences\n\nShould differ by 180° ± tolerance',
    category: 'concept'
  },
  {
    domain: 'Field Data Acquisition',
    front: 'Closure Ratio (Field Traverses)',
    back: 'Total length / linear misclosure\n\nExample: 10,000 ft / 0.50 ft = 1:20,000',
    category: 'formula'
  },
  {
    domain: 'Field Data Acquisition',
    front: 'Minimum Closure Ratio (Acceptable)',
    back: '1:10,000 for 2nd-order\n1:5,000 for 3rd-order\n\nUrban typically requires 1:10,000+',
    category: 'definition'
  },

  // Continue with remaining domains... (Domain 3-7, cards 101-350)
  // For brevity, I'll show the structure for one more domain:

  // Domain 3: Plane Survey Computations (101-150) - Sample
  {
    domain: 'Survey Computations & Applications',
    front: 'Latitude (Traverse)',
    back: 'Lat = D × cos(θ)\n\nNorth component of distance',
    category: 'formula'
  },
  {
    domain: 'Survey Computations & Applications',
    front: 'Departure (Traverse)',
    back: 'Dep = D × sin(θ)\n\nEast component of distance',
    category: 'formula'
  },
  {
    domain: 'Survey Computations & Applications',
    front: 'Linear Misclosure',
    back: '√(ΣΔLat² + ΣΔDep²)\n\nResultant error vector',
    category: 'formula'
  },
  {
    domain: 'Survey Computations & Applications',
    front: 'Relative Precision',
    back: 'Perimeter ÷ Misclosure\n\nQuality indicator for traverse',
    category: 'formula'
  },
  {
    domain: 'Survey Computations & Applications',
    front: 'Compass (Bowditch) Rule',
    back: 'Adjustment ∝ line length / total perimeter\n\nMost common adjustment method',
    category: 'formula'
  },
  {
    domain: 'Survey Computations & Applications',
    front: 'Transit Rule',
    back: 'Adjustment ∝ departure / Σdeparture\n\nUsed when angles more precise than distances',
    category: 'formula'
  },
  {
    domain: 'Survey Computations & Applications',
    front: 'Crandall Rule',
    back: 'Uses both linear and angular misclosures iteratively\n\nMost rigorous method',
    category: 'concept'
  },
  {
    domain: 'Survey Computations & Applications',
    front: 'Angular Misclosure',
    back: 'Observed – (180(n–2))\n\nDifference from theoretical sum',
    category: 'formula'
  },
  {
    domain: 'Survey Computations & Applications',
    front: 'Adjusted Angle per Interior',
    back: 'Observed – (Total Misclosure / n)\n\nDistribute closure equally',
    category: 'formula'
  },
  {
    domain: 'Survey Computations & Applications',
    front: 'Azimuth from Coordinates',
    back: 'Az = atan(ΔE / ΔN)\n\nAdjust to proper quadrant',
    category: 'formula'
  },
  {
    domain: 'Survey Computations & Applications',
    front: 'Bearing from Azimuth',
    back: 'Quadrant-based:\n• NE = Az\n• SE = 180–Az\n• SW = Az–180\n• NW = 360–Az',
    category: 'formula'
  },
  {
    domain: 'Survey Computations & Applications',
    front: 'Area by Coordinates',
    back: 'A = ½ Σ(xᵢyᵢ₊₁ – xᵢ₊₁yᵢ)\n\nDouble Meridian Distance or Coordinate product',
    category: 'formula'
  },
  {
    domain: 'Survey Computations & Applications',
    front: 'Coordinate of Closing Point',
    back: 'ΣLat = 0, ΣDep = 0 after adjustment\n\nClosure check',
    category: 'concept'
  },
  {
    domain: 'Survey Computations & Applications',
    front: 'Mean Elevation of Plane',
    back: '(Σ Elevations) / n\n\nSimple average',
    category: 'formula'
  },
  {
    domain: 'Survey Computations & Applications',
    front: 'Average End Area Volume',
    back: 'V = L × (A₁ + A₂)/2\n\nEarthwork calculation',
    category: 'formula'
  },
  {
    domain: 'Survey Computations & Applications',
    front: 'Prismoidal Volume',
    back: 'V = (L/6) × (A₁ + 4A_m + A₂)\n\nMore accurate than average end area',
    category: 'formula'
  },
  {
    domain: 'Survey Computations & Applications',
    front: 'Contour Interpolation',
    back: 'Linear between two elevations along slope line\n\nProportional distance',
    category: 'concept'
  },
  {
    domain: 'Survey Computations & Applications',
    front: 'Slope Ratio',
    back: '(Δh / ΔL) × 100%\n\nPercent grade',
    category: 'formula'
  },
  {
    domain: 'Survey Computations & Applications',
    front: 'Mean Gradient',
    back: '(Total Δh / Total L) × 100%\n\nAverage slope',
    category: 'formula'
  },
  {
    domain: 'Survey Computations & Applications',
    front: 'Weighted Average Elevation',
    back: 'Σ(A×h) / ΣA\n\nArea-weighted mean',
    category: 'formula'
  },
  {
    domain: 'Survey Computations & Applications',
    front: 'Azimuth of Line AB',
    back: 'atan(ΔE / ΔN), adjusted to 0–360°\n\nQuadrant awareness required',
    category: 'formula'
  },
  {
    domain: 'Survey Computations & Applications',
    front: 'Forward vs Back Azimuth',
    back: 'Differ by 180° (±360 correction)\n\nReverse direction',
    category: 'concept'
  },
  {
    domain: 'Survey Computations & Applications',
    front: 'Latitude Departure Check',
    back: 'ΣLat = 0, ΣDep = 0 (closure check)\n\nMust close for valid traverse',
    category: 'concept'
  },
  {
    domain: 'Survey Computations & Applications',
    front: 'Circular Curve Length',
    back: 'L = (πRΔ) / 180\n\nWhere Δ in degrees',
    category: 'formula'
  },
  {
    domain: 'Survey Computations & Applications',
    front: 'Tangent (T)',
    back: 'R × tan(Δ/2)\n\nDistance from PC/PT to PI',
    category: 'formula'
  },
  {
    domain: 'Survey Computations & Applications',
    front: 'External Distance (E)',
    back: 'R(sec(Δ/2) – 1)\n\nDistance from PI to curve',
    category: 'formula'
  },
  {
    domain: 'Survey Computations & Applications',
    front: 'Mid-ordinate (M)',
    back: 'R(1 – cos(Δ/2))\n\nPerpendicular from chord to curve',
    category: 'formula'
  },
  {
    domain: 'Survey Computations & Applications',
    front: 'Long Chord (LC)',
    back: '2R sin(Δ/2)\n\nChord from PC to PT',
    category: 'formula'
  },
  {
    domain: 'Survey Computations & Applications',
    front: 'Degree of Curve (Arc Definition)',
    back: 'D = (18000) / (πR)\n\nAngle subtended by 100 ft arc',
    category: 'formula'
  },
  {
    domain: 'Survey Computations & Applications',
    front: 'Degree of Curve (Chord Definition)',
    back: 'D = 5730 / R\n\nAngle subtended by 100 ft chord',
    category: 'formula'
  },
  {
    domain: 'Survey Computations & Applications',
    front: 'Stationing along Curve',
    back: 'PC to PT = L = (Δ/360) × 2πR\n\nArc length',
    category: 'formula'
  },
  {
    domain: 'Survey Computations & Applications',
    front: 'Deflection Angle per Station',
    back: 'Δ / (L / 100)\n\nFor 100 ft stations',
    category: 'formula'
  },
  {
    domain: 'Survey Computations & Applications',
    front: 'Sub-chord Deflection',
    back: '(Δ × C) / (2 × L)\n\nFor partial station',
    category: 'formula'
  },
  {
    domain: 'Survey Computations & Applications',
    front: 'Vertical Curve Equation',
    back: 'y = (g₁x / 100) + ((g₂ – g₁)x² / (200L))\n\nElevation at distance x',
    category: 'formula'
  },
  {
    domain: 'Survey Computations & Applications',
    front: 'High/Low Point on Vertical Curve',
    back: 'x = (–g₁L) / (g₂ – g₁)\n\nWhere grade changes sign',
    category: 'formula'
  },
  {
    domain: 'Survey Computations & Applications',
    front: 'Curve Offset from Tangent',
    back: 'y = (x²) / (2R)\n\nApproximate offset',
    category: 'formula'
  },
  {
    domain: 'Survey Computations & Applications',
    front: 'Grade Intersection Point (PVI)',
    back: 'The vertex connecting tangents in vertical curves\n\nIntersection of grades',
    category: 'definition'
  },
  {
    domain: 'Survey Computations & Applications',
    front: 'Tangent Elevation Formula',
    back: 'E = E_PVC + (g₁ × x / 100)\n\nElevation on entering tangent',
    category: 'formula'
  },
  {
    domain: 'Survey Computations & Applications',
    front: 'Offset to Curve',
    back: 'y = (g₂ – g₁) × x² / (200L)\n\nVertical curve offset',
    category: 'formula'
  },
  {
    domain: 'Survey Computations & Applications',
    front: 'Cross-Section Area (2-Point)',
    back: 'A = (h₁ + h₂)/2 × width\n\nTrapezoidal approximation',
    category: 'formula'
  },
  {
    domain: 'Survey Computations & Applications',
    front: 'Mass Diagram Use',
    back: 'Balances cut/fill for earthwork computation\n\nCumulative volume graph',
    category: 'concept'
  },
  {
    domain: 'Survey Computations & Applications',
    front: 'Misclosure in Coordinates',
    back: '(ΣLat² + ΣDep²)½\n\nLinear error of closure',
    category: 'formula'
  },
  {
    domain: 'Survey Computations & Applications',
    front: 'Error Adjustment Ratio',
    back: 'Correction per leg = (Leg Length / Total Length) × Misclosure\n\nBowditch method',
    category: 'formula'
  },
  {
    domain: 'Survey Computations & Applications',
    front: 'Traverse Computation Order',
    back: 'Angles → Bearings → Coordinates → Area\n\nSystematic approach',
    category: 'concept'
  },
  {
    domain: 'Survey Computations & Applications',
    front: 'Grid Azimuth Correction',
    back: 'True Az ± Convergence Angle\n\nGrid North vs True North',
    category: 'formula'
  },
  {
    domain: 'Survey Computations & Applications',
    front: 'Coordinate Transformation',
    back: 'x\' = ax + by + c\ny\' = –bx + ay + d\n\nRotation and translation',
    category: 'formula'
  },

  // Domain 4: Mapping, GIS & CAD (151-200)
  {
    domain: 'Mapping, GIS, and CAD',
    front: 'GIS (Definition)',
    back: 'Geographic Information System\n\nIntegrates spatial data with attributes',
    category: 'definition'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    front: 'Raster Data',
    back: 'Pixel-based; represents continuous surfaces\n\nElevation, imagery, temperature',
    category: 'definition'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    front: 'Vector Data',
    back: 'Point, line, polygon format\n\nDiscrete features (boundaries, roads)',
    category: 'definition'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    front: 'Raster Cell Value',
    back: 'Represents average attribute over that area\n\nOr center point value',
    category: 'concept'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    front: 'Resolution (Raster)',
    back: 'Size of pixel\n\nSmaller = higher resolution',
    category: 'definition'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    front: 'Attribute Table',
    back: 'Database storing non-spatial information\n\nLinked to geometry',
    category: 'definition'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    front: 'Shapefile (.shp)',
    back: 'Common vector data format\n\nIncludes .shx, .dbf support files',
    category: 'definition'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    front: 'DEM (Digital Elevation Model)',
    back: 'Raster dataset representing elevation values\n\nBare earth or surface',
    category: 'definition'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    front: 'Orthophoto',
    back: 'Aerial photo corrected for distortion and scale\n\nTrue map projection',
    category: 'definition'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    front: 'Topology (GIS)',
    back: 'Spatial relationships\n\nConnectivity, adjacency, containment',
    category: 'definition'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    front: 'Coordinate Reference System (CRS)',
    back: 'Defines how map data relate to Earth\'s surface\n\nIncludes datum and projection',
    category: 'definition'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    front: 'Geographic Coordinate System (GCS)',
    back: 'Uses latitude & longitude on a spheroid\n\nAngular units (degrees)',
    category: 'definition'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    front: 'Projected Coordinate System (PCS)',
    back: '2D map projection of 3D Earth\n\nLinear units (feet, meters)',
    category: 'definition'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    front: 'Common PCS Examples',
    back: 'State Plane, UTM, Lambert Conformal Conic, Transverse Mercator',
    category: 'definition'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    front: 'UTM Zone Width',
    back: '6° of longitude per zone\n\n60 zones total worldwide',
    category: 'definition'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    front: 'UTM Origin',
    back: 'False easting = 500,000 m\nNorthing = 0 (N hemisphere) or 10,000,000 m (S hemisphere)',
    category: 'definition'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    front: 'State Plane Coordinate System (SPCS)',
    back: 'High accuracy local mapping system used in the U.S.\n\nState-specific zones',
    category: 'definition'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    front: 'Lambert Conformal Conic Projection',
    back: 'Used for wide east–west areas\n\nExample: Texas',
    category: 'definition'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    front: 'Transverse Mercator Projection',
    back: 'Used for north–south regions\n\nMinimal distortion along meridian',
    category: 'definition'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    front: 'Scale Factor (Grid)',
    back: 'Ratio between grid and ground distances\n\nTypically near 1.0',
    category: 'definition'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    front: 'Elevation Factor (m)',
    back: 'm = R / (R + h)\n\nR ≈ 20,906,000 ft\nh = elevation',
    category: 'formula'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    front: 'Combined Factor (k)',
    back: 'k = m × k₀\n\nElevation factor × Grid scale factor',
    category: 'formula'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    front: 'Grid Distance from Ground',
    back: 'Grid = Ground × k\n\nk = combined factor',
    category: 'formula'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    front: 'Ground Distance from Grid',
    back: 'Ground = Grid / k\n\nk = combined factor',
    category: 'formula'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    front: 'Map Scale Definition',
    back: '1 unit on map = X units on ground\n\nExample: 1" = 100\'',
    category: 'definition'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    front: 'Graphic Scale (Bar Scale)',
    back: 'Remains correct when map resized\n\nPreferred over numeric scale',
    category: 'concept'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    front: 'Large Scale Map',
    back: 'Shows small area with great detail\n\nExample: 1"=100\'',
    category: 'definition'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    front: 'Small Scale Map',
    back: 'Shows large area with less detail\n\nExample: 1"=1 mile',
    category: 'definition'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    front: 'Metadata (GIS)',
    back: '"Data about data"\n\nDocuments source, accuracy, date',
    category: 'definition'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    front: 'Datum (Definition)',
    back: 'Mathematical model of Earth\'s size, shape, and origin\n\nReference framework',
    category: 'definition'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    front: 'Horizontal Datum Example',
    back: 'NAD83 (North American Datum 1983)\n\nBased on GRS80 ellipsoid',
    category: 'definition'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    front: 'Vertical Datum Example',
    back: 'NAVD88 (North American Vertical Datum 1988)\n\nMean sea level reference',
    category: 'definition'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    front: 'NAD27 vs NAD83 Difference',
    back: 'NAD83 is Earth-centered\nNAD27 based on Meades Ranch, KS\n\nShifts up to 100m',
    category: 'concept'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    front: 'Grid Convergence Angle',
    back: 'Difference between True North and Grid North\n\nVaries by location',
    category: 'definition'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    front: 'Ellipsoid Example',
    back: 'GRS80, WGS84\n\nMathematical approximations of Earth',
    category: 'definition'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    front: 'False Easting / Northing Purpose',
    back: 'Avoid negative coordinates\n\nShift origin westward and southward',
    category: 'concept'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    front: 'Orthometric Height (H)',
    back: 'Elevation above geoid\n\nMean sea level reference',
    category: 'definition'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    front: 'Ellipsoidal Height (h)',
    back: 'GPS-measured height above ellipsoid\n\nDiffers from orthometric',
    category: 'definition'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    front: 'Geoid Height (N)',
    back: 'Difference between ellipsoid and geoid surfaces\n\n-100m to +100m globally',
    category: 'definition'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    front: 'Height Relationship Formula',
    back: 'h = H + N\n\nEllipsoidal = Orthometric + Geoid separation',
    category: 'formula'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    front: 'Map Projection Distortion Types',
    back: 'Shape, area, distance, direction\n\nCannot preserve all simultaneously',
    category: 'concept'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    front: 'Equal-Area Projection',
    back: 'Preserves area\n\nUsed for statistical maps',
    category: 'definition'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    front: 'Conformal Projection',
    back: 'Preserves shape and angles\n\nUsed for surveying',
    category: 'definition'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    front: 'Azimuthal Projection',
    back: 'Projects points onto a plane from Earth\'s center\n\nPreserves direction from center',
    category: 'definition'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    front: 'CAD (Definition)',
    back: 'Computer-Aided Design\n\nUsed to create survey drawings',
    category: 'definition'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    front: 'Coordinate Import in CAD',
    back: 'CSV or TXT file with:\nPoint#, Northing, Easting, Elevation, Description',
    category: 'concept'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    front: 'Layer Control in CAD',
    back: 'Organizes data by type\n\nExample: topo, boundary, text',
    category: 'concept'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    front: 'Common CAD File Types',
    back: '.DWG, .DXF, .DGN\n\nAutodesk and Bentley formats',
    category: 'definition'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    front: 'Raster Overlay in CAD',
    back: 'Used for georeferencing aerial imagery to linework\n\nBackground reference',
    category: 'concept'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    front: 'Coordinate Scaling in CAD',
    back: 'Apply scale factor to convert grid ↔ ground\n\nEssential for accurate mapping',
    category: 'concept'
  },

  // Domain 5: Boundary Law & Land Descriptions (201-250)
  {
    domain: 'Boundary Law & PLSS',
    front: 'Boundary Law Definition',
    back: 'Body of law governing ownership, description, and retracement of property boundaries',
    category: 'definition'
  },
  {
    domain: 'Boundary Law & PLSS',
    front: 'Principle of Retracement',
    back: 'Follow footsteps of original surveyor\n\nIntent > measurement',
    category: 'concept'
  },
  {
    domain: 'Boundary Law & PLSS',
    front: 'Order of Evidence (Hierarchy)',
    back: '1) Original monuments\n2) Accessories\n3) Adjoiners\n4) Record calls\n5) Measurements',
    category: 'concept'
  },
  {
    domain: 'Boundary Law & PLSS',
    front: 'Senior Rights',
    back: 'Earlier conveyance holds priority\n\nFirst in time, first in right',
    category: 'concept'
  },
  {
    domain: 'Boundary Law & PLSS',
    front: 'Junior Rights',
    back: 'Later conveyance subject to prior boundaries\n\nMust defer to senior',
    category: 'concept'
  },
  {
    domain: 'Boundary Law & PLSS',
    front: 'Record Title',
    back: 'Ownership established by deed or legal document\n\nWritten evidence',
    category: 'definition'
  },
  {
    domain: 'Boundary Law & PLSS',
    front: 'Possession Title',
    back: 'Ownership based on occupation or use\n\nPossibly adverse',
    category: 'definition'
  },
  {
    domain: 'Boundary Law & PLSS',
    front: 'Adverse Possession (Texas)',
    back: 'Open, notorious, continuous, and hostile possession\n\n10 years typical',
    category: 'concept'
  },
  {
    domain: 'Boundary Law & PLSS',
    front: 'Easement',
    back: 'Right to use land owned by another\n\nFor specific purpose',
    category: 'definition'
  },
  {
    domain: 'Boundary Law & PLSS',
    front: 'Easement Appurtenant',
    back: 'Benefits adjoining parcel\n\nTransfers with land',
    category: 'definition'
  },
  {
    domain: 'Boundary Law & PLSS',
    front: 'Easement in Gross',
    back: 'Benefits a person or entity, not land\n\nExample: utilities',
    category: 'definition'
  },
  {
    domain: 'Boundary Law & PLSS',
    front: 'Right-of-Way (ROW)',
    back: 'Legal right to pass through property\n\nPublic or private',
    category: 'definition'
  },
  {
    domain: 'Boundary Law & PLSS',
    front: 'Fee Simple',
    back: 'Maximum possible ownership interest in land\n\nUnlimited duration',
    category: 'definition'
  },
  {
    domain: 'Boundary Law & PLSS',
    front: 'Quitclaim Deed',
    back: 'Transfers interest without guarantee of clear title\n\nNo warranties',
    category: 'definition'
  },
  {
    domain: 'Boundary Law & PLSS',
    front: 'Warranty Deed',
    back: 'Transfers title with full guarantees of ownership\n\nSeller warranties',
    category: 'definition'
  },
  {
    domain: 'Boundary Law & PLSS',
    front: 'Metes and Bounds',
    back: 'Boundary defined by distance and direction\n\nFrom a known point',
    category: 'definition'
  },
  {
    domain: 'Boundary Law & PLSS',
    front: 'Call for Adjoiner',
    back: 'Reference to adjacent ownership\n\nHolds weight if well-established',
    category: 'concept'
  },
  {
    domain: 'Boundary Law & PLSS',
    front: 'Call for Monument',
    back: 'Physical evidence (iron rod, tree, stone)\n\nHighest weight in evidence',
    category: 'concept'
  },
  {
    domain: 'Boundary Law & PLSS',
    front: 'Call for Direction and Distance',
    back: 'Secondary to monument and adjoiner calls\n\nSubject to measurement error',
    category: 'concept'
  },
  {
    domain: 'Boundary Law & PLSS',
    front: 'Natural Monuments',
    back: 'Rivers, trees, or other natural features\n\nStrong evidence',
    category: 'definition'
  },
  {
    domain: 'Boundary Law & PLSS',
    front: 'Artificial Monuments',
    back: 'Manmade marks like rebar, stones, or stakes\n\nSet by surveyor',
    category: 'definition'
  },
  {
    domain: 'Boundary Law & PLSS',
    front: 'Lost Corner (PLSS)',
    back: 'Position cannot be determined beyond reasonable doubt\n\nRequires restoration',
    category: 'definition'
  },
  {
    domain: 'Boundary Law & PLSS',
    front: 'Obliterated Corner',
    back: 'Position lost but recoverable from reliable evidence\n\nCan be reestablished',
    category: 'definition'
  },
  {
    domain: 'Boundary Law & PLSS',
    front: 'Proportionate Measurement (Single)',
    back: 'Reestablish one lost corner between two known points\n\nProportional distance',
    category: 'concept'
  },
  {
    domain: 'Boundary Law & PLSS',
    front: 'Double Proportionate Measurement',
    back: 'Used when both latitude and departure lines exist\n\n2D proportioning',
    category: 'concept'
  },
  {
    domain: 'Boundary Law & PLSS',
    front: 'Quarter Section',
    back: '1/4 of a section = 160 acres\n\nCommon PLSS subdivision',
    category: 'definition'
  },
  {
    domain: 'Boundary Law & PLSS',
    front: 'Township',
    back: '6 miles square = 36 sections\n\n23,040 acres',
    category: 'definition'
  },
  {
    domain: 'Boundary Law & PLSS',
    front: 'Section',
    back: '1 mile square = 640 acres\n\nBasic PLSS unit',
    category: 'definition'
  },
  {
    domain: 'Boundary Law & PLSS',
    front: 'Aliquot Parts',
    back: 'Standard fractional divisions of sections\n\n¼, ½, etc.',
    category: 'definition'
  },
  {
    domain: 'Boundary Law & PLSS',
    front: 'Government Lot',
    back: 'Irregular subdivision created by natural boundaries\n\nWater bodies, etc.',
    category: 'definition'
  },
  {
    domain: 'Boundary Law & PLSS',
    front: 'Meander Line',
    back: 'Line following body of water for record purposes\n\nNot ownership boundary',
    category: 'definition'
  },
  {
    domain: 'Boundary Law & PLSS',
    front: 'Riparian Rights',
    back: 'Rights of landowners whose land borders water\n\nFlowing water',
    category: 'definition'
  },
  {
    domain: 'Boundary Law & PLSS',
    front: 'Littoral Rights',
    back: 'Rights along standing water\n\nLake or ocean',
    category: 'definition'
  },
  {
    domain: 'Boundary Law & PLSS',
    front: 'Accretion',
    back: 'Gradual buildup of land by waterborne sediment\n\nOwner gains land',
    category: 'definition'
  },
  {
    domain: 'Boundary Law & PLSS',
    front: 'Reliction',
    back: 'Recession of water exposing new land\n\nOwner gains land',
    category: 'definition'
  },
  {
    domain: 'Boundary Law & PLSS',
    front: 'Avulsion',
    back: 'Sudden change in river course\n\nBoundary does NOT move',
    category: 'definition'
  },
  {
    domain: 'Boundary Law & PLSS',
    front: 'Calls for Rivers',
    back: 'Generally to thread or centerline of stream\n\nUnless otherwise stated',
    category: 'concept'
  },
  {
    domain: 'Boundary Law & PLSS',
    front: 'Original Survey Control',
    back: 'Holds highest authority\n\nAll retracements refer back to it',
    category: 'concept'
  },
  {
    domain: 'Boundary Law & PLSS',
    front: 'Resurvey',
    back: 'Retracement to recover original survey position\n\nCannot create new rights',
    category: 'concept'
  },
  {
    domain: 'Boundary Law & PLSS',
    front: 'Simultaneous Conveyance',
    back: 'Two or more parcels conveyed at same time\n\nEqual rights',
    category: 'concept'
  },
  {
    domain: 'Boundary Law & PLSS',
    front: 'Senior Conveyance',
    back: 'First recorded parcel\n\nDefines remaining land for later parcels',
    category: 'concept'
  },
  {
    domain: 'Boundary Law & PLSS',
    front: 'Subdivision Plat',
    back: 'Official record of lots, blocks, and easements\n\nApproved by jurisdiction',
    category: 'definition'
  },
  {
    domain: 'Boundary Law & PLSS',
    front: 'Metes and Bounds Closure',
    back: 'Should mathematically close within acceptable tolerance\n\n1:10,000 typical',
    category: 'concept'
  },
  {
    domain: 'Boundary Law & PLSS',
    front: 'Bearing Tree (Witness Tree)',
    back: 'Tree used to reference original corner\n\nRecorded in field notes',
    category: 'definition'
  },
  {
    domain: 'Boundary Law & PLSS',
    front: 'Reference Monument',
    back: 'Additional monument used to recover main point\n\nWitness monument',
    category: 'definition'
  },
  {
    domain: 'Boundary Law & PLSS',
    front: 'Chain of Title',
    back: 'Historical sequence of conveyances of a property\n\nOwnership history',
    category: 'definition'
  },
  {
    domain: 'Boundary Law & PLSS',
    front: 'Call for Record Distance',
    back: 'Interpreted with consideration of measurement error\n\nHistorical context',
    category: 'concept'
  },
  {
    domain: 'Boundary Law & PLSS',
    front: 'Deflection Angle (Boundary)',
    back: 'Angle between forward and back bearings at a point\n\nTurn angle',
    category: 'definition'
  },
  {
    domain: 'Boundary Law & PLSS',
    front: 'Random Traverse (Retracement)',
    back: 'Traverse between known corners\n\nFor proportionate restoration',
    category: 'concept'
  },
  {
    domain: 'Boundary Law & PLSS',
    front: 'Texas Boundary Evidence Rule',
    back: 'When conflict exists:\nMonument > course > distance > area',
    category: 'concept'
  },

  // Domain 6: Geodesy, GPS & Photogrammetry (251-300)
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'Geodesy (Definition)',
    back: 'Science of measuring Earth\'s size, shape, and gravitational field',
    category: 'definition'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'Ellipsoid (Definition)',
    back: 'Mathematical model approximating Earth\'s shape\n\nFlattened sphere',
    category: 'definition'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'Common Ellipsoids',
    back: 'GRS80 (NAD83), WGS84 (GPS), Clarke 1866 (NAD27)',
    category: 'definition'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'Datum (Definition)',
    back: 'Reference system for defining positions on Earth\n\nOrigin + ellipsoid + orientation',
    category: 'definition'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'NAD27 Reference',
    back: 'Based on Clarke 1866 ellipsoid\nMeades Ranch, Kansas origin',
    category: 'definition'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'NAD83 Reference',
    back: 'Based on GRS80\nEarth-centered origin',
    category: 'definition'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'WGS84 Reference',
    back: 'Used by GPS\nNearly identical to NAD83 in North America',
    category: 'definition'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'Datum Shift',
    back: 'Offset caused by using different ellipsoids\nCan be 100+ meters',
    category: 'concept'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'Local Datum',
    back: 'Optimized for one region\nExample: NAD27',
    category: 'definition'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'Geocentric Datum',
    back: 'Earth-centered reference\nNAD83, WGS84',
    category: 'definition'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'Geoid (Definition)',
    back: 'Surface of equal gravity\nApproximates mean sea level',
    category: 'definition'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'Orthometric Height (H)',
    back: 'Height above geoid\nMeasured by leveling',
    category: 'definition'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'Ellipsoidal Height (h)',
    back: 'GPS-derived height above ellipsoid\nDiffers from orthometric',
    category: 'definition'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'Geoid Height (N)',
    back: 'Separation between ellipsoid and geoid\n-100m to +100m globally',
    category: 'definition'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'Height Relationship Formula',
    back: 'h = H + N\n\nEllipsoidal = Orthometric + Geoid separation',
    category: 'formula'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'Gravity Anomaly',
    back: 'Difference between observed and theoretical gravity\nCauses geoid undulation',
    category: 'definition'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'Deflection of the Vertical',
    back: 'Angle between plumb line and ellipsoid normal\nCaused by mass irregularities',
    category: 'definition'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'Level Surface',
    back: 'Surface of equal potential energy (gravity)\nEquipotential surface',
    category: 'definition'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'Map Projection Distortion',
    back: 'Shape, area, distance, or direction errors\nCannot preserve all',
    category: 'concept'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'Conformal Projection',
    back: 'Preserves shape\nTransverse Mercator, Lambert Conformal',
    category: 'definition'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'Equal-Area Projection',
    back: 'Preserves area\nAlbers Equal Area',
    category: 'definition'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'Equidistant Projection',
    back: 'Preserves distance along certain lines\nNot all distances',
    category: 'definition'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'Azimuthal Projection',
    back: 'Projects surface onto plane\nFrom Earth\'s center',
    category: 'definition'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'UTM System',
    back: '60 zones, each 6° wide\nBased on Transverse Mercator',
    category: 'definition'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'UTM Scale Factor at Central Meridian',
    back: '0.9996\n\nSlightly smaller than 1.0',
    category: 'definition'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'State Plane Coordinate System (SPCS)',
    back: 'High-accuracy local grid system for U.S.\nState-specific zones',
    category: 'definition'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'Lambert Conformal Conic Use',
    back: 'For east–west states like Texas\nTwo standard parallels',
    category: 'concept'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'Transverse Mercator Use',
    back: 'For north–south oriented states\nCentral meridian',
    category: 'concept'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'Grid-to-Ground Conversion',
    back: 'Ground = Grid / Combined Factor\n\nCombined Factor = m × k₀',
    category: 'formula'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'Combined Factor (CF)',
    back: 'CF = Elevation Factor × Scale Factor\n\nk = m × k₀',
    category: 'formula'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'GNSS (Definition)',
    back: 'Global Navigation Satellite System\nGPS, GLONASS, Galileo, BeiDou',
    category: 'definition'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'GPS (Definition)',
    back: 'U.S.-based GNSS\nProviding 3D positioning',
    category: 'definition'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'GPS Observable Types',
    back: 'Code phase, carrier phase, Doppler shift\n\nCarrier most accurate',
    category: 'concept'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'GPS Error Sources',
    back: 'Ionospheric delay, tropospheric delay, multipath, satellite clock error',
    category: 'concept'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'Differential GPS (DGPS)',
    back: 'Corrects GPS error using known base station\n\nSub-meter accuracy',
    category: 'definition'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'RTK GPS (Real-Time Kinematic)',
    back: 'Uses carrier phase corrections\nCentimeter accuracy',
    category: 'definition'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'PDOP / GDOP',
    back: 'Dilution of Precision\nSatellite geometry quality - lower is better',
    category: 'definition'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'Minimum Satellites for 3D Fix',
    back: '4 satellites\n\nx, y, z, and time',
    category: 'definition'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'Orthophoto (Definition)',
    back: 'Aerial photo corrected for tilt and scale\nTrue map projection',
    category: 'definition'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'Photogrammetry (Definition)',
    back: 'Measurement and mapping from photographs\nAerial or terrestrial',
    category: 'definition'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'Photo Scale Formula',
    back: 'Scale = f / H\n\nf = focal length\nH = flying height above ground',
    category: 'formula'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'Ground Distance from Photo',
    back: 'D_g = D_p × (H / f)\n\nPhoto distance × scale factor',
    category: 'formula'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'Relief Displacement (d)',
    back: 'd = (r × h) / H\n\nr = radial distance\nh = height diff\nH = flying height',
    category: 'formula'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'End Lap Requirement',
    back: '60% overlap between successive photos\n\nStereoscopic coverage',
    category: 'definition'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'Side Lap Requirement',
    back: '20–30% between flight lines\n\nEnsures coverage',
    category: 'definition'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'Stereoscopic Coverage',
    back: 'Overlapping photos viewed in 3D\n\n60% overlap needed',
    category: 'concept'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'Base-Height Ratio (B/H)',
    back: 'Determines vertical exaggeration\n\nTypically 0.6',
    category: 'concept'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'Parallax (p)',
    back: 'Apparent shift between photo positions\nFor the same point',
    category: 'definition'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'Height Difference from Parallax',
    back: 'Δh = (H × Δp) / (p₁ – p₂)\n\nStereoscopic measurement',
    category: 'formula'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'Aerial Triangulation',
    back: 'Process of extending control through overlapping photos\n\nDensifies control',
    category: 'concept'
  },

  // Domain 7: Professional Practice (301-350)
  {
    domain: 'Professional Practice',
    front: 'Professional Surveyor (Definition)',
    back: 'Licensed to practice surveying\nResponsible for accuracy and integrity',
    category: 'definition'
  },
  {
    domain: 'Professional Practice',
    front: 'FS Exam Purpose',
    back: 'Tests academic knowledge of surveying\nFirst step toward licensure',
    category: 'definition'
  },
  {
    domain: 'Professional Practice',
    front: 'SIT (Surveyor-in-Training)',
    back: 'Certification earned after passing FS\nPrerequisite for RPLS',
    category: 'definition'
  },
  {
    domain: 'Professional Practice',
    front: 'RPLS (Texas)',
    back: 'Registered Professional Land Surveyor\nAuthorized to certify legal boundaries',
    category: 'definition'
  },
  {
    domain: 'Professional Practice',
    front: 'Board of Licensure (Texas)',
    back: 'Texas Board of Professional Engineers and Land Surveyors (TBPELS)',
    category: 'definition'
  },
  {
    domain: 'Professional Practice',
    front: 'Texas Administrative Code 138',
    back: 'Governs rules of conduct for surveyors\nEthics and standards',
    category: 'definition'
  },
  {
    domain: 'Professional Practice',
    front: 'Purpose of Ethics Rules',
    back: 'Protect the public\nEnsure competency and honesty',
    category: 'concept'
  },
  {
    domain: 'Professional Practice',
    front: 'Public Welfare Priority',
    back: 'Always placed above personal or employer interest\n\nParamount rule',
    category: 'concept'
  },
  {
    domain: 'Professional Practice',
    front: 'Misconduct Example',
    back: 'Falsifying measurements\nNeglecting safety standards',
    category: 'concept'
  },
  {
    domain: 'Professional Practice',
    front: 'Seal Misuse',
    back: 'Using professional seal on unreviewed work\nViolation of ethics',
    category: 'concept'
  },
  {
    domain: 'Professional Practice',
    front: 'Professional Liability',
    back: 'Legal responsibility for professional errors\nNegligence claims',
    category: 'definition'
  },
  {
    domain: 'Professional Practice',
    front: 'Negligence Definition',
    back: 'Failure to meet standard of care\nExpected of a professional',
    category: 'definition'
  },
  {
    domain: 'Professional Practice',
    front: 'Standard of Care',
    back: 'Degree of skill and diligence\nOrdinarily practiced by others in field',
    category: 'definition'
  },
  {
    domain: 'Professional Practice',
    front: 'Contract Types',
    back: 'Lump sum, cost-plus, time & materials, unit price',
    category: 'definition'
  },
  {
    domain: 'Professional Practice',
    front: 'Change Order',
    back: 'Written agreement modifying scope, time, or cost\n\nMust be documented',
    category: 'definition'
  },
  {
    domain: 'Professional Practice',
    front: 'Liability Insurance',
    back: 'Protects professionals against claims of negligence\nErrors & omissions',
    category: 'definition'
  },
  {
    domain: 'Professional Practice',
    front: 'Hold Harmless Clause',
    back: 'Contract term transferring risk\nFrom one party to another',
    category: 'definition'
  },
  {
    domain: 'Professional Practice',
    front: 'Indemnification Clause',
    back: 'Requires one party to compensate another for losses\n\nRisk transfer',
    category: 'definition'
  },
  {
    domain: 'Professional Practice',
    front: 'Duty to Disclose Conflicts',
    back: 'Surveyors must reveal potential conflicts of interest\n\nTransparency',
    category: 'concept'
  },
  {
    domain: 'Professional Practice',
    front: 'Confidential Information',
    back: 'Must be protected\nUnless disclosure required by law',
    category: 'concept'
  },
  {
    domain: 'Professional Practice',
    front: 'OSHA (Purpose)',
    back: 'Ensures safe working conditions for employees\n\nOccupational safety',
    category: 'definition'
  },
  {
    domain: 'Professional Practice',
    front: 'Common Survey Hazards',
    back: 'Heat, cold, insects, traffic, electrical lines, unstable terrain',
    category: 'concept'
  },
  {
    domain: 'Professional Practice',
    front: 'Safety Vests and PPE',
    back: 'Required in active construction or roadway environments\n\nVisibility',
    category: 'concept'
  },
  {
    domain: 'Professional Practice',
    front: 'Traffic Control (Survey Crews)',
    back: 'Must comply with MUTCD standards\n\nManual on Uniform Traffic Control Devices',
    category: 'concept'
  },
  {
    domain: 'Professional Practice',
    front: 'Ladder and Tripod Safety',
    back: 'Always check stability and lock before use\n\nPrevent tipping',
    category: 'concept'
  },
  {
    domain: 'Professional Practice',
    front: 'Lightning Safety Rule',
    back: 'Suspend fieldwork when thunder heard within 30 seconds of lightning\n\n30-30 rule',
    category: 'concept'
  },
  {
    domain: 'Professional Practice',
    front: 'Emergency Communication',
    back: 'All crew members must know location, route, radio/phone procedure',
    category: 'concept'
  },
  {
    domain: 'Professional Practice',
    front: 'Job Hazard Analysis (JHA)',
    back: 'Pre-job safety review\nEnvironment, tasks, and controls',
    category: 'definition'
  },
  {
    domain: 'Professional Practice',
    front: 'Incident Reporting',
    back: 'Document and notify supervisor immediately\n\nNo delay',
    category: 'concept'
  },
  {
    domain: 'Professional Practice',
    front: 'Survey Vehicle Safety',
    back: 'Secure instruments\nAvoid obstructing traffic',
    category: 'concept'
  },
  {
    domain: 'Professional Practice',
    front: 'Quality Assurance (QA)',
    back: 'Planned activities to ensure standards are met\n\nProactive',
    category: 'definition'
  },
  {
    domain: 'Professional Practice',
    front: 'Quality Control (QC)',
    back: 'Operational checks during work\nMaintain accuracy',
    category: 'definition'
  },
  {
    domain: 'Professional Practice',
    front: 'Crew Chief Responsibility',
    back: 'Safety, accuracy, communication, documentation\n\nField leadership',
    category: 'concept'
  },
  {
    domain: 'Professional Practice',
    front: 'Field Notes (Legal Importance)',
    back: 'Permanent record\nMust be neat, signed, dated, legible',
    category: 'concept'
  },
  {
    domain: 'Professional Practice',
    front: 'Electronic Data (EDM, GPS)',
    back: 'Must be backed up and traceable\n\nData integrity',
    category: 'concept'
  },
  {
    domain: 'Professional Practice',
    front: 'Digital Signature',
    back: 'Legally binding electronic mark\nAuthentication',
    category: 'definition'
  },
  {
    domain: 'Professional Practice',
    front: 'Document Retention (Texas)',
    back: 'Minimum 10 years for professional records\n\nLegal requirement',
    category: 'definition'
  },
  {
    domain: 'Professional Practice',
    front: 'Client Confidentiality',
    back: 'Maintain unless disclosure legally mandated\n\nPrivacy',
    category: 'concept'
  },
  {
    domain: 'Professional Practice',
    front: 'Conflict Resolution',
    back: 'Address through documentation, communication, ethical action',
    category: 'concept'
  },
  {
    domain: 'Professional Practice',
    front: 'Continuing Education (Texas)',
    back: '12 PDH annually\n1 hour in ethics required',
    category: 'definition'
  },
  {
    domain: 'Professional Practice',
    front: 'Leadership in Surveying',
    back: 'Leading by example\nClear communication, delegation',
    category: 'concept'
  },
  {
    domain: 'Professional Practice',
    front: 'Mentorship Responsibility',
    back: 'Transfer knowledge\nReinforce ethical conduct',
    category: 'concept'
  },
  {
    domain: 'Professional Practice',
    front: 'Sustainable Practice',
    back: 'Promote long-term stewardship of land and resources\n\nEnvironmental awareness',
    category: 'concept'
  },
  {
    domain: 'Professional Practice',
    front: 'Business Development Ethics',
    back: 'Market based on merit and capability\nNo misrepresentation',
    category: 'concept'
  },
  {
    domain: 'Professional Practice',
    front: 'Surveyor\'s Professional Role',
    back: 'Blend of technical expertise, ethical conduct, legal awareness',
    category: 'concept'
  },
  {
    domain: 'Professional Practice',
    front: 'Professional Report Structure',
    back: 'Purpose, procedure, findings, conclusion, certification\n\nComplete documentation',
    category: 'concept'
  },
  {
    domain: 'Professional Practice',
    front: 'Client Communication',
    back: 'Keep records of instructions, clarifications, agreements\n\nDocument everything',
    category: 'concept'
  },
  {
    domain: 'Professional Practice',
    front: 'Dispute Avoidance',
    back: 'Use clear contracts, defined scope, documented deliverables',
    category: 'concept'
  },
  {
    domain: 'Professional Practice',
    front: 'Public Trust Principle',
    back: 'Surveyor\'s integrity ensures credibility of all property records\n\nFoundational principle',
    category: 'concept'
  },
  {
    domain: 'Professional Practice',
    front: 'Lifelong Learning',
    back: 'Maintain proficiency in evolving technologies and laws\n\nContinuous improvement',
    category: 'concept'
  },
  // Domain 5: Surveying Principles (50 cards)
  {
    domain: 'Surveying Principles',
    front: 'Types of Surveys',
    back: 'Boundary, Topographic, Construction, Route, Hydrographic, Geodetic\n\nEach serves different purposes',
    category: 'concept'
  },
  {
    domain: 'Surveying Principles',
    front: 'Boundary Survey',
    back: 'Establishes property lines and corners\nRequires deed research and monumentation\n\nLegal document',
    category: 'definition'
  },
  {
    domain: 'Surveying Principles',
    front: 'Topographic Survey',
    back: 'Maps surface features, contours, and elevations\nUsed for design and planning\n\nShows terrain',
    category: 'definition'
  },
  {
    domain: 'Surveying Principles',
    front: 'Construction Survey',
    back: 'Stakes out design locations on ground\nProvides grades, alignments, offsets\n\nGuides builders',
    category: 'definition'
  },
  {
    domain: 'Surveying Principles',
    front: 'Route Survey',
    back: 'Linear projects: roads, pipelines, utilities\nIncludes alignment, grades, cross-sections\n\nCorridors',
    category: 'definition'
  },
  {
    domain: 'Surveying Principles',
    front: 'Geodetic Survey',
    back: 'Large-scale surveys accounting for Earth curvature\nEstablishes control networks\n\nHigh precision',
    category: 'definition'
  },
  {
    domain: 'Surveying Principles',
    front: 'Horizontal Control',
    back: 'Network of known X,Y positions\nTraverse, triangulation, trilateration, GPS\n\nReference framework',
    category: 'concept'
  },
  {
    domain: 'Surveying Principles',
    front: 'Vertical Control',
    back: 'Network of known elevations (benchmarks)\nDifferential leveling, trigonometric leveling\n\nHeight reference',
    category: 'concept'
  },
  {
    domain: 'Surveying Principles',
    front: 'Benchmark (BM)',
    back: 'Permanent point of known elevation\nUsed as vertical reference\n\nTypically brass disk or monument',
    category: 'definition'
  },
  {
    domain: 'Surveying Principles',
    front: 'Differential Leveling',
    back: 'Determines elevation differences using level and rod\nBS - FS = elevation change\n\nMost accurate method',
    category: 'concept'
  },
  {
    domain: 'Surveying Principles',
    front: 'Backsight (BS)',
    back: 'Rod reading on known elevation point\nAdded to known elevation = HI\n\nFirst reading at setup',
    category: 'definition'
  },
  {
    domain: 'Surveying Principles',
    front: 'Foresight (FS)',
    back: 'Rod reading on unknown point\nHI - FS = new elevation\n\nDetermines unknown elevations',
    category: 'definition'
  },
  {
    domain: 'Surveying Principles',
    front: 'Height of Instrument (HI)',
    back: 'Elevation of telescope line of sight\nHI = Known elev + BS\n\nReference for all foresights',
    category: 'formula'
  },
  {
    domain: 'Surveying Principles',
    front: 'Turning Point (TP)',
    back: 'Temporary point used to transfer elevation\nStable, identifiable surface\n\nUsed in level loops',
    category: 'definition'
  },
  {
    domain: 'Surveying Principles',
    front: 'Level Loop Closure',
    back: 'Return to starting BM to check accuracy\nMisclosure = calculated - known\n\nQuality check',
    category: 'concept'
  },
  {
    domain: 'Surveying Principles',
    front: 'Allowable Leveling Error',
    back: 'C × √(miles) or C × √(km)\nC depends on survey order\n\nFirst order: 0.017 ft/√mi',
    category: 'formula'
  },
  {
    domain: 'Surveying Principles',
    front: 'Electronic Distance Measurement (EDM)',
    back: 'Measures distance using electromagnetic waves\nPhase shift or pulse timing\n\nHigh precision',
    category: 'concept'
  },
  {
    domain: 'Surveying Principles',
    front: 'Total Station',
    back: 'Combines EDM + theodolite + data collector\nMeasures angles and distances\n\nModern surveying workhorse',
    category: 'definition'
  },
  {
    domain: 'Surveying Principles',
    front: 'Prism Constant',
    back: 'Offset correction for EDM prism\nTypically -30mm to -40mm\n\nMust match instrument settings',
    category: 'concept'
  },
  {
    domain: 'Surveying Principles',
    front: 'Atmospheric Corrections (EDM)',
    back: 'Temperature and pressure affect EDM\nPPM correction applied\n\nCritical for long distances',
    category: 'concept'
  },
  {
    domain: 'Surveying Principles',
    front: 'Traverse',
    back: 'Series of connected lines with known angles and distances\nOpen or closed\n\nBasic control method',
    category: 'definition'
  },
  {
    domain: 'Surveying Principles',
    front: 'Closed Traverse',
    back: 'Returns to starting point or closes on known point\nAllows error checking\n\nPreferred for control',
    category: 'definition'
  },
  {
    domain: 'Surveying Principles',
    front: 'Open Traverse',
    back: 'Does not close on known point\nNo check on accumulated errors\n\nRoute surveys, preliminary',
    category: 'definition'
  },
  {
    domain: 'Surveying Principles',
    front: 'Angular Misclosure',
    back: 'Difference between measured and theoretical angle sum\nFor polygon: (n-2) × 180°\n\nCheck before adjusting',
    category: 'formula'
  },
  {
    domain: 'Surveying Principles',
    front: 'Precision vs Accuracy',
    back: 'Precision: consistency of measurements\nAccuracy: closeness to true value\n\nCan be precise but not accurate',
    category: 'concept'
  },
  {
    domain: 'Surveying Principles',
    front: 'Systematic Errors',
    back: 'Consistent, predictable errors\nCan be corrected with calibration\n\nExample: tape length error',
    category: 'definition'
  },
  {
    domain: 'Surveying Principles',
    front: 'Random Errors',
    back: 'Unpredictable, follow normal distribution\nReduced by multiple measurements\n\nCannot be eliminated',
    category: 'definition'
  },
  {
    domain: 'Surveying Principles',
    front: 'Blunders (Mistakes)',
    back: 'Human errors, gross mistakes\nDetected by checking, not by statistics\n\nMust be eliminated',
    category: 'definition'
  },
  {
    domain: 'Surveying Principles',
    front: 'Least Squares Adjustment',
    back: 'Minimizes sum of squared residuals\nOptimal distribution of errors\n\nStatistical method',
    category: 'concept'
  },
  {
    domain: 'Surveying Principles',
    front: 'Compass Rule Adjustment',
    back: 'Distributes error proportional to leg length\nAssumes equal angle and distance precision\n\nSimple traverse adjustment',
    category: 'concept'
  },
  {
    domain: 'Surveying Principles',
    front: 'Transit Rule Adjustment',
    back: 'Corrections proportional to latitudes and departures\nAssumes angles more precise than distances\n\nAlternative to compass rule',
    category: 'concept'
  },
  {
    domain: 'Surveying Principles',
    front: 'State Plane Coordinate System (SPCS)',
    back: 'Projects Earth surface onto plane\nConformal projection (Lambert or TM)\n\nUS grid system',
    category: 'definition'
  },
  {
    domain: 'Surveying Principles',
    front: 'Lambert Conformal Conic',
    back: 'Projection for E-W oriented states\nTwo standard parallels\n\nPreserves angles',
    category: 'definition'
  },
  {
    domain: 'Surveying Principles',
    front: 'Transverse Mercator',
    back: 'Projection for N-S oriented states\nCentral meridian\n\nPreserves angles',
    category: 'definition'
  },
  {
    domain: 'Surveying Principles',
    front: 'Grid vs Ground Distance',
    back: 'Grid = map distance\nGround = actual surface distance\nScale factor relates them',
    category: 'concept'
  },
  {
    domain: 'Surveying Principles',
    front: 'Combined Scale Factor',
    back: 'Grid scale factor × Elevation factor\nConverts ground to grid distance\n\nCSF = GSF × EF',
    category: 'formula'
  },
  {
    domain: 'Surveying Principles',
    front: 'Elevation Factor',
    back: 'R / (R + h)\nWhere R = Earth radius, h = elevation\n\nReduces horizontal distance to ellipsoid',
    category: 'formula'
  },
  {
    domain: 'Surveying Principles',
    front: 'Convergence Angle',
    back: 'Angle between grid north and true north\nVaries with location\n\nMapping angle correction',
    category: 'definition'
  },
  {
    domain: 'Surveying Principles',
    front: 'Horizontal Angle Measurement',
    back: 'Direct and reverse readings averaged\nEliminates systematic errors\n\nCircle left and circle right',
    category: 'concept'
  },
  {
    domain: 'Surveying Principles',
    front: 'Zenith Angle',
    back: 'Vertical angle from zenith (straight up)\n0° = directly overhead\n90° = horizontal',
    category: 'definition'
  },
  {
    domain: 'Surveying Principles',
    front: 'Vertical Angle',
    back: 'Angle above (+) or below (-) horizontal\n+90° = zenith, -90° = nadir\n\nUsed in trigonometric leveling',
    category: 'definition'
  },
  {
    domain: 'Surveying Principles',
    front: 'Trigonometric Leveling',
    back: 'Elevation from slope distance and vertical angle\nΔh = S × cos(zenith) or S × sin(vertical)\n\nAlternative to differential',
    category: 'formula'
  },
  {
    domain: 'Surveying Principles',
    front: 'Stadia',
    back: 'Distance from rod intercept between stadia hairs\nD = K × i + C (K typically 100)\n\nRapid topo method',
    category: 'formula'
  },
  {
    domain: 'Surveying Principles',
    front: 'Radial Survey',
    back: 'Single setup with radiating shots\nFast for detail surveys\n\nTotal station or GPS',
    category: 'concept'
  },
  {
    domain: 'Surveying Principles',
    front: 'Control Point Monumentation',
    back: 'Permanent markers for future use\nBrass cap, iron rod, concrete monument\n\nMust be stable and recoverable',
    category: 'concept'
  },
  {
    domain: 'Surveying Principles',
    front: 'Field Book Requirements',
    back: 'Neat, legible, permanent ink\nDated, signed, no erasures\n\nLegal document',
    category: 'concept'
  },
  {
    domain: 'Surveying Principles',
    front: 'Collimation Error',
    back: 'Line of sight not perpendicular to horizontal axis\nEliminated by averaging direct/reverse\n\nInstrument maladjustment',
    category: 'definition'
  },
  {
    domain: 'Surveying Principles',
    front: 'Two-Peg Test',
    back: 'Field check for level collimation error\nCompare readings at equal and unequal distances\n\nCalibration check',
    category: 'concept'
  },

  // Survey Computations & Applications — Spiral Curves
  {
    domain: 'Survey Computations & Applications',
    front: 'Spiral (Transition) Curve — Purpose',
    back: 'Connects a tangent to a circular curve with gradually increasing curvature\n\nAllows smooth vehicle steering and gradual superelevation application\n\nCurvature increases linearly from 0 at TS to 1/R at SC',
    category: 'concept'
  },
  {
    domain: 'Survey Computations & Applications',
    front: 'Spiral Angle (θs) Formula',
    back: 'θs = Ls × D / 200 (degrees)\n\nOr: θs (radians) = Ls / (2R)\n\nWhere:\n• Ls = spiral length (ft)\n• D = degree of circular curve\n• R = radius of circular curve',
    category: 'formula'
  },
  {
    domain: 'Survey Computations & Applications',
    front: 'Spiral Layout Points (in order)',
    back: 'TS → SC → CS → ST\n\n• TS: Tangent to Spiral (start of first spiral)\n• SC: Spiral to Curve (start of circular arc)\n• CS: Curve to Spiral (end of circular arc)\n• ST: Spiral to Tangent (end of second spiral)',
    category: 'definition'
  },
  {
    domain: 'Survey Computations & Applications',
    front: 'Xs and Ys (Spiral Coordinates)',
    back: 'Xs = distance from TS to SC along initial tangent\nYs = perpendicular offset from tangent to SC\n\nApprox:\nXs ≈ Ls(1 – θs²/10)\nYs ≈ Ls × θs_rad / 3\n\nθs must be in radians for series',
    category: 'formula'
  },
  {
    domain: 'Survey Computations & Applications',
    front: 'Shift (p) and Throw (k)',
    back: 'p = Ys – R(1 – cos θs)\n(shift = perpendicular offset of circular arc from tangent)\n\nk = Xs – R sin θs\n(throw = along-tangent offset)\n\nBoth locate the shifted circular curve center',
    category: 'formula'
  },
  {
    domain: 'Survey Computations & Applications',
    front: 'Spiral Tangent Length (Ts)',
    back: 'Ts = (R + p) × tan(Δ/2) + k\n\nWhere:\n• R = radius, p = shift, k = throw\n• Δ = total deflection angle\n\nTS station = PI station – Ts',
    category: 'formula'
  },
  {
    domain: 'Survey Computations & Applications',
    front: 'Circular Arc Angle in SCS Layout',
    back: 'Circular arc angle = Δ – 2θs\n\nCircular arc length = R × (Δ – 2θs) × π/180\n\nEach spiral uses θs of the total deflection angle Δ',
    category: 'formula'
  },
  {
    domain: 'Survey Computations & Applications',
    front: 'Long Tangent (LT) and Short Tangent (STg)',
    back: 'Note: "STg" = Short Tangent (geometric leg); "ST" = Spiral-to-Tangent station point\n\nLT = Xs – Ys / tan(θs)\n(along tangent, from TS to foot of ⊥ from SC)\n\nSTg = Ys / sin(θs)\n(from foot of ⊥ up to SC point)\n\nUsed to stake SC from TS in field',
    category: 'formula'
  },
  {
    domain: 'Survey Computations & Applications',
    front: 'Spiral Stationing Sequence',
    back: 'TS station: PI – Ts\nSC station: TS + Ls\nCS station: SC + (arc length)\nST station: CS + Ls\n\nArc length = R × (Δ – 2θs) × π/180',
    category: 'concept'
  },
  {
    domain: 'Survey Computations & Applications',
    front: 'Spiral Clothoid Property',
    back: 'Radius × arc length = constant (= Ls × R)\n\nAt TS: radius = ∞ (tangent, zero curvature)\nAt SC: radius = R (full circular curvature)\n\nCurvature increases linearly along the spiral',
    category: 'concept'
  },
  {
    domain: 'Survey Computations & Applications',
    front: 'Spiral Angle Quick Check',
    back: 'θs = Ls × D / 200\n\nExample checks:\n• Ls=200, D=4° → θs = 4°\n• Ls=300, D=6° → θs = 9°\n• Ls=400, D=3° → θs = 6°\n\nLarger Ls or sharper D → larger θs',
    category: 'concept'
  },
  {
    domain: 'Survey Computations & Applications',
    front: 'Spiral vs Simple Circular Curve Tangent',
    back: 'Simple curve: T = R × tan(Δ/2)\n\nSpiral-curve-spiral: Ts = (R + p) × tan(Δ/2) + k\n\nAs Ls → 0: p → 0, k → 0, Ts → T\nSpiral always increases tangent length',
    category: 'concept'
  },

  // Construction Surveying & Land Development (Task #11)
  {
    domain: 'Surveying Principles',
    front: 'Grade Rod Formula',
    back: 'Grade Rod = HI − Grade Elevation\n\nWhere:\n• HI = Bench Mark Elevation + Backsight\n• Grade Elevation = design finish elevation from plans\n\nGrade rod = rod reading that would exist if ground were exactly at grade',
    category: 'formula'
  },
  {
    domain: 'Surveying Principles',
    front: 'Cut vs. Fill Determination',
    back: 'Rod Reading < Grade Rod → Ground ABOVE grade → CUT needed\n  Cut = Grade Rod − Rod Reading\n\nRod Reading > Grade Rod → Ground BELOW grade → FILL needed\n  Fill = Rod Reading − Grade Rod\n\nMemory tip: Higher rod reading = deeper hole = fill needed',
    category: 'concept'
  },
  {
    domain: 'Surveying Principles',
    front: 'Offset Stake Notation',
    back: 'Example: C 2.35 / 12.0R / 12+50\n\n• C 2.35 = Cut of 2.35 ft at the design point\n• 12.0R = stake is 12.0 ft to the RIGHT of centerline\n• 12+50 = station 1,250 ft from project origin\n\nF = Fill; L = Left; R = Right',
    category: 'concept'
  },
  {
    domain: 'Surveying Principles',
    front: 'Slope Stake Offset Formula',
    back: 'Offset = Half-Width (HW) + Slope Ratio (z) × Cut or Fill depth\n\nOffset = HW + z × d\n\nExample: HW=20 ft, z=2:1, cut=4 ft\nOffset = 20 + 2 × 4 = 28 ft from centerline\n\nRequires iterative field checking on variable terrain',
    category: 'formula'
  },
  {
    domain: 'Surveying Principles',
    front: 'Blue-Top Staking',
    back: 'Stakes driven so their TOPS are exactly at design finish grade\n\nCheck: Grade Rod = HI − Design Elevation\nRod on stake top should equal grade rod\n\nRod reading > grade rod → stake top is below grade → RAISE stake\nRod reading < grade rod → stake top is above grade → DRIVE DEEPER\n\nUsed for parking lots, pads, athletic fields',
    category: 'concept'
  },
  {
    domain: 'Surveying Principles',
    front: 'Hub Stake vs. Lath Stake',
    back: 'Hub stake: wooden stake driven flush with ground\n• Purpose: precise elevation reference point\n• Not marked with text (protected surface)\n\nLath stake: thin stake or flagging next to hub\n• Purpose: displays readable info for operators\n• Shows: station, offset, cut/fill amount',
    category: 'concept'
  },
  {
    domain: 'Surveying Principles',
    front: 'As-Built Survey',
    back: 'Documents actual constructed locations and elevations after construction is complete\n\nAlso called: record survey, red-line survey\n\nCaptures: alignment deviations, utility inverts/rims, structure locations, finish grades\n\nUses same control network as original layout for direct comparison to design',
    category: 'concept'
  },
  {
    domain: 'Surveying Principles',
    front: 'Subdivision Platting Sequence',
    back: '1. Conceptual/Sketch Plan (rough layout, initial feedback)\n2. Preliminary Plat (detailed drawing for agency review)\n3. Final Plat (field-accurate; signed & sealed by licensed surveyor)\n4. Recording (filed in deed records; creates legal lot boundaries)',
    category: 'concept'
  },
  {
    domain: 'Surveying Principles',
    front: 'Dedication vs. Easement in Subdivisions',
    back: 'Dedication: transfers FEE SIMPLE title to governmental entity\n• Public owns the right-of-way\n• Common for streets, parks\n• Created by plat note: "hereby dedicated to the public"\n\nEasement: grants a USE RIGHT only\n• Grantor retains fee title\n• Common for utilities, drainage\n• Owner cannot block the easement purpose',
    category: 'concept'
  },
  {
    domain: 'Surveying Principles',
    front: 'Lot-and-Block Legal Description',
    back: 'Three required parts:\n1. Lot number\n2. Block number\n3. Subdivision name + recorded plat reference (Vol., Pg., County)\n\nExample:\n"Lot 14, Block 3, Meadow Ridge Subdivision, Vol. 42, Pg. 18-21, Plat Records, Travis County, Texas"\n\nActual dimensions found on the recorded plat — not in the deed',
    category: 'concept'
  },
  {
    domain: 'Surveying Principles',
    front: 'Setback / Building Lines',
    back: 'Minimum distances from property lines within which no structure may be built\n\n• Front setback: from street-side lot line\n• Rear setback: from rear lot line\n• Side setbacks: from each side lot line\n\nBuildable width = lot width − (left side + right side setbacks)\nBuildable depth = lot depth − (front + rear setbacks)',
    category: 'concept'
  },

  // LiDAR, Remote Sensing & Graphical Communication (Task #13)
  {
    domain: 'Mapping, GIS, and CAD',
    front: 'LiDAR — Active vs. Passive',
    back: 'LiDAR is ACTIVE remote sensing\n\nActive: generates its own energy (laser pulses); measures time of flight\nPassive: records energy from external sources (sun) — cameras, multispectral scanners\n\nOther active systems: RADAR (microwaves), SONAR (acoustics)\nOther passive systems: aerial photography, thermal IR, multispectral imaging\n\nKey advantage of active: can operate day or night; independent of sunlight',
    category: 'concept'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    front: 'ASPRS LiDAR Classification Codes',
    back: 'Standard classification codes:\n• Class 0: Unclassified\n• Class 2: Ground (bare earth)\n• Class 3: Low vegetation\n• Class 4: Medium vegetation\n• Class 5: High vegetation\n• Class 6: Buildings\n• Class 7: Low noise\n• Class 9: Water\n• Class 17: Bridge deck\n\nClass 2 (Ground) → DEM\nClass 5 + 6 → DSM',
    category: 'concept'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    front: 'DEM vs. DSM vs. nDSM',
    back: 'DEM (Digital Elevation Model):\n• Bare-earth surface only\n• Built from Class 2 ground returns\n• Used for hydrology, earthwork, slope analysis\n\nDSM (Digital Surface Model):\n• All surfaces: buildings, trees, structures\n• Built from first returns\n\nnDSM = DSM − DEM\n• Height of objects above bare earth\n• Used to measure tree/building heights',
    category: 'concept'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    front: 'LiDAR IMU — Purpose',
    back: 'IMU = Inertial Measurement Unit\n\nRecords aircraft attitude (roll, pitch, yaw) at high frequency (≥200 Hz)\n\nCombined with GNSS position, the IMU allows precise calculation of the 3D direction of each laser pulse at the moment of emission\n\nWithout IMU: aircraft tilt and vibration make it impossible to geolocate individual laser returns\n\nResult: accurate X, Y, Z coordinates for every point in the cloud',
    category: 'concept'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    front: 'Required Survey Map Elements',
    back: 'Every survey plat/drawing must include:\n1. Title block — project, client, surveyor info, date, scale, sheet #\n2. North arrow — type labeled (True, Grid, Magnetic)\n3. Scale — graphic bar scale + RF or verbal scale\n4. Legend — all symbols, line types, hatching explained\n5. Datum reference — horizontal (NAD83) and vertical (NAVD88)\n6. Certification — surveyor\'s seal, signature, and professional statement\n7. Coordinate grid or tick marks\n\nGraphic bar scale is the only element that remains accurate if drawing is enlarged or reduced',
    category: 'concept'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    front: 'Graphic Scale vs. Representative Fraction',
    back: 'Graphic Scale Bar:\n• Drawn on the map face\n• Proportionally correct at any print size (shrinks/enlarges with the drawing)\n• Survives photocopying, resizing, PDF scaling\n\nRepresentative Fraction (RF): e.g., 1:24,000\n• Becomes incorrect if print size changes\n• "1 inch = 2,000 feet" → true only at original print size\n\nFor exam: graphic scale remains accurate after reduction; RF and verbal scale do NOT',
    category: 'concept'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    front: 'Grid North vs. True North vs. Magnetic North',
    back: 'True (Astronomic) North:\n• Direction of Earth\'s geographic north pole\n• Based on astronomic observations or GNSS\n\nGrid North:\n• Direction of State Plane grid lines (north-south)\n• Differs from true north by the convergence angle (varies with location)\n\nMagnetic North:\n• Direction a compass needle points\n• Differs from true north by magnetic declination\n• Changes over time (secular variation)\n\nConvergence angle: true N to grid N\nDeclination: true N to magnetic N',
    category: 'concept'
  },

  {
    domain: 'Mapping, GIS, and CAD',
    front: 'Contour Line Rules',
    back: '1. Every point on a contour = same elevation\n2. Contours never cross or branch\n3. Every contour eventually closes\n4. Close spacing = steep slope; wide spacing = gentle slope\n5. V shape pointing UPHILL → valley/stream\n6. V shape pointing DOWNHILL → ridge/divide\n7. Closed loop with hachures = depression\n8. Contours cross streams perpendicularly (V points upstream)\n\nIndex contours (every 5th line) = labeled and drawn heavier',
    category: 'concept'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    front: 'Planimetric vs. Topographic Map',
    back: 'Planimetric Map:\n• Shows horizontal positions only (roads, buildings, water)\n• NO elevation data\n• 2D top-view representation\n\nTopographic Map:\n• Planimetric features PLUS terrain shape\n• Shown via contour lines, spot elevations, or shading\n• Provides both horizontal and vertical information\n\nFor engineering: topographic map → base for design plans',
    category: 'concept'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    front: 'DTM vs. DEM vs. TIN',
    back: 'DTM (Digital Terrain Model):\n• Bare-earth surface\n• May include break lines (ridge tops, road edges, stream banks)\n• Best for representing abrupt surface changes\n\nDEM (Digital Elevation Model):\n• Bare-earth raster grid from LiDAR ground returns (Class 2)\n• Uniform grid spacing; no break lines\n\nTIN (Triangulated Irregular Network):\n• Vector surface connecting irregularly spaced points\n• Triangular facets; can honor break lines\n• Efficient for variable-density survey data',
    category: 'concept'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    front: 'NSSDA Map Accuracy Standards',
    back: 'NSSDA = National Standard for Spatial Data Accuracy (FGDC)\n\nReports accuracy at 95% confidence:\n• Horizontal: 1.7308 × RMSEr\n• Vertical: 1.9600 × RMSEZ\n\nRMSEZ = sqrt(σ² + mean²)\n\nUSGS LiDAR Quality Levels:\n• QL3: RMSEZ ≤ 20 cm, ≥1 pt/m²\n• QL2: RMSEZ ≤ 10 cm, ≥2 pts/m²\n• QL1: RMSEZ ≤ 9.25 cm, ≥8 pts/m²\n\nAccuracy tested against independent check points',
    category: 'concept'
  },

  // Basic Sciences, Dendrology & Historical Methods (Task #14)
  {
    domain: 'Math & Basic Science',
    front: 'Gunter\'s Chain — Key Relationships',
    back: '1 chain = 66 ft = 4 rods = 100 links\n1 link = 0.66 ft = 7.92 inches\n80 chains = 1 mile\n10 square chains = 1 acre\n\nArea (acres) = (L × W in chains) ÷ 10\n\nGLO distances recorded in chains and links\ne.g., "42 lks" = 42 × 0.66 = 27.72 ft',
    category: 'formula'
  },
  {
    domain: 'Math & Basic Science',
    front: 'Witness Tree / Bearing Tree — Restoration',
    back: 'GLO field notes record FROM the corner TO the tree:\n"W. Oak, 18 in dia, bears N 45 E, 35 lks"\n\nTo restore the corner:\n• Reverse the bearing: S 45 W\n• Convert distance: 35 × 0.66 = 23.1 ft\n• Measure S 45 W, 23.1 ft from the tree\n\nSurviving witness tree = obliterated corner evidence\nCorner can be restored without proportionate measurement',
    category: 'procedure'
  },
  {
    domain: 'Math & Basic Science',
    front: 'Common Witness Tree Species (PLSS)',
    back: 'White Oak (Quercus alba): light gray plated bark, rounded leaf lobes\nBlack Oak (Quercus velutina): dark furrowed bark, pointed leaf lobes\nBur Oak (Quercus macrocarpa): fringed acorn cap, fire-resistant bark\nSugar Maple (Acer saccharum): gray-brown flaky bark, 5-lobed leaf\nBlack Walnut (Juglans nigra): dark ridged bark, compound leaf, round green fruit\nBasswood (Tilia americana): smooth gray bark, heart-shaped leaf\n\nUsed to verify species matches GLO description during PLSS retracement',
    category: 'concept'
  },
  {
    domain: 'Math & Basic Science',
    front: 'Combined Curvature & Refraction Correction',
    back: 'C + R = 0.0675 × K² (meters, K in km)\nC + R ≈ 0.574 × M² (feet, M in miles)\n\nSubtract from long rod readings\n\nExample: 2 km distance:\n0.0675 × (2)² = 0.270 m\n\nEliminated by balancing BS and FS distances in differential leveling\n(correction cancels when equal sights are used)',
    category: 'formula'
  },
  {
    domain: 'Math & Basic Science',
    front: 'EDM Atmospheric Correction',
    back: 'EDM measures velocity of electromagnetic waves in air\nVelocity depends on: temperature, pressure, humidity\n\nHigher temp → lower density → lower refractive index → waves travel faster → distance reads SHORT\nLower pressure → same direction\n\nCorrection (ppm):\n• +1°C above standard → −1 ppm (too short)\n• +1 mm Hg pressure → +0.37 ppm\n\nMust enter field temp/pressure into instrument to apply meteorological correction',
    category: 'formula'
  },
  {
    domain: 'Math & Basic Science',
    front: 'Steel Tape Thermal Correction',
    back: 'C_t = α × L × ΔT\n\nα = 6.45 × 10⁻⁶ per °F (or 1.16 × 10⁻⁵ per °C)\nL = tape length measured\nΔT = field temperature − standard temperature\n\nPositive ΔT (hot): tape is longer than standard → correction is POSITIVE\nNegative ΔT (cold): tape is shorter → correction is NEGATIVE\n\nExample: 500 ft at +27°F above standard:\nC = 6.45×10⁻⁶ × 500 × 27 = +0.087 ft',
    category: 'formula'
  },
  {
    domain: 'Math & Basic Science',
    front: 'USCS Soil Classification — Key Symbols',
    back: 'G = Gravel, S = Sand, M = Silt, C = Clay, O = Organic, Pt = Peat\nW = Well-graded, P = Poorly-graded, L = Low plasticity, H = High plasticity\n\nGood foundation soils: GW, GP, SW, SP\nModerate: GM, GC, SM, SC, ML, CL\nPoor: MH, CH (expansive), OL, OH (organic)\nUnsuitable: Pt (peat)\n\nCH = high-plasticity clay — most problematic for foundations (shrink-swell)',
    category: 'concept'
  },
  {
    domain: 'Math & Basic Science',
    front: 'Solar Observation / Sun Shot',
    back: 'Historical method used by GLO surveyors to establish astronomic (true) north\n\nProcess: Observe the sun\'s position, record time, apply sun\'s declination and hour angle, observer\'s latitude → compute azimuth to sun → establish true meridian\n\nAdvantage over magnetic compass: independent of local magnetic attraction and secular variation\n\nGLO instructions: required astronomic meridian at intervals; more reliable meridian than compass alone',
    category: 'concept'
  },

  {
    domain: 'Math & Basic Science',
    front: 'Magnetic Declination — Secular Variation',
    back: 'Secular variation: slow, long-term change in magnetic declination\nCaused by: gradual movement of Earth\'s magnetic poles\nRate: varies by location; typically a few minutes per year\n\nImpact on historical surveys:\n• 1850 declination 4° E + modern 2° W = 6° total change\n• Must correct original compass bearings by total secular change\n\nContrast with local attraction: short-range deflection from nearby metallic objects or geology\nSolution: use NOAA historical declination calculator for retracement surveys',
    category: 'concept'
  },
  {
    domain: 'Math & Basic Science',
    front: 'Historical Surveying Instruments',
    back: 'Gunter\'s Chain (1620): 66-ft chain; standard for GLO surveys\nCompass (Brunton/transit): magnetic direction; subject to declination and local attraction\nVernier Transit: measures horizontal and vertical angles to arc-minute precision\nSolar Compass / Burt\'s Solar Transit: establishes true north from sun observations; independent of magnetic\nRod and Level: optical leveling instrument for differential leveling\nAstrolabe / Sextant: early astronomic direction/latitude instruments\nStadia Rod: distance measurement by vertical intercept × 100 (stadia ratio)',
    category: 'concept'
  },
  {
    domain: 'Math & Basic Science',
    front: 'Earthwork Volume — Bank / Loose / Compacted',
    back: 'BCY (Bank Cubic Yards): in-situ volume before excavation\nLCY (Loose CY): expanded volume after digging; BCY × swell factor\nCCY (Compacted CY): final placed/compacted volume; BCY × compaction factor\n\nConversions:\nLCY = BCY × (1 + % swell / 100)\nCCY = BCY × compaction factor\n\nExample:\n1,000 BCY clay, swell 30%, compaction 0.85:\nLCY = 1,300 (for trucking)\nCCY = 850 (final fill volume)',
    category: 'formula'
  },

  // Business Concepts, Safety & Professional Communication (Task #15)
  {
    domain: 'Professional Practice',
    front: 'Business Structures for Survey Firms',
    back: 'Sole Proprietorship: owner = business; full personal liability\nPartnership (General): all partners personally liable\nLLP: limits partner liability for other partners\' acts\nPC / PLLC: protects from general business debts; each licensee still personally liable for own negligence\n\nE&O insurance remains essential in all structures\nNo business form eliminates professional liability for your own negligent work',
    category: 'concept'
  },
  {
    domain: 'Professional Practice',
    front: 'Fee Arrangement Types',
    back: 'Fixed Fee (Lump Sum): set total price; surveyor bears cost risk; rewards efficiency\nHourly (Time & Materials): actual time + materials; client bears cost risk\nCost Plus Fixed Fee: actual costs reimbursed + fixed professional fee\nUnit Price: fee per deliverable (per lot, per monument); repetitive work\nRetainer: recurring fee for ongoing availability\n\nRisk allocation:\nFixed fee → surveyor risk\nT&M / Cost Plus → client risk',
    category: 'concept'
  },
  {
    domain: 'Professional Practice',
    front: 'Essential Contract Elements for Survey Services',
    back: '1. Scope of Services — precise description of work and exclusions\n2. Standards / Specifications — ALTA/NSPS, state MTS, etc.\n3. Compensation — fee, schedule, extra services process\n4. Timeline — milestones, delivery, delay provisions\n5. Ownership of Documents — who owns drawings and data\n6. Limitation of Liability — cap on damages (varies by state)\n7. Dispute Resolution — mediation, arbitration, or litigation\n\nAll scope changes → written change order before additional work begins',
    category: 'concept'
  },
  {
    domain: 'Professional Practice',
    front: 'OSHA Excavation Safety (29 CFR 1926 Subpart P)',
    back: 'Protective system required for:\n• Any excavation ≥ 5 ft deep in UNSTABLE soil\n• Any excavation ≥ 20 ft deep regardless of soil type\n\nProtective systems: shoring, shielding (trench box), or sloping\nCompetent person must inspect daily before workers enter\nDesigns for ≥ 20 ft require a registered PE\n\nSurveying relevance: survey crews encounter trenches on construction sites',
    category: 'concept'
  },
  {
    domain: 'Professional Practice',
    front: 'ANSI/ISEA Safety Vest Classes for Roadway Work',
    back: 'Class 1: basic visibility — off-road, low traffic environments\nClass 2: required for roadway work where speeds ≤ 50 mph\nClass 3: required for roadway work where speeds > 50 mph (highways)\n\nMUTCD compliance required for all survey crews in rights-of-way\nHighway work → Class 3 mandatory\n\nAlso required: shadow vehicle (truck with arrow board/attenuator) behind survey crew on active lanes',
    category: 'concept'
  },
  {
    domain: 'Professional Practice',
    front: 'Standard of Care & Professional Negligence',
    back: 'Standard of care: level of skill and diligence that a reasonably competent surveyor would exercise under similar circumstances\n\nNOT perfection — errors alone do not equal negligence\nNOT based solely on contract specs or client satisfaction\n\nNegligence = falling below the standard of care\nE&O insurance covers professional negligence claims\nStatute of limitations: usually begins at DISCOVERY of error (discovery rule), not date of work',
    category: 'concept'
  },
  {
    domain: 'Professional Practice',
    front: 'Surveyor\'s Report / Letter of Opinion',
    back: 'Narrative document explaining the basis for a boundary determination\n\nContents:\n• Record evidence reviewed (deeds, plats, prior surveys)\n• Physical evidence found (monuments, occupation, fences)\n• Conflicts in the record and how they were resolved\n• Professional judgment applied\n\nDistinct from the plat — provides context that cannot be shown graphically\nCritical in boundary dispute litigation\nSurveyor\'s certification on plat ≠ surveyor\'s report',
    category: 'concept'
  },

  {
    domain: 'Professional Practice',
    front: 'E&O Insurance — Claims-Made vs. Occurrence',
    back: 'Claims-Made Policy (most common for surveyors):\n• Covers claims FILED during the policy period\n• Work must have occurred AFTER the retroactive date\n• Gaps in coverage = uninsured claims from that gap period\n• Need TAIL COVERAGE (extended reporting endorsement) when policy lapses\n\nOccurrence Policy:\n• Covers incidents that OCCURRED during the policy period\n• No need for tail coverage after cancellation\n• More expensive; rare for professional liability\n\nRetroactive date: earliest date prior work is covered',
    category: 'concept'
  },
  {
    domain: 'Professional Practice',
    front: 'Tail Coverage / Prior Acts Coverage',
    back: 'Tail Coverage (Extended Reporting Endorsement):\n• Extends the REPORTING period after a claims-made policy expires\n• Typically purchased when: retiring, switching insurers, closing firm\n• Claims filed after policy expiration for prior work are still covered\n• Usually costs 150–300% of annual premium\n\nPrior Acts Coverage:\n• New policy retroactive date set BEFORE the new policy\'s effective date\n• Fills gap when switching from one insurer to another\n\nWithout either: prior work can be uninsured even years after policy lapse',
    category: 'concept'
  },
  {
    domain: 'Professional Practice',
    front: 'Change Order Process',
    back: 'Triggered when: scope of work changes beyond original contract\n\nProcess:\n1. Discover changed scope or unforeseen conditions\n2. STOP work on changed items (or flag the additional effort)\n3. Notify client immediately — in writing\n4. Prepare written change order describing: scope, cost, schedule impact\n5. Obtain signed client approval BEFORE proceeding\n6. Never perform out-of-scope work on verbal agreement alone\n\nKey principle: all scope changes → written change order\nRisk of skipping: no legal basis for additional compensation',
    category: 'procedure'
  },

  // Least Squares & Positional Accuracy (Task #12)
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'Least Squares Adjustment — Purpose',
    back: 'Finds the most probable values of unknowns when redundant observations exist\n\nMinimizes: Σ(p·v²) = vᵀPv (weighted sum of squared residuals)\n\nProvides:\n• Optimal adjusted values\n• Statistical quality measures\n• Basis for blunder detection\n\nRequired for ALTA/NSPS, geodetic control, and all rigorous network adjustments',
    category: 'concept'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'Redundancy (Degrees of Freedom)',
    back: 'r = n − u\n\nn = number of observations\nu = number of unknowns\n\nInterpretation:\n• r = 0: exactly determined, no quality check possible\n• r ≥ 1: over-determined, adjustment possible\n• Higher r = more statistical power to detect blunders\n\nExample: 15 observations, 10 unknowns → r = 5',
    category: 'formula'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'Residual (v)',
    back: 'v = adjusted value − observed value\n\nResiduals represent the best estimate of random error in each measurement\n\nIn least squares, Σ(p·v²) is MINIMIZED\n\nLarge residuals → suspect observation for blunder\nAll residuals should be random, not systematic',
    category: 'concept'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'Standard Error of Unit Weight (σ₀)',
    back: 'σ₀ = √(vᵀPv / r)\n\nTarget value: 1.0\n\n• σ₀ ≈ 1.0 → good fit\n• σ₀ >> 1.0 → residuals too large → blunder or underestimated variances\n• σ₀ << 1.0 → residuals too small → overestimated (too pessimistic) variances\n\nAlso written: S₀, SEUW',
    category: 'formula'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'Observation Weight (p)',
    back: 'p = σ₀² / σᵢ²\n\np is inversely proportional to variance\n\nHigher precision (smaller σ) → higher weight → smaller residual after adjustment\nLower precision (larger σ) → lower weight → larger residual\n\nEqual-weight adjustment: all pᵢ = 1',
    category: 'formula'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'Chi-Squared Test (Goodness of Fit)',
    back: 'Test statistic: χ² = vᵀPv / σ₀²(apriori)\n\nAcceptance: χ²_lower ≤ vᵀPv ≤ χ²_upper\n\n• Reject H₀ if too high → errors larger than expected (possible blunder)\n• Reject H₀ if too low → errors smaller than expected (over-pessimistic weights)\n\nDegrees of freedom: r = n − u',
    category: 'concept'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'Positional Error Ellipse',
    back: 'Describes 2D uncertainty of an adjusted position\n\nParameters:\n• Semi-major axis (a): largest uncertainty direction\n• Semi-minor axis (b): smallest uncertainty direction\n• Orientation angle (θ): direction of semi-major axis from north\n\nCircular ellipse (a ≈ b) → equal constraint all directions\nElongated ellipse → poor constraint in one direction\n\n95% ellipse contains true position at 95% confidence',
    category: 'concept'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'ALTA/NSPS Relative Positional Precision (RPP)',
    back: 'RPP = √(σ_ΔN² + σ_ΔE²)\n\nALTA/NSPS 2026 Tolerance:\nRPP ≤ 2 cm (0.07 ft) + 50 ppm × D\n\nExample: D = 1,000 ft\nTolerance = 0.07 + (50×10⁻⁶ × 1,000) = 0.07 + 0.05 = 0.12 ft\n\nDerived from least squares covariance matrix — requires formal adjustment',
    category: 'formula'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'Relative Positional Precision vs. Closure Ratio',
    back: 'Closure ratio (traverse): linear misclosure / total length\n• Simple check, but not rigorous\n• Does not give positional uncertainty of each monument pair\n\nRPP (ALTA/NSPS): derived from least squares covariance matrix\n• Rigorous — accounts for network geometry and observation weights\n• Required for ALTA/NSPS compliance\n• Different monument pairs can have different RPP values',
    category: 'concept'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'Minimum Redundancy for Statistical Testing',
    back: 'r = n − u ≥ 1 required for any quality testing\n\nr = 0: exactly determined (unique solution, no residuals, no quality check)\nr = 1: one redundant observation; σ₀ computable, but limited blunder detection\nr ≥ 5: sufficient for meaningful chi-squared testing\n\nMore redundancy = stronger blunder detection capability',
    category: 'concept'
  },

  // Additional Mapping, GIS, and CAD Flashcards (Task #13 supplemental)
  {
    domain: 'Mapping, GIS, and CAD',
    front: 'Active vs. Passive Remote Sensing',
    back: 'Active Sensors: Generate and emit their own electromagnetic energy; detect the return\n• LiDAR: emits laser pulses; measures time of flight → range\n• RADAR/SAR: emits microwave radiation\n• Can operate day or night; independent of sunlight\n\nPassive Sensors: Detect naturally occurring energy (sunlight or thermal emission)\n• Aerial photography, multispectral scanners, thermal IR cameras\n• Require adequate illumination (except thermal IR, which detects emitted heat)\n• Cannot penetrate cloud cover or operate in darkness (except thermal)\n\nKey FS exam rule: LiDAR = active; aerial photo = passive',
    category: 'concept'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    front: 'LiDAR Pulse Return Types',
    back: 'Single pulse may produce multiple returns as laser strikes surfaces at different heights:\n\nFirst Return:\n• Earliest reflected signal\n• Top of canopy, rooftop, or highest surface hit\n• Used to build Digital Surface Model (DSM)\n\nLast Return:\n• Final reflected signal (deepest penetration)\n• Often ground surface or bare earth in canopy gaps\n• Basis for ground filtering → Digital Elevation Model (DEM)\n\nIntermediate Returns:\n• Mid-canopy layers, branches\n• Used for vegetation structure analysis (forestry)\n\nModern systems: up to 4–7+ discrete returns per pulse, or full-waveform capture',
    category: 'concept'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    front: 'USGS LiDAR Quality Levels (QL1 / QL2 / QL3)',
    back: 'Quality Level 3 (QL3) — Basic:\n• Nominal pulse density: ≥ 1 pt/m²\n• RMSEZ ≤ 20 cm (non-vegetated)\n• Standard topographic mapping, flood plains\n\nQuality Level 2 (QL2) — Standard (most common):\n• Nominal pulse density: ≥ 2 pts/m²\n• RMSEZ ≤ 10 cm\n• Statewide programs, floodplain mapping, infrastructure\n\nQuality Level 1 (QL1) — High Resolution:\n• Nominal pulse density: ≥ 8 pts/m²\n• RMSEZ ≤ 10 cm\n• Engineering design, bridge/dam inspection, corridor mapping\n\nHigher QL = more points + better accuracy = more cost',
    category: 'concept'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    front: 'Standard Required Elements on a Survey Plat',
    back: 'Every survey plat must contain:\n1. Title Block — project name, location, client, surveyor name/license, firm, date, revision history, sheet number\n2. North Arrow — labeled with type: True North, Grid North, or Magnetic North\n3. Scale — graphic (bar) scale + verbal or RF scale\n4. Legend — all symbols, line types, hatch patterns, monument types decoded\n5. Basis of Bearings — reference meridian or deed line used for all bearings\n6. Datum Reference — horizontal (NAD83, WGS84) and vertical (NAVD88) datums\n7. Certificate/Seal Block — surveyor\'s certification statement, seal, signature\n8. Notes — methods, instruments, closure, monument descriptions, disclaimers\n\nALTA/NSPS also requires encroachments, easements, improvements, and utilities (per Table A/B items)',
    category: 'concept'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    front: 'Graphic Scale vs. Representative Fraction (RF)',
    back: 'Graphic (Bar) Scale:\n• A drawn line on the map labeled with ground distances\n• Automatically scales correctly when the drawing is copied at a different size\n• Always remains accurate relative to the drawing\n• Required whenever drawings may be reproduced\n\nRepresentative Fraction (RF):\n• Expressed as 1:X (e.g., 1:10,000 means 1 unit on map = 10,000 units on ground)\n• Only accurate at the original drawing size\n• Becomes WRONG if plan is enlarged or reduced during copying\n\nVerbal Scale (e.g., "1 in = 100 ft"):\n• Same problem as RF — only accurate at original size\n\nBest practice: Always include BOTH a graphic scale and an RF/verbal scale',
    category: 'concept'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    front: 'GIS Data Models: Vector vs. Raster',
    back: 'Vector Data Model:\n• Represents features as points, lines, and polygons with precise coordinates\n• Points: wells, monuments, trees\n• Lines: roads, streams, pipelines\n• Polygons: parcels, lakes, building footprints\n• Supports topology (adjacency, connectivity, containment)\n• Best for discrete features with defined boundaries\n\nRaster Data Model:\n• Divides space into a grid of equal-sized cells (pixels)\n• Each cell stores one value (elevation, land cover code, image intensity)\n• Resolution = cell size (smaller cell = finer resolution)\n• Best for continuous surfaces (DEMs, orthophotos, temperature grids)\n• File size grows rapidly with finer resolution\n\nHybrid: GIS projects typically use both models together',
    category: 'concept'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    front: 'Common Geospatial File Formats',
    back: 'Raster formats:\n• GeoTIFF (.tif): standard for georeferenced imagery and DEMs; projection embedded in file header\n• IMG (.img): ERDAS IMAGINE raster format\n• JPEG2000 (.jp2): compressed imagery with georeferencing\n\nVector formats:\n• Shapefile (.shp): industry standard; requires .shp + .dbf + .shx + .prj files\n• GeoJSON (.geojson): web-friendly; stores geometries and attributes in JSON\n• File Geodatabase (.gdb): Esri format; supports topology and relationships\n\nPoint Cloud formats:\n• LAS (.las): binary; stores XYZ + intensity + classification + return info\n• LAZ (.laz): compressed LAS; widely used for storage and transfer\n\nCAD formats:\n• DXF: AutoCAD exchange format; used for interoperability\n• DWG: native AutoCAD format',
    category: 'concept'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    front: 'LiDAR Boresight Calibration',
    back: 'Purpose: corrects the angular misalignment between the laser scanner and the IMU (roll, pitch, and yaw offsets)\n\nProcedure:\n1. Fly calibration strip(s) over flat, well-defined surfaces (airports, rooftops, or known-flat terrain) in multiple directions (e.g., opposing flight lines)\n2. Compare LiDAR returns from overlapping swaths — systematic offsets indicate boresight error\n3. Derive correction angles for scanner-to-IMU mounting misalignment\n4. Apply corrections to raw data before generating point cloud\n\nWithout proper calibration: DEM shows swath-to-swath offsets (steps or ridges along flight line boundaries)\n\nFlight strip overlap: typically 20–30% to enable boresight calibration and gap detection',
    category: 'procedure'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    front: 'DTM vs. DEM vs. DSM — Definitions',
    back: 'Digital Terrain Model (DTM):\n• Bare-earth surface with man-made structures and vegetation REMOVED\n• Represents the natural ground surface\n• Produced by filtering LiDAR ground returns (Class 2)\n• Used for: hydrology, floodplain mapping, contour generation\n\nDigital Elevation Model (DEM):\n• A general term for any raster elevation surface\n• In practice, often used interchangeably with DTM (bare-earth)\n• USGS DEMs are bare-earth products\n\nDigital Surface Model (DSM):\n• Represents the TOP of all surfaces including buildings, trees, and structures\n• Produced from first LiDAR returns (highest surfaces)\n• Shows canopy tops, rooftops, bridges\n• Used for: viewshed analysis, solar panel siting, building height extraction\n\nnDSM (Normalized DSM): DSM − DTM = height of objects above bare earth',
    category: 'concept'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    front: 'NSSDA Accuracy Standards Summary',
    back: 'National Standard for Spatial Data Accuracy (NSSDA):\n\nHorizontal Accuracy (95% confidence):\n= 1.7308 × RMSEr\nwhere RMSEr = √(RMSEx² + RMSEy²) / √2 (or combined RMSE of horizontal residuals)\n\nVertical Accuracy (95% confidence):\n= 1.9600 × RMSEZ\n\nRMSEZ when mean error ≠ 0:\nRMSEZ = √(σ² + mean²)\n\nCheck point requirements:\n• Minimum 20 well-distributed check points per landcover class (open, urban, forest)\n• Check points must be independent from calibration control\n• Higher accuracy standard than required product (2–3× better)\n\nReport example: "Tested 2.5 m horizontal accuracy at 95% confidence level per NSSDA"',
    category: 'formula'
  },
];



