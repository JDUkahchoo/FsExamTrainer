import { useState, useRef, useEffect, useCallback } from 'react';
import { Calculator, X, Minus, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScientificCalculatorPanel } from './scientific-calculator-panel';
import { useCalculator } from './calculator-context';

const PANEL_WIDTH = 320;

export function FloatingCalculator() {
  const { isOpen, open, close } = useCalculator();
  const [minimized, setMinimized] = useState(false);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const dragRef = useRef<{ dx: number; dy: number } | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Default position: bottom-right, set once when first opened.
  useEffect(() => {
    if (isOpen && pos === null) {
      const x = Math.max(16, window.innerWidth - PANEL_WIDTH - 24);
      const y = Math.max(16, window.innerHeight - 520);
      setPos({ x, y });
    }
  }, [isOpen, pos]);

  const clamp = useCallback((x: number, y: number) => {
    const el = panelRef.current;
    const w = el?.offsetWidth ?? PANEL_WIDTH;
    const h = el?.offsetHeight ?? 200;
    const maxX = window.innerWidth - w - 8;
    const maxY = window.innerHeight - h - 8;
    return { x: Math.min(Math.max(8, x), Math.max(8, maxX)), y: Math.min(Math.max(8, y), Math.max(8, maxY)) };
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    if (!pos) return;
    dragRef.current = { dx: e.clientX - pos.x, dy: e.clientY - pos.y };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current) return;
    setPos(clamp(e.clientX - dragRef.current.dx, e.clientY - dragRef.current.dy));
  };
  const onPointerUp = (e: React.PointerEvent) => {
    dragRef.current = null;
    try { (e.target as HTMLElement).releasePointerCapture(e.pointerId); } catch { /* noop */ }
  };

  // Keep the panel on-screen after viewport resizes.
  useEffect(() => {
    if (!isOpen) return;
    const onResize = () => setPos((p) => (p ? clamp(p.x, p.y) : p));
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [isOpen, clamp]);

  if (!isOpen) {
    return (
      <Button
        type="button"
        onClick={open}
        data-testid="button-open-calculator"
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-survey text-zinc-950 shadow-lg hover:bg-survey/90"
        aria-label="Open calculator"
      >
        <Calculator className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <div
      ref={panelRef}
      data-testid="floating-calculator"
      className="fixed z-50 rounded-lg border bg-card shadow-2xl"
      style={{ left: pos?.x ?? 0, top: pos?.y ?? 0, width: PANEL_WIDTH }}
    >
      {/* Drag handle / title bar */}
      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        data-testid="calculator-drag-handle"
        className="flex cursor-grab items-center gap-2 rounded-t-lg border-b bg-muted/60 px-3 py-2 active:cursor-grabbing select-none touch-none"
      >
        <GripVertical className="h-4 w-4 text-muted-foreground" />
        <span className="flex items-center gap-1.5 font-display text-sm font-semibold">
          <Calculator className="h-4 w-4 text-primary" />
          Calculator
        </span>
        <div className="ml-auto flex items-center gap-1">
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="h-7 w-7"
            onClick={() => setMinimized((m) => !m)}
            data-testid="button-minimize-calculator"
            aria-label={minimized ? 'Expand calculator' : 'Minimize calculator'}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="h-7 w-7"
            onClick={close}
            data-testid="button-close-calculator"
            aria-label="Close calculator"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {!minimized && (
        <div className="p-3">
          <ScientificCalculatorPanel compact enableKeyboard={isOpen} />
        </div>
      )}
    </div>
  );
}
