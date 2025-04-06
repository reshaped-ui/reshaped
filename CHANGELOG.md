3.5.0

- Added .displayName to components
- Tests: Calendar, TrapFocus, Avatar, Autocomplete, Image, useOnClickOutside, useHandlerRef

- Calendar: selectedDates
- Flyout: fixed onClickOutside to correctly track clicked components that get unmounted (calendar)
- useOnClickOutside: new hook
- useHandlerRef: new hook
- TrapFocus: new utility, new trap mode
- Icon: Added vertical alignment in case svg content is smaller that the icon size
- Avatar: Image attributes, relaxed types
- Avatar: renderImage
- Image: renderImage
- Autocomplete: keep focus on the input when clicking on disabled items
- DropdownMenu: items support passing className now
- FormControl: Made label element inline to avoid clicking on the invisible area
- Select: Added small size
- Checkbox: size property - s,m,l
- Radio: size property - s,m,l
- Switch: align size styles and support responsive
- TextField: small size
- PinField: small size
