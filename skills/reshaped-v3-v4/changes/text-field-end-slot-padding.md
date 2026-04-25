---
component: TextField
description: Updated default `endSlotPadding` to 2
---

## Automated migration

- Skip if `endSlot` is not used.
- Skip if `endSlotPadding` is already set.
- If `endSlot` is used without `endSlotPadding`, add `endSlotPadding={1}` to preserve previous behavior.

Before: `<TextField endSlot={<Button />} />`
After: `<TextField endSlot={<Button />} endSlotPadding={1} />`
