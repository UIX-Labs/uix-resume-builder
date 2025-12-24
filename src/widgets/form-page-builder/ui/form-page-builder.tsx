import {
  useGetAllResumes,
  useTemplateFormSchema,
  useUpdateResumeTemplate,
  getResumeEmptyData,
} from "@entities/resume";
import { generateThumbnail, ResumeRenderer } from "@features/resume/renderer";
import { ThumbnailRenderer } from "@features/resume/lib/thumbnail/thumbnail-renderer";
import aniketTemplate from "@features/resume/templates/standard";
import { TemplateForm } from "@features/template-form";
import { Button } from "@shared/ui/button";
import { useEffect, useRef, useState, useCallback } from "react";
import { useFormPageBuilder } from "../models/ctx";
import { useFormDataStore } from "../models/store";
import { camelToHumanString } from "@shared/lib/string";
import { Resolution, usePDF } from "react-to-pdf";
import { useParams } from "next/navigation";
import { uploadThumbnail } from "@entities/resume/api/upload-resume";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUserProfile } from "@shared/hooks/use-user";
import { toast } from "sonner";
import {
  useResumeManager,
  deepMerge,
  normalizeStringsFields,
} from "@entities/resume/models/use-resume-data";
import { TemplatesDialog } from "@widgets/templates-page/ui/templates-dialog";
import type { Template } from "@entities/template-page/api/template-data";
import { PreviewModal } from "@widgets/templates-page/ui/preview-modal";
import { PreviewButton } from "@shared/ui/components/preview-button";
import AnalyzerModal from "@shared/ui/components/analyzer-modal";
import mockData from "../../../../mock-data.json";

