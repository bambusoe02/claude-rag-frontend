'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { apiClient, Document, StatsResponse } from '@/lib/api';
import Link from 'next/link';

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [docsResponse, statsResponse] = await Promise.all([
        apiClient.listDocuments(),
        apiClient.getStats(),
      ]);
      setDocuments(docsResponse.documents);
      setStats(statsResponse);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load documents');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-slate-900/80">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <h1 className="text-xl font-bold text-slate-900 dark:text-slate-50">
            Documents
          </h1>
          <nav className="flex gap-4">
            <Link href="/">
              <Button variant="outline" size="sm">
                Chat
              </Button>
            </Link>
            <Link href="/upload">
              <Button variant="outline" size="sm">
                Upload
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto max-w-6xl px-4 py-12">
        {/* Stats */}
        {stats && (
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card className="p-6">
              <h3 className="mb-2 text-sm font-medium text-slate-600 dark:text-slate-400">
                Total Documents
              </h3>
              <p className="text-3xl font-bold text-slate-900 dark:text-slate-50">
                {stats.unique_documents}
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="mb-2 text-sm font-medium text-slate-600 dark:text-slate-400">
                Total Chunks
              </h3>
              <p className="text-3xl font-bold text-slate-900 dark:text-slate-50">
                {stats.total_chunks}
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="mb-2 text-sm font-medium text-slate-600 dark:text-slate-400">
                Collection
              </h3>
              <p className="text-3xl font-bold text-slate-900 dark:text-slate-50">
                {stats.collection_name}
              </p>
            </Card>
          </div>
        )}

        {/* Documents List */}
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">
              Uploaded Documents
            </h2>
            <Button onClick={fetchData} variant="outline" size="sm" disabled={loading}>
              Refresh
            </Button>
          </div>

          {loading ? (
            <div className="py-12 text-center text-slate-600 dark:text-slate-400">
              Loading documents...
            </div>
          ) : error ? (
            <div className="py-12 text-center text-red-600 dark:text-red-400">
              Error: {error}
            </div>
          ) : documents.length === 0 ? (
            <div className="py-12 text-center">
              <p className="mb-4 text-slate-600 dark:text-slate-400">
                No documents uploaded yet.
              </p>
              <Link href="/upload">
                <Button>Upload Your First Document</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {documents.map((doc, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900 dark:text-slate-50">
                        {doc.filename}
                      </h3>
                      <div className="mt-2 flex items-center gap-2">
                        <Badge variant="secondary">{doc.file_type}</Badge>
                        <span className="text-sm text-slate-600 dark:text-slate-400">
                          {doc.chunks} chunks
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </Card>
      </main>
    </div>
  );
}

