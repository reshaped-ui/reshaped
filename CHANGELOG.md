3.3.0

- [New component]: ContextMenu
- Popover, DropdownMenu, Tooltip: originCoordinates

- CSS: More readable responsive styles, fallback variables moved inside mq
- CSS mixins: Reduce the amount of classes used, rely on variables selectors

- TextField: Updated the order of the attachments
- trapFocus: Fixed aria-hidden not removing for some of the event handlers combinations
- Carousel: Fixed scroll snapping scrolling the carousel back
- TextField: Rounded flag
- Flyout, Popover, DropdownMenu, Tooltip: contentShift, contentGap
- DropdownMenu: Added attributes.ref support
- Actionable, Button, Link, MenuItem: Added stopPropagation property for nested buttons
- Reshaped: scoped color mode support for nested Reshaped providers
- Table: row onClick support
- Tabs: new navigation controls and fixed auto scrolling edge cases causing the page the scroll
- Modal, Overlay: onAfterOpen, onAfterClose
- View: Inset "auto" support
- Tabs: Added className and attributes for Tab.Panel
- Grid: Added attributes.style support for grid and grid.item
- Resizable: bordered variant
- TextField: support for clickable affixes
- Flyout: overflow auto detection for rendering inside a container
- keyboardMode: prevent focus ring from appearing when using mouse but closing with esc
- ScrollArea: Fixed dynamic content resizing
- trapFocus: Added contenteditable support + elements with custom keydown events
- trapFocus: Added correct handling for focusable html tags with tabIndex=-1

Documentation

- Included next/font integration for next15
- SSR examples, improved code snippets
