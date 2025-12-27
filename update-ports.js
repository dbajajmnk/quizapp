const fs = require('fs');
const path = require('path');

console.log('🔄 Updating port configurations...\n');

// Update backend .env
const backendEnvPath = path.join(__dirname, 'backend', '.env');
if (fs.existsSync(backendEnvPath)) {
  let backendEnv = fs.readFileSync(backendEnvPath, 'utf8');
  
  // Update PORT
  backendEnv = backendEnv.replace(/^PORT=.*$/m, 'PORT=5001');
  // Update FRONTEND_URL
  backendEnv = backendEnv.replace(/^FRONTEND_URL=.*$/m, 'FRONTEND_URL=http://localhost:3001');
  
  fs.writeFileSync(backendEnvPath, backendEnv);
  console.log('✅ Updated backend/.env');
} else {
  console.log('⚠️  backend/.env not found. Run: cd backend && npm run setup-env');
}

// Update frontend .env
const frontendEnvPath = path.join(__dirname, 'frontend', '.env');
if (fs.existsSync(frontendEnvPath)) {
  let frontendEnv = fs.readFileSync(frontendEnvPath, 'utf8');
  
  // Update API URL
  frontendEnv = frontendEnv.replace(/^REACT_APP_API_URL=.*$/m, 'REACT_APP_API_URL=http://localhost:5001/api');
  
  fs.writeFileSync(frontendEnvPath, frontendEnv);
  console.log('✅ Updated frontend/.env');
} else {
  console.log('⚠️  frontend/.env not found. Run: cd frontend && npm run setup-env');
}

// Create frontend .env.local for port
const frontendEnvLocalPath = path.join(__dirname, 'frontend', '.env.local');
if (!fs.existsSync(frontendEnvLocalPath)) {
  fs.writeFileSync(frontendEnvLocalPath, 'PORT=3001\n');
  console.log('✅ Created frontend/.env.local');
}

console.log('\n✅ Port configuration updated!');
console.log('📋 New ports:');
console.log('   Backend:  http://localhost:5001');
console.log('   Frontend: http://localhost:3001');
console.log('\n💡 Restart both servers for changes to take effect.');


