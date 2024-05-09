2.11.x

- TextArea: Fixed sizing when using values without spaces in them
- Slider: Fit thumbs within the bar area not to cause overflow
- Slider: Fixed horizontal scrolling on mount in safari
- Actionable: Switched to :focus-visible

  3.0

General:

- Switched to type: "module", node v20+?

Theming:

- Completely switched to Figma variables, no need to use plugins anymore
- Major update for the Slate theme and minor changes for Reshaped theme
- Updated color tokens generation, closer to Slate theme now
- [Breaking] Border rgb color tokens got removed (since some border colors are coming with built-in opacity)
- generateColors support for manually passing dark mode base values
