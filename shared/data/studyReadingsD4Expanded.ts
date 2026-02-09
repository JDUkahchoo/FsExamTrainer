import type { ReadingModule } from '../schema';

export const STUDY_READINGS_D4_EXPANDED: ReadingModule[] = [
  {
    id: 'fs-d4-advgeo',
    examTrack: 'fs',
    domainNumber: 4,
    domain: 'Surveying Principles',
    title: 'Advanced Geodesy: Reductions, Gravity & Spherical Trigonometry',
    description: 'Extend your geodesy knowledge beyond the basics. This reading covers spherical trigonometry for geodetic calculations, reducing field observations to the ellipsoid, gravity and geoid modeling, deflection of the vertical, and satellite coordinate systems. These advanced topics appear on the FS exam under Surveying Principles.',
    estimatedMinutes: 25,
    sections: [
      {
        id: 'fs-d4-advgeo-s1',
        type: 'concept',
        title: 'Spherical Trigonometry Fundamentals',
        content: 'Spherical trigonometry deals with triangles drawn on the surface of a sphere, where the sides are arcs of great circles rather than straight lines. In geodesy, the Earth is approximated as a sphere (or ellipsoid) and many calculations require spherical formulas rather than the plane trigonometry used in local surveys.\n\nA spherical triangle has three angular vertices and three arc sides. Unlike plane triangles, the angles of a spherical triangle sum to more than 180 degrees. The amount by which the sum exceeds 180 degrees is called the spherical excess (E), which is directly proportional to the area of the triangle.\n\nSpherical Excess: E = (A + B + C) - 180°, where A, B, C are the three angles. For a triangle on the Earth\'s surface, E is typically very small (a few seconds of arc for triangles with sides of tens of kilometers).\n\nThe Spherical Law of Sines:\nsin(a)/sin(A) = sin(b)/sin(B) = sin(c)/sin(C)\nwhere a, b, c are the arc sides (measured as central angles) and A, B, C are the vertex angles.\n\nThe Spherical Law of Cosines:\ncos(a) = cos(b)cos(c) + sin(b)sin(c)cos(A)\nThis is the spherical equivalent of the plane law of cosines and is used to solve spherical triangles when sides and angles are known.\n\nSurveyors encounter spherical trigonometry primarily in geodetic computations, astronomical observations, and satellite positioning calculations. For most local surveying over areas less than about 20 km, plane trigonometry provides sufficient accuracy.',
      },
      {
        id: 'fs-d4-advgeo-s2',
        type: 'formula',
        title: 'Spherical Excess and Area',
        formula: {
          expression: 'E = (A + B + C) - 180°; Area = E × R² (E in radians)',
          variables: [
            { symbol: 'E', description: 'Spherical excess' },
            { symbol: 'A, B, C', description: 'Angles of the spherical triangle' },
            { symbol: 'R', description: 'Radius of the sphere (mean Earth radius ≈ 6,371 km)' },
          ],
          whenToUse: 'Use when computing the area of a triangle on the Earth\'s surface in geodetic surveying, or when determining the expected spherical excess for a geodetic triangle.',
        },
      },
      {
        id: 'fs-d4-advgeo-s3',
        type: 'concept',
        title: 'Reducing Observations to the Ellipsoid',
        content: 'Field measurements are made on the physical surface of the Earth at various elevations. To use these measurements in geodetic computations on the reference ellipsoid, they must be "reduced" — corrected for the difference between the measurement surface and the ellipsoid.\n\nSea-Level (Geoid) Reduction of Distances: A horizontal distance measured at elevation h must be reduced to its equivalent at sea level (the geoid). The reduction formula uses the ratio of the radius of curvature at the measurement point to the radius at sea level:\n\nD_reduced = D_measured × R / (R + h)\n\nwhere R is the mean radius of the Earth (approximately 6,371,000 meters) and h is the elevation above the geoid (orthometric height). At an elevation of 1,000 meters, this correction shortens a 1,000-meter measured distance by approximately 0.157 meters.\n\nEllipsoid Reduction: After reducing to the geoid, an additional small correction converts from the geoid to the ellipsoid surface. This correction accounts for the geoid-ellipsoid separation (geoid height N) and is typically very small.\n\nGrid Reduction (Scale Factor): When working in a State Plane Coordinate System (SPCS), an additional scale factor converts from the ellipsoid distance to the grid distance. The combined factor (elevation factor × grid scale factor) is called the combined scale factor or "combined factor." This was introduced in the Geodesy Fundamentals reading.\n\nWhy This Matters: Failing to apply these reductions can introduce significant errors in geodetic-quality surveys. A traverse at 2,000 meters elevation that is 10 km long would have an error of over 3 meters if the sea-level reduction were not applied.',
      },
      {
        id: 'fs-d4-advgeo-s4',
        type: 'formula',
        title: 'Sea-Level Distance Reduction',
        formula: {
          expression: 'D_sealevel = D_measured × R / (R + h)',
          variables: [
            { symbol: 'D_sealevel', description: 'Distance reduced to sea level (geoid)' },
            { symbol: 'D_measured', description: 'Horizontal distance measured at elevation h' },
            { symbol: 'R', description: 'Mean radius of the Earth (≈ 6,371,000 m)' },
            { symbol: 'h', description: 'Orthometric height (elevation above the geoid) in meters' },
          ],
          whenToUse: 'Use when reducing a measured horizontal distance from field elevation to its sea-level equivalent for geodetic computations or State Plane coordinate calculations.',
        },
      },
      {
        id: 'fs-d4-advgeo-s5',
        type: 'worked_example',
        title: 'Sea-Level Distance Reduction Example',
        workedExample: {
          problem: 'A horizontal distance of 2,500.000 meters is measured between two control points at an average elevation of 1,500 meters above sea level. Reduce this distance to sea level.',
          steps: [
            { step: 1, description: 'Identify the values: D_measured = 2,500.000 m, h = 1,500 m, R = 6,371,000 m' },
            { step: 2, description: 'Apply the reduction formula: D_sealevel = D_measured × R / (R + h)', calculation: 'D_sealevel = 2,500.000 × 6,371,000 / (6,371,000 + 1,500)' },
            { step: 3, description: 'Calculate the denominator: R + h = 6,372,500', calculation: '2,500.000 × 6,371,000 / 6,372,500 = 2,500.000 × 0.999765 = 2,499.411 m' },
            { step: 4, description: 'The correction is: 2,500.000 - 2,499.411 = 0.589 m (the distance is shortened by about 0.59 m)' },
          ],
          answer: 'D_sealevel = 2,499.411 meters. The sea-level reduction shortens the distance by 0.589 meters, which is significant for geodetic work.',
        },
      },
      {
        id: 'fs-d4-advgeo-s6',
        type: 'concept',
        title: 'Gravity Modeling and the Geoid',
        content: 'The geoid is the equipotential surface of the Earth\'s gravity field that best approximates mean sea level. It is an irregular surface because the Earth\'s mass is not uniformly distributed — mountain ranges, ocean trenches, and variations in rock density all cause local variations in gravity.\n\nGravity and the Plumb Line: A surveyor\'s plumb bob and level bubble respond to gravity, aligning with the direction of the local gravity vector. This direction is perpendicular to the geoid surface at that point. Because the geoid is irregular, the gravity direction varies from place to place in ways that a smooth ellipsoid cannot predict.\n\nGeoid Models: The National Geodetic Survey (NGS) publishes geoid models that provide the separation (N) between the geoid and the reference ellipsoid (GRS 80/NAD 83) at any location. The current model for the continental US is GEOID18. Geoid heights (N values) in the contiguous United States range from approximately -8 meters to -53 meters (the geoid is below the ellipsoid throughout CONUS).\n\nOrthometric Height from Ellipsoidal Height: The relationship between heights is:\nh = H + N\nwhere h is the ellipsoidal height (from GNSS), H is the orthometric height (elevation above the geoid, what we commonly call "elevation"), and N is the geoid height (separation between geoid and ellipsoid).\n\nGravity Anomalies: The difference between observed gravity at a point and the theoretical gravity predicted by a model. Gravity anomalies are used in geoid modeling and in geophysical exploration. Positive anomalies indicate denser-than-expected subsurface material; negative anomalies indicate less dense material.\n\nPractical Impact: When a GNSS receiver reports a height, it reports the ellipsoidal height (h). To convert this to a useful orthometric height (H, what appears on topographic maps), the surveyor must subtract the geoid height: H = h - N. Without this conversion, GNSS-derived elevations can be off by tens of meters.',
      },
      {
        id: 'fs-d4-advgeo-s7',
        type: 'concept',
        title: 'Deflection of the Vertical',
        content: 'The deflection of the vertical is the angular difference between the direction of gravity (perpendicular to the geoid) and the normal to the ellipsoid at the same point. In other words, it is the angle between where a plumb bob actually points and where it would point if the Earth were a perfect ellipsoid.\n\nComponents: The deflection is typically resolved into two components:\n- Xi (north-south component): The deflection in the meridian plane\n- Eta (east-west component): The deflection in the prime vertical plane\n\nMagnitude: In most areas, deflections are small, typically a few seconds of arc (1-10 arc seconds). In mountainous regions near major mass anomalies, deflections can reach 30 arc seconds or more.\n\nEffect on Surveying: Deflection of the vertical causes the following effects:\n\n1. Astronomic vs. Geodetic Positions: An astronomic position determined by observing stars is referenced to the gravity vector (geoid), while a geodetic position is referenced to the ellipsoid normal. The difference between these positions equals the deflection of the vertical.\n\n2. Leveling: Spirit leveling follows the geoid (gravity equipotential surfaces), not the ellipsoid. Over long leveling lines, the accumulated effect of deflection causes the leveled heights to differ from heights computed on the ellipsoid.\n\n3. Angular Measurements: Theodolite and total station measurements are made relative to the gravity vector (the instrument levels using a bubble or compensator). In areas with significant deflection, measured horizontal and vertical angles may differ slightly from their geodetic equivalents.\n\nFor most boundary and local surveys, deflection of the vertical is negligible. It becomes significant in geodetic surveys, long-range traverses, and when converting between astronomic and geodetic coordinates.',
      },
      {
        id: 'fs-d4-advgeo-s8',
        type: 'concept',
        title: 'Satellite Coordinate Systems',
        content: 'GNSS satellites and receivers use coordinate systems that differ from the local survey coordinate systems most surveyors work with daily. Understanding these systems is important for correctly interpreting and transforming GNSS-derived positions.\n\nEarth-Centered, Earth-Fixed (ECEF): Also called the geocentric Cartesian system. The origin is at the Earth\'s center of mass. The X-axis points toward the intersection of the prime meridian and the equator. The Y-axis points toward 90 degrees east longitude on the equator. The Z-axis points toward the North Pole (along the rotation axis). GNSS receivers initially compute positions in ECEF coordinates, then convert to latitude, longitude, and ellipsoidal height.\n\nWGS 84 (World Geodetic System 1984): The global reference frame used by GPS. It defines both the reference ellipsoid and the coordinate system. WGS 84 is maintained by the U.S. National Geospatial-Intelligence Agency (NGA) and is periodically updated to align with the International Terrestrial Reference Frame (ITRF). For most practical purposes, WGS 84 and NAD 83 are nearly identical (within about 1-2 meters), but for precise work, the distinction matters.\n\nNAD 83 (North American Datum of 1983): The official horizontal datum for the United States, Canada, Mexico, and Central America. NAD 83 is realized through a network of control stations with published coordinates. The most recent realization is NAD 83(2011). NAD 83 is fixed to the North American tectonic plate, so coordinates on the plate do not change over time due to plate motion.\n\nITRF (International Terrestrial Reference Frame): The most precise global reference frame, maintained by the International Earth Rotation and Reference Systems Service (IERS). Unlike NAD 83, ITRF is not fixed to any tectonic plate, so coordinates change over time due to plate tectonics. ITRF positions in North America shift approximately 1-2 cm per year relative to NAD 83.\n\nCoordinate Transformations: Converting between these systems requires transformation parameters (translations, rotations, and scale factors). The most common transformations are 7-parameter (Helmert) transformations. NGS provides tools like HTDP (Horizontal Time-Dependent Positioning) for transforming between reference frames and epochs.',
      },
      {
        id: 'fs-d4-advgeo-s9',
        type: 'knowledge_check',
        title: 'Advanced Geodesy Knowledge Check',
        knowledgeCheck: {
          question: 'A GNSS receiver reports an ellipsoidal height of 325.42 meters at a point where the geoid height (N) is -28.50 meters. What is the orthometric height (elevation) at this point?',
          options: [
            '353.92 meters',
            '296.92 meters',
            '325.42 meters',
            '28.50 meters',
          ],
          correctIndex: 0,
          explanation: 'Using the relationship h = H + N, we solve for the orthometric height H: H = h - N = 325.42 - (-28.50) = 325.42 + 28.50 = 353.92 meters. The geoid height N = -28.50 m means the geoid is 28.50 meters below the ellipsoid at this location. Since the orthometric height is measured from the geoid (which is lower than the ellipsoid here), the orthometric height is larger than the ellipsoidal height.',
        },
      },
      {
        id: 'fs-d4-advgeo-s10',
        type: 'further_reading',
        title: 'Further Reading: Advanced Geodesy',
        furtherReading: [
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Chapters 25-28', topic: 'Geodesy, satellite positioning, and coordinate systems' },
          { book: 'Elementary Surveying (ES)', chapter: 'Chapters 19-20', topic: 'Control surveys, satellite positioning' },
          { book: 'NGS (geodesy.noaa.gov)', chapter: 'Online Tools', topic: 'GEOID models, coordinate conversion tools, CORS data' },
          { book: 'NCEES FS Reference Handbook', chapter: 'Geodesy', topic: 'Geodetic reference systems and coordinate conversions' },
        ],
      },
    ],
  },
  {
    id: 'fs-d4-historical',
    examTrack: 'fs',
    domainNumber: 4,
    domain: 'Surveying Principles',
    title: 'Historical Methods, Route Surveying & Magnetic Declination',
    description: 'Understand the historical surveying instruments and methods that produced the records modern surveyors must interpret, route surveying fundamentals for transportation projects, and the critical role of magnetic declination in converting between magnetic and true bearings.',
    estimatedMinutes: 22,
    sections: [
      {
        id: 'fs-d4-historical-s1',
        type: 'concept',
        title: 'Historical Surveying Instruments and Methods',
        content: 'Modern surveyors frequently retrace boundaries that were originally established using instruments and methods very different from those used today. Understanding these historical methods helps surveyors interpret original survey records and evaluate the expected accuracy of historical measurements.\n\nThe Compass (Magnetic Compass/Surveyor\'s Compass): Used from colonial times through the early 20th century. Measured magnetic bearings (directions referenced to magnetic north). Accuracy typically limited to about 15 to 30 minutes of arc due to magnetic variations, local attraction, and instrument limitations. When retracing old compass surveys, the surveyor must account for changes in magnetic declination since the original survey.\n\nThe Chain (Gunter\'s Chain): The standard distance-measuring device for land surveys from the 1600s through the late 1800s. A Gunter\'s chain is 66 feet long and consists of 100 links, each 0.66 feet (7.92 inches). Key conversions: 80 chains = 1 mile; 10 square chains = 1 acre. Many legal descriptions from this era express distances in chains and links. Expected accuracy: typically 1:1,000 to 1:3,000 (1 foot of error per 1,000 to 3,000 feet measured).\n\nThe Transit: Replaced the compass for angular measurement in the mid-1800s. A transit measures horizontal and vertical angles using a graduated circle and vernier scales. Accuracy typically 30 seconds to 1 minute of arc. Transits measured angles directly rather than referencing magnetic north, making their measurements more reliable for retracement.\n\nThe Solar Compass/Solar Transit: Used to determine true north from solar observations, avoiding magnetic declination issues. William Austin Burt invented the solar compass in 1836. The BLM used solar observations extensively in PLSS surveys. Solar compass bearings are referenced to true north and do not require declination corrections.\n\nStadia: A method of measuring distances using the stadia hairs in a transit or level telescope and a stadia rod. The interval between the stadia hairs multiplied by the stadia interval factor (typically 100) gives the distance. Accuracy: approximately 1:300 to 1:1,000. Stadia was commonly used for topographic surveys and mapping.',
      },
      {
        id: 'fs-d4-historical-s2',
        type: 'concept',
        title: 'Magnetic Declination',
        content: 'Magnetic declination (also called magnetic variation) is the angular difference between true north (geographic north, toward the North Pole) and magnetic north (the direction a compass needle points). Understanding declination is essential for interpreting historical surveys and for any work involving magnetic bearings.\n\nDirectional Convention: If magnetic north is east of true north, the declination is East (positive). If magnetic north is west of true north, the declination is West (negative).\n\nVariation Over Time (Secular Change): Magnetic declination changes over time because the Earth\'s magnetic poles migrate. In the contiguous United States, declination has changed by as much as 1 degree per decade in some locations. The agonic line (where declination is zero) currently runs roughly through the Great Lakes and Gulf Coast region but shifts over time.\n\nConverting Between Magnetic and True Bearings: To convert a magnetic bearing to a true bearing:\n- East declination: True Bearing = Magnetic Bearing + Declination\n- West declination: True Bearing = Magnetic Bearing - Declination\n\nWhen retracing a historical compass survey, the surveyor must determine the declination at the date of the original survey and the current declination, then adjust the original magnetic bearings accordingly.\n\nLocal Attraction: Localized magnetic anomalies caused by iron ore deposits, steel structures, power lines, or buried metal objects that cause a compass to deviate from magnetic north. Local attraction affects all bearings observed from the affected point by the same amount and can be detected by comparing the forward and back bearings of traverse lines.\n\nIsogonic Map: A map showing lines of equal magnetic declination (isogonic lines). The NCEES FS Reference Handbook typically includes an isogonic chart. NOAA\'s National Centers for Environmental Information (NCEI) provides current declination values through its magnetic declination calculator.',
      },
      {
        id: 'fs-d4-historical-s3',
        type: 'formula',
        title: 'Magnetic Declination Conversion Formulas',
        formula: {
          expression: 'True Bearing = Magnetic Bearing + East Declination; True Bearing = Magnetic Bearing - West Declination',
          variables: [
            { symbol: 'True Bearing', description: 'Bearing referenced to true (geographic) north' },
            { symbol: 'Magnetic Bearing', description: 'Bearing referenced to magnetic north (compass reading)' },
            { symbol: 'Declination', description: 'Angular difference between true north and magnetic north (East = positive, West = negative)' },
          ],
          whenToUse: 'Use when converting between magnetic bearings (from compass surveys, especially historical) and true bearings. Essential for retracing boundaries from old compass surveys.',
        },
      },
      {
        id: 'fs-d4-historical-s4',
        type: 'worked_example',
        title: 'Magnetic Declination Correction',
        workedExample: {
          problem: 'A deed from 1920 describes a boundary line as "N 45°00\' E" (magnetic bearing). The magnetic declination in 1920 was 5°30\' West. The current declination is 3°15\' West. (a) What is the true bearing of the line? (b) What magnetic bearing would a compass read today for the same line?',
          steps: [
            { step: 1, description: 'Find the true bearing using the 1920 declination. Since the declination was West, subtract from the magnetic bearing.', calculation: 'True Bearing = N 45°00\' E - 5°30\' W = N 39°30\' E' },
            { step: 2, description: 'The true bearing is fixed (it does not change). True Bearing = N 39°30\' E.' },
            { step: 3, description: 'Find today\'s magnetic bearing using the current declination. Since today\'s declination is West, add it to the true bearing to get the magnetic bearing.', calculation: 'Magnetic Bearing (today) = N 39°30\' E + 3°15\' W = N 42°45\' E' },
          ],
          answer: '(a) True bearing = N 39°30\' E. (b) Today\'s compass would read N 42°45\' E for the same line.',
        },
      },
      {
        id: 'fs-d4-historical-s5',
        type: 'concept',
        title: 'Convergence of Meridians',
        content: 'Meridians of longitude converge (come closer together) as they approach the poles. This convergence has important practical effects on surveying and mapping.\n\nGeographic Effect: At the equator, one degree of longitude spans approximately 111.3 km. At latitude 45°N, one degree of longitude spans approximately 78.8 km. At the poles, the spacing is zero. This convergence means that a line following a constant bearing (loxodrome or rhumb line) is not the same as the shortest path between two points on the Earth (geodesic or great circle).\n\nEffect on PLSS: In the rectangular survey system, the east-west township lines (parallels of latitude) are parallel to each other, but the north-south range lines (meridians) converge toward the north. This means that townships in the northern tier are narrower at the top than at the bottom. To compensate, the PLSS establishes correction lines (standard parallels or baselines) at regular intervals (typically every 24 miles) where new range lines are started, creating small jogs in the range lines.\n\nMapping Angle (Grid Convergence): When a curved meridian is projected onto a flat map (grid), the projected meridian is generally not parallel to the grid north lines except along the central meridian. The angle between true north and grid north at any point is called the mapping angle or grid convergence. In State Plane Coordinate Systems:\n\n- On Transverse Mercator projections: convergence is zero on the central meridian and increases with distance east or west.\n- On Lambert Conformal Conic projections: convergence varies with both latitude and longitude.\n\nConvergence must be applied when converting between true bearings and grid bearings: Grid Bearing = True Bearing - Convergence (with appropriate sign convention).',
      },
      {
        id: 'fs-d4-historical-s6',
        type: 'concept',
        title: 'Route Surveying Fundamentals',
        content: 'Route surveying is the branch of surveying concerned with the design, layout, and construction of linear transportation and utility projects such as highways, railroads, pipelines, and transmission lines.\n\nAlignment: The horizontal path of the route, defined by a series of tangent lines connected by horizontal curves (circular or spiral). The alignment is typically defined by a series of Points of Intersection (PI) where tangent lines meet, with curves designed to provide smooth transitions.\n\nProfile: The vertical path of the route along the alignment. The profile is a graph showing elevation versus station (distance along the route). Vertical curves (parabolic) connect grade lines of different slopes to provide smooth vertical transitions.\n\nStations: Distances along a route are measured continuously from the beginning point and expressed in "station" format. Station 0+00 is the starting point. Station 15+50 is 1,550 feet from the start. Station 100+00 is 10,000 feet (almost 2 miles) from the start. This stationing system allows any point along the route to be referenced by a single number.\n\nCross Sections: Vertical slices taken perpendicular to the alignment at regular stations. Cross sections show the existing ground surface and the proposed design surface, and are used to calculate earthwork quantities (cut and fill volumes).\n\nRight-of-Way: The strip of land acquired for the route, typically defined by specified widths on either side of the centerline. Surveyors are involved in both the design (determining the optimal alignment) and the acquisition (performing boundary and right-of-way surveys) phases.\n\nSuperelevation: On curves, the roadway is tilted (banked) to counteract centrifugal force. The amount of tilt is the superelevation rate, typically expressed as a decimal (e.g., 0.06 = 6% cross-slope). Spiral curves are used to gradually introduce superelevation.',
      },
      {
        id: 'fs-d4-historical-s7',
        type: 'knowledge_check',
        title: 'Historical Methods & Declination Knowledge Check',
        knowledgeCheck: {
          question: 'A surveyor is retracing a boundary originally surveyed with a compass in 1875. The original field notes record a bearing of S 78°15\' W (magnetic). The magnetic declination in 1875 was 8°00\' East. What is the true bearing of this line?',
          options: [
            'S 70°15\' W',
            'S 86°15\' W',
            'S 78°15\' W',
            'N 78°15\' E',
          ],
          correctIndex: 1,
          explanation: 'To convert a magnetic bearing to true bearing with East declination, add the declination to the bearing angle. The magnetic bearing is S 78°15\' W. With 8°00\' East declination, the true bearing swings further west: S (78°15\' + 8°00\') W = S 86°15\' W. East declination means magnetic north is east of true north, so magnetic bearings need to be rotated to account for this offset. The bearing angle (measured from south toward west in this case) increases.',
        },
      },
      {
        id: 'fs-d4-historical-s8',
        type: 'further_reading',
        title: 'Further Reading: Historical Methods & Route Surveying',
        furtherReading: [
          { book: 'Elementary Surveying (ES)', chapter: 'Chapters 7-8', topic: 'Compass and transit surveys, magnetic declination' },
          { book: 'Elementary Surveying (ES)', chapter: 'Chapters 24-25', topic: 'Route surveying, highway curves, and alignment design' },
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Chapters 13-14', topic: 'Historical measurement methods' },
          { book: 'BLM Manual of Surveying Instructions (2009)', chapter: 'Chapter 3', topic: 'Original PLSS survey methods using compass and chain' },
        ],
      },
    ],
  },
];
