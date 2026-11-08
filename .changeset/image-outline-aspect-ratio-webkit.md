---
"reshaped": patch
---

Fixed `Image` with `outline` and `aspectRatio` or `height` growing to the image's natural height in Safari, which made an `Avatar` with a large `src` render as a tall pill inside a centered `Modal`. The image is now positioned absolutely inside the outline wrapper when the wrapper gets its size from `aspectRatio` or `height`, so only the wrapper sizes the box.
