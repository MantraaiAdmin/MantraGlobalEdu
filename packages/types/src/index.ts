export enum UserRole {
  ADMIN = 'ADMIN',
  COUNSELOR = 'COUNSELOR',
  STUDENT = 'STUDENT',
}

export enum ApplicationStatus {
  DRAFT = 'DRAFT',
  SUBMITTED = 'SUBMITTED',
  UNDER_REVIEW = 'UNDER_REVIEW',
  DOCUMENTS_PENDING = 'DOCUMENTS_PENDING',
  OFFER_RECEIVED = 'OFFER_RECEIVED',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  WITHDRAWN = 'WITHDRAWN',
}

export enum AppointmentStatus {
  SCHEDULED = 'SCHEDULED',
  CONFIRMED = 'CONFIRMED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  NO_SHOW = 'NO_SHOW',
}

export enum LeadStatus {
  NEW = 'NEW',
  CONTACTED = 'CONTACTED',
  QUALIFIED = 'QUALIFIED',
  CONVERTED = 'CONVERTED',
  LOST = 'LOST',
}

export enum DegreeLevel {
  BACHELORS = 'BACHELORS',
  MASTERS = 'MASTERS',
  PHD = 'PHD',
  DIPLOMA = 'DIPLOMA',
  CERTIFICATE = 'CERTIFICATE',
}

export enum IntakePeriod {
  JANUARY = 'JANUARY',
  FEBRUARY = 'FEBRUARY',
  MARCH = 'MARCH',
  APRIL = 'APRIL',
  MAY = 'MAY',
  JUNE = 'JUNE',
  JULY = 'JULY',
  AUGUST = 'AUGUST',
  SEPTEMBER = 'SEPTEMBER',
  OCTOBER = 'OCTOBER',
  NOVEMBER = 'NOVEMBER',
  DECEMBER = 'DECEMBER',
  FALL = 'FALL',
  SPRING = 'SPRING',
  SUMMER = 'SUMMER',
  WINTER = 'WINTER',
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface JwtPayload {
  sub: string;
  email: string;
  role: UserRole;
  iat?: number;
  exp?: number;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface Country {
  id: string;
  name: string;
  code: string;
  flag: string;
  description?: string;
  tuitionRange?: string;
  livingCost?: string;
  visaRequirements?: string;
  intakePeriods?: IntakePeriod[];
  graduateOpportunities?: string;
  isActive: boolean;
}

export interface University {
  id: string;
  name: string;
  slug: string;
  countryId: string;
  logo?: string;
  campusImage?: string;
  worldRanking?: number;
  tuitionMin?: number;
  tuitionMax?: number;
  acceptanceRate?: number;
  description?: string;
  website?: string;
  popularPrograms?: string[];
  isActive: boolean;
}

export interface Course {
  id: string;
  name: string;
  slug: string;
  universityId: string;
  degreeLevel: DegreeLevel;
  duration: string;
  tuition: number;
  currency: string;
  intakePeriods: IntakePeriod[];
  eligibility?: string;
  description?: string;
  isActive: boolean;
}

export interface Scholarship {
  id: string;
  name: string;
  universityId?: string;
  countryId?: string;
  courseId?: string;
  awardAmount: number;
  currency: string;
  deadline: string;
  eligibility: string;
  requirements: string;
  isActive: boolean;
}

export interface CourseSearchFilters {
  query?: string;
  countryId?: string;
  universityId?: string;
  degreeLevel?: DegreeLevel;
  tuitionMin?: number;
  tuitionMax?: number;
  intake?: IntakePeriod;
  duration?: string;
}

export interface ScholarshipSearchFilters {
  countryId?: string;
  universityId?: string;
  courseId?: string;
  academicScore?: number;
  budget?: number;
}

export interface CostEstimateInput {
  countryId: string;
  courseId?: string;
  tuition: number;
  accommodation: number;
  livingExpenses: number;
  visa: number;
  travel: number;
  insurance: number;
  programDurationYears?: number;
}

export interface CostEstimateOutput {
  annualCost: number;
  totalProgramCost: number;
  estimatedLivingExpenses: number;
  breakdown: {
    tuition: number;
    accommodation: number;
    livingExpenses: number;
    visa: number;
    travel: number;
    insurance: number;
  };
}

// Phase 2 Extension Point Interfaces (not implemented in MVP)
export interface IAIRecommendationService {
  getUniversityRecommendations(studentId: string): Promise<University[]>;
}

export interface IAIAdvisorService {
  getEducationAdvice(query: string, studentId: string): Promise<string>;
}

export interface IAIResumeBuilderService {
  generateResume(studentId: string): Promise<string>;
}

export interface IAISOPGeneratorService {
  generateSOP(applicationId: string): Promise<string>;
}

export interface IAIDocumentVerificationService {
  verifyDocument(documentId: string): Promise<{ verified: boolean; issues: string[] }>;
}

export interface IAIChatAssistantService {
  chat(message: string, sessionId: string): Promise<string>;
}

export interface IPaymentGatewayService {
  createPayment(amount: number, currency: string, metadata: Record<string, unknown>): Promise<{ paymentId: string }>;
}

export interface IWhatsAppIntegrationService {
  sendMessage(phone: string, message: string): Promise<void>;
}

export interface IEmailAutomationService {
  sendTemplateEmail(templateId: string, to: string, data: Record<string, unknown>): Promise<void>;
}

export interface IAnalyticsEngineService {
  trackEvent(event: string, properties: Record<string, unknown>): Promise<void>;
}
