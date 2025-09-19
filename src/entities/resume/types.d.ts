import type { formDataValidator } from './lib/formDataValidator';
import type { formSchemaValidator } from './lib/formSchemaValidator';
import type { z } from 'zod';

export type FormSchema = z.infer<typeof formSchemaValidator>;
export type FormSection = FormSchema[number];
export type FormField = FormSection['fields'][number];
export type ResumeData = {
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

  templateId: string;
};

export type ResumeDataKey = keyof ResumeData;
