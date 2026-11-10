---
"reshaped": patch
---

`Overlay` backdrop is now rendered outside of the fixed overlay container and uses absolute positioning on iOS, following the Base UI approach. iOS Safari fills its toolbar area with the color of the fixed elements attached to the screen edges, which made the area behind the toolbar black for side modals. The toolbar area now shows the dimmed page the same way as the rest of the overlay. `Modal` with `start` and `end` positions doesn't render its shadow on iOS since it was picked up by Safari as the toolbar color
