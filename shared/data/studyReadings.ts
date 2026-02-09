import type { ReadingModule } from '../schema';
import { STUDY_READINGS_D2 } from './studyReadingsD2';
import { STUDY_READINGS_D3 } from './studyReadingsD3';
import { STUDY_READINGS_D4D6 } from './studyReadingsD4D6';
import { STUDY_READINGS_D5 } from './studyReadingsD5';
import { STUDY_READINGS_D5_EXPANDED } from './studyReadingsD5Expanded';
import { STUDY_READINGS_D4_EXPANDED } from './studyReadingsD4Expanded';
import { STUDY_READINGS_D6_EXPANDED } from './studyReadingsD6Expanded';
import { STUDY_READINGS_D7_EXPANDED } from './studyReadingsD7Expanded';
import { STUDY_READINGS_D1D2_EXPANDED } from './studyReadingsD1D2Expanded';
import { STUDY_READINGS_STANDARDS } from './studyReadingsStandards';

const STUDY_READINGS_BASE: ReadingModule[] = [
  {
    id: 'fs-d0-trig',
    examTrack: 'fs',
    domainNumber: 0,
    domain: 'Math & Basic Science',
    title: 'Trigonometry for Surveyors',
    description: 'Master the trigonometric relationships essential to surveying calculations, including right triangle ratios, oblique triangle solutions, and bearing/azimuth conversions.',
    estimatedMinutes: 20,
    sections: [
      {
        id: 'fs-d0-trig-s1',
        type: 'concept',
        title: 'Right Triangle Trigonometry (SOH-CAH-TOA)',
        content: 'Every right triangle contains one 90-degree angle and two acute angles. The three primary trigonometric ratios relate the sides of a right triangle to its acute angles. Given an acute angle A in a right triangle:\n\n- Sine (sin) = Opposite side / Hypotenuse\n- Cosine (cos) = Adjacent side / Hypotenuse\n- Tangent (tan) = Opposite side / Adjacent side\n\nThe mnemonic SOH-CAH-TOA helps you remember these ratios. In surveying, right triangles appear constantly: when computing horizontal distances from slope measurements, finding elevation differences, and resolving vectors into north/east components.',
      },
      {
        id: 'fs-d0-trig-s2',
        type: 'formula',
        title: 'SOH-CAH-TOA Formulas',
        formula: {
          expression: 'sin(A) = opposite / hypotenuse; cos(A) = adjacent / hypotenuse; tan(A) = opposite / adjacent',
          variables: [
            { symbol: 'A', description: 'An acute angle in the right triangle' },
            { symbol: 'opposite', description: 'The side across from angle A' },
            { symbol: 'adjacent', description: 'The side next to angle A (not the hypotenuse)' },
            { symbol: 'hypotenuse', description: 'The longest side, opposite the 90-degree angle' },
          ],
          whenToUse: 'Use when you have a right triangle and need to find an unknown side or angle. Common in slope distance to horizontal distance conversions and vertical angle problems.',
        },
      },
      {
        id: 'fs-d0-trig-s3',
        type: 'worked_example',
        title: 'Finding Horizontal Distance from Slope',
        workedExample: {
          problem: 'A surveyor measures a slope distance of 325.48 ft from point A to point B at a vertical angle of 8 degrees 15 minutes above horizontal. What is the horizontal distance?',
          steps: [
            { step: 1, description: 'Convert the vertical angle to decimal degrees.', calculation: '8 + 15/60 = 8.25 degrees' },
            { step: 2, description: 'The horizontal distance is the adjacent side. Use cosine: HD = SD * cos(vertical angle).', calculation: 'HD = 325.48 * cos(8.25)' },
            { step: 3, description: 'Evaluate cos(8.25) and multiply.', calculation: 'cos(8.25) = 0.98966; HD = 325.48 * 0.98966 = 322.11 ft' },
          ],
          answer: 'The horizontal distance is 322.11 ft.',
        },
      },
      {
        id: 'fs-d0-trig-s4',
        type: 'knowledge_check',
        title: 'Right Triangle Check',
        knowledgeCheck: {
          question: 'A right triangle has an angle of 34 degrees and a hypotenuse of 200.00 ft. Which expression gives the length of the side opposite the 34-degree angle?',
          options: [
            '200.00 * cos(34)',
            '200.00 * sin(34)',
            '200.00 * tan(34)',
            '200.00 / sin(34)',
          ],
          correctIndex: 1,
          explanation: 'The sine ratio relates the opposite side to the hypotenuse: sin(34) = opposite / 200.00, so opposite = 200.00 * sin(34). Cosine would give the adjacent side, and tangent uses opposite/adjacent.',
        },
      },
      {
        id: 'fs-d0-trig-s5',
        type: 'formula',
        title: 'Law of Sines',
        formula: {
          expression: 'a / sin(A) = b / sin(B) = c / sin(C)',
          variables: [
            { symbol: 'a, b, c', description: 'The sides of the triangle opposite angles A, B, and C respectively' },
            { symbol: 'A, B, C', description: 'The interior angles of the triangle' },
          ],
          whenToUse: 'Use when you know two angles and one side (AAS or ASA), or two sides and an angle opposite one of them (SSA). Common in triangulation networks and resolving oblique survey triangles.',
        },
      },
      {
        id: 'fs-d0-trig-s6',
        type: 'worked_example',
        title: 'Solving an Oblique Triangle with Law of Sines',
        workedExample: {
          problem: 'In triangle PQR, angle P = 47 degrees, angle Q = 63 degrees, and side p (opposite angle P) = 185.60 ft. Find the length of side q (opposite angle Q).',
          steps: [
            { step: 1, description: 'Write the Law of Sines relationship for the known and unknown values.', calculation: 'p / sin(P) = q / sin(Q)' },
            { step: 2, description: 'Substitute known values.', calculation: '185.60 / sin(47) = q / sin(63)' },
            { step: 3, description: 'Solve for q.', calculation: 'q = 185.60 * sin(63) / sin(47) = 185.60 * 0.89101 / 0.73135 = 226.14 ft' },
          ],
          answer: 'Side q = 226.14 ft.',
        },
      },
      {
        id: 'fs-d0-trig-s7',
        type: 'formula',
        title: 'Law of Cosines',
        formula: {
          expression: 'c^2 = a^2 + b^2 - 2ab * cos(C)',
          variables: [
            { symbol: 'a, b', description: 'Two known sides of the triangle' },
            { symbol: 'c', description: 'The side opposite angle C (the unknown side)' },
            { symbol: 'C', description: 'The included angle between sides a and b' },
          ],
          whenToUse: 'Use when you know two sides and the included angle (SAS) or all three sides (SSS) and need to find an angle. Essential for traverse computations and parcel area calculations where triangles are not right triangles.',
        },
      },
      {
        id: 'fs-d0-trig-s8',
        type: 'worked_example',
        title: 'Finding a Missing Side with Law of Cosines',
        workedExample: {
          problem: 'Two property lines meet at a corner. Line AB is 412.35 ft, line AC is 378.90 ft, and the included angle at A is 72 degrees 30 minutes. Find the distance BC.',
          steps: [
            { step: 1, description: 'Convert the angle to decimal degrees.', calculation: '72 + 30/60 = 72.5 degrees' },
            { step: 2, description: 'Apply the Law of Cosines: BC^2 = AB^2 + AC^2 - 2(AB)(AC) * cos(A).', calculation: 'BC^2 = 412.35^2 + 378.90^2 - 2(412.35)(378.90) * cos(72.5)' },
            { step: 3, description: 'Compute each term.', calculation: '412.35^2 = 170,032.72; 378.90^2 = 143,565.21; 2(412.35)(378.90) * cos(72.5) = 312,481.53 * 0.30071 = 93,967.47' },
            { step: 4, description: 'Combine and take the square root.', calculation: 'BC^2 = 170,032.72 + 143,565.21 - 93,967.47 = 219,630.46; BC = 468.65 ft' },
          ],
          answer: 'The distance BC is 468.65 ft.',
        },
      },
      {
        id: 'fs-d0-trig-s9',
        type: 'concept',
        title: 'Bearings and Azimuths',
        content: 'Surveyors describe directions using two systems:\n\nBearings measure angles from either North or South toward East or West, always between 0 and 90 degrees. They are written as a quadrant notation, e.g., N 45 00 E means 45 degrees measured clockwise from North toward East.\n\nAzimuths are measured clockwise from North, ranging from 0 to 360 degrees. An azimuth of 135 degrees points Southeast.\n\nConversion rules:\n- NE quadrant (bearing N x E): Azimuth = x\n- SE quadrant (bearing S x E): Azimuth = 180 - x\n- SW quadrant (bearing S x W): Azimuth = 180 + x\n- NW quadrant (bearing N x W): Azimuth = 360 - x\n\nOn the FS exam, you must be comfortable converting between these systems quickly.',
      },
      {
        id: 'fs-d0-trig-s10',
        type: 'knowledge_check',
        title: 'Bearing to Azimuth Conversion',
        knowledgeCheck: {
          question: 'What is the azimuth equivalent of the bearing S 37 15 W?',
          options: [
            '37 degrees 15 minutes',
            '142 degrees 45 minutes',
            '217 degrees 15 minutes',
            '322 degrees 45 minutes',
          ],
          correctIndex: 2,
          explanation: 'For the SW quadrant, azimuth = 180 + bearing angle. So azimuth = 180 + 37 degrees 15 minutes = 217 degrees 15 minutes. The SW quadrant azimuths range from 180 to 270 degrees.',
        },
      },
      {
        id: 'fs-d0-trig-s11',
        type: 'further_reading',
        title: 'Trigonometry References',
        furtherReading: [
          { book: 'Elementary Surveying: An Introduction to Geomatics (Ghilani & Wolf)', chapter: 'Chapter 9', topic: 'Traverse Computations and trigonometric applications' },
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic 1', topic: 'Mathematics fundamentals including trigonometry review' },
        ],
      },
    ],
  },
  {
    id: 'fs-d0-cogo',
    examTrack: 'fs',
    domainNumber: 0,
    domain: 'Math & Basic Science',
    title: 'Coordinate Geometry Essentials',
    description: 'Learn the coordinate geometry (COGO) methods surveyors use daily: computing distances, directions, and areas from coordinate pairs.',
    estimatedMinutes: 20,
    sections: [
      {
        id: 'fs-d0-cogo-s1',
        type: 'concept',
        title: 'The Surveying Coordinate System',
        content: 'Surveyors use a Cartesian coordinate system where positions are described by Northing (Y) and Easting (X) values. By convention, Northing increases upward (north) and Easting increases to the right (east).\n\nState Plane Coordinate Systems assign large coordinate values so that all points in a zone have positive northings and eastings. When working with coordinates, the difference in northings (Delta N) and the difference in eastings (Delta E) between two points are the building blocks for computing distances and directions.\n\nDelta N = N2 - N1 (positive means point 2 is north of point 1)\nDelta E = E2 - E1 (positive means point 2 is east of point 1)',
      },
      {
        id: 'fs-d0-cogo-s2',
        type: 'formula',
        title: 'Distance Formula',
        formula: {
          expression: 'D = sqrt((N2 - N1)^2 + (E2 - E1)^2)',
          variables: [
            { symbol: 'D', description: 'Horizontal distance between two points' },
            { symbol: 'N1, N2', description: 'Northing coordinates of point 1 and point 2' },
            { symbol: 'E1, E2', description: 'Easting coordinates of point 1 and point 2' },
          ],
          whenToUse: 'Use to compute the straight-line horizontal distance between any two points when you know their coordinates. This is the most fundamental COGO computation.',
        },
      },
      {
        id: 'fs-d0-cogo-s3',
        type: 'worked_example',
        title: 'Computing Distance Between Two Survey Points',
        workedExample: {
          problem: 'Monument A has coordinates N 5,280.45, E 3,150.20 and monument B has coordinates N 5,615.80, E 3,492.65. Find the horizontal distance from A to B.',
          steps: [
            { step: 1, description: 'Compute the difference in northings.', calculation: 'Delta N = 5,615.80 - 5,280.45 = 335.35 ft' },
            { step: 2, description: 'Compute the difference in eastings.', calculation: 'Delta E = 3,492.65 - 3,150.20 = 342.45 ft' },
            { step: 3, description: 'Apply the distance formula.', calculation: 'D = sqrt(335.35^2 + 342.45^2) = sqrt(112,459.62 + 117,271.80) = sqrt(229,731.42) = 479.30 ft' },
          ],
          answer: 'The horizontal distance from A to B is 479.30 ft.',
        },
      },
      {
        id: 'fs-d0-cogo-s4',
        type: 'concept',
        title: 'Inverse Calculation: Direction from Coordinates',
        content: 'The inverse problem asks: given two points with known coordinates, what is the azimuth (direction) from one to the other?\n\nStart by computing Delta N and Delta E. Then find the reference angle using:\n\nReference angle = arctan(|Delta E| / |Delta N|)\n\nThe signs of Delta N and Delta E tell you which quadrant the direction falls in:\n- Delta N positive, Delta E positive: NE quadrant (azimuth = reference angle)\n- Delta N negative, Delta E positive: SE quadrant (azimuth = 180 - reference angle)\n- Delta N negative, Delta E negative: SW quadrant (azimuth = 180 + reference angle)\n- Delta N positive, Delta E negative: NW quadrant (azimuth = 360 - reference angle)\n\nThis is often called the "inverse" because you are working backward from coordinates to distance and direction.',
      },
      {
        id: 'fs-d0-cogo-s5',
        type: 'worked_example',
        title: 'Inverse Calculation: Finding Azimuth',
        workedExample: {
          problem: 'Point 1 has coordinates N 10,250.00, E 8,430.00. Point 2 has coordinates N 9,875.00, E 8,780.00. Find the azimuth from point 1 to point 2.',
          steps: [
            { step: 1, description: 'Compute coordinate differences.', calculation: 'Delta N = 9,875.00 - 10,250.00 = -375.00; Delta E = 8,780.00 - 8,430.00 = +350.00' },
            { step: 2, description: 'Determine the quadrant. Delta N is negative (south) and Delta E is positive (east), so the direction is in the SE quadrant.', calculation: 'SE quadrant' },
            { step: 3, description: 'Compute the reference angle.', calculation: 'ref = arctan(350.00 / 375.00) = arctan(0.93333) = 43.03 degrees' },
            { step: 4, description: 'Apply the SE quadrant rule.', calculation: 'Azimuth = 180 - 43.03 = 136.97 degrees (or 136 degrees 58 minutes)' },
          ],
          answer: 'The azimuth from point 1 to point 2 is 136 degrees 58 minutes (SE direction).',
        },
      },
      {
        id: 'fs-d0-cogo-s6',
        type: 'knowledge_check',
        title: 'Inverse Problem Check',
        knowledgeCheck: {
          question: 'Point A is at N 2,000, E 3,000 and Point B is at N 2,400, E 2,700. In which quadrant does the azimuth from A to B fall?',
          options: [
            'NE quadrant (0 to 90 degrees)',
            'SE quadrant (90 to 180 degrees)',
            'SW quadrant (180 to 270 degrees)',
            'NW quadrant (270 to 360 degrees)',
          ],
          correctIndex: 3,
          explanation: 'Delta N = 2,400 - 2,000 = +400 (north). Delta E = 2,700 - 3,000 = -300 (west). Positive northing and negative easting places the direction in the NW quadrant, so the azimuth is between 270 and 360 degrees.',
        },
      },
      {
        id: 'fs-d0-cogo-s7',
        type: 'formula',
        title: 'Area by Coordinates (Shoelace Formula)',
        formula: {
          expression: '2A = sum of (Ni * Ei+1 - Ni+1 * Ei) for all vertices i',
          variables: [
            { symbol: 'A', description: 'Area of the polygon' },
            { symbol: 'Ni, Ei', description: 'Northing and Easting of vertex i' },
            { symbol: 'Ni+1, Ei+1', description: 'Northing and Easting of the next vertex (wrapping back to vertex 1 after the last)' },
          ],
          whenToUse: 'Use to compute the area of any polygon (parcel, lot, tract) when you know the coordinates of all corners. List the vertices in order around the boundary. The absolute value of the result gives twice the area. This is the standard method for computing deed areas from survey coordinates.',
        },
      },
      {
        id: 'fs-d0-cogo-s8',
        type: 'worked_example',
        title: 'Computing Parcel Area by Coordinates',
        workedExample: {
          problem: 'A triangular parcel has corners at: P1 (N 1,000, E 2,000), P2 (N 1,450, E 2,600), P3 (N 1,100, E 2,800). Compute the area in square feet.',
          steps: [
            { step: 1, description: 'Set up the coordinate cross-multiplication. List vertices in order, repeating the first at the end.', calculation: 'P1(1000,2000) -> P2(1450,2600) -> P3(1100,2800) -> P1(1000,2000)' },
            { step: 2, description: 'Compute the sum of (Ni * Ei+1): products going one direction.', calculation: '(1000*2600) + (1450*2800) + (1100*2000) = 2,600,000 + 4,060,000 + 2,200,000 = 8,860,000' },
            { step: 3, description: 'Compute the sum of (Ni+1 * Ei): products going the other direction.', calculation: '(1450*2000) + (1100*2600) + (1000*2800) = 2,900,000 + 2,860,000 + 2,800,000 = 8,560,000' },
            { step: 4, description: 'Subtract and take absolute value, then divide by 2.', calculation: '|8,860,000 - 8,560,000| / 2 = 300,000 / 2 = 150,000 sq ft' },
          ],
          answer: 'The parcel area is 150,000 sq ft (approximately 3.44 acres).',
        },
      },
      {
        id: 'fs-d0-cogo-s9',
        type: 'knowledge_check',
        title: 'Coordinate Area Check',
        knowledgeCheck: {
          question: 'When using the coordinate method to calculate area, what happens if you list the vertices in clockwise order instead of counterclockwise?',
          options: [
            'The computed area will be incorrect',
            'The formula will produce a negative value, but the absolute value still gives the correct area',
            'You must restart the calculation',
            'The area will be doubled',
          ],
          correctIndex: 1,
          explanation: 'The Shoelace formula produces a positive result for counterclockwise ordering and a negative result for clockwise ordering. Taking the absolute value gives the correct area regardless of the direction you list the vertices.',
        },
      },
      {
        id: 'fs-d0-cogo-s10',
        type: 'further_reading',
        title: 'Coordinate Geometry References',
        furtherReading: [
          { book: 'Elementary Surveying: An Introduction to Geomatics (Ghilani & Wolf)', chapter: 'Chapter 10', topic: 'Area computations and coordinate geometry methods' },
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic 3', topic: 'Plane survey calculations and COGO procedures' },
          { book: 'Surveying Solved Problems (Buckner)', chapter: 'Part II', topic: 'Worked COGO problems with step-by-step solutions' },
        ],
      },
    ],
  },
  {
    id: 'fs-d0-units',
    examTrack: 'fs',
    domainNumber: 0,
    domain: 'Math & Basic Science',
    title: 'Unit Conversions & Measurement',
    description: 'Review the unit conversion factors surveyors must know, including metric/imperial, survey feet vs. international feet, angular conversions, and area units.',
    estimatedMinutes: 15,
    sections: [
      {
        id: 'fs-d0-units-s1',
        type: 'concept',
        title: 'Metric and Imperial Length Conversions',
        content: 'Surveyors in the United States work primarily in feet, but many projects, federal agencies, and international work require metric units. The key conversion factors are:\n\n- 1 meter = 3.28084 international feet\n- 1 meter = 39.3701 inches\n- 1 kilometer = 0.621371 miles\n- 1 inch = 2.54 centimeters (exact)\n- 1 chain = 66 feet = 4 rods\n- 1 mile = 80 chains = 5,280 feet\n\nFor the FS exam, you should be able to convert between meters and feet quickly. Many reference values on the exam are given in SI units, and being fluent with these conversions saves valuable time.',
      },
      {
        id: 'fs-d0-units-s2',
        type: 'concept',
        title: 'U.S. Survey Foot vs. International Foot',
        content: 'There are two slightly different definitions of the foot used in U.S. surveying:\n\n- International foot: 1 ft = 0.3048 m (exact). Adopted as the standard in most applications since 1959.\n- U.S. Survey foot: 1 ft = 1200/3937 m (approximately 0.30480061 m). This was the historic definition used by the National Geodetic Survey.\n\nThe difference is about 2 parts per million, or roughly 0.01 ft per mile. While tiny, it matters for State Plane Coordinates and geodetic work. As of January 1, 2023, the U.S. officially retired the survey foot in favor of the international foot for all new work, though legacy data still uses the survey foot.\n\nOn the FS exam, pay attention to whether a problem specifies "survey feet" or "international feet" when converting to/from meters.',
      },
      {
        id: 'fs-d0-units-s3',
        type: 'worked_example',
        title: 'Converting Meters to Survey Feet',
        workedExample: {
          problem: 'A GPS baseline measurement gives a distance of 1,523.847 meters. Convert this to U.S. survey feet.',
          steps: [
            { step: 1, description: 'Recall the U.S. survey foot conversion: 1 m = 3937/1200 survey feet.', calculation: '3937 / 1200 = 3.28083333... survey ft per meter' },
            { step: 2, description: 'Multiply the meter value by the conversion factor.', calculation: '1,523.847 * (3937/1200) = 1,523.847 * 3.28083333 = 4,999.835 survey ft' },
          ],
          answer: 'The distance is 4,999.835 U.S. survey feet.',
        },
      },
      {
        id: 'fs-d0-units-s4',
        type: 'formula',
        title: 'DMS to Decimal Degrees',
        formula: {
          expression: 'DD = D + M/60 + S/3600',
          variables: [
            { symbol: 'DD', description: 'Angle in decimal degrees' },
            { symbol: 'D', description: 'Whole degrees' },
            { symbol: 'M', description: 'Minutes (0 to 59)' },
            { symbol: 'S', description: 'Seconds (0 to 59.999...)' },
          ],
          whenToUse: 'Use to convert an angle expressed in degrees-minutes-seconds (DMS) format to decimal degrees for calculator input. Most scientific calculators and formulas require decimal degree input.',
        },
      },
      {
        id: 'fs-d0-units-s5',
        type: 'worked_example',
        title: 'Angular Conversion: DMS, Decimal Degrees, and Radians',
        workedExample: {
          problem: 'Convert the angle 52 degrees 18 minutes 45 seconds to (a) decimal degrees and (b) radians.',
          steps: [
            { step: 1, description: 'Convert to decimal degrees using DD = D + M/60 + S/3600.', calculation: 'DD = 52 + 18/60 + 45/3600 = 52 + 0.3000 + 0.0125 = 52.3125 degrees' },
            { step: 2, description: 'Convert decimal degrees to radians by multiplying by pi/180.', calculation: 'Radians = 52.3125 * (pi / 180) = 52.3125 * 0.017453 = 0.91313 radians' },
          ],
          answer: '(a) 52.3125 decimal degrees; (b) 0.91313 radians.',
        },
      },
      {
        id: 'fs-d0-units-s6',
        type: 'knowledge_check',
        title: 'Angular Conversion Check',
        knowledgeCheck: {
          question: 'An angle is measured as 127 degrees 42 minutes 30 seconds. What is this angle in decimal degrees?',
          options: [
            '127.4250 degrees',
            '127.7083 degrees',
            '127.7250 degrees',
            '127.4583 degrees',
          ],
          correctIndex: 1,
          explanation: 'DD = 127 + 42/60 + 30/3600 = 127 + 0.7000 + 0.00833 = 127.7083 degrees. Remember: 42 minutes = 0.7000 degrees (42/60), and 30 seconds = 0.00833 degrees (30/3600).',
        },
      },
      {
        id: 'fs-d0-units-s7',
        type: 'concept',
        title: 'Area Unit Conversions',
        content: 'Surveyors must convert between several area units:\n\n- 1 acre = 43,560 sq ft\n- 1 acre = 10 square chains\n- 1 hectare = 10,000 sq meters = 2.47105 acres\n- 1 sq mile = 640 acres (a "section" in PLSS)\n- 1 sq meter = 10.7639 sq ft\n\nWhen converting area units, remember that linear conversion factors must be squared. For example, since 1 ft = 0.3048 m, then 1 sq ft = 0.3048^2 = 0.09290 sq m.\n\nA common FS exam scenario: you compute a parcel area in square feet and need to report it in acres. Simply divide by 43,560.',
      },
      {
        id: 'fs-d0-units-s8',
        type: 'knowledge_check',
        title: 'Area Conversion Check',
        knowledgeCheck: {
          question: 'A rectangular parcel measures 660 ft by 330 ft. What is the area in acres?',
          options: [
            '2.50 acres',
            '4.00 acres',
            '5.00 acres',
            '7.50 acres',
          ],
          correctIndex: 2,
          explanation: 'Area = 660 * 330 = 217,800 sq ft. Divide by 43,560 sq ft/acre: 217,800 / 43,560 = 5.00 acres. This is a half-quarter-quarter section (660 ft is 10 chains, 330 ft is 5 chains, so 50 square chains = 5 acres).',
        },
      },
      {
        id: 'fs-d0-units-s9',
        type: 'further_reading',
        title: 'Units and Measurement References',
        furtherReading: [
          { book: 'Elementary Surveying: An Introduction to Geomatics (Ghilani & Wolf)', chapter: 'Chapter 1', topic: 'Units of measurement and significant figures' },
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic 1', topic: 'Units, conversions, and measurement standards' },
          { book: 'NIST Special Publication 811', chapter: 'Appendix B', topic: 'Conversion factors for U.S. customary and SI units (free online)' },
        ],
      },
    ],
  },
  {
    id: 'fs-d1-leveling',
    examTrack: 'fs',
    domainNumber: 1,
    domain: 'Field Data Acquisition',
    title: 'Leveling & Distance Measurement',
    description: 'Understand differential leveling procedures, curvature and refraction corrections, electronic distance measurement, and taping corrections used in field surveying.',
    estimatedMinutes: 20,
    sections: [
      {
        id: 'fs-d1-leveling-s1',
        type: 'concept',
        title: 'Differential Leveling Fundamentals',
        content: 'Differential leveling determines elevation differences between points by taking rod readings with a leveling instrument. The process relies on establishing a Height of Instrument (HI), which is the elevation of the line of sight above the datum.\n\nKey terminology:\n- Benchmark (BM): A point with a known or assumed elevation used as a reference.\n- Backsight (BS): A rod reading taken on a point of known elevation. Adding the BS to the known elevation gives the HI.\n- Foresight (FS): A rod reading taken on a point whose elevation is unknown. Subtracting the FS from the HI gives the new point elevation.\n- Turning Point (TP): A temporary, stable point used to transfer the elevation when the instrument must be relocated. A TP receives both a foresight (from the old setup) and a backsight (from the new setup).\n\nThe basic equations are:\n  HI = Known Elevation + BS\n  New Elevation = HI - FS\n\nBy chaining these calculations through a series of turning points, you can carry an elevation across long distances. The arithmetic check at the end is: Starting BM elevation + (sum of all BS) - (sum of all FS) should equal the final elevation.',
      },
      {
        id: 'fs-d1-leveling-s2',
        type: 'formula',
        title: 'Curvature and Refraction Correction',
        formula: {
          expression: 'C+R = 0.0206 * M^2 (U.S. customary) or C+R = 0.0675 * K^2 (metric)',
          variables: [
            { symbol: 'C+R', description: 'Combined curvature and refraction correction (feet or meters)' },
            { symbol: 'M', description: 'Sight distance in miles (U.S. customary version)' },
            { symbol: 'K', description: 'Sight distance in kilometers (metric version)' },
          ],
          whenToUse: 'Apply when sight distances are long enough that the curvature of the Earth and atmospheric refraction affect the rod reading. Generally significant for sights longer than about 300 ft (100 m). The correction is subtracted from the rod reading to obtain the true difference in elevation.',
        },
      },
      {
        id: 'fs-d1-leveling-s3',
        type: 'worked_example',
        title: 'Reducing Differential Leveling Notes',
        workedExample: {
          problem: 'A leveling circuit starts at BM A (elevation 432.56 ft) and ends at BM B. The field notes are:\n\nSetup 1: BS on BM A = 6.32 ft, FS on TP1 = 3.87 ft\nSetup 2: BS on TP1 = 7.14 ft, FS on TP2 = 4.52 ft\nSetup 3: BS on TP2 = 5.98 ft, FS on BM B = 8.21 ft\n\nCompute the elevation of BM B.',
          steps: [
            { step: 1, description: 'Compute HI from Setup 1.', calculation: 'HI = 432.56 + 6.32 = 438.88 ft' },
            { step: 2, description: 'Compute elevation of TP1.', calculation: 'Elev TP1 = 438.88 - 3.87 = 435.01 ft' },
            { step: 3, description: 'Compute HI from Setup 2.', calculation: 'HI = 435.01 + 7.14 = 442.15 ft' },
            { step: 4, description: 'Compute elevation of TP2.', calculation: 'Elev TP2 = 442.15 - 4.52 = 437.63 ft' },
            { step: 5, description: 'Compute HI from Setup 3.', calculation: 'HI = 437.63 + 5.98 = 443.61 ft' },
            { step: 6, description: 'Compute elevation of BM B.', calculation: 'Elev BM B = 443.61 - 8.21 = 435.40 ft' },
            { step: 7, description: 'Arithmetic check: Starting elev + sum BS - sum FS = final elev.', calculation: '432.56 + (6.32 + 7.14 + 5.98) - (3.87 + 4.52 + 8.21) = 432.56 + 19.44 - 16.60 = 435.40 ft (checks)' },
          ],
          answer: 'The elevation of BM B is 435.40 ft.',
        },
      },
      {
        id: 'fs-d1-leveling-s4',
        type: 'knowledge_check',
        title: 'Leveling Concepts Check',
        knowledgeCheck: {
          question: 'In differential leveling, the Height of Instrument (HI) is computed by:',
          options: [
            'Subtracting the backsight from the benchmark elevation',
            'Adding the backsight reading to the known elevation of the occupied point',
            'Subtracting the foresight from the benchmark elevation',
            'Adding the foresight reading to the turning point elevation',
          ],
          correctIndex: 1,
          explanation: 'The Height of Instrument is the elevation of the line of sight, calculated by adding the backsight reading (rod reading on a known point) to that point\'s known elevation: HI = Known Elevation + BS. The foresight is then subtracted from the HI to find the elevation of unknown points.',
        },
      },
      {
        id: 'fs-d1-leveling-s5',
        type: 'concept',
        title: 'Electronic Distance Measurement (EDM)',
        content: 'Electronic Distance Measurement instruments determine distances by transmitting electromagnetic energy (infrared light or laser) to a reflector and measuring the travel time or phase shift of the returned signal.\n\nKey concepts:\n- EDM instruments measure slope distances, which must be reduced to horizontal distances using the vertical angle.\n- Atmospheric corrections account for temperature and pressure effects on the speed of light. Most instruments allow direct entry of temperature and pressure for automatic correction.\n- The ppm (parts per million) correction adjusts the measured distance based on actual atmospheric conditions differing from standard conditions. A correction of +10 ppm means adding 10 mm per kilometer of measured distance.\n- Prism constant: Reflector prisms have a built-in offset that must be accounted for. Modern instruments store common prism constants.\n- EDM accuracy is typically stated as a fixed error plus a proportional error, such as plus or minus (3 mm + 2 ppm). The fixed part dominates short distances, while the ppm part dominates long distances.\n\nFor the FS exam, understand that atmospheric corrections and prism constants are the most common sources of systematic EDM error.',
      },
      {
        id: 'fs-d1-leveling-s6',
        type: 'formula',
        title: 'Taping Corrections',
        formula: {
          expression: 'Temperature: Ct = alpha * (T - Ts) * L; Sag: Cs = -w^2 * L^3 / (24 * P^2); Tension: Cp = (P - Ps) * L / (A * E)',
          variables: [
            { symbol: 'Ct', description: 'Temperature correction' },
            { symbol: 'alpha', description: 'Coefficient of thermal expansion of the tape (typically 6.45e-6 per degree F for steel)' },
            { symbol: 'T', description: 'Field temperature' },
            { symbol: 'Ts', description: 'Standard temperature at which the tape was calibrated (typically 68 degrees F)' },
            { symbol: 'L', description: 'Measured (or nominal) length of tape' },
            { symbol: 'Cs', description: 'Sag correction (always negative, making the true distance shorter)' },
            { symbol: 'w', description: 'Weight of the tape per unit length' },
            { symbol: 'P', description: 'Applied tension during measurement' },
            { symbol: 'Ps', description: 'Standard tension (tension at calibration)' },
            { symbol: 'A', description: 'Cross-sectional area of the tape' },
            { symbol: 'E', description: 'Modulus of elasticity of the tape material' },
            { symbol: 'Cp', description: 'Tension (pull) correction' },
          ],
          whenToUse: 'Apply these corrections when precise taping is required and field conditions differ from the tape calibration standards. Temperature correction is needed when field temperature differs from standard. Sag correction applies when the tape is supported only at its ends. Tension correction applies when pull differs from the calibration tension.',
        },
      },
      {
        id: 'fs-d1-leveling-s7',
        type: 'worked_example',
        title: 'Tape Temperature Correction',
        workedExample: {
          problem: 'A 100-ft steel tape was standardized at 68 degrees F. A distance of 372.55 ft was measured when the field temperature was 95 degrees F. The coefficient of thermal expansion for the tape is 6.45 x 10^-6 per degree F. What is the corrected distance?',
          steps: [
            { step: 1, description: 'Determine the temperature difference.', calculation: 'T - Ts = 95 - 68 = 27 degrees F' },
            { step: 2, description: 'Compute the temperature correction for the total measured distance.', calculation: 'Ct = 6.45e-6 * 27 * 372.55 = 0.0649 ft' },
            { step: 3, description: 'The tape expands in heat, so the true distance is longer than measured. Add the correction.', calculation: 'Corrected distance = 372.55 + 0.06 = 372.61 ft' },
          ],
          answer: 'The corrected distance is 372.61 ft.',
        },
      },
      {
        id: 'fs-d1-leveling-s8',
        type: 'knowledge_check',
        title: 'Distance Measurement Check',
        knowledgeCheck: {
          question: 'An EDM instrument has a stated accuracy of plus or minus (3 mm + 5 ppm). What is the expected error for a measured distance of 2,000 m?',
          options: [
            'Plus or minus 3 mm',
            'Plus or minus 8 mm',
            'Plus or minus 10 mm',
            'Plus or minus 13 mm',
          ],
          correctIndex: 3,
          explanation: 'The fixed component is 3 mm. The proportional component is 5 ppm applied to 2,000 m: 5 * 2,000 / 1,000,000 = 0.010 m = 10 mm. Total error = 3 + 10 = 13 mm. For short distances the fixed error dominates; for long distances the ppm error dominates.',
        },
      },
      {
        id: 'fs-d1-leveling-s9',
        type: 'further_reading',
        title: 'Leveling and Distance Measurement References',
        furtherReading: [
          { book: 'Elementary Surveying: An Introduction to Geomatics (Ghilani & Wolf)', chapter: 'Chapters 4-6', topic: 'Leveling theory, equipment, and distance measurement methods' },
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topics 3-4', topic: 'Leveling procedures and distance measurement corrections' },
        ],
      },
    ],
  },
  {
    id: 'fs-d1-angles',
    examTrack: 'fs',
    domainNumber: 1,
    domain: 'Field Data Acquisition',
    title: 'Angles, Azimuths & Bearings',
    description: 'Learn how surveyors measure and describe directions in the field, including horizontal and vertical angle measurement, azimuth and bearing systems, magnetic declination, and angular closure.',
    estimatedMinutes: 20,
    sections: [
      {
        id: 'fs-d1-angles-s1',
        type: 'concept',
        title: 'Types of Angles in Surveying',
        content: 'Surveyors work with several distinct angle types:\n\nHorizontal angles are measured in the horizontal plane between two lines of sight. They describe the angular relationship between directions to two points as seen from the instrument station. Horizontal angles can be measured as interior angles (inside a polygon), deflection angles (from the prolongation of the back line), or angles to the right (measured clockwise from the backsight).\n\nVertical angles are measured in a vertical plane, above or below the horizontal. An angle of elevation is measured upward from horizontal (positive), while an angle of depression is measured downward (negative).\n\nZenith angles are measured downward from the vertical (directly overhead). A horizontal sight has a zenith angle of 90 degrees, a sight straight up is 0 degrees, and a sight straight down is 180 degrees. Most modern total stations display zenith angles rather than vertical angles. The relationship is: Vertical angle = 90 - Zenith angle.\n\nUnderstanding the distinction between these angle types is critical for correctly reducing field measurements to horizontal distances and elevation differences.',
      },
      {
        id: 'fs-d1-angles-s2',
        type: 'concept',
        title: 'Azimuths and Bearings',
        content: 'Azimuths and bearings are two systems for describing the direction of a line.\n\nAn azimuth is the clockwise angle from north (or sometimes south) to the line, ranging from 0 to 360 degrees. In surveying practice in the United States, azimuths are almost always referenced to north. An azimuth of 0 degrees points due north, 90 degrees points east, 180 degrees points south, and 270 degrees points west.\n\nA bearing uses quadrant notation to describe direction. It starts with either N or S, gives an angle between 0 and 90 degrees, then ends with E or W. For example, N 45 00 E indicates a direction 45 degrees clockwise from north toward east.\n\nThe back azimuth (reverse direction) of any line differs from the forward azimuth by exactly 180 degrees. If the forward azimuth is less than 180, add 180 to get the back azimuth; if it is 180 or greater, subtract 180.\n\nFor bearings, the back bearing swaps both the N/S and E/W designations. The back bearing of N 30 E is S 30 W.',
      },
      {
        id: 'fs-d1-angles-s3',
        type: 'formula',
        title: 'Bearing to Azimuth Conversion',
        formula: {
          expression: 'NE quadrant: Az = bearing angle; SE quadrant: Az = 180 - bearing angle; SW quadrant: Az = 180 + bearing angle; NW quadrant: Az = 360 - bearing angle',
          variables: [
            { symbol: 'Az', description: 'Azimuth measured clockwise from north (0 to 360 degrees)' },
            { symbol: 'bearing angle', description: 'The numeric angle portion of the bearing (always between 0 and 90 degrees)' },
          ],
          whenToUse: 'Use to convert any bearing in quadrant notation to its equivalent azimuth, or reverse the process to convert an azimuth back to a bearing. Identify the quadrant from the azimuth value: 0-90 is NE, 90-180 is SE, 180-270 is SW, 270-360 is NW.',
        },
      },
      {
        id: 'fs-d1-angles-s4',
        type: 'worked_example',
        title: 'Converting Bearings to Azimuths',
        workedExample: {
          problem: 'Convert the following bearings to azimuths: (a) N 42 30 E, (b) S 65 15 E, (c) S 28 45 W, (d) N 73 00 W.',
          steps: [
            { step: 1, description: '(a) N 42 30 E is in the NE quadrant. Azimuth equals the bearing angle.', calculation: 'Az = 42 degrees 30 minutes' },
            { step: 2, description: '(b) S 65 15 E is in the SE quadrant. Azimuth = 180 - bearing angle.', calculation: 'Az = 180 - 65 degrees 15 minutes = 114 degrees 45 minutes' },
            { step: 3, description: '(c) S 28 45 W is in the SW quadrant. Azimuth = 180 + bearing angle.', calculation: 'Az = 180 + 28 degrees 45 minutes = 208 degrees 45 minutes' },
            { step: 4, description: '(d) N 73 00 W is in the NW quadrant. Azimuth = 360 - bearing angle.', calculation: 'Az = 360 - 73 degrees 00 minutes = 287 degrees 00 minutes' },
          ],
          answer: '(a) 42 deg 30 min, (b) 114 deg 45 min, (c) 208 deg 45 min, (d) 287 deg 00 min.',
        },
      },
      {
        id: 'fs-d1-angles-s5',
        type: 'knowledge_check',
        title: 'Bearings and Azimuths Check',
        knowledgeCheck: {
          question: 'A line has an azimuth of 312 degrees 20 minutes. What is the equivalent bearing?',
          options: [
            'N 47 40 W',
            'N 42 20 W',
            'S 47 40 E',
            'N 47 40 E',
          ],
          correctIndex: 0,
          explanation: 'An azimuth of 312 degrees 20 minutes falls in the NW quadrant (270-360). The bearing angle = 360 - 312 degrees 20 minutes = 47 degrees 40 minutes. Since it is in the NW quadrant, the bearing is N 47 40 W.',
        },
      },
      {
        id: 'fs-d1-angles-s6',
        type: 'concept',
        title: 'Magnetic Declination',
        content: 'Magnetic declination is the angular difference between true north (geographic north) and magnetic north (the direction a compass needle points). Declination varies by location and changes over time due to shifts in the Earth\'s magnetic field.\n\nIf magnetic north is east of true north, the declination is called east (positive). If magnetic north is west of true north, the declination is west (negative).\n\nTo convert a magnetic bearing to a true bearing:\n- East declination: add the declination to the magnetic azimuth.\n- West declination: subtract the declination from the magnetic azimuth.\n\nThe general rule is: True Azimuth = Magnetic Azimuth + Declination (using the sign convention where east declination is positive and west declination is negative).\n\nDeclination values for a location can be found on USGS topographic maps (shown with a declination diagram) or calculated using the NOAA National Geophysical Data Center model. Old deed descriptions that reference magnetic bearings must be corrected for the declination at the date of the original survey, not the current declination.',
      },
      {
        id: 'fs-d1-angles-s7',
        type: 'formula',
        title: 'Interior Angle Sum of a Polygon',
        formula: {
          expression: 'Sum of interior angles = (n - 2) * 180',
          variables: [
            { symbol: 'n', description: 'Number of sides (or vertices) of the polygon' },
            { symbol: 'Sum', description: 'Total of all interior angles in degrees' },
          ],
          whenToUse: 'Use to verify angular closure in a closed traverse. After measuring all interior angles, compare their sum to the theoretical value. The difference is the angular misclosure, which must fall within the allowable tolerance for the survey order. For example, a 5-sided traverse should have interior angles summing to (5-2)*180 = 540 degrees.',
        },
      },
      {
        id: 'fs-d1-angles-s8',
        type: 'worked_example',
        title: 'Checking Angular Closure of a Traverse',
        workedExample: {
          problem: 'A four-sided closed traverse has the following measured interior angles: A = 87 degrees 14 minutes, B = 93 degrees 48 minutes, C = 91 degrees 32 minutes, D = 87 degrees 30 minutes. Determine the angular misclosure.',
          steps: [
            { step: 1, description: 'Compute the theoretical sum of interior angles for a 4-sided polygon.', calculation: 'Sum = (4 - 2) * 180 = 360 degrees 00 minutes' },
            { step: 2, description: 'Sum the measured angles.', calculation: '87d 14m + 93d 48m + 91d 32m + 87d 30m = 360 degrees 04 minutes' },
            { step: 3, description: 'Compute the misclosure by subtracting the theoretical sum from the measured sum.', calculation: 'Misclosure = 360d 04m - 360d 00m = +04 minutes' },
            { step: 4, description: 'Distribute the correction equally if within tolerance. Each angle is adjusted by -04/4 = -01 minute.', calculation: 'Adjusted: A = 87d 13m, B = 93d 47m, C = 91d 31m, D = 87d 29m' },
          ],
          answer: 'The angular misclosure is 4 minutes. Each angle is adjusted by subtracting 1 minute, bringing the sum to exactly 360 degrees.',
        },
      },
      {
        id: 'fs-d1-angles-s9',
        type: 'knowledge_check',
        title: 'Angles and Traverse Check',
        knowledgeCheck: {
          question: 'What is the sum of the interior angles of a six-sided closed traverse?',
          options: [
            '540 degrees',
            '720 degrees',
            '900 degrees',
            '1,080 degrees',
          ],
          correctIndex: 1,
          explanation: 'Using the formula (n - 2) * 180, a six-sided polygon yields (6 - 2) * 180 = 4 * 180 = 720 degrees. This is the value against which you compare the sum of all measured interior angles to determine angular misclosure.',
        },
      },
      {
        id: 'fs-d1-angles-s10',
        type: 'further_reading',
        title: 'Angles and Direction References',
        furtherReading: [
          { book: 'Elementary Surveying: An Introduction to Geomatics (Ghilani & Wolf)', chapter: 'Chapters 7-8', topic: 'Angle measurement, azimuths, bearings, and compass surveying' },
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic 5', topic: 'Angles, directions, and traverse computations' },
        ],
      },
    ],
  },
];

export const STUDY_READINGS: ReadingModule[] = [
  ...STUDY_READINGS_BASE,
  ...STUDY_READINGS_D2,
  ...STUDY_READINGS_D3,
  ...STUDY_READINGS_D4D6,
  ...STUDY_READINGS_D5,
  ...STUDY_READINGS_D5_EXPANDED,
  ...STUDY_READINGS_D4_EXPANDED,
  ...STUDY_READINGS_D6_EXPANDED,
  ...STUDY_READINGS_D7_EXPANDED,
  ...STUDY_READINGS_D1D2_EXPANDED,
  ...STUDY_READINGS_STANDARDS,
];
