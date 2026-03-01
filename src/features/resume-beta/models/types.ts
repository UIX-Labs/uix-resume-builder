import type { ResumeData, ResumeDataKey, SuggestionType } from '@entities/resume';
import type { User } from '@shared/hooks/use-user';

export interface NavItem {
  label: string;
  name: ResumeDataKey;
}

export interface AnalyzerModalData {
  suggestions: Array<{ old?: string; new: string; type: SuggestionType }>;
  fieldName: string;
  itemId: string;
  suggestionType: SuggestionType;
  formDataSectionKey?: string;
}

export interface BuilderState {
  resumeId: string;
  currentStep: ResumeDataKey;
  formData: Omit<ResumeData, 'templateId'>;
  resumeData: ResumeData | undefined;
  isCreateMode: boolean;
  isGeneratingPDF: boolean;
  isAnalyzing: boolean;
  analyzerError: boolean;
  selectedTemplate: any | null;
  selectedTemplateId: string | null;
  hasSuggestions: boolean;
  lastSaveTime: number | null;
  navs: NavItem[];
  user: User | undefined;
  friendsBonus: number;
}

export interface BuilderActions {
  setCurrentStep: (step: ResumeDataKey) => void;
  setFormData: (data: Omit<ResumeData, 'templateId'>) => void;
  handleSaveResume: () => Promise<void>;
  handleNextStep: () => Promise<void>;
  handleDownloadPDF: () => Promise<void>;
  handleTemplateSelect: (template: any) => Promise<void>;
  handleToggleHideSection: (sectionId: string, isHidden: boolean) => void;
  handleOpenAnalyzerModal: (itemId: string, fieldName: string, suggestionType: SuggestionType) => void;
  handleBuilderIntelligence: () => Promise<void>;
  handleApplySuggestions: (
    selectedSuggestions: Array<{ old?: string; new: string; type: SuggestionType }>,
  ) => Promise<void>;
  setIsPreviewModalOpen: (open: boolean) => void;
}

export interface BuilderMeta {
  targetRef: React.RefObject<HTMLDivElement | null>;
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
  containerRef: React.RefObject<HTMLDivElement | null>;
  previewWrapperRef: React.RefObject<HTMLDivElement | null>;
  thumbnailRef: React.RefObject<HTMLDivElement | null>;
  pdfSourceRef: React.RefObject<HTMLDivElement | null>;
  cleanedDataForPreview: Record<string, unknown>;
  cleanedDataForThumbnail: Record<string, unknown>;
  cleanedDataForModal: Record<string, unknown>;
  leftWidth: number;
  previewScale: number;
  startResizing: () => void;
  getFormattedSaveTime: () => string | null;
  nextStepIndex: number;
  analyzerModalOpen: boolean;
  setAnalyzerModalOpen: (open: boolean) => void;
  analyzerModalData: AnalyzerModalData | null;
  isFeedbackModalOpen: boolean;
  setIsFeedbackModalOpen: (open: boolean) => void;
  isPreviewModalOpen: boolean;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authRedirectUrl: string;
  isReferralModalOpen: boolean;
  setIsReferralModalOpen: (open: boolean) => void;
  referralUrl: string;
}

export interface BuilderContextValue {
  state: BuilderState;
  actions: BuilderActions;
  meta: BuilderMeta;
}
