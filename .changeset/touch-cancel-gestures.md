---
"reshaped": patch
---

`Slider` and `Resizable` handle the touches taken over by the system, for example by an incoming call or a system swipe on iOS. Those touches end with `touchcancel` instead of `touchend`, which kept the slider thumb and the resizable handle in their dragging state
