---
component: Divider
description: Renamed `offset` to `inset`, replaced string px values with unit tokens
---

## Automated migration

Replace `offset` with `inset`. Convert px values to unit tokens (divide by 4).

Before: `<Divider offset="4px" />`
After: `<Divider inset={1} />`

Before: `<Divider offset="1px" />`
After: `<Divider inset={0.25} />`
