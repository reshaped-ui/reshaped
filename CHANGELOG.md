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
- Flyout: Updated outside click handlers to only trigger when it's active
- DropdownMenu.SubTrigger: Added all DropdownMenu.Item props support
- ScrollArea: handled onScroll x, y values

Theming related:

- Added --rs-duration-rapid
- Updated border neutral faded
- Updated bg neutral faded to be semi transparent
- Updated border faded colors to be more prominent
- Badge: Updated outline border colors
- Button: Aligned ghost buttons padding with other variants
- Button: Added neutral faded color
- Button: Updated outline buttons to use faded border colors
- Tabs: elevated pills
- Table: Switched highlighted cells to use neutral-faded bg
- Flyout: Speed up the open duration and use rapid for the close duration
- Modal: Speed up open/close transitions

Documentation

- Included next/font integration for next15
- SSR examples, improved code snippets
