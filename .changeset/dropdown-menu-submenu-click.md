---
"reshaped": minor
---

`DropdownMenu` and `ContextMenu` support `submenuTriggerType="click"` to open their submenus on click instead of hover, inherited by nested submenus. `DropdownMenu.SubMenu` supports `triggerType` to override it for a single submenu. Click submenus stay open when the mouse leaves them and close when another item of the same menu is pressed, including another submenu trigger. `DropdownMenu.Content` no longer stops click event propagation, so clicks inside the menu reach the document click listeners
