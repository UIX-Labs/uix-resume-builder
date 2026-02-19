'use client';

import { useParseLinkedInProfile } from '@entities/resume';
import { useIsMobile } from '@shared/hooks/use-mobile';
import { getOrCreateGuestEmail } from '@shared/lib/guest-email';
import { Dialog, DialogContent } from '@shared/ui/dialog';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface LinkedInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LinkedInModal({ isOpen, onClose }: LinkedInModalProps) {
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const isMobile = useIsMobile();
  const parseLinkedInMutation = useParseLinkedInProfile();

  const isLoading = parseLinkedInMutation.isPending;

  const mutationError = parseLinkedInMutation.error?.message;

  const displayError = error || mutationError;

  const handleSubmit = async () => {
    if (!linkedinUrl.trim()) {
      setError('Please enter a valid LinkedIn profile URL');
      return;
    }

    const linkedinPattern = /^https?:\/\/(www\.)?linkedin\.com\/in\/[\w-]+(\/.*)?(\?.*)?$/;
    if (!linkedinPattern.test(linkedinUrl.trim())) {
      setError('Please enter a valid LinkedIn profile URL (e.g., https://www.linkedin.com/in/your-profile)');
      return;
    }

    setError(null);

    // Remove UTM parameters
    const cleanUrl = linkedinUrl.trim().split('?')[0];

    // Ensure guest email exists for API tracking if user is not logged in
    getOrCreateGuestEmail();

    parseLinkedInMutation.mutate(cleanUrl, {
      onSuccess: (response) => {
        onClose();
        const url = isMobile ? `/resume/${response.resumeId}?openForm=true` : `/resume/${response.resumeId}`;
        router.push(url);
        setLinkedinUrl('');
      },
      onError: (err) => {
        setError(err instanceof Error ? err.message : 'Failed to parse LinkedIn profile');
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="md:max-w-[1035px] w-full max-w-[calc(100vw-2rem)] h-[80vh] md:h-[653px] rounded-[24px] md:rounded-[36px] bg-[#0C1118] border-none p-0 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -left-[340px] -top-[125px] w-[1028px] h-[1028px] rounded-full opacity-100 bg-[linear-gradient(136deg,rgba(37,122,255,1)_30%,rgba(12,17,24,1)_68%)] blur-[100px]" />
        </div>

        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-black/80 border-2 border-white hover:bg-[#1a2230] transition-colors cursor-pointer"
          aria-label="Close"
        >
          <Image src="/images/close.svg" alt="close-icon" width={24} height={24} className="rotate-45" />
        </button>

        <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 py-12 md:px-[198px] md:py-[176px]">
          <div className="flex flex-col items-center justify-center gap-6 md:gap-5 w-full max-w-[640px]">
            <h2 className="text-white font-semibold text-[40px] leading-[1.15] md:text-[56px] md:leading-[1.2] tracking-[-0.03em] text-center">
              From LinkedIn to Resume
            </h2>

            <div className="w-full max-w-[539px] flex flex-col items-center justify-center gap-4 md:gap-0 md:p-2 md:bg-[#0C1118] md:border md:border-[#959DA8] md:rounded-[20px] md:shadow-[0px_0px_0px_4px_rgba(82,82,82,1)]">
              <div className="w-full flex flex-col md:flex-row items-stretch md:items-center gap-4 md:gap-0">
                <div className="flex items-center px-4 py-5 gap-3 h-[56px] bg-white rounded-[16px] md:bg-transparent flex-1 p-[2px] border border-blue-900 shadow-[0_0_0_4px_#CBE7FF] md:p-0 md:border-0 md:shadow-none">
                  <Image src="/images/linkedin.svg" alt="img" height={24} width={24} className="flex-shrink-0" />

                  <input
                    type="text"
                    id="linkedin-url"
                    placeholder="linkedin.com/in/your.name"
                    value={linkedinUrl}
                    onChange={(e) => {
                      setLinkedinUrl(e.target.value);
                      setError(null);
                    }}
                    disabled={isLoading}
                    className="flex-1 bg-transparent border-none outline-none text-[#8B8B8B] md:text-[#CCD4DF] text-base font-medium leading-[1.375em] tracking-[-0.011em] placeholder:text-[#8B8B8B] md:placeholder:text-neutral-500 min-w-0"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isLoading || !linkedinUrl.trim()}
                  className="flex items-center justify-center gap-2 bg-blue-900 border-2 border-amber-50 md:border-none md:bg-[#0066FF] text-white rounded-[12px] md:rounded-xl px-4 py-3 h-[48px] md:h-11 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#0051d4] transition-colors cursor-pointer font-semibold text-lg w-[216px] md:w-auto mx-auto md:mx-0"
                >
                  <span className="text-lg font-semibold leading-[1.333em] tracking-tight">
                    {isLoading ? 'Processing...' : 'Convert to Resume'}
                  </span>
                </button>
              </div>
            </div>

            <h3 className="text-white font-semibold text-[40px] leading-[1.15] md:text-[56px] md:leading-[1.2] tracking-[-0.03em] text-center">
              in one click
            </h3>

            <p className="text-white/80 font-normal text-base leading-[1.5] tracking-[-0.011em] text-center max-w-[380px] px-4">
              Paste your LinkedIn profile link and let Resume Builder craft a professional resume for you in seconds.
            </p>

            <div className="flex flex-col items-center gap-3 mt-2 px-4">
              <div className="flex items-center justify-center gap-3">
                <span className="w-60 md:max-w-[520px] h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent opacity-40" />
              </div>
            </div>

            {displayError && <p className="text-red-400 text-sm text-center px-4">{displayError}</p>}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function LinkedinIntegrationCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="relative w-full min-h-[200px] sm:min-h-[220px] md:h-[248px] bg-[rgb(23,23,23)] rounded-[16px] md:rounded-[20px] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -left-[100px] sm:-left-[150px] -top-[150px] sm:-top-[214px] w-[350px] sm:w-[550px] h-[350px] sm:h-[500px] rounded-full opacity-100 bg-[linear-gradient(136deg,rgba(37,122,255,1)_30%,rgba(23,23,23,1)_68%)] blur-[100px]" />

          <div className="absolute right-[-29px] -top-[7px] w-[200px] sm:w-[344px] h-[155px] sm:h-[266px] opacity-10 rotate-45">
            <Image src="/images/image-14.svg" alt="Background decoration" fill className="object-cover" />
          </div>

          <div className="hidden sm:block absolute -left-[21px] top-[150px] w-[238px] h-[246px] opacity-25 rounded-[12px]">
            <Image
              src="/images/resume-score-img.svg"
              alt="LinkedIn decoration"
              fill
              className="object-cover rounded-[12px]"
            />
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 py-6 sm:px-6 md:px-8">
          <div className="flex flex-col items-center gap-7 max-w-[391px] w-full">
            <div className="flex flex-col items-center gap-2 sm:gap-3 w-full">
              <h2 className="text-[rgb(240,247,255)] font-semibold text-[28px] s:text-3xl md:text-4xl leading-tight tracking-tight text-center">
                Skip repetitive filling
              </h2>

              <p className="text-[rgb(204,212,223)] font-normal text-base sm:text-lg md:text-xl leading-relaxed tracking-tight text-center px-2">
                Bring your details from LinkedIn and reuse them anytime on any resume template.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="flex items-center justify-center bg-blue-600 text-white rounded-lg sm:rounded-xl px-4 sm:px-5 py-2.5 sm:py-3 h-11 shadow-sm transition-all hover:bg-[rgb(0,81,217)] cursor-pointer w-[213px] sm:w-auto"
            >
              <span className="text-base sm:text-lg font-semibold leading-[1.333em] tracking-tight">
                Auto-fill via Linkedin
              </span>
            </button>
          </div>
        </div>
      </div>
      <LinkedInModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
