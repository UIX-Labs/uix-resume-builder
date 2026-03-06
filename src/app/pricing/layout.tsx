import { pricingFaqs } from '@/data/pricing-faqs';
import type { Metadata } from 'next';
import Script from 'next/script';

const DOMAIN_URL = process.env.NEXT_PUBLIC_DOMAIN_URL || 'https://pikaresume.com';

export const metadata: Metadata = {
  title: 'Pricing - Simple Plans for Every Job Seeker',
  description:
    'Explore Pika Resume pricing plans. Free AI resume builder, Pro plan with unlimited features at $9/mo, and Expert Review by FAANG professionals starting at $29.',
  keywords: [
    'pika resume pricing',
    'resume builder pricing',
    'AI resume builder cost',
    'resume builder plans',
    'free resume builder',
    'pro resume plan',
    'expert resume review pricing',
    'resume review cost',
    'affordable resume builder',
  ],
  alternates: {
    canonical: `${DOMAIN_URL}/pricing`,
  },
  openGraph: {
    title: 'Pricing - Simple Plans for Every Job Seeker',
    description:
      'Free AI resume builder, Pro plan at $9/mo with unlimited features, and Expert Review by FAANG professionals starting at $29.',
    url: `${DOMAIN_URL}/pricing`,
    siteName: 'Pika Resume',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pricing - Simple Plans for Every Job Seeker | Pika Resume',
    description: 'Free AI resume builder, Pro plan at $9/mo, and Expert Review starting at $29.',
  },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script
        id="pricing-structured-data"
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for SEO structured data
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'Product',
              name: 'Pika Resume',
              description:
                'AI-powered resume builder with professional templates, ATS optimization, and expert reviews',
              url: `${DOMAIN_URL}/pricing`,
              brand: {
                '@type': 'Organization',
                name: 'Pika Resume',
                url: DOMAIN_URL,
              },
              offers: [
                {
                  '@type': 'Offer',
                  name: 'Free Plan',
                  price: '0',
                  priceCurrency: 'USD',
                  description: 'AI Resume Builder, All Templates, LinkedIn Import, 1 PDF Download, 1 Resume Roast',
                },
                {
                  '@type': 'Offer',
                  name: 'Pro Monthly',
                  price: '9',
                  priceCurrency: 'USD',
                  description: 'Unlimited PDF Downloads, Unlimited Roasts, JD Matching, AI Rewrite, Priority Support',
                  priceSpecification: {
                    '@type': 'UnitPriceSpecification',
                    billingDuration: 'P1M',
                  },
                },
                {
                  '@type': 'Offer',
                  name: 'Pro Yearly',
                  price: '59',
                  priceCurrency: 'USD',
                  description: 'All Pro features billed annually at a 45% discount',
                  priceSpecification: {
                    '@type': 'UnitPriceSpecification',
                    billingDuration: 'P1Y',
                  },
                },
                {
                  '@type': 'Offer',
                  name: 'Expert Review',
                  price: '29',
                  priceCurrency: 'USD',
                  description: 'One-time professional resume review by FAANG professionals',
                },
              ],
            },
            {
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: pricingFaqs.map((faq) => ({
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
