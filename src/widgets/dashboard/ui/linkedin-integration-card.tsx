'use client';

import { useParseLinkedInProfile } from '@entities/resume/api/parse-linkedin';
import { Button } from '@shared/ui';
import { Input } from '@shared/ui/components/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@shared/ui/dialog';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface LinkedInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function LinkedInModal({ isOpen, onClose }: LinkedInModalProps) {
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
      <DialogContent className="sm:max-w-[425px] rounded-2xl shadow-xl">
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-2">
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-50">
              <Image src="images/linkedin.svg" alt="linkedin" width={30} height={30} />
            </div>
          </div>

          <DialogTitle className="text-lg font-semibold text-gray-900">
            Use your LinkedIn profile to create a resume
          </DialogTitle>
          <DialogDescription className="text-gray-600 text-sm">
            Paste a link to your LinkedIn profile below. We&apos;ll get started right away.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Input
              id="linkedin-url"
              placeholder="Paste your link here"
              value={linkedinUrl}
              onChange={(e) => {
                setLinkedinUrl(e.target.value);
                setError(null);
              }}
              className={error ? 'border-red-500' : ''}
              disabled={isLoading}
            />
            {displayError && <p className="text-sm text-red-500">{displayError}</p>}
          </div>
        </div>

        <DialogFooter className="flex gap-3">
          <Button variant="outline" onClick={onClose} disabled={isLoading} className="flex-1">
            Back
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={isLoading || !linkedinUrl.trim()}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isLoading ? 'Processing...' : 'Continue'}
          </Button>
        </DialogFooter>
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
