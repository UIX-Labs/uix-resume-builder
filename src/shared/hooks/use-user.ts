import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetch } from "@shared/api";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName?: string;
  isVerified: boolean;
  isLoggedIn: boolean;
}

const fetchCurrentUser = async (): Promise<User> => {
  return await fetch<User>("auth/me", {
    options: {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    },
  });
};

export const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: fetchCurrentUser,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};

export const useCachedUser = () => {
  const queryClient = useQueryClient();
  return queryClient.getQueryData<User>(["user"]);
};