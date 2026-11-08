---
"reshaped": minor
---

`Tooltip` no longer opens when its trigger is tapped on touch devices. Tapping usually runs the trigger action, so the tooltip stayed open behind it, for example behind the overlay of a `Modal` opened by the trigger. Tooltips still open on hover and keyboard focus, and you can show them on touch by controlling them with the `active` prop. Added a `disableTouchTrigger` prop to `Flyout` to ignore touch interactions with hover triggers.
