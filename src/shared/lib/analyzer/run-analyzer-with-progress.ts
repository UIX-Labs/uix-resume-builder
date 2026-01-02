import type { QueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { getResumeEmptyData } from '@entities/resume';
import type { ResumeData } from '@entities/resume';
import { updateResumeByAnalyzerWithResumeId } from '@entities/resume/api/update-resume-by-analyzer';
import { deepMerge, normalizeStringsFields } from '@entities/resume/models/use-resume-data';
import { TRANSITION_TEXTS, useFormDataStore } from '@widgets/form-page-builder/models/store';

interface AnalyzerRunParams {
  resumeId: string;
  queryClient: QueryClient;
  setFormData: (data: ResumeData, resumeId?: string) => void;
  setIsAnalyzing: (value: boolean) => void;
  setAnalyzerError: (value: boolean) => void;
  successMessage?: string;
  errorMessage?: string;
}

const ESTIMATED_TIME_TO_95_PERCENT = 36000;
const TARGET_PROGRESS = 95;
const PROGRESS_UPDATE_INTERVAL = 100;

export async function runAnalyzerWithProgress({
  resumeId,
  queryClient,
  setFormData,
  setIsAnalyzing,
  setAnalyzerError,
  successMessage = 'Builder Intelligence analysis complete!',
  errorMessage = 'Failed to fix resume',
}: AnalyzerRunParams): Promise<void> {
  setIsAnalyzing(true);
  setAnalyzerError(false);
  useFormDataStore.setState({ analyzerProgress: 0, currentTextIndex: 0 });

  const numberOfTexts = TRANSITION_TEXTS.length;
  const textInterval = ESTIMATED_TIME_TO_95_PERCENT / numberOfTexts;
  const startTime = Date.now();

  let progressIntervalId: ReturnType<typeof setInterval> | null = null;
  let isCompleted = false;

  progressIntervalId = setInterval(() => {
    if (isCompleted) {
      if (progressIntervalId) {
        clearInterval(progressIntervalId);
        progressIntervalId = null;
      }
      return;
    }

    const elapsedTime = Date.now() - startTime;
    const progressPercent = Math.min((elapsedTime / ESTIMATED_TIME_TO_95_PERCENT) * TARGET_PROGRESS, TARGET_PROGRESS);
    const calculatedTextIndex = Math.min(Math.floor(elapsedTime / textInterval), numberOfTexts - 1);

    useFormDataStore.setState({
      analyzerProgress: progressPercent,
      currentTextIndex: calculatedTextIndex,
    });

    if (progressPercent >= TARGET_PROGRESS && progressIntervalId) {
      clearInterval(progressIntervalId);
      progressIntervalId = null;
    }
  }, PROGRESS_UPDATE_INTERVAL);

  try {
    const response = await updateResumeByAnalyzerWithResumeId(resumeId);

    if (response?.resume) {
      isCompleted = true;

      if (progressIntervalId) {
        clearInterval(progressIntervalId);
        progressIntervalId = null;
      }

      const emptyData = await getResumeEmptyData();

      let processedData: ResumeData = { ...response.resume };
      for (const key of Object.keys(emptyData)) {
        const k = key as keyof typeof emptyData;
        const mergedValue = deepMerge(
          processedData[k] as unknown,
          emptyData[k] as unknown,
        ) as ResumeData[keyof ResumeData];

        processedData = {
          ...processedData,
          [k]: mergedValue,
        } as ResumeData;
      }

      processedData = normalizeStringsFields(processedData);
      setFormData(processedData, resumeId);

      useFormDataStore.setState({ analyzerProgress: 100 });
      queryClient.invalidateQueries({ queryKey: ['resume-data', resumeId] });
      toast.success(successMessage);
    }
  } catch (error) {
    console.error('Analyzer error:', error);
    isCompleted = true;

    if (progressIntervalId) {
      clearInterval(progressIntervalId);
      progressIntervalId = null;
    }

    setAnalyzerError(true);
    toast.error(errorMessage);
  } finally {
    if (progressIntervalId) {
      clearInterval(progressIntervalId);
      progressIntervalId = null;
    }

    setTimeout(() => {
      setIsAnalyzing(false);
      useFormDataStore.setState({ analyzerProgress: 0, currentTextIndex: 0 });
    }, 500);
  }
}
