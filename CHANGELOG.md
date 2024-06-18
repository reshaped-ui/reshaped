2.11.x

- TextArea: Fixed sizing when using values without spaces in them
- Slider: Fit thumbs within the bar area not to cause overflow
- Slider: Fixed horizontal scrolling on mount in safari
- Actionable: Switched to :focus-visible
- Badge: Relaxed the types to be able to pass dismissAriaLabel while onDismiss is undefined
- Modal: Added full-screen position
- Tooltip: Optional text prop
- Modal: Added autoFocus=false support
- Modal: Added ariaLabel support

  3.0

General:

- Switched to `exports` in `package.json`

Theming:

- Completely switched to Figma variables, no need to use plugins anymore
- Major update for the Slate theme and minor changes for Reshaped theme
- Updated raised shadow value
- Updated color tokens generation, closer to Slate theme now
- [Breaking] Border rgb color tokens got removed (since some border colors are coming with built-in opacity)
- generateColors support for manually passing dark mode base values
- [Breaking] --rs-unit-radius-_ turned into --rs-radius-_
- [Breaking] unit.radius in theme config is now radius
- [Breaking] heavy font weight is now called extrabold
- [Breaking] removed highlighted color tokens
- Added opacity to neutral border, border faded and background faded color tokens
- [Maybe breaking] REM based typography, removed default font size / line height from body
- Added `rootTheme` and `setRootTheme`

Figma:

- [Breaking] Icon: switched to use instance swapping
- Icon: Added on background colors support
- Icon: Fixed edge cases for applying correct color to the icons in other components
- Card: Improved content clip
- Text: White color for inherit

Utilities:

- [Breaking] Hidden: Switched to display: contents. Removed displayStyle prop and render props children function
- Container: Added "align" | "justify" | "height" | "maxHeight" support
- Flyout: Automatic sticky positioning support

Components:

- Alert: Increased gap before actions when using inline layout
- Link: Added `warning` color support
- MenuItem: Aligned the medium size border radius in design and code
- TextField: Removed focus ring for headless variant
- Badge: ref support for routing
- Badge: fixed onClick triggerring together with onDismiss
- Autocomplete: Added onInput support
- ScrollArea: Fixed hover display thumb opacity
- [Breaking] Button: black, white -> media
- Button: updated media disabled state
- [Breaking] Button: neutral faded -> outline elevated
- Button: updated highlighted styles
- MenuItem: updated highlighted/selected styles
- PinField: fixed the field to use edit mode if the value is filled on mount
- Modal, Overlay: onOpen for focus management
- [Breaking] Progress: white -> media

Hooks:

- useHotkeys: Added support for holding keys pressed
