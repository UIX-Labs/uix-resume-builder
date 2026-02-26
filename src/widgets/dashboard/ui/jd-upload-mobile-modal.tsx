'use client';

import { Modal } from '@shared/ui/components/modal';
import { useEffect, useState } from 'react';
// import { useAnalyzeFiles } from '@entities/jd-modal-mobile/hooks/use-analyze-files';
import { useFileUploadHandlers } from '@entities/jd-modal-mobile/hooks/use-file-upload-handlers';
import { MobileTextView } from '@widgets/landing-page/ui/mobile-text-view';
import Image from 'next/image';
import {
  ModalStep,
  ReadyToAnalyzeStep,
  UploadingJDStep,
  UploadingResumeStep,
  UploadJDStep,
  UploadResumeStep,
} from './jd-upload-steps';

interface JDUploadMobileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmittingChange?: (isSubmitting: boolean, hasError?: boolean) => void;
}

export default function JDUploadMobileModal({ isOpen, onClose, onSubmittingChange }: JDUploadMobileModalProps) {
  const [isMobileTextViewOpen, setIsMobileTextViewOpen] = useState(false);

  const {
    currentStep,
    jdFile,
    resumeFile,
    uploadProgress,
    jdFileInputRef,
    resumeFileInputRef,
    handleJDFileSelect,
    handleResumeFileSelect,
    handleRemoveJD,
    handleRemoveResume,
    handleRetryJD,
    handleRetryResume,
    handleResumeSelected,
    resetState,
  } = useFileUploadHandlers();

  // const { isSubmitting, handleRunPikaIntelligence } = useAnalyzeFiles({
  //   onClose,
  //   onSubmittingChange,
  // });

  useEffect(() => {
    if (!isOpen) {
      resetState();
    }
  }, [isOpen, resetState]);

  const handleAnalyze = () => {
    setIsMobileTextViewOpen(true);
  };

  const handleCloseMobileTextView = () => {
    setIsMobileTextViewOpen(false);
    onClose();
  };

  return (
    <>
      <Modal
        isOpen={isOpen && !isMobileTextViewOpen}
        onClose={onClose}
        showCloseButton={true}
        closeButtonVariant="default"
        className="max-w-[90%] w-full h-[812px] max-h-[95vh] border-none overflow-hidden"
        // overlayClassName="bg-black/80"
      >
        <div
          className="relative h-full w-full flex flex-col text-white "
          style={{
            background: 'linear-gradient(136deg, #08994E 30.51%, #171717 65.75%)',
          }}
        >
          <div className="absolute top-0 left-5 right-0 w-[300px] h-[300px] pointer-events-none z-0">
            <Image
              src="/images/jd-modal-bg.png"
              alt=""
              width={100}
              height={200}
              className="w-full h-auto object-cover"
              priority
            />
          </div>

          <div className="relative flex-1 flex flex-col">
            {(() => {
              switch (currentStep) {
                case ModalStep.UPLOAD_JD:
                  return <UploadJDStep jdFileInputRef={jdFileInputRef} onJDFileSelect={handleJDFileSelect} />;

                case ModalStep.UPLOADING_JD:
                  return <UploadingJDStep uploadProgress={uploadProgress} onRemoveJD={handleRemoveJD} jdFile={jdFile} />;

                case ModalStep.UPLOAD_RESUME:
                  return (
                    <UploadResumeStep
                      jdFile={jdFile}
                      resumeFileInputRef={resumeFileInputRef}
                      onResumeFileSelect={handleResumeFileSelect}
                      onRemoveJD={handleRemoveJD}
                      onRetryJD={handleRetryJD}
                      onResumeSelected={handleResumeSelected}
                    />
                  );

                case ModalStep.UPLOADING_RESUME:
                  return <UploadingResumeStep uploadProgress={uploadProgress} onRemoveResume={handleRemoveResume} />;

                case ModalStep.READY_TO_ANALYZE:
                  return (
                    <ReadyToAnalyzeStep
                      jdFile={jdFile}
                      resumeFile={resumeFile}
                      onRemoveJD={handleRemoveJD}
                      onRemoveResume={handleRemoveResume}
                      onRetryJD={handleRetryJD}
                      onRetryResume={handleRetryResume}
                      onRunPikaIntelligence={handleAnalyze}
                      // isSubmitting={isSubmitting}
                    />
                  );

                default:
                  return null;
              }
            })()}
          </div>
        </div>
      </Modal>

      <MobileTextView isOpen={isMobileTextViewOpen} onClose={handleCloseMobileTextView} />
    </>
  );
}
