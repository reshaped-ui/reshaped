---
component: Toast
description: Removed provider-level `toastOptions`, moved width control to per-toast `.show()` calls
---

## Automated migration

- Remove `toastOptions` prop from the `Reshaped` component.

## Manual migration

If `toastOptions` included width settings, update each `.show()` call to include `width` (`"short"`, `"long"`, or a custom CSS value).
