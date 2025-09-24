import type {
  ContainerNode,
  DurationNode,
  HtmlNode,
  LinkNode,
  ListNode,
  Nodes,
  ResumeData,
  SeperatorNode,
  TextNode,
} from './types';
import { resolvePath } from './utils';
import { cn } from '@shared/lib/cn';
import React from 'react';
import dayjs from 'dayjs';

type RenderProps = {
  template: any;
  data: ResumeData;
  className?: string;
};

export function ResumeRenderer({ template, data, className }: RenderProps) {
  const { page, body } = template;

  return (
    <div
      className={cn(page.className, className)}
      style={{
        // width: page.width ?? 794, // ~ A4 at 96dpi
        // height: page.height,
        padding: page.padding ?? 24,
        background: page.background ?? 'white',
        fontFamily: page.fontFamily,
        position: 'relative',
      }}
    >
      {renderNode(body, data)}
    </div>
  );
}

function renderNode(node: Nodes, data: ResumeData): React.ReactNode {
  switch (node.type) {
    case 'container':
      return renderContainer(node as ContainerNode, data);
    case 'text':
      return renderText(node as TextNode, data);
    case 'list':
      return renderList(node as ListNode, data);
    case 'seperator':
      return renderSeperator(node as SeperatorNode);
    case 'link':
      return renderLink(node as LinkNode, data);
    case 'html':
      return renderHtml(node as HtmlNode, data);
    case 'duration':
      return renderDuration(node as DurationNode, data);
    default:
      return null;
  }
}

function renderContainer(node: ContainerNode, data: ResumeData) {
  const { children, className } = node;

  return (
    <div className={cn(`flex`, className)}>
      {children.map((child, index) => (
        <React.Fragment>{renderNode(child, data)}</React.Fragment>
      ))}
    </div>
  );
}

function renderSeperator(node: SeperatorNode) {
  const { variant = 'pipe', direction = 'horizontal', className } = node;

  if (variant === 'pipe') {
    return <span className={className}>|</span>;
  } else if (variant === 'line') {
    return (
      <div
        className={cn('w-full bg-zinc-200', direction === 'horizontal' ? 'h-px w-full' : 'w-px h-full', className)}
      />
    );
  }
}

function renderText(node: TextNode, data: ResumeData) {
  const { pathWithFallback, className, prefix = '', suffix = '' } = node;

  const resolved = resolvePath({ data, ...pathWithFallback });
  const finalString = `${prefix}${resolved}${suffix}`;

  return <p className={cn(className)}>{finalString}</p>;
}

function renderList(node: ListNode, data: ResumeData) {
  const { pathWithFallback, presentation, transform } = node;
  const resolved = resolvePath({ data, ...pathWithFallback });
  console.log(resolved);
  if (!Array.isArray(resolved)) {
    return null;
  }

  if (transform?.variant === 'flatten') {
    const flattened = resolved.flatMap((item) => item[transform.key as keyof typeof item]);

    return (
      <div className={cn('flex flex-wrap', node.className)}>
        {flattened.map((child) => renderNode(presentation[0], child))}
      </div>
    );
  }

  return (
    <div className={cn('flex flex-wrap', node.className)}>
      {Object.entries(resolved).map(([_key, value]) =>
        presentation.map((child) => {
          return renderNode(child, value);
        }),
      )}
    </div>
  );
}

function renderHtml(node: HtmlNode, data: ResumeData) {
  const { pathWithFallback, className } = node;
  const resolved = resolvePath({ data, ...pathWithFallback });

  return <div className={cn(className)} dangerouslySetInnerHTML={{ __html: resolved as string }} />;
}

function renderLink(node: LinkNode, data: ResumeData) {
  const { pathWithFallback, href, className } = node;

  const resolved = resolvePath({ data, ...pathWithFallback });

  return (
    <a href={href} className={cn(className)}>
      {resolved}
    </a>
  );
}

function renderDuration(node: DurationNode, data: ResumeData) {
  const { pathWithFallback, className } = node;

  const resolved = resolvePath({ data, ...pathWithFallback });

  if (resolved && resolved.start && resolved.end) {
    const startDate = dayjs().month(resolved.start.month).year(resolved.start.year);
    const endDate = dayjs().month(resolved.end.month).year(resolved.end.year);
    return <p className={cn(className)}>{`${startDate.format('MMM YYYY')} - ${endDate.format('MMM YYYY')}`}</p>;
  } else if (resolved && resolved.start && resolved.ongoing) {
    const startDate = dayjs().month(resolved.start.month).year(resolved.start.year);
    return <p className={cn(className)}>{`${startDate.format('MMM YYYY')} - Present`}</p>;
  } else {
    return <p className={cn(className)}></p>;
  }
}
