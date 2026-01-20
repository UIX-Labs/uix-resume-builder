import { Button } from '@shared/ui/button';

interface FeedbackActionButtonsProps {
  onSkip: () => void;
  onNext: () => void;
  nextLabel?: string;
  disabled?: boolean;
  isLoading?: boolean;
}

export function FeedbackActionButtons({
  onSkip,
  onNext,
  nextLabel = 'Next',
  disabled = false,
  isLoading = false,
}: FeedbackActionButtonsProps) {
  return (
    <div className="flex gap-3 mt-auto pt-8">
      <Button
        variant="outline"
        className="flex-1 h-12 text-base border-2 border-[#257AFF] text-[#257AFF] hover:bg-blue-50 hover:text-blue-700"
        onClick={onSkip}
        disabled={isLoading}
      >
        Skip
      </Button>
      <Button
        className="flex-1 h-12 text-base bg-[#005FF2] hover:bg-blue-700 shadow-blue-200 shadow-lg"
        onClick={onNext}
        disabled={disabled || isLoading}
      >
        {isLoading ? 'Submitting...' : nextLabel}
      </Button>
    </div>
  );
}
