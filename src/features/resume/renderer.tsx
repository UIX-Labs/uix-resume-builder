import dayjs from 'dayjs';
import type {
  ContainerNode,
  DurationNode,
  HtmlNode,
  LinkNode,
  ListNode,
  Nodes,
  SeperatorNode,
  TextNode,
} from './types';
import { resolvePath } from './utils';
import { cn } from '@shared/lib/cn';
import type React from 'react';

type RenderProps = {
  template: any;
  data: any;
  className?: string;
};

export function ResumeRenderer({ template, data, className }: RenderProps) {
  const { page, body } = template;

  return (
    <div
      className={cn(page.className, className)}
      style={{
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

function renderNode(node: Nodes, data: any): React.ReactNode {
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

function renderContainer(node: ContainerNode, data: any) {
  const { children, className } = node;

  const renderedChildren: React.ReactNode[] = [];

  for (const child of children) {
    const rendered = renderNode(child, data);
    renderedChildren.push(rendered);
  }

  return <div className={cn(`flex`, className)}>{renderedChildren.map((child) => child)}</div>;
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

function renderText(node: TextNode, data: any) {
  const { pathWithFallback, className, prefix = '', suffix = '' } = node;

  const resolved = resolvePath({ data, ...pathWithFallback });

  if (!resolved) {
    return null;
  }

  const finalString = `${prefix}${resolved}${suffix}`;

  return <p className={cn(className)}>{finalString}</p>;
}

function renderList(node: ListNode, data: any) {
  const { pathWithFallback, presentation, transform, groupBy } = node;
  const resolved = resolvePath({ data, ...pathWithFallback });

  if (!Array.isArray(resolved) || resolved.length === 0) {
    return null;
  }

  if (groupBy) {
    const grouped = resolved.reduce((acc, item) => {
      const key = item[groupBy];

      acc[key] = {
        label: key,
        items: [...(acc[key]?.items || []), item],
      };

      return acc;
    }, {});

    return (
      <div className={cn('flex flex-wrap', node.className)}>
        {Object.entries(grouped).map(([_key, value]) =>
          presentation.map((child) => {
            return renderNode(child, value);
          }),
        )}
      </div>
    );
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

function renderHtml(node: HtmlNode, data: any) {
  const { pathWithFallback, className } = node;
  const resolved = resolvePath({ data, ...pathWithFallback });

  return <div className={cn(className)} dangerouslySetInnerHTML={{ __html: resolved as string }} />;
}

function renderLink(node: LinkNode, data: any) {
  const { pathWithFallback, hrefPathWithFallback, className } = node;

  const resolved = resolvePath({ data, ...pathWithFallback });
  const href = resolvePath({ data, ...hrefPathWithFallback });

  return (
    <a href={href} className={cn(className)}>
      {resolved}
    </a>
  );
}

function renderDuration(node: DurationNode, data: any) {
  const { pathWithFallback, className } = node;

  const resolved = resolvePath({ data, ...pathWithFallback });

  if (resolved && resolved.startDate && resolved.endDate) {
    const startDate = dayjs(resolved.startDate);
    const endDate = dayjs(resolved.endDate);
    return <p className={cn(className)}>{`${startDate.format('MMM YYYY')} - ${endDate.format('MMM YYYY')}`}</p>;
  } else if (resolved && resolved.startDate && resolved.ongoing) {
    const startDate = dayjs(resolved.startDate);
    return <p className={cn(className)}>{`${startDate.format('MMM YYYY')} - Present`}</p>;
  } else {
    return <p className={cn(className)}></p>;
  }
}
