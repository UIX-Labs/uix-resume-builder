import { fetch } from '@shared/api';
import type { CreateResumeResponse } from '../types';

export async function createResume(data: {
  title: string;
  userInfo: {
    userId: string;
  };
  templateId: string;
}) {
  const res = await fetch<CreateResumeResponse>('resume/create', {
    options: {
      method: 'POST',
      body: JSON.stringify(data),
    },
  });

  return res;
}
