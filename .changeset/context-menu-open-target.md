---
"reshaped": minor
---

ContextMenu: `onOpen` now receives the native `contextmenu` event that opened the menu as `{ event }`. A single `ContextMenu` rendered over many items, for example with `triggerRef` pointing at a table, can now find the item that was right clicked with `event.target` without adding its own `contextmenu` listener.
