# 🚀 Quick MongoDB Setup Guide

## Current Status: ❌ MongoDB Not Running

You have **2 options** to fix this:

---

## ⭐ Option 1: MongoDB Atlas (Cloud) - EASIEST & RECOMMENDED

### Why Choose Atlas?
- ✅ No installation needed
- ✅ Free forever (512MB storage)
- ✅ Works in 5 minutes
- ✅ No local service management

### Setup Steps (5 minutes):

#### 1. Create Account & Cluster
1. Go to: **https://www.mongodb.com/cloud/atlas/register**
2. Sign up (use Google/GitHub for faster signup)
3. Choose **"Free"** tier (M0)
4. Select a cloud provider and region (closest to you)
5. Click **"Create Cluster"** (takes 3-5 minutes)

#### 2. Create Database User
1. Go to **"Database Access"** (left sidebar)
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Enter username (e.g., `quizappuser`)
5. Enter password (save it!)
6. Set role to **"Atlas admin"**
7. Click **"Add User"**

#### 3. Configure Network Access
1. Go to **"Network Access"** (left sidebar)
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (for development)
   - Or add your specific IP
4. Click **"Confirm"**

#### 4. Get Connection String
1. Go to **"Database"** (left sidebar)
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Copy the connection string
   - Looks like: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`

#### 5. Update Your .env File
Edit `backend/.env`:
```env
MONGODB_URI=mongodb+srv://quizappuser:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/quizapp?retryWrites=true&w=majority
```

**Important:** 
- Replace `YOUR_PASSWORD` with the password you created
- Replace `cluster0.xxxxx` with your actual cluster name
- Keep `/quizapp` at the end (database name)

#### 6. Test Connection
```bash
cd backend
npm run check-mongodb
```

You should see: ✅ MongoDB Connection Successful!

#### 7. Start Server
```bash
npm run dev
```

---

## Option 2: Local MongoDB Installation

### Step 1: Install MongoDB
**Windows:**
1. Download: https://www.mongodb.com/try/download/community
2. Run installer
3. Choose **"Complete"** installation
4. ✅ Check **"Install MongoDB as a Service"**
5. ✅ Check **"Install MongoDB Compass"** (GUI tool)
6. Click **"Install"**

### Step 2: Start MongoDB Service
**Method A: Windows Services**
1. Press `Win + R`
2. Type `services.msc` and press Enter
3. Find **"MongoDB"** service
4. Right-click → **"Start"**
5. (Optional) Right-click → Properties → Set to **"Automatic"**

**Method B: Command Line**
```bash
# Start MongoDB service
net start MongoDB
```

**Method C: Manual Start**
```bash
mongod
```

### Step 3: Verify MongoDB is Running
```bash
# Test MongoDB shell
mongosh
# Or
mongo
```

If you see MongoDB shell prompt, it's working!

### Step 4: Update .env (if needed)
Make sure `backend/.env` has:
```env
MONGODB_URI=mongodb://localhost:27017/quizapp
```

### Step 5: Test Connection
```bash
cd backend
npm run check-mongodb
```

### Step 6: Start Server
```bash
npm run dev
```

---

## Quick Commands Reference

```bash
# Check MongoDB connection
cd backend
npm run check-mongodb

# Start server
npm run dev

# Check if MongoDB service is running (Windows)
Get-Service -Name "*mongo*"

# Start MongoDB service (Windows)
net start MongoDB
```

---

## Which Option Should I Choose?

**Choose MongoDB Atlas if:**
- ✅ You want quick setup (5 minutes)
- ✅ You don't want to install anything
- ✅ You want cloud access
- ✅ You're okay with free tier limits

**Choose Local MongoDB if:**
- ✅ You want full control
- ✅ You need offline access
- ✅ You want unlimited storage
- ✅ You're comfortable with installations

## Recommendation: Start with Atlas ⭐

For development, MongoDB Atlas is the easiest and fastest option. You can always switch to local MongoDB later if needed.

---

## Need Help?

1. Check `FIX_MONGODB.md` for detailed troubleshooting
2. Run `npm run check-mongodb` to test connection
3. Verify `.env` file has correct `MONGODB_URI`


