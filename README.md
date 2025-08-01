# CodeCritic AI - Advanced Code Analysis & Optimization Tool

A powerful web-based tool for AI-powered code analysis and refactoring using Google Gemini Pro.

## 🌐 Live Demo
**[CodeCritic AI - Live Demo](https://your-site-name.netlify.app)** *(Update after deployment)*

## Features

- 🤖 **AI-Powered Analysis**: Google Gemini Pro for intelligent code review
- 🔍 **Smart Code Analysis**: Tree-sitter parsing with AST analysis
- 🧠 **RAG-Enhanced Reviews**: Chroma vector database for pattern matching
- ⚡ **Real-time Feedback**: Monaco Editor with live error highlighting
- 🔧 **Automated Refactoring**: Safe code transformations
- 🎯 **Multiple Languages**: TypeScript, JavaScript, Python, Java support

## Tech Stack

### Frontend
- Next.js 14 with TypeScript
- Monaco Editor for code editing
- Tailwind CSS for styling
- Lucide React for icons

### Backend
- Netlify Functions (Serverless)
- LangChain for AI orchestration
- Google Gemini Pro integration
- TypeScript for type safety

## Quick Start

```bash
# Install dependencies
npm run install:all

# Start development servers
npm run dev

# Build for production
npm run build
```

## Project Structure

```
├── frontend/          # Next.js React app
├── backend/           # Fastify API server
├── shared/            # Shared types and utilities
└── package.json       # Root package management
```

## Development

- Frontend: http://localhost:3000
- Backend API: http://localhost:8080

## Environment Configuration

Set up your API key in `backend/.env`:

```env
GOOGLE_API_KEY=your_google_gemini_api_key
```

## 🚀 Deployment

### Deploy to Netlify

1. **One-Click Deploy**
   [![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/Nagasai125/CodeCritic-AI)

2. **Manual Deployment**
   See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Environment Variables for Production
- `GOOGLE_API_KEY`: Your Google Gemini Pro API key