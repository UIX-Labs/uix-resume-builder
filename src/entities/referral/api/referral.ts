import { useMutation } from '@tanstack/react-query';
import { fetch } from '@shared/api';

export interface ReferralData {
  referralUrl: string;
  downloadsAllowed: number;
  downloadsDone: number;
  downloadsLeft: number;
  referredTo?: Array<{
    id: string;
    createdAt: string;
    email: string;
    firstName: string;
    lastName?: string | null;
  }>;
}

export const fetchReferralData = async (): Promise<ReferralData> => {
  return await fetch<ReferralData>('auth/referral', {});
};

export interface EmailRecipient {
  name: string;
  email: string;
}

export interface SendReferralEmailsRequest {
  recipients: EmailRecipient[];
}

export interface SendReferralEmailsResponse {
  success: boolean;
  message?: string;
}

export const sendReferralEmails = async (recipients: EmailRecipient[]): Promise<SendReferralEmailsResponse> => {
  return await fetch<SendReferralEmailsResponse>('auth/referral/email', {
    options: {
      method: 'POST',
      body: JSON.stringify({ recipients }),
    },
  });
};

export const useSendReferralEmails = () => {
  return useMutation<SendReferralEmailsResponse, Error, EmailRecipient[]>({
    mutationFn: sendReferralEmails,
  });
};
