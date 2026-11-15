---
component: Hotkey
description: Removed component from the library
---

## Automated migration

Replace `Hotkey` with `Badge`. Replace `active` prop with `highlighted`.

Before: `<Hotkey>Cmd+K</Hotkey>`
After: `<Badge>Cmd+K</Badge>`

Before: `<Hotkey active>Cmd+K</Hotkey>`
After: `<Badge highlighted>Cmd+K</Badge>`
