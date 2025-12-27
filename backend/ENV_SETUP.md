# Backend Environment Setup

## Step 1: Create .env file

Create a file named `.env` in the `backend` directory with the following content:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/quizapp
JWT_SECRET=quizapp_jwt_secret_key_2025_change_in_production
JWT_EXPIRE=7d
NODE_ENV=development

# Email Configuration (for forgot password - optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
FRONTEND_URL=http://localhost:3000
```

## Step 2: Make sure MongoDB is running

### Option A: Local MongoDB Installation
If you have MongoDB installed locally, make sure it's running:
- Windows: Check if MongoDB service is running in Services
- Or run: `mongod` in a separate terminal

### Option B: MongoDB Atlas (Cloud)
If using MongoDB Atlas, replace the MONGODB_URI with your Atlas connection string:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/quizapp
```

## Step 3: Install dependencies

```bash
cd backend
npm install
```

## Step 4: Run the server

### Development mode (with auto-reload):
```bash
npm run dev
```

### Production mode:
```bash
npm start
```

The server will start on http://localhost:5000

## Verify Connection

Once running, you should see:
- "MongoDB Connected" message
- "Server running on port 5000"

You can test the health endpoint:
- GET http://localhost:5000/api/health

