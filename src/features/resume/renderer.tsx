import dayjs from 'dayjs';
import type {
  ContainerNode,
  DurationNode,
  HtmlNode,
  IconNode,
  LinkNode,
  ListNode,
  Nodes,
  SeperatorNode,
  TextNode,
  SkillLevelNode,
  ImageNode,
} from './types';
import { resolvePath } from './utils';
import { cn } from '@shared/lib/cn';
import * as Icons from 'lucide-react';
import React from 'react';

type RenderProps = {
  template: any;
  data: any;
  className?: string;
  currentSection?: string;
  isGeneratingPdf?: boolean;
  hasSuggestions?: boolean;
};

// Reusable sparkle indicator badge for highlighted sections
function SparkleIndicator() {
  return (
    <div
      style={{
        position: 'absolute',
        top: '-25px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: '#02A44F',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 8px rgba(2, 164, 79, 0.3)',
        zIndex: 10,
      }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
          fill="white"
        />
        <path
          d="M18 4L18.75 6.25L21 7L18.75 7.75L18 10L17.25 7.75L15 7L17.25 6.25L18 4Z"
          fill="white"
        />
      </svg>
    </div>
  );
}

function isCurrentSection(nodeId: string | undefined, currentSection: string): boolean {
  if (!nodeId || !currentSection) return true; // If no ID, don't blur (be safe)

  const lowerNodeId = nodeId.toLowerCase();
  const lowerCurrentSection = currentSection.toLowerCase();


  if (lowerNodeId === 'header-section' || lowerNodeId.startsWith('header-')) {
    return true;
  }

  // When on personalDetails: contact info (address, email, phone, links) should be visible
  if (lowerCurrentSection === 'personaldetails') {
    const personalDetailsFields = ['address', 'email', 'phone', 'links', 'contact', 'social', 'personaldetails', 'summary'];
    if (personalDetailsFields.some(field => lowerNodeId.includes(field))) {
      return true;
    }
  }

 
  return lowerNodeId.includes(lowerCurrentSection);
}

export function ResumeRenderer({ template, data, className, currentSection, isGeneratingPdf = false, hasSuggestions = false }: RenderProps) {
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
      {renderNode(body, data, currentSection, isGeneratingPdf, hasSuggestions)}
    </div>
  );
}

function renderNode(node: Nodes, data: any, currentSection?: string, isGeneratingPdf?: boolean, hasSuggestions?: boolean): React.ReactNode {
  switch (node.type) {
    case 'container':
      return renderContainer(node as ContainerNode, data, currentSection, isGeneratingPdf, hasSuggestions);
    case 'text':
      return renderText(node as TextNode, data);
    case 'list':
      return renderList(node as ListNode, data, currentSection, isGeneratingPdf, hasSuggestions);
    case 'seperator':
      return renderSeperator(node as SeperatorNode);
    case 'link':
      return renderLink(node as LinkNode, data);
    case 'html':
      return renderHtml(node as HtmlNode, data);
    case 'duration':
      return renderDuration(node as DurationNode, data);
    case 'icon':
      return renderIcon(node as IconNode);
    case 'skillLevel':
      return renderSkillLevel(node as SkillLevelNode, data);
    case 'image':
      return renderImage(node as ImageNode, data);
    default:
      return null;
  }
}

