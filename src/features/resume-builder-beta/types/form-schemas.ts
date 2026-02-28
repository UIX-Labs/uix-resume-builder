import { z } from 'zod';

// ---------------------------------------------------------------------------
// Shared field schemas
// ---------------------------------------------------------------------------

const linkSchema = z.object({
  title: z.string(),
  link: z.string(),
});

// ---------------------------------------------------------------------------
// Personal Details
// ---------------------------------------------------------------------------

export const personalDetailsItemSchema = z.object({
  id: z.string(),
  profilePicturePublicUrl: z.string().optional(),
  jobTitle: z.string(),
  fullName: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email').or(z.literal('')),
  phone: z.string(),
  address: z.string(),
  links: z.object({
    linkedin: linkSchema,
    github: linkSchema,
    behance: linkSchema,
    dribble: linkSchema,
    website: linkSchema,
    youtube: linkSchema,
  }),
});

export const personalDetailsFormSchema = z.object({
  items: z.array(personalDetailsItemSchema).min(1),
});

export type PersonalDetailsFormValues = z.infer<
  typeof personalDetailsFormSchema
>;

// ---------------------------------------------------------------------------
// Professional Summary
// ---------------------------------------------------------------------------

export const professionalSummaryItemSchema = z.object({
  id: z.string(),
  summary: z.string(),
});

export const professionalSummaryFormSchema = z.object({
  items: z.array(professionalSummaryItemSchema).min(1),
});

export type ProfessionalSummaryFormValues = z.infer<
  typeof professionalSummaryFormSchema
>;

// ---------------------------------------------------------------------------
// Experience
// ---------------------------------------------------------------------------

export const experienceItemSchema = z.object({
  id: z.string(),
  company: z.string().min(1, 'Company is required'),
  position: z.string().min(1, 'Position is required'),
  location: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  ongoing: z.boolean(),
  description: z.string(),
  link: linkSchema,
});

export const experienceFormSchema = z.object({
  items: z.array(experienceItemSchema),
});

export type ExperienceFormValues = z.infer<typeof experienceFormSchema>;

// ---------------------------------------------------------------------------
// Education
// ---------------------------------------------------------------------------

export const educationItemSchema = z.object({
  id: z.string(),
  degree: z.string().min(1, 'Degree is required'),
  institution: z.string().min(1, 'Institution is required'),
  fieldOfStudy: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  grade: z.union([z.string(), z.object({ value: z.string() })]),
  ongoing: z.boolean(),
});

export const educationFormSchema = z.object({
  items: z.array(educationItemSchema),
});

export type EducationFormValues = z.infer<typeof educationFormSchema>;

// ---------------------------------------------------------------------------
// Skills
// ---------------------------------------------------------------------------

export const skillItemSchema = z.object({
  id: z.string(),
  category: z.string(),
  level: z.string(),
  name: z.string().min(1, 'Skill name is required'),
});

export const skillsFormSchema = z.object({
  items: z.array(skillItemSchema),
});

export type SkillsFormValues = z.infer<typeof skillsFormSchema>;

// ---------------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------------

export const projectItemSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Project title is required'),
  techStack: z.array(z.string()),
  startDate: z.string(),
  endDate: z.string(),
  ongoing: z.boolean(),
  description: z.string(),
  link: linkSchema,
});

export const projectsFormSchema = z.object({
  items: z.array(projectItemSchema),
});

export type ProjectsFormValues = z.infer<typeof projectsFormSchema>;

// ---------------------------------------------------------------------------
// Certifications
// ---------------------------------------------------------------------------

export const certificationItemSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Title is required'),
  issuer: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  ongoing: z.boolean(),
  link: linkSchema,
});

export const certificationsFormSchema = z.object({
  items: z.array(certificationItemSchema),
});

export type CertificationsFormValues = z.infer<
  typeof certificationsFormSchema
>;

// ---------------------------------------------------------------------------
// Interests (string array)
// ---------------------------------------------------------------------------

export const interestsFormSchema = z.object({
  items: z.array(z.string()),
});

export type InterestsFormValues = z.infer<typeof interestsFormSchema>;

// ---------------------------------------------------------------------------
// Achievements (string array)
// ---------------------------------------------------------------------------

export const achievementsFormSchema = z.object({
  items: z.array(z.string()),
});

export type AchievementsFormValues = z.infer<typeof achievementsFormSchema>;
