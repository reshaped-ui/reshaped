---
"reshaped": patch
---

Fixed `useRTL` creating its own RTL state for every component that calls it. It now reads the `Reshaped` provider state, so only the provider observes and updates the `dir` attribute and `setRTL` changes the direction for the whole app.
