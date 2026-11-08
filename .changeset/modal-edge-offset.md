---
"reshaped": minor
---

`Modal` with `start`, `end` and `bottom` positions now floats with an offset from the screen edges and has rounded corners on all sides, like the `center` position. The offset grows to the browser safe area insets when they're larger, so the modal stays clear of the notch and the home indicator when the page uses `viewport-fit=cover`. The swipe gesture accounts for the offset when animating the modal out.

`Modal` now uses the base elevation background, so raised and overlay elements rendered inside it look the same as on the page. Modals with `transparentOverlay` keep the overlay elevation background since they're rendered directly on top of the page content.
