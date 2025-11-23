/** biome-ignore-all lint/security/noDangerouslySetInnerHtml: <explanation> */
import dayjs from 'dayjs';
import { cn } from '@shared/lib/cn';
import { useLayoutEffect, useRef, useState } from 'react';
import React from 'react';

// Utility to resolve data paths
function resolvePath(data: any, path: string, fallback?: any): any {
  if (!path) return fallback;

  const keys = path.replace(/\[(\d+)\]/g, '.$1').split('.');
  let result = data;

  for (const key of keys) {
    if (result === null || result === undefined) return fallback;
    result = result[key];
  }

  return result ?? fallback;
}

type RenderProps = {
  template: any;
  data: any;
  className?: string;
};

export function ResumeRenderer({ template, data, className }: RenderProps) {
  const [pages, setPages] = useState<React.ReactNode[][]>([]);
  const dummyContentRef = useRef<HTMLDivElement>(null);

  const { page } = template;
  const sections = template.sections || [];

  const PAGE_HEIGHT = 1122;
  const PAGE_PADDING = page.padding ?? 24;
  const MAX_HEIGHT = PAGE_HEIGHT - PAGE_PADDING * 2;

  // Paginate content
  useLayoutEffect(() => {
    const container = dummyContentRef.current;
    if (!container) return;

    const newPages: React.ReactNode[][] = [];
    let currentPage: React.ReactNode[] = [];
    newPages.push(currentPage);

    const containerTop = container.getBoundingClientRect().top;
    let currentPageTop = containerTop;

    function helper(container: HTMLElement) {
      const children = Array.from(container.children) as HTMLElement[];

      if (children.length === 0) {
        return;
      }

      for (let i = 0; i < children.length; i++) {
        const el = children[i];
        el.style.display = '';

        const elRect = el.getBoundingClientRect();
        const elTop = elRect.top;
        const elBottom = elRect.bottom;
        const canBreak = el.getAttribute('data-canbreak') === 'true';

        if (canBreak) {
          helper(el);
        } else {
          // Check if element would exceed max height from current page start
          if (elBottom - currentPageTop > MAX_HEIGHT && currentPage.length > 0) {
            currentPage = [];
            newPages.push(currentPage);
            currentPageTop = elTop; // New page starts at this element's top
          }

          currentPage.push(el.cloneNode(true) as React.ReactNode);
        }
      }
    }

    helper(container);

    setPages(newPages);
  }, [template, data]);

  return (
    <>
      <div
        ref={dummyContentRef}
        className="bg-white border-[3px] border-blue-800 outline-[3px] outline-blue-400 rounded-[18px] mb-5"
        style={{
          position: 'absolute',
          visibility: 'hidden',
          fontFamily: page.fontFamily,
          pointerEvents: 'none',
          width: '21cm',
          padding: PAGE_PADDING,
        }}
      >
        {sections.map((section: any, idx: number) => (
          <React.Fragment key={idx}>{renderSection(section, data)}</React.Fragment>
        ))}
      </div>

      {pages.map((blocks, index) => (
        <div
          key={index}
          className={cn(
            'bg-white border-[3px] border-blue-800 outline-[3px] outline-blue-400 rounded-[18px] mb-5',
            page.className,
            className,
          )}
          style={{
            padding: PAGE_PADDING,
            background: page.background ?? 'white',
            fontFamily: page.fontFamily,
            width: '21cm',
            height: '29.7cm',
          }}
        >
          {blocks.map((node, i) => (
            <div key={i} dangerouslySetInnerHTML={{ __html: (node as any).outerHTML }} />
          ))}
        </div>
      ))}
    </>
  );
}

// Main section renderer
function renderSection(section: any, data: any): React.ReactNode {
  if (section.type === 'header') return renderHeaderSection(section, data);
  if (section.type === 'list-section') return renderListSection(section, data);
  if (section.type === 'content-section') return renderContentSection(section, data);
  if (section.type === 'inline-list-section') return renderInlineListSection(section, data);
  if (section.type === 'badge-section') return renderBadgeSection(section, data);
  return null;
}

// Render divider (horizontal line under headings)
function renderDivider(divider: any): React.ReactNode {
  if (!divider) return null;

  if (divider.variant === 'line') {
    return <div data-item="divider" className={cn('w-full bg-zinc-200 h-px', divider.className)} />;
  }
  if (divider.variant === 'pipe') {
    return (
      <span data-item="divider" className={divider.className}>
        |
      </span>
    );
  }
  return null;
}

