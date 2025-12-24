import { Education } from "@shared/icons/education";
import { Experience } from "@shared/icons/experience";
import { PersonalInfo } from "@shared/icons/personal-info";
import { ProfessionalSummary } from "@shared/icons/prof-summary";
import { Skills } from "@shared/icons/skills";
import { cn } from "@shared/lib/cn";
import { ProgressCircle } from "@shared/ui/progress-circle";
import { useFormPageBuilder } from "../models/ctx";
import Image from "next/image";
import { Achievements } from "@shared/icons/achievements";
import { useEffect, useState } from "react";
import { useFormDataStore, TRANSITION_TEXTS } from "../models/store";
import { calculateResumeCompletion } from "@shared/lib/resume-completion";
import { useParams } from "next/navigation";
import type { ResumeData } from "@entities/resume";
import mockData from "../../../../mock-data.json";
import { CheckIcon, X, Sparkles, ArrowLeftIcon } from "lucide-react";
import { Button } from "@shared/ui/button";
import { getResumeEmptyData, useResumeData } from "@entities/resume";
import { useQueryClient } from "@tanstack/react-query";
import {
  deepMerge,
  normalizeStringsFields,
} from "@entities/resume/models/use-resume-data";
import { updateResumeByAnalyzerWithResumeId } from "@entities/resume/api/update-resume-by-analyzer";
import { toast } from "sonner";
import { useAnalyzerStore } from "@shared/stores/analyzer-store";
import { hasPendingSuggestions } from "@features/resume/renderer";
import { trackEvent } from "@shared/lib/analytics/Mixpanel";
import PikaResume from "@shared/icons/pika-resume";
import { useRouter } from "next/navigation";

const icons = {
  personalDetails: PersonalInfo,
  professionalSummary: ProfessionalSummary,
  experience: Experience,
  education: Education,
  skills: Skills,
  achievements: Achievements,
};

// Check if a section has content (excluding suggestedUpdates field)
function sectionHasContent(sectionData: unknown): boolean {
  if (!sectionData || typeof sectionData !== "object") {
    return false;
  }

  const entries = Object.entries(sectionData as Record<string, unknown>).filter(
    ([key]) => key !== "suggestedUpdates" && key !== "isHidden"
  );

  return entries.some(([, value]) => {
    if (value === null || value === undefined) return false;
    if (typeof value === "string") return value.trim().length > 0;
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === "object")
      return Object.keys(value as Record<string, unknown>).length > 0;
    return true;
  });
}

