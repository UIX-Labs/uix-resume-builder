import { fetch } from '@shared/api';

import type { ResumeData } from '../types/resume-data';

export async function getResumeData(id: string) {
  const data = await fetch<ResumeData>(`resume/${id}`);

  return data;
}
