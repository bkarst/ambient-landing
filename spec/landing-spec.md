# Ambiently landing page — specification

| | |
|---|---|
| Status | Draft for review |
| Date | 2026-10-13 |
| Owner | Ben Karst |
| Route | `/` (plus `/privacy` and `/terms`, which the interest form needs) |
| Stack | Next.js 16.4 (App Router, Cache Components), React 19.3, Tailwind CSS 4, GSAP 3.15 |

The keywords **MUST**, **MUST NOT**, **SHOULD**, **SHOULD NOT** and **MAY** are used as in RFC 2119. Items tagged **[Verify]** are claims about the product or the business that could not be checked while this spec was written (see §0.2). Each one MUST be confirmed or cut before launch.

---

## 0. Read this first

### 0.1 Sources of truth, in order of precedence

1. **Explicit instructions from Ben**, including the copy fixed in §4.1. Those lines are used verbatim.
2. **This spec.** Where the design system and Apple's HIG disagree, §11.3 decides.
3. **The Ambiently design system** at `spec/ambiently-design-system/`. **It MUST be used for every visual decision unless this spec or Ben says otherwise.** That covers tokens, type, spacing, radius, elevation, iconography, components, chart rules and voice. Read these first: `README.md` (brand book), `charts.md` (data-viz rules), `tokens.json`, `components/index.d.ts` and every `components/<Name>/README.md`. Open `demo.html` to see the reference dashboard.
4. **Apple Human Interface Guidelines.** Compliance is a requirement (§11).
5. **Next.js 16.4 docs** bundled at `node_modules/next/dist/docs/`. `AGENTS.md` requires reading the relevant guide before writing code, because this version breaks older conventions. §13.2 lists the ones that matter here.
6. **Market research** at `spec/research/AI Spend Intelligence Market Analysis.pdf`. It is the source for audience, value levers and every third-party figure on the page.

Nobody edits the design system directory as part of this work. If a component needs something it doesn't do, extend the ported copy (§13.4) and log the gap in §17 so the design system can absorb it.

### 0.2 The product repo was not available

The real product lives in `~/ambient-work/`. That directory wasn't reachable from the session that wrote this spec, so product facts were inferred from the design system's demo dashboard and the research PDF. Before building, the implementer MUST read `~/ambient-work/` and reconcile:

- which integrations exist, and for each one, whether it is a **spend source** (Anthropic, OpenAI, Cursor, GitHub, Microsoft) or a **work context** source (Jira, monday.com, Notion)
- what data Ambiently collects and stores (the trust copy in §6.9 assumes metadata only)
- how usage is attributed to people, teams and tasks
- alert channels, budget thresholds, export formats
- product navigation labels (for the dashboard product shot, §6.5)
- pricing and early-access terms

Wherever the product differs, the product wins. Update `content/` and this spec to match.

---

## 1. Goals

### 1.1 What the page must do

1. **Convert.** The one conversion is a submitted interest form (§9). Every section leads toward it.
2. **Explain the value of knowing.** The page shows, with dashboard visualizations, *how much* is being spent on AI and *on what*. Next to each visualization it explains why knowing that is worth money: less waste, earlier warnings, faster month-end close, cost tied to real work.
3. **Show the integrations.** Anthropic, Microsoft, Cursor, OpenAI, GitHub, Jira, monday.com and Notion appear as rolling logos (§6.3).
4. **Rank.** The page is built for organic search from the first commit (§10).
5. **Feel like an Apple-grade instrument.** Light and dark appearance, accessible, quiet, precise. Motion is tasteful, built with GSAP, and never stands between people and the content (§8).

### 1.2 Success measures

| Measure | Target |
|---|---|
| Interest-form conversion (submits ÷ unique visitors) | Baseline in the first 30 days, then improve |
| Visitors who reach the form section | ≥ 35% |
| Lighthouse, mobile, production build | Performance ≥ 95, Accessibility 100, Best Practices 100, SEO 100 |
| Core Web Vitals (p75, field) | LCP ≤ 2.0 s, CLS ≤ 0.05, INP ≤ 200 ms |
| axe-core violations | 0 in both appearances |

### 1.3 Not in scope

