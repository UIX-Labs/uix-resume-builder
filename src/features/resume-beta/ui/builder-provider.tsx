'use client';

import { useCallback, useMemo, useRef, useState } from 'react';
import type { ResumeData, ResumeDataKey } from '@entities/resume';
import { useSaveResumeForm } from '@entities/resume';
import type { ResumeFormData } from '../models/resume-sections';
import type { CleanedResumeData } from '../models/cleaned-data';
import { useIsMobile } from '@shared/hooks/use-mobile';
import { useUserProfile } from '@shared/hooks/use-user';
import { useFormDataStore } from '@widgets/form-page-builder/models/store';
import { useTemplateManagement } from '@widgets/form-page-builder/hooks/use-template-management';
import { useThumbnailGeneration } from '@widgets/form-page-builder/hooks/use-thumbnail-generation';
import { usePdfGeneration } from '@widgets/form-page-builder/hooks/use-pdf-generation';
import { usePdfDownload } from '@widgets/form-page-builder/hooks/use-pdf-download';
import { useResizablePanel } from '@widgets/form-page-builder/hooks/use-resizable-panel';
import { useAutoSave } from '@widgets/form-page-builder/hooks/use-auto-save';
import { useAutoThumbnail } from '@widgets/form-page-builder/hooks/use-auto-thumbnail';
import { useSaveAndNext } from '@widgets/form-page-builder/hooks/use-save-and-next';
import { useSuggestionClickHandler } from '@widgets/form-page-builder/hooks/use-suggestion-click-handler';
import { useBuilderIntelligence } from '@widgets/form-page-builder/hooks/use-builder-intelligence';
import { getCleanDataForRenderer } from '@widgets/form-page-builder/lib/data-cleanup';
import { getRendererDataWithMockFallback } from '../lib/mock-data-merge';
import { useFormDataSync } from '../hooks/use-form-data-sync';
import { useSuggestionHandler } from '../hooks/use-suggestion-handler';
import { useKeyboardShortcuts } from '../hooks/use-keyboard-shortcuts';
import { useScrollToSection } from '../hooks/use-scroll-to-section';
import { useSaveTime } from '../hooks/use-save-time';
import { useSectionVisibility } from '../hooks/use-section-visibility';
import { useMountActions } from '../hooks/useMountActions';
import { BuilderProvider } from '../models/builder-context';
import type { BuilderContextValue, NavItem } from '../models/types';
import { useSearchParams } from 'next/navigation';

const NAVS: NavItem[] = [
  { label: 'Personal Details', name: 'personalDetails' },
  { label: 'Experience', name: 'experience' },
  { label: 'Education', name: 'education' },
  { label: 'Skills', name: 'skills' },
  { label: 'Projects', name: 'projects' },
  { label: 'Certifications', name: 'certifications' },
  { label: 'Interests', name: 'interests' },
  { label: 'Achievements', name: 'achievements' },
];

interface BuilderProviderComponentProps {
  resumeId: string;
  resumeData: ResumeData | undefined;
  children: React.ReactNode;
}

