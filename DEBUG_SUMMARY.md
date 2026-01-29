# Debug Logging Added - File Upload Issue

## Changes Made

### Frontend Debugging Added:

1. **Upload Component** (`app/upload/page.tsx`)
   - Added console logs at each step:
     - File validation
     - File size check
     - API call start
     - Success/error responses

2. **API Client** (`lib/api.ts`)
   - Added comprehensive logging:
     - API URL being used
     - Request details (file name, size, type)
     - Response status and headers
     - Full error details with stack traces
   - Logs API URL on page load

3. **Documents Page** (`app/documents/page.tsx`)
   - Added logging for document fetching
   - Logs response data and document count

### Backend Debugging Added:

1. **Upload Router** (`routers/upload.py`)
   - Logs file received (name, type, size)
   - Logs each processing step:
     - Parsing
     - Chunking
     - Embedding generation
     - Storage
   - Logs request origin for CORS debugging

2. **Documents Router** (`routers/documents.py`)
   - Logs list requests
   - Logs collection count
   - Logs number of documents returned

3. **Vector Store** (`rag/vector_store.py`)
   - Logs storage operations
   - Verifies documents are stored
   - Logs total collection count

4. **Main App** (`main.py`)
   - Logs CORS allowed origins on startup

## Next Steps

1. **Deploy these changes:**
   ```bash
   git add .
   git commit -m "debug: add comprehensive logging for upload issue"
   git push
   ```

2. **Wait for deployment** (Vercel + Railway)

3. **Test upload** and check:
   - Browser console (F12) for `[UPLOAD DEBUG]` and `[API DEBUG]` logs
   - Network tab for request/response details
   - Railway logs for backend processing

4. **Report findings:**
   - Copy all console logs
   - Copy network request details
   - Copy Railway log errors (if any)

## Expected Debug Output

### Browser Console Should Show:
```
[API DEBUG] API_URL configured as: https://claude-rag-backend-production.up.railway.app
[UPLOAD DEBUG] 1. Upload started: test.pdf Size: 12345 Type: application/pdf
[UPLOAD DEBUG] 2. Calling apiClient.uploadDocument...
[API DEBUG] uploadDocument called
[API DEBUG] Base URL: https://claude-rag-backend-production.up.railway.app
[API DEBUG] Request URL: https://claude-rag-backend-production.up.railway.app/api/upload/document
[API DEBUG] Response status: 200
[API DEBUG] Success response: {success: true, filename: "test.pdf", ...}
[UPLOAD DEBUG] 3. Upload success! Response: {...}
```

### Railway Logs Should Show:
```
[UPLOAD] Received upload request for file: test.pdf
[UPLOAD] File size: 12345 bytes (0.01 MB)
[UPLOAD] Parsing document...
[UPLOAD] Parsed content length: 5000 characters
[UPLOAD] Chunking text...
[UPLOAD] Created 5 chunks
[UPLOAD] Generating embeddings...
[UPLOAD] Generated 5 embeddings
[UPLOAD] Storing document with ID: abc-123
[VECTOR_STORE] Storing 5 chunks for doc_id: abc-123
[VECTOR_STORE] Successfully stored 5 chunks
[UPLOAD] Document stored successfully. Returning response.
```

## Common Issues to Check

1. **CORS Error** - Check `ALLOWED_ORIGINS` includes frontend URL
2. **404 Error** - Check API URL is correct
3. **500 Error** - Check Railway logs for specific error
4. **Empty Response** - Check if documents are actually stored in ChromaDB
5. **Missing API Keys** - Check Railway environment variables

