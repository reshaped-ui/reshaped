---
"reshaped": patch
---

ContextMenu: Added a `triggerRef` property for using an element rendered outside of the ContextMenu as the trigger. The menu opens on right click on that element and the scroll is locked based on its position in the DOM, instead of the element wrapping the ContextMenu children.
