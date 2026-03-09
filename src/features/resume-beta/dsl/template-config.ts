// ---------------------------------------------------------------------------
// Typed template configuration types for the resume DSL
//
// This replaces the loose `TemplateField` interface (bag of optionals) with
// a proper discriminated union. Every `path` property uses `FieldPath<T>`
// for compile-time safety.
// ---------------------------------------------------------------------------

import type { FieldPath } from './paths';

// ---------------------------------------------------------------------------
// Page & column config (same shape as current, kept for compatibility)
// ---------------------------------------------------------------------------

export interface PageConfig {
  background?: string;
  className?: string;
  fontFamily?: string;
  height?: string;
  padding?: string | number;
  width?: string;
  safeBottomPaddingPx?: number;
}

export interface ColumnSide {
  width: string | number;
  className?: string;
}

export interface ColumnConfig {
  left: ColumnSide;
  right: ColumnSide;
  spacing?: string | number;
}

// ---------------------------------------------------------------------------
// Divider & heading config
// ---------------------------------------------------------------------------

export interface DividerConfig {
  variant?: 'line' | 'pipe';
  className?: string;
}

export interface HeadingConfig {
  path: FieldPath<string>;
  fallback?: string;
  className?: string;
  divider?: DividerConfig;
}

// ---------------------------------------------------------------------------
// Base field props (shared by all field types)
// ---------------------------------------------------------------------------

interface BaseField {
  className?: string;
  break?: boolean;
  breakable?: boolean;
}

// ---------------------------------------------------------------------------
// Field types — discriminated union
// ---------------------------------------------------------------------------

export interface TextField extends BaseField {
  type: 'text';
  path: FieldPath<string>;
  fallback?: string;
  prefix?: string;
  suffix?: string;
}

export interface HtmlField extends BaseField {
  type: 'html';
  path: FieldPath<string>;
  fallback?: string;
}

export interface DurationField extends BaseField {
  type: 'duration';
  path: FieldPath;
  fallback?: string;
}

export interface LinkField extends BaseField {
  type: 'link';
  path: FieldPath<string>;
  href: string | FieldPath<string>;
  fallback?: string;
}

export interface IconField extends BaseField {
  type: 'icon';
  name: string;
  size?: number;
  fill?: boolean;
}

export interface ImageField extends BaseField {
  type: 'image';
  path: FieldPath<string>;
  alt?: string;
  fallback?: string;
  skipIfNoActualValue?: boolean;
}

export interface SkillLevelField extends BaseField {
  type: 'skillLevel';
  path: FieldPath<string>;
  fallback?: string;
}

export interface BadgeField extends BaseField {
  type: 'badge';
  path?: FieldPath<string>;
  pathWithFallback?: { path: FieldPath<string>; fallback?: string };
  hrefPathWithFallback?: { path: FieldPath<string>; fallback?: string };
  badgeClassName?: string;
  icon?: IconField;
}

export interface GroupField extends BaseField {
  type: 'group';
  items: TemplateFieldDef[];
}

export interface InlineGroupField extends BaseField {
  type: 'inline-group';
  items: TemplateFieldDef[];
  separator?: string;
  containerClassName?: string;
}

export interface InlineGroupWithIconField extends BaseField {
  type: 'inline-group-with-icon';
  items: TemplateFieldDef[];
  separator?: string;
}

export interface HorizontalGroupField extends BaseField {
  type: 'horizontal-group';
  items: TemplateFieldDef[];
  separator?: string;
}

export interface ContainerField extends BaseField {
  type: 'container';
  children: TemplateFieldDef[];
}

export interface ContactGridField extends BaseField {
  type: 'contact-grid';
  heading?: {
    path: FieldPath<string>;
    fallback?: string;
    className?: string;
    divider?: DividerConfig;
  };
  items: TemplateFieldDef[];
}

/**
 * Implicit field — no `type` specified. Resolves value from path and renders
 * as text. This preserves backward compatibility with templates that omit
 * the `type` property.
 */
export interface ImplicitField extends BaseField {
  type?: undefined;
  path: FieldPath<string>;
  fallback?: string;
  prefix?: string;
  suffix?: string;
}

// ---------------------------------------------------------------------------
// Full field union
// ---------------------------------------------------------------------------

export type TemplateFieldDef =
  | TextField
  | HtmlField
  | DurationField
  | LinkField
  | IconField
  | ImageField
  | SkillLevelField
  | BadgeField
  | GroupField
  | InlineGroupField
  | InlineGroupWithIconField
  | HorizontalGroupField
  | ContainerField
  | ContactGridField
  | ImplicitField;

