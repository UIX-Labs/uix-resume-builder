import type { SuggestedUpdate, SuggestionType } from '@entities/resume';
import { getResumeEmptyData, useSaveResumeForm, type ResumeData } from '@entities/resume';
import { data as formSchemaData } from '@entities/resume/api/schema-data';
import { deepMerge, normalizeStringsFields } from '@entities/resume/models/use-resume-data';
import { FeedbackModal } from '@features/feedback-form/ui/feedback-modal';
import { ResumeRenderer } from '@features/resume/renderer';
import { TemplateForm } from '@features/template-form';
import { MobileForm } from '@features/template-form/ui/mobile-form';
import { useIsMobile } from '@shared/hooks/use-mobile';
import { trackEvent } from '@shared/lib/analytics/Mixpanel';
import { camelToHumanString } from '@shared/lib/string';
import { debounce } from '@shared/lib/utils';
import { useAnalyzerStore } from '@shared/stores/analyzer-store';
import { Button } from '@shared/ui/button';
import AnalyzerModal from '@shared/ui/components/analyzer-modal';
import { AuthRedirectModal } from '@shared/ui/components/auth-redirect-modal';
import { PreviewButton } from '@shared/ui/components/preview-button';
import { useQueryClient } from '@tanstack/react-query';
import Header from '@widgets/landing-page/ui/header-section';
import { PreviewModal } from '@widgets/templates-page/ui/preview-modal';
import { TemplatesDialog } from '@widgets/templates-page/ui/templates-dialog';
import { Download, GripVertical } from 'lucide-react';
import { useParams, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'sonner';
import mockData from '../../../../mock-data.json';
import { useAutoSave } from '../hooks/use-auto-save';
import { useAutoThumbnail } from '../hooks/use-auto-thumbnail';
import { usePdfDownload } from '../hooks/use-pdf-download';
import { usePdfGeneration } from '../hooks/use-pdf-generation';
import { useResizablePanel } from '../hooks/use-resizable-panel';
import { useSaveAndNext } from '../hooks/use-save-and-next';
import { useSuggestionClickHandler } from '../hooks/use-suggestion-click-handler';
import { useTemplateManagement } from '../hooks/use-template-management';
import { useThumbnailGeneration } from '../hooks/use-thumbnail-generation';
import { getCleanDataForRenderer, syncMockDataWithActualIds } from '../lib/data-cleanup';
import { invalidateQueriesIfAllSuggestionsApplied } from '../lib/query-invalidation';
import { isSectionEmpty, SECTION_ICONS } from '../lib/section-utils';
import {
  applySuggestionsToArrayField,
  applySuggestionsToFieldValue,
  findItemById,
  removeAppliedSuggestions,
  updateItemFieldValue,
} from '../lib/suggestion-helpers';
import { formatTimeAgo } from '../lib/time-helpers';
import { useFormPageBuilder } from '../models/ctx';
import { useFormDataStore } from '../models/store';
import TemplateButton from './change-template-button';
import { MobileSectionList } from './mobile-section-list';
import { MobileFooter } from './mobile-footer';

/**
 * Checks if a field value is empty
 */
function isFieldEmpty(value: unknown): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim() === '';
  if (Array.isArray(value)) {
    if (value.length === 0) return true;
    // Check if all array items are empty strings
    return value.every((item) => typeof item === 'string' && item.trim() === '');
  }
  if (typeof value === 'object') {
    // For nested objects like duration, links - check if all nested values are empty
    return Object.entries(value).every(([key, val]) => {
      if (key === 'ongoing') return true; // Skip boolean flags
      return isFieldEmpty(val);
    });
  }
  return false;
}

/**
 * Deep merges form item with mock item, using mock values as fallback for empty fields
 */
function mergeItemWithMockFallback(
  formItem: Record<string, unknown>,
  mockItem: Record<string, unknown>,
): Record<string, unknown> {
  const merged: Record<string, unknown> = { ...formItem };

  for (const [key, mockValue] of Object.entries(mockItem)) {
    // Skip ID fields - always use form IDs
    if (key === 'id' || key === 'itemId') continue;

    const formValue = formItem[key];

    if (isFieldEmpty(formValue) && !isFieldEmpty(mockValue)) {
      // Use mock value as fallback for empty form fields
      merged[key] = mockValue;
    }
  }

  return merged;
}

