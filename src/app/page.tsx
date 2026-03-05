import { LandingPage } from '@widgets/landing-page';
import Script from 'next/script';

const _DOMAIN_URL = process.env.NEXT_PUBLIC_DOMAIN_URL || 'https://pikaresume.com';

const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What makes Pika Resume different from other resume builders?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pika Resume combines AI resume building with expert human review, a fun but insightful Resume Roast, job-description matching, and a reward-based referral system. You do not just build a resume, you optimize it for real job outcomes.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is Pika Intelligence and how does it work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pika Intelligence is our proprietary AI engine that analyzes your resume and compares it directly with your target job description. It identifies missing keywords, weak phrasing, and alignment gaps, then suggests stronger, results-driven, role-specific improvements optimized for ATS systems.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the Resume Roast feature?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Roast feature lets you upload your resume and get brutally honest (but constructive) feedback. We highlight weak bullets, vague achievements, formatting issues, and missed keywords so you know exactly what to fix and why.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the Expert Review feature?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Beyond AI suggestions, you can opt for a professional review where resume experts from companies like Google, Microsoft, and TikTok provide personalized feedback on structure, clarity, impact, and positioning.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Job Description (JD) matching work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Upload your resume along with a job description, and our AI analyzes both to identify missing keywords, skill gaps, and alignment issues. It then suggests stronger, role-specific bullet points and optimizes your resume for ATS systems.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does the referral reward system work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'When you refer friends to Pika Resume, you earn 3 download credits for each successful signup. More referrals mean more resume downloads unlocked, making it easy to benefit while helping others.',
      },
    },
  ],
};

export default function Home() {
  return (
    <div className="w-full h-full">
      <Script
        id="faq-structured-data"
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for SEO structured data
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      <LandingPage />
    </div>
  );
}
