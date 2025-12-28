// API Configuration
// Uses environment variables from .env file

// API Configuration
// In production, use REACT_APP_API_URL from environment variables
// In development, defaults to localhost
const getApiUrl = () => {
  // Always use REACT_APP_API_URL if set (from .env.production)
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  
  // Check if we're in production (hosted on Firebase)
  if (process.env.NODE_ENV === 'production') {
    // Default to deployed Firebase Function URL
    return 'https://us-central1-homeautomation-206fb.cloudfunctions.net/api/api';
  }
  
  // Development - use localhost
  return 'http://localhost:5001/api';
};

const API_CONFIG = {
  baseURL: getApiUrl(),
  timeout: 60000, // 60 seconds - Firebase Functions can have cold starts
};

export const API_BASE_URL = API_CONFIG.baseURL;

// API Endpoints - Use relative paths since axios instance has baseURL set
export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    ME: '/auth/me',
    FORGOT_PASSWORD: '/auth/forgotpassword',
    RESET_PASSWORD: (token: string) => `/auth/resetpassword/${token}`,
    UPDATE_PROFILE: '/auth/profile',
  },
  // Quiz
  QUIZ: {
    CREATE: '/quiz/create',
    GET_ALL: '/quiz',
    GET_BY_ID: (id: string) => `/quiz/${id}`,
    SUBMIT: (id: string) => `/quiz/${id}/submit`,
    RETAKE: (id: string) => `/quiz/${id}/retake`,
  },
  // Questions
  QUESTIONS: {
    GET_ALL: '/questions',
    GET_BY_ID: (id: string) => `/questions/${id}`,
  },
  // Progress
  PROGRESS: {
    GET_ALL: '/progress',
    GET_BY_MODULE: (moduleId: string) => `/progress/${moduleId}`,
    GET_STATS: '/progress/stats/overview',
  },
  // Modules
  MODULES: {
    GET_ALL: '/modules',
    GET_BY_ID: (id: string) => `/modules/${id}`,
  },
  // Subscription
  SUBSCRIPTION: {
    GET: '/subscription',
    UPDATE: '/subscription',
  },
  // Health
  HEALTH: '/health',
};

export default API_CONFIG;

