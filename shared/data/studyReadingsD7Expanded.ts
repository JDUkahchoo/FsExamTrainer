import type { ReadingModule } from '../schema';

export const STUDY_READINGS_D7_EXPANDED: ReadingModule[] = [
  {
    id: 'fs-d7-leastsquares',
    examTrack: 'fs',
    domainNumber: 7,
    domain: 'Applied Mathematics & Statistics',
    title: 'Least Squares Adjustments',
    description: 'Learn the theory and practice of least squares adjustment, the most rigorous method for combining redundant survey observations. This reading covers the mathematical model, matrix formulation, solution process, quality metrics, and practical applications in control networks, GNSS, and traverses. Least squares adjustment is a core topic on the FS exam under Applied Mathematics & Statistics.',
    estimatedMinutes: 25,
    sections: [
      {
        id: 'fs-d7-leastsquares-s1',
        type: 'concept',
        title: 'Why Least Squares?',
        content: 'In professional surveying, we almost always collect more measurements than the minimum required to determine unknown quantities. For example, to determine the elevation difference between two benchmarks, one level run suffices, but a careful surveyor will run multiple lines to provide redundancy. When we have more observations than unknowns, the system is said to be overdetermined, and the measurements will inevitably contain small inconsistencies due to random errors. The question becomes: how do we find the "best" values for the unknowns given these slightly conflicting observations?\n\nThe method of least squares provides the mathematically optimal answer. It finds the set of unknown values that minimizes the sum of the squares of the residuals (the differences between observed and computed values). This criterion, first published by Legendre in 1805 and independently developed by Gauss, has several desirable properties: the solution is unique, it produces the most probable values under the assumption of normally distributed errors, and it provides rigorous estimates of the precision of the results.\n\nWhy minimize squared residuals rather than, say, the sum of absolute residuals? Squaring the residuals ensures that positive and negative discrepancies do not cancel each other out. It also penalizes larger residuals more heavily than smaller ones, which is appropriate when errors follow a normal (Gaussian) distribution. Additionally, the squared criterion leads to a system of linear equations that can be solved using standard matrix algebra, whereas minimizing absolute values leads to a more complex optimization problem.\n\nThere are two main forms of least squares adjustment: unweighted and weighted. In unweighted least squares, all observations are treated as equally reliable. This is appropriate when all measurements are taken with the same instrument, under similar conditions, and with the same procedure. In weighted least squares, each observation is assigned a weight that reflects its relative precision. Observations made with higher precision (lower standard deviation) receive larger weights, giving them more influence on the solution. The weight of an observation is typically defined as inversely proportional to the variance of that observation: w = 1/sigma^2.\n\nFor the FS exam, you should understand that least squares adjustment is the standard method for adjusting control networks, processing GNSS baselines, and adjusting traverses when redundant observations are available. It replaces simpler methods like the compass rule or transit rule for traverse adjustment when a rigorous statistical treatment is needed. The key advantage of least squares over these simpler methods is that it provides not only adjusted values but also statistical measures of quality, such as standard errors and confidence intervals for every adjusted quantity.',
      },
      {
        id: 'fs-d7-leastsquares-s2',
        type: 'concept',
        title: 'The Observation Equation Model',
        content: 'The foundation of least squares adjustment is the observation equation model, expressed in matrix notation as Ax = L + v. In this equation, A is the design matrix (also called the coefficient matrix or Jacobian matrix), x is the vector of unknown corrections (or unknowns), L is the vector of observations (measured values), and v is the vector of residuals (the differences between adjusted and observed values). The goal is to find x such that the sum of v^T W v is minimized, where W is the weight matrix.\n\nThe design matrix A describes the geometric relationship between the unknowns and the observations. Each row of A corresponds to one observation equation, and each column corresponds to one unknown. The elements of A are the partial derivatives of the observation equation with respect to each unknown. For linear problems (such as differential leveling), the elements of A are simply +1, -1, or 0. For nonlinear problems (such as triangulation or trilateration), the equations must first be linearized using a Taylor series expansion around approximate values of the unknowns.\n\nConsider a simple leveling example. Suppose we have three benchmarks (BM-A, BM-B, BM-C) where BM-A has a known elevation and we want to determine the elevations of BM-B and BM-C. We make three level runs: (1) from BM-A to BM-B with observed elevation difference dh1, (2) from BM-B to BM-C with observed elevation difference dh2, and (3) from BM-A to BM-C with observed elevation difference dh3. We have three observations but only two unknowns (elevations of BM-B and BM-C), giving us one degree of freedom (redundancy). The observation equations are: H_B - H_A = dh1, H_C - H_B = dh2, and H_C - H_A = dh3. These can be rearranged and written in matrix form.\n\nThe weight matrix W is a diagonal matrix (assuming uncorrelated observations) where each diagonal element is the weight assigned to the corresponding observation. If all level runs are of equal length and performed with the same instrument, the weights would be equal. If the runs have different lengths, the weights are typically set inversely proportional to the length of the run, since longer level runs accumulate more error. For example, if run 1 is 500 m, run 2 is 300 m, and run 3 is 800 m, the weights might be set as w1 = 1/500, w2 = 1/300, w3 = 1/800.\n\nFor traverse adjustment, the observation equations are more complex because they involve both angle and distance measurements, and the equations are nonlinear. The angles and distances are functions of the coordinates of the traverse stations. The equations are linearized about approximate coordinates, and the design matrix contains the partial derivatives of the observation equations with respect to the coordinate unknowns. This linearization process requires initial approximate values, which are typically obtained from a preliminary computation of the traverse using the raw observations.',
      },
      {
        id: 'fs-d7-leastsquares-s3',
        type: 'formula',
        title: 'The Least Squares Solution',
        formula: {
          expression: 'x = (A^T W A)^(-1) A^T W L',
          variables: [
            { symbol: 'x', description: 'Vector of unknown corrections (adjusted unknowns)' },
            { symbol: 'A', description: 'Design matrix (coefficient matrix) relating observations to unknowns' },
            { symbol: 'A^T', description: 'Transpose of the design matrix' },
            { symbol: 'W', description: 'Weight matrix (diagonal matrix of observation weights, w_i = 1/sigma_i^2)' },
            { symbol: 'L', description: 'Vector of observations (measured values or observation minus computed)' },
          ],
          whenToUse: 'Use this formula to compute the best-fit values of unknown quantities (coordinates, elevations, etc.) from a set of redundant survey observations. This is the fundamental equation for adjusting control networks, leveling circuits, traverses with redundancy, and GNSS baseline networks. The matrix (A^T W A)^(-1) is also the cofactor matrix of the adjusted unknowns, used to compute standard errors.',
        },
      },
      {
        id: 'fs-d7-leastsquares-s4',
        type: 'worked_example',
        title: 'Simple Leveling Network Adjustment',
        workedExample: {
          problem: 'A leveling network has three benchmarks: BM-A (known elevation = 100.000 m), BM-B, and BM-C (both unknown). Four level runs were performed:\n- Run 1: BM-A to BM-B, observed dh = +3.452 m, distance = 1.0 km\n- Run 2: BM-B to BM-C, observed dh = +2.105 m, distance = 0.8 km\n- Run 3: BM-A to BM-C, observed dh = +5.550 m, distance = 1.5 km\n- Run 4: BM-C to BM-B, observed dh = -2.110 m, distance = 0.6 km\nDetermine the adjusted elevations of BM-B and BM-C using weighted least squares (weights inversely proportional to distance).',
          steps: [
            { step: 1, description: 'Set up unknowns. Let x1 = H_B (elevation of BM-B) and x2 = H_C (elevation of BM-C). H_A = 100.000 m is known.' },
            { step: 2, description: 'Write observation equations:\n  Run 1: H_B - H_A = dh1 => x1 = 100.000 + 3.452 = 103.452\n  Run 2: H_C - H_B = dh2 => x2 - x1 = 2.105\n  Run 3: H_C - H_A = dh3 => x2 = 100.000 + 5.550 = 105.550\n  Run 4: H_B - H_C = dh4 => x1 - x2 = -2.110' },
            { step: 3, description: 'Form the design matrix A and observation vector L (using the form Ax = L):\n  A = [[1, 0], [-1, 1], [0, 1], [1, -1]]\n  L = [103.452, 2.105, 105.550, -2.110]', calculation: 'A is 4x2, L is 4x1' },
            { step: 4, description: 'Form weight matrix W (weights = 1/distance):\n  w1 = 1/1.0 = 1.000, w2 = 1/0.8 = 1.250, w3 = 1/1.5 = 0.667, w4 = 1/0.6 = 1.667', calculation: 'W = diag(1.000, 1.250, 0.667, 1.667)' },
            { step: 5, description: 'Compute A^T W A (the normal equation matrix, 2x2):\n  A^T W A = [[1(1.0)+1(1.25)+0+1(1.667), 0-1(1.25)+0-1(1.667)], [0-1(1.25)+0-1(1.667), 0+1(1.25)+1(0.667)+1(1.667)]]', calculation: 'A^T W A = [[3.917, -2.917], [-2.917, 3.583]]' },
            { step: 6, description: 'Compute A^T W L:\n  = [1(1.0)(103.452) + (-1)(1.25)(2.105) + 0 + 1(1.667)(-2.110), 0 + 1(1.25)(2.105) + 1(0.667)(105.550) + (-1)(1.667)(-2.110)]', calculation: 'A^T W L = [96.300, 76.337]' },
            { step: 7, description: 'Solve the normal equations (A^T W A) x = A^T W L by matrix inversion or elimination to obtain the adjusted unknowns.', calculation: 'x = [103.449, 105.553] => H_B = 103.449 m, H_C = 105.553 m' },
          ],
          answer: 'The adjusted elevations are H_B = 103.449 m and H_C = 105.553 m. The residuals for each observation can be computed as v = Ax - L. The small residuals confirm good internal consistency of the measurements. The adjustment distributes the small misclosures across all observations proportionally to their weights.',
        },
      },
      {
        id: 'fs-d7-leastsquares-s5',
        type: 'concept',
        title: 'Residuals, Standard Errors, and Quality Metrics',
        content: 'After computing the least squares solution, the next critical step is evaluating the quality of the adjustment. This involves analyzing the residuals, computing the posterior variance factor, and determining the standard errors of the adjusted quantities. These quality metrics tell the surveyor whether the observations are consistent, whether any blunders are present, and how precise the adjusted results are.\n\nResiduals are computed as v = Ax - L, where x is the vector of adjusted unknowns. Each residual represents the correction applied to an individual observation to make it consistent with the adjusted solution. In a good adjustment, residuals should be small, randomly distributed, and roughly proportional to the expected measurement uncertainty. A pattern in the residuals (such as all positive or systematically increasing) may indicate a systematic error. An unusually large residual may indicate a blunder in that particular observation.\n\nThe posterior variance factor (also called the reference variance or unit weight variance) is a single number that characterizes the overall quality of the adjustment. It is computed as sigma_0^2 = v^T W v / (n - u), where n is the number of observations, u is the number of unknowns, and (n - u) is the number of degrees of freedom (redundancy). If the a priori weights were correctly assigned, the posterior variance factor should be close to 1.0. A value significantly greater than 1.0 suggests the observations are less precise than assumed (the weights were too optimistic). A value significantly less than 1.0 suggests the observations are more precise than assumed.\n\nThe cofactor matrix of the adjusted unknowns is Q_x = (A^T W A)^(-1). This matrix contains important information about the precision of the adjusted values and the correlations between them. The diagonal elements of Q_x, when multiplied by the posterior variance factor, give the variances of the adjusted unknowns: sigma_xi^2 = sigma_0^2 * Q_x(i,i). The standard error of each adjusted unknown is the square root of its variance.\n\nFor the FS exam, you should understand that standard errors provide a measure of confidence in the adjusted results. A standard error of, say, 0.005 m for an adjusted elevation means that the true elevation is expected to lie within plus or minus 0.005 m of the adjusted value with approximately 68% confidence (one standard deviation). For 95% confidence, multiply by approximately 1.96. These standard errors are one of the major advantages of least squares over simpler adjustment methods.\n\nThe ratio of the posterior variance factor to the a priori variance factor can also be tested statistically using a chi-square test to determine whether the adjustment passes at a given confidence level. This global test of the adjustment is a powerful tool for detecting problems in the observation data or the functional model.',
      },
      {
        id: 'fs-d7-leastsquares-s6',
        type: 'knowledge_check',
        title: 'Purpose of Least Squares Adjustment',
        knowledgeCheck: {
          question: 'What is the primary purpose of applying a least squares adjustment to a set of redundant survey observations?',
          options: [
            'To eliminate all measurement errors and obtain exact values for the unknowns',
            'To find the most probable values of the unknowns by minimizing the sum of the squares of the weighted residuals',
            'To increase the number of observations so that the system becomes solvable',
            'To convert field measurements from ground distance to grid distance',
          ],
          correctIndex: 1,
          explanation: 'The primary purpose of least squares adjustment is to find the most probable values of the unknowns by minimizing the sum of the squares of the weighted residuals (v^T W v). This produces the statistically optimal solution when measurement errors follow a normal distribution. Option A is incorrect because no adjustment method can eliminate all errors; least squares minimizes their effect but random errors always remain. Option C is incorrect because least squares requires that the system already be overdetermined (more observations than unknowns); it does not add observations. Option D describes a coordinate conversion (scale factor application), which is unrelated to least squares adjustment.',
        },
      },
      {
        id: 'fs-d7-leastsquares-s7',
        type: 'concept',
        title: 'Practical Applications in Surveying',
        content: 'Least squares adjustment is used throughout modern surveying practice whenever redundant observations are available. Understanding the practical applications helps put the mathematical theory into context and prepares you for FS exam questions about when and why to use least squares.\n\nControl Network Adjustment: The most classic application of least squares is adjusting horizontal and vertical control networks. A control network consists of a set of monumented points connected by angle and distance measurements. The redundant observations allow a least squares adjustment to determine the best coordinates for all points simultaneously. The adjustment also provides standard errors for each coordinate, helping the surveyor assess whether the network meets the required accuracy standards. National and state geodetic control networks are adjusted using least squares, and local project control should be as well.\n\nGNSS Baseline Processing: When multiple GNSS receivers observe satellites simultaneously, the resulting baselines (three-dimensional vectors between receivers) are processed using least squares. The satellite observations are highly redundant, and the least squares adjustment determines the best-fit baseline components (delta-X, delta-Y, delta-Z) along with their standard errors and correlations. When multiple baselines form a network, a second-stage least squares adjustment (network adjustment) combines all baselines to determine the best coordinates for all stations.\n\nTraverse Adjustment: While simple traverse adjustments can be done using the compass rule or transit rule, a least squares adjustment is more rigorous. It properly accounts for the different precisions of angle and distance measurements, handles redundant observations (such as multiple angle sets or reciprocal distance measurements), and provides standard errors for the adjusted coordinates. For traverses that are part of a larger control network, least squares is the preferred method.\n\nConstrained vs. Minimally Constrained Adjustments: A minimally constrained adjustment holds only the minimum number of coordinates fixed to define the datum (position, orientation, and scale). For a 2D network, this means fixing one point and one azimuth. A constrained adjustment holds additional points fixed, typically tying the network to existing control. The minimally constrained adjustment reveals the internal consistency of the observations without being influenced by errors in the control. The constrained adjustment forces the network to fit the existing control framework. Best practice is to perform a minimally constrained adjustment first to check for blunders and assess internal quality, then perform the constrained adjustment for final coordinates.\n\nModern surveying software packages (such as StarNet, MicroSurvey STAR*NET, Trimble Business Center, and Leica Infinity) include least squares adjustment modules that handle the matrix computations automatically. However, understanding the underlying principles is essential for interpreting the results, diagnosing problems, and ensuring that the adjustment parameters are correctly configured. The FS exam tests conceptual understanding of least squares rather than requiring you to perform matrix arithmetic by hand.',
      },
      {
        id: 'fs-d7-leastsquares-s8',
        type: 'further_reading',
        title: 'Further Reading',
        furtherReading: [
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic I, Chapters 10-11 (Analytical Geometry, Statistics of Measurements)', topic: 'Mathematical foundations of adjustment computations, least squares, observation equations, and error analysis' },
          { book: 'Elementary Surveying (ES)', chapter: 'Chapter 16', topic: 'Adjustment computations for leveling networks, traverses, and triangulation networks' },
        ],
      },
    ],
  },
  {
    id: 'fs-d7-hypothesis',
    examTrack: 'fs',
    domainNumber: 7,
    domain: 'Applied Mathematics & Statistics',
    title: 'Hypothesis Testing & Linear Regression',
    description: 'Build your understanding of hypothesis testing, statistical tests commonly used in surveying, linear regression analysis, and the normal distribution. This reading covers the conceptual framework of hypothesis testing, chi-square, t-test, and F-test applications, regression analysis for fitting data, and how the normal distribution underpins measurement error theory. These topics are tested on the FS exam under Applied Mathematics & Statistics.',
    estimatedMinutes: 22,
    sections: [
      {
        id: 'fs-d7-hypothesis-s1',
        type: 'concept',
        title: 'Hypothesis Testing Fundamentals',
        content: 'Hypothesis testing is a systematic procedure for making decisions about population parameters based on sample data. In surveying, we use hypothesis tests to answer questions such as: "Does this instrument meet its stated accuracy specification?" or "Is the difference between two sets of measurements statistically significant?" Understanding the framework of hypothesis testing is essential for interpreting statistical results on the FS exam.\n\nEvery hypothesis test begins with two competing statements. The null hypothesis (H_0) represents the status quo or no-effect condition. It is the assumption we start with and try to disprove. The alternative hypothesis (H_a or H_1) represents the claim we are trying to support. For example, if testing whether a total station meets its angular accuracy specification of 5 arc seconds, the null hypothesis might be H_0: sigma = 5" (the instrument meets the spec) and the alternative might be H_a: sigma > 5" (the instrument does not meet the spec).\n\nTwo types of errors can occur in hypothesis testing. A Type I error occurs when we reject the null hypothesis when it is actually true (a "false positive"). The probability of a Type I error is denoted alpha and is called the significance level. Common choices are alpha = 0.05 (5%) and alpha = 0.01 (1%). A Type II error occurs when we fail to reject the null hypothesis when it is actually false (a "false negative"). The probability of a Type II error is denoted beta. The power of the test is 1 - beta, representing the probability of correctly detecting a real effect.\n\nThe significance level alpha is chosen before conducting the test and represents the threshold for how much evidence we require. A smaller alpha means we demand stronger evidence before rejecting H_0, reducing the chance of a Type I error but increasing the chance of a Type II error. In surveying quality control, alpha = 0.05 is most commonly used, meaning we accept a 5% chance of incorrectly concluding that a problem exists when it does not.\n\nThe p-value is the probability of obtaining a test statistic as extreme as, or more extreme than, the one observed, assuming the null hypothesis is true. If the p-value is less than or equal to alpha, we reject H_0. If the p-value is greater than alpha, we fail to reject H_0. Note that "failing to reject" is not the same as "accepting" the null hypothesis; it simply means we do not have sufficient evidence to disprove it.\n\nTests can be one-tailed or two-tailed. A one-tailed test checks for an effect in only one direction (e.g., H_a: sigma > 5", testing only whether the error is larger than specified). A two-tailed test checks for an effect in either direction (e.g., H_a: sigma is not equal to 5", testing whether the error is either larger or smaller than specified). Two-tailed tests are more conservative because they split the rejection region between both tails of the distribution.',
      },
      {
        id: 'fs-d7-hypothesis-s2',
        type: 'concept',
        title: 'Common Statistical Tests for Surveyors',
        content: 'Several specific statistical tests appear frequently in surveying applications and on the FS exam. Each test is designed for a particular type of question and uses a specific probability distribution. Understanding which test to use and when is critical for exam preparation.\n\nThe chi-square test is used to evaluate whether an observed sample variance is consistent with a hypothesized population variance. In surveying, this is commonly applied to verify instrument accuracy specifications or to test the posterior variance factor from a least squares adjustment. The test statistic is chi^2 = (n-1) * s^2 / sigma_0^2, where n is the sample size, s^2 is the sample variance, and sigma_0^2 is the hypothesized variance. The computed value is compared to critical values from the chi-square distribution with (n-1) degrees of freedom. If the test statistic exceeds the critical value, we reject the null hypothesis that the variance equals the specified value.\n\nThe t-test is used to compare a sample mean to a hypothesized population mean, or to compare the means of two samples. In surveying, t-tests can be used to check whether the mean of a set of repeated measurements differs significantly from a known reference value, or whether two different instruments produce significantly different results. The test statistic is t = (x_bar - mu_0) / (s / sqrt(n)), where x_bar is the sample mean, mu_0 is the hypothesized mean, s is the sample standard deviation, and n is the sample size. The t-distribution is similar to the normal distribution but with heavier tails, especially for small sample sizes. As the sample size increases, the t-distribution approaches the normal distribution.\n\nThe F-test is used to compare two sample variances to determine whether they come from populations with equal variances. In surveying, this test can determine whether two instruments or two measurement procedures produce results of similar precision. The test statistic is F = s1^2 / s2^2, where s1^2 and s2^2 are the two sample variances (with the larger variance in the numerator by convention). The computed F-value is compared to critical values from the F-distribution with (n1-1) and (n2-1) degrees of freedom.\n\nChoosing the correct test depends on the question being asked. Use the chi-square test when evaluating a single variance against a standard. Use the t-test when comparing means. Use the F-test when comparing two variances. The FS exam may present a scenario and ask which test is appropriate, so understanding the purpose and assumptions of each test is essential.\n\nAll three tests assume that the underlying data follow a normal distribution. For survey measurements, this assumption is generally valid because random measurement errors tend to be normally distributed according to the central limit theorem. However, the presence of systematic errors or blunders can violate this assumption and lead to incorrect conclusions.',
      },
      {
        id: 'fs-d7-hypothesis-s3',
        type: 'worked_example',
        title: 'Chi-Square Test for Verifying Survey Precision',
        workedExample: {
          problem: 'A total station is specified to have an angular accuracy of sigma_0 = 5 arc seconds (standard deviation). To verify this specification, a surveyor makes 20 independent angle measurements of a known reference angle. The sample standard deviation is computed as s = 6.8 arc seconds. At a significance level of alpha = 0.05, does the instrument meet its accuracy specification? Use a one-tailed chi-square test (testing whether the variance is larger than specified).',
          steps: [
            { step: 1, description: 'State the hypotheses:\n  H_0: sigma^2 = (5")^2 = 25 (sq arc sec) (instrument meets spec)\n  H_a: sigma^2 > 25 (sq arc sec) (instrument does not meet spec)\n  This is a one-tailed (upper tail) test.' },
            { step: 2, description: 'Compute the test statistic using chi^2 = (n-1) * s^2 / sigma_0^2', calculation: 'chi^2 = (20-1) * (6.8)^2 / (5)^2 = 19 * 46.24 / 25 = 878.56 / 25 = 35.14' },
            { step: 3, description: 'Determine the critical value from the chi-square table with (n-1) = 19 degrees of freedom at alpha = 0.05 (upper tail).', calculation: 'chi^2_critical (19 df, alpha=0.05) = 30.14' },
            { step: 4, description: 'Compare the test statistic to the critical value:\n  chi^2_computed = 35.14 > chi^2_critical = 30.14\n  Since the test statistic exceeds the critical value, we reject H_0.' },
          ],
          answer: 'At the 0.05 significance level, we reject the null hypothesis. The computed chi-square value (35.14) exceeds the critical value (30.14), providing statistically significant evidence that the instrument\'s angular precision is worse than the specified 5 arc seconds. The surveyor should consider recalibrating or replacing the instrument before using it for work requiring 5-arc-second precision.',
        },
      },
      {
        id: 'fs-d7-hypothesis-s4',
        type: 'concept',
        title: 'Linear Regression Analysis',
        content: 'Linear regression is a statistical method for modeling the relationship between two variables by fitting a straight line to observed data. In surveying and related fields, linear regression is used for tasks such as analyzing the relationship between temperature and rod length (for thermal expansion correction), fitting a trend line to settlement monitoring data, or establishing a calibration curve for an instrument.\n\nSimple linear regression fits a model of the form y = a + bx, where y is the dependent variable, x is the independent variable, a is the y-intercept, and b is the slope. The "best fit" line is determined by the least squares criterion: the line that minimizes the sum of the squares of the vertical deviations between the observed y-values and the predicted y-values. This is a specific application of the general least squares principle discussed in the previous reading.\n\nThe slope b represents the rate of change of y with respect to x. A positive slope indicates that y increases as x increases; a negative slope indicates that y decreases as x increases. The y-intercept a represents the predicted value of y when x equals zero. In practical applications, the intercept may or may not have a meaningful physical interpretation depending on whether x = 0 falls within the range of the observed data.\n\nThe correlation coefficient r measures the strength and direction of the linear relationship between x and y. It ranges from -1 to +1. A value of r = +1 indicates a perfect positive linear relationship, r = -1 indicates a perfect negative linear relationship, and r = 0 indicates no linear relationship. In surveying applications, r values above 0.9 (or below -0.9) generally indicate a strong linear relationship.\n\nThe coefficient of determination R^2 (r squared) represents the proportion of the total variance in y that is explained by the linear relationship with x. For example, an R^2 of 0.85 means that 85% of the variability in y can be explained by its linear relationship with x, while the remaining 15% is due to other factors or random variation. R^2 ranges from 0 to 1, with higher values indicating a better fit. On the FS exam, you should be prepared to interpret R^2 values in the context of a given problem.',
      },
      {
        id: 'fs-d7-hypothesis-s5',
        type: 'formula',
        title: 'Linear Regression Slope Formula',
        formula: {
          expression: 'b = [n * sum(x_i * y_i) - sum(x_i) * sum(y_i)] / [n * sum(x_i^2) - (sum(x_i))^2]',
          variables: [
            { symbol: 'b', description: 'Slope of the regression line (rate of change of y with respect to x)' },
            { symbol: 'n', description: 'Number of data points (observations)' },
            { symbol: 'sum(x_i * y_i)', description: 'Sum of the products of corresponding x and y values' },
            { symbol: 'sum(x_i)', description: 'Sum of all x values' },
            { symbol: 'sum(y_i)', description: 'Sum of all y values' },
            { symbol: 'sum(x_i^2)', description: 'Sum of the squares of x values' },
          ],
          whenToUse: 'Use this formula to compute the slope of the best-fit line through a set of paired data points (x, y). The intercept is then computed as a = y_bar - b * x_bar, where y_bar and x_bar are the means of y and x. Apply linear regression when you need to model a linear trend in survey data, establish a calibration relationship, or predict values based on observed trends.',
        },
      },
      {
        id: 'fs-d7-hypothesis-s6',
        type: 'knowledge_check',
        title: 'Interpreting R-Squared',
        knowledgeCheck: {
          question: 'A surveyor performs a linear regression analysis between observed settlement (y) and time (x) for a monitoring project. The computed coefficient of determination is R^2 = 0.92. What is the correct interpretation of this value?',
          options: [
            'The correlation between settlement and time is 0.92',
            '92% of the variance in the observed settlement data is explained by its linear relationship with time',
            'The settlement predictions will be 92% accurate',
            'There is a 92% probability that the regression model is correct',
          ],
          correctIndex: 1,
          explanation: 'The coefficient of determination R^2 represents the proportion of the total variance in the dependent variable (settlement) that is explained by the linear relationship with the independent variable (time). An R^2 of 0.92 means that 92% of the variability in the settlement data can be accounted for by the linear trend with time. Option A is incorrect because the correlation coefficient r would be sqrt(0.92) = 0.96, not 0.92. Option C is incorrect because R^2 does not directly translate to prediction accuracy in percentage terms. Option D is incorrect because R^2 is not a probability statement about the model being correct; it is a measure of how well the model fits the observed data.',
        },
      },
      {
        id: 'fs-d7-hypothesis-s7',
        type: 'concept',
        title: 'Normal Distribution in Surveying',
        content: 'The normal (Gaussian) distribution is the foundation of error theory in surveying. It describes how random measurement errors are distributed when a large number of independent, small sources of error combine. Understanding the properties of the normal distribution is essential for interpreting survey measurements, computing probabilities, and applying the statistical tests discussed earlier in this reading.\n\nThe normal distribution is a symmetric, bell-shaped curve characterized by two parameters: the mean (mu) and the standard deviation (sigma). The mean defines the center of the distribution (the most probable value), and the standard deviation defines its spread. Approximately 68.3% of the values fall within one standard deviation of the mean, 95.4% fall within two standard deviations, and 99.7% fall within three standard deviations. This is known as the 68-95-99.7 rule (or the empirical rule) and is frequently tested on the FS exam.\n\nIn surveying, the mean of repeated measurements is our best estimate of the true value, and the standard deviation characterizes the precision of the measurements. If a surveyor measures a distance 30 times and computes a mean of 325.432 m with a standard deviation of 0.008 m, the 68-95-99.7 rule tells us that approximately 68% of individual measurements would fall between 325.424 m and 325.440 m, 95% would fall between 325.416 m and 325.448 m, and 99.7% would fall between 325.408 m and 325.456 m.\n\nThe standard normal distribution is a normal distribution with mean = 0 and standard deviation = 1. Any normal distribution can be converted to the standard normal by computing the z-score: z = (x - mu) / sigma. The z-score tells you how many standard deviations a particular value is from the mean. Z-scores are used with standard normal tables to find probabilities. For example, a z-score of 1.96 corresponds to the 97.5th percentile, meaning 97.5% of values fall below z = 1.96. This is why the factor 1.96 appears so frequently in 95% confidence interval calculations (the interval extends 1.96 standard deviations on each side of the mean).\n\nThe standard deviation of the mean (also called the standard error of the mean) is sigma_mean = sigma / sqrt(n), where n is the number of measurements. This tells us that the precision of the mean improves with more measurements, but the improvement diminishes: quadrupling the number of measurements only halves the standard error. This relationship is important for planning surveys and determining how many repeated measurements are needed to achieve a desired precision.\n\nFor the FS exam, be comfortable applying the 68-95-99.7 rule, computing z-scores, and understanding the relationship between the standard deviation of individual measurements and the standard deviation of the mean. Know that the assumption of normally distributed errors underlies most statistical tests and error analysis methods used in surveying.',
      },
      {
        id: 'fs-d7-hypothesis-s8',
        type: 'further_reading',
        title: 'Further Reading',
        furtherReading: [
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic I, Chapters 11-12 (Statistics of Measurements, Calculus)', topic: 'Statistical analysis methods, probability distributions, hypothesis testing, and regression analysis' },
          { book: 'Elementary Surveying (ES)', chapter: 'Chapter 2', topic: 'Theory of errors, normal distribution, measures of precision, and statistical analysis of survey data' },
        ],
      },
    ],
  },
  {
    id: 'fs-d7-errorprop',
    examTrack: 'fs',
    domainNumber: 7,
    domain: 'Applied Mathematics & Statistics',
    title: 'Error Propagation & Positional Accuracy',
    description: 'Master the principles of error propagation through mathematical operations, understand how measurement uncertainties combine to affect final results, and learn the positional accuracy standards used in professional surveying. This reading covers error types, the general law of propagation of errors, error propagation for common survey computations, FGDC and ALTA/NSPS accuracy standards, and methods for blunder detection. These topics are tested on the FS exam under Applied Mathematics & Statistics.',
    estimatedMinutes: 22,
    sections: [
      {
        id: 'fs-d7-errorprop-s1',
        type: 'concept',
        title: 'Error Types Revisited',
        content: 'Before diving into error propagation, it is essential to have a firm understanding of the three fundamental types of errors that affect survey measurements: random errors, systematic errors, and blunders (gross errors). Each type behaves differently and requires a different approach for handling. Error propagation theory deals primarily with random errors, but a professional surveyor must be able to identify and manage all three types.\n\nRandom errors are the small, unpredictable variations that remain after all known error sources have been eliminated or corrected. They follow a normal (Gaussian) distribution, are equally likely to be positive or negative, and tend to partially cancel when many observations are combined. Random errors cannot be eliminated, but their effect can be reduced by taking more measurements and applying statistical methods. The standard deviation is the primary measure of random error magnitude. Examples include small variations in pointing to a target, reading a leveling rod, or centering an instrument.\n\nSystematic errors follow a consistent pattern or trend and do not cancel with repeated measurements. They affect all observations in the same direction (or in a predictable pattern) and must be eliminated through proper field procedures, calibration, or mathematical corrections applied during data processing. Examples include an uncorrected temperature effect on a steel tape, index error in a level, atmospheric refraction, and Earth curvature. Unlike random errors, systematic errors can theoretically be completely eliminated if their source is identified and the correct correction is applied.\n\nBlunders (gross errors) are mistakes caused by human carelessness, equipment malfunction, or procedural failures. They are typically much larger than random or systematic errors and do not follow any predictable distribution. Examples include reading a rod incorrectly (transposing digits), setting up on the wrong point, misidentifying a benchmark, or recording data in the wrong field. Blunders must be detected and eliminated before any statistical analysis or adjustment is performed, because their presence violates the assumptions underlying error propagation theory and least squares adjustment.\n\nThe distinction between precision and accuracy is closely related to error types. Precision refers to the closeness of repeated measurements to each other and is affected primarily by random errors. A precise instrument produces measurements with a small standard deviation. Accuracy refers to the closeness of measurements to the true (correct) value and is affected by both random and systematic errors. An instrument can be precise but inaccurate if systematic errors are present. For example, a total station with a consistent angular bias of 10 arc seconds will produce very repeatable (precise) measurements that are all shifted by the same amount from the true value (inaccurate).\n\nFor the FS exam, understand that error propagation formulas apply only to random errors. Systematic errors must be corrected before propagation analysis, and blunders must be detected and removed. The quality of any error propagation analysis depends on the assumption that only random errors remain in the data.',
      },
      {
        id: 'fs-d7-errorprop-s2',
        type: 'concept',
        title: 'Error Propagation for Sums, Differences, Products, and Functions',
        content: 'When survey measurements are combined through mathematical operations to compute derived quantities (such as coordinates, areas, or volumes), the uncertainties in the individual measurements propagate through those operations to produce uncertainty in the final result. The general law of propagation of errors (also called the propagation of variances) provides the mathematical framework for computing how errors combine.\n\nThe general law of propagation of variances states that if a quantity z is a function of independent measured quantities a, b, c, etc., written as z = f(a, b, c, ...), then the variance of z is: sigma_z^2 = (partial f/partial a)^2 * sigma_a^2 + (partial f/partial b)^2 * sigma_b^2 + (partial f/partial c)^2 * sigma_c^2 + ... This formula assumes that the measurement errors are independent (uncorrelated). If correlations exist, additional covariance terms must be included.\n\nFor addition and subtraction, the formula simplifies significantly. If z = a + b or z = a - b, then sigma_z^2 = sigma_a^2 + sigma_b^2. Note that the variances always add, regardless of whether the quantities are being added or subtracted. This is a key point that sometimes surprises students: subtracting two measurements does not reduce the error; it combines them in exactly the same way as addition. This has important practical implications. For example, the error in an elevation difference (computed by subtracting two rod readings) depends on the errors in both rod readings.\n\nFor multiplication and division, the relative (percentage) errors combine. If z = a * b, then (sigma_z / z)^2 = (sigma_a / a)^2 + (sigma_b / b)^2. The same formula applies to division. This tells us that when multiplying or dividing measurements, we work with relative errors rather than absolute errors.\n\nFor a quantity raised to a power, if z = a^n, then sigma_z / z = n * (sigma_a / a). The relative error is multiplied by the exponent. For example, if a side of a square has a relative error of 1%, the area (side squared) has a relative error of 2%.\n\nThese propagation formulas are used extensively in surveying to predict the expected precision of computed quantities based on the known precisions of the field measurements. They help surveyors plan their work by determining what instrument precision is needed to achieve a specified accuracy in the final result, and they are used to evaluate whether completed work meets accuracy standards.',
      },
      {
        id: 'fs-d7-errorprop-s3',
        type: 'formula',
        title: 'Error Propagation for Sum or Difference',
        formula: {
          expression: 'sigma_z^2 = sigma_a^2 + sigma_b^2',
          variables: [
            { symbol: 'sigma_z', description: 'Standard deviation of the result z, where z = a + b or z = a - b' },
            { symbol: 'sigma_a', description: 'Standard deviation of measurement a' },
            { symbol: 'sigma_b', description: 'Standard deviation of measurement b' },
          ],
          whenToUse: 'Use when computing the propagated error for a quantity that is the sum or difference of two independent measurements. Common applications include: computing the error in an elevation difference from two rod readings, the error in a coordinate difference, or the total error when multiple error sources are combined. Remember that variances always add, whether the measurements are being added or subtracted.',
        },
      },
      {
        id: 'fs-d7-errorprop-s4',
        type: 'formula',
        title: 'Error Propagation for Products and Quotients',
        formula: {
          expression: 'sigma_z / z = sqrt((sigma_a / a)^2 + (sigma_b / b)^2)',
          variables: [
            { symbol: 'sigma_z / z', description: 'Relative (fractional) standard deviation of the result z, where z = a * b or z = a / b' },
            { symbol: 'sigma_a / a', description: 'Relative standard deviation of measurement a' },
            { symbol: 'sigma_b / b', description: 'Relative standard deviation of measurement b' },
          ],
          whenToUse: 'Use when computing the propagated relative error for a quantity that is the product or quotient of two independent measurements. Common applications include: computing the error in an area (length times width), the error in a volume, or the error in a computed distance that involves a multiplication or division. To obtain the absolute error sigma_z, multiply the relative error by the value of z.',
        },
      },
      {
        id: 'fs-d7-errorprop-s5',
        type: 'worked_example',
        title: 'Propagating Distance and Angle Errors Through a Traverse',
        workedExample: {
          problem: 'A surveyor measures a traverse leg with a horizontal distance of 250.000 m (standard deviation sigma_d = 0.010 m) and a deflection angle of 90 degrees 15 minutes 30 seconds (standard deviation sigma_alpha = 10 arc seconds). The coordinates of the beginning station are known. Compute the propagated standard deviations of the departure (delta-E) and latitude (delta-N) for this traverse leg. The azimuth from the previous leg to this station is 45 degrees 00 minutes 00 seconds.',
          steps: [
            { step: 1, description: 'Compute the azimuth of this leg. The previous azimuth is 45 degrees, and the deflection angle is 90 degrees 15 minutes 30 seconds to the right.\n  New azimuth = 45 + 90 15\' 30" = 135 degrees 15 minutes 30 seconds\n  Convert to decimal: 135.2583 degrees, or in radians: 2.3607 rad.', calculation: 'Azimuth = 135.2583 degrees' },
            { step: 2, description: 'Compute departure and latitude:\n  delta-E = D * sin(Az) = 250.000 * sin(135.2583) = 250.000 * 0.70502 = 176.255 m\n  delta-N = D * cos(Az) = 250.000 * cos(135.2583) = 250.000 * (-0.70919) = -177.297 m', calculation: 'delta-E = 176.255 m, delta-N = -177.297 m' },
            { step: 3, description: 'Apply error propagation. For delta-E = D * sin(Az):\n  sigma_E^2 = sin^2(Az) * sigma_d^2 + D^2 * cos^2(Az) * sigma_Az^2\n  First convert sigma_alpha to radians: 10" = 10 / 206265 = 0.0000485 rad', calculation: 'sigma_Az = 0.0000485 rad' },
            { step: 4, description: 'Compute sigma_E:\n  sigma_E^2 = (0.70502)^2 * (0.010)^2 + (250.000)^2 * (0.70919)^2 * (0.0000485)^2\n  = 0.49705 * 0.0001 + 62500 * 0.50295 * 0.000000002352\n  = 0.0000497 + 0.0000739\n  = 0.0001236', calculation: 'sigma_E = sqrt(0.0001236) = 0.0111 m' },
            { step: 5, description: 'Compute sigma_N similarly. For delta-N = D * cos(Az):\n  sigma_N^2 = cos^2(Az) * sigma_d^2 + D^2 * sin^2(Az) * sigma_Az^2\n  = (0.70919)^2 * (0.010)^2 + (250.000)^2 * (0.70502)^2 * (0.0000485)^2\n  = 0.50295 * 0.0001 + 62500 * 0.49705 * 0.000000002352\n  = 0.0000503 + 0.0000731\n  = 0.0001234', calculation: 'sigma_N = sqrt(0.0001234) = 0.0111 m' },
          ],
          answer: 'The propagated standard deviations are sigma_E = 0.011 m (11 mm) and sigma_N = 0.011 m (11 mm). Both distance and angle measurement errors contribute roughly equally to the coordinate uncertainties in this example, which is expected when the azimuth is near 135 degrees. The distance error contributes through the sine/cosine of the azimuth, while the angle error contributes through the distance multiplied by the cosine/sine of the azimuth. This analysis helps surveyors determine whether their instrument specifications are adequate for the required coordinate precision.',
        },
      },
      {
        id: 'fs-d7-errorprop-s6',
        type: 'concept',
        title: 'Positional Accuracy Standards',
        content: 'Positional accuracy standards define the required precision and accuracy for surveying work. Several standards are commonly referenced in professional practice and on the FS exam. Understanding these standards helps surveyors plan their work, select appropriate methods and equipment, and certify that completed work meets the required specifications.\n\nThe Federal Geographic Data Committee (FGDC) Geospatial Positioning Accuracy Standards (GPAS) provide a framework for reporting and classifying the accuracy of geospatial data. The FGDC standards use the concept of accuracy at the 95% confidence level. For horizontal positions, accuracy is reported as a circular error at 95% confidence, meaning that the true position has a 95% probability of falling within a circle of the stated radius centered on the reported position. For vertical positions, accuracy is reported as a linear error at 95% confidence.\n\nThe ALTA/NSPS (American Land Title Association / National Society of Professional Surveyors) Minimum Standard Detail Requirements for ALTA/NSPS Land Title Surveys specify accuracy requirements for boundary surveys used in real estate transactions. The current standard requires a Relative Positional Precision (RPP) of 2 cm (0.07 feet) or better at the 95% confidence level. This means that the relative positional accuracy between any two points on the survey, computed from the survey measurements alone, must be 2 cm or better. This is a very stringent requirement that demands high-quality instrumentation and procedures.\n\nPositional tolerance defines the maximum allowable positional error for a survey. It is usually expressed as a radius at a specified confidence level. For example, a specification might state that all boundary corners must be located to within 0.05 feet at 95% confidence. The surveyor must then plan the survey to ensure that the propagated errors in the final coordinates do not exceed this tolerance.\n\nRelative accuracy refers to the positional accuracy between points within a survey, determined solely from the survey measurements. Absolute accuracy (or network accuracy) refers to the positional accuracy of points relative to the geodetic reference frame (such as NAD 83). Relative accuracy is typically better than absolute accuracy because it is not affected by errors in the control points to which the survey is tied. The ALTA/NSPS standard uses relative accuracy (RPP) because boundary surveys are primarily concerned with the spatial relationships between property corners.\n\nCircular Error Probable (CEP) is a measure of horizontal positional accuracy defined as the radius of a circle centered on the true position that contains 50% of the position estimates. While CEP is widely used in military and navigation applications, surveying standards more commonly use the 95% confidence level. The relationship between CEP and 95% confidence depends on the error distribution, but for a circular normal distribution, the 95% circle radius is approximately 2.146 times the CEP.',
      },
      {
        id: 'fs-d7-errorprop-s7',
        type: 'concept',
        title: 'Quantitative Reasoning and Blunder Detection',
        content: 'Blunder detection is a critical component of quality assurance in surveying. Because blunders (gross errors) are large mistakes that violate the assumptions of normal error distribution, they must be identified and removed before any meaningful statistical analysis or adjustment can be performed. Several systematic methods exist for detecting blunders, and the FS exam tests your understanding of these approaches.\n\nData validation is the first line of defense against blunders. This involves checking field data for internal consistency before proceeding with computations. Simple checks include verifying that backsight and foresight readings are within expected ranges, ensuring that angle closures are within tolerance, confirming that distance measurements are reasonable for the terrain, and checking that coordinate computations produce results in the expected geographic area. Many modern data collectors and field software perform automated data validation checks.\n\nRedundancy is the most powerful tool for blunder detection. By collecting more observations than the minimum required, the surveyor creates multiple ways to compute the same quantity. If one observation contains a blunder, it will produce a result that is inconsistent with the other observations. For example, in a closed traverse, the sum of the interior angles should equal (n-2) * 180 degrees. If the angular misclosure is much larger than expected from random errors alone, a blunder in one of the angle observations is likely. Similarly, a leveling circuit that closes back to the starting benchmark provides a check: the sum of all elevation differences should be zero (or very close to zero).\n\nStatistical outlier tests provide a formal framework for identifying observations that are inconsistent with the rest of the data. The most common approach is the data snooping method (also called the Baarda method), which examines the standardized residuals from a least squares adjustment. A standardized residual is the residual divided by its estimated standard deviation. If any standardized residual exceeds a critical threshold (typically 3.29 for a 99.9% confidence level), the corresponding observation is flagged as a potential blunder. The suspected observation can then be investigated, remeasured, or removed.\n\nIndependent checks involve using completely separate measurements or methods to verify results. For example, measuring a baseline with both a total station and GNSS provides an independent check on the distance. Closing a traverse on a second known control point verifies the traverse geometry. Comparing a GNSS-derived elevation with a spirit-leveled elevation (after applying appropriate corrections) checks both measurement systems. Independent checks are particularly valuable because they can detect systematic errors and blunders that might not be apparent from internal consistency checks alone.\n\nThe concept of maximum allowable misclosure provides a practical blunder detection criterion. If the misclosure of a traverse, level circuit, or other redundant measurement exceeds the maximum allowable value (computed from the expected random errors in the measurements), a blunder is suspected. The maximum allowable misclosure is typically set at 3 times the expected random error (corresponding to approximately 99.7% confidence under the normal distribution), though some specifications use different multipliers.',
      },
      {
        id: 'fs-d7-errorprop-s8',
        type: 'knowledge_check',
        title: 'Computing Propagated Error',
        knowledgeCheck: {
          question: 'A surveyor measures two distances to compute an elevation difference: a slope distance of 500.000 m with a standard deviation of 0.015 m and a zenith angle of 85 degrees with a standard deviation of 15 arc seconds. The elevation difference is computed as delta-h = D * cos(zenith). Using error propagation, which component contributes MORE to the uncertainty in the elevation difference?',
          options: [
            'The distance measurement error, because the distance is a large number',
            'The zenith angle error, because angular errors are amplified by the distance',
            'Both contribute equally because the formula treats them symmetrically',
            'Neither contributes significantly because the zenith angle is close to 90 degrees',
          ],
          correctIndex: 1,
          explanation: 'For delta-h = D * cos(z), the propagated variance is: sigma_h^2 = cos^2(z) * sigma_D^2 + D^2 * sin^2(z) * sigma_z^2. At z = 85 degrees, cos(85) = 0.0872 and sin(85) = 0.9962. The distance contribution is (0.0872)^2 * (0.015)^2 = 0.0000000171 m^2. The angle contribution is (500)^2 * (0.9962)^2 * (15/206265)^2 = 250000 * 0.9924 * 0.000000005293 = 0.001313 m^2. The angle contribution (0.001313) is vastly larger than the distance contribution (0.0000000171). This is because the angular error is multiplied by D * sin(z), which amplifies small angular uncertainties into significant positional uncertainties at long distances. This result illustrates why angular precision is often the limiting factor in trigonometric height determination, especially at steep zenith angles where sin(z) is large.',
        },
      },
      {
        id: 'fs-d7-errorprop-s9',
        type: 'further_reading',
        title: 'Further Reading',
        furtherReading: [
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic I, Chapters 11-12 (Statistics of Measurements, Calculus)', topic: 'Error propagation theory, general law of propagation of variances, and accuracy standards' },
          { book: 'Elementary Surveying (ES)', chapter: 'Chapter 3', topic: 'Theory of errors and error propagation with worked examples for surveying measurements' },
        ],
      },
    ],
  },
];
