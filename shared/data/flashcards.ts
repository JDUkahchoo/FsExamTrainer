import type { Flashcard } from '../schema';
import { PS_FLASHCARDS } from './ps-flashcards';

// FS Exam Flashcards
const FS_FLASHCARDS: Omit<Flashcard, 'id'>[] = [
  // Math & Basic Science - Formulas
  {
    domain: 'Math & Basic Science',
    front: '1 acre = ? square feet',
    back: '43,560 sq ft\n\nAlso remember:\n• 1 mile = 5,280 ft = 80 chains\n• 1 chain = 66 ft = 100 links\n• 1 rod = 16.5 ft',
    category: 'formula',
    examTrack: 'fs'
  },
  {
    domain: 'Math & Basic Science',
    front: 'Standard Deviation Formula',
    back: 'σ = √[Σ(x - x̄)² / (n-1)]\n\nWhere:\n• x = individual measurement\n• x̄ = mean\n• n = number of measurements\n\n95% confidence ≈ ±2σ',
    category: 'formula',
    examTrack: 'fs'
  },
  {
    domain: 'Math & Basic Science',
    front: 'Error Propagation: Sum/Difference',
    back: 'For Z = A ± B:\n\nσz² = σa² + σb²\n\n(Errors add in quadrature)\n\nStandard deviation of sum = √(σa² + σb²)',
    category: 'formula',
    examTrack: 'fs'
  },
  {
    domain: 'Math & Basic Science',
    front: 'Error Propagation: Product',
    back: 'For Z = A × B:\n\n(σz/Z)² = (σa/A)² + (σb/B)²\n\nRelative errors combine in quadrature',
    category: 'formula',
    examTrack: 'fs'
  },

  // Field Data Acquisition
  {
    domain: 'Field Data Acquisition',
    front: 'Temperature Correction for Tapes',
    back: 'Ct = α(T - Ts)L\n\nWhere:\n• α = coefficient of thermal expansion\n• T = field temperature\n• Ts = standard temperature (68°F)\n• L = measured length\n\nSteel: α ≈ 0.00000645/°F',
    category: 'formula',
    examTrack: 'fs'
  },
  {
    domain: 'Field Data Acquisition',
    front: 'Curvature & Refraction Correction',
    back: 'C&R = -0.667M²  (in feet)\n\nWhere M = distance in miles\n\nCurvature lowers line of sight\nRefraction raises it\nNet effect ≈ -0.67 ft/mile²',
    category: 'formula',
    examTrack: 'fs'
  },
  {
    domain: 'Field Data Acquisition',
    front: 'Differential Leveling: HI Method',
    back: 'HI = Elev + BS\nElev_new = HI - FS\n\nWhere:\n• HI = Height of Instrument\n• BS = Backsight\n• FS = Foresight\n\nChange in elev = BS - FS',
    category: 'formula',
    examTrack: 'fs'
  },
  {
    domain: 'Field Data Acquisition',
    front: 'EDM Error (ppm)',
    back: 'Total Error = ±(A + B × ppm)\n\nWhere:\n• A = instrument constant (mm)\n• B = measured distance\n• ppm = parts per million\n\nExample: ±(3mm + 2ppm)\nFor 1000m: ±(3 + 2) = ±5mm',
    category: 'formula',
    examTrack: 'fs'
  },

  // Plane Survey Computations
  {
    domain: 'Survey Computations & Applications',
    front: 'Latitude & Departure Formulas',
    back: 'Lat = D × cos(Az)\nDep = D × sin(Az)\n\nWhere:\n• D = distance\n• Az = azimuth from north\n\n• N/S = Latitude\n• E/W = Departure',
    category: 'formula',
    examTrack: 'fs'
  },
  {
    domain: 'Survey Computations & Applications',
    front: 'Inverse Formula (Azimuth)',
    back: 'Az = atan(ΔE / ΔN)\n\nQuadrant adjustments:\n• NE: Az = atan(ΔE/ΔN)\n• SE: Az = 180° - atan(ΔE/|ΔN|)\n• SW: Az = 180° + atan(|ΔE|/|ΔN|)\n• NW: Az = 360° - atan(|ΔE|/ΔN)',
    category: 'formula',
    examTrack: 'fs'
  },
  {
    domain: 'Survey Computations & Applications',
    front: 'Horizontal Curve: Tangent Length (T)',
    back: 'T = R × tan(Δ/2)\n\nWhere:\n• R = radius\n• Δ = deflection angle\n\nT = distance from PI to PC or PT',
    category: 'formula',
    examTrack: 'fs'
  },
  {
    domain: 'Survey Computations & Applications',
    front: 'Horizontal Curve: Length (L)',
    back: 'L = (RΔπ) / 180°\n\nOr: L = 100Δ / D\n\nWhere:\n• R = radius\n• Δ = central angle (degrees)\n• D = degree of curve',
    category: 'formula',
    examTrack: 'fs'
  },
  {
    domain: 'Survey Computations & Applications',
    front: 'Area by Coordinates (DMD Method)',
    back: 'Area = |Σ(DMD × Lat)| / 2\n\nDouble Meridian Distance:\n• First DMD = First Dep\n• Next DMD = Prev DMD + Prev Dep + Current Dep\n• Last DMD = Last Dep (check)',
    category: 'formula',
    examTrack: 'fs'
  },

  // Mapping, GIS, and CAD
  {
    domain: 'Mapping, GIS, and CAD',
    front: 'Photo Scale Formula',
    back: 'Scale = f / (H - h)\n\nWhere:\n• f = focal length\n• H = flying height above datum\n• h = ground elevation\n\nFor flat terrain: S = f / H',
    category: 'formula',
    examTrack: 'fs'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    front: 'Raster vs Vector Data',
    back: 'RASTER:\n• Grid of cells/pixels\n• Examples: satellite imagery, DEMs\n• Good for continuous data\n\nVECTOR:\n• Points, lines, polygons\n• Examples: roads, parcels, buildings\n• Precise boundaries',
    category: 'concept',
    examTrack: 'fs'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    front: 'Contour Line Rules',
    back: '• Never cross (except overhanging cliffs)\n• Closer = steeper slope\n• Point upstream in valleys\n• Perpendicular to steepest slope\n• Close on themselves\n• Uniform slope = evenly spaced',
    category: 'concept',
    examTrack: 'fs'
  },

  // Boundary Law & PLSS
  {
    domain: 'Boundary Law & PLSS',
    front: 'Order of Conflicting Calls (Hierarchy)',
    back: '1. Natural Monuments\n2. Artificial Monuments\n3. Bearings/Directions\n4. Distances\n5. Area/Quantity\n\n"Monuments control over measurements"',
    category: 'concept',
    examTrack: 'fs'
  },
  {
    domain: 'Boundary Law & PLSS',
    front: 'PLSS Section Numbering',
    back: 'Start: NE corner (Sec 1)\n\nSerpentine pattern:\n1-6 (W), 7-12 (E), 13-18 (W),\n19-24 (E), 25-30 (W), 31-36 (E)\n\nEnd: SE corner (Sec 36)',
    category: 'concept',
    examTrack: 'fs'
  },
  {
    domain: 'Boundary Law & PLSS',
    front: 'Section Subdivision (Aliquots)',
    back: 'Section = 640 acres (1 mi²)\n• 1/2 Section = 320 acres\n• 1/4 Section = 160 acres\n• 1/4 of 1/4 = 40 acres\n• 1/4 of 1/4 of 1/4 = 10 acres',
    category: 'formula',
    examTrack: 'fs'
  },
  {
    domain: 'Boundary Law & PLSS',
    front: 'Lost vs Obliterated Corner',
    back: 'LOST:\n• No visible evidence\n• Position unknown\n• Must be RESTORED\n\nOBLITERATED:\n• Position can be recovered\n• Evidence exists (measurements, bearings)\n• Can be REHABILITATED',
    category: 'definition',
    examTrack: 'fs'
  },
  {
    domain: 'Boundary Law & PLSS',
    front: 'Single Proportionate Measurement',
    back: 'Used for:\n• Lost quarter corners\n• Lost section corners on township boundaries\n\nProportion based on ONE line (record distances between found corners)',
    category: 'concept',
    examTrack: 'fs'
  },
  {
    domain: 'Boundary Law & PLSS',
    front: 'Double Proportionate Measurement',
    back: 'Used for:\n• Lost interior section corners\n• Lost closing corners\n\nProportion based on TWO lines (N-S and E-W)\n\nMore complex than single proportion',
    category: 'concept',
    examTrack: 'fs'
  },

  // Geodesy, GPS, Astronomy
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'h = H + N',
    back: 'Ellipsoid Height Relationship:\n\n• h = ellipsoid height (GPS)\n• H = orthometric height (elevation MSL)\n• N = geoid height (separation)\n\nTo get elevation from GPS:\nH = h - N',
    category: 'formula',
    examTrack: 'fs'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'NAD 27 vs NAD 83',
    back: 'NAD 27:\n• Clarke 1866 ellipsoid\n• Meades Ranch, KS origin\n• Horizontal datum\n\nNAD 83:\n• GRS 80 ellipsoid\n• Geocentric\n• Earth-centered\n\nShifts: typically 10-100m',
    category: 'definition',
    examTrack: 'fs'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'NGVD 29 vs NAVD 88',
    back: 'NGVD 29:\n• Vertical datum\n• Based on mean sea level\n\nNAVD 88:\n• Current vertical datum\n• Helmert orthometric heights\n• Based on geoid model\n\nDifferences: up to 1+ meter',
    category: 'definition',
    examTrack: 'fs'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'DOP (Dilution of Precision)',
    back: 'Measures satellite geometry:\n\n• PDOP = Position (3D)\n• HDOP = Horizontal (2D)\n• VDOP = Vertical\n• GDOP = Geometric (overall)\n\nLower is better:\n< 2 = Excellent\n2-5 = Good\n5-10 = Moderate\n> 10 = Poor',
    category: 'concept',
    examTrack: 'fs'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'RTK vs Static GPS',
    back: 'RTK (Real-Time Kinematic):\n• Real-time corrections\n• cm accuracy\n• Radio/cellular link\n• Faster (minutes)\n\nSTATIC:\n• Post-processing\n• mm-cm accuracy\n• Longer sessions (20min-hours)\n• Better for control networks',
    category: 'concept',
    examTrack: 'fs'
  },

  // Professional Practice
  {
    domain: 'Professional Practice',
    front: 'NCEES Fundamental Principle',
    back: 'Paramount Obligation:\n\n"Hold paramount the safety, health, and welfare of the public."\n\nThis supersedes:\n• Client interests\n• Employer directives\n• Economic considerations',
    category: 'definition',
    examTrack: 'fs'
  },
  {
    domain: 'Professional Practice',
    front: 'Types of Deeds',
    back: 'WARRANTY DEED:\n• Best protection\n• Seller guarantees title\n• Will defend against claims\n\nQUITCLAIM DEED:\n• No warranties\n• "Whatever interest I have"\n• Minimal protection',
    category: 'definition',
    examTrack: 'fs'
  },
  {
    domain: 'Professional Practice',
    front: 'Easement Types',
    back: 'APPURTENANT:\n• Benefits specific parcel (dominant estate)\n• Runs with the land\n\nIN GROSS:\n• Benefits person/entity\n• Doesn\'t run with land\n\nBY NECESSITY:\n• Landlocked parcel\n• Access requirement',
    category: 'definition',
    examTrack: 'fs'
  },
  {
    domain: 'Professional Practice',
    front: 'Adverse Possession Elements',
    back: 'Requirements (OCEAN):\n• Open & Notorious\n• Continuous\n• Exclusive\n• Adverse/Hostile\n• Under claim of right\n\nTypically 10-20 years\n(varies by state)',
    category: 'concept',
    examTrack: 'fs'
  },

  // Surveying Principles
  {
    domain: 'Surveying Principles',
    front: 'Differential Leveling Formula',
    back: 'HI = Known Elev + BS\nNew Elev = HI - FS\n\nWhere:\n• HI = Height of Instrument\n• BS = Backsight\n• FS = Foresight',
    category: 'formula',
    examTrack: 'fs'
  },
  {
    domain: 'Surveying Principles',
    front: 'Traverse Closure Error',
    back: 'E = √[(ΣLat)² + (ΣDep)²]\n\nPrecision = Perimeter / E\n\nExample: 1:10,000 means\n1 unit error per 10,000 units',
    category: 'formula',
    examTrack: 'fs'
  },
  {
    domain: 'Surveying Principles',
    front: 'Angular Misclosure (Polygon)',
    back: 'Theoretical sum = (n-2) × 180°\n\nWhere n = number of sides\n\nMisclosure = Measured - Theoretical',
    category: 'formula',
    examTrack: 'fs'
  },
  {
    domain: 'Surveying Principles',
    front: 'Precision vs Accuracy',
    back: 'PRECISION:\n• Consistency of measurements\n• Repeatability\n\nACCURACY:\n• Closeness to true value\n• Can be precise but not accurate',
    category: 'concept',
    examTrack: 'fs'
  },
  {
    domain: 'Surveying Principles',
    front: 'Types of Survey Errors',
    back: 'SYSTEMATIC:\n• Predictable, correctable\n• Same direction\n\nRANDOM:\n• Unpredictable\n• Normal distribution\n\nBLUNDERS:\n• Mistakes, must eliminate',
    category: 'concept',
    examTrack: 'fs'
  },
  {
    domain: 'Surveying Principles',
    front: 'Total Station Components',
    back: 'Combines:\n• EDM (distance)\n• Theodolite (angles)\n• Data collector\n\nMeasures horizontal & vertical angles plus slope distance',
    category: 'definition',
    examTrack: 'fs'
  },

  // ─── Boundary Law & PLSS (Additional) ───

  {
    domain: 'Boundary Law & PLSS',
    front: 'Easement Appurtenant vs Easement in Gross',
    back: 'APPURTENANT:\n• Involves two parcels: dominant (benefits) & servient (burdened)\n• Runs with the land — transfers with deed\n\nIN GROSS:\n• Benefits a person or entity, not a parcel\n• Does not run with the land\n• Example: utility company easement',
    category: 'definition',
    examTrack: 'fs'
  },
  {
    domain: 'Boundary Law & PLSS',
    front: 'Express vs Implied vs Prescriptive Easement',
    back: 'EXPRESS: Created by written instrument (deed or will)\n\nIMPLIED: Arises from circumstances — prior use, necessity, or plat\n• Must show quasi-dominant & quasi-servient use before severance\n\nPRESCRIPTIVE: Gained by open, notorious, continuous, hostile use\n• Similar to adverse possession but no exclusivity required\n• Statutory period varies by state',
    category: 'concept',
    examTrack: 'fs'
  },
  {
    domain: 'Boundary Law & PLSS',
    front: 'Easement by Necessity',
    back: 'Created when a parcel is landlocked with no legal access to a public road.\n\nRequirements:\n• Common ownership (unity of title) before severance\n• Necessity existed at time of severance\n• Strict necessity — not mere convenience\n\nTerminates when necessity ends.',
    category: 'definition',
    examTrack: 'fs'
  },
  {
    domain: 'Boundary Law & PLSS',
    front: 'Easement Termination Methods',
    back: '• Release — written document from dominant owner\n• Merger — dominant & servient parcels unite\n• Abandonment — intent + non-use\n• Estoppel — servient owner relies on statements\n• Prescription — servient owner blocks use for statutory period\n• End of necessity — for easements by necessity\n• Expiration — if term was stated',
    category: 'concept',
    examTrack: 'fs'
  },
  {
    domain: 'Boundary Law & PLSS',
    front: 'Mechanic\'s Lien',
    back: 'A statutory lien securing payment for labor or materials used to improve real property.\n\n• Filed by contractor, subcontractor, or supplier\n• Attaches to the property, not the person\n• Must be filed within statutory time limit\n• Priority often relates back to date work commenced',
    category: 'definition',
    examTrack: 'fs'
  },
  {
    domain: 'Boundary Law & PLSS',
    front: 'Restrictive Covenants',
    back: 'Private agreements that limit land use, often in subdivision plats or deeds.\n\n• Run with the land if they "touch and concern" it\n• Enforceable by neighboring lot owners\n• Cannot violate public policy or fair housing laws\n• More restrictive than zoning — zoning sets minimum, covenants can exceed',
    category: 'definition',
    examTrack: 'fs'
  },
  {
    domain: 'Boundary Law & PLSS',
    front: 'Simultaneous vs Sequential Conveyances',
    back: 'SIMULTANEOUS:\n• All parcels conveyed at same time (e.g., subdivision)\n• Boundaries interpreted relative to each other\n\nSEQUENTIAL:\n• Parcels conveyed at different times\n• Senior rights (first conveyance) prevail over junior rights\n• Later conveyances get what remains',
    category: 'concept',
    examTrack: 'fs'
  },
  {
    domain: 'Boundary Law & PLSS',
    front: 'First in Time, First in Right',
    back: 'Common law priority rule:\n\n• The first recorded valid conveyance has superior claim\n• Senior deed controls over junior deed\n• Applies to boundary disputes between adjacent parcels\n• Modified by recording statutes (race, notice, race-notice)\n• Exception: BFP (bona fide purchaser) protections',
    category: 'concept',
    examTrack: 'fs'
  },
  {
    domain: 'Boundary Law & PLSS',
    front: 'Chain of Title',
    back: 'The chronological sequence of conveyances and encumbrances affecting a parcel from sovereign (government patent) to the present owner.\n\n• Examined during title search\n• Gaps or breaks create title defects\n• Recorded in county recorder\'s office\n• Title insurance protects against hidden defects',
    category: 'definition',
    examTrack: 'fs'
  },
  {
    domain: 'Boundary Law & PLSS',
    front: 'Grantor-Grantee Index',
    back: 'Recording system used by county offices to index land records:\n\n• GRANTOR index: alphabetical by seller/transferor name\n• GRANTEE index: alphabetical by buyer/transferee name\n• Searcher traces chain: start with grantee, work backward\n• Alternative: Tract index — organized by parcel, not name\n• Tract index is more efficient but less common',
    category: 'concept',
    examTrack: 'fs'
  },
  {
    domain: 'Boundary Law & PLSS',
    front: 'Bundle of Rights / Mineral Rights',
    back: 'BUNDLE OF RIGHTS includes:\n• Surface rights\n• Mineral rights (subsurface)\n• Air rights\n• Water rights\n• Right to use, sell, lease, exclude\n\nMineral rights can be severed from surface rights.\nOnce severed, they are a separate estate.\nMineral owner typically has right of reasonable surface access.',
    category: 'concept',
    examTrack: 'fs'
  },
  {
    domain: 'Boundary Law & PLSS',
    front: 'Boundary by Acquiescence',
    back: 'A boundary line recognized and accepted by adjoining landowners over a long period.\n\n• Requires mutual acquiescence (both sides accept)\n• Must continue for statutory period (often same as adverse possession)\n• No explicit agreement needed — silence/inaction suffices\n• Differs from agreement: acquiescence is passive acceptance',
    category: 'concept',
    examTrack: 'fs'
  },
  {
    domain: 'Boundary Law & PLSS',
    front: 'Boundary by Agreement / Practical Location',
    back: 'AGREEMENT: Adjoining owners expressly agree on uncertain boundary location.\n• Requires genuine uncertainty about true line\n• Must be followed by possession\n\nPRACTICAL LOCATION: Boundary established by surveyor\'s marks accepted by parties.\n• Long acceptance makes it controlling\n• Fixes ambiguous descriptions',
    category: 'concept',
    examTrack: 'fs'
  },
  {
    domain: 'Boundary Law & PLSS',
    front: 'Metes and Bounds Description Elements',
    back: 'METES = measurements (distance & direction)\nBOUNDS = boundaries (natural & artificial features)\n\nKey elements:\n• Point of beginning (POB)\n• Bearings (e.g., N 45° 30\' E)\n• Distances along each course\n• Monuments (calls to physical features)\n• Closure back to POB\n• Adjoiners (neighboring parcels)',
    category: 'concept',
    examTrack: 'fs'
  },
  {
    domain: 'Boundary Law & PLSS',
    front: 'Point of Beginning (POB)',
    back: 'The starting (and ending) point of a metes and bounds description.\n\n• Must be identifiable and recoverable\n• Often tied to a monument or reference point\n• Description must close back to POB\n• POB ≠ Point of Commencement (POC)\n• POC is the reference point from which POB is located',
    category: 'definition',
    examTrack: 'fs'
  },
  {
    domain: 'Boundary Law & PLSS',
    front: 'Three Types of Legal Descriptions',
    back: '1. PLSS (Rectangular Survey):\n   • Township, range, section, aliquot parts\n   • Used in 30 public-land states\n\n2. METES & BOUNDS:\n   • Bearings, distances, monuments\n   • Used in original 13 colonies & TX\n\n3. LOT & BLOCK (Recorded Plat):\n   • References recorded subdivision map\n   • Lot 5, Block 3, Sunny Acres',
    category: 'concept',
    examTrack: 'fs'
  },
  {
    domain: 'Boundary Law & PLSS',
    front: 'PLSS Acreage: N 1/2 of SW 1/4',
    back: 'Section = 640 acres\nSW 1/4 = 640 × 1/4 = 160 acres\nN 1/2 of that = 160 × 1/2 = 80 acres\n\nMethod: Read description RIGHT to LEFT.\nMultiply fractions: 1/2 × 1/4 = 1/8\n640 × 1/8 = 80 acres\n\nDimensions: 2,640 ft × 1,320 ft',
    category: 'formula',
    examTrack: 'fs'
  },
  {
    domain: 'Boundary Law & PLSS',
    front: 'Controlling Elements: Adjoiners Rank',
    back: 'Hierarchy of conflicting calls (expanded):\n1. Natural monuments (rivers, ridges)\n2. Artificial monuments (stakes, pipes, fences)\n3. Adjoiners / record boundaries of adjoining tracts\n4. Courses (bearings/directions)\n5. Distances\n6. Area / quantity\n\nAdjoiners rank above courses & distances because they reflect intent of the parties.',
    category: 'concept',
    examTrack: 'fs'
  },
  {
    domain: 'Boundary Law & PLSS',
    front: 'Sources of Law: Federal vs State vs Common',
    back: 'FEDERAL LAW:\n• PLSS rules, BLM Manual of Surveying Instructions\n• Controls public-land surveys\n\nSTATE LAW:\n• Licensing, recording statutes, adverse possession periods\n• State-specific surveying standards\n\nCOMMON LAW:\n• Court decisions / case law\n• Boundary principles (acquiescence, estoppel)\n• Evolves through judicial interpretation',
    category: 'concept',
    examTrack: 'fs'
  },
  {
    domain: 'Boundary Law & PLSS',
    front: 'Recording Statutes: Race vs Notice vs Race-Notice',
    back: 'RACE: First to record wins, regardless of knowledge.\n\nNOTICE: Subsequent BFP without notice wins over prior unrecorded deed.\n\nRACE-NOTICE (most common): Subsequent BFP wins only if:\n• Takes without notice AND\n• Records first\n\nBFP = Bona Fide Purchaser (pays value, no knowledge of prior claim)',
    category: 'concept',
    examTrack: 'fs'
  },

  // ─── Surveying Principles (Additional) ───

  {
    domain: 'Surveying Principles',
    front: 'Spherical Excess Formula',
    back: 'ε = (A / R²) × (180/π)  or  ε" = A / R² × ρ"\n\nWhere:\n• ε = spherical excess (degrees or seconds)\n• A = area of triangle on sphere\n• R = radius of Earth (~6,371 km)\n• ρ" = 206,265 (seconds per radian)\n\nSum of angles in spherical triangle = 180° + ε',
    category: 'formula',
    examTrack: 'fs'
  },
  {
    domain: 'Surveying Principles',
    front: 'Sea-Level Distance Reduction',
    back: 'D_sea = D_ground × R / (R + H)\n\nWhere:\n• D_sea = distance at sea level\n• D_ground = measured ground distance\n• R = mean radius of Earth (~6,371 km or 20,906,000 ft)\n• H = average elevation above sea level\n\nHigher elevation → shorter sea-level distance',
    category: 'formula',
    examTrack: 'fs'
  },
  {
    domain: 'Surveying Principles',
    front: 'Geoid Height Relationship: h = H + N',
    back: 'h = H + N\n\n• h = ellipsoid height (from GNSS)\n• H = orthometric height (elevation above geoid / MSL)\n• N = geoid undulation (geoid-ellipsoid separation)\n\nPositive N: geoid above ellipsoid\nNegative N: geoid below ellipsoid\nIn CONUS, N is typically negative (−8 to −53 m)',
    category: 'formula',
    examTrack: 'fs'
  },
  {
    domain: 'Surveying Principles',
    front: 'Deflection of the Vertical',
    back: 'The angle between the direction of gravity (plumb line) and the normal to the ellipsoid.\n\n• Caused by uneven mass distribution in Earth\n• Components: ξ (N-S) and η (E-W)\n• Affects astronomic vs geodetic coordinates\n• Typically a few arc-seconds\n• Important for precise leveling & GNSS',
    category: 'definition',
    examTrack: 'fs'
  },
  {
    domain: 'Surveying Principles',
    front: 'ECEF Coordinate System',
    back: 'Earth-Centered, Earth-Fixed coordinate system.\n\n• Origin at Earth\'s center of mass\n• X-axis: intersection of equator & prime meridian\n• Y-axis: 90° east on equator\n• Z-axis: toward North Pole (CTP)\n• GNSS satellites broadcast in ECEF\n• Cartesian (X, Y, Z) — not lat/lon',
    category: 'definition',
    examTrack: 'fs'
  },
  {
    domain: 'Surveying Principles',
    front: 'WGS 84 vs NAD 83 vs ITRF',
    back: 'WGS 84: GPS reference frame, maintained by DoD, global.\n\nNAD 83: North American datum, GRS 80 ellipsoid, fixed to NA plate.\n\nITRF: Most accurate global frame, maintained by IERS.\n• Accounts for tectonic plate motion\n\nNAD 83 & WGS 84 differ by ~1-2 m.\nITRF is the realization standard for precise work.',
    category: 'concept',
    examTrack: 'fs'
  },
  {
    domain: 'Surveying Principles',
    front: 'Convergence of Meridians',
    back: 'Meridians converge toward the poles, causing:\n\n• Sections in PLSS to narrow northward\n• Guide meridians & standard parallels correct accumulation\n• Grid north ≠ geodetic north (except on central meridian)\n• Convergence angle increases with latitude & distance from central meridian\n• Affects long-line azimuths',
    category: 'concept',
    examTrack: 'fs'
  },
  {
    domain: 'Surveying Principles',
    front: 'Magnetic Declination: East Add, West Subtract',
    back: 'Declination = angle between magnetic north & true north.\n\nTo convert magnetic bearing to true bearing:\n• East declination: ADD to magnetic bearing\n• West declination: SUBTRACT from magnetic bearing\n\nMnemonic: "East is lEast" (add) / "West is bEst" (subtract)\n\nDeclination changes over time — use current NOAA model.',
    category: 'formula',
    examTrack: 'fs'
  },
  {
    domain: 'Surveying Principles',
    front: 'Local Magnetic Attraction',
    back: 'Anomaly in compass readings caused by local magnetic interference.\n\n• Detected by comparing bearings of same line from both ends\n• If forward & back bearings differ by ≠ 180°, local attraction exists at one (or both) stations\n• Sources: iron deposits, power lines, vehicles, rebar\n• Does not affect all stations equally',
    category: 'concept',
    examTrack: 'fs'
  },
  {
    domain: 'Surveying Principles',
    front: 'Gunter\'s Chain',
    back: 'Standard unit of land measurement:\n\n• 1 chain = 66 feet = 4 rods = 100 links\n• 1 link = 0.66 ft = 7.92 inches\n• 80 chains = 1 mile\n• 10 sq chains = 1 acre\n• Developed by Edmund Gunter (1620)\n• Still referenced in PLSS & old deeds',
    category: 'definition',
    examTrack: 'fs'
  },
  {
    domain: 'Surveying Principles',
    front: 'Stadia Interval Factor',
    back: 'The ratio of distance to stadia intercept (rod interval).\n\n• Typical factor = 100 (for standard stadia constants)\n• D = K × s + C\n• K = stadia interval factor (usually 100)\n• s = rod intercept (top wire − bottom wire)\n• C = stadia constant (≈ 0 for internal-focus telescopes)\n\nFor inclined sights: D_horiz = K × s × cos²(α)',
    category: 'concept',
    examTrack: 'fs'
  },
  {
    domain: 'Surveying Principles',
    front: 'Solar Compass Purpose',
    back: 'An instrument that determines true (astronomic) north using the sun\'s position.\n\n• Not affected by magnetic attraction\n• Used historically in GLO/PLSS surveys\n• Required by early survey instructions for township/section lines\n• Replaced by Burt\'s solar compass observations\n• Now superseded by GNSS for true direction',
    category: 'definition',
    examTrack: 'fs'
  },
  {
    domain: 'Surveying Principles',
    front: 'Route Surveying: Station Format',
    back: 'Stationing uses format: XX+YY.yy\n\n• Station 0+00 = beginning of route\n• Station 10+00 = 1,000 ft from start\n• Station 25+50.25 = 2,550.25 ft from start\n• "+" separates hundreds of feet\n• Used in road, pipeline, & utility surveys\n• PI, PC, PT located by station number',
    category: 'concept',
    examTrack: 'fs'
  },
  {
    domain: 'Surveying Principles',
    front: 'Superelevation',
    back: 'The banking of a roadway on a horizontal curve.\n\n• Outer edge raised above inner edge\n• Counteracts centrifugal force\n• Rate expressed as ft/ft or %\n• e = V² / (15R) (approx., US customary)\n• Max e typically 4-12% depending on conditions\n• Transition from normal crown through superelevation runoff',
    category: 'definition',
    examTrack: 'fs'
  },
  {
    domain: 'Surveying Principles',
    front: 'Grid Convergence / Mapping Angle',
    back: 'The angle between grid north and geodetic (true) north at a point.\n\n• Zero on the central meridian of the projection\n• Increases with distance from central meridian\n• Positive east of CM, negative west (in N hemisphere)\n• γ ≈ Δλ × sin(φ)\n• Must be applied when converting geodetic azimuth ↔ grid azimuth\n• Grid Az = Geodetic Az − γ',
    category: 'concept',
    examTrack: 'fs'
  },

  // ─── Professional Practice (Additional) ───

  {
    domain: 'Professional Practice',
    front: 'E&O Insurance: Occurrence vs Claims-Made',
    back: 'OCCURRENCE POLICY:\n• Covers incidents during policy period\n• Claim can be filed after policy expires\n• More expensive\n\nCLAIMS-MADE POLICY:\n• Covers claims filed during policy period\n• Need "tail" coverage after policy ends\n• More common for surveyors\n• Retroactive date matters',
    category: 'concept',
    examTrack: 'fs'
  },
  {
    domain: 'Professional Practice',
    front: 'Four Elements of Negligence',
    back: 'To prove negligence, plaintiff must show all four:\n\n1. DUTY — surveyor owed duty of care\n2. BREACH — failed to meet standard of care\n3. CAUSATION — breach caused the harm\n4. DAMAGES — actual harm/loss occurred\n\nMnemonic: "Did Bad Conduct Damage?"',
    category: 'concept',
    examTrack: 'fs'
  },
  {
    domain: 'Professional Practice',
    front: 'Respondeat Superior / Vicarious Liability',
    back: 'Latin: "Let the master answer."\n\n• Employer is liable for employee\'s negligent acts performed within scope of employment\n• Applies to surveying firms — licensed surveyor responsible for crew\'s work\n• Does NOT require employer\'s own negligence\n• Independent contractors generally excluded',
    category: 'concept',
    examTrack: 'fs'
  },
  {
    domain: 'Professional Practice',
    front: 'CPM / Critical Path Method',
    back: 'Project scheduling technique:\n\n• Identifies longest sequence of dependent tasks\n• Critical path = minimum project duration\n• Float/slack = 0 on critical path activities\n• Delay on critical path delays entire project\n• Non-critical tasks have positive float\n• Used for survey project planning & resource allocation',
    category: 'concept',
    examTrack: 'fs'
  },
  {
    domain: 'Professional Practice',
    front: '811 Call Before You Dig',
    back: 'National one-call system for utility location:\n\n• Call 811 at least 48-72 hours before excavation\n• Utility companies mark underground lines\n• Required by law in most states\n• Color codes: Red=electric, Yellow=gas, Blue=water, Orange=telecom, Green=sewer\n• Failure to call → liability for damage',
    category: 'concept',
    examTrack: 'fs'
  },
  {
    domain: 'Professional Practice',
    front: 'MUTCD (Manual on Uniform Traffic Control Devices)',
    back: 'Federal standard for traffic control on public roads.\n\n• Published by FHWA\n• Governs signs, signals, markings, and devices\n• Surveyors must follow for work in or near roadways\n• Temporary Traffic Control (TTC) zone plans required\n• High-visibility safety apparel (ANSI Class 2/3) required',
    category: 'definition',
    examTrack: 'fs'
  },
  {
    domain: 'Professional Practice',
    front: 'Field Book: Pencil Only, No Erasures',
    back: 'Standard field book practices:\n\n• Use pencil (not pen) for weather durability\n• Never erase — draw single line through errors\n• Initial and date corrections\n• Record conditions (weather, crew, equipment)\n• Original notes are legal documents\n• "If it\'s not in the field book, it didn\'t happen"',
    category: 'concept',
    examTrack: 'fs'
  },
  {
    domain: 'Professional Practice',
    front: '3-2-1 Backup Rule',
    back: 'Data protection best practice:\n\n• 3 copies of data\n• 2 different storage media\n• 1 offsite backup\n\nCritical for survey data:\n• Field data, coordinate files, CAD drawings\n• Client deliverables, legal records\n• Cloud backup counts as offsite',
    category: 'concept',
    examTrack: 'fs'
  },
  {
    domain: 'Professional Practice',
    front: 'Expert Witness vs Fact Witness',
    back: 'FACT WITNESS:\n• Testifies to personal observations\n• Cannot offer opinions\n• "I measured the distance as 100.00 ft"\n\nEXPERT WITNESS:\n• Qualified by education/experience\n• Can offer professional opinions\n• "In my opinion, the boundary is located at..."\n• Must be accepted by court as expert',
    category: 'concept',
    examTrack: 'fs'
  },
  {
    domain: 'Professional Practice',
    front: 'Standard of Care in Surveying',
    back: 'The level of skill and diligence that a reasonably competent surveyor would exercise under similar circumstances.\n\n• Not perfection — reasonable competence\n• Measured against peers in same locale\n• Evolves with technology & practice\n• Defined by custom, standards, and regulations\n• Breach of standard = potential negligence',
    category: 'definition',
    examTrack: 'fs'
  },
  {
    domain: 'Professional Practice',
    front: 'Earned Value Management (EVM)',
    back: 'Project performance measurement:\n\n• PV = Planned Value (budgeted cost of scheduled work)\n• EV = Earned Value (budgeted cost of completed work)\n• AC = Actual Cost\n• CPI = EV/AC (cost performance index)\n• SPI = EV/PV (schedule performance index)\n• CPI < 1 = over budget; SPI < 1 = behind schedule',
    category: 'concept',
    examTrack: 'fs'
  },
  {
    domain: 'Professional Practice',
    front: 'Quality Control vs Quality Assurance',
    back: 'QUALITY CONTROL (QC):\n• Reactive — inspects outputs\n• Checks measurements, calculations, deliverables\n• Example: closing a traverse, checking calcs\n\nQUALITY ASSURANCE (QA):\n• Proactive — establishes processes\n• Ensures procedures are followed\n• Example: SOPs, calibration schedules, checklists\n\nQA prevents errors; QC detects them.',
    category: 'concept',
    examTrack: 'fs'
  },

  // ─── Applied Math & Statistics (Additional) ───

  {
    domain: 'Applied Mathematics & Statistics',
    front: 'Least Squares Adjustment Purpose',
    back: 'Statistical method to find the best-fit solution from redundant observations.\n\n• Minimizes sum of squared residuals (Σv²)\n• Produces most probable values\n• Provides error estimates for adjusted quantities\n• Requires redundant observations (more measurements than unknowns)\n• Foundation of modern survey network adjustment',
    category: 'concept',
    examTrack: 'fs'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'Observation Equation: Ax = L + v',
    back: 'Matrix form of least squares:\n\n• A = design/coefficient matrix (geometry)\n• x = vector of unknowns (corrections)\n• L = vector of observations\n• v = vector of residuals\n\nSolution: x = (AᵀWA)⁻¹ AᵀWL\nW = weight matrix (inverse of covariance)',
    category: 'formula',
    examTrack: 'fs'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'Chi-Square (χ²) Test Purpose',
    back: 'Tests whether observed data fits expected distribution.\n\nIn surveying:\n• Tests if residuals are consistent with assumed precision\n• Goodness-of-fit test for network adjustments\n• χ² = vᵀWv (weighted sum of squared residuals)\n• Compare to χ² table at desired confidence level\n• Reject if value falls outside critical bounds',
    category: 'concept',
    examTrack: 'fs'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    front: 't-Test vs F-Test',
    back: 't-TEST:\n• Compares means (is difference significant?)\n• Used for small samples (n < 30)\n• Tests individual parameters\n\nF-TEST:\n• Compares variances (are precisions equal?)\n• Ratio of two variances: F = s₁²/s₂²\n• Used in ANOVA and regression analysis\n• Tests overall model significance',
    category: 'concept',
    examTrack: 'fs'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'Type I Error vs Type II Error',
    back: 'TYPE I (False Positive) — α error:\n• Rejecting a true null hypothesis\n• "False alarm" — detecting problem that doesn\'t exist\n• Controlled by significance level (α = 0.05 → 5% risk)\n\nTYPE II (False Negative) — β error:\n• Failing to reject a false null hypothesis\n• "Missed detection" — missing a real problem\n• Related to power (1 − β)',
    category: 'concept',
    examTrack: 'fs'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'Linear Regression: R² Interpretation',
    back: 'R² (Coefficient of Determination):\n\n• Range: 0 to 1\n• Proportion of variance explained by the model\n• R² = 0.85 → model explains 85% of variability\n• R² = 1 → perfect fit\n• R² = 0 → model explains nothing\n• Does NOT prove causation\n• R = √(R²) is the correlation coefficient',
    category: 'concept',
    examTrack: 'fs'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'Slope Formula for Linear Regression',
    back: 'y = mx + b (simple linear regression)\n\nm = [nΣxy − (Σx)(Σy)] / [nΣx² − (Σx)²]\nb = ȳ − m·x̄\n\nWhere:\n• m = slope\n• b = y-intercept\n• n = number of data points\n• x̄, ȳ = means of x and y',
    category: 'formula',
    examTrack: 'fs'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'Normal Distribution: 68-95-99.7 Rule',
    back: 'For normally distributed data:\n\n• 68.3% falls within ±1σ of the mean\n• 95.4% falls within ±2σ of the mean\n• 99.7% falls within ±3σ of the mean\n\n95% confidence (surveying standard) ≈ ±1.96σ\n• Often approximated as ±2σ\n• 90% confidence ≈ ±1.645σ',
    category: 'concept',
    examTrack: 'fs'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'Error Propagation for Products/Quotients',
    back: 'For Z = A × B or Z = A / B:\n\n(σ_Z/Z)² = (σ_A/A)² + (σ_B/B)²\n\nRelative (fractional) errors add in quadrature.\n\nExample: Area = L × W\nσ_Area/Area = √[(σ_L/L)² + (σ_W/W)²]\n\nFor Z = Aⁿ: σ_Z/Z = n × (σ_A/A)',
    category: 'formula',
    examTrack: 'fs'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'Positional Accuracy at 95% Confidence',
    back: 'Horizontal (2D) at 95%:\n• Accuracy = 1.7308 × RMSE_r\n• RMSE_r = √(RMSE_x² + RMSE_y²)\n\nVertical (1D) at 95%:\n• Accuracy = 1.9600 × RMSE_z\n\nRMSE = √[Σ(error²)/n]\n\nBased on NSSDA methodology.',
    category: 'concept',
    examTrack: 'fs'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'NSSDA Methodology',
    back: 'National Standard for Spatial Data Accuracy:\n\n• Tests positional accuracy of geospatial data\n• Compare dataset coordinates to higher-accuracy checkpoints\n• Minimum 20 test points recommended\n• Report accuracy at 95% confidence level\n• Separate horizontal and vertical reporting\n• Replaced older NMAS (1947) standards',
    category: 'concept',
    examTrack: 'fs'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'Blunder Detection Methods',
    back: 'Techniques to identify gross errors:\n\n• Residual analysis — large residuals flag blunders\n• Data snooping — standardized residuals > 3 = suspect\n• Tau test / Pope\'s method — statistical rejection criterion\n• Independent checks (re-measure, different method)\n• Redundancy — more observations than unknowns\n• Blunders must be eliminated, not adjusted',
    category: 'concept',
    examTrack: 'fs'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'Circular Error Probable (CEP)',
    back: 'The radius of a circle centered on the true position that contains 50% of all position fixes.\n\n• Used primarily in navigation & GPS\n• CEP50 = 0.5887 × (σ_x + σ_y) when σ_x ≈ σ_y\n• Related to DRMS (distance RMS) = √(σ_x² + σ_y²)\n• 2DRMS contains ~95-98% of positions\n• Not commonly used in land surveying standards',
    category: 'definition',
    examTrack: 'fs'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'Hypothesis Testing: Null vs Alternative',
    back: 'NULL HYPOTHESIS (H₀):\n• Default assumption (no effect, no difference)\n• Example: "The monument has not moved"\n\nALTERNATIVE (H₁ or Hₐ):\n• What we test for\n• Example: "The monument has moved"\n\nReject H₀ if test statistic exceeds critical value.\nSignificance level α sets the threshold (commonly 0.05).',
    category: 'concept',
    examTrack: 'fs'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'Weighted vs Unweighted Least Squares',
    back: 'UNWEIGHTED:\n• All observations treated equally\n• Minimizes Σv²\n• Appropriate when all measurements have equal precision\n\nWEIGHTED:\n• Weight = 1/σ² (inverse of variance)\n• Better observations get higher weight\n• Minimizes Σ(w × v²)\n• Standard for survey network adjustments\n• Weight matrix W = inverse of covariance matrix',
    category: 'concept',
    examTrack: 'fs'
  },

  // ─── Field Methods & Mapping (Additional) ───

  {
    domain: 'Field Data Acquisition',
    front: 'Construction Staking: Offset Stakes',
    back: 'Stakes set at known offset distance from design point.\n\n• Used because actual design point will be disturbed by construction\n• Typically 25-50 ft offset from centerline\n• Marked with cut/fill information\n• Guard stakes protect hub stakes\n• Information includes: station, offset distance, cut/fill to grade',
    category: 'concept',
    examTrack: 'fs'
  },
  {
    domain: 'Survey Computations & Applications',
    front: 'Average End Area Volume Formula',
    back: 'V = L × (A₁ + A₂) / 2\n\nWhere:\n• V = volume between two cross sections\n• L = distance between sections\n• A₁, A₂ = cross-sectional areas at each end\n\nUnits: ft³ ÷ 27 = yd³\nLess accurate than prismoidal formula but simpler.\nOverestimates volume slightly.',
    category: 'formula',
    examTrack: 'fs'
  },
  {
    domain: 'Survey Computations & Applications',
    front: 'Mass Diagram for Earthwork',
    back: 'Graphical tool for earthwork analysis:\n\n• X-axis = stations along route\n• Y-axis = cumulative volume (cut − fill)\n• Rising line = cut section\n• Falling line = fill section\n• Max/min points = balance points (cut = fill)\n• Horizontal line between equal ordinates = free-haul distance\n• Optimizes borrow/waste and haul distances',
    category: 'concept',
    examTrack: 'fs'
  },
  {
    domain: 'Survey Computations & Applications',
    front: 'ALTA/NSPS Positional Tolerance',
    back: 'Relative Positional Precision ≤ 2 cm + 50 ppm\n\nWhere ppm = parts per million of distance.\n\nExample for 1,000 m line:\nTolerance = 0.02 + (50 × 0.001) = 0.07 m = 7 cm\n\n2021 Standards require this for all measured points.\nApplies to ALTA/NSPS land title surveys.',
    category: 'formula',
    examTrack: 'fs'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    front: 'TIN vs DEM vs DSM',
    back: 'TIN (Triangulated Irregular Network):\n• Vector-based surface model\n• Triangles connecting survey points\n• Preserves breaklines\n\nDEM (Digital Elevation Model):\n• Raster grid of bare-earth elevations\n• Regular spacing\n\nDSM (Digital Surface Model):\n• Includes buildings, trees, features\n• "First return" in LiDAR\n\nDEM ≤ DSM at any point.',
    category: 'concept',
    examTrack: 'fs'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    front: 'BIM in Surveying',
    back: 'Building Information Modeling:\n\n• 3D digital representation of physical & functional characteristics\n• Integrates survey data into design/construction workflow\n• Survey provides as-built conditions & control\n• LOD (Level of Detail/Development) specifies precision\n• Used for clash detection, quantity takeoff\n• Common formats: IFC, Revit, point cloud integration',
    category: 'definition',
    examTrack: 'fs'
  },
  {
    domain: 'Field Data Acquisition',
    front: 'UAS/Drone: GCPs for Accuracy',
    back: 'Ground Control Points (GCPs) are surveyed targets used to georeference drone imagery.\n\n• Minimum 5 GCPs recommended (more for large sites)\n• Distributed around perimeter and interior\n• Surveyed with GNSS or total station to known accuracy\n• Without GCPs, accuracy degrades to ±1-3 m\n• With GCPs, accuracy improves to ±2-5 cm\n• Checkpoints (independent of GCPs) verify accuracy',
    category: 'concept',
    examTrack: 'fs'
  },
  {
    domain: 'Field Data Acquisition',
    front: 'FAA Part 107 Certification',
    back: 'FAA regulation for commercial small UAS operations:\n\n• Required for commercial drone surveying\n• Remote Pilot Certificate needed\n• Max altitude: 400 ft AGL\n• Must maintain visual line of sight (VLOS)\n• Daylight or civil twilight (with anti-collision lights)\n• Max speed: 100 mph\n• No flight over non-participating people (without waiver)',
    category: 'concept',
    examTrack: 'fs'
  },
  {
    domain: 'Field Data Acquisition',
    front: 'Terrestrial Laser Scanning: Point Cloud',
    back: 'A point cloud is a dense set of 3D coordinates (X, Y, Z) captured by laser scanner.\n\n• Millions to billions of points per scan\n• Each point may include intensity & RGB color\n• Registration: aligning multiple scans together\n• Used for as-built surveys, deformation monitoring\n• Accuracy: typically ±2-5 mm at scanner range\n• Processed into surfaces, models, or drawings',
    category: 'definition',
    examTrack: 'fs'
  },
  {
    domain: 'Field Data Acquisition',
    front: 'Robotic Total Station: ATR',
    back: 'Automatic Target Recognition:\n\n• Instrument automatically locks onto and tracks prism\n• Enables one-person operation\n• Uses image-processing to find prism center\n• Accuracy: comparable to manual pointing\n• Can lose lock in dense vegetation or obstructions\n• Often paired with remote control unit\n• Increases productivity 30-50%',
    category: 'definition',
    examTrack: 'fs'
  },
  {
    domain: 'Survey Computations & Applications',
    front: 'FEMA Elevation Certificate Purpose',
    back: 'Official form (FEMA 086-0-33) documenting building elevation relative to flood levels.\n\n• Required for flood insurance rating\n• Shows Lowest Floor Elevation (LFE) vs BFE\n• Must be prepared by licensed surveyor or engineer\n• References NAVD 88 vertical datum\n• Used for LOMA/LOMR applications\n• Documents flood zone determination',
    category: 'concept',
    examTrack: 'fs'
  },
  {
    domain: 'Survey Computations & Applications',
    front: 'Base Flood Elevation (BFE)',
    back: 'The computed elevation to which floodwater is anticipated to rise during the 1% annual chance (100-year) flood.\n\n• Shown on FEMA Flood Insurance Rate Maps (FIRMs)\n• Referenced to NAVD 88\n• Buildings must be elevated to or above BFE\n• Freeboard = additional height above BFE (local requirement)\n• BFE not shown in approximate Zone A (unstudied)',
    category: 'definition',
    examTrack: 'fs'
  },
  {
    domain: 'Survey Computations & Applications',
    front: 'FEMA Flood Zones: A, AE, V, VE, X',
    back: 'Zone A: 1% annual chance flood, no BFE determined\nZone AE: 1% flood with BFE determined\nZone V: Coastal 1% flood with wave action, no BFE\nZone VE: Coastal 1% flood with BFE & wave action (≥3 ft)\nZone X (shaded): 0.2% annual chance (500-year)\nZone X (unshaded): Minimal flood hazard\n\nV zones have strictest building requirements.',
    category: 'concept',
    examTrack: 'fs'
  },
  {
    domain: 'Field Data Acquisition',
    front: 'FGCS Leveling Order Tolerances',
    back: 'Federal Geodetic Control Subcommittee leveling orders:\n\n• First Order, Class I: ±0.5 mm√K\n• First Order, Class II: ±0.7 mm√K\n• Second Order, Class I: ±1.0 mm√K\n• Second Order, Class II: ±1.3 mm√K\n• Third Order: ±2.0 mm√K\n\nK = distance in km (one-way)\nHigher order = tighter tolerance = more precise',
    category: 'concept',
    examTrack: 'fs'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    front: 'USNMAS 1947 (US National Map Accuracy Standards)',
    back: 'Standards for accuracy of published maps:\n\n• Horizontal: 90% of well-defined points within 1/30" at map scale (for scales > 1:20,000)\n• For 1:20,000 or smaller: 1/50" at map scale\n• Vertical: 90% of contour elevations within 1/2 contour interval\n• Established 1947, still referenced\n• Largely superseded by NSSDA for digital data\n• Tests based on comparison to higher-accuracy source',
    category: 'definition',
    examTrack: 'fs'
  },
];

// Combined flashcards for both exams
export const FLASHCARDS: Omit<Flashcard, 'id'>[] = [
  ...FS_FLASHCARDS,
  ...PS_FLASHCARDS
];

// Export FS cards separately for backward compatibility
export { FS_FLASHCARDS, PS_FLASHCARDS };
