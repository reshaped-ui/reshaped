---
"reshaped": patch
"@reshaped/utilities": patch
---

Page scroll lock on iOS and `Modal` leave revealing the focused field above the on-screen keyboard to the browser. Scroll lock no longer takes over focusing the pressed fields or puts back the page Safari panned for the keyboard, and `Modal` no longer ends above the keyboard. Both raced Safari's own panning, which moved the modal content around while focusing fields. `useVirtualKeyboard` stays available for positioning custom content above the keyboard
