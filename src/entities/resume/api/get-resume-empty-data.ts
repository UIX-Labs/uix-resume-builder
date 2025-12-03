import { fetch } from '@shared/api';
import type { ResumeData } from '../types/resume-data';

export async function getResumeEmptyData() {
  const res = await fetch<Omit<ResumeData, 'templateId'>>(`resume/schema`);

  console.log('Empty resume data:', res);

  return res;
}
