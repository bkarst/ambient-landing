# IconButton

A round button holding one icon, for actions that have a universally understood glyph.

Provide `icon` (an `Icon` name), `label` (required: the accessible name, also the tooltip), `variant` and `size` as for `Button`, and any button attributes.

- Use it for play, search, close, more, filter, download. Anything less obvious gets a `Button` with a label.
- The icon is `icon-md` at `md` and `lg`, `icon-sm` at `sm`.
- Don't use a primary icon button for the page's main action; a labelled primary `Button` is clearer.
