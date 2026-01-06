const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // Check if email is configured
  if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error('Email configuration is missing. Please set EMAIL_HOST, EMAIL_USER, and EMAIL_PASS in your .env file');
  }

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT || 587,
    secure: process.env.EMAIL_PORT == 465, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const message = {
    from: `${process.env.EMAIL_FROM_NAME || 'Quiz App'} <${process.env.EMAIL_USER}>`,
    to: options.email,
    subject: options.subject,
    html: options.message
  };

  await transporter.sendMail(message);
};

module.exports = sendEmail;

