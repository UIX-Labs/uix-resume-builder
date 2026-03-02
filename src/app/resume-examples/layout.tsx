import type { Metadata } from 'next';
import Script from 'next/script';

const DOMAIN_URL = process.env.NEXT_PUBLIC_DOMAIN_URL || 'https://pikaresume.com';

export const metadata: Metadata = {
  title: 'Resume Examples - Professional Resume Samples for Every Industry',
  description:
    'Browse 50+ professional resume examples for every industry and experience level. Get inspired by real resumes and start building your own with Pika Resume.',
  keywords: [
    'resume examples',
    'resume samples',
    'professional resume examples',
    'resume templates',
    'resume inspiration',
    'job resume examples',
  ],
  alternates: {
    canonical: `${DOMAIN_URL}/resume-examples`,
  },
  openGraph: {
    title: 'Resume Examples - Professional Resume Samples | Pika Resume',
    description:
      'Browse professional resume examples for every industry. Get inspired and start building your own resume for free.',
    url: `${DOMAIN_URL}/resume-examples`,
    siteName: 'Pika Resume',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resume Examples - Professional Samples | Pika Resume',
    description:
      'Browse professional resume examples for every industry. Get inspired and build your own resume for free.',
  },
};

export default function ResumeExamplesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script
        id="resume-examples-structured-data"
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for SEO structured data
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Resume Examples',
            description: 'Browse professional resume examples for every industry and experience level.',
            url: `${DOMAIN_URL}/resume-examples`,
            provider: {
              '@type': 'Organization',
              name: 'Pika Resume',
              url: DOMAIN_URL,
            },
          }),
        }}
      />
      {children}
    </>
  );
}
