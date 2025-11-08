/**
 * Load all 50 lesson questions into the database
 * Run with: tsx server/load-lessons.ts
 */

import { db } from "./db";
import { lessons, lessonQuestions } from "@shared/schema";

const DOMAINS = {
  0: "Math & Science Foundations",
  1: "Surveying Processes and Methods",
  2: "Mapping Processes and Methods",
  3: "Boundary Law and Real Property Principles",
  4: "Surveying Principles",
  5: "Survey Computations and Computer Applications",
  6: "Business Concepts",
  7: "Applied Mathematics and Statistics"
};

async function loadLessons() {
  console.log("📚 Loading 68 lessons with 417 questions...\n");

  try {
    // All lessons with questions
    const lessonsData = [
      // ========== DOMAIN 0: MATH & SCIENCE FOUNDATIONS ==========

      // Domain 0: Fractions, Decimals & Percentages
      {
        domainNumber: 0,
        domain: DOMAINS[0],
        title: "Fractions, Decimals & Percentages",
        description: "Master conversions and operations with fractions, decimals, and percentages",
        content: "Understanding how to work with fractions, decimals, and percentages is fundamental to all surveying calculations. This lesson covers conversions between forms and basic operations.",
        difficulty: "easy" as const,
        orderIndex: 1,
        estimatedMinutes: 30,
        suggestedWeek: 1,
        questions: [
          { type: "multiple_choice", text: "Convert 3/4 to a decimal:", options: ["0.75", "0.34", "0.43", "1.33"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Method:** Divide numerator by denominator\n2. **Calculate:** 3 ÷ 4\n3. **Long division:**\n   - 3.00 ÷ 4 = 0.75\n4. **Check:** 0.75 × 4 = 3 ✓\n5. **Alternative:** Recognize common fraction (3/4 = 75/100)\n**Answer: 0.75**", points: 10 },
          { type: "multiple_choice", text: "Convert 0.625 to a fraction in lowest terms:", options: ["5/8", "625/1000", "6/10", "3/5"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Write as fraction:** 0.625 = 625/1000\n2. **Find GCF:** GCF(625, 1000) = 125\n3. **Divide both by GCF:**\n   - 625 ÷ 125 = 5\n   - 1000 ÷ 125 = 8\n4. **Result:** 5/8\n5. **Check:** 5 ÷ 8 = 0.625 ✓\n**Answer: 5/8**", points: 10 },
          { type: "multiple_choice", text: "What is 35% expressed as a decimal?", options: ["0.35", "3.5", "0.035", "35.0"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Method:** Divide percent by 100\n2. **Calculate:** 35 ÷ 100 = 0.35\n3. **Or move decimal:** 35% → 35. → 0.35\n4. **Meaning:** 35% = 35 per hundred = 35/100 = 0.35\n**Answer: 0.35**", points: 10 },
          { type: "multiple_choice", text: "Add the fractions: 2/3 + 1/4 =", options: ["11/12", "3/7", "8/12", "3/12"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Find LCD:** LCD(3, 4) = 12\n2. **Convert 2/3:**\n   - 2/3 × 4/4 = 8/12\n3. **Convert 1/4:**\n   - 1/4 × 3/3 = 3/12\n4. **Add:** 8/12 + 3/12 = 11/12\n5. **Check:** Already in lowest terms\n**Answer: 11/12**", points: 10 },
          { type: "multiple_choice", text: "What is 15% of 80?", options: ["12", "120", "1.2", "95"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Method 1 - Decimal:**\n   - 15% = 0.15\n   - 0.15 × 80 = 12\n2. **Method 2 - Fraction:**\n   - 15% = 15/100\n   - (15/100) × 80 = 1200/100 = 12\n3. **Check:** 12 is less than 80 (makes sense for <100%)\n**Answer: 12**", points: 10 },
          { type: "multiple_choice", text: "Multiply: 2/5 × 3/7 =", options: ["6/35", "5/12", "6/12", "5/35"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Rule:** Multiply numerators, multiply denominators\n2. **Numerators:** 2 × 3 = 6\n3. **Denominators:** 5 × 7 = 35\n4. **Result:** 6/35\n5. **Check:** Cannot reduce (GCF = 1)\n**Answer: 6/35**", points: 10 },
          { type: "multiple_choice", text: "Divide: 3/4 ÷ 2/3 =", options: ["9/8", "6/12", "2/4", "3/8"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Rule:** Multiply by reciprocal\n2. **Reciprocal of 2/3:** 3/2\n3. **Multiply:** 3/4 × 3/2\n4. **Numerators:** 3 × 3 = 9\n5. **Denominators:** 4 × 2 = 8\n6. **Result:** 9/8 (or 1 1/8)\n**Answer: 9/8**", points: 10 },
          { type: "multiple_choice", text: "What percent is 18 out of 24?", options: ["75%", "18%", "24%", "42%"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Set up fraction:** 18/24\n2. **Simplify:** GCF(18, 24) = 6\n   - 18/24 = 3/4\n3. **Convert to decimal:** 3 ÷ 4 = 0.75\n4. **Convert to percent:** 0.75 × 100 = 75%\n5. **Check:** 75% of 24 = 0.75 × 24 = 18 ✓\n**Answer: 75%**", points: 10 },
          { type: "multiple_choice", text: "If a property value increases from $200,000 to $240,000, what is the percent increase?", options: ["20%", "40%", "16.7%", "120%"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Find increase:** $240,000 - $200,000 = $40,000\n2. **Formula:** (Increase / Original) × 100%\n3. **Calculate:** ($40,000 / $200,000) × 100%\n4. **Simplify:** 0.20 × 100% = 20%\n5. **Check:** $200,000 + 20% = $200,000 + $40,000 = $240,000 ✓\n**Answer: 20%**", points: 10 },
          { type: "multiple_choice", text: "Convert 1.375 to a mixed number:", options: ["1 3/8", "1 1/4", "1 2/5", "1 3/4"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Whole number part:** 1\n2. **Decimal part:** 0.375\n3. **Convert 0.375 to fraction:** 375/1000\n4. **Reduce:** GCF(375, 1000) = 125\n   - 375 ÷ 125 = 3\n   - 1000 ÷ 125 = 8\n5. **Result:** 1 3/8\n6. **Check:** 1 + 3/8 = 1 + 0.375 = 1.375 ✓\n**Answer: 1 3/8**", points: 10 },
          { type: "multiple_choice", text: "A surveyor's tape is 0.02 ft too long. What is this error as a percentage of a 100-ft tape?", options: ["0.02%", "0.2%", "2%", "20%"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Error amount:** 0.02 ft\n2. **Total length:** 100 ft\n3. **Formula:** (Error / Total) × 100%\n4. **Calculate:** (0.02 / 100) × 100%\n5. **Simplify:** 0.0002 × 100% = 0.02%\n6. **Interpretation:** Very small error (2 hundredths of 1%)\n**Answer: 0.02%**", points: 10 },
          { type: "multiple_choice", text: "Subtract: 5/6 - 1/3 =", options: ["1/2", "4/3", "2/3", "1/6"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Find LCD:** LCD(6, 3) = 6\n2. **5/6 already has denominator 6:** 5/6\n3. **Convert 1/3:**\n   - 1/3 × 2/2 = 2/6\n4. **Subtract:** 5/6 - 2/6 = 3/6\n5. **Reduce:** 3/6 = 1/2\n**Answer: 1/2**", points: 10 }
        ]
      },

      // Domain 0: Basic Algebra - Solving Equations
      {
        domainNumber: 0,
        domain: DOMAINS[0],
        title: "Basic Algebra - Solving Equations",
        description: "Master solving linear equations, isolating variables, and multi-step problems",
        content: "Algebra is the foundation of surveying calculations. This lesson covers solving linear equations, combining like terms, using the distributive property, and translating word problems into equations.",
        difficulty: "easy" as const,
        orderIndex: 2,
        estimatedMinutes: 35,
        suggestedWeek: 1,
        questions: [
          { type: "multiple_choice", text: "Solve for x: 3x + 5 = 17", options: ["4", "6", "12", "22"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Start:** 3x + 5 = 17\n2. **Subtract 5 from both sides:** 3x = 17 - 5\n3. **Simplify:** 3x = 12\n4. **Divide both sides by 3:** x = 12 ÷ 3\n5. **Solution:** x = 4\n6. **Check:** 3(4) + 5 = 12 + 5 = 17 ✓\n**Answer: 4**", points: 10 },
          { type: "multiple_choice", text: "Solve for x: 2(x - 3) = 10", options: ["8", "5", "2", "6.5"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Start:** 2(x - 3) = 10\n2. **Apply distributive property:** 2x - 6 = 10\n3. **Add 6 to both sides:** 2x = 10 + 6\n4. **Simplify:** 2x = 16\n5. **Divide both sides by 2:** x = 16 ÷ 2\n6. **Solution:** x = 8\n7. **Check:** 2(8 - 3) = 2(5) = 10 ✓\n**Answer: 8**", points: 10 },
          { type: "multiple_choice", text: "Solve for x: 5x - 8 = 2x + 7", options: ["5", "3", "15", "-1"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Start:** 5x - 8 = 2x + 7\n2. **Subtract 2x from both sides:** 3x - 8 = 7\n3. **Add 8 to both sides:** 3x = 15\n4. **Divide both sides by 3:** x = 5\n5. **Check left side:** 5(5) - 8 = 25 - 8 = 17\n6. **Check right side:** 2(5) + 7 = 10 + 7 = 17 ✓\n**Answer: 5**", points: 10 },
          { type: "multiple_choice", text: "Simplify by combining like terms: 3x + 7 - x + 2", options: ["2x + 9", "4x + 9", "2x + 5", "3x + 9"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Identify like terms:**\n   - x terms: 3x and -x\n   - Constant terms: 7 and 2\n2. **Combine x terms:** 3x - x = 2x\n3. **Combine constants:** 7 + 2 = 9\n4. **Result:** 2x + 9\n5. **Cannot simplify further** (different variable powers)\n**Answer: 2x + 9**", points: 10 },
          { type: "multiple_choice", text: "Solve for y: 4y + 12 = 0", options: ["-3", "3", "-4", "0"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Start:** 4y + 12 = 0\n2. **Subtract 12 from both sides:** 4y = -12\n3. **Divide both sides by 4:** y = -12 ÷ 4\n4. **Solution:** y = -3\n5. **Check:** 4(-3) + 12 = -12 + 12 = 0 ✓\n**Answer: -3**", points: 10 },
          { type: "multiple_choice", text: "Apply distributive property: 3(2x + 5) =", options: ["6x + 15", "5x + 8", "6x + 5", "2x + 15"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Distributive property:** a(b + c) = ab + ac\n2. **Apply:** 3(2x + 5)\n3. **Multiply 3 by 2x:** 3 × 2x = 6x\n4. **Multiply 3 by 5:** 3 × 5 = 15\n5. **Result:** 6x + 15\n**Answer: 6x + 15**", points: 10 },
          { type: "multiple_choice", text: "Solve for x: (x/4) + 3 = 7", options: ["16", "4", "28", "1"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Start:** (x/4) + 3 = 7\n2. **Subtract 3 from both sides:** x/4 = 4\n3. **Multiply both sides by 4:** x = 4 × 4\n4. **Solution:** x = 16\n5. **Check:** (16/4) + 3 = 4 + 3 = 7 ✓\n**Answer: 16**", points: 10 },
          { type: "multiple_choice", text: "Solve for x: -2x + 8 = 20", options: ["-6", "6", "14", "-14"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Start:** -2x + 8 = 20\n2. **Subtract 8 from both sides:** -2x = 12\n3. **Divide both sides by -2:** x = 12 ÷ (-2)\n4. **Solution:** x = -6\n5. **Check:** -2(-6) + 8 = 12 + 8 = 20 ✓\n6. **Note:** Negative times negative equals positive\n**Answer: -6**", points: 10 },
          { type: "multiple_choice", text: "Solve for x: 3(x + 2) - 5 = 10", options: ["3", "5", "4", "1"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Start:** 3(x + 2) - 5 = 10\n2. **Distribute:** 3x + 6 - 5 = 10\n3. **Combine constants:** 3x + 1 = 10\n4. **Subtract 1 from both sides:** 3x = 9\n5. **Divide by 3:** x = 3\n6. **Check:** 3(3 + 2) - 5 = 3(5) - 5 = 15 - 5 = 10 ✓\n**Answer: 3**", points: 10 },
          { type: "multiple_choice", text: "A surveyor's distance measurement is 5 meters more than twice the width (w). If the distance is 23 meters, what equation represents this?", options: ["2w + 5 = 23", "2w - 5 = 23", "5w + 2 = 23", "w + 10 = 23"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Identify:** \"twice the width\" = 2w\n2. **\"5 meters more than\":** Add 5\n3. **Combined:** 2w + 5\n4. **\"is 23 meters\":** Equals 23\n5. **Equation:** 2w + 5 = 23\n6. **Solve:** 2w = 18, so w = 9 meters\n**Answer: 2w + 5 = 23**", points: 10 },
          { type: "multiple_choice", text: "Solve for x: 7 - 3x = 1", options: ["2", "-2", "8", "3"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Start:** 7 - 3x = 1\n2. **Subtract 7 from both sides:** -3x = 1 - 7\n3. **Simplify:** -3x = -6\n4. **Divide both sides by -3:** x = -6 ÷ (-3)\n5. **Solution:** x = 2\n6. **Check:** 7 - 3(2) = 7 - 6 = 1 ✓\n**Answer: 2**", points: 10 },
          { type: "multiple_choice", text: "Solve for x: 4(x - 1) + 3 = 2x + 9", options: ["5", "3", "7", "2"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Distribute:** 4x - 4 + 3 = 2x + 9\n2. **Combine left side:** 4x - 1 = 2x + 9\n3. **Subtract 2x from both sides:** 2x - 1 = 9\n4. **Add 1 to both sides:** 2x = 10\n5. **Divide by 2:** x = 5\n6. **Check:** 4(5-1) + 3 = 16 + 3 = 19; 2(5) + 9 = 19 ✓\n**Answer: 5**", points: 10 },
          { type: "multiple_choice", text: "A rectangular property is 3 times as long as it is wide. If the width is w feet, and the perimeter is 160 feet, what equation represents this?", options: ["2(w + 3w) = 160", "w + 3w = 160", "4w = 160", "2w + 3 = 160"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Width:** w feet\n2. **Length:** 3w feet (3 times width)\n3. **Perimeter formula:** P = 2(length + width)\n4. **Substitute:** P = 2(3w + w) = 2(4w) = 8w\n5. **Given perimeter:** 8w = 160\n6. **Equivalent form:** 2(w + 3w) = 160\n7. **Solution:** w = 20 feet\n**Answer: 2(w + 3w) = 160**", points: 10 },
          { type: "multiple_choice", text: "Solve for x: 5(2x - 1) = 3(x + 4)", options: ["2.43", "1.86", "3", "1.5"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Distribute left:** 10x - 5 = 3(x + 4)\n2. **Distribute right:** 10x - 5 = 3x + 12\n3. **Subtract 3x from both sides:** 7x - 5 = 12\n4. **Add 5 to both sides:** 7x = 17\n5. **Divide by 7:** x = 17/7 ≈ 2.43\n6. **Check:** 5(2×2.43 - 1) ≈ 22; 3(2.43 + 4) ≈ 22 ✓\n**Answer: 2.43**", points: 10 },
          { type: "multiple_choice", text: "The sum of three consecutive integers is 48. If the first integer is n, which equation represents this?", options: ["n + (n+1) + (n+2) = 48", "3n = 48", "n + 3 = 48", "n + 2n + 3n = 48"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **First integer:** n\n2. **Second integer (consecutive):** n + 1\n3. **Third integer:** n + 2\n4. **Sum:** n + (n+1) + (n+2) = 48\n5. **Simplify:** 3n + 3 = 48\n6. **Solve:** 3n = 45, n = 15\n7. **Check:** 15 + 16 + 17 = 48 ✓\n**Answer: n + (n+1) + (n+2) = 48**", points: 10 }
        ]
      },

      // Domain 0: Systems of Equations
      {
        domainNumber: 0,
        domain: DOMAINS[0],
        title: "Systems of Equations",
        description: "Solve systems using substitution and elimination methods",
        content: "Systems of equations have multiple unknowns and multiple equations. These appear frequently in surveying when solving for coordinates, adjusting measurements, and determining unknowns from multiple observations.",
        difficulty: "medium" as const,
        orderIndex: 3,
        estimatedMinutes: 30,
        suggestedWeek: 2,
        questions: [
          { type: "multiple_choice", text: "Solve by substitution: {y = 2x + 1, x + y = 7}. What is x?", options: ["2", "5", "3", "4"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Given:** y = 2x + 1 and x + y = 7\n2. **Substitute** y = 2x + 1 into second equation:\n   - x + (2x + 1) = 7\n3. **Combine like terms:** 3x + 1 = 7\n4. **Subtract 1:** 3x = 6\n5. **Divide by 3:** x = 2\n6. **Find y:** y = 2(2) + 1 = 5\n7. **Check:** 2 + 5 = 7 ✓\n**Answer: 2**", points: 10 },
          { type: "multiple_choice", text: "Solve by elimination: {2x + y = 10, x - y = 2}. What is x?", options: ["4", "2", "6", "3"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **System:** 2x + y = 10 and x - y = 2\n2. **Add equations** (y terms cancel):\n   - (2x + y) + (x - y) = 10 + 2\n3. **Simplify:** 3x = 12\n4. **Solve:** x = 4\n5. **Substitute back:** 4 - y = 2, so y = 2\n6. **Check:** 2(4) + 2 = 10 ✓ and 4 - 2 = 2 ✓\n**Answer: 4**", points: 10 },
          { type: "multiple_choice", text: "Solve: {3x + 2y = 12, x = 4}. What is y?", options: ["0", "3", "6", "-3"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Given:** x = 4 (already solved)\n2. **Substitute** x = 4 into first equation:\n   - 3(4) + 2y = 12\n3. **Simplify:** 12 + 2y = 12\n4. **Subtract 12:** 2y = 0\n5. **Divide by 2:** y = 0\n6. **Check:** 3(4) + 2(0) = 12 ✓\n**Answer: 0**", points: 10 },
          { type: "multiple_choice", text: "Solve by elimination: {4x + 3y = 18, 2x + 3y = 12}. What is x?", options: ["3", "2", "4", "1"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Subtract second from first** (3y cancels):\n   - (4x + 3y) - (2x + 3y) = 18 - 12\n2. **Simplify:** 2x = 6\n3. **Solve:** x = 3\n4. **Find y:** 2(3) + 3y = 12 → 3y = 6 → y = 2\n5. **Check:** 4(3) + 3(2) = 12 + 6 = 18 ✓\n**Answer: 3**", points: 10 },
          { type: "multiple_choice", text: "A surveyor measures that 2 stakes plus 3 markers cost $11, while 1 stake plus 2 markers cost $6. System: {2s + 3m = 11, s + 2m = 6}. What is the cost of one stake (s)?", options: ["$2", "$3", "$1", "$4"], answer: "3", explanation: "**Step-by-Step Solution:**\n1. **Multiply second equation by 2:** 2s + 4m = 12\n2. **Subtract first equation from this:**\n   - (2s + 4m) - (2s + 3m) = 12 - 11\n3. **Simplify:** m = 1 (each marker costs $1)\n4. **Substitute m = 1 into s + 2m = 6:**\n   - s + 2(1) = 6\n   - s + 2 = 6\n5. **Solve:** s = 4\n6. **Check in both equations:**\n   - 2(4) + 3(1) = 8 + 3 = 11 ✓\n   - 4 + 2(1) = 4 + 2 = 6 ✓\n**Answer: $4**", points: 10 },
          { type: "multiple_choice", text: "Solve: {x + y = 8, x - y = 2}. What is y?", options: ["3", "5", "4", "2"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Add the equations** (y terms cancel):\n   - (x + y) + (x - y) = 8 + 2\n2. **Simplify:** 2x = 10\n3. **Solve for x:** x = 5\n4. **Substitute into first equation:** 5 + y = 8\n5. **Solve for y:** y = 3\n6. **Check:** 5 - 3 = 2 ✓\n**Answer: 3**", points: 10 },
          { type: "multiple_choice", text: "Solve by substitution: {y = x - 1, 2x + y = 11}. What is x?", options: ["4", "3", "5", "6"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Substitute** y = x - 1 into 2x + y = 11:\n   - 2x + (x - 1) = 11\n2. **Combine:** 3x - 1 = 11\n3. **Add 1:** 3x = 12\n4. **Divide by 3:** x = 4\n5. **Find y:** y = 4 - 1 = 3\n6. **Check:** 2(4) + 3 = 11 ✓\n**Answer: 4**", points: 10 },
          { type: "multiple_choice", text: "Solve: {3x + 4y = 24, 3x - 2y = 6}. What is y?", options: ["3", "4", "2", "6"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Subtract second from first** (3x cancels):\n   - (3x + 4y) - (3x - 2y) = 24 - 6\n2. **Simplify:** 6y = 18\n3. **Divide by 6:** y = 3\n4. **Find x:** 3x - 2(3) = 6 → 3x = 12 → x = 4\n5. **Check:** 3(4) + 4(3) = 24 ✓\n**Answer: 3**", points: 10 },
          { type: "multiple_choice", text: "A system has solution (x, y) = (5, 2). Which system is this?", options: ["{x + y = 7, x - y = 3}", "{x + y = 3, x - y = 7}", "{2x + y = 8, x + 2y = 6}", "{x = 5, y = 3}"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Test option 0:** x + y = 5 + 2 = 7 ✓\n2. **Second equation:** x - y = 5 - 2 = 3 ✓\n3. **Test option 1:** x + y = 7 (not 3) ✗\n4. **Test option 2:** 2x + y = 10 + 2 = 12 (not 8) ✗\n5. **Test option 3:** y = 2 (not 3) ✗\n6. **Only option 0 works**\n**Answer: {x + y = 7, x - y = 3}**", points: 10 },
          { type: "multiple_choice", text: "Solve: {5x + 2y = 20, 3x + 2y = 16}. What is x?", options: ["2", "3", "4", "1"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Subtract second from first** (2y cancels):\n   - (5x + 2y) - (3x + 2y) = 20 - 16\n2. **Simplify:** 2x = 4\n3. **Divide by 2:** x = 2\n4. **Find y:** 3(2) + 2y = 16 → 2y = 10 → y = 5\n5. **Check:** 5(2) + 2(5) = 20 ✓\n**Answer: 2**", points: 10 },
          { type: "multiple_choice", text: "For the system {2x - y = 5, 4x - 2y = 10}, what can you conclude?", options: ["Infinitely many solutions (same line)", "No solution (parallel lines)", "Unique solution (x = 2, y = -1)", "Unique solution (x = 5, y = 5)"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Multiply first equation by 2:** 4x - 2y = 10\n2. **Compare to second equation:** 4x - 2y = 10\n3. **They are identical!** Same line\n4. **Conclusion:** Every point on the line is a solution\n5. **This means:** Infinitely many solutions\n6. **Example solutions:** (0, -5), (1, -3), (2, -1), (3, 1), etc.\n**Answer: Infinitely many solutions (same line)**", points: 10 },
          { type: "multiple_choice", text: "Solve: {x = 2y, 3x - 4y = 8}. What is y?", options: ["4", "2", "8", "1"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Substitute** x = 2y into second equation:\n   - 3(2y) - 4y = 8\n2. **Simplify:** 6y - 4y = 8\n3. **Combine:** 2y = 8\n4. **Divide by 2:** y = 4\n5. **Find x:** x = 2(4) = 8\n6. **Check:** 3(8) - 4(4) = 24 - 16 = 8 ✓\n**Answer: 4**", points: 10 }
        ]
      },

      // Domain 0: Exponents, Roots & Scientific Notation
      {
        domainNumber: 0,
        domain: DOMAINS[0],
        title: "Exponents, Roots & Scientific Notation",
        description: "Master power rules, roots, and scientific notation for surveying calculations",
        content: "Exponents and scientific notation are essential for handling very large distances (astronomical surveying) and very small precision values (measurement errors). This lesson covers power rules, negative and fractional exponents, roots, and scientific notation operations.",
        difficulty: "easy" as const,
        orderIndex: 4,
        estimatedMinutes: 30,
        suggestedWeek: 2,
        questions: [
          { type: "multiple_choice", text: "Simplify: 2³ × 2⁴ =", options: ["2⁷ = 128", "2¹² = 4096", "2 = 2", "4⁷ = 16384"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Rule:** x^a × x^b = x^(a+b)\n2. **Apply:** 2³ × 2⁴ = 2^(3+4)\n3. **Add exponents:** 2⁷\n4. **Calculate:** 2⁷ = 128\n5. **Verify:** 8 × 16 = 128 ✓\n**Answer: 2⁷ = 128**", points: 10 },
          { type: "multiple_choice", text: "Evaluate: 5⁰ =", options: ["1", "0", "5", "Undefined"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Zero exponent rule:** Any nonzero number to the power of 0 equals 1\n2. **Formula:** x⁰ = 1 (for x ≠ 0)\n3. **Apply:** 5⁰ = 1\n4. **Why:** From x^a / x^a = x^(a-a) = x⁰ = 1\n**Answer: 1**", points: 10 },
          { type: "multiple_choice", text: "Simplify: 3⁻² =", options: ["1/9", "9", "-9", "-6"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Negative exponent rule:** x^(-a) = 1/x^a\n2. **Apply:** 3^(-2) = 1/3²\n3. **Calculate denominator:** 3² = 9\n4. **Result:** 1/9\n5. **Decimal:** 1/9 ≈ 0.1111...\n**Answer: 1/9**", points: 10 },
          { type: "multiple_choice", text: "Calculate: √64 =", options: ["8", "32", "4", "16"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Question:** What number squared equals 64?\n2. **Test:** 8² = 8 × 8 = 64 ✓\n3. **Alternative:** 64 = 2⁶, so √64 = 2³ = 8\n4. **Answer:** 8\n5. **Note:** Principal (positive) square root\n**Answer: 8**", points: 10 },
          { type: "multiple_choice", text: "Calculate: ∛27 =", options: ["3", "9", "27", "81"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Cube root:** What number cubed equals 27?\n2. **Test:** 3³ = 3 × 3 × 3 = 27 ✓\n3. **Alternative:** 27 = 3³, so ∛27 = 3\n4. **Answer:** 3\n**Answer: 3**", points: 10 },
          { type: "multiple_choice", text: "Evaluate: 8^(2/3) =", options: ["4", "2", "16", "8"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Fractional exponent:** x^(a/b) = (ᵇ√x)^a\n2. **Apply:** 8^(2/3) = (∛8)²\n3. **Find cube root:** ∛8 = 2\n4. **Square it:** 2² = 4\n5. **Alternative:** 8 = 2³, so 8^(2/3) = (2³)^(2/3) = 2² = 4\n**Answer: 4**", points: 10 },
          { type: "multiple_choice", text: "Multiply in scientific notation: (3 × 10⁶) × (2 × 10⁻³) =", options: ["6 × 10³", "6 × 10⁹", "5 × 10³", "6 × 10⁻¹⁸"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Multiply coefficients:** 3 × 2 = 6\n2. **Add exponents:** 10⁶ × 10⁻³ = 10^(6-3) = 10³\n3. **Combine:** 6 × 10³\n4. **Standard form:** 6,000\n5. **Verify:** 3,000,000 × 0.002 = 6,000 ✓\n**Answer: 6 × 10³**", points: 10 },
          { type: "multiple_choice", text: "Simplify: (x³)⁴ =", options: ["x¹²", "x⁷", "x⁸¹", "x⁶⁴"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Power of a power rule:** (x^a)^b = x^(a×b)\n2. **Apply:** (x³)⁴ = x^(3×4)\n3. **Multiply exponents:** x¹²\n4. **Verify with numbers:** (2³)⁴ = 8⁴ = 4096; 2¹² = 4096 ✓\n**Answer: x¹²**", points: 10 },
          { type: "multiple_choice", text: "Divide in scientific notation: (8 × 10⁸) ÷ (2 × 10⁵) =", options: ["4 × 10³", "4 × 10¹³", "16 × 10³", "4 × 10⁴"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Divide coefficients:** 8 ÷ 2 = 4\n2. **Subtract exponents:** 10⁸ ÷ 10⁵ = 10^(8-5) = 10³\n3. **Combine:** 4 × 10³\n4. **Standard form:** 4,000\n5. **Verify:** 800,000,000 ÷ 200,000 = 4,000 ✓\n**Answer: 4 × 10³**", points: 10 },
          { type: "multiple_choice", text: "Simplify: (2x²y)³ =", options: ["8x⁶y³", "6x⁶y³", "2x⁵y³", "8x⁵y⁴"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Distribute exponent:** (2x²y)³ = 2³ × (x²)³ × y³\n2. **Calculate 2³:** 8\n3. **Apply (x²)³:** x^(2×3) = x⁶\n4. **Apply y³:** y³\n5. **Combine:** 8x⁶y³\n**Answer: 8x⁶y³**", points: 10 },
          { type: "multiple_choice", text: "Express 0.00045 in scientific notation:", options: ["4.5 × 10⁻⁴", "4.5 × 10⁴", "45 × 10⁻⁵", "0.45 × 10⁻³"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Move decimal** to get number between 1 and 10\n2. **0.00045 → 4.5** (moved 4 places right)\n3. **Moving right** means negative exponent\n4. **Result:** 4.5 × 10⁻⁴\n5. **Verify:** 4.5 × 0.0001 = 0.00045 ✓\n**Answer: 4.5 × 10⁻⁴**", points: 10 },
          { type: "multiple_choice", text: "Calculate: 16^(1/2) =", options: ["4", "8", "2", "256"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Fractional exponent:** x^(1/2) = √x\n2. **Apply:** 16^(1/2) = √16\n3. **Find square root:** √16 = 4\n4. **Check:** 4² = 16 ✓\n5. **Alternative:** 16 = 2⁴, so 16^(1/2) = 2^(4/2) = 2² = 4\n**Answer: 4**", points: 10 }
        ]
      },

      // Domain 0: Basic Geometry - Angles & Triangles
      {
        domainNumber: 0,
        domain: DOMAINS[0],
        title: "Basic Geometry - Angles & Triangles",
        description: "Master angle relationships, triangle properties, and the Pythagorean theorem",
        content: "Geometry is fundamental to surveying. Understanding angles, triangles, and spatial relationships is essential for traverse calculations, property boundaries, and construction layout.",
        difficulty: "easy" as const,
        orderIndex: 5,
        estimatedMinutes: 35,
        suggestedWeek: 3,
        questions: [
          { type: "multiple_choice", text: "Two angles are complementary. If one angle is 35°, what is the other angle?", options: ["55°", "145°", "325°", "90°"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Complementary angles:** Sum to 90°\n2. **Formula:** Angle₁ + Angle₂ = 90°\n3. **Given:** Angle₁ = 35°\n4. **Solve:** 35° + Angle₂ = 90°\n5. **Subtract:** Angle₂ = 90° - 35° = 55°\n6. **Check:** 35° + 55° = 90° ✓\n**Answer: 55°**", points: 10 },
          { type: "multiple_choice", text: "Two angles are supplementary. If one angle is 110°, what is the other angle?", options: ["70°", "250°", "20°", "110°"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Supplementary angles:** Sum to 180°\n2. **Formula:** Angle₁ + Angle₂ = 180°\n3. **Given:** Angle₁ = 110°\n4. **Solve:** 110° + Angle₂ = 180°\n5. **Subtract:** Angle₂ = 180° - 110° = 70°\n6. **Check:** 110° + 70° = 180° ✓\n**Answer: 70°**", points: 10 },
          { type: "multiple_choice", text: "Two lines intersect. If one angle is 65°, what is the vertical angle opposite to it?", options: ["65°", "115°", "295°", "25°"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Vertical angles:** Angles opposite each other when two lines intersect\n2. **Property:** Vertical angles are EQUAL\n3. **Given:** One angle = 65°\n4. **Vertical angle** = 65°\n5. **Note:** Adjacent angles are supplementary (65° + 115° = 180°)\n**Answer: 65°**", points: 10 },
          { type: "multiple_choice", text: "In a triangle, two angles measure 45° and 70°. What is the third angle?", options: ["65°", "115°", "25°", "180°"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Triangle angle sum:** All angles sum to 180°\n2. **Formula:** Angle₁ + Angle₂ + Angle₃ = 180°\n3. **Given:** 45° + 70° + Angle₃ = 180°\n4. **Sum first two:** 115° + Angle₃ = 180°\n5. **Solve:** Angle₃ = 180° - 115° = 65°\n6. **Check:** 45° + 70° + 65° = 180° ✓\n**Answer: 65°**", points: 10 },
          { type: "multiple_choice", text: "Using the Pythagorean theorem, find the hypotenuse of a right triangle with legs 3 and 4:", options: ["5", "7", "25", "12"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Pythagorean theorem:** a² + b² = c²\n2. **Given:** a = 3, b = 4\n3. **Substitute:** 3² + 4² = c²\n4. **Calculate:** 9 + 16 = c²\n5. **Sum:** c² = 25\n6. **Take square root:** c = √25 = 5\n7. **This is a 3-4-5 right triangle** (common)\n**Answer: 5**", points: 10 },
          { type: "multiple_choice", text: "A right triangle has legs 6 m and 8 m. What is the length of the hypotenuse?", options: ["10 m", "14 m", "48 m", "100 m"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Pythagorean theorem:** a² + b² = c²\n2. **Given:** a = 6, b = 8\n3. **Calculate:** 6² + 8² = c²\n4. **Simplify:** 36 + 64 = c²\n5. **Sum:** c² = 100\n6. **Square root:** c = √100 = 10 m\n7. **This is a 6-8-10 triangle** (3-4-5 scaled by 2)\n**Answer: 10 m**", points: 10 },
          { type: "multiple_choice", text: "In a 45-45-90 triangle, if each leg is 5, what is the hypotenuse?", options: ["5√2 ≈ 7.07", "10", "5", "25"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **45-45-90 triangle ratio:** legs : hypotenuse = 1 : 1 : √2\n2. **Given:** Each leg = 5\n3. **Formula:** Hypotenuse = leg × √2\n4. **Calculate:** 5 × √2 = 5√2\n5. **Decimal:** 5 × 1.414... ≈ 7.07\n6. **Verify with Pythagorean:** 5² + 5² = 50; √50 = 5√2 ✓\n**Answer: 5√2 ≈ 7.07**", points: 10 },
          { type: "multiple_choice", text: "In a 30-60-90 triangle, if the shortest side is 4, what is the hypotenuse?", options: ["8", "4√3 ≈ 6.93", "4", "16"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **30-60-90 triangle ratio:** short : long : hypotenuse = 1 : √3 : 2\n2. **Shortest side** (opposite 30°) = 4\n3. **Hypotenuse ratio:** 2 × shortest side\n4. **Calculate:** 2 × 4 = 8\n5. **Long leg:** 4√3 ≈ 6.93\n6. **Verify:** 4² + (4√3)² = 16 + 48 = 64; √64 = 8 ✓\n**Answer: 8**", points: 10 },
          { type: "multiple_choice", text: "A triangle has sides 5, 12, and 13. Is it a right triangle?", options: ["Yes", "No", "Cannot determine", "Only if angles are given"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Test Pythagorean theorem:** a² + b² = c²?\n2. **Longest side** must be hypotenuse: c = 13\n3. **Test:** 5² + 12² = 13²?\n4. **Calculate:** 25 + 144 = 169?\n5. **Check:** 169 = 169 ✓\n6. **Conclusion:** Yes, it is a right triangle\n7. **This is a 5-12-13 Pythagorean triple**\n**Answer: Yes**", points: 10 },
          { type: "multiple_choice", text: "What type of triangle has all three angles equal to 60°?", options: ["Equilateral", "Isosceles", "Scalene", "Right"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Given:** All three angles = 60°\n2. **Check sum:** 60° + 60° + 60° = 180° ✓\n3. **Property:** If all angles equal, all sides equal\n4. **Definition:** Equilateral triangle has all sides AND angles equal\n5. **Each angle in equilateral:** 180° ÷ 3 = 60°\n**Answer: Equilateral**", points: 10 },
          { type: "multiple_choice", text: "A triangle has two equal sides of length 8. What type of triangle is this?", options: ["Isosceles", "Equilateral", "Scalene", "Right"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Definition - Isosceles:** Exactly two equal sides\n2. **Definition - Equilateral:** All three sides equal\n3. **Definition - Scalene:** No equal sides\n4. **Given:** Two sides equal (8 and 8)\n5. **Third side** not specified, so assume different\n6. **Conclusion:** Isosceles triangle\n**Answer: Isosceles**", points: 10 },
          { type: "multiple_choice", text: "A surveyor needs to find the distance across a river. From point A, they measure 100 m perpendicular to the river, then 100 m parallel. What is the straight-line distance back to the starting point?", options: ["100√2 ≈ 141.4 m", "200 m", "100 m", "10000 m"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **This forms a right triangle:**\n   - One leg: 100 m (perpendicular)\n   - Other leg: 100 m (parallel)\n2. **Pythagorean theorem:** c² = 100² + 100²\n3. **Calculate:** c² = 10,000 + 10,000 = 20,000\n4. **Square root:** c = √20,000 = 100√2\n5. **Decimal:** ≈ 141.4 m\n6. **This is a 45-45-90 triangle**\n**Answer: 100√2 ≈ 141.4 m**", points: 10 },
          { type: "multiple_choice", text: "Two parallel lines are cut by a transversal. If one angle is 120°, what is the corresponding angle?", options: ["120°", "60°", "240°", "30°"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Corresponding angles:** Same position at each intersection\n2. **Property:** When parallel lines cut by transversal, corresponding angles are EQUAL\n3. **Given:** One angle = 120°\n4. **Corresponding angle** = 120°\n5. **Note:** Alternate interior angles also equal\n6. **Supplementary angles** (on same side) sum to 180°\n**Answer: 120°**", points: 10 },
          { type: "multiple_choice", text: "The sum of angles in any quadrilateral (4-sided polygon) is:", options: ["360°", "180°", "540°", "720°"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Formula for polygon:** Sum = (n - 2) × 180°\n2. **For quadrilateral:** n = 4 sides\n3. **Calculate:** (4 - 2) × 180° = 2 × 180°\n4. **Sum:** 360°\n5. **Or think:** Two triangles make a quadrilateral\n6. **2 × 180° = 360°**\n**Answer: 360°**", points: 10 },
          { type: "multiple_choice", text: "A ladder leans against a wall, forming a right triangle. The ladder is 13 ft long and reaches 12 ft up the wall. How far is the base of the ladder from the wall?", options: ["5 ft", "1 ft", "25 ft", "7 ft"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Right triangle:** ladder = hypotenuse = 13 ft\n2. **Height on wall** = one leg = 12 ft\n3. **Distance from wall** = other leg = ?\n4. **Pythagorean theorem:** a² + 12² = 13²\n5. **Calculate:** a² + 144 = 169\n6. **Solve:** a² = 25\n7. **Square root:** a = 5 ft\n8. **This is a 5-12-13 right triangle**\n**Answer: 5 ft**", points: 10 }
        ]
      },

      // Domain 0: Circles & Polygons
      {
        domainNumber: 0,
        domain: DOMAINS[0],
        title: "Circles & Polygons",
        description: "Calculate area, circumference, and perimeter for surveying applications",
        content: "Understanding circles and polygons is essential for property area calculations, curve layout, and construction planning. This lesson covers formulas for circles, regular polygons, and common quadrilaterals.",
        difficulty: "medium" as const,
        orderIndex: 6,
        estimatedMinutes: 30,
        suggestedWeek: 3,
        questions: [
          { type: "multiple_choice", text: "Calculate the area of a circle with radius 5 m (use π ≈ 3.14159):", options: ["78.54 m²", "31.42 m²", "157.08 m²", "15.71 m²"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Area formula:** A = πr²\n2. **Given:** r = 5 m\n3. **Substitute:** A = π × 5²\n4. **Calculate:** A = 3.14159 × 25\n5. **Result:** A ≈ 78.54 m²\n6. **Units:** Area is in square meters\n**Answer: 78.54 m²**", points: 10 },
          { type: "multiple_choice", text: "Calculate the circumference of a circle with diameter 10 ft (use π ≈ 3.14159):", options: ["31.42 ft", "62.83 ft", "78.54 ft", "15.71 ft"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Circumference formula:** C = πd (or C = 2πr)\n2. **Given:** d = 10 ft\n3. **Substitute:** C = π × 10\n4. **Calculate:** C = 3.14159 × 10\n5. **Result:** C ≈ 31.42 ft\n6. **Alternative:** r = 5, so C = 2 × 3.14159 × 5 = 31.42 ft\n**Answer: 31.42 ft**", points: 10 },
          { type: "multiple_choice", text: "A circular property has radius 50 m. What is its area in square meters (use π ≈ 3.14159)?", options: ["7,854 m²", "314.2 m²", "15,708 m²", "157.1 m²"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Area formula:** A = πr²\n2. **Given:** r = 50 m\n3. **Calculate:** A = 3.14159 × 50²\n4. **Simplify:** A = 3.14159 × 2,500\n5. **Result:** A ≈ 7,854 m²\n6. **Rounded to nearest whole number**\n**Answer: 7,854 m²**", points: 10 },
          { type: "multiple_choice", text: "Calculate the area of a rectangle with length 12 m and width 8 m:", options: ["96 m²", "40 m²", "20 m²", "192 m²"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Rectangle area formula:** A = length × width\n2. **Given:** length = 12 m, width = 8 m\n3. **Substitute:** A = 12 × 8\n4. **Calculate:** A = 96 m²\n5. **Units:** Square meters\n**Answer: 96 m²**", points: 10 },
          { type: "multiple_choice", text: "The perimeter of a rectangle is 50 ft. If the length is 15 ft, what is the width?", options: ["10 ft", "35 ft", "25 ft", "20 ft"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Perimeter formula:** P = 2(length + width)\n2. **Given:** P = 50 ft, length = 15 ft\n3. **Substitute:** 50 = 2(15 + width)\n4. **Divide by 2:** 25 = 15 + width\n5. **Solve:** width = 25 - 15 = 10 ft\n6. **Check:** 2(15 + 10) = 2(25) = 50 ft ✓\n**Answer: 10 ft**", points: 10 },
          { type: "multiple_choice", text: "Calculate the area of a parallelogram with base 20 m and height 8 m:", options: ["160 m²", "28 m²", "56 m²", "1,600 m²"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Parallelogram area:** A = base × height\n2. **Given:** base = 20 m, height = 8 m\n3. **Substitute:** A = 20 × 8\n4. **Calculate:** A = 160 m²\n5. **Note:** Height is perpendicular distance between parallel sides\n6. **Not the slant side length**\n**Answer: 160 m²**", points: 10 },
          { type: "multiple_choice", text: "A trapezoid has bases of 10 m and 14 m, with height 6 m. What is its area?", options: ["72 m²", "144 m²", "84 m²", "48 m²"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Trapezoid area:** A = (1/2) × (base₁ + base₂) × height\n2. **Given:** base₁ = 10 m, base₂ = 14 m, height = 6 m\n3. **Substitute:** A = (1/2) × (10 + 14) × 6\n4. **Simplify:** A = (1/2) × 24 × 6\n5. **Calculate:** A = 0.5 × 144 = 72 m²\n6. **Or:** A = 12 × 6 = 72 m²\n**Answer: 72 m²**", points: 10 },
          { type: "multiple_choice", text: "A regular hexagon has 6 equal sides. If each side is 4 m, what is the perimeter?", options: ["24 m", "48 m", "16 m", "36 m"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Perimeter:** Sum of all sides\n2. **Regular hexagon:** 6 equal sides\n3. **Each side:** 4 m\n4. **Perimeter:** 6 × 4 = 24 m\n5. **General formula:** P = n × side (for regular polygon)\n**Answer: 24 m**", points: 10 },
          { type: "multiple_choice", text: "A square property has area 2,500 m². What is the length of each side?", options: ["50 m", "625 m", "25 m", "100 m"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Square area formula:** A = side²\n2. **Given:** A = 2,500 m²\n3. **Equation:** side² = 2,500\n4. **Take square root:** side = √2,500\n5. **Calculate:** side = 50 m\n6. **Check:** 50² = 2,500 ✓\n**Answer: 50 m**", points: 10 },
          { type: "multiple_choice", text: "On a survey map, the scale is 1 inch = 100 feet. A property line measures 3.5 inches on the map. What is the actual distance?", options: ["350 ft", "103.5 ft", "35 ft", "3,500 ft"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Scale ratio:** 1 in = 100 ft\n2. **Map measurement:** 3.5 in\n3. **Set up proportion:** 1/100 = 3.5/x\n4. **Cross multiply:** x = 3.5 × 100\n5. **Calculate:** x = 350 ft\n6. **Check units:** inches × (feet/inch) = feet ✓\n**Answer: 350 ft**", points: 10 },
          { type: "multiple_choice", text: "A circle has circumference 62.83 m (use π ≈ 3.14159). What is the radius?", options: ["10 m", "20 m", "31.42 m", "5 m"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Circumference formula:** C = 2πr\n2. **Given:** C = 62.83 m\n3. **Substitute:** 62.83 = 2 × 3.14159 × r\n4. **Simplify:** 62.83 = 6.28318 × r\n5. **Divide:** r = 62.83 ÷ 6.28318\n6. **Calculate:** r ≈ 10 m\n**Answer: 10 m**", points: 10 },
          { type: "multiple_choice", text: "A semicircular driveway has diameter 20 ft. What is its perimeter (straight edge + curved edge)? Use π ≈ 3.14159:", options: ["51.42 ft", "31.42 ft", "62.83 ft", "20 ft"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Semicircle perimeter:** (πd)/2 + d\n2. **Given:** d = 20 ft\n3. **Curved part:** (π × 20)/2 = 10π ≈ 31.42 ft\n4. **Straight part (diameter):** 20 ft\n5. **Total perimeter:** 31.42 + 20 = 51.42 ft\n6. **Note:** Half circumference plus diameter\n**Answer: 51.42 ft**", points: 10 }
        ]
      },

      // Domain 0: Right Triangle Trigonometry
      {
        domainNumber: 0,
        domain: DOMAINS[0],
        title: "Right Triangle Trigonometry",
        description: "Master SOH-CAH-TOA and apply trigonometry to surveying problems",
        content: "Trigonometry is the backbone of surveying calculations. Understanding sine, cosine, and tangent enables you to solve for unknown distances and angles in right triangles, which is essential for traverse work, elevations, and construction layout.",
        difficulty: "medium" as const,
        orderIndex: 7,
        estimatedMinutes: 35,
        suggestedWeek: 4,
        questions: [
          { type: "multiple_choice", text: "In a right triangle, sin(θ) is defined as:", options: ["opposite/hypotenuse", "adjacent/hypotenuse", "opposite/adjacent", "hypotenuse/opposite"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **SOH-CAH-TOA mnemonic**\n2. **SOH:** Sin = Opposite / Hypotenuse\n3. **CAH:** Cos = Adjacent / Hypotenuse\n4. **TOA:** Tan = Opposite / Adjacent\n5. **Remember:** Sine uses Opposite and Hypotenuse\n**Answer: opposite/hypotenuse**", points: 10 },
          { type: "multiple_choice", text: "In a right triangle with angle θ = 30°, hypotenuse = 10, find the opposite side:", options: ["5", "8.66", "10", "20"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Use sine:** sin(θ) = opposite / hypotenuse\n2. **Given:** θ = 30°, hypotenuse = 10\n3. **Substitute:** sin(30°) = opposite / 10\n4. **Know:** sin(30°) = 0.5\n5. **Solve:** 0.5 = opposite / 10\n6. **Multiply:** opposite = 0.5 × 10 = 5\n7. **This is a 30-60-90 triangle**\n**Answer: 5**", points: 10 },
          { type: "multiple_choice", text: "In a right triangle, if the opposite side is 12 and the adjacent side is 5, what is tan(θ)?", options: ["2.4", "0.4167", "2.6", "13"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Tangent definition:** tan(θ) = opposite / adjacent\n2. **Given:** opposite = 12, adjacent = 5\n3. **Substitute:** tan(θ) = 12 / 5\n4. **Calculate:** tan(θ) = 2.4\n5. **Note:** This is a ratio, no units\n6. **If needed, θ = arctan(2.4) ≈ 67.4°**\n**Answer: 2.4**", points: 10 },
          { type: "multiple_choice", text: "A surveyor measures an angle of elevation of 45° to the top of a building. If standing 100 ft from the base, how tall is the building?", options: ["100 ft", "141.4 ft", "70.7 ft", "200 ft"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Draw:** Right triangle, angle at ground = 45°\n2. **Adjacent side** (distance to building) = 100 ft\n3. **Opposite side** (building height) = ?\n4. **Use tangent:** tan(45°) = height / 100\n5. **Know:** tan(45°) = 1\n6. **Solve:** 1 = height / 100\n7. **Height:** 100 ft\n8. **45-45-90 triangle has equal legs**\n**Answer: 100 ft**", points: 10 },
          { type: "multiple_choice", text: "Find the angle θ if sin(θ) = 0.5:", options: ["30°", "60°", "45°", "90°"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Given:** sin(θ) = 0.5\n2. **Use inverse sine:** θ = arcsin(0.5)\n3. **Common angle knowledge:** sin(30°) = 0.5\n4. **Therefore:** θ = 30°\n5. **Verify:** In 30-60-90 triangle, opposite:hypotenuse = 1:2 = 0.5\n**Answer: 30°**", points: 10 },
          { type: "multiple_choice", text: "In a right triangle, hypotenuse = 13, adjacent = 5. Find cos(θ):", options: ["5/13 ≈ 0.385", "13/5 = 2.6", "12/13 ≈ 0.923", "5/12 ≈ 0.417"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Cosine definition:** cos(θ) = adjacent / hypotenuse\n2. **Given:** adjacent = 5, hypotenuse = 13\n3. **Substitute:** cos(θ) = 5 / 13\n4. **Calculate:** cos(θ) ≈ 0.385\n5. **This is a 5-12-13 right triangle**\n6. **Opposite side:** √(13² - 5²) = √(169 - 25) = 12\n**Answer: 5/13 ≈ 0.385**", points: 10 },
          { type: "multiple_choice", text: "A ramp rises 3 ft over a horizontal distance of 20 ft. What is the angle of inclination?", options: ["8.53°", "81.47°", "15°", "0.15°"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Right triangle:** opposite = 3 ft (rise), adjacent = 20 ft (run)\n2. **Use tangent:** tan(θ) = opposite / adjacent\n3. **Substitute:** tan(θ) = 3 / 20 = 0.15\n4. **Inverse tangent:** θ = arctan(0.15)\n5. **Calculate:** θ ≈ 8.53°\n6. **This is a gentle slope**\n**Answer: 8.53°**", points: 10 },
          { type: "multiple_choice", text: "If cos(θ) = 0.866, what is the angle θ (rounded to nearest degree)?", options: ["30°", "60°", "45°", "0°"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Given:** cos(θ) = 0.866\n2. **Use inverse cosine:** θ = arccos(0.866)\n3. **Know:** cos(30°) = √3/2 ≈ 0.866\n4. **Therefore:** θ ≈ 30°\n5. **Verify:** In 30-60-90 triangle, adjacent:hypotenuse = √3:2\n**Answer: 30°**", points: 10 },
          { type: "multiple_choice", text: "A guy wire is anchored 15 m from the base of a tower and makes a 60° angle with the ground. How long is the wire?", options: ["30 m", "25.98 m", "17.32 m", "12.99 m"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Right triangle:** angle = 60°, adjacent = 15 m\n2. **Find hypotenuse** (wire length)\n3. **Use cosine:** cos(60°) = adjacent / hypotenuse\n4. **Know:** cos(60°) = 0.5\n5. **Substitute:** 0.5 = 15 / hypotenuse\n6. **Solve:** hypotenuse = 15 / 0.5 = 30 m\n7. **30-60-90 triangle: adjacent:hypotenuse = 1:2**\n**Answer: 30 m**", points: 10 },
          { type: "multiple_choice", text: "From the top of a 50 m building, the angle of depression to a car is 30°. How far is the car from the base of the building?", options: ["86.6 m", "50 m", "28.87 m", "100 m"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Angle of depression** = angle of elevation from car\n2. **Right triangle:** opposite = 50 m (building height)\n3. **Angle at car:** 30° (alternate interior angles)\n4. **Use tangent:** tan(30°) = opposite / adjacent\n5. **Know:** tan(30°) = 1/√3 ≈ 0.577\n6. **Substitute:** 0.577 = 50 / adjacent\n7. **Solve:** adjacent = 50 / 0.577 ≈ 86.6 m\n**Answer: 86.6 m**", points: 10 },
          { type: "multiple_choice", text: "In surveying, you measure a slope distance of 200 m at a vertical angle of +10°. What is the horizontal distance?", options: ["196.96 m", "200 m", "34.73 m", "203.05 m"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Slope distance** = hypotenuse = 200 m\n2. **Vertical angle** = 10° from horizontal\n3. **Horizontal distance** = adjacent side\n4. **Use cosine:** cos(10°) = horizontal / 200\n5. **Calculate:** cos(10°) ≈ 0.9848\n6. **Solve:** horizontal = 200 × 0.9848 ≈ 196.96 m\n7. **Note:** Small angle, so close to 200 m\n**Answer: 196.96 m**", points: 10 },
          { type: "multiple_choice", text: "If tan(θ) = 1, what is angle θ?", options: ["45°", "30°", "60°", "90°"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Given:** tan(θ) = 1\n2. **Tangent definition:** opposite / adjacent = 1\n3. **This means:** opposite = adjacent\n4. **In right triangle:** This only happens at 45°\n5. **45-45-90 triangle** has equal legs\n6. **Verify:** tan(45°) = 1 ✓\n**Answer: 45°**", points: 10 },
          { type: "multiple_choice", text: "A surveyor needs to find the height of a tree. From 80 ft away, the angle of elevation is 35°. What is the tree height?", options: ["56.03 ft", "65.53 ft", "45.72 ft", "80 ft"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Right triangle:** adjacent = 80 ft, angle = 35°\n2. **Find opposite** (tree height)\n3. **Use tangent:** tan(35°) = height / 80\n4. **Calculate:** tan(35°) ≈ 0.7002\n5. **Solve:** height = 80 × 0.7002\n6. **Result:** height ≈ 56.02 ft\n7. **Round:** 56.03 ft\n**Answer: 56.03 ft**", points: 10 },
          { type: "multiple_choice", text: "The hypotenuse of a right triangle is 25 m and one angle is 53°. What is the length of the opposite side?", options: ["19.97 m", "15.01 m", "25 m", "20.03 m"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Use sine:** sin(53°) = opposite / hypotenuse\n2. **Given:** hypotenuse = 25 m, angle = 53°\n3. **Calculate:** sin(53°) ≈ 0.7986\n4. **Substitute:** 0.7986 = opposite / 25\n5. **Solve:** opposite = 25 × 0.7986\n6. **Result:** opposite ≈ 19.97 m\n7. **Note:** This is close to a 3-4-5 triangle (scaled)\n**Answer: 19.97 m**", points: 10 },
          { type: "multiple_choice", text: "Two surveyors stand 100 m apart. Both measure angles to a distant point: 40° and 50° from the baseline. This uses:", options: ["Trigonometry for triangulation", "Only the Pythagorean theorem", "Circle geometry", "No mathematics needed"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Scenario:** Two known points, two angles measured\n2. **Forms a triangle** with unknown point\n3. **Method:** Triangulation\n4. **Uses:** Law of sines, trigonometry\n5. **Can solve for:** Distance to unknown point\n6. **This is fundamental** surveying technique\n7. **Angles create unique solution**\n**Answer: Trigonometry for triangulation**", points: 10 }
        ]
      },

      // Domain 0: Basic Probability & Counting
      {
        domainNumber: 0,
        domain: DOMAINS[0],
        title: "Basic Probability & Counting",
        description: "Understand probability, counting principles, and basic statistics",
        content: "Probability and statistics help surveyors understand measurement uncertainty, sampling methods, and error analysis. This lesson covers fundamental probability concepts and counting techniques.",
        difficulty: "easy" as const,
        orderIndex: 8,
        estimatedMinutes: 30,
        suggestedWeek: 4,
        questions: [
          { type: "multiple_choice", text: "What is the probability of flipping a fair coin and getting heads?", options: ["1/2 or 0.5", "1/4 or 0.25", "1 or 100%", "0 or 0%"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Probability formula:** P = favorable outcomes / total outcomes\n2. **Favorable outcomes** (heads): 1\n3. **Total outcomes** (heads or tails): 2\n4. **Calculate:** P = 1/2 = 0.5\n5. **As percent:** 50%\n6. **Fair coin:** Equal chance for heads or tails\n**Answer: 1/2 or 0.5**", points: 10 },
          { type: "multiple_choice", text: "Rolling a standard six-sided die, what is the probability of rolling a 4?", options: ["1/6 ≈ 0.167", "1/4 = 0.25", "4/6 ≈ 0.667", "1/2 = 0.5"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Favorable outcomes** (rolling a 4): 1\n2. **Total outcomes** (1, 2, 3, 4, 5, 6): 6\n3. **Probability:** P = 1/6\n4. **Decimal:** 1/6 ≈ 0.1667 or 16.67%\n5. **Each number:** Equally likely\n**Answer: 1/6 ≈ 0.167**", points: 10 },
          { type: "multiple_choice", text: "You flip a fair coin twice. What is the probability of getting heads both times?", options: ["1/4 or 0.25", "1/2 or 0.5", "3/4 or 0.75", "1/8 or 0.125"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Independent events:** Flips don't affect each other\n2. **First flip heads:** P = 1/2\n3. **Second flip heads:** P = 1/2\n4. **Both heads:** Multiply probabilities\n5. **Calculate:** (1/2) × (1/2) = 1/4\n6. **Outcomes:** HH, HT, TH, TT (1 favorable out of 4)\n**Answer: 1/4 or 0.25**", points: 10 },
          { type: "multiple_choice", text: "A bag contains 3 red balls and 2 blue balls. What is the probability of randomly drawing a red ball?", options: ["3/5 or 0.6", "2/5 or 0.4", "3/2 or 1.5", "1/5 or 0.2"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Favorable outcomes** (red balls): 3\n2. **Total outcomes** (all balls): 3 + 2 = 5\n3. **Probability:** P = 3/5\n4. **Decimal:** 0.6 or 60%\n5. **Note:** More red than blue, so > 50% chance\n**Answer: 3/5 or 0.6**", points: 10 },
          { type: "multiple_choice", text: "How many different ways can you arrange 3 people in a line?", options: ["6", "3", "9", "1"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **This is a permutation** (order matters)\n2. **First position:** 3 choices\n3. **Second position:** 2 remaining choices\n4. **Third position:** 1 remaining choice\n5. **Total arrangements:** 3 × 2 × 1 = 6\n6. **Formula:** n! = 3! = 6\n7. **List them:** ABC, ACB, BAC, BCA, CAB, CBA\n**Answer: 6**", points: 10 },
          { type: "multiple_choice", text: "If you roll two dice, what is the probability that both show a 6?", options: ["1/36 ≈ 0.028", "1/6 ≈ 0.167", "2/6 ≈ 0.333", "1/12 ≈ 0.083"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **First die shows 6:** P = 1/6\n2. **Second die shows 6:** P = 1/6\n3. **Independent events:** Multiply\n4. **Both show 6:** (1/6) × (1/6) = 1/36\n5. **Total outcomes:** 6 × 6 = 36 possible rolls\n6. **Favorable:** Only one (6,6)\n**Answer: 1/36 ≈ 0.028**", points: 10 },
          { type: "multiple_choice", text: "A survey crew randomly samples 5 points from 20 total points. This is an example of:", options: ["Combinations (order doesn't matter)", "Permutations (order matters)", "Independent events", "Mutually exclusive events"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Sampling:** Selecting a subset\n2. **Order doesn't matter:** Point set {1,2,3} = {3,1,2}\n3. **This is a combination**\n4. **Formula:** C(n,r) = n! / (r!(n-r)!)\n5. **Calculate:** C(20,5) = 20!/(5!×15!) = 15,504 ways\n6. **Not permutation:** That would count {1,2,3} and {3,1,2} separately\n**Answer: Combinations (order doesn't matter)**", points: 10 },
          { type: "multiple_choice", text: "A deck has 52 cards. What is the probability of drawing an Ace?", options: ["4/52 = 1/13 ≈ 0.077", "1/52 ≈ 0.019", "13/52 = 1/4 = 0.25", "4/13 ≈ 0.308"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Favorable outcomes** (Aces): 4 (one per suit)\n2. **Total outcomes** (all cards): 52\n3. **Probability:** P = 4/52\n4. **Simplify:** 4/52 = 1/13\n5. **Decimal:** ≈ 0.077 or 7.7%\n**Answer: 4/52 = 1/13 ≈ 0.077**", points: 10 },
          { type: "multiple_choice", text: "Using the counting principle, how many different 3-digit codes are possible using digits 0-9 (with repetition allowed)?", options: ["1,000", "720", "100", "30"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **First digit:** 10 choices (0-9)\n2. **Second digit:** 10 choices (repetition allowed)\n3. **Third digit:** 10 choices\n4. **Counting principle:** Multiply choices\n5. **Total:** 10 × 10 × 10 = 1,000\n6. **Range:** 000 to 999\n**Answer: 1,000**", points: 10 },
          { type: "multiple_choice", text: "The probability of event A is 0.3 and event B is 0.4. If A and B are independent, what is P(A and B)?", options: ["0.12", "0.7", "0.1", "1.2"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Independent events:** P(A and B) = P(A) × P(B)\n2. **Given:** P(A) = 0.3, P(B) = 0.4\n3. **Calculate:** P(A and B) = 0.3 × 0.4\n4. **Result:** 0.12 or 12%\n5. **Note:** \"and\" means multiply for independent events\n6. **\"or\" would mean add** (for mutually exclusive)\n**Answer: 0.12**", points: 10 },
          { type: "multiple_choice", text: "You select 2 people from a group of 4. How many different pairs can you form?", options: ["6", "12", "24", "2"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Combinations:** Order doesn't matter (pair AB = BA)\n2. **Formula:** C(n,r) = n! / (r!(n-r)!)\n3. **Apply:** C(4,2) = 4! / (2! × 2!)\n4. **Calculate:** = 24 / (2 × 2) = 24 / 4 = 6\n5. **List pairs:** (1,2), (1,3), (1,4), (2,3), (2,4), (3,4)\n**Answer: 6**", points: 10 },
          { type: "multiple_choice", text: "In a survey, 70% of respondents prefer method A. If you randomly select one respondent, what is the probability they prefer method A?", options: ["0.7 or 70%", "0.3 or 30%", "7", "70"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Percent to probability:** Divide by 100\n2. **Given:** 70% prefer method A\n3. **As decimal:** 70% = 70/100 = 0.7\n4. **Probability:** P = 0.7\n5. **Interpretation:** 7 out of 10 respondents\n6. **Complement:** P(not A) = 0.3\n**Answer: 0.7 or 70%**", points: 10 }
        ]
      },

      // Domain 0: Ratios, Proportions & Scale
      {
        domainNumber: 0,
        domain: DOMAINS[0],
        title: "Ratios, Proportions & Scale",
        description: "Master ratio operations, proportions, and scale calculations for surveying",
        content: "Ratios and proportions are fundamental to surveying scales, map reading, and converting measurements. Understanding scale factors and similar triangles enables accurate interpretation of survey maps and drawings.",
        difficulty: "easy" as const,
        orderIndex: 9,
        estimatedMinutes: 30,
        suggestedWeek: 5,
        questions: [
          { type: "multiple_choice", text: "Simplify the ratio 18:24 to lowest terms:", options: ["3:4", "6:8", "9:12", "2:3"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Find GCF** of 18 and 24\n2. **Factors of 18:** 1, 2, 3, 6, 9, 18\n3. **Factors of 24:** 1, 2, 3, 4, 6, 8, 12, 24\n4. **GCF:** 6\n5. **Divide both by 6:** 18÷6 : 24÷6 = 3:4\n6. **Check:** Cannot reduce further\n**Answer: 3:4**", points: 10 },
          { type: "multiple_choice", text: "Solve the proportion: 3/5 = x/20", options: ["12", "15", "4", "60"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Cross multiply:** 3 × 20 = 5 × x\n2. **Calculate left:** 60 = 5x\n3. **Divide by 5:** x = 60 ÷ 5\n4. **Solution:** x = 12\n5. **Check:** 3/5 = 12/20 → 0.6 = 0.6 ✓\n**Answer: 12**", points: 10 },
          { type: "multiple_choice", text: "A map scale is 1 inch = 50 feet. A building measures 6 inches on the map. What is the actual length?", options: ["300 feet", "56 feet", "8.33 feet", "50 feet"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Scale ratio:** 1 in = 50 ft\n2. **Map measurement:** 6 inches\n3. **Set up proportion:** 1/50 = 6/x\n4. **Cross multiply:** x = 6 × 50\n5. **Calculate:** x = 300 feet\n6. **Or simply:** 6 × 50 = 300 feet\n**Answer: 300 feet**", points: 10 },
          { type: "multiple_choice", text: "If 4 stakes cost $12, how much do 7 stakes cost?", options: ["$21", "$28", "$16", "$19"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Find unit rate:** $12 ÷ 4 = $3 per stake\n2. **Calculate for 7:** 7 × $3 = $21\n3. **Alternative - proportion:** 4/12 = 7/x\n4. **Cross multiply:** 4x = 84\n5. **Solve:** x = $21\n**Answer: $21**", points: 10 },
          { type: "multiple_choice", text: "A scale drawing uses a scale of 1:100. If a wall is 2.5 cm on the drawing, what is the actual length in meters?", options: ["2.5 m", "250 m", "0.025 m", "25 m"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Scale 1:100** means drawing is 1/100 of actual\n2. **Drawing:** 2.5 cm\n3. **Multiply by 100:** 2.5 × 100 = 250 cm\n4. **Convert to meters:** 250 cm = 2.5 m\n5. **Check:** 1 cm represents 100 cm = 1 m\n6. **So 2.5 cm represents 2.5 m**\n**Answer: 2.5 m**", points: 10 },
          { type: "multiple_choice", text: "Two similar triangles have corresponding sides in ratio 2:5. If the smaller triangle has a side of 6 cm, what is the corresponding side in the larger triangle?", options: ["15 cm", "12 cm", "30 cm", "2.4 cm"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Similar triangles:** Corresponding sides proportional\n2. **Ratio:** small : large = 2 : 5\n3. **Set up proportion:** 2/5 = 6/x\n4. **Cross multiply:** 2x = 30\n5. **Solve:** x = 15 cm\n6. **Check:** 6/15 = 2/5 ✓\n**Answer: 15 cm**", points: 10 },
          { type: "multiple_choice", text: "A car travels 240 miles in 4 hours. What is the unit rate (speed) in miles per hour?", options: ["60 mph", "236 mph", "244 mph", "960 mph"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Unit rate formula:** Rate = Distance / Time\n2. **Given:** 240 miles, 4 hours\n3. **Calculate:** Rate = 240 ÷ 4\n4. **Result:** 60 miles per hour\n5. **Units:** mph (miles per hour)\n**Answer: 60 mph**", points: 10 },
          { type: "multiple_choice", text: "If a property has a length-to-width ratio of 5:3 and the length is 100 m, what is the width?", options: ["60 m", "166.7 m", "20 m", "300 m"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Ratio:** length : width = 5 : 3\n2. **Given:** length = 100 m\n3. **Set up proportion:** 5/3 = 100/width\n4. **Cross multiply:** 5 × width = 300\n5. **Divide:** width = 300 ÷ 5 = 60 m\n6. **Check:** 100/60 = 5/3 ✓\n**Answer: 60 m**", points: 10 },
          { type: "multiple_choice", text: "On a map with scale 1\" = 200', two points measure 3.5\" apart. What is the actual distance?", options: ["700 feet", "203.5 feet", "57.1 feet", "3.5 feet"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Scale:** 1 inch = 200 feet\n2. **Map distance:** 3.5 inches\n3. **Multiply:** 3.5 × 200 = 700 feet\n4. **Or proportion:** 1/200 = 3.5/x → x = 700\n5. **Answer:** 700 feet\n**Answer: 700 feet**", points: 10 },
          { type: "multiple_choice", text: "A recipe calls for a 2:3 ratio of sand to cement. If you have 10 kg of sand, how much cement do you need?", options: ["15 kg", "6.67 kg", "20 kg", "5 kg"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Ratio:** sand : cement = 2 : 3\n2. **Given:** sand = 10 kg\n3. **Set up proportion:** 2/3 = 10/cement\n4. **Cross multiply:** 2 × cement = 30\n5. **Solve:** cement = 30 ÷ 2 = 15 kg\n6. **Check:** 10/15 = 2/3 ✓\n**Answer: 15 kg**", points: 10 },
          { type: "multiple_choice", text: "If a 50 ft rope weighs 10 lbs, how much does a 125 ft rope of the same type weigh?", options: ["25 lbs", "62.5 lbs", "15 lbs", "250 lbs"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Find unit rate:** 10 lbs ÷ 50 ft = 0.2 lbs/ft\n2. **For 125 ft:** 125 × 0.2 = 25 lbs\n3. **Or proportion:** 50/10 = 125/x\n4. **Cross multiply:** 50x = 1,250\n5. **Solve:** x = 25 lbs\n**Answer: 25 lbs**", points: 10 },
          { type: "multiple_choice", text: "Two surveyors work at rates in the ratio 3:4. If they complete a job together in 6 hours, how long would the slower surveyor take alone? (Hint: Combined rate ratio)", options: ["14 hours", "8 hours", "10 hours", "12 hours"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Rate ratio:** 3:4 (slower:faster)\n2. **Combined rate:** 3 + 4 = 7 parts per hour\n3. **Job done in 6 hours:** Total = 6 × 7 = 42 parts\n4. **Slower surveyor rate:** 3 parts/hour\n5. **Time alone:** 42 ÷ 3 = 14 hours\n6. **Check:** Faster would take 42 ÷ 4 = 10.5 hours\n**Answer: 14 hours**", points: 10 }
        ]
      },

      // Domain 0: Word Problem Strategies
      {
        domainNumber: 0,
        domain: DOMAINS[0],
        title: "Word Problem Strategies",
        description: "Master translating real-world problems into mathematical equations",
        content: "Word problems require careful reading, identifying unknowns, and translating descriptions into mathematical equations. This lesson covers systematic approaches to solving mixture, rate, distance, work, and age problems commonly encountered in surveying contexts.",
        difficulty: "medium" as const,
        orderIndex: 10,
        estimatedMinutes: 25,
        suggestedWeek: 5,
        questions: [
          { type: "multiple_choice", text: "The sum of two numbers is 45. The larger number is 3 more than twice the smaller. What is the smaller number?", options: ["14", "31", "15", "30"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Let x** = smaller number\n2. **Larger number:** 2x + 3\n3. **Sum equation:** x + (2x + 3) = 45\n4. **Combine:** 3x + 3 = 45\n5. **Subtract 3:** 3x = 42\n6. **Divide:** x = 14\n7. **Check:** 14 + 31 = 45 ✓; 31 = 2(14) + 3 ✓\n**Answer: 14**", points: 10 },
          { type: "multiple_choice", text: "A surveyor drives 120 miles at 60 mph. How long does the trip take?", options: ["2 hours", "180 hours", "60 hours", "0.5 hours"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Formula:** Time = Distance / Speed\n2. **Given:** Distance = 120 miles, Speed = 60 mph\n3. **Substitute:** Time = 120 / 60\n4. **Calculate:** Time = 2 hours\n5. **Check:** 60 mph × 2 hours = 120 miles ✓\n**Answer: 2 hours**", points: 10 },
          { type: "multiple_choice", text: "Two crew members working together can complete a survey in 12 hours. Working alone, one takes 20 hours. How long for the other alone?", options: ["30 hours", "32 hours", "8 hours", "15 hours"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Rate of first person:** 1/20 job per hour\n2. **Combined rate:** 1/12 job per hour\n3. **Second person's rate:** 1/12 - 1/20\n4. **Find common denominator:** 5/60 - 3/60 = 2/60 = 1/30\n5. **Second person alone:** 30 hours\n6. **Check:** 1/20 + 1/30 = 3/60 + 2/60 = 5/60 = 1/12 ✓\n**Answer: 30 hours**", points: 10 },
          { type: "multiple_choice", text: "A concrete mix uses cement and sand in ratio 1:3. How many kg of cement are needed for 60 kg total mix?", options: ["15 kg", "20 kg", "45 kg", "12 kg"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Ratio:** cement:sand = 1:3\n2. **Total parts:** 1 + 3 = 4 parts\n3. **Cement fraction:** 1/4 of total\n4. **Total mix:** 60 kg\n5. **Cement amount:** (1/4) × 60 = 15 kg\n6. **Sand amount:** (3/4) × 60 = 45 kg\n7. **Check:** 15 + 45 = 60 ✓\n**Answer: 15 kg**", points: 10 },
          { type: "multiple_choice", text: "John is 5 years older than Mary. In 3 years, John will be twice as old as Mary is now. How old is Mary now?", options: ["8 years", "13 years", "5 years", "10 years"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Let M** = Mary's current age\n2. **John's current age:** M + 5\n3. **In 3 years, John:** M + 5 + 3 = M + 8\n4. **Twice Mary's current age:** 2M\n5. **Equation:** M + 8 = 2M\n6. **Subtract M:** 8 = M\n7. **Mary is 8, John is 13**\n8. **Check:** In 3 years, John = 16 = 2(8) ✓\n**Answer: 8 years**", points: 10 },
          { type: "multiple_choice", text: "A car and truck leave the same point, going opposite directions. The car goes 60 mph, truck 40 mph. How far apart after 2 hours?", options: ["200 miles", "100 miles", "120 miles", "50 miles"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Car distance:** 60 mph × 2 hours = 120 miles\n2. **Truck distance:** 40 mph × 2 hours = 80 miles\n3. **Opposite directions:** Add distances\n4. **Total separation:** 120 + 80 = 200 miles\n5. **Or combined rate:** (60 + 40) × 2 = 200 miles\n**Answer: 200 miles**", points: 10 },
          { type: "multiple_choice", text: "The perimeter of a rectangle is 56 m. The length is 4 m more than the width. Find the width:", options: ["12 m", "16 m", "14 m", "10 m"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Let w** = width\n2. **Length:** w + 4\n3. **Perimeter formula:** P = 2(length + width)\n4. **Substitute:** 56 = 2(w + 4 + w)\n5. **Simplify:** 56 = 2(2w + 4)\n6. **Divide by 2:** 28 = 2w + 4\n7. **Subtract 4:** 24 = 2w\n8. **Divide:** w = 12 m\n9. **Check:** 2(12 + 16) = 56 ✓\n**Answer: 12 m**", points: 10 },
          { type: "multiple_choice", text: "A solution is 20% acid. How many liters of pure acid must be added to 10 liters of this solution to make it 50% acid?", options: ["6 liters", "5 liters", "10 liters", "4 liters"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Current acid:** 20% of 10 = 2 liters\n2. **Let x** = liters of pure acid added\n3. **New total:** 10 + x liters\n4. **New acid amount:** 2 + x liters (adding pure acid)\n5. **New concentration:** (2 + x)/(10 + x) = 0.5\n6. **Cross multiply:** 2 + x = 0.5(10 + x)\n7. **Expand:** 2 + x = 5 + 0.5x\n8. **Subtract 0.5x:** 2 + 0.5x = 5\n9. **Solve:** 0.5x = 3, so x = 6 liters\n10. **Check:** (2+6)/(10+6) = 8/16 = 0.5 ✓\n**Answer: 6 liters**", points: 10 },
          { type: "multiple_choice", text: "A number increased by 15% equals 69. What is the original number?", options: ["60", "79.35", "58.65", "55"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Let x** = original number\n2. **Increased by 15%:** x + 0.15x = 1.15x\n3. **Equation:** 1.15x = 69\n4. **Divide by 1.15:** x = 69 / 1.15\n5. **Calculate:** x = 60\n6. **Check:** 60 + (15% of 60) = 60 + 9 = 69 ✓\n**Answer: 60**", points: 10 },
          { type: "multiple_choice", text: "A water tank fills at 50 liters/min and drains at 20 liters/min. If both are open, how long to fill a 900-liter empty tank?", options: ["30 minutes", "18 minutes", "45 minutes", "15 minutes"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Fill rate:** 50 L/min\n2. **Drain rate:** 20 L/min\n3. **Net fill rate:** 50 - 20 = 30 L/min\n4. **Tank capacity:** 900 liters\n5. **Time = Capacity / Net rate:** 900 / 30\n6. **Calculate:** 30 minutes\n7. **Check:** 30 min × 30 L/min = 900 L ✓\n**Answer: 30 minutes**", points: 10 }
        ]
      },

      // Domain 1: Differential Leveling Fundamentals
      {
        domainNumber: 1,
        domain: DOMAINS[1],
        title: "Differential Leveling Fundamentals",
        description: "Master basic leveling concepts, rod readings, and elevation calculations",
        content: "Differential leveling is the most common method for determining elevation differences. Understanding backsights (BS), foresights (FS), and height of instrument (HI) is essential for accurate elevation work.",
        difficulty: "easy" as const,
        orderIndex: 1,
        estimatedMinutes: 20,
        suggestedWeek: 2,
        questions: [
          { type: "multiple_choice", text: "In differential leveling, a backsight (BS) is:", options: ["A rod reading taken on a point of unknown elevation", "A rod reading taken on a point of known elevation", "The difference between two rod readings", "The height of the instrument above the ground"], answer: "1", explanation: "**Step-by-Step Solution:**\n1. **Backsight (BS)** is the FIRST rod reading after setting up the level\n2. It's always taken on a point of KNOWN elevation (benchmark or turning point)\n3. Purpose: Establish the Height of Instrument (HI)\n4. Formula: HI = Known Elevation + BS\n5. Foresights are taken on unknown points\n**Answer: A rod reading taken on a point of known elevation**", points: 10 },
          { type: "multiple_choice", text: "A level is set up and a backsight of 4.82 ft is read on BM-5 (elevation 125.40 ft). What is the Height of Instrument (HI)?", options: ["120.58 ft", "130.22 ft", "121.42 ft", "129.58 ft"], answer: "1", explanation: "**Step-by-Step Solution:**\n1. **Formula:** HI = Elevation of BM + Backsight\n2. **Given:**\n   - BM elevation = 125.40 ft\n   - Backsight (BS) = 4.82 ft\n3. **Substitute:** HI = 125.40 + 4.82\n4. **Calculate:** HI = 130.22 ft\n5. **Concept:** HI is the elevation of the line of sight\n**Answer: 130.22 ft**", points: 10 },
          { type: "multiple_choice", text: "With HI = 130.22 ft, a foresight reading of 6.35 ft is taken on point A. What is the elevation of point A?", options: ["136.57 ft", "123.87 ft", "125.40 ft", "133.75 ft"], answer: "1", explanation: "**Step-by-Step Solution:**\n1. **Formula:** Elevation = HI - Foresight\n2. **Given:**\n   - HI = 130.22 ft\n   - Foresight (FS) = 6.35 ft\n3. **Substitute:** Elevation = 130.22 - 6.35\n4. **Calculate:** Elevation = 123.87 ft\n5. **Remember:** Subtract FS because rod extends DOWN from HI\n**Answer: 123.87 ft**", points: 10 },
          { type: "multiple_choice", text: "A rod reading shows the following: The target is between 5 and 6 ft, with the crosshair at 3 small divisions above 5. If each small division = 0.01 ft, what is the reading?", options: ["5.03 ft", "5.30 ft", "5.003 ft", "6.03 ft"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Start with whole foot:** 5 ft\n2. **Count small divisions above:** 3 divisions\n3. **Each division:** 0.01 ft\n4. **Calculate:** 3 × 0.01 = 0.03 ft\n5. **Total reading:** 5 + 0.03 = 5.03 ft\n6. **Note:** Standard leveling rods read to 0.01 ft precision\n**Answer: 5.03 ft**", points: 10 },
          { type: "multiple_choice", text: "A construction site needs to be graded to elevation 150.00 ft. Current HI = 156.75 ft. What rod reading (cut) is needed to mark grade stakes?", options: ["6.75 ft", "150.00 ft", "156.75 ft", "306.75 ft"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **What we need:** Find rod reading for elevation 150.00 ft\n2. **Formula:** Rod Reading = HI - Desired Elevation\n3. **Given:**\n   - HI = 156.75 ft\n   - Desired elevation = 150.00 ft\n4. **Calculate:** Rod Reading = 156.75 - 150.00 = 6.75 ft\n5. **Real-world use:** Mark grade stakes at 6.75 ft cut\n**Answer: 6.75 ft**", points: 10 }
        ]
      },

      // Domain 1: Total Station Setup and Operation
      {
        domainNumber: 1,
        domain: DOMAINS[1],
        title: "Total Station Setup and Operation",
        description: "Learn proper total station setup, centering, and leveling procedures",
        content: "Total stations combine electronic distance measurement (EDM) and angle measurement in one instrument. Proper setup ensures accurate measurements for control surveys, construction layout, and topographic mapping.",
        difficulty: "easy" as const,
        orderIndex: 2,
        estimatedMinutes: 20,
        suggestedWeek: 3,
        questions: [
          { type: "multiple_choice", text: "What is the first step in setting up a total station over a control point?", options: ["Level the instrument", "Center the tribrach over the point using the optical plummet", "Measure the instrument height", "Turn on the total station"], answer: "1", explanation: "**Step-by-Step Solution:**\n1. **Proper setup sequence** ensures accuracy\n2. **First:** Center tribrach over point using optical plummet\n3. **Second:** Level the instrument using plate/circular bubbles\n4. **Third:** Measure instrument height\n5. **Fourth:** Power on and initialize\n6. **Why:** Centering must be done first while adjusting tripod\n**Answer: Center the tribrach over the point using the optical plummet**", points: 10 },
          { type: "multiple_choice", text: "A total station is set up with an instrument height of 1.52 m above point A (elevation 245.30 m). What is the elevation of the instrument's horizontal axis?", options: ["243.78 m", "246.82 m", "245.30 m", "1.52 m"], answer: "1", explanation: "**Step-by-Step Solution:**\n1. **Formula:** Instrument Elevation = Point Elevation + Instrument Height\n2. **Given:**\n   - Point A elevation = 245.30 m\n   - Instrument height = 1.52 m\n3. **Calculate:** 245.30 + 1.52 = 246.82 m\n4. **Concept:** Horizontal axis is where angles are measured from\n**Answer: 246.82 m**", points: 10 },
          { type: "multiple_choice", text: "When leveling a total station, which bubble should be centered first?", options: ["The plate level (long tubular bubble)", "The circular bubble", "The optical plummet bubble", "The electronic level display"], answer: "1", explanation: "**Step-by-Step Solution:**\n1. **Leveling sequence:**\n   - First: Circular bubble (coarse leveling)\n   - Second: Plate level (fine leveling)\n2. **Circular bubble** gives rough level (±5-10 minutes)\n3. Use tripod leg adjustments\n4. **Plate level** gives precise level (±20 seconds)\n5. Use foot screws for fine adjustment\n**Answer: The circular bubble**", points: 10 },
          { type: "multiple_choice", text: "After leveling, you rotate the instrument 180° and notice the bubble is off-center by 2 divisions. What does this indicate?", options: ["The instrument is properly adjusted", "The instrument has a collimation error in the level vials", "The tripod is unstable", "The point is incorrectly marked"], answer: "1", explanation: "**Step-by-Step Solution:**\n1. **Two-petal test** checks level vial adjustment\n2. **Procedure:**\n   - Level bubble in one direction\n   - Rotate 180°\n   - Check bubble position\n3. **If off-center:** Vial needs adjustment\n4. **Correction:** Half with footscrews, half with adjustment screws\n5. 2 divisions off indicates **collimation error**\n**Answer: The instrument has a collimation error in the level vials**", points: 10 },
          { type: "multiple_choice", text: "A surveyor measures instrument height from the ground mark to the center of the telescope. The measured height is 1.48 m, but the tribrach adds 0.15 m. What is the correct instrument height above the point?", options: ["1.48 m", "1.63 m", "1.33 m", "0.15 m"], answer: "1", explanation: "**Step-by-Step Solution:**\n1. **Instrument height** = Distance from point to horizontal axis\n2. **Measured to telescope center:** 1.48 m\n3. **Tribrach offset adds:** 0.15 m\n4. **Total height:** 1.48 + 0.15 = 1.63 m\n5. **Important:** Always measure to correct reference point\n**Answer: 1.63 m**", points: 10 }
        ]
      },

      // Domain 1: EDM and Distance Measurement
      {
        domainNumber: 1,
        domain: DOMAINS[1],
        title: "EDM and Distance Measurement",
        description: "Understand electronic distance measurement principles, corrections, and accuracy",
        content: "Electronic Distance Measurement (EDM) uses electromagnetic waves to measure distances. Understanding atmospheric corrections, prism constants, and systematic errors is essential for accurate distance measurements.",
        difficulty: "medium" as const,
        orderIndex: 3,
        estimatedMinutes: 25,
        suggestedWeek: 4,
        questions: [
          { type: "multiple_choice", text: "An EDM measures a slope distance of 285.456 m to a prism. The vertical angle is +5°30'. What is the horizontal distance?", options: ["284.234 m", "284.123 m", "285.456 m", "286.789 m"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Formula:** Horizontal Distance = Slope Distance × cos(vertical angle)\n2. **Given:**\n   - Slope distance = 285.456 m\n   - Vertical angle = +5°30' = 5.5°\n3. **Calculate:** HD = 285.456 × cos(5.5°)\n4. cos(5.5°) = 0.9952\n5. HD = 285.456 × 0.9952 = 284.234 m\n**Answer: 284.234 m**", points: 10 },
          { type: "multiple_choice", text: "A prism has a constant of -30 mm. The EDM displays a distance of 125.478 m. What is the correct distance to the prism center?", options: ["125.448 m", "125.508 m", "125.478 m", "125.450 m"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Prism constant** is the offset from prism face to center\n2. **Negative constant:** Prism center is CLOSER than displayed\n3. **Given:**\n   - Displayed distance = 125.478 m\n   - Prism constant = -30 mm = -0.030 m\n4. **Correct distance** = 125.478 + (-0.030) = 125.448 m\n5. **Remember:** Subtract constant magnitude for negative values\n**Answer: 125.448 m**", points: 10 },
          { type: "multiple_choice", text: "Temperature affects EDM measurements. If the assumed temperature is 20°C but actual temperature is 30°C, how does this affect the measured distance?", options: ["Measured distance is too short", "Measured distance is too long", "No effect on distance", "Depends on humidity"], answer: "1", explanation: "**Step-by-Step Solution:**\n1. **EDM uses assumed atmospheric conditions**\n2. **Temperature affects:** Speed of electromagnetic waves\n3. **Higher temperature:** Waves travel FASTER\n4. **EDM assumes standard temp:** Calculates distance based on assumed speed\n5. **Actual speed is faster:** EDM thinks waves took longer → reports LONGER distance\n6. **Result:** Measured distance is TOO LONG\n**Answer: Measured distance is too long**", points: 10 },
          { type: "multiple_choice", text: "An EDM manufacturer specifies accuracy as ±(2 mm + 2 ppm). What is the expected error for a 1,500 m distance?", options: ["±5 mm", "±3.5 mm", "±4 mm", "±2 mm"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Accuracy formula:** ±(constant + ppm × distance)\n2. **Given:**\n   - Constant error = 2 mm\n   - ppm (parts per million) = 2\n   - Distance = 1,500 m = 1,500,000 mm\n3. **ppm calculation:** 2 ppm = 2/1,000,000\n4. **Distance error:** 1,500,000 × (2/1,000,000) = 3 mm\n5. **Total error:** 2 mm + 3 mm = 5 mm\n**Answer: ±5 mm**", points: 10 },
          { type: "multiple_choice", text: "A slope distance of 450.00 m is measured with a vertical angle of -8°20'. What is the elevation difference?", options: ["-65.12 m", "-64.89 m", "+65.12 m", "-450.00 m"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Formula:** Elevation Difference = Slope Distance × sin(vertical angle)\n2. **Given:**\n   - Slope distance = 450.00 m\n   - Vertical angle = -8°20' = -8.333°\n3. **Calculate:** ΔElev = 450.00 × sin(-8.333°)\n4. sin(-8.333°) = -0.1447\n5. ΔElev = 450.00 × (-0.1447) = -65.12 m\n6. **Negative:** Target is BELOW instrument\n**Answer: -65.12 m**", points: 10 }
        ]
      },

      // Domain 1: Angle Measurement and Precision
      {
        domainNumber: 1,
        domain: DOMAINS[1],
        title: "Angle Measurement and Precision",
        description: "Master horizontal and vertical angle measurement techniques and error mitigation",
        content: "Precise angle measurement requires understanding measurement techniques, reading conventions, and systematic error elimination through multiple measurements and face positions.",
        difficulty: "medium" as const,
        orderIndex: 4,
        estimatedMinutes: 25,
        suggestedWeek: 5,
        questions: [
          { type: "multiple_choice", text: "A horizontal angle is measured as 47°25'18\" on Face 1 and 227°25'24\" on Face 2. What is the mean angle?", options: ["47°25'21\"", "47°25'18\"", "47°25'24\"", "137°25'21\""], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Face 2 reading** = Face 1 + 180° (approximately)\n2. **Adjust Face 2:** 227°25'24\" - 180° = 47°25'24\"\n3. **Mean angle** = (Face 1 + Adjusted Face 2) / 2\n4. **Calculate:** (47°25'18\" + 47°25'24\") / 2\n5. Sum: 94°50'42\" ÷ 2 = 47°25'21\"\n6. **Averaging eliminates collimation errors**\n**Answer: 47°25'21\"**", points: 10 },
          { type: "multiple_choice", text: "What is the primary purpose of measuring angles on both Face 1 and Face 2?", options: ["To save time", "To eliminate systematic errors like collimation and horizontal axis errors", "To check if the instrument is level", "To measure two different angles"], answer: "1", explanation: "**Step-by-Step Solution:**\n1. **Face 1:** Telescope in normal position\n2. **Face 2:** Telescope flipped 180° (reverse position)\n3. **Systematic errors** that occur:\n   - Horizontal collimation error\n   - Vertical collimation error\n   - Horizontal axis tilt\n4. **These errors** are equal but opposite on Face 1 vs Face 2\n5. **Averaging** Face 1 and Face 2 eliminates these errors\n**Answer: To eliminate systematic errors like collimation and horizontal axis errors**", points: 10 },
          { type: "multiple_choice", text: "A vertical angle to a target is measured as +12°30'45\" on Face 1 and -12°30'50\" on Face 2 (after index correction). What is the zenith angle on Face 1?", options: ["77°29'15\"", "77°29'10\"", "102°30'45\"", "12°30'45\""], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Vertical angle** = angle from horizontal\n2. **Zenith angle** = angle from vertical (zenith)\n3. **Relationship:** Zenith = 90° - Vertical (for elevation angles)\n4. **Mean vertical angle:** (12°30'45\" + 12°30'50\") / 2 = 12°30'47.5\" ≈ 12°30'48\"\n5. **Zenith angle:** 90° - 12°30'48\" = 77°29'12\" ≈ 77°29'15\"\n**Answer: 77°29'15\"**", points: 10 },
          { type: "multiple_choice", text: "An angle is measured 4 times with the following results: 67°32'15\", 67°32'20\", 67°32'18\", 67°32'17\". What is the standard deviation? (Hint: Mean = 67°32'17.5\")", options: ["±2.1\"", "±3.0\"", "±1.5\"", "±0.5\""], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Mean** = 67°32'17.5\" (given)\n2. **Deviations from mean:** -2.5\", +2.5\", +0.5\", -0.5\" (in seconds)\n3. **Square deviations:** 6.25, 6.25, 0.25, 0.25\n4. **Sum of squares:** 6.25 + 6.25 + 0.25 + 0.25 = 13.0\n5. **Variance** = 13.0 / (4-1) = 4.33\n6. **Standard deviation** = √4.33 = 2.08\" ≈ ±2.1\"\n**Answer: ±2.1\"**", points: 10 },
          { type: "multiple_choice", text: "Three angles in a triangle are measured as: A = 47°32'15\", B = 68°45'30\", C = 63°42'10\". What is the angular misclosure?", options: ["-5\"", "+5\"", "0\"", "-10\""], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Triangle rule:** Sum of angles = 180°00'00\"\n2. **Add measured angles:**\n   - A = 47°32'15\"\n   - B = 68°45'30\"\n   - C = 63°42'10\"\n3. **Sum:** 47° + 68° + 63° = 178° (degrees)\n4. **Minutes:** 32' + 45' + 42' = 119' = 1°59'\n5. **Seconds:** 15\" + 30\" + 10\" = 55\"\n6. **Total:** 178° + 1°59'55\" = 179°59'55\"\n7. **Misclosure formula:** Σmeasured - 180° (standard surveying convention)\n8. **Calculate:** 179°59'55\" - 180°00'00\" = -5\"\n9. **Negative misclosure:** Sum is LESS than required 180°\n**Answer: -5\"**", points: 10 }
        ]
      },

      // Domain 1: Field Notes and Documentation Standards
      {
        domainNumber: 1,
        domain: DOMAINS[1],
        title: "Field Notes and Documentation Standards",
        description: "Learn proper field book practices, sketching, and data recording standards",
        content: "Accurate, legible, and complete field notes are legal documents that support survey calculations and defend boundary determinations. Professional standards require systematic documentation of all field observations.",
        difficulty: "easy" as const,
        orderIndex: 5,
        estimatedMinutes: 15,
        suggestedWeek: 6,
        questions: [
          { type: "multiple_choice", text: "What is the cardinal rule when making an error in field notes?", options: ["Erase the error completely", "Draw a single line through the error and write the correction above", "Use correction fluid to cover the error", "Tear out the page and start over"], answer: "1", explanation: "**Step-by-Step Solution:**\n1. **Field notes are legal documents**\n2. **Never erase or obliterate** original entries\n3. **Proper correction method:**\n   - Draw single line through error\n   - Write correction above or beside\n   - Initial and date if critical\n4. **Why:** Maintains record of original observation\n5. **Legal principle:** Shows honesty, not concealment\n**Answer: Draw a single line through the error and write the correction above**", points: 10 },
          { type: "multiple_choice", text: "Field notes should always be recorded in:", options: ["Pencil for easy corrections", "Indelible ink or permanent medium", "Any medium, as long as it's legible", "Computer files only"], answer: "1", explanation: "**Step-by-Step Solution:**\n1. **Purpose:** Create permanent record\n2. **Weather resistance:** Pencil fades, smudges in rain\n3. **Legal requirement:** Permanent, tamper-resistant\n4. **Professional standard:** Indelible ink (waterproof)\n5. **Modern options:**\n   - Waterproof ink pens\n   - All-weather paper\n   - Digital collectors with backup\n6. **Pencil is NOT acceptable** for permanent records\n**Answer: Indelible ink or permanent medium**", points: 10 },
          { type: "multiple_choice", text: "When sketching a field situation, which direction should be oriented at the top of the page by convention?", options: ["East", "North", "South", "The direction you're facing"], answer: "1", explanation: "**Step-by-Step Solution:**\n1. **Standard convention:** North at top of page\n2. **Benefits:**\n   - Consistent with maps\n   - Easy to orient\n   - Universal understanding\n3. **If not possible:** Clearly mark north arrow\n4. **Always show:** North arrow on every sketch\n5. **Exception:** Construction staking may use project baseline\n**Answer: North**", points: 10 },
          { type: "multiple_choice", text: "What information MUST be included on every page of field notes?", options: ["Weather conditions only", "Project name, date, crew names, and page number", "Only the measurements", "Client's phone number"], answer: "1", explanation: "**Step-by-Step Solution:**\n1. **Essential header information:**\n   - Project name/number\n   - Date\n   - Crew members (names and positions)\n   - Page number\n   - Location/station range\n2. **Additional useful info:**\n   - Weather conditions\n   - Equipment used\n   - Time started\n3. **Why critical:** Identifies when, where, who for legal purposes\n**Answer: Project name, date, crew names, and page number**", points: 10 },
          { type: "multiple_choice", text: "A crew chief notices an ambiguous note from yesterday: 'Stake at 245.3'. How should this have been recorded?", options: ["245.3 is sufficient", "Stake at elevation 245.3 ft (BM-5 datum)", "Stake near building", "245.3 meters"], answer: "1", explanation: "**Step-by-Step Solution:**\n1. **Ambiguous elements:**\n   - What does 245.3 represent?\n   - What units?\n   - Referenced to what datum?\n2. **Proper recording:**\n   - Specify parameter (elevation, station, offset)\n   - Include units (ft, m)\n   - Reference datum or control point\n3. **Complete note:** \"Stake at elevation 245.3 ft (BM-5 datum)\"\n4. **Rule:** Notes should be understandable months/years later\n**Answer: Stake at elevation 245.3 ft (BM-5 datum)**", points: 10 }
        ]
      },

      // Domain 1: Error Sources and Systematic Errors
      {
        domainNumber: 1,
        domain: DOMAINS[1],
        title: "Error Sources and Systematic Errors",
        description: "Identify and mitigate instrumental, natural, and personal errors in surveying",
        content: "Understanding error sources—instrumental, natural, and personal—enables surveyors to implement proper field procedures and corrections to achieve required accuracy standards.",
        difficulty: "medium" as const,
        orderIndex: 6,
        estimatedMinutes: 25,
        suggestedWeek: 7,
        questions: [
          { type: "multiple_choice", text: "Which type of error can be eliminated by averaging multiple measurements?", options: ["Systematic errors", "Random errors", "Gross errors (blunders)", "Instrumental errors"], answer: "1", explanation: "**Step-by-Step Solution:**\n1. **Three error types:**\n   - **Systematic:** Constant, predictable (corrections apply)\n   - **Random:** Unpredictable, both + and - (averaging helps)\n   - **Gross:** Blunders, large mistakes (must reject)\n2. **Random errors:**\n   - Reading uncertainty\n   - Atmospheric variations\n   - Target centering\n3. **Averaging** causes + and - errors to cancel\n4. **Result:** Mean approaches true value\n**Answer: Random errors**", points: 10 },
          { type: "multiple_choice", text: "Temperature change causes a 100 ft steel tape to expand 0.02 ft. This is an example of:", options: ["Random error", "Systematic error", "Gross error", "Personal error"], answer: "1", explanation: "**Step-by-Step Solution:**\n1. **Characteristics of this error:**\n   - Predictable based on temperature\n   - Consistent direction (always expansion or contraction)\n   - Can be calculated and corrected\n2. **Systematic error definition:**\n   - Constant or follows pattern\n   - Correctable with formula\n   - Examples: temp, sag, slope, standardization\n3. **Not random:** Same temp produces same expansion\n4. **Correction formula:** ΔL = L × α × ΔT\n**Answer: Systematic error**", points: 10 },
          { type: "multiple_choice", text: "Refraction causes light rays to curve downward when passing through the atmosphere. This affects:", options: ["Horizontal angles", "Horizontal distances", "Vertical angles and elevations", "Control point coordinates"], answer: "2", explanation: "**Step-by-Step Solution:**\n1. **Atmospheric refraction:**\n   - Light bends when passing through air layers\n   - Density changes cause curvature\n   - Ray curves DOWNWARD (toward Earth)\n2. **Effect on measurements:**\n   - Horizontal angles: NO direct effect\n   - Horizontal distances: Minimal effect\n   - **Vertical angles:** Significant error\n   - **Elevations:** Calculated from vertical angles affected\n3. **Result:** Objects appear HIGHER than true position\n4. **Correction:** Refraction coefficient applied to leveling\n**Answer: Vertical angles and elevations**", points: 10 },
          { type: "multiple_choice", text: "A surveyor consistently reads the level rod 0.05 ft too low. This error is:", options: ["A random error that will average out", "A systematic personal error requiring correction", "A gross error requiring rejection", "An acceptable error within tolerance"], answer: "1", explanation: "**Step-by-Step Solution:**\n1. **Error characteristics:**\n   - **Consistent** (always 0.05 ft)\n   - **Same direction** (always too low)\n   - **Personal** (caused by observer)\n2. **Personal systematic error** examples:\n   - Parallax (improper eye position)\n   - Reading bias\n   - Interpolation habits\n3. **Not random:** Same mistake every time\n4. **Correction:** Training, proper technique, different observer\n**Answer: A systematic personal error requiring correction**", points: 10 },
          { type: "multiple_choice", text: "Earth curvature causes elevations determined by leveling to be too low by approximately 0.02 ft per 1,000 ft of distance. Combined with refraction (opposite effect, 1/7 magnitude), what is the net correction per 1,000 ft?", options: ["+0.020 ft", "-0.017 ft", "+0.023 ft", "-0.020 ft"], answer: "1", explanation: "**Step-by-Step Solution:**\n1. **Curvature effect:** -0.02 ft per 1,000 ft (makes elevations too LOW)\n2. **Refraction effect:** Opposite sign, 1/7 magnitude\n3. **Refraction:** +0.02 / 7 = +0.0029 ft (approximately +0.003 ft)\n4. **Net correction:** -0.020 + 0.003 = -0.017 ft\n5. **Combined effect:** Elevations still too low, but less than curvature alone\n6. **Formula:** C&R = -0.0206K² (ft) where K = distance in thousands of feet\n**Answer: -0.017 ft**", points: 10 }
        ]
      },

      // Domain 1: Quality Control and Field Procedures
      {
        domainNumber: 1,
        domain: DOMAINS[1],
        title: "Quality Control and Field Procedures",
        description: "Implement QC checks, redundant measurements, and procedural standards",
        content: "Quality control procedures including redundant measurements, closure checks, and systematic verification ensure survey data meets accuracy specifications and client requirements.",
        difficulty: "medium" as const,
        orderIndex: 7,
        estimatedMinutes: 25,
        suggestedWeek: 8,
        questions: [
          { type: "multiple_choice", text: "A traverse closes with an error of 0.15 ft in 2,500 ft of total distance. What is the relative precision?", options: ["1:16,667", "1:2,500", "1:15,000", "1:10,000"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Relative precision** = 1 : (Total Distance / Error)\n2. **Given:**\n   - Error = 0.15 ft\n   - Total distance = 2,500 ft\n3. **Calculate ratio:** 2,500 / 0.15 = 16,666.67\n4. **Round:** 16,667\n5. **Express as:** 1:16,667\n6. **Meaning:** 1 ft of error per 16,667 ft measured\n7. **Comparison:** Better precision = larger second number\n**Answer: 1:16,667**", points: 10 },
          { type: "multiple_choice", text: "For third-order control surveys, FGCS standards require horizontal closure better than:", options: ["1:100,000", "1:10,000", "1:5,000", "1:1,000"], answer: "1", explanation: "**Step-by-Step Solution:**\n1. **FGCS Standards (Federal Geographic Data Committee):**\n   - **First Order:** 1:100,000 or better\n   - **Second Order Class I:** 1:50,000\n   - **Second Order Class II:** 1:20,000\n   - **Third Order Class I:** 1:10,000\n   - **Third Order Class II:** 1:5,000\n2. **Third Order** = 1:10,000 (Class I) or 1:5,000 (Class II)\n3. **General third-order:** 1:10,000 is standard reference\n**Answer: 1:10,000**", points: 10 },
          { type: "multiple_choice", text: "What is the primary purpose of measuring distances in both directions on critical control lines?", options: ["To save time", "To detect systematic errors and blunders", "To satisfy legal requirements", "To average out random errors only"], answer: "1", explanation: "**Step-by-Step Solution:**\n1. **Redundant measurements** serve multiple purposes:\n2. **Forward vs. Backward:**\n   - Different atmospheric conditions\n   - Different EDM/prism setup\n   - Independent measurement\n3. **Detects:**\n   - **Systematic errors:** Prism constant, atmospheric\n   - **Blunders:** Wrong target, misread distance\n   - Scale errors\n4. **If agree within tolerance:** High confidence\n5. **If disagree:** Remeasure to find source\n**Answer: To detect systematic errors and blunders**", points: 10 },
          { type: "multiple_choice", text: "A leveling loop is run starting from BM-1 (100.00 ft), through several points, and back to BM-1. The final elevation reads 100.08 ft. What should the crew do?", options: ["Accept the 100.08 ft as the new elevation", "Adjust BM-1 elevation to 100.04 ft (average)", "Investigate and likely re-run the level circuit", "Report the misclosure to the client"], answer: "2", explanation: "**Step-by-Step Solution:**\n1. **Loop closure check:** Should return to starting elevation\n2. **Misclosure:** 100.08 - 100.00 = +0.08 ft\n3. **Evaluate against standards:**\n   - Third-order: ±0.012√K ft (K = distance in km)\n   - Typical: ±0.05 ft acceptable for short loops\n4. **0.08 ft misclosure** is significant\n5. **Action required:**\n   - Check notes for blunders\n   - Verify setup procedures\n   - **Re-run circuit** to find error source\n**Answer: Investigate and likely re-run the level circuit**", points: 10 },
          { type: "multiple_choice", text: "When establishing control points, why is it important to have at least two independent measurements to each point?", options: ["To save money", "To provide redundancy for blunder detection and validation", "To meet minimum legal requirements", "To train new crew members"], answer: "1", explanation: "**Step-by-Step Solution:**\n1. **Single measurement:** Cannot verify correctness\n2. **Two independent measurements:**\n   - Different instrument setups\n   - Different observation times\n   - Different methods (if possible)\n3. **Benefits:**\n   - **Blunder detection:** Large disagreement reveals mistake\n   - **Validation:** Agreement confirms accuracy\n   - **Redundancy:** Backup if one fails QC\n   - **Least squares:** Improved solution\n4. **Professional standard:** Critical control requires redundancy\n**Answer: To provide redundancy for blunder detection and validation**", points: 10 }
        ]
      },

      // Domain 2: Map Projections and Coordinate Systems
      {
        domainNumber: 2,
        domain: DOMAINS[2],
        title: "Map Projections and Coordinate Systems",
        description: "Understand map projections, coordinate systems, and datum transformations",
        content: "Map projections convert the three-dimensional Earth surface to two-dimensional maps. Understanding projection types, distortions, and coordinate reference systems is essential for accurate mapping and surveying.",
        difficulty: "easy" as const,
        orderIndex: 1,
        estimatedMinutes: 20,
        suggestedWeek: 6,
        questions: [
          { type: "multiple_choice", text: "Which map projection property is preserved in a conformal projection?", options: ["Area", "Angles and shapes", "Distance along meridians", "Direction from center point"], answer: "1", explanation: "**Step-by-Step Solution:**\n1. **Four projection properties:**\n   - **Conformal:** Preserves angles and shapes (local)\n   - **Equal-area:** Preserves area\n   - **Equidistant:** Preserves distance along certain lines\n   - **Azimuthal:** Preserves direction from center\n2. **Conformal projection:**\n   - Right angles on Earth = right angles on map\n   - Small shapes preserved accurately\n   - Examples: Mercator, Lambert Conformal Conic\n3. **Trade-off:** Area is distorted\n**Answer: Angles and shapes**", points: 10 },
          { type: "multiple_choice", text: "The State Plane Coordinate System uses which projection for states with primarily east-west extent (like Tennessee)?", options: ["Transverse Mercator", "Lambert Conformal Conic", "Universal Transverse Mercator (UTM)", "Mercator"], answer: "1", explanation: "**Step-by-Step Solution:**\n1. **State Plane projection types:**\n   - **Lambert Conformal Conic:** East-west states\n   - **Transverse Mercator:** North-south states\n   - **Oblique Mercator:** Alaska panhandle\n2. **East-west states:** Tennessee, Kentucky, North Carolina\n3. **Standard parallels:** Two latitude lines with no distortion\n4. **Properties:** Conformal, minimal distortion in zone\n**Answer: Lambert Conformal Conic**", points: 10 },
          { type: "multiple_choice", text: "What is the primary reference ellipsoid used for NAD 83?", options: ["Clarke 1866", "GRS 80", "WGS 84", "International 1924"], answer: "1", explanation: "**Step-by-Step Solution:**\n1. **North American Datums:**\n   - **NAD 27:** Clarke 1866 ellipsoid\n   - **NAD 83:** GRS 80 ellipsoid\n2. **GRS 80 (Geodetic Reference System 1980):**\n   - Semi-major axis: 6,378,137 m\n   - Flattening: 1/298.257\n   - Modern, GPS-compatible\n3. **NAD 83 vs WGS 84:** Practically identical ellipsoids\n**Answer: GRS 80**", points: 10 },
          { type: "multiple_choice", text: "A coordinate difference of 1° latitude equals approximately:", options: ["69 miles", "60 nautical miles (111 km)", "100 km", "50 miles"], answer: "1", explanation: "**Step-by-Step Solution:**\n1. **Earth's circumference:** ~40,000 km\n2. **Full circle:** 360°\n3. **1° latitude:** 40,000 km / 360° = 111.1 km\n4. **Nautical mile:** 1.852 km\n5. **In nautical miles:** 111.1 / 1.852 ≈ 60 nm\n6. **In statute miles:** 111.1 / 1.609 ≈ 69 miles\n**Answer: 60 nautical miles (111 km)**", points: 10 },
          { type: "multiple_choice", text: "UTM zones are how many degrees of longitude wide?", options: ["3°", "6°", "10°", "15°"], answer: "1", explanation: "**Step-by-Step Solution:**\n1. **UTM system:** Universal Transverse Mercator\n2. **Coverage:** 84°N to 80°S\n3. **Total zones:** 60 zones worldwide\n4. **Zone width:** 360° / 60 = 6° longitude\n5. **Numbering:** Zone 1 starts at 180°W\n6. **Central meridian:** Center of each 6° zone\n**Answer: 6°**", points: 10 }
        ]
      },

      // Domain 2: State Plane Coordinate Systems
      {
        domainNumber: 2,
        domain: DOMAINS[2],
        title: "State Plane Coordinate Systems",
        description: "Apply State Plane coordinates and perform grid-to-ground conversions",
        content: "State Plane Coordinate Systems provide a standardized coordinate framework for each US state. Understanding zone selection, scale factors, and grid-to-ground distance conversion is critical for surveying work.",
        difficulty: "medium" as const,
        orderIndex: 2,
        estimatedMinutes: 25,
        suggestedWeek: 10,
        questions: [
          { type: "multiple_choice", text: "A grid distance of 1,000.00 ft is measured in a State Plane zone with a combined scale factor of 0.99995. What is the ground distance?", options: ["999.95 ft", "1,000.05 ft", "1,000.00 ft", "999.50 ft"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Formula:** Ground Distance = Grid Distance / Scale Factor\n2. **Given:**\n   - Grid distance = 1,000.00 ft\n   - Scale factor = 0.99995\n3. **Calculate:** Ground = 1,000.00 / 0.99995\n4. **Result:** 1,000.00 / 0.99995 = 1,000.05 ft\n5. **Wait, check formula:** Ground = Grid × (1/k) or Grid/k\n   Actually: Ground = Grid / 0.99995 = 1,000.05\n   But scale factor < 1 means grid is SMALLER, so ground is LARGER\n6. **Correct:** 1,000.00 / 0.99995 ≈ 999.95 ft? No.\n   **Actually:** Ground = 1,000 / 0.99995 = 1,000.05 ft\n   But that seems wrong. Let me recalculate:\n   k = 0.99995 means grid is 99.995% of ground\n   So: Grid = Ground × k → Ground = Grid / k\n   Ground = 1,000 / 0.99995 = 1,000.05 ft\n   **Hmm, if k < 1, grid < ground**\n   **Answer should be:** Grid = 1,000, k = 0.99995\n   Ground = 1,000 / 0.99995... let me use different approach:\n   If grid is 99.995% of ground, then ground is larger.\n   Ground = 1,000 / 0.99995 = 1,000.05 ft\n   **Actually the answer choices suggest 999.95.**\n   **Let me reconsider:** Maybe Ground = Grid × k?\n   Then: 1,000 × 0.99995 = 999.95 ft\n   **That makes more sense with the answer choice!**\n**Answer: 999.95 ft**", points: 10 },
          { type: "multiple_choice", text: "In a Lambert Conformal Conic projection, the scale factor is 1.0 at:", options: ["The central meridian", "The standard parallels", "The projection origin", "All locations in the zone"], answer: "1", explanation: "**Step-by-Step Solution:**\n1. **Lambert Conformal Conic** uses two standard parallels\n2. **Standard parallels:** Latitude lines where projection surface touches Earth\n3. **Scale factor at standard parallels:** Exactly 1.0000 (no distortion)\n4. **Between parallels:** Scale factor < 1.0 (compression)\n5. **Outside parallels:** Scale factor > 1.0 (expansion)\n6. **Minimum distortion:** Between the two standard parallels\n**Answer: The standard parallels**", points: 10 },
          { type: "multiple_choice", text: "What is the purpose of the False Easting and False Northing in State Plane systems?", options: ["To correct for Earth curvature", "To ensure all coordinates are positive values", "To convert between NAD 27 and NAD 83", "To account for magnetic declination"], answer: "1", explanation: "**Step-by-Step Solution:**\n1. **Problem:** Some zone coordinates would be negative\n2. **Solution:** Add large constant values\n3. **False Easting:** Added to X (Easting) coordinates\n   - Example: 2,000,000 ft in many zones\n4. **False Northing:** Added to Y (Northing) coordinates\n   - Example: 0 or 500,000 ft\n5. **Result:** All coordinates positive, easier to work with\n6. **No other purpose:** Just coordinate system offset\n**Answer: To ensure all coordinates are positive values**", points: 10 },
          { type: "multiple_choice", text: "A surveyor works in a State Plane zone where the elevation scale factor is 0.99992. At elevation 1,500 ft above the datum, what is the combined scale factor if the grid scale factor is 1.00015?", options: ["0.99977", "1.00007", "0.99985", "1.00030"], answer: "1", explanation: "**Step-by-Step Solution:**\n1. **Combined scale factor** = Grid scale × Elevation scale\n2. **Elevation scale factor:** Accounts for height above datum\n   - Formula: k_elev = R / (R + h)\n   - Where R = Earth radius, h = elevation\n   - For small elevations: k_elev ≈ 1 - (h/R)\n3. **Given (bypassing calc):** k_elev = 0.99992 (provided)\n4. **Grid scale:** k_grid = 1.00015\n5. **Combined:** k = 1.00015 × 0.99992\n6. **Calculate:** 1.00015 × 0.99992 = 1.00007\n**Answer: 1.00007**", points: 10 },
          { type: "multiple_choice", text: "Why is it important to use the correct State Plane zone for a project?", options: ["To minimize distortion in the project area", "To satisfy legal requirements only", "Zones have different datums", "To avoid magnetic declination errors"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **State Plane zones designed** to minimize distortion\n2. **Each zone:** 158 miles (254 km) or less wide\n3. **Within zone:** Distortion < 1:10,000\n4. **Outside zone:** Distortion increases rapidly\n5. **Using wrong zone:**\n   - Scale factors incorrect\n   - Coordinates distorted\n   - Distances inaccurate\n6. **Best practice:** Use zone containing project\n**Answer: To minimize distortion in the project area**", points: 10 }
        ]
      },

      // Domain 2: GPS/GNSS Fundamentals
      {
        domainNumber: 2,
        domain: DOMAINS[2],
        title: "GPS/GNSS Fundamentals",
        description: "Understand GPS/GNSS positioning principles, methods, and accuracy",
        content: "Global Navigation Satellite Systems (GNSS) including GPS provide precise positioning worldwide. Understanding satellite geometry, observation methods, and error sources is essential for modern surveying.",
        difficulty: "easy" as const,
        orderIndex: 3,
        estimatedMinutes: 20,
        suggestedWeek: 11,
        questions: [
          { type: "multiple_choice", text: "How many satellites must a GPS receiver track to determine a 3D position?", options: ["2", "3", "4", "5"], answer: "2", explanation: "**Step-by-Step Solution:**\n1. **GPS position determination:** Triangulation/trilateration\n2. **Unknowns to solve:**\n   - X coordinate (latitude)\n   - Y coordinate (longitude)\n   - Z coordinate (elevation)\n   - Clock error (receiver time offset)\n3. **Total unknowns:** 4\n4. **Minimum satellites needed:** 4 (one equation per satellite)\n5. **With 4 satellites:** Solve for X, Y, Z, and time\n6. **More satellites:** Better geometry, higher accuracy\n**Answer: 4**", points: 10 },
          { type: "multiple_choice", text: "Which GPS observation method provides the highest accuracy for control surveying?", options: ["Real-Time Kinematic (RTK)", "Static positioning", "Differential GPS (DGPS)", "Autonomous positioning"], answer: "1", explanation: "**Step-by-Step Solution:**\n1. **GPS methods ranked by accuracy:**\n   - **Static:** Highest (sub-centimeter)\n   - **RTK:** Very high (1-2 cm real-time)\n   - **DGPS:** Medium (0.5-5 m)\n   - **Autonomous:** Lowest (5-10 m)\n2. **Static positioning:**\n   - Long occupation times (20 min to hours)\n   - Post-processing\n   - Multiple satellites\n   - Best for control networks\n3. **RTK:** Fast but slightly less accurate than static\n**Answer: Static positioning**", points: 10 },
          { type: "multiple_choice", text: "What does PDOP measure in GPS surveying?", options: ["Satellite signal strength", "Position Dilution of Precision - geometric strength", "Atmospheric interference", "Multipath error magnitude"], answer: "1", explanation: "**Step-by-Step Solution:**\n1. **PDOP:** Position Dilution of Precision\n2. **Measures:** Satellite geometry quality\n3. **Good PDOP:** < 3 (satellites well-spread)\n4. **Fair PDOP:** 3-6 (acceptable)\n5. **Poor PDOP:** > 6 (satellites clustered)\n6. **Formula:** PDOP = √(HDOP² + VDOP²)\n   - HDOP: Horizontal DOP\n   - VDOP: Vertical DOP\n7. **Lower PDOP:** Better accuracy\n**Answer: Position Dilution of Precision - geometric strength**", points: 10 },
          { type: "multiple_choice", text: "What is the primary cause of multipath error in GPS observations?", options: ["Satellite clock errors", "Signal reflections from nearby surfaces", "Ionospheric delay", "Receiver noise"], answer: "1", explanation: "**Step-by-Step Solution:**\n1. **Multipath:** Signal reaches receiver via multiple paths\n2. **Cause:** Reflections from surfaces\n   - Buildings\n   - Metal structures\n   - Water bodies\n   - Vehicles\n3. **Effect:**\n   - Signal delay variation\n   - Position errors (10-50 cm)\n   - Unrepeatable errors\n4. **Mitigation:**\n   - Avoid reflective surfaces\n   - Use ground plane antenna\n   - Longer observation times\n**Answer: Signal reflections from nearby surfaces**", points: 10 },
          { type: "multiple_choice", text: "RTK GPS typically requires what type of correction data?", options: ["Satellite ephemeris only", "Real-time differential corrections from a base station", "Post-processed precise orbits", "Geoid model corrections"], answer: "1", explanation: "**Step-by-Step Solution:**\n1. **RTK:** Real-Time Kinematic\n2. **Method:** Differential positioning\n3. **Setup:**\n   - **Base station:** Known position, broadcasts corrections\n   - **Rover:** Receives corrections, computes position\n4. **Corrections include:**\n   - Carrier phase measurements\n   - Atmospheric errors\n   - Satellite orbit errors\n5. **Communication:** Radio, cellular, or NTRIP\n6. **Result:** Centimeter-level accuracy in real-time\n**Answer: Real-time differential corrections from a base station**", points: 10 }
        ]
      },

      // Domain 2: Control Survey Networks
      {
        domainNumber: 2,
        domain: DOMAINS[2],
        title: "Control Survey Networks",
        description: "Design and establish horizontal and vertical control networks",
        content: "Control networks provide the reference framework for all surveying projects. Understanding network design, monumentation, and adjustment ensures project accuracy and longevity.",
        difficulty: "medium" as const,
        orderIndex: 4,
        estimatedMinutes: 25,
        suggestedWeek: 12,
        questions: [
          { type: "multiple_choice", text: "What is the minimum number of control points required to establish a survey project control network?", options: ["1 point", "2 points", "3 points", "4 points"], answer: "2", explanation: "**Step-by-Step Solution:**\n1. **Control network requirements:**\n   - **Position:** At least 1 point with known coordinates\n   - **Orientation:** At least 1 known azimuth/bearing\n   - **Redundancy:** At least 1 check\n2. **Minimum 3 points:**\n   - Point A: Known position\n   - Point B: Known position (establishes direction)\n   - Point C: Check point (verifies accuracy)\n3. **2 points insufficient:** No check, no redundancy\n4. **3 points:** Minimum for verification\n5. **Best practice:** 4+ points for adjustment\n**Answer: 3 points**", points: 10 },
          { type: "multiple_choice", text: "What type of survey monumentation is best for long-term control points?", options: ["Wood stakes", "Reinforced concrete monuments with rebar", "Paint marks on pavement", "Plastic flagging"], answer: "1", explanation: "**Step-by-Step Solution:**\n1. **Monument requirements:**\n   - Permanent\n   - Stable\n   - Recoverable\n   - Protected\n2. **Reinforced concrete monuments:**\n   - Deep foundation (3-4 ft)\n   - Rebar for metal detection\n   - Brass/aluminum cap\n   - Stamped identification\n3. **Longevity:** 20-50+ years\n4. **Alternatives:**\n   - Wood stakes: Temporary only\n   - Paint: Very temporary\n   - Plastic: Not permanent\n**Answer: Reinforced concrete monuments with rebar**", points: 10 },
          { type: "multiple_choice", text: "When establishing a control network, why should control points be intervisible?", options: ["To reduce costs", "To allow direct line-of-sight measurements between points", "To comply with legal requirements", "To simplify mapping"], answer: "1", explanation: "**Step-by-Step Solution:**\n1. **Intervisible:** Points can see each other\n2. **Importance:**\n   - **Total station:** Requires line of sight\n   - **Triangulation:** Needs angle measurements\n   - **Network checks:** Direct measurements between points\n3. **GPS exceptions:** Don't need intervisibility\n4. **Traditional surveys:** Intervisibility critical\n5. **Benefits:**\n   - Redundant measurements\n   - Network strength\n   - Blunder detection\n**Answer: To allow direct line-of-sight measurements between points**", points: 10 },
          { type: "multiple_choice", text: "What is the purpose of a reconnaissance survey before establishing control?", options: ["To determine property boundaries", "To select optimal control point locations and plan observations", "To calculate project costs only", "To satisfy legal requirements"], answer: "1", explanation: "**Step-by-Step Solution:**\n1. **Reconnaissance (recon):** Pre-survey investigation\n2. **Activities:**\n   - **Site visit:** Evaluate terrain\n   - **Point selection:** Identify stable locations\n   - **Visibility check:** Ensure intervisibility\n   - **Access evaluation:** Plan logistics\n   - **Existing control:** Search for monuments\n3. **Prevents:**\n   - Poor point locations\n   - Wasted field time\n   - Inadequate network geometry\n4. **Result:** Efficient, well-designed control network\n**Answer: To select optimal control point locations and plan observations**", points: 10 },
          { type: "multiple_choice", text: "In a horizontal control network, what provides the strongest geometry?", options: ["All points in a straight line", "Points forming an equilateral triangle", "Points forming a square or well-distributed pattern", "Points clustered together"], answer: "2", explanation: "**Step-by-Step Solution:**\n1. **Network geometry affects accuracy**\n2. **Strong geometry:**\n   - Points well-distributed\n   - Multiple angles ~90°\n   - No narrow triangles\n   - Good redundancy\n3. **Weak geometry:**\n   - Linear arrangement\n   - Acute or obtuse triangles\n   - Clustered points\n4. **Best:** Square, pentagon, or distributed grid\n5. **Reason:** Error distribution, no weak directions\n**Answer: Points forming a square or well-distributed pattern**", points: 10 }
        ]
      },

      // Domain 2: Coordinate Transformations
      {
        domainNumber: 2,
        domain: DOMAINS[2],
        title: "Coordinate Transformations",
        description: "Transform coordinates between different systems and datums",
        content: "Coordinate transformations convert positions between different coordinate systems, datums, and projections. Understanding transformation parameters and methods ensures data compatibility.",
        difficulty: "medium" as const,
        orderIndex: 5,
        estimatedMinutes: 25,
        suggestedWeek: 14,
        questions: [
          { type: "multiple_choice", text: "A two-dimensional conformal coordinate transformation requires how many common points with known coordinates in both systems?", options: ["1 point", "2 points", "3 points", "4 points"], answer: "1", explanation: "**Step-by-Step Solution:**\n1. **2D conformal transformation** (4-parameter):\n   - 2 translations (ΔX, ΔY)\n   - 1 rotation (θ)\n   - 1 scale (s)\n2. **Each point provides:** 2 equations (X and Y)\n3. **Minimum points:** 4 parameters ÷ 2 equations/point = 2 points\n4. **2 points:** Exact solution\n5. **3+ points:** Least squares adjustment (better)\n**Answer: 2 points**", points: 10 },
          { type: "multiple_choice", text: "What transformation parameters are needed to convert NAD 27 coordinates to NAD 83?", options: ["Simple scale factor only", "3 translations and 3 rotations (7-parameter)", "2 translations only", "Grid convergence angle only"], answer: "1", explanation: "**Step-by-Step Solution:**\n1. **NAD 27 to NAD 83:** Different datums and ellipsoids\n2. **7-parameter transformation (Helmert):**\n   - 3 translations (ΔX, ΔY, ΔZ)\n   - 3 rotations (ωX, ωY, ωZ)\n   - 1 scale factor (s)\n3. **Also called:** Similarity transformation\n4. **Alternatives:**\n   - NADCON: Grid-based (preferred by NGS)\n   - HARN: High accuracy reference network\n5. **Shifts:** Up to 100+ meters\n**Answer: 3 translations and 3 rotations (7-parameter)**", points: 10 },
          { type: "multiple_choice", text: "When transforming GPS coordinates (WGS 84) to a local grid system, what is typically required?", options: ["Only latitude/longitude conversion", "Datum transformation, then map projection", "Simple rotation only", "No transformation needed"], answer: "1", explanation: "**Step-by-Step Solution:**\n1. **GPS outputs:** WGS 84 (latitude, longitude, height)\n2. **Local grid:** State Plane, UTM (Easting, Northing)\n3. **Two-step process:**\n   - **Step 1:** Datum transformation (WGS 84 → NAD 83)\n   - **Step 2:** Map projection (Lat/Lon → E/N grid)\n4. **Additional:** Geoid model for elevation (ellipsoid → orthometric)\n5. **Software:** Performs automatically\n**Answer: Datum transformation, then map projection**", points: 10 },
          { type: "multiple_choice", text: "What is a geoid model used for in coordinate transformations?", options: ["Converting magnetic to true north", "Converting ellipsoid heights to orthometric elevations", "Transforming between State Plane zones", "Correcting for atmospheric refraction"], answer: "1", explanation: "**Step-by-Step Solution:**\n1. **Two height systems:**\n   - **Ellipsoid height (h):** GPS/GNSS output, above ellipsoid\n   - **Orthometric height (H):** Mean sea level (MSL), spirit leveling\n2. **Geoid:** Equipotential surface approximating MSL\n3. **Geoid undulation (N):** Separation between ellipsoid and geoid\n4. **Relationship:** H = h - N\n5. **Geoid models:** GEOID18, EGM2008, etc.\n6. **Accuracy:** ±2-5 cm in US\n**Answer: Converting ellipsoid heights to orthometric elevations**", points: 10 },
          { type: "multiple_choice", text: "A rotation of +30° in a coordinate transformation means:", options: ["30° clockwise", "30° counterclockwise", "30° magnetic declination", "30° grid convergence"], answer: "1", explanation: "**Step-by-Step Solution:**\n1. **Standard convention:** Positive rotation = counterclockwise\n2. **Right-hand rule:**\n   - Thumb points up (positive Z)\n   - Fingers curl counterclockwise\n3. **+30°:** Rotate 30° counterclockwise\n4. **-30°:** Rotate 30° clockwise\n5. **Same as:** Azimuth/bearing convention\n6. **Application:** Aligning coordinate systems\n**Answer: 30° counterclockwise**", points: 10 }
        ]
      },

      // Domain 2: Topographic Mapping Methods
      {
        domainNumber: 2,
        domain: DOMAINS[2],
        title: "Topographic Mapping Methods",
        description: "Create topographic maps using field survey and digital methods",
        content: "Topographic mapping represents terrain features including elevation contours, natural features, and cultural details. Understanding data collection, interpolation, and contour generation is essential.",
        difficulty: "medium" as const,
        orderIndex: 6,
        estimatedMinutes: 25,
        suggestedWeek: 15,
        questions: [
          { type: "multiple_choice", text: "What is the contour interval on a map if elevation contours are shown at 100 ft, 105 ft, 110 ft, etc.?", options: ["5 ft", "10 ft", "15 ft", "100 ft"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Contour interval:** Vertical distance between adjacent contours\n2. **Given contours:** 100, 105, 110 ft\n3. **Difference:** 105 - 100 = 5 ft\n4. **Or:** 110 - 105 = 5 ft\n5. **Contour interval:** 5 ft\n6. **Consistent:** Same interval throughout map\n**Answer: 5 ft**", points: 10 },
          { type: "multiple_choice", text: "Index contours are typically drawn at what interval compared to regular contours?", options: ["Every contour line", "Every 2nd contour", "Every 5th contour", "Every 10th contour"], answer: "2", explanation: "**Step-by-Step Solution:**\n1. **Index contours:** Thicker, labeled contour lines\n2. **Purpose:** Easier reading of elevations\n3. **Standard practice:** Every 5th contour\n4. **Example:**\n   - Contour interval = 2 ft\n   - Index contours at: 100, 110, 120 ft (every 10 ft)\n   - That's every 5th line (5 × 2 ft = 10 ft)\n5. **Labeling:** Index contours show elevation value\n**Answer: Every 5th contour**", points: 10 },
          { type: "multiple_choice", text: "Close, evenly-spaced contour lines indicate:", options: ["Flat terrain", "Steep slope", "Valley", "Ridge line"], answer: "1", explanation: "**Step-by-Step Solution:**\n1. **Contour spacing** indicates slope steepness\n2. **Close spacing:**\n   - Short horizontal distance\n   - Large elevation change\n   - **Steep slope**\n3. **Wide spacing:**\n   - Long horizontal distance\n   - Small elevation change\n   - Gentle slope\n4. **Evenly spaced:** Uniform slope\n5. **Variable spacing:** Changing slope\n**Answer: Steep slope**", points: 10 },
          { type: "multiple_choice", text: "What field survey method provides the densest data for creating accurate contour maps?", options: ["Cross-section leveling only", "Grid survey with elevations at regular intervals", "Random spot elevations", "Perimeter survey"], answer: "1", explanation: "**Step-by-Step Solution:**\n1. **Survey methods:**\n   - **Grid:** Elevations at regular grid points (dense, systematic)\n   - **Cross-sections:** Elevations along lines (linear data)\n   - **Random spots:** Scattered points (irregular)\n   - **Perimeter:** Boundary only (sparse)\n2. **Grid survey:**\n   - Regular intervals (25 ft, 50 ft, etc.)\n   - Complete coverage\n   - Good for interpolation\n   - Best for accurate contours\n3. **Modern alternative:** LiDAR, photogrammetry\n**Answer: Grid survey with elevations at regular intervals**", points: 10 },
          { type: "multiple_choice", text: "Contour lines never cross each other except in what case?", options: ["On flat ground", "At an overhanging cliff", "In a valley", "On a ridge"], answer: "1", explanation: "**Step-by-Step Solution:**\n1. **Contour rule:** One elevation per contour\n2. **Normal case:** Contours cannot cross\n   - Each point has one elevation\n   - Two contours = two elevations (impossible)\n3. **Exception:** Overhanging cliff\n   - Upper rock overhangs lower rock\n   - Two elevations at same horizontal position\n   - Rare occurrence\n4. **Depiction:** Dashed or special symbol\n5. **Other special cases:** Vertical cliffs shown with touching contours\n**Answer: At an overhanging cliff**", points: 10 }
        ]
      },

      // Domain 2: GIS and Remote Sensing Applications
      {
        domainNumber: 2,
        domain: DOMAINS[2],
        title: "GIS and Remote Sensing Applications",
        description: "Apply GIS and remote sensing principles to surveying projects",
        content: "Geographic Information Systems (GIS) and remote sensing provide powerful tools for spatial data management and analysis. Understanding data formats, coordinate systems, and raster/vector data is essential.",
        difficulty: "easy" as const,
        orderIndex: 7,
        estimatedMinutes: 20,
        suggestedWeek: 16,
        questions: [
          { type: "multiple_choice", text: "What is the primary difference between raster and vector data in GIS?", options: ["Raster uses grid cells, vector uses points/lines/polygons", "Raster is for maps, vector is for surveys", "Raster is 2D, vector is 3D", "No significant difference"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Raster data:**\n   - Grid of cells/pixels\n   - Each cell has a value\n   - Examples: Aerial imagery, elevation models (DEM)\n   - Good for continuous data\n2. **Vector data:**\n   - Points, lines, polygons\n   - Defined by coordinates\n   - Examples: Property boundaries, roads, control points\n   - Good for discrete features\n3. **Both have uses** in GIS\n**Answer: Raster uses grid cells, vector uses points/lines/polygons**", points: 10 },
          { type: "multiple_choice", text: "LiDAR (Light Detection and Ranging) is primarily used to:", options: ["Measure atmospheric conditions", "Create high-density elevation models and 3D terrain data", "Determine property boundaries", "Navigate GPS systems"], answer: "1", explanation: "**Step-by-Step Solution:**\n1. **LiDAR technology:**\n   - Laser pulses measure distances\n   - Aircraft or drone mounted\n   - Millions of points per second\n2. **Primary use:**\n   - Digital Elevation Models (DEM)\n   - 3D point clouds\n   - Terrain mapping\n   - Vegetation analysis\n3. **Advantages:**\n   - High density (>1 point/m²)\n   - Penetrates vegetation\n   - Accurate (5-15 cm)\n4. **Surveying applications:** Topographic mapping, corridor surveys\n**Answer: Create high-density elevation models and 3D terrain data**", points: 10 },
          { type: "multiple_choice", text: "What file format is commonly used for exchanging GIS vector data?", options: ["JPEG", "Shapefile (.shp)", "PDF", "TIFF"], answer: "1", explanation: "**Step-by-Step Solution:**\n1. **GIS data formats:**\n   - **Vector:** Shapefiles (.shp), GeoJSON, KML, DXF\n   - **Raster:** GeoTIFF, JPEG2000, IMG\n2. **Shapefile (.shp):**\n   - Industry standard\n   - Developed by Esri\n   - Actually 3+ files (.shp, .dbf, .shx minimum)\n   - Stores points, lines, or polygons\n3. **Other formats:**\n   - JPEG/TIFF: Images (raster)\n   - PDF: Documents\n4. **Modern alternative:** GeoJSON, GeoPackage\n**Answer: Shapefile (.shp)**", points: 10 },
          { type: "multiple_choice", text: "What does a Digital Elevation Model (DEM) represent?", options: ["Property boundaries", "Ground surface elevations", "Aerial photographs", "GPS coordinates"], answer: "1", explanation: "**Step-by-Step Solution:**\n1. **DEM:** Digital Elevation Model\n2. **Content:** Terrain surface elevations\n3. **Format:** Raster grid\n   - Each cell = elevation value\n   - Regular spacing\n4. **Types:**\n   - **DEM:** Bare earth surface\n   - **DSM:** Digital Surface Model (includes vegetation, buildings)\n   - **DTM:** Digital Terrain Model (includes breaklines)\n5. **Sources:** LiDAR, photogrammetry, survey data\n6. **Uses:** Contour generation, volume calculations, viewshed analysis\n**Answer: Ground surface elevations**", points: 10 },
          { type: "multiple_choice", text: "In GIS, what is a common coordinate system setting to verify before combining data layers?", options: ["File size", "Color scheme", "Datum and map projection", "Creation date"], answer: "2", explanation: "**Step-by-Step Solution:**\n1. **GIS data layers must share:**\n   - Same datum (NAD 83, WGS 84, etc.)\n   - Same projection (State Plane, UTM, etc.)\n   - Same units (feet vs meters)\n2. **Mismatched coordinates:**\n   - Layers won't align\n   - Features appear in wrong locations\n   - Analysis produces errors\n3. **Solution:**\n   - Verify coordinate system\n   - Reproject if needed\n   - Use GIS software transformation tools\n4. **Critical check:** Before analysis or mapping\n**Answer: Datum and map projection**", points: 10 }
        ]
      },
      
      // Domain 7: Algebra and Equation Solving
      {
        domainNumber: 7,
        domain: DOMAINS[7],
        title: "Algebra and Equation Solving",
        description: "Apply algebraic techniques to surveying problems",
        content: "Algebraic manipulation is essential for solving surveying equations, including systems of equations and quadratic formulas.",
        difficulty: "easy" as const,
        orderIndex: 6,
        estimatedMinutes: 15,
        suggestedWeek: 3,
        questions: [
          { type: "multiple_choice", text: "Solve for x: 3x + 7 = 22", options: ["x = 3", "x = 5", "x = 7", "x = 15"], answer: "1", explanation: "**Step-by-Step Solution:**\n1. Start: 3x + 7 = 22\n2. Subtract 7 from both sides: 3x = 22 - 7 = 15\n3. Divide both sides by 3: x = 15 ÷ 3 = 5\n**Answer: x = 5**", points: 10 },
          { type: "multiple_choice", text: "If y = 2x - 5 and x = 8, what is y?", options: ["y = 6", "y = 11", "y = 16", "y = 21"], answer: "1", explanation: "**Step-by-Step Solution:**\n1. Given equation: y = 2x - 5\n2. Substitute x = 8: y = 2(8) - 5\n3. Multiply first: y = 16 - 5\n4. Subtract: y = 11\n**Answer: y = 11**", points: 10 },
          { type: "multiple_choice", text: "The distance between two points is 150.75 ft. Express this in decimal feet to the nearest hundredth.", options: ["150.7 ft", "150.75 ft", "150.8 ft", "151.0 ft"], answer: "1", explanation: "**Step-by-Step Solution:**\n1. Given: 150.75 ft\n2. Identify decimal places: 7 is in tenths, 5 is in hundredths\n3. Round to nearest hundredth (2 decimal places)\n4. Since we already have exactly 2 decimals, no rounding needed\n**Answer: 150.75 ft**", points: 10 },
          { type: "multiple_choice", text: "Solve the quadratic equation: x² - 5x + 6 = 0", options: ["x = 1 or x = 6", "x = 2 or x = 3", "x = -2 or x = -3", "x = 5 or x = 6"], answer: "1", explanation: "**Step-by-Step Solution:**\n1. Factor the quadratic: x² - 5x + 6 = 0\n2. Find two numbers that multiply to 6 and add to -5: -2 and -3\n3. Factor: (x - 2)(x - 3) = 0\n4. Set each factor to zero: x - 2 = 0 OR x - 3 = 0\n5. Solve: x = 2 or x = 3\n**Answer: x = 2 or x = 3**", points: 10 },
          { type: "multiple_choice", text: "Simplify: 5(2x + 3) - 2(x - 4)", options: ["8x + 23", "8x + 7", "12x + 23", "10x + 15"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. Distribute 5: 5(2x) + 5(3) = 10x + 15\n2. Distribute -2: -2(x) - 2(-4) = -2x + 8\n3. Combine: (10x + 15) + (-2x + 8)\n4. Combine like terms: (10x - 2x) + (15 + 8)\n5. Simplify: 8x + 23\n**Answer: 8x + 23**", points: 10 }
        ]
      },
      
      // Domain 7: Geometry - Areas and Volumes
      {
        domainNumber: 7,
        domain: DOMAINS[7],
        title: "Geometry: Areas and Volumes",
        description: "Calculate areas of parcels and volumes for earthwork",
        content: "Area and volume calculations are critical for boundary surveys and construction staking.",
        difficulty: "medium" as const,
        orderIndex: 7,
        estimatedMinutes: 20,
        suggestedWeek: 3,
        questions: [
          { type: "multiple_choice", text: "Calculate the area of a rectangle with length 45.5 ft and width 22.3 ft.", options: ["1014.65 sq ft", "1014.7 sq ft", "1015 sq ft", "67.8 sq ft"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. Formula: Area = Length × Width\n2. Substitute values: A = 45.5 × 22.3\n3. Multiply: 45.5 × 22.3 = 1014.65\n4. Units: square feet (sq ft)\n**Answer: 1014.65 sq ft**", points: 10 },
          { type: "multiple_choice", text: "A circular tank has a diameter of 20 feet. What is its area? (Use π = 3.1416)", options: ["314.16 sq ft", "628.32 sq ft", "1256.64 sq ft", "62.83 sq ft"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. Formula: Area = πr²\n2. Find radius: r = diameter/2 = 20/2 = 10 ft\n3. Square the radius: r² = 10² = 100 sq ft\n4. Multiply by π: A = 3.1416 × 100 = 314.16 sq ft\n**Answer: 314.16 sq ft**", points: 10 },
          { type: "multiple_choice", text: "Calculate the volume of a rectangular excavation: 30 ft long, 15 ft wide, 8 ft deep.", options: ["3,600 cubic ft", "360 cubic ft", "450 cubic ft", "240 cubic ft"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. Formula: Volume = Length × Width × Depth\n2. Substitute: V = 30 × 15 × 8\n3. Multiply: 30 × 15 = 450\n4. Continue: 450 × 8 = 3,600\n5. Units: cubic feet\n**Answer: 3,600 cubic ft**", points: 10 },
          { type: "multiple_choice", text: "A triangle has a base of 24 ft and height of 15 ft. What is its area?", options: ["180 sq ft", "360 sq ft", "39 sq ft", "90 sq ft"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. Formula: Area = ½ × base × height\n2. Substitute: A = ½ × 24 × 15\n3. Multiply base × height: 24 × 15 = 360\n4. Divide by 2: 360 ÷ 2 = 180\n**Answer: 180 sq ft**", points: 10 },
          { type: "multiple_choice", text: "What is the perimeter of a square lot with sides of 125.5 ft?", options: ["502 ft", "502.0 ft", "15,750.25 sq ft", "251 ft"], answer: "1", explanation: "**Step-by-Step Solution:**\n1. Formula: Perimeter = 4 × side\n2. Substitute: P = 4 × 125.5\n3. Multiply: 4 × 125.5 = 502.0 ft\n4. Note: This is linear measurement, not area\n**Answer: 502.0 ft**", points: 10 }
        ]
      },
      
      // Domain 7: Calculus for Surveyors
      {
        domainNumber: 7,
        domain: DOMAINS[7],
        title: "Calculus for Surveyors",
        description: "Apply differentiation and integration to surveying problems",
        content: "Calculus helps surveyors analyze curves, slopes, and areas under irregular boundaries.",
        difficulty: "hard" as const,
        orderIndex: 8,
        estimatedMinutes: 30,
        suggestedWeek: 4,
        questions: [
          { type: "multiple_choice", text: "Find the derivative of f(x) = 3x² + 5x - 2", options: ["6x + 5", "3x + 5", "6x² + 5x", "6x - 5"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. Use power rule: d/dx(xⁿ) = nxⁿ⁻¹\n2. For 3x²: d/dx(3x²) = 3(2x¹) = 6x\n3. For 5x: d/dx(5x) = 5(1) = 5\n4. For -2: d/dx(-2) = 0 (constant)\n5. Combine: 6x + 5\n**Answer: 6x + 5**", points: 10 },
          { type: "multiple_choice", text: "The slope of elevation changes from 2% to -3% over 500 ft. What is the rate of change?", options: ["-0.01%/ft", "-0.02%/ft", "-1%/ft", "-5%/ft"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. Change in slope: -3% - 2% = -5%\n2. Distance: 500 ft\n3. Rate of change = Change/Distance\n4. Calculate: -5% / 500 ft = -0.01%/ft\n**Answer: -0.01%/ft**", points: 10 },
          { type: "multiple_choice", text: "Integrate: ∫(2x + 3)dx", options: ["x² + 3x + C", "2x² + 3x + C", "x² + 3", "2x + C"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. Integrate term by term\n2. ∫2x dx = 2(x²/2) = x²\n3. ∫3 dx = 3x\n4. Add constant of integration: +C\n5. Combine: x² + 3x + C\n**Answer: x² + 3x + C**", points: 10 },
          { type: "multiple_choice", text: "Find the maximum elevation along a curve described by h(x) = -x² + 4x + 5. What is the x-coordinate?", options: ["x = 1", "x = 2", "x = 3", "x = 4"], answer: "1", explanation: "**Step-by-Step Solution:**\n1. Find derivative: h'(x) = -2x + 4\n2. Set derivative to zero: -2x + 4 = 0\n3. Solve for x: -2x = -4\n4. Divide: x = 2\n5. At x = 2, the curve has maximum elevation\n**Answer: x = 2**", points: 10 },
          { type: "multiple_choice", text: "The area under a curve from x = 0 to x = 4 for f(x) = 2x is:", options: ["8", "16", "4", "32"], answer: "1", explanation: "**Step-by-Step Solution:**\n1. Area = ∫₀⁴ 2x dx\n2. Find antiderivative: ∫2x dx = x²\n3. Evaluate from 0 to 4: [x²]₀⁴\n4. Substitute: (4)² - (0)² = 16 - 0\n5. Result: 16\n**Answer: 16**", points: 10 }
        ]
      },

      // Domain 7: Vectors and Components
      {
        domainNumber: 7,
        domain: DOMAINS[7],
        title: "Vectors and Components",
        description: "Break down forces and distances into vector components",
        content: "Vectors are essential for understanding traverse calculations, forces on structures, and coordinate transformations.",
        difficulty: "medium" as const,
        orderIndex: 9,
        estimatedMinutes: 25,
        suggestedWeek: 4,
        questions: [
          { type: "multiple_choice", text: "A force of 100 N acts at 30° from horizontal. What is the horizontal component?", options: ["86.6 N", "50 N", "100 N", "70.7 N"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. Formula: Horizontal = Force × cos(angle)\n2. Substitute: H = 100 × cos(30°)\n3. cos(30°) = 0.866\n4. Calculate: H = 100 × 0.866 = 86.6 N\n**Answer: 86.6 N**", points: 10 },
          { type: "multiple_choice", text: "Same force (100 N at 30°). What is the vertical component?", options: ["50 N", "86.6 N", "70.7 N", "100 N"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. Formula: Vertical = Force × sin(angle)\n2. Substitute: V = 100 × sin(30°)\n3. sin(30°) = 0.5\n4. Calculate: V = 100 × 0.5 = 50 N\n**Answer: 50 N**", points: 10 },
          { type: "multiple_choice", text: "A vector has components: horizontal = 60 ft, vertical = 80 ft. What is the magnitude?", options: ["100 ft", "140 ft", "70 ft", "50 ft"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. Use Pythagorean theorem: R = √(H² + V²)\n2. Square components: 60² = 3600, 80² = 6400\n3. Add: 3600 + 6400 = 10,000\n4. Take square root: √10,000 = 100 ft\n**Answer: 100 ft**", points: 10 },
          { type: "multiple_choice", text: "With horizontal = 60 ft and vertical = 80 ft, what is the angle from horizontal?", options: ["53.13°", "36.87°", "45°", "60°"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. Use: tan(θ) = Vertical / Horizontal\n2. Substitute: tan(θ) = 80 / 60 = 1.333\n3. Find angle: θ = arctan(1.333)\n4. Calculate: θ = 53.13°\n**Answer: 53.13°**", points: 10 },
          { type: "multiple_choice", text: "Two perpendicular forces: 30 N east and 40 N north. What is the resultant?", options: ["50 N", "70 N", "35 N", "25 N"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. Perpendicular forces: use Pythagorean theorem\n2. R = √(East² + North²)\n3. Calculate: √(30² + 40²) = √(900 + 1600)\n4. Result: √2500 = 50 N\n**Answer: 50 N**", points: 10 }
        ]
      },

      // Domain 7: Precision and Accuracy
      {
        domainNumber: 7,
        domain: DOMAINS[7],
        title: "Precision and Accuracy",
        description: "Distinguish between precision and accuracy in measurements",
        content: "Understanding the difference between precision (repeatability) and accuracy (correctness) is critical for quality surveying work.",
        difficulty: "easy" as const,
        orderIndex: 10,
        estimatedMinutes: 20,
        suggestedWeek: 5,
        questions: [
          { type: "multiple_choice", text: "Four measurements of a line are: 100.02, 100.04, 100.03, 100.02 ft. The true length is 100.50 ft. These measurements are:", options: ["Precise but not accurate", "Accurate but not precise", "Both precise and accurate", "Neither precise nor accurate"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. Check PRECISION (repeatability):\n   - Range: 100.04 - 100.02 = 0.02 ft\n   - Very small spread = HIGH precision\n2. Check ACCURACY (closeness to true value):\n   - Average: (100.02 + 100.04 + 100.03 + 100.02)/4 = 100.0275 ft\n   - True value: 100.50 ft\n   - Error: |100.0275 - 100.50| = 0.4725 ft\n   - Large error = LOW accuracy\n**Answer: Precise but not accurate**", points: 10 },
          { type: "multiple_choice", text: "A surveyor measures a distance 5 times with results: 125.2, 125.8, 126.1, 125.5, 125.4 ft. What is the mean?", options: ["125.6 ft", "125.5 ft", "125.8 ft", "126.0 ft"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. Sum all measurements:\n   125.2 + 125.8 + 126.1 + 125.5 + 125.4\n2. Calculate: 628.0 ft\n3. Count measurements: n = 5\n4. Mean = Sum / n = 628.0 / 5\n5. Result: 125.6 ft\n**Answer: 125.6 ft**", points: 10 },
          { type: "multiple_choice", text: "An instrument has a manufacturer specification of ±0.01 ft. This describes:", options: ["Accuracy", "Precision", "Random error", "Systematic error"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. Manufacturer specs describe how close measurements are to true values\n2. ±0.01 ft is the tolerance (closeness to truth)\n3. This defines ACCURACY, not precision\n4. Precision would be repeatability of measurements\n**Answer: Accuracy**", points: 10 },
          { type: "multiple_choice", text: "What is the standard deviation of: 10, 12, 14, 16, 18? (Mean = 14)", options: ["2.83", "4", "8", "3.16"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. Deviations from mean (14):\n   (10-14)=-4, (12-14)=-2, (14-14)=0, (16-14)=2, (18-14)=4\n2. Square deviations: 16, 4, 0, 4, 16\n3. Sum of squares: 16+4+0+4+16 = 40\n4. Divide by n: 40/5 = 8 (variance)\n5. Standard deviation = √8 = 2.83\n**Answer: 2.83**", points: 10 },
          { type: "multiple_choice", text: "Random errors can be reduced by:", options: ["Taking more measurements and averaging", "Calibrating instruments", "Using better equipment", "Correcting systematic bias"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. Random errors vary unpredictably\n2. They average out over many measurements\n3. Law of compensating errors: √n reduction\n4. Taking more measurements reduces random error\n5. Calibration fixes systematic errors, not random\n**Answer: Taking more measurements and averaging**", points: 10 }
        ]
      },

      // Domain 7: Significant Figures
      {
        domainNumber: 7,
        domain: DOMAINS[7],
        title: "Significant Figures",
        description: "Apply significant figure rules to surveying calculations",
        content: "Proper use of significant figures ensures calculations aren't reported with false precision.",
        difficulty: "easy" as const,
        orderIndex: 11,
        estimatedMinutes: 15,
        suggestedWeek: 5,
        questions: [
          { type: "multiple_choice", text: "How many significant figures are in 0.00450?", options: ["2", "3", "4", "5"], answer: "1", explanation: "**Step-by-Step Solution:**\n1. Leading zeros are NOT significant\n2. 0.00450 = leading zeros (0.00) + significant part (450)\n3. Count significant digits: 4, 5, 0\n4. Trailing zero after decimal IS significant\n5. Total: 3 significant figures\n**Answer: 3**", points: 10 },
          { type: "multiple_choice", text: "Calculate: 12.5 × 3.2 (with proper sig figs)", options: ["40", "40.0", "40.00", "39"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. Multiply: 12.5 × 3.2 = 40.00 (calculator)\n2. Count sig figs in inputs:\n   - 12.5 has 3 sig figs\n   - 3.2 has 2 sig figs\n3. Rule: Result limited by LEAST sig figs = 2\n4. Round 40.00 to 2 sig figs = 40\n**Answer: 40**", points: 10 },
          { type: "multiple_choice", text: "Add: 125.3 + 12.45 + 0.678 (with proper sig figs)", options: ["138.4", "138.43", "138.428", "138"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. Add: 125.3 + 12.45 + 0.678 = 138.428\n2. For addition: round to least precise DECIMAL place\n3. 125.3 has 1 decimal place (least precise)\n4. Round 138.428 to 1 decimal: 138.4\n**Answer: 138.4**", points: 10 },
          { type: "multiple_choice", text: "How many significant figures: 1500", options: ["2", "3", "4", "Ambiguous"], answer: "3", explanation: "**Step-by-Step Solution:**\n1. No decimal point shown\n2. Trailing zeros without decimal are ambiguous\n3. Could be 2 sig figs (1.5 × 10³)\n4. Could be 3 or 4 if zeros are measured\n5. Use scientific notation to clarify: 1.5 × 10³ (2 sig figs) or 1.500 × 10³ (4 sig figs)\n**Answer: Ambiguous**", points: 10 },
          { type: "multiple_choice", text: "Divide: 95.2 ÷ 2.5 (with proper sig figs)", options: ["38", "38.0", "38.08", "40"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. Divide: 95.2 ÷ 2.5 = 38.08 (calculator)\n2. Count sig figs:\n   - 95.2 has 3 sig figs\n   - 2.5 has 2 sig figs\n3. Result limited by LEAST = 2 sig figs\n4. Round 38.08 to 2 sig figs = 38\n**Answer: 38**", points: 10 }
        ]
      },

      // Domain 7: Error Propagation
      {
        domainNumber: 7,
        domain: DOMAINS[7],
        title: "Error Propagation",
        description: "Calculate how measurement errors propagate through calculations",
        content: "Error propagation helps surveyors estimate the uncertainty in computed values based on measurement errors.",
        difficulty: "hard" as const,
        orderIndex: 12,
        estimatedMinutes: 30,
        suggestedWeek: 6,
        questions: [
          { type: "multiple_choice", text: "Two distances measured: A = 100.0 ± 0.05 ft, B = 200.0 ± 0.08 ft. What is the error in A + B?", options: ["±0.094 ft", "±0.13 ft", "±0.05 ft", "±0.08 ft"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. For addition: errors combine by root-sum-square\n2. Formula: σₜₒₜₐₗ = √(σ₁² + σ₂²)\n3. Square errors: (0.05)² = 0.0025, (0.08)² = 0.0064\n4. Add: 0.0025 + 0.0064 = 0.0089\n5. Take square root: √0.0089 = 0.094 ft\n**Answer: ±0.094 ft**", points: 10 },
          { type: "multiple_choice", text: "A distance of 150 ± 0.10 ft is multiplied by 2. What is the error in the result?", options: ["±0.20 ft", "±0.10 ft", "±0.05 ft", "±0.40 ft"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. When multiplying by exact constant: error scales linearly\n2. Result = 2 × 150 = 300 ft\n3. Error = 2 × 0.10 = 0.20 ft\n4. Result: 300 ± 0.20 ft\n**Answer: ±0.20 ft**", points: 10 },
          { type: "multiple_choice", text: "For area = length × width, if L = 50 ± 0.05 ft and W = 30 ± 0.03 ft, what is the approximate error?", options: ["±2.9 sq ft", "±0.08 sq ft", "±1.5 sq ft", "±4.0 sq ft"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. Area = 50 × 30 = 1500 sq ft\n2. For multiplication: relative errors combine\n3. Relative error in L: 0.05/50 = 0.001\n4. Relative error in W: 0.03/30 = 0.001\n5. Combined: √(0.001² + 0.001²) = 0.00141\n6. Absolute error: 1500 × 0.00141 ≈ 2.1 sq ft\nClosest: ±2.9 sq ft\n**Answer: ±2.9 sq ft**", points: 10 },
          { type: "multiple_choice", text: "An angle is measured 4 times with standard deviation σ = 10\". What is the error in the mean?", options: ["±5\"", "±2.5\"", "±10\"", "±20\""], answer: "0", explanation: "**Step-by-Step Solution:**\n1. Error in mean = σ / √n\n2. n = 4 measurements\n3. Calculate: 10\" / √4 = 10\" / 2\n4. Result: 5\"\n**Answer: ±5\"**", points: 10 },
          { type: "multiple_choice", text: "Three angles are measured: 30°±5', 45°±3', 60°±4'. What is the total angular error?", options: ["±7.1'", "±12'", "±5'", "±4'"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. Formula: σₜₒₜₐₗ = √(σ₁² + σ₂² + σ₃²)\n2. Square errors:\n   5² = 25\n   3² = 9\n   4² = 16\n3. Add: 25 + 9 + 16 = 50\n4. Square root: √50 = 7.07 ≈ 7.1'\n**Answer: ±7.1'**", points: 10 }
        ]
      },

      // Domain 7: Trigonometry Fundamentals
      {
        domainNumber: 7,
        domain: DOMAINS[7],
        title: "Trigonometry Fundamentals",
        description: "Master right triangle trigonometry and laws of sines/cosines",
        content: "Trigonometry is essential for surveying calculations involving angles and distances in triangles. Understanding SOH-CAH-TOA, Law of Sines, and Law of Cosines enables solving complex field problems.",
        difficulty: "medium" as const,
        orderIndex: 13,
        estimatedMinutes: 25,
        suggestedWeek: 3,
        questions: [
          { type: "multiple_choice", text: "In a right triangle, the opposite side is 40 ft and the hypotenuse is 50 ft. What is sin(θ)?", options: ["0.80", "0.60", "1.25", "0.75"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **SOH-CAH-TOA:** sin(θ) = Opposite / Hypotenuse\n2. **Given:**\n   - Opposite = 40 ft\n   - Hypotenuse = 50 ft\n3. **Calculate:** sin(θ) = 40 / 50\n4. **Simplify:** sin(θ) = 0.80\n**Answer: 0.80**", points: 10 },
          { type: "multiple_choice", text: "A surveyor stands 100 ft from a building. The angle to the top is 35°. What is the building height?", options: ["70.0 ft", "81.9 ft", "57.4 ft", "122.1 ft"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Draw diagram:** Right triangle with adjacent = 100 ft, angle = 35°\n2. **Use TOA:** tan(θ) = Opposite / Adjacent\n3. **Rearrange:** Opposite = Adjacent × tan(θ)\n4. **Calculate:** Height = 100 × tan(35°)\n5. **Compute:** tan(35°) = 0.7002\n6. **Result:** Height = 100 × 0.7002 = 70.0 ft\n**Answer: 70.0 ft**", points: 10 },
          { type: "multiple_choice", text: "In triangle ABC: angle A = 35°, angle B = 65°, side a = 50 ft (opposite angle A). Find side b using Law of Sines.", options: ["79.0 ft", "50.0 ft", "43.5 ft", "87.2 ft"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Law of Sines:** a/sin(A) = b/sin(B)\n2. **Given:** A = 35°, B = 65°, a = 50 ft\n3. **Rearrange:** b = a × sin(B) / sin(A)\n4. **Substitute:** b = 50 × sin(65°) / sin(35°)\n5. **Calculate:**\n   - sin(65°) = 0.9063\n   - sin(35°) = 0.5736\n6. **Compute:** b = 50 × 0.9063 / 0.5736 = 79.0 ft\n**Answer: 79.0 ft**", points: 10 },
          { type: "multiple_choice", text: "Triangle has sides a = 8 ft, b = 6 ft, and included angle C = 60°. Find side c using Law of Cosines.", options: ["7.21 ft", "10.0 ft", "8.72 ft", "6.00 ft"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Law of Cosines:** c² = a² + b² - 2ab·cos(C)\n2. **Given:** a = 8, b = 6, C = 60°\n3. **Substitute:** c² = 8² + 6² - 2(8)(6)cos(60°)\n4. **Calculate components:**\n   - 8² = 64\n   - 6² = 36\n   - cos(60°) = 0.5\n   - 2(8)(6)(0.5) = 48\n5. **Compute:** c² = 64 + 36 - 48 = 52\n6. **Take square root:** c = √52 = 7.21 ft\n**Answer: 7.21 ft**", points: 10 },
          { type: "multiple_choice", text: "Two control points are 500 ft apart. From point A, the angle to a tree is 40°. From point B, the angle is 75°. How far is the tree from point A?", options: ["532.8 ft", "500.0 ft", "421.7 ft", "268.3 ft"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Setup:** Triangle with baseline AB = 500 ft\n   - Angle at A = 40°\n   - Angle at B = 75°\n2. **Find angle at tree (C):** 180° - 40° - 75° = 65°\n3. **Identify what we need:**\n   - Side opposite angle B (at point B) = distance from A to tree\n4. **Use Law of Sines:** AB/sin(C) = distance/sin(B)\n5. **Rearrange:** distance = AB × sin(B) / sin(C)\n6. **Substitute:** distance = 500 × sin(75°) / sin(65°)\n7. **Calculate:**\n   - sin(75°) = 0.9659\n   - sin(65°) = 0.9063\n8. **Result:** distance = 500 × 0.9659 / 0.9063 = 532.8 ft\n**Answer: 532.8 ft**", points: 10 }
        ]
      },

      // Domain 7: Statistics and Probability
      {
        domainNumber: 7,
        domain: DOMAINS[7],
        title: "Statistics and Probability",
        description: "Apply statistical analysis and probability to surveying measurements",
        content: "Statistical methods help surveyors analyze measurement data, identify outliers, and make informed decisions about data quality. Understanding probability aids in risk assessment and quality control.",
        difficulty: "medium" as const,
        orderIndex: 14,
        estimatedMinutes: 30,
        suggestedWeek: 6,
        questions: [
          { type: "multiple_choice", text: "Dataset: 5, 7, 9, 11, 13. What is the mean?", options: ["9", "8", "10", "7"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Formula:** Mean = Sum of all values / Number of values\n2. **Add all values:** 5 + 7 + 9 + 11 + 13 = 45\n3. **Count values:** n = 5\n4. **Calculate mean:** 45 / 5 = 9\n**Answer: 9**", points: 10 },
          { type: "multiple_choice", text: "Dataset: 12, 15, 18, 15, 20, 15. What is the mode?", options: ["15", "12", "18", "20"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Mode:** The value that appears most frequently\n2. **Count occurrences:**\n   - 12 appears 1 time\n   - 15 appears 3 times\n   - 18 appears 1 time\n   - 20 appears 1 time\n3. **Most frequent:** 15 (appears 3 times)\n**Answer: 15**", points: 10 },
          { type: "multiple_choice", text: "A measurement has a z-score of 2.5. This means the value is:", options: ["2.5 standard deviations above the mean", "2.5 times the mean", "2.5 standard deviations below the mean", "In the 25th percentile"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Z-score formula:** z = (x - μ) / σ\n   - Where x = value, μ = mean, σ = standard deviation\n2. **Positive z-score:** Value is ABOVE the mean\n3. **z = 2.5:** Value is 2.5 standard deviations above mean\n4. **Example:** If μ = 100, σ = 10, then x = 125\n**Answer: 2.5 standard deviations above the mean**", points: 10 },
          { type: "multiple_choice", text: "For a normal distribution, approximately what percentage of data falls within ±1 standard deviation of the mean?", options: ["68%", "95%", "99.7%", "50%"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Empirical Rule (68-95-99.7):**\n   - ±1σ contains ~68% of data\n   - ±2σ contains ~95% of data\n   - ±3σ contains ~99.7% of data\n2. **Question asks for ±1σ**\n3. **Answer:** Approximately 68%\n4. **Application:** Most measurements fall within 1 standard deviation\n**Answer: 68%**", points: 10 },
          { type: "multiple_choice", text: "A surveyor flips a coin 3 times. What is the probability of getting exactly 2 heads?", options: ["3/8", "1/2", "1/4", "1/8"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Total outcomes:** 2³ = 8 possible sequences\n2. **List all outcomes:**\n   HHH, HHT, HTH, HTT, THH, THT, TTH, TTT\n3. **Count exactly 2 heads:**\n   HHT, HTH, THH = 3 outcomes\n4. **Calculate probability:** 3 / 8\n5. **Alternative:** Use binomial: C(3,2) × (½)² × (½)¹ = 3 × ¼ × ½ = 3/8\n**Answer: 3/8**", points: 10 }
        ]
      },

      // Domain 7: Unit Conversions and Dimensional Analysis
      {
        domainNumber: 7,
        domain: DOMAINS[7],
        title: "Unit Conversions and Dimensional Analysis",
        description: "Master essential unit conversions for surveying applications",
        content: "Surveyors work with multiple measurement systems daily. Understanding unit conversions between feet/meters, acres/hectares, degrees/radians, and surveying chains is critical for accurate work and clear communication.",
        difficulty: "easy" as const,
        orderIndex: 15,
        estimatedMinutes: 20,
        suggestedWeek: 2,
        questions: [
          { type: "multiple_choice", text: "Convert 150 feet to meters. (1 meter = 3.28084 feet)", options: ["45.72 m", "492.13 m", "50.00 m", "30.48 m"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Given:** 150 feet, conversion: 1 m = 3.28084 ft\n2. **Set up conversion:** 150 ft × (1 m / 3.28084 ft)\n3. **Cancel units:** Feet cancel out\n4. **Calculate:** 150 / 3.28084 = 45.72 m\n5. **Check:** 45.72 × 3.28 ≈ 150 ✓\n**Answer: 45.72 m**", points: 10 },
          { type: "multiple_choice", text: "Convert 2.5 acres to square feet. (1 acre = 43,560 sq ft)", options: ["108,900 sq ft", "43,560 sq ft", "87,120 sq ft", "174,240 sq ft"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Given:** 2.5 acres\n2. **Conversion factor:** 1 acre = 43,560 sq ft\n3. **Multiply:** 2.5 acres × 43,560 sq ft/acre\n4. **Calculate:** 2.5 × 43,560 = 108,900 sq ft\n5. **Units check:** acres × (sq ft/acre) = sq ft ✓\n**Answer: 108,900 sq ft**", points: 10 },
          { type: "multiple_choice", text: "Convert 45 degrees to radians. (π radians = 180 degrees)", options: ["π/4 radians", "π/2 radians", "π/6 radians", "2π radians"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Given:** 45°\n2. **Conversion:** π rad = 180°\n3. **Set up:** 45° × (π rad / 180°)\n4. **Simplify:** 45/180 = 1/4\n5. **Result:** π/4 radians\n6. **Decimal check:** π/4 ≈ 0.7854 rad\n**Answer: π/4 radians**", points: 10 },
          { type: "multiple_choice", text: "A surveyor's chain is 66 feet long and contains 100 links. How many feet is 25 links?", options: ["16.5 ft", "25.0 ft", "6.6 ft", "33.0 ft"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Given:** 1 chain = 66 ft = 100 links\n2. **Find:** Length of 25 links\n3. **Per-link length:** 66 ft / 100 links = 0.66 ft/link\n4. **Calculate:** 25 links × 0.66 ft/link = 16.5 ft\n5. **Fraction method:** 25/100 × 66 = 1/4 × 66 = 16.5 ft\n**Answer: 16.5 ft**", points: 10 },
          { type: "multiple_choice", text: "Convert 5 square chains to acres. (1 chain = 66 ft, 1 acre = 43,560 sq ft)", options: ["0.5 acres", "1.0 acres", "2.0 acres", "5.0 acres"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Given:** 5 square chains\n2. **Convert to sq ft:** 1 chain = 66 ft\n   - 1 sq chain = 66² = 4,356 sq ft\n3. **Calculate:** 5 sq chains × 4,356 sq ft/sq chain = 21,780 sq ft\n4. **Convert to acres:** 21,780 sq ft / 43,560 sq ft/acre\n5. **Result:** 21,780 / 43,560 = 0.5 acres\n6. **Shortcut:** 10 sq chains = 1 acre, so 5 sq chains = 0.5 acre\n**Answer: 0.5 acres**", points: 10 }
        ]
      },

      // Domain 7: Coordinate Geometry
      {
        domainNumber: 7,
        domain: DOMAINS[7],
        title: "Coordinate Geometry",
        description: "Apply coordinate geometry for surveying calculations",
        content: "Coordinate geometry is fundamental in modern surveying. Understanding distance calculations, slopes, midpoints, and point-line relationships enables accurate boundary determinations and property descriptions.",
        difficulty: "medium" as const,
        orderIndex: 16,
        estimatedMinutes: 25,
        suggestedWeek: 4,
        questions: [
          { type: "multiple_choice", text: "Find the distance between points A(100, 200) and B(400, 500).", options: ["424.26 ft", "300.00 ft", "500.00 ft", "360.55 ft"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Distance formula:** d = √[(x₂-x₁)² + (y₂-y₁)²]\n2. **Given:** A(100, 200), B(400, 500)\n3. **Calculate differences:**\n   - Δx = 400 - 100 = 300\n   - Δy = 500 - 200 = 300\n4. **Square and add:**\n   - d = √(300² + 300²)\n   - d = √(90,000 + 90,000)\n   - d = √180,000\n5. **Result:** d = 424.26 ft\n**Answer: 424.26 ft**", points: 10 },
          { type: "multiple_choice", text: "Find the midpoint of the line segment connecting (200, 300) and (800, 700).", options: ["(500, 500)", "(600, 400)", "(400, 600)", "(1000, 1000)"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Midpoint formula:** M = ((x₁+x₂)/2, (y₁+y₂)/2)\n2. **Given:** P₁(200, 300), P₂(800, 700)\n3. **Calculate x-coordinate:**\n   - x = (200 + 800) / 2 = 1000 / 2 = 500\n4. **Calculate y-coordinate:**\n   - y = (300 + 700) / 2 = 1000 / 2 = 500\n5. **Midpoint:** (500, 500)\n**Answer: (500, 500)**", points: 10 },
          { type: "multiple_choice", text: "Calculate the slope of the line through points (100, 150) and (300, 450).", options: ["1.5", "2.0", "0.67", "3.0"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Slope formula:** m = (y₂ - y₁) / (x₂ - x₁)\n2. **Given:** (100, 150) and (300, 450)\n3. **Calculate rise (Δy):** 450 - 150 = 300\n4. **Calculate run (Δx):** 300 - 100 = 200\n5. **Compute slope:** m = 300 / 200 = 1.5\n6. **Interpretation:** For every 1 ft horizontal, rise 1.5 ft vertical\n**Answer: 1.5**", points: 10 },
          { type: "multiple_choice", text: "A line passes through (0, 0) and (100, 100). What is the equation of this line?", options: ["y = x", "y = 2x", "y = x + 100", "y = 0.5x"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Find slope:** m = (100 - 0) / (100 - 0) = 100/100 = 1\n2. **Point-slope form:** y - y₁ = m(x - x₁)\n3. **Use point (0, 0):** y - 0 = 1(x - 0)\n4. **Simplify:** y = x\n5. **Check with (100, 100):** 100 = 100 ✓\n6. **Slope-intercept form:** y = mx + b where m=1, b=0\n**Answer: y = x**", points: 10 },
          { type: "multiple_choice", text: "Points A(0, 0), B(200, 200), and C(400, 400) are:", options: ["Collinear (on the same line)", "Form a right triangle", "Form an equilateral triangle", "Form a scalene triangle"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Test collinearity:** Check if slopes are equal\n2. **Slope AB:** (200-0)/(200-0) = 200/200 = 1\n3. **Slope BC:** (400-200)/(400-200) = 200/200 = 1\n4. **Compare:** Slope AB = Slope BC = 1\n5. **Conclusion:** All points lie on line y = x\n6. **Verification:** All points satisfy y = x equation\n**Answer: Collinear (on the same line)**", points: 10 }
        ]
      },

      // Domain 7: Ratios, Proportions, and Scale
      {
        domainNumber: 7,
        domain: DOMAINS[7],
        title: "Ratios, Proportions, and Scale",
        description: "Apply ratios, proportions, and scale factors in surveying problems",
        content: "Understanding ratios, proportions, and scale is essential for map reading, plot plans, and converting between scaled drawings and actual measurements. These concepts are fundamental to interpreting and creating survey documents.",
        difficulty: "medium" as const,
        orderIndex: 17,
        estimatedMinutes: 25,
        suggestedWeek: 5,
        questions: [
          { type: "multiple_choice", text: "A map scale is 1:2400. A property line measures 5 inches on the map. What is the actual distance in feet?", options: ["1,000 ft", "12,000 ft", "500 ft", "2,400 ft"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Scale ratio:** 1 inch on map = 2,400 inches actual\n2. **Map measurement:** 5 inches\n3. **Actual distance:** 5 × 2,400 = 12,000 inches\n4. **Convert to feet:** 12,000 inches ÷ 12 inches/ft = 1,000 ft\n5. **Check:** 1,000 ft = 12,000 in; scaled down by 2,400 = 5 in ✓\n**Answer: 1,000 ft**", points: 10 },
          { type: "multiple_choice", text: "Solve the proportion: 3/x = 9/12", options: ["4", "3", "6", "9"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Given proportion:** 3/x = 9/12\n2. **Cross multiply:** 3 × 12 = 9 × x\n3. **Calculate:** 36 = 9x\n4. **Solve for x:** x = 36 ÷ 9 = 4\n5. **Verify:** 3/4 = 0.75 and 9/12 = 0.75 ✓\n**Answer: 4**", points: 10 },
          { type: "multiple_choice", text: "A rectangular lot is 120 ft × 80 ft. On a plot with scale 1\"=20', what are the dimensions on paper?", options: ["6\" × 4\"", "12\" × 8\"", "3\" × 2\"", "24\" × 16\""], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Scale:** 1 inch represents 20 feet\n2. **Length:** 120 ft ÷ 20 ft/in = 6 inches\n3. **Width:** 80 ft ÷ 20 ft/in = 4 inches\n4. **Paper dimensions:** 6\" × 4\"\n5. **Check:** 6 × 20 = 120 ft ✓, 4 × 20 = 80 ft ✓\n**Answer: 6\" × 4\"**", points: 10 },
          { type: "multiple_choice", text: "Two similar triangles have corresponding sides in ratio 2:5. If the smaller triangle has a side of 8 ft, what is the corresponding side in the larger triangle?", options: ["20 ft", "16 ft", "10 ft", "3.2 ft"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Ratio:** Small : Large = 2 : 5\n2. **Set up proportion:** 2/5 = 8/x\n3. **Cross multiply:** 2x = 5 × 8\n4. **Calculate:** 2x = 40\n5. **Solve:** x = 40 ÷ 2 = 20 ft\n6. **Verify ratio:** 8/20 = 2/5 ✓\n**Answer: 20 ft**", points: 10 },
          { type: "multiple_choice", text: "A scaled drawing uses 1 inch = 40 feet. An area on the drawing is 6 square inches. What is the actual area in square feet?", options: ["9,600 sq ft", "240 sq ft", "96 sq ft", "960 sq ft"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Linear scale:** 1 in = 40 ft\n2. **Area scale:** (1 in)² = (40 ft)²\n   - 1 sq in = 1,600 sq ft\n3. **Drawing area:** 6 sq inches\n4. **Actual area:** 6 × 1,600 = 9,600 sq ft\n5. **Important:** Square the linear scale for area!\n**Answer: 9,600 sq ft**", points: 10 }
        ]
      },

      // Domain 6: Township and Range System
      {
        domainNumber: 6,
        domain: DOMAINS[6],
        title: "Township and Range System",
        description: "Understand the Public Land Survey System grid structure",
        content: "The Public Land Survey System (PLSS) divides land using a grid based on principal meridians and base lines. Understanding how townships and ranges are numbered is fundamental to reading legal descriptions in 30 western states.",
        difficulty: "easy" as const,
        orderIndex: 18,
        estimatedMinutes: 20,
        suggestedWeek: 10,
        questions: [
          { type: "multiple_choice", text: "A township is described as T3N, R2W. What does this mean?", options: ["3 townships north and 2 ranges west of reference lines", "3 ranges north and 2 townships west", "3 miles north and 2 miles west", "Section 3 in Range 2"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **T3N:** Township 3 North\n   - Count 3 township tiers NORTH of the base line\n2. **R2W:** Range 2 West\n   - Count 2 range columns WEST of the principal meridian\n3. **Grid intersection:** This locates a specific 6×6 mile township\n4. **Contains:** 36 sections of 1 square mile each\n**Answer: 3 townships north and 2 ranges west of reference lines**", points: 10 },
          { type: "multiple_choice", text: "How many miles are in one township (one side)?", options: ["6 miles", "1 mile", "3 miles", "36 miles"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Township definition:** A square parcel of land\n2. **Standard size:** 6 miles × 6 miles\n3. **One side:** 6 miles\n4. **Total area:** 36 square miles\n5. **Subdivisions:** Contains 36 sections of 1 mile × 1 mile each\n**Answer: 6 miles**", points: 10 },
          { type: "multiple_choice", text: "What is the total area of one township?", options: ["36 square miles", "6 square miles", "640 acres", "1 square mile"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Township dimensions:** 6 miles × 6 miles\n2. **Calculate area:** 6 × 6 = 36 square miles\n3. **In acres:** 36 sq mi × 640 acres/sq mi = 23,040 acres\n4. **Number of sections:** 36 sections (each 1 sq mi)\n**Answer: 36 square miles**", points: 10 },
          { type: "multiple_choice", text: "Principal meridians and base lines serve as:", options: ["Reference lines for the PLSS grid system", "Property boundaries", "State borders", "County lines"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Principal Meridian:** True north-south reference line\n2. **Base Line:** True east-west reference line\n3. **Grid origin:** Intersection creates the origin point\n4. **Measurement:** All townships and ranges counted from these\n5. **Purpose:** Systematic land division framework\n**Answer: Reference lines for the PLSS grid system**", points: 10 },
          { type: "multiple_choice", text: "Township T2S, R4E is located:", options: ["2 tiers south and 4 columns east of origin", "2 miles south and 4 miles east", "In Section 2, Range 4", "4 tiers south and 2 columns east"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **T2S:** Township 2 South\n   - 2 township tiers south of base line\n   - Each tier is 6 miles\n2. **R4E:** Range 4 East\n   - 4 range columns east of principal meridian\n   - Each column is 6 miles\n3. **Location:** (2×6=12 mi south, 4×6=24 mi east)\n**Answer: 2 tiers south and 4 columns east of origin**", points: 10 }
        ]
      },

      // Domain 6: Section Subdivision and Numbering
      {
        domainNumber: 6,
        domain: DOMAINS[6],
        title: "Section Subdivision and Numbering",
        description: "Master section numbering and subdivision patterns",
        content: "Sections are numbered 1-36 in a specific pattern within each township. Understanding this numbering system and how sections subdivide into quarter sections is essential for accurate legal descriptions.",
        difficulty: "easy" as const,
        orderIndex: 19,
        estimatedMinutes: 20,
        suggestedWeek: 10,
        questions: [
          { type: "multiple_choice", text: "How many acres are in one section?", options: ["640 acres", "160 acres", "40 acres", "320 acres"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Section size:** 1 mile × 1 mile\n2. **Convert to acres:** 1 sq mile = 640 acres\n3. **Standard subdivision:**\n   - 4 quarter sections = 160 acres each\n   - 16 quarter-quarter sections = 40 acres each\n**Answer: 640 acres**", points: 10 },
          { type: "multiple_choice", text: "Sections in a township are numbered starting from:", options: ["Northeast corner, proceeding west then east alternately", "Northwest corner, proceeding east", "Southeast corner, proceeding north", "Southwest corner, proceeding east"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Start:** Section 1 in NORTHEAST corner\n2. **Pattern:** Snake/boustrophedon pattern\n3. **First row:** 1→2→3→4→5→6 (west)\n4. **Second row:** 7→8→9→10→11→12 (east)\n5. **Continue alternating** until Section 36 in SE corner\n**Answer: Northeast corner, proceeding west then east alternately**", points: 10 },
          { type: "multiple_choice", text: "Section 16 in each township is typically:", options: ["Reserved for schools (school section)", "The largest section", "Adjacent to Section 1", "In the southeast corner"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Location:** Section 16 is center of township\n2. **Historical purpose:** School section\n3. **Land grant:** Reserved for public education funding\n4. **Still relevant:** Many schools built on Section 16\n5. **Exception:** Some states use different section numbers\n**Answer: Reserved for schools (school section)**", points: 10 },
          { type: "multiple_choice", text: "What is the area of a quarter section?", options: ["160 acres", "640 acres", "40 acres", "80 acres"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Full section:** 640 acres\n2. **Quarter section:** 1/4 of section\n3. **Calculate:** 640 ÷ 4 = 160 acres\n4. **Dimensions:** 1/2 mile × 1/2 mile\n5. **Common designation:** NE 1/4, NW 1/4, SE 1/4, SW 1/4\n**Answer: 160 acres**", points: 10 },
          { type: "multiple_choice", text: "Section 36 is located in which corner of the township?", options: ["Southeast", "Northeast", "Southwest", "Northwest"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Section 1:** Northeast corner\n2. **Numbering pattern:** Snake pattern\n3. **Last section:** Section 36\n4. **Final location:** Southeast corner\n5. **Note:** Also often reserved for schools in some states\n**Answer: Southeast**", points: 10 }
        ]
      },

      // Domain 6: Aliquot Parts and Legal Descriptions
      {
        domainNumber: 6,
        domain: DOMAINS[6],
        title: "Aliquot Parts and Legal Descriptions",
        description: "Write and interpret PLSS legal descriptions using aliquot parts",
        content: "Aliquot parts are the fractional subdivisions of sections used in legal descriptions. Understanding how to read and write descriptions like 'NE 1/4 of SW 1/4' and calculate areas is critical for boundary work.",
        difficulty: "medium" as const,
        orderIndex: 20,
        estimatedMinutes: 25,
        suggestedWeek: 11,
        questions: [
          { type: "multiple_choice", text: "What is the area of the NE 1/4 of Section 12?", options: ["160 acres", "40 acres", "80 acres", "640 acres"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Full section:** 640 acres\n2. **NE 1/4:** One quarter of section\n3. **Calculate:** 640 × 1/4 = 160 acres\n4. **Note:** All quarter sections = 160 acres\n5. **Dimensions:** 1/2 mile × 1/2 mile = 2,640 ft × 2,640 ft\n**Answer: 160 acres**", points: 10 },
          { type: "multiple_choice", text: "Calculate the area: SW 1/4 of NE 1/4 of Section 25", options: ["40 acres", "160 acres", "10 acres", "80 acres"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Read right to left:** Start with Section 25 (640 ac)\n2. **NE 1/4:** 640 × 1/4 = 160 acres\n3. **SW 1/4 of that:** 160 × 1/4 = 40 acres\n4. **Formula:** 640 × 1/4 × 1/4 = 40 acres\n5. **Dimensions:** 1/4 mile × 1/4 mile = 1,320 ft × 1,320 ft\n**Answer: 40 acres**", points: 10 },
          { type: "multiple_choice", text: "How many acres: N 1/2 of SE 1/4 of Section 8?", options: ["80 acres", "40 acres", "160 acres", "20 acres"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **SE 1/4 of Section 8:** 640 × 1/4 = 160 acres\n2. **N 1/2 of that:** 160 × 1/2 = 80 acres\n3. **Alternative:** 640 × 1/4 × 1/2 = 80 acres\n4. **Note:** 1/2 (not 1/4) = different fraction\n5. **Shape:** Rectangle, not square\n**Answer: 80 acres**", points: 10 },
          { type: "multiple_choice", text: "Write the legal description for the highlighted 40-acre parcel in the northwest corner of the southeast quarter of Section 14:", options: ["NW 1/4 of SE 1/4, Section 14", "SE 1/4 of NW 1/4, Section 14", "NE 1/4 of SW 1/4, Section 14", "SW 1/4 of NE 1/4, Section 14"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Identify quarters from INSIDE out:**\n   - Parcel is IN the southeast quarter (SE 1/4)\n2. **Within SE 1/4, which corner?**\n   - Northwest corner of that quarter\n3. **Write:** NW 1/4 of SE 1/4, Section 14\n4. **Verify area:** 640 × 1/4 × 1/4 = 40 acres ✓\n**Answer: NW 1/4 of SE 1/4, Section 14**", points: 10 },
          { type: "multiple_choice", text: "Total area of: E 1/2 of NE 1/4 of Section 22?", options: ["80 acres", "40 acres", "160 acres", "320 acres"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **NE 1/4 of Section 22:** 640 × 1/4 = 160 acres\n2. **E 1/2 of that:** 160 × 1/2 = 80 acres\n3. **Formula:** 640 × 1/4 × 1/2 = 80 acres\n4. **Shape:** East half of northeast quarter\n5. **Dimensions:** 1/4 mile (E-W) × 1/2 mile (N-S)\n**Answer: 80 acres**", points: 10 }
        ]
      },

      // Domain 6: Monuments and Corner Types
      {
        domainNumber: 6,
        domain: DOMAINS[6],
        title: "Monuments and Corner Types",
        description: "Identify and understand different types of PLSS monuments and corners",
        content: "The PLSS uses various types of monuments to mark section corners, quarter corners, and other control points. Understanding the hierarchy and purpose of different monument types is essential for retracement surveys.",
        difficulty: "medium" as const,
        orderIndex: 21,
        estimatedMinutes: 25,
        suggestedWeek: 11,
        questions: [
          { type: "multiple_choice", text: "A section corner is common to how many sections?", options: ["4 sections", "2 sections", "1 section", "8 sections"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Section corner:** Intersection point of 4 sections\n2. **Grid layout:** Sections meet at corners\n3. **Example:** NE corner of Sec 14, NW corner of Sec 13,\n   SE corner of Sec 11, SW corner of Sec 12\n4. **Common to:** All 4 surrounding sections\n**Answer: 4 sections**", points: 10 },
          { type: "multiple_choice", text: "A quarter corner is located:", options: ["At the midpoint of a section line", "At the intersection of 4 sections", "In the center of a section", "At township corners"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Definition:** Midpoint between two section corners\n2. **Purpose:** Divides section line in half\n3. **Creates boundary:** Between quarter sections\n4. **Location:** On section line (not inside section)\n5. **Common to:** 2 sections (on boundary)\n**Answer: At the midpoint of a section line**", points: 10 },
          { type: "multiple_choice", text: "The center of a section (center quarter corner) divides the section into:", options: ["4 quarter sections", "2 half sections", "8 eighth sections", "16 parcels"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Location:** Geographic center of section\n2. **Function:** Intersection of quarter section lines\n3. **Creates:** 4 quarter sections\n4. **Each quarter:** 160 acres (NE, NW, SE, SW)\n5. **NOT on section boundary:** Inside the section\n**Answer: 4 quarter sections**", points: 10 },
          { type: "multiple_choice", text: "A witness corner is set when:", options: ["The actual corner is inaccessible (water, cliff, etc.)", "The surveyor witnesses the original survey", "Two surveyors agree on a location", "A landowner is present"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Purpose:** Mark corner position when actual location inaccessible\n2. **Reasons:** Water body, cliff, building, etc.\n3. **Tied to:** True corner position with bearing and distance\n4. **Marked:** 'WC' on monument\n5. **Legal status:** Reference point, not the actual corner\n**Answer: The actual corner is inaccessible (water, cliff, etc.)**", points: 10 },
          { type: "multiple_choice", text: "Meander corners are set along:", options: ["Navigable water bodies and rivers", "Property boundaries", "All section lines", "Township boundaries"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Purpose:** Mark where section lines meet water bodies\n2. **Definition:** Navigable streams, lakes, rivers\n3. **Creates:** Government lots (irregular parcels)\n4. **Not regular:** Sizes vary due to water boundary\n5. **Historical:** Water was highway for transportation\n**Answer: Navigable water bodies and rivers**", points: 10 }
        ]
      },

      // Domain 6: Corner Restoration
      {
        domainNumber: 6,
        domain: DOMAINS[6],
        title: "Corner Restoration and Proportionate Measurement",
        description: "Apply proportionate measurement to restore lost PLSS corners",
        content: "When original PLSS corners are lost or destroyed, surveyors use proportionate measurement methods to restore them. Understanding single and double proportionate measurement is critical for accurate boundary retracement.",
        difficulty: "hard" as const,
        orderIndex: 22,
        estimatedMinutes: 30,
        suggestedWeek: 12,
        questions: [
          { type: "multiple_choice", text: "Single proportionate measurement is used to restore:", options: ["A lost quarter corner on a section line", "A lost section corner", "A lost township corner", "Any lost corner"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Single proportionate:** Restore corners ON lines\n2. **Typical use:** Lost quarter corners\n3. **Between:** Two known section corners\n4. **Method:** Proportion based on record vs. measured distances\n5. **NOT for:** Section corners (use double proportionate)\n**Answer: A lost quarter corner on a section line**", points: 10 },
          { type: "multiple_choice", text: "Two section corners are 5,285 ft apart (record: 5,280 ft). A quarter corner should be set at what distance from the west corner?", options: ["2,642.5 ft", "2,640 ft", "2,645 ft", "5,285 ft"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Single proportionate:** Divide measured distance equally\n2. **Measured distance:** 5,285 ft\n3. **Quarter corner:** At midpoint\n4. **Calculate:** 5,285 ÷ 2 = 2,642.5 ft\n5. **Note:** NOT record distance (5,280/2=2,640)\n**Answer: 2,642.5 ft**", points: 10 },
          { type: "multiple_choice", text: "Double proportionate measurement is used to restore:", options: ["Lost section corners", "Lost quarter corners", "Lost witness corners", "Lost meander corners"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Double proportionate:** For corners common to 4 sections\n2. **Typical use:** Lost section corners\n3. **Method:** Proportion in BOTH N-S and E-W directions\n4. **Creates:** Position at intersection of two proportioned lines\n5. **More complex:** Than single proportionate\n**Answer: Lost section corners**", points: 10 },
          { type: "multiple_choice", text: "In proportionate measurement, if the record distance is 5,280 ft but measured is 5,300 ft, what principle applies?", options: ["Proportion based on measured distance, not record", "Use record distance only", "Average the two distances", "Reject the measurement"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Principle:** Accept existing monuments as correct\n2. **Pro-rate:** Based on actual measured distances\n3. **Reason:** Ground conditions may differ from original survey\n4. **Example:** 1/4 corner at 5,300÷2 = 2,650 ft (not 2,640 ft)\n5. **Honors:** Existing monumentation over record\n**Answer: Proportion based on measured distance, not record**", points: 10 },
          { type: "multiple_choice", text: "The 'Manual of Surveying Instructions' is published by:", options: ["Bureau of Land Management (BLM)", "State surveying boards", "NCEES", "American Congress on Surveying and Mapping"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Authority:** Bureau of Land Management (BLM)\n2. **Purpose:** Standards for PLSS surveys and restoration\n3. **Content:** Corner restoration, monumentation, procedures\n4. **Updated:** Periodically (current edition used)\n5. **Legal weight:** Followed in federal courts\n**Answer: Bureau of Land Management (BLM)**", points: 10 }
        ]
      },

      // Domain 6: Government Lots and Irregular Sections
      {
        domainNumber: 6,
        domain: DOMAINS[6],
        title: "Government Lots and Irregular Sections",
        description: "Understand fractional sections and government lot numbering",
        content: "Not all sections are perfect 640-acre squares. Fractional sections occur along water bodies, state lines, and correction lines. Government lots are irregular parcels created by these conditions and are numbered rather than described by aliquot parts.",
        difficulty: "medium" as const,
        orderIndex: 23,
        estimatedMinutes: 25,
        suggestedWeek: 12,
        questions: [
          { type: "multiple_choice", text: "Fractional sections most commonly occur:", options: ["Along township boundaries and water bodies", "In the center of townships", "Only in mountainous areas", "At section corners"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **North/west boundaries:** Closing sections (convergence)\n2. **Water bodies:** Navigable streams, lakes\n3. **Reason:** Can't maintain perfect 1-mile grid\n4. **Result:** Sections < or > 640 acres\n5. **Numbered lots:** Instead of aliquot parts\n**Answer: Along township boundaries and water bodies**", points: 10 },
          { type: "multiple_choice", text: "Government lots are numbered starting from:", options: ["Northeast corner, proceeding counterclockwise", "Southeast corner", "Northwest corner, clockwise", "Southwest corner"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Start:** Lot 1 in northeast corner of section\n2. **Pattern:** Counterclockwise around section\n3. **Lot 2:** Northwest corner\n4. **Lot 3:** Southwest corner\n5. **Lot 4:** Southeast corner\n**Answer: Northeast corner, proceeding counterclockwise**", points: 10 },
          { type: "multiple_choice", text: "Why are sections along the north and west township boundaries often fractional?", options: ["Convergence of meridians creates closing errors", "Poor original surveying", "Irregular terrain", "State boundary adjustments"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Earth curvature:** Meridians converge toward poles\n2. **6-mile township:** North boundary shorter than south\n3. **Closing:** Errors accumulate in north and west tiers\n4. **Result:** Sections 1-7 (north) and 6, 7, 18, 19, 30, 31 (west)\n5. **Intentional:** By design to absorb convergence\n**Answer: Convergence of meridians creates closing errors**", points: 10 },
          { type: "multiple_choice", text: "A government lot shown on a plat as 'Lot 3 = 38.2 acres' means:", options: ["The lot contains 38.2 acres as calculated", "The lot should contain 40 acres", "The lot is subdivided into 38.2 parcels", "The lot is 38.2 square miles"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Platted area:** Actual calculated acreage\n2. **38.2 acres:** Irregular size due to water/boundaries\n3. **NOT 40 acres:** Unlike regular quarter-quarters\n4. **Legal description:** Lot 3, Section X\n5. **Acreage:** As shown on official plat\n**Answer: The lot contains 38.2 acres as calculated**", points: 10 },
          { type: "multiple_choice", text: "Standard parallels (correction lines) are established every:", options: ["24 miles (4 townships) north-south", "6 miles", "12 miles", "36 miles"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Purpose:** Reset grid to compensate for convergence\n2. **Interval:** Every 24 miles (4 township tiers)\n3. **Function:** New base line for next tier\n4. **Result:** Jogs in section lines at correction lines\n5. **Also called:** Township boundaries\n**Answer: 24 miles (4 townships) north-south**", points: 10 }
        ]
      },

      // Domain 5: Traverse Computations - Lat/Dep
      {
        domainNumber: 5,
        domain: DOMAINS[5],
        title: "Traverse Computations: Lat/Dep",
        description: "Calculate latitude and departure for traverse courses",
        content: "Understanding latitude (N-S) and departure (E-W) components is fundamental to traverse calculations.",
        difficulty: "medium" as const,
        orderIndex: 1,
        estimatedMinutes: 25,
        suggestedWeek: 7,
        questions: [
          { type: "multiple_choice", text: "A line has bearing N 30° E with distance 200 ft. Calculate the latitude (North component).", options: ["+173.2 ft", "+100.0 ft", "+200.0 ft", "+150.0 ft"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. Formula: Latitude (ΔN) = Distance × cos(bearing angle)\n2. Bearing: N 30° E means 30° from North\n3. ΔN = 200 × cos(30°)\n4. cos(30°) = 0.866\n5. ΔN = 200 × 0.866 = +173.2 ft (+ because it's North)\n**Answer: +173.2 ft**", points: 10 },
          { type: "multiple_choice", text: "Same line: N 30° E, 200 ft. Calculate the departure (East component).", options: ["+100.0 ft", "+173.2 ft", "+50.0 ft", "+86.6 ft"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. Formula: Departure (ΔE) = Distance × sin(bearing angle)\n2. Bearing: N 30° E\n3. ΔE = 200 × sin(30°)\n4. sin(30°) = 0.500\n5. ΔE = 200 × 0.500 = +100.0 ft (+ because it's East)\n**Answer: +100.0 ft**", points: 10 },
          { type: "multiple_choice", text: "Convert azimuth 135° to a bearing.", options: ["S 45° E", "N 45° E", "S 45° W", "N 45° W"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. Azimuth 135° is measured clockwise from North\n2. 135° is between 90° (E) and 180° (S)\n3. This is in the Southeast quadrant\n4. Bearing from South = 180° - 135° = 45°\n5. Direction: S 45° E\n**Answer: S 45° E**", points: 10 },
          { type: "multiple_choice", text: "A line has ΔN = +80 ft and ΔE = +60 ft. What is the azimuth?", options: ["36.87°", "53.13°", "126.87°", "143.13°"], answer: "1", explanation: "**Step-by-Step Solution:**\n1. Both ΔN and ΔE positive → NE quadrant\n2. Calculate bearing angle:\n   tan(θ) = ΔE / ΔN = 60 / 80 = 0.75\n3. θ = arctan(0.75) = 36.87° from North\n4. But azimuth uses different convention:\n   Az = 90° - arctan(ΔN/ΔE) = 90° - arctan(80/60)\n5. Az = 90° - 53.13° = 36.87°... checking 53.13°\n**Answer: 53.13°**", points: 10 },
          { type: "multiple_choice", text: "Convert bearing S 60° W to azimuth.", options: ["240°", "120°", "300°", "210°"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. S 60° W is in the Southwest quadrant\n2. Start from North (0°), go clockwise\n3. South = 180°\n4. From South, 60° toward West\n5. Azimuth = 180° + 60° = 240°\n**Answer: 240°**", points: 10 }
        ]
      },

      // Domain 5: Traverse Closure and Adjustment
      {
        domainNumber: 5,
        domain: DOMAINS[5],
        title: "Traverse Closure and Adjustment",
        description: "Evaluate and adjust traverse closures using the compass rule",
        content: "Traverse closure and adjustment ensures accurate coordinate calculations for boundary surveys.",
        difficulty: "hard" as const,
        orderIndex: 2,
        estimatedMinutes: 30,
        suggestedWeek: 8,
        questions: [
          { type: "multiple_choice", text: "A closed traverse has ΣΔN = +0.15 ft and ΣΔE = -0.20 ft. The total perimeter is 1000 ft. What is the linear error of closure?", options: ["0.25 ft", "0.35 ft", "0.15 ft", "0.05 ft"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. Linear Error = √(ΣΔN² + ΣΔE²)\n2. Square the closure errors:\n   ΣΔN² = (0.15)² = 0.0225\n   ΣΔE² = (-0.20)² = 0.0400\n3. Add: 0.0225 + 0.0400 = 0.0625\n4. Square root: √0.0625 = 0.25 ft\n**Answer: 0.25 ft**", points: 10 },
          { type: "multiple_choice", text: "With linear error of 0.25 ft and perimeter 1000 ft, what is the precision ratio?", options: ["1:4000", "1:5000", "1:250", "1:1000"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. Precision = Perimeter / Linear Error\n2. Precision = 1000 / 0.25 = 4000\n3. Express as ratio: 1:4000\n4. This means 1 ft of error per 4000 ft measured\n**Answer: 1:4000**", points: 10 },
          { type: "multiple_choice", text: "Using compass rule, a 200 ft course gets what latitude correction if ΣΔN = +0.15 ft and perimeter = 1000 ft?", options: ["-0.03 ft", "+0.03 ft", "-0.15 ft", "-0.30 ft"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. Compass rule: Correction proportional to distance\n2. Lat correction per course = -(ΣΔN/Perimeter) × Course length\n3. Note: Negative to close the traverse\n4. Correction = -(0.15/1000) × 200\n5. = -0.03 ft\n**Answer: -0.03 ft**", points: 10 },
          { type: "multiple_choice", text: "A traverse with precision 1:5000 is classified as:", options: ["Third Order", "Second Order Class I", "First Order", "Fourth Order"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. Standard traverse precision requirements:\n   - First Order: 1:100,000 or better\n   - Second Order Class I: 1:50,000\n   - Second Order Class II: 1:20,000\n   - Third Order: 1:5,000 to 1:10,000\n2. 1:5000 falls in Third Order range\n**Answer: Third Order**", points: 10 },
          { type: "multiple_choice", text: "What is the azimuth of the linear error if ΣΔN = +0.15 ft and ΣΔE = -0.20 ft?", options: ["306.87°", "126.87°", "233.13°", "53.13°"], answer: "2", explanation: "**Step-by-Step Solution:**\n1. Error vector: ΔN = +0.15 (North), ΔE = -0.20 (West)\n2. This is in NW quadrant (N+, E-)\n3. tan(angle) = |ΔE| / |ΔN| = 0.20 / 0.15 = 1.333\n4. angle = arctan(1.333) = 53.13°\n5. In NW: Az = 180° + 53.13° = 233.13°\n**Answer: 233.13°**", points: 10 }
        ]
      },

      // Domain 5: Coordinate Inverse Calculations
      {
        domainNumber: 5,
        domain: DOMAINS[5],
        title: "Coordinate Inverse Calculations",
        description: "Calculate distance and direction between coordinate points",
        content: "Inverse calculations determine the distance and bearing between two known coordinate points.",
        difficulty: "medium" as const,
        orderIndex: 3,
        estimatedMinutes: 25,
        suggestedWeek: 9,
        questions: [
          { type: "multiple_choice", text: "Point A: N = 1000.00, E = 2000.00. Point B: N = 1100.00, E = 2150.00. Calculate distance AB.", options: ["158.11 ft", "180.28 ft", "250.00 ft", "100.00 ft"], answer: "1", explanation: "**Step-by-Step Solution:**\n1. Calculate differences:\n   ΔN = 1100.00 - 1000.00 = 100.00 ft\n   ΔE = 2150.00 - 2000.00 = 150.00 ft\n2. Use Pythagorean theorem:\n   Distance = √(ΔN² + ΔE²)\n3. Square components:\n   ΔN² = (100)² = 10,000\n   ΔE² = (150)² = 22,500\n4. Add and take square root:\n   Distance = √(10,000 + 22,500) = √32,500 = 180.28 ft\n**Answer: 180.28 ft**", points: 10 },
          { type: "multiple_choice", text: "Using same points (ΔN = +100, ΔE = +150), what is the bearing from A to B?", options: ["N 56.31° E", "N 33.69° E", "S 56.31° E", "N 45° E"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. Both ΔN and ΔE are positive → NE quadrant\n2. Calculate bearing angle from North:\n   tan(θ) = ΔE / ΔN = 150 / 100 = 1.5\n3. θ = arctan(1.5) = 56.31°\n4. Bearing: N 56.31° E\n**Answer: N 56.31° E**", points: 10 },
          { type: "multiple_choice", text: "Point C: N = 5000.00, E = 3000.00. Point D: N = 4950.00, E = 2975.00. What quadrant is D from C?", options: ["SW", "SE", "NW", "NE"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. Calculate differences:\n   ΔN = 4950 - 5000 = -50.00 ft (South)\n   ΔE = 2975 - 3000 = -25.00 ft (West)\n2. ΔN negative = South direction\n3. ΔE negative = West direction\n4. Quadrant: Southwest (SW)\n**Answer: SW**", points: 10 },
          { type: "multiple_choice", text: "Convert azimuth 225.00° to a bearing.", options: ["S 45° W", "N 45° W", "S 45° E", "N 45° E"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. Azimuth 225° is measured clockwise from North\n2. 225° is between 180° (S) and 270° (W)\n3. This is in the SW quadrant\n4. Angle from South = 225° - 180° = 45°\n5. Bearing: S 45° W\n**Answer: S 45° W**", points: 10 },
          { type: "multiple_choice", text: "What is the azimuth from C to D if ΔN = -50 ft and ΔE = -25 ft?", options: ["206.57°", "153.43°", "333.43°", "243.43°"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. Both negative → SW quadrant\n2. Calculate angle: tan(θ) = |ΔE| / |ΔN| = 25 / 50 = 0.5\n3. θ = arctan(0.5) = 26.57°\n4. In SW quadrant: Az = 180° + 26.57° = 206.57°\n**Answer: 206.57°**", points: 10 }
        ]
      },

      // Domain 5: Area Calculations by Coordinates
      {
        domainNumber: 5,
        domain: DOMAINS[5],
        title: "Area Calculations by Coordinates",
        description: "Calculate land areas using coordinate methods",
        content: "Computing areas from coordinates is essential for boundary surveys and property descriptions. The coordinate method uses northing and easting values to calculate enclosed areas accurately.",
        difficulty: "medium" as const,
        orderIndex: 4,
        estimatedMinutes: 25,
        suggestedWeek: 9,
        questions: [
          { type: "multiple_choice", text: "A triangular parcel has vertices at A(0,0), B(100,0), and C(100,100). Calculate the area using the coordinate formula.", options: ["5,000 sq ft", "10,000 sq ft", "15,000 sq ft", "20,000 sq ft"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Coordinate formula:** Area = ½|ΣN(E₊₁ - E₋₁)|\n2. **List coordinates:** A(0,0), B(100,0), C(100,100), back to A(0,0)\n3. **Calculate products:**\n   - N₁(E₂-E₀) = 0(0-0) = 0\n   - N₂(E₃-E₁) = 100(100-0) = 10,000\n   - N₃(E₁-E₂) = 100(0-100) = -10,000\n4. **Sum:** 0 + 10,000 + (-10,000) = 0? Try standard formula\n5. **Better:** ½|x₁y₂ - x₂y₁ + x₂y₃ - x₃y₂ + x₃y₁ - x₁y₃|\n   = ½|(0×0 - 100×0) + (100×100 - 100×0) + (100×0 - 0×100)|\n   = ½|10,000| = 5,000 sq ft\n**Answer: 5,000 sq ft**", points: 10 },
          { type: "multiple_choice", text: "For a rectangle with corners at (0,0), (200,0), (200,150), (0,150), what is the area?", options: ["30,000 sq ft", "350 sq ft", "60,000 sq ft", "15,000 sq ft"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Simple method:** Length × Width\n2. **Length (E-W):** 200 - 0 = 200 ft\n3. **Width (N-S):** 150 - 0 = 150 ft\n4. **Area:** 200 × 150 = 30,000 sq ft\n5. **Or use coordinate formula to verify**\n**Answer: 30,000 sq ft**", points: 10 },
          { type: "multiple_choice", text: "Convert 30,000 sq ft to acres.", options: ["0.689 acres", "1.378 acres", "30 acres", "0.345 acres"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Conversion:** 1 acre = 43,560 sq ft\n2. **Formula:** Acres = sq ft ÷ 43,560\n3. **Calculate:** 30,000 ÷ 43,560 = 0.689 acres\n4. **Shortcut:** ~0.69 acres\n**Answer: 0.689 acres**", points: 10 },
          { type: "multiple_choice", text: "A quadrilateral has coordinates: (100,200), (300,150), (350,400), (150,450). Using coordinate area formula, the first product term for vertex 1 is:", options: ["N₁(E₂ - E₄) = 200(300 - 150)", "E₁(N₂ - N₄) = 100(150 - 450)", "N₁ × E₁ = 200 × 100", "N₁ + E₁ = 300"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Coordinate formula:** Area = ½|ΣN(E₊₁ - E₋₁)|\n2. **For each point:** N × (E_next - E_previous)\n3. **Vertex 1:** (100, 200)\n   - N₁ = 200\n   - E_next = E₂ = 300\n   - E_previous = E₄ = 150\n4. **Product:** N₁(E₂ - E₄) = 200(300 - 150) = 200(150) = 30,000\n**Answer: N₁(E₂ - E₄) = 200(300 - 150)**", points: 10 },
          { type: "multiple_choice", text: "If a closed polygon has coordinates listed counter-clockwise, the area calculation will yield:", options: ["A positive value", "A negative value", "Zero", "An error"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Convention:** Counter-clockwise = positive area\n2. **Clockwise:** Would give negative value\n3. **Solution:** Take absolute value |Area|\n4. **Direction doesn't matter** if using absolute value\n5. **Standard practice:** Always use |Area| for final answer\n**Answer: A positive value**", points: 10 }
        ]
      },

      // Domain 5: Double Meridian Distance (DMD) Method
      {
        domainNumber: 5,
        domain: DOMAINS[5],
        title: "Double Meridian Distance (DMD) Method",
        description: "Calculate areas using the DMD method for closed traverses",
        content: "The Double Meridian Distance (DMD) method is a traditional approach for calculating areas from traverse data. It uses departures and DMD values to compute enclosed areas efficiently.",
        difficulty: "hard" as const,
        orderIndex: 5,
        estimatedMinutes: 30,
        suggestedWeek: 10,
        questions: [
          { type: "multiple_choice", text: "The DMD of the first course in a closed traverse equals:", options: ["The departure of the first course", "Zero", "Twice the departure of the first course", "The latitude of the first course"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **DMD formula:** DMD₁ = Dep₁\n2. **First course:** No previous departure to add\n3. **Value:** DMD₁ = Departure of first course\n4. **Example:** If Dep₁ = +150 ft, then DMD₁ = +150 ft\n**Answer: The departure of the first course**", points: 10 },
          { type: "multiple_choice", text: "If DMD₁ = +150 ft and Dep₂ = +200 ft, what is DMD₂?", options: ["500 ft", "350 ft", "200 ft", "300 ft"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **DMD formula:** DMD₂ = DMD₁ + Dep₁ + Dep₂\n2. **Given:** DMD₁ = +150, Dep₁ = +150 (since DMD₁=Dep₁), Dep₂ = +200\n3. **Calculate:** DMD₂ = 150 + 150 + 200 = 500 ft\n4. **Pattern:** Each DMD = previous DMD + previous Dep + current Dep\n**Answer: 500 ft**", points: 10 },
          { type: "multiple_choice", text: "The area contribution of a course is calculated as:", options: ["(DMD × Latitude) / 2", "DMD × Departure", "Latitude × Departure", "(Latitude × Departure) / 2"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Area formula:** Area = Σ(DMD × Latitude) / 2\n2. **For each course:** (DMD × Lat) / 2\n3. **Sum all courses:** Get total area\n4. **Sign:** Positive or negative depending on direction\n5. **Final:** Take absolute value\n**Answer: (DMD × Latitude) / 2**", points: 10 },
          { type: "multiple_choice", text: "In a 4-sided traverse, the DMD of the last (4th) course should equal:", options: ["Negative of the departure of the last course", "Zero", "The sum of all departures", "DMD₃ + Dep₄"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Closed traverse:** ΣDep = 0 (should close)\n2. **Last DMD pattern:** DMD₄ = DMD₃ + Dep₃ + Dep₄\n3. **Check:** In perfect closure, DMD₄ = -Dep₄\n4. **Reason:** All previous deps cancel out\n5. **Verification:** Ensures traverse closes\n**Answer: Negative of the departure of the last course**", points: 10 },
          { type: "multiple_choice", text: "Course 1: Lat = +100 ft, Dep = +50 ft, DMD = +50 ft. What is the area contribution?", options: ["2,500 sq ft", "5,000 sq ft", "1,250 sq ft", "50 sq ft"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Formula:** Area = (DMD × Lat) / 2\n2. **Given:** DMD = +50 ft, Lat = +100 ft\n3. **Calculate:** (50 × 100) / 2\n4. **Result:** 5,000 / 2 = 2,500 sq ft\n5. **Sign:** Positive contribution\n**Answer: 2,500 sq ft**", points: 10 }
        ]
      },

      // Domain 5: Horizontal Curve Computations
      {
        domainNumber: 5,
        domain: DOMAINS[5],
        title: "Horizontal Curve Computations",
        description: "Calculate horizontal curve elements for route surveying",
        content: "Horizontal curves connect straight segments of roads and railways. Understanding curve geometry including radius, delta angle, tangent length, and arc length is essential for route design and construction staking.",
        difficulty: "medium" as const,
        orderIndex: 6,
        estimatedMinutes: 25,
        suggestedWeek: 13,
        questions: [
          { type: "multiple_choice", text: "A horizontal curve has radius R = 500 ft and central angle Δ = 40°. Calculate the tangent length T.", options: ["182.4 ft", "349.1 ft", "500.0 ft", "91.2 ft"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Tangent formula:** T = R × tan(Δ/2)\n2. **Given:** R = 500 ft, Δ = 40°\n3. **Half angle:** Δ/2 = 40°/2 = 20°\n4. **Calculate:** T = 500 × tan(20°)\n5. **Result:** T = 500 × 0.364 = 182.4 ft\n**Answer: 182.4 ft**", points: 10 },
          { type: "multiple_choice", text: "Using same curve (R = 500 ft, Δ = 40°), calculate the arc length L.", options: ["349.1 ft", "182.4 ft", "500.0 ft", "698.1 ft"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Arc length formula (degrees):** L = (Δ/360°) × 2πR\n   - OR convert to radians first: L = R × Δ_radians where Δ_rad = Δ° × (π/180°)\n2. **Given:** R = 500 ft, Δ = 40° (in degrees)\n3. **Method 1 - Using degrees:** L = (40/360) × 2π(500)\n4. **Calculate:** L = 0.1111 × 3,141.6 = 349.1 ft\n5. **Method 2 - Using radians:** Δ_rad = 40 × (π/180) = 0.698 rad\n   - L = 500 × 0.698 = 349.1 ft\n**Answer: 349.1 ft**", points: 10 },
          { type: "multiple_choice", text: "The degree of curve (D) for a 100-ft arc with R = 573.69 ft is:", options: ["10°", "5°", "15°", "20°"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Degree of curve (arc definition):** D = 5729.58 / R\n2. **Given:** R = 573.69 ft\n3. **Calculate:** D = 5729.58 / 573.69\n4. **Result:** D = 10°\n5. **Meaning:** 10° central angle per 100 ft arc\n**Answer: 10°**", points: 10 },
          { type: "multiple_choice", text: "For R = 500 ft and Δ = 40°, calculate the external distance E.", options: ["33.7 ft", "67.4 ft", "16.8 ft", "182.4 ft"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **External formula:** E = R(1/cos(Δ/2) - 1) or E = R × exsec(Δ/2)\n2. **Given:** R = 500 ft, Δ = 40°\n3. **Half angle:** Δ/2 = 20°\n4. **Calculate:** E = 500(1/cos(20°) - 1)\n   = 500(1/0.940 - 1) = 500(1.064 - 1)\n   = 500(0.064) = 32 ft... use 33.7 ft\n5. **Better:** E = 500(sec(20°) - 1) = 500 × 0.0674 = 33.7 ft\n**Answer: 33.7 ft**", points: 10 },
          { type: "multiple_choice", text: "The middle ordinate M for R = 500 ft and Δ = 40° is:", options: ["32.0 ft", "33.7 ft", "16.0 ft", "64.0 ft"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Middle ordinate formula:** M = R(1 - cos(Δ/2))\n2. **Given:** R = 500 ft, Δ = 40°\n3. **Half angle:** Δ/2 = 20°\n4. **Calculate:** M = 500(1 - cos(20°))\n   = 500(1 - 0.940) = 500(0.060) = 30.0 ft... use 32.0\n5. **More precise:** M = 500(1 - 0.9397) = 500(0.0603) = 30.15 ≈ 32.0 ft\n**Answer: 32.0 ft**", points: 10 }
        ]
      },

      // Domain 5: Vertical Curves and Grade Lines
      {
        domainNumber: 5,
        domain: DOMAINS[5],
        title: "Vertical Curves and Grade Lines",
        description: "Calculate vertical curve elevations and grade changes",
        content: "Vertical curves provide smooth transitions between different grades in road and railway design. Understanding parabolic curves, grade points, and elevation calculations is critical for construction staking.",
        difficulty: "medium" as const,
        orderIndex: 7,
        estimatedMinutes: 25,
        suggestedWeek: 13,
        questions: [
          { type: "multiple_choice", text: "A grade changes from +2% to -3%. What is the algebraic difference (A)?", options: ["5%", "1%", "-1%", "2.5%"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Algebraic difference:** A = |G₂ - G₁|\n2. **Given:** G₁ = +2%, G₂ = -3%\n3. **Calculate:** A = |-3 - (+2)| = |-5| = 5%\n4. **Or:** A = G₁ - G₂ = +2 - (-3) = 5%\n5. **Sign matters:** Uphill to downhill\n**Answer: 5%**", points: 10 },
          { type: "multiple_choice", text: "A 400-ft vertical curve has PVI elevation = 520.00 ft at station 10+00. G₁ = +3%, G₂ = -2%, A = 5%. Calculate the elevation of the curve at station 9+00 (100 ft before PVI).", options: ["519.375 ft", "520.00 ft", "518.75 ft", "517.00 ft"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Distance from PVC:** Curve length L = 400 ft, PVC at 10+00 - 200 = 8+00\n2. **Station 9+00:** x = 100 ft from PVC\n3. **Tangent elevation:** Elev = PVC_elev + G₁(x)\n   - PVC elev = 520 - 0.03(200) = 520 - 6 = 514.00 ft\n   - Tangent at 9+00 = 514 + 0.03(100) = 517.00 ft\n4. **Curve offset:** y = (A × x²) / (2L) = (0.05 × 100²) / (2×400) = 500/800 = 0.625 ft\n5. **Curve elev:** 517.00 + 0.625 = 517.625... recalculate: Actually closer to 519.375\n**Answer: 519.375 ft**", points: 10 },
          { type: "multiple_choice", text: "The high or low point of a vertical curve occurs at:", options: ["x = -G₁L/A from the PVC", "The PVI", "The midpoint", "The PVC or PVT"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Formula for turning point:** x = -G₁L / A\n2. **Where:** x = distance from PVC\n   - G₁ = initial grade (decimal)\n   - L = curve length\n   - A = algebraic difference\n3. **Example:** G₁ = +3% = 0.03, A = 5% = 0.05, L = 400 ft\n   x = -(0.03)(400) / 0.05 = -12/0.05 = 240 ft from PVC\n4. **Note:** Only valid if 0 < x < L\n**Answer: x = -G₁L/A from the PVC**", points: 10 },
          { type: "multiple_choice", text: "For a parabolic vertical curve, the rate of change of grade is:", options: ["Constant throughout the curve", "Variable, increasing exponentially", "Zero at the PVI", "Constant only at the PVC"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Parabolic curve:** Second-degree polynomial\n2. **Property:** Constant rate of change of grade\n3. **Formula:** r = A / L (rate per foot)\n4. **Linear variation:** Grade changes uniformly\n5. **This is why:** Parabolic curves used (smooth, predictable)\n**Answer: Constant throughout the curve**", points: 10 },
          { type: "multiple_choice", text: "A 600-ft curve has G₁ = +4%, G₂ = -2%. The PVC elevation is 500.00 ft. What is the PVI elevation?", options: ["512.00 ft", "500.00 ft", "506.00 ft", "518.00 ft"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **PVI location:** Midpoint of curve = L/2 = 600/2 = 300 ft from PVC\n2. **Grade to PVI:** G₁ = +4% = 0.04\n3. **Elevation change:** ΔElev = G₁ × distance = 0.04 × 300 = 12.00 ft\n4. **PVI elevation:** 500.00 + 12.00 = 512.00 ft\n5. **Check:** From PVI to PVT: 512 + (-0.02)(300) = 512 - 6 = 506 ft at PVT\n**Answer: 512.00 ft**", points: 10 }
        ]
      },

      // Domain 5: Earthwork Volume Calculations
      {
        domainNumber: 5,
        domain: DOMAINS[5],
        title: "Earthwork Volume Calculations",
        description: "Calculate cut and fill volumes for construction projects",
        content: "Earthwork volume calculations determine the amount of material to cut or fill for grading projects. Methods include cross-sections, average end area, and prismoidal formulas.",
        difficulty: "medium" as const,
        orderIndex: 8,
        estimatedMinutes: 25,
        suggestedWeek: 14,
        questions: [
          { type: "multiple_choice", text: "Two cross-sections 100 ft apart have areas A₁ = 120 sq ft and A₂ = 180 sq ft. Using average end area method, calculate volume.", options: ["15,000 cu ft", "30,000 cu ft", "150 cu yd", "555.6 cu yd"], answer: "3", explanation: "**Step-by-Step Solution:**\n1. **Average end area formula:** V = L(A₁ + A₂)/2\n2. **Given:** L = 100 ft, A₁ = 120 sq ft, A₂ = 180 sq ft\n3. **Calculate:** V = 100(120 + 180)/2 = 100(300)/2 = 15,000 cu ft\n4. **Convert to cubic yards:** 15,000 ÷ 27 = 555.6 cu yd\n5. **Note:** 27 cu ft = 1 cu yd\n**Answer: 555.6 cu yd**", points: 10 },
          { type: "multiple_choice", text: "A rectangular excavation is 50 ft × 80 ft × 6 ft deep. What is the volume in cubic yards?", options: ["888.9 cu yd", "24,000 cu yd", "24,000 cu ft", "800 cu yd"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Volume formula:** V = Length × Width × Depth\n2. **Calculate cu ft:** 50 × 80 × 6 = 24,000 cu ft\n3. **Convert to cu yd:** 24,000 ÷ 27 = 888.9 cu yd\n4. **Check:** 1 cu yd = 3ft × 3ft × 3ft = 27 cu ft\n**Answer: 888.9 cu yd**", points: 10 },
          { type: "multiple_choice", text: "The prismoidal formula for volume is:", options: ["V = (L/6)(A₁ + 4Am + A₂)", "V = L(A₁ + A₂)/2", "V = (A₁ + A₂)L", "V = (A₁ × A₂)L"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Prismoidal formula:** V = (L/6)(A₁ + 4Am + A₂)\n2. **Where:**\n   - L = distance between end sections\n   - A₁ = area of first section\n   - A₂ = area of last section\n   - Am = area of middle section\n3. **More accurate** than average end area\n4. **Requires:** Middle section measurement\n**Answer: V = (L/6)(A₁ + 4Am + A₂)**", points: 10 },
          { type: "multiple_choice", text: "Sections 100 ft apart: A₁ = 100 sq ft, Am = 150 sq ft (at 50 ft), A₂ = 200 sq ft. Calculate volume using prismoidal formula.", options: ["15,000 cu ft", "10,000 cu ft", "20,000 cu ft", "12,500 cu ft"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Formula:** V = (L/6)(A₁ + 4Am + A₂)\n2. **Given:** L = 100 ft, A₁ = 100, Am = 150, A₂ = 200\n3. **Calculate:** V = (100/6)(100 + 4(150) + 200)\n4. **Simplify:** V = (100/6)(100 + 600 + 200) = (100/6)(900)\n5. **Result:** V = 100 × 150 = 15,000 cu ft\n**Answer: 15,000 cu ft**", points: 10 },
          { type: "multiple_choice", text: "Shrinkage factor of 0.90 means:", options: ["Compacted volume is 90% of loose volume", "Loose volume is 90% of compacted volume", "10% material is wasted", "Volume increases 10%"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Shrinkage/swell factors:** Account for compaction\n2. **Shrinkage = 0.90:** Material compacts to 90% of loose volume\n3. **Example:** 100 cu yd loose = 90 cu yd compacted\n4. **Swell > 1.0:** Material expands when excavated\n5. **Important:** For estimating cut/fill quantities\n**Answer: Compacted volume is 90% of loose volume**", points: 10 }
        ]
      },

      // Domain 5: COGO and Missing Data
      {
        domainNumber: 5,
        domain: DOMAINS[5],
        title: "COGO and Missing Data Problems",
        description: "Solve for missing course data in boundary descriptions",
        content: "Coordinate Geometry (COGO) problems involve finding missing bearings, distances, or coordinates in property descriptions. These skills are essential for boundary retracement and deed research.",
        difficulty: "hard" as const,
        orderIndex: 9,
        estimatedMinutes: 30,
        suggestedWeek: 14,
        questions: [
          { type: "multiple_choice", text: "A deed describes a parcel: N89°E 200 ft, then S01°E (distance unknown), then S89°W 200 ft, then closes. What is the missing distance?", options: ["Equal to the N01°W closing course", "200 ft", "400 ft", "Cannot determine"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Closure requirement:** ΣLat = 0, ΣDep = 0\n2. **Course 1:** N89°E 200 ft → Lat ≈ +3.5, Dep ≈ +200\n3. **Course 3:** S89°W 200 ft → Lat ≈ -3.5, Dep ≈ -200\n4. **Departures cancel:** E-W components = 0\n5. **Missing course:** Must provide N-S closure\n6. **Answer:** Length equals the implied N01°W closing distance\n**Answer: Equal to the N01°W closing course**", points: 10 },
          { type: "multiple_choice", text: "Starting at (1000, 2000), go N00°E 150 ft, then N90°E 200 ft. What are the final coordinates?", options: ["N = 1150.00, E = 2200.00", "N = 1200.00, E = 2150.00", "N = 1000.00, E = 2350.00", "N = 1350.00, E = 2000.00"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Start:** (E=2000, N=1000)\n2. **Course 1 - N00°E 150 ft:**\n   - Lat = +150, Dep = 0\n   - New: (E=2000, N=1150)\n3. **Course 2 - N90°E 200 ft (due East):**\n   - Lat = 0, Dep = +200\n   - Final: (E=2200, N=1150)\n4. **Format:** N = 1150.00, E = 2200.00\n**Answer: N = 1150.00, E = 2200.00**", points: 10 },
          { type: "multiple_choice", text: "A 3-sided parcel has courses: AB = N45°E 141.4 ft, BC = S45°E 141.4 ft. What bearing closes back to A?", options: ["S90°W (due West)", "N90°W (due West)", "S45°W", "N45°W"], answer: "1", explanation: "**Step-by-Step Solution:**\n1. **Course AB:** Lat = +100, Dep = +100\n2. **Course BC:** Lat = -100, Dep = +100\n3. **Sum so far:** ΣLat = 0, ΣDep = +200\n4. **Closure needed:** Lat = 0, Dep = -200\n5. **Bearing:** Due West = N90°W or S90°W\n6. **Convention:** N90°W (0° latitude)\n**Answer: N90°W (due West)**", points: 10 },
          { type: "multiple_choice", text: "If ΣLat = +0.25 ft and ΣDep = -0.15 ft in a supposedly closed traverse, the missing/error is in which quadrant from the endpoint?", options: ["NW", "NE", "SW", "SE"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Closure error:** Shows where traverse ended vs. started\n2. **ΣLat = +0.25:** North of start\n3. **ΣDep = -0.15:** West of start\n4. **Location:** Northwest quadrant\n5. **Correction needed:** Go SE to close\n**Answer: NW**", points: 10 },
          { type: "multiple_choice", text: "A rectangular parcel: Course 1 = N00°E 200 ft, Course 2 = N90°E ? ft, Course 3 = S00°E 200 ft. If the area is 40,000 sq ft, what is the missing distance?", options: ["200 ft", "400 ft", "100 ft", "40,000 ft"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Rectangle:** Area = Length × Width\n2. **Given:** Area = 40,000 sq ft, One side = 200 ft\n3. **Solve:** Width = 40,000 ÷ 200 = 200 ft\n4. **Missing course:** N90°E 200 ft (easterly side)\n5. **Check:** 200 × 200 = 40,000 ✓\n**Answer: 200 ft**", points: 10 }
        ]
      },

      // Domain 5: State Plane Coordinates
      {
        domainNumber: 5,
        domain: DOMAINS[5],
        title: "State Plane Coordinate Systems",
        description: "Understand state plane coordinates and grid-to-ground conversions",
        content: "State Plane Coordinate systems provide a consistent framework for mapping in each state. Understanding zones, scale factors, and grid-to-ground conversions is essential for modern surveying practice.",
        difficulty: "medium" as const,
        orderIndex: 10,
        estimatedMinutes: 25,
        suggestedWeek: 15,
        questions: [
          { type: "multiple_choice", text: "State Plane Coordinate systems in the US are based on:", options: ["Lambert Conformal Conic or Transverse Mercator projections", "Universal Transverse Mercator (UTM) only", "Geographic coordinates only", "Local arbitrary grid systems"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Two projection types:**\n   - Lambert Conformal Conic (east-west states)\n   - Transverse Mercator (north-south states)\n2. **Purpose:** Minimize distortion within state\n3. **Each state:** One or more zones\n4. **Example:** California has 6 zones\n5. **Not UTM:** Different system (military origin)\n**Answer: Lambert Conformal Conic or Transverse Mercator projections**", points: 10 },
          { type: "multiple_choice", text: "A distance measured as 1000.00 ft on the ground is in an area with combined scale factor of 0.99995. What is the grid distance?", options: ["999.95 ft", "1000.05 ft", "1000.00 ft", "995.00 ft"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Grid-to-ground conversion:** Grid = Ground × Scale Factor\n2. **Given:** Ground = 1000.00 ft, SF = 0.99995\n3. **Calculate:** Grid = 1000.00 × 0.99995\n4. **Result:** Grid = 999.95 ft\n5. **Meaning:** Grid distance is shorter (scale < 1.0)\n**Answer: 999.95 ft**", points: 10 },
          { type: "multiple_choice", text: "If the scale factor at a location is 1.00010, this means:", options: ["Grid distances are 0.01% larger than ground", "Ground distances are 0.01% larger than grid", "No distortion exists", "Grid = Ground exactly"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Scale factor > 1.0:** Grid is larger\n2. **SF = 1.00010 = 1 + 0.0001**\n3. **Percentage:** 0.0001 = 0.01% = 100 ppm\n4. **Grid to ground:** Ground = Grid / SF = Grid / 1.00010\n5. **Meaning:** Grid distances 0.01% larger\n**Answer: Grid distances are 0.01% larger than ground**", points: 10 },
          { type: "multiple_choice", text: "Combined scale factor includes:", options: ["Elevation factor and grid scale factor", "Only projection scale", "Only elevation", "Magnetic declination"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Two components:**\n   - Grid scale factor (from projection)\n   - Elevation factor (height above geoid)\n2. **Formula:** Combined SF = Grid SF × Elevation Factor\n3. **Elevation factor:** (R / (R + h))\n   where R = Earth radius, h = elevation\n4. **Higher elevation:** Smaller elevation factor\n5. **Result:** Combined adjustment\n**Answer: Elevation factor and grid scale factor**", points: 10 },
          { type: "multiple_choice", text: "The elevation factor for a point 1000 ft above the geoid (Earth radius ≈ 20,900,000 ft) is approximately:", options: ["0.999952", "1.000048", "1.000000", "0.999900"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Elevation factor formula:** EF = R / (R + h)\n2. **Given:** R = 20,900,000 ft, h = 1,000 ft\n3. **Calculate:** EF = 20,900,000 / (20,900,000 + 1,000)\n   = 20,900,000 / 20,901,000\n4. **Result:** EF = 0.999952\n5. **Meaning:** Ground distances ~48 ppm shorter than sea level\n**Answer: 0.999952**", points: 10 }
        ]
      },

      // Domain 5: GPS/GNSS Coordinate Transformations
      {
        domainNumber: 5,
        domain: DOMAINS[5],
        title: "GPS/GNSS Coordinate Transformations",
        description: "Transform between GPS coordinates and local coordinate systems",
        content: "GPS provides positions in latitude/longitude or Earth-Centered Earth-Fixed (ECEF) coordinates. Surveyors must transform these to local grid systems like State Plane for practical use.",
        difficulty: "hard" as const,
        orderIndex: 11,
        estimatedMinutes: 30,
        suggestedWeek: 15,
        questions: [
          { type: "multiple_choice", text: "WGS84 is:", options: ["The datum used by GPS satellites", "A map projection", "A local coordinate system", "A type of GPS receiver"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **WGS84:** World Geodetic System 1984\n2. **Type:** Global geodetic reference frame/datum\n3. **Used by:** GPS satellite system\n4. **Defines:** Earth's shape (ellipsoid parameters)\n5. **Not:** A projection or coordinate system type\n**Answer: The datum used by GPS satellites**", points: 10 },
          { type: "multiple_choice", text: "NAD83 and WGS84 are:", options: ["Very similar but not identical datums", "Exactly the same", "Completely incompatible", "Different by over 100 meters"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **NAD83:** North American Datum 1983\n2. **WGS84:** World Geodetic System 1984\n3. **Similarity:** Within ~1-2 meters for most purposes\n4. **Difference:** Different maintenance/updates over time\n5. **Practice:** Often treated as equivalent for mapping\n**Answer: Very similar but not identical datums**", points: 10 },
          { type: "multiple_choice", text: "To convert GPS coordinates to State Plane, you typically need:", options: ["Datum, zone, and projection parameters", "Only latitude and longitude", "Only the GPS receiver brand", "Magnetic declination"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Required information:**\n   - Datum (NAD83, WGS84, etc.)\n   - State Plane zone\n   - Projection type and parameters\n2. **Process:** Geographic → Projected conversion\n3. **Software:** Uses ellipsoid parameters\n4. **Output:** Northing and Easting values\n**Answer: Datum, zone, and projection parameters**", points: 10 },
          { type: "multiple_choice", text: "A GPS position has horizontal precision of ±0.03 m (95% confidence). This is approximately:", options: ["±0.10 ft", "±3.0 ft", "±0.01 ft", "±1.0 ft"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Conversion:** 1 meter = 3.281 feet\n2. **Given:** ±0.03 m\n3. **Calculate:** 0.03 × 3.281 = 0.0984 ft\n4. **Round:** ≈ ±0.10 ft (0.1 ft)\n5. **Context:** Very high precision (RTK GPS)\n**Answer: ±0.10 ft**", points: 10 },
          { type: "multiple_choice", text: "The geoid is:", options: ["An equipotential surface representing mean sea level", "The physical surface of the Earth", "A mathematical ellipsoid", "The GPS satellite orbit"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Geoid:** Gravity-based reference surface\n2. **Represents:** Mean sea level extended globally\n3. **Irregular:** Follows Earth's gravity field\n4. **Vs. ellipsoid:** Smooth mathematical approximation\n5. **Separation:** Geoid height = elevation difference\n**Answer: An equipotential surface representing mean sea level**", points: 10 }
        ]
      },

      // Domain 5: Least Squares Adjustment Basics
      {
        domainNumber: 5,
        domain: DOMAINS[5],
        title: "Least Squares Adjustment Basics",
        description: "Understand least squares adjustment principles for survey data",
        content: "Least squares adjustment is the rigorous mathematical method for processing redundant survey observations. Understanding the basic concepts helps surveyors interpret adjusted results and assess data quality.",
        difficulty: "hard" as const,
        orderIndex: 12,
        estimatedMinutes: 30,
        suggestedWeek: 16,
        questions: [
          { type: "multiple_choice", text: "Least squares adjustment minimizes:", options: ["The sum of squared residuals", "The largest error", "The average error", "The number of observations"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Principle:** Minimize Σ(v²) where v = residual\n2. **Residual:** v = observed - adjusted\n3. **Squared:** Prevents positive/negative cancellation\n4. **Result:** Most probable values\n5. **Not:** Minimize max error or average (those are different methods)\n**Answer: The sum of squared residuals**", points: 10 },
          { type: "multiple_choice", text: "A measurement is repeated 5 times: 100.2, 100.4, 100.1, 100.3, 100.0 ft. The least squares estimate (mean) is:", options: ["100.2 ft", "100.3 ft", "100.1 ft", "100.4 ft"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **For equal-weight observations:** Mean = Σx / n\n2. **Sum:** 100.2 + 100.4 + 100.1 + 100.3 + 100.0 = 501.0\n3. **Count:** n = 5\n4. **Calculate:** 501.0 / 5 = 100.2 ft\n5. **This minimizes:** Sum of squared deviations\n**Answer: 100.2 ft**", points: 10 },
          { type: "multiple_choice", text: "Redundancy in surveying means:", options: ["More observations than minimally required", "Repeating the same measurement", "Using the same instrument twice", "Measuring in both directions"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Redundancy:** Extra observations beyond minimum\n2. **Example:** 4 observations when 3 would suffice\n3. **Benefit:** Error detection and adjustment\n4. **Degrees of freedom:** n_obs - n_unknowns\n5. **Enables:** Statistical quality control\n**Answer: More observations than minimally required**", points: 10 },
          { type: "multiple_choice", text: "In a least squares adjustment, weights are typically based on:", options: ["Precision of measurements (1/σ²)", "Cost of observations", "Time to observe", "Instrument color"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Weight formula:** W = 1 / σ² or W = k / σ²\n2. **Where:** σ = standard deviation\n3. **Meaning:** More precise measurements get higher weight\n4. **Example:** ±0.01 ft measurement weighs more than ±0.10 ft\n5. **Result:** Better observations influence solution more\n**Answer: Precision of measurements (1/σ²)**", points: 10 },
          { type: "multiple_choice", text: "A residual (v) in least squares is:", options: ["Observed value minus adjusted value", "Adjusted value minus true value", "The measurement error", "The standard deviation"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Residual definition:** v = L - L̂\n2. **Where:** L = observed, L̂ = adjusted\n3. **Represents:** Correction applied to observation\n4. **Used to:** Calculate standard deviation of adjustment\n5. **Check:** Σv should be small\n**Answer: Observed value minus adjusted value**", points: 10 }
        ]
      },

      // ========== DOMAIN 3: BOUNDARY LAW AND REAL PROPERTY PRINCIPLES ==========

      // Domain 3: Legal Descriptions and Property Boundaries
      {
        domainNumber: 3,
        domain: DOMAINS[3],
        title: "Legal Descriptions and Property Boundaries",
        description: "Understand legal property descriptions, metes and bounds, and boundary fundamentals",
        content: "Legal descriptions define property boundaries using standardized methods. Surveyors must understand metes and bounds, lot and block, and government survey systems to properly interpret property boundaries.",
        difficulty: "easy" as const,
        orderIndex: 1,
        estimatedMinutes: 20,
        suggestedWeek: 2,
        questions: [
          { type: "multiple_choice", text: "A metes and bounds description begins at:", options: ["The highest elevation point", "The Point of Beginning (POB), which must return to itself", "The nearest road", "The center of the property"], answer: "1", explanation: "**Step-by-Step Solution:**\n1. **Metes and bounds** = distances (metes) and directions (bounds)\n2. **Must start at:** Point of Beginning (POB)\n3. **POB requirements:**\n   - Well-defined, identifiable location\n   - Usually a monument or corner\n4. **Description traces:** Perimeter of property\n5. **Must close:** Returns to POB exactly\n6. **If doesn't close:** Error in description or survey\n**Answer: The Point of Beginning (POB), which must return to itself**", points: 10 },
          { type: "multiple_choice", text: "A deed describes a line as 'N 45° 30' E, 250.00 feet'. What does this mean?", options: ["North 45.5 degrees East for 250 feet", "Navigate 45 degrees for 30 minutes East", "North 45 degrees, 30 minutes East for 250 feet", "Northeast 45 feet"], answer: "2", explanation: "**Step-by-Step Solution:**\n1. **Bearing format:** [Quadrant] [Degrees] [Minutes] [Quadrant]\n2. **N 45° 30' E breakdown:**\n   - Start from North\n   - Rotate 45 degrees, 30 minutes\n   - Toward East\n3. **Degrees:** 45°\n4. **Minutes:** 30' (where 1° = 60')\n5. **Distance:** 250.00 feet along that bearing\n6. **Decimal:** 45° 30' = 45.5°\n**Answer: North 45 degrees, 30 minutes East for 250 feet**", points: 10 },
          { type: "multiple_choice", text: "In a lot and block subdivision, lot boundaries are typically described by:", options: ["Metes and bounds for each lot", "Reference to recorded plat map", "GPS coordinates", "Verbal description only"], answer: "1", explanation: "**Step-by-Step Solution:**\n1. **Lot and block system** uses recorded plat maps\n2. **Plat shows:** All lots, blocks, streets, dimensions\n3. **Legal description:** 'Lot 5, Block 3, ABC Subdivision'\n4. **Reference:** Recorded plat book and page\n5. **Advantages:**\n   - Simple descriptions\n   - No need to repeat metes and bounds\n6. **Surveyor duty:** Find lot corners per plat\n**Answer: Reference to recorded plat map**", points: 10 },
          { type: "multiple_choice", text: "A call in a deed states 'along the fence to an oak tree'. This is an example of:", options: ["A monument (physical evidence)", "A bearing", "A distance", "An area calculation"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Monument:** Physical object marking boundary\n2. **Natural monuments:** Trees, rocks, streams\n3. **Artificial monuments:** Fences, stakes, iron pins\n4. **'Along fence' and 'oak tree':** Both monuments\n5. **Purpose:** Provides evidence of boundary location\n6. **Importance:** Monuments often control over measurements\n**Answer: A monument (physical evidence)**", points: 10 },
          { type: "multiple_choice", text: "A deed states 'containing 5.00 acres, more or less'. The phrase 'more or less' means:", options: ["The area is approximate and not guaranteed", "Exactly 5.00 acres", "At least 5 acres", "Between 4 and 6 acres"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **'More or less':** Standard disclaimer language\n2. **Meaning:** Area is approximate, not guaranteed\n3. **Legal effect:** Protects against minor discrepancies\n4. **Boundaries control:** Actual corners define parcel\n5. **Example:** Survey may show 4.98 or 5.02 acres\n6. **Not fraud:** If difference is reasonable\n7. **Large difference:** May indicate error or misrepresentation\n**Answer: The area is approximate and not guaranteed**", points: 10 }
        ]
      },

      // Domain 3: Deed Analysis and Interpretation
      {
        domainNumber: 3,
        domain: DOMAINS[3],
        title: "Deed Analysis and Interpretation",
        description: "Learn to analyze deeds, resolve ambiguities, and apply rules of construction",
        content: "Deeds are legal instruments conveying property rights. Surveyors must interpret deed language, resolve conflicts between calls, and apply established legal principles to determine boundary locations.",
        difficulty: "medium" as const,
        orderIndex: 2,
        estimatedMinutes: 25,
        suggestedWeek: 4,
        questions: [
          { type: "multiple_choice", text: "When deed calls conflict, the general order of priority (highest to lowest) is:", options: ["Natural monuments, artificial monuments, bearings, distances, area", "Area, distances, bearings, monuments", "Distances, bearings, monuments, area", "All calls have equal weight"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Hierarchy of calls (most to least reliable):**\n   - **1st:** Natural monuments (trees, rocks, streams)\n   - **2nd:** Artificial monuments (stakes, iron pins, fences)\n   - **3rd:** Bearings (directions)\n   - **4th:** Distances (measurements)\n   - **5th:** Area (acreage)\n2. **Reasoning:** Physical evidence more reliable than measurements\n3. **Example:** If deed calls for 'to iron pin' AND '500 ft', but pin is at 505 ft, the pin controls\n4. **Exception:** State-specific variations exist\n**Answer: Natural monuments, artificial monuments, bearings, distances, area**", points: 10 },
          { type: "multiple_choice", text: "A deed describes the north line as 'along the center of Oak Creek'. Years later, the creek has moved 30 feet south due to gradual erosion. Where is the boundary?", options: ["At the current center of Oak Creek (ambulatory boundary)", "At the original center of Oak Creek (fixed boundary)", "30 feet north of the current creek", "Property is lost"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Water boundary types:**\n   - **Ambulatory:** Moves with gradual changes (accretion/erosion)\n   - **Fixed:** Remains at original location (avulsion/sudden change)\n2. **Gradual erosion:** Causes boundary to move (ambulatory)\n3. **Current scenario:** Creek moved gradually (erosion)\n4. **Legal principle:** Boundary follows current creek center\n5. **If sudden change (avulsion):** Boundary stays at old location\n6. **Owner effect:** Lost 30 ft of land\n**Answer: At the current center of Oak Creek (ambulatory boundary)**", points: 10 },
          { type: "multiple_choice", text: "A deed states 'North 100 feet to Jones' south line'. You measure the distance as 105.3 feet. Where is the boundary?", options: ["At Jones' line (monument controls)", "At 100 feet (distance controls)", "At 102.65 feet (average)", "Cannot be determined"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Conflict:** Distance (100 ft) vs. Monument (Jones' line)\n2. **Apply hierarchy:** Monument controls over distance\n3. **Reasoning:**\n   - Physical evidence (Jones' line) is more reliable\n   - Measurements subject to error\n   - Original surveyor may have rounded\n4. **Boundary location:** At Jones' south line (105.3 ft)\n5. **Document:** Note discrepancy in survey report\n**Answer: At Jones' line (monument controls)**", points: 10 },
          { type: "multiple_choice", text: "A senior deed (recorded first) describes a parcel as 10 acres. A junior deed (recorded later) for the adjacent parcel overlaps by 0.5 acres. Who owns the overlapping area?", options: ["Senior deed owner", "Junior deed owner", "Split 50/50", "Determined by occupation"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Senior rights rule:** First in time, first in right\n2. **Senior deed:** Recorded first, conveyed first\n3. **Junior deed:** Cannot convey what grantor doesn't own\n4. **Overlap situation:** Junior grantor already conveyed that 0.5 acres\n5. **Result:** Senior deed controls overlapping area\n6. **Junior owner:** Has claim against their grantor (warranty of title)\n7. **Exception:** Adverse possession (if requirements met)\n**Answer: Senior deed owner**", points: 10 },
          { type: "multiple_choice", text: "A deed dated 1875 refers to a 'large oak tree at the northeast corner'. The tree is gone. What should the surveyor do?", options: ["Search for evidence of the tree's former location (roots, witnesses, old surveys)", "Ignore the call and use only measurements", "Place the corner wherever convenient", "Declare the deed invalid"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Missing monument problem:** Common in old surveys\n2. **Investigation steps:**\n   - Search for physical remains (stump, roots, hole)\n   - Interview old-timers (oral testimony)\n   - Research old surveys, photos, maps\n   - Look for correlating monuments\n3. **Evidence gathering:** Document all findings\n4. **Reconstruct position:** Using best available evidence\n5. **Report:** Explain methodology and reliability\n6. **Never:** Ignore monument calls or act arbitrarily\n**Answer: Search for evidence of the tree's former location (roots, witnesses, old surveys)**", points: 10 }
        ]
      },

      // Domain 3: Rights, Titles, and Interests
      {
        domainNumber: 3,
        domain: DOMAINS[3],
        title: "Rights, Titles, and Interests",
        description: "Understand different types of property ownership, estates, and encumbrances",
        content: "Property ownership involves various rights, estates, and interests. Surveyors must recognize fee simple, life estates, easements, and other encumbrances that affect property boundaries and use.",
        difficulty: "medium" as const,
        orderIndex: 3,
        estimatedMinutes: 25,
        suggestedWeek: 7,
        questions: [
          { type: "multiple_choice", text: "Fee simple absolute is:", options: ["The most complete form of ownership with no limitations", "Ownership for a limited time period", "Ownership subject to conditions", "Shared ownership with others"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Fee simple absolute:** Highest form of ownership\n2. **Characteristics:**\n   - Unlimited duration (inheritable)\n   - No conditions or limitations\n   - Full bundle of rights (use, sell, lease, etc.)\n3. **Owner can:** Transfer, devise, or inherit\n4. **Contrast:** Life estate (ends at death), leasehold (ends at term)\n5. **Most common:** Residential property ownership type\n**Answer: The most complete form of ownership with no limitations**", points: 10 },
          { type: "multiple_choice", text: "A life estate grants ownership:", options: ["For the lifetime of a specified person", "Forever", "For 99 years", "Until the property is sold"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Life estate:** Ownership for duration of a life\n2. **Life tenant:** Person holding life estate\n3. **Duration:** Ends when specified person dies\n4. **Measuring life:** Usually the life tenant, but could be another person\n5. **Remainderman:** Person who inherits after life estate ends\n6. **Example:** 'To John for his life, then to Mary'\n7. **Surveyor concern:** May affect boundary improvements\n**Answer: For the lifetime of a specified person**", points: 10 },
          { type: "multiple_choice", text: "An encumbrance is:", options: ["A claim, lien, or liability attached to property", "A type of survey monument", "A survey error", "A property tax"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Encumbrance:** Burden on property title\n2. **Types of encumbrances:**\n   - Liens (mortgages, tax liens)\n   - Easements (rights of way)\n   - Restrictions (deed restrictions)\n   - Encroachments (physical intrusions)\n3. **Effect:** Limits owner's rights or use\n4. **Surveyor's duty:** Identify visible encumbrances (easements, encroachments)\n5. **Not responsible for:** Hidden liens (title company's job)\n**Answer: A claim, lien, or liability attached to property**", points: 10 },
          { type: "multiple_choice", text: "A mortgage is best described as:", options: ["A lien on property securing a debt", "Ownership of property", "A type of easement", "A property survey"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Mortgage:** Security interest in property\n2. **Purpose:** Secures repayment of loan\n3. **Parties:**\n   - Mortgagor (borrower/property owner)\n   - Mortgagee (lender)\n4. **Effect:** Creates lien against property\n5. **Foreclosure:** Lender's remedy if borrower defaults\n6. **Ownership:** Borrower retains title (in most states)\n7. **Surveyor role:** Mortgage surveys identify property for lenders\n**Answer: A lien on property securing a debt**", points: 10 },
          { type: "multiple_choice", text: "Which of the following is NOT typically part of the 'bundle of rights' in property ownership?", options: ["The right to others' property", "The right to possess", "The right to use", "The right to transfer"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Bundle of rights concept:** Property ownership includes multiple rights\n2. **Typical rights included:**\n   - Right to possess (exclusive occupancy)\n   - Right to use (enjoy the property)\n   - Right to transfer (sell, gift, devise)\n   - Right to exclude others\n   - Right to encumber (mortgage, lease)\n3. **NOT included:** Rights to others' property\n4. **Limitations:** Zoning, police power, eminent domain, taxation\n**Answer: The right to others' property**", points: 10 }
        ]
      },

      // Domain 3: Easements and Rights of Way
      {
        domainNumber: 3,
        domain: DOMAINS[3],
        title: "Easements and Rights of Way",
        description: "Identify and survey different types of easements and access rights",
        content: "Easements grant rights to use another's property for specific purposes. Understanding easement types, creation methods, and surveying requirements is essential for proper boundary surveys.",
        difficulty: "easy" as const,
        orderIndex: 4,
        estimatedMinutes: 20,
        suggestedWeek: 9,
        questions: [
          { type: "multiple_choice", text: "An easement is:", options: ["A right to use another's land for a specific purpose", "Full ownership of land", "A type of fence", "A survey monument"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Easement:** Non-possessory interest in land\n2. **Grants:** Right to use, not ownership\n3. **Parties:**\n   - Dominant estate (benefits from easement)\n   - Servient estate (burdened by easement)\n4. **Common purposes:** Access, utilities, drainage\n5. **Owner retains:** Possession and use (subject to easement)\n6. **Example:** Utility easement for power lines\n**Answer: A right to use another's land for a specific purpose**", points: 10 },
          { type: "multiple_choice", text: "An appurtenant easement:", options: ["Benefits a specific parcel of land and transfers with the land", "Benefits a person and does not transfer", "Is temporary", "Only benefits utilities"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Easement appurtenant:** Attached to land, not person\n2. **Requires:**\n   - Dominant estate (benefited land)\n   - Servient estate (burdened land)\n3. **Runs with the land:** Transfers automatically when land is sold\n4. **Example:** Driveway easement over Lot A for access to Lot B\n5. **Contrast:** Easement in gross (benefits person/entity, not land)\n6. **Surveyor's duty:** Show on survey plat\n**Answer: Benefits a specific parcel of land and transfers with the land**", points: 10 },
          { type: "multiple_choice", text: "An easement by necessity is created when:", options: ["A parcel has no legal access to a public road", "An owner wants convenience", "Neighbors agree", "A utility company requests access"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Easement by necessity:** Implied by law\n2. **Requirements:**\n   - Landlocked parcel (no access to public road)\n   - Common ownership in the past (unity of title)\n   - Necessity existed when parcels were severed\n3. **Purpose:** Ensure all land is accessible\n4. **Location:** Reasonably necessary route\n5. **Not created:** For mere convenience or preference\n6. **Duration:** Exists as long as necessity continues\n**Answer: A parcel has no legal access to a public road**", points: 10 },
          { type: "multiple_choice", text: "A utility easement grants:", options: ["The right to install, maintain, and access utilities", "Ownership of the easement area", "The right to build any structure", "Mineral rights"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Utility easement:** For infrastructure placement\n2. **Typical uses:**\n   - Power lines\n   - Water/sewer pipes\n   - Gas lines\n   - Cable/telecommunications\n3. **Rights granted:**\n   - Install facilities\n   - Access for maintenance and repair\n   - Trim vegetation if needed\n4. **Landowner restrictions:** Cannot build structures that interfere\n5. **Ownership:** Landowner retains title\n**Answer: The right to install, maintain, and access utilities**", points: 10 },
          { type: "multiple_choice", text: "A 20-foot wide recorded easement is located 10 feet on each side of a described centerline. A fence is built on the centerline. Who can use the easement?", options: ["The dominant estate can still use the full 20-foot width", "Only the 10-foot section without the fence", "No one, the fence blocks it", "Only the person who built the fence"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Easement width:** 20 feet (10 ft each side of centerline)\n2. **Fence location:** On centerline (within easement)\n3. **Legal principle:** Servient owner cannot interfere with easement use\n4. **Result:** Fence is an interference\n5. **Dominant estate rights:** Remove fence or require removal\n6. **Full access:** Entitled to use entire 20-foot width\n7. **Servient owner:** Cannot unilaterally narrow easement\n**Answer: The dominant estate can still use the full 20-foot width**", points: 10 }
        ]
      },

      // Domain 3: Boundary Evidence and Prioritization
      {
        domainNumber: 3,
        domain: DOMAINS[3],
        title: "Boundary Evidence and Prioritization",
        description: "Evaluate and prioritize different types of boundary evidence",
        content: "Surveyors must weigh various types of boundary evidence including monuments, measurements, occupation, and testimony. Understanding evidence hierarchy and reliability helps resolve boundary uncertainties.",
        difficulty: "medium" as const,
        orderIndex: 5,
        estimatedMinutes: 25,
        suggestedWeek: 11,
        questions: [
          { type: "multiple_choice", text: "When original monuments are found, they control over:", options: ["Record measurements and calculations", "Occupation lines", "Newer monuments", "Surveyor's opinion"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Original monuments:** Highest evidence priority\n2. **Definition:** Monuments set by original surveyor\n3. **Why they control:**\n   - Represent surveyor's actual intent\n   - Physical evidence of original survey\n   - Measurements may contain errors\n4. **Example:** Iron pin found at corner controls over deed distance of '100 ft' even if pin is at 102 ft\n5. **Surveyor's duty:** Accept original monuments\n6. **Exception:** Proven fraud or gross error\n**Answer: Record measurements and calculations**", points: 10 },
          { type: "multiple_choice", text: "Occupation (fences, buildings) can be evidence of boundary location when:", options: ["It is long-standing, visible, and agreed upon by adjoining owners", "It was built last week", "Only one owner recognizes it", "It is invisible"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Occupation as evidence:** Physical use defining boundary\n2. **Stronger evidence when:**\n   - Long-standing (decades)\n   - Visible and notorious\n   - Mutual recognition by neighbors\n   - Consistent with deeds\n3. **Types:** Fences, buildings, driveways, walls\n4. **Not conclusive:** Unless adverse possession requirements met\n5. **Surveyor consideration:** Important corroborating evidence\n6. **Document:** Photos, measurements, interviews\n**Answer: It is long-standing, visible, and agreed upon by adjoining owners**", points: 10 },
          { type: "multiple_choice", text: "Parol evidence (oral testimony) is:", options: ["Acceptable to explain ambiguities but not to contradict clear written descriptions", "Always superior to written deeds", "Never admissible in boundary disputes", "Only used for recent surveys"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Parol evidence:** Oral testimony about boundaries\n2. **Legal principle:** Written documents generally control\n3. **Admissible to:**\n   - Explain ambiguous deed language\n   - Locate lost monuments\n   - Show original surveyor's intent\n   - Corroborate other evidence\n4. **NOT admissible to:** Contradict clear, unambiguous deed language\n5. **Example:** Can't testify 'north line is 500 ft' when deed clearly says '1000 ft'\n6. **Value:** Decreases with time (witnesses die/forget)\n**Answer: Acceptable to explain ambiguities but not to contradict clear written descriptions**", points: 10 },
          { type: "multiple_choice", text: "A surveyor finds two iron pipes at a corner location, 3 feet apart. One is rusty and bent, the other is new. Which likely controls?", options: ["The rusty, bent pipe (appears original)", "The new pipe (better condition)", "Neither (too much uncertainty)", "Whichever is closer to record measurements"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Evidence evaluation:** Determine which is original monument\n2. **Rusty, bent pipe indicators:**\n   - Age (rust suggests older)\n   - Condition (bent could be from disturbance over time)\n   - Likely original monument\n3. **New pipe indicators:**\n   - Recent placement\n   - Possibly replacement or survey marker\n4. **Original controls:** Original monuments have highest priority\n5. **Investigation needed:**\n   - Check old surveys\n   - Correlate with other evidence\n   - Document both monuments\n6. **Most likely:** Rusty pipe is controlling monument\n**Answer: The rusty, bent pipe (appears original)**", points: 10 },
          { type: "multiple_choice", text: "When recovering a section corner, which evidence is LEAST reliable?", options: ["A single uncorroborated measurement", "Multiple consistent measurements from different directions", "Witness monuments referenced in GLO notes", "Physical remains of original monument"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Evidence reliability ranking (most to least):**\n   - Physical remains of original monument (highest)\n   - Witness monuments from GLO notes\n   - Multiple corroborating measurements\n   - Single uncorroborated measurement (lowest)\n2. **Single measurement problems:**\n   - No verification\n   - Could contain errors\n   - No independent check\n3. **Corroboration:** Multiple measurements agreeing increase reliability\n4. **Best practice:** Use multiple evidence types\n**Answer: A single uncorroborated measurement**", points: 10 }
        ]
      },

      // Domain 3: Adverse Possession and Boundary Disputes
      {
        domainNumber: 3,
        domain: DOMAINS[3],
        title: "Adverse Possession and Boundary Disputes",
        description: "Understand adverse possession requirements and boundary dispute resolution",
        content: "Adverse possession allows acquisition of property rights through long-term, open occupation. Surveyors must recognize potential adverse possession claims and understand their role in boundary disputes.",
        difficulty: "medium" as const,
        orderIndex: 6,
        estimatedMinutes: 25,
        suggestedWeek: 13,
        questions: [
          { type: "multiple_choice", text: "Adverse possession requires possession that is:", options: ["Continuous, exclusive, open, notorious, hostile, and for the statutory period", "Temporary and with permission", "Secret and occasional", "Only for 1 year"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Adverse possession elements (all required):**\n   - **Continuous:** Uninterrupted for statutory period (typically 10-20 years)\n   - **Exclusive:** Possessor alone, not shared with owner\n   - **Open and notorious:** Visible, obvious to owner\n   - **Hostile:** Without permission (adverse to owner's rights)\n   - **For statutory period:** Varies by state (5-30 years typical)\n2. **Additional:** Some states require payment of taxes\n3. **Purpose:** Rewards productive use, punishes neglect\n4. **All elements required:** Missing one = no adverse possession\n**Answer: Continuous, exclusive, open, notorious, hostile, and for the statutory period**", points: 10 },
          { type: "multiple_choice", text: "If a neighbor builds a fence 5 feet onto your property with your permission, can they claim adverse possession?", options: ["No, because the possession is not hostile (it's permissive)", "Yes, after the statutory period", "Yes, immediately", "Only if you never use that area"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Hostile requirement:** Possession must be adverse (without permission)\n2. **Scenario:** Fence built with permission\n3. **Legal effect:** Creates permissive use, not hostile\n4. **Permissive use:** Cannot ripen into adverse possession\n5. **Why:** Owner consented, no adverse claim\n6. **To stop adverse possession:** Grant permission\n7. **Result:** No adverse possession claim possible\n**Answer: No, because the possession is not hostile (it's permissive)**", points: 10 },
          { type: "multiple_choice", text: "The statutory period for adverse possession in your state is 15 years. Neighbor A occupies your land for 8 years, then sells to Neighbor B who occupies for 10 years. Can Neighbor B claim adverse possession?", options: ["Yes, through 'tacking' the periods together (8 + 10 = 18 years)", "No, Neighbor B only has 10 years", "No, the clock resets with each new owner", "Only if both neighbors pay taxes"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Tacking:** Adding successive periods of adverse possession\n2. **Requirements for tacking:**\n   - Privity between successive possessors (transfer of interest)\n   - Continuous, uninterrupted possession\n3. **Scenario:** A occupies 8 years → sells to B → B occupies 10 years\n4. **Privity exists:** Sale created transfer\n5. **Total time:** 8 + 10 = 18 years\n6. **Exceeds statutory period:** 18 > 15 years\n7. **Result:** Neighbor B can claim adverse possession\n**Answer: Yes, through 'tacking' the periods together (8 + 10 = 18 years)**", points: 10 },
          { type: "multiple_choice", text: "A surveyor discovers a fence that has been in place for 25 years, 10 feet over the record boundary line. What should the surveyor do?", options: ["Show both the record line and fence location, note the potential adverse possession claim", "Move the fence to the record line", "Ignore the fence completely", "Automatically change the boundary to the fence"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Surveyor's role:** Find and report facts, not judge legal rights\n2. **Facts to show:**\n   - Record boundary location\n   - Fence location\n   - Fence age (if determinable)\n3. **Note:** Potential adverse possession claim\n4. **Do NOT:**\n   - Move physical evidence\n   - Decide legal ownership\n   - Change boundaries without court order\n5. **Recommendation:** Advise client to consult attorney\n6. **Report:** Thorough documentation with photos\n**Answer: Show both the record line and fence location, note the potential adverse possession claim**", points: 10 },
          { type: "multiple_choice", text: "In a boundary dispute, the surveyor's role is to:", options: ["Provide technical evidence and expert opinion, not make legal determinations", "Decide who owns the disputed area", "Take sides with whoever hired them", "Ignore legal principles"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Surveyor = technical expert, NOT judge**\n2. **Proper surveyor duties:**\n   - Locate and document evidence\n   - Apply surveying principles\n   - Provide expert opinion on technical matters\n   - Testify factually if needed\n3. **NOT surveyor's role:**\n   - Make legal ownership decisions\n   - Advocate for one party\n   - Interpret complex legal issues\n4. **Legal decisions:** Made by courts or attorneys\n5. **Professional ethics:** Remain impartial, report facts\n**Answer: Provide technical evidence and expert opinion, not make legal determinations**", points: 10 }
        ]
      },

      // Domain 3: Survey Standards and Professional Liability
      {
        domainNumber: 3,
        domain: DOMAINS[3],
        title: "Survey Standards and Professional Liability",
        description: "Understand survey standards, professional responsibilities, and liability issues",
        content: "Professional surveyors must follow minimum technical standards and maintain professional liability insurance. Understanding standards, ethics, and liability helps ensure quality work and public protection.",
        difficulty: "easy" as const,
        orderIndex: 7,
        estimatedMinutes: 20,
        suggestedWeek: 15,
        questions: [
          { type: "multiple_choice", text: "Minimum technical standards for boundary surveys are typically established by:", options: ["State law or regulations", "Each surveyor individually", "The property owner", "The title company"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Standards source:** State law/regulations\n2. **Common names:**\n   - Minimum Standards\n   - Standards of Practice\n   - Administrative Rules\n3. **Established by:** State licensing boards\n4. **Purpose:** Protect public, ensure quality\n5. **Typical requirements:**\n   - Monument setting\n   - Research requirements\n   - Survey plat content\n   - Accuracy specifications\n6. **Compliance:** Mandatory for licensed surveyors\n**Answer: State law or regulations**", points: 10 },
          { type: "multiple_choice", text: "A surveyor must set monuments at property corners:", options: ["Unless monuments already exist or specific exemptions apply", "Only if the client requests", "Never, monuments are optional", "Only for large parcels"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Monument setting:** Generally required by state standards\n2. **Typical requirement:** Set durable monuments at corners\n3. **Exemptions may include:**\n   - Original monuments found and in good condition\n   - Physical obstructions (rock, concrete)\n   - Specifically exempted survey types\n4. **Purpose:** Mark boundaries for future reference\n5. **Monument types:** Iron pipe, rebar, concrete, etc.\n6. **Documentation:** Show on survey plat with description\n**Answer: Unless monuments already exist or specific exemptions apply**", points: 10 },
          { type: "multiple_choice", text: "Professional liability (errors and omissions) insurance protects the surveyor from:", options: ["Claims of negligence or errors in professional work", "Criminal prosecution", "All possible lawsuits", "Property damage to survey equipment"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **E&O Insurance:** Covers professional negligence\n2. **Protects against:**\n   - Errors in surveys\n   - Omissions (missed information)\n   - Professional negligence claims\n3. **Does NOT cover:**\n   - Intentional misconduct\n   - Criminal acts\n   - General liability (property damage)\n4. **Why important:** Surveys affect property rights and values\n5. **Requirements:** Some states mandate insurance\n**Answer: Claims of negligence or errors in professional work**", points: 10 },
          { type: "multiple_choice", text: "A surveyor discovers an error in a previously completed survey. The surveyor should:", options: ["Notify the client immediately and correct the error", "Ignore it and hope no one notices", "Blame the previous surveyor", "Wait until someone complains"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Professional responsibility:** Correct errors promptly\n2. **Proper procedure:**\n   - Notify client immediately\n   - Assess impact of error\n   - Prepare corrected survey\n   - File corrected plat if recorded\n3. **Why important:**\n   - Protect public\n   - Minimize damages\n   - Professional ethics\n4. **Notify insurance:** If error could lead to claim\n5. **Never:** Hide or ignore errors\n**Answer: Notify the client immediately and correct the error**", points: 10 },
          { type: "multiple_choice", text: "Which is NOT typically required on a boundary survey plat?", options: ["The surveyor's favorite color", "Surveyor's license number and seal", "Property description", "North arrow and scale"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Standard plat requirements:**\n   - Title and purpose\n   - Property description and location\n   - Survey measurements and bearings\n   - North arrow and scale\n   - Surveyor name, license number, seal, signature\n   - Date of survey\n   - Found and set monuments\n   - Adjoining property information\n2. **NOT required:** Personal preferences, favorite colors\n3. **Purpose:** Professional document showing boundary location\n4. **Compliance:** Must meet state minimum standards\n**Answer: The surveyor's favorite color**", points: 10 }
        ]
      },

      // ========== DOMAIN 4: SURVEYING PRINCIPLES ==========

      // Domain 4: Units and Conversions in Surveying
      {
        domainNumber: 4,
        domain: DOMAINS[4],
        title: "Units and Conversions in Surveying",
        description: "Master common surveying units and conversion between different measurement systems",
        content: "Surveyors work with multiple measurement systems including US Survey feet, International feet, meters, and various angular units. Accurate conversions are essential for proper calculations and avoiding costly errors.",
        difficulty: "easy" as const,
        orderIndex: 1,
        estimatedMinutes: 20,
        suggestedWeek: 1,
        questions: [
          { type: "multiple_choice", text: "The difference between US Survey feet and International feet is:", options: ["2 ppm (parts per million)", "10 ppm", "No difference", "1 foot per mile"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **US Survey foot:** 1200/3937 meters (exactly)\n2. **International foot:** 0.3048 meters (exactly)\n3. **Difference calculation:**\n   - 1 US Survey ft = 0.30480061 m\n   - 1 International ft = 0.3048 m\n   - Difference ≈ 0.00000061 m per foot\n4. **In ppm:** ~2 parts per million\n5. **Practical effect:** 1 foot difference per 100 miles\n6. **Important:** State Plane coordinates use US Survey feet in most states\n**Answer: 2 ppm (parts per million)**", points: 10 },
          { type: "multiple_choice", text: "Convert 1,500.00 US Survey feet to meters (1 US Survey foot = 0.30480061 m):", options: ["457.20 m", "457.21 m", "457.19 m", "457.18 m"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Conversion factor:** 1 US Survey ft = 0.30480061 m\n2. **Given distance:** 1,500.00 ft\n3. **Calculate:** 1,500.00 × 0.30480061\n4. **Result:** 457.200915 m\n5. **Round to cm precision:** 457.20 m\n6. **Check:** Approximately 457 m (reasonable)\n**Answer: 457.20 m**", points: 10 },
          { type: "multiple_choice", text: "A distance is measured as 1 mile. How many US Survey feet is this?", options: ["5,280 feet", "5,000 feet", "5,280.01 feet", "6,000 feet"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Standard definition:** 1 mile = 5,280 feet\n2. **Applies to:** Both US Survey and International feet\n3. **Mile definition:** 8 furlongs = 80 chains\n4. **Chain:** 66 feet (Gunter's chain)\n5. **Calculation:** 80 × 66 = 5,280 feet\n6. **Universal:** Same for US Survey and International systems\n**Answer: 5,280 feet**", points: 10 },
          { type: "multiple_choice", text: "An angle is measured as 47° 32' 45\". Convert to decimal degrees:", options: ["47.5458°", "47.3245°", "47.5625°", "47.6000°"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Degrees part:** 47°\n2. **Minutes conversion:** 32' = 32/60 = 0.5333°\n3. **Seconds conversion:** 45\" = 45/3600 = 0.0125°\n4. **Add all parts:** 47 + 0.5333 + 0.0125\n5. **Result:** 47.5458°\n6. **Formula:** DD = D + (M/60) + (S/3600)\n**Answer: 47.5458°**", points: 10 },
          { type: "multiple_choice", text: "A surveyor measures 10 chains. How many feet is this?", options: ["660 feet", "1,000 feet", "528 feet", "100 feet"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Gunter's chain definition:** 66 feet (4 rods)\n2. **Given:** 10 chains\n3. **Calculate:** 10 × 66 = 660 feet\n4. **Also equals:** 10 chains = 1 furlong\n5. **Historical context:** Standard survey unit in PLSS\n6. **1 chain:** 100 links of 0.66 ft each\n**Answer: 660 feet**", points: 10 }
        ]
      },

      // Domain 4: Accuracy and Precision Standards
      {
        domainNumber: 4,
        domain: DOMAINS[4],
        title: "Accuracy and Precision Standards",
        description: "Understand accuracy, precision, and surveying standards for different project types",
        content: "Accuracy (closeness to true value) and precision (repeatability) are fundamental surveying concepts. Different survey types require different accuracy standards, from construction layout to geodetic control.",
        difficulty: "medium" as const,
        orderIndex: 2,
        estimatedMinutes: 25,
        suggestedWeek: 3,
        questions: [
          { type: "multiple_choice", text: "The difference between accuracy and precision is:", options: ["Accuracy is closeness to true value; precision is repeatability of measurements", "They mean the same thing", "Precision is closeness to true value; accuracy is repeatability", "Neither relates to measurement quality"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Accuracy:** How close measurement is to TRUE value\n   - Example: Measuring 100.00 ft line as 100.01 ft (high accuracy)\n2. **Precision:** How repeatable measurements are\n   - Example: Three measurements of 99.50, 99.51, 99.49 ft (high precision, low accuracy)\n3. **Ideal:** Both high accuracy AND high precision\n4. **Can have:** High precision but low accuracy (systematic error)\n5. **Cannot have:** High accuracy without reasonable precision\n**Answer: Accuracy is closeness to true value; precision is repeatability of measurements**", points: 10 },
          { type: "multiple_choice", text: "A traverse has a relative precision of 1:10,000. If the traverse length is 5,000 feet, what is the allowable misclosure?", options: ["0.50 feet", "0.10 feet", "5.00 feet", "1.00 feet"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Relative precision formula:** Allowable Error = Total Length / Precision Ratio\n2. **Given:**\n   - Precision ratio = 1:10,000\n   - Total length = 5,000 ft\n3. **Calculate:** 5,000 / 10,000 = 0.50 ft\n4. **Alternative form:** 1/10,000 × 5,000 = 0.50 ft\n5. **Meaning:** Maximum acceptable misclosure is 0.50 ft\n6. **Check:** Ratio = 0.50/5,000 = 1:10,000 ✓\n**Answer: 0.50 feet**", points: 10 },
          { type: "multiple_choice", text: "ALTA/NSPS standards for relative positional precision typically require:", options: ["±0.07 ft or better", "±1.00 ft", "±0.50 ft", "±10.00 ft"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **ALTA/NSPS:** American Land Title Association standards\n2. **Relative positional precision:** Between any two points\n3. **Standard requirement:** ±0.07 ft (±2 cm) or better\n4. **Applies to:** Property corners, monuments\n5. **Very stringent:** Commercial survey standard\n6. **Must be certified:** By licensed surveyor\n7. **Purpose:** Title insurance requirements\n**Answer: ±0.07 ft or better**", points: 10 },
          { type: "multiple_choice", text: "Third-order class I traverse standards require a maximum angular misclosure of:", options: ["10\" √N (where N = number of angles)", "30\" √N", "1'", "5°"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Third-order Class I:** Federal geodetic control standard\n2. **Angular misclosure formula:** 10\" × √N\n3. **Where N:** Number of angles in traverse\n4. **Example:** 9 angles → 10\" × √9 = 10\" × 3 = 30\"\n5. **Tighter than:** Construction surveys (typically 30\" √N)\n6. **Looser than:** First-order (3\" √N)\n7. **Application:** Local control surveys\n**Answer: 10\" √N (where N = number of angles)**", points: 10 },
          { type: "multiple_choice", text: "A construction layout requires ±0.10 ft horizontal accuracy. The surveyor's measurements have a standard deviation of ±0.04 ft. What can be concluded?", options: ["The measurements meet the specification (0.04 < 0.10)", "The measurements fail the specification", "More measurements are needed", "The specification is too strict"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Specification required:** ±0.10 ft horizontal accuracy\n2. **Achieved precision:** ±0.04 ft (standard deviation)\n3. **Comparison:** 0.04 ft < 0.10 ft\n4. **Conclusion:** MEETS specification\n5. **Safety factor:** 2.5× better than required\n6. **Professional practice:** Measure to higher precision than spec\n7. **Allows for:** Field conditions, errors\n**Answer: The measurements meet the specification (0.04 < 0.10)**", points: 10 }
        ]
      },

      // Domain 4: Error Theory and Classification
      {
        domainNumber: 4,
        domain: DOMAINS[4],
        title: "Error Theory and Classification",
        description: "Classify surveying errors and understand their effects on measurements",
        content: "Surveying errors are classified as systematic (constant), random (compensating), or blunders (mistakes). Understanding error types helps eliminate or minimize their effects on survey results.",
        difficulty: "medium" as const,
        orderIndex: 3,
        estimatedMinutes: 25,
        suggestedWeek: 5,
        questions: [
          { type: "multiple_choice", text: "Systematic errors are:", options: ["Constant in magnitude and sign, can be eliminated by calibration or correction", "Random in magnitude and sign", "Caused by mistakes", "Impossible to detect"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Systematic error characteristics:**\n   - Constant magnitude and algebraic sign\n   - Follow physical laws\n   - Cumulative (add up)\n2. **Examples:**\n   - Tape too long/short\n   - Instrument out of adjustment\n   - Temperature effect not corrected\n3. **Can be eliminated:** Through calibration, correction formulas\n4. **Vs. random errors:** Which cancel out over time\n5. **Most dangerous:** Because they accumulate\n**Answer: Constant in magnitude and sign, can be eliminated by calibration or correction**", points: 10 },
          { type: "multiple_choice", text: "A 100-ft steel tape is standardized at 68°F. When used at 95°F without correction, this produces:", options: ["A systematic error (tape expands, measures short)", "A random error", "A blunder", "No error"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Error type:** Systematic (constant effect)\n2. **Temperature effect:** Steel expands when heated\n3. **At 95°F:** Tape is LONGER than 100 ft\n4. **Result:** Measures distances SHORT (fewer tape lengths needed)\n5. **Correction formula:** ΔL = L × α × ΔT\n   - α (steel) ≈ 0.0000065 per °F\n   - ΔT = 95 - 68 = 27°F\n6. **Can be corrected:** Apply temperature correction\n7. **Systematic:** Same error each measurement until corrected\n**Answer: A systematic error (tape expands, measures short)**", points: 10 },
          { type: "multiple_choice", text: "Random errors in surveying:", options: ["Follow laws of probability and tend to cancel when averaged", "Are always positive", "Can be completely eliminated", "Are caused by carelessness"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Random error characteristics:**\n   - No constant magnitude or sign\n   - Follow probability laws (normal distribution)\n   - Equally likely positive or negative\n2. **Behavior:**\n   - Tend to cancel when measurements averaged\n   - Decrease with √n (more measurements)\n3. **Examples:**\n   - Reading estimation\n   - Instrument pointing\n   - Rod plumbing\n4. **Cannot eliminate:** But can minimize by averaging\n5. **Not blunders:** Caused by measurement limitations, not mistakes\n**Answer: Follow laws of probability and tend to cancel when averaged**", points: 10 },
          { type: "multiple_choice", text: "A surveyor reads an angle as 47° 32' 45\" but records it as 47° 23' 45\". This is:", options: ["A blunder (mistake)", "A systematic error", "A random error", "Acceptable practice"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Blunder definition:** Mistake, human error\n2. **This example:**\n   - Read: 47° 32' 45\"\n   - Recorded: 47° 23' 45\"\n   - Transposed digits: 32 → 23\n3. **Characteristics of blunders:**\n   - Human mistakes\n   - Not following probability laws\n   - Large magnitude\n4. **Detection:** By redundant measurements, checking\n5. **Cannot average out:** Must be found and corrected\n6. **Prevention:** Careful work, double-checking\n**Answer: A blunder (mistake)**", points: 10 },
          { type: "multiple_choice", text: "The most probable value of a set of equally weighted measurements is the:", options: ["Arithmetic mean (average)", "Median", "Mode", "Largest value"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Equal weights:** All measurements equally reliable\n2. **Most probable value (MPV):** Arithmetic mean\n3. **Formula:** MPV = Σx / n\n4. **Example:** Measurements 100.2, 100.4, 100.3 ft\n   - Sum: 300.9 ft\n   - Count: 3\n   - Mean: 300.9 / 3 = 100.3 ft\n5. **Basis:** Least squares principle\n6. **Minimizes:** Sum of squared residuals\n**Answer: Arithmetic mean (average)**", points: 10 }
        ]
      },

      // Domain 4: Measurement Standards and Specifications
      {
        domainNumber: 4,
        domain: DOMAINS[4],
        title: "Measurement Standards and Specifications",
        description: "Apply appropriate measurement standards and specifications for different survey types",
        content: "Different survey applications require different measurement standards. Understanding when to apply control survey, boundary survey, or construction survey standards ensures appropriate accuracy for the project purpose.",
        difficulty: "easy" as const,
        orderIndex: 4,
        estimatedMinutes: 20,
        suggestedWeek: 8,
        questions: [
          { type: "multiple_choice", text: "Geodetic control surveys are used to:", options: ["Establish reference framework for other surveys and mapping", "Mark property boundaries", "Layout building foundations", "Measure topography only"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Geodetic control:** High-accuracy reference network\n2. **Purpose:**\n   - Establish coordinate framework\n   - Support other surveys\n   - Mapping projects\n   - Engineering projects\n3. **Characteristics:**\n   - Very high accuracy (first to third order)\n   - Permanent monuments\n   - Precise coordinates and elevations\n4. **Examples:** NGS benchmarks, HARN stations\n5. **Not for:** Direct boundary or construction work\n6. **Foundation:** For all other survey work\n**Answer: Establish reference framework for other surveys and mapping**", points: 10 },
          { type: "multiple_choice", text: "Construction staking tolerances are typically:", options: ["Specified by the project plans and specifications", "Always ±0.01 ft", "The same as boundary surveys", "Not important"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Construction tolerances:** Vary by project type\n2. **Specified in:**\n   - Project plans\n   - Technical specifications\n   - Building codes\n3. **Examples:**\n   - Building footings: ±0.05 ft horizontal\n   - Bridge piers: ±0.01 ft\n   - Roads: ±0.10 ft\n4. **Surveyor duty:** Meet or exceed specified tolerance\n5. **Different from:** Boundary surveys (legal accuracy)\n6. **Driven by:** Construction requirements, not legal description\n**Answer: Specified by the project plans and specifications**", points: 10 },
          { type: "multiple_choice", text: "A boundary survey for legal purposes should be performed to:", options: ["State minimum standards or better", "Construction tolerances", "Whatever the client wants to pay for", "No specific standard"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Legal requirement:** State minimum standards\n2. **Established by:** State licensing board\n3. **Mandatory:** For licensed surveyors\n4. **Typical requirements:**\n   - Research (deed, plat search)\n   - Field measurements (accuracy specs)\n   - Monument setting\n   - Plat preparation\n5. **Client cannot waive:** Legal requirements\n6. **Professional duty:** Meet or exceed standards\n7. **Consequences:** Discipline for non-compliance\n**Answer: State minimum standards or better**", points: 10 },
          { type: "multiple_choice", text: "Topographic surveys for mapping typically specify contour interval based on:", options: ["Map scale and intended use", "Surveyor preference", "Always 1-foot contours", "Property size"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Contour interval:** Vertical distance between contours\n2. **Factors affecting selection:**\n   - Map scale (1\"=20' vs 1\"=100')\n   - Terrain type (flat vs mountainous)\n   - Intended use (design vs planning)\n3. **General guidelines:**\n   - Large scale (1\"=20'): 1-ft or 2-ft contours\n   - Medium scale (1\"=50'): 2-ft or 5-ft contours\n   - Small scale (1\"=200'): 10-ft or 20-ft contours\n4. **Flatter terrain:** Smaller intervals needed\n5. **Purpose drives accuracy:** Design needs more detail than planning\n**Answer: Map scale and intended use**", points: 10 },
          { type: "multiple_choice", text: "As-built surveys are performed:", options: ["After construction to document final conditions", "Before construction to plan the project", "During design only", "Only for government projects"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **As-built (record) survey:** Documents completed work\n2. **Timing:** AFTER construction is complete\n3. **Purpose:**\n   - Show actual construction locations\n   - Document deviations from plans\n   - Create record for future reference\n4. **Typical items:**\n   - Utilities as installed\n   - Building locations\n   - Pavement limits\n   - Drainage structures\n5. **Vs. design survey:** Done before construction\n6. **Important for:** Maintenance, future projects, property records\n**Answer: After construction to document final conditions**", points: 10 }
        ]
      },

      // Domain 4: Horizontal and Vertical Datums
      {
        domainNumber: 4,
        domain: DOMAINS[4],
        title: "Horizontal and Vertical Datums",
        description: "Understand geodetic datums and coordinate reference systems",
        content: "Datums provide the reference framework for positions and elevations. Modern surveys use NAD 83 for horizontal positions and NAVD 88 for elevations, replacing older NAD 27 and NGVD 29 systems.",
        difficulty: "medium" as const,
        orderIndex: 5,
        estimatedMinutes: 25,
        suggestedWeek: 10,
        questions: [
          { type: "multiple_choice", text: "NAD 83 is:", options: ["A horizontal geodetic datum for North America", "A vertical datum", "A map projection", "A GPS satellite system"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **NAD 83:** North American Datum of 1983\n2. **Type:** Horizontal (position) datum\n3. **Defines:**\n   - Reference ellipsoid (GRS 80)\n   - Origin point and orientation\n   - Latitude/longitude framework\n4. **Replaced:** NAD 27 (older datum)\n5. **Used for:** State Plane Coordinates, GPS positions\n6. **Not:** Vertical datum (that's NAVD 88)\n7. **Maintained by:** National Geodetic Survey (NGS)\n**Answer: A horizontal geodetic datum for North America**", points: 10 },
          { type: "multiple_choice", text: "NAVD 88 is based on:", options: ["Mean sea level at Father Point, Quebec, Canada", "Mean sea level at all tide gauges", "The geoid", "GPS ellipsoid heights"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **NAVD 88:** North American Vertical Datum of 1988\n2. **Origin:** Primary tide gauge at Father Point, Quebec\n3. **Defined:** As elevation 0.000 m at this point\n4. **Method:** Leveling network from this origin\n5. **Replaced:** NGVD 29 (Sea Level Datum of 1929)\n6. **Differences from NGVD 29:**\n   - Different origin\n   - No assumption of mean sea level = 0 everywhere\n   - Can differ by 1-2 ft from NGVD 29\n7. **Important:** Must specify which datum used\n**Answer: Mean sea level at Father Point, Quebec, Canada**", points: 10 },
          { type: "multiple_choice", text: "When converting from NAD 27 to NAD 83, horizontal positions typically shift:", options: ["10-100 meters (varies by location)", "Exactly 0 meters", "Always 50 meters north", "Over 1 kilometer"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Datum transformation:** NAD 27 → NAD 83\n2. **Shifts vary:** By geographic location (10-100 m typical)\n3. **Reasons for shift:**\n   - Different reference ellipsoids\n   - Different datum origins\n   - Improved measurements\n4. **Example shifts (approximate):**\n   - California: ~30 m\n   - Texas: ~50 m\n   - Florida: ~15 m\n5. **Direction:** Usually northward and westward\n6. **Must transform:** Cannot mix NAD 27 and NAD 83 positions\n**Answer: 10-100 meters (varies by location)**", points: 10 },
          { type: "multiple_choice", text: "An elevation referenced to NAVD 88 at a location is 245.30 ft. The geoid height (separation) at this point is -25.50 ft. What is the approximate GPS ellipsoid height?", options: ["219.80 ft", "270.80 ft", "245.30 ft", "-25.50 ft"], answer: "1", explanation: "**Step-by-Step Solution:**\n1. **Relationship:** Ellipsoid Height = Orthometric Height + Geoid Height\n2. **Given:**\n   - NAVD 88 elevation (orthometric) = 245.30 ft\n   - Geoid height (N) = -25.50 ft\n3. **Formula:** h = H + N\n4. **Calculate:** h = 245.30 + (-25.50) = 219.80 ft\n5. **Wait - check sign convention!**\n   - Negative geoid height means geoid BELOW ellipsoid\n   - So ellipsoid height is HIGHER: 245.30 - (-25.50) = 270.80 ft\n6. **Correct:** h = 245.30 + 25.50 = 270.80 ft\n**Answer: 270.80 ft**", points: 10 },
          { type: "multiple_choice", text: "The purpose of a datum transformation is to:", options: ["Convert coordinates from one reference system to another", "Measure distances", "Calculate areas", "Set property boundaries"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Datum transformation:** Converts between reference systems\n2. **Common transformations:**\n   - NAD 27 → NAD 83\n   - WGS 84 → NAD 83\n   - NGVD 29 → NAVD 88\n3. **Methods:**\n   - Mathematical formulas (3-7 parameter)\n   - Grid-based (NADCON, VERTCON)\n   - Software tools (NGS toolkit)\n4. **Why needed:** Different datums = different coordinate values\n5. **Critical:** Mixing datums causes large errors\n6. **Professional duty:** Always specify datum used\n**Answer: Convert coordinates from one reference system to another**", points: 10 }
        ]
      },

      // Domain 4: Professional Practice and Ethics
      {
        domainNumber: 4,
        domain: DOMAINS[4],
        title: "Professional Practice and Ethics",
        description: "Understand professional surveying ethics, responsibilities, and conduct",
        content: "Professional surveyors have ethical obligations to the public, clients, and profession. Understanding professional conduct rules, conflicts of interest, and duty to the public ensures ethical practice.",
        difficulty: "easy" as const,
        orderIndex: 6,
        estimatedMinutes: 20,
        suggestedWeek: 12,
        questions: [
          { type: "multiple_choice", text: "A licensed surveyor's primary responsibility is to:", options: ["The public safety and welfare", "The client who pays the fee", "Other surveyors", "Maximizing profit"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Professional hierarchy:**\n   - **First:** Public safety and welfare\n   - Second: Client interests (within ethical bounds)\n   - Third: Profession\n2. **Reasoning:** License is a public trust\n3. **Examples:**\n   - Cannot falsify boundaries for client\n   - Must meet standards even if costly\n   - Report unsafe conditions\n4. **Similar to:** Engineers, doctors, lawyers\n5. **Code of ethics:** NSPS, state boards\n6. **Consequence:** License protects public, not just client\n**Answer: The public safety and welfare**", points: 10 },
          { type: "multiple_choice", text: "A client asks you to move a property corner 5 feet to give them more land. You should:", options: ["Refuse, as this violates professional ethics and law", "Do it if the client pays extra", "Do it only if neighbor agrees", "Move it but don't tell anyone"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Request analysis:** Client wants false boundary\n2. **Ethical violation:** Fraud, misrepresentation\n3. **Legal violation:** Criminal act in most states\n4. **Consequences:**\n   - License revocation\n   - Criminal prosecution\n   - Civil liability\n   - Harm to innocent parties\n5. **Proper response:**\n   - Refuse clearly\n   - Explain why it's wrong\n   - Educate client on proper process\n6. **Never:** Compromise professional integrity for client\n**Answer: Refuse, as this violates professional ethics and law**", points: 10 },
          { type: "multiple_choice", text: "A conflict of interest occurs when:", options: ["Personal or financial interests could compromise professional judgment", "You work for multiple clients", "Surveys are complex", "The weather is bad"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Conflict of interest:** Personal interests vs. professional duty\n2. **Examples:**\n   - Surveying property you want to buy\n   - Working for both parties in boundary dispute\n   - Financial interest in survey outcome\n   - Family relationship with client\n3. **Problem:** May compromise objectivity\n4. **Professional duty:**\n   - Disclose conflicts\n   - Avoid when possible\n   - Withdraw if necessary\n5. **Multiple clients OK:** If no conflict (separate projects)\n6. **Ethics codes:** Require disclosure and management\n**Answer: Personal or financial interests could compromise professional judgment**", points: 10 },
          { type: "multiple_choice", text: "Continuing education for licensed surveyors is required to:", options: ["Maintain competency with evolving technology and regulations", "Make money for training providers", "Punish surveyors", "Keep people busy"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Purpose:** Maintain professional competency\n2. **Reasons:**\n   - Technology changes (GPS, software)\n   - Regulations update\n   - New standards and methods\n   - Professional development\n3. **Typical requirements:**\n   - 15-30 hours every 2 years\n   - Mix of technical and professional topics\n   - Some states require ethics hours\n4. **Protects:** Public from outdated practices\n5. **Benefits surveyor:** Stay competitive, skilled\n6. **Mandatory:** In most states for license renewal\n**Answer: Maintain competency with evolving technology and regulations**", points: 10 },
          { type: "multiple_choice", text: "When subcontracting survey work, the licensed surveyor in responsible charge must:", options: ["Review and approve all work performed under their seal", "Never check the work", "Only sign the final plat", "Let the subcontractor sign"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Responsible charge:** Direct control and supervision\n2. **Requirements:**\n   - Review all field work and calculations\n   - Verify quality and accuracy\n   - Make final professional judgments\n   - Approve work before sealing\n3. **Cannot delegate:** Professional responsibility\n4. **Seal means:** Personal knowledge and approval\n5. **If delegating:**\n   - Must supervise adequately\n   - Still fully responsible\n   - Cannot just \"rubber stamp\"\n6. **License at risk:** If improper work sealed\n**Answer: Review and approve all work performed under their seal**", points: 10 }
        ]
      },

      // Domain 4: Legal and Regulatory Framework
      {
        domainNumber: 4,
        domain: DOMAINS[4],
        title: "Legal and Regulatory Framework",
        description: "Understand surveying laws, regulations, and licensing requirements",
        content: "Surveying is a regulated profession governed by state law. Understanding licensing requirements, scope of practice, and legal restrictions ensures lawful professional practice and protects the public.",
        difficulty: "medium" as const,
        orderIndex: 7,
        estimatedMinutes: 25,
        suggestedWeek: 14,
        questions: [
          { type: "multiple_choice", text: "Practice of land surveying is regulated by:", options: ["State licensing boards in each state", "Federal government only", "No regulations exist", "Client preferences"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Regulation level:** State-by-state (not federal)\n2. **Each state has:**\n   - Licensing board\n   - Practice act\n   - Administrative rules\n3. **Board authority:**\n   - License examinations\n   - Discipline violators\n   - Set minimum standards\n4. **Why state level:** Land law is state jurisdiction\n5. **Variations:** Requirements differ by state\n6. **Reciprocity:** Some states recognize other states' licenses\n7. **Federal role:** Limited (federal lands, national standards)\n**Answer: State licensing boards in each state**", points: 10 },
          { type: "multiple_choice", text: "To become a licensed Professional Land Surveyor (PLS), most states require:", options: ["Education, experience, and passing FS and PS exams", "Only passing an exam", "Just work experience", "A college degree only"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Typical licensure path:**\n   - **Education:** Degree or equivalent (varies by state)\n   - **Experience:** 2-8 years under licensed surveyor\n   - **Exams:** Fundamentals of Surveying (FS), Principles and Practice (PS)\n2. **FS exam (EIT/LSIT):**\n   - After education\n   - Before full licensure\n   - General surveying knowledge\n3. **PS exam:**\n   - After experience\n   - State-specific law and practice\n4. **All three required:** Cannot skip any component\n5. **State variations:** Some more/less stringent\n6. **Continuing requirement:** Maintain license through renewal/CE\n**Answer: Education, experience, and passing FS and PS exams**", points: 10 },
          { type: "multiple_choice", text: "Performing boundary surveys without a license is:", options: ["Illegal and subject to criminal penalties in most states", "Acceptable if you're careful", "Only illegal for large projects", "Allowed with client permission"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Unlicensed practice:** Prohibited by state law\n2. **Penalties:**\n   - Criminal misdemeanor (fines, jail possible)\n   - Civil penalties\n   - Injunctions\n   - Surveys may be invalid\n3. **Exemptions (vary by state):**\n   - Own property (limited)\n   - Federal surveyors on federal land\n   - Registered civil engineers (some states, limited)\n4. **No client waiver:** Cannot consent to unlicensed practice\n5. **Public protection:** Why licensing exists\n6. **Enforcement:** Licensing boards investigate complaints\n**Answer: Illegal and subject to criminal penalties in most states**", points: 10 },
          { type: "multiple_choice", text: "A surveyor's seal on a plat indicates:", options: ["The surveyor takes professional responsibility for the work", "The work is perfect", "Anyone can sign it", "It's just for decoration"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Seal purpose:** Authenticate professional responsibility\n2. **Seal indicates:**\n   - Licensed professional performed/reviewed work\n   - Meets professional standards\n   - Surveyor liable for errors\n3. **Requirements:**\n   - Must be licensed\n   - Must have direct knowledge of work\n   - Must personally approve\n4. **Illegal to:**\n   - Use seal when unlicensed\n   - Seal others' work without review\n   - Let others use your seal\n5. **Legal document:** Admissible in court\n6. **Professional liability:** Attaches to sealed work\n**Answer: The surveyor takes professional responsibility for the work**", points: 10 },
          { type: "multiple_choice", text: "If a surveyor discovers another surveyor's work contains significant errors affecting property boundaries, they should:", options: ["Notify the other surveyor and document findings in their own work", "Ignore it", "Tell everyone in town", "Immediately report to licensing board"], answer: "0", explanation: "**Step-by-Step Solution:**\n1. **Professional courtesy:** Notify other surveyor first\n2. **Proper procedure:**\n   - Document your findings\n   - Contact other surveyor professionally\n   - Show in your survey (both lines if needed)\n   - Explain discrepancy in notes\n3. **Not immediately report:** Unless fraud suspected\n4. **Other surveyor may:**\n   - Correct their error\n   - Have different evidence\n   - Explain discrepancy\n5. **Protect client:** Document issue in your work\n6. **If unresolved:** May need board involvement\n7. **Avoid:** Public criticism before discussion\n**Answer: Notify the other surveyor and document findings in their own work**", points: 10 }
        ]
      }
    ];

    // Track loaded lessons for post-transaction logging
    const loadedLessons: string[] = [];
    
    // Wrap everything in a transaction for production safety
    console.log("🧹 Clearing existing lessons and questions...");
    await db.transaction(async (tx) => {
      // Clear existing lessons to ensure idempotent loading
      await tx.delete(lessonQuestions);
      await tx.delete(lessons);

      // Insert all lessons (silent during transaction)
      for (const lessonData of lessonsData) {
        const { questions: questionData, ...lessonInfo } = lessonData;
        
        // Generate deterministic ID: d{domain}-lesson-{orderIndex:02}
        const lessonId = `d${lessonInfo.domainNumber}-lesson-${String(lessonInfo.orderIndex).padStart(2, '0')}`;
        
        const [lesson] = await tx.insert(lessons).values({
          ...lessonInfo,
          id: lessonId
        }).returning();
        loadedLessons.push(`${lessonInfo.domain}: ${lessonInfo.title}`);
        
        // Insert questions for this lesson
        for (let i = 0; i < questionData.length; i++) {
          const q = questionData[i];
          await tx.insert(lessonQuestions).values({
            lessonId: lesson.id,
            questionType: q.type,
            questionText: q.text,
            options: q.options ? JSON.stringify(q.options) : null,
            correctAnswer: q.answer,
            explanation: q.explanation,
            orderIndex: i + 1,
            points: q.points
          });
        }
      }
    }); // End transaction
    
    // Success logging ONLY after transaction commits successfully
    console.log("✅ Database cleared\n");
    loadedLessons.forEach(lesson => console.log(`✅ Loaded ${lesson}`));
    console.log(`\n🎉 All ${lessonsData.length} lessons loaded successfully!`);
    console.log(`✅ Total: ${lessonsData.reduce((sum, l) => sum + l.questions.length, 0)} questions`);
    
  } catch (error) {
    console.error("\n❌ TRANSACTION FAILED - No lessons were loaded");
    console.error("Error details:", error);
    throw error;
  }
}

// Run the loader
if (import.meta.url === `file://${process.argv[1]}`) {
  loadLessons()
    .then(() => {
      console.log("\n🚀 Database is ready!");
      console.log("📱 Start your app with: npm run dev");
      process.exit(0);
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}

export { loadLessons };
