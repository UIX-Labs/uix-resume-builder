import { fetch } from '@shared/api';
import type { ParseLinkedInResponse } from '../types';

export async function parseLinkedInProfile(url: string,templateId?:string): Promise<ParseLinkedInResponse> {
  try {
    const encodedUrl = encodeURIComponent(url);
    let endpoint = `resume/parse-linkedin?url=${encodedUrl}`;
    if(templateId){
      endpoint += `&templateId=${templateId}`;
    }
    const response = await fetch<ParseLinkedInResponse>(endpoint);
    return response;
  } catch (error) {
    console.error('Error parsing LinkedIn profile:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to parse LinkedIn profile. Please try again.');
  }
}



