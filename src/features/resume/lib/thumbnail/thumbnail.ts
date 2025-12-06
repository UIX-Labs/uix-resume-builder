import html2canvas from 'html2canvas';

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
async function waitForImagesToLoad(element: HTMLElement, timeoutMs: number = 5000): Promise<void> {
  const images = Array.from(element.querySelectorAll('img'));

  console.log(`Found ${images.length} images to wait for`);

  if (images.length === 0) {
    return Promise.resolve();
  }

  // Log image details for debugging
  images.forEach((img, index) => {
    const isProxied = img.src.includes('/api/proxy-image');
    const isExternal = img.src.startsWith('http://') || img.src.startsWith('https://');
    console.log(`Image ${index + 1}:`, {
      isProxied,
      isExternal: isExternal && !isProxied,
      src: img.src.substring(0, 100) + (img.src.length > 100 ? '...' : ''),
    });
  });

  const imagePromises = images.map((img, index) => {
    // If image is already loaded, resolve immediately
    if (img.complete && img.naturalHeight !== 0) {
      console.log(`Image ${index + 1} already loaded:`, img.src);
      return Promise.resolve();
    }

    console.log(`Waiting for image ${index + 1} to load:`, img.src);

    // Otherwise wait for load/error event
    return new Promise<void>((resolve) => {
      const timeout = setTimeout(() => {
        console.warn(`Image ${index + 1} load timeout:`, img.src);
        resolve();
      }, timeoutMs);

      img.onload = () => {
        console.log(`Image ${index + 1} loaded successfully:`, img.src);
        clearTimeout(timeout);
        resolve();
      };

      img.onerror = () => {
        console.warn(`Image ${index + 1} failed to load:`, img.src);
        clearTimeout(timeout);
        resolve(); // Resolve anyway to not block thumbnail generation
      };
    });
  });

  await Promise.all(imagePromises);
  console.log('All images processed');
}

export async function generateThumbnail(element: HTMLElement, options: ThumbnailOptions = {}): Promise<string | null> {
  const { backgroundColor = 'white' } = options;

  try {
    console.log('generateThumbnail: Element dimensions:', {
      width: element.clientWidth,
      height: element.clientHeight,
      scrollHeight: element.scrollHeight,
    });

    // Wait for all images to load before capturing
    await waitForImagesToLoad(element);

    console.log('generateThumbnail: Starting html2canvas capture...');

    // Use CORS to capture images without tainting the canvas
    // Requires S3 bucket to have CORS configuration allowing the domain
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

    console.log('generateThumbnail: Canvas created:', {
      width: canvas.width,
      height: canvas.height,
    });

    const dataUrl = canvas.toDataURL('image/png', 1);
    console.log('generateThumbnail: DataURL generated, length:', dataUrl.length);

    return dataUrl;
  } catch (error) {
    console.error('Failed to generate thumbnail:', error);
    return null;
  }
}
