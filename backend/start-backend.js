const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

console.log('🚀 Starting Backend Server...\n');

// Check if .env exists
const envPath = path.join(__dirname, '.env');
if (!fs.existsSync(envPath)) {
  console.log('⚠️  .env file not found. Creating it...');
  require('./create-env.js');
  console.log('');
}

// Read .env to show configuration
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/quizapp';
const port = process.env.PORT || 5001;

console.log('📋 Configuration:');
console.log(`   Port: ${port}`);
console.log(`   MongoDB URI: ${mongoUri.replace(/\/\/.*@/, '//***:***@')}`);
console.log(`   Environment: ${process.env.NODE_ENV || 'development'}\n`);

console.log('💡 Note: Server will start even if MongoDB is not connected.');
console.log('   MongoDB connection will be attempted automatically.\n');

console.log('🔄 Starting server...\n');

// Start the server
const server = spawn('npm', ['run', 'dev'], {
  cwd: __dirname,
  stdio: 'inherit',
  shell: true
});

server.on('error', (error) => {
  console.error(`❌ Error starting server: ${error.message}`);
});

server.on('close', (code) => {
  if (code !== 0) {
    console.error(`\n❌ Server exited with code ${code}`);
  }
});

// Handle Ctrl+C
process.on('SIGINT', () => {
  console.log('\n\n🛑 Stopping server...');
  server.kill('SIGINT');
  process.exit(0);
});


