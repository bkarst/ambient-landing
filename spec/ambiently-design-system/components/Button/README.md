# Button

A pill-shaped action; `primary` is Ambient Yellow with black text, and there is one per view.

Provide `variant` (`primary` · `secondary` (default) · `ghost` · `danger`), `size` (`sm` 32px · `md` 40px · `lg` 48px), optional `icon` or `iconAfter` (an `Icon` name), `href` to render a link, `disabled`, and the label as children.

- Labels are sentence case, two or three words, a verb first: "Get started", "Add budget", "Export CSV". No trailing punctuation.
- Primary is for the single most useful next step. Everything beside it is `secondary` (hairline, `line-strong`) or `ghost`.
- `danger` is for destructive actions only, and always behind a confirmation.
- Keyboard focus shows `focus-ring`; never remove it. Hover deepens the fill to `accent-hover`; pressed scales to 98.5%.
- Don't put two primaries in a row, stack buttons when they fit side by side, or shrink a label to fit — shorten the words instead.
