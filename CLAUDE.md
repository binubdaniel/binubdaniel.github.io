# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Development
npm run dev         # Start development server on localhost:3000
npm run build       # Build production application
npm run start       # Start production server
npm run lint        # Run ESLint for code quality

# Development workflow
npm run dev         # Primary development command
```

## Architecture Overview

This is a Next.js 15 personal website and AI-powered chat application using the App Router pattern with several key architectural components:

### Core Structure
- **Next.js App Router**: Uses the modern `app/` directory structure
- **TypeScript**: Full TypeScript implementation with strict typing
- **Tailwind CSS + Radix UI**: Styling with component library integration
- **Supabase**: Database and authentication backend
- **Vercel Analytics**: Built-in analytics tracking

### Key Directories
- `app/`: Next.js app router pages and API routes
- `components/`: Reusable UI components organized by feature
- `lib/`: Core business logic and utilities
- `hooks/`: Custom React hooks
- `types/`: TypeScript type definitions

### AI Chat System
The application features a sophisticated AI chat system built with:
- **LangGraph Architecture**: Custom chat processing pipeline in `lib/langgraph/`
- **State Management**: Complex chat state with validation, meeting scheduling, and conversation flow
- **API Route**: `/api/chat` handles chat processing with comprehensive error handling
- **Anthropic SDK**: Integration for AI responses

### Key Features
- **Chat Interface**: Full-featured chat UI with message history, typing indicators, and error handling
- **Personal Website**: Portfolio sections including projects, skills, and contact information
- **Theme System**: Dark/light mode switching with next-themes
- **Email Integration**: SMTP configuration for contact forms and notifications
- **Responsive Design**: Mobile-first responsive layout

### Environment Variables Required
```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Email (Gmail/SMTP)
GMAIL_USER=
GMAIL_APP_PASSWORD=
SMTP_FROM=
GMAIL_CLIENT_ID=
GMAIL_CLIENT_SECRET=
GMAIL_REFRESH_TOKEN=
GMAIL_ACCESS_TOKEN=
RESEND_API_KEY=

# AI Services
ANTHROPIC_API_KEY=
```

### Component Architecture
- **Chat Components**: Modular chat interface in `components/chat/`
- **Homepage Components**: Feature sections in `components/homepage/`
- **UI Components**: Reusable primitives in `components/ui/`
- **Layout Components**: Shared layout elements and navigation

### Data Flow
1. Chat messages processed through LangGraph pipeline
2. State managed through custom React hooks (`useChat`, `useSessions`)
3. Supabase handles message persistence and session management
4. Real-time updates through React state management

### Development Notes
- Uses React 19 with Next.js 15 for latest features
- Implements proper error boundaries and loading states
- Follows TypeScript strict mode practices
- Uses Zod for runtime validation
- Implements comprehensive error handling with custom error types