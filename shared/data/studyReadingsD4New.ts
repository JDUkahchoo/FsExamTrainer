import type { ReadingModule } from '../schema';

export const STUDY_READINGS_D4_NEW: ReadingModule[] = [
  {
    id: 'fs-d4-height-systems',
    examTrack: 'fs',
    domainNumber: 4,
    domain: 'Surveying Principles',
    title: 'Height Systems: Ellipsoid, Geoid, and Orthometric Heights',
    description: 'Modern GNSS receivers report ellipsoidal heights, but surveyors and engineers work with orthometric heights (elevations). Understanding the three height systems and the relationship h = H + N is essential for converting GNSS data to usable elevations on the FS exam.',
    estimatedMinutes: 20,
    sections: [
      {
        id: 'fs-d4-hs-s1',
        type: 'concept',
        title: 'The Three Height Systems Explained',
        content: 'Surveyors work with three related but distinct height systems. Confusing them is one of the most common errors in GNSS-based surveying practice.\n\nEllipsoidal Height (h): The distance measured perpendicular to the surface of the reference ellipsoid (GRS 80 or WGS 84). This is a purely geometric quantity — the ellipsoid is a mathematically defined smooth surface and has nothing to do with gravity. GNSS receivers directly compute ellipsoidal heights. They are also called "geodetic heights." Symbol: h.\n\nOrthometric Height (H): The height measured along the curved plumb line from the geoid (roughly mean sea level) to the point. This is what most people mean by "elevation" — the value shown on topographic maps, published for benchmarks, and used in engineering design. Orthometric heights are measured by differential leveling, which follows the geoid surface. Symbol: H.\n\nGeoid Height (N): The separation between the geoid surface and the reference ellipsoid at any given location. N is positive where the geoid is above the ellipsoid and negative where it is below. In the contiguous United States, the geoid is everywhere below the ellipsoid, so N is negative throughout CONUS (typically −8 m to −53 m). Symbol: N.\n\nThe fundamental relationship connecting all three:\nh = H + N\n\nIn practice, this means:\n- To get orthometric height from GNSS: H = h − N\n- To predict ellipsoidal height from known elevation: h = H + N\n\nGeoid heights (N values) are obtained from NGS geoid models (GEOID18, GEOID12B, etc.) using the GNSS/leveling approach or the NGS online GEOID tool.',
      },
      {
        id: 'fs-d4-hs-s2',
        type: 'formula',
        title: 'The h = H + N Relationship',
        formula: {
          expression: 'h = H + N  →  H = h − N  →  N = h − H',
          variables: [
            { symbol: 'h', description: 'Ellipsoidal height (from GNSS receiver, perpendicular to reference ellipsoid)' },
            { symbol: 'H', description: 'Orthometric height (elevation above the geoid, used for engineering and mapping)' },
            { symbol: 'N', description: 'Geoid height (geoid-ellipsoid separation; negative throughout CONUS, where geoid is below ellipsoid)' },
          ],
          whenToUse: 'Use whenever you need to convert between GNSS-derived ellipsoidal heights and conventional elevations (orthometric heights). If a GNSS receiver reports h = 85.0 m and the local geoid height N = −32.5 m, then the orthometric elevation is H = 85.0 − (−32.5) = 117.5 m. Always obtain N from the current NGS geoid model for the project area.',
        },
      },
      {
        id: 'fs-d4-hs-s3',
        type: 'worked_example',
        title: 'Converting GNSS Height to Elevation',
        workedExample: {
          problem: 'A GNSS survey determines the ellipsoidal height of a new control point as h = 142.88 m. The NGS GEOID18 model gives the geoid height at this location as N = −29.43 m. A nearby benchmark has an orthometric elevation of H = 173.15 m and an ellipsoidal height of h = 143.72 m. (a) Compute the orthometric height of the new point from the geoid model. (b) Check the geoid height consistency using the benchmark.',
          steps: [
            { step: 1, description: 'Compute orthometric height of the new point using H = h − N:', calculation: 'H = 142.88 − (−29.43) = 142.88 + 29.43 = 172.31 m' },
            { step: 2, description: 'Verify N consistency at the benchmark using N = h − H:', calculation: 'N_benchmark = 143.72 − 173.15 = −29.43 m ✓ (matches the geoid model — good consistency)' },
            { step: 3, description: 'Alternative: compute height difference to the benchmark to check the GNSS vector:', calculation: 'Δh (GNSS) = 142.88 − 143.72 = −0.84 m; ΔH (orthometric) = 172.31 − 173.15 = −0.84 m. The difference is the same, which confirms ΔN ≈ 0 over this short baseline (appropriate for a local check).' },
          ],
          answer: 'The orthometric height of the new point is H = 172.31 m. The benchmark check confirms that the geoid model and GNSS heights are internally consistent at this location.',
        },
      },
      {
        id: 'fs-d4-hs-s4',
        type: 'common_mistakes',
        title: 'Common Mistakes: Height Systems',
        commonMistakes: [
          'Using the GNSS-reported ellipsoidal height directly as an elevation without applying the geoid correction. In CONUS, this gives elevations that are 8 to 53 meters too LOW (because N is negative, h > H).',
          'Applying N with the wrong sign. In CONUS, N is negative (geoid is below ellipsoid). H = h − N = h − (negative number) = h + |N|. Students often subtract the absolute value, getting H = h − |N|, which gives a result that is far too low.',
          'Confusing dynamic heights, normal heights, and orthometric heights. The FS exam uses "orthometric height" and "elevation" interchangeably. Dynamic and normal heights are refinements used in precise geodetic work but rarely tested at the FS level.',
          'Assuming ΔN = 0 over long distances. Over short baselines (< 5 km), geoid height change is negligible and GNSS height differences equal orthometric height differences. Over long distances, ΔN can be significant and must be accounted for.',
        ],
      },
      {
        id: 'fs-d4-hs-s5',
        type: 'exam_tips',
        title: 'Exam Tips: Height Systems',
        examTips: [
          'Remember the formula triangle: h (top) = H + N. Cover any one variable to see the formula for it. GNSS gives h; maps show H; geoid model gives N.',
          'In CONUS, N is always negative (geoid below ellipsoid), so orthometric height H is always GREATER than ellipsoidal height h. If your answer has H < h, check your sign.',
          'The FS exam may describe "GPS-derived elevation" — this means ellipsoidal height h, which still needs the geoid correction applied.',
          'GEOID18 is the current NGS geoid model for CONUS. Older versions (GEOID12B, GEOID09) may appear in historical context questions.',
          'For exam problems where N is given as a positive number, read the problem carefully. Some older texts express geoid height as a separation magnitude (always positive) and specify "above" or "below" separately.',
        ],
      },
      {
        id: 'fs-d4-hs-s6',
        type: 'knowledge_check',
        title: 'Height Systems Knowledge Check',
        knowledgeCheck: {
          question: 'A GNSS receiver reports an ellipsoidal height of 58.3 m at a point where the geoid height (N) is −34.7 m. What is the orthometric height (elevation) at this point?',
          options: [
            '23.6 m',
            '93.0 m',
            '58.3 m',
            '−34.7 m',
          ],
          correctIndex: 1,
          explanation: 'Using H = h − N: H = 58.3 − (−34.7) = 58.3 + 34.7 = 93.0 m. The geoid height is negative (geoid is below the ellipsoid), so orthometric height H is larger than ellipsoidal height h. Option A (23.6 m) results from incorrectly subtracting the absolute value: 58.3 − 34.7 = 23.6. This is the most common error — forgetting that N is negative in CONUS, so subtracting N means ADDING its absolute value.',
        },
      },
      {
        id: 'fs-d4-hs-s7',
        type: 'further_reading',
        title: 'Further Reading',
        furtherReading: [
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic IV, Chapter 22 (GPS Surveys)', topic: 'GNSS height conversion, geoid models, and the h = H + N relationship' },
          { book: 'Elementary Surveying (ES)', chapter: 'Chapter 19', topic: 'GPS surveying, ellipsoidal height, geoid separation, and orthometric height' },
          { book: 'NCEES FS Reference Handbook', chapter: 'Geodesy section', topic: 'Reference ellipsoid, geoid, and height system definitions' },
        ],
      },
    ],
  },
  {
    id: 'fs-d4-datum-transformations',
    examTrack: 'fs',
    domainNumber: 4,
    domain: 'Surveying Principles',
    title: 'Datum Transformations: NAD 27, NAD 83, and NSRS 2022',
    description: 'The United States has used different horizontal datums over time, and modern surveyors must understand how to convert coordinates between them. This reading covers NAD 27, NAD 83, and the upcoming NSRS 2022 (replacing NAD 83), as well as practical transformation tools and when transformations are needed.',
    estimatedMinutes: 18,
    sections: [
      {
        id: 'fs-d4-dt-s1',
        type: 'concept',
        title: 'Why Datums Differ and Why It Matters',
        content: 'A horizontal datum is the mathematical model of the Earth\'s shape (reference ellipsoid) plus the set of physical monuments that "realize" that model by having published coordinates. Different datums use different ellipsoids, different origins, and different orientations of the coordinate axes. This means that the same physical point on the ground can have noticeably different latitudes and longitudes depending on which datum is used.\n\nNorth American Datum of 1927 (NAD 27): Based on the Clarke 1866 ellipsoid, which was best-fit to North America but not centered at the Earth\'s center of mass. The datum was realized through a continental adjustment computed at Meades Ranch, Kansas (the datum origin). NAD 27 coordinates were published for tens of thousands of control monuments and underlie most historical PLSS surveys, many USGS quadrangle maps, and older boundary surveys.\n\nNorth American Datum of 1983 (NAD 83): Replaced NAD 27 in 1986. Based on the GRS 80 ellipsoid, which is Earth-centered and Earth-fixed — geocentric. The Clarke 1866 ellipsoid fit North America better regionally, but GRS 80 is much closer to the actual shape of the Earth and is compatible with satellite positioning systems. Coordinates of the same points shifted by roughly 10–100 meters when the datum changed from NAD 27 to NAD 83.\n\nImpact on State Plane Coordinates: Because SPCS coordinates depend on the datum, NAD 27 State Plane coordinates and NAD 83 State Plane coordinates for the same physical point are quite different. Converting between them requires a datum transformation, not just a simple math formula.\n\nImplication for Property Surveys: When a legal description references bearings or coordinates based on NAD 27, the modern surveyor must convert them to NAD 83 (or confirm the original datum) before using modern GPS-derived positions.',
      },
      {
        id: 'fs-d4-dt-s2',
        type: 'concept',
        title: 'NSRS 2022: The Coming Change',
        content: 'The National Geodetic Survey (NGS) has been developing a new national reference system called the National Spatial Reference System 2022 (NSRS 2022). This modernization replaces both NAD 83 (horizontal) and NAVD 88 (vertical) with new datums:\n\nNAD 83 replacement: A new geocentric horizontal datum based on the International Terrestrial Reference Frame (ITRF) will supersede NAD 83. The new datum will be Earth-centered and will maintain compatibility with GNSS systems more rigorously. Unlike NAD 83, which is fixed to the North American plate, the new datum will account for tectonic plate motion and provide positions in a global context.\n\nNAVD 88 replacement: A new geoid-based vertical datum called the North American-Pacific Geopotential Datum of 2022 (NAPGD2022) will replace NAVD 88. The new datum will be based on a gravimetric geoid model rather than on leveling networks, making it more physically meaningful and internally consistent over the continent.\n\nWhen will it happen: The adoption has been phased, with NGS publishing the new system tools gradually. Surveyors, engineers, and GIS professionals will need to update software, convert databases, and recompute coordinates in the new system over a transition period of several years.\n\nFor the FS exam: The exam may test your knowledge that NSRS 2022 is replacing NAD 83 and NAVD 88, and that coordinates will shift when converting to the new system — just as they shifted when NAD 27 was replaced by NAD 83.',
      },
      {
        id: 'fs-d4-dt-s3',
        type: 'procedure',
        title: 'How to Transform Coordinates Between NAD 27 and NAD 83',
        procedureSteps: [
          { step: 1, action: 'Identify the source datum of the original coordinates', detail: 'Check survey notes, PLSS records, or deed descriptions for datum references. Older surveys often say "based on NAD 27" or simply predate 1986 (NAD 83 adoption). Many USGS quadrangle maps used NAD 27 for decades.' },
          { step: 2, action: 'Use the NGS NADCON5 tool for transformation', detail: 'NADCON5 is the official NGS software for converting latitude/longitude between NAD 27, NAD 83 realizations, and other North American datums. It uses a grid-based interpolation approach that accounts for regional variation in the datum shift.' },
          { step: 3, action: 'Apply the approximate shift if NADCON5 is unavailable', detail: 'The approximate shift from NAD 27 to NAD 83 in the contiguous United States is roughly +1 to +5 arc seconds in latitude (north) and −1 to −5 arc seconds in longitude (less negative = more east). In meters, this is roughly 10–100 m, varying by region. These are only approximations — do not use them for precise work.' },
          { step: 4, action: 'Convert State Plane Coordinates accordingly', detail: 'State Plane coordinates in NAD 27 and NAD 83 differ because the datum shifts the latitude/longitude and the SPCS zone parameters use different ellipsoid constants. Always specify the datum (and SPCS zone and units) when reporting State Plane coordinates.' },
          { step: 5, action: 'Document the transformation in project records', detail: 'Record which datum the original data was in, which tool was used for transformation, and the datum of the final coordinates. This chain of custody is essential for future users of the data.' },
        ],
      },
      {
        id: 'fs-d4-dt-s4',
        type: 'common_mistakes',
        title: 'Common Mistakes: Datum Transformations',
        commonMistakes: [
          'Mixing NAD 27 and NAD 83 coordinates in the same computation. If your base map is in NAD 27 and your GPS is producing NAD 83 coordinates, they will disagree by 10–100 m. Always confirm the datum before combining data sources.',
          'Assuming that feet and meters are the only conversion needed between datasets. Even after unit conversion, NAD 27 and NAD 83 coordinates for the same point differ. The datum shift is a separate and independent transformation.',
          'Treating the State Plane coordinate shift from NAD 27 to NAD 83 as a simple constant offset. The shift varies across each SPCS zone because the datum transformation is not a simple translation — it also involves a small rotation and scale change.',
          'Overlooking the datum when downloading NGS data. Some older NGS benchmarks have NAD 27 positions (marked on the datasheet as "NAD 27"). Modern benchmarks have NAD 83 positions. Using the wrong set without recognizing the datum difference can introduce large systematic errors.',
        ],
      },
      {
        id: 'fs-d4-dt-s5',
        type: 'knowledge_check',
        title: 'Datum Transformations Knowledge Check',
        knowledgeCheck: {
          question: 'A surveyor recovering an NGS monument finds that the published horizontal position is listed as NAD 27. The surveyor is using a GNSS receiver configured to output positions in NAD 83. When the surveyor stands on the monument and reads the GPS coordinates, which of the following best describes what they will observe?',
          options: [
            'The GPS coordinates will match the published NAD 27 coordinates exactly',
            'The GPS coordinates will differ from the published NAD 27 coordinates by roughly 10–100 meters, even when the receiver is directly on the monument',
            'The GPS coordinates will differ only because the GNSS receiver uses feet and the NGS uses meters',
            'NAD 27 and NAD 83 differ only in the vertical datum, not the horizontal position',
          ],
          correctIndex: 1,
          explanation: 'NAD 27 and NAD 83 are different horizontal datums based on different ellipsoids and different adjustments. The same physical point has noticeably different latitudes and longitudes in each datum — the difference is typically 10 to 100 meters in CONUS. A GNSS receiver configured for NAD 83 will output coordinates that differ from the NAD 27 published values by this datum shift amount, even when the receiver is physically placed on the exact monument. Unit conversion (feet vs. meters) is a separate issue and does not explain the datum difference.',
        },
      },
      {
        id: 'fs-d4-dt-s6',
        type: 'further_reading',
        title: 'Further Reading',
        furtherReading: [
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic IV, Chapter 23 (Map Projections and Coordinate Systems)', topic: 'Horizontal datums, NAD 27 vs NAD 83, State Plane coordinate systems, and datum transformations' },
          { book: 'NGS (geodesy.noaa.gov)', chapter: 'NADCON5 and NSRS 2022 resources', topic: 'Official coordinate transformation tools and documentation for NAD 27 to NAD 83 conversions and the new NSRS 2022' },
        ],
      },
    ],
  },
  {
    id: 'fs-d4-grid-ground',
    examTrack: 'fs',
    domainNumber: 4,
    domain: 'Surveying Principles',
    title: 'Grid vs. Ground Distances and the Combined Scale Factor',
    description: 'State Plane Coordinate System (SPCS) distances (grid distances) differ from actual ground distances because of two correction factors: the sea-level (elevation) reduction and the grid scale factor. This reading explains both factors, how they combine into the "combined factor," and how to convert between ground and grid distances — a classic FS exam topic.',
    estimatedMinutes: 18,
    sections: [
      {
        id: 'fs-d4-gg-s1',
        type: 'concept',
        title: 'Why Grid and Ground Distances Differ',
        content: 'When surveyors work in a State Plane Coordinate System, there are two layers of geometric distortion between measured ground distances and the coordinates plotted on the grid:\n\n1. Elevation above sea level: Survey measurements are made on the physical Earth surface at some elevation. To compare them with other measurements taken at different elevations — or with coordinates on a flat map — all distances must first be reduced to a common reference surface (the geoid/sea level). This is the elevation factor (EF).\n\n2. Map projection distortion: The SPCS projects the curved ellipsoid surface onto a flat plane. Any flat projection of a curved surface introduces some scale distortion. The grid scale factor (k) accounts for this distortion. SPCS was designed so that the scale factor is very close to 1.000 (varying from about 0.9999 to 1.0001 within each zone for most projections), but even these tiny differences matter in high-accuracy work.\n\nTo convert a ground horizontal distance to a grid distance:\nGrid distance = Ground distance × Combined Factor (CF)\n\nTo convert a grid distance back to ground:\nGround distance = Grid distance / CF\n\nThe combined factor is defined as:\nCF = EF × k\nwhere EF = R/(R+h) is the elevation factor (slightly less than 1.0 for all positive elevations), and k is the grid scale factor at the project location.',
      },
      {
        id: 'fs-d4-gg-s2',
        type: 'formula',
        title: 'Elevation Factor and Combined Factor',
        formula: {
          expression: 'EF = R / (R + h);  CF = EF × k;  Grid Dist = Ground Dist × CF',
          variables: [
            { symbol: 'EF', description: 'Elevation factor (ratio of Earth\'s radius to radius at the measurement elevation; always < 1.0 for positive elevations)' },
            { symbol: 'R', description: 'Mean radius of the Earth (≈ 6,371,000 m or 20,906,000 ft)' },
            { symbol: 'h', description: 'Orthometric height (elevation above the geoid) of the survey point or average project elevation' },
            { symbol: 'k', description: 'Grid scale factor at the project location (from SPCS zone tables or NGS software; close to 1.0000)' },
            { symbol: 'CF', description: 'Combined factor = EF × k. Used to convert ground distances to grid distances (and vice versa).' },
          ],
          whenToUse: 'Use whenever you need to convert between ground distances (measured by EDM, tape, or GNSS baseline) and grid distances (SPCS coordinates). Use CF > 1.0 means grid > ground (rare); CF < 1.0 means grid < ground. For inverse problems on the FS exam: ground distance = grid distance / CF.',
        },
      },
      {
        id: 'fs-d4-gg-s3',
        type: 'worked_example',
        title: 'Computing Grid Distance from Ground Distance',
        workedExample: {
          problem: 'A surveyor measures a ground horizontal distance of 3,542.18 ft between two control monuments. The average elevation of the project is 1,850 ft. The grid scale factor for this SPCS zone at the project location is 0.99997. Compute the grid distance between the monuments.',
          steps: [
            { step: 1, description: 'Compute the elevation factor. Use R = 20,906,000 ft:', calculation: 'EF = 20,906,000 / (20,906,000 + 1,850) = 20,906,000 / 20,907,850 = 0.999912' },
            { step: 2, description: 'Compute the combined factor:', calculation: 'CF = EF × k = 0.999912 × 0.99997 = 0.999882' },
            { step: 3, description: 'Compute the grid distance:', calculation: 'Grid distance = 3,542.18 × 0.999882 = 3,541.76 ft' },
            { step: 4, description: 'The difference between ground and grid is:', calculation: '3,542.18 − 3,541.76 = 0.42 ft ≈ 5 inches over 3,542 ft — significant for SPCS coordinate work.' },
          ],
          answer: 'The grid distance is 3,541.76 ft. The combined factor of 0.999882 reduced the ground distance by 0.42 ft. Always apply the combined factor when computing SPCS coordinates from field measurements.',
        },
      },
      {
        id: 'fs-d4-gg-s4',
        type: 'exam_tips',
        title: 'Exam Tips: Grid vs. Ground',
        examTips: [
          'The FS exam frequently asks you to convert between ground and grid distance. The formula is always: Grid = Ground × CF, and Ground = Grid / CF.',
          'The elevation factor EF is always slightly less than 1.0 for positive elevations (ground is above sea level). This means sea-level distances are always shorter than ground distances.',
          'When CF < 1.0 (which is typical for moderate to high elevations), grid distances are shorter than ground distances. Think of it as: the grid "compresses" the distance slightly.',
          'Know the approximate magnitude: at elevation 1,000 m (3,281 ft), the elevation factor alone reduces distances by about 157 ppm (0.000157). At 3,000 m, it reduces by about 470 ppm.',
          'Inverse problem: if the question gives you a SPCS grid distance and asks for ground distance, divide by CF (not multiply). Carefully read whether the given distance is grid or ground.',
          'In the field, modern total stations and GNSS equipment can apply the combined factor automatically when programmed with the elevation and scale factor. But the FS exam expects you to know the calculation.',
        ],
      },
      {
        id: 'fs-d4-gg-s5',
        type: 'knowledge_check',
        title: 'Combined Factor Knowledge Check',
        knowledgeCheck: {
          question: 'Two SPCS grid coordinates define a line with a grid distance of 12,450.00 ft. The combined factor for the project is 0.99985. What is the corresponding ground distance?',
          options: [
            '12,451.87 ft',
            '12,448.13 ft',
            '12,450.00 ft',
            '12,449.93 ft',
          ],
          correctIndex: 0,
          explanation: 'To convert from grid distance to ground distance, divide by the combined factor: Ground = Grid / CF = 12,450.00 / 0.99985 = 12,451.87 ft. Note that since CF < 1.0, ground is LARGER than grid. Option B (12,448.13) results from incorrectly multiplying: 12,450 × 0.99985 = 12,448.13 — this would give the grid distance if you started with ground, not the ground distance from grid.',
        },
      },
      {
        id: 'fs-d4-gg-s6',
        type: 'further_reading',
        title: 'Further Reading',
        furtherReading: [
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic IV, Chapter 23 (Map Projections and Coordinate Systems)', topic: 'State Plane Coordinate System, scale factors, elevation factors, and combined factor computation' },
          { book: 'Elementary Surveying (ES)', chapter: 'Chapter 20', topic: 'Map projections, SPCS, and conversion between ground and grid distances' },
        ],
      },
    ],
  },
];
