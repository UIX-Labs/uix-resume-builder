'use client';

import { createContext, useContext } from 'react';
import type { BuilderContextValue } from './types';

const BuilderContext = createContext<BuilderContextValue | null>(null);

export const BuilderProvider = BuilderContext.Provider;

export function useBuilder(): BuilderContextValue {
  const ctx = useContext(BuilderContext);
  if (!ctx) {
    throw new Error('useBuilder must be used within a BuilderProvider');
  }
  return ctx;
}

export function useBuilderState() {
  return useBuilder().state;
}

export function useBuilderActions() {
  return useBuilder().actions;
}

export function useBuilderMeta() {
  return useBuilder().meta;
}
