import type { ReadingModule } from '../schema';

export const STUDY_READINGS_SPIRALS: ReadingModule[] = [
  {
    id: 'fs-d5-spirals',
    examTrack: 'fs',
    domainNumber: 5,
    domain: 'Survey Computations & Applications',
    title: 'Spiral (Transition) Curves',
    description: 'Learn how spiral curves connect tangents to circular curves, compute all key spiral parameters (Ls, θs, Xs, Ys, LT, ST, k, p), and perform a complete spiral-curve-spiral layout computation. Spiral curves are an explicit NCEES FS exam topic under Survey Computations.',
    estimatedMinutes: 30,
    sections: [
      {
        id: 'fs-d5-spirals-s1',
        type: 'concept',
        title: 'Why Spiral Curves Are Used',
        content: 'A simple circular curve transitions abruptly from a tangent (straight alignment) to a constant-radius arc. At high speeds, this abrupt change forces drivers to steer instantaneously from zero curvature to full curve curvature, which can cause vehicle instability and skidding. Highway designers solve this problem with a spiral curve (also called a transition curve or clothoid curve) inserted between each tangent and the circular curve.\n\nThe spiral\'s defining property is that its curvature increases linearly from zero at the tangent end (the TS point — Tangent to Spiral) to the full circular curve curvature at the spiral-to-curve end (the SC point — Spiral to Curve). This gradual curvature increase allows vehicles to smoothly roll into and out of the circular arc while superelevation (road banking) is also applied gradually.\n\nOn the FS exam, spiral curves appear as computation problems: you are given the spiral length Ls and either the degree of circular curve D or the radius R, and you must compute the spiral\'s geometric elements. A spiral-curve-spiral (SCS) layout is the standard arrangement: tangent → spiral (TS to SC) → circular arc (SC to CS) → spiral (CS to ST) → tangent.',
        bookRefs: [
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic III, Ch 25', topic: 'Spiral curves and transition curve design' },
          { book: 'Elementary Surveying (ES)', chapter: 'Chapter 25', topic: 'Spirals and route survey layout' },
        ],
      },
      {
        id: 'fs-d5-spirals-s2',
        type: 'concept',
        title: 'Key Spiral Parameters and Definitions',
        content: 'Every spiral curve is described by a set of geometric parameters. Understanding these definitions is the foundation for all spiral computations:\n\n**Ls** — Spiral length. The arc length of the spiral, measured from the TS to the SC point. This is given by the designer or computed from design speed and superelevation requirements.\n\n**D** — Degree of the connecting circular curve (arc definition). R = 5729.578 / D.\n\n**θs** — Spiral angle. The total central angle subtended by the spiral arc. This is the key derived quantity: θs = Ls × D / 200 (degrees), or equivalently θs = Ls / (2R) (radians).\n\n**Xs** — Tangent distance. The x-coordinate (along the initial tangent) of the SC point, measured from the TS. Xs ≈ Ls × (1 – θs² / 10) for small angles, or exactly by the Fresnel integral series.\n\n**Ys** — Offset distance. The y-coordinate (perpendicular to the initial tangent) of the SC point, measured from the TS. Ys ≈ Ls × θs / 3 for small angles.\n\n**k** — Throw (also called the x-shift). The distance the circular curve center is shifted inward relative to the original tangent intersection. k ≈ Xs – R × sin(θs).\n\n**p** — Shift (also called the y-shift or offset). The perpendicular offset of the shifted circular curve center from the original tangent. p ≈ Ys – R × (1 – cos(θs)).\n\n**LT** — Long tangent. The distance from the TS to the projection of the SC onto the initial tangent (measured along the tangent direction).\n\n**ST** — Short tangent. The distance from the SC to the tangent point of the back-extended spiral tangent (perpendicular to the chord direction at the SC).',
        bookRefs: [
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic III, Ch 25', topic: 'Spiral parameter definitions' },
          { book: 'Elementary Surveying (ES)', chapter: 'Chapter 25', topic: 'Elements of a spiral' },
        ],
      },
      {
        id: 'fs-d5-spirals-s3',
        type: 'formula',
        title: 'Spiral Curve Formulas',
        formula: {
          expression: 'θs = Ls × D / 200 (deg);  θs_rad = Ls / (2R);  Xs = Ls(1 – θs²/10 + θs⁴/216);  Ys = Ls(θs/3 – θs³/42);  p = Ys – R(1 – cosθs);  k = Xs – R·sinθs;  LT = Xs – Ys/tanθs;  ST = Ys/sinθs;  Ts = (R + p)·tan(Δ/2) + k;  Ls_total = R·(Δ – 2θs)·π/180',
          variables: [
            { symbol: 'Ls', description: 'Spiral length (ft) — the arc length from TS to SC' },
            { symbol: 'D', description: 'Degree of circular curve (degrees, arc definition)' },
            { symbol: 'R', description: 'Radius of circular curve = 5729.578 / D (ft)' },
            { symbol: 'Δ', description: 'Total deflection angle of the alignment (degrees)' },
            { symbol: 'θs', description: 'Spiral angle (degrees) — total central angle of the spiral' },
            { symbol: 'θs_rad', description: 'Spiral angle in radians, for use in Xs/Ys series' },
            { symbol: 'Xs', description: 'Tangent distance from TS to SC projected on initial tangent (ft)' },
            { symbol: 'Ys', description: 'Perpendicular offset from initial tangent to SC (ft)' },
            { symbol: 'p', description: 'Shift — perpendicular offset of the shifted circular arc from original tangent' },
            { symbol: 'k', description: 'Throw — along-tangent offset of the shifted circular arc center' },
            { symbol: 'LT', description: 'Long tangent — distance from TS along tangent to foot of perpendicular from SC' },
            { symbol: 'ST', description: 'Short tangent — chord distance from TS projected tangent point to SC' },
            { symbol: 'Ts', description: 'Spiral tangent length — distance from PI to TS (or PI to ST)' },
            { symbol: 'Ls_total', description: 'Length of the circular arc portion between the two spiral-curve points' },
          ],
          whenToUse: 'Use θs = Ls × D / 200 first to get the spiral angle in degrees. Then compute Xs and Ys using the series (θs must be in radians for the series). Compute p and k to locate the shifted circular curve. Use Ts to find the TS and ST stations from the PI. The circular arc length formula gives the arc between SC and CS.',
        },
        bookRefs: [
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic III, Ch 25', topic: 'Spiral formulas and worked examples' },
        ],
      },
      {
        id: 'fs-d5-spirals-s4',
        type: 'worked_example',
        title: 'Complete Spiral-Curve-Spiral Layout',
        workedExample: {
          problem: 'A highway alignment has a total deflection angle Δ = 40°00\'00". The connecting circular curve has a degree of curvature D = 4° (arc definition). A spiral of length Ls = 200 ft is inserted at each end of the curve. The PI is at station 52+00.00. Compute: (a) the spiral angle θs, (b) Xs and Ys, (c) p and k, (d) Ts (spiral tangent length), (e) stations of TS, SC, CS, and ST.',
          steps: [
            { step: 1, description: 'Compute R from D.', calculation: 'R = 5729.578 / 4 = 1432.39 ft' },
            { step: 2, description: 'Compute spiral angle θs in degrees.', calculation: 'θs = Ls × D / 200 = 200 × 4 / 200 = 4.00°' },
            { step: 3, description: 'Convert θs to radians for series.', calculation: 'θs_rad = 4.00 × π/180 = 0.06981 rad' },
            { step: 4, description: 'Compute Xs using the series (first two terms are sufficient for small θs).', calculation: 'Xs = Ls(1 – θs²/10) = 200(1 – 0.06981²/10) = 200(1 – 0.000488) = 200 × 0.999512 = 199.90 ft' },
            { step: 5, description: 'Compute Ys using the series.', calculation: 'Ys = Ls × θs/3 = 200 × 0.06981/3 = 200 × 0.02327 = 4.65 ft' },
            { step: 6, description: 'Compute shift p.', calculation: 'p = Ys – R(1 – cos θs) = 4.65 – 1432.39(1 – cos 4°) = 4.65 – 1432.39(1 – 0.99756) = 4.65 – 1432.39 × 0.00244 = 4.65 – 3.50 = 1.15 ft' },
            { step: 7, description: 'Compute throw k.', calculation: 'k = Xs – R sin θs = 199.90 – 1432.39 × sin 4° = 199.90 – 1432.39 × 0.06976 = 199.90 – 99.95 = 99.95 ft' },
            { step: 8, description: 'Compute spiral tangent length Ts.', calculation: 'Ts = (R + p)tan(Δ/2) + k = (1432.39 + 1.15)tan(20°) + 99.95 = 1433.54 × 0.36397 + 99.95 = 521.78 + 99.95 = 621.73 ft' },
            { step: 9, description: 'Compute station of TS.', calculation: 'TS = PI – Ts = 5200.00 – 621.73 = 4578.27 = station 45+78.27' },
            { step: 10, description: 'Compute station of SC (TS + Ls).', calculation: 'SC = 4578.27 + 200.00 = 4778.27 = station 47+78.27' },
            { step: 11, description: 'Compute length of circular arc. Circular arc angle = Δ – 2θs = 40° – 2(4°) = 32°.', calculation: 'Arc = R × 32° × π/180 = 1432.39 × 0.55851 = 800.10 ft' },
            { step: 12, description: 'Compute station of CS (SC + circular arc).', calculation: 'CS = 4778.27 + 800.10 = 5578.37 = station 55+78.37' },
            { step: 13, description: 'Compute station of ST (CS + Ls).', calculation: 'ST = 5578.37 + 200.00 = 5778.37 = station 57+78.37' },
          ],
          answer: 'θs = 4.00°, Xs = 199.90 ft, Ys = 4.65 ft, p = 1.15 ft, k = 99.95 ft, Ts = 621.73 ft.\nStations: TS = 45+78.27, SC = 47+78.27, CS = 55+78.37, ST = 57+78.37.',
        },
      },
      {
        id: 'fs-d5-spirals-s5',
        type: 'concept',
        title: 'Long Tangent and Short Tangent',
        content: 'The long tangent (LT) and short tangent (ST) are the two legs of the chord triangle formed between the TS, the SC point, and the foot of the perpendicular dropped from SC to the initial tangent.\n\nLT is the longer leg, running from the TS along the initial tangent to the foot of the perpendicular from the SC. It equals approximately 2/3 of Ls for typical highway spirals.\n\nST is the shorter leg, running from the foot of the perpendicular up to the SC point, perpendicular to the initial tangent. It equals approximately 1/3 of Ls.\n\nFormulas:\n- LT = Xs – Ys / tan(θs)\n- ST = Ys / sin(θs)\n\nThese quantities are used when staking the spiral by the tangent-offset method in the field: from the TS, you measure LT along the tangent, then turn 90° and measure ST to set the SC point.\n\nFor the worked example above:\n- LT = 199.90 – 4.65 / tan(4°) = 199.90 – 4.65/0.06993 = 199.90 – 66.50 = 133.40 ft\n- ST = 4.65 / sin(4°) = 4.65 / 0.06976 = 66.66 ft\n\nNote that LT + ST > Ls because they are legs of a triangle, not arc lengths.',
        bookRefs: [
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic III, Ch 25', topic: 'Staking spiral curves by tangent offset' },
        ],
      },
      {
        id: 'fs-d5-spirals-s6',
        type: 'knowledge_check',
        title: 'Spiral Angle Check',
        knowledgeCheck: {
          question: 'A spiral of length 300 ft is joined to a circular curve with a degree of curve D = 6°. What is the spiral angle θs?',
          options: [
            '6.00°',
            '9.00°',
            '18.00°',
            '1.80°',
          ],
          correctIndex: 1,
          explanation: 'θs = Ls × D / 200 = 300 × 6 / 200 = 1800 / 200 = 9.00°. The spiral angle is determined by the product of spiral length and degree of curve, divided by 200. A longer spiral or a sharper curve produces a larger spiral angle.',
        },
      },
      {
        id: 'fs-d5-spirals-s7',
        type: 'knowledge_check',
        title: 'Spiral Tangent Length',
        knowledgeCheck: {
          question: 'For a spiral-curve-spiral layout, the spiral tangent length Ts is measured from which point to which point?',
          options: [
            'From the TS to the SC',
            'From the PI to the TS (or equivalently the PI to the ST)',
            'From the SC to the CS along the circular arc',
            'From the TS to the midpoint of the circular arc',
          ],
          correctIndex: 1,
          explanation: 'Ts is the distance from the PI (Point of Intersection, where the tangents meet) to the TS (Tangent to Spiral) point at the beginning of the spiral, or equivalently from the PI to the ST (Spiral to Tangent) at the end. It replaces the simple tangent distance T used for a plain circular curve. You subtract Ts from the PI station to get the TS station.',
        },
      },
      {
        id: 'fs-d5-spirals-s8',
        type: 'further_reading',
        title: 'Spiral Curve References',
        furtherReading: [
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic III, Chapter 25 (Spiral Curves)', topic: 'Complete spiral curve theory, formulas, and layout problems' },
          { book: 'Elementary Surveying: An Introduction to Geomatics (Ghilani & Wolf)', chapter: 'Chapter 25', topic: 'Horizontal curves with spirals, superelevation, and route surveying' },
          { book: 'Surveying Solved Problems (Buckner)', chapter: 'Spiral Curve Problems', topic: 'Step-by-step worked examples for FS exam spiral problems' },
        ],
      },
    ],
  },
];
