import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useUserStore } from '../store/user-store';
import { fetch } from '@shared/api';
import { useRouter } from 'next/navigation';

interface EmailCheckResponse {
  emailExists?: boolean;
  hasPassword?: boolean;
  socialAccounts?: string[];
}

interface RegisterUserData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}

interface AuthResponse {
  token?: string;
  user?: any;
  message?: string;
}

interface User {
  id: string;
  createdAt: string;
  updatedAt: string;
  deleted_at: string | null;
  email: string;
  googleId: string | null;
  linkedInId: string | null;
  firstName: string;
  lastName: string | null;
  password: string;
  isVerified: boolean;
  isLoggedIn: boolean;
}

interface LogoutResponse {
  message: string;
}

 export const fetchUserDetails = async (userId: string): Promise<User> => {

  const response = await fetch<User>(`auth/${userId}`, {
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

const checkEmailExistsAPI = async (email: string): Promise<EmailCheckResponse> => {

  const response = await fetch<EmailCheckResponse>('auth/check-email', {
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    },
  });

  return response;
};

const verifyOtpAPI = async ({ email, otp }: { email: string; otp: string }): Promise<boolean> => {
  const response = await fetch<boolean>('auth/verify-otp', {
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, otp }),
    },
  });

  return response;
};

const registerUserAPI = async (userData: RegisterUserData): Promise<AuthResponse> => {
  const response = await fetch<AuthResponse>('auth/register', {
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    },
  });

  return response;
};

const loginUserAPI = async ({ email, password }: { email: string; password: string }): Promise<AuthResponse> => {
  const response = await fetch<AuthResponse>('auth/email-signin', {
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    },
  });

  return response;
};

export const useCheckEmailExists = () => {
  return useMutation({
    mutationFn: checkEmailExistsAPI,
  });
};

export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: verifyOtpAPI,
  });
};

export const useRegisterUser = () => {
  const queryClient = useQueryClient();
  const setUser = useUserStore((state) => state.setUser);

  return useMutation({
    mutationFn: registerUserAPI,
    onSuccess: (data) => {
      if (data.token) {
        localStorage.setItem('authToken', data.token);
      }
      setUser({ ...data.user, token: data.token });
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};

export const useLoginUser = () => {
  const queryClient = useQueryClient();
  const setUser = useUserStore((state) => state.setUser);

  return useMutation({
    mutationFn: loginUserAPI,
    onSuccess: (data) => {
      if (data.token) {
        localStorage.setItem('authToken', data.token);
      }
      setUser({ ...data.user, token: data.token });
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};

export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
  return password.length >= 6 && password.length <= 32 && passwordRegex.test(password);
};
