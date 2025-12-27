# 🚀 How to Run the Backend

## Quick Start (3 Steps)

### Step 1: Navigate to Backend Directory
```bash
cd backend
```

### Step 2: Check if Port 5000 is Free
If you get "port already in use" error:
```bash
npm run kill-port
```
Or manually:
```bash
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Step 3: Start the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

## What You Should See

When the server starts successfully, you'll see:
```
✅ MongoDB Connected
✅ Server running on port 5000
```

## Verify It's Working

Open your browser and go to:
```
http://localhost:5000/api/health
```

You should see:
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

## Common Issues

### ❌ MongoDB Connection Error
**Solution:**
1. Make sure MongoDB is running
   - Windows: Check Services app for MongoDB service
   - Or run `mongod` in a separate terminal
2. Check `.env` file has correct `MONGODB_URI`
   - Local: `mongodb://localhost:27017/quizapp`
   - Atlas: `mongodb+srv://username:password@cluster.mongodb.net/quizapp`

### ❌ Port 5000 Already in Use
**Solution:**
```bash
npm run kill-port
```
Or change PORT in `.env` file to a different port (e.g., 5001)

### ❌ Cannot Find Module
**Solution:**
```bash
npm install
```

## Environment Setup

Make sure you have a `.env` file in the `backend` directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/quizapp
JWT_SECRET=quizapp_jwt_secret_key_2025_change_in_production
JWT_EXPIRE=7d
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

If `.env` doesn't exist, create it:
```bash
npm run setup-env
```

## API Endpoints

Once running, your API will be available at:
- Base URL: `http://localhost:5000`
- Health Check: `http://localhost:5000/api/health`
- Auth: `http://localhost:5000/api/auth/*`
- Quiz: `http://localhost:5000/api/quiz/*`
- Questions: `http://localhost:5000/api/questions/*`
- Progress: `http://localhost:5000/api/progress/*`
- Modules: `http://localhost:5000/api/modules/*`

## Next Steps

1. ✅ Backend is running on port 5000
2. Start the frontend (see main README.md)
3. Test API endpoints using Postman or browser


