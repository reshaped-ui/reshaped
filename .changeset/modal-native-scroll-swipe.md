---
"reshaped": minor
---

`Modal` swipe gesture is now based on the native scrolling on touch devices. Modals with `bottom`, `start`, `end` and `full-screen` positions are rendered inside a scroll container with snap points at their open and closed positions, so swiping them is handled by the browser the same way scrolling is, instead of moving them with touch event handlers:

- Modal follows the finger right away, it used to ignore the first 32px of the gesture and stay behind it by that distance
- Momentum, snapping back and rubber banding use the scroll physics of the platform
- Scrolling the modal content, nested scroll areas, text selection and the browser back gesture are arbitrated by the browser instead of the gesture heuristics
- `full-screen` modals move together with the swipe, they used to close without any visual feedback
- `bottom`, `start` and `end` modals use a longer decelerating animation similar to the native sheets and stay opaque while they slide, only the backdrop fades
- Swiped away modals are removed right after the gesture without waiting for the close transition, so the page is interactive immediately

Modals keep their previous positioning and animation on devices without touch support and with `disableSwipeGesture`.

`Overlay` supports `backdropClassName` and its transition can be customized with `--rs-overlay-duration`, `--rs-overlay-easing-open` and `--rs-overlay-easing-close` variables. It also closes correctly when it's deactivated before its open transition has started.
