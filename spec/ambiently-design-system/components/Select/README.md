# Select

A native select dressed in the system chrome, used for time ranges and group-by controls above charts.

Provide `options` (strings, or `{ value, label }`), `label` (the accessible name), `size` (`md` 40px · `sm` 32px for card headers), and any select attributes (`value`, `defaultValue`, `onChange`).

- Time-range options read "Last 24 hours", "Last 7 days", "Last 30 days", "This quarter" — capitalised like a sentence, never abbreviated.
- Every chart with a time axis has one, in its card's action slot at size `sm`.
- It is the browser's own menu, so it works everywhere; don't rebuild the dropdown for looks.
