import { useFetch } from '@/shared/api/hooks/useFetch';

import {
  getResumeSchema,
  getResumeEmptyData,
  parseLinkedInProfile,
  parsePdfResume,
  deleteResume,
  fetchAllResumes,
  saveFormData,
  updateResumeTemplate,
} from '../api';

import { useQueryClient, useMutation } from '@tanstack/react-query';
import type { ResumeData, ResumeDataKey } from '../types/resume-data';
import { fetchAndMergeResumeData } from '../lib/merge-resume-data';

export function useTemplateFormSchema() {
  return useFetch({
    queryKey: ['resume-schema'],
    queryFn: getResumeSchema,
    staleTime: Infinity, // Cache forever since schema is static data
  });
}

export function useResumeData(id: string) {
  return useFetch({
    queryKey: ['resume-data', id],
    queryFn: () => fetchAndMergeResumeData(id),
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

export const useParseLinkedInProfile = () => {
  return useMutation({
    mutationFn: (url: string) => parseLinkedInProfile(url),
  });
};

export const useGetAllResumes = ({ userId }: { userId: string }) => {
  return useFetch({
    queryKey: ['resumes', userId],
    queryFn: () => fetchAllResumes(userId),
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

export const useSaveResumeForm = () => {
  return useMutation({
    mutationFn: (data: { type: ResumeDataKey; data: ResumeData[ResumeDataKey] }) => saveFormData(data),
  });
};
