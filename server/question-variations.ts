// Question Variation Generator for FS Exam Study Guide
// Generates variations 2-5 for each of the 340 base questions (5 per lesson × 68 lessons)

export interface QuestionVariation {
  variationNumber: number;
  text: string;
  options?: string[];
  answer: string;
  explanation: string;
}

export interface BaseQuestion {
  type: string;
  text: string;
  options?: string[];
  answer: string;
  explanation: string;
  points: number;
  variations?: QuestionVariation[];
}

// Domain 0: Math Foundations - Lesson 1: Basic Arithmetic
export const lesson_d0_01_variations: BaseQuestion[] = [
  {
    type: "fill_in_blank",
    text: "Calculate: 12 + 8 × 2 = ___",
    answer: "28",
    explanation: "Following PEMDAS, multiply first: 8 × 2 = 16, then add: 12 + 16 = 28",
    points: 10,
    variations: [
      { variationNumber: 2, text: "Calculate: 15 + 6 × 3 = ___", answer: "33", explanation: "Following PEMDAS, multiply first: 6 × 3 = 18, then add: 15 + 18 = 33" },
      { variationNumber: 3, text: "Calculate: 20 + 5 × 4 = ___", answer: "40", explanation: "Following PEMDAS, multiply first: 5 × 4 = 20, then add: 20 + 20 = 40" },
      { variationNumber: 4, text: "Calculate: 10 + 7 × 3 = ___", answer: "31", explanation: "Following PEMDAS, multiply first: 7 × 3 = 21, then add: 10 + 21 = 31" },
      { variationNumber: 5, text: "Calculate: 18 + 4 × 5 = ___", answer: "38", explanation: "Following PEMDAS, multiply first: 4 × 5 = 20, then add: 18 + 20 = 38" }
    ]
  },
  {
    type: "multiple_choice",
    text: "What does PEMDAS stand for?",
    options: ["Please Excuse My Dear Aunt Sally", "Priority Evaluation Math Division Addition Subtraction", "Both represent order of operations", "None of the above"],
    answer: "2",
    explanation: "PEMDAS represents Parentheses, Exponents, Multiplication/Division, Addition/Subtraction",
    points: 10,
    variations: [
      { variationNumber: 2, text: "What is the correct order in PEMDAS?", options: ["Parentheses, Exponents, Multiplication, Division, Addition, Subtraction", "Percentages, Exponents, Multiplication, Division, Addition, Subtraction", "Parentheses, Equations, Multiplication, Division, Addition, Subtraction", "Parentheses, Exponents, Measurement, Division, Addition, Subtraction"], answer: "0", explanation: "PEMDAS: Parentheses, Exponents, Multiplication/Division (left to right), Addition/Subtraction (left to right)" },
      { variationNumber: 3, text: "In order of operations, multiplication and division are:", options: ["Done before addition", "Done after addition", "Done after exponents but before addition", "Both A and C"], answer: "3", explanation: "Multiplication and division come after exponents but before addition/subtraction" },
      { variationNumber: 4, text: "Which operation comes first in PEMDAS?", options: ["Addition", "Multiplication", "Parentheses", "Exponents"], answer: "2", explanation: "P in PEMDAS stands for Parentheses - always evaluated first" },
      { variationNumber: 5, text: "In PEMDAS, which pair is evaluated from left to right when both appear?", options: ["Parentheses and Exponents", "Multiplication and Division", "Only Addition and Subtraction", "Both B and C"], answer: "3", explanation: "Both M/D and A/S pairs are evaluated left to right when mixed" }
    ]
  },
  {
    type: "fill_in_blank",
    text: "Evaluate: (15 - 3) ÷ 4 = ___",
    answer: "3",
    explanation: "Parentheses first: (15-3) = 12, then divide: 12 ÷ 4 = 3",
    points: 10,
    variations: [
      { variationNumber: 2, text: "Evaluate: (24 - 6) ÷ 3 = ___", answer: "6", explanation: "Parentheses first: (24-6) = 18, then divide: 18 ÷ 3 = 6" },
      { variationNumber: 3, text: "Evaluate: (20 - 8) ÷ 4 = ___", answer: "3", explanation: "Parentheses first: (20-8) = 12, then divide: 12 ÷ 4 = 3" },
      { variationNumber: 4, text: "Evaluate: (30 - 12) ÷ 6 = ___", answer: "3", explanation: "Parentheses first: (30-12) = 18, then divide: 18 ÷ 6 = 3" },
      { variationNumber: 5, text: "Evaluate: (28 - 4) ÷ 8 = ___", answer: "3", explanation: "Parentheses first: (28-4) = 24, then divide: 24 ÷ 8 = 3" }
    ]
  },
  {
    type: "multiple_choice",
    text: "In the expression 2 + 3 × 4, which operation is performed first?",
    options: ["Addition", "Multiplication", "Both simultaneously", "Left to right"],
    answer: "1",
    explanation: "Multiplication has higher precedence than addition in PEMDAS",
    points: 10,
    variations: [
      { variationNumber: 2, text: "In the expression 5 + 6 × 2, which is performed first?", options: ["Addition", "Multiplication", "Neither", "Division"], answer: "1", explanation: "Multiplication has higher precedence than addition in PEMDAS" },
      { variationNumber: 3, text: "In 10 - 4 ÷ 2, which operation comes first?", options: ["Subtraction", "Division", "Both at same time", "Left to right"], answer: "1", explanation: "Division has higher precedence than subtraction in PEMDAS" },
      { variationNumber: 4, text: "In 8 × 2 + 6 ÷ 3, which operations are done first?", options: ["Addition only", "Multiplication and division", "Addition and subtraction", "None"], answer: "1", explanation: "Multiplication and division are done before addition (both from left to right)" },
      { variationNumber: 5, text: "In 15 - 3 + 7, which operation is performed first?", options: ["Subtraction (left to right)", "Addition", "Both simultaneously", "Neither"], answer: "0", explanation: "Addition and subtraction have equal precedence, so work left to right: 15 - 3 = 12 first" }
    ]
  },
  {
    type: "fill_in_blank",
    text: "Calculate: 100 - 25 × 2 = ___",
    answer: "50",
    explanation: "Multiply first: 25 × 2 = 50, then subtract: 100 - 50 = 50",
    points: 10,
    variations: [
      { variationNumber: 2, text: "Calculate: 80 - 15 × 3 = ___", answer: "35", explanation: "Multiply first: 15 × 3 = 45, then subtract: 80 - 45 = 35" },
      { variationNumber: 3, text: "Calculate: 90 - 20 × 4 = ___", answer: "10", explanation: "Multiply first: 20 × 4 = 80, then subtract: 90 - 80 = 10" },
      { variationNumber: 4, text: "Calculate: 75 - 12 × 5 = ___", answer: "15", explanation: "Multiply first: 12 × 5 = 60, then subtract: 75 - 60 = 15" },
      { variationNumber: 5, text: "Calculate: 120 - 30 × 3 = ___", answer: "30", explanation: "Multiply first: 30 × 3 = 90, then subtract: 120 - 90 = 30" }
    ]
  }
];

