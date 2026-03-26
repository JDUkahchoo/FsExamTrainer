import type { ReadingModule } from '../schema';

export const STUDY_READINGS_LIDAR: ReadingModule[] = [
  {
    id: 'fs-d13-lidar',
    examTrack: 'fs',
    domainNumber: 2,
    domain: 'Mapping, GIS, and CAD',
    title: 'LiDAR, Remote Sensing & Graphical Communication',
    description: 'Understand airborne and terrestrial LiDAR fundamentals, point cloud data characteristics, digital elevation models, passive vs. active remote sensing, and graphical communication standards for survey maps and plats. These topics are tested in the Mapping, GIS, and CAD domain of the FS exam.',
    estimatedMinutes: 20,
    sections: [
      {
        id: 'fs-d13-lidar-s1',
        type: 'concept',
        title: 'LiDAR — How It Works',
        content: 'LiDAR (Light Detection And Ranging) is an active remote sensing technology that measures distances by emitting laser pulses and recording the time it takes for the pulse to return after reflecting off an object. Distance = (speed of light × time-of-flight) / 2.\n\nAirborne LiDAR systems are mounted on aircraft or UAVs and scan the ground with a rotating or oscillating mirror, collecting millions of range measurements per second. Combined with a high-accuracy GNSS receiver and an Inertial Measurement Unit (IMU), the 3D position and orientation of the sensor are known at each pulse, enabling precise calculation of the X, Y, Z position of every return.\n\nKey LiDAR system parameters:\n- Pulse repetition rate (PRR): Number of pulses emitted per second (typically 50,000 to 1,000,000 Hz in modern systems)\n- Scan angle: The total angular sweep of the laser mirror (typically ±15° to ±30° from nadir)\n- Flying altitude: Higher altitudes cover more ground per pass but reduce point density\n- Multiple returns: Modern sensors record multiple returns per pulse (first return = top of vegetation; last return = ground or lower canopy), enabling ground filtering',
        bookRefs: [
          { book: 'Elementary Surveying (ES)', chapter: 'Chapter 28', topic: 'LiDAR and remote sensing fundamentals' },
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic VII, Ch 37', topic: 'Airborne laser scanning and LiDAR data' },
        ],
      },
      {
        id: 'fs-d13-lidar-s2',
        type: 'formula',
        title: 'LiDAR Point Density',
        formula: {
          expression: 'Point Density = (PRR × Scan Rate) / (Flight Speed × Swath Width)',
          variables: [
            { symbol: 'Point Density', description: 'Number of points per unit area (pts/m² or pts/ft²)' },
            { symbol: 'PRR', description: 'Pulse repetition rate — pulses emitted per second (Hz)' },
            { symbol: 'Scan Rate', description: 'Mirror scan cycles per second; determines point spacing across the swath' },
            { symbol: 'Flight Speed', description: 'Aircraft ground speed (m/s or ft/s)' },
            { symbol: 'Swath Width', description: 'The width of ground covered per flight line, determined by altitude and scan angle: Swath Width = 2 × altitude × tan(half scan angle)' },
          ],
          whenToUse: 'Use to estimate or verify point density for a planned or completed LiDAR collection. Project specifications often require a minimum point density (e.g., 2 pts/m² for USGS QL2, 8 pts/m² for QL1). Higher density improves the ability to detect small features and produce accurate bare-earth models.',
        },
      },
      {
        id: 'fs-d13-lidar-s3',
        type: 'concept',
        title: 'Point Cloud Classification and DEM vs. DSM',
        content: 'After collection, LiDAR points are processed and classified into categories. Standard ASPRS classification codes include:\n- Class 0: Unclassified\n- Class 1: Unassigned\n- Class 2: Ground (bare earth)\n- Class 3: Low vegetation\n- Class 4: Medium vegetation\n- Class 5: High vegetation\n- Class 6: Buildings\n- Class 7: Noise\n- Class 9: Water\n- Class 17: Bridge deck\n\nGround filtering algorithms (such as Progressive TIN Densification) distinguish ground returns from vegetation and structures. The resulting ground-only point cloud is the foundation for elevation products.\n\nDigital Elevation Model (DEM): A raster representation of the bare-earth surface, using only classified ground returns. Roads, buildings, and vegetation are removed. Used for hydrological modeling, slope analysis, and earthwork calculations.\n\nDigital Surface Model (DSM): A raster representing the top surface of all features, including buildings, trees, and structures. First returns are used. The DSM shows the "surface" as seen from above.\n\nDifference (nDSM): DSM − DEM = normalized Digital Surface Model, showing the height of objects above bare ground. Used to measure tree heights, building heights, and other above-ground features.',
        bookRefs: [
          { book: 'Elementary Surveying (ES)', chapter: 'Chapter 28', topic: 'LiDAR data products and classification' },
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic VII, Ch 37', topic: 'Elevation model types from LiDAR' },
        ],
      },
      {
        id: 'fs-d13-lidar-s4',
        type: 'concept',
        title: 'Passive vs. Active Remote Sensing',
        content: 'Remote sensing systems are classified as active or passive based on whether they generate their own energy source:\n\nActive Remote Sensing:\nThe sensor emits its own energy (electromagnetic radiation) and measures the energy reflected or backscattered from the target.\n- LiDAR: emits laser pulses; measures range to objects\n- RADAR (Radio Detection and Ranging): emits microwave pulses; used for terrain mapping (InSAR), ship detection, and weather\n- SONAR: emits acoustic pulses; used for underwater depth mapping (hydrographic survey)\n\nAdvantages of active systems: Can operate day or night; can penetrate clouds or vegetation (radar); provide direct range measurements.\n\nPassive Remote Sensing:\nThe sensor detects energy that was emitted or reflected from an external source — primarily the sun.\n- Multispectral cameras: detect visible and near-infrared light reflected by features\n- Thermal infrared: detects heat emitted by surfaces\n- Aerial photography: visible-light images for mapping and photogrammetry\n\nAdvantages of passive systems: Simpler equipment; produce familiar, visually interpretable imagery.\n\nFor the FS exam, know that LiDAR and RADAR are active; aerial photography and multispectral imaging are passive. Also know that LiDAR is routinely used to produce the dense point clouds needed for modern topographic mapping, replacing traditional photogrammetric point collection in many applications.',
        bookRefs: [
          { book: 'Elementary Surveying (ES)', chapter: 'Chapter 28', topic: 'Remote sensing — active vs. passive systems' },
        ],
      },
      {
        id: 'fs-d13-lidar-s5',
        type: 'knowledge_check',
        title: 'LiDAR Concepts Check',
        knowledgeCheck: {
          question: 'A LiDAR-derived Digital Elevation Model (DEM) uses which classification of LiDAR returns?',
          options: [
            'All returns (first through last) averaged together',
            'First returns only, representing the top of the canopy',
            'Ground-classified returns only (Class 2), representing the bare-earth surface',
            'Last returns only, regardless of whether they hit the ground'
          ],
          correctIndex: 2,
          explanation: 'A Digital Elevation Model (DEM) represents the bare-earth surface, using only ground-classified returns (ASPRS Class 2). Vegetation, buildings, and other above-ground features are removed through the ground-filtering process. A Digital Surface Model (DSM) uses first returns and includes all surfaces. The DEM is essential for hydrological analysis, earthwork, and terrain modeling.',
        },
      },
      {
        id: 'fs-d13-lidar-s6',
        type: 'concept',
        title: 'Graphical Communication: Survey Map Elements',
        content: 'Survey maps, plats, and drawings communicate spatial information visually. Effective graphical communication requires consistent, standardized map elements that allow any reader to correctly interpret the drawing.\n\nRequired map elements for survey plats and technical drawings:\n\n1. Title Block: Identifies the drawing. Typically includes: project name, client name, surveyor name and license number, date prepared, scale, sheet number, and file/revision tracking.\n\n2. North Arrow: Indicates the orientation of the map. May show True North, Grid North (State Plane), or Magnetic North. The type of north should be labeled. A declination diagram may show the relationship between true and magnetic north.\n\n3. Scale: Expressed as a graphic scale bar and/or a representative fraction (RF) or verbal statement. Graphic scales remain correct if the drawing is enlarged or reduced; RF and verbal scales become incorrect.\n\n4. Legend (Key): Explains all symbols, line types, hatch patterns, and color codes used on the drawing. Without a legend, map symbols are ambiguous.\n\n5. Datum Reference: States the horizontal datum (e.g., NAD83) and vertical datum (e.g., NAVD88) used for coordinate and elevation values.\n\n6. Certification/Notes: Professional surveyor\'s certification statement, general notes, and any special conditions or disclaimers.\n\n7. Coordinate Grid or Tick Marks: Allows the reader to determine coordinates of any point on the drawing.\n\nCADD (Computer-Aided Drafting and Design) standards establish layer naming conventions, line weights, and text sizes to ensure drawings are readable when printed at the specified scale.',
        bookRefs: [
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic VII, Ch 34', topic: 'Map drafting and graphical communication standards' },
          { book: 'Elementary Surveying (ES)', chapter: 'Chapter 16', topic: 'Map elements and CAD standards' },
        ],
      },
      {
        id: 'fs-d13-lidar-s7',
        type: 'knowledge_check',
        title: 'Graphical Communication Check',
        knowledgeCheck: {
          question: 'A survey drawing is printed at 1:1,000 scale and then photocopied at 50% reduction. Which of the following map elements remains accurate after the reduction?',
          options: [
            'The RF (representative fraction) of 1:1,000',
            'The verbal statement "1 inch = 83.3 feet"',
            'The graphic scale bar',
            'The grid coordinates shown on tick marks'
          ],
          correctIndex: 2,
          explanation: 'A graphic scale bar (also called a bar scale) is drawn on the map itself and is reduced proportionally when the drawing is reduced. The bar and the map both shrink at the same ratio, so the bar remains accurate at any print size. The RF and verbal statements, however, specify a fixed ratio (1:1,000) that becomes incorrect when the physical dimensions of the drawing change.',
        },
      },
      {
        id: 'fs-d13-lidar-s8',
        type: 'further_reading',
        title: 'LiDAR and Graphical Communication References',
        furtherReading: [
          { book: 'Elementary Surveying, 15th Edition (Ghilani & Wolf)', chapter: 'Chapters 27-28', topic: 'Photogrammetry, remote sensing, and LiDAR' },
          { book: 'Surveyor Reference Manual', chapter: 'Topic VII, Ch 34-37', topic: 'Mapping, GIS, aerial mapping, and laser scanning' },
          { book: 'USGS LiDAR Base Specification (current edition)', chapter: 'Section 3', topic: 'Point density, classification, and DEM standards' },
        ],
      },
    ],
  },
];
