const fs = require('fs');
const path = require('path');

const envContent = `# Frontend Environment Variables
# Note: All React environment variables must start with REACT_APP_

# Backend API URL (Backend runs on port 5001)
REACT_APP_API_URL=http://localhost:5001/api

# App Configuration
REACT_APP_APP_NAME=Quiz Application
REACT_APP_APP_VERSION=1.0.0

# Environment
REACT_APP_NODE_ENV=development

# Frontend Port (optional, can be set via PORT env var or .env.local)
PORT=3001
`;

const envPath = path.join(__dirname, '.env');
const envExamplePath = path.join(__dirname, '.env.example');

if (fs.existsSync(envPath)) {
  console.log('⚠️  .env file already exists. Skipping creation.');
  console.log('If you want to recreate it, delete the existing .env file first.');
} else {
  fs.writeFileSync(envPath, envContent);
  console.log('✅ Frontend .env file created successfully!');
  console.log('📝 Backend API URL: http://localhost:5000/api');
  console.log('📝 You can update REACT_APP_API_URL if your backend runs on a different port.');
}

// Also create .env.example
if (!fs.existsSync(envExamplePath)) {
  fs.writeFileSync(envExamplePath, envContent);
  console.log('✅ .env.example file created for reference.');
}

