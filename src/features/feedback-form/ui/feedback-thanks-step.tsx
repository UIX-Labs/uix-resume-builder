import { Button } from '@shared/ui/button';
import Image from 'next/image';

interface FeedbackThanksStepProps {
  onComplete?: () => void;
  onOpenChange: (open: boolean) => void;
}

export function FeedbackThanksStep({ onComplete, onOpenChange }: FeedbackThanksStepProps) {
  return (
    <div className="flex-1 flex flex-col justify-center items-center text-center space-y-8">
      <div className="relative">
        <div className="size-50 rounded-full bg-white flex items-center justify-center">
          <Image
            src="/images/thanks.svg"
            alt=""
            aria-hidden
            width={230}
            height={230}
            className=" text-blue-600 animate-in zoom-in duration-700"
          />
        </div>
      </div>

      <div className="space-y-3 animate-in fade-in duration-500 delay-300">
        <h3 className="text-4xl font-bold text-gray-900">THANKS!</h3>
        <p className="text-lg text-gray-600">Your feedback helps us make better resumes.</p>
      </div>

      <Button
        className="w-full max-w-xs h-12 text-base bg-blue-600 hover:bg-blue-700 shadow-blue-200 shadow-lg animate-in fade-in duration-500 delay-500"
        onClick={() => {
          onComplete?.();
          onOpenChange(false);
        }}
      >
        Done
      </Button>
    </div>
  );
}
