import { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Compass, Lightbulb, Plus, Trash2, AlertTriangle } from 'lucide-react';

interface TraverseLeg {
  id: number;
  deg: string;
  min: string;
  sec: string;
  distance: string;
}

interface ComputedLeg {
  azimuth: number;
  distance: number;
  latitude: number;
  departure: number;
  corrLat: number;
  corrDep: number;
  adjLat: number;
  adjDep: number;
  northing: number;
  easting: number;
}

function dmsToDecimal(deg: string, min: string, sec: string): number | null {
  const d = deg.trim() === '' ? 0 : Number(deg);
  const m = min.trim() === '' ? 0 : Number(min);
  const s = sec.trim() === '' ? 0 : Number(sec);
  if ([d, m, s].some(v => Number.isNaN(v)) || m < 0 || m >= 60 || s < 0 || s >= 60 || d < 0 || d >= 360) {
    return null;
  }
  return d + m / 60 + s / 3600;
}

function formatNum(n: number, decimals = 3): string {
  return n.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

let nextLegId = 4;

export default function TraverseCalculatorPage() {
  const [legs, setLegs] = useState<TraverseLeg[]>([
    { id: 1, deg: '', min: '', sec: '', distance: '' },
    { id: 2, deg: '', min: '', sec: '', distance: '' },
    { id: 3, deg: '', min: '', sec: '', distance: '' },
  ]);
  const [startNorthing, setStartNorthing] = useState('1000');
  const [startEasting, setStartEasting] = useState('1000');

  const addLeg = () => setLegs(prev => [...prev, { id: nextLegId++, deg: '', min: '', sec: '', distance: '' }]);
  const removeLeg = (id: number) => setLegs(prev => (prev.length > 3 ? prev.filter(l => l.id !== id) : prev));
  const updateLeg = (id: number, field: keyof Omit<TraverseLeg, 'id'>, value: string) =>
    setLegs(prev => prev.map(l => (l.id === id ? { ...l, [field]: value } : l)));
  const clearAll = () => {
    setLegs([
      { id: nextLegId++, deg: '', min: '', sec: '', distance: '' },
      { id: nextLegId++, deg: '', min: '', sec: '', distance: '' },
      { id: nextLegId++, deg: '', min: '', sec: '', distance: '' },
    ]);
  };

  const result = useMemo(() => {
    // Only compute once every leg has an azimuth (deg at least) and distance
    const filled = legs.filter(l => (l.deg.trim() !== '' || l.min.trim() !== '' || l.sec.trim() !== '') && l.distance.trim() !== '');
    if (filled.length < 3 || filled.length !== legs.length) return { status: 'incomplete' as const };

    const parsed: { azimuth: number; distance: number }[] = [];
    for (const l of legs) {
      const az = dmsToDecimal(l.deg, l.min, l.sec);
      const dist = Number(l.distance);
      if (az === null) return { status: 'error' as const, message: 'Each azimuth needs degrees 0–359, minutes 0–59, and seconds 0–59.9.' };
      if (Number.isNaN(dist) || dist <= 0) return { status: 'error' as const, message: 'Each distance must be a positive number.' };
      parsed.push({ azimuth: az, distance: dist });
    }

    const startN = Number(startNorthing);
    const startE = Number(startEasting);
    if (Number.isNaN(startN) || Number.isNaN(startE)) {
      return { status: 'error' as const, message: 'Starting northing and easting must be numbers.' };
    }

    const perimeter = parsed.reduce((s, p) => s + p.distance, 0);
    const raw = parsed.map(p => {
      const azRad = (p.azimuth * Math.PI) / 180;
      return {
        ...p,
        latitude: p.distance * Math.cos(azRad),
        departure: p.distance * Math.sin(azRad),
      };
    });
    const sumLat = raw.reduce((s, r) => s + r.latitude, 0);
    const sumDep = raw.reduce((s, r) => s + r.departure, 0);
    const linearMisclosure = Math.hypot(sumLat, sumDep);
    const precision = linearMisclosure > 1e-9 ? perimeter / linearMisclosure : Infinity;

    // Compass (Bowditch) rule: correction proportional to leg length
    let n = startN;
    let e = startE;
    const computed: ComputedLeg[] = raw.map(r => {
      const corrLat = -sumLat * (r.distance / perimeter);
      const corrDep = -sumDep * (r.distance / perimeter);
      const adjLat = r.latitude + corrLat;
      const adjDep = r.departure + corrDep;
      n += adjLat;
      e += adjDep;
      return { azimuth: r.azimuth, distance: r.distance, latitude: r.latitude, departure: r.departure, corrLat, corrDep, adjLat, adjDep, northing: n, easting: e };
    });

    // Area by coordinates (shoelace) on adjusted points, including start point
    const pts: { n: number; e: number }[] = [{ n: startN, e: startE }];
    computed.slice(0, -1).forEach(c => pts.push({ n: c.northing, e: c.easting }));
    let doubleArea = 0;
    for (let i = 0; i < pts.length; i++) {
      const j = (i + 1) % pts.length;
      doubleArea += pts[i].e * pts[j].n - pts[j].e * pts[i].n;
    }
    const area = Math.abs(doubleArea) / 2;

    return { status: 'ok' as const, computed, perimeter, sumLat, sumDep, linearMisclosure, precision, area };
  }, [legs, startNorthing, startEasting]);

  return (
    <div className="container max-w-5xl py-6 px-4">
      <div className="mb-6">
        <h1 className="font-serif text-2xl font-bold mb-2 flex items-center gap-2" data-testid="text-page-title">
          <Compass className="w-7 h-7 text-primary" />
          Traverse Calculator
        </h1>
        <p className="text-muted-foreground" data-testid="text-page-description">
          Enter each leg's azimuth and distance to check closure and balance the traverse with the compass (Bowditch) rule.
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-serif">Traverse Legs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-3 items-end">
            <div>
              <label className="text-xs text-muted-foreground block mb-1">Start Northing</label>
              <Input value={startNorthing} onChange={e => setStartNorthing(e.target.value)} className="w-32 font-mono" inputMode="decimal" data-testid="input-start-northing" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground block mb-1">Start Easting</label>
              <Input value={startEasting} onChange={e => setStartEasting(e.target.value)} className="w-32 font-mono" inputMode="decimal" data-testid="input-start-easting" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-muted-foreground">
                  <th className="pb-2 pr-2">Leg</th>
                  <th className="pb-2 pr-2">Azimuth ° ' "</th>
                  <th className="pb-2 pr-2">Distance</th>
                  <th className="pb-2" />
                </tr>
              </thead>
              <tbody>
                {legs.map((leg, i) => (
                  <tr key={leg.id} data-testid={`row-leg-${i}`}>
                    <td className="py-1 pr-2 font-mono text-muted-foreground">{i + 1}</td>
                    <td className="py-1 pr-2">
                      <div className="flex gap-1">
                        <Input value={leg.deg} onChange={e => updateLeg(leg.id, 'deg', e.target.value)} placeholder="deg" className="w-20 font-mono" inputMode="numeric" data-testid={`input-az-deg-${i}`} />
                        <Input value={leg.min} onChange={e => updateLeg(leg.id, 'min', e.target.value)} placeholder="min" className="w-16 font-mono" inputMode="numeric" data-testid={`input-az-min-${i}`} />
                        <Input value={leg.sec} onChange={e => updateLeg(leg.id, 'sec', e.target.value)} placeholder="sec" className="w-16 font-mono" inputMode="decimal" data-testid={`input-az-sec-${i}`} />
                      </div>
                    </td>
                    <td className="py-1 pr-2">
                      <Input value={leg.distance} onChange={e => updateLeg(leg.id, 'distance', e.target.value)} placeholder="e.g. 250.00" className="w-32 font-mono" inputMode="decimal" data-testid={`input-distance-${i}`} />
                    </td>
                    <td className="py-1">
                      <Button variant="ghost" size="icon" onClick={() => removeLeg(leg.id)} disabled={legs.length <= 3} aria-label={`Remove leg ${i + 1}`} data-testid={`button-remove-leg-${i}`}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={addLeg} data-testid="button-add-leg">
              <Plus className="w-4 h-4 mr-1" /> Add Leg
            </Button>
            <Button variant="ghost" size="sm" onClick={clearAll} data-testid="button-clear-legs">
              Clear All
            </Button>
          </div>

          {result.status === 'error' && (
            <Alert variant="destructive" data-testid="alert-traverse-error">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{result.message}</AlertDescription>
            </Alert>
          )}
          {result.status === 'incomplete' && (
            <p className="text-xs text-muted-foreground" data-testid="text-traverse-incomplete">
              Fill in an azimuth and distance for every leg (at least 3 legs) to see the closure results.
            </p>
          )}
        </CardContent>
      </Card>

      {result.status === 'ok' && (
        <>
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-serif">Closure Check</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="label-coord text-[10px] text-muted-foreground">Perimeter</div>
                  <div className="font-mono text-lg" data-testid="text-perimeter">{formatNum(result.perimeter)}</div>
                </div>
                <div>
                  <div className="label-coord text-[10px] text-muted-foreground">Misclosure N / E</div>
                  <div className="font-mono text-lg" data-testid="text-misclosure-ne">{formatNum(result.sumLat)} / {formatNum(result.sumDep)}</div>
                </div>
                <div>
                  <div className="label-coord text-[10px] text-muted-foreground">Linear Misclosure</div>
                  <div className="font-mono text-lg" data-testid="text-linear-misclosure">{formatNum(result.linearMisclosure)}</div>
                </div>
                <div>
                  <div className="label-coord text-[10px] text-muted-foreground">Precision</div>
                  <div className="font-mono text-lg" data-testid="text-precision">
                    {result.precision === Infinity ? 'Perfect' : `1 : ${Math.round(result.precision).toLocaleString()}`}
                  </div>
                </div>
              </div>
              <div className="mt-3 text-center">
                {result.precision >= 5000 ? (
                  <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 border-green-300 dark:border-green-800" data-testid="badge-closure-quality">
                    Meets common 1:5,000 boundary standard
                  </Badge>
                ) : (
                  <Badge className="bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300 border-orange-300 dark:border-orange-800" data-testid="badge-closure-quality">
                    Below 1:5,000 — check field data
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-serif">Balanced Traverse (Compass Rule)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm font-mono">
                  <thead>
                    <tr className="text-left text-xs text-muted-foreground font-sans">
                      <th className="pb-2 pr-3">Leg</th>
                      <th className="pb-2 pr-3">Latitude</th>
                      <th className="pb-2 pr-3">Departure</th>
                      <th className="pb-2 pr-3">Corr. Lat</th>
                      <th className="pb-2 pr-3">Corr. Dep</th>
                      <th className="pb-2 pr-3">Adj. Lat</th>
                      <th className="pb-2 pr-3">Adj. Dep</th>
                      <th className="pb-2 pr-3">Northing</th>
                      <th className="pb-2">Easting</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.computed.map((c, i) => (
                      <tr key={i} className="border-t border-border/60" data-testid={`row-balanced-${i}`}>
                        <td className="py-1.5 pr-3">{i + 1}</td>
                        <td className="py-1.5 pr-3">{formatNum(c.latitude)}</td>
                        <td className="py-1.5 pr-3">{formatNum(c.departure)}</td>
                        <td className="py-1.5 pr-3">{formatNum(c.corrLat)}</td>
                        <td className="py-1.5 pr-3">{formatNum(c.corrDep)}</td>
                        <td className="py-1.5 pr-3">{formatNum(c.adjLat)}</td>
                        <td className="py-1.5 pr-3">{formatNum(c.adjDep)}</td>
                        <td className="py-1.5 pr-3" data-testid={`text-northing-${i}`}>{formatNum(c.northing)}</td>
                        <td className="py-1.5" data-testid={`text-easting-${i}`}>{formatNum(c.easting)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-sm mt-4">
                Enclosed area (adjusted coordinates):{' '}
                <span className="font-mono font-semibold" data-testid="text-area">{formatNum(result.area, 1)}</span> sq units
                {' '}(<span className="font-mono" data-testid="text-area-acres">{formatNum(result.area / 43560, 3)}</span> acres if units are feet)
              </p>
            </CardContent>
          </Card>
        </>
      )}

      <Card className="border-l-4" style={{ borderLeftColor: 'hsl(var(--brass))' }}>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-brass" />
            How this works / exam tip
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>
            Each leg's <strong>latitude</strong> is distance × cos(azimuth) and its <strong>departure</strong> is
            distance × sin(azimuth). In a closed traverse both should sum to zero — whatever is left over is the
            misclosure, and <strong>precision = perimeter ÷ linear misclosure</strong>.
          </p>
          <p>
            The <strong>compass (Bowditch) rule</strong> spreads the misclosure across the legs in proportion to each
            leg's length: correction = −misclosure × (leg length ÷ perimeter). On the exam, watch for questions that
            ask for the correction of a single leg — you rarely need the whole table.
          </p>
          <p>
            Azimuths are measured clockwise from north (0–360°). If a problem gives bearings (e.g. N 45°30' E),
            convert to azimuth first: NE = bearing, SE = 180° − bearing, SW = 180° + bearing, NW = 360° − bearing.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
