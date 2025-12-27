# 🔧 Fix MongoDB Connection Error

## Problem
```
Failed to connect to localhost:27017
MongoDB Connection Error
```

## ✅ Solution Options

### Option 1: MongoDB Atlas (Cloud) - RECOMMENDED ⭐

**Why use Atlas?**
- ✅ No installation needed
- ✅ Free tier available
- ✅ Works immediately
- ✅ Accessible from anywhere

#### Step 1: Create Free MongoDB Atlas Account
1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up for free account
3. Create a free cluster (M0 - Free tier)

#### Step 2: Get Connection String
1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string
   - Format: `mongodb+srv://username:password@cluster.mongodb.net/quizapp`
4. Replace `<password>` with your database user password
5. Replace `<dbname>` with `quizapp` (or keep it)

#### Step 3: Update .env File
Edit `backend/.env` and update `MONGODB_URI`:
```env
MONGODB_URI=mongodb+srv://yourusername:yourpassword@cluster0.xxxxx.mongodb.net/quizapp?retryWrites=true&w=majority
```

#### Step 4: Configure Network Access
1. In Atlas, go to "Network Access"
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for development)
   - Or add your specific IP address

#### Step 5: Create Database User
1. In Atlas, go to "Database Access"
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Set username and password
5. Set role to "Atlas admin" (for development)

#### Step 6: Restart Server
```bash
cd backend
npm run dev
```

---

### Option 2: Local MongoDB Installation

#### Step 1: Install MongoDB
**Windows:**
1. Download MongoDB Community Server: https://www.mongodb.com/try/download/community
2. Run the installer
3. Choose "Complete" installation
4. Install as a Windows Service (recommended)

**Or use Chocolatey:**
```bash
choco install mongodb
```

#### Step 2: Start MongoDB Service
**Windows:**
1. Press `Win + R`, type `services.msc`
2. Find "MongoDB" service
3. Right-click → Start
4. Set to "Automatic" startup (optional)

**Or start manually:**
```bash
mongod
```

#### Step 3: Verify MongoDB is Running
```bash
# Test connection
mongosh
# Or
mongo
```

If you see MongoDB shell, it's working!

#### Step 4: Update .env (if needed)
Make sure `backend/.env` has:
```env
MONGODB_URI=mongodb://localhost:27017/quizapp
```

#### Step 5: Restart Server
```bash
cd backend
npm run dev
```

---

## Quick Test

After setting up, test the connection:

```bash
# Test MongoDB connection
mongosh "mongodb://localhost:27017/quizapp"
# Or for Atlas
mongosh "mongodb+srv://username:password@cluster.mongodb.net/quizapp"
```

## Common Issues

### ❌ "Authentication failed"
- Check username and password in connection string
- Verify database user exists in Atlas

### ❌ "IP not whitelisted"
- Add your IP to Atlas Network Access
- Or allow access from anywhere (0.0.0.0/0) for development

### ❌ "Connection timeout"
- Check internet connection (for Atlas)
- Verify MongoDB service is running (for local)
- Check firewall settings

### ❌ "Cannot find mongod"
- MongoDB not installed
- MongoDB not in PATH
- Use MongoDB Atlas instead

## Recommended: MongoDB Atlas

For quick setup, use MongoDB Atlas:
1. ✅ No installation
2. ✅ Free tier (512MB storage)
3. ✅ Works immediately
4. ✅ No local service management

## Next Steps

Once MongoDB is connected, you should see:
```
✅ MongoDB Connected
✅ Server running on port 5000
```

Then test: http://localhost:5000/api/health


