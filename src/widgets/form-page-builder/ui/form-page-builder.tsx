import { useGetAllResumes, useTemplateFormSchema, useUpdateResumeTemplate } from '@entities/resume';
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
import { useResumeManager } from '@entities/resume/models/use-resume-data';
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

export function FormPageBuilder() {
  const params = useParams();
  const resumeId = params?.id as string;

  const thumbnailGenerated = useRef(false);

  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

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

  const { currentStep, setCurrentStep, navs } = useFormPageBuilder();
  const { mutateAsync: uploadThumbnailMutation } = useMutation({
    mutationFn: uploadThumbnail,
  });

  const { mutateAsync: updateResumeTemplateMutation } = useUpdateResumeTemplate();

  const { toPDF, targetRef } = usePDF({
    filename: 'resume.pdf',
    resolution: Resolution.EXTREME,
    overrides: {
      pdf: {
        unit: 'px',
      },
      canvas: {
        useCORS: true,
      },
    },
  });

  const handleDownloadPDF = () => {
    toPDF();
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

  const { formData, setFormData } = useFormDataStore();

  useEffect(() => {
    if (!resumeId) {
      return;
    }

    if (analyzerResumeId === resumeId && analyzedData) {
      useFormDataStore.setState({ formData: analyzedData ?? {} });
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
      console.error('Failed to apply suggestions:', error);
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
                        outline-blue-400 rounded-[18px] overflow-auto w-full min-w-0 flex-1"
        >
          <div ref={targetRef} style={{ fontFamily: 'fangsong' }}>
            <ResumeRenderer
              template={selectedTemplate?.json || aniketTemplate}
              data={getCleanDataForRenderer(formData ?? {})}
            />
          </div>

          <Button
            onClick={handleDownloadPDF}
            className="absolute z-1 top-8 left-[calc(16px+12px+794px-12px)] 
                      -translate-x-full border border-[#CBE7FF] bg-[#E9F4FF] 
                      font-semibold text-[#005FF2] hover:bg-blue-700 hover:text-white"
          >
            Save as PDF
          </Button>
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

          <div className="mt-5 cursor-pointer z-100 relative ml-auto flex justify-end border-0">
            {navs[nextStepIndex]?.name && (
              <Button
                className="mt-auto bg-[#E9F4FF] rounded-xl text-sm font-semibold 
                text-[#005FF2] hover:bg-blue-700 hover:text-white border border-[#CBE7FF] mr-4"
                onClick={handleNextStep}
              >
                {`Next: ${camelToHumanString(navs[nextStepIndex]?.name)}`}
              </Button>
            )}
            <Button
              className="mt-auto bg-[#E9F4FF] rounded-xl text-sm font-semibold
               text-[#005FF2] hover:bg-blue-700 hover:text-white border border-[#CBE7FF]"
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
    </>
  );
}
