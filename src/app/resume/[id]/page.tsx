'use client';

import { type ResumeDataKey } from '@entities/resume';
import { FormPageBuilder, Sidebar } from '@widgets/form-page-builder';
import { FormPageBuilderProvider } from '@widgets/form-page-builder/models/ctx';
import { useFormDataStore } from '@widgets/form-page-builder/models/store';
import { useParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@shared/ui/button';

export default function FormPage() {
  const params = useParams();
  const id = params.id as string;

  const [currentStep, setCurrentStep] = useState<ResumeDataKey>('personalDetails');
  const isAnalyzing = useFormDataStore((state) => state.isAnalyzing);
  const analyzerError = useFormDataStore((state) => state.analyzerError);
  const retryAnalyzer = useFormDataStore((state) => state.retryAnalyzer);
  const setAnalyzerError = useFormDataStore((state) => state.setAnalyzerError);

  const navs = useMemo(
    () => [
      {
        label: 'Personal Details',
        name: 'personalDetails',
      },
      {
        label: 'Experience',
        name: 'experience',
      },
      {
        label: 'Education',
        name: 'education',
      },
      {
        label: 'Skills',
        name: 'skills',
      },
      {
        label: 'Projects',
        name: 'projects',
      },
      {
        label: 'Certifications',
        name: 'certifications',
      },
      {
        label: 'Interests',
        name: 'interests',
      },
      {
        label: 'Achievements',
        name: 'achievements',
      },
    ],
    [],
  );

  return (
    <FormPageBuilderProvider value={{ currentStep, setCurrentStep, navs }}>
      <div className="flex pl-4 ">
        <Sidebar />

        <div className="relative flex w-full overflow-hidden">
          {(isAnalyzing || analyzerError) && (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/50 backdrop-blur-sm">
              {analyzerError ? (
                <div className="flex flex-col items-center gap-4 bg-white p-8 rounded-2xl shadow-lg border border-red-200">
                  <AlertCircle className="h-12 w-12 text-red-500" />
                  <p className="text-lg font-semibold text-gray-800">Sorry, please try again</p>
                  <p className="text-sm text-gray-600 text-center max-w-md">
                    We encountered an error while analyzing your resume.
                  </p>
                  <Button
                    onClick={() => {
                      setAnalyzerError(false);
                      retryAnalyzer?.();
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                  >
                    Try Again
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
                  <p className="text-lg font-semibold text-gray-800">Analyzing your resume...</p>
                </div>
              )}
            </div>
          )}
          <FormPageBuilder />
        </div>
      </div>
    </FormPageBuilderProvider>
  );
}
