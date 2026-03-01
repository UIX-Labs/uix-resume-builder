import type { ResumeDataKey, SuggestedUpdates } from '@entities/resume';

// ---------------------------------------------------------------------------
// Shared sub-types
// ---------------------------------------------------------------------------

export interface LinkEntry {
  title: string;
  link: string;
}

export interface SocialLinks {
  linkedin: LinkEntry;
  github: LinkEntry;
  behance: LinkEntry;
  dribble: LinkEntry;
  website: LinkEntry;
  youtube: LinkEntry;
}

// ---------------------------------------------------------------------------
// Per-section item types
// ---------------------------------------------------------------------------

export interface PersonalDetailsItem {
  id: string;
  profilePicturePublicUrl?: string;
  jobTitle: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  links: SocialLinks;
}

export interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  ongoing: boolean;
  link: LinkEntry;
  description: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  grade: string | { value: string };
  ongoing: boolean;
}

export interface SkillItem {
  id: string;
  category: string;
  level: string;
  name: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  techStack: string[];
  startDate: string;
  endDate: string;
  ongoing: boolean;
  link: LinkEntry;
  description: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  startDate: string;
  endDate: string;
  ongoing: boolean;
  link: LinkEntry;
}

export interface SummaryItem {
  id: string;
  summary: string;
}

// ---------------------------------------------------------------------------
// Generic section wrappers
// ---------------------------------------------------------------------------

export interface ObjectSection<T> {
  id: string;
  title: string;
  items: T[];
  isHidden?: boolean;
  suggestedUpdates?: SuggestedUpdates;
}

export interface StringSection {
  id: string;
  title: string;
  items: string[];
  isHidden?: boolean;
  suggestedUpdates?: SuggestedUpdates;
}

// ---------------------------------------------------------------------------
// Section map: ResumeDataKey → typed section
// ---------------------------------------------------------------------------

export interface ResumeSectionMap {
  personalDetails: ObjectSection<PersonalDetailsItem>;
  experience: ObjectSection<ExperienceItem>;
  education: ObjectSection<EducationItem>;
  skills: ObjectSection<SkillItem>;
  projects: ObjectSection<ProjectItem>;
  certifications: ObjectSection<CertificationItem>;
  professionalSummary: ObjectSection<SummaryItem>;
  interests: StringSection;
  achievements: StringSection;
}

// ---------------------------------------------------------------------------
// ResumeFormData — typed replacement for Omit<ResumeData, 'templateId'>
// ---------------------------------------------------------------------------

export type ResumeFormData = ResumeSectionMap & {
  updatedAt?: string;
  template?: {
    id: string;
    name: string;
    json: Record<string, unknown>;
    previewImageUrl?: { url: string };
  };
};

// ---------------------------------------------------------------------------
// Type-safe accessors
// ---------------------------------------------------------------------------

/** Get the section type for a given key */
export type SectionData<K extends ResumeDataKey> = ResumeSectionMap[K];

/** Get the item type for a given section key */
export type SectionItem<K extends ResumeDataKey> = ResumeSectionMap[K] extends ObjectSection<infer T> ? T : string;

/** Union of all section types */
export type AnySection = ResumeSectionMap[ResumeDataKey];
