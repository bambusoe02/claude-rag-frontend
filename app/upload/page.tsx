'use client';

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { apiClient } from '@/lib/api';
import {
  MAX_FILE_SIZE,
  ALLOWED_EXTENSIONS,
  ALLOWED_MIME_TYPES,
  UPLOAD_STATUS_TIMEOUT,
} from '@/constants';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function UploadPage() {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const router = useRouter();

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    async (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        await handleFile(e.dataTransfer.files[0]);
      }
    },
    []
  );

  const handleFileInput = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        await handleFile(e.target.files[0]);
      }
    },
    []
  );

  const handleFile = async (file: File) => {
    console.log('[UPLOAD DEBUG] 1. Upload started:', file.name, 'Size:', file.size, 'Type:', file.type);
    
    const isValidType =
      ALLOWED_MIME_TYPES.includes(file.type) ||
      ALLOWED_EXTENSIONS.some((ext) => file.name.toLowerCase().endsWith(ext));

    if (!isValidType) {
      console.error('[UPLOAD DEBUG] Invalid file type');
      setUploadStatus({
        type: 'error',
        message: `Invalid file type. Allowed: ${ALLOWED_EXTENSIONS.join(', ').toUpperCase()}`,
      });
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      console.error('[UPLOAD DEBUG] File too large:', file.size);
      setUploadStatus({
        type: 'error',
        message: `File size must be less than ${MAX_FILE_SIZE / 1024 / 1024}MB`,
      });
      return;
    }

    setUploading(true);
    setUploadStatus({ type: null, message: '' });

    try {
      console.log('[UPLOAD DEBUG] 2. Calling apiClient.uploadDocument...');
      const response = await apiClient.uploadDocument(file);
      console.log('[UPLOAD DEBUG] 3. Upload success! Response:', response);
      setUploadStatus({
        type: 'success',
        message: `Successfully uploaded ${response.filename}. Created ${response.chunks} chunks.`,
      });
      // Clear status after timeout
      setTimeout(() => {
        setUploadStatus({ type: null, message: '' });
      }, UPLOAD_STATUS_TIMEOUT);
    } catch (error) {
      console.error('[UPLOAD DEBUG] 4. Upload error:', error);
      setUploadStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Upload failed',
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-slate-900/80">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <h1 className="text-xl font-bold text-slate-900 dark:text-slate-50">
            Upload Documents
          </h1>
          <nav className="flex gap-4">
            <Link href="/chat">
              <Button variant="outline" size="sm">
                Chat
              </Button>
            </Link>
            <Link href="/documents">
              <Button variant="outline" size="sm">
                Documents
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto max-w-4xl px-4 py-12">
        <Card className="p-8">
          <h2 className="mb-4 text-2xl font-semibold text-slate-900 dark:text-slate-50">
            Upload Document
          </h2>
          <p className="mb-6 text-slate-600 dark:text-slate-400">
            Upload PDF, TXT, MD, or DOCX files to add them to your knowledge base.
          </p>

          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`relative rounded-lg border-2 border-dashed p-12 text-center transition-colors ${
              dragActive
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-slate-300 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/50'
            } ${uploading ? 'pointer-events-none opacity-50' : ''}`}
          >
            <input
              type="file"
              id="file-upload"
              className="hidden"
              accept=".pdf,.txt,.md,.docx"
              onChange={handleFileInput}
              disabled={uploading}
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer"
            >
              <div className="mb-4 text-4xl">📄</div>
              <p className="mb-2 text-lg font-medium text-slate-900 dark:text-slate-50">
                {uploading ? 'Uploading...' : 'Drag & drop your file here'}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                or click to browse
              </p>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-500">
                Supported: PDF, TXT, MD, DOCX (max 10MB)
              </p>
            </label>
          </div>

          {uploadStatus.type && (
            <div
              className={`mt-4 rounded-lg p-4 ${
                uploadStatus.type === 'success'
                  ? 'bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                  : 'bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-400'
              }`}
            >
              {uploadStatus.message}
            </div>
          )}
        </Card>
      </main>
    </div>
  );
}

