import type { ResumeData } from '@entities/resume';
import { create } from 'zustand';

export const useFormDataStore = create<{
  formData: Omit<ResumeData, 'templateId'>;
  setFormData: (formData: Omit<ResumeData, 'templateId'>) => void;
}>((set) => ({
  formData: {} as Omit<ResumeData, 'templateId'>,
  setFormData: (formData: Omit<ResumeData, 'templateId'>) => set({ formData }),
}));
