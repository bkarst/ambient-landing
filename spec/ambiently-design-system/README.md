Ambiently is an AI spend telemetry platform: it collects telemetry data to help the world understand what's happening, in real time. The brand is Deep Navy, one yellow, a halftone sun, and Inter — a quiet, precise instrument panel. Everything here follows one idea from the tagline: **real-world insights, quieter.** Numbers are loud; everything around them is calm.

## Voice and content

- Speak plainly and in the present tense. "Ambiently collects telemetry data to help the world understand what's happening, in real time." No superlatives, no exclamation marks, no emoji.
- Headlines are short declaratives with a full stop: "A more aware world." "Telemetry for a brighter tomorrow." "Data moves the world forward." "Smaller signals. Bigger possibilities."
- Sentence case everywhere except the overline tagline, which is set in capitals: REAL-WORLD INSIGHTS. QUIETER.
- Address the reader as *you* only in onboarding and empty states; the product otherwise names things, not people.
- Labels are nouns ("Spend", "Active sensors", "Tokens / sec"); buttons are verb-first ("Get started", "Add budget", "Export CSV").
- Numbers are the content. Compact them above 10,000 (12.4K, 1.3M, $128K), show the unit once, and always say what a change is measured against ("vs yesterday").

## Colour

Two themes, dark first: the brand lives on Deep Navy, and the light theme exists for documents, print and daylight.

- Grounds: `surface` for the page, `surface-raised` for every card and panel, `surface-sunken` for the sidebar and chart tracks, `surface-hover` for the hovered or active row. Cards separate from the page by tone and a `line` hairline; shadows appear only in the light theme (`shadow-card`).
- Text: `ink` for anything someone reads, `ink-secondary` for supporting copy, `ink-muted` for labels, ticks and timestamps (never below 12px), `ink-disabled` only on disabled controls.
- Ambient Yellow is `accent` and it is a fill: the primary button, the live dot, the checked toggle, the alert count. On a dark ground it is also `chart-1` and, as `accent-ink`, the active nav glyph and the link colour. On a light ground it cannot be text or a line (1.3:1 on white), so `accent-ink` darkens to an olive gold there and `chart-1` becomes Deep Navy. Text on a yellow fill is `on-accent`, black, never white.
- `positive` (mint) and `negative` (rose) colour deltas, badges and error borders, always beside an arrow, a sign or a word. Mint sits off the red–green axis so the two are never told apart by hue alone.
- `line-strong` is Steel Gray and marks borders that mean something: inputs, secondary buttons, the off toggle. `line` is the decorative hairline.
- `gold` is the ink of the supplied mark file (#f9bb01) and is used for the logo only. The palette sheet names Ambient Yellow as #ffe600; both are kept exactly and the brand team should choose one.
- Every text token's note names the grounds it holds 4.5:1 on in both themes; meaningful marks (chart series, control borders, focus rings) hold 3:1.

## Typography

One family, Inter, loaded from `fonts/Inter-Variable-Latin.woff2` and `fonts/Inter-Variable-LatinExt.woff2` (weight 100–900). Falls back to SF Pro and the system sans so the platform face fills in.

- Weight carries hierarchy: 600 for anything that is a title or a number, 500 for labels and controls, 400 for prose. Nothing lighter than 400, nothing bolder than 600 in the product.
- `display` (56/60) and `title-1` (34/40) are marketing and page titles; `title-2` sections a page; `title-3` titles a card. Tracking tightens as size grows (−0.005em to −0.02em).
- `body` is 15/22 in the product and `body-large` 17/26 in marketing. `label` 13/18 is the size of nav items, legends and control text; `caption` 12/16 is the floor.
- `overline` is 11px, 600, +0.12em, capitals — the tagline, eyebrows on brand panels, sidebar section names.
- Figures: `stat-large` (44px) for the one hero number per view, `stat` (28px) for tiles and ring centres, `tabular` for columns and ticks with `font-variant-numeric: tabular-nums`. Hero and tile numbers keep proportional figures.
- `code` is the system mono for model names, identifiers and SDK calls.

## Spacing, radius, elevation

- A 4px grid: `space-2` inside chips, `space-4` for button padding and tile gutters, `space-6` for card padding, `space-8` between a card title and its chart, `space-10` and up between page sections. When unsure, take the next step up.
- Corners grow with the box: `radius-sm` 6 for swatches and tooltips, `radius-md` 10 for inputs, nav items and icon buttons, `radius-lg` 16 for every card, `radius-xl` 24 for hero panels and the app icon tile, `radius-full` for buttons, badges, toggles and dots.
- Elevation is tone, not shadow. Dark: no shadows at rest. Light: `shadow-card` on cards. Both: `shadow-float` on menus and tooltips only.
- Keyboard focus is `focus-ring`: a 2px gap in the page colour then a 2px solid ring — accent on dark, Deep Navy on light — as a box-shadow so it follows the corner.
- Motion is brief and easing-out: 120ms for colour, 160ms for the toggle knob, 400ms for a ring filling. Nothing loops except the live dot, and that only when data is streaming.

## Layout

- The product is a `Sidebar` (240px, `surface-sunken`) beside a main column with `space-8` padding. Dashboards lay out on a 16px-gutter grid: a row of `Stat` tiles, then charts in `Card`s at 1.6:1 or 1:1:1.
- Marketing pages are full-bleed navy with one `display` headline, one paragraph of `body-large`, a primary and a secondary button, and the mark used large as imagery.
- Imagery is the mark and its dots: halftone fields of Ambient Yellow on navy, the planet at night, data as points of light. No stock photography, no gradients other than the night-side of the planet, no illustrations of people.

## Controls

- `Button` primary is yellow with black text, one per view; secondary is a hairline pill; ghost is text. Sizes 32, 40, 48.
- `Toggle` is a 46×28 switch; `Select` is the browser's own select in the system chrome; `Badge` is a 24px pill and `live` is the only one with a dot.
- Everything with a hit area is at least 32px tall and shows `focus-ring`.

## Iconography

- One set, drawn here on a 24px grid at 1.5px with round caps and joins, in `currentColor`. The eight icons on the brand sheet — Data, Telemetry, Connect, Cloud, Location, Storage, Security, People — plus a UI set for navigation and actions. No icon fonts, no emoji, no filled variants.
- In the product, icons come from the `Icon` component at 20px beside text and 16px inside small controls. For decks and documents the same drawings are files under `assets/Icons/` (navy ink; recolour in the tool).
- The brand sheet showed the icons as a rendered image; these were redrawn to match it, not copied from a source file. Replace them if the original SVGs turn up.

## Data visualisation

Charts follow one rule set, in the section after this one: zero-based axes, 2px lines, 24px bars with a rounded data end, a legend for two series or more, text never in the series colour, one axis per chart. Series colours are `chart-1`, `chart-2`, `chart-3` in that order; the ring uses `chart-track` for its remainder.

## Using this system

- Load `tokens.css`, then `components/bundle.css`, then React 18 and `components/bundle.js`; the components are on `window.Ambiently`. Put `class="amb-page"` on the body (or the app root) for the page ground, font and text colour.
- Set `data-theme="dark"` or `"light"` on the root. Dark is the default and the brand's own.
- Build pages from the components rather than restyling them: a `Card` with a `title`, a `Stat` for a figure, `LineChart` for time, `BarChart` for categories, `Ring` for a share. Spend goes up — pass `upIsGood: false`.
- The assets under `assets/Logos/` are the real mark; never redraw it. The `Logo` component carries the same dots and may be recoloured only to `accent` or the text colour.
