import type { SuggestedUpdates } from '@entities/resume';
import { create } from 'zustand';

// ---------------------------------------------------------------------------
// Grammarly-style suggestion state — separate from resume data
// NOT tracked by undo/redo — suggestions are ephemeral
// ---------------------------------------------------------------------------

interface SuggestionState {
  suggestions: SuggestedUpdates | null;
  dismissedKeys: Set<string>;
  isAnalyzing: boolean;
  analyzerProgress: number;

  setSuggestions: (s: SuggestedUpdates) => void;
  dismissSuggestion: (key: string) => void;
  setIsAnalyzing: (v: boolean) => void;
  setAnalyzerProgress: (v: number) => void;
  clearAll: () => void;
}

function makeDismissKey(
  itemId: string,
  field: string,
  index: number,
): string {
  return `${itemId}:${field}:${index}`;
}

export { makeDismissKey };

export const useSuggestionStore = create<SuggestionState>()((set) => ({
  suggestions: null,
  dismissedKeys: new Set(),
  isAnalyzing: false,
  analyzerProgress: 0,

  setSuggestions: (suggestions) =>
    set({ suggestions, dismissedKeys: new Set() }),

  dismissSuggestion: (key) =>
    set((state) => {
      const next = new Set(state.dismissedKeys);
      next.add(key);
      return { dismissedKeys: next };
    }),

  setIsAnalyzing: (v) => set({ isAnalyzing: v }),
  setAnalyzerProgress: (v) => set({ analyzerProgress: v }),

  clearAll: () =>
    set({
      suggestions: null,
      dismissedKeys: new Set(),
      isAnalyzing: false,
      analyzerProgress: 0,
    }),
}));
