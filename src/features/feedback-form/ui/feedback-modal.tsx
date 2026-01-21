'use client';

import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

import { useSubmitFeedback } from '@entities/feedback-form/api/use-submit-feedback';
import { Button } from '@shared/ui/button';
import { Checkbox } from '@shared/ui/checkbox';
import { Dialog, DialogContent } from '@shared/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@shared/ui/radio-group';
import Image from 'next/image';
import { IMPROVEMENT_OPTIONS, POSITIVE_FEEDBACK_OPTIONS, PRICING_OPTIONS, RATING_MESSAGES } from '../constants';
import { FeedbackActionButtons } from './feedback-action-buttons';
import { FeedbackCarousel } from './feedback-carousel';
import { StarRating } from './star-rating';

interface FeedbackModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete?: () => void;
}

const getStepColor = (currentStep: 'rating' | 'feedback' | 'pricing' | 'thanks', stepNumber: number): string => {
  switch (stepNumber) {
    case 1:
      switch (currentStep) {
        case 'rating':
          return 'bg-blue-600';
        default:
          return 'bg-gray-300';
      }
    case 2:
      switch (currentStep) {
        case 'feedback':
          return 'bg-blue-600';
        case 'pricing':
          return 'bg-gray-300';
        default:
          return 'bg-[#CCD4DF]';
      }
    case 3:
      switch (currentStep) {
        case 'pricing':
          return 'bg-blue-600';
        default:
          return 'bg-[#CCD4DF]';
      }
    default:
      return 'bg-gray-300';
  }
};

