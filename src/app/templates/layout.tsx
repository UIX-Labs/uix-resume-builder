import type { Metadata } from 'next';
import Script from 'next/script';

const DOMAIN_URL = process.env.NEXT_PUBLIC_DOMAIN_URL || 'https://pikaresume.com';

export const metadata: Metadata = {
  title: 'Free Resume Templates - Professional ATS-Friendly Designs',
  description:
    'Browse professional, ATS-friendly resume templates. Choose from modern designs optimized for applicant tracking systems and start building your resume for free.',
  keywords: [
    'resume templates',
    'free resume templates',
    'ATS resume templates',
    'professional resume templates',
    'CV templates',
    'modern resume designs',
    'ATS-friendly resume',
    'resume template download',
  ],
  alternates: {
    canonical: `${DOMAIN_URL}/templates`,
  },
  openGraph: {
    title: 'Free Resume Templates - Professional ATS-Friendly Designs | Pika Resume',
    description:
      'Browse professional, ATS-friendly resume templates. Choose from modern designs and start building your resume for free.',
    url: `${DOMAIN_URL}/templates`,
    siteName: 'Pika Resume',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Resume Templates - ATS-Friendly Designs | Pika Resume',
    description:
      'Browse professional, ATS-friendly resume templates. Choose from modern designs and build your resume for free.',
  },
};

export default function TemplatesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script
        id="templates-structured-data"
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for SEO structured data
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Free Resume Templates',
            description:
              'Browse professional, ATS-friendly resume templates. Choose from modern designs optimized for applicant tracking systems.',
            url: `${DOMAIN_URL}/templates`,
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
