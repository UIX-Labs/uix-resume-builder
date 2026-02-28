import type { ResumeData, ResumeDataKey } from '@entities/resume';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { temporal } from 'zundo';
import type { TemplateTheme } from '../types/template';
import { DEFAULT_THEME } from '../types/template';

// ---------------------------------------------------------------------------
// State shape
// ---------------------------------------------------------------------------

interface ResumeState {
  // Data
  resumeId: string | null;
  data: ResumeData | null;
  templateId: string;
  theme: TemplateTheme;

  // Actions — each only touches one section via Immer draft
  setResumeData: (data: ResumeData, resumeId: string) => void;
  updateSection: <K extends ResumeDataKey>(
    section: K,
    updater: (draft: ResumeData[K]) => void,
  ) => void;
  addItem: (section: ResumeDataKey, item: unknown) => void;
  removeItem: (section: ResumeDataKey, index: number) => void;
  reorderItems: (
    section: ResumeDataKey,
    fromIndex: number,
    toIndex: number,
  ) => void;
  setTemplateId: (id: string) => void;
  setTheme: (theme: Partial<TemplateTheme>) => void;
}

// ---------------------------------------------------------------------------
// Store — Zustand + Immer + Zundo (temporal undo/redo)
// ---------------------------------------------------------------------------

export const useResumeStore = create<ResumeState>()(
  temporal(
    immer((set) => ({
      resumeId: null,
      data: null,
      templateId: 'aniket-classic',
      theme: DEFAULT_THEME,

      setResumeData: (data, resumeId) =>
        set((state) => {
          state.data = data;
          state.resumeId = resumeId;
          if (data.templateId) {
            state.templateId = data.templateId;
          }
        }),

      updateSection: (section, updater) =>
        set((state) => {
          if (state.data?.[section]) {
            updater(state.data[section] as any);
          }
        }),

      addItem: (section, item) =>
        set((state) => {
          const sectionData = state.data?.[section] as any;
          if (sectionData && Array.isArray(sectionData.items)) {
            sectionData.items.push(item);
          }
        }),

      removeItem: (section, index) =>
        set((state) => {
          const sectionData = state.data?.[section] as any;
          if (sectionData && Array.isArray(sectionData.items)) {
            sectionData.items.splice(index, 1);
          }
        }),

      reorderItems: (section, fromIndex, toIndex) =>
        set((state) => {
          const sectionData = state.data?.[section] as any;
          if (sectionData && Array.isArray(sectionData.items)) {
            const items = sectionData.items as unknown[];
            const [moved] = items.splice(fromIndex, 1);
            items.splice(toIndex, 0, moved);
          }
        }),

      setTemplateId: (id) =>
        set((state) => {
          state.templateId = id;
        }),

      setTheme: (partial) =>
        set((state) => {
          Object.assign(state.theme, partial);
        }),
    })),
    {
      // Only track resume data + template for undo/redo, NOT UI state
      partialize: (state) => ({
        data: state.data,
        templateId: state.templateId,
        theme: state.theme,
      }),
      limit: 50,
    },
  ),
);
