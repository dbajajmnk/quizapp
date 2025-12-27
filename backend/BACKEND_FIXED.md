# ✅ Backend Fixed!

## Issue Found & Resolved

**Problem:** Backend `.env` file had `PORT=3000` instead of `PORT=5001`

**Solution:** Updated `.env` file to use port 5001

## Current Configuration

- **Backend Port:** `5001`
- **Frontend Port:** `3001`
- **MongoDB:** `mongodb://localhost:27017/quizapp`

## Start Backend

```bash
cd backend
npm run dev
```

## Verify Backend is Running

### Test 1: Health Endpoint
Open browser: http://localhost:5001/api/health

Should return:
```json
{"status":"OK","message":"Server is running"}
```

### Test 2: Check Server Logs
You should see:
```
✅ MongoDB Connected (or connection error)
✅ Server running on port 5001
```

## Important Notes

1. **Backend runs on port 5001** (not 3000 or 5000)
2. **Frontend should connect to:** `http://localhost:5001/api`
3. **Update frontend .env** if needed:
   ```env
   REACT_APP_API_URL=http://localhost:5001/api
   ```

## If MongoDB Connection Fails

The server will start even without MongoDB, but API won't work. To fix:

1. **Use MongoDB Atlas (Recommended):**
   - Sign up: https://www.mongodb.com/cloud/atlas
   - Get connection string
   - Update `MONGODB_URI` in `backend/.env`

2. **Or install local MongoDB:**
   - Download: https://www.mongodb.com/try/download/community
   - Start MongoDB service

See `FIX_MONGODB.md` for detailed instructions.

## Quick Commands

```bash
# Start backend
cd backend
npm run dev

# Check configuration
node check-env.js

# Check MongoDB connection
npm run check-mongodb

# Test health endpoint
curl http://localhost:5001/api/health
```

## Port Summary

| Service | Port | URL |
|--------|------|-----|
| Backend | 5001 | http://localhost:5001 |
| Frontend | 3001 | http://localhost:3001 |
| API | 5001 | http://localhost:5001/api |


