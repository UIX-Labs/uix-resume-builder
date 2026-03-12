/**
 * Map reviewer display names to LinkedIn profile URLs.
 * Keys are normalized (lowercase, trimmed) for matching.
 */
const REVIEWER_LINKEDIN_URLS: Record<string, string> = {
  aman: 'https://www.linkedin.com/in/aman-juneja-71869855/',
  'vishnu malav': 'https://www.linkedin.com/in/vishnu-malav-82a9aa191/',
  vishnu: 'https://www.linkedin.com/in/vishnu-malav-82a9aa191/',
  'kunal yadav': 'https://www.linkedin.com/in/kunaaal13/',
  kunal: 'https://www.linkedin.com/in/kunaaal13/',
  anmol: 'https://www.linkedin.com/in/anmolsaxena-li/',
  arijt: 'https://www.linkedin.com/in/thearijitbanerjee/',
  arijit: 'https://www.linkedin.com/in/thearijitbanerjee/',
  vivek: 'https://www.linkedin.com/in/vivek-j-842241293/',
};

export function getReviewerLinkedInUrl(reviewer: string): string | null {
  if (!reviewer || typeof reviewer !== 'string') return null;
  const normalized = reviewer.trim().toLowerCase();
  if (!normalized) return null;
  return REVIEWER_LINKEDIN_URLS[normalized] ?? REVIEWER_LINKEDIN_URLS[normalized.split(/\s+/)[0] ?? ''] ?? null;
}
