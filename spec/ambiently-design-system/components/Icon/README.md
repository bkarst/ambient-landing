# Icon

A 24-grid line icon at 1.5px, round caps and joins, in the current text colour.

Provide `name` (one of `Icon.names`: the eight brand icons `data`, `telemetry`, `connect`, `cloud`, `location`, `storage`, `security`, `people`, and the UI set), `size` (16, 20 or 24; 16 thickens to 1.75) and `label` only when the icon stands alone and carries meaning — otherwise it is hidden from assistive tech.

- Icons sit beside text at `icon-md` (20px) in buttons and nav items, at `icon-sm` (16px) inside badges and small buttons, at `icon-lg` (24px) only when standalone.
- Colour comes from `color` on the parent: `ink-muted` at rest, `ink` on hover, `accent-ink` for the one active item.
- Don't fill an icon, add a background disc, or mix in another icon set; a missing glyph is drawn on the same grid, not imported.
- The same drawings are published as files under `assets/Icons/` for decks and documents.
