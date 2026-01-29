# Claude RAG Frontend

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
