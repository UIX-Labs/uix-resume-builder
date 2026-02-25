import { useUserProfile } from '@shared/hooks/use-user';
import { startTimedEvent, trackEvent } from '@shared/lib/analytics/Mixpanel';
import { useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

interface UsePdfDownloadParams {
  resumeId: string;
  generatePDF: () => Promise<
    { downloadsLeft: number; downloadsAllowed: number; downloadsDone: number; referralUrl?: string } | undefined
  >;
  onDownloadSuccess?: () => void;
}

export function usePdfDownload({ resumeId, generatePDF, onDownloadSuccess }: UsePdfDownloadParams) {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authRedirectUrl, setAuthRedirectUrl] = useState('');
  const [isReferralModalOpen, setIsReferralModalOpen] = useState(false);
  const [referralUrl, setReferralUrl] = useState('');
  const searchParams = useSearchParams();
  const processedRef = useRef(false);
  const queryClient = useQueryClient();

  // const [isWishlistModalOpen, setIsWishlistModalOpen] = useState(false);
  // const [isWishlistSuccessModalOpen, setIsWishlistSuccessModalOpen] =
  //   useState(false);

  // const { mutateAsync: checkCommunityMember } = useCheckIfCommunityMember();
  const { data: user } = useUserProfile();

  // const handleWaitlistJoinSuccess = async (response: JoinCommunityResponse) => {
  //   if (response?.joinCommunityRequested) {
  //     try {
  //       await generatePDF();
  //     } catch (error) {
  //       console.error("Failed to generate PDF after joining waitlist:", error);
  //       toast.error("Failed to download PDF");
  //     }
  //   } else {
  //     setIsWishlistSuccessModalOpen(true);
  //   }
  // };

  const handleDownloadPDF = async () => {
    try {
      // Guest users must login to download PDF
      if (!user?.isLoggedIn) {
        // Store current resume ID so we can return after login
        localStorage.setItem('pending_download_resume_id', resumeId);
        // Redirect to auth with callback to current page
        const callbackUrl = encodeURIComponent(window.location.pathname + '?download=true');
        setAuthRedirectUrl(`/auth?callbackUrl=${callbackUrl}`);
        setIsAuthModalOpen(true);
        return;
      }
      startTimedEvent('resume_download');

      // const response = await checkCommunityMember({
      //   personal_email: user?.email,
      //   uix_email: user?.email,
      // });

      // if (!response?.is_uix_member && !response?.join_community_requested) {
      //   setIsWishlistModalOpen(true);
      //   trackEvent("resume_download_waitlist_prompt", {
      //     resumeId,
      //   });
      // } else {
      const downloadInfo = await generatePDF();

      if (downloadInfo?.referralUrl) {
        setReferralUrl(downloadInfo.referralUrl);
        setIsReferralModalOpen(true);
        return;
      }

      if (downloadInfo) {
        queryClient.invalidateQueries({ queryKey: ['userProfile'] });
      }

      onDownloadSuccess?.();

      trackEvent('resume_download', {
        status: 'success',
        format: 'pdf',
        resumeId,
        downloadsLeft: downloadInfo?.downloadsLeft,
      });
      // }
    } catch (error) {
      console.error('Failed to download PDF:', error);
      toast.error('Failed to download PDF');
      trackEvent('resume_download', {
        status: 'failed',
        error: error instanceof Error ? error.message : 'Unknown error',
        resumeId,
      });
      throw error;
    }
  };

  useEffect(() => {
    if (user?.isLoggedIn && !processedRef.current) {
      const pendingId = localStorage.getItem('pending_download_resume_id');
      const isDownloadParam = searchParams?.get('download') === 'true';

      if (pendingId === resumeId || isDownloadParam) {
        processedRef.current = true;
        localStorage.removeItem('pending_download_resume_id');

        if (isDownloadParam) {
          const newUrl = window.location.pathname;
          window.history.replaceState({}, '', newUrl);
        }

        handleDownloadPDF();
      }
    }
  }, [user?.isLoggedIn, resumeId, searchParams, handleDownloadPDF]);

  return {
    // isWishlistModalOpen,
    // setIsWishlistModalOpen,
    // isWishlistSuccessModalOpen,
    // setIsWishlistSuccessModalOpen,
    // handleWaitlistJoinSuccess,
    handleDownloadPDF,
    isAuthModalOpen,
    setIsAuthModalOpen,
    authRedirectUrl,
    isReferralModalOpen,
    setIsReferralModalOpen,
    referralUrl,
  };
}
