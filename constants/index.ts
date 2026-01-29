// Application constants

// File upload settings
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const ALLOWED_EXTENSIONS = ['.pdf', '.txt', '.md', '.docx'];
export const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'text/plain',
  'text/markdown',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

// API settings
export const API_TIMEOUT = 30000; // 30 seconds
export const API_MAX_RETRIES = 3;
export const RETRY_DELAY = 1000; // 1 second initial delay

// UI settings
export const UPLOAD_STATUS_TIMEOUT = 3000; // 3 seconds

