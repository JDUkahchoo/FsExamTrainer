import type { ReadingModule } from '../schema';

export const STUDY_READINGS_SPC_PS: ReadingModule[] = [
  {
    id: 'ps-d2-state-plane',
    examTrack: 'ps',
    domainNumber: 2,
    domain: 'Professional Survey Practices',
    title: 'State Plane Coordinates for Professional Practice: Combined Factor, Convergence, and Datum Transformations',
    description: 'State Plane coordinates control nearly every professional boundary, control, and construction survey. This reading focuses on the advanced State Plane topics the PS exam emphasizes: the combined factor and grid/ground conversions, grid vs. geodetic north and the convergence (mapping) angle, projection selection, and transforming coordinates between SPCS 83 and the modernized SPCS2022.',
    estimatedMinutes: 26,
    sections: [
      {
        id: 'ps-d2-spc-s1',
        type: 'concept',
        title: 'State Plane in Professional Practice',
        content: 'For the professional surveyor, the State Plane Coordinate System (SPCS) is not an academic exercise — it is the legal and practical framework that ties local surveys to the National Spatial Reference System (NSRS). Control monuments published by NGS carry State Plane coordinates, ALTA/NSPS and most agency surveys require a stated basis of bearings that is frequently grid north, and large construction projects are staked from a State Plane control network.\n\nKey reasons SPCS matters at the PS level:\n• Legal traceability: SPCS coordinates connect a boundary survey to published geodetic control, allowing any future surveyor to recover the work.\n• Project-wide consistency: A single zone provides one consistent coordinate frame across an entire project, eliminating the accumulation of local assumed-coordinate errors.\n• Interoperability: GIS, agency datasets, and design files are usually delivered in State Plane, so the surveyor must be fluent moving between grid and ground.\n\nThe two distortions a professional must always account for are (1) the map-projection distortion captured by the grid scale factor and (2) the elevation of the terrain above the ellipsoid captured by the elevation factor. Together they form the combined factor, which is the bridge between the grid world (coordinates, software) and the ground world (field measurements).',
        bookRefs: [
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic IV, Ch 21', topic: 'State Plane Coordinate System in professional surveys' },
          { book: 'Elementary Surveying (ES)', chapter: 'Chapter 20', topic: 'Map projections, SPCS, and control surveys' },
        ],
      },
      {
        id: 'ps-d2-spc-s2',
        type: 'concept',
        title: 'Projection Selection: Lambert Conformal Conic vs Transverse Mercator',
        content: 'SPCS zones use one of two conformal projections, chosen by the shape of the zone:\n\nLAMBERT CONFORMAL CONIC (LCC):\n• Used for zones that are wider east-west than tall north-south.\n• A secant cone intersects the ellipsoid along two standard parallels where the scale factor equals exactly 1.000000.\n• Between the standard parallels, SF < 1 (grid compressed); outside them, SF > 1 (grid expanded). For LCC, the scale factor varies primarily with the Northing (latitude).\n• Examples: Tennessee, North Carolina, Louisiana, Montana.\n\nTRANSVERSE MERCATOR (TM):\n• Used for zones that are taller north-south than wide east-west.\n• A secant cylinder is tangent near a central meridian; the scale factor is smallest along the central meridian and grows toward the zone edges. For TM, the scale factor varies primarily with the Easting (distance from the central meridian).\n• Examples: New Jersey, Vermont, Illinois, Indiana, most New York zones.\n\nOBLIQUE MERCATOR (OM):\n• Used for the diagonally oriented Alaska Zone 1 (Panhandle).\n\nProfessional memory tip: a "wide and flat" state takes a cone (Lambert); a "tall and narrow" state takes a sideways cylinder (Transverse Mercator). The projection choice also drives how the convergence angle behaves across the zone.',
        bookRefs: [
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic IV, Ch 21', topic: 'Lambert and Transverse Mercator projections' },
          { book: 'Elementary Surveying (ES)', chapter: 'Chapter 20', topic: 'LCC and TM map projections' },
        ],
      },
      {
        id: 'ps-d2-spc-s3',
        type: 'formula',
        title: 'Combined Factor: Grid/Ground Conversion',
        formula: {
          expression: 'EF = R / (R + H)\nCF = SF × EF\n\nGrid distance = Ground distance × CF\nGround distance = Grid distance / CF',
          variables: [
            { symbol: 'CF', description: 'Combined factor (also combined scale factor, CSF) — accounts for both projection distortion and elevation. CF < 1 in most practical survey situations.' },
            { symbol: 'SF', description: 'Grid scale factor from the State Plane projection (dimensionless, typically 0.9999 – 1.0001). Provided by NGS or software.' },
            { symbol: 'EF', description: 'Elevation factor = R/(R+H), always < 1 for terrain above the ellipsoid.' },
            { symbol: 'R', description: 'Mean radius of the Earth ≈ 6,372,000 m (≈ 20,906,000 ft). Use the value given in the problem.' },
            { symbol: 'H', description: 'Ellipsoid height (m or ft). Orthometric elevation is commonly used as a practical approximation.' },
          ],
          whenToUse: 'Apply CF whenever you move between grid coordinates (what your State Plane software reports) and ground distances (what you measure or stake in the field). Ground distances are longer than grid distances when CF < 1 (the usual case). Never apply CF to a slope distance — reduce to horizontal first.',
        },
        bookRefs: [
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic IV, Ch 21', topic: 'Combined factor and grid-to-ground conversion' },
        ],
      },
      {
        id: 'ps-d2-spc-s4',
        type: 'worked_example',
        title: 'Combined Factor and Staking a Grid Distance',
        workedExample: {
          problem: 'A control network in a Lambert zone has a grid scale factor SF = 0.9999412 in the project area. The average project elevation is 1,250 ft above the ellipsoid. Using R = 20,906,000 ft, compute the combined factor and determine the ground distance a crew must stake for a design line whose grid distance is 2,640.000 ft.',
          steps: [
            { step: 1, description: 'Compute the elevation factor.', calculation: 'EF = R / (R + H) = 20,906,000 / (20,906,000 + 1,250) = 20,906,000 / 20,907,250 = 0.9999402' },
            { step: 2, description: 'Compute the combined factor.', calculation: 'CF = SF × EF = 0.9999412 × 0.9999402 = 0.9998814' },
            { step: 3, description: 'Convert grid distance to ground distance (divide by CF).', calculation: 'Ground = Grid / CF = 2,640.000 / 0.9998814 = 2,640.313 ft' },
          ],
          answer: 'CF = 0.9998814. The crew must stake a ground distance of 2,640.313 ft — about 0.313 ft longer than the grid distance. Staking the grid distance directly would leave the line short by roughly one-third of a foot over a half mile, a meaningful construction error.',
        },
      },
      {
        id: 'ps-d2-spc-kc1',
        type: 'knowledge_check',
        title: 'Combined Factor Check',
        knowledgeCheck: {
          question: 'A survey site has grid scale factor SF = 0.9999650 and average ellipsoid height H = 900 ft. Using R = 20,906,000 ft, what is the combined factor CF?',
          options: [
            'CF ≈ 0.9999220 — (EF = 20,906,000/20,906,900 = 0.9999570; CF = 0.9999650 × 0.9999570 = 0.9999220)',
            'CF ≈ 0.9999650 — (the elevation factor is negligible at this height)',
            'CF ≈ 1.0000430 — (the combined factor exceeds 1 because of elevation)',
            'CF ≈ 0.9999570 — (CF equals the elevation factor; the scale factor is not used)',
          ],
          correctIndex: 0,
          explanation: 'EF = R/(R+H) = 20,906,000/20,906,900 = 0.9999570. CF = SF × EF = 0.9999650 × 0.9999570 = 0.9999220. The scale factor contributes about −35 ppm and the elevation factor about −43 ppm, for a combined −78 ppm.',
        },
      },
      {
        id: 'ps-d2-spc-s5',
        type: 'concept',
        title: 'Grid North, Geodetic North, and the Convergence Angle',
        content: 'On a State Plane grid, grid north is the direction of increasing Northing — it is parallel to the central meridian (TM) or the projection axis everywhere on the grid. Geodetic (true) north points along the meridian to the pole and therefore changes direction from point to point as meridians converge.\n\nThe angle between grid north and geodetic north at a station is the convergence angle, also called the mapping angle or grid convergence, usually denoted γ (gamma).\n\nKey behavior:\n• γ = 0 along the central meridian of a TM zone (and along the projection origin meridian of an LCC zone). There, grid north and geodetic north coincide.\n• East of the central meridian, geodetic north points to the right of grid north; west of it, to the left. The magnitude of γ grows with distance from the central meridian and with latitude.\n• A common sign convention: γ is positive east of the central meridian.\n\nWhy it matters professionally: GNSS and astronomic observations yield geodetic azimuths, but design and coordinate computations are done in grid. To set a basis of bearings or stake a grid azimuth from a geodetic observation, the surveyor must apply the convergence angle.\n\nThere is also a second, smaller correction — the arc-to-chord or (t − T) correction — that accounts for the curvature of a geodetic line when represented as a straight chord on the grid. It is usually negligible for short lines but becomes significant for long lines far from the central meridian.',
        bookRefs: [
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic IV, Ch 21', topic: 'Grid vs geodetic north, convergence and (t − T)' },
          { book: 'Elementary Surveying (ES)', chapter: 'Chapter 20', topic: 'Convergence (mapping) angle and azimuth reduction' },
        ],
      },
      {
        id: 'ps-d2-spc-s6',
        type: 'formula',
        title: 'Converting Between Geodetic and Grid Azimuth',
        formula: {
          expression: 'Grid azimuth = Geodetic azimuth − γ   (sign per local convention)\nGeodetic azimuth = Grid azimuth + γ',
          variables: [
            { symbol: 'γ', description: 'Convergence (mapping) angle — the angle between grid north and geodetic north at the station. Positive east of the central meridian under the common convention.' },
            { symbol: 'Geodetic azimuth', description: 'Azimuth referenced to true (geodetic) north, e.g., from a GNSS or astronomic observation.' },
            { symbol: 'Grid azimuth', description: 'Azimuth referenced to grid north — the direction used in State Plane coordinate computations.' },
          ],
          whenToUse: 'Use this conversion to establish a grid basis of bearings from geodetic observations, or to recover a geodetic direction from grid coordinates. For high-accuracy long lines, also apply the small arc-to-chord (t − T) correction. Always confirm the sign convention used in the problem or by your software/zone.',
        },
        bookRefs: [
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic IV, Ch 21', topic: 'Azimuth reduction with convergence angle' },
        ],
      },
      {
        id: 'ps-d2-spc-kc2',
        type: 'knowledge_check',
        title: 'Convergence Angle Check',
        knowledgeCheck: {
          question: 'A station east of the central meridian has a convergence angle γ = +1°20′00″. A geodetic azimuth of 95°40′00″ is observed to a target. Using Grid azimuth = Geodetic azimuth − γ, what is the grid azimuth?',
          options: [
            '94°20′00″ — Grid = 95°40′00″ − 1°20′00″ = 94°20′00″',
            '97°00′00″ — Grid = 95°40′00″ + 1°20′00″ = 97°00′00″',
            '95°40′00″ — convergence does not affect azimuths, only distances',
            '93°00′00″ — subtract twice the convergence angle',
          ],
          correctIndex: 0,
          explanation: 'East of the central meridian γ is positive, and grid azimuth = geodetic azimuth − γ = 95°40′00″ − 1°20′00″ = 94°20′00″. The convergence angle rotates the reference direction; it does not change measured distances.',
        },
      },
      {
        id: 'ps-d2-spc-s7',
        type: 'concept',
        title: 'Datum Transformations: SPCS 83 to SPCS2022',
        content: 'Professional surveyors must understand which datum and SPCS realization their coordinates belong to, because mixing them produces errors of feet to tens of feet.\n\nSPCS 83:\n• Built on NAD 83 (and its successive realizations, e.g., NAD 83(2011) epoch 2010.0).\n• Zone definitions, projection constants, and false origins are those published in NOAA Special Publication 65.\n• Many zones are defined in U.S. Survey Feet (with metric definitions underlying them).\n\nSPCS2022 (the modernized system):\n• Released with the NSRS modernization that replaces NAD 83 with the new terrestrial reference frames (NATRF2022 and the regional frames). It also pairs with the new geopotential datum (NAPGD2022) that replaces NAVD 88.\n• Provides updated zone layouts — including statewide, multi-zone, and special-purpose "low-distortion" zone options — so jurisdictions can choose layers that minimize distortion for their needs.\n• Uses the International Foot / meter conventions consistent with the modernized NSRS.\n\nTransforming between realizations:\n• You cannot simply reuse SPCS 83 coordinates as SPCS2022 coordinates. The horizontal datum change (NAD 83 → NATRF2022) involves a real shift (on the order of a meter or more in places) plus differences from plate motion and improved geodesy.\n• NGS provides transformation tools (the successor to NCAT/HTDP-style tools) to move coordinates between frames and epochs. For exam purposes, know the conceptual workflow: identify the source frame/epoch, apply the published transformation to the new frame/epoch, then project to the chosen SPCS2022 zone.\n• Always document the datum, realization, epoch, zone, and units on the plat. A coordinate without its datum/epoch metadata is ambiguous and professionally unacceptable.',
        bookRefs: [
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic IV, Ch 21', topic: 'NSRS modernization, SPCS 83 vs SPCS2022, datum transformations' },
          { book: 'NOAA / NGS publications', chapter: 'SPCS2022 policy & guidelines', topic: 'Modernized State Plane zones and reference frames' },
        ],
      },
      {
        id: 'ps-d2-spc-s8',
        type: 'concept',
        title: 'Low-Distortion Projections and Practical Notes',
        content: 'Because standard SPCS zones can still leave 50–100 ppm of distortion (and much more at high elevations), many jurisdictions and large projects now use Low-Distortion Projections (LDPs), and SPCS2022 formally supports designed low-distortion zone layers.\n\nLow-Distortion Projections (LDPs):\n• An LDP is a custom or specially designed conformal projection placed at (or near) the project\'s mean ground elevation so that the combined factor is essentially 1 across the project area.\n• Benefit: grid and ground distances agree to within a few ppm, so crews and designers can largely ignore the combined factor for routine work.\n• Trade-off: an LDP covers a limited area; it is not a substitute for the statewide consistency of standard SPCS, and its definition must be documented and shared.\n\nProfessional cautions:\n• Recorded plat distances are ground distances at the time of survey. Re-creating them from State Plane grid coordinates will show small differences explained by the combined factor — not blunders.\n• A project spanning a zone boundary needs coordinates in both zones or a transformation at the boundary.\n• Always state the datum, realization/epoch, zone, units, and combined factor (or whether ground or grid distances are shown) on every deliverable so the work is unambiguous and recoverable.',
        bookRefs: [
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic IV, Ch 21', topic: 'Low-distortion projections and SPCS deliverable documentation' },
        ],
      },
      {
        id: 'ps-d2-spc-tips',
        type: 'exam_tips',
        title: 'Exam Tips: State Plane for Professional Practice',
        examTips: [
          'CF = SF × EF is the most tested relationship. Grid = Ground × CF; Ground = Grid / CF. Ground is larger when CF < 1.',
          'EF = R/(R+H) uses consistent units for R and H and is always < 1 for terrain above the ellipsoid.',
          'Grid azimuth = Geodetic azimuth − γ (convergence positive east of the central meridian). Convergence rotates directions; it never changes measured distances.',
          'Convergence γ is zero along the central meridian and grows toward the zone edges and with latitude.',
          'Lambert CC → wide E-W states (scale factor varies with Northing). Transverse Mercator → tall N-S states (scale factor varies with Easting).',
          'For long, high-accuracy lines far from the central meridian, also apply the small arc-to-chord (t − T) correction.',
          'SPCS 83 (NAD 83) and SPCS2022 (modernized NSRS) are different datums/realizations — never reuse coordinates across them without a published transformation.',
          'Low-distortion projections place the grid near ground elevation so CF ≈ 1 over a project; they sacrifice statewide consistency.',
          'Always document datum, realization/epoch, zone, units, and whether distances are grid or ground.',
        ],
      },
      {
        id: 'ps-d2-spc-further',
        type: 'further_reading',
        title: 'State Plane References',
        furtherReading: [
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic IV, Chapter 21', topic: 'State Plane Coordinate System — projections, convergence, and distance reduction' },
          { book: 'Elementary Surveying: An Introduction to Geomatics (Ghilani & Wolf)', chapter: 'Chapter 20', topic: 'Map projections, SPC, convergence, and coordinate conversions' },
          { book: 'NOAA Special Publication 65', chapter: 'Full document', topic: 'State Plane Coordinate System of 1983 — official reference' },
          { book: 'NGS SPCS2022 Policy & Guidelines', chapter: 'Full document', topic: 'Modernized State Plane zones, reference frames, and low-distortion options' },
        ],
      },
    ],
  },
];
