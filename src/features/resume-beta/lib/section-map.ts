/**
 * Maps template section IDs to formData keys.
 * Used by suggestion handler when processing DOM-based clicks from the renderer.
 */
export const SECTION_TO_FORM_DATA_MAP: Record<string, string> = {
  personaldetails: 'personalDetails',
  'header-section': 'personalDetails',
  header: 'personalDetails',
  summary: 'professionalSummary',
  professionalsummary: 'professionalSummary',
  experience: 'experience',
  education: 'education',
  skills: 'skills',
  projects: 'projects',
  certifications: 'certifications',
  interests: 'interests',
  achievements: 'achievements',
};

/**
 * Maps form step names to template section IDs.
 * Used for scrolling the preview to the current section.
 */
export const STEP_TO_SECTION_MAP: Record<string, string> = {
  personalDetails: 'header',
  experience: 'experience',
  education: 'education',
  skills: 'skills',
  projects: 'projects',
  certifications: 'certifications',
  interests: 'interests',
  achievements: 'achievements',
  professionalSummary: 'summary',
};
