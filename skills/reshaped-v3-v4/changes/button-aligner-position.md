---
component: Button
description: Removed deprecated `position` property in Button.Aligner
---

## Automated migration

Before:

```tsx
<Button.Aligner position="top">
	<Button icon={IconZap} variant="ghost" />
</Button.Aligner>
```

After:

```tsx
<Button.Aligner side="top">
	<Button icon={IconZap} variant="ghost" />
</Button.Aligner>
```
