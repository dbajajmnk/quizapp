# Quick Start Guide - Backend Server

## Step 1: Create .env file

If you haven't created the `.env` file yet, run:

```bash
node create-env.js
```

Or manually create a `.env` file in the `backend` directory with:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/quizapp
JWT_SECRET=quizapp_jwt_secret_key_2025_change_in_production
JWT_EXPIRE=7d
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

## Step 2: Make sure MongoDB is running

### Check if MongoDB is running:

**Windows:**
- Open Services (Win + R, type `services.msc`)
- Look for "MongoDB" service
- If not running, start it

**Or start MongoDB manually:**
```bash
mongod
```

**If using MongoDB Atlas (Cloud):**
- Update `MONGODB_URI` in `.env` with your Atlas connection string
- Format: `mongodb+srv://username:password@cluster.mongodb.net/quizapp`

## Step 3: Install dependencies (if not done)

```bash
npm install
```

## Step 4: Start the server

### Option A: Using npm script (Recommended)
```bash
npm run dev
```

### Option B: Using the helper script
```bash
node start-server.js
```

### Option C: Direct node command
```bash
node server.js
```

## Step 5: Verify it's working

Once the server starts, you should see:
```
MongoDB Connected
Server running on port 5000
```

Test the health endpoint:
- Open browser: http://localhost:5000/api/health
- Or use curl: `curl http://localhost:5000/api/health`

Expected response:
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

## Troubleshooting

### ❌ "MongoDB Connection Error"
**Solution:**
1. Make sure MongoDB is installed and running
2. Check if MongoDB service is running (Windows: Services)
3. Verify the `MONGODB_URI` in `.env` is correct
4. For local MongoDB, try: `mongodb://127.0.0.1:27017/quizapp`

### ❌ "Port 5000 already in use"
**Solution:**
1. Change `PORT` in `.env` to a different port (e.g., 5001)
2. Or stop the process using port 5000

### ❌ "Cannot find module"
**Solution:**
```bash
npm install
```

### ❌ "EADDRINUSE" error
**Solution:**
- Another process is using the port
- Change PORT in `.env` or kill the process using that port

## Common MongoDB URIs

**Local MongoDB (default):**
```
mongodb://localhost:27017/quizapp
```

**Local MongoDB (alternative):**
```
mongodb://127.0.0.1:27017/quizapp
```

**MongoDB Atlas:**
```
mongodb+srv://username:password@cluster.mongodb.net/quizapp?retryWrites=true&w=majority
```

## Next Steps

Once the backend is running:
1. The API will be available at `http://localhost:5000`
2. Start the frontend server (see main README.md)
3. Test API endpoints using Postman or curl

