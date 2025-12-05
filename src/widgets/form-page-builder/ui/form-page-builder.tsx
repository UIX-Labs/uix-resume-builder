import { useGetAllResumes, useTemplateFormSchema, useUpdateResumeTemplate, getResumeEmptyData } from '@entities/resume';
import { generateThumbnail, ResumeRenderer } from '@features/resume/renderer';
import aniketTemplate from '@features/resume/templates/standard';
import { TemplateForm } from '@features/template-form';
import { Button } from '@shared/ui/button';
import { useEffect, useRef, useState, useCallback } from 'react';
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
import AnalyzerModal from '@shared/ui/components/analyzer-modal';
import mockData from '../../../../mock-data.json';

import type { SuggestedUpdate, ResumeData, SuggestionType } from '@entities/resume';
import {
  findItemById,
  applySuggestionsToFieldValue,
  applySuggestionsToArrayField,
  removeAppliedSuggestions,
  updateItemFieldValue,
} from '../lib/suggestion-helpers';
import { getCleanDataForRenderer, isSectionModified } from '../lib/data-cleanup';
import { useAnalyzerStore } from '@shared/stores/analyzer-store';
import dayjs from 'dayjs';
import { useCheckIfCommunityMember } from '@entities/download-pdf/queries/queries';
import WishlistModal from './wishlist-modal';
import WishlistSuccessModal from './waitlist-success-modal';
import { Download } from 'lucide-react';
import { convertHtmlToPdf } from '@entities/download-pdf/api';
import type { JoinCommunityResponse } from '@entities/download-pdf/types/type';
import TemplateButton from './change-template-button';

// Custom debounce function
function debounce<T extends (...args: any[]) => any>(func: T, wait: number) {
  let timeout: NodeJS.Timeout | null = null;
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Checks if a single section is empty
 * Returns true if section has no meaningful data
 */
function isSectionEmpty(section: any): boolean {
  if (!section || typeof section !== 'object') {
    return true;
  }

  if ('items' in section && Array.isArray(section.items)) {
    const items = section.items;

    if (items.length === 0) {
      return true;
    }

    // Check if items contain any non-empty values
    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      if (typeof item === 'string' && item.trim() !== '') {
        return false;
      } else if (typeof item === 'object' && item !== null) {
        const hasNonEmptyField = Object.entries(item).some(([key, value]) => {
          // Skip id, title, itemId, rank, ongoing and metadata fields
          if (key === 'id' || key === 'itemId' || key === 'ongoing' || key === 'rank' || key === 'title') {
            return false;
          }

          if (typeof value === 'string') {
            const isNonEmpty = value.trim() !== '';
            if (isNonEmpty) {
              console.log(`    → Found non-empty string field "${key}": "${value}"`);
            }
            return isNonEmpty;
          }

          if (typeof value === 'object' && value !== null) {
            const hasNonEmptyNested = Object.values(value).some((v) => typeof v === 'string' && v.trim() !== '');
            if (hasNonEmptyNested) {
              console.log(`    → Found non-empty nested object field "${key}":`, value);
            }
            return hasNonEmptyNested;
          }

          if (Array.isArray(value)) {
            const hasNonEmptyArray = value.some((v) => typeof v === 'string' && v.trim() !== '');
            if (hasNonEmptyArray) {
              console.log(`    → Found non-empty array field "${key}":`, value);
            }
            return hasNonEmptyArray;
          }

          return false;
        });

        if (hasNonEmptyField) {
          console.log(`  → Item ${i} has non-empty fields`);
          return false;
        } else {
          console.log(`  → Item ${i} has only empty fields`);
        }
      }
    }
  }

  return true;
}

/**
 * Syncs IDs from actual section to mock section
 * Preserves actual IDs while using mock data content
 */
