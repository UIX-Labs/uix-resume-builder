/**
 * Guest Email Utility
 * Manages guest user email in localStorage for API requests before login.
 * Uses the existing key 'pending_analyzer_guest_email' for consistency with roast flow.
 */

const GUEST_EMAIL_KEY = 'pending_analyzer_guest_email';

/**
 * Generate a random guest email in format: guest_<uuid>@guestuser.in
 */
export function generateGuestEmail(): string {
  return `guest_${crypto.randomUUID()}@guestuser.in`;
}

/**
 * Get guest email from localStorage
 * @returns Guest email string or null if not found
 */
export function getGuestEmail(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(GUEST_EMAIL_KEY);
}

/**
 * Set a new guest email in localStorage
 * @param email Optional email to set, generates new one if not provided
 * @returns The guest email that was set
 */
export function setGuestEmail(email?: string): string {
  if (typeof window === 'undefined') return '';
  const guestEmail = email || generateGuestEmail();
  localStorage.setItem(GUEST_EMAIL_KEY, guestEmail);
  return guestEmail;
}

/**
 * Get existing guest email or create a new one
 * @returns Guest email string
 */
export function getOrCreateGuestEmail(): string {
  const existing = getGuestEmail();
  if (existing) return existing;
  return setGuestEmail();
}

/**
 * Clear guest email from localStorage (call after successful login)
 */
export function clearGuestEmail(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(GUEST_EMAIL_KEY);
}
