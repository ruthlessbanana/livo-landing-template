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

## Spec file

Edit `interface/landing/page-spec.json` or overwrite it from generation tooling. The app validates the spec at runtime via `parsePageSpec()`.
