import type { ReadingModule } from '../schema';

export const STUDY_READINGS_LIDAR_GRAPHICS: ReadingModule[] = [
  {
    id: 'fs-d11-graphics',
    examTrack: 'fs',
    domainNumber: 2,
    domain: 'Mapping, GIS, and CAD',
    title: 'Graphical Communication & Map Interpretation',
    description: 'Master the graphical conventions used in surveying maps and engineering drawings: contour lines, planimetric features, map accuracy standards (NSSDA/ASPRS), digital terrain models, plans vs. specifications, and the map elements required by ALTA/NSPS and state standards.',
    estimatedMinutes: 22,
    prerequisites: ['fs-d13-lidar'],
    sections: [
      {
        id: 'fs-d11-graphics-s1',
        type: 'concept',
        title: 'Contour Lines — Rules and Characteristics',
        content: 'A contour line connects all points on a surface that have the same elevation. Understanding contour rules is essential for reading topographic maps and detecting errors in digital terrain products.\n\nThe eight fundamental contour rules:\n\n1. Every point on a contour line has the same elevation.\n2. Contour lines never cross or branch (the surface cannot have two elevations at one point).\n3. Every contour line eventually closes — either within the map area or beyond the map edges. No contour line simply ends in open space.\n4. Contour lines never merge, except at a vertical cliff face where multiple lines may appear to coincide.\n5. Closely spaced contours indicate steep terrain; widely spaced contours indicate gentle slopes.\n6. On a ridge, contour lines form V shapes pointing downhill (away from the high point). On a valley or stream, contour lines form V shapes pointing uphill (toward the high point).\n7. A closed contour with hachure marks (short tick marks pointing inward) is a depression.\n8. Contour lines cross streams perpendicularly at the water surface elevation, and the V always points upstream (uphill).\n\nContour interval (CI) is the constant vertical distance between adjacent contour lines. Index contours (every 5th line) are drawn heavier and labeled with their elevation.',
        bookRefs: [
          { book: 'Elementary Surveying (ES)', chapter: 'Chapter 17', topic: 'Topographic surveys and contour maps' },
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic VII, Ch 35', topic: 'Topographic mapping and contour lines' },
        ],
      },
      {
        id: 'fs-d11-graphics-s2',
        type: 'formula',
        title: 'Contour Interval Selection and Map Scale',
        formula: {
          expression: 'CI (feet) ≈ Map Scale Denominator / 1,000 (rule of thumb); Ground Distance = Map Distance × Scale Denominator',
          variables: [
            { symbol: 'CI', description: 'Contour interval — the vertical distance between adjacent contour lines (feet or meters)' },
            { symbol: 'Map Scale Denominator', description: 'The number in the representative fraction (RF) denominator; e.g., for 1:24,000 the denominator is 24,000' },
            { symbol: 'Map Distance', description: 'A measurement taken directly on the paper map' },
            { symbol: 'Ground Distance', description: 'The actual distance on the ground, found by multiplying map distance by the scale denominator (same units)' },
          ],
          whenToUse: 'Use the CI rule of thumb when selecting a contour interval for a new topographic map — the CI should be approximately 1/1,000 of the scale denominator (so a 1:24,000 map would use approximately a 24-foot CI, which rounds to 20 feet in practice). Use the ground distance formula to convert any map measurement to a real-world distance.',
        },
        bookRefs: [
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic VII, Ch 35', topic: 'Contour interval and map scale selection' },
        ],
      },
      {
        id: 'fs-d11-graphics-s3',
        type: 'worked_example',
        title: 'Computing Ground Slope from Contour Spacing',
        workedExample: {
          problem: 'A 1:4,800 scale topographic map has a 10-foot contour interval. Two adjacent contour lines are measured 22 mm apart on the map. What is the approximate ground slope between these contours?',
          steps: [
            { step: 1, description: 'Convert map measurement to ground distance.', calculation: 'Ground distance = 22 mm × 4,800 = 105,600 mm = 105.6 m × 3.2808 ft/m = 346.4 ft' },
            { step: 2, description: 'Identify the vertical rise between the two contours.', calculation: 'Rise = contour interval = 10 ft' },
            { step: 3, description: 'Compute slope as rise ÷ run.', calculation: 'Slope = 10 ÷ 346.4 = 0.0289 = 2.89%' },
          ],
          answer: 'The approximate ground slope is 2.9%. On the map, the formula is: slope = CI / (map distance × scale denominator) expressed in consistent units.',
        },
      },
      {
        id: 'fs-d11-graphics-s4',
        type: 'knowledge_check',
        title: 'Contour Line Rules Check',
        knowledgeCheck: {
          question: 'On a topographic map, contour lines forming a V shape that points uphill (toward higher elevations) most likely indicate which terrain feature?',
          options: [
            'A ridge or divide',
            'A closed depression',
            'A stream or valley',
            'A steep cliff face',
          ],
          correctIndex: 2,
          explanation: 'Contour lines cross streams and valleys with a V pointing uphill (toward higher ground). Water flows in the direction opposite to the V point. Ridges also produce V-shaped contours, but the V on a ridge points downhill. A depression is shown by closed contours with hachure marks. A cliff face shows contours that nearly coincide.',
        },
      },
      {
        id: 'fs-d11-graphics-s5',
        type: 'concept',
        title: 'Planimetric Maps vs. Topographic Maps vs. DTMs',
        content: 'Three fundamental map types appear frequently on the FS exam:\n\nPlanimetric Map: Shows the horizontal positions of natural and cultural features (roads, buildings, water bodies, fences, utilities) but does NOT show elevation. It is a 2D representation of what can be seen from above. Aerial photography is the classic data source.\n\nTopographic Map: Shows all planimetric features PLUS the shape of the terrain through contour lines, spot elevations, or shading. Provides both horizontal and vertical information.\n\nDigital Terrain Model (DTM): A 3D representation of the bare-earth surface. Similar to a DEM, but the term DTM is sometimes used specifically to include break lines (edges of roads, tops of ridges, toe of slopes) in addition to mass points, which provides more accurate surface modeling at abrupt changes in terrain. In common usage, DTM and DEM are often used interchangeably, but on the FS exam distinguish:\n- DTM: may include break lines and mass points\n- DEM: typically a raster grid derived from elevation data (LiDAR ground returns, photogrammetric points, or survey data)\n- TIN (Triangulated Irregular Network): a vector surface connecting irregularly spaced elevation points into triangular facets\n\nFor engineering and construction:\n- Plans: engineering drawings showing the proposed design (alignments, grades, structures)\n- Specifications: written technical requirements for materials, methods, and quality standards\n- Planimetric mapping provides the base on which engineering plans are drafted',
        bookRefs: [
          { book: 'Elementary Surveying (ES)', chapter: 'Chapter 17', topic: 'Topographic maps, DTMs, and planimetric data' },
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic VII, Ch 34', topic: 'Map types and digital terrain models' },
        ],
      },
      {
        id: 'fs-d11-graphics-s6',
        type: 'concept',
        title: 'Map Accuracy Standards — NSSDA and ASPRS',
        content: 'Two major standards govern the positional accuracy of geospatial products used in surveying and mapping:\n\nNSSDA (National Standard for Spatial Data Accuracy):\nPublished by FGDC (Federal Geographic Data Committee), NSSDA quantifies geospatial accuracy at the 95% confidence level using RMSE (Root Mean Square Error) statistics.\n- Horizontal Accuracy (RMSEr): reported as the radius of a circle of uncertainty within which 95% of tested points fall. Horizontal Accuracy at 95% = 1.7308 × RMSEr\n- Vertical Accuracy (RMSEZ): reported as linear uncertainty. Vertical Accuracy at 95% = 1.9600 × RMSEZ\nBoth are compared against independent check points of higher accuracy.\n\nASPRS Positional Accuracy Standards for Digital Geospatial Data:\nA hierarchical set of accuracy classes (Class I through Class III, and higher) with specific RMSE thresholds for horizontal and vertical products from aerial photography, LiDAR, and photogrammetry. Each class defines a horizontal RMSEr and vertical RMSEZ. USGS LiDAR Quality Levels (QL1, QL2, QL3) align with these classes:\n- QL3: vertical RMSEZ ≤ 20 cm, min 1 pt/m²\n- QL2: vertical RMSEZ ≤ 10 cm, min 2 pts/m²\n- QL1: vertical RMSEZ ≤ 9.25 cm, min 8 pts/m²\n\nOn the FS exam, know: accuracy is always tested against independent check points, NSSDA reports at 95% confidence, and accuracy is distinct from precision (repeatability).',
        bookRefs: [
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic VII, Ch 37', topic: 'Geospatial accuracy standards' },
          { book: 'Elementary Surveying (ES)', chapter: 'Chapter 17', topic: 'Map accuracy and quality standards' },
        ],
      },
      {
        id: 'fs-d11-graphics-s7',
        type: 'formula',
        title: 'NSSDA Horizontal and Vertical Accuracy at 95%',
        formula: {
          expression: 'Horizontal Accuracy (95%) = 1.7308 × RMSEr; Vertical Accuracy (95%) = 1.9600 × RMSEZ',
          variables: [
            { symbol: 'Horizontal Accuracy (95%)', description: 'The circular error at the 95% confidence level — the radius of a circle within which 95% of tested positions fall' },
            { symbol: 'RMSEr', description: 'Root mean square error of the horizontal position (radial), computed as sqrt(RMSEx² + RMSEy²)' },
            { symbol: 'Vertical Accuracy (95%)', description: 'The linear elevation error at the 95% confidence level' },
            { symbol: 'RMSEZ', description: 'Root mean square error of the vertical position (elevation)' },
            { symbol: '1.7308', description: 'Conversion factor from radial RMSE to the 95% circular error for a 2D bivariate normal distribution' },
            { symbol: '1.9600', description: 'Conversion factor from 1σ RMSE to 95% confidence for a 1D normal distribution (the 95th percentile Z-score)' },
          ],
          whenToUse: 'Use when computing or reporting NSSDA-compliant horizontal and vertical accuracy statements for geospatial products. Test the product against independent check points, compute RMSE from the differences, then apply these multipliers to report the 95% accuracy value.',
        },
      },
      {
        id: 'fs-d11-graphics-s8',
        type: 'worked_example',
        title: 'Computing NSSDA Vertical Accuracy',
        workedExample: {
          problem: 'A LiDAR-derived DEM is checked against 50 GPS-surveyed ground control points. The elevation differences (DEM minus GPS) at the 50 points have a standard deviation of 0.08 m, and the mean difference is +0.02 m. Compute the RMSEZ and the NSSDA vertical accuracy at 95%.',
          steps: [
            { step: 1, description: 'RMSEZ combines the standard deviation (precision) and the mean error (systematic bias).', calculation: 'RMSEZ = sqrt(σ² + mean²) = sqrt(0.08² + 0.02²) = sqrt(0.0064 + 0.0004) = sqrt(0.0068) = 0.0825 m' },
            { step: 2, description: 'Compute NSSDA vertical accuracy at 95%.', calculation: 'Vertical Accuracy (95%) = 1.9600 × RMSEZ = 1.9600 × 0.0825 = 0.162 m' },
          ],
          answer: 'RMSEZ = 0.083 m; NSSDA Vertical Accuracy at 95% = 0.16 m. The DEM meets ASPRS QL2 requirements (RMSEZ ≤ 10 cm is not met here — 0.083 m > 0.10 m — this DEM would qualify as QL3 with RMSEZ ≤ 20 cm).',
        },
      },
      {
        id: 'fs-d11-graphics-s9',
        type: 'knowledge_check',
        title: 'Map Accuracy Standards Check',
        knowledgeCheck: {
          question: 'According to NSSDA, horizontal accuracy is reported at which confidence level?',
          options: [
            '50% (median error)',
            '68% (one standard deviation)',
            '90% (standard engineering threshold)',
            '95% (95th percentile of tested positions)',
          ],
          correctIndex: 3,
          explanation: 'NSSDA reports both horizontal and vertical accuracy at the 95% confidence level. Horizontal accuracy uses 1.7308 × RMSEr to convert from radial RMSE to the 95% circular error. Vertical accuracy uses 1.9600 × RMSEZ to convert from RMSE to the 95% linear confidence interval. This standardization allows comparison of accuracy values across different products and specifications.',
        },
      },
      {
        id: 'fs-d11-graphics-s10',
        type: 'further_reading',
        title: 'Graphical Communication References',
        furtherReading: [
          { book: 'Elementary Surveying: An Introduction to Geomatics (Ghilani & Wolf)', chapter: 'Chapter 17', topic: 'Topographic maps, contour interpolation, and map accuracy' },
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic VII, Ch 34-37', topic: 'Mapping, GIS, CAD, and accuracy standards' },
          { book: 'ASPRS Positional Accuracy Standards for Digital Geospatial Data (current edition)', chapter: 'Section 3-5', topic: 'Accuracy classes, RMSE thresholds, and reporting requirements' },
          { book: 'FGDC NSSDA (FGDC-STD-007.3-1998)', chapter: 'Full document', topic: 'National Standard for Spatial Data Accuracy — horizontal and vertical accuracy reporting' },
        ],
      },
    ],
  },
];
