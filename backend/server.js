const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
// CORS Configuration - Allow frontend to connect
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3001';
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/quiz', require('./routes/quiz'));
app.use('/api/questions', require('./routes/questions'));
app.use('/api/progress', require('./routes/progress'));
app.use('/api/subscription', require('./routes/subscription'));
app.use('/api/modules', require('./routes/modules'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/quizapp';
console.log('🔌 Connecting to MongoDB...');
console.log('📋 Database:', MONGODB_URI.split('/').pop().split('?')[0]);
mongoose.connect(MONGODB_URI, {
  serverSelectionTimeoutMS: 10000, // 10 seconds
  connectTimeoutMS: 10000
})
.then(() => {
  console.log('✅ MongoDB Connected');
  console.log('📊 Database:', mongoose.connection.name);
})
.catch(err => {
  console.error('❌ MongoDB Connection Error:', err.message);
  console.error('\n💡 To fix this:');
  console.error('1. Run: npm run check-mongodb');
  console.error('2. See: FIX_MONGODB.md for detailed instructions');
  console.error('3. Option A: Use MongoDB Atlas (cloud) - Recommended');
  console.error('4. Option B: Install and start local MongoDB');
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

