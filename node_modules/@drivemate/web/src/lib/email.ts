import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_PORT === '465',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to,
      subject,
      html,
    });

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
}

export async function sendWelcomeEmail(email: string, name: string) {
  return sendEmail({
    to: email,
    subject: 'Welcome to DriveMate!',
    html: `
      <h1>Welcome to DriveMate, ${name}!</h1>
      <p>We're excited to have you on board. Your account has been successfully created.</p>
      <p>You can now start booking your rides with our professional chauffeurs.</p>
      <p>If you have any questions, feel free to contact our support team.</p>
    `,
  });
}

export async function sendBookingConfirmation(
  email: string,
  name: string,
  booking: any
) {
  return sendEmail({
    to: email,
    subject: 'Booking Confirmation - DriveMate',
    html: `
      <h1>Booking Confirmation</h1>
      <p>Dear ${name},</p>
      <p>Your booking has been confirmed. Here are the details:</p>
      <ul>
        <li>Booking ID: ${booking.id}</li>
        <li>Pickup Location: ${booking.pickupLocation}</li>
        <li>Dropoff Location: ${booking.dropoffLocation}</li>
        <li>Pickup Time: ${new Date(booking.pickupTime).toLocaleString()}</li>
        <li>Price: $${booking.price}</li>
      </ul>
      <p>Thank you for choosing DriveMate!</p>
    `,
  });
}

export async function sendPasswordReset(email: string, resetToken: string) {
  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`;
  
  return sendEmail({
    to: email,
    subject: 'Password Reset Request - DriveMate',
    html: `
      <h1>Password Reset Request</h1>
      <p>You requested a password reset. Click the link below to reset your password:</p>
      <p><a href="${resetUrl}">Reset Password</a></p>
      <p>If you didn't request this, please ignore this email.</p>
      <p>This link will expire in 1 hour.</p>
    `,
  });
} 