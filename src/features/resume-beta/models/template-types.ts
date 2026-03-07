// ---------------------------------------------------------------------------
// Page & column config
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
// Field-level types
// ---------------------------------------------------------------------------

export interface FieldPath {
  path: string;
  fallback?: string;
  className?: string;
}

export interface ContactItem {
  path: string;
  fallback?: string;
  className?: string;
  type?: 'link' | 'text';
  href?: string;
}

export interface ContactGroup {
  type: 'inline-group' | 'contact-grid';
  className?: string;
  separator?: string;
  items: ContactItem[];
}

export interface DividerConfig {
  variant?: 'line' | 'pipe';
  className?: string;
}

export interface HeadingConfig {
  path: string;
  fallback?: string;
  className?: string;
  divider?: DividerConfig;
}

// ---------------------------------------------------------------------------
// Template field (cells, items inside item templates)
// ---------------------------------------------------------------------------

export type TemplateFieldType =
  | 'field'
  | 'inline-group'
  | 'duration'
  | 'html'
  | 'text'
  | 'link'
  | 'badge-list'
  | 'group'
  | 'image'
  | 'icon'
  | 'skillLevel'
  | 'container'
  | 'horizontal-group'
  | 'contact-grid';

export interface TemplateField {
  type?: TemplateFieldType;
  path?: string;
  fallback?: string;
  className?: string;
  break?: boolean;
  name?: string;
  items?: TemplateField[];
  separator?: string;
  prefix?: string;
  suffix?: string;
  href?: string;
  alt?: string;
  size?: number;
  fill?: boolean;
  icon?: string;
  children?: TemplateField[];
}

export interface TableColumn extends TemplateField {
  headingColumn?: boolean;
}

// ---------------------------------------------------------------------------
// Item template (used by list-section and table-section)
// ---------------------------------------------------------------------------

export interface TemplateRow {
  className?: string;
  cells: TemplateField[];
}

export interface ItemTemplate {
  className?: string;
  break?: boolean;
  rows?: TemplateRow[];
  fields?: TemplateField[];
}

// ---------------------------------------------------------------------------
// Discriminated union: TemplateSection
// ---------------------------------------------------------------------------

interface BaseSectionProps {
  id?: string;
  column?: 'left' | 'right';
  className?: string;
  break?: boolean;
  breakable?: boolean;
}

export interface HeaderTemplateSection extends BaseSectionProps {
  type: 'header' | 'banner';
  fields: Record<string, FieldPath | ContactGroup | { className?: string; type?: string; [key: string]: unknown }>;
}

export interface ListTemplateSection extends BaseSectionProps {
  type: 'list-section';
  heading?: HeadingConfig;
  listPath: string;
  itemTemplate: ItemTemplate;
}

export interface ContentTemplateSection extends BaseSectionProps {
  type: 'content-section';
  heading?: HeadingConfig;
  divider?: DividerConfig;
  content: {
    type?: 'html' | 'text';
    path: string;
    fallback?: string;
    className?: string;
  };
}

export interface InlineListTemplateSection extends BaseSectionProps {
  type: 'inline-list-section';
  heading?: HeadingConfig;
  listPath: string;
  itemPath?: string;
  showBullet?: boolean;
  itemClassName?: string;
  containerClassName?: string;
  itemSeparator?: string;
}

export interface BadgeTemplateSection extends BaseSectionProps {
  type: 'badge-section';
  heading?: HeadingConfig;
  listPath: string;
  icon?: string;
  badgeClassName?: string;
  containerClassName?: string;
  itemPrefix?: string;
  itemSuffix?: string;
}

export interface TableTemplateSection extends BaseSectionProps {
  type: 'table-section';
  heading?: HeadingConfig;
  headingColumn?: { className?: string };
  listPath: string;
  columns: TableColumn[];
  gridTemplateColumns?: string;
  rowClassName?: string;
  singleRow?: boolean;
  containerClassName?: string;
}

export interface TwoColumnTemplateSection extends BaseSectionProps {
  type: 'two-column-layout';
  leftColumn: { className?: string; sections: TemplateSection[] };
  rightColumn: { className?: string; sections: TemplateSection[] };
}

export type TemplateSection =
  | HeaderTemplateSection
  | ListTemplateSection
  | ContentTemplateSection
  | InlineListTemplateSection
  | BadgeTemplateSection
  | TableTemplateSection
  | TwoColumnTemplateSection;

// ---------------------------------------------------------------------------
// Top-level template config
// ---------------------------------------------------------------------------

export interface TemplateConfig {
  name: string;
  page: PageConfig;
  columns?: ColumnConfig;
  sections: TemplateSection[];
}

// ---------------------------------------------------------------------------
// Template reference (as stored in resume data)
// ---------------------------------------------------------------------------

export interface TemplateRef {
  id: string;
  name: string;
  json: TemplateConfig;
  previewImageUrl?: { url: string };
}
