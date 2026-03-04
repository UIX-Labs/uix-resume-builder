'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as adminApi from '../api/admin-api';
import type { AdminQueryParams } from '../types/admin.types';

// ─── Overview ──────────────────────────────────────────────────
export const useOverviewStats = () =>
  useQuery({
    queryKey: ['admin', 'overview'],
    queryFn: adminApi.getOverviewStats,
  });

export const useOverviewTrends = () =>
  useQuery({
    queryKey: ['admin', 'overview', 'trends'],
    queryFn: adminApi.getOverviewTrends,
  });

// ─── Templates ─────────────────────────────────────────────────
export const useAdminTemplates = () =>
  useQuery({
    queryKey: ['admin', 'templates'],
    queryFn: adminApi.getAdminTemplates,
  });

export const useToggleTemplate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => adminApi.toggleTemplate(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'templates'] });
    },
  });
};

export const useCreateTemplate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => adminApi.createAdminTemplate(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'templates'] });
    },
  });
};

// ─── Feedbacks ─────────────────────────────────────────────────
export const useFeedbacks = (params: AdminQueryParams) =>
  useQuery({
    queryKey: ['admin', 'feedbacks', params],
    queryFn: () => adminApi.getFeedbacks(params),
  });

// ─── Reviews ───────────────────────────────────────────────────
export const useReviews = (params: AdminQueryParams) =>
  useQuery({
    queryKey: ['admin', 'reviews', params],
    queryFn: () => adminApi.getReviews(params),
  });

export const useResumeForReview = (resumeId: string) =>
  useQuery({
    queryKey: ['admin', 'review', resumeId],
    queryFn: () => adminApi.getResumeForReview(resumeId),
    enabled: !!resumeId,
  });

export const useSubmitReviewSuggestions = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ resumeId, suggestions }: { resumeId: string; suggestions: Record<string, any> }) =>
      adminApi.submitReviewSuggestions(resumeId, suggestions),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'reviews'] });
    },
  });
};

export const useMarkReviewDone = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (resumeId: string) => adminApi.markReviewDone(resumeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'reviews'] });
    },
  });
};

export const useSaveDraftSuggestions = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ resumeId, suggestions }: { resumeId: string; suggestions: Record<string, any> }) =>
      adminApi.saveDraftSuggestions(resumeId, suggestions),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'review', variables.resumeId] });
    },
  });
};

// ─── Downloads ─────────────────────────────────────────────────
export const useDownloads = (params: AdminQueryParams) =>
  useQuery({
    queryKey: ['admin', 'downloads', params],
    queryFn: () => adminApi.getDownloads(params),
  });

// ─── Roasts ────────────────────────────────────────────────────
export const useRoasts = (params: AdminQueryParams) =>
  useQuery({
    queryKey: ['admin', 'roasts', params],
    queryFn: () => adminApi.getRoasts(params),
  });

// ─── Resume Example Categories ──────────────────────────────────
export const useResumeExampleCategories = () =>
  useQuery({
    queryKey: ['admin', 'resume-example-categories'],
    queryFn: adminApi.getResumeExampleCategories,
  });

export const useCreateResumeExampleCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => adminApi.createResumeExampleCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'resume-example-categories'] });
    },
  });
};

export const useUpdateResumeExampleCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => adminApi.updateResumeExampleCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'resume-example-categories'] });
    },
  });
};

export const useDeleteResumeExampleCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => adminApi.deleteResumeExampleCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'resume-example-categories'] });
    },
  });
};

// ─── Resume Examples ────────────────────────────────────────────
export const useResumeExamples = (params: AdminQueryParams) =>
  useQuery({
    queryKey: ['admin', 'resume-examples', params],
    queryFn: () => adminApi.getResumeExamples(params),
  });

export const useResumeExampleById = (id: string) =>
  useQuery({
    queryKey: ['admin', 'resume-example', id],
    queryFn: () => adminApi.getResumeExampleById(id),
    enabled: !!id,
  });

export const useCreateResumeExample = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => adminApi.createResumeExample(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'resume-examples'] });
    },
  });
};

export const useUpdateResumeExample = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => adminApi.updateResumeExample(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'resume-examples'] });
    },
  });
};

export const useDeleteResumeExample = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => adminApi.deleteResumeExample(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'resume-examples'] });
    },
  });
};

export const useToggleResumeExamplePublish = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => adminApi.toggleResumeExamplePublish(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'resume-examples'] });
    },
  });
};
