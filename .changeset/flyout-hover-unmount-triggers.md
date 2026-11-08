---
"reshaped": patch
---

Fixed other `Flyout` triggers staying unclickable after a hover flyout, for example a `Tooltip`, was unmounted while open. Opening a hover flyout disables pointer events on the other open triggers while the mouse moves to its content, and they were only restored when the flyout closed through its own close handler. They are now also restored when the flyout unmounts while open or gets hidden with the `active` or `disabled` props, so a `Popover` or `DropdownMenu` trigger no longer stops responding after clicking a button with a tooltip that removes itself.
