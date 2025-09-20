import { fetch } from '@shared/api';
import { useMutation } from '@tanstack/react-query';

export interface ParseLinkedInResponse {
  message: string;
  resumeId: string;
}

export async function parseLinkedInProfile(url: string): Promise<ParseLinkedInResponse> {
  try {
    const encodedUrl = encodeURIComponent(url);
    const response = await fetch<ParseLinkedInResponse>(`resume/parse-linkedin?url=${encodedUrl}`);
    return response;
  } catch (error) {
    console.error('Error parsing LinkedIn profile:', error);
    throw new Error(
      error instanceof Error 
        ? error.message 
        : 'Failed to parse LinkedIn profile. Please try again.'
    );
  }
}

export const useParseLinkedInProfile = () => {
  return useMutation<ParseLinkedInResponse, Error, string>({
    mutationFn: (url: string) => parseLinkedInProfile(url),
    onError: (error) => {
      console.error('LinkedIn profile parsing failed:', error);
    },
    onSuccess: (data) => {
      console.log('LinkedIn profile parsed successfully:', data);
    },
  });
};