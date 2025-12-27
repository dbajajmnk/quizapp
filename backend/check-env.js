const fs = require('fs');
const path = require('path');
require('dotenv').config();

console.log('📋 Backend Environment Configuration:\n');

const envPath = path.join(__dirname, '.env');

if (fs.existsSync(envPath)) {
  console.log('✅ .env file exists');
  const envContent = fs.readFileSync(envPath, 'utf8');
  console.log('\n📄 .env file contents:');
  console.log(envContent);
} else {
  console.log('❌ .env file NOT found');
}

console.log('\n🔍 Current Environment Variables:');
console.log(`   PORT: ${process.env.PORT || 'NOT SET (default: 5001)'}`);
console.log(`   MONGODB_URI: ${process.env.MONGODB_URI ? process.env.MONGODB_URI.replace(/\/\/.*@/, '//***:***@') : 'NOT SET'}`);
console.log(`   NODE_ENV: ${process.env.NODE_ENV || 'NOT SET'}`);
console.log(`   JWT_SECRET: ${process.env.JWT_SECRET ? 'SET' : 'NOT SET'}`);

console.log('\n💡 Expected Configuration:');
console.log('   PORT=5001');
console.log('   MONGODB_URI=mongodb://localhost:27017/quizapp (or Atlas connection string)');


