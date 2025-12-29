const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // Check if email configuration exists
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error('Email configuration is missing. Please set EMAIL_USER and EMAIL_PASS in your .env file');
  }

  // Gmail configuration - using App Password
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Your Gmail address
      pass: process.env.EMAIL_PASS  // Your Gmail App Password (16 characters)
    }
  });

  // Verify connection
  try {
    await transporter.verify();
    console.log('✅ Gmail server is ready to send messages');
  } catch (error) {
    console.error('❌ Gmail server verification failed:', error.message);
    throw new Error('Gmail configuration is invalid. Please check your App Password.');
  }

  const message = {
    from: `${process.env.EMAIL_FROM_NAME || 'Quiz App'} <${process.env.EMAIL_USER}>`,
    to: options.email,
    subject: options.subject,
    html: options.message
  };

  try {
    const info = await transporter.sendMail(message);
    console.log('✅ Email sent successfully:', info.messageId);
    return info;
  } catch (error) {
    console.error('❌ Error sending email:', error.message);
    throw error;
  }
};

module.exports = sendEmail;

