import type { ReadingModule } from '../schema';

export const STUDY_READINGS_D4D6: ReadingModule[] = [
  {
    id: 'fs-d4-mapping',
    examTrack: 'fs',
    domainNumber: 4,
    domain: 'Mapping, GIS, and CAD',
    title: 'Mapping, Photogrammetry & GIS Essentials',
    description: 'Understand fundamental mapping concepts including map scales and types, contour line interpretation, photogrammetry principles for aerial photography, relief displacement, and GIS data models. These topics form the core of FS Domain 4 and appear regularly on the exam.',
    estimatedMinutes: 20,
    sections: [
      {
        id: 'fs-d4-mapping-s1',
        type: 'concept',
        title: 'Map Scales and Map Types',
        content: 'Maps are scaled representations of the earth\'s surface, and understanding scale is critical to extracting meaningful measurements from them. Scale is the ratio between a distance on the map and the corresponding distance on the ground.\n\nThere are three common ways to express scale:\n\nVerbal Scale: A statement such as "one inch equals 2,000 feet." This is intuitive but limited to the stated units.\n\nGraphic Scale: A printed bar on the map that visually shows distances. Graphic scales remain correct even when a map is enlarged or reduced.\n\nRepresentative Fraction (RF): A dimensionless ratio such as 1:24,000, meaning one unit on the map equals 24,000 of the same unit on the ground. The RF is universally applicable regardless of unit system.\n\nA large-scale map (e.g., 1:1,200) covers a small area with high detail, while a small-scale map (e.g., 1:250,000) covers a large area with less detail. The terms "large" and "small" refer to the size of the fraction: 1/1,200 is a larger number than 1/250,000.\n\nThree principal map types are relevant to surveyors:\n\nPlanimetric Maps: Show the horizontal positions of features such as roads, buildings, and water bodies without depicting elevation or relief. They are useful for showing spatial relationships in plan view.\n\nTopographic Maps: Include both planimetric features and terrain relief, typically represented by contour lines. USGS topographic quadrangles at 1:24,000 are among the most widely used maps in the United States.\n\nCadastral Maps: Depict property boundaries, parcel numbers, and ownership information. County plat maps and tax maps are common examples. These maps are essential for boundary surveying and land records research.',
      },
      {
        id: 'fs-d4-mapping-s2',
        type: 'concept',
        title: 'Contour Lines and Terrain Representation',
        content: 'Contour lines are the primary method for representing three-dimensional terrain on a two-dimensional map. Each contour line connects points of equal elevation above a reference datum.\n\nKey characteristics of contour lines:\n\n1. Contour lines never cross one another (except in the rare case of an overhanging cliff, which is uncommon on standard maps).\n\n2. Contour lines always close upon themselves, though the closure may occur beyond the map boundary.\n\n3. Closely spaced contour lines indicate steep terrain; widely spaced contour lines indicate gentle slopes.\n\n4. Contour lines that form V-shapes pointing uphill indicate valleys or stream channels. V-shapes pointing downhill indicate ridges.\n\n5. Contour lines are perpendicular to the direction of steepest slope at any point.\n\nThe contour interval is the vertical distance between successive contour lines. Common intervals include 5 ft, 10 ft, 20 ft, and 40 ft, depending on the map scale and terrain.\n\nIndex contours are heavier lines drawn at every fourth or fifth contour interval and are labeled with their elevation value, making it easy to determine elevations across the map.\n\nContour interpolation involves estimating the position of a contour line between two known elevation points by assuming a uniform slope between them. For example, if point A has an elevation of 342 ft and point B has an elevation of 358 ft, and they are 200 ft apart horizontally, the 350 ft contour line would be located at (350 - 342) / (358 - 342) * 200 = 100 ft from point A.',
      },
      {
        id: 'fs-d4-mapping-s3',
        type: 'formula',
        title: 'Map Scale and Representative Fraction',
        formula: {
          expression: 'Map Scale = Map Distance / Ground Distance; RF = 1 / Scale Factor',
          variables: [
            { symbol: 'Map Distance', description: 'The measured distance on the map in any linear unit' },
            { symbol: 'Ground Distance', description: 'The actual horizontal distance on the earth\'s surface in the same unit as Map Distance' },
            { symbol: 'RF', description: 'Representative Fraction expressed as 1:n where n is the scale factor' },
            { symbol: 'Scale Factor', description: 'The denominator of the representative fraction indicating how many ground units equal one map unit' },
          ],
          whenToUse: 'Use the map scale relationship whenever you need to convert between map measurements and real-world ground distances. To find ground distance, multiply the map distance by the scale factor. To find map distance, divide the ground distance by the scale factor.',
        },
      },
      {
        id: 'fs-d4-mapping-s4',
        type: 'worked_example',
        title: 'Calculating Ground Distance from a Map Measurement',
        workedExample: {
          problem: 'On a topographic map with a scale of 1:24,000, you measure a distance of 3.25 inches between two road intersections. What is the actual ground distance in feet?',
          steps: [
            { step: 1, description: 'Write down the scale relationship.', calculation: 'Scale = 1:24,000, meaning 1 inch on the map equals 24,000 inches on the ground.' },
            { step: 2, description: 'Multiply the map distance by the scale factor to get ground distance in inches.', calculation: 'Ground Distance = 3.25 inches * 24,000 = 78,000 inches' },
            { step: 3, description: 'Convert inches to feet by dividing by 12.', calculation: 'Ground Distance = 78,000 / 12 = 6,500 feet' },
          ],
          answer: 'The actual ground distance between the two road intersections is 6,500 feet (approximately 1.23 miles).',
        },
      },
      {
        id: 'fs-d4-mapping-s5',
        type: 'knowledge_check',
        title: 'Map Scale Knowledge Check',
        knowledgeCheck: {
          question: 'A map has a representative fraction of 1:10,000. If two features are 4.0 cm apart on the map, what is the actual ground distance between them?',
          options: [
            '40 meters',
            '400 meters',
            '4,000 meters',
            '4 meters',
          ],
          correctIndex: 1,
          explanation: 'With an RF of 1:10,000, each centimeter on the map represents 10,000 centimeters on the ground. So 4.0 cm on the map equals 4.0 * 10,000 = 40,000 cm = 400 meters on the ground. Remember to apply the scale factor and then convert units as needed.',
        },
      },
      {
        id: 'fs-d4-mapping-s6',
        type: 'concept',
        title: 'Photogrammetry Fundamentals',
        content: 'Photogrammetry is the science of obtaining reliable measurements and spatial information from photographs, primarily aerial photographs taken from aircraft or drones. It is a fundamental tool for producing topographic maps, orthophotos, and digital elevation models.\n\nAerial photographs are taken with specialized metric cameras that have precisely calibrated focal lengths and minimal lens distortion. The camera is mounted in the aircraft pointing vertically downward (for vertical aerial photos) and exposes successive overlapping frames as the aircraft flies along a planned flight line.\n\nEndlap (forward overlap) is the overlap between consecutive photos along a flight line, typically 60 percent. This overlap is essential for stereoscopic viewing, which allows the viewer to perceive three-dimensional depth by viewing two overlapping photos simultaneously through a stereoscope.\n\nSidelap is the overlap between adjacent flight lines, typically 25 to 30 percent, ensuring complete ground coverage without gaps.\n\nThe principal point of a photograph is the geometric center of the image, defined as the intersection of lines connecting opposite fiducial marks (reference marks on the camera frame). The nadir point is the point on the ground directly below the camera at the moment of exposure.\n\nFor a truly vertical photograph over flat terrain, the principal point and nadir point coincide, and the scale is uniform across the entire photo. In practice, slight aircraft tilt and terrain relief cause scale variations across the photograph.\n\nGround control points (GCPs) are surveyed points with known coordinates that are identifiable on the photographs. GCPs are essential for orienting the photogrammetric model and producing accurately georeferenced products.',
      },
      {
        id: 'fs-d4-mapping-s7',
        type: 'formula',
        title: 'Photo Scale Formula',
        formula: {
          expression: 'Photo Scale = f / (H - h)',
          variables: [
            { symbol: 'f', description: 'Focal length of the camera lens (typically in mm or inches)' },
            { symbol: 'H', description: 'Flying height of the aircraft above the datum (in the same units as h)' },
            { symbol: 'h', description: 'Elevation of the terrain above the datum (in the same units as H)' },
            { symbol: 'H - h', description: 'The height of the camera above the terrain, sometimes written as H\' (flying height above ground level)' },
          ],
          whenToUse: 'Use this formula to calculate the scale of a vertical aerial photograph at a specific terrain elevation. Because terrain elevation varies, the photo scale also varies across the photograph. For flat terrain, the scale is approximately uniform. This formula is critical for determining what ground area each photo covers and for computing flying heights needed for a desired photo scale.',
        },
      },
      {
        id: 'fs-d4-mapping-s8',
        type: 'formula',
        title: 'Relief Displacement Formula',
        formula: {
          expression: 'd = r * h / H',
          variables: [
            { symbol: 'd', description: 'Relief displacement on the photograph, the radial shift of an object\'s image from its true planimetric position (in photo units)' },
            { symbol: 'r', description: 'Radial distance from the principal point (center) of the photograph to the displaced image of the top of the object (in photo units)' },
            { symbol: 'h', description: 'Height of the object above the surrounding terrain (in ground units)' },
            { symbol: 'H', description: 'Flying height of the camera above the base of the object (in the same ground units as h)' },
          ],
          whenToUse: 'Use this formula to calculate how far an object\'s image is displaced radially outward from its true plan position due to its height above the ground. Relief displacement increases with object height and with radial distance from the photo center. Objects at the principal point (r = 0) show no displacement. This concept is fundamental to understanding why orthophotos must be corrected for terrain relief.',
        },
      },
      {
        id: 'fs-d4-mapping-s9',
        type: 'worked_example',
        title: 'Determining Flying Height for a Desired Photo Scale',
        workedExample: {
          problem: 'A surveyor needs vertical aerial photographs at a scale of 1:6,000 over terrain with an average elevation of 800 ft above mean sea level. The camera has a focal length of 6 inches (0.50 ft). What flying height above mean sea level is required?',
          steps: [
            { step: 1, description: 'Write the photo scale formula and rearrange to solve for H.', calculation: 'Photo Scale = f / (H - h), so (H - h) = f / Photo Scale' },
            { step: 2, description: 'Substitute the known values. The photo scale as a fraction is 1/6,000.', calculation: 'H - h = 0.50 ft / (1/6,000) = 0.50 * 6,000 = 3,000 ft' },
            { step: 3, description: 'Solve for H by adding the terrain elevation h.', calculation: 'H = 3,000 + 800 = 3,800 ft above MSL' },
          ],
          answer: 'The aircraft must fly at 3,800 ft above mean sea level to produce photographs at a scale of 1:6,000 over terrain at 800 ft elevation. The camera would be 3,000 ft above ground level.',
        },
      },
      {
        id: 'fs-d4-mapping-s10',
        type: 'knowledge_check',
        title: 'Photogrammetry Knowledge Check',
        knowledgeCheck: {
          question: 'A vertical aerial photograph is taken with a camera having a focal length of 152.4 mm from a flying height of 3,048 m above sea level. The terrain elevation at a point of interest is 248 m. What is the approximate photo scale at that point?',
          options: [
            '1:5,000',
            '1:10,000',
            '1:18,400',
            '1:20,000',
          ],
          correctIndex: 2,
          explanation: 'Using the photo scale formula: Scale = f / (H - h) = 152.4 mm / (3,048 m - 248 m) = 152.4 mm / 2,800 m. Convert 2,800 m to mm: 2,800,000 mm. Scale = 152.4 / 2,800,000 = 1 / 18,373, which is approximately 1:18,400. The terrain elevation must be subtracted from the flying height to get the camera height above the ground at that point.',
        },
      },
      {
        id: 'fs-d4-mapping-s11',
        type: 'concept',
        title: 'GIS Fundamentals: Data Models and Spatial Analysis',
        content: 'A Geographic Information System (GIS) is a computer-based system for capturing, storing, analyzing, and displaying geographically referenced data. GIS integrates spatial data (where things are) with attribute data (what things are) to support decision-making and analysis.\n\nTwo primary spatial data models exist in GIS:\n\nVector Data Model: Represents geographic features using discrete geometric elements. Points represent features with a single location (e.g., survey monuments, well locations). Lines (or polylines) represent linear features (e.g., roads, streams, utility lines). Polygons represent area features (e.g., parcels, lakes, political boundaries). Vector data is precise, stores exact coordinate geometry, and is well-suited for cadastral and boundary mapping.\n\nRaster Data Model: Represents the world as a grid of regularly spaced cells (pixels), where each cell holds a single value. Raster data is used for continuous surfaces such as digital elevation models (DEMs), satellite imagery, and aerial orthophotos. Cell size (resolution) determines the level of detail: a 1-meter resolution raster has cells representing 1 m by 1 m on the ground.\n\nCommon GIS spatial analysis operations include:\n\nBuffering: Creating a zone of specified distance around a feature (e.g., a 100-foot buffer around a wetland).\n\nOverlay Analysis: Combining multiple data layers to identify spatial relationships (e.g., overlaying parcel boundaries with flood zones to identify affected properties).\n\nSpatial Query: Selecting features based on their spatial relationship to other features (e.g., find all monuments within 500 feet of a road).\n\nMetadata is data about data. In GIS, metadata describes the source, accuracy, coordinate system, projection, date of collection, and other quality attributes of a spatial dataset. Complete metadata is essential for assessing whether a dataset is appropriate for a given purpose and for ensuring proper integration of data from multiple sources.',
      },
      {
        id: 'fs-d4-mapping-s12',
        type: 'further_reading',
        title: 'Further Reading for Mapping, Photogrammetry & GIS',
        furtherReading: [
          { book: 'Elementary Surveying, 15th Edition', chapter: 'Chapter 16', topic: 'Mapping and map projections' },
          { book: 'Elementary Surveying, 15th Edition', chapter: 'Chapters 27-28', topic: 'Photogrammetry and remote sensing fundamentals' },
          { book: 'Surveyor Reference Manual', chapter: 'Chapter 9', topic: 'Mapping, photogrammetry, and GIS operations' },
        ],
      },
    ],
  },
  {
    id: 'fs-d6-ethics',
    examTrack: 'fs',
    domainNumber: 6,
    domain: 'Professional Practice',
    title: 'Ethics & Professional Practice',
    description: 'Review the ethical foundations of professional surveying practice, including the NCEES Model Rules of Professional Conduct, duties and responsibilities of licensed surveyors, common ethical scenarios tested on the FS exam, business and legal considerations, and an overview of ALTA/NSPS Land Title Survey standards.',
    estimatedMinutes: 15,
    sections: [
      {
        id: 'fs-d6-ethics-s1',
        type: 'concept',
        title: 'Professional Ethics Foundations',
        content: 'Professional ethics form the cornerstone of surveying practice. The fundamental principle underlying all ethical rules is that the health, safety, and welfare of the public must be held paramount. This obligation supersedes the interests of the surveyor, the client, and the employer.\n\nThe NCEES Model Rules of Professional Conduct provide a nationally recognized framework that most state licensing boards adopt or adapt. Key principles include:\n\n1. Hold paramount the safety, health, and welfare of the public in the performance of professional duties.\n\n2. Perform services only in areas of competence. A surveyor must not accept assignments beyond their training, experience, or expertise.\n\n3. Issue public statements only in an objective and truthful manner. Surveyors must not misrepresent their qualifications or the scope of their work.\n\n4. Act as faithful agents or trustees for each client and employer, while maintaining honesty and impartiality.\n\n5. Avoid deceptive acts and conduct themselves honorably, responsibly, ethically, and lawfully to enhance the honor, reputation, and usefulness of the profession.\n\nOn the FS exam, ethics questions test whether candidates can identify the correct course of action when faced with situations that may tempt compromise of these principles. The overriding theme is that public welfare always takes precedence, even when doing so may be costly, inconvenient, or contrary to a client\'s wishes.',
      },
      {
        id: 'fs-d6-ethics-s2',
        type: 'concept',
        title: 'Surveyor\'s Duties and Responsibilities',
        content: 'Licensed surveyors carry specific duties and responsibilities that distinguish them from other professionals:\n\nCompetence: A surveyor must only accept work within their area of demonstrated competence. If a project requires expertise the surveyor does not possess (such as hydrographic surveying or geodetic control work), the surveyor must either obtain the necessary training, associate with a qualified professional, or decline the engagement.\n\nConflicts of Interest: Surveyors must disclose any personal, financial, or professional interest that could influence their judgment or the outcome of their work. Accepting work from multiple parties in a boundary dispute without full disclosure to all parties is an ethical violation. A surveyor must not accept compensation from more than one party for the same project without the knowledge and consent of all parties.\n\nSeal and Signature: The surveyor\'s seal (stamp) and signature on a document represent professional certification that the work was performed under the surveyor\'s responsible charge and meets applicable professional standards. Sealing work that was not performed under one\'s direct supervision and control is a serious ethical and legal violation. The seal signifies personal accountability.\n\nAccuracy and Diligence: Surveyors must exercise reasonable care and diligence consistent with the applicable standard of care. Measurements must be made with appropriate instruments and methods, and all work must be properly documented.\n\nContinuing Education: Most jurisdictions require licensed surveyors to complete continuing professional development to maintain their license, ensuring their knowledge remains current with evolving technology, standards, and regulations.',
      },
      {
        id: 'fs-d6-ethics-s3',
        type: 'concept',
        title: 'Common Ethical Scenarios on the FS Exam',
        content: 'The FS exam frequently presents ethical scenarios that require candidates to identify the proper professional response. Several common themes recur:\n\nReporting Errors: If a surveyor discovers an error in their own work or in previous work by another surveyor, they have an obligation to report and correct it. Concealing errors, even if disclosure may be embarrassing or costly, is always the wrong choice. When discovering an error in another surveyor\'s work that could affect public safety, the surveyor should notify the responsible party and, if the issue is not resolved, report it to the appropriate licensing board.\n\nOutside Influence and Pressure: Clients, employers, developers, or attorneys may pressure a surveyor to alter findings, adjust boundary lines, or certify results that the surveyor believes are inaccurate. The correct response is always to refuse to compromise professional judgment. A surveyor who knowingly produces false or misleading work to satisfy a client violates the core ethical principle of public welfare.\n\nConfidentiality: Surveyors have a duty to maintain the confidentiality of client information. However, this duty does not extend to concealing information that poses a threat to public safety. If confidential information reveals a hazard to the public, the surveyor must take appropriate steps to address the danger.\n\nCompetitive Bidding: Surveyors should not engage in practices that undermine professional integrity, such as drastically underbidding to secure work and then cutting corners to remain profitable. However, competitive bidding itself is not unethical, provided the surveyor maintains quality standards.\n\nAdvertising: Truthful advertising is acceptable, but surveyors must not make misleading claims about their qualifications, experience, or the results they can achieve.',
      },
      {
        id: 'fs-d6-ethics-s4',
        type: 'knowledge_check',
        title: 'Ethics Scenario Knowledge Check',
        knowledgeCheck: {
          question: 'A licensed surveyor is performing a boundary survey and discovers that a neighboring property\'s fence encroaches 2 feet onto the client\'s parcel. The client asks the surveyor to "adjust" the boundary line on the plat so the fence appears to be on the correct side. What should the surveyor do?',
          options: [
            'Accommodate the client\'s request since the client is paying for the survey',
            'Adjust the boundary only if the neighboring property owner agrees',
            'Refuse to alter the boundary line and show the true property line based on the evidence and measurements',
            'Remove the fence location from the plat entirely to avoid the conflict',
          ],
          correctIndex: 2,
          explanation: 'A surveyor must always report the boundary in its true location as determined by evidence, measurements, and applicable law. Altering a boundary line to accommodate a client\'s preference would be a misrepresentation of factual findings and a violation of the surveyor\'s ethical and legal obligations. The surveyor should clearly show the true boundary line and can note the encroachment on the plat, but must never distort the facts.',
        },
      },
      {
        id: 'fs-d6-ethics-s5',
        type: 'concept',
        title: 'Business and Legal Aspects of Surveying Practice',
        content: 'Professional surveying practice involves important business and legal considerations that affect how surveyors operate and protect themselves:\n\nContracts: Written contracts between the surveyor and client define the scope of services, deliverables, timeline, compensation, and responsibilities of each party. A well-drafted contract protects both the surveyor and the client by setting clear expectations. Contracts should specify the type of survey (boundary, topographic, ALTA/NSPS), the applicable standards, the accuracy requirements, and the form of deliverables.\n\nLiability: Surveyors are legally responsible for the accuracy and completeness of their professional work. Professional liability (errors and omissions) insurance is essential protection against claims arising from mistakes or alleged negligence. Liability may arise from incorrect boundary determinations, inaccurate topographic data, or failure to discover easements or encroachments.\n\nStandard of Care: The standard of care is the level of skill, knowledge, and diligence that a reasonably competent surveyor would exercise under similar circumstances. It is the benchmark against which a surveyor\'s performance is measured in negligence claims. The standard of care is not perfection; it recognizes that reasonable professionals may reach different conclusions on complex boundary questions. However, carelessness, failure to follow established procedures, or use of inappropriate equipment falls below the standard of care.\n\nStatute of Limitations: Each jurisdiction sets a time period within which legal claims must be filed. For surveying services, this period typically begins when the alleged error is discovered or should have been discovered, rather than when the work was performed.\n\nExpert Witness: Surveyors may be called upon to provide expert testimony in legal proceedings involving boundary disputes, easements, or land title issues. Expert witnesses must offer objective, truthful opinions based on professional knowledge, regardless of which party retained them.',
      },
      {
        id: 'fs-d6-ethics-s6',
        type: 'concept',
        title: 'ALTA/NSPS Land Title Survey Standards',
        content: 'The ALTA/NSPS Land Title Surveys are performed in accordance with standards jointly developed by the American Land Title Association (ALTA) and the National Society of Professional Surveyors (NSPS). These standards define the minimum requirements for surveys used in commercial real estate transactions and title insurance.\n\nKey elements of an ALTA/NSPS survey include:\n\nBoundary Determination: The survey must establish the perimeter boundary of the property based on the legal description in the title commitment or deed, locate all corners, and show all relevant dimensions and bearings.\n\nRelative Positional Precision: The current standards require that the relative positional precision of the survey not exceed 2 cm (0.07 ft) plus 50 parts per million at the 95 percent confidence level. This is a rigorous accuracy requirement.\n\nImprovements: All buildings, structures, and other improvements on the property must be located and shown on the plat, including their relationship to boundary lines.\n\nEasements and Rights-of-Way: All easements of record identified in the title commitment must be shown on the survey, along with any visible evidence of easements not of record.\n\nTable A Optional Items: The standards include a Table A that lists additional optional survey responsibilities that may be negotiated between the client, lender, and surveyor. Examples include flood zone determination, location of underground utilities, and zoning compliance analysis. The surveyor and client agree in advance which Table A items are included in the scope of work.\n\nCertification: The surveyor provides a written certification that the survey was prepared in accordance with the ALTA/NSPS standards, typically addressed to the buyer, lender, and title company.',
      },
      {
        id: 'fs-d6-ethics-s7',
        type: 'knowledge_check',
        title: 'Professional Practice Knowledge Check',
        knowledgeCheck: {
          question: 'Which of the following best describes the "standard of care" in professional surveying practice?',
          options: [
            'The highest level of accuracy achievable with the most advanced surveying equipment available',
            'The level of skill and diligence that a reasonably competent surveyor would exercise under similar circumstances',
            'The minimum requirements set forth in the ALTA/NSPS survey standards for all surveys',
            'The accuracy specifications published by the equipment manufacturer for each instrument',
          ],
          correctIndex: 1,
          explanation: 'The standard of care is defined as the level of skill, knowledge, and diligence that a reasonably competent surveyor would exercise under the same or similar circumstances. It does not require perfection or the use of the most advanced equipment available. It is a legal benchmark used to evaluate whether a surveyor acted with reasonable professional competence, and it varies depending on the type of survey, local conditions, and available information.',
        },
      },
      {
        id: 'fs-d6-ethics-s8',
        type: 'further_reading',
        title: 'Further Reading for Ethics & Professional Practice',
        furtherReading: [
          { book: 'NCEES FS Reference Handbook', chapter: 'Ethics Section', topic: 'NCEES Model Rules of Professional Conduct and ethical principles' },
          { book: 'Surveyor Reference Manual', chapter: 'Chapter 13', topic: 'Professional practice, ethics, and business management' },
          { book: 'State Board Rules', chapter: 'Codes of Ethics', topic: 'State-specific ethical rules and standards of professional conduct' },
        ],
      },
    ],
  },
];
