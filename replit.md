# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Artifacts

### Wardrobe PWA (`artifacts/wardrobe-pwa`)
- React + Vite app served at `/wardrobe-pwa/`
- Port: 25941
- Full wardrobe outfit builder ported from `wardrobe-matrix-v6.html`
- PWA: `public/manifest.json`, `public/sw.js` (cache-first service worker), `public/icon.svg`
- `index.html` has full PWA meta tags (manifest link, apple-mobile-web-app-capable, theme-color)
- Service worker registered in `src/main.tsx` via `import.meta.env.BASE_URL + 'sw.js'`
- All wardrobe CSS in `src/wardrobe.css` (unlayered, overrides Tailwind base layer)
- Key files: `src/App.tsx` (all logic), `src/wardrobe.css` (all styles)

### Standalone HTML (`wardrobe-matrix-v6.html`)
- Original standalone HTML file — write via Python bash only (write tool truncates >200 lines)
