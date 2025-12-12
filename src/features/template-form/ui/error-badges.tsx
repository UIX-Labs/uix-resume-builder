import { SuggestionType } from "@entities/resume";
import { cn } from "@shared/lib/cn";

interface ErrorBadgeProps {
  count: number;
  type: SuggestionType;
  className?: string;
  onClick?: (type: SuggestionType) => void;
}

export function ErrorBadge({
  count,
  type,
  className,
  onClick,
}: ErrorBadgeProps) {
  if (count === 0) return null;

  const badges = {
    [SuggestionType.SPELLING_ERROR]: {
      label: `Spelling Error : ${count}`,
      bgColor: "bg-[#D97706]",
      textColor: "text-white",
      icon: "✦",
    },
    [SuggestionType.SENTENCE_REFINEMENT]: {
      label: `Weak Sentence : ${count}`,
      bgColor: "bg-[#DC2626]",
      textColor: "text-white",
      icon: "✦",
    },
    [SuggestionType.NEW_SUMMARY]: {
      label: `New Points : ${count}`,
      bgColor: "bg-[#10B981]",
      textColor: "text-white",
      icon: "✦",
    },
  };

  const badge = badges[type];

  function handleClick() {
    onClick?.(type);
  }

  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center gap-1 px-2 sm:px-3 py-1 rounded-md text-[10px] sm:text-xs font-semibold max-w-full",
        badge.bgColor,
        badge.textColor,
        className
      )}
      onClick={handleClick}
    >
      <span className="text-[8px] sm:text-[10px] flex-shrink-0">
        {badge.icon}
      </span>
      <span className="whitespace-nowrap">{badge.label}</span>
    </button>
  );
}

interface FieldErrorBadgesProps {
  spellingCount?: number;
  sentenceCount?: number;
  newSummaryCount?: number;
  className?: string;
  onBadgeClick?: (type: SuggestionType) => void;
}

export function FieldErrorBadges({
  spellingCount = 0,
  sentenceCount = 0,
  newSummaryCount = 0,
  className,
  onBadgeClick,
}: FieldErrorBadgesProps) {
  const hasErrors =
    spellingCount > 0 || sentenceCount > 0 || newSummaryCount > 0;

  if (!hasErrors) return null;

  return (
    <div className={cn("flex gap-1.5 sm:gap-2 flex-wrap min-w-0", className)}>
      <ErrorBadge
        count={spellingCount}
        type={SuggestionType.SPELLING_ERROR}
        onClick={onBadgeClick}
      />
      <ErrorBadge
        count={sentenceCount}
        type={SuggestionType.SENTENCE_REFINEMENT}
        onClick={onBadgeClick}
      />
      <ErrorBadge
        count={newSummaryCount}
        type={SuggestionType.NEW_SUMMARY}
        onClick={onBadgeClick}
      />
    </div>
  );
}
