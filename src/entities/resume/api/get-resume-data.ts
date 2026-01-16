import { fetch } from '@shared/api';
import { getGuestEmail, getOrCreateGuestEmail } from '@shared/lib/guest-email';

import type { ResumeData } from '../types/resume-data';

export interface ResumeDataResponse extends ResumeData {
  id: string;
  updatedAt: string;
  template: any | null;
  publicThumbnail?: { url: string; expiresAt: string } | null;
  isAnalyzed?: boolean;
}

export async function getResumeData(id: string) {
  const guestEmail = getGuestEmail();

  const data = await fetch<ResumeDataResponse>(`resume/${id}`, {
    options: {
      headers: {
        ...(guestEmail && { 'guest-email': guestEmail }),
      },
    },
  });

  return data;
}
