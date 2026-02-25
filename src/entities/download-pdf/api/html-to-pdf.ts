export interface DownloadPdfResponse {
  pdf: string;
  filename: string;
  downloadsAllowed: number;
  downloadsDone: number;
  downloadsLeft: number;
}

export interface DownloadPdfErrorResponse {
  statusCode: number;
  message: {
    referralUrl: string;
    downloadsAllowed: number;
    downloadsDone: number;
    downloadsLeft: number;
  };
}

export async function convertHtmlToPdf(
  html: string,
  resumeId?: string,
): Promise<{ blob: Blob; downloadInfo: DownloadPdfResponse }> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/resume/html-to-pdf`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ html, resumeId }),
  });

  if (!response.ok) {
    if (response.status === 403) {
      const errorData: DownloadPdfErrorResponse = await response.json();
      const error = new Error('Download limit reached') as Error & {
        downloadInfo?: DownloadPdfErrorResponse['message'];
      };
      error.downloadInfo = errorData.message;
      throw error;
    }
    throw new Error('Failed to convert HTML to PDF');
  }

  const data: DownloadPdfResponse = await response.json();

  const base64Data = data.pdf;
  const binaryString = atob(base64Data);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  const blob = new Blob([bytes], { type: 'application/pdf' });

  return {
    blob,
    downloadInfo: data,
  };
}
