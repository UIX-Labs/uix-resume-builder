import { Checkbox } from '@shared/ui/checkbox';
import { FeedbackActionButtons } from './feedback-action-buttons';

interface FeedbackOption {
  id: string;
  label: string;
}

interface FeedbackOptionsStepProps {
  title: string;
  options: FeedbackOption[];
  selectedOptions: string[];
  onToggleOption: (id: string) => void;
  onSkip: () => void;
  onNext: () => void;
}

export function FeedbackOptionsStep({
  title,
  options,
  selectedOptions,
  onToggleOption,
  onSkip,
  onNext,
}: FeedbackOptionsStepProps) {
  return (
    <>
      <div className="flex-1 flex flex-col justify-start items-center text-center space-y-10 px-4">
        <h3 className="text-3xl font-bold text-gray-900">{title}</h3>

        <div className="space-y-6 mx-auto w-fit">
          {options.map((option) => (
            <label key={option.id} htmlFor={option.id} className="flex items-center gap-4 cursor-pointer">
              <Checkbox
                id={option.id}
                checked={selectedOptions.includes(option.id)}
                onCheckedChange={() => onToggleOption(option.id)}
                className="border-black"
              />
              <span className="text-gray-700 font-medium">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      <FeedbackActionButtons onSkip={onSkip} onNext={onNext} disabled={selectedOptions.length === 0} />
    </>
  );
}
