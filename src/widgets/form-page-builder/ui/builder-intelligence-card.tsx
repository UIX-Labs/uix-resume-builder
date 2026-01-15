import { useUserProfile } from '@shared/hooks/use-user';
import { Button } from '@shared/ui/button';
import { AuthRedirectModal } from '@shared/ui/components/auth-redirect-modal';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useState } from 'react';

interface BuilderIntelligenceCardProps {
  isAnalyzed: boolean;
  isAnalyzing: boolean;
  isTailoredWithJD: boolean;
  onAnalyze: () => void;
}

export function BuilderIntelligenceCard({
  isAnalyzed,
  isAnalyzing,
  isTailoredWithJD,
  onAnalyze,
}: BuilderIntelligenceCardProps) {
  const { data: user } = useUserProfile();
  const params = useParams();
  const resumeId = params?.id as string;

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authRedirectUrl, setAuthRedirectUrl] = useState('');

  if (isTailoredWithJD) return null;

  const handleAnalyzeClick = () => {
    // Guest users must login to use Pika Intelligence
    if (!user?.isLoggedIn) {
      localStorage.setItem('pending_analyzer_resume_id', resumeId);
      const callbackUrl = encodeURIComponent(window.location.pathname);
      setAuthRedirectUrl(`/auth?callbackUrl=${callbackUrl}`);
      setIsAuthModalOpen(true);
      return;
    }
    onAnalyze();
  };

  if (isAnalyzed) {
    return (
      <div className="w-[200px] mt-4 mx-auto mb-2">
        <Image
          src="/images/pika-intelligence.svg"
          alt="Pika Intelligence"
          width={217}
          height={72}
          className="w-full h-auto"
        />
      </div>
    );
  }

  return (
    <>
      <div
        className="w-[200px] rounded-2xl p-3 mt-4 mx-auto mb-2"
        style={{
          backgroundImage: "url('/images/bg-gradient.svg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <p className="text-sm font-semibold text-white">Switch to Pika Intelligence</p>
        <p className="text-[11px] font-normal text-white/80 mt-1">
          Get grammar fixes, stronger verbs, and tailored improvements.
        </p>

        <Button
          className="w-full mt-3 bg-[#02A44F] hover:bg-[#028a42] h-8 text-white text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer border-2 border-white"
          onClick={handleAnalyzeClick}
          disabled={isAnalyzing}
        >
          {isAnalyzing ? (
            'Analyzing...'
          ) : (
            <>
              Pika Intelligence
              <Image src="/images/rat.png" alt="Pika Intelligence" width={40} height={40} />
            </>
          )}
        </Button>
      </div>

      <AuthRedirectModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        redirectUrl={authRedirectUrl}
        title="Login Required"
        description="You need to login to use Pika Intelligence."
      />
    </>
  );
}
