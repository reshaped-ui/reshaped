---
"reshaped": patch
"@reshaped/utilities": patch
---

Page scroll lock on iOS keeps Safari from panning the page for the on-screen keyboard. Safari pans the whole page to reveal a focused field even while the page scroll is locked, which moved the fixed content rendered above it outside of the screen: a `Modal` ending above the keyboard was pushed up by the keyboard height, leaving a gap below it with its top unreachable. While `Overlay`, `Modal` and other components locking the page scroll are open, the pressed fields are focused without letting Safari pan for them, the focused field is revealed inside its own scrollable container instead, and a page panned anyway is put back