Pricing page, sign-in, product onboarding, blog, docs, localisation, A/B testing infrastructure, a cookie banner (§14 keeps analytics cookieless so one isn't needed), and real customer data. Every number on the page is sample data and is labelled that way (§7.1).

---

## 2. Audience and message

### 2.1 Who it's for

The research points to companies of 50 to 1,000 employees whose metered AI spend runs from about $5K to $100K+ a month.

- **Economic buyer:** CFO or COO, often with a FinOps or finance lead. Pain: volatile bills, no owner, invoices that don't reconcile to usage.
- **Champion:** CIO, head of IT or the innovation lead who rolled out the AI tools. Pain: each vendor's analytics covers only that vendor.
- **Daily users:** engineering, product and team leads. Pain: no way to tell whether the spend produces work.

Copy is written for the finance buyer first and the technical champion second. It is never written for engineers alone.

### 2.2 Message pillars

| Pillar | One line | Where it lands |
|---|---|---|
| Receipts | Every token, itemized: who, which model, what for, what it cost. | Hero, dashboards, lens section |
| Context | Spend tied to the tasks in Jira, monday.com and Notion. | Task chapter, footer tagline |
| Control | Budgets and forecasts that warn before the invoice. | Spend-over-time and budget chapters |
| Quiet | Metadata only, team-level by default. **[Verify]** | Trust section, FAQ |

### 2.3 Voice

Follow the design system's voice rules (`README.md` → *Voice and content*): plain, present tense, no superlatives, no exclamation marks, no emoji, sentence case, buttons verb-first, numbers compact above 10,000, and every change says what it is measured against.

**Sanctioned exceptions.** The hero and footer taglines are questions supplied by Ben. They break the "short declaratives with a full stop" rule on purpose and are used verbatim. No other headline on the page is a question.

**Brand spellings:** Anthropic, Microsoft, Cursor, OpenAI, **GitHub** (capital H), **Jira** (Atlassian dropped the all-caps "JIRA" in 2017), **monday.com** (lowercase), Notion. Product names that appear in copy: Claude, ChatGPT, GitHub Copilot, Microsoft Copilot.

---

## 3. Centralized configuration (requirement)

Theme, logo, company name, description, taglines and every other important line of copy live in **one place each**. No component hard-codes any of them.

### 3.1 Files

| File | Holds | Notes |
|---|---|---|
| `config/site.ts` | Identity, important copy, SEO defaults, nav, CTAs, integrations, legal, contact | The single source for anything brand-level |
| `config/theme.ts` | Appearance policy, theme colours, logo ink, motion tokens, breakpoints, layout widths | Colour values are imported from the generated tokens, never typed in |
| `config/tokens.generated.ts` | Colour and size values generated from `tokens.json` | Generated by `scripts/build-tokens.mjs` (§11.2); never hand-edited |
| `content/landing.ts` | Section-level copy: headings, paragraphs, bullets, form labels and messages | Reads names from `site.ts`; doesn't repeat them |
| `content/faq.ts` | FAQ questions and answers | Also feeds the FAQPage JSON-LD |
| `content/sample-data.ts` | Every number on every chart and receipt | §7 and Appendix B |
| `content/sources.ts` | Citations for third-party figures | §6.4 and Appendix C |

### 3.2 `config/site.ts` shape

The values are normative. Change them here and nowhere else.

```ts
// config/site.ts
import type { SiteConfig } from './types';

export const site = {
  name: 'Ambiently',
  legalName: 'Ambiently, Inc.',                       // [Verify]
  url: process.env.NEXT_PUBLIC_SITE_URL!,             // required in production (§13.7)
  locale: 'en_US',
  category: 'AI spend tracking',

  description:
    'Ambiently tracks AI token spend across Anthropic, OpenAI, Cursor, GitHub and Microsoft, ' +
    'and ties every dollar to the person, team and task behind it.',   // 149 characters

  taglines: {
    hero: 'AI tokens are money, you want receipts, right?',
    footer: 'Do you know what tasks are your employees using AI for?',
    brand: 'Real-world insights. Quieter.',               // the design system's overline tagline
  },

  cta: {
    primary:   { label: 'Request access',     href: '#request-access' },
    secondary: { label: 'See the dashboards', href: '#dashboards' },
  },

  nav: [
    { label: 'Dashboards',   href: '#dashboards' },
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Integrations', href: '#integrations' },
    { label: 'FAQ',          href: '#faq' },
  ],

  seo: {
    title: 'Ambiently — AI spend tracking with receipts for every token',  // 59 characters
    titleTemplate: '%s · Ambiently',
    ogTitle: 'AI tokens are money, you want receipts, right?',
    ogImageAlt: 'Ambiently: AI tokens are money, you want receipts, right?',
    twitterHandle: undefined as string | undefined,     // [Verify]
  },

  // Order is Ben's and is the marquee order. `role` drives the "How it works" diagram.
  integrations: [
    { id: 'anthropic', name: 'Anthropic',  role: 'spend',   products: ['Claude', 'Claude Code', 'API'] },
    { id: 'microsoft', name: 'Microsoft',  role: 'spend',   products: ['Microsoft Copilot', 'Azure OpenAI'] },
    { id: 'cursor',    name: 'Cursor',     role: 'spend',   products: ['Cursor'] },
    { id: 'openai',    name: 'OpenAI',     role: 'spend',   products: ['ChatGPT', 'API'] },
    { id: 'github',    name: 'GitHub',     role: 'spend',   products: ['GitHub Copilot'] },
    { id: 'jira',      name: 'Jira',       role: 'context', products: ['Jira'] },
    { id: 'monday',    name: 'monday.com', role: 'context', products: ['monday.com'] },
    { id: 'notion',    name: 'Notion',     role: 'context', products: ['Notion'] },
  ],                                                    // roles and products: [Verify] against ~/ambient-work

  contact: { email: 'hello@ambiently.example' },        // [Verify]
  social: {} as Partial<Record<'linkedin' | 'x' | 'github', string>>,
  legal: { privacyHref: '/privacy', termsHref: '/terms' },
  form: { captcha: false },                             // §9.5 spam escalation
  analytics: { provider: 'none' as 'none' | 'vercel' | 'plausible' },   // §14
} as const satisfies SiteConfig;
```

Each integration also has an entry in `components/integrations/logos/index.ts`. That entry maps the `id` to its wordmark and symbol SVG components and records `source` (the URL of the official brand kit the asset came from) and `guidelines` (the URL of its usage rules). See §6.3.

### 3.3 `config/theme.ts` shape

```ts
// config/theme.ts
import { color } from './tokens.generated';

export const theme = {
  appearance: {
    follow: 'system',        // HIG: respect the systemwide Light/Dark/Auto choice (§11.1)
    fallback: 'dark',        // used when the browser reports no preference; dark is the brand's own
    allowToggle: false,      // HIG: avoid an app-specific appearance setting. Flip only on Ben's instruction.
  },
  themeColor: { dark: color.surface.dark, light: color.surface.light },  // <meta name="theme-color">
  logoInk:    { dark: 'gold', light: 'gold' },          // the design system: the logo is drawn in gold
  heroArtInk: { dark: 'accent', light: 'gold' },        // halftone imagery; yellow can't hold on white
  breakpoints: { regular: 768, wide: 1280 },            // compact < 768 ≤ regular < 1280 ≤ wide
  layout: { maxWidth: 1200, measure: 640, gutter: { compact: 20, regular: 32 } },
  motion: {
    ease: [0.2, 0.8, 0.2, 1],                           // the design system's own out-curve (bundle.css)
    duration: { colour: 0.12, toggle: 0.16, ring: 0.4, reveal: 0.6, draw: 0.9, count: 0.8, hero: 1.0 },
    stagger: { items: 0.06, bars: 0.03, dots: 0.9 /* total, not each */ },
    distance: { reveal: 16, card: 24 },                 // px; nothing travels further
    marquee: { pxPerSecond: 36, slowTo: 0, slowDuration: 0.4 },
    debugParam: 'motion',                               // ?motion=off renders final states (tests, screenshots)
  },
} as const;
```

### 3.4 Enforcement

- A unit test MUST fail if the literal strings `Ambiently`, either tagline, or any integration name appear in `components/` or `app/` outside `config/`, `content/` and the logo components. That keeps copy centralized as the code grows.
- Tailwind's default palette MUST be reset (`@theme { --color-*: initial; }`), so only token colours exist as utilities. A hex value in a component or a class like `bg-zinc-50` is a lint error.
- Copy in `content/*.ts` is plain strings or arrays of strings. Components never assemble sentences from fragments, so copy can be edited without touching code.
- When copy in `content/` names the company or an integration, it interpolates from `site` (`${site.name} can tell you.`) rather than retyping the name. Renaming then takes a one-line change.

---

## 4. Page architecture

### 4.1 Fixed copy (verbatim)

| Where | Copy |
|---|---|
| Hero headline (`h1`, display) | AI tokens are money, you want receipts, right? |
| Footer tagline | Do you know what tasks are your employees using AI for? |

Both are read from `site.taglines`. Punctuation, capitalisation and wording MUST NOT change unless Ben changes them (see §17, question 4).

### 4.2 Section order

| # | Section | Anchor | Purpose |
|---|---|---|---|
| — | Skip link | — | "Skip to content", the first focusable element |
| 1 | Header | — | Lockup, in-page nav, CTA |
| 2 | Hero | `#top` | Tagline, lede, CTAs, live receipt, halftone sun |
| 3 | Integrations | `#integrations` | Rolling logos |
| 4 | Why receipts | `#why` | The problem, in cited figures |
| 5 | Dashboards | `#dashboards` | The product shot: a full overview dashboard |
| 6 | Lens | `#lens` | One invoice, four ways to read it (pinned on wide screens) |
| 7 | Value chapters | `#spend-over-time`, `#vendors-and-models`, `#tasks`, `#teams`, `#waste`, `#budgets` | Six chart-led explanations of value |
| 8 | How it works | `#how-it-works` | Connect, attribute, act |
| 9 | Trust | `#trust` | Quiet by design |
| 10 | FAQ | `#faq` | Objections, plus long-tail search terms |
| 11 | Interest form | `#request-access` | The conversion |
| 12 | Footer | — | Footer tagline, links, legal |

### 4.3 Heading outline

There is exactly one `h1`, and levels never skip. Card titles are `h3` (the design system's `Card` renders `h3`).

```
h1  AI spend tracking — AI tokens are money, you want receipts, right?   (eyebrow + tagline, §6.2)
  h2  Receipts from the tools your teams already use.
  h2  AI spend grows faster than anyone can explain it.
  h2  Every AI token, itemized.
      h3  (card titles in the product shot)
  h2  One invoice. Four ways to read it.
  h2  Know the total before the invoice does.
  h2  See every vendor and model on one ledger.
  h2  Tie every token to a task.
  h2  See which teams drive the spend.
  h2  Find the waste.
  h2  Get warned before the budget runs out.
  h2  Connect once. Receipts from then on.
  h2  Quiet by design.
  h2  Questions and answers.
  h2  Get your first receipts.
  (footer) h2 visually hidden "Site footer"; link-group labels are h3 in overline style
```

### 4.4 Layout system

- **Size classes**, which HIG prefers over device types: *compact* < 768 px, *regular* 768–1279 px, *wide* ≥ 1280 px. Layout responds to the space available, never to user-agent sniffing.
- **Content width:** max 1200 px, centred. Side gutters are 20 px compact (`space-5`) and 32 px regular and wide (`space-8`). Each gutter also adds `env(safe-area-inset-left/right)`.
- **Text measure:** paragraphs ≤ 640 px (about 70 characters at `body-large`).
- **Section rhythm:** 128 px between sections on wide (2 × `space-16`), 96 px on regular, 64 px on compact (`space-16`). Inside a section: `space-8` between a heading and its body, `space-12` between body and visual.
- **Dashboard grids** follow the design system's Dashboard layout: 16 px gutters (`space-4`), rows at 1.6 : 1, then 1.2 : 1 : 0.8 at wide. Below wide they reflow to 2 columns, then 1 column at compact.
- **No horizontal page scroll at any width down to 320 px** (WCAG 1.4.10 Reflow). The marquee clips its own overflow; nothing else may.

### 4.5 Responsive type

The design system defines a single size for each style, which is right for the product but too large for a phone's hero. Marketing headings scale fluidly between their design-system size and a floor. All sizes are in `rem` so browser text-size settings scale them (§11.4).

| Style | Compact | Wide (design-system size) | CSS |
|---|---|---|---|
| `display` (hero h1) | 40/44 | 56/60 | `font-size: clamp(2.5rem, 1.75rem + 2.5vw, 3.5rem); line-height: 1.08;` |
| `title-1` (section h2) | 28/34 | 34/40 | `clamp(1.75rem, 1.5rem + 0.9vw, 2.125rem)`, line-height 1.18 |
| everything else | design-system size | design-system size | unchanged |

Tracking follows the design system (−0.02em display, −0.015em title-1). Only one `display` line appears per screen.

---

## 5. Global elements

### 5.1 Skip link

The skip link is visually hidden until focused. It then appears top-left as a `Button variant="secondary" size="sm"` and jumps to `<main id="content">`.

### 5.2 Header

- **Content:** `Logo variant="lockup" size={18}` on the left, linking to `#top`. In-page nav (`site.nav`) in the centre at regular and wide, set in `label` type with `ink-secondary` text that lifts to `ink` on hover. CTA on the right: `Button size="sm"` with `site.cta.primary`.
- **Compact:** lockup and CTA only. The nav is dropped rather than hidden behind a menu, because every section is reachable by scrolling. That saves a menu component, its JS and a focus trap.
- **Material:** the header is sticky and translucent, in the spirit of HIG materials:
  ```css
  .site-header {
    position: sticky; top: 0; z-index: 50;
    padding-top: env(safe-area-inset-top);
    background: color-mix(in srgb, var(--surface) 78%, transparent);
    -webkit-backdrop-filter: saturate(180%) blur(20px);
            backdrop-filter: saturate(180%) blur(20px);
    border-bottom: 1px solid transparent;
    transition: border-color 120ms ease;
  }
  .site-header[data-scrolled] { border-bottom-color: var(--line); }
  @media (prefers-reduced-transparency: reduce) { .site-header { background: var(--surface); backdrop-filter: none; } }
  @supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) { .site-header { background: var(--surface); } }
  ```
  `data-scrolled` is set once the page scrolls past 8 px. Use a ScrollTrigger or an IntersectionObserver sentinel; don't add a scroll listener.
- **One primary per view.** The design system allows a single primary button per view. The header CTA renders as `secondary` while the hero CTA or the form is on screen, and switches to `primary` otherwise. The swap is a 120 ms colour transition with no movement. Visibility is tracked with ScrollTrigger `onToggle` on the hero and form sections.
- **Height:** 56 px wide and regular, 52 px compact, plus the safe-area inset. Every anchor target gets `scroll-margin-top: calc(56px + env(safe-area-inset-top) + 16px)`.
- **In-page scrolling:** `html { scroll-behavior: smooth }` only inside `@media (prefers-reduced-motion: no-preference)`. Next 16 no longer touches `scroll-behavior`, so plain CSS is enough for in-page anchors.

### 5.3 Main landmark

`<main id="content">` wraps sections 2–11. Each section is a `<section aria-labelledby="…">` pointing at its heading.

---

## 6. Sections

Each subsection lists **content**, **layout**, **components**, **motion** (choreography in §8.4) and **notes**. All copy lives in `content/landing.ts`. The strings below are the launch copy.

### 6.1 Header

See §5.2.

### 6.2 Hero (`#top`)

**Content**

- **Eyebrow** (`overline`, `ink-muted`, set in capitals in the source as the design system requires): `AI SPEND TRACKING`. It sits *inside* the `h1` as its first line (`<h1><span class="overline">AI SPEND TRACKING</span><span class="display">…</span></h1>`). That puts the category keyword in the `h1` without hidden text (§10.5). A visually hidden `: ` between the spans makes screen readers pause.
- **Headline** (`display`, `ink`): `site.taglines.hero`.
- **Lede** (`body-large`, `ink-secondary`, max 560 px): "Ambiently itemizes every AI token your company buys and ties it to the person, the model and the task it paid for."
- **Primary CTA:** `Button variant="primary" size="lg"`, label "Request access", linking to `#request-access`. When activated it also moves focus to the form's first field.
- **Secondary CTA:** `Button variant="secondary" size="lg"`, label "See the dashboards", linking to `#dashboards`.
- **Microcopy** (`caption`, `ink-muted`) under the buttons: "Four fields, two of them optional. Takes under a minute."
- **Visual:** the live receipt (below) over the halftone sun.

**Live receipt** (`components/dashboards/HeroReceipt.tsx`)

A `Card` styled as a receipt, built from design-system parts, about 400 px wide on wide screens. Rows are separated by `line` hairlines. The top and bottom edges are "perforated" by a row of 4 px dots cut out in the `surface` colour, the same device as the design system's `Cover` (the dots of the mark doubling as a tear line).

- **Header row:** title "Receipt" (`title-3`), subtitle "Today · Example Co." (`caption`), and `Badge tone="live"` reading "Live" in the action slot. The live dot is the design system's only sanctioned loop (§8.2).
- **Six line items** from `sampleData.receipt.items`. Each row has two lines:
  - Line 1: task (`label`, `ink`), with amount right-aligned in `tabular` figures.
  - Line 2 (`caption`, `ink-muted`): the source tool's 16 px monochrome symbol, then the tool name, team, model (in `code`) and token count.
- **"+ 1,284 more line items"** (`caption`, `ink-muted`).
- **Total row:** "Total today", `stat` 28 px, "$4,218.00", with `Delta value={12.2} upIsGood={false} period="vs yesterday"`.
- **Sample notice:** `Badge tone="neutral"` reading "Sample data", top-right outside the card, or as the card's footer caption on compact.

The six line items use all eight integrations (Appendix B.1). The receipt's numbers MUST reconcile: line-item costs follow from the fixture price table, and the total is the day's fixture value.

**Halftone sun** (`components/motion/HalftoneSun.tsx`)

The mark's 325 dots (the `LOGO_DOTS` data from the design system's `Logo`), drawn as inline SVG. It sits behind and to the right of the receipt, about 640 px across on wide screens, and bleeds off the right edge. Ink comes from `theme.heroArtInk`: Ambient Yellow on navy, gold on light. It is `aria-hidden="true"`. This is the design system's "mark used large as imagery" and "data as points of light". No other imagery is used: no stock photos, no gradients, no illustrations of people.

**Layout**

- **Wide:** two columns, 6/12 copy and 6/12 visual. Copy is vertically centred. The hero is at least `min(100svh − header, 880px)` tall.
- **Regular:** copy stacked above the visual. The receipt is centred, max 440 px, and the sun scales to 120% of its width behind it.
- **Compact:** copy, then the receipt at full width minus gutters. The sun is cropped to its upper-right quadrant behind the receipt. The CTAs stack full-width: HIG accepts stacking when side-by-side doesn't fit at 48 px height.

**Notes**

- The `h1` is the LCP element. It renders visible in the server HTML and is never hidden, faded or split-animated (§8.3).
- No raster images in the hero, so nothing needs a `preload`.

### 6.3 Integrations marquee (`#integrations`)

**Content**

- `h2` in `title-2`, centred: "Receipts from the tools your teams already use."
- Rolling logos for the eight entries in `site.integrations`, in that order.
- Caption under the row (`caption`, `ink-muted`): "Anthropic, Microsoft, Cursor, OpenAI, GitHub, Jira, monday.com and Notion." Generated from config. It gives screen readers and crawlers one clean sentence, and on hover each logo's `title` names it.

**Logo assets**

- Every logo MUST come from the company's official brand or press kit. Record its `source` and `guidelines` URLs in the logo index. Logos are never redrawn, traced from screenshots or taken from icon packs.
- Use each brand's **official single-colour wordmark or lockup**, converted to an inline SVG React component with `fill="currentColor"`. Monochrome logos then follow the theme automatically: `ink-muted` at rest, `ink` on hover in the marquee. That gives a quiet, even row in both appearances.
- **Exception:** if a brand's guidelines forbid single-colour use (check Microsoft's especially), use its approved full-colour version for that brand only. Legal signs off before launch (§17, question 6).
- **Optical sizing:** each logo sits in a 32 px-tall box on wide and regular screens and 24 px on compact, with width auto. Per-logo `scale` overrides in the index (default 1, range 0.8–1.2) even out optical weight between symbol-heavy and wordmark-only logos. Spacing is 64 px wide, 48 px compact.
- Small **symbol** variants (16 px) are also needed for the hero receipt and the How-it-works diagram.
- `role="img"` and `aria-label="{name}"` on each SVG, plus a `<title>`.

**Behaviour** (implementation in §8.5)

- One row, scrolling right-to-left, seamless. The list is rendered twice. The second copy is `aria-hidden="true"` and `inert`.
- **Pause control:** an `IconButton` (`label="Pause logos"` / `"Play logos"`, `size="sm"`, `variant="ghost"`) at the row's trailing end. WCAG 2.2.2 requires a pause mechanism for motion that lasts more than five seconds. The design-system icon set has `play`. A `pause` glyph MUST be drawn on the same 24-grid, 1.5 px, round-cap rules and added to the ported `Icon` (§17, gap 1).
- Hovering the row or focusing anything in it eases the speed to zero over 0.4 s and resumes when hover or focus leaves. The marquee also stops when it is off-screen or the tab is hidden.
- **Reduce Motion:** no movement. The eight logos sit in a centred wrapping row (4 × 2 on compact) and the pause button is hidden.
- Edges fade with `mask-image: linear-gradient(90deg, transparent, #000 64px, #000 calc(100% - 64px), transparent)`. This is a mask, not a coloured gradient, so it doesn't break the design system's no-gradients rule.

**SEO.** The logos are SVG, not images, so the visible caption carries the names. The FAQ (§6.10) repeats them in prose.

### 6.4 Why receipts (`#why`)

**Content**

- Overline: `WHY RECEIPTS`.
- `h2` (`title-1`): "AI spend grows faster than anyone can explain it."
- Body (`body-large`): "Usage-based AI is now one of the fastest-growing costs in many companies. The bills arrive as totals. Finance can't see who or what drove them, and teams can't see what their work cost."
- Three cited figures. Each is a `stat-large` number, a `body` sentence and a source line in `caption` that links to the source (opens in the same tab, `rel="noopener"`, with an `external` icon):

| Figure | Sentence | Source (`content/sources.ts`) |
|---|---|---|
| 117% | growth in worldwide spend on generative AI models in 2026, to $28.3B. | Gartner, via Techstrong |
| 52% | of practitioners say AI cost has no clear owner in their company. | Harness, State of AI in FinOps 2026 (700 respondents) |
| 98% | of FinOps teams now manage AI spend, up from 31% in 2024. | FinOps Foundation, State of FinOps 2026, via USU |

**Rules for third-party figures** (here and in §6.7)

- Every figure MUST trace to a primary source that someone has actually opened. Record the URL, title, publisher, date and the exact quoted sentence in `content/sources.ts` before launch. The research PDF names the sources but doesn't link them. **[Verify]**
- Each figure is quoted with its scope ("of practitioners", "in 2026"). Never round in our favour.
- No figure attributed to a competitor (for example Ramp) appears without Ben's sign-off (§17, question 9).

