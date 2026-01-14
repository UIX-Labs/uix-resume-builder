import { fetch } from '@shared/api';
import type { Resume } from '../types';

export type GetAllResumesResponse = Resume[];

export const fetchAllResumes = async (): Promise<GetAllResumesResponse> => {
  // if (!userId) {
  //   throw new Error('User ID is required');
  // }
  const response = await fetch<Resume[]>(`resume/getAll`, {
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
