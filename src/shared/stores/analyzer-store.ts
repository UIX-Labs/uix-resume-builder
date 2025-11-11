import { create } from 'zustand';
import type { ResumeData } from '@entities/resume';

interface AnalyzerStore {
  analyzedData: ResumeData | null;
  resumeId: string | null;
  setAnalyzedData: (data: ResumeData, resumeId: string) => void;
  clearAnalyzedData: () => void;
}

export const useAnalyzerStore = create<AnalyzerStore>((set) => ({
  analyzedData: null,
  resumeId: null,
  setAnalyzedData: (data: ResumeData, resumeId: string) => {
    set({ analyzedData: data, resumeId });
  },
  clearAnalyzedData: () => {
    set({ analyzedData: null, resumeId: null });
  },
}));
