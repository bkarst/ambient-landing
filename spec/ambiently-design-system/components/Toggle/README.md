# Toggle

An on/off switch: the track is `accent` when on and `line-strong` when off, with a white knob that slides.

Provide `label` (rendered beside the switch and used as its name; without one, pass `aria-label`), `checked` + `onChange` for a controlled switch or `defaultChecked` for an uncontrolled one, and `disabled`.

- Use a toggle for a setting that takes effect immediately. A choice that needs a Save button is a checkbox.
- The label states the on state ("Live updates", "Budget alerts"), never a question.
- State is read from the knob's position and the track colour, so it stays legible without the knob contrasting against yellow.
