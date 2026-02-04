import { fetch } from '@shared/api';

export interface FeedbackQuestion {
  question: string;
  answer: string[];
}

export interface FeedbackData {
  rating: number;
  questions: FeedbackQuestion[];
  isSubmitted: boolean;
}

export interface SubmitFeedbackPayload {
  feedbacks: FeedbackData[];
}

export interface SubmitFeedbackResponse {
  message?: string;
}

export async function submitFeedback(data: SubmitFeedbackPayload) {
  const res = await fetch<SubmitFeedbackResponse>('monitoring/feedback', {
    options: {
      method: 'POST',
      body: JSON.stringify(data),
    },
  });

  return res;
}
