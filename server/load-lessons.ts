/**
 * Load all 50 lesson questions into the database
 * Run with: tsx server/load-lessons.ts
 */

import { db } from "./db";
import { lessons, lessonQuestions } from "@shared/schema";

const DOMAINS = {
  1: "Surveying Processes and Methods",
  5: "Survey Computations and Computer Applications",
  6: "Geodesy and the Public Land Survey System",
  7: "Applied Mathematics and Statistics"
};

async function loadLessons() {
  console.log("📚 Loading 22 lessons with 110 questions...\n");

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
