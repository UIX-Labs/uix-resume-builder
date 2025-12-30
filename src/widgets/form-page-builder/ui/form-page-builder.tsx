import { PreviewButton } from '@shared/ui/components/preview-button';
import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { useFormPageBuilder } from '../models/ctx';
import { ResumeRenderer } from '@features/resume/renderer';
import { useFormDataStore } from '../models/store';
import { getCleanDataForRenderer } from '../lib/data-cleanup';
import TemplateButton from './change-template-button';
import { TemplatesDialog } from '@widgets/templates-page/ui/templates-dialog';
import { Button } from '@shared/ui/button';
import { Download, GripVertical } from 'lucide-react';
import { TemplateForm } from '@features/template-form';
import { camelToHumanString } from '@shared/lib/string';
import { data as formSchemaData } from '@entities/resume/api/schema-data';
import { usePdfGeneration } from '../hooks/use-pdf-generation';
import { PreviewModal } from '@widgets/templates-page/ui/preview-modal';
import { useParams } from 'next/navigation';
import { useThumbnailGeneration } from '../hooks/use-thumbnail-generation';
import { useTemplateManagement } from '../hooks/use-template-management';
import { usePdfDownload } from '../hooks/use-pdf-download';
import { useAutoThumbnail } from '../hooks/use-auto-thumbnail';
import { useSaveAndNext } from '../hooks/use-save-and-next';
import { useAutoSave } from '../hooks/use-auto-save';
import { useResizablePanel } from '../hooks/use-resizable-panel';
import { useSaveResumeForm } from '@entities/resume';
import { getResumeEmptyData, type ResumeData } from '@entities/resume';
import { deepMerge } from '@entities/resume/models/use-resume-data';
import mockData from '../../../../mock-data.json';
import { toast } from 'sonner';
import { debounce } from '@shared/lib/utils';
import type { SuggestedUpdate, SuggestionType } from '@entities/resume';
import {
  findItemById,
  applySuggestionsToFieldValue,
  applySuggestionsToArrayField,
  removeAppliedSuggestions,
  updateItemFieldValue,
} from '../lib/suggestion-helpers';
import { isSectionEmpty, syncSectionIds } from '../lib/section-utils';
import { trackEvent } from '@shared/lib/analytics/Mixpanel';
import { invalidateQueriesIfAllSuggestionsApplied } from '../lib/query-invalidation';
import { useQueryClient } from '@tanstack/react-query';
import AnalyzerModal from '@shared/ui/components/analyzer-modal';
import { useAnalyzerStore } from '@shared/stores/analyzer-store';
import { normalizeStringsFields } from '@entities/resume/models/use-resume-data';
import { formatTimeAgo } from '../lib/time-helpers';

