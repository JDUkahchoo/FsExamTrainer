// Question Archetype System for FS Exam Study Guide
// Generates deterministic variations from templates using seeded random

// Simple seeded random number generator (mulberry32)
function seededRandom(seed: number) {
  return function() {
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

// Pick from array using seeded random
function pickFromArray<T>(arr: T[], rng: () => number): T {
  return arr[Math.floor(rng() * arr.length)];
}

// Shuffle array deterministically
function shuffleArray<T>(arr: T[], rng: () => number): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export interface QuestionVariation {
  id: string;
  variationNumber: number;
  questionType: string;
  questionText: string;
  options: string[] | null;
  correctAnswer: string;
  explanation: string;
  points: number;
  variationGroup: number;
}

export interface FillInBlankArchetype {
  type: 'fill_in_blank';
  template: string;  // "Calculate: {a} + {b} × {c} = ___"
  paramRanges: Record<string, number[]>;  // {a: [10-20], b: [5-10], c: [2-5]}
  computeAnswer: (params: Record<string, number>) => string;
  computeExplanation: (params: Record<string, number>, answer: string) => string;
  points: number;
}

export interface MultipleChoiceArchetype {
  type: 'multiple_choice';
  questionVariants: string[];  // Alternative phrasings
  optionSets: string[][];  // Different option sets per variation
  correctAnswers: string[];  // Index per variation
  explanationVariants: string[];
  points: number;
}

export interface ConceptualFillInBlankArchetype {
  type: 'conceptual_fill_in_blank';
  questionVariants: string[];
  answerVariants: string[];
  explanationVariants: string[];
  points: number;
}

type QuestionArchetype = FillInBlankArchetype | MultipleChoiceArchetype | ConceptualFillInBlankArchetype;

// Generate variations from a computational fill-in-blank archetype
function generateFillInBlankVariations(
  archetype: FillInBlankArchetype,
  lessonId: string,
  questionIndex: number,
  variationGroup: number
): QuestionVariation[] {
  const variations: QuestionVariation[] = [];
  
  for (let v = 1; v <= 5; v++) {
    // Create seed from lesson + question + variation for determinism
    const seedValue = hashCode(`${lessonId}-q${questionIndex}-v${v}`);
    const rng = seededRandom(seedValue);
    
    // Generate params for this variation
    const params: Record<string, number> = {};
    for (const [key, range] of Object.entries(archetype.paramRanges)) {
      params[key] = pickFromArray(range, rng);
    }
    
    // Build question text by substituting params
    let text = archetype.template;
    for (const [key, value] of Object.entries(params)) {
      text = text.replace(new RegExp(`\\{${key}\\}`, 'g'), String(value));
    }
    
    const answer = archetype.computeAnswer(params);
    const explanation = archetype.computeExplanation(params, answer);
    
    variations.push({
      id: `${lessonId}-q${String(questionIndex).padStart(2, '0')}-v${v}`,
      variationNumber: v,
      questionType: 'fill_in_blank',
      questionText: text,
      options: null,
      correctAnswer: answer,
      explanation,
      points: archetype.points,
      variationGroup
    });
  }
  
  return variations;
}

// Generate variations from a multiple choice archetype
function generateMultipleChoiceVariations(
  archetype: MultipleChoiceArchetype,
  lessonId: string,
  questionIndex: number,
  variationGroup: number
): QuestionVariation[] {
  const variations: QuestionVariation[] = [];
  
  for (let v = 1; v <= 5; v++) {
    const idx = (v - 1) % archetype.questionVariants.length;
    
    variations.push({
      id: `${lessonId}-q${String(questionIndex).padStart(2, '0')}-v${v}`,
      variationNumber: v,
      questionType: 'multiple_choice',
      questionText: archetype.questionVariants[idx],
      options: archetype.optionSets[idx],
      correctAnswer: archetype.correctAnswers[idx],
      explanation: archetype.explanationVariants[idx],
      points: archetype.points,
      variationGroup
    });
  }
  
  return variations;
}

// Generate variations from a conceptual fill-in-blank archetype
function generateConceptualVariations(
  archetype: ConceptualFillInBlankArchetype,
  lessonId: string,
  questionIndex: number,
  variationGroup: number
): QuestionVariation[] {
  const variations: QuestionVariation[] = [];
  
  for (let v = 1; v <= 5; v++) {
    const idx = (v - 1) % archetype.questionVariants.length;
    
    variations.push({
      id: `${lessonId}-q${String(questionIndex).padStart(2, '0')}-v${v}`,
      variationNumber: v,
      questionType: 'fill_in_blank',
      questionText: archetype.questionVariants[idx],
      options: null,
      correctAnswer: archetype.answerVariants[idx],
      explanation: archetype.explanationVariants[idx],
      points: archetype.points,
      variationGroup
    });
  }
  
  return variations;
}

// Simple hash function for deterministic seeding
function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

// Main generator function
export function generateVariationsFromArchetype(
  archetype: QuestionArchetype,
  lessonId: string,
  questionIndex: number,
  variationGroup: number
): QuestionVariation[] {
  switch (archetype.type) {
    case 'fill_in_blank':
      return generateFillInBlankVariations(archetype, lessonId, questionIndex, variationGroup);
    case 'multiple_choice':
      return generateMultipleChoiceVariations(archetype, lessonId, questionIndex, variationGroup);
    case 'conceptual_fill_in_blank':
      return generateConceptualVariations(archetype, lessonId, questionIndex, variationGroup);
  }
}

// ============================================================================
// DOMAIN 0: MATH FOUNDATIONS - QUESTION ARCHETYPES
// ============================================================================

// Lesson 1: Basic Arithmetic and Order of Operations
export const d0_lesson01_archetypes: QuestionArchetype[] = [
  {
    type: 'fill_in_blank',
    template: "Calculate: {a} + {b} × {c} = ___",
    paramRanges: {
      a: [10, 12, 15, 18, 20],
      b: [4, 5, 6, 7, 8],
      c: [2, 3, 4, 5]
    },
    computeAnswer: (p) => String(p.a + p.b * p.c),
    computeExplanation: (p, ans) => `Following PEMDAS, multiply first: ${p.b} × ${p.c} = ${p.b * p.c}, then add: ${p.a} + ${p.b * p.c} = ${ans}`,
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "What does PEMDAS stand for?",
      "What is the correct order in PEMDAS?",
      "In order of operations, which comes first after parentheses?",
      "Which operation has higher precedence: multiplication or addition?",
      "What does the 'E' in PEMDAS represent?"
    ],
    optionSets: [
      ["Please Excuse My Dear Aunt Sally", "Priority Evaluation Math Division Addition Subtraction", "Both represent order of operations", "None of the above"],
      ["Parentheses, Exponents, Multiplication, Division, Addition, Subtraction", "Percentages, Exponents, Multiplication, Division, Addition, Subtraction", "Parentheses, Equations, Multiplication, Division, Addition, Subtraction", "Parentheses, Exponents, Measurement, Division, Addition, Subtraction"],
      ["Addition", "Exponents", "Multiplication", "Subtraction"],
      ["Addition", "Multiplication", "Both have equal precedence", "Neither"],
      ["Equations", "Estimation", "Exponents", "Evaluation"]
    ],
    correctAnswers: ["2", "0", "1", "1", "2"],
    explanationVariants: [
      "PEMDAS represents Parentheses, Exponents, Multiplication/Division, Addition/Subtraction",
      "PEMDAS: Parentheses, Exponents, Multiplication/Division (left to right), Addition/Subtraction (left to right)",
      "After parentheses, exponents are evaluated before other operations",
      "Multiplication has higher precedence than addition in PEMDAS",
      "E in PEMDAS stands for Exponents (powers and roots)"
    ],
    points: 10
  },
  {
    type: 'fill_in_blank',
    template: "Evaluate: ({a} - {b}) ÷ {c} = ___",
    paramRanges: {
      a: [15, 18, 20, 24, 30],
      b: [3, 4, 6, 8, 10],
      c: [3, 4, 5, 6]
    },
    computeAnswer: (p) => String((p.a - p.b) / p.c),
    computeExplanation: (p, ans) => `Parentheses first: (${p.a}-${p.b}) = ${p.a - p.b}, then divide: ${p.a - p.b} ÷ ${p.c} = ${ans}`,
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "In the expression 2 + 3 × 4, which operation is performed first?",
      "In the expression 5 + 6 × 2, which is performed first?",
      "In 10 - 4 ÷ 2, which operation comes first?",
      "In 8 × 2 + 6 ÷ 3, which operations are done first?",
      "In 15 - 3 + 7, which operation is performed first?"
    ],
    optionSets: [
      ["Addition", "Multiplication", "Both simultaneously", "Left to right"],
      ["Addition", "Multiplication", "Neither", "Division"],
      ["Subtraction", "Division", "Both at same time", "Left to right"],
      ["Addition only", "Multiplication and division", "Addition and subtraction", "None"],
      ["Subtraction (left to right)", "Addition", "Both simultaneously", "Neither"]
    ],
    correctAnswers: ["1", "1", "1", "1", "0"],
    explanationVariants: [
      "Multiplication has higher precedence than addition in PEMDAS",
      "Multiplication has higher precedence than addition in PEMDAS",
      "Division has higher precedence than subtraction in PEMDAS",
      "Multiplication and division are done before addition (both from left to right)",
      "Addition and subtraction have equal precedence, so work left to right: 15 - 3 = 12 first"
    ],
    points: 10
  },
  {
    type: 'fill_in_blank',
    template: "Calculate: {a} - {b} × {c} = ___",
    paramRanges: {
      a: [80, 90, 100, 120],
      b: [15, 20, 25, 30],
      c: [2, 3, 4]
    },
    computeAnswer: (p) => String(p.a - p.b * p.c),
    computeExplanation: (p, ans) => `Multiply first: ${p.b} × ${p.c} = ${p.b * p.c}, then subtract: ${p.a} - ${p.b * p.c} = ${ans}`,
    points: 10
  }
];

// Lesson 2: Fractions and Decimals
export const d0_lesson02_archetypes: QuestionArchetype[] = [
  {
    type: 'multiple_choice',
    questionVariants: [
      "Convert 3/4 to a decimal:",
      "Convert 1/4 to a decimal:",
      "Convert 2/5 to a decimal:",
      "Convert 7/8 to a decimal:",
      "Convert 3/8 to a decimal:"
    ],
    optionSets: [
      ["0.25", "0.50", "0.75", "0.80"],
      ["0.25", "0.40", "0.50", "0.75"],
      ["0.20", "0.40", "0.50", "0.60"],
      ["0.75", "0.80", "0.875", "0.90"],
      ["0.25", "0.375", "0.50", "0.625"]
    ],
    correctAnswers: ["2", "0", "1", "2", "1"],
    explanationVariants: [
      "3 ÷ 4 = 0.75",
      "1 ÷ 4 = 0.25",
      "2 ÷ 5 = 0.4",
      "7 ÷ 8 = 0.875",
      "3 ÷ 8 = 0.375"
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "What is 1/2 + 1/4?",
      "What is 1/3 + 1/6?",
      "What is 2/3 + 1/6?",
      "What is 1/4 + 1/8?",
      "What is 3/4 + 1/8?"
    ],
    optionSets: [
      ["1/6", "2/6", "3/4", "1/8"],
      ["2/6", "1/2", "2/9", "1/9"],
      ["3/9", "5/6", "1/2", "4/6"],
      ["2/12", "3/8", "1/6", "2/8"],
      ["4/12", "7/8", "5/8", "4/8"]
    ],
    correctAnswers: ["2", "1", "1", "1", "1"],
    explanationVariants: [
      "1/2 = 2/4, so 2/4 + 1/4 = 3/4",
      "1/3 = 2/6, so 2/6 + 1/6 = 3/6 = 1/2",
      "2/3 = 4/6, so 4/6 + 1/6 = 5/6",
      "1/4 = 2/8, so 2/8 + 1/8 = 3/8",
      "3/4 = 6/8, so 6/8 + 1/8 = 7/8"
    ],
    points: 10
  },
  {
    type: 'conceptual_fill_in_blank',
    questionVariants: [
      "Convert 0.625 to a fraction in lowest terms (numerator/denominator, e.g., 5/8): ___",
      "Convert 0.125 to a fraction in lowest terms: ___",
      "Convert 0.375 to a fraction in lowest terms: ___",
      "Convert 0.875 to a fraction in lowest terms: ___",
      "Convert 0.25 to a fraction in lowest terms: ___"
    ],
    answerVariants: ["5/8", "1/8", "3/8", "7/8", "1/4"],
    explanationVariants: [
      "0.625 = 625/1000 = 5/8 when reduced",
      "0.125 = 125/1000 = 1/8 when reduced",
      "0.375 = 375/1000 = 3/8 when reduced",
      "0.875 = 875/1000 = 7/8 when reduced",
      "0.25 = 25/100 = 1/4 when reduced"
    ],
    points: 10
  },
  {
    type: 'fill_in_blank',
    template: "A surveyor measures {feet}.{frac} feet. What is this in inches? (Answer as whole number)",
    paramRanges: {
      feet: [3, 4, 5, 6, 7],
      frac: [25, 50, 75]
    },
    computeAnswer: (p) => String(Math.round((p.feet + p.frac / 100) * 12)),
    computeExplanation: (p, ans) => `${p.feet}.${p.frac} feet × 12 inches/foot = ${ans} inches`,
    points: 10
  },
  {
    type: 'fill_in_blank',
    template: "Calculate: {a}.5 × {b} = ___",
    paramRanges: {
      a: [2, 3, 4, 5, 6],
      b: [4, 6, 8, 10, 12]
    },
    computeAnswer: (p) => String((p.a + 0.5) * p.b),
    computeExplanation: (p, ans) => `${p.a}.5 × ${p.b} = ${ans}`,
    points: 10
  }
];

// Lesson 3: Percentages and Ratios
export const d0_lesson03_archetypes: QuestionArchetype[] = [
  {
    type: 'fill_in_blank',
    template: "A {grade}% grade rises ___ feet per 100 feet horizontally.",
    paramRanges: {
      grade: [2, 3, 4, 5, 6, 7, 8]
    },
    computeAnswer: (p) => String(p.grade),
    computeExplanation: (p, ans) => `${p.grade}% means ${p.grade} per 100, so ${ans} feet rise`,
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "A map scale of 1:1200 means 1 inch equals:",
      "A map scale of 1:2400 means 1 inch equals:",
      "A map scale of 1:600 means 1 inch equals:",
      "A map scale of 1:4800 means 1 inch equals:",
      "A map scale of 1:240 means 1 inch equals:"
    ],
    optionSets: [
      ["12 feet", "120 feet", "1200 feet", "100 feet"],
      ["20 feet", "200 feet", "240 feet", "2400 feet"],
      ["50 feet", "60 feet", "600 feet", "6 feet"],
      ["48 feet", "400 feet", "480 feet", "4800 feet"],
      ["2 feet", "20 feet", "24 feet", "240 feet"]
    ],
    correctAnswers: ["3", "1", "0", "1", "1"],
    explanationVariants: [
      "1:1200 means 1 inch = 1200 inches = 100 feet",
      "1:2400 means 1 inch = 2400 inches = 200 feet",
      "1:600 means 1 inch = 600 inches = 50 feet",
      "1:4800 means 1 inch = 4800 inches = 400 feet",
      "1:240 means 1 inch = 240 inches = 20 feet"
    ],
    points: 10
  },
  {
    type: 'fill_in_blank',
    template: "Convert the ratio 1:{ratio} to a percentage: ___% (round to 2 decimals)",
    paramRanges: {
      ratio: [100, 200, 250, 500, 1000]
    },
    computeAnswer: (p) => (100 / p.ratio).toFixed(2),
    computeExplanation: (p, ans) => `1/${p.ratio} = ${(1/p.ratio).toFixed(4)} = ${ans}%`,
    points: 10
  },
  {
    type: 'fill_in_blank',
    template: "What is {pct}% of {value}?",
    paramRanges: {
      pct: [10, 12, 15, 20, 25],
      value: [150, 160, 200, 250, 500]
    },
    computeAnswer: (p) => String(p.pct * p.value / 100),
    computeExplanation: (p, ans) => `${p.pct/100} × ${p.value} = ${ans}`,
    points: 10
  },
  {
    type: 'fill_in_blank',
    template: "If a slope rises {rise} feet over {run} feet horizontal, the percent grade is ___%. ",
    paramRanges: {
      rise: [4, 5, 6, 8, 10, 12, 15],
      run: [100, 120, 150, 200, 250]
    },
    computeAnswer: (p) => String(Math.round(p.rise / p.run * 100)),
    computeExplanation: (p, ans) => `Grade% = (rise/run) × 100 = (${p.rise}/${p.run}) × 100 = ${ans}%`,
    points: 10
  }
];

// Lesson 4: Exponents and Radicals
export const d0_lesson04_archetypes: QuestionArchetype[] = [
  {
    type: 'fill_in_blank',
    template: "Calculate: {n}² = ___",
    paramRanges: {
      n: [5, 6, 7, 8, 9, 11, 12]
    },
    computeAnswer: (p) => String(p.n * p.n),
    computeExplanation: (p, ans) => `${p.n}² = ${p.n} × ${p.n} = ${ans}`,
    points: 10
  },
  {
    type: 'fill_in_blank',
    template: "Find: √{sq} = ___",
    paramRanges: {
      sq: [81, 100, 121, 144, 169, 196, 225]
    },
    computeAnswer: (p) => String(Math.sqrt(p.sq)),
    computeExplanation: (p, ans) => `${ans} × ${ans} = ${p.sq}, so √${p.sq} = ${ans}`,
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "What is 2³?",
      "What is 3³?",
      "What is 4³?",
      "What is 5³?",
      "What is 10³?"
    ],
    optionSets: [
      ["6", "8", "9", "12"],
      ["9", "18", "27", "36"],
      ["12", "32", "64", "48"],
      ["15", "75", "125", "150"],
      ["30", "100", "1000", "10000"]
    ],
    correctAnswers: ["1", "2", "2", "2", "2"],
    explanationVariants: [
      "2³ = 2 × 2 × 2 = 8",
      "3³ = 3 × 3 × 3 = 27",
      "4³ = 4 × 4 × 4 = 64",
      "5³ = 5 × 5 × 5 = 125",
      "10³ = 10 × 10 × 10 = 1000"
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "The distance formula contains which operation?",
      "The Pythagorean theorem uses which operations?",
      "To find the hypotenuse from legs a and b, you use:",
      "Area of a circle (πr²) uses which exponent operation?",
      "Volume of a sphere (4/3πr³) uses which exponent?"
    ],
    optionSets: [
      ["Cube root", "Square root", "Fourth power", "Logarithm"],
      ["Addition and cube root", "Squaring and square root", "Division and multiplication", "Logarithms"],
      ["a + b", "a × b", "√(a² + b²)", "(a + b)²"],
      ["Squaring", "Cubing", "Square root", "No exponent"],
      ["Square (²)", "Cube (³)", "Fourth power", "Square root"]
    ],
    correctAnswers: ["1", "1", "2", "0", "1"],
    explanationVariants: [
      "d = √[(x₂-x₁)² + (y₂-y₁)²] uses square root",
      "a² + b² = c² uses squares; solving for c uses square root",
      "Pythagorean theorem: c = √(a² + b²)",
      "r² means the radius is squared (raised to power 2)",
      "r³ means the radius is cubed (raised to power 3)"
    ],
    points: 10
  },
  {
    type: 'fill_in_blank',
    template: "Simplify: √({a} + {b}) = ___",
    paramRanges: {
      a: [9, 16, 25, 36, 64],
      b: [16, 9, 144, 64, 36]
    },
    computeAnswer: (p) => String(Math.sqrt(p.a + p.b)),
    computeExplanation: (p, ans) => `√(${p.a}+${p.b}) = √${p.a + p.b} = ${ans}`,
    points: 10
  }
];

