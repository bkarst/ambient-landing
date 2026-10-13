# LineChart

Change over time: smooth 2px lines, a wash under the first series, end labels, and a crosshair tooltip.

Provide `series` (`[{ name, values }]`, up to three), `labels` (one per point, strings), `height` (220 by default), `prefix` or `format` for values, `title` (the accessible name; the `Card` shows the visible one), `valueLabel` for the tooltip of a single series, `area: false` to drop the wash, `endLabels: false` to drop the final values, `ticks` for the number of y gridlines.

- The y axis starts at zero and ends at the next clean step above the maximum; x labels thin themselves to fit.
- Series order is meaning: the first is the story (`chart-1`), the second a comparison (`chart-2`), the third a last resort (`chart-3`). Past three, make small multiples.
- Two series or more draw a legend; one series doesn't — the card title names it.
- Text never takes the series colour; values and labels are ink. A visually hidden table carries the data for screen readers.
- Never two y axes. Different scales get two charts.
- The chart fills its container's width; give it a card, not a width.
