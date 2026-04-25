---
component: Toast
description: Removed `inverted` color
---

## Automated migration

- Skip if `color` is not passed to `.show()` — it picks `neutral` automatically.
- Replace `color: "inverted"` with `color: "neutral"`.
