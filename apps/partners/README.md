# Partners Portal

A Next.js 15 application for Cornelia James partners, providing access to product information, lifestyle images, brand assets, and downloadable resources.

## Features

- **Product Gallery**: Browse all Cornelia James products with filtering and search
- **Product Table**: Downloadable CSV of all product data
- **Lifestyle Images**: Curated lifestyle photography with filtering by category and product type
- **Brand Guide**: Access to brand colors, fonts, logos, and other assets

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI Components**: ShadCN components from `@workspace/ui`
- **Data Source**: Shopify GraphQL API (embedded in `lib/shopify/`)
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript

## Getting Started

### Prerequisites

You need to have Shopify API credentials to run this application. Create a `.env.local` file in the `apps/partners/` directory:

```bash
SHOPIFY_STORE_NAME=your-store.myshopify.com
SHOPIFY_ACCESS_TOKEN=your-shopify-access-token
```

### Development

```bash
# From the monorepo root
pnpm --filter partners dev
```

The app will be available at `http://localhost:3000`

### Build

```bash
# From the monorepo root
pnpm --filter partners build
```

### Type Checking

```bash
# From the monorepo root
pnpm --filter partners typecheck
```

### Linting

```bash
# From the monorepo root
pnpm --filter partners lint
```

## Project Structure

````
apps/partners/
├── app/                          # Next.js App Router pages
│   ├── brand-guide/             # Brand assets and guidelines
│   ├── lifestyle-images/        # Lifestyle image gallery
│   ├── products/                # Product gallery and details
│   │   └── [handle]/            # Individual product pages
│   ├── product-table/           # Product data table with CSV export
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   └── globals.css              # Global styles
├── components/                   # React components
│   ├── lifestyle/               # Lifestyle image components
│   ├── products/                # Product-related components
│   ├── product-table/           # Product table component
│   ├── shared/                  # Shared utilities
│   └── navigation.tsx           # Main navigation
├── lib/                          # Library code
│   └── shopify/                 # Shopify GraphQL client
│       ├── client.ts            # Shopify API client
│       ├── types.ts             # TypeScript types
│       ├── queries/             # GraphQL queries (13 files)
│       └── mutations/           # GraphQL mutations (4 files)
├── public/                       # Static assets
│   ├── fonts/                   # Brand fonts for download
│   └── *.png                    # Logo and brand images
└── types/                        # TypeScript type definitions

## Static Assets

The following assets are included in the `public` directory:

- **Logos**: `logo_solo.png`, `crest.png`, `logo_and_crest.png`
- **Images**: `cornelia.png`, `royal_warrant.png`
- **Fonts**: `ITCCaslon224StdMedium.ttf`, `AvenirNextLTPro-Regular.otf`

## Dependencies

### Workspace Packages

- `@workspace/ui` - Shared ShadCN components

### External Dependencies

- `@shopify/admin-api-client` - Official Shopify Admin API client

- `next` ^15.4.5 - React framework
- `react` ^19.1.1 - UI library
- `lucide-react` - Icon library
- `sonner` - Toast notifications

## Routes

- `/` - Home page with navigation cards
- `/products` - Product gallery with filtering
- `/products/[handle]` - Individual product detail pages
- `/product-table` - Data table with CSV export
- `/lifestyle-images` - Lifestyle image gallery
- `/brand-guide` - Brand assets and guidelines

## Environment Variables

Required environment variables in `.env.local`:

```bash
# Shopify Configuration
SHOPIFY_STORE_NAME=your-store.myshopify.com
SHOPIFY_ACCESS_TOKEN=your-shopify-access-token
````

## Notes

- The app uses Incremental Static Regeneration (ISR) for the lifestyle images page with a 1-hour cache
- Product detail pages are statically generated at build time using `generateStaticParams`
- All UI components are from the shared `@workspace/ui` package following ShadCN design patterns
- The app is completely independent from other monorepo apps with no shared database or auth
- The Shopify GraphQL client is embedded directly in the app at `lib/shopify/` for simplicity
- Environment variables are loaded from `.env.local` in the app directory (not shared with other apps)
