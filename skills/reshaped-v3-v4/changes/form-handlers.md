---
component: Autocomplete, Checkbox, HiddenInput, Radio, Select, Switch, TextArea, TextField
description: Dropped `onFocus` and `onBlur` in favor of `inputAttributes`
---

## Automated migration

Move `onFocus` to `inputAttributes.onFocus` and `onBlur` to `inputAttributes.onBlur`.

Before:

```tsx
<Autocomplete onFocus={() => console.log("focused")} onBlur={() => console.log("blurred")} />
```

After:

```tsx
<Autocomplete
	inputAttributes={{ onFocus: () => console.log("focused"), onBlur: () => console.log("blurred") }}
/>
```
