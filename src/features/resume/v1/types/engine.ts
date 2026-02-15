/**
 * Resume Engine — Schema
 *
 * Config-driven resume rendering. Templates are pure JSON/TS config;
 * no JSX in template files. Adding a new template = new config file only.
 */

// ---------------------------------------------------------------------------
// Page & layout (uniform for preview + PDF)
// ---------------------------------------------------------------------------

/** Supported page size presets; height in px at 96dpi. */
export const PAGE_SIZE = {
  A4: { width: 794, height: 1122 },
  LETTER: { width: 816, height: 1056 },
} as const;

export type PageSizeId = keyof typeof PAGE_SIZE;

/** Page dimension config. Used by PageManager for identical preview and PDF breaks. */
export interface PageConfig {
  /** Preset or custom width in px. */
  widthPx?: number;
  /** Preset or custom height in px. Default A4. */
  heightPx?: number;
  /** Use preset: 'A4' | 'LETTER'. Overrides widthPx/heightPx when set. */
  size?: PageSizeId;
  /** Padding in px (all sides). */
  paddingPx?: number;
  /** CSS background (e.g. #fff). */
  background?: string;
  /** Optional CSS class for the page container. */
  className?: string;
}

/** Column side config for two-column layout. */
export interface ColumnSideConfig {
  width: string;
  className?: string;
}

/** Two-column layout definition. */
export interface TwoColumnLayoutConfig {
  kind: 'two-column';
  spacing: string;
  left: ColumnSideConfig;
  right: ColumnSideConfig;
}

/** Single-column layout (default). */
export interface SingleColumnLayoutConfig {
  kind: 'single';
}

export type LayoutConfig = SingleColumnLayoutConfig | TwoColumnLayoutConfig;

// ---------------------------------------------------------------------------
// Theme (fonts, colors, spacing) — no layout logic
// ---------------------------------------------------------------------------

export interface ThemeTokens {
  fontFamily?: string;
  fontSizeBase?: string;
  lineHeight?: string;
  /** Primary text color. */
  colorText?: string;
  /** Heading/accent color. */
  colorHeading?: string;
  /** Muted/secondary. */
  colorMuted?: string;
  /** Spacing unit in px (e.g. 8). */
  spacingUnit?: number;
}

/** Default theme tokens; templates can override via theme. */
export const DEFAULT_THEME: ThemeTokens = {
  fontFamily: 'Inter, system-ui, sans-serif',
  fontSizeBase: '14px',
  lineHeight: '1.5',
  colorText: '#1a1a1a',
  colorHeading: '#0f0f0f',
  colorMuted: '#6b7280',
  spacingUnit: 8,
};

// ---------------------------------------------------------------------------
// Section presentation variants (strategy selection via config)
// ---------------------------------------------------------------------------

/** Experience section presentation. */
export type ExperienceVariant = 'timeline' | 'block';

/** Skills section presentation. */
export type SkillsVariant = 'chips' | 'list';

/** Section-level variant; optional. Renderer picks strategy from type + variant. */
export type SectionVariant = ExperienceVariant | SkillsVariant | 'default';

/** Page-break hints (conceptual). Pagination respects data-canbreak; these can drive it. */
export interface SectionBreakConfig {
  /** Prefer break before this section. */
  breakBefore?: boolean;
  /** Prefer break after this section. */
  breakAfter?: boolean;
  /** Try to keep section content together (minimize mid-section breaks). */
  keepTogether?: boolean;
}

// ---------------------------------------------------------------------------
// Template section (config-only; no JSX)
// ---------------------------------------------------------------------------

/** Minimal section definition for the engine. Full shape is template-specific. */
export interface TemplateSectionConfig {
  id?: string;
  type: string;
  column?: 'left' | 'right';
  /** Optional presentation variant (e.g. 'timeline', 'chips'). */
  variant?: SectionVariant;
  /** Page-break hints. */
  break?: boolean;
  breakable?: boolean;
  listPath?: string;
  heading?: { path?: string; fallback?: string; className?: string; divider?: unknown };
  [key: string]: unknown;
}

// ---------------------------------------------------------------------------
// Template config (single source for renderer)
// ---------------------------------------------------------------------------

export interface TemplateConfig {
  id: string;
  name: string;
  /** Premium templates: builder layer can lock preview / watermark / CTA. */
  isPremium?: boolean;
  theme?: Partial<ThemeTokens>;
  /** Page dimensions and padding; used by PageManager for uniform breaks. */
  page: PageConfig & {
    fontFamily?: string;
    className?: string;
  };
  /** Layout: single or two-column. */
  layout: LayoutConfig;
  /** Ordered sections; each has type + optional variant. */
  sections: TemplateSectionConfig[];
}

// ---------------------------------------------------------------------------
// Resume data (minimal shape for renderer; full type in entities)
// ---------------------------------------------------------------------------

export type ResumeData = Record<string, unknown>;
