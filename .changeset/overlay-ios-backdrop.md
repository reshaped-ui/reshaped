---
"reshaped": patch
---

`Overlay` backdrop is now rendered outside of the fixed overlay container and uses absolute positioning on iOS, following the Base UI approach. iOS Safari fills its toolbar area with the color of the fixed elements attached to the screen edges, which painted the overlay as a solid dark bar behind the toolbar. Safari now renders the dimmed page under its toolbar for overlays and centered modals. Side modals keep Safari's default solid toolbar color since their shadow is close to the screen edge