**Layout:** heading and body on the left (5/12), the three figures on the right (7/12) in a column with `line` dividers. At compact everything stacks.

**Motion:** the figures count up once when they enter the viewport (§8.4).

### 6.5 Dashboards — the product shot (`#dashboards`)

**Content**

- Overline: `DASHBOARDS`.
- `h2` (`title-1`): "Every AI token, itemized."
- Body (`body-large`): "One view across every AI vendor. Spend by day, by model, by team and by task, each number compared with the last period."
- **The product shot:** a full overview dashboard rendered live from design-system components (not a screenshot), framed in a `radius-xl` panel with a `line` hairline. It is a re-composition of `demo.html` for AI spend.

**Product shot composition** (wide)

- **`Sidebar`:** the lockup, then Overview (active), Spend, Models, Teams, Tasks, Budgets, Alerts (badge 3); a Workspace section with Integrations and Settings; footer `Badge tone="live"` reading "All sources live". Labels are **[Verify]** against the product's navigation. The sidebar is decorative here: wrap it in `inert` with `aria-hidden="true"` so its buttons aren't tab stops that do nothing.
- **Title row:** "Overview" (`title-2`), caption "AI spend across 8 sources, Example Co., September". Actions: `Select size="sm"` time range (functional, §7.3), `Button variant="secondary" size="sm" icon="download"` reading "Export" (inert, `aria-disabled`, tooltip "Available in the product"), and **no primary button**. The page's primary actions live outside the product shot.
- **Four stat tiles** (`Card compact` + `Stat`): Spend this month **(hero)**, Spend today, Tokens today, Active users.
- **Row 2 (1.6 : 1):** `LineChart` "Daily spend" (September vs August); `BarChart` grouped "Spend by token type" (weekly, Output vs Input).
- **Row 3 (1.2 : 1 : 0.8):** `BarChart` horizontal "Top models by spend"; `LineChart` "Tokens by hour" (today); `Ring` × 2 "Health": Budget used 92%, Cache hit rate 41%.
- A `Badge tone="neutral"` reading "Sample data" sits in the frame's top-right corner. Caption under the frame: "Illustrative data for Example Co., a 340-person company."

Data for every element is in Appendix B.2. The `Stat` hero here is the page's **only** `hero` stat, as the design system requires.

**Layout**

