# 🚀 Backend Server - Start Here

## Quick Setup (3 Steps)

### 1️⃣ Create .env file
```bash
npm run setup-env
```
This creates a `.env` file with default MongoDB URI: `mongodb://localhost:27017/quizapp`

**OR** manually create `.env` file in the `backend` folder:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/quizapp
JWT_SECRET=quizapp_jwt_secret_key_2025_change_in_production
JWT_EXPIRE=7d
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### 2️⃣ Start MongoDB

**Option A: Local MongoDB**
- Make sure MongoDB is installed
- Start MongoDB service (Windows: Services app)
- Or run: `mongod` in a terminal

**Option B: MongoDB Atlas (Cloud)**
- Sign up at https://www.mongodb.com/cloud/atlas
- Create a free cluster
- Get connection string
- Update `MONGODB_URI` in `.env` file

### 3️⃣ Start the Server
```bash
npm run dev
```

You should see:
```
✅ MongoDB Connected
✅ Server running on port 5000
```

## Test It

Open browser: http://localhost:5000/api/health

Should return:
```json
{"status":"OK","message":"Server is running"}
```

## Need Help?

- Check `QUICK_START.md` for detailed troubleshooting
- Make sure MongoDB is running before starting the server
- Verify `.env` file exists and has correct `MONGODB_URI`

