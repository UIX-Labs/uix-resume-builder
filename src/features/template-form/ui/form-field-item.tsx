import { cn } from '@shared/lib/cn';
import type { SuggestedUpdates } from '@entities/resume';
import { getFieldErrors } from '../lib/get-field-errors';
import { FieldErrorBadges } from './error-badges';

interface FormFieldItemProps {
  itemId: string;
  fieldKey: string;
  fieldValue: any;
  section: any;
  isMobile?: boolean;
  suggestedUpdates?: SuggestedUpdates;
  onOpenAnalyzerModal?: (itemId: string, fieldName: string, suggestionType: any) => void;
  renderInput: () => React.ReactNode;
}

export function FormFieldItem({
  itemId,
  fieldKey,
  fieldValue,
  section,
  isMobile = false,
  suggestedUpdates,
  onOpenAnalyzerModal,
  renderInput,
}: FormFieldItemProps) {
  const errorCounts = getFieldErrors(suggestedUpdates, itemId, fieldKey);

  const hasBadges = errorCounts.spellingCount > 0 || errorCounts.sentenceCount > 0 || errorCounts.newSummaryCount > 0;

  const errorBadges = hasBadges && (
    <FieldErrorBadges
      spellingCount={errorCounts.spellingCount}
      sentenceCount={errorCounts.sentenceCount}
      newSummaryCount={errorCounts.newSummaryCount}
      onBadgeClick={(suggestionType) => onOpenAnalyzerModal?.(itemId, fieldKey, suggestionType)}
    />
  );

  if (isMobile) {
    return (
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label htmlFor={fieldKey} className="text-[14px] font-semibold text-[#111827]">
            {section.label}
          </label>
          {errorBadges}
        </div>
        {renderInput()}
      </div>
    );
  }

  return (
    <label
      className={cn(
        'flex flex-col gap-2 w-full min-w-0',
        section.fluid && 'col-span-1 md:col-span-2',
        !section.fluid && hasBadges && 'col-span-1 md:col-span-2',
      )}
      htmlFor={fieldKey}
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 w-full min-w-0">
        <span className="text-sm text-[#0C1118] font-semibold flex-shrink-0">{section.label}</span>
        <div>{errorBadges}</div>
      </div>
      {renderInput()}
    </label>
  );
}
