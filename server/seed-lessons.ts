import { db } from "./db";
import { lessons, lessonQuestions } from "@shared/schema";
import { eq } from "drizzle-orm";

// 7 NCEES Domains
const DOMAINS = {
  1: "Surveying Processes and Methods",
  2: "Mapping Processes and Methods",
  3: "Boundary Law and Real Property Principles",
  4: "Surveying Principles",
  5: "Survey Computations and Computer Applications",
  6: "Business Concepts",
  7: "Applied Mathematics and Statistics"
};

async function seedLessons() {
  console.log("Starting lesson seeding...");

  // Delete existing lessons
  await db.delete(lessons);
  console.log("Deleted existing lessons");

  // ========== DOMAIN 7: Applied Mathematics & Statistics (12 lessons) ==========
  const lessonsToCreate = [
    // DOMAIN 7: Applied Math - 12 lessons
    {
      domainNumber: 7,
      domain: DOMAINS[7],
      title: "Trigonometry Fundamentals",
      description: "Master sine, cosine, tangent, and their applications in surveying",
      content: "Trigonometry is essential for surveying calculations. The three primary ratios (SOH-CAH-TOA) form the foundation for solving triangles.",
      difficulty: "easy",
      orderIndex: 1,
      estimatedMinutes: 20,
      suggestedWeek: 1,
      questions: [
        { type: "multiple_choice", text: "If sin(30°) = 0.5, what is the opposite side when hypotenuse = 10?", options: ["2", "5", "10", "20"], answer: "1", explanation: "sin(θ) = opposite/hypotenuse, so opposite = sin(30°) × 10 = 0.5 × 10 = 5", points: 10 },
        { type: "multiple_choice", text: "What trigonometric ratio uses adjacent/hypotenuse?", options: ["Sine", "Cosine", "Tangent", "Cotangent"], answer: "1", explanation: "Cosine = adjacent/hypotenuse (CAH in SOH-CAH-TOA)", points: 10 },
        { type: "fill_in_blank", text: "If tan(45°) = 1 and the opposite side is 8m, the adjacent side is ___ meters.", answer: "8", explanation: "tan(θ) = opposite/adjacent, so adjacent = opposite/tan(45°) = 8/1 = 8m", points: 10 },
        { type: "multiple_choice", text: "In a right triangle, if one angle is 90° and another is 30°, what is the third angle?", options: ["30°", "45°", "60°", "90°"], answer: "2", explanation: "The sum of angles in a triangle is 180°. So 180° - 90° - 30° = 60°", points: 10 },
        { type: "multiple_choice", text: "Which function is the reciprocal of cosine?", options: ["Sine", "Secant", "Tangent", "Cosecant"], answer: "1", explanation: "Secant (sec) = 1/cos. Cosecant is reciprocal of sine, cotangent is reciprocal of tangent.", points: 10 }
      ]
    },
    {
      domainNumber: 7,
      domain: DOMAINS[7],
      title: "Law of Sines and Cosines",
      description: "Apply the law of sines and cosines to solve oblique triangles",
      content: "For non-right triangles, we use the Law of Sines (a/sin A = b/sin B = c/sin C) and Law of Cosines (c² = a² + b² - 2ab cos C).",
      difficulty: "medium",
      orderIndex: 2,
      estimatedMinutes: 25,
      suggestedWeek: 1,
      questions: [
        { type: "multiple_choice", text: "The Law of Sines relates triangle sides to which values?", options: ["Angles", "Sines of angles", "Cosines of angles", "Tangents"], answer: "1", explanation: "Law of Sines: a/sin(A) = b/sin(B) = c/sin(C)", points: 10 },
        { type: "multiple_choice", text: "When should you use the Law of Cosines instead of Law of Sines?", options: ["When you know all three sides", "When you know two angles", "When it's a right triangle", "Never"], answer: "0", explanation: "Law of Cosines is used when you know all three sides (SSS) or two sides and included angle (SAS)", points: 10 },
        { type: "fill_in_blank", text: "In triangle ABC, if a=5m, b=7m, c=8m, you would use the Law of ___ to find angle A.", answer: "Cosines", explanation: "With all three sides known (SSS), use Law of Cosines: cos(A) = (b²+c²-a²)/(2bc)", points: 10 },
        { type: "multiple_choice", text: "The Law of Cosines reduces to the Pythagorean theorem when the angle is:", options: ["30°", "45°", "60°", "90°"], answer: "3", explanation: "When C=90°, cos(90°)=0, so c²=a²+b²-0, which is the Pythagorean theorem", points: 10 },
        { type: "multiple_choice", text: "In surveying, which law is most useful for solving traverse closures?", options: ["Law of Sines", "Law of Cosines", "Law of Tangents", "Pythagorean Theorem"], answer: "1", explanation: "Law of Cosines is essential for traverse calculations where you have distances and need to find angles", points: 10 }
      ]
    },
    {
      domainNumber: 7,
      domain: DOMAINS[7],
      title: "Coordinate Geometry",
      description: "Calculate distances, bearings, and coordinates in 2D space",
      content: "Coordinate geometry is fundamental for surveying. The distance formula d = √[(x₂-x₁)² + (y₂-y₁)²] and bearing calculations are essential.",
      difficulty: "medium",
      orderIndex: 3,
      estimatedMinutes: 20,
      suggestedWeek: 2,
      questions: [
        { type: "fill_in_blank", text: "The distance between points (0,0) and (3,4) is ___ units.", answer: "5", explanation: "d = √[(3-0)² + (4-0)²] = √[9+16] = √25 = 5", points: 10 },
        { type: "multiple_choice", text: "What is the bearing from point A(100,200) to point B(100,300)?", options: ["N", "E", "S", "W"], answer: "0", explanation: "X is the same, Y increased, so direction is North (0° or 360°)", points: 10 },
        { type: "fill_in_blank", text: "If ΔN=30m and ΔE=40m, the horizontal distance is ___ meters.", answer: "50", explanation: "d = √(ΔN² + ΔE²) = √(30² + 40²) = √(900+1600) = √2500 = 50m", points: 10 },
        { type: "multiple_choice", text: "In the bearing system, N30°E means 30° measured from:", options: ["North towards East", "East towards North", "South towards East", "West towards North"], answer: "0", explanation: "N30°E means start from North, measure 30° towards East", points: 10 },
        { type: "multiple_choice", text: "An azimuth of 90° is equivalent to which bearing?", options: ["N90°E", "E", "Due East", "Both B and C"], answer: "3", explanation: "Azimuth 90° = Due East = N90°E", points: 10 }
      ]
    },
    {
      domainNumber: 7,
      domain: DOMAINS[7],
      title: "Unit Conversions",
      description: "Convert between different measurement units used in surveying",
      content: "Surveyors must be proficient in converting units: feet to meters, acres to hectares, degrees to gradians, etc.",
      difficulty: "easy",
      orderIndex: 4,
      estimatedMinutes: 15,
      suggestedWeek: 2,
      questions: [
        { type: "fill_in_blank", text: "1 acre equals approximately ___ square feet.", answer: "43560", explanation: "1 acre = 43,560 square feet (this is a key conversion to memorize)", points: 10 },
        { type: "fill_in_blank", text: "1 meter equals ___ feet (round to 2 decimals).", answer: "3.28", explanation: "1m = 3.28084 feet ≈ 3.28 feet", points: 10 },
        { type: "multiple_choice", text: "How many feet are in a surveyor's chain?", options: ["33 feet", "66 feet", "100 feet", "660 feet"], answer: "1", explanation: "A surveyor's chain (Gunter's chain) = 66 feet = 100 links", points: 10 },
        { type: "fill_in_blank", text: "1 mile equals ___ feet.", answer: "5280", explanation: "1 mile = 5,280 feet (essential conversion for boundary descriptions)", points: 10 },
        { type: "multiple_choice", text: "1 hectare is approximately how many acres?", options: ["1.5 acres", "2.0 acres", "2.47 acres", "3.0 acres"], answer: "2", explanation: "1 hectare = 2.471 acres ≈ 2.47 acres", points: 10 }
      ]
    },
    {
      domainNumber: 7,
      domain: DOMAINS[7],
      title: "Statistics and Error Theory",
      description: "Understand statistical concepts for measurement analysis",
      content: "Statistical analysis helps surveyors evaluate measurement quality. Mean, median, standard deviation, and error propagation are key concepts.",
      difficulty: "medium",
      orderIndex: 5,
      estimatedMinutes: 25,
      suggestedWeek: 2,
      questions: [
        { type: "multiple_choice", text: "Which measure of central tendency is most affected by outliers?", options: ["Mean", "Median", "Mode", "Range"], answer: "0", explanation: "The mean is most affected by outliers because it uses all values in the calculation", points: 10 },
        { type: "fill_in_blank", text: "For measurements 10, 12, 14, 16, 18, the mean is ___.", answer: "14", explanation: "Mean = (10+12+14+16+18)/5 = 70/5 = 14", points: 10 },
        { type: "multiple_choice", text: "What type of error can be reduced by taking more measurements?", options: ["Systematic error", "Random error", "Gross error", "Instrument error"], answer: "1", explanation: "Random errors follow statistical laws and can be reduced by averaging more measurements", points: 10 },
        { type: "multiple_choice", text: "Standard deviation measures:", options: ["Central tendency", "Dispersion from mean", "Maximum error", "Systematic bias"], answer: "1", explanation: "Standard deviation quantifies how spread out measurements are from the mean", points: 10 },
        { type: "multiple_choice", text: "In least squares adjustment, what is minimized?", options: ["Sum of errors", "Sum of absolute errors", "Sum of squared errors", "Maximum error"], answer: "2", explanation: "Least squares minimizes the sum of squared residuals (errors)", points: 10 }
      ]
    },
    {
      domainNumber: 7,
      domain: DOMAINS[7],
      title: "Algebra and Equation Solving",
      description: "Apply algebraic techniques to surveying problems",
      content: "Algebraic manipulation is essential for solving surveying equations, including systems of equations and quadratic formulas.",
      difficulty: "easy",
      orderIndex: 6,
      estimatedMinutes: 15,
      suggestedWeek: 3,
      questions: [
        { type: "fill_in_blank", text: "Solve for x: 2x + 6 = 14. x = ___", answer: "4", explanation: "2x = 14 - 6 = 8, so x = 4", points: 10 },
        { type: "multiple_choice", text: "The quadratic formula solves equations of the form:", options: ["ax + b = 0", "ax² + bx + c = 0", "ax³ + bx² + cx + d = 0", "a/x + b = 0"], answer: "1", explanation: "The quadratic formula x = [-b ± √(b²-4ac)]/2a solves ax² + bx + c = 0", points: 10 },
        { type: "fill_in_blank", text: "If y = 3x + 5 and x = 2, then y = ___.", answer: "11", explanation: "y = 3(2) + 5 = 6 + 5 = 11", points: 10 },
        { type: "multiple_choice", text: "To solve a system of two equations with two unknowns, you need:", options: ["1 equation", "2 equations", "3 equations", "4 equations"], answer: "1", explanation: "For two unknowns, you need exactly two independent equations", points: 10 },
        { type: "multiple_choice", text: "In the equation d = rt, if you know d and r, which operation finds t?", options: ["Multiply d by r", "Divide d by r", "Add d and r", "Subtract r from d"], answer: "1", explanation: "t = d/r (isolate t by dividing both sides by r)", points: 10 }
      ]
    },

    // Continue with more Domain 7 lessons...
    {
      domainNumber: 7,
      domain: DOMAINS[7],
      title: "Geometry: Areas and Volumes",
      description: "Calculate areas of parcels and volumes for earthwork",
      content: "Area and volume calculations are critical for boundary surveys and construction staking.",
      difficulty: "medium",
      orderIndex: 7,
      estimatedMinutes: 20,
      suggestedWeek: 3,
      questions: [
        { type: "fill_in_blank", text: "The area of a rectangle with length 50m and width 30m is ___ square meters.", answer: "1500", explanation: "Area = length × width = 50 × 30 = 1,500 m²", points: 10 },
        { type: "fill_in_blank", text: "The area of a triangle with base 10m and height 8m is ___ square meters.", answer: "40", explanation: "Area = (1/2) × base × height = 0.5 × 10 × 8 = 40 m²", points: 10 },
        { type: "multiple_choice", text: "For an irregular parcel, which method is most commonly used?", options: ["Triangle formula", "Rectangle formula", "Coordinate method", "Estimation"], answer: "2", explanation: "The coordinate method (shoelace formula) is standard for irregular polygons in surveying", points: 10 },
        { type: "fill_in_blank", text: "A circle with radius 5m has an area of approximately ___ square meters (use π≈3.14).", answer: "78.5", explanation: "Area = πr² = 3.14 × 5² = 3.14 × 25 = 78.5 m²", points: 10 },
        { type: "multiple_choice", text: "The volume of a rectangular prism is calculated by:", options: ["Length + Width + Height", "Length × Width", "Length × Width × Height", "2(L+W+H)"], answer: "2", explanation: "Volume = L × W × H for a rectangular prism", points: 10 }
      ]
    }
  ];

  // Create lessons with questions
  for (const lessonData of lessonsToCreate) {
    const { questions, ...lessonInfo } = lessonData;
    
    const [lesson] = await db.insert(lessons).values({
      domainNumber: lessonInfo.domainNumber,
      domain: lessonInfo.domain,
      title: lessonInfo.title,
      description: lessonInfo.description,
      content: lessonInfo.content,
      difficulty: lessonInfo.difficulty,
      orderIndex: lessonInfo.orderIndex,
      estimatedMinutes: lessonInfo.estimatedMinutes,
      suggestedWeek: lessonInfo.suggestedWeek
    }).returning();

    console.log(`Created lesson: ${lesson.title}`);

    // Create questions for this lesson
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      await db.insert(lessonQuestions).values({
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
    console.log(`  Added ${questions.length} questions`);
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
