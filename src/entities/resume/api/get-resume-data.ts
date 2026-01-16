import { fetch } from '@shared/api';
import { getOrCreateGuestEmail } from '@shared/lib/guest-email';

import type { ResumeData } from '../types/resume-data';

export interface ResumeDataResponse extends ResumeData {
  id: string;
  updatedAt: string;
  template: any | null;
  publicThumbnail?: { url: string; expiresAt: string } | null;
  isAnalyzed?: boolean;
}

export async function getResumeData(id: string, isLoggedIn = false) {
  // biome-ignore lint/correctness/noUnusedVariables: <explanation>
  let guestEmail: string | null = null;

  if (!isLoggedIn) {
    guestEmail = getOrCreateGuestEmail();
  }

  const data = await fetch<ResumeDataResponse>(`resume/${id}`);

  return data;
}
