'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from 'react';
import type { ResumeDataKey } from '@entities/resume';
import { useResumeData } from '@entities/resume/models/queries';
import { useResumeStore } from '../stores/resume-store';
import { useUIStore } from '../stores/ui-store';
import { useAutoSave } from '../hooks/use-auto-save';
import { useUndoRedo } from '../hooks/use-undo-redo';
import { useAutoThumbnail } from '../hooks/use-auto-thumbnail';
import { ResumeNotAccessibleModal } from '@features/resume/ui/resume-not-accessible-modal';

// ---------------------------------------------------------------------------
// Context interface — Vercel composition pattern: {state, actions, meta}
// ---------------------------------------------------------------------------

interface ResumeBuilderContextValue {
  state: {
    resumeId: string;
    isLoading: boolean;
    error: Error | null;
    isSaving: boolean;
    lastSavedAt: Date | null;
    isCreateMode: boolean;
  };
  actions: {
    navigateToSection: (section: ResumeDataKey) => void;
    undo: () => void;
    redo: () => void;
  };
  meta: {
    previewRef: RefObject<HTMLDivElement | null>;
    canUndo: boolean;
    canRedo: boolean;
  };
}

const ResumeBuilderContext = createContext<ResumeBuilderContextValue | null>(null);

export function useResumeBuilderContext() {
  const ctx = useContext(ResumeBuilderContext);
  if (!ctx) {
    throw new Error('useResumeBuilderContext must be used within ResumeBuilder.Provider');
  }
  return ctx;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function isSectionEmpty(section: unknown): boolean {
  if (!section || typeof section !== 'object') return true;
  const s = section as Record<string, unknown>;
  if (Array.isArray(s.items)) return s.items.length === 0;
  return Object.values(s).every(
    (v) => v === '' || v === null || v === undefined,
  );
}

// ---------------------------------------------------------------------------
// Provider — the ONLY place that knows about store implementation
// ---------------------------------------------------------------------------

interface ResumeBuilderProviderProps {
  resumeId: string;
  children: ReactNode;
}

export function ResumeBuilderProvider({ resumeId, children }: ResumeBuilderProviderProps) {
  const { data, isLoading, error } = useResumeData(resumeId);
  const setResumeData = useResumeStore((s) => s.setResumeData);
  const setActiveSection = useUIStore((s) => s.setActiveSection);
  const previewRef = useRef<HTMLDivElement>(null);

  // Access denied
  const [showAccessDenied, setShowAccessDenied] = useState(false);
  useEffect(() => {
    if (error && (error as any)?.status === 403) {
      setShowAccessDenied(true);
    }
  }, [error]);

  // Create mode — all sections empty
  const isCreateMode = useMemo(() => {
    if (!data) return false;
    const sectionKeys: ResumeDataKey[] = [
      'personalDetails', 'professionalSummary', 'experience',
      'education', 'skills', 'projects', 'certifications',
      'interests', 'achievements',
    ];
    return sectionKeys.every((key) => isSectionEmpty(data[key]));
  }, [data]);

  // Initialize store once when data loads
  const isInitializedRef = useRef(false);
  useEffect(() => {
    if (data && !isInitializedRef.current) {
      setResumeData(data, resumeId);
      isInitializedRef.current = true;
    }
  }, [data, resumeId, setResumeData]);

  // Auto-save + undo/redo + thumbnail
  const { isSaving, lastSavedAt } = useAutoSave();
  const { undo, redo, canUndo, canRedo } = useUndoRedo();
  useAutoThumbnail(previewRef);

  const contextValue: ResumeBuilderContextValue = {
    state: {
      resumeId,
      isLoading,
      error: error as Error | null,
      isSaving,
      lastSavedAt,
      isCreateMode,
    },
    actions: {
      navigateToSection: setActiveSection,
      undo,
      redo,
    },
    meta: {
      previewRef,
      canUndo,
      canRedo,
    },
  };

  return (
    <ResumeBuilderContext value={contextValue}>
      {children}
      <ResumeNotAccessibleModal
        isOpen={showAccessDenied}
        onClose={() => setShowAccessDenied(false)}
        message={
          (error as any)?.data?.message?.message ||
          'You are not allowed to access this resume.'
        }
      />
    </ResumeBuilderContext>
  );
}
