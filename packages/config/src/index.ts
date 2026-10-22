import { BUSINESS_CONTACT, SITE_URL, MANTRA_AI_DESCRIPTION } from './business';

export * from './business';

export const APP_CONFIG = {
  name: BUSINESS_CONTACT.name,
  shortName: 'Mantra',
  tagline: 'Study abroad guidance with a career-ready profile',
  description: MANTRA_AI_DESCRIPTION,
  metaDescription:
    'Personalised study abroad counselling from Coimbatore and online — course and university selection, applications, scholarship guidance, visa documentation and Mantra.Ai profile development.',
  version: '1.0.0',
  website: SITE_URL,
  supportEmail: BUSINESS_CONTACT.email,
  supportPhone: BUSINESS_CONTACT.phoneDisplay,
} as const;

/** Server/seed only — never expose passwords in client UI */
export const SEED_ADMIN_EMAIL = 'vinodhini@mantraglobaledu.com' as const;

/** Counseling booking notifications (Outlook SMTP) */
export const COUNSELING_NOTIFY_EMAILS = [
  'vinodhini@mantraglobaledu.com',
  'praveen@mantraglobaledu.com',
] as const;

export const PRODUCT_NAMES = {
  profileCheck: 'Mantra Profile Check',
} as const;

export const API_CONFIG = {
  prefix: '/api/v1',
  defaultPageSize: 20,
  maxPageSize: 100,
  rateLimitWindowMs: 15 * 60 * 1000,
  rateLimitMax: 100,
} as const;

export const AUTH_CONFIG = {
  bcryptRounds: 12,
  tokenCookieName: 'mge_token',
  refreshCookieName: 'mge_refresh',
} as const;

export const UPLOAD_CONFIG = {
  maxFileSize: 10 * 1024 * 1024,
  maxFileSizeLabel: '10 MB',
  allowedMimeTypes: [
    'image/jpeg',
    'image/png',
    'image/webp',
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ],
  allowedExtensions: ['PDF', 'JPEG', 'JPG', 'PNG', 'WebP', 'DOCX'],
  acceptAttribute: '.pdf,.jpg,.jpeg,.png,.webp,.docx',
  documentTypes: [
    { value: 'transcript', label: 'Academic Transcript' },
    { value: 'sop', label: 'Statement of Purpose (SOP)' },
    { value: 'lor', label: 'Letter of Recommendation' },
    { value: 'test_score', label: 'Test Score (IELTS/TOEFL/GRE)' },
    { value: 'passport', label: 'Passport Copy' },
    { value: 'resume', label: 'Resume / CV' },
    { value: 'other', label: 'Other Document' },
  ],
} as const;

export const DESTINATIONS = [
  { code: 'US', slug: 'usa', name: 'USA', flag: '🇺🇸' },
  { code: 'GB', slug: 'uk', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'AU', slug: 'australia', name: 'Australia', flag: '🇦🇺' },
  { code: 'CA', slug: 'canada', name: 'Canada', flag: '🇨🇦' },
  { code: 'DE', slug: 'germany', name: 'Germany', flag: '🇩🇪' },
  { code: 'FR', slug: 'france', name: 'France', flag: '🇫🇷' },
  { code: 'IE', slug: 'ireland', name: 'Ireland', flag: '🇮🇪' },
  { code: 'NZ', slug: 'new-zealand', name: 'New Zealand', flag: '🇳🇿' },
  { code: 'SG', slug: 'singapore', name: 'Singapore', flag: '🇸🇬' },
  { code: 'NL', slug: 'netherlands', name: 'Netherlands', flag: '🇳🇱' },
  { code: 'IT', slug: 'italy', name: 'Italy', flag: '🇮🇹' },
  { code: 'CH', slug: 'switzerland', name: 'Switzerland', flag: '🇨🇭' },
  { code: 'AE', slug: 'uae', name: 'UAE', flag: '🇦🇪' },
  { code: 'JP', slug: 'japan', name: 'Japan', flag: '🇯🇵' },
  { code: 'KR', slug: 'south-korea', name: 'South Korea', flag: '🇰🇷' },
  { code: 'MY', slug: 'malaysia', name: 'Malaysia', flag: '🇲🇾' },
  { code: 'SE', slug: 'sweden', name: 'Sweden', flag: '🇸🇪' },
  { code: 'ES', slug: 'spain', name: 'Spain', flag: '🇪🇸' },
  { code: 'FI', slug: 'finland', name: 'Finland', flag: '🇫🇮' },
] as const;

