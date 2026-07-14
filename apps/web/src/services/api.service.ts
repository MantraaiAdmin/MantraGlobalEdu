import type { ApiResponse, PaginatedResponse } from '@mge/types';
import { apiClient } from '@/lib/api';

export interface Country {
  id: string;
  name: string;
  code: string;
  flag: string | null;
  description: string | null;
  tuitionRange: string | null;
  livingCost: string | null;
  visaRequirements: string | null;
  intakePeriods: string[];
  graduateOpportunities: string | null;
}

export interface University {
  id: string;
  name: string;
  slug: string;
  countryId: string;
  logo: string | null;
  campusImage: string | null;
  worldRanking: number | null;
  tuitionMin: number | null;
  tuitionMax: number | null;
  acceptanceRate: number | null;
  description: string | null;
  website: string | null;
  popularPrograms: string[];
  country: Country;
  courses?: Course[];
  scholarships?: Scholarship[];
}

export interface Course {
  id: string;
  name: string;
  slug: string;
  universityId: string;
  degreeLevel: string;
  duration: string;
  tuition: number;
  currency: string;
  intakePeriods: string[];
  eligibility: string | null;
  description: string | null;
  university?: University;
  scholarships?: Pick<Scholarship, 'id' | 'name' | 'awardAmount' | 'currency'>[];
}

export interface Scholarship {
  id: string;
  name: string;
  awardAmount: number;
  currency: string;
  deadline: string;
  eligibility: string;
  requirements: string;
  university?: University | null;
  country?: Country | null;
  course?: Course | null;
}

export interface ContentArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  category: string;
  author: string | null;
  publishedAt: string | null;
}

export interface UniversityFilters {
  search?: string;
  countryId?: string;
  tuitionMin?: number;
  tuitionMax?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface CourseFilters {
  query?: string;
  countryId?: string;
  universityId?: string;
  degreeLevel?: string;
  tuitionMin?: number;
  tuitionMax?: number;
  intake?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface ScholarshipFilters {
  countryId?: string;
  universityId?: string;
  courseId?: string;
  budget?: number;
  page?: number;
  limit?: number;
}

function buildQuery(params: Record<string, string | number | undefined>): string {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== '') searchParams.set(key, String(value));
  });
  const qs = searchParams.toString();
  return qs ? `?${qs}` : '';
}

export async function fetchUniversities(filters: UniversityFilters = {}) {
  const res = await apiClient<ApiResponse<PaginatedResponse<University>>>(
    `/universities${buildQuery(filters as Record<string, string | number | undefined>)}`
  );
  return res.data!;
}

export async function fetchUniversityBySlug(slug: string) {
  const res = await apiClient<ApiResponse<University>>(`/universities/slug/${slug}`);
  return res.data!;
}

export async function fetchCountries(page = 1, limit = 50) {
  const res = await apiClient<ApiResponse<PaginatedResponse<Country>>>(
    `/countries${buildQuery({ page, limit })}`
  );
  return res.data!;
}

export async function fetchCountryByCode(code: string) {
  const res = await apiClient<ApiResponse<Country & { universities: University[] }>>(
    `/countries/${code}`
  );
  return res.data!;
}

export async function fetchCourses(filters: CourseFilters = {}) {
  const res = await apiClient<ApiResponse<PaginatedResponse<Course>>>(
    `/courses${buildQuery(filters as Record<string, string | number | undefined>)}`
  );
  return res.data!;
}

export async function fetchCourseBySlug(slug: string) {
  const res = await apiClient<ApiResponse<Course>>(`/courses/${slug}`);
  return res.data!;
}

export async function fetchScholarships(filters: ScholarshipFilters = {}) {
  const res = await apiClient<ApiResponse<PaginatedResponse<Scholarship>>>(
    `/scholarships${buildQuery(filters as Record<string, string | number | undefined>)}`
  );
  return res.data!;
}

export async function fetchArticles(category?: string) {
  const res = await apiClient<ApiResponse<ContentArticle[]>>(
    `/public/articles${buildQuery({ category })}`
  );
  return res.data!;
}

export async function submitContact(data: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}) {
  return apiClient('/public/contact', { method: 'POST', body: JSON.stringify(data) });
}

export async function bookCounseling(data: {
  name: string;
  email: string;
  phone: string;
  preferredDate?: string;
  countryOfInterest?: string;
  message?: string;
}) {
  return apiClient('/public/counseling', { method: 'POST', body: JSON.stringify(data) });
}

export async function estimateCost(data: {
  countryId: string;
  tuition: number;
  accommodation: number;
  livingExpenses: number;
  visa: number;
  travel: number;
  insurance: number;
  programDurationYears?: number;
}) {
  const res = await apiClient<ApiResponse<{
    annualCost: number;
    totalProgramCost: number;
    estimatedLivingExpenses: number;
    breakdown: Record<string, number>;
  }>>('/public/cost-estimate', { method: 'POST', body: JSON.stringify(data) });
  return res.data!;
}

export async function login(email: string, password: string) {
  const res = await apiClient<ApiResponse<{
    user: { id: string; email: string; firstName: string; lastName: string; role: string };
    accessToken: string;
    refreshToken: string;
  }>>('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
  return res.data!;
}

export async function fetchScholarshipById(id: string) {
  const res = await apiClient<ApiResponse<Scholarship>>(`/scholarships/${id}`);
  return res.data!;
}

export async function fetchArticleBySlug(slug: string) {
  const res = await apiClient<ApiResponse<ContentArticle>>(`/public/articles/${slug}`);
  return res.data!;
}

// Student portal APIs
export async function fetchStudentDashboard(token: string) {
  const res = await apiClient<ApiResponse<{
    student: object;
    stats: {
      totalApplications: number;
      activeApplications: number;
      upcomingAppointments: number;
      documentsUploaded: number;
      unreadNotifications: number;
      savedUniversities: number;
    };
  }>>('/students/dashboard', { token });
  return res.data!;
}

export async function fetchStudentApplications(token: string) {
  const res = await apiClient<ApiResponse<Array<{
    id: string;
    status: string;
    submittedAt: string | null;
    university: University;
    course: Course;
  }>>>('/students/applications', { token });
  return res.data!;
}

export async function fetchStudentDocuments(token: string) {
  const res = await apiClient<ApiResponse<Array<{
    id: string;
    name: string;
    type: string;
    isVerified: boolean;
    uploadedAt: string;
    url: string;
    mimeType: string;
    size: number;
  }>>>('/students/documents', { token });
  return res.data!;
}

export async function fetchStudentAppointments(token: string) {
  const res = await apiClient<ApiResponse<Array<{
    id: string;
    title: string;
    description: string | null;
    scheduledAt: string;
    status: string;
    duration: number;
    counselor: { user: { firstName: string; lastName: string } };
  }>>>('/students/appointments', { token });
  return res.data!;
}

export async function fetchStudentNotifications(token: string) {
  const res = await apiClient<ApiResponse<Array<{
    id: string;
    title: string;
    message: string;
    type: string;
    isRead: boolean;
    createdAt: string;
    link: string | null;
  }>>>('/students/notifications', { token });
  return res.data!;
}

export async function syncFavoriteUniversity(token: string, universityId: string) {
  return apiClient('/students/favorites', {
    method: 'POST',
    token,
    body: JSON.stringify({ universityId }),
  });
}
