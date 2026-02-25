import { getGuestEmail } from '@shared/lib/guest-email';

async function fetcher<T>(url: string, { options }: { options?: RequestInit } = {}): Promise<T> {
  const isFormData = options?.body instanceof FormData;
  const guestEmail = typeof window !== 'undefined' ? getGuestEmail() : null;

  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${url}`, {
    ...(options ?? {}),
    headers: {
      ...(!isFormData && { 'Content-Type': 'application/json' }),
      ...(guestEmail && { 'guest-email': guestEmail }),
      ...(options?.headers ?? {}),
    },
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const error: any = new Error(errorData?.message || 'Failed to fetch data');
    error.status = response.status;
    error.data = errorData;
    throw error;
  }

  return response.json();
}

export { fetcher as fetch };
