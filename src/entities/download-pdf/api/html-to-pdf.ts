export async function convertHtmlToPdf(html: string): Promise<Blob> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/resume/html-to-pdf`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ html }),
  });

  if (!response.ok) {
    throw new Error('Failed to convert HTML to PDF');
  }

  return response.blob();
}