// Lesson 5: Right Triangle Basics
export const d0_lesson05_archetypes: QuestionArchetype[] = [
  {
    type: 'multiple_choice',
    questionVariants: [
      "In a right triangle, the longest side is called:",
      "The side opposite the right angle in a right triangle is:",
      "In a right triangle, which side is always opposite the 90° angle?",
      "The two shorter sides of a right triangle are called:",
      "Which statement about right triangles is true?"
    ],
    optionSets: [
      ["Adjacent", "Opposite", "Hypotenuse", "Base"],
      ["The shortest side", "The hypotenuse", "The adjacent", "The base"],
      ["Adjacent", "Opposite", "Hypotenuse", "Leg"],
      ["Hypotenuses", "Legs", "Diagonals", "Altitudes"],
      ["All sides are equal", "Hypotenuse is the shortest", "Hypotenuse is the longest", "No side is longest"]
    ],
    correctAnswers: ["2", "1", "2", "1", "2"],
    explanationVariants: [
      "The hypotenuse is always the longest side, opposite the right angle",
      "The hypotenuse is opposite the right angle and is the longest side",
      "The hypotenuse is always opposite the right (90°) angle",
      "The two sides forming the right angle are called legs",
      "The hypotenuse is always the longest side of a right triangle"
    ],
    points: 10
  },
  {
    type: 'fill_in_blank',
    template: "If a = {a} and b = {b}, find c using Pythagorean theorem: c = ___",
    paramRanges: {
      a: [3, 5, 6, 8, 9],
      b: [4, 12, 8, 15, 12]
    },
    computeAnswer: (p) => String(Math.sqrt(p.a * p.a + p.b * p.b)),
    computeExplanation: (p, ans) => `c² = a² + b² = ${p.a*p.a} + ${p.b*p.b} = ${p.a*p.a + p.b*p.b}, so c = ${ans}`,
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "The Pythagorean theorem only works for:",
      "a² + b² = c² is valid for:",
      "Which triangle type satisfies a² + b² = c²?",
      "The Pythagorean theorem requires the triangle to have:",
      "For which triangle is the equation a² + b² = c² always true?"
    ],
    optionSets: [
      ["Any triangle", "Right triangles", "Equilateral triangles", "Isosceles triangles"],
      ["All triangles", "Only right triangles", "Only acute triangles", "Only obtuse triangles"],
      ["Equilateral", "Scalene", "Right", "Obtuse"],
      ["Three equal sides", "One 90° angle", "Two equal sides", "No specific angle"],
      ["Any 3-sided polygon", "Right triangle", "Obtuse triangle", "Acute triangle"]
    ],
    correctAnswers: ["1", "1", "2", "1", "1"],
    explanationVariants: [
      "Pythagorean theorem applies only to right triangles (90° angle)",
      "The Pythagorean theorem only applies to right triangles",
      "Only right triangles satisfy the Pythagorean relationship",
      "The theorem requires exactly one 90° (right) angle",
      "Only right triangles satisfy the Pythagorean theorem exactly"
    ],
    points: 10
  },
  {
    type: 'fill_in_blank',
    template: "In a right triangle, if one leg is {a}m and hypotenuse is {c}m, the other leg is ___ meters.",
    paramRanges: {
      a: [5, 8, 9, 7, 12],
      c: [13, 10, 15, 25, 20]
    },
    computeAnswer: (p) => String(Math.sqrt(p.c * p.c - p.a * p.a)),
    computeExplanation: (p, ans) => `b² = c² - a² = ${p.c*p.c} - ${p.a*p.a} = ${p.c*p.c - p.a*p.a}, so b = ${ans}m`,
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "Which of these is a Pythagorean triple?",
      "Which set of numbers forms a Pythagorean triple?",
      "Which of these satisfies a² + b² = c²?",
      "Identify the Pythagorean triple:",
      "Which combination is a valid Pythagorean triple?"
    ],
    optionSets: [
      ["2, 3, 4", "5, 12, 13", "7, 8, 9", "10, 11, 12"],
      ["4, 5, 6", "3, 4, 5", "6, 7, 8", "1, 2, 3"],
      ["6, 7, 8", "7, 24, 25", "9, 10, 11", "4, 6, 8"],
      ["8, 15, 17", "9, 12, 14", "10, 12, 15", "6, 9, 12"],
      ["5, 6, 7", "11, 60, 61", "12, 15, 18", "8, 10, 12"]
    ],
    correctAnswers: ["1", "1", "1", "0", "1"],
    explanationVariants: [
      "5² + 12² = 25 + 144 = 169 = 13²",
      "3² + 4² = 9 + 16 = 25 = 5²",
      "7² + 24² = 49 + 576 = 625 = 25²",
      "8² + 15² = 64 + 225 = 289 = 17²",
      "11² + 60² = 121 + 3600 = 3721 = 61²"
    ],
    points: 10
  }
];

// Lesson 6: Angle Measurement Systems
export const d0_lesson06_archetypes: QuestionArchetype[] = [
  {
    type: 'fill_in_blank',
    template: "Convert {deg}.5° to degrees and minutes: {deg}° ___'",
    paramRanges: { deg: [25, 30, 35, 45, 60] },
    computeAnswer: (p) => "30",
    computeExplanation: (p, ans) => `0.5° × 60'/degree = 30', so ${p.deg}.5° = ${p.deg}°30'`,
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "How many seconds are in 1 degree?",
      "How many minutes are in 1 degree?",
      "How many degrees are in a right angle?",
      "A full circle contains how many degrees?",
      "How many seconds are in 1 minute of arc?"
    ],
    optionSets: [
      ["60", "360", "3600", "100"],
      ["30", "60", "90", "100"],
      ["45", "60", "90", "180"],
      ["180°", "270°", "360°", "400°"],
      ["30", "60", "100", "360"]
    ],
    correctAnswers: ["2", "1", "2", "2", "1"],
    explanationVariants: [
      "1° = 60' = 60 × 60\" = 3600\"",
      "1° = 60 minutes of arc",
      "A right angle = 90°",
      "A complete circle = 360 degrees",
      "1' = 60 seconds of arc"
    ],
    points: 10
  },
  {
    type: 'fill_in_blank',
    template: "Convert {deg}°{min}' to decimal degrees: ___° (round to 2 decimals)",
    paramRanges: { deg: [30, 45, 60, 75, 90], min: [15, 30, 45] },
    computeAnswer: (p) => (p.deg + p.min / 60).toFixed(2),
    computeExplanation: (p, ans) => `${p.min}'/60 = ${(p.min/60).toFixed(4)}°, so ${p.deg}°${p.min}' = ${ans}°`,
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "In surveying, angles are typically measured in:",
      "The DMS format stands for:",
      "Which unit is NOT used for angle measurement?",
      "Decimal degrees convert minutes by:",
      "A bearing of N45°E is equivalent to:"
    ],
    optionSets: [
      ["Radians", "Degrees", "Gradians", "Milliradians"],
      ["Distance-Measurement-System", "Degrees-Minutes-Seconds", "Digital-Map-Survey", "Direction-Magnitude-Sign"],
      ["Degrees", "Gradians", "Meters", "Radians"],
      ["Dividing by 60", "Multiplying by 60", "Dividing by 100", "Multiplying by 100"],
      ["45° from north toward east", "45° from east toward north", "Northeast exactly", "45° azimuth"]
    ],
    correctAnswers: ["1", "1", "2", "0", "0"],
    explanationVariants: [
      "Surveyors primarily use degrees for angle measurements",
      "DMS = Degrees-Minutes-Seconds format for angle notation",
      "Meters measure distance, not angles",
      "To convert minutes to decimal degrees, divide by 60",
      "N45°E means 45 degrees measured from north toward east"
    ],
    points: 10
  },
  {
    type: 'fill_in_blank',
    template: "Convert {min}' (minutes) to decimal degrees: ___° (round to 2 decimals)",
    paramRanges: { min: [12, 15, 20, 24, 30, 36, 45] },
    computeAnswer: (p) => (p.min / 60).toFixed(2),
    computeExplanation: (p, ans) => `${p.min}'/60 = ${ans}°`,
    points: 10
  }
];

// Lesson 7: Basic Geometry Shapes
export const d0_lesson07_archetypes: QuestionArchetype[] = [
  {
    type: 'fill_in_blank',
    template: "The perimeter of a rectangle with length {l}m and width {w}m is ___ meters.",
    paramRanges: { l: [15, 20, 25, 30], w: [10, 12, 15, 18] },
    computeAnswer: (p) => String(2 * (p.l + p.w)),
    computeExplanation: (p, ans) => `Perimeter = 2(L+W) = 2(${p.l}+${p.w}) = 2(${p.l+p.w}) = ${ans}m`,
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "The area of a circle is calculated using:",
      "The circumference of a circle is:",
      "The diameter of a circle is:",
      "If radius = 5, area = π × ___",
      "What is the relationship between radius and diameter?"
    ],
    optionSets: [
      ["πr", "πr²", "2πr", "πd"],
      ["πr", "πr²", "2πr", "πd²"],
      ["r/2", "2r", "πr", "r²"],
      ["5", "10", "25", "50"],
      ["d = r/2", "d = 2r", "d = πr", "d = r²"]
    ],
    correctAnswers: ["1", "2", "1", "2", "1"],
    explanationVariants: [
      "Area of circle = πr² where r is radius",
      "Circumference = 2πr = πd",
      "Diameter = 2 × radius",
      "Area = πr² = π × 5² = π × 25",
      "Diameter is twice the radius: d = 2r"
    ],
    points: 10
  },
  {
    type: 'fill_in_blank',
    template: "A square with side length {s}m has an area of ___ square meters.",
    paramRanges: { s: [6, 7, 8, 9, 10, 11, 12] },
    computeAnswer: (p) => String(p.s * p.s),
    computeExplanation: (p, ans) => `Area = s² = ${p.s}² = ${ans} m²`,
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "The formula for the area of a triangle is:",
      "A triangle with base 10m and height 6m has area:",
      "The perimeter of a triangle with sides 3, 4, 5 is:",
      "An equilateral triangle has:",
      "The sum of angles in any triangle is:"
    ],
    optionSets: [
      ["base × height", "½ × base × height", "base + height", "base² × height"],
      ["60 m²", "30 m²", "16 m²", "20 m²"],
      ["12m", "15m", "20m", "7m"],
      ["No equal sides", "Two equal sides", "Three equal sides", "One right angle"],
      ["90°", "180°", "270°", "360°"]
    ],
    correctAnswers: ["1", "1", "0", "2", "1"],
    explanationVariants: [
      "Area of triangle = ½ × base × height",
      "Area = ½ × 10 × 6 = 30 m²",
      "Perimeter = 3 + 4 + 5 = 12m",
      "Equilateral triangles have three equal sides",
      "The angles of any triangle sum to 180°"
    ],
    points: 10
  },
  {
    type: 'fill_in_blank',
    template: "A trapezoid with parallel sides {b1}m and {b2}m and height {h}m has area ___ square meters.",
    paramRanges: { b1: [8, 10, 12], b2: [12, 14, 16], h: [5, 6, 8] },
    computeAnswer: (p) => String((p.b1 + p.b2) * p.h / 2),
    computeExplanation: (p, ans) => `Area = ½(b₁+b₂)h = ½(${p.b1}+${p.b2})(${p.h}) = ½(${p.b1+p.b2})(${p.h}) = ${ans} m²`,
    points: 10
  }
];

// Lesson 8: Linear Equations and Graphing
export const d0_lesson08_archetypes: QuestionArchetype[] = [
  {
    type: 'fill_in_blank',
    template: "In the equation y = {m}x + {b}, the slope is ___.",
    paramRanges: { m: [2, 3, 4, 5, 6], b: [1, 3, 5, 7, 10] },
    computeAnswer: (p) => String(p.m),
    computeExplanation: (p, ans) => `In y = mx + b format, m is the slope, so slope = ${ans}`,
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "Solve for x: 5x - 10 = 20",
      "Solve for x: 3x + 6 = 18",
      "Solve for x: 4x - 8 = 24",
      "Solve for x: 6x + 12 = 42",
      "Solve for x: 2x - 4 = 16"
    ],
    optionSets: [
      ["x = 2", "x = 4", "x = 6", "x = 8"],
      ["x = 2", "x = 4", "x = 6", "x = 8"],
      ["x = 4", "x = 6", "x = 8", "x = 10"],
      ["x = 4", "x = 5", "x = 6", "x = 7"],
      ["x = 6", "x = 8", "x = 10", "x = 12"]
    ],
    correctAnswers: ["2", "1", "2", "1", "2"],
    explanationVariants: [
      "5x = 30, so x = 6",
      "3x = 12, so x = 4",
      "4x = 32, so x = 8",
      "6x = 30, so x = 5",
      "2x = 20, so x = 10"
    ],
    points: 10
  },
  {
    type: 'conceptual_fill_in_blank',
    questionVariants: [
      "In y = mx + b, the b represents the ___-intercept.",
      "In y = mx + b, the m represents the ___.",
      "The point where a line crosses the y-axis is the ___-intercept.",
      "The steepness of a line is called its ___.",
      "Two parallel lines have the same ___."
    ],
    answerVariants: ["y", "slope", "y", "slope", "slope"],
    explanationVariants: [
      "b is the y-intercept (value of y when x = 0)",
      "m is the slope (rise over run)",
      "The y-intercept is where the line crosses the y-axis",
      "Slope measures how steep a line is",
      "Parallel lines have equal slopes but different y-intercepts"
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "A line with slope 0 is:",
      "A vertical line has:",
      "A line going up from left to right has:",
      "If slope = -2, the line:",
      "A horizontal line has equation:"
    ],
    optionSets: [
      ["Vertical", "Horizontal", "Diagonal", "Undefined"],
      ["Slope = 0", "Undefined slope", "Positive slope", "Negative slope"],
      ["Positive slope", "Negative slope", "Zero slope", "Undefined slope"],
      ["Goes up", "Goes down", "Is horizontal", "Is vertical"],
      ["x = constant", "y = constant", "y = x", "x = y"]
    ],
    correctAnswers: ["1", "1", "0", "1", "1"],
    explanationVariants: [
      "Slope 0 means no rise, creating a horizontal line",
      "Vertical lines have undefined (infinite) slope",
      "Lines rising left to right have positive slope",
      "Negative slope means the line goes down from left to right",
      "Horizontal lines have equation y = constant (same y for all x)"
    ],
    points: 10
  },
  {
    type: 'fill_in_blank',
    template: "Solve: {a}x + {b} = {c}. x = ___",
    paramRanges: { a: [2, 3, 4, 5], b: [4, 6, 8, 10], c: [16, 18, 20, 24, 28, 30] },
    computeAnswer: (p) => String((p.c - p.b) / p.a),
    computeExplanation: (p, ans) => `${p.a}x = ${p.c - p.b}, so x = ${ans}`,
    points: 10
  }
];

// Lesson 9: Scientific Calculator Operations
export const d0_lesson09_archetypes: QuestionArchetype[] = [
  {
    type: 'multiple_choice',
    questionVariants: [
      "For angle calculations in surveying, the calculator should be in which mode?",
      "When calculating sin(45°), your calculator must be in:",
      "To get correct trigonometric results in surveying:",
      "Radians vs degrees: surveyors typically use:",
      "Before using sin, cos, tan functions, check your calculator is in:"
    ],
    optionSets: [
      ["Radians", "Degrees", "Gradians", "Either A or B"],
      ["Radian mode", "Degree mode", "Gradian mode", "Any mode"],
      ["Set to radians", "Set to degrees", "Mode doesn't matter", "Use natural log"],
      ["Radians", "Degrees", "Gradians", "All equally"],
      ["Radian mode", "Degree mode", "Scientific notation", "Fix mode"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "Surveyors primarily use degrees for angle measurements",
      "For degree input, calculator must be in degree mode",
      "Surveying uses degrees, so set calculator to degree mode",
      "Surveyors work in degrees, not radians",
      "Trigonometric functions require correct angle mode"
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "The sin⁻¹ button calculates:",
      "The cos⁻¹ function returns:",
      "arctan(1) equals:",
      "The inverse trig functions output:",
      "tan⁻¹ is also called:"
    ],
    optionSets: [
      ["1 divided by sine", "Arcsine (inverse sine)", "Sine squared", "Negative sine"],
      ["1/cosine", "The angle whose cosine is the input", "Cosine squared", "-cos"],
      ["0°", "45°", "90°", "180°"],
      ["Side lengths", "Angles", "Ratios", "Areas"],
      ["Cotangent", "Arctangent", "Tangent squared", "Negative tangent"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "sin⁻¹ is the inverse sine function (arcsin), not 1/sin",
      "cos⁻¹ returns the angle whose cosine equals the input value",
      "arctan(1) = 45° because tan(45°) = 1",
      "Inverse trig functions convert ratios back to angles",
      "tan⁻¹ is the arctangent function"
    ],
    points: 10
  },
  {
    type: 'conceptual_fill_in_blank',
    questionVariants: [
      "To calculate 15², you enter 15 then press the ___ button (two characters).",
      "To find √25, you enter 25 then press the ___ button.",
      "The button for cube root is typically labeled ___.",
      "To raise a number to any power, use the ___ button.",
      "The reciprocal button (1/x) calculates the ___ of a number."
    ],
    answerVariants: ["x²", "√x", "∛x", "yˣ", "reciprocal"],
    explanationVariants: [
      "The x² button squares the displayed value",
      "The √x or √ button calculates square root",
      "The ∛x or ³√ button calculates cube root",
      "The yˣ or ^ button raises to any power",
      "1/x gives the reciprocal (multiplicative inverse)"
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "Memory functions (M+, MR, MC) are useful for:",
      "The STO button does what?",
      "The RCL button:",
      "Fix mode on a calculator:",
      "EE or EXP button enters:"
    ],
    optionSets: [
      ["Storing intermediate values", "Faster calculations", "Both A and B", "Neither"],
      ["Stores current value", "Recalls stored value", "Clears memory", "Calculates storage"],
      ["Records calculations", "Recalls stored value", "Resets calculator", "Changes mode"],
      ["Makes calculations faster", "Sets decimal places shown", "Fixes errors", "Locks buttons"],
      ["Exponential function", "Scientific notation", "Natural log", "Euler's number"]
    ],
    correctAnswers: ["2", "0", "1", "1", "1"],
    explanationVariants: [
      "Memory stores values for multi-step calculations, speeding up work",
      "STO (Store) saves the current display value to memory",
      "RCL (Recall) retrieves the stored value from memory",
      "Fix mode displays a fixed number of decimal places",
      "EE/EXP enters numbers in scientific notation (×10ⁿ)"
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "When entering coordinates, which mode preserves trailing zeros?",
      "To show 3 decimal places always, use:",
      "For engineering notation, use:",
      "Normal (NORM) mode shows:",
      "Scientific mode displays numbers as:"
    ],
    optionSets: [
      ["Fix mode", "Sci mode", "Norm mode", "All modes"],
      ["Normal mode", "Scientific mode", "Fix 3 mode", "Degree mode"],
      ["Fix mode", "Normal mode", "Engineering mode", "Stat mode"],
      ["Full precision", "Fixed decimals", "Scientific notation", "Rounded values"],
      ["a × 10ⁿ format", "Full digits", "Fixed decimals", "Fractions"]
    ],
    correctAnswers: ["0", "2", "2", "0", "0"],
    explanationVariants: [
      "Fix mode displays a fixed number of decimal places",
      "Fix 3 shows exactly 3 decimal places",
      "Engineering mode uses powers of 10 that are multiples of 3",
      "Normal mode shows full precision without trailing zeros",
      "Scientific mode shows numbers as a × 10ⁿ"
    ],
    points: 10
  }
];

// Lesson 10: Significant Figures and Rounding
export const d0_lesson10_archetypes: QuestionArchetype[] = [
  {
    type: 'fill_in_blank',
    template: "Round {n}.{d1}{d2}{d3} to 2 decimal places: ___",
    paramRanges: { n: [42, 45, 56, 78, 89], d1: [3, 5, 6, 7, 8], d2: [2, 4, 5, 6, 8], d3: [3, 5, 7, 8, 9] },
    computeAnswer: (p) => {
      const num = p.n + p.d1/10 + p.d2/100 + p.d3/1000;
      return num.toFixed(2);
    },
    computeExplanation: (p, ans) => `The third decimal is ${p.d3}, so round accordingly: ${ans}`,
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "How many significant figures are in 0.00450?",
      "How many significant figures are in 1200?",
      "How many significant figures are in 3.040?",
      "How many significant figures are in 0.0050?",
      "How many significant figures are in 2.00?"
    ],
    optionSets: [
      ["2", "3", "4", "5"],
      ["2", "3", "4", "Ambiguous"],
      ["2", "3", "4", "5"],
      ["1", "2", "3", "4"],
      ["1", "2", "3", "4"]
    ],
    correctAnswers: ["1", "3", "2", "1", "2"],
    explanationVariants: [
      "Leading zeros don't count. 4, 5, 0 = 3 sig figs",
      "1200 is ambiguous - could be 2, 3, or 4 sig figs depending on notation",
      "3.040 has 4 sig figs - the trailing zero after decimal counts",
      "Leading zeros don't count. 5, 0 = 2 sig figs",
      "2.00 has 3 sig figs - trailing zeros after decimal count"
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "When multiplying measurements, the result should have significant figures equal to:",
      "When adding measurements, precision is determined by:",
      "The rule for division with sig figs is:",
      "Rounding 2.5 to the nearest integer using round-half-up:",
      "Which has more precision: 2.50 or 2.5?"
    ],
    optionSets: [
      ["The sum of sig figs", "The measurement with most sig figs", "The measurement with fewest sig figs", "Always 3"],
      ["The most decimal places", "The fewest decimal places", "The most sig figs", "The fewest sig figs"],
      ["Same as multiplication", "Add the sig figs", "Use the maximum", "Always 4"],
      ["2", "3", "2.5", "Either 2 or 3"],
      ["2.50", "2.5", "They're equal", "Cannot determine"]
    ],
    correctAnswers: ["2", "1", "0", "1", "0"],
    explanationVariants: [
      "Product has sig figs of least precise measurement",
      "Addition/subtraction: result matches least precise decimal place",
      "Division follows the same rule as multiplication - use fewest sig figs",
      "Round-half-up: 2.5 rounds to 3",
      "2.50 shows 3 sig figs; 2.5 shows 2 sig figs"
    ],
    points: 10
  },
  {
    type: 'fill_in_blank',
    template: "Round {n} to the nearest ten: ___",
    paramRanges: { n: [123, 127, 145, 168, 175, 182, 195] },
    computeAnswer: (p) => String(Math.round(p.n / 10) * 10),
    computeExplanation: (p, ans) => `${p.n} rounded to nearest ten is ${ans}`,
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "A distance measured as 345.67 feet has how many significant figures?",
      "An angle of 45.250° has how many significant figures?",
      "A measurement of 0.0034 m has how many significant figures?",
      "The value 1.00 × 10³ has how many significant figures?",
      "A chain length of 66.00 feet has how many significant figures?"
    ],
    optionSets: [
      ["3", "4", "5", "6"],
      ["3", "4", "5", "6"],
      ["1", "2", "3", "4"],
      ["1", "2", "3", "4"],
      ["2", "3", "4", "5"]
    ],
    correctAnswers: ["2", "2", "1", "2", "2"],
    explanationVariants: [
      "All digits 3, 4, 5, 6, 7 are significant = 5 sig figs",
      "All digits 4, 5, 2, 5, 0 are significant = 5 sig figs",
      "Leading zeros don't count. 3, 4 = 2 sig figs",
      "In scientific notation, 1.00 has 3 sig figs",
      "66.00 has 4 sig figs - trailing zeros after decimal count"
    ],
    points: 10
  }
];

// ============================================================================
// DOMAIN 1: SURVEYING PROCESSES AND METHODS - QUESTION ARCHETYPES
// ============================================================================

