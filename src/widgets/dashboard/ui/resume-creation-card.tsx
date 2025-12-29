import { createResume } from '@entities/resume';
import { useMutation } from '@tanstack/react-query';
import { Upload } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@shared/ui/components/button';
import { FileUpload } from '@widgets/resumes/file-upload';
import { useUserProfile } from '@shared/hooks/use-user';
import StarsIcon from '@shared/icons/stars-icon';
import BuilderIntelligenceModal from './builder-intelligence-modal';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { NewProgressBar, type TransitionText } from '@shared/ui/components/new-progress-bar';
import { trackEvent } from '@shared/lib/analytics/Mixpanel';

const UPLOAD_TRANSITION_TEXTS: TransitionText[] = [
  {
    title: 'Pika Upload',
    subtitle: 'Uploading your resume for curating magic',
  },
  {
    title: 'Pika Extract',
    subtitle: 'Extracting information from your resume',
  },
  {
    title: 'Pika Morph',
    subtitle: 'Organising your data to PikaResume format',
  },
];

interface ResumeCreationCardProps {
  shouldOpenJDModal?: boolean;
}

export default function ResumeCreationCard({ shouldOpenJDModal = false }: ResumeCreationCardProps) {
  const router = useRouter();
  const user = useUserProfile();
  const createResumeMutation = useMutation({
    mutationFn: createResume,
  });

  const [isBuilderIntelligenceModalOpen, setIsBuilderIntelligenceModalOpen] = useState(false);

  const [showJDUpload, setShowJDUpload] = useState(false);
  const [showResumeUpload, setShowResumeUpload] = useState(false);
  const [activeAction, setActiveAction] = useState<'create' | 'upload' | 'tailoredResume' | 'tailoredJD' | null>(null);
  const [optionsLocked, setOptionsLocked] = useState(false);
  const [showScanningOverlay, setShowScanningOverlay] = useState(false);

  const lockOptions = useCallback((action: 'create' | 'upload' | 'tailoredResume' | 'tailoredJD') => {
    setActiveAction(action);
    setOptionsLocked(true);
  }, []);

  const releaseOptions = useCallback(() => {
    setActiveAction(null);
    setOptionsLocked(false);
  }, []);

  const resumeCreateHandler = async () => {
    lockOptions('create');
    setShowScanningOverlay(true);

    trackEvent('create_resume_click', {
      source: 'dashboard_card',
      method: 'from_scratch',
    });

    if (!user.data?.id) {
      setShowScanningOverlay(false);
      releaseOptions();
      return;
    }

    try {
      const data = await createResumeMutation.mutateAsync({
        title: 'Frontend Engineer Resume',
        userInfo: {
          userId: user.data.id,
        },
      });

      router.push(`/resume/${data.id}`);
    } catch (error) {
      console.error('Failed to create resume:', error);
      setShowScanningOverlay(false);
      releaseOptions();
    }
  };

  const handleUploadSuccess = (data: any) => {
    trackEvent('resume_uploaded', {
      source: 'dashboard_card',
      resumeId: data.resumeId,
    });

    setTimeout(() => {
      setShowScanningOverlay(false);
      router.push(`/resume/${data.resumeId}`);
    }, 300);
  };

  const handleUploadError = (error: any) => {
    setShowScanningOverlay(false);
    releaseOptions();
    console.error('Upload error:', error);
  };

  const handleUploadPendingChange = (pending: boolean) => {
    if (pending) {
      lockOptions('upload');
      setShowScanningOverlay(true);
      return;
    }

    if (activeAction === 'upload') {
      setShowScanningOverlay(false);
      releaseOptions();
    }
  };

  const handleOpenTailoredWithJD = () => {
    trackEvent('create_resume_click', {
      source: 'dashboard_card',
      method: 'tailored_with_jd',
    });

    lockOptions('tailoredJD');
    setShowResumeUpload(false);
    setShowJDUpload(true);
    setIsBuilderIntelligenceModalOpen(true);
  };

  // Handle opening JD modal from external trigger (e.g., from landing page JD section)
  useEffect(() => {
    if (shouldOpenJDModal) {
      handleOpenTailoredWithJD();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldOpenJDModal]);

  const closeBuilderIntelligenceModal = useCallback(
    (shouldRelease = true) => {
      setIsBuilderIntelligenceModalOpen(false);
      setShowResumeUpload(false);
      setShowJDUpload(false);

      if (shouldRelease) {
        releaseOptions();
      }
    },
    [releaseOptions],
  );

  const handleCloseBuilderIntelligence = useCallback(() => {
    closeBuilderIntelligenceModal();
  }, [closeBuilderIntelligenceModal]);

  const handleBuilderIntelligenceSubmittingChange = useCallback(
    (isSubmitting: boolean) => {
      if (isSubmitting) {
        setShowScanningOverlay(true);
        closeBuilderIntelligenceModal(false);
        return;
      }

      setShowScanningOverlay(false);
      releaseOptions();
    },
    [closeBuilderIntelligenceModal, releaseOptions],
  );

  const builderIntelligenceModalProps = useMemo(
    () => ({
      isOpen: isBuilderIntelligenceModalOpen,
      onClose: handleCloseBuilderIntelligence,
      showJDUpload,
      showResumeUpload,
      onSubmittingChange: handleBuilderIntelligenceSubmittingChange,
    }),
    [
      handleBuilderIntelligenceSubmittingChange,
      handleCloseBuilderIntelligence,
      isBuilderIntelligenceModalOpen,
      showJDUpload,
      showResumeUpload,
    ],
  );

  const shouldRenderBuilderIntelligenceModal = isBuilderIntelligenceModalOpen;

  const builderIntelligenceModal = useMemo(() => {
    if (!shouldRenderBuilderIntelligenceModal) {
      return null;
    }

    return <BuilderIntelligenceModal {...builderIntelligenceModalProps} />;
  }, [builderIntelligenceModalProps, shouldRenderBuilderIntelligenceModal]);

  // Show NewProgressBar only for upload action
  const showProgressBar = showScanningOverlay && activeAction === 'upload';

  // Show spinner overlay for other actions
  const showSpinnerOverlay = showScanningOverlay && activeAction !== 'upload';

  const overlayConfig = {
    create: {
      title: 'Creating Resume...',
      description: 'Setting up your workspace',
    },
    tailoredJD: {
      title: 'Processing...',
      description: 'Parsing your PDF, mapping it with JD, and preparing suggestions',
    },
    tailoredResume: {
      title: 'Processing...',
      description: 'Parsing your PDF, mapping it with JD, and preparing suggestions',
    },
  };

  const spinnerConfig = activeAction ? overlayConfig[activeAction as keyof typeof overlayConfig] : null;

  return (
    <>
      <NewProgressBar
        isVisible={showProgressBar}
        transitionTexts={UPLOAD_TRANSITION_TEXTS}
        estimatedTime={30000}
        targetProgress={95}
        onComplete={() => {
          // Progress completed, but wait for actual upload to finish
        }}
      />

      <NewProgressBar
        isVisible={showSpinnerOverlay}
        showSpinner={true}
        spinnerTitle={spinnerConfig?.title}
        spinnerSubtitle={spinnerConfig?.description}
      />

      <div className="relative min-w-[600px] h-[277px] bg-white rounded-[20px] shadow-sm overflow-hidden mt-4">
        <div className="relative z-10 m-5 h-[237px] bg-white/10 rounded-2xl border border-dashed border-[rgb(204,212,223)] flex items-center justify-center p-6">
          <div className="w-full">
            {/* Options Grid */}
            <div className="grid grid-cols-3 gap-3">
              {/* From Scratch */}
              <Button
                variant="outline"
                className={`relative h-auto p-4 flex flex-col items-center gap-3 border-2 rounded-xl transition-all group disabled:opacity-50 cursor-pointer hover:shadow-md ${
                  activeAction === 'create'
                    ? 'bg-blue-50 border-blue-500'
                    : 'bg-white border-gray-200 hover:border-blue-500 hover:bg-blue-50 disabled:hover:border-gray-200 disabled:hover:bg-white'
                }`}
                disabled={optionsLocked && activeAction !== 'create'}
                onClick={resumeCreateHandler}
              >
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <StarsIcon />
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">From Scratch</h3>
                  <p className="text-xs text-gray-600">Start with a blank canvas</p>
                </div>
              </Button>

              {/* Upload Resume */}
              <div
                className={`relative h-auto p-4 flex flex-col items-center gap-3 border-2 rounded-xl transition-all group cursor-pointer hover:shadow-md ${
                  activeAction === 'upload' ? 'border-purple-600 bg-purple-100' : 'border-purple-500 bg-purple-50'
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                  <Upload className="w-5 h-5 text-purple-600" />
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">Upload Resume</h3>
                  <p className="text-xs text-gray-600">Import existing resume</p>
                </div>
                <FileUpload
                  onSuccess={handleUploadSuccess}
                  onError={handleUploadError}
                  onPendingChange={handleUploadPendingChange}
                  disabled={optionsLocked && activeAction !== 'upload'}
                  renderAsOverlay={true}
                  onUploadClick={() => {
                    trackEvent('upload_resume_click', {
                      source: 'dashboard_card',
                    });
                  }}
                />
              </div>

              {/* Tailored with JD - Recommended */}
              <Button
                variant="outline"
                className={`relative h-auto p-4 flex flex-col items-center gap-3 border-2 hover:shadow-md rounded-xl transition-all group disabled:opacity-50 cursor-pointer ${
                  activeAction === 'tailoredJD'
                    ? 'bg-gradient-to-br from-green-100 to-blue-100 border-green-600'
                    : 'hover:border-green-500 disabled:hover:border-green-500 disabled:hover:shadow-none'
                }`}
                disabled={optionsLocked && activeAction !== 'tailoredJD'}
                onClick={handleOpenTailoredWithJD}
              >
                <span className="absolute top-2 right-2 bg-green-500 text-white text-[10px] font-medium rounded-full px-2 py-0.5">
                  Recommended
                </span>
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center group-hover:bg-green-200 transition-colors">
                  <StarsIcon />
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">Tailored with JD</h3>
                  <p className="text-xs text-gray-600">AI-optimized for job</p>
                </div>
              </Button>
            </div>

            {/* Template Preview Section */}
          </div>
        </div>
      </div>

      {builderIntelligenceModal}
    </>
  );
}
