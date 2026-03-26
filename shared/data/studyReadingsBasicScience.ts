import type { ReadingModule } from '../schema';

export const STUDY_READINGS_BASIC_SCIENCES: ReadingModule[] = [
  {
    id: 'fs-d2-basic-sciences',
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
        id: 'fs-d14-bs-s9',
        type: 'concept',
        title: 'Environmental Sciences — Wetlands and Regulatory Authority',
        content: 'Surveyors frequently encounter environmental constraints on land development, particularly those related to wetlands and floodplains. A working knowledge of the regulatory framework is essential for advising clients and scoping projects.\n\nWetland Delineation — The Three-Factor Test:\nA wetland is officially defined by the U.S. Army Corps of Engineers (USACE) and EPA as land that exhibits all THREE of the following characteristics:\n1. Hydrology — the area is inundated or saturated by surface or groundwater at a frequency and duration sufficient to support wetland vegetation. Indicators include standing water, water marks on trees, oxidized root channels, and drift lines.\n2. Hydric Soils — soils formed under conditions of saturation, flooding, or ponding long enough during the growing season to develop anaerobic conditions. Hydric soils are listed on the USDA National Hydric Soils List. Indicators include gleying, mottling, and reduced iron (dark gray colors at shallow depth).\n3. Hydrophytic Vegetation — plant communities adapted to living in saturated or inundated conditions. Plants are classified by obligate wetland (OBL), facultative wetland (FACW), facultative (FAC), facultative upland (FACU), and upland (UPL) designations.\n\nAll THREE factors must be present for an area to be jurisdictional wetland. Absence of any one factor means the area is NOT a regulated wetland.\n\nSection 404 of the Clean Water Act:\nSection 404 grants the U.S. Army Corps of Engineers authority to regulate the discharge of dredged or fill material into "waters of the United States," which includes wetlands. Any project that proposes to fill or excavate in a jurisdictional wetland must obtain a Section 404 permit from the USACE. Unpermitted fill can result in mandatory restoration orders and significant fines. The surveyor\'s role includes locating wetland boundaries on survey plats when required by the client or project scope.\n\nFEMA Flood Zones:\nFEMA designates flood zones through Flood Insurance Rate Maps (FIRMs). Key zone designations surveyors must know:\n- Zone AE: High-risk zone with 1% annual chance of flooding (the "100-year floodplain"). AE zones have a Base Flood Elevation (BFE) determined by detailed hydraulic analysis. Structures in Zone AE typically require flood insurance.\n- Zone A: High-risk zone with 1% annual chance of flooding, but NO Base Flood Elevation established (approximate study). Less detailed than AE.\n- Zone X (shaded): Moderate-risk zone with 0.2% annual chance of flooding (500-year floodplain).\n- Zone X (unshaded): Minimal flood hazard.\n- Zone VE: Coastal high-hazard area subject to wave action; most restrictive for construction.\n\nSurveyors often prepare Elevation Certificates (FEMA Form 086-0-33) to document the lowest floor elevation of structures in or near Zone AE for flood insurance rating purposes.',
        bookRefs: [
          { book: 'U.S. Army Corps of Engineers Wetland Delineation Manual (1987)', chapter: 'All', topic: 'Three-factor test for wetland delineation' },
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic VII, Ch 34', topic: 'Environmental constraints, regulatory overview' },
        ],
      },
      {
        id: 'fs-d14-bs-s10',
        type: 'concept',
        title: 'Geology Basics for Surveyors — Rock Types and Soil Horizons',
        content: 'Surveyors encounter geology and soils in the context of monument stability, earthwork, and land classification. A basic familiarity with rock types and soil horizons supports fieldwork and exam preparation.\n\nThe Rock Cycle — Three Rock Types:\nAll rocks belong to one of three categories based on their origin:\n1. Igneous Rocks — formed by cooling and solidification of magma or lava.\n   - Intrusive (plutonic): cooled slowly underground; coarse-grained. Example: granite, gabbro.\n   - Extrusive (volcanic): cooled rapidly at the surface; fine-grained or glassy. Example: basalt, obsidian.\n   Characteristics: typically very hard, good foundation material, difficult to excavate.\n\n2. Sedimentary Rocks — formed by the accumulation and cementation of sediment (particles of rock, shell, or organic material) deposited in layers (strata).\n   - Clastic: formed from rock fragments. Examples: sandstone (sand particles), shale (clay particles), conglomerate (gravel).\n   - Chemical/Biogenic: formed by precipitation or biological processes. Examples: limestone (calcium carbonate from shells/reefs), coal (organic matter).\n   Characteristics: layered structure, often contain fossils, variable strength. Limestone is susceptible to dissolution (karst), creating sinkholes.\n\n3. Metamorphic Rocks — formed when existing rocks are transformed by heat, pressure, or chemically active fluids deep in the Earth.\n   Examples: marble (from limestone), quartzite (from sandstone), slate and schist (from shale).\n   Characteristics: foliated or banded texture, generally harder than parent rock.\n\nSoil Horizons (Soil Profile):\nA soil profile is a vertical cross-section from the surface to bedrock, divided into horizons:\n- O Horizon: Organic layer at the surface (leaf litter, humus). Not present in many soils.\n- A Horizon: Topsoil — dark, organic-rich, supports plant growth. High biological activity.\n- B Horizon: Subsoil (illuviation zone) — where clay, iron, and aluminum compounds accumulate leached from the A horizon. Less organic matter, denser than A.\n- C Horizon: Parent material — partially weathered bedrock or transported sediment. Little biological activity.\n- R Horizon: Unweathered bedrock (regolith).\n\nFor surveyors: monument pits are typically dug through the A and B horizons into the C horizon or deeper. The B horizon\'s clay-rich composition can make excavation difficult and affects monument stability. Frost heave is most severe where the soil contains ice-segregation-prone soils (silts, fine sands) in the A and B horizons.',
        bookRefs: [
          { book: 'Elementary Surveying (ES)', chapter: 'Appendix', topic: 'Physical geography and soils overview' },
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic I, Ch 1', topic: 'Basic sciences background for FS exam' },
        ],
      },
      {
        id: 'fs-d14-bs-s11',
        type: 'knowledge_check',
        title: 'Environmental Sciences Knowledge Check',
        knowledgeCheck: {
          question: 'A surveyor is asked to stake property lines for a proposed subdivision. During the site inspection, the surveyor observes areas with standing water, gray mottled soils, and cattail vegetation. Under the Army Corps of Engineers\' wetland determination framework, which of the following statements is correct?',
          options: [
            'The area is a jurisdictional wetland only if it drains to a navigable waterway',
            'All three factors (hydrology, hydric soils, and hydrophytic vegetation) must be present to designate the area as a jurisdictional wetland',
            'The presence of hydric soils alone is sufficient to classify an area as a regulated wetland',
            'Wetland determination is the sole responsibility of the EPA; the Army Corps of Engineers has no role'
          ],
          correctIndex: 1,
          explanation: 'The U.S. Army Corps of Engineers (USACE) three-factor test requires that ALL three wetland indicators be present simultaneously: (1) wetland hydrology, (2) hydric soils, and (3) hydrophytic vegetation. In this scenario, standing water is a hydrology indicator, gray mottled soils indicate hydric soil conditions, and cattails are obligate wetland (OBL) plants — all three factors appear to be present. However, only a formal delineation by a qualified wetlands scientist can confirm jurisdictional status. The USACE administers Section 404 of the Clean Water Act for dredge-and-fill activities in waters of the United States, which includes wetlands.',
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
          { book: 'USACE Wetland Delineation Manual (1987)', chapter: 'All', topic: 'Wetland three-factor test and Corps jurisdiction under Section 404' },
        ],
      },
    ],
  },
  {
    id: 'fs-d3-historical-methods',
    examTrack: 'fs',
    domainNumber: 1,
    domain: 'Field Data Acquisition',
    title: 'Historical Survey Instruments and Methods',
    description: 'Understand the instruments and field methods used in American surveying from the colonial era through the mid-20th century. This reading covers Gunter\'s chain, the surveyor\'s compass, the transit, the plane table and alidade, and photographic/aerial mapping history — all topics tested on the FS exam under Field Data Acquisition.',
    estimatedMinutes: 20,
    sections: [
      {
        id: 'fs-d3-hm-s1',
        type: 'concept',
        title: 'Gunter\'s Chain — The Foundation of U.S. Land Measurement',
        content: 'Edmund Gunter (1581–1626) designed the surveyor\'s chain that became the standard measuring instrument for American land surveys from the colonial period through the early 20th century. Its dimensions were carefully chosen to produce convenient calculations for land area in acres.\n\nGunter\'s Chain Specifications:\n- Total length: 66 feet (= 4 rods = 4 poles = 4 perches)\n- 100 links per chain, each link = 0.66 ft = 7.92 inches\n- 80 chains = 1 statute mile (80 × 66 ft = 5,280 ft)\n- 10 square chains = 1 acre (since 66 × 66 × 10 = 43,560 sq ft = 1 acre)\n\nPLSS Application:\nThe Public Land Survey System (PLSS) was designed entirely around Gunter\'s chain. Township lines were run 480 chains (6 miles) per side. Sections were 80 × 80 chains (1 square mile = 640 acres). Quarter sections were 40 × 40 chains (160 acres — the quarter section homestead). Witness tree distances were recorded in links.\n\nChaining Errors:\nManual chaining with Gunter\'s chain introduced systematic and random errors:\n- Sag: chain hangs in a catenary between supports, reading too long\n- Temperature: chain length changes with temperature (steel contracts in cold)\n- Slope: distance measured along the slope rather than horizontal\n- Alignment: chain not held along the true line (reads too long)\n- Tension: non-standard tension changes effective length\n\nThese errors explain why early GLO surveys often show significant positional discrepancies compared to modern GPS measurements.',
        bookRefs: [
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic II, Ch 13', topic: 'Distance measurement, taping, and chain corrections' },
          { book: 'BLM Manual of Surveying Instructions (2009)', chapter: 'Chapter 2', topic: 'PLSS chain-based measurement system' },
        ],
      },
      {
        id: 'fs-d3-hm-s2',
        type: 'concept',
        title: 'The Surveyor\'s Compass (Needle Compass)',
        content: 'The magnetic compass was the primary direction-finding instrument for American land surveys from the colonial era through the mid-1800s, and it is still encountered when retracing historical surveys.\n\nInstrument Description:\nThe surveyor\'s compass (also called the circumferentor) consisted of a magnetic compass needle mounted in a circular housing with a sighting vane at each end. The graduated circle was typically divided into 360° or into four quadrants (N–E–S–W) with 0°–90° in each quadrant. Bearings were read as quadrant bearings (e.g., N 42° E, S 15° W).\n\nAccuracy Limitations:\n- Accuracy: ±15 minutes to ±2 degrees depending on instrument quality and local conditions\n- Magnetic declination: the compass reads magnetic north, not true north; declination varies by location and changes over time (secular variation)\n- Local attraction: nearby iron ore, steel fences, pipes, or the surveyor\'s own equipment can deflect the needle by several degrees\n- Diurnal variation: small daily oscillations of the needle (typically <5 minutes)\n\nRetracing Compass Surveys:\nWhen retracing a historical compass survey:\n1. Determine the magnetic declination at the time of the original survey (from historical isogonic charts)\n2. Convert the recorded compass bearing to true bearing: True = Magnetic − East Declination (or + West Declination)\n3. Field: set the true bearing by applying the current declination to today\'s compass\n4. Check for local attraction by comparing forward and back bearings between stations\n\nThe large uncertainty in original compass bearings (potentially ±2°) means that monument evidence and calls for the line (trees, fences, old blazes) must carry more weight than the bearing alone.',
        bookRefs: [
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic II, Ch 16', topic: 'Compass surveys, magnetic declination, and local attraction' },
          { book: 'BLM Manual of Surveying Instructions (2009)', chapter: 'Chapters 2–3', topic: 'Historical compass survey retracement procedures' },
        ],
      },
      {
        id: 'fs-d3-hm-s3',
        type: 'concept',
        title: 'The Transit and Its Evolution to the Total Station',
        content: 'The surveyor\'s transit (invented in the mid-1800s in the United States) was a significant improvement over the compass, enabling precise angle measurement and becoming the workhorse of American surveying for over a century.\n\nTransit Features:\n- Rotating telescope mounted on a horizontal axis, allowing both horizontal and vertical angle measurement\n- Repeating circle: the horizontal angle could be doubled, tripled, or accumulated through multiple pointings to reduce reading errors (the repeating method)\n- Direct vernier reading: angles read directly from the graduated circle using a vernier, typically to 30 seconds or 1 minute of arc\n- Compass needle still present for rough orientation but not the primary direction reference\n\nTypical Transit Accuracy:\n- Horizontal angles: ±20 to ±60 seconds per pointing\n- Vertical angles: similar precision\n- Distance: measured by tape (1:10,000 to 1:30,000) or by stadia (1:300 to 1:500)\n\nTransit → Theodolite → Total Station:\n- Optical theodolite (1920s–1980s): glass circles read by optical micrometer; improved to ±1 second per direction\n- Electronic Digital Theodolite (1970s): encoders on circles; digital angle readout\n- Total Station (1980s–present): combines electronic angle measurement with EDM (electronic distance measurement); computes and stores coordinates automatically\n- Robotic Total Station: motorized; tracks prism automatically; enables one-person surveys\n\nThe transition from transit to total station dramatically improved surveying productivity and accuracy, but the fundamental angle-measurement principles remain the same.',
        bookRefs: [
          { book: 'Elementary Surveying (ES)', chapter: 'Chapter 8', topic: 'Angle measurement with total stations and theodolites' },
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic II, Ch 14–15', topic: 'Traverse, angle measurement, instrument types' },
        ],
      },
      {
        id: 'fs-d3-hm-s4',
        type: 'concept',
        title: 'Plane Table Surveying and the Alidade',
        content: 'Plane table surveying was a widely used topographic mapping method from the 1700s through the 1950s that produced maps graphically in the field without separate computation.\n\nPlane Table Components:\n- Plane table: a flat drawing board (typically 15×20 inches to 24×30 inches) mounted on a tripod\n- Oriented over a known control point\n- Drawing paper fastened to the board\n- The map was drawn directly on the paper in the field\n\nThe Alidade:\n- A straightedge with telescopic sights (or simple open-frame peep sights on earlier versions) mounted along its length\n- The fiducial (ruling) edge of the alidade passes through the plotted instrument position\n- Surveyor sights through the telescope toward a distant feature and draws a direction ray along the alidade edge on the paper\n- Distances were measured by stadia (using the telescope\'s stadia wires and a leveling rod) and plotted along the ray\n\nPlane Table Methods:\n- Radiation: from a single setup, rays are drawn to all surrounding features; distances plotted along rays\n- Intersection: a feature too distant or inaccessible to measure is located by drawing rays from two or more known stations; the intersection of rays defines the feature\'s position\n- Resection (three-point problem): the instrument is set up at an unknown point; rays to three known points plotted graphically resolve the instrument position (Bessel\'s/Lehmann\'s method)\n\nLimitations:\n- Accuracy limited by drawing precision (typically 1:1,000 to 1:3,000)\n- Weather-dependent (rain, wind affect drawing board)\n- Replaced by electronic data collection systems\n\nHistorical significance: The USGS used plane table surveying for its 7.5-minute topographic quadrangle program from the 1880s through the 1950s.',
        bookRefs: [
          { book: 'Elementary Surveying (ES)', chapter: 'Chapter 16', topic: 'Plane table surveying methods' },
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic II, Ch 16', topic: 'Plane table and alidade surveying' },
        ],
      },
      {
        id: 'fs-d3-hm-s5',
        type: 'concept',
        title: 'Aerial Photography and the History of Photogrammetric Mapping',
        content: 'Photogrammetric mapping — deriving measurements from photographs — has a history stretching from balloon photography in the 1850s to modern digital aerial surveys and drone mapping.\n\nTimeline of Aerial Mapping History:\n- 1858: Nadar (Gaspard-Félix Tournachon) made the first known aerial photograph from a balloon over Paris\n- 1909–1918 (WWI era): Military reconnaissance using aircraft-mounted cameras accelerated aerial photography development\n- 1920s–1930s: Aerial photography adopted for civilian topographic mapping; large-format cameras mounted in aircraft\n- 1950s–1970s: Analogue stereoplotters enabled three-dimensional map compilation from stereo photo pairs; USGS used this method extensively\n- 1980s–1990s: Analytical plotters and digital photogrammetry workstations replaced analogue instruments\n- 2000s–present: Digital aerial cameras and photogrammetric software produce orthophotos, DEMs, and point clouds automatically\n- 2010s–present: Drone (UAS/UAV) photogrammetry makes high-resolution aerial mapping accessible for small projects\n\nKey Concepts:\n- Stereoscopic overlap: adjacent photos taken with 60% forward overlap (endlap) and 20–30% sidelap between flight lines, enabling three-dimensional measurement from stereo pairs\n- Principal point: the geometric center of the photograph (on the optical axis of the camera)\n- Fiducial marks: reference marks on the film frame used to define the image coordinate system and the principal point\n- Camera calibration: determines the principal point location, focal length, and lens distortion; required for precise photogrammetric work\n- Orthophoto: a geometrically corrected photograph where all features are shown in their true horizontal position (distortions from terrain and camera tilt removed)',
        bookRefs: [
          { book: 'Elementary Surveying (ES)', chapter: 'Chapter 27', topic: 'Aerial photogrammetry — principles and methods' },
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic VI, Ch 32–33', topic: 'Photogrammetric mapping and remote sensing' },
        ],
      },
      {
        id: 'fs-d3-hm-s6',
        type: 'knowledge_check',
        title: 'Historical Methods Knowledge Check',
        knowledgeCheck: {
          question: 'A surveyor finds a GLO field note from 1855 recording a line with a magnetic compass bearing of N 48°00\' E. The 1855 declination at this location was 2°00\' E. What was the true (astronomic) bearing of this line?',
          options: [
            'N 50°00\' E',
            'N 48°00\' E',
            'N 46°00\' E',
            'N 44°00\' E'
          ],
          correctIndex: 2,
          explanation: 'East declination means the compass needle points east of true north — so the compass reads a bearing that is LARGER than the true bearing by the declination amount. True Bearing = Magnetic Bearing − East Declination = N 48°00\' E − 2°00\' = N 46°00\' E. Option A (N 50°) incorrectly adds the declination. Option B is the original compass bearing with no correction. The "East is least" memory aid helps: east declination means the true bearing is LESS (smaller angle) than the magnetic compass reading.',
        },
      },
      {
        id: 'fs-d3-hm-s7',
        type: 'further_reading',
        title: 'Historical Instruments and Methods References',
        furtherReading: [
          { book: 'Elementary Surveying (ES)', chapter: 'Chapters 8, 16, 27', topic: 'Instrument history, plane table, photogrammetry' },
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic II, Ch 13–16', topic: 'Taping, angles, compass surveys, historical instruments' },
          { book: 'BLM Manual of Surveying Instructions (2009)', chapter: 'Chapters 2–3', topic: 'PLSS survey history, chain measurements, and retracement' },
        ],
      },
    ],
  },
];
