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
    back: 'OPTIONAL services client may request (2026):\n\n• Item 1: Monuments\n• Item 3: Flood zone classification\n• Item 6: Zoning\n• Item 8: Substantial features\n• Item 11: Underground utilities\n• Item 15: Imagery (NEW in 2026)\n• Item 20: Encroachment summary table (NEW in 2026)\n\n20 standard items + Item 21 for custom (Negotiated before survey)',
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
  },

  // === EXPANDED PS FLASHCARDS ===

  // Domain 1: Legal Principles (Additional)
  {
    domain: 'Legal Principles',
    front: 'Privity of Contract',
    back: 'Legal relationship between parties to a contract.\n\nSurveyor typically has privity only with client.\n\nThird parties may still sue in tort for negligence.',
    category: 'definition',
    examTrack: 'ps'
  },
  {
    domain: 'Legal Principles',
    front: 'Statute of Limitations vs Statute of Repose',
    back: 'STATUTE OF LIMITATIONS:\n• Time from discovery of injury\n• Clock starts when harm found\n\nSTATUTE OF REPOSE:\n• Time from completion of work\n• Absolute cutoff regardless of discovery',
    category: 'concept',
    examTrack: 'ps'
  },
  {
    domain: 'Legal Principles',
    front: 'Constructive Notice',
    back: 'Legal presumption that:\n\n• Recorded documents are known\n• No excuse for not searching\n• "Should have known" standard\n\nAffects buyers, surveyors, and title companies',
    category: 'definition',
    examTrack: 'ps'
  },
  {
    domain: 'Legal Principles',
    front: 'Doctrine of Agreed Boundaries',
    back: 'When owners agree on a line:\n\n• Uncertainty existed about true line\n• Agreement made (explicit or implied)\n• Possession consistent with agreement\n• Time period varies by state\n\nLine becomes legally fixed',
    category: 'concept',
    examTrack: 'ps'
  },
  {
    domain: 'Legal Principles',
    front: 'Reliction vs Dereliction',
    back: 'RELICTION:\n• Gradual withdrawal of water\n• Exposes new land\n• Landowner gains title\n\nDERELICTION:\nSame meaning, different term\nSome states use one or the other',
    category: 'definition',
    examTrack: 'ps'
  },
  {
    domain: 'Legal Principles',
    front: 'Estoppel in Boundary Law',
    back: 'Prevents party from asserting position that:\n\n• Contradicts earlier representation\n• Other party relied upon\n• Caused detriment to other party\n\nApplies to surveyors and landowners',
    category: 'concept',
    examTrack: 'ps'
  },
  {
    domain: 'Legal Principles',
    front: 'Quitclaim vs Warranty Deed',
    back: 'QUITCLAIM DEED:\n• Transfers whatever interest grantor has\n• No warranties or guarantees\n\nWARRANTY DEED:\n• Guarantees good title\n• Grantor liable for defects',
    category: 'definition',
    examTrack: 'ps'
  },
  {
    domain: 'Legal Principles',
    front: 'Metes and Bounds Description',
    back: 'Property description using:\n\n• METES = Measurements (distances, directions)\n• BOUNDS = Boundaries (monuments, adjoiners)\n\nMust close and be traceable on the ground',
    category: 'definition',
    examTrack: 'ps'
  },
  {
    domain: 'Legal Principles',
    front: 'Rule of Construction (Legal Description)',
    back: 'When deed is ambiguous:\n\n1. Intent of parties prevails\n2. Deed construed as a whole\n3. Specific controls general\n4. Written words over typed/printed\n5. Later clauses may modify earlier',
    category: 'concept',
    examTrack: 'ps'
  },
  {
    domain: 'Legal Principles',
    front: 'Bona Fide Purchaser (BFP)',
    back: 'Buyer who:\n\n• Purchases for value\n• In good faith\n• Without notice of defects\n\nGenerally protected from prior claims',
    category: 'definition',
    examTrack: 'ps'
  },
  {
    domain: 'Legal Principles',
    front: 'Simultaneous Conveyances',
    back: 'When original owner sells multiple parcels at once:\n\n• All are considered SENIOR\n• No parcel takes priority\n• Prorate any excess or deficiency\n• Different from sequential sales',
    category: 'concept',
    examTrack: 'ps'
  },
  {
    domain: 'Legal Principles',
    front: 'Encumbrance',
    back: 'Any claim or liability on property:\n\n• Easements\n• Liens\n• Deed restrictions\n• Encroachments\n\nAffects title but doesn\'t prevent transfer',
    category: 'definition',
    examTrack: 'ps'
  },
  {
    domain: 'Legal Principles',
    front: 'Thread of Stream',
    back: 'Center line of NON-NAVIGABLE waterway:\n\n• Geographic midpoint of channel\n• Used for non-navigable streams\n• Private ownership to thread\n• Distinct from thalweg (deepest part)\n\nNavigable waters: State owns bed',
    category: 'definition',
    examTrack: 'ps'
  },
  {
    domain: 'Legal Principles',
    front: 'Navigable Waters Ownership',
    back: 'NAVIGABLE WATERS:\n• State owns bed (public trust)\n• Private owner to ordinary high water mark\n\nNON-NAVIGABLE:\n• Private owner typically to center (thread)',
    category: 'concept',
    examTrack: 'ps'
  },
  {
    domain: 'Legal Principles',
    front: 'Prescription vs Adverse Possession',
    back: 'PRESCRIPTION:\n• Acquires USE rights (easement)\n• Does not transfer ownership\n\nADVERSE POSSESSION:\n• Acquires TITLE (ownership)\n• Must meet all elements',
    category: 'concept',
    examTrack: 'ps'
  },

  // Domain 2: Professional Survey Practices (Additional)
  {
    domain: 'Professional Survey Practices',
    front: 'Chain of Title Research',
    back: 'Search sequence through records:\n\n• Start with current owner\n• Work backward to origin (patent)\n• Note all conveyances, easements\n• Identify gaps or breaks\n• Review adjacent properties',
    category: 'concept',
    examTrack: 'ps'
  },
  {
    domain: 'Professional Survey Practices',
    front: 'Bearing vs Azimuth',
    back: 'BEARING:\n• Angle from N or S toward E or W\n• Range: 0° to 90°\n• Example: N 45° E\n\nAZIMUTH:\n• Angle clockwise from North\n• Range: 0° to 360°\n• Example: 45°',
    category: 'definition',
    examTrack: 'ps'
  },
  {
    domain: 'Professional Survey Practices',
    front: 'Magnetic Declination',
    back: 'Angle between:\n\n• TRUE NORTH (geographic)\n• MAGNETIC NORTH (compass)\n\nVaries by location and time\nEast declination: add to magnetic\nWest declination: subtract',
    category: 'definition',
    examTrack: 'ps'
  },
  {
    domain: 'Professional Survey Practices',
    front: 'Closure vs Angular Closure',
    back: 'CLOSURE (Linear):\n• Difference between starting and ending points\n• Usually expressed as ratio (1:10,000)\n\nANGULAR CLOSURE:\n• Sum of angles vs theoretical\n• Traverse: (n-2) × 180° for interior',
    category: 'concept',
    examTrack: 'ps'
  },
  {
    domain: 'Professional Survey Practices',
    front: 'GNSS Multipath Error',
    back: 'Signal reflection causing:\n\n• Signal arrives via multiple paths\n• Delays and errors in position\n\nMitigation:\n• Good antenna ground planes\n• Avoid reflective surfaces\n• Multipath-resistant receivers',
    category: 'concept',
    examTrack: 'ps'
  },
  {
    domain: 'Professional Survey Practices',
    front: 'PDOP (Position Dilution of Precision)',
    back: 'Measure of satellite geometry:\n\n• Lower PDOP = better geometry\n• Higher = poorer accuracy\n• PDOP < 3 is excellent\n• PDOP > 6 suggests waiting\n\nRelated: HDOP, VDOP, GDOP',
    category: 'definition',
    examTrack: 'ps'
  },
  {
    domain: 'Professional Survey Practices',
    front: 'Bench Mark (BM)',
    back: 'Permanent point of known ELEVATION:\n\n• Referenced to vertical datum\n• Used for level circuit control\n• NGS maintains network\n• Periodic checks for movement',
    category: 'definition',
    examTrack: 'ps'
  },
  {
    domain: 'Professional Survey Practices',
    front: 'Turning Point (TP)',
    back: 'Temporary point in level circuit:\n\n• Stable surface (stake, rock)\n• Backsight and foresight taken\n• Transfers elevation forward\n• Allows instrument moves',
    category: 'definition',
    examTrack: 'ps'
  },
  {
    domain: 'Professional Survey Practices',
    front: 'Trigonometric Leveling',
    back: 'Determining elevation differences using:\n\n• Vertical angles\n• Slope distances\n\nΔElev = D × sin(vertical angle)\n\nLess accurate than differential leveling',
    category: 'concept',
    examTrack: 'ps'
  },
  {
    domain: 'Professional Survey Practices',
    front: 'Geoid vs Ellipsoid Height',
    back: 'ELLIPSOID HEIGHT (h):\n• Height above mathematical ellipsoid\n• From GPS\n\nORTHOMETRIC HEIGHT (H):\n• Height above geoid (mean sea level)\n• From leveling\n\nh = H + N (geoid separation)',
    category: 'concept',
    examTrack: 'ps'
  },
  {
    domain: 'Professional Survey Practices',
    front: 'Tract Index Recording System',
    back: 'Alternative to grantor-grantee:\n\n• Indexed by property location\n• Parcel-based search\n• Shows all documents for property\n• Easier chain of title search',
    category: 'definition',
    examTrack: 'ps'
  },
  {
    domain: 'Professional Survey Practices',
    front: 'Monument Perpetuation',
    back: 'Preservation of corner evidence:\n\n• Reference points (RPs)\n• Witness monuments\n• Detailed records\n• Photos and sketches\n\nEssential if original may be disturbed',
    category: 'concept',
    examTrack: 'ps'
  },
  {
    domain: 'Professional Survey Practices',
    front: 'Tie Lines',
    back: 'Measurements connecting:\n\n• Corner to reference objects\n• May use distance and direction\n• Aid future corner recovery\n• Example: 15.5\' to 12" oak tree',
    category: 'definition',
    examTrack: 'ps'
  },
  {
    domain: 'Professional Survey Practices',
    front: 'Plat vs Survey',
    back: 'PLAT:\n• Graphic representation\n• Usually for recording\n• Creates new parcels (subdivision)\n\nSURVEY:\n• Broader term\n• May or may not create plat\n• Includes research, fieldwork, analysis',
    category: 'definition',
    examTrack: 'ps'
  },

  // Domain 3: Standards and Specifications (Additional)
  {
    domain: 'Standards & Specifications',
    front: 'Double Proportionate Measurement',
    back: 'Restores LOST corner at intersection of TWO lines:\n\n• First: N-S line proportioned\n• Second: E-W line proportioned\n• Final position at intersection\n\nUsed for interior section corners',
    category: 'concept',
    examTrack: 'ps'
  },
  {
    domain: 'Standards & Specifications',
    front: 'Original vs Resurvey Corner',
    back: 'ORIGINAL CORNER:\n• Set by original government survey\n• Controls absolutely\n\nRESURVEY:\n• Reestablishes position\n• Cannot contradict original\n• Evidence hierarchy applies',
    category: 'concept',
    examTrack: 'ps'
  },
  {
    domain: 'Standards & Specifications',
    front: 'ALTA Zoning Report (Table A Item 6)',
    back: 'When requested, surveyor provides:\n\n• Zoning classification\n• Building setback lines\n• Parking requirements\n• Height restrictions\n\nRequires zoning research',
    category: 'concept',
    examTrack: 'ps'
  },
  {
    domain: 'Standards & Specifications',
    front: 'ALTA Certificate Requirements',
    back: 'Survey must be certified to:\n\n• Title insurance company\n• Lender (if applicable)\n• Buyer/Owner\n\nSurveyor attests to accuracy and standards compliance',
    category: 'concept',
    examTrack: 'ps'
  },
  {
    domain: 'Standards & Specifications',
    front: 'Minimum Standard Detail Requirements (MSDR)',
    back: 'ALTA/NSPS core requirements (2026):\n\n• Boundary delineation\n• Visible improvements\n• Apparent easements\n• Evidence of utilities\n• Water features\n• Cemeteries and burial grounds (Section 5.F)\n\nMust be shown on every survey',
    category: 'concept',
    examTrack: 'ps'
  },
  {
    domain: 'Standards & Specifications',
    front: 'Standard Corner',
    back: 'In PLSS:\n\n• Set on township boundary\n• Guide meridian or standard parallel\n• Usually at 24-mile intervals\n• Corrects accumulated error',
    category: 'definition',
    examTrack: 'ps'
  },
  {
    domain: 'Standards & Specifications',
    front: 'Closing Corner',
    back: 'In PLSS:\n\n• Where survey line meets a previously established line\n• Falls SHORT of standard corner\n• Creates "closing" measurement\n\nCommon on north and west lines',
    category: 'definition',
    examTrack: 'ps'
  },
  {
    domain: 'Standards & Specifications',
    front: 'PLSS Fractional Sections',
    back: 'Sections that contain:\n\n• More or less than 640 acres\n• Usually on north/west township edges\n• Lots numbered 1, 2, 3, 4...\n• Irregular due to closing corners',
    category: 'concept',
    examTrack: 'ps'
  },
  {
    domain: 'Standards & Specifications',
    front: 'Lot and Block System',
    back: 'Recorded subdivision description:\n\n• Lot = individual parcel\n• Block = group of lots\n• Reference recorded plat\n• Example: Lot 5, Block 3, Smith Addition',
    category: 'definition',
    examTrack: 'ps'
  },
  {
    domain: 'Standards & Specifications',
    front: 'Mean High Water (MHW)',
    back: 'Average of all high waters:\n\n• Over 18.6 year tidal cycle\n• Boundary for tidal lands\n• Below MHW often public\n• Varies by state law',
    category: 'definition',
    examTrack: 'ps'
  },
  {
    domain: 'Standards & Specifications',
    front: 'Ordinary High Water Mark (OHWM)',
    back: 'Non-tidal water boundary:\n\n• Where water normally stands\n• Visible line on bank\n• Vegetation, staining indicators\n• Often private boundary',
    category: 'definition',
    examTrack: 'ps'
  },
  {
    domain: 'Standards & Specifications',
    front: 'Section Subdivision (Standard)',
    back: 'Divide 640-acre section:\n\n• Connect opposite quarter corners\n• Creates 4 quarter sections (160 ac each)\n• Further subdivide to 40s, 10s, etc.\n• Aliquot parts',
    category: 'concept',
    examTrack: 'ps'
  },

  // Domain 4: Business Practices (Additional)
  {
    domain: 'Business Practices',
    front: 'Fixed Fee vs Hourly Rate',
    back: 'FIXED FEE:\n• Set price for scope\n• Risk on surveyor\n• Client knows cost upfront\n\nHOURLY RATE:\n• Bill actual time\n• Client bears scope risk\n• May include cap',
    category: 'concept',
    examTrack: 'ps'
  },
  {
    domain: 'Business Practices',
    front: 'Retainer Fee',
    back: 'Advance payment to:\n\n• Secure services\n• Apply to future invoices\n• Cover initial work\n• Demonstrate client commitment\n\nCommon for litigation support',
    category: 'definition',
    examTrack: 'ps'
  },
  {
    domain: 'Business Practices',
    front: 'Change Order',
    back: 'Written modification to contract:\n\n• Documents scope changes\n• Adjusts fee if applicable\n• Both parties sign\n• Prevents disputes\n\nEssential for scope creep prevention',
    category: 'definition',
    examTrack: 'ps'
  },
  {
    domain: 'Business Practices',
    front: 'Multiplier in Billing',
    back: 'Factor applied to direct costs:\n\n• Covers overhead + profit\n• Example: 2.5 multiplier\n• $30/hr employee = $75/hr billing\n\nVaries by firm and market',
    category: 'concept',
    examTrack: 'ps'
  },
  {
    domain: 'Business Practices',
    front: 'Subcontractor Liability',
    back: 'Prime surveyor responsibility:\n\n• Responsible for sub\'s work\n• Must review and verify\n• Cannot delegate professional responsibility\n• Should have agreements in place',
    category: 'concept',
    examTrack: 'ps'
  },
  {
    domain: 'Business Practices',
    front: 'Client Confidentiality',
    back: 'Professional obligation to:\n\n• Protect client information\n• Not disclose without permission\n• Secure files and data\n• Exception: legal requirements',
    category: 'concept',
    examTrack: 'ps'
  },
  {
    domain: 'Business Practices',
    front: 'Expert Witness Role',
    back: 'Surveyor in court:\n\n• Provide OPINION testimony\n• Based on specialized knowledge\n• Must be qualified by court\n• Duty is to truth, not client',
    category: 'concept',
    examTrack: 'ps'
  },
  {
    domain: 'Business Practices',
    front: 'Record Retention Requirements',
    back: 'How long to keep files:\n\n• Varies by state (often 10+ years)\n• From completion date\n• Original notes, calcs, plats\n• May need for future liability',
    category: 'concept',
    examTrack: 'ps'
  },
  {
    domain: 'Business Practices',
    front: 'Soliciting Work Restrictions',
    back: 'Ethics rules typically prohibit:\n\n• Offering kickbacks\n• Underbidding to harm competitor\n• Disparaging other professionals\n• False advertising\n\nCompetition must be fair',
    category: 'concept',
    examTrack: 'ps'
  },
  {
    domain: 'Business Practices',
    front: 'Negligence Elements',
    back: 'To prove professional negligence:\n\n1. DUTY existed\n2. BREACH of standard of care\n3. CAUSATION (breach caused harm)\n4. DAMAGES resulted\n\nAll four elements required',
    category: 'concept',
    examTrack: 'ps'
  },
  {
    domain: 'Business Practices',
    front: 'Standard of Care',
    back: 'Legal benchmark for performance:\n\n• Same care as reasonable surveyor\n• Similar circumstances\n• Same locality and time\n• Not perfection required',
    category: 'definition',
    examTrack: 'ps'
  },
  {
    domain: 'Business Practices',
    front: 'Continuing Education Requirements',
    back: 'Most states require:\n\n• Annual or biennial hours\n• Approved providers\n• Topics relevant to practice\n• Documentation for renewal\n\nCheck specific state board rules',
    category: 'concept',
    examTrack: 'ps'
  },

  // Domain 5: Areas of Practice (Additional)
  {
    domain: 'Areas of Practice',
    front: 'Right-of-Way Survey',
    back: 'Survey for linear facilities:\n\n• Roads, utilities, pipelines\n• Centerline and boundaries\n• Existing improvements\n• Identify acquisitions needed',
    category: 'definition',
    examTrack: 'ps'
  },
  {
    domain: 'Areas of Practice',
    front: 'Hydrographic Survey',
    back: 'Survey of water features:\n\n• Depth measurements\n• Shoreline location\n• Underwater obstructions\n• Often for navigation/dredging',
    category: 'definition',
    examTrack: 'ps'
  },
  {
    domain: 'Areas of Practice',
    front: 'Monumentation Types',
    back: 'Common permanent markers:\n\n• Iron pipes or rods\n• Rebar with caps\n• Concrete monuments\n• Brass disks in concrete\n• Aluminum caps\n\nState rules vary on requirements',
    category: 'concept',
    examTrack: 'ps'
  },
  {
    domain: 'Areas of Practice',
    front: 'Slope Staking',
    back: 'Construction staking for earthwork:\n\n• Marks where cut/fill slope meets existing ground\n• Shows catch point\n• Labeled with cut or fill depth\n• Essential for grading operations',
    category: 'definition',
    examTrack: 'ps'
  },
  {
    domain: 'Areas of Practice',
    front: 'Blue Tops',
    back: 'Grade stakes painted blue on top:\n\n• Set to finished grade elevation\n• Used for fine grading\n• Contractor cuts/fills to match top\n• Subgrade or finish surface',
    category: 'definition',
    examTrack: 'ps'
  },
  {
    domain: 'Areas of Practice',
    front: 'Superelevation',
    back: 'Banking of roadway curves:\n\n• Outer edge higher than inner\n• Counteracts centrifugal force\n• Transition from normal crown\n• Expressed as percent or ratio',
    category: 'definition',
    examTrack: 'ps'
  },
  {
    domain: 'Areas of Practice',
    front: 'Vertical Curve Types',
    back: 'CREST CURVE:\n• Convex (hill top)\n• Sight distance critical\n\nSAG CURVE:\n• Concave (valley)\n• Headlight sight distance\n\nBoth typically parabolic',
    category: 'concept',
    examTrack: 'ps'
  },
  {
    domain: 'Areas of Practice',
    front: 'Point of Vertical Curvature (PVC)',
    back: 'Where vertical curve begins:\n\n• Transition from tangent to curve\n• Analogous to PC in horizontal\n• Station and elevation defined\n• Also: PVT (Point of Vertical Tangency)',
    category: 'definition',
    examTrack: 'ps'
  },
  {
    domain: 'Areas of Practice',
    front: 'Cross Section Survey',
    back: 'Perpendicular profiles:\n\n• Cut at regular intervals along centerline\n• Show existing ground shape\n• Used for volume calculations\n• Cut/fill quantities',
    category: 'definition',
    examTrack: 'ps'
  },
  {
    domain: 'Areas of Practice',
    front: 'Mass Haul Diagram',
    back: 'Graphical tool for earthwork:\n\n• Shows cumulative cut/fill\n• Identifies borrow/waste\n• Optimizes haul distances\n• Balance line analysis',
    category: 'concept',
    examTrack: 'ps'
  },
  {
    domain: 'Areas of Practice',
    front: 'LiDAR Technology',
    back: 'Light Detection and Ranging:\n\n• Laser-based distance measurement\n• Airborne or terrestrial\n• Creates dense point cloud\n• Used for DTM/DSM generation',
    category: 'definition',
    examTrack: 'ps'
  },
  {
    domain: 'Areas of Practice',
    front: 'UAV/Drone Survey Regulations',
    back: 'FAA Part 107 requirements:\n\n• Remote pilot certificate\n• Below 400 feet AGL\n• Visual line of sight\n• Daylight operations (mostly)\n• No flights over people (exceptions)',
    category: 'concept',
    examTrack: 'ps'
  },
  {
    domain: 'Areas of Practice',
    front: 'Photogrammetric Scale',
    back: 'Relationship in aerial photography:\n\nScale = f / H\n\nf = focal length\nH = flying height above ground\n\nLarger scale = more detail',
    category: 'formula',
    examTrack: 'ps'
  },
  {
    domain: 'Areas of Practice',
    front: 'Subdivision Platting Requirements',
    back: 'Typical state requirements:\n\n• Licensed surveyor signature\n• Monument locations\n• Lot dimensions and areas\n• Easement locations\n• Dedications (roads, etc.)\n• Required certifications',
    category: 'concept',
    examTrack: 'ps'
  },
  {
    domain: 'Areas of Practice',
    front: 'Control Survey Purpose',
    back: 'Establishes framework for:\n\n• Horizontal positions\n• Vertical elevations\n• Reference for all other work\n• Higher accuracy than detail',
    category: 'concept',
    examTrack: 'ps'
  },
  {
    domain: 'Areas of Practice',
    front: 'Lease Line Survey',
    back: 'Survey of leasehold boundaries:\n\n• May differ from property lines\n• Common in oil/gas, mining\n• Defines extent of use rights\n• Often tied to legal description',
    category: 'definition',
    examTrack: 'ps'
  }
];
