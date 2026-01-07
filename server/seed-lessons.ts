import { db } from "./db";
import { lessons, lessonQuestions } from "@shared/schema";
import { eq } from "drizzle-orm";
import { NCEES_DOMAINS } from "@shared/domains";
import { practicalProblems } from "./practical-problems";
import { allArchetypes, generateLessonVariations } from "@shared/questionArchetypes";

// Use centralized domain definitions from shared/domains.ts
const DOMAINS = NCEES_DOMAINS;

async function seedLessons() {
  console.log("Starting lesson seeding...");

  // Delete existing lessons
  await db.delete(lessons);
  console.log("Deleted existing lessons");

  const lessonsToCreate = [
    // ========== DOMAIN 0: Math Foundations (10 lessons) ==========
    {
      domainNumber: 0,
      domain: DOMAINS[0],
      title: "Basic Arithmetic and Order of Operations",
      description: "Master fundamental arithmetic operations and PEMDAS for surveying calculations",
      content: "Arithmetic is the foundation of all surveying math. Understanding order of operations (PEMDAS) ensures accurate calculations in the field and office.",
      difficulty: "easy",
      orderIndex: 1,
      estimatedMinutes: 15,
      suggestedWeek: 1,
      questions: [
        { type: "fill_in_blank", text: "Calculate: 12 + 8 × 2 = ___", answer: "28", explanation: "Following PEMDAS, multiply first: 8 × 2 = 16, then add: 12 + 16 = 28", points: 10 },
        { type: "multiple_choice", text: "What does PEMDAS stand for?", options: ["Please Excuse My Dear Aunt Sally", "Priority Evaluation Math Division Addition Subtraction", "Both represent order of operations", "None of the above"], answer: "2", explanation: "PEMDAS represents Parentheses, Exponents, Multiplication/Division, Addition/Subtraction", points: 10 },
        { type: "fill_in_blank", text: "Evaluate: (15 - 3) ÷ 4 = ___", answer: "3", explanation: "Parentheses first: (15-3) = 12, then divide: 12 ÷ 4 = 3", points: 10 },
        { type: "multiple_choice", text: "In the expression 2 + 3 × 4, which operation is performed first?", options: ["Addition", "Multiplication", "Both simultaneously", "Left to right"], answer: "1", explanation: "Multiplication has higher precedence than addition in PEMDAS", points: 10 },
        { type: "fill_in_blank", text: "Calculate: 100 - 25 × 2 = ___", answer: "50", explanation: "Multiply first: 25 × 2 = 50, then subtract: 100 - 50 = 50", points: 10 }
      ]
    },
    {
      domainNumber: 0,
      domain: DOMAINS[0],
      title: "Fractions and Decimals",
      description: "Convert and calculate with fractions and decimals in surveying measurements",
      content: "Surveyors work with mixed units requiring fraction-to-decimal conversions. Mastering these conversions is essential for accurate measurements.",
      difficulty: "easy",
      orderIndex: 2,
      estimatedMinutes: 20,
      suggestedWeek: 1,
      questions: [
        { type: "fill_in_blank", text: "Convert 3/4 to a decimal: ___", answer: "0.75", explanation: "3 ÷ 4 = 0.75", points: 10 },
        { type: "multiple_choice", text: "What is 1/2 + 1/4?", options: ["1/6", "2/6", "3/4", "1/8"], answer: "2", explanation: "1/2 = 2/4, so 2/4 + 1/4 = 3/4", points: 10 },
        { type: "fill_in_blank", text: "Convert 0.625 to a fraction in lowest terms (numerator/denominator, e.g., 5/8): ___", answer: "5/8", explanation: "0.625 = 625/1000 = 5/8 when reduced", points: 10 },
        { type: "multiple_choice", text: "A surveyor measures 5.25 feet. What is this in inches?", options: ["60 inches", "63 inches", "65 inches", "68 inches"], answer: "1", explanation: "5.25 feet × 12 inches/foot = 63 inches", points: 10 },
        { type: "fill_in_blank", text: "Calculate: 2.5 × 4 = ___", answer: "10", explanation: "2.5 × 4 = 10.0 = 10", points: 10 }
      ]
    },
    {
      domainNumber: 0,
      domain: DOMAINS[0],
      title: "Percentages and Ratios",
      description: "Apply percentages and ratios to slope, grade, and scale calculations",
      content: "Percentages express slopes and grades, while ratios define scales on maps and plans. These are critical for construction and mapping work.",
      difficulty: "easy",
      orderIndex: 3,
      estimatedMinutes: 18,
      suggestedWeek: 1,
      questions: [
        { type: "fill_in_blank", text: "A 2% grade rises ___ feet per 100 feet horizontally.", answer: "2", explanation: "2% means 2 per 100, so 2 feet rise", points: 10 },
        { type: "multiple_choice", text: "A map scale of 1:1200 means 1 inch equals:", options: ["12 feet", "120 feet", "1200 feet", "100 feet"], answer: "3", explanation: "1:1200 means 1 unit on map = 1200 units in reality. 1 inch = 1200 inches = 100 feet", points: 10 },
        { type: "fill_in_blank", text: "Convert the ratio 1:500 to a percentage: ___% (round to 2 decimals)", answer: "0.20", explanation: "1/500 = 0.002 = 0.20%", points: 10 },
        { type: "multiple_choice", text: "What is 15% of 200?", options: ["15", "20", "30", "35"], answer: "2", explanation: "0.15 × 200 = 30", points: 10 },
        { type: "fill_in_blank", text: "If a slope rises 5 feet over 100 feet horizontal, the percent grade is ___%. ", answer: "5", explanation: "Grade% = (rise/run) × 100 = (5/100) × 100 = 5%", points: 10 }
      ]
    },
    {
      domainNumber: 0,
      domain: DOMAINS[0],
      title: "Exponents and Radicals",
      description: "Work with powers, roots, and scientific notation in surveying formulas",
      content: "Many surveying formulas involve exponents and square roots. Understanding these operations is essential for distance, area, and curve calculations.",
      difficulty: "easy",
      orderIndex: 4,
      estimatedMinutes: 20,
      suggestedWeek: 1,
      questions: [
        { type: "fill_in_blank", text: "Calculate: 5² = ___", answer: "25", explanation: "5² = 5 × 5 = 25", points: 10 },
        { type: "fill_in_blank", text: "Find: √144 = ___", answer: "12", explanation: "12 × 12 = 144, so √144 = 12", points: 10 },
        { type: "multiple_choice", text: "What is 2³?", options: ["6", "8", "9", "12"], answer: "1", explanation: "2³ = 2 × 2 × 2 = 8", points: 10 },
        { type: "multiple_choice", text: "The distance formula contains which operation?", options: ["Cube root", "Square root", "Fourth power", "Logarithm"], answer: "1", explanation: "d = √[(x₂-x₁)² + (y₂-y₁)²] uses square root", points: 10 },
        { type: "fill_in_blank", text: "Simplify: √(9 + 16) = ___", answer: "5", explanation: "√(9+16) = √25 = 5", points: 10 }
      ]
    },
    {
      domainNumber: 0,
      domain: DOMAINS[0],
      title: "Right Triangle Basics",
      description: "Identify parts of right triangles and apply Pythagorean theorem",
      content: "Right triangles are fundamental to surveying. The Pythagorean theorem (a² + b² = c²) is used daily for distance and height calculations.",
      difficulty: "easy",
      orderIndex: 5,
      estimatedMinutes: 20,
      suggestedWeek: 2,
      questions: [
        { type: "multiple_choice", text: "In a right triangle, the longest side is called:", options: ["Adjacent", "Opposite", "Hypotenuse", "Base"], answer: "2", explanation: "The hypotenuse is always the longest side, opposite the right angle", points: 10 },
        { type: "fill_in_blank", text: "If a = 3 and b = 4, find c using Pythagorean theorem: c = ___", answer: "5", explanation: "c² = a² + b² = 9 + 16 = 25, so c = 5 (this is the 3-4-5 triangle)", points: 10 },
        { type: "multiple_choice", text: "The Pythagorean theorem only works for:", options: ["Any triangle", "Right triangles", "Equilateral triangles", "Isosceles triangles"], answer: "1", explanation: "Pythagorean theorem applies only to right triangles (90° angle)", points: 10 },
        { type: "fill_in_blank", text: "In a right triangle, if one leg is 8m and hypotenuse is 10m, the other leg is ___ meters.", answer: "6", explanation: "b² = c² - a² = 100 - 64 = 36, so b = 6m", points: 10 },
        { type: "multiple_choice", text: "Which of these is a Pythagorean triple?", options: ["2, 3, 4", "5, 12, 13", "7, 8, 9", "10, 11, 12"], answer: "1", explanation: "5² + 12² = 25 + 144 = 169 = 13²", points: 10 }
      ]
    },
    {
      domainNumber: 0,
      domain: DOMAINS[0],
      title: "Angle Measurement Systems",
      description: "Convert between degrees, minutes, seconds, and decimal degrees",
      content: "Surveyors use degrees-minutes-seconds (DMS) and decimal degrees (DD). Converting between these systems is essential for field work and computations.",
      difficulty: "medium",
      orderIndex: 6,
      estimatedMinutes: 22,
      suggestedWeek: 2,
      questions: [
        { type: "fill_in_blank", text: "Convert 30.5° to degrees and minutes: 30° ___'", answer: "30", explanation: "0.5° × 60'/degree = 30', so 30.5° = 30°30'", points: 10 },
        { type: "multiple_choice", text: "How many seconds are in 1 degree?", options: ["60", "360", "3600", "100"], answer: "2", explanation: "1° = 60' = 60 × 60\" = 3600\"", points: 10 },
        { type: "fill_in_blank", text: "Convert 45°30' to decimal degrees: ___° (round to 2 decimals)", answer: "45.50", explanation: "30'/60 = 0.5°, so 45°30' = 45.50°", points: 10 },
        { type: "multiple_choice", text: "A full circle contains how many degrees?", options: ["180°", "270°", "360°", "400°"], answer: "2", explanation: "A complete circle = 360 degrees", points: 10 },
        { type: "fill_in_blank", text: "Convert 15' (15 minutes) to decimal degrees: ___° (round to 2 decimals)", answer: "0.25", explanation: "15'/60 = 0.25°", points: 10 }
      ]
    },
    {
      domainNumber: 0,
      domain: DOMAINS[0],
      title: "Basic Geometry Shapes",
      description: "Calculate perimeters and areas of basic geometric shapes",
      content: "Land parcels often approximate basic shapes. Knowing formulas for rectangles, triangles, and circles enables quick area estimates.",
      difficulty: "easy",
      orderIndex: 7,
      estimatedMinutes: 18,
      suggestedWeek: 2,
      questions: [
        { type: "fill_in_blank", text: "The perimeter of a rectangle with length 20m and width 15m is ___ meters.", answer: "70", explanation: "Perimeter = 2(L+W) = 2(20+15) = 2(35) = 70m", points: 10 },
        { type: "multiple_choice", text: "The area of a circle is calculated using:", options: ["πr", "πr²", "2πr", "πd"], answer: "1", explanation: "Area of circle = πr² where r is radius", points: 10 },
        { type: "fill_in_blank", text: "A square with side length 8m has an area of ___ square meters.", answer: "64", explanation: "Area = s² = 8² = 64 m²", points: 10 },
        { type: "multiple_choice", text: "The formula for the area of a triangle is:", options: ["base × height", "½ × base × height", "base + height", "base² × height"], answer: "1", explanation: "Area of triangle = ½ × base × height", points: 10 },
        { type: "fill_in_blank", text: "A trapezoid with parallel sides 10m and 14m and height 6m has area ___ square meters.", answer: "72", explanation: "Area = ½(b₁+b₂)h = ½(10+14)(6) = ½(24)(6) = 72 m²", points: 10 }
      ]
    },
    {
      domainNumber: 0,
      domain: DOMAINS[0],
      title: "Linear Equations and Graphing",
      description: "Solve linear equations and understand slope-intercept form",
      content: "Linear equations model many surveying relationships. The slope-intercept form (y = mx + b) relates coordinates and gradients.",
      difficulty: "medium",
      orderIndex: 8,
      estimatedMinutes: 20,
      suggestedWeek: 3,
      questions: [
        { type: "fill_in_blank", text: "In the equation y = 3x + 5, the slope is ___.", answer: "3", explanation: "In y = mx + b format, m is the slope, so slope = 3", points: 10 },
        { type: "multiple_choice", text: "Solve for x: 5x - 10 = 20", options: ["x = 2", "x = 4", "x = 6", "x = 8"], answer: "2", explanation: "5x = 30, so x = 6", points: 10 },
        { type: "fill_in_blank", text: "In y = mx + b, the b represents the ___-intercept.", answer: "y", explanation: "b is the y-intercept (value of y when x = 0)", points: 10 },
        { type: "multiple_choice", text: "A line with slope 0 is:", options: ["Vertical", "Horizontal", "Diagonal", "Undefined"], answer: "1", explanation: "Slope 0 means no rise, creating a horizontal line", points: 10 },
        { type: "fill_in_blank", text: "Solve: 2x + 8 = 20. x = ___", answer: "6", explanation: "2x = 12, so x = 6", points: 10 }
      ]
    },
    {
      domainNumber: 0,
      domain: DOMAINS[0],
      title: "Scientific Calculator Operations",
      description: "Master calculator functions for surveying computations",
      content: "Scientific calculators perform trigonometric, logarithmic, and statistical functions essential for surveying. Proper mode settings and function use prevent errors.",
      difficulty: "easy",
      orderIndex: 9,
      estimatedMinutes: 15,
      suggestedWeek: 3,
      questions: [
        { type: "multiple_choice", text: "For angle calculations in surveying, the calculator should be in which mode?", options: ["Radians", "Degrees", "Gradians", "Either A or B"], answer: "1", explanation: "Surveyors primarily use degrees for angle measurements", points: 10 },
        { type: "multiple_choice", text: "The sin⁻¹ button calculates:", options: ["1 divided by sine", "Arcsine (inverse sine)", "Sine squared", "Negative sine"], answer: "1", explanation: "sin⁻¹ is the inverse sine function (arcsin), not 1/sin", points: 10 },
        { type: "fill_in_blank", text: "To calculate 15², you enter 15 then press the ___ button (two characters).", answer: "x²", explanation: "The x² button squares the displayed value", points: 10 },
        { type: "multiple_choice", text: "Memory functions (M+, MR, MC) are useful for:", options: ["Storing intermediate values", "Faster calculations", "Both A and B", "Neither"], answer: "2", explanation: "Memory stores values for multi-step calculations, speeding up work", points: 10 },
        { type: "multiple_choice", text: "When entering coordinates, which mode preserves trailing zeros?", options: ["Fix mode", "Sci mode", "Norm mode", "All modes"], answer: "0", explanation: "Fix mode displays a fixed number of decimal places", points: 10 }
      ]
    },
    {
      domainNumber: 0,
      domain: DOMAINS[0],
      title: "Significant Figures and Rounding",
      description: "Apply proper rounding and significant figure rules to measurements",
      content: "Precision matters in surveying. Understanding significant figures and proper rounding ensures measurements reflect actual accuracy and prevent false precision.",
      difficulty: "medium",
      orderIndex: 10,
      estimatedMinutes: 20,
      suggestedWeek: 3,
      questions: [
        { type: "fill_in_blank", text: "Round 45.678 to 2 decimal places: ___", answer: "45.68", explanation: "The third decimal is 8, so round the second decimal up: 45.68", points: 10 },
        { type: "multiple_choice", text: "How many significant figures are in 0.00450?", options: ["2", "3", "4", "5"], answer: "1", explanation: "Leading zeros don't count. Trailing zero after decimal does. Answer: 4, 5, 0 = 3 sig figs", points: 10 },
        { type: "multiple_choice", text: "When multiplying measurements, the result should have significant figures equal to:", options: ["The sum of sig figs", "The measurement with most sig figs", "The measurement with fewest sig figs", "Always 3"], answer: "2", explanation: "Product has sig figs of least precise measurement", points: 10 },
        { type: "fill_in_blank", text: "Round 127.5 to the nearest ten: ___", answer: "130", explanation: "127.5 is equidistant, round up to 130 (round-half-up rule)", points: 10 },
        { type: "multiple_choice", text: "A distance measured as 345.67 feet has how many significant figures?", options: ["3", "4", "5", "6"], answer: "2", explanation: "All digits 3, 4, 5, 6, 7 are significant = 5 sig figs", points: 10 }
      ]
    },

    // ========== DOMAIN 1: Surveying Processes and Methods (7 lessons) ==========
    {
      domainNumber: 1,
      domain: DOMAINS[1],
      title: "Total Station Setup and Operation",
      description: "Learn proper total station setup, leveling, and measurement procedures",
      content: "Total stations are the workhorse of modern surveying. Proper setup over a point, careful leveling, and systematic measurement procedures ensure accurate data collection.",
      difficulty: "medium",
      orderIndex: 1,
      estimatedMinutes: 25,
      suggestedWeek: 3,
      questions: [
        { type: "multiple_choice", text: "What is the first step when setting up a total station?", options: ["Turn on the instrument", "Level the instrument", "Set up over the point", "Take a backsight"], answer: "2", explanation: "First set up tripod over the point, then level, then turn on", points: 10 },
        { type: "multiple_choice", text: "The bubble in a circular level should be:", options: ["At the edge", "Centered", "Slightly off center", "It doesn't matter"], answer: "1", explanation: "The bubble must be centered to ensure the instrument is level", points: 10 },
        { type: "fill_in_blank", text: "Most total stations measure angles to the nearest ___ seconds (numeric answer).", answer: "1", explanation: "Modern total stations typically measure to 1\" or better precision", points: 10 },
        { type: "multiple_choice", text: "What is a backsight in surveying?", options: ["Looking backward", "A sight to a known point", "An error check", "A type of prism"], answer: "1", explanation: "A backsight is a reading to a known control point to orient the instrument", points: 10 },
        { type: "multiple_choice", text: "EDM stands for:", options: ["Electronic Data Management", "Electronic Distance Measurement", "Elevation Data Mapping", "Error Detection Mode"], answer: "1", explanation: "EDM (Electronic Distance Measurement) is the laser/infrared system in total stations", points: 10 }
      ]
    },
    {
      domainNumber: 1,
      domain: DOMAINS[1],
      title: "Differential Leveling Procedures",
      description: "Perform differential leveling to determine elevation differences",
      content: "Differential leveling establishes elevations by measuring vertical differences between points. Backsights, foresights, and turning points create a level circuit.",
      difficulty: "medium",
      orderIndex: 2,
      estimatedMinutes: 22,
      suggestedWeek: 4,
      questions: [
        { type: "multiple_choice", text: "In differential leveling, BS stands for:", options: ["Benchmark Station", "Backsight", "Baseline", "Bottom Sight"], answer: "1", explanation: "BS = Backsight, a rod reading on a point of known or previously determined elevation", points: 10 },
        { type: "fill_in_blank", text: "If HI (height of instrument) = 105.50m and FS (foresight) = 2.30m, the elevation is ___ meters.", answer: "103.20", explanation: "Elevation = HI - FS = 105.50 - 2.30 = 103.20m", points: 10 },
        { type: "multiple_choice", text: "A turning point (TP) is used to:", options: ["Change direction", "Transfer elevation", "Mark boundaries", "Indicate errors"], answer: "1", explanation: "TP transfers elevation from one setup to the next in a level circuit", points: 10 },
        { type: "multiple_choice", text: "The height of instrument (HI) is calculated by:", options: ["Elevation + BS", "Elevation - BS", "Elevation + FS", "Elevation - FS"], answer: "0", explanation: "HI = Known Elevation + Backsight reading", points: 10 },
        { type: "fill_in_blank", text: "If BM elevation = 100.00m and BS = 1.50m, the HI = ___ meters.", answer: "101.50", explanation: "HI = Elevation + BS = 100.00 + 1.50 = 101.50m", points: 10 }
      ]
    },
    {
      domainNumber: 1,
      domain: DOMAINS[1],
      title: "Traverse Methods and Types",
      description: "Understand open, closed, and loop traverses for control surveys",
      content: "Traverses establish horizontal control by measuring angles and distances between points. Closed traverses allow error checking and adjustment.",
      difficulty: "medium",
      orderIndex: 3,
      estimatedMinutes: 20,
      suggestedWeek: 4,
      questions: [
        { type: "multiple_choice", text: "Which traverse type allows for mathematical error checking?", options: ["Open traverse", "Closed traverse", "Random traverse", "All types"], answer: "1", explanation: "Closed traverses return to starting point or close to known points, allowing error calculation", points: 10 },
        { type: "multiple_choice", text: "In a closed loop traverse, the sum of interior angles should equal:", options: ["(n-2)×180°", "n×180°", "(n+2)×180°", "360°"], answer: "0", explanation: "For n-sided polygon: sum = (n-2)×180°", points: 10 },
        { type: "fill_in_blank", text: "A traverse with 5 sides should have interior angles summing to ___ degrees.", answer: "540", explanation: "(5-2)×180° = 3×180° = 540°", points: 10 },
        { type: "multiple_choice", text: "What is measured at each traverse station?", options: ["Only angles", "Only distances", "Both angles and distances", "Elevations"], answer: "2", explanation: "Traverses require both horizontal angles and distances between stations", points: 10 },
        { type: "multiple_choice", text: "An open traverse terminates at:", options: ["Starting point", "Another known point", "An unknown point", "Either B or C"], answer: "2", explanation: "Open traverses do not close on known points, preventing error checking", points: 10 }
      ]
    },
    {
      domainNumber: 1,
      domain: DOMAINS[1],
      title: "Control Surveys and Networks",
      description: "Establish horizontal and vertical control for project surveys",
      content: "Control surveys establish precise reference points for all other surveying work. Horizontal and vertical control networks provide the framework for mapping and construction.",
      difficulty: "medium",
      orderIndex: 4,
      estimatedMinutes: 23,
      suggestedWeek: 4,
      questions: [
        { type: "multiple_choice", text: "Horizontal control establishes:", options: ["Elevations", "Positions (coordinates)", "Both A and B", "Neither"], answer: "1", explanation: "Horizontal control provides X,Y coordinates (position)", points: 10 },
        { type: "multiple_choice", text: "Vertical control establishes:", options: ["Elevations (Z coordinates)", "Horizontal positions", "Angles", "Distances"], answer: "0", explanation: "Vertical control provides elevation (Z) information", points: 10 },
        { type: "multiple_choice", text: "A benchmark (BM) is used for:", options: ["Horizontal control", "Vertical control", "Both", "Boundary markers"], answer: "1", explanation: "Benchmarks are permanent points of known elevation for vertical control", points: 10 },
        { type: "fill_in_blank", text: "NGS stands for National ___ Survey (one word).", answer: "Geodetic", explanation: "NGS = National Geodetic Survey, the US agency managing control networks", points: 10 },
        { type: "multiple_choice", text: "Which order of control is most precise?", options: ["First Order", "Second Order", "Third Order", "All equal"], answer: "0", explanation: "First Order has the highest accuracy standards, Second Order next, etc.", points: 10 }
      ]
    },
    {
      domainNumber: 1,
      domain: DOMAINS[1],
      title: "Field Note Keeping and Documentation",
      description: "Maintain proper field notes and survey documentation standards",
      content: "Field notes are legal documents. Proper organization, clarity, and completeness are essential. Notes must be permanent, clear, and follow standard conventions.",
      difficulty: "easy",
      orderIndex: 5,
      estimatedMinutes: 18,
      suggestedWeek: 5,
      questions: [
        { type: "multiple_choice", text: "Field notes should be recorded in:", options: ["Pencil (erasable)", "Permanent ink", "Either A or B", "Computer only"], answer: "1", explanation: "Field notes must be in permanent ink as they are legal documents", points: 10 },
        { type: "multiple_choice", text: "If an error is made in field notes, you should:", options: ["Erase it", "Use whiteout", "Draw a single line through it", "Start new page"], answer: "2", explanation: "Draw single line through error, write correction nearby, never erase or obliterate", points: 10 },
        { type: "multiple_choice", text: "Field notes should include:", options: ["Date and weather", "Party members", "Equipment used", "All of the above"], answer: "3", explanation: "All information is important for legal defensibility and future reference", points: 10 },
        { type: "fill_in_blank", text: "Field notes are considered ___ documents (legal/informal).", answer: "legal", explanation: "Field notes can be used as evidence in court and must be maintained properly", points: 10 },
        { type: "multiple_choice", text: "Sketches in field notes should be:", options: ["To scale", "Neatly drawn", "Not to scale but clear", "Optional"], answer: "2", explanation: "Sketches don't need to be to scale but must be clear and show relationships", points: 10 }
      ]
    },
    {
      domainNumber: 1,
      domain: DOMAINS[1],
      title: "GPS/GNSS Survey Methods",
      description: "Apply GPS observation techniques for control and boundary surveys",
      content: "GPS (Global Positioning System) and GNSS (Global Navigation Satellite Systems) provide precise positioning. Static, rapid static, and RTK methods suit different applications.",
      difficulty: "hard",
      orderIndex: 6,
      estimatedMinutes: 25,
      suggestedWeek: 5,
      questions: [
        { type: "multiple_choice", text: "GNSS includes which satellite systems?", options: ["GPS only", "GPS and GLONASS", "GPS, GLONASS, Galileo, BeiDou", "GPS and Galileo only"], answer: "2", explanation: "GNSS encompasses GPS (US), GLONASS (Russia), Galileo (EU), and BeiDou (China)", points: 10 },
        { type: "multiple_choice", text: "Which GPS method provides real-time centimeter accuracy?", options: ["Static", "Rapid static", "RTK (Real-Time Kinematic)", "WAAS"], answer: "2", explanation: "RTK uses radio corrections from base station for real-time cm accuracy", points: 10 },
        { type: "multiple_choice", text: "Static GPS observations typically require:", options: ["Few seconds", "5-10 minutes", "30+ minutes", "24 hours"], answer: "2", explanation: "Static GPS requires extended observations (30 min to hours) for highest accuracy", points: 10 },
        { type: "fill_in_blank", text: "GPS requires line of sight to at least ___ satellites (number).", answer: "4", explanation: "Minimum 4 satellites needed for 3D position (X, Y, Z, time)", points: 10 },
        { type: "multiple_choice", text: "PDOP refers to:", options: ["Satellite signal strength", "Geometric satellite distribution", "Number of satellites", "Atmospheric conditions"], answer: "1", explanation: "PDOP (Position Dilution of Precision) measures satellite geometry quality", points: 10 }
      ]
    },
    {
      domainNumber: 1,
      domain: DOMAINS[1],
      title: "Error Sources and Mitigation",
      description: "Identify and minimize errors in surveying measurements",
      content: "Surveying errors are systematic, random, or gross. Understanding error sources and proper field procedures minimizes their impact on final results.",
      difficulty: "medium",
      orderIndex: 7,
      estimatedMinutes: 22,
      suggestedWeek: 5,
      questions: [
        { type: "multiple_choice", text: "Which error type can be eliminated by calibration?", options: ["Random error", "Systematic error", "Gross error", "None"], answer: "1", explanation: "Systematic errors are consistent and can be removed by proper calibration", points: 10 },
        { type: "multiple_choice", text: "A mistake in reading a rod is what type of error?", options: ["Random", "Systematic", "Gross (blunder)", "Acceptable"], answer: "2", explanation: "Mistakes/blunders are gross errors and must be detected and removed", points: 10 },
        { type: "multiple_choice", text: "Atmospheric refraction affects:", options: ["Angles only", "Distances only", "Both angles and distances", "Neither"], answer: "2", explanation: "Refraction bends light, affecting both angle and distance measurements", points: 10 },
        { type: "multiple_choice", text: "Double centering (measuring in two faces) helps eliminate:", options: ["Random errors", "Instrument errors", "Weather effects", "Nothing"], answer: "1", explanation: "Two-face measurements average out many systematic instrument errors", points: 10 },
        { type: "fill_in_blank", text: "The method of measuring angles twice and averaging is called double ___.", answer: "centering", explanation: "Double centering (or two-face measurements) involves measuring in direct and reverse", points: 10 }
      ]
    },

    // ========== DOMAIN 2: Mapping Processes and Methods (7 lessons) ==========
    {
      domainNumber: 2,
      domain: DOMAINS[2],
      title: "Map Scales and Scale Factors",
      description: "Convert between different map scales and apply scale factors",
      content: "Map scale relates map distances to ground distances. Understanding representative fractions, verbal scales, and graphic scales is essential for map reading and creation.",
      difficulty: "easy",
      orderIndex: 1,
      estimatedMinutes: 20,
      suggestedWeek: 6,
      questions: [
        { type: "fill_in_blank", text: "On a map with scale 1:2400, 1 inch on map equals ___ feet on ground (1 inch = 1/12 foot).", answer: "200", explanation: "1 inch on map = 2400 inches ground = 2400/12 = 200 feet", points: 10 },
        { type: "multiple_choice", text: "A representative fraction of 1:24000 means:", options: ["1 unit = 24000 units", "24000 units = 1 unit", "Scale is 1/24", "None of these"], answer: "0", explanation: "RF shows ratio: 1 map unit represents 24,000 ground units", points: 10 },
        { type: "multiple_choice", text: "Which scale shows more detail?", options: ["1:1200", "1:2400", "1:12000", "1:24000"], answer: "0", explanation: "Smaller denominators show more detail (larger scale)", points: 10 },
        { type: "fill_in_blank", text: "A scale of 1 inch = 100 feet is equivalent to 1:___ (number only).", answer: "1200", explanation: "100 feet × 12 inches/foot = 1200 inches, so 1:1200", points: 10 },
        { type: "multiple_choice", text: "A graphic scale on a map:", options: ["Changes if map is copied", "Remains proportional if copied", "Is less accurate", "Is obsolete"], answer: "1", explanation: "Graphic (bar) scales remain accurate even if map is enlarged or reduced", points: 10 }
      ]
    },
    {
      domainNumber: 2,
      domain: DOMAINS[2],
      title: "Topographic Maps and Contours",
      description: "Read and interpret contour lines and topographic features",
      content: "Contour lines connect points of equal elevation. Understanding contour intervals, index contours, and map symbols allows visualization of terrain from 2D maps.",
      difficulty: "medium",
      orderIndex: 2,
      estimatedMinutes: 22,
      suggestedWeek: 6,
      questions: [
        { type: "multiple_choice", text: "Closely spaced contours indicate:", options: ["Flat terrain", "Steep terrain", "Water", "Errors"], answer: "1", explanation: "Closer contours = steeper slope (more elevation change in shorter distance)", points: 10 },
        { type: "fill_in_blank", text: "If contour interval is 5 feet and contours are labeled 100, 105, 110, the slope rises ___ feet in 3 contour intervals.", answer: "15", explanation: "3 intervals × 5 feet/interval = 15 feet rise", points: 10 },
        { type: "multiple_choice", text: "Index contours are:", options: ["Every 5th contour", "Bolder and labeled", "Both A and B", "Unlabeled"], answer: "2", explanation: "Index contours (typically every 5th) are drawn heavier and labeled with elevation", points: 10 },
        { type: "multiple_choice", text: "Contour lines never:", options: ["Cross each other", "Form closed loops", "Show depressions", "Bend"], answer: "0", explanation: "Contours can't cross (except vertical cliff) as a point can't have two elevations", points: 10 },
        { type: "multiple_choice", text: "Hachures on contours indicate:", options: ["Steep slopes", "Depressions", "Boundaries", "Roads"], answer: "1", explanation: "Hachures (tick marks) point downhill into depressions", points: 10 }
      ]
    },
    {
      domainNumber: 2,
      domain: DOMAINS[2],
      title: "Coordinate Systems and Datums",
      description: "Understand State Plane, UTM, and geodetic datums",
      content: "Coordinate systems project the curved Earth onto flat maps. State Plane and UTM are common in surveying. Datums define the reference ellipsoid.",
      difficulty: "hard",
      orderIndex: 3,
      estimatedMinutes: 25,
      suggestedWeek: 6,
      questions: [
        { type: "multiple_choice", text: "State Plane Coordinate Systems use which projection types?", options: ["Mercator only", "Lambert Conformal Conic and Transverse Mercator", "Stereographic only", "No projection"], answer: "1", explanation: "State Plane uses Lambert for E-W states, Transverse Mercator for N-S states", points: 10 },
        { type: "multiple_choice", text: "NAD83 is a:", options: ["Projection", "Datum", "Coordinate system", "Map scale"], answer: "1", explanation: "NAD83 (North American Datum 1983) is a geodetic datum/reference frame", points: 10 },
        { type: "multiple_choice", text: "Grid coordinates differ from ground coordinates due to:", options: ["Errors", "Scale factors", "Temperature", "Nothing"], answer: "1", explanation: "Map projections introduce scale factors; grid distance ≠ ground distance", points: 10 },
        { type: "fill_in_blank", text: "UTM divides Earth into ___ degree wide zones (number).", answer: "6", explanation: "UTM (Universal Transverse Mercator) uses 6° wide zones numbered 1-60", points: 10 },
        { type: "multiple_choice", text: "Which datum is most current for US surveys?", options: ["NAD27", "NAD83", "WGS84", "Both B and C"], answer: "1", explanation: "NAD83 is standard for US. WGS84 is similar but used for GPS globally", points: 10 }
      ]
    },
    {
      domainNumber: 2,
      domain: DOMAINS[2],
      title: "GIS Fundamentals and Applications",
      description: "Apply GIS concepts to spatial data management and analysis",
      content: "Geographic Information Systems (GIS) organize, analyze, and display spatial data. Understanding layers, attributes, and spatial analysis enhances surveying work.",
      difficulty: "medium",
      orderIndex: 4,
      estimatedMinutes: 20,
      suggestedWeek: 7,
      questions: [
        { type: "multiple_choice", text: "In GIS, vector data represents features as:", options: ["Grid cells", "Points, lines, polygons", "Continuous surfaces", "Photographs"], answer: "1", explanation: "Vector data uses discrete points, lines (polylines), and polygons", points: 10 },
        { type: "multiple_choice", text: "Raster data in GIS is organized as:", options: ["Points and lines", "Grid of cells", "Polygons", "Text"], answer: "1", explanation: "Raster data is grid-based with each cell having a value (like digital photos)", points: 10 },
        { type: "multiple_choice", text: "An attribute table in GIS contains:", options: ["Geometric data only", "Descriptive data only", "Both geometry and descriptive data", "Map symbols"], answer: "1", explanation: "Attributes are descriptive (non-spatial) data linked to features", points: 10 },
        { type: "fill_in_blank", text: "GIS stands for Geographic ___ Systems (two words).", answer: "Information", explanation: "GIS = Geographic Information Systems", points: 10 },
        { type: "multiple_choice", text: "A buffer operation in GIS creates:", options: ["Random areas", "Zones around features", "New points", "Errors"], answer: "1", explanation: "Buffering creates polygons at specified distance around features", points: 10 }
      ]
    },
    {
      domainNumber: 2,
      domain: DOMAINS[2],
      title: "Photogrammetry Basics",
      description: "Understand aerial photography and photogrammetric principles",
      content: "Photogrammetry extracts measurements from photographs. Aerial photos provide data for mapping, volume calculations, and terrain modeling.",
      difficulty: "medium",
      orderIndex: 5,
      estimatedMinutes: 23,
      suggestedWeek: 7,
      questions: [
        { type: "multiple_choice", text: "Stereoscopic viewing of aerial photos allows:", options: ["Color enhancement", "3D perception", "Better resolution", "Nothing special"], answer: "1", explanation: "Overlapping photos viewed together create 3D stereo model for elevation extraction", points: 10 },
        { type: "multiple_choice", text: "Photo scale depends on:", options: ["Flying height only", "Focal length only", "Both flying height and focal length", "Neither"], answer: "2", explanation: "Photo scale = focal length / flying height above ground", points: 10 },
        { type: "fill_in_blank", text: "If camera focal length = 6 inches and flying height = 6000 feet above ground, photo scale is 1:___ (number only).", answer: "12000", explanation: "Scale = 6 inches / 6000 feet = 6 / 72000 inches = 1/12000", points: 10 },
        { type: "multiple_choice", text: "Ground control points in photogrammetry:", options: ["Are optional", "Provide scale and orientation", "Only show boundaries", "Are used in GIS only"], answer: "1", explanation: "GCPs are surveyed points that control photo orientation and scale", points: 10 },
        { type: "multiple_choice", text: "Orthophotos differ from regular aerial photos by:", options: ["Being in color", "Having uniform scale", "Being larger", "Nothing"], answer: "1", explanation: "Orthophotos are corrected to uniform scale, removing tilt and relief displacement", points: 10 }
      ]
    },
    {
      domainNumber: 2,
      domain: DOMAINS[2],
      title: "LiDAR and Remote Sensing",
      description: "Apply LiDAR technology for terrain modeling and mapping",
      content: "LiDAR (Light Detection and Ranging) uses laser pulses to create detailed elevation models. Multiple returns allow seeing through vegetation to ground.",
      difficulty: "medium",
      orderIndex: 6,
      estimatedMinutes: 20,
      suggestedWeek: 7,
      questions: [
        { type: "fill_in_blank", text: "LiDAR stands for Light Detection and ___.", answer: "Ranging", explanation: "LiDAR = Light Detection and Ranging", points: 10 },
        { type: "multiple_choice", text: "LiDAR data is typically delivered as:", options: ["JPG images", "Point clouds", "Vector lines", "Paper maps"], answer: "1", explanation: "LiDAR produces dense 3D point clouds with XYZ coordinates for each point", points: 10 },
        { type: "multiple_choice", text: "First return LiDAR typically represents:", options: ["Ground", "Canopy/vegetation top", "Buildings", "Water"], answer: "1", explanation: "First return is usually treetops or building roofs (highest object hit)", points: 10 },
        { type: "multiple_choice", text: "Last return LiDAR typically represents:", options: ["Canopy", "Ground surface", "Buildings", "Sky"], answer: "1", explanation: "Last return usually reaches ground under vegetation", points: 10 },
        { type: "multiple_choice", text: "A DEM is a:", options: ["Digital Elevation Model", "Digital Error Measurement", "Data Entry Method", "Distance Evaluation Mode"], answer: "0", explanation: "DEM = Digital Elevation Model, representing terrain surface", points: 10 }
      ]
    },
    {
      domainNumber: 2,
      domain: DOMAINS[2],
      title: "CAD for Surveying",
      description: "Use CAD software for survey drawings and plat preparation",
      content: "Computer-Aided Design (CAD) is essential for producing survey drawings, plats, and plans. Layers, symbols, and precise drafting create professional deliverables.",
      difficulty: "easy",
      orderIndex: 7,
      estimatedMinutes: 18,
      suggestedWeek: 8,
      questions: [
        { type: "multiple_choice", text: "CAD layers are used to:", options: ["Add colors", "Organize different feature types", "Make files larger", "Nothing"], answer: "1", explanation: "Layers separate features (property lines, topo, utilities, etc.) for organization and control", points: 10 },
        { type: "multiple_choice", text: "In CAD, a block is:", options: ["A grouped set of objects", "A solid shape", "An error", "A layer"], answer: "0", explanation: "Blocks group objects (like symbols) that can be inserted repeatedly", points: 10 },
        { type: "fill_in_blank", text: "CAD stands for Computer-Aided ___.", answer: "Design", explanation: "CAD = Computer-Aided Design", points: 10 },
        { type: "multiple_choice", text: "The CAD file format .DWG is associated with:", options: ["MicroStation", "AutoCAD", "ArcGIS", "Google Earth"], answer: "1", explanation: ".DWG is AutoCAD's native file format", points: 10 },
        { type: "multiple_choice", text: "Annotation in CAD refers to:", options: ["Text and labels", "Colors", "Layers", "Coordinates"], answer: "0", explanation: "Annotations are text, dimensions, labels, and notes added to drawings", points: 10 }
      ]
    },
    {
      domainNumber: 2,
      domain: DOMAINS[2],
      title: "UAS/Drone Operations and Regulations",
      description: "Understand drone surveying including FAA regulations and flight planning",
      content: "Unmanned Aircraft Systems (UAS/drones) enable efficient aerial data collection. FAA Part 107 regulations govern commercial operations. Flight planning, safety, and data processing are essential skills.",
      difficulty: "medium",
      orderIndex: 9,
      estimatedMinutes: 22,
      suggestedWeek: 8,
      questions: [
        { type: "multiple_choice", text: "Commercial drone operations require:", options: ["No certification", "FAA Part 107 Remote Pilot Certificate", "Pilot's license only", "State permit only"], answer: "1", explanation: "FAA Part 107 certification required for commercial UAS operations", points: 10 },
        { type: "multiple_choice", text: "Maximum altitude for Part 107 UAS operations is:", options: ["100 feet AGL", "200 feet AGL", "400 feet AGL", "Unlimited"], answer: "2", explanation: "Part 107 limits UAS to 400 feet AGL unless within 400 feet of a structure", points: 10 },
        { type: "fill_in_blank", text: "UAS stands for Unmanned Aircraft ___.", answer: "System", explanation: "UAS = Unmanned Aircraft System (includes aircraft, controller, and communication links)", points: 10 },
        { type: "multiple_choice", text: "Ground control points (GCPs) in drone mapping:", options: ["Are never needed", "Improve accuracy and georeferencing", "Only for indoor flights", "Reduce data quality"], answer: "1", explanation: "GCPs provide known coordinates to improve photogrammetric accuracy", points: 10 },
        { type: "multiple_choice", text: "Before flying a drone for surveying, the operator must:", options: ["Just charge batteries", "Check airspace, weather, and site conditions", "Only notify the client", "Nothing special"], answer: "1", explanation: "Pre-flight planning includes airspace authorization, weather check, and site hazard assessment", points: 10 }
      ]
    },

    // ========== DOMAIN 3: Boundary Law and Real Property Principles (7 lessons) ==========
    {
      domainNumber: 3,
      domain: DOMAINS[3],
      title: "Property Rights and Interests",
      description: "Understand different types of property ownership and rights",
      content: "Property rights include fee simple, easements, rights-of-way, and encumbrances. Surveyors must recognize these interests when retracing boundaries.",
      difficulty: "medium",
      orderIndex: 1,
      estimatedMinutes: 20,
      suggestedWeek: 8,
      questions: [
        { type: "multiple_choice", text: "Fee simple ownership represents:", options: ["Temporary use", "Complete ownership", "Easement only", "Rental rights"], answer: "1", explanation: "Fee simple is the highest form of ownership with full rights", points: 10 },
        { type: "multiple_choice", text: "An easement grants:", options: ["Full ownership", "Right to use for specific purpose", "Temporary lease", "Nothing"], answer: "1", explanation: "Easements allow use of another's property for specified purpose (access, utilities, etc.)", points: 10 },
        { type: "multiple_choice", text: "A right-of-way is typically:", options: ["A full ownership", "A type of easement", "A boundary marker", "Temporary"], answer: "1", explanation: "ROW is an easement for passage (roads, pipelines, power lines, etc.)", points: 10 },
        { type: "fill_in_blank", text: "An encumbrance is a claim or ___ on property.", answer: "lien", explanation: "Encumbrances are claims, liens, easements, or restrictions affecting property", points: 10 },
        { type: "multiple_choice", text: "Riparian rights relate to:", options: ["Minerals", "Water", "Air", "Timber"], answer: "1", explanation: "Riparian rights govern water use for properties adjacent to watercourses", points: 10 }
      ]
    },
    {
      domainNumber: 3,
      domain: DOMAINS[3],
      title: "Metes and Bounds Descriptions",
      description: "Read and write legal boundary descriptions using metes and bounds",
      content: "Metes and bounds describe property using bearings, distances, and monuments. Proper sequence and closure are essential for valid descriptions.",
      difficulty: "medium",
      orderIndex: 2,
      estimatedMinutes: 23,
      suggestedWeek: 8,
      questions: [
        { type: "multiple_choice", text: "In metes and bounds, 'metes' refers to:", options: ["Monuments", "Measurements (bearings and distances)", "Boundaries", "Corners"], answer: "1", explanation: "'Metes' = measurements (distances and directions), 'Bounds' = boundaries/limits", points: 10 },
        { type: "multiple_choice", text: "A proper metes and bounds description must:", options: ["Start anywhere", "Return to starting point", "Never close", "Use only monuments"], answer: "1", explanation: "Descriptions must close by returning to Point of Beginning (POB)", points: 10 },
        { type: "fill_in_blank", text: "POB stands for Point of ___.", answer: "Beginning", explanation: "POB = Point of Beginning, where the description starts and ends", points: 10 },
        { type: "multiple_choice", text: "Monuments in boundary descriptions are:", options: ["Physical markers", "Measurements", "Bearings", "Maps"], answer: "0", explanation: "Monuments are physical objects marking corners/points (stones, pipes, trees, etc.)", points: 10 },
        { type: "multiple_choice", text: "A call in a deed description includes:", options: ["Bearing only", "Distance only", "Both bearing and distance", "Neither"], answer: "2", explanation: "Each 'call' specifies direction (bearing) and distance to next point", points: 10 }
      ]
    },
    {
      domainNumber: 3,
      domain: DOMAINS[3],
      title: "Evidence and Hierarchy of Calls",
      description: "Apply rules for resolving conflicts in boundary descriptions",
      content: "When deed elements conflict, legal precedence rules apply. Natural monuments typically prevail over measurements, which prevail over calculated areas.",
      difficulty: "hard",
      orderIndex: 3,
      estimatedMinutes: 25,
      suggestedWeek: 9,
      questions: [
        { type: "multiple_choice", text: "In most jurisdictions, which has highest priority?", options: ["Area (acres)", "Distance", "Natural monument", "Bearing"], answer: "2", explanation: "Typical hierarchy: Natural monuments > Artificial monuments > Bearings/Distances > Area", points: 10 },
        { type: "multiple_choice", text: "If a deed says 'N45°E 100 feet to an oak tree' but the oak is at 95 feet, the corner is:", options: ["At 100 feet", "At the oak tree", "Between them", "Undefined"], answer: "1", explanation: "Monument (oak tree) controls over distance measurement", points: 10 },
        { type: "multiple_choice", text: "Original monuments are preferred over:", options: ["Newer monuments", "Measurements", "Both A and B", "Neither"], answer: "2", explanation: "Original monuments from first survey have highest priority", points: 10 },
        { type: "multiple_choice", text: "Parol evidence (oral testimony) can:", options: ["Never be used", "Clarify ambiguities", "Override deeds", "Create boundaries"], answer: "1", explanation: "Testimony can clarify ambiguous deeds but can't contradict clear written evidence", points: 10 },
        { type: "fill_in_blank", text: "A natural monument might be a river, tree, or ___ (one word, geographic feature).", answer: "rock", explanation: "Natural monuments include rivers, streams, rocks, trees, ridges, etc.", points: 10 }
      ]
    },
    {
      domainNumber: 3,
      domain: DOMAINS[3],
      title: "Adverse Possession and Prescription",
      description: "Understand how property rights can be acquired through use",
      content: "Adverse possession allows acquiring title through open, continuous, hostile use for statutory period. Prescription creates easement rights similarly.",
      difficulty: "hard",
      orderIndex: 4,
      estimatedMinutes: 22,
      suggestedWeek: 9,
      questions: [
        { type: "multiple_choice", text: "Adverse possession requires use that is:", options: ["Secret", "Open and notorious", "Permissive", "Occasional"], answer: "1", explanation: "Use must be open, notorious, continuous, exclusive, and hostile for statutory period", points: 10 },
        { type: "multiple_choice", text: "The statutory period for adverse possession is typically:", options: ["1-5 years", "7-20 years", "30-40 years", "50+ years"], answer: "1", explanation: "Most states require 7-20 years of adverse use (varies by state)", points: 10 },
        { type: "multiple_choice", text: "'Hostile' use means:", options: ["Angry", "Without permission", "Violent", "Hidden"], answer: "1", explanation: "Hostile = without owner's permission, adverse to owner's rights", points: 10 },
        { type: "fill_in_blank", text: "Prescription creates an ___ right, not ownership (starts with 'e').", answer: "easement", explanation: "Prescription results in easement rights through continuous use", points: 10 },
        { type: "multiple_choice", text: "Can you adversely possess government land?", options: ["Yes, always", "No, generally not", "Only federal land", "Only state land"], answer: "1", explanation: "Most jurisdictions prohibit adverse possession of public/government lands", points: 10 }
      ]
    },
    {
      domainNumber: 3,
      domain: DOMAINS[3],
      title: "Riparian and Littoral Rights",
      description: "Apply legal principles for properties adjacent to water",
      content: "Water boundaries are complex. Riparian rights apply to flowing water, littoral to lakes/seas. Accretion, erosion, and avulsion affect boundaries differently.",
      difficulty: "hard",
      orderIndex: 5,
      estimatedMinutes: 23,
      suggestedWeek: 9,
      questions: [
        { type: "multiple_choice", text: "Riparian rights apply to property adjacent to:", options: ["Lakes", "Rivers/streams", "Oceans", "Ponds"], answer: "1", explanation: "Riparian = flowing water (rivers, streams); Littoral = still water (lakes, seas)", points: 10 },
        { type: "multiple_choice", text: "Accretion is:", options: ["Sudden land loss", "Gradual land addition", "Flooding", "Erosion"], answer: "1", explanation: "Accretion = gradual deposit of soil by water, becomes owner's property", points: 10 },
        { type: "multiple_choice", text: "Avulsion is:", options: ["Gradual change", "Sudden change", "Normal flow", "Dry land"], answer: "1", explanation: "Avulsion = sudden change in watercourse (flood, storm); boundary doesn't move", points: 10 },
        { type: "multiple_choice", text: "When a navigable river changes course gradually:", options: ["Boundary stays at old location", "Boundary follows new channel", "Boundary is undefined", "Government takes ownership"], answer: "1", explanation: "For gradual changes (accretion/erosion), boundary follows ambulatory water line", points: 10 },
        { type: "fill_in_blank", text: "The gradual wearing away of land by water is called ___.", answer: "erosion", explanation: "Erosion removes land; accretion adds land (both gradual)", points: 10 }
      ]
    },
    {
      domainNumber: 3,
      domain: DOMAINS[3],
      title: "Public Land Survey System (PLSS)",
      description: "Navigate townships, ranges, and sections in PLSS states",
      content: "The PLSS divides land into townships (6x6 miles), sections (1 sq mile), and smaller aliquot parts. Understanding this system is essential for western U.S. surveys.",
      difficulty: "medium",
      orderIndex: 6,
      estimatedMinutes: 20,
      suggestedWeek: 10,
      questions: [
        { type: "fill_in_blank", text: "A township is ___ miles square.", answer: "6", explanation: "Township = 6 miles × 6 miles = 36 square miles = 36 sections", points: 10 },
        { type: "fill_in_blank", text: "A section contains ___ acres.", answer: "640", explanation: "1 section = 1 mi² = 640 acres", points: 10 },
        { type: "multiple_choice", text: "How many sections are in a township?", options: ["16", "24", "36", "64"], answer: "2", explanation: "Township = 6×6 miles = 36 sections (numbered 1-36)", points: 10 },
        { type: "fill_in_blank", text: "A quarter section contains ___ acres.", answer: "160", explanation: "1/4 of 640 acres = 160 acres", points: 10 },
        { type: "multiple_choice", text: "Township and Range are referenced from:", options: ["County lines", "Principal Meridian and Base Line", "State boundaries", "City centers"], answer: "1", explanation: "Townships count north/south from Base Line; Ranges count east/west from Principal Meridian", points: 10 }
      ]
    },
    {
      domainNumber: 3,
      domain: DOMAINS[3],
      title: "Boundary Retracement vs. Establishment",
      description: "Distinguish between retracing existing boundaries and creating new ones",
      content: "Retracement recovers original boundary locations using evidence. Establishment creates new boundaries where none existed. Different rules and standards apply.",
      difficulty: "medium",
      orderIndex: 7,
      estimatedMinutes: 20,
      suggestedWeek: 10,
      questions: [
        { type: "multiple_choice", text: "When retracing a boundary, the surveyor's job is to:", options: ["Create the best boundary", "Find the original boundary", "Average all evidence", "Establish new corners"], answer: "1", explanation: "Retracement recovers what was originally established, not create something new", points: 10 },
        { type: "multiple_choice", text: "Original survey monuments are:", options: ["Advisory only", "Conclusive evidence", "Can be moved", "Optional"], answer: "1", explanation: "Original monuments define boundary location and are highest evidence", points: 10 },
        { type: "multiple_choice", text: "In a subdivision, lot boundaries are:", options: ["Retraced", "Established", "Arbitrary", "Undefined"], answer: "1", explanation: "Subdivisions establish new boundaries creating lots from larger parcels", points: 10 },
        { type: "multiple_choice", text: "A resurvey should:", options: ["Improve the original", "Follow the original", "Create new corners", "Ignore old evidence"], answer: "1", explanation: "Resurveys retrace and recover original survey, not redo or improve it", points: 10 },
        { type: "fill_in_blank", text: "Following the original surveyor's footsteps is called ___ (starts with 'r').", answer: "retracement", explanation: "Retracement = following original survey to recover boundaries", points: 10 }
      ]
    },

    // ========== DOMAIN 4: Surveying Principles (7 lessons) ==========
    {
      domainNumber: 4,
      domain: DOMAINS[4],
      title: "Horizontal Curves: Elements and Formulas",
      description: "Calculate curve elements for route surveying",
      content: "Horizontal curves connect straight sections of roads and railroads. Key elements include radius, delta angle, tangent distance, length, and curve degree.",
      difficulty: "hard",
      orderIndex: 1,
      estimatedMinutes: 25,
      suggestedWeek: 10,
      questions: [
        { type: "multiple_choice", text: "The delta angle (Δ) of a curve is:", options: ["The radius", "The central angle", "The tangent length", "The curve length"], answer: "1", explanation: "Delta (Δ) is the central angle subtended by the curve", points: 10 },
        { type: "multiple_choice", text: "For a curve, T = R tan(Δ/2). T represents:", options: ["Total length", "Tangent distance", "Radius", "Delta"], answer: "1", explanation: "T = tangent distance from PI to PC or PT", points: 10 },
        { type: "fill_in_blank", text: "If R = 200 ft and Δ = 60°, the tangent T = 200 × tan(30°) ≈ ___ feet (round to nearest whole number).", answer: "115", explanation: "T = 200 × tan(30°) = 200 × 0.577 = 115.4 ≈ 115 feet", points: 10 },
        { type: "multiple_choice", text: "PC stands for:", options: ["Point of Curve", "Point of Center", "Point of Calculation", "Principal Corner"], answer: "0", explanation: "PC = Point of Curve (where curve begins); PT = Point of Tangent (where curve ends)", points: 10 },
        { type: "multiple_choice", text: "Curve length L is calculated by:", options: ["L = R × Δ (Δ in radians)", "L = R/Δ", "L = R + Δ", "L = Δ/R"], answer: "0", explanation: "L = R × Δ where Δ must be in radians (or L = πRΔ/180 if Δ in degrees)", points: 10 }
      ]
    },
    {
      domainNumber: 4,
      domain: DOMAINS[4],
      title: "Vertical Curves and Grade Changes",
      description: "Design vertical curves for highway and railway profiles",
      content: "Vertical curves provide smooth transitions between grade changes. Parabolic curves ensure constant rate of grade change for vehicle safety and drainage.",
      difficulty: "hard",
      orderIndex: 2,
      estimatedMinutes: 25,
      suggestedWeek: 11,
      questions: [
        { type: "multiple_choice", text: "Vertical curves are typically:", options: ["Circular", "Parabolic", "Elliptical", "Hyperbolic"], answer: "1", explanation: "Parabolic curves provide constant rate of change of grade", points: 10 },
        { type: "multiple_choice", text: "PVI stands for:", options: ["Point of Vertical Intersection", "Point of Vertical Incline", "Peak Vertical Interval", "Previous Vertical Index"], answer: "0", explanation: "PVI = Point of Vertical Intersection where two grades meet", points: 10 },
        { type: "multiple_choice", text: "The algebraic difference in grades is:", options: ["G1 + G2", "G2 - G1", "Absolute value of difference", "Average of grades"], answer: "1", explanation: "A = G2 - G1 (considering signs: +up, -down)", points: 10 },
        { type: "fill_in_blank", text: "If incoming grade = +2% and outgoing grade = -3%, the algebraic difference A = ___% (include sign).", answer: "-5", explanation: "A = G2 - G1 = (-3) - (+2) = -5%", points: 10 },
        { type: "multiple_choice", text: "A sag vertical curve occurs when:", options: ["Both grades positive", "Grade changes from + to -", "Grade changes from - to +", "Both grades negative"], answer: "2", explanation: "Sag curve: grade increases (- to + or less negative to more positive)", points: 10 }
      ]
    },
    {
      domainNumber: 4,
      domain: DOMAINS[4],
      title: "Spirals and Transition Curves",
      description: "Apply spiral curves for smooth transitions to circular curves",
      content: "Spiral (transition) curves connect tangents to circular curves with gradually changing radius. They improve vehicle handling at high speeds.",
      difficulty: "hard",
      orderIndex: 3,
      estimatedMinutes: 23,
      suggestedWeek: 11,
      questions: [
        { type: "multiple_choice", text: "Spiral curves are used to:", options: ["Save money", "Provide gradual transition", "Mark boundaries", "Reduce length"], answer: "1", explanation: "Spirals provide gradual change from zero curvature (tangent) to curve radius", points: 10 },
        { type: "multiple_choice", text: "In a spiral curve, radius:", options: ["Is constant", "Increases from infinite to R", "Decreases from R to zero", "Doesn't exist"], answer: "1", explanation: "Radius gradually decreases from infinite (tangent) to R (circular curve)", points: 10 },
        { type: "fill_in_blank", text: "The point where spiral meets circular curve is called ___ (two letters).", answer: "SC", explanation: "SC = Spiral to Curve; CS = Curve to Spiral", points: 10 },
        { type: "multiple_choice", text: "Spirals are most important for:", options: ["Low-speed roads", "High-speed roads", "Parking lots", "Sidewalks"], answer: "1", explanation: "High-speed roads need gradual transitions to prevent sudden steering changes", points: 10 },
        { type: "multiple_choice", text: "The length of spiral depends on:", options: ["Design speed and curve radius", "Color of pavement", "Weather", "Time of day"], answer: "0", explanation: "Spiral length based on design speed, radius, and superelevation runoff", points: 10 }
      ]
    },
    {
      domainNumber: 4,
      domain: DOMAINS[4],
      title: "Earthwork and Volume Calculations",
      description: "Calculate cut and fill volumes for construction projects",
      content: "Earthwork involves calculating volumes of material to cut or fill. Methods include average end area, prismoidal formula, and contour grading.",
      difficulty: "medium",
      orderIndex: 4,
      estimatedMinutes: 22,
      suggestedWeek: 11,
      questions: [
        { type: "multiple_choice", text: "The average end area method calculates volume as:", options: ["(A1 + A2)/2", "(A1 + A2) × L / 2", "A1 × A2 × L", "A1 + A2 + L"], answer: "1", explanation: "V = (A1 + A2) × L / 2, where A1, A2 are end areas and L is distance between", points: 10 },
        { type: "fill_in_blank", text: "If end areas are 100 sq ft and 150 sq ft with distance 50 ft, volume = ___ cubic feet.", answer: "6250", explanation: "V = (100+150) × 50 / 2 = 250 × 25 = 6,250 cu ft", points: 10 },
        { type: "multiple_choice", text: "Cut means:", options: ["Adding material", "Removing material", "Measuring", "Grading"], answer: "1", explanation: "Cut = excavation (removing earth); Fill = embankment (adding earth)", points: 10 },
        { type: "multiple_choice", text: "The prismoidal formula is more accurate than average end area for:", options: ["Rectangular sections", "Irregular sections", "All sections", "No sections"], answer: "1", explanation: "Prismoidal formula accounts for middle area: V = L/6(A1 + 4Am + A2)", points: 10 },
        { type: "fill_in_blank", text: "1 cubic yard equals ___ cubic feet.", answer: "27", explanation: "1 yd³ = 3ft × 3ft × 3ft = 27 ft³", points: 10 }
      ]
    },
    {
      domainNumber: 4,
      domain: DOMAINS[4],
      title: "Construction Staking and Layout",
      description: "Stake building corners, grades, and alignment for construction",
      content: "Construction staking transfers design from plans to field. Offset stakes, grade stakes, and slope stakes guide contractors to build to design specifications.",
      difficulty: "medium",
      orderIndex: 5,
      estimatedMinutes: 20,
      suggestedWeek: 12,
      questions: [
        { type: "multiple_choice", text: "Offset stakes are placed:", options: ["At exact building corners", "Away from construction area", "Underground", "At random"], answer: "1", explanation: "Offsets are set away from construction to avoid disturbance, with measurements to actual points", points: 10 },
        { type: "multiple_choice", text: "A grade stake shows:", options: ["Property corners", "Cut or fill to design grade", "Coordinates", "Bearings"], answer: "1", explanation: "Grade stakes mark required cut (-) or fill (+) to reach design elevation", points: 10 },
        { type: "fill_in_blank", text: "If ground elevation is 102.5 ft and design grade is 105.0 ft, the grade stake shows ___ feet (include + or - sign).", answer: "+2.5", explanation: "Fill needed = 105.0 - 102.5 = +2.5 ft (positive = fill)", points: 10 },
        { type: "multiple_choice", text: "Slope stakes mark:", options: ["Vertical walls", "Top and toe of slopes", "Building corners", "Tree locations"], answer: "1", explanation: "Slope stakes show where cut/fill slopes intersect existing ground", points: 10 },
        { type: "multiple_choice", text: "A batter board is used for:", options: ["Fencing", "Building layout", "Grading", "Boundary marking"], answer: "1", explanation: "Batter boards are offset frames with string lines marking building corners and grades", points: 10 }
      ]
    },
    {
      domainNumber: 4,
      domain: DOMAINS[4],
      title: "Route Surveying Principles",
      description: "Plan and survey alignments for roads, pipelines, and utilities",
      content: "Route surveys establish centerlines for linear projects. Reconnaissance, preliminary surveys, and final location balance engineering, environmental, and economic factors.",
      difficulty: "medium",
      orderIndex: 6,
      estimatedMinutes: 22,
      suggestedWeek: 12,
      questions: [
        { type: "multiple_choice", text: "Stationing measures distance:", options: ["From project start", "Between curves", "Vertically", "In feet only"], answer: "0", explanation: "Stationing starts at 0+00 and increases along centerline (10+00 = 1000 ft from start)", points: 10 },
        { type: "fill_in_blank", text: "Station 15+50 is ___ feet from the beginning.", answer: "1550", explanation: "Station 15+50 = 15(100) + 50 = 1550 feet", points: 10 },
        { type: "multiple_choice", text: "The first phase of route surveying is:", options: ["Final design", "Construction", "Reconnaissance", "Staking"], answer: "2", explanation: "Reconnaissance identifies feasible routes; preliminary survey evaluates alternatives; location finalizes design", points: 10 },
        { type: "multiple_choice", text: "Cross-sections are taken:", options: ["Along centerline only", "Perpendicular to centerline", "At random", "Only at curves"], answer: "1", explanation: "Cross-sections perpendicular to centerline show ground profile for earthwork calculations", points: 10 },
        { type: "multiple_choice", text: "PI in route surveying stands for:", options: ["Point of Intersection", "Principal Investigator", "Profile Index", "Project Interval"], answer: "0", explanation: "PI = Point of Intersection where two tangents meet (before curve is inserted)", points: 10 }
      ]
    },
    {
      domainNumber: 4,
      domain: DOMAINS[4],
      title: "Hydrographic Surveying",
      description: "Survey water depths and underwater features",
      content: "Hydrographic surveys map water bodies for navigation, dredging, and construction. Echo sounders measure depth; positioning systems locate soundings.",
      difficulty: "medium",
      orderIndex: 7,
      estimatedMinutes: 20,
      suggestedWeek: 12,
      questions: [
        { type: "multiple_choice", text: "Hydrographic surveys primarily measure:", options: ["Land elevation", "Water depth", "Water temperature", "Fish populations"], answer: "1", explanation: "Hydrographic surveys map underwater topography (bathymetry) by measuring depths", points: 10 },
        { type: "multiple_choice", text: "An echo sounder measures depth by:", options: ["Weighted line", "Sound travel time", "Water pressure", "Visual observation"], answer: "1", explanation: "Echo sounders time sound pulse travel to bottom and back; depth = velocity × time / 2", points: 10 },
        { type: "fill_in_blank", text: "Bathymetry is the study of underwater ___.", answer: "topography", explanation: "Bathymetry = underwater equivalent of topography (relief/depths)", points: 10 },
        { type: "multiple_choice", text: "Tide corrections are needed to reference depths to:", options: ["Instrument height", "Chart datum", "Sea level", "Any reference"], answer: "1", explanation: "Depths reduced to chart datum (reference plane) for consistency and navigation", points: 10 },
        { type: "multiple_choice", text: "Positioning for hydrographic surveys commonly uses:", options: ["Compass only", "GPS/GNSS", "Sextant", "Dead reckoning"], answer: "1", explanation: "GPS/GNSS provides real-time positioning of survey vessel for sounding locations", points: 10 }
      ]
    },

    // ========== DOMAIN 5: Survey Computations and Computer Applications (12 lessons) ==========
    {
      domainNumber: 5,
      domain: DOMAINS[5],
      title: "Coordinate Computations: Bearings and Azimuths",
      description: "Convert between bearings and azimuths and compute directions",
      content: "Bearings reference north or south toward east or west. Azimuths are clockwise from north (0-360°). Converting between systems is essential for computations.",
      difficulty: "medium",
      orderIndex: 1,
      estimatedMinutes: 20,
      suggestedWeek: 13,
      questions: [
        { type: "fill_in_blank", text: "Convert bearing N45°E to azimuth: ___° (number only).", answer: "45", explanation: "N45°E is in NE quadrant: azimuth = bearing = 45°", points: 10 },
        { type: "fill_in_blank", text: "Convert bearing S30°E to azimuth: ___° (number only).", answer: "150", explanation: "S30°E is in SE quadrant: azimuth = 180° - 30° = 150°", points: 10 },
        { type: "fill_in_blank", text: "Convert azimuth 225° to bearing: S___°W (number only).", answer: "45", explanation: "225° is in SW quadrant: bearing = 225° - 180° = S45°W", points: 10 },
        { type: "multiple_choice", text: "An azimuth of 0° or 360° points:", options: ["East", "South", "West", "North"], answer: "3", explanation: "Azimuths start at North (0° or 360°) and increase clockwise", points: 10 },
        { type: "fill_in_blank", text: "Convert bearing N60°W to azimuth: ___° (number only).", answer: "300", explanation: "N60°W is in NW quadrant: azimuth = 360° - 60° = 300°", points: 10 }
      ]
    },
    {
      domainNumber: 5,
      domain: DOMAINS[5],
      title: "Traverse Computations: Latitudes and Departures",
      description: "Calculate latitudes and departures from bearings and distances",
      content: "Latitude (ΔN) is the north-south component; departure (ΔE) is the east-west component. These are computed using bearing/azimuth and distance.",
      difficulty: "medium",
      orderIndex: 2,
      estimatedMinutes: 22,
      suggestedWeek: 13,
      questions: [
        { type: "fill_in_blank", text: "For bearing N30°E and distance 100 ft, latitude ΔN = 100 × cos(30°) ≈ ___ ft (round to nearest whole number).", answer: "87", explanation: "ΔN = D × cos(bearing) = 100 × cos(30°) = 100 × 0.866 = 86.6 ≈ 87 ft", points: 10 },
        { type: "fill_in_blank", text: "For bearing N30°E and distance 100 ft, departure ΔE = 100 × sin(30°) = ___ ft.", answer: "50", explanation: "ΔE = D × sin(bearing) = 100 × sin(30°) = 100 × 0.5 = 50 ft", points: 10 },
        { type: "multiple_choice", text: "A bearing of S45°W produces:", options: ["Positive ΔN and ΔE", "Negative ΔN and ΔE", "Positive ΔN, negative ΔE", "Negative ΔN, positive ΔE"], answer: "1", explanation: "South gives negative ΔN, West gives negative ΔE", points: 10 },
        { type: "multiple_choice", text: "In a closed traverse, the sum of latitudes should equal:", options: ["The perimeter", "Zero", "360", "The area"], answer: "1", explanation: "Closed traverse: ΣΔN = 0 and ΣΔE = 0 (theoretically; errors cause small closure)", points: 10 },
        { type: "fill_in_blank", text: "Using azimuth 90° and distance 200 ft, ΔN = 200 × cos(90°) = ___ ft.", answer: "0", explanation: "Azimuth 90° = due East, so ΔN = 0 and ΔE = 200", points: 10 }
      ]
    },
    {
      domainNumber: 5,
      domain: DOMAINS[5],
      title: "Traverse Adjustments: Compass Rule",
      description: "Adjust traverse closures using the compass (Bowditch) rule",
      content: "Real traverses don't close perfectly. The compass rule distributes closure error proportionally to line lengths, balancing angles and distances.",
      difficulty: "hard",
      orderIndex: 3,
      estimatedMinutes: 25,
      suggestedWeek: 13,
      questions: [
        { type: "multiple_choice", text: "The compass rule adjusts closure error based on:", options: ["Line length only", "Bearing only", "Line length proportionally", "Randomly"], answer: "2", explanation: "Compass rule: correction to each line ∝ line length / perimeter", points: 10 },
        { type: "multiple_choice", text: "Linear misclosure is the:", options: ["Sum of latitudes", "Sum of departures", "Distance from start to computed end", "Perimeter"], answer: "2", explanation: "Linear misclosure = √(ΣΔN² + ΣΔE²) = distance between start and computed end", points: 10 },
        { type: "fill_in_blank", text: "If ΣΔN = +0.10 ft and ΣΔE = -0.08 ft, linear misclosure ≈ ___ ft (round to 2 decimals).", answer: "0.13", explanation: "√(0.10² + 0.08²) = √(0.01 + 0.0064) = √0.0164 ≈ 0.13 ft", points: 10 },
        { type: "multiple_choice", text: "Relative precision is expressed as:", options: ["Feet of error", "1 in X", "Percentage", "Degrees"], answer: "1", explanation: "Relative precision = 1 / (perimeter / misclosure), e.g., 1:5000", points: 10 },
        { type: "fill_in_blank", text: "If misclosure = 0.20 ft and perimeter = 1000 ft, relative precision = 1:___ (number only).", answer: "5000", explanation: "Relative precision = perimeter/misclosure = 1000/0.20 = 5000, expressed as 1:5000", points: 10 }
      ]
    },
    {
      domainNumber: 5,
      domain: DOMAINS[5],
      title: "Area Calculations by Coordinates",
      description: "Compute parcel areas using the coordinate method",
      content: "The coordinate (double meridian distance or DMD) method calculates area from coordinates. This is the most accurate method for closed polygons.",
      difficulty: "hard",
      orderIndex: 4,
      estimatedMinutes: 25,
      suggestedWeek: 14,
      questions: [
        { type: "multiple_choice", text: "The coordinate method for area uses:", options: ["Bearings only", "Distances only", "X,Y coordinates", "Angles only"], answer: "2", explanation: "Area calculated from coordinates using shoelace/DMD formula", points: 10 },
        { type: "multiple_choice", text: "For area by coordinates, the formula involves:", options: ["Sum of coordinates", "Product of coordinates", "Sum of (Xi × Yi+1 - Xi+1 × Yi)", "Difference of coordinates"], answer: "2", explanation: "Area = ½|Σ(Xi × Yi+1 - Xi+1 × Yi)| - shoelace formula", points: 10 },
        { type: "fill_in_blank", text: "A parcel with corners at (0,0), (100,0), (100,50), (0,50) has area ___ sq ft.", answer: "5000", explanation: "Rectangle: 100 × 50 = 5,000 sq ft", points: 10 },
        { type: "multiple_choice", text: "To convert square feet to acres, divide by:", options: ["640", "5280", "43560", "208.71"], answer: "2", explanation: "1 acre = 43,560 sq ft", points: 10 },
        { type: "fill_in_blank", text: "Convert 87,120 sq ft to acres: ___ acres.", answer: "2", explanation: "87,120 / 43,560 = 2.0 acres", points: 10 }
      ]
    },
    {
      domainNumber: 5,
      domain: DOMAINS[5],
      title: "Intersection and Resection Problems",
      description: "Solve for positions using angle and distance intersections",
      content: "Intersection locates a point from two known stations. Resection determines instrument position from observations to known points. Trigonometry solves these problems.",
      difficulty: "hard",
      orderIndex: 5,
      estimatedMinutes: 23,
      suggestedWeek: 14,
      questions: [
        { type: "multiple_choice", text: "In intersection, you observe:", options: ["From unknown to known points", "From two known points to unknown point", "Any random points", "Only distances"], answer: "1", explanation: "Intersection: observe angles/distances from 2+ known stations to locate unknown point", points: 10 },
        { type: "multiple_choice", text: "In resection, you observe:", options: ["From unknown to known points", "From known to unknown points", "Any random points", "Only bearings"], answer: "0", explanation: "Resection: observe from unknown instrument station to 3+ known points to find position", points: 10 },
        { type: "multiple_choice", text: "Three-point resection requires observations to:", options: ["2 points", "3 points minimum", "4 points", "Any number"], answer: "1", explanation: "Minimum 3 known points needed for unique solution (2 angles defines position)", points: 10 },
        { type: "multiple_choice", text: "The two-point intersection problem is solved using:", options: ["Pythagorean theorem", "Law of Sines/Cosines", "Area formulas", "Calculus"], answer: "1", explanation: "Form triangle with 2 known stations and unknown point; solve with trig", points: 10 },
        { type: "fill_in_blank", text: "Resection is also called the ___ problem (starts with 't', ends in 'n').", answer: "trisection", explanation: "Three-point resection / trisection problem", points: 10 }
      ]
    },
    {
      domainNumber: 5,
      domain: DOMAINS[5],
      title: "Curve Calculations and Stakeout",
      description: "Compute curve points using deflection angles and chords",
      content: "Curves are staked by deflection angles and chords from PC. Incremental deflections locate points along the curve for construction layout.",
      difficulty: "hard",
      orderIndex: 6,
      estimatedMinutes: 25,
      suggestedWeek: 14,
      questions: [
        { type: "multiple_choice", text: "Deflection angle to a point on curve is:", options: ["Half the arc angle to that point", "Equal to the arc angle", "Twice the arc angle", "Random"], answer: "0", explanation: "Deflection = δ = (arc angle)/2 for circular curves", points: 10 },
        { type: "multiple_choice", text: "Curves are typically staked at:", options: ["Random intervals", "Regular stations (e.g., every 25 or 50 ft)", "Only at PC and PT", "Only at midpoint"], answer: "1", explanation: "Stake at regular intervals (full stations or 25/50 ft) for construction guidance", points: 10 },
        { type: "fill_in_blank", text: "The degree of curve (arc definition) is the central angle subtending a ___ foot arc.", answer: "100", explanation: "Degree of curve (arc def): central angle for 100 ft arc", points: 10 },
        { type: "multiple_choice", text: "From PC, to stake point on curve, you measure:", options: ["Deflection angle and chord", "Only bearing", "Only distance", "Nothing"], answer: "0", explanation: "Set deflection angle from tangent, measure chord distance to locate point", points: 10 },
        { type: "multiple_choice", text: "The total deflection angle at PT equals:", options: ["Delta/4", "Delta/2", "Delta", "2×Delta"], answer: "1", explanation: "Total deflection from PC to PT = Δ/2 (half the central angle)", points: 10 }
      ]
    },
    {
      domainNumber: 5,
      domain: DOMAINS[5],
      title: "Coordinate Transformations",
      description: "Transform coordinates between different systems and datums",
      content: "Coordinate transformations convert between local, state plane, and geodetic systems. Rotations, translations, and scale factors adjust coordinates.",
      difficulty: "hard",
      orderIndex: 7,
      estimatedMinutes: 22,
      suggestedWeek: 15,
      questions: [
        { type: "multiple_choice", text: "A 2D coordinate transformation typically requires:", options: ["1 control point", "2 control points", "3 control points", "No control"], answer: "1", explanation: "2 common points allow solving for rotation, translation, and scale (4 parameters)", points: 10 },
        { type: "multiple_choice", text: "Coordinate rotation by angle θ uses:", options: ["Addition", "Multiplication by rotation matrix", "Division", "Square root"], answer: "1", explanation: "Rotation matrix: X' = X cos θ - Y sin θ, Y' = X sin θ + Y cos θ", points: 10 },
        { type: "fill_in_blank", text: "A translation moves coordinates without changing ___ or scale.", answer: "rotation", explanation: "Translation shifts origin (adds constants) without rotating or scaling", points: 10 },
        { type: "multiple_choice", text: "Combined factor in State Plane includes:", options: ["Scale factor only", "Elevation factor only", "Both scale and elevation factors", "Neither"], answer: "2", explanation: "Combined factor = grid scale factor × elevation factor", points: 10 },
        { type: "multiple_choice", text: "A seven-parameter transformation allows:", options: ["2D conversion only", "3D conversion between datums", "No conversion", "Area calculation"], answer: "1", explanation: "7-parameter (Helmert) transforms 3D coords between datums: 3 translations, 3 rotations, 1 scale", points: 10 }
      ]
    },
    {
      domainNumber: 5,
      domain: DOMAINS[5],
      title: "Least Squares Adjustment Concepts",
      description: "Understand principles of least squares network adjustment",
      content: "Least squares finds the most probable values from redundant measurements. It minimizes the sum of squared residuals and provides statistical quality measures.",
      difficulty: "hard",
      orderIndex: 8,
      estimatedMinutes: 25,
      suggestedWeek: 15,
      questions: [
        { type: "multiple_choice", text: "Least squares adjustment minimizes:", options: ["Sum of errors", "Largest error", "Sum of squared residuals", "Number of measurements"], answer: "2", explanation: "Minimizes Σ(residual²) - sum of squared differences from adjusted values", points: 10 },
        { type: "multiple_choice", text: "Redundant measurements:", options: ["Are wasteful", "Allow adjustment and error detection", "Should be avoided", "Are impossible"], answer: "1", explanation: "Extra observations allow statistical adjustment and quality assessment", points: 10 },
        { type: "fill_in_blank", text: "Degrees of freedom = number of observations - number of ___.", answer: "unknowns", explanation: "DOF = n - u (observations minus unknowns); redundancy improves reliability", points: 10 },
        { type: "multiple_choice", text: "A residual is:", options: ["The final answer", "Difference between observed and adjusted value", "The initial measurement", "An error"], answer: "1", explanation: "Residual = observed - adjusted value (shows correction applied)", points: 10 },
        { type: "multiple_choice", text: "Least squares provides:", options: ["One possible solution", "Most probable solution", "Cheapest solution", "Fastest solution"], answer: "1", explanation: "Least squares gives statistically most probable values from redundant data", points: 10 }
      ]
    },
    {
      domainNumber: 5,
      domain: DOMAINS[5],
      title: "Spreadsheet Applications in Surveying",
      description: "Use spreadsheets for traverse, area, and curve calculations",
      content: "Spreadsheets automate repetitive calculations. Excel formulas handle traverse closures, coordinate geometry, and data reduction efficiently.",
      difficulty: "easy",
      orderIndex: 9,
      estimatedMinutes: 18,
      suggestedWeek: 15,
      questions: [
        { type: "fill_in_blank", text: "In Excel, to calculate latitude from azimuth in A1 and distance in B1, use: =B1*COS(RADIANS(___))", answer: "A1", explanation: "=B1*COS(RADIANS(A1)) converts azimuth to radians and computes N component", points: 10 },
        { type: "multiple_choice", text: "The RADIANS function in Excel:", options: ["Converts degrees to radians", "Converts radians to degrees", "Calculates radius", "Measures angles"], answer: "0", explanation: "Excel trig functions need radians; RADIANS converts degrees to radians", points: 10 },
        { type: "multiple_choice", text: "To sum a column in Excel, use:", options: ["=ADD(range)", "=SUM(range)", "=TOTAL(range)", "=PLUS(range)"], answer: "1", explanation: "=SUM(A1:A10) adds values in cells A1 through A10", points: 10 },
        { type: "fill_in_blank", text: "To calculate √(A1² + B1²) in Excel, use: =SQRT(A1^2+___^2)", answer: "B1", explanation: "=SQRT(A1^2+B1^2) computes distance from components", points: 10 },
        { type: "multiple_choice", text: "Absolute cell reference $A$1 means:", options: ["Cell changes when copied", "Column only fixed", "Row only fixed", "Cell doesn't change when copied"], answer: "3", explanation: "$A$1 fixes both column and row; $A1 fixes column; A$1 fixes row", points: 10 }
      ]
    },
    {
      domainNumber: 5,
      domain: DOMAINS[5],
      title: "Survey Data Collectors and Processing",
      description: "Manage field data from total stations and GPS receivers",
      content: "Data collectors store field measurements electronically. Data transfer, formatting, and processing in office software creates deliverables efficiently.",
      difficulty: "easy",
      orderIndex: 10,
      estimatedMinutes: 18,
      suggestedWeek: 16,
      questions: [
        { type: "multiple_choice", text: "Survey data collectors typically connect to computers via:", options: ["Smoke signals", "USB or wireless", "Paper only", "Telepathy"], answer: "1", explanation: "USB cables, Bluetooth, or Wi-Fi transfer data from collector to computer", points: 10 },
        { type: "multiple_choice", text: "Raw data from total station typically includes:", options: ["Point ID, angle, distance", "Only coordinates", "Only drawings", "Nothing useful"], answer: "0", explanation: "Raw data: point IDs, horizontal/vertical angles, slope distances, codes", points: 10 },
        { type: "fill_in_blank", text: "GPS data is typically in ___ format (four letters, starts with R).", answer: "RINEX", explanation: "RINEX (Receiver Independent Exchange) is standard GPS data format", points: 10 },
        { type: "multiple_choice", text: "Post-processing GPS data:", options: ["Is unnecessary", "Improves accuracy over real-time", "Makes data worse", "Only for fun"], answer: "1", explanation: "Post-processing uses precise orbits and longer processing for better positions", points: 10 },
        { type: "multiple_choice", text: "Feature codes in data collectors:", options: ["Slow down work", "Automate CAD linework and symbols", "Are optional luxuries", "Don't work"], answer: "1", explanation: "Codes (e.g., 'EP' for edge of pavement) trigger automatic CAD symbology and layers", points: 10 }
      ]
    },
    {
      domainNumber: 5,
      domain: DOMAINS[5],
      title: "Error Propagation in Computations",
      description: "Calculate how measurement errors affect computed quantities",
      content: "Errors in measurements propagate through calculations. Understanding error propagation ensures realistic precision estimates for final results.",
      difficulty: "hard",
      orderIndex: 11,
      estimatedMinutes: 23,
      suggestedWeek: 16,
      questions: [
        { type: "multiple_choice", text: "When adding uncorrelated measurements, errors combine by:", options: ["Simple addition", "Square root of sum of squares", "Multiplication", "Subtraction"], answer: "1", explanation: "σsum = √(σ1² + σ2²) for independent measurements", points: 10 },
        { type: "multiple_choice", text: "The error in a product of measurements:", options: ["Is the sum of errors", "Uses relative errors", "Is always zero", "Cannot be calculated"], answer: "1", explanation: "For Z=X×Y: relative error σZ/Z = √[(σX/X)² + (σY/Y)²]", points: 10 },
        { type: "fill_in_blank", text: "If two 100-ft distances each have σ = ±0.01 ft, the error in their sum is ±___ ft (round to 3 decimals).", answer: "0.014", explanation: "σsum = √(0.01² + 0.01²) = √0.0002 = 0.0141 ≈ 0.014 ft", points: 10 },
        { type: "multiple_choice", text: "Systematic errors in error propagation:", options: ["Add algebraically", "Cancel out", "Square and sum", "Don't propagate"], answer: "0", explanation: "Systematic errors add algebraically (with signs); random errors combine by RSS", points: 10 },
        { type: "multiple_choice", text: "The error in √X is approximately:", options: ["σX", "σX / (2√X)", "2σX", "σX²"], answer: "1", explanation: "For Y = √X: σY ≈ σX / (2√X)", points: 10 }
      ]
    },
    {
      domainNumber: 5,
      domain: DOMAINS[5],
      title: "Programming and Automation",
      description: "Write programs or scripts to automate surveying calculations",
      content: "Basic programming automates tedious calculations. Even simple scripts in Excel VBA, Python, or calculator programs improve efficiency and reduce errors.",
      difficulty: "medium",
      orderIndex: 12,
      estimatedMinutes: 20,
      suggestedWeek: 16,
      questions: [
        { type: "multiple_choice", text: "A loop in programming:", options: ["Creates errors", "Repeats operations", "Stops the program", "Is decorative"], answer: "1", explanation: "Loops (for, while) repeat code blocks - ideal for processing multiple stations", points: 10 },
        { type: "multiple_choice", text: "An IF statement:", options: ["Makes decisions based on conditions", "Always executes", "Never executes", "Does math only"], answer: "0", explanation: "IF/THEN/ELSE branches code based on logical conditions (if angle>180 then...)", points: 10 },
        { type: "fill_in_blank", text: "A function takes ___ and returns output (plural, data provided to function).", answer: "inputs", explanation: "Functions take inputs (arguments/parameters) and return results", points: 10 },
        { type: "multiple_choice", text: "Python is popular in surveying for:", options: ["Nothing", "GIS automation and data processing", "Making coffee", "Only video games"], answer: "1", explanation: "Python with libraries like arcpy, pandas automates GIS and data processing", points: 10 },
        { type: "multiple_choice", text: "Comments in code:", options: ["Execute as commands", "Explain code to humans", "Slow down programs", "Cause errors"], answer: "1", explanation: "Comments (// or # or ') document code logic, ignored by computer", points: 10 }
      ]
    },

    // ========== DOMAIN 6: Business Concepts (6 lessons) ==========
    {
      domainNumber: 6,
      domain: DOMAINS[6],
      title: "Professional Licensing and Ethics",
      description: "Understand surveying licensure requirements and ethical obligations",
      content: "Professional land surveyors must be licensed by their state. Ethical practice includes competence, integrity, client confidentiality, and public protection.",
      difficulty: "medium",
      orderIndex: 1,
      estimatedMinutes: 20,
      suggestedWeek: 16,
      questions: [
        { type: "multiple_choice", text: "Who regulates surveying licenses in the US?", options: ["Federal government", "State boards", "NCEES", "Private organizations"], answer: "1", explanation: "Each state has its own licensing board; NCEES creates exams but states license", points: 10 },
        { type: "multiple_choice", text: "A surveyor's primary obligation is to:", options: ["The client", "The employer", "The public", "Themselves"], answer: "2", explanation: "Licensed professionals protect public health, safety, and welfare above all", points: 10 },
        { type: "fill_in_blank", text: "Most states require passing the FS and ___ exams for licensure (two letters).", answer: "PS", explanation: "FS (Fundamentals of Surveying) + PS (Principles and Practice of Surveying)", points: 10 },
        { type: "multiple_choice", text: "Providing services beyond your competence is:", options: ["Acceptable if paid well", "Unethical", "Required sometimes", "A good learning opportunity"], answer: "1", explanation: "Practice only in areas of competence; ethical codes prohibit accepting work you can't do properly", points: 10 },
        { type: "multiple_choice", text: "Client information should be:", options: ["Shared freely", "Kept confidential", "Posted online", "Sold"], answer: "1", explanation: "Professional confidentiality protects client information unless legally required to disclose", points: 10 }
      ]
    },
    {
      domainNumber: 6,
      domain: DOMAINS[6],
      title: "Contracts and Proposals",
      description: "Prepare survey proposals and understand contract types",
      content: "Survey contracts define scope, deliverables, timeline, and compensation. Understanding contract types and clear scope prevent disputes.",
      difficulty: "medium",
      orderIndex: 2,
      estimatedMinutes: 22,
      suggestedWeek: 17,
      questions: [
        { type: "multiple_choice", text: "A lump sum contract pays:", options: ["Hourly rate", "Fixed total price", "Cost plus percentage", "Nothing"], answer: "1", explanation: "Lump sum (fixed fee) = one price regardless of time spent (risk to surveyor if underestimated)", points: 10 },
        { type: "multiple_choice", text: "Time and materials billing charges for:", options: ["Fixed price", "Actual hours plus expenses", "Percentage of savings", "Area surveyed"], answer: "1", explanation: "T&M bills actual hours at hourly rate plus reimbursable costs", points: 10 },
        { type: "multiple_choice", text: "A survey proposal should include:", options: ["Scope of work", "Fee", "Timeline", "All of the above"], answer: "3", explanation: "Complete proposals cover scope, deliverables, schedule, fees, and terms", points: 10 },
        { type: "fill_in_blank", text: "Clearly defining ___ of work prevents disputes (four letters).", answer: "scope", explanation: "Scope defines what is/isn't included; vague scopes cause disagreements", points: 10 },
        { type: "multiple_choice", text: "Retainer fees are:", options: ["Final payment", "Advance payment to start work", "Penalties", "Bonuses"], answer: "1", explanation: "Retainer is upfront payment (deposit) to secure services and cover initial costs", points: 10 }
      ]
    },
    {
      domainNumber: 6,
      domain: DOMAINS[6],
      title: "Project Management Basics",
      description: "Manage survey projects including scheduling and resource allocation",
      content: "Successful projects require planning, scheduling, resource management, and communication. Meeting deadlines and budgets while maintaining quality is essential.",
      difficulty: "easy",
      orderIndex: 3,
      estimatedMinutes: 18,
      suggestedWeek: 17,
      questions: [
        { type: "multiple_choice", text: "The critical path in project scheduling is:", options: ["Shortest sequence", "Longest sequence determining project duration", "Most expensive part", "Least important tasks"], answer: "1", explanation: "Critical path = longest task sequence; delays here extend entire project", points: 10 },
        { type: "multiple_choice", text: "A Gantt chart shows:", options: ["Costs only", "Tasks and timeline", "Employee names", "Equipment"], answer: "1", explanation: "Gantt charts display tasks as bars on timeline showing duration and sequence", points: 10 },
        { type: "fill_in_blank", text: "Allocating crew, equipment, and time is called resource ___.", answer: "management", explanation: "Resource management ensures people and equipment are available when needed", points: 10 },
        { type: "multiple_choice", text: "Effective project communication includes:", options: ["Hiding problems", "Regular client updates", "Avoiding documentation", "Ignoring changes"], answer: "1", explanation: "Regular communication keeps clients informed and manages expectations", points: 10 },
        { type: "multiple_choice", text: "Change orders are used when:", options: ["Project scope changes", "Nothing changes", "Project finishes early", "Weather is nice"], answer: "0", explanation: "Change orders document and authorize additional work beyond original scope", points: 10 }
      ]
    },
    {
      domainNumber: 6,
      domain: DOMAINS[6],
      title: "Quality Control and Quality Assurance",
      description: "Implement QC/QA procedures for surveying accuracy",
      content: "Quality control checks work during production. Quality assurance establishes processes ensuring consistent quality. Independent checks, calibration, and standards compliance are essential.",
      difficulty: "medium",
      orderIndex: 4,
      estimatedMinutes: 20,
      suggestedWeek: 17,
      questions: [
        { type: "multiple_choice", text: "Quality control involves:", options: ["Checking work after completion", "Setting standards before work", "Both A and B", "Neither"], answer: "2", explanation: "QC checks work meets standards; QA establishes processes to ensure quality", points: 10 },
        { type: "multiple_choice", text: "Independent checks should be performed by:", options: ["Same person who did work", "Different person", "Nobody", "Client"], answer: "1", explanation: "Independent review by different person catches errors original surveyor might miss", points: 10 },
        { type: "fill_in_blank", text: "Instruments should be ___ regularly to ensure accuracy.", answer: "calibrated", explanation: "Calibration adjusts instruments to eliminate systematic errors", points: 10 },
        { type: "multiple_choice", text: "Closure checks on traverses are examples of:", options: ["Quality control", "Waste of time", "Optional procedures", "Client requirements only"], answer: "0", explanation: "Closure calculations detect errors and verify measurement quality", points: 10 },
        { type: "multiple_choice", text: "Standard operating procedures (SOPs):", options: ["Vary for each job", "Ensure consistent methods", "Are unnecessary", "Only for large firms"], answer: "1", explanation: "SOPs document consistent processes ensuring quality across all projects", points: 10 }
      ]
    },
    {
      domainNumber: 6,
      domain: DOMAINS[6],
      title: "Professional Liability and Insurance",
      description: "Understand liability risks and insurance for surveying practice",
      content: "Surveyors face liability for errors and omissions. Professional liability insurance protects against claims. Risk management reduces exposure.",
      difficulty: "medium",
      orderIndex: 5,
      estimatedMinutes: 20,
      suggestedWeek: 18,
      questions: [
        { type: "multiple_choice", text: "Professional liability insurance covers:", options: ["Equipment theft", "Errors and omissions claims", "Vehicle accidents", "Employee injuries"], answer: "1", explanation: "E&O (professional liability) covers claims from professional mistakes and negligence", points: 10 },
        { type: "multiple_choice", text: "The statute of limitations:", options: ["Never expires", "Limits time to file claims", "Protects clients only", "Applies only to criminal acts"], answer: "1", explanation: "Statutes limit time period for filing lawsuits (varies by state and claim type)", points: 10 },
        { type: "fill_in_blank", text: "Errors and omissions are also called ___ liability.", answer: "professional", explanation: "Professional liability = E&O = claims arising from professional services", points: 10 },
        { type: "multiple_choice", text: "Which reduces liability risk?", options: ["Thorough documentation", "Quality control", "Clear contracts", "All of the above"], answer: "3", explanation: "Documentation, QC, and clear scopes all reduce liability exposure", points: 10 },
        { type: "multiple_choice", text: "Occurrence-based policies cover claims:", options: ["Only while policy active", "For work done during policy period", "Never", "For future work only"], answer: "1", explanation: "Occurrence policies cover work done during policy period, even if claim filed later", points: 10 }
      ]
    },
    {
      domainNumber: 6,
      domain: DOMAINS[6],
      title: "Business Operations and Billing",
      description: "Manage surveying business finances and billing practices",
      content: "Successful firms manage overhead, billing, collections, and profitability. Understanding costs, pricing, and cash flow ensures business sustainability.",
      difficulty: "easy",
      orderIndex: 6,
      estimatedMinutes: 18,
      suggestedWeek: 18,
      questions: [
        { type: "multiple_choice", text: "Overhead costs include:", options: ["Direct labor on projects", "Office rent and utilities", "Client reimbursables", "Survey monuments"], answer: "1", explanation: "Overhead = indirect costs (rent, insurance, admin) not directly billable to projects", points: 10 },
        { type: "multiple_choice", text: "Billing rate should cover:", options: ["Direct labor cost only", "Labor + overhead + profit", "Just overhead", "Minimum wage"], answer: "1", explanation: "Rates must cover direct costs, overhead allocation, and profit margin", points: 10 },
        { type: "fill_in_blank", text: "The multiplier applied to salary to get billing rate typically ranges from 2.5 to ___ (one digit).", answer: "3", explanation: "Multipliers of 2.5-3.5× salary cover overhead, benefits, and profit", points: 10 },
        { type: "multiple_choice", text: "Accounts receivable represents:", options: ["Money owed to firm", "Money firm owes", "Equipment value", "Office supplies"], answer: "0", explanation: "A/R = outstanding invoices (money clients owe to firm)", points: 10 },
        { type: "multiple_choice", text: "Prompt invoicing and collection:", options: ["Annoy clients", "Improve cash flow", "Are unnecessary", "Reduce profit"], answer: "1", explanation: "Quick billing and collection maintain cash flow for ongoing operations", points: 10 }
      ]
    },
    {
      domainNumber: 6,
      domain: DOMAINS[6],
      title: "Field Safety and OSHA Compliance",
      description: "Understand safety requirements and hazard awareness for field surveying",
      content: "Field surveying involves traffic hazards, underground utilities, heavy equipment, and environmental conditions. OSHA regulations, PPE requirements, and safety protocols protect survey crews.",
      difficulty: "medium",
      orderIndex: 7,
      estimatedMinutes: 22,
      suggestedWeek: 17,
      questions: [
        { type: "multiple_choice", text: "Before excavating near utilities, surveyors should:", options: ["Dig carefully", "Call 811 for utility locates", "Assume no utilities exist", "Use metal detectors only"], answer: "1", explanation: "811 'Call Before You Dig' is required to locate underground utilities before any excavation", points: 10 },
        { type: "multiple_choice", text: "High-visibility vests are required when:", options: ["Never", "Working near traffic or equipment", "Only at night", "Only for supervisors"], answer: "1", explanation: "ANSI/ISEA high-vis apparel required when workers are exposed to traffic or equipment", points: 10 },
        { type: "fill_in_blank", text: "OSHA stands for Occupational Safety and Health ___.", answer: "Administration", explanation: "OSHA = Occupational Safety and Health Administration, the federal agency regulating workplace safety", points: 10 },
        { type: "multiple_choice", text: "A Job Hazard Analysis (JHA) is performed:", options: ["After accidents only", "Before starting work to identify risks", "By OSHA inspectors only", "Once per year"], answer: "1", explanation: "JHA identifies potential hazards and controls before work begins", points: 10 },
        { type: "multiple_choice", text: "When working on roadways, traffic control should include:", options: ["Nothing special", "Cones, signs, and flaggers as appropriate", "Only a vehicle with lights", "Just high-vis vests"], answer: "1", explanation: "MUTCD standards require appropriate traffic control devices based on road conditions", points: 10 }
      ]
    },
    {
      domainNumber: 6,
      domain: DOMAINS[6],
      title: "Survey Crew Supervision and Leadership",
      description: "Lead survey crews effectively including communication and task delegation",
      content: "Effective crew leadership requires clear communication, proper delegation, safety enforcement, and personnel management. Hand signals, radio protocols, and team coordination ensure efficient operations.",
      difficulty: "medium",
      orderIndex: 8,
      estimatedMinutes: 20,
      suggestedWeek: 17,
      questions: [
        { type: "multiple_choice", text: "The primary role of a party chief is to:", options: ["Carry equipment only", "Direct crew operations and ensure quality", "Stay in the office", "Only operate instruments"], answer: "1", explanation: "Party chief leads the field crew, makes decisions, ensures quality and safety", points: 10 },
        { type: "multiple_choice", text: "Standard hand signals between instrument operator and rodman:", options: ["Are unnecessary with radios", "Provide silent, efficient communication", "Only used in emergencies", "Are outdated"], answer: "1", explanation: "Hand signals are standard, efficient communication especially when radios fail or are impractical", points: 10 },
        { type: "fill_in_blank", text: "The hand signal of arm extended horizontally and moved slowly means move ___ in that direction.", answer: "slowly", explanation: "Slow horizontal arm movement signals rodman to move slowly in indicated direction", points: 10 },
        { type: "multiple_choice", text: "Effective delegation to crew members requires:", options: ["No instructions", "Clear tasks, expectations, and deadlines", "Assuming they know everything", "Written orders only"], answer: "1", explanation: "Good delegation includes clear objectives, expectations, and timelines", points: 10 },
        { type: "multiple_choice", text: "A survey crew briefing should cover:", options: ["Only lunch plans", "Project goals, safety hazards, and individual tasks", "Nothing specific", "Past project stories"], answer: "1", explanation: "Daily briefings communicate objectives, hazards, assignments, and expectations", points: 10 }
      ]
    },
    {
      domainNumber: 6,
      domain: DOMAINS[6],
      title: "Professional Communication and Documentation",
      description: "Master written reports, client communication, and conflict resolution",
      content: "Professional surveyors communicate through field notes, technical reports, client correspondence, and oral presentations. Clear documentation protects the firm and ensures project success.",
      difficulty: "medium",
      orderIndex: 9,
      estimatedMinutes: 20,
      suggestedWeek: 18,
      questions: [
        { type: "multiple_choice", text: "Field notes should be recorded:", options: ["From memory at office", "In pencil, at time of observation", "Only for complex jobs", "By the client"], answer: "1", explanation: "Field notes must be contemporaneous, legible, and in pencil (permanent, erasures visible)", points: 10 },
        { type: "multiple_choice", text: "A survey report typically includes:", options: ["Only the map", "Purpose, methods, findings, and conclusions", "Just measurements", "Personal opinions"], answer: "1", explanation: "Professional reports document purpose, methodology, data, analysis, and conclusions", points: 10 },
        { type: "fill_in_blank", text: "Field notes are considered legal ___ and should never be erased.", answer: "documents", explanation: "Field notes are legal records; mistakes should be crossed out with single line, initialed, and corrected", points: 10 },
        { type: "multiple_choice", text: "When resolving client conflicts, the surveyor should:", options: ["Ignore complaints", "Listen, document, and address professionally", "Become defensive", "Refuse communication"], answer: "1", explanation: "Professional conflict resolution involves listening, documentation, and objective response", points: 10 },
        { type: "multiple_choice", text: "Written communication with clients should be:", options: ["Highly technical jargon", "Clear, professional, and documented", "Informal always", "Verbal only"], answer: "1", explanation: "Client communication should be clear, professional, and documented for the record", points: 10 }
      ]
    },

    // ========== DOMAIN 7: Applied Mathematics and Statistics (12 lessons total) ==========
    {
      domainNumber: 7,
      domain: DOMAINS[7],
      title: "Advanced Trigonometry and Identities",
      description: "Apply advanced trigonometric concepts to surveying problems",
      content: "Beyond basic trig: double-angle, half-angle, sum/difference formulas. Law of sines/cosines for oblique triangles. Inverse functions and identities solve complex surveying geometry.",
      difficulty: "medium",
      orderIndex: 1,
      estimatedMinutes: 22,
      suggestedWeek: 15,
      questions: [
        { type: "multiple_choice", text: "The law of sines relates:", options: ["Sides to angles in right triangles only", "Sides to opposite angles in any triangle", "Adjacent sides only", "Hypotenuse to angles"], answer: "1", explanation: "Law of Sines: a/sin(A) = b/sin(B) = c/sin(C) for any triangle", points: 10 },
        { type: "multiple_choice", text: "sin²θ + cos²θ equals:", options: ["0", "1", "θ", "2"], answer: "1", explanation: "Fundamental Pythagorean identity: sin²θ + cos²θ = 1 for all angles", points: 10 },
        { type: "fill_in_blank", text: "The law of ___ is used when you know three sides and need to find an angle (one word).", answer: "cosines", explanation: "Law of Cosines: c² = a² + b² - 2ab·cos(C); rearrange to find angles", points: 10 },
        { type: "multiple_choice", text: "sin(2θ) equals:", options: ["2sin(θ)", "2sin(θ)cos(θ)", "sin²(θ)", "cos(2θ)"], answer: "1", explanation: "Double-angle formula: sin(2θ) = 2sin(θ)cos(θ)", points: 10 },
        { type: "multiple_choice", text: "In an oblique triangle with a=50, b=40, C=60°, find c using:", options: ["Pythagorean theorem", "Law of cosines", "Law of sines", "Basic trig"], answer: "1", explanation: "Two sides and included angle → use Law of Cosines: c² = a² + b² - 2ab·cos(C)", points: 10 }
      ]
    },
    {
      domainNumber: 7,
      domain: DOMAINS[7],
      title: "Vector Analysis and Applications",
      description: "Use vectors to solve spatial surveying problems",
      content: "Vectors represent magnitude and direction. Vector addition, dot product, and cross product solve 3D positioning, traverse closure, and coordinate transformations.",
      difficulty: "hard",
      orderIndex: 2,
      estimatedMinutes: 24,
      suggestedWeek: 16,
      questions: [
        { type: "multiple_choice", text: "A vector has both:", options: ["Magnitude and direction", "Position and velocity", "Length and width", "X and Y only"], answer: "0", explanation: "Vectors represent magnitude (length) and direction in space", points: 10 },
        { type: "multiple_choice", text: "The dot product of perpendicular vectors is:", options: ["-1", "0", "1", "90"], answer: "1", explanation: "A·B = |A||B|cos(θ); when θ=90°, cos(90°)=0, so A·B=0", points: 10 },
        { type: "fill_in_blank", text: "The ___ product of two vectors yields a vector perpendicular to both (one word).", answer: "cross", explanation: "Cross product A×B produces vector perpendicular to plane containing A and B", points: 10 },
        { type: "multiple_choice", text: "Vector addition follows which rule graphically:", options: ["Circle rule", "Parallelogram rule", "Triangle inequality", "Square rule"], answer: "1", explanation: "Parallelogram (or head-to-tail) rule: place tail of B at head of A", points: 10 },
        { type: "multiple_choice", text: "Unit vectors have magnitude:", options: ["0", "1", "10", "Variable"], answer: "1", explanation: "Unit vectors have magnitude = 1; indicate direction only", points: 10 }
      ]
    },
    {
      domainNumber: 7,
      domain: DOMAINS[7],
      title: "Calculus Fundamentals for Surveying",
      description: "Apply basic calculus concepts to surveying applications",
      content: "Derivatives measure rates of change. Integrals calculate areas and volumes. Calculus optimizes curves, analyzes error propagation, and computes earthwork volumes.",
      difficulty: "hard",
      orderIndex: 3,
      estimatedMinutes: 25,
      suggestedWeek: 16,
      questions: [
        { type: "multiple_choice", text: "The derivative represents:", options: ["Area under curve", "Rate of change", "Average value", "Total distance"], answer: "1", explanation: "Derivative = instantaneous rate of change (slope of tangent line)", points: 10 },
        { type: "multiple_choice", text: "The integral of a function represents:", options: ["Slope", "Rate of change", "Area under curve", "Maximum value"], answer: "2", explanation: "Definite integral ∫f(x)dx = area under curve from a to b", points: 10 },
        { type: "fill_in_blank", text: "The derivative of x² is ___ (format: #x).", answer: "2x", explanation: "Power rule: d/dx(xⁿ) = n·xⁿ⁻¹; d/dx(x²) = 2x¹ = 2x", points: 10 },
        { type: "multiple_choice", text: "To find maximum/minimum points, set the derivative equal to:", options: ["1", "0", "∞", "x"], answer: "1", explanation: "Critical points occur where f'(x) = 0 or f'(x) undefined", points: 10 },
        { type: "multiple_choice", text: "Earthwork volume can be computed using:", options: ["Derivatives only", "Integrals of cross-sections", "Simple addition", "Subtraction"], answer: "1", explanation: "Volume = integral of area function A(x); or sum cross-sectional areas × spacing", points: 10 }
      ]
    },
    {
      domainNumber: 7,
      domain: DOMAINS[7],
      title: "Series and Sequences",
      description: "Apply series expansions and sequences in computations",
      content: "Arithmetic and geometric sequences model patterns. Series represent functions as infinite sums. Taylor series approximate complex functions for surveying calculations.",
      difficulty: "medium",
      orderIndex: 4,
      estimatedMinutes: 20,
      suggestedWeek: 17,
      questions: [
        { type: "multiple_choice", text: "An arithmetic sequence has:", options: ["Constant ratio", "Constant difference", "Random values", "Exponential growth"], answer: "1", explanation: "Arithmetic: constant difference d; aₙ = a₁ + (n-1)d", points: 10 },
        { type: "multiple_choice", text: "A geometric sequence has:", options: ["Constant difference", "Constant ratio", "Linear growth", "No pattern"], answer: "1", explanation: "Geometric: constant ratio r; aₙ = a₁ · rⁿ⁻¹", points: 10 },
        { type: "fill_in_blank", text: "The sum of n terms in arithmetic sequence is S = n/2 × (first + ___) (one word).", answer: "last", explanation: "Sₙ = n/2 × (a₁ + aₙ) or n/2 × [2a₁ + (n-1)d]", points: 10 },
        { type: "multiple_choice", text: "Taylor series expands functions into:", options: ["Finite polynomials", "Infinite power series", "Logarithms", "Trigonometric ratios"], answer: "1", explanation: "Taylor series: f(x) = f(a) + f'(a)(x-a) + f''(a)(x-a)²/2! + ...", points: 10 },
        { type: "multiple_choice", text: "Convergence means a series:", options: ["Diverges to infinity", "Approaches a finite sum", "Has no sum", "Alternates forever"], answer: "1", explanation: "Convergent series approaches finite limit as n→∞", points: 10 }
      ]
    },
    {
      domainNumber: 7,
      domain: DOMAINS[7],
      title: "Differential Equations in Surveying",
      description: "Understand differential equations for modeling change",
      content: "Differential equations describe rates of change. First-order DEs model exponential decay (signal strength), oscillations, and dynamic systems in surveying applications.",
      difficulty: "hard",
      orderIndex: 5,
      estimatedMinutes: 23,
      suggestedWeek: 17,
      questions: [
        { type: "multiple_choice", text: "A differential equation relates:", options: ["Two variables", "A function and its derivatives", "Constants only", "Slopes and areas"], answer: "1", explanation: "DE: equation involving function y and derivatives dy/dx, d²y/dx², etc.", points: 10 },
        { type: "multiple_choice", text: "First-order DE contains:", options: ["Second derivative", "First derivative only", "No derivatives", "Integrals"], answer: "1", explanation: "First-order: highest derivative is dy/dx (first derivative)", points: 10 },
        { type: "fill_in_blank", text: "The solution dy/dx = ky has the form y = Ce^(___) (format: kx).", answer: "kx", explanation: "Exponential growth/decay: dy/dx = ky → y = Ce^(kx)", points: 10 },
        { type: "multiple_choice", text: "Separation of variables works when DE can be written as:", options: ["y' = f(x)g(y)", "y' = x + y", "y'' = 0", "xy = constant"], answer: "0", explanation: "Separable: dy/dx = f(x)g(y) → (1/g(y))dy = f(x)dx, then integrate both sides", points: 10 },
        { type: "multiple_choice", text: "Initial condition y(0)=y₀ determines:", options: ["Differential equation form", "Arbitrary constant C", "Order of DE", "Whether DE is linear"], answer: "1", explanation: "Initial/boundary conditions determine the constant C in general solution", points: 10 }
      ]
    },
    {
      domainNumber: 7,
      domain: DOMAINS[7],
      title: "Statistical Process Control",
      description: "Monitor surveying processes using control charts",
      content: "Statistical Process Control (SPC) monitors measurement quality over time. Control charts detect systematic errors and process drift before they impact survey accuracy.",
      difficulty: "medium",
      orderIndex: 6,
      estimatedMinutes: 21,
      suggestedWeek: 18,
      questions: [
        { type: "multiple_choice", text: "Control charts monitor:", options: ["Final results only", "Process variation over time", "Equipment age", "Weather conditions"], answer: "1", explanation: "Control charts track process mean and variation to detect shifts/trends", points: 10 },
        { type: "multiple_choice", text: "Upper and lower control limits are typically set at:", options: ["±1σ", "±2σ", "±3σ", "±4σ"], answer: "2", explanation: "UCL/LCL commonly at ±3σ from centerline (99.7% of data if in control)", points: 10 },
        { type: "fill_in_blank", text: "A point outside control limits suggests the process is out of ___ (one word).", answer: "control", explanation: "Points beyond ±3σ indicate special cause variation (process out of control)", points: 10 },
        { type: "multiple_choice", text: "Common cause variation is:", options: ["Unexpected errors", "Normal process variability", "Equipment failure", "Operator mistakes"], answer: "1", explanation: "Common cause = inherent random variation; special cause = assignable/unusual", points: 10 },
        { type: "multiple_choice", text: "Seven consecutive points trending upward indicate:", options: ["Random variation", "Process in control", "Possible process shift", "Nothing unusual"], answer: "2", explanation: "Runs and trends suggest non-random patterns (process shift or drift)", points: 10 }
      ]
    },
    {
      domainNumber: 7,
      domain: DOMAINS[7],
      title: "Error Propagation and Analysis",
      description: "Quantify how measurement errors propagate through calculations",
      content: "Error propagation predicts uncertainty in computed values from measured values. Understanding propagation ensures reliable results and proper quality assessment.",
      difficulty: "hard",
      orderIndex: 7,
      estimatedMinutes: 24,
      suggestedWeek: 18,
      questions: [
        { type: "multiple_choice", text: "Error propagation determines:", options: ["Original measurement errors", "How errors combine in calculations", "Which errors to ignore", "Perfect measurements"], answer: "1", explanation: "Propagation calculates uncertainty in results from uncertainties in inputs", points: 10 },
        { type: "multiple_choice", text: "For Z = X + Y, the variance σ²_Z equals:", options: ["σ²_X + σ²_Y", "σ_X + σ_Y", "√(σ²_X + σ²_Y)", "σ_X · σ_Y"], answer: "0", explanation: "Addition/subtraction: variances add (σ²_Z = σ²_X + σ²_Y); std dev σ_Z = √(σ²_X + σ²_Y)", points: 10 },
        { type: "fill_in_blank", text: "For Z = X × Y, relative error combines approximately as √((σ_X/X)² + (σ_Y/Y)²). This is the ___ sum of relative errors (one word).", answer: "quadratic", explanation: "Multiplication: relative errors combine in quadrature (root-sum-square)", points: 10 },
        { type: "multiple_choice", text: "A distance measured 10 times with σ=0.01m has standard error of the mean:", options: ["0.01", "0.01/√10 ≈ 0.003", "0.01×10", "0.01/10"], answer: "1", explanation: "Standard error of mean = σ/√n; σ_mean = 0.01/√10 ≈ 0.00316m", points: 10 },
        { type: "multiple_choice", text: "Systematic errors:", options: ["Average to zero", "Do not reduce with repetition", "Are random", "Follow normal distribution"], answer: "1", explanation: "Systematic errors are consistent (bias); repetition doesn't reduce them (unlike random errors)", points: 10 }
      ]
    },
    {
      domainNumber: 7,
      domain: DOMAINS[7],
      title: "Matrix Operations for Adjustments",
      description: "Apply matrix algebra to least squares adjustments",
      content: "Matrices organize large systems of equations. Matrix operations (addition, multiplication, inversion) solve adjustment problems efficiently.",
      difficulty: "hard",
      orderIndex: 8,
      estimatedMinutes: 25,
      suggestedWeek: 18,
      questions: [
        { type: "multiple_choice", text: "Matrix multiplication AB requires:", options: ["Same dimensions", "Columns of A = rows of B", "Square matrices only", "Any dimensions"], answer: "1", explanation: "For AB: columns of A must equal rows of B (m×n × n×p = m×p)", points: 10 },
        { type: "multiple_choice", text: "The transpose of a matrix:", options: ["Adds rows and columns", "Swaps rows and columns", "Multiplies by -1", "Inverts it"], answer: "1", explanation: "Transpose A^T swaps rows and columns: element (i,j) becomes (j,i)", points: 10 },
        { type: "fill_in_blank", text: "Only ___ matrices can be inverted (one word).", answer: "square", explanation: "Matrix inverse A⁻¹ exists only for non-singular square matrices", points: 10 },
        { type: "multiple_choice", text: "In least squares, (A^T × A)^-1 × A^T is:", options: ["Design matrix", "Pseudoinverse", "Identity matrix", "Error vector"], answer: "1", explanation: "Normal equations use pseudoinverse to solve overdetermined systems", points: 10 },
        { type: "multiple_choice", text: "The identity matrix I has:", options: ["All ones", "1s on diagonal, 0s elsewhere", "All zeros", "Random values"], answer: "1", explanation: "Identity matrix: 1s on main diagonal, 0s off-diagonal; A×I = A", points: 10 }
      ]
    },
    {
      domainNumber: 7,
      domain: DOMAINS[7],
      title: "Probability and Distributions",
      description: "Understand probability distributions for error analysis",
      content: "Random errors follow probability distributions. The normal distribution describes most surveying errors. Understanding distributions supports statistical analysis.",
      difficulty: "medium",
      orderIndex: 9,
      estimatedMinutes: 22,
      suggestedWeek: 19,
      questions: [
        { type: "multiple_choice", text: "Random errors typically follow:", options: ["Uniform distribution", "Normal distribution", "Exponential distribution", "No pattern"], answer: "1", explanation: "Normal (Gaussian) distribution describes random errors in most measurements", points: 10 },
        { type: "multiple_choice", text: "In normal distribution, approximately 68% of values fall within:", options: ["±1σ", "±2σ", "±3σ", "±4σ"], answer: "0", explanation: "68% within ±1σ, 95% within ±2σ, 99.7% within ±3σ from mean", points: 10 },
        { type: "fill_in_blank", text: "The bell curve shape represents the ___ distribution (one word).", answer: "normal", explanation: "Normal distribution = bell curve = Gaussian distribution", points: 10 },
        { type: "multiple_choice", text: "Probability values range from:", options: ["0 to 100", "0 to 1", "-1 to +1", "Any value"], answer: "1", explanation: "Probability: 0 (impossible) to 1 (certain); percentages 0% to 100%", points: 10 },
        { type: "multiple_choice", text: "The standard normal distribution has mean:", options: ["-1", "0", "1", "100"], answer: "1", explanation: "Standard normal: mean = 0, standard deviation = 1", points: 10 }
      ]
    },
    {
      domainNumber: 7,
      domain: DOMAINS[7],
      title: "Hypothesis Testing and Confidence Intervals",
      description: "Apply statistical tests to surveying measurements",
      content: "Hypothesis testing evaluates whether differences are significant or random. Confidence intervals quantify uncertainty in estimates.",
      difficulty: "hard",
      orderIndex: 10,
      estimatedMinutes: 23,
      suggestedWeek: 19,
      questions: [
        { type: "multiple_choice", text: "A 95% confidence interval means:", options: ["95% of data falls here", "95% confident true value is in interval", "95% error", "Data is 95% correct"], answer: "1", explanation: "95% CI: 95% confidence the interval contains the true value", points: 10 },
        { type: "multiple_choice", text: "The null hypothesis typically states:", options: ["Differences exist", "No significant difference", "Errors are large", "Measurements are wrong"], answer: "1", explanation: "H₀ (null) assumes no effect/difference; test determines if data rejects this", points: 10 },
        { type: "fill_in_blank", text: "The p-value indicates the ___ of observing results if null hypothesis is true (one word).", answer: "probability", explanation: "p-value: probability of results occurring by chance; p<0.05 often considered significant", points: 10 },
        { type: "multiple_choice", text: "Rejecting a true null hypothesis is:", options: ["Type I error", "Type II error", "Correct decision", "Standard practice"], answer: "0", explanation: "Type I = false positive (rejecting true null); Type II = false negative (accepting false null)", points: 10 },
        { type: "multiple_choice", text: "Chi-square test is used for:", options: ["Mean comparison", "Variance comparison", "Both A and B", "Neither"], answer: "1", explanation: "Chi-square tests variance and goodness-of-fit; t-test compares means", points: 10 }
      ]
    },
    {
      domainNumber: 7,
      domain: DOMAINS[7],
      title: "Regression and Correlation",
      description: "Analyze relationships between surveying variables",
      content: "Regression finds best-fit relationships between variables. Correlation measures strength of relationships. These tools analyze systematic patterns in data.",
      difficulty: "medium",
      orderIndex: 11,
      estimatedMinutes: 20,
      suggestedWeek: 19,
      questions: [
        { type: "multiple_choice", text: "Linear regression finds the best-fit:", options: ["Curve", "Straight line", "Circle", "Parabola"], answer: "1", explanation: "Linear regression: y = a + bx (straight line minimizing squared vertical distances)", points: 10 },
        { type: "multiple_choice", text: "Correlation coefficient r ranges from:", options: ["0 to 1", "-1 to +1", "-100 to +100", "Any value"], answer: "1", explanation: "r = -1 (perfect negative) through 0 (no correlation) to +1 (perfect positive)", points: 10 },
        { type: "fill_in_blank", text: "r² (r-squared) represents the proportion of ___ explained by the regression (one word).", answer: "variance", explanation: "r² = coefficient of determination (0-1); closer to 1 = better fit", points: 10 },
        { type: "multiple_choice", text: "If r = +0.95, the variables are:", options: ["Weakly related", "Strongly positively related", "Strongly negatively related", "Unrelated"], answer: "1", explanation: "r near +1 indicates strong positive linear relationship", points: 10 },
        { type: "multiple_choice", text: "Correlation does not imply:", options: ["Relationship", "Association", "Causation", "Pattern"], answer: "2", explanation: "Correlation shows association but doesn't prove one variable causes the other", points: 10 }
      ]
    },
    {
      domainNumber: 7,
      domain: DOMAINS[7],
      title: "Numerical Methods and Interpolation",
      description: "Apply numerical techniques for surveying computations",
      content: "Numerical methods solve problems without exact formulas. Interpolation estimates values between known points. These techniques handle complex surveying calculations.",
      difficulty: "medium",
      orderIndex: 12,
      estimatedMinutes: 20,
      suggestedWeek: 20,
      questions: [
        { type: "multiple_choice", text: "Linear interpolation assumes:", options: ["Curved relationship", "Straight line between points", "No relationship", "Exponential change"], answer: "1", explanation: "Linear interpolation: straight line between known points", points: 10 },
        { type: "fill_in_blank", text: "To interpolate elevation at distance 50 between (0,100) and (100,120): E = 100 + (50/100) × (120-100) = ___ (number only).", answer: "110", explanation: "E = 100 + 0.5 × 20 = 100 + 10 = 110", points: 10 },
        { type: "multiple_choice", text: "Iteration is used to:", options: ["Solve equations by successive approximation", "Add numbers", "Draw maps", "Measure angles"], answer: "0", explanation: "Iterative methods refine approximations until convergence (e.g., Newton's method)", points: 10 },
        { type: "multiple_choice", text: "Inverse interpolation finds:", options: ["Value given position", "Position given value", "Neither", "Both"], answer: "1", explanation: "Inverse interpolation: given f(x)=y, find x (opposite of normal interpolation)", points: 10 },
        { type: "multiple_choice", text: "Extrapolation extends:", options: ["Within known data", "Beyond known data", "Exactly at data points", "Nowhere"], answer: "1", explanation: "Extrapolation predicts beyond data range; less reliable than interpolation", points: 10 }
      ]
    }
  ];

  // Create lessons with questions
  for (let idx = 0; idx < lessonsToCreate.length; idx++) {
    const lessonData = lessonsToCreate[idx];
    const { questions, ...lessonInfo } = lessonData;
    
    // Generate deterministic ID: d{domain}-lesson-{orderIndex:02}
    const lessonId = `d${lessonInfo.domainNumber}-lesson-${String(lessonInfo.orderIndex).padStart(2, '0')}`;
    
    const [lesson] = await db.insert(lessons).values({
      id: lessonId,
      domainNumber: lessonInfo.domainNumber,
      domain: lessonInfo.domain,
      title: lessonInfo.title,
      description: lessonInfo.description,
      content: lessonInfo.content,
      practicalProblem: practicalProblems[idx],
      difficulty: lessonInfo.difficulty,
      orderIndex: lessonInfo.orderIndex,
      estimatedMinutes: lessonInfo.estimatedMinutes,
      suggestedWeek: lessonInfo.suggestedWeek
    }).returning();

    console.log(`Created lesson: ${lesson.title}`);

    // Check if this lesson has archetypes for variation generation
    const archetypes = allArchetypes[lesson.id];
    
    if (archetypes && archetypes.length === questions.length) {
      // Use archetype system to generate all 5 variations per question
      const allVariations = generateLessonVariations(lesson.id);
      
      for (const variation of allVariations) {
        await db.insert(lessonQuestions).values({
          id: variation.id,
          lessonId: lesson.id,
          questionType: variation.questionType,
          questionText: variation.questionText,
          options: variation.options,
          correctAnswer: variation.correctAnswer,
          explanation: variation.explanation,
          orderIndex: variation.variationGroup, // orderIndex matches variationGroup
          variationGroup: variation.variationGroup,
          variationNumber: variation.variationNumber,
          points: variation.points
        });
      }
      console.log(`  Added ${allVariations.length} questions (5 variations × ${questions.length} questions)`);
    } else {
      // Fallback: Create only variation 1 for lessons without archetypes
      for (let i = 0; i < questions.length; i++) {
        const q = questions[i];
        const questionId = `${lesson.id}-q${String(i + 1).padStart(2, '0')}-v1`;
        await db.insert(lessonQuestions).values({
          id: questionId,
          lessonId: lesson.id,
          questionType: q.type,
          questionText: q.text,
          options: q.options || null,
          correctAnswer: q.answer,
          explanation: q.explanation,
          orderIndex: i + 1,
          variationGroup: i + 1,
          variationNumber: 1,
          points: q.points
        });
      }
      console.log(`  Added ${questions.length} questions (variation 1 only - no archetypes)`);
    }
  }

  console.log("Lesson seeding completed!");
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedLessons().then(() => process.exit(0)).catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
  });
}

export { seedLessons };
