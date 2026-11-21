---
"reshaped": patch
---

`Modal` doesn't keep the bottom safe area inset while the on-screen keyboard covers it. iOS keeps reporting the home indicator inset with the keyboard open, which left a gap between the keyboard and the modals with `start` and `end` positions, and an extra bottom padding in the modals with `bottom` position
