import type { ResumeDataKey, ResumeData } from '@entities/resume';
import { createContext, useContext } from 'react';

export const FormPageBuilderContext = createContext<{
  currentStep: ResumeDataKey;
  setCurrentStep: React.Dispatch<React.SetStateAction<ResumeDataKey>>;
  navs: { label: string; name: ResumeDataKey; completion?: number }[];
  sectionCompletions?: Record<string, number>;
  overallCompletion?: number;
  resumeData?: ResumeData & { isAnalyzed?: boolean };
  onBuilderIntelligence?: () => void;
}>({
  currentStep: 'personalDetails',
  setCurrentStep: () => {
    // Empty function for default context
  },
  navs: [],
  sectionCompletions: undefined,
  overallCompletion: undefined,
  resumeData: undefined,
  onBuilderIntelligence: undefined,
});

export const FormPageBuilderProvider = FormPageBuilderContext.Provider;

export const useFormPageBuilder = () => {
  return useContext(FormPageBuilderContext);
};
