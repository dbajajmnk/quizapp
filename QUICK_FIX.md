# ⚡ Quick Fix Guide

## Issue: Services Not Connecting

### ✅ What's Working
- Backend: Running on port 5001
- MongoDB: Connected successfully
- Backend API: Responding correctly

### ❌ What's Not Working
- Frontend: Not running

## Solution: Start Frontend

### Step 1: Start Frontend Server
```bash
cd frontend
npm start
```

Wait for it to start (you'll see "Compiled successfully!")

### Step 2: Open Browser
Go to: http://localhost:3001

### Step 3: Test Connection
1. Open browser console (F12)
2. Check for any errors
3. Try logging in

## If Frontend Still Can't Connect

### Check Frontend .env
Make sure `frontend/.env` has:
```env
REACT_APP_API_URL=http://localhost:5001/api
```

### Verify Backend is Running
```bash
curl http://localhost:5001/api/health
```

Should return: `{"status":"OK","message":"Server is running"}`

### Check Browser Console
Open browser DevTools (F12) → Console tab
Look for:
- Network errors
- CORS errors
- Connection refused errors

## Common Issues

### Issue: "Network Error" or "Failed to fetch"
**Cause:** Backend not running or wrong URL
**Fix:** 
1. Start backend: `cd backend && npm run dev`
2. Check `REACT_APP_API_URL` in frontend `.env`

### Issue: CORS Error
**Cause:** Backend CORS not configured (but it is)
**Fix:** Backend already has CORS enabled, this shouldn't happen

### Issue: 401 Unauthorized
**Cause:** Token expired or invalid
**Fix:** Logout and login again

## Test Complete Flow

1. ✅ Start backend: `cd backend && npm run dev`
2. ✅ Start frontend: `cd frontend && npm start`
3. ✅ Open: http://localhost:3001
4. ✅ Login with: `john.doe@example.com` / `password123`
5. ✅ Test features

## Still Not Working?

Run these diagnostic commands:

```bash
# Check backend
curl http://localhost:5001/api/health

# Check MongoDB
cd backend
npm run check-mongodb

# Check frontend config
cd frontend
cat .env
```

