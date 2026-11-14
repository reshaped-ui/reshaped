---
"reshaped": patch
---

`Popover` and other Flyout based components don't treat clicks inside their nested flyouts as outside clicks, even though nested flyouts are rendered outside of the parent content element. Outside clicks now close all opened nested flyouts at once instead of closing them one by one, while Escape still closes them starting from the latest opened one
