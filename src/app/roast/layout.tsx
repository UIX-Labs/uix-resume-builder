import type { Metadata } from 'next';
import Script from 'next/script';

const DOMAIN_URL = process.env.NEXT_PUBLIC_DOMAIN_URL || 'https://pikaresume.com';

export const metadata: Metadata = {
  title: 'AI Resume Roast - Get Honest Resume Feedback',
  description:
    'Upload your resume and get brutally honest AI-powered feedback. Find out what recruiters really think and fix your resume before applying.',
  keywords: [
    'resume roast',
    'resume review',
    'AI resume feedback',
    'resume critique',
    'resume analysis',
    'resume checker',
    'ATS resume check',
  ],
  alternates: {
    canonical: `${DOMAIN_URL}/roast`,
  },
  openGraph: {
    title: 'AI Resume Roast - Get Honest Resume Feedback',
    description: 'Upload your resume and get brutally honest AI-powered feedback. Fix your resume before applying.',
    url: `${DOMAIN_URL}/roast`,
    siteName: 'Pika Resume',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Resume Roast - Get Honest Resume Feedback',
    description: 'Upload your resume and get brutally honest AI-powered feedback.',
  },
};

export default function RoastLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script
        id="roast-structured-data"
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for SEO structured data
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'AI Resume Roast',
            provider: {
              '@type': 'Organization',
              name: 'Pika Resume',
              url: DOMAIN_URL,
            },
            description:
              'Upload your resume and get brutally honest AI-powered feedback. Find out what recruiters really think and fix your resume before applying.',
            url: `${DOMAIN_URL}/roast`,
            serviceType: 'Resume Feedback',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
          }),
        }}
      />
      {children}
    </>
  );
}
