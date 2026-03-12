export const STEPS = ['Upload PDF', 'Edit Resume Data', 'Metadata', 'Preview & Save'] as const;

export const EMPTY_METADATA = {
  title: '',
  slug: '',
  categoryIds: [] as string[],
  templateId: '',
  role: '',
  experienceYears: '',
  primaryColor: '#2563EB',
  colorName: 'Blue',
  layout: 'two-column',
  metaTitle: '',
  metaDescription: '',
  isPublished: true,
  rank: 0,
};

export type ExampleMetadata = typeof EMPTY_METADATA;

export const EMPTY_PERSONAL_DETAILS = {
  fullName: '',
  email: '',
  phone: '',
  jobTitle: '',
  address: '',
  city: '',
  state: '',
  country: '',
  pincode: '',
  description: '',
  links: {} as Record<string, string>,
};
