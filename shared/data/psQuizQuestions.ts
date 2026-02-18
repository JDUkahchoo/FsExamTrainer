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
    question: 'The 2021 ALTA/NSPS Land Title Survey standards require a minimum positional tolerance of:',
    options: ['0.50 feet', '0.07 feet plus 50 ppm', '0.10 feet', '1.00 feet'],
    correctAnswer: 1,
    explanation: 'The 2021 ALTA/NSPS standards specify a Relative Positional Precision of 0.07 feet (2 cm) plus 50 ppm. This means for a 1,000-foot measurement, the tolerance is 0.07 + (50 × 0.001) = 0.12 feet. This is a significant accuracy requirement that typically requires precise equipment and methods.',
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
    explanation: 'The ALTA/NSPS certification is addressed to specific parties: typically the client (buyer/owner), the lender, and the title insurance company. Additional parties may be added as negotiated. The certification states that the survey was performed in accordance with the 2021 ALTA/NSPS standards.',
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
    explanation: 'The 2021 ALTA/NSPS standards require the surveyor to show all improvements on the property and within 5 feet of the boundary lines that are observed during the field survey. This includes buildings, fences, walls, utilities, driveways, and other visible improvements, as well as any encroachments across boundary lines.',
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
    question: 'Under the 2021 ALTA/NSPS standards, the surveyor must report the datum and adjustment used for:',
    options: ['All surveys regardless of Table A selections', 'Only when Table A Item 20 is requested', 'Only GPS surveys', 'Only state plane coordinate surveys'],
    correctAnswer: 0,
    explanation: 'The 2021 ALTA/NSPS standards require that if coordinates are shown on the survey, the datum, adjustment, and zone must be reported on the survey plat. This is a minimum requirement for all ALTA/NSPS surveys, regardless of which Table A items are selected.',
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
    question: 'The purpose of an ALTA/NSPS Table A Item 19 (Offsite Easements) is to:',
    options: ['Survey easements located entirely off the subject property', 'Identify easements visible from the property', 'Survey all roads adjacent to the property', 'Map underground utilities off the property'],
    correctAnswer: 0,
    explanation: 'Table A Item 19 requires the surveyor to survey, locate, and show on the plat any offsite easements or servitudes that benefit the subject property (appurtenant easements), such as access easements or utility easements that cross neighboring properties.',
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
    question: 'The 2021 ALTA/NSPS standards require that the survey plat show the relationship of the property to:',
    options: ['The nearest school', 'Adjoining properties (record owners if ascertainable)', 'The nearest fire station', 'The county seat'],
    correctAnswer: 1,
    explanation: 'The 2021 ALTA/NSPS standards require showing the names of adjoining property owners (if reasonably ascertainable from public records) and the relationship of the subject property to adjoining parcels. This helps the title company identify potential boundary issues and encroachments.',
    difficulty: 'medium'
  },
  {
    domain: 'Standards and Specifications',
    question: 'According to ALTA/NSPS standards, the basis of bearings must be:',
    options: ['Assumed north in all cases', 'Disclosed on the plat with reference to its source', 'Always magnetic north', 'Always true north from GPS'],
    correctAnswer: 1,
    explanation: 'The 2021 ALTA/NSPS standards require that the basis of bearings be clearly identified on the survey plat and its source disclosed. This may be geodetic north, grid north (state plane), record bearings, or other source, but it must be clearly stated so others can properly interpret the survey.',
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
];

