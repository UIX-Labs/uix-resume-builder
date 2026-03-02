export interface PricingTier {
  id: 'free' | 'pro' | 'expert-review';
  name: string;
  tagline: string;
  price:
    | {
        type: 'recurring';
        monthly: number;
        yearly: number;
        inr: { monthly: number; yearly: number };
      }
    | {
        type: 'one-time';
        amount: number;
        inr: number;
      };
  features: string[];
  excluded?: string[];
  highlighted?: boolean;
  ctaLabel: string;
  ctaHref: string;
  accentColor: string;
}

export interface FeatureRow {
  label: string;
  free: string | boolean;
  pro: string | boolean;
  expertReview: string | boolean;
}

export const pricingTiers: PricingTier[] = [
  {
    id: 'free',
    name: 'Free',
    tagline: 'Everything you need to get started',
    price: {
      type: 'recurring',
      monthly: 0,
      yearly: 0,
      inr: { monthly: 0, yearly: 0 },
    },
    features: [
      'AI Resume Builder',
      'All templates accessible',
      'LinkedIn Import',
      '1 PDF download',
      '1 Resume Roast',
    ],
    excluded: ['JD Matching', 'AI Rewrite Suggestions', 'Priority Support'],
    ctaLabel: 'Get Started Free',
    ctaHref: '/auth',
    accentColor: '#171717',
  },
  {
    id: 'pro',
    name: 'Pro',
    tagline: 'For serious job seekers',
    price: {
      type: 'recurring',
      monthly: 9,
      yearly: 59,
      inr: { monthly: 249, yearly: 1499 },
    },
    features: [
      'Everything in Free',
      'Unlimited PDF downloads',
      'Unlimited Resume Roasts',
      'Unlimited JD Matching',
      'AI Rewrite Suggestions',
      'Multiple resumes',
      'Priority Support',
    ],
    highlighted: true,
    ctaLabel: 'Start Pro Plan',
    ctaHref: '/auth',
    accentColor: '#005FF2',
  },
  {
    id: 'expert-review',
    name: 'Expert Review',
    tagline: 'One-time add-on',
    price: {
      type: 'one-time',
      amount: 29,
      inr: 999,
    },
    features: [
      'Line-by-line FAANG review',
      '3 business day turnaround',
      'Detailed feedback document',
      'ATS compatibility check',
      '1 follow-up question',
    ],
    ctaLabel: 'Get Expert Review',
    ctaHref: '/expert-review',
    accentColor: '#00BA34',
  },
];

export const expertReviewBundles = [
  {
    id: 'single',
    name: 'Single Review',
    price: 29,
    inr: 999,
    description: 'One detailed resume review',
    savings: null,
  },
  {
    id: 'revision',
    name: 'Review + Revision',
    price: 45,
    inr: 1499,
    description: 'Initial review plus one follow-up revision',
    savings: 13,
  },
  {
    id: 'three-pack',
    name: '3-Pack Reviews',
    price: 69,
    inr: 2299,
    description: 'Three reviews for different roles',
    savings: 18,
  },
];

export const featureComparisonRows: FeatureRow[] = [
  { label: 'AI Resume Builder', free: true, pro: true, expertReview: false },
  { label: 'All Templates', free: true, pro: true, expertReview: false },
  { label: 'LinkedIn Import', free: true, pro: true, expertReview: false },
  { label: 'PDF Downloads', free: '1 free', pro: 'Unlimited', expertReview: false },
  { label: 'Resume Roast', free: '1 free', pro: 'Unlimited', expertReview: false },
  { label: 'JD Matching', free: false, pro: 'Unlimited', expertReview: false },
  { label: 'AI Rewrite Suggestions', free: false, pro: true, expertReview: false },
  { label: 'Multiple Resumes', free: false, pro: true, expertReview: false },
  { label: 'Priority Support', free: false, pro: true, expertReview: false },
  { label: 'Line-by-line Expert Review', free: false, pro: false, expertReview: true },
  { label: 'Detailed Feedback Document', free: false, pro: false, expertReview: true },
  { label: 'ATS Compatibility Check', free: false, pro: false, expertReview: true },
  { label: 'Follow-up Question', free: false, pro: false, expertReview: '1 included' },
  { label: 'Turnaround Time', free: false, pro: false, expertReview: '3 business days' },
];
