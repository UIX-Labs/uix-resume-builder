import dayjs from 'dayjs';
import { cn } from '@shared/lib/cn';
import * as LucideIcons from 'lucide-react';
import React from 'react';
import type { SuggestedUpdates } from '@entities/resume';
import {
  getFieldSuggestions,
  getSuggestionBackgroundColor,
} from '@features/template-form/lib/get-field-errors';
import { resolvePath } from './resolve-path';

export function renderField(
  field: any,
  data: any,
  itemId?: string,
  suggestedUpdates?: SuggestedUpdates,
  isThumbnail?: boolean,
): React.ReactNode {
  
  const fieldPath = field.path?.split('.').pop(); 
  const errorSuggestions = fieldPath ? getFieldSuggestions(suggestedUpdates, itemId, fieldPath) : [];
  const errorBgColor = isThumbnail ? '' : getSuggestionBackgroundColor(errorSuggestions);

  if (field.type === 'container') {
    return (
      <div className={cn(field.className, errorBgColor)}>
        {field.children?.map((child: any, idx: number) => (
          <React.Fragment key={idx}>{renderField(child, data, itemId, suggestedUpdates, isThumbnail)}</React.Fragment>
        ))}
      </div>
    );
  }

  if (field.type === 'horizontal-group') {
    return (
      <div className={cn('flex flex-row items-center', field.className, errorBgColor)}>
        {field.items.map((subField: any, idx: number) => (
          <React.Fragment key={idx}>
            {idx > 0 && field.separator && <span>{field.separator}</span>}
            {renderField(subField, data, itemId, suggestedUpdates, isThumbnail)}
          </React.Fragment>
        ))}
      </div>
    );
  }

  if (field.type === 'inline-group') {
    // Filter out items with no value first
    const renderedItems = field.items
      .map((subField: any, idx: number) => ({
        idx,
        element: renderField(subField, data, itemId, suggestedUpdates, isThumbnail),
      }))
      .filter(
        ({ element }: { element: React.ReactNode }) => element !== null && element !== undefined && element !== '',
      );

    if (renderedItems.length === 0) return null;

    const hasContainerClassName = !!field.containerClassName;
    const hasSeparator = !!field.separator;

    const content = renderedItems.map(
      ({ element, idx }: { element: React.ReactNode; idx: number }, arrayIdx: number) => (
        <React.Fragment key={idx}>
          {arrayIdx > 0 && hasSeparator && <span>{field.separator}</span>}
          <span>{element}</span>
        </React.Fragment>
      ),
    );

    // Use containerClassName if provided (for flex/inline layouts), otherwise className
    const wrapperClassName = hasContainerClassName ? field.containerClassName : field.className;

    // Use div wrapper when className or containerClassName is provided
    if (wrapperClassName) {
      return <div className={cn(errorBgColor, wrapperClassName)}>{content}</div>; 
    }

    // No className, use fragment
    return <span className={errorBgColor}>{content}</span>;
  }

  if (field.type === 'icon') {
    const IconComponent = (LucideIcons as any)[field.name];
    if (!IconComponent) return null;
    return <IconComponent size={field.size || 16} className={field.className} />;
  }

  if (field.type === 'image') {
    const src = resolvePath(data, field.path, field.fallback);
    if (!src && !field.fallback) return null;

    return <img src={src || field.fallback} alt={field.alt || 'Image'} className={cn(field.className)} />;
  }

  if (field.type === 'group') {
    return (
      <div className={field.className}>
        {field.items.map((subField: any, idx: number) => (
          <React.Fragment key={idx}>
            {renderField(subField, data, itemId, suggestedUpdates, isThumbnail)}
          </React.Fragment>
        ))}
      </div>
    );
  }

  if (field.type === 'text') {
    const value = resolvePath(data, field.path, field.fallback);
    if (!value) return null;
    return <p className={cn(field.className, errorBgColor)}>{value}</p>;
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
            className={cn('w-2 h-2 rounded-full border border-black', index < circleCount ? 'bg-black' : 'bg-gray-400',errorBgColor)}
          />
        ))}
      </div>
    );
  }

  if (field.type === 'inline-group-with-icon') {
    return (
      <div className={field.className}>
        {field.items.map((subField: any, idx: number) => (
          <span key={idx} className={cn(subField.className, errorBgColor)}>
            {idx > 0 && field.separator}
            {renderField(subField, data, itemId, suggestedUpdates, isThumbnail)}
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
      return <span className={cn(field.className, errorBgColor)}>{`${start} - ${end}`}</span>;
    }

    if (duration.startDate && duration.ongoing) {
      const start = dayjs(duration.startDate).format('MMM YYYY');
      return <span className={cn(field.className, errorBgColor)}>{`${start} - Present`}</span>;
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
  return <span className={cn(field.className, errorBgColor)}>{text}</span>;
}

export function renderItemWithRows(
  template: any,
  item: any,
  itemId?: string,
  suggestedUpdates?: SuggestedUpdates,
  isThumbnail?: boolean,
): React.ReactNode {
  return template.rows.map((row: any, rowIdx: number) => (
    <div key={rowIdx} className={row.className}>
      {row.cells.map((cell: any, cellIdx: number) => (
        <div key={cellIdx}>{renderField(cell, item, itemId, suggestedUpdates, isThumbnail)}</div>
      ))}
    </div>
  ));
}

export function renderItemWithFields(
  template: any,
  item: any,
  itemId?: string,
  suggestedUpdates?: SuggestedUpdates,
  isThumbnail?: boolean,
): React.ReactNode {
  return template.fields.map((field: any, idx: number) => (
    <div key={idx}>{renderField(field, item, itemId, suggestedUpdates, isThumbnail)}</div>
  ));
}
