import { fetch } from '@shared/api';

export interface ReferralData {
  referralUrl: string;
  downloadsAllowed: number;
  downloadsDone: number;
  downloadsLeft: number;
}

export const fetchReferralData = async (): Promise<ReferralData> => {
  return await fetch<ReferralData>('auth/referral', {});
};
