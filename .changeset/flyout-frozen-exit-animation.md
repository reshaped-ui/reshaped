---
"reshaped": minor
---

Restored the `Flyout` hide animation by default for `Select`, `DropdownMenu` and `Autocomplete`. Flyout content is now frozen while animating out, so it keeps its last rendered state even when the component updates on close, for example when `Select` changes its selected value. `disableHideAnimation` is still supported to opt out of the animation. Closing animations now also report the trigger as collapsed right away, ignore pointer events on the content that's animating out and no longer leave the content mounted when it's closed right after opening.