import type {
  SuggestedUpdate,
  ResumeData,
  SuggestionType,
} from "@entities/resume";
import {
  findItemById,
  applySuggestionsToFieldValue,
  applySuggestionsToArrayField,
  removeAppliedSuggestions,
  updateItemFieldValue,
} from "../lib/suggestion-helpers";
import {
  getCleanDataForRenderer,
  isSectionModified,
} from "../lib/data-cleanup";
import { useAnalyzerStore } from "@shared/stores/analyzer-store";
import { Download, GripVertical } from "lucide-react";
import TemplateButton from "./change-template-button";
import { trackEvent, startTimedEvent } from "@shared/lib/analytics/Mixpanel";
import { saveSectionWithSuggestions } from "../lib/save-helpers";
import { invalidateQueriesIfAllSuggestionsApplied } from "../lib/query-invalidation";
import { usePdfGeneration } from "../hooks/use-pdf-generation";
import { useQueryInvalidationOnNavigation } from "../hooks/use-query-invalidation";
import { formatTimeAgo } from "../lib/time-helpers";

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
  if (!section || typeof section !== "object") {
    console.log("section is empty", section);
    return true;
  }

  if ("items" in section && Array.isArray(section.items)) {
    console.log("section items are not empty", section.items);
    const items = section.items;

    if (items.length === 0) {
      console.log("section items.length is 0", items);
      return true;
    }

    // Check if items contain any non-empty values
    // If ANY item has ANY non-empty field, return false
    // Only return true if ALL items are empty
    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      if (typeof item === "string" && item.trim() !== "") {
        return false;
      } else if (typeof item === "object" && item !== null) {
        const hasNonEmptyField = Object.entries(item).some(([key, value]) => {
          // Skip id, title, itemId, rank, ongoing and metadata fields
          if (
            key === "id" ||
            key === "itemId" ||
            key === "ongoing" ||
            key === "rank" ||
            key === "title"
          ) {
            return false;
          }

          if (typeof value === "string") {
            const isNonEmpty = value.trim() !== "";
            return isNonEmpty;
          }

          if (typeof value === "object" && value !== null) {
            const hasNonEmptyNested = Object.values(value).some(
              (v) => typeof v === "string" && v.trim() !== ""
            );
            return hasNonEmptyNested;
          }

          if (Array.isArray(value)) {
            const hasNonEmptyArray = value.some(
              (v) => typeof v === "string" && v.trim() !== ""
            );
            return hasNonEmptyArray;
          }

          return false;
        });

        // If this item has any non-empty field, the section is not empty
        if (hasNonEmptyField) {
          return false;
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
      if (typeof mockItem === "object" && mockItem !== null) {
        const actualItem = actualSection.items[index];
        if (
          actualItem &&
          typeof actualItem === "object" &&
          actualItem !== null
        ) {
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
  const thumbnailRef = useRef<HTMLDivElement>(null);

  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null
  );
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  // const [isWishlistModalOpen, setIsWishlistModalOpen] = useState(false);
  // const [isWishlistSuccessModalOpen, setIsWishlistSuccessModalOpen] =
  //   useState(false);
  const [lastSaveTime, setLastSaveTime] = useState<number | null>(null);

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
  const queryClient = useQueryClient();

  const { data: user } = useUserProfile();

  const { data: resumes, refetch: refetchResumes } = useGetAllResumes({
    userId: user?.id as string,
  });

  const currentResume = resumes?.find((resume) => resume.id === resumeId);
  const templateId = currentResume?.templateId || null;
  const embeddedTemplate = currentResume?.template;

  const { formData, setFormData } = useFormDataStore();

  const { currentStep, setCurrentStep, navs } = useFormPageBuilder();
  const { mutateAsync: uploadThumbnailMutation } = useMutation({
    mutationFn: uploadThumbnail,
  });

  const { mutateAsync: updateResumeTemplateMutation } =
    useUpdateResumeTemplate();

  // const { mutateAsync: checkCommunityMember } = useCheckIfCommunityMember();

  const { targetRef } = usePDF({
    filename: "resume.pdf",
    resolution: Resolution.HIGH,
    page: {
      format: "A4",
    },
    overrides: {
      pdf: {
        unit: "px",
      },
      canvas: {
        useCORS: true,
      },
    },
  });

  const { isGeneratingPDF, generatePDF } = usePdfGeneration({
    thumbnailRef,
    formData,
    resumeId,
  });

  // Resizable logic
  const [leftWidth, setLeftWidth] = useState(50);
  const isDragging = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [previewScale, setPreviewScale] = useState(1);
  const previewWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = previewWrapperRef.current;
    if (!element) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        // 794px is the fixed width of the resume
        // We add some padding (e.g. 40px) to ensure it doesn't touch the edges
        const scale = (width - 40) / 794;
        setPreviewScale(Math.max(scale, 0.4)); // Minimum scale 0.4
      }
    });

    resizeObserver.observe(element);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current || !containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const newLeftWidth = e.clientX - containerRect.left;
      const newPercent = (newLeftWidth / containerRect.width) * 100;

      const minLeftWidthPx = (containerRect.height * 794) / 1122 + 40;
      const minPercent = (minLeftWidthPx / containerRect.width) * 100;

      const effectiveMinPercent = Math.max(minPercent, 20);

      if (newPercent > effectiveMinPercent && newPercent < 70) {
        setLeftWidth(newPercent);
      }
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      document.body.style.cursor = "default";
      document.body.style.userSelect = "auto";
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const startResizing = () => {
    isDragging.current = true;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  };

  const handleDownloadPDF = async () => {
    try {
      if (!user?.email) {
        toast.error("User email is required to download PDF");
        return;
      }

      startTimedEvent("resume_download");

      // const response = await checkCommunityMember({
      //   personal_email: user?.email,
      //   uix_email: user?.email,
      // });

      // if (response?.is_uix_member) {
      await generatePDF();
      trackEvent("resume_download", {
        status: "success",
        format: "pdf",
        resumeId,
      });
      // } else {
      //   setIsWishlistModalOpen(true);
      //   trackEvent("resume_download_waitlist_prompt", {
      //     resumeId,
      //   });
      // }
    } catch (error) {
      console.error("Failed to download PDF:", error);
      toast.error("Failed to download PDF");
      trackEvent("resume_download", {
        status: "failed",
        error: error instanceof Error ? error.message : "Unknown error",
        resumeId,
      });
    }
  };

  // const handleWaitlistJoinSuccess = async (response: JoinCommunityResponse) => {
  //   if (response?.joinCommunityRequested) {
  //     try {
  //       await generatePDF();
  //     } catch (error) {
  //       console.error("Failed to generate PDF after joining waitlist:", error);
  //       toast.error("Failed to download PDF");
  //     }
  //   } else {
  //     setIsWishlistSuccessModalOpen(true);
  //   }
  // };

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const isMeta = e.metaKey || e.ctrlKey;
      if (e.key === "s" && isMeta) {
        handleSaveResume();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Handle query invalidation on navigation
  useQueryInvalidationOnNavigation(resumeId);

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
      console.log("data", data);
      // Determine if this is create flow (all sections empty) or edit flow (has data)
      const sectionKeys = Object.keys(data).filter(
        (key) => key !== "templateId" && key !== "updatedAt"
      );
      const allSectionsEmpty = sectionKeys.every((key) =>
        isSectionEmpty(data[key as keyof typeof data])
      );
      console.log("sectionKeys", sectionKeys);

      console.log("allSectionsEmpty", allSectionsEmpty);

      if (allSectionsEmpty) {
        const mergedData: Record<string, any> = {};

        for (const sectionKey of Object.keys(data)) {
          if (sectionKey === "templateId" || sectionKey === "updatedAt") {
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

        useFormDataStore.setState({
          formData: mergedData as Omit<ResumeData, "templateId">,
        });
      } else {
        useFormDataStore.setState({
          formData: data as Omit<ResumeData, "templateId">,
        });
      }
    }
  }, [resumeId, data, analyzedData, analyzerResumeId]);

  useEffect(() => {
    if (embeddedTemplate) {
      setSelectedTemplate(embeddedTemplate);
    } else if (templateId === null && currentResume) {
      setSelectedTemplate({
        id: "default",
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
      const allSections = targetRef.current!.querySelectorAll(
        "[data-section]"
      ) as NodeListOf<HTMLElement>;

      for (const element of Array.from(allSections)) {
        // Skip hidden elements (like the dummy content used for pagination)
        const computedStyle = window.getComputedStyle(element);
        if (
          computedStyle.visibility === "hidden" ||
          computedStyle.display === "none"
        ) {
          continue;
        }

        const sectionId = element.getAttribute("data-section");
        if (sectionId) {
          const lowerSectionId = sectionId.toLowerCase();
          const lowerCurrentStep = currentStep.toLowerCase();

          // Check if section ID matches or contains current step
          if (
            lowerSectionId === lowerCurrentStep ||
            lowerSectionId.startsWith(lowerCurrentStep + "-") ||
            lowerSectionId.includes(lowerCurrentStep)
          ) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
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
        if (
          section &&
          typeof section === "object" &&
          "suggestedUpdates" in section
        ) {
          const suggestedUpdates = (section as { suggestedUpdates?: unknown[] })
            .suggestedUpdates;
          return Array.isArray(suggestedUpdates) && suggestedUpdates.length > 0;
        }
        return false;
      })
  );

  async function generateAndSaveThumbnail() {
    if (!thumbnailRef.current || !resumeId) {
      return;
    }

    try {
      // Get the parent container
      const container = thumbnailRef.current.parentElement as HTMLElement;

      if (!container) {
        return;
      }

      // Wait for component to render and layout to complete
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Verify the element has content
      if (
        !thumbnailRef.current.innerHTML ||
        thumbnailRef.current.innerHTML.trim() === ""
      ) {
        return;
      }

      // Temporarily make container visible for capture (but keep it hidden visually)
      const originalHeight = container.style.height;
      const originalOverflow = container.style.overflow;
      const originalPosition = container.style.position;

      container.style.height = "auto";
      container.style.overflow = "visible";
      container.style.position = "absolute";
      container.style.left = "-9999px"; // Move far off-screen instead of clipping
      container.style.top = "0";

      // Wait a bit for layout to update
      await new Promise((resolve) => setTimeout(resolve, 100));

      // generateThumbnail now handles image loading internally
      const thumbnailDataUrl = await generateThumbnail(thumbnailRef.current);

      // Restore original styles
      container.style.height = originalHeight;
      container.style.overflow = originalOverflow;
      container.style.position = originalPosition;
      container.style.left = "0";

      if (!thumbnailDataUrl) {
        return;
      }

      await uploadThumbnailMutation({ resumeId, thumbnail: thumbnailDataUrl });

      thumbnailGenerated.current = true;
      refetchResumes();
    } catch (error) {
      console.error("Background thumbnail generation failed:", error);
    }
  }

  useEffect(() => {
    const curResume = resumes?.find((resume) => resume.id === resumeId);

    if (!curResume || curResume.publicThumbnail || thumbnailGenerated.current) {
      return;
    }

    generateAndSaveThumbnail();
  }, [resumeId, resumes]);

  // Auto-generate thumbnail every 20 seconds
  useEffect(() => {
    if (!resumeId || !targetRef.current) {
      return;
    }

    const intervalId = setInterval(() => {
      // Only regenerate if there's form data
      if (formData && Object.keys(formData).length > 0) {
        generateAndSaveThumbnail();
      }
    }, 25000);

    return () => clearInterval(intervalId);
  }, [resumeId]);

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
    try {
      // Check if current section has been modified compared to mock data
      const hasModifications = isSectionModified(
        currentStep,
        formData,
        mockData
      );

      if (hasModifications) {
        thumbnailGenerated.current = false;

        // Save current section and all sections with suggestions
        await saveSectionWithSuggestions(currentStep, formData, save);

        // Get fresh formData after save to check suggestion state
        const updatedFormData = useFormDataStore.getState().formData;
        invalidateQueriesIfAllSuggestionsApplied(
          queryClient,
          updatedFormData,
          resumeId
        );
      }
    } catch (error) {
      console.error("Failed to save before moving to next step:", error);
      toast.error("Failed to save changes");
      // Don't invalidate on error
    }

    setCurrentStep(navs[nextStepIndex]?.name ?? "");
  }

  async function handleSaveResume() {
    try {
      // Check if current section has been modified compared to mock data
      const hasModifications = isSectionModified(
        currentStep,
        formData,
        mockData
      );

      if (!hasModifications) {
        toast.info(`No changes to save in ${currentStep}`);

        return;
      }

      thumbnailGenerated.current = false;

      // Save current section and all sections with suggestions
      await saveSectionWithSuggestions(currentStep, formData, save);

      await generateAndSaveThumbnail();

      // Get fresh formData after save to check suggestion state
      const updatedFormData = useFormDataStore.getState().formData;
      invalidateQueriesIfAllSuggestionsApplied(
        queryClient,
        updatedFormData,
        resumeId
      );

      toast.success(`Resume saved successfully`);

      trackEvent("resume_saved", {
        resumeId,
        section: currentStep,
        autoSave: false,
      });
    } catch {
      toast.error("Failed to save resume");
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
        console.error("Failed to save section visibility:", error);
        toast.error("Failed to update section visibility");
      }
    }, 1000),
    [save]
  );

  // Debounced auto-save function
  const debouncedAutoSave = useCallback(
    debounce(async (step: string, data: any) => {
      try {
        // Get fresh formData from store instead of using stale closure
        const currentFormData = useFormDataStore.getState().formData;

        // Check if section has been modified compared to mock data
        const hasModifications = isSectionModified(
          step,
          currentFormData,
          mockData
        );

        if (!hasModifications) {
          return;
        }
        await save({
          type: step,
          data: data,
          updatedAt: Date.now(),
        });
        setLastSaveTime(Date.now());

        // Get fresh formData to check suggestion state
        const updatedFormData = useFormDataStore.getState().formData;
        invalidateQueriesIfAllSuggestionsApplied(
          queryClient,
          updatedFormData,
          resumeId
        );

        trackEvent("resume_saved", {
          resumeId,
          section: step,
          autoSave: true,
        });
      } catch (error) {
        console.error("Auto-save failed:", error);
      }
    }, 25000),
    [save, queryClient]
  );

  const handleToggleHideSection = useCallback(
    (sectionId: string, isHidden: boolean) => {
      const sectionData = formData[sectionId as keyof typeof formData];
      if (sectionData) {
        debouncedHideSave(sectionId, { ...sectionData, isHidden });
        toast.success(
          isHidden ? `Section hidden from resume` : `Section visible in resume`
        );
      }
    },
    [formData, debouncedHideSave]
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
    return formatTimeAgo(lastSaveTime);
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

      toast.success("Template updated successfully");

      trackEvent("template_selected", {
        templateId: template.id,
        resumeId,
      });
    } catch (error) {
      console.error("Failed to update template:", error);
      toast.error("Failed to update template");
    }
  };

  // Callback to open analyzer modal with specific field data
  const handleOpenAnalyzerModal = (
    itemId: string,
    fieldName: string,
    suggestionType: SuggestionType
  ) => {
    // Get suggestions for this specific field and type
    const currentData = formData?.[currentStep];

    if (!currentData || !currentData.suggestedUpdates) {
      return;
    }

    const itemUpdate = currentData.suggestedUpdates.find(
      (update: SuggestedUpdate) => update.itemId === itemId
    );

    if (!itemUpdate || !itemUpdate.fields[fieldName]) {
      return;
    }

    const fieldData = itemUpdate.fields[fieldName];
    const suggestions =
      fieldData.suggestedUpdates?.filter(
        (s: { old?: string; new: string; type: SuggestionType }) =>
          s.type === suggestionType
      ) || [];

    setAnalyzerModalData({
      suggestions,
      fieldName,
      itemId,
      suggestionType,
    });
    setAnalyzerModalOpen(true);

    trackEvent("builder_intelligence_viewed", {
      resumeId,
      section: currentStep,
      field: fieldName,
      suggestionType,
      suggestionCount: suggestions.length,
    });
  };

  const handleApplySuggestions = async (
    selectedSuggestions: Array<{
      old?: string;
      new: string;
      type: SuggestionType;
    }>
  ) => {
    if (!analyzerModalData) return;

    const { itemId, fieldName } = analyzerModalData;
    const currentData = formData?.[currentStep];

    if (
      !currentData ||
      !currentData.items ||
      !Array.isArray(currentData.items)
    ) {
      toast.error("Failed to apply suggestions");
      return;
    }

    try {
      const items = currentData.items;
      const itemIndex = findItemById(items, itemId);

      if (itemIndex === -1) {
        toast.error("Item not found");
        return;
      }

      const currentItem = items[itemIndex];
      if (typeof currentItem !== "object" || currentItem === null) {
        toast.error("Invalid item type");
        return;
      }

      const currentFieldValue = (currentItem as Record<string, unknown>)[
        fieldName
      ];

      // Check if field value is an array (for achievements, interests)
      const isArrayField = Array.isArray(currentFieldValue);

      let updatedFieldValue: string | string[];

      if (isArrayField) {
        updatedFieldValue = applySuggestionsToArrayField(
          currentFieldValue as string[],
          selectedSuggestions
        );
      } else {
        updatedFieldValue = applySuggestionsToFieldValue(
          currentFieldValue as string,
          selectedSuggestions
        );
      }

      // Check if suggestions were actually applied
      const hasChanged = isArrayField
        ? JSON.stringify(updatedFieldValue) !==
          JSON.stringify(currentFieldValue)
        : updatedFieldValue !== currentFieldValue;

      if (!hasChanged) {
        toast.error("Suggestions could not be applied");
        return;
      }

      const updatedItems = updateItemFieldValue(
        items,
        itemIndex,
        fieldName,
        updatedFieldValue
      );

      const updatedSuggestedUpdates = removeAppliedSuggestions(
        currentData.suggestedUpdates,
        itemId,
        fieldName,
        selectedSuggestions
      );

      trackEvent("builder_intelligence_applied", {
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
            updatedSuggestedUpdates && updatedSuggestedUpdates.length > 0
              ? updatedSuggestedUpdates
              : undefined,
        },
      };

      setFormData(updatedData as Omit<ResumeData, "templateId">);

      // Check if all suggestions are applied and invalidate queries if needed
      invalidateQueriesIfAllSuggestionsApplied(
        queryClient,
        updatedData,
        resumeId
      );

      toast.success("Suggestions applied successfully.");
      setAnalyzerModalOpen(false);
    } catch (error) {
      console.error("❌ Failed to apply suggestions:", error);
      toast.error("Failed to apply suggestions");
    }
  };

  return (
    <div ref={containerRef} className="flex w-full h-full relative">
      <div
        className="overflow-auto pt-4 pb-8 scroll-hidden h-[calc(100vh)] relative"
        style={{
          width: `${leftWidth}%`,
          minWidth: "30%",
          maxWidth: "70%",
          flexShrink: 0,
        }}
      >
        {/* Preview Button at top right */}
        <div className="absolute top-0 right-3 z-10">
          <PreviewButton onClick={() => setIsPreviewModalOpen(true)} />
        </div>

        <div
          className="min-w-0 flex-1 flex justify-center relative"
          ref={previewWrapperRef}
        >
          <div
            ref={targetRef}
            style={{
              transform: `scale(${previewScale})`,
              transformOrigin: "top center",
            }}
          >
            {selectedTemplate ? (
              <ResumeRenderer
                template={selectedTemplate?.json ?? aniketTemplate}
                data={getCleanDataForRenderer(formData ?? {}, isGeneratingPDF)}
                currentSection={isGeneratingPDF ? undefined : currentStep}
                hasSuggestions={isGeneratingPDF ? false : hasSuggestions}
                isThumbnail={false}
              />
            ) : (
              <div className="flex items-center justify-center h-full min-h-[800px]">
                <div className="text-gray-500">Loading template...</div>
              </div>
            )}
          </div>

          {/* Hidden ThumbnailRenderer for thumbnail & PDF generation - isolated from main renderer */}
          {/* This renderer always has isThumbnail=true, which ensures all images are proxied to avoid CORS issues */}
          <div
            style={{
              position: "absolute",
              left: "0",
              top: "0",
              width: "794px", // A4 width
              height: "0",
              overflow: "hidden",
              pointerEvents: "none",
              zIndex: "-9999"
            }}
            aria-hidden="true"
          >
            <div ref={thumbnailRef}>
              {selectedTemplate && (
                <ThumbnailRenderer
                  template={selectedTemplate?.json ?? aniketTemplate}
                  data={getCleanDataForRenderer(formData ?? {}, false)}
                />
              )}
            </div>
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
        className="w-3 cursor-col-resize flex items-center justify-center hover:bg-gray-100 active:bg-blue-100 transition-colors z-50 shrink-0"
        onMouseDown={startResizing}
      >
        <div className="w-2 h-8 bg-gray-300 rounded-full flex items-center justify-center">
          <GripVertical className="w-2 h-2 text-gray-500" />
        </div>
      </div>

      <div className="relative bg-white rounded-tl-[36px] rounded-bl-[36px] flex-1 max-h-[calc(100vh-32px)] mt-4 flex-col flex overflow-hidden px-1">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(circle, #ccc 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />

        {/* Sticky Top - Save Button on the right */}
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
              <p className="text-sm text-gray-500">{formatLastSaveTime()}</p>
            )}
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
          template={selectedTemplate}
          isOpen={isPreviewModalOpen}
          onClose={() => setIsPreviewModalOpen(false)}
          resumeData={getCleanDataForRenderer(formData ?? {}, false)}
        />
      )}
    </div>
  );
}
