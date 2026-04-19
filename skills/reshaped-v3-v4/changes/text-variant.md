---
component: Text
description: Updated variant names to match new typography tokens
---

## Automated migration

- Rename variant values:
  - `title-1` -> `headline-1`
  - `title-2` -> `headline-2`
  - `title-3` -> `headline-3`
  - `title-4` -> `title-1`
  - `title-5` -> `title-2`
  - `title-6` -> `title-3`
  - `featured-1` -> `title-4`
  - `featured-2` -> `title-5`
  - `featured-3` -> `title-6`
  - `body-1` -> `title-6`
  - `body-2` -> `body-1`
  - `body-3` -> `body-2`

- Variant property might also be responsive, with an object of values which have to be migrated as well. 
  Syntax example: `<Text variant={{ s: "body-3", m: "title-4" }} />`

- `title-4`, `title-5`, `title-6` map to `title-1`, `title-2`, `title-3` respectively, but also require adding `weight` from the main theme definition.

Before: `<Text variant="body-3" />`
After: `<Text variant="body-2" />`

Before: `<Text variant="title-4" />`
After: `<Text variant="title-1" weight="semibold" />`

