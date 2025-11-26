import { useGetAllResumes, useTemplateFormSchema, useUpdateResumeTemplate, getResumeEmptyData } from '@entities/resume';
import { generateThumbnail, ResumeRenderer } from '@features/resume/renderer';
import aniketTemplate from '@features/resume/templates/standard';
import { TemplateForm } from '@features/template-form';
import { Button } from '@shared/ui/button';
import { useEffect, useRef, useState } from 'react';
import { useFormPageBuilder } from '../models/ctx';
import { useFormDataStore } from '../models/store';
import { camelToHumanString } from '@shared/lib/string';
import { Resolution, usePDF } from 'react-to-pdf';
import { useParams } from 'next/navigation';
import { uploadThumbnail } from '@entities/resume/api/upload-resume';
import { useMutation } from '@tanstack/react-query';
import { useUserProfile } from '@shared/hooks/use-user';
import { toast } from 'sonner';
import { useResumeManager, deepMerge, normalizeStringsFields } from '@entities/resume/models/use-resume-data';
import { TemplatesDialog } from '@widgets/templates-page/ui/templates-dialog';
import type { Template } from '@entities/template-page/api/template-data';
import TemplateButton from './change-template-button';
import AnalyzerModal from '@shared/ui/components/analyzer-modal';

import type { SuggestedUpdate, ResumeData, SuggestionType } from '@entities/resume';
import {
  findItemById,
  applySuggestionsToFieldValue,
  removeAppliedSuggestions,
  updateItemFieldValue,
} from '../lib/suggestion-helpers';
import { getCleanDataForRenderer } from '../lib/data-cleanup';
import { useAnalyzerStore } from '@shared/stores/analyzer-store';
import dayjs from 'dayjs';
import { useCheckIfCommunityMember } from '@entities/download-pdf/queries/queries';
import WishlistModal from './wishlist-modal';
import WishlistSuccessModal from './waitlist-success-modal';

