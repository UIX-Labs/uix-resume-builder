import { fetch } from '@shared/api';
import type { UpdateResumeTemplateResponse } from '../types/update-resume';

export interface UpdateResumeTemplateRequest {
  resumeId: string;
  templateId: string;
}

export const updateResumeTemplate = async ({
  resumeId,
  templateId,
}: UpdateResumeTemplateRequest): Promise<UpdateResumeTemplateResponse> => {
  const response = await fetch<UpdateResumeTemplateResponse>(`resume/${resumeId}`, {
    options: {
      method: 'PUT',
      body: JSON.stringify({
        templateId: templateId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    },
  });

  return response;
};
