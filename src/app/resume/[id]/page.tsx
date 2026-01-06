'use client';

import { type ResumeDataKey, useResumeData } from '@entities/resume';
import { FormPageBuilder, Sidebar } from '@widgets/form-page-builder';
import { FormPageBuilderProvider } from '@widgets/form-page-builder/models/ctx';
import { useFormDataStore, TRANSITION_TEXTS } from '@widgets/form-page-builder/models/store';
import { useParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from '@shared/ui/button';
import { NewProgressBar } from '@shared/ui/components/new-progress-bar';
import { useBuilderIntelligence } from '@widgets/form-page-builder/hooks/use-builder-intelligence';
import { runAnalyzerWithProgress } from '@shared/lib/analyzer/run-analyzer-with-progress';
import { useQueryClient } from '@tanstack/react-query';

export default function FormPage() {
  const params = useParams();
  const id = params.id as string;

  const queryClient = useQueryClient();

  const { data: resumeData, isLoading } = useResumeData(id);

  const [currentStep, setCurrentStep] = useState<ResumeDataKey>('personalDetails');
  const isAnalyzing = useFormDataStore((state) => state.isAnalyzing);
  const setIsAnalyzing = useFormDataStore((state) => state.setIsAnalyzing);
  const setFormData = useFormDataStore((state) => state.setFormData);
  const analyzerProgress = useFormDataStore((state) => state.analyzerProgress);
  const analyzerError = useFormDataStore((state) => state.analyzerError);
  const setAnalyzerError = useFormDataStore((state) => state.setAnalyzerError);
  const currentTextIndex = useFormDataStore((state) => state.currentTextIndex);

  // Builder Intelligence logic
  const { handleBuilderIntelligence } = useBuilderIntelligence(id);

  useEffect(() => {
    const pendingResumeId = localStorage.getItem('pending_analyzer_resume_id');
    if (pendingResumeId && pendingResumeId === id) {
      localStorage.removeItem('pending_analyzer_resume_id');
      runAnalyzerWithProgress({
        resumeId: id,
        queryClient,
        setFormData,
        setIsAnalyzing,
        setAnalyzerError,
      });
    }
  }, [id, queryClient, setFormData, setIsAnalyzing, setAnalyzerError]);

  const navs = useMemo(
    () => [
      {
        label: 'Personal Details',
        name: 'personalDetails' as ResumeDataKey,
      },
      {
        label: 'Experience',
        name: 'experience' as ResumeDataKey,
      },
      {
        label: 'Education',
        name: 'education' as ResumeDataKey,
      },
      {
        label: 'Skills',
        name: 'skills' as ResumeDataKey,
      },
      {
        label: 'Projects',
        name: 'projects' as ResumeDataKey,
      },
      {
        label: 'Certifications',
        name: 'certifications' as ResumeDataKey,
      },
      {
        label: 'Interests',
        name: 'interests' as ResumeDataKey,
      },
      {
        label: 'Achievements',
        name: 'achievements' as ResumeDataKey,
      },
    ],
    [],
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Loading resume...</p>
      </div>
    );
  }

  return (
    <FormPageBuilderProvider
      value={{
        currentStep,
        setCurrentStep,
        navs,
        resumeData,
        onBuilderIntelligence: handleBuilderIntelligence,
      }}
    >
      <div className="flex pl-4 ">
        <Sidebar />

        <div className="relative flex w-full overflow-hidden">
          {analyzerError && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/50 backdrop-blur-sm">
              <div className="flex flex-col items-center gap-4 bg-white p-8 rounded-2xl shadow-lg border border-red-200">
                <AlertCircle className="h-12 w-12 text-red-500" />
                <p className="text-lg font-semibold text-gray-800">Sorry, please try again</p>
                <p className="text-sm text-gray-600 text-center max-w-md">
                  We encountered an error while analyzing your resume.
                </p>
                <Button
                  onClick={() => {
                    setAnalyzerError(false);
                    handleBuilderIntelligence();
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                >
                  Try Again
                </Button>
              </div>
            </div>
          )}

          <NewProgressBar
            isVisible={isAnalyzing && !analyzerError}
            transitionTexts={TRANSITION_TEXTS}
            progress={analyzerProgress}
            currentTextIndex={currentTextIndex}
            showLoader={true}
            className="z-50"
          />

          <FormPageBuilder />
        </div>
      </div>
    </FormPageBuilderProvider>
  );
}
