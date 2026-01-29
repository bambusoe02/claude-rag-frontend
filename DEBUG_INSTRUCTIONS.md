# Emergency Debug Instructions - File Upload Issue

## Quick Debugging Steps

### 1. Check Browser Console (CRITICAL)
1. Open https://claude-rag-frontend.vercel.app
2. Press F12 to open DevTools
3. Go to **Console** tab
4. Upload a file
5. Look for logs starting with `[UPLOAD DEBUG]` and `[API DEBUG]`
6. Copy ALL console output here

### 2. Check Network Tab
1. In DevTools, go to **Network** tab
2. Upload a file
3. Find the request to `/api/upload/document`
4. Check:
   - **Status code** (200, 404, 500, etc.)
   - **Request URL** (should be your Railway backend URL)
   - **Response** tab - what does it say?
   - **Headers** tab - check CORS headers

### 3. Verify API URL
In browser console, type:
```javascript
console.log('API URL:', process.env.NEXT_PUBLIC_API_URL)
```

Should show: `https://claude-rag-backend-production.up.railway.app`

### 4. Test Backend Directly
Open in browser:
```
https://claude-rag-backend-production.up.railway.app/
```

Should show: `{"status": "Claude RAG API running", ...}`

### 5. Check Railway Logs
1. Go to Railway Dashboard
2. Select `claude-rag-backend` project
3. Go to **Deployments** → **View Logs**
4. Look for logs starting with `[UPLOAD]`, `[CORS]`, `[VECTOR_STORE]`
5. Copy relevant error messages

### 6. Verify Environment Variables

**Frontend (Vercel):**
- Settings → Environment Variables
- Check `NEXT_PUBLIC_API_URL` = `https://claude-rag-backend-production.up.railway.app`

**Backend (Railway):**
- Variables tab
- Check:
  - `ANTHROPIC_API_KEY` is set
  - `OPENAI_API_KEY` is set
  - `ALLOWED_ORIGINS` includes `https://claude-rag-frontend.vercel.app`

### 7. Common Issues

**CORS Error:**
- Error: "Access to fetch at '...' has been blocked by CORS policy"
- Fix: Update `ALLOWED_ORIGINS` in Railway to include frontend URL

**404 Not Found:**
- Error: "HTTP error! status: 404"
- Fix: Check API URL is correct, backend is deployed

**500 Internal Server Error:**
- Error: "HTTP error! status: 500"
- Fix: Check Railway logs for specific error, likely missing API keys

**Empty Documents List:**
- Documents upload but don't appear
- Fix: Check ChromaDB persistence, verify documents are stored

## What to Report

After running all checks, provide:

1. **Console logs** - All `[UPLOAD DEBUG]` and `[API DEBUG]` messages
2. **Network request** - Status code, URL, response body
3. **Railway logs** - Any `[UPLOAD]`, `[CORS]`, or error messages
4. **Environment variables** - Confirmed they are set correctly
5. **API URL** - What the browser console shows

