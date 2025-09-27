import { fetch } from '@shared/api';
import type { DeleteResumeResponse } from '../types';

export const deleteResume = async (resumeId: string): Promise<DeleteResumeResponse> => {
  if (!resumeId) {
    throw new Error('Resume ID is required');
  }

  const response = await fetch<DeleteResumeResponse>(`resume/${resumeId}`, {
    options: {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    },
  });

  return response;
};
