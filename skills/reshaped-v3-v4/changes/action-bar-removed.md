---
component: ActionBar
description: Removed component from the library
---

## Manual migration

Replace with `View`. Replacement styling depends on context.

Before:

```tsx
<ActionBar>Content</ActionBar>
```

After:

```tsx
<View borderColor="neutral-faded" borderTop padding={4} paddingBlock={3}>
	Content
</View>
```

Before:

```tsx
<ActionBar position="top">Content</ActionBar>
```

After:

```tsx
<View borderColor="neutral-faded" borderBottom padding={4} paddingBlock={3}>
	Content
</View>
```
