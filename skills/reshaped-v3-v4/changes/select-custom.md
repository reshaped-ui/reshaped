---
component: Select
description: Removed `Select.Custom` and made custom rendering default, dropped `options` prop
---

## Automated migration

- Replace `Select.Custom` with `Select`.
- If `Select` uses `options` prop, remove it and render `<option>` children instead.
- Leave unchanged when `Select` already uses `<option>` or `<Select.Option>` children.

Before:

```tsx
<Select.Custom name="country" value={value} onChange={(args) => setValue(args.value)}>
	<Button>{value || "Choose country"}</Button>
</Select.Custom>
```

After:

```tsx
<Select name="country" value={value} onChange={(args) => setValue(args.value)}>
	<Button>{value || "Choose country"}</Button>
</Select>
```

Before:

```tsx
<Select options={[{ value: "1", label: "1" }]} />
```

After:

```tsx
<Select>
	<option value="1">1</option>
</Select>
```
