import { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mountain, Lightbulb, Plus, Trash2, AlertTriangle } from 'lucide-react';

interface LevelRow {
  id: number;
  station: string;
  bs: string;
  fs: string;
}

interface ComputedRow {
  station: string;
  bs: number | null;
  hi: number | null;
  fs: number | null;
  elevation: number;
  correction: number;
  adjElevation: number;
}

type OrderKey = 'first' | 'second' | 'third' | 'construction';

const ORDER_OPTIONS: Record<OrderKey, { label: string; kFt: number; kMm: number }> = {
  // Common US allowable-misclosure constants: C × sqrt(distance in miles) in feet,
  // or the metric equivalent in mm × sqrt(km).
  first: { label: 'First order (0.017 ft√M / 4 mm√K)', kFt: 0.017, kMm: 4 },
  second: { label: 'Second order (0.035 ft√M / 8.4 mm√K)', kFt: 0.035, kMm: 8.4 },
  third: { label: 'Third order (0.05 ft√M / 12 mm√K)', kFt: 0.05, kMm: 12 },
  construction: { label: 'Construction (0.1 ft√M / 24 mm√K)', kFt: 0.1, kMm: 24 },
};

function formatNum(n: number, decimals = 3): string {
  return n.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

let nextRowId = 3;

export default function LevelLoopCalculatorPage() {
  const [startElev, setStartElev] = useState('100.000');
  const [closeElev, setCloseElev] = useState('');
  const [units, setUnits] = useState<'ft' | 'm'>('ft');
  const [order, setOrder] = useState<OrderKey>('third');
  const [loopDistance, setLoopDistance] = useState('');
  const [rows, setRows] = useState<LevelRow[]>([
    { id: 1, station: 'TP1', bs: '', fs: '' },
    { id: 2, station: 'TP2', bs: '', fs: '' },
  ]);

  const addRow = () => setRows(prev => [...prev, { id: nextRowId++, station: `TP${prev.length + 1}`, bs: '', fs: '' }]);
  const removeRow = (id: number) => setRows(prev => (prev.length > 1 ? prev.filter(r => r.id !== id) : prev));
  const updateRow = (id: number, field: keyof Omit<LevelRow, 'id'>, value: string) =>
    setRows(prev => prev.map(r => (r.id === id ? { ...r, [field]: value } : r)));
  const clearAll = () => {
    setRows([
      { id: nextRowId++, station: 'TP1', bs: '', fs: '' },
      { id: nextRowId++, station: 'TP2', bs: '', fs: '' },
    ]);
    setCloseElev('');
    setLoopDistance('');
  };

  const result = useMemo(() => {
    const start = Number(startElev);
    if (startElev.trim() === '' || Number.isNaN(start)) {
      return { status: 'error' as const, message: 'Starting elevation must be a number.' };
    }

    // The run: BM start -> each row is a setup: BS taken on previous point, FS on this row's station.
    // Row i needs a BS (on previous station) and an FS (on its station).
    const anyFilled = rows.some(r => r.bs.trim() !== '' || r.fs.trim() !== '');
    if (!anyFilled) return { status: 'incomplete' as const };

    const parsed: { station: string; bs: number; fs: number }[] = [];
    for (const r of rows) {
      if (r.bs.trim() === '' || r.fs.trim() === '') return { status: 'incomplete' as const };
      const bs = Number(r.bs);
      const fs = Number(r.fs);
      if (Number.isNaN(bs) || Number.isNaN(fs)) {
        return { status: 'error' as const, message: 'Backsight and foresight readings must be numbers.' };
      }
      if (bs < 0 || fs < 0) {
        return { status: 'error' as const, message: 'Rod readings cannot be negative — backsights and foresights must be 0 or greater.' };
      }
      parsed.push({ station: r.station || 'TP', bs, fs });
    }

    const sumBS = parsed.reduce((s, p) => s + p.bs, 0);
    const sumFS = parsed.reduce((s, p) => s + p.fs, 0);

    // Run elevations forward
    let elev = start;
    const computed: ComputedRow[] = [];
    computed.push({ station: 'BM (start)', bs: parsed[0].bs, hi: start + parsed[0].bs, fs: null, elevation: start, correction: 0, adjElevation: start });
    parsed.forEach((p, i) => {
      const hi = elev + p.bs;
      elev = hi - p.fs;
      const nextBs = i + 1 < parsed.length ? parsed[i + 1].bs : null;
      computed.push({
        station: i === parsed.length - 1 ? p.station : p.station,
        bs: nextBs,
        hi: nextBs !== null ? elev + nextBs : null,
        fs: p.fs,
        elevation: elev,
        correction: 0,
        adjElevation: elev,
      });
    });

    // Misclosure vs known closing elevation (default: closed loop back to start)
    const knownClose = closeElev.trim() === '' ? start : Number(closeElev);
    if (Number.isNaN(knownClose)) {
      return { status: 'error' as const, message: 'Closing elevation must be a number (leave blank for a loop back to the start).' };
    }
    const misclosure = elev - knownClose;

    // Distribute correction equally per setup, cumulatively
    const n = parsed.length;
    computed.forEach((row, idx) => {
      if (idx === 0) return;
      const corr = -misclosure * (idx / n);
      row.correction = corr;
      row.adjElevation = row.elevation + corr;
    });

    // Allowable misclosure from selected order + loop distance
    let allowable: number | null = null;
    if (loopDistance.trim() !== '') {
      const dist = Number(loopDistance);
      if (Number.isNaN(dist) || dist <= 0) {
        return { status: 'error' as const, message: `Loop distance must be a positive number of ${units === 'ft' ? 'miles' : 'kilometers'} (or leave it blank).` };
      }
      const k = ORDER_OPTIONS[order];
      allowable = units === 'ft' ? k.kFt * Math.sqrt(dist) : (k.kMm / 1000) * Math.sqrt(dist);
    }

    return { status: 'ok' as const, computed, sumBS, sumFS, misclosure, allowable, knownClose };
  }, [rows, startElev, closeElev, loopDistance, order, units]);

  return (
    <div className="container max-w-4xl py-6 px-4">
      <div className="mb-6">
        <h1 className="font-serif text-2xl font-bold mb-2 flex items-center gap-2" data-testid="text-page-title">
          <Mountain className="w-7 h-7 text-primary" />
          Level-Loop Calculator
        </h1>
        <p className="text-muted-foreground" data-testid="text-page-description">
          Run a differential leveling loop: enter backsights and foresights, check the misclosure against an accuracy
          standard, and distribute the correction.
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-serif">Leveling Run</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-3 items-end">
            <div>
              <label className="text-xs text-muted-foreground block mb-1">Start BM elevation</label>
              <Input value={startElev} onChange={e => setStartElev(e.target.value)} className="w-32 font-mono" inputMode="decimal" data-testid="input-start-elevation" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground block mb-1">Closing elevation (blank = loop)</label>
              <Input value={closeElev} onChange={e => setCloseElev(e.target.value)} placeholder="same as start" className="w-40 font-mono" inputMode="decimal" data-testid="input-close-elevation" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground block mb-1">Units</label>
              <Select value={units} onValueChange={v => setUnits(v as 'ft' | 'm')}>
                <SelectTrigger className="w-24" data-testid="select-units">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ft">feet</SelectItem>
                  <SelectItem value="m">meters</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-muted-foreground">
                  <th className="pb-2 pr-2">Turning point</th>
                  <th className="pb-2 pr-2">BS (+) on previous point</th>
                  <th className="pb-2 pr-2">FS (−) on this point</th>
                  <th className="pb-2" />
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={row.id} data-testid={`row-level-${i}`}>
                    <td className="py-1 pr-2">
                      <Input value={row.station} onChange={e => updateRow(row.id, 'station', e.target.value)} className="w-28 font-mono" data-testid={`input-station-${i}`} />
                    </td>
                    <td className="py-1 pr-2">
                      <Input value={row.bs} onChange={e => updateRow(row.id, 'bs', e.target.value)} placeholder="e.g. 4.52" className="w-28 font-mono" inputMode="decimal" data-testid={`input-bs-${i}`} />
                    </td>
                    <td className="py-1 pr-2">
                      <Input value={row.fs} onChange={e => updateRow(row.id, 'fs', e.target.value)} placeholder="e.g. 3.18" className="w-28 font-mono" inputMode="decimal" data-testid={`input-fs-${i}`} />
                    </td>
                    <td className="py-1">
                      <Button variant="ghost" size="icon" onClick={() => removeRow(row.id)} disabled={rows.length <= 1} aria-label={`Remove row ${i + 1}`} data-testid={`button-remove-row-${i}`}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={addRow} data-testid="button-add-row">
              <Plus className="w-4 h-4 mr-1" /> Add Turning Point
            </Button>
            <Button variant="ghost" size="sm" onClick={clearAll} data-testid="button-clear-rows">
              Clear All
            </Button>
          </div>

          <div className="flex flex-wrap gap-3 items-end pt-2 border-t border-border/60">
            <div>
              <label className="text-xs text-muted-foreground block mb-1">
                Loop distance ({units === 'ft' ? 'miles' : 'km'}) — optional
              </label>
              <Input value={loopDistance} onChange={e => setLoopDistance(e.target.value)} placeholder={units === 'ft' ? 'e.g. 1.5' : 'e.g. 2.4'} className="w-32 font-mono" inputMode="decimal" data-testid="input-loop-distance" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground block mb-1">Accuracy standard</label>
              <Select value={order} onValueChange={v => setOrder(v as OrderKey)}>
                <SelectTrigger className="w-72" data-testid="select-order">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(Object.keys(ORDER_OPTIONS) as OrderKey[]).map(k => (
                    <SelectItem key={k} value={k}>{ORDER_OPTIONS[k].label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {result.status === 'error' && (
            <Alert variant="destructive" data-testid="alert-level-error">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{result.message}</AlertDescription>
            </Alert>
          )}
          {result.status === 'incomplete' && (
            <p className="text-xs text-muted-foreground" data-testid="text-level-incomplete">
              Enter a backsight and foresight for every turning point to see the results.
            </p>
          )}
        </CardContent>
      </Card>

      {result.status === 'ok' && (
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-serif">Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="label-coord text-[10px] text-muted-foreground">ΣBS − ΣFS</div>
                <div className="font-mono text-lg" data-testid="text-sum-check">{formatNum(result.sumBS - result.sumFS)}</div>
              </div>
              <div>
                <div className="label-coord text-[10px] text-muted-foreground">Misclosure</div>
                <div className="font-mono text-lg" data-testid="text-level-misclosure">{formatNum(result.misclosure)} {units}</div>
              </div>
              <div>
                <div className="label-coord text-[10px] text-muted-foreground">Allowable</div>
                <div className="font-mono text-lg" data-testid="text-allowable">
                  {result.allowable !== null ? `±${formatNum(result.allowable)} ${units}` : '—'}
                </div>
              </div>
              <div>
                <div className="label-coord text-[10px] text-muted-foreground">Verdict</div>
                <div data-testid="badge-level-verdict">
                  {result.allowable === null ? (
                    <Badge variant="outline">Enter loop distance</Badge>
                  ) : Math.abs(result.misclosure) <= result.allowable ? (
                    <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 border-green-300 dark:border-green-800">Within tolerance</Badge>
                  ) : (
                    <Badge className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 border-red-300 dark:border-red-800">Exceeds tolerance — rerun</Badge>
                  )}
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm font-mono">
                <thead>
                  <tr className="text-left text-xs text-muted-foreground font-sans">
                    <th className="pb-2 pr-3">Station</th>
                    <th className="pb-2 pr-3">BS (+)</th>
                    <th className="pb-2 pr-3">HI</th>
                    <th className="pb-2 pr-3">FS (−)</th>
                    <th className="pb-2 pr-3">Elevation</th>
                    <th className="pb-2 pr-3">Correction</th>
                    <th className="pb-2">Adj. Elevation</th>
                  </tr>
                </thead>
                <tbody>
                  {result.computed.map((c, i) => (
                    <tr key={i} className="border-t border-border/60" data-testid={`row-result-${i}`}>
                      <td className="py-1.5 pr-3">{c.station}</td>
                      <td className="py-1.5 pr-3">{c.bs !== null ? formatNum(c.bs) : ''}</td>
                      <td className="py-1.5 pr-3">{c.hi !== null ? formatNum(c.hi) : ''}</td>
                      <td className="py-1.5 pr-3">{c.fs !== null ? formatNum(c.fs) : ''}</td>
                      <td className="py-1.5 pr-3" data-testid={`text-elevation-${i}`}>{formatNum(c.elevation)}</td>
                      <td className="py-1.5 pr-3">{i === 0 ? '' : formatNum(c.correction)}</td>
                      <td className="py-1.5" data-testid={`text-adj-elevation-${i}`}>{formatNum(c.adjElevation)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
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
            Each setup: <strong>HI = elevation + backsight</strong>, then <strong>new elevation = HI − foresight</strong>.
            The quick arithmetic check is <strong>ΣBS − ΣFS = ending elevation − starting elevation</strong> — the exam loves
            this shortcut.
          </p>
          <p>
            <strong>Misclosure</strong> = computed closing elevation − known closing elevation. Allowable misclosure is
            C × √(distance): e.g. third order allows 0.05 ft × √miles (or 12 mm × √km). The correction is distributed
            in proportion to distance run — here it's spread evenly per setup, which is the standard exam assumption
            when setup distances are equal.
          </p>
          <p>
            Sign tips: backsights are <strong>plus</strong> readings (you add them), foresights are <strong>minus</strong>.
            A positive misclosure means your run came out high, so corrections are subtracted.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
