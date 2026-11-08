---
"reshaped": patch
---

Select: Fixed the custom Select accessibility semantics. The content now uses the `listbox` role with `aria-multiselectable` for multiple selection, and the trigger uses `aria-haspopup="listbox"`. When used inside `FormControl`, the trigger is labelled by `FormControl.Label` and described by its captions. Selecting an option with `multiple` no longer closes the content.
