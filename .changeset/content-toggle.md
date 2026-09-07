---
"reshaped": minor
---

Added the `ContentToggle` component for swapping between any content with an animated transition. It takes an `id` property identifying the currently rendered content and a `direction` property (`start` or `end`) controlling which way the content moves: whenever the `id` changes, the previous content cross-fades out towards that side while the new one comes in from the opposite one, and both are rendered in the same grid cell so the surrounding layout doesn't shift.
