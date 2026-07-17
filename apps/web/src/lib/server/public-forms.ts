import { counselingBookingSchema } from '@mge/shared';
import { prisma } from './prisma';
import { requireDatabase } from './auth';
import { sendCounselingBookingEmails } from './mailer';

export async function createCounselingBooking(input: {
  name: string;
  email: string;
  phone: string;
  preferredDate?: string;
  countryOfInterest?: string;
  message?: string;
}) {
  requireDatabase();

  const parsed = counselingBookingSchema.parse(input);
  const preferredDate = parsed.preferredDate ? new Date(parsed.preferredDate) : null;

  const booking = await prisma.counselingBooking.create({
    data: {
      name: parsed.name,
      email: parsed.email.toLowerCase(),
      phone: parsed.phone,
      preferredDate,
      countryOfInterest: parsed.countryOfInterest || null,
      message: parsed.message || null,
      status: 'pending',
    },
  });

  const leadNotes = [
    preferredDate
      ? `Preferred slot: ${preferredDate.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`
      : null,
    parsed.message ? `Notes: ${parsed.message}` : null,
    `Booking ID: ${booking.id}`,
  ]
    .filter(Boolean)
    .join('\n');

  await prisma.lead.create({
    data: {
      name: parsed.name,
      email: parsed.email.toLowerCase(),
      phone: parsed.phone,
      source: 'Book Counseling',
      status: 'NEW',
      countryOfInterest: parsed.countryOfInterest || null,
      notes: leadNotes,
      assignedTo: 'vinodhini@mantraglobaledu.com',
    },
  });

  try {
    await sendCounselingBookingEmails({
      id: booking.id,
      name: booking.name,
      email: booking.email,
      phone: booking.phone,
      preferredDate: booking.preferredDate,
      countryOfInterest: booking.countryOfInterest,
      message: booking.message,
    });
  } catch (error) {
    console.error('[counseling booking email]', error);
  }

  return booking;
}
