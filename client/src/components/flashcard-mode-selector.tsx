import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Brain, Lightbulb, Zap, Swords } from 'lucide-react';

export type FlashcardMode = 'quick' | 'triad' | 'feynman' | 'mnemonic' | 'challenge';

interface FlashcardModeSelectorProps {
  mode: FlashcardMode;
  onModeChange: (mode: FlashcardMode) => void;
}

export function FlashcardModeSelector({ mode, onModeChange }: FlashcardModeSelectorProps) {
  return (
    <Tabs value={mode} onValueChange={(v) => onModeChange(v as FlashcardMode)} className="w-full">
      <TabsList className="grid w-full grid-cols-5 h-auto">
        <TabsTrigger 
          value="quick" 
          className="flex flex-col items-center gap-1 py-2 px-1 text-xs"
          data-testid="tab-quick-review"
        >
          <Zap className="w-4 h-4" />
          <span>Quick Review</span>
        </TabsTrigger>
        <TabsTrigger 
          value="challenge" 
          className="flex flex-col items-center gap-1 py-2 px-1 text-xs"
          data-testid="tab-challenge-mode"
        >
          <Swords className="w-4 h-4" />
          <span>Challenge</span>
        </TabsTrigger>
        <TabsTrigger 
          value="triad" 
          className="flex flex-col items-center gap-1 py-2 px-1 text-xs"
          data-testid="tab-triad-drill"
        >
          <Brain className="w-4 h-4" />
          <span>Triad Drill</span>
        </TabsTrigger>
        <TabsTrigger 
          value="feynman" 
          className="flex flex-col items-center gap-1 py-2 px-1 text-xs"
          data-testid="tab-feynman-mode"
        >
          <BookOpen className="w-4 h-4" />
          <span>Feynman</span>
        </TabsTrigger>
        <TabsTrigger 
          value="mnemonic" 
          className="flex flex-col items-center gap-1 py-2 px-1 text-xs"
          data-testid="tab-mnemonic-builder"
        >
          <Lightbulb className="w-4 h-4" />
          <span>Mnemonic</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
