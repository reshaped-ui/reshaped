---
"reshaped": patch
---

Flyout: Fixed the content role for hover flyouts. Content is only rendered as a `tooltip` when it doesn't trap focus, so `DropdownMenu` submenus now use the `menu` role and hover `Popover` content is no longer announced as a tooltip. Hover flyouts, like `Tooltip`, no longer trap focus by default. Pressing Escape now only closes the latest opened flyout instead of all open hover and focus flyouts. `Popover.Dismissible` now passes the `close-button` reason to `onClose`. Autocomplete: the input is no longer described by the whole list of options, and the highlighted option is scrolled into view when navigating with the keyboard. MenuItem: menu items inside `DropdownMenu` and `Select` no longer show the hover highlight in keyboard navigation mode, so only the focused item is highlighted. `useIsDismissible` now accepts a `strict` option to only allow dismissing the latest opened element.
