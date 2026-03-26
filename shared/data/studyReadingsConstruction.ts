import type { ReadingModule } from '../schema';

export const STUDY_READINGS_CONSTRUCTION: ReadingModule[] = [
  {
    id: 'fs-d9-construction',
    examTrack: 'fs',
    domainNumber: 4,
    domain: 'Surveying Principles',
    title: 'Construction Surveying: Grade & Staking',
    description: 'Master the calculations and field procedures for construction layout, including grade rod computations, cut-and-fill determinations, offset staking, slope staking, and as-built surveys. These topics are tested directly on the FS exam.',
    estimatedMinutes: 22,
    sections: [
      {
        id: 'fs-d9-construction-s1',
        type: 'concept',
        title: 'The Construction Surveying Framework',
        content: 'Construction surveying translates design plans from paper into physical stakes on the ground. The surveyor\'s role is to set control, establish grades, and guide earthwork and structure placement so that the finished product matches the engineer\'s design.\n\nThe three fundamental documents used during construction layout are:\n\n1. The Design Plans (roadway, grading, utility, or structural drawings) which specify horizontal alignment, vertical grades, finish elevations, and offsets.\n2. The Survey Control Network — a set of bench marks and horizontal control points established with higher accuracy than the construction staking.\n3. The Field Notes — systematic records of all set stakes, calculated values, and observations.\n\nConstruction surveyors work continuously through a project, from initial grading to final as-built verification. On the FS exam, the most heavily tested construction topics are grade rod calculation and cut-versus-fill determination.',
        bookRefs: [
          { book: 'Elementary Surveying (ES)', chapter: 'Chapter 23', topic: 'Construction surveying fundamentals' },
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic III, Ch 21', topic: 'Route surveying and construction layout' },
        ],
      },
      {
        id: 'fs-d9-construction-s2',
        type: 'formula',
        title: 'Height of Instrument, Grade Elevation, and Grade Rod',
        formula: {
          expression: 'HI = Elev_BM + BS; Grade Rod = HI − Grade Elevation; Cut = Grade Rod − Rod Reading; Fill = Rod Reading − Grade Rod',
          variables: [
            { symbol: 'HI', description: 'Height of Instrument — the elevation of the level line of sight, computed as BM elevation + backsight rod reading' },
            { symbol: 'BS', description: 'Backsight rod reading on the benchmark (or turning point) with known elevation' },
            { symbol: 'Grade Elevation', description: 'The design finish elevation at the stake location, read from the construction plans' },
            { symbol: 'Grade Rod', description: 'The rod reading that would be observed if the ground surface were exactly at grade elevation. Equals HI minus Grade Elevation.' },
            { symbol: 'Rod Reading', description: 'The actual rod reading observed on the ground (existing surface) at the stake location' },
            { symbol: 'Cut', description: 'Positive value means earth must be removed (excavated) to reach grade. Cut = Grade Rod − Rod Reading when Rod Reading < Grade Rod' },
            { symbol: 'Fill', description: 'Positive value means earth must be added to reach grade. Fill = Rod Reading − Grade Rod when Rod Reading > Grade Rod' },
          ],
          whenToUse: 'Use these formulas whenever you are setting grade stakes for earthwork. The grade rod tells you what the rod would read at design grade. Compare it to the actual ground rod reading to determine if you are above grade (cut needed) or below grade (fill needed).',
        },
        bookRefs: [
          { book: 'Elementary Surveying (ES)', chapter: 'Chapter 23', topic: 'Grade stakes and earthwork layout' },
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic III, Ch 21', topic: 'Grade rod and cut/fill calculations' },
        ],
      },
      {
        id: 'fs-d9-construction-s3',
        type: 'worked_example',
        title: 'Grade Rod and Cut/Fill Calculation',
        workedExample: {
          problem: 'A leveling instrument is set up and a backsight of 8.42 ft is taken on a benchmark with an elevation of 512.60 ft. The design grade elevation at stake A+50 is 514.75 ft, and the rod reading on the existing ground at that station is 5.20 ft. Is this a cut or fill situation, and by how much?',
          steps: [
            { step: 1, description: 'Compute the Height of Instrument (HI).', calculation: 'HI = BM elevation + BS = 512.60 + 8.42 = 521.02 ft' },
            { step: 2, description: 'Compute the Grade Rod — the rod reading that would exist if the ground were exactly at design grade.', calculation: 'Grade Rod = HI − Grade Elevation = 521.02 − 514.75 = 6.27 ft' },
            { step: 3, description: 'Compare Grade Rod to the actual Rod Reading. If Rod Reading (5.20 ft) is less than Grade Rod (6.27 ft), the ground is above grade → CUT needed.', calculation: 'Cut = Grade Rod − Rod Reading = 6.27 − 5.20 = 1.07 ft' },
          ],
          answer: 'The ground at station A+50 is 1.07 ft above the design grade. A CUT of 1.07 ft is required. The stake would be marked "C 1.07".',
        },
      },
      {
        id: 'fs-d9-construction-s4',
        type: 'knowledge_check',
        title: 'Cut or Fill Check',
        knowledgeCheck: {
          question: 'An instrument setup has HI = 445.80 ft. The design grade elevation is 440.50 ft. The rod reading on the existing ground is 7.10 ft. What is the cut or fill?',
          options: [
            'Cut of 1.80 ft',
            'Fill of 1.80 ft',
            'Cut of 3.60 ft',
            'Fill of 3.60 ft',
          ],
          correctIndex: 1,
          explanation: 'Grade Rod = HI − Grade Elevation = 445.80 − 440.50 = 5.30 ft. Since the actual rod reading (7.10 ft) is greater than the Grade Rod (5.30 ft), the ground is BELOW design grade and FILL is needed. Fill = Rod Reading − Grade Rod = 7.10 − 5.30 = 1.80 ft.',
        },
      },
      {
        id: 'fs-d9-construction-s5',
        type: 'concept',
        title: 'Offset Stakes and Hub Stakes',
        content: 'Stakes set directly on the construction centerline or structure footprint would be destroyed during earthwork. For this reason, construction surveyors set offset stakes at a safe distance from the work area. The stake is marked with the offset distance, the station, and the cut or fill amount.\n\nA typical offset stake for a road project might read:\n\n  C 2.35\n  12.0L\n  12+50\n\nThis means: at station 12+50, the stake is 12.0 ft to the left of centerline, and a cut of 2.35 ft is required to reach design grade at that point.\n\nHub stakes are wooden stakes driven flush with the ground. A lath (a thin wooden stake or flagging) is placed next to the hub with the station, offset, and cut/fill information written on it. The hub provides a precise elevation reference; the lath provides the readable information.\n\nFor utility and structure layout, offset stakes are set perpendicular to the structure at specified distances so that the actual structure location can be recovered after excavation using a string line or measuring from the offset stakes.',
        bookRefs: [
          { book: 'Elementary Surveying (ES)', chapter: 'Chapter 23', topic: 'Offset stakes and field layout' },
        ],
      },
      {
        id: 'fs-d9-construction-s6',
        type: 'concept',
        title: 'Slope Staking',
        content: 'Slope stakes mark the point on the natural ground where the constructed slope (cut or fill) will intersect the existing ground surface. Finding this intersection requires an iterative field process because the slope intercept depends on the ground elevation, which varies across the slope.\n\nSlope Staking Process (Trial-and-Error Method):\n\n1. Read the center-station grade rod to determine the cut or fill at centerline.\n2. Estimate a trial offset distance from centerline based on the roadway half-width plus the expected slope.\n3. Walk out to the trial offset and take a rod reading.\n4. Calculate what the cut or fill would be at that trial distance and check whether the slope intercept falls at that point.\n5. Adjust the offset inward or outward and repeat until the computed slope intercept matches the actual offset.\n\nThe slope ratio specifies the horizontal run per unit of vertical rise. Common ratios are:\n- Cut slopes: 1:1, 1.5:1, or 2:1 (horizontal:vertical)\n- Fill slopes: 1.5:1 or 2:1\n\nFor a cut slope with ratio z:1 and a cut depth of d feet at a trial offset, the required distance from centerline is:\n  Offset = HW + z × d\nwhere HW is the half-width of the roadway.\n\nSlope stakes are often set and marked on the uphill side of the intercept for cuts and the downhill side for fills, so they are not buried or disturbed during construction.',
        bookRefs: [
          { book: 'Elementary Surveying (ES)', chapter: 'Chapter 23', topic: 'Slope staking and earthwork' },
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic III, Ch 21', topic: 'Slope staking calculations' },
        ],
      },
      {
        id: 'fs-d9-construction-s7',
        type: 'worked_example',
        title: 'Slope Stake Offset Calculation',
        workedExample: {
          problem: 'A road has a half-width of 18 ft and a cut slope of 2:1 (horizontal:vertical). At a station, the center-line cut is 4.50 ft. What is the required offset distance from centerline to the slope stake?',
          steps: [
            { step: 1, description: 'Identify the half-width (HW) and slope ratio (z:1).', calculation: 'HW = 18 ft; z = 2 (two horizontal per one vertical)' },
            { step: 2, description: 'The cut at centerline is 4.50 ft, but the cut at the slope stake will be greater. For a uniform cross-section, use the cut at center as the depth.', calculation: 'Offset = HW + z × Cut = 18 + 2 × 4.50 = 18 + 9.00 = 27.00 ft' },
          ],
          answer: 'The slope stake should be set 27.00 ft from centerline. The stake would be labeled "C 4.50 / 27.00R" (or left, depending on which side). Note: the actual depth at the slope stake equals the ground cut there, which may differ; an iterative field check is needed for irregular terrain.',
        },
      },
      {
        id: 'fs-d9-construction-s8',
        type: 'concept',
        title: 'Blue-Topping and Finish Grade Staking',
        content: 'Blue-topping is a finish-grade staking technique used for parking lots, building pads, athletic fields, and other areas where the design grade must be set with high precision.\n\nIn blue-topping:\n1. The surveyor sets stakes (called "blue-tops") at regular grid intervals (commonly 25 ft or 50 ft) across the area to be graded.\n2. Each stake is driven so that the top of the stake is exactly at the design finish grade elevation.\n3. Stakes are typically marked with blue paint on the top, giving the technique its name.\n4. The equipment operator grades the surface until the ground is flush with the tops of all the blue-top stakes.\n\nBlue-topping requires more care than rough-grade staking because the stakes themselves serve as the elevation control. The surveyor must compute the required cut or fill and then physically drive the stake until its top is at grade, checking frequently with the level.\n\nThe blue-top rod reading procedure:\n1. Compute HI from a nearby benchmark.\n2. Compute the grade rod (HI − design grade) for each grid point.\n3. Place the rod on top of the stake; if the reading matches the grade rod, the stake top is at design grade. If the reading is too high, drive the stake deeper; if too low, raise it.',
        bookRefs: [
          { book: 'Elementary Surveying (ES)', chapter: 'Chapter 23', topic: 'Finish grade staking and blue-tops' },
        ],
      },
      {
        id: 'fs-d9-construction-s9',
        type: 'concept',
        title: 'As-Built Surveys',
        content: 'An as-built survey (also called a record survey or "red-line" survey) documents the actual locations and elevations of constructed improvements, which may differ from the design plans due to field adjustments, utility conflicts, or changed conditions.\n\nAs-built surveys are required by:\n- Government agencies and transportation departments to verify contract compliance\n- Engineers for post-construction analysis and maintenance planning\n- Property owners who need an accurate record of buried utilities, structures, and drainage\n\nTypical elements documented in an as-built survey:\n- Horizontal alignment of roads, curbs, and pavements\n- Invert and rim elevations of drainage structures (manholes, inlets)\n- Horizontal and vertical locations of underground utilities\n- Foundation and building footprint locations\n- Finish grades of graded areas and swales\n\nAs-built surveys use the same control network established at the start of the project, ensuring that as-built positions can be directly compared to the design coordinate system. Surveyors record field measurements and combine them with as-built plan revisions to produce final record drawings.',
        bookRefs: [
          { book: 'Elementary Surveying (ES)', chapter: 'Chapter 23', topic: 'As-built surveys and record drawings' },
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic III, Ch 21', topic: 'Construction surveys and as-built documentation' },
        ],
      },
      {
        id: 'fs-d9-construction-s10',
        type: 'knowledge_check',
        title: 'Construction Surveying Concepts Check',
        knowledgeCheck: {
          question: 'During a blue-topping operation, the HI is 310.40 ft and the design grade elevation is 306.20 ft. The surveyor places the rod on top of a stake and reads 4.15 ft. What should the surveyor do?',
          options: [
            'The stake top is at grade; no adjustment needed',
            'Drive the stake deeper — the top is currently above design grade',
            'Raise the stake — the top is currently below design grade',
            'Accept the stake position; a 0.05 ft error is within tolerance',
          ],
          correctIndex: 1,
          explanation: 'Grade Rod = HI − Grade Elevation = 310.40 − 306.20 = 4.20 ft. If the stake top were exactly at grade, the rod reading on the stake top would be 4.20 ft. The actual rod reading is 4.15 ft, which is less than 4.20 ft, meaning the stake top is ABOVE the design grade elevation. The surveyor must drive the stake deeper until the rod reading equals 4.20 ft.',
        },
      },
      {
        id: 'fs-d9-construction-s11',
        type: 'further_reading',
        title: 'Construction Surveying References',
        furtherReading: [
          { book: 'Elementary Surveying, 15th Edition (Ghilani & Wolf)', chapter: 'Chapter 23', topic: 'Construction surveying — grade stakes, slope staking, as-builts' },
          { book: 'Surveyor Reference Manual', chapter: 'Topic III, Ch 21', topic: 'Route surveying and construction layout calculations' },
        ],
      },
    ],
  },
  {
    id: 'fs-d9-land-dev',
    examTrack: 'fs',
    domainNumber: 4,
    domain: 'Surveying Principles',
    title: 'Land Development & Subdivision Surveying',
    description: 'Understand the platting process, subdivision regulations, dedication vs. easement, lot-and-block legal descriptions, and the surveyor\'s role in land development projects. These concepts appear on the FS exam and are fundamental to practice.',
    estimatedMinutes: 18,
    sections: [
      {
        id: 'fs-d9-land-dev-s1',
        type: 'concept',
        title: 'The Subdivision and Platting Process',
        content: 'Subdivision is the act of dividing a parcel of land into two or more smaller lots, tracts, or parcels. The process creates new legal parcels that can be individually sold, developed, or encumbered. In most jurisdictions, any division of land that meets the local definition of a subdivision triggers a regulated review and approval process.\n\nThe typical platting sequence:\n\n1. Conceptual/Sketch Plan: The developer prepares a rough layout showing proposed lots, streets, drainage, and open space. This is presented to the planning department for initial feedback.\n\n2. Preliminary Plat: A more detailed drawing prepared by a licensed surveyor or engineer, showing proposed lot boundaries, dimensions, areas, street alignments, utility easements, and setbacks. The preliminary plat is submitted for review by the planning commission, engineering department, and utility providers.\n\n3. Final Plat: After all preliminary plat conditions are satisfied, the surveyor prepares the final plat based on accurate field measurements. The final plat must be signed and sealed by the licensed surveyor, and is then reviewed and approved by the appropriate authority (city council, county commissioners, or planning commission).\n\n4. Filing and Recording: The approved final plat is filed in the county deed records or equivalent land records office. Once recorded, the plat creates the legal framework for ownership and conveyance of the individual lots.',
        bookRefs: [
          { book: 'Elementary Surveying (ES)', chapter: 'Chapter 22', topic: 'Subdivision and platting' },
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic V, Ch 28', topic: 'Land development and subdivision' },
        ],
      },
      {
        id: 'fs-d9-land-dev-s2',
        type: 'concept',
        title: 'Dedication vs. Easement in Subdivisions',
        content: 'When a subdivision plat creates streets, parks, or utility corridors, the land can be conveyed to the public or utility providers in two ways: dedication or easement.\n\nDedication is the transfer of the fee simple (full ownership) title to a street, park, or other public improvement to a governmental entity. Dedication can occur:\n- By plat: When the developer signs the plat and the municipality accepts it, the dedicated areas pass to public ownership. A note on the plat such as "All streets shown hereon are hereby dedicated to the public" is a common example.\n- By deed: A separate instrument of conveyance.\n- By use: In some jurisdictions, long-term public use of a way can create a common-law dedication.\n\nAn easement conveys only a right to use the land for a specific purpose, while the underlying fee title remains with the property owner. Utility easements (for pipelines, power lines, drainage) are typically easements rather than dedications. The property owner retains title to the land but cannot obstruct the utility corridor.\n\nKey distinction on the FS exam: In a dedication, the city or county owns the street right-of-way in fee. In an easement for a private road, the adjacent landowner(s) own the underlying land and can use it for any purpose that does not interfere with the easement right.',
        bookRefs: [
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic V, Ch 24-25', topic: 'Easements, dedication, and title transfer' },
          { book: 'Elementary Surveying (ES)', chapter: 'Chapter 22', topic: 'Plat dedications and easements' },
        ],
      },
      {
        id: 'fs-d9-land-dev-s3',
        type: 'knowledge_check',
        title: 'Dedication vs. Easement Check',
        knowledgeCheck: {
          question: 'A subdivision plat includes the statement: "All public streets shown hereon are hereby dedicated to the City of Plainview for public use forever." After the city accepts the plat, who holds title to the land within those street rights-of-way?',
          options: [
            'The original developer retains title and grants only an easement to the city',
            'Title passes to the city in fee simple upon acceptance of the dedication',
            'Each adjacent lot owner holds title to the centerline of the adjoining street',
            'The title remains with the homeowners association',
          ],
          correctIndex: 1,
          explanation: 'A dedication by plat transfers fee simple ownership of the dedicated area to the accepting governmental entity. Once the city accepts the plat, the city owns the right-of-way in fee. This is different from an easement, where the grantor retains fee title but grants a use right. The adjacent lot owners do not own to the street centerline when a fee dedication has occurred.',
        },
      },
      {
        id: 'fs-d9-land-dev-s4',
        type: 'concept',
        title: 'Lot-and-Block Legal Descriptions',
        content: 'Once a subdivision plat is recorded, individual lots are identified using the lot-and-block system. This is the most common method of legal description for urban and suburban residential parcels.\n\nA lot-and-block description has three essential components:\n\n1. Lot number: The specific lot within the block.\n2. Block number: The block within the subdivision (a group of lots enclosed by streets).\n3. Subdivision name and recorded plat reference: The name of the subdivision as shown on the recorded plat, plus the volume and page (or instrument number) of the recorded plat in the county deed records.\n\nExample of a complete lot-and-block description:\n"Lot 14, Block 3, Meadow Ridge Subdivision, as recorded in Volume 42, Pages 18-21, of the Plat Records of Travis County, Texas."\n\nThe lot-and-block description is complete because it fully identifies the parcel by reference to the recorded plat. The parcel\'s dimensions, area, and boundary coordinates are found by examining the plat itself, not repeated in the deed.\n\nThe system works because the act of recording the plat creates a public record that defines the lot boundaries. All subsequent conveyances of the lot refer back to that recorded instrument, giving every deed examiner a clear chain to the original survey.',
        bookRefs: [
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic V, Ch 28', topic: 'Legal descriptions — lot and block method' },
          { book: 'Elementary Surveying (ES)', chapter: 'Chapter 22', topic: 'Subdivision plats and legal descriptions' },
        ],
      },
      {
        id: 'fs-d9-land-dev-s5',
        type: 'concept',
        title: 'Setbacks, Building Lines, and Zoning Requirements',
        content: 'Subdivision regulations and zoning ordinances impose spatial restrictions on how lots can be used and developed. The FS exam tests familiarity with several key concepts:\n\nBuilding Setback Line (BSL): The minimum distance from a property line within which no structure may be built. Setbacks are specified for each side of the lot:\n- Front setback: Distance from the front property line (usually the street line) to the nearest point of the building.\n- Rear setback: Distance from the rear property line.\n- Side setbacks: Distance from each side property line.\n\nSetbacks may be shown directly on the plat as building lines, or they may be established by the applicable zoning ordinance. When shown on the plat, building lines are binding on all future owners.\n\nUtility Easements: Strips of land reserved for underground utilities (water, sewer, gas, electric, telephone, cable). Typically 5 to 15 ft wide, centered on or adjacent to lot lines. Structures may not be built within utility easements.\n\nDrainage Easements: Reserved for stormwater management facilities (swales, channels, detention ponds). The property owner cannot obstruct drainage flow within these easements.\n\nAccess Easements: Strips reserved for vehicular or pedestrian access between lots or to public rights-of-way.\n\nOn the FS exam, problems may require identifying setback violations, computing available building area, or interpreting plat notes about easements and restrictions.',
        bookRefs: [
          { book: 'Elementary Surveying (ES)', chapter: 'Chapter 22', topic: 'Subdivision regulations, setbacks, and easements' },
        ],
      },
      {
        id: 'fs-d9-land-dev-s6',
        type: 'worked_example',
        title: 'Computing Available Building Area',
        workedExample: {
          problem: 'A rectangular lot is 80 ft wide and 125 ft deep. The applicable zoning ordinance requires a 25 ft front setback, 5 ft side setbacks on each side, and a 10 ft rear setback. Additionally, a 10 ft utility easement runs along the rear lot line. What is the available building area?',
          steps: [
            { step: 1, description: 'Determine the buildable depth of the lot. The rear setback is 10 ft from the rear lot line, and the utility easement is also 10 ft wide along the rear. The controlling rear restriction is the larger of the two (here they are equal, but the building line is measured from the property line, not the easement edge).', calculation: 'Front setback = 25 ft; Rear setback = 10 ft; Buildable depth = 125 − 25 − 10 = 90 ft' },
            { step: 2, description: 'Determine the buildable width. Side setbacks are 5 ft on each side.', calculation: 'Buildable width = 80 − 5 − 5 = 70 ft' },
            { step: 3, description: 'Compute the buildable area.', calculation: 'Area = 70 × 90 = 6,300 sq ft' },
          ],
          answer: 'The available building area (the buildable envelope) is 6,300 sq ft. Note: The utility easement restricts structures but not the setback measurement origin; confirm with local regulations whether the easement area further restricts the building.',
        },
      },
      {
        id: 'fs-d9-land-dev-s7',
        type: 'concept',
        title: 'The Surveyor\'s Role in Land Development Projects',
        content: 'Licensed surveyors provide multiple services throughout the land development cycle:\n\nPre-Development Phase:\n- Boundary survey to confirm ownership and parcel dimensions before design begins\n- Topographic survey to support grading and drainage design\n- Research of easements, encumbrances, and title restrictions\n- Preparation of the preliminary plat or tract map\n\nDesign and Permitting Phase:\n- Preparation and signing of the final subdivision plat\n- Verification of lot areas, dimensions, and closures\n- Submission and coordination with governmental review agencies\n- Addressing agency comments and revising plat as needed\n\nConstruction Phase:\n- Setting horizontal and vertical control\n- Staking lot corners, building setback lines, and right-of-way lines\n- Construction staking for streets, utilities, drainage, and structures\n- Monitoring earthwork quantities and grades\n\nPost-Construction Phase:\n- Lot corner monumentation (setting required physical monuments at each lot corner)\n- As-built surveys of constructed improvements\n- Final plat amendments if any field changes occurred\n\nThe final plat must be prepared and sealed by a licensed surveyor because it establishes legal boundaries that will affect property rights for decades. The surveyor must verify that all lot corners close properly, that all required information is shown, and that the plat meets state and local statutory requirements before signing.',
        bookRefs: [
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic V, Ch 28', topic: 'Subdivision practice and surveyor\'s duties' },
        ],
      },
      {
        id: 'fs-d9-land-dev-s8',
        type: 'knowledge_check',
        title: 'Land Development Process Check',
        knowledgeCheck: {
          question: 'In a recorded subdivision, Lot 12 is shown with a 15-foot utility easement along its rear lot line. Which of the following statements is correct?',
          options: [
            'The lot owner loses fee title to the land within the easement strip',
            'No structures may be built within the 15-foot easement strip, but the lot owner retains underlying fee title',
            'The utility company owns the land within the easement strip in fee simple',
            'The easement expires automatically after 20 years if not used',
          ],
          correctIndex: 1,
          explanation: 'In a utility easement, the property owner retains fee title to the land within the easement strip but cannot build structures that would interfere with the utility\'s right to use the easement area. The utility company (or public) holds only the right to install, maintain, and access utilities — not ownership of the land. Easements do not expire automatically through non-use unless they were created with an express time limitation.',
        },
      },
      {
        id: 'fs-d9-land-dev-s9',
        type: 'further_reading',
        title: 'Land Development References',
        furtherReading: [
          { book: 'Elementary Surveying, 15th Edition (Ghilani & Wolf)', chapter: 'Chapter 22', topic: 'Subdivision surveys, platting, and land development' },
          { book: 'Surveyor Reference Manual', chapter: 'Topic V, Chapters 24-28', topic: 'Boundary law, easements, and land development practice' },
        ],
      },
    ],
  },
];
