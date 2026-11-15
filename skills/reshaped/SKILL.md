---
name: reshaped
description: Rules and best practices for building UI with the Reshaped design system (the `reshaped` npm package). Use whenever writing or editing React code in a project that depends on `reshaped` – building pages, layouts, forms or custom components, theming, or styling with Reshaped design tokens.
---

# Building with Reshaped

Reshaped is a React design system built around composition: a small set of layout and typography utilities, semantic design tokens, and components that share the same conventions. Most mistakes come from treating it like a generic component library – writing custom CSS for layout, hardcoding colors and pixel values, or guessing prop names.

## Look up the API before using a component

Don't write component props from memory. Before using a component for the first time in a task, read its type definitions:

```
node_modules/reshaped/dist/components/<Name>/<Name>.types.d.ts
```

Every prop has a comment describing what it does, its default value and how it interacts with other props. The list of exported components, hooks and types is in `node_modules/reshaped/dist/index.d.ts`. If the Reshaped MCP server is connected, use it for usage examples.

Upgrading from v3? Use the `reshaped-v3-v4` skill instead of this one.

## Application setup

- Wrap the application in `<Reshaped>` once, at the root, and import the theme CSS. It provides theming, color mode, RTL, keyboard focus handling and the toast provider. Components don't work correctly outside of it.

  ```tsx
  import { Reshaped } from "reshaped";
  import "reshaped/themes/slate/theme.css";

  const App = ({ children }) => <Reshaped theme="slate">{children}</Reshaped>;
  ```

- `slate` is the built-in theme. `theme` / `colorMode` are controlled; use `defaultTheme` / `defaultColorMode` when the app switches them at runtime with `useTheme()` (`setTheme`, `setColorMode`, `invertColorMode`).
- Styles require PostCSS with the Reshaped config. In `postcss.config.js`: `export { config as default } from "reshaped/config/postcss";`. For a custom theme that changes the viewport breakpoints, use `getConfig({ themeMediaCSSPath })` from the same module.
- With server-side rendering, set the defaults on the `<html>` element to avoid a flash of unstyled content: `<html data-rs-theme="slate" data-rs-color-mode="light">` (plus `dir="rtl"` for RTL).
- Next.js: add `transpilePackages: ["reshaped"]` and `experimental.optimizePackageImports: ["reshaped"]` to the Next config, and render `<Reshaped>` from a `"use client"` component used in the root layout. Reshaped components can be rendered from server components.
- Color mode doesn't follow the operating system preference automatically; set it explicitly.

## Layout: use View, not custom CSS

`View` is the layout primitive – a flexbox container with access to the design tokens. Use it instead of `<div>` with custom styles or utility classes.

```tsx
<View direction="row" gap={3} align="center" justify="space-between">
	<Text variant="featured-3" weight="bold">
		Projects
	</Text>
	<Button color="primary">Create</Button>
</View>
```

- Flexbox turns on when `direction`, `gap`, `align` or `justify` is passed, and the default `direction` is `"column"`. Pass `direction="row"` for horizontal layouts.
- A row wraps its children and aligns them to the start by default. Pass `align="center"` to center them vertically and `wrap={false}` to keep them on one line.
- Space siblings with `gap` on the parent `View`. Don't add margins or spacer elements.
- `View.Item` controls how a single child behaves: `grow`, `shrink`, `columns` (1–12 or `"auto"`, for row direction, items wrap to the next row automatically), `order` and `gapBefore` (overrides the gap before this one item; `gapBefore="auto"` pushes the item to the end of the row). `grow` and `shrink` can also be set on a child `View` directly.
- For a "fill the remaining space" layout, give one child `grow`. The parent then stops wrapping and the other children keep their size.
- `divided` renders dividers between the children; don't insert `Divider` manually between `View` children.
- Surfaces: `backgroundColor`, `borderColor`, `borderRadius`, `shadow`, `padding`. Setting `backgroundColor` also sets a readable text color for that background. Passing `borderColor` enables the border on all sides; use `borderTop`, `borderBlock` etc. to render only some of them.
- Positioning: `position`, `inset*` and `zIndex` cover overlays, sticky headers and badges without custom CSS. `inset="center"` centers an absolutely positioned child.
- `bleed` applies a negative inline margin to make an element span the full width of a padded parent, e.g. on mobile.
- Render semantic HTML with `as` (`<View as="ul">`, `<View.Item as="li">`, `<View as="main">`).
- `Container` centers the page content and limits its width (`<Container width="964px">`). `Grid` is for two-dimensional CSS grid layouts; prefer `View` for everything one-dimensional.
- `Hidden` shows or hides content per viewport (`<Hidden hide={{ s: true, l: false }}>`) and works with server-side rendering. It can be used as a direct child of `View` without breaking the gaps.

