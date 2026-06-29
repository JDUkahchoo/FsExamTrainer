import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, Lightbulb } from 'lucide-react';
import { ScientificCalculatorPanel } from '@/components/calculator/scientific-calculator-panel';
import { useCalculator } from '@/components/calculator/calculator-context';

export default function ScientificCalculatorPage() {
  const { open, isOpen } = useCalculator();

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
        <CardContent className="p-4">
          <ScientificCalculatorPanel enableKeyboard={!isOpen} />
        </CardContent>
      </Card>

      <Card className="border-l-4" style={{ borderLeftColor: 'hsl(var(--brass))' }}>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-brass" />
            How this works / exam tip
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>
            Type a full expression (e.g. <code className="font-mono">sin(30)+2*3</code>) and press <strong>=</strong> or Enter.
            Trig functions use whichever <strong>angle mode</strong> is selected — surveying problems are almost always in
            <strong> degrees</strong>, so confirm the mode before computing bearings or angles.
          </p>
          <p>
            Use <strong>2nd</strong> to switch sin/cos/tan to their inverses and ln/log to eˣ/10ˣ. The
            <strong> DMS</strong> tab turns degrees-minutes-seconds into decimal degrees (and back) — do this
            before feeding angles into trig functions.
          </p>
          <p>
            Want it alongside a problem?{' '}
            <button
              type="button"
              className="font-medium text-survey underline underline-offset-2 hover:opacity-80"
              onClick={open}
              data-testid="button-open-floating-calculator"
            >
              Pop out a floating calculator
            </button>{' '}
            that stays on screen while you work through other pages.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
