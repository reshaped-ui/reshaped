---
"reshaped": patch
---

`Carousel` doesn't render itself and all of its items on every frame while it's scrolling. Its navigation controls only depend on the scroll reaching the start or the end, so the component renders when that changes. Resolving the first visible item, which reads the layout of the items, is skipped when `onChange` is not passed
