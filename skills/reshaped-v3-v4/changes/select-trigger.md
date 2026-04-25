---
component: Select
description: Automatic trigger rendering from Select was removed
---

## Automated migration

- Leave unchanged when `Select` uses `options` prop, `<option>` children, or `<Select.Option>` children.
- When `Select` has only custom children (no options/Option), replace with `SelectTrigger`.
- Replace `inputAttributes` prop with `triggerAttributes`.

Before:

```tsx
<Select inputAttributes={{ className: "custom-class" }}>
	<View>Select an option</View>
</Select>
```

After:

```tsx
<SelectTrigger triggerAttributes={{ className: "custom-class" }}>
	<View>Select an option</View>
</SelectTrigger>
```