// Domain 0: Math Foundations - Lesson 2: Fractions and Decimals
export const lesson_d0_02_variations: BaseQuestion[] = [
  {
    type: "fill_in_blank",
    text: "Convert 3/4 to a decimal: ___",
    answer: "0.75",
    explanation: "3 ÷ 4 = 0.75",
    points: 10,
    variations: [
      { variationNumber: 2, text: "Convert 1/4 to a decimal: ___", answer: "0.25", explanation: "1 ÷ 4 = 0.25" },
      { variationNumber: 3, text: "Convert 2/5 to a decimal: ___", answer: "0.4", explanation: "2 ÷ 5 = 0.4" },
      { variationNumber: 4, text: "Convert 7/8 to a decimal: ___", answer: "0.875", explanation: "7 ÷ 8 = 0.875" },
      { variationNumber: 5, text: "Convert 3/8 to a decimal: ___", answer: "0.375", explanation: "3 ÷ 8 = 0.375" }
    ]
  },
  {
    type: "multiple_choice",
    text: "What is 1/2 + 1/4?",
    options: ["1/6", "2/6", "3/4", "1/8"],
    answer: "2",
    explanation: "1/2 = 2/4, so 2/4 + 1/4 = 3/4",
    points: 10,
    variations: [
      { variationNumber: 2, text: "What is 1/3 + 1/6?", options: ["2/6", "1/2", "2/9", "1/9"], answer: "1", explanation: "1/3 = 2/6, so 2/6 + 1/6 = 3/6 = 1/2" },
      { variationNumber: 3, text: "What is 2/3 + 1/6?", options: ["3/9", "5/6", "1/2", "4/6"], answer: "1", explanation: "2/3 = 4/6, so 4/6 + 1/6 = 5/6" },
      { variationNumber: 4, text: "What is 1/4 + 1/8?", options: ["2/12", "3/8", "1/6", "2/8"], answer: "1", explanation: "1/4 = 2/8, so 2/8 + 1/8 = 3/8" },
      { variationNumber: 5, text: "What is 3/4 + 1/8?", options: ["4/12", "7/8", "5/8", "4/8"], answer: "1", explanation: "3/4 = 6/8, so 6/8 + 1/8 = 7/8" }
    ]
  },
  {
    type: "fill_in_blank",
    text: "Convert 0.625 to a fraction in lowest terms (numerator/denominator, e.g., 5/8): ___",
    answer: "5/8",
    explanation: "0.625 = 625/1000 = 5/8 when reduced",
    points: 10,
    variations: [
      { variationNumber: 2, text: "Convert 0.125 to a fraction in lowest terms: ___", answer: "1/8", explanation: "0.125 = 125/1000 = 1/8 when reduced" },
      { variationNumber: 3, text: "Convert 0.375 to a fraction in lowest terms: ___", answer: "3/8", explanation: "0.375 = 375/1000 = 3/8 when reduced" },
      { variationNumber: 4, text: "Convert 0.875 to a fraction in lowest terms: ___", answer: "7/8", explanation: "0.875 = 875/1000 = 7/8 when reduced" },
      { variationNumber: 5, text: "Convert 0.25 to a fraction in lowest terms: ___", answer: "1/4", explanation: "0.25 = 25/100 = 1/4 when reduced" }
    ]
  },
  {
    type: "multiple_choice",
    text: "A surveyor measures 5.25 feet. What is this in inches?",
    options: ["60 inches", "63 inches", "65 inches", "68 inches"],
    answer: "1",
    explanation: "5.25 feet × 12 inches/foot = 63 inches",
    points: 10,
    variations: [
      { variationNumber: 2, text: "A surveyor measures 4.5 feet. What is this in inches?", options: ["48 inches", "54 inches", "56 inches", "52 inches"], answer: "1", explanation: "4.5 feet × 12 inches/foot = 54 inches" },
      { variationNumber: 3, text: "A surveyor measures 6.75 feet. What is this in inches?", options: ["78 inches", "81 inches", "84 inches", "72 inches"], answer: "1", explanation: "6.75 feet × 12 inches/foot = 81 inches" },
      { variationNumber: 4, text: "A surveyor measures 3.25 feet. What is this in inches?", options: ["36 inches", "38 inches", "39 inches", "42 inches"], answer: "2", explanation: "3.25 feet × 12 inches/foot = 39 inches" },
      { variationNumber: 5, text: "A surveyor measures 7.5 feet. What is this in inches?", options: ["84 inches", "90 inches", "88 inches", "92 inches"], answer: "1", explanation: "7.5 feet × 12 inches/foot = 90 inches" }
    ]
  },
  {
    type: "fill_in_blank",
    text: "Calculate: 2.5 × 4 = ___",
    answer: "10",
    explanation: "2.5 × 4 = 10.0 = 10",
    points: 10,
    variations: [
      { variationNumber: 2, text: "Calculate: 3.5 × 6 = ___", answer: "21", explanation: "3.5 × 6 = 21.0 = 21" },
      { variationNumber: 3, text: "Calculate: 4.5 × 8 = ___", answer: "36", explanation: "4.5 × 8 = 36.0 = 36" },
      { variationNumber: 4, text: "Calculate: 1.5 × 12 = ___", answer: "18", explanation: "1.5 × 12 = 18.0 = 18" },
      { variationNumber: 5, text: "Calculate: 2.25 × 4 = ___", answer: "9", explanation: "2.25 × 4 = 9.0 = 9" }
    ]
  }
];

