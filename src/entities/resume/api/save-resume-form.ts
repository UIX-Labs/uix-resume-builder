import type { ResumeData, ResumeDataKey } from '../types/resume-data';

import { fetch } from '@shared/api';

export async function saveFormData<T extends ResumeDataKey>({ type, data }: { type: T; data: ResumeData[T] }) {
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

  let normalizedData = data;
  if (type === 'education' && (data as any).items) {
    normalizedData = {
      ...data,
      items: (data as any).items.map((item: any) => {
        if (item.grade && typeof item.grade === 'object' && 'value' in item.grade) {
          return {
            ...item,
            grade: typeof item.grade.value === 'string' ? item.grade.value : String(item.grade.value),
          };
        }
        return item;
      }),
    };
  }

  const res = await fetch(`${url}/${normalizedData.id}`, {
    options: {
      method: 'PUT',
      body: JSON.stringify(normalizedData),
    },
  });

  return res;
}
