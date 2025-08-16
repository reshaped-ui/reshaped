## 3.7.0

TODO:

- Add margins
- Add border side, inline, block
- Use border shadow in components
- Move their usage in components to resolveMixin
- Add mixin property to all components

Highlights:

- Accessibility
- ActionBar: Added active, offset, more positions, positionType props
- FileUpload: variant + inline + render props

- Added Attributes type to the package exports
- Added `mono` font family to the themes
- Added zIndex tokens to the themes, updated components to use new zIndex tokens
- Increased contrast of primary border color in dark mode
- Added isolation: isolate to components for better zIndex handling
- Added `--rs-radius-circular`

- Image: added maxWidth property
- Image: added aspectRatio property
- View: Added shrink prop support for View and View.Item
- View: Removed index based key inference for item rendering
- Tabs: Added Tabs.Item disabled prop
- Text: Added monospace prop
- Tooltip: Added color prop
- Tabs: Fixed horizontal scrolling caused by negative margins
- Carousel: Updated outline styles when there are no focusable elements inside the carousel
- TrapFocus: Keep the focus on the manually focused elements
- TextArea: Removed custom word-break that was used for autogrow text areas
- Autocomplete: Added onEnter handler
- Flyout: Make nested flyouts blocking to make sure they are closed one by one
- Flyout, Popover: autoFocus=false prop support (aligned with modals)
- Button: Fixed Buttons in groups wrapped with popover from losing border radius
- Button: Updated :active styles
- Theme: Supports passing multiple theme fragments to the same provider
- FormControl: Label margin-bottom: 0 for the last child for better composition
- DropdownMenu: Fixed items not working inside router links
- Tooltip: Only apply aria-describedby when tooltip is active
- TextArea, TextField, Select: Updated placeholder color
- Tabs: Added missing id to the button elements
- Carousel: Updated control buttons to use small size
- Carousel: Fixed shadow conflicting with clip content on buttons in Figma
- Carousel: Return focus to the other control when one of them gets hidden
- Calendar: Improved tabIndex management for the dates
- Actionable: touchHitbox prop
- Badge: Increased min touch hitbox for actionable badges and dismiss button
- Switch: Increased min touch hitbox
- Tabs: Increase touch hitbox for the navigation arrows
- Badge: Icon only support
- Badge: Neutral empty
- Badge aligned small badge size with the overal unit scaling
- Grid: Added height/width props support
- MenuItem: Added highlighted property
- Autocomplete: Improved screen reader navigation
