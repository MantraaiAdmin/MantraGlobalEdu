import { BUSINESS_CONTACT } from '@mge/config';
import {
  COUNSELLING_MODES,
  ENGLISH_TEST_STATUSES,
  FUNDING_PREFERENCES,
  STUDY_LEVELS,
  contactEnquirySchema,
  counsellingEnquirySchema,
} from '@/lib/counselling-form';
import { prisma } from './prisma';
import { requireDatabase } from './auth';
import { sendCounselingBookingEmails } from './mailer';

function label(options: readonly { value: string; label: string }[], value?: string) {
  if (!value) return null;
  return options.find((option) => option.value === value)?.label ?? value;
}

/**
 * Stores a counselling enquiry as a booking plus a CRM lead. Optional profile
 * fields are kept in the notes so no database migration is needed.
 */
export async function createCounselingBooking(input: unknown) {
  const parsed = counsellingEnquirySchema.parse(input);
  requireDatabase();
  const preferredDate = parsed.preferredDate ? new Date(`${parsed.preferredDate}T10:00:00+05:30`) : null;
  const validPreferredDate = preferredDate && !Number.isNaN(preferredDate.getTime()) ? preferredDate : null;

  const details = [
    `Counselling mode: ${label(COUNSELLING_MODES, parsed.mode)}`,
    `Study level: ${label(STUDY_LEVELS, parsed.studyLevel)}`,
    `Intended intake: ${parsed.intake}`,
    parsed.qualification ? `Current qualification: ${parsed.qualification}` : null,
    parsed.academicResult ? `Academic result: ${parsed.academicResult}` : null,
    parsed.englishTest ? `English test: ${label(ENGLISH_TEST_STATUSES, parsed.englishTest)}` : null,
    parsed.funding ? `Funding: ${label(FUNDING_PREFERENCES, parsed.funding)}` : null,
    `Marketing consent: ${parsed.marketingConsent ? 'yes' : 'no'}`,
    parsed.message ? `Message: ${parsed.message}` : null,
  ]
    .filter(Boolean)
    .join('\n');

  const booking = await prisma.counselingBooking.create({
    data: {
      name: parsed.name,
      email: parsed.email.toLowerCase(),
      phone: parsed.phone,
      preferredDate: validPreferredDate,
      countryOfInterest: parsed.country,
      message: details,
      status: 'pending',
    },
  });

  const lead = await prisma.lead.create({
    data: {
      name: parsed.name,
      email: parsed.email.toLowerCase(),
      phone: parsed.phone,
      source: 'Book Counselling',
      status: 'NEW',
      countryOfInterest: parsed.country,
      notes: [
        validPreferredDate
          ? `Preferred date: ${validPreferredDate.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' })}`
          : null,
        details,
        `Booking ID: ${booking.id}`,
      ]
        .filter(Boolean)
        .join('\n'),
      assignedTo: BUSINESS_CONTACT.email,
    },
  });

  const email = await sendCounselingBookingEmails({
    id: booking.id,
    name: booking.name,
    email: booking.email,
    phone: booking.phone,
    preferredDate: booking.preferredDate,
    countryOfInterest: booking.countryOfInterest,
    message: booking.message,
  });

  // Record the delivery result on the lead so the team can see it in the CRM.
  const emailStatus = email.team.sent
    ? `Email notification sent to ${email.recipients.join(', ')}`
    : `Email notification FAILED: ${email.team.error}`;
  try {
    await prisma.lead.update({
      where: { id: lead.id },
      data: { notes: `${lead.notes ?? ''}\n${emailStatus}`.trim() },
    });
  } catch (error) {
    console.error('[counselling lead email status]', error);
  }

  return { id: booking.id };
}

export async function createContactInquiry(input: unknown) {
  const parsed = contactEnquirySchema.parse(input);
  requireDatabase();
  const inquiry = await prisma.contactInquiry.create({
    data: {
      name: parsed.name,
      email: parsed.email.toLowerCase(),
      phone: parsed.phone || null,
      subject: parsed.subject,
      message: parsed.message,
    },
  });
  return { id: inquiry.id };
}
