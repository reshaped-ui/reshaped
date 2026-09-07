---
"reshaped": minor
---

Added the `Expandable` component for animating content in and out by expanding the space it takes. It was previously used internally by `Accordion` and is now available publicly, with an `active` property controlling the visibility, an `orientation` property (`"vertical"` or `"horizontal"`) picking the axis the content expands along and defaulting to `"vertical"`, and an `onAfterClose` callback resolving once the closing transition is finished. The root element is only rendered as a `region` landmark when it's labelled with `aria-label` or `aria-labelledby`.