// Header section renderer
function renderHeaderSection(section: any, data: any): React.ReactNode {
  const { fields, className } = section;

  return (
    <div className={cn(className)}>
      {fields.name && (
        <p className={fields.name.className}>{resolvePath(data, fields.name.path, fields.name.fallback)}</p>
      )}

      {fields.title && fields.title.path && (
        <p className={fields.title.className}>{resolvePath(data, fields.title.path)}</p>
      )}

      {fields.contact && (
        <div className={fields.contact.className}>
          {fields.contact.items.map((item: any, idx: number) => {
            const value = resolvePath(data, item.path, item.fallback);
            if (!value) return null;

            const showSeparator = idx > 0 && fields.contact.separator;

            if (item.type === 'link') {
              const href = item.href.startsWith('mailto:')
                ? item.href.replace('{{value}}', value)
                : resolvePath(data, item.href);

              return (
                <span key={idx}>
                  {showSeparator && fields.contact.separator}
                  <a href={href} className={item.className}>
                    {value}
                  </a>
                </span>
              );
            }

            return (
              <span key={idx}>
                {showSeparator && fields.contact.separator}
                {value}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}

// List section renderer (education, experience, projects, certifications)
function renderListSection(section: any, data: any): React.ReactNode {
  const items = resolvePath(data, section.listPath, []);

  if (!Array.isArray(items) || items.length === 0) return null;

  return (
    <div data-item="list-section" data-canbreak={section.break}>
      <div className={cn('flex flex-col', section.heading.className)}>
        {section.heading && (
          <p data-item="heading">{resolvePath(data, section.heading.path, section.heading.fallback)}</p>
        )}

        {section.heading.divider && renderDivider(section.heading.divider)}
      </div>

      <div data-item="content" data-canbreak={section.break}>
        {items.map((item: any, idx: number) => (
          <div key={idx} className={section.itemTemplate.className}>
            {section.itemTemplate.rows
              ? renderItemWithRows(section.itemTemplate, item)
              : renderItemWithFields(section.itemTemplate, item)}
          </div>
        ))}
      </div>
    </div>
  );
}

function renderItemWithRows(template: any, item: any): React.ReactNode {
  return template.rows.map((row: any, rowIdx: number) => (
    <div key={rowIdx} className={row.className}>
      {row.cells.map((cell: any, cellIdx: number) => (
        <div key={cellIdx}>{renderField(cell, item)}</div>
      ))}
    </div>
  ));
}

function renderItemWithFields(template: any, item: any): React.ReactNode {
  return template.fields.map((field: any, idx: number) => (
    <React.Fragment key={idx}>{renderField(field, item)}</React.Fragment>
  ));
}

function renderField(field: any, data: any): React.ReactNode {
  if (field.type === 'inline-group') {
    return (
      <>
        {field.items.map((subField: any, idx: number) => (
          <span key={idx}>
            {idx > 0 && field.separator}
            {renderField(subField, data)}
          </span>
        ))}
      </>
    );
  }

  if (field.type === 'duration') {
    const duration = resolvePath(data, field.path, field.fallback);
    if (!duration) return null;

    if (duration.startDate && duration.endDate) {
      const start = dayjs(duration.startDate).format('MMM YYYY');
      const end = dayjs(duration.endDate).format('MMM YYYY');
      return <span className={field.className}>{`${start} - ${end}`}</span>;
    }

    if (duration.startDate && duration.ongoing) {
      const start = dayjs(duration.startDate).format('MMM YYYY');
      return <span className={field.className}>{`${start} - Present`}</span>;
    }

    return null;
  }

  if (field.type === 'html') {
    const value = resolvePath(data, field.path, field.fallback);
    if (!value) return null;
    return <div className={field.className} dangerouslySetInnerHTML={{ __html: value }} />;
  }

  if (field.type === 'link') {
    const value = resolvePath(data, field.path, field.fallback);
    const href = resolvePath(data, field.href);
    if (!value || !href) return null;
    return (
      <a href={href} className={field.className}>
        {value}
      </a>
    );
  }

  const value = resolvePath(data, field.path, field.fallback);
  if (!value) return null;

  const text = `${field.prefix || ''}${value}${field.suffix || ''}`;
  return <span className={field.className}>{text}</span>;
}

// Content section renderer (summary)
function renderContentSection(section: any, data: any): React.ReactNode {
  const value = resolvePath(data, section.content.path, section.content.fallback);
  if (!value) return null;

  return (
    <div className={cn(section.className)}>
      {section.heading && (
        <p className={section.heading.className}>{resolvePath(data, section.heading.path, section.heading.fallback)}</p>
      )}

      {section.divider && renderDivider(section.divider)}

      {section.content.type === 'html' ? (
        <div className={section.content.className} dangerouslySetInnerHTML={{ __html: value }} />
      ) : (
        <p className={section.content.className}>{value}</p>
      )}
    </div>
  );
}

// Inline list section renderer (skills)
function renderInlineListSection(section: any, data: any): React.ReactNode {
  const items = resolvePath(data, section.listPath, []);
  if (!Array.isArray(items) || items.length === 0) return null;

  return (
    <div data-break={section.break}>
      <div className={cn('flex flex-col', section.heading.className)}>
        {section.heading && (
          <p data-item="heading">{resolvePath(data, section.heading.path, section.heading.fallback)}</p>
        )}

        {section.heading.divider && renderDivider(section.heading.divider)}
      </div>

      <div data-item="content" data-break={section.break}>
        {items.map((item: any, idx: number) => {
          const value = resolvePath(item, section.itemPath);
          if (!value) return null;

          return (
            <span key={idx}>
              <span className={section.itemClassName}>{value}</span>
              {idx < items.length - 1 && section.itemSeparator && <span>{section.itemSeparator}</span>}
            </span>
          );
        })}
      </div>
    </div>
  );
}

// Badge section renderer (interests, achievements)
function renderBadgeSection(section: any, data: any): React.ReactNode {
  const items = resolvePath(data, section.listPath, []);
  if (!Array.isArray(items) || items.length === 0) return null;

  return (
    <div data-break={section.break} data-item="section">
      <div className={cn('flex flex-col', section.heading.className)}>
        {section.heading && (
          <p data-item="heading">{resolvePath(data, section.heading.path, section.heading.fallback)}</p>
        )}

        {section.heading.divider && renderDivider(section.heading.divider)}
      </div>

      <div className={cn('flex gap-1 flex-wrap mt-2', section.containerClassName)}>
        {items.map((item: any, idx: number) => {
          const value = section.itemPath ? resolvePath(item, section.itemPath) : item;

          if (!value) {
            return null;
          }

          return (
            <div key={idx} className={section.badgeClassName}>
              {value}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Thumbnail generation
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
