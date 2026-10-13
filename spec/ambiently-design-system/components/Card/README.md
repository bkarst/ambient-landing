# Card

The raised surface everything on a page sits in: `surface-raised`, a `line` hairline, 16px corners, a soft shadow in the light theme only.

Provide `title`, optional `subtitle`, an `action` node for the top-right (a `Select`, a `Badge`, an `IconButton`), `compact` for 20px padding, and the content as children.

- Titles are sentence case nouns: "Daily spend", "Top models by spend". The subtitle names the range or the unit.
- Padding is `space-6` (24px); `compact` is for stat tiles and anything under 200px wide.
- Cards don't nest, and they don't carry a coloured left border or a header bar — tone and the hairline are the whole structure.
- The dashboard grid gutter is `space-4` (16px); page padding is `space-8`.
