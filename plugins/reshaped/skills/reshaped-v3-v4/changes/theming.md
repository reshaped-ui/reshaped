---
component: Theming
description: Updated token naming and removed `-rgb` color tokens
---

## Automated migration

- Replace removed color `-rgb` tokens with CSS relative color syntax.
- Rename typography token suffixes using this mapping:
  - `title-1` -> `headline-1`
  - `title-2` -> `headline-2`
  - `title-3` -> `headline-3`
  - `title-4` -> `featured-1`
  - `title-5` -> `featured-2`
  - `title-6` -> `featured-3`
  - `featured-1` -> `featured-4`
  - `featured-2` -> `featured-5`
  - `featured-3` -> `featured-6`
  - `body-1` -> `featured-6`
  - `body-2` -> `body-1`
  - `body-3` -> `body-2`

## Manual migration

- For tokens that no longer have direct semantic equivalents, review visual intent and choose the closest replacement.

## Examples

Before:

```css
--rs-color-background-rgb-primary: 255 255 255;
background: rgb(var(--rs-color-background-rgb-primary) / 50%);
```

After:

```css
background: oklch(from var(--rs-color-background-primary) l c h / 0.5);
```

Before:

```css
font-size: var(--rs-font-size-title-1);
```

After:

```css
font-size: var(--rs-font-size-headline-1);
```
