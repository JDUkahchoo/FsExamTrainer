import { useState, useMemo, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useExamTrack } from '@/contexts/exam-track-context';
import {
  Search,
  Calculator,
  Ruler,
  Compass,
  MapPin,
  Scale,
  BarChart3,
  Globe,
  Landmark,
  Download,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface Formula {
  name: string;
  expression: string;
  variables: string;
  tip: string;
  exam: 'fs' | 'ps' | 'both';
}

interface FormulaDomain {
  id: string;
  name: string;
  icon: typeof Calculator;
  colorVar: string;
  formulas: Formula[];
}

const FORMULA_DOMAINS: FormulaDomain[] = [
  {
    id: 'math',
    name: 'Math & Basic Science',
    icon: Calculator,
    colorVar: '--domain-math',
    formulas: [
      { name: 'Area of Triangle', expression: 'A = \u00BDbh', variables: 'A = area, b = base, h = height', tip: 'Basic geometry - appears in area calculation problems', exam: 'fs' },
      { name: 'Pythagorean Theorem', expression: 'c\u00B2 = a\u00B2 + b\u00B2', variables: 'c = hypotenuse, a, b = legs', tip: 'Used in distance/traverse calculations constantly', exam: 'fs' },
      { name: 'Quadratic Formula', expression: 'x = (-b \u00B1 \u221A(b\u00B2-4ac)) / 2a', variables: 'a, b, c = coefficients of ax\u00B2+bx+c=0', tip: 'Needed for vertical curve and intersection problems', exam: 'fs' },
      { name: 'Standard Deviation', expression: '\u03C3 = \u221A(\u03A3(xi-x\u0304)\u00B2/(n-1))', variables: '\u03C3 = std dev, xi = observations, x\u0304 = mean, n = count', tip: 'Sample std dev uses n-1; population uses n', exam: 'fs' },
      { name: 'Standard Error of Mean', expression: '\u03C3m = \u03C3/\u221An', variables: '\u03C3m = std error, \u03C3 = std dev, n = sample size', tip: 'Decreases as sample size increases', exam: 'fs' },
      { name: 'Error Propagation (Sum)', expression: '\u03C3total = \u221A(\u03C3\u2081\u00B2 + \u03C3\u2082\u00B2 + ...)', variables: '\u03C3total = combined error, \u03C3i = individual errors', tip: 'Errors add in quadrature, not linearly', exam: 'fs' },
      { name: '95% Confidence Interval', expression: 'x\u0304 \u00B1 1.96\u03C3m', variables: 'x\u0304 = mean, \u03C3m = std error of mean', tip: '1.96 for 95%; 2.576 for 99%; 1.645 for 90%', exam: 'fs' },
    ],
  },
  {
    id: 'field',
    name: 'Field Data Acquisition',
    icon: Ruler,
    colorVar: '--domain-field',
    formulas: [
      { name: 'Temperature Correction', expression: 'Ct = \u03B1\u00B7\u0394T\u00B7L', variables: '\u03B1 = 0.00000645/\u00B0F (steel), \u0394T = temp diff, L = length', tip: 'Positive when warmer than standard (68\u00B0F)', exam: 'fs' },
      { name: 'Tension Correction', expression: 'Cp = (P-Ps)\u00B7L / (A\u00B7E)', variables: 'P = applied tension, Ps = standard tension, A = cross-section area, E = modulus', tip: 'Positive when applied tension > standard tension', exam: 'fs' },
      { name: 'Sag Correction', expression: 'Cs = -w\u00B2\u00B7L\u00B3 / (24\u00B7P\u00B2)', variables: 'w = weight/unit length, L = span, P = tension', tip: 'Always negative - tape sags below true line', exam: 'fs' },
      { name: 'Curvature & Refraction', expression: 'C&R = 0.0206\u00B7F\u00B2 (ft) or 0.0675\u00B7M\u00B2 (m)', variables: 'F = distance in thousands of feet, M = distance in km', tip: 'Combined C&R; curvature alone = 0.0239F\u00B2', exam: 'fs' },
      { name: 'Stadia Distance', expression: 'D = K\u00B7s + C', variables: 'K = stadia interval factor (typically 100), s = rod intercept, C = instrument constant', tip: 'For inclined sights: D = K\u00B7s\u00B7cos\u00B2(\u03B1)', exam: 'fs' },
      { name: 'Differential Leveling', expression: 'HI = Elev + BS; Elev = HI - FS', variables: 'HI = height of instrument, BS = backsight, FS = foresight', tip: 'BS adds to known elevation; FS subtracts from HI', exam: 'fs' },
      { name: 'Trigonometric Leveling', expression: '\u0394Elev = SD\u00B7cos(zenith angle)', variables: 'SD = slope distance, zenith angle from vertical', tip: 'Use vertical angle from horizontal: \u0394Elev = SD\u00B7sin(\u03B1)', exam: 'fs' },
      { name: 'Reciprocal Leveling', expression: 'True \u0394H = (\u0394H_AB + \u0394H_BA) / 2', variables: '\u0394H_AB = elev diff A\u2192B, \u0394H_BA = elev diff B\u2192A', tip: 'Eliminates curvature and refraction errors across wide gaps', exam: 'fs' },
    ],
  },
  {
    id: 'computations',
    name: 'Survey Computations & Applications',
    icon: Compass,
    colorVar: '--domain-plane',
    formulas: [
      { name: 'Latitude', expression: 'Lat = D\u00B7cos(bearing)', variables: 'D = distance, bearing = direction from N or S', tip: 'North latitudes are positive, South are negative', exam: 'fs' },
      { name: 'Departure', expression: 'Dep = D\u00B7sin(bearing)', variables: 'D = distance, bearing = direction from N or S', tip: 'East departures are positive, West are negative', exam: 'fs' },
      { name: 'Traverse Closure', expression: 'Linear error = \u221A(\u03A3Lat\u00B2 + \u03A3Dep\u00B2)', variables: '\u03A3Lat = sum of latitudes, \u03A3Dep = sum of departures', tip: 'Should be zero for a closed traverse; difference is misclosure', exam: 'fs' },
      { name: 'Precision Ratio', expression: '1:(total distance / linear error)', variables: 'total distance = perimeter, linear error = misclosure', tip: 'Higher ratio = better precision (e.g., 1:10,000)', exam: 'fs' },
      { name: 'Inverse Distance', expression: 'D = \u221A(\u0394N\u00B2 + \u0394E\u00B2)', variables: '\u0394N = northing diff, \u0394E = easting diff', tip: 'Compute distance from coordinate differences', exam: 'fs' },
      { name: 'Inverse Azimuth', expression: 'Az = arctan(\u0394E/\u0394N)', variables: '\u0394E = easting diff, \u0394N = northing diff', tip: 'Adjust quadrant based on signs of \u0394E and \u0394N', exam: 'fs' },
      { name: 'Area by Coordinates', expression: '2A = \u03A3(Ni(Ei+1 - Ei-1))', variables: 'N = northing, E = easting at each vertex', tip: 'Also called the cross-coordinate or shoelace method', exam: 'fs' },
      { name: 'Area by DMD', expression: '2A = \u03A3(DMD \u00D7 Lat)', variables: 'DMD = double meridian distance, Lat = adjusted latitude', tip: 'First DMD = first departure; subsequent DMD = prev DMD + prev dep + current dep', exam: 'fs' },
      { name: 'Degree of Curve', expression: 'D = 5729.578/R', variables: 'D = degree of curve, R = radius', tip: 'Arc definition (highway); chord def uses different formula', exam: 'fs' },
      { name: 'Tangent Distance', expression: 'T = R\u00B7tan(\u0394/2)', variables: 'R = radius, \u0394 = deflection angle', tip: 'Distance from PI to PC or PT', exam: 'fs' },
      { name: 'Curve Length', expression: 'L = R\u00B7\u0394\u00B7\u03C0/180', variables: 'R = radius, \u0394 = deflection angle in degrees', tip: 'Arc length along the curve from PC to PT', exam: 'fs' },
      { name: 'External Distance', expression: 'E = R(sec(\u0394/2) - 1)', variables: 'R = radius, \u0394 = deflection angle', tip: 'Distance from PI to midpoint of curve', exam: 'fs' },
      { name: 'Middle Ordinate', expression: 'M = R(1 - cos(\u0394/2))', variables: 'R = radius, \u0394 = deflection angle', tip: 'Distance from midpoint of long chord to midpoint of curve', exam: 'fs' },
      { name: 'Long Chord', expression: 'LC = 2R\u00B7sin(\u0394/2)', variables: 'R = radius, \u0394 = deflection angle', tip: 'Straight-line distance from PC to PT', exam: 'fs' },
      { name: 'Vertical Curve Elevation', expression: 'y = (g2-g1)\u00B7x\u00B2/(2L) + g1\u00B7x + Elev_PVC', variables: 'g1,g2 = grades (%), x = distance from PVC, L = curve length', tip: 'Parabolic equation; grades as decimals or % (be consistent)', exam: 'fs' },
      { name: 'High/Low Point on Vertical Curve', expression: 'x = -g1\u00B7L/(g2-g1)', variables: 'g1 = entering grade, g2 = leaving grade, L = curve length', tip: 'Only exists when grades have opposite signs (sag or crest)', exam: 'fs' },
      { name: 'Photo Scale', expression: 'S = f/(H-h)', variables: 'f = focal length, H = flying height, h = ground elevation', tip: 'Scale at a point; varies with terrain elevation', exam: 'fs' },
      { name: 'Relief Displacement', expression: 'd = h\u00B7r/H', variables: 'h = object height, r = radial distance on photo, H = flying height above datum', tip: 'Objects lean away from photo center; displacement is radial', exam: 'fs' },
      { name: 'Flying Height', expression: 'H = f/S', variables: 'f = focal length, S = photo scale (as fraction)', tip: 'H is above mean ground elevation', exam: 'fs' },
    ],
  },
  {
    id: 'statistics',
    name: 'Applied Mathematics & Statistics',
    icon: BarChart3,
    colorVar: '--domain-math',
    formulas: [
      { name: 'Least Squares Adjustment', expression: 'x = (A\u1D40WA)\u207B\u00B9A\u1D40WL', variables: 'A = design matrix, W = weight matrix, L = observation vector', tip: 'Gold standard for survey adjustment; minimizes sum of weighted residuals squared', exam: 'fs' },
      { name: 'Chi-Square Test', expression: '\u03C7\u00B2 = \u03A3(O-E)\u00B2/E', variables: 'O = observed values, E = expected values', tip: 'Tests goodness of fit; compare to critical value from table', exam: 'fs' },
      { name: 'Weight of Observation', expression: 'w = 1/\u03C3\u00B2', variables: 'w = weight, \u03C3 = standard deviation of observation', tip: 'More precise observations get higher weight', exam: 'fs' },
      { name: 'Weighted Mean', expression: 'x\u0304w = \u03A3(wi\u00B7xi)/\u03A3wi', variables: 'wi = weight of ith observation, xi = ith observation', tip: 'Use when observations have different precisions', exam: 'fs' },
    ],
  },
  {
    id: 'principles',
    name: 'Surveying Principles',
    icon: Globe,
    colorVar: '--domain-geodesy',
    formulas: [
      { name: 'Map Scale', expression: '1:S = map distance / ground distance', variables: 'S = scale denominator', tip: '1:24,000 means 1 inch on map = 24,000 inches on ground', exam: 'fs' },
      { name: 'Survey Foot Conversion', expression: '1 m = 39.37 inches (exactly)', variables: 'US Survey foot = 1200/3937 m', tip: 'Different from international foot (0.3048 m exactly); being phased out 2023+', exam: 'fs' },
      { name: 'Grid Scale Factor (SPC/UTM)', expression: 'grid distance = ground distance \u00D7 scale factor', variables: 'scale factor varies by position in zone', tip: 'SF < 1 between standard parallels/meridians; > 1 outside', exam: 'fs' },
      { name: 'Combined Factor', expression: 'CF = scale factor \u00D7 elevation factor', variables: 'CF = combined factor', tip: 'Converts ground distance to grid distance in one step', exam: 'fs' },
      { name: 'Elevation Factor', expression: 'EF = R/(R + h)', variables: 'R = earth radius (~6,371,000 m), h = elevation above ellipsoid', tip: 'Always < 1; reduces distance to ellipsoid surface', exam: 'fs' },
    ],
  },
  {
    id: 'boundary',
    name: 'Boundary Law & PLSS',
    icon: MapPin,
    colorVar: '--domain-boundary',
    formulas: [
      { name: 'PLSS Section', expression: '1 section = 640 acres = 1 sq mile', variables: '36 sections per township', tip: 'Sections numbered 1-36 in serpentine pattern starting NE corner', exam: 'both' },
      { name: 'Quarter Section', expression: '1/4 section = 160 acres', variables: 'NE\u00BC, NW\u00BC, SE\u00BC, SW\u00BC', tip: 'Original homestead unit; read legal descriptions from inside out', exam: 'both' },
      { name: 'Quarter-Quarter Section', expression: '1/16 section = 40 acres', variables: 'e.g., NE\u00BC of NW\u00BC', tip: 'Smallest standard PLSS subdivision', exam: 'both' },
    ],
  },
  {
    id: 'ps-boundary',
    name: 'PS Boundary & Legal Principles',
    icon: Scale,
    colorVar: '--domain-boundary',
    formulas: [
      { name: 'Statute of Limitations', expression: 'Varies by state (typically 5-21 years)', variables: 'Period for adverse possession, prescriptive easements', tip: 'Know your state\'s specific time period; continuous, hostile, open, notorious', exam: 'ps' },
      { name: 'Boundary by Acquiescence Elements', expression: '1) Long acquiescence 2) Mutual recognition 3) Identifiable line 4) For statutory period', variables: 'All four elements must be present', tip: 'Different from adverse possession - requires mutual recognition by both parties', exam: 'ps' },
      { name: 'ALTA/NSPS RPP Requirements', expression: 'Relative Positional Precision \u2264 0.07 ft (2cm)', variables: 'RPP = positional uncertainty of any point relative to any other point', tip: 'This is the accuracy standard, not the measurement precision', exam: 'ps' },
      { name: 'Evidence Hierarchy', expression: '1) Natural monuments 2) Artificial monuments 3) Record bearings/distances 4) Area', variables: 'Higher priority evidence controls over lower', tip: 'Monument over course over distance over area - critical for PS exam', exam: 'ps' },
      { name: 'Single Proportion (Lost Corner)', expression: 'Position = proportional distance between two found corners', variables: 'Used when corner is on a line between two existing corners', tip: 'For interior section corners on established lines', exam: 'ps' },
      { name: 'Double Proportion (Lost Corner)', expression: 'Position = proportional from 4 directions (N-S and E-W)', variables: 'Used for interior corners not on established lines', tip: 'Standard method for restoring lost interior section corners per BLM Manual', exam: 'ps' },
      { name: 'Proportionate Measurement', expression: 'Corrected = (record/total record) \u00D7 total measured', variables: 'record = original platted distance, measured = current field distance', tip: 'Distributes excess or deficiency proportionally among lots', exam: 'ps' },
      { name: 'Riparian Rights - Thread of Stream', expression: 'Boundary follows center (thread) of non-navigable stream', variables: 'Navigable waters: boundary at ordinary high water mark', tip: 'Accretion/reliction shifts boundary; avulsion does not', exam: 'ps' },
      { name: 'Parol Evidence Rule', expression: 'Written deed terms cannot be contradicted by oral evidence', variables: 'Exceptions: ambiguity, fraud, mistake', tip: 'Written documents prevail; but monuments on ground may override description', exam: 'ps' },
      { name: 'Priority of Calls - Metes & Bounds', expression: '1) Natural monuments 2) Artificial monuments 3) Adjoiners 4) Courses 5) Distances 6) Area', variables: 'Full hierarchy for metes and bounds descriptions', tip: 'More detailed than basic evidence hierarchy; includes adjoiners/courses', exam: 'ps' },
      { name: 'Minimum Standard Detail Requirements', expression: 'ALTA Table A: 20 optional items for survey scope', variables: 'Items 1-20 covering various survey requirements', tip: 'Client must specify which Table A items apply to their survey', exam: 'ps' },
      { name: 'Privity Requirement', expression: 'Successive adverse possessors can tack periods if in privity', variables: 'Privity = legal relationship (sale, inheritance, etc.)', tip: 'Tacking allows combining periods of different possessors', exam: 'ps' },
    ],
  },
  {
    id: 'ps-professional',
    name: 'PS Professional Practice',
    icon: Landmark,
    colorVar: '--domain-professional',
    formulas: [
      { name: 'Standard of Care', expression: 'What a reasonably prudent surveyor would do under similar circumstances', variables: 'Measured against peer standard, not perfection', tip: 'Key concept in professional liability cases', exam: 'ps' },
      { name: 'Statute of Repose', expression: 'Absolute time limit from date of service (typically 10 years)', variables: 'Different from statute of limitations which runs from discovery', tip: 'Protects surveyors from indefinite liability', exam: 'ps' },
      { name: 'Recording Requirements', expression: 'Plats/surveys must be recorded in county where land is located', variables: 'Requirements vary by state statute', tip: 'Recording provides constructive notice to the public', exam: 'ps' },
    ],
  },
];

const domainIcons: Record<string, typeof Calculator> = {
  math: Calculator,
  field: Ruler,
  computations: Compass,
  statistics: BarChart3,
  principles: Globe,
  boundary: MapPin,
  'ps-boundary': Scale,
  'ps-professional': Landmark,
};

export default function FormulaReferencePage() {
  const { examTrack } = useExamTrack();
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  const filteredDomains = useMemo(() => {
    return FORMULA_DOMAINS.map(domain => {
      const filteredFormulas = domain.formulas.filter(f => {
        const matchesExam = f.exam === 'both' || f.exam === examTrack;
        if (!matchesExam) return false;

        if (searchQuery === '') return true;
        const q = searchQuery.toLowerCase();
        return (
          f.name.toLowerCase().includes(q) ||
          f.expression.toLowerCase().includes(q) ||
          f.variables.toLowerCase().includes(q) ||
          f.tip.toLowerCase().includes(q) ||
          domain.name.toLowerCase().includes(q)
        );
      });
      return { ...domain, formulas: filteredFormulas };
    }).filter(domain => domain.formulas.length > 0);
  }, [examTrack, searchQuery]);

  const totalFormulas = filteredDomains.reduce((sum, d) => sum + d.formulas.length, 0);

  const handleExportPdf = useCallback(async () => {
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const margin = 16;
    const pageWidth = doc.internal.pageSize.getWidth();
    const maxLineWidth = pageWidth - margin * 2;
    let y = margin;

    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    const trackLabel = examTrack === 'ps' ? 'PS Exam' : 'FS Exam';
    doc.text(`${trackLabel} Formula Quick-Reference`, margin, y);
    y += 7;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(120, 120, 120);
    doc.text(`${totalFormulas} formulas${searchQuery ? ` matching "${searchQuery}"` : ''}  •  Generated ${new Date().toLocaleDateString()}`, margin, y);
    y += 5;
    doc.setTextColor(200, 200, 200);
    doc.line(margin, y, pageWidth - margin, y);
    y += 6;
    doc.setTextColor(30, 30, 30);

    for (const domain of filteredDomains) {
      if (y > 265) { doc.addPage(); y = margin; }
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text(domain.name, margin, y);
      y += 6;

      for (const formula of domain.formulas) {
        if (y > 265) { doc.addPage(); y = margin; }
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text(formula.name, margin + 4, y);
        y += 5;

        doc.setFont('courier', 'normal');
        doc.setFontSize(10);
        const exprLines = doc.splitTextToSize(formula.expression, maxLineWidth - 8);
        for (const l of exprLines) {
          if (y > 270) { doc.addPage(); y = margin; }
          doc.text(l, margin + 4, y);
          y += 4.5;
        }

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(80, 80, 80);
        const varLines = doc.splitTextToSize(`Variables: ${formula.variables}`, maxLineWidth - 8);
        for (const l of varLines) {
          if (y > 270) { doc.addPage(); y = margin; }
          doc.text(l, margin + 4, y);
          y += 4;
        }
        const tipLines = doc.splitTextToSize(`Tip: ${formula.tip}`, maxLineWidth - 8);
        for (const l of tipLines) {
          if (y > 270) { doc.addPage(); y = margin; }
          doc.text(l, margin + 4, y);
          y += 4;
        }
        doc.setTextColor(30, 30, 30);
        y += 2;
      }
      y += 4;
    }

    const filename = `formula-reference-${examTrack}${searchQuery ? '-filtered' : ''}.pdf`;
    doc.save(filename);
    toast({ title: 'PDF exported', description: `Saved as ${filename}` });
  }, [filteredDomains, examTrack, searchQuery, totalFormulas, toast]);

  return (
    <div className="container max-w-5xl py-6 px-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2 flex items-center gap-2" data-testid="text-page-title">
          <Calculator className="w-7 h-7 text-primary" />
          Formula Quick-Reference
        </h1>
        <p className="text-muted-foreground" data-testid="text-page-description">
          {examTrack === 'ps'
            ? 'Essential formulas and legal principles for the PS exam'
            : 'Essential formulas and equations for the FS exam'}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search formulas by name, expression, or domain..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
            data-testid="input-search-formulas"
          />
        </div>
        <Badge variant="secondary" data-testid="badge-formula-count">
          {totalFormulas} formula{totalFormulas !== 1 ? 's' : ''}
        </Badge>
        <Button variant="outline" size="sm" onClick={handleExportPdf} data-testid="button-export-formulas-pdf">
          <Download className="w-4 h-4 mr-2" />
          Export PDF
        </Button>
      </div>

      <ScrollArea className="h-[calc(100vh-250px)]">
        {filteredDomains.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground" data-testid="text-no-results">
            No formulas found matching "{searchQuery}"
          </div>
        ) : (
          <Accordion type="multiple" defaultValue={filteredDomains.map(d => d.id)} className="w-full space-y-2">
            {filteredDomains.map(domain => {
              const Icon = domainIcons[domain.id] || Calculator;
              return (
                <AccordionItem key={domain.id} value={domain.id} data-testid={`domain-group-${domain.id}`}>
                  <AccordionTrigger className="text-base font-semibold" data-testid={`button-expand-${domain.id}`}>
                    <span className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full flex-shrink-0"
                        style={{ backgroundColor: `hsl(var(${domain.colorVar}))` }}
                      />
                      <Icon className="h-4 w-4 text-muted-foreground" />
                      {domain.name}
                      <Badge variant="secondary" className="ml-1" data-testid={`badge-count-${domain.id}`}>
                        {domain.formulas.length}
                      </Badge>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid gap-3 pt-2">
                      {domain.formulas.map((formula, idx) => (
                        <FormulaCard key={idx} formula={formula} domainName={domain.name} domainColor={domain.colorVar} />
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        )}
      </ScrollArea>
    </div>
  );
}

function FormulaCard({ formula, domainName, domainColor }: { formula: Formula; domainName: string; domainColor: string }) {
  return (
    <Card data-testid={`formula-card-${formula.name.toLowerCase().replace(/\s+/g, '-')}`}>
      <CardHeader className="pb-2 pt-4 px-4">
        <div className="flex items-start justify-between gap-2 flex-wrap">
          <CardTitle className="text-sm font-semibold">{formula.name}</CardTitle>
          <Badge variant="outline" className="text-xs" data-testid={`badge-domain-${formula.name.toLowerCase().replace(/\s+/g, '-')}`}>
            {formula.exam === 'both' ? 'FS & PS' : formula.exam.toUpperCase()}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-4 space-y-2">
        <div className="bg-muted rounded-md px-3 py-2">
          <code className="text-sm font-mono font-semibold" data-testid={`text-expression-${formula.name.toLowerCase().replace(/\s+/g, '-')}`}>
            {formula.expression}
          </code>
        </div>
        <div className="text-xs text-muted-foreground">
          <span className="font-medium">Variables: </span>
          {formula.variables}
        </div>
        <div className="text-xs flex items-start gap-1.5">
          <div
            className="w-2 h-2 rounded-full flex-shrink-0 mt-1"
            style={{ backgroundColor: `hsl(var(${domainColor}))` }}
          />
          <span className="text-muted-foreground">
            <span className="font-medium">Exam Tip: </span>
            {formula.tip}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
