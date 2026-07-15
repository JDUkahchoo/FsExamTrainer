import type { ReadingModule } from '../schema';

export const STUDY_READINGS_SPC: ReadingModule[] = [
  {
    id: 'fs-d7-state-plane',
    examTrack: 'fs',
    domainNumber: 7,
    domain: 'Applied Mathematics & Statistics',
    title: 'State Plane Coordinate System: Projections, Scale, and Combined Factor',
    description: 'State Plane coordinates appear on nearly every legal survey in the U.S. This reading explains why SPC zones exist, which projection type applies to each zone shape, how the scale factor and elevation factor combine into the critical Combined Factor, and how to convert between grid distances and ground distances.',
    estimatedMinutes: 22,
    sections: [
      {
        id: 'fs-d7-spc-s1',
        type: 'concept',
        title: 'Why State Plane Exists',
        content: 'Geographic coordinates (latitude and longitude) are accurate but awkward for day-to-day survey computations — they require spherical trigonometry and produce distances in degrees, not feet or meters. UTM reduces this problem but uses 6°-wide zones that sacrifice accuracy at zone edges.\n\nThe State Plane Coordinate System (SPCS) was developed in the 1930s by the Coast and Geodetic Survey to give every state a flat-coordinate system accurate enough for property surveys, construction staking, and cadastral work. SPCS achieves higher accuracy than UTM by using much smaller zones.\n\nKey differences from UTM:\n• Zone size: SPCS zones are 1°–2° wide (vs UTM\'s 6°), so distortion is far smaller.\n• Accuracy: Distortion in SPCS is typically less than 1:10,000 — good enough for most engineering work. UTM can reach 1:2,500 at zone edges.\n• Coverage: SPCS is U.S.-only. Each state has between 1 and 8 zones.\n• Units: Older SPCS zones used U.S. Survey Feet. SPCS 2022 uses meters.\n• Datum: SPCS 83 uses NAD 83. SPCS 2022 (the modern replacement) uses NAD 83(2011) epoch 2010.0.\n\nSPCS coordinates are plane (2D) coordinates — a point is described by Northing (N) and Easting (E) in feet or meters from a defined false origin. The false origin is placed far to the south and west of each zone so all coordinates are positive.',
        bookRefs: [
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic IV, Ch 23', topic: 'State Plane Coordinate System — history and purpose' },
          { book: 'Elementary Surveying (ES)', chapter: 'Chapter 20', topic: 'Map projections and SPCS' },
        ],
      },
      {
        id: 'fs-d7-spc-s2',
        type: 'concept',
        title: 'Projection Types: Lambert Conformal Conic vs Transverse Mercator',
        content: 'SPCS zones use one of two projection types, selected based on the shape of the zone:\n\nLAMBERT CONFORMAL CONIC (LCC):\n• Used for zones that are wider east-west than they are tall north-south.\n• The cone intersects the ellipsoid along two standard parallels (lines of true scale where SF = 1.000000).\n• Between the standard parallels, the scale factor is slightly less than 1 (grid is compressed). Outside them, SF > 1 (grid is expanded).\n• Examples: Tennessee, North Carolina, Louisiana, Montana (1-zone states with wide E-W extent).\n• Most of the southern and western "wide" states use LCC.\n\nTRANSVERSE MERCATOR (TM):\n• Used for zones that are taller north-south than they are wide east-west.\n• The cylinder is rotated 90° and tangent (or secant) to a central meridian.\n• The scale factor is smallest (most accurate) along the central meridian and grows toward zone edges.\n• Examples: Many eastern states with narrow E-W extent (most NY zones, NJ, Vermont, Connecticut, New Hampshire).\n• Idaho, Illinois, Indiana, Maine, Mississippi, New Jersey all use TM.\n\nOblique Mercator (OM):\n• Used in a small number of cases for zones that run diagonally.\n• Example: Alaska Zone 1 (the Panhandle) runs SE-NW, not N-S or E-W.\n\nMemory tip: Think of LCC as a "sideways" state (flat and wide — use a cone) and TM as a "tall" state (narrow and tall — use a cylinder turned sideways).',
        bookRefs: [
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic IV, Ch 23', topic: 'Lambert and Transverse Mercator projections' },
          { book: 'Elementary Surveying (ES)', chapter: 'Chapter 20', topic: 'LCC and TM map projections' },
        ],
      },
      {
        id: 'fs-d7-spc-s3',
        type: 'concept',
        title: 'Scale Factor: Where the Grid Agrees with the Ground',
        content: 'The scale factor (SF) is the ratio of a distance on the grid to the corresponding distance on the ellipsoid surface. It is dimensionless.\n\nSF = grid distance / ellipsoid distance\n\nFor a secant projection (which both LCC and TM use in practice):\n• At the standard parallels (LCC) or the central meridian (TM): SF = exactly 1.000000.\n• Between the lines of exact scale: SF < 1 (the grid is slightly compressed relative to the ellipsoid).\n• Outside the lines of exact scale, toward zone edges: SF > 1 (the grid is slightly expanded).\n\nTypical range of SF within a SPCS zone: 0.9999 to 1.0001 — a maximum distortion of about 1 part in 10,000.\n\nSF is provided by NGS for every State Plane zone. In practice:\n• Grid tables or software look up the SF based on the Northing within the zone (for LCC) or the Easting (for TM).\n• For exam problems, SF is usually given directly — you do not need to derive it from projection formulas.\n\nImportant: SF corrects for the distortion introduced by projecting the curved ellipsoid surface onto a flat plane. It does NOT correct for the elevation of the terrain above the ellipsoid. That requires a separate factor — the elevation factor.',
        bookRefs: [
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic IV, Ch 23', topic: 'Scale factor in State Plane zones' },
        ],
      },
      {
        id: 'fs-d7-spc-s4',
        type: 'formula',
        title: 'Elevation Factor: Reducing Ground Distance to the Ellipsoid',
        formula: {
          expression: 'EF = R / (R + H)',
          variables: [
            { symbol: 'EF', description: 'Elevation factor — ratio that reduces a ground (physical) distance to the ellipsoid surface' },
            { symbol: 'R', description: 'Mean radius of the Earth ≈ 6,372,000 m (20,906,000 ft). Use the value given in the problem; NGS uses a more precise local value.' },
            { symbol: 'H', description: 'Ellipsoid height of the survey (m or ft). For most practical work, orthometric elevation (NAVD 88) is used as an approximation.' },
          ],
          whenToUse: 'Use EF any time you need to convert a ground (slope-corrected horizontal) distance to a grid distance, or vice versa. Because terrain sits above the ellipsoid, a ground distance is longer than the corresponding ellipsoid distance — EF < 1 corrects for this. The higher the elevation, the more EF differs from 1.',
        },
        bookRefs: [
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic IV, Ch 23', topic: 'Elevation factor and sea-level reduction' },
        ],
      },
      {
        id: 'fs-d7-spc-s5',
        type: 'formula',
        title: 'Combined Factor and the Grid/Ground Conversion',
        formula: {
          expression: 'CF = SF × EF\n\nGrid distance = Ground distance × CF\nGround distance = Grid distance / CF',
          variables: [
            { symbol: 'CF', description: 'Combined factor — accounts for both the map projection distortion (SF) and the elevation above the ellipsoid (EF). CF < 1 in most practical survey situations.' },
            { symbol: 'SF', description: 'Scale factor from the State Plane projection (dimensionless, typically 0.9999 – 1.0001)' },
            { symbol: 'EF', description: 'Elevation factor = R/(R+H) (dimensionless, always < 1 for terrain above the ellipsoid)' },
          ],
          whenToUse: 'Use CF to convert between grid coordinates (what your State Plane software reports) and ground distances (what you measure in the field). Grid distances are shorter than ground distances when CF < 1 (the usual case). Note: if working entirely within grid coordinates, distances are already grid distances — apply CF only when moving between the grid world and the physical world.',
        },
        bookRefs: [
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic IV, Ch 23', topic: 'Combined factor and grid-to-ground conversion' },
        ],
      },
      {
        id: 'fs-d7-spc-s6',
        type: 'worked_example',
        title: 'Combined Factor Calculation',
        workedExample: {
          problem: 'A survey is located in a State Plane zone where the scale factor (SF) at the survey area is 0.999952. The average elevation of the survey is 300 m. Compute the combined factor (CF) and use it to find the grid distance corresponding to a measured ground distance of 1,500.000 m. Use R = 6,372,000 m.',
          steps: [
            { step: 1, description: 'Compute the elevation factor.', calculation: 'EF = R / (R + H) = 6,372,000 / (6,372,000 + 300) = 6,372,000 / 6,372,300 = 0.999953' },
            { step: 2, description: 'Compute the combined factor.', calculation: 'CF = SF × EF = 0.999952 × 0.999953 = 0.999905' },
            { step: 3, description: 'Convert ground distance to grid distance.', calculation: 'Grid = Ground × CF = 1,500.000 × 0.999905 = 1,499.857 m' },
          ],
          answer: 'CF = 0.999905. Grid distance = 1,499.857 m. The grid distance is 0.143 m shorter than the ground distance. This difference (about 1 in 10,500) is typical for mid-elevation surveys.',
        },
      },
      {
        id: 'fs-d7-spc-kc1',
        type: 'knowledge_check',
        title: 'Combined Factor Check',
        knowledgeCheck: {
          question: 'A survey site has SF = 0.999970 and average elevation H = 600 m. Using R = 6,372,000 m, what is the combined factor CF?',
          options: [
            'CF ≈ 0.999876 — (EF = 6,372,000/6,372,600 = 0.999906; CF = 0.999970 × 0.999906 = 0.999876)',
            'CF ≈ 0.999970 — (EF is negligible at this elevation)',
            'CF ≈ 1.000030 — (combined factor can exceed 1 when SF > 1)',
            'CF ≈ 0.999940 — (CF = SF only, EF is not used for this type of problem)',
          ],
          correctIndex: 0,
          explanation: 'Step 1: EF = R/(R+H) = 6,372,000/6,372,600 = 0.999906. Step 2: CF = SF × EF = 0.999970 × 0.999906 = 0.999876. At 600 m elevation, the elevation factor contributes about −94 ppm, and the scale factor contributes about −30 ppm, for a total of −124 ppm or about 1 part in 8,065.',
        },
      },
      {
        id: 'fs-d7-spc-s7',
        type: 'concept',
        title: 'Grid-to-Ground: The Inverse Conversion',
        content: 'In the field, you measure ground distances. On the plan (SPCS coordinates), distances are grid distances. The combined factor bridges the two worlds.\n\nGround → Grid:  Grid = Ground × CF\nGrid → Ground:  Ground = Grid / CF\n\nWhen to go Grid → Ground:\n• You have a design plan with SPC coordinates and need to stake a distance in the field.\n• You computed a traverse closure in SPC and need to express the misclose in feet on the ground.\n• You are setting out a structure using SPC grid bearings and need actual tape or total station measurements.\n\nCommon mistake: forgetting to apply the inverse. If you multiply when you should divide (or vice versa), your field measurement will be off by 2 × (1 − CF) × distance. At CF = 0.999905, that\'s about 0.19 m per 1,000 m — enough to cause construction problems.\n\nSign convention check: Because CF < 1 in most situations:\n• Grid distance < Ground distance (the grid is compressed)\n• To go from ground to grid: multiply by CF (result is smaller)\n• To go from grid to ground: divide by CF (result is larger)\n\nThe "ground distance" you use in this conversion is the horizontal ground distance (already corrected for slope). You never apply CF to a slope distance.',
        bookRefs: [
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic IV, Ch 23', topic: 'Grid-to-ground distance conversions' },
        ],
      },
      {
        id: 'fs-d7-spc-kc2',
        type: 'knowledge_check',
        title: 'Grid-to-Ground Conversion',
        knowledgeCheck: {
          question: 'A design plan shows a grid distance of 845.320 m between two control points. The combined factor for the survey area is 0.999882. What is the ground distance?',
          options: [
            '845.420 m — Ground = Grid / CF = 845.320 / 0.999882 = 845.420 m',
            '845.221 m — Ground = Grid × CF = 845.320 × 0.999882 = 845.221 m',
            '845.320 m — CF is so close to 1 that no correction is needed',
            '844.222 m — Ground = Grid × (1/CF²)',
          ],
          correctIndex: 0,
          explanation: 'Ground = Grid / CF = 845.320 / 0.999882 = 845.420 m. The ground distance is 0.100 m longer than the grid distance. Dividing by a number slightly less than 1 makes the result slightly larger — that makes sense because the grid compresses distances relative to the ground. Multiplying (option B) would give the wrong answer and move in the wrong direction.',
        },
      },
      {
        id: 'fs-d7-spc-s8',
        type: 'concept',
        title: 'Zone Structure and Practical Notes',
        content: 'Zone selection:\n• Each state is divided into 1–8 zones, with boundaries that keep distortion within 1:10,000 everywhere in the zone.\n• Zone boundaries generally follow county lines so that an entire county falls within one zone — simplifying legal descriptions.\n• A survey that spans a zone boundary must carry two sets of coordinates or transform at the boundary.\n\nNaming: Zones are usually named by direction (North, Central, South, East, West) or by number within the state. Example: "Tennessee Single Zone," "Texas South," "New York East."\n\nFalse origins:\n• Each zone has a unique false origin, placed far enough south and west that all grid coordinates within the zone are positive.\n• Easting: typically 200,000 m (or similar) to the right of the central meridian.\n• Northing: starts at 0 at the false origin, increases northward.\n\nGround-Truth Grid Distance Issues in Subdivisions:\n• Recorded subdivision plat distances are ground distances measured at time of survey. When re-created using State Plane coordinates, the grid distances will differ slightly — this is expected and normal.\n• The difference is documented by the combined factor. Surveyors who reuse old plat distances without applying CF may find closure errors that are actually just the CF discrepancy.\n\nSPCS 2022:\n• NCEES exams may reference either SPCS 83 or the newer SPCS 2022. Both use the same CF = SF × EF concept. The key difference is improved coordinate accuracy and zone boundary adjustments in SPCS 2022.',
        bookRefs: [
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic IV, Ch 23', topic: 'SPCS zone structure and practical application' },
        ],
      },
      {
        id: 'fs-d7-spc-tips',
        type: 'exam_tips',
        title: 'Exam Tips: State Plane Coordinate System',
        examTips: [
          'CF = SF × EF is the single most tested formula. Know it cold. Both factors are dimensionless and both are typically very close to 1 (e.g., 0.9999xx).',
          'EF = R/(R+H) always uses a consistent unit for R and H. The answer is always < 1 because terrain is above the ellipsoid.',
          'Grid = Ground × CF (compression). Ground = Grid / CF (expansion). Ground is always larger when CF < 1.',
          'Lambert CC → wide E-W states. Transverse Mercator → tall N-S states. Think "flat state = flat cone = Lambert."',
          'Scale factor equals exactly 1 at the standard parallels (LCC) or central meridian (TM) — at those lines, the projection and ellipsoid agree perfectly.',
          'Zone boundaries follow county lines. If a project spans a zone boundary, two coordinate systems are involved.',
          'Older subdivision plats record ground distances. The difference between a plat distance and the SPCS grid distance is the CF correction — not a blunder.',
        ],
      },
      {
        id: 'fs-d7-spc-further',
        type: 'further_reading',
        title: 'State Plane References',
        furtherReading: [
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic IV, Chapter 23', topic: 'State Plane Coordinate System — projections, zones, and distance reduction' },
          { book: 'Elementary Surveying: An Introduction to Geomatics (Ghilani & Wolf)', chapter: 'Chapter 20', topic: 'Map projections, SPC, and coordinate conversions' },
          { book: 'NOAA Special Publication 65', chapter: 'Full document', topic: 'State Plane Coordinate System of 1983 — official reference' },
        ],
      },
    ],
  },
];