// Domain 0: Math Foundations - Lesson 3: Percentages and Ratios
export const lesson_d0_03_variations: BaseQuestion[] = [
  {
    type: "fill_in_blank",
    text: "A 2% grade rises ___ feet per 100 feet horizontally.",
    answer: "2",
    explanation: "2% means 2 per 100, so 2 feet rise",
    points: 10,
    variations: [
      { variationNumber: 2, text: "A 5% grade rises ___ feet per 100 feet horizontally.", answer: "5", explanation: "5% means 5 per 100, so 5 feet rise" },
      { variationNumber: 3, text: "A 3% grade rises ___ feet per 100 feet horizontally.", answer: "3", explanation: "3% means 3 per 100, so 3 feet rise" },
      { variationNumber: 4, text: "A 8% grade rises ___ feet per 100 feet horizontally.", answer: "8", explanation: "8% means 8 per 100, so 8 feet rise" },
      { variationNumber: 5, text: "A 4% grade rises ___ feet per 100 feet horizontally.", answer: "4", explanation: "4% means 4 per 100, so 4 feet rise" }
    ]
  },
  {
    type: "multiple_choice",
    text: "A map scale of 1:1200 means 1 inch equals:",
    options: ["12 feet", "120 feet", "1200 feet", "100 feet"],
    answer: "3",
    explanation: "1:1200 means 1 unit on map = 1200 units in reality. 1 inch = 1200 inches = 100 feet",
    points: 10,
    variations: [
      { variationNumber: 2, text: "A map scale of 1:2400 means 1 inch equals:", options: ["20 feet", "200 feet", "240 feet", "2400 feet"], answer: "1", explanation: "1:2400 means 1 inch = 2400 inches = 200 feet" },
      { variationNumber: 3, text: "A map scale of 1:600 means 1 inch equals:", options: ["50 feet", "60 feet", "600 feet", "6 feet"], answer: "0", explanation: "1:600 means 1 inch = 600 inches = 50 feet" },
      { variationNumber: 4, text: "A map scale of 1:4800 means 1 inch equals:", options: ["48 feet", "400 feet", "480 feet", "4800 feet"], answer: "1", explanation: "1:4800 means 1 inch = 4800 inches = 400 feet" },
      { variationNumber: 5, text: "A map scale of 1:240 means 1 inch equals:", options: ["2 feet", "20 feet", "24 feet", "240 feet"], answer: "1", explanation: "1:240 means 1 inch = 240 inches = 20 feet" }
    ]
  },
  {
    type: "fill_in_blank",
    text: "Convert the ratio 1:500 to a percentage: ___% (round to 2 decimals)",
    answer: "0.20",
    explanation: "1/500 = 0.002 = 0.20%",
    points: 10,
    variations: [
      { variationNumber: 2, text: "Convert the ratio 1:250 to a percentage: ___% (round to 2 decimals)", answer: "0.40", explanation: "1/250 = 0.004 = 0.40%" },
      { variationNumber: 3, text: "Convert the ratio 1:1000 to a percentage: ___% (round to 2 decimals)", answer: "0.10", explanation: "1/1000 = 0.001 = 0.10%" },
      { variationNumber: 4, text: "Convert the ratio 1:200 to a percentage: ___% (round to 2 decimals)", answer: "0.50", explanation: "1/200 = 0.005 = 0.50%" },
      { variationNumber: 5, text: "Convert the ratio 1:100 to a percentage: ___% (round to 2 decimals)", answer: "1.00", explanation: "1/100 = 0.01 = 1.00%" }
    ]
  },
  {
    type: "multiple_choice",
    text: "What is 15% of 200?",
    options: ["15", "20", "30", "35"],
    answer: "2",
    explanation: "0.15 × 200 = 30",
    points: 10,
    variations: [
      { variationNumber: 2, text: "What is 25% of 160?", options: ["35", "40", "45", "50"], answer: "1", explanation: "0.25 × 160 = 40" },
      { variationNumber: 3, text: "What is 20% of 250?", options: ["40", "45", "50", "55"], answer: "2", explanation: "0.20 × 250 = 50" },
      { variationNumber: 4, text: "What is 12% of 500?", options: ["50", "55", "60", "65"], answer: "2", explanation: "0.12 × 500 = 60" },
      { variationNumber: 5, text: "What is 8% of 350?", options: ["24", "28", "32", "36"], answer: "1", explanation: "0.08 × 350 = 28" }
    ]
  },
  {
    type: "fill_in_blank",
    text: "If a slope rises 5 feet over 100 feet horizontal, the percent grade is ___%. ",
    answer: "5",
    explanation: "Grade% = (rise/run) × 100 = (5/100) × 100 = 5%",
    points: 10,
    variations: [
      { variationNumber: 2, text: "If a slope rises 8 feet over 200 feet horizontal, the percent grade is ___%. ", answer: "4", explanation: "Grade% = (rise/run) × 100 = (8/200) × 100 = 4%" },
      { variationNumber: 3, text: "If a slope rises 12 feet over 150 feet horizontal, the percent grade is ___%. ", answer: "8", explanation: "Grade% = (rise/run) × 100 = (12/150) × 100 = 8%" },
      { variationNumber: 4, text: "If a slope rises 6 feet over 120 feet horizontal, the percent grade is ___%. ", answer: "5", explanation: "Grade% = (rise/run) × 100 = (6/120) × 100 = 5%" },
      { variationNumber: 5, text: "If a slope rises 15 feet over 250 feet horizontal, the percent grade is ___%. ", answer: "6", explanation: "Grade% = (rise/run) × 100 = (15/250) × 100 = 6%" }
    ]
  }
];

