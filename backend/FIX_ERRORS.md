# Fixing Common Backend Errors

## Error: EADDRINUSE - Port Already in Use

**Error Message:**
```
Error: listen EADDRINUSE: address already in use :::5000
```

### Solution 1: Kill the Process Using Port 5000

**Option A: Using the helper script**
```bash
cd backend
npm run kill-port
```

**Option B: Manual kill (Windows)**
```bash
# Find the process
netstat -ano | findstr :5000

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

**Option C: Change the Port**
1. Edit `backend/.env` file
2. Change `PORT=5000` to `PORT=5001` (or any available port)
3. Restart the server

## Error: MongoDB Connection Error

**Error Message:**
```
MongoDB Connection Error: ...
```

### Solutions:
1. **Make sure MongoDB is running**
   - Windows: Check Services app for MongoDB service
   - Or run: `mongod` in a separate terminal

2. **Check MongoDB URI in .env**
   - Local: `mongodb://localhost:27017/quizapp`
   - Atlas: `mongodb+srv://username:password@cluster.mongodb.net/quizapp`

3. **Try alternative localhost format**
   - Change `localhost` to `127.0.0.1` in MONGODB_URI

## Error: Cannot Find Module

**Error Message:**
```
Error: Cannot find module '...'
```

### Solution:
```bash
cd backend
npm install
```

## Error: Deprecated MongoDB Options (Fixed)

The deprecated warnings for `useNewUrlParser` and `useUnifiedTopology` have been removed from the code. These options are no longer needed in MongoDB Driver v4.0.0+.

## Quick Fix Commands

```bash
# Kill process on port 5000
cd backend
npm run kill-port

# Or manually
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Restart server
npm run dev
```


