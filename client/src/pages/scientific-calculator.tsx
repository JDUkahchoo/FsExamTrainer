import { useState, useMemo, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calculator, Compass, Lightbulb } from 'lucide-react';

type AngleMode = 'deg' | 'rad' | 'grad';

interface Tok {
  type: 'num' | 'op' | 'func' | 'lparen' | 'rparen';
  value?: number | string;
}

const FUNCS = ['sin', 'cos', 'tan', 'asin', 'acos', 'atan', 'sqrt', 'log', 'ln', 'exp'];

function tokenize(s: string): Tok[] {
  const tokens: Tok[] = [];
  let i = 0;
  while (i < s.length) {
    const c = s[i];
    if (c === ' ') { i++; continue; }
    if (/[0-9.]/.test(c)) {
      let num = '';
      while (i < s.length && /[0-9.]/.test(s[i])) { num += s[i]; i++; }
      if ((num.match(/\./g) || []).length > 1) throw new Error('Invalid number');
      tokens.push({ type: 'num', value: parseFloat(num) });
      continue;
    }
    if (c === 'π') { tokens.push({ type: 'num', value: Math.PI }); i++; continue; }
    if (/[a-z]/i.test(c)) {
      let name = '';
      while (i < s.length && /[a-z]/i.test(s[i])) { name += s[i]; i++; }
      const ln = name.toLowerCase();
      if (ln === 'pi') { tokens.push({ type: 'num', value: Math.PI }); continue; }
      if (ln === 'e') { tokens.push({ type: 'num', value: Math.E }); continue; }
      if (FUNCS.includes(ln)) { tokens.push({ type: 'func', value: ln }); continue; }
      throw new Error(`Unknown "${name}"`);
    }
    if (c === '×') { tokens.push({ type: 'op', value: '*' }); i++; continue; }
    if (c === '÷') { tokens.push({ type: 'op', value: '/' }); i++; continue; }
    if (c === '−') { tokens.push({ type: 'op', value: '-' }); i++; continue; }
    if ('+-*/^'.includes(c)) { tokens.push({ type: 'op', value: c }); i++; continue; }
    if (c === '(') { tokens.push({ type: 'lparen' }); i++; continue; }
    if (c === ')') { tokens.push({ type: 'rparen' }); i++; continue; }
    if (c === '%') { tokens.push({ type: 'op', value: '*' }); tokens.push({ type: 'num', value: 0.01 }); i++; continue; }
    throw new Error(`Unexpected "${c}"`);
  }
  return tokens;
}

function toRPN(tokens: Tok[]): Tok[] {
  const out: Tok[] = [];
  const stack: Tok[] = [];
  const prec: Record<string, number> = { 'u-': 2, '^': 3, '*': 2, '/': 2, '+': 1, '-': 1 };
  const rightAssoc: Record<string, boolean> = { 'u-': true, '^': true };

  for (let idx = 0; idx < tokens.length; idx++) {
    let t = tokens[idx];
    if (t.type === 'op') {
      const prev = tokens[idx - 1];
      const isUnary = (t.value === '-' || t.value === '+') &&
        (idx === 0 || (prev && (prev.type === 'op' || prev.type === 'lparen')));
      if (isUnary) {
        if (t.value === '+') continue;
        t = { type: 'op', value: 'u-' };
      }
    }
    if (t.type === 'num') {
      out.push(t);
    } else if (t.type === 'func') {
      stack.push(t);
    } else if (t.type === 'op') {
      if (t.value === 'u-') {
        // Prefix unary minus: push directly so it binds looser than ^ on its
        // left ( -2^2 = -(2^2) ) but still applies as the exponent on its right ( 2^-1 ).
        stack.push(t);
      } else {
        while (stack.length) {
          const top = stack[stack.length - 1];
          if (top.type === 'func') { out.push(stack.pop()!); continue; }
          if (top.type === 'op') {
            const p1 = prec[t.value as string];
            const p2 = prec[top.value as string];
            if (rightAssoc[t.value as string] ? p1 < p2 : p1 <= p2) { out.push(stack.pop()!); continue; }
          }
          break;
        }
        stack.push(t);
      }
    } else if (t.type === 'lparen') {
      stack.push(t);
    } else if (t.type === 'rparen') {
      while (stack.length && stack[stack.length - 1].type !== 'lparen') out.push(stack.pop()!);
      if (!stack.length) throw new Error('Mismatched parentheses');
      stack.pop();
      if (stack.length && stack[stack.length - 1].type === 'func') out.push(stack.pop()!);
    }
  }
  while (stack.length) {
    const top = stack.pop()!;
    if (top.type === 'lparen' || top.type === 'rparen') throw new Error('Mismatched parentheses');
    out.push(top);
  }
  return out;
}

function toRad(x: number, mode: AngleMode) {
  return mode === 'deg' ? (x * Math.PI) / 180 : mode === 'grad' ? (x * Math.PI) / 200 : x;
}
function fromRad(x: number, mode: AngleMode) {
  return mode === 'deg' ? (x * 180) / Math.PI : mode === 'grad' ? (x * 200) / Math.PI : x;
}

function applyFunc(name: string, x: number, mode: AngleMode): number {
  switch (name) {
    case 'sin': return Math.sin(toRad(x, mode));
    case 'cos': return Math.cos(toRad(x, mode));
    case 'tan': return Math.tan(toRad(x, mode));
    case 'asin': return fromRad(Math.asin(x), mode);
    case 'acos': return fromRad(Math.acos(x), mode);
    case 'atan': return fromRad(Math.atan(x), mode);
    case 'sqrt': return Math.sqrt(x);
    case 'log': return Math.log10(x);
    case 'ln': return Math.log(x);
    case 'exp': return Math.exp(x);
    default: throw new Error('Bad function');
  }
}

