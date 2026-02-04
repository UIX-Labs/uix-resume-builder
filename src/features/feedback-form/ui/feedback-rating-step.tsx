import { RATING_MESSAGES } from '../constants';
import { FeedbackActionButtons } from './feedback-action-buttons';
import { StarRating } from './star-rating';

interface FeedbackRatingStepProps {
  rating: number;
  onRatingChange: (rating: number) => void;
  onSkip: () => void;
  onNext: () => void;
}

export function FeedbackRatingStep({ rating, onRatingChange, onSkip, onNext }: FeedbackRatingStepProps) {
  return (
    <>
      <div className="flex-1 flex flex-col items-center text-center space-y-10">
        <h3 className="text-3xl font-bold text-gray-900">How was your resume creation experience?</h3>

        <div className="space-y-6 mt-6">
          <StarRating value={rating} onChange={onRatingChange} className="justify-center gap-3" />

          {rating > 0 && (
            <p className="text-blue-600 font-medium text-lg animate-in fade-in duration-200">
              {RATING_MESSAGES[rating]}
            </p>
          )}
        </div>
      </div>

      <FeedbackActionButtons onSkip={onSkip} onNext={onNext} disabled={rating === 0} />
    </>
  );
}
