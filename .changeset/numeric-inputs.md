---
"reshaped": patch
---

NumberField: Fixed the increase and decrease controls not being disabled when the value, `min` or `max` is `0`, typed text being replaced while typing values like `-0.5`, and press-and-hold controls continuing to change the value after the pointer is cancelled or the component unmounts. The input now uses the decimal mobile keyboard when `step` is fractional or `min` is negative. ProgressBar: Fixed the progress value calculation when `min` is not `0`. Slider: Keyboard navigation no longer moves a range thumb past the other one. PinField: Pasted values containing whitespace are no longer rejected.
