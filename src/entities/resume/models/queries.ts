import { useFetch } from '@/shared/api/hooks/useFetch';

import {
  getResumeData,
  getResumeSchema,
  getResumeEmptyData,
  parseLinkedInProfile,
  parsePdfResume,
  deleteResume,
  fetchAllResumes,
} from '../api';

import { useQueryClient, useMutation } from '@tanstack/react-query';

export function useTemplateFormSchema() {
  return useFetch({
    queryKey: ['resume-schema'],
    queryFn: getResumeSchema,
  });
}

export function useTemplateFormData(id: string) {
  return useFetch({
    queryKey: ['resume-data'],
    queryFn: () => getResumeData(id),
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

export const useParseLinkedInProfile = () => {
  return useMutation({
    mutationFn: (url: string) => parseLinkedInProfile(url),
  });
};

export const useGetAllResumes = (userId: string | null) => {
  return useFetch({
    queryKey: ['resumes', userId],
    queryFn: () => fetchAllResumes(userId as string),
    staleTime: 0,
  });
};

export const useParsePdfResume = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => parsePdfResume(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resumes'] });
    },
  });
};
