---
"reshaped": minor
---

Improved the `Modal` swipe gesture physics. On release, the closing or returning animation now continues from the current velocity of the gesture using a critically damped spring, so a quick flick closes the modal right away while a slow release settles smoothly, instead of restarting a fixed-duration transition from zero. Returning to the open position is animated as well, where previously it snapped back, and starting a new swipe while the modal is still animating picks it up from its current position instead of snapping to the position the animation was heading to.
