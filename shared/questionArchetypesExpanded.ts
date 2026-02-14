interface FillInBlankArchetype {
  type: 'fill_in_blank';
  template: string;
  paramRanges: Record<string, number[]>;
  computeAnswer: (params: Record<string, number>) => string;
  computeExplanation: (params: Record<string, number>, answer: string) => string;
  points: number;
}

interface MultipleChoiceArchetype {
  type: 'multiple_choice';
  questionVariants: string[];
  optionSets: string[][];
  correctAnswers: string[];
  explanationVariants: string[];
  points: number;
}

interface ConceptualFillInBlankArchetype {
  type: 'conceptual_fill_in_blank';
  questionVariants: string[];
  answerVariants: string[];
  explanationVariants: string[];
  points: number;
}

type QuestionArchetype = FillInBlankArchetype | MultipleChoiceArchetype | ConceptualFillInBlankArchetype;

// ============================================================================
// BATCH 1: MATH & COMPUTATION (Domains 0 and 7)
// ============================================================================

export const d0_expanded_archetypes: QuestionArchetype[] = [
  {
    type: 'fill_in_blank',
    template: "Convert {chains} chains to feet. 1 chain = 66 feet. Answer: ___ feet",
    paramRanges: {
      chains: [2, 3, 4, 5, 7, 10]
    },
    computeAnswer: (p) => String(p.chains * 66),
    computeExplanation: (p, ans) => `${p.chains} chains × 66 ft/chain = ${ans} feet. One Gunter's chain equals 66 feet or 4 rods.`,
    points: 10
  },
  {
    type: 'fill_in_blank',
    template: "Convert {rods} rods to feet. 1 rod = 16.5 feet. Answer: ___ feet",
    paramRanges: {
      rods: [4, 6, 8, 10, 12, 16]
    },
    computeAnswer: (p) => String(p.rods * 16.5),
    computeExplanation: (p, ans) => `${p.rods} rods × 16.5 ft/rod = ${ans} feet. A rod (or pole/perch) equals 16.5 feet.`,
    points: 10
  },
  {
    type: 'fill_in_blank',
    template: "A bearing of N {angle}° E is equivalent to what azimuth? Answer: ___ degrees",
    paramRanges: {
      angle: [15, 30, 42, 55, 60, 75]
    },
    computeAnswer: (p) => String(p.angle),
    computeExplanation: (p, ans) => `A bearing of N ${p.angle}° E is measured ${p.angle}° clockwise from north, so the azimuth is ${ans}°.`,
    points: 10
  },
  {
    type: 'fill_in_blank',
    template: "A bearing of S {angle}° W is equivalent to what azimuth? Answer: ___ degrees",
    paramRanges: {
      angle: [20, 30, 35, 45, 60, 72]
    },
    computeAnswer: (p) => String(180 + p.angle),
    computeExplanation: (p, ans) => `S ${p.angle}° W: Start at south (180°) and go west by ${p.angle}°. Azimuth = 180 + ${p.angle} = ${ans}°.`,
    points: 10
  },
  {
    type: 'fill_in_blank',
    template: "Using the average end area method, compute the volume between two stations {dist} ft apart with end areas of {a1} sq ft and {a2} sq ft. Answer: ___ cubic yards (round to nearest whole number)",
    paramRanges: {
      dist: [50, 100],
      a1: [120, 180, 250],
      a2: [150, 200, 300]
    },
    computeAnswer: (p) => String(Math.round(((p.a1 + p.a2) / 2) * p.dist / 27)),
    computeExplanation: (p, ans) => `V = ((A1 + A2)/2) × L = ((${p.a1} + ${p.a2})/2) × ${p.dist} = ${((p.a1 + p.a2) / 2) * p.dist} cu ft ÷ 27 = ${ans} cu yd.`,
    points: 10
  },
  {
    type: 'fill_in_blank',
    template: "For a circular curve with a radius of {R} ft, what is the degree of curve (arc definition)? D = 5729.58/R. Answer: ___ degrees (round to 2 decimals)",
    paramRanges: {
      R: [500, 750, 1000, 1200, 1500, 2000]
    },
    computeAnswer: (p) => (5729.58 / p.R).toFixed(2),
    computeExplanation: (p, ans) => `Degree of curve (arc definition): D = 5729.58 / R = 5729.58 / ${p.R} = ${ans}°.`,
    points: 10
  },
  {
    type: 'fill_in_blank',
    template: "Find the tangent length for a curve with R = {R} ft and deflection angle Δ = {delta}°. T = R × tan(Δ/2). Answer: ___ ft (round to 2 decimals)",
    paramRanges: {
      R: [500, 800, 1000, 1200],
      delta: [20, 30, 40, 60]
    },
    computeAnswer: (p) => (p.R * Math.tan((p.delta / 2) * Math.PI / 180)).toFixed(2),
    computeExplanation: (p, ans) => `T = R × tan(Δ/2) = ${p.R} × tan(${p.delta / 2}°) = ${p.R} × ${Math.tan((p.delta / 2) * Math.PI / 180).toFixed(4)} = ${ans} ft.`,
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "How many links are in one Gunter's chain?",
      "One Gunter's chain contains how many links?",
      "In the Gunter's chain system, how many links make up a full chain?",
      "A surveyor's chain (Gunter's) consists of how many links?",
      "The total number of links in a Gunter's chain is:"
    ],
    optionSets: [
      ["50", "66", "80", "100"],
      ["80", "100", "50", "66"],
      ["100", "80", "66", "50"],
      ["66", "50", "100", "80"],
      ["80", "50", "100", "66"]
    ],
    correctAnswers: ["3", "1", "0", "2", "2"],
    explanationVariants: [
      "A Gunter's chain has 100 links, each 0.66 feet (7.92 inches) long, totaling 66 feet.",
      "One Gunter's chain = 100 links = 66 feet. Each link is 7.92 inches.",
      "100 links make one chain. The chain is 66 feet long, so each link = 0.66 ft.",
      "A Gunter's chain consists of 100 links. Total length = 66 feet.",
      "100 links per chain. 1 link = 7.92 inches = 0.66 feet."
    ],
    points: 10
  }
];

export const d7_expanded_archetypes: QuestionArchetype[] = [
  {
    type: 'fill_in_blank',
    template: "Given measurements: {m1}, {m2}, {m3}, {m4}, {m5} ft. Compute the mean. Answer: ___ ft",
    paramRanges: {
      m1: [100, 200, 300],
      m2: [102, 201, 301],
      m3: [99, 199, 299],
      m4: [101, 200, 302],
      m5: [98, 202, 298]
    },
    computeAnswer: (p) => ((p.m1 + p.m2 + p.m3 + p.m4 + p.m5) / 5).toFixed(1),
    computeExplanation: (p, ans) => `Mean = (${p.m1} + ${p.m2} + ${p.m3} + ${p.m4} + ${p.m5}) / 5 = ${ans} ft.`,
    points: 10
  },
  {
    type: 'fill_in_blank',
    template: "The probable error of a single measurement is computed as PE = 0.6745 × σ. If σ = {sigma} ft, what is PE? Answer: ___ ft (round to 4 decimals)",
    paramRanges: {
      sigma: [2, 3, 4, 5, 6]
    },
    computeAnswer: (p) => (0.6745 * p.sigma).toFixed(4),
    computeExplanation: (p, ans) => `PE = 0.6745 × σ = 0.6745 × ${p.sigma} = ${ans} ft. The probable error defines a 50% probability interval.`,
    points: 10
  },
  {
    type: 'fill_in_blank',
    template: "The standard error of the mean for {n} measurements with standard deviation σ = {sigma} is σ/√n. Answer: ___ (round to 4 decimals)",
    paramRanges: {
      n: [4, 9, 16, 25],
      sigma: [2, 3, 4, 5]
    },
    computeAnswer: (p) => (p.sigma / Math.sqrt(p.n)).toFixed(4),
    computeExplanation: (p, ans) => `Standard error of mean = σ/√n = ${p.sigma}/√${p.n} = ${p.sigma}/${Math.sqrt(p.n)} = ${ans}.`,
    points: 10
  },
  {
    type: 'fill_in_blank',
    template: "Compute the weighted mean of measurements {m1} ft (weight {w1}) and {m2} ft (weight {w2}). Answer: ___ ft (round to 2 decimals)",
    paramRanges: {
      m1: [100, 200, 300, 500],
      w1: [1, 2, 3],
      m2: [102, 201, 303, 502],
      w2: [2, 3, 4]
    },
    computeAnswer: (p) => ((p.m1 * p.w1 + p.m2 * p.w2) / (p.w1 + p.w2)).toFixed(2),
    computeExplanation: (p, ans) => `Weighted mean = (${p.m1}×${p.w1} + ${p.m2}×${p.w2}) / (${p.w1}+${p.w2}) = ${(p.m1 * p.w1 + p.m2 * p.w2)} / ${p.w1 + p.w2} = ${ans} ft.`,
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "In surveying, the method of least squares minimizes:",
      "The least squares adjustment principle seeks to minimize:",
      "Least squares adjustment in surveying minimizes the sum of:",
      "What does the least squares method minimize in survey adjustments?",
      "The objective function in least squares adjustment is to minimize:"
    ],
    optionSets: [
      ["Sum of residuals", "Sum of squared residuals", "Maximum residual", "Sum of absolute residuals"],
      ["Largest error", "Sum of weighted squared residuals", "Mean error", "Number of observations"],
      ["Absolute differences", "Raw residuals", "Squared residuals", "Cubic residuals"],
      ["The number of measurements", "The sum of squared residuals", "The mean of measurements", "The range of measurements"],
      ["Sum of errors", "Maximum deviation", "Sum of squared weighted residuals", "Average deviation"]
    ],
    correctAnswers: ["1", "1", "2", "1", "2"],
    explanationVariants: [
      "Least squares minimizes the sum of the squared residuals (differences between observed and adjusted values).",
      "The least squares principle minimizes Σ(wᵢvᵢ²) where v is the residual and w is the weight.",
      "Least squares minimizes Σv² (sum of squared residuals), providing the most probable values.",
      "The method minimizes the sum of squared residuals to find the best fit adjustment.",
      "Least squares minimizes Σ(wᵢvᵢ²), providing statistically optimal adjusted values."
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "If a distance is measured as 325.47 ft, how many significant figures does it have?",
      "The measurement 1200.0 ft has how many significant figures?",
      "How many significant figures are in the value 0.00456?",
      "The measurement 50.300 m has how many significant figures?",
      "How many significant figures are in 10,050 ft?"
    ],
    optionSets: [
      ["3", "4", "5", "6"],
      ["2", "3", "4", "5"],
      ["3", "4", "5", "6"],
      ["3", "4", "5", "6"],
      ["3", "4", "5", "6"]
    ],
    correctAnswers: ["2", "3", "0", "2", "1"],
    explanationVariants: [
      "325.47 has 5 significant figures: 3, 2, 5, 4, 7. All non-zero digits and zeros between them are significant.",
      "1200.0 has 5 significant figures. The trailing zero after the decimal point is significant.",
      "0.00456 has 3 significant figures (4, 5, 6). Leading zeros are not significant.",
      "50.300 has 5 significant figures. Trailing zeros after a decimal point are significant.",
      "10,050 has 4 significant figures. The zero between 1 and 5 is significant, but trailing zero without decimal is ambiguous (typically 4)."
    ],
    points: 10
  },
  {
    type: 'fill_in_blank',
    template: "If the error in a single measurement is ±{e} mm and {n} measurements of equal precision are summed, what is the propagated error? E = e×√n. Answer: ___ mm (round to 2 decimals)",
    paramRanges: {
      e: [2, 3, 5, 8, 10],
      n: [4, 9, 16, 25]
    },
    computeAnswer: (p) => (p.e * Math.sqrt(p.n)).toFixed(2),
    computeExplanation: (p, ans) => `Error propagation for sum: E = e × √n = ${p.e} × √${p.n} = ${p.e} × ${Math.sqrt(p.n)} = ${ans} mm.`,
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "In surveying, accuracy refers to:",
      "What is the difference between precision and accuracy?",
      "A measurement that is close to the true value is said to be:",
      "Precision in surveying measurements refers to:",
      "Which best describes accuracy in surveying?"
    ],
    optionSets: [
      ["How close repeated measurements are to each other", "How close a measurement is to the true value", "The number of decimal places", "The number of measurements taken"],
      ["Precision is closeness to truth; accuracy is repeatability", "Accuracy is closeness to truth; precision is repeatability", "They mean the same thing", "Neither relates to measurement quality"],
      ["Precise", "Accurate", "Consistent", "Reliable"],
      ["Closeness to the true value", "Degree of refinement in measurement", "Average of all measurements", "Maximum allowable error"],
      ["Repeatability of measurements", "Agreement with the true or accepted value", "Number of significant figures", "Cost of instrumentation"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "Accuracy is the closeness of a measurement to the true (accepted) value. Precision is the repeatability.",
      "Accuracy = closeness to truth. Precision = closeness of repeated measurements to each other (repeatability).",
      "A measurement close to the true value is accurate. Repeated close measurements are precise.",
      "Precision refers to the degree of refinement or repeatability of measurements, not their closeness to truth.",
      "Accuracy is agreement with the true or accepted value; precision is the consistency of repeated measurements."
    ],
    points: 10
  }
];

