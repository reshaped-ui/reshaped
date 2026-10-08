---
"reshaped": minor
---

Restored the `Flyout` hide animation by default for `Select`, `DropdownMenu` and `Autocomplete`. Flyout content is now frozen while animating out, so it keeps its last rendered state even when the component updates on close, for example when `Select` changes its selected value. `disableHideAnimation` is still supported to opt out of the animation. Content that's animating out no longer reacts to pointer events, content closed right after opening no longer stays mounted, and focus now returns to the trigger when the content is closed without an animation, for example with reduced motion enabled.
