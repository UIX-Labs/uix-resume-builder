import { expertReviewFaqs } from '@/data/expert-review-faqs';
import type { Metadata } from 'next';
import Script from 'next/script';

const DOMAIN_URL = process.env.NEXT_PUBLIC_DOMAIN_URL || 'https://pikaresume.com';

export const metadata: Metadata = {
  title: 'Expert Resume Review - Get Feedback from Industry Professionals',
  description:
    'Upload your resume and get a detailed review from professionals at Google, Microsoft, TikTok, and more. Personalized feedback delivered within 3 days.',
  keywords: [
    'expert resume review',
    'professional resume feedback',
    'resume review service',
    'resume critique',
    'resume help',
    'career expert review',
    'resume improvement',
    'professional resume review',
    'get resume reviewed',
    'resume feedback from recruiters',
    'personalized resume review',
    'manual resume review',
  ],
  alternates: {
    canonical: `${DOMAIN_URL}/expert-review`,
  },
  openGraph: {
    title: 'Expert Resume Review - Get Feedback from Industry Professionals',
    description:
      'Upload your resume and get a detailed review from professionals at top companies. Personalized feedback in 3 days.',
    url: `${DOMAIN_URL}/expert-review`,
    siteName: 'Pika Resume',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Expert Resume Review - Feedback from Industry Professionals',
    description: 'Get a detailed, manual resume review from professionals at Google, Microsoft, TikTok, and more.',
  },
};

export default function ExpertReviewLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script
        id="expert-review-structured-data"
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for SEO structured data
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'Service',
              name: 'Expert Resume Review',
              provider: {
                '@type': 'Organization',
                name: 'Pika Resume',
                url: DOMAIN_URL,
              },
              description:
                'Professional resume review by industry experts from top companies like Google, Microsoft, and TikTok.',
              url: `${DOMAIN_URL}/expert-review`,
              serviceType: 'Resume Review',
            },
            {
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: expertReviewFaqs.map((faq) => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: faq.answer,
                },
              })),
            },
          ]),
        }}
      />
      {children}
    </>
  );
}
