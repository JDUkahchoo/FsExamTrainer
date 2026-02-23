interface PSQuizQuestion {
  domain: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export const PS_QUIZ_QUESTIONS: PSQuizQuestion[] = [
  // ===== LEGAL PRINCIPLES (~50 questions) =====
  {
    domain: 'Legal Principles',
    question: 'In the hierarchy of conflicting calls in a deed description, which element has the highest priority?',
    options: ['Distances', 'Bearings/Directions', 'Natural monuments', 'Area'],
    correctAnswer: 2,
    explanation: 'The generally accepted hierarchy of calls is: Natural monuments > Artificial monuments > Bearings/Directions > Distances > Area. Natural monuments such as rivers, lakes, and ridges are considered the most reliable evidence of the original surveyor\'s intent because they are the least likely to change or be mistaken.',
    difficulty: 'easy'
  },
  {
    domain: 'Legal Principles',
    question: 'An easement appurtenant differs from an easement in gross because it:',
    options: ['Is always created by prescription', 'Benefits a specific parcel of land (dominant estate)', 'Can only be created by a court order', 'Terminates upon sale of the servient estate'],
    correctAnswer: 1,
    explanation: 'An easement appurtenant benefits a specific parcel of land known as the dominant estate and burdens the servient estate. It "runs with the land," meaning it transfers automatically with the property. An easement in gross benefits a person or entity rather than a specific parcel.',
    difficulty: 'easy'
  },
  {
    domain: 'Legal Principles',
    question: 'Which of the following is NOT a required element of adverse possession in most jurisdictions?',
    options: ['Open and notorious use', 'Continuous for the statutory period', 'Written notice to the owner', 'Hostile and under claim of right'],
    correctAnswer: 2,
    explanation: 'The traditional elements of adverse possession are: actual possession, open and notorious, hostile/adverse, exclusive, and continuous for the statutory period. Written notice to the owner is NOT required; in fact, the hostile element means the possession is without the owner\'s permission.',
    difficulty: 'easy'
  },
  {
    domain: 'Legal Principles',
    question: 'A prescriptive easement differs from adverse possession in that:',
    options: ['It requires exclusive use', 'It does not transfer fee title', 'It requires a shorter time period', 'It must be under a written agreement'],
    correctAnswer: 1,
    explanation: 'A prescriptive easement grants only the right to use the land for a specific purpose, not fee title ownership. Unlike adverse possession, prescriptive easement does not require exclusive use—the true owner may continue to use the land as well. Both require open, notorious, hostile, and continuous use for the statutory period.',
    difficulty: 'medium'
  },
  {
    domain: 'Legal Principles',
    question: 'The parol evidence rule prevents:',
    options: ['Oral testimony from modifying a clear written deed', 'Recording of deeds at the courthouse', 'Surveyor testimony in court', 'Use of prior survey plats as evidence'],
    correctAnswer: 0,
    explanation: 'The parol evidence rule prevents the use of oral or extrinsic evidence to contradict, vary, or add to the terms of a complete, unambiguous written instrument such as a deed. However, parol evidence may be admitted to explain ambiguities or to show fraud, mistake, or duress.',
    difficulty: 'medium'
  },
  {
    domain: 'Legal Principles',
    question: 'The Statute of Frauds requires which of the following to be in writing?',
    options: ['All survey contracts', 'Conveyances of interests in real property', 'Field notes from boundary surveys', 'Agreements between adjacent landowners about fence lines'],
    correctAnswer: 1,
    explanation: 'The Statute of Frauds requires conveyances of interests in real property (including sales, leases over one year, and easements) to be in writing and signed by the party to be charged. This prevents fraudulent claims of oral agreements regarding land transfers.',
    difficulty: 'medium'
  },
  {
    domain: 'Legal Principles',
    question: 'Under riparian rights, a landowner whose property borders a non-navigable stream:',
    options: ['Owns to the center of the stream', 'Owns only to the edge of the water', 'Has no rights to the water', 'Owns the entire stream bed'],
    correctAnswer: 0,
    explanation: 'Under riparian doctrine, owners of land abutting non-navigable streams typically own the streambed to the thread (center) of the stream. For navigable waters, state ownership typically extends to the ordinary high water mark, and the riparian owner\'s rights extend only to that line.',
    difficulty: 'medium'
  },
  {
    domain: 'Legal Principles',
    question: 'Accretion refers to the:',
    options: ['Sudden loss of land by water action', 'Gradual addition of land by water-deposited sediment', 'Artificial filling of submerged land', 'Court-ordered transfer of land'],
    correctAnswer: 1,
    explanation: 'Accretion is the gradual and imperceptible addition of land along a water boundary by the deposit of sediment (alluvium). The key word is "gradual"—the landowner gains title to the newly deposited land. Sudden changes are called avulsion, and the boundary does not change with avulsion.',
    difficulty: 'easy'
  },
  {
    domain: 'Legal Principles',
    question: 'Avulsion differs from accretion because avulsion:',
    options: ['Is always man-made', 'Occurs suddenly and perceptibly', 'Only applies to ocean boundaries', 'Results in loss of property rights'],
    correctAnswer: 1,
    explanation: 'Avulsion is a sudden, perceptible change in a watercourse, such as a flood or channel shift. Unlike accretion, the property boundary does NOT change with avulsion—it remains at the former location of the watercourse. The affected landowner retains the right to reclaim the lost land.',
    difficulty: 'medium'
  },
  {
    domain: 'Legal Principles',
    question: 'Reliction is the process by which:',
    options: ['Land is gradually exposed by receding water', 'Land is submerged by rising water', 'A river changes course suddenly', 'Sediment is deposited on a riverbank'],
    correctAnswer: 0,
    explanation: 'Reliction occurs when water permanently recedes, exposing previously submerged land. The riparian or littoral owner typically gains title to the newly exposed land, similar to accretion. The key requirement is that the recession must be gradual and permanent, not temporary.',
    difficulty: 'medium'
  },
  {
    domain: 'Legal Principles',
    question: 'In the PLSS, a lost corner is one whose:',
    options: ['Monument has been moved to a new location', 'Position cannot be determined from existing evidence', 'Original monument has deteriorated but evidence of position exists', 'Position was never surveyed'],
    correctAnswer: 1,
    explanation: 'A lost corner is one whose position cannot be determined beyond reasonable doubt from either traces of the original monument or from acceptable evidence. Its position must be restored by proportional measurement or other approved methods from the Manual of Surveying Instructions.',
    difficulty: 'medium'
  },
  {
    domain: 'Legal Principles',
    question: 'An obliterated corner differs from a lost corner because:',
    options: ['It was never set in the original survey', 'Its position can be recovered from other evidence', 'It requires a court order to restore', 'It only applies to section corners'],
    correctAnswer: 1,
    explanation: 'An obliterated corner is one where the monument has been destroyed or disturbed, but its position can be recovered from reliable evidence such as bearing trees, field notes, adjacent survey evidence, or testimony. A lost corner, by contrast, has no recoverable evidence of its original position.',
    difficulty: 'hard'
  },
  {
    domain: 'Legal Principles',
    question: 'When restoring a lost interior section corner in the PLSS, the accepted method is:',
    options: ['Single proportionate measurement', 'Double proportionate measurement', 'Placing the corner at the midpoint of the section', 'Using GPS coordinates from the BLM database'],
    correctAnswer: 1,
    explanation: 'Lost interior section corners are restored by double proportionate measurement, which proportions in both the north-south and east-west directions from the four controlling corners. Lost corners on township or range lines are restored by single proportionate measurement along the line.',
    difficulty: 'hard'
  },
  {
    domain: 'Legal Principles',
    question: 'The senior/junior rights principle states that:',
    options: ['Newer surveys always supersede older surveys', 'The first conveyance has priority over subsequent conveyances', 'The most recent deed controls', 'Government surveys override private surveys'],
    correctAnswer: 1,
    explanation: 'Under the senior/junior rights principle, the first (senior) conveyance has priority. When a grantor conveys multiple parcels from the same parent tract, the first conveyance is the senior right. The junior (later) conveyance receives only what remains after satisfying the senior conveyance.',
    difficulty: 'medium'
  },
  {
    domain: 'Legal Principles',
    question: 'Boundary by acquiescence is typically established when:',
    options: ['Adjacent owners agree in writing to a boundary line', 'A boundary line has been silently accepted for the statutory period', 'A court orders a new boundary', 'A surveyor stakes a provisional line'],
    correctAnswer: 1,
    explanation: 'Boundary by acquiescence occurs when adjacent landowners tacitly accept a boundary line (such as a fence) for a long period, typically the statute of limitations for adverse possession. Unlike boundary by agreement, it does not require an express oral or written agreement.',
    difficulty: 'hard'
  },
  {
    domain: 'Legal Principles',
    question: 'Boundary by estoppel requires:',
    options: ['A written agreement filed of record', 'That one party relied on the other\'s representation to their detriment', 'A court decree establishing the line', 'Payment of consideration'],
    correctAnswer: 1,
    explanation: 'Boundary by estoppel occurs when one party makes a representation about a boundary location, the other party reasonably relies on that representation, and the relying party suffers detriment (such as building improvements). The representing party is then estopped (prevented) from denying the boundary.',
    difficulty: 'hard'
  },
  {
    domain: 'Legal Principles',
    question: 'Under a race-notice recording statute, a subsequent purchaser prevails over a prior unrecorded interest if the subsequent purchaser:',
    options: ['Records first regardless of knowledge', 'Records first and had no notice of the prior interest', 'Paid the highest price', 'Obtained a title insurance policy'],
    correctAnswer: 1,
    explanation: 'Under a race-notice statute, the subsequent purchaser must both (1) record first AND (2) have no actual or constructive notice of the prior unrecorded interest at the time of purchase. This combines elements of both race and notice statutes and is the most common type in the United States.',
    difficulty: 'hard'
  },
  {
    domain: 'Legal Principles',
    question: 'A quitclaim deed conveys:',
    options: ['A guaranteed fee simple title', 'Whatever interest the grantor may have, with no warranties', 'Only a life estate', 'Title with a covenant against encumbrances'],
    correctAnswer: 1,
    explanation: 'A quitclaim deed transfers whatever interest the grantor has, if any, without any warranties or guarantees. The grantor makes no promises about the quality of title. It is commonly used to clear title defects, transfer property between family members, or release easement claims.',
    difficulty: 'easy'
  },
  {
    domain: 'Legal Principles',
    question: 'A metes and bounds description begins at a:',
    options: ['Section corner', 'Point of beginning (POB)', 'County courthouse', 'Benchmark'],
    correctAnswer: 1,
    explanation: 'A metes and bounds description begins and ends at the Point of Beginning (POB). The POB should be tied to a known, recoverable reference point. The description then follows the perimeter of the property using courses (directions and distances) and calls to monuments, returning to close at the POB.',
    difficulty: 'easy'
  },
  {
    domain: 'Legal Principles',
    question: 'When a deed calls for a monument that is in a different location than the stated bearing and distance, which controls?',
    options: ['The bearing and distance', 'The monument', 'Whichever was recorded first', 'The area stated in the deed'],
    correctAnswer: 1,
    explanation: 'Monuments control over courses (bearings and distances) in the hierarchy of evidence. The rationale is that the original surveyor placed the monument at the intended location, and any discrepancy in the recorded bearing or distance is considered an error in the written description.',
    difficulty: 'easy'
  },
  {
    domain: 'Legal Principles',
    question: 'Title examination by a surveyor is performed to:',
    options: ['Guarantee clear title to the buyer', 'Identify encumbrances and conflicts affecting boundary location', 'Replace the role of a title company', 'Determine the market value of the property'],
    correctAnswer: 1,
    explanation: 'A surveyor examines title to identify recorded easements, encumbrances, rights-of-way, and potential conflicts that may affect the boundary survey. The surveyor does not guarantee title (that is the function of a title company) but must understand the chain of title to properly locate boundaries.',
    difficulty: 'medium'
  },
  {
    domain: 'Legal Principles',
    question: 'In simultaneous conveyances from a common grantor, the lots are:',
    options: ['All senior to each other', 'All junior to each other', 'Treated as having equal priority', 'Prioritized by area from largest to smallest'],
    correctAnswer: 2,
    explanation: 'When a common grantor simultaneously conveys multiple lots (as in a recorded subdivision plat), none is senior or junior to another—they all have equal priority. Each lot is entitled to the boundaries and dimensions shown on the plat. Any excess or deficiency is typically distributed proportionally.',
    difficulty: 'hard'
  },
  {
    domain: 'Legal Principles',
    question: 'An easement by necessity is typically created when:',
    options: ['A property is landlocked with no legal access', 'A prescriptive period has been met', 'Two adjacent owners sign an agreement', 'A government agency condemns access'],
    correctAnswer: 0,
    explanation: 'An easement by necessity is implied by law when a parcel is landlocked (has no access to a public road) as a result of a division of the parent tract. The necessity must have existed at the time of the severance, and the easement is typically limited to access purposes over the grantor\'s retained land.',
    difficulty: 'medium'
  },
  {
    domain: 'Legal Principles',
    question: 'Littoral rights pertain to property bordering:',
    options: ['Non-navigable streams', 'Lakes, seas, and oceans', 'Underground water sources', 'Man-made canals'],
    correctAnswer: 1,
    explanation: 'Littoral rights apply to property that abuts standing bodies of water such as lakes, seas, and oceans. Riparian rights apply to property along flowing water (rivers and streams). Littoral owners typically have rights to the ordinary high water mark for navigable waters.',
    difficulty: 'easy'
  },
  {
    domain: 'Legal Principles',
    question: 'The ordinary high water mark (OHWM) is significant because it typically:',
    options: ['Determines the deepest point of a water body', 'Establishes the boundary between public and private ownership on navigable waters', 'Marks the 100-year floodplain', 'Is the same as the mean low water line'],
    correctAnswer: 1,
    explanation: 'The ordinary high water mark typically defines the boundary between public trust lands (owned by the state) and private riparian or littoral property for navigable waters. Below the OHWM, the state holds title for public use; above the OHWM, the abutting landowner holds title.',
    difficulty: 'hard'
  },
  {
    domain: 'Legal Principles',
    question: 'When a deed description closes mathematically but a monument called for in the description is found at a different position, the surveyor should:',
    options: ['Ignore the monument and use the mathematical closure', 'Hold the monument position as controlling', 'Average the two positions', 'Report the error to the county recorder'],
    correctAnswer: 1,
    explanation: 'Monuments control over courses (directions and distances) and area. The mathematical closure represents calculations from the written description, but the physical monument represents where the original surveyor actually placed the boundary. Evidence on the ground generally prevails over paper descriptions.',
    difficulty: 'medium'
  },
  {
    domain: 'Legal Principles',
    question: 'A warranty deed differs from a grant deed in that the warranty deed:',
    options: ['Transfers no interest', 'Contains covenants guaranteeing title against all claims', 'Is only valid for government land', 'Does not require recording'],
    correctAnswer: 1,
    explanation: 'A general warranty deed includes covenants (promises) that the grantor has good title and will defend against all claims, including those arising from events before the grantor acquired the property. A grant deed typically warrants only that the grantor has not previously conveyed the property or created encumbrances during their ownership.',
    difficulty: 'medium'
  },
  {
    domain: 'Legal Principles',
    question: 'Constructive notice is given by:',
    options: ['Personally telling a party about a claim', 'Recording a document in the public records', 'Posting a sign on the property', 'Publishing in a newspaper'],
    correctAnswer: 1,
    explanation: 'Constructive notice is the legal presumption that all parties have knowledge of documents properly recorded in the public records. Once a deed, easement, or lien is recorded, all subsequent purchasers are deemed to have notice of it, regardless of whether they actually examined the records.',
    difficulty: 'easy'
  },
  {
    domain: 'Legal Principles',
    question: 'Under the doctrine of practical location, a boundary line may be fixed by:',
    options: ['A surveyor\'s unilateral decision', 'Long-continued occupation consistent with a visible line on the ground', 'The most recent survey measurement', 'Agreement of the title company'],
    correctAnswer: 1,
    explanation: 'The doctrine of practical location fixes a boundary based on how the parties have actually treated it over a long period, typically with a visible line on the ground (such as a fence or wall) and consistent occupation. It recognizes that the practical location accepted by both parties may differ from the record description.',
    difficulty: 'hard'
  },
  {
    domain: 'Legal Principles',
    question: 'When interpreting a metes and bounds description, the phrase "thence along the creek" means the boundary:',
    options: ['Follows a straight line to the next call', 'Follows the meanders of the creek', 'Is located 50 feet from the creek centerline', 'Crosses the creek perpendicularly'],
    correctAnswer: 1,
    explanation: 'When a deed calls for a boundary "along" or "by" a natural watercourse, the boundary follows the meanders of the watercourse, not a straight line. This principle reflects the grantor\'s intent to use the watercourse as a natural boundary, and the boundary will shift with gradual changes (accretion/reliction).',
    difficulty: 'medium'
  },
  {
    domain: 'Legal Principles',
    question: 'A retracement survey is performed to:',
    options: ['Create a new boundary where none existed', 'Relocate and follow in the footsteps of the original surveyor', 'Subdivide an existing parcel into smaller lots', 'Measure topographic features'],
    correctAnswer: 1,
    explanation: 'A retracement survey seeks to re-establish the boundaries as originally surveyed. The retracing surveyor must "follow in the footsteps" of the original surveyor, locating original monuments and interpreting the original intent rather than conducting a new, independent survey.',
    difficulty: 'easy'
  },
  {
    domain: 'Legal Principles',
    question: 'Under the "record title" theory, which recording system provides the most conclusive evidence of ownership?',
    options: ['Grantor-grantee index', 'Torrens system', 'Tract index', 'Abstract system'],
    correctAnswer: 1,
    explanation: 'The Torrens system (land registration system) provides the most conclusive evidence because the government issues a certificate of title that is guaranteed by the state. The certificate conclusively establishes who owns the property and what encumbrances exist, unlike recording systems that merely provide notice of documents.',
    difficulty: 'hard'
  },
  {
    domain: 'Legal Principles',
    question: 'In a PLSS survey, if the original quarter corner monument between sections 15 and 22 is found to be offset from its theoretical position, the surveyor should:',
    options: ['Move it to the theoretical position', 'Accept the original position as controlling', 'Set a new monument at the midpoint', 'Report the discrepancy to the BLM'],
    correctAnswer: 1,
    explanation: 'Original survey corners, once accepted by the government, are fixed in position regardless of any errors in the original survey. The surveyor must accept the original monument position even if it differs from the theoretical or record position. This follows the principle that the original survey creates the boundary.',
    difficulty: 'hard'
  },
  {
    domain: 'Legal Principles',
    question: 'An unwritten right that may affect boundary location includes all of the following EXCEPT:',
    options: ['Adverse possession', 'Prescriptive easement', 'Boundary by acquiescence', 'Fee simple conveyance'],
    correctAnswer: 3,
    explanation: 'Unwritten rights are those not found in the recorded chain of title but established through use, possession, or agreement. Adverse possession, prescriptive easements, and boundary by acquiescence are all unwritten rights. A fee simple conveyance is a written instrument and is not an unwritten right.',
    difficulty: 'medium'
  },
  {
    domain: 'Legal Principles',
    question: 'When a grantor conveys Lot 1, then later conveys the same property to another buyer as Lot 1, under a notice recording statute:',
    options: ['The first grantee always prevails', 'The second grantee prevails if they had no notice and recorded first', 'The second grantee always prevails', 'Neither has valid title'],
    correctAnswer: 1,
    explanation: 'Under a notice recording statute, a subsequent purchaser who takes without notice (actual, constructive, or inquiry) of a prior unrecorded conveyance prevails, even if the subsequent purchaser does not record first. However, the subsequent purchaser must be a bona fide purchaser for value.',
    difficulty: 'hard'
  },
  {
    domain: 'Legal Principles',
    question: 'The thread of the stream refers to the:',
    options: ['Deepest point of the channel', 'Center line of the main channel', 'Ordinary high water mark', 'Mean low water line'],
    correctAnswer: 1,
    explanation: 'The thread of the stream is the center line of the main channel and is used to define the boundary between properties on opposite sides of a non-navigable stream. It represents the midpoint between the ordinary high water marks on each bank.',
    difficulty: 'medium'
  },
  {
    domain: 'Legal Principles',
    question: 'Which of the following calls in a deed description would be considered an artificial monument?',
    options: ['A large oak tree at the corner', 'An iron pin set in the ground', 'The intersection of two rivers', 'A prominent rock outcrop'],
    correctAnswer: 1,
    explanation: 'Artificial monuments are man-made objects placed to mark boundaries, such as iron pins, concrete monuments, fence posts, and stakes. Natural monuments include trees, rivers, rock outcrops, and other features of nature. In the hierarchy of evidence, natural monuments generally control over artificial monuments.',
    difficulty: 'easy'
  },
  {
    domain: 'Legal Principles',
    question: 'The legal description "The North Half of the Southwest Quarter of Section 10" describes how many acres?',
    options: ['40 acres', '80 acres', '160 acres', '320 acres'],
    correctAnswer: 1,
    explanation: 'A section is 640 acres. The Southwest Quarter (SW¼) is 160 acres. The North Half (N½) of the SW¼ is 160/2 = 80 acres. Each successive subdivision halves or quarters the area of the parent tract.',
    difficulty: 'easy'
  },
  {
    domain: 'Legal Principles',
    question: 'An implied easement may be created by:',
    options: ['Prior use at the time of severance of a common tract', 'Filing a document with the county recorder', 'A surveyor\'s recommendation', 'Expiration of the statutory period'],
    correctAnswer: 0,
    explanation: 'An implied easement is created when a property is divided and one parcel had an apparent, continuous, and necessary use of the other parcel at the time of severance. The use must have been in place before the division, be apparent upon reasonable inspection, and be necessary for the enjoyment of the dominant parcel.',
    difficulty: 'hard'
  },
  {
    domain: 'Legal Principles',
    question: 'In the context of water boundaries, the doctrine of "ambulatory boundaries" means:',
    options: ['Boundaries must be surveyed on foot', 'Boundaries shift with gradual natural changes in the watercourse', 'Boundaries are always fixed at the original survey position', 'Boundaries follow the direction of water flow'],
    correctAnswer: 1,
    explanation: 'Ambulatory boundaries move with the gradual, imperceptible shifts of a watercourse through accretion or reliction. As the water body slowly moves, the boundary moves with it. This is in contrast to fixed boundaries that remain at the original position, as occurs with avulsion (sudden change).',
    difficulty: 'hard'
  },
  {
    domain: 'Legal Principles',
    question: 'Excess and deficiency in a PLSS section are placed in the:',
    options: ['North and west tiers of lots', 'Center of the section', 'South and east quarter sections', 'Nearest full quarter section'],
    correctAnswer: 0,
    explanation: 'In the PLSS, excess or deficiency in a section is placed in the north and west tiers of lots (the half-quarter sections along the north and west boundaries). This convention ensures that the southeast quarter always receives its full 160-acre allotment.',
    difficulty: 'hard'
  },
  {
    domain: 'Legal Principles',
    question: 'The difference between actual notice and constructive notice is that actual notice:',
    options: ['Is always in writing', 'Comes from personal knowledge or direct communication', 'Only applies to government surveys', 'Requires publication in a newspaper'],
    correctAnswer: 1,
    explanation: 'Actual notice is knowledge obtained through personal observation, direct communication, or information received from a reliable source. Constructive notice is the legal presumption of knowledge based on recording a document in the public records, regardless of whether the party actually read or knew about the document.',
    difficulty: 'medium'
  },
  {
    domain: 'Legal Principles',
    question: 'A deed that conveys property "to A for life, then to B" creates:',
    options: ['A fee simple absolute in A', 'A life estate in A and a remainder in B', 'A joint tenancy between A and B', 'A tenancy in common between A and B'],
    correctAnswer: 1,
    explanation: 'This language creates a life estate in A (A has the right to possess and use the property during A\'s lifetime) and a remainder interest in B (B receives fee simple title upon A\'s death). A life estate is a freehold estate of limited duration.',
    difficulty: 'medium'
  },
  {
    domain: 'Legal Principles',
    question: 'Under the tidal waters doctrine, the boundary of private ownership on ocean-front property is typically the:',
    options: ['Low tide line', 'Mean high tide line', 'Mean low water line', 'Vegetation line'],
    correctAnswer: 1,
    explanation: 'In most states, private ownership of ocean-front (littoral) property extends to the mean high tide line. The area below the mean high tide line is held in public trust by the state. Some states use mean high water or ordinary high water mark as the boundary between public and private ownership.',
    difficulty: 'medium'
  },
  {
    domain: 'Legal Principles',
    question: 'When a surveyor encounters conflicting deeds from a common grantor, the principle of first in time means:',
    options: ['The most recently dated deed controls', 'The first deed recorded controls', 'The first deed executed and delivered has priority', 'The deed with the larger area controls'],
    correctAnswer: 2,
    explanation: 'Under the common law principle of "first in time, first in right," the deed first executed and delivered has priority regardless of recording date (subject to recording act provisions). Once the grantor conveys title, they cannot convey the same land again because they no longer own it.',
    difficulty: 'hard'
  },

  // ===== PROFESSIONAL SURVEY PRACTICES (~45 questions) =====
  {
    domain: 'Professional Survey Practices',
    question: 'A surveyor\'s paramount obligation is to:',
    options: ['The client who hired them', 'Their employer', 'The public health, safety, and welfare', 'Other licensed professionals'],
    correctAnswer: 2,
    explanation: 'Under the NCEES Model Rules and state licensing laws, a surveyor\'s first and paramount obligation is to protect the public health, safety, and welfare. This duty supersedes obligations to clients, employers, or other parties and is a fundamental principle of professional licensing.',
    difficulty: 'easy'
  },
  {
    domain: 'Professional Survey Practices',
    question: 'The standard of care for a professional surveyor is defined as:',
    options: ['Perfection in all measurements', 'The degree of care a reasonably competent surveyor would exercise', 'Strict adherence to the client\'s instructions', 'The highest possible accuracy achievable'],
    correctAnswer: 1,
    explanation: 'The standard of care is the level of competence and diligence that a reasonably prudent surveyor would exercise under similar circumstances. Surveyors are not expected to be perfect, but they must perform work consistent with accepted professional practices and standards.',
    difficulty: 'easy'
  },
  {
    domain: 'Professional Survey Practices',
    question: 'A surveyor who discovers a conflict between a client\'s desired boundary and the evidence found in the field should:',
    options: ['Place the boundary where the client wants it', 'Report the findings honestly and explain the implications', 'Refuse to complete the survey', 'File a complaint with the licensing board'],
    correctAnswer: 1,
    explanation: 'Professional ethics require honest reporting of findings. The surveyor must report what the evidence shows, explain the discrepancy to the client, and advise on possible courses of action. The surveyor cannot move or ignore evidence to satisfy a client\'s desires.',
    difficulty: 'easy'
  },
  {
    domain: 'Professional Survey Practices',
    question: 'When providing expert witness testimony, a surveyor should:',
    options: ['Advocate for the party who hired them', 'Present objective, unbiased professional opinions', 'Only testify about matters favorable to their client', 'Defer all opinions to the attorney'],
    correctAnswer: 1,
    explanation: 'An expert witness has a duty to the court to present objective, unbiased professional opinions regardless of which party retained them. The surveyor must provide truthful testimony based on professional knowledge, training, and analysis of the evidence, not advocate for either side.',
    difficulty: 'medium'
  },
  {
    domain: 'Professional Survey Practices',
    question: 'Quality control in surveying primarily involves:',
    options: ['Checking work only after the project is complete', 'Implementing systematic procedures to prevent and detect errors throughout the project', 'Having the client review the field work', 'Using the most expensive equipment available'],
    correctAnswer: 1,
    explanation: 'Quality control involves systematic procedures implemented throughout the project lifecycle to prevent errors and ensure accuracy. This includes independent checks of field data, computation verification, redundant measurements, instrument calibration, and established protocols for every phase of the survey.',
    difficulty: 'easy'
  },
  {
    domain: 'Professional Survey Practices',
    question: 'A surveyor\'s field notes should include all of the following EXCEPT:',
    options: ['Weather conditions', 'Equipment serial numbers and calibration dates', 'The surveyor\'s opinion on the client\'s attorney', 'Sketch of the survey area'],
    correctAnswer: 2,
    explanation: 'Field notes should contain all information needed to reproduce the survey: measurements, equipment information, weather conditions, sketches, crew members, and observations. Opinions about the client\'s attorney or personal commentary are inappropriate and unprofessional in survey documentation.',
    difficulty: 'easy'
  },
  {
    domain: 'Professional Survey Practices',
    question: 'The primary purpose of peer review in surveying is to:',
    options: ['Find grounds for disciplinary action', 'Provide an independent evaluation of the survey work and conclusions', 'Satisfy a client\'s complaint', 'Train new employees'],
    correctAnswer: 1,
    explanation: 'Peer review provides an independent, objective evaluation of survey methods, procedures, and conclusions by another qualified professional. It serves to identify potential errors, confirm compliance with standards, and improve the overall quality and reliability of the work product.',
    difficulty: 'medium'
  },
  {
    domain: 'Professional Survey Practices',
    question: 'Continuing education for licensed surveyors is required to:',
    options: ['Generate revenue for state licensing boards', 'Ensure surveyors maintain competency in current practices and technologies', 'Fill time between projects', 'Provide insurance discounts'],
    correctAnswer: 1,
    explanation: 'Continuing education requirements ensure that licensed professionals stay current with evolving technologies, standards, laws, and best practices. Most states require a specific number of professional development hours (PDHs) per renewal period to maintain licensure.',
    difficulty: 'easy'
  },
  {
    domain: 'Professional Survey Practices',
    question: 'When supervising survey crews, the responsible surveyor must:',
    options: ['Be physically present at all times in the field', 'Maintain responsible charge and review all work products', 'Allow the crew chief to seal all documents', 'Only review the final deliverable'],
    correctAnswer: 1,
    explanation: 'The responsible surveyor must maintain "responsible charge" of the work, which means personally directing and having control over survey activities, reviewing field data, and verifying the accuracy and completeness of work products. Physical presence at all times is not required, but adequate supervision and review are mandatory.',
    difficulty: 'medium'
  },
  {
    domain: 'Professional Survey Practices',
    question: 'A surveyor who seals a document is certifying that:',
    options: ['The document has been paid for', 'The work was performed under their responsible charge and meets professional standards', 'The client approved the document', 'No errors exist in the document'],
    correctAnswer: 1,
    explanation: 'Affixing a professional seal and signature certifies that the work was performed under the surveyor\'s responsible charge, that it complies with applicable standards and regulations, and that the surveyor takes professional responsibility for the work. It does not guarantee the work is error-free.',
    difficulty: 'medium'
  },
  {
    domain: 'Professional Survey Practices',
    question: 'Which of the following constitutes a conflict of interest for a surveyor?',
    options: ['Performing surveys in multiple counties', 'Having a financial interest in the property being surveyed', 'Using different equipment on different projects', 'Working for competing survey firms sequentially'],
    correctAnswer: 1,
    explanation: 'A conflict of interest exists when a surveyor has a personal financial interest in the outcome of the survey or in the property being surveyed. The surveyor must disclose any potential conflicts and may need to decline the engagement if the conflict cannot be adequately managed.',
    difficulty: 'medium'
  },
  {
    domain: 'Professional Survey Practices',
    question: 'Data management best practices for survey firms include:',
    options: ['Storing all data on a single USB drive', 'Implementing regular backups with redundant storage and organized file structures', 'Keeping only final deliverables and discarding raw data', 'Allowing all employees unrestricted access to all files'],
    correctAnswer: 1,
    explanation: 'Proper data management includes regular automated backups, redundant storage (including off-site), organized naming conventions, version control, appropriate access controls, and retention of both raw data and processed deliverables for the required retention period.',
    difficulty: 'easy'
  },
  {
    domain: 'Professional Survey Practices',
    question: 'Project planning for a boundary survey should begin with:',
    options: ['Mobilizing the field crew', 'Researching the chain of title and existing surveys', 'Setting monuments', 'Preparing the final plat'],
    correctAnswer: 1,
    explanation: 'Before any field work begins, the surveyor must research the chain of title, review existing surveys, examine recorded plats and deeds, identify potential conflicts, and plan the approach. Thorough research is essential to understanding what evidence should be found in the field.',
    difficulty: 'easy'
  },
  {
    domain: 'Professional Survey Practices',
    question: 'When communicating survey results to a non-technical client, the surveyor should:',
    options: ['Use only technical jargon to demonstrate expertise', 'Explain findings in clear, understandable language with appropriate context', 'Refuse to explain technical matters', 'Delegate all communication to the attorney'],
    correctAnswer: 1,
    explanation: 'Effective communication requires translating technical survey findings into language the client can understand. The surveyor should explain what was found, what it means for the client\'s property, and any recommendations, while remaining available to answer questions and provide clarification.',
    difficulty: 'easy'
  },
  {
    domain: 'Professional Survey Practices',
    question: 'A surveyor asked to testify as an expert witness should decline if:',
    options: ['The case involves complex legal issues', 'They lack expertise in the specific subject matter', 'The opposing party has a more experienced surveyor', 'The case is in a different county'],
    correctAnswer: 1,
    explanation: 'A surveyor should decline expert witness engagements outside their area of competence. Providing expert testimony requires specialized knowledge in the specific subject matter of the case. Testifying beyond one\'s competence is both unethical and potentially harmful to the judicial process.',
    difficulty: 'medium'
  },
  {
    domain: 'Professional Survey Practices',
    question: 'When a surveyor discovers an error in a previously recorded plat, the ethical course of action is to:',
    options: ['Ignore it since it was filed by another surveyor', 'Notify the affected parties and the appropriate authorities', 'Quietly correct it on future surveys without notification', 'Wait until someone else notices the error'],
    correctAnswer: 1,
    explanation: 'Professional ethics and most state laws require surveyors to notify affected parties and appropriate authorities when they discover errors that could affect property rights or public safety. The surveyor should document the error, communicate findings to affected parties, and take appropriate corrective action.',
    difficulty: 'medium'
  },
  {
    domain: 'Professional Survey Practices',
    question: 'The purpose of a survey report is to:',
    options: ['Replace the survey plat', 'Document the surveyor\'s research, methodology, findings, and professional opinions', 'Serve as a legal contract with the client', 'Provide advertising for the survey firm'],
    correctAnswer: 1,
    explanation: 'A survey report documents the surveyor\'s research methodology, evidence gathered, analysis performed, professional opinions, and conclusions. It provides a narrative explanation of the survey that supplements the plat and allows others to understand the basis for the surveyor\'s boundary decisions.',
    difficulty: 'medium'
  },
  {
    domain: 'Professional Survey Practices',
    question: 'Calibration of survey equipment should be performed:',
    options: ['Only when errors are suspected', 'At regular intervals and whenever the instrument may have been damaged', 'Once when the equipment is purchased', 'Only when required by the client'],
    correctAnswer: 1,
    explanation: 'Equipment calibration should be performed at manufacturer-recommended intervals, before critical projects, and whenever the instrument may have been subjected to shock, extreme temperatures, or other conditions that could affect accuracy. Regular calibration ensures measurements meet required accuracy standards.',
    difficulty: 'easy'
  },
  {
    domain: 'Professional Survey Practices',
    question: 'Professional liability for a surveyor may arise from:',
    options: ['Properly performed surveys with unavoidable errors', 'Failure to meet the standard of care', 'Declining to accept a project outside their competence', 'Following state minimum technical standards'],
    correctAnswer: 1,
    explanation: 'Professional liability typically arises from negligence—failure to exercise the standard of care expected of a reasonably competent surveyor. This can include errors in field work, failure to perform adequate research, misinterpretation of evidence, or failure to communicate findings properly to the client.',
    difficulty: 'medium'
  },
  {
    domain: 'Professional Survey Practices',
    question: 'Which of the following is the surveyor\'s responsibility in a boundary dispute?',
    options: ['Determine who owns the property', 'Render an opinion on the boundary location based on evidence', 'Mediate between the disputing parties', 'Assign blame for the dispute'],
    correctAnswer: 1,
    explanation: 'The surveyor\'s role is to gather evidence, analyze it, and render a professional opinion on where the boundary is located based on the available evidence and applicable law. Only a court can authoritatively determine ownership or settle a dispute. The surveyor provides evidence and expert opinion to assist that process.',
    difficulty: 'medium'
  },
  {
    domain: 'Professional Survey Practices',
    question: 'When a client asks a surveyor to perform work outside the surveyor\'s area of competence, the surveyor should:',
    options: ['Accept the work and learn as they go', 'Decline or refer the client to a qualified professional', 'Accept the work at a reduced fee', 'Accept the work but disclaim any liability'],
    correctAnswer: 1,
    explanation: 'Professional ethics require surveyors to practice only in their areas of competence. If the work is beyond their expertise, they should decline, refer the client to a qualified professional, or (if practical) partner with someone who has the necessary expertise.',
    difficulty: 'easy'
  },
  {
    domain: 'Professional Survey Practices',
    question: 'A proper survey closure check involves:',
    options: ['Asking the client if the results look correct', 'Mathematically verifying that the traverse closes within acceptable tolerances', 'Visually inspecting the plat for obvious errors', 'Comparing results to Google Earth imagery'],
    correctAnswer: 1,
    explanation: 'A proper closure check involves mathematically computing the error of closure, relative precision, and comparing these values against required accuracy standards. Independent checks of field data, blunder detection, and redundant measurements are all part of a comprehensive quality assurance process.',
    difficulty: 'medium'
  },
  {
    domain: 'Professional Survey Practices',
    question: 'The term "responsible charge" means the surveyor:',
    options: ['Is financially responsible for the project', 'Has direct control and personal supervision of the survey work', 'Charges appropriate fees', 'Is responsible for maintaining equipment'],
    correctAnswer: 1,
    explanation: 'Responsible charge means the surveyor has direct control over and personal supervision of the survey work. This includes making professional judgments, directing the work of subordinates, reviewing data and computations, and taking personal responsibility for the accuracy and completeness of the final product.',
    difficulty: 'medium'
  },
  {
    domain: 'Professional Survey Practices',
    question: 'Professional development for surveyors should include:',
    options: ['Only attending required CE courses', 'Ongoing learning through conferences, publications, mentoring, and advanced study', 'Only studying for license renewal exams', 'Only manufacturer training on new equipment'],
    correctAnswer: 1,
    explanation: 'Professional development should be a continuous process encompassing formal CE courses, professional conferences, reading current literature, participation in professional organizations, mentoring relationships, and staying abreast of new technologies, standards, and legal developments affecting the profession.',
    difficulty: 'easy'
  },
  {
    domain: 'Professional Survey Practices',
    question: 'When communicating with public agencies about survey results, a surveyor should:',
    options: ['Only communicate through the client\'s attorney', 'Provide clear, accurate information and comply with agency requirements', 'Withhold information that might delay the project', 'Allow the client to handle all agency communications'],
    correctAnswer: 1,
    explanation: 'The surveyor should communicate clearly, accurately, and professionally with public agencies, providing all required information and documentation. Many jurisdictions require specific submissions to agencies (such as survey monuments, plats, or corner records), and the surveyor has a professional obligation to comply.',
    difficulty: 'easy'
  },
  {
    domain: 'Professional Survey Practices',
    question: 'A surveyor\'s liability can be limited by:',
    options: ['Simply stating "no liability" on the plat', 'Maintaining professional competence and following standards of care', 'Refusing to seal work products', 'Not maintaining project records'],
    correctAnswer: 1,
    explanation: 'While no method eliminates all liability, maintaining professional competence, following recognized standards of care, proper documentation, clear communication, and carrying appropriate E&O insurance are the most effective ways to manage and limit professional liability exposure.',
    difficulty: 'medium'
  },
  {
    domain: 'Professional Survey Practices',
    question: 'Field documentation should be maintained such that:',
    options: ['Only the field crew can understand it', 'Another competent surveyor could reconstruct the survey from the records', 'It is minimized to save time', 'It includes only the final coordinates'],
    correctAnswer: 1,
    explanation: 'Field documentation must be sufficiently complete and detailed that another competent surveyor could reconstruct the survey from the records alone. This includes raw observations, sketches, descriptions of monuments found and set, equipment used, weather conditions, and any anomalies encountered.',
    difficulty: 'medium'
  },
  {
    domain: 'Professional Survey Practices',
    question: 'When two surveyors reach different conclusions about the same boundary, this is most likely because:',
    options: ['One of them must be incompetent', 'They may have weighed the evidence differently based on their professional judgment', 'One is intentionally wrong', 'Survey boundaries are arbitrary'],
    correctAnswer: 1,
    explanation: 'Competent surveyors may reach different conclusions because boundary determination involves professional judgment in weighing various types of evidence. Different surveyors may find different evidence, assign different weight to the same evidence, or interpret legal principles differently. This is why boundary disputes sometimes require judicial resolution.',
    difficulty: 'hard'
  },
  {
    domain: 'Professional Survey Practices',
    question: 'A surveyor accepting a project should ensure they have:',
    options: ['The lowest possible fee to secure the contract', 'Adequate time, resources, and competence to complete the work properly', 'An agreement to limit their liability to the amount of the fee', 'The client\'s guarantee that no disputes will arise'],
    correctAnswer: 1,
    explanation: 'Before accepting a project, the surveyor must evaluate whether they have the necessary competence, equipment, personnel, and time to perform the work to the required standard. Accepting work without adequate resources compromises quality and increases liability risk.',
    difficulty: 'medium'
  },
  {
    domain: 'Professional Survey Practices',
    question: 'The concept of "following in the footsteps" of the original surveyor means:',
    options: ['Using the same brand of equipment', 'Retracing the original survey path to find original monuments and evidence', 'Working at the same time of year', 'Duplicating any errors in the original survey'],
    correctAnswer: 1,
    explanation: 'Following in the footsteps means the retracing surveyor seeks to find the original monuments, interpret the original surveyor\'s intent, and re-establish the boundaries as originally created. It does not mean duplicating errors, but rather understanding what the original surveyor did and finding the evidence they left behind.',
    difficulty: 'medium'
  },
  {
    domain: 'Professional Survey Practices',
    question: 'A surveyor\'s duty to the public includes:',
    options: ['Providing free surveys to anyone who requests them', 'Ensuring that survey work does not create hazards or mislead the public', 'Marketing their services at community events', 'Publishing all survey data for public access'],
    correctAnswer: 1,
    explanation: 'The surveyor\'s duty to the public includes ensuring that survey work is performed competently, that monuments are properly set and referenced, that plats are accurate, and that the work does not create conditions that could mislead the public or compromise public safety.',
    difficulty: 'easy'
  },
  {
    domain: 'Professional Survey Practices',
    question: 'When a surveyor is asked to provide a second opinion on another surveyor\'s work, they should:',
    options: ['Automatically discredit the original work', 'Conduct an independent analysis based on available evidence', 'Refuse to review another surveyor\'s work', 'Copy the original surveyor\'s conclusions'],
    correctAnswer: 1,
    explanation: 'The reviewing surveyor should conduct their own independent analysis of the evidence, research, and methodology. They should avoid both automatically accepting and automatically rejecting the prior work. If differences are found, they should be clearly documented with supporting rationale.',
    difficulty: 'medium'
  },
  {
    domain: 'Professional Survey Practices',
    question: 'Survey records should be retained for a minimum of:',
    options: ['1 year after project completion', '5 years after project completion', 'The period required by state law, which varies by jurisdiction', '30 days after final payment'],
    correctAnswer: 2,
    explanation: 'Record retention periods vary by state but typically range from 5 to 15 years or longer. Many states require permanent retention of certain records such as survey plats and boundary determinations. Surveyors should maintain records for at least the period required by their state\'s regulations.',
    difficulty: 'medium'
  },
  {
    domain: 'Professional Survey Practices',
    question: 'The chain of custody for survey data refers to:',
    options: ['The sequence of owners shown in the title search', 'The documented trail of who handled, modified, or processed survey data', 'The order in which field crews visited job sites', 'The hierarchy of surveyors in a firm'],
    correctAnswer: 1,
    explanation: 'Chain of custody documents who collected, handled, processed, and stored survey data and when. This is essential for data integrity, quality assurance, and legal defensibility. Maintaining chain of custody ensures that data can be verified and that any modifications are traceable.',
    difficulty: 'hard'
  },
  {
    domain: 'Professional Survey Practices',
    question: 'A surveyor who knowingly places a boundary monument at an incorrect location could be subject to:',
    options: ['A small fine only', 'Criminal prosecution, civil liability, and license revocation', 'A warning letter from the licensing board', 'No consequences if the client requested it'],
    correctAnswer: 1,
    explanation: 'Knowingly placing a monument at an incorrect location is a serious ethical and legal violation. The surveyor could face criminal charges (fraud), civil liability (damages to affected parties), and disciplinary action including license revocation. A client\'s request does not excuse professional misconduct.',
    difficulty: 'hard'
  },
  {
    domain: 'Professional Survey Practices',
    question: 'Risk management for a survey firm includes all of the following EXCEPT:',
    options: ['Maintaining E&O insurance', 'Following quality control procedures', 'Underbidding competitors to ensure volume', 'Proper contract documentation'],
    correctAnswer: 2,
    explanation: 'Effective risk management includes maintaining adequate insurance, implementing QA/QC procedures, proper contracts, ongoing training, proper documentation, and competent staffing. Underbidding competitors to maximize volume increases risk by potentially compromising the quality of work and creating financial pressure.',
    difficulty: 'hard'
  },

  // ===== STANDARDS AND SPECIFICATIONS (~40 questions) =====
  {
    domain: 'Standards and Specifications',
    question: 'The 2026 ALTA/NSPS Land Title Survey standards require a minimum positional tolerance of:',
    options: ['0.50 feet', '0.07 feet plus 50 ppm', '0.10 feet', '1.00 feet'],
    correctAnswer: 1,
    explanation: 'The 2026 ALTA/NSPS standards specify a Relative Positional Precision of 0.07 feet (2 cm) plus 50 ppm. This means for a 1,000-foot measurement, the tolerance is 0.07 + (50 × 0.001) = 0.12 feet. This is a significant accuracy requirement that typically requires precise equipment and methods.',
    difficulty: 'medium'
  },
  {
    domain: 'Standards and Specifications',
    question: 'Under ALTA/NSPS standards, Table A items are:',
    options: ['Mandatory requirements for all surveys', 'Optional services negotiated between surveyor and client', 'Minimum accuracy standards', 'Required certifications'],
    correctAnswer: 1,
    explanation: 'Table A items are optional services that may be requested by the client, lender, or title company in addition to the minimum survey requirements. Examples include flood zone determination, zoning classification, and parking count. These items must be specifically negotiated and agreed upon before the survey.',
    difficulty: 'easy'
  },
  {
    domain: 'Standards and Specifications',
    question: 'FEMA flood zone determination requires identification of the:',
    options: ['10-year floodplain', '50-year floodplain', '100-year floodplain (Special Flood Hazard Area)', '500-year floodplain only'],
    correctAnswer: 2,
    explanation: 'FEMA flood zone determination primarily involves the 100-year floodplain, designated as the Special Flood Hazard Area (SFHA) on Flood Insurance Rate Maps (FIRMs). Properties in the SFHA have a 1% annual chance of flooding and typically require flood insurance when a federally-backed mortgage is involved.',
    difficulty: 'easy'
  },
  {
    domain: 'Standards and Specifications',
    question: 'The FGCS (Federal Geodetic Control Subcommittee) standards classify horizontal control accuracy as:',
    options: ['First, Second, and Third Order', 'Class A, B, and C', 'High, Medium, and Low', 'Primary, Secondary, and Tertiary'],
    correctAnswer: 0,
    explanation: 'FGCS classifies horizontal control as First Order, Second Order (Class I and Class II), and Third Order (Class I and Class II). First Order is the most precise, with minimum distance accuracy of 1:100,000. These standards govern the establishment and maintenance of geodetic control networks.',
    difficulty: 'medium'
  },
  {
    domain: 'Standards and Specifications',
    question: 'State minimum technical standards for surveying typically address:',
    options: ['Only the fee that can be charged', 'Minimum accuracy, monumentation, plat format, and record-keeping requirements', 'Only the type of equipment that must be used', 'Only the education requirements for licensure'],
    correctAnswer: 1,
    explanation: 'State minimum technical standards establish requirements for accuracy, monumentation types and sizes, plat content and format, record-keeping, and professional procedures. They set the minimum acceptable level of practice for licensed surveyors in that state.',
    difficulty: 'easy'
  },
  {
    domain: 'Standards and Specifications',
    question: 'NGS (National Geodetic Survey) guidelines for GNSS observations on CORS stations recommend a minimum observation time of:',
    options: ['15 minutes', '1 hour', '4 hours for static surveys', '24 hours'],
    correctAnswer: 2,
    explanation: 'NGS recommends a minimum of 4 hours of static GNSS observation for establishing geodetic control points referenced to the National Spatial Reference System (NSRS). Longer observation times improve accuracy and reliability, particularly for determining accurate heights and resolving integer ambiguities.',
    difficulty: 'hard'
  },
  {
    domain: 'Standards and Specifications',
    question: 'The National Map Accuracy Standard requires that 90% of well-defined points tested shall be within:',
    options: ['1/50 inch at map scale for maps at 1:20,000 or larger', '1/30 inch at map scale for all maps', '0.5 mm at map scale for all maps', '1/100 inch at map scale for all maps'],
    correctAnswer: 0,
    explanation: 'The National Map Accuracy Standard (NMAS) of 1947 requires that not more than 10% of well-defined points tested shall be in error by more than 1/50 inch at publication scale for maps at scales of 1:20,000 or larger, and 1/30 inch for maps at smaller scales. For horizontal positions, this translates to specific ground distances.',
    difficulty: 'hard'
  },
  {
    domain: 'Standards and Specifications',
    question: 'For an ALTA/NSPS survey, the surveyor must certify to the:',
    options: ['General public only', 'Client, lender, title company, and other parties as negotiated', 'Federal government only', 'State licensing board only'],
    correctAnswer: 1,
    explanation: 'The ALTA/NSPS certification is addressed to specific parties: typically the client (buyer/owner), the lender, and the title insurance company. Additional parties may be added as negotiated. The certification states that the survey was performed in accordance with the 2026 ALTA/NSPS standards.',
    difficulty: 'medium'
  },
  {
    domain: 'Standards and Specifications',
    question: 'Construction staking tolerances for building corners are typically:',
    options: ['±1.0 foot', '±0.10 foot or less', '±0.01 foot', '±5.0 feet'],
    correctAnswer: 1,
    explanation: 'Construction staking tolerances for building corners are typically ±0.10 foot (approximately ±1.2 inches) or less, depending on the type of construction and project specifications. Foundation work and structural elements require tighter tolerances than rough grading or earthwork.',
    difficulty: 'medium'
  },
  {
    domain: 'Standards and Specifications',
    question: 'The ASPRS positional accuracy standard for digital orthoimagery uses which statistic?',
    options: ['Circular Error Probable (CEP)', 'Root Mean Square Error (RMSE)', 'Standard deviation', 'Maximum allowable error'],
    correctAnswer: 1,
    explanation: 'The ASPRS (American Society for Photogrammetry and Remote Sensing) standards use Root Mean Square Error (RMSE) as the primary statistic for evaluating positional accuracy. RMSE provides a measure of both bias and precision and is calculated from the differences between surveyed check points and the corresponding positions on the map or image.',
    difficulty: 'medium'
  },
  {
    domain: 'Standards and Specifications',
    question: 'A subdivision plat typically must include all of the following EXCEPT:',
    options: ['Lot dimensions and bearings', 'Easements and rights-of-way', 'The surveyor\'s personal financial statement', 'Monument descriptions and locations'],
    correctAnswer: 2,
    explanation: 'A subdivision plat must include lot dimensions, bearings, easements, rights-of-way, monument descriptions, acreage, certification, and other information required by state and local regulations. A surveyor\'s personal financial statement has no relevance to a subdivision plat and is never required.',
    difficulty: 'easy'
  },
  {
    domain: 'Standards and Specifications',
    question: 'Under ALTA/NSPS standards, "Relative Positional Precision" describes:',
    options: ['The accuracy of a single GPS measurement', 'The uncertainty in position of any survey point relative to any other survey point', 'The distance from the nearest geodetic control point', 'The precision of the surveyor\'s total station'],
    correctAnswer: 1,
    explanation: 'Relative Positional Precision describes the length of the semi-major axis of the error ellipse representing the uncertainty in the position of any point on the survey relative to any other point on the survey at the 95% confidence level. It reflects the internal consistency of the survey network.',
    difficulty: 'hard'
  },
  {
    domain: 'Standards and Specifications',
    question: 'GPS static observations for geodetic control typically require baselines to be observed for:',
    options: ['Less than 5 minutes', '15-30 minutes for short baselines', 'Exactly 1 hour regardless of baseline length', '5 seconds per satellite'],
    correctAnswer: 1,
    explanation: 'Static GPS observation times depend on baseline length, number of satellites, and required accuracy. For short baselines (less than 10 km), 15-30 minutes is typical. Longer baselines or higher accuracy requirements demand longer observation times, potentially several hours.',
    difficulty: 'medium'
  },
  {
    domain: 'Standards and Specifications',
    question: 'The minimum number of GPS satellites required for RTK surveying is:',
    options: ['3 satellites', '4 satellites', '5 satellites (4 plus 1 for redundancy)', '8 satellites'],
    correctAnswer: 2,
    explanation: 'While a theoretical minimum of 4 satellites is needed for a 3D position fix, RTK surveying typically requires 5 or more satellites (at least 5 from GPS, or a combination of GPS/GLONASS/Galileo) for reliable ambiguity resolution and to maintain centimeter-level accuracy with adequate redundancy.',
    difficulty: 'medium'
  },
  {
    domain: 'Standards and Specifications',
    question: 'For ALTA/NSPS surveys, the surveyor must show evidence of:',
    options: ['Only visible improvements within 5 feet of boundary lines', 'All improvements, easements, and encroachments observed on or within 5 feet of the boundaries', 'Only buildings and fences', 'Only items specifically requested by the client'],
    correctAnswer: 1,
    explanation: 'The 2026 ALTA/NSPS standards require the surveyor to show all improvements on the property and within 5 feet of the boundary lines that are observed during the field survey. This includes buildings, fences, walls, utilities, driveways, and other visible improvements, as well as any encroachments across boundary lines.',
    difficulty: 'medium'
  },
  {
    domain: 'Standards and Specifications',
    question: 'The NSRS (National Spatial Reference System) is maintained by:',
    options: ['USGS', 'NGS (National Geodetic Survey)', 'FEMA', 'U.S. Census Bureau'],
    correctAnswer: 1,
    explanation: 'The National Geodetic Survey (NGS), a division of NOAA, maintains the National Spatial Reference System, which defines the coordinate system (latitude, longitude, and height) for the United States. NGS maintains the geodetic datums (NAD 83, NAVD 88) and provides tools and data for surveyors.',
    difficulty: 'easy'
  },
  {
    domain: 'Standards and Specifications',
    question: 'Boundary survey accuracy for rural properties in most states requires a minimum precision of:',
    options: ['1:5,000', '1:10,000', '1:15,000', '1:50,000'],
    correctAnswer: 0,
    explanation: 'Most state minimum technical standards require a minimum precision of 1:5,000 for rural boundary surveys. Urban surveys typically require 1:10,000 or better. Some states have adopted the ALTA/NSPS positional tolerance standard as the minimum for all boundary surveys.',
    difficulty: 'medium'
  },
  {
    domain: 'Standards and Specifications',
    question: 'A Letter of Map Amendment (LOMA) from FEMA:',
    options: ['Changes the base flood elevation for a community', 'Removes a property from the SFHA based on elevation data', 'Amends the local zoning ordinance', 'Changes the flood insurance rate structure'],
    correctAnswer: 1,
    explanation: 'A LOMA is an official amendment to an effective FIRM that removes a property or structure from the Special Flood Hazard Area. It is issued based on technical data (usually an elevation certificate prepared by a surveyor) showing that the property is above the base flood elevation.',
    difficulty: 'hard'
  },
  {
    domain: 'Standards and Specifications',
    question: 'The accuracy standard for construction staking of curb and gutter is typically:',
    options: ['±1.0 foot horizontal, ±0.5 foot vertical', '±0.05 foot horizontal, ±0.01 foot vertical', '±0.10 foot horizontal, ±0.10 foot vertical', '±0.50 foot horizontal, ±0.25 foot vertical'],
    correctAnswer: 1,
    explanation: 'Curb and gutter construction staking requires tight tolerances, typically ±0.05 foot horizontal and ±0.01 foot vertical. These tight vertical tolerances are necessary to maintain proper drainage flow. Different construction elements have different tolerance requirements.',
    difficulty: 'hard'
  },
  {
    domain: 'Standards and Specifications',
    question: 'Under the 2026 ALTA/NSPS standards, the surveyor must report the datum and adjustment used for:',
    options: ['All surveys regardless of Table A selections', 'Only when Table A Item 21 is requested', 'Only GPS surveys', 'Only state plane coordinate surveys'],
    correctAnswer: 0,
    explanation: 'The 2026 ALTA/NSPS standards require that if coordinates are shown on the survey, the datum, adjustment, and zone must be reported on the survey plat. This is a minimum requirement for all ALTA/NSPS surveys, regardless of which Table A items are selected.',
    difficulty: 'hard'
  },
  {
    domain: 'Standards and Specifications',
    question: 'The vertical datum currently used in the United States is:',
    options: ['NGVD 29', 'NAVD 88', 'WGS 84', 'NAD 83'],
    correctAnswer: 1,
    explanation: 'NAVD 88 (North American Vertical Datum of 1988) is the current official vertical datum for the United States. It replaced NGVD 29 (National Geodetic Vertical Datum of 1929). NAVD 88 is based on the Helmert orthometric height system and is referenced to a single benchmark (Father Point, Quebec).',
    difficulty: 'easy'
  },
  {
    domain: 'Standards and Specifications',
    question: 'When performing an Elevation Certificate for FEMA flood insurance purposes, the surveyor must reference elevations to:',
    options: ['An arbitrary benchmark', 'NAVD 88 or the datum shown on the FIRM', 'Local mean sea level', 'The property\'s lowest point'],
    correctAnswer: 1,
    explanation: 'Elevation Certificates must reference elevations to the same datum used on the community\'s Flood Insurance Rate Map (FIRM), which is typically NAVD 88 for newer FIRMs or NGVD 29 for older ones. Using the correct datum is critical for accurate flood zone determination.',
    difficulty: 'medium'
  },
  {
    domain: 'Standards and Specifications',
    question: 'The minimum monumentation requirements for boundary corners in most states include:',
    options: ['Wooden stakes only', 'Iron rods or pipes with identification caps', 'Spray paint marks on the ground', 'Nails in trees'],
    correctAnswer: 1,
    explanation: 'Most state minimum technical standards require durable monuments at boundary corners, typically iron rods or pipes with identification caps bearing the surveyor\'s license number or firm name. The purpose is to provide permanent, recoverable evidence of the boundary locations.',
    difficulty: 'easy'
  },
  {
    domain: 'Standards and Specifications',
    question: 'An ALTA/NSPS survey differs from a standard boundary survey primarily because:',
    options: ['It requires more expensive equipment', 'It follows nationally uniform standards and includes additional items relevant to title insurance', 'It can only be performed for commercial properties', 'It does not require boundary monuments'],
    correctAnswer: 1,
    explanation: 'ALTA/NSPS surveys follow nationally uniform standards developed jointly by the American Land Title Association and the National Society of Professional Surveyors. They include specific requirements for positional precision, identification of improvements and encroachments, and optional Table A items relevant to title insurance underwriting.',
    difficulty: 'medium'
  },
  {
    domain: 'Standards and Specifications',
    question: 'The term "positional tolerance" in survey accuracy standards refers to:',
    options: ['How far a monument can be placed from its intended position', 'The allowable discrepancy between measured and true positions', 'The maximum distance between control points', 'The tolerance for GPS antenna height measurement'],
    correctAnswer: 1,
    explanation: 'Positional tolerance defines the maximum allowable difference between a measured position and the true (or accepted) position of a point. It is typically expressed at a specific confidence level (such as 95%) and may be specified as a fixed value, a proportion of distance, or a combination of both.',
    difficulty: 'medium'
  },
  {
    domain: 'Standards and Specifications',
    question: 'For geodetic control surveys, the order and class of accuracy is determined by:',
    options: ['The type of equipment used', 'The spacing between control stations', 'The ratio of closure error to distance', 'The surveyor\'s experience level'],
    correctAnswer: 2,
    explanation: 'The order and class of geodetic control are determined primarily by the ratio of closure error to distance (relative accuracy). For example, First Order surveys must achieve at least 1:100,000 relative accuracy. Other factors include the spacing of stations, observation procedures, and adjustment methods.',
    difficulty: 'hard'
  },
  {
    domain: 'Standards and Specifications',
    question: 'Under ALTA/NSPS standards, the surveyor must investigate:',
    options: ['Only the current deed', 'Title commitment or title report for easements and exceptions', 'Only the recorded plat', 'Only what the client provides verbally'],
    correctAnswer: 1,
    explanation: 'The surveyor must examine the title commitment or title report provided by the title company to identify recorded easements, exceptions, rights-of-way, and other encumbrances that affect the property. This research is essential for showing all encumbrances on the survey plat.',
    difficulty: 'medium'
  },
  {
    domain: 'Standards and Specifications',
    question: 'GNSS observation procedures for geodetic control should include:',
    options: ['Single occupation of each point for 5 minutes', 'Multiple independent occupations with different satellite geometry', 'Observation only during daylight hours', 'Use of only GPS satellites, excluding GLONASS'],
    correctAnswer: 1,
    explanation: 'Best practices for geodetic GNSS observations include multiple independent occupations of each point at different times (to achieve different satellite geometry), sufficient observation time, proper antenna setup and height measurement, and recording of all metadata needed for processing and quality evaluation.',
    difficulty: 'hard'
  },
  {
    domain: 'Standards and Specifications',
    question: 'The purpose of an ALTA/NSPS Table A Item 18 (Offsite Easements) is to:',
    options: ['Survey easements located entirely off the subject property', 'Identify easements visible from the property', 'Survey all roads adjacent to the property', 'Map underground utilities off the property'],
    correctAnswer: 0,
    explanation: 'Table A Item 18 requires the surveyor to survey, locate, and show on the plat any plottable offsite (appurtenant) easements disclosed in documents provided to or obtained by the surveyor, such as access easements or utility easements that cross neighboring properties.',
    difficulty: 'hard'
  },
  {
    domain: 'Standards and Specifications',
    question: 'The National Spatial Reference System (NSRS) is scheduled to be modernized with the replacement of NAD 83 by:',
    options: ['NAD 2022', 'WGS 84', 'The North American Terrestrial Reference Frame (NATRF)', 'Clarke 1866'],
    correctAnswer: 2,
    explanation: 'NGS plans to replace NAD 83 with the North American Terrestrial Reference Frame (NATRF), a plate-fixed, geocentric reference frame. This modernization will also replace NAVD 88 with a geoid-based vertical datum. The new frames will be more accurate and consistent with global reference systems.',
    difficulty: 'hard'
  },
  {
    domain: 'Standards and Specifications',
    question: 'Construction staking for sanitary sewer pipe typically requires vertical accuracy of:',
    options: ['±0.50 feet', '±0.10 feet', '±0.01 feet', '±1.00 feet'],
    correctAnswer: 2,
    explanation: 'Sanitary sewer construction requires very tight vertical tolerances, typically ±0.01 feet, because gravity flow sewers depend on precise grade to function properly. Even small deviations in grade can result in low spots that accumulate sediment and cause blockages.',
    difficulty: 'hard'
  },
  {
    domain: 'Standards and Specifications',
    question: 'For boundary surveys, state minimum standards typically require that plats include:',
    options: ['Only a north arrow and scale', 'A legend, north arrow, scale, surveyor seal, basis of bearing, and monument descriptions', 'Only the surveyor\'s name', 'Only lot dimensions'],
    correctAnswer: 1,
    explanation: 'Most state minimum technical standards require comprehensive plat content including: legend, north arrow, graphic and written scale, basis of bearing, monument descriptions, adjoiner information, surveyor certification, seal and signature, date, and all measurement data necessary to re-establish the boundaries.',
    difficulty: 'easy'
  },
  {
    domain: 'Standards and Specifications',
    question: 'An Elevation Certificate (FEMA Form) is required for:',
    options: ['All property sales', 'Properties in or near Special Flood Hazard Areas for insurance rating purposes', 'Every construction project', 'Annual property tax assessments'],
    correctAnswer: 1,
    explanation: 'Elevation Certificates are required for properties in or near Special Flood Hazard Areas (SFHAs) to establish flood insurance rates. They document the building\'s elevation relative to the Base Flood Elevation and must be completed by a licensed surveyor or engineer.',
    difficulty: 'easy'
  },
  {
    domain: 'Standards and Specifications',
    question: 'The ALTA/NSPS standards require the surveyor to show all of the following EXCEPT:',
    options: ['Access to public ways', 'Observable evidence of utilities', 'The property\'s market value', 'Rights-of-way and easements of record'],
    correctAnswer: 2,
    explanation: 'ALTA/NSPS surveys must show access, visible utilities, rights-of-way, easements, improvements, and encroachments. Market value is not a survey deliverable—it is determined by appraisers. The survey focuses on physical and recorded conditions affecting the property.',
    difficulty: 'easy'
  },
  {
    domain: 'Standards and Specifications',
    question: 'When performing static GNSS surveys, the multipath error can be minimized by:',
    options: ['Using longer observation times to average out the effect', 'Observing only at night', 'Using a single-frequency receiver', 'Reducing the observation time'],
    correctAnswer: 0,
    explanation: 'Multipath occurs when GNSS signals reflect off nearby surfaces before reaching the antenna. Longer observation times help average out multipath effects because the satellite geometry changes over time. Additionally, using choke-ring antennas, ground planes, and avoiding reflective surfaces near the antenna help reduce multipath.',
    difficulty: 'medium'
  },

  // ===== BUSINESS PRACTICES (~35 questions) =====
  {
    domain: 'Business Practices',
    question: 'Which business entity type provides personal liability protection for the owners while allowing pass-through taxation?',
    options: ['Sole proprietorship', 'General partnership', 'Limited Liability Company (LLC)', 'C Corporation'],
    correctAnswer: 2,
    explanation: 'An LLC provides personal liability protection (members are generally not personally liable for company debts) while allowing pass-through taxation (profits and losses pass through to members\' personal tax returns). This combination makes LLCs popular for small to medium survey firms.',
    difficulty: 'easy'
  },
  {
    domain: 'Business Practices',
    question: 'A sole proprietorship differs from an LLC in that the sole proprietor:',
    options: ['Has limited personal liability', 'Is personally liable for all business debts', 'Cannot hire employees', 'Must have multiple owners'],
    correctAnswer: 1,
    explanation: 'In a sole proprietorship, the owner is personally liable for all business debts, obligations, and legal judgments. There is no separation between personal and business assets. An LLC provides a legal separation between the owner\'s personal assets and business liabilities.',
    difficulty: 'easy'
  },
  {
    domain: 'Business Practices',
    question: 'Errors and Omissions (E&O) insurance for a survey firm covers:',
    options: ['Equipment theft and damage', 'Professional negligence claims arising from survey work', 'Workers\' compensation claims', 'Vehicle accidents during field work'],
    correctAnswer: 1,
    explanation: 'E&O insurance (professional liability insurance) covers claims of negligence, errors, or omissions in professional services. It pays for defense costs and damages when a client alleges that the survey work caused them financial harm. It does not cover equipment, vehicles, or employee injuries.',
    difficulty: 'easy'
  },
  {
    domain: 'Business Practices',
    question: 'A survey contract should include all of the following EXCEPT:',
    options: ['Scope of work', 'Fee and payment terms', 'Guarantee that no boundary disputes will arise', 'Timeline and deliverables'],
    correctAnswer: 2,
    explanation: 'A well-drafted survey contract includes scope of work, fee structure, payment terms, timeline, deliverables, limitation of liability, and dispute resolution provisions. A surveyor cannot guarantee that no boundary disputes will arise, as disputes depend on factors beyond the surveyor\'s control.',
    difficulty: 'easy'
  },
  {
    domain: 'Business Practices',
    question: 'The most common fee structure for boundary surveys is:',
    options: ['Percentage of property value', 'Fixed fee based on scope of work', 'Hourly with no estimate', 'Cost per acre with no maximum'],
    correctAnswer: 1,
    explanation: 'Fixed fee (lump sum) based on the scope of work is the most common fee structure for boundary surveys. It provides certainty for both the client and the surveyor. Time and materials, per-acre fees, and combination structures are also used depending on the project type.',
    difficulty: 'easy'
  },
  {
    domain: 'Business Practices',
    question: 'General liability insurance for a survey firm covers:',
    options: ['Professional negligence claims', 'Bodily injury and property damage caused during operations', 'Errors in the survey measurements', 'Loss of survey data'],
    correctAnswer: 1,
    explanation: 'General liability (GL) insurance covers third-party claims of bodily injury and property damage that occur during business operations. For example, if a client trips over survey equipment or if a monument damages a water line during installation. Professional negligence claims are covered by E&O insurance.',
    difficulty: 'medium'
  },
  {
    domain: 'Business Practices',
    question: 'When a survey firm subcontracts work to another firm, the primary firm:',
    options: ['Transfers all liability to the subcontractor', 'Retains responsibility for the quality of the final product', 'Is no longer involved in the project', 'Cannot seal the final product'],
    correctAnswer: 1,
    explanation: 'The primary firm retains overall responsibility for the quality and accuracy of the work product, even when portions are subcontracted. The surveyor of record must review and verify the subcontractor\'s work before sealing and delivering the final product to the client.',
    difficulty: 'medium'
  },
  {
    domain: 'Business Practices',
    question: 'A conflict of interest in a survey engagement exists when:',
    options: ['The surveyor uses subcontractors', 'The surveyor has a personal or financial interest that could influence professional judgment', 'The surveyor performs work for competing clients on different projects', 'The surveyor charges market-rate fees'],
    correctAnswer: 1,
    explanation: 'A conflict of interest exists when the surveyor\'s personal, financial, or other interests could compromise or appear to compromise their professional objectivity and judgment. Examples include having a financial interest in the property, being related to a party in a dispute, or having a business relationship that could create bias.',
    difficulty: 'medium'
  },
  {
    domain: 'Business Practices',
    question: 'Record retention requirements for survey firms are important because:',
    options: ['Records take up valuable office space', 'Records may be needed for future boundary disputes, title claims, or professional liability defense', 'Records are only needed for tax purposes', 'Records have no value after project completion'],
    correctAnswer: 1,
    explanation: 'Survey records are essential for defending against professional liability claims, resolving boundary disputes, supporting title examinations, and enabling future retracement surveys. Most states mandate minimum retention periods, and some require permanent retention of survey records.',
    difficulty: 'medium'
  },
  {
    domain: 'Business Practices',
    question: 'Project management for a survey firm involves:',
    options: ['Only managing field crews', 'Planning, scheduling, budgeting, quality control, and client communication', 'Only tracking billable hours', 'Only managing equipment maintenance'],
    correctAnswer: 1,
    explanation: 'Effective project management encompasses all phases: research and planning, resource allocation, scheduling, budgeting, field operations coordination, data processing, quality control, deliverable preparation, client communication, and project closeout. It ensures projects are completed on time, within budget, and to required quality standards.',
    difficulty: 'easy'
  },
  {
    domain: 'Business Practices',
    question: 'When preparing a proposal for survey services, the surveyor should:',
    options: ['Provide the lowest possible fee to win the contract', 'Clearly define the scope, deliverables, timeline, fee, and assumptions', 'Make the proposal as vague as possible for flexibility', 'Include only the total fee without scope details'],
    correctAnswer: 1,
    explanation: 'A professional proposal should clearly define the scope of services, deliverables, timeline, fee structure, assumptions, exclusions, and terms and conditions. Clear proposals reduce misunderstandings, manage client expectations, and provide documentation of the agreed-upon services.',
    difficulty: 'easy'
  },
  {
    domain: 'Business Practices',
    question: 'Risk management for a survey firm includes all of the following strategies EXCEPT:',
    options: ['Maintaining adequate insurance coverage', 'Implementing quality control procedures', 'Accepting every project regardless of competence', 'Using clear written contracts'],
    correctAnswer: 2,
    explanation: 'Effective risk management includes maintaining adequate insurance, implementing QC procedures, using clear contracts, proper client communication, staff training, and declining work outside the firm\'s competence. Accepting every project regardless of competence increases risk exposure.',
    difficulty: 'medium'
  },
  {
    domain: 'Business Practices',
    question: 'The advantages of incorporating a survey firm as a corporation include:',
    options: ['Simplified tax filing', 'Limited liability protection and ability to issue stock', 'No regulatory requirements', 'Automatic professional licensure for all employees'],
    correctAnswer: 1,
    explanation: 'Incorporating as a corporation provides limited liability protection for shareholders, the ability to raise capital by issuing stock, perpetual existence, and potential tax advantages. However, corporations face more regulatory requirements, formalities, and potential double taxation (for C Corporations).',
    difficulty: 'medium'
  },
  {
    domain: 'Business Practices',
    question: 'Billing practices for survey firms should ensure:',
    options: ['Invoices are vague to avoid disputes', 'Clear, detailed invoices that reflect the scope of work performed', 'All work is billed at the same hourly rate regardless of task', 'Payment is never collected until the project is fully complete'],
    correctAnswer: 1,
    explanation: 'Professional billing practices include clear, itemized invoices that describe the work performed, consistent with the contract terms. Timely and transparent billing builds client trust, reduces disputes, and ensures proper cash flow for the firm.',
    difficulty: 'easy'
  },
  {
    domain: 'Business Practices',
    question: 'Technology investments for a survey firm should be evaluated based on:',
    options: ['Only the purchase price', 'Return on investment, productivity improvement, and competitive advantage', 'What competitors are purchasing', 'The newest technology available regardless of need'],
    correctAnswer: 1,
    explanation: 'Technology investments should be evaluated holistically considering return on investment, productivity improvements, training costs, maintenance, competitive advantages, client requirements, and alignment with the firm\'s strategic goals. Not every new technology is appropriate for every firm.',
    difficulty: 'medium'
  },
  {
    domain: 'Business Practices',
    question: 'A survey firm\'s marketing strategy should focus on:',
    options: ['Guaranteeing the lowest prices', 'Building relationships, demonstrating competence, and communicating value', 'Criticizing competitors\' work', 'Promising results before evaluating the project'],
    correctAnswer: 1,
    explanation: 'Effective marketing for professional services focuses on building relationships, demonstrating expertise through quality work, communicating the value of professional surveying, maintaining a professional reputation, and networking within the industry and community.',
    difficulty: 'easy'
  },
  {
    domain: 'Business Practices',
    question: 'When hiring survey technicians, a firm should prioritize:',
    options: ['Only candidates with advanced degrees', 'Technical competence, willingness to learn, and professional attitude', 'Only candidates with 10+ years of experience', 'Candidates who will work for the lowest wages'],
    correctAnswer: 1,
    explanation: 'Successful hiring considers technical skills, aptitude for learning, professionalism, reliability, and cultural fit. A combination of formal education, field experience, and attitude is important. The firm should also invest in training and mentoring to develop employees\' skills.',
    difficulty: 'easy'
  },
  {
    domain: 'Business Practices',
    question: 'Financial management for a survey firm should include:',
    options: ['Tracking only revenue', 'Budgeting, accounts receivable management, job costing, and cash flow planning', 'Spending all revenue on equipment', 'Avoiding financial planning to stay flexible'],
    correctAnswer: 1,
    explanation: 'Sound financial management includes budgeting, monitoring accounts receivable, tracking job costs, managing cash flow, maintaining financial reserves, tax planning, and making informed investment decisions. These practices ensure the firm\'s long-term financial health and sustainability.',
    difficulty: 'medium'
  },
  {
    domain: 'Business Practices',
    question: 'A limitation of liability clause in a survey contract:',
    options: ['Eliminates all professional liability', 'Caps the surveyor\'s financial exposure at an agreed-upon amount', 'Is illegal in all states', 'Applies only to government contracts'],
    correctAnswer: 1,
    explanation: 'A limitation of liability clause caps the surveyor\'s maximum financial exposure, typically at the amount of the fee or a multiple thereof. While enforceable in many states, these clauses have limitations and may not protect against gross negligence or fraud. They should be drafted by an attorney.',
    difficulty: 'hard'
  },
  {
    domain: 'Business Practices',
    question: 'Workers\' compensation insurance is:',
    options: ['Optional for all survey firms', 'Required in most states for firms with employees', 'Only needed for firms with more than 50 employees', 'The same as E&O insurance'],
    correctAnswer: 1,
    explanation: 'Workers\' compensation insurance is required in most states for businesses with employees. It covers medical expenses and lost wages for employees injured on the job. Survey firms face particular risks due to field work in varied terrain and conditions. Requirements vary by state.',
    difficulty: 'medium'
  },
  {
    domain: 'Business Practices',
    question: 'Job costing for survey projects helps the firm:',
    options: ['Only satisfy tax requirements', 'Track profitability, improve estimating, and identify inefficiencies', 'Avoid paying taxes on unprofitable jobs', 'Delay billing to clients'],
    correctAnswer: 1,
    explanation: 'Job costing tracks the actual costs (labor, materials, equipment, subcontractors) associated with each project. This data helps the firm evaluate profitability by project type, improve future estimates, identify operational inefficiencies, and make better pricing decisions.',
    difficulty: 'medium'
  },
  {
    domain: 'Business Practices',
    question: 'A general partnership differs from a limited partnership in that:',
    options: ['General partners have limited liability', 'All partners in a general partnership share unlimited liability', 'General partnerships require a formal written agreement', 'Limited partnerships cannot practice surveying'],
    correctAnswer: 1,
    explanation: 'In a general partnership, all partners share unlimited personal liability for the partnership\'s debts and obligations. In a limited partnership, limited partners have liability limited to their investment, while general partners retain unlimited liability. Professional partnerships may have additional requirements.',
    difficulty: 'medium'
  },
  {
    domain: 'Business Practices',
    question: 'When a client fails to pay for completed survey services, the surveyor should:',
    options: ['Immediately file a lawsuit', 'Follow the contract terms, send formal notices, and pursue appropriate collection remedies', 'Withhold the survey plat from the public record', 'Refuse to perform any future work for the client'],
    correctAnswer: 1,
    explanation: 'The surveyor should follow established collection procedures: review the contract terms, send formal payment reminders, negotiate if appropriate, and pursue legal remedies as a last resort. The surveyor may retain work products per contract terms but should not engage in unprofessional conduct.',
    difficulty: 'medium'
  },
  {
    domain: 'Business Practices',
    question: 'The purpose of a retainer fee in a survey contract is to:',
    options: ['Guarantee the lowest price', 'Secure the surveyor\'s commitment and provide initial funding for the project', 'Replace the need for a written contract', 'Ensure the surveyor does not work for the client\'s competitors'],
    correctAnswer: 1,
    explanation: 'A retainer fee is an advance payment that secures the surveyor\'s commitment to the project and provides funds to cover initial expenses such as research, mobilization, and planning. It demonstrates the client\'s commitment and reduces the firm\'s financial risk on the project.',
    difficulty: 'easy'
  },
  {
    domain: 'Business Practices',
    question: 'Professional networking for surveyors is valuable because it:',
    options: ['Is required by all licensing boards', 'Builds referral sources, provides learning opportunities, and enhances professional reputation', 'Eliminates the need for marketing', 'Guarantees new contracts'],
    correctAnswer: 1,
    explanation: 'Professional networking through organizations like NSPS, state societies, and local associations provides opportunities for referrals, professional development, knowledge sharing, mentoring, staying current with industry trends, and building the firm\'s reputation in the community.',
    difficulty: 'easy'
  },
  {
    domain: 'Business Practices',
    question: 'When establishing fee structures, a surveyor should consider:',
    options: ['Only the client\'s budget', 'Costs, overhead, desired profit margin, market conditions, and project complexity', 'Only what competitors charge', 'Setting the lowest possible fee to maximize volume'],
    correctAnswer: 1,
    explanation: 'Fee structures should account for direct costs (labor, equipment, materials), overhead (office, insurance, utilities), desired profit margin, project complexity, risk level, market conditions, and the value of the services provided. Fees should be sufficient to deliver quality work profitably.',
    difficulty: 'medium'
  },
  {
    domain: 'Business Practices',
    question: 'A professional corporation (PC) for a surveying practice:',
    options: ['Eliminates all personal liability for professional services', 'Provides limited liability for business debts but not for professional malpractice', 'Is the same as a sole proprietorship', 'Cannot employ licensed professionals'],
    correctAnswer: 1,
    explanation: 'A professional corporation provides limited liability protection for business debts and the acts of other professionals in the firm, but each professional remains personally liable for their own professional negligence or malpractice. This differs from standard corporations where shareholder liability is more broadly limited.',
    difficulty: 'hard'
  },
  {
    domain: 'Business Practices',
    question: 'Succession planning for a survey firm is important because:',
    options: ['It is required by state law in all states', 'It ensures continuity of operations, protects client relationships, and preserves firm value', 'It only applies to firms with more than 100 employees', 'It eliminates the need for insurance'],
    correctAnswer: 1,
    explanation: 'Succession planning ensures smooth leadership transition, maintains client relationships, preserves the firm\'s reputation and value, and protects employees\' livelihoods. It should address ownership transfer, client communication, knowledge transfer, and the ongoing maintenance of survey records.',
    difficulty: 'hard'
  },
  {
    domain: 'Business Practices',
    question: 'An indemnification clause in a survey contract:',
    options: ['Guarantees the survey is error-free', 'Allocates responsibility for losses between the parties', 'Is always unenforceable', 'Replaces E&O insurance'],
    correctAnswer: 1,
    explanation: 'An indemnification clause defines which party will be financially responsible for specified losses, damages, or claims arising from the project. It allocates risk between the client and the surveyor and should be carefully reviewed and negotiated to ensure fair risk allocation.',
    difficulty: 'hard'
  },
  {
    domain: 'Business Practices',
    question: 'Overhead costs for a survey firm include:',
    options: ['Only field crew wages', 'Office rent, insurance, utilities, administrative staff, and equipment depreciation', 'Only the cost of survey monuments', 'Only direct project costs'],
    correctAnswer: 1,
    explanation: 'Overhead includes all costs not directly attributable to a specific project: office rent, utilities, insurance, administrative and management salaries, equipment depreciation, professional development, marketing, and other general business expenses. Understanding overhead is essential for proper fee estimation.',
    difficulty: 'medium'
  },

  // ===== AREAS OF PRACTICE (~40 questions) =====
  {
    domain: 'Areas of Practice',
    question: 'A boundary survey determines:',
    options: ['Only the area of a property', 'The location of property lines based on deed descriptions, monuments, and other evidence', 'The value of the property', 'Only the elevation of the property'],
    correctAnswer: 1,
    explanation: 'A boundary survey locates the property lines by interpreting deed descriptions, finding monuments, examining title records, evaluating physical evidence on the ground, and applying legal principles. The result establishes the location and extent of the property boundaries.',
    difficulty: 'easy'
  },
  {
    domain: 'Areas of Practice',
    question: 'An ALTA/NSPS Land Title Survey is typically required for:',
    options: ['All residential property sales', 'Commercial real estate transactions involving title insurance and lending', 'Only government projects', 'Annual property tax assessments'],
    correctAnswer: 1,
    explanation: 'ALTA/NSPS surveys are commonly required for commercial real estate transactions where title insurance is being issued and/or a lender requires assurance that the property boundaries, improvements, and encumbrances are properly identified. They are generally more comprehensive than standard boundary surveys.',
    difficulty: 'easy'
  },
  {
    domain: 'Areas of Practice',
    question: 'A topographic survey maps:',
    options: ['Only property boundaries', 'The natural and man-made features and elevation of the land surface', 'Only underground utilities', 'Only the street network'],
    correctAnswer: 1,
    explanation: 'A topographic survey maps the physical features of the land surface including elevation (represented by contour lines), natural features (trees, water bodies), man-made features (buildings, roads, utilities), and other relevant details needed for design, planning, or engineering purposes.',
    difficulty: 'easy'
  },
  {
    domain: 'Areas of Practice',
    question: 'Construction staking involves:',
    options: ['Conducting a boundary survey', 'Laying out design points in the field to guide construction', 'Performing topographic mapping', 'Recording a subdivision plat'],
    correctAnswer: 1,
    explanation: 'Construction staking (layout) involves establishing reference points and lines in the field to guide contractors in building structures, roads, utilities, and other improvements according to design plans. The surveyor translates the engineer\'s design coordinates and elevations into physical markers on the ground.',
    difficulty: 'easy'
  },
  {
    domain: 'Areas of Practice',
    question: 'Subdivision design and platting requires knowledge of:',
    options: ['Only surveying techniques', 'Local zoning regulations, utility requirements, drainage, access, and surveying standards', 'Only deed descriptions', 'Only GPS technology'],
    correctAnswer: 1,
    explanation: 'Subdivision design requires comprehensive knowledge of local zoning and land use regulations, utility availability, drainage design, access requirements, environmental constraints, surveying standards, recording requirements, and engineering design principles to create buildable, compliant lots.',
    difficulty: 'medium'
  },
  {
    domain: 'Areas of Practice',
    question: 'A geodetic survey differs from a plane survey in that it:',
    options: ['Uses only compasses and chains', 'Accounts for the curvature of the Earth', 'Is less accurate than plane surveying', 'Can only be performed by the federal government'],
    correctAnswer: 1,
    explanation: 'Geodetic surveys account for the curvature of the Earth and use the ellipsoid or geoid as the reference surface. They are necessary for surveys covering large areas where Earth\'s curvature significantly affects measurements. Plane surveys assume a flat surface, which is acceptable for smaller areas.',
    difficulty: 'easy'
  },
  {
    domain: 'Areas of Practice',
    question: 'Hydrographic surveying measures:',
    options: ['Only water surface elevations', 'Water depths, bottom topography, and shoreline features', 'Only water quality parameters', 'Only tidal fluctuations'],
    correctAnswer: 1,
    explanation: 'Hydrographic surveying measures and maps water depths (bathymetry), bottom topography, shoreline locations, and underwater features for purposes such as navigation, dredging, flood studies, and engineering design. It uses technologies including echo sounders, multibeam sonar, and GPS positioning.',
    difficulty: 'medium'
  },
  {
    domain: 'Areas of Practice',
    question: 'Mining surveys are performed to:',
    options: ['Only locate mineral deposits', 'Control and document underground and surface mining operations', 'Only calculate ore reserves', 'Only comply with environmental regulations'],
    correctAnswer: 1,
    explanation: 'Mining surveys control and document all phases of mining operations including locating mineral claims, establishing boundary and property lines, guiding tunnel and shaft construction, monitoring ground subsidence, calculating volumes, and ensuring compliance with safety and regulatory requirements.',
    difficulty: 'medium'
  },
  {
    domain: 'Areas of Practice',
    question: 'Photogrammetric surveys derive measurements from:',
    options: ['GPS observations only', 'Aerial or terrestrial photographs', 'Ground-penetrating radar', 'Seismic data'],
    correctAnswer: 1,
    explanation: 'Photogrammetry extracts measurements, maps, and 3D models from overlapping photographs taken from aerial platforms (aircraft, drones) or terrestrial positions. It uses the principles of stereoscopic vision to determine coordinates, distances, and elevations from the photographs.',
    difficulty: 'easy'
  },
  {
    domain: 'Areas of Practice',
    question: 'GIS applications in surveying include:',
    options: ['Only creating paper maps', 'Spatial analysis, data management, mapping, and decision support', 'Only GPS data collection', 'Only CAD drafting'],
    correctAnswer: 1,
    explanation: 'GIS (Geographic Information Systems) integrates survey data with other spatial and tabular data for analysis, visualization, and decision support. Surveying applications include parcel management, utility mapping, environmental analysis, transportation planning, and spatial data infrastructure.',
    difficulty: 'easy'
  },
  {
    domain: 'Areas of Practice',
    question: 'A route survey for a highway project typically includes:',
    options: ['Only the center line alignment', 'Center line alignment, cross sections, right-of-way, existing features, and control', 'Only the width of pavement', 'Only the speed limit determination'],
    correctAnswer: 1,
    explanation: 'Route surveys for highway projects include establishing the center line alignment, taking cross sections, locating right-of-way boundaries, mapping existing features (utilities, drainage, structures), establishing horizontal and vertical control, and documenting conditions necessary for design.',
    difficulty: 'medium'
  },
  {
    domain: 'Areas of Practice',
    question: 'Right-of-way surveys are performed to:',
    options: ['Only measure road widths', 'Establish and monumented right-of-way boundaries for transportation or utility corridors', 'Only locate traffic signs', 'Only determine speed limits'],
    correctAnswer: 1,
    explanation: 'Right-of-way surveys locate, establish, and monument the boundaries of transportation corridors (roads, highways, railroads) or utility easements. They involve research of deed records, existing right-of-way maps, plats, and field evidence to determine the exact limits of the public or utility right-of-way.',
    difficulty: 'medium'
  },
  {
    domain: 'Areas of Practice',
    question: 'Flood studies performed by surveyors typically involve:',
    options: ['Only measuring rainfall amounts', 'Cross-section surveys of waterways, floodplain mapping, and elevation determinations', 'Only reading FEMA maps', 'Only designing flood control structures'],
    correctAnswer: 1,
    explanation: 'Surveyor involvement in flood studies includes surveying stream cross sections for hydraulic modeling, establishing floodplain boundaries, determining base flood elevations, preparing elevation certificates, and providing data for FEMA Letters of Map Change (LOMC) applications.',
    difficulty: 'medium'
  },
  {
    domain: 'Areas of Practice',
    question: 'When providing expert testimony, a surveyor must:',
    options: ['Always agree with the attorney who hired them', 'Provide truthful, objective opinions based on professional analysis', 'Only testify about GPS technology', 'Refuse to acknowledge any uncertainty in their conclusions'],
    correctAnswer: 1,
    explanation: 'An expert witness must provide truthful, objective, and unbiased professional opinions based on their analysis of the evidence, regardless of which party retained them. The surveyor\'s duty is to the court and to the truth, not to advocate for either party.',
    difficulty: 'medium'
  },
  {
    domain: 'Areas of Practice',
    question: 'Land development surveying includes all of the following EXCEPT:',
    options: ['Subdivision layout and design', 'Construction staking', 'Zoning variance hearings as the attorney of record', 'As-built surveys'],
    correctAnswer: 2,
    explanation: 'Land development surveying encompasses boundary and topographic surveys, subdivision layout, construction staking, as-built surveys, and utility coordination. While surveyors may provide expert testimony at hearings, they cannot serve as the attorney of record—that requires a law license.',
    difficulty: 'medium'
  },
  {
    domain: 'Areas of Practice',
    question: 'An as-built survey is performed to:',
    options: ['Design a new building', 'Document the actual constructed position and dimensions of improvements', 'Appraise the property value', 'Determine soil bearing capacity'],
    correctAnswer: 1,
    explanation: 'An as-built survey documents the actual location, dimensions, and elevation of improvements as constructed, comparing them to the design plans. It verifies that construction conforms to approved plans and specifications, identifies any deviations, and provides a record of what was actually built.',
    difficulty: 'easy'
  },
  {
    domain: 'Areas of Practice',
    question: 'A condominium plat differs from a standard subdivision plat because it:',
    options: ['Does not require a boundary survey', 'Defines three-dimensional unit boundaries including vertical limits', 'Only shows parking spaces', 'Does not require a surveyor\'s seal'],
    correctAnswer: 1,
    explanation: 'Condominium plats define three-dimensional unit boundaries, including vertical limits (floor to ceiling and sometimes wall to wall), common elements, and limited common elements. Unlike standard subdivision plats that deal primarily with two-dimensional lot boundaries, condominium plats must represent the airspace owned by each unit.',
    difficulty: 'hard'
  },
  {
    domain: 'Areas of Practice',
    question: 'LIDAR technology in surveying is primarily used for:',
    options: ['Underground utility detection', 'Rapid collection of dense three-dimensional point cloud data', 'Chemical analysis of soil samples', 'Real-time GPS corrections'],
    correctAnswer: 1,
    explanation: 'LIDAR (Light Detection and Ranging) uses laser pulses to rapidly collect millions of three-dimensional points (point clouds) from airborne or terrestrial platforms. It is used for topographic mapping, floodplain mapping, corridor surveys, volumetric calculations, and creating digital terrain models over large areas.',
    difficulty: 'medium'
  },
  {
    domain: 'Areas of Practice',
    question: 'A control survey establishes:',
    options: ['Only property boundaries', 'A network of reference points with known positions and/or elevations', 'Only the highest point in the area', 'Only building setback lines'],
    correctAnswer: 1,
    explanation: 'A control survey establishes a network of horizontal and/or vertical reference points with precisely determined coordinates and/or elevations. These points serve as the framework for subsequent surveys, construction layout, and mapping in the project area.',
    difficulty: 'easy'
  },
  {
    domain: 'Areas of Practice',
    question: 'The primary purpose of a partition survey is to:',
    options: ['Map topographic features', 'Divide a single property into two or more parcels', 'Locate underground utilities', 'Measure building dimensions'],
    correctAnswer: 1,
    explanation: 'A partition survey divides a single parcel of land into two or more separate parcels. It requires boundary determination of the parent tract, design of the division line(s), preparation of a plat showing the new parcels, and compliance with local subdivision regulations and zoning requirements.',
    difficulty: 'easy'
  },
  {
    domain: 'Areas of Practice',
    question: 'UAV (drone) surveying is most commonly used for:',
    options: ['Underground mapping', 'Aerial photography and photogrammetric mapping of surface features', 'Deep-sea bathymetric surveys', 'GPS base station operations'],
    correctAnswer: 1,
    explanation: 'UAVs (drones) are commonly used for aerial photography, photogrammetric mapping, volumetric calculations, construction monitoring, corridor surveys, and creating orthophotos and digital surface models. They are cost-effective for small to medium areas and provide rapid data collection.',
    difficulty: 'easy'
  },
  {
    domain: 'Areas of Practice',
    question: 'A lot line adjustment differs from a subdivision because:',
    options: ['It creates new lots', 'It modifies boundaries between existing adjacent parcels without creating new lots', 'It requires rezoning', 'It can only be done by the government'],
    correctAnswer: 1,
    explanation: 'A lot line adjustment (boundary line adjustment) modifies the common boundary between two or more existing adjacent parcels without creating additional lots. Because no new lots are created, lot line adjustments typically have simpler regulatory requirements than full subdivisions.',
    difficulty: 'medium'
  },
  {
    domain: 'Areas of Practice',
    question: 'Utility surveys locate:',
    options: ['Only water mains', 'Existing underground and above-ground utility infrastructure', 'Only electrical transmission lines', 'Only fiber optic cables'],
    correctAnswer: 1,
    explanation: 'Utility surveys locate and map existing underground and above-ground utility infrastructure including water, sewer, gas, electric, telecommunications, storm drain, and other utilities. Methods include surface markings (one-call locates), ground-penetrating radar, electromagnetic locators, and exposure by excavation.',
    difficulty: 'easy'
  },
  {
    domain: 'Areas of Practice',
    question: 'Environmental surveying may include:',
    options: ['Only soil testing', 'Wetland delineation, endangered species habitat mapping, and environmental baseline surveys', 'Only air quality monitoring', 'Only noise level measurements'],
    correctAnswer: 1,
    explanation: 'Environmental surveying encompasses wetland delineation and mapping, environmental baseline surveys, habitat mapping, contamination site surveys, shoreline change analysis, and providing spatial data for environmental impact assessments and regulatory compliance.',
    difficulty: 'medium'
  },
  {
    domain: 'Areas of Practice',
    question: 'Precise leveling for establishing vertical control requires:',
    options: ['A handheld GPS receiver', 'A precise level with parallel plate micrometer and invar rods', 'A compass and tape', 'A single-frequency GPS receiver'],
    correctAnswer: 1,
    explanation: 'Precise leveling uses specialized equipment including a precise automatic level with parallel plate micrometer, invar (low thermal expansion) leveling rods, and strict observation procedures. This method achieves millimeter-level accuracy for establishing high-order vertical control points.',
    difficulty: 'hard'
  },
  {
    domain: 'Areas of Practice',
    question: 'The purpose of a Records of Survey (or Corner Record) is to:',
    options: ['Replace the deed description', 'Document survey monuments found, set, or reset and provide evidence for future surveyors', 'Serve as a title insurance policy', 'Establish property tax valuations'],
    correctAnswer: 1,
    explanation: 'Records of Survey (or Corner Records) document the monuments found, set, or reset during a survey. They provide essential evidence for future surveyors performing retracement surveys and help preserve the record of monument positions, conditions, and the basis for boundary decisions.',
    difficulty: 'medium'
  },
  {
    domain: 'Areas of Practice',
    question: 'A bathymetric survey measures:',
    options: ['Air temperature variations', 'Water depths and underwater topography', 'Soil composition', 'Wind speed and direction'],
    correctAnswer: 1,
    explanation: 'Bathymetric surveys measure water depths and map underwater topography using echo sounders (single-beam or multibeam sonar) combined with GPS positioning. Applications include navigation charting, dredging design, dam inspections, environmental studies, and underwater engineering.',
    difficulty: 'easy'
  },
  {
    domain: 'Areas of Practice',
    question: 'Terrestrial laser scanning (TLS) is particularly useful for:',
    options: ['Long-distance leveling runs', 'Detailed 3D documentation of structures, terrain, and complex features', 'Determining magnetic declination', 'Measuring gravity anomalies'],
    correctAnswer: 1,
    explanation: 'Terrestrial laser scanning captures dense, detailed 3D point clouds of structures, terrain, and complex features at close range. It is particularly useful for as-built documentation, historic preservation, deformation monitoring, industrial plant surveys, and accident reconstruction.',
    difficulty: 'medium'
  },
  {
    domain: 'Areas of Practice',
    question: 'A cadastral survey is primarily concerned with:',
    options: ['Topographic mapping', 'Establishing and defining property boundaries and land ownership', 'Seismic monitoring', 'Atmospheric measurements'],
    correctAnswer: 1,
    explanation: 'Cadastral surveys establish, define, and document property boundaries and land ownership. They form the basis for the land registration system and are essential for land title, taxation, and land administration. The PLSS is the primary cadastral system in the United States.',
    difficulty: 'medium'
  },
  {
    domain: 'Areas of Practice',
    question: 'When performing construction staking for a building, the surveyor typically establishes:',
    options: ['Only the front corner', 'Offset stakes, batter boards, and reference points at the required positions and elevations', 'Only the finished floor elevation', 'Only the property corners'],
    correctAnswer: 1,
    explanation: 'Building construction staking involves setting offset stakes and batter boards at calculated positions relative to the building corners, establishing reference elevations (such as finished floor elevation), and providing cut/fill information. Offset stakes are placed away from the excavation so they are not disturbed during construction.',
    difficulty: 'medium'
  },
  {
    domain: 'Areas of Practice',
    question: 'A monument preservation survey is performed to:',
    options: ['Locate historical battlefields', 'Document and protect survey monuments before construction or other disturbing activities', 'Survey national monuments and parks', 'Locate buried treasure'],
    correctAnswer: 1,
    explanation: 'Monument preservation surveys document the position and condition of survey monuments (such as section corners and property markers) before construction, road work, or other activities that might disturb or destroy them. This allows the monuments to be reset in their correct positions after the work is completed.',
    difficulty: 'medium'
  },
  {
    domain: 'Areas of Practice',
    question: 'Pipeline surveys include:',
    options: ['Only the diameter of the pipe', 'Route alignment, profile leveling, right-of-way determination, and as-built documentation', 'Only the material composition of the pipe', 'Only the fluid flow rate'],
    correctAnswer: 1,
    explanation: 'Pipeline surveys encompass route selection and alignment, profile leveling for grade design, right-of-way and easement determination, construction staking, as-built documentation, and periodic monitoring. They require coordination with regulatory agencies and utility owners.',
    difficulty: 'hard'
  },
  {
    domain: 'Areas of Practice',
    question: 'A site calibration in GNSS surveying is performed to:',
    options: ['Calibrate the satellite clocks', 'Transform GNSS coordinates to match the local project coordinate system', 'Adjust the antenna height', 'Calculate atmospheric conditions'],
    correctAnswer: 1,
    explanation: 'A site calibration (localization) transforms GNSS coordinates to the local project coordinate system by observing known control points and computing transformation parameters. This ensures that GNSS-derived positions match existing project control and coordinates.',
    difficulty: 'hard'
  },
  {
    domain: 'Areas of Practice',
    question: 'A survey for a planned unit development (PUD) typically requires:',
    options: ['Only a boundary survey', 'Boundary survey, topographic survey, utility location, and coordination with the development plan', 'Only a topographic survey', 'Only GPS control points'],
    correctAnswer: 1,
    explanation: 'PUD surveys are comprehensive, typically requiring boundary determination, detailed topographic mapping, utility location, drainage analysis, and close coordination with architects, engineers, and planners to ensure the development plan complies with zoning regulations and site conditions.',
    difficulty: 'hard'
  },
  {
    domain: 'Areas of Practice',
    question: 'Deformation monitoring surveys are used to:',
    options: ['Create subdivision plats', 'Detect and measure movement or changes in structures, slopes, or geological features over time', 'Locate property boundaries', 'Design new buildings'],
    correctAnswer: 1,
    explanation: 'Deformation monitoring surveys detect and measure small movements or changes in structures (bridges, dams, buildings), slopes, tunnels, or geological features over time. They use precise measurement techniques and repeated observations to identify trends that may indicate structural problems or safety hazards.',
    difficulty: 'hard'
  },
  {
    domain: 'Areas of Practice',
    question: 'A surveyor preparing an exhibit for a condemnation proceeding should include:',
    options: ['Only a rough sketch', 'A detailed survey showing the property being acquired, remaining property, and the impact of the taking', 'Only the total acreage', 'Only the fair market value'],
    correctAnswer: 1,
    explanation: 'Condemnation exhibits require a detailed survey showing the boundaries of the property being acquired, any temporary or permanent easements, the remaining property after the taking, and relevant features that illustrate the impact of the acquisition. The exhibit supports the valuation process and legal proceedings.',
    difficulty: 'hard'
  },
  {
    domain: 'Areas of Practice',
    question: 'Volumetric surveys are commonly performed for:',
    options: ['Only property boundary determination', 'Earthwork calculations, stockpile measurement, and cut/fill analysis', 'Only building height measurement', 'Only stream flow measurement'],
    correctAnswer: 1,
    explanation: 'Volumetric surveys calculate the volume of material in stockpiles, excavations, and earthwork operations. Methods include cross-section analysis, digital terrain modeling, and comparison of pre- and post-construction surfaces. They are essential for payment verification, material management, and project monitoring.',
    difficulty: 'medium'
  },
  {
    domain: 'Areas of Practice',
    question: 'The difference between a preliminary plat and a final plat is that:',
    options: ['They are the same document', 'The preliminary shows the proposed layout for review, while the final is the recorded legal document', 'The preliminary is more detailed than the final', 'The final plat does not require surveyor certification'],
    correctAnswer: 1,
    explanation: 'A preliminary plat is a draft showing the proposed subdivision layout submitted for governmental review and approval. The final plat is the official document prepared after all conditions are met, which is recorded in the public records and creates the legal lots, streets, and easements.',
    difficulty: 'medium'
  },

  // ===== ADDITIONAL LEGAL PRINCIPLES =====
  {
    domain: 'Legal Principles',
    question: 'A covenant running with the land differs from a personal covenant because it:',
    options: ['Expires after 10 years', 'Binds subsequent owners of the property, not just the original parties', 'Only applies to government land', 'Cannot be enforced in court'],
    correctAnswer: 1,
    explanation: 'A covenant running with the land "runs" with the property and binds all subsequent owners, not just the original contracting parties. For a covenant to run with the land, it must touch and concern the land, the original parties must have intended it to bind successors, and there must be privity of estate.',
    difficulty: 'hard'
  },
  {
    domain: 'Legal Principles',
    question: 'When a deed references a recorded plat, the dimensions shown on the plat become part of the:',
    options: ['Surveyor\'s field notes only', 'Legal description by incorporation by reference', 'Tax records only', 'Title insurance policy only'],
    correctAnswer: 1,
    explanation: 'When a deed references a recorded plat (e.g., "Lot 5, Block 2, Smith Subdivision, as recorded in Plat Book 10, Page 25"), the plat and all its dimensions, easements, and other information are incorporated by reference into the deed and become part of the legal description.',
    difficulty: 'medium'
  },
  {
    domain: 'Legal Principles',
    question: 'The "junior-senior" principle applies when:',
    options: ['Two surveys are performed at different times', 'A common grantor makes successive conveyances from the same parent tract', 'A surveyor has less experience than another', 'A deed is older than 50 years'],
    correctAnswer: 1,
    explanation: 'The junior-senior principle applies when a grantor makes successive conveyances from the same parent tract. The first (senior) conveyance has priority and receives its full entitlement. The second (junior) conveyance receives only what remains. Any surplus or deficit falls on the junior parcel.',
    difficulty: 'medium'
  },
  {
    domain: 'Legal Principles',
    question: 'An encroachment is:',
    options: ['A legal right to use another\'s property', 'An unauthorized intrusion of an improvement across a boundary line', 'A type of easement', 'A government taking of private land'],
    correctAnswer: 1,
    explanation: 'An encroachment occurs when a building, fence, driveway, or other improvement extends across a property boundary line without authorization. Encroachments can create legal disputes and may ripen into prescriptive rights if allowed to continue for the statutory period.',
    difficulty: 'easy'
  },
  {
    domain: 'Legal Principles',
    question: 'In a metes and bounds description, the area of a rectangular parcel described as 660 feet by 1,320 feet is:',
    options: ['10 acres', '20 acres', '40 acres', '80 acres'],
    correctAnswer: 1,
    explanation: 'Area = 660 × 1,320 = 871,200 square feet. Converting to acres: 871,200 ÷ 43,560 = 20 acres. This is equivalent to a half-quarter section (N½ of the NE¼ of a section, for example).',
    difficulty: 'medium'
  },

  // ===== ADDITIONAL PROFESSIONAL SURVEY PRACTICES =====
  {
    domain: 'Professional Survey Practices',
    question: 'A surveyor who is licensed in State A but not State B may perform a survey in State B if:',
    options: ['The client is based in State A', 'They obtain proper licensure or temporary practice permission in State B', 'The survey is within 10 miles of the State A border', 'They have more than 20 years of experience'],
    correctAnswer: 1,
    explanation: 'Surveying licensure is state-specific. A surveyor must be licensed in each state where they practice, unless the state offers reciprocity, comity, or temporary practice provisions. Practicing without a license is a violation of state law and subjects the surveyor to civil and criminal penalties.',
    difficulty: 'easy'
  },
  {
    domain: 'Professional Survey Practices',
    question: 'When a surveyor identifies a potential encroachment during a boundary survey, they should:',
    options: ['Ignore it unless the client asks', 'Document and report it in the survey deliverables', 'Remove the encroaching structure', 'Contact the encroaching property owner directly'],
    correctAnswer: 1,
    explanation: 'The surveyor\'s duty is to identify, locate, and report any apparent encroachments observed during the survey. This information should be shown on the survey plat and discussed with the client. The surveyor should not attempt to resolve the encroachment dispute or take physical action.',
    difficulty: 'easy'
  },
  {
    domain: 'Professional Survey Practices',
    question: 'Redundant measurements in surveying serve to:',
    options: ['Increase the cost of the project', 'Detect blunders, improve accuracy, and provide statistical measures of precision', 'Slow down field operations', 'Satisfy insurance requirements only'],
    correctAnswer: 1,
    explanation: 'Redundant (extra) measurements serve critical quality control functions: they help detect blunders, enable statistical analysis of measurement quality, provide checks on computations, and improve the overall accuracy of the final results through least squares adjustment or other methods.',
    difficulty: 'medium'
  },
  {
    domain: 'Professional Survey Practices',
    question: 'A surveyor\'s opinion of boundary location is considered:',
    options: ['The final legal determination of the boundary', 'A professional opinion that may be challenged in court', 'Binding on all parties', 'Only valid for 5 years'],
    correctAnswer: 1,
    explanation: 'A surveyor\'s boundary determination is a professional opinion based on research, evidence, and judgment—not a final legal determination. Only a court of competent jurisdiction can make a binding determination of a disputed boundary. Surveyors provide evidence and expert opinions to support that process.',
    difficulty: 'medium'
  },
  {
    domain: 'Professional Survey Practices',
    question: 'The ethical obligation of a surveyor when asked to perform work that appears to be intended to defraud another party is to:',
    options: ['Complete the work as requested by the client', 'Decline the engagement and report the situation if required', 'Charge a higher fee for the additional risk', 'Complete the work but add a disclaimer'],
    correctAnswer: 1,
    explanation: 'A surveyor must refuse to participate in activities that are fraudulent, dishonest, or deceptive. If the surveyor suspects fraud, they should decline the engagement and may have an obligation to report the situation to the licensing board or other appropriate authority.',
    difficulty: 'hard'
  },
  {
    domain: 'Professional Survey Practices',
    question: 'The difference between accuracy and precision in surveying is:',
    options: ['They are the same thing', 'Accuracy refers to closeness to the true value; precision refers to the consistency of repeated measurements', 'Precision is always better than accuracy', 'Accuracy depends on equipment cost only'],
    correctAnswer: 1,
    explanation: 'Accuracy describes how close a measurement is to the true value, while precision describes how closely repeated measurements agree with each other. A survey can be precise (consistent) but inaccurate (consistently off from the true value), as occurs with uncorrected systematic errors.',
    difficulty: 'easy'
  },
  {
    domain: 'Professional Survey Practices',
    question: 'When a surveyor discovers that a previously set monument is in the wrong location, the proper action is to:',
    options: ['Simply move the monument', 'Document the finding, set a monument in the correct position, and report to affected parties', 'Leave the incorrect monument and set a new one nearby', 'Destroy the incorrect monument without documentation'],
    correctAnswer: 1,
    explanation: 'The surveyor should thoroughly document the finding, determine the correct monument position based on evidence, set a proper monument in the correct position, and report the situation to affected parties. The incorrect monument should be referenced or addressed per state requirements.',
    difficulty: 'hard'
  },
  {
    domain: 'Professional Survey Practices',
    question: 'A surveyor\'s duty when testifying in a deposition differs from trial testimony in that depositions:',
    options: ['Do not require truthful answers', 'Are conducted under oath but outside the courtroom, typically in an attorney\'s office', 'Are only for criminal cases', 'Do not allow the opposing attorney to ask questions'],
    correctAnswer: 1,
    explanation: 'Depositions are sworn testimony given outside the courtroom, typically in an attorney\'s office. The witness is under oath and subject to cross-examination by opposing counsel. Deposition testimony can be used at trial, so the surveyor must be equally careful and truthful in both settings.',
    difficulty: 'hard'
  },

  // ===== ADDITIONAL STANDARDS AND SPECIFICATIONS =====
  {
    domain: 'Standards and Specifications',
    question: 'The 2026 ALTA/NSPS standards require that the survey plat show the relationship of the property to:',
    options: ['The nearest school', 'Adjoining properties (record owners if ascertainable)', 'The nearest fire station', 'The county seat'],
    correctAnswer: 1,
    explanation: 'The 2026 ALTA/NSPS standards require showing the names of adjoining property owners (if reasonably ascertainable from public records) and the relationship of the subject property to adjoining parcels. This helps the title company identify potential boundary issues and encroachments.',
    difficulty: 'medium'
  },
  {
    domain: 'Standards and Specifications',
    question: 'According to ALTA/NSPS standards, the basis of bearings must be:',
    options: ['Assumed north in all cases', 'Disclosed on the plat with reference to its source', 'Always magnetic north', 'Always true north from GPS'],
    correctAnswer: 1,
    explanation: 'The 2026 ALTA/NSPS standards require that the basis of bearings be clearly identified on the survey plat and its source disclosed. This may be geodetic north, grid north (state plane), record bearings, or other source, but it must be clearly stated so others can properly interpret the survey.',
    difficulty: 'medium'
  },
  {
    domain: 'Standards and Specifications',
    question: 'FEMA requires that Elevation Certificates include the elevation of the:',
    options: ['Only the roof peak', 'Lowest floor, adjacent grade, and lowest adjacent grade of the building', 'Only the front door threshold', 'Only the basement floor'],
    correctAnswer: 1,
    explanation: 'The FEMA Elevation Certificate requires multiple elevation measurements including the lowest floor (including basement), the top of the bottom floor, the lowest adjacent grade (LAG), the highest adjacent grade (HAG), and other critical elevations that determine the building\'s flood risk and insurance rating.',
    difficulty: 'hard'
  },
  {
    domain: 'Standards and Specifications',
    question: 'For a Second Order Class I horizontal control survey, the required relative accuracy is:',
    options: ['1:10,000', '1:50,000', '1:100,000', '1:1,000,000'],
    correctAnswer: 1,
    explanation: 'FGCS standards require Second Order Class I horizontal control to achieve a minimum relative accuracy of 1:50,000. First Order requires 1:100,000, Second Order Class II requires 1:20,000, and Third Order Class I requires 1:10,000. These standards govern the precision of control networks.',
    difficulty: 'hard'
  },
  {
    domain: 'Standards and Specifications',
    question: 'State minimum technical standards typically require that boundary survey plats include a statement of:',
    options: ['The client\'s purchase price', 'The basis of bearings and the source of the bearings', 'The surveyor\'s hourly rate', 'The client\'s mortgage amount'],
    correctAnswer: 1,
    explanation: 'Most state minimum technical standards require a clear statement of the basis of bearings on survey plats, identifying whether bearings are based on geodetic north, grid north, magnetic north, record bearings, or another source. This is essential for future surveyors to properly interpret and retrace the survey.',
    difficulty: 'easy'
  },

  // ===== ADDITIONAL BUSINESS PRACTICES =====
  {
    domain: 'Business Practices',
    question: 'A change order in a survey contract is used when:',
    options: ['The surveyor wants to increase the fee without justification', 'The scope of work changes from the original agreement', 'The client is unhappy with the results', 'The weather delays field work'],
    correctAnswer: 1,
    explanation: 'A change order formally documents modifications to the original scope of work, timeline, or fee. It should be agreed upon by both parties before the additional work is performed. Change orders protect both the surveyor and client by clearly defining any changes to the original agreement.',
    difficulty: 'medium'
  },
  {
    domain: 'Business Practices',
    question: 'The primary benefit of carrying umbrella insurance for a survey firm is:',
    options: ['It replaces E&O insurance', 'It provides additional liability coverage beyond the limits of underlying policies', 'It covers equipment theft', 'It is required by federal law'],
    correctAnswer: 1,
    explanation: 'Umbrella insurance provides additional liability coverage that kicks in when the limits of underlying policies (general liability, auto, E&O) are exhausted. It offers broader protection against catastrophic claims that exceed primary policy limits.',
    difficulty: 'hard'
  },
  {
    domain: 'Business Practices',
    question: 'Employee development in a survey firm should include:',
    options: ['Only on-the-job training', 'Formal education, mentoring, cross-training, and opportunities for professional licensure', 'Only equipment manufacturer training', 'No training budget since employees should arrive fully qualified'],
    correctAnswer: 1,
    explanation: 'Comprehensive employee development includes formal education support, mentoring programs, cross-training in different aspects of surveying, encouraging professional licensure, and providing opportunities for leadership development. Investing in employee development improves retention and firm capabilities.',
    difficulty: 'medium'
  },
  {
    domain: 'Business Practices',
    question: 'When calculating the break-even point for a survey project, the firm should consider:',
    options: ['Only direct labor costs', 'Direct costs, overhead allocation, equipment costs, and all project-related expenses', 'Only the equipment purchase price', 'Only the client\'s budget'],
    correctAnswer: 1,
    explanation: 'Break-even analysis must account for all project costs: direct labor, overhead allocation, equipment usage, materials, subcontractor fees, travel, and any other project-related expenses. Understanding the break-even point helps the firm set profitable fees and manage costs.',
    difficulty: 'hard'
  },
  {
    domain: 'Business Practices',
    question: 'A non-compete agreement for survey employees typically:',
    options: ['Is always unenforceable', 'Restricts the employee from competing with the firm within a certain geographic area and time period', 'Prevents the employee from ever working in surveying again', 'Only applies to firm owners'],
    correctAnswer: 1,
    explanation: 'Non-compete agreements restrict an employee from competing with the firm within a defined geographic area for a specified time period after leaving employment. Enforceability varies by state, and the restrictions must be reasonable in scope, duration, and geographic area to be upheld by courts.',
    difficulty: 'hard'
  },

  // ===== ADDITIONAL AREAS OF PRACTICE =====
  {
    domain: 'Areas of Practice',
    question: 'A topographic survey contour interval should be selected based on:',
    options: ['Only the surveyor\'s preference', 'The terrain, purpose of the survey, and the scale of the final map', 'The client\'s budget only', 'The number of field crew members'],
    correctAnswer: 1,
    explanation: 'Contour interval selection depends on the terrain (flat vs. hilly), the purpose (engineering design requires smaller intervals than general planning), map scale, and project specifications. Typical intervals range from 0.5 feet for flat sites with engineering design needs to 5 or 10 feet for steep terrain.',
    difficulty: 'medium'
  },
  {
    domain: 'Areas of Practice',
    question: 'Ground-penetrating radar (GPR) is used in surveying to:',
    options: ['Measure distances between surface points', 'Detect and locate subsurface features such as utilities, voids, and buried objects', 'Calculate GPS satellite orbits', 'Measure atmospheric pressure'],
    correctAnswer: 1,
    explanation: 'Ground-penetrating radar transmits electromagnetic pulses into the ground and records reflections from subsurface features. It is used to locate utilities, detect voids, find buried objects, estimate pavement thickness, and identify geological layers. Effectiveness varies with soil conditions.',
    difficulty: 'medium'
  },

  // ===== ADDITIONAL LEGAL PRINCIPLES (~30 questions) =====
  {
    domain: 'Legal Principles',
    question: 'When conflicting calls exist in a deed between a call for a natural monument and a call for an artificial monument, which generally controls?',
    options: ['The artificial monument', 'The natural monument', 'Whichever was established most recently', 'Neither; the area stated in the deed controls'],
    correctAnswer: 1,
    explanation: 'In the hierarchy of deed calls, natural monuments (rivers, ridges, trees referenced at the time of the original conveyance) rank higher than artificial monuments (iron pins, stakes, fences). Natural monuments are considered more reliable indicators of the original grantor\'s intent because they are less susceptible to displacement or error.',
    difficulty: 'easy'
  },
  {
    domain: 'Legal Principles',
    question: 'A deed that calls for "the center of the road" as a boundary locates the boundary at:',
    options: ['The edge of the paved surface', 'The center line of the road right-of-way', 'The nearest fence line', 'The center of the traveled surface at the time of conveyance'],
    correctAnswer: 1,
    explanation: 'A call for "the center of the road" is generally interpreted as the center line of the road right-of-way, not just the center of the pavement. This follows the legal principle that a conveyance bounded by a road typically conveys title to the center of the right-of-way (ad medium filum viae) unless a contrary intent is clearly expressed.',
    difficulty: 'medium'
  },
  {
    domain: 'Legal Principles',
    question: 'The doctrine of "ad medium filum aquae" means that a riparian owner on a non-navigable stream owns:',
    options: ['The entire streambed', 'To the thread (center) of the stream', 'Only to the water\'s edge', 'No portion of the streambed'],
    correctAnswer: 1,
    explanation: 'Ad medium filum aquae ("to the middle thread of the water") grants the riparian owner title to the center of a non-navigable stream. Each landowner on opposite sides of the stream owns to the center line. This doctrine does not apply to navigable waters, where the state typically holds title to the streambed.',
    difficulty: 'hard'
  },
  {
    domain: 'Legal Principles',
    question: 'Under a pure "race" recording statute, which party prevails?',
    options: ['The party who purchased first', 'The party who records first, regardless of notice', 'The party who paid the highest price', 'The party with the oldest deed'],
    correctAnswer: 1,
    explanation: 'Under a pure race statute, the first party to record prevails, regardless of whether they had knowledge (notice) of a prior unrecorded interest. Only a few states use pure race statutes. The recording race encourages prompt recording of instruments and provides certainty in the public records.',
    difficulty: 'medium'
  },
  {
    domain: 'Legal Principles',
    question: 'Under a pure "notice" recording statute, a subsequent bona fide purchaser prevails over a prior grantee if:',
    options: ['The subsequent purchaser records first', 'The subsequent purchaser had no notice of the prior conveyance at the time of purchase', 'The subsequent purchaser paid a higher price', 'The prior conveyance was by quitclaim deed'],
    correctAnswer: 1,
    explanation: 'Under a pure notice statute, a subsequent bona fide purchaser (one who pays value without notice of the prior interest) prevails over the prior grantee, even if the subsequent purchaser does not record first. The focus is entirely on the buyer\'s lack of notice at the time of the transaction.',
    difficulty: 'medium'
  },
  {
    domain: 'Legal Principles',
    question: 'Inquiry notice arises when:',
    options: ['A document is properly recorded', 'Circumstances exist that would prompt a reasonable person to investigate further', 'A buyer personally knows of a prior claim', 'A title search reveals a recorded lien'],
    correctAnswer: 1,
    explanation: 'Inquiry notice is imputed to a buyer when facts or circumstances exist (such as a third party in possession of the property) that would cause a reasonable, prudent person to make further inquiry. If such inquiry would have revealed the prior interest, the buyer is charged with notice of it even if no inquiry was made.',
    difficulty: 'hard'
  },
  {
    domain: 'Legal Principles',
    question: 'A "wild deed" in a chain of title is one that:',
    options: ['Conveys property in a wildlife preserve', 'Is recorded but not connected to any recorded chain of title', 'Contains legal descriptions using only metes and bounds', 'Was executed outdoors'],
    correctAnswer: 1,
    explanation: 'A wild deed is a recorded instrument that falls outside the chain of title because a prior instrument in the chain was never recorded. Since a title searcher following the grantor-grantee index would not discover it, a wild deed generally does not provide constructive notice to subsequent purchasers.',
    difficulty: 'hard'
  },
  {
    domain: 'Legal Principles',
    question: 'The "shelter rule" in recording acts provides that:',
    options: ['All deeds must be recorded within 30 days', 'A person who acquires property from a bona fide purchaser is sheltered by the BFP\'s protection', 'Only recorded deeds are valid', 'Quitclaim deeds are not protected by recording acts'],
    correctAnswer: 1,
    explanation: 'The shelter rule extends the protection of a bona fide purchaser (BFP) to subsequent transferees from the BFP, even if the subsequent transferee had notice of the prior interest. This prevents a prior claimant from defeating the BFP\'s title by waiting and purchasing from the BFP\'s grantees.',
    difficulty: 'hard'
  },
  {
    domain: 'Legal Principles',
    question: 'Boundary by agreement requires:',
    options: ['A court decree', 'An uncertain or disputed boundary, an agreement between the owners, and subsequent acceptance', 'A formal survey by a licensed surveyor', 'Filing with the county recorder'],
    correctAnswer: 1,
    explanation: 'Boundary by agreement requires: (1) an uncertain or disputed boundary, (2) an express or implied agreement between the adjoining owners establishing a boundary line, and (3) subsequent acceptance and acquiescence in the agreed line. The agreement may be oral in many jurisdictions despite the Statute of Frauds.',
    difficulty: 'hard'
  },
  {
    domain: 'Legal Principles',
    question: 'The "footsteps doctrine" requires a retracing surveyor to:',
    options: ['Physically walk the entire property boundary', 'Follow the methods and evidence of the original surveyor', 'Use only the same equipment as the original surveyor', 'Survey only during the same season as the original survey'],
    correctAnswer: 1,
    explanation: 'The footsteps doctrine requires a retracing surveyor to follow in the footsteps of the original surveyor by locating original monuments, interpreting the original evidence, and re-establishing the boundaries as originally set. The retracing surveyor has no authority to establish new boundaries or "correct" the original survey.',
    difficulty: 'medium'
  },
  {
    domain: 'Legal Principles',
    question: 'An easement created by express grant is:',
    options: ['Always limited to 20 years', 'Created by a written instrument and typically recorded', 'Only valid between family members', 'Created automatically when a parcel is subdivided'],
    correctAnswer: 1,
    explanation: 'An easement by express grant is created by a written deed or other instrument signed by the grantor and typically recorded in the public records. It explicitly identifies the easement\'s location, dimensions, and permitted use. Express grants satisfy the Statute of Frauds requirement for conveyances of interests in real property.',
    difficulty: 'easy'
  },
  {
    domain: 'Legal Principles',
    question: 'The legal principle of "stare decisis" in boundary law means:',
    options: ['The survey must be performed while standing still', 'Courts will follow precedent established in prior similar cases', 'Only state courts can decide boundary disputes', 'The boundary is determined by the stars'],
    correctAnswer: 1,
    explanation: 'Stare decisis ("to stand by things decided") means that courts will follow the legal principles established in prior appellate court decisions when deciding similar cases. This provides predictability in boundary law and ensures consistent application of legal principles across similar boundary disputes.',
    difficulty: 'medium'
  },
  {
    domain: 'Legal Principles',
    question: 'When a deed describes a parcel as bounded by a non-navigable lake, the boundary typically extends to:',
    options: ['The ordinary high water mark only', 'The center of the lake', 'The low water mark', 'The nearest shoreline feature'],
    correctAnswer: 1,
    explanation: 'For non-navigable lakes, the boundary of abutting parcels typically extends to the center of the lake, following principles similar to non-navigable streams (ad medium filum aquae). For navigable lakes, the boundary usually extends only to the ordinary high water mark, with the state owning the bed below.',
    difficulty: 'hard'
  },
  {
    domain: 'Legal Principles',
    question: 'The "public trust doctrine" holds that:',
    options: ['All survey records must be kept by the government', 'The state holds navigable waters and submerged lands in trust for public use', 'All surveys must be reviewed by a public official', 'Only government surveyors can survey public lands'],
    correctAnswer: 1,
    explanation: 'The public trust doctrine holds that the state holds title to the beds of navigable waters in trust for the public for purposes of navigation, fishing, and commerce. This doctrine affects boundary determinations along navigable waters because the state\'s ownership extends to the ordinary high water mark.',
    difficulty: 'hard'
  },
  {
    domain: 'Legal Principles',
    question: 'A "tacking" of successive periods of adverse possession means:',
    options: ['Adding physical attachments to a fence line', 'Combining consecutive periods of possession by successive occupants to meet the statutory period', 'The surveyor tacks survey monuments to trees', 'Stapling documents to a deed'],
    correctAnswer: 1,
    explanation: 'Tacking allows successive adverse possessors who are in privity (a transfer of possession) to combine their periods of possession to satisfy the statutory period. For example, if the statute requires 10 years and A adversely possesses for 6 years then conveys to B who possesses for 4 years, B may tack A\'s period.',
    difficulty: 'hard'
  },
  {
    domain: 'Legal Principles',
    question: 'A deed that conveys property "to the grantor\'s heirs" creates:',
    options: ['A fee simple absolute', 'A life estate', 'A fee tail', 'An estate at will'],
    correctAnswer: 0,
    explanation: 'Under the modern interpretation (and the Rule in Shelley\'s Case in many jurisdictions), a conveyance "to A and the heirs of A" or "to A\'s heirs" creates a fee simple absolute, granting the fullest possible estate in the land with no conditions or limitations on duration or inheritance.',
    difficulty: 'medium'
  },
  {
    domain: 'Legal Principles',
    question: 'When a surveyor discovers evidence suggesting adverse possession has affected a boundary, the surveyor should:',
    options: ['Ignore it and follow only the record description', 'Note the evidence in the survey and advise the client to seek legal counsel', 'Move the boundary to match the adverse possession claim', 'File a quiet title action on behalf of the client'],
    correctAnswer: 1,
    explanation: 'A surveyor cannot make legal determinations about adverse possession claims—that is the role of the courts. However, the surveyor has a duty to observe and report evidence of potential adverse possession (such as long-standing fences, improvements, or occupation beyond record lines) and advise the client to consult an attorney.',
    difficulty: 'medium'
  },
  {
    domain: 'Legal Principles',
    question: 'The "shelter rule" in recording law provides that:',
    options: ['All recorded documents are presumed valid', 'A person who acquires property from a bona fide purchaser receives the same protection, even with notice of a prior unrecorded interest', 'Sheltered properties are exempt from property taxes', 'Only sheltered deeds are valid against creditors'],
    correctAnswer: 1,
    explanation: 'The shelter rule (also called the umbrella doctrine) protects transferees of bona fide purchasers. If B is a BFP who takes free of an unrecorded interest, B can transfer to C, and C receives the same protection even if C has actual knowledge of the prior unrecorded interest. This prevents the prior interest holder from simply waiting to assert rights against downstream purchasers.',
    difficulty: 'hard'
  },
  {
    domain: 'Legal Principles',
    question: 'An "encroachment" in boundary law is:',
    options: ['A legal description error', 'An unauthorized physical intrusion of a structure or improvement onto adjacent property', 'A type of easement', 'A method of adverse possession'],
    correctAnswer: 1,
    explanation: 'An encroachment occurs when a building, fence, driveway, or other improvement extends beyond the owner\'s property line onto adjacent land without authorization. Encroachments can lead to disputes, cloud title, and may become the basis for adverse possession or prescriptive easement claims if left unaddressed.',
    difficulty: 'easy'
  },
  {
    domain: 'Legal Principles',
    question: 'The legal concept of "laches" may bar a boundary claim when:',
    options: ['The claim is filed within the statute of limitations', 'The claimant unreasonably delayed asserting the claim, causing prejudice to the other party', 'The claim involves government land', 'The claim is supported by a current survey'],
    correctAnswer: 1,
    explanation: 'Laches is an equitable defense that bars a claim when the claimant unreasonably and inexcusably delayed asserting their rights, and the delay caused prejudice (harm) to the opposing party. Even if the statute of limitations has not expired, a court may deny relief based on laches.',
    difficulty: 'hard'
  },
  {
    domain: 'Legal Principles',
    question: 'A "color of title" claim in adverse possession means the claimant:',
    options: ['Has painted the property boundary markers', 'Possesses a document that appears to convey title but is defective', 'Holds a valid, recorded deed', 'Has permission from the true owner'],
    correctAnswer: 1,
    explanation: 'Color of title refers to a document (such as a deed) that appears to convey title but is defective in some way (e.g., executed by someone who did not own the property). In many states, a claim of adverse possession under color of title has advantages, such as a shorter statutory period or constructive possession of the entire parcel described.',
    difficulty: 'hard'
  },
  {
    domain: 'Legal Principles',
    question: 'When two deeds from a common grantor describe overlapping areas, the senior deed:',
    options: ['Is automatically voided', 'Takes priority for the area of overlap', 'Must be re-recorded', 'Shares the overlap equally with the junior deed'],
    correctAnswer: 1,
    explanation: 'Under the senior/junior rights principle, the first (senior) conveyance takes priority. Where two deeds from a common grantor describe overlapping areas, the senior grantee holds title to the overlap area. The junior grantee receives only the portion of the described parcel not already conveyed to the senior grantee.',
    difficulty: 'medium'
  },
  {
    domain: 'Legal Principles',
    question: 'A "dedication" of land for public use requires:',
    options: ['Only a verbal statement by the owner', 'An offer by the owner and acceptance by the public entity', 'Automatic transfer after 5 years of public use', 'A court order'],
    correctAnswer: 1,
    explanation: 'Dedication requires an intent by the owner to dedicate (offer) and acceptance by the public entity. Statutory dedication is accomplished by recording a plat showing streets and public areas. Common law dedication may be implied from the owner\'s acts. Acceptance may be express or implied by public use and maintenance.',
    difficulty: 'medium'
  },
  {
    domain: 'Legal Principles',
    question: 'The "proportionate measurement" method for restoring lost PLSS corners is based on the principle that:',
    options: ['All sections are exactly 640 acres', 'The original survey errors should be distributed proportionally among all the affected intervals', 'The newest survey controls', 'GPS coordinates always supersede original monuments'],
    correctAnswer: 1,
    explanation: 'Proportionate measurement distributes the difference between the record (original survey) distances and the measured distances among all the intervals in the line, proportional to the record distance of each interval. This method assumes the original surveyor\'s errors were systematic and evenly distributed.',
    difficulty: 'hard'
  },
  {
    domain: 'Legal Principles',
    question: 'A "life estate" in real property:',
    options: ['Lasts forever', 'Terminates upon the death of the life tenant', 'Can only be created by a court', 'Is the same as fee simple'],
    correctAnswer: 1,
    explanation: 'A life estate is an interest in real property that lasts for the lifetime of a specified person (the life tenant). Upon the life tenant\'s death, the property either reverts to the grantor (reversion) or passes to a designated remainder person (remainder). The life tenant cannot convey an interest greater than their own.',
    difficulty: 'easy'
  },
  {
    domain: 'Legal Principles',
    question: 'When the calls in a metes and bounds description do not mathematically close, but all monuments called for are found in place, the surveyor should:',
    options: ['Reject the description as invalid', 'Hold the monuments and adjust the courses to close', 'Ignore the monuments and use only the mathematical data', 'Resurvey using only GPS'],
    correctAnswer: 1,
    explanation: 'When found monuments conflict with mathematical closure, the monuments control because they represent the actual physical locations established by the original surveyor. The mathematical description (bearings and distances) is adjusted to fit the monuments, not the other way around. Monuments on the ground represent the best evidence of intent.',
    difficulty: 'medium'
  },
  {
    domain: 'Legal Principles',
    question: 'An "appurtenance" in real property law refers to:',
    options: ['A type of deed', 'A right or privilege that passes with the land to which it is attached', 'A defect in the chain of title', 'A court order regarding property boundaries'],
    correctAnswer: 1,
    explanation: 'An appurtenance is a right, privilege, or improvement that belongs to and passes with the transfer of land. Examples include easements appurtenant, water rights, and air rights. Appurtenances are transferred automatically with the conveyance of the dominant estate, even if not specifically mentioned in the deed.',
    difficulty: 'easy'
  },
  {
    domain: 'Legal Principles',
    question: 'The "extrinsic evidence" rule in deed interpretation allows:',
    options: ['Only the deed itself to be considered', 'Evidence outside the deed (such as surveys, plats, and testimony) to explain ambiguities', 'Any party to rewrite the deed', 'Courts to ignore the deed entirely'],
    correctAnswer: 1,
    explanation: 'When a deed description contains a latent ambiguity (one not apparent on the face of the instrument but discovered when applying the description to the ground), extrinsic evidence such as surveys, plats, testimony, and surrounding circumstances may be admitted to determine the grantor\'s intent.',
    difficulty: 'hard'
  },
  {
    domain: 'Legal Principles',
    question: 'A "patent ambiguity" in a deed is one that:',
    options: ['Is hidden and can only be discovered by a surveyor', 'Is apparent on the face of the instrument itself', 'Only exists in government patents', 'Requires DNA evidence to resolve'],
    correctAnswer: 1,
    explanation: 'A patent ambiguity is one that is apparent from reading the deed itself, such as a description that is internally inconsistent or contradictory. Courts generally do not admit extrinsic (parol) evidence to resolve patent ambiguities, unlike latent ambiguities which are discovered only when the description is applied to the ground.',
    difficulty: 'medium'
  },
  {
    domain: 'Legal Principles',
    question: 'Under the doctrine of "agreed boundaries," once neighbors agree to a boundary line:',
    options: ['Either party may unilaterally change the line at any time', 'The line becomes binding after the agreed-upon conditions are met', 'The agreement is only valid for 5 years', 'A new survey automatically overrides the agreement'],
    correctAnswer: 1,
    explanation: 'Under the agreed boundary doctrine, when adjoining owners agree upon a boundary line (typically where the true line is uncertain or disputed), that agreement becomes binding upon both parties and their successors, provided the required conditions (which vary by jurisdiction) are satisfied, such as acceptance over time.',
    difficulty: 'hard'
  },

  // ===== ADDITIONAL PROFESSIONAL SURVEY PRACTICES (~36 questions) =====
  {
    domain: 'Professional Survey Practices',
    question: 'The legal doctrine of "privity" in surveyor liability means:',
    options: ['Only the client can sue the surveyor', 'Third parties who foreseeably rely on the survey may also have a cause of action against the surveyor', 'The surveyor is immune from all lawsuits', 'Only government agencies can bring claims'],
    correctAnswer: 1,
    explanation: 'While traditional privity required a direct contractual relationship to sue, many jurisdictions have expanded liability so that foreseeable third-party users of the survey (such as subsequent purchasers or lenders) may bring claims against the surveyor. This expansion reflects the reality that surveys are often relied upon by parties beyond the original client.',
    difficulty: 'hard'
  },
  {
    domain: 'Professional Survey Practices',
    question: 'Professional liability (malpractice) for a surveyor requires proof of:',
    options: ['Intent to cause harm', 'A duty of care, breach of that duty, causation, and damages', 'Only that an error was made', 'Criminal conduct'],
    correctAnswer: 1,
    explanation: 'Professional negligence requires the plaintiff to prove four elements: (1) the surveyor owed a duty of care, (2) the surveyor breached that duty by failing to meet the standard of care, (3) the breach caused the harm (proximate cause), and (4) the plaintiff suffered actual damages as a result.',
    difficulty: 'medium'
  },
  {
    domain: 'Professional Survey Practices',
    question: 'When serving as an expert witness, a surveyor\'s primary duty is to:',
    options: ['Advocate for the party that retained them', 'Provide objective, truthful testimony based on professional analysis', 'Maximize the retaining attorney\'s case', 'Agree with the opposing surveyor to avoid conflict'],
    correctAnswer: 1,
    explanation: 'An expert witness surveyor\'s primary duty is to the court and to the truth. The surveyor must provide impartial, objective professional opinions based on their independent analysis. The surveyor should not act as an advocate for either party but rather as an independent expert assisting the court.',
    difficulty: 'easy'
  },
  {
    domain: 'Professional Survey Practices',
    question: 'A Daubert challenge to a surveyor\'s expert testimony evaluates whether:',
    options: ['The surveyor holds a valid license', 'The surveyor\'s methodology is scientifically valid and reliable', 'The surveyor\'s fees are reasonable', 'The surveyor has published peer-reviewed articles'],
    correctAnswer: 1,
    explanation: 'Under the Daubert standard (and its state equivalents), the court acts as a "gatekeeper" to ensure expert testimony is based on reliable methodology and relevant to the case. The court evaluates whether the expert\'s methods are testable, peer-reviewed, have known error rates, and are generally accepted.',
    difficulty: 'hard'
  },
  {
    domain: 'Professional Survey Practices',
    question: 'A survey plat should contain all of the following EXCEPT:',
    options: ['Surveyor\'s seal and signature', 'North arrow and scale', 'The surveyor\'s opinion of property value', 'Legal description and monuments found or set'],
    correctAnswer: 2,
    explanation: 'A survey plat must include the surveyor\'s seal and signature, north arrow, scale, legal description, monuments found and set, bearings and distances, adjoining property information, and other required elements. Property valuation is the domain of appraisers, not surveyors, and should not appear on a survey plat.',
    difficulty: 'easy'
  },
  {
    domain: 'Professional Survey Practices',
    question: 'When preparing a survey report, the surveyor should include:',
    options: ['Only the final coordinates', 'The purpose, methodology, findings, evidence evaluated, and professional opinions with supporting rationale', 'Only a CAD drawing', 'Only a list of equipment used'],
    correctAnswer: 1,
    explanation: 'A comprehensive survey report should describe the project purpose, scope, research performed, methodology, instruments used, control established, evidence found and evaluated, analysis performed, conclusions reached, and the basis for professional opinions. It serves as a permanent record of the surveyor\'s work.',
    difficulty: 'medium'
  },
  {
    domain: 'Professional Survey Practices',
    question: 'A surveyor who discovers a significant boundary discrepancy affecting a neighbor who is not the client should:',
    options: ['Ignore it since the neighbor is not the client', 'Move the boundary to favor the client', 'Inform the client of the discrepancy and recommend they consult with legal counsel before proceeding', 'Secretly notify the neighbor'],
    correctAnswer: 2,
    explanation: 'When a surveyor discovers a boundary discrepancy that affects adjacent property, the ethical obligation is to inform the client of the findings and recommend legal consultation. The surveyor should not suppress evidence, alter results, or independently contact third parties about the client\'s survey. The surveyor\'s role is to report objective findings and let the parties resolve disputes through proper legal channels.',
    difficulty: 'medium'
  },
  {
    domain: 'Professional Survey Practices',
    question: 'License reciprocity (comity) between states allows a surveyor to:',
    options: ['Practice in any state without restriction', 'Obtain a license in another state based on substantially equivalent qualifications', 'Ignore the other state\'s practice standards', 'Charge higher fees in the reciprocal state'],
    correctAnswer: 1,
    explanation: 'Reciprocity (comity) allows a surveyor licensed in one state to obtain a license in another state by demonstrating substantially equivalent education, experience, and examination requirements. Each state retains the right to set its own standards, and the applicant must meet the reciprocal state\'s requirements.',
    difficulty: 'medium'
  },
  {
    domain: 'Professional Survey Practices',
    question: 'Quality assurance (QA) in a survey firm refers to:',
    options: ['Checking only the final product', 'Systematic processes and policies to prevent errors and ensure consistent quality throughout all operations', 'Buying the most expensive equipment', 'Having all work reviewed by a single person'],
    correctAnswer: 1,
    explanation: 'Quality assurance encompasses the systematic processes, procedures, and policies that a firm implements to prevent errors and maintain consistent quality. QA is proactive and organization-wide, covering staff training, standard operating procedures, equipment calibration, and documentation requirements.',
    difficulty: 'medium'
  },
  {
    domain: 'Professional Survey Practices',
    question: 'Quality control (QC) in a survey project involves:',
    options: ['Only calibrating instruments', 'Specific checks, reviews, and verifications applied to project deliverables to identify and correct errors', 'Only reviewing the final plat', 'Delegating all checking to the field crew'],
    correctAnswer: 1,
    explanation: 'Quality control involves the specific checks and reviews performed on project work products (field data, calculations, drawings, reports) to verify accuracy and compliance with standards. QC is reactive—it detects and corrects errors. It includes independent checks, redundant measurements, and peer reviews.',
    difficulty: 'medium'
  },
  {
    domain: 'Professional Survey Practices',
    question: 'When a client requests a surveyor to move a boundary marker to a desired location, the surveyor should:',
    options: ['Move the marker as requested since the client is paying', 'Refuse the request and explain that boundary markers must be placed based on evidence and professional judgment', 'Move the marker if the neighbor agrees', 'Ask the client to sign a waiver'],
    correctAnswer: 1,
    explanation: 'A surveyor must never place boundary markers at locations that do not reflect the true boundary as determined by evidence and professional analysis. Moving a marker to a client\'s desired location constitutes fraud and is a violation of professional ethics and law. The surveyor must explain why the request cannot be honored.',
    difficulty: 'easy'
  },
  {
    domain: 'Professional Survey Practices',
    question: 'The surveyor\'s ethical obligation of "due diligence" requires:',
    options: ['Only performing field work quickly', 'Thorough research, careful field work, and competent analysis before rendering professional opinions', 'Only using the latest technology', 'Charging the highest possible fees'],
    correctAnswer: 1,
    explanation: 'Due diligence requires the surveyor to perform thorough research (deed records, plats, prior surveys), careful field observations (locating monuments and evidence), accurate measurements, competent analysis, and sound professional judgment before rendering opinions about boundary locations or other survey matters.',
    difficulty: 'medium'
  },
  {
    domain: 'Professional Survey Practices',
    question: 'A surveyor discovers that a prior survey by another licensed surveyor contains a significant error that affects the current project. The surveyor should:',
    options: ['Ignore it because correcting another surveyor\'s work is unprofessional', 'Document the discrepancy, perform independent analysis, and notify the client and potentially the licensing board', 'Automatically defer to the prior survey', 'Secretly correct the error without telling anyone'],
    correctAnswer: 1,
    explanation: 'When a surveyor discovers a significant error in a prior survey, they have a professional and ethical obligation to document the discrepancy, perform their own independent analysis, inform the client, and in cases involving public safety or welfare, potentially notify the state licensing board. Professional courtesy does not override the duty to the public.',
    difficulty: 'hard'
  },
  {
    domain: 'Professional Survey Practices',
    question: 'The concept of "privity" in surveyor liability refers to:',
    options: ['The right to privacy of survey data', 'A direct contractual relationship between parties', 'The requirement to keep field notes confidential', 'The surveyor\'s right to refuse work'],
    correctAnswer: 1,
    explanation: 'Privity of contract exists between parties who have a direct contractual relationship. Traditionally, only parties in privity could sue for professional negligence. However, many jurisdictions now extend surveyor liability to foreseeable third parties who rely on the survey, even without a direct contract with the surveyor.',
    difficulty: 'hard'
  },
  {
    domain: 'Professional Survey Practices',
    question: 'The "responsible charge" requirement for professional surveyors means:',
    options: ['The surveyor must personally perform every measurement', 'The licensed surveyor must exercise direct supervisory control over the survey work and accept professional responsibility for its accuracy', 'The surveyor is financially responsible for all project costs', 'Only the surveyor in charge can sign contracts'],
    correctAnswer: 1,
    explanation: 'Responsible charge requires that a licensed professional surveyor exercise direct supervisory control over survey work performed under their license. This does not mean the PLS must personally perform every task, but they must be sufficiently involved to understand the methods used, verify the accuracy of results, and accept professional responsibility for the final product.',
    difficulty: 'medium'
  },
  {
    domain: 'Professional Survey Practices',
    question: 'A surveyor\'s field notes serve as:',
    options: ['Informal personal reminders only', 'Official, contemporaneous records of observations and measurements that may serve as legal evidence', 'Temporary records to be discarded after the plat is drawn', 'Marketing materials for the firm'],
    correctAnswer: 1,
    explanation: 'Field notes are the official contemporaneous record of the surveyor\'s observations, measurements, and decisions in the field. They are permanent records that may be used as evidence in court proceedings, for future retracement surveys, and for defense against professional liability claims. They must be clear, complete, and accurate.',
    difficulty: 'easy'
  },
  {
    domain: 'Professional Survey Practices',
    question: 'The statute of limitations for a surveying malpractice claim:',
    options: ['Is always 1 year from the date of the survey', 'Varies by state and may begin when the error is discovered or should have been discovered', 'Does not exist for surveyors', 'Is always 20 years'],
    correctAnswer: 1,
    explanation: 'The statute of limitations for professional negligence varies by state, typically ranging from 2 to 10 years. Many states use a "discovery rule" where the limitations period begins when the error is discovered or reasonably should have been discovered, rather than when the survey was performed.',
    difficulty: 'medium'
  },
  {
    domain: 'Professional Survey Practices',
    question: 'A surveyor who signs and seals a plat prepared by an unlicensed person:',
    options: ['Is common and acceptable practice', 'Is ethically and legally responsible for the work product and may face disciplinary action if proper oversight was not provided', 'Is only a problem if the plat contains errors', 'Has no liability since they did not perform the work'],
    correctAnswer: 1,
    explanation: 'A licensed surveyor who signs and seals a plat takes full professional and legal responsibility for that work. If the surveyor did not exercise adequate supervision and responsible charge over the work, they may face disciplinary action, license revocation, and liability. "Plan stamping" without proper oversight is a serious ethical violation.',
    difficulty: 'hard'
  },
  {
    domain: 'Professional Survey Practices',
    question: 'The concept of "responsible charge" in professional surveying means:',
    options: ['Charging reasonable fees for services', 'Direct control and personal supervision of the work, including the ability to review and approve all work products', 'Only being present in the office while work is performed', 'Delegating all work to field technicians'],
    correctAnswer: 1,
    explanation: 'Responsible charge means the licensed surveyor exercises direct control and supervision over the surveying work, including independent knowledge, judgment, and the ability to review, correct, and approve all work products. Physical presence at the work site may not always be required, but the surveyor must have meaningful oversight.',
    difficulty: 'medium'
  },
  {
    domain: 'Professional Survey Practices',
    question: 'When a surveyor is asked to provide services in a specialized area outside their competence, they should:',
    options: ['Accept the work and learn as they go', 'Decline or associate with a qualified professional, disclosing the arrangement to the client', 'Accept the work and charge a lower fee', 'Subcontract without informing the client'],
    correctAnswer: 1,
    explanation: 'Professional ethics require that a surveyor only accept engagements for which they are qualified by education, training, and experience. If the work requires specialized expertise, the surveyor should either decline the engagement or associate with a qualified professional, with full disclosure to the client.',
    difficulty: 'easy'
  },
  {
    domain: 'Professional Survey Practices',
    question: 'A conflict of interest for a surveyor performing a boundary survey would include:',
    options: ['Using GPS equipment on the project', 'Having a personal financial interest in the outcome of the boundary determination', 'Performing research at the county courthouse', 'Using previously established control points'],
    correctAnswer: 1,
    explanation: 'A conflict of interest exists when the surveyor has a personal, financial, or other interest that could compromise or appear to compromise professional objectivity. Examples include the surveyor being a party to the transaction, having a financial interest in the property, or being related to one of the parties in a boundary dispute.',
    difficulty: 'easy'
  },
  {
    domain: 'Professional Survey Practices',
    question: 'An error of closure in a boundary survey that exceeds acceptable standards indicates:',
    options: ['The property does not exist', 'A blunder or systematic error exists in the measurements that must be identified and corrected', 'The survey is still acceptable', 'The boundary has changed since the original survey'],
    correctAnswer: 1,
    explanation: 'An error of closure exceeding acceptable standards suggests a blunder (gross error) or uncorrected systematic error in the measurements. The surveyor must identify and correct the source of the error before accepting the survey results. Simply distributing the error without investigation would not meet the standard of care.',
    difficulty: 'medium'
  },
  {
    domain: 'Professional Survey Practices',
    question: 'Peer review of survey work products is important because it:',
    options: ['Is required by federal law on all projects', 'Provides an independent check that helps identify errors and improve quality', 'Slows down project completion without benefit', 'Is only needed for government contracts'],
    correctAnswer: 1,
    explanation: 'Peer review provides an independent verification of survey work by a qualified professional. It helps identify computational errors, inconsistencies, omissions, and improper interpretations that the original surveyor may have missed. Peer review is a critical component of quality control and risk management.',
    difficulty: 'medium'
  },
  {
    domain: 'Professional Survey Practices',
    question: 'When a boundary dispute arises between adjacent landowners, the surveyor\'s role is to:',
    options: ['Decide who owns the disputed area', 'Provide objective professional analysis and evidence; leave legal determinations to the courts', 'Mediate the dispute and render a binding decision', 'Always side with the client who hired them'],
    correctAnswer: 1,
    explanation: 'The surveyor\'s role in boundary disputes is to provide objective, professional analysis based on evidence, monuments, deed records, and applicable legal principles. The surveyor renders professional opinions about boundary locations but cannot make binding legal determinations—that authority belongs to the courts.',
    difficulty: 'medium'
  },
  {
    domain: 'Professional Survey Practices',
    question: 'The minimum elements of a professional survey contract should include:',
    options: ['Only the total fee', 'Scope of services, deliverables, timeline, fee, terms, limitations, and the parties\' responsibilities', 'Only the client\'s name and address', 'Only a verbal agreement'],
    correctAnswer: 1,
    explanation: 'A professional survey contract should clearly define the scope, deliverables, schedule, fee structure, payment terms, parties\' responsibilities, limitations of liability, ownership of documents, dispute resolution, and termination provisions. Clear contracts reduce misunderstandings and protect both the surveyor and client.',
    difficulty: 'easy'
  },
  {
    domain: 'Professional Survey Practices',
    question: 'A surveyor\'s professional seal on a document certifies that:',
    options: ['The document was prepared under their supervision', 'The document has been reviewed by the state licensing board', 'The property boundaries are guaranteed to be accurate within 0.01 feet', 'The document is approved for recording by the county'],
    correctAnswer: 0,
    explanation: 'A surveyor\'s professional seal and signature certify that the work was performed under their responsible charge and supervision, and that the work meets applicable standards. It does not guarantee absolute accuracy or constitute approval by the licensing board or recording authority.',
    difficulty: 'medium'
  },
  {
    domain: 'Professional Survey Practices',
    question: 'When performing a survey that reveals a potential title defect, the surveyor should:',
    options: ['Fix the title defect themselves', 'Report the finding to the client and recommend consultation with a title professional or attorney', 'Ignore it since title work is outside their scope', 'Record a corrective document at the courthouse'],
    correctAnswer: 1,
    explanation: 'While surveyors are not title examiners, they have a duty to report findings that may affect title or boundary rights. The surveyor should document the potential issue, inform the client, and recommend that the client consult a title company or attorney for resolution. The surveyor should not attempt to resolve title defects.',
    difficulty: 'medium'
  },
  {
    domain: 'Professional Survey Practices',
    question: 'The term "professional negligence" in surveying refers to:',
    options: ['Any error in measurement, no matter how small', 'Failure to exercise the degree of care that a reasonably competent surveyor would under similar circumstances', 'Intentional misconduct', 'Working without the most advanced equipment'],
    correctAnswer: 1,
    explanation: 'Professional negligence is the failure to meet the standard of care—the degree of skill, diligence, and judgment that a reasonably competent surveyor would exercise under similar circumstances. Not all errors constitute negligence; some errors are within the expected range of measurement uncertainty.',
    difficulty: 'medium'
  },
  {
    domain: 'Professional Survey Practices',
    question: 'A surveyor who discovers they have made an error on a completed project should:',
    options: ['Ignore it and hope no one notices', 'Promptly notify the client, take corrective action, and document the error and correction', 'Wait until the client complains', 'Blame the field crew'],
    correctAnswer: 1,
    explanation: 'Professional ethics require prompt self-disclosure of errors. The surveyor should immediately notify the client, take appropriate corrective action (resurvey, revised plat, etc.), document the error and correction, notify their E&O insurance carrier, and take steps to prevent similar errors in the future.',
    difficulty: 'easy'
  },
  {
    domain: 'Professional Survey Practices',
    question: 'The practice of "plan stamping" refers to:',
    options: ['Using rubber stamps for efficiency', 'Applying a professional seal to work not performed under the surveyor\'s responsible charge', 'Placing a date stamp on survey documents', 'Creating a standard template for survey plats'],
    correctAnswer: 1,
    explanation: 'Plan stamping is the unethical and illegal practice of a licensed surveyor affixing their seal and signature to documents that were not prepared under their direct supervision and responsible charge. This practice violates licensing laws, professional ethics, and exposes the sealing surveyor to significant liability.',
    difficulty: 'hard'
  },
  {
    domain: 'Professional Survey Practices',
    question: 'A surveyor\'s duty to the public differs from their duty to the client because:',
    options: ['There is no duty to the public', 'The surveyor must protect public health, safety, and welfare, which may sometimes conflict with the client\'s wishes', 'The duty to the client always supersedes public duty', 'Public duty only applies to government projects'],
    correctAnswer: 1,
    explanation: 'Licensed professionals have a paramount duty to protect the public health, safety, and welfare. This duty may supersede the client\'s interests—for example, if a client asks the surveyor to conceal evidence or misrepresent boundary locations. The surveyor must maintain professional integrity even at the cost of client satisfaction.',
    difficulty: 'medium'
  },
  {
    domain: 'Professional Survey Practices',
    question: 'Independent redundant measurements in a survey serve to:',
    options: ['Slow down the project', 'Detect blunders and provide a check on the accuracy of observations', 'Increase the project cost unnecessarily', 'Satisfy only government contract requirements'],
    correctAnswer: 1,
    explanation: 'Redundant measurements (such as double rodding, closing the level loop, or measuring in both directions) provide a check against blunders and allow the surveyor to assess the precision and reliability of the observations. Without redundancy, there is no way to detect errors or assess measurement quality.',
    difficulty: 'easy'
  },
  {
    domain: 'Professional Survey Practices',
    question: 'When two licensed surveyors reach different opinions about a boundary location using the same evidence, this most likely reflects:',
    options: ['That one surveyor is negligent', 'Legitimate differences in professional judgment and interpretation of evidence', 'That the boundary does not exist', 'That both surveyors are incompetent'],
    correctAnswer: 1,
    explanation: 'Boundary determination often involves weighing conflicting evidence and exercising professional judgment. Two competent surveyors may reasonably reach different conclusions about the same boundary based on the weight they assign to different types of evidence. A difference in opinion does not necessarily indicate negligence by either party.',
    difficulty: 'hard'
  },
  {
    domain: 'Professional Survey Practices',
    question: 'A surveyor\'s continuing obligation to maintain records after completing a project is important because:',
    options: ['Records have no value after project completion', 'Future surveyors, courts, and clients may need the records for retracement, litigation, or reference', 'Records are only needed for one year', 'Only government projects require record retention'],
    correctAnswer: 1,
    explanation: 'Survey records are a critical resource for future boundary retracements, dispute resolution, title examination, and professional liability defense. Most states mandate minimum retention periods, and many surveyors maintain records permanently. Records include field notes, calculations, research materials, correspondence, and all work products.',
    difficulty: 'easy'
  },

  // ===== ADDITIONAL STANDARDS AND SPECIFICATIONS (~40 questions) =====
  {
    domain: 'Standards and Specifications',
    question: 'The 2026 ALTA/NSPS Minimum Standard Detail Requirements specify a maximum allowable Relative Positional Precision of:',
    options: ['0.50 feet', '0.07 feet (2 cm)', '0.20 feet', '1.00 feet'],
    correctAnswer: 1,
    explanation: 'The 2026 ALTA/NSPS standards require that the Relative Positional Precision (RPP) of the survey shall not exceed 2 cm (0.07 feet) plus 50 parts per million (based on the distance between points). This is a very high standard of accuracy reflective of the survey\'s use in major real estate transactions.',
    difficulty: 'hard'
  },
  {
    domain: 'Standards and Specifications',
    question: 'Table A of the ALTA/NSPS standards lists:',
    options: ['Mandatory requirements for all surveys', 'Optional items that may be negotiated between the surveyor and client', 'State-specific licensing requirements', 'Fee schedules for survey services'],
    correctAnswer: 1,
    explanation: 'Table A contains optional survey responsibilities and specifications that may be negotiated between the surveyor, lender, title company, and client. Examples include flood zone determination, zoning information, wetlands location, underground utilities, and offsite easements. These items are in addition to the mandatory minimum standards.',
    difficulty: 'medium'
  },
  {
    domain: 'Standards and Specifications',
    question: 'ALTA/NSPS Table A Item 1 relates to:',
    options: ['Flood zone determination', 'Monuments placed at all property corners found or established', 'Zoning classification', 'Underground utility location'],
    correctAnswer: 1,
    explanation: 'Table A Item 1 requires that monuments be placed (if not already in place) at all property corners that are part of the survey. This optional item ensures that the client has physical markers at all boundary corners, facilitating future identification of the property limits.',
    difficulty: 'medium'
  },
  {
    domain: 'Standards and Specifications',
    question: 'Under the 2026 ALTA/NSPS standards, Table A Item 11 relates to:',
    options: ['Setting monuments', 'Substantial features', 'Underground utility location', 'Flood zone determination'],
    correctAnswer: 2,
    explanation: 'In the 2026 ALTA/NSPS standards, Table A Item 11 addresses evidence of underground utilities existing on or serving the surveyed property. Depending on which sub-option is selected, this may include locating utilities based on plans and/or reports provided by the client (Item 11a) or markings coordinated pursuant to a private utility locate request (Item 11b).',
    difficulty: 'hard'
  },
  {
    domain: 'Standards and Specifications',
    question: 'A FEMA Elevation Certificate is used to:',
    options: ['Certify the elevation of a property for property tax purposes', 'Document building and ground elevations relative to the Base Flood Elevation (BFE) for flood insurance rating', 'Certify the elevation of survey monuments', 'Establish geodetic control for a project'],
    correctAnswer: 1,
    explanation: 'A FEMA Elevation Certificate documents the lowest adjacent grade, lowest floor elevation, and other critical elevations of a building in relation to the Base Flood Elevation. It is used by insurance companies to determine flood insurance premiums and by communities to verify compliance with floodplain management ordinances.',
    difficulty: 'medium'
  },
  {
    domain: 'Standards and Specifications',
    question: 'The Base Flood Elevation (BFE) on a FIRM map represents:',
    options: ['The lowest ground elevation in the area', 'The elevation of the 1% annual chance flood (100-year flood)', 'The elevation of the highest recorded flood', 'The average annual river stage'],
    correctAnswer: 1,
    explanation: 'The Base Flood Elevation is the computed elevation to which floodwater is anticipated to rise during the base flood (1% annual chance flood, commonly called the 100-year flood). It is the regulatory standard used by FEMA and local communities for floodplain management and insurance rating purposes.',
    difficulty: 'easy'
  },
  {
    domain: 'Standards and Specifications',
    question: 'The difference between LOMA and LOMR-F applications to FEMA is:',
    options: ['LOMA is for residential properties and LOMR-F is for commercial', 'LOMA is for properties on natural high ground above BFE; LOMR-F is for properties elevated by fill above BFE', 'LOMA requires a surveyor and LOMR-F does not', 'There is no difference; they are interchangeable'],
    correctAnswer: 1,
    explanation: 'A LOMA (Letter of Map Amendment) removes a property from the SFHA when it sits on natural ground above the Base Flood Elevation. A LOMR-F (Letter of Map Revision Based on Fill) removes a property when it has been elevated above the BFE by the placement of engineered fill. Both require an Elevation Certificate from a licensed surveyor, but the LOMR-F also requires certification that the fill was properly placed and compacted.',
    difficulty: 'hard'
  },
  {
    domain: 'Standards and Specifications',
    question: 'The State Plane Coordinate System (SPCS) uses which projection(s)?',
    options: ['Only Mercator projections', 'Lambert Conformal Conic and/or Transverse Mercator projections', 'Only polyconic projections', 'No projections; it uses a flat plane'],
    correctAnswer: 1,
    explanation: 'The SPCS uses Lambert Conformal Conic projections for states that are wider east-west and Transverse Mercator projections for states that are longer north-south. Some states use both projections for different zones. These projections minimize distortion within each zone.',
    difficulty: 'medium'
  },
  {
    domain: 'Standards and Specifications',
    question: 'The purpose of a combined scale factor in State Plane Coordinates is to:',
    options: ['Convert between English and metric units', 'Account for both the grid-to-ground scale factor and the elevation factor', 'Convert between NAD 27 and NAD 83', 'Adjust for magnetic declination'],
    correctAnswer: 1,
    explanation: 'The combined scale factor is the product of the grid scale factor (which accounts for map projection distortion) and the elevation factor (which accounts for the difference between the ellipsoid surface and the ground surface). It converts between ground distances and grid (State Plane) distances.',
    difficulty: 'hard'
  },
  {
    domain: 'Standards and Specifications',
    question: 'NGS standards define a First Order geodetic control survey as having a minimum accuracy of:',
    options: ['1:10,000', '1:50,000', '1:100,000', '1:1,000,000'],
    correctAnswer: 2,
    explanation: 'First Order geodetic control surveys require a minimum accuracy of 1:100,000 (10 ppm). This is the highest standard of accuracy for geodetic surveys and is typically required for statewide geodetic networks, dam monitoring, and crustal motion studies. Second Order surveys require 1:50,000, and Third Order requires 1:10,000.',
    difficulty: 'hard'
  },
  {
    domain: 'Standards and Specifications',
    question: 'The National Spatial Reference System (NSRS) maintained by NGS provides:',
    options: ['Only property boundary data', 'A consistent coordinate system, including horizontal and vertical control networks', 'Only GPS satellite orbit information', 'Only tidal data for coastal areas'],
    correctAnswer: 1,
    explanation: 'The NSRS is the framework of positions, elevations, and gravity values that define how latitude, longitude, height, and other geodetic properties are established throughout the United States. It consists of the horizontal datum (NAD 83), the vertical datum (NAVD 88), and the supporting network of control points.',
    difficulty: 'medium'
  },
  {
    domain: 'Standards and Specifications',
    question: 'The North American Vertical Datum of 1988 (NAVD 88) is referenced to:',
    options: ['Mean sea level at multiple tide stations', 'A single tidal benchmark at Father Point/Rimouski, Quebec', 'The WGS 84 ellipsoid', 'The center of the Earth'],
    correctAnswer: 1,
    explanation: 'NAVD 88 is a fixed datum referenced to a single tidal benchmark at Father Point/Rimouski, Quebec, Canada. Unlike NGVD 29, which was referenced to mean sea level at 26 tide stations, NAVD 88 uses a single datum point and a minimum-constraint adjustment of the leveling network.',
    difficulty: 'hard'
  },
  {
    domain: 'Standards and Specifications',
    question: 'Construction staking tolerances for building layout are typically:',
    options: ['The same as geodetic survey standards', 'Specified in the project plans and specifications, commonly ±0.01 to ±0.10 feet depending on the element', 'Always ±1.0 feet', 'Not specified for construction projects'],
    correctAnswer: 1,
    explanation: 'Construction staking tolerances vary depending on the type of construction element. Building corners and structural elements may require ±0.01 to ±0.02 feet. Grading may allow ±0.10 feet. Rough earthwork may allow ±0.50 feet. Specific tolerances should be stated in the project specifications.',
    difficulty: 'medium'
  },
  {
    domain: 'Standards and Specifications',
    question: 'The precision of a closed traverse is evaluated by computing the:',
    options: ['Maximum single measurement error', 'Ratio of the linear error of closure to the total traverse length', 'Number of angles measured', 'Cost per station'],
    correctAnswer: 1,
    explanation: 'Traverse precision is expressed as the ratio of the linear error of closure to the total traverse perimeter (e.g., 1:10,000). The linear error of closure is the distance between the known and computed positions of the closing point. This ratio indicates the consistency of the distance and angle measurements.',
    difficulty: 'easy'
  },
  {
    domain: 'Standards and Specifications',
    question: 'FEMA Special Flood Hazard Areas (SFHAs) are designated as:',
    options: ['Zone C and Zone X', 'Zone A and Zone V', 'Zone B only', 'Zone D only'],
    correctAnswer: 1,
    explanation: 'Special Flood Hazard Areas are designated as Zone A (riverine flooding) and Zone V (coastal flooding with wave action). Zone A has various sub-designations (AE, AH, AO, AR, A99). Zone V areas include VE and V zones. Areas outside the SFHA are designated Zone B, C, X, or D.',
    difficulty: 'medium'
  },
  {
    domain: 'Standards and Specifications',
    question: 'A FEMA Letter of Map Revision (LOMR) differs from a LOMA because a LOMR:',
    options: ['Is easier to obtain', 'Reflects changes to the FIRM based on physical changes to the floodplain (fill, channel modifications, etc.)', 'Only applies to residential properties', 'Does not require engineering analysis'],
    correctAnswer: 1,
    explanation: 'A LOMR officially revises the FIRM based on physical changes (such as fill, levees, channel improvements, or bridge construction) or updated hydraulic/hydrologic analysis. A LOMA, by contrast, corrects map errors by showing that a naturally elevated property was incorrectly included in the SFHA. LOMRs typically require more extensive engineering analysis.',
    difficulty: 'hard'
  },
  {
    domain: 'Standards and Specifications',
    question: 'The Geoid model published by NGS is used to:',
    options: ['Calculate magnetic declination', 'Convert between ellipsoidal heights (from GPS) and orthometric heights (elevations above sea level)', 'Determine the speed of radio waves', 'Calculate atmospheric refraction'],
    correctAnswer: 1,
    explanation: 'The geoid model defines the separation between the ellipsoid (the mathematical reference surface used by GPS) and the geoid (the equipotential gravity surface that best approximates mean sea level). Adding the geoid height (N) to the orthometric height (H) gives the ellipsoidal height (h): h = H + N.',
    difficulty: 'hard'
  },
  {
    domain: 'Standards and Specifications',
    question: 'For an ALTA/NSPS survey, the surveyor is required to show:',
    options: ['Only the boundary lines', 'All improvements, visible encroachments, easements of record, and other items specified in the standards', 'Only the building footprint', 'Only the zoning designation'],
    correctAnswer: 1,
    explanation: 'ALTA/NSPS surveys must show boundary lines, improvements, rights-of-way, easements of record, visible encroachments, evidence of utilities, access, names of adjoining owners, flood zone designation, and other items as specified in the minimum standards and any negotiated Table A items.',
    difficulty: 'medium'
  },
  {
    domain: 'Standards and Specifications',
    question: 'The accuracy standard for OPUS (Online Positioning User Service) solutions from NGS is approximately:',
    options: ['10 meters horizontal', '2 cm horizontal and 4 cm vertical for properly conducted sessions', '1 meter horizontal', '0.001 mm'],
    correctAnswer: 1,
    explanation: 'OPUS provides coordinates with a typical accuracy of approximately 2 cm horizontal and 4 cm vertical when proper observation procedures are followed (minimum 2-hour static observation for OPUS-S, or 15 minutes for OPUS-RS). Accuracy depends on observation duration, number of available CORS stations, and multipath conditions.',
    difficulty: 'hard'
  },
  {
    domain: 'Standards and Specifications',
    question: 'In the ALTA/NSPS standards, "Relative Positional Precision" (RPP) is defined as:',
    options: ['The accuracy of the survey relative to the national geodetic datum', 'The estimated uncertainty in the distance between any two points on the survey at the 95% confidence level', 'The precision of the GPS receiver used', 'The ratio of misclosure to perimeter'],
    correctAnswer: 1,
    explanation: 'RPP is an estimate of the uncertainty of the position of any surveyed point relative to any other surveyed point on the same survey, at the 95% confidence level. It replaces the older concept of "accuracy" based on traverse closure ratios and provides a more meaningful assessment of survey quality.',
    difficulty: 'hard'
  },
  {
    domain: 'Standards and Specifications',
    question: 'Minimum standards for property surveys are typically established by:',
    options: ['The federal government for all states', 'Individual state licensing boards or state statutes', 'The United Nations', 'The surveyor on a project-by-project basis'],
    correctAnswer: 1,
    explanation: 'Each state establishes its own minimum technical standards for surveys through the state board of licensure, state statutes, or administrative rules. These standards address accuracy requirements, monumentation, plat format, certifications, and other aspects of survey practice. Some states adopt or reference national standards like ALTA/NSPS.',
    difficulty: 'easy'
  },
  {
    domain: 'Standards and Specifications',
    question: 'The NAD 83 (2011) epoch 2010.00 adjustment refers to:',
    options: ['A 1983 adjustment of the horizontal datum', 'The most recent national adjustment of the NAD 83 horizontal datum, constrained to positions at the epoch of 2010.00', 'The first GPS-based adjustment', 'A local coordinate system used only in California'],
    correctAnswer: 1,
    explanation: 'NAD 83 (2011) is the most recent realization (adjustment) of the NAD 83 datum, constrained to 2010.0 epoch positions of the CORS network. It replaced NAD 83 (NSRS2007) and provides the most current reference frame for positioning in the United States. Coordinates may differ slightly between adjustments.',
    difficulty: 'hard'
  },
  {
    domain: 'Standards and Specifications',
    question: 'Contour lines on a topographic survey map:',
    options: ['Connect points of equal distance from a boundary', 'Connect points of equal elevation above a reference datum', 'Show the direction of magnetic north', 'Indicate property boundaries'],
    correctAnswer: 1,
    explanation: 'Contour lines connect points of equal elevation above a vertical datum (such as NAVD 88). The spacing of contour lines indicates the steepness of terrain: closely spaced contours indicate steep slopes, while widely spaced contours indicate gentle terrain. The vertical distance between contour lines is the contour interval.',
    difficulty: 'easy'
  },
  {
    domain: 'Standards and Specifications',
    question: 'The minimum number of CORS stations used by OPUS for a position solution is:',
    options: ['1', '2', '3', '5'],
    correctAnswer: 2,
    explanation: 'OPUS requires a minimum of 3 CORS (Continuously Operating Reference Stations) to compute a position solution. The software processes the submitted GPS data against three CORS stations and provides the averaged solution with quality indicators. Using more distant or poorly distributed CORS may affect accuracy.',
    difficulty: 'medium'
  },
  {
    domain: 'Standards and Specifications',
    question: 'When performing a level loop closure, an acceptable misclosure for Third Order leveling is:',
    options: ['0.001 feet per station', '12mm × √K (where K is the distance in km)', '1 foot per mile', '0.1 feet regardless of distance'],
    correctAnswer: 1,
    explanation: 'Third Order leveling has a maximum allowable misclosure of 12mm × √K, where K is the one-way leveling distance in kilometers. Second Order Class II allows 8mm × √K, Second Order Class I allows 6mm × √K, and First Order allows 4mm × √K (Class II) or 3mm × √K (Class I).',
    difficulty: 'hard'
  },
  {
    domain: 'Standards and Specifications',
    question: 'An ALTA/NSPS survey must be certified to:',
    options: ['Only the property owner', 'The parties specified in the certification, typically including the lender, title company, buyer, and/or their successors', 'The general public', 'Only the county recorder'],
    correctAnswer: 1,
    explanation: 'The ALTA/NSPS survey certification must be addressed to the parties specified by the client, typically including the lender, title insurance company, current owner, and prospective buyer. The certification identifies who may rely on the survey and is a critical component of the survey deliverable.',
    difficulty: 'medium'
  },
  {
    domain: 'Standards and Specifications',
    question: 'The horizontal datum shift from NAD 27 to NAD 83 in the continental U.S. results in coordinate differences of approximately:',
    options: ['Less than 1 foot', '10 to 100+ meters depending on location', 'Exactly 0 meters', 'More than 1 kilometer'],
    correctAnswer: 1,
    explanation: 'The shift from NAD 27 to NAD 83 results in coordinate differences ranging from approximately 10 to over 100 meters depending on geographic location. These shifts vary across the country because NAD 27 was based on the Clarke 1866 ellipsoid with its origin at Meades Ranch, Kansas, while NAD 83 uses the GRS 80 ellipsoid.',
    difficulty: 'medium'
  },
  {
    domain: 'Standards and Specifications',
    question: 'The grid factor for State Plane Coordinates accounts for:',
    options: ['The difference between magnetic and true north', 'The distortion introduced by projecting the curved earth surface onto a flat plane', 'The difference between English and metric units', 'The earth\'s rotation'],
    correctAnswer: 1,
    explanation: 'The grid scale factor accounts for the linear distortion that occurs when projecting the curved earth surface onto the flat map plane of the State Plane Coordinate System. Distances measured on the ground must be multiplied by the combined factor (grid factor × elevation factor) to convert to grid distances.',
    difficulty: 'medium'
  },
  {
    domain: 'Standards and Specifications',
    question: 'Under the 2026 ALTA/NSPS standards, Table A Item 6 relates to:',
    options: ['Monuments', 'Zoning information', 'Flood zone classification', 'Underground utilities'],
    correctAnswer: 1,
    explanation: 'In the 2026 ALTA/NSPS standards, Table A Item 6 covers zoning information. Item 6(a) requires listing zoning classification, setback requirements, height and floor space area restrictions, and parking requirements from a zoning report provided by the client. Item 6(b) requires graphically depicting zoning setback requirements on the plat. This information is critical for lenders and title companies to assess the property\'s compliance with local regulations.',
    difficulty: 'medium'
  },
  {
    domain: 'Standards and Specifications',
    question: 'A benchmark used for vertical control should be:',
    options: ['A temporary wooden stake', 'A stable, permanent point with a known elevation referenced to an established datum', 'Any point selected by the surveyor without verification', 'Located only on federal land'],
    correctAnswer: 1,
    explanation: 'A benchmark must be a stable, permanent monument (such as a brass disk set in concrete, a chiseled mark on a structure, or an NGS control point) with a known elevation referenced to an established vertical datum (e.g., NAVD 88). It should be located where it is unlikely to be disturbed by construction or natural processes.',
    difficulty: 'easy'
  },
  {
    domain: 'Standards and Specifications',
    question: 'The convergence angle in State Plane Coordinates is the angle between:',
    options: ['Magnetic north and true north', 'Grid north and geodetic (true) north', 'The sun\'s azimuth and true north', 'Two adjacent zone boundaries'],
    correctAnswer: 1,
    explanation: 'The convergence angle (mapping angle or grid convergence) is the difference between grid north (the direction of increasing northing on the State Plane grid) and geodetic north (true north). The convergence angle varies with position and is zero along the central meridian of a Transverse Mercator zone.',
    difficulty: 'hard'
  },
  {
    domain: 'Standards and Specifications',
    question: 'GNSS observations for control surveys should include a minimum occupation time that depends on:',
    options: ['The time of day only', 'Baseline length, number of satellites, constellation geometry, and desired accuracy', 'The type of tripod used', 'The surveyor\'s preference only'],
    correctAnswer: 1,
    explanation: 'Minimum GNSS occupation time depends on baseline length, the number of available satellites, satellite geometry (PDOP/GDOP), the type of receiver and antenna, multipath conditions, and the desired accuracy. Longer occupations and more satellites generally improve the position solution.',
    difficulty: 'medium'
  },
  {
    domain: 'Standards and Specifications',
    question: 'The Flood Insurance Rate Map (FIRM) is published by:',
    options: ['The U.S. Army Corps of Engineers', 'The Federal Emergency Management Agency (FEMA)', 'The National Geodetic Survey (NGS)', 'The U.S. Geological Survey (USGS)'],
    correctAnswer: 1,
    explanation: 'FIRMs are published by FEMA as part of the National Flood Insurance Program (NFIP). They delineate Special Flood Hazard Areas, Base Flood Elevations, and flood risk zones. FIRMs are the official maps used by communities, lenders, and insurance companies for floodplain management and insurance rating.',
    difficulty: 'easy'
  },
  {
    domain: 'Standards and Specifications',
    question: 'The elevation factor used in State Plane Coordinate calculations adjusts for:',
    options: ['The difference between magnetic and true north', 'The height of the survey point above the ellipsoid', 'The curvature of contour lines', 'Temperature effects on steel tapes'],
    correctAnswer: 1,
    explanation: 'The elevation factor adjusts for the difference in distance between a measurement taken at ground level (above the ellipsoid) and the corresponding distance on the ellipsoid surface. It is calculated as R/(R+h), where R is the earth\'s mean radius and h is the height above the ellipsoid. Points at higher elevations have smaller elevation factors.',
    difficulty: 'hard'
  },
  {
    domain: 'Standards and Specifications',
    question: 'Static GNSS surveys require simultaneous observations at:',
    options: ['Only the base station', 'Both the base station and rover station(s) for the same time period', 'Any station at any time', 'Only during daylight hours'],
    correctAnswer: 1,
    explanation: 'Static GNSS surveying requires simultaneous satellite observations at two or more stations (base and rover) during the same time period. The data from all stations is then post-processed together to determine the baseline vector(s) between stations. This method provides the highest accuracy for control surveys.',
    difficulty: 'easy'
  },
  {
    domain: 'Standards and Specifications',
    question: 'The horizontal accuracy standard for a topographic survey used for engineering design is typically:',
    options: ['1 meter', 'One-tenth of the contour interval plotted at map scale', 'One foot regardless of scale', '10 meters'],
    correctAnswer: 1,
    explanation: 'The traditional standard for horizontal accuracy of a topographic map is that 90% of well-defined points shall be within a distance equal to 1/30 inch at map scale (for maps at scales larger than 1:20,000). For engineering design, horizontal positions of features should typically be accurate to within one-tenth of the contour interval or better.',
    difficulty: 'hard'
  },
  {
    domain: 'Standards and Specifications',
    question: 'RTK (Real-Time Kinematic) GNSS surveying achieves typical accuracies of:',
    options: ['10 meters', '1-3 cm horizontal and 2-5 cm vertical', '1 meter', '1 mm'],
    correctAnswer: 1,
    explanation: 'RTK GNSS typically achieves 1-3 cm horizontal and 2-5 cm vertical accuracy under good conditions. Accuracy depends on baseline length (should generally be less than 10-20 km), satellite geometry, multipath, atmospheric conditions, and proper field procedures. RTK is widely used for boundary, topographic, and construction surveys.',
    difficulty: 'medium'
  },
  {
    domain: 'Standards and Specifications',
    question: 'The ALTA/NSPS standards require that the survey plat show:',
    options: ['Only the property boundaries', 'The relationship of the property to its adjoiners, including the names of adjoiners from record title', 'Only GPS coordinates', 'Only building footprints'],
    correctAnswer: 1,
    explanation: 'The ALTA/NSPS standards require the plat to show the names of adjoining owners or lot designations from record title. This information helps title companies and lenders identify potential boundary issues, encroachments, or conflicts with neighboring properties.',
    difficulty: 'medium'
  },

  // ===== ADDITIONAL AREAS OF PRACTICE (~40 questions) =====
  {
    domain: 'Areas of Practice',
    question: 'When retracing a boundary originally surveyed 100 years ago, the surveyor should prioritize:',
    options: ['Using only modern GPS measurements', 'Finding and evaluating original monuments and physical evidence on the ground', 'Relying solely on the recorded plat dimensions', 'Ignoring any original monuments found in different positions than expected'],
    correctAnswer: 1,
    explanation: 'In a retracement survey, finding original monuments and evidence on the ground is the highest priority. Original monuments control over record dimensions because they represent where the original surveyor actually established the boundary. The retracing surveyor must "follow in the footsteps" of the original surveyor.',
    difficulty: 'medium'
  },
  {
    domain: 'Areas of Practice',
    question: 'In PLSS surveys, a "closing corner" is set:',
    options: ['At every section corner', 'Where a survey line intersects a previously established line', 'Only at township corners', 'At the center of each section'],
    correctAnswer: 1,
    explanation: 'A closing corner is set at the point where a survey line (such as a range line or township line) intersects a previously surveyed line. The closing corner is typically not at the same location as the standard corner on the previously established line, and the gap between them records the accumulated survey error.',
    difficulty: 'hard'
  },
  {
    domain: 'Areas of Practice',
    question: 'Single proportionate measurement is used to restore lost corners on:',
    options: ['Interior section lines', 'Township and range lines (exteriors)', 'Meandered water boundaries', 'All PLSS corners without exception'],
    correctAnswer: 1,
    explanation: 'Single proportionate measurement is used to restore lost corners on established lines (township and range lines) where the line has been previously surveyed and controlling corners exist on that line. The position is interpolated proportionally between the nearest controlling corners on the same line.',
    difficulty: 'hard'
  },
  {
    domain: 'Areas of Practice',
    question: 'The center of a section in the PLSS is determined by:',
    options: ['GPS coordinates from the BLM website', 'The intersection of straight lines connecting opposite quarter corners', 'Measuring exactly 40 chains from any section corner', 'A random point within the section'],
    correctAnswer: 1,
    explanation: 'The center of a section is located at the intersection of straight lines connecting the opposite quarter corners (the quarter corner on the north line with the quarter corner on the south line, and the quarter corner on the east line with the quarter corner on the west line). These lines may not be perpendicular.',
    difficulty: 'medium'
  },
  {
    domain: 'Areas of Practice',
    question: 'Subdivision plat preparation must comply with:',
    options: ['Only the surveyor\'s personal preferences', 'Local subdivision ordinances, state platting laws, and recording requirements', 'Only federal regulations', 'No specific requirements'],
    correctAnswer: 1,
    explanation: 'Subdivision plats must comply with local subdivision ordinances (lot size, setbacks, access, utilities), state platting statutes (format, certifications, monumentation), and county recording requirements. The surveyor must coordinate with local planning departments, engineers, and other professionals throughout the process.',
    difficulty: 'easy'
  },
  {
    domain: 'Areas of Practice',
    question: 'A cul-de-sac in a subdivision is:',
    options: ['A type of easement', 'A dead-end street with a circular turnaround', 'A stormwater detention facility', 'A type of property covenant'],
    correctAnswer: 1,
    explanation: 'A cul-de-sac is a dead-end street with a circular turnaround at the end, commonly used in residential subdivision design. The lots fronting a cul-de-sac are typically pie-shaped (narrow at the street and wider at the rear). Design standards specify minimum radius, right-of-way width, and pavement dimensions.',
    difficulty: 'easy'
  },
  {
    domain: 'Areas of Practice',
    question: 'A metes and bounds retracement survey typically begins with:',
    options: ['Setting new monuments at estimated locations', 'Research of deeds, prior surveys, and title records before going to the field', 'Taking GPS readings at random points', 'Asking neighbors where they think the boundaries are'],
    correctAnswer: 1,
    explanation: 'A proper retracement survey begins with thorough office research: reviewing deeds, prior surveys, plats, court records, and title documents. This research guides the field investigation and helps the surveyor understand the history of the property, identify potential conflicts, and know what evidence to look for on the ground.',
    difficulty: 'easy'
  },
  {
    domain: 'Areas of Practice',
    question: 'An easement survey locates:',
    options: ['Only the property boundary', 'The location, width, and extent of an easement as described in the easement instrument', 'Only underground utilities', 'Only the centerline of a road'],
    correctAnswer: 1,
    explanation: 'An easement survey establishes the physical location of an easement based on its legal description, including its width, length, and position relative to the property boundaries. The survey may also identify improvements, encroachments, or activities within the easement area and their compliance with the easement terms.',
    difficulty: 'medium'
  },
  {
    domain: 'Areas of Practice',
    question: 'Slope staking in construction surveys establishes:',
    options: ['Only the center line of a road', 'The intersection points of cut or fill slopes with the existing ground surface', 'Only the finished grade elevation', 'Only the horizontal alignment'],
    correctAnswer: 1,
    explanation: 'Slope staking marks the points where the proposed cut or fill slopes intersect the existing ground surface (the "catch points" or "daylight lines"). These marks define the limits of earthwork and are essential for equipment operators to know where to begin and end grading operations.',
    difficulty: 'medium'
  },
  {
    domain: 'Areas of Practice',
    question: 'An as-built survey is performed:',
    options: ['Before construction begins', 'After construction is completed to verify that improvements were built according to the plans', 'Only for residential buildings', 'Only when required by a court order'],
    correctAnswer: 1,
    explanation: 'An as-built survey documents the actual location, dimensions, and elevations of constructed improvements as they were built. It verifies compliance with design plans, setback requirements, and easement restrictions. As-built surveys are commonly required by municipalities, lenders, and title companies before certificates of occupancy are issued.',
    difficulty: 'easy'
  },
  {
    domain: 'Areas of Practice',
    question: 'When performing a topographic survey for site design, the surveyor should collect data on:',
    options: ['Only the property boundaries', 'Existing ground elevations, natural features, man-made features, utilities, and drainage patterns', 'Only building locations', 'Only trees over 12 inches in diameter'],
    correctAnswer: 1,
    explanation: 'A topographic survey for engineering design must capture comprehensive site information including ground elevations (for contour mapping), natural features (trees, water features), man-made features (buildings, pavement, fences), visible utilities, drainage patterns, and any other features that may affect site design.',
    difficulty: 'easy'
  },
  {
    domain: 'Areas of Practice',
    question: 'Hydrographic survey data is typically referenced to:',
    options: ['An arbitrary datum', 'A tidal datum such as Mean Lower Low Water (MLLW) for coastal surveys', 'The top of the nearest bridge', 'Atmospheric pressure'],
    correctAnswer: 1,
    explanation: 'Hydrographic survey depths are typically referenced to a tidal datum. For nautical charting in the U.S., Mean Lower Low Water (MLLW) is the standard datum. For inland waterways, a local pool elevation or low water reference plane may be used. The vertical datum used must be clearly stated on all deliverables.',
    difficulty: 'hard'
  },
  {
    domain: 'Areas of Practice',
    question: 'Multibeam sonar in hydrographic surveying provides:',
    options: ['Only a single depth reading along a track line', 'A swath of depth measurements across a wide area of the bottom', 'Only surface water velocity measurements', 'Only water temperature data'],
    correctAnswer: 1,
    explanation: 'Multibeam sonar systems emit a fan of acoustic beams that provide simultaneous depth measurements across a wide swath perpendicular to the vessel\'s track. This allows efficient, high-resolution mapping of the bottom topography, unlike single-beam systems that provide only a single depth along the track line.',
    difficulty: 'medium'
  },
  {
    domain: 'Areas of Practice',
    question: 'A monumented right-of-way survey requires the surveyor to:',
    options: ['Only locate the centerline of the road', 'Establish and monument the right-of-way boundaries based on recorded documents and field evidence', 'Only measure the road width', 'Only locate utility poles'],
    correctAnswer: 1,
    explanation: 'A monumented right-of-way survey requires thorough research of deeds, plats, highway plans, and other records to determine the right-of-way limits, followed by field work to locate existing evidence and set monuments at the right-of-way boundaries. The survey should show the relationship to adjoining properties.',
    difficulty: 'medium'
  },
  {
    domain: 'Areas of Practice',
    question: 'When subdividing a parcel, the surveyor must consider:',
    options: ['Only the lot dimensions', 'Zoning requirements, minimum lot size, frontage, setbacks, access, utilities, drainage, and environmental constraints', 'Only the property owner\'s wishes', 'Only the cost of survey monuments'],
    correctAnswer: 1,
    explanation: 'Subdivision design requires consideration of numerous factors including zoning regulations, minimum lot size and frontage requirements, building setbacks, street access and width, utility availability, stormwater drainage, floodplain constraints, environmental regulations, and recording requirements.',
    difficulty: 'medium'
  },
  {
    domain: 'Areas of Practice',
    question: 'PLSS meander lines were originally established to:',
    options: ['Define the property boundary at a water body', 'Approximate the shoreline of navigable water bodies for the purpose of calculating acreage, not to establish a boundary', 'Mark the high water line precisely', 'Serve as easement boundaries'],
    correctAnswer: 1,
    explanation: 'Meander lines in the PLSS were run to approximate the shoreline of navigable water bodies for area computation purposes, not to establish the boundary. The actual boundary is the water\'s edge (at the ordinary high water mark for navigable waters), which may differ significantly from the meander line.',
    difficulty: 'hard'
  },
  {
    domain: 'Areas of Practice',
    question: 'A condominium survey typically includes:',
    options: ['Only the exterior building dimensions', 'Both the horizontal and vertical limits of each unit, common elements, and limited common elements', 'Only the lot boundary', 'Only parking space dimensions'],
    correctAnswer: 1,
    explanation: 'Condominium surveys define the three-dimensional limits of each unit (horizontal and vertical boundaries), common elements (shared spaces like lobbies, pools), limited common elements (balconies, parking spaces assigned to specific units), and the overall building footprint in relation to the parcel boundaries.',
    difficulty: 'hard'
  },
  {
    domain: 'Areas of Practice',
    question: 'LiDAR technology in surveying is used to:',
    options: ['Only measure distances between two known points', 'Rapidly collect millions of 3D surface points from an airborne or terrestrial platform', 'Only locate underground utilities', 'Only measure water depths'],
    correctAnswer: 1,
    explanation: 'LiDAR (Light Detection and Ranging) uses laser pulses to collect millions of 3D point measurements (point cloud) of the ground surface and above-ground features. It is used for topographic mapping, floodplain studies, corridor surveys, forestry, and creating digital elevation models over large areas.',
    difficulty: 'easy'
  },
  {
    domain: 'Areas of Practice',
    question: 'When a PLSS section has a water body on one side, the lots bordering the water are typically:',
    options: ['Exactly 40 acres each', 'Fractional lots (government lots) with areas computed from the meander line', 'Always 160 acres', 'Not surveyed'],
    correctAnswer: 1,
    explanation: 'Lots bordering navigable water bodies within PLSS sections are designated as "government lots" or fractional lots. Their areas are computed using the meander line as one boundary and are typically not standard aliquot parts. The actual boundary remains the water line, not the meander line.',
    difficulty: 'hard'
  },
  {
    domain: 'Areas of Practice',
    question: 'A pipeline survey typically involves:',
    options: ['Only the boundary of the property', 'Route selection, alignment staking, easement surveys, and as-built location of the installed pipeline', 'Only environmental studies', 'Only water flow measurements'],
    correctAnswer: 1,
    explanation: 'Pipeline surveys encompass multiple phases: route selection surveys (topographic and environmental), centerline alignment staking, easement and right-of-way surveys, construction staking (trench grade, offset stakes), and as-built surveys documenting the installed pipeline\'s horizontal and vertical position.',
    difficulty: 'medium'
  },
  {
    domain: 'Areas of Practice',
    question: 'A wetland delineation survey establishes:',
    options: ['Only the property boundary', 'The boundaries of wetland areas as identified by a qualified wetland scientist or biologist', 'Only water depth', 'Only soil types'],
    correctAnswer: 1,
    explanation: 'A wetland delineation survey locates and maps the boundaries of wetland areas as identified by a qualified wetland scientist using the federal (Army Corps) three-parameter approach (hydrology, hydric soils, and hydrophytic vegetation). The surveyor provides the geodetic framework and spatial mapping of the delineated boundaries.',
    difficulty: 'medium'
  },
  {
    domain: 'Areas of Practice',
    question: 'Terrestrial laser scanning (TLS) in surveying produces:',
    options: ['Only single point measurements', 'A dense 3D point cloud of the scanned environment', 'Only two-dimensional plans', 'Only photographic images'],
    correctAnswer: 1,
    explanation: 'Terrestrial laser scanning produces a dense 3D point cloud—millions of XYZ coordinate points—representing the surfaces of objects and terrain in the scanned area. The point cloud can be used for creating 3D models, measuring dimensions, detecting deformations, and producing topographic maps and as-built documents.',
    difficulty: 'easy'
  },
  {
    domain: 'Areas of Practice',
    question: 'An environmental site assessment may require the surveyor to:',
    options: ['Only assess property value', 'Locate property boundaries, map features, and identify areas of potential environmental concern', 'Only test soil samples', 'Only review aerial photographs'],
    correctAnswer: 1,
    explanation: 'The surveyor\'s role in an environmental site assessment typically includes locating property boundaries, mapping site features, identifying structures and improvements, locating potential sources of contamination (storage tanks, disposal areas), and providing base mapping for the environmental consultant\'s investigation.',
    difficulty: 'medium'
  },
  {
    domain: 'Areas of Practice',
    question: 'A partition survey divides:',
    options: ['Only government land', 'An existing parcel into two or more smaller parcels as directed by the owner or court order', 'Only subdivision lots', 'Only condominium units'],
    correctAnswer: 1,
    explanation: 'A partition survey divides an existing parcel into two or more separate parcels. It may be voluntary (requested by the owner) or involuntary (ordered by a court in a partition action). The surveyor must ensure the resulting parcels comply with zoning, subdivision regulations, and access requirements.',
    difficulty: 'easy'
  },
  {
    domain: 'Areas of Practice',
    question: 'In a subdivision, "building setback lines" define:',
    options: ['The property boundary', 'The minimum distance that structures must be set back from property lines, streets, or other features', 'The location of underground utilities', 'The maximum height of buildings'],
    correctAnswer: 1,
    explanation: 'Building setback lines establish the minimum distance between structures and property boundaries, streets, easements, or other features as required by zoning ordinances. Front, side, and rear setbacks may differ. Setback lines are typically shown on subdivision plats and must be verified on as-built surveys.',
    difficulty: 'easy'
  },
  {
    domain: 'Areas of Practice',
    question: 'A datum transformation is required when:',
    options: ['Using the same datum for all measurements', 'Converting coordinates from one geodetic datum to another (e.g., NAD 27 to NAD 83)', 'Using English units instead of metric', 'Measuring angles instead of distances'],
    correctAnswer: 1,
    explanation: 'A datum transformation mathematically converts coordinates from one geodetic reference system to another. This is necessary when combining data collected on different datums (e.g., NAD 27 to NAD 83) or when using GPS data (referenced to WGS 84) with local coordinate systems. Incorrect transformations introduce significant position errors.',
    difficulty: 'medium'
  },
  {
    domain: 'Areas of Practice',
    question: 'When staking a building foundation, the surveyor typically sets:',
    options: ['Only the center of the building', 'Offset stakes or batter boards at known distances from building corners to allow excavation and construction', 'Only the front door location', 'Only the elevation of the roof'],
    correctAnswer: 1,
    explanation: 'Building staking involves setting offset stakes or batter boards at known distances from the actual building corners. The offsets allow excavation and construction to proceed without disturbing the survey stakes. String lines stretched between batter boards define the exact building lines and elevations.',
    difficulty: 'medium'
  },
  {
    domain: 'Areas of Practice',
    question: 'A volume calculation for earthwork typically uses:',
    options: ['Only a planimeter', 'Cross-section (average end area) or surface-to-surface (grid or TIN) methods', 'Only visual estimation', 'Only property area calculations'],
    correctAnswer: 1,
    explanation: 'Earthwork volumes are commonly calculated using the average end area method (based on cross-sections) or surface-to-surface methods (using TIN or grid models comparing existing and proposed surfaces). The choice of method depends on project requirements, terrain complexity, and available data.',
    difficulty: 'medium'
  },
  {
    domain: 'Areas of Practice',
    question: 'An ALTA/NSPS survey differs from a standard boundary survey primarily in that it:',
    options: ['Uses different measurement equipment', 'Must meet nationally uniform minimum standards and includes additional items beyond a basic boundary survey', 'Is less accurate', 'Can only be performed in urban areas'],
    correctAnswer: 1,
    explanation: 'ALTA/NSPS surveys must meet nationally uniform minimum standards (regardless of state minimums), achieve specified positional accuracy, show improvements, easements, encroachments, rights-of-way, and other items. They are more comprehensive than basic boundary surveys and are designed for real estate transactions involving title insurance and lending.',
    difficulty: 'easy'
  },
  {
    domain: 'Areas of Practice',
    question: 'Solar observations for azimuth determination are used when:',
    options: ['GPS is not available', 'An independent check on direction is needed or when high-accuracy azimuth is required without GPS', 'Only at night', 'Only during eclipses'],
    correctAnswer: 1,
    explanation: 'Solar observations provide an independent method of determining true (geodetic) azimuth using the sun\'s position. They are useful as independent checks on GPS-derived azimuths, in areas where GPS reception is poor, or when regulations require astronomic azimuth observations. The method requires accurate time, position, and angular measurement.',
    difficulty: 'hard'
  },
  {
    domain: 'Areas of Practice',
    question: 'A utility survey locates:',
    options: ['Only property boundaries', 'The horizontal and vertical positions of above-ground and underground utilities', 'Only water mains', 'Only electrical lines'],
    correctAnswer: 1,
    explanation: 'A utility survey locates and maps all types of utilities including water, sewer, gas, electric, telecommunications, storm drains, and other facilities. Both above-ground (poles, transformers, manholes) and underground features are located using various methods (records, One-Call marking, GPR, electromagnetic locators).',
    difficulty: 'easy'
  },
  {
    domain: 'Areas of Practice',
    question: 'When performing a boundary survey in a recorded subdivision, the surveyor should check:',
    options: ['Only the lot being surveyed', 'The plat dimensions, surrounding lots, and overall plat geometry for consistency and evidence of the original survey', 'Only the county assessor\'s records', 'Only GPS coordinates'],
    correctAnswer: 1,
    explanation: 'A thorough subdivision boundary survey requires examining the entire plat geometry (not just the subject lot), locating monuments in surrounding lots, checking distances and angles for consistency with the plat, and resolving any discrepancies. Errors in the plat or missing monuments may affect the subject lot\'s boundaries.',
    difficulty: 'medium'
  },
  {
    domain: 'Areas of Practice',
    question: 'Differential leveling is used primarily to:',
    options: ['Measure horizontal distances', 'Determine differences in elevation between points', 'Measure horizontal angles', 'Locate property boundaries'],
    correctAnswer: 1,
    explanation: 'Differential leveling uses a level instrument and graduated rod to determine the difference in elevation between two or more points by measuring vertical distances (backsights and foresights). It is the most common and reliable method for establishing vertical control and determining elevations for construction, design, and mapping.',
    difficulty: 'easy'
  },
  {
    domain: 'Areas of Practice',
    question: 'A sewer invert elevation refers to:',
    options: ['The top of the sewer pipe', 'The inside bottom of the sewer pipe', 'The depth of the trench', 'The elevation of the manhole cover'],
    correctAnswer: 1,
    explanation: 'The invert elevation is the elevation of the inside bottom of a pipe (the lowest point of the internal cross-section). Invert elevations are critical for ensuring proper gravity flow in sewer systems. Surveyors establish invert elevations during construction staking and verify them during as-built surveys.',
    difficulty: 'easy'
  },
  {
    domain: 'Areas of Practice',
    question: 'A PLSS "standard parallel" (correction line) was established to:',
    options: ['Define state boundaries', 'Correct for the convergence of meridians as surveys progress north or south', 'Mark the location of mineral deposits', 'Establish elevation datums'],
    correctAnswer: 1,
    explanation: 'Standard parallels (correction lines) were established at intervals (typically every 24 miles) to correct for the convergence of meridians. Because meridians converge toward the poles, townships would become progressively smaller without correction. New measurements were initiated at standard parallels to maintain township sizes near the standard 36 square miles.',
    difficulty: 'hard'
  },

  // ===== ADDITIONAL BUSINESS PRACTICES (~45 questions) =====
  {
    domain: 'Business Practices',
    question: 'A fixed-fee contract for survey services is most appropriate when:',
    options: ['The scope is uncertain and likely to change', 'The scope is well-defined and the surveyor can accurately estimate the cost', 'The project involves extensive litigation support', 'The surveyor has never performed this type of work before'],
    correctAnswer: 1,
    explanation: 'Fixed-fee (lump sum) contracts work best when the scope is clearly defined and predictable, allowing the surveyor to accurately estimate the required effort. The surveyor bears the risk of cost overruns but benefits from efficiency gains. For projects with uncertain scope, time-and-materials contracts may be more appropriate.',
    difficulty: 'medium'
  },
  {
    domain: 'Business Practices',
    question: 'Time-and-materials billing is most appropriate when:',
    options: ['The project scope is exactly defined', 'The scope is uncertain or likely to change during the project', 'The client has a fixed budget that cannot be exceeded', 'The surveyor wants to guarantee the lowest price'],
    correctAnswer: 1,
    explanation: 'Time-and-materials contracts are appropriate when the scope is uncertain, the project may evolve, or the effort required is difficult to predict. The client pays for actual time and expenses incurred. This arrangement provides flexibility but requires trust, good communication, and regular progress reports to manage the client\'s expectations.',
    difficulty: 'medium'
  },
  {
    domain: 'Business Practices',
    question: 'Errors and Omissions (E&O) insurance for a survey firm:',
    options: ['Covers theft of survey equipment', 'Covers claims of professional negligence arising from errors or omissions in professional services', 'Covers worker injuries on the job', 'Is the same as general liability insurance'],
    correctAnswer: 1,
    explanation: 'E&O (professional liability) insurance covers claims arising from alleged professional negligence—errors or omissions in the surveyor\'s professional services that cause financial harm to a client or third party. It is separate from general liability (which covers bodily injury and property damage) and workers\' compensation.',
    difficulty: 'easy'
  },
  {
    domain: 'Business Practices',
    question: 'The "tail coverage" (extended reporting period) in an E&O policy is important because:',
    options: ['It extends the policy to cover more employees', 'It allows claims to be reported after the policy expires for incidents that occurred during the policy period', 'It reduces the deductible amount', 'It covers claims for work done before the policy was purchased'],
    correctAnswer: 1,
    explanation: 'E&O insurance is typically "claims-made," meaning coverage only applies if the claim is reported during the active policy period. Tail coverage (extended reporting period) allows the insured to report claims after the policy ends for errors that occurred while the policy was active. This is critical when a surveyor retires, changes firms, or switches insurers, as boundary disputes may not surface for years after the survey was performed.',
    difficulty: 'hard'
  },
  {
    domain: 'Business Practices',
    question: 'A "scope creep" in survey project management refers to:',
    options: ['A type of surveying error', 'Uncontrolled expansion of the project scope beyond the original agreement', 'The surveyor creeping through dense vegetation', 'A method of reducing project costs'],
    correctAnswer: 1,
    explanation: 'Scope creep occurs when additional work is performed beyond the original scope without corresponding adjustments to the fee, schedule, and contract. It erodes profitability and can delay the project. Scope creep is prevented through clear contract terms, written change orders, and proactive client communication.',
    difficulty: 'easy'
  },
  {
    domain: 'Business Practices',
    question: 'A change order in a survey contract is:',
    options: ['A verbal request to change the work', 'A written document modifying the scope, fee, and/or schedule of the original contract', 'A request to change the surveyor assigned to the project', 'A change in the client\'s contact information'],
    correctAnswer: 1,
    explanation: 'A change order is a formal written amendment to the original contract that documents changes to the scope, fee, and/or schedule. Both parties must agree to and sign the change order before the additional work is performed. Change orders protect both the surveyor and the client from misunderstandings about additional services.',
    difficulty: 'easy'
  },
  {
    domain: 'Business Practices',
    question: 'The "multiplier" used in fee estimation for professional services is:',
    options: ['The number of hours estimated for the project', 'A factor applied to direct labor cost to account for overhead and profit', 'The interest rate on borrowed funds', 'The number of employees on the project'],
    correctAnswer: 1,
    explanation: 'The multiplier (typically 2.5 to 3.5 for survey firms) is applied to direct labor costs to cover overhead expenses (rent, insurance, administration, equipment) and profit. For example, if direct labor cost is $40/hour and the multiplier is 3.0, the billing rate would be $120/hour.',
    difficulty: 'medium'
  },
  {
    domain: 'Business Practices',
    question: 'A sole proprietorship differs from an LLC in that:',
    options: ['A sole proprietorship provides more liability protection', 'A sole proprietorship exposes the owner to unlimited personal liability for business debts', 'An LLC cannot be used for surveying firms', 'A sole proprietorship is more complex to form'],
    correctAnswer: 1,
    explanation: 'A sole proprietorship provides no separation between the owner\'s personal assets and business liabilities—the owner has unlimited personal liability. An LLC (Limited Liability Company) provides liability protection for the owner\'s personal assets while offering pass-through taxation and operational flexibility.',
    difficulty: 'medium'
  },
  {
    domain: 'Business Practices',
    question: 'The critical path in project scheduling is:',
    options: ['The shortest sequence of tasks', 'The longest sequence of dependent tasks that determines the minimum project duration', 'The path with the fewest workers', 'The most dangerous path through the job site'],
    correctAnswer: 1,
    explanation: 'The critical path is the longest chain of dependent activities in a project schedule. It determines the minimum possible project duration. Any delay in a critical path activity delays the entire project. Project managers focus on critical path activities to ensure on-time completion.',
    difficulty: 'medium'
  },
  {
    domain: 'Business Practices',
    question: 'A Gantt chart in project management:',
    options: ['Shows only project costs', 'Displays project tasks as horizontal bars on a timeline showing start and end dates', 'Shows only employee assignments', 'Is used exclusively for construction projects'],
    correctAnswer: 1,
    explanation: 'A Gantt chart is a visual project scheduling tool that displays tasks as horizontal bars along a timeline. It shows task durations, start and end dates, dependencies between tasks, and progress. Gantt charts are widely used for communicating project schedules to clients and team members.',
    difficulty: 'easy'
  },
  {
    domain: 'Business Practices',
    question: 'The "utilization rate" for a survey firm measures:',
    options: ['Equipment usage as a percentage of capacity', 'The percentage of available employee hours that are billable to projects', 'The percentage of proposals that result in contracts', 'The ratio of field work to office work'],
    correctAnswer: 1,
    explanation: 'The utilization rate measures what percentage of an employee\'s available working hours are directly billable to client projects. A typical target utilization rate for technical staff is 75-85%. Non-billable time includes training, marketing, administration, and unbillable overhead activities.',
    difficulty: 'hard'
  },
  {
    domain: 'Business Practices',
    question: 'When a survey firm is acquired by another firm, the acquiring firm:',
    options: ['Automatically inherits all professional licenses of the acquired firm\'s employees', 'Should address record transfer, client notification, employee transition, and liability issues', 'Has no obligations to the acquired firm\'s clients', 'Automatically dissolves the acquired firm\'s liabilities'],
    correctAnswer: 1,
    explanation: 'An acquisition requires careful planning for record transfer and retention, client notification, employee licensing and transition, assumption or management of liabilities, contract assignments, and compliance with state licensing board requirements. Due diligence should address both assets and potential liabilities.',
    difficulty: 'hard'
  },
  {
    domain: 'Business Practices',
    question: 'Business development for a survey firm should include:',
    options: ['Only cold calling potential clients', 'Networking, referral cultivation, repeat client engagement, and demonstrating expertise through quality work', 'Only advertising in newspapers', 'Only responding to public bid invitations'],
    correctAnswer: 1,
    explanation: 'Effective business development combines multiple strategies: maintaining strong relationships with existing clients, networking through professional organizations, seeking referrals, participating in community events, developing expertise in niche areas, maintaining a professional web presence, and delivering consistently high-quality work.',
    difficulty: 'easy'
  },
  {
    domain: 'Business Practices',
    question: 'An accounts receivable aging report helps a survey firm:',
    options: ['Track employee vacation time', 'Monitor outstanding invoices and identify clients with overdue payments', 'Calculate depreciation on equipment', 'Determine employee bonus amounts'],
    correctAnswer: 1,
    explanation: 'An aging report categorizes outstanding invoices by how long they have been unpaid (current, 30 days, 60 days, 90+ days). This allows the firm to monitor cash flow, identify collection problems early, take timely action on overdue accounts, and assess the overall health of accounts receivable.',
    difficulty: 'medium'
  },
  {
    domain: 'Business Practices',
    question: 'A non-compete clause in a survey employee\'s contract:',
    options: ['Prevents the employee from ever working as a surveyor again', 'Restricts the employee from competing with the firm for a defined period and geographic area after leaving', 'Is always unenforceable', 'Applies only to firm owners'],
    correctAnswer: 1,
    explanation: 'A non-compete clause restricts a departing employee from competing with the firm within a specified geographic area for a specified time period. Enforceability varies by state and depends on the reasonableness of the restrictions in terms of duration, geographic scope, and scope of restricted activities.',
    difficulty: 'medium'
  },
  {
    domain: 'Business Practices',
    question: 'Professional development plans for survey employees should:',
    options: ['Only address field skills', 'Identify career goals, training needs, licensure pathways, and growth opportunities', 'Only be created for managers', 'Only focus on billable skills'],
    correctAnswer: 1,
    explanation: 'Professional development plans should identify individual career goals, assess current skills and competency gaps, plan training and education activities, outline licensure preparation, and create opportunities for growth through increasingly responsible assignments. This benefits both the employee and the firm through improved retention and competency.',
    difficulty: 'easy'
  },
  {
    domain: 'Business Practices',
    question: 'The "break-even analysis" for a survey firm determines:',
    options: ['The point at which equipment should be replaced', 'The revenue level at which total costs equal total revenue (no profit or loss)', 'The number of employees needed', 'The ideal billing rate for all projects'],
    correctAnswer: 1,
    explanation: 'Break-even analysis identifies the revenue level at which total costs (fixed and variable) equal total revenue, resulting in zero profit or loss. Understanding the break-even point helps the firm set revenue targets, evaluate pricing strategies, and make informed decisions about overhead spending and staffing.',
    difficulty: 'medium'
  },
  {
    domain: 'Business Practices',
    question: 'A "key person" insurance policy for a survey firm protects against:',
    options: ['Employee theft', 'Financial loss resulting from the death or disability of an essential employee or owner', 'Natural disasters', 'Equipment breakdown'],
    correctAnswer: 1,
    explanation: 'Key person insurance compensates the firm for financial losses that would result from the death or disability of a key employee (typically the owner or principal surveyor). The policy helps the firm survive the loss by covering lost revenue, recruitment costs, and business transition expenses during a critical period.',
    difficulty: 'hard'
  },
  {
    domain: 'Business Practices',
    question: 'Subcontracting survey work requires the firm to:',
    options: ['Accept no responsibility for the subcontractor\'s work', 'Maintain quality oversight, verify insurance, and ensure the subcontractor meets professional standards', 'Avoid notifying the client', 'Pay the subcontractor in advance'],
    correctAnswer: 1,
    explanation: 'When subcontracting, the prime firm retains responsibility for the quality and accuracy of all deliverables. The firm should verify the subcontractor\'s licensure, insurance, and qualifications, establish clear scope and standards, maintain quality oversight, and disclose the subcontracting arrangement to the client when required.',
    difficulty: 'medium'
  },
  {
    domain: 'Business Practices',
    question: 'A "proposal win rate" metric measures:',
    options: ['The number of proposals submitted per month', 'The percentage of submitted proposals that result in awarded contracts', 'The speed at which proposals are prepared', 'The total dollar value of all proposals'],
    correctAnswer: 1,
    explanation: 'The win rate (proposals awarded divided by proposals submitted) helps the firm evaluate its marketing effectiveness, pricing competitiveness, and client targeting. A very low win rate may indicate pricing problems, poor targeting, or quality issues. A very high win rate may suggest the firm is not pursuing enough opportunities or pricing too low.',
    difficulty: 'medium'
  },
  {
    domain: 'Business Practices',
    question: 'Equipment depreciation for a survey firm is:',
    options: ['Not a real cost since the equipment still works', 'The systematic allocation of equipment cost over its useful life, representing a real cost of doing business', 'Only relevant for tax purposes', 'Only calculated on vehicles'],
    correctAnswer: 1,
    explanation: 'Depreciation represents the decline in value of equipment over time due to wear, obsolescence, and aging. It is a real cost of doing business that must be included in overhead calculations and fee estimation. Common methods include straight-line and accelerated depreciation. Depreciation also provides tax deductions.',
    difficulty: 'medium'
  },
  {
    domain: 'Business Practices',
    question: 'When establishing a new survey firm, the first priorities should include:',
    options: ['Purchasing the most expensive equipment available', 'Obtaining proper licensure, insurance, and establishing a business entity and accounting system', 'Hiring the maximum number of employees immediately', 'Renting the largest available office space'],
    correctAnswer: 1,
    explanation: 'Starting a survey firm requires proper professional licensure, business entity formation (LLC, corporation, etc.), adequate insurance (E&O, general liability, workers\' comp), a reliable accounting system, initial equipment procurement, and compliance with all regulatory requirements before actively pursuing work.',
    difficulty: 'easy'
  },
  {
    domain: 'Business Practices',
    question: 'A client satisfaction survey helps a survey firm:',
    options: ['Only satisfy ISO certification requirements', 'Identify strengths, weaknesses, and areas for improvement in service delivery', 'Only generate marketing content', 'Only meet government contract requirements'],
    correctAnswer: 1,
    explanation: 'Client satisfaction surveys provide valuable feedback about the firm\'s performance, communication, timeliness, accuracy, and overall service quality. This information helps identify areas for improvement, demonstrates commitment to quality, and can reveal opportunities for additional services or referrals.',
    difficulty: 'easy'
  },
  {
    domain: 'Business Practices',
    question: 'The concept of "value-based pricing" for survey services means:',
    options: ['Always charging the lowest possible fee', 'Setting fees based on the value the services provide to the client, rather than solely on the cost to provide them', 'Charging whatever the surveyor wants', 'Only billing for direct labor hours'],
    correctAnswer: 1,
    explanation: 'Value-based pricing considers the value that the survey services deliver to the client (e.g., enabling a multi-million dollar real estate transaction) rather than pricing solely based on the surveyor\'s costs. This approach recognizes that the same amount of survey work may have significantly different value depending on the project context.',
    difficulty: 'hard'
  },
  {
    domain: 'Business Practices',
    question: 'A safety program for a survey firm should address:',
    options: ['Only office safety', 'Field hazards (traffic, terrain, weather, wildlife), equipment safety, vehicle operations, and emergency procedures', 'Only equipment maintenance', 'Only compliance with OSHA requirements'],
    correctAnswer: 1,
    explanation: 'A comprehensive safety program addresses all aspects of survey operations: field hazards (traffic, terrain, extreme weather, wildlife, vegetation), equipment safety (proper use and maintenance), vehicle operations, personal protective equipment, heat/cold stress, emergency procedures, and compliance with OSHA and other regulations.',
    difficulty: 'easy'
  },
  {
    domain: 'Business Practices',
    question: 'The "backlog" of a survey firm refers to:',
    options: ['Overdue projects that are behind schedule', 'The total dollar value of contracted work that has not yet been completed', 'The number of unsatisfied clients', 'Past-due accounts receivable'],
    correctAnswer: 1,
    explanation: 'Backlog is the total value of contracted work remaining to be performed. It is a key indicator of the firm\'s future workload and revenue. Monitoring backlog helps with staffing decisions, business development priorities, and financial planning. A healthy backlog provides stability and predictability.',
    difficulty: 'medium'
  },
  {
    domain: 'Business Practices',
    question: 'A dispute resolution clause in a survey contract may specify:',
    options: ['Only litigation in court', 'Mediation, arbitration, or litigation as methods for resolving disputes between the parties', 'That all disputes are automatically decided in favor of the surveyor', 'Only negotiation between the parties'],
    correctAnswer: 1,
    explanation: 'Dispute resolution clauses may specify a progression of methods: negotiation, mediation (non-binding facilitated discussion), arbitration (binding decision by a neutral arbitrator), or litigation. Many contracts require mediation before arbitration or litigation. Alternative dispute resolution methods are often faster and less expensive than litigation.',
    difficulty: 'medium'
  },
  {
    domain: 'Business Practices',
    question: 'Cash flow management for a survey firm involves:',
    options: ['Only tracking the bank balance', 'Monitoring incoming revenue, managing expenses, timing of payments, and maintaining adequate working capital', 'Only billing at the end of each project', 'Only reviewing annual financial statements'],
    correctAnswer: 1,
    explanation: 'Effective cash flow management requires monitoring accounts receivable, controlling expenses, timing of vendor payments, progress billing on large projects, maintaining adequate working capital reserves, establishing lines of credit for seasonal fluctuations, and projecting future cash needs.',
    difficulty: 'medium'
  },
  {
    domain: 'Business Practices',
    question: 'An employee handbook for a survey firm should include:',
    options: ['Only the firm\'s billing rates', 'Employment policies, safety procedures, code of conduct, benefits, and operational procedures', 'Only holiday schedules', 'Only the organizational chart'],
    correctAnswer: 1,
    explanation: 'An employee handbook communicates the firm\'s expectations and policies including employment terms, safety procedures, code of conduct and ethics, benefits information, time off policies, equipment use, field procedures, confidentiality requirements, and dispute resolution processes. It protects both the firm and employees.',
    difficulty: 'easy'
  },
  {
    domain: 'Business Practices',
    question: 'Professional liability claims against surveyors most commonly arise from:',
    options: ['Charging too much for services', 'Boundary location errors and failure to discover or report encroachments and easements', 'Having too many employees', 'Using GPS equipment'],
    correctAnswer: 1,
    explanation: 'The most common professional liability claims against surveyors involve boundary errors (incorrect location of property lines), failure to discover or report encroachments, failure to identify or show recorded easements, and errors in elevation determinations. These errors can result in significant financial harm to clients and third parties.',
    difficulty: 'medium'
  },
  {
    domain: 'Business Practices',
    question: 'A "tail coverage" (extended reporting period) in an E&O policy:',
    options: ['Provides coverage during an employee\'s vacation', 'Extends the period during which claims can be reported after the policy expires or is cancelled', 'Covers only equipment damage', 'Only applies to government contracts'],
    correctAnswer: 1,
    explanation: 'Tail coverage (also called an extended reporting period endorsement) allows claims to be reported after a claims-made E&O policy has been cancelled or not renewed. Since professional liability claims may arise years after the work was performed, tail coverage provides continued protection for past work when changing insurers or retiring.',
    difficulty: 'hard'
  },
  {
    domain: 'Business Practices',
    question: 'Mentoring programs in a survey firm benefit the firm by:',
    options: ['Only satisfying licensing board requirements', 'Developing future leaders, transferring institutional knowledge, and improving employee retention', 'Only reducing training costs', 'Only meeting government contract requirements'],
    correctAnswer: 1,
    explanation: 'Mentoring programs accelerate professional development, transfer critical institutional knowledge from experienced professionals to newer employees, improve employee engagement and retention, prepare future firm leaders, and help maintain consistent quality standards and professional culture across generations of practitioners.',
    difficulty: 'easy'
  },
  {
    domain: 'Business Practices',
    question: 'A "not-to-exceed" (NTE) contract provides:',
    options: ['A guaranteed minimum fee for the surveyor', 'A maximum fee cap while billing on a time-and-materials basis up to that cap', 'No fee limit', 'A fixed fee with no flexibility'],
    correctAnswer: 1,
    explanation: 'A not-to-exceed contract sets a maximum fee while allowing time-and-materials billing up to that cap. This provides the client with cost certainty (the fee will not exceed the NTE amount) while giving the surveyor flexibility to bill actual time. If the work is completed for less, the client pays only the actual amount.',
    difficulty: 'medium'
  },
  {
    domain: 'Business Practices',
    question: 'The "direct labor ratio" for a survey firm compares:',
    options: ['Total revenue to total expenses', 'Direct labor costs (field and technical staff) to total labor costs (including administrative and management)', 'The number of field employees to office employees', 'Revenue per employee to industry average'],
    correctAnswer: 1,
    explanation: 'The direct labor ratio measures the proportion of total labor costs that are directly billable to projects versus indirect (overhead) labor. A healthy ratio varies by firm size but typically ranges from 55-70%. Too low a ratio indicates excessive overhead staffing; too high may indicate insufficient management and administrative support.',
    difficulty: 'hard'
  },
  {
    domain: 'Business Practices',
    question: 'When a survey firm transitions from a sole proprietorship to an LLC, the primary benefit is:',
    options: ['Reduced tax obligations', 'Separation of the owner\'s personal assets from business liabilities', 'Elimination of all business risks', 'Automatic licensing in additional states'],
    correctAnswer: 1,
    explanation: 'The primary benefit of forming an LLC is the separation of personal and business assets, providing limited liability protection. The owner\'s personal assets (home, savings) are generally protected from business creditors and lawsuits. However, the owner remains personally liable for their own professional malpractice in most states.',
    difficulty: 'medium'
  },
  {
    domain: 'Business Practices',
    question: 'A SWOT analysis for a survey firm evaluates:',
    options: ['Only employee satisfaction', 'Strengths, Weaknesses, Opportunities, and Threats to inform strategic planning', 'Only financial performance', 'Only equipment condition'],
    correctAnswer: 1,
    explanation: 'SWOT analysis evaluates the firm\'s internal Strengths (expertise, reputation) and Weaknesses (skill gaps, equipment age) along with external Opportunities (market growth, new services) and Threats (competition, regulatory changes). This framework guides strategic planning, business development, and investment decisions.',
    difficulty: 'medium'
  },
  {
    domain: 'Business Practices',
    question: 'The statute of repose differs from the statute of limitations in that:',
    options: ['They are the same thing', 'The statute of repose begins running from project completion regardless of when the injury is discovered', 'The statute of repose has no time limit', 'The statute of repose only applies to government projects'],
    correctAnswer: 1,
    explanation: 'The statute of repose sets an absolute deadline (e.g., 10 years from project completion) after which no claim can be brought, regardless of when the injury or defect is discovered. The statute of limitations, by contrast, typically begins running when the injury is discovered or should have been discovered.',
    difficulty: 'hard'
  },
  {
    domain: 'Business Practices',
    question: 'A quality management system (QMS) for a survey firm:',
    options: ['Only satisfies ISO requirements', 'Provides a systematic framework for maintaining consistent quality across all firm operations', 'Only applies to large firms', 'Only addresses equipment calibration'],
    correctAnswer: 1,
    explanation: 'A QMS provides a comprehensive framework of policies, procedures, and standards that govern all aspects of the firm\'s operations to ensure consistent quality. It includes document control, training requirements, calibration procedures, work processes, client communication protocols, corrective action procedures, and continuous improvement mechanisms.',
    difficulty: 'hard'
  },
  {
    domain: 'Business Practices',
    question: 'Vehicle and equipment maintenance records for a survey firm are important for:',
    options: ['Only insurance purposes', 'Equipment reliability, safety compliance, depreciation tracking, and operational cost analysis', 'Only resale value', 'Only tax deductions'],
    correctAnswer: 1,
    explanation: 'Maintenance records document the care and condition of firm assets, support equipment reliability and uptime, demonstrate compliance with safety requirements, support depreciation calculations, provide data for replacement planning, and serve as evidence of proper care in the event of liability claims.',
    difficulty: 'easy'
  },
  {
    domain: 'Business Practices',
    question: 'A partnership agreement for a survey firm should address:',
    options: ['Only the firm name', 'Capital contributions, profit sharing, decision-making authority, dispute resolution, and dissolution procedures', 'Only the office location', 'Only employee hiring practices'],
    correctAnswer: 1,
    explanation: 'A comprehensive partnership agreement addresses capital contributions, profit and loss allocation, management authority and voting rights, partner compensation, non-compete provisions, admission of new partners, withdrawal or death of a partner, dispute resolution, and dissolution procedures.',
    difficulty: 'medium'
  },
  {
    domain: 'Business Practices',
    question: 'When bidding on government survey contracts, the surveyor must comply with:',
    options: ['Only the firm\'s internal policies', 'Procurement regulations, qualification requirements, and specific contract terms and conditions', 'Only the lowest price requirement', 'Only the client\'s verbal instructions'],
    correctAnswer: 1,
    explanation: 'Government contracts are subject to specific procurement regulations that govern the solicitation, evaluation, and award process. The surveyor must comply with qualification-based selection requirements (in many jurisdictions), DBE/MBE/WBE participation goals, prevailing wage requirements, insurance minimums, and specific contract terms.',
    difficulty: 'medium'
  },
  {
    domain: 'Business Practices',
    question: 'The Brooks Act requires federal agencies to select:',
    options: ['The lowest bidder for all projects', 'Architects, engineers, and surveyors based on qualifications rather than price alone', 'Only large firms for federal projects', 'Only firms with military experience'],
    correctAnswer: 1,
    explanation: 'The Brooks Act (Public Law 92-582) requires federal agencies to select architects, engineers, and surveyors based on qualifications (competence, experience, and capacity) rather than price competition alone. Fee negotiation occurs only after the most qualified firm is selected. Many states have adopted similar qualification-based selection laws.',
    difficulty: 'hard'
  },
  {
    domain: 'Business Practices',
    question: 'A certificate of insurance provided by a survey firm to a client:',
    options: ['Guarantees the work will be error-free', 'Provides evidence that the firm maintains specified types and levels of insurance coverage', 'Transfers the firm\'s insurance to the client', 'Is only required for government projects'],
    correctAnswer: 1,
    explanation: 'A certificate of insurance is a document issued by the firm\'s insurance carrier that verifies the types and limits of insurance coverage the firm maintains (E&O, general liability, auto, workers\' comp). Clients and project owners commonly require certificates as a condition of contract. The certificate does not transfer coverage to the client.',
    difficulty: 'easy'
  },
  {
    domain: 'Business Practices',
    question: 'Strategic planning for a survey firm should be reviewed and updated:',
    options: ['Only when the firm is losing money', 'Regularly (at least annually) to reflect changes in the market, industry, and firm capabilities', 'Only at firm inception', 'Only when required by the licensing board'],
    correctAnswer: 1,
    explanation: 'Strategic planning should be an ongoing process reviewed at least annually. The plan should address the firm\'s mission, vision, goals, market analysis, competitive positioning, service offerings, staffing plan, technology investments, and financial projections. Regular updates ensure the plan remains relevant and actionable.',
    difficulty: 'easy'
  },
  {
    domain: 'Standards and Specifications',
    question: 'Under the 2026 ALTA/NSPS standards, if a surveyor discovers a recorded easement not listed in the title evidence provided, the surveyor must:',
    options: ['Ignore it since it was not in the title commitment', 'Advise the insurer prior to delivery and show it on the plat unless evidence of termination is provided', 'File a report with the county recorder', 'Refuse to complete the survey until the title commitment is amended'],
    correctAnswer: 1,
    explanation: 'Section 6.C.viii of the 2026 ALTA/NSPS standards states that if in the process of preparing the survey the surveyor becomes aware of a recorded easement not otherwise listed in the title evidence provided, the surveyor must advise the insurer prior to delivery of the plat or map and, unless the insurer provides evidence that the easement has been terminated or extinguished, show or otherwise explain it on the face of the plat or map with a note that the insurer has been advised.',
    difficulty: 'medium'
  },
  {
    domain: 'Standards and Specifications',
    question: 'The 2026 ALTA/NSPS standards require the surveyor to include which new contact information on the plat or map?',
    options: ['Social media accounts', 'Company website and email address', 'Personal cell phone number', 'Professional references'],
    correctAnswer: 1,
    explanation: 'Section 6.D.ii.(h) of the 2026 ALTA/NSPS standards now requires the surveyor\'s company website and email address (if any) to be shown on the plat, in addition to the previously required name, registration/license number, signature, seal, street address, and telephone number. This expands the contact information requirements from the 2021 standards.',
    difficulty: 'easy'
  },
  {
    domain: 'Standards and Specifications',
    question: 'Table A Item 15 of the 2026 ALTA/NSPS standards addresses the use of imagery on surveys. Before using imagery, the surveyor must do all of the following EXCEPT:',
    options: ['Agree with the client in writing on source, date, and licensing of imagery', 'Discuss accuracy and precision ramifications with insurer, lender, and client', 'Obtain written approval from the title insurance underwriter for each image used', 'Place a note on the plat explaining source, date, precision, and qualifications of imagery'],
    correctAnswer: 2,
    explanation: 'Table A Item 15 (new in 2026) requires three things: (a) written agreement with the client on imagery source, date/version, and licensing, (b) discussion of ramifications (accuracy, precision, completeness) with insurer, lender, and client prior to the survey, and (c) a note on the face of the survey about the imagery. Individual underwriter approval for each image is not required.',
    difficulty: 'medium'
  },
  {
    domain: 'Standards and Specifications',
    question: 'Under the 2026 ALTA/NSPS standards, Table A Item 20 requires the surveyor to prepare an encroachment summary table. Which of the following must be included in the table?',
    options: ['Monetary damages caused by each encroachment', 'Potential encroachments over boundary lines and into easements, rights of way, and setback lines', 'Legal opinions on the validity of each encroachment', 'Recommendations for resolving each encroachment'],
    correctAnswer: 1,
    explanation: 'Table A Item 20 (new in 2026) requires a summary table identifying: potential encroachments over boundary lines onto/from adjoining property, encroachments into rights of way and easements, encroachments into setback lines (when provided per Item 6), physical access between parcels without documented easements, and use of adjoining parcels without documented easements. The table must provide a means to locate conditions on the plat. It does not require legal opinions, monetary damages, or resolution recommendations.',
    difficulty: 'medium'
  },
  {
    domain: 'Standards and Specifications',
    question: 'The 2026 ALTA/NSPS standards added Section 5.F requiring the surveyor to locate:',
    options: ['All trees and vegetation on the property', 'Cemeteries, burial grounds, and isolated gravesites', 'Underground storage tanks', 'Historic structures eligible for preservation'],
    correctAnswer: 1,
    explanation: 'Section 5.F of the 2026 ALTA/NSPS standards explicitly requires the surveyor to locate, as accurately as the evidence permits, the perimeter of cemeteries and burial grounds, and the location of isolated gravesites not within a cemetery or burial ground. This applies to both those disclosed in documents provided to the surveyor and those observed during fieldwork. This was a new addition not found in the 2021 standards.',
    difficulty: 'easy'
  },
];

