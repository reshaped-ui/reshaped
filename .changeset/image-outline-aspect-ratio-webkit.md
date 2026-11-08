---
"reshaped": patch
---

Fixed `Image` with `outline` and `aspectRatio` growing to the image's natural height in Safari, which made an `Avatar` with a large `src` render as a tall pill inside a centered `Modal`. The outline wrapper now lays out the image as a flex item instead of relying on `height: 100%`, which WebKit doesn't resolve against an `aspect-ratio` height. Root `attributes` and sizing styles are also no longer duplicated on the image element inside the outline wrapper, so `id`, `ref` and event handlers passed in `attributes` only apply to the root element.
