---
"reshaped": major
---

Toast: Removed provider-level `toastOptions` and moved width control to per-toast `show()` calls.
Added `width` support to toast options with `short` and `long` presets (as well as custom CSS width values), where collapsed stacks use the latest toast width and expanded stacks restore each toast's original width.
Updated toast API by replacing `size` with `orientation` and removing `inverted` color.
