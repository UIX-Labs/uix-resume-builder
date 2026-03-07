import type { SuggestedUpdates } from '@entities/resume';
import { getFieldSuggestions, getSuggestionBackgroundColor } from '@features/template-form/lib/get-field-errors';
import { cn } from '@shared/lib/cn';
import { isHtml } from '@shared/lib/markdown';
import dayjs from 'dayjs';
import * as LucideIcons from 'lucide-react';
import React from 'react';
import { renderDivider } from './components/Divider';
import { resolvePath } from './resolve-path';
import { getSuggestionDataAttribute } from './suggestion-utils';

const isEmptyValue = (val: any): boolean => {
  if (val === null || val === undefined) return true;
  if (typeof val === 'string') return val.trim() === '' || val === 'null' || val === 'undefined';
  if (Array.isArray(val)) return val.length === 0 || val.every(isEmptyValue);
  if (typeof val === 'object') {
    const values = Object.values(val);
    if (values.length === 0) return true;
    return values.every(isEmptyValue);
  }
  return false;
};

export function renderField(
  field: any,
  data: any,
  itemId?: string,
  suggestedUpdates?: SuggestedUpdates,
  isThumbnail?: boolean,
  skipImageFallbacks?: boolean,
  sectionId?: string,
): React.ReactNode {
  // 1. Handle condition check if it exists
  if (field.condition) {
    const conditionValue = resolvePath(data, field.condition);

    if (isEmptyValue(conditionValue)) {
      return null;
    }
  }

  const fieldPath = field.path?.split('.').pop(); // Get the field name from path like "experience.items[0].description"
  const errorSuggestions = fieldPath ? getFieldSuggestions(suggestedUpdates, itemId, fieldPath) : [];
  const errorBgColor = isThumbnail ? '' : getSuggestionBackgroundColor(errorSuggestions);
  const suggestionData = getSuggestionDataAttribute(sectionId, itemId, fieldPath, errorSuggestions, isThumbnail);
  const hasSuggestions = !!suggestionData;

  if (field.type === 'container') {
    const children = field.children
      ?.map((child: any, idx: number) => {
        const rendered = renderField(child, data, itemId, suggestedUpdates, isThumbnail, skipImageFallbacks, sectionId);
        if (!rendered) return null;
        return <React.Fragment key={idx}>{rendered}</React.Fragment>;
      })
      .filter(Boolean);

    if (!children || children.length === 0) return null;

    return <div className={cn(field.className)}>{children}</div>;
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
      <span
        className={cn(
          'inline-flex items-center gap-1 rounded-full py-1 px-2',
          field.badgeClassName,
          errorBgColor,
          hasSuggestions && 'cursor-pointer',
        )}
        data-suggestion={suggestionData}
      >
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

    const hasHtmlTags = isHtml(text);

    if (hasHtmlTags) {
      return (
        <span
          className={cn(field.className, errorBgColor, hasSuggestions && 'cursor-pointer')}
          data-suggestion={suggestionData}
          // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for HTML content rendering
          dangerouslySetInnerHTML={{ __html: text }}
        />
      );
    }

    return (
      <span
        className={cn(field.className, errorBgColor, hasSuggestions && 'cursor-pointer')}
        data-suggestion={suggestionData}
      >
        {text}
      </span>
    );
  }

  if (field.type === 'contact-grid') {
    const items = field.items
      ?.map((subField: any, idx: number) => {
        const rendered = renderField(
          subField,
          data,
          itemId,
          suggestedUpdates,
          isThumbnail,
          skipImageFallbacks,
          sectionId,
        );
        if (!rendered) return null;
        return <React.Fragment key={idx}>{rendered}</React.Fragment>;
      })
      .filter(Boolean);

    if (!items || items.length === 0) return null;

    return (
      <div className={field.className}>
        {field.heading && (
          <div className={field.heading.className}>
            <p>{resolvePath(data, field.heading.path, field.heading.fallback)}</p>
            {field.heading.divider && renderDivider(field.heading.divider)}
          </div>
        )}
        {items}
      </div>
    );
  }

  if (field.type === 'horizontal-group') {
    const items = field.items
      .map((subField: any, idx: number) => {
        const rendered = renderField(
          subField,
          data,
          itemId,
          suggestedUpdates,
          isThumbnail,
          skipImageFallbacks,
          sectionId,
        );
        if (!rendered) return null;
        return (
          <React.Fragment key={idx}>
            {idx > 0 && field.separator && <span>{field.separator}</span>}
            {rendered}
          </React.Fragment>
        );
      })
      .filter(Boolean);

    if (items.length === 0) return null;

    return <div className={cn('flex flex-row items-center', field.className)}>{items}</div>;
  }

  if (field.type === 'inline-group') {
    // Render all items and filter out null/empty values
    const renderedItems = field.items
      .map((subField: any, idx: number) => ({
        idx,
        element: renderField(subField, data, itemId, suggestedUpdates, isThumbnail, skipImageFallbacks, sectionId),
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
    return (
      <span className={cn(errorBgColor, hasSuggestions && 'cursor-pointer')} data-suggestion={suggestionData}>
        {content}
      </span>
    );
  }

  if (field.type === 'icon') {
    const IconComponent = (LucideIcons as any)[field.name];
    if (!IconComponent) return null;
    return <IconComponent size={field.size || 16} className={field.className} />;
  }

  if (field.type === 'image') {
    // Get the actual value from data path (without fallback first to check if real image exists)
    const actualValue = resolvePath(data, field.path);
    const actualSrc = (typeof actualValue === 'string' ? actualValue : '')?.replace(/&amp;/g, '&');
    const isDefaultPlaceholder = [
      '/images/profileimg.jpeg',
      '/images/profileimg.jpg',
      '/images/profileimg.png',
    ].includes(actualSrc);
    const hasActualImage = !isEmptyValue(actualValue) && !isDefaultPlaceholder;

    // If skipImageFallbacks is on, we ONLY render if we have actual data
    if (skipImageFallbacks && !hasActualImage) {
      return null;
    }

    // If a path is provided but no image is found at that path,
    // we return null to allow columns/groups to collapse.
    // This is the global fix for all templates.
    if (field.path && !hasActualImage) {
      return null;
    }

    const src = hasActualImage ? actualSrc : field.fallback;
    if (isEmptyValue(src)) return null;

    // Helper to check if URL is external (S3, http, https)
    const isExternalUrl = (url: string) => {
      return url.startsWith('http://') || url.startsWith('https://');
    };

    // Use proxy ONLY for thumbnails with external URLs to avoid CORS issues
    const imageSrc = isThumbnail && src && isExternalUrl(src) ? `/api/proxy-image?url=${encodeURIComponent(src)}` : src;

    return (
      // biome-ignore lint/performance/noImgElement: resume template rendering requires img for PDF/thumbnail generation
      <img
        src={imageSrc}
        crossOrigin={isThumbnail && isExternalUrl(src) ? 'anonymous' : undefined}
        alt={field.alt || 'Profile Picture'}
        className={cn(field.className)}
      />
    );
  }

  if (field.type === 'group') {
    const renderedItems = field.items
      .map((subField: any, idx: number) => ({
        idx,
        element: renderField(subField, data, itemId, suggestedUpdates, isThumbnail, skipImageFallbacks, sectionId),
      }))
      .filter(
        ({ element }: { element: React.ReactNode }) => element !== null && element !== undefined && element !== '',
      );

    if (renderedItems.length === 0) return null;

    return (
      <div className={field.className}>
        {renderedItems.map(({ element, idx }: { element: React.ReactNode; idx: number }) => (
          <React.Fragment key={idx}>{element}</React.Fragment>
        ))}
      </div>
    );
  }

  if (field.type === 'text') {
    const value = resolvePath(data, field.path, field.fallback);
    if (!value) return null;
    return (
      <p
        className={cn(field.className, errorBgColor, hasSuggestions && 'cursor-pointer')}
        data-suggestion={suggestionData}
      >
        {value}
      </p>
    );
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
      <div
        className={cn('flex gap-1', field.className, errorBgColor, hasSuggestions && 'cursor-pointer')}
        data-suggestion={suggestionData}
      >
        {Array.from({ length: 5 }, (_, index) => {
          return (
            <div
              // biome-ignore lint/suspicious/noArrayIndexKey: static list
              key={index}
              className={cn(
                'w-2 h-2 rounded-full border border-black',
                index < circleCount ? 'bg-black' : 'bg-gray-400',
              )}
            />
          );
        })}
      </div>
    );
  }

  if (field.type === 'inline-group-with-icon') {
    const renderedItems = field.items.map((subField: any, idx: number) => ({
      idx,
      element: renderField(subField, data, itemId, suggestedUpdates, isThumbnail, skipImageFallbacks, sectionId),
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
      return (
        <span
          className={cn(field.className, errorBgColor, hasSuggestions && 'cursor-pointer')}
          data-suggestion={suggestionData}
        >{`${start} - ${end}`}</span>
      );
    }

    if (duration.startDate && duration.ongoing) {
      const start = dayjs(duration.startDate).format('MMM YYYY');
      return (
        <span
          className={cn(field.className, errorBgColor, hasSuggestions && 'cursor-pointer')}
          data-suggestion={suggestionData}
        >{`${start} - Present`}</span>
      );
    }

    return null;
  }

  if (field.type === 'html') {
    const value = resolvePath(data, field.path, field.fallback);
    if (!value) return null;
    return (
      <div
        className={cn(field.className, errorBgColor, hasSuggestions && 'cursor-pointer')}
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for HTML content rendering
        dangerouslySetInnerHTML={{ __html: value }}
        data-canbreak={field.break !== false ? 'true' : undefined}
        data-has-breakable-content={field.break !== false ? 'true' : undefined}
        data-suggestion={suggestionData}
      />
    );
  }

  if (field.type === 'link') {
    // First, check if the href path exists in the data (without fallback)
    const _hrefValue = resolvePath(data, field.href);
    const value = resolvePath(data, field.path, field.fallback);

    // If the value itself doesn't exist, don't render
    if (!value || (typeof value === 'string' && value.trim() === '')) return null;

    let href = field.href;

    // Handle template placeholders like mailto:{{value}}
    if (href?.includes('{{value}}')) {
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
      <a
        href={href}
        className={cn(field.className, errorBgColor, hasSuggestions && 'cursor-pointer')}
        target="_blank"
        rel="noopener noreferrer"
        data-suggestion={suggestionData}
        onClick={(e) => {
          // Prevent navigation if it has suggestions (will be handled by event delegation)
          if (suggestionData) {
            e.preventDefault();
          }
        }}
      >
        {value}
      </a>
    );
  }

  const value = resolvePath(data, field.path, field.fallback);
  if (!value) return null;

  const text = `${field.prefix || ''}${value}${field.suffix || ''}`;

  const hasHtmlTags = isHtml(text);

  if (hasHtmlTags) {
    return (
      <span
        className={cn(field.className, errorBgColor, hasSuggestions && 'cursor-pointer')}
        data-suggestion={suggestionData}
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for HTML content rendering
        dangerouslySetInnerHTML={{ __html: text }}
      />
    );
  }

  return (
    <span
      className={cn(field.className, errorBgColor, hasSuggestions && 'cursor-pointer')}
      data-suggestion={suggestionData}
    >
      {text}
    </span>
  );
}

export function renderItemWithRows(
  template: any,
  item: any,
  itemId?: string,
  suggestedUpdates?: SuggestedUpdates,
  isThumbnail?: boolean,
  sectionId?: string,
): React.ReactNode {
  return template.rows.map((row: any, index: number) => {
    // Check if any cell in this row has break/breakable: true
    const hasBreakableCell = row.cells.some((cell: any) => cell.break === true || cell.breakable === true);
    const isRowBreakable = row.break === true || row.breakable === true || hasBreakableCell;

    return (
      <div
        // biome-ignore lint/suspicious/noArrayIndexKey: static list
        key={index}
        className={row.className}
        data-canbreak={isRowBreakable ? 'true' : undefined}
        data-has-breakable-content={isRowBreakable ? 'true' : undefined}
      >
        {row.cells.map((cell: any, cellIndex: number) => {
          return (
            // biome-ignore lint/suspicious/noArrayIndexKey: static list
            <React.Fragment key={cellIndex}>
              {renderField(cell, item, itemId, suggestedUpdates, isThumbnail, undefined, sectionId)}
            </React.Fragment>
          );
        })}
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
  sectionId?: string,
): React.ReactNode {
  return template.fields.map((field: any, index: number) => {
    return (
      <div
        // biome-ignore lint/suspicious/noArrayIndexKey: static list
        key={index}
        data-canbreak={field.break || field.breakable ? 'true' : undefined}
        data-has-breakable-content={field.break || field.breakable ? 'true' : undefined}
      >
        {renderField(field, item, itemId, suggestedUpdates, isThumbnail, undefined, sectionId)}
      </div>
    );
  });
}
