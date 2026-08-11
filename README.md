# Asoebi Marketplace

Asoebi Marketplace is a Next.js app for browsing and selling event-related products and services. It includes buyer-facing event browsing, seller onboarding, account authentication, dashboard management, event creation, and order handling.

## Key Features

- Authentication: login, signup, and logout flows.
- Browse events and sellers from the buyer experience.
- Seller onboarding and profile setup.
- Dashboard pages for managing seller content and orders.
- Event creation and guest order submission.
- Portfolio upload flow and upload success confirmation.
- Supabase integration for backend and authentication.

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Supabase JavaScript client
- ESLint

## Project Structure

- `app/`
  - `auth/`: login, logout, signup pages
  - `browse/`: public browsing experience
  - `dashboard/`: seller dashboard and slug-based route pages
  - `events/`: event detail, creation, and success flows
  - `onboarding/`: seller profile onboarding
  - `portfolio/`: upload flow for seller portfolios
  - `signup/`: seller registration flow
- `components/`: shared UI components
- `lib/`: Supabase client and helpers
- `public/`: static assets

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file with your Supabase keys and other environment variables.

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm run dev` - Start local development server
- `npm run build` - Build production application
- `npm run start` - Start production server after build
- `npm run lint` - Run ESLint

## Deployment

This app can be deployed on Vercel or any Node-compatible hosting provider that supports Next.js. Ensure your environment variables are configured in production.

## Notes

- The Supabase client is defined in `lib/supabase.ts`.
- Modify `next.config.ts` or `app/layout.tsx` as needed for custom SEO, fonts, or global styling.
- Tailwind CSS is configured via `postcss.config.mjs`.

## License

This repository is currently private and has no license specified.
