import type { QuizQuestion } from './quizQuestions';

function seededRandom(seed: number) {
  return function() {
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

function pickFromArray<T>(arr: T[], rng: () => number): T {
  return arr[Math.floor(rng() * arr.length)];
}

function shuffleArray<T>(arr: T[], rng: () => number): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

interface ComputationalVariation {
  type: 'computational';
  stemTemplate: string;
  paramRanges: Record<string, number[]>;
  computeAnswer: (params: Record<string, number>) => string;
  computeDistractors: (params: Record<string, number>, answer: string) => string[];
  computeExplanation: (params: Record<string, number>, answer: string) => string;
}

interface StemVariation {
  type: 'stem';
  stems: string[];
}

type VariationDef = ComputationalVariation | StemVariation;

const R = (min: number, max: number, step: number = 1): number[] => {
  const arr: number[] = [];
  for (let v = min; v <= max; v += step) arr.push(Number(v.toFixed(4)));
  return arr;
};

const fsVariationDefs: Record<number, VariationDef> = {
  1: {
    type: 'computational',
    stemTemplate: 'The standard deviation of a sample is {sd} ft. What is the 95% confidence interval (approx. 2σ)?',
    paramRanges: { sd: [0.02, 0.03, 0.04, 0.05, 0.06, 0.07, 0.08, 0.10, 0.12, 0.15, 0.20, 0.25] },
    computeAnswer: (p) => `±${(p.sd * 2).toFixed(2)} ft`,
    computeDistractors: (p) => [`±${p.sd.toFixed(2)} ft`, `±${(p.sd * 3).toFixed(2)} ft`, `±${(p.sd / 2).toFixed(3)} ft`],
    computeExplanation: (p, a) => `The 95% confidence interval is approximately ±2σ. 2 × ${p.sd.toFixed(2)} ft = ${a}.`
  },
  4: {
    type: 'computational',
    stemTemplate: 'For differential leveling, if the backsight (BS) = {bs} ft and foresight (FS) = {fs} ft, what is the change in elevation?',
    paramRanges: { bs: [3.45, 4.12, 5.23, 6.78, 7.34, 8.91, 2.56, 9.15, 4.67, 3.89], fs: [1.67, 2.18, 3.05, 4.56, 5.89, 6.23, 1.12, 7.45, 2.34, 8.02] },
    computeAnswer: (p) => { const d = p.bs - p.fs; return d >= 0 ? `+${d.toFixed(2)} ft (rise)` : `${d.toFixed(2)} ft (fall)`; },
    computeDistractors: (p, a) => { const d = p.bs - p.fs; const s = p.bs + p.fs; return [d >= 0 ? `${(-d).toFixed(2)} ft (fall)` : `+${(-d).toFixed(2)} ft (rise)`, `+${s.toFixed(2)} ft`, `${(-s).toFixed(2)} ft`]; },
    computeExplanation: (p, a) => `Change in elevation = BS - FS = ${p.bs.toFixed(2)} - ${p.fs.toFixed(2)} = ${a}. Positive = rise.`
  },
  9: {
    type: 'stem',
    stems: [
      'In photogrammetry, the scale of a vertical aerial photo is calculated as:',
      'The photo scale of a vertical aerial photograph is given by:',
      'For a vertical aerial photo, which formula determines its scale?',
      'Which expression correctly calculates the scale of a vertical aerial photograph?',
      'A vertical aerial photograph\'s scale is computed using:'
    ]
  },
  21: {
    type: 'computational',
    stemTemplate: 'What is the error of closure for a traverse with ΣLat = +{lat} ft and ΣDep = -{dep} ft?',
    paramRanges: { lat: [0.03, 0.04, 0.05, 0.06, 0.08, 0.10, 0.12, 0.15], dep: [0.03, 0.04, 0.05, 0.06, 0.07, 0.08, 0.09, 0.10] },
    computeAnswer: (p) => `${Math.sqrt(p.lat * p.lat + p.dep * p.dep).toFixed(2)} ft`,
    computeDistractors: (p, a) => { const v = parseFloat(a); return [`${(p.lat + p.dep).toFixed(2)} ft`, `${Math.abs(p.lat - p.dep).toFixed(2)} ft`, `${(v * 1.5).toFixed(2)} ft`]; },
    computeExplanation: (p, a) => `Error of closure = √((ΣLat)² + (ΣDep)²) = √(${p.lat}² + ${p.dep}²) = ${a}.`
  },
  22: {
    type: 'computational',
    stemTemplate: 'Convert {deg}° {min}\' {sec}" to decimal degrees:',
    paramRanges: { deg: R(10, 80, 5), min: [10, 15, 20, 25, 30, 35, 40, 45, 50], sec: [0, 10, 15, 20, 30, 36, 45, 50] },
    computeAnswer: (p) => `${(p.deg + p.min / 60 + p.sec / 3600).toFixed(4)}°`,
    computeDistractors: (p, a) => { const v = parseFloat(a); return [`${(v + 0.05).toFixed(4)}°`, `${(v - 0.03).toFixed(4)}°`, `${(p.deg + p.min / 100 + p.sec / 10000).toFixed(4)}°`]; },
    computeExplanation: (p, a) => `${p.deg}° + (${p.min}/60)° + (${p.sec}/3600)° = ${a}`
  },
  23: {
    type: 'computational',
    stemTemplate: 'The relative precision of a traverse with perimeter {perim} ft and error of closure {err} ft is:',
    paramRanges: { perim: [1200, 1800, 2400, 3000, 3600, 4200, 5000, 6000], err: [0.06, 0.08, 0.10, 0.12, 0.15, 0.20, 0.24, 0.30] },
    computeAnswer: (p) => `1:${Math.round(p.perim / p.err).toLocaleString()}`,
    computeDistractors: (p, a) => { const ratio = Math.round(p.perim / p.err); return [`1:${Math.round(ratio / 10).toLocaleString()}`, `1:${Math.round(ratio * 2).toLocaleString()}`, `1:${Math.round(ratio / 2).toLocaleString()}`]; },
    computeExplanation: (p, a) => `Relative precision = Perimeter / Error = ${p.perim} / ${p.err} = ${a}`
  },
  25: {
    type: 'computational',
    stemTemplate: 'The ppm (parts per million) correction for a {dist} ft distance measured with a +{ppm} ppm systematic error is:',
    paramRanges: { dist: [200, 300, 400, 500, 600, 800, 1000, 1500], ppm: [2, 3, 4, 5, 6, 8, 10] },
    computeAnswer: (p) => `+${(p.dist * p.ppm / 1000000).toFixed(4)} ft`,
    computeDistractors: (p) => [`+${(p.dist * p.ppm / 100000).toFixed(4)} ft`, `+${(p.dist * p.ppm / 10000000).toFixed(5)} ft`, `+${(p.dist * p.ppm / 10000).toFixed(3)} ft`],
    computeExplanation: (p, a) => `Correction = Distance × (ppm/1,000,000) = ${p.dist} × (${p.ppm}/1,000,000) = ${a}`
  },
  27: {
    type: 'computational',
    stemTemplate: 'In differential leveling, if HI (Height of Instrument) = {hi} ft and FS (Foresight) = {fs} ft, what is the elevation of the point?',
    paramRanges: { hi: [425.50, 438.72, 453.25, 467.15, 512.83, 528.40, 542.83, 575.60], fs: [2.45, 3.18, 4.21, 4.82, 5.37, 6.14, 7.05, 8.23] },
    computeAnswer: (p) => `${(p.hi - p.fs).toFixed(2)} ft`,
    computeDistractors: (p) => { const a = p.hi - p.fs; return [`${(p.hi + p.fs).toFixed(2)} ft`, `${p.hi.toFixed(2)} ft`, `${(a + 1).toFixed(2)} ft`]; },
    computeExplanation: (p, a) => `Elevation = HI - FS = ${p.hi.toFixed(2)} - ${p.fs.toFixed(2)} = ${a}`
  },
  30: {
    type: 'computational',
    stemTemplate: 'The Departure of a {dist} ft line with azimuth {az}° is:',
    paramRanges: { dist: [100, 150, 200, 250, 300, 350, 400, 500], az: [30, 45, 60, 120, 135, 150, 210, 225, 240, 300, 315, 330] },
    computeAnswer: (p) => { const dep = p.dist * Math.sin(p.az * Math.PI / 180); return `${dep >= 0 ? '+' : ''}${dep.toFixed(2)} ft`; },
    computeDistractors: (p) => {
      const dep = p.dist * Math.sin(p.az * Math.PI / 180);
      const lat = p.dist * Math.cos(p.az * Math.PI / 180);
      return [`${lat >= 0 ? '+' : ''}${lat.toFixed(2)} ft`, `${(-dep).toFixed(2)} ft`, `+${p.dist.toFixed(2)} ft`];
    },
    computeExplanation: (p, a) => `Departure = Distance × sin(Azimuth) = ${p.dist} × sin(${p.az}°) = ${a}`
  },
  31: {
    type: 'computational',
    stemTemplate: 'A simple horizontal curve has a radius of {r} ft and a central angle of {delta}°. What is the length of the curve?',
    paramRanges: { r: [300, 400, 500, 600, 750, 800, 1000, 1200], delta: [20, 30, 45, 50, 60, 72, 80, 90] },
    computeAnswer: (p) => `${(p.delta / 360 * 2 * Math.PI * p.r).toFixed(2)} ft`,
    computeDistractors: (p) => {
      const L = p.delta / 360 * 2 * Math.PI * p.r;
      return [`${p.r.toFixed(2)} ft`, `${(L * 0.6).toFixed(2)} ft`, `${(L * 1.4).toFixed(2)} ft`];
    },
    computeExplanation: (p, a) => `L = (Δ/360°) × 2πR = (${p.delta}°/360°) × 2π(${p.r}) = ${a}. Or use L = RΔ (in radians).`
  },
  33: {
    type: 'computational',
    stemTemplate: 'In coordinate geometry, if Point A is at ({ax}, {ay}) and Point B is at ({bx}, {by}), the distance AB is:',
    paramRanges: { ax: [500, 750, 1000, 1200, 1500], ay: [1000, 1500, 2000, 2500, 3000], bx: [600, 800, 1300, 1400, 1800], by: [1200, 1800, 2400, 2800, 3500] },
    computeAnswer: (p) => { const d = Math.sqrt(Math.pow(p.bx - p.ax, 2) + Math.pow(p.by - p.ay, 2)); return `${d.toFixed(2)} ft`; },
    computeDistractors: (p) => {
      const d = Math.sqrt(Math.pow(p.bx - p.ax, 2) + Math.pow(p.by - p.ay, 2));
      return [`${(d * 0.85).toFixed(2)} ft`, `${(d * 1.15).toFixed(2)} ft`, `${(Math.abs(p.bx - p.ax) + Math.abs(p.by - p.ay)).toFixed(2)} ft`];
    },
    computeExplanation: (p, a) => `Distance = √[(ΔE)² + (ΔN)²] = √[(${p.bx}-${p.ax})² + (${p.by}-${p.ay})²] = ${a}`
  },
  34: {
    type: 'computational',
    stemTemplate: 'A map with a scale of 1:{scale} shows {inches} inches between two points. The actual ground distance is:',
    paramRanges: { scale: [2400, 4800, 10000, 12000, 24000, 48000], inches: [1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 5.0, 6.0] },
    computeAnswer: (p) => { const ft = Math.round(p.inches * p.scale / 12); return `${ft.toLocaleString()} ft`; },
    computeDistractors: (p) => {
      const ft = Math.round(p.inches * p.scale / 12);
      return [`${Math.round(ft * 1.2).toLocaleString()} ft`, `${Math.round(ft * 0.5).toLocaleString()} ft`, `${Math.round(p.inches * p.scale).toLocaleString()} in`];
    },
    computeExplanation: (p, a) => `Ground distance = Map distance × Scale = ${p.inches} in × ${p.scale.toLocaleString()} = ${(p.inches * p.scale).toLocaleString()} inches = ${a} (÷12)`
  },
  36: {
    type: 'computational',
    stemTemplate: 'The tangent distance (T) for a horizontal curve with radius {r} ft and central angle {delta}° is:',
    paramRanges: { r: [300, 400, 500, 600, 750, 800, 1000, 1200, 1500], delta: [20, 30, 40, 45, 50, 60, 72, 80, 90] },
    computeAnswer: (p) => `${(p.r * Math.tan(p.delta / 2 * Math.PI / 180)).toFixed(2)} ft`,
    computeDistractors: (p) => {
      const T = p.r * Math.tan(p.delta / 2 * Math.PI / 180);
      return [`${p.r.toFixed(2)} ft`, `${(T * 1.5).toFixed(2)} ft`, `${(p.r * Math.sin(p.delta * Math.PI / 180)).toFixed(2)} ft`];
    },
    computeExplanation: (p, a) => `T = R × tan(Δ/2) = ${p.r} × tan(${p.delta / 2}°) = ${a}`
  },
  64: {
    type: 'stem',
    stems: [
      'A line has a bearing of S 30° W. What is its azimuth from north?',
      'Convert the bearing S 30° W to an azimuth from north:',
      'What azimuth corresponds to the bearing S 30° W?',
      'Express the bearing S 30° W as an azimuth measured clockwise from north:',
      'A traverse line has bearing S 30° W. Its azimuth is:'
    ]
  },
  43: {
    type: 'computational',
    stemTemplate: 'If the standard error of a distance measurement is ±{se} ft, what is the standard error for a distance measured {n} times?',
    paramRanges: { se: [0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.08, 0.10], n: [4, 9, 16, 25] },
    computeAnswer: (p) => `±${(p.se / Math.sqrt(p.n)).toFixed(3)} ft`,
    computeDistractors: (p) => [`±${p.se.toFixed(2)} ft`, `±${(p.se * Math.sqrt(p.n)).toFixed(3)} ft`, `±${(p.se * p.n).toFixed(3)} ft`],
    computeExplanation: (p, a) => `SE decreases with multiple measurements: SE = σ/√n = ${p.se}/√${p.n} = ${a}`
  },
  46: {
    type: 'computational',
    stemTemplate: 'What is the area of a triangle with base {b} ft and height {h} ft?',
    paramRanges: { b: [100, 150, 200, 250, 300, 350, 400], h: [80, 100, 120, 150, 175, 200, 250] },
    computeAnswer: (p) => `${(p.b * p.h / 2).toLocaleString()} sq ft`,
    computeDistractors: (p) => { const a = p.b * p.h / 2; return [`${(p.b * p.h).toLocaleString()} sq ft`, `${(a / 2).toLocaleString()} sq ft`, `${(a * 1.3).toLocaleString()} sq ft`]; },
    computeExplanation: (p, a) => `Area = (base × height) / 2 = (${p.b} × ${p.h}) / 2 = ${a}`
  },
  48: {
    type: 'computational',
    stemTemplate: 'A closed traverse has angular misclosure of {err} seconds with {n} angles. How much correction per angle?',
    paramRanges: { err: [12, 15, 18, 20, 24, 30, 36, 42, 48, 60], n: [3, 4, 5, 6, 7, 8, 10] },
    computeAnswer: (p) => `${(p.err / p.n).toFixed(p.err % p.n === 0 ? 0 : 1)} seconds`,
    computeDistractors: (p) => {
      const c = p.err / p.n;
      return [`${p.err} seconds`, `${(c * 2).toFixed(1)} seconds`, `${(c / 2).toFixed(1)} seconds`];
    },
    computeExplanation: (p, a) => `Angular correction = total error / number of angles = ${p.err}"/${p.n} = ${a} per angle.`
  },
  50: {
    type: 'computational',
    stemTemplate: 'On a 1:{scale} scale map, 1 inch represents:',
    paramRanges: { scale: [1200, 2400, 4800, 6000, 10000, 12000, 24000, 48000] },
    computeAnswer: (p) => `${Math.round(p.scale / 12).toLocaleString()} feet`,
    computeDistractors: (p) => {
      const ft = Math.round(p.scale / 12);
      return [`${Math.round(ft * 1.5).toLocaleString()} feet`, `${p.scale.toLocaleString()} feet`, `${Math.round(ft / 2).toLocaleString()} feet`];
    },
    computeExplanation: (p, a) => `1:${p.scale.toLocaleString()} means 1 inch = ${p.scale.toLocaleString()} inches = ${a} (÷12)`
  },
  57: {
    type: 'computational',
    stemTemplate: 'For a {deg}° curve (arc definition), what is the radius?',
    paramRanges: { deg: [1, 2, 3, 4, 5, 6, 8, 10, 12, 15] },
    computeAnswer: (p) => `${(5729.58 / p.deg).toFixed(1)} ft`,
    computeDistractors: (p) => {
      const r = 5729.58 / p.deg;
      return [`${(r / 2).toFixed(1)} ft`, `${(p.deg * 100).toFixed(1)} ft`, `${(r * 2).toFixed(1)} ft`];
    },
    computeExplanation: (p, a) => `R = 5729.58/D = 5729.58/${p.deg} = ${a}. Higher degree = sharper curve = smaller radius.`
  },
  58: {
    type: 'computational',
    stemTemplate: 'A surveyor needs to stake a {deg}° highway curve. Using the arc definition, what is the radius?',
    paramRanges: { deg: [2, 3, 4, 5, 6, 8, 10, 12] },
    computeAnswer: (p) => `${(5729.58 / p.deg).toFixed(1)} ft`,
    computeDistractors: (p) => {
      const r = 5729.58 / p.deg;
      return [`${(p.deg * 100).toFixed(1)} ft`, `${(r * 0.1).toFixed(1)} ft`, `${(5729.58).toFixed(1)} ft`];
    },
    computeExplanation: (p, a) => `R = 5729.58/D = 5729.58/${p.deg} = ${a}.`
  },
  59: {
    type: 'computational',
    stemTemplate: 'A property owner wants to know the area of a triangular parcel. Two sides measure {a} ft and {b} ft, and the included angle is {angle}°. What is the area?',
    paramRanges: { a: [200, 250, 300, 350, 400, 450, 500], b: [150, 200, 250, 300, 350, 400, 450], angle: [30, 45, 60, 72, 80, 90] },
    computeAnswer: (p) => {
      const area = 0.5 * p.a * p.b * Math.sin(p.angle * Math.PI / 180);
      const acres = area / 43560;
      return `${Math.round(area).toLocaleString()} sq ft (about ${acres.toFixed(2)} acres)`;
    },
    computeDistractors: (p) => {
      const area = 0.5 * p.a * p.b * Math.sin(p.angle * Math.PI / 180);
      return [`${Math.round(area * 2).toLocaleString()} sq ft`, `${Math.round(area * 0.5).toLocaleString()} sq ft`, `${Math.round(p.a * p.b).toLocaleString()} sq ft`];
    },
    computeExplanation: (p, a) => `Area = ½ × a × b × sin(C) = ½ × ${p.a} × ${p.b} × sin(${p.angle}°) = ${a}.`
  },
  60: {
    type: 'computational',
    stemTemplate: 'A surveyor sets up a level and reads a backsight of {bs} ft on a benchmark with elevation {bm} ft. What is the height of instrument (HI)?',
    paramRanges: { bs: [3.45, 4.12, 5.67, 6.42, 7.23, 8.15, 9.01], bm: [415.32, 452.18, 478.56, 501.75, 523.18, 545.90, 572.44] },
    computeAnswer: (p) => `${(p.bm + p.bs).toFixed(2)} ft`,
    computeDistractors: (p) => { const hi = p.bm + p.bs; return [`${(p.bm - p.bs).toFixed(2)} ft`, `${p.bm.toFixed(2)} ft`, `${(hi + p.bs).toFixed(2)} ft`]; },
    computeExplanation: (p, a) => `HI = BM elevation + BS = ${p.bm.toFixed(2)} + ${p.bs.toFixed(2)} = ${a}`
  },
  61: {
    type: 'computational',
    stemTemplate: 'A subdivision lot is described as {w} ft × {l} ft. How many acres is this?',
    paramRanges: { w: [80, 100, 120, 140, 150, 175, 200, 250], l: [100, 125, 150, 165, 175, 200, 250, 300] },
    computeAnswer: (p) => `${(p.w * p.l / 43560).toFixed(2)} acres`,
    computeDistractors: (p) => {
      const acres = p.w * p.l / 43560;
      return [`${(acres + 0.10).toFixed(2)} acres`, `${(acres - 0.10).toFixed(2)} acres`, `${(acres * 2).toFixed(2)} acres`];
    },
    computeExplanation: (p, a) => `Area = ${p.w} × ${p.l} = ${(p.w * p.l).toLocaleString()} sq ft. Acres = ${(p.w * p.l).toLocaleString()} ÷ 43,560 = ${a}.`
  },
  62: {
    type: 'computational',
    stemTemplate: 'A traverse line has latitude of +{lat} ft and departure of +{dep} ft. What is the length of this line?',
    paramRanges: { lat: [200.5, 300.3, 350.7, 425.5, 500.2, 275.8, 180.4], dep: [150.2, 250.6, 280.3, 378.1, 425.0, 325.4, 120.7] },
    computeAnswer: (p) => `${Math.sqrt(p.lat * p.lat + p.dep * p.dep).toFixed(1)} ft`,
    computeDistractors: (p) => {
      const len = Math.sqrt(p.lat * p.lat + p.dep * p.dep);
      return [`${(p.lat + p.dep).toFixed(1)} ft`, `${p.lat.toFixed(1)} ft`, `${p.dep.toFixed(1)} ft`];
    },
    computeExplanation: (p, a) => `Length = √(lat² + dep²) = √(${p.lat}² + ${p.dep}²) = ${a}.`
  },
  63: {
    type: 'computational',
    stemTemplate: 'If a traverse has a perimeter of {perim} ft and an error of closure of {err} ft, the ratio of precision is:',
    paramRanges: { perim: [1500, 2000, 2500, 3000, 3500, 4000, 5000, 6000, 8000], err: [0.05, 0.08, 0.10, 0.12, 0.14, 0.16, 0.20, 0.25, 0.40] },
    computeAnswer: (p) => `1:${Math.round(p.perim / p.err).toLocaleString()}`,
    computeDistractors: (p) => { const r = Math.round(p.perim / p.err); return [`1:${Math.round(r / 10).toLocaleString()}`, `1:${Math.round(r * 2).toLocaleString()}`, `1:${Math.round(p.perim).toLocaleString()}`]; },
    computeExplanation: (p, a) => `Ratio = 1:(perimeter/error) = 1:(${p.perim}/${p.err}) = ${a}. Higher ratio = better precision.`
  },
  65: {
    type: 'computational',
    stemTemplate: 'If a surveying firm has {rate}% overhead rate and direct labor for a project is ${labor}, the overhead charge is:',
    paramRanges: { rate: [120, 140, 150, 160, 170, 180, 200, 220], labor: [3000, 4000, 5000, 6000, 7500, 8000, 10000] },
    computeAnswer: (p) => `$${(p.labor * p.rate / 100).toLocaleString()}`,
    computeDistractors: (p) => {
      const oh = p.labor * p.rate / 100;
      return [`$${p.labor.toLocaleString()}`, `$${Math.round(oh / 2).toLocaleString()}`, `$${Math.round(oh + p.labor).toLocaleString()}`];
    },
    computeExplanation: (p, a) => `Overhead = direct labor × overhead rate = $${p.labor.toLocaleString()} × ${(p.rate / 100).toFixed(2)} = ${a}.`
  },
  66: {
    type: 'computational',
    stemTemplate: 'In differential leveling, if HI = {hi} ft and the rod reading (FS) is {fs} ft, what is the elevation of the foresight point?',
    paramRanges: { hi: [425.50, 438.72, 453.25, 467.15, 495.80, 512.83, 528.40, 542.83, 575.60], fs: [2.45, 3.18, 4.21, 4.82, 5.37, 6.14, 7.05, 8.23, 9.12] },
    computeAnswer: (p) => `${(p.hi - p.fs).toFixed(2)} ft`,
    computeDistractors: (p) => { const e = p.hi - p.fs; return [`${(p.hi + p.fs).toFixed(2)} ft`, `${p.hi.toFixed(2)} ft`, `${(e + 1).toFixed(2)} ft`]; },
    computeExplanation: (p, a) => `Elevation = HI - FS = ${p.hi.toFixed(2)} - ${p.fs.toFixed(2)} = ${a}`
  },
  67: {
    type: 'computational',
    stemTemplate: 'A traverse line has bearing S {deg}° W and distance {dist} ft, the latitude is:',
    paramRanges: { deg: [20, 25, 30, 35, 40, 45, 50, 55, 60], dist: [200, 250, 300, 350, 400, 450, 500] },
    computeAnswer: (p) => { const lat = p.dist * Math.cos(p.deg * Math.PI / 180); return `−${lat.toFixed(1)} ft (south)`; },
    computeDistractors: (p) => {
      const lat = p.dist * Math.cos(p.deg * Math.PI / 180);
      const dep = p.dist * Math.sin(p.deg * Math.PI / 180);
      return [`+${lat.toFixed(1)} ft (north)`, `−${dep.toFixed(1)} ft`, `+${p.dist.toFixed(1)} ft`];
    },
    computeExplanation: (p, a) => `Latitude = d × cos(bearing) = ${p.dist} × cos(${p.deg}°) = ${Math.abs(parseFloat(a)).toFixed(1)} ft. Since bearing is S, latitude is negative (south).`
  },
  68: {
    type: 'computational',
    stemTemplate: 'In construction staking, converting feet and inches to decimal feet, {ft} ft {in}-{frac} in equals:',
    paramRanges: { ft: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12], in: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], frac: [0, 25, 50, 75] },
    computeAnswer: (p) => { const totalIn = p.in + p.frac / 100; return `${(p.ft + totalIn / 12).toFixed(2)} ft`; },
    computeDistractors: (p) => {
      const v = p.ft + (p.in + p.frac / 100) / 12;
      return [`${(v + 0.10).toFixed(2)} ft`, `${(v - 0.07).toFixed(2)} ft`, `${(p.ft + p.in / 10).toFixed(2)} ft`];
    },
    computeExplanation: (p, a) => `${p.in}.${p.frac || '0'} inches ÷ 12 = ${((p.in + p.frac / 100) / 12).toFixed(3)} ft. Total = ${p.ft} + ${((p.in + p.frac / 100) / 12).toFixed(3)} = ${a}.`
  },
  // Temperature correction (hot) - index 166
  166: {
    type: 'computational',
    stemTemplate: 'A 100 ft steel tape (α = 0.00000645/°F) is standardized at 68°F. A distance is measured as {dist} ft at {temp}°F. What is the corrected distance?',
    paramRanges: { dist: [456.32, 523.18, 645.90, 728.45, 812.73, 872.54, 935.21, 1050.60], temp: [85, 90, 95, 100, 105, 110] },
    computeAnswer: (p) => {
      const ct = 0.00000645 * (p.temp - 68) * p.dist;
      return `${(p.dist + ct).toFixed(2)} ft`;
    },
    computeDistractors: (p) => {
      const ct = 0.00000645 * (p.temp - 68) * p.dist;
      return [`${p.dist.toFixed(2)} ft`, `${(p.dist - ct).toFixed(2)} ft`, `${(p.dist + ct * 2).toFixed(2)} ft`];
    },
    computeExplanation: (p, a) => {
      const ct = 0.00000645 * (p.temp - 68) * p.dist;
      return `Ct = α × (T − Ts) × L = 0.00000645 × (${p.temp} − 68) × ${p.dist} = +${ct.toFixed(3)} ft. Corrected = ${p.dist} + ${ct.toFixed(3)} = ${a}. Hot → tape expands → add correction.`;
    }
  },
  // Temperature correction (cold) - index 167
  167: {
    type: 'computational',
    stemTemplate: 'A steel tape (α = 0.00000645/°F) standardized at 68°F is used at {temp}°F to measure {dist} ft. What is the temperature correction?',
    paramRanges: { dist: [300.00, 400.00, 500.00, 600.00, 750.00, 850.00, 1000.00], temp: [20, 25, 30, 32, 35, 40, 45, 50] },
    computeAnswer: (p) => {
      const ct = 0.00000645 * (p.temp - 68) * p.dist;
      return `${ct.toFixed(3)} ft`;
    },
    computeDistractors: (p) => {
      const ct = 0.00000645 * (p.temp - 68) * p.dist;
      return [`+${(-ct).toFixed(3)} ft`, `${(ct / 2).toFixed(3)} ft`, `${(ct * 2).toFixed(3)} ft`];
    },
    computeExplanation: (p, a) => `Ct = α × (T − Ts) × L = 0.00000645 × (${p.temp} − 68) × ${p.dist} = ${a}. Cold → tape shrinks → negative correction.`
  },
  // Tension correction per tape length - index 168
  168: {
    type: 'computational',
    stemTemplate: 'A 100 ft steel tape (A = {area} sq in, E = 29,000,000 psi) is standardized at {ps} lbf. If {p} lbf tension is applied, what is the tension correction per tape length?',
    paramRanges: { area: [0.003, 0.004, 0.005, 0.006], ps: [10, 12], p: [20, 25, 28, 30, 35] },
    computeAnswer: (p) => {
      const cp = (p.p - p.ps) * 100 / (p.area * 29000000);
      return `+${cp.toFixed(3)} ft`;
    },
    computeDistractors: (p) => {
      const cp = (p.p - p.ps) * 100 / (p.area * 29000000);
      return [`−${cp.toFixed(3)} ft`, `+${(cp * 10).toFixed(3)} ft`, `+${(cp / 10).toFixed(4)} ft`];
    },
    computeExplanation: (p, a) => {
      const cp = (p.p - p.ps) * 100 / (p.area * 29000000);
      return `Cp = (P − Ps) × L / (A × E) = (${p.p} − ${p.ps}) × 100 / (${p.area} × 29,000,000) = ${((p.p - p.ps) * 100).toFixed(0)} / ${(p.area * 29000000).toFixed(0)} = ${a}. Extra tension stretches tape.`;
    }
  },
  // Tension correction for longer distance - index 169
  169: {
    type: 'computational',
    stemTemplate: 'A surveyor measures {dist} ft with a tape under {p} lbf tension. Standardized at {ps} lbf, A = {area} sq in, E = 29,000,000 psi. What is the total tension correction?',
    paramRanges: { dist: [300.00, 400.00, 450.00, 500.00, 600.00, 750.00], p: [20, 25, 28, 30, 35], ps: [10, 12], area: [0.003, 0.004, 0.005] },
    computeAnswer: (p) => {
      const cp = (p.p - p.ps) * p.dist / (p.area * 29000000);
      return `+${cp.toFixed(3)} ft`;
    },
    computeDistractors: (p) => {
      const cp = (p.p - p.ps) * p.dist / (p.area * 29000000);
      return [`−${cp.toFixed(3)} ft`, `+${(cp / 2).toFixed(3)} ft`, `+${(cp * 2).toFixed(3)} ft`];
    },
    computeExplanation: (p, a) => `Cp = (P − Ps) × L / (A × E) = (${p.p} − ${p.ps}) × ${p.dist} / (${p.area} × 29,000,000) = ${a}.`
  },
  // Sag correction #1 - index 170
  170: {
    type: 'computational',
    stemTemplate: 'The sag correction for a 100 ft tape weighing {w} lbs total, supported at endpoints with {p} lbf tension is:',
    paramRanges: { w: [1.0, 1.2, 1.5, 1.8, 2.0, 2.5], p: [10, 12, 15, 18, 20, 25] },
    computeAnswer: (p) => {
      const wPerFt = p.w / 100;
      const cs = -(wPerFt * wPerFt * 100 * 100 * 100) / (24 * p.p * p.p);
      return `${cs.toFixed(3)} ft`;
    },
    computeDistractors: (p) => {
      const wPerFt = p.w / 100;
      const cs = -(wPerFt * wPerFt * 100 * 100 * 100) / (24 * p.p * p.p);
      return [`+${(-cs).toFixed(3)} ft`, `${(cs * 2).toFixed(3)} ft`, `${(cs / 2).toFixed(3)} ft`];
    },
    computeExplanation: (p, a) => {
      const wPerFt = p.w / 100;
      return `w = ${p.w}/${100} = ${wPerFt.toFixed(3)} lb/ft. Cs = −w²L³/(24P²) = −(${wPerFt.toFixed(3)}²)(100³)/(24 × ${p.p}²) = ${a}. Sag correction is always negative.`;
    }
  },
  // Sag correction #2 - index 171
  171: {
    type: 'computational',
    stemTemplate: 'A 100 ft steel tape weighs {w} lbs. Supported at ends only with {p} lbf tension. What is the sag correction?',
    paramRanges: { w: [1.0, 1.2, 1.5, 1.8, 2.0, 2.5, 3.0], p: [10, 12, 15, 18, 20, 25, 30] },
    computeAnswer: (p) => {
      const wPerFt = p.w / 100;
      const cs = -(wPerFt * wPerFt * 1000000) / (24 * p.p * p.p);
      return `${cs.toFixed(3)} ft`;
    },
    computeDistractors: (p) => {
      const wPerFt = p.w / 100;
      const cs = -(wPerFt * wPerFt * 1000000) / (24 * p.p * p.p);
      return [`+${(-cs).toFixed(3)} ft`, `${(cs * 2).toFixed(3)} ft`, `${(cs / 3).toFixed(3)} ft`];
    },
    computeExplanation: (p, a) => `w = ${p.w}/100 = ${(p.w/100).toFixed(3)} lb/ft. Cs = −w²L³/(24P²) = ${a}. Sag always negative.`
  },
  // Incorrect tape length (too long) - index 172
  172: {
    type: 'computational',
    stemTemplate: 'A tape is known to be {actual} ft long (too long by {err} ft). A measured distance reads {dist} ft. What is the corrected distance?',
    paramRanges: { err: [0.02, 0.03, 0.04, 0.05], dist: [425.18, 534.72, 623.45, 756.30, 856.27, 945.50, 1023.65] },
    computeAnswer: (p) => {
      const actual = 100 + p.err;
      const corrected = p.dist * (actual / 100);
      return `${corrected.toFixed(2)} ft`;
    },
    computeDistractors: (p) => {
      const actual = 100 + p.err;
      const corrected = p.dist * (actual / 100);
      return [`${(p.dist * (100 - p.err) / 100).toFixed(2)} ft`, `${p.dist.toFixed(2)} ft`, `${(corrected + p.err * 2).toFixed(2)} ft`];
    },
    computeExplanation: (p, a) => {
      const actual = 100 + p.err;
      return `Corrected = Measured × (Actual/Nominal) = ${p.dist} × (${actual.toFixed(2)}/100) = ${a}. Long tape → measured distance too short → add correction.`;
    }
  },
  // Incorrect tape length (too short) - index 173
  173: {
    type: 'computational',
    stemTemplate: 'A 100 ft tape is actually {actual} ft (too short by {err} ft). A line measured with it reads {dist} ft. What is the true distance?',
    paramRanges: { err: [0.02, 0.03, 0.04, 0.05], dist: [423.60, 534.82, 623.45, 750.20, 845.15, 956.30] },
    computeAnswer: (p) => {
      const actual = 100 - p.err;
      const corrected = p.dist * (actual / 100);
      return `${corrected.toFixed(2)} ft`;
    },
    computeDistractors: (p) => {
      const actual = 100 - p.err;
      const corrected = p.dist * (actual / 100);
      return [`${(p.dist * (100 + p.err) / 100).toFixed(2)} ft`, `${p.dist.toFixed(2)} ft`, `${(corrected - p.err).toFixed(2)} ft`];
    },
    computeExplanation: (p, a) => {
      const actual = 100 - p.err;
      return `Corrected = Measured × (Actual/Nominal) = ${p.dist} × (${actual.toFixed(2)}/100) = ${a}. Short tape → measured distance too long → subtract correction.`;
    }
  },
  // Layout with incorrect tape - index 174
  174: {
    type: 'computational',
    stemTemplate: 'A surveyor lays out a building corner at exactly {target} ft using a tape that is actually {actual} ft long. What distance should be set on the tape?',
    paramRanges: { target: [100.00, 150.00, 200.00, 250.00, 300.00, 400.00, 500.00], actual: [100.02, 100.03, 100.04, 100.05] },
    computeAnswer: (p) => {
      const set = p.target * (100 / p.actual);
      return `${set.toFixed(2)} ft`;
    },
    computeDistractors: (p) => {
      const set = p.target * (100 / p.actual);
      return [`${(p.target * (p.actual / 100)).toFixed(2)} ft`, `${p.target.toFixed(2)} ft`, `${(set - 0.10).toFixed(2)} ft`];
    },
    computeExplanation: (p, a) => `When laying out, reverse the correction. Set distance = ${p.target} × (100/${p.actual}) = ${a}. Tape is too long so set a shorter reading.`
  },
  // Alignment correction (long line) - index 175
  175: {
    type: 'computational',
    stemTemplate: 'A {dist} ft distance is measured but the end of the tape is offset {d} ft from the true line. What is the alignment correction?',
    paramRanges: { dist: [100, 150, 200, 250, 300, 400, 500], d: [0.5, 1.0, 1.5, 2.0, 2.5, 3.0] },
    computeAnswer: (p) => {
      const ca = -(p.d * p.d) / (2 * p.dist);
      return `${ca.toFixed(3)} ft`;
    },
    computeDistractors: (p) => {
      const ca = -(p.d * p.d) / (2 * p.dist);
      return [`+${(-ca).toFixed(3)} ft`, `−${p.d.toFixed(1)} ft`, `${(ca * 10).toFixed(3)} ft`];
    },
    computeExplanation: (p, a) => `Alignment: Ca = −d²/(2L) = −(${p.d}²)/(2 × ${p.dist}) = ${a}. Off-line always makes measured distance too long.`
  },
  // Alignment correction (shorter line) - index 176
  176: {
    type: 'computational',
    stemTemplate: 'A {dist} ft tape measurement has the end offset {d} ft perpendicular to the line. What is the error due to this misalignment?',
    paramRanges: { dist: [50, 75, 100, 125, 150, 200], d: [1.0, 1.5, 2.0, 2.5, 3.0, 4.0] },
    computeAnswer: (p) => {
      const ca = -(p.d * p.d) / (2 * p.dist);
      return `${ca.toFixed(3)} ft`;
    },
    computeDistractors: (p) => {
      const ca = -(p.d * p.d) / (2 * p.dist);
      return [`+${(-ca).toFixed(3)} ft`, `−${(p.d).toFixed(1)} ft`, `−${(p.d * p.d / p.dist).toFixed(3)} ft`];
    },
    computeExplanation: (p, a) => `Ca = −d²/(2L) = −(${p.d}²)/(2 × ${p.dist}) = ${a}. Being off-line always makes measured distance longer.`
  },
  // Slope distance to horizontal - index 181
  181: {
    type: 'computational',
    stemTemplate: 'A slope distance of {dist} ft is measured along a uniform {grade}% grade. What is the horizontal distance?',
    paramRanges: { dist: [200.00, 300.50, 350.25, 425.67, 500.00, 575.30, 650.00], grade: [4, 5, 6, 8, 10, 12, 15] },
    computeAnswer: (p) => {
      const theta = Math.atan(p.grade / 100);
      const hd = p.dist * Math.cos(theta);
      return `${hd.toFixed(2)} ft`;
    },
    computeDistractors: (p) => {
      const theta = Math.atan(p.grade / 100);
      const hd = p.dist * Math.cos(theta);
      return [`${p.dist.toFixed(2)} ft`, `${(hd - 5).toFixed(2)} ft`, `${(p.dist * p.grade / 100).toFixed(2)} ft`];
    },
    computeExplanation: (p, a) => {
      const theta = Math.atan(p.grade / 100) * 180 / Math.PI;
      return `${p.grade}% grade: tan(θ) = ${(p.grade / 100).toFixed(2)}, θ = ${theta.toFixed(2)}°. H = ${p.dist} × cos(${theta.toFixed(2)}°) = ${a}.`;
    }
  },
  // Slope correction from elevation difference - index 182
  182: {
    type: 'computational',
    stemTemplate: 'A surveyor measures a slope distance of {dist} ft with an elevation difference of {h} ft between endpoints. What is the slope correction?',
    paramRanges: { dist: [100.00, 150.00, 200.00, 250.00, 300.00, 400.00, 500.00], h: [5.0, 8.0, 10.0, 12.0, 15.0, 18.0, 20.0, 25.0] },
    computeAnswer: (p) => {
      const ch = -(p.h * p.h) / (2 * p.dist);
      return `${ch.toFixed(2)} ft`;
    },
    computeDistractors: (p) => {
      const ch = -(p.h * p.h) / (2 * p.dist);
      return [`+${(-ch).toFixed(2)} ft`, `−${p.h.toFixed(1)} ft`, `${(ch / 2).toFixed(2)} ft`];
    },
    computeExplanation: (p, a) => `Slope correction: Ch = −h²/(2S) = −(${p.h}²)/(2 × ${p.dist}) = ${a}. Horizontal = ${p.dist} + (${a}) = ${(p.dist + (-(p.h * p.h) / (2 * p.dist))).toFixed(2)} ft.`
  }
};

