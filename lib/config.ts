/**
 * Environment configuration validation
 */

const requiredEnvVars = ['NEXT_PUBLIC_API_URL'] as const;

export function validateEnv() {
  if (typeof window === 'undefined') {
    // Server-side validation
    const missing: string[] = [];
    
    for (const envVar of requiredEnvVars) {
      if (!process.env[envVar]) {
        missing.push(envVar);
      }
    }
    
    if (missing.length > 0) {
      console.warn(
        `Missing environment variables: ${missing.join(', ')}. ` +
        'Using default values. This may cause issues in production.'
      );
    }
  }
}

// Validate on module load (server-side only)
if (typeof window === 'undefined') {
  validateEnv();
}