export function FeedbackModal({ open, onOpenChange, onComplete }: FeedbackModalProps) {
  const [step, setStep] = useState<'rating' | 'feedback' | 'pricing' | 'thanks'>('rating');
  const [rating, setRating] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [pricingOption, setPricingOption] = useState<string>('');

  const { mutateAsync: submitFeedbackMutation, isPending: isSubmitting } = useSubmitFeedback();

  const resetForm = () => {
    setStep('rating');
    setRating(0);
    setSelectedOptions([]);
    setPricingOption('');
  };

  useEffect(() => {
    if (!open) {
      const timer = setTimeout(() => {
        resetForm();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [open]);

  const handleSubmit = async () => {
    try {
      const questions = [];

      const feedbackTitle = rating >= 3 ? 'What helped you the most today?' : 'What can we improve first?';
      if (selectedOptions.length > 0) {
        const feedbackOptions = rating >= 3 ? POSITIVE_FEEDBACK_OPTIONS : IMPROVEMENT_OPTIONS;
        const selectedLabels = selectedOptions
          .map((id) => feedbackOptions.find((opt) => opt.id === id)?.label)
          .filter(Boolean) as string[];

        questions.push({
          question: feedbackTitle,
          answer: selectedLabels,
        });
      }

      if (pricingOption) {
        const pricingLabel = PRICING_OPTIONS.find((opt) => opt.id === pricingOption)?.label || '';
        questions.push({
          question: 'What would you expect to pay for a tool like this?',
          answer: [pricingLabel],
        });
      }

      await submitFeedbackMutation({
        feedbacks: [
          {
            rating,
            questions,
            isSubmitted: true,
          },
        ],
      });

      setStep('thanks');
    } catch (error) {
      console.error('Failed to submit feedback:', error);
    }
  };

  const handleSkip = () => {
    if (step === 'rating') {
      onComplete?.();
      onOpenChange(false);
      return;
    }

    if (step === 'feedback') {
      setStep('pricing');
      return;
    }

    if (step === 'pricing') {
      handleSubmit();
    }
  };

  const hasFeedbackData = rating > 0 || selectedOptions.length > 0 || Boolean(pricingOption);

  const handleClose = () => {
    if (isSubmitting) return;

    if (!hasFeedbackData) {
      onComplete?.();
      onOpenChange(false);
      return;
    }

    handleSubmit().finally(() => {
      onComplete?.();
      onOpenChange(false);
    });
  };

  const handleRatingNext = () => {
    if (rating > 0) {
      setStep('feedback');
    }
  };

  const handleFeedbackNext = () => {
    setStep('pricing');
  };

  const toggleOption = (id: string) => {
    setSelectedOptions((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const feedbackOptions = rating >= 3 ? POSITIVE_FEEDBACK_OPTIONS : IMPROVEMENT_OPTIONS;
  const feedbackTitle = rating >= 3 ? 'What helped you the most today?' : 'What can we improve first?';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="p-0 gap-0 overflow-hidden border-none rounded-[36px] md:max-w-[1035px]"
        style={{ boxShadow: '0 4px 50px 0 rgba(0, 0, 0, 0.19)' }}
        showCloseButton={false}
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <div className="grid md:grid-cols-[0.40fr_0.60fr] min-h-[600px]">
          <div className="bg-[#1C5DB5] p-6 flex flex-col justify-between text-white relative overflow-hidden">
            <Image
              src="/images/feedback-bg.svg"
              alt=""
              aria-hidden
              width={50}
              height={50}
              priority={false}
              className="absolute -top-1 right-0 pointer-events-none select-none"
            />

            <Image
              src="/images/feedback-bg.svg"
              alt=""
              aria-hidden
              width={100}
              height={50}
              priority={false}
              className="absolute
    -bottom-20
    left-10
    pointer-events-none
    select-none rotate-90 z-50"
            />

            <div className="space-y-14 relative z-10">
              <div className="inline-flex items-center text-[#1D3F6D] gap-2 bg-[#F8F8F8] backdrop-blur-sm px-4 py-1.5 rounded-full text-2xl font-medium border border-white/10">
                <Image src="/images/checkmark.svg" alt="" aria-hidden width={28} height={28} />
                Feedback
              </div>

              <div className="space-y-3">
                <h2 className="text-2xl font-semibold leading-tight">
                  We're doing a quick final check and saving your resume in a downloadable format.
                </h2>
                <p className="text-blue-100 text-base leading-relaxed">
                  While that's happening, could you spare 10 seconds to share your experience?
                </p>
              </div>
            </div>

            <div className="">
              <FeedbackCarousel />
            </div>
          </div>

          <div className="bg-[#F8F8F8] p-8 md:p-10 flex flex-col relative">
            <button
              type="button"
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <X className="size-6" />
            </button>

            {step !== 'thanks' && (
              <div className="flex gap-2 mb-12 mt-2 px-4">
                <div className={`h-1 flex-1 rounded-[20px] transition-colors ${getStepColor(step, 1)}`} />
                <div className={`h-1 flex-1 rounded-[20px] transition-colors ${getStepColor(step, 2)}`} />
                <div className={`h-1 flex-1 rounded-[20px] transition-colors ${getStepColor(step, 3)}`} />
              </div>
            )}

            {step === 'thanks' ? (
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
            ) : step === 'rating' ? (
              <>
                <div className="flex-1 flex flex-col items-center text-center space-y-10">
                  <h3 className="text-3xl font-bold text-gray-900">How was your resume creation experience?</h3>

                  <div className="space-y-6 mt-6">
                    <StarRating value={rating} onChange={setRating} className="justify-center gap-3" />

                    {rating > 0 && (
                      <p className="text-blue-600 font-medium text-lg animate-in fade-in duration-200">
                        {RATING_MESSAGES[rating]}
                      </p>
                    )}
                  </div>
                </div>

                <FeedbackActionButtons onSkip={handleSkip} onNext={handleRatingNext} disabled={rating === 0} />
              </>
            ) : step === 'feedback' ? (
              <>
                <div className="flex-1 flex flex-col justify-start items-center text-center space-y-10 px-4">
                  <h3 className="text-3xl font-bold text-gray-900">{feedbackTitle}</h3>

                  <div className="space-y-6 mx-auto w-fit">
                    {feedbackOptions.map((option) => (
                      <label key={option.id} htmlFor={option.id} className="flex items-center gap-4 cursor-pointer">
                        <Checkbox
                          id={option.id}
                          checked={selectedOptions.includes(option.id)}
                          onCheckedChange={() => toggleOption(option.id)}
                          className="border-black"
                        />
                        <span className="text-gray-700 font-medium">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <FeedbackActionButtons
                  onSkip={handleSkip}
                  onNext={handleFeedbackNext}
                  disabled={selectedOptions.length === 0}
                />
              </>
            ) : (
              <>
                <div className="flex-1 flex flex-col justify-start items-center text-center space-y-8 px-4">
                  <h3 className="text-3xl font-bold text-black">What would you expect to pay for a tool like this?</h3>

                  <RadioGroup
                    value={pricingOption}
                    onValueChange={setPricingOption}
                    className="space-y-3 mx-auto w-fit"
                  >
                    {PRICING_OPTIONS.map((option) => (
                      <label
                        key={option.id}
                        htmlFor={option.id}
                        className={`flex items-center gap-4 cursor-pointer ${
                          pricingOption === option.id ? 'border-blue-600' : 'border-black hover:bg-gray-50'
                        }`}
                      >
                        <RadioGroupItem value={option.id} className="border-black cursor-pointer" />
                        <span className="text-gray-900 font-medium text-left flex-1">{option.label}</span>
                      </label>
                    ))}
                  </RadioGroup>
                </div>

                <FeedbackActionButtons
                  onSkip={handleSkip}
                  onNext={handleSubmit}
                  nextLabel="Submit"
                  isLoading={isSubmitting}
                  disabled={!pricingOption || isSubmitting}
                />
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
