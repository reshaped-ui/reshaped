---
"reshaped": patch
---

`Modal` with `start` and `end` positions now supports swipe-to-close when its content is scrolled vertically. The gesture direction is resolved after the first few pixels, so vertical scrolling never moves the modal and swiping never scrolls the content, for all positions
