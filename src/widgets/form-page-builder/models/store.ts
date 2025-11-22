import type { ResumeData } from '@entities/resume';
import { create } from 'zustand';

export const useFormDataStore = create<{
  formData: Omit<ResumeData, 'templateId'>;
  setFormData: (formData: Omit<ResumeData, 'templateId'>) => void;
  isAnalyzing: boolean;
  setIsAnalyzing: (isAnalyzing: boolean) => void;
  analyzerError: boolean;
  setAnalyzerError: (error: boolean) => void;
  retryAnalyzer: (() => void) | null;
  setRetryAnalyzer: (retry: (() => void) | null) => void;
}>((set) => ({
  formData: {} as Omit<ResumeData, 'templateId'>,
  setFormData: (formData: Omit<ResumeData, 'templateId'>) => set({ formData }),
  isAnalyzing: false,
  setIsAnalyzing: (isAnalyzing: boolean) => set({ isAnalyzing }),
  analyzerError: false,
  setAnalyzerError: (error: boolean) => set({ analyzerError: error }),
  retryAnalyzer: null,
  setRetryAnalyzer: (retry: (() => void) | null) => set({ retryAnalyzer: retry }),
}));