function evalRPN(rpn: Tok[], mode: AngleMode): number {
  const st: number[] = [];
  for (const t of rpn) {
    if (t.type === 'num') {
      st.push(t.value as number);
    } else if (t.type === 'op') {
      if (t.value === 'u-') {
        if (!st.length) throw new Error('Syntax error');
        st.push(-st.pop()!);
        continue;
      }
      const b = st.pop();
      const a = st.pop();
      if (a === undefined || b === undefined) throw new Error('Syntax error');
      switch (t.value) {
        case '+': st.push(a + b); break;
        case '-': st.push(a - b); break;
        case '*': st.push(a * b); break;
        case '/': st.push(a / b); break;
        case '^': st.push(Math.pow(a, b)); break;
        default: throw new Error('Bad operator');
      }
    } else if (t.type === 'func') {
      if (!st.length) throw new Error('Syntax error');
      st.push(applyFunc(t.value as string, st.pop()!, mode));
    }
  }
  if (st.length !== 1) throw new Error('Syntax error');
  const r = st[0];
  if (!isFinite(r)) throw new Error('Math error');
  return r;
}

function evaluate(expr: string, mode: AngleMode): number {
  const tokens = tokenize(expr);
  if (!tokens.length) throw new Error('Empty');
  return evalRPN(toRPN(tokens), mode);
}

function fmt(n: number): string {
  if (Number.isInteger(n)) return n.toString();
  return parseFloat(n.toPrecision(12)).toString();
}

interface KeyDef {
  label: string;
  testId: string;
  onClick: () => void;
  variant?: 'default' | 'secondary' | 'outline' | 'destructive';
  className?: string;
  span2?: boolean;
}

export default function ScientificCalculatorPage() {
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
  }, [append, doEquals, backspace, clearAll]);

  const sciKeys: KeyDef[] = [
    { label: second ? '2nd' : '2nd', testId: 'button-second', onClick: () => setSecond((s) => !s), variant: second ? 'default' : 'outline' },
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

  const renderKey = (k: KeyDef) => (
    <Button
      key={k.testId}
      type="button"
      variant={k.variant || 'default'}
      onClick={k.onClick}
      data-testid={k.testId}
      className={`h-12 text-base font-mono ${k.span2 ? 'col-span-2' : ''} ${k.className || ''}`}
    >
      {k.label}
    </Button>
  );

  return (
    <div className="container max-w-3xl py-6 px-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2 flex items-center gap-2" data-testid="text-page-title">
          <Calculator className="w-7 h-7 text-primary" />
          Scientific Calculator
        </h1>
        <p className="text-muted-foreground" data-testid="text-page-description">
          A practice calculator with the trig, logarithmic, and angle-conversion tools you need for FS/PS computations.
        </p>
      </div>

      <Card className="mb-6">
        <CardContent className="p-4 space-y-4">
          {/* Display */}
          <div className="rounded-md border bg-muted/40 px-4 py-3">
            <div className="min-h-[1.25rem] text-right font-mono text-sm text-muted-foreground break-all" data-testid="text-calc-expression">
              {expr || '\u00A0'}
            </div>
            <div
              className={`text-right font-mono text-3xl font-bold break-all ${preview.error ? 'text-destructive' : 'text-foreground'}`}
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
        </CardContent>
      </Card>

      <DmsConverter />

      <Card className="mt-6 border-l-4" style={{ borderLeftColor: 'hsl(var(--brass))' }}>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-brass" />
            How this works / exam tip
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-1">
          <p>
            Type a full expression (e.g. <code className="font-mono">sin(30)+2*3</code>) and press <strong>=</strong> or Enter.
            Trig functions use whichever <strong>angle mode</strong> is selected — surveying problems are almost always in
            <strong> degrees</strong>, so confirm the mode before computing bearings or angles.
          </p>
          <p>
            Use <strong>2nd</strong> to switch sin/cos/tan to their inverses and ln/log to eˣ/10ˣ. The
            <strong> DMS converter</strong> below turns degrees-minutes-seconds into decimal degrees (and back) — do this
            before feeding angles into trig functions.
          </p>
        </CardContent>
      </Card>
    </div>
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
    const sign = d < 0 || (deg.trim().startsWith('-')) ? -1 : 1;
    const val = Math.abs(d) + Math.abs(m) / 60 + Math.abs(s) / 3600;
    return sign * val;
  }, [deg, min, sec]);

  const dmsResult = useMemo(() => {
    if (dec === '') return null;
    const v = parseFloat(dec);
    if (isNaN(v)) return null;
    const sign = v < 0 ? -1 : 1;
    let abs = Math.abs(v);
    let d = Math.floor(abs);
    let mFloat = (abs - d) * 60;
    let m = Math.floor(mFloat);
    let s = Math.round((mFloat - m) * 60 * 10000) / 10000;
    if (s >= 60) { s -= 60; m += 1; }
    if (m >= 60) { m -= 60; d += 1; }
    return { d: sign * d, m, s, signApplied: sign < 0 && d === 0 };
  }, [dec]);

  return (
    <Card data-testid="card-dms-converter">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <Compass className="w-4 h-4 text-primary" />
          DMS ↔ Decimal Degrees
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6 md:grid-cols-2">
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
      </CardContent>
    </Card>
  );
}
