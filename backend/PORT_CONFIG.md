# Port Configuration

## Current Port Settings

- **Backend**: Port `5001`
- **Frontend**: Port `3001`

## Why Different Ports?

Using different ports helps avoid conflicts with other applications:
- Default React port (3000) might be in use
- Default Express port (5000) might be in use
- Easier to run multiple projects simultaneously

## Changing Ports

### Backend Port

Edit `backend/.env`:
```env
PORT=5001  # Change to your desired port
```

### Frontend Port

**Option 1: Using .env.local (Recommended)**
Create or edit `frontend/.env.local`:
```env
PORT=3001  # Change to your desired port
```

**Option 2: Using package.json**
Edit `frontend/package.json`:
```json
"start": "set PORT=3001 && react-scripts start"
```

**Option 3: Using environment variable**
```bash
PORT=3001 npm start
```

### Update API URL

After changing backend port, update `frontend/.env`:
```env
REACT_APP_API_URL=http://localhost:5001/api
```

## Default Ports

| Service | Default | Current |
|---------|---------|---------|
| Backend | 5000 | 5001 |
| Frontend | 3000 | 3001 |
| MongoDB | 27017 | 27017 |

## Testing Ports

### Check if port is in use:
```bash
# Windows
netstat -ano | findstr :5001
netstat -ano | findstr :3001

# Kill process on port
taskkill /PID <PID> /F
```

### Test backend:
```bash
curl http://localhost:5001/api/health
```

### Test frontend:
Open browser: `http://localhost:3001`


