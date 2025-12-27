# Quiz Application - MERN Stack

A comprehensive quiz application for JavaScript/React interview preparation with MCQ questions, progress tracking, and user profiles.

## Features

- ✅ User Authentication (Signup, Login, Forgot Password)
- ✅ Student Profile Setup (Job Role, Experience, Technology Stack, Modules, Topics)
- ✅ Quiz Creation with Filters (Time limits, Technology, Difficulty, Question Length)
- ✅ MCQ Questions with Solutions
- ✅ Progress Tracking
- ✅ Subscription Management
- ✅ Retake Quizzes with Shuffled Questions
- ✅ Solution Review (Right/Wrong Answers with Descriptions)

## Tech Stack

- **Frontend**: React + TypeScript
- **Backend**: Node.js + Express
- **Database**: MongoDB
- **Authentication**: JWT

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

## 🔐 Test Login Credentials

Quick login credentials for testing:

**Student Users:**
- Email: `john.doe@example.com` | Password: `password123`
- Email: `jane.smith@example.com` | Password: `password123`
- Email: `bob.johnson@example.com` | Password: `password123`
- Email: `alice.williams@example.com` | Password: `password123`

**Admin User:**
- Email: `admin@quizapp.com` | Password: `admin123`

See `LOGIN_CREDENTIALS.md` for complete list.

**To add more users:**
```bash
cd backend
npm run seed-users
```

## Setup Instructions

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file (if not exists)
node create-env.js

# Edit .env file with your MongoDB URI
# Default: mongodb://localhost:27017/quizapp

# Start MongoDB (if using local installation)
# Windows: Make sure MongoDB service is running
# Or run: mongod

# Run the server
npm run dev
```

The backend server will run on `http://localhost:5000`

### 2. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Create .env file
npm run setup-env

# Install dependencies
npm install

# Start the development server
npm start
```

The frontend will run on `http://localhost:3000`

**Note:** Make sure to update `REACT_APP_API_URL` in `frontend/.env` if your backend runs on a different port.

### 3. MongoDB Connection

#### Option A: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. Use: `mongodb://localhost:27017/quizapp` in `.env`

#### Option B: MongoDB Atlas (Cloud)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env` file

## Environment Variables

### Backend

Create a `.env` file in the `backend` directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/quizapp
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

**Quick setup:**
```bash
cd backend
npm run setup-env
```

### Frontend

Create a `.env` file in the `frontend` directory:

```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_APP_NAME=Quiz Application
REACT_APP_APP_VERSION=1.0.0
REACT_APP_NODE_ENV=development
```

**Quick setup:**
```bash
cd frontend
npm run setup-env
```

**Note:** All React environment variables must start with `REACT_APP_` prefix.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/forgotpassword` - Request password reset
- `PUT /api/auth/resetpassword/:token` - Reset password
- `PUT /api/auth/profile` - Update profile

### Quiz
- `POST /api/quiz/create` - Create new quiz
- `GET /api/quiz` - Get user's quizzes
- `GET /api/quiz/:id` - Get quiz by ID
- `POST /api/quiz/:id/submit` - Submit quiz
- `POST /api/quiz/:id/retake` - Retake quiz

### Questions
- `GET /api/questions` - Get questions with filters
- `GET /api/questions/:id` - Get single question

### Progress
- `GET /api/progress` - Get user progress
- `GET /api/progress/:moduleId` - Get module progress
- `GET /api/progress/stats/overview` - Get overall stats

### Modules
- `GET /api/modules` - Get all modules
- `GET /api/modules/:id` - Get single module

## Project Structure

```
quizapp/
├── backend/
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── middleware/      # Auth middleware
│   ├── utils/           # Utility functions
│   ├── server.js        # Express server
│   └── .env             # Environment variables
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── services/    # API services
│   │   └── App.tsx      # Main app component
│   └── package.json
└── README.md
```

## Running the Application

### Development Mode (Both servers)

From the root directory:
```bash
npm run dev
```

This will start both backend and frontend servers concurrently.

### Individual Servers

**Backend only:**
```bash
cd backend
npm run dev
```

**Frontend only:**
```bash
cd frontend
npm start
```

## Testing the Backend

Once the server is running, test the health endpoint:

```bash
curl http://localhost:5000/api/health
```

Or open in browser: `http://localhost:5000/api/health`

## Troubleshooting

### MongoDB Connection Error
- Make sure MongoDB is running
- Check the `MONGODB_URI` in `.env` file
- Verify MongoDB is accessible on the specified port (default: 27017)

### Port Already in Use
- Change `PORT` in `.env` file
- Or stop the process using the port

### Module Not Found Errors
- Run `npm install` in both backend and frontend directories
- Delete `node_modules` and `package-lock.json`, then reinstall

## License

ISC

