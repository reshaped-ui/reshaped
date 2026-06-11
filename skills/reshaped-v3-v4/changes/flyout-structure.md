---
component: Flyout
description: Moved content padding from `contentClassName` to `scrollableClassName`
---

## Automated migration

Before:

```tsx
<Flyout contentClassName="p-4">...</Flyout>
```

After:

```tsx
<Flyout scrollableClassName="p-4">...</Flyout>
```
