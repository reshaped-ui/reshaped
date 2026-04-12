---
component: Button
description: Removed `faded` variant
---

## Manual migration

No safe automated path. Replacement depends on visual intent:
- `variant="outline"` with the same `color` for a bordered style
- `variant="ghost"` with the same `color` for a minimal style
- `color="neutral"` for a neutral appearance

Before: `<Button variant="faded">Action</Button>`
After: `<Button variant="outline">Action</Button>` or `<Button variant="ghost">Action</Button>`
