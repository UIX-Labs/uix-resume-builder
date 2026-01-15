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

const fetchUserProfile = async (): Promise<User> => {
  return await fetch<User>('auth/me', {});
};

export const useUserProfile = () => {
  return useQuery({
    queryKey: ['userProfile'],
    queryFn: fetchUserProfile,
    retry: false,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
};

export const useCachedUser = () => {
  const queryClient = useQueryClient();
  const cachedUser = queryClient.getQueryData<User>(['userProfile']);

  const { data } = useUserProfile();

  return cachedUser ?? data;
};
