import type { ReadingModule } from '../schema';

export const STUDY_READINGS_PS: ReadingModule[] = [
  // ============================================================
  // DOMAIN 1: LEGAL PRINCIPLES (5 readings)
  // ============================================================
  {
    id: 'ps-d1-evidence',
    examTrack: 'ps',
    domainNumber: 1,
    domain: 'Legal Principles',
    title: 'Evidence in Boundary Determination',
    description: 'Understanding the role and hierarchy of evidence in locating property boundaries, including the distinction between original and retracement surveys and the weight given to various types of evidence.',
    estimatedMinutes: 20,
    sections: [
      {
        id: 'ps-d1-evidence-s1',
        type: 'concept',
        title: 'Types of Survey Evidence',
        content: 'In boundary surveying, evidence is the foundation upon which all boundary determinations rest. Evidence falls into several broad categories, each carrying different weight in the eyes of the law. Physical evidence includes monuments, markers, fences, walls, hedgerows, and other tangible objects found on the ground. Documentary evidence includes recorded deeds, plats, maps, field notes, and other written records. Testimonial evidence comes from the spoken or written statements of witnesses, including neighbors, previous owners, and other surveyors who have knowledge of the boundary location.\n\nThe surveyor must understand that not all evidence is created equal. Courts have long established a hierarchy of evidence for boundary determination. At the top of this hierarchy sit natural monuments, which are permanent, naturally occurring features such as rivers, lakes, ridgelines, and large boulders specifically called for in the conveyance. Natural monuments are favored because they are difficult to move or destroy and are generally considered the most reliable indicators of the grantor\'s intent. Artificial monuments, such as iron pins, concrete markers, wooden stakes, and stone bounds set by surveyors, rank second. These are man-made objects placed to mark boundary corners and lines.\n\nBelow monuments in the hierarchy come courses and distances, which are the bearings (or angles) and lengths of boundary lines as stated in the deed or plat. While measurements can be quite precise with modern equipment, historical measurements were subject to significant error, and courses and distances are therefore considered less reliable than monuments actually found on the ground. Quantity or area occupies the lowest rung of the evidence hierarchy. A deed may state that a parcel contains "10 acres, more or less," but this figure is generally considered the least reliable element because it was often estimated rather than precisely computed.\n\nThe parol evidence rule is a critical legal doctrine that affects boundary evidence. Under this rule, oral testimony generally cannot be used to contradict or modify the terms of a written instrument such as a deed. However, there are important exceptions. Parol evidence may be admitted to resolve ambiguities in a deed, to show the parties\' intent when the written description is unclear, or to establish the location of monuments called for in the deed. Understanding the interplay between written and oral evidence is essential for the professional surveyor making boundary determinations.'
      },
      {
        id: 'ps-d1-evidence-s2',
        type: 'concept',
        title: 'Original vs. Retracement Surveys',
        content: 'A fundamental distinction in boundary surveying is between original surveys and retracement surveys. An original survey is one that creates boundaries for the first time. The surveyor performing an original survey has broad discretion in establishing the location of corners and lines, subject to the instructions of the landowner and applicable regulations. The Government Land Office (GLO) surveys that established the Public Land Survey System (PLSS) across much of the United States are classic examples of original surveys. When a subdivision plat is prepared and recorded, the surveyor creating that plat is also performing an original survey.\n\nA retracement survey, by contrast, seeks to recover or relocate boundaries that were previously established by an original survey. The vast majority of boundary surveys performed today are retracement surveys. The professional surveyor performing a retracement must follow in the footsteps of the original surveyor, attempting to determine where the original surveyor actually placed the corners and ran the lines. This is not merely a mathematical exercise of plotting deed calls on a map; it requires careful field investigation, evidence gathering, and professional judgment.\n\nThe distinction carries enormous legal significance. A retracing surveyor does not have the authority to establish new corners or create new boundaries. The surveyor\'s role is to find and identify the location of the original boundary as established by the original surveyor. If the original monument can be found, its position controls, even if modern measurements show it was placed in the "wrong" location according to the deed calls. This principle reflects the legal doctrine that boundaries are fixed at the time of the original survey, and subsequent measurements cannot alter those boundaries.\n\nWhen original monuments cannot be found, the retracing surveyor must use all available evidence to determine the most probable location of the lost corner. This may involve proportionate measurement, reference to accessories (witness trees, bearing trees, reference monuments), analysis of occupation patterns, testimony from knowledgeable parties, and examination of other survey records. The standard applied is not mathematical certainty but rather the preponderance of evidence, requiring the surveyor to determine the most probable position based on all available information.'
      },
      {
        id: 'ps-d1-evidence-s3',
        type: 'worked_example',
        title: 'Applying the Evidence Hierarchy',
        workedExample: {
          problem: 'A deed calls for a boundary line to run "N 45 E, 500 feet to an iron pin at the northeast corner." The surveyor finds an iron pin 512 feet from the point of beginning along a bearing of N 43 30 E. No other evidence of a corner exists at the 500-foot distance along the called bearing. How should the surveyor resolve this discrepancy?',
          steps: [
            { step: 1, description: 'Identify the types of evidence present.', calculation: 'Artificial monument (iron pin found at 512 ft) vs. course and distance (N 45 E, 500 ft)' },
            { step: 2, description: 'Apply the evidence hierarchy. Monuments control over courses and distances.', calculation: 'Monument (iron pin) ranks higher than course (N 45 E) and distance (500 ft)' },
            { step: 3, description: 'Evaluate whether the found monument is the called-for monument. The pin is reasonably close to the called position (12 ft in distance, 1.5 degrees in bearing), consistent with historical measurement accuracy.', calculation: 'Discrepancy = 12 ft in 500 ft = 1:42 ratio; bearing difference = 1 deg 30 min. Both within typical historical accuracy.' },
            { step: 4, description: 'Conclude that the found iron pin is the called-for monument and should control the corner location.', calculation: 'Corner position = location of the found iron pin, not the computed position from deed calls' },
          ],
          answer: 'The iron pin found at 512 feet on a bearing of N 43 30 E should be accepted as the northeast corner. Under the evidence hierarchy, the monument controls over the course and distance called in the deed. The discrepancies are within normal historical measurement tolerances and support the conclusion that this is the original monument.',
        },
      },
      {
        id: 'ps-d1-evidence-s4',
        type: 'knowledge_check',
        title: 'Evidence Hierarchy Check',
        knowledgeCheck: {
          question: 'In the standard hierarchy of evidence for boundary determination, which of the following ranks highest?',
          options: [
            'Courses (bearings/angles)',
            'Distances',
            'Natural monuments',
            'Area/quantity',
          ],
          correctIndex: 2,
          explanation: 'Natural monuments rank highest in the evidence hierarchy because they are permanent, naturally occurring features that are difficult to move or destroy. The standard hierarchy from highest to lowest is: natural monuments, artificial monuments, courses, distances, and area.',
        },
      },
      {
        id: 'ps-d1-evidence-s5',
        type: 'knowledge_check',
        title: 'Parol Evidence Rule Check',
        knowledgeCheck: {
          question: 'Under the parol evidence rule, oral testimony is generally inadmissible to:',
          options: [
            'Locate a monument called for in a deed',
            'Contradict or modify the written terms of a deed',
            'Explain an ambiguity in a legal description',
            'Establish the grantor\'s intent when the deed is unclear',
          ],
          correctIndex: 1,
          explanation: 'The parol evidence rule prevents oral testimony from being used to contradict or modify the terms of a written instrument such as a deed. However, exceptions allow parol evidence to resolve ambiguities, locate called-for monuments, or establish intent when the written description is unclear.',
        },
      },
    ],
  },
  {
    id: 'ps-d1-deeds',
    examTrack: 'ps',
    domainNumber: 1,
    domain: 'Legal Principles',
    title: 'Deed Interpretation and Legal Descriptions',
    description: 'Mastering the interpretation of deeds and the three primary systems of legal description used in the United States: metes and bounds, lot and block, and the Public Land Survey System.',
    estimatedMinutes: 22,
    sections: [
      {
        id: 'ps-d1-deeds-s1',
        type: 'concept',
        title: 'Metes and Bounds Descriptions',
        content: 'The metes and bounds system is the oldest form of legal description used in the United States, originating in the original thirteen colonies and still predominant in states east of the Mississippi River. A metes and bounds description defines a parcel by describing its boundary lines sequentially, starting from a defined point of beginning (POB) and proceeding around the perimeter until returning to the POB. The term "metes" refers to measurements of length and direction, while "bounds" refers to the boundaries themselves, which may be described by reference to monuments, adjoining properties, or natural features.\n\nA well-drafted metes and bounds description contains several essential elements. It must identify a definite point of beginning, which should be tied to a monument or other identifiable location. Each boundary line, or "call," describes the direction of the line (typically as a bearing such as "N 45 00 E"), the distance along that line, and any monuments or adjoiners encountered. The description must close, meaning it must return to the point of beginning to fully enclose the parcel. A description that fails to close, either mathematically or legally, creates an ambiguity that may need to be resolved through other evidence or legal proceedings.\n\nSurveyors must be adept at interpreting historical metes and bounds descriptions, which often use archaic language and measurement units. Historical descriptions may reference landmarks that no longer exist, use chains and links as units of measure (1 chain = 66 feet, 1 link = 0.66 feet), or describe boundaries by reference to adjoining landowners who have long since conveyed their property. The surveyor must trace the chain of title and related conveyances to fully understand how the boundaries were intended to be located.\n\nWhen interpreting metes and bounds descriptions, the surveyor should pay careful attention to the distinction between "to" calls and "along" calls. A call "to" a monument (e.g., "to an iron pin") indicates a specific terminus point. A call "along" a feature (e.g., "along the centerline of Smith Road") indicates that the boundary follows that feature, and the actual surveyed centerline controls over the stated course and distance. Senior rights and junior rights also play a role: when parcels are created by successive conveyances from a common grantor, the first conveyance (senior) takes priority, and the second (junior) parcel receives whatever land remains.'
      },
      {
        id: 'ps-d1-deeds-s2',
        type: 'concept',
        title: 'Lot and Block and PLSS Descriptions',
        content: 'The lot and block system describes property by reference to a recorded subdivision plat. A typical lot and block description reads: "Lot 5, Block 3, Sunrise Estates, a subdivision in the City of Springfield, County of Greene, State of Missouri, as recorded in Plat Book 12, Page 45." This system is efficient because the detailed boundary information, including dimensions, bearings, and curve data, is contained on the recorded plat rather than repeated in each deed. The surveyor performing a lot and block survey must obtain and examine the recorded plat to determine the boundaries of the lot.\n\nThe Public Land Survey System (PLSS) covers approximately 30 states, primarily west of the Appalachian Mountains. Under the PLSS, land is divided into a grid of townships, each nominally six miles square, identified by their township and range numbers relative to a principal meridian and baseline. Each township is divided into 36 sections, each nominally one mile square and containing approximately 640 acres. Sections are further divided into quarter sections (160 acres), quarter-quarter sections (40 acres), and government lots.\n\nA PLSS legal description reads from the smallest unit to the largest: "The NW 1/4 of the SE 1/4 of Section 14, Township 3 North, Range 5 West, Third Principal Meridian." To interpret such a description, the surveyor reads it backward, starting with the section and successively subdividing. The surveyor locates Section 14, then identifies the SE 1/4 of that section, and finally locates the NW 1/4 within that SE 1/4. This process is sometimes called "reading from the back" of the description.\n\nSurveyors working within the PLSS must understand the Bureau of Land Management (BLM) Manual of Surveying Instructions, which governs the restoration and reestablishment of PLSS corners. The manual distinguishes between existent corners (original monuments found in place), obliterated corners (original position can be determined from accessories or evidence), and lost corners (position cannot be determined from existing evidence and must be restored by proportionate measurement). These distinctions carry significant legal weight in boundary determination within the PLSS.'
      },
      {
        id: 'ps-d1-deeds-s3',
        type: 'worked_example',
        title: 'Interpreting a PLSS Legal Description',
        workedExample: {
          problem: 'Determine the approximate acreage and location within the section for the following PLSS description: "The S 1/2 of the NE 1/4 of the NW 1/4 of Section 22, T2N, R4W, 6th PM."',
          steps: [
            { step: 1, description: 'Start with the full section (640 acres) and work from the back of the description.', calculation: 'Section 22 = 640 acres' },
            { step: 2, description: 'Identify the NW 1/4 of Section 22.', calculation: 'NW 1/4 = 640 / 4 = 160 acres (upper-left quarter of the section)' },
            { step: 3, description: 'Identify the NE 1/4 of the NW 1/4.', calculation: 'NE 1/4 of NW 1/4 = 160 / 4 = 40 acres (upper-right portion of the NW quarter)' },
            { step: 4, description: 'Identify the S 1/2 of that 40-acre tract.', calculation: 'S 1/2 of 40 acres = 40 / 2 = 20 acres (lower half of the 40-acre tract)' },
          ],
          answer: 'The described parcel contains approximately 20 acres and is located in the north-central portion of Section 22, specifically the southern half of the northeast quarter of the northwest quarter.',
        },
      },
      {
        id: 'ps-d1-deeds-s4',
        type: 'knowledge_check',
        title: 'Legal Description Interpretation',
        knowledgeCheck: {
          question: 'In a metes and bounds description, a call "along the center of Elm Creek" means the boundary:',
          options: [
            'Runs in a straight line parallel to Elm Creek',
            'Follows the actual meanders of the center of Elm Creek',
            'Extends to the near bank of Elm Creek',
            'Is located 50 feet from the center of Elm Creek',
          ],
          correctIndex: 1,
          explanation: 'A call "along" a feature means the boundary follows that feature as it actually exists on the ground, including all its meanders and curves. The stated course and distance are subordinate to the natural feature being referenced.',
        },
      },
      {
        id: 'ps-d1-deeds-s5',
        type: 'knowledge_check',
        title: 'PLSS Corner Classification',
        knowledgeCheck: {
          question: 'Under the BLM Manual of Surveying Instructions, a corner whose original monument has been destroyed but whose position can be recovered from reliable evidence such as bearing trees or witness corners is classified as:',
          options: [
            'An existent corner',
            'An obliterated corner',
            'A lost corner',
            'A proportioned corner',
          ],
          correctIndex: 1,
          explanation: 'An obliterated corner is one where the original monument has been destroyed but whose position can be recovered from accessories, witness marks, or other reliable evidence. A lost corner cannot be recovered from evidence and must be restored by proportionate measurement.',
        },
      },
    ],
  },
  {
    id: 'ps-d1-easements',
    examTrack: 'ps',
    domainNumber: 1,
    domain: 'Legal Principles',
    title: 'Easements and Encumbrances',
    description: 'A comprehensive study of easements, including their types, methods of creation, scope, and termination, as well as other encumbrances that affect land ownership and surveying practice.',
    estimatedMinutes: 20,
    sections: [
      {
        id: 'ps-d1-easements-s1',
        type: 'concept',
        title: 'Types of Easements',
        content: 'An easement is a nonpossessory interest in land that grants the holder the right to use another person\'s property for a specific purpose. Unlike ownership, an easement does not give the holder the right to possess the land or to exclude others from it. Understanding easements is critical for professional surveyors because they directly affect the use and value of property, and their location must often be shown on survey plats and ALTA/NSPS Land Title Surveys.\n\nEasements are broadly classified as either appurtenant or in gross. An easement appurtenant benefits a particular parcel of land (the dominant tenement) and burdens an adjacent parcel (the servient tenement). A classic example is a driveway easement that allows the owner of a landlocked parcel to cross a neighbor\'s property to reach a public road. The easement "runs with the land," meaning it transfers automatically when either parcel is sold. An easement in gross, by contrast, benefits a particular person or entity rather than a parcel of land. Utility easements are the most common example: a power company holds an easement in gross to maintain transmission lines across private property.\n\nEasements may also be classified as affirmative or negative. An affirmative easement grants the holder the right to do something on the servient estate, such as cross it, install utilities, or drain water across it. A negative easement restricts the owner of the servient estate from doing something on their own property, such as building a structure that would block the dominant estate\'s light, air, or view. Negative easements are relatively rare in modern practice.\n\nThe scope of an easement is defined by the terms of its creation. The holder of an easement may use it only for the purpose specified. For example, an easement granted for "pedestrian access" does not permit vehicular traffic. If the easement document does not specify a width, the law generally implies a width that is reasonable and necessary for the easement\'s intended use. Surveyors must carefully review easement documents to determine the precise location, width, and permitted uses of each easement affecting the property being surveyed.'
      },
      {
        id: 'ps-d1-easements-s2',
        type: 'concept',
        title: 'Creation and Termination of Easements',
        content: 'Easements may be created through several legal mechanisms. The most common is express grant, where the landowner executes a written instrument conveying the easement to another party. This instrument must satisfy the requirements of the Statute of Frauds, meaning it must be in writing and signed by the grantor. Express reservation occurs when a landowner conveys a parcel but retains an easement over the conveyed land in the deed of conveyance.\n\nEasements may also arise by implication. An easement by necessity is implied when a parcel is landlocked and has no access to a public road; the law implies an easement across the grantor\'s remaining land to provide access. An easement implied from prior use arises when a landowner who has been using one part of their property to benefit another part divides the property, and the use was apparent, continuous, and reasonably necessary at the time of severance.\n\nPrescriptive easements are created through adverse use of another\'s property for the statutory period, analogous to adverse possession but resulting in an easement rather than ownership. The use must be open and notorious, adverse to the owner\'s interest, continuous and uninterrupted, and for the prescriptive period established by state law. Dedication occurs when a landowner offers land for public use, either expressly through a recorded plat or impliedly through actions indicating an intent to dedicate.\n\nEasements may be terminated through several means. Release occurs when the easement holder executes a written release to the servient estate owner. Merger occurs when the same person acquires ownership of both the dominant and servient estates, as a person cannot have an easement in their own land. Abandonment requires more than mere non-use; it requires a demonstrated intent to relinquish the easement permanently, often evidenced by affirmative acts inconsistent with future use. Expiration occurs when an easement created for a specified term reaches the end of that term. Condemnation can terminate a private easement when the government acquires the servient estate through eminent domain.'
      },
      {
        id: 'ps-d1-easements-s3',
        type: 'knowledge_check',
        title: 'Easement Classification',
        knowledgeCheck: {
          question: 'A utility company holds the right to maintain power lines across a private landowner\'s property. This is an example of:',
          options: [
            'An easement appurtenant',
            'An easement in gross',
            'A negative easement',
            'A license',
          ],
          correctIndex: 1,
          explanation: 'A utility easement benefits the utility company (a person or entity) rather than a specific parcel of land, making it an easement in gross. An easement appurtenant, by contrast, benefits a particular parcel of land (the dominant tenement).',
        },
      },
      {
        id: 'ps-d1-easements-s4',
        type: 'knowledge_check',
        title: 'Easement Termination',
        knowledgeCheck: {
          question: 'An easement is terminated by merger when:',
          options: [
            'The easement holder stops using the easement for an extended period',
            'The government condemns the servient estate',
            'The dominant and servient estates come under common ownership',
            'The easement holder signs a written release',
          ],
          correctIndex: 2,
          explanation: 'Merger terminates an easement when the same person acquires ownership of both the dominant and servient estates. Since a person cannot have an easement in their own land, the easement is extinguished by the unity of ownership.',
        },
      },
    ],
  },
  {
    id: 'ps-d1-adverse',
    examTrack: 'ps',
    domainNumber: 1,
    domain: 'Legal Principles',
    title: 'Adverse Possession and Unwritten Rights',
    description: 'Understanding the legal doctrines of adverse possession, practical location, boundary by agreement, and boundary by acquiescence, and how these unwritten rights affect boundary determination.',
    estimatedMinutes: 20,
    sections: [
      {
        id: 'ps-d1-adverse-s1',
        type: 'concept',
        title: 'Elements of Adverse Possession',
        content: 'Adverse possession is a legal doctrine by which a person who occupies another\'s land for a sufficient period under certain conditions may acquire title to that land. While the specific requirements vary by state, the traditional elements of adverse possession are consistent across most jurisdictions. The possession must be actual, meaning the claimant physically occupies and uses the land in a manner consistent with its character. Farming, fencing, building structures, and maintaining landscaping are common examples of actual possession.\n\nThe possession must be open and notorious, meaning it is visible and apparent to anyone who inspects the property. The purpose of this requirement is to give the true owner notice that someone is claiming their land, providing an opportunity to take legal action to protect their rights. Secret or hidden use of the land does not satisfy this element. The possession must also be exclusive, meaning the adverse possessor occupies the land to the exclusion of the true owner and the general public. Sharing possession with the true owner defeats exclusivity.\n\nThe possession must be hostile or adverse, meaning it is without the permission of the true owner. This does not require ill will or animosity; it simply means the possessor occupies the land as if it were their own, without acknowledging the true owner\'s superior title. If the true owner grants permission to occupy the land, the occupation is not adverse and cannot ripen into title regardless of its duration. The possession must be continuous and uninterrupted for the statutory period, which varies by state from as few as 5 years to as many as 20 years.\n\nFor the professional surveyor, adverse possession is relevant because it can alter the legal boundary of a property. When a surveyor discovers that a fence, wall, or line of occupation does not coincide with the record boundary, the surveyor must consider whether adverse possession may have shifted the legal boundary to the line of occupation. While the surveyor cannot make a legal determination of adverse possession (only a court can do that), the surveyor has a professional obligation to note the discrepancy and advise the client of the potential issue.'
      },
      {
        id: 'ps-d1-adverse-s2',
        type: 'concept',
        title: 'Boundary by Agreement and Acquiescence',
        content: 'Beyond adverse possession, several other unwritten doctrines can establish or modify property boundaries. Boundary by agreement (also called boundary by parol agreement) arises when adjoining landowners, faced with uncertainty about the location of their common boundary, agree upon a specific line as the boundary. The agreement may be express (a verbal or informal understanding) or implied from the parties\' conduct. For the agreement to be binding, there must be genuine uncertainty about the boundary location, and both parties must have intended to fix the boundary by their agreement.\n\nBoundary by acquiescence is a closely related doctrine. It applies when adjoining landowners treat a particular line, typically marked by a fence, wall, or hedge, as their common boundary for a long period without dispute. Over time, the law recognizes the acquiesced line as the true boundary, even if it differs from the record boundary. The required period of acquiescence varies by jurisdiction but is often the same as the statute of limitations for adverse possession. Unlike adverse possession, acquiescence does not require hostility; the parties may simply have been mistaken about the boundary location.\n\nEstoppel may also affect boundary locations. If a landowner makes representations about the location of a boundary, and an adjoining owner relies on those representations to their detriment, the first owner may be estopped (legally prevented) from later claiming a different boundary location. For example, if Owner A tells Owner B that a fence marks their common boundary, and Owner B constructs an expensive building in reliance on that representation, Owner A may be estopped from later claiming that the boundary is actually 10 feet inside the fence.\n\nPractical location is another doctrine that recognizes a long-accepted boundary. When a boundary has been recognized and acted upon by adjoining owners and the community for a very long period, courts may uphold that practical location as the legal boundary, even without proof of an express agreement. The surveyor must be alert to all of these doctrines when performing boundary surveys, as they can move the legal boundary from its record position to the line of occupation.'
      },
      {
        id: 'ps-d1-adverse-s3',
        type: 'knowledge_check',
        title: 'Adverse Possession Elements',
        knowledgeCheck: {
          question: 'Which of the following would defeat a claim of adverse possession?',
          options: [
            'The claimant built a fence enclosing the disputed area',
            'The true owner granted written permission for the claimant to use the land',
            'The claimant paid property taxes on the disputed area',
            'The occupation was visible to neighbors and passersby',
          ],
          correctIndex: 1,
          explanation: 'Permission from the true owner defeats the "hostile" or "adverse" element of adverse possession. If the owner grants permission, the use is permissive rather than hostile, and the statutory clock never begins to run regardless of the duration of occupation.',
        },
      },
      {
        id: 'ps-d1-adverse-s4',
        type: 'knowledge_check',
        title: 'Boundary by Acquiescence',
        knowledgeCheck: {
          question: 'Boundary by acquiescence differs from adverse possession primarily because:',
          options: [
            'It requires a shorter time period',
            'It does not require hostility; the parties may have been mutually mistaken about the boundary',
            'It can only be established by a court order',
            'It applies only to boundaries marked by natural features',
          ],
          correctIndex: 1,
          explanation: 'Boundary by acquiescence does not require hostility or adversity. It arises when adjoining owners mutually treat a line as their boundary for a sufficient period, even if neither party was acting adversely. The acquiesced line becomes the boundary through long acceptance rather than adverse claim.',
        },
      },
    ],
  },
  {
    id: 'ps-d1-water',
    examTrack: 'ps',
    domainNumber: 1,
    domain: 'Legal Principles',
    title: 'Water Boundaries and Riparian Rights',
    description: 'Exploring the complex legal principles governing boundaries along water bodies, including the distinction between navigable and non-navigable waters, riparian and littoral rights, accretion, erosion, avulsion, and reliction.',
    estimatedMinutes: 22,
    sections: [
      {
        id: 'ps-d1-water-s1',
        type: 'concept',
        title: 'Navigable vs. Non-Navigable Waters',
        content: 'Water boundaries present some of the most complex legal issues in surveying practice. The legal treatment of a water boundary depends fundamentally on whether the water body is classified as navigable or non-navigable. The federal test for navigability, established by the U.S. Supreme Court, asks whether the water body was navigable in fact at the time of statehood, meaning it was used or susceptible of being used for commerce and travel. States may apply their own, sometimes broader, tests for navigability under state law.\n\nFor navigable waters, the bed of the water body is owned by the state under the public trust doctrine, which holds that certain resources are reserved for public use. The riparian (riverfront) or littoral (lakefront) landowner\'s boundary extends to the ordinary high water mark for rivers or the ordinary high water line for lakes. The state owns the submerged land below that mark. For non-navigable waters, the riparian landowner typically owns the bed of the stream or lake to the center (the thread of the stream or ad medium filum aquae), unless the conveyance specifically excludes the bed.\n\nThe ordinary high water mark is a critical boundary reference that surveyors must be able to identify. It is not the current water level but rather the line on the bank established by the fluctuations of water and indicated by physical characteristics such as a clear natural line impressed on the bank, shelving, changes in soil character, destruction of terrestrial vegetation, or the presence of litter and debris. Identifying this line requires careful field observation and professional judgment, as it may not correspond to any single, easily measured elevation.\n\nFor the PS exam, candidates should understand that water boundaries are ambulatory, meaning they can change over time as the water body changes course or the shoreline shifts. The legal doctrines of accretion, erosion, avulsion, and reliction govern how these changes affect property boundaries, and they represent some of the most frequently tested topics in the water boundaries area.'
      },
      {
        id: 'ps-d1-water-s2',
        type: 'concept',
        title: 'Accretion, Erosion, Avulsion, and Reliction',
        content: 'Accretion is the gradual and imperceptible addition of land to a riparian or littoral parcel through the deposit of soil, sand, or sediment by the action of water. When accretion occurs, the boundary between the landowner\'s property and the water body shifts with the shoreline, and the landowner gains title to the newly formed land. The key requirement is that the process must be gradual and imperceptible, meaning it cannot be observed from moment to moment but is only noticeable over a period of time.\n\nErosion is the opposite of accretion: the gradual and imperceptible wearing away of land by the action of water. When erosion occurs, the boundary shifts with the shoreline, and the landowner loses title to the eroded land. Both accretion and erosion follow the same principle: when changes to the shoreline occur gradually and naturally, the boundary moves with the water. This rule promotes fairness by ensuring that riparian landowners continue to have access to the water body.\n\nAvulsion occurs when a sudden and perceptible change alters the course of a stream or the shape of a shoreline. Examples include a flood that causes a river to jump its banks and carve a new channel, or a storm that suddenly removes a large section of shoreline. Unlike accretion and erosion, avulsion does not change property boundaries. The boundary remains in its former location (the old channel or shoreline), and the landowner retains title to the land that was separated by the sudden event. The rationale is that a landowner should not lose title to land through a catastrophic event beyond their control.\n\nReliction occurs when water permanently recedes from a shoreline, exposing formerly submerged land. The newly exposed land becomes the property of the riparian landowner, and the boundary shifts to the new shoreline. Reliction follows the same gradual-change principle as accretion. The surveyor must carefully distinguish between temporary fluctuations in water level (which do not affect boundaries) and permanent changes that constitute reliction.'
      },
      {
        id: 'ps-d1-water-s3',
        type: 'worked_example',
        title: 'Determining the Effect of Water Changes on Boundaries',
        workedExample: {
          problem: 'A river gradually deposited sediment along a landowner\'s riverfront property over a period of 15 years, extending the shoreline outward by approximately 40 feet. During a major flood event, the river then suddenly cut a new channel 200 feet to the east, abandoning its former course entirely. Determine how these events affect the property boundaries.',
          steps: [
            { step: 1, description: 'Analyze the gradual deposit of sediment over 15 years.', calculation: 'This constitutes accretion: gradual and imperceptible addition of land. The boundary shifted with the shoreline, and the landowner gained title to the 40-foot strip of new land.' },
            { step: 2, description: 'Analyze the sudden channel change during the flood.', calculation: 'This constitutes avulsion: a sudden and perceptible change in the river\'s course. Avulsion does not change property boundaries.' },
            { step: 3, description: 'Determine the current boundary location.', calculation: 'The boundary remains at the shoreline position it occupied just before the flood (which included the 40 feet gained by accretion). It does not shift to the new channel 200 feet to the east.' },
          ],
          answer: 'The landowner gained title to the 40-foot strip through accretion, and the boundary moved with the shoreline during that gradual process. However, the sudden channel change (avulsion) did not move the boundary. The property boundary remains at the pre-flood shoreline location, not at the new river channel.',
        },
      },
      {
        id: 'ps-d1-water-s4',
        type: 'knowledge_check',
        title: 'Water Boundary Doctrines',
        knowledgeCheck: {
          question: 'A river gradually erodes 15 feet of a landowner\'s riverfront property over several years. The property boundary:',
          options: [
            'Remains at its original location as shown in the recorded deed',
            'Moves with the shoreline, and the landowner loses title to the eroded land',
            'Moves to the center of the river regardless of the erosion',
            'Is determined by the original high water mark elevation',
          ],
          correctIndex: 1,
          explanation: 'Erosion, like accretion, is a gradual and imperceptible process. When erosion occurs, the boundary shifts with the shoreline, and the landowner loses title to the eroded land. Only sudden changes (avulsion) leave the boundary in its former location.',
        },
      },
      {
        id: 'ps-d1-water-s5',
        type: 'knowledge_check',
        title: 'Navigable Waters Ownership',
        knowledgeCheck: {
          question: 'For a navigable waterway, a riparian landowner\'s property boundary typically extends to:',
          options: [
            'The center of the stream (thread of the stream)',
            'The ordinary high water mark',
            'The edge of the water at low tide',
            'The outermost meander line surveyed by the GLO',
          ],
          correctIndex: 1,
          explanation: 'For navigable waterways, the state owns the bed under the public trust doctrine. The riparian landowner\'s boundary extends to the ordinary high water mark, not the center of the stream. The center-of-stream rule generally applies only to non-navigable waterways.',
        },
      },
    ],
  },

  // ============================================================
  // DOMAIN 2: PROFESSIONAL SURVEY PRACTICES (4 readings)
  // ============================================================
  {
    id: 'ps-d2-standard-care',
    examTrack: 'ps',
    domainNumber: 2,
    domain: 'Professional Survey Practices',
    title: 'Standard of Care and Professional Liability',
    description: 'Understanding the professional surveyor\'s standard of care, the basis for professional liability claims, common sources of error, and strategies for maintaining professional competence and reducing liability exposure.',
    estimatedMinutes: 18,
    sections: [
      {
        id: 'ps-d2-standard-care-s1',
        type: 'concept',
        title: 'The Professional Standard of Care',
        content: 'The standard of care for a professional surveyor is the degree of skill, care, and diligence that a reasonably competent surveyor would exercise under similar circumstances. This standard is not perfection; rather, it reflects the level of performance that the profession as a whole considers acceptable. When a surveyor fails to meet this standard and a client or third party suffers harm as a result, the surveyor may be held liable for professional negligence.\n\nThe standard of care is measured at the time the work was performed, not in hindsight. A surveyor who followed accepted practices and used appropriate equipment at the time of the survey is generally not liable for errors that would only be detected using subsequently developed technology or methods. However, the standard is not static. As technology advances and professional standards evolve, surveyors are expected to keep pace with reasonable developments in the profession. A surveyor who continues to use outdated methods when the profession has widely adopted superior techniques may fall below the standard of care.\n\nSeveral factors influence the applicable standard of care. The complexity of the project matters; a high-stakes commercial land title survey demands more rigorous procedures than a simple residential lot survey. The local customs and practices of the surveying community are also relevant, as the standard may vary somewhat by region. The terms of the surveyor\'s contract or engagement letter can expand or limit the scope of responsibility, though a contract cannot reduce the standard below the minimum required by law or professional licensing regulations.\n\nProfessional surveyors should also understand that their liability extends beyond their direct clients. Under the doctrine of privity, only parties to a contract could traditionally sue for breach. However, many jurisdictions have relaxed this rule, allowing third parties who foreseeably rely on a surveyor\'s work, such as subsequent purchasers, lenders, and title companies, to bring negligence claims. This expanded liability underscores the importance of maintaining high professional standards on every project.'
      },
      {
        id: 'ps-d2-standard-care-s2',
        type: 'concept',
        title: 'Common Sources of Professional Liability',
        content: 'Professional liability claims against surveyors most commonly arise from boundary errors, where the surveyor incorrectly locates or marks a property boundary, leading a client or subsequent owner to build a structure, fence, or improvement in the wrong location. These errors can result from failure to recover sufficient evidence, misinterpretation of deed descriptions, failure to research the chain of title, or mathematical mistakes in computations.\n\nElevation and grading errors are another significant source of liability, particularly in construction surveying. If a surveyor provides incorrect elevation data for a building pad, foundation, or drainage system, the resulting construction defect can be extremely expensive to correct. Errors in FEMA flood zone determinations and elevation certificates can expose clients to flood damage and insurance complications.\n\nFailure to identify or locate easements, encroachments, and rights-of-way is a common basis for claims in connection with ALTA/NSPS Land Title Surveys. If a surveyor fails to discover and report an underground utility easement that later prevents a client from constructing a planned improvement, the surveyor may be held liable for the client\'s losses. Similarly, failure to detect encroachments, whether by the subject property onto adjoining land or by adjoining improvements onto the subject property, can lead to costly disputes.\n\nOther sources of liability include failure to comply with applicable minimum technical standards, failure to properly monument survey corners, providing opinions or certifications beyond the scope of the surveyor\'s expertise, and failure to communicate findings and limitations to the client. The best protection against liability is a consistent commitment to thorough research, careful fieldwork, rigorous quality control, and clear communication with clients about the scope and limitations of the survey.'
      },
      {
        id: 'ps-d2-standard-care-s3',
        type: 'knowledge_check',
        title: 'Standard of Care Assessment',
        knowledgeCheck: {
          question: 'The standard of care for a professional surveyor is best described as:',
          options: [
            'Absolute perfection in all measurements and determinations',
            'The degree of skill and care that a reasonably competent surveyor would exercise under similar circumstances',
            'The minimum requirements set by the state licensing board',
            'The highest level of accuracy achievable with current technology',
          ],
          correctIndex: 1,
          explanation: 'The standard of care is not perfection but rather the level of skill, care, and diligence that a reasonably competent surveyor would exercise under similar circumstances. It is measured by professional norms at the time the work was performed.',
        },
      },
      {
        id: 'ps-d2-standard-care-s4',
        type: 'knowledge_check',
        title: 'Liability Scope',
        knowledgeCheck: {
          question: 'A surveyor performs an ALTA/NSPS survey for a commercial buyer. The buyer later sells the property to a new owner who relies on the survey. If the survey contained a material error, can the new owner potentially sue the surveyor?',
          options: [
            'No, because the new owner was not a party to the surveyor\'s contract',
            'No, because the survey was certified only to the original buyer',
            'Yes, under the doctrine of privity, which limits claims to direct contract parties',
            'Yes, in many jurisdictions, because the new owner foreseeably relied on the survey',
          ],
          correctIndex: 3,
          explanation: 'Many jurisdictions allow third parties who foreseeably rely on a surveyor\'s work to bring negligence claims, even without a direct contractual relationship. Subsequent purchasers, lenders, and title companies may be considered foreseeable users of the survey.',
        },
      },
    ],
  },
  {
    id: 'ps-d2-documentation',
    examTrack: 'ps',
    domainNumber: 2,
    domain: 'Professional Survey Practices',
    title: 'Field Documentation and Quality Control',
    description: 'Best practices for maintaining complete and accurate field notes, implementing quality control procedures, and creating defensible survey records that withstand professional and legal scrutiny.',
    estimatedMinutes: 18,
    sections: [
      {
        id: 'ps-d2-documentation-s1',
        type: 'concept',
        title: 'Field Notes and Documentation Standards',
        content: 'Field notes are the permanent record of a survey and serve as the primary documentation of what was observed, measured, and found in the field. Comprehensive field notes are essential for professional practice because they form the basis for office computations, plat preparation, and legal defense of the surveyor\'s work. A survey without adequate field documentation is essentially indefensible if challenged.\n\nModern field documentation typically includes a combination of electronic data files from total stations, GPS receivers, and data collectors, supplemented by handwritten notes, sketches, photographs, and narrative descriptions. Regardless of the recording medium, field notes should contain several essential elements: the date and time of observations, weather conditions that may affect measurements, the names and roles of crew members, equipment identification and calibration status, and a detailed description of the work performed.\n\nFor boundary surveys, field notes should document the evidence search conducted at each corner, including what was found and what was not found. If a monument was recovered, the notes should describe its physical characteristics (type, material, size, condition), its precise position, and any accessories or reference ties. If a monument was not found despite a diligent search, the notes should describe the search area and methods used. This "negative evidence" is nearly as important as positive findings because it documents the surveyor\'s due diligence.\n\nField sketches remain valuable even in the era of electronic data collection. A clear sketch provides spatial context that raw coordinate data cannot convey, showing the relationship between monuments, improvements, fences, and other features. Photographs have become an indispensable supplement, providing visual documentation of found evidence, site conditions, and potential conflicts. Best practice is to photograph every recovered monument with a reference scale, as well as significant occupation evidence and potential encroachments.'
      },
      {
        id: 'ps-d2-documentation-s2',
        type: 'concept',
        title: 'Quality Control and Quality Assurance Procedures',
        content: 'Quality control (QC) in surveying refers to the systematic procedures used to verify the accuracy and completeness of survey work. Quality assurance (QA) is the broader management system that ensures QC procedures are implemented consistently across all projects. Together, QC and QA form the backbone of a defensible survey practice and are essential for meeting professional standards of care.\n\nField QC procedures include redundant measurements, closure checks, and independent verification. Traverse closures should be computed and compared against acceptable tolerance before leaving the site. Level loops should be closed and the misclosure compared against the allowable limit for the survey\'s required accuracy. GPS observations should include sufficient redundancy (extra baselines, multiple sessions) to allow statistical assessment of the results. All QC computations should be documented in the field notes.\n\nOffice QC procedures include independent checking of all computations by a second qualified person, comparison of the survey results against record information (deeds, plats, prior surveys), and review of the draft plat or map for accuracy, completeness, and compliance with applicable standards. The checking process should be documented, typically by having the checker initial or sign the checked work. Many firms use standardized checklists to ensure that no step is overlooked.\n\nCommon QC metrics include traverse closure ratios (typically 1:10,000 or better for boundary surveys), level closure tolerances (often expressed as a function of the square root of the distance in miles), and GPS baseline repeatability. These metrics provide objective benchmarks against which the quality of the survey can be assessed. When results fall outside acceptable tolerances, the surveyor must investigate the source of the error and take corrective action before proceeding.'
      },
      {
        id: 'ps-d2-documentation-s3',
        type: 'formula',
        title: 'Traverse Closure Ratio',
        formula: {
          expression: 'Closure Ratio = 1 : (Perimeter / Linear Error of Closure)',
          variables: [
            { symbol: 'Perimeter', description: 'Total distance around the traverse (sum of all leg lengths)' },
            { symbol: 'Linear Error of Closure', description: 'sqrt(error_lat^2 + error_dep^2), the distance between the computed and theoretical closing position' },
          ],
          whenToUse: 'Use to evaluate the quality of a closed traverse survey. Compare the result against applicable standards: 1:10,000 or better is typical for boundary surveys, 1:5,000 for construction surveys, and 1:15,000 or better for control surveys. A ratio that fails to meet the required standard indicates the survey must be repeated or adjusted.',
        },
      },
      {
        id: 'ps-d2-documentation-s4',
        type: 'worked_example',
        title: 'Computing and Evaluating Traverse Closure',
        workedExample: {
          problem: 'A closed boundary traverse has a total perimeter of 2,450.00 feet. After computing latitudes and departures, the closure error in latitude is +0.15 ft and in departure is -0.20 ft. Compute the linear error of closure and the closure ratio. Does the traverse meet the 1:10,000 standard?',
          steps: [
            { step: 1, description: 'Compute the linear error of closure.', calculation: 'LEC = sqrt(0.15^2 + 0.20^2) = sqrt(0.0225 + 0.0400) = sqrt(0.0625) = 0.25 ft' },
            { step: 2, description: 'Compute the closure ratio.', calculation: 'Ratio = Perimeter / LEC = 2,450.00 / 0.25 = 9,800' },
            { step: 3, description: 'Express as a ratio and compare to the standard.', calculation: 'Closure ratio = 1:9,800. The required standard is 1:10,000.' },
            { step: 4, description: 'Evaluate whether the traverse meets the standard.', calculation: '1:9,800 is less precise than 1:10,000, so the traverse does NOT meet the 1:10,000 standard. The survey should be investigated for errors and potentially re-measured.' },
          ],
          answer: 'The linear error of closure is 0.25 ft, giving a closure ratio of 1:9,800. This does not meet the 1:10,000 standard for boundary surveys. The survey crew should investigate potential sources of error and consider re-measuring.',
        },
      },
      {
        id: 'ps-d2-documentation-s5',
        type: 'knowledge_check',
        title: 'Field Documentation Check',
        knowledgeCheck: {
          question: 'When a surveyor searches for a called-for monument but cannot find it, the field notes should:',
          options: [
            'Simply omit any mention of that corner',
            'Record that the monument was "not found" without further detail',
            'Document the search area, methods used, and negative results to demonstrate due diligence',
            'Assume the monument was destroyed and set a new one without notation',
          ],
          correctIndex: 2,
          explanation: 'Documenting the extent and methods of the search for a monument that was not found is essential. This "negative evidence" demonstrates the surveyor\'s due diligence and supports the professional judgment applied in establishing the corner position by other means.',
        },
      },
    ],
  },
  {
    id: 'ps-d2-reports',
    examTrack: 'ps',
    domainNumber: 2,
    domain: 'Professional Survey Practices',
    title: 'Survey Reports and Client Communication',
    description: 'How to prepare comprehensive survey reports, communicate findings effectively to clients and stakeholders, and document professional opinions and limitations of the survey.',
    estimatedMinutes: 16,
    sections: [
      {
        id: 'ps-d2-reports-s1',
        type: 'concept',
        title: 'Components of a Professional Survey Report',
        content: 'A professional survey report communicates the surveyor\'s findings, opinions, and conclusions to the client and other stakeholders. While not every survey requires a formal written report, complex boundary surveys, ALTA/NSPS Land Title Surveys, and surveys involving disputed boundaries benefit significantly from a comprehensive narrative report that explains the surveyor\'s analysis and reasoning.\n\nA well-structured survey report typically includes several key components. The introduction identifies the client, the purpose of the survey, the property surveyed, and the date of the fieldwork. The scope of services section describes what the surveyor was engaged to do and, equally important, what was not included in the engagement. This helps manage client expectations and limits the surveyor\'s liability exposure.\n\nThe research and evidence section describes the documents reviewed (deeds, plats, prior surveys, title commitments), the field evidence recovered, and the relationship between the record information and the physical conditions found on the ground. This section should describe each corner in detail, explaining what evidence was found, how the corner position was determined, and any discrepancies between the record and the field conditions.\n\nThe analysis and opinion section presents the surveyor\'s professional conclusions about the boundary locations, supported by the evidence described in the preceding sections. If there are conflicts or ambiguities in the evidence, the surveyor should explain the reasoning used to resolve them, referencing applicable legal principles and professional standards. The report should conclude with a clear statement of any limitations, caveats, or unresolved issues that the client should be aware of.'
      },
      {
        id: 'ps-d2-reports-s2',
        type: 'concept',
        title: 'Effective Client Communication',
        content: 'Clear communication is a hallmark of professional practice. Surveyors must be able to explain complex technical and legal concepts in terms that clients, attorneys, and other non-surveyors can understand. This requires translating professional jargon into plain language while maintaining technical accuracy. For example, instead of saying "the monument was obliterated and the corner was reestablished proportionately," a report might explain "the original marker was missing, and the corner position was calculated based on the proportional distances between the nearest surviving original markers."\n\nTimely communication is equally important. Clients should be informed promptly of any findings that may affect their project or transaction, particularly if the survey reveals potential boundary disputes, encroachments, or title defects. Waiting until the final report is delivered to disclose a significant problem can delay transactions, increase costs, and damage the client relationship.\n\nThe surveyor should also communicate the limitations of the survey clearly. No survey can guarantee absolute accuracy or resolve all potential disputes. If the surveyor was unable to access portions of the property, if certain records were unavailable, or if the boundary determination involves judgment calls that could reasonably be decided differently, these limitations should be disclosed. Transparency about limitations enhances credibility and protects both the surveyor and the client.\n\nWritten communication, including emails and letters, should be reviewed carefully before sending. A casually written email can become evidence in litigation, and statements made in informal communications may be construed as professional opinions. Many firms establish policies requiring review of significant client communications by a principal or senior surveyor before they are transmitted.'
      },
      {
        id: 'ps-d2-reports-s3',
        type: 'knowledge_check',
        title: 'Survey Report Components',
        knowledgeCheck: {
          question: 'In a professional survey report, the "scope of services" section primarily serves to:',
          options: [
            'List the equipment used during the survey',
            'Describe what the surveyor was and was not engaged to do',
            'Present the mathematical computations supporting the boundary determination',
            'Provide the legal description of the surveyed property',
          ],
          correctIndex: 1,
          explanation: 'The scope of services section defines the boundaries of the surveyor\'s engagement, describing what was included and what was excluded. This helps manage client expectations and limits liability by making clear what the surveyor was responsible for.',
        },
      },
      {
        id: 'ps-d2-reports-s4',
        type: 'knowledge_check',
        title: 'Client Communication Best Practices',
        knowledgeCheck: {
          question: 'A surveyor discovers a potential encroachment by a neighbor\'s garage onto the client\'s property during fieldwork. The best practice is to:',
          options: [
            'Wait until the final survey plat is delivered to inform the client',
            'Immediately remove the encroachment',
            'Promptly inform the client of the potential issue so they can take appropriate action',
            'Contact the neighbor directly to resolve the dispute',
          ],
          correctIndex: 2,
          explanation: 'Timely communication of significant findings is essential. The client should be informed promptly of potential encroachments or boundary issues so they can make informed decisions and take appropriate action, rather than being surprised when the final report is delivered.',
        },
      },
    ],
  },
  {
    id: 'ps-d2-expert',
    examTrack: 'ps',
    domainNumber: 2,
    domain: 'Professional Survey Practices',
    title: 'Expert Witness Testimony and Court Procedures',
    description: 'Preparing for and delivering expert witness testimony in boundary disputes and other surveying-related litigation, including courtroom procedures, rules of evidence, and effective presentation techniques.',
    estimatedMinutes: 18,
    sections: [
      {
        id: 'ps-d2-expert-s1',
        type: 'concept',
        title: 'The Surveyor as Expert Witness',
        content: 'Professional surveyors are frequently called upon to serve as expert witnesses in legal proceedings involving boundary disputes, easement conflicts, encroachments, construction defects, and property damage claims. Unlike lay witnesses, who may only testify about facts they personally observed, expert witnesses are permitted to offer professional opinions based on their specialized knowledge, training, and experience.\n\nTo qualify as an expert, the surveyor must demonstrate to the court that they possess the specialized knowledge, skill, experience, training, or education necessary to form a reliable opinion on the matter at issue. This qualification process, sometimes called voir dire, typically involves the attorney asking the surveyor about their educational background, professional licenses, years of experience, areas of specialty, publications, and prior testimony experience. The opposing attorney may challenge the expert\'s qualifications, and the judge ultimately decides whether the witness qualifies as an expert.\n\nThe standard for admissibility of expert testimony varies by jurisdiction. Under the Federal Rules of Evidence (Daubert standard), the expert\'s testimony must be based on sufficient facts or data, be the product of reliable principles and methods, and reflect a reliable application of those principles to the facts of the case. Some states follow the older Frye standard, which requires that the expert\'s methodology be generally accepted within the relevant scientific community. Regardless of the standard, the expert surveyor must be prepared to explain and defend their methodology.\n\nThe expert witness role requires a different mindset than typical professional practice. The expert\'s duty is to the court and to the truth, not to the party that retained them. While it is natural to want to support the client who is paying for the testimony, the expert must maintain objectivity and professional integrity. An expert who is perceived as an advocate rather than an impartial professional will quickly lose credibility with the judge or jury.'
      },
      {
        id: 'ps-d2-expert-s2',
        type: 'concept',
        title: 'Preparing for and Delivering Testimony',
        content: 'Effective expert testimony begins with thorough preparation. The expert should review all relevant documents, including deeds, plats, field notes, survey reports, and prior testimony, well in advance of the hearing or trial. The expert should meet with the retaining attorney to discuss the case, understand the legal issues, and prepare for both direct examination and cross-examination. However, the expert must never allow the attorney to tell them what opinion to hold; the opinion must be independently formed based on the evidence.\n\nDuring direct examination, the retaining attorney asks questions designed to elicit the expert\'s opinions and the basis for those opinions. The expert should explain complex surveying concepts in clear, accessible language, avoiding unnecessary jargon. Visual aids such as maps, diagrams, and photographs are extremely effective in helping the judge or jury understand the spatial relationships at issue. The expert should speak to the jury, not to the attorney, and maintain a calm, professional demeanor.\n\nCross-examination by the opposing attorney is designed to challenge the expert\'s opinions, methodology, or credibility. Common cross-examination strategies include questioning the expert\'s qualifications, highlighting facts the expert failed to consider, suggesting alternative interpretations of the evidence, and attempting to get the expert to make concessions or admissions that undermine their opinion. The expert should listen carefully to each question, take time to think before answering, respond directly and honestly, and avoid becoming argumentative or defensive.\n\nThe expert should be prepared for hypothetical questions, which ask the expert to assume certain facts and give an opinion based on those assumptions. The expert should also be prepared to acknowledge the limitations of their analysis and areas of genuine uncertainty. Attempting to overstate the certainty of an opinion or dodge legitimate questions will damage credibility far more than a candid acknowledgment of uncertainty.'
      },
      {
        id: 'ps-d2-expert-s3',
        type: 'knowledge_check',
        title: 'Expert Witness Qualifications',
        knowledgeCheck: {
          question: 'Under the Daubert standard for expert testimony, which of the following is NOT a requirement?',
          options: [
            'The testimony must be based on sufficient facts or data',
            'The testimony must be the product of reliable principles and methods',
            'The expert must have testified in at least five prior cases on the same topic',
            'The expert must have reliably applied the principles and methods to the facts of the case',
          ],
          correctIndex: 2,
          explanation: 'The Daubert standard does not require a minimum number of prior testimony experiences. It focuses on the reliability of the expert\'s methodology: sufficient facts/data, reliable principles/methods, and reliable application of those methods to the case facts.',
        },
      },
      {
        id: 'ps-d2-expert-s4',
        type: 'knowledge_check',
        title: 'Expert Witness Conduct',
        knowledgeCheck: {
          question: 'An expert witness surveyor\'s primary duty is to:',
          options: [
            'The attorney who retained them',
            'The party paying for their testimony',
            'The court and the truth',
            'The opposing party\'s surveyor',
          ],
          correctIndex: 2,
          explanation: 'The expert witness\'s primary duty is to the court and to the truth, regardless of which party retained them. Maintaining objectivity and professional integrity is essential for credibility and ethical practice.',
        },
      },
    ],
  },

  // ============================================================
  // DOMAIN 3: STANDARDS AND SPECIFICATIONS (4 readings)
  // ============================================================
  {
    id: 'ps-d3-alta',
    examTrack: 'ps',
    domainNumber: 3,
    domain: 'Standards and Specifications',
    title: 'ALTA/NSPS Land Title Survey Standards (2021)',
    description: 'A comprehensive overview of the 2021 ALTA/NSPS Minimum Standard Detail Requirements for Land Title Surveys, including mandatory requirements, Table A optional items, and certification language.',
    estimatedMinutes: 24,
    sections: [
      {
        id: 'ps-d3-alta-s1',
        type: 'concept',
        title: 'Purpose and Scope of the ALTA/NSPS Standards',
        content: 'The ALTA/NSPS Land Title Survey Standards, jointly adopted by the American Land Title Association and the National Society of Professional Surveyors, establish the minimum requirements for surveys used in connection with the issuance of title insurance. The current standards, adopted in 2021, represent the most widely recognized and frequently referenced survey standard in the United States for commercial real estate transactions.\n\nThe standards apply specifically to Land Title Surveys, which are boundary surveys that show the relationship between the boundaries of the surveyed property and the improvements, easements, and other matters that affect title and use of the property. A Land Title Survey is distinct from a simple boundary survey because it requires the surveyor to research and depict a broader range of information, including matters shown in the title commitment or title report provided by the title company.\n\nThe 2021 standards contain several sections covering general requirements, accuracy standards, boundary determination, identification of improvements and features, certification requirements, and the Table A optional items. The surveyor performing an ALTA/NSPS survey must be familiar with all sections and must certify compliance with the standards. The certification must be addressed to specifically named parties, typically including the buyer, lender, and title company.\n\nA critical aspect of the ALTA/NSPS standards is the requirement that the surveyor be provided with a current title commitment or title report. The surveyor must examine this document and locate, on the ground and on the survey map, all easements, servitudes, rights-of-way, and other matters referenced in the title commitment that can be located from record descriptions. Matters that cannot be located must be noted on the survey as exceptions. This requirement distinguishes an ALTA/NSPS survey from a standard boundary survey and significantly increases both the scope of work and the value of the survey to the client.'
      },
      {
        id: 'ps-d3-alta-s2',
        type: 'concept',
        title: 'Table A Optional Items',
        content: 'Table A of the ALTA/NSPS standards lists optional survey responsibilities that may be negotiated between the surveyor and the client. These items expand the scope of the survey beyond the minimum requirements and are selected by checking the corresponding items on the Table A list. The surveyor is not required to perform any Table A items unless specifically requested by the client and agreed to by the surveyor.\n\nTable A items cover a wide range of additional services. Item 1 addresses monuments, giving the client options for setting new monuments at property corners. Item 2 addresses address and tax identification information. Item 3 relates to flood zone classification, requiring the surveyor to indicate the FEMA flood zone designation and, if applicable, show the location of the flood zone boundary on the survey. Item 4 covers gross land area calculations. Items 5 and 6 relate to zoning information, with Item 5 requiring a zoning report from an outside specialist and Item 6 requiring the surveyor to provide certain zoning-related information.\n\nItem 8 addresses significant observations, requiring the surveyor to locate and identify cemeteries, evidence of current or past mining activity, water features, and other significant observations within or adjacent to the property. Item 11 addresses utilities, one of the most frequently requested items, requiring the surveyor to show the location of above-ground utility lines, poles, and connections, as well as evidence of underground utilities such as manhole covers, valve boxes, and meters.\n\nItems 17 through 19 address survey-grade location of improvements, boundary walls, and building corners with coordinates and elevations beyond the standard requirement. Item 20 provides for an as-built survey showing the relationship between buildings under construction and the property boundaries. Each Table A item adds cost and time to the survey, and the surveyor should clearly communicate the implications of each requested item to the client during the engagement process.'
      },
      {
        id: 'ps-d3-alta-s3',
        type: 'formula',
        title: 'ALTA/NSPS Relative Positional Precision',
        formula: {
          expression: 'RPP = 2 * sqrt(su^2 + sv^2)',
          variables: [
            { symbol: 'RPP', description: 'Relative Positional Precision, the maximum allowable uncertainty in the position of any point relative to any other point on the survey' },
            { symbol: 'su', description: 'Standard uncertainty in one coordinate direction (e.g., northing)' },
            { symbol: 'sv', description: 'Standard uncertainty in the orthogonal coordinate direction (e.g., easting)' },
          ],
          whenToUse: 'The 2021 ALTA/NSPS standards require a Relative Positional Precision of 2 cm (0.07 ft) or better, at the 95% confidence level, for all points on the survey relative to any other points on the survey. This standard applies to both boundary corners and improvements shown on the survey.',
        },
      },
      {
        id: 'ps-d3-alta-s4',
        type: 'knowledge_check',
        title: 'ALTA/NSPS Requirements',
        knowledgeCheck: {
          question: 'Which of the following is a mandatory requirement of the 2021 ALTA/NSPS standards, NOT a Table A optional item?',
          options: [
            'Providing the FEMA flood zone designation',
            'Setting new monuments at all property corners',
            'Examining the title commitment and locating referenced easements on the ground',
            'Computing the gross land area in acres',
          ],
          correctIndex: 2,
          explanation: 'Examining the title commitment and locating easements and other matters referenced therein is a mandatory requirement of the ALTA/NSPS standards. Flood zone designation (Item 3), monument setting (Item 1), and gross area computation (Item 4) are all Table A optional items.',
        },
      },
      {
        id: 'ps-d3-alta-s5',
        type: 'knowledge_check',
        title: 'ALTA/NSPS Accuracy Standard',
        knowledgeCheck: {
          question: 'The 2021 ALTA/NSPS standards require a Relative Positional Precision of:',
          options: [
            '0.5 feet (15 cm) or better at the 95% confidence level',
            '0.1 feet (3 cm) or better at the 68% confidence level',
            '2 cm (0.07 feet) or better at the 95% confidence level',
            '1 cm (0.03 feet) or better at the 99% confidence level',
          ],
          correctIndex: 2,
          explanation: 'The 2021 ALTA/NSPS standards establish a Relative Positional Precision requirement of 2 cm (0.07 feet) or better at the 95% confidence level for all points shown on the survey, relative to any other points on the survey.',
        },
      },
    ],
  },
  {
    id: 'ps-d3-fema',
    examTrack: 'ps',
    domainNumber: 3,
    domain: 'Standards and Specifications',
    title: 'FEMA Flood Zone Determinations and Elevation Certificates',
    description: 'Understanding FEMA flood zone classifications, the National Flood Insurance Program, and the preparation and certification of Elevation Certificates used for flood insurance rating and floodplain management.',
    estimatedMinutes: 20,
    sections: [
      {
        id: 'ps-d3-fema-s1',
        type: 'concept',
        title: 'FEMA Flood Zone Classifications',
        content: 'The Federal Emergency Management Agency (FEMA) administers the National Flood Insurance Program (NFIP) and publishes Flood Insurance Rate Maps (FIRMs) that delineate flood hazard areas. Surveyors must understand flood zone classifications because clients frequently need flood zone determinations for real estate transactions, building permits, and insurance purposes.\n\nSpecial Flood Hazard Areas (SFHAs) are areas that have a 1% or greater annual chance of flooding, commonly referred to as the 100-year floodplain. These areas are designated as Zone A (approximate study, no base flood elevation determined), Zone AE (detailed study with base flood elevations determined), Zone AH (areas of shallow flooding with a base flood depth of 1-3 feet), Zone AO (areas of shallow flooding with sheet flow), and Zone VE (coastal areas subject to wave action with base flood elevations determined). Properties in SFHAs are subject to mandatory flood insurance purchase requirements if the property has a federally-backed mortgage.\n\nModerate flood risk areas, designated as Zone B or Zone X (shaded), have a 0.2% to 1% annual chance of flooding (between the 100-year and 500-year flood levels). Minimal flood risk areas, designated as Zone C or Zone X (unshaded), are outside the 500-year floodplain. Flood insurance is not required in these zones but is available and often recommended.\n\nSurveyors must be able to read and interpret FIRMs, identify the flood zone affecting a particular property, and locate flood zone boundaries on the ground. When a property is near a flood zone boundary, the surveyor may be asked to prepare a Letter of Map Amendment (LOMA) application to demonstrate that the property or structure is above the base flood elevation and should be removed from the SFHA. This process requires an Elevation Certificate showing the relationship between the structure and the base flood elevation.'
      },
      {
        id: 'ps-d3-fema-s2',
        type: 'concept',
        title: 'Elevation Certificates',
        content: 'The FEMA Elevation Certificate (FEMA Form 086-0-33) is a critical document used to provide elevation data necessary for flood insurance rating, floodplain management, and Letters of Map Amendment. Only a licensed surveyor, engineer, or architect who is authorized by state or local law to certify elevation information may complete the certificate.\n\nThe Elevation Certificate requires the surveyor to determine several key elevations relative to the same vertical datum used by the FIRM (typically NAVD 88). These include the top of the bottom floor (including basement), the top of the next higher floor, the bottom of the lowest horizontal structural member (for buildings with crawlspaces or in V zones), the lowest adjacent grade elevation (the lowest ground elevation touching the building), and the highest adjacent grade elevation.\n\nThe Base Flood Elevation (BFE) is the elevation of the flood level that has a 1% chance of being reached or exceeded in any given year. The BFE is determined from the FIRM for Zone AE and is shown as contour lines or profiles on the map. The relationship between the building\'s lowest floor elevation and the BFE is the primary factor in determining flood insurance premiums. A building with its lowest floor above the BFE will have significantly lower premiums than one below the BFE.\n\nSurveyors completing Elevation Certificates must exercise particular care in identifying the correct FIRM panel, determining the appropriate BFE, establishing accurate elevations on the correct datum, and correctly identifying the building characteristics that affect the certificate entries. Errors on Elevation Certificates can result in incorrect insurance ratings, denied LOMA applications, and significant financial harm to property owners. The surveyor\'s professional liability exposure in connection with Elevation Certificates is substantial.'
      },
      {
        id: 'ps-d3-fema-s3',
        type: 'worked_example',
        title: 'Evaluating Flood Insurance Requirement',
        workedExample: {
          problem: 'A property owner\'s building has a lowest floor elevation of 342.8 ft (NAVD 88). The FIRM shows the property is in Zone AE with a Base Flood Elevation (BFE) of 340.5 ft (NAVD 88). The property has a federally-backed mortgage. Determine whether flood insurance is required and how the elevation compares to the BFE.',
          steps: [
            { step: 1, description: 'Identify the flood zone designation.', calculation: 'Zone AE is a Special Flood Hazard Area (SFHA) with determined BFE' },
            { step: 2, description: 'Compare the lowest floor elevation to the BFE.', calculation: 'Lowest floor = 342.8 ft; BFE = 340.5 ft; Difference = 342.8 - 340.5 = +2.3 ft above BFE' },
            { step: 3, description: 'Determine flood insurance requirement.', calculation: 'The property is in a SFHA (Zone AE) and has a federally-backed mortgage, so flood insurance IS required regardless of the floor elevation relative to the BFE.' },
            { step: 4, description: 'Assess potential for LOMA application.', calculation: 'Although the lowest floor is 2.3 ft above the BFE, the property is still within the mapped SFHA. A LOMA could potentially be pursued if the natural grade (not just the floor) is above the BFE, demonstrating the structure is on natural high ground.' },
          ],
          answer: 'Flood insurance is required because the property is in Zone AE (a SFHA) with a federally-backed mortgage. The lowest floor is 2.3 feet above the BFE, which should result in favorable insurance premiums. The owner may wish to explore a LOMA application to potentially remove the mandatory purchase requirement if natural grade elevations support it.',
        },
      },
      {
        id: 'ps-d3-fema-s4',
        type: 'knowledge_check',
        title: 'FEMA Flood Zone Check',
        knowledgeCheck: {
          question: 'A property located in Zone X (unshaded) on a FEMA FIRM is:',
          options: [
            'In a Special Flood Hazard Area with a 1% annual chance of flooding',
            'In a coastal high hazard area subject to wave action',
            'In a minimal flood risk area outside the 500-year floodplain',
            'In a moderate flood risk area between the 100-year and 500-year floodplains',
          ],
          correctIndex: 2,
          explanation: 'Zone X (unshaded) represents minimal flood risk areas outside the 500-year floodplain. Zone X (shaded) represents moderate risk between the 100-year and 500-year flood levels. Zones A and AE are SFHAs, and Zone VE is a coastal high hazard area.',
        },
      },
    ],
  },
  {
    id: 'ps-d3-accuracy',
    examTrack: 'ps',
    domainNumber: 3,
    domain: 'Standards and Specifications',
    title: 'Accuracy Standards and Specifications',
    description: 'Understanding the accuracy classification systems published by FGCS, ASPRS, and other standards-setting bodies, and how they apply to different types of surveys and mapping products.',
    estimatedMinutes: 20,
    sections: [
      {
        id: 'ps-d3-accuracy-s1',
        type: 'concept',
        title: 'FGCS Accuracy Standards for Geodetic Networks',
        content: 'The Federal Geodetic Control Subcommittee (FGCS) publishes accuracy standards for geodetic control surveys that define the precision requirements for horizontal and vertical control networks. These standards classify control survey accuracy into orders and classes based on the allowable uncertainty in the positions of survey control points.\n\nFor horizontal control, the FGCS standards define accuracy orders from First Order (the highest accuracy) through Third Order. First Order horizontal control requires a relative accuracy of 1:100,000 or better, meaning the uncertainty in the distance between any two points in the network does not exceed 1 part in 100,000. Second Order Class I requires 1:50,000, Second Order Class II requires 1:20,000, and Third Order requires 1:10,000 or better. These standards apply to conventional triangulation, trilateration, and traverse networks, as well as to GPS/GNSS surveys.\n\nFor vertical control (leveling), the FGCS standards define accuracy based on the allowable closure error as a function of the distance leveled. First Order Class I leveling allows a closure of 3 mm * sqrt(K), where K is the distance in kilometers. First Order Class II allows 4 mm * sqrt(K). Second Order Class I allows 6 mm * sqrt(K), and Second Order Class II allows 8 mm * sqrt(K). Third Order allows 12 mm * sqrt(K). These standards ensure that leveling networks maintain consistent accuracy over varying distances.\n\nIn modern practice, FGCS has adopted a network accuracy approach that classifies the accuracy of individual control points relative to the National Spatial Reference System (NSRS) rather than classifying entire networks. Under this approach, each control point receives a positional accuracy value expressed as a 95% confidence region. This approach better accommodates the varying accuracy of GPS/GNSS observations and allows for more flexible network design.'
      },
      {
        id: 'ps-d3-accuracy-s2',
        type: 'formula',
        title: 'Leveling Closure Tolerance',
        formula: {
          expression: 'Allowable Closure = C * sqrt(K)',
          variables: [
            { symbol: 'Allowable Closure', description: 'Maximum permissible misclosure for the leveling circuit, in millimeters' },
            { symbol: 'C', description: 'Constant based on the order and class of leveling (e.g., 3 mm for First Order Class I, 8 mm for Second Order Class II, 12 mm for Third Order)' },
            { symbol: 'K', description: 'Total distance of the leveling circuit, in kilometers' },
          ],
          whenToUse: 'Use to determine whether a level circuit meets the required accuracy standard. Compute the actual misclosure from the leveling data, then compare it against the allowable closure calculated from this formula. If the actual misclosure exceeds the allowable value, the leveling must be repeated.',
        },
      },
      {
        id: 'ps-d3-accuracy-s3',
        type: 'worked_example',
        title: 'Evaluating Leveling Accuracy',
        workedExample: {
          problem: 'A leveling circuit with a total distance of 4.5 km has a misclosure of 15 mm. Does this circuit meet Second Order Class II accuracy standards (C = 8 mm)?',
          steps: [
            { step: 1, description: 'Compute the allowable closure for Second Order Class II.', calculation: 'Allowable = 8 * sqrt(4.5) = 8 * 2.121 = 16.97 mm' },
            { step: 2, description: 'Compare the actual misclosure to the allowable closure.', calculation: 'Actual = 15 mm; Allowable = 16.97 mm; 15 < 16.97' },
            { step: 3, description: 'Determine if the standard is met.', calculation: 'The actual misclosure (15 mm) is less than the allowable closure (16.97 mm), so the circuit meets Second Order Class II standards.' },
          ],
          answer: 'Yes, the leveling circuit meets Second Order Class II standards. The actual misclosure of 15 mm is within the allowable closure of 16.97 mm (= 8 * sqrt(4.5)).',
        },
      },
      {
        id: 'ps-d3-accuracy-s4',
        type: 'concept',
        title: 'ASPRS Positional Accuracy Standards for Mapping',
        content: 'The American Society for Photogrammetry and Remote Sensing (ASPRS) publishes positional accuracy standards for maps and geospatial data. The current ASPRS Positional Accuracy Standards for Digital Geospatial Data (2014) replaced the older National Map Accuracy Standards (NMAS) and provide a more flexible, statistically rigorous framework for assessing the accuracy of mapping products.\n\nUnder the ASPRS standards, horizontal accuracy is expressed as Root Mean Square Error (RMSE) in the X and Y directions, computed from a comparison of map coordinates against independently surveyed check points. The horizontal accuracy at the 95% confidence level is computed as 1.7308 * RMSEr, where RMSEr is the radial RMSE combining the X and Y components. Vertical accuracy is similarly expressed as RMSEz, with the 95% confidence level accuracy equal to 1.9600 * RMSEz for normally distributed errors.\n\nThe ASPRS standards define accuracy classes based on the RMSE values. Rather than fixed classes like the old NMAS, the current standards allow the specification of any desired accuracy level. For example, a project might specify 5-cm horizontal accuracy (RMSEr) and 10-cm vertical accuracy (RMSEz). The standards then prescribe the number and distribution of check points needed to validate that the product meets the specified accuracy.\n\nSurveyors involved in photogrammetric mapping, LiDAR data collection, UAV (drone) surveys, and other remote sensing applications must understand these standards to properly design control networks, specify project accuracy requirements, and validate deliverables. The control survey supporting the mapping project must be substantially more accurate than the mapping accuracy requirement, typically three to five times more precise, to avoid introducing control errors into the mapping accuracy assessment.'
      },
      {
        id: 'ps-d3-accuracy-s5',
        type: 'knowledge_check',
        title: 'Accuracy Standards Check',
        knowledgeCheck: {
          question: 'A First Order Class I level circuit has a total distance of 9 km. What is the maximum allowable closure?',
          options: [
            '3 mm',
            '9 mm',
            '12 mm',
            '27 mm',
          ],
          correctIndex: 1,
          explanation: 'First Order Class I leveling has a closure tolerance of 3 mm * sqrt(K), where K is the distance in kilometers. For K = 9: 3 * sqrt(9) = 3 * 3 = 9 mm maximum allowable closure.',
        },
      },
    ],
  },
  {
    id: 'ps-d3-mts',
    examTrack: 'ps',
    domainNumber: 3,
    domain: 'Standards and Specifications',
    title: 'State Minimum Technical Standards',
    description: 'Understanding the purpose, common elements, and variations of state minimum technical standards for surveying, including monument requirements, accuracy requirements, and plat preparation standards.',
    estimatedMinutes: 16,
    sections: [
      {
        id: 'ps-d3-mts-s1',
        type: 'concept',
        title: 'Purpose and Authority of Minimum Technical Standards',
        content: 'Most states have adopted minimum technical standards (MTS) for the practice of surveying. These standards are typically promulgated by the state board of licensure or registration for professional surveyors and carry the force of law within the jurisdiction. Compliance with MTS is a condition of licensure, and violation can result in disciplinary action including reprimand, fine, suspension, or revocation of the surveyor\'s license.\n\nThe purpose of MTS is to establish a baseline of professional performance that protects the public. While the standard of care in professional practice is ultimately determined by the courts, MTS provide a concrete set of requirements that define the minimum acceptable level of performance. Surveyors are expected to meet or exceed MTS on every project; performing below MTS is virtually indefensible in a professional liability claim.\n\nMTS vary significantly from state to state, reflecting differences in local conditions, legal traditions, and professional customs. However, several common themes appear across most state standards. These include requirements for research of public records prior to performing fieldwork, minimum accuracy standards for boundary surveys, requirements for monument types and sizes, standards for plat preparation and content, requirements for the surveyor\'s seal, signature, and certification, and continuing education requirements for maintaining licensure.\n\nProfessional surveyors who practice in multiple states must be familiar with the MTS of each state in which they work. A surveyor licensed in one state may not assume that the standards of that state apply when performing work in another jurisdiction. Ignorance of the applicable MTS is not a defense to a violation, and the surveyor bears the responsibility to research and comply with the requirements of each jurisdiction in which they practice.'
      },
      {
        id: 'ps-d3-mts-s2',
        type: 'concept',
        title: 'Common MTS Elements: Monuments, Plats, and Accuracy',
        content: 'Monument requirements in MTS typically specify the minimum type, size, and material for survey markers. Common requirements include iron rods or pipes of a specified minimum diameter (often 1/2 inch or 5/8 inch) and length (typically 18 inches or longer), with an identification cap bearing the surveyor\'s name or license number. Some states require specific monument types for different situations, such as concrete monuments for subdivision corners or brass discs for permanent reference monuments.\n\nPlat and map preparation standards in MTS address the content, format, and presentation of survey plats. Common requirements include a north arrow, graphic scale, legend, legal description of the surveyed property, bearing and distance for all boundary lines, identification of monuments found and set, names and recording references of adjoining properties, and the location of improvements, easements, and rights-of-way. The surveyor\'s seal, signature, and date are universally required, and many states specify the form of certification language that must appear on the plat.\n\nAccuracy requirements in MTS vary widely. Some states specify minimum closure ratios for boundary surveys (e.g., 1:10,000 or 1:15,000), while others reference the ALTA/NSPS standards or FGCS orders of accuracy. Some states distinguish between different types of surveys (boundary, construction, control) and specify different accuracy requirements for each. Vertical accuracy requirements for elevation surveys may reference FGCS leveling standards or specify a fixed tolerance per mile of leveling.\n\nMany states also include specific requirements for PLSS surveys, construction surveys, subdivision surveys, and other specialty areas. Continuing education requirements typically mandate a minimum number of hours per renewal period, with specified amounts in professional ethics, legal topics, and technical subjects. The surveyor should maintain a current copy of the MTS for each state in which they practice and review it regularly for updates and amendments.'
      },
      {
        id: 'ps-d3-mts-s3',
        type: 'knowledge_check',
        title: 'Minimum Technical Standards',
        knowledgeCheck: {
          question: 'Minimum technical standards for surveying are typically established by:',
          options: [
            'The Federal Geodetic Control Subcommittee (FGCS)',
            'The American Land Title Association (ALTA)',
            'The state board of licensure or registration for professional surveyors',
            'The Bureau of Land Management (BLM)',
          ],
          correctIndex: 2,
          explanation: 'Minimum technical standards are promulgated by state licensing or registration boards and carry the force of law within the jurisdiction. Federal agencies like FGCS establish accuracy standards for geodetic networks, and ALTA/NSPS standards apply specifically to land title surveys, but MTS are state-level regulatory requirements.',
        },
      },
      {
        id: 'ps-d3-mts-s4',
        type: 'knowledge_check',
        title: 'MTS Compliance',
        knowledgeCheck: {
          question: 'A surveyor licensed in State A performs a boundary survey on property located in State B, where the surveyor also holds a license. Which state\'s minimum technical standards apply?',
          options: [
            'State A, where the surveyor\'s primary office is located',
            'State B, where the property is located',
            'Whichever state\'s standards are more stringent',
            'Federal standards supersede both state standards',
          ],
          correctIndex: 1,
          explanation: 'The minimum technical standards of the state where the property is located (State B) apply to the survey. Surveyors practicing in multiple jurisdictions must comply with the MTS of each state in which the surveyed property is situated.',
        },
      },
    ],
  },

  // ============================================================
  // DOMAIN 4: BUSINESS PRACTICES (3 readings)
  // ============================================================
  {
    id: 'ps-d4-entities',
    examTrack: 'ps',
    domainNumber: 4,
    domain: 'Business Practices',
    title: 'Business Entity Types and Formation',
    description: 'Understanding the various business entity structures available to professional surveyors, including sole proprietorship, partnerships, corporations, and limited liability companies, with their respective advantages and disadvantages.',
    estimatedMinutes: 16,
    sections: [
      {
        id: 'ps-d4-entities-s1',
        type: 'concept',
        title: 'Sole Proprietorship and Partnerships',
        content: 'Choosing the appropriate business entity is one of the most important decisions a surveyor makes when starting or reorganizing a practice. The simplest form is the sole proprietorship, in which one individual owns and operates the business. No formal filing is required to create a sole proprietorship; it comes into existence simply when the individual begins conducting business. The owner has complete control over all business decisions and retains all profits.\n\nHowever, the sole proprietorship carries a critical disadvantage: unlimited personal liability. The owner is personally responsible for all business debts, obligations, and liabilities. If the business is sued for professional negligence, the owner\'s personal assets, including home, vehicles, and savings, are at risk. There is no legal separation between the business and the owner. For tax purposes, the sole proprietor reports business income and expenses on Schedule C of their personal income tax return, and the business itself does not file a separate tax return.\n\nGeneral partnerships involve two or more individuals who agree to share the profits, losses, and management of a business. Like sole proprietorships, general partnerships expose the partners to unlimited personal liability, and each partner may be held liable for the acts of the other partners within the scope of the partnership business. This joint and several liability means that one partner\'s professional error can expose the personal assets of all partners.\n\nLimited partnerships (LPs) consist of at least one general partner with unlimited liability and one or more limited partners whose liability is limited to their investment. Limited partners typically do not participate in management. Limited liability partnerships (LLPs) are available in many states for professional firms and provide each partner with protection from the malpractice liability of other partners, while still allowing all partners to participate in management. LLPs are increasingly popular among surveying firms because they combine the tax advantages of a partnership with some degree of liability protection.'
      },
      {
        id: 'ps-d4-entities-s2',
        type: 'concept',
        title: 'Corporations and Limited Liability Companies',
        content: 'A corporation is a legal entity separate from its owners (shareholders). The primary advantage of incorporating is limited liability: shareholders are generally not personally liable for the debts and obligations of the corporation. The corporation can own property, enter contracts, sue and be sued, and incur debt in its own name. However, it is important to note that many state licensing boards require that a professional surveying corporation be organized under special professional corporation statutes and that the principal shareholders and officers hold appropriate professional licenses.\n\nCorporations come in two primary tax structures. A C corporation is a separate taxable entity that pays its own income tax on profits. When those profits are distributed to shareholders as dividends, they are taxed again at the individual level, creating so-called "double taxation." An S corporation avoids double taxation by passing income, losses, deductions, and credits through to shareholders, who report them on their individual tax returns. To qualify as an S corporation, the entity must meet certain requirements, including having no more than 100 shareholders, only one class of stock, and only U.S. citizen or resident shareholders.\n\nThe Limited Liability Company (LLC) has become the most popular business entity for small to mid-size surveying firms. An LLC provides its members (owners) with limited liability protection similar to a corporation, while offering the flexibility and tax advantages of a partnership. An LLC can be taxed as a partnership (pass-through taxation) or can elect to be taxed as a corporation. The operating agreement of an LLC governs the management structure, profit distribution, and member responsibilities, providing significant flexibility in structuring the business.\n\nWhen selecting a business entity, surveyors should consider several factors: liability protection, tax implications, management structure, ease of formation and maintenance, ability to attract investors or additional partners, succession planning, and compliance with state professional licensing requirements. Most states require that surveying firms be owned and managed by licensed surveyors, which can restrict the types of entities available and the ownership structures permitted.'
      },
      {
        id: 'ps-d4-entities-s3',
        type: 'knowledge_check',
        title: 'Business Entity Selection',
        knowledgeCheck: {
          question: 'Which business entity type exposes the owner\'s personal assets to the greatest risk from business liabilities?',
          options: [
            'Limited Liability Company (LLC)',
            'S Corporation',
            'Sole Proprietorship',
            'Limited Liability Partnership (LLP)',
          ],
          correctIndex: 2,
          explanation: 'A sole proprietorship provides no separation between business and personal assets. The owner has unlimited personal liability for all business debts and obligations. LLCs, corporations, and LLPs all provide some degree of liability protection.',
        },
      },
      {
        id: 'ps-d4-entities-s4',
        type: 'knowledge_check',
        title: 'Corporate Taxation',
        knowledgeCheck: {
          question: 'The term "double taxation" most closely applies to which business entity type?',
          options: [
            'Sole proprietorship',
            'C Corporation',
            'S Corporation',
            'Limited Liability Company taxed as a partnership',
          ],
          correctIndex: 1,
          explanation: 'Double taxation occurs with C corporations because the corporation pays income tax on its profits, and then shareholders pay income tax again when those profits are distributed as dividends. S corporations and LLCs taxed as partnerships avoid double taxation through pass-through taxation.',
        },
      },
    ],
  },
  {
    id: 'ps-d4-contracts',
    examTrack: 'ps',
    domainNumber: 4,
    domain: 'Business Practices',
    title: 'Contracts, Proposals, and Fee Structures',
    description: 'Essential knowledge of contract law as it applies to surveying engagements, including proposal writing, fee estimation methods, and key contract provisions that protect the surveyor and define the scope of work.',
    estimatedMinutes: 18,
    sections: [
      {
        id: 'ps-d4-contracts-s1',
        type: 'concept',
        title: 'Elements of a Valid Contract',
        content: 'A contract is a legally enforceable agreement between two or more parties. For a contract to be valid, it must contain four essential elements: offer, acceptance, consideration, and capacity. The surveyor\'s proposal is typically the offer, setting forth the services to be performed, the fee, and the terms and conditions. The client\'s acceptance, whether by signature, written confirmation, or conduct (such as authorizing the surveyor to begin work), completes the agreement. Consideration is the exchange of value: the surveyor provides professional services, and the client pays the agreed fee. Both parties must have the legal capacity to enter into the contract.\n\nA well-drafted surveying contract or engagement letter should clearly define the scope of services. This is the single most important provision in the contract because it determines what the surveyor is obligated to do and, equally importantly, what is excluded from the engagement. Ambiguous scope definitions are a frequent source of disputes between surveyors and clients. The scope should identify the type of survey to be performed, the property to be surveyed, the applicable standards (e.g., ALTA/NSPS, state MTS), any Table A items requested, and the deliverables (plat, report, digital files).\n\nOther important contract provisions include the fee arrangement and payment terms, the timeline for completion, the client\'s obligations (providing access, title commitments, and other documents), limitation of liability clauses, indemnification provisions, dispute resolution mechanisms (mediation, arbitration, or litigation), and ownership of work product. The surveyor should also address the right to rely on information provided by the client and the disclaimer of warranty for conditions not observable during the survey.\n\nMany professional organizations and legal consultants recommend that surveying contracts include a limitation of liability clause that caps the surveyor\'s maximum liability at the amount of the fee or the limits of the surveyor\'s professional liability insurance. While the enforceability of such clauses varies by jurisdiction, they can provide meaningful protection against catastrophic claims and help keep insurance premiums manageable.'
      },
      {
        id: 'ps-d4-contracts-s2',
        type: 'concept',
        title: 'Fee Structures and Estimation',
        content: 'Surveyors typically price their services using one of several fee structures. Lump sum (fixed fee) pricing commits the surveyor to performing the defined scope of work for a single agreed price, regardless of the actual time and costs incurred. This approach is preferred by many clients because it provides budget certainty, but it places the risk of cost overruns on the surveyor. Accurate scope definition and careful cost estimation are essential for profitable lump sum engagements.\n\nTime and materials pricing bills the client for actual hours worked at specified hourly rates, plus reimbursable expenses such as travel, filing fees, and subcontractor costs. This approach shifts the risk of cost overruns to the client and is appropriate when the scope of work is uncertain or when the project involves unpredictable conditions such as difficult terrain, uncertain monument recovery, or complex title research. Many time and materials contracts include a not-to-exceed amount to give the client some budget protection.\n\nUnit price contracts are common in construction surveying, where the surveyor\'s fee is based on the number of units staked (e.g., per lot, per station, per monument set). This approach works well when the scope can be quantified in discrete units but the total quantity may vary. Cost-plus contracts reimburse the surveyor for all direct costs plus a percentage markup or management fee, and are less common in private practice but may be used on government contracts.\n\nWhen estimating fees, the surveyor should consider all project costs: field labor, office labor, equipment, vehicle, research, monument materials, subcontractor fees (title search, utility locates), overhead, and profit margin. A common mistake is underestimating the time required for research, title review, evidence analysis, and report preparation, which can represent a significant portion of the total effort on complex boundary surveys. The surveyor should also factor in the cost of potential callbacks, corrections, and the time required for client communication and project management.'
      },
      {
        id: 'ps-d4-contracts-s3',
        type: 'knowledge_check',
        title: 'Contract Essentials',
        knowledgeCheck: {
          question: 'Which provision in a surveying contract is considered the most important for preventing disputes between the surveyor and client?',
          options: [
            'The payment schedule',
            'The limitation of liability clause',
            'The scope of services definition',
            'The dispute resolution clause',
          ],
          correctIndex: 2,
          explanation: 'The scope of services is the most important provision because it defines exactly what the surveyor is obligated to do and what is excluded. Ambiguous scope definitions are the most frequent source of contract disputes in surveying practice.',
        },
      },
      {
        id: 'ps-d4-contracts-s4',
        type: 'knowledge_check',
        title: 'Fee Structure Selection',
        knowledgeCheck: {
          question: 'When the scope of a boundary survey is uncertain due to complex title history and unknown monument conditions, which fee structure best protects the surveyor from cost overruns?',
          options: [
            'Lump sum (fixed fee)',
            'Time and materials with a not-to-exceed cap',
            'Unit price per corner set',
            'Percentage of property value',
          ],
          correctIndex: 1,
          explanation: 'Time and materials pricing is most appropriate when the scope is uncertain, as it bills for actual work performed rather than committing to a fixed price. Adding a not-to-exceed cap provides the client with some budget protection while still protecting the surveyor from significant cost overruns.',
        },
      },
    ],
  },
  {
    id: 'ps-d4-risk',
    examTrack: 'ps',
    domainNumber: 4,
    domain: 'Business Practices',
    title: 'Risk Management and Insurance',
    description: 'Strategies for managing professional risk in surveying practice, including professional liability (errors and omissions) insurance, general liability insurance, workers\' compensation, and proactive risk reduction techniques.',
    estimatedMinutes: 16,
    sections: [
      {
        id: 'ps-d4-risk-s1',
        type: 'concept',
        title: 'Professional Liability Insurance',
        content: 'Professional liability insurance, commonly known as errors and omissions (E&O) insurance, protects the surveyor against claims arising from professional negligence, errors, or omissions in the performance of surveying services. Unlike general liability insurance, which covers bodily injury and property damage from general business operations, professional liability insurance specifically covers financial losses resulting from the surveyor\'s professional work product.\n\nProfessional liability policies are typically written on a "claims-made" basis, meaning the policy in effect at the time the claim is reported provides coverage, regardless of when the alleged error occurred. This differs from an "occurrence" policy, which covers events that occur during the policy period. The claims-made structure means that the surveyor must maintain continuous coverage to avoid gaps; if the policy lapses, claims arising from past work may not be covered. Many policies offer an "extended reporting period" or "tail coverage" that provides protection after the policy ends.\n\nPremiums for professional liability insurance are influenced by several factors, including the firm\'s annual revenue, the types of services performed, the firm\'s claims history, the policy limits and deductible, and the geographic area of practice. Firms that perform high-risk work, such as ALTA/NSPS surveys, construction staking, and flood elevation certificates, generally pay higher premiums than firms limited to lower-risk services. A clean claims history can result in significant premium reductions over time.\n\nWhile professional liability insurance is not legally required in all states, it is strongly recommended and is often required by clients, particularly in commercial real estate transactions. Many ALTA/NSPS survey certifications require the surveyor to carry minimum levels of professional liability coverage. The surveyor should carefully review the policy terms, including coverage limits, deductible, exclusions, and the definition of "professional services," to ensure adequate protection.'
      },
      {
        id: 'ps-d4-risk-s2',
        type: 'concept',
        title: 'Proactive Risk Reduction Strategies',
        content: 'The best risk management strategy is to prevent claims from arising in the first place. Proactive risk reduction involves implementing practices and procedures that minimize the likelihood of errors and the exposure to claims. Quality control is the foundation of risk reduction: thorough research, careful fieldwork, independent checking of computations, and comprehensive documentation all reduce the probability of delivering a defective work product.\n\nClear communication with clients is another critical risk reduction tool. Many claims arise not from actual errors but from misunderstandings about what the surveyor was engaged to do. Using detailed engagement letters or contracts that clearly define the scope of services, deliverables, and limitations prevents scope disputes. Confirming instructions in writing, documenting meetings and phone conversations, and providing progress updates help maintain alignment between the surveyor\'s work and the client\'s expectations.\n\nSelective client acceptance is an often-overlooked risk management strategy. Not all potential clients are good clients. Warning signs include clients who pressure the surveyor to cut corners, clients who refuse to sign a contract, clients with a history of disputes with prior surveyors, and projects that require the surveyor to work outside their area of competence. The ability to decline an engagement is a powerful risk management tool.\n\nOther risk reduction strategies include maintaining adequate staffing levels to avoid rushing or cutting corners, investing in continuing education and professional development, staying current with changes in standards and technology, maintaining equipment in proper calibration, and participating in peer review programs. Many insurance companies offer risk management resources, including sample contracts, checklists, and webinars, that can help surveying firms reduce their exposure to claims.'
      },
      {
        id: 'ps-d4-risk-s3',
        type: 'knowledge_check',
        title: 'Insurance Coverage Types',
        knowledgeCheck: {
          question: 'Professional liability (E&O) insurance for surveyors is typically written on which basis?',
          options: [
            'Occurrence basis, covering events during the policy period',
            'Claims-made basis, covering claims reported during the policy period',
            'Retroactive basis, covering only claims from work performed before the policy inception',
            'Per-project basis, with a separate policy for each engagement',
          ],
          correctIndex: 1,
          explanation: 'Professional liability insurance is typically written on a claims-made basis, meaning the policy in effect when the claim is reported provides coverage. This requires maintaining continuous coverage, as a lapsed policy may not cover claims arising from past work.',
        },
      },
      {
        id: 'ps-d4-risk-s4',
        type: 'knowledge_check',
        title: 'Risk Reduction Strategies',
        knowledgeCheck: {
          question: 'Which of the following is the most effective proactive risk reduction strategy for a surveying firm?',
          options: [
            'Purchasing the highest available insurance limits',
            'Implementing rigorous quality control procedures and independent checking',
            'Declining all projects that involve boundary disputes',
            'Requiring all clients to sign liability waivers',
          ],
          correctIndex: 1,
          explanation: 'While adequate insurance is important, the most effective risk reduction strategy is preventing errors through rigorous quality control procedures and independent checking of work. Prevention is always preferable to relying on insurance to cover the consequences of errors.',
        },
      },
    ],
  },

  // ============================================================
  // DOMAIN 5: AREAS OF PRACTICE (4 readings)
  // ============================================================
  {
    id: 'ps-d5-boundary',
    examTrack: 'ps',
    domainNumber: 5,
    domain: 'Areas of Practice',
    title: 'Boundary Surveys and Retracements',
    description: 'A thorough examination of boundary survey methodology, including research procedures, evidence recovery, the principles of retracement, and the process of resolving conflicting evidence to establish boundary locations.',
    estimatedMinutes: 24,
    sections: [
      {
        id: 'ps-d5-boundary-s1',
        type: 'concept',
        title: 'Research and Preparation for Boundary Surveys',
        content: 'A boundary survey begins long before the field crew sets foot on the property. Thorough research and preparation are essential to a successful boundary determination. The surveyor must examine the chain of title for the subject property, tracing the ownership history back to the original conveyance or as far as necessary to understand how the boundaries were created. Each deed in the chain should be reviewed for the legal description, references to plats or maps, easement reservations, and any other language that affects the boundary.\n\nBeyond the subject property, the surveyor must research adjoining properties to understand the context of the boundary. When two parcels share a common boundary, the deeds and surveys for both parcels may contain valuable information about the intended boundary location. The surveyor should also search for prior surveys of the subject property and adjoining properties, as these surveys may contain evidence of monuments found, measurements taken, and professional opinions rendered by earlier surveyors.\n\nPublic records that should be examined include the county recorder\'s office for deeds, plats, and survey maps; the county assessor\'s office for tax maps and parcel data; the local planning or zoning office for subdivision plats and site plans; and state or federal archives for PLSS survey records and notes. In areas covered by the PLSS, the BLM General Land Office (GLO) records, including original survey plats and field notes, are essential primary sources.\n\nThe research phase should produce a comprehensive file that includes copies of all relevant deeds, plats, prior surveys, PLSS records, and aerial photography. The surveyor should prepare a preliminary plat showing the record information, including called-for monuments, bearings, distances, and adjoiners. This preliminary plat guides the field investigation by identifying the evidence that should be searched for and the measurements that should be taken.'
      },
      {
        id: 'ps-d5-boundary-s2',
        type: 'concept',
        title: 'Evidence Recovery and Field Investigation',
        content: 'The field investigation for a boundary survey is a systematic search for physical evidence of the boundary lines and corners. The surveyor should approach the field investigation with the mindset of a detective, looking for clues that reveal where the original surveyor placed the corners and ran the lines. The research performed in the office guides the field search, but the surveyor must remain open to finding evidence that was not anticipated by the record information.\n\nAt each corner location, the surveyor should search for the called-for monument and any accessories (witness trees, reference markers, adjacent monuments) noted in prior surveys or plats. The search should be thorough and systematic, using metal detectors for iron monuments, probe rods for buried markers, and visual inspection for surface monuments. The search area should extend beyond the computed position to account for measurement errors in the original and retracing surveys.\n\nBeyond monuments, the surveyor should observe and document occupation evidence: fences, walls, hedge lines, mowed areas, driveways, buildings, and other improvements that may indicate where landowners believe the boundary to be located. These occupation lines may support or contradict the record boundary and may give rise to unwritten rights such as adverse possession or boundary by acquiescence.\n\nThe surveyor should also look for evidence of easements and encumbrances, including utility lines, drainage patterns, worn paths, and signs of shared use. The relationship between improvements and the boundary should be carefully measured and documented, as this information is essential for ALTA/NSPS surveys and for advising clients about potential encroachment issues. Photographs should be taken of all found evidence, site conditions, and potential conflicts, with a reference scale included in monument photographs.'
      },
      {
        id: 'ps-d5-boundary-s3',
        type: 'worked_example',
        title: 'Resolving a Boundary Conflict',
        workedExample: {
          problem: 'A surveyor is retracing a lot boundary in a recorded subdivision. The plat shows Lot 5 as having a frontage of 100.00 feet. The surveyor finds the iron pins at both ends of the block (Lots 1-10) in their original positions, but the total measured distance across the block face is 1,002.50 feet instead of the platted 1,000.00 feet (10 lots x 100.00 feet). No intermediate lot corners are found. How should the surveyor establish the Lot 5 corner positions?',
          steps: [
            { step: 1, description: 'Identify the found monuments and the discrepancy.', calculation: 'Block corners found (monuments control). Total measured = 1,002.50 ft; Total platted = 1,000.00 ft; Excess = 2.50 ft' },
            { step: 2, description: 'Since no intermediate lot corners were found, the lot corners are "lost" and must be reestablished. Apply proportionate measurement.', calculation: 'Each lot receives a proportionate share of the excess: 2.50 / 10 lots = 0.25 ft per lot' },
            { step: 3, description: 'Compute the proportioned frontage for each lot.', calculation: 'Each lot frontage = 100.00 + 0.25 = 100.25 ft' },
            { step: 4, description: 'Establish the Lot 5 corners by cumulative proportioned distances from the found block corner.', calculation: 'Lot 5 near corner = 4 lots * 100.25 = 401.00 ft from the block corner; Lot 5 far corner = 5 lots * 100.25 = 501.25 ft from the block corner' },
          ],
          answer: 'The Lot 5 corners should be established at 401.00 ft and 501.25 ft from the found block corner, giving Lot 5 a proportioned frontage of 100.25 ft. Proportionate measurement distributes the excess evenly among all lots because no intermediate evidence was found to determine which lots should absorb the discrepancy.',
        },
      },
      {
        id: 'ps-d5-boundary-s4',
        type: 'knowledge_check',
        title: 'Retracement Principles',
        knowledgeCheck: {
          question: 'When performing a retracement survey, the surveyor\'s primary objective is to:',
          options: [
            'Establish new boundaries based on current deed descriptions',
            'Determine where the original surveyor actually placed the corners and ran the lines',
            'Correct errors made by the original surveyor using modern measurements',
            'Resolve boundary disputes by selecting the most equitable boundary location',
          ],
          correctIndex: 1,
          explanation: 'A retracement survey seeks to recover or relocate the boundaries as originally established. The retracing surveyor must follow in the footsteps of the original surveyor, determining where corners were actually placed, not where they should have been placed based on modern measurements.',
        },
      },
      {
        id: 'ps-d5-boundary-s5',
        type: 'knowledge_check',
        title: 'Proportionate Measurement',
        knowledgeCheck: {
          question: 'Proportionate measurement is used when:',
          options: [
            'All original monuments are found in their original positions',
            'The surveyor wants to correct errors in the original survey',
            'Intermediate corners are lost and must be reestablished between found corners',
            'The deed description does not include distances',
          ],
          correctIndex: 2,
          explanation: 'Proportionate measurement is used to reestablish lost corners by distributing the discrepancy between the measured and record distances proportionally among the lost positions. It is applied when the end points are found but intermediate corners cannot be recovered from physical evidence.',
        },
      },
    ],
  },
  {
    id: 'ps-d5-construction',
    examTrack: 'ps',
    domainNumber: 5,
    domain: 'Areas of Practice',
    title: 'Construction Surveys and Layout',
    description: 'Understanding the role of surveying in construction, including building layout, grade staking, cut and fill calculations, and the surveyor\'s responsibility for accuracy in construction staking.',
    estimatedMinutes: 20,
    sections: [
      {
        id: 'ps-d5-construction-s1',
        type: 'concept',
        title: 'Construction Layout Fundamentals',
        content: 'Construction surveying involves transferring the design intent shown on plans and specifications to the physical ground, enabling builders to construct improvements in their correct positions and at their correct elevations. The construction surveyor translates coordinates, angles, and elevations from design documents into physical markers, stakes, and reference lines that guide the construction process.\n\nBuilding layout typically begins with establishing a baseline or control network tied to the property boundary survey. The surveyor then computes the positions of building corners, column lines, and other critical points from the construction drawings, and stakes these positions in the field. Offset stakes are commonly used, placed at a known distance from the actual building line, because the actual corner position will be disturbed during excavation. The offset distance and direction must be clearly marked on each stake.\n\nGrade staking involves setting stakes that indicate the required elevation at specific points. The stake is typically marked with the cut (amount of soil to be removed) or fill (amount of soil to be added) needed to reach the design grade at that location. Cut is often marked in red and fill in blue, though conventions vary. The surveyor computes the cut or fill by comparing the existing ground elevation (determined by leveling or GPS) with the design elevation shown on the grading plan.\n\nConstruction staking requires high accuracy because errors can result in costly rework. Buildings placed in the wrong location may violate setback requirements or encroach on easements. Grade errors can cause drainage problems, foundation issues, or failure to meet flood elevation requirements. The construction surveyor must maintain rigorous quality control, including independent checks of all layout computations and field verification of staked positions.'
      },
      {
        id: 'ps-d5-construction-s2',
        type: 'formula',
        title: 'Cut and Fill Computation',
        formula: {
          expression: 'Cut/Fill = Existing Elevation - Design Elevation',
          variables: [
            { symbol: 'Existing Elevation', description: 'The current ground elevation at the stake location, determined by leveling or GPS survey' },
            { symbol: 'Design Elevation', description: 'The required finished grade elevation at the stake location, from the grading plan' },
            { symbol: 'Cut/Fill', description: 'Positive result = Cut (remove soil); Negative result = Fill (add soil)' },
          ],
          whenToUse: 'Use at each grade stake location to determine whether material must be removed (cut) or added (fill) to achieve the design grade. Mark the stake with the cut or fill amount to guide the grading contractor.',
        },
      },
      {
        id: 'ps-d5-construction-s3',
        type: 'worked_example',
        title: 'Grade Staking Computation',
        workedExample: {
          problem: 'A grading plan requires a finished grade elevation of 425.50 ft at Station 2+50 along a roadway. The surveyor\'s level run determines the existing ground elevation at this location is 428.20 ft. A grade stake is to be set with the hub top at elevation 427.00 ft. Determine the cut or fill and the mark to place on the stake.',
          steps: [
            { step: 1, description: 'Compute the cut or fill from existing ground to design grade.', calculation: 'Cut/Fill = 428.20 - 425.50 = +2.70 ft (Cut, because existing is higher than design)' },
            { step: 2, description: 'Compute the relationship between the hub elevation and the design grade.', calculation: 'Hub to design = 427.00 - 425.50 = +1.50 ft' },
            { step: 3, description: 'Mark the stake to indicate the cut from the hub to the design grade.', calculation: 'Mark: "C 1.50" (Cut 1.50 ft from hub top to reach design grade at Sta 2+50)' },
          ],
          answer: 'The existing grade requires 2.70 ft of cut to reach the design elevation. The grade stake hub is set at 427.00 ft, which is 1.50 ft above the design grade. The stake is marked "C 1.50" indicating that the design grade is 1.50 ft below the top of the hub.',
        },
      },
      {
        id: 'ps-d5-construction-s4',
        type: 'knowledge_check',
        title: 'Construction Staking Concepts',
        knowledgeCheck: {
          question: 'Offset stakes in building layout are used because:',
          options: [
            'They are more accurate than direct corner stakes',
            'The actual corner position will be disturbed during excavation',
            'Building codes require offset stakes at specific distances',
            'They eliminate the need for a control survey',
          ],
          correctIndex: 1,
          explanation: 'Offset stakes are placed at a known distance from the actual building corner or line because the excavation process will destroy any stakes placed at the actual corner position. The offset stakes survive construction and provide reference points for re-establishing the building line.',
        },
      },
      {
        id: 'ps-d5-construction-s5',
        type: 'knowledge_check',
        title: 'Grade Staking',
        knowledgeCheck: {
          question: 'A grade stake shows "F 2.30" at Station 5+00. This means:',
          options: [
            'The existing ground is 2.30 ft above the design grade',
            'Fill material 2.30 ft deep must be added to reach the design grade from the hub elevation',
            'The design elevation is 2.30 ft at this station',
            'The stake should be moved 2.30 ft forward',
          ],
          correctIndex: 1,
          explanation: '"F 2.30" indicates Fill of 2.30 feet. The design grade is 2.30 ft above the top of the stake hub, meaning fill material must be added to bring the ground surface up to the design elevation at this station.',
        },
      },
    ],
  },
  {
    id: 'ps-d5-subdivision',
    examTrack: 'ps',
    domainNumber: 5,
    domain: 'Areas of Practice',
    title: 'Subdivision Design and Platting',
    description: 'The surveyor\'s role in subdivision design and platting, including lot layout, street design, regulatory requirements, plat preparation, and the recording process.',
    estimatedMinutes: 20,
    sections: [
      {
        id: 'ps-d5-subdivision-s1',
        type: 'concept',
        title: 'Subdivision Design Principles',
        content: 'Subdivision of land is the process of dividing a larger tract into smaller parcels, lots, or sites for development. The professional surveyor plays a central role in this process, working with developers, engineers, planners, and attorneys to create a subdivision that meets regulatory requirements, market demands, and physical site constraints.\n\nSubdivision design must comply with local subdivision regulations, which typically specify minimum lot sizes, minimum frontage requirements, maximum lot depth-to-width ratios, street design standards, and requirements for public improvements such as roads, utilities, drainage, and open space. The surveyor must be familiar with the applicable regulations before beginning the design process, as non-compliant designs will be rejected during the review and approval process.\n\nThe physical characteristics of the site significantly influence subdivision layout. Topography affects street grades, lot grading, and drainage patterns. Soil conditions affect building suitability and on-site wastewater disposal. Existing features such as streams, wetlands, floodplains, and significant trees may constrain development or require buffers and setbacks. The surveyor must perform or commission a topographic survey and identify all site constraints before developing the lot layout.\n\nStreet design is a critical component of subdivision planning. Streets must provide adequate access to all lots, connect to the existing road network, and meet local standards for width, grade, sight distance, and intersection spacing. Cul-de-sacs are commonly used for dead-end streets but must meet minimum radius requirements. Curve data for all horizontal curves in the street right-of-way must be computed and shown on the plat, including radius, arc length, chord bearing and distance, and tangent length.'
      },
      {
        id: 'ps-d5-subdivision-s2',
        type: 'concept',
        title: 'Plat Preparation and Recording',
        content: 'The subdivision plat is the legal document that creates the new lots and establishes their boundaries, easements, and dedications. The plat becomes a permanent public record when recorded, and subsequent conveyances of individual lots will reference the plat by its recording information. The accuracy and completeness of the plat are therefore critically important, as errors will affect all future property transactions within the subdivision.\n\nA subdivision plat typically contains several required elements. The boundary survey of the parent tract establishes the exterior limits of the subdivision. Each lot must be shown with complete bearing and distance data for all boundary lines, lot number, block number (if applicable), and computed area. Street rights-of-way must be dimensioned, and all curve data must be shown. Easements for utilities, drainage, and access must be depicted with their width and purpose identified.\n\nDedication language on the plat formally offers certain areas, typically streets, alleys, and park land, to the public or to the local government for public use. The dedication must be signed by all parties having an ownership interest in the property, including mortgage holders who may need to subordinate their lien to the dedication. A surveyor\'s certificate states that the plat represents a survey made under the surveyor\'s direction, that the monuments shown were found or set as indicated, and that the plat meets applicable standards.\n\nThe plat approval process typically involves submission to the local planning commission or subdivision review authority for review against the applicable regulations, followed by formal approval, often at a public meeting. After approval, the plat is recorded in the county recorder\'s office, creating the new lots as legal parcels. The surveyor must set all required monuments before or immediately after recording, in accordance with state law and local regulations.'
      },
      {
        id: 'ps-d5-subdivision-s3',
        type: 'formula',
        title: 'Curve Data for Subdivision Streets',
        formula: {
          expression: 'L = R * Delta * (pi/180); T = R * tan(Delta/2); C = 2 * R * sin(Delta/2)',
          variables: [
            { symbol: 'L', description: 'Arc length of the curve' },
            { symbol: 'T', description: 'Tangent length (distance from PC or PT to PI)' },
            { symbol: 'C', description: 'Chord length (straight-line distance from PC to PT)' },
            { symbol: 'R', description: 'Radius of the curve' },
            { symbol: 'Delta', description: 'Central angle (deflection angle) of the curve, in degrees' },
          ],
          whenToUse: 'Use to compute horizontal curve elements for subdivision streets and property boundaries. All curve data, including radius, arc length, chord bearing, chord distance, tangent length, and central angle, must be shown on the subdivision plat.',
        },
      },
      {
        id: 'ps-d5-subdivision-s4',
        type: 'worked_example',
        title: 'Computing Curve Data for a Cul-de-sac',
        workedExample: {
          problem: 'A cul-de-sac right-of-way has a radius of 50.00 feet. The bulb is a full semicircle (central angle = 180 degrees). Compute the arc length and chord length of the cul-de-sac bulb.',
          steps: [
            { step: 1, description: 'Compute the arc length.', calculation: 'L = R * Delta * (pi/180) = 50.00 * 180 * (pi/180) = 50.00 * pi = 157.08 ft' },
            { step: 2, description: 'Compute the chord length.', calculation: 'C = 2 * R * sin(Delta/2) = 2 * 50.00 * sin(90) = 100.00 * 1.000 = 100.00 ft' },
            { step: 3, description: 'Verify the chord makes sense geometrically.', calculation: 'For a semicircle, the chord is the diameter: 2 * 50.00 = 100.00 ft. This confirms the calculation.' },
          ],
          answer: 'The cul-de-sac bulb has an arc length of 157.08 feet and a chord length of 100.00 feet (the diameter of the circle).',
        },
      },
      {
        id: 'ps-d5-subdivision-s5',
        type: 'knowledge_check',
        title: 'Subdivision Plat Requirements',
        knowledgeCheck: {
          question: 'The dedication language on a subdivision plat serves to:',
          options: [
            'Grant title insurance coverage to future lot purchasers',
            'Formally offer streets, alleys, and public areas to the government for public use',
            'Certify that the survey meets minimum technical standards',
            'Assign lot numbers and block numbers to the new parcels',
          ],
          correctIndex: 1,
          explanation: 'Dedication language formally offers certain areas (typically streets, alleys, parks, and open space) to the public or to the local government for public use. It must be signed by all ownership interest holders, including mortgage lenders who may need to subordinate their interest.',
        },
      },
    ],
  },
  {
    id: 'ps-d5-geodetic',
    examTrack: 'ps',
    domainNumber: 5,
    domain: 'Areas of Practice',
    title: 'Geodetic and Control Surveys',
    description: 'The principles and practices of geodetic and control surveying, including horizontal and vertical datums, GPS/GNSS surveying methods, geoid models, and the National Spatial Reference System.',
    estimatedMinutes: 22,
    sections: [
      {
        id: 'ps-d5-geodetic-s1',
        type: 'concept',
        title: 'Geodetic Datums and Reference Systems',
        content: 'Geodetic surveying deals with measurements and computations on the curved surface of the Earth, accounting for the planet\'s shape and size. Unlike plane surveying, which treats the Earth as flat for small areas, geodetic surveying uses mathematical models of the Earth\'s shape to ensure accuracy over large distances and for integration into national and global reference systems.\n\nThe foundation of geodetic work is the datum, which is a mathematical model of the Earth used as a reference surface for coordinate computations. The current horizontal datum used in the United States is the North American Datum of 1983 (NAD 83), which is based on the Geodetic Reference System 1980 (GRS 80) ellipsoid. NAD 83 has been refined through multiple adjustments, with the most recent being NAD 83 (2011), which incorporated updated GPS observations and tectonic motion models.\n\nThe vertical datum defines the reference surface for elevations. The current vertical datum is the North American Vertical Datum of 1988 (NAVD 88), which is based on a minimum-constraint adjustment of the Canadian-American leveling network, held fixed at a single tidal benchmark in Rimouski, Quebec. Elevations referenced to NAVD 88 are orthometric heights, meaning they represent the distance above or below the geoid, which is the equipotential surface of the Earth\'s gravity field that best approximates mean sea level.\n\nThe National Geodetic Survey (NGS) is planning to replace NAD 83 and NAVD 88 with new reference frames by 2025 or later. The new geometric reference frame will be based on a plate-fixed version of the International Terrestrial Reference Frame (ITRF), and the new vertical datum (tentatively called the North American-Pacific Geopotential Datum) will be based on a gravimetric geoid model rather than a leveling network. Surveyors should stay informed about these changes, as they will affect State Plane Coordinates, elevation datums, and geoid models.'
      },
      {
        id: 'ps-d5-geodetic-s2',
        type: 'concept',
        title: 'GPS/GNSS Surveying Methods',
        content: 'Global Navigation Satellite Systems (GNSS), including the U.S. GPS, Russian GLONASS, European Galileo, and Chinese BeiDou, have revolutionized surveying by providing precise three-dimensional positioning anywhere on Earth. Professional surveyors use several GPS/GNSS techniques, each suited to different accuracy requirements and operational conditions.\n\nStatic surveying involves placing receivers at fixed points for extended observation periods, typically 30 minutes to several hours, to achieve the highest accuracy. Post-processing of the recorded satellite data produces baseline vectors between receivers with accuracies of a few millimeters plus a few parts per million of the baseline length. Static surveys are used for establishing control networks, densifying geodetic monuments, and performing deformation monitoring.\n\nReal-Time Kinematic (RTK) surveying provides centimeter-level positions in real time, making it the method of choice for boundary surveying, topographic mapping, and construction layout. RTK requires a base station at a known position that broadcasts corrections to a rover receiver via radio link or cellular modem. The rover computes a corrected position in real time, typically achieving 1-2 cm horizontal accuracy and 2-3 cm vertical accuracy. Network RTK uses a network of continuously operating reference stations (CORS) to generate corrections, eliminating the need for the surveyor to set up their own base station.\n\nPost-Processed Kinematic (PPK) surveying collects the same type of data as RTK but processes it in the office after the field session. This approach is useful when real-time corrections are unavailable due to radio or cellular coverage gaps. Precise Point Positioning (PPP) uses precise satellite orbit and clock data to achieve decimeter to centimeter accuracy from a single receiver without a base station, though convergence times can be 20-30 minutes or more. The choice of GNSS technique depends on the required accuracy, the operational environment, the availability of base station or network corrections, and the project budget.'
      },
      {
        id: 'ps-d5-geodetic-s3',
        type: 'formula',
        title: 'Ellipsoid to Orthometric Height Conversion',
        formula: {
          expression: 'H = h - N',
          variables: [
            { symbol: 'H', description: 'Orthometric height (elevation above the geoid, which approximates mean sea level)' },
            { symbol: 'h', description: 'Ellipsoid height (height above the reference ellipsoid, as measured by GPS/GNSS)' },
            { symbol: 'N', description: 'Geoid undulation (the separation between the geoid and the ellipsoid at the point, obtained from a geoid model such as GEOID18)' },
          ],
          whenToUse: 'Use to convert GPS/GNSS-derived ellipsoid heights to orthometric heights (elevations) referenced to the vertical datum. The geoid undulation is obtained from a geoid model published by NGS (currently GEOID18 for use with NAD 83/NAVD 88). This conversion is essential because GPS measures heights above the ellipsoid, but surveying and engineering applications require heights above the geoid (elevations).',
        },
      },
      {
        id: 'ps-d5-geodetic-s4',
        type: 'worked_example',
        title: 'Converting GPS Ellipsoid Height to Elevation',
        workedExample: {
          problem: 'A GPS survey determines that a benchmark has an ellipsoid height (h) of -26.453 meters on the NAD 83 ellipsoid. The GEOID18 model indicates a geoid undulation (N) of -29.812 meters at this location. Compute the orthometric height (elevation) referenced to NAVD 88.',
          steps: [
            { step: 1, description: 'Apply the ellipsoid to orthometric height formula.', calculation: 'H = h - N = -26.453 - (-29.812) = -26.453 + 29.812' },
            { step: 2, description: 'Compute the orthometric height.', calculation: 'H = 3.359 meters' },
            { step: 3, description: 'Convert to feet if needed.', calculation: 'H = 3.359 * 3.28084 = 11.02 ft (NAVD 88)' },
          ],
          answer: 'The orthometric height (NAVD 88 elevation) is 3.359 meters or approximately 11.02 feet. Note that the negative ellipsoid height and negative geoid undulation are both common in many parts of the United States, where the geoid surface is below the ellipsoid.',
        },
      },
      {
        id: 'ps-d5-geodetic-s5',
        type: 'knowledge_check',
        title: 'GPS Height Conversion',
        knowledgeCheck: {
          question: 'GPS/GNSS receivers directly measure heights above the:',
          options: [
            'Geoid (mean sea level)',
            'Local tidal datum',
            'Reference ellipsoid (e.g., GRS 80)',
            'Ground surface',
          ],
          correctIndex: 2,
          explanation: 'GPS/GNSS receivers measure ellipsoid heights, which are heights above the mathematical reference ellipsoid (such as GRS 80 for NAD 83). To obtain orthometric heights (elevations referenced to the geoid/mean sea level), the surveyor must apply a geoid undulation correction from a geoid model.',
        },
      },
      {
        id: 'ps-d5-geodetic-s6',
        type: 'knowledge_check',
        title: 'GNSS Surveying Methods',
        knowledgeCheck: {
          question: 'Which GNSS surveying technique provides real-time centimeter-level positions and is most commonly used for boundary surveying and construction layout?',
          options: [
            'Static surveying with extended observation periods',
            'Precise Point Positioning (PPP)',
            'Real-Time Kinematic (RTK)',
            'Differential code-phase positioning',
          ],
          correctIndex: 2,
          explanation: 'Real-Time Kinematic (RTK) surveying provides centimeter-level positions in real time by applying corrections broadcast from a base station or CORS network. It is the most commonly used GNSS technique for boundary surveying, topographic mapping, and construction staking due to its combination of high accuracy and real-time results.',
        },
      },
    ],
  },
];
