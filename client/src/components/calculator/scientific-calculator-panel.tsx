import { useState, useMemo, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { evaluate, fmt, type AngleMode } from '@/lib/calculator-engine';

interface KeyDef {
  label: string;
  testId: string;
  onClick: () => void;
  variant?: 'default' | 'secondary' | 'outline' | 'destructive';
  className?: string;
  span2?: boolean;
}

interface PanelProps {
  /** Smaller keys/spacing for the floating widget. */
  compact?: boolean;
  /** Whether this panel responds to physical keyboard input (only one panel should at a time). */
  enableKeyboard?: boolean;
}

export function ScientificCalculatorPanel({ compact = false, enableKeyboard = true }: PanelProps) {
  const [expr, setExpr] = useState('');
  const [mode, setMode] = useState<AngleMode>('deg');
  const [second, setSecond] = useState(false);
  const [justEvaluated, setJustEvaluated] = useState(false);

  const append = useCallback((tok: string) => {
    setExpr((e) => {
      if (justEvaluated && /[0-9.]/.test(tok)) {
        setJustEvaluated(false);
        return tok;
      }
      setJustEvaluated(false);
      return e + tok;
    });
  }, [justEvaluated]);

  const clearAll = useCallback(() => { setExpr(''); setJustEvaluated(false); }, []);
  const backspace = useCallback(() => {
    setExpr((e) => e.slice(0, -1));
    setJustEvaluated(false);
  }, []);

  const toggleSign = useCallback(() => {
    setExpr((e) => {
      if (!e) return e;
      if (e.startsWith('-(') && e.endsWith(')')) return e.slice(2, -1);
      return `-(${e})`;
    });
    setJustEvaluated(false);
  }, []);

  const preview = useMemo(() => {
    if (!expr.trim()) return { value: '0', error: false };
    try {
      return { value: fmt(evaluate(expr, mode)), error: false };
    } catch {
      return { value: '', error: true };
    }
  }, [expr, mode]);

  const doEquals = useCallback(() => {
    if (!expr.trim()) return;
    try {
      const r = fmt(evaluate(expr, mode));
      setExpr(r);
      setJustEvaluated(true);
    } catch {
      setJustEvaluated(false);
    }
  }, [expr, mode]);

  useEffect(() => {
    if (!enableKeyboard) return;
    const handler = (e: KeyboardEvent) => {
      const tag = (document.activeElement?.tagName || '').toLowerCase();
      if (tag === 'input' || tag === 'textarea') return;
      const k = e.key;
      if (/^[0-9]$/.test(k)) { append(k); e.preventDefault(); }
      else if (k === '.') { append('.'); e.preventDefault(); }
      else if (k === '+') { append('+'); e.preventDefault(); }
      else if (k === '-') { append('−'); e.preventDefault(); }
      else if (k === '*') { append('×'); e.preventDefault(); }
      else if (k === '/') { append('÷'); e.preventDefault(); }
      else if (k === '^') { append('^'); e.preventDefault(); }
      else if (k === '(') { append('('); e.preventDefault(); }
      else if (k === ')') { append(')'); e.preventDefault(); }
      else if (k === 'Enter' || k === '=') { doEquals(); e.preventDefault(); }
      else if (k === 'Backspace') { backspace(); e.preventDefault(); }
      else if (k === 'Escape') { clearAll(); e.preventDefault(); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [enableKeyboard, append, doEquals, backspace, clearAll]);

  const sciKeys: KeyDef[] = [
    { label: '2nd', testId: 'button-second', onClick: () => setSecond((s) => !s), variant: second ? 'default' : 'outline' },
    { label: 'C', testId: 'button-clear', onClick: clearAll, variant: 'destructive' },
    { label: '⌫', testId: 'button-backspace', onClick: backspace, variant: 'secondary' },
    { label: '(', testId: 'button-lparen', onClick: () => append('('), variant: 'secondary' },
    { label: ')', testId: 'button-rparen', onClick: () => append(')'), variant: 'secondary' },

    { label: second ? 'sin⁻¹' : 'sin', testId: 'button-func-sin', onClick: () => append(second ? 'asin(' : 'sin('), variant: 'outline' },
    { label: second ? 'cos⁻¹' : 'cos', testId: 'button-func-cos', onClick: () => append(second ? 'acos(' : 'cos('), variant: 'outline' },
    { label: second ? 'tan⁻¹' : 'tan', testId: 'button-func-tan', onClick: () => append(second ? 'atan(' : 'tan('), variant: 'outline' },
    { label: '^', testId: 'button-power', onClick: () => append('^'), variant: 'outline' },
    { label: '√', testId: 'button-sqrt', onClick: () => append('sqrt('), variant: 'outline' },

    { label: second ? 'eˣ' : 'ln', testId: 'button-func-ln', onClick: () => append(second ? 'exp(' : 'ln('), variant: 'outline' },
    { label: second ? '10ˣ' : 'log', testId: 'button-func-log', onClick: () => append(second ? '10^' : 'log('), variant: 'outline' },
    { label: 'π', testId: 'button-pi', onClick: () => append('π'), variant: 'outline' },
    { label: 'e', testId: 'button-e', onClick: () => append('e'), variant: 'outline' },
    { label: 'x²', testId: 'button-square', onClick: () => append('^2'), variant: 'outline' },
  ];

  const numKeys: KeyDef[] = [
    { label: '7', testId: 'button-digit-7', onClick: () => append('7') },
    { label: '8', testId: 'button-digit-8', onClick: () => append('8') },
    { label: '9', testId: 'button-digit-9', onClick: () => append('9') },
    { label: '÷', testId: 'button-op-divide', onClick: () => append('÷'), variant: 'secondary' },
    { label: 'x⁻¹', testId: 'button-reciprocal', onClick: () => append('^-1'), variant: 'secondary' },

    { label: '4', testId: 'button-digit-4', onClick: () => append('4') },
    { label: '5', testId: 'button-digit-5', onClick: () => append('5') },
    { label: '6', testId: 'button-digit-6', onClick: () => append('6') },
    { label: '×', testId: 'button-op-multiply', onClick: () => append('×'), variant: 'secondary' },
    { label: '%', testId: 'button-percent', onClick: () => append('%'), variant: 'secondary' },

    { label: '1', testId: 'button-digit-1', onClick: () => append('1') },
    { label: '2', testId: 'button-digit-2', onClick: () => append('2') },
    { label: '3', testId: 'button-digit-3', onClick: () => append('3') },
    { label: '−', testId: 'button-op-subtract', onClick: () => append('−'), variant: 'secondary' },
    { label: '+', testId: 'button-op-add', onClick: () => append('+'), variant: 'secondary' },

    { label: '0', testId: 'button-digit-0', onClick: () => append('0') },
    { label: '.', testId: 'button-decimal', onClick: () => append('.') },
    { label: '±', testId: 'button-sign', onClick: toggleSign, variant: 'secondary' },
    { label: '=', testId: 'button-equals', onClick: doEquals, variant: 'default', className: 'bg-survey text-zinc-950 hover:bg-survey/90', span2: true },
  ];

  const keyHeight = compact ? 'h-9 text-sm' : 'h-12 text-base';

  const renderKey = (k: KeyDef) => (
    <Button
      key={k.testId}
      type="button"
      variant={k.variant || 'default'}
      onClick={k.onClick}
      data-testid={k.testId}
      className={`${keyHeight} font-mono ${k.span2 ? 'col-span-2' : ''} ${k.className || ''}`}
    >
      {k.label}
    </Button>
  );

  return (
    <Tabs defaultValue="calc" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="calc" data-testid="tab-calculator">Calculator</TabsTrigger>
        <TabsTrigger value="dms" data-testid="tab-dms">DMS ↔ Decimal</TabsTrigger>
      </TabsList>

      <TabsContent value="calc" className="space-y-3 mt-3">
        {/* Display */}
        <div className="rounded-md border bg-muted/40 px-4 py-3">
          <div className="min-h-[1.25rem] text-right font-mono text-sm text-muted-foreground break-all" data-testid="text-calc-expression">
            {expr || '\u00A0'}
          </div>
          <div
            className={`text-right font-mono ${compact ? 'text-2xl' : 'text-3xl'} font-bold break-all ${preview.error ? 'text-destructive' : 'text-foreground'}`}
            data-testid="text-calc-result"
          >
            {preview.error ? 'Error' : preview.value}
          </div>
        </div>

        {/* Angle mode */}
        <div className="flex items-center gap-2">
          <span className="label-coord text-[10px] text-muted-foreground">Angle</span>
          <div className="flex rounded-md border overflow-hidden">
            {(['deg', 'rad', 'grad'] as AngleMode[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                data-testid={`button-mode-${m}`}
                className={`px-3 py-1 text-xs font-mono uppercase transition-colors ${
                  mode === m ? 'bg-primary text-primary-foreground' : 'bg-transparent text-muted-foreground hover-elevate'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
          {second && (
            <span className="label-coord ml-auto text-[10px] text-survey" data-testid="text-second-active">2nd</span>
          )}
        </div>

        {/* Scientific keys */}
        <div className="grid grid-cols-5 gap-2">
          {sciKeys.map(renderKey)}
        </div>
        {/* Number + operator keys */}
        <div className="grid grid-cols-5 gap-2">
          {numKeys.map(renderKey)}
        </div>
      </TabsContent>

      <TabsContent value="dms" className="mt-3">
        <DmsConverter />
      </TabsContent>
    </Tabs>
  );
}

function DmsConverter() {
  const [deg, setDeg] = useState('');
  const [min, setMin] = useState('');
  const [sec, setSec] = useState('');
  const [dec, setDec] = useState('');

  const decimalResult = useMemo(() => {
    if (deg === '' && min === '' && sec === '') return null;
    const d = parseFloat(deg || '0');
    const m = parseFloat(min || '0');
    const s = parseFloat(sec || '0');
    if ([d, m, s].some((v) => isNaN(v))) return null;
    const sign = d < 0 || deg.trim().startsWith('-') ? -1 : 1;
    const val = Math.abs(d) + Math.abs(m) / 60 + Math.abs(s) / 3600;
    return sign * val;
  }, [deg, min, sec]);

  const dmsResult = useMemo(() => {
    if (dec === '') return null;
    const v = parseFloat(dec);
    if (isNaN(v)) return null;
    const sign = v < 0 ? -1 : 1;
    const abs = Math.abs(v);
    let d = Math.floor(abs);
    const mFloat = (abs - d) * 60;
    let m = Math.floor(mFloat);
    let s = Math.round((mFloat - m) * 60 * 10000) / 10000;
    if (s >= 60) { s -= 60; m += 1; }
    if (m >= 60) { m -= 60; d += 1; }
    return { d: sign * d, m, s, signApplied: sign < 0 && d === 0 };
  }, [dec]);

  return (
    <div className="space-y-5" data-testid="card-dms-converter">
      {/* DMS -> Decimal */}
      <div className="space-y-3">
        <p className="label-coord text-[10px] text-muted-foreground">DMS → Decimal</p>
        <div className="grid grid-cols-3 gap-2">
          <div className="space-y-1">
            <Label htmlFor="dms-deg" className="text-xs">Degrees</Label>
            <Input id="dms-deg" inputMode="numeric" value={deg} onChange={(e) => setDeg(e.target.value)} placeholder="0" data-testid="input-dms-deg" className="font-mono" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="dms-min" className="text-xs">Minutes</Label>
            <Input id="dms-min" inputMode="numeric" value={min} onChange={(e) => setMin(e.target.value)} placeholder="0" data-testid="input-dms-min" className="font-mono" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="dms-sec" className="text-xs">Seconds</Label>
            <Input id="dms-sec" inputMode="decimal" value={sec} onChange={(e) => setSec(e.target.value)} placeholder="0" data-testid="input-dms-sec" className="font-mono" />
          </div>
        </div>
        <div className="rounded-md border bg-muted/40 px-3 py-2">
          <span className="text-xs text-muted-foreground">Decimal degrees: </span>
          <span className="font-mono font-semibold" data-testid="text-dms-decimal-result">
            {decimalResult === null ? '—' : fmt(parseFloat(decimalResult.toPrecision(10))) + '°'}
          </span>
        </div>
      </div>

      {/* Decimal -> DMS */}
      <div className="space-y-3">
        <p className="label-coord text-[10px] text-muted-foreground">Decimal → DMS</p>
        <div className="space-y-1">
          <Label htmlFor="dec-deg" className="text-xs">Decimal degrees</Label>
          <Input id="dec-deg" inputMode="decimal" value={dec} onChange={(e) => setDec(e.target.value)} placeholder="0.0" data-testid="input-decimal-deg" className="font-mono" />
        </div>
        <div className="rounded-md border bg-muted/40 px-3 py-2">
          <span className="text-xs text-muted-foreground">DMS: </span>
          <span className="font-mono font-semibold" data-testid="text-dms-result">
            {dmsResult === null
              ? '—'
              : `${dmsResult.signApplied ? '-' : ''}${dmsResult.d}° ${Math.abs(dmsResult.m)}' ${Math.abs(dmsResult.s)}"`}
          </span>
        </div>
      </div>
    </div>
  );
}
