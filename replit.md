# Romantic Photo Gallery with Glassmorphism UI

## Overview

This is a modern, minimalistic photo gallery web application designed to showcase romantic couple photos with personal descriptions. The project features a glassmorphism design aesthetic with frosted glass effects, smooth animations, and an elegant interface. Built as a full-stack application, it provides both a beautiful frontend gallery experience and a simple admin interface for content management.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

The frontend is built with **React** and **TypeScript**, utilizing modern development practices:

- **UI Framework**: React with TypeScript for type safety and component-based architecture
- **Styling**: 
  - Tailwind CSS for utility-first styling with custom glassmorphism effects
  - Shadcn/UI components for consistent, accessible UI elements
  - Custom CSS variables for theming with romantic color palette (pinks, purples)
- **State Management**: 
  - TanStack Query (React Query) for server state management and caching
  - React Hook Form for form validation and management
- **Routing**: Wouter for lightweight client-side routing
- **Animation**: Framer Motion for smooth transitions and glassmorphism effects
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture

The backend follows a RESTful API design using **Node.js** and **Express**:

- **Server Framework**: Express.js with TypeScript for type-safe server development
- **API Design**: RESTful endpoints for photo CRUD operations (`/api/photos`)
- **Data Validation**: Zod schemas for request/response validation
- **Error Handling**: Centralized error handling middleware
- **Development Tools**: TSX for TypeScript execution in development

### Data Storage Solutions

The application uses a flexible storage approach:

- **Database**: PostgreSQL configured through Drizzle ORM
- **ORM**: Drizzle ORM for type-safe database operations and migrations
- **Development Storage**: In-memory storage with sample data for quick development
- **Schema**: Well-defined photo schema with fields for URL, title, description, date, location, and timestamps

### Key Features Architecture

- **Photo Gallery**: Responsive grid layout with glassmorphism cards
- **Photo Viewer**: Full-screen modal with keyboard/touch navigation
- **Admin Panel**: Form-based interface for adding new photos with validation
- **Image Handling**: External image URLs (Unsplash for samples) with loading states
- **Responsive Design**: Mobile-first approach with touch gestures and keyboard shortcuts

### Development Experience

- **Hot Reloading**: Vite HMR for instant development feedback
- **Type Safety**: End-to-end TypeScript with shared schemas
- **Code Quality**: Consistent import aliasing and component organization
- **Replit Integration**: Optimized for Replit development environment with cartographer and dev banner plugins

## External Dependencies

### Core Framework Dependencies
- **@vitejs/plugin-react**: React support for Vite build system
- **express**: Node.js web framework for REST API
- **drizzle-orm**: Type-safe PostgreSQL ORM
- **@neondatabase/serverless**: Serverless PostgreSQL driver

### UI and Styling
- **@radix-ui/***: Accessible, unstyled UI primitives (accordion, dialog, dropdown-menu, etc.)
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Type-safe CSS class variants
- **framer-motion**: Animation library for smooth transitions

### State Management and Forms
- **@tanstack/react-query**: Server state management and caching
- **react-hook-form**: Form validation and management
- **@hookform/resolvers**: Form validation resolvers
- **zod**: Schema validation library

### Development Tools
- **tsx**: TypeScript execution for Node.js
- **@replit/vite-plugin-***: Replit-specific development plugins
- **esbuild**: Fast JavaScript bundler for production builds

### Database and Validation
- **drizzle-kit**: Database migration and schema management
- **drizzle-zod**: Integration between Drizzle ORM and Zod validation
- **connect-pg-simple**: PostgreSQL session store

The application is designed to be easily deployable and scalable, with a clear separation between development and production configurations.