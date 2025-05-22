## WIP 3.6.0

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
- Flyout: trapFocusMode=false support
- DropdownMenu: Submenu trigger doesn't close the menu on click
- Accordion: Fixed iconPosition prop memoization
- Avatar: use rs-font-weight-bold instead of hardcoded weight
- Exported ColorMode type
- Reshaped: colorMode conrolled prop support

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