export function BuilderProviderComponent({
  resumeId,
  resumeData,
  children,
}: BuilderProviderComponentProps) {
  const isMobile = useIsMobile();
  const searchParams = useSearchParams();
  const { data: user } = useUserProfile();

  const [currentStep, setCurrentStep] = useState<ResumeDataKey>('personalDetails');
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(searchParams.get('preview') === 'true');
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const feedbackShownRef = useRef(false);

  // Zustand store reads
  const formData = useFormDataStore((s) => s.formData);
  const storeSetFormData = useFormDataStore((s) => s.setFormData);
  const isCreateMode = useFormDataStore((s) => s.isCreateMode);
  const isAnalyzing = useFormDataStore((s) => s.isAnalyzing);
  const analyzerError = useFormDataStore((s) => s.analyzerError);

  // Refs
  const targetRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const previewWrapperRef = useRef<HTMLDivElement>(null);
  const pdfSourceRef = useRef<HTMLDivElement>(null);

  const nextStepIndex = NAVS.findIndex((item) => item.name === currentStep) + 1;
  const friendsBonus = (user?.referredTo?.length ?? 0) * 3;

  // Wrap setFormData to always pass resumeId
  const setFormData = useCallback(
    (data: ResumeFormData) => {
      storeSetFormData(data as Omit<ResumeData, 'templateId'>, resumeId);
    },
    [storeSetFormData, resumeId],
  );

  // --- Data sync ---
  useFormDataSync({ resumeId, resumeData });
  useMountActions({ resumeId });

  // --- Template ---
  const { selectedTemplate, selectedTemplateId, handleTemplateSelect } = useTemplateManagement({
    resumeId,
    initialTemplate: resumeData?.template?.json,
    initialTemplateId: resumeData?.templateId,
  });

  // --- Thumbnail ---
  const { thumbnailRef, generateAndSaveThumbnail } = useThumbnailGeneration(resumeId);

  // --- PDF ---
  const { isGeneratingPDF, generatePDF } = usePdfGeneration({
    pdfSourceRef,
    formData,
    resumeId,
  });

  const {
    handleDownloadPDF,
    isAuthModalOpen,
    setIsAuthModalOpen,
    authRedirectUrl,
    isReferralModalOpen,
    setIsReferralModalOpen,
    referralUrl,
  } = usePdfDownload({
    resumeId,
    generatePDF,
    onDownloadSuccess: () => {
      if (isMobile || feedbackShownRef.current) return;
      feedbackShownRef.current = true;
      setTimeout(() => {
        setIsFeedbackModalOpen(true);
      }, 800);
    },
  });

  // --- Resizable panel ---
  const { leftWidth, previewScale, startResizing } = useResizablePanel({
    containerRef,
    previewWrapperRef,
  });

  // --- Save ---
  const { mutateAsync: saveResumeForm } = useSaveResumeForm();

  const save = useCallback(
    ({ type, data }: { type: string; data: Record<string, unknown>; updatedAt: number }) => {
      saveResumeForm({ type: type as ResumeDataKey, data: data as ResumeData[ResumeDataKey] });
    },
    [saveResumeForm],
  );

  const { lastSaveTime, setLastSaveTime, getFormattedSaveTime } = useSaveTime({
    initialUpdatedAt: resumeData?.updatedAt as string | undefined,
  });

  const saveWithTimestamp = useCallback(
    (params: { type: string; data: Record<string, unknown>; updatedAt: number }) => {
      save(params);
      setLastSaveTime(Date.now());
    },
    [save, setLastSaveTime],
  );

  const { handleSaveResume, handleNextStep } = useSaveAndNext({
    currentStep,
    formData,
    resumeData,
    save: saveWithTimestamp,
    resumeId,
    navs: NAVS,
    nextStepIndex,
    setCurrentStep: (step: string) => setCurrentStep(step as ResumeDataKey),
    generateAndSaveThumbnail,
  });

  useAutoSave({
    currentStep,
    formData,
    save: saveWithTimestamp,
    onSaveComplete: () => setLastSaveTime(Date.now()),
    debounceMs: 25000,
  });

  useAutoThumbnail({
    resumeId,
    formData,
    generateAndSaveThumbnail,
  });

  // --- Builder Intelligence ---
  const { handleBuilderIntelligence } = useBuilderIntelligence(resumeId);

  // --- Suggestions ---
  const {
    analyzerModalOpen,
    setAnalyzerModalOpen,
    analyzerModalData,
    hasSuggestions,
    handleOpenAnalyzerModal,
    handleSuggestionClickFromDOM,
    handleApplySuggestions,
  } = useSuggestionHandler({
    formData,
    currentStep,
    resumeId,
    setFormData,
  });

  useSuggestionClickHandler({
    containerRef: targetRef as React.RefObject<HTMLElement>,
    onSuggestionClick: handleSuggestionClickFromDOM,
    enabled: hasSuggestions && !isGeneratingPDF,
  });

  // --- Section visibility ---
  const { handleToggleHideSection } = useSectionVisibility({
    formData,
    resumeId,
    setFormData,
    save: saveWithTimestamp,
  });

  // --- Keyboard shortcuts ---
  useKeyboardShortcuts({ onSave: handleSaveResume });

  // --- Scroll to section ---
  useScrollToSection({
    targetRef,
    scrollContainerRef,
    currentStep,
    enabled: !isMobile,
  });

  // --- Cleaned data for renderers ---
  const cleanedDataForPreview = useMemo(
    () =>
      getCleanDataForRenderer(
        getRendererDataWithMockFallback(formData ?? {}, isCreateMode),
        isGeneratingPDF,
      ) as CleanedResumeData,
    [formData, isCreateMode, isGeneratingPDF],
  );

  const cleanedDataForThumbnail = useMemo(
    () =>
      getCleanDataForRenderer(
        getRendererDataWithMockFallback(formData ?? {}, isCreateMode),
        true,
      ) as CleanedResumeData,
    [formData, isCreateMode],
  );

  const cleanedDataForModal = useMemo(
    () =>
      getCleanDataForRenderer(
        getRendererDataWithMockFallback(formData ?? {}, isCreateMode),
        false,
      ) as CleanedResumeData,
    [formData, isCreateMode],
  );

  // --- Assemble context ---
  const state = useMemo(
    () => ({
      resumeId,
      currentStep,
      formData: formData as ResumeFormData,
      resumeData,
      isCreateMode,
      isGeneratingPDF,
      isAnalyzing,
      analyzerError,
      selectedTemplate,
      selectedTemplateId,
      hasSuggestions,
      lastSaveTime,
      navs: NAVS,
      user,
      friendsBonus,
    }),
    [
      resumeId, currentStep, formData, resumeData, isCreateMode, isGeneratingPDF,
      isAnalyzing, analyzerError, selectedTemplate, selectedTemplateId,
      hasSuggestions, lastSaveTime, user, friendsBonus,
    ],
  );

  const actions = useMemo(
    () => ({
      setCurrentStep,
      setFormData,
      handleSaveResume,
      handleNextStep,
      handleDownloadPDF,
      handleTemplateSelect,
      handleToggleHideSection,
      handleOpenAnalyzerModal,
      handleBuilderIntelligence,
      handleApplySuggestions,
      setIsPreviewModalOpen,
    }),
    [
      setFormData, handleSaveResume, handleNextStep, handleDownloadPDF,
      handleTemplateSelect, handleToggleHideSection, handleOpenAnalyzerModal,
      handleBuilderIntelligence, handleApplySuggestions,
    ],
  );

  const meta = useMemo(
    () => ({
      targetRef,
      scrollContainerRef,
      containerRef,
      previewWrapperRef,
      thumbnailRef,
      pdfSourceRef,
      cleanedDataForPreview,
      cleanedDataForThumbnail,
      cleanedDataForModal,
      leftWidth,
      previewScale,
      startResizing,
      getFormattedSaveTime,
      nextStepIndex,
      analyzerModalOpen,
      setAnalyzerModalOpen,
      analyzerModalData,
      isFeedbackModalOpen,
      setIsFeedbackModalOpen,
      isPreviewModalOpen,
      isAuthModalOpen,
      setIsAuthModalOpen,
      authRedirectUrl,
      isReferralModalOpen,
      setIsReferralModalOpen,
      referralUrl,
    }),
    [
      cleanedDataForPreview, cleanedDataForThumbnail, cleanedDataForModal,
      leftWidth, previewScale, startResizing, getFormattedSaveTime,
      nextStepIndex, analyzerModalOpen, analyzerModalData,
      isFeedbackModalOpen, isPreviewModalOpen,
      isAuthModalOpen, authRedirectUrl, isReferralModalOpen, referralUrl,
    ],
  );

  const contextValue: BuilderContextValue = useMemo(
    () => ({ state, actions, meta }),
    [state, actions, meta],
  );

  return <BuilderProvider value={contextValue}>{children}</BuilderProvider>;
}
