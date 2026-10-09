<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Cursor Cloud specific instructions

- Install dependencies with `npm ci`. Next.js 16 requires Node.js 20.9 or newer.
- Start the app with `npm run dev`. It listens on port 3000. Open http://localhost:3000.
- Next.js blocks development hydration and hot reload when the page is opened at `127.0.0.1` instead of `localhost`. Use `localhost` for browser checks.
- `npm run lint`, `npx tsc --noEmit`, and `npm run build` are the project checks. There is no automated test script.
- `.env.example` lists optional `NEXT_PUBLIC_SITE_URL` and `CONSULTATION_BOOKING_URL`. The site runs with both unset.
