import React from 'react';
import { cn } from '@shared/lib/cn';
import { resolvePath } from '../resolve-path';
import { SparkleIndicator } from '../components/SparkleIndicator';
import { hasPendingSuggestions } from '../section-utils';
import { renderField } from '../field-renderer';
import { getFieldSuggestions, getSuggestionBackgroundColor } from '@features/template-form/lib/get-field-errors';

export function renderHeaderSection(
  section: any,
  data: any,
  currentSection?: string,
  hasSuggestions?: boolean,
  isThumbnail?: boolean,
): React.ReactNode {
  const { fields, className, id } = section;

  const hasGenericFields = Object.values(fields).some(
    (field: any) => field?.type && ['image', 'group', 'text'].includes(field.type),
  );

  const sectionId = id || 'header-section';

  // Check for suggestions in both personalDetails and professionalSummary (merged logic)
  const personalDetailsSuggestions = data['personalDetails']?.suggestedUpdates;
  const professionalSummarySuggestions = data['professionalSummary']?.suggestedUpdates;
  const hasValidPersonalDetailsSuggestions = hasPendingSuggestions(personalDetailsSuggestions);
  const hasValidSummarySuggestions = hasPendingSuggestions(professionalSummarySuggestions);
  const hasValidSuggestions = hasValidPersonalDetailsSuggestions || hasValidSummarySuggestions;

  // Get itemId for personalDetails (typically the first item)
  const personalDetailsItem = data['personalDetails']?.items?.[0];
  const personalDetailsItemId = personalDetailsItem?.itemId || personalDetailsItem?.id;

  // Helper function to get error background color for a field
  // const getFieldErrorBgColor = (fieldName: string): string => {
  //   if (isThumbnail) return '';
  //   const suggestions = getFieldSuggestions(personalDetailsSuggestions, personalDetailsItemId, fieldName);
  //   return getSuggestionBackgroundColor(suggestions);
  // };

  const isHeader = sectionId.toLowerCase() === 'header' || sectionId.toLowerCase() === 'header-section';
  const isActive = currentSection && sectionId.toLowerCase() === currentSection.toLowerCase();

  // Highlight header when personalDetails OR summary is selected (merged sections)
  const currentSectionLower = currentSection?.toLowerCase();
  const isMergedSectionActive =
    isHeader &&
    (currentSectionLower === 'personaldetails' ||
      currentSectionLower === 'summary' ||
      currentSectionLower === 'header' ||
      currentSectionLower === 'header-section');

  const shouldBlur =
    !isThumbnail && hasSuggestions && currentSection && !isActive && !isMergedSectionActive && hasValidSuggestions;
  const shouldHighlight = !isThumbnail && hasSuggestions && (isActive || isMergedSectionActive) && hasValidSuggestions;

  const wrapperStyle: React.CSSProperties = {
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
  };

  if (hasGenericFields) {
    return (
      <div
        className={cn(className, shouldBlur && 'blur-[2px] pointer-events-none')}
        data-section={sectionId}
        style={wrapperStyle}
      >
        {/* {shouldHighlight && <SparkleIndicator />} */}
        {Object.keys(fields).map((key) => (
          <React.Fragment key={key}>
            {renderField(fields[key], data, personalDetailsItemId, personalDetailsSuggestions, isThumbnail)}
          </React.Fragment>
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(className, shouldBlur && 'blur-[2px] pointer-events-none')}
      data-section={sectionId}
      style={wrapperStyle}
    >
      {/* {shouldHighlight && <SparkleIndicator />} */}
      {fields.nameTitle ? (
        <div className={fields.nameTitle.className}>
          {fields.name && (
            <p className={cn(fields.name.className /*, getFieldErrorBgColor('fullName')*/)}>
              {resolvePath(data, fields.name.path, fields.name.fallback)}
            </p>
          )}
          {fields.title?.path && (
            <p className={cn(fields.title.className /*, getFieldErrorBgColor('jobTitle')*/)}>
              {resolvePath(data, fields.title.path)}
            </p>
          )}
          {fields.description?.path && (
            <div
              className={cn(fields.description.className /*, getFieldErrorBgColor('description')*/)}
              dangerouslySetInnerHTML={{
                __html: resolvePath(data, fields.description.path, fields.description.fallback) || '',
              }}
            />
          )}
        </div>
      ) : (
        <>
          {fields.name && (
            <p className={cn(fields.name.className /*, getFieldErrorBgColor('fullName')*/)}>
              {resolvePath(data, fields.name.path, fields.name.fallback)}
            </p>
          )}
          {fields.title?.path && (
            <p className={cn(fields.title.className /*, getFieldErrorBgColor('jobTitle')*/)}>
              {resolvePath(data, fields.title.path)}
            </p>
          )}
          {fields.description?.path && (
            <div
              className={cn(fields.description.className /*, getFieldErrorBgColor('description')*/)}
              dangerouslySetInnerHTML={{
                __html: resolvePath(data, fields.description.path, fields.description.fallback) || '',
              }}
            />
          )}
        </>
      )}

      {fields.contact && fields.contact.type === 'contact-grid' && (
        <>{renderField(fields.contact, data, personalDetailsItemId, personalDetailsSuggestions, isThumbnail)}</>
      )}

      {fields.contact?.items && (
        <div className={fields.contact.className}>
          {(() => {
            const validItems = fields.contact.items
              .map((item: any, idx: number) => {
                const value = resolvePath(data, item.path, item.fallback);
                if (!value) return null;
                // Extract field name from path for error highlighting (e.g., "personalDetails.items[0].email" -> "email")
                const fieldName = item.path?.split('.').pop() || '';
                return { item, value, originalIdx: idx, fieldName };
              })
              .filter((entry: any) => entry !== null);
            return validItems.map((entry: any, arrayIdx: number) => {
              const { item, value, originalIdx, fieldName } = entry;
              const showSeparator = arrayIdx > 0 && fields.contact.separator;
              // const errorBgColor = getFieldErrorBgColor(fieldName);
              if (item.type === 'link') {
                const href = item.href.startsWith('mailto:')
                  ? item.href.replace('{{value}}', value)
                  : resolvePath(data, item.href);
                const linkProps = item.href.startsWith('mailto:')
                  ? {}
                  : { target: '_blank', rel: 'noopener noreferrer' };
                return (
                  <span key={originalIdx}>
                    {showSeparator && fields.contact.separator}
                    <a href={href} className={cn(item.className /*, errorBgColor*/)} {...linkProps}>
                      {value}
                    </a>
                  </span>
                );
              }
              return (
                <span key={originalIdx}>
                  {showSeparator && fields.contact.separator}
                  <span className={cn(item.className /*, errorBgColor*/)}>{value}</span>
                </span>
              );
            });
          })()}
        </div>
      )}

      {fields.address && (
        <p className={cn(fields.address.className /*, getFieldErrorBgColor('address')*/)}>
          {resolvePath(data, fields.address.path, fields.address.fallback)}
        </p>
      )}
    </div>
  );
}