export function FormPageBuilder() {
  const params = useParams();
  const resumeId = params?.id as string;
  const { resumeData, currentStep, navs, setCurrentStep } = useFormPageBuilder();
  const setFormData = useFormDataStore((state) => state.setFormData);
  const formData = useFormDataStore((state) => state.formData);
  const queryClient = useQueryClient();
  const { analyzedData, resumeId: analyzerResumeId } = useAnalyzerStore();

  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
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
  } | null>(null);

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

  const { handleDownloadPDF } = usePdfDownload({ resumeId, generatePDF });

  // Memoize cleaned data for renderer to prevent unnecessary re-renders
  // Only recompute when formData or isGeneratingPDF actually changes
  const cleanedDataForPreview = useMemo(
    () => getCleanDataForRenderer(formData ?? {}, isGeneratingPDF),
    [formData, isGeneratingPDF],
  );

  const cleanedDataForThumbnail = useMemo(() => getCleanDataForRenderer(formData ?? {}, true), [formData]);

  const cleanedDataForModal = useMemo(() => getCleanDataForRenderer(formData ?? {}, false), [formData]);

  useAutoThumbnail({
    resumeId,
    formData,
    generateAndSaveThumbnail,
    intervalMs: 25000,
  });

  const { mutateAsync: saveResumeForm } = useSaveResumeForm();

  const save = ({ type, data }: { type: string; data: any; updatedAt: number }) => {
    saveResumeForm({ type: type as any, data });
    setLastSaveTime(Date.now());
  };

  const { handleSaveResume, handleNextStep } = useSaveAndNext({
    currentStep,
    formData,
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

  // Callback to open analyzer modal with specific field data
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

  const handleApplySuggestions = useCallback(
    async (
      selectedSuggestions: Array<{
        old?: string;
        new: string;
        type: SuggestionType;
      }>,
    ) => {
      if (!analyzerModalData) return;

      const { itemId, fieldName } = analyzerModalData;
      const currentData = formData?.[currentStep];

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
          section: currentStep,
          field: fieldName,
          suggestionType: analyzerModalData.suggestionType,
          count: selectedSuggestions.length,
        });

        const updatedData = {
          ...formData,
          [currentStep]: {
            ...currentData,
            items: updatedItems,
            suggestedUpdates:
              updatedSuggestedUpdates && updatedSuggestedUpdates.length > 0 ? updatedSuggestedUpdates : undefined,
          },
        };

        setFormData(updatedData as Omit<ResumeData, 'templateId'>);

        // Check if all suggestions are applied and invalidate queries if needed
        invalidateQueriesIfAllSuggestionsApplied(queryClient, updatedData, resumeId);

        toast.success('Suggestions applied successfully.');
        setAnalyzerModalOpen(false);
      } catch (error) {
        console.error('❌ Failed to apply suggestions:', error);
        toast.error('Failed to apply suggestions');
      }
    },
    [analyzerModalData, formData, currentStep, resumeId, queryClient, setFormData],
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

      setFormData(processedData as Omit<ResumeData, 'templateId'>);
    }

    if (!resumeId) {
      return;
    }

    if (analyzerResumeId === resumeId && analyzedData) {
      processAnalyzerData();
      return;
    }

    if (!resumeData) return;

    // Check if current formData has suggestions
    const formDataHasSuggestions =
      formData &&
      Object.values(formData).some((section) => {
        if (section && typeof section === 'object' && 'suggestedUpdates' in section) {
          const suggestedUpdates = (section as { suggestedUpdates?: unknown[] }).suggestedUpdates;
          return Array.isArray(suggestedUpdates) && suggestedUpdates.length > 0;
        }
        return false;
      });

    // Check if resumeData has suggestions
    const resumeDataHasSuggestions = Object.values(resumeData).some((section) => {
      if (section && typeof section === 'object' && 'suggestedUpdates' in section) {
        const suggestedUpdates = (section as { suggestedUpdates?: unknown[] }).suggestedUpdates;
        return Array.isArray(suggestedUpdates) && suggestedUpdates.length > 0;
      }
      return false;
    });

    // If formData has suggestions but resumeData doesn't,
    // it means Builder Intelligence set the suggestions - don't overwrite!
    if (formDataHasSuggestions && !resumeDataHasSuggestions) {
      return;
    }

    // Determine if this is create flow (all sections empty) or edit flow (has data)
    const sectionKeys = Object.keys(resumeData).filter(
      (key) => key !== 'templateId' && key !== 'updatedAt' && key !== 'template',
    );

    const allSectionsEmpty = sectionKeys.every((key) => isSectionEmpty(resumeData[key as keyof typeof resumeData]));

    if (allSectionsEmpty) {
      // Create flow: Merge mock data with actual IDs
      const mergedData: Record<string, any> = {};

      for (const sectionKey of Object.keys(resumeData)) {
        if (sectionKey === 'templateId' || sectionKey === 'updatedAt' || sectionKey === 'template') {
          mergedData[sectionKey] = resumeData[sectionKey as keyof typeof resumeData];
          continue;
        }

        const actualSection = resumeData[sectionKey as keyof typeof resumeData];
        const mockSection = (mockData as Record<string, any>)[sectionKey];

        if (mockSection) {
          const syncedSection = syncSectionIds(
            actualSection as Record<string, unknown>,
            mockSection as Record<string, unknown>,
          );
          mergedData[sectionKey] = syncedSection;
        } else {
          mergedData[sectionKey] = actualSection;
        }
      }

      setFormData(mergedData as Omit<ResumeData, 'templateId'>);
    } else {
      // Edit flow: Use actual data as-is
      setFormData(resumeData as Omit<ResumeData, 'templateId'>);
    }
  }, [resumeId, resumeData, analyzedData, analyzerResumeId, setFormData]);

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

  // Auto-scroll to section when currentStep changes
  useEffect(() => {
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
  }, [currentStep]);

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
        className="w-3 cursor-col-resize flex items-center justify-center active:bg-blue-100 transition-colors z-50 shrink-0"
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
        <div className="overflow-auto px-5 py-5 scroll-hidden flex-1">
          <TemplateForm
            formSchema={formSchemaData ?? {}}
            currentStep={currentStep}
            values={formData ?? {}}
            onChange={(formData) => setFormData(formData)}
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
      {/* Analyzer Modal */}
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
      {/* {isWishlistModalOpen && (
        <WishlistModal
          isOpen={isWishlistModalOpen}
          onClose={() => setIsWishlistModalOpen(false)}
          onJoinSuccess={handleWaitlistJoinSuccess}
        />
      )}
      {isWishlistSuccessModalOpen && (
        <WishlistSuccessModal
          isOpen={isWishlistSuccessModalOpen}
          onClose={() => setIsWishlistSuccessModalOpen(false)}
        />
      )} */}
      {/* Resume Preview Modal */}
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
    </div>
  );
}
