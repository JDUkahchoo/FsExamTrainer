import type { Flashcard } from '../schema';

// Texas (State-Specific) Exam Flashcards
export const TX_FLASHCARDS: Omit<Flashcard, 'id'>[] = [
  // ─── Domain 1: TBPELS Licensing & Rules ───
  {
    domain: 'TBPELS Licensing & Rules',
    front: 'Who regulates land surveying in Texas?',
    back: 'The Texas Board of Professional Engineers and Land Surveyors (TBPELS).\n\nFormed in 2019 by merging the engineering board with the former Texas Board of Professional Land Surveying (TBPLS). Adopts rules in 22 TAC, Part 6.',
    category: 'definition',
    examTrack: 'tx',
  },
  {
    domain: 'TBPELS Licensing & Rules',
    front: 'What are the three main Texas surveying credentials?',
    back: '• SIT — Surveyor-in-Training (passed FS exam; entry credential)\n• RPLS — Registered Professional Land Surveyor (full private practice license)\n• LSLS — Licensed State Land Surveyor (additional license for state/GLO land; must first be RPLS)',
    category: 'definition',
    examTrack: 'tx',
  },
  {
    domain: 'TBPELS Licensing & Rules',
    front: 'What license is required to survey Texas state/public land?',
    back: 'Licensed State Land Surveyor (LSLS).\n\nRequired for land in which the State of Texas has an interest, administered by the General Land Office (GLO). An LSLS must already be an RPLS. Unique to Texas.',
    category: 'concept',
    examTrack: 'tx',
  },
  {
    domain: 'TBPELS Licensing & Rules',
    front: 'Texas RPLS continuing education (CEP) requirement?',
    back: '16 CEP hours per (annual) renewal period, including a required ethics/rules-of-professional-conduct component.\n\nRetain documentation for possible audit. Verify current exact amounts in 22 TAC at renewal.',
    category: 'concept',
    examTrack: 'tx',
  },
  {
    domain: 'TBPELS Licensing & Rules',
    front: 'A surveyor\'s paramount professional duty is to...?',
    back: 'Protect the public health, safety, and welfare.\n\nOther duties: practice only within competence, be truthful, disclose conflicts of interest, and seal only work performed under direct supervision.',
    category: 'concept',
    examTrack: 'tx',
  },

  // ─── Domain 2: Texas Boundary Law & GLO Surveys ───
  {
    domain: 'Texas Boundary Law & GLO Surveys',
    front: 'Does Texas use the Public Land Survey System (PLSS)?',
    back: 'No. Texas retained its public lands when it joined the U.S. in 1845, so it was NEVER subdivided into the township/range/section PLSS grid.\n\nTexas land traces to Spanish, Mexican, Republic, and State grants by metes and bounds.',
    category: 'concept',
    examTrack: 'tx',
  },
  {
    domain: 'Texas Boundary Law & GLO Surveys',
    front: 'What is the General Land Office (GLO)?',
    back: 'The oldest Texas state agency (est. 1836). Manages state lands and is the official archive of original land-grant field notes, sketches, and patents.\n\nGLO records are PRIMARY evidence in Texas retracement.',
    category: 'definition',
    examTrack: 'tx',
  },
  {
    domain: 'Texas Boundary Law & GLO Surveys',
    front: 'Texas vara conversion?',
    back: '1 Texas vara = 33 1/3 inches = 2.77778 ft\n\nFeet = varas × 2.77778\nVaras = feet ÷ 2.77778\n\nDo NOT confuse with the California vara (33 in).',
    category: 'formula',
    examTrack: 'tx',
  },
  {
    domain: 'Texas Boundary Law & GLO Surveys',
    front: 'Texas labor and league areas?',
    back: '• 1 labor = 1,000,000 sq varas ≈ 177.1 acres (1000 varas square; farming land)\n• 1 league = 25 labores = 25,000,000 sq varas ≈ 4,428.4 acres (5000 varas square; grazing land)\n• League and labor ≈ 4,605 acres',
    category: 'formula',
    examTrack: 'tx',
  },
  {
    domain: 'Texas Boundary Law & GLO Surveys',
    front: 'What is the rule of senior rights?',
    back: 'When original grants conflict, the OLDER (senior) grant holds its full called acreage; the newer (junior) grant yields and absorbs any overlap/shortage.\n\nUngranted land left over = a "vacancy" (may be state land).',
    category: 'concept',
    examTrack: 'tx',
  },
  {
    domain: 'Texas Boundary Law & GLO Surveys',
    front: 'Order of dignity of calls in retracement?',
    back: '1. Natural monuments (rivers, trees)\n2. Artificial monuments (rods, original corners)\n3. Adjoinder (call for adjacent survey)\n4. Course (bearing)\n5. Distance\n6. Quantity (area) — lowest\n\nFollow the footsteps of the original surveyor.',
    category: 'concept',
    examTrack: 'tx',
  },

  // ─── Domain 3: Texas Water Law ───
  {
    domain: 'Texas Water Law',
    front: 'What is the gradient boundary?',
    back: 'The Texas boundary between private upland and a state-owned NAVIGABLE streambed.\n\nLocated at the gradient of the cut bank — midway between the water level that just reaches the bank and the level that just fails to overtop it. From the Motl v. Boyd / Red River line of cases.',
    category: 'concept',
    examTrack: 'tx',
  },
  {
    domain: 'Texas Water Law',
    front: 'Texas 30-foot rule for navigability?',
    back: 'A stream is "navigable in law" if it averages 30 ft or more in width (between banks) from the mouth up.\n\n• Navigable → state owns the bed; upland boundary = gradient boundary.\n• Non-navigable → private bed; boundary = centerline (thread).',
    category: 'concept',
    examTrack: 'tx',
  },
  {
    domain: 'Texas Water Law',
    front: 'Texas surface water vs. groundwater rights?',
    back: '• Surface water: hybrid — vested riparian rights + prior appropriation (permits via TCEQ). State owns surface water.\n• Groundwater: RULE OF CAPTURE — pump beneath your land, subject to groundwater conservation district regulation.',
    category: 'concept',
    examTrack: 'tx',
  },
  {
    domain: 'Texas Water Law',
    front: 'How far offshore does the Texas Gulf boundary extend?',
    back: '3 marine leagues ≈ 10.35 statute miles.\n\nA result of Texas\'s history as an independent republic. The state owns submerged tidelands seaward of the tidal boundary line.',
    category: 'concept',
    examTrack: 'tx',
  },
  {
    domain: 'Texas Water Law',
    front: 'Tidal boundary for Spanish/Mexican grants (Luttes v. State)?',
    back: 'Mean Higher High Water (MHHW) — the higher line.\n\nAnglo-American common law grants use Mean High Water (MHW). Texas applies the line appropriate to the grant\'s origin; Luttes set the higher line for Spanish/Mexican grants.',
    category: 'concept',
    examTrack: 'tx',
  },

  // ─── Domain 4: Texas State Plane Zones ───
  {
    domain: 'Texas State Plane Zones',
    front: 'How many Texas State Plane zones, and what projection?',
    back: 'FIVE zones, ALL using the Lambert Conformal Conic projection.\n\nEach zone is wider east-west than tall north-south → Lambert. Banded north to south: North, North Central, Central, South Central, South.',
    category: 'concept',
    examTrack: 'tx',
  },
  {
    domain: 'Texas State Plane Zones',
    front: 'Name the five Texas SPC zones (north to south).',
    back: '1. North (4201) — Panhandle/Amarillo\n2. North Central (4202) — DFW\n3. Central (4203) — Austin, El Paso\n4. South Central (4204) — San Antonio, Houston\n5. South (4205) — Corpus Christi, Brownsville',
    category: 'definition',
    examTrack: 'tx',
  },
  {
    domain: 'Texas State Plane Zones',
    front: 'Where is the Texas Coordinate System defined?',
    back: 'Texas Natural Resources Code, Chapter 21, Subchapter C.\n\nIt names the five zones and statutorily assigns each county to a zone. Coordinates relocate monuments — they do not replace them as the boundary.',
    category: 'definition',
    examTrack: 'tx',
  },
  {
    domain: 'Texas State Plane Zones',
    front: 'Combined Factor for grid/ground in Texas?',
    back: 'CF = SF × EF\n• SF = scale factor (Lambert grid distortion)\n• EF = R/(R+H) elevation factor\n\nGround = Grid / CF.\nWest Texas high elevation → EF matters; Gulf coast EF ≈ 1.',
    category: 'formula',
    examTrack: 'tx',
  },

  // ─── Domain 5: Texas Survey Units & History ───
  {
    domain: 'Texas Survey Units & History',
    front: 'What was the empresario system?',
    back: 'Under Mexican rule (1821–1836), empresarios (e.g., Stephen F. Austin) contracted to bring settlers to Texas in exchange for land and authority to administer grants within a colony.\n\nExplains the 1820s–30s original surveys and Spanish/vara field notes.',
    category: 'concept',
    examTrack: 'tx',
  },
  {
    domain: 'Texas Survey Units & History',
    front: 'What is a "league and labor" headright?',
    back: 'The standard grant to a married head of family under Mexican colonization law:\n1 league (grazing ≈ 4,428 ac) + 1 labor (farming ≈ 177 ac) ≈ 4,605 acres.\n\nA single man received a fraction (commonly ~1/3).',
    category: 'definition',
    examTrack: 'tx',
  },
  {
    domain: 'Texas Survey Units & History',
    front: 'Republic of Texas headright classes?',
    back: 'Tied to arrival date:\n• First Class (before Mar 1836) — up to a league and labor\n• Second/Third/Fourth Class — progressively smaller acreages for later arrivals',
    category: 'concept',
    examTrack: 'tx',
  },
  {
    domain: 'Texas Survey Units & History',
    front: 'Governing principle when retracing an original Texas survey?',
    back: 'Follow the footsteps of the original surveyor.\n\nRe-establish the line where it was actually run, using best evidence: original monuments and GLO field notes control over computed course/distance. Correct old magnetic bearings for declination.',
    category: 'concept',
    examTrack: 'tx',
  },

  // ─── Domain 6: Texas Professional Practice ───
  {
    domain: 'Texas Professional Practice',
    front: 'TSPS Manual of Practice vs. TBPELS Board rules?',
    back: '• TSPS Manual of Practice — VOLUNTARY professional categories/standards (Cat 1A/1B title surveys, etc.); widely followed, often in contracts.\n• TBPELS Board rules (22 TAC) — MANDATORY law implementing the Practices Act.',
    category: 'concept',
    examTrack: 'tx',
  },
  {
    domain: 'Texas Professional Practice',
    front: 'What is the Professional Land Surveying Practices Act?',
    back: 'Texas Occupations Code, Chapter 1071.\n\nDefines the practice of land surveying, requires licensure, empowers the Board, and sets penalties for unlicensed practice.',
    category: 'definition',
    examTrack: 'tx',
  },
  {
    domain: 'Texas Professional Practice',
    front: 'Where are subdivision plats approved and recorded in Texas?',
    back: 'Approved by the city (within limits and ETJ) and/or the county commissioners court; then RECORDED with the County Clerk in the county plat/map records.\n\nA city\'s platting authority can extend into its ETJ.',
    category: 'concept',
    examTrack: 'tx',
  },
  {
    domain: 'Texas Professional Practice',
    front: 'What must appear on a Texas survey plat/description?',
    back: 'Signed, sealed, and dated certification by the responsible RPLS; basis of bearings (e.g., Texas Coordinate System zone/datum); monuments found and set; adjoiners; record vs. measured calls; point of beginning.',
    category: 'concept',
    examTrack: 'tx',
  },
  {
    domain: 'Texas Professional Practice',
    front: 'Working along a state highway — what controls the ROW?',
    back: 'TxDOT right-of-way maps and the original acquisition deeds. Honor found TxDOT monuments; TxDOT uses centerline stationing with offsets.\n\nResearch the ROW map + acquisition documents before tying to the highway.',
    category: 'concept',
    examTrack: 'tx',
  },
];
