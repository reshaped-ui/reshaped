---
"@reshaped/utilities": patch
---

`lockScroll` on iOS now locks the document scroll with `overflow: hidden` on the element that scrolls the page, instead of moving `body` to a fixed position. Fixing the body collapsed the document height, which made Safari lose its translucent toolbars while a `Modal` or other overlay was open, and the scroll position no longer has to be restored when unlocking
. Unlocking the scroll on other platforms now also restores the original inline `padding-right` and `scrollbar-gutter` of the scroll container instead of clearing them
