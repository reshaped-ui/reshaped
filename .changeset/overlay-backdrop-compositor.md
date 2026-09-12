---
"reshaped": patch
---

Improved the `Overlay` animation performance by rendering its backdrop as a separate layer with a static color and transitioning only its `opacity`. Previously the full-viewport root transitioned `background-color` on open and close and during the `Modal` drag-to-close gesture, which forced the browser to repaint the whole viewport on every frame on the main thread. The transition now runs entirely on the compositor thread while keeping the same visual result.
