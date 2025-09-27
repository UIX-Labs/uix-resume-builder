import type { ResumeData } from '../types/resume-data';

import { fetch } from '@shared/api';

export async function saveFormData<T extends keyof ResumeData>({
  type,
  data,
}: {
  type: T;
  data: ResumeData[T];
}): Promise<any> {
  let url = 'personal-details';

  if (type === 'education') {
    url = 'education';
  } else if (type === 'experience') {
    url = 'experience';
  } else if (type === 'skills') {
    url = 'skills';
  } else if (type === 'projects') {
    url = 'projects';
  } else if (type === 'certifications') {
    url = 'certifications';
  } else if (type === 'interests') {
    url = 'interests';
  } else if (type === 'achievements') {
    url = 'achievements';
  }

  const res = await fetch(`${url}/${data.id}`, {
    options: {
      method: 'PUT',
      body: JSON.stringify(data),
    },
  });

  return res;
}
