// API Configuration
// Uses environment variables from .env file

const API_CONFIG = {
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5001/api',
  timeout: 10000, // 10 seconds
};

export const API_BASE_URL = API_CONFIG.baseURL;

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    REGISTER: `${API_BASE_URL}/auth/register`,
    LOGIN: `${API_BASE_URL}/auth/login`,
    ME: `${API_BASE_URL}/auth/me`,
    FORGOT_PASSWORD: `${API_BASE_URL}/auth/forgotpassword`,
    RESET_PASSWORD: (token: string) => `${API_BASE_URL}/auth/resetpassword/${token}`,
    UPDATE_PROFILE: `${API_BASE_URL}/auth/profile`,
  },
  // Quiz
  QUIZ: {
    CREATE: `${API_BASE_URL}/quiz/create`,
    GET_ALL: `${API_BASE_URL}/quiz`,
    GET_BY_ID: (id: string) => `${API_BASE_URL}/quiz/${id}`,
    SUBMIT: (id: string) => `${API_BASE_URL}/quiz/${id}/submit`,
    RETAKE: (id: string) => `${API_BASE_URL}/quiz/${id}/retake`,
  },
  // Questions
  QUESTIONS: {
    GET_ALL: `${API_BASE_URL}/questions`,
    GET_BY_ID: (id: string) => `${API_BASE_URL}/questions/${id}`,
  },
  // Progress
  PROGRESS: {
    GET_ALL: `${API_BASE_URL}/progress`,
    GET_BY_MODULE: (moduleId: string) => `${API_BASE_URL}/progress/${moduleId}`,
    GET_STATS: `${API_BASE_URL}/progress/stats/overview`,
  },
  // Modules
  MODULES: {
    GET_ALL: `${API_BASE_URL}/modules`,
    GET_BY_ID: (id: string) => `${API_BASE_URL}/modules/${id}`,
  },
  // Subscription
  SUBSCRIPTION: {
    GET: `${API_BASE_URL}/subscription`,
    UPDATE: `${API_BASE_URL}/subscription`,
  },
  // Health
  HEALTH: `${API_BASE_URL}/health`,
};

export default API_CONFIG;