// Lesson 1: Total Station Setup and Operation
export const d1_lesson01_archetypes: QuestionArchetype[] = [
  {
    type: 'multiple_choice',
    questionVariants: [
      "What is the first step when setting up a total station?",
      "Before leveling a total station, you must first:",
      "The initial step in total station setup is to:",
      "When beginning a total station setup, the first action is:",
      "Prior to turning on a total station, you should:"
    ],
    optionSets: [
      ["Turn on the instrument", "Level the instrument", "Set up over the point", "Take a backsight"],
      ["Turn on the instrument", "Take measurements", "Set up the tripod over the point", "Enter coordinates"],
      ["Level the circular bubble", "Set up tripod over the point", "Turn on the display", "Take a foresight"],
      ["Calibrate the EDM", "Initialize the prism", "Set up tripod centered over the point", "Enter temperature"],
      ["Level the instrument", "Set up tripod over the point", "Take a backsight", "Calibrate"]
    ],
    correctAnswers: ["2", "2", "1", "2", "1"],
    explanationVariants: [
      "First set up tripod over the point, then level, then turn on",
      "The tripod must be set up over the point before any leveling can occur",
      "Setting up the tripod over the point is always the first step",
      "Centering over the point comes first, then leveling and turning on",
      "The tripod must be positioned over the point before instrument setup"
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "The bubble in a circular level should be:",
      "For a properly leveled instrument, the circular bubble is:",
      "When leveling a total station, the circular level bubble should be:",
      "A circular level is properly adjusted when the bubble is:",
      "The circular vial bubble indicates level when it is:"
    ],
    optionSets: [
      ["At the edge", "Centered", "Slightly off center", "It doesn't matter"],
      ["Touching the ring", "Centered in the circle", "Moving freely", "Fixed in place"],
      ["Near the edge", "Within the center circle", "Outside the lines", "Stationary anywhere"],
      ["At the edge of the vial", "Centered", "Barely visible", "Compressed"],
      ["Free floating", "Centered within the circle", "At any position", "Near the edge"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "The bubble must be centered to ensure the instrument is level",
      "A centered bubble indicates the instrument is level",
      "The circular level is satisfied when the bubble is centered",
      "Centering the bubble means the instrument base is horizontal",
      "The centered position indicates proper leveling"
    ],
    points: 10
  },
  {
    type: 'fill_in_blank',
    template: "Most total stations measure angles to the nearest {precision} seconds.",
    paramRanges: {
      precision: [1, 2, 3, 5]
    },
    computeAnswer: (p) => String(p.precision),
    computeExplanation: (p, ans) => `Modern total stations typically measure to ${ans}" precision or better`,
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "What is a backsight in surveying?",
      "A backsight reading is taken to:",
      "In total station surveying, a backsight refers to:",
      "The purpose of taking a backsight is to:",
      "A backsight is best described as:"
    ],
    optionSets: [
      ["Looking backward", "A sight to a known point", "An error check", "A type of prism"],
      ["Check for errors", "Orient the instrument to a known point", "Measure elevation", "Calculate distance"],
      ["A measurement to an unknown point", "A reference sight to a known control point", "A vertical angle only", "A distance-only reading"],
      ["Measure the unknown point", "Establish orientation to known coordinates", "Check the battery", "Calibrate the EDM"],
      ["A forward measurement", "A reference reading to a known point for orientation", "An elevation reading", "A random check point"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "A backsight is a reading to a known control point to orient the instrument",
      "Backsights orient the instrument by referencing known coordinates",
      "The backsight establishes direction by sighting a known control point",
      "Taking a backsight orients the horizontal circle to known coordinates",
      "Backsights provide orientation by sighting known control points"
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "EDM stands for:",
      "What does the acronym EDM represent?",
      "The abbreviation EDM in surveying means:",
      "EDM technology refers to:",
      "In total stations, EDM represents:"
    ],
    optionSets: [
      ["Electronic Data Management", "Electronic Distance Measurement", "Elevation Data Mapping", "Error Detection Mode"],
      ["Electronic Distance Measurement", "Elevation Data Module", "External Data Memory", "Electronic Data Management"],
      ["Estimated Distance Method", "Electronic Distance Measurement", "Elevation Distance Meter", "Error Detection Module"],
      ["Electronic Distance Measurement", "Elevated Distance Marker", "Electronic Data Mode", "External Distance Module"],
      ["Encoded Distance Meter", "Electronic Distance Measurement", "Elevation Difference Method", "Error Distance Measurement"]
    ],
    correctAnswers: ["1", "0", "1", "0", "1"],
    explanationVariants: [
      "EDM (Electronic Distance Measurement) is the laser/infrared system in total stations",
      "Electronic Distance Measurement uses electromagnetic waves to measure distances",
      "EDM technology measures distances using light or infrared signals",
      "EDM components measure slope distances electronically",
      "Electronic Distance Measurement is the core ranging technology"
    ],
    points: 10
  }
];

// Lesson 2: Differential Leveling Procedures
export const d1_lesson02_archetypes: QuestionArchetype[] = [
  {
    type: 'multiple_choice',
    questionVariants: [
      "In differential leveling, BS stands for:",
      "The abbreviation BS in leveling means:",
      "BS in a level circuit refers to:",
      "What does BS represent in leveling field notes?",
      "In leveling terminology, BS indicates:"
    ],
    optionSets: [
      ["Benchmark Station", "Backsight", "Baseline", "Bottom Sight"],
      ["Backsight", "Baseline Survey", "Benchmark Set", "Bottom of Staff"],
      ["Back Survey", "Backsight", "Bench Setup", "Base Station"],
      ["Benchmark Survey", "Baseline", "Backsight", "Beginning Station"],
      ["Backsight", "Base Setup", "Benchmark Sign", "Beginning Sight"]
    ],
    correctAnswers: ["1", "0", "1", "2", "0"],
    explanationVariants: [
      "BS = Backsight, a rod reading on a point of known or previously determined elevation",
      "Backsight is the rod reading taken on a point of known elevation",
      "BS is the backsight reading used to establish height of instrument",
      "Backsight readings are taken to known elevation points",
      "BS refers to backsight - a reading on a known elevation point"
    ],
    points: 10
  },
  {
    type: 'fill_in_blank',
    template: "If HI (height of instrument) = {hi}.{hd}m and FS (foresight) = {fs}.{fd}m, the elevation is ___ meters.",
    paramRanges: {
      hi: [104, 105, 106, 107, 108],
      hd: [20, 30, 40, 50, 60],
      fs: [1, 2, 3],
      fd: [10, 20, 30, 40, 50]
    },
    computeAnswer: (p) => {
      const hi = p.hi + p.hd / 100;
      const fs = p.fs + p.fd / 100;
      return (hi - fs).toFixed(2);
    },
    computeExplanation: (p, ans) => `Elevation = HI - FS = ${p.hi}.${p.hd} - ${p.fs}.${p.fd} = ${ans}m`,
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "A turning point (TP) is used to:",
      "The purpose of a turning point in leveling is to:",
      "Turning points in differential leveling serve to:",
      "A TP in leveling is used to:",
      "Why are turning points used in level circuits?"
    ],
    optionSets: [
      ["Change direction", "Transfer elevation", "Mark boundaries", "Indicate errors"],
      ["Transfer elevation between setups", "Mark property corners", "Change instruments", "Record errors"],
      ["Change direction of survey", "Transfer elevation forward", "Locate benchmarks", "Indicate slope"],
      ["Mark the end of survey", "Transfer elevation", "Change operators", "Store equipment"],
      ["To mark boundaries", "To transfer elevation between instrument setups", "To indicate errors", "To end the survey"]
    ],
    correctAnswers: ["1", "0", "1", "1", "1"],
    explanationVariants: [
      "TP transfers elevation from one setup to the next in a level circuit",
      "Turning points allow elevation to be carried forward between instrument setups",
      "TPs transfer elevation when the instrument must be moved",
      "Turning points bridge between instrument setups to transfer elevation",
      "TPs allow elevation transfer when changing instrument positions"
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "The height of instrument (HI) is calculated by:",
      "To calculate HI, you use:",
      "HI in differential leveling equals:",
      "The formula for height of instrument is:",
      "Height of instrument is determined by:"
    ],
    optionSets: [
      ["Elevation + BS", "Elevation - BS", "Elevation + FS", "Elevation - FS"],
      ["Known elevation + Backsight", "Known elevation - Backsight", "Known elevation + Foresight", "Known elevation - Foresight"],
      ["Elevation + Backsight", "Elevation - Foresight", "Backsight + Foresight", "Backsight - Foresight"],
      ["Elevation plus Backsight", "Elevation minus Backsight", "Foresight plus Elevation", "Foresight minus Backsight"],
      ["Adding backsight to known elevation", "Subtracting backsight from elevation", "Adding foresight to elevation", "Subtracting foresight"]
    ],
    correctAnswers: ["0", "0", "0", "0", "0"],
    explanationVariants: [
      "HI = Known Elevation + Backsight reading",
      "Height of instrument = elevation of point + backsight rod reading",
      "HI is the known elevation plus the backsight reading on that point",
      "Add the backsight reading to the known elevation to get HI",
      "HI = Elevation + BS is the fundamental leveling equation"
    ],
    points: 10
  },
  {
    type: 'fill_in_blank',
    template: "If BM elevation = {elev}.00m and BS = {bs}.{bsd}m, the HI = ___ meters.",
    paramRanges: {
      elev: [98, 99, 100, 101, 102],
      bs: [1, 2],
      bsd: [20, 30, 40, 50, 60, 70]
    },
    computeAnswer: (p) => {
      const result = p.elev + p.bs + p.bsd / 100;
      return result.toFixed(2);
    },
    computeExplanation: (p, ans) => `HI = Elevation + BS = ${p.elev}.00 + ${p.bs}.${p.bsd} = ${ans}m`,
    points: 10
  }
];

// Lesson 3: Traverse Methods and Types
export const d1_lesson03_archetypes: QuestionArchetype[] = [
  {
    type: 'multiple_choice',
    questionVariants: [
      "Which traverse type allows for mathematical error checking?",
      "Mathematical closure can be computed for which traverse type?",
      "Error checking through closure is possible with:",
      "Which type of traverse can be checked for closure error?",
      "Angular and linear misclosure can be calculated in:"
    ],
    optionSets: [
      ["Open traverse", "Closed traverse", "Random traverse", "All types"],
      ["Open traverse", "Closed traverse", "Radial traverse", "None"],
      ["Any traverse", "Open traverse only", "Closed traverse only", "Neither type"],
      ["Open only", "Closed only", "Both types", "Neither"],
      ["Open traverse", "Closed traverse", "Chain traverse", "Random traverse"]
    ],
    correctAnswers: ["1", "1", "2", "1", "1"],
    explanationVariants: [
      "Closed traverses return to starting point or close to known points, allowing error calculation",
      "Closed traverses allow computation of angular and linear misclosure",
      "Only closed traverses provide closure for error checking",
      "Closed traverses enable mathematical verification through closure",
      "Closed traverses allow error checking by computing misclosure"
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "In a closed loop traverse, the sum of interior angles should equal:",
      "The sum of interior angles in an n-sided polygon is:",
      "For a polygon traverse with n sides, interior angles sum to:",
      "Interior angle sum for a closed traverse with n vertices is:",
      "The theoretical sum of interior angles for n-sided figure is:"
    ],
    optionSets: [
      ["(n-2)×180°", "n×180°", "(n+2)×180°", "360°"],
      ["(n-2)×180°", "n×360°", "(n+2)×180°", "n×90°"],
      ["n×180°", "(n-2)×180°", "(n+1)×180°", "360°×n"],
      ["(n-2)×180°", "(n+2)×180°", "n×180°", "180°"],
      ["(n-2)×180°", "(n-1)×180°", "n×180°", "(n+2)×90°"]
    ],
    correctAnswers: ["0", "0", "1", "0", "0"],
    explanationVariants: [
      "For n-sided polygon: sum = (n-2)×180°",
      "The interior angle sum formula is (n-2)×180°",
      "Interior angles of an n-sided polygon sum to (n-2)×180°",
      "The formula (n-2)×180° gives the theoretical angle sum",
      "Sum of interior angles = (n-2) times 180 degrees"
    ],
    points: 10
  },
  {
    type: 'fill_in_blank',
    template: "A traverse with {n} sides should have interior angles summing to ___ degrees.",
    paramRanges: {
      n: [4, 5, 6, 7, 8]
    },
    computeAnswer: (p) => String((p.n - 2) * 180),
    computeExplanation: (p, ans) => `(${p.n}-2)×180° = ${p.n - 2}×180° = ${ans}°`,
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "What is measured at each traverse station?",
      "At each traverse point, surveyors measure:",
      "Traverse stations require measurement of:",
      "Data collected at each traverse station includes:",
      "A complete traverse observation includes:"
    ],
    optionSets: [
      ["Only angles", "Only distances", "Both angles and distances", "Elevations"],
      ["Distances only", "Angles only", "Both horizontal angles and distances", "GPS coordinates"],
      ["Angles only", "Both angles and distances", "Elevations only", "Azimuths only"],
      ["Angles and distances", "Bearings only", "Coordinates only", "Elevations only"],
      ["Only directions", "Both horizontal angles and distances", "GPS positions", "Only slopes"]
    ],
    correctAnswers: ["2", "2", "1", "0", "1"],
    explanationVariants: [
      "Traverses require both horizontal angles and distances between stations",
      "Both horizontal angles and distances are measured at each station",
      "Complete traverse data includes angles and distances",
      "Traverse measurements consist of angles and distances",
      "Horizontal angles and distances define traverse legs"
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "An open traverse terminates at:",
      "Open traverses end at:",
      "The terminal point of an open traverse is:",
      "An open traverse concludes at:",
      "Open traverse surveys terminate at:"
    ],
    optionSets: [
      ["Starting point", "Another known point", "An unknown point", "Either B or C"],
      ["The beginning", "A known control point", "An unknown point", "Any convenient point"],
      ["The starting point", "A benchmark", "An unknown location", "A known point"],
      ["A monument", "The origin", "An unknown point", "A control station"],
      ["Control point", "Unknown point", "Starting point", "Benchmark"]
    ],
    correctAnswers: ["2", "2", "2", "2", "1"],
    explanationVariants: [
      "Open traverses do not close on known points, preventing error checking",
      "Open traverses terminate at unknown points without closure",
      "The endpoint of an open traverse is not a known control point",
      "Open traverses end at points without known coordinates",
      "Open traverses terminate without connecting to known control"
    ],
    points: 10
  }
];

