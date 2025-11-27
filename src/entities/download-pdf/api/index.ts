import { fetch } from '@shared/api';
import type { CheckIfCommunityMemberResponse } from '../types/type';

export async function checkIfCommunityMember(data: {
  personal_email?: string;
  uix_email?: string;
  phone_number?: string;
}) {
  const res = await fetch<CheckIfCommunityMemberResponse>('resume/check-if-community-member', {
    options: {
      method: 'POST',
      body: JSON.stringify(data),
    },
  });

  return res;
}

export { convertHtmlToPdf } from './html-to-pdf';
