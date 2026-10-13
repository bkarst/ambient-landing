# Ambiently design system — files

Open `demo.html` in a browser to see the dashboard showcase (there is a theme toggle bottom-right).

- `README.md` — the brand book; `charts.md` — the data-visualisation rules.
- `tokens.json` — every colour, type style, spacing, radius, shadow and size token; `tokens.css` — the same compiled to CSS custom properties (`--accent`, `--surface`, `.title-2`, `@font-face` for Inter). Themes switch with `data-theme="dark"` / `"light"` on `<html>`.
- `components/bundle.css` + `components/bundle.js` — the components, on `window.Ambiently` (needs React 18; copies are in `components/lib/`). `components/index.d.ts` documents the props; each `components/<Name>/README.md` holds the guidelines and `preview.html` a working example.
- `assets/Logos/` — the mark as supplied (PNG) and traced (SVG). `assets/Icons/` — the icon set as SVG files.
- `fonts/` — Inter (variable, SIL Open Font License).

To use on a page, in this order:

```html
<link rel="stylesheet" href="tokens.css">
<link rel="stylesheet" href="components/bundle.css">
<script src="components/lib/react.production.min.js"></script>
<script src="components/lib/react-dom.production.min.js"></script>
<script src="components/bundle.js"></script>
```

Then `const { Card, LineChart } = window.Ambiently;` and put `class="amb-page"` on the body.
