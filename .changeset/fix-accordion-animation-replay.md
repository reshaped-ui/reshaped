---
"reshaped": patch
---

Accordion: Fixed the expand animation replaying when React re-attaches the effects of a mounted accordion without changing its state, for example when it's moved between its siblings or hidden and shown by a Suspense boundary. Toggling the accordion while it's still animating now continues from the current height instead of jumping, and transitions bubbling up from the content no longer end the animation early.
