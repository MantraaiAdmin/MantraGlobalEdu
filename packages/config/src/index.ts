export const APP_CONFIG = {
  name: 'Mantra Global Education',
  shortName: 'Mantra',
  tagline: 'Your Journey. Our Guidance. Global Success.',
  description:
    'Explore world-class universities, compare programs, discover scholarships, and confidently plan your international study abroad journey.',
  version: '1.0.0',
  website: 'www.mantraglobaledu.com',
  supportEmail: 'support@mantraglobaledu.com',
  supportPhone: '+1 (800) 123-4567',
} as const;

export const FOUNDER = {
  name: 'Vinodhini Y.',
  title: 'Founder, Mantra Global Education',
} as const;

export const DEMO_ACCOUNTS = {
  admin: 'admin@mantraglobaledu.com',
  counselor: 'counselor@mantraglobaledu.com',
  student: 'student@mantraglobaledu.com',
  password: 'Password123!',
} as const;

export const PRODUCT_NAMES = {
  profileCheck: 'Mantra Profile Check',
} as const;

export const STUDENTS_PLACED_STAT = 'Around 700+' as const;

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
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ],
  allowedExtensions: ['PDF', 'JPEG', 'JPG', 'PNG', 'WebP', 'DOC', 'DOCX'],
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
  { code: 'US', name: 'USA', flag: '🇺🇸' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
] as const;

export const SERVICES = [
  { id: 'counseling', title: 'Study Abroad Counseling', icon: 'Compass' },
  { id: 'admissions', title: 'University Admissions', icon: 'GraduationCap' },
  { id: 'scholarships', title: 'Scholarship Assistance', icon: 'Award' },
  { id: 'visa', title: 'Visa Documentation', icon: 'FileCheck' },
  { id: 'pre-departure', title: 'Pre-Departure Support', icon: 'Plane' },
  { id: 'career', title: 'Career Guidance', icon: 'Briefcase' },
  { id: 'sop-lor', title: 'SOP & LOR Support', icon: 'FileText' },
  { id: 'loan', title: 'Education Loan Assistance', icon: 'Landmark' },
] as const;

export const TRUST_METRICS = [
  { value: '15+', label: 'Top Universities' },
  { value: '3', label: 'Focus Destinations' },
  { value: '40+', label: 'UG & PG Courses' },
  { value: 'Full', label: 'Scholarship Assistance' },
  { value: 'Expert', label: 'Career Guidance' },
  { value: 'Official', label: 'Fee Data from Universities' },
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
  { id: 'guides', title: 'Study Abroad Guides', icon: 'BookOpen' },
  { id: 'visa', title: 'Visa Updates', icon: 'FileCheck' },
  { id: 'scholarships', title: 'Scholarship News', icon: 'Award' },
  { id: 'universities', title: 'University News', icon: 'Building2' },
  { id: 'career', title: 'Career Articles', icon: 'Briefcase' },
] as const;

export const CONTACT = {
  whatsapp: '919876543210',
  whatsappMessage: 'Hi Mantra Global Education, I would like guidance on studying in USA, UK or Australia.',
  supportPhone: '+91 98765 43210',
  supportEmail: 'support@mantraglobaledu.com',
  website: 'mantraglobaledu.com',
  hq: 'Coimbatore, TN',
} as const;

export const ROUTES = {
  findACourse: '/find-a-course',
  bookCounseling: '/book-counseling',
  profileCheck: '/profile-check',
  shortlist: '/shortlist',
  compareCourses: '/compare-courses',
  documentChecklist: '/document-checklist',
} as const;

export const NAVIGATION = {
  public: [
    { label: 'Home', href: '/' },
    { label: 'Countries', href: '/countries' },
    { label: 'Find a Course', href: ROUTES.findACourse },
    { label: 'Scholarships', href: '/scholarships' },
    { label: 'Student Services', href: '/services' },
    { label: 'Resources', href: '/resources' },
    { label: 'Partners', href: '/partners' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
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
