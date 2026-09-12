---
"reshaped": patch
---

Improved the `Modal` swipe-to-close performance on mobile. The drag offset custom property is now registered as non-inherited, so updating it on every frame of the gesture only recalculates the style of the modal root instead of every element of the modal content.
