import { fetch } from '@shared/api';

export interface ResumeReviewItemDto {
  resumeId: string;
  name: string;
  status: string;
  reviewer: string;
  submitted: string;
  lastModified: string;
}

export interface ResumeReviewsResponseDto {
  reviews: ResumeReviewItemDto[];
}

export async function fetchReviewStats(): Promise<ResumeReviewsResponseDto> {
  return fetch<ResumeReviewsResponseDto>('resume/review-stats', {
    options: {
      method: 'GET',
    },
  });
}
