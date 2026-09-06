---
"@reshaped/utilities": patch
---

Focus utilities: Moving the focus with `focusElement` and the `focusFirstElement`, `focusLastElement`, `focusNextElement` and `focusPreviousElement` helpers now only scrolls the element into view while the keyboard mode is active, matching how TrapFocus returns the focus to the trigger on release. Closing a nested menu with the mouse leaves the focus outside the parent trapped region, and restoring it used to scroll the scrollable parents to the top
