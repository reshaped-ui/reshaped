# Changelog

## Minor Changes

### Calendar

- Added `monthsToRender` support
- Added `renderDateSlot` support
- Added support for an array of disabled dates
- Added `month` and `onMonthChange` support

### Tabs

- Added `disableSelectionAnimation` flag

### Avatar

- Added semi transparent outline for better visual contrast between the image and the page background
- Migrated to Image component internally

### Badge

- Added support for clickable badges

### FileUpload

- Added support for non-trigger buttons inside the dropzone
- Added support for rendering links inside the dropzone
- Added transition for the inline variant with outline
- Added `disabled` property support

### Select

- Renamed `OptionGroup` to `Group`, old naming is still available for backwards compatibility
- Made `Group` label optional
- Added support for custom children components in `Select.Custom`
- Fixed react node rendering of the selected value
- Support passing `null` as `startSlot` to hide the default checkmark icon
- Added `renderValue` prop to customize the value rendering in custom select

### HiddenInput

- Converted private to a public utility exported from the library

### Text

- Added `numeric` flag
- Fixed text alignment reset

### Scrim

- Added `padding`, `paddingInline`, `paddingBlock`, `borderRadius` support

### Image

- Added `outline` property

### Flyout

- Switched flyout position calculation to `style.setProperty`

### Divider

- Added `offset` property
- Added `color` property

### Select, DropdownMenu, Popover, Tooltip, Flyout

- Added `positionRef` prop to calculate the position of the content relative to a different element

### Flyout, Popover, DropdownMenu, ContextMenu, Autocomplete

- Added `contentMaxHeight` support

## Patch Changes

### Calendar

- Fixed end date selection for timezone edge cases

### Flyout

- Fixed `handleMouseLeave` for `triggerType` hover after the timeout removal
- Added a timeout for hover type submenus
- Correctly calculate `fallbackMinHeight` and `fallbackMinWidth` when rendered in `document.body`
- Fixed trigger type hover mouseLeave handler edge cases
- Updated content z-index
- Fixed close handler for dropdown menus with multiple levels of nesting
- Improved the speed of switching between within a tooltip group
- Fixed content resizing during children mutations with `fallbackAdjustLayout` used
- Added automatic position updates on content resize
- Removed horizontal scrolling from the `fallbackAdjustLayout`
- Fixed passed width
- Relaxed reducer conditions to avoid transition edge cases

### Tooltip, Flyout

- Added `contentMaxWidth` support
- Added `instanceRef` support (Tooltip)

### Flyout

- Added small screen position fallbacks

### ButtonGroup, ToggleButtonGroup

- Added support for `fullWidth` buttons

### Actionable

- Only show focus ring for labels when keyboard mode is enabled
- Automatically add focus ring for labels with hidden inputs inside

### Tabs

- Fixed scrolling detection inside small-sized View children
- Fixed shadow clipping in equal width tabs with pills-elevated variant

### FileUpload

- Synced focus ring border radius

### Popover

- Aligned the border styling approach with Card
- Moved border radius styles to the root element

### ScrollArea

- Fixed horizontal scrolling ratio on thumb dragging

### Select

- Handler keydown when input is focused

### DropdownMenu

- Kept the hide animation when triggerType is hover
- Enable circular navigation

### Select

- Enable circular navigation

### Badge

- Added transitions for switching between colors and variants
- Added `as` support

### Tooltip

- Disable group timeouts for controlled tooltips

### Icon

- Added color transition to align with Text

### Modal

- Fixed large modal scrolling when using responsive position

### Slider

- Prevent page scrolling when dragging the thumb on touch devices

### Button

- Fixed horizontal aligner padding value for icon only buttons

### Theme

- Moved global css variables definition to `data-rs-theme` elements

### Core

- Fixed incorrect color compilation

### Project

- Updated global body min-height reset to use `dvh`
- Simplified generic types for components supporting a combination of `as` and attributes, helps with easier implementation of wrapper components inheriting the types
