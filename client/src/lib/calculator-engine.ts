export type AngleMode = 'deg' | 'rad' | 'grad';

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

export function evaluate(expr: string, mode: AngleMode): number {
  const tokens = tokenize(expr);
  if (!tokens.length) throw new Error('Empty');
  return evalRPN(toRPN(tokens), mode);
}

export function fmt(n: number): string {
  if (Number.isInteger(n)) return n.toString();
  return parseFloat(n.toPrecision(12)).toString();
}
