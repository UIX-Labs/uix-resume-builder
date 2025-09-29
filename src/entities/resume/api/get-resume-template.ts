import { fetch } from '@shared/api';

export async function getResumeTemplate(id: string) {
  const data = await fetch<JSON>(`template/${id}`);

  return data;
}
