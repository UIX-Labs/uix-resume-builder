import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetch } from '@shared/api';

export interface ParsePdfResponse {
  message: string;
  resumeId: string;
}

export async function parsePdfResume(file: File): Promise<ParsePdfResponse> {
  try {
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      throw new Error(`File size (${(file.size / 1024 / 1024).toFixed(2)}MB) exceeds the maximum limit of 10MB.`);
    }

    const formData = new FormData();
    formData.append('file', file);

    const data = await fetch<ParsePdfResponse>('resume/parse-pdf', {
      options: {
        method: 'POST',
        body: formData,
        headers: {},
        credentials: 'include',
      },
    });

    return data;
  } catch (error) {
    console.error('Error parsing PDF resume:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to parse PDF resume. Please try again.');
  }
}

export const useParsePdfResume = () => {
  const queryClient = useQueryClient();

  return useMutation<ParsePdfResponse, Error, File>({
    mutationFn: (file: File) => parsePdfResume(file),
    onError: (error) => {
      console.error('PDF resume parsing failed:', error);
    },
    onSuccess: (data) => {
      console.log('PDF resume parsed successfully:', data);
      queryClient.invalidateQueries({ queryKey: ['resumes'] });
    },
  });
};
