import { fetch } from '@shared/api';
import type { PaginatedExamples, ResumeExampleDetail, ExampleCategory, ExampleFilters } from '../types';

export async function fetchExamples(filters: ExampleFilters): Promise<PaginatedExamples> {
  const params = new URLSearchParams();
  if (filters.category) params.set('category', filters.category);
  if (filters.role) params.set('role', filters.role);
  if (filters.experienceYears !== undefined) params.set('experienceYears', String(filters.experienceYears));
  if (filters.primaryColor) params.set('primaryColor', filters.primaryColor);
  if (filters.layout) params.set('layout', filters.layout);
  if (filters.page) params.set('page', String(filters.page));

  const queryString = params.toString();
  const url = queryString ? `resume-examples?${queryString}` : 'resume-examples';

  return fetch<PaginatedExamples>(url, {
    options: { method: 'GET' },
  });
}

export async function fetchExampleBySlug(slug: string): Promise<ResumeExampleDetail> {
  return fetch<ResumeExampleDetail>(`resume-examples/${slug}`, {
    options: { method: 'GET' },
  });
}

export async function fetchExampleCategories(): Promise<ExampleCategory[]> {
  return fetch<ExampleCategory[]>('resume-examples/categories', {
    options: { method: 'GET' },
  });
}

export async function cloneExample(exampleId: string): Promise<{ resumeId: string }> {
  return fetch<{ resumeId: string }>('resume-examples/clone', {
    options: {
      method: 'POST',
      body: JSON.stringify({ exampleId }),
    },
  });
}
