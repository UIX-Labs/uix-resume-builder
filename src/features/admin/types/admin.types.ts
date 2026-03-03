export interface OverviewStats {
  users: { total: number; daily: number; weekly: number };
  downloads: { total: number; daily: number; weekly: number };
  reviews: { total: number; pending: number; completed: number; daily: number; weekly: number };
  feedbacks: { total: number; daily: number; weekly: number };
  roasts: { total: number; daily: number; weekly: number };
}

export interface TrendPoint {
  date: string;
  count: number;
}

export interface OverviewTrends {
  users: TrendPoint[];
  downloads: TrendPoint[];
  reviews: TrendPoint[];
  feedbacks: TrendPoint[];
  roasts: TrendPoint[];
}

export interface AdminTemplate {
  id: string;
  json: Record<string, any> | null;
  publicImage?: { url: string; expiresAt: Date };
  privateImageUrl?: string;
  rank: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface FeedbackRow {
  userId: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  rating: number | null;
  questions: { question: string | null; answer: string[] | null }[];
  isSubmitted: boolean | null;
  createdAt: string;
}

export interface ReviewRow {
  resumeId: string;
  title: string;
  userId: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  isReviewDone: boolean;
  reviewer: string;
  createdAt: string;
  resumePublicThumbnail?: { url: string };
}

export interface DownloadRow {
  userId: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  downloadsDone: number;
  downloadsAllowed: number;
  downloadsLeft: number;
  latestRating: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface RoastActions {
  share: number;
  download: number;
  fix_and_download: number;
  create_resume: number;
  roast_another: number;
}

export interface RoastRow {
  resumeId: string;
  title: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  roastOutput: string | null;
  roastInputMarkdown: string | null;
  isGuest: boolean;
  actions: RoastActions;
  createdAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface AdminQueryParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
  search?: string;
  status?: string;
  dateFrom?: string;
  dateTo?: string;
  ratingMin?: number;
  ratingMax?: number;
}

export interface ResumeForReview {
  resume: any;
  userEmail: string;
  userName: string;
  isReviewDone: boolean;
  reviewer: string | null;
  existingSuggestions: Record<string, any> | null;
  suggestionsStatus: string | null;
}

export interface ReviewSuggestionItem {
  sectionType: string;
  itemId: string;
  fieldName: string;
  old?: string;
  new: string;
  type: 'spelling_error' | 'sentence_refinement' | 'new_summary' | 'adhoc';
  bulletIndex?: number;
}

export interface AdminResumeExampleCategory {
  id: string;
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[] | null;
  heroHeading: string | null;
  heroDescription: string | null;
  defaultFilters: Record<string, any> | null;
  rank: number;
  createdAt: string;
  updatedAt: string;
}

export interface AdminResumeExample {
  id: string;
  title: string;
  slug: string;
  role: string | null;
  experienceYears: number | null;
  primaryColor: string | null;
  colorName: string | null;
  layout: string;
  isPublished: boolean;
  rank: number;
  categoryId: string;
  categoryName: string | null;
  categorySlug: string | null;
  templateId: string;
  publicThumbnail: { url: string } | null;
  metaTitle: string | null;
  metaDescription: string | null;
  createdAt: string;
}

export interface AdminResumeExampleDetail extends AdminResumeExample {
  resumeData: Record<string, any>;
  category: AdminResumeExampleCategory | null;
  template: { id: string; json: Record<string, any> | null } | null;
}
