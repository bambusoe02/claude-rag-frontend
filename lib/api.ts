import { retryWithBackoff } from './retry';
import { API_TIMEOUT, API_MAX_RETRIES } from '@/constants';

// Validate environment variable
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

if (typeof window === 'undefined' && !process.env.NEXT_PUBLIC_API_URL) {
  console.warn(
    'NEXT_PUBLIC_API_URL is not set. Using default: http://localhost:8000'
  );
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
    const formData = new FormData();
    formData.append('file', file);

    const response = await this.fetchWithTimeout(
      `${this.baseUrl}/api/upload/document`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'Unknown error' }));
      throw new Error(error.detail || `HTTP error! status: ${response.status}`);
    }

    return response.json();
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

