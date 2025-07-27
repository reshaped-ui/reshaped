## 3.7.0

- Added Attributes type to the package exports
- Added `mono` font family to the themes
- Added zIndex tokens to the themes, updated components to use new zIndex tokens
- Added isolation: isolate to components for better zIndex handling

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