// Domain 0: Math Foundations - Lesson 4: Exponents and Radicals
export const lesson_d0_04_variations: BaseQuestion[] = [
  {
    type: "fill_in_blank",
    text: "Calculate: 5² = ___",
    answer: "25",
    explanation: "5² = 5 × 5 = 25",
    points: 10,
    variations: [
      { variationNumber: 2, text: "Calculate: 7² = ___", answer: "49", explanation: "7² = 7 × 7 = 49" },
      { variationNumber: 3, text: "Calculate: 9² = ___", answer: "81", explanation: "9² = 9 × 9 = 81" },
      { variationNumber: 4, text: "Calculate: 6² = ___", answer: "36", explanation: "6² = 6 × 6 = 36" },
      { variationNumber: 5, text: "Calculate: 8² = ___", answer: "64", explanation: "8² = 8 × 8 = 64" }
    ]
  },
  {
    type: "fill_in_blank",
    text: "Find: √144 = ___",
    answer: "12",
    explanation: "12 × 12 = 144, so √144 = 12",
    points: 10,
    variations: [
      { variationNumber: 2, text: "Find: √81 = ___", answer: "9", explanation: "9 × 9 = 81, so √81 = 9" },
      { variationNumber: 3, text: "Find: √169 = ___", answer: "13", explanation: "13 × 13 = 169, so √169 = 13" },
      { variationNumber: 4, text: "Find: √196 = ___", answer: "14", explanation: "14 × 14 = 196, so √196 = 14" },
      { variationNumber: 5, text: "Find: √225 = ___", answer: "15", explanation: "15 × 15 = 225, so √225 = 15" }
    ]
  },
  {
    type: "multiple_choice",
    text: "What is 2³?",
    options: ["6", "8", "9", "12"],
    answer: "1",
    explanation: "2³ = 2 × 2 × 2 = 8",
    points: 10,
    variations: [
      { variationNumber: 2, text: "What is 3³?", options: ["9", "18", "27", "36"], answer: "2", explanation: "3³ = 3 × 3 × 3 = 27" },
      { variationNumber: 3, text: "What is 4³?", options: ["12", "32", "64", "48"], answer: "2", explanation: "4³ = 4 × 4 × 4 = 64" },
      { variationNumber: 4, text: "What is 5³?", options: ["15", "75", "125", "150"], answer: "2", explanation: "5³ = 5 × 5 × 5 = 125" },
      { variationNumber: 5, text: "What is 10³?", options: ["30", "100", "1000", "10000"], answer: "2", explanation: "10³ = 10 × 10 × 10 = 1000" }
    ]
  },
  {
    type: "multiple_choice",
    text: "The distance formula contains which operation?",
    options: ["Cube root", "Square root", "Fourth power", "Logarithm"],
    answer: "1",
    explanation: "d = √[(x₂-x₁)² + (y₂-y₁)²] uses square root",
    points: 10,
    variations: [
      { variationNumber: 2, text: "The Pythagorean theorem uses which operations?", options: ["Addition and cube root", "Squaring and square root", "Division and multiplication", "Logarithms"], answer: "1", explanation: "a² + b² = c² uses squares; solving for c uses square root" },
      { variationNumber: 3, text: "To find the hypotenuse from legs a and b, you use:", options: ["a + b", "a × b", "√(a² + b²)", "(a + b)²"], answer: "2", explanation: "Pythagorean theorem: c = √(a² + b²)" },
      { variationNumber: 4, text: "Area of a circle (πr²) uses which exponent operation?", options: ["Squaring", "Cubing", "Square root", "No exponent"], answer: "0", explanation: "r² means the radius is squared (raised to power 2)" },
      { variationNumber: 5, text: "Volume of a sphere (4/3πr³) uses which exponent?", options: ["Square (²)", "Cube (³)", "Fourth power", "Square root"], answer: "1", explanation: "r³ means the radius is cubed (raised to power 3)" }
    ]
  },
  {
    type: "fill_in_blank",
    text: "Simplify: √(9 + 16) = ___",
    answer: "5",
    explanation: "√(9+16) = √25 = 5",
    points: 10,
    variations: [
      { variationNumber: 2, text: "Simplify: √(16 + 9) = ___", answer: "5", explanation: "√(16+9) = √25 = 5" },
      { variationNumber: 3, text: "Simplify: √(36 + 64) = ___", answer: "10", explanation: "√(36+64) = √100 = 10" },
      { variationNumber: 4, text: "Simplify: √(25 + 144) = ___", answer: "13", explanation: "√(25+144) = √169 = 13" },
      { variationNumber: 5, text: "Simplify: √(64 + 36) = ___", answer: "10", explanation: "√(64+36) = √100 = 10" }
    ]
  }
];

