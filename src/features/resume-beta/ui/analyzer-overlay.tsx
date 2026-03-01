'use client';

import { AlertCircle, X } from 'lucide-react';
import { Button } from '@shared/ui/button';
import { NewProgressBar } from '@shared/ui/components/new-progress-bar';
import { useFormDataStore, TRANSITION_TEXTS } from '@widgets/form-page-builder/models/store';
import { useBuilderActions, useBuilderState } from '../models/builder-context';

export function AnalyzerOverlay() {
  const { resumeId, user } = useBuilderState();
  const { handleBuilderIntelligence } = useBuilderActions();
  const isAnalyzing = useFormDataStore((s) => s.isAnalyzing);
  const analyzerError = useFormDataStore((s) => s.analyzerError);
  const setAnalyzerError = useFormDataStore((s) => s.setAnalyzerError);
  const analyzerProgress = useFormDataStore((s) => s.analyzerProgress);
  const currentTextIndex = useFormDataStore((s) => s.currentTextIndex);

  return (
    <>
      {analyzerError && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/50 backdrop-blur-sm">
          <div className="relative flex flex-col items-center gap-4 bg-white p-8 rounded-2xl shadow-lg border border-red-200">
            <Button
              onClick={() => setAnalyzerError(false)}
              className="absolute top-4 right-4 text-gray-400 bg-transparent hover:bg-transparent hover:text-gray-600 transition-colors"
            >
              <X className="h-10 w-10" />
            </Button>
            <AlertCircle className="h-12 w-12 text-red-500" />
            <p className="text-lg font-semibold text-gray-800">Sorry, please try again</p>
            <p className="text-sm text-gray-600 text-center max-w-md">
              We encountered an error while analyzing your resume.
            </p>
            <Button
              onClick={() => {
                setAnalyzerError(false);
                if (!user?.isLoggedIn) {
                  localStorage.setItem('pending_analyzer_resume_id', resumeId);
                  const callbackUrl = encodeURIComponent(window.location.pathname);
                  window.location.href = `/auth?callbackUrl=${callbackUrl}`;
                  return;
                }
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
    </>
  );
}
