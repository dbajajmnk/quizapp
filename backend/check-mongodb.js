const mongoose = require('mongoose');
require('dotenv').config();

console.log('🔍 Checking MongoDB Connection...\n');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/quizapp';

console.log(`📋 Connection String: ${MONGODB_URI.replace(/\/\/.*@/, '//***:***@')}\n`);

mongoose.connect(MONGODB_URI, {
  serverSelectionTimeoutMS: 5000,
  connectTimeoutMS: 5000
})
.then(() => {
  console.log('✅ MongoDB Connection Successful!');
  console.log('✅ Database:', mongoose.connection.name);
  console.log('✅ Host:', mongoose.connection.host);
  process.exit(0);
})
.catch((err) => {
  console.error('❌ MongoDB Connection Failed!\n');
  console.error('Error:', err.message);
  console.error('\n💡 Solutions:');
  console.error('1. If using local MongoDB:');
  console.error('   - Make sure MongoDB service is running');
  console.error('   - Check Services app (Win + R, type services.msc)');
  console.error('   - Or run: mongod');
  console.error('\n2. If using MongoDB Atlas:');
  console.error('   - Check connection string in .env file');
  console.error('   - Verify IP is whitelisted in Atlas');
  console.error('   - Check username and password');
  console.error('\n3. See FIX_MONGODB.md for detailed instructions');
  process.exit(1);
});


