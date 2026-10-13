# Data visualisation

Charts are the product. These rules make every one read as the same instrument.

## Choosing the form

- A single number is a `Stat`, not a chart; the number a view leads with is `hero`.
- Change over time is a `LineChart`. Magnitude by category is a `BarChart` — grouped to compare series within a category, stacked when the total matters, horizontal to rank named things.
- A share of a whole is a `Ring`. Never a pie, never a donut with more than one segment.
- Two measures on different scales are two charts, side by side, never two y axes.
- More than three series is small multiples: one small chart per series, same axes.

## Colour

- Series take `chart-1`, `chart-2`, `chart-3` in order, by entity, never by rank: filtering out a series doesn't repaint the survivors.
- `chart-1` is the story. On navy it is Ambient Yellow; on white it is Deep Navy, because yellow can't carry a 2px line on a light ground. The second series is steel, the third white (dark) or dark gold (light). Beyond the first series the palette is deliberately neutral — yellow is the one brand hue — so a legend is always present when there are two series or more.
- `positive` and `negative` are reserved for state (a delta, a threshold crossed). They are never a fourth series.
- Text — values, ticks, legends, end labels — is always `ink` or `ink-muted`, never the series colour.

## Marks

- Lines are 2px with round joins, monotone-smoothed so they never overshoot a point. The first series gets a 10% wash underneath; end dots are 8px with a 2px surface ring.
- Bars are at most 24px thick with a 4px rounded data end and a square baseline. Touching bars and stacked segments are separated by a 2px gap in the surface colour, never a stroke.
- Gridlines are `chart-grid` (the hairline), solid, recessive; the baseline is `line-strong` at 60%.
- The y axis starts at zero and ends at the next clean step; ticks compact from 10,000 up (10K, 1M). X labels thin themselves so none collide.

## Labels and interaction

- Label selectively: the line ends, the bar tips of a ranked list, the extreme. Never a number on every point of a grouped chart.
- Every chart has a hover layer: a crosshair with a tooltip listing all series on a line chart; a per-category tooltip that dims the other categories on a bar chart.
- Every chart has a time-range `Select` in its card header and a visually hidden data table for assistive tech.
- Give a chart a `Card` with a `title` and a `subtitle` naming the range and unit. The chart itself fills the card's width.
