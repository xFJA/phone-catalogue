# Phone Catalogue

A Next.js application for displaying and managing a phone catalogue with shopping cart functionality.

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm

### Installation

```bash
# Install dependencies
pnpm install
```

### Development

```bash
# Start development server
pnpm dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Building for Production

```bash
# Build the application
pnpm build

# Start the production server
pnpm start
```

---

## Architecture & Project Structure

This project leverages the **Next.js 15 App Router** and follows a clean-architecture approach with well-defined boundaries:

```
src/
├─ app/                  # Routes, pages and server/client components (App Router)
│  ├─ api/               # Route Handlers (serverless endpoints)
│  │  └─ phones/         #   • GET /api/phones
│  │      ├─ route.ts    #   • GET /api/phones/[id]
│  │      └─ [id]/route.ts
│  ├─ cart/              # Cart page + SCSS module styles
│  └─ phones/            # Main catalogue page
│
├─ components/           # Reusable, fully-typed UI components
│  ├─ Button/
│  ├─ LoadingLine/
│  ├─ PhoneCard/
│  └─ ...
│
├─ context/              # React contexts (e.g. CartContext with localStorage persistence)
├─ hooks/                # Custom hooks (useDebounce, usePhoneQuery, …)
├─ services/             # Business / data-access layer (PhoneService, …)
├─ types/                # Zod schemas & type definitions
└─ utils/                # Helper utilities (formatPrice, etc.)
```

### Key Technologies

- **Next.js 15** (App Router, Server/Client Components, Route Handlers)
- **React 19** + **TypeScript**
- **Zod** – runtime validation & static typing of API responses
- **React Query** – catalogue data caching & synchronisation
- **SCSS Modules** – scoped styles with global variables
- **Jest + React Testing Library** – unit & integration tests
- **ESLint / Prettier / Stylelint** – code quality & consistency

## Environment Variables

| Variable                  | Description                            |
| ------------------------- | -------------------------------------- |
| `PHONE_CATALOGUE_API_URL` | Base URL of the external phone API     |
| `PHONE_CATALOGUE_API_KEY` | API token (sent in `X-API-KEY` header) |

Create a `.env.local` file at the project root:

```bash
PHONE_CATALOGUE_API_URL=https://example.com
PHONE_CATALOGUE_API_KEY=change-me
```

## Useful Scripts

```bash
pnpm dev        # Development server with HMR
pnpm test       # Run the full test suite
pnpm build      # Build for production
pnpm start      # Run production Next.js server
pnpm lint       # Lint source (ESLint)
pnpm lint:style # Lint styles (Stylelint)
pnpm format     # Format code with Prettier
```

## Testing

### Unit & Integration Tests

Tests live next to the code they cover (`*.test.tsx`).

- **Jest** + **@testing-library/react** for UI.
- **MSW** (Mock Service Worker) & fetch mocks to isolate network calls.
- Generate coverage via `pnpm test --coverage`.

### E2E Tests

End-to-end tests use Cypress to validate complete user flows:

```bash
# Open Cypress interactive test runner
pnpm cypress

# Run E2E tests headlessly
pnpm cypress:headless

# Start dev server and run E2E tests
pnpm test:e2e

# Start dev server and run E2E tests headlessly
pnpm test:e2e:headless
```

## Deployment

Ready to be deployed on **Vercel**:

1. Create a new project on Vercel and add the environment variables.
2. Set the build command to `pnpm build`.},{
3. Vercel's Next.js adapter handles the rest.

## Demo

Live demo: <https://phone-catalogue.vercel.app/phones>
