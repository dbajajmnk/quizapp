# Port Configuration Guide

## ✅ Ports Configured

- **Backend**: `http://localhost:5001`
- **Frontend**: `http://localhost:3001`

## Quick Start

### Backend (Port 5001)
```bash
cd backend
npm run dev
```
Backend will run on: `http://localhost:5001`

### Frontend (Port 3001)
```bash
cd frontend
npm start
```
Frontend will run on: `http://localhost:3001`

## Configuration Files

### Backend
- `backend/.env` - Contains `PORT=5001`
- `backend/server.js` - Uses `process.env.PORT || 5001`

### Frontend
- `frontend/.env` - Contains `REACT_APP_API_URL=http://localhost:5001/api`
- `frontend/.env.local` - Contains `PORT=3001` (gitignored)
- `frontend/package.json` - Script uses `PORT=3001`

## Important Notes

1. **Backend Port**: Set in `backend/.env` as `PORT=5001`
2. **Frontend Port**: Set in `frontend/.env.local` or `package.json` script
3. **API URL**: Frontend `.env` must match backend port: `REACT_APP_API_URL=http://localhost:5001/api`
4. **Restart Required**: After changing ports, restart both servers

## Changing Ports

### Change Backend Port
1. Edit `backend/.env`: `PORT=5002` (example)
2. Update `frontend/.env`: `REACT_APP_API_URL=http://localhost:5002/api`
3. Restart backend

### Change Frontend Port
1. Edit `frontend/.env.local`: `PORT=3002` (example)
2. Or edit `frontend/package.json` script
3. Restart frontend

## Troubleshooting

### Port Already in Use
```bash
# Find process using port
netstat -ano | findstr :5001
netstat -ano | findstr :3001

# Kill process
taskkill /PID <PID> /F
```

### Frontend Can't Connect to Backend
- ✅ Check backend is running on port 5001
- ✅ Verify `REACT_APP_API_URL` in `frontend/.env` matches backend port
- ✅ Check CORS settings in backend
- ✅ Restart frontend after changing `.env`

## Current Setup Summary

```
Backend:  http://localhost:5001
Frontend: http://localhost:3001
API:      http://localhost:5001/api
```

All configuration files have been updated to use these ports.


