---
"@reshaped/utilities": patch
---

StyleCache: `reset()` used to restore and clear the entire cache, which let one scroll lock wipe the saved styles of another still-active lock. It now takes a required element and restores only that one. `set()` is also a no-op when the element is already cached, so locking an already-locked element keeps its original styles intact.
