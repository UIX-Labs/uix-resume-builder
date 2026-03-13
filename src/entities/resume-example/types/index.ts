export interface ResumeExampleListItem {
  id: string;
  title: string;
  slug: string;
  role: string;
  experienceYears: number;
  primaryColor: string;
  colorName: string;
  layout: string;
  publicThumbnail: { url: string } | null;
  templateImageUrl: string | null;
  category: { slug: string; name: string };
  categories: { id: string; slug: string; name: string }[];
  template: { id: string; json: Record<string, any> | null };
}

export interface ResumeExampleDetail extends ResumeExampleListItem {
  resumeData: Record<string, any>;
  metaTitle: string;
  metaDescription: string;
  similar: ResumeExampleListItem[];
}

export interface PaginatedExamples {
  data: ResumeExampleListItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ExampleCategory {
  id: string;
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  heroHeading: string;
  heroDescription: string;
  defaultFilters: Record<string, any>;
  rank: number;
}

export interface ExampleFilters {
  category?: string;
  role?: string;
  experienceYears?: number;
  primaryColor?: string;
  layout?: string;
  page?: number;
}
