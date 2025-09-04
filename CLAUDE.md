# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Vite and hot reloading
- `npm run build` - Build for production (runs TypeScript compilation + Vite build)
- `npm run lint` - Run ESLint for code quality checks
- `npm run preview` - Preview production build locally

## Architecture Overview

This is a React-based chatbot application that integrates with Puter AI services. The app uses a component-based architecture with TypeScript and Tailwind CSS for styling.

### Core Components Structure
- **App.tsx** - Main application container managing state and component orchestration
- **useChat hook** - Central chat logic managing messages, API communication, and state
- **Components** - Modular UI components (ChatHeader, MessagesContainer, ChatInput, MessageItem)
- **Puter Integration** - AI chat functionality through window.puter.ai.chat API

### State Management
- Chat state is managed through the `useChat` hook using React useState/useEffect
- Messages are persisted to localStorage via storage utilities
- Real-time streaming responses are handled through async iterators

### Key Features
- Streaming chat responses with real-time updates
- File drag-and-drop support for text files
- Message editing and deletion
- Chat export/import functionality
- Model selection support

### File Structure
```
src/
├── components/        # UI components
├── hooks/            # Custom React hooks (useChat)
├── types/            # TypeScript type definitions
├── utils/            # Utilities (puter, storage, markdown)
└── App.tsx           # Main application
```

### Tech Stack
- **React 19** with TypeScript
- **Vite** for build tooling and dev server
- **Tailwind CSS 4** for styling
- **ESLint** with TypeScript and React plugins
- **Puter AI** for chat functionality

### Development Notes
- The app expects Puter's global API to be available at `window.puter`
- Chat data is automatically saved/loaded from localStorage
- Supports text file processing with syntax highlighting
- Uses streaming for real-time chat responses