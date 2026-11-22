---
"reshaped": patch
---

`Modal` dragged past its open position resists the swipe gesture more, moving only slightly with the finger like before. The overshoot is damped with a square root curve again instead of scaling with the modal size, which let large modals travel too far
