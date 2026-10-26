---
"reshaped": patch
---

Switch: Added `role="switch"` to the input element so it's announced as a switch instead of a checkbox. Checkbox, Radio, HiddenInput: `onChange` is now called when the component is used without a `name`, and `disabled` from a group or the component itself can no longer be overridden by `FormControl disabled={false}`.
