import { fetch } from '@shared/api';
import { useFetch } from '@shared/api/hooks/useFetch';

export interface TemplateApiResponse {
  id: string;
  json: any;
  publicImageUrl: string;
  style: string[];
  colorVariations: { name: string; primaryColor: string }[];
  layoutType: string;
  roles: { id: string; name: string }[];
  createdAt: string;
  updatedAt: string;
  isTrending?: boolean;
}

export interface Template extends TemplateApiResponse {}

export const fetchAllTemplates = async (): Promise<Template[]> => {
  const response = await fetch<Template[]>('template', {
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

export const useGetAllTemplates = () => {
  return useFetch({
    queryKey: ['templates'],
    queryFn: fetchAllTemplates,
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
