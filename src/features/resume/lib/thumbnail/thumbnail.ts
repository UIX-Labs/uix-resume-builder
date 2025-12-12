import html2canvas from "html2canvas";
import * as Sentry from "@sentry/nextjs";

export type ThumbnailOptions = {
  width?: number;
  height?: number;
  aspectRatio?: number;
  backgroundColor?: string;
};

/**
 * Waits for all images in the element to finish loading
 * Returns a promise that resolves when all images are loaded or timeout occurs
 */
async function waitForImagesToLoad(
  element: HTMLElement,
  timeoutMs: number = 5000
): Promise<void> {
  const images = Array.from(element.querySelectorAll("img"));

  if (images.length === 0) {
    return Promise.resolve();
  }

  const imagePromises = images.map((img, index) => {
    // If image is already loaded, resolve immediately
    if (img.complete && img.naturalHeight !== 0) {
      return Promise.resolve();
    }

    // Otherwise wait for load/error event
    return new Promise<void>((resolve) => {
      const timeout = setTimeout(() => {
        resolve();
      }, timeoutMs);

      img.onload = () => {
        clearTimeout(timeout);
        resolve();
      };

      img.onerror = () => {
        clearTimeout(timeout);
        resolve(); // Resolve anyway to not block thumbnail generation
      };
    });
  });

  await Promise.all(imagePromises);
}

export async function generateThumbnail(
  element: HTMLElement,
  options: ThumbnailOptions = {}
): Promise<string | null> {
  const { backgroundColor = "white" } = options;

  try {
    // Wait for all images to load before capturing
    await waitForImagesToLoad(element);

    // Use CORS to capture images without tainting the canvas
    const canvasPromise = html2canvas(element, {
      useCORS: true,
      allowTaint: false,
      backgroundColor: backgroundColor,
      logging: false,
      width: element.clientWidth,
      height: element.clientHeight,
      scale: 0.6,
    });

    const canvas = await canvasPromise;
    const dataUrl = canvas.toDataURL("image/png", 1);

    return dataUrl;
  } catch (error) {
    console.error("Failed to generate thumbnail:", error);
    Sentry.captureException(error);
    return null;
  }
}