## Units and responsive values

- **Numbers are multipliers of the base unit** (4px in the default theme): `gap={4}` is 16px, `padding={6}` is 24px. Never convert pixels by hand into `gap={16}`.
- **Strings are literal CSS values** for the size props that accept them (`width`, `height`, `maxWidth`, `minHeight`, …): `width="320px"`, `height="100%"`, `maxWidth="60ch"`. Spacing props (`gap`, `padding*`, `bleed`) only take numbers.
- **Responsive values** are objects keyed by viewport and are mobile-first: `{ s: "column", l: "row" }` means column on `s` and `m`, row on `l` and `xl`. Viewports are `s`, `m` (≥660px), `l` (≥900px) and `xl` (≥1280px) in the default theme. Always include the `s` key – an object without it isn't treated as a responsive value.
- Only props that affect layout are responsive (`G.Responsive<…>` in the types) – for example `View` layout props, `Button` `size` and `fullWidth`, `Text` `variant`. Others, like `color`, are not. For those, resolve the value on the client with `useResponsiveClientValue({ s: …, l: … })` or render different content with `Hidden`.
- Don't read `window.innerWidth` or write media queries in JS for layout – use the responsive props.

## Colors and tokens

- Use semantic values, never hex colors or raw pixels. In props: `color="primary"`, `backgroundColor="neutral-faded"`, `borderColor="neutral-faded"`, `borderRadius="medium"`, `shadow="raised"`.
- Colors have roles: `neutral`, `primary`, `critical`, `positive`, `warning`. Use `critical` for destructive actions and errors, `positive` for success, `primary` for the main action of a view (usually one per view).
- Dark mode is automatic when tokens are used. Don't branch on the color mode to pick colors. To render an area in a different mode, wrap it in `<Theme colorMode="dark">` or `<Theme colorMode="inverted">`.
- In custom CSS, use the CSS variables: `var(--rs-color-background-neutral-faded)`, `var(--rs-color-foreground-neutral)`, `var(--rs-color-border-neutral-faded)`, `var(--rs-unit-x4)`, `var(--rs-radius-medium)`, `var(--rs-shadow-raised)`, `var(--rs-duration-fast)`, `var(--rs-easing-standard)`, `var(--rs-z-index-absolute)`.
  - `foreground-*` colors are for text and icons on page, elevation and `*-faded` backgrounds. On solid backgrounds like `background-primary`, use the matching `on-background-*` color.
  - Surfaces use `background-elevation-base` (cards), `-raised` and `-overlay` (popovers, modals); the page uses `background-page`.
- Media queries in CSS use custom media: `@media (--rs-viewport-m) { … }` (also `-l`, `-xl`, and `-s` for small screens only).
- Use CSS logical properties (`margin-inline-start`, `inset-inline-end`) in custom CSS so RTL keeps working. This is also why props are named `start`/`end`, not `left`/`right`.

## Text

- Render text with `Text`. Variants, from largest to smallest: `headline-1…3`, `featured-1…6`, `body-1`, `body-2`, `caption-1`, `caption-2`. `body-2` is the default size of the application text.
- Set the HTML tag with `as` for headings and paragraphs: `<Text as="h2" variant="featured-3" weight="bold">`, `<Text as="p">`. Without `as`, `featured-1`…`featured-6` render as `h1`…`h6` and every other variant renders a `div`, so pass `as` whenever the heading level shouldn't follow the variant number.
- Secondary text uses `color="neutral-faded"`; don't lower the opacity.
- `maxLines` truncates, `wrap="balance"` balances headings, `numeric` keeps digit widths stable for changing numbers.

## Actions and icons

