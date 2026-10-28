---
"reshaped": minor
---

ContextMenu: `onOpen` now receives the native `contextmenu` event and the element that was right clicked as `{ event, target }`. A single `ContextMenu` rendered over many items, for example with `triggerRef` pointing at a table, can now find the item that opened it with `target.closest()` without adding its own `contextmenu` listener.
