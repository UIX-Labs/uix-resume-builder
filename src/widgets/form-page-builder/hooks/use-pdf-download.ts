import { useUserProfile } from '@shared/hooks/use-user';
import { startTimedEvent, trackEvent } from '@shared/lib/analytics/Mixpanel';
import { toast } from 'sonner';

interface UsePdfDownloadParams {
  resumeId: string;
  generatePDF: () => Promise<void>;
}

export function usePdfDownload({ resumeId, generatePDF }: UsePdfDownloadParams) {
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
        window.location.href = `/auth?callbackUrl=${callbackUrl}`;
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
      await generatePDF();
      trackEvent('resume_download', {
        status: 'success',
        format: 'pdf',
        resumeId,
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
    }
  };

  return {
    // isWishlistModalOpen,
    // setIsWishlistModalOpen,
    // isWishlistSuccessModalOpen,
    // setIsWishlistSuccessModalOpen,
    // handleWaitlistJoinSuccess,
    handleDownloadPDF,
  };
}
