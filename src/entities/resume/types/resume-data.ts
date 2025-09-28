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
      link: string;
      description: string;
    }>;
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
  };

  projects: {
    id: string;
    title: string;
    items: Array<{
      id: string;
      techStack: string[];
      startDate: string;
      endDate: string;
      ongoing: boolean;
      link: string;
      description: string;
    }>;
  };

  personalDetails: {
    id: string;
    title: string;
    items: Array<{
      id: string;
      title: string;
      fullName: string;
      email: string;
      phone: string;
      address: string;
      linkedin: string;
      github: string;
    }>;
  };

  professionalSummary: {
    id: string;
    title: string;
    items: Array<{
      id: string;
      summary: string;
    }>;
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
  };

  certifications: {
    id: string;
    title: string;
    items: Array<{
      id: string;
      title: string;
      issuer: string;
      ongoing: boolean;
    }>;
  };

  interests: {
    id: string;
    title: string;
    items: string[];
  };

  achievements: {
    id: string;
    title: string;
    items: string[];
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
