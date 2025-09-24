import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetch } from '@shared/api';

export interface DeleteResumeResponse {
  message: string;
}

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

export const useDeleteResume = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteResume,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resumes'] });
    },
    onError: (error) => {
      console.error('Failed to delete resume:', error);
    },
  });
};
