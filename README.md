This is a Base Mini App template powered by Next.js, TypeScript, and Coinbase OnchainKit with Farcaster Mini App integration. It includes ready-to-use flows for buying, swapping, and earning with sponsored gas, plus session token infrastructure for onramp/offramp. Built by Justin Taylor (Decentral Bros). This is an all‑in‑one, 3‑in‑1 dApp / Mini App designed for Farcaster and Base.


## Features

- **Buy Tokens**: `app/buy/page.tsx` uses `@coinbase/onchainkit/buy` to purchase the `$DBRO` token on Base with `isSponsored` gas.
- **Swap**: `app/swap/page.tsx` provides an ETH ↔ USDC swap UI via `@coinbase/onchainkit/swap` with sponsored gas.
- **Earn (Morpho)**: `app/morpho/page.tsx` integrates an Earn vault (Morpho) via `@coinbase/onchainkit/earn` with sponsored gas.
- **Farcaster Mini App**: Frame-ready via `@farcaster/miniapp-sdk` and `minikit.config.ts`.
- **Session Token Backend**: `/api/session-token` generates session tokens for onramp/offramp using CDP credentials. See `README_SESSION_TOKEN.md`.
- **Provider Setup**: `app/rootProvider.tsx` wires `OnchainKitProvider` with chain, appearance, wallet options, and paymaster.


## Tech Stack

- **Next.js** (App Router) + **TypeScript**
- **Coinbase OnchainKit**: buy, swap, earn, transaction flows
- **Farcaster Mini App SDK**
- **wagmi** for wallet connection and account state
- CSS via `@coinbase/onchainkit/styles.css` and project styles in `app/globals.css`


## Prerequisites

- Node.js 18+ and npm/yarn/pnpm/bun
- A deployment target (e.g., Vercel)
- Coinbase Developer Platform credentials for session tokens (Secret API Key + Key ID)


## Environment Variables

Create a `.env.local` (not committed) with the following keys as needed:

```bash
# Public OnchainKit Project config
NEXT_PUBLIC_ONCHAINKIT_API_KEY="your-public-ok-api-key"
NEXT_PUBLIC_ONCHAINKIT_PROJECT_ID="your-public-ok-project-id"

# Paymaster + Bundler endpoint (for sponsored gas)
NEXT_PUBLIC_PAYMASTER_AND_BUNDLER_ENDPOINT="https://..."

# App URL and repo fork URL (used in UI and metadata)
NEXT_PUBLIC_URL="http://localhost:3000"
NEXT_PUBLIC_REPO_FORK_URL="https://github.com/your-org/your-repo/fork"

# CDP Session Token credentials (server-side only; DO NOT COMMIT)
CDP_SECRET_KEY="-----BEGIN EC PRIVATE KEY-----\n...\n-----END EC PRIVATE KEY-----"
CDP_KEY_ID="your-cdp-key-id"

# Optional (Vercel runtime URL used in minikit.config.ts)
VERCEL_PROJECT_PRODUCTION_URL="your-deployed-domain.vercel.app"
```

See `README_SESSION_TOKEN.md` for details on generating session tokens and security recommendations.


## Getting Started

Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open `http://localhost:3000` to view the app. Edit `app/page.tsx` and other files to customize; HMR will reload changes.


## Project Structure

- `app/page.tsx`: Landing page with docs links and Buy widget section
- `app/buy/page.tsx`: Buy `$DBRO` on Base using OnchainKit `Buy`
- `app/swap/page.tsx`: Swap ETH/USDC using OnchainKit `Swap`
- `app/morpho/page.tsx`: Earn vault (Morpho) using OnchainKit `Earn`
- `app/rootProvider.tsx`: Configures `OnchainKitProvider` and appearance
- `app/api/session-token/route.ts`: API to mint session tokens (server)
- `minikit.config.ts`: Farcaster Mini App metadata and assets
- `app/utils/*`: Onramp/offramp helpers and pricing utilities
- `app/components/*`: UI components (wallet, layout, funding, etc.)


## Deployment

1. Ensure all required environment variables are configured in your hosting platform (e.g., Vercel Project Settings → Environment Variables). Never commit secrets.
2. Build and deploy:

```bash
npm run build
npm start
```

For Vercel, connect your GitHub repository and import the project; Vercel will handle build commands automatically.


## Security Notes

- Do not commit any `.env*` files, API keys, private keys, or session token materials.
- Restrict your CDP Secret API Key using an IP allowlist where possible.
- Store secrets in your deployment environment (e.g., Vercel env vars), not in source control.
- Review `.gitignore` to ensure sensitive files are excluded before open-sourcing the repo.


## Attribution

This project is open source. If you use it in production, please credit:

- Built by Justin Taylor — Decentral Bros
- X: [@DecentralBros_](https://x.com/DecentralBros_)
- Portfolio: [justin.dbro.dev](https://justin.dbro.dev)


## Learn More

- OnchainKit docs: https://docs.base.org/onchainkit
- Base docs: https://nextjs.org/docs
- Farcaster Mini Apps publishing guide: https://miniapps.farcaster.xyz/docs/guides/publishing

