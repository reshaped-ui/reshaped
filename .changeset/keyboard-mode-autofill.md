---
"reshaped": patch
---

Keyboard mode doesn't throw on `keydown` events without a `key`, which browsers and password managers dispatch when autofilling fields, and these events don't turn the keyboard mode on
