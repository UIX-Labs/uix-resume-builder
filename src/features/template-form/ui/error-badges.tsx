import { SuggestionType } from '@entities/resume';
import { cn } from '@shared/lib/cn';

interface ErrorBadgeProps {
  count: number;
  type: SuggestionType;
  className?: string;
}

export function ErrorBadge({ count, type, className }: ErrorBadgeProps) {
  if (count === 0) return null;

  const badges = {
    [SuggestionType.SPELLING_ERROR]: {
      label: `Spelling Error : ${count}`,
      bgColor: 'bg-[#D97706]',
      textColor: 'text-white',
      icon: '✦',
    },
    [SuggestionType.SENTENCE_REFINEMENT]: {
      label: `Weak Sentence : ${count}`,
      bgColor: 'bg-[#DC2626]',
      textColor: 'text-white',
      icon: '✦',
    },
    [SuggestionType.NEW_SUMMARY]: {
      label: `New Points : ${count}`,
      bgColor: 'bg-[#10B981]',
      textColor: 'text-white',
      icon: '✦',
    },
  };

  const badge = badges[type];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-3 py-1 rounded-md text-xs font-semibold',
        badge.bgColor,
        badge.textColor,
        className,
      )}
    >
      <span className="text-[10px]">{badge.icon}</span>
      {badge.label}
    </span>
  );
}

interface FieldErrorBadgesProps {
  spellingCount?: number;
  sentenceCount?: number;
  newSummaryCount?: number;
  className?: string;
}

export function FieldErrorBadges({
  spellingCount = 0,
  sentenceCount = 0,
  newSummaryCount = 0,
  className,
}: FieldErrorBadgesProps) {
  const hasErrors = spellingCount > 0 || sentenceCount > 0 || newSummaryCount > 0;

  if (!hasErrors) return null;

  return (
    <div className={cn('flex gap-2 flex-wrap', className)}>
      <ErrorBadge count={spellingCount} type={SuggestionType.SPELLING_ERROR} />
      <ErrorBadge count={sentenceCount} type={SuggestionType.SENTENCE_REFINEMENT} />
      <ErrorBadge count={newSummaryCount} type={SuggestionType.NEW_SUMMARY} />
    </div>
  );
}
