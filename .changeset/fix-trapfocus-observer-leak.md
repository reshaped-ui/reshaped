---
"@reshaped/utilities": patch
---

TrapFocus: Trapping a container with no focusable content now defers instead of bailing — once focusable content is added (e.g. async-loaded dialog content) the focus is trapped automatically, as long as no other trap was triggered in the meantime. Also fixed the observer leaking in this case
