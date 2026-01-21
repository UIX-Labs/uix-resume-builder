import { useMutation } from '@tanstack/react-query';
import { submitFeedback, type SubmitFeedbackPayload, type SubmitFeedbackResponse } from './submit-feedback';

export const useSubmitFeedback = () => {
  return useMutation<SubmitFeedbackResponse, Error, SubmitFeedbackPayload>({
    mutationFn: submitFeedback,
    onError: (error) => {
      console.error('Failed to submit feedback:', error);
    },
  });
};
