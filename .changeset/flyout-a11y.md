---
"reshaped": patch
---

Flyout: Fixed the content role for hover flyouts with an explicit `trapFocusMode`, so `DropdownMenu` submenus now use the `menu` role and hover `Popover` content is no longer announced as a tooltip. Pressing Escape now closes nested hover and focus flyouts one by one, starting from the latest opened one, instead of closing all of them at once. `Popover.Dismissible` now passes the `close-button` reason to `onClose`. Autocomplete: the highlighted option is scrolled into view when navigating with the keyboard. MenuItem: hovering a menu item removes the highlight from the focused one, so only one item is highlighted at a time.
