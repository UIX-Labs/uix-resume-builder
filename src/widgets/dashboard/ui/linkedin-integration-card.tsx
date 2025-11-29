'use client';

import { useParseLinkedInProfile } from '@entities/resume';
import { Button } from '@shared/ui';
import { Input } from '@shared/ui/components/input';
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
  const router=useRouter();

  const parseLinkedInMutation = useParseLinkedInProfile();

  const isLoading = parseLinkedInMutation.isPending;

  const mutationError = parseLinkedInMutation.error?.message;

  const displayError = error || mutationError;

  const handleSubmit = async () => {
    if (!linkedinUrl.trim()) {
      setError('Please enter a valid LinkedIn profile URL');
      return;
    }

    const linkedinPattern = /^https?:\/\/(www\.)?linkedin\.com\/in\/[\w-]+\/?$/;
    if (!linkedinPattern.test(linkedinUrl.trim())) {
      setError('Please enter a valid LinkedIn profile URL (e.g., https://www.linkedin.com/in/your-profile)');
      return;
    }

    setError(null);

    parseLinkedInMutation.mutate(linkedinUrl.trim(), {
      onSuccess: (response) => {
        onClose();
        router.push(`/resume/${response.resumeId}`);
        setLinkedinUrl('');
      },
      onError: (err) => {
        setError(err instanceof Error ? err.message : 'Failed to parse LinkedIn profile');
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[1035px] h-[653px] rounded-[36px] bg-[#0C1118] border-none p-0 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -left-[340px] -top-[125px] w-[1028px] h-[1028px] rounded-full opacity-100 bg-[linear-gradient(136deg,rgba(37,122,255,1)_30%,rgba(12,17,24,1)_68%)] blur-[100px]" />
        </div>

        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-2 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-[#0C1118] border-2 border-white hover:bg-[#1a2230] transition-colors"
          aria-label="Close"
        >
          <Image src="/images/close.svg" alt="close-icon" width={40} height={40} className='rotate-45'/>
        </button>

        <div className="relative z-10 flex flex-col items-center justify-center h-full px-[198px] py-[176px]">
          <div className="flex flex-col items-center justify-center gap-5 w-[640px]">
            <h2 className="text-[#F1F7FF] font-semibold text-[56px] leading-[1.2] tracking-[-0.03em] text-center">
              From LinkedIn to Resume
            </h2>

            <div className="w-[539px] flex flex-col items-center justify-center p-2 bg-[#0C1118] border border-[#959DA8] rounded-[20px] shadow-[0px_0px_0px_4px_rgba(82,82,82,1)]">
              <div className="w-full h-12 flex items-center">
                <div className="flex items-center px-0 gap-1 flex-1">
                   <Image src="/images/linkedin.svg" alt="img" height={25} width={25}/>

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
                    className="flex-1 bg-transparent border-none outline-none text-[#CCD4DF] text-base font-semibold leading-[1.375em] tracking-[-0.011em] placeholder:text-neutral-500 px-2"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isLoading || !linkedinUrl.trim()}
                  className="flex items-center justify-center gap-2 bg-[#005FF2] text-white rounded-xl px-5 py-3 h-11 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#0051d4] transition-colors"
                >
                  <span className="text-lg font-semibold leading-[1.333em] tracking-tight whitespace-nowrap">
                    {isLoading ? 'Processing...' : 'Convert to Resume'}
                  </span>
                </button>
              </div>
            </div>

            <h3 className="text-[#F1F7FF] font-semibold text-[56px] leading-[1.2] tracking-[-0.03em] text-center">
              in one click
            </h3>

            <p className="text-[#CCD4DF] font-normal text-base leading-[1.375em] tracking-[-0.011em] text-center max-w-[427px]">
              Paste your LinkedIn profile link and let Resume Builder craft a professional resume for you in seconds.
            </p>

            {displayError && (
              <p className="text-red-400 text-sm text-center">{displayError}</p>
            )}
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
      <div className="relative w-full h-[248px] bg-[rgb(23,23,23)] rounded-[20px] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -left-[150px] -top-[214px] w-[550px] h-[500px] rounded-full opacity-100 bg-[linear-gradient(136deg,rgba(37,122,255,1)_30%,rgba(23,23,23,1)_68%)] blur-[100px]" />

          <div className="absolute right-[-29px] -top-[7px] w-[344px] h-[266px] opacity-10 rotate-45">
            <Image src="/images/image-14.svg" alt="Background decoration" fill className="object-cover" />
          </div>

          <div className="absolute -left-[21px] top-[150px] w-[238px] h-[246px] opacity-25 rounded-[12px]">
            <Image
              src="/images/resume-score-img.svg"
              alt="LinkedIn decoration"
              fill
              className="object-cover rounded-[12px]"
            />
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full px-8">
          <div className="flex flex-col items-center gap-7 max-w-[391px]">
            <div className="flex flex-col items-center gap-3 w-full">
              <h2 className="text-[rgb(240,247,255)] font-semibold text-4xl leading-tight tracking-tight text-center">
                Skip repetitive filling
              </h2>

              <p className="text-[rgb(204,212,223)] font-normal text-xl leading-relaxed tracking-tight text-center">
                Bring your details from LinkedIn and reuse them anytime on any resume template.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="flex items-center justify-center bg-[rgb(0,95,242)] text-white rounded-xl px-5 py-3 h-11 shadow-sm transition-all hover:bg-[rgb(0,81,217)]"
            >
              <span className="text-lg font-semibold leading-[1.333em] tracking-tight">Auto-fill via Linkedin</span>
            </button>
          </div>
        </div>
      </div>
      <LinkedInModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
