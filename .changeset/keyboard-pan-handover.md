---
"@reshaped/utilities": patch
"reshaped": patch
---

On iOS, a pan Safari leaves on a page the user can't scroll is handed over to the scrollable container of the focused field. When a field is focused near the end of a scrolled container, Safari pans the whole page to reveal it, which moved the top of the page or of an open modal off screen with no way to scroll back while the keyboard was open. That happened under the page scroll lock and on pages that scroll inside their own container with `overflow: hidden` on the document. Once Safari is done panning, the container is scrolled by the same distance and the page is scrolled back in the same frame, with room added at the end of the container while the keyboard is open. The `Reshaped` provider and the page scroll lock run this automatically. Focusing fields and revealing them is still left to Safari, and pages the user can scroll are left alone