function syncSectionIds(actualSection: any, mockSection: any): any {
  if (!actualSection || !mockSection) {
    return mockSection;
  }

  const synced = { ...mockSection };

  // Sync section ID
  if (actualSection.id) {
    synced.id = actualSection.id;
  }

  // Sync itemIds in items array
  if (Array.isArray(synced.items) && Array.isArray(actualSection.items)) {
    synced.items = synced.items.map((mockItem: any, index: number) => {
      if (typeof mockItem === 'object' && mockItem !== null) {
        const actualItem = actualSection.items[index];
        if (actualItem && typeof actualItem === 'object' && actualItem !== null) {
          return {
            ...mockItem,
            itemId: actualItem.itemId || mockItem.itemId,
          };
        }
      }
      return mockItem;
    });
  }

  return synced;
}

export function FormPageBuilder() {
  const params = useParams();
  const resumeId = params?.id as string;

  const thumbnailGenerated = useRef(false);

  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  const [isWishlistModalOpen, setIsWishlistModalOpen] = useState(false);
  const [isWishlistSuccessModalOpen, setIsWishlistSuccessModalOpen] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [lastSaveTime, setLastSaveTime] = useState<number | null>(null);
  const [isGeneratingThumbnail, setIsGeneratingThumbnail] = useState(false);

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
    page: {
      format: 'A4',
    },
    overrides: {
      pdf: {
        unit: 'px',
      },
      canvas: {
        useCORS: true,
      },
    },
  });

  const generatePDF = async () => {
    setIsGeneratingPDF(true);

    // Wait for React to re-render without highlights
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Get HTML content from the resume
    const htmlContent = targetRef.current?.innerHTML;

    if (!htmlContent) {
      toast.error('Failed to generate PDF');
      setIsGeneratingPDF(false);
      return;
    }

    // Add necessary styles for the PDF
    const styledHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');

            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }

            body {
              font-family: 'Inter', system-ui, sans-serif;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }

            /* Remove all highlighting styles */
            .resume-highlight {
              background-color: transparent !important;
              border: none !important;
              padding: 0 !important;
            }

            .resume-highlight > div:first-child {
              display: none !important;
            }

            /* Hide blur effects */
            .blur-\\[2px\\] {
              filter: none !important;
            }

            /* Ensure page breaks work correctly */
            @media print {
              @page {
                size: A4;
                margin: 0;
              }

              .resume-highlight {
                background: none !important;
                border: none !important;
              }
            }
          </style>
        </head>
        <body>${htmlContent}</body>
      </html>
    `;

    // Call the API to convert HTML to PDF
    const pdfBlob = await convertHtmlToPdf(styledHtml);

    // Download the PDF
    const url = URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = resumeFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast.success('PDF downloaded successfully');
    setIsGeneratingPDF(false);
  };

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
        await generatePDF();
      } else {
        setIsWishlistModalOpen(true);
      }
    } catch (error) {
      console.error('Failed to download PDF:', error);
      toast.error('Failed to download PDF');
      setIsGeneratingPDF(false);
    }
  };

  const handleWaitlistJoinSuccess = async (response: JoinCommunityResponse) => {
    if (response?.joinCommunityRequested) {
      try {
        await generatePDF();
      } catch (error) {
        console.error('Failed to generate PDF after joining waitlist:', error);
        toast.error('Failed to download PDF');
      }
    } else {
      setIsWishlistSuccessModalOpen(true);
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
      // Determine if this is create flow (all sections empty) or edit flow (has data)
      const sectionKeys = Object.keys(data).filter((key) => key !== 'templateId' && key !== 'updatedAt');
      const allSectionsEmpty = sectionKeys.every((key) => isSectionEmpty(data[key as keyof typeof data]));

      if (allSectionsEmpty) {
        const mergedData: Record<string, any> = {};

        for (const sectionKey of Object.keys(data)) {
          if (sectionKey === 'templateId' || sectionKey === 'updatedAt') {
            mergedData[sectionKey] = data[sectionKey as keyof typeof data];
            continue;
          }

          const actualSection = data[sectionKey as keyof typeof data];
          const mockSection = (mockData as Record<string, any>)[sectionKey];

          if (mockSection) {
            const syncedSection = syncSectionIds(actualSection, mockSection);
            mergedData[sectionKey] = syncedSection;
          } else {
            mergedData[sectionKey] = actualSection;
          }
        }

        useFormDataStore.setState({ formData: mergedData as Omit<ResumeData, 'templateId'> });
      } else {
        useFormDataStore.setState({ formData: data as Omit<ResumeData, 'templateId'> });
      }
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

    // Small delay to ensure pages are rendered after pagination
    const scrollTimer = setTimeout(() => {
      // Find section by matching data-section attribute that contains the current step name
      const allSections = targetRef.current!.querySelectorAll('[data-section]') as NodeListOf<HTMLElement>;

      for (const element of Array.from(allSections)) {
        // Skip hidden elements (like the dummy content used for pagination)
        const computedStyle = window.getComputedStyle(element);
        if (computedStyle.visibility === 'hidden' || computedStyle.display === 'none') {
          continue;
        }

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
    }, 100);

    return () => clearTimeout(scrollTimer);
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
      setIsGeneratingThumbnail(true);

      // Wait for React to re-render without highlights/sparkles
      await new Promise((resolve) => setTimeout(resolve, 100));

      const thumbnailDataUrl = await generateThumbnail(targetRef.current);

      if (!thumbnailDataUrl) {
        setIsGeneratingThumbnail(false);
        return;
      }

      await uploadThumbnailMutation({ resumeId, thumbnail: thumbnailDataUrl });

      thumbnailGenerated.current = true;
      refetchResumes();
    } catch (error) {
      console.error('Background thumbnail generation failed:', error);
    } finally {
      setIsGeneratingThumbnail(false);
    }
  }

  useEffect(() => {
    const curResume = resumes?.find((resume) => resume.id === resumeId);

    if (!curResume || curResume.publicThumbnail || thumbnailGenerated.current) {
      return;
    }

    generateAndSaveThumbnail();
  }, [resumeId, resumes]);

  // Auto-save effect - triggers when formData changes
  useEffect(() => {
    if (!currentStep || !formData || !formData[currentStep]) {
      return;
    }

    // Trigger auto-save after 2 seconds of inactivity
    debouncedAutoSave(currentStep, formData[currentStep]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData, currentStep]);

  async function handleNextStep() {
    setCurrentStep(navs[nextStepIndex]?.name ?? '');
  }

  async function handleSaveResume() {
    try {
      // Check if current section has been modified compared to mock data
      const hasModifications = isSectionModified(currentStep, formData, mockData);

      if (!hasModifications) {
        toast.info(`No changes to save in ${currentStep}`);

        return;
      }

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

  // Debounced function for hide/unhide
  const debouncedHideSave = useCallback(
    debounce(async (sectionId: string, data: any) => {
      try {
        await save({
          type: sectionId,
          data: data,
          updatedAt: Date.now(),
        });
        // Update last save time when save completes successfully
        setLastSaveTime(Date.now());
      } catch (error) {
        console.error('Failed to save section visibility:', error);
        toast.error('Failed to update section visibility');
      }
    }, 1000),
    [save],
  );

  // Debounced auto-save function
  const debouncedAutoSave = useCallback(
    debounce(async (step: string, data: any) => {
      try {
        // Get fresh formData from store instead of using stale closure
        const currentFormData = useFormDataStore.getState().formData;

        // Check if section has been modified compared to mock data
        const hasModifications = isSectionModified(step, currentFormData, mockData);

        if (!hasModifications) {
          return;
        }
        await save({
          type: step,
          data: data,
          updatedAt: Date.now(),
        });

        // Update last save time when save completes successfully
        setLastSaveTime(Date.now());

        // await generateAndSaveThumbnail();
      } catch (error) {
        console.error('Auto-save failed:', error);
      }
    }, 2000),
    [save],
  );

  const handleToggleHideSection = useCallback(
    (sectionId: string, isHidden: boolean) => {
      const sectionData = formData[sectionId as keyof typeof formData];
      if (sectionData) {
        debouncedHideSave(sectionId, { ...sectionData, isHidden });
        toast.success(isHidden ? `Section hidden from resume` : `Section visible in resume`);
      }
    },
    [formData, debouncedHideSave],
  );

  const nextStepIndex = navs.findIndex((item) => item.name === currentStep) + 1;

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
  const formatLastSaveTime = useCallback(() => {
    if (!lastSaveTime) return null;
    const diff = Date.now() - lastSaveTime;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    
    if (seconds < 60) {
      return 'saved less than a minute ago';
    } else if (minutes === 1) {
      return 'saved a minute ago';
    } else if (minutes < 60) {
      return `saved ${minutes} minutes ago`;
    } else {
      const hours = Math.floor(minutes / 60);
      if (hours === 1) {
        return 'saved an hour ago';
      } else if (hours < 24) {
        return `saved ${hours} hours ago`;
      } else {
        const days = Math.floor(hours / 24);
        if (days === 1) {
          return 'saved 24 hours ago';
        } else {
          return `saved ${days} days ago`;
        }
      }
    }
  }, [lastSaveTime, refreshKey]);

  // Initialize last save time from resume data
  useEffect(() => {
    if (currentResume?.updatedAt) {
      const updatedAt = new Date(currentResume.updatedAt).getTime();
      setLastSaveTime(updatedAt);
    }
  }, [currentResume?.updatedAt]);

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
        className="overflow-auto pt-4 pb-8 scroll-hidden h-[calc(100vh)] px-3 relative"
        style={{
          minWidth: 794 + 48 + 6,
          maxWidth: 794 + 48 + 6,
        }}
      >
        <div className="min-w-0 flex-1 flex justify-center">
          <div ref={targetRef}>
            {selectedTemplate ? (
              <ResumeRenderer
               template={selectedTemplate?.json ?? aniketTemplate}
                data={getCleanDataForRenderer(formData ?? {}, isGeneratingPDF)}
                currentSection={isGeneratingPDF || isGeneratingThumbnail ? undefined : currentStep}
                hasSuggestions={isGeneratingPDF || isGeneratingThumbnail ? false : hasSuggestions}
                isThumbnail={isGeneratingPDF || isGeneratingThumbnail}
              />
            ) : (
              <div className="flex items-center justify-center h-full min-h-[800px]">
                <div className="text-gray-500">Loading template...</div>
              </div>
            )}
          </div>
        </div>

        {/* Sticky Save as PDF button */}
      <div className="sticky bottom-0 left-0 right-0 flex justify-end items-center gap-3 pr-8 pb-4 pointer-events-none">
  {/* Change Template Button */}
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


  {/* Download PDF Button */}
  <Button
    onClick={handleDownloadPDF}
    disabled={isGeneratingPDF}
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
        <Download className="w-4 h-4" /><span className="text-[13px] font-semibold bg-gradient-to-r from-[#246EE1] to-[#1C3965] bg-clip-text text-transparent">
        Download PDF
      </span>
      </>
    )}
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

        {/* Sticky Top - Save Button on the right */}
        <div className="sticky top-0 z-10 bg-white py-5 px-5 flex justify-end">
          <Button
            className="bg-[#E9F4FF] rounded-xl text-sm font-semibold px-6
             text-[#005FF2] hover:bg-blue-700 hover:text-white border border-[#CBE7FF] cursor-pointer"
            onClick={handleSaveResume}
          >
            Save
          </Button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-auto px-5 py-5 scroll-hidden flex-1">
          <TemplateForm
            formSchema={formSchema ?? {}}
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
            {formatLastSaveTime() && (
              <p className="text-sm text-gray-500">
                {formatLastSaveTime()}
              </p>
            )}
          </div>

          {/* Next Button on the right */}
          {navs[nextStepIndex]?.name && (
            <Button
              className="bg-[#E9F4FF] rounded-xl text-sm font-semibold px-6
              text-[#005FF2] hover:bg-blue-700 hover:text-white border border-[#CBE7FF] cursor-pointer"
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
        />
      )}
      {isWishlistModalOpen && (
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
      )}
    </>
  );
}