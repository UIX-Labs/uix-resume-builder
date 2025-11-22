import { createResume } from '@entities/resume';
import { useMutation } from '@tanstack/react-query';
import { Upload } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@shared/ui/components/button';
import { FileUpload } from '@widgets/resumes/file-upload';
import { useUserProfile } from '@shared/hooks/use-user';
import StarsIcon from '@shared/icons/stars-icon';
import BuilderIntelligenceModal from './builder-intelligence-modal';
import { useCallback, useMemo, useState } from 'react';

interface ResumeCreationCardProps {
  onBuilderIntelligenceSubmittingChange?: (isSubmitting: boolean) => void;
}

export default function ResumeCreationCard({ onBuilderIntelligenceSubmittingChange }: ResumeCreationCardProps) {
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

    if (!user.data?.id) {
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
      releaseOptions();
    }
  };

  const handleUploadSuccess = (data: any) => {
    setShowScanningOverlay(false);
    router.push(`/resume/${data.resumeId}`);
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
    lockOptions('tailoredJD');
    setShowResumeUpload(false);
    setShowJDUpload(true);
    setIsBuilderIntelligenceModalOpen(true);
  };

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
      onBuilderIntelligenceSubmittingChange?.(isSubmitting);

      if (isSubmitting) {
        closeBuilderIntelligenceModal(false);
        return;
      }

      releaseOptions();
    },
    [closeBuilderIntelligenceModal, onBuilderIntelligenceSubmittingChange, releaseOptions],
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

  const shouldShowScanningOverlay = showScanningOverlay;

  const scanningOverlay = useMemo(() => {
    if (!shouldShowScanningOverlay) {
      return null;
    }

    return (
      <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-[20px]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-lg font-semibold text-gray-800">Uploading Resume...</p>
          <p className="text-sm text-gray-600">Please wait while we process your file</p>
        </div>
      </div>
    );
  }, [shouldShowScanningOverlay]);

  return (
    <>
      <div className="relative min-w-[600px] h-[277px] bg-white rounded-[20px] shadow-sm overflow-hidden mt-4">
        {scanningOverlay}

        <div className="relative z-10 m-5 h-[237px] bg-white/10 rounded-2xl border border-dashed border-[rgb(204,212,223)] flex items-center justify-center p-6">
          <div className="w-full">
            {/* Options Grid */}
            <div className="grid grid-cols-3 gap-3">
              {/* From Scratch */}
              <Button
                variant="outline"
                className="relative h-auto p-4 flex flex-col items-center gap-3 bg-white border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 rounded-xl transition-all group disabled:opacity-50 disabled:hover:border-gray-200 disabled:hover:bg-white"
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
              <div className="relative h-auto p-4 flex flex-col items-center gap-3 bg-white border-2 border-gray-200 hover:border-purple-500 hover:bg-purple-50 rounded-xl transition-all group">
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
                />
              </div>

              {/* Tailored with JD - Recommended */}
              <Button
                variant="outline"
                className="relative h-auto p-4 flex flex-col items-center gap-3 bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-500 hover:border-green-600 hover:shadow-md rounded-xl transition-all group disabled:opacity-50 disabled:hover:border-green-500 disabled:hover:shadow-none"
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
