# Cornelia James Returns App

Customer-facing returns and store credit application built with Next.js 15.

## Features

- Order lookup by email and order number
- Item selection with return reasons
- Store credit (110% bonus) vs Refund options
- International shipping label generation via ProCarrier
- Real-time fee calculations
- Return management and tracking

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Server Actions
- Shadcn/ui components
- Shopify Admin API
- Supabase database
- ProCarrier API

## Development

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build
```

## Environment Variables

See `.env.example` for required environment variables.

## Project Structure

- `app/` - Next.js app router pages
- `actions/` - Server actions
- `components/` - React components
- `lib/` - Utilities, calculations, services
- `types/` - TypeScript type definitions

