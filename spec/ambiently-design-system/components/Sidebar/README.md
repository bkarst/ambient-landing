# Sidebar

The product's left navigation: the lockup on top, 40px items with an icon each, the active glyph in the accent.

Provide `items` (`[{ id, label, icon, badge }]`, with `{ section: 'Workspace' }` entries for group headings), `active` + `onSelect` for a controlled nav (or let it manage itself), `brand` to replace the default lockup, `footer` for the bottom slot (the live badge), and `label` for the nav's accessible name.

- It is 240px wide on `surface-sunken` with a `line` to its right. Below 1024px it collapses to icons; above 1600px it does not grow.
- One item is active; it gets `surface-hover` and the accent icon. Hover only lifts the text to `ink`.
- Labels are single nouns: Overview, Spend, Models, Sensors, Data, Locations, Alerts. A badge is a count, never a word.
- The footer is for status, not actions.
