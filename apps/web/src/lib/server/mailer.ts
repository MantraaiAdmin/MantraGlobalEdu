import nodemailer from 'nodemailer';

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

function getFromAddress() {
  const fromName = process.env.SMTP_FROM_NAME || 'Mantra Global Education';
  const fromEmail = process.env.SMTP_FROM || process.env.SMTP_USER || 'noreply@mantraglobaledu.com';
  return `"${fromName}" <${fromEmail}>`;
}

export async function sendCounselingBookingEmails(booking: {
  id: string;
  name: string;
  email: string;
  phone: string;
  preferredDate: Date | null;
  countryOfInterest: string | null;
  message: string | null;
}) {
  const transporter = getMailTransporter();
  const notifyEmails = (process.env.COUNSELING_NOTIFY_EMAILS || '')
    .split(',')
    .map((e) => e.trim())
    .filter(Boolean);

  const recipients =
    notifyEmails.length > 0
      ? notifyEmails
      : ['vinodhini@mantraglobaledu.com', 'praveen@mantraglobaledu.com'];

  const preferredSlot = booking.preferredDate
    ? booking.preferredDate.toLocaleString('en-IN', {
        dateStyle: 'full',
        timeStyle: 'short',
        timeZone: 'Asia/Kolkata',
      })
    : 'Not specified';

  const adminBody = `
New free counseling booking (ID: ${booking.id.slice(0, 8).toUpperCase()})

Name: ${booking.name}
Email: ${booking.email}
Phone: ${booking.phone}
Preferred slot: ${preferredSlot}
Country of interest: ${booking.countryOfInterest || 'Not specified'}
Notes: ${booking.message || '—'}

View in Admin Portal → CRM / Leads
https://www.mantraglobaledu.com/portal/admin/crm
`.trim();

  if (!transporter) {
    if (process.env.NODE_ENV !== 'production') {
      console.info('[DEV counseling notify]', recipients.join(', '), adminBody);
    }
    return { sent: false };
  }

  await transporter.sendMail({
    from: getFromAddress(),
    to: recipients.join(', '),
    replyTo: booking.email,
    subject: `[MGE] New counseling booking — ${booking.name}`,
    text: adminBody,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 560px; color: #00234E;">
        <h2 style="color: #00234E;">New Free Counseling Booking</h2>
        <p style="color: #64748B; font-size: 13px;">Lead ID: ${booking.id.slice(0, 8).toUpperCase()}</p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
          <tr><td style="padding: 8px 0; color: #64748B;">Name</td><td style="padding: 8px 0;"><strong>${booking.name}</strong></td></tr>
          <tr><td style="padding: 8px 0; color: #64748B;">Email</td><td style="padding: 8px 0;"><a href="mailto:${booking.email}">${booking.email}</a></td></tr>
          <tr><td style="padding: 8px 0; color: #64748B;">Phone</td><td style="padding: 8px 0;">${booking.phone}</td></tr>
          <tr><td style="padding: 8px 0; color: #64748B;">Preferred slot</td><td style="padding: 8px 0;">${preferredSlot}</td></tr>
          <tr><td style="padding: 8px 0; color: #64748B;">Country</td><td style="padding: 8px 0;">${booking.countryOfInterest || '—'}</td></tr>
          <tr><td style="padding: 8px 0; color: #64748B; vertical-align: top;">Notes</td><td style="padding: 8px 0;">${(booking.message || '—').replace(/\n/g, '<br/>')}</td></tr>
        </table>
        <p style="margin-top: 24px;"><a href="https://www.mantraglobaledu.com/portal/admin/crm" style="background: #00234E; color: #fff; padding: 10px 18px; text-decoration: none; border-radius: 8px;">Open Admin CRM</a></p>
      </div>
    `,
  });

  await transporter.sendMail({
    from: getFromAddress(),
    to: booking.email,
    subject: 'Your Mantra Global Education counseling request is received',
    text: `Hi ${booking.name},\n\nThank you for booking a free counseling session with Mantra Global Education.\n\nPreferred slot: ${preferredSlot}\nCountry of interest: ${booking.countryOfInterest || 'Not specified'}\n\nOur team will confirm your session within 24 hours.\n\nMantra Global Education`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 520px; color: #00234E;">
        <h2 style="color: #00234E;">Counseling Request Received</h2>
        <p>Hi ${booking.name},</p>
        <p>Thank you for booking a <strong>free counseling session</strong> with Mantra Global Education.</p>
        <p><strong>Preferred slot:</strong> ${preferredSlot}<br/>
        <strong>Country of interest:</strong> ${booking.countryOfInterest || 'Not specified'}</p>
        <p>Our team will confirm your session within <strong>24 hours</strong> via email or phone.</p>
        <p style="color: #64748B; font-size: 13px;">Mantra Global Education · www.mantraglobaledu.com</p>
      </div>
    `,
  });

  return { sent: true };
}
