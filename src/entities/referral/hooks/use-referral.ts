import { useQuery } from '@tanstack/react-query';
import { fetchReferralData } from '@entities/referral/api/referral';

export const useReferralData = () => {
  return useQuery({
    queryKey: ['referralData'],
    queryFn: fetchReferralData,
    retry: false,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
};
