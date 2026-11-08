---
"reshaped": minor
---

`Modal` with `bottom`, `start` and `end` positions now adds the browser safe area insets to its padding on the sides attached to the screen edges, so the content isn't covered by the device corners, the notch or the home indicator in apps added to the home screen. The insets only apply when the page uses `viewport-fit=cover` and are ignored for contained modals
