export interface ResumeData extends Record<ResumeDataKey, any> {
  experience: {
    id: string;
    title: string;
    items: Array<{
      id: string;
      company: string;
      position: string;
      location: string;
      startDate: string;
      endDate: string;
      ongoing: boolean;
      link: { title: string; link: string };
      description: string;
    }>;
    suggestedUpdates?: SuggestedUpdates;
  };

  skills: {
    id: string;
    title: string;
    items: Array<{
      id: string;
      category: string;
      level: string;
      name: string;
    }>;
    suggestedUpdates?: SuggestedUpdates;
  };

  projects: {
    id: string;
    title: string;
    items: Array<{
      id: string;
      title: string;
      techStack: string[];
      startDate: string;
      endDate: string;
      ongoing: boolean;
      link: { title: string; link: string };
      description: string;
    }>;
    suggestedUpdates?: SuggestedUpdates;
  };

  personalDetails: {
    id: string;
    title: string;
    items: Array<{
      id: string;
      profilePicturePublicUrl?: string;
      jobTitle: string;
      fullName: string;
      email: string;
      phone: string;
      address: string;
      links: {
        linkedin: { title: string; link: string };
        github: { title: string; link: string };
        behance: { title: string; link: string };
        dribble: { title: string; link: string };
        website: { title: string; link: string };
        youtube: { title: string; link: string };
      };
    }>;
    suggestedUpdates?: SuggestedUpdates;
  };

  professionalSummary: {
    id: string;
    title: string;
    items: Array<{
      id: string;
      summary: string;
    }>;
    suggestedUpdates?: SuggestedUpdates;
  };

  education: {
    id: string;
    title: string;
    items: Array<{
      id: string;
      degree: string;
      institution: string;
      fieldOfStudy: string;
      startDate: string;
      endDate: string;
      grade: string;
      ongoing: boolean;
    }>;
    suggestedUpdates?: SuggestedUpdates;
  };

  certifications: {
    id: string;
    title: string;
    items: Array<{
      id: string;
      title: string;
      issuer: string;
      startDate: string;
      endDate: string;
      ongoing: boolean;
      link: { title: string; link: string };
    }>;
    suggestedUpdates?: SuggestedUpdates;
  };

  interests: {
    id: string;
    title: string;
    items: string[];
    suggestedUpdates?: SuggestedUpdates;
  };

  achievements: {
    id: string;
    title: string;
    items: string[];
    suggestedUpdates?: SuggestedUpdates;
  };

  templateId: string;
}

export type ResumeDataKey =
  | 'experience'
  | 'skills'
  | 'projects'
  | 'personalDetails'
  | 'professionalSummary'
  | 'education'
  | 'certifications'
  | 'interests'
  | 'achievements';

export enum SuggestionType {
  SPELLING_ERROR = 'spelling_error',
  SENTENCE_REFINEMENT = 'sentence_refinement',
  NEW_SUMMARY = 'new_summary',
}

export interface SuggestedUpdateField {
  suggestedUpdates: {
    old?: string;
    new: string;
    type: SuggestionType.NEW_SUMMARY | SuggestionType.SPELLING_ERROR | SuggestionType.SENTENCE_REFINEMENT;
  }[];
  fieldCounts: {
    [SuggestionType.NEW_SUMMARY]: number;
    [SuggestionType.SPELLING_ERROR]: number;
    [SuggestionType.SENTENCE_REFINEMENT]: number;
  };
}

export interface SuggestedUpdate {
  itemId: string;
  fields: Record<string, SuggestedUpdateField>;
}

export type SuggestedUpdates = SuggestedUpdate[];
