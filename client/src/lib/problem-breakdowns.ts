// Topic-specific 4-step breakdowns for the "Stuck? Try the 4-step breakdown"
// helper. Each breakdown tailors the four universal steps (understand,
// formula, units, sense-check) to a specific problem type. Questions are
// matched by their `topic` tag first, then by keywords in the question text,
// then by domain, and finally fall back to the generic breakdown.

export interface BreakdownStep {
  description: string;
  prompts: string[];
}

export interface ProblemBreakdown {
  id: string;
  label: string;
  understand: BreakdownStep;
  formula: BreakdownStep;
  units: BreakdownStep;
  sense: BreakdownStep;
}

interface BreakdownMatcher {
  breakdownId: string;
  topics?: string[];
  keywords?: RegExp;
  domains?: string[];
  priority: number;
}

export const PROBLEM_BREAKDOWNS: Record<string, ProblemBreakdown> = {
  'horizontal-curve': {
    id: 'horizontal-curve',
    label: 'Horizontal Curve',
    understand: {
      description: 'Identify which curve elements are given and which one you need.',
      prompts: [
        'Which are given: radius (R), degree of curve (D), central angle (Δ), tangent (T), length (L), chord (C)?',
        'Is it asking for a curve element, or a station (PC, PT, PI)?',
        'Arc definition or chord definition of D? FS/PS problems almost always use arc definition.',
      ],
    },
    formula: {
      description: 'Pick the curve formula that connects your knowns to the unknown.',
      prompts: [
        'R = 5729.58 / D (arc definition)',
        'T = R·tan(Δ/2), L = R·Δ (Δ in radians) or L = 100·Δ/D, C = 2R·sin(Δ/2)',
        'Stations: PC = PI − T, PT = PC + L (add along the ARC, not the chord)',
      ],
    },
    units: {
      description: 'Curve problems mix degrees, minutes, and stations — a classic trap.',
      prompts: [
        'Convert Δ from D-M-S to decimal degrees before using tan or sin.',
        'Calculator in degree mode? (Radians only when using L = R·Δ.)',
        'Stations: 12+34.56 means 1234.56 ft. Keep station math in feet.',
      ],
    },
    sense: {
      description: 'Check magnitudes against typical curve geometry.',
      prompts: [
        'T and C should both be SHORTER than L for the same curve.',
        'A sharper curve (bigger D) means a smaller R — do they move in opposite directions?',
        'PT station must be larger than PC station.',
      ],
    },
  },
  'vertical-curve': {
    id: 'vertical-curve',
    label: 'Vertical Curve',
    understand: {
      description: 'Sort out the grades, curve length, and what point you need.',
      prompts: [
        'What are g1 and g2 (incoming/outgoing grades, with signs)?',
        'Is it asking for an elevation, the high/low point location, or curve length?',
        'Where is the BVC (beginning of vertical curve)? Elevations are computed from there.',
      ],
    },
    formula: {
      description: 'Vertical curves are parabolas — one main equation covers most questions.',
      prompts: [
        'Elevation: y = y_BVC + g1·x + [(g2 − g1)/(2L)]·x²',
        'High/low point: x = −g1·L/(g2 − g1) from the BVC',
        'Rate of grade change: r = (g2 − g1)/L',
      ],
    },
    units: {
      description: 'Grades and distances must be consistent.',
      prompts: [
        'Grades as decimals (−2% = −0.02) or percents — pick one and stay consistent.',
        'Is L in feet or stations? If g is in %, use L in stations for the r formula.',
        'Keep the SIGNS of the grades — a sag curve has g1 < g2.',
      ],
    },
    sense: {
      description: 'Check the shape of the curve against your answer.',
      prompts: [
        'Crest curve (g1 > g2): high point exists; sag (g1 < g2): low point exists.',
        'The high/low point x must land between 0 and L.',
        'Curve elevations should fall between (or slightly off) the tangent elevations.',
      ],
    },
  },
  leveling: {
    id: 'leveling',
    label: 'Differential Leveling',
    understand: {
      description: 'Trace the rod readings through the level loop.',
      prompts: [
        'Which readings are backsights (BS, +) and which are foresights (FS, −)?',
        'Is it asking for an elevation, a misclosure, or an allowable error?',
        'What benchmark elevation do you start from?',
      ],
    },
    formula: {
      description: 'Leveling is bookkeeping: add backsights, subtract foresights.',
      prompts: [
        'HI = known elevation + BS; new elevation = HI − FS',
        'Check: ΣBS − ΣFS = ending elevation − starting elevation',
        'Allowable misclosure: C = k·√M (k depends on order; M = distance in miles) or mm·√km',
      ],
    },
    units: {
      description: 'Watch the rod units and the loop distance units.',
      prompts: [
        'Rod readings in feet or meters? Elevations must match.',
        'For allowable error: distance in MILES for ft formulas, KILOMETERS for mm formulas.',
        'A misclosure in feet vs a limit in mm — convert before comparing.',
      ],
    },
    sense: {
      description: 'Small numbers should stay small.',
      prompts: [
        'Misclosure should be tiny (hundredths of a foot) — a big number means a sign error.',
        'Going uphill? Elevations should increase. Downhill? Decrease.',
        'Did you apply the check ΣBS − ΣFS before trusting the answer?',
      ],
    },
  },
  'traverse-bearing': {
    id: 'traverse-bearing',
    label: 'Traverse / Bearings & Azimuths',
    understand: {
      description: 'Pin down the directions and what the question wants.',
      prompts: [
        'Are directions given as bearings (N 45° E) or azimuths (0–360° from north)?',
        'Is it asking for a direction, a latitude/departure, a misclosure, or an adjusted value?',
        'Interior angles: do they sum to (n−2)·180°?',
      ],
    },
    formula: {
      description: 'Convert to azimuths, then use lat/dep for everything else.',
      prompts: [
        'Latitude = distance·cos(azimuth); Departure = distance·sin(azimuth)',
        'Linear misclosure = √(ΣLat² + ΣDep²); precision = misclosure / perimeter',
        'Compass (Bowditch) rule: correction = −misclosure × (leg length / perimeter)',
      ],
    },
    units: {
      description: 'Direction conversions are where most points are lost.',
      prompts: [
        'Convert bearings to azimuths carefully: NE = bearing, SE = 180° − bearing, SW = 180° + bearing, NW = 360° − bearing.',
        'D-M-S to decimal degrees before any trig.',
        'Back-azimuth = azimuth ± 180°.',
      ],
    },
    sense: {
      description: 'Signs tell you the quadrant — check them.',
      prompts: [
        'North latitude is +, south is −; east departure is +, west is −.',
        'Does the computed direction land in the right quadrant for the sketch?',
        'A closed traverse should have ΣLat ≈ 0 and ΣDep ≈ 0 before adjustment.',
      ],
    },
  },
  area: {
    id: 'area',
    label: 'Area Computation',
    understand: {
      description: 'Figure out what boundary data you have.',
      prompts: [
        'Do you have coordinates, lat/deps (DMDs), or a simple geometric shape?',
        'Is the figure closed? Area formulas assume a closed polygon.',
        'Is it asking for area in sq ft, acres, or hectares?',
      ],
    },
    formula: {
      description: 'Coordinates → shoelace; lat/dep → DMD; shapes → geometry.',
      prompts: [
        'Shoelace: Area = ½|Σ(xᵢ·yᵢ₊₁ − xᵢ₊₁·yᵢ)|',
        'DMD: Area = ½|Σ(DMD × latitude)|',
        'Segments of circles: A = ½R²(Δ − sinΔ), Δ in radians.',
      ],
    },
    units: {
      description: 'Area unit conversion is almost always the final step.',
      prompts: [
        '1 acre = 43,560 sq ft. Memorize it.',
        '1 hectare = 10,000 m². 1 sq mile = 640 acres.',
        'Are the coordinates in feet or meters before you square them?',
      ],
    },
    sense: {
      description: 'Sanity-check against a rough bounding box.',
      prompts: [
        'Does the area fit inside a rectangle around the extreme coordinates?',
        'A negative shoelace result just means you went clockwise — take the absolute value.',
        'City lot ≈ 0.1–0.5 acre; a section = 640 acres. Is your magnitude in a sane range?',
      ],
    },
  },
  'state-plane': {
    id: 'state-plane',
    label: 'State Plane / Grid Coordinates',
    understand: {
      description: 'Separate ground, grid, and geodetic quantities.',
      prompts: [
        'Are the given distances ground, grid, or ellipsoidal?',
        'Which factors are given: scale factor, elevation factor, combined factor, convergence angle?',
        'Is it asking for a distance conversion or an azimuth (grid vs geodetic) conversion?',
      ],
    },
    formula: {
      description: 'Chain the factors in the right direction.',
      prompts: [
        'Combined factor = scale factor × elevation factor',
        'Grid distance = ground distance × combined factor (and divide to go back)',
        'Geodetic azimuth = grid azimuth + convergence (± t−T for long lines)',
      ],
    },
    units: {
      description: 'Factors are near 1 — precision matters.',
      prompts: [
        'Keep 6–7 decimal places in scale/elevation factors.',
        'Elevation factor uses ellipsoid height: EF ≈ R/(R + h), R ≈ 20,906,000 ft.',
        'US survey foot vs international foot matters for state plane coordinates.',
      ],
    },
    sense: {
      description: 'Grid vs ground differences are small but directional.',
      prompts: [
        'Above the ellipsoid, ground distance > grid distance (EF < 1).',
        'The correction is usually a few parts per 10,000 — a huge change means an inverted factor.',
        'Did you multiply when you should have divided? Check the direction of conversion.',
      ],
    },
  },
  photogrammetry: {
    id: 'photogrammetry',
    label: 'Photogrammetry',
    understand: {
      description: 'Identify the camera geometry pieces you were given.',
      prompts: [
        'What are the focal length (f), flying height (H), and terrain elevation (h)?',
        'Is it asking for photo scale, ground distance, relief displacement, or overlap/coverage?',
        'Is H above ground or above datum? (Scale uses H − h.)',
      ],
    },
    formula: {
      description: 'Almost everything flows from the scale relationship.',
      prompts: [
        'Photo scale S = f / (H − h)',
        'Relief displacement: d = r·Δh / (H − h)',
        'Ground coverage = photo size / scale; new photo every (1 − overlap) × coverage.',
      ],
    },
    units: {
      description: 'Focal lengths are tiny, flying heights are huge — unify them.',
      prompts: [
        'f is usually in mm or inches; H in feet or meters. Convert to ONE system.',
        '6-inch focal length = 152.4 mm — a very common camera.',
        'Scale as a ratio (1:12,000) vs a fraction (1 in = 1000 ft): 1 in = 1000 ft is 1:12,000.',
      ],
    },
    sense: {
      description: 'Check the scale direction and magnitude.',
      prompts: [
        'Higher terrain (closer to the camera) = LARGER photo scale.',
        'Typical mapping photo scales run 1:3,000 to 1:40,000.',
        'Relief displacement is radially OUTWARD from the photo center for points above datum.',
      ],
    },
  },
  'distance-corrections': {
    id: 'distance-corrections',
    label: 'Taping / EDM Corrections',
    understand: {
      description: 'List every correction the problem mentions.',
      prompts: [
        'Which corrections apply: temperature, tension/sag, slope, standardization?',
        'Is the tape too long or too short compared to standard?',
        'Measuring a distance vs laying out a distance? Corrections flip sign.',
      ],
    },
    formula: {
      description: 'Compute each correction separately, then combine.',
      prompts: [
        'Temperature: C = 0.00000645 × (T − 68°F) × L (steel, per °F)',
        'Slope: horizontal = slope·cos(vertical angle), or C ≈ −h²/(2s)',
        'Tape too LONG when measuring → record distance is too SHORT → ADD the correction.',
      ],
    },
    units: {
      description: 'Corrections are small — units and signs dominate.',
      prompts: [
        '°F vs °C changes the expansion coefficient (6.45×10⁻⁶/°F vs 1.16×10⁻⁵/°C).',
        'Keep h (elevation difference) and s (slope distance) in the same units.',
        'Answers are usually to 0.01 ft — don\u2019t round intermediate steps.',
      ],
    },
    sense: {
      description: 'Corrections should be small; signs should follow the physical story.',
      prompts: [
        'Each correction is typically hundredths or tenths of a foot per 100 ft.',
        'Hot tape expands → tape is long → measured value understates → add.',
        'Horizontal distance is always ≤ slope distance.',
      ],
    },
  },
  'gnss-gps': {
    id: 'gnss-gps',
    label: 'GPS / GNSS',
    understand: {
      description: 'Identify the GNSS concept being tested.',
      prompts: [
        'Is it about method (static, RTK, OPUS), accuracy, error sources, or heights?',
        'Ellipsoid height vs orthometric height vs geoid height — which are involved?',
        'How many satellites/baselines/occupation times are mentioned?',
      ],
    },
    formula: {
      description: 'The height relationship is the most-tested formula.',
      prompts: [
        'h = H + N (ellipsoid height = orthometric height + geoid height)',
        'Geoid height N is NEGATIVE across most of the continental US.',
        'DOP: lower is better; PDOP < 6 is a common field threshold.',
      ],
    },
    units: {
      description: 'Heights come in meters more often than feet.',
      prompts: [
        'GNSS results are usually meters — does the answer want feet?',
        'Watch sign conventions on N when rearranging h = H + N.',
        'Meters to US survey feet: × 3937/1200.',
      ],
    },
    sense: {
      description: 'Check against typical GNSS behavior.',
      prompts: [
        'Vertical accuracy is roughly 2× worse than horizontal for GNSS.',
        'In CONUS, N ≈ −8 to −53 m, so ellipsoid height < orthometric height.',
        'RTK ≈ cm-level; autonomous ≈ meters. Does the stated accuracy match the method?',
      ],
    },
  },
  'error-statistics': {
    id: 'error-statistics',
    label: 'Errors & Statistics',
    understand: {
      description: 'Classify the error question first.',
      prompts: [
        'Random error, systematic error, or blunder? Only random errors follow statistics.',
        'Is it asking for standard deviation, standard error of the mean, or error propagation?',
        'How many measurements (n), and are they equally weighted?',
      ],
    },
    formula: {
      description: 'Match the statistic to what is asked.',
      prompts: [
        'σ = √[Σ(v²)/(n−1)]; standard error of the mean = σ/√n',
        'Error of a sum: E = √(e1² + e2² + …); of a series of n alike: E = e·√n',
        '90% error = 1.645σ, 95% = 1.960σ (multiply, don\u2019t add)',
      ],
    },
    units: {
      description: 'Errors carry the units of the measurement.',
      prompts: [
        'Residuals v = measurement − mean, keep the signs when squaring.',
        'n − 1 in the denominator for sample standard deviation, not n.',
        'Angular errors in seconds vs distance errors in feet — don\u2019t mix in propagation.',
      ],
    },
    sense: {
      description: 'More measurements should mean more confidence.',
      prompts: [
        'The standard error of the mean is always SMALLER than σ of one observation.',
        'Higher confidence level (95% vs 90%) = LARGER error bound.',
        'An error bigger than the measurement spread signals an arithmetic slip.',
      ],
    },
  },
  earthwork: {
    id: 'earthwork',
    label: 'Earthwork & Volumes',
    understand: {
      description: 'Identify the volume method the data supports.',
      prompts: [
        'Do you have cross-section end areas, spot elevations on a grid, or contours?',
        'Cut, fill, or both? Keep them separate.',
        'What is the distance (or grid spacing) between sections?',
      ],
    },
    formula: {
      description: 'End areas for sections; prismoidal only if asked.',
      prompts: [
        'Average end area: V = L·(A1 + A2)/2 (in cubic ft, then ÷27 for yd³)',
        'Prismoidal: V = L·(A1 + 4Am + A2)/6 — only when the problem says prismoidal.',
        'Borrow-pit grid: V = (grid area/4)·(Σh1 + 2Σh2 + 3Σh3 + 4Σh4)',
      ],
    },
    units: {
      description: 'The cubic-yard conversion is the classic trap.',
      prompts: [
        '1 cubic yard = 27 cubic feet — divide, don\u2019t multiply.',
        'Areas in sq ft × length in ft = cubic ft, not yards.',
        'Stations: L between sections is usually 100 ft (one full station).',
      ],
    },
    sense: {
      description: 'Compare against a simple average.',
      prompts: [
        'The volume should be close to (average area × length) — big deviations mean a slip.',
        'Prismoidal volume is usually slightly LESS than average-end-area for typical shapes.',
        'Did the answer ask for yd³? A number 27× too big forgot the conversion.',
      ],
    },
  },
  trigonometry: {
    id: 'trigonometry',
    label: 'Trig / Triangle Solving',
    understand: {
      description: 'Sketch the triangle and label everything.',
      prompts: [
        'Which sides and angles are known? (Draw it — always.)',
        'Right triangle or oblique? That decides the tool.',
        'Is the unknown a side, an angle, or a height/offset?',
      ],
    },
    formula: {
      description: 'Right triangles use SOH-CAH-TOA; oblique use sine/cosine law.',
      prompts: [
        'Law of sines: a/sin A = b/sin B (need a side-angle pair)',
        'Law of cosines: c² = a² + b² − 2ab·cos C (two sides + included angle)',
        'Angles of a triangle sum to 180° — use it to find the third angle free.',
      ],
    },
    units: {
      description: 'Angle mode errors are silent and deadly.',
      prompts: [
        'Calculator in DEGREE mode (unless the problem is in radians).',
        'Convert D-M-S to decimal degrees: 30°15\u203245\u2033 = 30 + 15/60 + 45/3600.',
        'Vertical angle vs zenith angle: zenith = 90° − vertical angle.',
      ],
    },
    sense: {
      description: 'Check against the sketch.',
      prompts: [
        'Largest side is opposite the largest angle.',
        'sin and cos outputs are between −1 and 1; an impossible triangle gives errors.',
        'Law of sines can be ambiguous (two solutions) — does the sketch pick one?',
      ],
    },
  },
  'boundary-legal': {
    id: 'boundary-legal',
    label: 'Boundary / Legal Principles',
    understand: {
      description: 'Legal questions test priorities and definitions, not math.',
      prompts: [
        'What is the conflict: monuments vs distances? Senior vs junior rights? Deed vs occupation?',
        'Who are the parties, and when did each interest arise (dates matter)?',
        'Is this a PLSS (sectionalized) question or a metes-and-bounds question?',
      ],
    },
    formula: {
      description: 'Apply the priority of calls and controlling doctrines.',
      prompts: [
        'Order of calls: (1) natural monuments, (2) artificial monuments, (3) adjoiners, (4) courses/distances, (5) area.',
        'Senior rights: the first deed out gets what it was granted; the junior gets the remainder.',
        'Original monuments control over record measurements — even when they disagree.',
      ],
    },
    units: {
      description: 'Here "units" means terms of art — read them precisely.',
      prompts: [
        'Distinguish look-alike terms: e.g., easement vs license, riparian vs littoral, accretion vs avulsion.',
        'Words like "shall" vs "may", "grant" vs "reserve" flip the meaning.',
        'Check WHO holds the right and WHO bears the burden in each option.',
      ],
    },
    sense: {
      description: 'Eliminate options that break settled doctrine.',
      prompts: [
        'An answer letting record distances beat found original monuments is almost always wrong.',
        'The surveyor FINDS boundaries; only courts and landowners can move them.',
        'Watch for the "most correct" pattern — two options may be partly true; pick the more complete one.',
      ],
    },
  },
  plss: {
    id: 'plss',
    label: 'PLSS / Public Lands',
    understand: {
      description: 'Locate the parcel inside the PLSS hierarchy.',
      prompts: [
        'Read the description from the END backward: start at the section, then subdivide.',
        'Township/range: which direction from the principal meridian and baseline?',
        'Is it asking for an area, a location, or a restoration/subdivision procedure?',
      ],
    },
    formula: {
      description: 'Standard PLSS dimensions do most of the work.',
      prompts: [
        'Section = 1 mile square = 640 acres; quarter = 160; quarter-quarter = 40.',
        'Each halving of a description halves the acreage: NE¼ SW¼ = 40 acres.',
        'Sections number 1–36 boustrophedon (snake) starting NE corner of the township.',
      ],
    },
    units: {
      description: 'Chains and links appear in old descriptions.',
      prompts: [
        '1 chain = 66 ft = 100 links; 80 chains = 1 mile.',
        '1 acre = 10 square chains — handy for old descriptions.',
        'Convention: excess/deficiency goes to the north and west tiers of a township.',
      ],
    },
    sense: {
      description: 'Check the acreage arithmetic.',
      prompts: [
        'Multiply the fractions: ½ × ¼ × 640 = 80 acres. Does yours check?',
        'Lost corners are restored by proportionate measure; obliterated corners by collateral evidence — different things.',
        'Sketch the section and shade the aliquot part — it prevents most errors.',
      ],
    },
  },
  'business-professional': {
    id: 'business-professional',
    label: 'Professional / Business Practice',
    understand: {
      description: 'Identify whose duty and which standard is at issue.',
      prompts: [
        'Who is the question about — the licensee, the client, the public, an employee?',
        'Is it ethics (duty), liability (negligence), contracts, or licensure rules?',
        'What EXACTLY is being asked: the best FIRST action, or the required action?',
      ],
    },
    formula: {
      description: 'Apply the governing hierarchy of obligations.',
      prompts: [
        'The public\u2019s safety and welfare outranks the client\u2019s interest — always.',
        'Negligence needs: duty, breach of standard of care, causation, damages.',
        'Practice only in areas of competence; sign/seal only work under your responsible charge.',
      ],
    },
    units: {
      description: 'Precision here means reading the wording precisely.',
      prompts: [
        'Watch absolutes: "always", "never", "must" — often mark a wrong option.',
        '"May" (permitted) vs "shall" (required) changes the answer.',
        'Check dates and deadlines if the question involves procedure.',
      ],
    },
    sense: {
      description: 'Pick the most professional, most protective answer.',
      prompts: [
        'When two answers seem right, the one protecting the public usually wins.',
        'Disclosing conflicts and documenting decisions is rarely the wrong choice.',
        'An option that hides, delays, or shades the truth is almost never correct.',
      ],
    },
  },
  'gis-mapping': {
    id: 'gis-mapping',
    label: 'Mapping / GIS / CAD',
    understand: {
      description: 'Pin down the data model or map property in question.',
      prompts: [
        'Raster or vector? Which geometry (point/line/polygon)?',
        'Is it about datums/projections, topology, metadata, or map scale/accuracy?',
        'Which standard is referenced (NMAS, ASPRS, NSSDA)?',
      ],
    },
    formula: {
      description: 'Scale and accuracy relationships cover the math side.',
      prompts: [
        'Map scale: 1 in = X ft ⇒ ratio 1:(12X).',
        'Contour interval vs vertical accuracy: NMAS says 90% within ½ contour interval.',
        'Ground distance = map distance × scale denominator.',
      ],
    },
    units: {
      description: 'Scale conversions trip people up.',
      prompts: [
        '1:24,000 means 1 inch = 2,000 ft (24,000/12).',
        'Larger scale = more detail = SMALLER denominator (1:600 is larger scale than 1:24,000).',
        'Pixel/ground-sample distance in the same units as the accuracy standard?',
      ],
    },
    sense: {
      description: 'Test the answer against the scale logic.',
      prompts: [
        'Zooming from 1:24,000 to 1:6,000 should make features 4× bigger — does your ratio behave?',
        'Datum questions: NAD83 vs NAD27 shifts can be ~10s of meters — not centimeters.',
        'Topology errors (gaps, overlaps) are about geometry rules, not attribute values.',
      ],
    },
  },
  'field-procedures': {
    id: 'field-procedures',
    label: 'Field Procedures & Instruments',
    understand: {
      description: 'Identify the instrument, procedure, and goal being tested.',
      prompts: [
        'Which instrument: total station, level, theodolite, GNSS receiver, data collector?',
        'Is it about a procedure (setup, calibration, checking) or about accuracy/error sources?',
        'What is the field task trying to achieve or verify?',
      ],
    },
    formula: {
      description: 'Most field questions test standard procedures and checks.',
      prompts: [
        'Double-centering (direct + reverse) cancels most instrument errors.',
        'Peg test checks level collimation; two-peg setups isolate the error.',
        'Balancing BS/FS distances cancels collimation and curvature/refraction errors.',
      ],
    },
    units: {
      description: 'Match tolerances to their units and instrument specs.',
      prompts: [
        'Angular specs in seconds (e.g., 5″ instrument); distance specs in mm + ppm.',
        'Curvature & refraction: ≈ 0.574·M² ft (M in miles) — grows with distance squared.',
        'Centering errors are in mm; does the answer\u2019s unit match the question?',
      ],
    },
    sense: {
      description: 'Check the answer against good field practice.',
      prompts: [
        'Procedures that include an independent check are usually the right answer.',
        'Averaging direct and reverse readings should REDUCE error, never add steps for nothing.',
        'Does the chosen method actually detect or cancel the error the question describes?',
      ],
    },
  },
  'general-computation': {
    id: 'general-computation',
    label: 'Survey Computation',
    understand: {
      description: 'Organize the given values before computing anything.',
      prompts: [
        'List every given value with its units — write them down.',
        'What single quantity is the question asking for?',
        'Sketch the geometry if there is any — most survey math has a picture.',
      ],
    },
    formula: {
      description: 'Connect knowns to the unknown with one relationship at a time.',
      prompts: [
        'Which basic relationship applies: trig, proportion, coordinate geometry, or unit conversion?',
        'Can you break the problem into two smaller steps (find X first, then use X)?',
        'Rearrange the formula for the unknown BEFORE plugging in numbers.',
      ],
    },
    units: {
      description: 'Unit conversions decide many of these problems.',
      prompts: [
        'Key conversions: 1 ch = 66 ft, 1 vara (TX) = 33⅓ in, 1 m = 3.2808 ft, 1 ac = 43,560 sq ft.',
        'D-M-S ↔ decimal degrees before any trig.',
        'Carry units through the calculation — they should cancel to the answer\u2019s unit.',
      ],
    },
    sense: {
      description: 'Estimate before you accept.',
      prompts: [
        'Round the inputs and do a 10-second mental estimate — is your answer the same magnitude?',
        'Check against the answer choices: are you off by exactly 27, 43,560, or 5280? That\u2019s a unit slip.',
        'Does the sign/direction make sense on your sketch?',
      ],
    },
  },
  'areas-practice': {
    id: 'areas-practice',
    label: 'Areas of Practice',
    understand: {
      description: 'Identify which specialty area and what aspect of it is being tested.',
      prompts: [
        'Which practice area: construction, geodetic, hydrographic, ALTA/title, route, as-built?',
        'Is it asking about a definition, a required procedure, or a deliverable/standard?',
        'Who relies on this work product (contractor, lender, agency, public)?',
      ],
    },
    formula: {
      description: 'Match the practice area to its governing standard or purpose.',
      prompts: [
        'ALTA/NSPS surveys: title insurance; follow the current ALTA/NSPS minimum standards + Table A.',
        'Construction staking: offsets, grade sheets, cut/fill from design to ground.',
        'Hydrographic: depths referenced to a tidal/water datum; geodetic: works on the ellipsoid.',
      ],
    },
    units: {
      description: 'Each specialty has its own conventions — check them.',
      prompts: [
        'Construction: cut/fill in feet + tenths; stationing along the alignment.',
        'Hydrographic: soundings and datums (MLLW); geodetic: meters and ellipsoid heights.',
        'Precision requirements differ by purpose — control > boundary > topo, typically.',
      ],
    },
    sense: {
      description: 'Match the answer to the purpose of the survey.',
      prompts: [
        'The right answer usually serves the survey\u2019s PURPOSE (title, construction, navigation).',
        'An option demanding survey-grade precision for a rough task (or vice versa) is suspect.',
        'Deliverables should match the standard named in the question.',
      ],
    },
  },
  'water-boundaries': {
    id: 'water-boundaries',
    label: 'Water Boundaries',
    understand: {
      description: 'Identify the water body type and the movement type.',
      prompts: [
        'Navigable or non-navigable? Tidal or non-tidal? This sets who owns the bed.',
        'Did the water move gradually (accretion/erosion) or suddenly (avulsion)?',
        'Which line matters: OHWM, mean high water, thread of the stream, gradient boundary?',
      ],
    },
    formula: {
      description: 'Movement type decides whether the boundary moves.',
      prompts: [
        'Gradual change (accretion/reliction/erosion): the boundary MOVES with the water.',
        'Sudden change (avulsion): the boundary STAYS at the old location.',
        'Riparian = rivers/streams; littoral = lakes/oceans.',
      ],
    },
    units: {
      description: 'Terms of art control — define each precisely.',
      prompts: [
        'Accretion (gain by deposit) vs reliction (gain by water receding) vs erosion (loss).',
        'Mean high water = 19-year tidal average (a tidal epoch), not one season.',
        'In Texas questions: gradient boundary applies on navigable streams.',
      ],
    },
    sense: {
      description: 'Check the outcome against the doctrine.',
      prompts: [
        'An owner gaining land from a sudden river jump (avulsion) is usually the WRONG answer.',
        'State typically owns beds of navigable waters — options contradicting that are suspect.',
        'Does the answer keep upland owners touching the water where riparian rights exist?',
      ],
    },
  },
};

