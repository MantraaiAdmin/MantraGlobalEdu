import nodemailer from 'nodemailer';
import { BUSINESS_CONTACT } from '@mge/config';

function getSmtpConfig() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  const port = Number(process.env.SMTP_PORT || 587);
  const secure = process.env.SMTP_SECURE === 'true';

  return {
    host,
    port,
    secure,
    auth: { user, pass },
    requireTLS: !secure && port === 587,
    tls: {
      minVersion: 'TLSv1.2' as const,
    },
    // Fail fast instead of hanging until the serverless function times out.
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  };
}

export function isSmtpConfigured(): boolean {
  return getSmtpConfig() !== null;
}

export async function sendOtpEmail(to: string, otp: string) {
  const smtp = getSmtpConfig();
  const fromName = process.env.SMTP_FROM_NAME || 'Mantra Global Education';
  const fromEmail = process.env.SMTP_FROM || process.env.SMTP_USER || 'noreply@mantraglobaledu.com';

  if (!smtp) {
    if (process.env.NODE_ENV !== 'production') {
      console.info(`[DEV OTP email] ${to}: ${otp}`);
      return;
    }
    throw new Error('Email delivery is not configured. Contact support.');
  }

  const transporter = nodemailer.createTransport(smtp);

  await transporter.sendMail({
    from: `"${fromName}" <${fromEmail}>`,
    to,
    subject: 'Your Mantra Global Education verification code',
    text: `Your verification code is ${otp}. It expires in 10 minutes.\n\nIf you did not request this, please ignore this email.`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 520px; margin: 0 auto; color: #00234E;">
        <h2 style="color: #00234E; margin-bottom: 8px;">Password Reset Verification</h2>
        <p style="color: #334155; line-height: 1.6;">Use the code below to reset your Mantra Global Education account password. This code expires in <strong>10 minutes</strong>.</p>
        <div style="margin: 24px 0; padding: 16px 24px; background: #F1F5F9; border-left: 4px solid #C89116; font-size: 28px; font-weight: 700; letter-spacing: 6px;">${otp}</div>
        <p style="color: #64748B; font-size: 13px;">If you did not request this code, you can safely ignore this email.</p>
      </div>
    `,
  });
}

export async function sendOtpSms(phone: string, otp: string) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromNumber = process.env.TWILIO_PHONE_NUMBER;

  if (!accountSid || !authToken || !fromNumber) {
    if (process.env.NODE_ENV !== 'production') {
      console.info(`[DEV OTP SMS] ${phone}: ${otp}`);
      return;
    }
    throw new Error('SMS delivery is not configured. Use email OTP or contact support.');
  }

  const body = encodeURIComponent(`Your Mantra Global Education verification code is ${otp}. It expires in 10 minutes.`);
  const to = encodeURIComponent(phone.replace(/\s/g, ''));
  const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `To=${to}&From=${encodeURIComponent(fromNumber)}&Body=${body}`,
  });

  if (!response.ok) {
    throw new Error('Unable to send SMS verification code.');
  }
}

function getMailTransporter() {
  const smtp = getSmtpConfig();
  if (!smtp) return null;
  return nodemailer.createTransport(smtp);
}

/**
 * Microsoft 365 / Outlook only lets an account send as itself, so for those
 * hosts the From address is always the authenticated SMTP_USER mailbox (a
 * different SMTP_FROM is rejected with 554 SendAsDenied). Other providers
 * (Resend, Brevo, SendGrid, SES) use a non-email SMTP_USER and need SMTP_FROM
 * set to an address on a domain verified with that provider.
 */
function getFromAddress() {
  const fromName = process.env.SMTP_FROM_NAME || 'Mantra Global Education';
  const user = process.env.SMTP_USER || '';
  const configured = process.env.SMTP_FROM || '';
  const isMicrosoft = /office365|outlook/i.test(process.env.SMTP_HOST || '');
  const fromEmail = isMicrosoft || !configured ? user : configured;
  return `"${fromName}" <${fromEmail}>`;
}

/** Booking notification recipients. The verified business inbox is always included. */
export function getCounselingNotifyRecipients(): string[] {
  const configured = (process.env.COUNSELING_NOTIFY_EMAILS || '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return [...new Set([BUSINESS_CONTACT.email.toLowerCase(), ...configured])];
}

function describeError(error: unknown): string {
  if (error instanceof Error) {
    const code = (error as Error & { code?: string; responseCode?: number }).code;
    const responseCode = (error as Error & { responseCode?: number }).responseCode;
    return [code, responseCode, error.message].filter(Boolean).join(' — ').slice(0, 300);
  }
  return 'Unknown error';
}

export interface EmailResult {
  sent: boolean;
  error?: string;
}

/** Admin diagnostic: checks the SMTP login and sends a test message to the booking recipients. */
export async function sendTestNotificationEmail(): Promise<EmailResult & { recipients: string[] }> {
  const recipients = getCounselingNotifyRecipients();
  const transporter = getMailTransporter();
  if (!transporter) {
    return { sent: false, recipients, error: 'SMTP is not configured: set SMTP_HOST, SMTP_USER and SMTP_PASS in Vercel.' };
  }
  try {
    await transporter.verify();
    await transporter.sendMail({
      from: getFromAddress(),
      to: recipients.join(', '),
      subject: '[MGE] Test email — counselling notifications',
      text: 'This is a test from the Mantra Global Education admin portal. If you received it, counselling booking notifications are working.',
    });
    return { sent: true, recipients };
  } catch (error) {
    return { sent: false, recipients, error: describeError(error) };
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Sends the team notification and the student confirmation independently, so a
 * failure in one never hides the other. Never throws; returns what happened so
 * the caller can record it on the CRM lead.
 */
export async function sendCounselingBookingEmails(booking: {
  id: string;
  name: string;
  email: string;
  phone: string;
  preferredDate: Date | null;
  countryOfInterest: string | null;
  message: string | null;
}): Promise<{ team: EmailResult; student: EmailResult; recipients: string[] }> {
  const transporter = getMailTransporter();
  const recipients = getCounselingNotifyRecipients();

  const safe = {
    name: escapeHtml(booking.name),
    email: escapeHtml(booking.email),
    phone: escapeHtml(booking.phone),
    country: escapeHtml(booking.countryOfInterest || '—'),
    message: escapeHtml(booking.message || '—').replace(/\n/g, '<br/>'),
  };

  const preferredSlot = booking.preferredDate
    ? booking.preferredDate.toLocaleDateString('en-IN', { dateStyle: 'full', timeZone: 'Asia/Kolkata' })
    : 'Not specified';

  const reference = booking.id.slice(0, 8).toUpperCase();
  const teamBody = `
New free counselling request (ref ${reference})

Name: ${booking.name}
Email: ${booking.email}
Phone: ${booking.phone}
Preferred date: ${preferredSlot}
Country of interest: ${booking.countryOfInterest || 'Not specified'}

${booking.message || ''}

View in Admin Portal → CRM / Leads
https://mantraglobaledu.com/portal/admin/crm
`.trim();

  if (!transporter) {
    const error = 'SMTP is not configured (SMTP_HOST, SMTP_USER and SMTP_PASS are required)';
    console.error(`[counselling email] ${error}. Booking ${reference} was saved but no email was sent.`);
    return { team: { sent: false, error }, student: { sent: false, error }, recipients };
  }

  const team: EmailResult = { sent: false };
  try {
    await transporter.sendMail({
      from: getFromAddress(),
      to: recipients.join(', '),
      replyTo: booking.email,
      subject: `[MGE] New counselling request — ${booking.name}`,
      text: teamBody,
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 560px; color: #00234E;">
        <h2 style="color: #00234E;">New Free Counselling Request</h2>
        <p style="color: #64748B; font-size: 13px;">Reference: ${reference}</p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
          <tr><td style="padding: 8px 0; color: #64748B;">Name</td><td style="padding: 8px 0;"><strong>${safe.name}</strong></td></tr>
          <tr><td style="padding: 8px 0; color: #64748B;">Email</td><td style="padding: 8px 0;"><a href="mailto:${safe.email}">${safe.email}</a></td></tr>
          <tr><td style="padding: 8px 0; color: #64748B;">Phone</td><td style="padding: 8px 0;">${safe.phone}</td></tr>
          <tr><td style="padding: 8px 0; color: #64748B;">Preferred date</td><td style="padding: 8px 0;">${preferredSlot}</td></tr>
          <tr><td style="padding: 8px 0; color: #64748B;">Country</td><td style="padding: 8px 0;">${safe.country}</td></tr>
          <tr><td style="padding: 8px 0; color: #64748B; vertical-align: top;">Details</td><td style="padding: 8px 0;">${safe.message}</td></tr>
        </table>
        <p style="margin-top: 24px;"><a href="https://mantraglobaledu.com/portal/admin/crm" style="background: #00234E; color: #fff; padding: 10px 18px; text-decoration: none; border-radius: 8px;">Open Admin CRM</a></p>
      </div>
    `,
    });
    team.sent = true;
  } catch (error) {
    team.error = describeError(error);
    console.error(`[counselling email] team notification failed for ${reference}:`, team.error);
  }

  const student: EmailResult = { sent: false };
  try {
    await transporter.sendMail({
      from: getFromAddress(),
      to: booking.email,
      replyTo: BUSINESS_CONTACT.email,
      subject: 'We have received your counselling request — Mantra Global Education',
      text: `Hi ${booking.name},\n\nThank you for requesting a free counselling session with Mantra Global Education. Our team will contact you by phone or email to arrange it.\n\nPreferred date: ${preferredSlot}\nCountry of interest: ${booking.countryOfInterest || 'Not specified'}\n\nQuestions? Call ${BUSINESS_CONTACT.phoneDisplay} or reply to this email.\n\nMantra Global Education`,
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 520px; color: #00234E;">
        <h2 style="color: #00234E;">Counselling Request Received</h2>
        <p>Hi ${safe.name},</p>
        <p>Thank you for requesting a <strong>free counselling session</strong> with Mantra Global Education. Our team will contact you by phone or email to arrange it.</p>
        <p><strong>Preferred date:</strong> ${preferredSlot}<br/>
        <strong>Country of interest:</strong> ${safe.country}</p>
        <p>Questions? Call <a href="${BUSINESS_CONTACT.phoneHref}">${BUSINESS_CONTACT.phoneDisplay}</a> or reply to this email.</p>
        <p style="color: #64748B; font-size: 13px;">Mantra Global Education · mantraglobaledu.com</p>
      </div>
    `,
    });
    student.sent = true;
  } catch (error) {
    student.error = describeError(error);
    console.error(`[counselling email] student confirmation failed for ${reference}:`, student.error);
  }

  return { team, student, recipients };
}
