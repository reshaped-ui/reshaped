---
"reshaped": minor
---

`Modal` with `start` and `end` positions now floats with an offset from the screen edges and rounds all its corners. The offset grows to the browser safe area insets when they're larger, and more space is left for the overlay on the side far from the screen edge. All modals except `full-screen` now render a neutral faded border, `bottom` only renders it on the top side
