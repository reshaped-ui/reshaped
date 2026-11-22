---
"reshaped": patch
"@reshaped/utilities": patch
---

`Modal` with `bottom`, `start`, `end` and `full-screen` positions stays inside the visible area when the browser pans it down the layout to reveal a focused field, like iOS Safari does when the on-screen keyboard opens. Panned modals used to move up with the page, ending above the keyboard by the panned distance with their top outside of the screen. `useVirtualKeyboard` returns the panned distance as `offset`