export function FormPageBuilder() {
  const params = useParams();
  const resumeId = params?.id as string;

  const thumbnailGenerated = useRef(false);

  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  const [isWishlistModalOpen, setIsWishlistModalOpen] = useState(false);
  const [isWishlistSuccessModalOpen, setIsWishlistSuccessModalOpen] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const { analyzedData, resumeId: analyzerResumeId } = useAnalyzerStore();

  // Analyzer modal state
  const [analyzerModalOpen, setAnalyzerModalOpen] = useState(false);
  const [analyzerModalData, setAnalyzerModalData] = useState<{
    suggestions: Array<{ old?: string; new: string; type: SuggestionType }>;
    fieldName: string;
    itemId: string;
    suggestionType: SuggestionType;
  } | null>(null);

  const { data, save } = useResumeManager(resumeId);
  const { data: formSchema } = useTemplateFormSchema();

  const { data: user } = useUserProfile();

  const { data: resumes, refetch: refetchResumes } = useGetAllResumes({ userId: user?.id as string });

  const currentResume = resumes?.find((resume) => resume.id === resumeId);
  const templateId = currentResume?.templateId || null;
  const embeddedTemplate = currentResume?.template;

  const { formData, setFormData } = useFormDataStore();

  const { currentStep, setCurrentStep, navs } = useFormPageBuilder();
  const { mutateAsync: uploadThumbnailMutation } = useMutation({
    mutationFn: uploadThumbnail,
  });

  const currentMonthYear = dayjs().format('MMMM-YYYY').toLowerCase();
  const fullName = formData?.personalDetails?.items?.[0]?.fullName;
  const formattedName = fullName ? fullName.toLowerCase().replace(/\s+/g, '-') : 'resume';
  const resumeFileName = `${formattedName}-${currentMonthYear}.pdf`;

  const { mutateAsync: updateResumeTemplateMutation } = useUpdateResumeTemplate();

  const { mutateAsync: checkCommunityMember } = useCheckIfCommunityMember();

  const { toPDF, targetRef } = usePDF({
    filename: resumeFileName,
    resolution: Resolution.HIGH,
    overrides: {
      pdf: {
        unit: 'px',
      },
      canvas: {
        useCORS: true,
      },
    },
  });

  const handleDownloadPDF = async () => {
    try {
      if (!user?.email) {
        toast.error('User email is required to download PDF');
        return;
      }

      const response = await checkCommunityMember({
        personal_email: user?.email,
        uix_email: user?.email,
      });

      if (response?.is_uix_member) {
        setIsGeneratingPdf(true);
        // Small delay to let the blur effect clear before capturing
        await new Promise((resolve) => setTimeout(resolve, 100));
        await toPDF();
        setIsGeneratingPdf(false);
      } else {
        setIsWishlistModalOpen(true);
      }
    } catch (error) {
      console.error('Failed to check community membership:', error);
      toast.error('Failed to verify community membership');
      setIsGeneratingPdf(false);
    }
  };

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const isMeta = e.metaKey || e.ctrlKey;
      if (e.key === 's' && isMeta) {
        handleSaveResume();
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    async function processAnalyzerData() {
      if (!resumeId || !analyzedData) return;

      // Fetch empty data for defaults
      const emptyData = await getResumeEmptyData();

      // Deep merge analyzer data with empty data to ensure all fields have default values
      let processedData = { ...analyzedData };
      for (const key of Object.keys(emptyData)) {
        processedData[key] = deepMerge(processedData[key], emptyData[key]);
      }

      // Normalize string fields (interests, achievements)
      processedData = normalizeStringsFields(processedData);

      useFormDataStore.setState({ formData: processedData ?? {} });
    }

    if (!resumeId) {
      return;
    }

    if (analyzerResumeId === resumeId && analyzedData) {
      processAnalyzerData();
      return;
    }

    if (data) {
      useFormDataStore.setState({ formData: data ?? {} });
    }
  }, [resumeId, data, analyzedData, analyzerResumeId]);

  useEffect(() => {
    if (embeddedTemplate) {
      setSelectedTemplate(embeddedTemplate);
    } else if (templateId === null && currentResume) {
      setSelectedTemplate({
        id: 'default',
        json: aniketTemplate,
      } as Template);
    }
  }, [embeddedTemplate, templateId, currentResume]);

  // Auto-scroll to section when currentStep changes
  useEffect(() => {
    if (!targetRef.current || !currentStep) return;

    // Find section by matching data-section attribute that contains the current step name
    const allSections = targetRef.current.querySelectorAll('[data-section]') as NodeListOf<HTMLElement>;

    for (const element of Array.from(allSections)) {
      const sectionId = element.getAttribute('data-section');
      if (sectionId) {
        const lowerSectionId = sectionId.toLowerCase();
        const lowerCurrentStep = currentStep.toLowerCase();

        // Check if section ID matches or contains current step
        if (
          lowerSectionId === lowerCurrentStep ||
          lowerSectionId.startsWith(lowerCurrentStep + '-') ||
          lowerSectionId.includes(lowerCurrentStep)
        ) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          break;
        }
      }
    }
  }, [currentStep]);

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

  async function generateAndSaveThumbnail() {
    if (!targetRef.current || !resumeId) {
      return;
    }

    try {
      const thumbnailDataUrl = await generateThumbnail(targetRef.current);

      if (!thumbnailDataUrl) {
        return;
      }

      await uploadThumbnailMutation({ resumeId, thumbnail: thumbnailDataUrl });

      thumbnailGenerated.current = true;
      refetchResumes();
    } catch (error) {
      console.error('Background thumbnail generation failed:', error);
    }
  }

  useEffect(() => {
    const curResume = resumes?.find((resume) => resume.id === resumeId);

    if (!curResume || curResume.publicThumbnail || thumbnailGenerated.current) {
      return;
    }

    generateAndSaveThumbnail();
  }, [resumeId, resumes]);

  async function handleNextStep() {
    handleSaveResume();
    setCurrentStep(navs[nextStepIndex]?.name ?? '');
  }

  async function handleSaveResume() {
    try {
      thumbnailGenerated.current = false;

      await save({
        type: currentStep,
        data: formData[currentStep],
        updatedAt: Date.now(),
      });

      await generateAndSaveThumbnail();

      toast.success(`Resume saved successfully`);
    } catch {
      toast.error('Failed to save resume');
    }
  }

  const nextStepIndex = navs.findIndex((item) => item.name === currentStep) + 1;

  const handleTemplateSelect = async (template: Template) => {
    try {
      await updateResumeTemplateMutation({
        resumeId: resumeId,
        templateId: template.id,
      });

      setSelectedTemplate(template);
      refetchResumes();

      toast.success('Template updated successfully');
    } catch (error) {
      console.error('Failed to update template:', error);
      toast.error('Failed to update template');
    }
  };

  // Callback to open analyzer modal with specific field data
  const handleOpenAnalyzerModal = (itemId: string, fieldName: string, suggestionType: SuggestionType) => {
    // Get suggestions for this specific field and type
    const currentData = formData?.[currentStep];

    if (!currentData || !currentData.suggestedUpdates) {
      return;
    }

    const itemUpdate = currentData.suggestedUpdates.find((update: SuggestedUpdate) => update.itemId === itemId);

    if (!itemUpdate || !itemUpdate.fields[fieldName]) {
      console.log('⚠️ No updates found for this field');
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
  };

  const handleApplySuggestions = async (
    selectedSuggestions: Array<{ old?: string; new: string; type: SuggestionType }>,
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

      const currentFieldValue = ((currentItem as Record<string, unknown>)[fieldName] as string) || '';

      const updatedFieldValue = applySuggestionsToFieldValue(currentFieldValue, selectedSuggestions);

      // Check if suggestions were actually applied
      if (updatedFieldValue === currentFieldValue) {
        console.warn('⚠️ Suggestions were not applied - field value unchanged');
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

      toast.success('Suggestions applied successfully.');
      setAnalyzerModalOpen(false);
    } catch (error) {
      console.error('❌ Failed to apply suggestions:', error);
      toast.error('Failed to apply suggestions');
    }
  };

  return (
    <>
      <div
        className="overflow-auto pt-4 pb-8 scroll-hidden h-[calc(100vh)] px-3"
        style={{
          minWidth: 794 + 48 + 6,
          maxWidth: 794 + 48 + 6,
        }}
      >
        <div
          className="bg-white border-[3px] border-blue-800 outline-[3px]
                        outline-blue-400 rounded-[18px] overflow-auto  min-w-0 flex-1"
        >
          <div className="relative">
            <Button
              onClick={handleDownloadPDF}
              className="relative z-10 float-right mt-8 mr-8 cursor-pointer
                        border border-[#CBE7FF] bg-[#E9F4FF]
                        font-semibold text-[#005FF2] hover:bg-blue-700 hover:text-white"
            >
              Save as PDF
            </Button>
          </div>
          <div ref={targetRef} style={{ fontFamily: 'fangsong' }}>
            {selectedTemplate ? (
              <ResumeRenderer
                template={selectedTemplate.json || aniketTemplate}
                data={getCleanDataForRenderer(formData ?? {})}
                currentSection={currentStep}
                isGeneratingPdf={isGeneratingPdf}
                hasSuggestions={hasSuggestions}
              />
            ) : (
              <div className="flex items-center justify-center h-full min-h-[800px]">
                <div className="text-gray-500">Loading template...</div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="relative bg-white rounded-tl-[36px] rounded-bl-[36px] w-full max-h-[calc(100vh-32px)] mt-4 flex-col flex overflow-hidden px-1">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, #ccc 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />

        <div className="overflow-auto py-5 px-5 gap-3 mt-4 scroll-hidden">
          <TemplatesDialog onTemplateSelect={handleTemplateSelect}>
            <TemplateButton />
          </TemplatesDialog>

          <div
            className="mt-6 mb-4"
            style={{
              background: 'linear-gradient(90deg, rgba(23, 23, 23, 0) 0%, #B8B8B8 51.09%)',
              height: '1px',
              width: '100%',
            }}
          />

          <TemplateForm
            formSchema={formSchema ?? {}}
            currentStep={currentStep}
            values={formData ?? {}}
            onChange={(formData) => setFormData(formData)}
            onOpenAnalyzerModal={handleOpenAnalyzerModal}
          />

          <div className="mt-5 cursor-pointer z-0 relative ml-auto flex justify-end border-0">
            {navs[nextStepIndex]?.name && (
              <Button
                className="mt-auto bg-[#E9F4FF] rounded-xl text-sm font-semibold
        text-[#005FF2] hover:bg-blue-700 hover:text-white border border-[#CBE7FF] mr-4 cursor-pointer"
                onClick={handleNextStep}
              >
                {`Next: ${camelToHumanString(navs[nextStepIndex]?.name)}`}
              </Button>
            )}
            <Button
              className="mt-auto bg-[#E9F4FF] rounded-xl text-sm font-semibold
       text-[#005FF2] hover:bg-blue-700 hover:text-white border border-[#CBE7FF] cursor-pointer"
              onClick={handleSaveResume}
            >
              Save
            </Button>
          </div>
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
        />
      )}

      {isWishlistModalOpen && (
        <WishlistModal
          isOpen={isWishlistModalOpen}
          onClose={() => setIsWishlistModalOpen(false)}
          onJoinSuccess={() => setIsWishlistSuccessModalOpen(true)}
        />
      )}

      {isWishlistSuccessModalOpen && (
        <WishlistSuccessModal
          isOpen={isWishlistSuccessModalOpen}
          onClose={() => setIsWishlistSuccessModalOpen(false)}
        />
      )}
    </>
  );
}
