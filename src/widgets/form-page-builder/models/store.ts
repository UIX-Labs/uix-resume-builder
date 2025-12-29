import type { ResumeData } from '@entities/resume';
import { create } from 'zustand';

export interface TransitionText {
  title: string;
  subtitle: string;
}

export const TRANSITION_TEXTS: TransitionText[] = [
  {
    title: 'Parsing',
    subtitle: "Polishing words so recruiters can't look away",
  },
  {
    title: 'Analyzing',
    subtitle: 'Identifying areas for improvement',
  },
  {
    title: 'Rewriting',
    subtitle: 'Enhancing your resume with stronger language',
  },
  {
    title: 'Optimizing',
    subtitle: 'Fine-tuning every detail for maximum impact',
  },
];

export const useFormDataStore = create<{
  formData: Omit<ResumeData, 'templateId'>;
  setFormData: (formData: Omit<ResumeData, 'templateId'>) => void;
  isAnalyzing: boolean;
  setIsAnalyzing: (isAnalyzing: boolean) => void;
  analyzerProgress: number;
  setAnalyzerProgress: (progress: number) => void;
  analyzerError: boolean;
  setAnalyzerError: (error: boolean) => void;
  currentTextIndex: number;
  setCurrentTextIndex: (index: number) => void;
}>((set) => ({
  formData: {} as Omit<ResumeData, 'templateId'>,
  setFormData: (formData: Omit<ResumeData, 'templateId'>) => set({ formData }),
  isAnalyzing: false,
  setIsAnalyzing: (isAnalyzing: boolean) => set({ isAnalyzing }),
  analyzerProgress: 0,
  setAnalyzerProgress: (progress: number) => set({ analyzerProgress: progress }),
  analyzerError: false,
  setAnalyzerError: (error: boolean) => set({ analyzerError: error }),
  currentTextIndex: 0,
  setCurrentTextIndex: (index: number) => set({ currentTextIndex: index }),
}));