/**
 * Gets data for the renderer by merging form data with mock data
 * For create mode: uses mock data as fallback for empty fields
 * For edit mode: uses form data directly
 */
function getRendererDataWithMockFallback(
  formData: Record<string, unknown>,
  isCreateMode: boolean,
): Record<string, unknown> {
  if (!isCreateMode) {
    return formData;
  }

  // In create mode, merge with mock data as fallback at field level
  const mergedData: Record<string, unknown> = {};
  const mockDataTyped = mockData as Record<string, unknown>;

  // Get all keys from both formData and mockData
  const allKeys = new Set([...Object.keys(formData), ...Object.keys(mockDataTyped)]);

  for (const sectionKey of allKeys) {
    if (sectionKey === 'templateId' || sectionKey === 'updatedAt') {
      mergedData[sectionKey] = formData[sectionKey];
      continue;
    }

    const formSection = formData[sectionKey] as Record<string, unknown> | undefined;
    const mockSection = mockDataTyped[sectionKey] as Record<string, unknown> | undefined;

    if (!formSection) {
      // No form section, use mock section with synced IDs
      if (mockSection) {
        const syncedMock = syncMockDataWithActualIds({ [sectionKey]: formSection }, { [sectionKey]: mockSection });
        mergedData[sectionKey] = syncedMock[sectionKey];
      }
      continue;
    }

    if (!mockSection) {
      // No mock section, use form section as-is
      mergedData[sectionKey] = formSection;
      continue;
    }

    // Both exist - merge at field level within items
    const mergedSection: Record<string, unknown> = {
      ...formSection,
    };

    // Preserve section-level properties from form
    if ('id' in formSection) mergedSection.id = formSection.id;
    if ('isHidden' in formSection) mergedSection.isHidden = formSection.isHidden;
    if ('suggestedUpdates' in formSection) mergedSection.suggestedUpdates = formSection.suggestedUpdates;

    // Merge items array at field level
    const formItems = formSection.items as Array<Record<string, unknown>> | undefined;
    const mockItems = mockSection.items as Array<Record<string, unknown>> | undefined;

    if (Array.isArray(mockItems)) {
      // Merge form items with mock items as fallback for empty fields
      // Use the longer array length to ensure we show all mock items
      const maxLength = Math.max(formItems?.length || 0, mockItems.length);

      mergedSection.items = Array.from({ length: maxLength }, (_, index) => {
        const formItem = formItems?.[index];
        const mockItem = mockItems[index];

        // If no form item exists at this index, use mock item
        if (!formItem) {
          return mockItem;
        }

        // If no mock item exists at this index, use form item
        if (!mockItem) {
          return formItem;
        }

        // Handle string items (like in achievements/interests)
        if (typeof formItem === 'string') {
          return isFieldEmpty(formItem) ? mockItem : formItem;
        }

        if (typeof formItem !== 'object' || formItem === null) {
          return mockItem;
        }

        // Handle object items - merge field by field, preserving form's itemId
        const merged = mergeItemWithMockFallback(
          formItem as Record<string, unknown>,
          mockItem as Record<string, unknown>,
        );

        // Always preserve the form's itemId if available
        if ((formItem as Record<string, unknown>).itemId) {
          merged.itemId = (formItem as Record<string, unknown>).itemId;
        }

        return merged;
      });
    }

    mergedData[sectionKey] = mergedSection;
  }

  return mergedData;
}

