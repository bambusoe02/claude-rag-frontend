import { retryWithBackoff } from './retry';
import { API_TIMEOUT, API_MAX_RETRIES } from '@/constants';

// Validate and normalize environment variable
function normalizeApiUrl(url: string | undefined): string {
  const defaultUrl = 'http://localhost:8000';
  
  if (!url) {
    return defaultUrl;
  }
  
  // Remove trailing slashes
  url = url.trim().replace(/\/+$/, '');
  
  // If URL doesn't start with http:// or https://, add https://
  if (!url.match(/^https?:\/\//)) {
    console.warn('[API DEBUG] API URL missing protocol, adding https://');
    url = `https://${url}`;
  }
  
  return url;
}

const API_URL = normalizeApiUrl(process.env.NEXT_PUBLIC_API_URL);

if (typeof window === 'undefined' && !process.env.NEXT_PUBLIC_API_URL) {
  console.warn(
    'NEXT_PUBLIC_API_URL is not set. Using default: http://localhost:8000'
  );
}

// Log API URL in browser for debugging
if (typeof window !== 'undefined') {
  console.log('[API DEBUG] API_URL configured as:', API_URL);
  console.log('[API DEBUG] NEXT_PUBLIC_API_URL env var:', process.env.NEXT_PUBLIC_API_URL);
  console.log('[API DEBUG] Normalized API_URL:', API_URL);
}

export interface ChatRequest {
  message: string;
  conversation_id?: string;
}

export interface ChatResponse {
  response: string;
  sources: Source[];
  conversation_id: string;
}

export interface Source {
  filename: string;
  text: string;
  chunk_id?: number;
}

export interface Document {
  filename: string;
  file_type: string;
  chunks: number;
  doc_id?: string;
}

export interface UploadResponse {
  success: boolean;
  doc_id: string;
  filename: string;
  chunks: number;
  message: string;
}

export interface DocumentsListResponse {
  success: boolean;
  count: number;
  documents: Document[];
}

export interface StatsResponse {
  success: boolean;
  total_chunks: number;
  unique_documents: number;
  collection_name: string;
}

class ApiClient {
  private baseUrl: string;
  private timeout: number;

  constructor(baseUrl: string = API_URL, timeout: number = 30000) {
    this.baseUrl = baseUrl;
    this.timeout = timeout;
  }

  private async fetchWithTimeout(
    url: string,
    options: RequestInit
  ): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error(`Request timeout after ${this.timeout}ms`);
      }
      throw error;
    }
  }

  async chat(request: ChatRequest): Promise<ChatResponse> {
    const response = await this.fetchWithTimeout(
      `${this.baseUrl}/api/chat/message`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      }
    );

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'Unknown error' }));
      throw new Error(error.detail || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async uploadDocument(file: File): Promise<UploadResponse> {
    console.log('[API DEBUG] uploadDocument called');
    console.log('[API DEBUG] Base URL:', this.baseUrl);
    console.log('[API DEBUG] File:', file.name, file.size, file.type);
    
    const formData = new FormData();
    formData.append('file', file);

    const url = `${this.baseUrl}/api/upload/document`;
    console.log('[API DEBUG] Request URL:', url);

    try {
      const response = await this.fetchWithTimeout(
        url,
        {
          method: 'POST',
          body: formData,
        }
      );

      console.log('[API DEBUG] Response status:', response.status);
      console.log('[API DEBUG] Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('[API DEBUG] Error response:', errorText);
        let error;
        try {
          error = JSON.parse(errorText);
        } catch {
          error = { detail: errorText || 'Unknown error' };
        }
        throw new Error(error.detail || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('[API DEBUG] Success response:', data);
      return data;
    } catch (error) {
      console.error('[API DEBUG] Exception caught:', error);
      if (error instanceof Error) {
        console.error('[API DEBUG] Error message:', error.message);
        console.error('[API DEBUG] Error stack:', error.stack);
      }
      throw error;
    }
  }

  async listDocuments(): Promise<DocumentsListResponse> {
    const response = await this.fetchWithTimeout(
      `${this.baseUrl}/api/documents/list`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'Unknown error' }));
      throw new Error(error.detail || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async getStats(): Promise<StatsResponse> {
    const response = await this.fetchWithTimeout(
      `${this.baseUrl}/api/documents/stats`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'Unknown error' }));
      throw new Error(error.detail || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async deleteDocument(docId: string): Promise<void> {
    const response = await this.fetchWithTimeout(
      `${this.baseUrl}/api/documents/${docId}`,
      {
        method: 'DELETE',
      }
    );

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'Unknown error' }));
      throw new Error(error.detail || `HTTP error! status: ${response.status}`);
    }
  }

  async healthCheck(): Promise<{ status: string }> {
    const response = await this.fetchWithTimeout(`${this.baseUrl}/health`, {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error('Backend is not available');
    }
    return response.json();
  }
}

// Create API client with timeout
const baseClient = new ApiClient(API_URL, API_TIMEOUT);

// Wrap API methods with retry logic
export const apiClient = {
  chat: (request: ChatRequest) =>
    retryWithBackoff(
      () => baseClient.chat(request),
      {
        maxRetries: API_MAX_RETRIES,
        onRetry: (attempt, error) => {
          if (typeof window !== 'undefined') {
            console.warn(`Chat API retry ${attempt}/${API_MAX_RETRIES}:`, error.message);
          }
        },
      }
    ),

  uploadDocument: (file: File) =>
    retryWithBackoff(
      () => baseClient.uploadDocument(file),
      {
        maxRetries: API_MAX_RETRIES,
        onRetry: (attempt, error) => {
          if (typeof window !== 'undefined') {
            console.warn(`Upload API retry ${attempt}/${API_MAX_RETRIES}:`, error.message);
          }
        },
      }
    ),

  listDocuments: () =>
    retryWithBackoff(
      () => baseClient.listDocuments(),
      {
        maxRetries: API_MAX_RETRIES,
      }
    ),

  getStats: () =>
    retryWithBackoff(
      () => baseClient.getStats(),
      {
        maxRetries: API_MAX_RETRIES,
      }
    ),

  deleteDocument: (docId: string) =>
    retryWithBackoff(
      () => baseClient.deleteDocument(docId),
      {
        maxRetries: API_MAX_RETRIES,
      }
    ),

  healthCheck: () => baseClient.healthCheck(),
};