function applyComputationalVariation(
  base: QuizQuestion,
  def: ComputationalVariation,
  rng: () => number
): QuizQuestion {
  const params: Record<string, number> = {};
  for (const [key, range] of Object.entries(def.paramRanges)) {
    params[key] = pickFromArray(range, rng);
  }
  let stem = def.stemTemplate;
  for (const [key, value] of Object.entries(params)) {
    stem = stem.replace(new RegExp(`\\{${key}\\}`, 'g'), String(value));
  }
  const answer = def.computeAnswer(params);
  const distractors = def.computeDistractors(params, answer);
  const allOptions = [answer, ...distractors];
  const shuffled = shuffleArray(allOptions, rng);
  return {
    ...base,
    question: stem,
    options: shuffled,
    correctAnswer: shuffled.indexOf(answer),
    explanation: def.computeExplanation(params, answer)
  };
}

function applyStemVariation(
  base: QuizQuestion,
  def: StemVariation,
  variationNum: number,
  rng: () => number
): QuizQuestion {
  const stemIdx = variationNum % def.stems.length;
  const correctOpt = base.options[base.correctAnswer];
  const shuffled = shuffleArray([...base.options], rng);
  return {
    ...base,
    question: def.stems[stemIdx],
    options: shuffled,
    correctAnswer: shuffled.indexOf(correctOpt)
  };
}

