import { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, Timer, RefreshCw, CheckCircle, XCircle, AlertTriangle, Sparkles, Zap, Loader2 } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';
import type { RetentionReview } from '@shared/schema';
import { DOMAINS, XP_AWARDS } from '@shared/schema';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

interface RetentionStats {
  totalReviews: number;
  dueToday: number;
  averageMastery: number;
  retentionScore: number;
}

interface ReinforceRetentionBoosterProps {
  week: number;
  domains?: string[];
  examTrack?: string;
}

type ConceptEntry = { id: string; type: 'formula' | 'procedure' | 'definition'; text: string; domain: number };

const DOMAIN_NAME_TO_NUMBER: Record<string, number> = {
  'Math & Basic Science': 1,
  'Field Data Acquisition': 2,
  'Mapping, GIS, and CAD': 3,
  'Boundary Law & PLSS': 4,
  'Surveying Principles': 5,
  'Survey Computations & Applications': 6,
  'Professional Practice': 7,
  'Applied Mathematics & Statistics': 8,
  'Legal Principles': 9,
  'Professional Survey Practices': 10,
  'Standards and Specifications': 11,
  'Business Practices': 12,
  'Areas of Practice': 13,
};

const DOMAIN_CONCEPTS: Record<number, ConceptEntry[]> = {
  1: [
    { id: 'd1-sig-figs', type: 'procedure', text: 'Significant figures: When multiplying/dividing, the result has the same number of significant figures as the least precise input. When adding/subtracting, align decimal places.', domain: 1 },
    { id: 'd1-std-dev', type: 'formula', text: 'Standard Deviation: s = sqrt( Σ(xi - x_bar)^2 / (n-1) ). Use n-1 (Bessel correction) for sample standard deviation.', domain: 1 },
    { id: 'd1-std-error', type: 'formula', text: 'Standard Error of the Mean: SE = s / sqrt(n). More observations reduce the standard error, not the standard deviation.', domain: 1 },
    { id: 'd1-error-prop-sum', type: 'formula', text: 'Error Propagation (sum/difference): σ_total = sqrt(σ1^2 + σ2^2 + ... + σn^2). Errors add in quadrature, not linearly.', domain: 1 },
    { id: 'd1-unit-conv', type: 'definition', text: 'Survey Foot vs International Foot: 1 US Survey Foot = 1200/3937 m. 1 International Foot = 0.3048 m exactly. The difference is about 2 ppm.', domain: 1 },
    { id: 'd1-acre', type: 'definition', text: 'Key conversions: 1 acre = 43,560 sq ft. 1 chain = 66 ft. 1 mile = 80 chains. 1 section = 640 acres.', domain: 1 },
    { id: 'd1-error-types', type: 'definition', text: 'Error Classification: Systematic (consistent pattern, can be corrected). Random (follows normal distribution, reduced by redundancy). Blunder/Gross (mistakes, detected by checks and redundancy).', domain: 1 },
    { id: 'd1-calc-check', type: 'procedure', text: 'Calculator Strategy: Only NCEES-approved models allowed. Practice all key calculations on YOUR calculator. Know how to convert DMS to decimal degrees and back quickly.', domain: 1 },
    { id: 'd1-formula-ref', type: 'procedure', text: 'NCEES Reference Handbook: Know where formulas are located BEFORE exam day. Practice using ONLY the handbook for 2+ practice exams. Tab or bookmark key pages mentally.', domain: 1 },
    { id: 'd1-sense-check', type: 'procedure', text: 'Sense-Check Answers: Does the area of a residential lot = 500 acres? (No, probably 0.5.) Does a bearing of N 400 E exist? (No, max 90.) Always verify your answer is reasonable.', domain: 1 },
  ],
  2: [
    { id: 'd2-diff-level', type: 'procedure', text: 'Differential Leveling: HI = Elevation_BM + BS. Elevation of point = HI - FS. Always read BS first on known point, then FS on unknown.', domain: 2 },
    { id: 'd2-curv-refr', type: 'formula', text: 'Curvature & Refraction correction: C&R = 0.0206 × D^2 (D in thousands of feet, result in feet). For long sights, Earth curves away and refraction bends light down.', domain: 2 },
    { id: 'd2-edm-ppm', type: 'formula', text: 'EDM correction: Total Error = constant error + (distance × ppm/1,000,000). A 5mm + 3ppm EDM measuring 1000m has error = 5mm + 3mm = 8mm.', domain: 2 },
    { id: 'd2-tape-temp', type: 'formula', text: 'Tape Temperature Correction: Ct = L × α × (T - Ts). α (steel) = 6.45 × 10^-6 per deg F. Positive Ct means tape is longer than standard.', domain: 2 },
    { id: 'd2-tape-sag', type: 'formula', text: 'Tape Sag Correction: Cs = -w^2 × L^3 / (24 × P^2). Always negative (tape is shorter when sagging). w = weight per unit length, P = tension applied.', domain: 2 },
    { id: 'd2-turning-pt', type: 'procedure', text: 'Turning Point procedure: Take FS on TP from current setup, move instrument ahead, take BS on same TP. A TP is never a benchmark - it is temporary.', domain: 2 },
    { id: 'd2-mag-decl', type: 'procedure', text: 'Magnetic Declination: True Bearing = Magnetic Bearing + East Declination (or - West Declination). Declination changes over time; use current NOAA model.', domain: 2 },
    { id: 'd2-collimation', type: 'definition', text: 'Collimation Error: Line of sight not perpendicular to horizontal axis. Eliminated by observing in both Face Left and Face Right (direct and reverse).', domain: 2 },
  ],
  3: [
    { id: 'd3-contour', type: 'definition', text: 'Contour Rules: Contours never cross (except overhangs). Evenly spaced = uniform slope. Close together = steep. V-shapes point upstream in valleys. Closed contours = hilltop or depression.', domain: 3 },
    { id: 'd3-photo-scale', type: 'formula', text: 'Photo Scale: S = f / (H - h). f = focal length, H = flying height above datum, h = ground elevation. Scale varies across photo due to relief displacement.', domain: 3 },
    { id: 'd3-relief-disp', type: 'formula', text: 'Relief Displacement: d = r × h / H. d = displacement on photo, r = radial distance from principal point, h = object height, H = flying height above base.', domain: 3 },
    { id: 'd3-raster-vector', type: 'definition', text: 'GIS Data Types: Raster = grid of cells/pixels (DEMs, imagery). Vector = points, lines, polygons (parcels, roads). Raster for continuous data, vector for discrete features.', domain: 3 },
    { id: 'd3-flying-height', type: 'formula', text: 'Flying Height: H = f / S + h_avg. For 1:10,000 scale with 6" (152mm) focal length: H = 0.152m × 10,000 + h_avg = 1,520m + h_avg above datum.', domain: 3 },
    { id: 'd3-overlap', type: 'definition', text: 'Aerial Photo Overlap: Forward (endlap) = 60% standard for stereo coverage. Sidelap = 25-30% between flight lines. Stereo pairs require 60%+ forward overlap.', domain: 3 },
  ],
  4: [
    { id: 'd4-title-elements', type: 'definition', text: 'Hierarchy of Title Elements: (1) Rights of parties in possession, (2) Senior rights/unwritten rights, (3) Written title (calls for monuments > distances > area > coordinates).', domain: 4 },
    { id: 'd4-deed-types', type: 'definition', text: 'Deed Types: General Warranty (most protection, covenants against all defects). Special Warranty (only defects during grantor\'s ownership). Quitclaim (no warranties, transfers whatever interest grantor has).', domain: 4 },
    { id: 'd4-easement', type: 'definition', text: 'Easement Types: Appurtenant (attached to land, has dominant/servient estate). In Gross (personal right, like utility). Created by express grant, implication, necessity, or prescription.', domain: 4 },
    { id: 'd4-adverse', type: 'definition', text: 'Adverse Possession (OCEAN): Open & notorious, Continuous, Exclusive, Adverse/hostile, for the statutory period (varies by state, typically 5-20 years). Must meet ALL elements.', domain: 4 },
    { id: 'd4-monuments', type: 'procedure', text: 'Calls for Monuments: Natural monuments (rivers, trees) control over artificial (iron pins, stakes). Artificial monuments control over distances. Distances control over area.', domain: 4 },
    { id: 'd4-legal-desc', type: 'definition', text: 'Legal Description Types: Metes & Bounds (bearings, distances, POB). Lot & Block (recorded subdivision). PLSS (Section, Township, Range). All must close and be unambiguous.', domain: 4 },
    { id: 'd4-plss-struct', type: 'definition', text: 'PLSS Structure: Initial Point → Principal Meridian (N/S) + Baseline (E/W) → Townships (6mi × 6mi) → 36 Sections per township → Aliquot parts (halves and quarters).', domain: 4 },
    { id: 'd4-section-num', type: 'procedure', text: 'Section Numbering: Starts at NE corner (Section 1), serpentines west to Section 6, drops down, goes east (7-12), continues serpentine to Section 36 at SE corner.', domain: 4 },
    { id: 'd4-aliquot', type: 'formula', text: 'Aliquot Parts: Read inside-out. "NW1/4 of SE1/4 of Section 12" = 40 acres. Start from section (640ac), each quarter divides by 4. 640 × 1/4 × 1/4 = 40.', domain: 4 },
    { id: 'd4-corner-types', type: 'definition', text: 'PLSS Corner Types: Standard corners (placed during original survey), Closing corners (where lines close on prior surveys), Meander corners (at navigable water intersections), Witness corners (near true position when corner can\'t be set).', domain: 4 },
    { id: 'd4-lost-obliterated', type: 'definition', text: 'Lost Corner: No evidence of original position, no reliable testimony. Must be restored by proportionate measurement. Obliterated Corner: Original position can be determined from evidence or testimony.', domain: 4 },
    { id: 'd4-single-prop', type: 'procedure', text: 'Single Proportionate Measurement: For lost corners on a line between two known corners (e.g., lost quarter corner). Place at proportionate distance based on original measurements.', domain: 4 },
    { id: 'd4-double-prop', type: 'procedure', text: 'Double Proportionate Measurement: For lost interior section corners. Proportion N-S first (between section corners on same range line), then E-W. Intersection = restored position.', domain: 4 },
    { id: 'd4-original-survey', type: 'definition', text: 'Original Survey Principle: The original survey controls. If an original corner exists (even if position seems wrong), it stands. Corners are only "lost" when all evidence of position is gone.', domain: 4 },
    { id: 'd4-riparian', type: 'definition', text: 'Riparian Rights: Ownership rights along a river or stream. Littoral Rights: Along a lake, sea, or ocean. Both give right of access to water, but boundary location rules differ.', domain: 4 },
    { id: 'd4-accretion', type: 'definition', text: 'Water Boundary Changes: Accretion = gradual addition of land by water (boundary moves). Reliction = water gradually recedes (boundary moves). Avulsion = sudden change (boundary stays).', domain: 4 },
    { id: 'd4-navigable', type: 'definition', text: 'Navigable Waters: Federal test = "navigable in fact" (usable for commerce). State-owned bed below ordinary high water mark. Non-navigable = private ownership to thread/center of stream.', domain: 4 },
    { id: 'd4-high-water', type: 'definition', text: 'Ordinary High Water Mark (OHWM): The line on the bank established by water fluctuations and indicated by physical characteristics - changes in vegetation, soil, or debris deposits.', domain: 4 },
  ],
  5: [
    { id: 'd5-bearing-az', type: 'formula', text: 'Bearing to Azimuth: NE quadrant: Az = Bearing. SE: Az = 180 - Bearing. SW: Az = 180 + Bearing. NW: Az = 360 - Bearing.', domain: 5 },
    { id: 'd5-angle-sum', type: 'formula', text: 'Interior Angle Sum = (n-2) × 180 degrees, where n = number of sides. A triangle = 180, quadrilateral = 360, pentagon = 540.', domain: 5 },
    { id: 'd5-deflection', type: 'definition', text: 'Deflection Angles: Measured from the extension of the back line. Right deflections are positive, left are negative. Sum of deflections for a closed traverse = 360.', domain: 5 },
    { id: 'd5-back-az', type: 'formula', text: 'Back Azimuth = Forward Azimuth ± 180. If forward Az < 180, add 180. If forward Az >= 180, subtract 180.', domain: 5 },
    { id: 'd5-lat-dep', type: 'formula', text: 'Latitude = Distance × cos(Azimuth). Departure = Distance × sin(Azimuth). Lat is N/S component, Dep is E/W component.', domain: 5 },
    { id: 'd5-compass-rule', type: 'formula', text: 'Compass Rule (Bowditch): Correction_lat = -(error_lat × distance_i / total_distance). Same for departure. Distributes error proportional to leg length.', domain: 5 },
    { id: 'd5-closure-ratio', type: 'formula', text: 'Closure Ratio = Linear Error of Closure / Total Distance. LEC = sqrt(ΔLat^2 + ΔDep^2). Express as 1:N (e.g., 1:10,000).', domain: 5 },
    { id: 'd5-coord-area', type: 'formula', text: 'Area by Coordinates: 2A = Σ(Xi(Yi+1 - Yi-1)). Or cross-multiply method: 2A = Σ(XiYi+1) - Σ(Xi+1Yi). Divide by 2 for area.', domain: 5 },
    { id: 'd5-inverse', type: 'formula', text: 'Inversing: Distance = sqrt(ΔN^2 + ΔE^2). Azimuth = arctan(ΔE/ΔN), adjusted for quadrant. Always check which quadrant ΔN and ΔE place you in.', domain: 5 },
    { id: 'd5-closure-std', type: 'definition', text: 'Closure Standards: First order traverse: 1:100,000. Second order: 1:50,000. Third order: 1:10,000. Level loop: First order = 3mm × sqrt(K), Second = 6mm × sqrt(K). K in km.', domain: 5 },
    { id: 'd5-traverse-review', type: 'procedure', text: 'Traverse Workflow: Measure angles and distances → Compute azimuths → Calculate lat/dep → Check closure → Adjust (Compass Rule) → Compute coordinates → Calculate area.', domain: 5 },
  ],
  6: [
    { id: 'd6-avg-end', type: 'formula', text: 'Average End Area: V = L × (A1 + A2) / 2. L = distance between cross-sections. Simple but overestimates volume when areas differ significantly.', domain: 6 },
    { id: 'd6-prismoidal', type: 'formula', text: 'Prismoidal Formula: V = L/6 × (A1 + 4Am + A2). Am = area at mid-section. More accurate than average end area; required when A1 and A2 differ greatly.', domain: 6 },
    { id: 'd6-dmd', type: 'formula', text: 'Area by DMD: DMD of first course = its departure. DMD of next = DMD_prev + Dep_prev + Dep_current. 2A = Σ(DMD × Latitude).', domain: 6 },
    { id: 'd6-borrow-pit', type: 'procedure', text: 'Borrow Pit Volumes: Grid the area, compute average depth at each grid cell, multiply by cell area. Volume = Σ(cell_area × avg_depth_at_corners / 4).', domain: 6 },
    { id: 'd6-simpsons', type: 'formula', text: 'Simpson\'s 1/3 Rule (areas with curved boundary): A = d/3 × (h1 + 4h2 + 2h3 + 4h4 + ... + hn). Requires odd number of offsets (even number of intervals).', domain: 6 },
    { id: 'd6-mass-diag', type: 'definition', text: 'Mass Diagram: Plots cumulative earthwork volume vs station. Rising = cut, falling = fill. Balance line shows where cut volume equals fill volume for optimal haul.', domain: 6 },
    { id: 'd6-horiz-curve', type: 'formula', text: 'Horizontal Curve: T = R × tan(Δ/2). L = R × Δ (radians) or L = 100 × Δ/D. E = R × (1/cos(Δ/2) - 1). M = R × (1 - cos(Δ/2)).', domain: 6 },
    { id: 'd6-degree-curve', type: 'definition', text: 'Degree of Curve: Arc definition (highway): D subtends 100ft arc. Chord definition (railroad): D subtends 100ft chord. R_arc = 5729.58/D.', domain: 6 },
    { id: 'd6-vert-curve', type: 'formula', text: 'Vertical Curve: y = (g2 - g1) / (2L) × x^2. High/Low point station: x = -g1 × L / (g2 - g1), measured from BVC. L in stations.', domain: 6 },
    { id: 'd6-pc-pt', type: 'definition', text: 'Curve Points: PC (Point of Curvature) = PI - T. PT (Point of Tangency) = PC + L. PI is where the two tangent lines intersect.', domain: 6 },
    { id: 'd6-sight-dist', type: 'formula', text: 'Stopping Sight Distance on crest curves: L = A × S^2 / (200 × (sqrt(h1) + sqrt(h2))^2). h1 = driver eye height (3.5ft), h2 = object height (2ft or 0.5ft).', domain: 6 },
    { id: 'd6-super-elev', type: 'formula', text: 'Superelevation: e + f = V^2 / (15 × R). e = superelevation rate, f = side friction factor, V = speed (mph), R = radius (ft).', domain: 6 },
    { id: 'd6-intersect', type: 'procedure', text: 'Line-Line Intersection: Given two points and two directions, solve using parametric equations or simultaneous lat/dep equations to find the intersection coordinates.', domain: 6 },
  ],
  7: [
    { id: 'd7-ethics', type: 'definition', text: 'Paramount Duty: A surveyor\'s primary obligation is to public health, safety, and welfare - above obligations to clients or employers. This is the #1 NCEES ethics principle.', domain: 7 },
    { id: 'd7-conduct', type: 'definition', text: 'Professional Conduct Rules: Only practice in areas of competence. Do not sign/seal work not performed under your supervision. Disclose conflicts of interest. Reject bribery.', domain: 7 },
    { id: 'd7-alta', type: 'definition', text: 'ALTA/NSPS Survey: Required for title insurance on commercial property. Must show boundaries, improvements, easements, encroachments, and comply with Table A optional items if selected.', domain: 7 },
    { id: 'd7-contracts', type: 'definition', text: 'Survey Contracts: Should specify scope, deliverables, timeline, fees, and standards. Change orders needed for scope changes. Standard of care = what a reasonably prudent surveyor would do.', domain: 7 },
    { id: 'd7-liability', type: 'definition', text: 'Professional Liability: Surveyors can be liable for negligence (breach of standard of care), errors in boundary location, and incorrect certifications. Carry E&O insurance.', domain: 7 },
    { id: 'd7-seal', type: 'procedure', text: 'Seal & Certification: Survey documents must bear the seal and signature of the responsible surveyor. Sealing work certifies it meets applicable standards and was done under your responsible charge.', domain: 7 },
    { id: 'd7-time-mgmt', type: 'procedure', text: 'FS Exam Structure: 110 questions, 6 hours. That is ~3.3 minutes per question. Budget 2 minutes for quick recall, 4 minutes for calculations. Flag and return to difficult ones.', domain: 7 },
    { id: 'd7-domain-weight', type: 'definition', text: 'FS Exam Domain Weights (approximate): Surveying/Computations ~25%, Boundary/PLSS ~20%, Math/Science ~15%, Field Data ~15%, Mapping/GIS ~10%, Professional Practice ~10%, Geodesy ~5%.', domain: 7 },
    { id: 'd7-exam-strategy', type: 'procedure', text: 'Exam Triage: First pass = answer questions you know (30 sec each). Second pass = work solvable problems (2-3 min each). Third pass = educated guesses on remaining. No penalty for guessing.', domain: 7 },
  ],
  8: [
    { id: 'd8-geoid-ellip', type: 'definition', text: 'Three surfaces: Ellipsoid (mathematical reference), Geoid (equipotential gravity surface, "mean sea level"), Topographic (actual ground). h = H + N (ellipsoid = orthometric + geoid separation).', domain: 8 },
    { id: 'd8-datums', type: 'definition', text: 'NAD83: Current horizontal datum (GRS80 ellipsoid). NAVD88: Current vertical datum (geoid-based). NAD27: Old horizontal (Clarke 1866). NGVD29: Old vertical (26 tide gauges).', domain: 8 },
    { id: 'd8-state-plane', type: 'definition', text: 'State Plane Coordinates: Lambert Conformal Conic for wide (E-W) states. Transverse Mercator for tall (N-S) states. Scale factor varies from central meridian/standard parallels.', domain: 8 },
    { id: 'd8-convergence', type: 'definition', text: 'Grid vs Geodetic: Convergence angle (γ) = difference between grid north and geodetic north. Grid azimuth = Geodetic azimuth - convergence. Convergence = 0 on central meridian.', domain: 8 },
    { id: 'd8-scale-factor', type: 'formula', text: 'Combined Scale Factor = Grid Scale Factor × Elevation Scale Factor. Elevation SF = R / (R + h). Ground distance = Grid distance / Combined SF.', domain: 8 },
    { id: 'd8-geoid-height', type: 'formula', text: 'Geoid height (N): h(ellipsoid) = H(orthometric) + N. If N is negative (most of US), the geoid is below the ellipsoid. Use NGS GEOID model for N values.', domain: 8 },
    { id: 'd8-gnss-errors', type: 'definition', text: 'GNSS Error Sources: Ionospheric delay (biggest), tropospheric delay, multipath, receiver noise, orbital errors, clock errors. Dual-frequency receivers correct ionospheric delay.', domain: 8 },
    { id: 'd8-dop', type: 'definition', text: 'DOP (Dilution of Precision): GDOP = geometric, PDOP = position, HDOP = horizontal, VDOP = vertical. Lower is better. PDOP < 4 is good. Poor satellite geometry = high DOP.', domain: 8 },
    { id: 'd8-rtk-static', type: 'definition', text: 'RTK: Real-time cm accuracy, needs base station or VRS network, limited range (~10km). Static: Post-processed, highest accuracy (mm), requires long occupation times (30min-2hr+).', domain: 8 },
    { id: 'd8-opus', type: 'procedure', text: 'OPUS: Upload RINEX data to NGS, returns NAD83 coordinates. Requires dual-frequency data, 2+ hours static. Reports peak-to-peak errors; all three should be < 5cm.', domain: 8 },
    { id: 'd8-multipath', type: 'definition', text: 'Multipath: GNSS signal reflects off surfaces before reaching antenna. Causes position errors. Worse near buildings, water, vehicles. Cannot be corrected by differential processing.', domain: 8 },
    { id: 'd8-cors', type: 'definition', text: 'CORS (Continuously Operating Reference Stations): NGS network of permanent GNSS stations. Provide reference data for post-processing. Enable OPUS solutions and VRS networks.', domain: 8 },
  ],
  9: [
    { id: 'd9-stare-decisis', type: 'definition', text: 'Stare Decisis: Legal doctrine meaning "let the decision stand." Courts follow precedent from higher courts in the same jurisdiction. Key principle in boundary law interpretation.', domain: 9 },
    { id: 'd9-statute-of-frauds', type: 'definition', text: 'Statute of Frauds: Real property transfers must be in writing to be enforceable. Oral agreements for land are generally void except where part performance or estoppel applies.', domain: 9 },
    { id: 'd9-quiet-title', type: 'definition', text: 'Quiet Title Action: Court proceeding to establish ownership and clear competing claims. Used when title is clouded by adverse claims, old liens, or boundary disputes.', domain: 9 },
    { id: 'd9-eminent-domain', type: 'definition', text: 'Eminent Domain: Government power to take private property for public use with just compensation (5th Amendment). Surveyor may be needed for legal descriptions and appraisals.', domain: 9 },
    { id: 'd9-laches', type: 'definition', text: 'Laches: Equitable defense where unreasonable delay in asserting a right, combined with prejudice to the other party, bars the claim. Different from statute of limitations.', domain: 9 },
    { id: 'd9-expert-witness', type: 'procedure', text: 'Expert Witness: PS surveyor may testify as expert in boundary disputes. Must demonstrate specialized knowledge. Opinion testimony allowed under Daubert/Frye standards.', domain: 9 },
  ],
  10: [
    { id: 'd10-standard-care', type: 'definition', text: 'Standard of Care: What a reasonably prudent surveyor would do under similar circumstances. Not perfection, but competent professional practice per accepted standards.', domain: 10 },
    { id: 'd10-research', type: 'procedure', text: 'Title Research: Examine deed chain, plats, prior surveys, court records, and physical evidence before fieldwork. Failure to research is negligence per se.', domain: 10 },
    { id: 'd10-retracement', type: 'definition', text: 'Retracement Survey: Follow the footsteps of the original surveyor. The objective is to locate the original corners and lines, not to correct the original survey.', domain: 10 },
    { id: 'd10-senior-junior', type: 'definition', text: 'Senior vs Junior Rights: The first valid survey/conveyance takes priority. Junior (later) surveys must yield to senior rights. Senior rights are paramount in conflicts.', domain: 10 },
    { id: 'd10-simultaneous', type: 'definition', text: 'Simultaneous Conveyances: When multiple parcels are created from the same parent tract simultaneously, none has seniority. Proportional adjustment may be required.', domain: 10 },
    { id: 'd10-practical-loc', type: 'definition', text: 'Practical Location: A boundary line established by agreement, acquiescence, or long occupation that may differ from the record description. Can become legally binding.', domain: 10 },
  ],
  11: [
    { id: 'd11-alta-nsps', type: 'definition', text: 'ALTA/NSPS Standards: Minimum standard detail requirements for land title surveys. Positional tolerance: 2cm + 50ppm relative to nearest control. Table A items are optional.', domain: 11 },
    { id: 'd11-fema-flood', type: 'definition', text: 'FEMA Flood Mapping: Elevation Certificates require accurate BFE (Base Flood Elevation). LOMA (Letter of Map Amendment) can remove property from flood zone with proper survey data.', domain: 11 },
    { id: 'd11-fgcs', type: 'definition', text: 'FGCS Standards: Federal Geodetic Control Subcommittee sets accuracy standards for control surveys. Orders: First (highest), Second, Third. Specifies procedures and tolerances.', domain: 11 },
    { id: 'd11-nsrs', type: 'definition', text: 'NSRS (National Spatial Reference System): Defines latitude, longitude, height, scale, gravity, and orientation throughout the US. Maintained by NGS. Foundation for all surveys.', domain: 11 },
    { id: 'd11-plss-manual', type: 'definition', text: 'Manual of Surveying Instructions (BLM): The authoritative guide for PLSS surveys on federal lands. Governs corner restoration, proportionate measurement, and survey procedures.', domain: 11 },
    { id: 'd11-state-standards', type: 'definition', text: 'State Minimum Standards: Each state sets its own minimum technical standards for boundary surveys. May exceed national standards. Must know your state\'s requirements.', domain: 11 },
  ],
  12: [
    { id: 'd12-contracts', type: 'definition', text: 'Survey Contracts: Define scope, deliverables, timeline, fees, and applicable standards. Include provisions for additional services, dispute resolution, and limitation of liability.', domain: 12 },
    { id: 'd12-liability-ins', type: 'definition', text: 'Professional Liability Insurance (E&O): Covers claims arising from professional negligence. Policy limits, deductibles, and tail coverage are critical business decisions.', domain: 12 },
    { id: 'd12-project-mgmt', type: 'procedure', text: 'Project Management: Scope definition → Resource planning → Schedule → Field work → Office processing → QA/QC review → Deliverables → Client communication → Archiving.', domain: 12 },
    { id: 'd12-risk-mgmt', type: 'definition', text: 'Risk Management: Identify potential errors and omissions. Use checklists, peer review, QA/QC procedures. Document all decisions and communications with clients.', domain: 12 },
    { id: 'd12-billing', type: 'definition', text: 'Fee Structures: Lump sum (fixed price), time and materials (hourly), per diem, or unit price. Each has different risk allocation between surveyor and client.', domain: 12 },
    { id: 'd12-records', type: 'procedure', text: 'Record Keeping: Maintain field notes, calculations, correspondence, and survey documents. Retention period varies by state (typically 5-10 years minimum). Digital archiving best practices.', domain: 12 },
  ],
  13: [
    { id: 'd13-construction', type: 'procedure', text: 'Construction Staking: Set points for building location, grades, and utilities per plans. Verify setbacks, easements, and flood zones before staking. Document all offsets.', domain: 13 },
    { id: 'd13-subdivision', type: 'procedure', text: 'Subdivision Design: Comply with local ordinances for lot sizes, frontage, setbacks, utilities, drainage. Prepare plat with legal descriptions, monuments, and dedications.', domain: 13 },
    { id: 'd13-geodetic-survey', type: 'definition', text: 'Geodetic Surveying: Large-area surveys accounting for Earth\'s curvature. Use geodetic coordinates (lat/lon), ellipsoidal heights, and projections for mapping.', domain: 13 },
    { id: 'd13-hydrographic', type: 'definition', text: 'Hydrographic Surveying: Measure water depths and underwater topography. Uses sonar, GPS, and tide gauges. Applications: navigation charts, dredging, coastal engineering.', domain: 13 },
    { id: 'd13-mining-survey', type: 'definition', text: 'Mining Surveys: Underground control, claim staking, volume calculations. Unique challenges: limited GPS, gyroscope orientation, subsidence monitoring, mineral rights.', domain: 13 },
    { id: 'd13-gis-integration', type: 'definition', text: 'GIS Integration: Survey data feeds into GIS databases. Coordinate system compatibility, metadata standards, and topology rules ensure data quality and interoperability.', domain: 13 },
  ],
};

