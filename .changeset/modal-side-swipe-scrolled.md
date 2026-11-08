---
"reshaped": patch
---

`Modal` with `start` and `end` positions now supports swipe-to-close when its content is scrolled vertically, and horizontally scrollable areas inside it take priority over the swipe only while they can still scroll in the swipe direction. The gesture direction is resolved after the first few pixels, so vertical scrolling never moves the modal and swiping never scrolls the content, for all positions
