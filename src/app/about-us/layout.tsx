import type { Metadata } from 'next';

const DOMAIN_URL = process.env.NEXT_PUBLIC_DOMAIN_URL || 'https://pikaresume.com';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Pika Resume — the AI-powered resume builder helping job seekers create professional, ATS-friendly resumes in minutes.',
  alternates: {
    canonical: `${DOMAIN_URL}/about-us`,
  },
  openGraph: {
    title: 'About Us | Pika Resume',
    description:
      'Learn about Pika Resume — the AI-powered resume builder helping job seekers create professional resumes.',
    url: `${DOMAIN_URL}/about-us`,
    siteName: 'Pika Resume',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us | Pika Resume',
    description: 'Learn about Pika Resume — the AI-powered resume builder.',
  },
};

export default function AboutUsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
