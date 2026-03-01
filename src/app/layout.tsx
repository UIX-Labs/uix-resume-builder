import type { Metadata } from 'next';
import { Geist, Geist_Mono, Inter } from 'next/font/google';
import Script from 'next/script';
import '../app/globals.css';

import { Providers } from './providers';

import { UserTracker } from '@/shared/lib/analytics/user-tracker';
import { Loader } from '@/shared/ui';
import { AnalyticsProvider } from '@shared/lib/analytics/mixpnel-provider';
import { Suspense } from 'react';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  style: ['normal', 'italic'],
});

const DOMAIN_URL = process.env.NEXT_PUBLIC_DOMAIN_URL || 'https://pikaresume.com';
const LOGO_URL = 'https://res.cloudinary.com/dvrzhxhmr/image/upload/v1765530541/Pika-Resume-logo_tkkeon.webp';

export const metadata: Metadata = {
  title: {
    default: 'Pika Resume - Build AI Powered Resume in Minutes',
    template: '%s | Pika Resume',
  },
  description: 'Choose from practical resume templates and power it with smart resume builder suggestions.',
  metadataBase: new URL(DOMAIN_URL),

  keywords: [
    'AI resume builder',
    'resume templates',
    'professional resume',
    'CV builder',
    'resume maker',
    'free resume builder',
    'ATS resume',
    'resume creator',
    'job application',
    'career tools',
    'resume design',
    'modern resume templates',
    'resume writing',
    'online resume builder',
    'resume generator',
  ],

  alternates: {
    canonical: DOMAIN_URL,
  },

  icons: {
    icon: [
      {
        url: '/images/fav-icons/fav-icon(48*48).png',
        sizes: '48x48',
        type: 'image/png',
      },
      {
        url: '/images/fav-icons/fav-icon(96*96).png',
        sizes: '96x96',
        type: 'image/png',
      },
    ],
    shortcut: '/images/fav-icons/fav-icon(48*48).png',
    apple: [
      {
        url: '/images/fav-icons/fav-icon(108*108).png',
        sizes: '108x108',
        type: 'image/png',
      },
    ],
    other: [
      {
        rel: 'icon',
        url: `${DOMAIN_URL}/images/fav-icons/fav-icon(192*192).png`,
        sizes: '192x192',
        type: 'image/png',
      },
      {
        rel: 'icon',
        url: `${DOMAIN_URL}/images/fav-icons/fav-icon(512*512).png`,
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  },

  // Open Graph SEO
  openGraph: {
    title: 'Pika Resume - Build AI Powered Resume in Minutes',
    description: 'Choose from practical resume templates and power it with smart resume builder suggestions.',
    url: DOMAIN_URL,
    siteName: 'Pika Resume',
    images: [
      {
        url: LOGO_URL,
        width: 1200,
        height: 630,
        alt: 'AI Powered Resume Builder',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'Pika Resume - Build AI Powered Resume in Minutes',
    description: 'Choose from practical resume templates and power it with smart resume builder suggestions.',
    images: [LOGO_URL],
  },

  // LLM Metadata for AI previews
  other: {
    'ai-content':
      'Pika Resume is a free AI-powered resume builder. Create ATS-optimized resumes from scratch, import from LinkedIn, upload and enhance existing resumes, or tailor to job descriptions. Features include AI Resume Roast for instant feedback and Expert Resume Review by professionals from Google, Microsoft, and TikTok.',
    'ai:generate': 'true',
    'ai:description':
      'Free AI resume builder with ATS-optimized templates, LinkedIn import, resume roasting, and expert review by professionals from top companies.',
    'ai:site_type': 'SaaS application',
    'ai:category': 'Career Tools, Resume Builder',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased`}>
        <Script
          id="structured-data"
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for SEO structured data
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                name: 'Pika Resume',
                url: DOMAIN_URL,
                description:
                  'Create professional AI-powered resumes in minutes using modern templates and smart suggestions.',
              },
              {
                '@context': 'https://schema.org',
                '@type': 'Organization',
                name: 'Pika Resume',
                url: DOMAIN_URL,
                logo: {
                  '@type': 'ImageObject',
                  url: LOGO_URL,
                  width: '512',
                  height: '512',
                },
                sameAs: [],
              },
              {
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'Pika Resume',
                applicationCategory: 'BusinessApplication',
                operatingSystem: 'Web',
                url: DOMAIN_URL,
                description:
                  'AI-powered resume builder with professional templates, ATS optimization, and smart suggestions.',
                offers: {
                  '@type': 'Offer',
                  price: '0',
                  priceCurrency: 'USD',
                },
              },
            ]),
          }}
        />
        <AnalyticsProvider />
        <Providers>
          <UserTracker />
          <Suspense fallback={<Loader />}>{children}</Suspense>
        </Providers>
        {/* <Toaster /> */}
      </body>
    </html>
  );
}
