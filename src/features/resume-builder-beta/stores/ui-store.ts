import type { ResumeDataKey } from '@entities/resume';
import { create } from 'zustand';

// ---------------------------------------------------------------------------
// UI-only state — NOT tracked by undo/redo
// ---------------------------------------------------------------------------

interface UIState {
  activeSection: ResumeDataKey;
  panelWidth: number;
  previewZoom: number;
  isGeneratingPDF: boolean;
  isTemplatePickerOpen: boolean;
  isPreviewModalOpen: boolean;
  isMobileFormOpen: boolean;

  setActiveSection: (section: ResumeDataKey) => void;
  setPanelWidth: (width: number) => void;
  setPreviewZoom: (zoom: number) => void;
  setIsGeneratingPDF: (v: boolean) => void;
  setIsTemplatePickerOpen: (v: boolean) => void;
  setIsPreviewModalOpen: (v: boolean) => void;
  setIsMobileFormOpen: (v: boolean) => void;
}

export const useUIStore = create<UIState>()((set) => ({
  activeSection: 'personalDetails',
  panelWidth: 50,
  previewZoom: 1,
  isGeneratingPDF: false,
  isTemplatePickerOpen: false,
  isPreviewModalOpen: false,
  isMobileFormOpen: false,

  setActiveSection: (section) => set({ activeSection: section }),
  setPanelWidth: (width) => set({ panelWidth: width }),
  setPreviewZoom: (zoom) => set({ previewZoom: zoom }),
  setIsGeneratingPDF: (v) => set({ isGeneratingPDF: v }),
  setIsTemplatePickerOpen: (v) => set({ isTemplatePickerOpen: v }),
  setIsPreviewModalOpen: (v) => set({ isPreviewModalOpen: v }),
  setIsMobileFormOpen: (v) => set({ isMobileFormOpen: v }),
}));
