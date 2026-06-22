import type { ExamQuestion } from './examQuestions';

// Texas (State-Specific) Practice Exam Questions
export const TX_EXAM_QUESTIONS: ExamQuestion[] = [
  // ─── Domain 1: TBPELS Licensing & Rules ───
  {
    domain: 'TBPELS Licensing & Rules',
    question: 'The 2019 consolidation that created TBPELS merged the engineering board with which former entity?',
    options: [
      'The Texas General Land Office',
      'The Texas Board of Professional Land Surveying (TBPLS)',
      'The Texas Society of Professional Surveyors',
      'The Texas Commission on Environmental Quality',
    ],
    correctAnswer: 1,
    explanation: 'TBPELS was formed by merging the engineering board with the former Texas Board of Professional Land Surveying (TBPLS). It now regulates both professions under 22 TAC, Part 6.',
    difficulty: 'medium',
  },
  {
    domain: 'TBPELS Licensing & Rules',
    question: 'Which sequence correctly orders the path to RPLS in Texas?',
    options: [
      'PS exam → FS exam → experience → RPLS',
      'FS exam → SIT → experience → PS exam → Texas state exam → RPLS',
      'Texas state exam → FS exam → PS exam → RPLS',
      'Experience → RPLS → FS exam → PS exam',
    ],
    correctAnswer: 1,
    explanation: 'The path is: pass the FS exam and register as SIT, gain qualifying experience under an RPLS, pass the PS exam, pass the Texas state-specific exam, then apply for RPLS.',
    difficulty: 'medium',
  },
  {
    domain: 'TBPELS Licensing & Rules',
    question: 'An RPLS is asked to seal a boundary survey performed entirely by another firm with no supervision by the RPLS. The RPLS should:',
    options: [
      'Seal it if the fee is paid',
      'Seal it because both are licensed',
      'Decline — a licensee may seal only work performed under their direct supervision',
      'Seal it after a brief phone call with the other firm',
    ],
    correctAnswer: 2,
    explanation: 'Sealing work not performed by the licensee or under their direct supervision violates the rules of professional conduct. The RPLS must decline.',
    difficulty: 'medium',
  },

  // ─── Domain 2: Texas Boundary Law & GLO Surveys ───
  {
    domain: 'Texas Boundary Law & GLO Surveys',
    question: 'Convert 3,600 varas to US survey feet.',
    options: [
      '9,000 ft',
      '10,000 ft',
      '11,000 ft',
      '12,000 ft',
    ],
    correctAnswer: 1,
    explanation: '3,600 varas × 2.77778 ft/vara = 10,000 ft. The Texas vara equals 33 1/3 inches = 2.77778 ft.',
    difficulty: 'easy',
  },
  {
    domain: 'Texas Boundary Law & GLO Surveys',
    question: 'A square labor is 1,000 varas on a side. Its area is approximately:',
    options: [
      '44 acres',
      '177 acres',
      '640 acres',
      '4,428 acres',
    ],
    correctAnswer: 1,
    explanation: '1,000 × 1,000 = 1,000,000 sq varas. Converting: 1,000,000 × (2.77778)² / 43,560 ≈ 177.1 acres.',
    difficulty: 'medium',
  },
  {
    domain: 'Texas Boundary Law & GLO Surveys',
    question: 'Land that was never included in any valid grant and remains the State\'s is called a:',
    options: [
      'Vacancy',
      'Gore',
      'Riparian strip',
      'Headright',
    ],
    correctAnswer: 0,
    explanation: 'A vacancy is land never included in any valid grant; it may remain state land subject to the GLO. This differs from an overlap, where senior rights award the disputed area to the older grant.',
    difficulty: 'medium',
  },
  {
    domain: 'Texas Boundary Law & GLO Surveys',
    question: 'During retracement, a called artificial monument (an original marked corner) conflicts with a called distance. Which controls?',
    options: [
      'The distance',
      'The artificial monument',
      'The quantity (area)',
      'Whichever yields the larger tract',
    ],
    correctAnswer: 1,
    explanation: 'In the order of dignity of calls, monuments (natural then artificial) control over course, distance, and quantity. The original marked corner best reflects where the surveyor actually ran the line.',
    difficulty: 'medium',
  },

  // ─── Domain 3: Texas Water Law ───
  {
    domain: 'Texas Water Law',
    question: 'A stream averages 22 feet in width between its banks from the mouth up. Under Texas law, the streambed is:',
    options: [
      'State-owned (navigable)',
      'Privately owned (non-navigable), with the boundary at the centerline',
      'Owned by the adjacent city',
      'Federal land',
    ],
    correctAnswer: 1,
    explanation: 'At 22 ft average width (under 30 ft), the stream is non-navigable, so the bed is privately owned and the boundary is the center (thread) of the stream.',
    difficulty: 'medium',
  },
  {
    domain: 'Texas Water Law',
    question: 'The gradient boundary doctrine in Texas applies to:',
    options: [
      'All streams regardless of size',
      'Navigable streams where the State owns the bed',
      'Only tidal waters on the Gulf coast',
      'Only man-made canals',
    ],
    correctAnswer: 1,
    explanation: 'The gradient boundary locates the line between private upland and a state-owned NAVIGABLE streambed, at the gradient of the cut bank. Non-navigable streams use the centerline instead.',
    difficulty: 'medium',
  },
  {
    domain: 'Texas Water Law',
    question: 'Per Luttes v. State, the upland boundary for a Spanish/Mexican coastal grant is the:',
    options: [
      'Mean low water line',
      'Mean high water (MHW) line',
      'Mean higher high water (MHHW) line',
      'Line of vegetation',
    ],
    correctAnswer: 2,
    explanation: 'Luttes v. State held that Spanish/Mexican coastal grants are bounded by the higher line — mean higher high water (MHHW). Anglo-American common-law grants use mean high water (MHW).',
    difficulty: 'hard',
  },

  // ─── Domain 4: Texas State Plane Zones ───
  {
    domain: 'Texas State Plane Zones',
    question: 'A surveyor works in San Antonio. Which Texas State Plane zone applies?',
    options: [
      'Central Zone',
      'South Central Zone',
      'South Zone',
      'North Central Zone',
    ],
    correctAnswer: 1,
    explanation: 'San Antonio (and Houston) fall in the South Central Zone (FIPS 4204). All Texas zones use the Lambert Conformal Conic projection.',
    difficulty: 'medium',
  },
  {
    domain: 'Texas State Plane Zones',
    question: 'All Texas State Plane zones use the Lambert Conformal Conic projection because each zone is:',
    options: [
      'Taller north-south than wide east-west',
      'Wider east-west than tall north-south',
      'Perfectly square',
      'Located near the equator',
    ],
    correctAnswer: 1,
    explanation: 'Lambert Conformal Conic is chosen for zones elongated east-west. Each Texas zone is a band wider east-west than tall north-south, so all five use Lambert.',
    difficulty: 'easy',
  },
  {
    domain: 'Texas State Plane Zones',
    question: 'A ground distance of 5,000.00 ft is measured where the combined factor is 0.99988. What is the grid distance?',
    options: [
      '4,999.40 ft',
      '5,000.60 ft',
      '4,994.00 ft',
      '5,006.00 ft',
    ],
    correctAnswer: 0,
    explanation: 'Grid = Ground × CF = 5,000.00 × 0.99988 = 4,999.40 ft. (Equivalently Ground = Grid / CF.)',
    difficulty: 'hard',
  },

  // ─── Domain 5: Texas Survey Units & History ───
  {
    domain: 'Texas Survey Units & History',
    question: 'Which best describes a Republic of Texas "First Class" headright?',
    options: [
      'A grant only to surveyors',
      'Up to a league and labor for heads of families who arrived before March 1836',
      'A fixed 640-acre military grant',
      'A grant of state land beneath navigable streams',
    ],
    correctAnswer: 1,
    explanation: 'First Class headrights (arrival before March 1836) granted up to a league and labor (≈ 4,605 ac) to heads of families. Later classes granted progressively less.',
    difficulty: 'medium',
  },
  {
    domain: 'Texas Survey Units & History',
    question: 'The most-tested Texas-specific linear unit, equal to 33 1/3 inches, is the:',
    options: [
      'Chain',
      'Rod',
      'Vara',
      'Labor',
    ],
    correctAnswer: 2,
    explanation: 'The Texas vara = 33 1/3 inches = 2.77778 ft. The labor and league are AREA units. Be careful not to confuse the Texas vara with other states\' varas.',
    difficulty: 'easy',
  },
  {
    domain: 'Texas Survey Units & History',
    question: 'Why are original GLO field notes considered primary evidence in Texas retracement?',
    options: [
      'They are the most recent records available',
      'They are the best record of the original surveyor\'s actual calls, monuments, and bearings',
      'They contain State Plane coordinates',
      'They are required to be recomputed every decade',
    ],
    correctAnswer: 1,
    explanation: 'GLO field notes document the original survey\'s calls, monuments, and bearings — the best evidence of where the original surveyor ran the line, which the retracing surveyor must follow.',
    difficulty: 'medium',
  },

  // ─── Domain 6: Texas Professional Practice ───
  {
    domain: 'Texas Professional Practice',
    question: 'A "Category 1A/1B" survey in the TSPS Manual of Practice refers to a:',
    options: [
      'Construction staking survey',
      'Land title survey',
      'Topographic survey',
      'Route survey',
    ],
    correctAnswer: 1,
    explanation: 'In the TSPS Manual of Practice, Category 1A/1B are land title surveys (often used for ALTA/NSPS-type and boundary-for-title work). The Manual sets voluntary best-practice standards by category.',
    difficulty: 'medium',
  },
  {
    domain: 'Texas Professional Practice',
    question: 'Which document is mandatory law (not voluntary best practice) for Texas surveyors?',
    options: [
      'The TSPS Manual of Practice',
      'The TBPELS Board rules in 22 TAC implementing the Practices Act',
      'The NSPS model standards',
      'A local surveyors\' association handbook',
    ],
    correctAnswer: 1,
    explanation: 'The TBPELS Board rules (22 TAC), implementing the Professional Land Surveying Practices Act, are mandatory law. The TSPS Manual is voluntary professional best practice.',
    difficulty: 'medium',
  },
  {
    domain: 'Texas Professional Practice',
    question: 'A tract lies outside a city\'s limits but within the area where the city can still require platting. This area is the city\'s:',
    options: [
      'State Plane zone',
      'Extraterritorial jurisdiction (ETJ)',
      'River authority district',
      'Commissioners precinct',
    ],
    correctAnswer: 1,
    explanation: 'A city\'s extraterritorial jurisdiction (ETJ) extends platting authority beyond its limits. The surveyor must determine whether a tract is in the city, its ETJ, or unincorporated county for plat approval.',
    difficulty: 'medium',
  },
  {
    domain: 'Texas Professional Practice',
    question: 'When retracing a boundary adjacent to a state highway, the surveyor should FIRST:',
    options: [
      'Hold the contractor\'s stakes as controlling',
      'Research the TxDOT right-of-way map and original acquisition deeds',
      'Assume the ROW is 50 ft each side of centerline',
      'Use only State Plane coordinates with no field evidence',
    ],
    correctAnswer: 1,
    explanation: 'Highway ROW is defined by the TxDOT ROW map and original acquisition documents. Research these first, then locate and honor found TxDOT monuments along the highway.',
    difficulty: 'medium',
  },
];
