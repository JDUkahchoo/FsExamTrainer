import type { ReadingModule } from '../schema';

export const STUDY_READINGS_PHOTOGRAMMETRY: ReadingModule[] = [
  {
    id: 'fs-d2-photogrammetry',
    examTrack: 'fs',
    domainNumber: 2,
    domain: 'Mapping, GIS, and CAD',
    title: 'Aerial Photogrammetry: Scale, Relief Displacement, and Flight Planning',
    description: 'Photogrammetry turns aerial photographs into maps and models. This reading covers the geometry of vertical aerial photography — photo scale, relief displacement, stereopair overlap, flight planning, and ground control — with the worked numeric examples most commonly tested on the FS exam.',
    estimatedMinutes: 22,
    sections: [
      {
        id: 'fs-d2-photo-s1',
        type: 'concept',
        title: 'Geometry of a Vertical Aerial Photograph',
        content: 'A vertical aerial photograph is taken with the camera pointed straight down. The optical axis of the camera is (ideally) perpendicular to the terrain below.\n\nKey reference points:\n• PRINCIPAL POINT (PP): The geometric center of the photograph — where the optical axis pierces the photo plane. It is marked on the photo by fiducial marks (tiny notches or crosses at the edges that are imaged during exposure).\n• NADIR: The point directly below the camera on the ground. In a truly vertical photo, nadir coincides with the principal point image.\n• ISOCENTER: Midpoint between principal point and nadir on a tilted photo (relevant for slightly tilted photos but usually ignored at introductory level).\n\nThe photograph is a central perspective projection. Every point on the photo is connected to the corresponding ground point by a straight ray through the camera lens center (perspective center / exposure station).\n\nKey parameters:\n• f = focal length of the camera lens (mm or m)\n• H = flying height of the aircraft above the datum (m or ft)\n• h = ground elevation above the datum at any given point (m or ft)\n• H\' = H − h = flying height above the ground (varies across the photo)\n\nBecause terrain varies in elevation, the effective flying height above ground H\' changes across the photo. This creates two closely related phenomena: photo scale variation and relief displacement.',
        bookRefs: [
          { book: 'Elementary Surveying (ES)', chapter: 'Chapter 27', topic: 'Photogrammetry — basic geometry and aerial photography' },
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic V, Ch 24', topic: 'Photogrammetry fundamentals' },
        ],
      },
      {
        id: 'fs-d2-photo-s2',
        type: 'formula',
        title: 'Photo Scale Formula: S = f / (H − h)',
        formula: {
          expression: 'S = f / (H − h)',
          variables: [
            { symbol: 'S', description: 'Photo scale (expressed as 1:N or as a fraction). S = 1/N, where N is the scale number.' },
            { symbol: 'f', description: 'Camera focal length (use same units as H and h — convert mm to m if needed)' },
            { symbol: 'H', description: 'Flying height of the aircraft above the reference datum (m or ft)' },
            { symbol: 'h', description: 'Ground elevation of the specific terrain point above the reference datum (m or ft)' },
            { symbol: 'H − h', description: 'Flying height above the local ground surface at that point (also written H\'). This is the key quantity — scale depends on how high the camera is above the terrain, not above sea level.' },
          ],
          whenToUse: 'Use this formula to: (1) find the photo scale at a known terrain elevation, (2) solve for the focal length or flying height given the desired scale, (3) check whether a flight plan will meet a specified mapping scale. Note: photo scale increases (gets larger / more zoomed in) when flying lower or using a longer focal length.',
        },
        bookRefs: [
          { book: 'Elementary Surveying (ES)', chapter: 'Chapter 27', topic: 'Photo scale formula' },
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic V, Ch 24', topic: 'Photo scale and flying height' },
        ],
      },
      {
        id: 'fs-d2-photo-s3',
        type: 'worked_example',
        title: 'Photo Scale Calculation',
        workedExample: {
          problem: 'An aerial camera has a focal length of 152 mm. The aircraft flies at H = 3,800 m above mean sea level. The terrain being photographed has an average elevation of h = 300 m above MSL. (a) What is the photo scale at average terrain? (b) What ground distance corresponds to a 90 mm measurement on the photograph?',
          steps: [
            { step: 1, description: 'Compute the flying height above the terrain.', calculation: 'H\' = H − h = 3,800 − 300 = 3,500 m' },
            { step: 2, description: 'Convert focal length to meters.', calculation: 'f = 152 mm = 0.152 m' },
            { step: 3, description: 'Compute photo scale.', calculation: 'S = f / H\' = 0.152 / 3,500 = 1/23,026 ≈ 1:23,000' },
            { step: 4, description: 'Find the ground distance for a 90 mm photo measurement.', calculation: 'Ground distance = photo distance / S = 0.090 m × 23,026 = 2,072 m ≈ 2.07 km' },
          ],
          answer: 'Photo scale ≈ 1:23,000. A 90 mm measurement on the photo represents approximately 2,072 m (2.07 km) on the ground. Note: a larger scale number means more ground per photo mm.',
        },
      },
      {
        id: 'fs-d2-photo-s4',
        type: 'concept',
        title: 'Relief Displacement: Why Tall Objects Lean Outward',
        content: 'Because an aerial photo is a central perspective (not an orthographic) projection, the tops of tall objects are displaced outward from the principal point relative to their bases. This effect is called relief displacement.\n\nWhy it happens:\n• The camera sees the top of a building from one angle and the base from a slightly different angle — both through the same perspective center.\n• The top of the object is closer to the camera (lower H\'), so it projects to a position on the photo that is radially farther from the principal point than the base.\n• Result: a 30 m tall building does not appear as a dot — its top is displaced outward (away from PP), making the building appear to "lean away" from the center of the photo.\n\nProperties of relief displacement:\n• Direction: always radially outward from the principal point.\n• Magnitude increases with: (1) greater object height h, (2) greater radial distance r from PP, (3) lower flying height H.\n• Objects AT the principal point have zero relief displacement (they are directly below the camera).\n• Objects at the edge of the photo have the most relief displacement.\n\nPractical impact:\n• Relief displacement causes planimetric error — the top of a building or tree is displaced from its true planimetric position.\n• Orthophoto production corrects for relief displacement using a digital surface model (DSM) or digital elevation model (DEM) — this is called differential rectification.\n• In stereophotogrammetry, relief displacement is actually exploited to measure heights (parallax difference between stereopairs tells you the height of objects).',
        bookRefs: [
          { book: 'Elementary Surveying (ES)', chapter: 'Chapter 27', topic: 'Relief displacement' },
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic V, Ch 24', topic: 'Relief displacement formula and effects' },
        ],
      },
      {
        id: 'fs-d2-photo-s5',
        type: 'formula',
        title: 'Relief Displacement Formula: d = rh / H',
        formula: {
          expression: 'd = r h / H',
          variables: [
            { symbol: 'd', description: 'Relief displacement on the photo (mm or same units as r). This is how far the top of the object is displaced from where it would appear if it had no height.' },
            { symbol: 'r', description: 'Radial distance on the photo from the principal point to the image of the TOP of the object (mm). The farther from center, the more displacement.' },
            { symbol: 'h', description: 'Height of the object above its base (m or ft — must match H units). The taller the object, the more displacement.' },
            { symbol: 'H', description: 'Flying height of the aircraft above the BASE of the object (m or ft). Higher flight = less displacement.' },
          ],
          whenToUse: 'Use this formula to: (1) compute how much a building or tree top is displaced on the photo, (2) back-calculate the height of an object from its measured displacement (rearranged: h = dH/r), (3) understand why relief displacement is greatest at photo edges and zero at the principal point.',
        },
        bookRefs: [
          { book: 'Elementary Surveying (ES)', chapter: 'Chapter 27', topic: 'Relief displacement formula' },
        ],
      },
      {
        id: 'fs-d2-photo-s6',
        type: 'worked_example',
        title: 'Relief Displacement Calculation',
        workedExample: {
          problem: 'A water tower is 60 m tall. On the aerial photo, the image of the top of the tower is 90 mm from the principal point. The flying height above the base of the tower is 3,000 m. (a) How much is the top of the tower displaced on the photo? (b) How could you use this displacement to compute the tower height if it were unknown?',
          steps: [
            { step: 1, description: 'Apply the relief displacement formula.', calculation: 'd = r × h / H = 90 × 60 / 3,000 = 5,400 / 3,000 = 1.80 mm' },
            { step: 2, description: 'Interpret the result.', calculation: 'The top of the tower appears 1.80 mm farther from the PP on the photo than the base of the tower.' },
            { step: 3, description: 'Rearrange to solve for unknown height (part b).', calculation: 'h = d × H / r = 1.80 × 3,000 / 90 = 5,400 / 90 = 60 m ✓' },
          ],
          answer: 'Relief displacement = 1.80 mm. The top of the 60 m tower is displaced 1.80 mm outward from the principal point relative to the base. If the height were unknown, measuring d = 1.80 mm and r = 90 mm at flying height H = 3,000 m gives h = dH/r = 60 m.',
        },
      },
      {
        id: 'fs-d2-photo-kc1',
        type: 'knowledge_check',
        title: 'Photo Scale and Relief Displacement Check',
        knowledgeCheck: {
          question: 'A camera with f = 150 mm flies at H = 4,500 m over terrain at h = 500 m elevation. A building top is 75 mm from the principal point on the photo. The building is 45 m tall. Which set of answers is correct for (i) photo scale and (ii) relief displacement?',
          options: [
            'Scale ≈ 1:26,667; displacement = 0.844 mm — [H\' = 4,500−500 = 4,000 m; S = 0.150/4,000 = 1:26,667; d = 75×45/4,000 = 0.844 mm]',
            'Scale ≈ 1:30,000; displacement = 0.750 mm — [uses H not H\' for scale]',
            'Scale ≈ 1:26,667; displacement = 1.013 mm — [uses H−h for d denominator incorrectly]',
            'Scale ≈ 1:20,000; displacement = 0.844 mm — [wrong focal length conversion]',
          ],
          correctIndex: 0,
          explanation: 'H\' = H − h = 4,500 − 500 = 4,000 m. Scale = f/H\' = 0.150/4,000 = 1/26,667 ≈ 1:26,700. For displacement, use H = flying height above the BASE of the object (terrain elevation + any offset, but typically we treat H as the flying height above the ground = H\' = 4,000 m here): d = rh/H = 75 × 45 / 4,000 = 3,375/4,000 = 0.844 mm.',
        },
      },
      {
        id: 'fs-d2-photo-s7',
        type: 'concept',
        title: 'Stereopair Overlap: Endlap and Sidelap Standards',
        content: 'A single aerial photo is a central perspective — it cannot be used for elevation measurement without additional information. To enable stereo viewing and photogrammetric elevation extraction, adjacent photos must overlap so that every ground point appears in at least two photos from different camera positions.\n\nENDLAP (forward overlap — along the flight strip):\n• Standard: 60% minimum. Each successive photo overlaps the previous one by 60%.\n• Net advance between exposures = 40% of the ground coverage per photo.\n• Why 60%? It ensures that the entire strip can be covered in stereo with a comfortable margin for aircraft tilt and terrain variation.\n• High-accuracy work or mountainous terrain may require 70–80% endlap.\n\nSIDELAP (lateral overlap — between adjacent strips):\n• Standard: 30% minimum. Adjacent parallel strips overlap each other by 30%.\n• Purpose: ensures complete coverage between strips (no "data voids") and provides additional redundancy for aerial triangulation.\n• Sidelap is less critical for stereo viewing but important for photogrammetric block adjustment.\n\nWhy overlap matters:\n• Stereoscopic coverage requires every ground point to appear in at least TWO adjacent photos.\n• 60% endlap means the usable stereo model area is the central 40% of each photo.\n• Photogrammetric software uses the overlapping imagery to perform aerial triangulation (bundle adjustment), computing exterior orientation of every photo simultaneously.\n\nMemory aid: 60/30 — "sixty percent forward, thirty side."',
        bookRefs: [
          { book: 'Elementary Surveying (ES)', chapter: 'Chapter 27', topic: 'Flight planning and stereopair overlap' },
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic V, Ch 24', topic: 'Overlap standards for aerial photography' },
        ],
      },
      {
        id: 'fs-d2-photo-s8',
        type: 'concept',
        title: 'Flight Planning: Number of Photos and Strips',
        content: 'Flight planning determines the geometry of the photo mission to ensure complete, stereoscopic coverage of the project area at the required scale.\n\nKEY VARIABLES:\n• f = focal length (mm)\n• H\' = flying height above terrain (m or ft)\n• S = photo scale = f/H\'\n• Format = photo size (typically 230 mm × 230 mm for film; varies for digital)\n• Endlap (p) = forward overlap fraction (0.60 standard)\n• Sidelap (q) = side overlap fraction (0.30 standard)\n\nGROUND COVERAGE PER PHOTO:\n• Along-strip: Pb = Format × (1/S) (convert format to ground units)\n• Cross-strip: Pw = same formula in the other direction (for square format, same value)\n\nNET ADVANCE BETWEEN EXPOSURES (air base B):\n• B = Pb × (1 − p) (endlap fraction remaining)\n\nNUMBER OF PHOTOS IN ONE STRIP:\n• N_photos = (Strip length / B) + 1, then round up\n• Add 1–2 extra exposures at each end for coverage buffer\n\nNUMBER OF STRIPS:\n• N_strips = (Project width / (Pw × (1−q))) + 1, then round up\n\nTOTAL PHOTOS ≈ N_photos × N_strips\n\nExample (rough numbers):\n• f = 150 mm, H\' = 3,000 m → S = 1:20,000\n• 230 mm format → ground coverage = 230 mm × 20,000 = 4,600 m per photo\n• B = 4,600 × (1 − 0.60) = 1,840 m net advance\n• Strip length = 20 km → N = 20,000/1,840 + 1 ≈ 10.87 + 1 → 12 photos per strip\n• Strip spacing = 4,600 × (1 − 0.30) = 3,220 m\n• Project width = 16 km → strips = 16,000/3,220 + 1 ≈ 5.97 → 6 strips\n• Total photos ≈ 12 × 6 = 72 photos',
        bookRefs: [
          { book: 'Elementary Surveying (ES)', chapter: 'Chapter 27', topic: 'Flight planning calculations' },
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic V, Ch 24', topic: 'Number of photos and strips' },
        ],
      },
      {
        id: 'fs-d2-photo-s9',
        type: 'concept',
        title: 'Ground Control for Photogrammetric Mapping',
        content: 'Aerial triangulation (bundle adjustment) ties the entire photo block to the ground using ground control points (GCPs) — surveyed points that appear on the photos and have precisely known ground coordinates.\n\nGCP requirements:\n• Horizontal GCPs: Provide X,Y position tie to the datum (NAD 83).\n• Vertical GCPs: Provide elevation tie to NAVD 88.\n• Full control points: Known in all three dimensions (X, Y, Z).\n\nMinimum requirements (traditional film era):\n• A minimum of 4 non-collinear GCPs to solve for the 6 exterior orientation parameters (3 position + 3 rotation) of any single photo.\n• For a block: generally 1 full control point per 4–6 photos (rough rule), placed at the perimeter of the block.\n\nModern workflow with GPS-IMU:\n• Direct georeferencing using GPS-assisted aerial triangulation (GNSS receivers in the aircraft recording precise camera position at exposure).\n• With GPS-IMU, as few as 4–6 GCPs for the entire block may be sufficient for verification.\n• Still recommended: GCPs at block corners and center for quality control.\n\nDigital workflow — Photogrammetric software (Agisoft Metashape, Pix4D, etc.):\n• Uses Structure from Motion (SfM) or traditional bundle adjustment.\n• GCPs are marked on photos interactively and used to refine and constrain the bundle solution.\n• Check points (independent of GCPs) are used to assess absolute accuracy after adjustment.',
        bookRefs: [
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic V, Ch 24', topic: 'Ground control for photogrammetric mapping' },
          { book: 'Elementary Surveying (ES)', chapter: 'Chapter 27', topic: 'Aerial triangulation and ground control' },
        ],
      },
      {
        id: 'fs-d2-photo-kc2',
        type: 'knowledge_check',
        title: 'Flight Planning Check',
        knowledgeCheck: {
          question: 'A camera with f = 150 mm and a 230 mm × 230 mm format flies at H\' = 3,000 m above terrain (scale = 1:20,000). Standard endlap is 60%. How many photos are needed to cover a 15 km strip (not counting end-of-strip buffers)?',
          options: [
            '10 photos — [ground coverage = 4,600 m; net advance = 1,840 m; N = 15,000/1,840 + 1 = 9.15 → round up to 10]',
            '8 photos — [net advance = 60% × 4,600 m; N = 15,000/2,760 + 1 = 6.4 → 7... not right]',
            '14 photos — [uses 40% advance incorrectly as base]',
            '6 photos — [uses full 4,600 m as advance, ignoring overlap]',
          ],
          correctIndex: 0,
          explanation: 'Scale = 1:20,000. Ground coverage per photo = 230 mm × 20,000 = 4,600 m. Net advance B = 4,600 × (1 − 0.60) = 4,600 × 0.40 = 1,840 m. Number of photos = 15,000/1,840 + 1 = 8.15 + 1 = 9.15 → round up to 10 photos. The "+1" accounts for the first photo covering the start of the strip before any advance.',
        },
      },
      {
        id: 'fs-d2-photo-tips',
        type: 'exam_tips',
        title: 'Exam Tips: Photogrammetry',
        examTips: [
          'Photo scale formula: S = f/(H−h). Always subtract terrain elevation from flying height to get H\'. A common trap is using H instead of H−h.',
          'Relief displacement: d = rh/H. Direction is always OUTWARD from the principal point. Objects at the PP have zero displacement.',
          'To find object height from displacement: h = dH/r (rearrange the formula).',
          'Endlap = 60% forward (along flight strip). Sidelap = 30% lateral (between strips). Remember "60/30."',
          'Net advance per exposure = photo ground coverage × (1 − endlap). For 60% endlap: 40% of coverage = the base between exposures.',
          'Number of photos in a strip = (strip length / net advance) + 1, then round UP. Always add the "+1" for the first photo.',
          'Larger focal length → larger scale (more zoomed in). Lower flying height → larger scale. Both follow from S = f/(H−h).',
          'Relief displacement increases toward the edges of the photo and is zero exactly at the principal point.',
        ],
      },
      {
        id: 'fs-d2-photo-further',
        type: 'further_reading',
        title: 'Photogrammetry References',
        furtherReading: [
          { book: 'Elementary Surveying: An Introduction to Geomatics (Ghilani & Wolf)', chapter: 'Chapter 27', topic: 'Aerial photogrammetry — photo scale, relief displacement, and flight planning' },
          { book: 'Surveyor Reference Manual (SRM)', chapter: 'Topic V, Chapter 24', topic: 'Photogrammetry fundamentals for the FS exam' },
          { book: 'Manual of Photogrammetry (ASPRS)', chapter: 'Chapters 1–3', topic: 'Rigorous treatment of photo geometry and aerial triangulation' },
        ],
      },
    ],
  },
];