- **Wide:** the frame is the full content width (1200 px), about 760 px tall.
- **Regular:** the sidebar collapses to icons (the design system's Sidebar collapses below 1024 px), tiles go 2 × 2, and rows 2 and 3 become two columns.
- **Compact:** no sidebar, tiles 2 × 2, every chart full width and stacked. Never shrink the dashboard with a CSS transform; it reflows with real components.

**Interaction.** Every chart keeps its design-system hover layer. Our ported charts add touch and keyboard (§7.4).

### 6.6 Lens: one invoice, four ways to read it (`#lens`)

This is the page's signature section. It makes the core idea concrete: the same money read four ways.

**Content**

- Overline: `RECEIPTS, NOT TOTALS`.
- `h2` (`title-1`): "One invoice. Four ways to read it."
- Body: "Your AI vendors send a total. Ambiently splits the same $128,400 by vendor, by model, by team and by task, so every dollar has an owner and a reason."
- **Total:** label "September AI spend" (`label`, `ink-muted`), then "$128,400" in `stat` (not `stat-large`, since the product shot owns the page's hero figure).
- **Lens picker:** four `Button variant="ghost" size="sm"` — By vendor, By model, By team, By task — inside `role="group"` with `aria-label="Read the invoice"`. Each button has `aria-pressed`; the pressed one gets `surface-hover` and `ink`, the same treatment as the design system's active nav item. This composes existing components; it doesn't introduce a new segmented control.
- **Chart:** a `BarChart horizontal valueLabels` with a single `chart-1` series, ranked biggest first. Any residual row ("Not linked to a task") always sits last.
- **Takeaway line** (`headline`, `ink`) under the chart, one per lens:
  - By vendor: "Anthropic and OpenAI are 64% of the bill."
  - By model: "Seats are a fifth of the bill. The rest is metered usage."
  - By team: "Engineering is 56% of spend."
  - By task: "Code work is 61% of spend, and 4% isn't linked to a task yet."
- Value explanation (`body`, `ink-secondary`, stays the same across lenses): "Vendor totals tell you what to pay. Receipts tell you whether it was worth paying."

Data is in Appendix B.3. Every lens sums to $128,400. The takeaways are computed from the fixtures and MUST be re-checked whenever the fixtures change (there is a unit test for this, §16.2).

**Behaviour**

- **Wide, motion allowed:** the section pins (ScrollTrigger `pin: true`) for four steps of about 60vh each and snaps to steps. Scroll position drives the active lens, and clicking a lens button scrolls to that step. Pin duration is capped at 240vh so the page never feels hijacked.
- **Regular, compact or Reduce Motion:** no pin. The lens buttons switch the chart directly.
- The chart's height is fixed to the tallest lens (9 rows), so switching never shifts layout.
- Keyboard: the lens buttons are normal tab stops. Arrow keys MAY move between them (roving tabindex), but Tab must still work.

### 6.7 Value chapters

Six chapters, each a full section. They alternate sides on wide (copy left / visual right, then the reverse) and stack copy-first on regular and compact. Every chapter has:

- an **overline** (`overline`, `ink-muted`)
- an **`h2`** (`title-1`)
- a **"why it matters" paragraph** (`body-large`, `ink-secondary`, ≤ 640 px)
- **three "what you see" bullets** (`body`, each starting with a 16 px design-system icon in `accent-ink`)
- an optional **proof line**: a cited third-party figure in `caption` with a source link, held to the rules in §6.4
- a **visual**: one composite of `Card`s, each with a `title`, a `subtitle` naming range and unit, and a **takeaway** line (`label`, `ink`) under the chart summarizing what it shows, as HIG's charting guidance asks
- a "Sample data" caption under the visual (`caption`, `ink-muted`)

Data for every chart is in Appendix B.4–B.9.

#### 6.7.1 Spend over time (`#spend-over-time`)

- Overline `SPEND OVER TIME`. `h2` "Know the total before the invoice does."
- Why: "AI bills arrive once a month as a single number. Ambiently shows spend every day, against last month and against budget, so a spike becomes a Tuesday conversation instead of a month-end surprise."
- Bullets: `calendar` "Spend today, this month and forecast to month end." · `arrow-up-right` "Every number compared with the last period." · `check` "Invoices reconciled to usage, so finance closes faster." **[Verify]**
- Proof: "Nearly a third of teams need a full week to trace a cost spike." (Harness, State of AI in FinOps 2026)
- Visual: `Card` "Daily spend" (subtitle "September compared with August, USD"), `LineChart` with 2 series and a time-range `Select` (§7.3). Beside it on wide, below on compact: two `Stat` tiles: "Spend in September" $128K (Δ −8.2% vs August, `upIsGood: false`) and "Forecast, October" $143K (caption "At current pace, over the $140K budget").
- Takeaway: "September came in 8% under August despite a late-month rise."

#### 6.7.2 Vendors and models (`#vendors-and-models`)

- Overline `VENDORS AND MODELS`. `h2` "See every vendor and model on one ledger."
- Why: "Each vendor's console shows its own slice. Ambiently puts Anthropic, OpenAI, Cursor, GitHub and Microsoft on one ledger, broken down by model and token type, so you can see what each model costs for the work it does."
- Bullets: `model` "Spend by vendor, model and token type." · `spend` "Seat licences and metered usage side by side." · `filter` "Models that cost more than the work needs." **[Verify]**
- Visual: `Card` "Top models by spend" (`BarChart horizontal valueLabels`, "September, USD"); `Card` "Spend by token type" (`BarChart` grouped, 2 series Output and Input, "September, by week, USD").
- Takeaway: "Output tokens cost nearly twice what input does, and the gap is growing."

#### 6.7.3 Tasks (`#tasks`)

This chapter is the answer to the footer question.

- Overline `TASKS`. `h2` "Tie every token to a task."
- Why: "A seat count says who has access. A receipt says what the money did. Ambiently links usage to the tickets, items and pages in Jira, monday.com and Notion, so you can see what a feature, a campaign or a support queue cost in AI." **[Verify]** the attribution mechanism.
- Bullets: `data` "Spend by task type, project and ticket." · `people` "Cost per task, compared across teams." · `info` "Untagged spend shown, not hidden."
- Visual: `Card` "Spend by task type" (`BarChart horizontal valueLabels`, "September, USD"; "Not linked to a task" last). `Card` "Recent receipts": a five-row table (Appendix B.6) with columns Task, Source, Team, Model or tool, Tokens, Cost. It's a real `<table>` with `<caption>`, `tabular` figures and `code` for model names. On compact it shows Task and Cost, with the other columns as a second line, never a horizontally scrolling table.
- Takeaway: "Code review and bug fixes are 31% of spend."

#### 6.7.4 Teams (`#teams`)

- Overline `TEAMS`. `h2` "See which teams drive the spend."
- Why: "In most companies a small group drives most of the spend, and that's often good news. Ambiently shows the pattern by team, so you can invest where AI pays off and coach where it doesn't."
- Bullets: `people` "Spend and active users by team." · `spend` "Cost per active user, month over month." · `security` "Team-level by default. Individual views are an admin choice." **[Verify]**
- Proof: "At Rippling, 10 to 15% of employees drove about 60% of AI spend." (TechCrunch, via AI Weekly)
- Visual: `Card` "Spend by team" (`BarChart horizontal valueLabels`). `Card` "Concentration": `Ring` value 58, text "58%", label "of spend from the top 12% of users". `Card` "Active AI users" (`LineChart` single series, 8 weeks) with a `Stat` "Cost per active user" $441 (Δ −11.7% vs August, `upIsGood: false`).
- Takeaway: "Engineering is 56% of spend with 31% of active users."

#### 6.7.5 Waste (`#waste`)

- Overline `WASTE`. `h2` "Find the waste."
- Why: "Some spend buys nothing: idle seats, prompts that could have been cached, a large model doing a small model's job. Ambiently finds it and puts a monthly figure on each fix." **[Verify]** that recommendations exist in the product.
- Bullets: `people` "Idle seats across Cursor, GitHub Copilot and Microsoft Copilot." · `storage` "Prompt-caching gaps by API key." · `model` "Model routing suggestions with expected savings."
- Proof: "Practitioners estimate 26% of AI spend is wasted." (Harness, 2026) · "AngelList found a $10K-a-month leak from missing prompt caching." (SiliconANGLE)
- Visual: `Stat` "Savings available" $12.3K, unit "/ month", caption "9.6% of September spend". `Card` "Savings by fix" (`BarChart horizontal valueLabels`). `Ring` value 41, label "Cache hit rate".
- Takeaway: "Turning on prompt caching for three keys saves $4.9K a month."

#### 6.7.6 Budgets (`#budgets`)

- Overline `BUDGETS`. `h2` "Get warned before the budget runs out."
- Why: "Set a budget for a team, a vendor or the whole company. Ambiently forecasts the month from the current pace and alerts you while there's still time to act."
- Bullets: `spend` "Budgets by team, vendor or project." · `clock` "Forecast to month end from current pace." · `alerts` "Alerts at the thresholds you choose, by email or Slack." **[Verify]** the channels.
- Proof: "Uber spent its 2026 AI coding budget in four months." (TechStackups)
- Visual: `Card` "Spend against budget" (`LineChart`, 2 series: "Spend, cumulative" `chart-1` and "Budget" `chart-2`, September, `area` on the first only). `Ring` value 92, label "Budget used". `Card` "Alerts": three rows, each with a `Badge` (`negative` with `alerts` icon "Over 90%", `neutral` "Spike", `accent` "Fix available"), the message and a date (`caption`).
- Takeaway: "On pace, September closes at 92% of budget. Engineering crossed 90% on the 24th."

### 6.8 How it works (`#how-it-works`)

- Overline `HOW IT WORKS`. `h2` "Connect once. Receipts from then on."
- **Three steps** in a row on wide and regular, stacked on compact. Each is a numbered `overline` ("01"), a 24 px icon (`connect`, `telemetry`, `alerts`), a `headline` and a `body` line:
  1. **Connect.** "Connect your AI vendors with an admin key and your work tools with a sign-in. Connections are read-only." **[Verify]**
  2. **Attribute.** "Ambiently matches every request to a person, a team and a task, and prices it." **[Verify]**
  3. **Act.** "Set budgets, get alerts and export receipts to finance." **[Verify]**
- **Diagram** (inline SVG, `role="img"` with an `aria-label` describing it):
  - Left column: the five `role: 'spend'` symbols, headed "Where tokens are spent".
  - Centre: the Ambiently mark at 64 px.
  - Right column: the three `role: 'context'` symbols, headed "Where work is tracked".
  - Connectors are 1 px `line-strong` at 60%, drawn as gentle curves.
  - The diagram is generated from `site.integrations`, so adding an integration updates it.
  - **Motion:** when it enters view, dots of light (4 px, `accent` on dark, `chart-1` on light) travel once along each connector into the centre, then out to the right. Three waves, 1.6 s in total, then everything stays still (§8.4).

### 6.9 Trust (`#trust`)

- Overline `PRIVACY`. `h2` "Quiet by design."
- Four points in a 2 × 2 grid (4 × 1 on wide). Each has a 24 px icon, a `headline` and a `body` line. **Every point is [Verify] and is cut if the product doesn't do it:**
  - `security` **Metadata only.** "Ambiently records tokens, models, costs and timestamps. Prompts and responses stay with your vendors."
  - `connect` **Read-only connections.** "Ambiently reads usage. It never changes anything in your tools."
  - `people` **Team-level by default.** "People see team totals unless an admin turns on individual views."
  - `download` **Yours to export.** "Export receipts as CSV whenever you want."
- No compliance badges (SOC 2 and the like) unless they are real and current.

### 6.10 FAQ (`#faq`)

- Overline `FAQ`. `h2` "Questions and answers."
- Native `<details>`/`<summary>` elements. They are accessible, work without JS, and their content is in the HTML for crawlers. Open and close animate height with `interpolate-size: allow-keywords` and `::details-content` transitions where the browser supports them. Unsupported browsers and Reduce Motion get an instant toggle. No GSAP here.
- `summary` is styled `headline` with a `chevron-down` that rotates 180° (120 ms). Each answer is `body`, `ink-secondary`. Rows are separated by `line` hairlines.
- Questions (from `content/faq.ts`; answers marked **[Verify]** need confirmation):
  1. **What is Ambiently?** "Ambiently is AI spend tracking. It collects usage and cost from your AI vendors, ties each token to the person, team and task behind it, and shows it all on one dashboard."
  2. **Which tools does Ambiently work with?** Generated from `site.integrations`, grouped by role: "AI spend from Anthropic, Microsoft, Cursor, OpenAI and GitHub. Work context from Jira, monday.com and Notion. More are on the way." **[Verify]**
  3. **How is this different from the usage dashboards my AI vendors provide?** "Each vendor shows its own usage. Ambiently joins them, adds coding tools like Cursor and GitHub Copilot, and ties the spend to the work in Jira, monday.com and Notion."
  4. **Does Ambiently read our prompts or responses?** "No. Ambiently collects metadata: token counts, models, costs, timestamps, and who or what made the request." **[Verify]**
  5. **Is this employee monitoring?** "Ambiently is built to understand cost, not to watch people. Views are team-level by default, and Ambiently doesn't store prompt content." **[Verify]**
  6. **Who is Ambiently for?** "Finance, IT and engineering leaders at companies that spend anywhere from a few thousand to a few million dollars a month on AI."
  7. **How much does it cost?** "Pricing is set during early access. Tell us your company size and AI spend in the form and we'll share it." **[Verify]**
  8. **How long does setup take?** **[Verify]** Cut this question if there's no honest answer.

### 6.11 Interest form (`#request-access`)

Specified in full in §9. Layout: the section heading and copy on the left (5/12) and the form on the right (7/12) at wide. Stacked at regular and compact, with the form at full content width (max 640 px).

### 6.12 Footer

- **Tagline block** at the top of the footer, on `surface-sunken`, with a `line` above it:
  - `site.taglines.footer` set as a `<p>` in `title-1` (fluid, §4.5), max 18 ch per line on wide so it breaks over two or three lines. (It's a statement block, not a section heading.)
  - Under it, in `body-large`, `ink-secondary`: "Ambiently can tell you."
  - `Button variant="secondary" size="lg"` reading "Request access". It scrolls to the form and focuses its first field. It is secondary because the form submit is the primary of that view.
  - The mark at 160 px, bleeding off the right edge, in `theme.logoInk`, `aria-hidden`. On compact it sits above the tagline at 96 px.
- **Link row:** `Logo variant="lockup" size={18} tagline` on the left (it prints "Real-world insights. Quieter." from `site.taglines.brand`). Three link groups with overline headings: **Product** (the four nav links), **Company** (Contact via `mailto:` from `site.contact.email`), **Legal** (Privacy, Terms).
- **Base line** (`caption`, `ink-muted`):
  - "© {year} {site.legalName}". The year comes from a `'use cache'` helper with `cacheLife('days')`. A bare `new Date()` here fails the build under Cache Components (§13.2).
  - Trademark notice, generated from config: "Anthropic, Microsoft, Cursor, OpenAI, GitHub, Jira, monday.com and Notion are trademarks of their respective owners. Their use here identifies integrations and does not imply endorsement."
- Bottom padding includes `env(safe-area-inset-bottom)`.

---

## 7. Data visualization

### 7.1 Principles

- **The design system's chart rules are law.** Read `spec/ambiently-design-system/charts.md`. In short:
  - Zero-based axes, 2 px monotone lines, bars ≤ 24 px with a 4 px rounded data end.
  - Series colours `chart-1` → `chart-3` in order and by entity; more than three series becomes small multiples.
  - Never two y axes. Never a pie, never a multi-segment donut.
  - Text never takes a series colour. A legend appears at two series or more.
  - Every chart has a hover layer and a visually hidden data table.
- **HIG charting guidance applies too:** every chart gets descriptive text (title, subtitle, takeaway), accessibility labels, familiar chart types, and consistent colour and form when the same data appears twice. For example, "Spend by team" uses the same form and colour in the lens section and the Teams chapter.
- **Every number is sample data, and says so.** Each visual carries a "Sample data" badge or caption. The fictional company is **Example Co.**, a 340-person software company, and no real company name appears in any dataset. Nothing on the page may read as a real customer's data, a testimonial or a case study.
- **Numbers reconcile.** Every lens, breakdown and receipt adds up to the totals it claims, and every delta is computed from the fixtures rather than typed in. Appendix B is the single dataset, and unit tests assert the sums (§16.2).
- **Deterministic.** Fixtures are static constants. No `Math.random()` or `Date.now()` at render: they would cause hydration mismatches and break Cache Components prerendering. Dates are fixed: the sample "today" is **September 30, 2026**, and the sample month is September. Refresh the fixtures, and that anchor, when the page is updated.
- **Model names** in fixtures are generic family names (Claude Sonnet, Claude Opus, Claude Haiku, GPT-5, GPT-5 mini). Update them to current releases before launch. The page never shows a vendor's unit price.

### 7.2 Chart catalog

| ID | Section | Form | Series | Interaction | Motion (§8.4) |
|---|---|---|---|---|---|
| `receipt` | Hero | Receipt card | — | none | lines print, total counts |
| `ov-stats` | Dashboards | 4 × `Stat` (1 hero) | sparkline on 2 | none | count up, sparkline draws |
| `ov-daily` | Dashboards | `LineChart` | September, August | hover/touch/keys, range `Select` | line draws, wash fades |
| `ov-token-type` | Dashboards | `BarChart` grouped | Output, Input | hover/touch/keys | bars grow from baseline |
| `ov-top-models` | Dashboards | `BarChart` horizontal | Spend | hover/touch/keys | bars grow from left |
| `ov-hourly` | Dashboards | `LineChart` | Tokens | hover/touch/keys | line draws |
| `ov-health` | Dashboards | 2 × `Ring` | — | none | arcs fill |
| `lens` | Lens | `BarChart` horizontal | Spend | lens picker, hover | bars re-rank between lenses |
| `ch1-daily` | Spend over time | `LineChart` + 2 `Stat` | September, August | range `Select` | line draws, count up |
| `ch2-models` | Vendors and models | `BarChart` horizontal | Spend | hover | bars grow |
| `ch2-token-type` | Vendors and models | `BarChart` grouped | Output, Input | hover | bars grow |
| `ch3-task-type` | Tasks | `BarChart` horizontal | Spend | hover | bars grow |
| `ch3-receipts` | Tasks | table | — | none | rows reveal |
| `ch4-teams` | Teams | `BarChart` horizontal | Spend | hover | bars grow |
| `ch4-concentration` | Teams | `Ring` | — | none | arc fills |
| `ch4-active` | Teams | `LineChart` + `Stat` | Active users | hover | line draws |
| `ch5-savings` | Waste | `BarChart` horizontal + `Stat` + `Ring` | Savings | hover | bars grow, count up |
| `ch6-budget` | Budgets | `LineChart` + `Ring` | Spend (cumulative), Budget | hover | line draws, ring fills |
| `ch6-alerts` | Budgets | list with `Badge`s | — | none | rows reveal |

### 7.3 Time-range selects

The design system puts a time-range `Select` in the header of every time-axis chart. On this page those selects **work**: they switch between precomputed fixtures for "Last 7 days", "Last 30 days" and "This quarter" (weekly points). A select that does nothing would be worse than none. Changing range redraws the line (§8.4) and announces the new range through the chart's `aria-label`. Charts without a time axis carry the "Sample data" badge in the action slot instead.

### 7.4 Changes to the ported chart components

These are behavioural additions with no visual change, and they're logged for the design system (§17):

1. **Pointer events, not mouse events.** Replace `onMouseMove`/`onMouseLeave` with pointer events. On touch, a tap pins the tooltip to the nearest index, and a tap outside or on the same point dismisses it. Charts must never block vertical page scrolling: set `touch-action: pan-y`.
2. **Keyboard.** The chart wrapper is `tabIndex={0}` with `role="group"` and `aria-label="{title}. Use left and right arrow keys to read values."`. Left and Right move the crosshair or category, Home and End jump to the ends, Escape clears. Focus shows `focus-ring` on the wrapper (`radius-md`). Tooltips are not live regions; the hidden data table carries the numbers for screen readers.
3. **SSR without layout shift.** Charts render server-side at their `width` hint and re-measure on mount (the design system's `useWidth`). Each chart's wrapper reserves its final height (chart height + legend), so re-measuring never moves anything else (CLS ≤ 0.05).
4. **Animation hooks.** Keep the design system's class names (`amb-line`, `amb-area`, `amb-end-dot`, `amb-end-label`, `amb-bar`, `amb-bar-label`, `amb-ring-fill`, `amb-spark-line`), because GSAP targets them inside a scoped ref. Components accept a `ref` (React 19 ref-as-prop). They contain no animation code of their own.
5. **Forced colours.** Under `@media (forced-colors: active)`, series use `CanvasText`/`Highlight` and gridlines `GrayText`, so charts stay readable in Windows high-contrast mode.

### 7.5 Formatting

- Use the design system's `format.compact` everywhere: 12,428 · 128.4K · $1.3M. Units are shown once.
- Currency is USD, `$` prefix, no decimals above $1,000 (except receipt line items, which show cents).
- Every delta says its comparison: "vs yesterday", "vs August".
- Spend deltas pass `upIsGood: false`, so spend going down shows mint and spend going up shows rose. Each delta always has an arrow and a sign.

---

## 8. Motion (GSAP)

### 8.1 Libraries

- `gsap@3.15.0` and `@gsap/react@2.1.2`, pinned exactly. Since 3.13 every GSAP plugin ships free in the main package under GSAP's standard no-charge licence, which permits commercial use.
- Plugins used: `ScrollTrigger`, `DrawSVGPlugin` (line draws), `MotionPathPlugin` (How-it-works dots), `SplitText` (footer tagline only), `ScrollToPlugin` (lens buttons), `CustomEase` (the `amb-out` curve).
- **Not used:** `ScrollSmoother`, Lenis or any scroll-smoothing or scroll-jacking library. Native scrolling is what HIG and assistive tech expect.
- Register everything once in `components/motion/gsap.ts` (a `'use client'` module):
  ```ts
  'use client';
  import { gsap } from 'gsap';
  import { useGSAP } from '@gsap/react';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
  import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
  import { SplitText } from 'gsap/SplitText';
  import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
  import { CustomEase } from 'gsap/CustomEase';
  import { theme } from '@/config/theme';

  gsap.registerPlugin(useGSAP, ScrollTrigger, DrawSVGPlugin, MotionPathPlugin, SplitText, ScrollToPlugin, CustomEase);
  CustomEase.create('amb-out', `M0,0 C${theme.motion.ease.join(',')} 1,1`);
  gsap.defaults({ ease: 'amb-out', duration: theme.motion.duration.reveal });
  export { gsap, useGSAP, ScrollTrigger, SplitText };
  ```
- Every animation runs inside `useGSAP(() => { … }, { scope: ref })` so it's scoped to its section and reverted on unmount. Event-driven tweens use `contextSafe`.

### 8.2 Character

Motion follows the design system ("brief and easing-out") and HIG ("purposeful… brief and precise… let people cancel motion"):

- **Only transforms, opacity, SVG stroke properties and clip-path.** Never layout properties.
- **Durations** from `theme.motion.duration`. No single tween is longer than 1.0 s, except the How-it-works dots (1.6 s in total, decorative).
- **Distances:** 16 px for text, 24 px for cards. Nothing scales above 1.02 except the product-shot settle (§8.4). No rotation, bounce or elastic easing.
- **Play once.** Reveals use `once: true`. Scrolling back up doesn't replay or reverse them.
- **Nothing loops,** with two exceptions: the design system's live dot (a CSS pulse, only where a "Live" badge is shown) and the integrations marquee (Ben's requirement; pausable, §8.5).
- **Never blocking.** Every control works while animations run. Clicking a CTA mid-animation completes the animation instantly (`tl.progress(1)`) rather than waiting.

### 8.3 Rules that protect content, LCP and SEO

1. **Never hide painted copy.** Copy in the viewport at first paint (the hero's `h1`, eyebrow, lede, CTAs and microcopy) renders visible in the server HTML and is never set to `opacity: 0`, clipped or split. That protects LCP (the `h1`) and people without JS. The one exception is the receipt's line items: they illustrate sample data, aren't LCP candidates, and are gated by rule 3.
2. **Hide only what's off-screen.** On hydration, reveal code calls `gsap.set()` on its targets *only if* they are below the viewport (`ScrollTrigger.isInViewport(el) === false`). Anything already on screen shows in its final state. People never see a flash, and crawlers that render with tall viewports never see hidden content.
3. **Hero art gate (CSS only, no inline script).** The halftone sun and the receipt rows are decorative or secondary, so they may start hidden, but without depending on JS:
   ```css
   @media (prefers-reduced-motion: no-preference) {
     .hero-art, .receipt-row { opacity: 0; animation: amb-failsafe 0s linear 2.5s forwards; }
     html[data-motion='ready'] .hero-art, html[data-motion='ready'] .receipt-row { animation: none; }
   }
   @keyframes amb-failsafe { to { opacity: 1; } }
   ```
   `MotionProvider` sets `data-motion="ready"` on `<html>` in the same tick it starts the hero timeline. If JS never arrives, the art appears after 2.5 s. This keeps the CSP free of inline-script hashes for theming and motion.
4. **Counters keep the real number in the DOM.** The server HTML holds the final value. While counting, the animated node is `aria-hidden` and a visually hidden sibling holds the final value. The count uses `tabular-nums` for its duration to avoid jitter.
5. **SplitText** runs with its `aria` option (`'auto'`) so the parent keeps an accessible label and split spans are hidden from assistive tech. It is reverted when its animation completes.

### 8.4 Choreography

| Element | Trigger | Animation |
|---|---|---|
| Hero halftone sun | page load | 325 dots `scale: 0 → 1`, `transformOrigin: center`, staggered by index (the data is already ordered centre-out), 0.9 s spread, `amb-out` |
| Hero sun, scroll | scrub, hero top → hero bottom | the dot group drifts up 24 px and fades to 0.6 opacity as the hero leaves |
| Hero receipt | load, 0.2 s after the sun starts | rows reveal top to bottom with `clipPath: inset(0 0 100% 0) → inset(0)`, 0.08 s stagger; each amount counts from 0; then "Total today" counts to $4,218.00 (0.8 s); Delta fades in last |
| Header border | scroll > 8 px | `data-scrolled` (CSS transition) |
| Section text | enters at 85% viewport | `y: 16 → 0`, `opacity: 0 → 1`, children stagger 0.06 s |
| Why-receipts figures | enter | count up 0.8 s, staggered 0.1 s |
| Product shot frame | scrub, frame top at 100% → 40% viewport | `rotateX: 8° → 0`, `scale: 0.94 → 1`, `transformPerspective: 1200`. Wide and regular only. |
| Product shot contents | frame top reaches 50% viewport | stat tiles count up → lines `drawSVG: 0 → 100%` (0.9 s) → area wash `opacity: 0 → 0.1` → end dots and labels `scale: 0 → 1` (0.2 s) → bars `scaleY: 0 → 1`, `transformOrigin: 50% 100%`, 0.03 s stagger → rings `strokeDashoffset: circumference → target` (0.4 s); ≤ 1.6 s in total |
| Lens change | step or button | outgoing bars `scaleX → 0` (0.25 s, 0.02 s stagger) and labels fade; incoming bars `scaleX: 0 → 1` from the left (0.5 s, 0.03 s stagger); value labels count; takeaway crossfades with `y: 8 → 0` |
| Chart range change | `Select` change | the new line draws 0 → 100% in 0.5 s; the old one isn't morphed |
| Value-chapter cards | enter | `y: 24 → 0`, `opacity: 0 → 1`, then the chart animations above |
| Receipts table and alerts | enter | rows `y: 8 → 0`, `opacity`, 0.05 s stagger |
| How-it-works dots | diagram enters | 3 waves of dots along `MotionPathPlugin` paths, spend sources → mark → work tools, 1.6 s in total, once |
| Footer tagline | enters | `SplitText` by words, `y: 12 → 0`, `opacity`, 0.04 s stagger, then revert |
| Header CTA swap | hero or form visibility | 120 ms colour transition (CSS) |

Ring note: the design system's ring has a 400 ms CSS transition on `stroke-dashoffset`. Set `transition: none` while GSAP owns the property, so the two don't fight.

### 8.5 Marquee implementation

- Build it with GSAP: one `gsap.to(track, { xPercent: -50, ease: 'none', repeat: -1, duration })`. The track holds two copies of the list, and `duration = (trackWidth / 2) / theme.motion.marquee.pxPerSecond`, recomputed on resize.
- Hover or focus-within: `gsap.to(tween, { timeScale: 0, duration: 0.4 })`, and back to 1 on leave. The pause button sets a persistent paused state that hover can't override.
- Off-screen (ScrollTrigger `onToggle`) or `document.visibilityState === 'hidden'`: pause. Resume only if the person hasn't paused it.
- Respect RTL if it's ever added: reverse direction when `dir="rtl"`.

### 8.6 Reduced motion, breakpoints and debugging

- All motion is set up inside `gsap.matchMedia()`:
  ```ts
  mm.add({
    motion: '(prefers-reduced-motion: no-preference)',
    reduce: '(prefers-reduced-motion: reduce)',
    wide:   '(min-width: 1024px)',
  }, (ctx) => { /* … */ });
  ```
- **Under Reduce Motion:** no reveals, no pin, no scrub, no count-ups, no dot motion, no marquee movement, and no product-shot tilt. Everything renders in its final state, the live dot doesn't pulse, and the lens and range controls switch instantly. HIG specifically asks that scaling, zooming, peripheral motion and z-axis depth changes go away; this goes further.
- The **pin** (lens) and **tilt** (product shot) run only at ≥ 1024 px.
- `?motion=off` (from `theme.motion.debugParam`) behaves exactly like Reduce Motion. Tests and screenshots use it. It's read from `window.location.search` on the client, not `useSearchParams`, so the page stays fully static (§13.2).
- After `document.fonts.ready`, and after charts finish their first measure, call `ScrollTrigger.refresh()` once (debounced).

### 8.7 Performance

- GSAP and plugins add at most 50 KB gzip to the client bundle. `SplitText` and `MotionPathPlugin` are imported only by the components that use them.
- No `will-change` at rest. GSAP applies `force3D` during tweens.
- The marquee and scrubs stay under 2 ms of scripting per frame on a mid-range Android (checked with a 4× CPU throttle in DevTools).

---

## 9. Interest form

### 9.1 Fields

The form asks what the visitor wants, and optionally company size and AI spend, as Ben specified. It adds **work email**: without it nobody can reply. That addition is flagged in §17, question 3.

| # | Field | Control | Required | Validation | Notes |
|---|---|---|---|---|---|
| 1 | **Work email** | `<input type="email" autocomplete="email" inputmode="email">` | Yes | valid email, ≤ 254 chars | Free-mail domains are accepted but flagged in the payload (`isFreeEmail`) for triage |
| 2 | **What do you want to know about your AI spend?** | `<textarea rows="4">` | Yes | 10–1,000 characters after trimming | Hint: "A sentence or two is plenty." Placeholder: "For example: which teams use Cursor the most, and what it costs per sprint." A live character count appears after 800 characters. |
| 3 | **Company size** (optional) | `Select` | No | one of the options | Options: Choose… · 1–19 employees · 20–49 · 50–199 · 200–499 · 500–999 · 1,000–4,999 · 5,000 or more |
| 4 | **Monthly AI spend** (optional) | `Select` | No | one of the options | Options: Choose… · Under $1K · $1K–$5K · $5K–$25K · $25K–$100K · $100K–$500K · $500K or more · Not sure yet |
| — | Honeypot `website` | text input, visually hidden, `tabindex="-1"`, `autocomplete="off"`, `aria-hidden` | — | must be empty | Bot trap |
| — | `startedAt` | hidden, set client-side on first focus | — | ≥ 2 s before submit when present | Time trap. Not rendered server-side, so the static page holds no timestamp. Missing (no JS) is allowed; the honeypot and rate limit still apply. |
| — | UTM and referrer | hidden, filled client-side from `window.location.search` and `document.referrer` | — | ≤ 200 chars each | `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content` |

The size bands line up with the research segments (under 20, 20–499, 50–1,000, 500+), so sales can segment leads without extra questions. "Not sure yet" is deliberate: not knowing your AI spend is the reason to talk to Ambiently.

### 9.2 Copy (in `content/landing.ts`)

- Overline `EARLY ACCESS`. `h2` "Get your first receipts."
- Body: "Tell us a little about what you want to see. Company size and spend are optional, and they help us reply with something useful."
- Submit: `Button variant="primary" size="lg" type="submit"`, "Request access". While pending, the label reads "Sending…", with `aria-disabled="true"` and `aria-busy="true"` on the form.
- Under the submit (`caption`): "We use your answers only to reply to you. Privacy policy" (the last two words link to `/privacy`).
- **Success** (replaces the form in place, crossfading over 0.24 s, instantly under Reduce Motion):
  - Heading (`title-2`, `tabindex="-1"`, receives focus): "Thanks. Your request is in."
  - Body: "We'll reply to {email}." (React escapes the value.)
- **Errors:**
  - Email missing: "Enter your work email."
  - Email invalid: "Enter an email address like name@company.com."
  - Message missing: "Tell us a little about what you want to see."
  - Message too short: "Add a few more words so we can help."
  - Message too long: "Keep it under 1,000 characters."
  - Rate-limited: "Too many requests from this network. Try again in a few minutes."
  - Server: "Something went wrong on our side. Your answers are still here, so try again in a moment."

### 9.3 Form design

- Visible labels above every control (`label` type, `ink`). "(optional)" is written in the label in `ink-muted`; required fields aren't starred.
- Inputs are 48 px tall in this marketing context (`control-lg`), with `radius-md`, a `line-strong` border, `surface-raised` fill and `focus-ring` on focus. That matches the design system's `Select`, which is the browser's own select. The textarea follows the same rules.
- Error state: a `negative` border plus a message below in `caption` with the `info` icon. Error is never shown by colour alone.
- Layout: email and message are full width. On regular and wide, the two selects share a row.
- `autocomplete` on email. `spellcheck` on the textarea. `enterkeyhint="send"` on the last control. `novalidate` on the form once JS has hydrated; native validation remains the no-JS fallback.

### 9.4 Behaviour and accessibility

- **Progressive enhancement:**
  - The `<form>` posts to a Server Action and works without JavaScript. The server re-renders the section with errors or success, following the Next docs' form guidance.
  - With JS, `useActionState` drives the pending state, inline errors and success without a reload.
  - Use a plain `<form action={formAction}>`, not `next/form`, which is for GET and search forms.
- **Validation:** client-side on blur and on submit, so nothing nags while the person types. Server-side always, with the same schema (§9.5).
- **On failed submit:** focus moves to an error summary at the top of the form (`role="alert"`, linking to each invalid field), and fields carry `aria-invalid` and `aria-describedby`.
- **On success:** focus moves to the success heading, which is announced.
- Nothing on the form, including errors, depends on animation.

### 9.5 Server

- **Action:** `app/actions/interest.ts`, marked `'use server'`, exporting `submitInterest(prev, formData)`.
- **Schema:** `lib/interest/schema.ts` with **Zod 4**: `z.object({ email: z.email().max(254), message: z.string().trim().min(10).max(1000), companySize: z.enum([...]).optional(), monthlyAiSpend: z.enum([...]).optional(), … })`. Field errors come from `z.flattenError(result.error).fieldErrors`. The Next docs' snippet uses the Zod 3 API (`error.flatten()`); don't copy it as-is.
- **Server Actions are public POST endpoints.** Treat the action as an API:
  - Re-validate everything.
  - Reject a filled honeypot or a time trap under 2 s by returning a fake success, so bots get no signal.
  - Rate-limit to 5 submissions per 10 minutes per IP. Key on an HMAC of the IP from `x-forwarded-for` with `INTEREST_HASH_SECRET`; never store the raw IP. The store sits behind an adapter: Upstash Redis or Vercel KV in production, in-memory in development.
  - Return only `{ status, fieldErrors?, email? }`.
  - Next's built-in Origin/Host CSRF check stays on. If the site sits behind a proxy on another host, set `experimental.serverActions.allowedOrigins`. The 1 MB default body limit stays.
- **Delivery:** `lib/interest/sink.ts` defines `interface InterestSink { deliver(lead: Lead): Promise<void> }`, selected by `INTEREST_SINK`:
  - `webhook`: POST JSON to `INTEREST_WEBHOOK_URL` with `X-Ambiently-Signature: sha256=<HMAC(body, INTEREST_WEBHOOK_SECRET)>`. 5 s timeout, 2 retries with backoff. Suits Slack, Zapier or a CRM.
  - `email`: send through a transactional email provider to `INTEREST_NOTIFY_EMAIL` (provider **[Verify]**).
  - `console`: development only. Logs the lead, redacting the email.
  - If delivery fails, the person sees the server error and their answers stay in the form. The page never claims success for a lead that wasn't delivered.
- **Lead payload:**
  ```json
  {
    "id": "uuid",
    "submittedAt": "2026-10-13T21:58:00.000Z",
    "email": "name@company.com",
    "isFreeEmail": false,
    "message": "…",
    "companySize": "50-199",
    "monthlyAiSpend": "5k-25k",
    "attribution": { "utm_source": "…", "referrer": "…" }
  }
  ```
  `id` and `submittedAt` are created inside the action, which runs at request time, so `crypto.randomUUID()` and `new Date()` are fine there.
- **Privacy:**
  - No marketing opt-in is pre-checked, and none exists at launch.
  - Data is used only to reply, and is kept for 12 months **[Verify]**.
  - `/privacy` MUST exist before the form ships. Its content comes from legal; a placeholder page is not acceptable in production.
- **Spam escalation:** if spam gets past these traps, add Cloudflare Turnstile behind a config flag (`site.form.captcha: false` by default). It is not on by default.

---

## 10. SEO

### 10.1 Rendering

- The whole page prerenders static (`○` in the build output). The root layout exports `ensureStatic = 'navigation'` (new in Next 16.4), which fails the build in both dev and production if anything makes the route dynamic: a cookie read, `useSearchParams`, an uncached fetch, or a bare `new Date()`.
- All content, including chart SVG and the hidden data tables, is in the server HTML. Nothing that matters is client-only.
- Charts are server-rendered SVG with `role="img"` and an `aria-label`. Their titles, subtitles, takeaways and hidden data tables are crawlable text.

### 10.2 Metadata

These are set in `app/layout.tsx` from `site`. The home page shares the root segment, and `title.template` doesn't apply to it, so the home title is `title.default`:

```ts
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.seo.title, template: site.seo.titleTemplate },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website', url: '/', siteName: site.name, locale: site.locale,
    title: site.seo.ogTitle, description: site.description,
  },
  twitter: { card: 'summary_large_image', title: site.seo.ogTitle, description: site.description,
             ...(site.seo.twitterHandle && { site: site.seo.twitterHandle }) },
  robots: { index: true, follow: true, googleBot: { 'max-image-preview': 'large', 'max-snippet': -1 } },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)',  color: theme.themeColor.dark },
    { media: '(prefers-color-scheme: light)', color: theme.themeColor.light },
  ],
  colorScheme: 'dark light',
  viewportFit: 'cover',            // safe areas (§11.5); never set maximumScale or userScalable
};
```

- `themeColor` and `colorScheme` belong in `viewport`. They have been deprecated in `metadata` since Next 14.
- Metadata merges shallowly. `/privacy` and `/terms` set their own `title` (and `alternates.canonical`). They don't override `openGraph` unless they set all of it.

### 10.3 Metadata files

| File | Content |
|---|---|
| `app/opengraph-image.tsx` | 1200 × 630 `ImageResponse` from `next/og`: Deep Navy ground; the halftone mark (accent) bleeding off the right; `site.seo.ogTitle` in Inter 600 at 64 px, `ink`; the lockup bottom-left. Exports `alt = site.seo.ogImageAlt`, `size`, `contentType = 'image/png'`. The Twitter image reuses it (re-export) unless a different crop is wanted. |
| Fonts for the OG image | `ImageResponse` accepts **ttf, otf or woff, not woff2**. Commit a static `Inter-SemiBold.ttf` (Latin subset, from the official Inter release, SIL OFL) under `assets/og/`. Read it at module scope with `readFile`, as the docs show; reading inside the handler counts as uncached I/O. Keep the image bundle under 500 KB. |
| `app/icon.svg` | The mark on transparency, gold |
| `app/apple-icon.png` | 180 × 180, the `app-icon` variant (mark on a navy tile with continuous corners; always navy, as the design system says) |
| `app/favicon.ico` | Replace the Next default with a 32/16 px mark on navy |
| `app/manifest.ts` | `name`, `short_name` and `description` from `site`; `theme_color` and `background_color` = dark `surface`; `display: 'browser'`; icons |
| `app/robots.ts` | Allow all, disallow nothing public, `sitemap: ${site.url}/sitemap.xml` |
| `app/sitemap.ts` | `/`, `/privacy`, `/terms`, each with a fixed ISO `lastModified` from `content/` (a `new Date()` here makes the route dynamic under Cache Components) |
| `app/llms.txt/route.ts` (SHOULD) | A static plain-text summary for answer engines: name, description, integrations and key pages, generated from `site` and `content/faq.ts` |

### 10.4 Structured data

JSON-LD is rendered as a native `<script type="application/ld+json">` with `JSON.stringify(data).replace(/</g, '\\u003c')`, as the Next JSON-LD guide shows; not through `next/script`. It is built in `lib/seo/json-ld.ts` from `site` and typed with `schema-dts`.

- **Organization:** `name`, `legalName`, `url`, `logo` (absolute URL of a 512 px PNG of the mark), `email`, `sameAs` (from `site.social`).
- **WebSite:** `name`, `url`, `inLanguage: 'en'`.
- **SoftwareApplication:** `name`, `applicationCategory: 'BusinessApplication'`, `operatingSystem: 'Web'`, `description`, `url`. **No `offers` and no `aggregateRating`** until both exist; inventing either breaks Google's guidelines.
- **FAQPage:** generated from `content/faq.ts`, with answers matching the visible text word for word. Google shows FAQ rich results only for a narrow set of sites now, but the markup still helps answer engines understand the page.

### 10.5 On-page

- **Keyword map.** Work these phrases in naturally; never stuff.

  | Section | Primary | Secondary |
  |---|---|---|
  | Title, `h1` eyebrow, description | AI spend tracking | AI token spend, AI cost tracking |
  | Why, dashboards | AI spend management | AI cost visibility, AI FinOps |
  | Vendors and models | LLM cost monitoring | Claude usage dashboard, OpenAI usage dashboard, Cursor spend, GitHub Copilot cost |
  | Tasks | AI cost attribution | AI spend by project, AI cost per ticket, Jira AI usage |
  | Teams | AI usage analytics by team | AI spend per employee |
  | Waste, budgets | reduce AI costs | AI budget alerts, prompt caching savings |
  | FAQ | (long-tail questions) | |

- The `h1` holds the tagline (Ben's requirement) plus the visible eyebrow "AI spend tracking". No hidden or cloaked text anywhere. The design system's visually hidden data tables mirror visible charts and are an accessibility pattern, not cloaking.
- Anchor links use descriptive text ("See the dashboards", not "Learn more").
- Outbound source links use `rel="noopener"` (not `nofollow`; they are real citations).
- Page weight and text: about 1,500 words of real copy. Chapters and FAQ carry most of it.
- `lang="en"` on `<html>`. One canonical. No `noindex` in production. Preview deployments send `X-Robots-Tag: noindex` (set in `next.config.ts` headers when `VERCEL_ENV !== 'production'`, or the host's equivalent).

### 10.6 Launch tasks

Verify the domain in Google Search Console and Bing Webmaster Tools, submit the sitemap, and run the Rich Results Test against the production URL. Check the OG card in the LinkedIn Post Inspector and the X card validator.

---

## 11. Theming and Apple HIG

### 11.1 Appearance policy

- **Light and dark are both first-class.** Every section, chart, logo and state is designed and tested in both.
- **The page follows the system appearance** (`prefers-color-scheme`), including Auto switching while the page is open. HIG: *"Avoid offering an app-specific appearance setting… people… may think your app is broken because it doesn't respond to their systemwide appearance choice."* There is **no theme toggle** (`theme.appearance.allowToggle: false`).
- **No preference reported → dark**, the brand's own appearance.
- Theming is pure CSS (media queries on generated tokens). No cookie, no inline script and no hydration flash, and the page stays fully static.
- If Ben ever enables `allowToggle`: the choice is stored in `localStorage`, applied by a tiny inline `<head>` script that sets `data-theme` before paint (allowed by CSP hash), with `suppressHydrationWarning` on `<html>`. It is never stored in a cookie read on the server, which would make every route dynamic under Cache Components. The generated CSS already supports `data-theme` overrides for this.

### 11.2 Token pipeline

`spec/ambiently-design-system/tokens.json` is the only source of colour, type, spacing, radius, shadow and size values.

- `scripts/build-tokens.mjs` runs on `predev` and `prebuild` and generates two files. Both are committed; CI fails if regenerating changes them.
  - **`styles/tokens.generated.css`**:
    ```css
    :root { color-scheme: dark; --surface: #0b1b3d; /* …all dark values */ }
    @media (prefers-color-scheme: light) {
      :root:not([data-theme='dark']) { color-scheme: light; --surface: #f5f6f8; /* …all light values */ }
    }
    :root[data-theme='light'] { color-scheme: light; /* light values */ }
    :root[data-theme='dark']  { color-scheme: dark;  /* dark values */ }
    :root { --space-1: 0.25rem; /* …spacing, radius, sizes in rem */ }
    /* type classes (.display, .title-1, … .code) in rem, unchanged otherwise */
    ```
    The design system's own `tokens.css` keys themes on `[data-theme]` only. The generated file adds the media query so the system appearance works without JS. Colour values are identical.
  - **`config/tokens.generated.ts`**: the same colours as `{ name: { dark, light } }` for `theme.ts`, the OG image and the manifest.
- `app/globals.css` imports, in order: `tailwindcss`, `styles/tokens.generated.css`, the design system's `components/bundle.css` (unchanged, imported from `spec/ambiently-design-system/components/bundle.css`), then the page's own CSS.
- The `@font-face` rules in `tokens.css` are **not** used; fonts come from `next/font/local` (§13.5). `--font-sans` becomes `var(--font-inter), -apple-system, "SF Pro Text", system-ui, sans-serif`.
- Tailwind v4 maps tokens to utilities with `@theme inline` (`--color-surface: var(--surface)`, `--color-ink-muted: var(--ink-muted)`, …) after resetting the default palette (§3.4). Tailwind's 4 px spacing scale already matches the design system's grid (`p-6` = `space-6` = 24 px).
- `body` gets `class="amb-page"` for the design system's ground, font and text colour.

### 11.3 Where the design system and HIG disagree, and how it's resolved

| # | Design system says | HIG says | Resolution |
|---|---|---|---|
| 1 | Dark first; "marketing pages are full-bleed navy" | Follow the system appearance; no app-specific setting | Follow the system; dark when no preference; light marketing pages use light `surface`. Only the app icon and OG image are always navy. |
| 2 | Hit areas ≥ 32 px | 44 × 44 pt default on touch | Under `@media (pointer: coarse)`, every interactive element gets a ≥ 44 × 44 px hit area (via `min-height` or a transparent `::after` hit slop) with no visual change. Marketing buttons are 48 px (`lg`) anyway. |
| 3 | Sizes in px | Support larger text (Dynamic Type), ideally to 200% | All type and spacing tokens are emitted in `rem`; browser text-size settings and 200% zoom work without loss or overlap (tested). |
| 4 | Charts: mouse hover only | Accessible, interactive charts | Pointer, touch and keyboard support added (§7.4) |
| 5 | "Nothing loops except the live dot" | Make motion optional; reduce repetitive animation | The marquee is the one sanctioned exception, because Ben requires it. It's pausable, stops off-screen and is static under Reduce Motion. |
| 6 | No gradients | Materials (translucency) for bars over content | The header uses a translucent material (blur is not a gradient). Opaque under Reduce Transparency or without `backdrop-filter` support. |
| 7 | `ink-muted` at 5.0:1 on navy | Strive for 7:1 in small text; provide a higher-contrast scheme under Increase Contrast | Under `prefers-contrast: more`: `--ink-muted → ink-secondary`, `--line → line-strong` at 60%, card hairlines become `line-strong`, and chart gridlines darken. Default tokens are unchanged. |

### 11.4 HIG checklist (each item is an acceptance test)

- **Appearance:** both modes, Auto switching while open, no hard-coded colours, `color-scheme` set so native controls and scrollbars match. Logos are monochrome `currentColor` so they adapt.
- **Contrast:** all text ≥ 4.5:1 (design-system tokens are specified for this in both themes); meaningful marks ≥ 3:1; tested again under Increase Contrast.
- **Typography:**
  - Inter with the SF Pro and system fallbacks the design system specifies.
  - Nothing below 12 px, except the design system's 11 px `overline` (HIG's iOS minimum is 11 pt).
  - Weights stay within 400–600.
  - Text resizes to 200% without loss.
- **Layout:** size classes instead of device detection; safe areas on all four edges (`viewport-fit=cover` plus `env(safe-area-inset-*)` on header, gutters and footer); content in reading order; related items grouped with space, containers and hairlines.
- **Touch:** 44 × 44 px targets on coarse pointers; nothing relies on hover; charts don't block scrolling.
- **Motion:** purposeful, brief, interruptible, optional; fully honoured under Reduce Motion (§8.6); no information carried only by motion.
- **Accessibility settings honoured:** `prefers-reduced-motion`, `prefers-contrast`, `prefers-reduced-transparency` (where supported), `forced-colors`.
- **Colour is never the only signal:** deltas have arrows and signs; errors have text and an icon; chart series have legends.
- **VoiceOver:** landmarks; one `h1`; logical heading order; labelled controls; charts announced with title and summary; decorative art hidden.

### 11.5 Safe areas

`viewport-fit=cover` is set in `viewport` (§10.2). The header pads `env(safe-area-inset-top)`, gutters add the left and right insets, and the footer adds the bottom inset. Nothing interactive sits within 16 px of a screen edge on compact widths.

---

## 12. Accessibility (WCAG 2.2 AA)

On top of the HIG checklist:

- Skip link; landmarks (`header`, `nav`, `main`, `footer`); every `section` labelled.
- Focus is always visible (the design system's `focus-ring`, never removed) and never obscured by the sticky header (2.4.11). Focus order follows reading order.
- The marquee has a pause control (2.2.2); no content flashes more than three times a second (2.3.1).
- Target size ≥ 24 × 24 px everywhere (2.5.8), and ≥ 44 × 44 px on touch (§11.3).
- Form: labels, error identification, suggestions, an error summary, no time limits, and status messages announced (4.1.3).
- Charts: an accessible name, a takeaway in text, a hidden data table, keyboard reading.
- `prefers-reduced-motion` honoured (2.3.3, AAA, adopted as a requirement).
- Language set; abbreviations ("AI") are plain enough not to need expansion.
- Tested with axe in both appearances, with VoiceOver on macOS Safari and iOS Safari, with keyboard only, and at 200% and 400% zoom.

---

## 13. Technical architecture

### 13.1 Stack and dependencies

The installed versions are the baseline: `next@16.4.0`, `react@19.3.0`, `tailwindcss@4`, Turbopack via the existing `turbopack.rules` in `next.config.ts`. Add these, pinned exactly:

| Package | Version | Why |
|---|---|---|
| `gsap` | 3.15.0 | Motion |
| `@gsap/react` | 2.1.2 | `useGSAP` |
| `zod` | 4.x (pin exact at install) | Form schema |
| `schema-dts` (dev) | latest at install | JSON-LD types |
| `vitest` (dev) | latest at install | Unit tests |
| `@playwright/test` (dev) | match the installed browser at `/opt/pw-browsers` in CI images | E2E and visual tests |
| `@axe-core/playwright` (dev) | latest at install | Accessibility tests |
| `@lhci/cli` (dev) | latest at install | Lighthouse budgets |

No CSS-in-JS, UI kit, chart library or animation library beyond GSAP. The design system covers components and charts.

### 13.2 Next.js 16.4 rules that apply here

Read in `node_modules/next/dist/docs/` before coding: `01-app/01-getting-started/{05-server-and-client-components,13-fonts,14-metadata-and-og-images}.md`, `01-app/02-guides/{forms,server-actions,json-ld,public-static-pages,keeping-pages-static,preventing-flash-before-hydration,upgrading/version-16}.md`, `01-app/03-api-reference/03-file-conventions/02-route-segment-config/ensureStatic.md`.

- **Cache Components is on** (`cacheComponents: true`). The page MUST NOT read `cookies()`, `headers()` or `searchParams` during render, use `useSearchParams()`, or call `new Date()`, `Date.now()`, `Math.random()` or `crypto.randomUUID()` while rendering. Any of these fails the prerender. If one is ever unavoidable, use `'use cache'` with a `cacheLife` profile longer than `seconds` (as the copyright year does). Server Actions run at request time and are exempt.
- **`ensureStatic = 'navigation'`** exported from `app/layout.tsx` keeps every route fully static and fails fast otherwise.
- **`partialPrefetching: true`** is already set and needs no work for a single page. Keep it.
- **`title.template` doesn't apply to `app/page.tsx`** (same segment as the root layout). The home title is `title.default`.
- **`themeColor` and `colorScheme` go in `viewport`**, not `metadata`.
- **`next/image`:** `priority` is deprecated; use `preload` or `fetchPriority="high"`. The page has no raster images at launch; logos and art are inline SVG.
- **`middleware` is now `proxy`** (`proxy.ts`). This page needs neither.
- **`next lint` is gone.** Run `pnpm lint` (`eslint`, flat config, already in `package.json`).
- **Inline scripts and CSP:** nonce-based CSP doesn't work with static pages (§13.8). The page adds no inline executable scripts of its own: theming is CSS, and the motion gate is CSS (§8.3). JSON-LD blocks are data, not script.
- **Activity:** in Next 16, navigating away keeps the previous route in the DOM, hidden, and its effects clean up and re-run on return. `useGSAP` cleanup handles this; never create ScrollTriggers outside a `useGSAP` scope.

### 13.3 File structure

```
app/
  layout.tsx                 # <html lang="en" className={inter.variable}> <body class="amb-page">, metadata, viewport, ensureStatic, Org + WebSite JSON-LD
  page.tsx                   # composes sections; SoftwareApplication + FAQPage JSON-LD
  globals.css                # imports (§11.2) and page-level CSS
  actions/interest.ts        # 'use server'
  opengraph-image.tsx
  twitter-image.tsx          # re-export of opengraph-image
  icon.svg  apple-icon.png  favicon.ico
  manifest.ts  robots.ts  sitemap.ts
  llms.txt/route.ts
  privacy/page.tsx  terms/page.tsx
  not-found.tsx              # on-brand 404 with a link home
assets/og/Inter-SemiBold.ttf
public/brand/ambiently-mark-512.png   # from the design system's PNG; used by Organization JSON-LD
components/
  ds/                        # TypeScript port of the design system (§13.4)
    Logo.tsx Icon.tsx icons.ts Button.tsx IconButton.tsx Toggle.tsx Select.tsx Badge.tsx Delta.tsx
    Card.tsx Stat.tsx Spark.tsx LineChart.tsx BarChart.tsx Ring.tsx Sidebar.tsx Legend.tsx Tip.tsx
    DataTable.tsx format.ts geometry.ts useWidth.ts logo-dots.ts index.ts
  sections/                  # one per §6 subsection
    SiteHeader.tsx Hero.tsx IntegrationsMarquee.tsx WhyReceipts.tsx DashboardShowcase.tsx
    Lens.tsx ValueChapter.tsx HowItWorks.tsx Trust.tsx Faq.tsx InterestSection.tsx SiteFooter.tsx
  dashboards/                # composed visuals
    HeroReceipt.tsx OverviewDashboard.tsx ReceiptsTable.tsx AlertsList.tsx chapters/*.tsx
  forms/InterestForm.tsx     # 'use client' (useActionState)
  motion/                    # 'use client'
    gsap.ts MotionProvider.tsx Reveal.tsx useChartReveal.ts CountUp.tsx HalftoneSun.tsx Marquee.tsx
  integrations/logos/        # anthropic.tsx microsoft.tsx cursor.tsx openai.tsx github.tsx jira.tsx monday.tsx notion.tsx index.ts
config/  site.ts theme.ts types.ts tokens.generated.ts
content/ landing.ts faq.ts sample-data.ts sources.ts
lib/     interest/{schema.ts,sink.ts,rate-limit.ts,free-email-domains.ts}  seo/json-ld.ts  analytics.ts  year.ts
scripts/ build-tokens.mjs
styles/  tokens.generated.css
tests/   unit/*.test.ts  e2e/*.spec.ts
```

### 13.4 Porting the design system

`components/bundle.js` is a React 18 IIFE that reads `window.React` and attaches to `window.Ambiently`. React 19.3 has no UMD build, and loading the bundled React 18 copies would put a second React on the page (invalid hook calls) and stop the components server-rendering. So the components MUST be **ported to typed ES modules** in `components/ds/`:

- **Same DOM and class names** as `bundle.js`, so `bundle.css` styles them unchanged. Props follow `components/index.d.ts`.
- Pure components stay Server Components: `Logo`, `Icon`, `Button`, `Badge`, `Delta`, `Card`, `Stat`, `Spark`, `Ring`, `Select` (with no handlers). Only `LineChart`, `BarChart`, `Toggle` and `Sidebar` (stateful) get `'use client'`.
- **Copy the data verbatim:** the 325-dot `LOGO_DOTS` array, the icon paths, `monotonePath`, `niceTicks` and `compact`. Never redraw the mark.
- **Additive changes only:** the chart behaviours in §7.4; `Card` takes `titleAs` (default `'h3'`); `Logo` reads its word and tagline from `site` instead of hard-coding them; `Icon` gains `pause` (§17). Every change is listed in `components/ds/CHANGES.md` for the design-system team.
- **Visual parity is tested:** Playwright renders each ported component next to its `preview.html` in both themes and compares screenshots (max 0.1% pixel difference).

### 13.5 Fonts

- `next/font/local` in `app/layout.tsx`, loading `spec/ambiently-design-system/fonts/Inter-Variable-Latin.woff2`: `weight: '100 900'`, `display: 'swap'`, `preload: true`, `variable: '--font-inter'`, `adjustFontFallback: 'Arial'`. Only the root layout calls it.
- LatinExt: a second `localFont` call with `preload: false` and `declarations` setting `font-family: Inter` and the LatinExt `unicode-range`. Confirm in a build that the two calls produce a single family. If they don't, drop LatinExt: launch copy is ASCII plus punctuation the Latin subset covers.
- Fonts are self-hosted; no third-party font requests.

### 13.6 Server and client boundaries

- `page.tsx` and every section are Server Components. They render all text and chart SVG.
- Client islands, kept small:
  - `MotionProvider` (one per page): registers GSAP, sets `data-motion`, owns `gsap.matchMedia`.
  - `Reveal` wrappers, which take server-rendered `children`.
  - The charts.
  - `Marquee`, `Lens`, `InterestForm`, `HalftoneSun`.
  - The header's CTA-state controller.
- Props across the boundary are serializable: fixtures and copy, never functions. Chart `format` functions are replaced by a serializable `format: 'currency' | 'compact' | 'tokens'` key resolved on the client.

### 13.7 Environment variables

| Variable | Required | Use |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | production | `metadataBase`, sitemap, JSON-LD. The build fails if missing when `NODE_ENV=production`. |
| `INTEREST_SINK` | production | `webhook` · `email` · `console` |
| `INTEREST_WEBHOOK_URL`, `INTEREST_WEBHOOK_SECRET` | if webhook | Delivery and signature |
| `INTEREST_NOTIFY_EMAIL`, provider key | if email | Delivery |
| `INTEREST_HASH_SECRET` | production | IP hashing for rate limits |
| `RATE_LIMIT_URL`, `RATE_LIMIT_TOKEN` | production | Rate-limit store |
| `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY` | multi-instance hosting | Stable Server Action encryption |

Add a `.env.example`; the existing `.gitignore` already excludes `.env*`. Add `!.env.example` so the example can be committed.

### 13.8 Security headers

Set in `next.config.ts` `headers()`:

- `Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self' <analytics origin>; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'`
- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`

Why `'unsafe-inline'`: the App Router streams its payload in inline `<script>` tags. Nonces only work on dynamically rendered pages, and this page is static by design. So the Next CSP guide's "Without nonces" policy applies. Turn on `experimental.sri` so the external chunks carry `integrity` hashes. Styles need `'unsafe-inline'` for the `style` attributes React and GSAP set. The page adds no inline scripts of its own.

---

## 14. Analytics

- **Cookieless and privacy-friendly only** (for example Vercel Web Analytics or Plausible), chosen in `site.analytics.provider` (`'none'` by default until Ben picks one, §17). No cookie banner should then be needed; confirm with legal for EU traffic.
- Events (`lib/analytics.ts`, no PII):
  - `cta_click {location}`
  - `form_start`, `form_submit`, `form_success`, `form_error {kind}`
  - `lens_change {lens}`
  - `chart_range_change {chart, range}`
  - `marquee_pause`
  - `faq_open {id}`
- Core Web Vitals reported with `useReportWebVitals` from `next/web-vitals`.

---

## 15. Performance budgets

| Budget | Limit |
|---|---|
| LCP (lab, Moto G Power, slow 4G) | ≤ 2.0 s |
| CLS | ≤ 0.05 |
| INP / TBT (lab) | ≤ 200 ms / ≤ 150 ms |
| Client JS for `/` (gzip, including framework) | ≤ 170 KB |
| GSAP and plugins (gzip) | ≤ 50 KB |
| CSS (gzip) | ≤ 30 KB |
| Fonts | 1 preloaded woff2 (Latin) |
| HTML (gzip) | ≤ 80 KB; the product shot and fixtures make it large, so watch it |
| Requests before LCP | HTML, CSS, one font |

These are enforced by Lighthouse CI on every PR (§16).

---

## 16. Quality and acceptance

### 16.1 Definition of done

The page is done when every item below holds on the production build.

**Copy and config**
- [ ] The hero `h1` and footer tagline match §4.1 character for character and come from `site.taglines`.
- [ ] No brand name, tagline or description is hard-coded outside `config/` and `content/` (the unit test in §3.4 passes).
- [ ] Every **[Verify]** item is confirmed against `~/ambient-work` or cut; every third-party figure has a primary source in `content/sources.ts`.

**Design system and HIG**
- [ ] The design system is used throughout: tokens only, ported components, chart rules, voice. `components/ds/CHANGES.md` lists every extension.
- [ ] Light and dark are both correct, follow the OS (including live switching), have no toggle, and fall back to dark.
- [ ] The HIG checklist (§11.4) passes, including Increase Contrast, Reduce Transparency, Reduce Motion, 44 px touch targets, safe areas and 200% text.

**Integrations**
- [ ] The marquee shows the eight logos in order, seamless, pausable, paused off-screen and static under Reduce Motion.
- [ ] Logos come from official kits with legal sign-off.

**Visualizations**
- [ ] Every chart in §7.2 renders server-side, is labelled sample data, reconciles with Appendix B, and works with mouse, touch and keyboard.

**Motion**
- [ ] Choreography matches §8.4.
- [ ] No painted text is hidden; everything is final-state under Reduce Motion and `?motion=off`.
- [ ] No element is left at `opacity: 0` after scrolling the whole page (an E2E test).

**Form**
- [ ] The form works without JS and with JS.
- [ ] Validation runs on client and server; anti-spam and rate limits are in place; delivery is confirmed end to end.
- [ ] `/privacy` is live.

**SEO and performance**
- [ ] The route builds as static with `ensureStatic = 'navigation'`.
- [ ] Metadata, OG image, JSON-LD (passes the Rich Results Test and validator.schema.org), sitemap and robots are in place.
- [ ] Lighthouse mobile: Performance ≥ 95, Accessibility 100, Best Practices 100, SEO 100.
- [ ] axe reports 0 violations in both appearances, and every budget in §15 holds.

### 16.2 Tests

**Unit (Vitest)**
- Fixture sums: each lens = $128,400, receipts reconcile, deltas and takeaways compute to the strings in `content/`.
- `format.compact` parity with the design system.
- Zod schema cases.
- The no-hard-coded-copy check.
- Token generation is stable.

**E2E (Playwright: Chromium, WebKit and Firefox)**
- **Matrix:** viewports 375 × 812, 768 × 1024, 1280 × 800, 1440 × 900 and 1920 × 1080; `colorScheme` light and dark; `reducedMotion` reduce and no-preference; `forcedColors` active (Chromium).
- **Scenarios:**
  - Anchor navigation clears the sticky header.
  - The marquee pauses on hover, focus and the button, and is static under reduce.
  - Lens: pin and scroll on wide; buttons on compact.
  - Chart keyboard reading.
  - Form: happy path, every error, no-JS submit (`javaScriptEnabled: false`), honeypot, rate limit.
  - Success focus.
  - Nothing remains hidden after a full scroll.
- **Visual regression** with `?motion=off`, in both appearances at three widths.
- **Accessibility:** `@axe-core/playwright` on the full page in both appearances.

**Lighthouse CI**
- Budgets from §15, on the production build, mobile and desktop presets.

**Manual**
- VoiceOver (macOS and iOS Safari).
- iOS Safari with the notch (safe areas), Auto appearance switching while the page is open, and text size at 200%.
- Android Chrome with a 4× CPU throttle (motion smoothness).

### 16.3 Build order

1. **Foundation.** `scripts/build-tokens.mjs`, `globals.css` imports, fonts, `config/` and `content/` skeletons, the root layout with metadata, viewport and `ensureStatic`; replace the starter page.
2. **Design-system port.** Port `components/ds/` with parity tests; chart touch and keyboard additions.
3. **Static page.** All sections with final copy and fixtures, no motion. Ship-able on its own; check SEO and accessibility here.
4. **Interest form.** Action, schema, sink, rate limit, `/privacy`.
5. **Motion.** `MotionProvider`, reveals, hero, product shot, lens pin, marquee, How-it-works dots, footer.
6. **Metadata assets.** OG image, icons, manifest, sitemap, robots, JSON-LD, `llms.txt`.
7. **Hardening.** Security headers, analytics, Lighthouse CI, the full E2E matrix, the manual pass.
8. **Launch.** Search Console, Bing, sitemap submission, OG validators.

---

## 17. Open questions and logged gaps

### Decisions for Ben

1. **Product facts.** Everything tagged **[Verify]**: integration roles and status, metadata-only collection, read-only connections, attribution to tasks, alert channels, savings recommendations, pricing and setup time. These need `~/ambient-work`.
2. **Domain, legal name, contact email, social handles** for `config/site.ts`.
3. **Work email in the form.** Ben's brief lists what the visitor wants, company size and AI spend. This spec adds a required work email so there's someone to reply to. Confirm, or name the alternative. Also choose where leads go (webhook to Slack or CRM, or email) and the hosting platform (it decides the rate-limit store).
4. **Footer tagline wording.** "Do you know what tasks are your employees using AI for?" is kept verbatim. The standard indirect-question order would be "Do you know what tasks your employees are using AI for?" Keep or change?
5. **Hero tagline punctuation.** "AI tokens are money, you want receipts, right?" is kept verbatim (comma splice, question form). It intentionally breaks the design system's "short declaratives" voice rule, which is fine as a sanctioned exception.
6. **Logo permissions.** Using third-party logos needs each company's guidelines followed, and some (Microsoft in particular) restrict logo use without a licence or partner status. Legal review is needed before launch. The fallback is to set the names in Inter as text in the marquee.
7. **Theme toggle.** None, per HIG. Confirm.
8. **Yellow.** The design system flags an open choice between Ambient Yellow `#ffe600` (UI accent) and the mark's gold `#f9bb01` (logo). This spec follows the design system as it stands: `accent` for UI, `gold` for the logo.
9. **Competitor-sourced figures.** Some of the research's strongest numbers come from Ramp and other competitors. This spec avoids citing competitors. Confirm, or approve specific figures.
10. **Analytics provider** (or none).

### Gaps logged for the design system

1. **`pause` icon** is missing from the icon set (needed for the marquee). Draw it on the 24-grid at 1.5 px with round caps.
2. **Chart touch and keyboard interaction** (§7.4).
3. **`Card` heading level** (`titleAs`).
4. **`Logo` copy from config** instead of hard-coded strings.
5. **Responsive marketing type** (§4.5): the design system defines only one size per style.
6. **Text input and textarea components**, which the design system lacks. The form styles them from `Select`'s rules (§9.3).
7. **Theming by `prefers-color-scheme`**: the design system's `tokens.css` switches only on `data-theme`.
8. **Higher-contrast token variants** for `prefers-contrast: more` (§11.3, row 7).

---

## Appendix A. Copy deck

All copy lives in `content/landing.ts` (and `site.ts` for brand-level strings). §6 is the authoritative copy, section by section, and this appendix doesn't repeat it, so the two can't drift. When copy changes, change `content/` and update §6 in the same PR.

## Appendix B. Sample data (Example Co., September 2026)

Example Co. is a fictional 340-person software company. Sample "today" is 2026-09-30. All money is USD.

### B.1 Hero receipt — today

| Task | Source | Team | Model / tool | Tokens | Cost |
|---|---|---|---|---|---|
| ENG-1423 Refactor billing service | Jira | Engineering | Claude Sonnet (in 2.40M / out 0.31M) | 2.71M | $11.85 |
| MKT-208 Q4 launch brief | monday.com | Marketing | GPT-5 (in 0.52M / out 0.12M) | 0.64M | $1.85 |
| Support macros refresh | Notion | Support | Claude Haiku (in 1.90M / out 0.40M) | 2.30M | $3.90 |
| Code review, 14 engineers | Cursor | Engineering | Cursor usage | — | $46.20 |
| Pull request summaries | GitHub | Engineering | GitHub Copilot premium requests | — | $18.40 |
| Contract review | Microsoft | Legal | Microsoft Copilot, 625 credits | — | $6.25 |
| + 1,284 more line items | | | | | |
| **Total today** | | | | | **$4,218.00**, +12.2% vs yesterday ($3,760) |

Illustrative unit prices, per million tokens, used only to compute the fixtures (never shown on the page): Claude Sonnet in $3 / out $15 · Claude Haiku in $1 / out $5 · Claude Opus in $5 / out $25 · GPT-5 in $1.25 / out $10 · GPT-5 mini in $0.25 / out $2. Microsoft Copilot credits at $0.01. Update these to public list prices when the fixtures are refreshed.

### B.2 Product shot

**Stat tiles**

| Tile | Value | Delta | Extra |
|---|---|---|---|
| Spend this month (**hero**) | $128,400 → "$128K" | −8.2% vs August (`upIsGood: false`) | — |
| Spend today | $4,218 | +12.2% vs yesterday (`upIsGood: false`) | trend: last 12 days of B.4 |
| Tokens today | 684M | +9.1% vs yesterday (627M) | — |
| Active users | 291 | +2.5% vs last week (284) | caption "86% of employees" |

**Charts**

- **Daily spend:** B.4 (September vs August).
- **Spend by token type**, four 7-day blocks summed from B.4 (Sep 1–2, $7,234, falls outside the blocks), with output's share rising 62% → 65%:

  | Week | Sep 3–9 | Sep 10–16 | Sep 17–23 | Sep 24–30 |
  |---|---|---|---|---|
  | Output | 16,801 | 18,701 | 20,790 | 20,734 |
  | Input | 10,297 | 10,983 | 11,695 | 11,165 |
  | Total | 27,098 | 29,684 | 32,485 | 31,899 |
- **Top models by spend** (top 4 of B.3 "By model"): Claude Sonnet 39,800 · GPT-5 27,300 · Claude Opus 18,600 · Claude Haiku 8,900.
- **Tokens by hour, today** (millions; sums to 684M), 00:00–23:00:
  14.7, 13.6, 12.5, 11.8, 11.5, 12.2, 15.0, 21.8, 30.1, 36.5, 42.2, 44.4, 43.3, 45.1, 46.8, 46.2, 43.7, 40.8, 35.1, 30.8, 27.2, 22.9, 19.3, 16.5
- **Health rings:** Budget used 92% ($128,400 of $140,000) · Cache hit rate 41%.

### B.3 Lens: September total $128,400

| By vendor | $ | By model | $ | By team | $ | By task | $ |
|---|---|---|---|---|---|---|---|
| Anthropic | 48,200 | Claude Sonnet | 39,800 | Engineering | 71,900 | Code generation and features | 38,500 |
| OpenAI | 33,400 | GPT-5 | 27,300 | Product | 14,100 | Code review | 21,800 |
| Cursor | 23,600 | Seats (Copilot, Cursor) | 26,100 | Support | 12,200 | Bug fixes | 17,900 |
| GitHub | 13,600 | Claude Opus | 18,600 | Marketing | 11,600 | Customer replies | 12,600 |
| Microsoft | 9,600 | Claude Haiku | 8,900 | Sales | 8,300 | Documentation | 10,300 |
| | | GPT-5 mini | 7,700 | Finance and ops | 6,100 | Research and analysis | 9,800 |
| | | | | Legal | 4,200 | Sales and marketing content | 8,700 |
| | | | | | | Meeting notes and summaries | 4,100 |
| | | | | | | Not linked to a task (last) | 4,700 |
| **Total** | 128,400 | | 128,400 | | 128,400 | | 128,400 |

Takeaways (computed):
- Anthropic + OpenAI = 63.6% → "64%".
- Seats = 20.3% → "a fifth".
- Engineering = 56.0%.
- Code work (features + review + bug fixes) = 60.9% → "61%".
- Not linked = 3.7% → "4%".
- Code review + bug fixes = 30.9% → "31%" (Tasks chapter).

In the By model column, "Seats" ranks third. It sits in rank order, not last, because it's a real category rather than a residual.

### B.4 Daily spend — September vs August (days 1–30)

**September**, sums to 128,400:
3534, 3700, 3605, 4044, 4293, 4009, 3427, 3617, 4103, 4412, 4637, 4341, 3842, 3653, 4197, 4602, 4886, 4756, 4258, 3926, 4483, 4934, 5242, 5076, 4590, 4293, 4756, 5206, 3760, 4218

**August** (first 30 days, scaled), sums to 139,900:
4454, 4361, 4533, 4680, 4799, 4627, 4281, 4374, 4573, 4733, 4906, 4799, 4494, 4387, 4586, 4759, 4919, 4853, 4520, 4427, 4627, 4799, 4972, 4919, 4587, 4494, 4680, 4839, 4999, 4919

- Δ month: 128,400 vs 139,900 = −8.2%.
- Δ day: 4,218 vs 3,760 = +12.2%.
- "Last 7 days" is the final 7 points of September.
- "This quarter" is 13 weekly totals, July–September. Generate them with the same weekly shape and make the September weeks sum to the September total; add them to `sample-data.ts` and test the sum.
- **Forecast, October:** the average of September's last 14 days ($64,384 ÷ 14 = $4,598.86) × 31 days = $142,565 → "$143K", over the $140K budget (B.9). Recompute it if the fixture changes.

### B.5 Vendors and models

- **Top models by spend:** B.3 "By model", excluding Seats, top 5.
- **Spend by token type:** as B.2.
- **Takeaway:** "Output tokens cost nearly twice what input does" (Sep 24–30: 20,734 vs 11,165 = 1.86×), "and the gap is growing" (the gap widens from 6,504 to 9,569 across the four weeks).

### B.6 Tasks

- **Spend by task type:** B.3 "By task".
- **Recent receipts** (month to date):

| Task | Source | Team | Model or tool | Tokens | Cost | How the cost is made up |
|---|---|---|---|---|---|---|
| ENG-1423 Refactor billing service | Jira | Engineering | Claude Sonnet, Cursor | 41.2M | $612.40 | Sonnet in 36.0M ($108.00) + out 5.2M ($78.00) + Cursor usage $426.40 |
| ENG-1388 Fix flaky checkout tests | Jira | Engineering | Cursor | — | $138.20 | Cursor usage |
| MKT-208 Q4 launch brief | monday.com | Marketing | GPT-5 | 6.8M | $19.00 | in 5.6M ($7.00) + out 1.2M ($12.00) |
| Customer FAQ refresh | Notion | Support | Claude Haiku | 9.4M | $15.80 | in 7.8M ($7.80) + out 1.6M ($8.00) |
| Board update, September | Notion | Finance and ops | Microsoft Copilot | — | $30.00 | 3,000 credits |

Store the in/out split in the fixture and compute each cost from the B.1 unit prices, so the test in §16.2 can check every row.

### B.7 Teams

- **Spend by team:** B.3 "By team".
- **Concentration:** 58% of spend from the top 12% of users.
- **Active AI users,** weekly, 8 weeks: 212, 228, 236, 251, 263, 270, 284, 291 (of 340 employees).
- **Cost per active user:** $128,400 ÷ 291 = $441.24 → "$441", Δ −11.7% vs August (`upIsGood: false`). August reference: $139,900 ÷ 280 August active users = $499.64.
- **Engineering's share of active users:** 90 of 291 = 31%.

### B.8 Waste

- **Savings by fix** (monthly):
  - Turn on prompt caching for 3 API keys: 4,900
  - Route summaries to a smaller model: 3,700
  - Remove 22 idle seats: 2,600
  - Cap long-context retries: 1,100
- **Total:** $12,300 = 9.6% of $128,400.
- **Cache hit rate:** 41%.

### B.9 Budgets

- **Budget:** $140,000 for September, linear: day *n* = 140,000 × n / 30.
- **Cumulative spend:** running total of B.4 September (3,534 → 128,400).
- **Budget used:** 91.7% → "92%".
- **Alerts:**
  1. `negative` "Over 90%": "Engineering passed 90% of its September budget." Sep 24
  2. `neutral` "Spike": "Cursor spend rose 38% week over week." Sep 18
  3. `accent` "Fix available": "Prompt caching is off for 3 Anthropic keys." Sep 12

## Appendix C. Third-party figures to source before launch

Every figure here comes from `spec/research/AI Spend Intelligence Market Analysis.pdf`. Each one needs its primary source opened, quoted and linked in `content/sources.ts`.

| Figure on the page | Research attribution |
|---|---|
| 117% growth to $28.3B in generative AI model spend, 2026 | Gartner, via Techstrong |
| 52% of practitioners: no clear AI cost owner | Harness, State of AI in FinOps 2026 (700 practitioners) |
| 98% of FinOps teams manage AI spend (31% in 2024) | FinOps Foundation, State of FinOps 2026, via USU |
| Nearly a third need a full week to trace a cost spike | Harness |
| 10–15% of employees drove ~60% of spend at Rippling | TechCrunch, via AI Weekly |
| 26% of AI spend estimated wasted | Harness |
| $10K a month leak from missing prompt caching at AngelList | SiliconANGLE |
| Uber spent its 2026 AI coding budget in four months | TechStackups |
