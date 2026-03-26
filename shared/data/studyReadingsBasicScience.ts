import type { ReadingModule } from '../schema';

export const STUDY_READINGS_BASIC_SCIENCE: ReadingModule[] = [
  {
    id: 'fs-d14-basic-science',
    examTrack: 'fs',
    domainNumber: 0,
    domain: 'Math & Basic Science',
    title: 'Basic Sciences, Dendrology & Historical Survey Methods',
    description: 'Review basic science concepts tested on the FS exam, including dendrology (tree species identification for PLSS retracement), soil characteristics for earthwork, atmospheric effects on measurements, and historical survey instruments and methods such as compass-and-chain surveys and solar observations.',
    estimatedMinutes: 18,
    sections: [
      {
        id: 'fs-d14-bs-s1',
        type: 'concept',
        title: 'Dendrology for Surveyors — Tree Identification',
        content: 'Dendrology is the science of identifying trees and woody plants. For surveyors, dendrology knowledge is essential for PLSS retracement surveys, where original GLO field notes often describe witness trees (also called bearing trees) used to reference corner locations.\n\nWitness trees were recorded with:\n- Species name (e.g., "White Oak," "Sugar Maple," "Black Walnut")\n- Diameter at breast height (DBH), recorded in links or inches\n- Bearing and distance from the survey corner\n- Sometimes the number of chops (notches) cut into the tree\n\nDendrology knowledge helps the retracing surveyor:\n1. Identify the correct species at the recorded location (a common species in 1840 may be rare today due to disease or logging)\n2. Evaluate whether a surviving tree matches the original GLO description\n3. Recognize typical bark, leaf, and growth characteristics to confirm species identity\n\nCommon witness tree species in PLSS areas:\n- White Oak (Quercus alba): light gray, plated bark; lobed leaves with rounded tips\n- Black Oak (Quercus velutina): dark, deeply furrowed bark; leaves with pointed lobes\n- Bur Oak (Quercus macrocarpa): very large acorns with fringed caps; typically fire-resistant bark\n- Sugar Maple (Acer saccharum): gray-brown, flaky bark; 5-lobed leaf\n- Black Walnut (Juglans nigra): dark, deeply ridged bark; compound leaves; distinctive round, green-husked fruit\n- Basswood / American Linden (Tilia americana): smooth gray bark; heart-shaped leaves\n\nWhen the original witness tree is found, it constitutes a class of obliterated corner evidence — the corner can be restored using the recorded bearing and distance from the tree.',
        bookRefs: [
          { book: 'BLM Manual of Surveying Instructions (2009)', chapter: 'Chapter 3', topic: 'Witness trees, bearing trees, and PLSS corner restoration' },
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic V, Ch 29', topic: 'PLSS retracement and original evidence' },
        ],
      },
      {
        id: 'fs-d14-bs-s2',
        type: 'concept',
        title: 'Soil Classification and Earthwork',
        content: 'Basic soil classification knowledge is tested on the FS exam in the context of earthwork and construction surveying.\n\nUSCS (Unified Soil Classification System) categories surveyors need to recognize:\n- GW: Well-graded gravel — good bearing capacity, drains well\n- SW: Well-graded sand — good for fill when compacted\n- ML: Silt (inorganic) — frost-susceptible, poor drainage, moderate compressibility\n- CL: Clay of low plasticity — compressible, poor drainage, often used as impervious liner\n- CH: Clay of high plasticity — highly compressible, difficult to compact\n- OL/OH: Organic soils — very compressible, should be removed in construction\n- Pt: Peat — highly organic, unsuitable for foundation support\n\nBulking and shrinkage factors:\n- Bank cubic yard (BCY): Volume of soil in its undisturbed state in the ground\n- Loose cubic yard (LCY): Volume of soil after excavation and loading (larger than bank, due to voids)\n- Compacted cubic yard (CCY): Volume after compaction (smaller than bank, due to reduced voids)\n\nLoad factor (L): LCY = BCY × L (L > 1, typically 1.1 to 1.4 depending on soil type)\nShrinkage factor (S): CCY = BCY × S (S < 1, typically 0.7 to 0.9)\n\nKnowing whether a contractor bids in bank, loose, or compacted measure is critical for earthwork quantity calculations and pay estimates.',
        bookRefs: [
          { book: 'Elementary Surveying (ES)', chapter: 'Chapter 26', topic: 'Volumes and earthwork calculations' },
        ],
      },
      {
        id: 'fs-d14-bs-s3',
        type: 'concept',
        title: 'Atmospheric Effects on Survey Measurements',
        content: 'Atmospheric conditions — primarily temperature, pressure, and humidity — affect both electronic distance measurement (EDM) and optical observations.\n\nAtmospheric Refraction:\nLight and electromagnetic waves travel in straight lines in a vacuum but bend (refract) when passing through the atmosphere. The atmosphere is denser near the ground, causing light to bend toward Earth (downward).\n- Effect on leveling: Curvature of the Earth lifts the horizontal plane above the level surface, while refraction bends the line of sight downward, partially compensating. The combined correction is:\n  Combined correction (C + R) = 0.0675 K² (meters, K in km) or approximately 0.574 M² (ft, M in miles)\n  This is subtracted from a long rod reading to get true elevation difference.\n- Effect on angles: Vertical angles are slightly increased (targets appear higher than they actually are) due to downward bending of light.\n\nEDM Atmospheric Correction:\nElectronic distance meters use the refractive index of air to convert travel time to distance. The refractive index depends on temperature, atmospheric pressure, and humidity. Most modern instruments and software allow input of temperature and pressure to automatically compute and apply the atmospheric correction (also called "first velocity correction" or "meteorological correction").\n\nThe ppm (parts per million) correction for EDM:\n- A 1°C temperature increase causes approximately −1 ppm change in measured distance\n- A 1 mm Hg pressure increase causes approximately +0.37 ppm change\n- At standard conditions (12°C, 760 mm Hg), no correction is needed for many instruments\n\nTemperature Effect on Steel Tapes:\nThe thermal expansion coefficient of steel is approximately 1.16 × 10⁻⁵ per °C (or 6.45 × 10⁻⁶ per °F).\nTape Correction = C_t × L × ΔT\nwhere C_t is the thermal expansion coefficient, L is the tape length, and ΔT is the temperature difference from the standard temperature.',
        bookRefs: [
          { book: 'Elementary Surveying (ES)', chapter: 'Chapter 6', topic: 'EDM atmospheric corrections and tape corrections' },
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic II, Ch 13-14', topic: 'Taping corrections and EDM error sources' },
        ],
      },
      {
        id: 'fs-d14-bs-s4',
        type: 'formula',
        title: 'Combined Curvature and Refraction Correction',
        formula: {
          expression: 'C+R = 0.0675 × K² (meters) ≈ 0.574 × M² (feet, M in miles)',
          variables: [
            { symbol: 'C+R', description: 'Combined effect of Earth curvature (C) and atmospheric refraction (R) on a level sight, in the same units as K² or M²' },
            { symbol: 'K', description: 'Distance in kilometers from instrument to rod (for metric formula)' },
            { symbol: 'M', description: 'Distance in miles from instrument to rod (for imperial formula)' },
          ],
          whenToUse: 'Apply this correction when precise leveling observations span long distances (typically greater than 0.5 km or 0.3 miles). The correction is subtracted from the observed rod reading. For most short-distance differential leveling, the correction is negligible and the balanced setup (equal backsight and foresight lengths) eliminates the error automatically.',
        },
      },
      {
        id: 'fs-d14-bs-s5',
        type: 'concept',
        title: 'Historical Survey Instruments and Methods',
        content: 'Early American surveying (especially GLO surveys of the 1700s–1800s) relied on instruments with limited accuracy by modern standards. Understanding these limitations is essential when retracing historical surveys.\n\nCompass and Chain Survey (Magnetic Compass Era):\n- Used a magnetic compass to determine bearing and a Gunter\'s chain (66 ft) to measure distance\n- Compass bearings are subject to local magnetic attraction, declination changes over time, and instrument error (±15 minutes to ±2 degrees typical accuracy)\n- Chaining errors include slope, sag, temperature, and poor alignment\n- GLO surveys from the early 1800s often have positional errors of 20–100 ft or more\n\nGunter\'s Chain:\n- Length: 66 ft (4 rods = 4 poles)\n- 100 links per chain; each link = 0.66 ft = 7.92 in\n- 80 chains = 1 mile\n- 10 square chains = 1 acre\n- Area in acres = (area in square chains) / 10\n\nSolar Observation (Sun Shot):\n- Established true (astronomic) north by observing the sun\n- Required calculation of the sun\'s declination, hour angle, and the observer\'s latitude\n- Much more accurate than magnetic compass for establishing meridians\n- GLO instructions required astronomic meridian observations at regular intervals\n\nTransit and Tape Era (late 1800s to mid-1900s):\n- Repeating theodolites allowed angle measurement by repeated direct and reverse pointings\n- Steel tapes replaced Gunter\'s chains for higher accuracy\n- Accuracy: ±30 seconds for angles; 1:10,000 to 1:30,000 for distances\n- Trigonometric leveling using vertical angles extended control over rough terrain',
        bookRefs: [
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic II, Ch 16', topic: 'Historical compass surveys and the magnetic compass' },
          { book: 'BLM Manual of Surveying Instructions (2009)', chapter: 'Chapter 2', topic: 'Historical methods and original GLO survey standards' },
        ],
      },
      {
        id: 'fs-d14-bs-s6',
        type: 'knowledge_check',
        title: 'Dendrology and Historical Methods Check',
        knowledgeCheck: {
          question: 'A GLO surveyor\'s original field notes describe a witness tree as "W. Oak, 18 in dia, bears N 45 E, 35 lks." A retracing surveyor finds a surviving oak at that bearing and distance. What class of evidence does this surviving witness tree represent?',
          options: [
            'Lost corner evidence — the corner must be restored by proportionate measurement',
            'Obliterated corner evidence — the corner can be restored using the recorded bearing and distance',
            'Original corner evidence — the corner position is unchanged and needs no restoration',
            'Conflicting evidence — witness trees cannot be used for corner restoration'
          ],
          correctIndex: 1,
          explanation: 'A witness tree (bearing tree) recorded in the original GLO notes that is found in its original location constitutes obliterated corner evidence. The corner can be restored by applying the inverse of the recorded bearing and distance from the tree — that is, measuring from the tree in the reverse direction the recorded distance to recover the original corner location. This is a fundamental procedure in PLSS retracement surveys.',
        },
      },
      {
        id: 'fs-d14-bs-s7',
        type: 'knowledge_check',
        title: 'Atmospheric Correction Check',
        knowledgeCheck: {
          question: 'An EDM distance measurement is taken at conditions significantly different from standard (higher temperature, lower pressure). What is the effect on the measured distance if no atmospheric correction is applied?',
          options: [
            'The measured distance will be shorter than the true distance (measurement reads too long)',
            'The measured distance will equal the true distance; atmospheric corrections are optional',
            'The measured distance will be longer than the true distance (measurement reads too short)',
            'Only temperature matters; pressure has no effect on EDM measurements'
          ],
          correctIndex: 0,
          explanation: 'Higher temperature decreases air density, reducing the refractive index. Lower pressure also decreases air density. Both effects cause the EDM to compute a shorter travel time for a given physical distance, resulting in the instrument displaying a distance shorter than the true distance. The correction adds the appropriate amount to restore the true distance. Without correction, the measurement is systematically too short.',
        },
      },
      {
        id: 'fs-d14-bs-s8',
        type: 'further_reading',
        title: 'Basic Sciences and Historical Methods References',
        furtherReading: [
          { book: 'Elementary Surveying, 15th Edition (Ghilani & Wolf)', chapter: 'Chapters 1-6', topic: 'Error theory, atmospheric corrections, distance measurement' },
          { book: 'BLM Manual of Surveying Instructions (2009)', chapter: 'Chapter 3', topic: 'Witness trees, original evidence, and historical survey interpretation' },
          { book: 'Surveyor Reference Manual', chapter: 'Topic II, Ch 13-16', topic: 'Historical instruments, taping, leveling corrections' },
        ],
      },
    ],
  },
];
