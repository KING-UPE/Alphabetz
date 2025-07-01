# AlphabetZ - English Learning Application

## Overview

AlphabetZ is a full-stack English learning application built with React frontend and Express backend. The application provides interactive quizzes, daily challenges, and progress tracking for users learning English tenses. It features user authentication, multilingual support, and a comprehensive quiz system with various difficulty levels.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: React Context API for auth and language state
- **Data Fetching**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for client-side routing
- **Build Tool**: Vite for development and bundling

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Management**: Connect-pg-simple for PostgreSQL session storage
- **API Style**: RESTful API endpoints

### Development Setup
- **Monorepo Structure**: Client and server code in same repository
- **TypeScript Configuration**: Shared types and schemas in `/shared` directory
- **Development Server**: Vite dev server with Express API proxy
- **Hot Module Replacement**: Enabled for React development

## Key Components

### Database Schema (`shared/schema.ts`)
- **Users Table**: Authentication and user management
- **Quiz Scores Table**: Stores quiz results with difficulty levels
- **Daily Challenges Table**: Tracks daily challenge completion
- **User Progress Table**: Monitors learning progress metrics

### Authentication System
- Simple username/password authentication
- Registration and login endpoints
- Session-based authentication using PostgreSQL sessions
- User context provider for frontend state management

### Quiz System
- Multiple difficulty levels (easy, medium, hard)
- Score tracking and leaderboards
- Real-time feedback on answers
- Progress analytics

### Internationalization
- Multi-language support (English, Spanish, French, German, Arabic)
- Language context provider
- Comprehensive translation system
- RTL support for Arabic

## Data Flow

1. **User Authentication**: Users register/login through forms that communicate with Express API endpoints
2. **Quiz Flow**: Frontend fetches quiz questions, submits answers, and receives scores stored in PostgreSQL
3. **Progress Tracking**: User actions update progress metrics in real-time
4. **Daily Challenges**: System generates and tracks daily learning challenges
5. **Leaderboards**: Aggregated score data displays competitive rankings

## External Dependencies

### Database
- **Neon Database**: Serverless PostgreSQL hosting
- **Drizzle ORM**: Type-safe database operations
- **Connection Pooling**: Built-in with Neon serverless

### UI Components
- **Radix UI**: Headless component primitives
- **shadcn/ui**: Pre-built component library
- **Lucide React**: Icon library
- **Tailwind CSS**: Utility-first styling

### Development Tools
- **Replit Integration**: Development environment support
- **ESBuild**: Fast TypeScript/JavaScript bundling
- **PostCSS**: CSS processing with Tailwind

## Deployment Strategy

### Production Build
- **Frontend**: Vite builds static assets to `/dist/public`
- **Backend**: ESBuild compiles TypeScript server to `/dist`
- **Database**: Drizzle migrations manage schema changes

### Environment Configuration
- Database URL configuration through environment variables
- Separate development and production configurations
- Session secret and other sensitive data via environment variables

### Scalability Considerations
- Serverless database reduces infrastructure management
- Stateless Express server design supports horizontal scaling
- Static asset serving can be offloaded to CDN

## Changelog
- July 01, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.