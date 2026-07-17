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
