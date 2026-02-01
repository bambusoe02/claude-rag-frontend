# Claude RAG Frontend

[![CI](https://github.com/bambusoe02/claude-rag-frontend/workflows/CI/badge.svg)](https://github.com/bambusoe02/claude-rag-frontend/actions)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

Modern Next.js frontend for the Claude RAG Chatbot.

## Features

- ✅ Next.js 15 with App Router
- ✅ TypeScript for type safety
- ✅ Tailwind CSS for styling
- ✅ shadcn/ui components
- ✅ Real-time chat interface
- ✅ File drag & drop upload
- ✅ Source citations
- ✅ Responsive design
- ✅ Dark mode support

## Setup

1. **Install dependencies:**
```bash
npm install
```

2. **Set environment variables:**
```bash
cp .env.example .env.local
# Edit .env.local and set NEXT_PUBLIC_API_URL
```

3. **Run development server:**
```bash
npm run dev
```

Visit http://localhost:3000

## Pages

- `/` - Main chat interface
- `/upload` - Document upload page
- `/documents` - View uploaded documents

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variable: `NEXT_PUBLIC_API_URL`
4. Deploy!

### Other Platforms

Build the app:
```bash
npm run build
```

Start production server:
```bash
npm start
```

## Environment Variables

- `NEXT_PUBLIC_API_URL` - Backend API URL (required)

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 🔑 Keywords

**Next.js 15**, **React 19**, **TypeScript**, **Tailwind CSS**, **shadcn/ui**, **RAG frontend**, **Claude Sonnet 4**, **production-ready**, **Vercel**, **real-time chat**, **document upload**, **source citations**, **responsive design**, **dark mode**, **App Router**, **modern UI**