// Lesson 4: Control Surveys and Networks
export const d1_lesson04_archetypes: QuestionArchetype[] = [
  {
    type: 'multiple_choice',
    questionVariants: [
      "Horizontal control establishes:",
      "The purpose of horizontal control is to establish:",
      "Horizontal control surveys determine:",
      "Horizontal control provides:",
      "A horizontal control network establishes:"
    ],
    optionSets: [
      ["Elevations", "Positions (coordinates)", "Both A and B", "Neither"],
      ["Elevation values", "X and Y coordinates", "Depths", "Volumes"],
      ["Heights only", "Position coordinates", "Slopes", "Contours"],
      ["Z coordinates", "Horizontal positions (X,Y)", "Gradients", "Azimuths only"],
      ["Position coordinates", "Elevations", "Both positions and elevations", "Bearings only"]
    ],
    correctAnswers: ["1", "1", "1", "1", "0"],
    explanationVariants: [
      "Horizontal control provides X,Y coordinates (position)",
      "Horizontal control establishes planimetric positions",
      "X,Y coordinates are determined by horizontal control",
      "Horizontal control defines positions in the horizontal plane",
      "Horizontal control networks establish coordinate positions"
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "Vertical control establishes:",
      "The purpose of vertical control is to determine:",
      "Vertical control surveys provide:",
      "Vertical control networks establish:",
      "What does vertical control determine?"
    ],
    optionSets: [
      ["Elevations (Z coordinates)", "Horizontal positions", "Angles", "Distances"],
      ["Elevations", "X coordinates", "Y coordinates", "Bearings"],
      ["Elevation values", "Horizontal distances", "Azimuths", "Latitudes"],
      ["Heights and elevations", "Positions", "Angles only", "Distances only"],
      ["Elevation data", "Coordinate positions", "Horizontal distances", "Bearings"]
    ],
    correctAnswers: ["0", "0", "0", "0", "0"],
    explanationVariants: [
      "Vertical control provides elevation (Z) information",
      "Vertical control determines elevations above a datum",
      "Elevations are established through vertical control",
      "Vertical control networks provide height/elevation data",
      "Vertical control establishes elevation values"
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "A benchmark (BM) is used for:",
      "Benchmarks serve as:",
      "The purpose of a benchmark is:",
      "Benchmarks in surveying are used for:",
      "A survey benchmark provides:"
    ],
    optionSets: [
      ["Horizontal control", "Vertical control", "Both", "Boundary markers"],
      ["Horizontal positioning", "Vertical control reference", "Triangulation", "Trilateration"],
      ["Horizontal control", "Elevation reference", "Distance measurement", "Angle reference"],
      ["Boundary marking", "Vertical control", "Property corners", "Road alignment"],
      ["Horizontal position", "Elevation reference", "Both position and elevation", "Boundary location"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "Benchmarks are permanent points of known elevation for vertical control",
      "Benchmarks provide elevation reference for vertical control",
      "BMs are established elevation points for vertical control",
      "Benchmarks serve as vertical control references",
      "Benchmarks provide known elevation values"
    ],
    points: 10
  },
  {
    type: 'conceptual_fill_in_blank',
    questionVariants: [
      "NGS stands for National ___ Survey (one word).",
      "The National ___ Survey manages US geodetic control.",
      "US geodetic control is managed by the National ___ Survey.",
      "NGS represents the National ___ Survey organization.",
      "The agency National ___ Survey maintains control networks."
    ],
    answerVariants: ["Geodetic", "Geodetic", "Geodetic", "Geodetic", "Geodetic"],
    explanationVariants: [
      "NGS = National Geodetic Survey, the US agency managing control networks",
      "The National Geodetic Survey maintains the national spatial reference system",
      "NGS (National Geodetic Survey) manages US geodetic infrastructure",
      "National Geodetic Survey is responsible for US control networks",
      "The National Geodetic Survey maintains geodetic control for the US"
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "Which order of control is most precise?",
      "The highest accuracy control surveys are:",
      "For maximum precision, which control order is used?",
      "The most accurate order of horizontal control is:",
      "Which control classification has the tightest standards?"
    ],
    optionSets: [
      ["First Order", "Second Order", "Third Order", "All equal"],
      ["Third Order", "Second Order", "First Order", "Local control"],
      ["Second Order", "Third Order", "First Order", "Regional"],
      ["First Order", "Second Order", "Third Order", "Fourth Order"],
      ["Second Order", "First Order", "Third Order", "Construction grade"]
    ],
    correctAnswers: ["0", "2", "2", "0", "1"],
    explanationVariants: [
      "First Order has the highest accuracy standards, Second Order next, etc.",
      "First Order control has the most stringent accuracy requirements",
      "First Order represents the highest precision classification",
      "First Order control meets the tightest accuracy standards",
      "First Order has the most rigorous accuracy specifications"
    ],
    points: 10
  }
];

// Lesson 5: Field Note Keeping and Documentation
export const d1_lesson05_archetypes: QuestionArchetype[] = [
  {
    type: 'multiple_choice',
    questionVariants: [
      "Field notes should be recorded in:",
      "Survey field notes must be written in:",
      "The proper medium for recording field notes is:",
      "Field observations should be documented using:",
      "According to professional standards, field notes are recorded in:"
    ],
    optionSets: [
      ["Pencil (erasable)", "Permanent ink", "Either A or B", "Computer only"],
      ["Erasable pencil", "Permanent ink", "Mechanical pencil", "Any writing instrument"],
      ["Pencil for easy corrections", "Permanent ink", "Both equally acceptable", "Digital only"],
      ["Light pencil", "Permanent ink", "Whichever is convenient", "Marker"],
      ["Regular pencil", "Permanent non-erasable ink", "Felt-tip marker", "Any pen"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "Field notes must be in permanent ink as they are legal documents",
      "Permanent ink is required because field notes are legal records",
      "Legal documentation standards require permanent ink",
      "Field notes serve as legal evidence and must be in permanent ink",
      "Professional standards require permanent ink for field notes"
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "If an error is made in field notes, you should:",
      "Corrections in field notes are made by:",
      "When a mistake occurs in field notes, the proper procedure is to:",
      "The correct method to correct a field note error is to:",
      "Errors in field notes should be handled by:"
    ],
    optionSets: [
      ["Erase it", "Use whiteout", "Draw a single line through it", "Start new page"],
      ["Erasing completely", "Drawing a single line through the error", "Using correction tape", "Rewriting the page"],
      ["Using white-out", "Drawing one line through and initialing", "Erasing and rewriting", "Ignoring it"],
      ["Erasing the error", "Crossing out with single line", "Using correction fluid", "Tearing out the page"],
      ["Drawing a single line through it", "Erasing carefully", "Using correction tape", "Starting over"]
    ],
    correctAnswers: ["2", "1", "1", "1", "0"],
    explanationVariants: [
      "Draw single line through error, write correction nearby, never erase or obliterate",
      "A single line preserves the original while showing the correction",
      "Single line through error with correction nearby maintains record integrity",
      "Crossing out with a single line keeps the original visible for legal purposes",
      "Draw one line through error so original remains visible, then write correction"
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "Field notes should include:",
      "Required elements in field notes are:",
      "Complete field notes contain:",
      "Professional field notes must include:",
      "Essential field note components include:"
    ],
    optionSets: [
      ["Date and weather", "Party members", "Equipment used", "All of the above"],
      ["Date only", "Weather only", "Equipment only", "Date, weather, crew, and equipment"],
      ["Location", "Date and time", "Weather and crew", "All of these"],
      ["Date and weather", "Crew names", "Instruments used", "All of the above"],
      ["Only measurements", "Date, weather, crew, equipment", "Just sketches", "Coordinates only"]
    ],
    correctAnswers: ["3", "3", "3", "3", "1"],
    explanationVariants: [
      "All information is important for legal defensibility and future reference",
      "Complete documentation includes date, weather, crew, and equipment",
      "All elements contribute to legal defensibility of field notes",
      "Professional notes include date, weather, personnel, and equipment",
      "Complete field notes document all relevant conditions and participants"
    ],
    points: 10
  },
  {
    type: 'conceptual_fill_in_blank',
    questionVariants: [
      "Field notes are considered ___ documents (legal/informal).",
      "In court, field notes may be used as ___ documents.",
      "Survey field notes have status as ___ documents.",
      "The classification of field notes is as ___ records.",
      "Field notes serve as ___ documentation in surveying."
    ],
    answerVariants: ["legal", "legal", "legal", "legal", "legal"],
    explanationVariants: [
      "Field notes can be used as evidence in court and must be maintained properly",
      "Field notes have legal standing and may be used as evidence",
      "As legal documents, field notes must meet professional standards",
      "Field notes are legal records that may be used in legal proceedings",
      "The legal status of field notes requires proper documentation practices"
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "Sketches in field notes should be:",
      "Field note sketches are required to be:",
      "Drawings in field notes must be:",
      "The standard for field note sketches is:",
      "Sketches accompanying field notes should be:"
    ],
    optionSets: [
      ["To scale", "Neatly drawn", "Not to scale but clear", "Optional"],
      ["Precisely to scale", "Clear but not necessarily to scale", "Computer generated", "Photographed"],
      ["Exactly proportional", "Clear and legible though not to scale", "Perfect replicas", "Minimal"],
      ["Scaled accurately", "Not to scale but clearly depicting relationships", "Artistic", "Detailed maps"],
      ["Measured drawings", "Clear sketches showing relationships", "Precise blueprints", "Optional additions"]
    ],
    correctAnswers: ["2", "1", "1", "1", "1"],
    explanationVariants: [
      "Sketches don't need to be to scale but must be clear and show relationships",
      "Clarity and showing relationships is more important than scale accuracy",
      "Field sketches should clearly show spatial relationships, not precise scale",
      "The purpose is clarity of relationships, not scaled accuracy",
      "Clear representation of relationships is the priority over precise scaling"
    ],
    points: 10
  }
];

// Lesson 6: GPS/GNSS Survey Methods
export const d1_lesson06_archetypes: QuestionArchetype[] = [
  {
    type: 'multiple_choice',
    questionVariants: [
      "GNSS includes which satellite systems?",
      "Global Navigation Satellite Systems (GNSS) encompasses:",
      "The term GNSS refers to:",
      "Which satellite constellations are part of GNSS?",
      "GNSS comprises which navigation satellite systems?"
    ],
    optionSets: [
      ["GPS only", "GPS and GLONASS", "GPS, GLONASS, Galileo, BeiDou", "GPS and Galileo only"],
      ["Only GPS", "GPS and GLONASS only", "GPS, GLONASS, Galileo, and BeiDou", "European systems only"],
      ["American GPS only", "GPS plus GLONASS", "All global navigation systems including GPS, GLONASS, Galileo, BeiDou", "GPS and BeiDou"],
      ["GPS", "GPS and Galileo", "GPS, GLONASS, Galileo, BeiDou", "GLONASS only"],
      ["GPS only", "GPS and GLONASS", "Multiple systems: GPS, GLONASS, Galileo, BeiDou", "Galileo only"]
    ],
    correctAnswers: ["2", "2", "2", "2", "2"],
    explanationVariants: [
      "GNSS encompasses GPS (US), GLONASS (Russia), Galileo (EU), and BeiDou (China)",
      "GNSS includes all major satellite navigation systems worldwide",
      "Global Navigation Satellite Systems includes GPS, GLONASS, Galileo, and BeiDou",
      "GNSS refers to all satellite navigation constellations globally",
      "The term GNSS covers GPS, GLONASS, Galileo, and BeiDou systems"
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "Which GPS method provides real-time centimeter accuracy?",
      "For real-time cm-level positioning, which method is used?",
      "Real-time centimeter-level GPS accuracy is achieved with:",
      "Which technique provides centimeter accuracy in real-time?",
      "Centimeter-accurate real-time positioning uses:"
    ],
    optionSets: [
      ["Static", "Rapid static", "RTK (Real-Time Kinematic)", "WAAS"],
      ["Static GPS", "Post-processed", "RTK", "Autonomous GPS"],
      ["WAAS", "Static", "RTK (Real-Time Kinematic)", "PPP"],
      ["Rapid static", "RTK", "Static", "DGPS"],
      ["Static survey", "RTK (Real-Time Kinematic)", "WAAS", "Autonomous"]
    ],
    correctAnswers: ["2", "2", "2", "1", "1"],
    explanationVariants: [
      "RTK uses radio corrections from base station for real-time cm accuracy",
      "RTK provides centimeter accuracy in real-time through base station corrections",
      "Real-Time Kinematic delivers cm-level accuracy instantaneously",
      "RTK achieves centimeter accuracy using real-time corrections",
      "RTK technology provides real-time centimeter-level positioning"
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "Static GPS observations typically require:",
      "The observation time for static GPS is usually:",
      "Static GPS survey sessions generally last:",
      "For static GPS surveys, observation duration is typically:",
      "Static GPS methods require observation times of:"
    ],
    optionSets: [
      ["Few seconds", "5-10 minutes", "30+ minutes", "24 hours"],
      ["Seconds", "Minutes", "30 minutes to hours", "Full day"],
      ["Under 1 minute", "5 minutes", "30+ minutes", "1 second"],
      ["Instant", "10 minutes", "30 minutes or more", "48 hours"],
      ["Several seconds", "5 minutes", "30+ minutes to hours", "One week"]
    ],
    correctAnswers: ["2", "2", "2", "2", "2"],
    explanationVariants: [
      "Static GPS requires extended observations (30 min to hours) for highest accuracy",
      "Static surveys need long observation times for maximum precision",
      "Extended observation periods are required for static GPS accuracy",
      "Static GPS achieves highest accuracy through extended observations",
      "Long observation sessions (30+ minutes) characterize static GPS"
    ],
    points: 10
  },
  {
    type: 'fill_in_blank',
    template: "GPS requires line of sight to at least {min} satellites for 3D positioning.",
    paramRanges: {
      min: [4, 5]
    },
    computeAnswer: (p) => String(p.min),
    computeExplanation: (p, ans) => `Minimum ${ans} satellites needed for 3D position (X, Y, Z, plus time)`,
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "PDOP refers to:",
      "The abbreviation PDOP stands for:",
      "PDOP in GPS surveying indicates:",
      "What does PDOP measure?",
      "PDOP values describe:"
    ],
    optionSets: [
      ["Satellite signal strength", "Geometric satellite distribution", "Number of satellites", "Atmospheric conditions"],
      ["Signal power", "Position Dilution of Precision", "Processing speed", "Data quality"],
      ["Power output", "Satellite geometry quality", "Number of channels", "Battery level"],
      ["Geometric satellite arrangement quality", "Signal strength", "Satellite count", "Receiver sensitivity"],
      ["Signal quality", "Satellite geometry", "Receiver accuracy", "Antenna gain"]
    ],
    correctAnswers: ["1", "1", "1", "0", "1"],
    explanationVariants: [
      "PDOP (Position Dilution of Precision) measures satellite geometry quality",
      "Position Dilution of Precision indicates how satellite geometry affects accuracy",
      "PDOP quantifies the effect of satellite geometry on position accuracy",
      "PDOP measures how satellite distribution affects positioning precision",
      "Satellite geometry quality is expressed through PDOP values"
    ],
    points: 10
  }
];

// Lesson 7: Error Sources and Mitigation
export const d1_lesson07_archetypes: QuestionArchetype[] = [
  {
    type: 'multiple_choice',
    questionVariants: [
      "Which error type can be eliminated by calibration?",
      "Calibration can remove which type of error?",
      "What error type is correctable through calibration?",
      "Which errors can be eliminated by proper calibration?",
      "Calibration procedures address which error type?"
    ],
    optionSets: [
      ["Random error", "Systematic error", "Gross error", "None"],
      ["Random", "Systematic", "Blunder", "Accidental"],
      ["Accidental error", "Systematic error", "Mistake", "Natural error"],
      ["Random error", "Systematic error", "Gross error", "All types"],
      ["Systematic error", "Random error", "Gross error", "Blunder"]
    ],
    correctAnswers: ["1", "1", "1", "1", "0"],
    explanationVariants: [
      "Systematic errors are consistent and can be removed by proper calibration",
      "Calibration corrects systematic errors because they are consistent",
      "Systematic errors follow patterns that calibration can correct",
      "The consistent nature of systematic errors makes them correctable by calibration",
      "Systematic errors can be identified and removed through calibration"
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "A mistake in reading a rod is what type of error?",
      "Misreading a level rod is classified as a:",
      "Reading the wrong number on a rod is a:",
      "A transposed digit when reading a rod is a:",
      "An obvious mistake in rod reading is called a:"
    ],
    optionSets: [
      ["Random", "Systematic", "Gross (blunder)", "Acceptable"],
      ["Systematic error", "Random error", "Gross error/blunder", "Minor error"],
      ["Random error", "Gross error", "Systematic", "Negligible"],
      ["Gross error (blunder)", "Random error", "Systematic error", "Normal error"],
      ["Random", "Systematic", "Gross error/blunder", "Instrumental"]
    ],
    correctAnswers: ["2", "2", "1", "0", "2"],
    explanationVariants: [
      "Mistakes/blunders are gross errors and must be detected and removed",
      "Gross errors (blunders) are mistakes that must be identified and eliminated",
      "Misreadings are blunders - gross errors requiring detection and correction",
      "Blunders are gross errors from human mistakes, not random variation",
      "Gross errors are blunders that must be found and removed from data"
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "Atmospheric refraction affects:",
      "Refraction in the atmosphere influences:",
      "Which measurements are affected by atmospheric refraction?",
      "Atmospheric refraction has an effect on:",
      "Refraction errors impact:"
    ],
    optionSets: [
      ["Angles only", "Distances only", "Both angles and distances", "Neither"],
      ["Only angle readings", "Only distance readings", "Both angle and distance measurements", "GPS only"],
      ["Angles only", "Both angles and distances", "Distances only", "Elevations only"],
      ["Distance measurements only", "Angle measurements only", "Both distances and angles", "Neither"],
      ["Angles", "Distances", "Both angles and distances", "Coordinates"]
    ],
    correctAnswers: ["2", "2", "1", "2", "2"],
    explanationVariants: [
      "Refraction bends light, affecting both angle and distance measurements",
      "Atmospheric refraction influences both angular and distance observations",
      "Light bending affects both types of measurements",
      "Refraction impacts both angle and distance observations",
      "Both angles and distances are affected by atmospheric refraction"
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "Double centering (measuring in two faces) helps eliminate:",
      "Two-face measurements are used to eliminate:",
      "Measuring in direct and reverse helps remove:",
      "Face left and face right observations eliminate:",
      "Double centering removes which errors?"
    ],
    optionSets: [
      ["Random errors", "Instrument errors", "Weather effects", "Nothing"],
      ["Weather effects", "Systematic instrument errors", "Blunders", "Random errors"],
      ["Random variation", "Instrument systematic errors", "Atmospheric effects", "Gross errors"],
      ["Systematic instrument errors", "Random errors", "Gross errors", "Weather errors"],
      ["Atmospheric errors", "Systematic instrument errors", "Random errors", "Blunders"]
    ],
    correctAnswers: ["1", "1", "1", "0", "1"],
    explanationVariants: [
      "Two-face measurements average out many systematic instrument errors",
      "Measuring in two faces cancels systematic instrument errors",
      "Face 1/Face 2 measurements eliminate instrument systematic errors",
      "Double centering averages out systematic errors from the instrument",
      "Systematic instrument errors are cancelled by two-face observations"
    ],
    points: 10
  },
  {
    type: 'conceptual_fill_in_blank',
    questionVariants: [
      "The method of measuring angles in direct and reverse is called double ___.",
      "Taking observations in both face positions is known as double ___.",
      "Measuring in face left and face right is called double ___.",
      "The technique of two-face angle measurement is double ___.",
      "Averaging face 1 and face 2 readings is double ___."
    ],
    answerVariants: ["centering", "centering", "centering", "centering", "centering"],
    explanationVariants: [
      "Double centering (or two-face measurements) involves measuring in direct and reverse",
      "Double centering uses both telescope face positions to eliminate errors",
      "The double centering technique averages readings from both faces",
      "Double centering means observing with the telescope in both positions",
      "Double centering uses face left and face right to cancel systematic errors"
    ],
    points: 10
  }
];

// ============================================================================
// DOMAIN 2: MEASUREMENT AND CALCULATIONS - QUESTION ARCHETYPES
// ============================================================================

// Lesson 1: Electronic Distance Measurement
export const d2_lesson01_archetypes: QuestionArchetype[] = [
  {
    type: 'fill_in_blank',
    template: "An EDM measures a slope distance of {slope} feet at a vertical angle of {angle}°. The horizontal distance is ___ feet (round to 2 decimals).",
    paramRanges: {
      slope: [100, 150, 200, 250, 300],
      angle: [5, 8, 10, 12, 15]
    },
    computeAnswer: (p) => (p.slope * Math.cos(p.angle * Math.PI / 180)).toFixed(2),
    computeExplanation: (p, ans) => `Horizontal = Slope × cos(angle) = ${p.slope} × cos(${p.angle}°) = ${ans} ft`,
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "EDM instruments measure distance using:",
      "Electronic distance measurement works by:",
      "The principle of EDM distance measurement is:",
      "EDM technology determines distance by:",
      "How does an EDM measure distance?"
    ],
    optionSets: [
      ["Direct tape comparison", "Electromagnetic wave travel time", "Mechanical wheels", "Sound waves"],
      ["Measuring tape electronically", "Timing electromagnetic wave travel", "Counting wheel rotations", "GPS signals"],
      ["Mechanical measurement", "Phase shift or pulse timing of light", "Sound reflection", "Magnetic fields"],
      ["Chain length", "Measuring light travel time or phase", "Radio triangulation", "Tape calibration"],
      ["Using metal tape", "Timing light wave travel", "Sound pulses", "Wheel encoders"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "EDM uses electromagnetic waves (light/infrared) and measures travel time or phase shift",
      "EDM sends light waves and times the round-trip travel to calculate distance",
      "Phase shift or pulse timing of light waves is the basis of EDM measurement",
      "EDM determines distance by measuring light wave travel time or phase difference",
      "Light waves are sent and their travel time or phase is measured to calculate distance"
    ],
    points: 10
  },
  {
    type: 'fill_in_blank',
    template: "A prism constant of -{offset} mm means measured distances must be ___ by {offset} mm (increased/decreased).",
    paramRanges: {
      offset: [30, 35, 40]
    },
    computeAnswer: (p) => "decreased",
    computeExplanation: (p, ans) => `A negative prism constant means the effective reflection point is closer, so subtract ${p.offset} mm`,
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "Atmospheric corrections for EDM account for changes in:",
      "EDM atmospheric corrections are needed because:",
      "Temperature and pressure affect EDM by changing:",
      "Why must EDM readings be corrected for atmospheric conditions?",
      "Atmospheric parameters affect EDM by altering:"
    ],
    optionSets: [
      ["Battery power", "Light wave velocity", "Prism alignment", "Instrument height"],
      ["The prism moves", "Light travels at different speeds in different conditions", "The tape stretches", "Angles change"],
      ["The prism constant", "The velocity of light through air", "The battery voltage", "Horizontal angles"],
      ["Because light velocity varies with air density", "Because the prism shifts", "Because angles are affected", "Because batteries drain"],
      ["Prism reflectivity", "Speed of electromagnetic waves", "Telescope focus", "Level bubble sensitivity"]
    ],
    correctAnswers: ["1", "1", "1", "0", "1"],
    explanationVariants: [
      "Temperature and pressure affect air density, changing light wave velocity",
      "Light travels at different speeds depending on atmospheric conditions",
      "Air density affects the velocity of light, changing measured distances",
      "Light velocity varies with air density, requiring atmospheric corrections",
      "The speed of electromagnetic waves changes with atmospheric conditions"
    ],
    points: 10
  },
  {
    type: 'fill_in_blank',
    template: "An EDM has a stated accuracy of ±({a} mm + {b} ppm). For a distance of {dist} meters, the expected error is ±___ mm (round to 1 decimal).",
    paramRanges: {
      a: [2, 3, 5],
      b: [2, 3, 5],
      dist: [100, 200, 500, 1000]
    },
    computeAnswer: (p) => (p.a + p.b * p.dist / 1000).toFixed(1),
    computeExplanation: (p, ans) => `Error = ${p.a} mm + (${p.b} ppm × ${p.dist} m) = ${p.a} + ${(p.b * p.dist / 1000).toFixed(1)} = ±${ans} mm`,
    points: 10
  }
];

// Lesson 2: Vertical Measurements
export const d2_lesson02_archetypes: QuestionArchetype[] = [
  {
    type: 'fill_in_blank',
    template: "A zenith angle of {zenith}° corresponds to a vertical angle of ___°.",
    paramRanges: {
      zenith: [85, 87, 90, 93, 95, 100, 105]
    },
    computeAnswer: (p) => String(90 - p.zenith),
    computeExplanation: (p, ans) => `Vertical angle = 90° - Zenith angle = 90° - ${p.zenith}° = ${ans}°`,
    points: 10
  },
  {
    type: 'fill_in_blank',
    template: "Given HI = {hi} ft, rod reading = {rod} ft, and slope distance = {sd} ft at zenith angle {za}°, the elevation difference is ___ ft (round to 2 decimals).",
    paramRanges: {
      hi: [5, 6],
      rod: [4, 5, 6],
      sd: [200, 300, 400],
      za: [85, 88, 92, 95]
    },
    computeAnswer: (p) => (p.sd * Math.cos(p.za * Math.PI / 180) + p.hi - p.rod).toFixed(2),
    computeExplanation: (p, ans) => `ΔElev = SD×cos(ZA) + HI - rod = ${p.sd}×cos(${p.za}°) + ${p.hi} - ${p.rod} = ${ans} ft`,
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "Trigonometric leveling uses:",
      "The method of trigonometric leveling requires:",
      "To determine elevation by trigonometric leveling, you need:",
      "Trigonometric leveling calculates elevation using:",
      "What measurements are needed for trigonometric leveling?"
    ],
    optionSets: [
      ["Only horizontal distance", "Vertical angle and slope or horizontal distance", "Only a level rod", "GPS coordinates only"],
      ["A level and rod only", "Vertical angle and distance measurements", "Only horizontal angles", "Tape measurements only"],
      ["Only backsight and foresight", "Slope distance and zenith/vertical angle", "Only GPS", "Chain and compass"],
      ["Angles and distances", "Only spirit level", "Rod readings only", "Horizontal angles only"],
      ["Horizontal angle only", "Vertical/zenith angle and distance", "GPS and level", "Tape and chain"]
    ],
    correctAnswers: ["1", "1", "1", "0", "1"],
    explanationVariants: [
      "Trig leveling uses vertical angles with slope or horizontal distances",
      "Vertical angles combined with distances yield elevation differences",
      "Slope distance and zenith angle together give elevation change",
      "Both angle and distance measurements are required for trig leveling",
      "Vertical or zenith angle plus distance is needed for trig leveling"
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "Curvature and refraction corrections become significant for distances over:",
      "Earth curvature effects on leveling are noticeable beyond:",
      "When should curvature and refraction be applied to vertical measurements?",
      "At what distance do curvature effects become important?",
      "Curvature corrections are typically applied for sights longer than:"
    ],
    optionSets: [
      ["50 feet", "100 feet", "300 feet", "1000 feet"],
      ["Less than 100 ft", "Over 300-400 ft", "Always", "Never"],
      ["All measurements", "Long sights over 300-400 feet", "Short sights only", "GPS measurements only"],
      ["100 meters", "300-500 feet or more", "Under 50 feet", "Only for EDM"],
      ["Under 100 ft", "Over 300-500 feet", "All distances", "Never needed"]
    ],
    correctAnswers: ["2", "1", "1", "1", "1"],
    explanationVariants: [
      "Curvature and refraction become significant for sights over 300-400 feet",
      "Long sights beyond 300-400 ft require curvature and refraction corrections",
      "For long sights, curvature and refraction must be applied",
      "Beyond about 300-500 feet, curvature effects require correction",
      "Sights over 300-500 feet need curvature and refraction corrections"
    ],
    points: 10
  },
  {
    type: 'fill_in_blank',
    template: "The combined curvature and refraction correction is approximately 0.0206 × M² feet, where M is distance in thousands of feet. For {dist} feet, the correction is ___ feet (round to 3 decimals).",
    paramRanges: {
      dist: [1000, 1500, 2000, 2500, 3000]
    },
    computeAnswer: (p) => (0.0206 * Math.pow(p.dist / 1000, 2)).toFixed(3),
    computeExplanation: (p, ans) => `C&R = 0.0206 × (${p.dist}/1000)² = 0.0206 × ${(p.dist/1000).toFixed(1)}² = ${ans} ft`,
    points: 10
  }
];

