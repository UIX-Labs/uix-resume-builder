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

export type Nodes = ContainerNode | TextNode | SeperatorNode | ListNode | LinkNode | HtmlNode | DurationNode;

export type ResumeDataValue =
  | string
  | number
  | {
      start: {
        month: string;
        year: number;
      } | null;
      end: {
        month: string;
        year: number;
      } | null;
      ongoing: boolean;
    };

export type ResumeData = Record<string, ResumeDataValue> | Array<Record<string, ResumeDataValue>> | ResumeDataValue;
