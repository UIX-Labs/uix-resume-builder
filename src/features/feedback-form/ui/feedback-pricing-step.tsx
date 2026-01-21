import { RadioGroup, RadioGroupItem } from '@shared/ui/radio-group';
import { FeedbackActionButtons } from './feedback-action-buttons';

interface PricingOption {
  id: string;
  label: string;
}

interface FeedbackPricingStepProps {
  pricingOptions: PricingOption[];
  selectedOption: string;
  onOptionChange: (value: string) => void;
  onSkip: () => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export function FeedbackPricingStep({
  pricingOptions,
  selectedOption,
  onOptionChange,
  onSkip,
  onSubmit,
  isLoading,
}: FeedbackPricingStepProps) {
  return (
    <>
      <div className="flex-1 flex flex-col justify-start items-center text-center space-y-8 px-4">
        <h3 className="text-3xl font-bold text-black">What would you expect to pay for a tool like this?</h3>

        <RadioGroup value={selectedOption} onValueChange={onOptionChange} className="space-y-3 mx-auto w-fit">
          {pricingOptions.map((option) => (
            <label
              key={option.id}
              htmlFor={option.id}
              className={`flex items-center gap-4 cursor-pointer ${
                selectedOption === option.id ? 'border-blue-600' : 'border-black hover:bg-gray-50'
              }`}
            >
              <RadioGroupItem value={option.id} className="border-black cursor-pointer" />
              <span className="text-gray-900 font-medium text-left flex-1">{option.label}</span>
            </label>
          ))}
        </RadioGroup>
      </div>

      <FeedbackActionButtons
        onSkip={onSkip}
        onNext={onSubmit}
        nextLabel="Submit"
        isLoading={isLoading}
        disabled={!selectedOption || isLoading}
      />
    </>
  );
}
