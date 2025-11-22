import { fetch } from '@shared/api';
import type { UpdateResumeAnalyzer } from '../types/update-resume-analyzer';

export async function updateResumeByAnalyzer(file?: File, resumeId?: string): Promise<UpdateResumeAnalyzer> {
  try {
    const maxSize = 10 * 1024 * 1024;
    if (file && file.size > maxSize) {
      throw new Error(`File size (${(file.size / 1024 / 1024).toFixed(2)}MB) exceeds the maximum limit of 10MB.`);
    }

    const formData = new FormData();
    if (file) {
      formData.append('resume', file);
    }
    if (resumeId) {
      formData.append('resumeId', resumeId);
    }

    const data = await fetch<UpdateResumeAnalyzer>('resume/analyzer', {
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

export async function updateResumeByAnalyzerWithResumeId(resumeId: string): Promise<UpdateResumeAnalyzer> {
  try {
    const data = await fetch<UpdateResumeAnalyzer>('resume/analyzer2', {
      options: {
        method: 'POST',
        body: JSON.stringify({ resumeId }),
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