function getConceptsForDomains(domainNames: string[]): ConceptEntry[] {
  const domainNumbers = domainNames
    .map(name => DOMAIN_NAME_TO_NUMBER[name])
    .filter((n): n is number => n !== undefined);

  if (domainNumbers.length === 0) {
    return DOMAIN_CONCEPTS[1]?.slice(0, 6) || [];
  }

  const allConcepts: ConceptEntry[] = [];
  for (const num of domainNumbers) {
    const pool = DOMAIN_CONCEPTS[num];
    if (pool) {
      allConcepts.push(...pool);
    }
  }

  if (allConcepts.length <= 6) return allConcepts;

  const perDomain = Math.max(2, Math.floor(6 / domainNumbers.length));
  const selected: ConceptEntry[] = [];
  for (const num of domainNumbers) {
    const pool = DOMAIN_CONCEPTS[num];
    if (pool) {
      selected.push(...pool.slice(0, perDomain));
    }
  }
  return selected.slice(0, 6);
}

function getSessionCompletedKey(userId: string | undefined, week: number): string {
  return `retention-booster-completed:${userId || 'anon'}:w${week}`;
}

function isSessionCompletedToday(userId: string | undefined, week: number): boolean {
  try {
    const key = getSessionCompletedKey(userId, week);
    const stored = localStorage.getItem(key);
    if (!stored) return false;
    const { date } = JSON.parse(stored);
    const today = new Date().toDateString();
    return date === today;
  } catch {
    return false;
  }
}

