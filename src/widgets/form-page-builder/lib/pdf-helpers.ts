import { convertHtmlToPdf } from "@entities/download-pdf/api";
import { toast } from "sonner";
import * as Sentry from "@sentry/nextjs";

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

        /* Print rules */
        @media print {
          @page {
            size: A4;
            margin: 0;
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
 * Prepares HTML content for PDF generation
 */
export function prepareHtmlForPdf(htmlContent: string): string {
  // Convert relative proxy URLs to absolute URLs for backend PDF generation
  const currentOrigin = window.location.origin;
  const processedHtml = htmlContent.replace(
    /src="\/api\/proxy-image/g,
    `src="${currentOrigin}/api/proxy-image`
  );

  return PDF_STYLES.replace("{content}", processedHtml);
}

/**
 * Downloads a PDF blob as a file
 */
export function downloadPdfBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
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
export async function generatePdfFromHtml(
  htmlContent: string,
  filename: string,
  resumeId?: string
): Promise<void> {
  try {
    const styledHtml = prepareHtmlForPdf(htmlContent);
    const pdfBlob = await convertHtmlToPdf(styledHtml, resumeId);
    downloadPdfBlob(pdfBlob, filename);
    toast.success("PDF downloaded successfully");
  } catch (error) {
    console.error("PDF generation error:", error);
    Sentry.captureException(error);
    toast.error("Failed to generate PDF");
    throw error;
  }
}
