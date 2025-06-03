## WIP 3.6.0

- OKLCH color support in themes
- Tailwind: Added scoped theming / color mode support for Tailwind v4 (rebuild themes)

- Flyout: Exported from the library
- Flyout: Moved css to css layers
- Flyout: Support height animations
- Exposed classNames and responsivePropDependency
- Popover: Added elevation prop, updated tests
- ScrollArea: Fixed resize observer
- Table: Fixed scrolling inside ScrollArea
- Slider: Fixed start boundary tooltip position adjustment
- Slider: minName, maxName
- Slider: updated tests
- Slider: Trigger form/input native onChange when dragging
- ScrollArea: Added missing outline reset
- Overlay: overflow property
- Flyout: Positioning inside modals
- Flyout: Updated trigger boundaries detection inside scrollable
- Flyout: Avoid using fallbacks inside scrollable when already opened (to match regular flyouts)
- Flyout: Updated dialog trap mode flyouts to be blocking for Esc keys / clicking outside
- Flyout, DropdownMenu: trapFocusMode=false support
- DropdownMenu: Submenu trigger doesn't close the menu on click
- Accordion: Fixed iconPosition prop memoization
- Avatar: use rs-font-weight-bold instead of hardcoded weight
- Exported ColorMode type
- Reshaped: colorMode conrolled prop support
- Accordion: gap property support
- ScrollArea: Removed tabIndex since it's handled natively including cases when there are actionable elements inside
- TextField: Fixed the gap/min-height of the attachments
- TextField: Improved end attachment wrapping

- Added node engine v20+ to package.json

## 3.5.3

- Tailwind 3: Preflight compatibility
- ScrollArea: fixed maxHeight
- Updated sideEffects to \*.css

## 3.5.1

- NumberField: user-select none for touch devices
- Tabs: Fixed arrow navigation
- Slider: Fixed drag propagation when used in swipeable modals
- Card: Removed internal content wrapper to fix Safari absolute positioning of contents inside the card
- [Pro] Storybook: Preserve theme and mode values while navigating stories
- [Pro] Storybook config: switched to js to resolve TS resolving issues
