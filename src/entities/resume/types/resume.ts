import type { ResumeDataKey } from './resume-data';

export interface ResumeItem {
  id: string;
  createdAt: string;
  updatedAt: string;
  deleted_at: string | null;
  resumeId: string;
  sectionType: ResumeDataKey;
  sectionId: string;
  rank: number;
}

export interface Resume {
  id: string;
  createdAt: string;
  updatedAt: string;
  deleted_at: string | null;
  userId: string;
  templateId: string | null;
  title: string;
  items: ResumeItem[];
  template: any | null;
}
