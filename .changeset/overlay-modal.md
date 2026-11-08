---
"reshaped": patch
---

Overlay: Replaced the `button` role of the root element with `presentation`, since clicking outside the content is a pointer shortcut and keyboard users close it with Escape. Modal: Fixed the swipe to close gesture direction for `start` and `end` positions in RTL. Portal: Fixed the content rendered inside a shadow root moving to `document.body` after re-rendering.
