import dayjs from 'dayjs';
import { cn } from '@shared/lib/cn';
import * as LucideIcons from 'lucide-react';
import React from 'react';
import type { SuggestedUpdates } from '@entities/resume';
import { getFieldSuggestions, getSuggestionBackgroundColor } from '@features/template-form/lib/get-field-errors';
import { resolvePath } from './resolve-path';
import { renderDivider } from './components/Divider';

export function renderField(
  field: any,
  data: any,
  itemId?: string,
  suggestedUpdates?: SuggestedUpdates,
  isThumbnail?: boolean,
  skipImageFallbacks?: boolean,
): React.ReactNode {
  const fieldPath = field.path?.split('.').pop(); // Get the field name from path like "experience.items[0].description"
  const errorSuggestions = fieldPath ? getFieldSuggestions(suggestedUpdates, itemId, fieldPath) : [];
  // const errorBgColor = isThumbnail ? '' : getSuggestionBackgroundColor(errorSuggestions);

  if (field.type === 'container') {
    return (
      <div className={cn(field.className)}>
        {field.children?.map((child: any, idx: number) => (
          <React.Fragment key={idx}>{renderField(child, data, itemId, suggestedUpdates, isThumbnail, skipImageFallbacks)}</React.Fragment>
        ))}
      </div>
    );
  }

  // Handle badge type
  if (field.type === 'badge') {
    const value = field.pathWithFallback
      ? resolvePath(data, field.pathWithFallback.path, field.pathWithFallback.fallback)
      : resolvePath(data, field.path, field.fallback);

    const href = field.hrefPathWithFallback
      ? resolvePath(data, field.hrefPathWithFallback.path, field.hrefPathWithFallback.fallback)
      : resolvePath(data, field.href);

    if (!value) return null;

    const iconElement = field.icon ? renderField(field.icon, data) : null;

    const content = (
      <span className={cn('inline-flex items-center gap-1 rounded-full py-1 px-2', field.badgeClassName)}>
        {iconElement}
        {value}
      </span>
    );

    if (href) {
      return (
        <a href={href} className="hover:opacity-80">
          {content}
        </a>
      );
    }

    return content;
  }

  // Handle text type with pathWithFallback
  if (field.type === 'text') {
    const value = field.pathWithFallback
      ? resolvePath(data, field.pathWithFallback.path, field.pathWithFallback.fallback)
      : resolvePath(data, field.path, field.fallback);

    if (!value) return null;
    const text = `${field.prefix || ''}${value}${field.suffix || ''}`;
    return <span className={field.className}>{text}</span>;
  }

  if (field.type === 'contact-grid') {
    return (
      <div className={field.className}>
        {field.heading && (
          <div className={field.heading.className}>
            <p>{resolvePath(data, field.heading.path, field.heading.fallback)}</p>
            {field.heading.divider && renderDivider(field.heading.divider)}
          </div>
        )}
        {field.items?.map((subField: any, idx: number) => (
          <React.Fragment key={idx}>{renderField(subField, data, itemId, suggestedUpdates, isThumbnail, skipImageFallbacks)}</React.Fragment>
        ))}
      </div>
    );
  }

  if (field.type === 'horizontal-group') {
    return (
      <div className={cn('flex flex-row items-center', field.className)}>
        {field.items.map((subField: any, idx: number) => (
          <React.Fragment key={idx}>
            {idx > 0 && field.separator && <span>{field.separator}</span>}
            {renderField(subField, data, itemId, suggestedUpdates, isThumbnail, skipImageFallbacks)}
          </React.Fragment>
        ))}
      </div>
    );
  }

  if (field.type === 'inline-group') {
    // Render all items and filter out null/empty values
    const renderedItems = field.items
      .map((subField: any, idx: number) => ({
        idx,
        element: renderField(subField, data, itemId, suggestedUpdates, isThumbnail, skipImageFallbacks),
      }))
      .filter(
        ({ element }: { element: React.ReactNode }) => element !== null && element !== undefined && element !== '',
      );

    // Nothing to show
    if (renderedItems.length === 0) return null;

    const hasContainerClassName = !!field.containerClassName;
    const hasSeparator = !!field.separator;

    // Build content with optional separators
    const content = renderedItems.map(
      ({ element, idx }: { element: React.ReactNode; idx: number }, arrayIdx: number) => (
        <React.Fragment key={idx}>
          {arrayIdx > 0 && hasSeparator && <span>{field.separator}</span>}
          <span>{element}</span>
        </React.Fragment>
      ),
    );

    // Decide wrapper class
    const wrapperClassName = hasContainerClassName ? field.containerClassName : field.className;

    // Wrap in a div if a className exists
    if (wrapperClassName) {
      return (
        <div
          className={cn(wrapperClassName)}
          data-canbreak={field.break ? 'true' : undefined}
          data-has-breakable-content={field.break ? 'true' : undefined}
        >
          {content}
        </div>
      );
    }

    // Otherwise return just the content
    return <span className={/*errorBgColor*/ ''}>{content}</span>;
  }

  if (field.type === 'icon') {
    const IconComponent = (LucideIcons as any)[field.name];
    if (!IconComponent) return null;
    return <IconComponent size={field.size || 16} className={field.className} />;
  }

  if (field.type === 'image') {
    // Get the actual value from data path (without fallback first to check if real image exists)
    const actualSrc = resolvePath(data, field.path)?.replace(/&amp;/g, "&");
    const hasActualImage = actualSrc && actualSrc.trim() !== "";
    
    // When skipImageFallbacks is true (during PDF generation), don't use fallback
    // This hides the profile image section if no real image is uploaded
    if (skipImageFallbacks && !hasActualImage) {
      return null;
    }

    const src = hasActualImage ? actualSrc : field.fallback;
    if (!src) return null;

    // Helper to check if URL is external (S3, http, https)
    const isExternalUrl = (url: string) => {
      return url.startsWith('http://') || url.startsWith('https://');
    };

    // Use proxy ONLY for thumbnails with external URLs to avoid CORS issues
    // Local images (like /images/google.svg) don't need proxying
    const imageSrc =
      isThumbnail && src && isExternalUrl(src)
        ? `/api/proxy-image?url=${encodeURIComponent(src)}`
        : src;

    return (
      <img
        src={imageSrc}
        crossOrigin={isThumbnail && isExternalUrl(src) ? 'anonymous' : undefined}
        alt={field.alt || 'Image'}
        className={cn(field.className)}
      />
    );
  }

  if (field.type === 'group') {
    return (
      <div className={field.className}>
        {field.items.map((subField: any, idx: number) => (
          <React.Fragment key={idx}>
            {renderField(subField, data, itemId, suggestedUpdates, isThumbnail, skipImageFallbacks)}
          </React.Fragment>
        ))}
      </div>
    );
  }

  if (field.type === 'text') {
    const value = resolvePath(data, field.path, field.fallback);
    if (!value) return null;
    return <p className={cn(field.className /*, errorBgColor*/)}>{value}</p>;
  }

  if (field.type === 'skillLevel') {
    const value = resolvePath(data, field.path, field.fallback);
    if (!value) return null;

    const levelMap: Record<string, number> = {
      Beginner: 2,
      Intermediate: 3,
      Expert: 5,
    };

    const circleCount = levelMap[value] || 3;

    return (
      <div className={cn('flex gap-1', field.className)}>
        {Array.from({ length: 5 }, (_, index) => (
          <div
            key={index}
            className={cn('w-2 h-2 rounded-full border border-black', index < circleCount ? 'bg-black' : 'bg-gray-400')}
          />
        ))}
      </div>
    );
  }

  if (field.type === 'inline-group-with-icon') {
    const renderedItems = field.items.map((subField: any, idx: number) => ({
      idx,
      element: renderField(subField, data, itemId, suggestedUpdates, isThumbnail, skipImageFallbacks),
      isIcon: subField.type === 'icon',
      subField,
    }));

    const hasValidValues = renderedItems.some(
      (item: any) => !item.isIcon && item.element !== null && item.element !== undefined && item.element !== '',
    );

    if (!hasValidValues) return null;

    const itemsToRender = renderedItems.filter(
      (item: any) => item.isIcon || (item.element !== null && item.element !== undefined && item.element !== ''),
    );

    if (itemsToRender.length === 0) return null;

    return (
      <div className={field.className}>
        {itemsToRender.map(({ element, idx }: { element: React.ReactNode; idx: number }, arrayIdx: number) => (
          <span key={idx} className={cn(field.items[idx].className)}>
            {arrayIdx > 0 && field.separator}
            {element}
          </span>
        ))}
      </div>
    );
  }

  if (field.type === 'duration') {
    const duration = resolvePath(data, field.path, field.fallback);
    if (!duration) return null;

    if (duration.startDate && duration.endDate) {
      const start = dayjs(duration.startDate).format('MMM YYYY');
      const end = dayjs(duration.endDate).format('MMM YYYY');
      return <span className={cn(field.className)}>{`${start} - ${end}`}</span>;
    }

    if (duration.startDate && duration.ongoing) {
      const start = dayjs(duration.startDate).format('MMM YYYY');
      return <span className={cn(field.className)}>{`${start} - Present`}</span>;
    }

    return null;
  }

  if (field.type === 'html') {
    const value = resolvePath(data, field.path, field.fallback);
    if (!value) return null;
    return (
      <div
        className={field.className}
        dangerouslySetInnerHTML={{ __html: value }}
        data-canbreak={field.break !== false ? 'true' : undefined}
        data-has-breakable-content={field.break !== false ? 'true' : undefined}
      />
    );
  }

  if (field.type === 'link') {
    // First, check if the href path exists in the data (without fallback)
    const hrefValue = resolvePath(data, field.href);
    const value = resolvePath(data, field.path, field.fallback);

    // If the value itself doesn't exist, don't render
    if (!value || (typeof value === 'string' && value.trim() === '')) return null;

    let href = field.href;

    // Handle template placeholders like mailto:{{value}}
    if (href && href.includes('{{value}}')) {
      href = href.replace('{{value}}', value);
    } else {
      // Otherwise, resolve href as a path in the data
      href = resolvePath(data, field.href);

      // If no href data exists at all, don't render the link field
      if (!href || (typeof href === 'string' && href.trim() === '')) return null;
    }

    // Check if href is actually a URL (starts with http://, https://, or mailto:)
    const isValidUrl =
      href &&
      typeof href === 'string' &&
      (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:'));

    // If link exists but is invalid, create a data URL that shows \"Link not valid\" message

    // If link exists but is invalid, create a data URL that shows "Link not valid" message
    if (!isValidUrl) {
      href = '/error/invalid-link';
    }

    return (
      <a href={href} className={field.className} target="_blank" rel="noopener noreferrer">
        {value}
      </a>
    );
  }

  const value = resolvePath(data, field.path, field.fallback);
  if (!value) return null;

  const text = `${field.prefix || ''}${value}${field.suffix || ''}`;
  return <span className={cn(field.className)}>{text}</span>;
}

export function renderItemWithRows(
  template: any,
  item: any,
  itemId?: string,
  suggestedUpdates?: SuggestedUpdates,
  isThumbnail?: boolean,
): React.ReactNode {
  console.log("rows", template.rows)
  return template.rows.map((row: any, rowIdx: number) => {
    // Check if any cell in this row has break/breakable: true
    const hasBreakableCell = row.cells.some((cell: any) => cell.break === true || cell.breakable === true);
    const isRowBreakable = row.break === true || row.breakable === true || hasBreakableCell;

    return (
      <div
        key={rowIdx}
        className={row.className}
        data-canbreak={isRowBreakable ? 'true' : undefined}
        data-has-breakable-content={isRowBreakable ? 'true' : undefined}
      >
        {row.cells.map((cell: any, cellIdx: number) => (
          <React.Fragment key={cellIdx}>{renderField(cell, item, itemId, suggestedUpdates, isThumbnail)}</React.Fragment>
        ))}
      </div>
    );
  });
}

export function renderItemWithFields(
  template: any,
  item: any,
  itemId?: string,
  suggestedUpdates?: SuggestedUpdates,
  isThumbnail?: boolean,
): React.ReactNode {
  console.log("fields", template.fields)
  return template.fields.map((field: any, idx: number) => (
    <div
      key={idx}
      data-canbreak={field.break || field.breakable ? 'true' : undefined}
      data-has-breakable-content={field.break || field.breakable ? 'true' : undefined}
    >
      {renderField(field, item, itemId, suggestedUpdates, isThumbnail)}
    </div>
  ));
}
