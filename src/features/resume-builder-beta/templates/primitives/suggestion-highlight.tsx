import { cn } from '@shared/lib/utils';
import { SuggestionType } from '@entities/resume/types/resume-data';

interface SuggestionHighlightProps {
  children: React.ReactNode;
  type?: SuggestionType;
  suggestedText?: string;
  onAccept?: () => void;
  onDismiss?: () => void;
  className?: string;
}

const UNDERLINE_STYLES: Record<SuggestionType, string> = {
  [SuggestionType.SPELLING_ERROR]:
    'decoration-red-500 decoration-dotted underline decoration-2 underline-offset-2',
  [SuggestionType.SENTENCE_REFINEMENT]:
    'decoration-blue-500 decoration-wavy underline decoration-1 underline-offset-2',
  [SuggestionType.NEW_SUMMARY]:
    'decoration-green-500 decoration-dashed underline decoration-2 underline-offset-2',
};

export function SuggestionHighlight({
  children,
  type,
  suggestedText,
  onAccept,
  onDismiss,
  className,
}: SuggestionHighlightProps) {
  if (!type || !suggestedText) {
    return <>{children}</>;
  }

  return (
    <span
      className={cn('relative inline cursor-pointer group', UNDERLINE_STYLES[type], className)}
      data-suggestion-type={type}
    >
      {children}
      <span
        className={cn(
          'absolute left-0 top-full z-50 mt-1',
          'hidden group-hover:flex flex-col gap-1.5',
          'w-max max-w-xs p-2.5 rounded-lg shadow-lg',
          'bg-white border border-gray-200',
          'text-xs text-gray-700',
        )}
      >
        <span className="font-medium text-gray-900">Suggestion:</span>
        <span className="italic">{suggestedText}</span>
        <span className="flex gap-1.5 mt-1">
          <button
            type="button"
            onClick={onAccept}
            className="px-2 py-0.5 rounded bg-green-600 text-white text-[10px] font-medium hover:bg-green-700"
          >
            Accept
          </button>
          <button
            type="button"
            onClick={onDismiss}
            className="px-2 py-0.5 rounded bg-gray-100 text-gray-600 text-[10px] font-medium hover:bg-gray-200"
          >
            Dismiss
          </button>
        </span>
      </span>
    </span>
  );
}
