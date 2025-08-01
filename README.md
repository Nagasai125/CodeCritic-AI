# AI Code Reviewer & Refactor Assistant

A powerful web-based tool for AI-powered code analysis and refactoring with multi-model support.

## Features

- 🤖 **Multi-Model AI Support**: OpenAI GPT-4, Claude, Gemini, Grok, Llama
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
- Fastify server with TypeScript
- LangChain for AI orchestration
- Tree-sitter for code parsing
- Chroma vector database for RAG

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
- Chroma DB: http://localhost:8000

## Model Configuration

Set up your API keys in `backend/.env`:

```env
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_claude_key
GOOGLE_API_KEY=your_gemini_key
# Ollama runs locally on port 11434
```