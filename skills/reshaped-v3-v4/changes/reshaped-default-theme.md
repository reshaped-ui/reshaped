---
component: Reshaped
description: Updated default theme to `slate`
---

## Automated migration

- Skip if `defaultTheme` or `theme` prop is passed to `Reshaped`.
- Otherwise, update the global theme CSS import from `reshaped/themes/reshaped/theme.css` to `reshaped/themes/slate/theme.css`.
