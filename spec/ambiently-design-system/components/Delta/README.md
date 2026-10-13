# Delta

A signed change with an arrow, coloured by whether the direction is good.

Provide `value` (a number; percent by default), `upIsGood` (default true — pass false for spend, latency, errors), optional `period` ("vs last week"), `suffix` ("" to drop the %) and `format` (a function, for currency).

- Positive is mint, negative is rose; the arrow and sign carry the meaning for anyone who can't see the colour. Zero is neutral with no arrow.
- Always say what the comparison is: a delta without a period is a rumour.
- Set it in `caption` size beside a `Stat` value; never scale it up.
