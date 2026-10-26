---
"reshaped": patch
---

FormControl: Fixed the accessibility wiring between `FormControl` and the form fields. `FormControl.Helper` is no longer announced as an alert and `FormControl.Error` is announced politely. `aria-describedby` is updated when the captions unmount and isn't rendered when there are no captions. `useFormControl` attributes now include `aria-invalid` and `aria-required` based on `hasError` and `required`, and `useFormControl` returns the `group` flag, so custom fields can skip the attributes in group mode. `Checkbox`, `Radio` and `Slider` are now linked to `FormControl.Label` and the captions when used without a group, `Slider` inputs are no longer labelled by their thumb value, `TextField` icons focus the field when used inside `FormControl`, and `PinField` now supports the `FormControl` `disabled` and `hasError` states and hides its visual characters from assistive technologies.
