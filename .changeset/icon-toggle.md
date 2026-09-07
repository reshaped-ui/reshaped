---
"reshaped": minor
---

Added the `IconToggle` component for swapping between icons with an animated transition. It takes the same properties as `Icon`, with an extra `id` property identifying the currently rendered icon: whenever it changes, the previous icon animates out while the new one animates in, and both are rendered in the same grid cell so the surrounding layout doesn't shift.