function applyGenericVariation(
  base: QuizQuestion,
  _rng: () => number
): QuizQuestion {
  return { ...base };
}

function extractQuestionIndex(id: string): number {
  const match = id.match(/(?:quiz|exam|ps-exam|micro-drill)-(\d+)/);
  return match ? parseInt(match[1], 10) : NaN;
}

export function getVariedQuizQuestions(
  questions: Array<QuizQuestion & { id: string }>,
  sessionSeed?: number
): Array<QuizQuestion & { id: string }> {
  const seed = sessionSeed || Date.now();

  return questions.map(q => {
    const originalIndex = extractQuestionIndex(q.id);
    if (isNaN(originalIndex)) return q;

    const rng = seededRandom(hashCode(`session-${seed}-q${originalIndex}`));
    const variationNum = Math.floor(rng() * 5);

    if (variationNum === 0) return q;

    const variationRng = seededRandom(hashCode(`var-${seed}-q${originalIndex}-v${variationNum}`));
    const def = fsVariationDefs[originalIndex];

    if (!def) {
      return { ...applyGenericVariation(q, variationRng), id: q.id };
    }

    if (def.type === 'computational') {
      return { ...applyComputationalVariation(q, def, variationRng), id: q.id };
    }

    return { ...applyStemVariation(q, def, variationNum, variationRng), id: q.id };
  });
}

export function getSessionSeed(): number {
  const now = new Date();
  // Date-based seed: YYYYMMDD so the question pool rotates each calendar day
  const dateSeed =
    now.getFullYear() * 10000 +
    (now.getMonth() + 1) * 100 +
    now.getDate();

  // Within-day session counter so two quizzes on the same day still differ
  let sessionCount = 0;
  try {
    sessionCount = parseInt(
      sessionStorage.getItem('quiz-daily-session-count') || '0',
      10
    );
    if (isNaN(sessionCount)) sessionCount = 0;
  } catch {
    // sessionStorage unavailable (SSR / strict private mode)
  }

  return dateSeed * 100 + (sessionCount % 100);
}

/**
 * Increment the within-day session counter. Call once when a new quiz starts
 * so consecutive quizzes on the same day get different question sets.
 */
export function incrementDailySessionCount(): void {
  try {
    const prev = parseInt(
      sessionStorage.getItem('quiz-daily-session-count') || '0',
      10
    );
    sessionStorage.setItem(
      'quiz-daily-session-count',
      String(isNaN(prev) ? 1 : prev + 1)
    );
  } catch {
    // sessionStorage unavailable
  }
}
