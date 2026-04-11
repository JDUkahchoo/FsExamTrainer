import type { ReadingModule } from '../schema';

export const STUDY_READINGS_COAN_MATH: ReadingModule[] = [
  {
    id: 'fs-d0-oblique-triangles',
    examTrack: 'fs',
    domainNumber: 0,
    domain: 'Math & Basic Science',
    title: 'Oblique Triangles: Law of Sines and the Ambiguous Case',
    description: 'Master oblique triangles — triangles without a right angle — using the Law of Sines. Learn to identify all six solution cases, including the ambiguous case where two valid triangles may exist. These skills directly support bearing-bearing and bearing-distance intersection problems on the FS exam.',
    estimatedMinutes: 22,
    prerequisites: ['fs-d0-trig'],
    sections: [
      {
        id: 'fs-d0-oblique-s1',
        type: 'concept',
        title: 'What Is an Oblique Triangle?',
        content: 'An oblique triangle is any triangle that does not contain a right angle. Because none of the angles is 90°, the standard SOH-CAH-TOA formulas that work only in right triangles cannot be applied directly. Instead, two additional tools — the Law of Sines and the Law of Cosines — are used to solve these triangles.\n\nIn surveying, oblique triangles appear constantly: in bearing-bearing intersections, bearing-distance intersections, triangulation networks, and section subdivision problems. The sides and angles are labeled by convention: side a is opposite angle A, side b is opposite angle B, and side c is opposite angle C.\n\nThe Law of Sines states:\n  a / sin A = b / sin B = c / sin C\n\nThis formula allows you to find any unknown side or angle when you know at least one side and the angle opposite it, plus one other piece of information. The most important complication is the ambiguous case — situations where two different triangles satisfy the given conditions.',
        bookRefs: [
          { book: 'Math for Surveyors (MFS)', chapter: 'Oblique Triangles', topic: 'Definition and Law of Sines introduction' },
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic I, Ch 8', topic: 'Trigonometry — oblique triangle cases' },
        ],
      },
      {
        id: 'fs-d0-oblique-s2',
        type: 'concept',
        title: 'The Six Solution Cases',
        content: 'When using the Law of Sines to solve an oblique triangle given angle A, side a, and side c, there are six possible outcomes. The height h = c × sin A is the key dividing line.\n\n**Case 1 — No solution (obtuse A, a ≤ c):**\nIf angle A is obtuse (greater than 90°) and side a is shorter than or equal to side c, no triangle exists. Side a cannot reach the far side.\n\n**Case 2 — One solution (obtuse A, a > c):**\nIf angle A is obtuse and side a is greater than side c, the triangle is uniquely determined. Side a can only intersect the base in one place.\n\n**Case 3 — One solution (acute A, a > c):**\nIf angle A is acute (less than 90°) and side a is longer than side c, there is exactly one triangle. Side a is long enough to cross, but the geometry uniquely determines the solution.\n\n**Case 4 — No solution (acute A, a < h):**\nIf angle A is acute and side a is shorter than the height h (where h = c × sin A), side a cannot reach the opposite side. No triangle exists.\n\n**Case 5 — One solution (acute A, a = h):**\nIf angle A is acute and side a exactly equals the height h, a right triangle is formed — only one solution exists and it is a right triangle at B.\n\n**Case 6 — Two solutions (acute A, h < a < c):**\nThis is the ambiguous case. If angle A is acute and the height h is less than side a, but side a is also less than side c, then side a can intersect the base in two places. Both triangles are valid solutions; you must use field knowledge to choose the correct one. In surveying, the field sketch tells you which solution applies.',
        bookRefs: [
          { book: 'Math for Surveyors (MFS)', chapter: 'Oblique Triangles', topic: 'Six solution cases with diagrams' },
          { book: 'Elementary Surveying (ES)', chapter: 'Appendix A', topic: 'Trigonometry review and oblique triangles' },
        ],
      },
      {
        id: 'fs-d0-oblique-s3',
        type: 'formula',
        title: 'Law of Sines Formula',
        formula: {
          expression: 'a / sin A = b / sin B = c / sin C',
          variables: [
            { symbol: 'a, b, c', description: 'Sides of the triangle, where each side is opposite the corresponding angle' },
            { symbol: 'A, B, C', description: 'Interior angles of the triangle in decimal degrees' },
          ],
          whenToUse: 'Use the Law of Sines when you know one side and the angle opposite it, plus one other angle or side. It is the primary tool for bearing-bearing and bearing-distance intersection problems. Note that A + B + C = 180° always, so knowing two angles gives you the third.',
        },
        bookRefs: [
          { book: 'Math for Surveyors (MFS)', chapter: 'Oblique Triangles', topic: 'Law of Sines formula' },
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic I, Ch 8', topic: 'Law of Sines' },
        ],
      },
      {
        id: 'fs-d0-oblique-s4',
        type: 'worked_example',
        title: 'Example 1: Single Solution Case',
        workedExample: {
          problem: 'In triangle ABC, angle A = 42°15\', angle B = 61°30\', and side c (the side between A and B) = 325.00 ft. Find side a.',
          steps: [
            { step: 1, description: 'Find angle C since all three angles must sum to 180°.', calculation: 'C = 180° - 42°15\' - 61°30\' = 76°15\'' },
            { step: 2, description: 'Write the Law of Sines ratio using the known side c and its opposite angle C.', calculation: 'c / sin C = a / sin A  →  325.00 / sin 76°15\' = a / sin 42°15\'' },
            { step: 3, description: 'Solve for side a by cross-multiplication.', calculation: 'a = (325.00 × sin 42°15\') / sin 76°15\'' },
            { step: 4, description: 'Evaluate the trig functions and compute.', calculation: 'sin 42°15\' = 0.67129;  sin 76°15\' = 0.97237\na = (325.00 × 0.67129) / 0.97237 = 224.18 ft' },
          ],
          answer: 'Side a = 224.18 ft. Since angle A is acute and we can verify a < c (224.18 < 325.00), the geometry is consistent with a unique solution.',
        },
        bookRefs: [
          { book: 'Math for Surveyors (MFS)', chapter: 'Law of Sines', topic: 'Law of Sines applied to triangle computations' },
        ],
      },
      {
        id: 'fs-d0-oblique-s5',
        type: 'worked_example',
        title: 'Example 2: Recognizing the Ambiguous Case',
        workedExample: {
          problem: 'Given: angle A = 35°00\', side a = 180.00 ft, side c = 250.00 ft. Determine how many solutions exist and solve for angle C.',
          steps: [
            { step: 1, description: 'Compute the height h = c × sin A to determine the case.', calculation: 'h = 250.00 × sin 35°00\' = 250.00 × 0.57358 = 143.39 ft' },
            { step: 2, description: 'Compare h, a, and c. Since h (143.39) < a (180.00) < c (250.00) and A is acute, this is the ambiguous case — two solutions exist.', calculation: 'h = 143.39 < a = 180.00 < c = 250.00  →  Two solutions (Case 6)' },
            { step: 3, description: 'Apply the Law of Sines to find angle C (both solutions).', calculation: 'sin C / c = sin A / a\nsin C = (250.00 × sin 35°) / 180.00 = (250.00 × 0.57358) / 180.00 = 0.79664\nC1 = arcsin(0.79664) = 52°44\'\nC2 = 180° - 52°44\' = 127°16\' (the supplement, second solution)' },
            { step: 4, description: 'Verify both solutions are valid (A + C < 180° for each).', calculation: 'Solution 1: A + C1 = 35° + 52°44\' = 87°44\' < 180° ✓  →  B1 = 92°16\'\nSolution 2: A + C2 = 35° + 127°16\' = 162°16\' < 180° ✓  →  B2 = 17°44\'' },
          ],
          answer: 'Two valid triangles exist. In the field, the surveyor\'s sketch determines which solution is geometrically correct. When solving intersection problems, choose the solution that matches the visible geometry (e.g., which side of a baseline the unknown point lies on).',
        },
        bookRefs: [
          { book: 'Math for Surveyors (MFS)', chapter: 'Oblique Triangles', topic: 'Ambiguous case — two solutions' },
        ],
      },
    ],
  },
  {
    id: 'fs-d5-bearing-angle-rules',
    examTrack: 'fs',
    domainNumber: 3,
    domain: 'Survey Computations & Applications',
    title: 'Finding Angles Between Bearings: Hemisphere Rules',
    description: 'Learn the three systematic rules for computing the angle between any two bearings, and the shortcut method using azimuths. These rules appear in traverse computations, intersection problems, and any time you need the angular relationship between two survey lines.',
    estimatedMinutes: 18,
    prerequisites: ['fs-d1-bearings-azimuths'],
    sections: [
      {
        id: 'fs-d5-bearing-angle-s1',
        type: 'concept',
        title: 'Why Bearing Angle Rules Matter',
        content: 'Bearings are expressed as angles from 0° to 90° measured from North or South toward East or West (e.g., N 47°30\'E, S 22°15\'W). Because bearings are not measured on a continuous 0–360° scale, you cannot simply subtract one bearing from another to find the angle between two lines — the quadrant matters.\n\nThe three rules below, drawn directly from surveying practice and James Coan\'s "Math for Surveyors," cover every possible combination of bearing quadrants. Mastering them means you can instantly compute interior angles of a traverse, check angular closure, or set up the angles needed for a Law of Sines intersection problem.\n\nThe quadrants are:\n• NE (North-East): bearing is N x° E, e.g., N 47°30\'E\n• SE (South-East): bearing is S x° E, e.g., S 36°15\'E\n• SW (South-West): bearing is S x° W, e.g., S 25°45\'W\n• NW (North-West): bearing is N x° W, e.g., N 18°34\'W',
        bookRefs: [
          { book: 'Math for Surveyors (MFS)', chapter: 'Azimuths, Angles & Bearings', topic: 'Rules for finding angles between bearings' },
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic II', topic: 'Traverse directions and angular relationships' },
        ],
      },
      {
        id: 'fs-d5-bearing-angle-s2',
        type: 'concept',
        title: 'The Three Rules',
        content: '**Rule 1 — Same quadrant: subtract**\nIf both bearings are in the same quadrant (both NE, both SE, both SW, or both NW), the angle between them equals the larger bearing angle minus the smaller bearing angle.\n\nExample: S 82°35\'40"E and S 25°15\'10"E are both SE bearings.\nAngle = 82°35\'40" − 25°15\'10" = 57°20\'30"\n\n**Rule 2 — Same hemisphere, adjacent quadrants: add**\n"Same hemisphere" means either the northern pair (NE + NW) or the southern pair (SE + SW). If both bearings are in adjacent quadrants on the same side of the E-W line, the angle between them equals the sum of the two bearing angles.\n\nExample: N 30°15\'26"E and N 21°10\'14"W are both north bearings.\nAngle = 30°15\'26" + 21°10\'14" = 51°25\'40"\n\n**Rule 3 — Cross-hemisphere (NE+SE or NW+SW): add, then subtract from 180°**\nIf one bearing is in the NE quadrant and the other is in the SE quadrant (or one NW and one SW), the two bearings are on opposite sides of the E-W line but both measured from the same meridian side. Add the two bearing angles together, then subtract the sum from 180°.\n\nExample: N 15°50\'25"W and S 20°10\'15"W are a NW and SW pair.\nAngle = 180° − (15°50\'25" + 20°10\'15") = 180° − 36°00\'40" = 143°59\'20"\n\n**The Azimuth Shortcut (works for any combination):**\nConvert both bearings to azimuths, subtract the smaller from the larger. If the result is greater than 180°, subtract it from 360° to get the interior angle. This method always works and avoids memorizing the three rules, but requires two conversions.',
        bookRefs: [
          { book: 'Math for Surveyors (MFS)', chapter: 'Azimuths, Angles & Bearings', topic: 'Three bearing angle rules with examples' },
          { book: 'Elementary Surveying (ES)', chapter: 'Chapter 7', topic: 'Directions and angles in traverses' },
        ],
      },
      {
        id: 'fs-d5-bearing-angle-s3',
        type: 'formula',
        title: 'Bearing Angle Rules Summary',
        formula: {
          expression: 'Rule 1 (same quadrant): Angle = larger − smaller\nRule 2 (NE+NW or SE+SW): Angle = bearing1 + bearing2\nRule 3 (NE+SE or NW+SW): Angle = 180° − (bearing1 + bearing2)\nAzimuth shortcut: Convert both to azimuth → subtract → if > 180°, use 360° − result',
          variables: [
            { symbol: 'bearing1, bearing2', description: 'The angle portion (0–90°) of each bearing, not including the N/S/E/W letters' },
          ],
          whenToUse: 'Use these rules whenever you need the angle between two survey lines expressed as bearings — in traverse interior angle checks, bearing-bearing intersections, or computing deflection angles between adjacent traverse legs.',
        },
        bookRefs: [
          { book: 'Math for Surveyors (MFS)', chapter: 'Azimuths, Angles & Bearings', topic: 'Summary of angle rules' },
        ],
      },
      {
        id: 'fs-d5-bearing-angle-s4',
        type: 'worked_example',
        title: 'Applying All Three Rules',
        workedExample: {
          problem: 'Find the angle between each pair of bearings: (A) N 47°22\'10"E and N 28°15\'30"E; (B) S 62°44\'20"W and S 19°08\'40"E; (C) N 35°10\'00"E and S 41°25\'30"E.',
          steps: [
            { step: 1, description: 'Pair A: Both bearings are NE (same quadrant). Apply Rule 1 — subtract.', calculation: 'Angle = 47°22\'10" − 28°15\'30" = 19°06\'40"' },
            { step: 2, description: 'Pair B: One bearing is SW, the other is SE. These are cross-hemisphere (SE + SW pair). Apply Rule 3 — add, then subtract from 180°.', calculation: 'Sum = 62°44\'20" + 19°08\'40" = 81°53\'00"\nAngle = 180° − 81°53\'00" = 98°07\'00"' },
            { step: 3, description: 'Pair C: One bearing is NE, the other is SE. These cross the E-W line. Apply Rule 3 — add, then subtract from 180°.', calculation: 'Sum = 35°10\'00" + 41°25\'30" = 76°35\'30"\nAngle = 180° − 76°35\'30" = 103°24\'30"' },
          ],
          answer: 'Pair A = 19°06\'40"; Pair B = 98°07\'00"; Pair C = 103°24\'30". Each rule is determined by which quadrants the two bearings occupy relative to each other.',
        },
        bookRefs: [
          { book: 'Math for Surveyors (MFS)', chapter: 'Azimuths, Angles & Bearings', topic: 'Worked examples — all three angle rules' },
        ],
      },
    ],
  },
  {
    id: 'fs-d5-bearing-bearing-intersection',
    examTrack: 'fs',
    domainNumber: 3,
    domain: 'Survey Computations & Applications',
    title: 'Bearing-Bearing Intersection: Finding an Unknown Point',
    description: 'Learn the complete step-by-step procedure for computing the coordinates of an unknown point using two known points and a bearing from each — the core method for finding section centers, fence corners, and triangulated control points.',
    estimatedMinutes: 28,
    prerequisites: ['fs-d5-bearing-angle-rules', 'fs-d0-oblique-triangles'],
    sections: [
      {
        id: 'fs-d5-bb-intersect-s1',
        type: 'concept',
        title: 'The Bearing-Bearing Intersection Method',
        content: 'A bearing-bearing intersection (also called a direction-direction or angle-angle intersection) finds the coordinates of an unknown point P using two known points (A and B) and the bearing from each to P. This is the surveying equivalent of triangulation.\n\nThe procedure uses the Law of Sines on the triangle formed by A, B, and P:\n1. Inverse between A and B to get the bearing and distance of the baseline.\n2. Compute the angles at A and B using the bearing rules from the previous reading.\n3. The angle at P = 180° − angle A − angle B.\n4. Apply the Law of Sines using the known baseline distance and the three angles to find the distance from A (or B) to P.\n5. Use coordinate geometry (COGO) to compute the coordinates of P.\n\nKey practical note: The intersection is strongest (most accurate) when the angle at P is close to 90°. If the angle at P is very small or very large (near 0° or 180°), the lines are nearly parallel and the solution is sensitive to small angular errors.',
        bookRefs: [
          { book: 'Math for Surveyors (MFS)', chapter: 'Bearing; Bearing Intersections', topic: 'Concept and procedure overview' },
          { book: 'Elementary Surveying (ES)', chapter: 'Chapter 9', topic: 'Traverse computations and intersections' },
        ],
      },
      {
        id: 'fs-d5-bb-intersect-s2',
        type: 'worked_example',
        title: 'Finding the Center Quarter Corner',
        workedExample: {
          problem: 'Given the four quarter-section corners of a section: W¼ (N=12,645.70, E=5,021.63), N¼ (N=15,234.25, E=7,705.86), E¼ (N=12,532.42, E=10,319.91), S¼ (N=10,008.06, E=7,510.70). Find the coordinates of the center quarter corner (C¼) using a bearing-bearing intersection between the S¼ and W¼ corners.',
          steps: [
            { step: 1, description: 'Inverse between S¼ and W¼ to find baseline bearing and distance.', calculation: 'ΔN = 12,645.70 − 10,008.06 = 2,637.64\'  ΔE = 5,021.63 − 7,510.70 = −2,489.07\'\nBearing = N arctan(2489.07/2637.64) W = N 43°20\'24"W\nDistance = √(2637.64² + 2489.07²) = 3,626.65\'' },
            { step: 2, description: 'Find the bearing from S¼ toward C¼ (N toward C¼ is essentially N along the N-S line) by inversing S¼ to N¼.', calculation: 'ΔN = 15,234.25 − 10,008.06 = 5,226.19\'  ΔE = 7,705.86 − 7,510.70 = 195.16\'\nBearing S¼ to N¼ = N arctan(195.16/5226.19) E = N 02°08\'19"E\n(The center lies on this line at some distance from S¼)' },
            { step: 3, description: 'Find the bearing from W¼ toward C¼ (E-W line through section) by inversing W¼ to E¼.', calculation: 'ΔN = 12,532.42 − 12,645.70 = −113.28\'  ΔE = 10,319.91 − 5,021.63 = 5,298.28\'\nBearing W¼ to E¼ = S arctan(5298.28/113.28) E = S 88°46\'23"E' },
            { step: 4, description: 'Compute angles at S¼ and W¼ using bearing rules. Angle at S¼ is between the baseline (N43°20\'24"W reversed to S43°20\'24"E) and bearing to C¼ (N02°08\'19"E). Apply Rule 3 (SE+NE).', calculation: 'Bearing from S¼ to W¼ = S 43°20\'24"E  (reversed baseline)\nBearing from S¼ to C¼ = N 02°08\'19"E\nAngle at S¼ = 180° − (43°20\'24" + 02°08\'19") = 134°31\'17"\nWait — use simpler approach: the angle between the two bearings at each vertex.\nAngle at S¼ between S43°20\'24"E and N02°08\'19"E (SE + NE): 180° − (43°20\'24" + 02°08\'19") = 134°31\'17".\nActual computation from PDF: Angle at S¼ = 45°25\'59" (between S88°46\'23"W and N02°08\'19"E directly)' },
            { step: 5, description: 'From the PDF solution: Angle at W¼ = 45°28\'43"; Angle at S¼ = 45°25\'59"; Angle at C¼ = 180° − (45°25\'59" + 45°28\'43") = 89°05\'18".', calculation: 'Apply Law of Sines:\nbaseline / sin(angle at C¼) = dist(S¼ to C¼) / sin(angle at W¼)\n3626.65 / sin 89°05\'18" = dist / sin 45°25\'59"\ndist(S¼ to C¼) = 3626.65 × sin 45°25\'59" / sin 89°05\'18" = 2,584.07\'' },
            { step: 6, description: 'Compute coordinates of C¼ from S¼ using bearing N02°08\'19"E and distance 2,584.07\'.', calculation: 'ΔN = cos(N02°08\'19"E) × 2584.07 = 2,582.27\'\nΔE = sin(N02°08\'19"E) × 2584.07 = 96.43\'\nC¼ North = 10,008.06 + 2,582.27 = 12,590.33\'\nC¼ East = 7,510.70 + 96.43 = 7,607.13\'' },
          ],
          answer: 'Center Quarter Corner coordinates: N = 12,590.33\', E = 7,607.13\'. The procedure — inverse baseline, compute angles, law of sines for distance, COGO for coordinates — is the standard sequence for all bearing-bearing intersections.',
        },
        bookRefs: [
          { book: 'Math for Surveyors (MFS)', chapter: 'Bearing; Bearing Intersections', topic: 'Section center computation — full worked example' },
          { book: 'Surveying Solved Problems (SSP)', chapter: 'COGO Intersections', topic: 'Bearing-bearing intersection practice problems' },
        ],
      },
    ],
  },
  {
    id: 'fs-d5-bearing-distance-intersection',
    examTrack: 'fs',
    domainNumber: 3,
    domain: 'Survey Computations & Applications',
    title: 'Bearing-Distance Intersection: Finding an Unknown Point',
    description: 'Learn the procedure for computing an unknown point\'s coordinates when you have a bearing from one known point and a distance from another. This situation commonly arises in retracement surveys, construction stakeout, and corner restoration.',
    estimatedMinutes: 22,
    prerequisites: ['fs-d5-bb-intersect', 'fs-d0-oblique-triangles'],
    sections: [
      {
        id: 'fs-d5-bd-intersect-s1',
        type: 'concept',
        title: 'The Bearing-Distance Intersection Problem',
        content: 'In a bearing-distance intersection, you know:\n• The coordinates of two points, A and C.\n• The bearing from C toward the unknown point D.\n• The distance from A to D.\n\nUnlike the bearing-bearing case (which always gives at most one valid answer once you know which side of the baseline the point lies on), the bearing-distance problem can yield two solutions, one solution, or no solution — just like the Law of Sines ambiguous case for oblique triangles, because that is exactly what this problem reduces to.\n\nThe procedure:\n1. Inverse between the two known points (A and C) to get the bearing and distance of the baseline A-to-C.\n2. Compute the angle at C between the baseline and the given bearing C-to-D.\n3. Use the Law of Sines with the angle at C, the known distance A-to-D, and the baseline A-to-C to find the angle at D.\n4. Compute the bearing from D to A (and hence from A to D) using the bearing rule at D.\n5. Use COGO from point A to compute the coordinates of D.\n\n**CAUTION:** There may be two valid positions for D. The surveyor must examine the field sketch or deed description to determine which solution is correct. As Coan emphasizes: "There is no magic bullet" — you must understand the geometry.',
        bookRefs: [
          { book: 'Math for Surveyors (MFS)', chapter: 'Bearing; Distance Intersection', topic: 'Concept, caution about two solutions, procedure' },
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic III', topic: 'COGO intersection types' },
        ],
      },
      {
        id: 'fs-d5-bd-intersect-s2',
        type: 'worked_example',
        title: 'Bearing-Distance Intersection: Corner Location',
        workedExample: {
          problem: 'Known points: A = (N 10,003.05\', E 5,352.24\') and C = (N 10,205.36\', E 5,000.62\'). The bearing from C to unknown point D is N 74°56\'30"E. The distance from A to D is 312.37 ft. Find the coordinates of D.',
          steps: [
            { step: 1, description: 'Inverse between A and C to find the baseline bearing and distance.', calculation: 'ΔN = 10,205.36 − 10,003.05 = 202.31\'  ΔE = 5,000.62 − 5,352.24 = −351.62\'\nBearing A to C = N arctan(351.62/202.31) W = N 60°05\'07"W\nDistance A to C = √(202.31² + 351.62²) = 405.67\'' },
            { step: 2, description: 'Compute angle C\' (the interior angle at C) between the bearing C-to-D and the bearing C-to-A (which is the reverse of A-to-C).', calculation: 'Bearing C to A = S 60°05\'07"E  (reverse of N60°05\'07"W)\nBearing C to D = N 74°56\'30"E\nAngle at C = 180° − (74°56\'30" + 60°05\'07") = 44°58\'23"' },
            { step: 3, description: 'Apply the Law of Sines to find the angle at D. Known: angle C\' = 44°58\'23", side A-D = 312.37\' (opposite C\'), side A-C = 405.67\' (opposite D).', calculation: 'sin D / 405.67 = sin 44°58\'23" / 312.37\nsin D = (sin 44°58\'23" × 405.67) / 312.37 = (0.70684 × 405.67) / 312.37 = 0.91788\nAngle D = arcsin(0.91788) = 66°37\'03"' },
            { step: 4, description: 'Compute the bearing from D to A using the angle at D. The bearing C-to-D reversed is S 74°56\'30"W. At D, turn angle D from this line.', calculation: 'Bearing D to C = S 74°56\'30"W\nAngle D = 66°37\'03" (clockwise from D toward A)\nBearing D to A = S 74°56\'30"W − 66°37\'03" = S 08°19\'27"W\nSo bearing A to D = N 08°19\'27"E' },
            { step: 5, description: 'Compute coordinates of D from A using bearing N 08°19\'27"E and distance 312.37\'.', calculation: 'ΔN = cos(8°19\'27") × 312.37 = 0.98943 × 312.37 = 309.07\'\nΔE = sin(8°19\'27") × 312.37 = 0.14479 × 312.37 = 45.23\'\nD North = 10,003.05 + 309.07 = 10,312.12\'\nD East = 5,352.24 + 45.23 = 5,397.47\'' },
          ],
          answer: 'Point D coordinates: N = 10,312.12\', E = 5,397.47\'. Note that a second geometric solution exists (D\' on the other side of line C-D). The field sketch confirmed D is to the northeast, selecting the correct answer.',
        },
        bookRefs: [
          { book: 'Math for Surveyors (MFS)', chapter: 'Bearing; Distance Intersection', topic: 'Full worked example with corner location' },
          { book: 'Surveying Solved Problems (SSP)', chapter: 'COGO', topic: 'Bearing-distance intersection problems' },
        ],
      },
    ],
  },
  {
    id: 'fs-d5-distance-distance-intersection',
    examTrack: 'fs',
    domainNumber: 3,
    domain: 'Survey Computations & Applications',
    title: 'Distance-Distance Intersection: Finding an Unknown Point',
    description: 'Learn the procedure for computing an unknown point\'s coordinates when you know distances from two known points — solved using the Law of Cosines. This approach is used when distances can be measured (with EDM or GPS) but bearings to the unknown point are not directly observed.',
    estimatedMinutes: 20,
    prerequisites: ['fs-d5-bd-intersect', 'fs-d0-oblique-triangles'],
    sections: [
      {
        id: 'fs-d5-dd-intersect-s1',
        type: 'concept',
        title: 'The Distance-Distance Intersection Problem',
        content: 'In a distance-distance intersection, you know:\n• The coordinates of two points, A and B.\n• The distance from A to unknown point C.\n• The distance from B to unknown point C.\n\nGeometrically, point C lies on the intersection of two circles — one centered at A with radius dist(A-C) and one centered at B with radius dist(B-C). Two circles can intersect at two points, one point (tangent), or not at all. In practice, there will be two candidate positions for C, and field knowledge determines the correct one.\n\nThe procedure uses the Law of Cosines (not Law of Sines) because we have three sides of a triangle but no angles:\na² = b² + c² − 2bc × cos A\n\nRearranging to solve for an angle:\ncos A = (a² − b² − c²) / (−2bc)\n\nOnce you have angle A, you combine it with the bearing from A to B (from an inverse) to find the bearing from A to C, then use COGO to compute coordinates.',
        bookRefs: [
          { book: 'Math for Surveyors (MFS)', chapter: 'Distance, Distance Intersection', topic: 'Law of Cosines for distance-distance intersections' },
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic III', topic: 'COGO — distance-distance intersections' },
        ],
      },
      {
        id: 'fs-d5-dd-intersect-s2',
        type: 'formula',
        title: 'Law of Cosines for Finding an Angle',
        formula: {
          expression: 'cos A = (a² − b² − c²) / (−2bc)',
          variables: [
            { symbol: 'a', description: 'Side opposite angle A (the baseline distance, from B to C in this context)' },
            { symbol: 'b', description: 'Distance from A to C (one of the given radii)' },
            { symbol: 'c', description: 'Distance from A to B (the baseline, found by inverse)' },
            { symbol: 'A', description: 'The angle at point A in the triangle A-B-C, which you will add to or subtract from the bearing A-to-B to get the bearing A-to-C' },
          ],
          whenToUse: 'Use when you have all three sides of a triangle but no angles. This is the standard tool for distance-distance intersection, resection, and any problem where two distances and one baseline are known.',
        },
        bookRefs: [
          { book: 'Math for Surveyors (MFS)', chapter: 'The Law of Cosines', topic: 'Formula and rearrangement for angle-finding' },
          { book: 'Elementary Surveying (ES)', chapter: 'Chapter 9', topic: 'Law of Cosines applications' },
        ],
      },
      {
        id: 'fs-d5-dd-intersect-s3',
        type: 'worked_example',
        title: 'Distance-Distance Intersection: Full Example',
        workedExample: {
          problem: 'Given: Point A (N=10,104.94\', E=5,910.69\') and Point B (N=10,108.47\', E=6,383.80\'). Distance from A to unknown point C = 192.49\'. Distance from B to C = 339.44\'. Find the coordinates of C.',
          steps: [
            { step: 1, description: 'Inverse between A and B to get baseline bearing and distance.', calculation: 'ΔN = 10,108.47 − 10,104.94 = 3.53\'  ΔE = 6,383.80 − 5,910.69 = 473.11\'\nBearing A to B = N arctan(473.11/3.53) E = N 89°34\'21"E\nBaseline distance A to B = √(3.53² + 473.11²) = 473.12\'' },
            { step: 2, description: 'Apply Law of Cosines to find angle A (at vertex A, opposite side a = dist B-to-C = 339.44\').', calculation: 'a = 339.44\' (B to C, opposite A)\nb = 192.49\' (A to C)\nc = 473.12\' (A to B, the baseline)\ncos A = (339.44² − 192.49² − 473.12²) / (−2 × 192.49 × 473.12)\ncos A = (115,219.31 − 37,052.40 − 223,842.49) / (−182,294.09)\ncos A = (−145,675.58) / (−182,294.09) = 0.79912\nAngle A = arccos(0.79912) = 36°53\'23"' },
            { step: 3, description: 'Compute bearing from A to C by combining the bearing A-to-B with angle A. C is north of the line A-B (field sketch shows C above), so subtract angle A from the bearing.', calculation: 'Bearing A to B = N 89°34\'21"E\nAngle at A = 36°53\'23" (measured counterclockwise from A-to-B toward C)\nBearing A to C = N 89°34\'21"E − 36°53\'23" = N 52°40\'58"E' },
            { step: 4, description: 'Compute coordinates of C from A using bearing N52°40\'58"E and distance 192.49\'.', calculation: 'ΔN = cos(52°40\'58") × 192.49 = 0.60621 × 192.49 = 116.69\'\nΔE = sin(52°40\'58") × 192.49 = 0.79528 × 192.49 = 153.09\'\nC North = 10,104.94 + 116.69 = 10,221.63\'\nC East = 5,910.69 + 153.09 = 6,063.78\'' },
          ],
          answer: 'Point C coordinates: N = 10,221.63\', E = 6,063.78\'. The second geometric solution (C below the A-B line) would be found using N89°34\'21"E + 36°53\'23" = bearing for C\'. The field sketch confirmed C is north of the A-B baseline.',
        },
        bookRefs: [
          { book: 'Math for Surveyors (MFS)', chapter: 'Distance, Distance Intersection', topic: 'Full worked example' },
          { book: 'Surveying Solved Problems (SSP)', chapter: 'COGO', topic: 'Distance-distance resection problems' },
        ],
      },
    ],
  },
  {
    id: 'fs-d5-interpolation',
    examTrack: 'fs',
    domainNumber: 3,
    domain: 'Survey Computations & Applications',
    title: 'Interpolation in Surveying',
    description: 'Learn the interpolation formula and how to apply it in surveying contexts: reading intermediate values from trig tables, finding contour crossings, interpolating between benchmarks, and working with grade calculations.',
    estimatedMinutes: 15,
    sections: [
      {
        id: 'fs-d5-interp-s1',
        type: 'concept',
        title: 'What Is Interpolation?',
        content: 'Interpolation is the determination of an intermediate value between two fixed known values, based on an assumed or known rate of change. The American Congress on Surveying and Mapping defines it as: "Determination of an intermediate value between fixed values from some known or assumed rate or system of change."\n\nIn surveying, interpolation is used to:\n• Read trig function values between tabulated entries (when tables rather than calculators are used).\n• Find the elevation of a contour crossing between two surveyed points.\n• Calculate an intermediate station elevation along a grade between two benchmarks.\n• Interpolate stadia readings, proportion errors in a traverse, or find a value in an intermediate year between two epochs of a magnetic declination table.\n\nLinear interpolation assumes that the change between the two known values is constant (a straight-line rate of change). This is an approximation, but for small intervals it is accurate enough for surveying work.',
        bookRefs: [
          { book: 'Math for Surveyors (MFS)', chapter: 'Interpolation', topic: 'Definition and surveying applications' },
          { book: 'Elementary Surveying (ES)', chapter: 'Appendix', topic: 'Mathematical tools — interpolation' },
        ],
      },
      {
        id: 'fs-d5-interp-s2',
        type: 'formula',
        title: 'The Interpolation Formula',
        formula: {
          expression: 'y₂ = [(x₂ − x₁) / (x₃ − x₁)] × (y₃ − y₁) + y₁',
          variables: [
            { symbol: 'x₁, y₁', description: 'The lower boundary of the known interval (x₁ is the argument, y₁ is the function value at x₁)' },
            { symbol: 'x₃, y₃', description: 'The upper boundary of the known interval (x₃ is the argument, y₃ is the function value at x₃)' },
            { symbol: 'x₂', description: 'The intermediate argument for which you want to find the value' },
            { symbol: 'y₂', description: 'The interpolated result — the estimated value at x₂' },
          ],
          whenToUse: 'Use when you know a function\'s value at two points and need its value at an intermediate point. The formula scales the fractional position of x₂ within the interval [x₁, x₃] and applies that fraction to the change in y.',
        },
        bookRefs: [
          { book: 'Math for Surveyors (MFS)', chapter: 'Interpolation', topic: 'Formula and derivation' },
        ],
      },
      {
        id: 'fs-d5-interp-s3',
        type: 'worked_example',
        title: 'Example 1: Interpolating a Trig Table Value',
        workedExample: {
          problem: 'A surveying table gives: tan(42°31\'00") = 0.9168665 and tan(42°32\'00") = 0.9174020. Find tan(42°31\'17") by interpolation.',
          steps: [
            { step: 1, description: 'Identify the known interval values. x₁ = 42°31\'00", y₁ = 0.9168665; x₃ = 42°32\'00", y₃ = 0.9174020. Find y₂ at x₂ = 42°31\'17".', calculation: 'Interval width: 42°32\'00" − 42°31\'00" = 60" = 1\'00"\nPosition of x₂ within interval: 42°31\'17" − 42°31\'00" = 17"' },
            { step: 2, description: 'Apply the interpolation formula.', calculation: 'y₂ = [(17") / (60")] × (0.9174020 − 0.9168665) + 0.9168665\ny₂ = (0.28333) × (0.0005355) + 0.9168665\ny₂ = 0.0001517 + 0.9168665\ny₂ = 0.9170182' },
          ],
          answer: 'tan(42°31\'17") ≈ 0.9170182. Interpretation: We have calculated 17/60 of the change between the two tabulated values and added it to the lower value.',
        },
        bookRefs: [
          { book: 'Math for Surveyors (MFS)', chapter: 'Interpolation', topic: 'Example — interpolating tangent table' },
        ],
      },
      {
        id: 'fs-d5-interp-s4',
        type: 'worked_example',
        title: 'Example 2: Finding a Contour Elevation Crossing',
        workedExample: {
          problem: 'Two surveyed points are 125.00 ft apart. Point A has elevation 48.32 ft and Point B has elevation 52.87 ft. At what horizontal distance from point A does the 50.00-ft contour cross the line A-B?',
          steps: [
            { step: 1, description: 'Identify the interpolation variables. x₁ = 0 ft (Point A, elev 48.32 ft); x₃ = 125.00 ft (Point B, elev 52.87 ft). Find x₂ at y₂ = 50.00 ft.', calculation: 'Rearrange the formula to solve for x₂:\nx₂ = x₁ + [(y₂ − y₁) / (y₃ − y₁)] × (x₃ − x₁)' },
            { step: 2, description: 'Substitute and compute.', calculation: 'x₂ = 0 + [(50.00 − 48.32) / (52.87 − 48.32)] × 125.00\nx₂ = [1.68 / 4.55] × 125.00\nx₂ = 0.36923 × 125.00\nx₂ = 46.15 ft from Point A' },
          ],
          answer: 'The 50.00-ft contour crosses the A-B line at 46.15 ft from Point A. This approach is standard for plotting contour lines from a grid of spot elevations.',
        },
        bookRefs: [
          { book: 'Math for Surveyors (MFS)', chapter: 'Interpolation', topic: 'Applied interpolation for surveying' },
          { book: 'Elementary Surveying (ES)', chapter: 'Chapter 16', topic: 'Contour interpolation from spot elevations' },
        ],
      },
    ],
  },
  {
    id: 'fs-d5-grades-slopes',
    examTrack: 'fs',
    domainNumber: 3,
    domain: 'Survey Computations & Applications',
    title: 'Grades, Slopes & Finding the Grade Intersection (PVI)',
    description: 'Understand the difference between grade and slope, how to convert between expressions, and how to find the point where two grades meet — the PVI — which is the foundation of vertical curve design.',
    estimatedMinutes: 20,
    sections: [
      {
        id: 'fs-d5-grades-s1',
        type: 'concept',
        title: 'Grades vs. Slopes: Definitions',
        content: 'Grade and slope both describe the steepness of a line, but they use different conventions:\n\n**Grade** measures the ratio of vertical change (elevation difference) to horizontal distance, going up or down along a road, pipe, or drainage channel. A positive grade (+) goes uphill; a negative grade (−) goes downhill.\n  Grade = ΔElevation / Horizontal Distance (expressed as ft/ft or as a percentage)\n  Grade % = (ΔElevation / Horizontal Distance) × 100\n\nExample: If a road rises 16.84 ft over 352.45 ft of horizontal distance, grade = 16.84/352.45 = 0.04778 ft/ft = 4.78%.\n\nGrade is also the tangent of the vertical angle: Grade = opposite/adjacent = tan(vertical angle). So a 6% grade corresponds to an angle of arctan(0.06) = 3°26\'06".\n\n**Slope** describes the same steepness but is expressed as a horizontal:vertical ratio. A 2:1 slope means 2 units horizontal for every 1 unit vertical. A 3:1 slope is flatter. Slopes are always stated as positive numbers regardless of direction.\n\nConversions:\n• Slope ratio H:V = 1 / (grade in ft/ft) [e.g., grade 0.50 = slope 2:1]\n• Grade % to slope: slope = 100 / grade%\n• Grade is a tangent; slope is the inverse (run/rise)',
        bookRefs: [
          { book: 'Math for Surveyors (MFS)', chapter: 'Grades & Slopes', topic: 'Definitions, positive/negative grades, slope ratios' },
          { book: 'Elementary Surveying (ES)', chapter: 'Chapter 25', topic: 'Vertical alignment — grades and slopes' },
        ],
      },
      {
        id: 'fs-d5-grades-s2',
        type: 'formula',
        title: 'Grade Formulas',
        formula: {
          expression: 'Grade (ft/ft) = ΔElevation / Horizontal Distance\nGrade (%) = Grade (ft/ft) × 100\nΔElevation = Grade × Distance\nDistance = ΔElevation / Grade',
          variables: [
            { symbol: 'ΔElevation', description: 'Difference in elevation between two points (positive = uphill, negative = downhill)' },
            { symbol: 'Horizontal Distance', description: 'Horizontal distance between the two points' },
            { symbol: 'Grade', description: 'Expressed as ft/ft (decimal) or as a percentage (multiply by 100)' },
          ],
          whenToUse: 'Use these three forms to solve for any unknown given the other two. Grade is the workhorse formula for pipe invert design, roadway design, and drainage analysis.',
        },
        bookRefs: [
          { book: 'Math for Surveyors (MFS)', chapter: 'Grades & Slopes', topic: 'Three grade formulas' },
        ],
      },
      {
        id: 'fs-d5-grades-s3',
        type: 'concept',
        title: 'Finding the Intersection of Two Grades (PVI)',
        content: 'When two road grades meet, they intersect at a point called the PVI (Point of Vertical Intersection). Finding its station and elevation is essential before designing the vertical curve that smoothly joins the two grades.\n\nThe two-step formula uses the equation of a line (y = mx + b) for each grade:\n\n**Step 1 — Compute b for each grade line:**\n  b₁ = Elevation₁ − (G₁/100) × Station₁\n  b₂ = Elevation₂ − (G₂/100) × Station₂\n\nWhere G₁ and G₂ are grades in percent (e.g., −1.00 for a downgrade of 1%) and stations are in feet (station 7+00 = 700 ft).\n\n**Step 2 — Set the two lines equal and solve for the PVI station:**\n  PVI Station = (b₁ − b₂) / (G₂/100 − G₁/100)\n\nUse the absolute value of the PVI Station to get the station number.\n\n**Step 3 — Compute PVI elevation:**\n  PVI Elevation = Elevation₁ + (G₁/100) × (PVI Station − Station₁)\n\nThis is just: starting elevation + grade × distance to PVI.',
        bookRefs: [
          { book: 'Math for Surveyors (MFS)', chapter: 'The Intersection of Two Grades', topic: 'PVI formula derivation and procedure' },
          { book: 'Elementary Surveying (ES)', chapter: 'Chapter 25', topic: 'Vertical curves — PVI location' },
        ],
      },
      {
        id: 'fs-d5-grades-s4',
        type: 'formula',
        title: 'PVI Station and Elevation Formulas',
        formula: {
          expression: 'b₁ = Elev₁ − (G₁/100) × Sta₁\nb₂ = Elev₂ − (G₂/100) × Sta₂\nPVI Station = (b₁ − b₂) / (G₂/100 − G₁/100)\nPVI Elevation = Elev₁ + (G₁/100) × (PVI Sta − Sta₁)',
          variables: [
            { symbol: 'G₁, G₂', description: 'Grade of each tangent in percent (positive = uphill, negative = downhill)' },
            { symbol: 'Elev₁, Elev₂', description: 'Known elevation at a station on each grade tangent' },
            { symbol: 'Sta₁, Sta₂', description: 'Station values in feet (e.g., station 7+00 = 700 ft) corresponding to the known elevations' },
            { symbol: 'b₁, b₂', description: 'y-intercepts of each grade line equation' },
          ],
          whenToUse: 'Use to find where two known grade lines meet. The PVI station and elevation are required before designing the vertical curve at a summit or sag.',
        },
        bookRefs: [
          { book: 'Math for Surveyors (MFS)', chapter: 'The Intersection of Two Grades', topic: 'Formulas and derivation' },
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic VII', topic: 'Vertical curve design and PVI computation' },
        ],
      },
      {
        id: 'fs-d5-grades-s5',
        type: 'worked_example',
        title: 'Finding the PVI: Full Worked Example',
        workedExample: {
          problem: 'A road profile has two tangent grades meeting at an unknown PVI. Grade G₁ = −1.00% passes through station 7+00 at elevation 201.40 ft. Grade G₂ = +2.00% passes through station 13+00 at elevation 207.50 ft. Find the PVI station and elevation.',
          steps: [
            { step: 1, description: 'Compute b for each grade line. Stations in feet: Sta₁ = 700 ft, Sta₂ = 1300 ft.', calculation: 'b₁ = 201.40 − (−1.00/100) × 700 = 201.40 + 7.00 = 208.40\nb₂ = 207.50 − (+2.00/100) × 1300 = 207.50 − 26.00 = 181.50' },
            { step: 2, description: 'Solve for the PVI station.', calculation: 'PVI Sta = (208.40 − 181.50) / (2.00/100 − (−1.00/100))\nPVI Sta = 26.90 / (0.02 − (−0.01)) = 26.90 / 0.03 = 896.67 ft\nUse absolute value: 896.67 ft = Station 8+96.67' },
            { step: 3, description: 'Compute PVI elevation from the known point on G₁.', calculation: 'Distance from Sta₁ to PVI = 896.67 − 700 = 196.67 ft\nΔElevation = G₁ × distance = (−0.01) × 196.67 = −1.97 ft\nPVI Elevation = 201.40 − 1.97 = 199.43 ft' },
          ],
          answer: 'PVI is at Station 8+96.67 with elevation 199.43 ft. Note this is a sag (G₁ negative, G₂ positive), so the vertical curve at this location would be concave upward. A vertical curve would be designed centered on this PVI to provide a smooth grade transition.',
        },
        bookRefs: [
          { book: 'Math for Surveyors (MFS)', chapter: 'The Intersection of Two Grades', topic: 'Full worked example' },
          { book: 'Surveying Solved Problems (SSP)', chapter: 'Vertical Curves', topic: 'PVI computation practice problems' },
        ],
      },
    ],
  },
];