export function Sidebar() {
  const [progress, setProgress] = useState(0);
  const { currentStep, setCurrentStep, navs } = useFormPageBuilder();
  const queryClient = useQueryClient();
  const router = useRouter();

  const resumeData = useFormDataStore((state) => state.formData);
  const setFormData = useFormDataStore((state) => state.setFormData);
  const isAnalyzing = useFormDataStore((state) => state.isAnalyzing);
  const setIsAnalyzing = useFormDataStore((state) => state.setIsAnalyzing);
  const setAnalyzerError = useFormDataStore((state) => state.setAnalyzerError);
  const setRetryAnalyzer = useFormDataStore((state) => state.setRetryAnalyzer);
  const params = useParams();
  const resumeId = params?.id as string;

  const isTailoredWithJD = useAnalyzerStore((state) => state.isTailoredWithJD);

  // Fetch current resume to check isAnalyzed flag from the API response
  const { data: resumeDataFromApi } = useResumeData(resumeId);
  const isAnalyzed = resumeDataFromApi?.isAnalyzed ?? false;

  const handleBuilderIntelligence = async () => {
    trackEvent("builder_intelligence_click", {
      source: "form_builder_sidebar",
      resumeId: resumeId,
    });

    if (!resumeId) {
      toast.error("Resume ID not found");
      return;
    }

    setIsAnalyzing(true);
    setAnalyzerError(false);
    useFormDataStore.setState({ analyzerProgress: 0, currentTextIndex: 0 });

    // Calculate time to reach 95%
    // Total time: 36 seconds
    const ESTIMATED_TIME_TO_95_PERCENT = 36000; // milliseconds (36 seconds)
    const NUMBER_OF_TEXTS = TRANSITION_TEXTS.length;
    const TEXT_INTERVAL = ESTIMATED_TIME_TO_95_PERCENT / NUMBER_OF_TEXTS; // milliseconds
    const TARGET_PROGRESS = 95; // Stop at 95%

    const startTime = Date.now();
    const PROGRESS_UPDATE_INTERVAL = 100; // Update every 100ms for smooth progress

    let progressIntervalId: NodeJS.Timeout | null = null;
    let isCompleted = false;

    // Smooth progress based on elapsed time
    progressIntervalId = setInterval(() => {
      if (isCompleted) {
        if (progressIntervalId) {
          clearInterval(progressIntervalId);
          progressIntervalId = null;
        }
        return;
      }

      const elapsedTime = Date.now() - startTime;

      // Calculate progress based on elapsed time (linear progression to 95%)
      const progressPercent = Math.min(
        (elapsedTime / ESTIMATED_TIME_TO_95_PERCENT) * TARGET_PROGRESS,
        TARGET_PROGRESS
      );

      // Calculate text index based on elapsed time
      const calculatedTextIndex = Math.min(
        Math.floor(elapsedTime / TEXT_INTERVAL),
        NUMBER_OF_TEXTS - 1
      );

      useFormDataStore.setState({
        analyzerProgress: progressPercent,
        currentTextIndex: calculatedTextIndex,
      });

      // Stop progress at 95% if we've reached the target time
      if (progressPercent >= TARGET_PROGRESS) {
        if (progressIntervalId) {
          clearInterval(progressIntervalId);
          progressIntervalId = null;
        }
      }
    }, PROGRESS_UPDATE_INTERVAL);

    try {
      const response = await updateResumeByAnalyzerWithResumeId(resumeId);
      if (response?.resume) {
        isCompleted = true;

        // Clear progress interval if still running
        if (progressIntervalId) {
          clearInterval(progressIntervalId);
          progressIntervalId = null;
        }

        const emptyData = await getResumeEmptyData();

        let processedData = { ...response.resume };
        for (const key of Object.keys(emptyData)) {
          const k = key as keyof typeof emptyData;
          (processedData as any)[k] = deepMerge(
            (processedData as any)[k],
            emptyData[k]
          );
        }

        processedData = normalizeStringsFields(processedData);

        setFormData(processedData);

        // Complete progress to 100%
        useFormDataStore.setState({ analyzerProgress: 100 });

        // Invalidate resume data query to refetch and update isAnalyzed flag
        queryClient.invalidateQueries({ queryKey: ["resume-data", resumeId] });

        toast.success("Builder Intelligence analysis complete!");
      }
    } catch (error) {
      console.error("Builder Intelligence error:", error);
      isCompleted = true;

      // Clear progress interval on error
      if (progressIntervalId) {
        clearInterval(progressIntervalId);
        progressIntervalId = null;
      }

      setAnalyzerError(true);
    } finally {
      // Ensure interval is cleared
      if (progressIntervalId) {
        clearInterval(progressIntervalId);
      }

      setTimeout(() => {
        setIsAnalyzing(false);
        useFormDataStore.setState({ analyzerProgress: 0, currentTextIndex: 0 });
      }, 500);
    }
  };

  const handleLogoClick = () => {
    // Always invalidate when user explicitly navigates away via logo click
    queryClient.invalidateQueries({ queryKey: ["resumes"] });
    queryClient.invalidateQueries({ queryKey: ["resume-data", resumeId] });
    router.push("/resumes");
  };

  useEffect(() => {
    setRetryAnalyzer(() => handleBuilderIntelligence);
  }, [resumeId]);

  useEffect(() => {
    if (!resumeData) return;

    const p = calculateResumeCompletion(
      resumeData as ResumeData,
      mockData as Record<string, any>
    );

    const fixed = +p.toFixed(0);
    setProgress(Number.isNaN(fixed) ? 0 : Number(fixed));
  }, [resumeData]);

  const currentStepIndex = navs.findIndex((nav) => nav.label === currentStep);

  return (
    <div
      className={cn(
        "bg-white border-2 border-[#E9F4FF] rounded-[36px] min-w-[240px] w-[20%] h-[calc(100vh-32px)] py-4 flex flex-col items-center mt-4 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]",
        isAnalyzing &&
          "opacity-60 pointer-events-none select-none cursor-not-allowed"
      )}
    >
      <div className="flex flex-col gap-4 mt-4 w-full pl-6 pr-2">
        <button
          className="flex flex-row items-center cursor-pointer gap-2"
          type="button"
          onClick={handleLogoClick}
        >
          <ArrowLeftIcon className="w-5 h-5" />

          <span className="font-normal text-black bg-clip-text text-xl text-left">
            Back
          </span>
        </button>
      </div>

      {/* Progress Circle */}
      <div className="mt-5">
        <ProgressCircle
          progress={progress}
          totalSteps={navs.length}
          currentStep={currentStepIndex + 1}
        />
      </div>

      <div className="flex flex-col gap-2 mt-4 w-full pl-6 pr-2">
        {navs.map((nav) => {
          const Icon =
            icons[nav.name as keyof typeof icons] ?? ProfessionalSummary;
          const sectionData = resumeData?.[nav.name as keyof typeof resumeData];

          // Get suggestedUpdates array from section data
          const suggestedUpdatesArray =
            sectionData &&
            typeof sectionData === "object" &&
            "suggestedUpdates" in sectionData
              ? (sectionData as { suggestedUpdates?: any[] }).suggestedUpdates
              : undefined;

          // Check if section has pending suggestions
          const hasValidPendingSuggestions = hasPendingSuggestions(
            suggestedUpdatesArray
          );

          // Check if section has content
          const hasContent = sectionHasContent(sectionData);

          // Check if Builder Intelligence has been run (any section has suggestedUpdates)
          const hasBuilderIntelligenceRun =
            resumeData &&
            Object.values(resumeData).some((section) => {
              return (
                section &&
                typeof section === "object" &&
                "suggestedUpdates" in section &&
                Array.isArray(
                  (section as { suggestedUpdates?: unknown[] }).suggestedUpdates
                ) &&
                (section as { suggestedUpdates?: unknown[] }).suggestedUpdates!
                  .length > 0
              );
            });

          const showPendingIcon =
            hasBuilderIntelligenceRun && hasValidPendingSuggestions;
          const showCompletedIcon =
            hasBuilderIntelligenceRun &&
            !hasValidPendingSuggestions &&
            hasContent;
          const showEmptyIcon =
            hasBuilderIntelligenceRun &&
            !hasValidPendingSuggestions &&
            !hasContent;

          return (
            <button
              type="button"
              key={nav.name}
              className={cn(
                "flex items-center gap-2 px-1 py-1.5 rounded-2xl cursor-pointer pr-4 w-fit",
                currentStep === nav.name && "bg-[#E9F4FF]"
              )}
              onClick={() => setCurrentStep(nav.name)}
            >
              {Icon && (
                <div className="w-5 h-5 bg-[#0C1118] rounded-full flex items-center justify-center">
                  <Icon />
                </div>
              )}

              <p
                className={cn(
                  "text-[#0B0A09] text-sm transition-all",
                  currentStep === nav.name && "text-[#005FF2] font-semibold"
                )}
              >
                {nav.label}
              </p>

              {/* Yellow "!" for pending suggestions */}
              {showPendingIcon && (
                <span className="ml-2 inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#C7BC21] text-[10px] font-semibold text-white">
                  !
                </span>
              )}

              {/* Green checkmark for completed sections (with content) */}
              {showCompletedIcon && (
                <span className="ml-2 inline-flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#02A44F] text-[10px] font-semibold text-white">
                  <CheckIcon className="size-3" />
                </span>
              )}

              {/* Red X for empty sections (no content) */}
              {showEmptyIcon && (
                <span className="ml-2 inline-flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#E53E3E] text-[10px] font-semibold text-white">
                  <X className="size-3" />
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Builder Intelligence Card - Show card if not analyzed, show SVG if analyzed */}
      {!isTailoredWithJD && (
        <>
          {!isAnalyzed ? (
            <div
              className="w-[200px] rounded-2xl p-3 mt-4 mx-auto mb-2"
              style={{
                backgroundImage: "url('/images/bg-gradient.svg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <p className="text-sm font-semibold text-white">
                Switch to Pika Intelligence
              </p>
              <p className="text-[11px] font-normal text-white/80 mt-1">
                Get grammar fixes, stronger verbs, and tailored improvements.
              </p>

              <Button
                className="w-full mt-3 bg-[#02A44F] hover:bg-[#028a42] h-8 text-white text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer border-2 border-white"
                onClick={handleBuilderIntelligence}
                disabled={isAnalyzing}
              >
                {isAnalyzing ? (
                  "Analyzing..."
                ) : (
                  <>
                    Pika Intelligence
                    <Image
                      src="/images/rat.png"
                      alt="Pika Intelligence"
                      width={40}
                      height={40}
                    />
                  </>
                )}
              </Button>
            </div>
          ) : (
            <div className="w-[200px] mt-4 mx-auto mb-2">
              <Image
                src="/images/pika-intelligence.svg"
                alt="Pika Intelligence"
                width={217}
                height={72}
                className="w-full h-auto"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
