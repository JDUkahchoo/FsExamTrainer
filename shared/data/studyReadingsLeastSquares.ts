import type { ReadingModule } from '../schema';

export const STUDY_READINGS_LEAST_SQUARES: ReadingModule[] = [
  {
    id: 'fs-d12-least-squares',
    examTrack: 'fs',
    domainNumber: 7,
    domain: 'Applied Mathematics & Statistics',
    title: 'Least Squares Adjustment & Positional Accuracy',
    description: 'Understand the principles of least squares adjustment — the statistical method that optimally distributes measurement errors across a network. Learn key terms, the standard error of unit weight, error ellipses, the chi-squared goodness-of-fit test, and ALTA/NSPS positional accuracy standards. These concepts are tested on both the FS and PS exams.',
    estimatedMinutes: 24,
    sections: [
      {
        id: 'fs-d12-ls-s1',
        type: 'concept',
        title: 'Why Least Squares Adjustment?',
        content: 'Every physical measurement contains random errors — small, unpredictable deviations from the true value caused by limitations in instruments, human observation, and environmental conditions. When a surveyor measures more observations than the minimum needed to solve a geometric problem (i.e., redundant observations), those observations will never perfectly agree due to random errors.\n\nLeast squares adjustment is the mathematical method for finding the best-fitting solution when redundant observations are present. It distributes residuals (corrections to observations) such that the sum of the squares of the weighted residuals is minimized — hence the name "least squares."\n\nWhy use least squares?\n1. It provides a statistically optimal (most probable) estimate of unknown quantities.\n2. It gives a complete statistical picture of the solution, including the precision of each computed position.\n3. It allows hypothesis testing to detect gross errors (blunders) in the data.\n4. It is the standard method required for high-order geodetic networks, ALTA/NSPS surveys, and any work requiring rigorous accuracy assessment.\n\nCommon surveying applications:\n- Horizontal traverse adjustment\n- Leveling network adjustment\n- GNSS network adjustment\n- Triangulation and trilateration networks\n- Combined horizontal and vertical network adjustments',
        bookRefs: [
          { book: 'Elementary Surveying (ES)', chapter: 'Chapter 3', topic: 'Theory of errors and least squares adjustment' },
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic I, Ch 11', topic: 'Statistics and error propagation' },
        ],
      },
      {
        id: 'fs-d12-ls-s2',
        type: 'concept',
        title: 'Key Terminology',
        content: 'Understanding least squares requires fluency with several important terms:\n\nObservation (measurement): A directly measured quantity, such as a horizontal angle, distance, or elevation difference. Observations contain random errors.\n\nTrue Value: The actual, unknown value of the quantity being measured. We can never know the true value; we can only estimate it.\n\nResidual (v): The correction applied to an observation in the adjustment. Residual = Adjusted value − Observed value. Residuals represent our best estimate of the random error in each measurement.\n\nRedundancy (r): The number of observations in excess of the minimum needed to determine the unknowns. Also called the degrees of freedom.\n   r = n − u\nwhere n = number of observations and u = number of unknowns.\n\nFor a closed polygon traverse: r = n_angles + n_distances − (2 × n_points + 1) for a free traverse, or r = n_angles + n_distances − (2 × n_interior_unknowns) for a constrained traverse.\n\nWeight (p): A factor expressing the relative reliability of each observation. Higher weight means the observation is trusted more and will receive a smaller residual. Weight is inversely proportional to the variance of the observation:\n   p = σ₀² / σᵢ²\nwhere σ₀ is the reference standard deviation (standard deviation of unit weight) and σᵢ is the standard deviation of observation i.\n\nPosterior estimates: Values computed AFTER the adjustment. These include adjusted observations, adjusted coordinates, and the standard error of unit weight.',
        bookRefs: [
          { book: 'Elementary Surveying (ES)', chapter: 'Chapter 3', topic: 'Error theory, observations, and redundancy' },
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic I, Ch 11', topic: 'Statistical terminology for surveyors' },
        ],
      },
      {
        id: 'fs-d12-ls-s3',
        type: 'formula',
        title: 'Standard Error of Unit Weight',
        formula: {
          expression: 'σ₀ = √(Σ(p·v²) / r) = √(vᵀPv / (n − u))',
          variables: [
            { symbol: 'σ₀', description: 'Standard error of unit weight — an overall indicator of how well the adjustment fit the data; also written S₀ or SEUW' },
            { symbol: 'v', description: 'Residual vector — the vector of differences between adjusted and observed values' },
            { symbol: 'P', description: 'Weight matrix — a diagonal matrix whose entries are the weights of each observation' },
            { symbol: 'vᵀPv', description: 'Weighted sum of squares of residuals — the scalar product of the residuals, weights, and residuals' },
            { symbol: 'n', description: 'Total number of observations' },
            { symbol: 'u', description: 'Number of unknowns (parameters) in the adjustment' },
            { symbol: 'r = n − u', description: 'Degrees of freedom (redundancy) — must be at least 1 for any statistical testing' },
          ],
          whenToUse: 'Compute the standard error of unit weight after every least squares adjustment to assess overall data quality. A value near 1.0 indicates the adjustment fits the data consistently with the assumed observation standard deviations. Values significantly greater than 1.0 suggest undetected blunders or underestimated error budgets; values near 0 suggest overly pessimistic error estimates.',
        },
        bookRefs: [
          { book: 'Elementary Surveying (ES)', chapter: 'Chapter 3', topic: 'Standard error of unit weight computation' },
        ],
      },
      {
        id: 'fs-d12-ls-s4',
        type: 'worked_example',
        title: 'Computing Standard Error of Unit Weight',
        workedExample: {
          problem: 'A leveling network has 7 observations and 4 unknowns (junction elevations). After a weighted least squares adjustment, the weighted sum of squared residuals (vᵀPv) is 12.60. Compute the standard error of unit weight and assess whether the adjustment is acceptable.',
          steps: [
            { step: 1, description: 'Identify the number of degrees of freedom.', calculation: 'r = n − u = 7 − 4 = 3' },
            { step: 2, description: 'Apply the standard error of unit weight formula.', calculation: 'σ₀ = √(vᵀPv / r) = √(12.60 / 3) = √4.20 = 2.05' },
            { step: 3, description: 'Interpret the result. The target value is 1.0 (dimensionless). A value of 2.05 is significantly greater than 1.0.', calculation: 'σ₀ = 2.05 >> 1.0 → the fit is poor' },
          ],
          answer: 'The standard error of unit weight is 2.05. This value is substantially greater than 1.0, suggesting that either the observation standard deviations were underestimated, a blunder exists in one of the observations, or the network geometry has issues. Investigation of the largest residuals should be conducted before accepting the adjustment.',
        },
      },
      {
        id: 'fs-d12-ls-s5',
        type: 'concept',
        title: 'The Chi-Squared Goodness-of-Fit Test',
        content: 'After computing the standard error of unit weight, a formal statistical test can confirm whether the adjustment fits the data within acceptable limits. The chi-squared (χ²) test compares the weighted sum of squares to a theoretical chi-squared distribution.\n\nTest Statistic:\n   χ² = vᵀPv / σ₀²(apriori)\n\nwhere σ₀²(apriori) is the a priori (assumed) variance of unit weight, usually set to 1.0.\n\nDecision Rule:\n- Compute the critical values from the chi-squared distribution table at the desired significance level (typically 5%, two-tailed, giving χ²_lower and χ²_upper).\n- If χ²_lower ≤ vᵀPv ≤ χ²_upper, the null hypothesis H₀: σ₀² = 1 is accepted → the adjustment is statistically consistent with the assumed error model.\n- If vᵀPv > χ²_upper → reject H₀; the errors are larger than expected (possible blunders or poor geometry).\n- If vᵀPv < χ²_lower → reject H₀; the errors are smaller than expected (possibly over-estimated a priori standard deviations).\n\nDegrees of Freedom:\nThe chi-squared distribution is parameterized by the degrees of freedom (r = n − u). The critical values are looked up in a table using r and the desired significance level.\n\nOn the FS exam, you are more likely to be tested on the interpretation of the test result and the concept of degrees of freedom than on computing specific chi-squared critical values from memory.',
        bookRefs: [
          { book: 'Elementary Surveying (ES)', chapter: 'Chapter 3', topic: 'Statistical testing and chi-squared test' },
        ],
      },
      {
        id: 'fs-d12-ls-s6',
        type: 'concept',
        title: 'Error Ellipses and Positional Uncertainty',
        content: 'After a least squares adjustment of a horizontal network, the uncertainty of each computed position is described not by a single number, but by an error ellipse — an ellipse centered on the adjusted position that represents the two-dimensional distribution of positional uncertainty.\n\nError Ellipse Parameters:\n- Semi-major axis (a): The largest positional uncertainty, in the direction of least constraint\n- Semi-minor axis (b): The smallest positional uncertainty, in the perpendicular direction\n- Orientation angle (θ): The direction of the semi-major axis, measured from north or the east axis\n\nAt a given confidence level:\n- The 95% error ellipse (approximately 2σ ellipse) has a 95% probability of containing the true position.\n- The standard (1σ) error ellipse has approximately 39% probability.\n\nPhysical meaning:\n- A circular error ellipse (a ≈ b) indicates that the network geometry constrains the position equally in all directions.\n- An elongated error ellipse indicates that the position is poorly constrained in one direction — perhaps because all observations come from one direction, or a long baseline provides poor perpendicular control.\n\nCircular Error Probable (CEP): The radius of a circle within which 50% of positions fall. For a horizontal network, CEP ≈ 0.589 × (σN + σE) for normally distributed errors.\n\nError ellipses appear on survey plats, ALTA/NSPS surveys, and geodetic control data sheets, and they are the rigorous way to express positional accuracy at network nodes.',
        bookRefs: [
          { book: 'Elementary Surveying (ES)', chapter: 'Chapter 3', topic: 'Error ellipses and two-dimensional uncertainty' },
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic I, Ch 11', topic: 'Positional error ellipses' },
        ],
      },
      {
        id: 'fs-d12-ls-s7',
        type: 'formula',
        title: 'Relative Positional Precision (ALTA/NSPS)',
        formula: {
          expression: 'RPP = √(σ_ΔN² + σ_ΔE²); ALTA/NSPS tolerance: RPP ≤ 2 cm (0.07 ft) + 50 ppm × D',
          variables: [
            { symbol: 'RPP', description: 'Relative Positional Precision — the uncertainty of the position of one monument relative to another nearby monument, derived from the least squares adjustment covariance matrix' },
            { symbol: 'σ_ΔN', description: 'Standard deviation of the northing difference between two points' },
            { symbol: 'σ_ΔE', description: 'Standard deviation of the easting difference between two points' },
            { symbol: 'D', description: 'Distance between the two monuments in the same units as the tolerance (meters or feet)' },
            { symbol: '50 ppm', description: 'Distance-dependent tolerance component: 50 millionths of the inter-monument distance (0.05 mm per meter or 0.05 ft per 1,000 ft)' },
          ],
          whenToUse: 'Use relative positional precision to assess whether adjacent monument pairs meet the ALTA/NSPS accuracy standard. The 2026 ALTA/NSPS Minimum Standard Detail Requirements specify that the relative positional precision of monuments that control boundary lines must not exceed 2 cm (0.07 ft) + 50 ppm. For most urban surveys, the 2 cm constant dominates; for long rural boundaries, the distance term becomes significant.',
        },
        bookRefs: [
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic VII, Ch 35', topic: 'ALTA/NSPS positional accuracy requirements' },
        ],
      },
      {
        id: 'fs-d12-ls-s8',
        type: 'worked_example',
        title: 'Relative Positional Precision Calculation',
        workedExample: {
          problem: 'Two property corners are 1,200 ft apart. After a least squares adjustment, the standard deviation of the northing difference is 0.030 ft and the standard deviation of the easting difference is 0.025 ft. Does this survey meet the ALTA/NSPS relative positional precision requirement?',
          steps: [
            { step: 1, description: 'Compute the RPP from the adjustment covariance matrix.', calculation: 'RPP = √(0.030² + 0.025²) = √(0.000900 + 0.000625) = √0.001525 = 0.039 ft' },
            { step: 2, description: 'Compute the ALTA/NSPS tolerance for this distance. Convert 50 ppm to ft: 50 × 10⁻⁶ × 1,200 ft = 0.060 ft.', calculation: 'Tolerance = 0.07 ft + 50 ppm × D = 0.07 + 0.060 = 0.130 ft' },
            { step: 3, description: 'Compare RPP to the tolerance.', calculation: 'RPP (0.039 ft) ≤ Tolerance (0.130 ft) → PASSES' },
          ],
          answer: 'The survey meets the ALTA/NSPS relative positional precision standard. The computed RPP of 0.039 ft is well within the allowed tolerance of 0.130 ft for a 1,200-ft baseline.',
        },
      },
      {
        id: 'fs-d12-ls-s9',
        type: 'knowledge_check',
        title: 'Least Squares Concepts Check',
        knowledgeCheck: {
          question: 'A horizontal network has 12 distance observations and 3 angle observations (15 total). The unknowns are the coordinates of 6 new points (12 coordinates). What is the redundancy of the network?',
          options: [
            '3',
            '6',
            '9',
            '15',
          ],
          correctIndex: 0,
          explanation: 'Redundancy (degrees of freedom) = n − u = 15 − 12 = 3. Here n = 15 observations and u = 12 unknowns (coordinates of 6 new points, each with N and E). With 3 degrees of freedom, the adjustment has some redundancy and can detect gross errors, but very limited statistical testing capability. More observations would improve the network.',
        },
      },
      {
        id: 'fs-d12-ls-s10',
        type: 'knowledge_check',
        title: 'Standard Error of Unit Weight Interpretation',
        knowledgeCheck: {
          question: 'After a traverse adjustment, the standard error of unit weight (σ₀) is computed as 0.42. What does this indicate?',
          options: [
            'The adjustment failed — the value must be exactly 1.0',
            'The residuals are smaller than expected — the a priori standard deviations were probably too pessimistic (too large)',
            'There is likely a blunder in one of the observations',
            'The network has insufficient redundancy to evaluate precision'
          ],
          correctIndex: 1,
          explanation: 'A standard error of unit weight significantly less than 1.0 indicates that the actual residuals are smaller than the assumed measurement uncertainties — the a priori standard deviations were likely overestimated (too pessimistic). While this is not as alarming as a value greatly exceeding 1.0, it may mean the weights should be revised for a more realistic assessment. Values greater than 1.0 suggest blunders or underestimated errors.',
        },
      },
      {
        id: 'fs-d12-ls-s11',
        type: 'further_reading',
        title: 'Least Squares and Accuracy References',
        furtherReading: [
          { book: 'Elementary Surveying, 15th Edition (Ghilani & Wolf)', chapter: 'Chapter 3', topic: 'Theory of errors and method of least squares' },
          { book: 'Elementary Surveying, 15th Edition (Ghilani & Wolf)', chapter: 'Chapter 16', topic: 'Adjustment by least squares (traverse)' },
          { book: 'Surveyor Reference Manual', chapter: 'Topic I, Ch 11', topic: 'Statistics and error propagation for surveyors' },
          { book: 'ALTA/NSPS Minimum Standard Detail Requirements (2026)', chapter: 'Section 3', topic: 'Relative Positional Precision definition and tolerance' },
        ],
      },
    ],
  },
];
