const REFERRER_USER_ID_KEY = 'referrer_user_id';

export function getReferrerUserId(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(REFERRER_USER_ID_KEY);
}

export function setReferrerUserId(userId: string): void {
  if (typeof window === 'undefined') return;
  if (userId && userId.trim()) {
    localStorage.setItem(REFERRER_USER_ID_KEY, userId.trim());
  }
}

export function clearReferrerUserId(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(REFERRER_USER_ID_KEY);
}
