---
"@reshaped/utilities": patch
"reshaped": patch
---

Page scroll lock on iOS hands a pan Safari leaves on the locked page over to the scrollable container of the focused field. When a field is focused near the end of a scrolled modal, Safari pans the whole page to reveal it, which moved the modal top off screen with no way to scroll back while the keyboard was open. Once Safari is done panning, the container is scrolled by the same distance and the page is scrolled back in the same frame, with room added at the end of the container while the keyboard is open. Focusing fields and revealing them is still left to Safari
