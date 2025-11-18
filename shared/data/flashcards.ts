import type { Flashcard } from '../schema';

export const FLASHCARDS: Omit<Flashcard, 'id'>[] = [
  // Math & Basic Science - Formulas
  {
    domain: 'Math & Basic Science',
    front: '1 acre = ? square feet',
    back: '43,560 sq ft\n\nAlso remember:\n• 1 mile = 5,280 ft = 80 chains\n• 1 chain = 66 ft = 100 links\n• 1 rod = 16.5 ft',
    category: 'formula'
  },
  {
    domain: 'Math & Basic Science',
    front: 'Standard Deviation Formula',
    back: 'σ = √[Σ(x - x̄)² / (n-1)]\n\nWhere:\n• x = individual measurement\n• x̄ = mean\n• n = number of measurements\n\n95% confidence ≈ ±2σ',
    category: 'formula'
  },
  {
    domain: 'Math & Basic Science',
    front: 'Error Propagation: Sum/Difference',
    back: 'For Z = A ± B:\n\nσz² = σa² + σb²\n\n(Errors add in quadrature)\n\nStandard deviation of sum = √(σa² + σb²)',
    category: 'formula'
  },
  {
    domain: 'Math & Basic Science',
    front: 'Error Propagation: Product',
    back: 'For Z = A × B:\n\n(σz/Z)² = (σa/A)² + (σb/B)²\n\nRelative errors combine in quadrature',
    category: 'formula'
  },

  // Field Data Acquisition
  {
    domain: 'Field Data Acquisition',
    front: 'Temperature Correction for Tapes',
    back: 'Ct = α(T - Ts)L\n\nWhere:\n• α = coefficient of thermal expansion\n• T = field temperature\n• Ts = standard temperature (68°F)\n• L = measured length\n\nSteel: α ≈ 0.00000645/°F',
    category: 'formula'
  },
  {
    domain: 'Field Data Acquisition',
    front: 'Curvature & Refraction Correction',
    back: 'C&R = -0.667M²  (in feet)\n\nWhere M = distance in miles\n\nCurvature lowers line of sight\nRefraction raises it\nNet effect ≈ -0.67 ft/mile²',
    category: 'formula'
  },
  {
    domain: 'Field Data Acquisition',
    front: 'Differential Leveling: HI Method',
    back: 'HI = Elev + BS\nElev_new = HI - FS\n\nWhere:\n• HI = Height of Instrument\n• BS = Backsight\n• FS = Foresight\n\nChange in elev = BS - FS',
    category: 'formula'
  },
  {
    domain: 'Field Data Acquisition',
    front: 'EDM Error (ppm)',
    back: 'Total Error = ±(A + B × ppm)\n\nWhere:\n• A = instrument constant (mm)\n• B = measured distance\n• ppm = parts per million\n\nExample: ±(3mm + 2ppm)\nFor 1000m: ±(3 + 2) = ±5mm',
    category: 'formula'
  },

  // Plane Survey Computations
  {
    domain: 'Survey Computations & Applications',
    front: 'Latitude & Departure Formulas',
    back: 'Lat = D × cos(Az)\nDep = D × sin(Az)\n\nWhere:\n• D = distance\n• Az = azimuth from north\n\n• N/S = Latitude\n• E/W = Departure',
    category: 'formula'
  },
  {
    domain: 'Survey Computations & Applications',
    front: 'Inverse Formula (Azimuth)',
    back: 'Az = atan(ΔE / ΔN)\n\nQuadrant adjustments:\n• NE: Az = atan(ΔE/ΔN)\n• SE: Az = 180° - atan(ΔE/|ΔN|)\n• SW: Az = 180° + atan(|ΔE|/|ΔN|)\n• NW: Az = 360° - atan(|ΔE|/ΔN)',
    category: 'formula'
  },
  {
    domain: 'Survey Computations & Applications',
    front: 'Horizontal Curve: Tangent Length (T)',
    back: 'T = R × tan(Δ/2)\n\nWhere:\n• R = radius\n• Δ = deflection angle\n\nT = distance from PI to PC or PT',
    category: 'formula'
  },
  {
    domain: 'Survey Computations & Applications',
    front: 'Horizontal Curve: Length (L)',
    back: 'L = (RΔπ) / 180°\n\nOr: L = 100Δ / D\n\nWhere:\n• R = radius\n• Δ = central angle (degrees)\n• D = degree of curve',
    category: 'formula'
  },
  {
    domain: 'Survey Computations & Applications',
    front: 'Area by Coordinates (DMD Method)',
    back: 'Area = |Σ(DMD × Lat)| / 2\n\nDouble Meridian Distance:\n• First DMD = First Dep\n• Next DMD = Prev DMD + Prev Dep + Current Dep\n• Last DMD = Last Dep (check)',
    category: 'formula'
  },

  // Mapping, GIS, and CAD
  {
    domain: 'Mapping, GIS, and CAD',
    front: 'Photo Scale Formula',
    back: 'Scale = f / (H - h)\n\nWhere:\n• f = focal length\n• H = flying height above datum\n• h = ground elevation\n\nFor flat terrain: S = f / H',
    category: 'formula'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    front: 'Raster vs Vector Data',
    back: 'RASTER:\n• Grid of cells/pixels\n• Examples: satellite imagery, DEMs\n• Good for continuous data\n\nVECTOR:\n• Points, lines, polygons\n• Examples: roads, parcels, buildings\n• Precise boundaries',
    category: 'concept'
  },
  {
    domain: 'Mapping, GIS, and CAD',
    front: 'Contour Line Rules',
    back: '• Never cross (except overhanging cliffs)\n• Closer = steeper slope\n• Point upstream in valleys\n• Perpendicular to steepest slope\n• Close on themselves\n• Uniform slope = evenly spaced',
    category: 'concept'
  },

  // Boundary Law & PLSS
  {
    domain: 'Boundary Law & PLSS',
    front: 'Order of Conflicting Calls (Hierarchy)',
    back: '1. Natural Monuments\n2. Artificial Monuments\n3. Bearings/Directions\n4. Distances\n5. Area/Quantity\n\n"Monuments control over measurements"',
    category: 'concept'
  },
  {
    domain: 'Boundary Law & PLSS',
    front: 'PLSS Section Numbering',
    back: 'Start: NE corner (Sec 1)\n\nSerpentine pattern:\n1-6 (W), 7-12 (E), 13-18 (W),\n19-24 (E), 25-30 (W), 31-36 (E)\n\nEnd: SE corner (Sec 36)',
    category: 'concept'
  },
  {
    domain: 'Boundary Law & PLSS',
    front: 'Section Subdivision (Aliquots)',
    back: 'Section = 640 acres (1 mi²)\n• 1/2 Section = 320 acres\n• 1/4 Section = 160 acres\n• 1/4 of 1/4 = 40 acres\n• 1/4 of 1/4 of 1/4 = 10 acres',
    category: 'formula'
  },
  {
    domain: 'Boundary Law & PLSS',
    front: 'Lost vs Obliterated Corner',
    back: 'LOST:\n• No visible evidence\n• Position unknown\n• Must be RESTORED\n\nOBLITERATED:\n• Position can be recovered\n• Evidence exists (measurements, bearings)\n• Can be REHABILITATED',
    category: 'definition'
  },
  {
    domain: 'Boundary Law & PLSS',
    front: 'Single Proportionate Measurement',
    back: 'Used for:\n• Lost quarter corners\n• Lost section corners on township boundaries\n\nProportion based on ONE line (record distances between found corners)',
    category: 'concept'
  },
  {
    domain: 'Boundary Law & PLSS',
    front: 'Double Proportionate Measurement',
    back: 'Used for:\n• Lost interior section corners\n• Lost closing corners\n\nProportion based on TWO lines (N-S and E-W)\n\nMore complex than single proportion',
    category: 'concept'
  },

  // Geodesy, GPS, Astronomy
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'h = H + N',
    back: 'Ellipsoid Height Relationship:\n\n• h = ellipsoid height (GPS)\n• H = orthometric height (elevation MSL)\n• N = geoid height (separation)\n\nTo get elevation from GPS:\nH = h - N',
    category: 'formula'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'NAD 27 vs NAD 83',
    back: 'NAD 27:\n• Clarke 1866 ellipsoid\n• Meades Ranch, KS origin\n• Horizontal datum\n\nNAD 83:\n• GRS 80 ellipsoid\n• Geocentric\n• Earth-centered\n\nShifts: typically 10-100m',
    category: 'definition'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'NGVD 29 vs NAVD 88',
    back: 'NGVD 29:\n• Vertical datum\n• Based on mean sea level\n\nNAVD 88:\n• Current vertical datum\n• Helmert orthometric heights\n• Based on geoid model\n\nDifferences: up to 1+ meter',
    category: 'definition'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'DOP (Dilution of Precision)',
    back: 'Measures satellite geometry:\n\n• PDOP = Position (3D)\n• HDOP = Horizontal (2D)\n• VDOP = Vertical\n• GDOP = Geometric (overall)\n\nLower is better:\n< 2 = Excellent\n2-5 = Good\n5-10 = Moderate\n> 10 = Poor',
    category: 'concept'
  },
  {
    domain: 'Applied Mathematics & Statistics',
    front: 'RTK vs Static GPS',
    back: 'RTK (Real-Time Kinematic):\n• Real-time corrections\n• cm accuracy\n• Radio/cellular link\n• Faster (minutes)\n\nSTATIC:\n• Post-processing\n• mm-cm accuracy\n• Longer sessions (20min-hours)\n• Better for control networks',
    category: 'concept'
  },

  // Professional Practice
  {
    domain: 'Professional Practice',
    front: 'NCEES Fundamental Principle',
    back: 'Paramount Obligation:\n\n"Hold paramount the safety, health, and welfare of the public."\n\nThis supersedes:\n• Client interests\n• Employer directives\n• Economic considerations',
    category: 'definition'
  },
  {
    domain: 'Professional Practice',
    front: 'Types of Deeds',
    back: 'WARRANTY DEED:\n• Best protection\n• Seller guarantees title\n• Will defend against claims\n\nQUITCLAIM DEED:\n• No warranties\n• "Whatever interest I have"\n• Minimal protection',
    category: 'definition'
  },
  {
    domain: 'Professional Practice',
    front: 'Easement Types',
    back: 'APPURTENANT:\n• Benefits specific parcel (dominant estate)\n• Runs with the land\n\nIN GROSS:\n• Benefits person/entity\n• Doesn\'t run with land\n\nBY NECESSITY:\n• Landlocked parcel\n• Access requirement',
    category: 'definition'
  },
  {
    domain: 'Professional Practice',
    front: 'Adverse Possession Elements',
    back: 'Requirements (OCEAN):\n• Open & Notorious\n• Continuous\n• Exclusive\n• Adverse/Hostile\n• Under claim of right\n\nTypically 10-20 years\n(varies by state)',
    category: 'concept'
  },
];
