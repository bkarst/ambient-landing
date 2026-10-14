# Ambiently landing page

The marketing page for Ambiently, built to `spec/landing-spec.md`. Next.js 16 (App Router, Cache Components), React 19, Tailwind 4 and GSAP 3.15. The whole route prerenders static.

## Run it

```bash
pnpm install
cp .env.example .env.local   # set NEXT_PUBLIC_SITE_URL; INTEREST_SINK=console in development
pnpm dev                     # regenerates tokens, then next dev
pnpm build && pnpm start     # production
```

## Checks

```bash
pnpm typecheck      # tsc
pnpm lint           # eslint
pnpm test           # vitest: fixtures reconcile, copy is centralised, vocabulary, FAQ
pnpm test:e2e       # playwright (needs `npx playwright install chromium` once)
pnpm tokens:check   # fails if styles/tokens.generated.css or config/tokens.generated.ts are stale
```

Append `?motion=off` to any URL to render final states without animation (tests and screenshots).

## Where things live

| Path | What |
|---|---|
| `config/site.ts`, `config/theme.ts` | Brand, copy that matters, SEO defaults, nav, integrations; appearance and motion tokens |
| `content/` | Section copy, FAQ, every sample number, citations |
| `components/ds/` | Typed port of the design system (`spec/ambiently-design-system/`); changes in `CHANGES.md` |
| `components/sections/`, `components/dashboards/` | One component per section; the product shot and chapter visuals |
| `components/motion/` | GSAP: provider, reveals, counters, chart choreography, marquee, hero |
| `components/integrations/logos/` | Logo index. Text fallback until legal signs off on official assets |
| `lib/interest/`, `app/actions/interest.ts` | The form's schema, rate limit, delivery sink and Server Action |
| `scripts/build-tokens.mjs` | Generates CSS variables and TS tokens from the design system's `tokens.json` |

The spec's open questions and launch blockers are in `spec/landing-spec.md` §17 and §16.1.
