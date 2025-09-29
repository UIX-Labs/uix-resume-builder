import { useQuery } from '@tanstack/react-query';
import { fetch } from '@shared/api';

export interface ResumeItem {
  id: string;
  createdAt: string;
  updatedAt: string;
  deleted_at: string | null;
  resumeId: string;
  sectionType:
    | 'personal_info'
    | 'education'
    | 'skills'
    | 'experience'
    | 'projects'
    | 'certifications'
    | 'publications'
    | 'achievements'
    | 'interests';
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
  publicThumbnail?: { url: string; expiresAt: string } | null;
  privateThumbnailUrl?: string | null;
  items: ResumeItem[];
  template: any | null;
}

export type GetAllResumesResponse = Resume[];

export const fetchAllResumes = async (userId: string): Promise<GetAllResumesResponse> => {
  if (!userId) {
    throw new Error('User ID is required');
  }
  const response = await fetch<GetAllResumesResponse>(`resume/${userId}/getAll`, {
    options: {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    },
  });

  return response;
};

export const useGetAllResumes = (
  userId: string | null,
  options?: {
    enabled?: boolean;
    staleTime?: number;
    cacheTime?: number;
  },
) => {
  return useQuery({
    queryKey: ['resumes', userId],
    queryFn: () => fetchAllResumes(userId as string),
    staleTime: options?.staleTime ?? 5 * 60 * 1000,
  });
};
