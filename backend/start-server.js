const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Quiz App Backend Server...\n');

// Check if .env exists
const envPath = path.join(__dirname, '.env');
if (!fs.existsSync(envPath)) {
  console.log('⚠️  .env file not found. Creating it...');
  require('./create-env.js');
  console.log('✅ .env file created. Please review it before continuing.\n');
}

// Read .env to show MongoDB URI
require('dotenv').config();
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/quizapp';

console.log('📋 Configuration:');
console.log(`   Port: ${process.env.PORT || 5000}`);
console.log(`   MongoDB URI: ${mongoUri}`);
console.log(`   Environment: ${process.env.NODE_ENV || 'development'}\n`);

console.log('💡 Make sure MongoDB is running before starting the server!');
console.log('   - Local MongoDB: Check if service is running');
console.log('   - MongoDB Atlas: Connection string should be in .env\n');

console.log('🔄 Starting server...\n');

// Start the server
const server = exec('npm run dev', (error, stdout, stderr) => {
  if (error) {
    console.error(`❌ Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`⚠️  ${stderr}`);
    return;
  }
  console.log(stdout);
});

server.stdout.on('data', (data) => {
  console.log(data.toString());
});

server.stderr.on('data', (data) => {
  console.error(data.toString());
});

