import { useState, useCallback, useEffect, RefObject } from 'react';
import html2canvas from 'html2canvas';
import { toast } from 'sonner';

interface UseRoastSharingProps {
  roastRef: RefObject<HTMLDivElement | null>;
}

export function useRoastSharing({ roastRef }: UseRoastSharingProps) {
  const [isShareAvailable, setIsShareAvailable] = useState(false);

  useEffect(() => {
    setIsShareAvailable(typeof navigator !== 'undefined' && !!navigator.canShare && !!navigator.share);
  }, []);

  const generateCanvasFile = useCallback(async () => {
    if (!roastRef.current) {
      throw new Error('Roast reference not found');
    }

    const canvas = await html2canvas(roastRef.current, {
      backgroundColor: '#ffffff',
      scale: 2,
      useCORS: true,
      onclone: (clonedDoc) => {
        const element = clonedDoc.getElementById('roast-card-content');
        if (element) {
          // Force simple styles to avoid unsupported color functions like oklab
          element.style.backgroundColor = '#ffffff';
          element.style.backdropFilter = 'none';
          element.style.boxShadow = 'none';
          element.style.border = '1px solid #e2e8f0';
          element.style.color = '#334155';
          element.style.position = 'relative';
          element.style.overflow = 'hidden'; // Ensure watermark doesn't spill
        }

        const watermark = clonedDoc.getElementById('roast-watermark');
        if (watermark) {
          watermark.style.opacity = '0.05';
        }
      },
      ignoreElements: (element) => element.classList.contains('cursor-blink'),
    });

    const image = canvas.toDataURL('image/png');

    // Convert Data URL to Blob for Web Share API
    const response = await fetch(image);
    const blob = await response.blob();
    const file = new File([blob], 'pika-resume-roast.png', {
      type: 'image/png',
    });

    return { file, image };
  }, [roastRef]);

  const downloadImage = async (dataUrl?: string) => {
    try {
      let url = dataUrl;
      if (!url) {
        const { image } = await generateCanvasFile();
        url = image;
      }

      if (!url) return;

      const link = document.createElement('a');
      link.href = url;
      link.download = 'pika-resume-roast.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('Roast downloaded! Ready to share.');
    } catch (error) {
      console.error('Download failed', error);
      toast.error('Failed to download image');
    }
  };

  const handleShare = async () => {
    try {
      const { file, image } = await generateCanvasFile();

      if (navigator.share && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            title: 'My Resume Roast by PikaResume 🔥',
            text: 'I just got my resume roasted by AI! Check out what it said... 💀 #PikaResume #ResumeRoast',
            files: [file],
          });
          toast.success('Shared successfully!');
        } catch (shareError) {
          // If share fails, fallback to download
          if ((shareError as Error).name !== 'AbortError') {
            console.error('Web Share API failed, falling back to download', shareError);
            downloadImage(image);
          }
        }
      } else {
        // Fallback for browsers that don't support file sharing
        downloadImage(image);
      }
    } catch (error) {
      console.error('Share failed:', error);
      toast.error('Failed to generate image');
    }
  };

  return {
    isShareAvailable,
    handleShare,
    downloadImage: () => downloadImage(),
  };
}
