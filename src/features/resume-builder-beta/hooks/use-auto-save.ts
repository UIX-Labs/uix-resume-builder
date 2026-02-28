'use client';

import { useEffect, useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { saveFormData } from '@entities/resume/api/save-resume-form';
import type { ResumeData, ResumeDataKey } from '@entities/resume';
import { useResumeStore } from '../stores/resume-store';

const AUTO_SAVE_DELAY = 1000;

const SECTION_KEYS: ResumeDataKey[] = [
  'personalDetails',
  'professionalSummary',
  'experience',
  'education',
  'skills',
  'projects',
  'certifications',
  'interests',
  'achievements',
];

/**
 * Debounced auto-save — watches the Zustand store and saves sections
 * that have changed after a 1-second debounce.
 */
export function useAutoSave() {
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevDataRef = useRef<ResumeData | null>(null);

  const mutation = useMutation({
    mutationFn: (payload: { type: ResumeDataKey; data: ResumeData[ResumeDataKey] }) =>
      saveFormData(payload),
    onSuccess: () => setLastSavedAt(new Date()),
  });

  useEffect(() => {
    const unsubscribe = useResumeStore.subscribe((state) => {
      if (!state.data) return;

      if (timerRef.current) clearTimeout(timerRef.current);

      timerRef.current = setTimeout(() => {
        const current = state.data;
        if (!current) return;

        for (const key of SECTION_KEYS) {
          const prev = prevDataRef.current?.[key];
          const curr = current[key];
          if (prev !== curr && curr) {
            mutation.mutate({ type: key, data: curr });
          }
        }

        prevDataRef.current = current;
      }, AUTO_SAVE_DELAY);
    });

    return () => {
      unsubscribe();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [mutation]);

  return {
    isSaving: mutation.isPending,
    lastSavedAt,
  };
}
