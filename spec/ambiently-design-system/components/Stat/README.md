# Stat

A labelled figure with its change and a sparkline, for the row of tiles at the top of a dashboard.

Provide `label` (sentence case, no colon), `value` (a number is compacted — 12,428 / 1.3M / $128K — or pass a string), `prefix` ("$"), `unit` (shown small after the value), `delta` + `upIsGood` + `period` (see `Delta`), `caption` for a note instead of a delta, `trend` (an array of up to 12 numbers for the sparkline), and `hero` for the one 44px figure a view leads with.

- Exactly one `hero` per page. The rest are 28px.
- Big figures use proportional numerals; tables use `tabular`.
- Wrap each in a `Card compact`. Four across at 1280px, two on narrower screens.
- The sparkline is the first series colour with a 10% wash; it has no axis and shows shape only.
