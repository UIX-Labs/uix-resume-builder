import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useCallback } from "react";
import { getResumeEmptyData } from "@entities/resume";
import {
  deepMerge,
  normalizeStringsFields,
} from "@entities/resume/models/use-resume-data";
import { updateResumeByAnalyzerWithResumeId } from "@entities/resume/api/update-resume-by-analyzer";
import { useFormDataStore, TRANSITION_TEXTS } from "../models/store";
import { trackEvent } from "@shared/lib/analytics/Mixpanel";
import { runAnalyzerWithProgress } from "@shared/lib/analyzer/run-analyzer-with-progress";

const ESTIMATED_TIME_TO_95_PERCENT = 36000; // 36 seconds
const TARGET_PROGRESS = 95;
const PROGRESS_UPDATE_INTERVAL = 100; // Update every 100ms

export function useBuilderIntelligence(resumeId: string) {
  const queryClient = useQueryClient();
  const setFormData = useFormDataStore((state) => state.setFormData);
  const setIsAnalyzing = useFormDataStore((state) => state.setIsAnalyzing);
  const setAnalyzerError = useFormDataStore((state) => state.setAnalyzerError);

  const startProgressTracking = () => {
    const startTime = Date.now();
    const NUMBER_OF_TEXTS = TRANSITION_TEXTS.length;
    const TEXT_INTERVAL = ESTIMATED_TIME_TO_95_PERCENT / NUMBER_OF_TEXTS;
    let isCompleted = false;

    const intervalId = setInterval(() => {
      if (isCompleted) {
        clearInterval(intervalId);
        return;
      }

      const elapsedTime = Date.now() - startTime;
      const progressPercent = Math.min(
        (elapsedTime / ESTIMATED_TIME_TO_95_PERCENT) * TARGET_PROGRESS,
        TARGET_PROGRESS
      );

      const calculatedTextIndex = Math.min(
        Math.floor(elapsedTime / TEXT_INTERVAL),
        NUMBER_OF_TEXTS - 1
      );

      useFormDataStore.setState({
        analyzerProgress: progressPercent,
        currentTextIndex: calculatedTextIndex,
      });

      if (progressPercent >= TARGET_PROGRESS) {
        clearInterval(intervalId);
      }
    }, PROGRESS_UPDATE_INTERVAL);

    return {
      stop: () => {
        isCompleted = true;
        clearInterval(intervalId);
      },
    };
  };

  const handleBuilderIntelligence = useCallback(async () => {
    trackEvent("builder_intelligence_click", {
      source: "form_builder_sidebar",
      resumeId: resumeId,
    });

    if (!resumeId) {
      toast.error("Resume ID not found");
      return;
    }

    await runAnalyzerWithProgress({
      resumeId,
      queryClient,
      setFormData,
      setIsAnalyzing,
      setAnalyzerError,
    });

    setIsAnalyzing(true);
    setAnalyzerError(false);
    useFormDataStore.setState({ analyzerProgress: 0, currentTextIndex: 0 });

    const progressTracker = startProgressTracking();

    try {
      const response = await updateResumeByAnalyzerWithResumeId(resumeId);

      if (response?.resume) {
        progressTracker.stop();

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

        setFormData(processedData as any);

        // Complete progress to 100%
        useFormDataStore.setState({ analyzerProgress: 100 });

        // Invalidate resume data query to refetch and update isAnalyzed flag
        queryClient.invalidateQueries({ queryKey: ["resume-data", resumeId] });

        toast.success("Builder Intelligence analysis complete!");
      }
    } catch (error) {
      console.error("Builder Intelligence error:", error);
      progressTracker.stop();
      setAnalyzerError(true);
    } finally {
      setTimeout(() => {
        setIsAnalyzing(false);
        useFormDataStore.setState({ analyzerProgress: 0, currentTextIndex: 0 });
      }, 500);
    }
  }, [resumeId, queryClient, setFormData, setIsAnalyzing, setAnalyzerError]);

  return { handleBuilderIntelligence };
}