// ============================================================================
// BATCH 2: BOUNDARY LAW & LEGAL DESCRIPTIONS (Domains 3 and 4)
// ============================================================================

export const d3_expanded_archetypes: QuestionArchetype[] = [
  {
    type: 'multiple_choice',
    questionVariants: [
      "Riparian rights are associated with property that borders:",
      "Which type of water body gives rise to riparian rights?",
      "Riparian rights apply to lands adjacent to:",
      "A landowner with riparian rights owns property along:",
      "Riparian rights are distinct from littoral rights because riparian rights concern:"
    ],
    optionSets: [
      ["Oceans", "Flowing water (streams/rivers)", "Lakes only", "Underground water"],
      ["Oceans and seas", "Rivers and streams", "Ponds only", "Glaciers"],
      ["A navigable lake", "A flowing stream or river", "The ocean shoreline", "An artificial canal only"],
      ["An ocean coastline", "A river or stream", "A man-made reservoir", "A swimming pool"],
      ["Tidal waters", "Non-tidal flowing water", "Groundwater", "Stormwater"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "Riparian rights attach to properties bordering flowing water such as rivers and streams.",
      "Riparian rights arise from ownership of land adjacent to rivers, streams, or other flowing water bodies.",
      "Riparian rights apply to flowing water (streams/rivers). Littoral rights apply to standing bodies of water (lakes/oceans).",
      "Riparian = flowing water (rivers/streams). Littoral = lakes/oceans.",
      "Riparian rights concern flowing, non-tidal water. Littoral rights relate to lakes and oceans."
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "Which of the following is NOT a required element of adverse possession?",
      "Adverse possession requires all of the following EXCEPT:",
      "Which element is NOT part of an adverse possession claim?",
      "To establish adverse possession, a claimant must show all EXCEPT:",
      "Adverse possession does NOT require:"
    ],
    optionSets: [
      ["Open and notorious use", "Payment of property taxes in all states", "Continuous possession", "Hostile claim"],
      ["Exclusive possession", "Written permission from the owner", "Open and notorious", "Continuous for statutory period"],
      ["Hostile and adverse", "Open and notorious", "A recorded deed", "Continuous and uninterrupted"],
      ["Payment of fair market value", "Hostile claim", "Continuous possession", "Open and notorious"],
      ["Open and notorious possession", "Continuous possession", "A survey by a licensed surveyor", "Hostile claim of right"]
    ],
    correctAnswers: ["1", "1", "2", "0", "2"],
    explanationVariants: [
      "Not all states require payment of taxes for adverse possession. The core elements are: hostile, actual, open/notorious, exclusive, and continuous.",
      "Written permission from the owner negates the hostile element. Adverse possession requires the claim to be without the owner's consent.",
      "A recorded deed is not required. Adverse possession requires hostile, actual, open/notorious, exclusive, and continuous possession.",
      "Payment of fair market value is not required. The elements are: hostile, open/notorious, exclusive, continuous, and for the statutory period.",
      "A survey is not a required element. The elements are hostile, open/notorious, continuous, exclusive, and actual possession."
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "A warranty deed provides which level of protection to the grantee?",
      "Which type of deed offers the greatest protection to the buyer?",
      "A general warranty deed guarantees:",
      "The highest level of title protection is provided by:",
      "Which deed contains covenants of seisin, quiet enjoyment, and warranty?"
    ],
    optionSets: [
      ["No protection", "Limited protection", "Full protection with covenants", "Protection only during ownership"],
      ["Quitclaim deed", "Bargain and sale deed", "General warranty deed", "Special warranty deed"],
      ["Only that the grantor has not encumbered the title", "Clear title with full covenants against all defects", "That the property exists", "Only current possession rights"],
      ["Quitclaim deed", "Bargain and sale deed", "Special warranty deed", "General warranty deed"],
      ["Quitclaim deed", "Special warranty deed", "General warranty deed", "Bargain and sale deed"]
    ],
    correctAnswers: ["2", "2", "1", "3", "2"],
    explanationVariants: [
      "A warranty deed includes covenants of seisin, against encumbrances, quiet enjoyment, warranty, and further assurance.",
      "A general warranty deed provides the greatest protection with full covenants covering the entire chain of title.",
      "A general warranty deed guarantees clear title and includes covenants protecting against all defects, even those from prior owners.",
      "The general warranty deed provides the highest level of protection with covenants covering the entire history of the title.",
      "A general warranty deed contains all standard covenants: seisin, against encumbrances, quiet enjoyment, warranty, and further assurance."
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "An easement appurtenant differs from an easement in gross because it:",
      "Which statement is true about an easement appurtenant?",
      "An easement appurtenant requires:",
      "What distinguishes an easement appurtenant from an easement in gross?",
      "An easement appurtenant:"
    ],
    optionSets: [
      ["Benefits a person rather than land", "Runs with the land and benefits a dominant estate", "Expires when the owner dies", "Cannot be inherited"],
      ["It benefits only a specific person", "It requires both a dominant and servient estate", "It cannot be transferred", "It always involves utility companies"],
      ["Only a servient estate", "Only a dominant estate", "Both a dominant and servient estate", "No specific estates"],
      ["An easement in gross requires two parcels", "An easement appurtenant requires two parcels", "They are identical", "An easement in gross runs with the land"],
      ["Is personal to the holder", "Runs with the land upon transfer", "Expires upon sale", "Cannot be recorded"]
    ],
    correctAnswers: ["1", "1", "2", "1", "1"],
    explanationVariants: [
      "An easement appurtenant runs with the land and requires both a dominant (benefited) and servient (burdened) estate.",
      "An easement appurtenant requires both a dominant estate (benefited) and a servient estate (burdened).",
      "An easement appurtenant requires both a dominant and servient estate; an easement in gross benefits a person or entity.",
      "An easement appurtenant requires two parcels (dominant and servient). An easement in gross benefits a person/entity, not a parcel.",
      "An easement appurtenant runs with the land, meaning it transfers automatically when the property is sold."
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "In interpreting a deed, which has the highest priority among calls?",
      "When conflicting elements exist in a legal description, which takes precedence?",
      "The standard priority of calls in a deed is (highest to lowest):",
      "If a deed's bearings conflict with a natural monument, which controls?",
      "In the hierarchy of deed calls, which is given the LEAST weight?"
    ],
    optionSets: [
      ["Distances", "Natural monuments", "Bearings and angles", "Area or quantity"],
      ["Area", "Distance", "Artificial monuments", "Natural monuments"],
      ["Natural monuments, artificial monuments, bearings, distances, area", "Area, distances, bearings, monuments", "Bearings, distances, area, monuments", "Distances, bearings, area, monuments"],
      ["The bearings", "The natural monument", "The computed area", "The distances"],
      ["Natural monuments", "Artificial monuments", "Distances", "Area or quantity"]
    ],
    correctAnswers: ["1", "3", "0", "1", "3"],
    explanationVariants: [
      "Natural monuments (rivers, trees, rock outcrops) have the highest priority in deed interpretation.",
      "Natural monuments take precedence over all other calls when conflicts exist in a legal description.",
      "The standard hierarchy: (1) Natural monuments, (2) Artificial monuments, (3) Bearings/angles, (4) Distances, (5) Area.",
      "Natural monuments control over bearings, distances, and area when conflicts arise.",
      "Area or quantity is given the least weight in the hierarchy of deed calls."
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "The doctrine of acquiescence applies when:",
      "Boundary by acquiescence requires:",
      "Which is a key element of boundary established by acquiescence?",
      "Acquiescence as a boundary principle means:",
      "For acquiescence to establish a boundary, there must be:"
    ],
    optionSets: [
      ["A written agreement exists between neighbors", "Adjoining owners silently accept a boundary line for the statutory period", "A court orders a new boundary", "A surveyor sets new monuments"],
      ["A written contract", "Long-term acceptance of a boundary by adjoining landowners", "Government approval", "A title insurance policy"],
      ["An explicit written agreement", "Mutual recognition and acceptance over the statutory period", "Filing with the county recorder", "A surveyor's certification"],
      ["Neighbors openly agree in writing to a boundary", "Neighbors passively accept a line as the boundary for a sufficient time", "A government survey overrides deed calls", "The boundary is set by a court order"],
      ["A notarized agreement", "Long-standing mutual recognition of a boundary line", "A boundary confirmed by GPS survey", "Title insurance confirmation"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "Acquiescence occurs when adjoining owners mutually and silently accept a boundary line for the statutory period.",
      "Boundary by acquiescence requires long-term (statutory period) acceptance of a line as the boundary by both parties.",
      "The key element is mutual recognition and passive acceptance of a line as the boundary over the statutory period.",
      "Acquiescence means neighbors passively accept a line as their boundary. Over time, this can become legally binding.",
      "Long-standing mutual recognition without objection can establish a legal boundary through acquiescence."
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "The parol evidence rule in property law states that:",
      "Under the parol evidence rule:",
      "Which statement about the parol evidence rule is correct?",
      "The parol evidence rule prevents:",
      "According to the parol evidence rule:"
    ],
    optionSets: [
      ["Oral testimony can always override a written deed", "Oral testimony cannot generally be used to contradict a written instrument", "Written deeds are always invalid", "Surveys override all deeds"],
      ["Prior oral agreements can modify a written deed", "Extrinsic evidence cannot contradict the terms of a written deed", "Deeds must be handwritten", "Surveys must be oral"],
      ["Verbal agreements always supersede written ones", "A written instrument is presumed to contain all terms of the agreement", "Oral evidence is always admissible", "Written deeds can be ignored"],
      ["Written agreements from being modified by later agreements", "Oral or prior written evidence from contradicting a final written agreement", "All oral evidence in any legal proceeding", "Only third-party testimony"],
      ["Oral agreements always take precedence", "A final written agreement cannot be contradicted by prior oral or written evidence", "All evidence must be written", "Court testimony is not admissible"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "The parol evidence rule prevents oral testimony from contradicting terms of a final, written instrument like a deed.",
      "Under this rule, extrinsic (outside) evidence cannot contradict the clear terms of a written deed.",
      "A written instrument is presumed complete; prior or contemporaneous oral agreements cannot contradict its terms.",
      "The rule prevents prior oral or written evidence from modifying or contradicting a final written agreement.",
      "A final written agreement is considered the complete expression of the parties' intent and cannot be contradicted by prior oral evidence."
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "The Statute of Frauds requires which of the following regarding real property transfers?",
      "Under the Statute of Frauds, a contract for the sale of real property must be:",
      "Which is required by the Statute of Frauds for land transactions?",
      "The Statute of Frauds applies to real estate transactions by requiring:",
      "Real property conveyances under the Statute of Frauds must be:"
    ],
    optionSets: [
      ["Only verbal agreement", "A writing signed by the party to be charged", "A handshake agreement", "Approval by a surveyor"],
      ["Oral only", "In writing", "Notarized but not written", "Verbal with two witnesses"],
      ["A verbal contract with witnesses", "A written and signed contract or deed", "Only a handshake", "An emailed agreement"],
      ["Nothing specific", "A written memorandum signed by the party to be charged", "Only oral testimony", "A video recording"],
      ["Verbal with three witnesses", "In writing and signed", "Oral with court approval", "Recorded on video"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "The Statute of Frauds requires contracts for the sale of real property to be in writing and signed by the party to be charged.",
      "Under the Statute of Frauds, real property contracts must be in writing to be enforceable.",
      "The Statute of Frauds requires a written and signed document for the transfer of interests in real property.",
      "A written memorandum signed by the party to be charged is required for real estate transactions under the Statute of Frauds.",
      "The Statute of Frauds mandates that real property conveyances be in writing and signed to be enforceable."
    ],
    points: 10
  }
];

export const d4_expanded_archetypes: QuestionArchetype[] = [
  {
    type: 'multiple_choice',
    questionVariants: [
      "In the PLSS, standard parallels (correction lines) are placed at intervals of:",
      "Standard parallels in the Public Land Survey System are located every:",
      "How far apart are correction lines in the PLSS?",
      "In the rectangular survey system, standard parallels occur at:",
      "The interval between standard parallels (correction lines) in the PLSS is:"
    ],
    optionSets: [
      ["6 miles", "12 miles", "24 miles", "36 miles"],
      ["12 miles", "24 miles", "36 miles", "48 miles"],
      ["6 miles", "12 miles", "24 miles", "48 miles"],
      ["12-mile intervals", "24-mile intervals", "30-mile intervals", "36-mile intervals"],
      ["6 miles", "12 miles", "18 miles", "24 miles"]
    ],
    correctAnswers: ["2", "1", "2", "1", "3"],
    explanationVariants: [
      "Standard parallels (correction lines) are placed at 24-mile intervals north and south of the base line.",
      "In the PLSS, standard parallels are placed every 24 miles to correct for convergence of meridians.",
      "Correction lines are at 24-mile intervals to compensate for the convergence of range lines toward the poles.",
      "Standard parallels are at 24-mile intervals (every 4 townships) to correct for meridian convergence.",
      "The 24-mile interval allows for systematic correction of the convergence of meridians in the PLSS."
    ],
    points: 10
  },
  {
    type: 'fill_in_blank',
    template: "A standard section in the PLSS contains {q} quarter sections. Each quarter section contains ___ acres.",
    paramRanges: {
      q: [4]
    },
    computeAnswer: (p) => "160",
    computeExplanation: (p, ans) => `A section = 640 acres. A quarter section = 640/4 = 160 acres. Quarter sections are NE¼, NW¼, SE¼, SW¼.`,
    points: 10
  },
  {
    type: 'fill_in_blank',
    template: "One Gunter's chain = 66 feet. How many feet are in {chains} chains and {links} links? Answer: ___ feet",
    paramRanges: {
      chains: [1, 2, 3, 5, 10],
      links: [25, 50, 75]
    },
    computeAnswer: (p) => String((p.chains * 66) + (p.links * 0.66)),
    computeExplanation: (p, ans) => `${p.chains} chains × 66 ft = ${p.chains * 66} ft. ${p.links} links × 0.66 ft = ${(p.links * 0.66).toFixed(2)} ft. Total = ${ans} ft.`,
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "In the PLSS, townships are designated by:",
      "A township designation in the rectangular survey system includes:",
      "How are townships identified in the PLSS?",
      "Township identification in the public land survey includes:",
      "The designation T3N, R2W refers to:"
    ],
    optionSets: [
      ["Latitude and longitude", "Township number (north/south) and range number (east/west) from a principal meridian and base line", "Section numbers only", "County and state designations"],
      ["Only a section number", "A township tier and range from the principal meridian and baseline", "GPS coordinates", "Metes and bounds description"],
      ["Metes and bounds", "Township (tier) and range relative to principal meridian and baseline", "Lot and block numbers", "Street addresses"],
      ["Section and lot numbers", "Tier (north/south of baseline) and range (east/west of principal meridian)", "Coordinates only", "Parcel identification numbers"],
      ["3 miles north, 2 miles west of a city", "Township 3 North, Range 2 West of a principal meridian", "Section 3, Range 2", "Latitude 3, Longitude 2"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "Townships are designated by tier (T) north/south of the baseline and range (R) east/west of the principal meridian.",
      "Each township has a tier (north or south of baseline) and range (east or west of the principal meridian).",
      "Townships are identified by their position relative to the baseline (N/S) and principal meridian (E/W).",
      "Tier indicates position north/south of baseline; range indicates position east/west of the principal meridian.",
      "T3N, R2W means Township 3 North (of baseline), Range 2 West (of the principal meridian)."
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "Which type of corner marks the intersection of township and range lines?",
      "A township corner in the PLSS is located at:",
      "The intersection of a township line and a range line is marked by:",
      "Which PLSS corner type is found at the junction of township and range lines?",
      "At the intersection of township and range lines you find:"
    ],
    optionSets: [
      ["Section corner", "Township corner", "Quarter corner", "Meander corner"],
      ["The midpoint of a section line", "The intersection of township and range lines", "Along a river bank", "At a witness point"],
      ["A meander corner", "A quarter-section corner", "A township corner", "A closing corner"],
      ["Quarter corner", "Meander corner", "Section corner", "Township corner"],
      ["A meander corner", "A closing corner", "A township corner", "A witness corner"]
    ],
    correctAnswers: ["1", "1", "2", "3", "2"],
    explanationVariants: [
      "Township corners are established at the intersection of township and range lines in the PLSS.",
      "A township corner marks where township lines and range lines intersect.",
      "Township corners are set at the junction of township and range lines during the original survey.",
      "Township corners are the primary corners at intersections of township and range lines.",
      "Township corners mark the intersections of the east-west township lines and north-south range lines."
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "In BLM Manual proportionate measurement, a single proportion is used when:",
      "Single proportionate measurement is applied when restoring a lost corner on:",
      "When is single proportionate measurement used in the PLSS?",
      "Single proportion is appropriate for restoring lost corners along:",
      "The BLM uses single proportionate measurement to restore a lost corner between:"
    ],
    optionSets: [
      ["A corner at the intersection of two lines", "A corner on a single line between two existing corners", "A corner on a meandered boundary", "Any corner with a witness tree"],
      ["A curved boundary", "A straight line between two known corners", "The intersection of two survey lines", "A riparian boundary"],
      ["When two or more corners are lost simultaneously", "When restoring a corner on a single line between two found corners", "When re-establishing a baseline", "When creating a new subdivision"],
      ["An irregular boundary", "A line between two established corners", "A meander line", "A county boundary"],
      ["A corner at the intersection of 4 sections", "Two corners on the same line", "A closing corner and a standard corner", "Any two monuments"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "Single proportionate measurement restores a lost corner along a single line between two existing (found) corners.",
      "Single proportion places the lost corner on a straight line between two found corners, proportional to the original record distances.",
      "Single proportion is used when a corner lies on one line between two known positions, restoring it proportionally.",
      "The method places the lost corner between two established corners on the same line, in proportion to the original measurements.",
      "Single proportion restores a corner on a single line between two known corners, distributing any discrepancy proportionally."
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "A retracement survey differs from an original survey in that:",
      "The purpose of a retracement survey is to:",
      "In a retracement survey, the surveyor's role is to:",
      "Which statement correctly describes a retracement survey?",
      "A retracement survey:"
    ],
    optionSets: [
      ["It creates new boundaries", "It follows the footsteps of the original surveyor", "It ignores original monuments", "It establishes new corner locations"],
      ["Create new property boundaries", "Re-establish the lines of an existing survey", "Subdivide property into new lots", "Survey land for the first time"],
      ["Create new boundaries as needed", "Follow in the footsteps of the original surveyor", "Disregard original monuments", "Set corners wherever convenient"],
      ["The surveyor creates new lines at will", "The surveyor follows the original surveyor's footsteps", "The surveyor ignores all prior evidence", "The surveyor may relocate boundaries as desired"],
      ["Creates new section lines", "Follows the footsteps of the original surveyor to re-establish boundaries", "Is only performed by government surveyors", "Always results in changed boundary locations"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "A retracement survey follows the footsteps of the original surveyor, re-establishing existing boundaries rather than creating new ones.",
      "The purpose of a retracement is to re-establish the lines and corners of an existing survey, not to create new boundaries.",
      "In a retracement, the surveyor must follow in the footsteps of the original surveyor and recover the original boundary.",
      "A retracement survey re-establishes existing boundaries by following the original surveyor's work and intent.",
      "A retracement survey follows the footsteps of the original surveyor to re-establish previously surveyed boundaries."
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "An original survey in the PLSS context is one that:",
      "What distinguishes an original survey from a dependent resurvey?",
      "An original PLSS survey:",
      "In the context of public lands, an original survey:",
      "Which best describes an original survey in the PLSS?"
    ],
    optionSets: [
      ["Follows existing boundaries", "Creates boundaries for the first time and is legally controlling", "Can be performed by any surveyor", "Overrides prior surveys"],
      ["It re-establishes existing lines", "It creates new boundaries and subdivisions where none existed", "It corrects errors in prior surveys", "It is always done with GPS"],
      ["Re-establishes old lines", "Creates new boundaries that become legally fixed", "Can change existing boundaries", "Is the same as a dependent resurvey"],
      ["Is performed to correct errors", "Establishes new boundaries for previously unsurveyed land", "Follows prior survey monuments", "Is only performed by private surveyors"],
      ["A survey that follows prior monuments", "The first survey that creates and establishes new boundaries", "A survey done with modern equipment", "A survey that updates old measurements"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "An original survey creates boundaries for the first time. Its lines and corners become legally fixed and controlling.",
      "An original survey creates new boundaries where none existed. A dependent resurvey re-establishes lines from a prior survey.",
      "An original survey establishes new, legally fixed boundaries. Once approved, these boundaries control all subsequent surveys.",
      "An original survey establishes boundaries for previously unsurveyed land, creating new legal descriptions.",
      "The original survey is the first survey that creates and fixes boundaries; all subsequent surveys must follow its footsteps."
    ],
    points: 10
  }
];

// ============================================================================
// BATCH 3: SURVEYING INSTRUMENTS & FIELD METHODS (Domains 1 and 2)
// ============================================================================

export const d1_expanded_archetypes: QuestionArchetype[] = [
  {
    type: 'fill_in_blank',
    template: "An EDM measured distance is {dist} ft. The atmospheric correction is +{atm} ft and the prism constant is -{prism} ft. What is the corrected distance? Answer: ___ ft",
    paramRanges: {
      dist: [1000, 1500, 2000, 2500, 3000],
      atm: [2, 3, 4, 5],
      prism: [15, 20, 25, 30]
    },
    computeAnswer: (p) => String(p.dist + p.atm - p.prism),
    computeExplanation: (p, ans) => `Corrected distance = measured + atmospheric - prism constant = ${p.dist} + ${p.atm} - ${p.prism} = ${ans} ft. Note: prism constant is typically in mm; here simplified to ft for calculation.`,
    points: 10
  },
  {
    type: 'fill_in_blank',
    template: "A level circuit has {n} setups. The total misclosure is {misc} ft. Using equal distribution, what is the correction per setup? Answer: ___ ft (round to 4 decimals)",
    paramRanges: {
      n: [4, 5, 6, 8, 10],
      misc: [2, 3, 4, 5, 6]
    },
    computeAnswer: (p) => (p.misc / p.n).toFixed(4),
    computeExplanation: (p, ans) => `Correction per setup = total misclosure / number of setups = ${p.misc} / ${p.n} = ${ans} ft. This correction is applied equally to each setup.`,
    points: 10
  },
  {
    type: 'fill_in_blank',
    template: "In a closed traverse, the latitude misclosure is {latErr} ft and the departure misclosure is {depErr} ft. The total traverse length is {perim} ft. Using the compass rule, what is the correction to the latitude of a course with length {courseLen} ft? Answer: ___ ft (round to 4 decimals)",
    paramRanges: {
      latErr: [2, 3, 4],
      depErr: [1, 2, 3],
      perim: [2000, 3000, 4000],
      courseLen: [400, 500, 600, 800]
    },
    computeAnswer: (p) => (p.latErr * p.courseLen / p.perim).toFixed(4),
    computeExplanation: (p, ans) => `Compass rule: Lat correction = (lat misclosure × course length) / perimeter = (${p.latErr} × ${p.courseLen}) / ${p.perim} = ${ans} ft.`,
    points: 10
  },
  {
    type: 'fill_in_blank',
    template: "Using stadia, the rod intercept is {intercept} ft and the stadia interval factor is 100. The vertical angle is 0°. What is the horizontal distance? Answer: ___ ft",
    paramRanges: {
      intercept: [2, 3, 4, 5, 6]
    },
    computeAnswer: (p) => String(100 * p.intercept),
    computeExplanation: (p, ans) => `For a horizontal line of sight (0° vertical angle): HD = K × s = 100 × ${p.intercept} = ${ans} ft, where K is the stadia interval factor and s is the rod intercept.`,
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "Systematic errors in surveying are characterized by:",
      "Which statement best describes systematic errors?",
      "Systematic errors differ from random errors because they:",
      "A systematic error in surveying measurement:",
      "Which of the following is true about systematic errors?"
    ],
    optionSets: [
      ["They cancel out over many measurements", "They follow a consistent pattern and can be corrected", "They are unpredictable", "They only occur with old equipment"],
      ["They are random in nature", "They follow a predictable pattern", "They cannot be eliminated", "They always increase accuracy"],
      ["Cancel out with repeated measurements", "Follow a fixed pattern and accumulate", "Are always smaller than random errors", "Cannot be detected"],
      ["Is random and unpredictable", "Follows a consistent pattern and can be modeled/corrected", "Cancels out with more measurements", "Is only caused by weather"],
      ["They cancel over many observations", "They are always positive", "They can be modeled and corrected", "They are caused by reading errors"]
    ],
    correctAnswers: ["1", "1", "1", "1", "2"],
    explanationVariants: [
      "Systematic errors follow a consistent pattern (positive or negative bias) and can be corrected once identified.",
      "Systematic errors are predictable and follow a definite pattern, unlike random errors which are unpredictable.",
      "Systematic errors accumulate and do not cancel out. They can be corrected by calibration or applying corrections.",
      "Systematic errors have a consistent pattern and can be modeled (e.g., temperature correction for tapes).",
      "Systematic errors can be modeled and corrected through proper calibration and applying known corrections."
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "The transit rule for traverse adjustment distributes corrections proportional to:",
      "In the transit rule adjustment, latitude corrections are proportional to:",
      "How does the transit rule distribute traverse misclosure?",
      "The transit rule adjusts traverse misclosure based on:",
      "Which describes the transit rule's correction distribution?"
    ],
    optionSets: [
      ["Course length", "Absolute values of latitudes and departures", "Number of courses", "Bearing angles"],
      ["Course length", "The absolute latitude of each course", "Inverse of course length", "Equal distribution"],
      ["Equally to all courses", "Proportional to latitude/departure of each course", "Only to the longest course", "Based on bearing alone"],
      ["Course lengths only", "Absolute latitudes for lat correction, absolute departures for dep correction", "Random distribution", "Weighted by number of observations"],
      ["Equal to all legs", "Proportional to each course's latitude and departure respectively", "Only to courses with errors", "By angle contribution"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "The transit rule distributes lat corrections proportional to absolute latitudes and dep corrections proportional to absolute departures.",
      "Transit rule: lat correction for a course = (lat misclosure × |course lat|) / Σ|all lats|.",
      "The transit rule distributes misclosure proportional to each course's absolute latitude (for lat) and absolute departure (for dep).",
      "Transit rule uses absolute latitudes for latitude corrections and absolute departures for departure corrections.",
      "The transit rule distributes corrections proportional to the absolute value of each course's latitude and departure."
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "Precision in surveying refers to:",
      "A highly precise set of measurements would show:",
      "Which best defines precision in surveying?",
      "Precision is indicated by:",
      "High precision means:"
    ],
    optionSets: [
      ["Closeness to the true value", "Consistency and repeatability of measurements", "The cost of the instrument used", "The number of measurements taken"],
      ["Close agreement with the true value", "Close agreement among repeated measurements", "Large systematic errors", "High cost of equipment"],
      ["Agreement with the accepted value", "The degree of refinement and consistency of repeated measurements", "The number of significant digits displayed", "The speed of measurement"],
      ["How close measurements are to truth", "How close repeated measurements are to each other", "How many measurements were taken", "The instrument's brand"],
      ["Measurements are close to truth", "Measurements are closely grouped together", "Only one measurement is needed", "Equipment is expensive"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "Precision refers to the consistency and repeatability of measurements, not their closeness to truth (that's accuracy).",
      "High precision means repeated measurements are closely grouped together (small spread/standard deviation).",
      "Precision is the degree of refinement and consistency among repeated measurements of the same quantity.",
      "Precision is indicated by how close repeated measurements are to each other (low variance).",
      "High precision means measurements are closely grouped, showing good repeatability."
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "Proper field note recording requires that notes be:",
      "Which is a fundamental rule of surveying field notes?",
      "Field notes should be recorded in:",
      "The most important principle of field note recording is:",
      "Best practice for surveying field notes includes:"
    ],
    optionSets: [
      ["Written in pencil so they can be erased and corrected", "Recorded in ink with errors lined through (not erased)", "Typed into a laptop only", "Memorized and written later"],
      ["Errors should be erased completely", "Crossed out errors with a single line, initialed, with correct value nearby", "Notes can be rewritten neatly later", "Only digital notes are acceptable"],
      ["Any convenient format", "A bound field book with entries made at the time of observation", "Loose-leaf paper filed later", "A personal journal"],
      ["Neatness above all else", "Recording data at the time of observation, not from memory", "Using abbreviations exclusively", "Recording only final computed values"],
      ["Erasing mistakes cleanly", "Recording original observations at the time they are made, not erasing", "Rewriting notes later for clarity", "Using only digital devices"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "Field notes should be in ink with errors lined through (single line), not erased, to maintain a complete record.",
      "Errors in field notes should be crossed out with a single line and initialed; never erase original data.",
      "Notes should be recorded in a bound field book at the time observations are made, forming a permanent record.",
      "The fundamental principle is recording data at the time of observation, maintaining an unaltered original record.",
      "Best practice: record original observations in ink at the time they are made; never erase or obliterate entries."
    ],
    points: 10
  }
];

export const d2_expanded_archetypes: QuestionArchetype[] = [
  {
    type: 'fill_in_blank',
    template: "A telescope has a magnification of {mag}×. If the field of view is {fov}°, what is the apparent field of view? Answer: ___ degrees",
    paramRanges: {
      mag: [20, 25, 28, 30, 32],
      fov: [1, 2, 3]
    },
    computeAnswer: (p) => String(p.mag * p.fov),
    computeExplanation: (p, ans) => `Apparent FOV = magnification × true FOV = ${p.mag} × ${p.fov}° = ${ans}°. Higher magnification reduces the true field of view.`,
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "A total station integrates which instruments into one device?",
      "Which combination of instruments does a total station replace?",
      "A total station combines the functions of:",
      "The primary components integrated in a total station are:",
      "Which instruments are built into a modern total station?"
    ],
    optionSets: [
      ["Level and compass", "Theodolite and EDM", "GPS receiver and level", "Compass and tape"],
      ["Compass and chain", "Electronic theodolite and EDM", "Level and GPS", "Planimeter and level"],
      ["A level and a tape", "A theodolite (angle measurement) and EDM (distance measurement)", "A GPS and a compass", "A chain and a transit"],
      ["GPS and level", "Electronic angle measurement and electronic distance measurement", "Compass and tape", "Planimeter and chain"],
      ["Level and rod", "Electronic theodolite and electronic distance meter", "Chain and compass", "GPS and altimeter"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "A total station integrates an electronic theodolite (for angles) and an EDM (for distances) into one instrument.",
      "A total station combines an electronic theodolite for angle measurement with an EDM for distance measurement.",
      "A total station combines theodolite functionality (angles) with EDM functionality (distances) plus a microprocessor.",
      "The two primary components are electronic angle measurement (theodolite) and electronic distance measurement (EDM).",
      "A modern total station integrates an electronic theodolite and EDM, often with an onboard computer and data collector."
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "An automatic (self-leveling) level uses what to maintain a level line of sight?",
      "The compensator in an automatic level serves to:",
      "What maintains the horizontal line of sight in an automatic level?",
      "An automatic level achieves a level line of sight through:",
      "The key feature of an automatic level is its:"
    ],
    optionSets: [
      ["A spirit bubble that must be precisely centered", "A pendulum-type compensator", "Manual adjustment screws", "A laser beam"],
      ["Measure angles", "Automatically maintain a horizontal line of sight", "Replace the tripod", "Measure distances"],
      ["A digital sensor", "A gravity-actuated compensator (pendulum prism)", "Manual leveling screws", "A laser reference"],
      ["Precise manual adjustment", "An internal compensator that uses gravity", "External software", "Electronic sensors only"],
      ["Laser beam", "Internal compensator (pendulum-type optical device)", "Extra-large spirit level", "GPS leveling"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "An automatic level uses a pendulum-type compensator that uses gravity to maintain a level line of sight.",
      "The compensator automatically adjusts the line of sight to horizontal after the instrument is roughly leveled.",
      "A gravity-actuated compensator (typically a pendulum prism system) maintains the horizontal line of sight.",
      "An internal compensator uses gravity to automatically level the line of sight once the instrument is approximately level.",
      "The internal compensator is a gravity-based optical device that automatically maintains a horizontal line of sight."
    ],
    points: 10
  },
  {
    type: 'fill_in_blank',
    template: "A level rod reading at a benchmark (elevation {bm} ft) is {bs} ft (backsight). The foresight reading at an unknown point is {fs} ft. What is the elevation of the unknown point? Answer: ___ ft",
    paramRanges: {
      bm: [100, 200, 500, 1000],
      bs: [3, 4, 5, 6, 7],
      fs: [2, 4, 6, 8]
    },
    computeAnswer: (p) => String(p.bm + p.bs - p.fs),
    computeExplanation: (p, ans) => `HI = BM elevation + BS = ${p.bm} + ${p.bs} = ${p.bm + p.bs} ft. Elevation of point = HI - FS = ${p.bm + p.bs} - ${p.fs} = ${ans} ft.`,
    points: 10
  },
  {
    type: 'fill_in_blank',
    template: "The combined curvature and refraction correction for a distance of {dist} ft is approximately 0.0206 × F² (where F is distance in thousands of feet). The correction for {dist} ft is ___ ft (round to 3 decimals).",
    paramRanges: {
      dist: [1000, 2000, 3000, 5000]
    },
    computeAnswer: (p) => (0.0206 * Math.pow(p.dist / 1000, 2)).toFixed(3),
    computeExplanation: (p, ans) => `C&R = 0.0206 × F² = 0.0206 × (${p.dist}/1000)² = 0.0206 × ${Math.pow(p.dist / 1000, 2)} = ${ans} ft. This correction accounts for Earth's curvature and atmospheric refraction.`,
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "Reciprocal leveling is used to:",
      "The purpose of reciprocal leveling is to:",
      "When would a surveyor use reciprocal leveling?",
      "Reciprocal leveling eliminates errors caused by:",
      "Reciprocal leveling is the preferred method when:"
    ],
    optionSets: [
      ["Measure angles more precisely", "Eliminate errors from curvature, refraction, and collimation for long sights", "Speed up the leveling process", "Avoid using a level rod"],
      ["Reduce random errors", "Cancel systematic errors when leveling across wide obstacles", "Measure slopes", "Replace GPS measurements"],
      ["For short-distance leveling", "When leveling across a river, valley, or other wide obstacle", "When measuring angles", "When using a total station"],
      ["Rod reading errors", "Curvature, refraction, and instrument collimation", "Blunders", "Wind effects"],
      ["Sights are short and equal", "Sights must be taken across a wide obstacle where equal BS/FS lengths are impossible", "Working on flat terrain", "Using digital levels"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "Reciprocal leveling eliminates curvature, refraction, and collimation errors by averaging readings from both sides.",
      "Reciprocal leveling cancels systematic errors (C&R, collimation) when leveling across wide obstacles like rivers.",
      "Reciprocal leveling is used when crossing wide obstacles where balanced BS/FS distances are not possible.",
      "By averaging readings from both ends, curvature, refraction, and collimation errors are eliminated.",
      "When a wide obstacle prevents equal BS/FS distances, reciprocal leveling averages readings from both sides to cancel errors."
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "Collimation error in a level instrument means:",
      "What is collimation error?",
      "A level with a collimation error has:",
      "The result of collimation error is that:",
      "Collimation error is caused by:"
    ],
    optionSets: [
      ["The tripod is unstable", "The line of sight is not truly horizontal when the instrument is level", "The rod is held at an angle", "The EDM is miscalibrated"],
      ["The telescope is dirty", "The line of sight is not parallel to the axis of the level vial", "The rod is too short", "The instrument is too old"],
      ["A misaligned cross-hair pattern", "A line of sight that slopes slightly upward or downward", "A broken compensator", "An incorrect focal length"],
      ["Angles are measured incorrectly", "Elevation readings include a systematic error proportional to distance", "The rod cannot be read", "GPS signals are blocked"],
      ["Improper rod readings", "Misalignment between the line of sight and the level vial axis", "Temperature changes", "Magnetic interference"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "Collimation error means the line of sight is not truly horizontal when the bubble is centered (or compensator is active).",
      "Collimation error occurs when the line of sight is not parallel to the axis of the level vial or compensator null.",
      "A collimation error causes the line of sight to slope, introducing systematic errors proportional to sight distance.",
      "Collimation error introduces a systematic error in elevation readings that increases with sighting distance.",
      "Collimation error is caused by misalignment between the line of sight and the level vial axis (or compensator)."
    ],
    points: 10
  },
  {
    type: 'fill_in_blank',
    template: "A horizontal angle is measured by taking a backsight reading of {bs}° {bsmin}' and a foresight reading of {fs}° {fsmin}'. What is the horizontal angle? Answer: ___ degrees and ___ minutes (enter as decimal degrees, round to 4 decimals)",
    paramRanges: {
      bs: [0, 45, 90, 180],
      bsmin: [0, 15, 30, 45],
      fs: [60, 120, 200, 270],
      fsmin: [0, 20, 30, 45]
    },
    computeAnswer: (p) => {
      const bsDeg = p.bs + p.bsmin / 60;
      const fsDeg = p.fs + p.fsmin / 60;
      let angle = fsDeg - bsDeg;
      if (angle < 0) angle += 360;
      return angle.toFixed(4);
    },
    computeExplanation: (p, ans) => {
      const bsDeg = p.bs + p.bsmin / 60;
      const fsDeg = p.fs + p.fsmin / 60;
      return `Horizontal angle = FS reading - BS reading = ${fsDeg.toFixed(4)}° - ${bsDeg.toFixed(4)}° = ${ans}°. If negative, add 360°.`;
    },
    points: 10
  }
];

// ============================================================================
// BATCH 4: ASTRONOMY & GEODETIC SURVEYING (Domains 5 and 6)
// ============================================================================

export const d5_expanded_archetypes: QuestionArchetype[] = [
  {
    type: 'multiple_choice',
    questionVariants: [
      "The hour angle of a celestial body is measured:",
      "How is the hour angle defined in celestial coordinates?",
      "The hour angle is the angular distance measured:",
      "In the PZS triangle, the hour angle is measured:",
      "The local hour angle (LHA) of a star is measured:"
    ],
    optionSets: [
      ["From the vernal equinox eastward", "Westward from the observer's meridian to the hour circle of the body", "From the north celestial pole", "Eastward from Greenwich"],
      ["Eastward from the observer's meridian", "Westward along the celestial equator from the observer's meridian", "From the horizon", "From the zenith"],
      ["Along the ecliptic", "Westward from the observer's celestial meridian along the equator", "From the nadir", "From Polaris"],
      ["From the pole to the star", "Westward from the observer's meridian", "From the horizon to the star", "From the equator to the pole"],
      ["East from Greenwich", "Westward from the local meridian", "From the star to Polaris", "Along the altitude circle"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "The hour angle is measured westward from the observer's celestial meridian to the hour circle of the body.",
      "LHA is measured westward along the celestial equator from the observer's meridian to the body's hour circle.",
      "The hour angle is the angular distance measured westward from the observer's celestial meridian along the equator.",
      "In the PZS (pole-zenith-star) triangle, the hour angle is at the pole, measured westward from the meridian.",
      "The local hour angle is measured westward from the local (observer's) meridian to the star's hour circle."
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "Solar observations for azimuth require knowledge of the sun's:",
      "To determine azimuth from a solar observation, you need:",
      "Which data is essential for computing azimuth from the sun?",
      "A solar observation for azimuth determination requires:",
      "Computing azimuth from the sun requires the sun's:"
    ],
    optionSets: [
      ["Magnitude and color", "Declination, GHA, and the observer's latitude", "Distance from Earth", "Size and brightness"],
      ["Mass and radius", "Declination, Greenwich Hour Angle, observer's latitude and longitude", "Color and temperature", "Orbital velocity"],
      ["Visual magnitude", "Declination and hour angle at the time of observation", "Rotational speed", "Corona temperature"],
      ["Solar wind speed", "Declination, GHA, observer's position, and exact time", "Magnetic field strength", "Sunspot count"],
      ["Spectral class", "Declination and hour angle (from ephemeris data)", "Apparent size", "Surface temperature"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "Solar azimuth computation requires the sun's declination, GHA (or LHA), and the observer's latitude.",
      "You need the sun's declination, Greenwich Hour Angle, and the observer's latitude and longitude for azimuth.",
      "The sun's declination and hour angle at the time of observation are essential, along with observer's latitude.",
      "Solar azimuth requires exact time (for GHA), declination (from ephemeris), and observer's latitude/longitude.",
      "The sun's declination and hour angle (derived from time and longitude) are needed to compute azimuth."
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "Polaris observations are used for azimuth determination because Polaris:",
      "Why is Polaris useful for azimuth determination?",
      "The advantage of using Polaris for azimuth is that it:",
      "Polaris is preferred for azimuth determination because:",
      "Astronomic azimuth from Polaris is practical because Polaris:"
    ],
    optionSets: [
      ["Is the brightest star in the sky", "Is very close to the north celestial pole", "Is on the celestial equator", "Has no proper motion"],
      ["It is the largest star", "It is near the celestial north pole, making azimuth computation simpler", "It is directly overhead everywhere", "It does not move at all"],
      ["Changes position rapidly", "Moves in a very small circle around the pole, simplifying calculations", "Is always due north exactly", "Can be observed during the day"],
      ["It has zero declination", "Its declination is very close to 90° (near the pole)", "It is always at the zenith", "It never sets"],
      ["Is visible from everywhere", "Is close to the pole, requiring only small corrections for precise azimuth", "Is exactly at the pole", "Has no parallax"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "Polaris is within about 0.7° of the north celestial pole, making it useful for azimuth determination with small corrections.",
      "Polaris is very close to the north celestial pole, so it provides a nearly due-north reference for azimuth.",
      "Polaris traces a very small circle around the pole (< 1° radius), simplifying azimuth calculations.",
      "Polaris has a declination of approximately 89.3° (very close to 90°), making it nearly coincident with the pole.",
      "Being close to the pole, Polaris requires only small corrections to determine true north (azimuth)."
    ],
    points: 10
  },
  {
    type: 'fill_in_blank',
    template: "Convert {hours} hours, {minutes} minutes of time to degrees. (1 hour = 15°, 1 minute of time = 15' of arc). Answer: ___ degrees ___ minutes of arc (enter as decimal degrees, round to 4 decimals)",
    paramRanges: {
      hours: [1, 2, 3, 4, 6, 8, 12],
      minutes: [0, 10, 15, 20, 30, 45]
    },
    computeAnswer: (p) => ((p.hours * 15) + (p.minutes * 0.25)).toFixed(4),
    computeExplanation: (p, ans) => `${p.hours} hours × 15°/hour = ${p.hours * 15}°. ${p.minutes} min × 15'/min = ${p.minutes * 15}' = ${(p.minutes * 15 / 60).toFixed(4)}°. Total = ${ans}°.`,
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "In the PZS (astronomical) triangle, the three vertices are:",
      "The PZS triangle in astronomical surveying has vertices at:",
      "Which three points define the astronomical (PZS) triangle?",
      "The astronomical triangle is formed by:",
      "The vertices of the PZS triangle are:"
    ],
    optionSets: [
      ["Prime meridian, zenith, sun", "Celestial pole, observer's zenith, celestial body (star/sun)", "Polaris, zenith, south pole", "North, east, south"],
      ["Equator, ecliptic, horizon", "Pole (P), zenith (Z), star/sun (S)", "Horizon, nadir, pole", "Three survey monuments"],
      ["Observer, target, reference", "Pole, zenith, star", "Horizon, azimuth, altitude", "Base, height, hypotenuse"],
      ["Three random stars", "Celestial pole, zenith, observed body", "Equator, meridian, horizon", "Sun, moon, Polaris"],
      ["North, south, east", "Pole, zenith, star (or sun)", "Horizon, equator, ecliptic", "GPS, base, rover"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "The PZS triangle vertices: P = celestial pole, Z = observer's zenith, S = celestial body (star or sun).",
      "P = pole, Z = zenith, S = star/sun. The sides are co-latitude, co-altitude, and polar distance.",
      "The three points of the PZS triangle are the celestial pole (P), the zenith (Z), and the star or sun (S).",
      "The astronomical triangle has the celestial pole, observer's zenith, and the observed body as its three vertices.",
      "P = celestial pole, Z = zenith, S = star/sun. The angle at P is the hour angle."
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "The azimuth of a celestial body can be computed from the PZS triangle using:",
      "Which formula is used to compute azimuth from astronomical observations?",
      "To solve for azimuth in the PZS triangle, surveyors commonly use:",
      "Astronomical azimuth from the PZS triangle is computed using:",
      "Which spherical trigonometry relationship is used for azimuth from solar observations?"
    ],
    optionSets: [
      ["The Pythagorean theorem", "The law of cosines or the hour angle formula", "Simple addition", "Linear interpolation"],
      ["Plane trigonometry only", "Spherical trigonometry (law of sines or cosines)", "Differential calculus", "Matrix algebra"],
      ["Coordinate geometry", "The spherical law of cosines or the four-parts formula", "Simple ratios", "Linear regression"],
      ["Map projection formulas", "Spherical trigonometric formulas (cosine rule, sine rule)", "Photogrammetric equations", "Polynomial fitting"],
      ["Plane triangle formulas", "Spherical triangle identities (cosine formula for sides/angles)", "Statistical analysis", "GPS processing software"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "Azimuth is computed using the spherical law of cosines or the hour angle formula from the PZS triangle.",
      "Spherical trigonometry (law of sines/cosines) is used to solve the PZS triangle for azimuth.",
      "The spherical law of cosines or four-parts formula solves the PZS triangle for the azimuth angle at the zenith.",
      "Spherical trigonometric formulas are applied to the PZS triangle to compute the azimuth at the zenith vertex.",
      "Spherical triangle identities (especially the cosine formula) are used to compute azimuth from solar/stellar observations."
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "Latitude can be determined astronomically by measuring the altitude of Polaris because:",
      "Why does the altitude of Polaris approximately equal the observer's latitude?",
      "The altitude of Polaris above the horizon is approximately equal to:",
      "An observer's latitude can be estimated from Polaris because:",
      "The relationship between Polaris altitude and latitude exists because:"
    ],
    optionSets: [
      ["Polaris is on the celestial equator", "Polaris is near the celestial pole, and pole altitude equals latitude", "Polaris is always at 90°", "Polaris is always on the horizon"],
      ["The equator is always at 90°", "The celestial pole's altitude equals the observer's latitude", "Polaris has zero declination", "The horizon is always level"],
      ["The observer's longitude", "The observer's latitude", "The declination of the sun", "The right ascension"],
      ["Polaris has low declination", "Polaris is near the pole, whose altitude equals latitude", "Polaris is the closest star", "Polaris has no proper motion"],
      ["The horizon is at 0°", "The altitude of the celestial pole equals the observer's geographic latitude", "The sun is near Polaris", "The equator passes through the zenith"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "Since Polaris is near the celestial pole, its altitude approximates the observer's latitude. The pole's altitude exactly equals latitude.",
      "The altitude of the celestial pole equals the observer's latitude. Since Polaris is near the pole, its altitude ≈ latitude.",
      "The altitude of Polaris ≈ observer's latitude because Polaris is very close to the north celestial pole.",
      "Polaris is near the north celestial pole; the altitude of the pole above the horizon equals the geographic latitude.",
      "The celestial pole's altitude equals the observer's latitude. Polaris, being near the pole, serves as a practical approximation."
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "An ephemeris provides:",
      "What information is found in an astronomical ephemeris?",
      "Surveyors use an ephemeris to obtain:",
      "The data published in a solar ephemeris includes:",
      "An ephemeris is used in surveying for:"
    ],
    optionSets: [
      ["Property boundary information", "Predicted positions of celestial bodies at specific times", "GPS satellite orbits", "Topographic data"],
      ["Soil data", "Tabulated celestial coordinates (declination, GHA) for celestial bodies", "Weather forecasts", "Tide predictions"],
      ["Property descriptions", "Celestial body positions (declination, right ascension, GHA) at given times", "Traverse data", "Level loop adjustments"],
      ["Building codes", "Sun's declination, equation of time, GHA at specific dates/times", "Property taxes", "GPS almanac data"],
      ["Legal descriptions", "Obtaining sun/star positions for azimuth calculations", "EDM corrections", "Traverse adjustments"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "An ephemeris provides predicted positions (coordinates) of celestial bodies at specified times.",
      "An astronomical ephemeris tabulates celestial coordinates such as declination and Greenwich Hour Angle.",
      "Surveyors use ephemeris data to obtain celestial body positions for astronomic azimuth determination.",
      "A solar ephemeris provides the sun's declination, equation of time, and GHA for specific dates and times.",
      "An ephemeris provides celestial body positions needed to compute astronomic azimuths from solar or stellar observations."
    ],
    points: 10
  }
];

export const d6_expanded_archetypes: QuestionArchetype[] = [
  {
    type: 'multiple_choice',
    questionVariants: [
      "The primary difference between NAD27 and NAD83 is:",
      "NAD83 differs from NAD27 in that NAD83:",
      "What distinguishes NAD83 from NAD27?",
      "The transition from NAD27 to NAD83 involved:",
      "NAD27 and NAD83 differ primarily because:"
    ],
    optionSets: [
      ["NAD27 is geocentric", "NAD83 uses a geocentric datum (GRS80 ellipsoid) while NAD27 uses Clarke 1866", "They are identical", "NAD83 uses Clarke 1866"],
      ["Uses the Clarke 1866 ellipsoid", "Is based on the GRS80 ellipsoid and is Earth-centered (geocentric)", "Is only used in Europe", "Uses fewer control points"],
      ["They use the same ellipsoid", "NAD83 is geocentric with the GRS80 ellipsoid; NAD27 used Clarke 1866 centered at Meades Ranch", "NAD27 is more accurate", "There is no difference"],
      ["No changes to the reference ellipsoid", "A change from the Clarke 1866 ellipsoid (NAD27) to the GRS80 ellipsoid (NAD83) and a geocentric origin", "Only adding more control stations", "Changing from feet to meters"],
      ["NAD83 uses the Clarke 1866 ellipsoid", "NAD27 uses the Clarke 1866 ellipsoid while NAD83 uses GRS80 with a geocentric origin", "Both use GRS80", "NAD27 is geocentric"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "NAD83 is geocentric (Earth-centered) using the GRS80 ellipsoid. NAD27 used the Clarke 1866 ellipsoid centered at Meades Ranch, Kansas.",
      "NAD83 uses the GRS80 ellipsoid with a geocentric origin, while NAD27 used the Clarke 1866 ellipsoid.",
      "NAD83 is geocentric with GRS80; NAD27 was fixed at Meades Ranch using Clarke 1866. This caused coordinate shifts.",
      "The change involved a new ellipsoid (GRS80), a geocentric origin, and incorporation of satellite/VLBI data.",
      "NAD27 uses Clarke 1866 (non-geocentric); NAD83 uses GRS80 (geocentric), resulting in coordinate shifts across North America."
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "The Lambert Conformal Conic projection is best suited for areas that are:",
      "Which map projection is ideal for regions extending primarily east-west?",
      "Lambert Conformal Conic projections are typically used for zones that are:",
      "For a state that extends more east-west than north-south, the preferred SPCS projection is:",
      "Which projection preserves angles and is used for east-west zones?"
    ],
    optionSets: [
      ["Narrow north-south", "Wide east-west", "Circular", "Near the poles only"],
      ["Mercator", "Lambert Conformal Conic", "Azimuthal equidistant", "Robinson"],
      ["Long and narrow north-south", "Elongated east-west", "Square-shaped", "Very small areas only"],
      ["Transverse Mercator", "Lambert Conformal Conic", "Polyconic", "Gnomonic"],
      ["Mercator", "Transverse Mercator", "Lambert Conformal Conic", "Azimuthal"]
    ],
    correctAnswers: ["1", "1", "1", "1", "2"],
    explanationVariants: [
      "Lambert Conformal Conic is ideal for areas extending east-west because distortion is minimized along the parallels.",
      "Lambert Conformal Conic projection is best for east-west oriented regions; Transverse Mercator for north-south.",
      "East-west elongated zones use Lambert Conformal Conic; the cone intersects the ellipsoid along two standard parallels.",
      "States extending east-west (like Tennessee) use Lambert Conformal Conic in the State Plane Coordinate System.",
      "Lambert Conformal Conic preserves angles (conformal) and minimizes distortion for east-west zones."
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "In the State Plane Coordinate System, zones extending primarily north-south use:",
      "Which projection is used for SPCS zones that are elongated north-south?",
      "States with north-south elongated zones in SPCS use:",
      "The Transverse Mercator projection in SPCS is used for zones that extend:",
      "For a long, narrow north-south SPCS zone, the appropriate projection is:"
    ],
    optionSets: [
      ["Lambert Conformal Conic", "Transverse Mercator", "Oblique Mercator", "Polyconic"],
      ["Lambert Conformal Conic", "Transverse Mercator", "Azimuthal", "Gnomonic"],
      ["Polyconic", "Azimuthal equidistant", "Transverse Mercator", "Lambert Conformal Conic"],
      ["East-west", "North-south", "Diagonally", "In all directions equally"],
      ["Lambert Conformal Conic", "Transverse Mercator", "Standard Mercator", "Robinson"]
    ],
    correctAnswers: ["1", "1", "2", "1", "1"],
    explanationVariants: [
      "Transverse Mercator is used for north-south elongated SPCS zones because distortion is minimized along the central meridian.",
      "Transverse Mercator projection is used for SPCS zones elongated north-south (e.g., Illinois zones).",
      "Transverse Mercator minimizes distortion along the central meridian, ideal for north-south elongated zones.",
      "The Transverse Mercator projection in SPCS is for zones extending north-south, minimizing distortion along the central meridian.",
      "Transverse Mercator is the appropriate projection for long, narrow north-south SPCS zones."
    ],
    points: 10
  },
  {
    type: 'fill_in_blank',
    template: "A ground distance of {ground} ft needs to be converted to grid distance. The combined scale factor is {sf}. Grid distance = ground × scale factor. Answer: ___ ft (round to 2 decimals)",
    paramRanges: {
      ground: [1000, 2000, 3000, 5000],
      sf: [9999, 10001]
    },
    computeAnswer: (p) => (p.ground * (p.sf / 10000)).toFixed(2),
    computeExplanation: (p, ans) => `Grid distance = ground distance × combined scale factor = ${p.ground} × ${(p.sf / 10000).toFixed(4)} = ${ans} ft.`,
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "The convergence angle in the State Plane Coordinate System is the angle between:",
      "What does the convergence angle represent in SPCS?",
      "Grid north differs from geodetic north by the:",
      "The convergence angle (mapping angle) is:",
      "In SPCS, the angle between grid north and geodetic north is called:"
    ],
    optionSets: [
      ["True north and magnetic north", "Grid north and geodetic (true) north", "Magnetic north and grid north", "Astronomic north and magnetic north"],
      ["Magnetic declination", "The angle between grid north and geodetic north at a point", "Instrument error", "Refraction correction"],
      ["Magnetic declination", "Convergence angle (mapping angle)", "Instrument constant", "Collimation error"],
      ["A random error", "The angle between the grid meridian and the geodetic meridian at a point", "An instrumental error", "A blunder"],
      ["Declination", "Convergence angle", "Grid factor", "Elevation factor"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "The convergence angle is the angle between grid north (central meridian direction) and geodetic (true) north at a point.",
      "The convergence angle is the angle between grid north and geodetic north, varying with position in the zone.",
      "Grid north differs from geodetic north by the convergence angle (or mapping angle), which varies across the zone.",
      "The convergence angle is the angle between the grid meridian and the geodetic meridian at any point in the SPCS zone.",
      "The convergence angle (mapping angle or grid declination) is the angle between grid north and geodetic north."
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "Geodetic coordinates differ from astronomic coordinates because:",
      "What is the distinction between geodetic and astronomic coordinates?",
      "Astronomic latitude differs from geodetic latitude because:",
      "The difference between geodetic and astronomic positions is due to:",
      "Geodetic and astronomic coordinates would be identical if:"
    ],
    optionSets: [
      ["They use different units", "Geodetic is referenced to the ellipsoid while astronomic is based on the local gravity field", "Astronomic uses the ellipsoid", "They are always identical"],
      ["There is no difference", "Geodetic references the ellipsoid; astronomic references the geoid (gravity)", "Geodetic uses the geoid", "Astronomic uses GPS"],
      ["Astronomic uses the ellipsoid normal", "Astronomic uses the plumb line (gravity) while geodetic uses the ellipsoid normal", "They are measured differently but give the same result", "Astronomic ignores the Earth's shape"],
      ["Different datums", "The deflection of the vertical (difference between plumb line and ellipsoid normal)", "Different units of measurement", "Observer error"],
      ["The Earth were a perfect sphere", "The geoid and ellipsoid coincided everywhere", "GPS was perfectly accurate", "There were no atmospheric effects"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "Geodetic coordinates reference the ellipsoid normal; astronomic coordinates reference the plumb line (gravity/geoid).",
      "Geodetic coordinates are referenced to the ellipsoid; astronomic coordinates are based on the local gravity field (geoid).",
      "Astronomic latitude uses the plumb line direction (gravity); geodetic latitude uses the ellipsoid normal direction.",
      "The deflection of the vertical (angle between plumb line and ellipsoid normal) causes the difference.",
      "If the geoid and ellipsoid coincided, the plumb line and ellipsoid normal would be identical, making coordinates equal."
    ],
    points: 10
  },
  {
    type: 'fill_in_blank',
    template: "Given an ellipsoid with semi-major axis a = {a} m and flattening f = 1/{finv}, compute the semi-minor axis b = a × (1 - f). Answer: ___ m (round to 3 decimals)",
    paramRanges: {
      a: [6378137],
      finv: [298, 300]
    },
    computeAnswer: (p) => (p.a * (1 - 1 / p.finv)).toFixed(3),
    computeExplanation: (p, ans) => `f = 1/${p.finv} = ${(1 / p.finv).toFixed(6)}. b = a × (1 - f) = ${p.a} × (1 - ${(1 / p.finv).toFixed(6)}) = ${ans} m.`,
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "The geoid is best described as:",
      "What is the geoid?",
      "The geoid represents:",
      "In geodesy, the geoid is defined as:",
      "Which statement best describes the geoid?"
    ],
    optionSets: [
      ["A perfect sphere", "An equipotential surface of gravity approximating mean sea level", "The mathematical ellipsoid", "The physical surface of the Earth"],
      ["The Earth's actual surface", "The equipotential gravity surface that best fits mean sea level", "A flat plane", "The reference ellipsoid"],
      ["A mathematical construct only", "The surface of constant gravitational potential coinciding with mean sea level", "The topographic surface", "An artificial datum"],
      ["The ellipsoid", "An equipotential surface of the Earth's gravity field that approximates mean sea level globally", "A plane surface", "A digital elevation model"],
      ["The surface you walk on", "The gravity equipotential surface corresponding to mean sea level", "A coordinate system", "A map projection"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "The geoid is an equipotential surface of gravity that best fits mean sea level worldwide. It is irregular due to mass variations.",
      "The geoid is the equipotential gravity surface that best approximates mean sea level across the globe.",
      "The geoid is the surface of constant gravitational potential that coincides with mean sea level in the oceans.",
      "The geoid is an equipotential surface of the Earth's gravity field, approximating mean sea level globally.",
      "The geoid is the gravity equipotential surface corresponding to mean sea level, undulating above/below the ellipsoid."
    ],
    points: 10
  }
];

// ============================================================================
// BATCH 5: PHOTOGRAMMETRY, GPS, MAPPING
// ============================================================================

export const d2_photo_expanded_archetypes: QuestionArchetype[] = [
  {
    type: 'fill_in_blank',
    template: "An aerial photograph is taken at an altitude of {H} ft above ground with a camera focal length of {f} inches. The photo scale is 1:___. (Scale = f/H, convert f to feet first)",
    paramRanges: {
      H: [3000, 5000, 6000, 10000, 12000],
      f: [6, 8, 12]
    },
    computeAnswer: (p) => String(Math.round(p.H / (p.f / 12))),
    computeExplanation: (p, ans) => `f = ${p.f} in = ${(p.f / 12).toFixed(4)} ft. Scale = f/H = ${(p.f / 12).toFixed(4)}/${p.H} = 1:${ans}.`,
    points: 10
  },
  {
    type: 'fill_in_blank',
    template: "On an aerial photo, a building top is displaced {d} mm from its base due to relief displacement. The radial distance from the principal point to the base is {r} mm. The flying height above the base is {H} m. What is the building height? h = (d × H) / r. Answer: ___ m (round to 1 decimal)",
    paramRanges: {
      d: [2, 3, 4, 5],
      r: [60, 70, 80, 90, 100],
      H: [1000, 1500, 2000, 3000]
    },
    computeAnswer: (p) => ((p.d * p.H) / p.r).toFixed(1),
    computeExplanation: (p, ans) => `Relief displacement formula: h = (d × H) / r = (${p.d} × ${p.H}) / ${p.r} = ${ans} m.`,
    points: 10
  },
  {
    type: 'fill_in_blank',
    template: "The stereoscopic parallax difference between two points is {dp} mm. The average photo base is {b} mm and the flying height above ground is {H} m. Compute the elevation difference: Δh = H × dp / (b + dp). Answer: ___ m (round to 1 decimal)",
    paramRanges: {
      dp: [2, 3, 4, 5, 6],
      b: [80, 90, 92, 95],
      H: [1500, 2000, 2500, 3000]
    },
    computeAnswer: (p) => ((p.H * p.dp) / (p.b + p.dp)).toFixed(1),
    computeExplanation: (p, ans) => `Δh = H × dp / (b + dp) = ${p.H} × ${p.dp} / (${p.b} + ${p.dp}) = ${p.H * p.dp} / ${p.b + p.dp} = ${ans} m.`,
    points: 10
  },
  {
    type: 'fill_in_blank',
    template: "An aerial photo has a scale of 1:{scale}. The photo format is {format} mm × {format} mm. What is the ground coverage of one side? Answer: ___ m",
    paramRanges: {
      scale: [5000, 10000, 15000, 20000],
      format: [230]
    },
    computeAnswer: (p) => String((p.format / 1000) * p.scale),
    computeExplanation: (p, ans) => `Ground coverage = photo dimension × scale = ${p.format} mm × ${p.scale} = ${p.format * p.scale} mm = ${ans} m.`,
    points: 10
  },
  {
    type: 'fill_in_blank',
    template: "For a photogrammetric flight, the required photo scale is 1:{scale}. The camera focal length is {f} mm. What flying height above ground is needed? H = f × scale. Answer: ___ m",
    paramRanges: {
      scale: [5000, 10000, 15000, 20000],
      f: [150, 152, 210]
    },
    computeAnswer: (p) => String((p.f / 1000) * p.scale),
    computeExplanation: (p, ans) => `H = f × scale denominator = ${p.f} mm × ${p.scale} = ${p.f * p.scale} mm = ${ans} m above ground.`,
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "In aerial photography, forward overlap is typically:",
      "The standard endlap (forward overlap) for aerial survey photography is approximately:",
      "Stereoscopic coverage requires a minimum forward overlap of:",
      "What is the standard forward overlap in aerial survey photography?",
      "For stereo viewing, aerial photos must have a forward overlap of at least:"
    ],
    optionSets: [
      ["20-30%", "40-50%", "55-65%", "80-90%"],
      ["30%", "45%", "60%", "80%"],
      ["25%", "40%", "50-60%", "80%"],
      ["30%", "45%", "60%", "75%"],
      ["20%", "40%", "53-60%", "80%"]
    ],
    correctAnswers: ["2", "2", "2", "2", "2"],
    explanationVariants: [
      "Standard forward (endlap) overlap is approximately 60% to ensure stereoscopic coverage between consecutive photos.",
      "The standard endlap is approximately 60%. This ensures adequate overlap for stereoscopic viewing and mapping.",
      "A minimum of about 60% forward overlap is needed for stereoscopic coverage in aerial photography.",
      "Standard forward overlap is approximately 60%, allowing stereo pairs to be formed from consecutive photographs.",
      "For stereo viewing, approximately 60% forward overlap (endlap) is required between successive photos in a flight line."
    ],
    points: 10
  }
];

export const d2_gps_expanded_archetypes: QuestionArchetype[] = [
  {
    type: 'multiple_choice',
    questionVariants: [
      "The GPS satellite constellation nominally consists of:",
      "How many satellites are in the nominal GPS constellation?",
      "The GPS space segment is designed to have approximately:",
      "The nominal number of GPS satellites in the constellation is:",
      "GPS was designed with a constellation of:"
    ],
    optionSets: [
      ["12 satellites in 3 orbital planes", "24 satellites in 6 orbital planes", "36 satellites in 9 orbital planes", "48 satellites in 12 orbital planes"],
      ["12 in 3 planes", "24 in 6 planes", "30 in 3 planes", "48 in 6 planes"],
      ["18 satellites", "24 satellites in 6 planes", "32 satellites", "12 satellites"],
      ["12", "18", "24 (in 6 orbital planes)", "36"],
      ["12 satellites in 6 planes", "24 satellites in 6 orbital planes", "36 satellites in 3 planes", "48 satellites in 4 planes"]
    ],
    correctAnswers: ["1", "1", "1", "2", "1"],
    explanationVariants: [
      "The nominal GPS constellation has 24 satellites in 6 orbital planes (4 per plane) at about 20,200 km altitude.",
      "GPS nominally has 24 satellites distributed in 6 orbital planes inclined at 55° to the equator.",
      "The GPS space segment was designed for 24 satellites in 6 orbital planes for worldwide coverage.",
      "The nominal constellation is 24 satellites in 6 orbital planes, ensuring at least 4 are visible anywhere on Earth.",
      "GPS was designed with 24 satellites in 6 orbital planes, each plane having 4 satellites."
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "PDOP (Position Dilution of Precision) describes:",
      "What does a low PDOP value indicate?",
      "PDOP is a measure of:",
      "In GPS surveying, PDOP relates to:",
      "A PDOP value of 2 compared to 6 indicates:"
    ],
    optionSets: [
      ["The accuracy of the clock", "The effect of satellite geometry on position accuracy", "The number of satellites tracked", "The signal strength"],
      ["Poor satellite geometry", "Good satellite geometry and potentially higher accuracy", "Too many satellites", "Signal interference"],
      ["Signal frequency", "The geometric strength of satellite configuration for positioning", "Receiver temperature", "Atmospheric delay"],
      ["Multipath error", "The quality of satellite geometry affecting position solution quality", "Satellite clock error", "Ionospheric delay"],
      ["Worse geometry and position", "Better geometry and potentially better position accuracy", "Equal accuracy", "More satellites tracked"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "PDOP quantifies the effect of satellite geometry on 3D position accuracy. Lower PDOP = better geometry.",
      "A low PDOP indicates favorable satellite geometry, leading to potentially better position accuracy.",
      "PDOP measures the geometric strength (spread) of satellite positions; well-distributed satellites give low PDOP.",
      "PDOP relates to how satellite geometry affects the quality of the computed position. Lower is better.",
      "PDOP 2 indicates much better satellite geometry than PDOP 6, potentially yielding higher position accuracy."
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "Differential GPS (DGPS) improves accuracy by:",
      "The principle behind differential GPS is:",
      "DGPS achieves higher accuracy because it:",
      "How does differential GPS correct for errors?",
      "The key concept of differential GPS is:"
    ],
    optionSets: [
      ["Using more satellites", "Using corrections from a known base station to reduce common errors", "Increasing signal power", "Using a better antenna"],
      ["Averaging more measurements", "Computing corrections at a known point and applying them to the rover", "Using military signals", "Reducing multipath"],
      ["Uses longer observation times", "Differences out common errors (atmospheric, orbital) using a base station", "Uses higher frequency signals", "Eliminates all errors"],
      ["By using only one satellite", "By comparing base station computed vs known position and sending corrections", "By increasing satellite power", "By eliminating tropospheric delay entirely"],
      ["Single receiver operation", "A base station at a known location computes and transmits corrections", "Faster signal processing", "Using GLONASS only"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "DGPS uses a base station at a known position to compute corrections that are applied to rover measurements.",
      "DGPS computes corrections at a known point (base station) and applies them to the rover, reducing common errors.",
      "Common errors (atmospheric, orbital) are similar for nearby receivers, so differencing them greatly reduces these errors.",
      "The base station compares its computed position with its known position and transmits the correction to the rover.",
      "A base station at a known location computes error corrections and transmits them to nearby rovers."
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "RTK (Real-Time Kinematic) GPS provides:",
      "What level of accuracy does RTK GPS typically achieve?",
      "RTK surveying differs from static GPS in that it provides:",
      "The primary advantage of RTK GPS is:",
      "RTK GPS achieves centimeter-level accuracy by:"
    ],
    optionSets: [
      ["Meter-level accuracy in post-processing", "Centimeter-level accuracy in real time", "Sub-meter accuracy only", "Decimeter accuracy after 24 hours"],
      ["10-meter accuracy", "1-2 centimeter accuracy", "Sub-meter accuracy", "Millimeter accuracy"],
      ["Results only after post-processing", "Real-time centimeter-level positions", "Lower accuracy than code-based GPS", "Only horizontal positions"],
      ["Low cost", "Real-time centimeter-level positioning in the field", "No need for a base station", "Immunity to multipath"],
      ["Using only code measurements", "Resolving carrier phase integer ambiguities in real time", "Post-processing data", "Using longer baselines"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "RTK GPS provides centimeter-level (1-2 cm) accuracy in real time by resolving carrier phase ambiguities.",
      "RTK typically achieves 1-2 cm horizontal accuracy and 2-3 cm vertical accuracy in real time.",
      "RTK provides real-time centimeter-level positions, unlike static GPS which requires post-processing.",
      "RTK's primary advantage is real-time centimeter-level positioning, allowing stakeout and surveying without post-processing.",
      "RTK resolves carrier phase integer ambiguities in real time using a radio link from the base station."
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "Which of the following is a major GPS error source?",
      "The largest error source in single-point GPS positioning is typically:",
      "Which error source affects GPS signals as they pass through the atmosphere?",
      "Multipath error in GPS is caused by:",
      "GPS error sources include all of the following EXCEPT:"
    ],
    optionSets: [
      ["Moon phase", "Ionospheric delay", "Earth's rotation speed", "Solar eclipse"],
      ["Receiver color", "Ionospheric/tropospheric delay", "Satellite size", "Antenna height above sea level"],
      ["Gravitational lensing", "Ionospheric and tropospheric refraction", "Tidal forces", "Coriolis effect"],
      ["Too many satellites", "GPS signals reflecting off nearby surfaces before reaching the antenna", "Poor battery life", "Excessive rain"],
      ["Ionospheric delay", "Tropospheric delay", "Multipath", "Barometric pressure at the receiver"]
    ],
    correctAnswers: ["1", "1", "1", "1", "3"],
    explanationVariants: [
      "Ionospheric delay is a major GPS error source, caused by the ionosphere affecting signal propagation speed.",
      "Ionospheric and tropospheric delays are typically the largest error sources in single-point GPS positioning.",
      "The ionosphere and troposphere refract GPS signals, introducing timing errors and thus position errors.",
      "Multipath occurs when GPS signals reflect off nearby surfaces (buildings, terrain) before reaching the antenna.",
      "Barometric pressure at the receiver is not a GPS error source. Major sources include ionospheric delay, tropospheric delay, multipath, and orbit errors."
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "GNSS modernization includes adding which signals to GPS?",
      "The GPS modernization effort has added which new civilian signal?",
      "Which new GPS signal was introduced for civilian use on the L5 frequency?",
      "GPS modernization includes the introduction of:",
      "Modern GPS satellites broadcast which additional civilian signal?"
    ],
    optionSets: [
      ["Only L1 C/A", "L2C, L5, and L1C signals", "No new signals", "Military signals only"],
      ["No new signals", "L2C and L5 civilian signals", "Only encrypted signals", "Shortwave signals"],
      ["L6", "L5 (1176.45 MHz) for safety-of-life applications", "L4", "L7"],
      ["Only military enhancements", "New civilian signals (L2C, L5, L1C) and improved accuracy", "Reduction in satellite count", "Analog signals"],
      ["No additional signals", "L2C (on L2) and L5 civilian signals", "Only P(Y) code improvements", "VHF signals"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "GPS modernization adds L2C, L5, and L1C civilian signals for improved accuracy, redundancy, and reliability.",
      "GPS modernization introduced L2C and L5 civilian signals, improving accuracy and enabling better interference detection.",
      "The L5 signal at 1176.45 MHz was introduced for safety-of-life applications, providing a third civilian frequency.",
      "GPS modernization introduces new civilian signals (L2C, L5, L1C), improving accuracy and providing signal redundancy.",
      "Modern GPS satellites broadcast L2C and L5 in addition to L1 C/A, providing three civilian frequencies."
    ],
    points: 10
  }
];

export const d6_mapping_expanded_archetypes: QuestionArchetype[] = [
  {
    type: 'fill_in_blank',
    template: "A map has a representative fraction of 1:{rf}. A distance of {inches} inches on the map represents ___ feet on the ground.",
    paramRanges: {
      rf: [1200, 2400, 4800, 6000, 12000],
      inches: [2, 3, 4, 5, 6]
    },
    computeAnswer: (p) => String(Math.round(p.inches * p.rf / 12)),
    computeExplanation: (p, ans) => `Ground distance = map distance × RF denominator = ${p.inches} in × ${p.rf} = ${p.inches * p.rf} inches ÷ 12 = ${ans} feet.`,
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "The contour interval on a topographic map is selected based on:",
      "What determines the appropriate contour interval for a topographic map?",
      "Contour interval selection depends primarily on:",
      "When choosing a contour interval, the surveyor considers:",
      "The contour interval is influenced by:"
    ],
    optionSets: [
      ["Only the map color scheme", "Terrain relief, map scale, and the purpose of the map", "The surveyor's preference only", "The printing technology"],
      ["Paper size", "Terrain steepness, map scale, and intended use", "Computer software", "Number of benchmarks"],
      ["Only the scale", "Map scale, terrain character, and purpose of the survey", "Color of contour lines", "Size of the study area only"],
      ["Ink color", "Terrain roughness, map scale, and level of detail needed", "Only the client's budget", "GPS accuracy"],
      ["Only the terrain", "Scale, terrain type, and required level of detail", "Only the instrument used", "Time of year"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "Contour interval depends on terrain relief (steeper = larger CI), map scale, and the purpose/use of the map.",
      "Terrain steepness, map scale, and intended use determine contour interval. Steep terrain typically uses larger intervals.",
      "Map scale, terrain character, and survey purpose all influence contour interval selection.",
      "Terrain roughness (relief), map scale, and the level of detail needed determine the appropriate contour interval.",
      "Scale, terrain type, and required detail level all influence CI selection. Flat terrain uses smaller intervals."
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "ALTA/NSPS land title surveys require:",
      "Which of the following is a requirement of an ALTA/NSPS survey?",
      "An ALTA/NSPS survey must include:",
      "The ALTA/NSPS standards require the surveyor to:",
      "Which is an essential element of an ALTA/NSPS survey?"
    ],
    optionSets: [
      ["Only a boundary survey", "A boundary survey with improvements, easements, and encroachments shown", "Only a topographic map", "A construction staking survey"],
      ["Only measurement of boundary lines", "Showing boundary, improvements, easements, rights-of-way, and encroachments", "Only a legal description", "A soil analysis"],
      ["Topographic contours only", "Boundary lines, easements, improvements, setback lines as required", "Only GPS coordinates", "Only an aerial photograph"],
      ["Ignore improvements on the property", "Show the boundary, improvements, and note any encroachments and easements", "Only measure distances", "Provide a title opinion"],
      ["A geological survey", "Boundary delineation with improvements, easements, and encroachments identified", "Only an elevation certificate", "A Phase I environmental assessment"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "ALTA/NSPS surveys require showing boundary, improvements, easements, encroachments, and rights-of-way per current standards.",
      "ALTA/NSPS surveys must show boundary, improvements, easements, rights-of-way, encroachments, and other specified items.",
      "An ALTA/NSPS survey includes boundary lines, easements, improvements, and setback lines as required by Table A items.",
      "The surveyor must show the boundary, improvements, easements, encroachments, and other items per ALTA/NSPS standards.",
      "Essential elements include boundary delineation, location of improvements, identification of easements and encroachments."
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "On a USGS topographic map, contour lines that are closer together indicate:",
      "Closely spaced contour lines on a topographic map represent:",
      "When contour lines are very close together on a topo map, the terrain is:",
      "Dense contour lines on a topographic map signify:",
      "What do tightly spaced contour lines indicate on a topographic map?"
    ],
    optionSets: [
      ["Flat terrain", "Steep terrain", "A depression", "A hilltop"],
      ["Gentle slopes", "Steep slopes", "Water features", "Roads"],
      ["Flat and level", "Steep", "Below sea level", "Forested"],
      ["Low elevation", "Steep slope or cliff", "Marshland", "Urban area"],
      ["Gradual slopes", "Steep slopes", "Flat areas", "River valleys"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "Closely spaced contour lines indicate steep terrain where elevation changes rapidly over a short horizontal distance.",
      "When contour lines are close together, the slope is steep (large elevation change over short distance).",
      "Closely spaced contours = steep terrain. Widely spaced contours = gentle terrain.",
      "Dense contour lines indicate a steep slope or cliff where elevation changes rapidly.",
      "Tightly spaced contour lines indicate steep slopes; widely spaced lines indicate gentle slopes."
    ],
    points: 10
  }
];

// ============================================================================
// BATCH 6: PROJECT MANAGEMENT & HYDROGRAPHY
// ============================================================================

export const d6_hydro_expanded_archetypes: QuestionArchetype[] = [
  {
    type: 'fill_in_blank',
    template: "Stream discharge (Q) is computed as Q = A × V. If the cross-sectional area is {A} sq ft and the average velocity is {V} ft/s, what is the discharge? Answer: ___ cfs",
    paramRanges: {
      A: [50, 80, 100, 150, 200],
      V: [2, 3, 4, 5, 6]
    },
    computeAnswer: (p) => String(p.A * p.V),
    computeExplanation: (p, ans) => `Q = A × V = ${p.A} sq ft × ${p.V} ft/s = ${ans} cfs (cubic feet per second).`,
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "Manning's equation is used to calculate:",
      "What does Manning's equation compute?",
      "Manning's formula relates flow velocity to:",
      "In open channel flow, Manning's equation determines:",
      "Manning's equation is applied to:"
    ],
    optionSets: [
      ["Water temperature", "Flow velocity in open channels based on channel characteristics", "Water pressure in pipes", "Sediment transport rates"],
      ["Groundwater flow", "Average velocity of uniform flow in open channels", "Pipe pressure loss", "Wave height"],
      ["Atmospheric pressure", "Channel roughness, hydraulic radius, and slope to velocity", "Tidal range", "Ocean currents"],
      ["Groundwater elevation", "Average flow velocity from slope, hydraulic radius, and roughness coefficient", "Water quality", "Evapotranspiration"],
      ["Closed pipe flow only", "Open channel flow velocity using slope, roughness, and hydraulic radius", "Aquifer permeability", "Precipitation rates"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "Manning's equation: V = (1/n) × R^(2/3) × S^(1/2), where n = roughness, R = hydraulic radius, S = slope.",
      "Manning's equation computes average velocity in open channels: V = (1.486/n) × R^(2/3) × S^(1/2) (US customary).",
      "Manning's formula relates channel roughness (n), hydraulic radius (R), and slope (S) to flow velocity.",
      "Manning's equation determines average flow velocity from the channel slope, hydraulic radius, and roughness coefficient.",
      "Manning's equation applies to open channel flow: V = (1.486/n) × R^(2/3) × S^(1/2) (English units)."
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "Mean Lower Low Water (MLLW) is:",
      "What does MLLW represent?",
      "MLLW is a tidal datum defined as:",
      "In hydrographic surveying, MLLW refers to:",
      "Mean Lower Low Water (MLLW) is used as:"
    ],
    optionSets: [
      ["The average of all high tides", "The average of the lower of the two daily low tides over a 19-year epoch", "The highest tide recorded", "The average of all tides"],
      ["Average high tide", "The mean of the lower low water heights over a tidal epoch", "The lowest tide ever recorded", "The average tide"],
      ["Mean of all tides", "The average height of the lower low waters over a 19-year tidal epoch", "The spring high tide", "Neap tide average"],
      ["The maximum tide height", "The average of the lower of the two daily low tides over the National Tidal Datum Epoch", "The astronomical high tide", "The storm surge level"],
      ["A topographic datum", "The primary chart datum for depths on NOAA nautical charts", "A vertical datum for land surveys only", "An obsolete reference"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "MLLW is the average of the lower of the two daily low tides computed over a 19-year tidal epoch.",
      "MLLW is the mean of the lower low water heights over a National Tidal Datum Epoch (currently 1983-2001).",
      "MLLW is the average height of the lower low waters over a 19-year tidal epoch; it is the chart datum for NOAA charts.",
      "MLLW is the average of the lower of the two daily low tides over the National Tidal Datum Epoch.",
      "MLLW is the primary chart datum for NOAA nautical charts, representing the average of lower low water heights."
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "Which instrument is commonly used for depth measurement in hydrographic surveys?",
      "Hydrographic surveys typically measure water depth using:",
      "The primary depth-measuring device in modern hydrographic surveys is:",
      "Bathymetric data is collected using:",
      "Water depth in hydrographic surveys is most commonly measured with:"
    ],
    optionSets: [
      ["A total station", "An echo sounder (sonar)", "A GPS receiver", "A theodolite"],
      ["A level and rod", "A single-beam or multibeam echo sounder", "A compass", "An EDM"],
      ["A transit", "An echo sounder (acoustic sonar)", "A measuring tape", "A laser scanner"],
      ["Photogrammetry only", "Echo sounders (single-beam or multibeam sonar)", "Ground-penetrating radar only", "Aerial LiDAR"],
      ["A plumb bob", "An echo sounder (sonar system)", "A barometer", "A clinometer"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "Echo sounders (sonar) are the primary instruments for depth measurement in hydrographic surveys.",
      "Single-beam and multibeam echo sounders use acoustic pulses to measure water depth in hydrographic surveys.",
      "Echo sounders send an acoustic pulse to the bottom and measure the return time to calculate depth.",
      "Bathymetric data is collected using echo sounders (sonar), which measure depth acoustically.",
      "Echo sounders (sonar systems) are the standard instruments for measuring water depth in hydrographic surveys."
    ],
    points: 10
  }
];

export const d7_pm_expanded_archetypes: QuestionArchetype[] = [
  {
    type: 'multiple_choice',
    questionVariants: [
      "A licensed surveyor's primary ethical obligation is to:",
      "Professional ethics for surveyors require that the surveyor:",
      "The most important ethical duty of a professional surveyor is:",
      "Surveyor ethics demand that:",
      "A professional surveyor's ethical responsibility is first to:"
    ],
    optionSets: [
      ["Maximize profit", "Protect the public welfare and provide competent service", "Complete work as fast as possible", "Always agree with the client"],
      ["Minimize costs", "Act with integrity, competence, and in the public interest", "Never refuse a project", "Compete aggressively on price"],
      ["Produce the most surveys", "Safeguard the public health, safety, and welfare", "Advertise extensively", "Delegate all field work"],
      ["The cheapest bid wins", "Competence, integrity, and public welfare come first", "Client satisfaction overrides accuracy", "Speed is more important than accuracy"],
      ["The client's financial interests", "The public welfare and professional integrity", "The surveyor's own profit", "The contractor's schedule"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "A surveyor's primary ethical obligation is to protect the public welfare and provide competent, honest service.",
      "Professional ethics require integrity, competence, and acting in the public interest above personal gain.",
      "The most important ethical duty is safeguarding public health, safety, and welfare through competent practice.",
      "Ethics demand competence, integrity, and that public welfare takes precedence over other considerations.",
      "The surveyor's ethical responsibility is first to the public welfare and professional integrity."
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "A lump sum contract in surveying means:",
      "Under a lump sum contract, the surveyor is paid:",
      "Which best describes a lump sum (fixed price) contract?",
      "A fixed-price surveying contract specifies:",
      "In a lump sum contract, the risk of cost overruns falls primarily on:"
    ],
    optionSets: [
      ["Payment is based on hourly rates", "A fixed total price is agreed upon for the defined scope of work", "Payment is per unit of measurement", "No price is set in advance"],
      ["By the hour plus materials", "A single fixed amount for the entire project", "Based on actual costs plus a percentage", "A daily rate"],
      ["Variable pricing", "A predetermined total price for the entire scope of work", "Cost plus markup", "Time and materials"],
      ["Hourly rates", "A total fixed price for the complete scope of work", "Unit prices only", "No pricing terms"],
      ["The client", "The surveyor (contractor)", "The government", "The insurance company"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "A lump sum contract specifies a fixed total price for the defined scope of work, regardless of actual costs.",
      "Under a lump sum contract, the surveyor receives a single fixed amount for the entire project.",
      "A lump sum (fixed price) contract sets a predetermined total price for the complete scope of work.",
      "A fixed-price contract specifies the total amount to be paid for the complete scope of services.",
      "In a lump sum contract, the surveyor bears the risk of cost overruns since the price is fixed."
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "Professional liability insurance for surveyors protects against:",
      "Errors and omissions (E&O) insurance for surveyors covers:",
      "Why do surveyors carry professional liability insurance?",
      "Professional liability (E&O) insurance is designed to:",
      "A surveyor's E&O insurance protects against claims arising from:"
    ],
    optionSets: [
      ["Theft of equipment", "Claims of negligence, errors, or omissions in professional services", "Auto accidents", "Workers' compensation claims"],
      ["Property damage to the office", "Financial losses from professional mistakes or negligence", "Employee injuries", "Environmental contamination"],
      ["To cover vehicle damage", "To protect against claims of professional negligence or errors", "To insure survey equipment", "To cover employee health"],
      ["Cover physical injury to the surveyor", "Protect the surveyor from financial loss due to claims of professional negligence", "Insure against theft", "Cover travel expenses"],
      ["Equipment breakdown", "Professional negligence, errors, or omissions in surveying services", "Natural disasters", "Employee disputes"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "Professional liability (E&O) insurance protects against claims of negligence, errors, or omissions in professional services.",
      "E&O insurance covers financial losses resulting from professional mistakes, errors, or negligence in surveying work.",
      "Surveyors carry E&O insurance to protect against claims that their professional work contained negligent errors.",
      "E&O insurance protects the surveyor from financial liability due to claims of professional negligence or errors.",
      "E&O insurance covers claims arising from professional negligence, errors, or omissions in the surveyor's professional services."
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "When a client requests that a surveyor alter survey results, the surveyor should:",
      "If a client pressures a surveyor to change boundary locations, the ethical response is to:",
      "A surveyor asked to falsify survey data should:",
      "The proper response when a client asks to move a boundary line is:",
      "When facing pressure to alter professional findings, a surveyor must:"
    ],
    optionSets: [
      ["Comply to keep the client happy", "Refuse and explain that altering results would be unethical and illegal", "Negotiate a compromise", "Ignore the request silently"],
      ["Agree to minor changes", "Refuse, as it would violate professional ethics and potentially the law", "Do it but document the change", "Pass the request to an employee"],
      ["Comply if well-compensated", "Refuse and report the request if necessary, as falsification violates ethical standards", "Make the change discretely", "Consult with the client's attorney"],
      ["Adjust the survey as requested", "Decline, explaining that boundaries are based on evidence and law, not client preference", "Split the difference", "Refer the client elsewhere without explanation"],
      ["Consider the financial impact first", "Maintain professional integrity and refuse to alter factual findings", "Make the change if minor", "Resign without explanation"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "A surveyor must refuse to alter survey results, as doing so violates professional ethics, standards, and potentially law.",
      "Altering boundary locations at a client's request violates professional ethics and could constitute fraud.",
      "Falsifying survey data violates ethical standards, licensing laws, and could result in loss of license and legal liability.",
      "Boundaries are based on evidence and law. A surveyor cannot move them to satisfy a client's wishes.",
      "Professional integrity requires refusing to alter factual findings, regardless of client pressure or financial incentives."
    ],
    points: 10
  }
];
