---
component: Tabs
description: Removed automatic `defaultValue` detection
---

## Automated migration

- Skip if `Tabs` is controlled with `value` prop.
- Skip if `Tabs` already has `defaultValue`.
- If neither is present, add `defaultValue` with the value of the first `Tabs.Item`.

Before:

```tsx
<Tabs>
	<Tabs.Item value="overview">Overview</Tabs.Item>
	<Tabs.Item value="activity">Activity</Tabs.Item>
</Tabs>
```

After:

```tsx
<Tabs defaultValue="overview">
	<Tabs.Item value="overview">Overview</Tabs.Item>
	<Tabs.Item value="activity">Activity</Tabs.Item>
</Tabs>
```
