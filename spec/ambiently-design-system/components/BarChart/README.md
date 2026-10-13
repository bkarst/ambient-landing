# BarChart

Magnitude by category: columns up to 24px thick with a rounded data end and a square baseline, grouped, stacked, or ranked horizontally.

Provide `series` and `labels` as for `LineChart`, `stacked` to stack rather than group, `horizontal` for a ranked list (rows read top to bottom, biggest first — sort the data yourself), `valueLabels` to print the value at each bar's end (horizontal, or a single vertical series), `labelWidth` for the category column, `thickness` (max 24), `height`, `prefix` or `format`, `title`.

- A 2px gap in the surface colour separates touching bars and stacked segments; no strokes.
- Hovering a category dims the others and shows a tooltip with every series (and the total when stacked).
- Group when the series are compared within a category; stack when the total matters; rank horizontally when the categories have names longer than a week number.
- Don't label every column of a grouped chart — the tooltip and the hidden table carry those numbers.
