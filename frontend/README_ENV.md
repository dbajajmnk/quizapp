# Frontend Environment Variables - Quick Reference

## ✅ Setup Complete!

Your frontend `.env` file has been created with default values.

## Quick Commands

```bash
# Create/update .env file
cd frontend
npm run setup-env
```

## Current Configuration

The `.env` file includes:

```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_APP_NAME=Quiz Application
REACT_APP_APP_VERSION=1.0.0
REACT_APP_NODE_ENV=development
```

## Using Environment Variables

### In Your Components:

```typescript
// Direct access
const apiUrl = process.env.REACT_APP_API_URL;

// Using the config file (recommended)
import { API_BASE_URL, API_ENDPOINTS } from './config/api';

// Using the API service
import api from './services/api';
```

### Example Usage:

```typescript
import { API_ENDPOINTS } from './config/api';
import api from './services/api';

// Make API call
const response = await api.get(API_ENDPOINTS.QUIZ.GET_ALL);
```

## Update Backend URL

If your backend runs on a different port, edit `frontend/.env`:

```env
REACT_APP_API_URL=http://localhost:5001/api  # Change port here
```

## Important Notes

1. **Restart Required**: After changing `.env`, restart the dev server (`npm start`)
2. **REACT_APP_ Prefix**: All variables must start with `REACT_APP_`
3. **Build Time**: Variables are embedded at build time, not runtime

## Files Created

- ✅ `frontend/.env` - Your environment variables
- ✅ `frontend/.env.example` - Template for reference
- ✅ `frontend/src/config/api.ts` - API configuration
- ✅ `frontend/src/services/api.ts` - Axios service with interceptors

## Next Steps

1. ✅ `.env` file is ready
2. Start frontend: `npm start`
3. Backend should be running on port 5000
4. Test the connection!

For detailed information, see `ENV_SETUP.md`