// Domain 0: Math Foundations - Lesson 5: Right Triangle Basics
export const lesson_d0_05_variations: BaseQuestion[] = [
  {
    type: "multiple_choice",
    text: "In a right triangle, the longest side is called:",
    options: ["Adjacent", "Opposite", "Hypotenuse", "Base"],
    answer: "2",
    explanation: "The hypotenuse is always the longest side, opposite the right angle",
    points: 10,
    variations: [
      { variationNumber: 2, text: "The side opposite the right angle in a right triangle is:", options: ["The shortest side", "The hypotenuse", "The adjacent", "The base"], answer: "1", explanation: "The hypotenuse is opposite the right angle and is the longest side" },
      { variationNumber: 3, text: "In a right triangle, which side is always opposite the 90° angle?", options: ["Adjacent", "Opposite", "Hypotenuse", "Leg"], answer: "2", explanation: "The hypotenuse is always opposite the right (90°) angle" },
      { variationNumber: 4, text: "The two shorter sides of a right triangle are called:", options: ["Hypotenuses", "Legs", "Diagonals", "Altitudes"], answer: "1", explanation: "The two sides forming the right angle are called legs" },
      { variationNumber: 5, text: "Which statement about right triangles is true?", options: ["All sides are equal", "Hypotenuse is the shortest", "Hypotenuse is the longest", "No side is longest"], answer: "2", explanation: "The hypotenuse is always the longest side of a right triangle" }
    ]
  },
  {
    type: "fill_in_blank",
    text: "If a = 3 and b = 4, find c using Pythagorean theorem: c = ___",
    answer: "5",
    explanation: "c² = a² + b² = 9 + 16 = 25, so c = 5 (this is the 3-4-5 triangle)",
    points: 10,
    variations: [
      { variationNumber: 2, text: "If a = 6 and b = 8, find c using Pythagorean theorem: c = ___", answer: "10", explanation: "c² = a² + b² = 36 + 64 = 100, so c = 10 (this is the 6-8-10 triangle)" },
      { variationNumber: 3, text: "If a = 5 and b = 12, find c using Pythagorean theorem: c = ___", answer: "13", explanation: "c² = a² + b² = 25 + 144 = 169, so c = 13 (this is the 5-12-13 triangle)" },
      { variationNumber: 4, text: "If a = 8 and b = 15, find c using Pythagorean theorem: c = ___", answer: "17", explanation: "c² = a² + b² = 64 + 225 = 289, so c = 17 (this is the 8-15-17 triangle)" },
      { variationNumber: 5, text: "If a = 9 and b = 12, find c using Pythagorean theorem: c = ___", answer: "15", explanation: "c² = a² + b² = 81 + 144 = 225, so c = 15 (this is the 9-12-15 triangle)" }
    ]
  },
  {
    type: "multiple_choice",
    text: "The Pythagorean theorem only works for:",
    options: ["Any triangle", "Right triangles", "Equilateral triangles", "Isosceles triangles"],
    answer: "1",
    explanation: "Pythagorean theorem applies only to right triangles (90° angle)",
    points: 10,
    variations: [
      { variationNumber: 2, text: "a² + b² = c² is valid for:", options: ["All triangles", "Only right triangles", "Only acute triangles", "Only obtuse triangles"], answer: "1", explanation: "The Pythagorean theorem only applies to right triangles" },
      { variationNumber: 3, text: "Which triangle type satisfies a² + b² = c²?", options: ["Equilateral", "Scalene", "Right", "Obtuse"], answer: "2", explanation: "Only right triangles satisfy the Pythagorean relationship" },
      { variationNumber: 4, text: "The Pythagorean theorem requires the triangle to have:", options: ["Three equal sides", "One 90° angle", "Two equal sides", "No specific angle"], answer: "1", explanation: "The theorem requires exactly one 90° (right) angle" },
      { variationNumber: 5, text: "For which triangle is the equation a² + b² = c² always true?", options: ["Any 3-sided polygon", "Right triangle", "Obtuse triangle", "Acute triangle"], answer: "1", explanation: "Only right triangles satisfy the Pythagorean theorem exactly" }
    ]
  },
  {
    type: "fill_in_blank",
    text: "In a right triangle, if one leg is 8m and hypotenuse is 10m, the other leg is ___ meters.",
    answer: "6",
    explanation: "b² = c² - a² = 100 - 64 = 36, so b = 6m",
    points: 10,
    variations: [
      { variationNumber: 2, text: "In a right triangle, if one leg is 5m and hypotenuse is 13m, the other leg is ___ meters.", answer: "12", explanation: "b² = c² - a² = 169 - 25 = 144, so b = 12m" },
      { variationNumber: 3, text: "In a right triangle, if one leg is 9m and hypotenuse is 15m, the other leg is ___ meters.", answer: "12", explanation: "b² = c² - a² = 225 - 81 = 144, so b = 12m" },
      { variationNumber: 4, text: "In a right triangle, if one leg is 7m and hypotenuse is 25m, the other leg is ___ meters.", answer: "24", explanation: "b² = c² - a² = 625 - 49 = 576, so b = 24m" },
      { variationNumber: 5, text: "In a right triangle, if one leg is 12m and hypotenuse is 20m, the other leg is ___ meters.", answer: "16", explanation: "b² = c² - a² = 400 - 144 = 256, so b = 16m" }
    ]
  },
  {
    type: "multiple_choice",
    text: "Which of these is a Pythagorean triple?",
    options: ["2, 3, 4", "5, 12, 13", "7, 8, 9", "10, 11, 12"],
    answer: "1",
    explanation: "5² + 12² = 25 + 144 = 169 = 13²",
    points: 10,
    variations: [
      { variationNumber: 2, text: "Which of these is a Pythagorean triple?", options: ["4, 5, 6", "3, 4, 5", "6, 7, 8", "1, 2, 3"], answer: "1", explanation: "3² + 4² = 9 + 16 = 25 = 5²" },
      { variationNumber: 3, text: "Which of these is a Pythagorean triple?", options: ["6, 7, 8", "7, 24, 25", "9, 10, 11", "4, 6, 8"], answer: "1", explanation: "7² + 24² = 49 + 576 = 625 = 25²" },
      { variationNumber: 4, text: "Which of these is a Pythagorean triple?", options: ["8, 15, 17", "9, 12, 14", "10, 12, 15", "6, 9, 12"], answer: "0", explanation: "8² + 15² = 64 + 225 = 289 = 17²" },
      { variationNumber: 5, text: "Which of these is a Pythagorean triple?", options: ["5, 6, 7", "11, 60, 61", "12, 15, 18", "8, 10, 12"], answer: "1", explanation: "11² + 60² = 121 + 3600 = 3721 = 61²" }
    ]
  }
];

// Continue with more lessons...
// This pattern continues for all 68 lessons

// Export all variations by lesson ID
export const allLessonVariations: Record<string, BaseQuestion[]> = {
  "d0-lesson-01": lesson_d0_01_variations,
  "d0-lesson-02": lesson_d0_02_variations,
  "d0-lesson-03": lesson_d0_03_variations,
  "d0-lesson-04": lesson_d0_04_variations,
  "d0-lesson-05": lesson_d0_05_variations,
  // More lessons to be added...
};
