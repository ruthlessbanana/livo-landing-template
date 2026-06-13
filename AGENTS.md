# Agent guide — Livo landing template

This repo renders a marketing landing page from **`interface/landing/page-spec.json`**. Agents should read and write that file only — never edit React slot layout unless extending the template.

## Contract

| Artifact | Purpose |
|----------|---------|
| `interface/landing/page-spec.json` | Single source of truth (copy, icons, theme, section toggles) |
| `landing-kit/schema/page-spec.schema.json` | JSON Schema for tools (`npm run export-schema`) |
| `landing-kit/src/schema/remix-icons.ts` | Allowlisted Remix icon ids (`REMIX_ICON_IDS`) |
| `npm run validate-spec` | Fail fast on invalid spec |

Validate before finishing:

```bash
npm run validate-spec
npm run typecheck
npm run build
```

`npm run build` runs spec validation first — invalid `page-spec.json` fails the build with a path-specific error.

## Fixed page stack

Order is not configurable. **Slot ids match section toggles and HTML anchors** (`#perks`, `#features`, etc.):

`header → hero → perks? → features? → connect? → comparison? → faq? → cta → footer`

Set `sections.<slotId>: true` to show optional blocks. If a slot block is present but the toggle is omitted, it is auto-enabled during validation.

### Section cheat sheet

| Slot id | Anchor | What it is |
|---------|--------|------------|
| `perks` | `#perks` | Stats / benefits grid (badge often "Perks") |
| `features` | `#features` | Bento feature cards (exactly 5 items) |
| `connect` | `#connect` | Integration hub visual |
| `comparison` | `#comparison` | Before/after table |
| `faq` | `#faq` | Accordion Q&A |

## Icons

Every icon field must be a **`RemixIconId`** from `REMIX_ICON_IDS` (e.g. `"RiSparklingLine"`, `"RiLinksLine"`). Unknown ids fail validation.

| Location | Field |
|----------|--------|
| Section eyebrow | `content.badge: { label, icon }` |
| Header / footer nav | `navLinks[].icon` |
| Header Whitepaper & Docs | `primaryCta.href`, `secondaryCta.href` — **always open in a new tab** |
| Header CTAs | `primaryCta.icon`, `secondaryCta.icon` (optional) |
| Perks | `slots.perks.content.items[].icon` |
| Features bento | `slots.features.content.items[].icon` (exactly **5** items) |
| Features accents | `content.accents.marqueeIcon`, `ringsIcon` (optional) |
| Connect hub | `content.hub.centerIcon`, `content.hub.nodes[].icon` |

### Features bento item order (do not reorder)

1. Brief / hero sparkle card  
2. Analytics (bar chart card)  
3. Ideation (rings card)  
4. Integrations (icon card)  
5. Hashtags (icon card)  

## Copy guidelines

- **No dashes in copy**: do not use em dashes (—), en dashes (–), or hyphens (-) in any user-facing string (`meta`, headlines, body copy, CTAs, FAQ, footer). Rewrite with periods, commas, or separate short sentences. Example: use `AI powered` not `AI-powered`; use `Brief to page spec` not `Brief-to-page`.
- **Hero headline**: use `\n` for intentional line breaks.
- **Section titles**: short titles work best on one row.
- **Theme**: always ship resolved tokens in `theme` (theme token strings are not copy).

## What agents must not do

- Do not add JSX sections or change bento layout roles.  
- Do not use icon names outside `REMIX_ICON_IDS`.  
- Do not use em dashes, en dashes, or hyphens in copy fields.
- Do not use old ids `metrics`, `explainer`, or anchors `#metrics`, `#explainer`.

## Example workflow

1. Read brief + brand tokens.  
2. Set `sections.perks`, `sections.features`, `sections.connect`, etc.  
3. Fill `slots.perks`, `slots.features`, `slots.connect` with badge, copy, and icons.  
4. Run `npm run validate-spec`.  
5. Preview with `npm run dev`.
