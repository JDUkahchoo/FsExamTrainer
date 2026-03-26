import type { ReadingModule } from '../schema';

export const STUDY_READINGS_BUSINESS_SAFETY: ReadingModule[] = [
  {
    id: 'fs-d15-business-safety',
    examTrack: 'fs',
    domainNumber: 6,
    domain: 'Professional Practice',
    title: 'Business Concepts, Safety & Professional Communication',
    description: 'Review the business, safety, and communication concepts tested in the Professional Practice domain of the FS exam, including fee structures, contract types, risk management, OSHA and jobsite safety, traffic control, and professional report writing standards.',
    estimatedMinutes: 18,
    sections: [
      {
        id: 'fs-d15-bus-s1',
        type: 'concept',
        title: 'Survey Business Structures and Fee Arrangements',
        content: 'Surveying practices may operate under several business structures, each with different liability and tax implications:\n\nSole Proprietorship: The surveyor and the business are legally the same entity. Simple to establish, but the owner is personally liable for all obligations.\n\nPartnership: Two or more professionals share ownership and liability. A general partnership makes all partners personally liable. A limited liability partnership (LLP) limits personal liability for most professional acts.\n\nProfessional Corporation (PC) or Professional Limited Liability Company (PLLC): Provides liability protection for the owners (shareholders or members) for general business debts, though licensed professionals remain personally liable for their own professional acts of negligence.\n\nFee Arrangements:\n- Fixed Fee (Lump Sum): A predetermined total fee for a defined scope of services. Rewards efficiency and creates a clear budget for the client, but the surveyor bears all cost risk if the scope expands.\n- Hourly Rate (Time and Materials): The client pays for actual time and materials expended. Appropriate when the scope is unclear. The client bears cost risk.\n- Cost Plus Fixed Fee: Actual costs are reimbursed plus a fixed professional fee. Common in government contracting.\n- Unit Price: A fee per deliverable unit (e.g., per lot staked, per monument set). Simple to administer for repetitive work.\n- Retainer: A recurring fee for ongoing availability of services.\n\nFor the FS exam, be familiar with how fee type affects risk allocation between the surveyor and client, and when each fee type is most appropriate.',
        bookRefs: [
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic X, Ch 42', topic: 'Business structures and fee types for survey practices' },
        ],
      },
      {
        id: 'fs-d15-bus-s2',
        type: 'concept',
        title: 'Contracts for Survey Services',
        content: 'A contract is a legally binding agreement between two or more parties that defines mutual obligations. For surveying services, a well-drafted contract should include:\n\n1. Scope of Services: A precise description of what the surveyor will do — including the type of survey (boundary, topographic, ALTA/NSPS, construction staking), deliverables (plat, CAD file, field notes, certifications), and what is explicitly excluded.\n\n2. Standards and Specifications: Reference to applicable standards (ALTA/NSPS, state minimum technical standards, ASCE, FGDC accuracy standards).\n\n3. Compensation: The fee arrangement, payment schedule, and provisions for additional services beyond the original scope.\n\n4. Timeline: Milestones, delivery dates, and what happens if the client causes delays.\n\n5. Ownership of Documents: Who owns the drawings, CAD files, and field data? Generally, the client pays for the deliverables but the surveyor retains professional responsibility for the original survey data.\n\n6. Limitation of Liability: A clause capping the surveyor\'s maximum liability (often equal to the fee paid) for negligent acts. Enforceability varies by jurisdiction.\n\n7. Dispute Resolution: Mediation, arbitration, or litigation provisions.\n\nA change order documents modifications to the original scope. All scope changes should be documented in writing before additional work begins.\n\nThe absence of a written contract does not eliminate legal obligations — an oral contract may be enforceable — but written contracts reduce misunderstandings and protect both parties.',
        bookRefs: [
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic X, Ch 42-43', topic: 'Contract management and professional liability' },
        ],
      },
      {
        id: 'fs-d15-bus-s3',
        type: 'concept',
        title: 'Professional Liability and Risk Management',
        content: 'Surveyors face two major categories of professional risk:\n\n1. Errors and Omissions (E&O) Liability:\nAlso called professional liability, this is liability for negligent professional acts — mistakes, oversights, or failures to meet the standard of care. Common causes of E&O claims:\n- Boundary errors leading to encroachments or overlap\n- Failure to locate easements or encroachments\n- Incorrect elevations on construction projects causing re-work\n- Failure to disclose known title issues\n\nE&O insurance covers claims arising from professional acts. The policy must be active (or have a retroactive date) at the time the claim is made.\n\n2. General Liability:\nCovers bodily injury and property damage caused by field operations — a crew member\'s vehicle accident, a worker injured on a client\'s property, or equipment that damages a facility.\n\nRisk Management Strategies:\n- Maintain current E&O and general liability insurance\n- Use written contracts with clear scope definitions and limitation of liability clauses\n- Document all work thoroughly (field notes, photos, correspondence)\n- Perform peer review of complex boundary determinations before delivery\n- Decline projects outside the firm\'s area of competence\n- Manage client expectations proactively when complications arise\n- Maintain continuing education to stay current with standards and technology\n\nStatute of limitations for surveying claims typically runs from the date of discovery of the error (discovery rule), not the date the work was performed, which can expose surveyors to claims for many years.',
        bookRefs: [
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic X, Ch 43', topic: 'Professional liability and risk management' },
        ],
      },
      {
        id: 'fs-d15-bus-s4',
        type: 'concept',
        title: 'Jobsite Safety — OSHA and Traffic Control',
        content: 'Surveyors regularly work in hazardous environments, including active roadways, construction sites, and remote terrain. The FS exam tests awareness of basic safety requirements.\n\nOSHA (Occupational Safety and Health Administration):\n- OSHA standards apply to all private employers in the United States\n- Part 1926 covers construction safety (applicable to most survey field operations on construction sites)\n- Workers must be trained in the hazards specific to their job\n- Employers must maintain a hazard communication program (right-to-know)\n\nPersonal Protective Equipment (PPE) Required on Survey Sites:\n- High-visibility (hi-vis) safety vests or clothing (ANSI/ISEA Class 2 or 3 for roadway work)\n- Hard hats in areas with overhead hazards\n- Safety-toed footwear on construction sites\n- Eye and hearing protection as required\n\nTraffic Control for Survey Crews in the Right-of-Way:\n- Must comply with the MUTCD (Manual on Uniform Traffic Control Devices)\n- Typical setup for survey work in a travel lane: advance warning signs, channelizing devices (cones, drums), flaggers as required\n- Shadow vehicles (trucks with arrow boards or attenuators) protect survey crews from rear-end collisions\n- Safety vests must meet ANSI/ISEA Class 2 minimum (Class 3 for high-speed roadways)\n\nExcavation Safety:\n- Any excavation deeper than 5 feet in an unstable material requires a protective system (shoring, shielding, or sloping)\n- All excavations must be inspected by a competent person before workers enter\n\nHeat and Cold Stress:\n- Surveyors are at risk for heat exhaustion and heat stroke during summer fieldwork\n- Water, rest, and shade are the primary countermeasures for heat stress',
        bookRefs: [
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic X, Ch 44', topic: 'Safety and OSHA requirements for survey field operations' },
        ],
      },
      {
        id: 'fs-d15-bus-s5',
        type: 'knowledge_check',
        title: 'Safety Standards Check',
        knowledgeCheck: {
          question: 'A survey crew is performing control surveys on an active roadway with posted speed limit of 55 mph. According to MUTCD guidelines, what is the minimum ANSI/ISEA safety vest classification required for crew members?',
          options: [
            'Class 1 — basic visibility is sufficient for rural roadways',
            'Class 2 — required for roadway work where vehicles travel up to 50 mph',
            'Class 3 — required for high-speed roadway environments (typically above 50 mph)',
            'No vest required if crew is behind guardrail'
          ],
          correctIndex: 2,
          explanation: 'MUTCD and OSHA guidelines require ANSI/ISEA Class 3 high-visibility garments for workers in roadway environments where vehicle speeds exceed 50 mph (or in complex traffic patterns at any speed). Class 3 garments have more retroreflective material and higher background material area than Class 2, providing maximum visibility to approaching drivers. Surveyors working on 55 mph highways must wear Class 3 vests.',
        },
      },
      {
        id: 'fs-d15-bus-s6',
        type: 'concept',
        title: 'Professional Communication and Report Writing',
        content: 'Professional surveyors must communicate technical information clearly and accurately to clients, attorneys, engineers, and the public. The FS exam tests basic professional communication concepts.\n\nSurvey Reports and Correspondence:\n- Must be accurate, objective, and factual\n- Should avoid ambiguous language that could be misinterpreted\n- Technical terms should be defined or explained for non-technical recipients\n- Certifications and opinions must be clearly distinguished from factual findings\n\nSurvey Certifications and Statements:\nA certification on a survey plat is the surveyor\'s professional statement that the survey was performed in accordance with applicable standards. The surveyor\'s seal and signature make the certification binding.\n\nA Surveyor\'s Report (sometimes called a Letter of Opinion) is a narrative document that describes the basis for the surveyor\'s boundary determination, conflicts found in the record, and the professional judgment applied. It is distinct from the plat and provides context that cannot be shown graphically.\n\nProject Correspondence Best Practices:\n- Confirm all significant decisions in writing (email is acceptable)\n- Document client instructions that may affect survey scope or approach\n- Report discoveries of unexpected conditions (encroachments, overlaps, easements not of record) promptly and in writing\n- Avoid making commitments outside the surveyor\'s authority or expertise\n\nRecord Retention:\nMost jurisdictions require surveyors to retain field notes, calculations, and drawings for a specified minimum period (often 5 to 15 years). Original field notes are professional records and must not be destroyed while the surveyor remains responsible for the work.',
        bookRefs: [
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic X, Ch 42', topic: 'Professional communication and documentation' },
        ],
      },
      {
        id: 'fs-d15-bus-s7',
        type: 'knowledge_check',
        title: 'Business and Professional Practice Check',
        knowledgeCheck: {
          question: 'A client calls asking the surveyor to re-stake 20 lot corners that were set three years ago, but the original contract was a fixed-fee agreement. The client says the corners are now required in different locations than originally specified. What should the surveyor do?',
          options: [
            'Re-stake the corners at no charge — the original contract covers all related work',
            'Decline the work entirely — modified scopes are outside a surveyor\'s authority',
            'Execute a written change order documenting the additional work and associated fee before beginning',
            'Perform the work first and add the cost to the final invoice without prior notice'
          ],
          correctIndex: 2,
          explanation: 'Re-staking corners in new locations is a change in scope from the original contract. The proper procedure is to prepare a written change order that clearly describes the additional work, the reason for the change, and the additional fee. The client must agree in writing before the new work begins. Performing undocumented scope changes without prior written agreement creates disputes over payment and professional responsibility.',
        },
      },
      {
        id: 'fs-d15-bus-s8',
        type: 'further_reading',
        title: 'Business, Safety, and Communication References',
        furtherReading: [
          { book: 'Surveyor Reference Manual', chapter: 'Topic X, Ch 42-44', topic: 'Business management, contracts, safety, and professional ethics' },
          { book: 'MUTCD (Manual on Uniform Traffic Control Devices)', chapter: 'Part 6', topic: 'Temporary traffic control for work zones' },
          { book: 'OSHA 29 CFR Part 1926', chapter: 'Subpart P', topic: 'Excavation safety standards' },
        ],
      },
    ],
  },
];
