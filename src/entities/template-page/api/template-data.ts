import { fetch } from '@shared/api';
import { useFetch } from '@shared/api/hooks/useFetch';

export interface TemplateApiResponse {
  id: string;
  json: any;
  publicImageUrl: string;
  role?: string[];
  column?: string[];
  style?: string[];
  slug?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Template extends TemplateApiResponse {}

export interface TemplateListResponse {
  data: Template[];
  total: number;
  offset: number;
  limit: number;
}

// export const fetchAllTemplates = async (): Promise<Template[]> => {
//   const response = await fetch<Template[]>('template', {
//     options: {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       credentials: 'include',
//     },
//   });

//   return response;
// };

export const fetchAllTemplates = async (params?: {
  style?: string;
  role?: string;
  column?: string;
  offset?: number;
  limit?: number;
}): Promise<TemplateListResponse> => {
  const query = new URLSearchParams();
  if (params?.style) query.set('style', params.style);
  if (params?.role) query.set('role', params.role);
  if (params?.column) query.set('column', params.column);
  if (params?.offset !== undefined) query.set('offset', String(params.offset));
  if (params?.limit !== undefined) query.set('limit', String(params.limit));

  const queryString = query.toString();

  return fetch<TemplateListResponse>(`template${queryString ? `?${queryString}` : ''}`, {
    options: {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    },
  });
};

export const fetchTemplateById = async (templateId: string): Promise<Template> => {
  const response = await fetch<Template>(`template/${templateId}`, {
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

// export const useGetAllTemplates = () => {
//   return useFetch({
//     queryKey: ['templates'],
//     queryFn: fetchAllTemplates,
//     staleTime: 5 * 60 * 1000,
//   });
// };

export const useGetAllTemplates = (params?: {
  style?: string;
  role?: string;
  column?: string;
  offset?: number;
  limit?: number;
}) => {
  return useFetch({
    queryKey: ['templates', params],
    queryFn: () => fetchAllTemplates(params),
    staleTime: 5 * 60 * 1000,
  });
};

export const useGetTemplateById = (templateId: string | null) => {
  return useFetch({
    queryKey: ['template', templateId],
    // biome-ignore lint/style/noNonNullAssertion: value is checked by enabled flag
    queryFn: () => fetchTemplateById(templateId!),
    enabled: !!templateId,
  });
};
