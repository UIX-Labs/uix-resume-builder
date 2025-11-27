import { create } from 'zustand';
import type { ResumeData } from '@entities/resume';

interface AnalyzerStore {
  analyzedData: ResumeData | null;
  resumeId: string | null;
  isTailoredWithJD: boolean;
  setAnalyzedData: (data: ResumeData, resumeId: string, isTailoredWithJD?: boolean) => void;
  clearAnalyzedData: () => void;
}

export const useAnalyzerStore = create<AnalyzerStore>((set) => ({
  analyzedData: null,
  resumeId: null,
  isTailoredWithJD: false,
  setAnalyzedData: (data: ResumeData, resumeId: string, isTailoredWithJD = false) => {
    set({ analyzedData: data, resumeId, isTailoredWithJD });
  },
  clearAnalyzedData: () => {
    set({ analyzedData: null, resumeId: null, isTailoredWithJD: false });
  },
}));
