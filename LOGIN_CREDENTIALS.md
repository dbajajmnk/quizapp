# 🔐 Login Credentials

## Quick Login Credentials

Use these credentials to test the Quiz Application:

---

## 👤 Student Users

### 1. John Doe (Premium User)
```
Email:    john.doe@example.com
Password: password123
Role:     Student
Profile:  Frontend Developer, 3-5 years experience
```

### 2. Jane Smith (Enterprise User)
```
Email:    jane.smith@example.com
Password: password123
Role:     Student
Profile:  Full Stack Developer, 5-10 years experience
```

### 3. Bob Johnson (Free User)
```
Email:    bob.johnson@example.com
Password: password123
Role:     Student
Profile:  React Developer, 1-3 years experience
```

### 4. Alice Williams (Free User)
```
Email:    alice.williams@example.com
Password: password123
Role:     Student
Profile:  Backend Developer, 0-1 years experience
```

---

## 👨‍💼 Admin User

### 5. Admin User
```
Email:    admin@quizapp.com
Password: admin123
Role:     Admin
Profile:  Other, 10+ years experience
```

---

## 🚀 Quick Start

1. **Open the application:**
   - Frontend: http://localhost:3001
   - Login Page: http://localhost:3001/login

2. **Enter credentials:**
   - Use any of the emails above
   - Password: `password123` (for students) or `admin123` (for admin)

3. **Login and explore:**
   - After login, you'll be redirected to the dashboard
   - Complete profile setup if prompted
   - Create quizzes and test features

---

## 📋 All Credentials Summary

| Name | Email | Password | Role | Subscription |
|------|-------|----------|------|---------------|
| John Doe | john.doe@example.com | password123 | Student | Premium |
| Jane Smith | jane.smith@example.com | password123 | Student | Enterprise |
| Bob Johnson | bob.johnson@example.com | password123 | Student | Free |
| Alice Williams | alice.williams@example.com | password123 | Student | Free |
| Admin User | admin@quizapp.com | admin123 | Admin | Enterprise |

---

## 🔄 Reset/Re-seed Users

If you need to reset the users or add more:

```bash
cd backend
npm run seed-users
```

**Note:** The script won't create duplicates - it skips users that already exist.

---

## 🧪 Test Login via API

You can also test login using curl or Postman:

```bash
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john.doe@example.com","password":"password123"}'
```

---

## ⚠️ Security Note

These are **test credentials** for development only. 
**DO NOT** use these in production!

---

## 📝 Next Steps

1. ✅ Login with any user above
2. ✅ Complete profile setup
3. ✅ Create your first quiz
4. ✅ Test quiz functionality
5. ✅ View progress and results


