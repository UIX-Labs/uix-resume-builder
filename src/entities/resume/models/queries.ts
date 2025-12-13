import { useFetch } from "@/shared/api/hooks/useFetch";

import {
  getResumeData,
  getResumeSchema,
  getResumeEmptyData,
  parseLinkedInProfile,
  parsePdfResume,
  deleteResume,
  fetchAllResumes,
  saveFormData,
  updateResumeTemplate,
} from "../api";

import { useQueryClient, useMutation } from "@tanstack/react-query";
import type { ResumeData, ResumeDataKey } from "../types/resume-data";

export function useTemplateFormSchema() {
  return useFetch({
    queryKey: ["resume-schema"],
    queryFn: getResumeSchema,
    staleTime: Infinity, // Cache forever since schema is static data
  });
}

export function useResumeData(id: string) {
  return useFetch({
    queryKey: ["resume-data", id],
    queryFn: async () => {
      const promisesArray = [getResumeData(id), getResumeEmptyData()];
      const [actualData, emptyData] = await Promise.all(promisesArray);

      // Enhanced deep merge function to recursively check all nested object fields
      const deepMerge = (target: any, source: any): any => {
        // If source is null/undefined, return target as-is
        if (source === null || source === undefined) {
          return target;
        }
        // If target is null/undefined, return source (provides missing structure)
        if (target === null || target === undefined) {
          return source;
        }

        // Start with target's existing values
        const result = { ...target };

        // Recursively check every property in source
        for (const key in source) {
          if (key in source) {
            const sourceValue = source[key];
            const targetValue = result[key];

            if (key === "items" && Array.isArray(sourceValue)) {
              // Special handling for items arrays
              if (
                !targetValue ||
                !Array.isArray(targetValue) ||
                targetValue.length === 0
              ) {
                // If target has no items, use source items (default empty items)
                result[key] = sourceValue;
              } else {
                // Merge each existing item with the empty item template to fill missing fields
                const emptyItemTemplate = sourceValue[0];
                result[key] = targetValue.map((item: any) => {
                  // For string arrays (interests/achievements), don't merge
                  if (typeof emptyItemTemplate === "string") {
                    return item;
                  }
                  // For object items, recursively merge to fill missing nested fields
                  return deepMerge(item, emptyItemTemplate);
                });
              }
            } else if (Array.isArray(sourceValue)) {
              // Handle other arrays - use target if exists, otherwise source
              if (targetValue === undefined || targetValue === null) {
                result[key] = sourceValue;
              }
            } else if (
              typeof sourceValue === "object" &&
              sourceValue !== null
            ) {
              // Recursively merge nested objects
              result[key] = deepMerge(targetValue, sourceValue);
            } else {
              // For primitive values, only use source if target is missing/null
              if (targetValue === undefined || targetValue === null) {
                result[key] = sourceValue;
              }
            }
          }
        }

        return result;
      };

      const mergedRes: ResumeData & { isAnalyzed?: boolean } = {
        ...actualData,
        templateId: (actualData as any).templateId || "", // Ensure templateId is always present
        isAnalyzed: (actualData as any).isAnalyzed, // Preserve isAnalyzed flag from API response
      };

      Object.keys(emptyData).forEach((key) => {
        const resumeKey = key as keyof typeof emptyData;
        mergedRes[resumeKey] = deepMerge(
          actualData[resumeKey],
          emptyData[resumeKey]
        );
      });

      return mergedRes;
    },
    staleTime: 30000, // Cache for 30s
    refetchOnWindowFocus: false, // Don't refetch on window focus
    refetchOnMount: false, // Don't refetch on remount (only refetch if data is stale)
  });
}

export function useResumeEmptyData() {
  return useFetch({
    queryKey: ["resume-empty-data"],
    queryFn: getResumeEmptyData,
  });
}

export const useDeleteResume = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteResume,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resumes"] });
    },
  });
};

export const useUpdateResumeTemplate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateResumeTemplate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resumes"] });
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
    queryKey: ["resumes", userId],
    queryFn: () => fetchAllResumes(userId),
    staleTime: 0,
  });
};

export const useParsePdfResume = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => parsePdfResume(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resumes"] });
    },
  });
};

export const useSaveResumeForm = () => {
  return useMutation({
    mutationFn: (data: {
      type: ResumeDataKey;
      data: ResumeData[ResumeDataKey];
    }) => saveFormData(data),
  });
};
