---
"reshaped": patch
---

`Overlay` backdrop on iOS bleeds under the browser toolbars with a shadow instead of extending its own size past the viewport. Its size made the document scrollable while an overlay was open, even with the page scroll locked, so Safari could scroll the page to reveal a focused field and then blurred the status bar area over the scrolled page
