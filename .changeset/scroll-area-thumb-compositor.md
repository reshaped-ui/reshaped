---
"reshaped": patch
---

Improved the `ScrollArea` scrolling performance. The custom scrollbar thumb now follows the scroll position with a `transform` instead of `inset`, so the scroll-linked updates run on the compositor thread without triggering layout and paint, and the scroll position is written directly to a css variable instead of re-rendering the component on every scroll event. This also fixes the horizontal thumb moving outside of the scrollbar track when scrolling in RTL.
