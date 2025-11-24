// Practical word problems for each lesson - real surveying scenarios
// Each problem ties theory to practical application

export const practicalProblems = [
  // DOMAIN 0: Math Foundations (10 lessons)
  "A surveyor calculates a distance using coordinates. First multiply horizontal distances (8 × 2), then add vertical distances (12 + 16 = 28). What is the correct order?",
  "A property line is measured in fractions: 3/4 of a mile + 1/2 mile. Convert to decimals and find total distance in miles.",
  "A road grade on a construction site is 5%. If the horizontal distance is 100 feet, how much does the road rise?",
  "Calculate the diagonal distance across a rectangular parcel: sides are 5 units and 12 units. Use the Pythagorean theorem.",
  "A surveyor measures an angle as 30.5 degrees. Convert to degrees and minutes for field note entry.",
  "A building lot is rectangular with sides 20m and 15m. Calculate the perimeter to estimate fencing needed.",
  "Two property corners have coordinates (0, 0) and (6, 8). Using the distance formula with square roots, find the distance.",
  "When entering measurements into the total station, use proper order: parentheses first, then multiplication. Calculate: (15 - 3) ÷ 4",
  "A surveyor's measurement has 5 significant figures: 345.67 feet. Report this with proper precision in calculations.",
  "A slope rises 2 feet per 100 feet horizontal. Express this as a percentage grade for design documents.",

  // DOMAIN 1: Surveying Processes and Methods (7 lessons)
  "Set up a total station over a benchmark: level the circular bubble first, then measure to a backsight monument 200 feet away.",
  "In differential leveling: backsight = 1.50m on BM at elevation 100.00m. Calculate HI, then foresight = 2.30m to next point.",
  "A 5-sided lot boundary requires interior angles summing to how many degrees for error checking?",
  "Establish horizontal control for a construction site. Reference point A is at coordinates (1000, 1000). Measure angles and distances to corners B, C, D.",
  "Field notes document a survey: note weather (rain risk?), crew members (3 surveyors), equipment (total station + GPS), time (4 hours).",
  "Use GPS static method for 2-hour occupation of control point to get high accuracy. Compare to RTK results from 2-minute occupation.",
  "Drone photogrammetry captures 200 images of a 50-acre parcel. Process to create 2-foot contour lines and orthophoto.",

  // DOMAIN 2: Distance Measurement and Reduction (6 lessons)
  "Measure slope distance 105.48 feet at angle 5 degrees above horizontal. Calculate horizontal distance.",
  "Tape distance from A to B = 150.00 feet at 68°F, standard = 50°F. Temperature correction = -0.0000077 per foot per °F.",
  "Measure EDM distance 523.456 meters. Prism constant = +30mm. What is corrected distance?",
  "Stadia rod reading: upper crosshair = 5.50, lower = 2.50, interval factor = 100. Calculate distance.",
  "Horizontal distance 500 feet at elevation 5,000 feet. What is sea level distance correction?",
  "Measure 5 tape lengths across ravine. Resolve systematic errors by averaging forward and backward measurements.",

  // DOMAIN 3: Traverse Computations (5 lessons)  
  "Traverse bearing N 45° E, distance 200 feet. Calculate latitude (north) and departure (east) components.",
  "Sum of measured angles in 6-sided traverse = 717°. Error = 717 - 720 = -3°. Distribute -0.5° correction per angle.",
  "Adjust traverse using compass rule. Total closure error = 2 feet in 5000-foot traverse. Distribute proportionally to each side.",
  "Calculate coordinates: Point A = (1000, 1000), bearing N 30° E, distance 100 feet to Point B.",
  "Final coordinates don't close by 0.15 feet in northing. Adjust each traverse point's latitude proportionally.",

  // DOMAIN 4: Area and Volume Calculations (4 lessons)
  "Irregular parcel with coordinates: (0,0), (100,0), (100,50), (50,80), (0,60). Use coordinate method for area.",
  "Cut and fill earthwork: cut area = 5,000 sq ft at 2 ft depth. Fill area = 3,000 sq ft at 1.5 ft depth. Calculate volumes.",
  "Calculate parking lot volume: 10,000 sq ft area, average fill depth 0.5 feet. Convert to cubic yards for material estimate.",
  "Land parcel = 2.5 acres. Surveyor must subdivide into 0.5-acre lots. How many lots can be created?",

  // DOMAIN 5: Horizontal Curves (3 lessons)
  "Road curve: radius 500 feet, delta angle = 30°. Calculate arc length and tangent length for construction staking.",
  "Spiral curve transition: design speed 50 mph. Calculate minimum spiral length using V³/(12*R) formula.",
  "PC (point of curve) at station 10+00. Arc length 314.16 feet. Find PT (point of tangent) station.",

  // DOMAIN 6: Vertical Curves (2 lessons)
  "Sag vertical curve: incoming grade +2%, outgoing grade -1.5%, length 400 feet. Calculate elevation at middle of curve.",
  "Crest vertical curve elevation at station 15+00. Low point elevation = 152.50 feet. Design for 100 mph sight distance.",

  // DOMAIN 7: Coordinate Systems and Map Projections (5 lessons)
  "Convert UTM coordinates to lat/long for mapping. UTM Zone 10: 545,000m E, 4,500,000m N.",
  "State Plane Coordinates NAD 83: 2,000,000 ft N, 1,000,000 ft E. Convert to latitude/longitude for Google Earth.",
  "Combine surveys from multiple UTM zones. Apply datum transformation between NAD 27 and NAD 83.",
  "Local coordinate system: baseline runs N-S through parcel center. Convert property lines to local grid for calculations.",
  "Geoid separation at site = 33.5 feet. Ellipsoid height 200 feet. Calculate orthometric (elevation) height.",

  // DOMAIN 3: Boundary Law and PLSS (7 lessons)
  "PLSS section T2N R3E Sec 18. Describe parcel in quarter-sections: NE 1/4 of NW 1/4 = 40 acres.",
  "Lot 5, Block A, Oakwood Subdivision. Verify legal description matches recorded plat against survey measurements.",
  "Chain of title shows 5 deeds. Find conflicting boundary descriptions. Survey determines true line.",
  "Adverse possession claim: family occupied area 7 years. Must be continuous, open, notorious, and hostile to owner.",
  "Encroachment survey: neighbor's fence 2 feet over property line. Calculate area of encroachment and recommend resolution.",
  "Partition of 20-acre parcel between 3 heirs. Divide equally by value, accounting for road frontage and utilities.",
  "Riparian rights: creek boundary changes after flood. Re-survey to determine new property lines and water rights.",

  // DOMAIN 5: Survey Computations & Applications (6 lessons)
  "Inverse problem: Point A = (100, 200), Point B = (300, 500). Calculate distance and bearing from A to B.",
  "Radiation method: setup at control point, measure distance and angle to 8 boundary corners. Calculate all coordinates.",
  "Resection: three shots to known points. Calculate instrument position using three-point problem (varies with method).",
  "Least squares adjustment: 6 redundant measurements of property line. Weight measurements by accuracy, solve for best-fit line.",
  "Intersection method: two instrument setups, measure angles to unknown corner. Calculate corner coordinates.",
  "Arc-to-chord: measure arc length 150 feet on curve, radius 300 feet. Calculate straight-line chord distance.",

  // DOMAIN 6: Professional Practice and Ethics (4 lessons)
  "PE license renewal: 20 CPD hours in last renewal period. Track 4 surveying courses = 16 hours + 2 seminars = 20 hours. Compliant.",
  "Conflict of interest: surveyor hired by developer for boundary survey on contested land. Disclose to all parties. Maintain objectivity.",
  "Retracement survey: original survey 1950, monument destroyed 2020. Search records, physical evidence, witness testimony to re-establish.",
  "Expert witness testimony: survey shows encroachment. Prepare clear report with measurements, calculations, and conclusions for court.",

  // DOMAIN 7: Applied Mathematics & Statistics (4 lessons)
  "Measure same distance 10 times: 100.02, 100.01, 99.99, 100.03, 100.00, 99.98, 100.01, 100.02, 99.99, 100.01 feet. Calculate mean, SD, confidence interval.",
  "Estimate position accuracy: 68% of errors within ±0.10 feet. What's the standard deviation?",
  "Chi-square test: Compare observed vs expected distribution of survey measurement errors. Is instrument systematic error present?",
  "Regression analysis: relate building elevation to distance from river across 50 properties. Predict elevation for property 0.5 miles from river.",
];