// Lesson 3: Traverse Closure and Adjustment
export const d2_lesson03_archetypes: QuestionArchetype[] = [
  {
    type: 'fill_in_blank',
    template: "A traverse with total length {length} feet has a linear error of closure of {error} feet. The precision ratio is 1:___ (round to nearest whole number).",
    paramRanges: {
      length: [2000, 2500, 3000, 4000, 5000],
      error: [0.1, 0.15, 0.2, 0.25, 0.5]
    },
    computeAnswer: (p) => String(Math.round(p.length / p.error)),
    computeExplanation: (p, ans) => `Precision = Total Length / Error = ${p.length} / ${p.error} = 1:${ans}`,
    points: 10
  },
  {
    type: 'fill_in_blank',
    template: "An interior angle traverse has {sides} sides. The sum of interior angles should be ___°.",
    paramRanges: {
      sides: [4, 5, 6, 7, 8]
    },
    computeAnswer: (p) => String((p.sides - 2) * 180),
    computeExplanation: (p, ans) => `Sum = (n-2) × 180° = (${p.sides}-2) × 180° = ${ans}°`,
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "The Compass Rule distributes closure error based on:",
      "In the Compass Rule adjustment, corrections are proportional to:",
      "Bowditch (Compass) Rule adjusts traverse errors proportional to:",
      "How does the Compass Rule distribute closure error?",
      "The Bowditch Rule bases corrections on:"
    ],
    optionSets: [
      ["Angle size only", "Course length", "Number of sides", "Equal distribution"],
      ["Angle magnitude", "Distance of each course", "Station number", "Azimuth"],
      ["Angle accuracy", "Course lengths", "Random assignment", "Coordinate values"],
      ["Equal parts", "Based on course length", "Based on angles only", "Based on elevation"],
      ["Azimuth only", "Length of each course", "Number of angles", "GPS quality"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "The Compass Rule distributes error proportionally to course length",
      "Corrections in the Compass Rule are proportional to course distances",
      "Bowditch Rule applies corrections based on course lengths",
      "Error is distributed proportionally to course length in Compass Rule",
      "The Bowditch/Compass Rule uses course length for proportioning corrections"
    ],
    points: 10
  },
  {
    type: 'fill_in_blank',
    template: "A {sides}-sided traverse has an angular misclosure of {error}'. The allowable error at {ratio}'' per angle is ___ seconds.",
    paramRanges: {
      sides: [4, 5, 6, 7, 8],
      error: [15, 20, 30, 45],
      ratio: [10, 15, 20, 30]
    },
    computeAnswer: (p) => String(p.ratio * Math.sqrt(p.sides)),
    computeExplanation: (p, ans) => `Allowable = K × √n = ${p.ratio}" × √${p.sides} = ${(p.ratio * Math.sqrt(p.sides)).toFixed(0)}"`,
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "The linear error of closure is calculated from:",
      "To find the linear misclosure of a traverse:",
      "Linear error of closure is determined by:",
      "What is used to calculate linear misclosure?",
      "Linear closure error comes from:"
    ],
    optionSets: [
      ["Sum of all angles", "The departure and latitude misclosures", "Average of distances", "GPS data"],
      ["Angle errors only", "Squaring departure and latitude errors, then taking square root", "Distance only", "Azimuth differences"],
      ["Sum of distances", "√(ΔLat² + ΔDep²)", "Average angle error", "Coordinate precision"],
      ["√(Latitude error² + Departure error²)", "Sum of angles", "Distance average", "GPS accuracy"],
      ["Angle sum", "Departure and latitude errors combined", "Course average", "Coordinate spread"]
    ],
    correctAnswers: ["1", "1", "1", "0", "1"],
    explanationVariants: [
      "Linear error = √(ΔLatitude² + ΔDeparture²)",
      "Take square root of sum of squared latitude and departure errors",
      "The formula is √(ΔLat² + ΔDep²)",
      "Linear misclosure = √(ΣLat² + ΣDep²) from coordinate differences",
      "Combine latitude and departure errors using Pythagorean theorem"
    ],
    points: 10
  }
];

// Lesson 4: Area Calculations
export const d2_lesson04_archetypes: QuestionArchetype[] = [
  {
    type: 'fill_in_blank',
    template: "A rectangular parcel is {length} feet by {width} feet. The area in acres is ___ (round to 3 decimals).",
    paramRanges: {
      length: [400, 500, 600, 800, 1000],
      width: [200, 300, 400, 500]
    },
    computeAnswer: (p) => (p.length * p.width / 43560).toFixed(3),
    computeExplanation: (p, ans) => `Area = ${p.length} × ${p.width} = ${p.length * p.width} sq ft ÷ 43,560 = ${ans} acres`,
    points: 10
  },
  {
    type: 'fill_in_blank',
    template: "Using the coordinate method, if ΣXi(Yi+1 - Yi-1) = {sum}, the area is ___ square feet.",
    paramRanges: {
      sum: [40000, 50000, 60000, 80000, 100000]
    },
    computeAnswer: (p) => String(Math.abs(p.sum) / 2),
    computeExplanation: (p, ans) => `Area = |Σ| / 2 = |${p.sum}| / 2 = ${ans} sq ft`,
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "How many square feet are in one acre?",
      "One acre equals how many square feet?",
      "The conversion factor for acres to square feet is:",
      "An acre contains:",
      "1 acre = ___ square feet"
    ],
    optionSets: [
      ["40,000", "43,560", "45,000", "50,000"],
      ["42,000", "43,560", "44,000", "46,000"],
      ["1/43,560", "43,560", "4,356", "436,560"],
      ["42,560 sq ft", "43,560 sq ft", "44,560 sq ft", "40,000 sq ft"],
      ["40,000", "42,560", "43,560", "45,560"]
    ],
    correctAnswers: ["1", "1", "1", "1", "2"],
    explanationVariants: [
      "1 acre = 43,560 square feet",
      "43,560 square feet per acre is the standard conversion",
      "43,560 is the conversion factor from sq ft to acres",
      "An acre contains exactly 43,560 square feet",
      "1 acre = 43,560 sq ft"
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "The Double Meridian Distance (DMD) method calculates area using:",
      "DMD area calculation uses:",
      "In the DMD method, area is found by:",
      "What does the DMD method multiply to find area?",
      "DMD area calculations involve:"
    ],
    optionSets: [
      ["Latitudes and departures", "DMDs and latitudes", "Coordinates only", "Angles and distances"],
      ["Angles and bearings", "DMD values times latitudes", "GPS coordinates", "Chain measurements"],
      ["Sum of DMD × Latitude", "Coordinates only", "Just departures", "Just latitudes"],
      ["Bearings by distances", "DMD times latitude for each course", "Angles times sides", "Coordinates squared"],
      ["DMD multiplied by latitude", "Just angles", "Chain lengths", "GPS points"]
    ],
    correctAnswers: ["1", "1", "0", "1", "0"],
    explanationVariants: [
      "DMD method multiplies DMD by latitude for each course",
      "DMD × Latitude for each course, then sum and divide by 2",
      "Sum of DMD × Latitude gives double area",
      "Each course's DMD is multiplied by its latitude",
      "DMD values are multiplied by latitudes to compute area"
    ],
    points: 10
  },
  {
    type: 'fill_in_blank',
    template: "A triangular lot has a base of {base} feet and height of {height} feet. The area is ___ square feet.",
    paramRanges: {
      base: [100, 150, 200, 250, 300],
      height: [80, 100, 120, 150, 180]
    },
    computeAnswer: (p) => String(0.5 * p.base * p.height),
    computeExplanation: (p, ans) => `Area = ½ × base × height = ½ × ${p.base} × ${p.height} = ${ans} sq ft`,
    points: 10
  }
];

// Lesson 5: Volume Calculations
export const d2_lesson05_archetypes: QuestionArchetype[] = [
  {
    type: 'fill_in_blank',
    template: "Using the average end area method with areas A1 = {a1} sq ft and A2 = {a2} sq ft, and length L = {l} ft, the volume is ___ cubic feet.",
    paramRanges: {
      a1: [100, 150, 200, 250],
      a2: [120, 180, 220, 280],
      l: [50, 75, 100]
    },
    computeAnswer: (p) => String(((p.a1 + p.a2) / 2) * p.l),
    computeExplanation: (p, ans) => `Volume = ((A1 + A2) / 2) × L = ((${p.a1} + ${p.a2}) / 2) × ${p.l} = ${ans} cu ft`,
    points: 10
  },
  {
    type: 'fill_in_blank',
    template: "Convert {cuyd} cubic yards to cubic feet: ___ cubic feet.",
    paramRanges: {
      cuyd: [10, 15, 20, 25, 50, 100]
    },
    computeAnswer: (p) => String(p.cuyd * 27),
    computeExplanation: (p, ans) => `${p.cuyd} cu yd × 27 cu ft/cu yd = ${ans} cu ft`,
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "The prismoidal formula is more accurate than average end area when:",
      "When should the prismoidal formula be used instead of average end area?",
      "Prismoidal formula gives better results when:",
      "Average end area may overestimate volume when:",
      "The prismoidal correction is needed when:"
    ],
    optionSets: [
      ["End areas are equal", "End areas vary significantly or sections are irregular", "Always", "Never"],
      ["End areas are the same", "Cross-sections vary in shape or size", "Distance is short", "Volume is small"],
      ["Sections are identical", "End areas differ significantly", "Areas are equal", "Length is very short"],
      ["Sections are uniform", "End areas differ in shape or magnitude", "Using GPS", "Using coordinates"],
      ["Sections are the same", "There is significant variation between end areas", "Distance is zero", "Using tape measurements"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "Prismoidal formula accounts for variation between end areas",
      "When cross-sections vary, prismoidal formula gives more accurate results",
      "Significantly different end areas require prismoidal correction",
      "Average end area overestimates when end areas differ in shape/size",
      "When end areas vary significantly, prismoidal formula is more accurate"
    ],
    points: 10
  },
  {
    type: 'fill_in_blank',
    template: "A borrow pit grid has {cells} cells, each {size} ft × {size} ft. The average depth is {depth} ft. Total volume is ___ cubic yards (round to nearest whole).",
    paramRanges: {
      cells: [6, 8, 10, 12],
      size: [25, 50],
      depth: [3, 4, 5, 6]
    },
    computeAnswer: (p) => String(Math.round((p.cells * p.size * p.size * p.depth) / 27)),
    computeExplanation: (p, ans) => `Volume = ${p.cells} × ${p.size}² × ${p.depth} cu ft ÷ 27 = ${ans} cu yd`,
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "How many cubic feet are in one cubic yard?",
      "One cubic yard equals:",
      "The conversion from cubic yards to cubic feet is:",
      "1 cubic yard = ___ cubic feet",
      "To convert cubic yards to cubic feet, multiply by:"
    ],
    optionSets: [
      ["9", "18", "27", "36"],
      ["9 cu ft", "27 cu ft", "36 cu ft", "54 cu ft"],
      ["Multiply by 9", "Multiply by 27", "Divide by 27", "Multiply by 3"],
      ["9", "12", "27", "81"],
      ["3", "9", "27", "81"]
    ],
    correctAnswers: ["2", "1", "1", "2", "2"],
    explanationVariants: [
      "1 cubic yard = 3ft × 3ft × 3ft = 27 cubic feet",
      "27 cubic feet in one cubic yard (3×3×3)",
      "Multiply cubic yards by 27 to get cubic feet",
      "1 cu yd = 27 cu ft",
      "27 is the conversion factor from cubic yards to cubic feet"
    ],
    points: 10
  }
];

// Lesson 6: Coordinate Geometry
export const d2_lesson06_archetypes: QuestionArchetype[] = [
  {
    type: 'fill_in_blank',
    template: "The distance between points ({x1}, {y1}) and ({x2}, {y2}) is ___ (round to 2 decimals).",
    paramRanges: {
      x1: [100, 150, 200],
      y1: [100, 150, 200],
      x2: [300, 350, 400],
      y2: [250, 300, 350]
    },
    computeAnswer: (p) => Math.sqrt(Math.pow(p.x2 - p.x1, 2) + Math.pow(p.y2 - p.y1, 2)).toFixed(2),
    computeExplanation: (p, ans) => `Distance = √[(${p.x2}-${p.x1})² + (${p.y2}-${p.y1})²] = √[${Math.pow(p.x2-p.x1,2)} + ${Math.pow(p.y2-p.y1,2)}] = ${ans}`,
    points: 10
  },
  {
    type: 'fill_in_blank',
    template: "From point ({n}, {e}) traveling N{angle}°E for {dist} feet, the new Easting is ___ (round to 2 decimals).",
    paramRanges: {
      n: [1000, 1500, 2000],
      e: [1000, 1500, 2000],
      angle: [30, 45, 60],
      dist: [100, 150, 200]
    },
    computeAnswer: (p) => (p.e + p.dist * Math.sin(p.angle * Math.PI / 180)).toFixed(2),
    computeExplanation: (p, ans) => `New E = ${p.e} + ${p.dist} × sin(${p.angle}°) = ${p.e} + ${(p.dist * Math.sin(p.angle * Math.PI / 180)).toFixed(2)} = ${ans}`,
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "In COGO calculations, departure is the:",
      "The departure of a line represents its:",
      "Departure in coordinate geometry is:",
      "What does departure measure in a traverse?",
      "Departure represents the:"
    ],
    optionSets: [
      ["North-South component", "East-West component", "Elevation change", "Distance"],
      ["Vertical component", "Horizontal East-West change", "Slope distance", "Azimuth"],
      ["N-S distance", "E-W distance change", "Vertical difference", "Total length"],
      ["Change in northing", "Change in easting (E-W)", "Slope", "Bearing"],
      ["Latitude component", "East-West displacement", "Elevation", "Total distance"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "Departure is the East-West component (change in Easting)",
      "Departure = Distance × sin(bearing), the E-W component",
      "The E-W distance change is called departure",
      "Departure measures the East-West displacement of a line",
      "Departure is the East-West displacement (Δ Easting)"
    ],
    points: 10
  },
  {
    type: 'fill_in_blank',
    template: "The azimuth from point A to point B is {az}°. The back azimuth (from B to A) is ___°.",
    paramRanges: {
      az: [45, 60, 90, 120, 150, 200, 250, 300]
    },
    computeAnswer: (p) => String(p.az >= 180 ? p.az - 180 : p.az + 180),
    computeExplanation: (p, ans) => `Back azimuth = ${p.az}° ${p.az >= 180 ? '-' : '+'} 180° = ${ans}°`,
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "Latitude in traverse computations is:",
      "The latitude of a course represents:",
      "In coordinate geometry, latitude means:",
      "Traverse latitude refers to:",
      "The latitude component is:"
    ],
    optionSets: [
      ["Geographic latitude", "North-South displacement", "Longitude equivalent", "Elevation"],
      ["E-W distance", "N-S distance component", "Angular position", "Height"],
      ["Map latitude", "N-S component of a line", "Geographic position", "Slope distance"],
      ["Geographic location", "N-S displacement (change in Northing)", "Map scale", "Distance"],
      ["Longitude", "North-South component", "Bearing", "Azimuth"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "Latitude is the N-S component (change in Northing)",
      "Latitude = Distance × cos(bearing), the N-S component",
      "The N-S component of a traverse line is called latitude",
      "Latitude is the N-S displacement in traverse computations",
      "Latitude represents the North-South component of distance"
    ],
    points: 10
  }
];

// Lesson 7: Horizontal Curve Calculations
export const d2_lesson07_archetypes: QuestionArchetype[] = [
  {
    type: 'fill_in_blank',
    template: "A horizontal curve has radius R = {r} ft and central angle Δ = {delta}°. The tangent distance T is ___ ft (round to 2 decimals).",
    paramRanges: {
      r: [400, 500, 600, 800, 1000],
      delta: [20, 30, 40, 45, 60]
    },
    computeAnswer: (p) => (p.r * Math.tan((p.delta / 2) * Math.PI / 180)).toFixed(2),
    computeExplanation: (p, ans) => `T = R × tan(Δ/2) = ${p.r} × tan(${p.delta/2}°) = ${ans} ft`,
    points: 10
  },
  {
    type: 'fill_in_blank',
    template: "For a curve with radius {r} ft and central angle {delta}°, the curve length L is ___ ft (round to 2 decimals).",
    paramRanges: {
      r: [400, 500, 600, 800],
      delta: [30, 45, 60, 90]
    },
    computeAnswer: (p) => ((p.delta * Math.PI / 180) * p.r).toFixed(2),
    computeExplanation: (p, ans) => `L = (Δ × π / 180) × R = (${p.delta}° × π / 180) × ${p.r} = ${ans} ft`,
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "The degree of curve (D) for arc definition is based on:",
      "In the arc definition, degree of curve is:",
      "Arc definition degree of curve uses:",
      "What does the arc definition of curve degree measure?",
      "The arc definition relates degree to:"
    ],
    optionSets: [
      ["100-foot chord", "100-foot arc length", "Tangent length", "Radius directly"],
      ["Chord length of 100 ft", "Central angle for 100-ft arc", "External distance", "Middle ordinate"],
      ["100-ft tangent", "100-ft arc subtending the angle", "50-ft chord", "Curve length"],
      ["Chord subtension", "Angle subtended by 100-ft arc", "Tangent distance", "Radius percentage"],
      ["50-ft arc", "Angle for 100-ft arc length", "External distance", "Long chord"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "Arc definition: D is the central angle subtended by a 100-ft arc",
      "The arc definition uses a 100-foot arc length to define degree",
      "Degree of curve (arc) = angle for 100-ft arc",
      "Arc definition measures the angle subtended by a 100-ft arc",
      "The angle for a 100-ft arc length defines the degree of curve"
    ],
    points: 10
  },
  {
    type: 'fill_in_blank',
    template: "The external distance E for a curve with R = {r} ft and Δ = {delta}° is ___ ft (round to 2 decimals).",
    paramRanges: {
      r: [500, 600, 800, 1000],
      delta: [30, 40, 50, 60]
    },
    computeAnswer: (p) => (p.r * (1 / Math.cos((p.delta / 2) * Math.PI / 180) - 1)).toFixed(2),
    computeExplanation: (p, ans) => `E = R × (sec(Δ/2) - 1) = ${p.r} × (sec(${p.delta/2}°) - 1) = ${ans} ft`,
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "The PC (Point of Curvature) is where:",
      "At the PC of a horizontal curve:",
      "Point of Curvature (PC) marks:",
      "The PC is located where:",
      "What occurs at the PC?"
    ],
    optionSets: [
      ["Curve ends", "Tangent meets curve", "Curve changes direction", "Curve reaches midpoint"],
      ["The curve ends", "The curve begins from the tangent", "The tangent begins", "Superelevation ends"],
      ["End of curve", "Beginning of curve from tangent", "Curve midpoint", "Tangent midpoint"],
      ["Curve meets next tangent", "Tangent transitions to curve", "Middle of curve", "End of spiral"],
      ["Tangent begins", "Curve begins", "Curve ends", "Spiral begins"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "PC is where the tangent meets the beginning of the curve",
      "At the PC, the curve begins from the approaching tangent",
      "PC marks where the curve begins from the tangent",
      "The PC is where the tangent transitions into the curve",
      "At the PC, the curve begins (Point of Curvature)"
    ],
    points: 10
  }
];

// Lesson 8: Vertical Curve Calculations
export const d2_lesson08_archetypes: QuestionArchetype[] = [
  {
    type: 'fill_in_blank',
    template: "A vertical curve has grades g1 = +{g1}% and g2 = -{g2}%. The algebraic difference A is ___% (use positive value).",
    paramRanges: {
      g1: [2, 3, 4, 5],
      g2: [2, 3, 4, 5]
    },
    computeAnswer: (p) => String(p.g1 + p.g2),
    computeExplanation: (p, ans) => `A = |g1 - g2| = |${p.g1} - (-${p.g2})| = ${ans}%`,
    points: 10
  },
  {
    type: 'fill_in_blank',
    template: "For a {length}-ft vertical curve with A = {a}%, the rate of change of grade r is ___% per station (round to 2 decimals).",
    paramRanges: {
      length: [400, 500, 600, 800],
      a: [4, 5, 6, 8]
    },
    computeAnswer: (p) => (p.a / (p.length / 100)).toFixed(2),
    computeExplanation: (p, ans) => `r = A / (L/100) = ${p.a} / ${p.length/100} = ${ans}% per station`,
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "A crest vertical curve is used when:",
      "Crest curves are designed for:",
      "When is a crest vertical curve needed?",
      "A crest curve occurs when:",
      "Crest vertical curves are used where:"
    ],
    optionSets: [
      ["Road goes down then up", "Road goes up then down (convex)", "Road is level", "Road has superelevation"],
      ["Sag conditions", "Uphill to downhill transition", "Flat sections", "Spiral transitions"],
      ["Grade decreases (sag)", "Upgrade changes to downgrade", "Level sections", "Interchange ramps"],
      ["g2 > g1", "Upgrade to downgrade (g1 > g2)", "No grade change", "Curves only"],
      ["Downhill sections", "Hill crests (upgrade to downgrade)", "Valleys", "Level roads"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "Crest curves connect upgrade to downgrade (convex, like a hill top)",
      "Crest curves are for uphill to downhill transitions",
      "When grade changes from positive to negative, a crest curve is used",
      "Crest curves occur when upgrade changes to downgrade",
      "Crest curves are placed at hill tops (upgrade to downgrade)"
    ],
    points: 10
  },
  {
    type: 'fill_in_blank',
    template: "The PVI of a vertical curve is at station {sta}+00 with elevation {elev} ft. With g1 = +{g1}% and L = {l} ft, the BVC elevation is ___ ft.",
    paramRanges: {
      sta: [10, 15, 20, 25],
      elev: [500, 550, 600],
      g1: [2, 3, 4],
      l: [400, 500, 600]
    },
    computeAnswer: (p) => String(p.elev - (p.g1 / 100) * (p.l / 2)),
    computeExplanation: (p, ans) => `BVC elev = PVI elev - g1 × (L/2) = ${p.elev} - ${p.g1/100} × ${p.l/2} = ${ans} ft`,
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "The high or low point of a vertical curve is found using:",
      "To locate the high/low point of a vertical curve:",
      "The vertex (high/low point) distance from BVC is:",
      "How do you find where a vertical curve reaches its highest or lowest point?",
      "The high/low point occurs at distance x from BVC where:"
    ],
    optionSets: [
      ["x = A/L", "x = -g1 × L / A", "x = L/2 always", "x = g2 × L"],
      ["It's always at midpoint", "x = (g1 / A) × L", "x = L × g2", "x = A × L"],
      ["L/2", "x = |g1| × L / A", "x = g2 / A", "x = L / A"],
      ["Always at PVI", "Set derivative to zero: x = -g1 × L / A", "At the BVC", "At the EVC"],
      ["x = L × A", "x = g1 × L / A", "x = L/A", "x = A/g1"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "x = -g1 × L / A gives distance from BVC to high/low point",
      "Using x = (g1 / A) × L finds the extreme point location",
      "The formula x = |g1| × L / A locates the vertex",
      "Setting the derivative to zero: x = -g1 × L / A",
      "The high/low point is at x = g1 × L / A from BVC"
    ],
    points: 10
  }
];

// ============================================================================
// DOMAIN 3: BOUNDARY LAW AND REAL PROPERTY PRINCIPLES - QUESTION ARCHETYPES
// ============================================================================