- `Button`, `Link` and `MenuItem` are based on `Actionable`: passing `href` renders an `<a>`, passing `onClick` (or `type`) renders a `<button>`, and passing none of them renders a non-interactive `<span>`. Don't put click handlers on non-interactive elements – use `Actionable` for custom clickable areas, it handles keyboard support and focus rings.
- For client-side routing, pass the router link through `render` and spread everything it receives: `<Button href="/settings" render={(props) => <RouterLink {...props} />}>`. Wrapping a `Button` without `href` in a router link gives a `<span>` inside an anchor.
- Buttons render with `type="button"`. Pass `type="submit"` to the button that submits a form.
- Icons are passed as components, not rendered elements: `<Button icon={PlusIcon}>`, `<Icon svg={PlusIcon} />`. Any SVG icon library works (e.g. `lucide-react`); the SVG should use `currentColor`.
- An icon-only button needs an accessible name: `<Button icon={TrashIcon} attributes={{ "aria-label": "Delete" }} />`.
- `Icon` sizes are unit multipliers (`size={5}` is 20px) and it inherits the text color by default. `<Icon svg={null} />` renders an empty box of the same size – use it to keep rows with and without icons aligned. The `icon` props of other components render nothing for `null`; pass the empty `Icon` through their `startSlot` instead.
- One `color="primary"` button per group of actions; secondary actions stay neutral or use `variant="outline"` / `variant="ghost"`.

## Forms

- Every input takes a `name` and calls `onChange` with an object, not a DOM event: `onChange={({ name, value, event }) => …}` (`checked` instead of `value` for `Checkbox` and `Switch`).
- Inputs are uncontrolled with `defaultValue` / `defaultChecked` and controlled with `value` / `checked` + `onChange`. Don't pass both.
- Wrap fields in `FormControl` for the label, helper and error text – it wires ids and aria attributes, and applies its `hasError` and `disabled` to the field inside:

  ```tsx
  <FormControl hasError={!!error}>
  	<FormControl.Label>Email</FormControl.Label>
  	<TextField name="email" inputAttributes={{ type: "email" }} />
  	<FormControl.Helper>We'll only use it for receipts</FormControl.Helper>
  	<FormControl.Error>{error}</FormControl.Error>
  </FormControl>
  ```

  `FormControl.Error` is rendered only while `hasError` is set. `required` shows the indicator and sets `aria-required`, it doesn't enable native validation. `size` only changes the label and caption text – set the field `size` on the field itself.

- Use `<FormControl group>` around a `RadioGroup` or `CheckboxGroup`. Inside a group, each `Radio` / `Checkbox` needs a `value`, and the group owns `name`, the checked state and `onChange`. Groups render no element, so lay their children out with a `View`.
- Native input attributes (`type`, `autoComplete`, `inputMode`, `ref`) go to `inputAttributes`; `attributes` applies to the root element of the field.
- `Select` renders a custom dropdown with `Select.Option` children and a native `<select>` with `<option>` children. Give a custom `Select` a `placeholder` or an initial value, and label it with `FormControl.Label` – `inputAttributes` go to its hidden input, not to the trigger.
- `Autocomplete` is a controlled text field with suggestions: keep `value` in state, update it in `onChange` (called for typing and for selecting an item) and render only the `Autocomplete.Item`s matching it – items are not filtered for you.
- `NumberField` requires `increaseAriaLabel` and `decreaseAriaLabel`.
- With React Hook Form, use `Controller` and adapt the handler: `onChange={({ event }) => field.onChange(event)}`.

## Overlays

- `Popover`, `DropdownMenu` and `Tooltip` pass trigger attributes through a render function. Always spread them onto the trigger via its `attributes` prop:

  ```tsx
  <DropdownMenu>
    <DropdownMenu.Trigger>
      {(attributes) => <Button attributes={attributes}>Options</Button>}
    </DropdownMenu.Trigger>
    <DropdownMenu.Content>
      <DropdownMenu.Item onClick={handleEdit}>Edit</DropdownMenu.Item>
    </DropdownMenu.Content>
  </DropdownMenu>

  <Tooltip text="Copy link">
    {(attributes) => <Button icon={LinkIcon} attributes={{ ...attributes, "aria-label": "Copy link" }} />}
  </Tooltip>
  ```

