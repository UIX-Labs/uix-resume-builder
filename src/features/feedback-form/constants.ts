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
