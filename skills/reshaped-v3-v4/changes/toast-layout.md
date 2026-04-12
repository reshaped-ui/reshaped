---
component: Toast
description: Replaced `size` prop with `orientation`
---

## Automated migration

- Remove `size: "medium"` (it's the default).
- Replace `size: "large"` with `orientation: "vertical"`.

Before: `toast.show({ size: "medium", title: "Hey!", text: "Event completed" })`
After: `toast.show({ title: "Hey!", text: "Event completed" })`

Before: `toast.show({ size: "large", title: "Hey!", text: "Event completed" })`
After: `toast.show({ orientation: "vertical", title: "Hey!", text: "Event completed" })`

## Manual migration

`size: "small"` has no direct replacement. Remove `size` and `title`, pass title as bold text inside `text`.

Before: `toast.show({ size: "small", title: "Hey!", text: "Event completed" })`
After: `toast.show({ text: <><Text weight="semibold">Hey!</Text>&nbsp;Event completed</> })`
