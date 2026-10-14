# Changes to the ported design-system components

`components/ds/` is a TypeScript port of `spec/ambiently-design-system/components/bundle.js` (a React 18 IIFE on `window.Ambiently`) to ES modules for React 19 Server Components. DOM structure and class names are unchanged, so `bundle.css` styles the port as is; `LOGO_DOTS`, the icon bodies, `compact`, `niceTicks` and `monotonePath` are copied verbatim. Everything below is additive and is logged here for the design-system team to absorb.

## Module shape

- One file per component plus `format.ts`, `geometry.ts`, `useWidth.ts`, `icons.ts`, `logo-dots.ts`; `index.ts` re-exports all of them. No `window.Ambiently`.
- Server Components by default. Only `LineChart`, `BarChart`, `Toggle` and `Sidebar` carry `'use client'`.
- `format` function props are gone. Charts and `Delta` take a serializable `format?: 'currency' | 'compact' | 'tokens' | 'percent'` key (plus `prefix`) so a Server Component can pass it across the client boundary; `resolveFormat` maps the key to a function. `format.compact` itself is unchanged.
- `Button` splits `href` into an `<a>` with anchor attributes; otherwise identical.

## Behavioural additions

- **Charts: pointer events** (`LineChart`, `BarChart`). `onMouseMove`/`onMouseLeave` became pointer events. Mouse and pen hover as before. On touch, a tap pins the tooltip to the nearest index; a tap on the same index, a tap outside the chart, or blur dismisses it. `.amb-chart` gets `touch-action: pan-y` so charts never block vertical page scrolling (`styles/ds-extensions.css`).
- **Charts: keyboard.** The wrapper is `tabIndex={0}`, `role="group"`, `aria-label="{title}. Use left and right arrow keys to read values."`. ArrowLeft/ArrowRight move the crosshair or category, Home/End jump to the ends, Escape clears. Focus shows `focus-ring` on the wrapper at `radius-md`. Tooltips are not live regions; the hidden data table carries the numbers.
- **Charts: `ref` prop** (React 19 ref-as-prop) forwarded to the wrapper `div`, so motion code can scope GSAP to a chart. The components contain no animation code. The `svg` `height` attribute is fixed, so re-measuring width on mount never shifts layout.
- **Charts: forced colours.** Under `@media (forced-colors: active)` series use `CanvasText`/`Highlight` and gridlines `GrayText` (`styles/ds-extensions.css`).
- **`BarChart` hit testing** maps pointer coordinates through the svg's rendered size instead of the wrapper's, so the hovered category is right when a legend sits above the chart. Visually identical.
- **`Card`** takes `titleAs?: 'h2' | 'h3' | 'h4'` (default `'h3'`, as before) and an optional `id`.
- **`Logo`** reads the word from `site.name` and the tagline from `site.taglines.brand` (`config/site.ts`) instead of hard-coding "Ambiently" and "Real-world insights. Quieter."; the mark's `aria-label` does too. `Mark` is exported.
- **`Icon`** gains `pause` (`M8 5.5v13M16 5.5v13`, drawn on the 24-grid at 1.5px with round caps) for the marquee's pause control.
- **`Stat`** declares the `prefix` prop the bundle already read.
- **`Sidebar`** items may carry `href`, which renders the item as an `<a>` instead of a `<button>` (the landing page's product shot is inert).
- **`Delta`** `format` is the serializable key described above rather than a function.

## Not done here

- Playwright screenshot parity against each `preview.html` (spec §13.4) is not set up yet.

- `BarChart` sets `data-horizontal` on its wrapper so motion code can tell ranked charts from columns.
- `Stat.value` also accepts a ReactNode, so a counting node can stand in for the number.
- `DataTable`: the corner header cell is a `td` and the headers carry `scope`, so the hidden table passes axe.
- `Mark` draws the dots with `<use>` of a symbol that `MarkDefs` defines once per document (the root layout renders it). Six inline copies of 325 circles were about 90 KB of HTML.
- `Icon`: `sun` and `moon` glyphs for the appearance toggle, drawn on the 24-grid at 1.5 px with round caps.
