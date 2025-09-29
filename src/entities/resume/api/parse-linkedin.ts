import { fetch } from '@shared/api';
import { useMutation } from '@tanstack/react-query';
import type { ParseLinkedInResponse } from '../types';

export async function parseLinkedInProfile(url: string): Promise<ParseLinkedInResponse> {
  try {
    const encodedUrl = encodeURIComponent(url);
    const response = await fetch<ParseLinkedInResponse>(`resume/parse-linkedin?url=${encodedUrl}`);
    return response;
  } catch (error) {
    console.error('Error parsing LinkedIn profile:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to parse LinkedIn profile. Please try again.');
  }
}
