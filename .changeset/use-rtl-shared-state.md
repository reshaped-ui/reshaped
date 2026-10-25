---
"reshaped": patch
---

Fixed `useRTL` creating its own RTL state for every component that calls it. `useRTL` now reads the state of the `Reshaped` provider, so only the provider observes and updates the `dir` attribute on the root element. Pages that render many `DropdownMenu`, `Tabs`, `Carousel` or `Slider` components no longer pay for it on every instance, and `setRTL` changes the direction for the whole app.
