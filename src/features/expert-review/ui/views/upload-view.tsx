'use client';

import { useCachedUser } from '@shared/hooks/use-user';
import { Button } from '@shared/ui/button';
import { Upload } from 'lucide-react';
import { useRef } from 'react';
import { CloseButton, ExpertCard, expertCardPositionClasses, experts } from './shared';

const CTA_BUTTON_CLASS =
  'bg-expert-primary hover:bg-expert-primary-hover text-white border border-white font-semibold min-h-12 h-12 px-6 rounded-expert-button text-base shadow-[0_0_0_1px_var(--color-expert-button-ring)] flex items-center justify-center gap-2 w-full sm:w-fit touch-manipulation';

const GEIST_FONT = { fontFamily: 'Geist, sans-serif' } as const;

interface UploadViewProps {
  onUpload: (file: File) => void;
  onSignIn: () => void;
  onClose: () => void;
}

export function UploadView({ onUpload, onSignIn, onClose }: UploadViewProps) {
  const user = useCachedUser();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isLoggedIn = Boolean(user);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onUpload(file);
  };

  return (
    <div className="relative flex w-full min-h-[min(100dvh-2rem,653px)] sm:min-h-[653px] p-6 sm:p-8 md:p-12 bg-transparent text-white overflow-hidden">
      <CloseButton onClick={onClose} />

      <div className="relative z-10 flex w-full flex-1 min-w-0 gap-6 sm:gap-8 md:gap-12">
        <section className="flex flex-col justify-center gap-6 sm:gap-8 max-w-xl sm:max-w-2xl mx-2 sm:ml-4 md:ml-20 mr-2 sm:mr-0 flex-1 min-w-0 flex-shrink -translate-y-5">
          <div className="flex flex-col gap-4 sm:gap-5">
            <h2
              className="text-expert-heading font-semibold leading-[1] tracking-[-0.18px] max-w-lg"
              style={GEIST_FONT}
            >
              <span className="text-[28px] sm:text-[36px] md:text-[44px] block md:whitespace-nowrap">
                Stop Guessing.
              </span>
              <span className="text-[32px] sm:text-[44px] md:text-[56px] block md:whitespace-nowrap">
                Get Expert Feedback.
              </span>
            </h2>
            <p
              className="text-expert-subheading font-normal text-sm sm:text-base leading-[22px] tracking-[-0.18px] max-w-md whitespace-nowrap"
              style={GEIST_FONT}
            >
              Upload your resume and get a detailed manual review from experts.
            </p>
          </div>

          {isLoggedIn ? (
            <>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
              />
              <Button onClick={() => fileInputRef.current?.click()} className={CTA_BUTTON_CLASS} style={GEIST_FONT}>
                Upload Resume
                <Upload className="w-5 h-5 shrink-0" />
              </Button>
            </>
          ) : (
            <Button onClick={onSignIn} className={CTA_BUTTON_CLASS} style={GEIST_FONT}>
              Sign In
            </Button>
          )}
        </section>

        <ExpertCardsSection />
      </div>
    </div>
  );
}

function ExpertCardsSection() {
  return (
    <div className="hidden sm:block relative w-[340px] md:w-[440px] lg:w-[500px] min-h-[600px] flex-shrink-0 pr-2 md:pr-4 lg:pr-8">
      {experts.map((expert, index) => (
        <div key={`${expert.name}-${expert.company}`} className={expertCardPositionClasses[index] ?? 'absolute'}>
          <ExpertCard {...expert} />
        </div>
      ))}
      <div className="absolute md:bottom-5 sm:bottom-0 right-0 flex flex-col items-end gap-1">
        <div className="flex items-end gap-1" style={GEIST_FONT}>
          <div className="flex justify-end">
            <span className="font-black text-5xl leading-[1] tracking-[-0.02px] text-[#E2E2E2]">20+</span>
          </div>
          <div className="flex flex-col items-start gap-1">
            <span
              className="font-semibold text-[16px] leading-[1] tracking-[-0.02px]"
              style={{
                background:
                  'linear-gradient(92.5deg, #E2E2E2 2.09%, rgba(169, 172, 173, 0.731778) 78.4%, rgba(15, 27, 28, 0) 182.62%)',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
              }}
            >
              more experts
            </span>
            <span className="font-normal text-[12px] leading-[1] tracking-[0px] text-[#E0E0E0]">
              from google, zepto, uber
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
