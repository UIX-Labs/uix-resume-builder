import { convertHtmlToPdf } from '@entities/download-pdf/api';
import { toast } from 'sonner';

const PDF_STYLES = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      />

      <!-- Tailwind CDN -->
      <script src="https://cdn.tailwindcss.com"></script>

      <!-- Inter Font -->
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,700;1,400;1,700&display=swap"
        rel="stylesheet"
      />

      <style>
        /* Global reset */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          transform: translateZ(0); /* keep from second template */
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        body {
          font-family: "Inter", system-ui, sans-serif;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }

        /* From first template */
        .resume-highlight {
          background-color: transparent !important;
          border: none !important;
          padding: 0 !important;
        }

        .resume-highlight > div:first-child {
          display: none !important;
        }

        /* Disable blur effects */
        .blur-\[2px\] {
          filter: none !important;
        }

        /* Resume page breaks — each .resume-page is one PDF page */
        .resume-page {
          page-break-after: always;
          break-after: page;
        }
        .resume-page:last-child {
          page-break-after: auto;
          break-after: auto;
        }

        /* Print rules */
        @media print {
          @page {
            size: A4;
            margin: 0;
          }

          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          body {
            width: 21cm;
            min-height: 100vh;
          }

          .resume-page {
            page-break-after: always;
            break-after: page;
          }
          .resume-page:last-child {
            page-break-after: auto;
            break-after: auto;
          }

          .resume-highlight {
            background: none !important;
            border: none !important;
          }
        }
      </style>
    </head>

    <body>
      {content}
    </body>
  </html>
`;

/**
 * Converts proxy image URLs back to original S3 URLs
 * The proxy URL format is: /api/proxy-image?url=<encoded-original-url>
 * Backend can fetch S3 images directly without CORS issues
 */
function convertProxyUrlsToOriginal(html: string): string {
  // Match both relative and absolute proxy URLs
  // Format: src="/api/proxy-image?url=<encoded-url>" or src="http.../api/proxy-image?url=<encoded-url>"
  return html.replace(/src="(?:https?:\/\/[^"]*)?\/api\/proxy-image\?url=([^"]+)"/g, (_match, encodedUrl) => {
    try {
      const originalUrl = decodeURIComponent(encodedUrl);
      return `src="${originalUrl}"`;
    } catch {
      // If decoding fails, keep the original match
      return _match;
    }
  });
}

/**
 * Prepares HTML content for PDF generation
 * Converts proxy URLs back to original S3 URLs so backend can fetch directly
 */
export function prepareHtmlForPdf(htmlContent: string): string {
  // Convert proxy URLs to original S3 URLs - backend fetches directly without CORS issues
  const processedHtml = convertProxyUrlsToOriginal(htmlContent);

  return PDF_STYLES.replace('{content}', processedHtml);
}

/**
 * Downloads a PDF blob as a file
 */
export function downloadPdfBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Generates and downloads a PDF from HTML content
 */
export async function generatePdfFromHtml(htmlContent: string, filename: string, resumeId?: string): Promise<void> {
  try {
    const styledHtml = prepareHtmlForPdf(htmlContent);
    const pdfBlob = await convertHtmlToPdf(styledHtml, resumeId);
    downloadPdfBlob(pdfBlob, filename);
    toast.success('PDF downloaded successfully');
  } catch (error) {
    console.error('PDF generation error:', error);
    toast.error('Failed to generate PDF');
    throw error;
  }
}
