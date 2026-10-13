# Ring

A proportion of a whole, drawn as an arc on a sunken track with the figure in the centre.

Provide `value` (0–100), `text` (what to print — defaults to the value with a %), `label` (under the ring), `size` (96 by default; 56 for inline use), `tone` (`positive` or `negative` to recolour the arc; default is `chart-1`), `stroke` to override the arc width.

- Use it for uptime, budget used, cache hit rate: one number that is a share of something. Not for a count.
- The figure scales with the ring so "99.99%" fits at 96px; keep the text to six characters.
- Recolour only when the share has crossed a threshold the user cares about (over forecast); otherwise it stays in the brand colour.
