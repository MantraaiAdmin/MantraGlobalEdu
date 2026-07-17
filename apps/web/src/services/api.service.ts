import type { ApiResponse, PaginatedResponse } from '@mge/types';
import { apiClient } from '@/lib/api';
import {
  getCatalogCountries,
  getCatalogCountryByCode,
  getCatalogUniversities,
  getCatalogUniversityBySlug,
  getCatalogCourses,
  getCatalogCourseBySlug,
  getCatalogScholarships,
  getCatalogScholarshipById,
} from '@/lib/catalog';

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
  return getCatalogUniversities(filters) as PaginatedResponse<University>;
}

export async function fetchUniversityBySlug(slug: string) {
  const university = getCatalogUniversityBySlug(slug);
  if (!university) throw new Error('University not found');
  return university as University;
}

export async function fetchCountries(page = 1, limit = 50) {
  return getCatalogCountries({ page, limit }) as PaginatedResponse<Country>;
}

export async function fetchCountryByCode(code: string) {
  const country = getCatalogCountryByCode(code);
  if (!country) throw new Error('Country not found');
  return country as Country & {
    universities: University[];
    courses: Course[];
    scholarships: Scholarship[];
    popularPrograms: string[];
  };
}

export async function fetchCourses(filters: CourseFilters = {}) {
  return getCatalogCourses(filters) as PaginatedResponse<Course>;
}

export async function fetchCourseBySlug(slug: string) {
  const course = getCatalogCourseBySlug(slug);
  if (!course) throw new Error('Course not found');
  return course as Course;
}

export async function fetchScholarships(filters: ScholarshipFilters = {}) {
  return getCatalogScholarships(filters) as PaginatedResponse<Scholarship>;
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

export async function forgotPassword(identifier: string, channel: 'email' | 'phone') {
  const res = await apiClient<ApiResponse<{ message: string }>>('/auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify({ identifier, channel }),
  });
  return res.data!;
}

export async function verifyPasswordOtp(identifier: string, channel: 'email' | 'phone', otp: string) {
  const res = await apiClient<ApiResponse<{ resetToken: string }>>('/auth/verify-otp', {
    method: 'POST',
    body: JSON.stringify({ identifier, channel, otp }),
  });
  return res.data!;
}

export async function resetPasswordWithToken(resetToken: string, password: string) {
  const res = await apiClient<ApiResponse<{ message: string }>>('/auth/reset-password', {
    method: 'POST',
    body: JSON.stringify({ resetToken, password }),
  });
  return res.data!;
}

export async function fetchAdminUsers(token: string, page = 1, limit = 50) {
  const res = await apiClient<ApiResponse<PaginatedResponse<{
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string | null;
    role: string;
    isActive: boolean;
    createdAt: string;
  }>>>(`/admin/users?page=${page}&limit=${limit}`, { token });
  return res.data!;
}

export async function createAdminUser(
  token: string,
  data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
    role: string;
  }
) {
  const res = await apiClient<ApiResponse<object>>('/admin/users', {
    method: 'POST',
    token,
    body: JSON.stringify(data),
  });
  return res.data!;
}

export async function updateAdminUser(
  token: string,
  userId: string,
  data: Partial<{ firstName: string; lastName: string; phone: string; role: string; isActive: boolean }>
) {
  const res = await apiClient<ApiResponse<object>>(`/admin/users/${userId}`, {
    method: 'PATCH',
    token,
    body: JSON.stringify(data),
  });
  return res.data!;
}

export async function fetchScholarshipById(id: string) {
  const scholarship = getCatalogScholarshipById(id);
  if (!scholarship) throw new Error('Scholarship not found');
  return scholarship as Scholarship;
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
