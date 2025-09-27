import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetch } from '@shared/api';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName?: string;
  isVerified: boolean;
  isLoggedIn: boolean;
}

interface UseUserOptions {
  enabled?: boolean;
}

const fetchUserProfile = async (): Promise<User> => {
  return await fetch<User>('auth/me', {});
};

export const useUserProfile = (options?: UseUserOptions) => {
  return useQuery({
    queryKey: ['userProfile'],
    queryFn: fetchUserProfile,
    retry: false,
    staleTime: 5 * 60 * 1000,
    enabled: options?.enabled !== false,
  });
};

export const useCachedUser = () => {
  const queryClient = useQueryClient();
  const cachedUser = queryClient.getQueryData<User>(['userProfile']);

  const { data } = useUserProfile({
    enabled: !cachedUser,
  });

  return cachedUser ?? data;
};
