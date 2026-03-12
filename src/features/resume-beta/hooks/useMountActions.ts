'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { runAnalyzerWithProgress } from '@shared/lib/analyzer/run-analyzer-with-progress';
import { useFormDataStore } from '@widgets/form-page-builder/models/store';

interface UseMountActionsProps {
  resumeId: string;
}

export function useMountActions({ resumeId }: UseMountActionsProps) {
  const queryClient = useQueryClient();
  const setFormData = useFormDataStore((s) => s.setFormData);
  const setIsAnalyzing = useFormDataStore((s) => s.setIsAnalyzing);
  const setAnalyzerError = useFormDataStore((s) => s.setAnalyzerError);

  useEffect(() => {
    const pendingResumeId = localStorage.getItem('pending_analyzer_resume_id');
    if (pendingResumeId && pendingResumeId === resumeId) {
      localStorage.removeItem('pending_analyzer_resume_id');
      runAnalyzerWithProgress({
        resumeId,
        queryClient,
        setFormData,
        setIsAnalyzing,
        setAnalyzerError,
      });
    }
  }, [resumeId, queryClient, setFormData, setIsAnalyzing, setAnalyzerError]);
}
