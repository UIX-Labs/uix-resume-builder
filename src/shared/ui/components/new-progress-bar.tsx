'use client';

import { useEffect, useState, useMemo } from 'react';
import { Loader2 } from 'lucide-react';

export interface TransitionText {
  title: string;
  subtitle: string;
}

interface NewProgressBarProps {
  isVisible: boolean;
  transitionTexts?: TransitionText[]; // Optional for spinner mode
  estimatedTime?: number; // milliseconds, default 30000 (30 seconds)
  targetProgress?: number; // default 95
  onComplete?: () => void;
  className?: string;
  // Controlled mode: if provided, use external progress and textIndex
  progress?: number; // 0-100
  currentTextIndex?: number; // index for transition text
  showLoader?: boolean; // Show loader icon when progress >= 95
  // Spinner mode: show spinner instead of progress bar
  showSpinner?: boolean;
  spinnerTitle?: string;
  spinnerSubtitle?: string;
}

export function NewProgressBar({
  isVisible,
  transitionTexts = [],
  estimatedTime = 30000,
  targetProgress = 95,
  onComplete,
  className = '',
  progress: externalProgress,
  currentTextIndex: externalTextIndex,
  showLoader = false,
  showSpinner = false,
  spinnerTitle,
  spinnerSubtitle,
}: NewProgressBarProps) {
  const [internalProgress, setInternalProgress] = useState(0);
  const [internalTextIndex, setInternalTextIndex] = useState(0);

  // Use external values if provided (controlled mode), otherwise use internal state (uncontrolled mode)
  const isControlled = externalProgress !== undefined && externalTextIndex !== undefined;
  const progress = isControlled ? externalProgress : internalProgress;
  const currentTextIndex = isControlled ? externalTextIndex : internalTextIndex;

  // Get current transition text or use spinner props
  const currentTransitionText = useMemo(() => {
    if (showSpinner) {
      return {
        title: spinnerTitle || '',
        subtitle: spinnerSubtitle || '',
      };
    }
    if (transitionTexts.length > 0) {
      return transitionTexts[Math.min(currentTextIndex, transitionTexts.length - 1)];
    }
    return { title: '', subtitle: '' };
  }, [transitionTexts, currentTextIndex, showSpinner, spinnerTitle, spinnerSubtitle]);

  // Calculate step counter (0/3 format) - only show if not spinner mode
  const stepCounter = useMemo(() => {
    if (showSpinner || transitionTexts.length === 0) {
      return null;
    }
    const totalSteps = transitionTexts.length - 1;
    const currentStep = Math.min(currentTextIndex, totalSteps);
    return `${currentStep}/${totalSteps}`;
  }, [transitionTexts.length, currentTextIndex, showSpinner]);

  // Simulate progress (only for uncontrolled mode)
  useEffect(() => {
    if (isControlled || !isVisible) {
      if (!isControlled) {
        setInternalProgress(0);
        setInternalTextIndex(0);
      }
      return;
    }

    const PROGRESS_UPDATE_INTERVAL = 100; // Update every 100ms
    const NUMBER_OF_TEXTS = transitionTexts.length;
    const TEXT_INTERVAL = estimatedTime / NUMBER_OF_TEXTS;

    const startTime = Date.now();
    let progressIntervalId: NodeJS.Timeout | null = null;

    progressIntervalId = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const progressPercent = Math.min(
        (elapsedTime / estimatedTime) * targetProgress,
        targetProgress
      );

      // Calculate text index based on elapsed time
      const calculatedTextIndex = Math.min(
        Math.floor(elapsedTime / TEXT_INTERVAL),
        NUMBER_OF_TEXTS - 1
      );

      setInternalProgress(progressPercent);
      setInternalTextIndex(calculatedTextIndex);

      if (progressPercent >= targetProgress) {
        if (progressIntervalId) {
          clearInterval(progressIntervalId);
          progressIntervalId = null;
        }
        onComplete?.();
      }
    }, PROGRESS_UPDATE_INTERVAL);

    return () => {
      if (progressIntervalId) {
        clearInterval(progressIntervalId);
      }
    };
  }, [isVisible, estimatedTime, targetProgress, transitionTexts.length, onComplete, isControlled]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className={`fixed inset-0 z-[9999] flex items-center justify-center bg-white/50 backdrop-blur-sm ${className}`}>
      <div
        className="w-full max-w-3xl px-12 py-8 rounded-[36px] shadow-xl bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/images/progress-bar-bg.svg)',
        }}
      >
        <div className="flex flex-col gap-4 items-center">
          <div className="flex items-center justify-between w-full">
            <div className="flex-1"></div>
            <h3 className="text-white text-2xl font-semibold text-center flex-1 whitespace-nowrap">
              {currentTransitionText.title}
            </h3>
            <div className="flex items-center gap-2 flex-1 justify-end">
              {showLoader && progress >= 95 && progress < 100 && (
                <Loader2 className="h-5 w-5 animate-spin text-white" />
              )}
              {stepCounter && (
                <span className="text-white text-lg font-medium">{stepCounter}</span>
              )}
            </div>
          </div>

          {showSpinner ? (
            <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <div className="w-full bg-white/30 rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-100 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}

          <p className="text-white/90 text-base text-center">
            {currentTransitionText.subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}

