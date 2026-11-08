---
"reshaped": patch
---

`useOnClickOutside` no longer adds document listeners while disabled, which speeds up mounting many components using it, like editable items in long lists
