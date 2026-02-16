export type Primitive = string | number | boolean | null | undefined;

export interface DataBindingPath {
  path: string;
  fallback?: string;
}

interface TemplateNode {
  id: string;
  type: string;
  className?: string;
}

export interface ContainerNode extends TemplateNode {
  type: 'container';
  children: Nodes[];
}

export interface TextNode extends TemplateNode {
  type: 'text';
  pathWithFallback: DataBindingPath;
  prefix?: string;
  suffix?: string;
}

export interface SeperatorNode extends TemplateNode {
  type: 'seperator';
  variant: 'pipe' | 'line';
  direction?: 'horizontal' | 'vertical';
}

export interface ListNode extends TemplateNode {
  type: 'list';
  pathWithFallback: DataBindingPath;
  presentation: Nodes[];
  seperator?: string;
  groupBy?: string;
  transform?: {
    variant: 'flatten';
    key: string;
  };
}

export interface LinkNode extends TemplateNode {
  type: 'link';
  pathWithFallback: DataBindingPath;
  href?: string;
  hrefPathWithFallback?: DataBindingPath;
  prefix?: string;
}

export interface HtmlNode extends TemplateNode {
  type: 'html';
  pathWithFallback: DataBindingPath;
  className?: string;
}

export interface DurationNode extends TemplateNode {
  type: 'duration';
  pathWithFallback: DataBindingPath;
  className?: string;
}

export interface IconNode extends TemplateNode {
  type: 'icon';
  name: string;
  size?: number;
  fill?: boolean;
}

export interface SkillLevelNode extends TemplateNode {
  type: 'skillLevel';
  pathWithFallback: DataBindingPath;
}

export interface ImageNode extends TemplateNode {
  type: 'image';
  pathWithFallback: DataBindingPath;
  alt?: string;
}

export type Nodes =
  | ContainerNode
  | TextNode
  | SeperatorNode
  | ListNode
  | LinkNode
  | HtmlNode
  | DurationNode
  | IconNode
  | SkillLevelNode
  | ImageNode;

// --- Resume renderer / template layout types ---

export interface TemplatePageConfig {
  width?: number;
  height?: number;
  padding?: number;
  background?: string;
  className?: string;
  fontFamily?: string;
}

export interface TemplateColumnSideConfig {
  width: string;
  className?: string;
}

export interface TemplateColumnsConfig {
  spacing: string;
  left: TemplateColumnSideConfig;
  right: TemplateColumnSideConfig;
}

/** Section used by the renderer (minimal shape; full section shape is template-specific). */
export interface ResumeTemplateSection {
  id?: string;
  type: string;
  column?: 'left' | 'right';
  listPath?: string;
  heading?: { path?: string };
  [key: string]: unknown;
}

export interface ResumeTemplate {
  name: string;
  page: TemplatePageConfig;
  columns?: TemplateColumnsConfig;
  sections: ResumeTemplateSection[];
}
