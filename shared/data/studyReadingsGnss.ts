import type { ReadingModule } from '../schema';

export const STUDY_READINGS_GNSS: ReadingModule[] = [
  {
    id: 'fs-d7-gnss-advanced',
    examTrack: 'fs',
    domainNumber: 7,
    domain: 'Applied Mathematics & Statistics',
    title: 'GNSS: Advanced Concepts (CORS, OPUS, VRS, Heights)',
    description: 'Go beyond basic GPS to master the concepts tested most heavily on the FS exam: CORS and HARN networks, the OPUS post-processing workflow, Virtual Reference Stations, code phase vs. carrier phase accuracy, multipath error, the geoid/ellipsoid height relationship, and the UTM coordinate system.',
    estimatedMinutes: 25,
    sections: [
      {
        id: 'fs-d7-gnss-s1',
        type: 'concept',
        title: 'Three Surfaces: Topographic, Geoid, and Ellipsoid',
        content: 'Understanding GNSS heights requires keeping three distinct surfaces straight.\n\n1. TOPOGRAPHIC SURFACE — the actual ground you stand on. Elevations measured with a level rod refer to this surface.\n\n2. GEOID — an equipotential (equal-gravity) surface that approximates mean sea level globally. It is lumpy and irregular because Earth\'s mass is not uniformly distributed. Orthometric height (H) is the distance from the geoid upward to the ground surface, measured along the plumb line. This is the "elevation" that appears on USGS topo maps and most engineering drawings.\n\n3. ELLIPSOID — a mathematically smooth, rotating spheroid (GRS 80 for NAD 83 / WGS 84) that approximates Earth\'s shape. GNSS receivers compute ellipsoid height (h) directly from satellite signals. Ellipsoid height is purely geometric and has no physical meaning in terms of water flow.\n\nThe geoid does not coincide with the ellipsoid. The vertical distance between them at any point is the geoid height (also called geoid undulation), symbolized N. In the contiguous United States, N is negative and ranges from about −8 m to −53 m, meaning the geoid lies below the ellipsoid.\n\nCrucial rule: GNSS gives you h (ellipsoid height). Engineering work requires H (orthometric/elevation). To convert, you need N from a geoid model such as GEOID18 or GEOID12B published by NGS.',
        bookRefs: [
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic IV, Ch 20', topic: 'GPS height relationships and geoid models' },
          { book: 'Elementary Surveying (ES)', chapter: 'Chapter 13', topic: 'GNSS surveying and height relationships' },
        ],
      },
      {
        id: 'fs-d7-gnss-s2',
        type: 'formula',
        title: 'Geoid Height Formula: h = H + N',
        formula: {
          expression: 'h = H + N',
          variables: [
            { symbol: 'h', description: 'Ellipsoid height (m) — what GNSS measures directly, above the reference ellipsoid' },
            { symbol: 'H', description: 'Orthometric height / elevation (m) — above the geoid, used in engineering and mapping' },
            { symbol: 'N', description: 'Geoid undulation / geoid height (m) — vertical separation between ellipsoid and geoid. Negative in CONUS.' },
          ],
          whenToUse: 'Use any time you need to convert between GNSS ellipsoid height and usable elevation. Rearranged: H = h − N (to get elevation from GPS). In CONUS, N is negative, so H > h (elevation exceeds ellipsoid height).',
        },
        bookRefs: [
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic IV, Ch 20', topic: 'h = H + N relationship' },
        ],
      },
      {
        id: 'fs-d7-gnss-s3',
        type: 'worked_example',
        title: 'Geoid Height Calculation',
        workedExample: {
          problem: 'A GNSS receiver observes an ellipsoid height (h) of 45.238 m at a benchmark. The geoid undulation (N) at that location from GEOID18 is −31.500 m. What is the orthometric height (elevation) H?',
          steps: [
            { step: 1, description: 'Write the formula and isolate H.', calculation: 'h = H + N  →  H = h − N' },
            { step: 2, description: 'Substitute the values. Remember N is negative.', calculation: 'H = 45.238 − (−31.500) = 45.238 + 31.500' },
            { step: 3, description: 'Compute.', calculation: 'H = 76.738 m' },
          ],
          answer: 'The orthometric height (elevation) is 76.738 m. Because N is negative in CONUS, the geoid is below the ellipsoid, so H is larger than h.',
        },
      },
      {
        id: 'fs-d7-gnss-s4',
        type: 'knowledge_check',
        title: 'Geoid Formula Check',
        knowledgeCheck: {
          question: 'A GNSS receiver measures an ellipsoid height of 312.450 m. The geoid undulation at the site is −25.300 m. What is the orthometric height?',
          options: [
            '337.750 m (H = h − N = 312.450 − (−25.300) = 337.750 m)',
            '287.150 m (H = h + N = 312.450 + (−25.300) = 287.150 m)',
            '312.450 m (h = H so no correction needed)',
            '25.300 m (H = N only)',
          ],
          correctIndex: 0,
          explanation: 'H = h − N = 312.450 − (−25.300) = 312.450 + 25.300 = 337.750 m. Subtracting a negative number is the same as adding its absolute value. Because N is negative in CONUS (geoid below ellipsoid), orthometric heights are always larger than ellipsoid heights in this region.',
        },
      },
      {
        id: 'fs-d7-gnss-s5',
        type: 'concept',
        title: 'Code Phase vs. Carrier Phase Measurements',
        content: 'GNSS receivers extract range (distance) information from two very different parts of the satellite signal. Understanding the difference explains why accuracy varies so dramatically between GPS methods.\n\nCODE PHASE (Pseudorange):\n• The receiver times how long the satellite\'s PRN code (a digital ranging code modulated onto the signal) takes to arrive.\n• The PRN code chip length is about 300 m (C/A code) or 30 m (P-code).\n• Timing resolution: ~1–2% of chip length → range noise of ~3–6 m (C/A) or 0.3–0.6 m (P-code).\n• Accuracy: ±1–5 m (C/A code, standalone); ±0.3–1 m (P-code differential).\n• Used by: autonomous GPS receivers (phone, vehicle navigation, handheld).\n\nCARRIER PHASE:\n• The receiver measures the phase of the underlying radio carrier wave (L1 at 19 cm wavelength, L2 at 24 cm).\n• The carrier wave is much shorter and smoother than the code, so fractional phase measurements give millimeter-level precision.\n• Complication: there is an integer ambiguity — the receiver doesn\'t know how many whole cycles separate it from the satellite. Resolving this ambiguity (integer ambiguity resolution) is the key computational step in RTK, static, and kinematic GNSS.\n• Accuracy: ±5–20 mm (RTK with resolved ambiguity); ±1–5 mm (static post-processed).\n• Used by: RTK, static control, VRS, OPUS.\n\nSummary table:\n\nMethod              | Signal      | Typical accuracy\nStandalone GPS      | Code (C/A)  | ±3–5 m\nDGPS / SBAS         | Code        | ±0.3–1 m\nRTK (real-time)     | Carrier     | ±1–3 cm\nVRS / Network RTK   | Carrier     | ±1–2 cm\nStatic (post-proc)  | Carrier     | ±3–10 mm',
        bookRefs: [
          { book: 'Elementary Surveying (ES)', chapter: 'Chapter 13', topic: 'GPS signal structure, code and carrier phase' },
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic IV, Ch 20', topic: 'GNSS accuracy and observation methods' },
        ],
      },
      {
        id: 'fs-d7-gnss-s6',
        type: 'concept',
        title: 'CORS Network and HARN',
        content: 'CORS — Continuously Operating Reference Stations:\n• A nationwide network of permanently installed GPS reference stations maintained primarily by NOAA\'s National Geodetic Survey (NGS) and many cooperating agencies.\n• Each CORS station logs raw GPS/GNSS data continuously (24/7) and uploads it to NGS servers.\n• Surveys: Provides the base-station data that OPUS uses to compute precise coordinates for user observations — without the user needing their own base station.\n• Coverage: Over 2,000 CORS stations across the U.S. and territories, spaced typically 100–300 km apart.\n• Datum connection: CORS coordinates are tied to NAD 83 (and ITRF), providing a consistent datum for all users.\n• Cost to use: Free. Users submit their raw data file to the OPUS web service.\n\nHARN — High Accuracy Reference Network:\n• A passive geodetic control network established by NGS in the 1990s to upgrade the older NAD 83 network.\n• Passive control = monumented points (brass discs in the ground) — not continuously operating stations.\n• Horizontal accuracy: ±1 cm or better for HARN stations (a significant improvement over the original NAD 83 control).\n• Users perform GPS surveys and tie into HARN stations to establish high-accuracy local control.\n• Relationship to CORS: CORS is active (continuously operating electronic stations); HARN is passive (monuments you physically occupy with a GPS receiver).\n\nKey distinction on the exam: CORS provides real-time or archived electronic data; HARN provides physical control points. Use CORS for OPUS and post-processing; use HARN to verify or establish local control.',
        bookRefs: [
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic IV, Ch 20', topic: 'CORS, HARN, and geodetic networks' },
        ],
      },
      {
        id: 'fs-d7-gnss-s7',
        type: 'concept',
        title: 'OPUS: Online Positioning User Service',
        content: 'OPUS (Online Positioning User Service) is a free NGS web service that processes raw static GNSS data and returns precise coordinates in NAD 83 and NAVD 88 (via GEOID).\n\nWhen to use OPUS:\n• When you need high-accuracy (cm-level) coordinates but cannot set up your own base station.\n• For establishing new control points without a second GPS receiver in the field.\n• For verifying existing control or recovering a benchmark position.\n\nOPUS workflow:\n1. COLLECT raw data — Occupy the point with a single dual-frequency GPS/GNSS receiver for at least 2 hours (OPUS-Static) or 15 minutes (OPUS-Rapid Static, shorter sessions, reduced accuracy).\n2. DOWNLOAD the raw data file (RINEX or proprietary format convertible to RINEX).\n3. SUBMIT to OPUS — Upload the file at geodesy.noaa.gov/OPUS. Enter the antenna type and antenna height.\n4. NOAA PROCESSES — OPUS automatically selects 3 or more nearby CORS stations, processes the baselines between each CORS and your receiver, and averages the results.\n5. RECEIVE RESULTS — An email arrives (usually within minutes) with NAD 83 latitude, longitude, ellipsoid height, orthometric height, and quality statistics.\n\nOPUS accuracy:\n• OPUS-Static (≥2 hours): Typically ±3–5 cm horizontal, ±5–8 cm vertical (95% confidence).\n• Accuracy improves with longer observation times and more CORS stations in range.\n\nKey facts for the exam:\n• OPUS uses the CORS network — no user-provided base station needed.\n• The user needs only ONE receiver (not two).\n• OPUS provides NAD 83 horizontal coordinates AND NAVD 88 elevations (using the geoid model).\n• RINEX is the standard exchange format for raw GNSS data.',
        bookRefs: [
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic IV, Ch 20', topic: 'OPUS workflow and applications' },
          { book: 'Elementary Surveying (ES)', chapter: 'Chapter 13', topic: 'Post-processing and network-based GNSS' },
        ],
      },
      {
        id: 'fs-d7-gnss-s8',
        type: 'concept',
        title: 'VRS — Virtual Reference Station / Network RTK',
        content: 'VRS (Virtual Reference Station) is a network-based RTK technique that eliminates the need for a local physical base station by synthesizing corrections from the CORS network.\n\nHow conventional RTK works:\n• You need a physical base station set up near your rover (ideally within 10–15 km).\n• The base station transmits its raw data or corrections to the rover via radio or cellular.\n• Accuracy degrades with distance from the base due to uncorrected atmospheric and orbital errors.\n\nHow VRS works:\n1. The rover sends its approximate position to a network control center via cellular data.\n2. The control center uses data from several nearby CORS stations (or a state/commercial network) to model the local atmospheric and orbital errors.\n3. A set of virtual corrections is generated as if a base station existed just meters from the rover — even though there is no physical station there.\n4. These VRS corrections are transmitted to the rover, which processes them like conventional RTK.\n\nAdvantages of VRS:\n• No physical base station needed in the field.\n• Consistent ±1–2 cm accuracy across a wide area (no accuracy degradation with distance).\n• One person can perform RTK surveys alone.\n• State DOTs and private networks offer VRS services.\n\nAlternate names: Network RTK, eRTK, MAC (Master-Auxiliary Corrections), iMAX.\n\nKey exam point: VRS requires two-way cellular communication with the network server. If cellular coverage fails, VRS also fails. This is its main limitation in remote areas.',
      },
      {
        id: 'fs-d7-gnss-s9',
        type: 'concept',
        title: 'Multipath Error: Causes and Mitigation',
        content: 'Multipath occurs when satellite signals reach the receiver\'s antenna via multiple paths — one direct and one or more reflected off nearby surfaces (buildings, vehicles, water, pavement, hillsides). The reflected signal travels a longer path and arrives slightly delayed, corrupting the direct signal measurement.\n\nEffects:\n• Code multipath: causes range errors of 1–5 m.\n• Carrier phase multipath: errors typically less than a few centimeters, but can cause cycle slips and wrong ambiguity resolution.\n• Multipath is the dominant error source for high-accuracy GNSS work in urban or semi-urban environments.\n\nSources of severe multipath:\n• Buildings and walls near the antenna.\n• Chain-link fences and vehicles.\n• Water bodies and wet pavement.\n• Hillsides and rock outcrops.\n\nMitigation strategies (testable):\n1. Site selection — avoid reflective surfaces within 50 m of the antenna.\n2. Antenna design — choke-ring antennas and ground planes reject signals from low elevation angles where multipath is worst.\n3. Elevation mask — ignore satellites below 10–15° elevation angle; low-elevation signals travel near the ground where multipath is severe.\n4. Longer observation times — multipath is partially random; longer sessions average out some errors.\n5. Receiver algorithms — modern receivers have multipath-rejection filters.\n6. Avoid metal rooftops — do not mount antennas on metal surfaces that act as reflectors.',
        bookRefs: [
          { book: 'Elementary Surveying (ES)', chapter: 'Chapter 13', topic: 'GNSS error sources and multipath' },
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic IV, Ch 20', topic: 'GPS error sources and mitigation' },
        ],
      },
      {
        id: 'fs-d7-gnss-s10',
        type: 'concept',
        title: 'UTM Coordinate System: Zone Structure',
        content: 'The Universal Transverse Mercator (UTM) system divides Earth into 60 north-south zones, each 6° of longitude wide, numbered 1 through 60 eastward starting from 180°W.\n\nZone boundaries:\n• Zone 1: 180°W to 174°W\n• Zone 2: 174°W to 168°W\n• ... each zone = 6°\n• Zone 60: 174°E to 180°E\n\nZone numbering for any longitude:\nZone = ⌊(longitude + 180) / 6⌋ + 1  (where longitude is positive east, negative west)\n\nExamples:\n• 87°W = −87°: Zone = ⌊(−87 + 180)/6⌋ + 1 = ⌊93/6⌋ + 1 = 15 + 1 = 16\n• 105°W = −105°: Zone = ⌊(−105 + 180)/6⌋ + 1 = ⌊75/6⌋ + 1 = 12 + 1 = 13\n• 0° (prime meridian): Zone = ⌊180/6⌋ + 1 = 30 + 1 = 31\n\nProjection within each zone:\n• Transverse Mercator projection, with the central meridian at the center of each 6° strip.\n• False Easting: 500,000 m (placed at the central meridian so all eastings are positive).\n• False Northing: 0 m (north) or 10,000,000 m (south, to keep northings positive).\n• Scale factor at central meridian: 0.9996 (distortion grows toward zone edges).\n\nKey differences from State Plane:\n• UTM is a worldwide system; State Plane is U.S.-only and uses smaller zones for higher accuracy.\n• UTM coordinates are in meters; State Plane coordinates may be in feet or meters.\n• State Plane accuracy within a zone is typically better than UTM accuracy.',
        bookRefs: [
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic IV, Ch 21', topic: 'UTM coordinate system and zone structure' },
          { book: 'Elementary Surveying (ES)', chapter: 'Chapter 20', topic: 'Map projections and UTM' },
        ],
      },
      {
        id: 'fs-d7-gnss-s11',
        type: 'knowledge_check',
        title: 'UTM Zone Check',
        knowledgeCheck: {
          question: 'A survey site is located at longitude 93°W. What UTM zone contains this site?',
          options: [
            'Zone 15 — ⌊(−93 + 180)/6⌋ + 1 = ⌊87/6⌋ + 1 = 14 + 1 = 15',
            'Zone 16 — ⌊(−87 + 180)/6⌋ + 1 = 16',
            'Zone 14 — ⌊(−93 + 180)/6⌋ = 14',
            'Zone 93 — zones match longitude values',
          ],
          correctIndex: 0,
          explanation: 'Zone = ⌊(longitude + 180) / 6⌋ + 1. For 93°W (longitude = −93): ⌊(−93 + 180) / 6⌋ + 1 = ⌊87/6⌋ + 1 = ⌊14.5⌋ + 1 = 14 + 1 = 15. Zone 15 spans 96°W to 90°W, so 93°W falls near its center. The central meridian of Zone 15 is at 93°W.',
        },
      },
      {
        id: 'fs-d7-gnss-tips',
        type: 'exam_tips',
        title: 'Exam Tips: GNSS Advanced Concepts',
        examTips: [
          'h = H + N is the most-tested GNSS formula. Remember: N is NEGATIVE in CONUS, so H = h − N means you ADD the absolute value of N to get elevation. Elevation > ellipsoid height in the US.',
          'OPUS uses the CORS network — no physical base station needed. You submit raw data from ONE receiver; NGS does the rest.',
          'CORS (active, electronic stations) vs. HARN (passive, monuments in the ground). Keep them distinct: CORS = continuous electronic data; HARN = brass discs you physically occupy.',
          'VRS requires cellular two-way communication with a network server. No cell service = no VRS. Its main advantage: no physical base station and consistent accuracy over large areas.',
          'Code phase: meters accuracy (navigation). Carrier phase: centimeters/millimeters accuracy (surveying). RTK uses carrier phase.',
          'Multipath mitigation: elevation mask (15°), choke-ring antenna, avoid reflective surfaces. Site selection is the most reliable fix.',
          'UTM has 60 zones, each 6° wide. Zone numbers run eastward from 180°W. Use Zone = ⌊(lon + 180)/6⌋ + 1 with longitude in signed degrees (W = negative).',
        ],
      },
      {
        id: 'fs-d7-gnss-s12',
        type: 'further_reading',
        title: 'GNSS Advanced References',
        furtherReading: [
          { book: 'Elementary Surveying: An Introduction to Geomatics (Ghilani & Wolf)', chapter: 'Chapter 13', topic: 'GNSS surveying — signal types, methods, and error sources' },
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic IV, Chapters 20–21', topic: 'GNSS, geodetic control, and coordinate systems' },
          { book: 'NOAA/NGS OPUS User Guide', chapter: 'Full document', topic: 'Online Positioning User Service workflow and accuracy expectations' },
        ],
      },
    ],
  },
];
