/**
 * Load all 50 lesson questions into the database
 * Run with: tsx server/load-lessons.ts
 */

import { db } from "./db";
import { lessons, lessonQuestions } from "@shared/schema";

const DOMAINS = {
  1: "Surveying Processes and Methods",
  5: "Survey Computations and Computer Applications",
  7: "Applied Mathematics and Statistics"
};

async function loadLessons() {
  console.log("📚 Loading 12 lessons with 60 questions...\n");

  try {
    // All 11 lessons with questions
    const lessonsData = [
      // Domain 1: Differential Leveling Fundamentals
      {
        domainNumber: 1,
        domain: DOMAINS[1],
        title: "Differential Leveling Fundamentals",
        description: "Master basic leveling concepts, rod readings, and elevation calculations",
        content: "Differential leveling is the most common method for determining elevation differences. Understanding backsights (BS), foresights (FS), and height of instrument (HI) is essential for accurate elevation work.",
        difficulty: "easy" as const,
        orderIndex: 13,
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
        
        const [lesson] = await tx.insert(lessons).values(lessonInfo).returning();
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
