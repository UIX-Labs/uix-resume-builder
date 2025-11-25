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


// Match section based on navs array structure
// navs names: personalDetails, experience, education, skills, projects, certifications, interests, achievements
function isCurrentSection(nodeId: string | undefined, currentSection: string): boolean {
  if (!nodeId || !currentSection) return true; // If no ID, don't blur (be safe)

  const lowerNodeId = nodeId.toLowerCase();
  const lowerCurrentSection = currentSection.toLowerCase();

  // Special case: Professional summary section is only visible when on personalDetails
  if (lowerNodeId === 'summary-section' || lowerNodeId === 'professionalsummary') {
    return lowerCurrentSection === 'personaldetails';
  }

  // Match if section ID contains the current section name from navs
  // Examples:
  // - currentSection='experience' matches 'experience-section', 'experience-list', 'experience-item'
  // - currentSection='skills' matches 'skills-section', 'skills-list'
  return lowerNodeId.includes(lowerCurrentSection);
}

// Check if this section should NEVER be blurred (always visible)
function isAlwaysVisible(nodeId: string | undefined): boolean {
  if (!nodeId) return false;

  const lowerNodeId = nodeId.toLowerCase();

  // Header section with name, contact, profile picture is always visible
  return (
    lowerNodeId === 'header-section' ||
    lowerNodeId === 'personaldetails' ||
    lowerNodeId.startsWith('header-')
  );
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

  // Don't blur if: no suggestions, generating PDF, this is always visible section, or it's the current section
  const shouldBlur =
    isSectionContainer &&
    hasSuggestions &&
    !isGeneratingPdf &&
    !isAlwaysVisible(id) &&
    currentSection &&
    !isCurrentSection(id, currentSection);


  return (
    <div
      className={cn(`flex`, className, shouldBlur && 'blur-[2px] pointer-events-none')}
      data-section={id}
      style={{
        transition: 'filter 0.3s ease',
        scrollMarginTop: '20px',
      }}
    >
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

  // Don't blur if: no suggestions, generating PDF, this is always visible section, or it's the current section
  const shouldBlur =
    isTopLevelList &&
    hasSuggestions &&
    !isGeneratingPdf &&
    !isAlwaysVisible(id) &&
    currentSection &&
    !isCurrentSection(id, currentSection); 

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
          transition: 'filter 0.3s ease',
          scrollMarginTop: '20px',
        }}
      >
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
          transition: 'filter 0.3s ease',
          scrollMarginTop: '20px',
        }}
      >
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
        transition: 'filter 0.3s ease',
        scrollMarginTop: '20px',
      }}
    >
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