// Lesson 1: Property Rights and Interests
export const d3_lesson01_archetypes: QuestionArchetype[] = [
  {
    type: 'multiple_choice',
    questionVariants: [
      "Fee simple ownership represents:",
      "What does fee simple absolute mean?",
      "The highest form of property ownership is called:",
      "Fee simple ownership includes:",
      "Which ownership type grants the most rights?"
    ],
    optionSets: [
      ["Temporary use rights", "Complete ownership with full rights", "Easement rights only", "Rental agreement"],
      ["Limited ownership", "Complete ownership without restrictions", "Leasehold interest", "Life estate only"],
      ["Life estate", "Fee simple", "Easement", "License"],
      ["Right to sell, use, and transfer property", "Rental rights only", "Use for specific purpose", "Temporary possession"],
      ["Leasehold", "License", "Fee simple absolute", "Easement appurtenant"]
    ],
    correctAnswers: ["1", "1", "1", "0", "2"],
    explanationVariants: [
      "Fee simple is the highest form of ownership with full rights",
      "Fee simple absolute means complete ownership without time limitations",
      "Fee simple is the highest and most complete form of property ownership",
      "Fee simple includes all property rights: use, sell, lease, and transfer",
      "Fee simple absolute grants the most complete bundle of property rights"
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "An easement grants:",
      "What rights does an easement provide?",
      "An easement allows the holder to:",
      "The purpose of an easement is to:",
      "Easements provide:"
    ],
    optionSets: [
      ["Full ownership of land", "Right to use land for specific purpose", "Temporary lease", "Complete control"],
      ["Ownership transfer", "Limited use rights", "Full mineral rights", "Building permits"],
      ["Own the property", "Use the property for a specified purpose", "Sell the property", "Subdivide"],
      ["Transfer ownership", "Grant specific use rights", "Provide rental income", "Create a lease"],
      ["Ownership rights", "Non-possessory use rights", "Temporary access only", "Building rights"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "Easements allow use of another's property for specified purpose (access, utilities, etc.)",
      "Easements grant limited use rights without ownership transfer",
      "Easement holders can use property for specified purpose but don't own it",
      "Easements grant specific use rights like access or utility installation",
      "Easements are non-possessory rights to use another's land"
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "A right-of-way is typically:",
      "Right-of-way is best described as:",
      "What type of interest is a right-of-way?",
      "A right-of-way for access is an example of:",
      "Rights-of-way are:"
    ],
    optionSets: [
      ["Full ownership", "A type of easement", "A boundary marker", "A temporary permit"],
      ["Fee simple ownership", "An easement for passage", "A lease agreement", "A license"],
      ["Ownership interest", "Easement interest", "Leasehold interest", "Mortgage interest"],
      ["Fee simple", "Easement appurtenant or in gross", "Adverse possession", "Prescriptive rights"],
      ["Temporary permits", "Permanent easements for travel", "Ownership rights", "Licenses"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "ROW is an easement for passage (roads, pipelines, power lines, etc.)",
      "Right-of-way is an easement granting passage rights",
      "A right-of-way is an easement interest, not ownership",
      "Rights-of-way are easements that run with the land or are in gross",
      "Rights-of-way are permanent easements for travel and access"
    ],
    points: 10
  },
  {
    type: 'conceptual_fill_in_blank',
    questionVariants: [
      "An encumbrance is a claim or ___ on property (starts with 'l').",
      "A mortgage is an example of an ___ on property (starts with 'e').",
      "Claims against property that affect title are called ___ (starts with 'e').",
      "Liens, easements, and restrictions are types of ___ (starts with 'e').",
      "A ___ is any claim or restriction affecting property title (starts with 'l')."
    ],
    answerVariants: ["lien", "encumbrance", "encumbrances", "encumbrances", "lien"],
    explanationVariants: [
      "Encumbrances are claims, liens, easements, or restrictions affecting property",
      "A mortgage is an encumbrance that affects property title",
      "Encumbrances are any claims or interests that burden property title",
      "Liens, easements, and restrictions all encumber property",
      "Liens are financial encumbrances against property"
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "Riparian rights relate to:",
      "What do riparian rights govern?",
      "Riparian rights are associated with:",
      "Property owners with riparian rights have rights to:",
      "Riparian rights apply to properties adjacent to:"
    ],
    optionSets: [
      ["Minerals", "Water", "Air", "Timber"],
      ["Mineral extraction", "Water use and access", "Airspace", "Forest management"],
      ["Underground resources", "Watercourses", "Grazing land", "Public roads"],
      ["Oil and gas", "Use of adjacent water", "Timber harvesting", "Mining"],
      ["Highways", "Rivers and streams", "Mountains", "Valleys"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "Riparian rights govern water use for properties adjacent to watercourses",
      "Riparian rights govern water use and access for adjacent landowners",
      "Riparian rights are associated with flowing water (streams, rivers)",
      "Riparian owners have rights to reasonable use of adjacent water",
      "Riparian rights apply to properties bordering rivers and streams"
    ],
    points: 10
  }
];

// Lesson 2: Metes and Bounds Descriptions
export const d3_lesson02_archetypes: QuestionArchetype[] = [
  {
    type: 'multiple_choice',
    questionVariants: [
      "In metes and bounds, 'metes' refers to:",
      "The term 'metes' in legal descriptions means:",
      "What are 'metes' in a property description?",
      "'Metes' in metes and bounds includes:",
      "The 'metes' portion of a description contains:"
    ],
    optionSets: [
      ["Monuments", "Measurements (bearings and distances)", "Boundaries", "Corners"],
      ["Physical markers", "Distances and directions", "Adjoining owners", "Lot numbers"],
      ["Boundary lines", "Measured directions and distances", "Reference points", "Plat numbers"],
      ["Corner monuments", "Bearings and distances", "Township lines", "Range lines"],
      ["Iron pipes", "Directional and distance measurements", "Stone markers", "Trees"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "'Metes' = measurements (distances and directions), 'Bounds' = boundaries/limits",
      "'Metes' refers to the measured elements: directions and distances",
      "Metes are the measured components of a legal description",
      "Metes include bearings (directions) and distances",
      "The metes are the directional and distance measurements"
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "A proper metes and bounds description must:",
      "For a valid metes and bounds description:",
      "Metes and bounds descriptions require:",
      "A metes and bounds description should:",
      "The closure requirement for metes and bounds means:"
    ],
    optionSets: [
      ["Start anywhere", "Return to starting point", "Never close", "Use only monuments"],
      ["Be open-ended", "Close at the Point of Beginning", "Avoid distances", "Use GPS only"],
      ["Open boundaries", "Mathematical closure", "Approximate locations", "No monuments"],
      ["Remain open", "Close back to the POB", "Use indefinite calls", "Exclude bearings"],
      ["Description is optional", "Traverse must return to start", "Gaps are acceptable", "Only area matters"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "Descriptions must close by returning to Point of Beginning (POB)",
      "Valid descriptions must close at the Point of Beginning",
      "Mathematical closure is required for valid descriptions",
      "Descriptions must close back to the starting point",
      "The traverse must return to the starting point for closure"
    ],
    points: 10
  },
  {
    type: 'conceptual_fill_in_blank',
    questionVariants: [
      "POB stands for Point of ___.",
      "A metes and bounds description starts and ends at the ___.",
      "The starting point of a metes and bounds description is called the Point of ___.",
      "POB is the abbreviation for Point of ___.",
      "The ___ is where a metes and bounds description begins and ends."
    ],
    answerVariants: ["Beginning", "POB", "Beginning", "Beginning", "POB"],
    explanationVariants: [
      "POB = Point of Beginning, where the description starts and ends",
      "The POB (Point of Beginning) is the start and end point",
      "Point of Beginning is where the description starts and closes",
      "POB = Point of Beginning",
      "The POB (Point of Beginning) is the origin of the description"
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "Monuments in boundary descriptions are:",
      "A monument in surveying is:",
      "What serves as a monument in a legal description?",
      "Monuments used in boundary descriptions include:",
      "The purpose of monuments in descriptions is to:"
    ],
    optionSets: [
      ["Physical markers", "Measurements", "Bearings", "Maps"],
      ["Written records", "Physical objects marking points", "Calculated coordinates", "Survey notes"],
      ["Bearings only", "Physical objects or features", "Area calculations", "Deed references"],
      ["Only iron pipes", "Stones, pipes, trees, or other markers", "Only concrete monuments", "Only natural features"],
      ["Record distances", "Mark specific points on the ground", "Calculate areas", "Store coordinates"]
    ],
    correctAnswers: ["0", "1", "1", "1", "1"],
    explanationVariants: [
      "Monuments are physical objects marking corners/points (stones, pipes, trees, etc.)",
      "A monument is a physical object marking a survey point",
      "Physical objects or features serve as monuments (stakes, stones, trees)",
      "Monuments include iron pipes, stones, trees, and other physical markers",
      "Monuments mark specific boundary points on the ground"
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "A call in a deed description includes:",
      "What does a 'call' in a legal description contain?",
      "Each call in a metes and bounds description specifies:",
      "A deed call typically includes:",
      "Calls in a boundary description provide:"
    ],
    optionSets: [
      ["Bearing only", "Distance only", "Both bearing and distance", "Area only"],
      ["Only the ending point", "Direction and distance to next point", "Only area", "Owner name"],
      ["Area calculation", "Direction and distance", "Monument type only", "Parcel ID only"],
      ["Bearing and distance to next point", "Only monument descriptions", "Only lot number", "Only acreage"],
      ["Owner history", "Direction and distance for each line", "Just coordinates", "Only references"]
    ],
    correctAnswers: ["2", "1", "1", "0", "1"],
    explanationVariants: [
      "Each 'call' specifies direction (bearing) and distance to next point",
      "A call contains the direction and distance to the next point",
      "Each call specifies direction and distance for that boundary line",
      "Calls include bearing and distance to the next point",
      "Calls provide direction and distance for each line segment"
    ],
    points: 10
  }
];

// Lesson 3: Evidence and Hierarchy of Calls
export const d3_lesson03_archetypes: QuestionArchetype[] = [
  {
    type: 'multiple_choice',
    questionVariants: [
      "In most jurisdictions, which has highest priority?",
      "What takes precedence in conflicting boundary evidence?",
      "The highest priority in resolving deed conflicts goes to:",
      "When deed elements conflict, which prevails?",
      "In the hierarchy of calls, which ranks highest?"
    ],
    optionSets: [
      ["Area (acres)", "Distance", "Natural monument", "Bearing"],
      ["Calculated area", "Artificial monuments", "Natural monuments", "Courses and distances"],
      ["Area calculations", "Directions", "Natural monuments", "Distances"],
      ["Acreage", "Bearings", "Natural monuments", "Coordinates"],
      ["Survey plat", "Area", "Natural monument", "GPS coordinates"]
    ],
    correctAnswers: ["2", "2", "2", "2", "2"],
    explanationVariants: [
      "Typical hierarchy: Natural monuments > Artificial monuments > Bearings/Distances > Area",
      "Natural monuments have highest priority in resolving conflicts",
      "Natural monuments prevail over other types of evidence",
      "Natural monuments control over distances, bearings, and area",
      "Natural monuments rank highest in the hierarchy of calls"
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "If a deed says 'N45°E 100 feet to an oak tree' but the oak is at 95 feet, the corner is:",
      "When a monument conflicts with a distance, the boundary is at:",
      "A deed calls for 150 feet to a stone, but the stone is at 147 feet. The corner is:",
      "If a call says '200 feet to the iron pipe' but the pipe is at 198 feet:",
      "When distance and monument conflict, which controls?"
    ],
    optionSets: [
      ["At 100 feet", "At the oak tree", "Between them", "Undefined"],
      ["The stated distance", "The monument location", "The average", "Neither"],
      ["At 150 feet", "At the stone", "At 148.5 feet", "Uncertain"],
      ["Corner is at 200 feet", "Corner is at the iron pipe", "Use GPS to decide", "Split the difference"],
      ["Distance always controls", "Monument controls", "Survey plat controls", "Area controls"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "Monument (oak tree) controls over distance measurement",
      "The monument location prevails over the stated distance",
      "The stone (monument) controls over the stated distance",
      "The monument (iron pipe) controls over the stated distance",
      "Monuments control over distances in the hierarchy of calls"
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "Original monuments are preferred over:",
      "When original and newer monuments exist:",
      "In boundary disputes, original monuments:",
      "Original survey monuments take precedence over:",
      "The preference for original monuments means:"
    ],
    optionSets: [
      ["Newer monuments", "Measurements", "Both A and B", "Neither"],
      ["Original ones control", "Newer ones control", "Average is used", "Court decides"],
      ["Are disregarded", "Have highest priority", "Are replaced", "Equal newer ones"],
      ["Nothing", "Newer monuments and measurements", "Only measurements", "Only area"],
      ["New monuments replace old", "Old monuments prevail", "All monuments equal", "Measurements control"]
    ],
    correctAnswers: ["2", "0", "1", "1", "1"],
    explanationVariants: [
      "Original monuments from first survey have highest priority",
      "Original monuments control over newer replacements",
      "Original monuments have the highest priority in retracement",
      "Original monuments take precedence over newer evidence",
      "Original monuments prevail as they define the original boundary"
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "Parol evidence (oral testimony) can:",
      "Oral testimony in boundary disputes:",
      "Parol evidence is allowed to:",
      "In surveying, parol evidence may:",
      "The role of oral testimony in boundary cases is to:"
    ],
    optionSets: [
      ["Never be used", "Clarify ambiguities", "Override deeds", "Create boundaries"],
      ["Replace written evidence", "Explain unclear descriptions", "Void the deed", "Define ownership"],
      ["Contradict the deed", "Clarify ambiguous terms", "Create new boundaries", "Nullify monuments"],
      ["Override measurements", "Explain ambiguous calls", "Change deed terms", "Create easements"],
      ["Replace the survey", "Clarify ambiguous descriptions", "Override original corners", "Create new corners"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "Testimony can clarify ambiguous deeds but can't contradict clear written evidence",
      "Oral testimony can explain unclear or ambiguous descriptions",
      "Parol evidence may clarify ambiguities but not contradict written terms",
      "Parol evidence can explain ambiguous calls in descriptions",
      "Oral testimony helps clarify ambiguous descriptions"
    ],
    points: 10
  },
  {
    type: 'conceptual_fill_in_blank',
    questionVariants: [
      "A natural monument might be a river, tree, or ___ (one word, geographic feature).",
      "Examples of natural monuments include rivers, trees, and ___.",
      "Natural monuments include streams, ridges, and ___.",
      "A ___ is an example of a natural monument (rocky formation).",
      "Natural monuments such as trees, rivers, and ___ define boundaries."
    ],
    answerVariants: ["rock", "rocks", "stones", "rock", "ridges"],
    explanationVariants: [
      "Natural monuments include rivers, streams, rocks, trees, ridges, etc.",
      "Rocks are common natural monuments used in boundary descriptions",
      "Stones/rocks are natural monuments found at corners",
      "Rocks are natural monuments often referenced in deeds",
      "Natural features like ridges serve as natural monuments"
    ],
    points: 10
  }
];

// Lesson 4: Adverse Possession and Prescription
export const d3_lesson04_archetypes: QuestionArchetype[] = [
  {
    type: 'multiple_choice',
    questionVariants: [
      "Adverse possession requires use that is:",
      "For adverse possession, occupation must be:",
      "The requirements for adverse possession include:",
      "Adverse possession claims require the use to be:",
      "Which describes requirements for adverse possession?"
    ],
    optionSets: [
      ["Secret", "Open and notorious", "Permissive", "Occasional"],
      ["Hidden", "Open, notorious, continuous, hostile", "Permitted by owner", "Intermittent"],
      ["Concealed use", "Open, continuous, exclusive, hostile", "Licensed use", "Sporadic access"],
      ["Private", "Open, notorious, and continuous", "Approved by deed", "Short-term"],
      ["Secret possession", "Visible, continuous, exclusive, adverse", "Periodic visits", "Rental agreement"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "Use must be open, notorious, continuous, exclusive, and hostile for statutory period",
      "Occupation must be open, notorious, continuous, exclusive, and hostile",
      "Adverse possession requires open, continuous, exclusive, and hostile use",
      "The use must be open, notorious, and continuous",
      "Adverse possession requires visible, continuous, exclusive, and adverse use"
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "The statutory period for adverse possession is typically:",
      "How long must adverse possession continue?",
      "Most states require adverse possession for:",
      "The typical time period for adverse possession is:",
      "Adverse possession statutes usually require:"
    ],
    optionSets: [
      ["1-5 years", "7-20 years", "30-40 years", "50+ years"],
      ["1-3 years", "5-21 years", "25-35 years", "40-50 years"],
      ["Less than 5 years", "7-21 years depending on state", "Always 30 years", "At least 50 years"],
      ["2-4 years", "10-20 years typically", "35-45 years", "Over 60 years"],
      ["5 years or less", "Typically 7-20 years", "Minimum 30 years", "At least 40 years"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "Most states require 7-20 years of adverse use (varies by state)",
      "The statutory period varies by state, typically 5-21 years",
      "Most states require 7-21 years of adverse possession",
      "The typical period is 10-20 years depending on jurisdiction",
      "Most statutes require 7-20 years of continuous adverse use"
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "'Hostile' use means:",
      "In adverse possession, 'hostile' means:",
      "The hostility requirement for adverse possession means:",
      "'Hostile' in the context of adverse possession refers to:",
      "What does 'hostile use' mean in adverse possession?"
    ],
    optionSets: [
      ["Angry", "Without permission", "Violent", "Hidden"],
      ["Aggressive behavior", "Use without owner's consent", "Threatening actions", "Secretive use"],
      ["Confrontational", "Adverse to owner's rights", "Dangerous", "Concealed"],
      ["Violent occupation", "Without owner's permission", "Armed possession", "Invisible use"],
      ["Physical conflict", "Without authorization from owner", "Destructive use", "Underground use"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "Hostile = without owner's permission, adverse to owner's rights",
      "'Hostile' means use without the owner's consent",
      "Hostility means the use is adverse to the owner's rights",
      "Hostile means without the owner's permission",
      "Hostile use is without authorization from the property owner"
    ],
    points: 10
  },
  {
    type: 'conceptual_fill_in_blank',
    questionVariants: [
      "Prescription creates an ___ right, not ownership (starts with 'e').",
      "A prescriptive right results in an ___ rather than title (starts with 'e').",
      "Unlike adverse possession, prescription grants an ___ (starts with 'e').",
      "Through prescription, one acquires an ___ right (starts with 'e').",
      "Prescriptive use creates an ___ interest in property (starts with 'e')."
    ],
    answerVariants: ["easement", "easement", "easement", "easement", "easement"],
    explanationVariants: [
      "Prescription results in easement rights through continuous use",
      "Prescriptive rights create easements, not ownership transfer",
      "Prescription grants an easement rather than ownership",
      "Through prescription, an easement right is acquired",
      "Prescriptive use creates an easement interest"
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "Can you adversely possess government land?",
      "Adverse possession of public land is:",
      "Government-owned property and adverse possession:",
      "Can someone claim adverse possession against the state?",
      "Adverse possession claims against government are:"
    ],
    optionSets: [
      ["Yes, always", "No, generally not", "Only federal land", "Only state land"],
      ["Always allowed", "Generally prohibited", "Allowed after 50 years", "Allowed with notice"],
      ["Encouraged", "Generally prohibited by law", "Permitted for tax land", "Automatic"],
      ["Yes, like private land", "Generally not allowed", "Only with court approval", "After 100 years"],
      ["Freely permitted", "Generally not recognized", "Allowed for roads", "Automatic after statutory period"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "Most jurisdictions prohibit adverse possession of public/government lands",
      "Adverse possession of government land is generally prohibited",
      "Government property is generally exempt from adverse possession claims",
      "Adverse possession against the state is generally not allowed",
      "Adverse possession claims against government are generally not recognized"
    ],
    points: 10
  }
];

// Lesson 5: Riparian and Littoral Rights
export const d3_lesson05_archetypes: QuestionArchetype[] = [
  {
    type: 'multiple_choice',
    questionVariants: [
      "Riparian rights apply to property adjacent to:",
      "Riparian properties are those bordering:",
      "Riparian rights govern properties next to:",
      "Which type of water feature involves riparian rights?",
      "Riparian rights are associated with:"
    ],
    optionSets: [
      ["Lakes", "Rivers/streams", "Oceans", "Ponds"],
      ["Still water", "Flowing water (rivers, streams)", "Salt water", "Underground water"],
      ["Lakes and ponds", "Streams and rivers", "Oceans and seas", "Groundwater"],
      ["Large lakes", "Flowing watercourses", "Coastal areas", "Reservoirs"],
      ["Standing water", "Moving water (streams, rivers)", "Tidal areas", "Wetlands"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "Riparian = flowing water (rivers, streams); Littoral = still water (lakes, seas)",
      "Riparian rights apply to flowing water like rivers and streams",
      "Riparian rights govern properties next to streams and rivers",
      "Flowing watercourses involve riparian rights",
      "Riparian rights are associated with moving water"
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "Accretion is:",
      "What is accretion in water boundary law?",
      "Accretion refers to:",
      "The process of accretion involves:",
      "Land gained through accretion is:"
    ],
    optionSets: [
      ["Sudden land loss", "Gradual land addition", "Flooding", "Erosion"],
      ["Sudden change in watercourse", "Gradual deposit of soil by water", "Land removal", "Drainage"],
      ["Quick land loss", "Slow buildup of land by water deposits", "Avulsion", "Flooding damage"],
      ["Rapid erosion", "Gradual addition of soil by water action", "Sudden course change", "Excavation"],
      ["Lost to the owner", "Gained by the riparian owner", "State property", "Public domain"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "Accretion = gradual deposit of soil by water, becomes owner's property",
      "Accretion is the gradual deposit of soil by water",
      "Accretion refers to slow buildup of land by water deposits",
      "Accretion involves gradual addition of soil by water action",
      "Land gained through accretion belongs to the riparian owner"
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "Avulsion is:",
      "What distinguishes avulsion from accretion?",
      "Avulsion refers to:",
      "An avulsion occurs when:",
      "The key characteristic of avulsion is:"
    ],
    optionSets: [
      ["Gradual change", "Sudden change", "Normal flow", "Dry land"],
      ["Slow process", "Rapid, sudden change in watercourse", "Gradual buildup", "Erosion over time"],
      ["Slow erosion", "Sudden change in water course", "Gradual accretion", "Normal flooding"],
      ["Land builds slowly", "Water course suddenly changes", "Sediment deposits slowly", "Boundary moves gradually"],
      ["Gradual change", "Sudden, rapid change", "No effect on boundary", "Predictable movement"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "Avulsion = sudden change in watercourse (flood, storm); boundary doesn't move",
      "Avulsion is rapid and sudden, while accretion is gradual",
      "Avulsion refers to sudden change in water course location",
      "An avulsion occurs when water course suddenly changes",
      "Avulsion is characterized by sudden, rapid change"
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "When a navigable river changes course gradually:",
      "For gradual changes in a water boundary:",
      "If a river slowly moves its channel:",
      "Gradual changes in water boundaries result in:",
      "When erosion slowly moves a river bank:"
    ],
    optionSets: [
      ["Boundary stays at old location", "Boundary follows new channel", "Boundary is undefined", "Government takes ownership"],
      ["Boundary is fixed", "Boundary moves with the water", "Boundary requires resurvey", "No change occurs"],
      ["Boundary remains fixed", "Boundary follows the new channel", "Ownership is lost", "State claims land"],
      ["Fixed boundary lines", "Ambulatory (moving) boundary", "Loss of property rights", "Disputed ownership"],
      ["No boundary change", "Boundary follows the water line", "Ownership dispute", "Government intervention"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "For gradual changes (accretion/erosion), boundary follows ambulatory water line",
      "The boundary moves with gradual changes in the water course",
      "Gradual changes cause the boundary to follow the new channel",
      "Gradual changes result in an ambulatory (moving) boundary",
      "The boundary follows the water line for gradual changes"
    ],
    points: 10
  },
  {
    type: 'conceptual_fill_in_blank',
    questionVariants: [
      "The gradual wearing away of land by water is called ___.",
      "The opposite of accretion is ___.",
      "Land lost gradually to water action is called ___.",
      "The process of water gradually removing soil is ___.",
      "___ is the gradual loss of land to water action."
    ],
    answerVariants: ["erosion", "erosion", "erosion", "erosion", "Erosion"],
    explanationVariants: [
      "Erosion removes land; accretion adds land (both gradual)",
      "Erosion is the opposite process of accretion",
      "Land lost gradually is removed by erosion",
      "Water gradually removing soil is erosion",
      "Erosion is the gradual loss of land to water action"
    ],
    points: 10
  }
];

// Lesson 6: Public Land Survey System (PLSS)
export const d3_lesson06_archetypes: QuestionArchetype[] = [
  {
    type: 'fill_in_blank',
    template: "A township is {n} miles square.",
    paramRanges: {
      n: [6, 6, 6, 6, 6]
    },
    computeAnswer: (p) => "6",
    computeExplanation: (p, ans) => `Township = 6 miles × 6 miles = 36 square miles = 36 sections`,
    points: 10
  },
  {
    type: 'fill_in_blank',
    template: "A section contains ___ acres. (Enter {n} to confirm: 640)",
    paramRanges: {
      n: [640, 640, 640, 640, 640]
    },
    computeAnswer: (p) => "640",
    computeExplanation: (p, ans) => `1 section = 1 mi² = 640 acres`,
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "How many sections are in a township?",
      "A township contains how many sections?",
      "The number of sections in a standard township is:",
      "A full township has how many sections?",
      "Townships are divided into how many sections?"
    ],
    optionSets: [
      ["16", "24", "36", "64"],
      ["24", "30", "36", "40"],
      ["25", "32", "36", "48"],
      ["20", "28", "36", "42"],
      ["18", "27", "36", "54"]
    ],
    correctAnswers: ["2", "2", "2", "2", "2"],
    explanationVariants: [
      "Township = 6×6 miles = 36 sections (numbered 1-36)",
      "A township contains 36 sections (6 rows × 6 columns)",
      "A standard township has 36 sections",
      "A full township has 36 sections",
      "Townships are divided into 36 sections"
    ],
    points: 10
  },
  {
    type: 'fill_in_blank',
    template: "A quarter section contains {n} acres. (Enter the correct value)",
    paramRanges: {
      n: [160, 160, 160, 160, 160]
    },
    computeAnswer: (p) => "160",
    computeExplanation: (p, ans) => `1/4 of 640 acres = 160 acres`,
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "Township and Range are referenced from:",
      "The origin for Township and Range measurements is:",
      "Township and Range coordinates are measured from:",
      "In PLSS, townships are referenced to:",
      "The reference lines for PLSS are:"
    ],
    optionSets: [
      ["County lines", "Principal Meridian and Base Line", "State boundaries", "City centers"],
      ["State capitals", "Initial Point with meridian and baseline", "GPS origin", "Local benchmarks"],
      ["Section corners", "Principal Meridian and Base Line", "Range lines", "Township lines"],
      ["Geographic center", "Principal Meridian and Base Line", "County seats", "Section centers"],
      ["State lines", "Principal Meridian and Base Line", "Section corners", "Quarter corners"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "Townships count north/south from Base Line; Ranges count east/west from Principal Meridian",
      "The Initial Point defines the Principal Meridian and Base Line",
      "Township and Range are measured from Principal Meridian and Base Line",
      "Townships reference the Principal Meridian and Base Line",
      "The Principal Meridian and Base Line are the reference lines"
    ],
    points: 10
  }
];

// Lesson 7: Boundary Retracement vs. Establishment
export const d3_lesson07_archetypes: QuestionArchetype[] = [
  {
    type: 'multiple_choice',
    questionVariants: [
      "When retracing a boundary, the surveyor's job is to:",
      "In retracement surveys, the surveyor must:",
      "The purpose of a retracement survey is to:",
      "A surveyor retracing boundaries should:",
      "Retracement surveying involves:"
    ],
    optionSets: [
      ["Create the best boundary", "Find the original boundary", "Average all evidence", "Establish new corners"],
      ["Improve on the original", "Recover the original boundary", "Create new lines", "Relocate corners"],
      ["Design better boundaries", "Recover the original location", "Establish new corners", "Ignore old evidence"],
      ["Modify the original", "Follow the original surveyor's footsteps", "Create improved corners", "Reset all monuments"],
      ["Creating new boundaries", "Recovering original boundaries", "Averaging locations", "Replacing monuments"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "Retracement recovers what was originally established, not create something new",
      "The surveyor must recover the original boundary, not create a new one",
      "The purpose is to recover the original boundary location",
      "The surveyor should follow the original surveyor's footsteps",
      "Retracement involves recovering original boundaries"
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "Original survey monuments are:",
      "The status of original monuments is:",
      "Original monuments in boundary law are:",
      "How are original monuments treated?",
      "Original survey monuments carry:"
    ],
    optionSets: [
      ["Advisory only", "Conclusive evidence", "Can be moved", "Optional"],
      ["Suggestions", "Controlling evidence", "Replaceable", "Temporary"],
      ["Guidelines only", "The highest evidence of boundary", "Moveable", "Secondary evidence"],
      ["As reference only", "As conclusive boundary evidence", "As moveable markers", "As temporary points"],
      ["Little weight", "Highest priority as evidence", "Equal weight to measurements", "Less weight than plats"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "Original monuments define boundary location and are highest evidence",
      "Original monuments are controlling evidence of boundary location",
      "Original monuments are the highest evidence of boundary location",
      "Original monuments are treated as conclusive boundary evidence",
      "Original monuments carry the highest priority as evidence"
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "In a subdivision, lot boundaries are:",
      "When creating a subdivision, boundaries are:",
      "Subdivision lot lines are:",
      "Creating lot boundaries in a subdivision is:",
      "New lot lines in a subdivision are:"
    ],
    optionSets: [
      ["Retraced", "Established", "Arbitrary", "Undefined"],
      ["Recovered", "Newly created/established", "Random", "Approximate"],
      ["Found", "Established anew", "Copied", "Estimated"],
      ["Retracement", "Establishment", "Discovery", "Approximation"],
      ["Recovered", "Originally established", "Averaged", "Assumed"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "Subdivisions establish new boundaries creating lots from larger parcels",
      "Subdivision creates new/established boundaries",
      "Subdivision lot lines are established anew",
      "Creating lot boundaries in a subdivision is establishment",
      "New lot lines in a subdivision are originally established"
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "A resurvey should:",
      "When conducting a resurvey:",
      "The goal of a resurvey is to:",
      "In a resurvey, the surveyor should:",
      "Resurveys are meant to:"
    ],
    optionSets: [
      ["Improve the original", "Follow the original", "Create new corners", "Ignore old evidence"],
      ["Create better lines", "Recover original locations", "Establish improved corners", "Average all evidence"],
      ["Design new boundaries", "Recover original boundaries", "Relocate corners", "Modify monuments"],
      ["Improve accuracy", "Follow original surveyor's work", "Establish new monuments", "Create new lines"],
      ["Replace original survey", "Recover original survey", "Create improved boundaries", "Average measurements"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "Resurveys retrace and recover original survey, not redo or improve it",
      "A resurvey should recover original locations",
      "The goal is to recover original boundaries, not create new ones",
      "The surveyor should follow original surveyor's work",
      "Resurveys recover the original survey"
    ],
    points: 10
  },
  {
    type: 'conceptual_fill_in_blank',
    questionVariants: [
      "Following the original surveyor's footsteps is called ___ (starts with 'r').",
      "Recovering original boundary locations is called ___ (starts with 'r').",
      "The process of finding original corners is ___ (starts with 'r').",
      "___ is following the path of the original surveyor (starts with 'r').",
      "Recovering existing boundaries rather than creating new ones is called ___."
    ],
    answerVariants: ["retracement", "retracement", "retracement", "Retracement", "retracement"],
    explanationVariants: [
      "Retracement = following original survey to recover boundaries",
      "Retracement is recovering original boundary locations",
      "Retracement is the process of finding original corners",
      "Retracement is following the original surveyor's footsteps",
      "Retracement recovers existing boundaries"
    ],
    points: 10
  }
];

// ============================================================================
// DOMAIN 4: SURVEYING PRINCIPLES - QUESTION ARCHETYPES
// ============================================================================

// Lesson 1: Horizontal Curves: Elements and Formulas
export const d4_lesson01_archetypes: QuestionArchetype[] = [
  {
    type: 'multiple_choice',
    questionVariants: [
      "The delta angle (Δ) of a curve is:",
      "What does delta (Δ) represent in horizontal curves?",
      "In horizontal curve geometry, Δ is the:",
      "The central angle of a horizontal curve is called:",
      "Delta in curve calculations represents:"
    ],
    optionSets: [
      ["The radius", "The central angle", "The tangent length", "The curve length"],
      ["Curve radius", "Deflection/central angle", "Tangent distance", "External distance"],
      ["Chord length", "Central angle", "Arc length", "Degree of curve"],
      ["Radius", "Delta (Δ)", "Tangent", "External"],
      ["Curve length", "Central/deflection angle", "Chord", "Middle ordinate"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "Delta (Δ) is the central angle subtended by the curve",
      "Delta represents the deflection or central angle of the curve",
      "Δ is the central angle of a horizontal curve",
      "The central angle is called delta (Δ)",
      "Delta represents the central or deflection angle"
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "For a curve, T = R tan(Δ/2). T represents:",
      "In the formula T = R tan(Δ/2), what is T?",
      "The tangent distance T in curve design is:",
      "T = R tan(Δ/2) calculates the:",
      "What does T represent in horizontal curve formulas?"
    ],
    optionSets: [
      ["Total length", "Tangent distance", "Radius", "Delta"],
      ["Traverse distance", "Tangent length from PI to PC/PT", "Total curve length", "Deflection"],
      ["Through distance", "Distance from PI to PC or PT", "Curve length", "Chord length"],
      ["Total arc", "Tangent distance", "Transition length", "Turn distance"],
      ["Total station", "Tangent distance from PI", "Turning angle", "Transit distance"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "T = tangent distance from PI to PC or PT",
      "T is the tangent length from PI to PC or PT",
      "T is the distance from PI to PC or PT",
      "The formula calculates tangent distance",
      "T represents the tangent distance from PI"
    ],
    points: 10
  },
  {
    type: 'fill_in_blank',
    template: "If R = {r} ft and Δ = 60°, the tangent T = R × tan(30°) ≈ ___ feet (round to nearest whole number).",
    paramRanges: {
      r: [200, 300, 400, 500]
    },
    computeAnswer: (p) => String(Math.round(p.r * Math.tan(30 * Math.PI / 180))),
    computeExplanation: (p, ans) => `T = ${p.r} × tan(30°) = ${p.r} × 0.577 ≈ ${ans} feet`,
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "PC stands for:",
      "What does PC mean in route surveying?",
      "The abbreviation PC represents:",
      "PC in horizontal curves is the:",
      "Point of Curvature is abbreviated as:"
    ],
    optionSets: [
      ["Point of Curve", "Point of Center", "Point of Calculation", "Principal Corner"],
      ["Point of Curvature/Curve", "Point of Chord", "Point of Circular", "Point of Crossing"],
      ["Point of Curve beginning", "Point of Closure", "Point of Coordinate", "Principal Control"],
      ["Point where curve starts", "Point of Chord center", "Point of Calculation", "Point of Calibration"],
      ["PC (Point of Curve)", "PC (Point of Chord)", "PC (Point of Center)", "PC (Point of Circle)"]
    ],
    correctAnswers: ["0", "0", "0", "0", "0"],
    explanationVariants: [
      "PC = Point of Curve (where curve begins); PT = Point of Tangent (where curve ends)",
      "PC = Point of Curvature/Curve, where the curve begins",
      "PC is the Point of Curve beginning",
      "PC is the point where the curve starts",
      "PC stands for Point of Curve"
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "Curve length L is calculated by:",
      "The formula for arc length of a curve is:",
      "How is curve length L determined?",
      "The length of a horizontal curve is:",
      "L = R × Δ requires Δ in what units?"
    ],
    optionSets: [
      ["L = R × Δ (Δ in radians)", "L = R/Δ", "L = R + Δ", "L = Δ/R"],
      ["L = πRΔ/180 (Δ in degrees)", "L = R - Δ", "L = R × Δ²", "L = Δ × R²"],
      ["L = R × Δ (radians) or πRΔ/180 (degrees)", "L = R/Δ only", "L = 2πR always", "L = R + Δ always"],
      ["L = R × Δ with Δ in radians", "L = Δ/R", "L = R/2Δ", "L = 2R × Δ"],
      ["Radians", "Degrees", "Gradians", "Percent"]
    ],
    correctAnswers: ["0", "0", "0", "0", "0"],
    explanationVariants: [
      "L = R × Δ where Δ must be in radians (or L = πRΔ/180 if Δ in degrees)",
      "L = πRΔ/180 when Δ is in degrees, or L = RΔ when Δ is in radians",
      "Curve length uses L = R × Δ (radians) or πRΔ/180 (degrees)",
      "L = R × Δ with Δ in radians",
      "L = R × Δ requires Δ in radians"
    ],
    points: 10
  }
];

// Lesson 2: Vertical Curves and Grade Changes
export const d4_lesson02_archetypes: QuestionArchetype[] = [
  {
    type: 'multiple_choice',
    questionVariants: [
      "Vertical curves are typically:",
      "The shape of a vertical curve is:",
      "What type of curve is used for vertical alignment?",
      "Vertical curves in highway design are:",
      "The mathematical form of vertical curves is:"
    ],
    optionSets: [
      ["Circular", "Parabolic", "Elliptical", "Hyperbolic"],
      ["Circular arcs", "Parabolas", "Sine waves", "Spirals"],
      ["Circular", "Parabolic", "Linear", "Exponential"],
      ["Circular", "Parabolic", "Elliptical", "Compound"],
      ["Circular", "Parabolic (second degree)", "Cubic", "Linear"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "Parabolic curves provide constant rate of change of grade",
      "Vertical curves use parabolas for smooth transitions",
      "Parabolic curves are used for vertical alignment",
      "Vertical curves in highway design are parabolic",
      "Vertical curves use parabolic (second degree) equations"
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "PVI stands for:",
      "What does PVI mean in vertical curves?",
      "The abbreviation PVI represents:",
      "PVI in profile design is the:",
      "Point of Vertical Intersection is abbreviated:"
    ],
    optionSets: [
      ["Point of Vertical Intersection", "Point of Vertical Incline", "Peak Vertical Interval", "Previous Vertical Index"],
      ["Point of Vertical Intersection", "Point of Vertical Inflection", "Peak Vertical Index", "Primary Vertical Indicator"],
      ["Point of Vertical Intersection", "Point of Vertical Interval", "Profile Vertical Index", "Peak Vertical Incline"],
      ["Point of Vertical Intersection", "Point of Vertical Inclination", "Primary Vertical Intersection", "Peak Vertical Intersection"],
      ["PVI", "PVC", "PVT", "BVC"]
    ],
    correctAnswers: ["0", "0", "0", "0", "0"],
    explanationVariants: [
      "PVI = Point of Vertical Intersection where two grades meet",
      "PVI is the Point of Vertical Intersection",
      "PVI represents Point of Vertical Intersection",
      "PVI is the Point of Vertical Intersection in profile design",
      "Point of Vertical Intersection is PVI"
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "The algebraic difference in grades is:",
      "How is the grade difference A calculated?",
      "A = G2 - G1 gives the:",
      "The algebraic grade difference formula is:",
      "To find the grade difference:"
    ],
    optionSets: [
      ["G1 + G2", "G2 - G1", "Absolute value of difference", "Average of grades"],
      ["Sum of grades", "Second grade minus first grade", "Product of grades", "Larger minus smaller"],
      ["Sum of both grades", "Algebraic difference of grades", "Average grade", "Ratio of grades"],
      ["A = G1 + G2", "A = G2 - G1 (considering signs)", "A = (G1 + G2)/2", "A = G1 × G2"],
      ["Add the grades", "Subtract G1 from G2 algebraically", "Find the average", "Multiply the grades"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "A = G2 - G1 (considering signs: +up, -down)",
      "A is calculated as G2 - G1",
      "G2 - G1 gives the algebraic difference of grades",
      "A = G2 - G1 considering the signs of both grades",
      "Subtract G1 from G2 algebraically"
    ],
    points: 10
  },
  {
    type: 'fill_in_blank',
    template: "If incoming grade = +{g1}% and outgoing grade = -{g2}%, the algebraic difference A = ___% (include sign).",
    paramRanges: {
      g1: [2, 3, 4, 5],
      g2: [2, 3, 4, 5]
    },
    computeAnswer: (p) => String(-p.g2 - p.g1),
    computeExplanation: (p, ans) => `A = G2 - G1 = (-${p.g2}) - (+${p.g1}) = ${ans}%`,
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "A sag vertical curve occurs when:",
      "When is a sag curve needed?",
      "Sag vertical curves are used where:",
      "A sag curve connects:",
      "The condition for a sag curve is:"
    ],
    optionSets: [
      ["Both grades positive", "Grade changes from + to -", "Grade changes from - to +", "Both grades negative"],
      ["Upgrade to downgrade", "Downgrade to upgrade", "Level sections", "Same grade continues"],
      ["Hills", "Valleys (grade increases)", "Peaks", "Flat areas"],
      ["Upgrade to downgrade", "Downgrade to upgrade", "Same grades", "Level to incline"],
      ["G2 < G1", "G2 > G1 (grade increases)", "G1 = G2", "Grades are equal"]
    ],
    correctAnswers: ["2", "1", "1", "1", "1"],
    explanationVariants: [
      "Sag curve: grade increases (- to + or less negative to more positive)",
      "Sag curves are needed when grade changes from down to up",
      "Sag curves occur in valleys where grade increases",
      "Sag curves connect downgrade to upgrade",
      "Sag curves occur when G2 > G1 (grade increases)"
    ],
    points: 10
  }
];

// Lesson 3: Spirals and Transition Curves
export const d4_lesson03_archetypes: QuestionArchetype[] = [
  {
    type: 'multiple_choice',
    questionVariants: [
      "Spiral curves are used to:",
      "The purpose of spiral (transition) curves is to:",
      "Why are spiral curves used in highway design?",
      "Spirals provide:",
      "Transition curves (spirals) are needed to:"
    ],
    optionSets: [
      ["Save money", "Provide gradual transition", "Mark boundaries", "Reduce length"],
      ["Decrease costs", "Allow gradual change from tangent to curve", "Simplify design", "Shorten routes"],
      ["Reduce materials", "Provide smooth transition to circular curves", "Mark endpoints", "Decrease speed"],
      ["Cost savings", "Gradual curvature change", "Straight sections", "Sharp turns"],
      ["Reduce land use", "Ease vehicles into curves", "Mark curve points", "Increase visibility"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "Spirals provide gradual change from zero curvature (tangent) to curve radius",
      "Spirals allow gradual change from tangent to circular curve",
      "Spirals provide smooth transition from straight to curved alignment",
      "Spirals provide gradual curvature change",
      "Spirals ease vehicles into curves gradually"
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "In a spiral curve, radius:",
      "The radius along a spiral curve:",
      "How does radius change in a spiral?",
      "Spiral curve radius varies from:",
      "Along a spiral, the radius:"
    ],
    optionSets: [
      ["Is constant", "Increases from infinite to R", "Decreases from R to zero", "Doesn't exist"],
      ["Remains fixed", "Gradually decreases from infinite to R", "Increases from R", "Stays at R"],
      ["Stays constant", "Decreases from infinity (tangent) to R", "Increases continuously", "Equals R throughout"],
      ["R to infinity", "Infinity to R (circular curve)", "Zero to R", "R to 2R"],
      ["Is constant at R", "Decreases from infinite to final R", "Increases to infinity", "Varies randomly"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "Radius gradually decreases from infinite (tangent) to R (circular curve)",
      "Radius decreases from infinite (straight) to the circular curve radius",
      "Radius decreases from infinity (tangent) to R",
      "Radius varies from infinity (at tangent) to R (at circular curve)",
      "Radius decreases from infinite to the final curve radius R"
    ],
    points: 10
  },
  {
    type: 'conceptual_fill_in_blank',
    questionVariants: [
      "The point where spiral meets circular curve is called ___ (two letters).",
      "SC stands for Spiral to ___.",
      "The transition from spiral to circular curve occurs at point ___.",
      "Where the spiral ends and circular curve begins is called ___.",
      "The ___ point marks where spiral transitions to circular curve."
    ],
    answerVariants: ["SC", "Curve", "SC", "SC", "SC"],
    explanationVariants: [
      "SC = Spiral to Curve; CS = Curve to Spiral",
      "SC means Spiral to Curve",
      "The SC point is where spiral meets circular curve",
      "The SC (Spiral to Curve) point marks this transition",
      "The SC point marks where spiral transitions to circular curve"
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "Spirals are most important for:",
      "Where are spiral curves most critical?",
      "Spiral curves are essential for:",
      "The use of spirals is most important on:",
      "Spirals are primarily designed for:"
    ],
    optionSets: [
      ["Low-speed roads", "High-speed roads", "Parking lots", "Sidewalks"],
      ["Urban streets", "Highways and high-speed roads", "Driveways", "Walking paths"],
      ["Residential areas", "High-speed transportation", "Parking areas", "Pedestrian paths"],
      ["Local roads", "High-speed highways and railroads", "Shopping centers", "School zones"],
      ["City streets", "High-speed facilities", "Intersections", "Dead ends"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "High-speed roads need gradual transitions to prevent sudden steering changes",
      "Spirals are critical on highways and high-speed roads",
      "Spirals are essential for high-speed transportation",
      "Spirals are most important on high-speed highways and railroads",
      "Spirals are designed for high-speed facilities"
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "The length of spiral depends on:",
      "Spiral length is determined by:",
      "What factors affect spiral curve length?",
      "Spiral curve length is based on:",
      "The spiral length is a function of:"
    ],
    optionSets: [
      ["Design speed and curve radius", "Color of pavement", "Weather", "Time of day"],
      ["Design speed, radius, and superelevation", "Pavement type", "Traffic volume only", "Season"],
      ["Speed, radius, and superelevation runoff", "Maintenance schedule", "Weather patterns", "Adjacent land use"],
      ["Design speed and curve geometry", "Paint color", "Traffic signals", "Lighting"],
      ["Speed and radius", "Asphalt type", "Shoulder width only", "Sign placement"]
    ],
    correctAnswers: ["0", "0", "0", "0", "0"],
    explanationVariants: [
      "Spiral length based on design speed, radius, and superelevation runoff",
      "Spiral length depends on design speed, radius, and superelevation",
      "Speed, radius, and superelevation runoff affect spiral length",
      "Spiral length is based on design speed and curve geometry",
      "Spiral length is a function of speed and radius"
    ],
    points: 10
  }
];

// Lesson 4: Earthwork and Volume Calculations
export const d4_lesson04_archetypes: QuestionArchetype[] = [
  {
    type: 'multiple_choice',
    questionVariants: [
      "The average end area method calculates volume as:",
      "Volume by average end area formula is:",
      "The average end area volume formula is:",
      "Using average end area, V equals:",
      "How is volume calculated using average end area?"
    ],
    optionSets: [
      ["(A1 + A2)/2", "(A1 + A2) × L / 2", "A1 × A2 × L", "A1 + A2 + L"],
      ["(A1 + A2)/L", "L(A1 + A2)/2", "(A1 - A2) × L", "A1 × L + A2"],
      ["A1 × A2/L", "V = (A1 + A2) × L / 2", "V = A1 - A2", "V = L/(A1 + A2)"],
      ["Area times length", "V = L × (A1 + A2) / 2", "V = A1/A2 × L", "V = (A1 × A2)/L"],
      ["Sum of areas", "Average of areas times length", "Product of areas", "Difference of areas"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "V = (A1 + A2) × L / 2, where A1, A2 are end areas and L is distance between",
      "V = L(A1 + A2)/2 is the average end area formula",
      "V = (A1 + A2) × L / 2 is the average end area formula",
      "V = L × (A1 + A2) / 2",
      "Average of areas times length gives volume"
    ],
    points: 10
  },
  {
    type: 'fill_in_blank',
    template: "If end areas are {a1} sq ft and {a2} sq ft with distance {l} ft between them, volume = ___ cubic feet.",
    paramRanges: {
      a1: [100, 120, 150, 200],
      a2: [140, 160, 180, 200],
      l: [50, 60, 80, 100]
    },
    computeAnswer: (p) => String((p.a1 + p.a2) * p.l / 2),
    computeExplanation: (p, ans) => `V = (${p.a1}+${p.a2}) × ${p.l} / 2 = ${p.a1 + p.a2} × ${p.l/2} = ${ans} cu ft`,
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "Cut means:",
      "In earthwork, 'cut' refers to:",
      "Cut in excavation is:",
      "What does 'cut' mean in grading?",
      "Cut operations involve:"
    ],
    optionSets: [
      ["Adding material", "Removing material", "Measuring", "Grading"],
      ["Fill operations", "Excavation/removal of earth", "Placing soil", "Compaction"],
      ["Adding earth", "Excavating and removing earth", "Importing fill", "Leveling only"],
      ["Bringing in material", "Excavating material out", "Compacting soil", "Testing soil"],
      ["Importing soil", "Excavating/removing soil", "Depositing fill", "Surveying"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "Cut = excavation (removing earth); Fill = embankment (adding earth)",
      "Cut refers to excavation and removal of earth",
      "Cut is excavating and removing earth",
      "Cut means excavating material out",
      "Cut involves excavating and removing soil"
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "The prismoidal formula is more accurate than average end area for:",
      "When is the prismoidal formula preferred?",
      "Prismoidal formula provides better accuracy for:",
      "The prismoidal formula is best used for:",
      "For irregular cross-sections, use:"
    ],
    optionSets: [
      ["Rectangular sections", "Irregular sections", "All sections", "No sections"],
      ["Uniform sections", "Varying cross-sections", "Constant areas", "Equal end areas"],
      ["Simple shapes", "Complex/varying sections", "Circular sections", "Square sections"],
      ["Constant cross-sections", "Varying/pyramidal sections", "Level ground", "Flat terrain"],
      ["Average end area", "Prismoidal formula", "Simple multiplication", "Unit area method"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "Prismoidal formula accounts for middle area: V = L/6(A1 + 4Am + A2)",
      "Prismoidal formula is better for varying cross-sections",
      "Complex/varying sections need the prismoidal formula",
      "Prismoidal formula is best for varying sections",
      "Use prismoidal formula for irregular cross-sections"
    ],
    points: 10
  },
  {
    type: 'fill_in_blank',
    template: "1 cubic yard equals {n} cubic feet. (Enter the correct value)",
    paramRanges: {
      n: [27, 27, 27, 27, 27]
    },
    computeAnswer: (p) => "27",
    computeExplanation: (p, ans) => `1 yd³ = 3ft × 3ft × 3ft = 27 ft³`,
    points: 10
  }
];

// Lesson 5: Construction Staking and Layout
export const d4_lesson05_archetypes: QuestionArchetype[] = [
  {
    type: 'multiple_choice',
    questionVariants: [
      "Offset stakes are placed:",
      "Where are offset stakes located?",
      "The purpose of offset stakes is that they are:",
      "Offset stakes are set:",
      "Why are stakes offset from construction?"
    ],
    optionSets: [
      ["At exact building corners", "Away from construction area", "Underground", "At random"],
      ["On the building footprint", "Outside the construction zone", "At corner points", "In the excavation"],
      ["At final position", "Away from disturbance", "In the hole", "On structure"],
      ["At finished corners", "Outside the work zone", "In excavation", "On foundations"],
      ["They don't need protection", "To survive construction activity", "For decoration", "For drainage"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "Offsets are set away from construction to avoid disturbance, with measurements to actual points",
      "Offset stakes are located outside the construction zone",
      "Offset stakes are placed away from disturbance",
      "Offset stakes are set outside the work zone",
      "Stakes are offset to survive construction activity"
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "A grade stake shows:",
      "Grade stakes indicate:",
      "The information on a grade stake includes:",
      "Grade stakes are marked with:",
      "What does a grade stake tell the contractor?"
    ],
    optionSets: [
      ["Property corners", "Cut or fill to design grade", "Coordinates", "Bearings"],
      ["Boundary lines", "Required cut or fill amount", "Property limits", "Azimuths"],
      ["Lot corners", "Elevation difference from design", "Section corners", "Angles"],
      ["Boundary marks", "Cut (-) or fill (+) to grade", "Property pins", "Directions"],
      ["Owner name", "How much to cut or fill", "Legal description", "Adjacent owners"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "Grade stakes mark required cut (-) or fill (+) to reach design elevation",
      "Grade stakes indicate required cut or fill amount",
      "Grade stakes show elevation difference from design",
      "Grade stakes show cut (-) or fill (+) to design grade",
      "Grade stakes tell contractor how much to cut or fill"
    ],
    points: 10
  },
  {
    type: 'fill_in_blank',
    template: "If ground elevation is {ground} ft and design grade is {design} ft, the grade stake shows ___ feet (include + or - sign).",
    paramRanges: {
      ground: [100, 102, 104, 106],
      design: [105, 106, 108, 110]
    },
    computeAnswer: (p) => `+${p.design - p.ground}`,
    computeExplanation: (p, ans) => `Fill needed = ${p.design} - ${p.ground} = ${ans} ft (positive = fill)`,
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "Slope stakes mark:",
      "What do slope stakes indicate?",
      "Slope stakes are placed at:",
      "The purpose of slope stakes is to mark:",
      "Slope stakes show:"
    ],
    optionSets: [
      ["Vertical walls", "Top and toe of slopes", "Building corners", "Tree locations"],
      ["Property lines", "Where slopes meet ground", "Fence posts", "Utility poles"],
      ["Boundaries", "Intersection of slopes with existing ground", "Center lines", "Road edges"],
      ["Legal corners", "Catch points (slope/ground intersection)", "Survey monuments", "Reference marks"],
      ["Property limits", "Where cut/fill slopes intersect ground", "Building footprint", "Parking areas"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "Slope stakes show where cut/fill slopes intersect existing ground",
      "Slope stakes indicate where slopes meet existing ground",
      "Slope stakes are placed at the intersection of slopes with existing ground",
      "Slope stakes mark catch points where slopes meet ground",
      "Slope stakes show where cut/fill slopes intersect ground"
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "A batter board is used for:",
      "Batter boards serve to:",
      "The purpose of batter boards is:",
      "Batter boards are used in:",
      "What construction element uses batter boards?"
    ],
    optionSets: [
      ["Fencing", "Building layout", "Grading", "Boundary marking"],
      ["Road construction", "Foundation layout and grades", "Pipeline work", "Surveying only"],
      ["Paving", "Establishing building lines and grades", "Drainage", "Landscaping"],
      ["Curb work", "Building corner and grade control", "Utility installation", "Fence layout"],
      ["Roadway", "Building foundation layout", "Sewer work", "Property survey"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "Batter boards are offset frames with string lines marking building corners and grades",
      "Batter boards are used for foundation layout and grades",
      "Batter boards establish building lines and grades",
      "Batter boards provide building corner and grade control",
      "Batter boards are used for building foundation layout"
    ],
    points: 10
  }
];

// Lesson 6: Route Surveying Principles
export const d4_lesson06_archetypes: QuestionArchetype[] = [
  {
    type: 'multiple_choice',
    questionVariants: [
      "Stationing measures distance:",
      "In route surveying, stationing starts:",
      "Station values represent:",
      "The stationing system measures:",
      "Stationing provides distance from:"
    ],
    optionSets: [
      ["From project start", "Between curves", "Vertically", "In feet only"],
      ["At the end", "From the beginning of project", "At random points", "From any reference"],
      ["Elevation", "Distance from project origin", "Width", "Curve radius"],
      ["Vertical distance", "Distance along centerline from start", "Cross-section width", "Grade"],
      ["Nearest curve", "Project beginning", "Nearest intersection", "Any convenient point"]
    ],
    correctAnswers: ["0", "1", "1", "1", "1"],
    explanationVariants: [
      "Stationing starts at 0+00 and increases along centerline (10+00 = 1000 ft from start)",
      "Stationing starts from the beginning of the project",
      "Station values represent distance from project origin",
      "Stationing measures distance along centerline from start",
      "Stationing provides distance from project beginning"
    ],
    points: 10
  },
  {
    type: 'fill_in_blank',
    template: "Station {sta}+{plus} is ___ feet from the beginning.",
    paramRanges: {
      sta: [10, 15, 20, 25, 30],
      plus: [25, 50, 75, 0]
    },
    computeAnswer: (p) => String(p.sta * 100 + p.plus),
    computeExplanation: (p, ans) => `Station ${p.sta}+${String(p.plus).padStart(2, '0')} = ${p.sta}(100) + ${p.plus} = ${ans} feet`,
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "The first phase of route surveying is:",
      "Route surveying begins with:",
      "What is the initial step in route location?",
      "The first stage of highway location is:",
      "Route planning starts with:"
    ],
    optionSets: [
      ["Final design", "Construction", "Reconnaissance", "Staking"],
      ["Staking", "Reconnaissance survey", "Final plans", "Earthwork"],
      ["Construction staking", "Reconnaissance", "Grading", "Paving"],
      ["Final location", "Reconnaissance", "Profile survey", "Cross-sections"],
      ["Construction", "Reconnaissance", "Grading operations", "Final staking"]
    ],
    correctAnswers: ["2", "1", "1", "1", "1"],
    explanationVariants: [
      "Reconnaissance identifies feasible routes; preliminary survey evaluates alternatives; location finalizes design",
      "Route surveying begins with reconnaissance survey",
      "Reconnaissance is the initial step in route location",
      "The first stage is reconnaissance",
      "Route planning starts with reconnaissance"
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "Cross-sections are taken:",
      "Cross-section surveys are made:",
      "Where are cross-sections measured?",
      "Cross-section data is collected:",
      "The orientation of cross-sections is:"
    ],
    optionSets: [
      ["Along centerline only", "Perpendicular to centerline", "At random", "Only at curves"],
      ["Parallel to centerline", "At right angles to centerline", "Diagonally", "Only at stations"],
      ["Along the route", "Across the route at right angles", "At property lines", "At curve PCs only"],
      ["Along centerline", "Perpendicular to alignment", "At random locations", "Only in cuts"],
      ["Parallel to route", "Perpendicular to centerline", "At any angle", "Only at PIs"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "Cross-sections perpendicular to centerline show ground profile for earthwork calculations",
      "Cross-sections are taken at right angles to the centerline",
      "Cross-sections are measured across the route at right angles",
      "Cross-section data is collected perpendicular to alignment",
      "Cross-sections are perpendicular to the centerline"
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "PI in route surveying stands for:",
      "What does PI mean in horizontal alignment?",
      "The abbreviation PI represents:",
      "PI in curve layout is the:",
      "Point of Intersection is abbreviated:"
    ],
    optionSets: [
      ["Point of Intersection", "Principal Investigator", "Profile Index", "Project Interval"],
      ["Point of Intersection", "Profile Intersection", "Primary Index", "Principal Intersection"],
      ["Point of Intersection", "Profile Index", "Project Indicator", "Primary Intersection"],
      ["Point of Intersection", "Principal Index", "Profile Intersection", "Project Intersection"],
      ["PI", "PC", "PT", "PVI"]
    ],
    correctAnswers: ["0", "0", "0", "0", "0"],
    explanationVariants: [
      "PI = Point of Intersection where two tangents meet (before curve is inserted)",
      "PI means Point of Intersection in horizontal alignment",
      "PI represents Point of Intersection",
      "PI is the Point of Intersection in curve layout",
      "Point of Intersection is abbreviated PI"
    ],
    points: 10
  }
];

// Lesson 7: Hydrographic Surveying
export const d4_lesson07_archetypes: QuestionArchetype[] = [
  {
    type: 'multiple_choice',
    questionVariants: [
      "Hydrographic surveying measures:",
      "The primary purpose of hydrographic surveys is to measure:",
      "Hydrographic surveys are used to determine:",
      "What does hydrographic surveying measure?",
      "Hydrographic surveys collect data on:"
    ],
    optionSets: [
      ["Land elevations", "Water depths and underwater features", "Road grades", "Building heights"],
      ["Topographic contours", "Bathymetric data (water depths)", "Property boundaries", "Construction grades"],
      ["Slope percentages", "Underwater topography", "Land contours", "Building footprints"],
      ["Grade stakes", "Depths and bottom features", "Cut and fill", "Property lines"],
      ["Land surveys", "Water depths and seafloor features", "Road alignment", "Utility locations"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "Hydrographic surveying measures water depths and underwater features",
      "Hydrographic surveys measure bathymetric data (water depths)",
      "Hydrographic surveys determine underwater topography",
      "Hydrographic surveying measures depths and bottom features",
      "Hydrographic surveys collect data on water depths and seafloor features"
    ],
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "Echo sounders measure depth using:",
      "How do echo sounders determine water depth?",
      "The principle behind echo sounding is:",
      "Echo sounders work by:",
      "Depth measurement by echo sounder uses:"
    ],
    optionSets: [
      ["Light waves", "Sound waves", "Radio waves", "Magnetic fields"],
      ["Laser beams", "Acoustic pulses", "Radar signals", "GPS signals"],
      ["Light reflection", "Sound wave reflection from bottom", "Electromagnetic waves", "Gravity measurements"],
      ["Measuring light time", "Measuring sound travel time", "Measuring radio signals", "Measuring magnetic field"],
      ["Optical sensors", "Acoustic signals", "Infrared sensors", "Pressure sensors"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "Echo sounders measure depth using sound waves and their reflection",
      "Echo sounders use acoustic pulses to measure depth",
      "Echo sounding uses sound wave reflection from the bottom",
      "Echo sounders work by measuring sound travel time",
      "Echo sounders use acoustic signals for depth measurement"
    ],
    points: 10
  },
  {
    type: 'fill_in_blank',
    template: "If sound travels at {speed} m/s in water and the echo returns in {time} seconds, the depth is ___ meters.",
    paramRanges: {
      speed: [1500, 1500, 1500, 1500],
      time: [2, 4, 6, 8]
    },
    computeAnswer: (p) => String(p.speed * p.time / 2),
    computeExplanation: (p, ans) => `Depth = (speed × time) / 2 = (${p.speed} × ${p.time}) / 2 = ${ans} m (divide by 2 because sound travels down and back)`,
    points: 10
  },
  {
    type: 'multiple_choice',
    questionVariants: [
      "A sounding is:",
      "In hydrographic surveying, a sounding is:",
      "The term 'sounding' refers to:",
      "Soundings provide:",
      "What is a sounding in bathymetric surveys?"
    ],
    optionSets: [
      ["A land elevation", "A depth measurement", "A horizontal distance", "A bearing"],
      ["Surface measurement", "Water depth measurement", "Shore distance", "Wave height"],
      ["Horizontal position", "Depth at a specific location", "Vertical angle", "Azimuth"],
      ["Land contours", "Water depth values", "Property corners", "Bearings"],
      ["Topographic data", "A measured water depth", "Land survey point", "Boundary marker"]
    ],
    correctAnswers: ["1", "1", "1", "1", "1"],
    explanationVariants: [
      "A sounding is a water depth measurement at a specific location",
      "In hydrographic surveying, a sounding is a water depth measurement",
      "A sounding is a depth measurement at a specific location",
      "Soundings provide water depth values",
      "A sounding is a measured water depth"
    ],
    points: 10
  }
  "d0-lesson-02": d0_lesson02_archetypes,
  "d0-lesson-03": d0_lesson03_archetypes,
  "d0-lesson-04": d0_lesson04_archetypes,
  "d0-lesson-05": d0_lesson05_archetypes,
  "d0-lesson-06": d0_lesson06_archetypes,
  "d0-lesson-07": d0_lesson07_archetypes,
  "d0-lesson-08": d0_lesson08_archetypes,
  "d0-lesson-09": d0_lesson09_archetypes,
  "d0-lesson-10": d0_lesson10_archetypes,
  "d1-lesson-01": d1_lesson01_archetypes,
  "d1-lesson-02": d1_lesson02_archetypes,
  "d1-lesson-03": d1_lesson03_archetypes,
  "d1-lesson-04": d1_lesson04_archetypes,
  "d1-lesson-05": d1_lesson05_archetypes,
  "d1-lesson-06": d1_lesson06_archetypes,
  "d1-lesson-07": d1_lesson07_archetypes,
  "d2-lesson-01": d2_lesson01_archetypes,
  "d2-lesson-02": d2_lesson02_archetypes,
  "d2-lesson-03": d2_lesson03_archetypes,
  "d2-lesson-04": d2_lesson04_archetypes,
  "d2-lesson-05": d2_lesson05_archetypes,
  "d2-lesson-06": d2_lesson06_archetypes,
  "d2-lesson-07": d2_lesson07_archetypes,
  "d2-lesson-08": d2_lesson08_archetypes,
  "d3-lesson-01": d3_lesson01_archetypes,
  "d3-lesson-02": d3_lesson02_archetypes,
  "d3-lesson-03": d3_lesson03_archetypes,
  "d3-lesson-04": d3_lesson04_archetypes,
  "d3-lesson-05": d3_lesson05_archetypes,
  "d3-lesson-06": d3_lesson06_archetypes,
  "d3-lesson-07": d3_lesson07_archetypes,
  "d4-lesson-01": d4_lesson01_archetypes,
  "d4-lesson-02": d4_lesson02_archetypes,
  "d4-lesson-03": d4_lesson03_archetypes,
  "d4-lesson-04": d4_lesson04_archetypes,
  "d4-lesson-05": d4_lesson05_archetypes,
  "d4-lesson-06": d4_lesson06_archetypes,
  "d4-lesson-07": d4_lesson07_archetypes,
};

// Generate all variations for a lesson
export function generateLessonVariations(lessonId: string): QuestionVariation[] {
  const archetypes = allArchetypes[lessonId];
  if (!archetypes) return [];
  
  const allVariations: QuestionVariation[] = [];
  
  for (let i = 0; i < archetypes.length; i++) {
    const variations = generateVariationsFromArchetype(
      archetypes[i],
      lessonId,
      i + 1,
      i + 1  // variationGroup = question index
    );
    allVariations.push(...variations);
  }
  
  return allVariations;
}