// ---------------------------------------------------------------------------
// Item template (used by list-section and table-section)
// ---------------------------------------------------------------------------

export interface RowDef {
  className?: string;
  break?: boolean;
  breakable?: boolean;
  cells: TemplateFieldDef[];
}

export interface ItemTemplateDef {
  className?: string;
  break?: boolean;
  rows?: RowDef[];
  fields?: TemplateFieldDef[];
}

// ---------------------------------------------------------------------------
// Table column (extends field with heading support)
// ---------------------------------------------------------------------------

export interface TableColumnDef extends BaseField {
  type?: TemplateFieldDef['type'] | 'badge-list';
  path?: FieldPath;
  fallback?: string;
  headingColumn?: boolean;
  // Allow all field properties via intersection with the field union
  items?: TemplateFieldDef[];
  separator?: string;
  prefix?: string;
  suffix?: string;
  icon?: string;
  name?: string;
  href?: string | FieldPath<string>;
  children?: TemplateFieldDef[];
  // badge-list specific
  itemPath?: string | FieldPath;
  badgeClassName?: string;
  containerClassName?: string;
}

// ---------------------------------------------------------------------------
// Contact item (used in header sections)
// ---------------------------------------------------------------------------

export interface ContactItemDef {
  path: FieldPath<string>;
  fallback?: string;
  className?: string;
  type?: 'link' | 'text';
  href?: string | FieldPath<string>;
}

export interface ContactGroupDef {
  type: 'inline-group' | 'contact-grid';
  className?: string;
  separator?: string;
  items: ContactItemDef[];
}

export type HeaderFieldDef =
  | { path: FieldPath<string>; fallback?: string; className?: string }
  | ContactGroupDef
  | TemplateFieldDef;

// ---------------------------------------------------------------------------
// Section types — discriminated union
// ---------------------------------------------------------------------------

interface BaseSectionProps {
  id?: string;
  column?: 'left' | 'right';
  className?: string;
  break?: boolean;
  breakable?: boolean;
}

export interface HeaderSection extends BaseSectionProps {
  type: 'header' | 'banner';
  fields: Record<string, HeaderFieldDef>;
}

export interface ListSection extends BaseSectionProps {
  type: 'list-section';
  heading?: HeadingConfig;
  listPath: FieldPath;
  itemTemplate: ItemTemplateDef;
}

export interface ContentSection extends BaseSectionProps {
  type: 'content-section';
  heading?: HeadingConfig;
  divider?: DividerConfig;
  content: {
    type?: 'html' | 'text';
    path: FieldPath<string>;
    fallback?: string;
    className?: string;
  };
}

export interface InlineListSection extends BaseSectionProps {
  type: 'inline-list-section';
  heading?: HeadingConfig;
  listPath: FieldPath;
  itemPath?: FieldPath<string>;
  showBullet?: boolean;
  itemClassName?: string;
  containerClassName?: string;
  itemSeparator?: string;
}

export interface BadgeSection extends BaseSectionProps {
  type: 'badge-section';
  heading?: HeadingConfig;
  listPath: FieldPath;
  icon?: string;
  badgeClassName?: string;
  containerClassName?: string;
  itemPrefix?: string;
  itemSuffix?: string;
  itemSeparator?: string;
}

export interface TableSection extends BaseSectionProps {
  type: 'table-section';
  heading?: HeadingConfig;
  headingColumn?: { className?: string };
  listPath: FieldPath;
  columns: TableColumnDef[];
  gridTemplateColumns?: string;
  rowClassName?: string;
  singleRow?: boolean;
  containerClassName?: string;
}

export interface TwoColumnLayoutSection extends BaseSectionProps {
  type: 'two-column-layout';
  leftColumn: { className?: string; sections: TypedTemplateSection[] };
  rightColumn: { className?: string; sections: TypedTemplateSection[] };
}

// ---------------------------------------------------------------------------
// Full section union
// ---------------------------------------------------------------------------

export type TypedTemplateSection =
  | HeaderSection
  | ListSection
  | ContentSection
  | InlineListSection
  | BadgeSection
  | TableSection
  | TwoColumnLayoutSection;

// ---------------------------------------------------------------------------
// Top-level template config
// ---------------------------------------------------------------------------

export interface TypedTemplateConfig {
  name: string;
  page: PageConfig;
  columns?: ColumnConfig;
  sections: TypedTemplateSection[];
}
