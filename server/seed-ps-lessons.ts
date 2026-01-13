import { db } from "./db";
import { lessons, lessonQuestions } from "@shared/schema";
import { eq, and } from "drizzle-orm";
import { NCEES_PS_DOMAINS } from "@shared/domains";

const PS_DOMAINS = NCEES_PS_DOMAINS;

// PS Exam Lessons organized by 5 NCEES PS Knowledge Areas
// Total: ~55 lessons across 5 domains

async function seedPSLessons() {
  console.log("Starting PS lesson seeding...");

  // Delete existing PS lessons only
  await db.delete(lessons).where(eq(lessons.examTrack, 'ps'));
  console.log("Deleted existing PS lessons");

  const psLessonsToCreate = [
    // ========== DOMAIN 1: Legal Principles (12 lessons) ==========
    {
      examTrack: 'ps',
      domainNumber: 1,
      domain: PS_DOMAINS[1],
      title: "Principles of Evidence in Surveying",
      description: "Understanding how to search for, evaluate, and apply evidence in boundary determinations",
      content: "Evidence in boundary surveying includes physical evidence (monuments, occupation), record evidence (deeds, plats), and testimonial evidence. Surveyors must evaluate all forms of evidence using established legal principles.",
      difficulty: "medium",
      orderIndex: 1,
      estimatedMinutes: 25,
      suggestedWeek: 1,
      questions: [
        { type: "multiple_choice", text: "What is the primary purpose of gathering evidence in a boundary survey?", options: ["To create new boundaries", "To relocate existing boundaries", "To dispute property ownership", "To increase property value", "To satisfy client requests"], answer: "1", explanation: "The surveyor's role is to relocate existing boundaries based on available evidence, not to create new ones.", points: 10 },
        { type: "multiple_choice", text: "Which type of evidence carries the most weight in boundary determination?", options: ["Area measurements", "Distance measurements", "Natural monuments", "Artificial monuments", "Bearings"], answer: "2", explanation: "Natural monuments (rivers, trees) generally take precedence over all other forms of evidence.", points: 10 },
        { type: "fill_in_blank", text: "The hierarchy of evidence places ___ monuments above artificial monuments.", answer: "natural", explanation: "Natural monuments such as streams, lakes, and established trees take precedence over artificial monuments.", points: 10 },
        { type: "multiple_choice", text: "Parol evidence refers to:", options: ["Written documents", "Verbal testimony", "Physical monuments", "Recorded plats", "GPS coordinates"], answer: "1", explanation: "Parol evidence is oral or verbal testimony that may explain or supplement written documents.", points: 10 },
        { type: "fill_in_blank", text: "Evidence of occupation and use can establish rights through ___ possession over time.", answer: "adverse", explanation: "Adverse possession allows someone to gain legal title through continuous, hostile, and open possession for a statutory period.", points: 10 }
      ]
    },
    {
      examTrack: 'ps',
      domainNumber: 1,
      domain: PS_DOMAINS[1],
      title: "Adverse Possession and Prescriptive Rights",
      description: "Legal principles of acquiring property rights through possession and use",
      content: "Adverse possession is the legal doctrine by which a person may acquire title to land by continuous, open, notorious, and hostile possession for a statutory period. Prescriptive rights relate to the acquisition of easements through similar means.",
      difficulty: "medium",
      orderIndex: 2,
      estimatedMinutes: 30,
      suggestedWeek: 1,
      questions: [
        { type: "multiple_choice", text: "For adverse possession to be valid, the possession must be:", options: ["Secret and hidden", "With owner's permission", "Open, notorious, and hostile", "Temporary and intermittent", "Limited to structures only"], answer: "2", explanation: "Adverse possession requires the possession to be open, notorious, continuous, exclusive, and hostile (without permission).", points: 10 },
        { type: "fill_in_blank", text: "The statutory period for adverse possession varies by state but commonly ranges from 5 to ___ years.", answer: "20", explanation: "Most states require between 5 and 20 years of continuous adverse possession to claim title.", points: 10 },
        { type: "multiple_choice", text: "What is the difference between adverse possession and prescriptive easement?", options: ["There is no difference", "Adverse possession grants title, prescriptive easement grants use rights", "Prescriptive easement grants title", "Adverse possession requires payment", "Prescriptive easement is always shorter"], answer: "1", explanation: "Adverse possession results in ownership transfer, while prescriptive easement only grants the right to use the property.", points: 10 },
        { type: "multiple_choice", text: "Which element is NOT required for adverse possession?", options: ["Continuous possession", "Payment of property taxes", "Open and notorious use", "Hostile intent", "Exclusive possession"], answer: "1", explanation: "While some states require tax payment, it is not universally required for adverse possession.", points: 10 },
        { type: "fill_in_blank", text: "Possession that is with the owner's permission is called ___ possession and cannot lead to adverse possession.", answer: "permissive", explanation: "Permissive possession defeats the hostile requirement needed for adverse possession.", points: 10 }
      ]
    },
    {
      examTrack: 'ps',
      domainNumber: 1,
      domain: PS_DOMAINS[1],
      title: "Acquiescence and Boundary Agreements",
      description: "Legal principles of boundary establishment through agreement and acceptance",
      content: "Acquiescence is the tacit acceptance of a boundary line by adjoining landowners over time. Boundary line agreements, whether oral or written, can establish the location of an uncertain boundary when properly executed.",
      difficulty: "medium",
      orderIndex: 3,
      estimatedMinutes: 25,
      suggestedWeek: 1,
      questions: [
        { type: "multiple_choice", text: "Acquiescence requires which key element?", options: ["Written agreement", "Uncertainty or dispute about the boundary", "Payment between parties", "Court approval", "Survey monument"], answer: "1", explanation: "Acquiescence typically applies when there is an uncertain or disputed boundary that parties have accepted over time.", points: 10 },
        { type: "fill_in_blank", text: "A boundary line agreement typically requires a ___ or disputed boundary to be valid.", answer: "uncertain", explanation: "Courts generally require uncertainty or dispute about the true boundary location for an agreement to modify the record boundary.", points: 10 },
        { type: "multiple_choice", text: "How does acquiescence differ from adverse possession?", options: ["They are identical concepts", "Acquiescence requires mutual recognition", "Adverse possession requires agreement", "Acquiescence transfers title", "There is no legal difference"], answer: "1", explanation: "Acquiescence involves mutual recognition and acceptance by both parties, while adverse possession is unilateral.", points: 10 },
        { type: "multiple_choice", text: "An oral boundary agreement may be enforceable if:", options: ["It is recorded", "Both parties sign it", "There is partial performance", "A surveyor witnesses it", "It is notarized"], answer: "2", explanation: "Partial performance such as building a fence or making improvements can make an oral agreement enforceable.", points: 10 },
        { type: "fill_in_blank", text: "Long acquiescence to a boundary line may result in the line becoming ___ regardless of its record location.", answer: "fixed", explanation: "Courts may hold that a line acquiesced to over time becomes the legal boundary, even if different from the record description.", points: 10 }
      ]
    },
    {
      examTrack: 'ps',
      domainNumber: 1,
      domain: PS_DOMAINS[1],
      title: "Controlling Elements in Legal Descriptions",
      description: "Understanding the hierarchy of calls and their controlling effect",
      content: "When conflicts exist in a deed, courts apply a hierarchy of controlling elements. Natural monuments control over artificial monuments, which control over courses and distances, which control over area. Understanding this hierarchy is essential for boundary resolution.",
      difficulty: "hard",
      orderIndex: 4,
      estimatedMinutes: 30,
      suggestedWeek: 2,
      questions: [
        { type: "multiple_choice", text: "In the hierarchy of calls, which has the highest priority?", options: ["Distances", "Bearings/Courses", "Artificial monuments", "Natural monuments", "Area/Quantity"], answer: "3", explanation: "Natural monuments (rivers, rocks, trees) have the highest priority in the hierarchy of calls.", points: 10 },
        { type: "fill_in_blank", text: "The order of controlling elements from highest to lowest is: natural monuments, ___ monuments, courses, distances, area.", answer: "artificial", explanation: "Artificial monuments (stakes, pipes, concrete markers) rank second after natural monuments.", points: 10 },
        { type: "multiple_choice", text: "Why does area/quantity have the lowest priority?", options: ["It cannot be measured", "It is often computed rather than surveyed", "It is always incorrect", "Courts ignore area", "It requires special equipment"], answer: "1", explanation: "Area is typically computed from other elements and is therefore most susceptible to error.", points: 10 },
        { type: "multiple_choice", text: "When a deed calls for 'the oak tree' that no longer exists:", options: ["The deed is void", "The surveyor must find evidence of where it stood", "The next lower element controls", "The area controls", "A new tree must be planted"], answer: "1", explanation: "The surveyor must search for evidence of the monument's original location through stumps, roots, or other evidence.", points: 10 },
        { type: "fill_in_blank", text: "When there is a conflict between distance and bearing calls, the ___ generally controls.", answer: "bearing", explanation: "Bearings/courses typically control over distances in the hierarchy, though context matters.", points: 10 }
      ]
    },
    {
      examTrack: 'ps',
      domainNumber: 1,
      domain: PS_DOMAINS[1],
      title: "Riparian and Littoral Rights",
      description: "Water boundary principles for rivers, streams, lakes, and oceans",
      content: "Riparian rights apply to properties bordering flowing water (rivers, streams), while littoral rights apply to properties bordering standing water (lakes, oceans). These rights include access, use, and ownership to certain water boundaries.",
      difficulty: "hard",
      orderIndex: 5,
      estimatedMinutes: 35,
      suggestedWeek: 2,
      questions: [
        { type: "multiple_choice", text: "Riparian rights apply to properties adjacent to:", options: ["Lakes", "Oceans", "Rivers and streams", "Reservoirs", "Ponds"], answer: "2", explanation: "Riparian rights specifically apply to properties bordering flowing water such as rivers and streams.", points: 10 },
        { type: "fill_in_blank", text: "Properties bordering lakes or oceans have ___ rights rather than riparian rights.", answer: "littoral", explanation: "Littoral rights apply to bodies of standing or tidal water like lakes and oceans.", points: 10 },
        { type: "multiple_choice", text: "Accretion refers to:", options: ["Sudden loss of land", "Gradual addition of land by water deposits", "Flooding", "Man-made land reclamation", "Erosion"], answer: "1", explanation: "Accretion is the gradual and imperceptible addition of land by natural water deposits.", points: 10 },
        { type: "multiple_choice", text: "Avulsion is distinguished from accretion because it is:", options: ["Gradual", "Imperceptible", "Sudden and perceptible", "Man-made", "Permanent"], answer: "2", explanation: "Avulsion is a sudden, perceptible change in the watercourse, unlike the gradual process of accretion.", points: 10 },
        { type: "fill_in_blank", text: "The thread of the stream or ___ typically marks the boundary between riparian owners on opposite banks.", answer: "thalweg", explanation: "The thalweg (deepest part of the channel) often serves as the boundary in non-navigable streams.", points: 10 }
      ]
    },
    {
      examTrack: 'ps',
      domainNumber: 1,
      domain: PS_DOMAINS[1],
      title: "Sovereign Land Grants and Public Lands",
      description: "Understanding federal and state land grants and sovereign rights",
      content: "Sovereign land grants trace title from the government to private ownership. Understanding the chain of title from original patents, grants, and reservations is essential for boundary work in areas with federal or state land history.",
      difficulty: "hard",
      orderIndex: 6,
      estimatedMinutes: 30,
      suggestedWeek: 2,
      questions: [
        { type: "multiple_choice", text: "A patent in land surveying terminology refers to:", options: ["A survey technique", "A government grant of land to private ownership", "A type of monument", "A measurement method", "A deed restriction"], answer: "1", explanation: "A patent is the original conveyance of land from the government (sovereign) to a private owner.", points: 10 },
        { type: "fill_in_blank", text: "The doctrine of ___ domain allows the government to take private property for public use with just compensation.", answer: "eminent", explanation: "Eminent domain is the government's right to acquire private property for public purposes.", points: 10 },
        { type: "multiple_choice", text: "Which entity typically owns submerged lands beneath navigable waters?", options: ["Adjacent riparian owners", "The federal government", "The state", "No one", "Local municipalities"], answer: "2", explanation: "Under the public trust doctrine, states generally own the beds of navigable waters.", points: 10 },
        { type: "multiple_choice", text: "A reservation in a deed or grant:", options: ["Reserves future ownership", "Withholds certain rights from the conveyance", "Creates a new parcel", "Is never enforceable", "Only applies to minerals"], answer: "1", explanation: "A reservation keeps certain rights (like mineral rights) with the grantor when conveying property.", points: 10 },
        { type: "fill_in_blank", text: "Original surveys by the General Land Office (GLO) are considered ___ surveys whose corners control.", answer: "original", explanation: "Original GLO/BLM surveys are controlling and their monuments, when found, are conclusive.", points: 10 }
      ]
    },
    {
      examTrack: 'ps',
      domainNumber: 1,
      domain: PS_DOMAINS[1],
      title: "Sequential and Simultaneous Conveyances",
      description: "Junior and senior rights in property conveyances",
      content: "When properties are created through subdivision, the sequence of conveyances affects boundary rights. Senior (first) conveyances generally control over junior (later) conveyances when conflicts arise.",
      difficulty: "hard",
      orderIndex: 7,
      estimatedMinutes: 30,
      suggestedWeek: 3,
      questions: [
        { type: "multiple_choice", text: "In sequential conveyances, the senior conveyance is:", options: ["The largest parcel", "The first parcel sold", "The most recent sale", "The recorded conveyance", "The government grant"], answer: "1", explanation: "The senior conveyance is the first parcel conveyed from the original tract.", points: 10 },
        { type: "fill_in_blank", text: "When parcels are created at the same time from a common grantor, they are ___ conveyances.", answer: "simultaneous", explanation: "Simultaneous conveyances occur when multiple parcels are created at the same time, such as in a subdivision.", points: 10 },
        { type: "multiple_choice", text: "In a conflict between junior and senior grantees:", options: ["Junior rights always prevail", "Senior rights generally prevail", "The larger parcel wins", "Courts split the difference", "Recording date controls"], answer: "1", explanation: "Senior conveyances generally take priority, receiving the full amount called for in their deed.", points: 10 },
        { type: "multiple_choice", text: "What happens to the excess or deficiency in a parent tract after sequential conveyances?", options: ["It is distributed equally", "It falls to the senior conveyance", "It falls to the junior conveyance", "It escheats to the state", "It must be litigated"], answer: "2", explanation: "Any excess or deficiency typically falls to the last (junior) conveyance from the parent tract.", points: 10 },
        { type: "fill_in_blank", text: "In simultaneous conveyances, excess or deficiency is typically distributed ___ among all grantees.", answer: "proportionally", explanation: "When parcels are conveyed simultaneously, any differences are usually prorated among all parties.", points: 10 }
      ]
    },
    {
      examTrack: 'ps',
      domainNumber: 1,
      domain: PS_DOMAINS[1],
      title: "Legal Descriptions and Deed Interpretation",
      description: "Preparing and interpreting metes and bounds and other legal descriptions",
      content: "Legal descriptions must unambiguously identify property. Common types include metes and bounds, lot and block, and PLSS descriptions. Understanding how to read, write, and interpret these descriptions is fundamental to professional surveying.",
      difficulty: "medium",
      orderIndex: 8,
      estimatedMinutes: 35,
      suggestedWeek: 3,
      questions: [
        { type: "multiple_choice", text: "A metes and bounds description includes:", options: ["Only area", "Lot and block numbers", "Bearings and distances from a point of beginning", "Only coordinates", "Only monuments"], answer: "2", explanation: "Metes and bounds descriptions use compass directions (bearings) and distances, starting from a defined point of beginning.", points: 10 },
        { type: "fill_in_blank", text: "A legal description must close back to its ___ of beginning to be complete.", answer: "point", explanation: "A proper metes and bounds description returns to its point of beginning (POB) to define a closed figure.", points: 10 },
        { type: "multiple_choice", text: "In the call 'thence N45°30'E, 200 feet to an iron pipe':", options: ["N45°30'E is the distance", "200 feet is the bearing", "The iron pipe is a monument", "This is a PLSS description", "The bearing is due north"], answer: "2", explanation: "The iron pipe is a monument marking the end of this course.", points: 10 },
        { type: "multiple_choice", text: "A lot and block description references:", options: ["A recorded subdivision plat", "The PLSS system", "A metes and bounds survey", "Federal land grants", "A topographic map"], answer: "0", explanation: "Lot and block descriptions refer to numbered lots within blocks shown on a recorded subdivision plat.", points: 10 },
        { type: "fill_in_blank", text: "Encumbrances such as easements and liens ___ the use of property but do not transfer title.", answer: "restrict", explanation: "Encumbrances are restrictions or claims against property that limit how it can be used or conveyed.", points: 10 }
      ]
    },
    {
      examTrack: 'ps',
      domainNumber: 1,
      domain: PS_DOMAINS[1],
      title: "Easement Rights and Types",
      description: "Understanding easement creation, types, and surveying implications",
      content: "Easements grant the right to use another's property for a specific purpose. They can be created by express grant, implication, necessity, or prescription. Surveyors must identify, locate, and show easements on surveys.",
      difficulty: "medium",
      orderIndex: 9,
      estimatedMinutes: 30,
      suggestedWeek: 3,
      questions: [
        { type: "multiple_choice", text: "An easement appurtenant:", options: ["Benefits a specific person", "Benefits an adjoining property", "Is always underground", "Cannot be transferred", "Expires after 20 years"], answer: "1", explanation: "An easement appurtenant benefits a neighboring property (dominant estate) and transfers with that property.", points: 10 },
        { type: "fill_in_blank", text: "An easement in ___ benefits a specific person or entity rather than a property.", answer: "gross", explanation: "An easement in gross (like utility easements) benefits a person or company rather than adjacent land.", points: 10 },
        { type: "multiple_choice", text: "An easement by necessity is created when:", options: ["A property is landlocked", "The owner requests it", "The government requires it", "Adjacent owners agree", "A survey is completed"], answer: "0", explanation: "Easements by necessity arise when land is landlocked and requires access across another's property.", points: 10 },
        { type: "multiple_choice", text: "The property burdened by an easement is called the:", options: ["Dominant estate", "Servient estate", "Fee simple", "Remainder", "Leasehold"], answer: "1", explanation: "The servient estate is the property that bears the burden of the easement.", points: 10 },
        { type: "fill_in_blank", text: "Easements created through long-term use without permission are called ___ easements.", answer: "prescriptive", explanation: "Prescriptive easements arise through open, continuous, and hostile use for the statutory period.", points: 10 }
      ]
    },
    {
      examTrack: 'ps',
      domainNumber: 1,
      domain: PS_DOMAINS[1],
      title: "U.S. PLSS Evidence and Perpetuation",
      description: "Locating and perpetuating Public Land Survey System corners",
      content: "The U.S. PLSS covers most of the western United States. Surveyors must understand how to search for original evidence, evaluate corner monuments, and properly restore lost or obliterated corners following BLM procedures.",
      difficulty: "hard",
      orderIndex: 10,
      estimatedMinutes: 35,
      suggestedWeek: 4,
      questions: [
        { type: "multiple_choice", text: "An original PLSS corner is one that:", options: ["Was recently set", "Was established by the original government survey", "Is made of concrete", "Has GPS coordinates", "Is in good condition"], answer: "1", explanation: "Original corners are those set by the official government survey and are controlling evidence.", points: 10 },
        { type: "fill_in_blank", text: "A corner that cannot be found or identified by any physical evidence is considered ___.", answer: "lost", explanation: "Lost corners must be restored by proportionate measurement or other approved methods.", points: 10 },
        { type: "multiple_choice", text: "An obliterated corner is one where:", options: ["No evidence exists", "Physical evidence remains but position is not recoverable", "The monument was destroyed but position can be recovered", "It was never monumented", "It is underwater"], answer: "2", explanation: "An obliterated corner has no remaining physical evidence but its position can be recovered from other evidence.", points: 10 },
        { type: "multiple_choice", text: "Single proportionate measurement is used when:", options: ["All corners are found", "A corner is lost on a line between two found corners", "Multiple corners are lost", "No corners exist", "Only for subdivision lines"], answer: "1", explanation: "Single proportionate measurement restores a lost corner by distributing error along a line between found corners.", points: 10 },
        { type: "fill_in_blank", text: "The BLM Manual of Surveying ___ provides authoritative guidance for PLSS corner restoration.", answer: "Instructions", explanation: "The Manual of Surveying Instructions (current edition 2009) is the primary reference for PLSS procedures.", points: 10 }
      ]
    },
    {
      examTrack: 'ps',
      domainNumber: 1,
      domain: PS_DOMAINS[1],
      title: "Common Law Boundary Principles",
      description: "Historical and current common law affecting boundary determination",
      content: "Common law principles developed through court decisions guide boundary determination. These include the doctrine of monuments, construction of ambiguous descriptions, and the treatment of gaps and overlaps.",
      difficulty: "hard",
      orderIndex: 11,
      estimatedMinutes: 30,
      suggestedWeek: 4,
      questions: [
        { type: "multiple_choice", text: "Under common law, gaps in property ownership typically:", options: ["Belong to the state", "Are divided among adjacent owners", "Belong to the first owner to claim them", "Remain unowned", "Must be surveyed before ownership"], answer: "0", explanation: "In many jurisdictions, gaps belong to the state unless there is evidence of intent to convey.", points: 10 },
        { type: "fill_in_blank", text: "When deeds create an overlap, the ___ conveyance generally has priority.", answer: "senior", explanation: "The first (senior) deed typically takes precedence in overlap situations.", points: 10 },
        { type: "multiple_choice", text: "The doctrine of following footsteps means:", options: ["Walking the boundary", "Retracing the original surveyor's work", "Following property lines", "Using GPS to trace routes", "Creating new boundaries"], answer: "1", explanation: "Surveyors must retrace the steps of the original surveyor to find the true boundary.", points: 10 },
        { type: "multiple_choice", text: "A deed should be interpreted to:", options: ["Favor the grantor", "Favor the grantee", "Effectuate the parties' intent", "Minimize the conveyance", "Maximize the conveyance"], answer: "2", explanation: "Courts interpret deeds to carry out the intent of the parties at the time of conveyance.", points: 10 },
        { type: "fill_in_blank", text: "When a description is ambiguous, courts may consider ___ evidence to determine intent.", answer: "extrinsic", explanation: "Extrinsic evidence (outside the deed itself) may be considered to resolve ambiguities.", points: 10 }
      ]
    },
    {
      examTrack: 'ps',
      domainNumber: 1,
      domain: PS_DOMAINS[1],
      title: "Unwritten Rights Affecting Property",
      description: "Rights that affect property beyond record documentation",
      content: "Properties may be subject to rights not documented in the public record. These include prescriptive easements, implied easements, adverse possession claims, and rights of way by necessity. Surveyors must consider these in their work.",
      difficulty: "hard",
      orderIndex: 12,
      estimatedMinutes: 25,
      suggestedWeek: 4,
      questions: [
        { type: "multiple_choice", text: "Unwritten rights differ from record rights because they:", options: ["Are always invalid", "Do not appear in recorded documents", "Only apply to government land", "Cannot be surveyed", "Are always temporary"], answer: "1", explanation: "Unwritten rights exist by operation of law and are not recorded in the chain of title.", points: 10 },
        { type: "fill_in_blank", text: "An ALTA/NSPS Land Title Survey may reveal unwritten rights through observation of ___ on the ground.", answer: "possession", explanation: "Physical evidence of use and occupation may indicate prescriptive or adverse rights.", points: 10 },
        { type: "multiple_choice", text: "Which is NOT typically an unwritten right?", options: ["Prescriptive easement", "Express easement", "Implied easement", "Easement by necessity", "Adverse possession"], answer: "1", explanation: "An express easement is written and recorded, not an unwritten right.", points: 10 },
        { type: "multiple_choice", text: "Why must surveyors consider unwritten rights?", options: ["They increase property value", "They may affect the client's title", "They simplify the survey", "Courts require it", "Insurance companies demand it"], answer: "1", explanation: "Unwritten rights can encumber or limit property rights, affecting the owner's use and title.", points: 10 },
        { type: "fill_in_blank", text: "Title insurance may provide coverage for ___ rights that were not discovered during the title search.", answer: "unwritten", explanation: "Some title policies offer protection against undisclosed unwritten rights affecting the property.", points: 10 }
      ]
    },

    // ========== DOMAIN 2: Professional Survey Practices (12 lessons) ==========
    {
      examTrack: 'ps',
      domainNumber: 2,
      domain: PS_DOMAINS[2],
      title: "Public and Private Record Sources",
      description: "Locating and using public and private records for surveying",
      content: "Professional surveyors must access various record sources including county recorder offices, assessor records, utility records, and private survey files. Understanding indexing systems and search procedures is essential.",
      difficulty: "medium",
      orderIndex: 1,
      estimatedMinutes: 25,
      suggestedWeek: 5,
      questions: [
        { type: "multiple_choice", text: "The county recorder's office typically maintains:", options: ["Only current deeds", "Deeds, plats, and easements", "Only tax records", "Survey field notes only", "GPS coordinates"], answer: "1", explanation: "The recorder maintains the official public record of property documents including deeds, plats, and easements.", points: 10 },
        { type: "fill_in_blank", text: "Most county recorder offices index documents by ___ and grantee indexes.", answer: "grantor", explanation: "The grantor-grantee index system allows tracking property through chains of title.", points: 10 },
        { type: "multiple_choice", text: "Which is typically a private record source?", options: ["County recorder", "Title company files", "Tax assessor", "Planning department", "USGS maps"], answer: "1", explanation: "Title company files are private records that may contain surveys and documents not in public records.", points: 10 },
        { type: "multiple_choice", text: "Survey field notes from previous surveys are valuable because they:", options: ["Are always accurate", "Show the original surveyor's observations and measurements", "Are required by law", "Replace the need for fieldwork", "Contain GPS data"], answer: "1", explanation: "Field notes document the original surveyor's procedures, measurements, and monument descriptions.", points: 10 },
        { type: "fill_in_blank", text: "The Bureau of Land Management maintains ___ survey records for PLSS surveys.", answer: "original", explanation: "BLM holds the original field notes and plats from Government Land Office surveys.", points: 10 }
      ]
    },
    {
      examTrack: 'ps',
      domainNumber: 2,
      domain: PS_DOMAINS[2],
      title: "Field Survey Documentation",
      description: "Proper field procedures and documentation practices",
      content: "Field documentation is the foundation of professional surveying. Proper field notes, data collection protocols, and documentation practices ensure surveys are defensible, reproducible, and meet professional standards.",
      difficulty: "medium",
      orderIndex: 2,
      estimatedMinutes: 25,
      suggestedWeek: 5,
      questions: [
        { type: "multiple_choice", text: "Field notes should be:", options: ["Written in pencil only", "Kept neat with no erasures", "Legible, complete, and contemporaneous", "Copied from previous surveys", "Typed in the office"], answer: "2", explanation: "Good field notes are legible, complete, and created at the time of observation (contemporaneous).", points: 10 },
        { type: "fill_in_blank", text: "Data collectors should be configured to record raw ___ for quality control.", answer: "observations", explanation: "Recording raw observations (angles, distances) allows for error checking and adjustment.", points: 10 },
        { type: "multiple_choice", text: "Sketches in field notes should include:", options: ["Only GPS coordinates", "North arrow, scale, and relevant features", "Only property lines", "Only monuments", "Computer-generated graphics"], answer: "1", explanation: "Field sketches should include orientation (north arrow), approximate scale, and all relevant features.", points: 10 },
        { type: "multiple_choice", text: "Which statement about field notes is FALSE?", options: ["They should never be altered", "Corrections should be initialed", "They are legal documents", "They should be clear and complete", "Errors should be crossed out, not erased"], answer: "0", explanation: "Field notes can be corrected, but corrections should be made properly (crossed out, initialed).", points: 10 },
        { type: "fill_in_blank", text: "Electronic data collection should include ___ checks to verify data quality.", answer: "redundant", explanation: "Redundant observations (multiple readings, checks) help identify and eliminate errors.", points: 10 }
      ]
    },
    {
      examTrack: 'ps',
      domainNumber: 2,
      domain: PS_DOMAINS[2],
      title: "GPS/GNSS: Static and RTK Methods",
      description: "Understanding GPS/GNSS positioning methods for professional surveying",
      content: "Modern surveying relies on GNSS technology. Static GPS provides high accuracy for control surveys, while RTK (Real-Time Kinematic) provides centimeter-level accuracy for boundary and topographic surveys.",
      difficulty: "hard",
      orderIndex: 3,
      estimatedMinutes: 35,
      suggestedWeek: 5,
      questions: [
        { type: "multiple_choice", text: "Static GPS surveys require:", options: ["Short observation times", "Long observation times at fixed points", "Single frequency receivers only", "No base station", "Only L1 signals"], answer: "1", explanation: "Static GPS uses long observation sessions (often 30+ minutes) at each point for highest accuracy.", points: 10 },
        { type: "fill_in_blank", text: "RTK stands for Real-Time ___.", answer: "Kinematic", explanation: "RTK (Real-Time Kinematic) provides centimeter-level positions in real-time using carrier phase measurements.", points: 10 },
        { type: "multiple_choice", text: "RTK requires what component that static GPS does not?", options: ["GPS receiver", "Antenna", "Real-time radio or cellular link to base", "Tripod", "Batteries"], answer: "2", explanation: "RTK requires a real-time communication link between base and rover for instant corrections.", points: 10 },
        { type: "multiple_choice", text: "PPP stands for:", options: ["Point Position Precision", "Precise Point Positioning", "Post-Processing Procedures", "Professional Practice Protocol", "Primary Point Placement"], answer: "1", explanation: "Precise Point Positioning uses satellite orbit and clock corrections without a local base station.", points: 10 },
        { type: "fill_in_blank", text: "Network RTK uses multiple base stations to model and correct for ___ errors.", answer: "atmospheric", explanation: "Network RTK uses multiple reference stations to create models of ionospheric and tropospheric delays.", points: 10 }
      ]
    },
    {
      examTrack: 'ps',
      domainNumber: 2,
      domain: PS_DOMAINS[2],
      title: "Datums and Reference Frames",
      description: "Understanding geodetic datums and coordinate reference frames",
      content: "Surveyors must understand the relationship between local datums and geodetic datums. NAD 83 and NAVD 88 are the current horizontal and vertical datums, while WGS 84 is used for GPS.",
      difficulty: "hard",
      orderIndex: 4,
      estimatedMinutes: 30,
      suggestedWeek: 6,
      questions: [
        { type: "multiple_choice", text: "NAD 83 is:", options: ["A vertical datum", "A horizontal geodetic datum", "A local datum only", "Outdated and no longer used", "A tidal datum"], answer: "1", explanation: "NAD 83 (North American Datum of 1983) is the current horizontal geodetic datum in the US.", points: 10 },
        { type: "fill_in_blank", text: "NAVD 88 is the National ___ Vertical Datum of 1988.", answer: "Geodetic", explanation: "NAVD 88 (National Geodetic Vertical Datum of 1988) is the current vertical datum for elevations.", points: 10 },
        { type: "multiple_choice", text: "The difference between NAD 27 and NAD 83 can be:", options: ["Zero", "Less than a foot everywhere", "Several hundred feet in some locations", "Exactly one meter", "Only vertical"], answer: "2", explanation: "Datum shifts between NAD 27 and NAD 83 can exceed 100 meters in some areas.", points: 10 },
        { type: "multiple_choice", text: "State Plane Coordinates are:", options: ["GPS coordinates", "Projected coordinates based on a geodetic datum", "Only used for state surveys", "Vertical measurements", "Obsolete"], answer: "1", explanation: "State Plane Coordinates are projected (map) coordinates derived from the geodetic datum (NAD 83).", points: 10 },
        { type: "fill_in_blank", text: "WGS 84 is the datum used by GPS and is virtually identical to ___.", answer: "NAD 83", explanation: "WGS 84 and NAD 83 are nearly identical (within centimeters in most of the US).", points: 10 }
      ]
    },
    {
      examTrack: 'ps',
      domainNumber: 2,
      domain: PS_DOMAINS[2],
      title: "Monumentation Standards",
      description: "Monument types, materials, and placement standards",
      content: "Monuments mark survey corners and control points. Different jurisdictions have specific requirements for monument types, materials, markings, and placement. Proper monumentation ensures corners can be recovered.",
      difficulty: "medium",
      orderIndex: 5,
      estimatedMinutes: 25,
      suggestedWeek: 6,
      questions: [
        { type: "multiple_choice", text: "Which is typically required on a survey monument?", options: ["GPS coordinates", "Surveyor's identification", "Date of installation", "Property owner's name", "Latitude and longitude"], answer: "1", explanation: "Most jurisdictions require monuments to bear the surveyor's license number or identification.", points: 10 },
        { type: "fill_in_blank", text: "Iron pipes or rods are commonly set at depths of ___ feet or more to be stable.", answer: "2", explanation: "Monuments are typically set 2 feet deep or to refusal to ensure stability.", points: 10 },
        { type: "multiple_choice", text: "Reference points (RPs) are used to:", options: ["Replace corner monuments", "Aid in recovering corners if disturbed", "Mark temporary points", "Show elevation only", "Mark utility lines"], answer: "1", explanation: "Reference points allow a corner to be recovered if the primary monument is disturbed or destroyed.", points: 10 },
        { type: "multiple_choice", text: "Which monument type is generally preferred for longevity?", options: ["Wood stake", "Iron pipe with cap", "Flagging", "Paint mark", "Nail"], answer: "1", explanation: "Iron or steel monuments with identification caps are durable and meet professional standards.", points: 10 },
        { type: "fill_in_blank", text: "A monument that was set by the original surveyor is called an ___ monument.", answer: "original", explanation: "Original monuments are those set by the original survey and have the highest evidentiary value.", points: 10 }
      ]
    },
    {
      examTrack: 'ps',
      domainNumber: 2,
      domain: PS_DOMAINS[2],
      title: "Land Development and Subdivision",
      description: "Survey requirements for land development projects",
      content: "Land development requires surveys for planning, design, and construction. Surveyors must understand regulatory requirements, subdivision procedures, and the technical surveys needed for land development.",
      difficulty: "medium",
      orderIndex: 6,
      estimatedMinutes: 30,
      suggestedWeek: 6,
      questions: [
        { type: "multiple_choice", text: "A preliminary plat is:", options: ["The final recorded document", "A proposed layout for approval", "A legal description", "A topographic map", "A boundary survey"], answer: "1", explanation: "A preliminary plat shows the proposed subdivision layout for planning approval.", points: 10 },
        { type: "fill_in_blank", text: "Most subdivisions require a ___ survey to determine existing site conditions.", answer: "topographic", explanation: "Topographic surveys show existing ground elevations, features, and conditions for design.", points: 10 },
        { type: "multiple_choice", text: "Dedication of streets in a subdivision:", options: ["Is automatic", "Transfers street areas to public ownership", "Is optional", "Only applies to utilities", "Creates easements only"], answer: "1", explanation: "Street dedication transfers ownership of streets to the local government for public use.", points: 10 },
        { type: "multiple_choice", text: "A final plat typically must show:", options: ["Only lot dimensions", "Monuments, lot dimensions, and easements", "Only street names", "Only utility locations", "Only acreage"], answer: "1", explanation: "Final plats must show all monuments, lot configurations, dimensions, easements, and dedications.", points: 10 },
        { type: "fill_in_blank", text: "Zoning and subdivision ___ establish the rules for land development in a jurisdiction.", answer: "ordinances", explanation: "Local ordinances establish requirements for lot sizes, setbacks, streets, and utilities.", points: 10 }
      ]
    },
    {
      examTrack: 'ps',
      domainNumber: 2,
      domain: PS_DOMAINS[2],
      title: "Survey Maps and Plats",
      description: "Standards for survey maps, plats, and reports",
      content: "Survey deliverables must meet professional and legal standards. Maps, plats, and reports communicate survey results and must be clear, complete, and properly certified.",
      difficulty: "medium",
      orderIndex: 7,
      estimatedMinutes: 25,
      suggestedWeek: 7,
      questions: [
        { type: "multiple_choice", text: "A boundary survey plat must include:", options: ["Only GPS coordinates", "North arrow, scale, and surveyor's certification", "Only the property description", "Only monument locations", "Only adjacent owners"], answer: "1", explanation: "Professional plats require proper orientation, scale, certification, and all relevant information.", points: 10 },
        { type: "fill_in_blank", text: "Survey plats must be signed and ___ by the licensed surveyor.", answer: "sealed", explanation: "Professional certification with signature and seal indicates the surveyor takes responsibility for the work.", points: 10 },
        { type: "multiple_choice", text: "The surveyor's certification on a plat:", options: ["Is optional", "Attests to the accuracy and completeness of the work", "Only identifies the surveyor", "Is required only for subdivisions", "Transfers liability to the client"], answer: "1", explanation: "The certification is a professional attestation that the survey meets applicable standards.", points: 10 },
        { type: "multiple_choice", text: "Which is NOT typically required on a boundary survey plat?", options: ["Bearings and distances", "Monument descriptions", "Title report number", "Adjoiner information", "Area calculation"], answer: "2", explanation: "While title information may be referenced, the title report number is not typically a required plat element.", points: 10 },
        { type: "fill_in_blank", text: "Survey reports provide written ___ about the survey methodology and findings.", answer: "narrative", explanation: "Reports document the surveyor's procedures, evidence evaluated, and conclusions reached.", points: 10 }
      ]
    },
    {
      examTrack: 'ps',
      domainNumber: 2,
      domain: PS_DOMAINS[2],
      title: "GIS and Spatial Data Standards",
      description: "Geographic Information Systems in professional surveying",
      content: "GIS technology is increasingly integrated with surveying. Surveyors must understand spatial databases, metadata requirements, projections, and standards for GIS data development.",
      difficulty: "medium",
      orderIndex: 8,
      estimatedMinutes: 25,
      suggestedWeek: 7,
      questions: [
        { type: "multiple_choice", text: "Metadata in GIS describes:", options: ["Only coordinate values", "Information about the data itself", "Only elevation data", "Only boundaries", "Only parcels"], answer: "1", explanation: "Metadata provides information about the data, including accuracy, source, and date of collection.", points: 10 },
        { type: "fill_in_blank", text: "Vector data in GIS consists of points, lines, and ___.", answer: "polygons", explanation: "Vector data represents features as discrete geometric elements (points, lines, polygons).", points: 10 },
        { type: "multiple_choice", text: "Raster data is organized as:", options: ["Points and lines", "A grid of cells with values", "Only text", "Vectors only", "Random points"], answer: "1", explanation: "Raster data uses a grid of cells (pixels) where each cell contains a value.", points: 10 },
        { type: "multiple_choice", text: "Why is projection information critical in GIS?", options: ["It is not important", "It determines how spherical coordinates are shown on a flat surface", "It only affects colors", "It only applies to paper maps", "It only affects text"], answer: "1", explanation: "Projection defines how the curved earth is represented on a flat surface, affecting all measurements.", points: 10 },
        { type: "fill_in_blank", text: "FGDC standards address ___ content and format for geospatial data.", answer: "metadata", explanation: "The Federal Geographic Data Committee establishes standards for metadata content.", points: 10 }
      ]
    },
    {
      examTrack: 'ps',
      domainNumber: 2,
      domain: PS_DOMAINS[2],
      title: "Surveying Computations and Software",
      description: "Technical computations and software applications in surveying",
      content: "Modern surveying relies on software for computations, adjustments, and data processing. Understanding mathematical principles behind the software ensures proper application and quality control.",
      difficulty: "hard",
      orderIndex: 9,
      estimatedMinutes: 30,
      suggestedWeek: 7,
      questions: [
        { type: "multiple_choice", text: "Least squares adjustment is used to:", options: ["Create the smallest survey", "Optimally distribute measurement errors", "Reduce the number of points", "Simplify calculations", "Eliminate all errors"], answer: "1", explanation: "Least squares distributes random errors throughout the network to find the most probable values.", points: 10 },
        { type: "fill_in_blank", text: "COGO stands for ___-Geometry.", answer: "Coordinate", explanation: "COGO (Coordinate Geometry) software performs calculations using coordinate values.", points: 10 },
        { type: "multiple_choice", text: "A traverse closure calculation determines:", options: ["The total distance", "The mathematical misclosure error", "The bearing of north", "The number of stations", "The elevation difference"], answer: "1", explanation: "Traverse closure computes the misclosure in position when returning to the starting point.", points: 10 },
        { type: "multiple_choice", text: "Inverse calculations determine:", options: ["Only elevation", "Bearing and distance from coordinates", "Only area", "Only latitude", "Only longitude"], answer: "1", explanation: "Inverse computations find the bearing and distance between two known coordinate points.", points: 10 },
        { type: "fill_in_blank", text: "CAD stands for Computer-Aided ___.", answer: "Design", explanation: "CAD (Computer-Aided Design/Drafting) software is used to produce survey drawings and plats.", points: 10 }
      ]
    },
    {
      examTrack: 'ps',
      domainNumber: 2,
      domain: PS_DOMAINS[2],
      title: "Quality Assurance and Quality Control",
      description: "QA/QC procedures for professional survey practice",
      content: "Quality assurance and quality control procedures ensure survey accuracy and reliability. Systematic checking, independent verification, and documentation are essential components of professional practice.",
      difficulty: "medium",
      orderIndex: 10,
      estimatedMinutes: 25,
      suggestedWeek: 8,
      questions: [
        { type: "multiple_choice", text: "Quality assurance (QA) focuses on:", options: ["Finding errors after they occur", "Preventing errors through systematic procedures", "Only equipment calibration", "Only client relations", "Only office procedures"], answer: "1", explanation: "QA is proactive, establishing procedures to prevent errors before they occur.", points: 10 },
        { type: "fill_in_blank", text: "Quality ___ (QC) involves checking work to identify and correct errors.", answer: "control", explanation: "QC involves systematic checking and verification to detect and correct errors.", points: 10 },
        { type: "multiple_choice", text: "Independent verification means:", options: ["The same person rechecks work", "A different person checks the work", "No checking is needed", "Only the client reviews work", "Only equipment checks"], answer: "1", explanation: "Independent verification involves a different person checking the work to catch errors.", points: 10 },
        { type: "multiple_choice", text: "Calibration records are important because they:", options: ["Are never needed", "Document equipment accuracy at time of use", "Only satisfy regulations", "Only apply to GPS", "Only apply to levels"], answer: "1", explanation: "Calibration records document that equipment was properly calibrated when used.", points: 10 },
        { type: "fill_in_blank", text: "Survey ___ should be maintained to document procedures and allow reconstruction of the work.", answer: "records", explanation: "Complete records allow the survey to be verified, defended, and reconstructed if needed.", points: 10 }
      ]
    },
    {
      examTrack: 'ps',
      domainNumber: 2,
      domain: PS_DOMAINS[2],
      title: "Supervision and Responsible Charge",
      description: "Legal and ethical requirements for professional supervision",
      content: "Licensed surveyors must maintain responsible charge of survey work. This includes supervision of field crews, review of computations, and certification that work meets professional standards.",
      difficulty: "medium",
      orderIndex: 11,
      estimatedMinutes: 25,
      suggestedWeek: 8,
      questions: [
        { type: "multiple_choice", text: "Responsible charge means the surveyor:", options: ["Was present at all times", "Has direct control and personal supervision", "Only signs the final product", "Delegated all work", "Only reviewed the finished product"], answer: "1", explanation: "Responsible charge requires the surveyor to have personal control and supervision of the work.", points: 10 },
        { type: "fill_in_blank", text: "A surveyor may delegate tasks but retains ___ for the final product.", answer: "responsibility", explanation: "The licensed surveyor remains responsible for work done under their supervision.", points: 10 },
        { type: "multiple_choice", text: "Which is NOT acceptable under responsible charge requirements?", options: ["Delegating field work to qualified technicians", "Reviewing all calculations", "Signing work not done under your supervision", "Supervising field crews remotely when appropriate", "Using survey software"], answer: "2", explanation: "Signing work not performed under your direct supervision violates responsible charge requirements.", points: 10 },
        { type: "multiple_choice", text: "Responsible charge requirements apply to:", options: ["Only boundary surveys", "All professional surveying services", "Only government work", "Only subdivision plats", "Only construction surveys"], answer: "1", explanation: "Responsible charge applies to all surveying work that requires a licensed surveyor.", points: 10 },
        { type: "fill_in_blank", text: "State licensing laws define the ___ of practice for licensed surveyors.", answer: "scope", explanation: "Each state defines what activities require a licensed surveyor through scope of practice definitions.", points: 10 }
      ]
    },
    {
      examTrack: 'ps',
      domainNumber: 2,
      domain: PS_DOMAINS[2],
      title: "Communication and Technical Writing",
      description: "Effective communication with clients and professionals",
      content: "Surveyors must communicate technical information clearly to clients, attorneys, engineers, and the public. Written reports, oral presentations, and expert testimony require clear, accurate communication.",
      difficulty: "medium",
      orderIndex: 12,
      estimatedMinutes: 20,
      suggestedWeek: 8,
      questions: [
        { type: "multiple_choice", text: "When communicating with non-technical clients:", options: ["Use maximum technical jargon", "Explain concepts in clear, understandable terms", "Provide no explanation", "Only provide legal opinions", "Avoid written communication"], answer: "1", explanation: "Effective communication requires adapting technical language to the audience's understanding.", points: 10 },
        { type: "fill_in_blank", text: "A survey ___ provides written documentation explaining survey methodology and findings.", answer: "report", explanation: "Survey reports communicate the surveyor's procedures, findings, and opinions in writing.", points: 10 },
        { type: "multiple_choice", text: "Expert witness testimony requires:", options: ["No preparation", "Objective, unbiased opinions based on professional expertise", "Advocacy for the hiring party", "Simplified opinions only", "Avoiding technical details"], answer: "1", explanation: "Expert witnesses must provide objective, unbiased opinions regardless of who retained them.", points: 10 },
        { type: "multiple_choice", text: "Technical communication should be:", options: ["Vague to avoid liability", "Clear, complete, and accurate", "Minimal in detail", "Only verbal", "Only in legal language"], answer: "1", explanation: "All technical communication should clearly and accurately convey information.", points: 10 },
        { type: "fill_in_blank", text: "Surveyors often coordinate with engineers, architects, and ___ on projects.", answer: "attorneys", explanation: "Multi-disciplinary projects require coordination with various professionals including attorneys.", points: 10 }
      ]
    },

    // ========== DOMAIN 3: Standards and Specifications (8 lessons) ==========
    {
      examTrack: 'ps',
      domainNumber: 3,
      domain: PS_DOMAINS[3],
      title: "ALTA/NSPS Land Title Survey Standards",
      description: "Understanding and applying ALTA/NSPS survey requirements",
      content: "ALTA/NSPS Land Title Surveys are comprehensive boundary surveys that meet specific standards jointly developed by the American Land Title Association and National Society of Professional Surveyors. These surveys support real estate transactions and title insurance.",
      difficulty: "hard",
      orderIndex: 1,
      estimatedMinutes: 40,
      suggestedWeek: 9,
      questions: [
        { type: "multiple_choice", text: "The current ALTA/NSPS standards were adopted in:", options: ["2016", "2021", "2011", "2000", "2025"], answer: "1", explanation: "The 2021 ALTA/NSPS standards are currently in effect.", points: 10 },
        { type: "fill_in_blank", text: "ALTA/NSPS surveys require a relative positional precision of ___ feet at 95% confidence.", answer: "0.07", explanation: "The standards require a relative positional precision of 0.07 feet plus 50 ppm at 95% confidence.", points: 10 },
        { type: "multiple_choice", text: "Table A items in ALTA/NSPS surveys are:", options: ["Mandatory requirements", "Optional additional services", "Title company requirements", "State requirements", "Federal requirements"], answer: "1", explanation: "Table A contains optional services that clients may select in addition to minimum requirements.", points: 10 },
        { type: "multiple_choice", text: "An ALTA/NSPS survey must show:", options: ["Only building locations", "Improvements, easements, and servitudes affecting the property", "Only the boundary", "Only utilities", "Only access"], answer: "1", explanation: "The survey must show improvements and evidence of easements and servitudes.", points: 10 },
        { type: "fill_in_blank", text: "The surveyor must certify the survey to parties identified in the ___.", answer: "certification", explanation: "The survey certificate names the parties to whom the surveyor certifies the accuracy of the work.", points: 10 }
      ]
    },
    {
      examTrack: 'ps',
      domainNumber: 3,
      domain: PS_DOMAINS[3],
      title: "ALTA Table A Optional Items",
      description: "Understanding Table A optional services for ALTA surveys",
      content: "Table A of the ALTA/NSPS standards lists optional services that may be requested by the client or lender. Understanding these options and their requirements is essential for ALTA survey practice.",
      difficulty: "hard",
      orderIndex: 2,
      estimatedMinutes: 35,
      suggestedWeek: 9,
      questions: [
        { type: "multiple_choice", text: "Table A Item 1 addresses:", options: ["Underground utilities", "Monuments", "Flood zone determination", "Zoning information", "Environmental issues"], answer: "1", explanation: "Table A Item 1 requires placing monuments at property corners.", points: 10 },
        { type: "fill_in_blank", text: "Table A Item 8 requires a statement regarding ___ zone classification.", answer: "flood", explanation: "Item 8 addresses flood zone determination relative to FEMA maps.", points: 10 },
        { type: "multiple_choice", text: "Underground utility locations (Table A Item 19) requires:", options: ["No additional work", "Visible utilities only", "Utility company locate marks and noting limitations", "Excavation", "Ground-penetrating radar"], answer: "2", explanation: "Item 19 requires showing utility locate marks and noting that underground utilities shown are per locate marks.", points: 10 },
        { type: "multiple_choice", text: "When is a zoning report (Table A Item 6) required?", options: ["Always", "When specifically requested", "Only for commercial property", "Only for residential property", "Never"], answer: "1", explanation: "Table A items are optional and only required when specifically requested.", points: 10 },
        { type: "fill_in_blank", text: "Table A negotiation occurs between the surveyor and ___ before the survey begins.", answer: "client", explanation: "The surveyor and client negotiate which Table A items are required for the specific project.", points: 10 }
      ]
    },
    {
      examTrack: 'ps',
      domainNumber: 3,
      domain: PS_DOMAINS[3],
      title: "BLM Manual of Surveying Instructions",
      description: "Understanding federal surveying standards for PLSS surveys",
      content: "The BLM Manual of Surveying Instructions is the authoritative guide for surveys within the Public Land Survey System. It establishes procedures for original surveys, resurveys, and corner restoration.",
      difficulty: "hard",
      orderIndex: 3,
      estimatedMinutes: 35,
      suggestedWeek: 9,
      questions: [
        { type: "multiple_choice", text: "The current Manual of Surveying Instructions edition is:", options: ["1973", "1947", "2009", "2021", "1855"], answer: "2", explanation: "The 2009 edition is the current Manual of Surveying Instructions.", points: 10 },
        { type: "fill_in_blank", text: "The Manual establishes procedures for ___ proportionate measurement to restore lost corners.", answer: "single", explanation: "Single and double proportionate measurement methods restore lost corners based on found original corners.", points: 10 },
        { type: "multiple_choice", text: "According to the Manual, an original corner:", options: ["Can be moved if convenient", "Controls all subsequent surveys", "Is only advisory", "Must be GPS positioned", "Expires after 50 years"], answer: "1", explanation: "Original corners established by the official survey are controlling and cannot be moved.", points: 10 },
        { type: "multiple_choice", text: "A closing corner is:", options: ["The last corner set", "A corner where a line closes on a prior survey line", "A boundary corner", "A quarter corner", "A temporary corner"], answer: "1", explanation: "Closing corners are set where survey lines close on previously established lines.", points: 10 },
        { type: "fill_in_blank", text: "Meander lines were run to define ___ boundaries, not property boundaries.", answer: "water", explanation: "Meander lines approximate water boundaries but the actual water edge is the legal boundary.", points: 10 }
      ]
    },
    {
      examTrack: 'ps',
      domainNumber: 3,
      domain: PS_DOMAINS[3],
      title: "FEMA Flood Zone Requirements",
      description: "Understanding FEMA requirements for flood determinations",
      content: "FEMA establishes requirements for flood zone determinations and elevation certificates. Surveyors must understand flood maps, datum requirements, and certification procedures.",
      difficulty: "medium",
      orderIndex: 4,
      estimatedMinutes: 30,
      suggestedWeek: 10,
      questions: [
        { type: "multiple_choice", text: "An Elevation Certificate is used to:", options: ["Determine property value", "Document building elevation relative to flood zone", "Locate property boundaries", "Measure property area", "Identify utilities"], answer: "1", explanation: "Elevation Certificates document the elevation of structures relative to the Base Flood Elevation.", points: 10 },
        { type: "fill_in_blank", text: "BFE stands for Base ___ Elevation.", answer: "Flood", explanation: "Base Flood Elevation is the computed elevation of the 1% annual chance flood.", points: 10 },
        { type: "multiple_choice", text: "FIRM stands for:", options: ["Federal Insurance Rate Manual", "Flood Insurance Rate Map", "Federal Improvement Reference Map", "Flood Identification Reference Manual", "Federal Information Reference Map"], answer: "1", explanation: "Flood Insurance Rate Maps show flood hazard zones and Base Flood Elevations.", points: 10 },
        { type: "multiple_choice", text: "What vertical datum is typically used for FEMA Elevation Certificates?", options: ["NGVD 29 or NAVD 88", "Local assumed datum", "NAD 83", "WGS 84", "Mean High Water"], answer: "0", explanation: "Elevation Certificates must reference NGVD 29 or NAVD 88 as shown on the FIRM.", points: 10 },
        { type: "fill_in_blank", text: "Zone ___ designates areas of minimal flood hazard.", answer: "X", explanation: "Zone X (or Zone C on older maps) indicates areas outside the 100-year flood zone.", points: 10 }
      ]
    },
    {
      examTrack: 'ps',
      domainNumber: 3,
      domain: PS_DOMAINS[3],
      title: "FGDC Geospatial Standards",
      description: "Federal Geographic Data Committee accuracy standards",
      content: "FGDC establishes standards for geospatial data accuracy and metadata. Understanding positional accuracy standards helps surveyors ensure their work meets federal requirements.",
      difficulty: "hard",
      orderIndex: 5,
      estimatedMinutes: 30,
      suggestedWeek: 10,
      questions: [
        { type: "multiple_choice", text: "FGDC accuracy standards express horizontal accuracy at what confidence level?", options: ["68%", "90%", "95%", "99%", "100%"], answer: "2", explanation: "FGDC standards report horizontal accuracy at the 95% confidence level.", points: 10 },
        { type: "fill_in_blank", text: "NSSDA stands for National Standard for Spatial Data ___.", answer: "Accuracy", explanation: "The National Standard for Spatial Data Accuracy establishes methods for testing and reporting accuracy.", points: 10 },
        { type: "multiple_choice", text: "Vertical accuracy under NSSDA is reported as:", options: ["Standard deviation", "Accuracy at 95% confidence", "Maximum error", "Average error", "RMS error only"], answer: "1", explanation: "NSSDA reports vertical accuracy at the 95% confidence level.", points: 10 },
        { type: "multiple_choice", text: "Metadata standards require documentation of:", options: ["Only coordinate values", "Data lineage, accuracy, and content", "Only file names", "Only dates", "Only equipment used"], answer: "1", explanation: "Metadata must document how data was collected, its accuracy, and its content.", points: 10 },
        { type: "fill_in_blank", text: "NGP standards address the National ___ Programs for geodetic data.", answer: "Geospatial", explanation: "National Geospatial Programs standards govern geodetic data collection and documentation.", points: 10 }
      ]
    },
    {
      examTrack: 'ps',
      domainNumber: 3,
      domain: PS_DOMAINS[3],
      title: "State Surveying Standards and Regulations",
      description: "Understanding state-specific requirements for surveying practice",
      content: "Each state has specific regulations governing surveying practice. These include licensing requirements, minimum technical standards, and recording requirements for survey documents.",
      difficulty: "medium",
      orderIndex: 6,
      estimatedMinutes: 25,
      suggestedWeek: 10,
      questions: [
        { type: "multiple_choice", text: "State minimum technical standards typically address:", options: ["Only monument types", "Accuracy, monumentation, and certification requirements", "Only licensing fees", "Only education requirements", "Only field procedures"], answer: "1", explanation: "State standards typically cover technical accuracy, monuments, and certification requirements.", points: 10 },
        { type: "fill_in_blank", text: "Most states require surveys to be signed and ___ by the licensed surveyor.", answer: "sealed", explanation: "Professional seals authenticate that the survey was prepared under the surveyor's supervision.", points: 10 },
        { type: "multiple_choice", text: "State surveying regulations are typically administered by:", options: ["NCEES", "NSPS", "A state licensing board", "ALTA", "BLM"], answer: "2", explanation: "State licensing boards administer surveying regulations within their jurisdiction.", points: 10 },
        { type: "multiple_choice", text: "Continuing education requirements:", options: ["Are the same in all states", "Vary by state", "Do not exist", "Only apply to new licensees", "Are optional"], answer: "1", explanation: "Continuing education requirements vary significantly between states.", points: 10 },
        { type: "fill_in_blank", text: "Many states require subdivision plats to be recorded in the ___ recorder's office.", answer: "county", explanation: "County recorder offices maintain the public record of subdivision plats and surveys.", points: 10 }
      ]
    },
    {
      examTrack: 'ps',
      domainNumber: 3,
      domain: PS_DOMAINS[3],
      title: "National Map Accuracy Standards",
      description: "Understanding USMAS requirements for mapping",
      content: "The United States National Map Accuracy Standards (NMAS) establish requirements for map accuracy. While superseded by NSSDA for many purposes, NMAS remains relevant for certain applications.",
      difficulty: "medium",
      orderIndex: 7,
      estimatedMinutes: 25,
      suggestedWeek: 11,
      questions: [
        { type: "multiple_choice", text: "NMAS was established in:", options: ["1900", "1947", "1983", "2000", "2010"], answer: "1", explanation: "The National Map Accuracy Standards were established in 1947.", points: 10 },
        { type: "fill_in_blank", text: "Under NMAS, 90% of well-defined points must be within ___ limits.", answer: "stated", explanation: "NMAS requires that 90% of well-defined points test within stated accuracy limits.", points: 10 },
        { type: "multiple_choice", text: "For maps at 1:24,000 scale, NMAS requires horizontal accuracy of:", options: ["1 foot", "40 feet", "100 feet", "500 feet", "1000 feet"], answer: "1", explanation: "At 1:24,000 scale, 1/50 inch equals approximately 40 feet on the ground.", points: 10 },
        { type: "multiple_choice", text: "NMAS applies primarily to:", options: ["Boundary surveys", "Topographic mapping", "Construction staking", "Control surveys", "ALTA surveys"], answer: "1", explanation: "NMAS was developed for topographic map accuracy requirements.", points: 10 },
        { type: "fill_in_blank", text: "NMAS has been largely replaced by ___ for accuracy testing.", answer: "NSSDA", explanation: "NSSDA (National Standard for Spatial Data Accuracy) is the current standard for accuracy testing.", points: 10 }
      ]
    },
    {
      examTrack: 'ps',
      domainNumber: 3,
      domain: PS_DOMAINS[3],
      title: "Geodetic Survey Standards",
      description: "NGS standards for control survey accuracy",
      content: "The National Geodetic Survey establishes standards for geodetic control surveys. Understanding order and class designations ensures surveys meet requirements for specific applications.",
      difficulty: "hard",
      orderIndex: 8,
      estimatedMinutes: 30,
      suggestedWeek: 11,
      questions: [
        { type: "multiple_choice", text: "NGS accuracy standards use orders designated as:", options: ["1, 2, 3", "A, B, C", "First, Second, Third", "I, II, III", "High, Medium, Low"], answer: "2", explanation: "NGS uses First, Second, and Third Order designations for accuracy classifications.", points: 10 },
        { type: "fill_in_blank", text: "First Order surveys have the ___ accuracy requirements.", answer: "highest", explanation: "First Order represents the highest accuracy class in NGS standards.", points: 10 },
        { type: "multiple_choice", text: "Class within an order indicates:", options: ["The type of equipment", "A subdivision of accuracy within the order", "The survey date", "The number of observations", "The surveyor's experience"], answer: "1", explanation: "Class (I, II) provides additional accuracy subdivision within each order.", points: 10 },
        { type: "multiple_choice", text: "CORS stands for:", options: ["Continuous Operating Reference System", "Continuously Operating Reference Station", "Control Observation Reference System", "Coordinate Reference Standard", "Continuous Observation Recording System"], answer: "1", explanation: "CORS are permanent GPS reference stations operated by NGS and partners.", points: 10 },
        { type: "fill_in_blank", text: "OPUS is an NGS online service for processing ___ GPS data.", answer: "static", explanation: "OPUS (Online Positioning User Service) processes static GPS observations.", points: 10 }
      ]
    },

    // ========== DOMAIN 4: Business Practices (8 lessons) ==========
    {
      examTrack: 'ps',
      domainNumber: 4,
      domain: PS_DOMAINS[4],
      title: "Project Planning and Management",
      description: "Managing survey projects from proposal to completion",
      content: "Effective project management ensures surveys are completed on time, within budget, and to required standards. This includes proposal preparation, scheduling, resource allocation, and client communication.",
      difficulty: "medium",
      orderIndex: 1,
      estimatedMinutes: 25,
      suggestedWeek: 11,
      questions: [
        { type: "multiple_choice", text: "A survey proposal should include:", options: ["Only the fee", "Scope of services, deliverables, and fee", "Only the timeline", "Only the methodology", "Only references"], answer: "1", explanation: "Proposals should clearly define scope, deliverables, timeline, and fee.", points: 10 },
        { type: "fill_in_blank", text: "A project ___ outlines the tasks, timeline, and resources for a survey project.", answer: "schedule", explanation: "Project schedules organize tasks and resources to meet deadlines.", points: 10 },
        { type: "multiple_choice", text: "Scope creep refers to:", options: ["Gradual expansion of project scope beyond original agreement", "Survey error", "Equipment problems", "Staff turnover", "Weather delays"], answer: "0", explanation: "Scope creep is the uncontrolled expansion of project scope without corresponding adjustments.", points: 10 },
        { type: "multiple_choice", text: "Client expectations should be:", options: ["Assumed", "Clearly communicated and documented", "Minimized", "Ignored", "Changed frequently"], answer: "1", explanation: "Clear communication and documentation of expectations prevents misunderstandings.", points: 10 },
        { type: "fill_in_blank", text: "A kick-off ___ brings stakeholders together to discuss project requirements.", answer: "meeting", explanation: "Kick-off meetings align all parties on project goals, timeline, and requirements.", points: 10 }
      ]
    },
    {
      examTrack: 'ps',
      domainNumber: 4,
      domain: PS_DOMAINS[4],
      title: "Contracts and Agreements",
      description: "Legal aspects of survey contracts and client agreements",
      content: "Survey contracts define the legal relationship between surveyor and client. Understanding contract elements, limitation of liability, and dispute resolution protects both parties.",
      difficulty: "medium",
      orderIndex: 2,
      estimatedMinutes: 30,
      suggestedWeek: 12,
      questions: [
        { type: "multiple_choice", text: "A valid contract requires:", options: ["Only a signature", "Offer, acceptance, and consideration", "Only a written document", "Only payment", "Only verbal agreement"], answer: "1", explanation: "Contracts require offer, acceptance, consideration, capacity, and legality.", points: 10 },
        { type: "fill_in_blank", text: "A limitation of ___ clause caps the surveyor's financial responsibility.", answer: "liability", explanation: "Limitation of liability clauses restrict the maximum damages a surveyor may owe.", points: 10 },
        { type: "multiple_choice", text: "An indemnification clause:", options: ["Limits fees", "Shifts responsibility for certain claims", "Extends the deadline", "Guarantees accuracy", "Waives all liability"], answer: "1", explanation: "Indemnification provisions allocate responsibility for claims between parties.", points: 10 },
        { type: "multiple_choice", text: "A change order is used when:", options: ["The project is cancelled", "The scope of work changes after contract signing", "The fee decreases", "Weather delays occur", "Equipment fails"], answer: "1", explanation: "Change orders document modifications to the original scope of work.", points: 10 },
        { type: "fill_in_blank", text: "Disputes may be resolved through litigation, arbitration, or ___.", answer: "mediation", explanation: "Mediation is a voluntary dispute resolution process using a neutral third party.", points: 10 }
      ]
    },
    {
      examTrack: 'ps',
      domainNumber: 4,
      domain: PS_DOMAINS[4],
      title: "Risk Management and Insurance",
      description: "Managing professional liability and business risks",
      content: "Risk management protects surveyors from liability claims. Professional liability insurance, proper documentation, and quality control procedures are essential components of risk management.",
      difficulty: "medium",
      orderIndex: 3,
      estimatedMinutes: 25,
      suggestedWeek: 12,
      questions: [
        { type: "multiple_choice", text: "Professional liability insurance (E&O) covers:", options: ["Property damage", "Errors and omissions in professional services", "Employee injuries", "Vehicle accidents", "Equipment theft"], answer: "1", explanation: "E&O insurance covers claims arising from professional errors or negligence.", points: 10 },
        { type: "fill_in_blank", text: "The statute of ___ limits the time to bring a lawsuit after an error is discovered.", answer: "limitations", explanation: "Statutes of limitations and repose define time limits for filing claims.", points: 10 },
        { type: "multiple_choice", text: "Tail coverage in E&O insurance:", options: ["Is not needed", "Provides coverage for claims made after policy ends for work done during policy", "Covers vehicle accidents", "Is always free", "Only applies to employees"], answer: "1", explanation: "Tail coverage extends protection for claims filed after a claims-made policy expires.", points: 10 },
        { type: "multiple_choice", text: "Which practice reduces risk of liability claims?", options: ["Minimal documentation", "Thorough documentation and QA/QC", "Avoiding written contracts", "Quick turnaround without review", "Verbal agreements only"], answer: "1", explanation: "Good documentation and quality control demonstrate professional care and reduce liability.", points: 10 },
        { type: "fill_in_blank", text: "General ___ insurance covers property damage and bodily injury claims.", answer: "liability", explanation: "General liability insurance covers accidents and property damage, separate from E&O.", points: 10 }
      ]
    },
    {
      examTrack: 'ps',
      domainNumber: 4,
      domain: PS_DOMAINS[4],
      title: "Safety Procedures",
      description: "Workplace safety requirements for survey operations",
      content: "Survey work involves hazards including traffic, excavation, equipment, and environmental conditions. Understanding and implementing safety procedures protects workers and the public.",
      difficulty: "medium",
      orderIndex: 4,
      estimatedMinutes: 25,
      suggestedWeek: 12,
      questions: [
        { type: "multiple_choice", text: "OSHA stands for:", options: ["Office of Survey Hazard Analysis", "Occupational Safety and Health Administration", "Organization of Safety Hazard Assessment", "Outdoor Survey Hazard Administration", "Office of Safety and Hazard Analysis"], answer: "1", explanation: "OSHA is the federal agency responsible for workplace safety regulations.", points: 10 },
        { type: "fill_in_blank", text: "A Job ___ Analysis identifies potential hazards before work begins.", answer: "Hazard", explanation: "Job Hazard Analysis (JHA) systematically identifies and addresses workplace hazards.", points: 10 },
        { type: "multiple_choice", text: "High-visibility safety vests are required when:", options: ["Never", "Only at night", "Working near traffic or construction", "Only on government projects", "Only for supervisors"], answer: "2", explanation: "High-visibility apparel is required when workers may be exposed to traffic or equipment.", points: 10 },
        { type: "multiple_choice", text: "811 (Call Before You Dig) should be used:", options: ["Only for excavation over 5 feet", "Before any excavation that may affect utilities", "Only in urban areas", "Only for gas lines", "Only for government work"], answer: "1", explanation: "Utility locates should be requested before any excavation that might affect underground utilities.", points: 10 },
        { type: "fill_in_blank", text: "Personal Protective Equipment is commonly abbreviated as ___.", answer: "PPE", explanation: "PPE includes hard hats, safety glasses, vests, and other protective gear.", points: 10 }
      ]
    },
    {
      examTrack: 'ps',
      domainNumber: 4,
      domain: PS_DOMAINS[4],
      title: "Professional Ethics and Conduct",
      description: "Ethical obligations of licensed professional surveyors",
      content: "Professional surveyors must maintain high ethical standards. This includes honesty, competence, avoiding conflicts of interest, and protecting the public welfare.",
      difficulty: "medium",
      orderIndex: 5,
      estimatedMinutes: 25,
      suggestedWeek: 13,
      questions: [
        { type: "multiple_choice", text: "A surveyor's primary obligation is to:", options: ["The client", "The public health, safety, and welfare", "The employer", "Other surveyors", "Title companies"], answer: "1", explanation: "Like all licensed professionals, surveyors have a primary duty to protect the public.", points: 10 },
        { type: "fill_in_blank", text: "A conflict of ___ occurs when personal interests may influence professional judgment.", answer: "interest", explanation: "Conflicts of interest must be disclosed or avoided to maintain objectivity.", points: 10 },
        { type: "multiple_choice", text: "Signing a survey you did not supervise is:", options: ["Acceptable if you review it", "A violation of professional ethics", "Required for large firms", "Optional", "Encouraged for efficiency"], answer: "1", explanation: "Signing work not under your responsible charge violates ethical and legal requirements.", points: 10 },
        { type: "multiple_choice", text: "When discovering an error in your own work, you should:", options: ["Ignore it", "Disclose and correct it", "Hide it", "Blame others", "Wait for a complaint"], answer: "1", explanation: "Professional ethics require disclosure and correction of errors.", points: 10 },
        { type: "fill_in_blank", text: "Professional ___ requires maintaining current knowledge through continuing education.", answer: "competency", explanation: "Surveyors must maintain competency in their areas of practice.", points: 10 }
      ]
    },
    {
      examTrack: 'ps',
      domainNumber: 4,
      domain: PS_DOMAINS[4],
      title: "Costs, Budgets, and Billing",
      description: "Financial management for survey projects",
      content: "Understanding project costs, preparing accurate budgets, and fair billing practices are essential for sustainable survey practice. This includes direct costs, overhead, and profit margins.",
      difficulty: "medium",
      orderIndex: 6,
      estimatedMinutes: 25,
      suggestedWeek: 13,
      questions: [
        { type: "multiple_choice", text: "Direct costs in surveying include:", options: ["Rent and utilities only", "Labor and equipment specific to a project", "Only overhead", "Only profit", "Only insurance"], answer: "1", explanation: "Direct costs are expenses directly attributable to a specific project.", points: 10 },
        { type: "fill_in_blank", text: "___ costs are general business expenses not tied to specific projects.", answer: "Overhead", explanation: "Overhead includes rent, utilities, administrative staff, and other general expenses.", points: 10 },
        { type: "multiple_choice", text: "A multiplier applied to direct labor typically covers:", options: ["Only profit", "Overhead and profit", "Only taxes", "Only equipment", "Only insurance"], answer: "1", explanation: "Labor multipliers typically cover overhead burden and profit margin.", points: 10 },
        { type: "multiple_choice", text: "Lump sum contracts:", options: ["Bill by the hour", "Provide a fixed price for defined scope", "Have no defined scope", "Are illegal", "Are only for government work"], answer: "1", explanation: "Lump sum contracts provide a fixed fee for a defined scope of work.", points: 10 },
        { type: "fill_in_blank", text: "Time and ___ contracts bill actual costs plus a fee.", answer: "materials", explanation: "Time and materials contracts bill actual labor hours and expenses.", points: 10 }
      ]
    },
    {
      examTrack: 'ps',
      domainNumber: 4,
      domain: PS_DOMAINS[4],
      title: "Equipment Selection and Maintenance",
      description: "Choosing and maintaining survey equipment",
      content: "Selecting appropriate equipment for each project and maintaining equipment in calibration ensures accurate results. Understanding equipment capabilities and limitations is essential.",
      difficulty: "medium",
      orderIndex: 7,
      estimatedMinutes: 25,
      suggestedWeek: 13,
      questions: [
        { type: "multiple_choice", text: "Equipment selection should be based on:", options: ["What is available", "Project accuracy requirements and conditions", "Only cost", "Only age of equipment", "Client preference only"], answer: "1", explanation: "Equipment should be selected based on accuracy requirements and project conditions.", points: 10 },
        { type: "fill_in_blank", text: "Regular equipment ___ ensures instruments meet accuracy specifications.", answer: "calibration", explanation: "Calibration verifies and adjusts instruments to maintain accuracy.", points: 10 },
        { type: "multiple_choice", text: "Total stations should be checked for:", options: ["Color only", "Collimation and calibration", "Weight only", "Size only", "Brand name"], answer: "1", explanation: "Regular collimation checks and calibration ensure measurement accuracy.", points: 10 },
        { type: "multiple_choice", text: "GPS receivers require:", options: ["No maintenance", "Regular firmware updates and antenna checks", "Daily replacement", "Only battery checks", "Monthly recertification"], answer: "1", explanation: "GPS equipment requires firmware updates, antenna verification, and regular checks.", points: 10 },
        { type: "fill_in_blank", text: "Preventive ___ schedules help avoid equipment failures.", answer: "maintenance", explanation: "Scheduled maintenance prevents unexpected equipment failures in the field.", points: 10 }
      ]
    },
    {
      examTrack: 'ps',
      domainNumber: 4,
      domain: PS_DOMAINS[4],
      title: "Client Relations and Communication",
      description: "Building and maintaining professional client relationships",
      content: "Strong client relationships are built on clear communication, meeting expectations, and professional conduct. Effective communication with clients, attorneys, and other professionals is essential.",
      difficulty: "medium",
      orderIndex: 8,
      estimatedMinutes: 20,
      suggestedWeek: 14,
      questions: [
        { type: "multiple_choice", text: "Client communication should be:", options: ["Minimal", "Clear, timely, and documented", "Only when problems arise", "Only at project end", "Only verbal"], answer: "1", explanation: "Regular, clear communication builds trust and prevents misunderstandings.", points: 10 },
        { type: "fill_in_blank", text: "A project ___ letter confirms scope and terms with the client.", answer: "engagement", explanation: "Engagement letters document the agreed scope, terms, and expectations.", points: 10 },
        { type: "multiple_choice", text: "When a client requests work outside your competence:", options: ["Accept it anyway", "Decline and refer to a qualified professional", "Attempt it without training", "Ignore the limitation", "Sub-contract without disclosure"], answer: "1", explanation: "Professional ethics require referring work outside your competence to qualified professionals.", points: 10 },
        { type: "multiple_choice", text: "Client confidentiality requires:", options: ["Sharing information freely", "Protecting client information from disclosure", "Only verbal commitments", "No documentation", "Disclosure to competitors"], answer: "1", explanation: "Client information must be protected from unauthorized disclosure.", points: 10 },
        { type: "fill_in_blank", text: "Client ___ programs help generate referrals and repeat business.", answer: "retention", explanation: "Client retention programs build long-term relationships and referrals.", points: 10 }
      ]
    },

    // ========== DOMAIN 5: Areas of Practice (15 lessons) ==========
    {
      examTrack: 'ps',
      domainNumber: 5,
      domain: PS_DOMAINS[5],
      title: "ALTA/NSPS Land Title Surveys in Practice",
      description: "Performing comprehensive land title surveys",
      content: "ALTA/NSPS surveys are comprehensive boundary surveys that support real estate transactions. They require research, fieldwork, and detailed reporting of improvements, easements, and encumbrances.",
      difficulty: "hard",
      orderIndex: 1,
      estimatedMinutes: 40,
      suggestedWeek: 14,
      questions: [
        { type: "multiple_choice", text: "An ALTA survey requires review of:", options: ["Only the deed", "Title commitment, deeds, and recorded documents", "Only the plat", "Only field evidence", "Only aerial photos"], answer: "1", explanation: "ALTA surveys require comprehensive review of title commitment and recorded documents.", points: 10 },
        { type: "fill_in_blank", text: "The surveyor must identify evidence of ___ affecting the property.", answer: "possession", explanation: "Evidence of occupation and use may indicate unrecorded rights.", points: 10 },
        { type: "multiple_choice", text: "Encroachments shown on ALTA surveys include:", options: ["Only fences", "Improvements crossing property lines", "Only buildings", "Only driveways", "Only landscaping"], answer: "1", explanation: "All improvements crossing boundaries must be shown, including structures, fences, and drives.", points: 10 },
        { type: "multiple_choice", text: "Access to public ways must be shown:", options: ["Never", "When apparent from record or observation", "Only if requested", "Only for commercial property", "Only for corner lots"], answer: "1", explanation: "The survey must address access to public ways based on documents and observation.", points: 10 },
        { type: "fill_in_blank", text: "ALTA surveys typically serve ___ companies and lenders.", answer: "title", explanation: "Title insurance companies and lenders rely on ALTA surveys for transaction support.", points: 10 }
      ]
    },
    {
      examTrack: 'ps',
      domainNumber: 5,
      domain: PS_DOMAINS[5],
      title: "Control Network Surveys",
      description: "Establishing geodetic and local control networks",
      content: "Control surveys establish reference frameworks for other surveys. They require high accuracy and connection to geodetic datums for coordinates and elevations.",
      difficulty: "hard",
      orderIndex: 2,
      estimatedMinutes: 35,
      suggestedWeek: 14,
      questions: [
        { type: "multiple_choice", text: "Geodetic control surveys are referenced to:", options: ["Local assumed datums", "National geodetic datums (NAD 83, NAVD 88)", "Project datums only", "Arbitrary coordinates", "Historical datums only"], answer: "1", explanation: "Geodetic control connects to national reference frameworks.", points: 10 },
        { type: "fill_in_blank", text: "Primary control monuments should be ___ and stable for long-term use.", answer: "permanent", explanation: "Control monuments should be durable and stable for reference over time.", points: 10 },
        { type: "multiple_choice", text: "Network redundancy in control surveys:", options: ["Is unnecessary", "Provides checks and allows adjustment", "Increases error", "Is only for government work", "Decreases accuracy"], answer: "1", explanation: "Redundant observations allow error detection and optimal adjustment.", points: 10 },
        { type: "multiple_choice", text: "Level loops are used for:", options: ["Horizontal control only", "Vertical control and error checking", "GPS only", "Boundary surveys only", "Construction staking"], answer: "1", explanation: "Level loops establish vertical control and check for errors by closing on known points.", points: 10 },
        { type: "fill_in_blank", text: "OPUS can process static GPS data and provide coordinates in the ___ reference frame.", answer: "NAD 83", explanation: "OPUS provides coordinates referenced to NAD 83 using the national CORS network.", points: 10 }
      ]
    },
    {
      examTrack: 'ps',
      domainNumber: 5,
      domain: PS_DOMAINS[5],
      title: "Construction Staking",
      description: "Layout surveys for construction projects",
      content: "Construction surveys transfer design information to the ground for building, grading, and utility installation. This requires understanding plans, calculating offsets, and communicating with contractors.",
      difficulty: "medium",
      orderIndex: 3,
      estimatedMinutes: 30,
      suggestedWeek: 15,
      questions: [
        { type: "multiple_choice", text: "Cut and fill stakes indicate:", options: ["Property boundaries", "The amount of excavation or fill needed", "Utility locations", "Building corners", "Road names"], answer: "1", explanation: "Cut/fill stakes show how much material to remove or add to reach design grade.", points: 10 },
        { type: "fill_in_blank", text: "Offset stakes are set away from the actual point to avoid ___ during construction.", answer: "disturbance", explanation: "Offset stakes preserve reference points that would be destroyed by construction.", points: 10 },
        { type: "multiple_choice", text: "Blue tops in construction staking indicate:", options: ["Water lines", "Finish grade stakes", "Property corners", "Utility conflicts", "Sewer lines"], answer: "1", explanation: "Blue tops are typically stakes set at finish subgrade elevation.", points: 10 },
        { type: "multiple_choice", text: "Slope stakes show:", options: ["Only horizontal distance", "Catch point location for cut/fill slopes", "Only vertical elevation", "Only property lines", "Only utility locations"], answer: "1", explanation: "Slope stakes mark where cut or fill slopes intersect the existing ground.", points: 10 },
        { type: "fill_in_blank", text: "Construction surveys must be coordinated with the project ___ to meet specifications.", answer: "plans", explanation: "Layout must conform to approved design plans and specifications.", points: 10 }
      ]
    },
    {
      examTrack: 'ps',
      domainNumber: 5,
      domain: PS_DOMAINS[5],
      title: "Boundary Survey Practice",
      description: "Professional practice for boundary determination",
      content: "Boundary surveys require combining legal research, evidence evaluation, and measurement to determine property limits. This involves understanding boundary law, evidence hierarchy, and professional judgment.",
      difficulty: "hard",
      orderIndex: 4,
      estimatedMinutes: 35,
      suggestedWeek: 15,
      questions: [
        { type: "multiple_choice", text: "A boundary survey determines:", options: ["Only distances", "The limits of property ownership", "Only area", "Only coordinates", "Only elevations"], answer: "1", explanation: "Boundary surveys locate and monument the limits of property rights.", points: 10 },
        { type: "fill_in_blank", text: "The surveyor must search for both record and ___ evidence.", answer: "physical", explanation: "Both recorded documents and physical evidence on the ground must be evaluated.", points: 10 },
        { type: "multiple_choice", text: "When original monuments cannot be found:", options: ["Set new corners anywhere", "Follow procedures to restore the corner position", "Ignore the corner", "Use client preference", "Estimate the location"], answer: "1", explanation: "Lost or obliterated corners must be restored following proper legal procedures.", points: 10 },
        { type: "multiple_choice", text: "Junior/senior rights apply when:", options: ["Properties were conveyed in sequence", "The same surveyor worked both properties", "GPS was used", "The properties are equal size", "The surveys are recent"], answer: "0", explanation: "Junior/senior rights arise from the sequence of conveyances from a common grantor.", points: 10 },
        { type: "fill_in_blank", text: "Boundary surveys require professional ___ in evaluating conflicting evidence.", answer: "judgment", explanation: "Surveyors must apply professional judgment when evidence conflicts.", points: 10 }
      ]
    },
    {
      examTrack: 'ps',
      domainNumber: 5,
      domain: PS_DOMAINS[5],
      title: "Route and Alignment Surveys",
      description: "Surveys for roads, pipelines, and linear projects",
      content: "Route surveys support design and construction of linear projects. They include horizontal and vertical alignment, right-of-way, and utility coordination.",
      difficulty: "medium",
      orderIndex: 5,
      estimatedMinutes: 30,
      suggestedWeek: 15,
      questions: [
        { type: "multiple_choice", text: "Stationing in route surveys measures:", options: ["Elevation", "Distance along the centerline", "Width only", "Parcel numbers", "Slope"], answer: "1", explanation: "Stationing measures cumulative distance along the project alignment.", points: 10 },
        { type: "fill_in_blank", text: "PI stands for Point of ___ in horizontal curves.", answer: "Intersection", explanation: "The PI is where the tangents of a horizontal curve intersect.", points: 10 },
        { type: "multiple_choice", text: "Right-of-way surveys determine:", options: ["Only centerline", "The limits of public ownership for the road", "Only utilities", "Only drainage", "Only construction limits"], answer: "1", explanation: "Right-of-way surveys define the boundaries of the public transportation corridor.", points: 10 },
        { type: "multiple_choice", text: "Profile surveys show:", options: ["Only horizontal alignment", "Vertical alignment along the route", "Only cross sections", "Only property lines", "Only contours"], answer: "1", explanation: "Profiles show the existing and proposed ground elevation along the alignment.", points: 10 },
        { type: "fill_in_blank", text: "Cross ___ show the ground elevation perpendicular to the alignment.", answer: "sections", explanation: "Cross sections depict the ground profile at right angles to the centerline.", points: 10 }
      ]
    },
    {
      examTrack: 'ps',
      domainNumber: 5,
      domain: PS_DOMAINS[5],
      title: "Topographic Surveys",
      description: "Mapping terrain and surface features",
      content: "Topographic surveys collect data to create maps showing ground elevations and features. They support design, planning, and analysis applications.",
      difficulty: "medium",
      orderIndex: 6,
      estimatedMinutes: 30,
      suggestedWeek: 16,
      questions: [
        { type: "multiple_choice", text: "Contour lines represent:", options: ["Property boundaries", "Lines of equal elevation", "Utility routes", "Road centerlines", "Building footprints"], answer: "1", explanation: "Contour lines connect points of equal elevation to show terrain.", points: 10 },
        { type: "fill_in_blank", text: "The contour ___ is the vertical distance between adjacent contour lines.", answer: "interval", explanation: "Contour interval determines the level of detail in terrain representation.", points: 10 },
        { type: "multiple_choice", text: "DTM stands for:", options: ["Design Terrain Model", "Digital Terrain Model", "Data Transfer Method", "Detailed Topographic Map", "Digital Topo Measurement"], answer: "1", explanation: "Digital Terrain Models represent ground surface elevations as digital data.", points: 10 },
        { type: "multiple_choice", text: "Breaklines in surface modeling:", options: ["Are not needed", "Define abrupt changes in terrain slope", "Only show contours", "Only mark boundaries", "Only indicate utilities"], answer: "1", explanation: "Breaklines define ridges, valleys, and other terrain discontinuities.", points: 10 },
        { type: "fill_in_blank", text: "LiDAR stands for Light Detection And ___.", answer: "Ranging", explanation: "LiDAR uses laser pulses to measure distances and create terrain models.", points: 10 }
      ]
    },
    {
      examTrack: 'ps',
      domainNumber: 5,
      domain: PS_DOMAINS[5],
      title: "Subdivision Surveys",
      description: "Creating new lots from existing parcels",
      content: "Subdivision surveys divide land into new parcels. This requires compliance with local regulations, creation of lots meeting zoning requirements, and preparation of recordable plats.",
      difficulty: "medium",
      orderIndex: 7,
      estimatedMinutes: 30,
      suggestedWeek: 16,
      questions: [
        { type: "multiple_choice", text: "Subdivision approval is typically granted by:", options: ["The surveyor", "Local planning authority", "State government", "Federal agencies", "Title companies"], answer: "1", explanation: "Local planning commissions or boards approve subdivisions.", points: 10 },
        { type: "fill_in_blank", text: "A subdivision ___ shows the proposed layout of lots, streets, and utilities.", answer: "plat", explanation: "The subdivision plat is the official drawing showing the subdivision layout.", points: 10 },
        { type: "multiple_choice", text: "Dedication language on a plat:", options: ["Is optional", "Transfers streets and easements to public ownership", "Only names the surveyor", "Only identifies the owner", "Only shows lot numbers"], answer: "1", explanation: "Dedication language conveys public areas to the municipality.", points: 10 },
        { type: "multiple_choice", text: "Lot dimensions must comply with:", options: ["Only the owner's wishes", "Zoning and subdivision ordinances", "Only state law", "Only federal law", "Only neighborhood preferences"], answer: "1", explanation: "Local ordinances establish minimum lot sizes, setbacks, and other requirements.", points: 10 },
        { type: "fill_in_blank", text: "Each lot in a subdivision receives a legal description by lot and ___ reference.", answer: "block", explanation: "Lots are identified by lot number and block within the recorded subdivision.", points: 10 }
      ]
    },
    {
      examTrack: 'ps',
      domainNumber: 5,
      domain: PS_DOMAINS[5],
      title: "Condominium and Airspace Surveys",
      description: "Three-dimensional property surveys for condominiums",
      content: "Condominium surveys define three-dimensional property units. They must comply with state condominium acts and accurately define unit boundaries, common elements, and limited common elements.",
      difficulty: "hard",
      orderIndex: 8,
      estimatedMinutes: 30,
      suggestedWeek: 16,
      questions: [
        { type: "multiple_choice", text: "A condominium unit is typically defined:", options: ["Only by land area", "In three dimensions from floor to ceiling", "Only by exterior walls", "Only by building footprint", "Only by lot number"], answer: "1", explanation: "Condo units are volumetric spaces defined by boundaries in three dimensions.", points: 10 },
        { type: "fill_in_blank", text: "Common ___ are shared by all unit owners in a condominium.", answer: "elements", explanation: "Common elements include shared areas like lobbies, roofs, and grounds.", points: 10 },
        { type: "multiple_choice", text: "Limited common elements are:", options: ["Owned by individuals", "Assigned to specific units but owned by the association", "Public property", "Not shown on plats", "Outside the building"], answer: "1", explanation: "Limited common elements are common property assigned for use by specific units.", points: 10 },
        { type: "multiple_choice", text: "State condominium acts typically require:", options: ["Only a deed", "Plats, declarations, and bylaws", "Only a survey", "Only a title policy", "Only insurance"], answer: "1", explanation: "Creating a condominium requires legal documents including plats, declarations, and bylaws.", points: 10 },
        { type: "fill_in_blank", text: "Unit boundaries are often defined by the ___ surfaces of walls, floors, and ceilings.", answer: "interior", explanation: "Unit boundaries typically extend to interior surfaces, with structure as common elements.", points: 10 }
      ]
    },
    {
      examTrack: 'ps',
      domainNumber: 5,
      domain: PS_DOMAINS[5],
      title: "As-Built Surveys",
      description: "Documenting constructed conditions",
      content: "As-built surveys document the actual location and dimensions of constructed improvements. They verify conformance with plans and create a permanent record of what was built.",
      difficulty: "medium",
      orderIndex: 9,
      estimatedMinutes: 25,
      suggestedWeek: 17,
      questions: [
        { type: "multiple_choice", text: "As-built surveys document:", options: ["Design intent", "Actual constructed conditions", "Future construction", "Only estimates", "Only property lines"], answer: "1", explanation: "As-builts record actual locations and dimensions as constructed.", points: 10 },
        { type: "fill_in_blank", text: "As-built surveys are often required by ___ departments to verify code compliance.", answer: "building", explanation: "Building departments may require as-builts before issuing certificates of occupancy.", points: 10 },
        { type: "multiple_choice", text: "Utility as-builts typically show:", options: ["Only horizontal location", "Horizontal and vertical location of utilities", "Only pipe material", "Only utility names", "Only valves"], answer: "1", explanation: "Utility as-builts document both horizontal position and depth/elevation.", points: 10 },
        { type: "multiple_choice", text: "As-built information is important for:", options: ["Future maintenance and planning", "Original design only", "Demolition only", "Insurance only", "Appraisals only"], answer: "0", explanation: "As-built records support future maintenance, modifications, and planning.", points: 10 },
        { type: "fill_in_blank", text: "Record drawings incorporate as-built survey data onto the original ___ drawings.", answer: "design", explanation: "Record drawings are updated design plans showing actual constructed conditions.", points: 10 }
      ]
    },
    {
      examTrack: 'ps',
      domainNumber: 5,
      domain: PS_DOMAINS[5],
      title: "Hydrographic Surveys",
      description: "Surveying underwater and water-related features",
      content: "Hydrographic surveys map underwater topography and features. They support navigation, dredging, and environmental studies using specialized equipment and techniques.",
      difficulty: "hard",
      orderIndex: 10,
      estimatedMinutes: 30,
      suggestedWeek: 17,
      questions: [
        { type: "multiple_choice", text: "Bathymetric surveys measure:", options: ["Building heights", "Water depths", "Property boundaries", "Road elevations", "Atmospheric pressure"], answer: "1", explanation: "Bathymetric surveys map underwater topography and depths.", points: 10 },
        { type: "fill_in_blank", text: "Single beam and multibeam ___ are common depth measurement technologies.", answer: "sonar", explanation: "Sonar (Sound Navigation and Ranging) measures depths using acoustic pulses.", points: 10 },
        { type: "multiple_choice", text: "Tide corrections in hydrographic surveys:", options: ["Are not needed", "Account for water level variations", "Only apply to rivers", "Only apply to oceans", "Only affect horizontal positions"], answer: "1", explanation: "Tide corrections reduce depths to a consistent reference datum.", points: 10 },
        { type: "multiple_choice", text: "MLLW stands for:", options: ["Maximum Low Level Water", "Mean Lower Low Water", "Measured Lake Level Water", "Minimum Long Low Water", "Mean Lake Level Water"], answer: "1", explanation: "Mean Lower Low Water is a tidal datum used as a reference for depths.", points: 10 },
        { type: "fill_in_blank", text: "Side scan ___ creates images of the seafloor or lakebed.", answer: "sonar", explanation: "Side scan sonar produces images showing bottom features and objects.", points: 10 }
      ]
    },
    {
      examTrack: 'ps',
      domainNumber: 5,
      domain: PS_DOMAINS[5],
      title: "Mining and Subsurface Surveys",
      description: "Surveys for mining and underground applications",
      content: "Mining surveys support mineral extraction operations including surface and underground mining. They require specialized techniques for underground measurement and connection to surface control.",
      difficulty: "hard",
      orderIndex: 11,
      estimatedMinutes: 30,
      suggestedWeek: 17,
      questions: [
        { type: "multiple_choice", text: "Connection surveys in mining:", options: ["Connect offices to mines", "Transfer surface coordinates to underground workings", "Only measure ore volumes", "Only calculate royalties", "Only map surface features"], answer: "1", explanation: "Connection surveys extend horizontal and vertical control underground.", points: 10 },
        { type: "fill_in_blank", text: "Shaft ___ accurately transfer horizontal position down mine shafts.", answer: "plumbing", explanation: "Shaft plumbing uses plumb lines or gyroscopes to transfer coordinates underground.", points: 10 },
        { type: "multiple_choice", text: "Mineral surveys determine:", options: ["Only water rights", "Location and extent of mineral claims", "Only surface boundaries", "Only wildlife habitat", "Only vegetation"], answer: "1", explanation: "Mineral surveys locate mining claims relative to the land survey system.", points: 10 },
        { type: "multiple_choice", text: "Volumetric surveys in mining calculate:", options: ["Only area", "Quantities of material excavated or remaining", "Only distances", "Only coordinates", "Only elevations"], answer: "1", explanation: "Volumetric surveys determine quantities for production and royalty calculations.", points: 10 },
        { type: "fill_in_blank", text: "Subsidence ___ track ground movement from underground mining.", answer: "surveys", explanation: "Subsidence surveys detect and monitor ground settlement from mining activities.", points: 10 }
      ]
    },
    {
      examTrack: 'ps',
      domainNumber: 5,
      domain: PS_DOMAINS[5],
      title: "Photogrammetric Mapping",
      description: "Using aerial and satellite imagery for mapping",
      content: "Photogrammetry creates maps and models from photographs. Modern applications include aerial imagery, satellite data, and drone-based collection for topographic mapping and feature extraction.",
      difficulty: "hard",
      orderIndex: 12,
      estimatedMinutes: 30,
      suggestedWeek: 18,
      questions: [
        { type: "multiple_choice", text: "Stereo pairs in photogrammetry:", options: ["Are single images", "Enable three-dimensional measurement", "Only show color", "Only show boundaries", "Only show roads"], answer: "1", explanation: "Overlapping stereo pairs allow stereoscopic viewing and 3D measurement.", points: 10 },
        { type: "fill_in_blank", text: "Ground ___ points provide control for orienting aerial imagery.", answer: "control", explanation: "Ground control points (GCPs) tie aerial imagery to ground coordinates.", points: 10 },
        { type: "multiple_choice", text: "Orthophotos are:", options: ["Raw aerial photos", "Geometrically corrected photos with uniform scale", "Only satellite images", "Only oblique photos", "Only infrared images"], answer: "1", explanation: "Orthophotos are corrected for relief and tilt, providing uniform scale like a map.", points: 10 },
        { type: "multiple_choice", text: "UAS/drone mapping requires:", options: ["No planning", "Flight planning, GCPs, and processing", "Only a camera", "Only a pilot", "Only GPS"], answer: "1", explanation: "Drone mapping requires proper flight planning, ground control, and data processing.", points: 10 },
        { type: "fill_in_blank", text: "Structure from ___ (SfM) creates 3D models from multiple overlapping photographs.", answer: "Motion", explanation: "SfM algorithms extract 3D geometry from image sequences showing different viewpoints.", points: 10 }
      ]
    },
    {
      examTrack: 'ps',
      domainNumber: 5,
      domain: PS_DOMAINS[5],
      title: "Consultation Services",
      description: "Expert consultation and opinion services",
      content: "Professional surveyors provide consultation services including boundary opinions, expert testimony, and technical analysis. These services require clear communication of professional opinions.",
      difficulty: "medium",
      orderIndex: 13,
      estimatedMinutes: 25,
      suggestedWeek: 18,
      questions: [
        { type: "multiple_choice", text: "Consultation services differ from surveys because they:", options: ["Require no expertise", "Provide professional opinions without full survey", "Are never documented", "Are not professional services", "Require no license"], answer: "1", explanation: "Consultation provides expert opinion and analysis without necessarily producing a survey.", points: 10 },
        { type: "fill_in_blank", text: "Expert ___ requires the surveyor to testify as a technical expert.", answer: "witness", explanation: "Expert witnesses provide testimony based on their professional expertise.", points: 10 },
        { type: "multiple_choice", text: "A boundary opinion letter:", options: ["Replaces a survey", "Provides professional opinion on boundary questions", "Is legally binding on neighbors", "Creates new boundaries", "Is the same as a title opinion"], answer: "1", explanation: "Opinion letters provide professional analysis without the full scope of a survey.", points: 10 },
        { type: "multiple_choice", text: "Consultation fees are typically based on:", options: ["Only hourly rates", "Hourly rates or project fees", "Only area", "Only client budget", "State-mandated rates"], answer: "1", explanation: "Consultation may be billed hourly or as a project fee depending on scope.", points: 10 },
        { type: "fill_in_blank", text: "Feasibility studies assess whether ___ objectives can be met.", answer: "project", explanation: "Feasibility studies evaluate technical and regulatory constraints on proposed projects.", points: 10 }
      ]
    },
    {
      examTrack: 'ps',
      domainNumber: 5,
      domain: PS_DOMAINS[5],
      title: "Site Development Analysis",
      description: "Analyzing sites for development potential",
      content: "Site analysis evaluates land for development suitability. Surveyors assess topography, access, utilities, and constraints to support planning and design decisions.",
      difficulty: "medium",
      orderIndex: 14,
      estimatedMinutes: 25,
      suggestedWeek: 18,
      questions: [
        { type: "multiple_choice", text: "Site analysis for development evaluates:", options: ["Only property lines", "Topography, access, utilities, and constraints", "Only zoning", "Only soils", "Only title"], answer: "1", explanation: "Comprehensive site analysis considers physical, regulatory, and utility factors.", points: 10 },
        { type: "fill_in_blank", text: "Setback requirements establish minimum distances from ___ lines.", answer: "property", explanation: "Setbacks define minimum distances structures must be from property boundaries.", points: 10 },
        { type: "multiple_choice", text: "Drainage analysis is important because:", options: ["It is optional", "It affects site grading and stormwater management", "It only applies to wetlands", "It is not a survey function", "It only matters for large sites"], answer: "1", explanation: "Understanding drainage patterns is essential for site design and permitting.", points: 10 },
        { type: "multiple_choice", text: "Utility availability affects:", options: ["Only construction cost", "Development feasibility and design", "Only aesthetics", "Only property value", "Only zoning"], answer: "1", explanation: "Utility availability determines whether and how a site can be developed.", points: 10 },
        { type: "fill_in_blank", text: "Floodplain ___ restrict development in flood-prone areas.", answer: "regulations", explanation: "Floodplain regulations limit construction and require special permits in flood zones.", points: 10 }
      ]
    },
    {
      examTrack: 'ps',
      domainNumber: 5,
      domain: PS_DOMAINS[5],
      title: "Deed Research and Title Analysis",
      description: "Researching and analyzing property records",
      content: "Title research traces ownership and identifies encumbrances. Surveyors must understand deed interpretation, chain of title, and how to identify recorded and unrecorded rights affecting property.",
      difficulty: "hard",
      orderIndex: 15,
      estimatedMinutes: 30,
      suggestedWeek: 19,
      questions: [
        { type: "multiple_choice", text: "Chain of title traces:", options: ["Only current ownership", "Sequence of ownership from sovereign grant to present", "Only mortgages", "Only easements", "Only survey plats"], answer: "1", explanation: "Chain of title documents all transfers from the original grant to current owner.", points: 10 },
        { type: "fill_in_blank", text: "A title ___ lists exceptions and requirements affecting the property.", answer: "commitment", explanation: "Title commitments identify recorded encumbrances and requirements for title insurance.", points: 10 },
        { type: "multiple_choice", text: "Schedule B-II exceptions in title commitments show:", options: ["Only the property address", "Recorded matters affecting title", "Only the purchase price", "Only the lender name", "Only tax amounts"], answer: "1", explanation: "Schedule B-II lists recorded exceptions that will remain after closing.", points: 10 },
        { type: "multiple_choice", text: "Unrecorded interests that may affect property include:", options: ["Only recorded easements", "Prescriptive rights and adverse possession claims", "Only mortgages", "Only liens", "Only deeds"], answer: "1", explanation: "Unrecorded interests arise outside the recording system and may affect title.", points: 10 },
        { type: "fill_in_blank", text: "Abstract of title provides a ___ of all recorded documents.", answer: "summary", explanation: "An abstract summarizes the recorded documents in the chain of title.", points: 10 }
      ]
    }
  ];

  let lessonCount = 0;
  let questionCount = 0;

  for (const lesson of psLessonsToCreate) {
    // Generate lesson ID: ps-d{domain}-lesson-{orderIndex:02}
    const lessonId = `ps-d${lesson.domainNumber}-lesson-${String(lesson.orderIndex).padStart(2, '0')}`;
    
    // Get practical problem if available
    const practicalProblem = null; // PS lessons don't have practical problems for now
    
    // Insert lesson
    await db.insert(lessons).values({
      id: lessonId,
      examTrack: 'ps',
      domainNumber: lesson.domainNumber,
      domain: lesson.domain,
      title: lesson.title,
      description: lesson.description,
      content: lesson.content,
      practicalProblem: practicalProblem,
      difficulty: lesson.difficulty,
      orderIndex: lesson.orderIndex,
      estimatedMinutes: lesson.estimatedMinutes,
      suggestedWeek: lesson.suggestedWeek,
    });
    
    lessonCount++;

    // Insert questions for this lesson
    for (let i = 0; i < lesson.questions.length; i++) {
      const q = lesson.questions[i];
      await db.insert(lessonQuestions).values({
        lessonId: lessonId,
        questionType: q.type,
        questionText: q.text,
        options: q.options || null,
        correctAnswer: q.answer,
        explanation: q.explanation,
        orderIndex: i + 1,
        variationGroup: 1,
        variationNumber: 1,
        points: q.points,
      });
      questionCount++;
    }
  }

  console.log(`PS Lesson seeding complete: ${lessonCount} lessons, ${questionCount} questions`);
}

// Export for use in main seeding script
export { seedPSLessons };

// Run seeding
seedPSLessons()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Error seeding PS lessons:", err);
    process.exit(1);
  });
