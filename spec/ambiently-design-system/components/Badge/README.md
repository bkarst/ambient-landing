# Badge

One or two words of status, in a pill.

Provide `tone` (`neutral` (default) · `accent` · `positive` · `negative` · `outline` · `live`), an optional `icon`, and the text as children.

- `live` adds the yellow dot and means a value is streaming right now; `positive` and `negative` always sit beside an icon or a word that says what happened ("Under budget", "Over budget") — never colour alone.
- `accent` is for "New" and nothing else for long: it competes with the primary button.
- `outline` is for identifiers (regions, environments, model names).
- Don't use a badge as a button, or put more than three in a row.
