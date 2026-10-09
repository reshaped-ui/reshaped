---
"reshaped": patch
---

Fixed `useHotkeys` reacting to keys that belong to an IME composition. With a Japanese, Chinese or Korean input method, the Enter that confirms a conversion no longer triggers hotkeys, so `Autocomplete` no longer selects the highlighted option or calls `onEnter` with unfinished text.
