'use client';

import { useCallback } from 'react';
import { useSuggestionStore } from '../stores/suggestion-store';
import { useResumeStore } from '../stores/resume-store';
import { fetch as apiFetch } from '@shared/api';

/**
 * Triggers the analyzer API and writes suggestions to the suggestion store.
 */
export function useBuilderIntelligence() {
  const resumeId = useResumeStore((s) => s.resumeId);
  const data = useResumeStore((s) => s.data);
  const setSuggestions = useSuggestionStore((s) => s.setSuggestions);
  const setIsAnalyzing = useSuggestionStore((s) => s.setIsAnalyzing);
  const isAnalyzing = useSuggestionStore((s) => s.isAnalyzing);

  const analyze = useCallback(async () => {
    if (!resumeId || !data || isAnalyzing) return;

    setIsAnalyzing(true);

    try {
      const response = await apiFetch<Record<string, unknown>>(`resume/${resumeId}/analyze`, {
        options: { method: 'POST' },
      });

      if (response) {
        setSuggestions(response as any);
      }
    } finally {
      setIsAnalyzing(false);
    }
  }, [resumeId, data, isAnalyzing, setIsAnalyzing, setSuggestions]);

  return { analyze, isAnalyzing };
}
