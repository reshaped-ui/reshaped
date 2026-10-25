---
"reshaped": patch
---

Select: Fixed the custom Select accessibility semantics. The content now uses the `listbox` role with `aria-multiselectable` for multiple selection, and the trigger uses `aria-haspopup="listbox"`. When used inside `FormControl`, the trigger is labelled by `FormControl.Label` and described by its captions. Selecting an option with `multiple` no longer closes the content. Without a placeholder, the first option that's displayed as selected is now also used as the submitted form value, and only the first option is displayed as selected when using option groups.
