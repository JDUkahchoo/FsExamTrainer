import type { ReadingModule } from '../schema';

export const STUDY_READINGS_TX: ReadingModule[] = [
  // ─── Domain 1: TBPELS Licensing & Rules ───
  {
    id: 'tx-d1-tbpels-licensing',
    examTrack: 'tx',
    domainNumber: 1,
    domain: 'TBPELS Licensing & Rules',
    title: 'TBPELS: Licensing, Rules, and Professional Conduct in Texas',
    description: 'Texas surveyors are licensed and regulated by the Texas Board of Professional Engineers and Land Surveyors (TBPELS). This reading covers the license types, the path to becoming a Registered Professional Land Surveyor (RPLS), continuing education, and the rules of professional conduct enforced by the Board.',
    estimatedMinutes: 20,
    sections: [
      {
        id: 'tx-d1-s1',
        type: 'concept',
        title: 'Who Regulates Surveying in Texas',
        content: 'Land surveying in Texas is regulated by the Texas Board of Professional Engineers and Land Surveyors (TBPELS). In 2019, the formerly separate Texas Board of Professional Land Surveying (TBPLS) was consolidated with the engineering board to form TBPELS. The Board administers the Texas Engineering Practice Act and the Professional Land Surveying Practices Act, and it adopts the rules found in the Texas Administrative Code (TAC), Title 22, Part 6.\n\nThe Board\'s core responsibilities are:\n• Issuing licenses and registrations to qualified individuals.\n• Setting and enforcing standards of professional conduct.\n• Investigating complaints and disciplining licensees.\n• Approving continuing education requirements.\n\nThe practice of land surveying in Texas — establishing or re-establishing boundaries, preparing plats, and certifying surveys — may only be performed by or under the direct supervision of a licensee. Practicing without a license is a violation of the Practices Act.',
      },
      {
        id: 'tx-d1-s2',
        type: 'concept',
        title: 'Texas License Types',
        content: 'Texas issues several categories relevant to surveying:\n\n• Surveyor-in-Training (SIT): The entry credential earned after passing the NCEES Fundamentals of Surveying (FS) exam and meeting education requirements. An SIT is not a license to practice independently — it certifies you have passed the fundamentals and may accrue experience under an RPLS.\n\n• Registered Professional Land Surveyor (RPLS): The full professional license. An RPLS may independently practice land surveying, sign and seal plats and surveys, and supervise others. Requires passing the NCEES Principles and Practice of Surveying (PS) exam plus the Texas state-specific exam, and meeting the experience requirement.\n\n• Licensed State Land Surveyor (LSLS): A specialized, additional license required to perform surveys of Texas public/state land (land in which the State of Texas has an interest, administered through the General Land Office). The LSLS is unique to Texas and reflects the state\'s distinctive land-grant history. An LSLS must first be an RPLS.\n\nKey distinction for the exam: an RPLS handles private boundary work; an LSLS is additionally authorized for state land surveys under the GLO.',
      },
      {
        id: 'tx-d1-s3',
        type: 'concept',
        title: 'The Path to RPLS',
        content: 'The typical Texas licensure path:\n\n1. Education — A degree or equivalent coursework meeting the Board\'s education requirements in surveying or a related field.\n\n2. Pass the FS exam — The NCEES Fundamentals of Surveying exam. On passing and meeting requirements, you may register as a Surveyor-in-Training (SIT).\n\n3. Gain experience — Acquire qualifying surveying experience under the supervision of an RPLS. The amount depends on your education level; more education reduces required years of experience.\n\n4. Pass the PS exam — The NCEES Principles and Practice of Surveying exam.\n\n5. Pass the Texas state-specific exam — Covers Texas law, GLO history, the Practices Act, and Board rules. This is the portion this study track focuses on.\n\n6. Apply for RPLS — Submit references, experience records, and the application to the Board.\n\nThe combination of national exams (FS, PS) plus the Texas-specific exam is what distinguishes Texas licensure. You can be excellent at national surveying fundamentals and still fail without knowing Texas-specific law and history.',
      },
      {
        id: 'tx-d1-s4',
        type: 'concept',
        title: 'Continuing Education (CEP)',
        content: 'Texas RPLS holders must complete Continuing Education Program (CEP) hours to renew their license. The standard requirement is 16 CEP hours per renewal period (renewals are annual in Texas), with a portion required to be in professional/ethics or rules of professional conduct content.\n\nKey CEP points:\n• Hours must relate to the practice of land surveying.\n• A specified minimum must cover ethics and/or the Board\'s rules of professional conduct.\n• Licensees must retain records/documentation of CEP completion in case of audit.\n• Carryover of excess hours is limited.\n\nFailing to meet CEP requirements can result in the inability to renew and potential disciplinary action. The exact hour counts and category breakdowns are set in the Board rules (22 TAC) and can be updated, so always verify the current requirement at renewal time.',
      },
      {
        id: 'tx-d1-s5',
        type: 'concept',
        title: 'Rules of Professional Conduct',
        content: 'The Board\'s rules of professional conduct (in 22 TAC) bind every licensee. Core duties include:\n\n• Protecting public health, safety, and welfare — the surveyor\'s paramount obligation.\n• Performing services only in areas of competence.\n• Issuing objective and truthful statements; not falsifying or misrepresenting facts.\n• Avoiding conflicts of interest, or disclosing them fully when unavoidable.\n• Properly using the seal — sealing only work performed by the licensee or under their direct supervision.\n• Maintaining confidentiality of client information.\n• Not engaging in deceptive solicitation of work.\n\nViolations can lead to disciplinary actions ranging from reprimands and administrative penalties to license suspension or revocation. The exam frequently tests scenarios involving sealing work the surveyor did not supervise, practicing outside competence, and conflicts of interest.',
        bookRefs: [
          { book: 'Texas Administrative Code', chapter: 'Title 22, Part 6', topic: 'TBPELS rules of professional conduct' },
        ],
      },
      {
        id: 'tx-d1-s6',
        type: 'knowledge_check',
        title: 'Check: License Types',
        knowledgeCheck: {
          question: 'Which Texas credential is specifically required to survey land in which the State of Texas has an interest (public/state land administered by the General Land Office)?',
          options: [
            'Surveyor-in-Training (SIT)',
            'Registered Professional Land Surveyor (RPLS)',
            'Licensed State Land Surveyor (LSLS)',
            'Professional Engineer (PE)',
          ],
          correctIndex: 2,
          explanation: 'The Licensed State Land Surveyor (LSLS) is the Texas-specific credential required to survey state/public land under the GLO. An LSLS must already be an RPLS. The RPLS alone authorizes private boundary work but not state land surveys.',
        },
      },
      {
        id: 'tx-d1-s7',
        type: 'exam_tips',
        title: 'Exam Tips: Licensing',
        examTips: [
          'Memorize the three credentials: SIT (entry), RPLS (full private practice), LSLS (state land, GLO).',
          'The seal may only be applied to work performed by the licensee or under their direct supervision — sealing others\' unsupervised work is a classic violation.',
          'Protecting public health, safety, and welfare is the paramount duty — when a conduct question offers it as an option, it usually wins.',
          'Texas renewals are annual; CEP requirements include an ethics/rules component.',
          'TBPELS = the merged engineering + surveying board (post-2019). The old TBPLS no longer exists as a separate entity.',
        ],
      },
    ],
  },

  // ─── Domain 2: Texas Boundary Law & GLO Surveys ───
  {
    id: 'tx-d2-boundary-glo',
    examTrack: 'tx',
    domainNumber: 2,
    domain: 'Texas Boundary Law & GLO Surveys',
    title: 'Texas Boundary Law: Land Grants, the GLO System, and Senior Rights',
    description: 'Texas never used the federal Public Land Survey System (PLSS). Instead it has a unique land-grant heritage from Spanish, Mexican, and Republic-era grants, administered today by the General Land Office (GLO). This reading explains the Texas land system, the role of the GLO, and how boundary conflicts are resolved.',
    estimatedMinutes: 22,
    sections: [
      {
        id: 'tx-d2-s1',
        type: 'concept',
        title: 'Why Texas Is Different: No PLSS',
        content: 'Most states west of the original colonies were surveyed under the federal Public Land Survey System (PLSS) — the township-range-section grid. Texas is the great exception. When Texas joined the United States in 1845, it retained ownership of its public lands (a condition of annexation). As a result, Texas land was never subdivided into the PLSS grid.\n\nInstead, Texas land titles trace back to grants made under:\n• Spanish rule (before 1821)\n• Mexican rule (1821–1836)\n• The Republic of Texas (1836–1845)\n• The State of Texas (1845–present)\n\nThese grants were described by metes and bounds and by the original surveys tied to natural and artificial monuments. The body of land records — original field notes, sketches, and patents — is held by the Texas General Land Office (GLO). Understanding this heritage is essential: a Texas boundary retracement often depends on locating an original league, labor, or survey defined two centuries ago.',
      },
      {
        id: 'tx-d2-s2',
        type: 'concept',
        title: 'The General Land Office (GLO)',
        content: 'The Texas General Land Office, established in 1836, is the oldest state agency in Texas. It manages state lands and mineral rights, and — critically for surveyors — it is the official archive of the original land grant surveys.\n\nThe GLO holds:\n• Original field notes from the empresario-era and Republic surveys.\n• Sketches and maps of the original grants.\n• Patents (the documents conveying title from the sovereign to the original grantee).\n• Records of state land and the original surveyor returns.\n\nFor a retracing surveyor, GLO records are primary evidence. When re-establishing the footsteps of the original surveyor, the GLO field notes are often the best record of the original survey\'s calls, monuments, and bearings. Surveys of land in which the state retains an interest must be performed by a Licensed State Land Surveyor (LSLS), and those surveys are filed back with the GLO.',
      },
      {
        id: 'tx-d2-s3',
        type: 'concept',
        title: 'Texas Land Units: League, Labor, Vara',
        content: 'Texas land grants used Spanish/Mexican units that you must know:\n\n• Vara — the fundamental Texas linear unit. The Texas vara = 33 1/3 inches = 2.7778 ft (1 vara = 33.333.../12 ft). Distinguish this from the California vara (33 inches). 1,000,000 square varas relationships underlie larger units.\n\n• Labor — an area unit, primarily for farming land. 1 labor = 1,000,000 square varas ≈ 177.1 acres. A labor is 1000 varas on a side.\n\n• League (legua) — a larger area unit, primarily for grazing land. 1 league = 25 labores = 25,000,000 square varas ≈ 4,428.4 acres. A league is 5000 varas on a side.\n\n• A "league and labor" was a common headright grant size (≈ 4,605 acres) given to married settlers under colonization laws.\n\nThe vara is the key conversion: when an original field note says "1900 varas," you convert at 2.7778 ft/vara = 5,277.8 ft. Mixing up the Texas vara with other states\' varas is a classic error.',
        bookRefs: [
          { book: 'GLO Land Grant Records', chapter: 'Original Field Notes', topic: 'Spanish/Mexican land measurement units' },
        ],
      },
      {
        id: 'tx-d2-s4',
        type: 'formula',
        title: 'Vara Conversion',
        formula: {
          expression: '1 Texas vara = 33 1/3 in = 2.77778 ft\n\nFeet = varas × 2.77778\nVaras = feet ÷ 2.77778\n\n1 labor = 1,000,000 sq varas ≈ 177.1 acres\n1 league = 25,000,000 sq varas ≈ 4,428.4 acres',
          variables: [
            { symbol: 'vara', description: 'Texas linear unit = 33 1/3 inches = 2.77778 US survey feet' },
            { symbol: 'labor', description: 'Texas area unit = 1,000,000 square varas ≈ 177.1 acres (1000 varas square)' },
            { symbol: 'league', description: 'Texas area unit = 25 labores = 25,000,000 sq varas ≈ 4,428.4 acres (5000 varas square)' },
          ],
          whenToUse: 'Use when converting original Texas grant field-note distances and areas to modern feet and acres during retracement. The vara is the most-tested Texas-specific unit. Always confirm the unit is the Texas vara (33 1/3 in), not the California or Spanish vara.',
        },
      },
      {
        id: 'tx-d2-s5',
        type: 'worked_example',
        title: 'Worked Example: Converting a Grant Call',
        workedExample: {
          problem: 'An original GLO field note for a league corner calls a line of 2,500 varas. Convert this distance to US survey feet, and determine the area in acres of a square league (5,000 varas on a side).',
          steps: [
            { step: 1, description: 'Convert the line length: 2,500 varas × 2.77778 ft/vara', calculation: '2,500 × 2.77778 = 6,944.4 ft' },
            { step: 2, description: 'Area of a square league = side × side in square varas', calculation: '5,000 × 5,000 = 25,000,000 sq varas' },
            { step: 3, description: 'Convert square varas to square feet: × (2.77778)²', calculation: '25,000,000 × 7.71605 = 192,901,235 sq ft' },
            { step: 4, description: 'Convert to acres: ÷ 43,560', calculation: '192,901,235 / 43,560 ≈ 4,428.4 acres' },
          ],
          answer: 'The 2,500-vara line ≈ 6,944.4 ft. A square league ≈ 4,428.4 acres, confirming the standard league size.',
        },
      },
      {
        id: 'tx-d2-s6',
        type: 'concept',
        title: 'Senior Rights and the Order of Grants',
        content: 'Because Texas land was granted piece by piece over time, conflicts between adjoining grants are resolved using senior rights. The principle: the grant created first (the senior grant) holds its full called acreage; a later (junior) grant takes only what is left over.\n\nWhen original surveys overlap or leave gaps:\n• The senior survey is given priority — its boundaries are honored as originally established.\n• The junior survey yields to the senior; any overlap is awarded to the senior, and the junior absorbs any shortage (a "vacancy" if land was never granted at all).\n• A vacancy is land that was never included in any valid grant; it may remain state land subject to the GLO.\n\nThis is different from the simultaneous-conveyance logic of a platted subdivision. Texas retracement weighs the order and dignity of the original grants. The exam tests the rule that, between conflicting senior and junior surveys, the senior survey prevails and the junior bears the deficiency.',
      },
      {
        id: 'tx-d2-s7',
        type: 'concept',
        title: 'Order of Importance of Calls (Texas)',
        content: 'When original field-note calls conflict during retracement, Texas courts follow a recognized order of dignity of calls (consistent with general boundary law but firmly applied in Texas):\n\n1. Natural monuments (rivers, creeks, distinctive trees) — highest dignity.\n2. Artificial monuments (set stones, iron rods, original corners, marked lines).\n3. Adjoinder calls (calls for the boundary of an adjacent senior survey).\n4. Course (bearing/direction).\n5. Distance.\n6. Quantity (area) — lowest dignity.\n\nThe principle: follow the footsteps of the original surveyor. Monuments that the original surveyor actually called for and set control over later-computed course and distance, because they best reflect the original intent on the ground. Area (quantity) is the weakest call and yields to all others.',
        bookRefs: [
          { book: "Brown's Boundary Control", chapter: 'Order of Calls', topic: 'Dignity of calls in retracement' },
        ],
      },
      {
        id: 'tx-d2-s8',
        type: 'knowledge_check',
        title: 'Check: Senior Rights',
        knowledgeCheck: {
          question: 'Two adjoining original Texas surveys overlap. Survey A was patented in 1845; Survey B was patented in 1860. How is the overlap resolved?',
          options: [
            'Split the overlap equally between A and B',
            'Survey B (junior) takes the overlap because it is newer',
            'Survey A (senior) holds its full boundaries; Survey B (junior) bears the shortage',
            'The overlap reverts to the state as a vacancy',
          ],
          correctIndex: 2,
          explanation: 'Senior rights govern: the earlier grant (Survey A, 1845) is senior and holds its full called boundaries. The junior grant (Survey B, 1860) yields and absorbs the deficiency in the overlap area.',
        },
      },
      {
        id: 'tx-d2-s9',
        type: 'exam_tips',
        title: 'Exam Tips: Boundary & GLO',
        examTips: [
          'Texas has NO PLSS — never apply township/range/section logic to original Texas grants.',
          'The Texas vara = 33 1/3 in = 2.77778 ft. Labor ≈ 177.1 ac (1000 varas²); league ≈ 4,428.4 ac (5000 varas²).',
          'The GLO (est. 1836) is the official archive of original grant field notes and patents — it is primary evidence.',
          'Senior rights: the older grant holds full acreage; the junior bears any overlap shortage. A vacancy is ungranted land.',
          'Order of calls: natural monuments > artificial monuments > adjoinder > course > distance > quantity.',
          'State land surveys require an LSLS and are filed with the GLO.',
        ],
      },
    ],
  },

  // ─── Domain 3: Texas Water Law ───
  {
    id: 'tx-d3-water-law',
    examTrack: 'tx',
    domainNumber: 3,
    domain: 'Texas Water Law',
    title: 'Texas Water Boundaries: Gradient Boundary, Navigability, and Riparian Rights',
    description: 'Water boundaries in Texas follow distinctive rules, most famously the gradient boundary doctrine from the Motl v. Boyd line of cases. This reading covers the gradient boundary, navigable stream rules, the 30-foot rule, riparian vs. appropriative rights, and tidal boundaries along the Gulf coast.',
    estimatedMinutes: 22,
    sections: [
      {
        id: 'tx-d3-s1',
        type: 'concept',
        title: 'The Gradient Boundary Doctrine',
        content: 'The most distinctive Texas water-boundary concept is the gradient boundary. For navigable streams where the state owns the bed, the boundary between private upland and state-owned streambed is the gradient boundary — located along the gradient of the flowing water, midway between the lower level of the flowing water that just reaches the cut bank and the higher level that just does not overtop it.\n\nThe gradient boundary was defined in Texas v. Oklahoma litigation along the Red River and developed in Texas case law. It is essentially located at the gradient of the bank — not the centerline, not the vegetation line, but a specific physical location keyed to the bank and the water surface gradient.\n\nKey points:\n• It applies to navigable streams where the state holds the bed.\n• It is located by a qualified surveyor using the physical bank and the water-surface gradient (a specialized procedure).\n• The gradient boundary is a Texas-specific doctrine you will be tested on.',
        bookRefs: [
          { book: 'Texas Case Law', chapter: 'Motl v. Boyd; Oklahoma v. Texas', topic: 'Gradient boundary location' },
        ],
      },
      {
        id: 'tx-d3-s2',
        type: 'concept',
        title: 'Navigability and the 30-Foot Rule',
        content: 'Whether the State of Texas owns a streambed depends on navigability. Texas uses a statutory definition: a stream is "navigable in fact" if it has an average width of 30 feet or more from the mouth up (the "navigable in law" / 30-foot rule, from the 1837 Act and codified in the Texas Natural Resources Code).\n\n• If a stream is navigable (averages 30 ft or wider), the bed belongs to the State of Texas, and the boundary of the adjoining private land is the gradient boundary.\n• If a stream is non-navigable (averages less than 30 ft), the bed is privately owned. For a non-navigable stream that forms a boundary, the boundary is typically the center (thread) of the stream, and the riparian owner owns to the centerline.\n\nThe 30-foot average width is measured between the cut banks (not just the water), averaged over the stream\'s course. This rule is heavily tested and is unique to Texas.',
        bookRefs: [
          { book: 'Texas Natural Resources Code', chapter: 'Ch. 21', topic: 'Definition of navigable streams (30-foot rule)' },
        ],
      },
      {
        id: 'tx-d3-s3',
        type: 'concept',
        title: 'Riparian vs. Appropriative Water Rights',
        content: 'Texas has a dual (hybrid) system for the right to USE surface water — distinct from the question of who owns the bed:\n\n• Riparian rights — historic rights attached to land bordering a watercourse, inherited from Spanish/Mexican and English common law. Riparian owners have certain rights to use adjacent water. Many older Texas grants carry riparian rights.\n\n• Prior appropriation ("first in time, first in right") — the doctrine that the first to put water to beneficial use acquires a priority right. Texas largely moved to a permit-based appropriation system; surface water in Texas is owned by the state and is allocated through water rights permits administered by the TCEQ (Texas Commission on Environmental Quality).\n\nThe result is a hybrid: Texas recognizes some vested riparian claims but administers most surface-water use through the prior-appropriation permit system. Groundwater, by contrast, follows the rule of capture (the "English rule") — landowners may generally pump groundwater beneath their land, subject to groundwater conservation district regulation.',
      },
      {
        id: 'tx-d3-s4',
        type: 'concept',
        title: 'Tidal and Gulf Coast Boundaries',
        content: 'Along the Gulf of Mexico, Texas boundaries follow tidal rules:\n\n• The boundary between state-owned submerged land and private upland on the open coast is generally the mean higher high water (MHHW) line for grants originating under Spanish/Mexican law, and the mean high water (MHW) line under Anglo-American common law — Texas applies the line appropriate to the grant\'s origin (Luttes v. State established that Spanish/Mexican grants use the higher line).\n\n• The State of Texas owns the tidelands and submerged lands seaward of the line, including the beds of bays and the Gulf out to the state\'s seaward boundary (Texas\'s Gulf boundary extends 3 marine leagues — about 10.35 statute miles — offshore, a result of its history as an independent republic).\n\n• The Texas Open Beaches Act protects public access to Gulf beaches between the line of mean low tide and the line of vegetation.\n\nThe 3-marine-league offshore boundary is a Texas (and Florida Gulf coast) peculiarity tied to the Republic era and is a favorite exam fact.',
        bookRefs: [
          { book: 'Texas Case Law', chapter: 'Luttes v. State', topic: 'Tidal boundary line for Spanish/Mexican grants' },
        ],
      },
      {
        id: 'tx-d3-s5',
        type: 'knowledge_check',
        title: 'Check: Navigability',
        knowledgeCheck: {
          question: 'Under Texas law, a stream is considered navigable (state owns the bed) when its average width from the mouth up is at least:',
          options: [
            '10 feet',
            '30 feet',
            '50 feet',
            '66 feet (one chain)',
          ],
          correctIndex: 1,
          explanation: 'The Texas statutory "30-foot rule" defines a navigable stream as one averaging 30 feet or more in width from the mouth up, measured between the banks. Navigable streambeds belong to the State of Texas, and the upland boundary is the gradient boundary.',
        },
      },
      {
        id: 'tx-d3-s6',
        type: 'common_mistakes',
        title: 'Common Mistakes: Water Law',
        commonMistakes: [
          'Confusing the gradient boundary with the centerline. The gradient boundary applies to NAVIGABLE streams (state-owned bed); the centerline (thread) applies to NON-navigable streams (private bed).',
          'Forgetting the 30-foot rule measures AVERAGE width between the banks from the mouth up — not the water width at a single point.',
          'Mixing up bed ownership (navigability) with use rights (riparian/appropriation). They are separate questions.',
          'Assuming groundwater follows appropriation — Texas groundwater follows the rule of capture, subject to conservation districts.',
          'Forgetting the Texas Gulf boundary extends 3 marine leagues (~10.35 mi) offshore due to the Republic-era history.',
        ],
      },
      {
        id: 'tx-d3-s7',
        type: 'exam_tips',
        title: 'Exam Tips: Water Law',
        examTips: [
          'Gradient boundary = navigable stream upland boundary; located at the gradient of the cut bank (a specialized procedure).',
          '30-foot average width = navigable = state owns the bed. Under 30 ft = non-navigable = private bed to centerline.',
          'Surface water use = hybrid riparian + prior appropriation (TCEQ permits). Groundwater = rule of capture.',
          'Tidal boundary: Spanish/Mexican grants use the higher (MHHW) line per Luttes v. State.',
          'Texas Gulf seaward boundary = 3 marine leagues (~10.35 statute miles) offshore.',
        ],
      },
    ],
  },

  // ─── Domain 4: Texas State Plane Zones ───
  {
    id: 'tx-d4-state-plane-zones',
    examTrack: 'tx',
    domainNumber: 4,
    domain: 'Texas State Plane Zones',
    title: 'Texas State Plane Coordinate System: Five Lambert Zones',
    description: 'Texas is divided into five State Plane Coordinate System zones, all using the Lambert Conformal Conic projection. This reading covers the five zones, which counties fall in each, why Texas uses Lambert, and how the Texas Coordinate System is defined in statute.',
    estimatedMinutes: 18,
    sections: [
      {
        id: 'tx-d4-s1',
        type: 'concept',
        title: 'Why Texas Uses Lambert Conformal Conic',
        content: 'The State Plane Coordinate System assigns each zone a map projection chosen to minimize distortion based on the zone\'s shape:\n• Zones that are wider east-west use the Lambert Conformal Conic (LCC) projection.\n• Zones that are taller north-south use the Transverse Mercator (TM) projection.\n\nTexas is much wider east-west than it is tall in each of its zones, so all Texas State Plane zones use the Lambert Conformal Conic projection. The zones are stacked north-to-south as horizontal bands across the state, each band wider than it is tall — ideal for Lambert.\n\nThis is a key Texas fact: every Texas SPC zone is Lambert. (Contrast with a state like Illinois, which is tall and narrow and uses Transverse Mercator.)',
      },
      {
        id: 'tx-d4-s2',
        type: 'concept',
        title: 'The Five Texas Zones',
        content: 'Texas is divided into five State Plane zones, banded north to south:\n\n• North Zone (FIPS 4201) — the Panhandle and north Texas (e.g., Amarillo, Wichita Falls).\n• North Central Zone (FIPS 4202) — the Dallas–Fort Worth region and central-north Texas.\n• Central Zone (FIPS 4203) — Austin, Waco, Midland/Odessa, El Paso region.\n• South Central Zone (FIPS 4204) — San Antonio, Houston, the central Gulf coast.\n• South Zone (FIPS 4205) — the lower Rio Grande Valley and deep south Texas (e.g., Corpus Christi, Brownsville).\n\nEach zone has its own defining parameters: two standard parallels, a central meridian, and a false origin (false easting/northing). Coordinates are reported as Northing and Easting. Older work used NAD 83 in US survey feet; SPCS2022 modernizes the framework.\n\nFor the exam, know there are FIVE Texas zones, all Lambert, banded north to south, and be able to associate major cities with their zone.',
        bookRefs: [
          { book: 'NGS State Plane Documentation', chapter: 'Texas Zones 4201–4205', topic: 'Texas SPC zone definitions' },
        ],
      },
      {
        id: 'tx-d4-s3',
        type: 'concept',
        title: 'The Texas Coordinate System in Statute',
        content: 'The Texas Coordinate System is defined in the Texas Natural Resources Code (Chapter 21, Subchapter C). The statute formally adopts the State Plane Coordinate System for Texas, names the five zones, and assigns each county to a zone. It also specifies that coordinates alone do not by themselves define a boundary — a coordinate-described corner must still be tied to monuments and the record.\n\nKey statutory points:\n• The five named zones (North, North Central, Central, South Central, South).\n• Each county is statutorily assigned to a zone.\n• When a survey uses the Texas Coordinate System, the zone and datum must be stated.\n• Coordinates are a tool for relocating monuments, not a substitute for them.\n\nThis statutory grounding is Texas-specific: the legislature has codified the coordinate system and the county-to-zone assignments.',
        bookRefs: [
          { book: 'Texas Natural Resources Code', chapter: 'Ch. 21, Subchapter C', topic: 'Texas Coordinate System statute' },
        ],
      },
      {
        id: 'tx-d4-s4',
        type: 'concept',
        title: 'Grid, Ground, and the Combined Factor in Texas',
        content: 'Because Texas has substantial elevation range — from sea level on the Gulf coast to over 4,000 ft in the west (and higher in the Guadalupe Mountains) — the elevation factor matters significantly in west Texas work.\n\nRecall the conversions (same as the national SPC reading):\n• Scale Factor (SF): grid-to-ellipsoid distortion from the Lambert projection (typically 0.9999–1.0001 within a Texas zone).\n• Elevation Factor (EF) = R / (R + H): reduces ground distance to the ellipsoid. In high west-Texas elevations, EF departs noticeably from 1.\n• Combined Factor (CF) = SF × EF: converts between grid and ground.\n\nGround distance = Grid distance / CF. In high-elevation Central or North zone work, neglecting the elevation factor introduces meaningful error over long lines, so Texas surveyors must apply CF carefully. On the low-elevation Gulf coast, EF is very close to 1.',
      },
      {
        id: 'tx-d4-s5',
        type: 'knowledge_check',
        title: 'Check: Texas Zones',
        knowledgeCheck: {
          question: 'Which projection do ALL Texas State Plane zones use, and how many zones are there?',
          options: [
            'Transverse Mercator; 3 zones',
            'Lambert Conformal Conic; 5 zones',
            'Lambert Conformal Conic; 3 zones',
            'Transverse Mercator; 5 zones',
          ],
          correctIndex: 1,
          explanation: 'All five Texas State Plane zones (North, North Central, Central, South Central, South) use the Lambert Conformal Conic projection because each zone is wider east-west than it is tall north-south.',
        },
      },
      {
        id: 'tx-d4-s6',
        type: 'exam_tips',
        title: 'Exam Tips: Texas SPC',
        examTips: [
          'FIVE Texas zones, ALL Lambert Conformal Conic, banded north to south (4201 North → 4205 South).',
          'Associate cities: Amarillo=North, DFW=North Central, Austin/El Paso=Central, San Antonio/Houston=South Central, Brownsville=South.',
          'The Texas Coordinate System is codified in the Natural Resources Code Ch. 21, with each county assigned to a zone.',
          'Coordinates relocate monuments — they do not replace them as the boundary.',
          'West Texas high elevation → elevation factor matters; apply the Combined Factor for grid/ground conversion.',
        ],
      },
    ],
  },

  // ─── Domain 5: Texas Survey Units & History ───
  {
    id: 'tx-d5-units-history',
    examTrack: 'tx',
    domainNumber: 5,
    domain: 'Texas Survey Units & History',
    title: 'Texas Survey Heritage: Empresarios, Headrights, and the Vara System',
    description: 'Texas surveying history is unique among the states. This reading covers the empresario colonization system, headright grants, the role of the original surveyors, and the measurement units (vara, labor, league) that define legacy Texas surveys you will retrace today.',
    estimatedMinutes: 18,
    sections: [
      {
        id: 'tx-d5-s1',
        type: 'concept',
        title: 'The Empresario System',
        content: 'Under Mexican rule (1821–1836), Texas land was settled through the empresario system. An empresario (such as Stephen F. Austin) contracted with the Mexican government to bring in a set number of settlers, in exchange for the right to receive land and to administer grants within a colony.\n\nKey features:\n• Empresarios recruited colonists and oversaw the surveying and granting of land within their colony.\n• Settlers received headright grants based on their status (see next section).\n• Each colony kept records of grants, surveys, and field notes, many of which passed to the GLO.\n\nThis system explains why so many original Texas surveys date to the 1820s–1830s and why the original field notes (often in Spanish, using varas) are central to modern retracement. Austin\'s colony is the most famous, but several empresario grants shaped the land pattern of east and central Texas.',
      },
      {
        id: 'tx-d5-s2',
        type: 'concept',
        title: 'Headright Grants',
        content: 'A headright was a grant of land given to settlers to encourage colonization. The amount depended on the era and the settler\'s status:\n\n• Under Mexican colonization law, a married man (head of a family) could receive a "league and labor" (one league of grazing land + one labor of farming land ≈ 4,605 acres). A single man typically received one-quarter to one-third as much.\n\n• The Republic of Texas (1836–1845) issued headrights in classes tied to arrival date:\n  – First Class (arrived before March 1836): up to a league and labor for heads of families.\n  – Second, Third, and Fourth Class headrights granted progressively smaller acreages to later arrivals.\n\nHeadright grants are why original Texas surveys come in characteristic sizes (leagues, labors, fractions). Recognizing a "league and labor" headright (≈ 4,605 ac) or a typical labor (≈ 177 ac) helps you sanity-check a retracement.',
      },
      {
        id: 'tx-d5-s3',
        type: 'concept',
        title: 'The Original Surveyors and Their Field Notes',
        content: 'The original surveyors of Texas worked under district surveyors and the empresario/Republic systems. Their field notes — the calls for bearing, distance (in varas), and monuments — are the primary record of the original survey.\n\nFor the modern surveyor, the governing principle is to follow the footsteps of the original surveyor: re-establish the boundary where the original surveyor actually ran it, using the best available evidence of the original work. This means:\n• Locating original monuments called for in the field notes.\n• Honoring natural and artificial monuments over computed course and distance.\n• Treating the GLO field notes as primary evidence of the original survey.\n\nOriginal Texas field notes frequently contain magnetic bearings (subject to declination change over ~two centuries) and vara distances, so retracement requires careful correction and interpretation.',
        bookRefs: [
          { book: 'GLO Archives', chapter: 'Original Surveyor Field Notes', topic: 'Primary evidence in Texas retracement' },
        ],
      },
      {
        id: 'tx-d5-s4',
        type: 'formula',
        title: 'Texas Unit Summary',
        formula: {
          expression: '1 vara = 33 1/3 in = 2.77778 ft\n1 labor = 1,000,000 sq varas ≈ 177.1 acres\n1 league = 25 labores ≈ 4,428.4 acres\nLeague and labor ≈ 4,605 acres',
          variables: [
            { symbol: 'vara', description: 'Texas linear unit, 33 1/3 inches (2.77778 ft)' },
            { symbol: 'labor', description: 'Farming-land area unit, 1000 varas square ≈ 177.1 ac' },
            { symbol: 'league', description: 'Grazing-land area unit, 5000 varas square ≈ 4,428.4 ac' },
            { symbol: 'league and labor', description: 'Common married-settler headright ≈ 4,605 ac (one league + one labor)' },
          ],
          whenToUse: 'Use to interpret and sanity-check legacy Texas grant sizes during retracement. Recognizing standard headright acreages helps confirm you have correctly identified an original survey.',
        },
      },
      {
        id: 'tx-d5-s5',
        type: 'knowledge_check',
        title: 'Check: Headrights',
        knowledgeCheck: {
          question: 'Approximately how many acres is a "league and labor" — the common headright granted to a married head of family under Mexican colonization law?',
          options: [
            '177 acres',
            '640 acres',
            '4,605 acres',
            '25,000 acres',
          ],
          correctIndex: 2,
          explanation: 'A league (≈ 4,428.4 ac) plus a labor (≈ 177.1 ac) ≈ 4,605 acres. This was the standard headright for a married head of family. A single man received a smaller fraction.',
        },
      },
      {
        id: 'tx-d5-s6',
        type: 'exam_tips',
        title: 'Exam Tips: Units & History',
        examTips: [
          'Empresario system (Mexican era) + Republic headright classes explain Texas\'s grant pattern and sizes.',
          'Vara (2.77778 ft), labor (≈177 ac), league (≈4,428 ac), league and labor (≈4,605 ac) — memorize all four.',
          'Follow the footsteps of the original surveyor; GLO field notes are primary evidence.',
          'Original field notes use varas and magnetic bearings — correct for declination over ~two centuries.',
          'A single man\'s headright was a fraction (commonly 1/3 to 1/4) of a married head of family\'s grant.',
        ],
      },
    ],
  },

  // ─── Domain 6: Texas Professional Practice ───
  {
    id: 'tx-d6-professional-practice',
    examTrack: 'tx',
    domainNumber: 6,
    domain: 'Texas Professional Practice',
    title: 'Texas Professional Practice: TSPS Standards, Plats, and Recording',
    description: 'This reading covers the day-to-day professional practice rules in Texas: the TSPS Manual of Practice and category land surveys, the Professional Land Surveying Practices Act, monumentation requirements, plat and recording procedures, and TxDOT right-of-way conventions.',
    estimatedMinutes: 20,
    sections: [
      {
        id: 'tx-d6-s1',
        type: 'concept',
        title: 'The TSPS Manual of Practice',
        content: 'The Texas Society of Professional Surveyors (TSPS) publishes the Manual of Practice for Land Surveying in Texas. While TSPS is a professional society (not the licensing board), its Manual of Practice defines widely used categories of land surveys and the standards each must meet. Texas surveyors routinely reference the TSPS categories when scoping and certifying work.\n\nThe Manual organizes surveys into Categories (commonly numbered), such as:\n• Category 1A/1B — Land Title Surveys (often used for ALTA/NSPS-type work and boundary surveys for title purposes).\n• Category 5 — Construction surveys.\n• Category 6 — Topographic surveys.\n\nEach category specifies the required research, fieldwork, monumentation, accuracy, and deliverables. Knowing that TSPS sets these category standards — and that they are voluntary best-practice standards distinct from the Board\'s mandatory rules — is a frequent exam point.',
        bookRefs: [
          { book: 'TSPS Manual of Practice', chapter: 'Categories of Land Surveys', topic: 'Texas survey categories and standards' },
        ],
      },
      {
        id: 'tx-d6-s2',
        type: 'concept',
        title: 'The Practices Act and the General Rules',
        content: 'The Professional Land Surveying Practices Act (Texas Occupations Code, Chapter 1071) is the statute governing surveying practice in Texas. It defines the practice of land surveying, requires licensure, creates the Board\'s authority, and establishes penalties for unlicensed practice.\n\nThe Board\'s General Rules of Procedures and Practices (22 TAC) implement the Act and set the mandatory standards for performing and recording surveys. Among the requirements:\n• A survey must be based on adequate research of the record and field evidence.\n• The surveyor must monument the corners and prepare a plat and/or description.\n• The plat and description must be signed, sealed, and dated by the responsible RPLS.\n• The survey must meet minimum standards for boundary determination.\n\nDistinguish the mandatory Practices Act + Board rules from the voluntary TSPS Manual. The Act and Board rules are law; the TSPS Manual is professional best practice (though widely followed and often referenced in contracts).',
        bookRefs: [
          { book: 'Texas Occupations Code', chapter: 'Ch. 1071', topic: 'Professional Land Surveying Practices Act' },
        ],
      },
      {
        id: 'tx-d6-s3',
        type: 'concept',
        title: 'Monumentation and the Survey Plat',
        content: 'Texas Board rules require that boundary corners be monumented and that the survey be documented with a plat and/or metes-and-bounds description.\n\nGood Texas practice and the rules require:\n• Setting durable monuments (typically iron rods with a cap identifying the surveyor/firm) at corners that can be set.\n• Referencing the basis of bearing (e.g., Texas Coordinate System zone and datum, or a stated record bearing).\n• Showing record vs. measured calls and resolving conflicts.\n• A surveyor\'s certification, signature, seal, and date.\n\nThe plat must clearly identify the surveyed tract, adjoiners, monuments found and set, and the basis of bearings. A metes-and-bounds description "ties" the tract to an identifiable starting monument (the point of beginning) and closes the traverse back to it.',
      },
      {
        id: 'tx-d6-s4',
        type: 'concept',
        title: 'Plats, Recording, and Subdivision',
        content: 'Recording and subdivision in Texas involve both the county and (often) a municipality:\n\n• Subdivision plats are typically reviewed and approved by the local authority — the city (within its limits and extraterritorial jurisdiction, ETJ) and/or the county commissioners court.\n• Approved plats are recorded with the County Clerk in the official plat/map records of the county.\n• Deeds and metes-and-bounds descriptions are recorded in the county\'s real property records.\n• The Local Government Code governs platting requirements, including the need to plat before selling lots in many circumstances.\n\nThe County Clerk is the recording office. A surveyor must understand which authority approves a plat (city/ETJ vs. county) and that recording perfects the public record of the subdivision. Texas also regulates platting in the ETJ — a city\'s authority can extend beyond its limits.',
        bookRefs: [
          { book: 'Texas Local Government Code', chapter: 'Subdivision/Platting', topic: 'Plat approval and recording' },
        ],
      },
      {
        id: 'tx-d6-s5',
        type: 'concept',
        title: 'TxDOT Right-of-Way Conventions',
        content: 'Surveyors frequently work along state highways, where the Texas Department of Transportation (TxDOT) maintains right-of-way (ROW). Key points:\n\n• TxDOT publishes ROW maps and uses its own monumentation and station-based referencing (centerline stationing with offsets).\n• Existing ROW is often defined by the original acquisition deeds and the ROW map; the surveyor must research these to locate the ROW line.\n• Highway ROW corners and TxDOT monuments are controlling evidence along the highway.\n• Access (driveway permits) and setbacks may be governed by TxDOT rules along state ROW.\n\nWhen retracing or tying to a highway, locate the TxDOT ROW map and original acquisition documents, and honor found TxDOT monuments. This is a common practical Texas scenario.',
      },
      {
        id: 'tx-d6-s6',
        type: 'knowledge_check',
        title: 'Check: Standards vs. Rules',
        knowledgeCheck: {
          question: 'Which statement correctly distinguishes the TSPS Manual of Practice from the TBPELS Board rules?',
          options: [
            'Both are mandatory law enforced by the Board',
            'The TSPS Manual is mandatory law; the Board rules are voluntary',
            'The TSPS Manual is voluntary professional best practice; the Board rules are mandatory law',
            'Neither has any legal or professional weight',
          ],
          correctIndex: 2,
          explanation: 'The TSPS Manual of Practice sets voluntary professional categories and best-practice standards (widely followed, often referenced in contracts). The TBPELS Board rules (22 TAC), implementing the Practices Act, are mandatory law.',
        },
      },
      {
        id: 'tx-d6-s7',
        type: 'exam_tips',
        title: 'Exam Tips: Professional Practice',
        examTips: [
          'TSPS Manual of Practice = voluntary categories/standards (Cat 1A/1B title surveys, etc.). Board rules (22 TAC) = mandatory law.',
          'The Practices Act = Texas Occupations Code Ch. 1071; it requires licensure and defines the practice.',
          'Plats are approved by city/ETJ and/or county commissioners court, then RECORDED with the County Clerk.',
          'A city\'s platting authority can extend into its ETJ (extraterritorial jurisdiction).',
          'Along highways, research the TxDOT ROW map + acquisition deeds and honor found TxDOT monuments.',
          'Every plat/description must be signed, sealed, and dated by the responsible RPLS.',
        ],
      },
    ],
  },
];