export const SERVICES = [
  { id: 'counseling', slug: 'study-abroad-counselling', title: 'Study Abroad Counselling', icon: 'Compass' },
  { id: 'admissions', slug: 'university-admissions', title: 'University Admissions', icon: 'GraduationCap' },
  { id: 'scholarships', slug: 'scholarship-assistance', title: 'Scholarship Assistance', icon: 'Award' },
  { id: 'visa', slug: 'visa-documentation', title: 'Visa Documentation', icon: 'FileCheck' },
  { id: 'sop-lor', slug: 'sop-lor-support', title: 'SOP & LOR Support', icon: 'FileText' },
  { id: 'loan', slug: 'education-loan-assistance', title: 'Education Loan Assistance', icon: 'Landmark' },
  { id: 'pre-departure', slug: 'pre-departure-support', title: 'Pre-Departure Support', icon: 'Plane' },
  { id: 'career', slug: 'career-guidance', title: 'Career Guidance', icon: 'Briefcase' },
  { id: 'mantra-ai', slug: 'tech-portfolio', title: 'Mantra.Ai Tech Portfolio', icon: 'Laptop' },
] as const;

export const STUDENT_JOURNEY_STEPS = [
  { id: 'assessment', title: 'Career Assessment', description: 'Discover your strengths and career goals' },
  { id: 'shortlisting', title: 'University Shortlisting', description: 'Find universities that match your profile' },
  { id: 'application', title: 'Application Submission', description: 'Submit applications with expert guidance' },
  { id: 'admission', title: 'Admission Offer', description: 'Receive and evaluate admission offers' },
  { id: 'visa', title: 'Visa Processing', description: 'Navigate visa requirements with confidence' },
  { id: 'accommodation', title: 'Accommodation Planning', description: 'Secure comfortable housing abroad' },
  { id: 'pre-departure', title: 'Pre-Departure', description: 'Prepare for your new adventure' },
  { id: 'career-prep', title: 'Career Preparation', description: 'Build skills for global career success' },
  { id: 'alumni', title: 'Alumni Network', description: 'Connect with a global community' },
] as const;

export const RESOURCE_CATEGORIES = [
  { id: 'study-abroad-guides', title: 'Study Abroad Guides', icon: 'BookOpen' },
  { id: 'scholarships', title: 'Scholarships', icon: 'Award' },
  { id: 'visa-updates', title: 'Visa Guidance', icon: 'FileCheck' },
  { id: 'university-guides', title: 'University Guides', icon: 'Building2' },
  { id: 'application-guides', title: 'Application Guides', icon: 'FileText' },
  { id: 'career-guides', title: 'Career Guides', icon: 'Briefcase' },
] as const;

/** @deprecated use BUSINESS_CONTACT — kept for existing imports */
export const CONTACT = {
  supportPhone: BUSINESS_CONTACT.phoneDisplay,
  supportPhoneHref: BUSINESS_CONTACT.phoneHref,
  supportEmail: BUSINESS_CONTACT.email,
  supportEmailHref: BUSINESS_CONTACT.emailHref,
  website: 'mantraglobaledu.com',
  hq: `${BUSINESS_CONTACT.city}, ${BUSINESS_CONTACT.region}`,
} as const;

export const ROUTES = {
  findACourse: '/find-a-course',
  bookCounseling: '/book-counselling',
  coimbatore: '/study-abroad-consultants-coimbatore',
  profileCheck: '/profile-check',
  shortlist: '/shortlist',
  compareCourses: '/compare-courses',
  documentChecklist: '/document-checklist',
} as const;

export const NAVIGATION = {
  public: [
    { label: 'Study Destinations', href: '/countries' },
    { label: 'Find a Course', href: ROUTES.findACourse },
    { label: 'Scholarships', href: '/scholarships' },
    { label: 'Services', href: '/services' },
    { label: 'Resources', href: '/resources' },
    { label: 'About', href: '/about' },
    { label: 'Partners', href: '/partners' },
  ],
  auth: [
    { label: 'Student Login', href: '/login/student' },
    { label: 'Counselor Login', href: '/login/counselor' },
    { label: 'Admin Login', href: '/login/admin' },
  ],
} as const;

export const DEGREE_LEVELS = [
  { value: 'BACHELORS', label: 'Undergraduate' },
  { value: 'MASTERS', label: 'Postgraduate' },
  { value: 'PHD', label: 'Doctorate' },
  { value: 'DIPLOMA', label: 'Diploma' },
  { value: 'CERTIFICATE', label: 'Certificate' },
] as const;

export const INTAKE_PERIODS = [
  { value: 'FALL', label: 'Fall' },
  { value: 'SPRING', label: 'Spring' },
  { value: 'SUMMER', label: 'Summer' },
  { value: 'WINTER', label: 'Winter' },
  { value: 'JANUARY', label: 'January' },
  { value: 'SEPTEMBER', label: 'September' },
] as const;

export const COLORS = {
  primary: '#00234E',
  secondary: '#ffffff',
  accent: '#C89116',
  neutral: '#A5B4C4',
  success: '#10b981',
} as const;

export * from './document-checklist';
