# Livo Landing Template

Public landing-page shell for Livo-generated sites. Renders a fixed section stack from
`interface/landing/page-spec.json`. No environment variables and no theme preset catalog —
themes arrive as resolved token objects inside the spec (written by Livo MCP or coding agents).

Design stack: **Tailwind CSS v4**, **Poppins + Inter** typography, **Remix Icon**, and UI patterns from [luroai-nextjs-frontend-app](https://github.com/bforbilly24/luroai-nextjs-frontend-app).

## AI / agent contract

Agents read and write **`interface/landing/page-spec.json`** only. Icons use allowlisted Remix ids (`REMIX_ICON_IDS` in `@livo/landing-kit`). Copy must not include em dashes, en dashes, or hyphens. See **[AGENTS.md](./AGENTS.md)** for field-by-field rules.

```bash
npm run validate-spec   # Zod validation
npm run export-schema   # Regenerate landing-kit/schema/page-spec.schema.json
```

## Stack (fixed order)

1. Header (always)
2. Hero (always)
3. Perks (optional) — `#perks`
4. Features (optional) — `#features`
5. Connect (optional) — `#connect`
6. Comparison (optional)
7. FAQ (optional)
8. CTA (always)
9. Footer (always)

## Development

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Build (static export)

```bash
npm run validate-spec
npm run build
```

Output: `interface/out/`

## Deploy to Vercel (monorepo)

This repo has two workspaces:

```
livo-landing-template/
├── landing-kit/     # Shared renderer (components, schema, theme) — not a separate deploy
├── interface/       # Next.js app Vercel builds and hosts
│   ├── vercel.json  # Monorepo install/build from repo root
│   └── landing/page-spec.json
└── package.json     # npm workspaces root
```

`interface` depends on `@livo/landing-kit` via npm workspaces. Vercel must install **both** folders, then build from the **repo root** so spec validation runs before the Next.js export.

### One-time Vercel setup

1. Import the GitHub repo at [vercel.com/new](https://vercel.com/new).
2. Set **Root Directory** to `interface`.
3. Turn on **Include files outside of the Root Directory in the Build Step** (required so `../landing-kit` is available).
4. Leave Install / Build on the defaults from `interface/vercel.json`:
   - Install: `npm ci --prefix ..`
   - Build: `npm run build --prefix ..`
5. **Do not set Output Directory** in the Vercel dashboard. Leave it empty so Vercel uses the native Next.js build (`.next`). A custom `out` output causes a `routes-manifest.json` error with static export.
6. No environment variables needed. Deploy.

On Vercel, `next.config.ts` skips `output: "export"` automatically (`VERCEL` is set during build). Local and Livo builds still export static files to `interface/out/`.

### CLI

```bash
npm ci
npx vercel --cwd interface
npx vercel --cwd interface --prod
```

## Spec file

Edit `interface/landing/page-spec.json` or overwrite it from generation tooling. The app validates the spec at runtime via `parsePageSpec()`.
