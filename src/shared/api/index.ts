import { getGuestEmail } from '@shared/lib/guest-email';
import { getReferrerUserId } from '@shared/lib/referrer-user-id';

async function fetcher<T>(url: string, { options }: { options?: RequestInit } = {}): Promise<T> {
  const isFormData = options?.body instanceof FormData;
  const guestEmail = typeof window !== 'undefined' ? getGuestEmail() : null;
  const referrerUserId = typeof window !== 'undefined' ? getReferrerUserId() : null;

  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${url}`, {
    ...(options ?? {}),
    headers: {
      ...(!isFormData && { 'Content-Type': 'application/json' }),
      ...(guestEmail && { 'guest-email': guestEmail }),
      ...(referrerUserId && { 'referrer-user-id': referrerUserId }),
      ...(options?.headers ?? {}),
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return response.json();
}

export { fetcher as fetch };
