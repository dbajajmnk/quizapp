# Seed Sample Users to MongoDB

## Quick Start

Run the seed script to add sample users to your MongoDB database:

```bash
cd backend
npm run seed-users
```

## What It Does

This script will:
1. Connect to MongoDB using the URI from `.env` file
2. Create 5 sample users with different profiles
3. Hash passwords securely using bcrypt
4. Skip users that already exist (won't duplicate)

## Sample Users Created

### 1. John Doe
- **Email:** john.doe@example.com
- **Password:** password123
- **Role:** student
- **Profile:** Frontend Developer, 3-5 years
- **Subscription:** Premium (30 days)

### 2. Jane Smith
- **Email:** jane.smith@example.com
- **Password:** password123
- **Role:** student
- **Profile:** Full Stack Developer, 5-10 years
- **Subscription:** Enterprise (90 days)

### 3. Bob Johnson
- **Email:** bob.johnson@example.com
- **Password:** password123
- **Role:** student
- **Profile:** React Developer, 1-3 years
- **Subscription:** Free

### 4. Alice Williams
- **Email:** alice.williams@example.com
- **Password:** password123
- **Role:** student
- **Profile:** Backend Developer, 0-1 years
- **Subscription:** Free

### 5. Admin User
- **Email:** admin@quizapp.com
- **Password:** admin123
- **Role:** admin
- **Profile:** Other, 10+ years
- **Subscription:** Enterprise

## Usage

### Basic Usage
```bash
cd backend
npm run seed-users
```

### Direct Node Command
```bash
cd backend
node seed-users.js
```

## Features

- ✅ **Safe:** Won't create duplicate users (checks by email)
- ✅ **Secure:** Passwords are hashed using bcrypt
- ✅ **Flexible:** Uses MongoDB URI from `.env` file
- ✅ **Informative:** Shows summary of created users

## Customization

To add your own users, edit `backend/seed-users.js`:

```javascript
const sampleUsers = [
  {
    name: 'Your Name',
    email: 'your.email@example.com',
    password: 'yourpassword',
    role: 'student',
    profile: {
      jobRole: 'Frontend Developer',
      experience: '3-5 years',
      technologyStack: ['JavaScript', 'React'],
      modules: [],
      topics: []
    },
    subscription: {
      type: 'free',
      startDate: new Date(),
      endDate: null,
      isActive: true
    }
  }
];
```

## MongoDB Connection

The script uses the `MONGODB_URI` from your `.env` file:
- **Local:** `mongodb://localhost:27017/quizapp`
- **Atlas:** `mongodb+srv://username:password@cluster.mongodb.net/quizapp`

Make sure your `.env` file has the correct MongoDB URI before running.

## Troubleshooting

### ❌ Connection Error
**Solution:** 
1. Check MongoDB is running (local) or connection string is correct (Atlas)
2. Verify `MONGODB_URI` in `.env` file
3. Run `npm run check-mongodb` to test connection

### ❌ User Already Exists
**Note:** The script skips users that already exist. This is normal behavior.

### ❌ Module Not Found
**Solution:**
```bash
cd backend
npm install
```

## Verify Users

After seeding, you can verify users were created:

### Using MongoDB Compass
1. Connect to your MongoDB
2. Navigate to `quizapp` database
3. Open `users` collection
4. You should see the created users

### Using MongoDB Shell
```bash
mongosh "mongodb://localhost:27017/quizapp"
db.users.find().pretty()
```

### Using API
```bash
# Login with one of the users
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john.doe@example.com","password":"password123"}'
```

## Test Login

After seeding, test login in your frontend:
1. Go to http://localhost:3001/login
2. Use any of the sample user credentials
3. You should be able to login successfully

## Next Steps

1. ✅ Users are created
2. Login with sample users
3. Test the application features
4. Create quizzes and test functionality


