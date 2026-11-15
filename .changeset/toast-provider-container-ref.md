---
"reshaped": minor
---

`ToastProvider`: Added `containerRef` prop to render toast regions into a specific DOM element, and a `global` option in `show` and `hide` to render a toast in the root provider, ignoring any nested providers and their `containerRef`
