---
"reshaped": patch
---

`Modal` with `bottom` position now renders a strip with its background fixed to the bottom edge of the screen while it's open. iOS Safari doesn't render the modal under its floating toolbar and fills the toolbar area with the color of the fixed elements attached to the screen edge instead, so the modal now visually continues under the toolbar instead of showing the page behind it