function markSessionCompletedToday(userId: string | undefined, week: number): void {
  try {
    const key = getSessionCompletedKey(userId, week);
    localStorage.setItem(key, JSON.stringify({ date: new Date().toDateString() }));
  } catch {
  }
}

export function ReinforceRetentionBooster({ week, domains = [], examTrack = "fs" }: ReinforceRetentionBoosterProps) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { user } = useAuth();
  const userId = (user as { id?: string } | null)?.id;
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionActive, setSessionActive] = useState(false);
  const [sessionCompleted, setSessionCompleted] = useState(() => isSessionCompletedToday(userId, week));
  const [reviewedCardIds, setReviewedCardIds] = useState<Set<string>>(new Set());
  const [sessionCards, setSessionCards] = useState<RetentionReview[]>([]);
  const [activeRating, setActiveRating] = useState<number | null>(null);
  const [isCreatingReviews, setIsCreatingReviews] = useState(false);

  const { data: stats, isLoading: statsLoading } = useQuery<RetentionStats>({
    queryKey: ['/api/retention/stats', week, examTrack],
    queryFn: async () => {
      const res = await fetch(`/api/retention/stats?week=${week}&examTrack=${examTrack}`, { credentials: 'include' });
      if (!res.ok) throw new Error('Failed to fetch stats');
      return res.json();
    },
  });

  const { data: dueReviews = [], isLoading: reviewsLoading, refetch: refetchDue } = useQuery<RetentionReview[]>({
    queryKey: ['/api/retention/due', week, examTrack],
    queryFn: async () => {
      const res = await fetch(`/api/retention/due?week=${week}&examTrack=${examTrack}`, { credentials: 'include' });
      if (!res.ok) throw new Error('Failed to fetch due reviews');
      return res.json();
    },
  });

  const { data: weekReviews = [] } = useQuery<RetentionReview[]>({
    queryKey: ['/api/retention/reviews', week, examTrack],
    queryFn: async () => {
      const res = await fetch(`/api/retention/reviews?week=${week}&examTrack=${examTrack}`, { credentials: 'include' });
      if (!res.ok) throw new Error('Failed to fetch reviews');
      return res.json();
    },
  });

  const createReviewMutation = useMutation({
    mutationFn: async (data: { week: number; conceptId: string; conceptType: string; conceptText: string; domain: number; examTrack: string }) => {
      const response = await apiRequest('POST', '/api/retention/reviews', data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/retention/stats', week, examTrack] });
      queryClient.invalidateQueries({ queryKey: ['/api/retention/due', week, examTrack] });
      queryClient.invalidateQueries({ queryKey: ['/api/retention/reviews', week, examTrack] });
    },
  });

  const updateReviewMutation = useMutation({
    mutationFn: async ({ id, quality }: { id: string; quality: number }) => {
      const response = await apiRequest('PATCH', `/api/retention/reviews/${id}`, { quality });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Failed to update review (${response.status})`);
      }
      return response.json();
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['/api/retention/stats', week, examTrack] });
      await queryClient.invalidateQueries({ queryKey: ['/api/retention/stats', examTrack] });
      await queryClient.invalidateQueries({ queryKey: ['/api/retention/due', week, examTrack] });
      await queryClient.invalidateQueries({ queryKey: ['/api/retention/reviews', week, examTrack] });
      await queryClient.invalidateQueries({ queryKey: ['/api/xp'] });
      await queryClient.invalidateQueries({ queryKey: ['/api/progress/overall', examTrack] });
      await queryClient.invalidateQueries({ queryKey: ['/api/progress/domain-mastery'] });
      await queryClient.invalidateQueries({ predicate: (query) => 
        Array.isArray(query.queryKey) && query.queryKey[0] === '/api/daily-quests'
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Review Failed',
        description: error.message || 'Could not save your rating. Please try again.',
        variant: 'destructive',
      });
    },
  });

  // Helper to create fresh reviews for current user
  const createFreshReviews = useCallback(async () => {
    setIsCreatingReviews(true);
    try {
      const concepts = getConceptsForDomains(domains);
      for (const concept of concepts) {
        await createReviewMutation.mutateAsync({
          week,
          conceptId: concept.id,
          conceptType: concept.type,
          conceptText: concept.text,
          domain: concept.domain,
          examTrack,
        });
      }
      await queryClient.invalidateQueries({ queryKey: ['/api/retention/stats', week, examTrack] });
      await queryClient.invalidateQueries({ queryKey: ['/api/retention/due', week, examTrack] });
      await queryClient.invalidateQueries({ queryKey: ['/api/retention/reviews', week, examTrack] });
      return true;
    } catch (error) {
      console.error('[Retention] Error creating fresh reviews:', error);
      return false;
    } finally {
      setIsCreatingReviews(false);
    }
  }, [week, domains, examTrack, createReviewMutation, queryClient]);

  const initializeReviews = useCallback(async () => {
    const concepts = getConceptsForDomains(domains);
    for (const concept of concepts) {
      const exists = weekReviews.some(r => r.conceptId === concept.id);
      if (!exists) {
        await createReviewMutation.mutateAsync({
          week,
          conceptId: concept.id,
          conceptType: concept.type,
          conceptText: concept.text,
          domain: concept.domain,
          examTrack,
        });
      }
    }
    await refetchDue();
  }, [week, domains, examTrack, weekReviews, createReviewMutation, refetchDue]);

  const startSession = useCallback(async () => {
    // Refetch to ensure we have fresh data
    const { data: freshReviews } = await refetchDue();
    let reviewsToUse = freshReviews || dueReviews;
    
    if (reviewsToUse && reviewsToUse.length > 0 && userId) {
      const foreignReviews = reviewsToUse.filter(r => r.userId !== userId);
      if (foreignReviews.length > 0) {
        console.warn('[Retention] Detected reviews from different user:', 
          foreignReviews.map(r => ({ id: r.id, userId: r.userId })));
        
        // Filter out foreign reviews - only use current user's reviews
        const ownReviews = reviewsToUse.filter(r => r.userId === userId);
        
        if (ownReviews.length === 0) {
          // No reviews for current user - create fresh ones
          toast({
            title: 'Setting up your reviews',
            description: 'Creating fresh review cards for you...',
          });
          
          const success = await createFreshReviews();
          if (success) {
            // Refetch after creation
            const { data: newReviews } = await refetchDue();
            reviewsToUse = newReviews || [];
          } else {
            toast({
              title: 'Setup failed',
              description: 'Could not create reviews. Please try again.',
              variant: 'destructive',
            });
            return;
          }
        } else {
          reviewsToUse = ownReviews;
        }
      }
    }
    
    if (!reviewsToUse || reviewsToUse.length === 0) {
      toast({
        title: 'No reviews available',
        description: 'Please add concepts first or check back later.',
        variant: 'destructive',
      });
      return;
    }
    
    console.log('[Retention] Starting session with reviews:', reviewsToUse.map(r => ({ id: r.id, conceptId: r.conceptId, userId: r.userId })));
    
    setSessionCards([...reviewsToUse]);
    setReviewedCardIds(new Set());
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setSessionCompleted(false);
    setSessionActive(true);
  }, [dueReviews, refetchDue, toast, userId, createFreshReviews]);

  const awardXpMutation = useMutation({
    mutationFn: async (data: { amount: number; reason: string; activityKey: string }) => {
      const res = await apiRequest('POST', '/api/xp/award', data);
      return res.json() as Promise<{ xp: number; level: number; leveledUp: boolean; awarded: boolean; reason: string }>;
    },
    onSuccess: (data) => {
      if (data.awarded) {
        queryClient.invalidateQueries({ queryKey: ['/api/xp'] });
      }
    },
  });

  const handleQualityRating = useCallback(async (quality: number) => {
    if (sessionCards.length > 0 && currentCardIndex < sessionCards.length) {
      const review = sessionCards[currentCardIndex];
      
      // Validate review has a proper ID before proceeding
      if (!review.id || typeof review.id !== 'string' || review.id.length < 10) {
        console.error('[Retention] Invalid review ID:', review.id, review);
        toast({
          title: 'Review Error',
          description: 'Invalid review data. Please restart the session.',
          variant: 'destructive',
        });
        setSessionActive(false);
        return;
      }
      
      console.log('[Retention] Rating card:', { id: review.id, conceptId: review.conceptId, quality });
      setActiveRating(quality);
      
      try {
        await updateReviewMutation.mutateAsync({ id: review.id, quality });
        
        // Award XP with backend idempotency (activity key prevents duplicate awards)
        awardXpMutation.mutate({ 
          amount: XP_AWARDS.REINFORCE_REVIEW, 
          reason: 'Retention card reviewed',
          activityKey: `reinforce:review:${review.id}`
        });
        
        setReviewedCardIds(prev => { const newSet = new Set(prev); newSet.add(review.id); return newSet; });
        
        const isLastCard = currentCardIndex >= sessionCards.length - 1;
        
        if (!isLastCard) {
          setCurrentCardIndex(prev => prev + 1);
          setIsFlipped(false);
        } else {
          toast({ 
            title: `+${XP_AWARDS.REINFORCE_REVIEW * sessionCards.length} XP`, 
            description: `Session complete! ${sessionCards.length} cards reviewed.` 
          });
          setSessionActive(false);
          setSessionCompleted(true);
          markSessionCompletedToday(userId, week);
          setSessionCards([]);
          setReviewedCardIds(new Set());
          setCurrentCardIndex(0);
          await queryClient.invalidateQueries({ queryKey: ['/api/retention/stats', week, examTrack] });
          await queryClient.invalidateQueries({ queryKey: ['/api/retention/due', week, examTrack] });
          await queryClient.invalidateQueries({ queryKey: ['/api/retention/reviews', week, examTrack] });
        }
      } catch (error: any) {
        console.error('Rating submission failed:', error);
        
        // Handle 403 (unauthorized) - this means reviews belong to different user
        // Auto-recover by creating fresh reviews and restarting session
        if (error?.message?.includes('403') || error?.message?.includes('Not authorized')) {
          toast({
            title: 'Session Reset',
            description: 'Creating fresh review cards for you...',
          });
          
          // End current session and create fresh reviews
          setSessionActive(false);
          setSessionCards([]);
          setCurrentCardIndex(0);
          
          const success = await createFreshReviews();
          if (success) {
            toast({
              title: 'Ready to review',
              description: 'New review cards created. Click "Start Review Session" to begin.',
            });
          }
        }
        // Other errors are handled by mutation onError
      } finally {
        setActiveRating(null);
      }
    }
  }, [sessionCards, currentCardIndex, updateReviewMutation, awardXpMutation, toast, createFreshReviews]);

  const getDecayColor = (score: number): string => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    if (score >= 40) return 'text-orange-500';
    return 'text-red-500';
  };

  const getDecayBgColor = (score: number): string => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    if (score >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getMasteryLabel = (level: number): string => {
    const labels = ['New', 'Learning', 'Reviewing', 'Familiar', 'Proficient', 'Mastered'];
    return labels[Math.min(level, 5)] || 'New';
  };

  if (statsLoading || reviewsLoading) {
    return (
      <Card className="border-purple-200 dark:border-purple-800">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <RefreshCw className="h-4 w-4 animate-spin" />
            <span>Loading retention data...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  const retentionScore = stats?.retentionScore ?? 100;
  const dueCount = stats?.dueToday ?? 0;
  const totalReviews = stats?.totalReviews ?? 0;
  const avgMastery = stats?.averageMastery ?? 0;

  return (
    <Card className="border-purple-200 dark:border-purple-800 bg-purple-50/50 dark:bg-purple-950/20">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            <CardTitle className="text-lg">Retention Booster</CardTitle>
          </div>
          <Badge variant="outline" className="text-purple-600 dark:text-purple-400 border-purple-300 dark:border-purple-700">
            {dueCount} due
          </Badge>
        </div>
        <CardDescription>
          Spaced repetition to reinforce key concepts
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-2 rounded-md bg-background/50">
            <div className={`text-2xl font-bold ${getDecayColor(retentionScore)}`}>
              {retentionScore}%
            </div>
            <div className="text-xs text-muted-foreground">Retention</div>
          </div>
          <div className="text-center p-2 rounded-md bg-background/50">
            <div className="text-2xl font-bold">{totalReviews}</div>
            <div className="text-xs text-muted-foreground">Cards</div>
          </div>
          <div className="text-center p-2 rounded-md bg-background/50">
            <div className="text-2xl font-bold">{avgMastery.toFixed(1)}</div>
            <div className="text-xs text-muted-foreground">Avg Level</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Decay Meter</span>
            <span className={getDecayColor(retentionScore)}>
              {retentionScore >= 80 ? 'Strong' : retentionScore >= 60 ? 'Fading' : retentionScore >= 40 ? 'Weak' : 'Critical'}
            </span>
          </div>
          <Progress 
            value={retentionScore} 
            className="h-3"
            style={{ 
              ['--progress-background' as string]: retentionScore >= 80 ? 'rgb(34 197 94)' : 
                retentionScore >= 60 ? 'rgb(234 179 8)' : 
                retentionScore >= 40 ? 'rgb(249 115 22)' : 'rgb(239 68 68)'
            }}
          />
        </div>

        {!sessionActive ? (
          <div className="space-y-3">
            {sessionCompleted ? (
              <div className="flex items-center gap-2 p-3 rounded-md bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm">Session complete! All concepts reviewed. Check back later.</span>
              </div>
            ) : dueCount > 0 ? (
              <>
                <div className="flex items-center gap-2 p-3 rounded-md bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="text-sm">{dueCount} concept{dueCount > 1 ? 's' : ''} need review</span>
                </div>
                <Button 
                  onClick={startSession}
                  className="w-full"
                  data-testid="button-start-review"
                >
                  <Brain className="h-4 w-4 mr-2" />
                  Start Review Session
                </Button>
              </>
            ) : totalReviews === 0 ? (
              <Button 
                onClick={initializeReviews}
                className="w-full"
                variant="outline"
                disabled={createReviewMutation.isPending}
                data-testid="button-add-concepts"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                {createReviewMutation.isPending ? 'Adding concepts...' : 'Add Week Concepts'}
              </Button>
            ) : (
              <div className="flex items-center gap-2 p-3 rounded-md bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm">All caught up! Check back later.</span>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {sessionCards.length > 0 && currentCardIndex < sessionCards.length ? (
              <>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Card {currentCardIndex + 1} of {sessionCards.length}</span>
                  <Badge variant="secondary" className="text-xs">
                    {getMasteryLabel(sessionCards[currentCardIndex].masteryLevel)}
                  </Badge>
                </div>

                <div 
                  className="min-h-[120px] p-4 rounded-lg border bg-card cursor-pointer transition-all hover-elevate"
                  onClick={() => setIsFlipped(!isFlipped)}
                  data-testid="card-concept-flip"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs">
                      {sessionCards[currentCardIndex].conceptType}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Domain {sessionCards[currentCardIndex].domain}
                    </Badge>
                  </div>
                  <p className="text-sm leading-relaxed">
                    {sessionCards[currentCardIndex].conceptText}
                  </p>
                  {!isFlipped && (
                    <p className="text-xs text-muted-foreground mt-3 text-center">
                      Click to reveal, then rate your recall
                    </p>
                  )}
                </div>

                {isFlipped && (
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground text-center">How well did you remember?</p>
                    <div className="grid grid-cols-4 gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-col h-auto py-2 border-red-300 dark:border-red-700 text-red-600 dark:text-red-400"
                        onClick={() => handleQualityRating(1)}
                        disabled={activeRating !== null}
                        data-testid="button-rating-forgot"
                      >
                        {activeRating === 1 ? (
                          <Loader2 className="h-4 w-4 mb-1 animate-spin" />
                        ) : (
                          <XCircle className="h-4 w-4 mb-1" />
                        )}
                        <span className="text-xs">Forgot</span>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-col h-auto py-2 border-orange-300 dark:border-orange-700 text-orange-600 dark:text-orange-400"
                        onClick={() => handleQualityRating(2)}
                        disabled={activeRating !== null}
                        data-testid="button-rating-hard"
                      >
                        {activeRating === 2 ? (
                          <Loader2 className="h-4 w-4 mb-1 animate-spin" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 mb-1" />
                        )}
                        <span className="text-xs">Hard</span>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-col h-auto py-2 border-yellow-300 dark:border-yellow-700 text-yellow-600 dark:text-yellow-400"
                        onClick={() => handleQualityRating(3)}
                        disabled={activeRating !== null}
                        data-testid="button-rating-good"
                      >
                        {activeRating === 3 ? (
                          <Loader2 className="h-4 w-4 mb-1 animate-spin" />
                        ) : (
                          <Timer className="h-4 w-4 mb-1" />
                        )}
                        <span className="text-xs">Good</span>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-col h-auto py-2 border-green-300 dark:border-green-700 text-green-600 dark:text-green-400"
                        onClick={() => handleQualityRating(5)}
                        disabled={activeRating !== null}
                        data-testid="button-rating-easy"
                      >
                        {activeRating === 5 ? (
                          <Loader2 className="h-4 w-4 mb-1 animate-spin" />
                        ) : (
                          <CheckCircle className="h-4 w-4 mb-1" />
                        )}
                        <span className="text-xs">Easy</span>
                      </Button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-4">
                <CheckCircle className="h-8 w-8 mx-auto text-green-500 mb-2" />
                <p className="text-sm font-medium">Session Complete!</p>
                <p className="text-xs text-muted-foreground">Great job reinforcing your knowledge.</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
