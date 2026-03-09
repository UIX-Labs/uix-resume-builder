import { fetch as fetcher } from '@shared/api';
import type {
  OverviewStats,
  OverviewTrends,
  AdminTemplate,
  PaginatedResponse,
  FeedbackRow,
  ReviewRow,
  DownloadRow,
  RoastRow,
  AdminQueryParams,
  ResumeForReview,
  AdminResumeExampleCategory,
  AdminResumeExample,
  AdminResumeExampleDetail,
  TemplateStatus,
  UpdateTemplateMetadataPayload,
  Role,
  ParsedResumeExampleResponse,
  UserRow,
  ReferralRow,
} from '../types/admin.types';

function buildQueryString(params: AdminQueryParams): string {
  const searchParams = new URLSearchParams();
  if (params.page) searchParams.set('page', String(params.page));
  if (params.limit) searchParams.set('limit', String(params.limit));
  if (params.sortBy) searchParams.set('sortBy', params.sortBy);
  if (params.sortOrder) searchParams.set('sortOrder', params.sortOrder);
  if (params.search) searchParams.set('search', params.search);
  if (params.status) searchParams.set('status', params.status);
  if (params.dateFrom) searchParams.set('dateFrom', params.dateFrom);
  if (params.dateTo) searchParams.set('dateTo', params.dateTo);
  if (params.ratingMin !== undefined) searchParams.set('ratingMin', String(params.ratingMin));
  if (params.ratingMax !== undefined) searchParams.set('ratingMax', String(params.ratingMax));
  if (params.excludeInternal !== undefined) searchParams.set('excludeInternal', String(params.excludeInternal));
  const qs = searchParams.toString();
  return qs ? `?${qs}` : '';
}

// ─── Overview ──────────────────────────────────────────────────
export const getOverviewStats = () => fetcher<OverviewStats>('admin/overview');
export const getOverviewTrends = () => fetcher<OverviewTrends>('admin/overview/trends');

// ─── Templates ─────────────────────────────────────────────────
export const getAdminTemplates = () => fetcher<AdminTemplate[]>('admin/templates');

export const getAdminTemplateById = (id: string) => fetcher<AdminTemplate>(`admin/templates/${id}`);

export const updateTemplateStatus = (id: string, status: TemplateStatus) =>
  fetcher<AdminTemplate>(`admin/templates/${id}/status`, {
    options: { method: 'PATCH', body: JSON.stringify({ status }) },
  });

export const updateTemplateMetadata = (id: string, data: UpdateTemplateMetadataPayload) =>
  fetcher<AdminTemplate>(`admin/templates/${id}/metadata`, {
    options: { method: 'PATCH', body: JSON.stringify(data) },
  });

export const createAdminTemplate = (formData: FormData) =>
  fetcher<any>('admin/templates', {
    options: { method: 'POST', body: formData },
  });

export const updateAdminTemplate = (id: string, formData: FormData) =>
  fetcher<any>(`admin/templates/${id}`, {
    options: { method: 'PUT', body: formData },
  });

// ─── Roles ──────────────────────────────────────────────────────
export const getRoles = () => fetcher<Role[]>('admin/roles');

export const createRole = (data: { name: string; description?: string }) =>
  fetcher<Role>('admin/roles', {
    options: { method: 'POST', body: JSON.stringify(data) },
  });

export const updateRole = (id: string, data: { name: string; description?: string }) =>
  fetcher<Role>(`admin/roles/${id}`, {
    options: { method: 'PUT', body: JSON.stringify(data) },
  });

export const deleteRole = (id: string) =>
  fetcher<{ success: boolean }>(`admin/roles/${id}`, {
    options: { method: 'DELETE' },
  });

// ─── Users ────────────────────────────────────────────────────
export const getUsers = (params: AdminQueryParams = {}) =>
  fetcher<PaginatedResponse<UserRow>>(`admin/users${buildQueryString(params)}`);

// ─── Referrals ────────────────────────────────────────────────
export const getReferrals = (params: AdminQueryParams = {}) =>
  fetcher<PaginatedResponse<ReferralRow>>(`admin/referrals${buildQueryString(params)}`);

