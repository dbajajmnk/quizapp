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
  } catch (error) {
    console.error('❌ Gmail server verification failed:', error.message);
    throw new Error('Gmail configuration is invalid. Please check your App Password.');
  }

  const message = {
    from: `${process.env.EMAIL_FROM_NAME || 'Quiz App'} <${process.env.EMAIL_USER}>`,
    to: options.email,
    subject: options.subject,
    html: options.message,
    // Add text version to avoid spam filters
    text: options.text || options.message.replace(/<[^>]*>/g, ''), // Strip HTML tags for text version
    // Add headers to improve deliverability
    headers: {
      'X-Priority': '1',
      'X-MSMail-Priority': 'High',
      'Importance': 'high'
    }
  };

  try {
    const info = await transporter.sendMail(message);
    console.log('✅ Email sent successfully:');
    console.log('   - To:', options.email);
    console.log('   - Message ID:', info.messageId);
    console.log('   - Response:', info.response);
    return info;
  } catch (error) {
    console.error('❌ Error sending email:');
    console.error('   - To:', options.email);
    console.error('   - Error:', error.message);
    console.error('   - Full error:', JSON.stringify(error, null, 2));
    
    // Provide more detailed error message
    if (error.code === 'EAUTH') {
      throw new Error('Gmail authentication failed. Please check your App Password.');
    } else if (error.code === 'EENVELOPE') {
      throw new Error(`Invalid email address: ${options.email}`);
    } else if (error.responseCode === 550) {
      throw new Error('Email address does not exist or is invalid.');
    } else if (error.responseCode === 552) {
      throw new Error('Email quota exceeded. Please try again later.');
    }
    
    throw error;
  }
};

module.exports = sendEmail;

