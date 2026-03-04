import type { Metadata } from 'next';

const DOMAIN_URL = process.env.NEXT_PUBLIC_DOMAIN_URL || 'https://pikaresume.com';

export const metadata: Metadata = {
  title: 'Upload Your Resume',
  description:
    'Upload your existing resume to Pika Resume. Our AI will parse it and help you enhance it with professional templates and smart suggestions.',
  alternates: {
    canonical: `${DOMAIN_URL}/upload-resume`,
  },
  openGraph: {
    title: 'Upload Your Resume | Pika Resume',
    description: 'Upload your existing resume and enhance it with AI-powered suggestions.',
    url: `${DOMAIN_URL}/upload-resume`,
    siteName: 'Pika Resume',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Upload Your Resume | Pika Resume',
    description: 'Upload your existing resume and enhance it with AI-powered suggestions.',
  },
};

export default function UploadResumeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