// ─── Feedbacks ─────────────────────────────────────────────────
export const getFeedbacks = (params: AdminQueryParams = {}) =>
  fetcher<PaginatedResponse<FeedbackRow>>(`admin/feedbacks${buildQueryString(params)}`);

// ─── Reviews ───────────────────────────────────────────────────
export const getReviews = (params: AdminQueryParams = {}) =>
  fetcher<PaginatedResponse<ReviewRow>>(`admin/reviews${buildQueryString(params)}`);

export const getResumeForReview = (resumeId: string) => fetcher<ResumeForReview>(`admin/reviews/${resumeId}`);

export const getReviewSuggestions = (resumeId: string) => fetcher<any>(`admin/reviews/${resumeId}/suggestions`);

export const submitReviewSuggestions = (resumeId: string, suggestions: Record<string, any>) =>
  fetcher<any>(`admin/reviews/${resumeId}/suggestions`, {
    options: {
      method: 'POST',
      body: JSON.stringify({ suggestions }),
    },
  });

export const markReviewDone = (resumeId: string) =>
  fetcher<any>(`admin/reviews/${resumeId}/mark-done`, {
    options: { method: 'PATCH' },
  });

export const saveDraftSuggestions = (resumeId: string, suggestions: Record<string, any>) =>
  fetcher<any>(`admin/reviews/${resumeId}/suggestions/draft`, {
    options: {
      method: 'POST',
      body: JSON.stringify({ suggestions }),
    },
  });

// ─── Downloads ─────────────────────────────────────────────────
export const getDownloads = (params: AdminQueryParams = {}) =>
  fetcher<PaginatedResponse<DownloadRow>>(`admin/downloads${buildQueryString(params)}`);

// ─── Roasts ────────────────────────────────────────────────────
export const getRoasts = (params: AdminQueryParams = {}) =>
  fetcher<PaginatedResponse<RoastRow>>(`admin/roasts${buildQueryString(params)}`);

// ─── Resume Example Categories ──────────────────────────────────
export const getResumeExampleCategories = () =>
  fetcher<AdminResumeExampleCategory[]>('admin/resume-examples/categories');

export const createResumeExampleCategory = (data: Partial<AdminResumeExampleCategory>) =>
  fetcher<AdminResumeExampleCategory>('admin/resume-examples/categories', {
    options: { method: 'POST', body: JSON.stringify(data) },
  });

export const updateResumeExampleCategory = (id: string, data: Partial<AdminResumeExampleCategory>) =>
  fetcher<AdminResumeExampleCategory>(`admin/resume-examples/categories/${id}`, {
    options: { method: 'PUT', body: JSON.stringify(data) },
  });

export const deleteResumeExampleCategory = (id: string) =>
  fetcher<{ success: boolean }>(`admin/resume-examples/categories/${id}`, {
    options: { method: 'DELETE' },
  });

// ─── Resume Examples ────────────────────────────────────────────
export const getResumeExamples = (params: AdminQueryParams = {}) =>
  fetcher<PaginatedResponse<AdminResumeExample>>(`admin/resume-examples${buildQueryString(params)}`);

export const getResumeExampleById = (id: string) => fetcher<AdminResumeExampleDetail>(`admin/resume-examples/${id}`);

export const createResumeExample = (data: Partial<AdminResumeExampleDetail>) =>
  fetcher<AdminResumeExampleDetail>('admin/resume-examples', {
    options: { method: 'POST', body: JSON.stringify(data) },
  });

export const updateResumeExample = (id: string, data: Partial<AdminResumeExampleDetail>) =>
  fetcher<AdminResumeExampleDetail>(`admin/resume-examples/${id}`, {
    options: { method: 'PUT', body: JSON.stringify(data) },
  });

export const deleteResumeExample = (id: string) =>
  fetcher<{ success: boolean }>(`admin/resume-examples/${id}`, {
    options: { method: 'DELETE' },
  });

export const toggleResumeExamplePublish = (id: string) =>
  fetcher<AdminResumeExampleDetail>(`admin/resume-examples/${id}/toggle-publish`, {
    options: { method: 'PATCH' },
  });

export const parseResumeForExample = (formData: FormData) =>
  fetcher<ParsedResumeExampleResponse>('admin/resume-examples/parse-resume', {
    options: { method: 'POST', body: formData },
  });
