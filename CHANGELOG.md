3.4.0

- Tailwind v4 support
- Jest -> Vitest + Storybook test + added more tests
- Parallel CI jobs

- Overlay: containerEl locks scroll only for itself and not the body
- ScrollArea: Fixed nested scroll area hover
- Accordion: fixed animation in Preact
- DropdownMenu: fixed onClick in submenu with reduced motion
- DropdownMenu: fixed onclickoutside race condition for closing the dropdown when opening a dropdown while another one is active
- Carousel: attributes.style support
- Carousel: width: 100% for not-fitting items
- Breadcrumbs: Added expandAriaLabel
- Button: loadingAriaLabel
- ContextMenu: Added onOpen/onClose handlers support
- lockScroll + ContextMenu: fixed lockScroll scrollable parent detection
- Loader: Added ariaLabel prop
- Progress: Added ariaLabel prop
- generateThemeColors: fixed generation error when called with separate hexDark colors
- getThemeCSS: updated documentation to mention baseThemeDefinition
- Table: Added compound component types to the package exports
- Carousel: onChange() + instanceRef.navigateTo()
- Flyout: Render outside scrollable areas
- Flyout: Position fallback based on the containerRef
- Carousel: onScroll handler
