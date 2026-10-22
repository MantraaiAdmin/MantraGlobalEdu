import { z } from 'zod';
import { DESTINATIONS } from '@mge/config';

export const COUNSELLING_MODES = [
  { value: 'online', label: 'Online (video call)' },
  { value: 'phone', label: 'Phone call' },
  { value: 'in-person', label: 'In person in Coimbatore (by arrangement)' },
] as const;

export const STUDY_LEVELS = [
  { value: 'undergraduate', label: 'Undergraduate (bachelor’s)' },
  { value: 'postgraduate', label: 'Postgraduate (master’s)' },
  { value: 'doctorate', label: 'PhD / research' },
  { value: 'diploma', label: 'Diploma / certificate' },
  { value: 'not-sure', label: 'Not sure yet' },
] as const;

export const ENGLISH_TEST_STATUSES = [
  { value: '', label: 'Select (optional)' },
  { value: 'not-started', label: 'Not taken yet' },
  { value: 'preparing', label: 'Preparing / booked' },
  { value: 'completed', label: 'Completed' },
  { value: 'not-required', label: 'May not be required' },
] as const;

export const FUNDING_PREFERENCES = [
  { value: '', label: 'Select (optional)' },
  { value: 'self-family', label: 'Self / family funded' },
  { value: 'education-loan', label: 'Education loan' },
  { value: 'scholarship', label: 'Looking for scholarships' },
  { value: 'mix', label: 'A mix of these' },
  { value: 'not-sure', label: 'Not sure yet' },
] as const;

export const COUNTRY_OPTIONS = [
  ...DESTINATIONS.map((d) => d.name),
  'Undecided / need advice',
] as const;

export function upcomingIntakes(now = new Date()): string[] {
  const year = now.getFullYear();
  const options: string[] = [];
  for (let y = year; y <= year + 2; y += 1) {
    options.push(`January ${y}`, `May ${y}`, `September ${y}`);
  }
  const currentMonth = now.getMonth();
  return [
    ...options.filter((option) => {
      const [month, y] = option.split(' ');
      const monthIndex = ['January', 'May', 'September'].indexOf(month) * 4;
      return Number(y) > year || monthIndex > currentMonth;
    }).slice(0, 6),
    'Not sure yet',
  ];
}

const phoneRegex = /^\+?[0-9\s()-]{8,20}$/;

/** Shared by the client form and the API route so validation can never drift. */
export const counsellingEnquirySchema = z.object({
  name: z.string({ required_error: 'Please enter your full name' }).trim().min(2, 'Please enter your full name').max(120),
  phone: z.string({ required_error: 'Please enter your phone number' }).trim().regex(phoneRegex, 'Please enter a valid phone number, including country code if outside India'),
  email: z.string({ required_error: 'Please enter your email address' }).trim().email('Please enter a valid email address').max(200),
  mode: z.enum(['online', 'phone', 'in-person'], { errorMap: () => ({ message: 'Please choose how you would like to meet' }) }),
  country: z.string({ required_error: 'Please choose a country or region' }).trim().min(1, 'Please choose a country or region').max(80),
  studyLevel: z.enum(['undergraduate', 'postgraduate', 'doctorate', 'diploma', 'not-sure'], {
    errorMap: () => ({ message: 'Please choose your intended study level' }),
  }),
  intake: z.string({ required_error: 'Please choose an intended intake' }).trim().min(1, 'Please choose an intended intake').max(40),
  privacyConsent: z.literal(true, { errorMap: () => ({ message: 'Please confirm you have read the privacy notice' }) }),
  marketingConsent: z.boolean().optional().default(false),
  qualification: z.string().trim().max(200).optional().or(z.literal('')),
  academicResult: z.string().trim().max(100).optional().or(z.literal('')),
  englishTest: z.string().trim().max(40).optional().or(z.literal('')),
  funding: z.string().trim().max(40).optional().or(z.literal('')),
  preferredDate: z.string().trim().max(40).optional().or(z.literal('')),
  message: z.string().trim().max(2000).optional().or(z.literal('')),
});

export type CounsellingEnquiry = z.infer<typeof counsellingEnquirySchema>;

export const contactEnquirySchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name').max(120),
  email: z.string().trim().email('Please enter a valid email address').max(200),
  phone: z.string().trim().regex(phoneRegex, 'Please enter a valid phone number').optional().or(z.literal('')),
  subject: z.string().trim().min(1).max(200),
  message: z.string().trim().min(10, 'Please write at least 10 characters').max(5000),
  privacyConsent: z.literal(true, { errorMap: () => ({ message: 'Please confirm you have read the privacy notice' }) }),
});

/** Fields used only for spam detection; stripped before validation. */
export interface SpamSignals {
  website?: string;
  startedAt?: number;
}
