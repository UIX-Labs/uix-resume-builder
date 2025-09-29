import type { ResumeData, ResumeDataKey } from '@entities/resume/types/resume-data';

const whiteList = [
  'id',
  'itemId',
  'city',
  'country',
  'state',
  'pincode',
  'templateId',
  'publicThumbnailUrl',
  'privateThumbnailUrl',
];

function calculateSectionWeight(value: any) {
  if (typeof value !== 'object') {
    return 1;
  }

  if (['string', 'number'].includes(typeof value)) {
    return 1;
  }

  return Object.keys(value).filter((key) => !whiteList.includes(key)).length;
}

function calculateItemWeight(value: any) {
  if (typeof value !== 'object') {
    return value ? 1 : 0;
  }

  return Object.entries(value).filter(([key, value]) => !whiteList.includes(key) && value).length;
}

export function calculateResumeCompletion(resumeData: ResumeData) {
  const { total, filled } = Object.entries(resumeData).reduce(
    (acc, cur) => {
      const key = cur[0] as ResumeDataKey;
      const value = cur[1] as ResumeData[ResumeDataKey];

      // if (key !== 'education') {
      //   return acc;
      // }

      if (whiteList.includes(key)) return acc;
      const firstItem = value.items[0];

      acc.total += calculateSectionWeight(firstItem);
      acc.filled += calculateItemWeight(firstItem);

      return acc;
    },
    { total: 0, filled: 0 },
  );

  return (filled / total) * 100;
}
