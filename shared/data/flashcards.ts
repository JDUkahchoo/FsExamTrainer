import type { Flashcard } from '../schema';
import { PS_FLASHCARDS } from './ps-flashcards';
import { TX_FLASHCARDS } from './txFlashcards';

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
    back: 'Relative Positional Precision ≤ 2 cm + 50 ppm\n\nWhere ppm = parts per million of distance.\n\nExample for 1,000 m line:\nTolerance = 0.02 + (50 × 0.001) = 0.07 m = 7 cm\n\n2026 Standards require this for all measured points.\nApplies to ALTA/NSPS land title surveys.',
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

  // ============================================================
  // Math for Surveyors (MFS) — Coan: Flashcards
  // ============================================================
  {
    domain: 'Math & Basic Science',
    front: 'Oblique Triangle: Law of Sines',
    back: 'a / sin A = b / sin B = c / sin C\n\nUse when you know:\n• A side and its opposite angle, plus any other side or angle\n• AAS, ASA, or SSA cases\n\nNOT for SSS or SAS — use Law of Cosines instead\n\nRemember: sides lowercase (a,b,c), opposite angles uppercase (A,B,C)',
    category: 'formula',
    examTrack: 'fs'
  },
  {
    domain: 'Math & Basic Science',
    front: 'Oblique Triangle Ambiguous Case (Case 6)',
    back: 'Given: acute angle A, side a, side c\n\nSix cases determined by h = c × sin A:\n• a < h → No solution\n• a = h → One solution (right triangle)\n• h < a < c (A acute) → TWO solutions ← ambiguous case\n• a ≥ c (A acute) → One solution\n• a ≤ c (A obtuse) → No solution\n• a > c (A obtuse) → One solution\n\nIn surveying: field sketch determines which of two solutions is correct',
    category: 'concept',
    examTrack: 'fs'
  },
  {
    domain: 'Survey Computations & Applications',
    front: 'Bearing Angle Rules (Coan Three Rules)',
    back: 'Rule 1 — Same quadrant (NE+NE, SE+SE, etc.):\n  Angle = larger − smaller\n\nRule 2 — Same hemisphere, adjacent quadrants:\n  NE+NW or SE+SW: Angle = bearing₁ + bearing₂\n\nRule 3 — Cross-hemisphere (NE+SE or NW+SW):\n  Angle = 180° − (bearing₁ + bearing₂)\n\nShortcut: Convert both to azimuth, subtract;\n  if result > 180°, use 360° − result',
    category: 'formula',
    examTrack: 'fs'
  },
  {
    domain: 'Survey Computations & Applications',
    front: 'COGO Intersection Types: What You Know → What You Use',
    back: 'Bearing + Bearing from 2 known pts:\n  → Law of Sines (angles from bearing rules)\n  → 0 or 1 valid solutions (field picks one)\n\nBearing from 1 pt + Distance from another:\n  → Law of Sines (ambiguous case possible)\n  → 1 or 2 solutions; sketch determines which\n\nDistance from 2 known pts:\n  → Law of Cosines (find angle at A)\n  → 2 solutions; sketch determines which\n\nAll three types: Inverse baseline first, then COGO at the end',
    category: 'concept',
    examTrack: 'fs'
  },
  {
    domain: 'Survey Computations & Applications',
    front: 'Interpolation Formula',
    back: 'y₂ = [(x₂ − x₁) / (x₃ − x₁)] × (y₃ − y₁) + y₁\n\nWhere:\n• x₁, y₁ = lower boundary (known)\n• x₃, y₃ = upper boundary (known)\n• x₂ = intermediate argument (given)\n• y₂ = interpolated result (find this)\n\nSurveying uses: trig tables, contour crossings,\nbenchmark elevations, magnetic declination epochs\n\nAssumes constant (linear) rate of change between boundaries',
    category: 'formula',
    examTrack: 'fs'
  },
  {
    domain: 'Survey Computations & Applications',
    front: 'Grade vs. Slope: Formulas and Conversions',
    back: 'Grade = ΔElevation / Horizontal Distance  (ft/ft)\nGrade % = Grade × 100\nΔElev = Grade × Distance\nGrade = tan(vertical angle)\n\nSlope ratio (H:V): slope = 1/grade  (e.g., 25% grade = 4:1 slope)\nGrade from slope: grade = 1/slope ratio × 100%\n\nSign: + = uphill (ascending), − = downhill (descending)',
    category: 'formula',
    examTrack: 'fs'
  },
  {
    domain: 'Survey Computations & Applications',
    front: 'PVI (Point of Vertical Intersection) Formula',
    back: 'Step 1: Compute y-intercepts for each grade line\n  b₁ = Elev₁ − (G₁/100) × Sta₁\n  b₂ = Elev₂ − (G₂/100) × Sta₂\n\nStep 2: PVI Station = (b₁ − b₂) / (G₂/100 − G₁/100)\n\nStep 3: PVI Elevation = Elev₁ + (G₁/100) × (PVI Sta − Sta₁)\n\nWhere G = grade in percent (+uphill, −downhill)\nStation in feet (Sta 7+00 = 700 ft)\n\nUse: locating the PVI before designing vertical curves',
    category: 'formula',
    examTrack: 'fs'
  },

  // ─── State Plane Coordinate System ───

  {
    domain: 'Applied Mathematics & Statistics',
    front: 'Scale Factor (SF) — State Plane Coordinate System',
    back: 'The ratio of a grid distance to the corresponding ellipsoid distance at any point in a State Plane zone.\n\nSF = grid distance / ellipsoid distance\n\nKey facts:\n• SF = exactly 1.000000 at the standard parallels (LCC) or central meridian (TM)\n• SF < 1 between the lines of exact scale (grid is compressed)\n• SF > 1 toward zone edges (grid is expanded)\n• Typical range within a SPCS zone: 0.9999 to 1.0001\n\nSF corrects for the map projection distortion — NOT for elevation. Elevation is corrected by the Elevation Factor.',
    category: 'definition',
    examTrack: 'fs'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'Elevation Factor (EF) — State Plane Coordinate System',
    back: 'Reduces a ground (physical) distance to the equivalent ellipsoid distance by accounting for terrain elevation above the ellipsoid.\n\nEF = R / (R + H)\n\nR = Earth\'s mean radius ≈ 6,372,000 m\nH = elevation of the survey (m or ft, consistent with R)\n\nKey facts:\n• EF is always < 1 (terrain sits above the ellipsoid)\n• Higher elevation → EF further below 1 → larger correction\n• At sea level (H=0): EF = 1.000000\n• At H = 1,000 m: EF ≈ 0.999843\n\nEF corrects for elevation — NOT map projection. Map projection is corrected by SF.',
    category: 'formula',
    examTrack: 'fs'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'Combined Factor (CF) and Grid/Ground Conversion',
    back: 'CF = SF × EF\n\nCombines the map projection correction (SF) and the elevation correction (EF) into one multiplier.\n\nConversions:\nGrid = Ground × CF  (grid is shorter when CF < 1)\nGround = Grid / CF  (ground is longer when CF < 1)\n\nTypical value: CF ≈ 0.9998 – 0.9999 for most U.S. surveys\n\nMemory trick:\n• "Ground × CF = Grid" — multiplying by a number less than 1 shrinks it → grid is smaller\n• "Grid / CF = Ground" — dividing by a number less than 1 grows it → ground is larger',
    category: 'formula',
    examTrack: 'fs'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'Lambert Conformal Conic vs Transverse Mercator (SPC)',
    back: 'Two projection types used in the State Plane Coordinate System:\n\nLAMBERT CONFORMAL CONIC (LCC):\n• Use for zones that are WIDER east–west than tall north–south\n• Two standard parallels (lines of exact scale)\n• Examples: Tennessee, North Carolina, Louisiana\n• Memory: "Flat/wide state → flat cone → Lambert"\n\nTRANSVERSE MERCATOR (TM):\n• Use for zones that are TALLER north–south than wide east–west\n• Central meridian = line of exact scale\n• Examples: New Jersey, Vermont, Illinois, Idaho\n• Memory: "Tall/narrow state → tall cylinder → Transverse Mercator"\n\nOblique Mercator: used for diagonal zones (Alaska Panhandle)',
    category: 'concept',
    examTrack: 'fs'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'State Plane vs UTM: Key Differences',
    back: 'Both are plane coordinate systems for the U.S., but differ significantly:\n\nSTATE PLANE (SPCS):\n• U.S.-only\n• Zones: 1°–2° wide → very low distortion (<1:10,000)\n• ~125 zones nationwide\n• Accuracy: suitable for property surveys and construction\n• Units: feet (older) or meters (SPCS 2022)\n\nUTM:\n• Worldwide system\n• Zones: 6° wide → more distortion (up to 1:2,500 at edges)\n• 60 zones worldwide\n• Less accurate for high-precision local work\n• Units: always meters\n\nRule: Use State Plane for precision U.S. surveys; use UTM for regional/global work or where State Plane isn\'t established.',
    category: 'concept',
    examTrack: 'fs'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'SPC Zone Design: Why Zones Follow County Lines',
    back: 'State Plane zones are designed so that:\n\n1. Distortion stays below 1:10,000 everywhere within the zone\n2. Zone boundaries follow county lines\n\nWhy county lines?\n• A property deed references one county → one State Plane zone\n• Avoids splitting a survey project across two coordinate systems\n• Legal descriptions remain unambiguous\n\nPractical note:\n• A project spanning a zone boundary needs TWO coordinate systems\n• Plat distances recorded in the field (ground distances) differ from SPCS grid distances by the CF correction\n• Old plats used ground distances → converting to SPCS grid coordinates requires applying CF',
    category: 'concept',
    examTrack: 'fs'
  },

  // ─── Photogrammetry ───

  {
    domain: 'Mapping, GIS, and CAD',
    front: 'Photo Scale Formula: S = f / (H − h)',
    back: 'The scale of a vertical aerial photograph at a given terrain elevation:\n\nS = f / (H − h)\n\nf = camera focal length (convert mm → m)\nH = flying height above datum (m or ft)\nh = terrain elevation above datum at that point (m or ft)\nH − h = flying height above the LOCAL ground\n\nExamples:\n• f = 152 mm, H = 3,800 m, h = 300 m\n• H\' = 3,500 m → S = 0.152/3,500 = 1:23,026 ≈ 1:23,000\n\nRules:\n• Higher flight → smaller scale (covers more ground per photo)\n• Longer focal length → larger scale (more zoomed in)\n• Scale varies across a photo where terrain varies',
    category: 'formula',
    examTrack: 'fs'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    front: 'Relief Displacement: d = rh / H',
    back: 'The radial outward shift of a tall object\'s top from its true planimetric position on a vertical aerial photo:\n\nd = r × h / H\n\nd = displacement on the photo (mm)\nr = radial distance from principal point to the TOP of the object (mm)\nh = HEIGHT of the object (m) — not terrain elevation\nH = flying height above the BASE of the object (m)\n\nKey facts:\n• Direction: always radially OUTWARD from the principal point\n• At the principal point: d = 0 (no displacement)\n• At photo edges: d is maximum\n• To find object height from displacement: h = dH / r\n\nExample: r=90mm, h=60m, H=3,000m → d = 90×60/3,000 = 1.80 mm',
    category: 'formula',
    examTrack: 'fs'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    front: 'Stereopair Overlap Standards: 60% Endlap / 30% Sidelap',
    back: 'Standard overlap requirements for aerial photogrammetry:\n\nENDLAP (forward overlap — along the flight strip):\n• Standard: 60% minimum\n• Net advance between exposures = 40% of photo ground coverage\n• Ensures complete stereoscopic coverage of entire strip\n\nSIDELAP (lateral overlap — between adjacent strips):\n• Standard: 30% minimum\n• Strip spacing = 70% of photo cross-strip coverage\n• Ensures no data voids between strips\n\nMemory: "60/30" — sixty forward, thirty side\n\nWhy 60% and not 50%?\n• Provides buffer for aircraft roll/pitch and terrain variation\n• The stereo model occupies the central 40% of each photo — you need overlap on both sides',
    category: 'concept',
    examTrack: 'fs'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    front: 'Flight Planning: Number of Photos in a Strip',
    back: 'Formula:\nN = (strip length / B) + 1, then round UP\n\nWhere B = net advance (air base) between exposures:\nB = ground coverage per photo × (1 − endlap)\nB = (format × scale_denom) × (1 − 0.60)\nB = ground_coverage × 0.40  (for 60% endlap)\n\nExample:\n• f=150mm, H\'=3,000m → scale=1:20,000\n• 230mm format → coverage = 230×20,000mm = 4,600m\n• B = 4,600 × 0.40 = 1,840m\n• Strip = 15,000m → N = 15,000/1,840 + 1 = 8.15+1 = 9.15 → 10 photos\n\nAlways round UP and add the "+1" for the first photo at strip start',
    category: 'formula',
    examTrack: 'fs'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    front: 'Principal Point and Relief Displacement Direction',
    back: 'PRINCIPAL POINT (PP):\n• The geometric center of the aerial photograph\n• Where the optical axis pierces the photo plane\n• Located using fiducial marks (cross-hairs printed at photo edges/corners during exposure)\n• Objects AT the PP have zero relief displacement\n\nRELIEF DISPLACEMENT DIRECTION:\n• Always RADIALLY OUTWARD from the principal point\n• A tall building\'s top is displaced away from the PP, making it "lean outward"\n• The base of the building is at the true planimetric position; the top is displaced\n\nImplication for mapping:\n• Aerial photos cannot be used directly as planimetric maps — relief displacement must be corrected\n• Correction is done by differential rectification using a DEM → produces an ORTHOPHOTO',
    category: 'concept',
    examTrack: 'fs'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    front: 'Stereoscopic Parallax and Height Formula: h = H × Δp / (p + Δp)',
    back: 'Height of an object measured from its parallax difference in a stereopair:\n\nh = H × Δp / (p + Δp)\n\nh = object height above terrain (m)\nH = flying height above terrain (m)\nΔp = parallax difference: parallax of object top − parallax of base (mm)\np = absolute parallax of the base = xL + xR (mm)\n\nKey facts:\n• Taller objects have LARGER parallax differences (Δp)\n• Objects at terrain level have Δp = 0\n• Measured with a parallax bar or floating mark on a stereoscope\n• Alternative to relief displacement for height determination from stereopairs\n\nExample: H=3,000m, p=92mm, Δp=2.8mm\n→ h = 3,000 × 2.8 / (92 + 2.8) = 8,400 / 94.8 ≈ 88.6 m',
    category: 'formula',
    examTrack: 'fs'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    front: 'Photo Base (b) and Air Base (B)',
    back: 'Two related distances in aerial photogrammetry:\n\nPHOTO BASE (b):\n• Distance between adjacent principal points as measured ON THE PHOTO (mm)\n• For 60% endlap and 230 mm format: b = 230 × (1 − 0.60) = 92 mm\n• Also called the image base\n\nAIR BASE (B):\n• Actual ground distance flown between successive exposures (m)\n• B = b × scale_denominator = b / S_fraction\n• Or: B = ground_coverage × (1 − endlap)\n• For b = 92 mm at scale 1:20,000: B = 92 × 20,000 = 1,840,000 mm = 1,840 m\n\nRelationship:\n• B = b × (H/f)\n• The air base is the stereo baseline — longer B = stronger depth perception (more parallax)',
    category: 'formula',
    examTrack: 'fs'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    front: 'Number of Flight Strips Formula',
    back: 'How many parallel flight strips are needed to cover a project area:\n\nN_strips = (W / (Pw × (1 − q))) + 1, round UP\n\nW = project width (perpendicular to flight direction, m)\nPw = ground coverage per photo in the cross-strip direction (m)\nq = sidelap fraction (0.30 standard)\n(1 − q) = net strip spacing fraction = 0.70\n\nStrip spacing = Pw × (1 − q)\n\nExample:\n• f=150mm, H\'=3,000m → scale 1:20,000\n• 230mm format → Pw = 230 × 20,000 = 4,600m\n• Strip spacing = 4,600 × 0.70 = 3,220m\n• W = 16,000m → N = 16,000/3,220 + 1 = 4.97 + 1 = 5.97 → 6 strips\n\nTotal photos ≈ N_photos_per_strip × N_strips',
    category: 'formula',
    examTrack: 'fs'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    front: 'Orthophoto: Correcting Relief Displacement',
    back: 'An ORTHOPHOTO is an aerial photo that has been geometrically corrected to remove relief displacement, tilt, and scale variation, producing a planimetrically accurate map-like image.\n\nHow it\'s made:\n• Differential rectification: each small photo patch is rectified individually using a DEM/DSM\n• The DEM provides the elevation at every pixel → displacement is computed and removed\n• Result: every pixel is in its true ground (planimetric) position\n\nContrast with unrectified aerial photo:\n• Raw photo: buildings lean outward, scale varies with terrain elevation\n• Orthophoto: buildings show true footprint position, uniform scale everywhere\n\nDigital Orthophoto Quarter Quadrangle (DOQQ):\n• USGS standard 1:12,000-scale orthophoto product\n• 1-meter pixel resolution, NAD 83 / UTM coordinates\n• Can be used as a GIS base layer with other geospatial data\n\nRule: Only an ORTHOPHOTO, not a raw aerial photo, can serve directly as a planimetric map.',
    category: 'concept',
    examTrack: 'fs'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    front: 'Ground Control Points (GCPs) for Aerial Photogrammetry',
    back: 'Ground control points (GCPs) are surveyed points with precisely known coordinates that appear on aerial photos, used to tie the photo block to a ground datum.\n\nTYPES:\n• Horizontal GCPs: Known X, Y (NAD 83)\n• Vertical GCPs: Known elevation (NAVD 88)\n• Full control: Known X, Y, Z\n\nMINIMUM (traditional):\n• 4 non-collinear GCPs to solve 6 exterior orientation parameters (3 position + 3 rotation)\n• Block adjustment: GCPs at perimeter + center\n\nMODERN (with GPS-IMU aboard aircraft):\n• Direct georeferencing reduces GCP requirement to 4–6 for the entire block\n• Independent check points (not used in adjustment) verify final accuracy\n\nSoftware: Agisoft Metashape, Pix4D — use Structure from Motion (SfM) or bundle adjustment',
    category: 'concept',
    examTrack: 'fs'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    front: 'Digital Photogrammetry vs. LiDAR',
    back: 'Two modern methods for producing 3-D terrain data from aerial platforms:\n\nDIGITAL PHOTOGRAMMETRY (aerial or drone images):\n• Uses overlapping photos + Structure from Motion (SfM) or bundle adjustment\n• Produces: orthophotos, DSM (Digital Surface Model), 3-D point cloud\n• Strengths: high visual texture, lower sensor cost\n• Weaknesses: fails under dense canopy; needs good lighting; slower point density\n\nLiDAR (Light Detection and Ranging):\n• Fires laser pulses, records time-of-flight to measure distance\n• First return → DSM (tree tops, rooftops); Last return → DEM (bare earth)\n• Strengths: penetrates canopy, works at night, very dense point clouds\n• Weaknesses: higher equipment cost; no texture/color without separate camera\n\nKey rule: LiDAR uses LAST returns for bare-earth DEM; FIRST returns for DSM.',
    category: 'concept',
    examTrack: 'fs'
  },

  // ─── GNSS Advanced Concepts ───

  {
    domain: 'Applied Mathematics & Statistics',
    front: 'CORS Network (Continuously Operating Reference Stations)',
    back: 'A nationwide network of permanently installed GNSS reference stations maintained by NOAA/NGS.\n\nKey facts:\n• Stations log raw data 24/7 and upload to NGS servers\n• Over 2,000 stations in the U.S. (typical spacing 100–300 km)\n• Coordinates tied to NAD 83 / ITRF\n• FREE to use via the OPUS web service\n• No user base station needed — CORS serves as your base\n\nDistinct from HARN:\nCORS = active electronic stations\nHARN = passive monuments (brass discs) you physically occupy',
    category: 'definition',
    examTrack: 'fs'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'OPUS Workflow (Online Positioning User Service)',
    back: 'Free NGS web service that computes precise coordinates from raw static GNSS data.\n\nWorkflow:\n1. Occupy point with ONE dual-frequency receiver\n   • Static: ≥2 hours  |  Rapid Static: ≥15 min\n2. Download raw data as RINEX file\n3. Submit to geodesy.noaa.gov/OPUS (enter antenna type & height)\n4. NOAA auto-selects ≥3 nearby CORS stations, processes baselines, averages\n5. Receive email with NAD 83 lat/lon + ellipsoid height + NAVD 88 elevation\n\nAccuracy: ±3–5 cm horizontal, ±5–8 cm vertical (2-hour session)\nKey: Only ONE receiver needed — no field base station',
    category: 'concept',
    examTrack: 'fs'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'VRS — Virtual Reference Station / Network RTK',
    back: 'Network-based RTK that generates virtual corrections near the rover using multiple CORS stations.\n\nHow it works:\n1. Rover sends approximate position to network server via cellular\n2. Server models atmospheric/orbital errors using nearby CORS\n3. Server sends virtual corrections as if a base station were nearby\n4. Rover processes like conventional RTK\n\nAdvantages:\n• No physical base station needed\n• Consistent ±1–2 cm accuracy over large areas\n• One-person operation\n\nLimitation: Requires two-way cellular data — fails without coverage\n\nAlso called: Network RTK, eRTK, iMAX',
    category: 'concept',
    examTrack: 'fs'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'Code Phase vs. Carrier Phase Accuracy',
    back: 'Two fundamentally different ways GNSS receivers measure distance to satellites:\n\nCODE PHASE (pseudorange):\n• Times arrival of PRN code chips (~300 m chip length)\n• Accuracy: ±1–5 m (C/A code standalone)\n• Used by: phone/vehicle GPS, handheld receivers\n\nCARRIER PHASE:\n• Measures fraction of 19 cm L1 carrier wavelength\n• Must resolve integer cycle ambiguity\n• Accuracy: ±1–3 cm (RTK) / ±3–10 mm (static post-processed)\n• Used by: RTK, VRS, OPUS, static control surveys\n\nRule: Code phase = navigation accuracy. Carrier phase = survey accuracy.',
    category: 'concept',
    examTrack: 'fs'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'Geoid Height Formula: h = H + N (expanded)',
    back: 'h = H + N\n\nh = ellipsoid height (GNSS output, above GRS 80 ellipsoid)\nH = orthometric height / elevation (above geoid, used in engineering)\nN = geoid undulation (ellipsoid − geoid separation)\n\nTo find elevation from GPS:\nH = h − N\n\nIn CONUS:\n• N is negative (−8 to −53 m)\n• H > h (elevation exceeds ellipsoid height)\n\nExample:\nh = 45.238 m, N = −31.500 m\nH = 45.238 − (−31.500) = 76.738 m\n\nGeoid model: Use GEOID18 or GEOID12B from NGS',
    category: 'formula',
    examTrack: 'fs'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'UTM Zone System',
    back: 'Universal Transverse Mercator: 60 zones, each 6° of longitude wide.\n\nZone numbering:\n• Zone 1: 180°W to 174°W\n• Zones increase eastward\n• Zone 60: 174°E to 180°E\n\nFormula:\nZone = ⌊(longitude + 180) / 6⌋ + 1\n(W longitude is negative)\n\nExamples:\n• 93°W: ⌊(−93+180)/6⌋+1 = ⌊14.5⌋+1 = 15\n• 87°W: ⌊(−87+180)/6⌋+1 = ⌊15.5⌋+1 = 16\n• 75°W: ⌊(−75+180)/6⌋+1 = ⌊17.5⌋+1 = 18\n\nFalse Easting = 500,000 m at central meridian\nScale factor at central meridian = 0.9996',
    category: 'formula',
    examTrack: 'fs'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'Multipath Error: Causes and Mitigation',
    back: 'CAUSE: Satellite signals reach the antenna via reflected paths (off buildings, vehicles, water, pavement), corrupting the direct-signal measurement.\n\nEffects:\n• Code phase error: 1–5 m\n• Carrier phase error: cm-level, can cause cycle slips\n• Dominant error in urban environments\n\nMITIGATION:\n1. Site selection — keep 50 m clear of reflective surfaces\n2. Elevation mask — ignore satellites below 10–15°\n3. Choke-ring antenna / ground plane — rejects low-angle signals\n4. Longer observation sessions — partially averages out\n5. Avoid metal surfaces for antenna mounting',
    category: 'concept',
    examTrack: 'fs'
  },

  // ─── Surveying Instrument Types ───

  {
    domain: 'Field Data Acquisition',
    front: 'Dumpy Level',
    back: 'A leveling instrument with a FIXED telescope — the telescope cannot be removed from the level bar.\n\nKey facts:\n• Requires careful manual leveling of the bubble\n• Older design, still used for precise work\n• Must be re-leveled if disturbed\n• Accuracy: ~1–2 mm/km for precise work\n\nDistinguishing fact: "Dumpy" = short, squat telescope fixed to the level bar. If the bubble drifts, all readings are wrong until re-leveled.',
    category: 'definition',
    examTrack: 'fs'
  },
  {
    domain: 'Field Data Acquisition',
    front: 'Self-Leveling (Automatic) Level',
    back: 'A level with a built-in compensator that automatically maintains a horizontal line of sight within a small range (typically ±15\').\n\nKey facts:\n• Operator only does coarse leveling (3-screw footplate)\n• Compensator (pendulum or prism) auto-corrects fine level\n• Most common level in use today\n• Faster setup than dumpy level\n• Fails if tilted beyond compensator range\n\nDistinguishing fact: Shake the instrument slightly — if the rod reading returns to the same value, the compensator is working.',
    category: 'definition',
    examTrack: 'fs'
  },
  {
    domain: 'Field Data Acquisition',
    front: 'Dumpy Level vs. Self-Leveling Level',
    back: 'DUMPY LEVEL:\n• Fixed telescope\n• Manual leveling required (4 or 3 screws)\n• Must re-level if disturbed\n• Older technology\n\nSELF-LEVELING:\n• Compensator automatically maintains level\n• Only coarse leveling needed\n• Faster, less operator skill required\n• Most common today\n\nBoth require a level rod and can achieve similar accuracy — the difference is setup time and skill required.',
    category: 'concept',
    examTrack: 'fs'
  },
  {
    domain: 'Field Data Acquisition',
    front: 'Abney Hand Level',
    back: 'A handheld instrument used to measure approximate elevations and slope angles.\n\nKey facts:\n• No tripod required — held in hand\n• Useful range: up to ~50 ft\n• Accuracy: ±0.5 ft (rough)\n• Has a bubble tube and mirror for reading bubble while sighting\n• Can read percent grade or vertical angle\n\nUse: Quick elevation checks, vegetation height, rough topography\nDo NOT use for: Differential leveling, precise elevation, control surveys',
    category: 'definition',
    examTrack: 'fs'
  },
  {
    domain: 'Field Data Acquisition',
    front: 'Clinometer',
    back: 'A handheld instrument for measuring slope angles (vertical angles), typically graduated in percent grade or degrees.\n\nKey facts:\n• Handheld — no tripod\n• Measures slope of terrain or structures\n• Common types: Suunto, Abney (Abney is both clinometer & hand level)\n• Accuracy: ±0.5° to ±1°\n• Used for: slope correction, tree heights, road grades\n\nDistinguishing fact: A clinometer reads the angle of inclination. An Abney hand level reads elevation differences. Some instruments do both.',
    category: 'definition',
    examTrack: 'fs'
  },
  {
    domain: 'Field Data Acquisition',
    front: 'Telescopic Alidade',
    back: 'A telescope with stadia hairs mounted on a ruler (alidade rule) that slides on a plane table.\n\nKey facts:\n• Used with a plane table for field mapping\n• Measures horizontal and vertical angles\n• Uses stadia method to measure distances (HD = 100 × s)\n• Allows direct plotting of map features in the field\n• Accuracy limited to stadia precision: 1:500 to 1:1,000\n\nDistinguishing fact: Only instrument designed specifically for PLANE TABLE surveying. The alidade sits directly on the map sheet on the table.',
    category: 'definition',
    examTrack: 'fs'
  },
  {
    domain: 'Field Data Acquisition',
    front: 'Staff Compass (Brunton Compass)',
    back: 'A compass mounted on a staff or tripod for magnetic bearing measurements.\n\nKey facts:\n• Measures magnetic bearings\n• Accuracy: approximately ±30 minutes (30\')\n• Has sighting vanes for more precise aiming than pocket compass\n• Can also measure vertical angles\n• Requires declination correction to convert to true north\n\nUse: Reconnaissance surveys, timber cruising, low-precision traverses\nDistinguishing fact: The Brunton pocket transit is the most common staff compass — it is also used as a hand level.',
    category: 'definition',
    examTrack: 'fs'
  },
  {
    domain: 'Field Data Acquisition',
    front: 'Hand Compass',
    back: 'A simple pocket compass used for rough direction finding.\n\nKey facts:\n• Accuracy: approximately ±2°\n• Handheld — no staff or tripod\n• Graduated to 1° or 2° intervals\n• Used for: reconnaissance, rough sketches, orienteering\n• NOT suitable for: any work requiring more than ±2° accuracy\n\nComparison:\n• Hand compass: ±2°\n• Staff compass (Brunton): ±30\'\n• Optical theodolite: ±1"\n• Electronic total station: ±1" or better',
    category: 'definition',
    examTrack: 'fs'
  },
  {
    domain: 'Field Data Acquisition',
    front: 'Two-Peg Test: Purpose & What It Detects',
    back: 'The two-peg test checks whether the line of collimation (line of sight through the telescope) is truly horizontal when the bubble is centered.\n\nError detected: Collimation error — the line of sight is tilted upward or downward even when the bubble reads level.\n\nCaused by: Misalignment of cross-hair with bubble tube axis\n\nEffect: Every reading has a systematic error proportional to distance — the farther the rod, the larger the error.\n\nWhen to perform: Before a precise leveling campaign, when accuracy is questioned, or after the instrument has been dropped or transported roughly.',
    category: 'concept',
    examTrack: 'fs'
  },
  {
    domain: 'Field Data Acquisition',
    front: 'Two-Peg Test: Procedure',
    back: 'Step 1 — MIDPOINT SETUP:\n• Drive pegs A and B about 100–200 ft apart\n• Set up level exactly halfway between them\n• Read rod at A (r₁) and rod at B (r₂)\n• True elevation difference: Δh = r₁ - r₂\n  (errors cancel because distances are equal)\n\nStep 2 — NEAR-PEG SETUP:\n• Move level to within 5–10 ft of peg A\n• Read rod at A: rₐ (nearly error-free, short distance)\n• Calculate correct reading at B: rB_correct = rₐ - Δh\n• Read actual rod at B: rB_actual\n\nStep 3 — EVALUATE:\n• If rB_actual ≈ rB_correct → instrument is OK\n• If they differ → collimation error exists\n• Adjust cross-hair until B reads rB_correct',
    category: 'concept',
    examTrack: 'fs'
  },
  {
    domain: 'Field Data Acquisition',
    front: 'Vernier Scale: How It Works',
    back: 'A vernier scale allows reading fractions of the smallest main scale division.\n\nPrinciple:\n• n vernier divisions = (n-1) main scale divisions\n• Vernier precision = 1/n of main scale division\n\nExample — 1-minute vernier on a transit:\n• Main scale: 1° divisions\n• Vernier: 60 divisions span 59° of main scale\n• Precision: 1/60 of 1° = 1 minute\n\nTo read:\n1. Read whole degrees at vernier index (0 line)\n2. Find which vernier graduation aligns perfectly with any main scale line\n3. That graduation number = the minutes',
    category: 'concept',
    examTrack: 'fs'
  },
  {
    domain: 'Field Data Acquisition',
    front: 'Vernier Scale: Reading a 1-Minute Transit Vernier',
    back: 'Given: Main scale index is between 47° and 48°.\nThe 23rd vernier graduation aligns with a main scale line.\n\nReading = 47°23\'\n\nStep-by-step:\n1. Whole degrees from main scale: 47°\n2. Minutes from vernier: find the vernier line that aligns = 23rd line\n3. Full reading: 47° + 23\' = 47°23\'\n\nCommon mistakes:\n• Reading the wrong side of the vernier (double vernier has two sets — read the side that goes in the direction of increasing angle)\n• Counting from the wrong end\n• Misidentifying the "best" aligning line — it should be the one that clearly straddles both scales without offset',
    category: 'concept',
    examTrack: 'fs'
  },

  // ─── FGCS Survey Orders of Accuracy ───

  {
    domain: 'Field Data Acquisition',
    front: 'FGCS Horizontal K Constants (c = K√N)',
    back: 'Allowable angular misclosure (arc-seconds):\n\nOrder                  K\nFirst Order            1.0"\nSecond Order Class I   1.7"\nSecond Order Class II  3.0"\nThird Order Class I    6.0"\nThird Order Class II  12.0"\n\nc = K × √N\nN = number of angles\nResult in arc-seconds',
    category: 'formula',
    examTrack: 'fs'
  },
  {
    domain: 'Field Data Acquisition',
    front: 'FGCS Vertical K Constants (c = K√M)',
    back: 'Allowable level-loop closure (millimeters):\n\nOrder                  K\nFirst Order Class I    0.5 mm\nFirst Order Class II   0.7 mm\nSecond Order Class I   1.0 mm\nSecond Order Class II  1.3 mm\nThird Order            2.0 mm\n\nc = K × √M\nM = loop distance in km\nResult in millimeters',
    category: 'formula',
    examTrack: 'fs'
  },
  {
    domain: 'Field Data Acquisition',
    front: 'FGCS Horizontal vs Vertical Formula',
    back: 'HORIZONTAL (angular):\nc = K√N\n• K in arc-seconds\n• N = Number of aNgles\n• c in arc-seconds\n\nVERTICAL (leveling):\nc = K√M\n• K in mm\n• M = distance in kM\n• c in millimeters\n\nMemory aid: "N for aNgles, M for kM"',
    category: 'concept',
    examTrack: 'fs'
  },
  {
    domain: 'Field Data Acquisition',
    front: 'FGCS: Reading Order Results',
    back: 'PASS: measured error ≤ allowable (c)\nFAIL: measured error > allowable (c)\n\nOrder hierarchy (best → worst):\nFirst → Second-I → Second-II → Third-I → Third-II\n\nTo find the highest order satisfied:\n1. Start at First Order (tightest)\n2. Work down until measured ≤ c\n3. Report that order\n\nNote: Higher number = LESS precise',
    category: 'concept',
    examTrack: 'fs'
  },

  // ─── Stadia Measurement ───

  {
    domain: 'Field Data Acquisition',
    front: 'Stadia: Level Distance Formula',
    back: 'HD = k × s\n\nWhere:\n• k = stadia constant = 100\n• s = stadia interval (upper hair − lower hair)\n\nExample:\nUpper hair = 7.84 ft, lower hair = 5.96 ft\ns = 1.88 ft\nHD = 100 × 1.88 = 188 ft\n\nRemember: 0.01 ft of interval = 1 ft of distance',
    category: 'formula',
    examTrack: 'fs'
  },
  {
    domain: 'Field Data Acquisition',
    front: 'Stadia: Slope Distance Formulas',
    back: 'For inclined sights (vertical angle α):\n\nHD = k × s × cos²(α)\nVD = (k × s / 2) × sin(2α)\n\nWhere:\n• HD = horizontal distance\n• VD = vertical distance\n• k = 100, s = stadia interval\n• α = vertical angle\n\nLevel trap: HD = k × s only when α = 0°',
    category: 'formula',
    examTrack: 'fs'
  },
  {
    domain: 'Field Data Acquisition',
    front: 'Stadia Half-Interval Method',
    back: 'Used when one stadia hair falls off the rod.\n\nProcedure:\n1. Read middle cross-hair (m) and ONE stadia hair\n2. Half-interval = |stadia hair − middle hair|\n3. Full interval = 2 × half-interval\n4. HD = 100 × full interval\n\nWorks because stadia hairs are symmetric\naround the middle cross-hair',
    category: 'concept',
    examTrack: 'fs'
  },
  {
    domain: 'Field Data Acquisition',
    front: 'Stadia Accuracy vs. EDM',
    back: 'STADIA:\n• Accuracy: 1:500 to 1:1,000\n• Pre-EDM topo surveys\n• Not suitable for control or boundary work\n\nEDM (Total Station):\n• Accuracy: 1:50,000 to 1:300,000+\n• Suitable for all precision work\n\nKey: Stadia accuracy is ~100× worse than EDM.\nUse stadia for rough topo, never for boundary.',
    category: 'concept',
    examTrack: 'fs'
  },

  // ─── Historical Units of Measure ───

  {
    domain: 'Field Data Acquisition',
    front: "Gunter's Chain: Key Conversions",
    back: "1 chain = 66 ft = 100 links\n1 link = 0.66 ft = 7.92 inches\n1 mile = 80 chains\n1 acre = 10 square chains\n4 rods = 1 chain\n\nInvented by Edmund Gunter (~1620)\nStandard unit for all U.S. public land surveys",
    category: 'formula',
    examTrack: 'fs'
  },
  {
    domain: 'Field Data Acquisition',
    front: 'Surveyor\'s Link: Value and Usage',
    back: '1 link = 1/100 of a Gunter\'s chain\n= 0.66 ft = 7.92 inches\n\n100 links = 1 chain (66 ft)\n\nHow to read old field notes:\n"N 45° E, 47 ch 63 lk" = 47 chains + 63 links\n= 47.63 chains × 66 ft = 3,143.58 ft',
    category: 'formula',
    examTrack: 'fs'
  },
  {
    domain: 'Field Data Acquisition',
    front: 'Rod, Perch, and Pole: Are They the Same?',
    back: 'YES — all three names refer to the SAME unit:\n\n1 rod = 1 perch = 1 pole = 16½ ft = 25 links\n\n• 4 rods = 1 chain (66 ft)\n• 320 rods = 1 mile\n• 40 rods = 1 furlong\n\nHistorical origin: length of an ox-goad stick\nAppears in colonial-era deed descriptions',
    category: 'definition',
    examTrack: 'fs'
  },
  {
    domain: 'Field Data Acquisition',
    front: 'Furlong: Conversion and Origin',
    back: '1 furlong = 660 ft = 40 rods = 10 chains\n8 furlongs = 1 mile\n\nOrigin: "furrow-long" — the length of one furrow plowed by an ox without resting\n\nStill used in:\n• Horse racing distances\n• Some historic deed descriptions\n\nMemory aid: "fur" = 10 chains, 40 rods',
    category: 'definition',
    examTrack: 'fs'
  },
  {
    domain: 'Field Data Acquisition',
    front: 'Fathom: Value and Usage',
    back: '1 fathom = 6 ft\n\nPrimarily used in:\n• Nautical depth measurements\n• Mining shaft depths\n• Coastal and tidal boundary surveys\n\nOrigin: outstretched arms span\n\nRarely appears in upland land surveys, but may appear in descriptions of tidelands, harbors, or coastal boundaries',
    category: 'definition',
    examTrack: 'fs'
  },
  {
    domain: 'Boundary Law & PLSS',
    front: 'Arpent: French Colonial Land Unit',
    back: '1 linear arpent ≈ 191.8 ft\n1 square arpent ≈ 0.845 acres\n\nRegional usage:\n• Louisiana (French colonial grants)\n• Canadian provinces\n• Mississippi River "long lots" frontage\n\nExample deed call:\n"4 arpents front on the river, 40 arpents deep"\n= ~767 ft frontage × ~7,672 ft depth',
    category: 'definition',
    examTrack: 'fs'
  },
  {
    domain: 'Boundary Law & PLSS',
    front: 'Vara: California vs. Texas Value',
    back: 'CALIFORNIA vara:\n• 1 vara = 33 inches = 2.75 ft\n• Used in Spanish & Mexican land grants\n\nTEXAS vara:\n• 1 vara = 33⅓ inches ≈ 2.778 ft\n• Used in Texas land grants\n\nValues vary slightly by state (some use 33.33 in).\n\nMemory aid: "vara ≈ yard (36 in) but shorter"\n\nConverting: multiply number of varas × ft/vara',
    category: 'definition',
    examTrack: 'fs'
  },
  {
    domain: 'Boundary Law & PLSS',
    front: 'Historical Units in Old Deeds: Quick Reference',
    back: 'Unit          | Value\n--------------|------------------\nChain         | 66 ft (100 links)\nLink          | 0.66 ft (7.92 in)\nRod/pole/perch| 16.5 ft (25 links)\nFurlong       | 660 ft (10 chains)\nFathom        | 6 ft\nArpent (LA)   | ≈ 191.8 ft\nVara (CA)     | 33 in = 2.75 ft\nVara (TX)     | 33⅓ in ≈ 2.778 ft\n\nRule: Identify the region first, then look up the local value',
    category: 'concept',
    examTrack: 'fs'
  },
];

// Combined flashcards for both exams
export const FLASHCARDS: Omit<Flashcard, 'id'>[] = [
  ...FS_FLASHCARDS,
  ...PS_FLASHCARDS,
  ...TX_FLASHCARDS
];

// Export FS cards separately for backward compatibility
export { FS_FLASHCARDS, PS_FLASHCARDS, TX_FLASHCARDS };
