import type { ResumeDataKey } from '@entities/resume';
import { createContext, useContext } from 'react';

export const FormPageBuilderContext = createContext<{
  currentStep: ResumeDataKey;
  setCurrentStep: React.Dispatch<React.SetStateAction<ResumeDataKey>>;
  navs: { label: string; name: ResumeDataKey }[];
}>({
  currentStep: 'personalDetails',
  setCurrentStep: () => {},
  navs: [],
});

export const FormPageBuilderProvider = FormPageBuilderContext.Provider;

export const useFormPageBuilder = () => {
  return useContext(FormPageBuilderContext);
};