export function FormPageBuilder() {
  const params = useParams();
  const resumeId = params?.id as string;
  const { resumeData, currentStep, navs, setCurrentStep } = useFormPageBuilder();
  const setFormData = useFormDataStore((state) => state.setFormData);
  const formData = useFormDataStore((state) => state.formData);
  const formDataResumeId = useFormDataStore((state) => state.formDataResumeId);
  const isCreateMode = useFormDataStore((state) => state.isCreateMode);
  const setIsCreateMode = useFormDataStore((state) => state.setIsCreateMode);
  const queryClient = useQueryClient();
  const { analyzedData, resumeId: analyzerResumeId } = useAnalyzerStore();
  const isMobile = useIsMobile();

  const searchParams = useSearchParams();

  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(searchParams.get('preview') === 'true');
  const targetRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const previewWrapperRef = useRef<HTMLDivElement>(null);

  // Last save time state
  const [lastSaveTime, setLastSaveTime] = useState<number | null>(null);

  // Resizable panel logic
  const { leftWidth, previewScale, startResizing } = useResizablePanel({
    containerRef,
    previewWrapperRef,
  });

  // Analyzer modal state
  const [analyzerModalOpen, setAnalyzerModalOpen] = useState(false);
  const [analyzerModalData, setAnalyzerModalData] = useState<{
    suggestions: Array<{ old?: string; new: string; type: SuggestionType }>;
    fieldName: string;
    itemId: string;
    suggestionType: SuggestionType;
    formDataSectionKey?: string;
  } | null>(null);

  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const feedbackShownRef = useRef(false);

  const nextStepIndex = navs.findIndex((item) => item.name === currentStep) + 1;

  const { selectedTemplate, selectedTemplateId, handleTemplateSelect } = useTemplateManagement({
    resumeId,
    initialTemplate: resumeData?.template?.json,
    initialTemplateId: resumeData?.templateId,
  });

  const { thumbnailRef, generateAndSaveThumbnail } = useThumbnailGeneration(resumeId);

  const { isGeneratingPDF, generatePDF } = usePdfGeneration({
    thumbnailRef,
    formData,
    resumeId,
  });

  const { handleDownloadPDF, isAuthModalOpen, setIsAuthModalOpen, authRedirectUrl } = usePdfDownload({
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

  // Memoize cleaned data for renderer to prevent unnecessary re-renders
  // Only recompute when formData, isCreateMode, or isGeneratingPDF actually changes
  const cleanedDataForPreview = useMemo(
    () => getCleanDataForRenderer(getRendererDataWithMockFallback(formData ?? {}, isCreateMode), isGeneratingPDF),
    [formData, isCreateMode, isGeneratingPDF],
  );

  const cleanedDataForThumbnail = useMemo(
    () => getCleanDataForRenderer(getRendererDataWithMockFallback(formData ?? {}, isCreateMode), true),
    [formData, isCreateMode],
  );

  const cleanedDataForModal = useMemo(
    () => getCleanDataForRenderer(getRendererDataWithMockFallback(formData ?? {}, isCreateMode), false),
    [formData, isCreateMode],
  );

  useAutoThumbnail({
    resumeId,
    formData,
    generateAndSaveThumbnail,
  });

  const { mutateAsync: saveResumeForm } = useSaveResumeForm();

  const save = ({ type, data }: { type: string; data: any; updatedAt: number }) => {
    saveResumeForm({ type: type as any, data });
    setLastSaveTime(Date.now());
  };

  const { handleSaveResume, handleNextStep } = useSaveAndNext({
    currentStep,
    formData,
    resumeData,
    save,
    resumeId,
    navs,
    nextStepIndex,
    setCurrentStep: (step: string) => setCurrentStep(step as any),
    generateAndSaveThumbnail,
  });

  // Auto-save functionality - saves current section after 25s of inactivity
  useAutoSave({
    currentStep,
    formData,
    save,
    onSaveComplete: () => setLastSaveTime(Date.now()),
    debounceMs: 25000,
  });

  // Keyboard shortcut for save
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const isMeta = e.metaKey || e.ctrlKey;
      if (e.key === 's' && isMeta) {
        e.preventDefault();
        handleSaveResume();
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleSaveResume]);

  // Check if there are any suggestions in the form data
  const hasSuggestions = Boolean(
    formData &&
      Object.values(formData).some((section) => {
        if (section && typeof section === 'object' && 'suggestedUpdates' in section) {
          const suggestedUpdates = (section as { suggestedUpdates?: unknown[] }).suggestedUpdates;
          return Array.isArray(suggestedUpdates) && suggestedUpdates.length > 0;
        }
        return false;
      }),
  );

  // Debounced function for hide/unhide
  const debouncedHideSave = useCallback(
    debounce((sectionId: string, data: any) => {
      try {
        save({
          type: sectionId,
          data: data,
          updatedAt: Date.now(),
        });
      } catch (error) {
        console.error('Failed to save section visibility:', error);
        toast.error('Failed to update section visibility');
      }
    }, 1000),
    [save],
  );

  const handleToggleHideSection = useCallback(
    (sectionId: string, isHidden: boolean) => {
      const sectionData = formData[sectionId as keyof typeof formData];
      if (sectionData && typeof sectionData === 'object') {
        debouncedHideSave(sectionId, {
          ...(sectionData as Record<string, unknown>),
          isHidden,
        });
        toast.success(isHidden ? `Section hidden from resume` : `Section visible in resume`);
      }
    },
    [formData, debouncedHideSave],
  );

  // Callback to open analyzer modal with specific field data (for form-based clicks)
  const handleOpenAnalyzerModal = useCallback(
    (itemId: string, fieldName: string, suggestionType: SuggestionType) => {
      // Get suggestions for this specific field and type
      const currentData = formData?.[currentStep];

      if (!currentData || !currentData.suggestedUpdates) {
        return;
      }

      const itemUpdate = currentData.suggestedUpdates.find((update: SuggestedUpdate) => update.itemId === itemId);

      if (!itemUpdate || !itemUpdate.fields[fieldName]) {
        return;
      }

      const fieldData = itemUpdate.fields[fieldName];
      const suggestions =
        fieldData.suggestedUpdates?.filter(
          (s: { old?: string; new: string; type: SuggestionType }) => s.type === suggestionType,
        ) || [];

      setAnalyzerModalData({
        suggestions,
        fieldName,
        itemId,
        suggestionType,
        formDataSectionKey: currentStep,
      });
      setAnalyzerModalOpen(true);

      trackEvent('builder_intelligence_viewed', {
        resumeId,
        section: currentStep,
        field: fieldName,
        suggestionType,
        suggestionCount: suggestions.length,
      });
    },
    [formData, currentStep, resumeId],
  );

  // Handler for DOM-based suggestion clicks (from resume renderer)
  const handleSuggestionClickFromDOM = useCallback(
    ({
      sectionId,
      itemId,
      fieldName,
      suggestionType,
    }: {
      sectionId: string;
      itemId: string;
      fieldName: string;
      suggestionType: 'spelling_error' | 'sentence_refinement' | 'new_summary';
    }) => {
      // Map template sectionId to formData key
      const sectionToFormDataMap: Record<string, string> = {
        personaldetails: 'personalDetails',
        'header-section': 'personalDetails',
        header: 'personalDetails',
        summary: 'professionalSummary',
        professionalsummary: 'professionalSummary',
        experience: 'experience',
        education: 'education',
        skills: 'skills',
        projects: 'projects',
        certifications: 'certifications',
        interests: 'interests',
        achievements: 'achievements',
      };

      const formDataSectionKey = sectionToFormDataMap[sectionId.toLowerCase()] || sectionId;

      // Get section data from formData
      const sectionData = formData?.[formDataSectionKey];

      if (!sectionData || !sectionData.suggestedUpdates) {
        return;
      }

      // Find suggestions for this item and field
      const itemUpdate = sectionData.suggestedUpdates.find((update: SuggestedUpdate) => update.itemId === itemId);

      if (!itemUpdate || !itemUpdate.fields[fieldName]) {
        return;
      }

      const fieldData = itemUpdate.fields[fieldName];

      const suggestions =
        fieldData.suggestedUpdates?.filter(
          (s: { old?: string; new: string; type: SuggestionType }) => s.type === suggestionType,
        ) || [];

      if (suggestions.length === 0) {
        return;
      }

      setAnalyzerModalData({
        suggestions,
        fieldName,
        itemId,
        suggestionType,
        formDataSectionKey,
      });
      setAnalyzerModalOpen(true);

      trackEvent('builder_intelligence_viewed', {
        resumeId,
        section: formDataSectionKey,
        field: fieldName,
        suggestionType,
        suggestionCount: suggestions.length,
      });
    },
    [formData, resumeId],
  );

  // Use DOM event delegation for suggestion clicks
  useSuggestionClickHandler({
    containerRef: targetRef,
    onSuggestionClick: handleSuggestionClickFromDOM,
    enabled: hasSuggestions && !isGeneratingPDF,
  });

  const handleApplySuggestions = useCallback(
    async (
      selectedSuggestions: Array<{
        old?: string;
        new: string;
        type: SuggestionType;
      }>,
    ) => {
      if (!analyzerModalData) return;

      const { itemId, fieldName, formDataSectionKey } = analyzerModalData;
      // Use formDataSectionKey if available (from DOM clicks), otherwise fallback to currentStep
      const sectionKey = formDataSectionKey || currentStep;
      const currentData = formData?.[sectionKey];

      if (!currentData || !currentData.items || !Array.isArray(currentData.items)) {
        toast.error('Failed to apply suggestions');
        return;
      }

      try {
        const items = currentData.items;
        const itemIndex = findItemById(items, itemId);

        if (itemIndex === -1) {
          toast.error('Item not found');
          return;
        }

        const currentItem = items[itemIndex];
        if (typeof currentItem !== 'object' || currentItem === null) {
          toast.error('Invalid item type');
          return;
        }

        const currentFieldValue = (currentItem as Record<string, unknown>)[fieldName];

        // Check if field value is an array (for achievements, interests)
        const isArrayField = Array.isArray(currentFieldValue);

        let updatedFieldValue: string | string[];

        if (isArrayField) {
          updatedFieldValue = applySuggestionsToArrayField(currentFieldValue as string[], selectedSuggestions);
        } else {
          updatedFieldValue = applySuggestionsToFieldValue(currentFieldValue as string, selectedSuggestions);
        }

        // Check if suggestions were actually applied
        const hasChanged = isArrayField
          ? JSON.stringify(updatedFieldValue) !== JSON.stringify(currentFieldValue)
          : updatedFieldValue !== currentFieldValue;

        if (!hasChanged) {
          toast.error('Suggestions could not be applied');
          return;
        }

        const updatedItems = updateItemFieldValue(items, itemIndex, fieldName, updatedFieldValue);

        const updatedSuggestedUpdates = removeAppliedSuggestions(
          currentData.suggestedUpdates,
          itemId,
          fieldName,
          selectedSuggestions,
        );

        trackEvent('builder_intelligence_applied', {
          resumeId,
          section: sectionKey,
          field: fieldName,
          suggestionType: analyzerModalData.suggestionType,
          count: selectedSuggestions.length,
        });

        const updatedData = {
          ...formData,
          [sectionKey]: {
            ...currentData,
            items: updatedItems,
            suggestedUpdates:
              updatedSuggestedUpdates && updatedSuggestedUpdates.length > 0 ? updatedSuggestedUpdates : undefined,
          },
        };

        setFormData(updatedData as Omit<ResumeData, 'templateId'>, resumeId);

        // Check if all suggestions are applied and invalidate queries if needed
        invalidateQueriesIfAllSuggestionsApplied(queryClient, updatedData, resumeId);

        toast.success('Suggestions applied successfully.');
        setAnalyzerModalOpen(false);
      } catch (error) {
        console.error('❌ Failed to apply suggestions:', error);
        toast.error('Failed to apply suggestions');
      }
    },
    [analyzerModalData, formData, resumeId, queryClient, setFormData],
  );

  useEffect(() => {
    async function processAnalyzerData() {
      if (!resumeId || !analyzedData) return;

      // Fetch empty data for defaults
      const emptyData = await getResumeEmptyData();

      // Deep merge analyzer data with empty data to ensure all fields have default values
      let processedData: Record<string, any> = { ...analyzedData };
      for (const key of Object.keys(emptyData)) {
        processedData[key] = deepMerge(processedData[key], (emptyData as Record<string, any>)[key]);
      }

      // Normalize string fields (interests, achievements)
      processedData = normalizeStringsFields(processedData);

      setFormData(processedData as Omit<ResumeData, 'templateId'>, resumeId);
    }

    if (!resumeId) {
      return;
    }

    if (analyzerResumeId === resumeId && analyzedData) {
      processAnalyzerData();
      return;
    }

    if (!resumeData) return;

    // Only preserve suggestions if formData belongs to this resume
    const isSameResume = formDataResumeId === resumeId;
    if (isSameResume) {
      const hasSuggestionsInData = (data: any) => Object.values(data).some((s: any) => s?.suggestedUpdates?.length > 0);

      // If formData has suggestions but resumeData doesn't, preserve formData
      if (hasSuggestionsInData(formData) && !hasSuggestionsInData(resumeData)) {
        return;
      }
    }

    // Determine if this is create flow (all sections empty) or edit flow (has data)
    const sectionKeys = Object.keys(resumeData).filter(
      (key) => key !== 'templateId' && key !== 'updatedAt' && key !== 'template',
    );

    const allSectionsEmpty = sectionKeys.every((key) => isSectionEmpty(resumeData[key as keyof typeof resumeData]));

    if (allSectionsEmpty) {
      // Create flow: Set create mode flag
      // Keep form data EMPTY - user will fill it
      // Preview will use mock data via getRendererDataWithMockFallback
      setIsCreateMode(true);
      // Use the empty resumeData directly for the form (no mock data)
      setFormData(resumeData as Omit<ResumeData, 'templateId'>, resumeId);
    } else {
      // Edit flow: Use actual data as-is
      setIsCreateMode(false);
      setFormData(resumeData as Omit<ResumeData, 'templateId'>, resumeId);
    }
  }, [resumeId, resumeData, analyzedData, analyzerResumeId, setFormData, formDataResumeId]);

  // Initialize last save time from resume data
  useEffect(() => {
    if (resumeData?.updatedAt) {
      const updatedAt = new Date(resumeData.updatedAt as string).getTime();
      setLastSaveTime(updatedAt);
    }
  }, [resumeData?.updatedAt]);

  // Update display every 30 seconds to refresh relative time
  const [refreshKey, setRefreshKey] = useState(0);
  useEffect(() => {
    if (!lastSaveTime) return;

    const interval = setInterval(() => {
      setRefreshKey((prev) => prev + 1);
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [lastSaveTime]);

  // Format last save time
  const getFormattedSaveTime = useCallback(() => {
    return formatTimeAgo(lastSaveTime);
  }, [lastSaveTime, refreshKey]);

  const [isMobileFormOpen, setIsMobileFormOpen] = useState(false);
  const [mobileCurrentStep, setMobileCurrentStep] = useState<ResumeDataKey>('personalDetails');

  const handleMobileStepClick = useCallback((step: ResumeDataKey) => {
    setMobileCurrentStep(step);
    setIsMobileFormOpen(true);
  }, []);

  const handleMobileFormClose = useCallback(() => {
    setIsMobileFormOpen(false);
  }, []);

  const handleMobileSave = useCallback(() => {
    handleSaveResume();
  }, [handleSaveResume]);

  const handleMobileNext = useCallback(() => {
    const currentIndex = navs.findIndex((nav) => nav.name === mobileCurrentStep);
    if (currentIndex < navs.length - 1) {
      setMobileCurrentStep(navs[currentIndex + 1].name as ResumeDataKey);
    } else {
      setIsMobileFormOpen(false);
    }
  }, [mobileCurrentStep, navs]);

  const handleMobileBack = useCallback(() => {
    const currentIndex = navs.findIndex((nav) => nav.name === mobileCurrentStep);
    if (currentIndex > 0) {
      setMobileCurrentStep(navs[currentIndex - 1].name as ResumeDataKey);
    }
  }, [mobileCurrentStep, navs]);

  const handleMobileBackToResume = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ['resume', resumeId] });
    window.history.back();
  }, [queryClient, resumeId]);

  useEffect(() => {
    if (isMobile) return;
    if (!targetRef.current || !currentStep) return;

    // Map step names to template section IDs
    const stepToSectionMap: Record<string, string> = {
      personalDetails: 'header',
      experience: 'experience',
      education: 'education',
      skills: 'skills',
      projects: 'projects',
      certifications: 'certifications',
      interests: 'interests',
      achievements: 'achievements',
      professionalSummary: 'summary',
    };

    const sectionId = stepToSectionMap[currentStep];
    if (!sectionId) return;

    // Small delay to ensure DOM is ready
    const scrollTimer = setTimeout(() => {
      // Find the section element by data-section attribute
      const sectionElement = targetRef.current?.querySelector(`[data-section="${sectionId}"]`) as HTMLElement;

      if (sectionElement && scrollContainerRef.current) {
        // Get the container's scroll position and dimensions
        const container = scrollContainerRef.current;
        const containerRect = container.getBoundingClientRect();
        const sectionRect = sectionElement.getBoundingClientRect();

        // Calculate the scroll position to center the section
        const scrollTop = container.scrollTop + sectionRect.top - containerRect.top - 100; // 100px offset from top

        // Smooth scroll to the section
        container.scrollTo({
          top: scrollTop,
          behavior: 'smooth',
        });
      }
    }, 100);

    return () => clearTimeout(scrollTimer);
  }, [currentStep, isMobile]);

  const sharedComponents = (
    <>
      {analyzerModalData && (
        <AnalyzerModal
          open={analyzerModalOpen}
          onOpenChange={setAnalyzerModalOpen}
          suggestions={analyzerModalData.suggestions}
          suggestionType={analyzerModalData.suggestionType}
          onApply={handleApplySuggestions}
          resumeId={resumeId}
        />
      )}

      <FeedbackModal open={isFeedbackModalOpen} onOpenChange={setIsFeedbackModalOpen} />

      {selectedTemplate && (
        <PreviewModal
          template={{
            id: selectedTemplateId ?? '',
            json: selectedTemplate,
            publicImageUrl: '',
            createdAt: '',
            updatedAt: '',
          }}
          isOpen={isPreviewModalOpen}
          onClose={() => setIsPreviewModalOpen(false)}
          resumeData={cleanedDataForModal}
        />
      )}

      <AuthRedirectModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        redirectUrl={authRedirectUrl}
        title="Login Required"
        description="You need to login to download PDF."
      />
    </>
  );

  if (isMobile) {
    const currentMobileIndex = navs.findIndex((nav) => nav.name === mobileCurrentStep);
    const hasNext = currentMobileIndex < navs.length - 1;
    const hasPrevious = currentMobileIndex > 0;

    return (
      <>
        <div
          style={{
            position: 'absolute',
            left: '-9999px',
            top: 0,
            width: '794px',
            height: '0',
            overflow: 'hidden',
            pointerEvents: 'none',
            visibility: 'hidden',
            zIndex: -1,
          }}
          aria-hidden="true"
        >
          <div ref={thumbnailRef}>
            {selectedTemplate && (
              <ResumeRenderer
                template={selectedTemplate}
                data={cleanedDataForThumbnail}
                currentSection={undefined}
                hasSuggestions={false}
                isThumbnail={true}
                skipImageFallbacks={isGeneratingPDF}
              />
            )}
          </div>
        </div>

        <div className="flex flex-col min-h-screen bg-white">
          <Header />

          <MobileSectionList
            navs={navs}
            formData={formData ?? {}}
            formSchema={formSchemaData ?? {}}
            onSectionClick={handleMobileStepClick}
            onBackClick={handleMobileBackToResume}
          />

          <MobileFooter
            onDownloadPDF={handleDownloadPDF}
            onPreview={() => setIsPreviewModalOpen(true)}
            isGeneratingPDF={isGeneratingPDF}
          />

          <MobileForm
            formSchema={formSchemaData ?? {}}
            values={formData ?? {}}
            onChange={(data) => setFormData(data, resumeId)}
            currentStep={mobileCurrentStep}
            isOpen={isMobileFormOpen}
            onClose={handleMobileFormClose}
            onNext={handleMobileNext}
            onBack={handleMobileBack}
            hasNext={hasNext}
            hasPrevious={hasPrevious}
            onOpenAnalyzerModal={handleOpenAnalyzerModal}
            onSave={handleMobileSave}
          />
        </div>
        {sharedComponents}
      </>
    );
  }

  // Desktop view rendering
  return (
    <div ref={containerRef} className="flex w-full h-full relative">
      <div
        ref={scrollContainerRef}
        className="overflow-auto pt-4 pb-8 scroll-hidden h-[calc(100vh)] px-3 relative"
        style={{
          width: `${leftWidth}%`,
          minWidth: '30%',
          maxWidth: '70%',
          flexShrink: 0,
        }}
      >
        <div className="absolute top-0 right-3 z-10">
          <PreviewButton onClick={() => setIsPreviewModalOpen(true)} />
        </div>

        <div className="min-w-0 flex-1 flex justify-center relative" ref={previewWrapperRef}>
          <div
            ref={targetRef}
            style={{
              transform: `scale(${previewScale})`,
              transformOrigin: 'top center',
            }}
          >
            {selectedTemplate ? (
              <ResumeRenderer
                template={selectedTemplate}
                data={cleanedDataForPreview}
                currentSection={isGeneratingPDF ? undefined : currentStep}
                hasSuggestions={isGeneratingPDF ? false : hasSuggestions}
                isThumbnail={false}
                skipImageFallbacks={isGeneratingPDF}
              />
            ) : (
              <div className="flex items-center justify-center h-full min-h-[800px]">
                <div className="text-gray-500">Loading template...</div>
              </div>
            )}
          </div>
          <div
            style={{
              position: 'absolute',
              left: '0',
              top: '0',
              width: '794px',
              height: '0',
              overflow: 'hidden',
              pointerEvents: 'none',
              visibility: 'hidden',
              zIndex: -1,
            }}
            aria-hidden="true"
          >
            <div ref={thumbnailRef}>
              {selectedTemplate && (
                <ResumeRenderer
                  template={selectedTemplate}
                  data={cleanedDataForThumbnail}
                  currentSection={undefined}
                  hasSuggestions={false}
                  isThumbnail={true}
                  skipImageFallbacks={isGeneratingPDF}
                />
              )}
            </div>
          </div>
        </div>
        <div className="sticky bottom-0 left-0 right-0 flex justify-end items-center gap-3 pr-8 pb-4 pointer-events-none">
          <TemplatesDialog onTemplateSelect={handleTemplateSelect}>
            <div
              className="
                pointer-events-auto
                border border-[#CBE7FF]
                bg-[#E9F4FF]
                px-4 py-2
                rounded-xl
                shadow-lg
                flex items-center gap-1.5
                cursor-pointer
                font-semibold
                text-[#005FF2]
                hover:bg-[#E9F4FF] hover:text-white
                transition-colors
              "
            >
              <TemplateButton />
            </div>
          </TemplatesDialog>
          <Button
            onClick={handleDownloadPDF}
            className="
              pointer-events-auto
              border border-[#CBE7FF]
              bg-[#E9F4FF]
              font-semibold
              text-[#005FF2]
              hover:bg-[#E9F4FF] hover:text-white
              shadow-lg
              disabled:opacity-50 disabled:cursor-not-allowed
              cursor-pointer
              flex items-center gap-1.5
              rounded-xl
              p-5.5
            "
          >
            {isGeneratingPDF ? (
              <span className="text-[13px] font-semibold bg-gradient-to-r from-[#246EE1] to-[#1C3965] bg-clip-text text-transparent">
                Generating PDF...
              </span>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span className="text-[13px] font-semibold bg-gradient-to-r from-[#246EE1] to-[#1C3965] bg-clip-text text-transparent">
                  Download PDF
                </span>
              </>
            )}
          </Button>
        </div>
      </div>
      {/* Resizer Handle */}
      <div
        role="slider"
        aria-orientation="vertical"
        aria-label="Resize panels"
        aria-valuemin={20}
        aria-valuemax={70}
        aria-valuenow={Math.round(leftWidth)}
        tabIndex={0}
        className="w-3 cursor-col-resize flex items-center justify-center bg-gray-200 active:bg-blue-100 transition-colors z-50 shrink-0"
        onMouseDown={startResizing}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            startResizing();
          }
        }}
      >
        <div className="w-2 h-12 bg-gray-300 rounded-full flex items-center justify-center">
          <GripVertical className="w-2 h-2 text-gray-500" />
        </div>
      </div>

      <div className="relative bg-white rounded-tl-[36px] rounded-bl-[36px] flex-1 max-h-[calc(100vh-32px)] mt-4 flex-col flex overflow-hidden px-1">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, #ccc 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />

        <div className="sticky top-0 z-10 bg-white py-5 px-5 flex justify-end">
          <Button
            className="bg-[#E9F4FF] rounded-xl text-sm font-semibold px-6 text-[#005FF2] hover:bg-blue-700 hover:text-white border border-[#CBE7FF] cursor-pointer"
            onClick={handleSaveResume}
          >
            Save
          </Button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-auto px-5 py-5 scroll-hidden flex-1 relative">
          <TemplateForm
            formSchema={formSchemaData ?? {}}
            currentStep={currentStep}
            values={formData ?? {}}
            onChange={(formData) => setFormData(formData, resumeId)}
            onOpenAnalyzerModal={handleOpenAnalyzerModal}
            onToggleHideSection={handleToggleHideSection}
          />
        </div>

        {/* Sticky Bottom - Next Button */}
        <div className="sticky bottom-0 z-10 bg-white px-5 py-4 border-t border-gray-100 flex items-center gap-4">
          {/* Last Save Time on the left */}
          <div className="flex-1 flex justify-start">
            {getFormattedSaveTime() && <p className="text-sm text-gray-500">{getFormattedSaveTime()}</p>}
          </div>

          {/* Next Button on the right */}
          {navs[nextStepIndex]?.name && (
            <Button
              className="bg-[#E9F4FF] rounded-xl text-sm font-semibold px-6 text-[#005FF2] hover:bg-blue-700 hover:text-white border border-[#CBE7FF] cursor-pointer"
              onClick={handleNextStep}
            >
              {`Next : ${camelToHumanString(navs[nextStepIndex]?.name)}`}
            </Button>
          )}
        </div>
      </div>
      {sharedComponents}
    </div>
  );
}
