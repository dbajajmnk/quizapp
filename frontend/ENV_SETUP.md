# Frontend Environment Setup

## Overview

The frontend uses environment variables to configure the API connection and app settings. All React environment variables must be prefixed with `REACT_APP_` to be accessible in the application.

## Quick Setup

### Step 1: Create .env file

```bash
cd frontend
npm run setup-env
```

This creates a `.env` file with default configuration.

### Step 2: Customize (if needed)

Edit `frontend/.env` to match your backend configuration:

```env
# Backend API URL - Update if your backend runs on different port
REACT_APP_API_URL=http://localhost:5000/api

# App Configuration
REACT_APP_APP_NAME=Quiz Application
REACT_APP_APP_VERSION=1.0.0

# Environment
REACT_APP_NODE_ENV=development
```

## Environment Variables

### Required Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `REACT_APP_API_URL` | Backend API base URL | `http://localhost:5000/api` |

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `REACT_APP_APP_NAME` | Application name | `Quiz Application` |
| `REACT_APP_APP_VERSION` | Application version | `1.0.0` |
| `REACT_APP_NODE_ENV` | Environment mode | `development` |

## Usage in Code

Environment variables are accessed via `process.env.REACT_APP_*`:

```typescript
// Direct access
const apiUrl = process.env.REACT_APP_API_URL;

// Using config file (recommended)
import { API_BASE_URL } from './config/api';
```

## Configuration Files

The project includes:

- **`src/config/api.ts`** - API configuration and endpoints
- **`src/services/api.ts`** - Axios instance with interceptors

## Common Scenarios

### Development (Local)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### Production
```env
REACT_APP_API_URL=https://api.yourdomain.com/api
```

### Staging
```env
REACT_APP_API_URL=https://staging-api.yourdomain.com/api
```

## Important Notes

1. **REACT_APP_ Prefix**: All environment variables must start with `REACT_APP_` to be accessible in React
2. **Restart Required**: After changing `.env`, restart the development server
3. **Build Time**: Environment variables are embedded at build time, not runtime
4. **Security**: Never commit sensitive data. Use `.env.local` for local overrides

## .env Files Priority

React loads environment variables in this order (higher priority overrides lower):

1. `npm start`: `.env.development.local`, `.env.local`, `.env.development`, `.env`
2. `npm run build`: `.env.production.local`, `.env.local`, `.env.production`, `.env`

## Troubleshooting

### Variable not accessible?
- ✅ Check it starts with `REACT_APP_`
- ✅ Restart the dev server after changes
- ✅ Check for typos in variable name

### API connection fails?
- ✅ Verify `REACT_APP_API_URL` matches your backend URL
- ✅ Check backend is running
- ✅ Check CORS settings in backend

### Build issues?
- ✅ Ensure all required variables are set
- ✅ Check `.env` file is in `frontend/` directory
- ✅ Verify no syntax errors in `.env` file

## Example .env Files

### .env (Development)
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_APP_NAME=Quiz Application
REACT_APP_NODE_ENV=development
```

### .env.production (Production)
```env
REACT_APP_API_URL=https://api.quizapp.com/api
REACT_APP_APP_NAME=Quiz Application
REACT_APP_NODE_ENV=production
```

## Next Steps

1. ✅ Create `.env` file: `npm run setup-env`
2. ✅ Update `REACT_APP_API_URL` if needed
3. ✅ Start frontend: `npm start`
4. ✅ Verify API connection works


