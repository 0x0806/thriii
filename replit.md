# Overview

THRIII EVENTS is a luxury event management and lighting design company that provides premium event services. The application is a modern full-stack web application built with React and Express, featuring a sophisticated single-page website showcasing the company's services, portfolio, and contact capabilities. The site emphasizes visual appeal with advanced animations, scroll effects, and a premium dark theme aesthetic designed to attract high-end clientele.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

The frontend is built using **React 18** with **TypeScript** and follows a component-based architecture:

- **UI Framework**: Uses shadcn/ui components built on top of Radix UI primitives for accessible, customizable components
- **Styling**: Tailwind CSS with custom CSS variables for theming, featuring a luxury dark theme with gold accents
- **State Management**: React Query (TanStack Query) for server state management with custom query client configuration
- **Routing**: Wouter for lightweight client-side routing
- **Build Tool**: Vite for fast development and optimized production builds
- **Component Structure**: Organized into sections (Hero, About, Services, Portfolio, Testimonials, Contact, Footer) with reusable UI components

## Backend Architecture

The backend uses a minimal **Express.js** server architecture:

- **Server Framework**: Express.js with TypeScript support
- **Development**: Hot reload with tsx for TypeScript execution
- **Static Serving**: Vite integration for development, static file serving for production
- **API Routes**: Placeholder structure for future API endpoints under `/api` prefix
- **Storage Interface**: Abstracted storage layer with in-memory implementation (ready for database integration)

## Data Storage Solutions

Currently implements an **in-memory storage system** with interfaces designed for easy migration:

- **Database ORM**: Drizzle ORM configured for PostgreSQL with schema definitions
- **Schema Management**: Type-safe database schemas using Drizzle with Zod validation
- **Migration System**: Drizzle Kit for database migrations and schema management
- **Storage Interface**: Abstract storage layer with CRUD operations for users (expandable for events, bookings, etc.)

## Authentication and Authorization

Basic user schema is defined but authentication is not yet implemented:

- **User Schema**: PostgreSQL table with username/password fields
- **Validation**: Zod schemas for type-safe user input validation
- **Future Implementation**: Ready for session-based or JWT authentication integration

## External Dependencies

### Third-Party Services

- **Form Handling**: FormSubmit.co for contact form submissions without backend processing
- **Database**: Neon Database (PostgreSQL) configured via DATABASE_URL environment variable
- **Fonts**: Google Fonts (Playfair Display, Inter, Cinzel) for typography
- **Icons**: Font Awesome for UI icons

### Development Tools

- **Replit Integration**: Vite plugins for Replit development environment (cartographer, dev banner, error overlay)
- **TypeScript**: Full TypeScript support with strict configuration
- **ESLint/Prettier**: Code quality and formatting (configuration implied)

### UI/UX Libraries

- **Component Library**: Radix UI primitives for accessible component foundations
- **Animation**: Custom CSS animations with scroll-triggered reveals using Intersection Observer API
- **Form Handling**: React Hook Form with Hookform Resolvers for form validation
- **Date Utilities**: date-fns for date manipulation
- **Styling Utilities**: clsx and class-variance-authority for conditional styling
- **Carousel**: Embla Carousel for image galleries

The architecture is designed to be scalable and maintainable, with clear separation of concerns and ready-to-extend patterns for future feature development.