import type { ResumeData, SuggestedUpdates } from '@entities/resume';
import type { LazyExoticComponent } from 'react';

// ---------------------------------------------------------------------------
// Theme
// ---------------------------------------------------------------------------

export interface TemplateTheme {
  primaryColor: string;
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
  spacing: 'compact' | 'normal' | 'relaxed';
}

export const DEFAULT_THEME: TemplateTheme = {
  primaryColor: '#000000',
  fontFamily: 'Inter, system-ui, sans-serif',
  fontSize: 10,
  lineHeight: 1.5,
  spacing: 'normal',
};

// ---------------------------------------------------------------------------
// Template component contract
// ---------------------------------------------------------------------------

export interface TemplateProps {
  data: ResumeData;
  theme: TemplateTheme;
  suggestions?: SuggestedUpdates;
  className?: string;
}

export type TemplateComponent = React.FC<TemplateProps>;

// ---------------------------------------------------------------------------
// Registry
// ---------------------------------------------------------------------------

export type TemplateCategory =
  | 'professional'
  | 'creative'
  | 'minimal'
  | 'modern';

export type TemplateColumnLayout =
  | 'single'
  | 'two-column'
  | 'sidebar-left'
  | 'sidebar-right';

export interface TemplateMetadata {
  id: string;
  name: string;
  description: string;
  previewImageUrl: string;
  category: TemplateCategory;
  columnLayout: TemplateColumnLayout;
}

export interface TemplateRegistryEntry {
  metadata: TemplateMetadata;
  component: LazyExoticComponent<TemplateComponent>;
}
