---
"reshaped": patch
"@reshaped/utilities": patch
---

`Flyout` measures its content once when it opens instead of twice, and reuses that measurement while following the trigger on scroll. Positioning used to clone and lay out the whole content on every scroll frame, which made scrolling with an open `Popover`, `DropdownMenu`, `Select` or `Autocomplete` drop frames on mobile devices, especially for long lists. The content is measured again when it gets resized, its children change or the position is updated manually
