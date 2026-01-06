const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // Check if email is configured
  if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error('Email configuration is missing. Please set EMAIL_HOST, EMAIL_USER, and EMAIL_PASS in your .env file');
  }

  // Remove spaces from password (App Passwords sometimes have spaces for readability)
  const cleanPassword = (process.env.EMAIL_PASS || '').replace(/\s+/g, '');

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: process.env.EMAIL_PORT == 465, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: cleanPassword
    },
    tls: {
      rejectUnauthorized: false // For development/testing
    }
  });

  // Verify connection configuration
  try {
    await transporter.verify();
  } catch (error) {
    console.error('Email configuration error:', error.message);
    if (error.message.includes('Invalid login') || error.message.includes('authentication failed')) {
      throw new Error('Gmail configuration is invalid. Please check your App Password. Make sure you\'re using a 16-character App Password (not your regular password), and that 2-Step Verification is enabled on your Google account.');
    }
    throw new Error(`Email configuration error: ${error.message}`);
  }

  const message = {
    from: `${process.env.EMAIL_FROM_NAME || 'Quiz App'} <${process.env.EMAIL_USER}>`,
    to: options.email,
    subject: options.subject,
    html: options.message
  };

  await transporter.sendMail(message);
};

module.exports = sendEmail;

