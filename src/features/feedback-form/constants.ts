export const RATING_MESSAGES: Record<number, string> = {
  1: "Didn't help at all",
  2: 'Needs a lot of improvement',
  3: 'Okay, but nothing special',
  4: 'Really helpful',
  5: 'Loved it',
};

export const IMPROVEMENT_OPTIONS = [
  { id: 'resume_quality', label: 'Resume quality' },
  { id: 'flow_confusing', label: 'Flow was confusing' },
  { id: 'too_many_inputs', label: 'Too many inputs' },
  { id: 'something_else', label: 'Something else' },
];

export const POSITIVE_FEEDBACK_OPTIONS = [
  { id: 'resume_content_wording', label: 'Resume content & wording' },
  { id: 'design_layout', label: 'Design & layout' },
  { id: 'speed_ease', label: 'Speed & ease of use' },
  { id: 'roast_feedback', label: 'Roast / feedback insights' },
];

export const PRICING_OPTIONS = [
  { id: 'free_only', label: 'Free only' },
  { id: '199_499', label: '₹199–₹499' },
  { id: '500_999', label: '₹500–₹999' },
  { id: 'more_if_improves', label: 'More if it improves my chances' },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Akshat Bhargav',
    role: 'TikTok • Senior Software Engineer',
    quote:
      'Pika intelligence helped me build my resume according to the JD. It was ready very quickly and presented my skills clearly.',
    image: '',
  },
  {
    id: 2,
    name: 'Shivam S.',
    role: 'Uber • Senior Product Designer',
    quote:
      '"Pika Resume made my work easier with LinkedIn import. My resume was ready in 3 minutes with good formatting and clear structure.',
    image: '',
  },
  {
    id: 3,
    name: 'Rohan K.',
    role: 'Google • Software Engineer',
    quote: 'If you want to grab a recruiter’s attention, Pika Resume is the way to go.',
    image: '',
  },
];
