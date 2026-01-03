'use client';

import { cn } from '@shared/lib/utils';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { toast } from 'sonner';
import { fetch } from '@shared/api';
import { RoastLoading } from './components/roast-loading';
import { TypewriterRoast } from './components/typewriter-roast';
import { useUserProfile } from '@shared/hooks/use-user';

import { trackEvent } from '@shared/lib/analytics/Mixpanel';
import { RoastFirstSection } from '@widgets/roast/ui/roast-first-section';

import { RoastRoastsSection } from '@widgets/roast/ui/roast-roasts-section';

// export function generateRandomEmail() {
//   const chars = "abcdefghijklmnopqrstuvwxyz1234567890";
//   let string = "";
//   for (let i = 0; i < 15; i++) {
//     string += chars[Math.floor(Math.random() * chars.length)];
//   }
//   return string + "@guestuser.in";
// }

export default function RoastPage() {
  const { data: user } = useUserProfile();
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [data, setData] = useState<{ roast: string; resumeId: string } | null>(null);

  const roastResume = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      if (!user?.isLoggedIn) {
        const randomGuestEmail = `guest_${crypto.randomUUID()}@guestuser.in`;
        localStorage.setItem('pending_analyzer_guest_email', randomGuestEmail);
        formData.append('guestEmail', randomGuestEmail);
      }

      const response = await fetch<{ roast: string; resumeId: string }>('resume/roast', {
        options: {
          method: 'POST',
          body: formData,
        },
      });
      return response;
    } catch (error) {
      console.error('Error roasting resume:', error);
      throw new Error('Failed to roast resume');
    }
  };

  const { mutate: roastResumeMutation, isPending } = useMutation({
    mutationFn: roastResume,
    onSuccess: (data) => {
      toast.success('Resume roasted successfully');
      setData(data);
      trackEvent('roast_resume_success', {
        timestamp: new Date().toISOString(),
      });
    },
    onError: () => {
      toast.error('Failed to roast resume');
    },
  });
  const shouldHideOverflow = !data || isPending;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  function handleFileUpload(file: File) {
    roastResumeMutation(file);
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];

    if (file) {
      handleFileUpload(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const onUploadClick = () => {
    fileInputRef.current?.click();
    trackEvent('roast_resume_upload_click', {
      timestamp: new Date().toISOString(),
    });
  };

  const handleUploadKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onUploadClick();
    }
  };

  return (
    <div
      className={cn(
        'relative min-h-screen bg-black w-full font-sans overflow-x-hidden',
        shouldHideOverflow && 'overflow-hidden',
      )}
    >
      <div
        className="fixed inset-0 z-[2] pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 0% 0%, #005FF2 0%, transparent 45%)',
        }}
      />

      <RoastFirstSection />
      <RoastRoastsSection />

      {/* Flame Video */}
      <div className="fixed inset-0 w-full h-full z-[1] pointer-events-none mix-blend-screen">
        {/* Mobile Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-bottom opacity-100 md:hidden"
        >
          <source src="/videos/flame.mp4" type="video/mp4" />
        </video>

        {/* Desktop Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="hidden md:block w-full h-full object-cover object-bottom opacity-100"
        >
          <source src="/videos/flame-desktop.mp4" type="video/mp4" />
        </video>
      </div>

      <main className="relative z-10 w-full min-h-screen flex flex-col">
        {/* <Header /> */}
        <div className="flex flex-col items-center w-full pb-8 md:mt-10 md:pb-12 lg:pt-8 lg:pb-4 px-5 flex-1 ">
          <div className="flex flex-col items-center justify-between gap-18">
            <div className="flex flex-col items-center justify-between gap-1 w-full md:w-1/2">
              <h1 className="text-lg lg:text-2xl font-normal leading-tight text-center text-white md:w-120">
                Your resume is holding you back.
              </h1>

              <span className="text-5xl md:text-6xl rounded-full text-white font-semibold shadow-lg md:w-[500px] py-1.5 lg:py-1 px-4 text-center">
                Let’s roast it. Then fix it.
              </span>
            </div>
          </div>

          {isPending ? (
            <div className="w-full md:w-1/2 mt-6 lg:mt-3">
              <RoastLoading />
            </div>
          ) : data ? (
            <div className="w-full md:w-1/2 mt-6 lg:mt-3 mb-8 lg:mb-4">
              <TypewriterRoast
                content={data.roast || ''}
                resumeId={data.resumeId}
                onRoastAnother={() => setData(null)}
              />
            </div>
          ) : (
            <div className="relative w-full md:w-1/2 mt-20 lg:mt-18 flex justify-center">
              <div className="absolute -top-16 left-0 right-0 pointer-events-none">
                {/* Left image */}
                <Image
                  src="/images/backimg.png"
                  alt=""
                  width={180}
                  height={180}
                  className="absolute -left-10 top-0 opacity-80 md:left-10 md:scale-125
"
                />

                {/* Right image */}
                <Image
                  src="/images/backimg.png"
                  alt=""
                  width={180}
                  height={180}
                  className="absolute -right-10 top-0 opacity-80 rotate-[22deg] md:right-10 md:scale-125
"
                />
              </div>

              <div
                className={cn(
                  'relative border-2 border-dashed z-10 border-[#C66101] border-b-0 rounded-[16px] px-6 pt-20 py-6 lg:px-11 lg:py-11 shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] flex flex-col items-center justify-center transition-colors cursor-pointer mt-6 lg:mt-3 w-full md:w-1/2',
                  isDragging ? 'border-[#005ff2]' : 'hover:opacity-95',
                )}
                style={{
                  background: 'linear-gradient(180deg, #0D0600 0%, #B35802 100%)',
                }}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={onUploadClick}
                onKeyDown={handleUploadKeyDown}
                role="button"
                tabIndex={0}
              >
                <input type="file" ref={fileInputRef} onChange={handleFileSelect} className="hidden" accept=".pdf" />
                <h2 className="text-[#FFA855] text-2xl lg:text-[30px] font-semibold mb-1.5 lg:mb-1">Roast My Resume</h2>

                <div className=" w-12 h-12 lg:w-11 lg:h-11 rounded-full flex items-center justify-center mb-2 lg:mb-2">
                  <div className="relative w-11 h-11">
                    <Image src="/images/upload-cloud.svg" alt="Upload" fill className="object-contain" />{' '}
                  </div>
                </div>

                <p className="text-[#FFA855] text-sm mb-3 lg:mb-2 lg:text-lg">Select File from device</p>
                <p className="text-[#FFA855]/70 text-xs mt-1">JPEG and PDF formats, up to 5MB</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
