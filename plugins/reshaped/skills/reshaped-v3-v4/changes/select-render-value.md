---
component: Select
description: `renderValue` prop is now required for multiselect mode
---

## Automated migration

- Skip if `multiple` is not used or is set to `false`.
- If `multiple` is `true` and `renderValue` is not provided, add a default.

Before: `<Select multiple />`
After: `<Select multiple renderValue={(args) => args.value.join(", ")} />`
