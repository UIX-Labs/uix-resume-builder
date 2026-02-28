import type { ResumeData, ResumeDataKey } from '@entities/resume';
import { useResumeStore } from '../stores/resume-store';

/**
 * Computes completion percentage per section — derived during render, no useEffect.
 */
export function useSectionCompletion(): Record<ResumeDataKey, number> {
  const data = useResumeStore((s) => s.data);

  if (!data) {
    return {
      personalDetails: 0,
      professionalSummary: 0,
      experience: 0,
      education: 0,
      skills: 0,
      projects: 0,
      certifications: 0,
      interests: 0,
      achievements: 0,
    };
  }

  return {
    personalDetails: computePersonalDetailsCompletion(data),
    professionalSummary: data.professionalSummary?.items?.[0]?.summary ? 100 : 0,
    experience: computeArrayCompletion(data.experience?.items, ['company', 'position']),
    education: computeArrayCompletion(data.education?.items, ['degree', 'institution']),
    skills: data.skills?.items?.length ? 100 : 0,
    projects: computeArrayCompletion(data.projects?.items, ['title']),
    certifications: computeArrayCompletion(data.certifications?.items, ['title']),
    interests: data.interests?.items?.length ? 100 : 0,
    achievements: data.achievements?.items?.length ? 100 : 0,
  };
}

function computePersonalDetailsCompletion(data: ResumeData): number {
  const pd = data.personalDetails?.items?.[0];
  if (!pd) return 0;

  const fields = [pd.fullName, pd.email, pd.jobTitle, pd.phone];
  const filled = fields.filter(Boolean).length;
  return Math.round((filled / fields.length) * 100);
}

function computeArrayCompletion(
  items: Array<Record<string, unknown>> | undefined,
  requiredFields: string[],
): number {
  if (!items?.length) return 0;

  let totalFields = 0;
  let filledFields = 0;

  for (const item of items) {
    for (const field of requiredFields) {
      totalFields++;
      if (item[field]) filledFields++;
    }
  }

  return totalFields === 0 ? 0 : Math.round((filledFields / totalFields) * 100);
}
