'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, FileText } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Source } from '@/lib/api';

interface SourceCitationProps {
  source: Source;
  index: number;
}

export function SourceCitation({ source, index }: SourceCitationProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <Card className="bg-gray-900/50 border-gray-800 overflow-hidden dark:bg-slate-800/50 dark:border-slate-700">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-800/50 dark:hover:bg-slate-700/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 text-sm font-medium">
            {index + 1}
          </div>
          <div className="text-left">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-medium text-white dark:text-slate-100">{source.filename}</span>
            </div>
            {source.chunk_id && (
              <span className="text-xs text-gray-500 dark:text-slate-400">Chunk {source.chunk_id}</span>
            )}
          </div>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        )}
      </button>
      
      {isExpanded && (
        <div className="px-4 py-3 border-t border-gray-800 dark:border-slate-700 bg-gray-950/50 dark:bg-slate-900/50">
          <p className="text-sm text-gray-300 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
            {source.text}
          </p>
        </div>
      )}
    </Card>
  );
}

