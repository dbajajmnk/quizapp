# 🚀 Start All Services

## Current Status

✅ **Backend:** Running on port 5001  
✅ **MongoDB:** Connected  
❌ **Frontend:** Not running

## Quick Start Commands

### Start Backend (if not running)
```bash
cd backend
npm run dev
```

### Start Frontend
```bash
cd frontend
npm start
```

### Start Both (from root)
```bash
npm run dev
```

## Verify Everything is Working

### 1. Backend Health Check
Open: http://localhost:5001/api/health
Should see: `{"status":"OK","message":"Server is running"}`

### 2. Frontend
Open: http://localhost:3001
Should see: Login page

### 3. Test Login
- Go to: http://localhost:3001/login
- Email: `john.doe@example.com`
- Password: `password123`

## Troubleshooting

### Frontend Can't Connect to Backend

**Check:**
1. Backend is running on port 5001
2. Frontend `.env` has: `REACT_APP_API_URL=http://localhost:5001/api`
3. CORS is enabled in backend (it is)

**Fix:**
```bash
# Update frontend .env
cd frontend
# Edit .env file
REACT_APP_API_URL=http://localhost:5001/api
```

### CORS Errors

Backend has CORS enabled, but if you see CORS errors:
- Check backend is running
- Verify frontend URL matches `FRONTEND_URL` in backend `.env`

## All Services Running

Once everything is started:
- ✅ Backend: http://localhost:5001
- ✅ Frontend: http://localhost:3001
- ✅ MongoDB: Connected

Then you can:
1. Login at http://localhost:3001/login
2. Create quizzes
3. Test all features

