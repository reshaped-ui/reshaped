---
"reshaped": patch
---

`Overlay` backdrop is now rendered outside of the fixed overlay container and uses absolute positioning on iOS, following the Base UI approach. iOS Safari fills its toolbar area with the color of the fixed elements attached to the screen edges, which painted the overlay as a solid dark bar behind the toolbar. Safari now renders the dimmed page under its toolbar for overlays, centered and side modals. `Modal` with `start` and `end` positions doesn't render its shadow on iOS since it was picked up by Safari as the toolbar color, and `full-screen` modal background is extended past the screen edges to avoid the overlay showing between the modal and the toolbars
