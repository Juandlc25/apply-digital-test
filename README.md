# GamerShop - Frontend Developer Test

A responsive web application built with Next.js, TypeScript, and Tailwind CSS for a game store catalog and shopping cart.

## Features

- **Game Catalog**: Browse games with filtering by genre
- **Shopping Cart**: Add/remove games with persistent local storage
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Pagination**: "See More" functionality for loading additional games
- **Error Handling**: Comprehensive error handling and user feedback
- **Unit Testing**: Comprehensive test coverage for components and services

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Testing**: Jest with React Testing Library
- **Icons**: React Icons
- **State Management**: React hooks with localStorage

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd frontend-test-template
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
# Create .env.local file
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run test` - Run unit tests
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── api/            # API routes
│   ├── cart/           # Cart page
│   └── page.tsx        # Main catalog page
├── components/         # React components
│   ├── __tests__/     # Component tests
│   └── ...            # UI components
├── config/            # Configuration files
├── services/          # Business logic services
│   └── __tests__/     # Service tests
└── utils/             # Utility functions and types
```

## Testing

The project includes comprehensive unit tests for:

- Components (GameCard, CartItem, GenreFilter, etc.)
- Services (gameService, cartService)
- Error handling and edge cases

Run tests with:

```bash
npm test
```

## Environment Variables

- `NEXT_PUBLIC_API_BASE_URL`: Base URL for the API (defaults to localhost:3000)

## Deployment

The application is designed to be deployed on Vercel. The build process is optimized for production with:

- Static optimization
- Image optimization
- TypeScript compilation
- ESLint checking

## API Endpoints

- `GET /api/games` - Fetch games with optional genre and page parameters
  - Query params: `genre` (string), `page` (number)
  - Returns: `{ games, availableFilters, totalPages, currentPage }`

## Contributing

This project follows conventional commit standards. Please use conventional commits for all changes.

## License

This project is created for the Apply Digital Frontend Developer Test.
