import type { Flashcard } from '../schema';

// PS Exam Flashcards - Professional Surveyor content
export const PS_FLASHCARDS: Omit<Flashcard, 'id'>[] = [
  // Domain 1: Legal Principles
  {
    domain: 'Legal Principles',
    front: 'Hierarchy of Evidence (Controlling Calls)',
    back: 'From Highest to Lowest Priority:\n\n1. Natural Monuments (rivers, trees)\n2. Artificial Monuments (stakes, pipes)\n3. Courses (bearings/directions)\n4. Distances\n5. Area/Quantity',
    category: 'concept',
    examTrack: 'ps'
  },
  {
    domain: 'Legal Principles',
    front: 'Adverse Possession Requirements',
    back: 'COAH + Statutory Period:\n\n• Continuous\n• Open & Notorious\n• Adverse/Hostile\n• Exclusive\n\nTypically 5-20 years depending on state',
    category: 'concept',
    examTrack: 'ps'
  },
  {
    domain: 'Legal Principles',
    front: 'Riparian vs Littoral Rights',
    back: 'RIPARIAN:\n• Adjacent to flowing water (rivers/streams)\n• Rights include access & use\n\nLITTORAL:\n• Adjacent to standing water (lakes/oceans)\n• Rights to high water mark',
    category: 'definition',
    examTrack: 'ps'
  },
  {
    domain: 'Legal Principles',
    front: 'Accretion vs Avulsion',
    back: 'ACCRETION:\n• Gradual, imperceptible land addition\n• Landowner gains title to new land\n\nAVULSION:\n• Sudden, perceptible change\n• Boundary stays at original location',
    category: 'concept',
    examTrack: 'ps'
  },
  {
    domain: 'Legal Principles',
    front: 'Junior vs Senior Rights',
    back: 'SENIOR CONVEYANCE:\n• First parcel sold from parent tract\n• Generally takes priority in conflicts\n\nJUNIOR CONVEYANCE:\n• Later parcels sold\n• Bears any excess/deficiency',
    category: 'concept',
    examTrack: 'ps'
  },
  {
    domain: 'Legal Principles',
    front: 'Easement Types',
    back: 'APPURTENANT:\n• Benefits adjacent property\n• Runs with the land\n\nIN GROSS:\n• Benefits person/entity (not land)\n• Examples: utility easements\n\nPRESCRIPTIVE:\n• Acquired through use (like adverse possession)',
    category: 'definition',
    examTrack: 'ps'
  },
  {
    domain: 'Legal Principles',
    front: 'Dominant vs Servient Estate',
    back: 'DOMINANT ESTATE:\n• Property that BENEFITS from easement\n• Has the right to use\n\nSERVIENT ESTATE:\n• Property BURDENED by easement\n• Must allow the use',
    category: 'definition',
    examTrack: 'ps'
  },
  {
    domain: 'Legal Principles',
    front: 'Lost vs Obliterated Corners',
    back: 'LOST CORNER:\n• No physical evidence exists\n• Position cannot be recovered\n• Requires proportionate measurement\n\nOBLITERATED CORNER:\n• Evidence destroyed but position recoverable\n• From records, testimony, or other evidence',
    category: 'definition',
    examTrack: 'ps'
  },
  {
    domain: 'Legal Principles',
    front: 'Parol Evidence',
    back: 'Verbal or oral testimony that may:\n\n• Explain ambiguous deed terms\n• Supplement written documents\n• Help interpret intent\n\nGenerally inadmissible to contradict clear written terms',
    category: 'definition',
    examTrack: 'ps'
  },
  {
    domain: 'Legal Principles',
    front: 'Acquiescence Doctrine',
    back: 'When adjoining landowners:\n\n• Accept a line as the boundary\n• Over extended time period\n• Despite possible record conflict\n\nLine may become fixed regardless of true location',
    category: 'concept',
    examTrack: 'ps'
  },
  {
    domain: 'Legal Principles',
    front: 'Thalweg Doctrine',
    back: 'For boundary along non-navigable stream:\n\nBoundary follows the THALWEG\n(deepest part of channel)\n\nNot necessarily the centerline or thread',
    category: 'concept',
    examTrack: 'ps'
  },
  {
    domain: 'Legal Principles',
    front: 'Patent in Land Law',
    back: 'A PATENT is:\n\nThe original conveyance of land from the government (sovereign) to a private owner.\n\nMarks beginning of private ownership chain.',
    category: 'definition',
    examTrack: 'ps'
  },

  // Domain 2: Professional Survey Practices  
  {
    domain: 'Professional Survey Practices',
    front: 'Responsible Charge Requirements',
    back: 'Licensed surveyor must have:\n\n• Direct control of work\n• Personal supervision\n• Review all calculations\n• Authority over decisions\n\nCannot sign work not under your charge',
    category: 'concept',
    examTrack: 'ps'
  },
  {
    domain: 'Professional Survey Practices',
    front: 'Grantor-Grantee Index',
    back: 'Recording system that indexes by:\n\n• GRANTOR: Person conveying property\n• GRANTEE: Person receiving property\n\nAllows tracking chain of title through time',
    category: 'definition',
    examTrack: 'ps'
  },
  {
    domain: 'Professional Survey Practices',
    front: 'RTK vs Static GPS',
    back: 'STATIC GPS:\n• Long observation times (30+ min)\n• Highest accuracy\n• Control surveys\n\nRTK (Real-Time Kinematic):\n• Instant positions\n• Requires radio/cell link\n• Centimeter accuracy',
    category: 'concept',
    examTrack: 'ps'
  },
  {
    domain: 'Professional Survey Practices',
    front: 'NAD 83 vs NAVD 88',
    back: 'NAD 83:\n• North American Datum 1983\n• HORIZONTAL reference system\n\nNAVD 88:\n• North American Vertical Datum 1988\n• VERTICAL (elevation) reference',
    category: 'definition',
    examTrack: 'ps'
  },
  {
    domain: 'Professional Survey Practices',
    front: 'Reference Points (RPs)',
    back: 'PURPOSE:\n• Aid corner recovery if disturbed\n• Provide backup evidence\n\nTypically:\n• 2-3 points per corner\n• Located nearby on stable features\n• Ties measured and recorded',
    category: 'concept',
    examTrack: 'ps'
  },
  {
    domain: 'Professional Survey Practices',
    front: 'Preliminary vs Final Plat',
    back: 'PRELIMINARY PLAT:\n• Proposed layout for approval\n• Shows general design\n• Subject to changes\n\nFINAL PLAT:\n• Recordable document\n• Shows monuments, dimensions\n• Includes dedications',
    category: 'definition',
    examTrack: 'ps'
  },
  {
    domain: 'Professional Survey Practices',
    front: 'COGO (Coordinate Geometry)',
    back: 'Computer software for:\n\n• Coordinate-based calculations\n• Inverse computations\n• Traverse solutions\n• Area calculations\n\nStandard tool for modern surveying',
    category: 'definition',
    examTrack: 'ps'
  },
  {
    domain: 'Professional Survey Practices',
    front: 'Least Squares Adjustment',
    back: 'Mathematical method to:\n\n• Optimally distribute random errors\n• Find most probable values\n• Used for control networks\n\nMinimizes sum of squared residuals',
    category: 'concept',
    examTrack: 'ps'
  },
  {
    domain: 'Professional Survey Practices',
    front: 'Field Notes Best Practices',
    back: 'Must be:\n• Legible and complete\n• Contemporaneous (at time of work)\n• Include sketches with N arrow\n• Corrections initialed, never erased\n\nConsidered legal documents',
    category: 'concept',
    examTrack: 'ps'
  },
  {
    domain: 'Professional Survey Practices',
    front: 'QA vs QC',
    back: 'QUALITY ASSURANCE (QA):\n• Proactive prevention\n• Systematic procedures\n\nQUALITY CONTROL (QC):\n• Detection & correction\n• Checking completed work\n• Independent verification',
    category: 'definition',
    examTrack: 'ps'
  },

  // Domain 3: Standards and Specifications
  {
    domain: 'Standards & Specifications',
    front: 'ALTA/NSPS Precision Standard',
    back: '0.07 feet + 50 ppm\nat 95% confidence level\n\nExample: 1000 ft survey\nPrecision = 0.07 + (1000 × 0.00005)\n= 0.12 ft maximum error',
    category: 'formula',
    examTrack: 'ps'
  },
  {
    domain: 'Standards & Specifications',
    front: 'ALTA Table A Items',
    back: 'OPTIONAL services client may request:\n\n• Item 1: Monuments\n• Item 6: Zoning\n• Item 8: Flood zone\n• Item 11: Utilities\n• Item 19: Underground utilities\n\n(Negotiated before survey)',
    category: 'concept',
    examTrack: 'ps'
  },
  {
    domain: 'Standards & Specifications',
    front: 'BLM Manual of Surveying Instructions',
    back: 'Authoritative guide for PLSS surveys:\n\n• Current edition: 2009\n• Establishes corner restoration methods\n• Single/double proportionate measurement\n• Original corners are controlling',
    category: 'definition',
    examTrack: 'ps'
  },
  {
    domain: 'Standards & Specifications',
    front: 'Single Proportionate Measurement',
    back: 'Restores LOST corner on a line between two found corners.\n\nNew position proportionally distributes error between found corners based on record distances.',
    category: 'concept',
    examTrack: 'ps'
  },
  {
    domain: 'Standards & Specifications',
    front: 'FEMA Elevation Certificate',
    back: 'Documents building elevation relative to:\n\n• Base Flood Elevation (BFE)\n• 1% annual chance flood\n• Referenced to NGVD 29 or NAVD 88\n\nUsed for flood insurance rating',
    category: 'definition',
    examTrack: 'ps'
  },
  {
    domain: 'Standards & Specifications',
    front: 'FIRM (Flood Insurance Rate Map)',
    back: 'Shows:\n• Flood hazard zones\n• Base Flood Elevations (BFE)\n• Special Flood Hazard Areas\n\nZone X = minimal flood hazard\nZone AE = 100-year flood zone',
    category: 'definition',
    examTrack: 'ps'
  },
  {
    domain: 'Standards & Specifications',
    front: 'NSSDA Accuracy Standards',
    back: 'National Standard for Spatial Data Accuracy:\n\n• Reports at 95% confidence level\n• Horizontal: 95% of points within threshold\n• Vertical: 95% of points within threshold\n\nReplaced NMAS for most applications',
    category: 'definition',
    examTrack: 'ps'
  },
  {
    domain: 'Standards & Specifications',
    front: 'NGS Order and Class',
    back: 'Accuracy classifications:\n\nORDER (First, Second, Third):\n• First = highest accuracy\n\nCLASS (I, II):\n• Subdivision within order\n\nUsed for geodetic control surveys',
    category: 'concept',
    examTrack: 'ps'
  },
  {
    domain: 'Standards & Specifications',
    front: 'OPUS Processing',
    back: 'Online Positioning User Service:\n\n• NGS service for GPS processing\n• Submit static GPS data\n• Returns NAD 83 coordinates\n• Uses CORS network',
    category: 'definition',
    examTrack: 'ps'
  },
  {
    domain: 'Standards & Specifications',
    front: 'Meander Lines',
    back: 'Lines run along WATER BOUNDARIES:\n\n• Approximate the water edge\n• NOT property boundaries\n• True boundary = actual water edge\n• Water edge may change (accretion/erosion)',
    category: 'concept',
    examTrack: 'ps'
  },

  // Domain 4: Business Practices
  {
    domain: 'Business Practices',
    front: 'E&O Insurance',
    back: 'Errors & Omissions (Professional Liability):\n\n• Covers claims from professional negligence\n• Protects against lawsuits\n• Claims-made basis typical\n• Tail coverage extends protection',
    category: 'definition',
    examTrack: 'ps'
  },
  {
    domain: 'Business Practices',
    front: 'Limitation of Liability Clause',
    back: 'Contract provision that:\n\n• Caps surveyor financial responsibility\n• Typically limited to fee paid\n• Requires client agreement\n• May not cover gross negligence',
    category: 'definition',
    examTrack: 'ps'
  },
  {
    domain: 'Business Practices',
    front: 'Scope Creep',
    back: 'Uncontrolled expansion of project scope:\n\n• Beyond original agreement\n• Without fee adjustment\n• Common in surveying projects\n\nPrevent with clear contracts and change orders',
    category: 'concept',
    examTrack: 'ps'
  },
  {
    domain: 'Business Practices',
    front: 'OSHA Requirements',
    back: 'Occupational Safety & Health Administration:\n\n• PPE (hard hats, vests, etc.)\n• High-visibility apparel near traffic\n• Job Hazard Analysis (JHA)\n• 811 call before digging',
    category: 'concept',
    examTrack: 'ps'
  },
  {
    domain: 'Business Practices',
    front: 'Direct vs Overhead Costs',
    back: 'DIRECT COSTS:\n• Labor on specific project\n• Equipment for project\n• Direct expenses\n\nOVERHEAD:\n• General business expenses\n• Rent, utilities, admin\n• Not tied to specific project',
    category: 'definition',
    examTrack: 'ps'
  },
  {
    domain: 'Business Practices',
    front: 'Conflict of Interest',
    back: 'When personal interests may:\n\n• Influence professional judgment\n• Bias survey results\n• Create appearance of impropriety\n\nMust be disclosed or avoided',
    category: 'concept',
    examTrack: 'ps'
  },
  {
    domain: 'Business Practices',
    front: 'Primary Professional Obligation',
    back: 'Surveyor primary duty is to:\n\nPUBLIC HEALTH, SAFETY, AND WELFARE\n\nAbove client interests, employer interests, or personal gain',
    category: 'concept',
    examTrack: 'ps'
  },
  {
    domain: 'Business Practices',
    front: 'Indemnification Clause',
    back: 'Contract provision where:\n\n• One party agrees to protect another\n• From certain claims or losses\n• Shifts responsibility between parties\n• Review carefully before signing',
    category: 'definition',
    examTrack: 'ps'
  },

  // Domain 5: Areas of Practice
  {
    domain: 'Areas of Practice',
    front: 'ALTA Survey Key Requirements',
    back: 'Must show:\n\n• Property boundaries with precision\n• Improvements (buildings, fences)\n• Easements and encumbrances\n• Evidence of possession\n• Access to public ways\n\nCertified to title company/lender',
    category: 'concept',
    examTrack: 'ps'
  },
  {
    domain: 'Areas of Practice',
    front: 'Cut and Fill Stakes',
    back: 'Construction staking showing:\n\nCUT = Excavate (dig down)\nFILL = Add material (build up)\n\nIndicates how much to grade to reach design elevation',
    category: 'definition',
    examTrack: 'ps'
  },
  {
    domain: 'Areas of Practice',
    front: 'Offset Stakes',
    back: 'Stakes set AWAY from actual point:\n\n• Avoids disturbance during construction\n• Preserves reference\n• Typically with offset distance noted\n• Allows recovery after grading',
    category: 'definition',
    examTrack: 'ps'
  },
  {
    domain: 'Areas of Practice',
    front: 'Stationing in Route Surveys',
    back: 'Distance measurement along centerline:\n\n• Station 0+00 = Beginning\n• Station 10+00 = 1,000 feet\n• Station 25+50 = 2,550 feet\n\nFormat: hundreds+feet',
    category: 'concept',
    examTrack: 'ps'
  },
  {
    domain: 'Areas of Practice',
    front: 'PI in Horizontal Curves',
    back: 'PI = Point of Intersection\n\nWhere extended tangent lines meet.\n\nOther curve points:\n• PC = Point of Curvature\n• PT = Point of Tangency',
    category: 'definition',
    examTrack: 'ps'
  },
  {
    domain: 'Areas of Practice',
    front: 'Contour Lines',
    back: 'Lines of EQUAL ELEVATION\n\n• Show terrain shape\n• Contour interval = vertical distance between lines\n• Close together = steep\n• Far apart = gentle slope',
    category: 'definition',
    examTrack: 'ps'
  },
  {
    domain: 'Areas of Practice',
    front: 'DTM vs DSM',
    back: 'DTM (Digital Terrain Model):\n• Bare ground surface\n• Buildings/trees removed\n\nDSM (Digital Surface Model):\n• Top of everything\n• Includes buildings, vegetation',
    category: 'definition',
    examTrack: 'ps'
  },
  {
    domain: 'Areas of Practice',
    front: 'Condominium Unit Boundaries',
    back: 'Defined in THREE DIMENSIONS:\n\n• Floor to ceiling\n• Wall to wall\n• Unit airspace owned\n\nCommon elements shared\nLimited common elements assigned',
    category: 'concept',
    examTrack: 'ps'
  },
  {
    domain: 'Areas of Practice',
    front: 'Orthophoto',
    back: 'Aerial image that has been:\n\n• Geometrically corrected\n• Relief distortion removed\n• Uniform scale like a map\n• Can measure from it',
    category: 'definition',
    examTrack: 'ps'
  },
  {
    domain: 'Areas of Practice',
    front: 'Bathymetric Survey',
    back: 'Measures WATER DEPTHS:\n\n• Uses sonar (single/multibeam)\n• Creates underwater topography\n• Tide corrections required\n• Referenced to MLLW or chart datum',
    category: 'definition',
    examTrack: 'ps'
  },
  {
    domain: 'Areas of Practice',
    front: 'Ground Control Points (GCPs)',
    back: 'For photogrammetry/drone mapping:\n\n• Surveyed targets on ground\n• Tie aerial imagery to coordinates\n• Multiple points needed\n• Distribute across project area',
    category: 'concept',
    examTrack: 'ps'
  },
  {
    domain: 'Areas of Practice',
    front: 'As-Built Survey Purpose',
    back: 'Documents ACTUAL constructed conditions:\n\n• Verifies design compliance\n• Records what was built\n• Permanent record for future use\n• May be required for CO',
    category: 'concept',
    examTrack: 'ps'
  }
];
