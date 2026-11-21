---
"reshaped": minor
---

`Modal` swipe gesture on touch devices behaves closer to the native iOS sheets:

- Modal follows the finger 1:1 from the start of the gesture, it used to ignore the first 32px and stay behind the finger by that distance
- Released modal closes when it would stop past the middle of its size with the release velocity, it used to close after any 32px drag
- Dragging past the open position uses the iOS rubber band resistance and the background of the bottom modal is extended below it
- Content scrolling on the swipe axis scrolls first and the modal starts following the finger once the content reaches its edge, within the same gesture
- Modal released towards its closed position can't be caught again and the page receives input while it's closing
- Modal kept open in `onClose` returns to its open position instead of staying where it was released
- `full-screen` modals move with the swipe towards the end side, they used to close without any visual feedback
- Touches starting at the screen edges are left to the browser back and forward gestures for all horizontal positions
- `bottom`, `start` and `end` modals use a longer decelerating animation similar to the native sheets and stay opaque while they slide, only the backdrop fades

`Overlay` supports `backdropClassName` and its transition can be customized with `--rs-overlay-duration`, `--rs-overlay-easing-open` and `--rs-overlay-easing-close` variables. Closing overlays let the page receive input right away, and an overlay deactivated before its open transition has started is now removed correctly.
