---
"reshaped": patch
---

`Modal` swipe gesture, `Slider` and `Resizable` handle the touches taken over by the system, for example by an incoming call or a system swipe on iOS. Those touches end with `touchcancel` instead of `touchend`, which left the modal stuck where the gesture has stopped and kept the slider thumb and the resizable handle in their dragging state. `Modal` now returns to its open position and the other gestures stop dragging
