# 🔧 Fix Backend Not Working

## Quick Diagnosis

### Step 1: Check if .env file exists
```bash
cd backend
dir .env
```

If it doesn't exist, create it:
```bash
npm run setup-env
```

### Step 2: Check MongoDB Connection
```bash
npm run check-mongodb
```

### Step 3: Start the Server
```bash
npm run dev
```

## Common Issues & Solutions

### ❌ Issue 1: .env file missing
**Error:** Server starts but can't read configuration

**Solution:**
```bash
cd backend
npm run setup-env
```

### ❌ Issue 2: MongoDB Connection Error
**Error:** `MongoDB Connection Error: connect ECONNREFUSED`

**Solutions:**

**Option A: Use MongoDB Atlas (Recommended)**
1. Sign up at https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string
4. Update `MONGODB_URI` in `backend/.env`

**Option B: Install Local MongoDB**
1. Download: https://www.mongodb.com/try/download/community
2. Install and start service
3. Keep `MONGODB_URI=mongodb://localhost:27017/quizapp`

**Note:** Server will start even without MongoDB, but API endpoints won't work.

### ❌ Issue 3: Port Already in Use
**Error:** `EADDRINUSE: address already in use :::5001`

**Solution:**
```bash
# Kill process on port 5001
netstat -ano | findstr :5001
taskkill /PID <PID> /F

# Or change port in .env
PORT=5002
```

### ❌ Issue 4: Cannot Find Module
**Error:** `Cannot find module 'express'`

**Solution:**
```bash
cd backend
npm install
```

### ❌ Issue 5: Node/NPM Issues
**Error:** `'node' is not recognized` or `'npm' is not recognized`

**Solution:**
1. Install Node.js: https://nodejs.org/
2. Restart terminal
3. Verify: `node --version` and `npm --version`

## Step-by-Step Fix

### Complete Setup (if starting fresh):

```bash
# 1. Navigate to backend
cd backend

# 2. Create .env file
npm run setup-env

# 3. Install dependencies
npm install

# 4. Check MongoDB (optional but recommended)
npm run check-mongodb

# 5. Start server
npm run dev
```

## Verify Backend is Working

### Test 1: Health Endpoint
Open browser: http://localhost:5001/api/health

Should return:
```json
{"status":"OK","message":"Server is running"}
```

### Test 2: Check Server Logs
You should see:
```
✅ MongoDB Connected (or connection error message)
✅ Server running on port 5001
```

## If Server Still Doesn't Work

1. **Check Node.js version:**
   ```bash
   node --version
   ```
   Should be v14 or higher

2. **Check if port is free:**
   ```bash
   netstat -ano | findstr :5001
   ```

3. **Check for syntax errors:**
   ```bash
   node server.js
   ```
   (Without nodemon to see full error)

4. **Check .env file format:**
   - No spaces around `=`
   - No quotes around values (unless needed)
   - Each variable on new line

5. **Try different port:**
   Edit `backend/.env`:
   ```env
   PORT=5002
   ```

## Getting Help

If still not working, check:
- `FIX_MONGODB.md` - MongoDB connection issues
- `QUICK_START.md` - Detailed setup guide
- `RUN_BACKEND.md` - Running instructions

## Quick Commands Reference

```bash
# Setup
cd backend
npm run setup-env
npm install

# Start
npm run dev

# Check MongoDB
npm run check-mongodb

# Kill port
npm run kill-port

# Test
curl http://localhost:5001/api/health
```


