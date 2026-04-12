---
component: View
description: `aspectRatio` no longer overrides children dimensions
---

## Manual migration

No safe automated path. Review all `View` components using `aspectRatio`:
- Check if direct children need `width: 100%` and `height: 100%`.
- For direct image children, check if `object-fit: cover` is needed.
