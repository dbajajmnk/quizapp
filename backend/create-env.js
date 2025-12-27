const fs = require('fs');
const path = require('path');

const envContent = `PORT=5001
MONGODB_URI=mongodb://localhost:27017/quizapp
JWT_SECRET=quizapp_jwt_secret_key_2025_change_in_production
JWT_EXPIRE=7d
NODE_ENV=development

# Email Configuration (for forgot password - optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
FRONTEND_URL=http://localhost:3001
`;

const envPath = path.join(__dirname, '.env');

if (fs.existsSync(envPath)) {
  console.log('⚠️  .env file already exists. Skipping creation.');
  console.log('If you want to recreate it, delete the existing .env file first.');
} else {
  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env file created successfully!');
  console.log('📝 Please review and update the MONGODB_URI if needed.');
  console.log('📝 Update email credentials if you want to use forgot password feature.');
}