function renderContainer(node: ContainerNode, data: any, currentSection?: string, isGeneratingPdf?: boolean, hasSuggestions?: boolean) {
  const { children, className, id } = node;

  const renderedChildren: React.ReactNode[] = [];

  for (const child of children) {
    const rendered = renderNode(child, data, currentSection, isGeneratingPdf, hasSuggestions);
    renderedChildren.push(rendered);
  }

  const isSectionContainer = id && id.endsWith('-section');

  // Blur sections that are not the current section (when suggestions are active)
  const shouldBlur =
    isSectionContainer &&
    hasSuggestions &&
    !isGeneratingPdf &&
    currentSection &&
    !isCurrentSection(id, currentSection);


  const shouldHighlight =
    isSectionContainer &&
    hasSuggestions &&
    !isGeneratingPdf &&
    currentSection &&
    isCurrentSection(id, currentSection) &&
    id !== 'header-section' &&
    id !== 'contact-section' &&
    !id.startsWith('header-');

  return (
    <div
      className={cn(`flex`, className, shouldBlur && 'blur-[2px] pointer-events-none')}
      data-section={id}
      style={{
        scrollMarginTop: '20px',
        ...(hasSuggestions && {
          transition: 'filter 0.3s ease, background-color 0.3s ease, border 0.3s ease',
        }),
        ...(shouldHighlight && {
          backgroundColor: 'rgba(200, 255, 230, 0.35)',
          border: '2px solid rgba(0, 168, 107, 0.4)',
          borderRadius: '12px',
          padding: '16px',
          position: 'relative',
        }),
      }}
    >
      {shouldHighlight && <SparkleIndicator />}
      {renderedChildren.map((child, index) => <React.Fragment key={index}>{child}</React.Fragment>)}
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

function renderText(node: TextNode, data: any) {
  const { pathWithFallback, className, prefix = '', suffix = '' } = node;

  const resolved = resolvePath({ data, ...pathWithFallback });

  if (!resolved) {
    return null;
  }

  const finalString = `${prefix}${resolved}${suffix}`;

  return <p className={cn(className)}>{finalString}</p>;
}

function renderList(node: ListNode, data: any, currentSection?: string, isGeneratingPdf?: boolean, hasSuggestions?: boolean) {
  const { pathWithFallback, presentation, transform, groupBy, seperator, id } = node;
  const resolved = resolvePath({ data, ...pathWithFallback });

  if (!Array.isArray(resolved) || resolved.length === 0) {
    return null;
  }

  // Check if this is a top-level list (personalDetails or professionalSummary)
  const isTopLevelList = id === 'personalDetails' || id === 'professionalSummary';

  // Blur sections that are not the current section (when suggestions are active)
  const shouldBlur =
    isTopLevelList &&
    hasSuggestions &&
    !isGeneratingPdf &&
    currentSection &&
    !isCurrentSection(id, currentSection);

  // Highlight current section with green background when suggestions are available
  const shouldHighlight =
    isTopLevelList &&
    hasSuggestions &&
    !isGeneratingPdf &&
    currentSection &&
    isCurrentSection(id, currentSection); 

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
      <div
        className={cn('flex flex-wrap', node.className, shouldBlur && 'blur-[2px] pointer-events-none')}
        data-section={id}
        style={{
          scrollMarginTop: '20px',
          ...(hasSuggestions && {
            transition: 'filter 0.3s ease, background-color 0.3s ease, border 0.3s ease',
          }),
          ...(shouldHighlight && {
            backgroundColor: 'rgba(200, 255, 230, 0.35)',
            border: '2px solid rgba(0, 168, 107, 0.4)',
            borderRadius: '12px',
            padding: '16px',
            position: 'relative',
          }),
        }}
      >
        {shouldHighlight && <SparkleIndicator />}
        {Object.entries(grouped).map(([_key, value], groupIndex, groupArray) =>
          presentation.map((child, childIndex) => {
            const isLast = groupIndex === groupArray.length - 1 && childIndex === presentation.length - 1;
            return (
              <React.Fragment key={`${groupIndex}-${childIndex}`}>
                {renderNode(child, value, currentSection, isGeneratingPdf, hasSuggestions)}
                {!isLast && seperator && <span>{seperator}</span>}
              </React.Fragment>
            );
          }),
        )}
      </div>
    );
  }

  if (transform?.variant === 'flatten') {
    const flattened = resolved.flatMap((item) => item[transform.key as keyof typeof item]);

    return (
      <div
        className={cn('flex flex-wrap', node.className, shouldBlur && 'blur-[2px] pointer-events-none')}
        data-section={id}
        style={{
          scrollMarginTop: '20px',
          ...(hasSuggestions && {
            transition: 'filter 0.3s ease, background-color 0.3s ease, border 0.3s ease',
          }),
          ...(shouldHighlight && {
            backgroundColor: 'rgba(200, 255, 230, 0.35)',
            border: '2px solid rgba(0, 168, 107, 0.4)',
            borderRadius: '12px',
            padding: '16px',
            position: 'relative',
          }),
        }}
      >
        {shouldHighlight && <SparkleIndicator />}
        {flattened.map((child, index) => {
          const isLast = index === flattened.length - 1;
          return (
            <React.Fragment key={index}>
              {renderNode(presentation[0], child, currentSection, isGeneratingPdf, hasSuggestions)}
              {!isLast && seperator && <span>{seperator}</span>}
            </React.Fragment>
          );
        })}
      </div>
    );
  }

  return (
    <div
      className={cn('flex flex-wrap', node.className, shouldBlur && 'blur-[2px] pointer-events-none')}
      data-section={id}
      style={{
        transition: 'filter 0.3s ease, background-color 0.3s ease, border 0.3s ease',
        scrollMarginTop: '20px',
        ...(shouldHighlight && {
          backgroundColor: 'rgba(200, 255, 230, 0.35)',
          border: '2px solid rgba(0, 168, 107, 0.4)',
          borderRadius: '12px',
          padding: '16px',
          position: 'relative',
        }),
      }}
    >
      {shouldHighlight && <SparkleIndicator />}
      {Object.entries(resolved).map(([_key, value], index, array) =>
        presentation.map((child, childIndex) => {
          const isLast = index === array.length - 1 && childIndex === presentation.length - 1;
          return (
            <React.Fragment key={`${index}-${childIndex}`}>
              {renderNode(child, value, currentSection, isGeneratingPdf, hasSuggestions)}
              {!isLast && seperator && <span>{seperator}</span>}
            </React.Fragment>
          );
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
  const { pathWithFallback, hrefPathWithFallback, href: staticHref, className, prefix = '' } = node;

  const resolved = resolvePath({ data, ...pathWithFallback });
  const href = hrefPathWithFallback ? resolvePath({ data, ...hrefPathWithFallback }) : staticHref;

  if (!resolved) {
    return null;
  }

  return (
    <a href={href} className={cn(className)}>
      {prefix}
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

function renderIcon(node: IconNode) {
  const { name, size = 16, className, fill = false } = node;

  const IconComponent = Icons[name as keyof typeof Icons] as React.ComponentType<any>;

  if (!IconComponent) {
    return null;
  }

  return <IconComponent size={size} className={cn(className)} fill={fill ? 'currentColor' : 'none'} />;
}

function renderSkillLevel(node: SkillLevelNode, data: any) {
  const { pathWithFallback, className } = node;
  const resolved = resolvePath({ data, ...pathWithFallback });

  if (!resolved) {
    return null;
  }

  const levelMap: Record<string, number> = {
    'Beginner': 2,
    'Intermediate': 3,
    'Expert': 5,
  };

  const circleCount = levelMap[resolved] || 3; 

  return (
    <div className={cn('flex gap-1', className)}>
      {Array.from({ length: 5 }, (_, index) => (
        <div
          key={index}
          className={cn('w-2 h-2 rounded-full border border-black', index < circleCount ? 'bg-black' : 'bg-gray-400')}
        />
      ))}
    </div>
  );
}

function renderImage(node: ImageNode, data: any) {
  const { pathWithFallback, className, alt = 'Image' } = node;
  const resolved = resolvePath({ data, ...pathWithFallback });

  if (!resolved) {
    return null;
  }

  return (
    <img
      src={resolved as string}
      alt={alt}
      className={cn(className)}
    />
  );
}

import html2canvas from 'html2canvas';

export type ThumbnailOptions = {
  width?: number;
  height?: number;
  aspectRatio?: number;
  backgroundColor?: string;
};

export async function generateThumbnail(element: HTMLElement, options: ThumbnailOptions = {}): Promise<string | null> {
  const { backgroundColor = 'white' } = options;

  try {
    // Generate canvas with html2canvas
    const canvasPromise = html2canvas(element, {
      useCORS: true,
      allowTaint: false,
      backgroundColor: backgroundColor,
      logging: false,
      width: element.clientWidth,
      height: element.clientHeight,
      scale: 0.6,
    });

    const canvas = await canvasPromise;

    return canvas.toDataURL('image/png', 1);
  } catch (error) {
    console.error('Failed to generate thumbnail:', error);
    return null;
  }
}
