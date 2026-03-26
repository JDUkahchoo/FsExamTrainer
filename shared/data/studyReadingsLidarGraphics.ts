import type { ReadingModule } from '../schema';

export const STUDY_READINGS_LIDAR_GRAPHICS: ReadingModule[] = [
  {
    id: 'fs-d8-lidar',
    examTrack: 'fs',
    domainNumber: 2,
    domain: 'Mapping, GIS, and CAD',
    title: 'LiDAR: Ground Control, QA/QC & Photogrammetry Comparison',
    description: 'Go beyond LiDAR basics to understand the QA/QC workflow, ground control requirements, accuracy specifications (ASPRS/USGS quality levels), and how LiDAR compares with photogrammetry for topographic data collection.',
    estimatedMinutes: 18,
    prerequisites: ['fs-d13-lidar'],
    sections: [
      {
        id: 'fs-d8-lidar-s1',
        type: 'concept',
        title: 'Ground Control for LiDAR Projects',
        content: 'Although a LiDAR system uses its own on-board GNSS and IMU to geolocate each laser return, independent ground control is required to verify (and sometimes improve) the accuracy of the final point cloud and elevation products.\n\nTwo types of ground-based reference data are collected for LiDAR QA/QC:\n\n1. Ground Control Points (GCPs): Precisely surveyed horizontal and vertical positions placed in open areas free of vegetation and overhead obstructions. GCPs are used to apply boresight calibration corrections to the raw data if significant systematic offsets are found. They are established with differential or RTK GNSS surveying and tied to the project datum.\n\n2. Check Points (CPs): Independent positions NOT used in the calibration or adjustment of the LiDAR data — used only for accuracy assessment. ASPRS and FEMA standards require a minimum number of check points distributed across the project area to support statistical accuracy reporting. Check points must be measured with higher accuracy than the required product accuracy (typically surveyed at 2–3× the required RMSEZ).\n\nKey principle: GCPs calibrate; check points verify. A project with only GCPs and no independent check points cannot make a valid NSSDA accuracy statement.',
        bookRefs: [
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic VII, Ch 37', topic: 'LiDAR ground control and accuracy assessment' },
          { book: 'Elementary Surveying (ES)', chapter: 'Chapter 28', topic: 'LiDAR QA/QC and ground control' },
        ],
      },
      {
        id: 'fs-d8-lidar-s2',
        type: 'concept',
        title: 'LiDAR QA/QC Workflow',
        content: 'A rigorous LiDAR production workflow includes multiple quality control steps:\n\n1. Raw Data Review: Inspect flight trajectory files (GNSS + IMU), ensure all planned flight lines were collected, check for trajectory gaps or periods of poor GNSS geometry.\n\n2. Boresight Calibration: Fly over flat, well-defined calibration surfaces (often paved airport runways) in multiple directions. Systematic offsets in the IMU boresight angles (roll, pitch, yaw) cause swath-to-swath mismatches. Calibration corrects for these offsets.\n\n3. Swath-to-Swath Overlap Check: Adjacent flight lines should agree within the project\'s required accuracy. Large systematic differences between overlapping swaths indicate boresight error or poor trajectory data.\n\n4. Point Cloud Classification: Automated ground filtering followed by manual review of classification results. Inspect for classification errors especially on building edges, bridge decks, and dense vegetation.\n\n5. Accuracy Assessment Against Check Points: Compute RMSEZ from differences between LiDAR-derived elevations and surveyed check point elevations. Compare to required ASPRS quality level and NSSDA thresholds.\n\n6. Deliverable Generation: Produce classified point cloud (LAS/LAZ), DEM, DSM, and intensity images. Document all processing steps in metadata reports.',
        bookRefs: [
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic VII, Ch 37', topic: 'LiDAR processing workflow and deliverables' },
        ],
      },
      {
        id: 'fs-d8-lidar-s3',
        type: 'concept',
        title: 'ASPRS/USGS LiDAR Quality Levels',
        content: 'ASPRS (American Society for Photogrammetry and Remote Sensing) and the USGS 3DEP program define standardized quality levels for LiDAR data:\n\nUSGS Quality Level 3 (QL3):\n- Minimum point density: 1 point/m²\n- Maximum aggregate nominal pulse spacing (ANPS): 1.0 m\n- Vertical RMSEZ ≤ 20 cm (non-vegetated)\n\nUSGS Quality Level 2 (QL2) — current 3DEP standard:\n- Minimum point density: 2 points/m²\n- ANPS ≤ 0.71 m\n- Vertical RMSEZ ≤ 10 cm (non-vegetated)\n\nUSGS Quality Level 1 (QL1) — highest standard:\n- Minimum point density: 8 points/m²\n- ANPS ≤ 0.35 m\n- Vertical RMSEZ ≤ 9.25 cm (non-vegetated)\n\nFEMA Flood Map standard (for new DFIRM mapping): generally requires at least QL2 vertical accuracy.\n\nOn the FS exam: know the RMSEZ thresholds (QL1 ≈ 9–10 cm, QL2 = 10 cm, QL3 = 20 cm) and that higher QL numbers = lower quality (QL1 is the best, QL3 is the minimum).',
        bookRefs: [
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic VII, Ch 37', topic: 'LiDAR quality levels and accuracy specifications' },
        ],
      },
      {
        id: 'fs-d8-lidar-s4',
        type: 'concept',
        title: 'LiDAR vs. Photogrammetry for Topographic Mapping',
        content: 'Both LiDAR and photogrammetry (aerial imagery-based) are used to produce topographic data, but they have different strengths and limitations:\n\nLiDAR Advantages:\n- Can penetrate gaps in vegetation canopy to measure bare-earth elevation (using last returns and ground filtering)\n- Operates in low-light conditions (active sensor; does not depend on sunlight)\n- Higher vertical accuracy in vegetated areas (photogrammetry cannot "see through" canopy)\n- Direct elevation measurement per point (no reconstruction from stereo imagery)\n\nPhotogrammetry Advantages:\n- Produces natural-color orthophotography automatically from the same flight\n- Lower equipment cost for simple projects\n- Better at capturing planimetric detail (roads, buildings, utility poles) with high-resolution imagery\n- Suitable for surface modeling where canopy penetration is not needed\n\nLimitations of LiDAR:\n- Higher equipment cost; specialized operators required\n- Does not inherently produce color imagery (only intensity and range)\n- Reflective surfaces (water, highly polished metal) produce unreliable returns\n\nFor the FS exam: LiDAR is the preferred method when bare-earth elevation is needed under vegetation; photogrammetry is preferred when natural-color imagery and planimetric mapping are the primary deliverables.',
        bookRefs: [
          { book: 'Elementary Surveying (ES)', chapter: 'Chapter 27', topic: 'Photogrammetry vs. LiDAR for topographic mapping' },
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic VII, Ch 36-37', topic: 'Aerial photogrammetry and LiDAR comparison' },
        ],
      },
      {
        id: 'fs-d8-lidar-s5',
        type: 'knowledge_check',
        title: 'LiDAR QA/QC Check',
        knowledgeCheck: {
          question: 'A LiDAR project requires ASPRS Quality Level 2 (QL2). A check point analysis yields RMSEZ = 0.082 m. Does the dataset meet the QL2 specification?',
          options: [
            'No — QL2 requires RMSEZ ≤ 0.05 m and the result is too high',
            'Yes — QL2 requires RMSEZ ≤ 0.10 m (10 cm) and 0.082 m satisfies this threshold',
            'No — QL2 requires RMSEZ ≤ 0.075 m and 0.082 m exceeds the limit',
            'Yes — but only after applying the NSSDA 95% multiplier (1.9600 × 0.082 = 0.161 m)',
          ],
          correctIndex: 1,
          explanation: 'ASPRS/USGS QL2 requires a vertical RMSEZ of 10 cm (0.10 m) or less in non-vegetated areas. Since 0.082 m < 0.10 m, the dataset meets the QL2 specification. The RMSEZ is compared directly to the quality level threshold, not multiplied by the NSSDA 95% factor for this compliance check.',
        },
      },
      {
        id: 'fs-d8-lidar-s6',
        type: 'knowledge_check',
        title: 'LiDAR vs. Photogrammetry Check',
        knowledgeCheck: {
          question: 'A forested watershed study requires accurate bare-earth elevation data beneath a dense tree canopy. Which data collection method is most suitable?',
          options: [
            'Aerial photogrammetry using a high-resolution camera — it provides better vertical accuracy',
            'Airborne LiDAR — laser pulses can penetrate gaps in the canopy to reach the ground',
            'Thermal infrared imagery — it shows ground temperature variations through the canopy',
            'Satellite multispectral imagery — it has adequate resolution for watershed modeling',
          ],
          correctIndex: 1,
          explanation: 'Airborne LiDAR is the preferred choice for bare-earth mapping under vegetation. LiDAR laser pulses can pass through gaps in the tree canopy and generate last returns from the ground. Ground-filtering algorithms then separate ground returns from vegetation returns. Aerial photogrammetry cannot see through dense canopy — the camera records the top of the vegetation, not the terrain beneath. Thermal and multispectral imagery measure reflected energy from surfaces and do not penetrate canopy.',
        },
      },
      {
        id: 'fs-d8-lidar-s7',
        type: 'further_reading',
        title: 'LiDAR QA/QC and Standards References',
        furtherReading: [
          { book: 'USGS LiDAR Base Specification (current edition)', chapter: 'Sections 2–5', topic: 'Quality levels, ground control, check points, and accuracy requirements' },
          { book: 'ASPRS Positional Accuracy Standards for Digital Geospatial Data', chapter: 'Section 7', topic: 'LiDAR-specific accuracy classes and QA/QC procedures' },
          { book: 'Elementary Surveying, 15th Edition (Ghilani & Wolf)', chapter: 'Chapter 27', topic: 'Aerial photogrammetry and comparison with LiDAR' },
        ],
      },
    ],
  },
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
          answer: 'RMSEZ = 0.083 m; NSSDA Vertical Accuracy at 95% = 0.16 m. The DEM meets ASPRS QL2 requirements because 0.083 m < 0.10 m (QL2 threshold). With RMSEZ = 0.083 m, the dataset qualifies as QL2 (RMSEZ ≤ 10 cm). The mean error of 0.02 m (2 cm systematic bias) is included in the RMSEZ calculation, which is why RMSEZ (0.083 m) is slightly larger than the standard deviation (0.08 m).',
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