const MATCHERS: BreakdownMatcher[] = [
  { breakdownId: 'vertical-curve', priority: 100, keywords: /vertical curve|sag curve|crest curve|BVC|EVC|grade of [+-]|g1|g2|parabolic/i },
  { breakdownId: 'horizontal-curve', priority: 90, topics: ['Curves'], keywords: /horizontal curve|degree of curve|central angle|point of curvature|point of tangency|\bPC\b.*\bPT\b|tangent distance|curve.*radius|radius.*curve|circular curve|spiral/i },
  { breakdownId: 'leveling', priority: 90, keywords: /levels? (were|was) run|leveling|level loop|backsight|foresight|height of instrument|benchmark|turning point|rod reading|three-wire|misclosure.*level|invert elevation/i },
  { breakdownId: 'photogrammetry', priority: 90, topics: ['Photogrammetry'], keywords: /photogrammetr|aerial photo|focal length|flying height|relief displacement|endlap|sidelap|overlap.*photo|stereo|lidar|orthophoto|ground sample/i },
  { breakdownId: 'state-plane', priority: 88, topics: ['State Plane'], keywords: /state plane|grid distance|ground distance|combined factor|scale factor|elevation factor|convergence|grid azimuth|geodetic azimuth|lambert|transverse mercator|low distortion/i },
  { breakdownId: 'gnss-gps', priority: 86, keywords: /\bGPS\b|GNSS|satellite|RTK|OPUS|ellipsoid height|geoid|orthometric|PDOP|GDOP|baseline.*solution|CORS|multipath/i },
  { breakdownId: 'earthwork', priority: 85, keywords: /earthwork|end area|prismoidal|borrow pit|cubic yard|cut and fill|\bcut\b.*\bfill\b|volume of (cut|fill|excavation)|mass diagram|cross[- ]section.*area.*station/i },
  { breakdownId: 'distance-corrections', priority: 84, keywords: /tape|taping|EDM|temperature correction|sag correction|tension|standardi[sz]ed|slope distance.*horizontal|prism constant|parts per million|ppm/i },
  { breakdownId: 'area', priority: 80, keywords: /area of the (parcel|tract|lot|traverse|figure|polygon)|compute.*area|area.*acres|acreage|DMD|double meridian|coordinate method|shoelace|square feet.*acre/i },
  { breakdownId: 'traverse-bearing', priority: 75, topics: ['COGO'], keywords: /traverse|azimuth|bearing|latitude.*departure|departure.*latitude|compass rule|bowditch|transit rule|angular closure|interior angle|deflection angle|angle to the right|inverse between|coordinates? of point/i },
  { breakdownId: 'error-statistics', priority: 70, keywords: /standard deviation|standard error|most probable value|residual|error propagat|random error|systematic error|confidence|probable error|variance|weight(ed)? (mean|observation)|least squares/i },
  { breakdownId: 'plss', priority: 68, keywords: /PLSS|township|range.*section|section \d+|aliquot|quarter[- ]quarter|principal meridian|baseline.*township|lost corner|obliterated|proportionate|GLO|meander/i },
  { breakdownId: 'water-boundaries', priority: 66, keywords: /riparian|littoral|accretion|avulsion|reliction|navigable|ordinary high water|mean high water|gradient boundary|tidal|thread of the stream|water boundar/i },
  { breakdownId: 'trigonometry', priority: 50, keywords: /law of sines|law of cosines|right triangle|hypotenuse|sine|cosine|tangent of|vertical angle|zenith angle|trigonometr/i },
  { breakdownId: 'boundary-legal', priority: 40, keywords: /deed|easement|senior right|junior|monument|adverse possession|prescriptive|estoppel|dedication|title|conveyance|metes and bounds|order of calls|encroachment|court|statute/i },
  { breakdownId: 'gis-mapping', priority: 35, keywords: /\bGIS\b|raster|vector data|topolog|metadata|map scale|contour interval|NMAS|NSSDA|ASPRS|datum|NAD ?27|NAD ?83|NAVD|projection|CAD|digital terrain/i },
  { breakdownId: 'business-professional', priority: 30, keywords: /ethic|licens|negligen|liability|contract|client|standard of care|professional|conflict of interest|responsible charge|seal|certificate of authorization|insurance|scope of (work|services)/i },
  // Domain-level fallbacks (lowest priority)
  { breakdownId: 'boundary-legal', priority: 10, domains: ['Legal Principles', 'Boundary Law & PLSS', 'Texas Boundary Law & GLO Surveys'] },
  { breakdownId: 'business-professional', priority: 10, domains: ['Business Practices', 'Professional Practice', 'Professional Survey Practices', 'Standards and Specifications', 'TBPELS Licensing & Rules', 'Texas Professional Practice'] },
  { breakdownId: 'gis-mapping', priority: 10, domains: ['Mapping, GIS, and CAD'] },
  { breakdownId: 'water-boundaries', priority: 10, domains: ['Texas Water Law'] },
  { breakdownId: 'error-statistics', priority: 8, domains: ['Applied Mathematics & Statistics'] },
  { breakdownId: 'field-procedures', priority: 8, domains: ['Field Data Acquisition', 'Surveying Principles'] },
  { breakdownId: 'general-computation', priority: 8, domains: ['Math & Basic Science', 'Survey Computations & Applications', 'Texas Survey Units & History'] },
  { breakdownId: 'areas-practice', priority: 8, domains: ['Areas of Practice'] },
  { breakdownId: 'state-plane', priority: 8, domains: ['Texas State Plane Zones'] },
];

export function findBreakdown(question: {
  question: string;
  domain?: string;
  topic?: string;
}): ProblemBreakdown | null {
  let best: { breakdown: ProblemBreakdown; priority: number } | null = null;

  for (const matcher of MATCHERS) {
    const breakdown = PROBLEM_BREAKDOWNS[matcher.breakdownId];
    if (!breakdown) continue;
    if (best && matcher.priority <= best.priority) continue;

    let matched = false;
    if (matcher.topics && question.topic && matcher.topics.includes(question.topic)) {
      matched = true;
    }
    if (!matched && matcher.keywords && matcher.keywords.test(question.question)) {
      matched = true;
    }
    if (!matched && matcher.domains && question.domain && matcher.domains.includes(question.domain)) {
      matched = true;
    }

    if (matched) {
      best = { breakdown, priority: matcher.priority };
    }
  }

  return best?.breakdown ?? null;
}
