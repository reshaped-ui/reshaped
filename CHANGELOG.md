2.11.x

- TextArea: Fixed sizing when using values without spaces in them
- Slider: Fit thumbs within the bar area not to cause overflow
- Slider: Fixed horizontal scrolling on mount in safari
- Actionable: Switched to :focus-visible
- Badge: Relaxed the types to be able to pass dismissAriaLabel while onDismiss is undefined
- Modal: Added full-screen position

  3.0

General:

- Switched to type: "module", node v20+?

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

Figma:

- [Breaking] Icon: switched to use instance swapping
- Icon: Added on background colors support
- Icon: Fixed edge cases for applying correct color to the icons in other components

Utility:

- [Breaking] Hidden: Switched to display: contents. Removed displayStyle prop and render props children function

Hooks:

- useHotkeys: Added support for holding keys pressed
