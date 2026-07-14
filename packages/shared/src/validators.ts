import { z } from 'zod';
import { UserRole, DegreeLevel, IntakePeriod } from '@mge/types';

export const emailSchema = z.string().email('Invalid email address');
export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number');

export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().max(100).optional().default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
});

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
});

export const registerSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  firstName: z.string().min(1, 'First name is required').max(100),
  lastName: z.string().min(1, 'Last name is required').max(100),
  phone: z.string().optional(),
  role: z.nativeEnum(UserRole).optional().default(UserRole.STUDENT),
});

export const courseSearchSchema = z.object({
  query: z.string().optional(),
  countryId: z.string().uuid().optional(),
  universityId: z.string().uuid().optional(),
  degreeLevel: z.nativeEnum(DegreeLevel).optional(),
  tuitionMin: z.coerce.number().optional(),
  tuitionMax: z.coerce.number().optional(),
  intake: z.nativeEnum(IntakePeriod).optional(),
  duration: z.string().optional(),
  ...paginationSchema.shape,
});

export const scholarshipSearchSchema = z.object({
  countryId: z.string().uuid().optional(),
  universityId: z.string().uuid().optional(),
  courseId: z.string().uuid().optional(),
  academicScore: z.coerce.number().optional(),
  budget: z.coerce.number().optional(),
  ...paginationSchema.shape,
});

export const costEstimateSchema = z.object({
  countryId: z.string().uuid(),
  courseId: z.string().uuid().optional(),
  tuition: z.coerce.number().positive(),
  accommodation: z.coerce.number().nonnegative(),
  livingExpenses: z.coerce.number().nonnegative(),
  visa: z.coerce.number().nonnegative(),
  travel: z.coerce.number().nonnegative(),
  insurance: z.coerce.number().nonnegative(),
  programDurationYears: z.coerce.number().positive().optional().default(1),
});

export const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(200),
  email: emailSchema,
  phone: z.string().optional(),
  subject: z.string().min(1, 'Subject is required').max(200),
  message: z.string().min(10, 'Message must be at least 10 characters').max(5000),
});

export const counselingBookingSchema = z.object({
  name: z.string().min(1, 'Name is required').max(200),
  email: emailSchema,
  phone: z.string().min(1, 'Phone is required'),
  preferredDate: z.string().optional(),
  countryOfInterest: z.string().optional(),
  message: z.string().optional(),
});
