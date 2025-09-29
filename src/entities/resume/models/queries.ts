import { useFetch } from '@/shared/api/hooks/useFetch';

import {
  getResumeData,
  getResumeSchema,
  getResumeEmptyData,
  parseLinkedInProfile,
  parsePdfResume,
  deleteResume,
  fetchAllResumes,
  saveFormData,
} from '../api';

import { useQueryClient, useMutation } from '@tanstack/react-query';
import type { ResumeData, ResumeDataKey } from '../types/resume-data';
import { useCachedUser, useUserProfile } from '@shared/hooks/use-user';

export function useTemplateFormSchema() {
  return useFetch({
    queryKey: ['resume-schema'],
    queryFn: getResumeSchema,
  });
}

export function useResumeData(id: string) {
  return useFetch({
    queryKey: ['resume-data', id],
    queryFn: async () => {
      const promisesArray = [getResumeData(id), getResumeEmptyData()];
      const [actualData, emptyData] = await Promise.all(promisesArray);

      const mergedRes = Object.entries(emptyData).reduce((acc, cur) => {
        const key = cur[0] as ResumeDataKey;
        const value = cur[1] as ResumeData[ResumeDataKey];

        if (!acc[key]) {
          acc[key] = value;

          return acc;
        }

        const flatItems = actualData[key].items;

        if (flatItems.length === 0) {
          acc[key].items = value.items;
        }

        return acc;
      }, actualData);

      console.log(mergedRes);

      return mergedRes as ResumeData;
    },
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
