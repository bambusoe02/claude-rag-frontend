/**
 * Retry utility with exponential backoff
 */

export interface RetryOptions {
  maxRetries?: number;
  initialDelay?: number;
  maxDelay?: number;
  exponentialBase?: number;
  onRetry?: (attempt: number, error: Error) => void;
}

export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const {
    maxRetries = 3,
    initialDelay = 1000,
    maxDelay = 60000,
    exponentialBase = 2,
    onRetry,
  } = options;

  let delay = initialDelay;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === maxRetries) {
        throw error;
      }

      const err = error instanceof Error ? error : new Error(String(error));
      onRetry?.(attempt + 1, err);

      await new Promise((resolve) => setTimeout(resolve, delay));
      delay = Math.min(delay * exponentialBase, maxDelay);
    }
  }

  throw new Error('Retry logic failed unexpectedly');
}