- `Modal` is controlled: pass `active` and `onClose`. Keep it mounted and toggle `active` instead of rendering it conditionally, otherwise its close animation doesn't run. `useToggle()` returns `{ active, activate, deactivate, toggle }` for this. Use `Modal.Title` and `Modal.Subtitle` so the dialog is labelled for screen readers.
- `Popover`, `DropdownMenu` and `Tooltip` manage their own state. Passing `active` makes them controlled – they then only open and close when you update it in `onOpen` / `onClose`. To keep one from opening, pass `disabled` instead of `active={false}`.
- `Tooltip` describes its trigger only while it's shown and doesn't open on touch, so it doesn't replace an `aria-label` and shouldn't hold information that isn't available elsewhere. With an empty `text` it renders just the trigger, so conditional tooltips don't need branching.
- Pressing a `DropdownMenu.Item` closes the menu. `ContextMenu` has no trigger: everything rendered inside it except `ContextMenu.Content` is the right-click area.
- Toasts are shown imperatively: `const toast = useToast(); const id = toast.show({ title, text, icon, color, actionsSlot }); toast.hide(id);`. There's no `<Toast>` component to render. Toasts hide after a timeout; pass `timeout: 0` together with an action that calls `hide` for the ones that should stay.
- Overlays render in a portal and manage focus trapping, scroll locking and z-index themselves. Don't set `z-index` on them.

## Choosing a component

| Need                                  | Use                                                                                                                                                     |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Pick one option from a list           | `Select`; `RadioGroup` when all options should stay visible; `ToggleButtonGroup` or `Tabs` with `variant="pills"` for a compact switcher                |
| Pick an option by typing              | `Autocomplete`                                                                                                                                          |
| Menu of actions on a button           | `DropdownMenu`; `ContextMenu` for right click                                                                                                           |
| Arbitrary floating content            | `Popover`; `Tooltip` for a short text hint on hover or focus                                                                                            |
| Blocking dialog, drawer, bottom sheet | `Modal` with `position`                                                                                                                                 |
| Feedback after an action              | toast via `useToast`; `Alert` for a persistent message inside the page                                                                                  |
| Boolean setting                       | `Switch` when it applies immediately, `Checkbox` inside a submitted form                                                                                |
| Navigation between views              | `Tabs` (pass `value` or `defaultValue`, nothing is selected otherwise; items accept `href`; inactive panels are unmounted), `Breadcrumbs`, `Pagination` |
| List row or navigation item           | `MenuItem`                                                                                                                                              |
| Surface for grouped content           | `Card` (padding of 4 units by default, `padding={0}` for edge-to-edge media or tables; `onClick` or `href` makes it clickable)                          |
| Show/hide a section                   | `Accordion`                                                                                                                                             |
| Loading                               | `Skeleton` for content placeholders, `Loader` for spinners, `Button` `loading` for pending actions                                                      |
| Status label or counter               | `Badge` (`Badge.Container` to attach it to another element)                                                                                             |

## Customizing components

- Every component accepts `className` and `attributes` for its root element. `attributes` takes any HTML attribute, `data-*` and `aria-*` attribute, `style` and `ref`. Some components expose the same for inner elements (`inputAttributes`, `contentAttributes`, …).
- Reach for props and composition first, then theming, then `className`. Don't override the internal class names of the components – they're hashed and change between releases.
- A custom look for a group of components (e.g. a branded button) is done with a scoped theme: `<Theme name="…">`.
- Build custom components from `View`, `Text`, `Actionable` and tokens so they pick up theming, dark mode and RTL for free.

## Common mistakes

- `<div style={{ display: "flex", gap: 16 }}>` → `<View direction="row" gap={4}>`.
- `gap={16}` meaning 16px → `gap={4}`.
- Expecting `View` to be a row by default → it's a column.
- Hex colors, `rgb()` or Tailwind color classes → color props and `--rs-color-*` tokens.
- `<h2>` / `<p>` with custom font styles → `<Text as="h2" variant="featured-2">`.
- `onChange={(e) => setValue(e.target.value)}` → `onChange={({ value }) => setValue(value)}`.
- `{open && <Modal>}` → `<Modal active={open} onClose={…}>`.
- Forgetting to pass the trigger `attributes` in `Popover` / `DropdownMenu` / `Tooltip` – the overlay never opens.
- `<Button icon={<PlusIcon />}>` works, but `icon={PlusIcon}` is the convention; an icon-only button without `aria-label` is inaccessible.
- v3 APIs that no longer exist: `variant="faded"` on `Button`, `variant="outline"` on `Badge`, `elevated` on `Button` and `Card` (now `raised`), `Text` variants `title-*` and `body-3`, `Select.Custom`, `onFocus` / `onBlur` on inputs (pass them through `inputAttributes`), the `inverted` toast color, `toastOptions` on `Reshaped`, and the `ActionBar`, `Stepper`, `Timeline`, `Scrim` and `Hotkey` components.
