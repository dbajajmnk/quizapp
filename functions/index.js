const { onRequest } = require('firebase-functions/v2/https');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Import routes
const authRoutes = require('./routes/auth');
const quizRoutes = require('./routes/quiz');
const questionRoutes = require('./routes/questions');
const progressRoutes = require('./routes/progress');
const subscriptionRoutes = require('./routes/subscription');
const moduleRoutes = require('./routes/modules');

const app = express();

// CORS Configuration - Allow requests from frontend
// For Firebase Functions v2, we need to handle CORS properly
const allowedOrigins = [
  'https://homeautomation-206fb.web.app',
  'https://homeautomation-206fb.firebaseapp.com',
  'http://localhost:3001',
  'http://localhost:3000',
  'http://localhost:5001'
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Check if origin is in allowed list or is localhost
    if (allowedOrigins.indexOf(origin) !== -1 || origin.includes('localhost')) {
      callback(null, true);
    } else {
      // For now, allow all origins to fix CORS issues
      callback(null, true);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  exposedHeaders: ['Content-Type', 'Authorization'],
  preflightContinue: false,
  optionsSuccessStatus: 204
};

// Middleware - CORS must be first
app.use(cors(corsOptions));

// Additional CORS headers for all responses
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin) || !origin || origin.includes('localhost')) {
    res.header('Access-Control-Allow-Origin', origin || '*');
  }
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handle preflight requests explicitly
app.options('*', (req, res) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin) || !origin || origin.includes('localhost')) {
    res.header('Access-Control-Allow-Origin', origin || '*');
  }
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Max-Age', '86400'); // 24 hours
  res.sendStatus(204);
});

// Set environment variables
// For 2nd gen functions, use environment variables directly or set via Firebase Console
process.env.MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://kapil_db_user:FK2ZS68egqleyAsl@cluster0.esxhlhp.mongodb.net/quizapp?retryWrites=true&w=majority&appName=Cluster0';
process.env.JWT_SECRET = process.env.JWT_SECRET || 'quizapp_jwt_secret_key_2025_change_in_production';
process.env.JWT_EXPIRE = process.env.JWT_EXPIRE || '7d';
process.env.FRONTEND_URL = process.env.FRONTEND_URL || 'https://homeautomation-206fb.web.app';

// MongoDB Connection
// Use connection pooling and optimize for serverless
const MONGODB_URI = process.env.MONGODB_URI;

// Disable mongoose buffering to prevent "buffering timed out" errors
// This forces Mongoose to wait for connection before executing queries
mongoose.set('bufferCommands', false);

// Function to ensure MongoDB connection
let connectionPromise = null;

const ensureMongoConnection = async () => {
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not configured');
  }

  // If already connected, return immediately
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  // If connection is in progress, wait for it
  if (connectionPromise) {
    return connectionPromise;
  }

  // Start new connection
  connectionPromise = mongoose.connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 30000, // Increased for cold starts
    connectTimeoutMS: 30000,
    socketTimeoutMS: 45000,
    maxPoolSize: 10,
    minPoolSize: 1,
    maxIdleTimeMS: 30000,
  })
  .then(() => {
    console.log('✅ MongoDB Connected');
    console.log('📊 Database:', mongoose.connection.name);
    return mongoose.connection;
  })
  .catch(err => {
    console.error('❌ MongoDB Connection Error:', err.message);
    connectionPromise = null; // Reset promise on error
    throw err;
  });

  return connectionPromise;
};

// Initialize connection on startup (non-blocking)
if (MONGODB_URI) {
  ensureMongoConnection().catch(err => {
    console.error('Failed to connect to MongoDB on startup:', err.message);
  });
} else {
  console.error('❌ MONGODB_URI is not configured');
}

// Middleware to ensure MongoDB connection before processing requests
app.use(async (req, res, next) => {
  try {
    // Skip for health check and root endpoint
    if (req.path === '/api/health' || req.path === '/') {
      return next();
    }

    // Ensure MongoDB is connected before processing request
    await ensureMongoConnection();
    next();
  } catch (error) {
    console.error('MongoDB connection error in middleware:', error.message);
    return res.status(503).json({
      success: false,
      message: 'Database connection error. Please try again.',
      error: error.message
    });
  }
});

// Debug middleware - log all requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/subscription', subscriptionRoutes);
app.use('/api/modules', moduleRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Quiz App API is running',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      quiz: '/api/quiz',
      questions: '/api/questions',
      progress: '/api/progress',
      subscription: '/api/subscription',
      modules: '/api/modules'
    }
  });
});

// 404 handler
app.use((req, res) => {
  console.log(`404 - ${req.method} ${req.path}`);
  res.status(404).json({ 
    success: false, 
    message: `Route ${req.method} ${req.path} not found`,
    availableRoutes: [
      'GET /api/health',
      'POST /api/auth/register',
      'POST /api/auth/login',
      'GET /api/auth/me',
      'POST /api/quiz/create',
      'GET /api/quiz',
      'GET /api/quiz/:id'
    ]
  });
});

// Export as Firebase Function (2nd generation)
// CORS is configured both in onRequest and Express middleware for maximum compatibility
exports.api = onRequest({
  memory: '512MiB',
  timeoutSeconds: 60,
  maxInstances: 10,
  cors: true, // Allow all origins - Express middleware will handle specific origins
  // Environment variables for Firebase Functions v2
  // Set these in Google Cloud Console or via gcloud CLI
  // They will be available as process.env.EMAIL_USER, process.env.EMAIL_PASS, etc.
}, app);

