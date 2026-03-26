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
  {
    id: 'fs-d13-safety',
    examTrack: 'fs',
    domainNumber: 6,
    domain: 'Professional Practice',
    title: 'Field Safety for Surveyors',
    description: 'A focused guide to occupational safety requirements for survey field crews: OSHA basics, traffic control under the MUTCD, PPE selection, utility strike prevention (811), heat illness and cold stress, and lone worker protocols.',
    estimatedMinutes: 16,
    sections: [
      {
        id: 'fs-d13-safety-s1',
        type: 'concept',
        title: 'OSHA Framework — General Industry vs. Construction',
        content: 'OSHA (Occupational Safety and Health Administration) was created by the Occupational Safety and Health Act of 1970. Every private employer in the United States is subject to OSHA requirements.\n\nTwo main sets of OSHA standards apply to surveyors:\n\n29 CFR Part 1910 — General Industry Standards:\nApply to general workplace operations such as offices, shops, and laboratories. They cover electrical safety, materials handling, and hazardous materials in fixed workplaces.\n\n29 CFR Part 1926 — Construction Standards:\nApply whenever work is performed at a construction site. Survey crews performing construction staking, as-built surveys, or control work at active construction sites fall under Part 1926. Key subparts:\n- Subpart C: General Safety and Health Provisions (hazard identification, housekeeping, first aid)\n- Subpart E: Personal Protective Equipment (hard hats, footwear, eye/ear protection)\n- Subpart G: Signs, Signals, and Barricades\n- Subpart P: Excavations (requires protective system at 5 ft depth in unstable material; competent person inspection)\n- Subpart R: Steel Erection (relevant near cranes and steel work)\n\nOSHA Outreach Training Program:\nOSHA offers 10-Hour and 30-Hour construction safety training courses. The 10-Hour course provides basic hazard awareness for field workers. The 30-Hour course is designed for supervisors and safety officers. Many contractors require their subcontractors\' field crews to hold 10-Hour OSHA cards before entering a site. The courses do not make someone a "competent person" — that designation requires specific technical knowledge and experience related to the hazard type.',
        bookRefs: [
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic X, Ch 44', topic: 'OSHA applicability to survey field operations' },
        ],
      },
      {
        id: 'fs-d13-safety-s2',
        type: 'concept',
        title: 'Traffic Control — MUTCD Requirements for Highway Surveys',
        content: 'The Manual on Uniform Traffic Control Devices (MUTCD), published by the Federal Highway Administration (FHWA), establishes national standards for all traffic control devices, including those used in temporary work zones. Survey crews working in, on, or adjacent to public roadways must comply with Part 6 of the MUTCD (Temporary Traffic Control).\n\nWork Zone Setup Elements:\nA compliant temporary traffic control zone consists of four sequential areas as motorists approach:\n1. Advance Warning Area — Signs (W20-1 "Road Work Ahead," speed advisory signs) placed to give drivers early notice of conditions ahead.\n2. Transition Area — Tapers formed with cones, drums, or other channelizing devices that guide traffic away from the work area.\n3. Activity Area (Work Space) — The area where the crew operates, including the work space, traffic space, and buffer space.\n4. Termination Area — Signals the end of the work zone and returns traffic to normal conditions.\n\nFlaggers:\n- Required when workers occupy a travel lane and conditions require stopping or alternating traffic\n- Must be trained and equipped per MUTCD requirements\n- Must use an MUTCD-approved Stop/Slow paddle (not just hand signals)\n- Must wear Class 3 high-visibility garments\n- Many states require flagger certification (a formal training course)\n\nShadow Vehicles:\n- A vehicle positioned behind the crew to protect against rear-end impacts\n- Equipped with an arrow board, attenuator, or truck-mounted attenuator (TMA) for higher-speed roads\n- Common practice for survey crews working along rural highways\n\nKey Point for the FS Exam:\nMinimum vest requirements: Class 2 for speeds ≤ 50 mph; Class 3 for speeds > 50 mph or complex traffic patterns.',
        bookRefs: [
          { book: 'MUTCD (Manual on Uniform Traffic Control Devices)', chapter: 'Part 6', topic: 'Temporary traffic control, flagging operations, and work zone setup' },
        ],
      },
      {
        id: 'fs-d13-safety-s3',
        type: 'concept',
        title: 'Underground Utility Strike Prevention — 811 Call Before You Dig',
        content: 'Striking an underground utility line during survey probing, excavation, or monument setting is one of the most dangerous events on a survey job site. The consequences range from service interruption to fatal explosions (gas lines) and electrocution (high-voltage electrical lines).\n\n811 — The National Call-Before-You-Dig Number:\nIn the United States, dialing 811 connects to the local One Call center, which notifies all member utilities (electric, gas, water, sewer, telecommunications, cable) to locate and mark their underground lines within the proposed work area. Utilities are required to respond within a specified window (commonly 2–3 business days depending on state law). A surveyor placing a monument, digging a test hole, or excavating must call 811 before breaking ground.\n\nLine Marking Color Codes (APWA Standard):\n- Red — Electric power lines, cables, conduit, and lighting cables\n- Orange — Telecommunication, alarm or signal lines, cables, or conduit\n- Yellow — Gas, oil, steam, petroleum, or gaseous materials\n- Green — Sewers and drain lines\n- Blue — Potable water\n- Purple — Reclaimed water, irrigation, and slurry lines\n- Pink — Temporary survey markings (the surveyor\'s own markings)\n- White — Proposed excavation limits\n\nState Laws:\nEvery U.S. state has a "damage prevention" law requiring notification before excavation. Penalties for excavation without calling 811 range from civil fines to criminal liability if a strike causes injury or death. Survey crews must be aware that 811 locates are approximate — the utility\'s actual position may vary from the marks. Vacuum excavation (soft digging) is recommended near critical facilities.\n\nLone Worker Safety:\nSurvey crews frequently work in remote locations without cell coverage. Best practices for lone worker safety:\n- Check-in/check-out protocols with the office\n- GPS satellite communicators (e.g., Garmin inReach) for emergency contact in no-cell areas\n- Informing someone of planned location and expected return time\n- Vehicle-based emergency supplies (water, first aid kit, fire extinguisher)',
        bookRefs: [
          { book: 'Common Ground Alliance (CGA) Best Practices', chapter: 'Version 13.0', topic: 'Damage prevention, 811 process, and excavation safety' },
        ],
      },
      {
        id: 'fs-d13-safety-s4',
        type: 'concept',
        title: 'Heat Illness and Cold Stress Prevention',
        content: 'Survey field crews are among the most exposed outdoor workers due to long hours in the elements across all seasons. The FS exam tests awareness of basic prevention measures.\n\nHeat-Related Illness (OSHA Heat Illness Prevention):\nHeat illness is a spectrum with increasing severity:\n1. Heat Cramps — Painful muscle spasms from salt and fluid loss. Treatment: rest in shade, drink water, lightly stretch.\n2. Heat Exhaustion — Heavy sweating, weakness, cold/pale/clammy skin, weak pulse. Treatment: move to cool environment, loosen clothing, apply cool cloths, hydrate.\n3. Heat Stroke — Body temperature above 103°F, hot/red skin, no sweating, rapid/strong pulse, confusion. This is a medical emergency. Call 911; cool immediately with ice packs or cold immersion.\n\nOSHA\'s heat illness prevention framework (from the "Water. Rest. Shade." campaign):\n- Provide cool drinking water (at least 1 quart per hour during heavy exertion in heat)\n- Provide rest breaks in shade or air-conditioned area\n- Allow workers to acclimatize to heat gradually (80% of heat illness occurs in the first 5 days of working in heat)\n- Never leave workers alone in heat who show signs of illness\n\nCold Stress:\nHypothermia and frostbite occur when the body loses heat faster than it generates it. Contributing factors: cold temperatures, wind chill, wet conditions, fatigue.\n- Wear layered, moisture-wicking clothing\n- Keep a dry change of clothes in the vehicle\n- Recognize warning signs: uncontrolled shivering, slurred speech, drowsiness\n- Take regular warm-up breaks\n\nPPE for Extreme Weather:\n- Sun protection: UV-blocking clothing, wide-brim hats, sunscreen SPF 30+\n- Snake-proof boots in high-risk areas\n- Insect protection in disease-vector areas (Lyme disease tick checks)',
        bookRefs: [
          { book: 'OSHA Publication 3154', chapter: 'Heat Illness Prevention', topic: 'Heat stress prevention, recognition, and first aid' },
        ],
      },
      {
        id: 'fs-d13-safety-s5',
        type: 'knowledge_check',
        title: 'Field Safety Knowledge Check',
        knowledgeCheck: {
          question: 'Before a survey crew can set a monument that requires digging 18 inches into the ground in a residential area, what is the required first step under state damage prevention laws?',
          options: [
            'Obtain a permit from the local building department',
            'Call 811 to request underground utility locates within the proposed excavation area',
            'Perform a visual inspection of the ground surface for utility markers',
            'Contact only the electric utility company since electricity is the most dangerous hazard'
          ],
          correctIndex: 1,
          explanation: 'State damage prevention laws require contacting the One Call system by dialing 811 before any excavation, regardless of depth. The 811 center notifies all member utilities (electric, gas, water, telecom, cable, etc.) to locate and mark their facilities within the work area. A visual inspection alone is insufficient — most lines are underground and invisible from the surface. Only calling 811 triggers the legally required locate response from all utilities in the area.',
        },
      },
      {
        id: 'fs-d13-safety-s6',
        type: 'further_reading',
        title: 'Field Safety References',
        furtherReading: [
          { book: 'OSHA 29 CFR Part 1926', chapter: 'Subparts C, E, G, P', topic: 'Construction safety, PPE, signs/signals, excavations' },
          { book: 'MUTCD (Manual on Uniform Traffic Control Devices)', chapter: 'Part 6', topic: 'Temporary traffic control and work zone setup requirements' },
          { book: 'Common Ground Alliance Best Practices', chapter: 'Current Edition', topic: 'Call 811 before you dig — damage prevention process' },
          { book: 'OSHA Publication 3154', chapter: 'Heat Illness Prevention', topic: 'Water, rest, shade framework and heat illness response' },
        ],
      },
    ],
  },
  {
    id: 'fs-d13-business',
    examTrack: 'fs',
    domainNumber: 6,
    domain: 'Professional Practice',
    title: 'Business and Project Management for Surveyors',
    description: 'Covers contract types for surveying services (lump sum, time-and-materials, unit price), scope of work and change orders, project scheduling (Gantt chart and critical path), financial practices (overhead rate, billing rate), professional indemnity insurance, and personnel management basics.',
    estimatedMinutes: 18,
    sections: [
      {
        id: 'fs-d13-bus-s1',
        type: 'concept',
        title: 'Contract Types and Risk Allocation',
        content: 'The choice of contract type determines how cost risk is shared between the surveying firm and the client. The FS exam tests the definitions and appropriate uses of each type.\n\nLump Sum (Fixed Fee):\nThe surveyor agrees to perform a defined scope of work for a single total price regardless of actual cost. The surveyor bears all cost risk — if the job takes more time than estimated, the fee stays the same. Best suited for well-defined scopes (ALTA survey, subdivision platting with known boundaries, construction staking from a complete set of plans). The client has budget certainty.\n\nTime and Materials (T&M) / Hourly:\nThe client pays for actual hours worked at agreed billing rates plus direct costs (mileage, printing, subcontractors). The client bears the cost risk because final cost depends on actual effort. Best suited when scope cannot be fully defined in advance (complex boundary research, title dispute work, unknown field conditions). The surveyor must track and invoice time carefully.\n\nUnit Price:\nA fixed fee per unit of work (e.g., $250 per lot corner staked, $80 per hour per crew). Useful for repetitive, quantifiable tasks where scope is known but quantity may vary. Common in subdivision stakeout and utility survey contracts.\n\nCost Plus Fixed Fee:\nActual costs are reimbursed plus a negotiated fixed dollar amount for overhead and profit. Common in federal and state government contracts where cost accounting transparency is required.\n\nRetainer:\nA periodic fee (monthly, annual) paid for ongoing availability of the surveyor\'s services. Common with title companies, developers, or municipalities that need rapid survey response.',
        bookRefs: [
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic X, Ch 42', topic: 'Contract types, fee structures, and risk allocation' },
        ],
      },
      {
        id: 'fs-d13-bus-s2',
        type: 'concept',
        title: 'Scope of Work, Change Orders, and Project Management',
        content: 'The Scope of Work is the contractual description of exactly what the surveyor will (and will not) do. A well-written scope prevents disputes by eliminating ambiguity about deliverables, standards, and boundaries of service.\n\nChange Orders:\nA change order is a written amendment to the original contract that documents a modification to the scope, schedule, or cost. Triggers for change orders include:\n- Client requests work beyond the original scope\n- Conditions discovered in the field that make the original scope significantly more complex (e.g., a buried monument not found requiring additional research)\n- Client-directed changes to deliverable format or location\n- Regulatory requirements that were unknown at contract signing\n\nBest practice: No additional work should commence until the client has signed the change order. Verbal agreements to additional work without written documentation routinely become payment disputes.\n\nProject Scheduling:\nScheduling tools help manage multiple projects, allocate field crews, and meet client deadlines.\n\nGantt Chart:\nA bar chart showing project tasks as horizontal bars along a time axis. Each bar shows the planned start date, end date, and duration of a task. Gantt charts are excellent for communicating project timelines to clients and for tracking progress against the plan. They do not explicitly show task dependencies.\n\nCritical Path Method (CPM):\nA network-based scheduling technique that identifies the sequence of tasks (the critical path) that determines the minimum project duration. Any delay to a task on the critical path directly delays project completion. Tasks not on the critical path have "float" — they can be delayed without affecting the end date. CPM is used for complex projects with many interdependent tasks.\n\nMilestone Schedule:\nA simplified schedule identifying key deliverable dates (field data collection complete, draft plat to client, recorded plat). Useful for client communication on smaller projects.',
        bookRefs: [
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic X, Ch 42', topic: 'Project management, scheduling, and change orders' },
        ],
      },
      {
        id: 'fs-d13-bus-s3',
        type: 'concept',
        title: 'Financial Practices — Overhead Rate, Billing Rate, and Profit Margin',
        content: 'Understanding basic financial concepts is essential for running a profitable survey practice and for interpreting project cost information on the FS exam.\n\nDirect Costs vs. Overhead:\nDirect costs are expenses that can be attributed to a specific project: field crew wages for time spent on that project, equipment rental, mileage, subcontractor fees, and reproduction costs. Overhead costs are firm-wide expenses that cannot be attributed to a single project: office rent, administrative staff salaries, utilities, marketing, software subscriptions, insurance, and management time.\n\nOverhead Rate (Burden Rate):\nThe overhead rate expresses overhead costs as a percentage of direct labor costs:\n\nOverhead Rate = Total Annual Overhead Costs / Total Annual Direct Labor Costs × 100%\n\nExample: A firm has $400,000 in annual overhead and $500,000 in direct labor costs.\nOverhead Rate = $400,000 / $500,000 = 0.80 = 80%\n\nFor every $1.00 of direct labor billed, $0.80 of overhead cost is also incurred.\n\nBilling Rate (Charge Rate):\nThe hourly rate charged to clients must recover direct labor, overhead, and provide profit:\n\nBilling Rate = Direct Labor Rate × (1 + Overhead Rate) × (1 + Profit Margin)\n\nExample: A survey technician earns $25/hour. Overhead rate is 80%. Desired profit margin is 15%.\nBilling Rate = $25 × 1.80 × 1.15 = $51.75/hour\n\nProfit Margin:\nThe percentage of revenue retained as profit after all costs are paid. A typical survey firm targets 10–20% pre-tax profit margin.\n\nPersonnel Management:\nSurvey firms must distinguish between employees and independent contractors. The IRS uses a multi-factor test to determine worker classification. Misclassifying an employee as an independent contractor exposes the firm to back taxes, penalties, and benefits obligations. Proper supervision of field crews by a licensed surveyor is also a licensure requirement in most states.',
        bookRefs: [
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic X, Ch 42', topic: 'Financial management, overhead rate, billing rate, and personnel' },
        ],
      },
      {
        id: 'fs-d13-bus-s4',
        type: 'worked_example',
        title: 'Overhead Rate Calculation',
        workedExample: {
          problem: 'A surveying firm has the following annual financials: total direct labor costs of $600,000, office rent $48,000, administrative salaries $120,000, utilities $12,000, insurance $36,000, software and equipment overhead $24,000, and marketing $18,000. Calculate the overhead rate.',
          steps: [
            { step: 1, description: 'Sum all overhead (indirect) costs.', calculation: '$48,000 + $120,000 + $12,000 + $36,000 + $24,000 + $18,000 = $258,000 total overhead' },
            { step: 2, description: 'Divide total overhead by total direct labor costs.', calculation: '$258,000 / $600,000 = 0.43' },
            { step: 3, description: 'Convert to percentage.', calculation: '0.43 × 100% = 43%' },
          ],
          answer: 'The overhead rate is 43%. For every $1.00 of direct labor, the firm incurs $0.43 in overhead costs.',
        },
      },
      {
        id: 'fs-d13-bus-s5',
        type: 'knowledge_check',
        title: 'Business Management Check',
        knowledgeCheck: {
          question: 'A survey firm\'s annual overhead costs total $320,000 and direct labor costs total $400,000. A project manager earns $40/hour in direct wages. Using the firm\'s overhead rate and a 15% profit margin, what is the billing rate for the project manager?',
          options: [
            '$40.00 per hour',
            '$64.00 per hour',
            '$82.80 per hour',
            '$92.00 per hour'
          ],
          correctIndex: 2,
          explanation: 'Overhead rate = $320,000 / $400,000 = 80% = 0.80. Billing rate = Direct Rate × (1 + Overhead Rate) × (1 + Profit Margin) = $40 × 1.80 × 1.15. First: $40 × 1.80 = $72.00 (direct labor + overhead recovery). Then: $72.00 × 1.15 = $82.80 (adding 15% profit margin). The key formula: Billing Rate = Direct Labor Rate × (1 + Overhead Rate) × (1 + Profit Margin).',
        },
      },
      {
        id: 'fs-d13-bus-s6',
        type: 'further_reading',
        title: 'Business Management References',
        furtherReading: [
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic X, Ch 42', topic: 'Business structures, financial practices, contracts, and personnel management' },
          { book: 'NSPS (nsps.us.com)', chapter: 'Practice Management Resources', topic: 'Business management guides for surveying firms' },
        ],
      },
    ],
  },
  {
    id: 'fs-d12-communication',
    examTrack: 'fs',
    domainNumber: 6,
    domain: 'Professional Practice',
    title: 'Professional Communication and Field Documentation',
    description: 'Standards for survey field notes (legibility, corrections, required content), surveyor\'s report writing, written communication best practices, and record retention requirements for professional surveying records.',
    estimatedMinutes: 14,
    sections: [
      {
        id: 'fs-d12-comm-s1',
        type: 'concept',
        title: 'Survey Field Notes — Standards and Required Content',
        content: 'Survey field notes are the primary legal record of field observations. They must be complete, legible, and permanent because they may be subpoenaed as evidence in boundary disputes, construction defect claims, and environmental cases.\n\nRequired Content in Field Notes:\n- Date of survey\n- Weather conditions (affects instrument performance and data quality)\n- Names of crew members and their roles\n- Instrument type and serial number (or equipment identifier)\n- Job name/number and client name\n- Sketch of the survey area (even rough sketches add context)\n- Observations: angles, distances, elevations, GPS coordinates\n- Point identifications (station numbers, point names, monument descriptions)\n- Benchmark identification and elevation\n- Any unusual field conditions, discrepancies, or decisions made in the field\n\nField Note Format:\nTraditionally kept in a bound field book with pre-printed grid pages. Some firms use digital data collectors, but digital records must be backed up and preserved with the same rigor as paper notes.\n\nLegibility Requirements:\n- Write clearly and in pen (pencil is erasable and not appropriate for a legal record)\n- Print rather than write in cursive when there is any chance of ambiguity\n- Numbers must be unambiguous — a "7" that could be read as a "1" can cause significant errors\n\nField Note Error Correction Procedure:\nWhen a mistake is made in paper field notes:\n1. Draw a single line through the incorrect entry so the original value remains readable\n2. Write the correct value above or beside the crossed-out entry\n3. Initial the correction\n\nNEVER erase, use correction fluid (white-out), or obliterate an entry. Erased or obscured field notes appear to be falsified records and undermine the surveyor\'s credibility in any legal proceeding. This single-line strike-through rule is one of the most commonly tested field notes concepts on the FS exam.',
        bookRefs: [
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic I, Ch 1-2', topic: 'Field notes standards, required content, and error correction procedure' },
          { book: 'Elementary Surveying (ES)', chapter: 'Chapter 3', topic: 'Field notes and data recording' },
        ],
      },
      {
        id: 'fs-d12-comm-s2',
        type: 'concept',
        title: 'Surveyor\'s Reports and Written Communication',
        content: 'Beyond field notes, professional surveyors produce several types of formal written documents.\n\nSurveyor\'s Report (Letter of Opinion):\nA narrative document accompanying or separate from the survey plat that explains:\n- The legal description researched and how it was interpreted\n- Monuments found and their condition\n- Conflicts or ambiguities in record documents and how they were resolved\n- Basis for the surveyor\'s boundary determination\n- Any conditions found that may affect the property (encroachments, overlaps, gaps)\n\nThe surveyor\'s report is important because a plat is a graphic representation with limited space for explanatory notes. Complex boundary situations require narrative context to fully communicate the surveyor\'s findings and professional judgment.\n\nSurvey Certifications:\nThe certification block on a survey plat is the surveyor\'s formal statement, signed and sealed, that the survey was performed under the surveyor\'s supervision and meets applicable standards. The certification creates professional and legal accountability.\n\nWritten Communication Best Practices:\n- Use precise, unambiguous language: "the northwest corner of Lot 12" not "a corner near the tree"\n- Define technical terms for non-technical readers\n- Separate factual findings from professional opinions ("the monument was found 0.08 ft north of the calculated position" vs. "it is my professional opinion that the monument represents the original corner")\n- Avoid legal conclusions (unless you are a licensed attorney): do not state "the fence is a trespass" — instead state "the fence crosses the boundary line as determined by this survey"\n- Respond to client questions promptly and in writing\n- Copy all correspondence to the project file\n\nOral Communication:\nSurveyors present findings at public hearings, title company closings, and courtrooms as expert witnesses. Key principles: speak clearly and at a pace appropriate for the audience, present visual aids when helpful, and be prepared to explain technical concepts in plain language.',
        bookRefs: [
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic X, Ch 42', topic: 'Written communication, survey reports, and certifications' },
          { book: 'Brown\'s Boundary Control and Legal Principles', chapter: 'Chapter 1', topic: 'Professional responsibility and communication in boundary determination' },
        ],
      },
      {
        id: 'fs-d12-comm-s3',
        type: 'concept',
        title: 'Record Retention Requirements',
        content: 'Field notes, calculations, drawings, and correspondence produced in the course of professional surveying are professional records. Most state surveying regulations establish minimum retention periods.\n\nTypical Retention Requirements by Record Type:\n\nField Notes:\nGenerally required to be retained indefinitely while the surveyor holds their license, or for a minimum of 5–15 years depending on state law. Some states require permanent retention of original field notes because they may be the only contemporaneous evidence of a historic boundary location.\n\nCalculation Sheets:\nTypically required for the same period as field notes — the calculations are part of the professional record of how the survey was performed and may be needed to defend the work in a dispute.\n\nSurvey Plats and Maps:\nRecorded plats become part of the permanent public record when filed with the county recorder or clerk. The surveyor\'s office copy should be retained for at least as long as the minimum statutory period.\n\nProject Correspondence:\nEmail and letters related to the scope, client instructions, and professional decisions should be retained for the same period as the project records.\n\nKey Principle for the FS Exam:\nMost state regulations require a minimum of 5 years for survey records, with many states requiring 10–15 years or longer. Original field notes are the most important records to preserve because they document exactly what was observed in the field and cannot be recreated after the fact.\n\nRecords Storage:\n- Paper records should be stored in fireproof or off-site storage\n- Digital records must be backed up in multiple locations (ideally including off-site or cloud storage)\n- Format migration: older digital files must be periodically migrated to current formats to remain readable\n- Original field books should never be loaned out — provide copies instead',
        bookRefs: [
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic X, Ch 43', topic: 'Professional records, retention requirements, and field note preservation' },
        ],
      },
      {
        id: 'fs-d12-comm-s4',
        type: 'knowledge_check',
        title: 'Field Notes and Documentation Check',
        knowledgeCheck: {
          question: 'While recording field angles in the field book, a crew member writes "87°32\'" but should have written "78°32\'". What is the correct procedure for correcting this entry?',
          options: [
            'Erase the incorrect entry completely and write the correct value',
            'Use white correction fluid to cover the error and write the correct value on top',
            'Draw a single line through "87°32\'" so it remains readable, write "78°32\'" nearby, and initial the correction',
            'Tear out the page and re-record all entries on a fresh page'
          ],
          correctIndex: 2,
          explanation: 'The correct field note error correction procedure is to draw a single horizontal line through the incorrect value so that the original entry remains legible, then write the correct value above or beside it and initial the correction. Erasure or use of correction fluid destroys the original record and makes the notes appear falsified — this is unacceptable in professional surveying records because field notes may be used as legal evidence. Tearing out pages is equally improper and makes the bound field book appear tampered with.',
        },
      },
      {
        id: 'fs-d12-comm-s5',
        type: 'further_reading',
        title: 'Professional Communication References',
        furtherReading: [
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic I, Ch 1-2; Topic X, Ch 42', topic: 'Field notes, professional communication, certifications, and record retention' },
          { book: 'Elementary Surveying (ES)', chapter: 'Chapter 3', topic: 'Field data recording and note-keeping standards' },
          { book: 'State Surveying Board Rules (your jurisdiction)', chapter: 'Records Retention Section', topic: 'Minimum retention periods for professional surveying records' },
        ],
      },
    ],
  },
];
