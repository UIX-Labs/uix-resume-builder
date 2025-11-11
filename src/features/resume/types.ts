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
  transform?: {
    variant: 'flatten';
    key: string;
  };
}

export interface LinkNode extends TemplateNode {
  type: 'link';
  pathWithFallback: DataBindingPath;
  href: string;
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

export type Nodes = ContainerNode | TextNode | SeperatorNode | ListNode | LinkNode | HtmlNode | DurationNode | IconNode | SkillLevelNode | ImageNode;
