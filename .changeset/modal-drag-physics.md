---
"reshaped": minor
---

Improved the `Modal` swipe gesture physics. On release, the closing or returning animation now continues from the current velocity of the gesture using a critically damped spring, so a quick flick closes the modal right away while a slow release settles smoothly, instead of restarting a fixed-duration transition from zero. Dragging the modal past its open position now applies a rubber band effect instead of being ignored, as long as the content under the finger can't scroll in that direction. Returning to the open position is animated as well, where previously it snapped back.
