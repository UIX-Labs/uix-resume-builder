import { useFetch } from '@/shared/api/hooks/useFetch';
import { useUserProfile } from '@shared/hooks/use-user';

import {
  deleteResume,
  fetchAllResumes,
  getResumeEmptyData,
  getResumeSchema,
  parseLinkedInProfile,
  parsePdfResume,
  saveFormData,
  updateResumeTemplate,
} from '../api';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchAndMergeResumeData } from '../lib/merge-resume-data';
import type { ResumeData, ResumeDataKey } from '../types/resume-data';

interface ParseLinkedInPayload {
  url: string;
  templateId?: string;
}

interface ParsePdfPayload {
  file: File;
  templateId?: string;
}

export function useTemplateFormSchema() {
  return useFetch({
    queryKey: ['resume-schema'],
    queryFn: getResumeSchema,
    staleTime: Infinity, // Cache forever since schema is static data
  });
}

export function useResumeData(id: string) {
  const { data: user } = useUserProfile();
  const isLoggedIn = user?.isLoggedIn ?? false;

  return useFetch({
    queryKey: ['resume-data', id, isLoggedIn],
    queryFn: () => fetchAndMergeResumeData(id, isLoggedIn),
  });
}

export function useResumeEmptyData() {
  return useFetch({
    queryKey: ['resume-empty-data'],
    queryFn: getResumeEmptyData,
  });
}

export const useDeleteResume = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteResume,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resumes'] });
    },
  });
};

export const useUpdateResumeTemplate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateResumeTemplate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resumes'] });
    },
  });
};

// export const useParseLinkedInProfile = () => {
//   return useMutation({
//     mutationFn: (url: string) => parseLinkedInProfile(url),

//   });
// };

export const useParseLinkedInProfile = () => {
  return useMutation({
    mutationFn: ({ url, templateId }: ParseLinkedInPayload) => parseLinkedInProfile(url, templateId),
  });
};

export const useGetAllResumes = () => {
  return useFetch({
    queryKey: ['resumes'],
    queryFn: () => fetchAllResumes(),
    staleTime: 0,
  });
};

export const useParsePdfResume = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ file, templateId }: ParsePdfPayload) => parsePdfResume(file, templateId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resumes'] });
    },
  });
};

export const useSaveResumeForm = () => {
  return useMutation({
    mutationFn: (data: { type: ResumeDataKey; data: ResumeData[ResumeDataKey] }) => saveFormData(data),
  });
};
