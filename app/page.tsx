'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MessageSquare, Upload, CheckCircle2, FileText, Sparkles, Shield } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="text-center max-w-4xl mx-auto">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-8">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-300">Powered by Claude Sonnet 4</span>
          </div>
          
          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Chat with Your Documents
            </span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Upload PDFs, TXT, Markdown, or Word docs. Ask questions. 
            Get accurate answers with transparent source citations.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/chat">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white text-lg px-8 py-6 w-full sm:w-auto">
                <MessageSquare className="w-5 h-5 mr-2" />
                Start Chatting
              </Button>
            </Link>
            
            <Link href="/upload">
              <Button size="lg" variant="outline" className="border-gray-700 hover:bg-gray-800 text-lg px-8 py-6 w-full sm:w-auto">
                <Upload className="w-5 h-5 mr-2" />
                Upload Documents
              </Button>
            </Link>
          </div>
          
          {/* Trust Badge */}
          <p className="text-sm text-gray-500">
            🔒 Your documents stay private • No account required • Free to use
          </p>
          
        </div>
      </section>
      
      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          
          {/* Feature 1 */}
          <div className="group bg-gray-900/50 backdrop-blur border border-gray-800 hover:border-purple-500/50 rounded-xl p-8 transition-all">
            <div className="w-14 h-14 bg-purple-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-purple-500/20 transition-all">
              <Upload className="w-7 h-7 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">Multi-Format Support</h3>
            <p className="text-gray-400 leading-relaxed">
              Upload PDF, TXT, Markdown, and Word documents. 
              Automatic processing with intelligent chunking for optimal context.
            </p>
          </div>
          
          {/* Feature 2 */}
          <div className="group bg-gray-900/50 backdrop-blur border border-gray-800 hover:border-cyan-500/50 rounded-xl p-8 transition-all">
            <div className="w-14 h-14 bg-cyan-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-cyan-500/20 transition-all">
              <MessageSquare className="w-7 h-7 text-cyan-400" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">Natural Conversations</h3>
            <p className="text-gray-400 leading-relaxed">
              Ask questions in plain English. Claude Sonnet 4 understands context 
              and provides accurate, detailed answers.
            </p>
          </div>
          
          {/* Feature 3 */}
          <div className="group bg-gray-900/50 backdrop-blur border border-gray-800 hover:border-green-500/50 rounded-xl p-8 transition-all">
            <div className="w-14 h-14 bg-green-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-green-500/20 transition-all">
              <CheckCircle2 className="w-7 h-7 text-green-400" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">Source Citations</h3>
            <p className="text-gray-400 leading-relaxed">
              Every answer includes references to source documents. 
              Click to view exact quotes. Transparent and verifiable.
            </p>
          </div>
          
        </div>
      </section>
      
      {/* How It Works */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              How It Works
            </h2>
            <p className="text-xl text-gray-400">
              Three simple steps to start chatting with your documents
            </p>
          </div>
          
          <div className="space-y-12">
            
            {/* Step 1 */}
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center text-white text-2xl font-bold">
                1
              </div>
              <div className="flex-1 pt-2">
                <h3 className="text-2xl font-bold mb-3 text-white">Upload Your Documents</h3>
                <p className="text-gray-400 text-lg leading-relaxed">
                  Drag and drop your files or click to browse. We support PDF, TXT, 
                  Markdown, and Word documents. Your files are processed instantly 
                  and stored securely in a vector database for fast retrieval.
                </p>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-cyan-600 to-cyan-800 flex items-center justify-center text-white text-2xl font-bold">
                2
              </div>
              <div className="flex-1 pt-2">
                <h3 className="text-2xl font-bold mb-3 text-white">Ask Questions</h3>
                <p className="text-gray-400 text-lg leading-relaxed">
                  Type your question naturally, just like you're talking to a colleague. 
                  Our semantic search finds the most relevant sections from your documents, 
                  and Claude provides context-aware answers.
                </p>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-green-600 to-green-800 flex items-center justify-center text-white text-2xl font-bold">
                3
              </div>
              <div className="flex-1 pt-2">
                <h3 className="text-2xl font-bold mb-3 text-white">Get Cited Answers</h3>
                <p className="text-gray-400 text-lg leading-relaxed">
                  Receive accurate answers with source citations. Every response includes 
                  references you can click to verify. See exactly where the information 
                  came from and build trust in the AI's responses.
                </p>
              </div>
            </div>
            
          </div>
        </div>
      </section>
      
      {/* Tech Stack */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-white">
            Built with Best-in-Class Technology
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              'Claude Sonnet 4',
              'FastAPI',
              'Next.js 15',
              'ChromaDB',
              'TypeScript',
              'OpenAI Embeddings'
            ].map((tech) => (
              <div
                key={tech}
                className="px-6 py-3 bg-gray-900/80 border border-gray-800 rounded-full text-gray-300 hover:border-purple-500/50 transition-all"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Final CTA */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center bg-gradient-to-r from-purple-900/20 to-cyan-900/20 border border-purple-500/20 rounded-2xl p-12">
          <h2 className="text-4xl font-bold mb-6 text-white">
            Ready to Chat with Your Documents?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            No signup required. Start asking questions in seconds.
          </p>
          <Link href="/chat">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white text-lg px-12 py-6">
              <MessageSquare className="w-5 h-5 mr-2" />
              Get Started Now →
            </Button>
          </Link>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t border-gray-800">
        <div className="text-center text-gray-500 text-sm">
          <p>Built with ❤️ using Claude Sonnet 4 • Open Source</p>
        </div>
      </footer>
      
    </div>
  );
}
